// Vercel serverless function — GitHub-backed article storage
// GET  /api/articles         → returns published articles array (public)
// POST /api/articles         → mutate articles (requires ADMIN_SECRET)
//   header: Authorization: Bearer <ADMIN_SECRET>
//   body: { action, article?, id?, articles? }
//   action: 'publish'  → prepend article
//   action: 'delete'   → remove by id
//   action: 'clear'    → empty array
//   action: 'import'   → replace all with articles[]
// Requires Vercel env vars: GITHUB_PAT (repo scope), ADMIN_SECRET

const OWNER   = 'rndmlwprhq-sudo';
const REPO    = 'cosmosbrief';
const PATH    = 'data/published.json';
const GH_API  = `https://api.github.com/repos/${OWNER}/${REPO}/contents/${PATH}`;

const MAX_ARTICLES = 500;
const ALLOWED_ACTIONS = new Set(['publish', 'delete', 'clear', 'import']);

// Only allow CSS hex colors or simple color names to prevent CSS injection
function sanitizeColor(v) {
  if (typeof v !== 'string') return '#7ee8e8';
  if (/^#[0-9a-fA-F]{3,8}$/.test(v) || /^[a-zA-Z]{2,30}$/.test(v)) return v;
  return '#7ee8e8';
}

// Whitelist-based article sanitizer — only keep known fields with validated types
function sanitizeArticle(raw) {
  if (!raw || typeof raw !== 'object' || Array.isArray(raw)) return null;
  const str = (v, max) => typeof v === 'string' ? v.slice(0, max) : '';
  const num = (v) => (typeof v === 'number' && isFinite(v)) ? v : Date.now();
  const strArr = (v, max) => Array.isArray(v) ? v.slice(0, max).map(i => str(i, 2000)).filter(Boolean) : [];
  return {
    id:                 num(raw.id),
    company:            str(raw.company, 64),
    companyName:        str(raw.companyName, 128),
    companyColor:       sanitizeColor(raw.companyColor),
    companyIcon:        str(raw.companyIcon, 16),
    title:              str(raw.title, 500),
    summary:            str(raw.summary, 2000),
    content:            str(raw.content, 200_000),
    photos:             strArr(raw.photos, 10),
    links:              strArr(raw.links, 10),
    publishedAt:        str(raw.publishedAt, 64),
    publishedAtDisplay: str(raw.publishedAtDisplay, 64),
    visible:            typeof raw.visible === 'boolean' ? raw.visible : true,
  };
}

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS') return res.status(200).end();

  const pat = process.env.GITHUB_PAT;
  if (!pat) return res.status(500).json({ error: 'Server configuration error' });

  const ghHeaders = {
    'Authorization': `Bearer ${pat}`,
    'Accept': 'application/vnd.github+json',
    'X-GitHub-Api-Version': '2022-11-28',
    'User-Agent': 'CosmosBreif-Admin/1.0',
  };

  async function readFile() {
    const r = await fetch(GH_API, { headers: ghHeaders });
    if (r.status === 404) return { data: [], sha: null };
    if (!r.ok) throw new Error('storage_read_failed');
    const json = await r.json();
    const text = Buffer.from(json.content.replace(/\n/g, ''), 'base64').toString('utf-8');
    return { data: JSON.parse(text), sha: json.sha };
  }

  async function writeFile(data, sha, message) {
    const content = Buffer.from(JSON.stringify(data, null, 2), 'utf-8').toString('base64');
    const body = { message, content, ...(sha ? { sha } : {}) };
    const r = await fetch(GH_API, {
      method: 'PUT',
      headers: { ...ghHeaders, 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    if (!r.ok) throw new Error('storage_write_failed');
    return r.json();
  }

  // ── GET: return all articles (public) ──────────────────────────────────
  if (req.method === 'GET') {
    try {
      const { data } = await readFile();
      res.setHeader('Cache-Control', 'no-store');
      return res.json(data);
    } catch (err) {
      console.error('[articles] GET error:', err);
      return res.status(500).json({ error: 'Failed to load articles' });
    }
  }

  // ── POST: mutate articles (requires ADMIN_SECRET) ─────────────────────
  if (req.method === 'POST') {
    // ── Auth check ──
    const secret = process.env.ADMIN_SECRET;
    if (secret) {
      const auth = req.headers['authorization'];
      if (!auth || auth !== `Bearer ${secret}`) {
        return res.status(401).json({ error: 'Unauthorized' });
      }
    }

    const body = req.body || {};
    const { action, article, id, articles } = body;

    // Validate action against allowlist
    if (!action || !ALLOWED_ACTIONS.has(action)) {
      return res.status(400).json({ error: 'Invalid request' });
    }

    try {
      let { data, sha } = await readFile();

      if (action === 'publish') {
        const sanitized = sanitizeArticle(article);
        if (!sanitized || !sanitized.title) return res.status(400).json({ error: 'Missing required article fields' });
        data.unshift(sanitized);
        if (data.length > MAX_ARTICLES) data = data.slice(0, MAX_ARTICLES);
        await writeFile(data, sha, `publish: ${sanitized.title.slice(0, 72)}`);
        return res.json({ ok: true, count: data.length });
      }

      if (action === 'delete') {
        if (id == null) return res.status(400).json({ error: 'Missing id' });
        const safeId = Number(id);
        if (!isFinite(safeId)) return res.status(400).json({ error: 'Invalid id' });
        data = data.filter(i => i.id !== safeId);
        await writeFile(data, sha, `delete article ${safeId}`);
        return res.json({ ok: true, count: data.length });
      }

      if (action === 'clear') {
        await writeFile([], sha, 'clear all articles');
        return res.json({ ok: true, count: 0 });
      }

      if (action === 'import') {
        if (!Array.isArray(articles) || articles.length > MAX_ARTICLES) {
          return res.status(400).json({ error: `articles must be an array (max ${MAX_ARTICLES})` });
        }
        const sanitized = articles.map(sanitizeArticle).filter(Boolean);
        await writeFile(sanitized, sha, `import ${sanitized.length} articles`);
        return res.json({ ok: true, count: sanitized.length });
      }
    } catch (err) {
      console.error('[articles] POST error:', err);
      return res.status(500).json({ error: 'Operation failed' });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
