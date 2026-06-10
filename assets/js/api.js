// Luffa Predict — 前端 API client
// 可选启用 · 设置 window.LUFFA_API_BASE 即接后端,否则继续走 localStorage
//
// 用法:
//   <script>window.LUFFA_API_BASE = 'http://localhost:3001/api';</script>
//   <script src="assets/js/api.js"></script>
// 然后在页面里用 LuffaAPI.xxx() 替换原来的 STATE 操作

const LuffaAPI = (function() {
  const BASE = () => window.LUFFA_API_BASE || null;
  const enabled = () => !!BASE();

  async function call(path, opts = {}) {
    if (!enabled()) return null;
    try {
      const r = await fetch(BASE() + path, {
        ...opts,
        headers: { 'Content-Type': 'application/json', ...(opts.headers || {}) },
      });
      if (!r.ok) throw new Error('HTTP ' + r.status);
      return await r.json();
    } catch (e) {
      console.warn('[LuffaAPI] fallback to local:', e.message);
      return null;
    }
  }

  return {
    enabled,
    health: () => call('/health'),
    fetchMatches: () => call('/matches'),
    fetchMatch: (id) => call(`/match/${id}`),
    submitPrediction: (userId, matchId, pick) => call('/predictions', {
      method: 'POST',
      body: JSON.stringify({ user_id: userId, match_id: matchId, pick }),
    }),
    fetchMyPredictions: (userId) => call(`/predictions/${userId}`),
    fetchLeaderboard: () => call('/leaderboard'),
    adminSettle: (matchId) => call(`/admin/settle/${matchId}`, { method: 'POST' }),
    adminSettleAll: () => call('/admin/settle-all', { method: 'POST' }),
    debugReconcile: (matchId) => call(`/debug/reconcile/${matchId}`),
  };
})();

// 自动检测后端 health
if (window.LUFFA_API_BASE) {
  LuffaAPI.health().then(h => {
    if (h?.ok) {
      console.log('[LuffaAPI] ✓ backend connected:', h);
      window.LUFFA_BACKEND_OK = true;
    } else {
      console.warn('[LuffaAPI] ✗ backend not reachable, using local storage');
      window.LUFFA_BACKEND_OK = false;
    }
  });
}
