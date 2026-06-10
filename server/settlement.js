// 结算引擎(PRD §7.2 EDS 分发规则)
// 比赛结算 → 计算每个用户 EDS → 调用 EDS pipeline 发放
// 反作弊 L1 + L3 集成

import { reconcile } from './reconcile.js';
import { store } from './store.js';

// PRD §7.2 EDS 规则
const WEIGHT = { group: 1.0, knockout: 1.5, final: 2.0 };
const RANK_MULTIPLIER = { top10: 5.0, mid: 1.0, bottom50: 0.5 };
const DAILY_CAP_EDS = 200;
const WEEKLY_CAP_EDS = 1000;
const BASE_EDS_PER_HIT = 100;

// 反作弊 L1 · 账号成熟度
function accountMatureScore(user) {
  if (!user) return 0;
  const days = (Date.now() - new Date(user.created_at).getTime()) / 86400000;
  let score = 1.0;
  if (days < 7) score *= 0.5;
  if ((user.groups_count || 0) < 1) score *= 0.7;
  if ((user.social_connections || 0) < 5) score *= 0.8;
  return score;
}

// 反作弊 L3 · 排名乘数
function getRankMultiplier(rank, totalUsers) {
  const p = rank / totalUsers;
  if (p <= 0.1) return RANK_MULTIPLIER.top10;
  if (p <= 0.5) return RANK_MULTIPLIER.mid;
  return RANK_MULTIPLIER.bottom50;
}

// 用户当日 / 当周已发 EDS
function getUserGrantStats(userId) {
  const db = store.db;
  const now = Date.now();
  const day = 86400000;
  const week = 7 * day;
  const userGrants = db.eds_grants.filter(g => g.user_id === userId && g.status === 'sent');
  const today = userGrants.filter(g => now - new Date(g.granted_at).getTime() < day);
  const thisWeek = userGrants.filter(g => now - new Date(g.granted_at).getTime() < week);
  return {
    today: today.reduce((s, g) => s + g.amount, 0),
    week: thisWeek.reduce((s, g) => s + g.amount, 0),
  };
}

export async function settleMatch(matchId) {
  const db = store.db;
  const match = db.matches.find(m => m.id === matchId);
  if (!match) throw new Error('match not found');
  if (match.status === 'settled') return { skip: true, reason: 'already_settled' };

  // 1. 跑多源对账
  const recon = await reconcile(matchId);

  // 写入 settlement 日志(审计 · 不可删)
  const settlement_id = 'st_' + Date.now() + '_' + matchId;
  const settlement = {
    settlement_id,
    match_id: matchId,
    triggered_at: new Date().toISOString(),
    reconciliation: recon,
    eds_distributed: 0,
    predictions_total: 0,
    predictions_hit: 0,
    raw_sources_dump: recon.raw_sources_dump,
  };

  if (recon.status === 'pending' || recon.status === 'review') {
    await store.write(d => {
      match.status = recon.status;
      match.reconciliation = recon;
      d.settlements.push({ ...settlement, completed_at: null });
    });
    return { settled: false, reason: recon.reconciliation, recon };
  }

  // 2. 找该比赛所有预测
  const preds = db.predictions.filter(p => p.match_id === matchId && p.status === 'pending');
  const totalUsers = Object.keys(db.users).length || 1;
  let totalEdsDistributed = 0;
  let hits = 0;

  const grantPlans = [];
  for (const p of preds) {
    const hit = p.predicted_outcome === recon.outcome;
    p.is_hit = hit;
    p.status = 'settled';

    if (!hit) continue;
    hits++;

    const user = db.users[p.user_id];
    const matureScore = accountMatureScore(user);
    const weight = WEIGHT[match.competition_type || 'group'] || 1.0;
    const rankMult = getRankMultiplier(user?.rank || totalUsers, totalUsers);
    let amount = BASE_EDS_PER_HIT * weight * rankMult * matureScore;

    // 日 / 周上限
    const grants = getUserGrantStats(p.user_id);
    const remainDay = Math.max(0, DAILY_CAP_EDS - grants.today);
    const remainWeek = Math.max(0, WEEKLY_CAP_EDS - grants.week);
    amount = Math.min(amount, remainDay, remainWeek);
    amount = Math.round(amount);

    if (amount > 0) {
      grantPlans.push({
        grant_id: 'g_' + Date.now() + '_' + p.prediction_id,
        user_id: p.user_id,
        prediction_id: p.prediction_id,
        amount,
        reason: 'hit',
        anti_cheat_score: matureScore,
        status: 'pending',
        external_tx_id: null,
        granted_at: new Date().toISOString(),
      });
      totalEdsDistributed += amount;
    }
  }

  // 3. 持久化
  await store.write(d => {
    match.status = 'settled';
    match.result = {
      outcome: recon.outcome,
    };
    match.reconciliation = recon;
    settlement.eds_distributed = totalEdsDistributed;
    settlement.predictions_total = preds.length;
    settlement.predictions_hit = hits;
    settlement.completed_at = new Date().toISOString();
    d.settlements.push(settlement);
    d.eds_grants.push(...grantPlans);
  });

  // 4. 调用 EDS pipeline 发放(mock)
  // 实际生产:调 Luffa eds_service.grant() · 失败重试 + alert
  for (const g of grantPlans) {
    g.status = 'sent';
    g.external_tx_id = 'tx_mock_' + Math.random().toString(36).slice(2, 10);
  }
  await store.write(() => {}); // flush

  return {
    settled: true,
    settlement,
    eds_distributed: totalEdsDistributed,
    predictions_total: preds.length,
    predictions_hit: hits,
  };
}

// 批量结算所有 final-able 比赛
export async function settleAllFinal() {
  const db = store.db;
  const now = new Date();
  const candidates = db.matches.filter(m => {
    if (m.status === 'settled') return false;
    const kickoff = new Date(m.kickoff);
    // 假设比赛持续 2 小时,赛后 30 分钟可以结算
    return now - kickoff > 2.5 * 3600 * 1000;
  });
  const results = [];
  for (const m of candidates) {
    try {
      results.push({ match_id: m.id, ...(await settleMatch(m.id)) });
    } catch (e) {
      results.push({ match_id: m.id, error: e.message });
    }
  }
  return results;
}
