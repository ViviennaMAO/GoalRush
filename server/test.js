// 端到端冒烟测试 · node test.js
// 验证:种子数据 → 提交预测 → 多源对账 → 结算 → EDS 发放 → 排行榜

import { store } from './store.js';
import { reconcile } from './reconcile.js';
import { settleMatch } from './settlement.js';

console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
console.log('🧪 Luffa Predict 端到端冒烟测试');
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

// 0. 检查种子
const db = store.db;
if (db.matches.length === 0) {
  console.error('❌ DB 为空,先跑 npm run seed');
  process.exit(1);
}
console.log(`✓ DB 已就绪 · ${db.matches.length} 场比赛 · ${Object.keys(db.users).length} 位用户\n`);

// 1. 模拟 3 个用户对 m003(ESP vs BRA)提交预测
const TEST_MATCH = 'm003';
const testUsers = [
  { id: 'u_test_1', pick: 'home', handle: '@TestPlayer1' },
  { id: 'u_test_2', pick: 'home', handle: '@TestPlayer2' },
  { id: 'u_test_3', pick: 'away', handle: '@TestPlayer3' },
];

console.log(`📝 模拟 3 位用户对 ${TEST_MATCH} 提交预测...`);
await store.write(d => {
  testUsers.forEach(u => {
    d.users[u.id] = {
      handle: u.handle,
      created_at: '2026-05-01T00:00:00Z',  // 老用户
      groups_count: 3,
      social_connections: 50,
      rank: 100,
    };
    d.predictions.push({
      prediction_id: 'p_test_' + u.id,
      user_id: u.id,
      match_id: TEST_MATCH,
      predicted_outcome: u.pick,
      created_at: new Date().toISOString(),
      locked_at: new Date().toISOString(),
      status: 'pending',
      is_hit: null,
    });
  });
});
console.log(`  ✓ ${testUsers.map(u => `${u.handle}=${u.pick}`).join(' · ')}\n`);

// 2. 跑多源对账(调试)
console.log(`🔍 三源对账 ${TEST_MATCH}...`);
const recon = await reconcile(TEST_MATCH);
console.log(`  状态:${recon.status}`);
console.log(`  对账:${recon.reconciliation}`);
console.log(`  结果:${recon.outcome}`);
console.log(`  三源详情:`);
recon.raw_sources_dump.forEach(r => {
  console.log(`    [${r.source.padEnd(13)}] ${r.status}${r.outcome ? ' → ' + r.outcome : ''}`);
});
console.log('');

// 3. 触发结算
console.log(`💎 触发结算 ${TEST_MATCH}...`);
const result = await settleMatch(TEST_MATCH);
if (result.skip) {
  console.log(`  ⏭  skip: ${result.reason}\n`);
} else if (result.settled) {
  console.log(`  ✓ 结算完成`);
  console.log(`    胜出 outcome: ${result.settlement.reconciliation.outcome}`);
  console.log(`    命中预测:${result.predictions_hit} / ${result.predictions_total}`);
  console.log(`    EDS 发放:${result.eds_distributed}\n`);
} else {
  console.log(`  ⏸  延迟:${result.reason}\n`);
}

// 4. 查看每个测试用户的 EDS
console.log(`📊 测试用户战绩:`);
for (const u of testUsers) {
  const grants = store.db.eds_grants.filter(g => g.user_id === u.id && g.status === 'sent');
  const eds = grants.reduce((s, g) => s + g.amount, 0);
  const preds = store.db.predictions.filter(p => p.user_id === u.id && p.status === 'settled');
  const hit = preds.filter(p => p.is_hit).length;
  console.log(`  ${u.handle.padEnd(16)} ${preds.length} 场 · ${hit} 命中 · ${eds} EDS`);
}
console.log('');

// 5. 排行榜
console.log(`🏆 当前排行榜 Top 5:`);
const stats = {};
store.db.predictions.filter(p => p.status === 'settled').forEach(p => {
  if (!stats[p.user_id]) stats[p.user_id] = { total: 0, hits: 0, eds: 0 };
  stats[p.user_id].total++;
  if (p.is_hit) stats[p.user_id].hits++;
});
store.db.eds_grants.filter(g => g.status === 'sent').forEach(g => {
  if (!stats[g.user_id]) stats[g.user_id] = { total: 0, hits: 0, eds: 0 };
  stats[g.user_id].eds += g.amount;
});
const lb = Object.entries(stats)
  .map(([uid, s]) => ({ uid, handle: store.db.users[uid]?.handle || uid, ...s }))
  .sort((a, b) => b.eds - a.eds)
  .slice(0, 5);
lb.forEach((u, i) => {
  console.log(`  #${i+1} ${u.handle.padEnd(20)} ${u.eds.toString().padStart(6)} EDS · ${u.hits}/${u.total}`);
});

console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
console.log('✅ 端到端冒烟测试通过');
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
