/**
 * api/scrape.js  — Vercel serverless function
 * Server-side news scraper for each company's official website.
 * Usage: GET /api/scrape?company=nasa
 *
 * Strategy per company:
 *  1. Official RSS feed  (if available)
 *  2. HTML scrape via node-html-parser
 *  3. __NEXT_DATA__ JSON extraction (for Next.js SPAs)
 *  4. Fallback → Google News RSS for that company
 *
 * Date filtering:
 *  - If ≥ 10 articles exist from last 90 days → return those (max 15)
 *  - Otherwise → return newest 15 regardless of date
 */
import { parse as htmlParse } from 'node-html-parser';

/* ═══════════════════════════════════════════════════════════
   COMPANY CONFIGS
═══════════════════════════════════════════════════════════ */
const CONFIGS = {
  nasa: {
    name: 'NASA',
    rss: 'https://www.nasa.gov/news-releases/feed/',
  },
  spacex: {
    name: 'SpaceX',
    url: 'https://www.spacex.com/updates/',
    nextData: true,            // Uses Next.js — try __NEXT_DATA__
    nextDataPath: ['props', 'pageProps', 'data', 'posts'],
    nextDataAlt:  ['props', 'pageProps', 'updates'],
    mapNextItem: (item) => ({
      title:   item.title || item.name || '',
      link:    item.url ? (item.url.startsWith('http') ? item.url : 'https://www.spacex.com' + item.url) : 'https://www.spacex.com/updates/',
      date:    item.date || item.publishedAt || item.published_at || '',
      summary: item.content || item.body || item.description || '',
    }),
    fallbackQuery: 'SpaceX Starship launch',
    fallbackLang:  'en',
  },
  esa: {
    name: 'ESA',
    rss: 'https://www.esa.int/rssfeed/Newsroom/Press_Releases',
  },
  blueorigin: {
    name: 'Blue Origin',
    url: 'https://www.blueorigin.com/news/',
    nextData: true,
    nextDataPath: ['props', 'pageProps', 'news'],
    nextDataAlt:  ['props', 'pageProps', 'posts'],
    mapNextItem: (item) => ({
      title:   item.title || item.headline || '',
      link:    item.slug  ? `https://www.blueorigin.com/news/${item.slug}` :
               item.url   ? item.url : 'https://www.blueorigin.com/news/',
      date:    item.date || item.publishedAt || '',
      summary: item.excerpt || item.body || '',
    }),
    htmlSels: [
      { item: '.news-item', title: 'h2,h3,h4,.news-title', link: 'a', date: '.date,.news-date,.published-date' },
      { item: 'article', title: 'h2,h3', link: 'a', date: 'time,.date' },
    ],
    fallbackQuery: 'Blue Origin New Glenn rocket',
    fallbackLang:  'en',
  },
  rocketlab: {
    name: 'Rocket Lab',
    url: 'https://www.rocketlabusa.com/about/news/',
    htmlSels: [
      { item: '.news-item,.card,.post-card', title: 'h2,h3,h4,.card-title', link: 'a', date: 'time,.date,.post-date' },
      { item: 'article', title: 'h2,h3', link: 'a', date: 'time,.date' },
    ],
    fallbackQuery: '"Rocket Lab" Electron launch',
    fallbackLang:  'en',
  },
  jaxa: {
    name: 'JAXA',
    rss: 'https://global.jaxa.jp/rss/press.rss',
    // fallback to HTML if RSS fails
    url: 'https://global.jaxa.jp/press/',
    htmlSels: [
      { item: '.news-list li,.press-list li', title: 'a,.title', link: 'a', date: '.date,.time,time' },
      { item: 'table.list-table tbody tr', title: 'td.subject a,td a', link: 'a', date: 'td.date,td:first-child' },
    ],
    baseUrl: 'https://global.jaxa.jp',
  },
  ula: {
    name: 'ULA',
    url: 'https://www.ulalaunch.com/about/news/',
    htmlSels: [
      { item: '.news-item,.resource-item,.post', title: 'h2,h3,h4,.title', link: 'a', date: '.date,.publish-date,time' },
      { item: 'article,.card', title: 'h2,h3', link: 'a', date: 'time,.date' },
    ],
    fallbackQuery: 'United Launch Alliance Vulcan',
    fallbackLang:  'en',
  },
  axiom: {
    name: 'Axiom Space',
    url: 'https://www.axiomspace.com/newsroom',
    nextData: true,
    nextDataPath: ['props', 'pageProps', 'posts'],
    nextDataAlt:  ['props', 'pageProps', 'news'],
    mapNextItem: (item) => ({
      title:   item.title || item.name || '',
      link:    item.slug  ? `https://www.axiomspace.com/newsroom/${item.slug}` :
               item.url   ? item.url : 'https://www.axiomspace.com/newsroom',
      date:    item.date || item.publishedAt || '',
      summary: item.excerpt || item.description || '',
    }),
    htmlSels: [
      { item: '.news-card,.post-card,.newsroom-item', title: 'h2,h3,.card-title', link: 'a', date: '.date,time' },
      { item: 'article', title: 'h2,h3', link: 'a', date: 'time,.date' },
    ],
    fallbackQuery: 'Axiom Space station mission',
    fallbackLang:  'en',
  },
  kasa: {
    name: '우주항공청 (KASA)',
    url: 'https://www.kasa.go.kr/prog/bbsArticle/BBSMSTR_000000000041/list.do',
    baseUrl: 'https://www.kasa.go.kr',
    encoding: 'utf-8',
    htmlSels: [
      { item: '.board-list tbody tr,.bbs_list tbody tr,table.list_table tbody tr', title: 'td.subject a,td.title a,td a.title', link: 'a', date: 'td.date,td:nth-last-child(2)' },
      { item: '.board-basic li,.board_list li', title: '.subject a,.title a,a', link: 'a', date: '.date,.regdate' },
      { item: 'tbody tr', title: 'td:nth-child(2) a,td a', link: 'a', date: 'td:last-child,td:nth-last-child(2)' },
    ],
  },
  kari: {
    name: 'KARI 한국항공우주연구원',
    url: 'https://www.kari.re.kr/kor/sub05_01.do',
    baseUrl: 'https://www.kari.re.kr',
    encoding: 'euc-kr',   // may be EUC-KR
    htmlSels: [
      { item: '.board-list tbody tr,.bbs_list tbody tr', title: 'td.subject a,td.title a,td a', link: 'a', date: 'td.date,td:last-child' },
      { item: '.pds-list li,.news-list li', title: '.title a,a', link: 'a', date: '.date,.regdate' },
      { item: 'tbody tr', title: 'td:nth-child(2) a,td a', link: 'a', date: 'td:last-child' },
    ],
  },
  kasi: {
    name: 'KASI 한국천문연구원',
    url: 'https://www.kasi.re.kr/kor/publication/post/news',
    baseUrl: 'https://www.kasi.re.kr',
    encoding: 'utf-8',
    htmlSels: [
      { item: '.board-list tbody tr,.bbs_list tbody tr', title: 'td.subject a,td.title a,td a', link: 'a', date: 'td.date,td:last-child' },
      { item: 'tbody tr', title: 'td:nth-child(2) a,td:nth-child(3) a', link: 'a', date: 'td:last-child' },
      { item: '.list-item,.news-item', title: '.title a,a', link: 'a', date: '.date' },
    ],
  },
  kai: {
    name: 'KAI 한국항공우주산업',
    url: 'https://www.koreaaero.com/ko/media/news_list.do',
    baseUrl: 'https://www.koreaaero.com',
    encoding: 'utf-8',
    htmlSels: [
      { item: '.board-list tbody tr,.news-list tbody tr', title: 'td.subject a,td.title a,td a', link: 'a', date: 'td.date,td:last-child' },
      { item: 'tbody tr', title: 'td:nth-child(2) a,td:nth-child(3) a', link: 'a', date: 'td:last-child' },
      { item: '.news-item,.card', title: '.title a,h3 a,h4 a', link: 'a', date: '.date' },
    ],
  },
  hanwha: {
    name: '한화에어로스페이스',
    url: 'https://www.hanwhaaerospace.com/kor/media/newsroom/list.do',
    baseUrl: 'https://www.hanwhaaerospace.com',
    encoding: 'utf-8',
    htmlSels: [
      { item: '.board-list tbody tr,.news-list tbody tr', title: 'td.subject a,td.title a,td a', link: 'a', date: 'td.date,td:last-child' },
      { item: 'tbody tr', title: 'td:nth-child(2) a,td:nth-child(3) a', link: 'a', date: 'td:last-child' },
      { item: '.news-item,.article-item', title: '.title a,a.link', link: 'a', date: '.date,.reg-date' },
    ],
  },
};

/* ═══════════════════════════════════════════════════════════
   MAIN HANDLER
═══════════════════════════════════════════════════════════ */
export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  if (req.method === 'OPTIONS') { res.status(200).end(); return; }

  const { company } = req.query;
  if (!company || !CONFIGS[company]) {
    return res.status(400).json({ error: 'Invalid company parameter' });
  }

  const cfg = CONFIGS[company];
  let articles = [];
  let method = 'none';

  // ── 1. Try official RSS ──────────────────────────────
  if (cfg.rss && !articles.length) {
    try {
      articles = await fetchRss(cfg.rss, cfg.baseUrl || '');
      if (articles.length) method = 'rss';
    } catch (_) {}
  }

  // ── 2. Try HTML scraping ─────────────────────────────
  if (!articles.length && cfg.url) {
    try {
      const { html, finalUrl } = await fetchHtml(cfg.url, cfg.encoding);
      const base = cfg.baseUrl || new URL(cfg.url).origin;

      // 2a. Try __NEXT_DATA__ (Next.js / headless CMS SPAs)
      if (cfg.nextData) {
        const fromNext = extractNextData(html, cfg, base);
        if (fromNext.length) { articles = fromNext; method = '__next_data__'; }
      }

      // 2b. Try CSS-selector-based HTML parsing
      if (!articles.length && cfg.htmlSels) {
        const root = htmlParse(html);
        for (const sel of cfg.htmlSels) {
          const parsed = parseWithSel(root, sel, base);
          if (parsed.length >= 3) { articles = parsed; method = 'html'; break; }
        }
      }

      // 2c. Generic fallback HTML parsing
      if (!articles.length) {
        const root = htmlParse(html);
        articles = genericParse(root, base);
        if (articles.length) method = 'html-generic';
      }
    } catch (_) {}
  }

  // ── 3. Google News RSS fallback ──────────────────────
  if (!articles.length && cfg.fallbackQuery) {
    try {
      const hl = cfg.fallbackLang === 'ko' ? 'ko' : 'en';
      const gl = cfg.fallbackLang === 'ko' ? 'KR' : 'US';
      const ceid = cfg.fallbackLang === 'ko' ? 'KR:ko' : 'US:en';
      const rssUrl = `https://news.google.com/rss/search?q=${encodeURIComponent(cfg.fallbackQuery)}&hl=${hl}&gl=${gl}&ceid=${ceid}`;
      articles = await fetchRss(rssUrl, '');
      if (articles.length) method = 'google_news_fallback';
    } catch (_) {}
  }

  // ── 4. Korean sites: also try Google News as final fallback ──
  if (!articles.length && cfg.name) {
    try {
      const isKorean = (cfg.baseUrl || cfg.url || '').includes('.kr');
      const query = cfg.name.replace(/[()]/g,' ');
      const lang = isKorean ? 'ko' : 'en';
      const gl   = isKorean ? 'KR' : 'US';
      const ceid = isKorean ? 'KR:ko' : 'US:en';
      const rssUrl = `https://news.google.com/rss/search?q=${encodeURIComponent(query)}&hl=${lang}&gl=${gl}&ceid=${ceid}`;
      articles = await fetchRss(rssUrl, '');
      if (articles.length) method = 'google_news_fallback';
    } catch (_) {}
  }

  // ── Date filter ──────────────────────────────────────
  articles = filterAndLimit(articles);

  res.setHeader('Cache-Control', 's-maxage=300, stale-while-revalidate');
  return res.status(200).json({ company, name: cfg.name, method, count: articles.length, articles });
}

/* ═══════════════════════════════════════════════════════════
   FETCH HELPERS
═══════════════════════════════════════════════════════════ */
const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36';

async function fetchHtml(url, encoding = 'utf-8') {
  const resp = await fetch(url, {
    headers: {
      'User-Agent': UA,
      'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
      'Accept-Language': 'ko-KR,ko;q=0.9,en-US;q=0.8,en;q=0.7',
      'Accept-Encoding': 'gzip, deflate',
    },
    signal: AbortSignal.timeout(15000),
  });
  if (!resp.ok) throw new Error(`HTTP ${resp.status}`);

  // Detect encoding from Content-Type header
  const ct = resp.headers.get('content-type') || '';
  const charsetMatch = ct.match(/charset=([^;]+)/i);
  const detectedCharset = charsetMatch ? charsetMatch[1].trim().toLowerCase() : null;
  const useEncoding = detectedCharset || encoding || 'utf-8';

  // EUC-KR / CP949 → need ArrayBuffer + TextDecoder
  const needsDecode = /euc-kr|euckr|cp949|ks_c_5601/i.test(useEncoding);
  let html;
  if (needsDecode) {
    const buf = await resp.arrayBuffer();
    const dec = new TextDecoder('euc-kr');
    html = dec.decode(buf);
  } else {
    html = await resp.text();
  }

  return { html, finalUrl: resp.url };
}

async function fetchRss(url, baseUrl) {
  const resp = await fetch(url, {
    headers: { 'User-Agent': UA, 'Accept': 'application/rss+xml,application/xml,text/xml,*/*' },
    signal: AbortSignal.timeout(12000),
  });
  if (!resp.ok) throw new Error(`HTTP ${resp.status}`);
  const xml = await resp.text();
  return parseRssXml(xml, baseUrl);
}

/* ═══════════════════════════════════════════════════════════
   RS S XML PARSER
═══════════════════════════════════════════════════════════ */
function parseRssXml(xml, baseUrl) {
  const items = [];
  const itemRegex = /<item>([\s\S]*?)<\/item>/g;
  let m;
  while ((m = itemRegex.exec(xml)) !== null) {
    const block = m[1];
    const title   = stripCdata(getTag(block, 'title')).replace(/<[^>]+>/g, '').trim();
    const link    = stripCdata(getTag(block, 'link') || getTag(block, 'guid')).trim();
    const pubDate = stripCdata(getTag(block, 'pubDate') || getTag(block, 'dc:date') || getTag(block, 'published')).trim();
    const desc    = stripCdata(getTag(block, 'description') || getTag(block, 'summary')).replace(/<[^>]+>/g, '').replace(/&nbsp;/g, ' ').trim().slice(0, 300);
    const source  = stripCdata(getTag(block, 'source') || getTag(block, 'dc:publisher') || getTag(block, 'author')).replace(/<[^>]+>/g, '').trim();
    if (!title) continue;
    const absLink = makeAbsolute(link, baseUrl);
    items.push({ title, link: absLink, date: pubDate, summary: desc, source });
  }
  return items.slice(0, 20);
}

function getTag(xml, tag) {
  const m = xml.match(new RegExp(`<${tag}[^>]*>([\\s\\S]*?)<\\/${tag}>`, 'i'));
  return m ? m[1] : '';
}
function stripCdata(s) { return s.replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, '$1').trim(); }

/* ═══════════════════════════════════════════════════════════
   NEXT.JS __NEXT_DATA__ EXTRACTOR
═══════════════════════════════════════════════════════════ */
function extractNextData(html, cfg, baseUrl) {
  const scriptMatch = html.match(/<script id="__NEXT_DATA__"[^>]*>(\{[\s\S]*?\})<\/script>/);
  if (!scriptMatch) return [];
  let data;
  try { data = JSON.parse(scriptMatch[1]); } catch { return []; }

  // Try configured paths first
  const paths = [cfg.nextDataPath, cfg.nextDataAlt].filter(Boolean);
  for (const path of paths) {
    let obj = data;
    for (const key of path) { if (obj && typeof obj === 'object') obj = obj[key]; else { obj = null; break; } }
    if (Array.isArray(obj) && obj.length) {
      return obj.slice(0, 20).map(item => cfg.mapNextItem ? cfg.mapNextItem(item) : {
        title:   String(item.title || item.name || item.headline || ''),
        link:    item.url || item.slug || item.href || baseUrl,
        date:    item.date || item.publishedAt || item.created_at || '',
        summary: item.excerpt || item.description || item.body || '',
      }).filter(a => a.title);
    }
  }

  // Generic deep search for post-like arrays
  const found = deepFindPostsArray(data);
  if (found) {
    return found.slice(0, 20).map(item => ({
      title:   String(item.title || item.name || item.headline || ''),
      link:    item.url || item.slug || item.href || baseUrl,
      date:    item.date || item.publishedAt || '',
      summary: item.excerpt || item.description || '',
    })).filter(a => a.title);
  }
  return [];
}

function deepFindPostsArray(obj, depth = 0) {
  if (depth > 8 || !obj || typeof obj !== 'object') return null;
  if (Array.isArray(obj) && obj.length >= 3 && obj[0] && (obj[0].title || obj[0].name || obj[0].headline)) return obj;
  for (const key of Object.keys(obj)) {
    const result = deepFindPostsArray(obj[key], depth + 1);
    if (result) return result;
  }
  return null;
}

/* ═══════════════════════════════════════════════════════════
   HTML SELECTOR-BASED PARSER (node-html-parser)
═══════════════════════════════════════════════════════════ */
function parseWithSel(root, sel, baseUrl) {
  const items = root.querySelectorAll(sel.item);
  if (!items.length) return [];
  const articles = [];
  for (const item of items) {
    if (articles.length >= 20) break;

    // Title
    let title = '';
    for (const ts of (sel.title || 'a,h2,h3').split(',')) {
      const el = item.querySelector(ts.trim());
      if (el && el.textContent.trim()) { title = el.textContent.trim(); break; }
    }
    if (!title) title = item.textContent.replace(/\s+/g, ' ').trim().slice(0, 120);
    if (!title || title.length < 4) continue;

    // Link
    let link = '';
    const linkEl = item.querySelector('a');
    if (linkEl) {
      link = linkEl.getAttribute('href') || '';
      link = makeAbsolute(link, baseUrl);
    }

    // Date
    let date = '';
    for (const ds of (sel.date || 'time,.date,.regdate').split(',')) {
      const el = item.querySelector(ds.trim());
      if (el) {
        date = el.getAttribute('datetime') || el.textContent.trim();
        if (date) break;
      }
    }

    articles.push({ title: cleanText(title), link, date: cleanDate(date), summary: '' });
  }
  return articles;
}

function genericParse(root, baseUrl) {
  // Try common news list patterns
  const candidates = [
    'article', '.news-item', '.press-item', '.post-card', '.card',
    '.board-list li', '.list-group-item', '.news-list li',
    'tbody tr',
  ];
  for (const sel of candidates) {
    const items = root.querySelectorAll(sel);
    if (items.length < 3) continue;
    const result = [];
    for (const item of items) {
      if (result.length >= 20) break;
      const linkEl = item.querySelector('a');
      if (!linkEl) continue;
      const title = linkEl.textContent.trim();
      if (!title || title.length < 5) continue;
      const link = makeAbsolute(linkEl.getAttribute('href') || '', baseUrl);
      const dateEl = item.querySelector('time, .date, .regdate, .pubdate');
      const date = dateEl ? (dateEl.getAttribute('datetime') || dateEl.textContent.trim()) : '';
      result.push({ title: cleanText(title), link, date: cleanDate(date), summary: '' });
    }
    if (result.length >= 3) return result;
  }
  return [];
}

/* ═══════════════════════════════════════════════════════════
   DATE FILTER & LIMIT
═══════════════════════════════════════════════════════════ */
function filterAndLimit(articles) {
  if (!articles.length) return [];

  // Attach parsed timestamps
  const withTs = articles.map(a => ({ ...a, _ts: parseTimestamp(a.date) }));

  const now = Date.now();
  const ninetyDaysAgo = now - 90 * 24 * 3600 * 1000;

  const recent = withTs.filter(a => a._ts && a._ts >= ninetyDaysAgo);

  // If >= 10 articles in last 90 days → use recent (max 15)
  // Otherwise → use all articles (max 15)
  const pool = recent.length >= 10 ? recent : withTs;

  return pool
    .sort((a, b) => (b._ts || 0) - (a._ts || 0))
    .slice(0, 15)
    .map(({ _ts, ...rest }) => rest);
}

function parseTimestamp(dateStr) {
  if (!dateStr) return null;
  // Common Korean date formats: 2026.03.28, 2026-03-28, 2026/03/28
  const cleaned = dateStr.replace(/(\d{4})[./](\d{1,2})[./](\d{1,2})/, '$1-$2-$3').trim();
  const d = new Date(cleaned);
  return isNaN(d.getTime()) ? null : d.getTime();
}

/* ═══════════════════════════════════════════════════════════
   UTILITY
═══════════════════════════════════════════════════════════ */
function makeAbsolute(href, base) {
  if (!href) return base || '#';
  if (href.startsWith('http')) return href;
  if (href.startsWith('//')) return 'https:' + href;
  if (href.startsWith('/') && base) return base.replace(/\/$/, '') + href;
  if (base) return base.replace(/\/$/, '') + '/' + href;
  return href;
}
function cleanText(s) { return s.replace(/\s+/g, ' ').replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&#\d+;/g, '').trim(); }
function cleanDate(s) { return (s || '').replace(/[^\d.\-:/년월일\s]/g, '').trim().slice(0, 20); }
