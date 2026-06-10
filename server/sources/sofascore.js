// SofaScore 数据源 wrapper
// MVP 阶段:mock 实现,deterministic per match_id
// 生产:接 SofaScore RapidAPI / 官方 API
// 文档:https://rapidapi.com/fluis.lacasse/api/sofascores
// SLA:5 min 内 final

const MOCK_DELAY_MS = 50;

// 确定性 mock:同一 match_id 永远返回同样的结果(便于测试)
function deterministicOutcome(matchId, seed = 0) {
  let h = seed;
  for (let i = 0; i < matchId.length; i++) {
    h = ((h << 5) - h + matchId.charCodeAt(i)) | 0;
  }
  const r = Math.abs(h) % 100;
  if (r < 45) return { outcome: 'home', home_score: 2, away_score: 1 };
  if (r < 70) return { outcome: 'away', home_score: 1, away_score: 2 };
  return { outcome: 'draw', home_score: 1, away_score: 1 };
}

export async function fetchFinal(matchId) {
  // 模拟网络延迟
  await new Promise(r => setTimeout(r, MOCK_DELAY_MS));

  // 5% 模拟「数据未 final」(scheduled / live)
  const matchSeed = matchId.charCodeAt(matchId.length - 1) || 0;
  if (matchSeed % 20 === 0) {
    return { source: 'sofascore', status: 'live', match_id: matchId };
  }

  const res = deterministicOutcome(matchId, 1); // seed 1
  return {
    source: 'sofascore',
    status: 'final',
    match_id: matchId,
    ...res,
    fetched_at: new Date().toISOString(),
  };
}

// 生产实现参考:
// export async function fetchFinal(matchId, externalId) {
//   const r = await fetch(`https://api.sofascore.com/api/v1/event/${externalId}`);
//   const j = await r.json();
//   if (j.event?.status?.type !== 'finished') return { status: 'live', ... };
//   const home = j.event.homeScore.current;
//   const away = j.event.awayScore.current;
//   return { outcome: home > away ? 'home' : home < away ? 'away' : 'draw', ... };
// }
