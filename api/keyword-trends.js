// Vercel serverless function - GitHub-backed keyword trend storage
// GET  /api/keyword-trends -> returns public keyword trend data
// POST /api/keyword-trends -> replace managed data (requires ADMIN_SECRET)
//   header: Authorization: Bearer <ADMIN_SECRET>
//   body: { action: 'save', data: { keywords: [...] } }
// Requires Vercel env vars: GITHUB_PAT (repo scope), ADMIN_SECRET

const OWNER = 'rndmlwprhq-sudo';
const REPO = 'cosmosbrief';
const PATH = 'data/keyword-trends-managed.json';
const GH_API = `https://api.github.com/repos/${OWNER}/${REPO}/contents/${PATH}`;

const MAX_KEYWORDS = 100;
const ALLOWED_STATUSES = new Set(['confirmed', 'low_confidence', 'not_collected_yet']);

function isProductionRuntime() {
  return process.env.VERCEL_ENV === 'production' || process.env.NODE_ENV === 'production';
}

function requireAdmin(req, res) {
  const secret = process.env.ADMIN_SECRET;
  if (!secret) {
    if (isProductionRuntime()) {
      res.status(500).json({ error: 'ADMIN_SECRET is not configured' });
      return false;
    }
    console.warn('[keyword-trends] ADMIN_SECRET is not configured; allowing local development request.');
    return true;
  }

  if (req.headers.authorization !== `Bearer ${secret}`) {
    res.status(401).json({ error: 'Unauthorized' });
    return false;
  }
  return true;
}

function isAdminRead(req) {
  const secret = process.env.ADMIN_SECRET;
  if (!secret) return !isProductionRuntime();
  return req.headers.authorization === `Bearer ${secret}`;
}

function str(value, max = 500) {
  return typeof value === 'string' ? value.trim().slice(0, max) : '';
}

function nullableNumber(value, field, options = {}) {
  if (value === null || value === undefined || value === '') return null;
  const number = Number(value);
  if (!Number.isFinite(number)) throw new Error(`${field}_invalid`);
  if (options.integer && !Number.isInteger(number)) throw new Error(`${field}_invalid`);
  if (options.min !== undefined && number < options.min) throw new Error(`${field}_invalid`);
  if (options.max !== undefined && number > options.max) throw new Error(`${field}_invalid`);
  return number;
}

function nullableDate(value, field) {
  const text = str(value, 64);
  if (!text) return null;
  if (Number.isNaN(Date.parse(text))) throw new Error(`${field}_invalid`);
  return text;
}

function sanitizeId(value, index) {
  const candidate = str(value, 64).toLowerCase();
  return /^[a-z0-9][a-z0-9-]{0,63}$/.test(candidate) ? candidate : `keyword-${index + 1}`;
}

function sanitizeKeyword(raw, index) {
  if (!raw || typeof raw !== 'object' || Array.isArray(raw)) throw new Error('keyword_invalid');
  const keyword = str(raw.keyword, 100);
  if (!keyword) throw new Error('keyword_required');

  const status = str(raw.status || raw.confidence, 32) || 'not_collected_yet';
  if (!ALLOWED_STATUSES.has(status)) throw new Error('status_invalid');

  const mentionCount = nullableNumber(raw.mentionCount ?? raw.count, 'mention_count', { integer: true, min: 0 });
  const articleCount = nullableNumber(raw.articleCount, 'article_count', { integer: true, min: 0 });
  const trendScore = nullableNumber(raw.trendScore ?? raw.score, 'trend_score', { min: 0, max: 100 });
  const change = nullableNumber(raw.change, 'change');
  const rank = nullableNumber(raw.rank, 'rank', { integer: true, min: 1 });
  const updatedAt = nullableDate(raw.updatedAt, 'updated_at');
  const source = str(raw.source, 120);
  const hasPrimaryValue = [mentionCount, articleCount, trendScore].some(value => value !== null);
  const hasEnteredValue = hasPrimaryValue || change !== null;

  if ((hasEnteredValue || status !== 'not_collected_yet') && (!updatedAt || !source)) {
    throw new Error('source_and_updated_at_required');
  }
  if (status === 'not_collected_yet' && hasEnteredValue) {
    throw new Error('pending_value_not_allowed');
  }
  if (status !== 'not_collected_yet' && !hasPrimaryValue) {
    throw new Error('confirmed_value_required');
  }

  return {
    id: sanitizeId(raw.id, index),
    keyword,
    aliases: Array.isArray(raw.aliases) ? raw.aliases.slice(0, 12).map(value => str(value, 100)).filter(Boolean) : [],
    mentionCount,
    articleCount,
    trendScore,
    change,
    rank,
    status,
    updatedAt,
    source,
    explanation: str(raw.explanation, 500),
  };
}

function sanitizeDataset(raw) {
  if (!raw || typeof raw !== 'object' || Array.isArray(raw)) throw new Error('data_invalid');
  if (!Array.isArray(raw.keywords) || raw.keywords.length > MAX_KEYWORDS) throw new Error('keywords_invalid');

  const keywords = raw.keywords.map(sanitizeKeyword);
  const ids = new Set();
  keywords.forEach(item => {
    if (ids.has(item.id)) throw new Error('keyword_id_duplicate');
    ids.add(item.id);
  });

  return {
    version: 1,
    method: 'manual_admin',
    periodStart: nullableDate(raw.periodStart, 'period_start'),
    periodEnd: nullableDate(raw.periodEnd, 'period_end'),
    articleCountTotal: nullableNumber(raw.articleCountTotal, 'article_total', { integer: true, min: 0 }),
    deduplicatedArticleCount: nullableNumber(raw.deduplicatedArticleCount, 'deduplicated_total', { integer: true, min: 0 }),
    updatedAt: nullableDate(raw.updatedAt, 'data_updated_at'),
    keywords,
  };
}

function publicDataset(data) {
  return data;
}

function defaultDataset() {
  return {
    version: 1,
    method: 'manual_admin',
    periodStart: null,
    periodEnd: null,
    articleCountTotal: null,
    deduplicatedArticleCount: null,
    updatedAt: null,
    keywords: [],
  };
}

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS') return res.status(200).end();

  if (req.method === 'POST' && !requireAdmin(req, res)) return;

  const pat = process.env.GITHUB_PAT;
  if (!pat) return res.status(500).json({ error: 'Server configuration error' });

  const ghHeaders = {
    Authorization: `Bearer ${pat}`,
    Accept: 'application/vnd.github+json',
    'X-GitHub-Api-Version': '2022-11-28',
    'User-Agent': 'Radiant-Blue-Dot-Admin/1.0',
  };

  async function readFile() {
    const response = await fetch(GH_API, { headers: ghHeaders });
    if (response.status === 404) return { data: defaultDataset(), sha: null };
    if (!response.ok) throw new Error('storage_read_failed');
    const json = await response.json();
    const text = Buffer.from(json.content.replace(/\n/g, ''), 'base64').toString('utf-8');
    return { data: sanitizeDataset(JSON.parse(text)), sha: json.sha };
  }

  async function writeFile(data, sha) {
    const content = Buffer.from(JSON.stringify(data, null, 2), 'utf-8').toString('base64');
    const body = { message: 'update keyword trend figures', content, ...(sha ? { sha } : {}) };
    const response = await fetch(GH_API, {
      method: 'PUT',
      headers: { ...ghHeaders, 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    if (!response.ok) throw new Error('storage_write_failed');
  }

  if (req.method === 'GET') {
    try {
      const { data } = await readFile();
      res.setHeader('Cache-Control', 'no-store');
      return res.json(isAdminRead(req) ? data : publicDataset(data));
    } catch (error) {
      console.error('[keyword-trends] GET error:', error);
      return res.status(500).json({ error: 'Failed to load keyword trends' });
    }
  }

  if (req.method === 'POST') {
    if (!req.body || req.body.action !== 'save') {
      return res.status(400).json({ error: 'Invalid request' });
    }

    try {
      const data = sanitizeDataset(req.body.data);
      const { sha } = await readFile();
      await writeFile(data, sha);
      return res.json({ ok: true, count: data.keywords.length, updatedAt: data.updatedAt });
    } catch (error) {
      const validationErrors = new Set([
        'data_invalid', 'keywords_invalid', 'keyword_invalid', 'keyword_required', 'status_invalid',
        'mention_count_invalid', 'article_count_invalid', 'trend_score_invalid', 'change_invalid',
        'rank_invalid', 'updated_at_invalid', 'period_start_invalid', 'period_end_invalid',
        'article_total_invalid', 'deduplicated_total_invalid', 'data_updated_at_invalid',
        'source_and_updated_at_required', 'pending_value_not_allowed', 'confirmed_value_required', 'keyword_id_duplicate',
      ]);
      if (validationErrors.has(error.message)) {
        return res.status(400).json({ error: `Invalid keyword trend data: ${error.message}` });
      }
      console.error('[keyword-trends] POST error:', error);
      return res.status(500).json({ error: 'Operation failed' });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
