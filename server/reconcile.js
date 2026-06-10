// 多源对账引擎(PRD §7.1)
// 输入:三源 Promise(SofaScore + API-Football + ESPN)
// 输出:{ status, outcome, reconciliation, raw_sources_dump }

import * as sofa from './sources/sofascore.js';
import * as apif from './sources/api-football.js';
import * as espn from './sources/espn.js';

const SOURCES = [
  { name: 'sofascore', fn: sofa.fetchFinal, priority: 1 },
  { name: 'api-football', fn: apif.fetchFinal, priority: 2 },
  { name: 'espn', fn: espn.fetchFinal, priority: 3 },
];

const TIMEOUT_MS = 10_000;

function timeout(promise, ms, src) {
  return Promise.race([
    promise,
    new Promise((_, rej) => setTimeout(() => rej(new Error(`timeout: ${src}`)), ms)),
  ]).catch(err => ({ source: src, status: 'error', error: err.message }));
}

export async function reconcile(matchId) {
  const fetches = SOURCES.map(s => timeout(s.fn(matchId), TIMEOUT_MS, s.name));
  const results = await Promise.all(fetches);

  // 过滤出 final 状态的源
  const finals = results.filter(r => r.status === 'final');

  // 没有任何源 final → defer
  if (finals.length === 0) {
    return {
      status: 'pending',
      outcome: null,
      reconciliation: 'no_data',
      defer_until: 'next_check',
      raw_sources_dump: results,
      reconciled_at: new Date().toISOString(),
    };
  }

  // 仅 1 个源 final → defer 等其他源(避免单源决策)
  if (finals.length === 1) {
    return {
      status: 'pending',
      outcome: null,
      reconciliation: 'awaiting_quorum',
      defer_until: 'next_check',
      raw_sources_dump: results,
      reconciled_at: new Date().toISOString(),
    };
  }

  // 2+ 源 final → 对账
  const counts = {};
  finals.forEach(r => {
    counts[r.outcome] = (counts[r.outcome] || 0) + 1;
  });

  const outcomes = Object.keys(counts);

  // 规则 1:三源(或两源)一致 → consensus
  if (outcomes.length === 1) {
    return {
      status: 'settled',
      outcome: outcomes[0],
      reconciliation: finals.length === 3 ? 'consensus_3of3' : 'consensus_2of2',
      raw_sources_dump: results,
      reconciled_at: new Date().toISOString(),
    };
  }

  // 规则 2:三源 2:1 多数 → majority(发放但标记 review)
  if (finals.length === 3) {
    const sorted = Object.entries(counts).sort((a, b) => b[1] - a[1]);
    if (sorted[0][1] === 2) {
      return {
        status: 'settled',
        outcome: sorted[0][0],
        reconciliation: 'majority_2of3',
        flag: 'review_pending',
        raw_sources_dump: results,
        reconciled_at: new Date().toISOString(),
      };
    }
  }

  // 规则 3:全不一致(2 源各执一词,或 3 源各执一词)→ defer 强制 review
  return {
    status: 'review',
    outcome: null,
    reconciliation: 'conflict',
    defer_until: 'next_day_12:00_utc',
    raw_sources_dump: results,
    reconciled_at: new Date().toISOString(),
  };
}
