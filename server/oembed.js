// oEmbed 代理 · 调 Twitter / YouTube 官方 API
// 合法 · 免费 · 0 ToS 风险 · 行业标准做法
//
// Twitter oEmbed:https://publish.twitter.com/oembed?url={tweet_url}
// YouTube oEmbed:https://www.youtube.com/oembed?url={video_url}&format=json
//
// 缓存 24h · 单条 oEmbed 调用 < 200ms · 反复调用同一 URL 不命中 Twitter 限流

const cache = new Map();
const CACHE_TTL_MS = 24 * 60 * 60 * 1000; // 24h

function cacheGet(key) {
  const entry = cache.get(key);
  if (!entry) return null;
  if (Date.now() - entry.ts > CACHE_TTL_MS) {
    cache.delete(key);
    return null;
  }
  return entry.data;
}
function cacheSet(key, data) {
  cache.set(key, { data, ts: Date.now() });
  // 简单 LRU:超过 1000 条丢最老
  if (cache.size > 1000) {
    const firstKey = cache.keys().next().value;
    cache.delete(firstKey);
  }
}

// 从 oEmbed HTML 里提取纯文本(去 <blockquote> <a> 等标签)
function stripHtml(html) {
  if (!html) return '';
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, '')
    .replace(/<style[\s\S]*?<\/style>/gi, '')
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<\/p>/gi, '\n')
    .replace(/<[^>]+>/g, '')
    .replace(/&mdash;/g, '—')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, ' ')
    .trim();
}

async function fetchTwitter(tweetUrl) {
  const apiUrl = `https://publish.twitter.com/oembed?url=${encodeURIComponent(tweetUrl)}&omit_script=true&hide_thread=true&maxwidth=550&dnt=true`;
  const r = await fetch(apiUrl);
  if (!r.ok) throw new Error(`Twitter oEmbed ${r.status}`);
  const data = await r.json();
  return {
    platform: 'twitter',
    author_name: data.author_name,
    author_url: data.author_url,
    url: data.url || tweetUrl,
    text: stripHtml(data.html),
    html: data.html,
    fetched_at: new Date().toISOString(),
  };
}

async function fetchYouTube(videoUrl) {
  const apiUrl = `https://www.youtube.com/oembed?url=${encodeURIComponent(videoUrl)}&format=json`;
  const r = await fetch(apiUrl);
  if (!r.ok) throw new Error(`YouTube oEmbed ${r.status}`);
  const data = await r.json();
  return {
    platform: 'youtube',
    author_name: data.author_name,
    author_url: data.author_url,
    url: videoUrl,
    title: data.title,
    thumbnail_url: data.thumbnail_url,
    text: data.title,
    html: data.html,
    fetched_at: new Date().toISOString(),
  };
}

export async function fetchOembed(url) {
  if (!url || typeof url !== 'string') throw new Error('url required');

  // cache hit
  const cached = cacheGet(url);
  if (cached) return { ...cached, cached: true };

  let data;
  if (url.includes('twitter.com') || url.includes('x.com')) {
    data = await fetchTwitter(url);
  } else if (url.includes('youtube.com') || url.includes('youtu.be')) {
    data = await fetchYouTube(url);
  } else {
    throw new Error('Only Twitter/X and YouTube URLs supported');
  }

  cacheSet(url, data);
  return data;
}

// Express route helper
export function mountOembedRoutes(app) {
  // GET /api/oembed?url=...
  app.get('/api/oembed', async (req, res) => {
    try {
      const { url } = req.query;
      if (!url) return res.status(400).json({ error: 'url query required' });
      const data = await fetchOembed(url);
      // 同源 CORS
      res.set('Cache-Control', 'public, max-age=3600');
      res.json(data);
    } catch (e) {
      console.error('[oembed]', e.message);
      res.status(500).json({ error: e.message });
    }
  });

  // 批量(给前端 KOL 详情页一次拉所有 quote 卡片)
  app.post('/api/oembed/batch', async (req, res) => {
    try {
      const { urls } = req.body;
      if (!Array.isArray(urls)) return res.status(400).json({ error: 'urls[] required' });
      const results = await Promise.all(
        urls.slice(0, 20).map(u =>
          fetchOembed(u).catch(e => ({ url: u, error: e.message }))
        )
      );
      res.json({ results });
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  });
}
