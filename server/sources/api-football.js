// API-Football 数据源 wrapper
// 文档:https://www.api-football.com/documentation-v3
// SLA:5-10 min

const MOCK_DELAY_MS = 80;

function deterministicOutcome(matchId, seed = 2) {
  let h = seed;
  for (let i = 0; i < matchId.length; i++) {
    h = ((h << 5) - h + matchId.charCodeAt(i)) | 0;
  }
  const r = Math.abs(h) % 100;
  if (r < 43) return { outcome: 'home', home_score: 2, away_score: 1 };
  if (r < 68) return { outcome: 'away', home_score: 1, away_score: 2 };
  return { outcome: 'draw', home_score: 1, away_score: 1 };
}

export async function fetchFinal(matchId) {
  await new Promise(r => setTimeout(r, MOCK_DELAY_MS));

  // 10% 模拟「数据延迟」(scheduled / live)
  const matchSeed = matchId.charCodeAt(matchId.length - 1) || 0;
  if (matchSeed % 10 === 0) {
    return { source: 'api-football', status: 'live', match_id: matchId };
  }

  const res = deterministicOutcome(matchId);
  return {
    source: 'api-football',
    status: 'final',
    match_id: matchId,
    ...res,
    fetched_at: new Date().toISOString(),
  };
}
