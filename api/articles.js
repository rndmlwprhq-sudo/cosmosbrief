// Vercel serverless function — GitHub-backed article storage
// GET  /api/articles         → returns published articles array
// POST /api/articles         → {action, article?, id?, articles?}
//   action: 'publish'  → prepend article
//   action: 'delete'   → remove by id
//   action: 'clear'    → empty array
//   action: 'import'   → replace all with articles[]
// Requires Vercel env var: GITHUB_PAT (repo scope)

const OWNER = 'rndmlwprhq-sudo';
const REPO  = 'cosmosbrief';
const PATH  = 'data/published.json';
const GH_API = `https://api.github.com/repos/${OWNER}/${REPO}/contents/${PATH}`;

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();

  const pat = process.env.GITHUB_PAT;
  if (!pat) return res.status(500).json({ error: 'GITHUB_PAT env var not configured' });

  const ghHeaders = {
    'Authorization': `Bearer ${pat}`,
    'Accept': 'application/vnd.github+json',
    'X-GitHub-Api-Version': '2022-11-28',
    'User-Agent': 'CosmosBreif-Admin/1.0',
  };

  async function readFile() {
    const r = await fetch(GH_API, { headers: ghHeaders });
    if (r.status === 404) return { data: [], sha: null };
    if (!r.ok) throw new Error(`GitHub read failed: ${r.status}`);
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
    if (!r.ok) {
      const err = await r.text();
      throw new Error(`GitHub write failed: ${r.status} — ${err.slice(0, 200)}`);
    }
    return r.json();
  }

  // ── GET: return all articles ──────────────────────────────────────────
  if (req.method === 'GET') {
    try {
      const { data } = await readFile();
      res.setHeader('Cache-Control', 'no-store');
      return res.json(data);
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }

  // ── POST: mutate articles ─────────────────────────────────────────────
  if (req.method === 'POST') {
    const body = req.body || {};
    const { action, article, id, articles } = body;

    try {
      let { data, sha } = await readFile();

      if (action === 'publish') {
        if (!article) return res.status(400).json({ error: 'Missing article' });
        data.unshift(article);
        await writeFile(data, sha, `publish: ${String(article.title || '').slice(0, 72)}`);
        return res.json({ ok: true, count: data.length });
      }

      if (action === 'delete') {
        if (id == null) return res.status(400).json({ error: 'Missing id' });
        data = data.filter(i => i.id !== id);
        await writeFile(data, sha, `delete article ${id}`);
        return res.json({ ok: true, count: data.length });
      }

      if (action === 'clear') {
        await writeFile([], sha, 'clear all articles');
        return res.json({ ok: true, count: 0 });
      }

      if (action === 'import') {
        if (!Array.isArray(articles)) return res.status(400).json({ error: 'articles must be array' });
        await writeFile(articles, sha, `import ${articles.length} articles`);
        return res.json({ ok: true, count: articles.length });
      }

      return res.status(400).json({ error: 'Unknown action: ' + action });
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
