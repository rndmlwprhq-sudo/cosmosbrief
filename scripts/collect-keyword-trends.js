'use strict';

const fs = require('node:fs/promises');
const path = require('node:path');
const { XMLParser } = require('fast-xml-parser');
const { parse } = require('node-html-parser');

const ROOT = path.resolve(__dirname, '..');
const MANAGED_PATH = path.join(ROOT, 'data', 'keyword-trends-managed.json');
const DRAFT_PATH = path.join(ROOT, 'data', 'keyword-trends-draft.json');
const WINDOW_DAYS = 7;
const REQUEST_TIMEOUT_MS = 15000;
const CONCURRENCY = 5;
const rssParser = new XMLParser({
  ignoreAttributes: false,
  attributeNamePrefix: '',
  trimValues: true,
});

const GOOGLE_NEWS_EDITIONS = [
  { id: 'google-news-kr', name: 'Google News RSS (KR)', hl: 'ko', gl: 'KR', ceid: 'KR:ko' },
  { id: 'google-news-en', name: 'Google News RSS (US)', hl: 'en-US', gl: 'US', ceid: 'US:en' },
];

// Additional RSS feeds can be added later without changing the scoring pipeline.
// They are fetched once, then filtered against each keyword and its aliases.
const ADDITIONAL_RSS_SOURCES = [
  // { id: 'nasa', name: 'NASA News Releases', url: 'https://www.nasa.gov/news-releases/feed/', official: true },
  // { id: 'esa', name: 'ESA Press Releases', url: 'https://www.esa.int/rssfeed/Newsroom/Press_Releases', official: true },
  // { id: 'jaxa', name: 'JAXA Press Releases', url: 'https://global.jaxa.jp/rss/press.rss', official: true },
];

const OFFICIAL_SOURCE_HOSTS = [
  /(^|\.)nasa\.gov$/i,
  /(^|\.)esa\.int$/i,
  /(^|\.)jaxa\.jp$/i,
  /(^|\.)kasa\.go\.kr$/i,
  /(^|\.)kari\.re\.kr$/i,
  /(^|\.)kasi\.re\.kr$/i,
  /(^|\.)spacex\.com$/i,
];

function uniqueStrings(values) {
  return [...new Set(values.map(value => String(value || '').trim()).filter(Boolean))];
}

function escapeRegex(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function keywordTerms(item) {
  return uniqueStrings([item.keyword, ...(Array.isArray(item.aliases) ? item.aliases : [])]);
}

function createMentionPattern(terms) {
  const alternatives = terms
    .slice()
    .sort((a, b) => b.length - a.length)
    .map(escapeRegex)
    .join('|');
  return new RegExp(`(?<![\\p{L}\\p{N}])(?:${alternatives})(?![\\p{L}\\p{N}])`, 'giu');
}

function cleanText(value) {
  return parse(String(value || '')).textContent.replace(/\s+/g, ' ').trim();
}

function rssValue(value) {
  if (value === null || value === undefined) return '';
  if (typeof value === 'object') return cleanText(value['#text'] || value.text || '');
  return cleanText(value);
}

function normalizeTitle(value) {
  return value
    .toLowerCase()
    .replace(/\s+-\s+[^-]{2,100}$/u, '')
    .replace(/[^\p{L}\p{N}]+/gu, '')
    .trim();
}

function titleTrigrams(title) {
  const normalized = normalizeTitle(title);
  const grams = new Set();
  for (let i = 0; i <= normalized.length - 3; i += 1) grams.add(normalized.slice(i, i + 3));
  return grams;
}

function titlesAreSimilar(left, right) {
  const a = normalizeTitle(left);
  const b = normalizeTitle(right);
  if (!a || !b) return false;
  if (a === b) return true;
  if (Math.min(a.length, b.length) < 18) return false;
  const aGrams = titleTrigrams(left);
  const bGrams = titleTrigrams(right);
  if (!aGrams.size || !bGrams.size) return false;
  let overlap = 0;
  aGrams.forEach(gram => {
    if (bGrams.has(gram)) overlap += 1;
  });
  return overlap / Math.min(aGrams.size, bGrams.size) >= 0.9;
}

function deduplicateArticles(articles) {
  const unique = [];
  for (const article of articles) {
    const duplicate = unique.some(existing => (
      (article.link && existing.link === article.link)
      || titlesAreSimilar(existing.title, article.title)
    ));
    if (!duplicate) unique.push(article);
  }
  return unique;
}

function isOfficialArticle(article) {
  if (article.officialFeed) return true;
  try {
    const hostname = new URL(article.publisherUrl).hostname;
    return OFFICIAL_SOURCE_HOSTS.some(pattern => pattern.test(hostname));
  } catch (error) {
    return false;
  }
}

function buildGoogleNewsFeed(item, edition) {
  const query = `(${keywordTerms(item).map(term => `"${term}"`).join(' OR ')}) when:${WINDOW_DAYS}d`;
  const search = new URLSearchParams({
    q: query,
    hl: edition.hl,
    gl: edition.gl,
    ceid: edition.ceid,
  });
  return {
    id: `${edition.id}:${item.id}`,
    name: edition.name,
    url: `https://news.google.com/rss/search?${search.toString()}`,
    official: false,
    keywordId: item.id,
  };
}

function parseRss(xml, feed) {
  const document = rssParser.parse(xml);
  const rawItems = document && document.rss && document.rss.channel
    ? document.rss.channel.item
    : [];
  const items = Array.isArray(rawItems) ? rawItems : (rawItems ? [rawItems] : []);
  return items.map(item => {
    const source = item.source && typeof item.source === 'object' ? item.source : null;
    const publishedAt = rssValue(item.pubDate);
    return {
      title: rssValue(item.title),
      description: rssValue(item.description),
      pubDate: publishedAt,
      publishedMs: Date.parse(publishedAt),
      link: rssValue(item.link || item.guid),
      publisher: rssValue(item.source) || feed.name,
      publisherUrl: source ? String(source.url || '') : '',
      feedName: feed.name,
      officialFeed: Boolean(feed.official),
    };
  }).filter(article => article.title && Number.isFinite(article.publishedMs));
}

async function fetchFeed(feed) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);
  try {
    const response = await fetch(feed.url, {
      signal: controller.signal,
      headers: {
        'User-Agent': 'Radiant-Blue-Dot-Trend-Collector/1.0',
        Accept: 'application/rss+xml, application/xml, text/xml, */*',
      },
    });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    return { ok: true, feed, articles: parseRss(await response.text(), feed) };
  } catch (error) {
    return { ok: false, feed, error: error.message || 'request_failed', articles: [] };
  } finally {
    clearTimeout(timeout);
  }
}

async function mapLimited(items, limit, worker) {
  const output = new Array(items.length);
  let index = 0;
  async function run() {
    while (index < items.length) {
      const current = index;
      index += 1;
      output[current] = await worker(items[current]);
    }
  }
  await Promise.all(Array.from({ length: Math.min(limit, items.length) }, run));
  return output;
}

function countArticleMentions(article, terms) {
  const matches = `${article.title} ${article.description}`.match(createMentionPattern(terms));
  return matches ? matches.length : 0;
}

function percentChange(current, previous) {
  if (!Number.isInteger(previous) || previous < 0) return null;
  if (previous === 0) return current === 0 ? 0 : null;
  return Math.round((((current - previous) / previous) * 100) * 10) / 10;
}

function draftSource(successfulFeeds, relevantArticles) {
  const feeds = uniqueStrings(successfulFeeds.map(result => result.feed.name));
  const publishers = uniqueStrings(relevantArticles.map(article => article.publisher)).slice(0, 3);
  const parts = [feeds.join(', ')];
  if (publishers.length) parts.push(`publishers: ${publishers.join(', ')}`);
  return parts.filter(Boolean).join('; ').slice(0, 120);
}

async function writeDraft(data) {
  const temporaryPath = `${DRAFT_PATH}.tmp`;
  await fs.writeFile(temporaryPath, `${JSON.stringify(data, null, 2)}\n`, 'utf8');
  try {
    await fs.rename(temporaryPath, DRAFT_PATH);
  } catch (error) {
    if (!['EEXIST', 'EPERM'].includes(error.code)) throw error;
    await fs.rm(DRAFT_PATH, { force: true });
    await fs.rename(temporaryPath, DRAFT_PATH);
  }
}

async function main() {
  const managed = JSON.parse(await fs.readFile(MANAGED_PATH, 'utf8'));
  if (!Array.isArray(managed.keywords) || !managed.keywords.length) {
    throw new Error('No keywords found in managed data.');
  }

  const periodEnd = new Date();
  const periodStart = new Date(periodEnd.getTime() - WINDOW_DAYS * 24 * 60 * 60 * 1000);
  const recencyStart = new Date(periodEnd.getTime() - 48 * 60 * 60 * 1000);

  const keywordFeeds = managed.keywords.flatMap(item => (
    GOOGLE_NEWS_EDITIONS.map(edition => buildGoogleNewsFeed(item, edition))
  ));
  const feedResults = await mapLimited(
    [...keywordFeeds, ...ADDITIONAL_RSS_SOURCES],
    CONCURRENCY,
    fetchFeed,
  );
  const successfulResults = feedResults.filter(result => result.ok);
  if (!successfulResults.length) {
    throw new Error('All RSS requests failed. Existing managed and draft files were left unchanged.');
  }

  const sharedResults = successfulResults.filter(result => !result.feed.keywordId);
  const recentRawArticles = successfulResults
    .flatMap(result => result.articles)
    .filter(article => article.publishedMs >= periodStart.getTime() && article.publishedMs <= periodEnd.getTime());
  const globalDeduplicated = deduplicateArticles(recentRawArticles);

  const draftKeywords = managed.keywords.map(item => {
    const itemResults = successfulResults.filter(result => result.feed.keywordId === item.id);
    const attemptedResults = feedResults.filter(result => result.feed.keywordId === item.id);
    const relevantPool = [...itemResults, ...sharedResults]
      .flatMap(result => result.articles)
      .filter(article => article.publishedMs >= periodStart.getTime() && article.publishedMs <= periodEnd.getTime());
    const terms = keywordTerms(item);
    const relevantArticles = deduplicateArticles(relevantPool)
      .map(article => ({ ...article, mentionCount: countArticleMentions(article, terms) }))
      .filter(article => article.mentionCount > 0)
      .sort((left, right) => right.publishedMs - left.publishedMs);
    const hasCollection = itemResults.length > 0 || sharedResults.length > 0;

    if (!hasCollection) {
      return {
        ...item,
        mentionCount: null,
        articleCount: null,
        trendScore: null,
        change: null,
        rank: null,
        status: 'not_collected_yet',
        updatedAt: null,
        source: '',
        collectionError: uniqueStrings(attemptedResults.filter(result => !result.ok).map(result => result.error)).join('; '),
      };
    }

    const articleCount = relevantArticles.length;
    const mentionCount = relevantArticles.reduce((sum, article) => sum + article.mentionCount, 0);
    const officialSourceBonus = relevantArticles.some(isOfficialArticle) ? 10 : 0;
    const recencyBonus = relevantArticles.some(article => article.publishedMs >= recencyStart.getTime()) ? 10 : 0;
    const rawScore = articleCount * 7 + mentionCount * 1.5 + officialSourceBonus + recencyBonus;
    const trendScore = Math.min(100, Math.round(rawScore * 10) / 10);

    return {
      ...item,
      mentionCount,
      articleCount,
      trendScore,
      change: percentChange(articleCount, item.articleCount),
      rank: null,
      status: 'low_confidence',
      updatedAt: periodEnd.toISOString(),
      source: draftSource([...itemResults, ...sharedResults], relevantArticles),
      scoring: {
        officialSourceBonus,
        recencyBonus,
      },
      sampleArticles: relevantArticles.slice(0, 5).map(article => ({
        title: article.title,
        description: article.description,
        pubDate: new Date(article.publishedMs).toISOString(),
        link: article.link,
        source: article.publisher,
        mentionCount: article.mentionCount,
      })),
    };
  });

  draftKeywords
    .filter(item => item.trendScore !== null)
    .sort((left, right) => (
      right.trendScore - left.trendScore
      || right.articleCount - left.articleCount
      || right.mentionCount - left.mentionCount
    ))
    .forEach((item, index) => {
      item.rank = index + 1;
    });

  const failures = feedResults.filter(result => !result.ok).map(result => ({
    source: result.feed.name,
    keywordId: result.feed.keywordId || null,
    error: result.error,
  }));
  const draft = {
    version: 1,
    method: 'rss_draft_review',
    periodStart: periodStart.toISOString(),
    periodEnd: periodEnd.toISOString(),
    articleCountTotal: recentRawArticles.length,
    deduplicatedArticleCount: globalDeduplicated.length,
    updatedAt: periodEnd.toISOString(),
    reviewRequired: true,
    collection: {
      windowDays: WINDOW_DAYS,
      requestedFeeds: feedResults.length,
      successfulFeeds: successfulResults.length,
      failedFeeds: failures.length,
      failures,
      sourceTypes: ['Google News RSS search', ...ADDITIONAL_RSS_SOURCES.map(source => source.name)],
      scoreFormula: 'articleCount * 7 + mentionCount * 1.5 + officialSourceBonus + recencyBonus (max 100)',
    },
    keywords: draftKeywords,
  };

  await writeDraft(draft);
  console.log(`Draft written: ${path.relative(ROOT, DRAFT_PATH)}`);
  console.log(`RSS feeds: ${successfulResults.length}/${feedResults.length} succeeded`);
  console.log(`Articles: ${draft.articleCountTotal} raw, ${draft.deduplicatedArticleCount} deduplicated`);
  console.log('Review required: no managed data was overwritten.');
}

main().catch(error => {
  console.error(`Keyword trend draft collection failed: ${error.message}`);
  process.exitCode = 1;
});
