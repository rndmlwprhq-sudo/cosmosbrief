// Vercel serverless function — CORS-free RSS proxy
// Usage: /api/rss?url=<encoded RSS URL>
export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET');

  const { url } = req.query;
  if (!url) {
    return res.status(400).json({ error: 'Missing ?url= parameter' });
  }

  // Only allow Google News RSS to prevent abuse
  let decoded;
  try { decoded = decodeURIComponent(url); } catch {
    return res.status(400).json({ error: 'Invalid URL encoding' });
  }
  if (!decoded.startsWith('https://news.google.com/rss/')) {
    return res.status(403).json({ error: 'Only Google News RSS URLs are allowed' });
  }

  try {
    const response = await fetch(decoded, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; CosmosBot/1.0; +https://cosmosbrief.vercel.app)',
        'Accept': 'application/rss+xml, application/xml, text/xml, */*',
      },
      signal: AbortSignal.timeout(10000),
    });

    if (!response.ok) {
      return res.status(response.status).json({ error: `Upstream error: ${response.status}` });
    }

    const xml = await response.text();
    res.setHeader('Content-Type', 'application/xml; charset=utf-8');
    res.setHeader('Cache-Control', 's-maxage=300, stale-while-revalidate'); // 5-min CDN cache
    return res.send(xml);
  } catch (err) {
    console.error('[rss]', err);
    return res.status(500).json({ error: '뉴스 수집 중 오류가 발생했습니다.' });
  }
}
