// ESPN 数据源 wrapper(校验源)
// 文档:https://site.api.espn.com/apis/site/v2/sports/soccer/fifa.world/scoreboard
// SLA:10-15 min · 但权威

const MOCK_DELAY_MS = 120;

function deterministicOutcome(matchId, seed = 3) {
  let h = seed;
  for (let i = 0; i < matchId.length; i++) {
    h = ((h << 5) - h + matchId.charCodeAt(i)) | 0;
  }
  const r = Math.abs(h) % 100;
  // ESPN seed 略有不同 → 偶尔与其他两源不一致(模拟真实情况)
  if (r < 47) return { outcome: 'home', home_score: 2, away_score: 1 };
  if (r < 72) return { outcome: 'away', home_score: 1, away_score: 2 };
  return { outcome: 'draw', home_score: 1, away_score: 1 };
}

export async function fetchFinal(matchId) {
  await new Promise(r => setTimeout(r, MOCK_DELAY_MS));

  // 15% 模拟「ESPN 还没出结果」(它最慢)
  const matchSeed = matchId.charCodeAt(matchId.length - 1) || 0;
  if (matchSeed % 7 === 0) {
    return { source: 'espn', status: 'live', match_id: matchId };
  }

  const res = deterministicOutcome(matchId);
  return {
    source: 'espn',
    status: 'final',
    match_id: matchId,
    ...res,
    fetched_at: new Date().toISOString(),
  };
}
