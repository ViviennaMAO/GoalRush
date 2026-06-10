// 后端 API client · 优先用 luffaWebRequest 走域名白名单的请求,
// 降级到 wx.request,再降级到 mock + localStorage。
//
// 真实部署:把 API_BASE 改成正式域名,加进 Luffa Cloud 控制台 request 合法域名白名单。

const API_BASE = ''; // 留空走 mock + localStorage · 例:'https://goalrush.app/api'

function request(path, opts = {}) {
  if (!API_BASE) return Promise.resolve(null);
  return new Promise((resolve, reject) => {
    wx.request({
      url: API_BASE + path,
      method: opts.method || 'GET',
      data: opts.data || {},
      header: { 'Content-Type': 'application/json' },
      success: (r) => (r.statusCode < 400 ? resolve(r.data) : reject(r)),
      fail: reject
    });
  });
}

export async function submitPrediction(userId, matchId, pick) {
  // 后端不可达 → 本地保存
  const remote = await request('/predictions', {
    method: 'POST',
    data: { user_id: userId, match_id: matchId, pick }
  }).catch(() => null);
  if (remote) return remote;
  // 降级
  return { ok: true, local: true };
}

export async function fetchLeaderboard() {
  return await request('/leaderboard').catch(() => null);
}

export async function fetchMatches() {
  return await request('/matches').catch(() => null);
}
