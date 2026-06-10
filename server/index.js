// Luffa Predict 后端 API · MVP
// Express + JSON 持久化 · 演示 PRD §6/§7 端到端
//
// 路由:
//   GET  /api/matches                  ── 全比赛列表(含结果状态)
//   GET  /api/match/:id                ── 单场详情
//   POST /api/predictions              ── { user_id, match_id, pick } 提交预测
//   GET  /api/predictions/:user_id     ── 用户预测历史
//   GET  /api/leaderboard              ── 全网排行榜
//   POST /api/admin/settle/:match_id   ── 触发结算(测试用)
//   POST /api/admin/settle-all         ── 批量结算所有 final-able
//   GET  /api/health

import express from 'express';
import cors from 'cors';
import { store } from './store.js';
import { reconcile } from './reconcile.js';
import { settleMatch, settleAllFinal } from './settlement.js';

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// === 比赛 ===
app.get('/api/matches', (req, res) => {
  res.json({ matches: store.db.matches });
});

app.get('/api/match/:id', (req, res) => {
  const m = store.db.matches.find(x => x.id === req.params.id);
  if (!m) return res.status(404).json({ error: 'not_found' });
  res.json({ match: m });
});

// === 预测 ===
app.post('/api/predictions', async (req, res) => {
  const { user_id, match_id, pick, device_fingerprint, ip_country } = req.body;
  if (!user_id || !match_id || !['home', 'draw', 'away'].includes(pick)) {
    return res.status(400).json({ error: 'invalid_input' });
  }
  const match = store.db.matches.find(m => m.id === match_id);
  if (!match) return res.status(404).json({ error: 'match_not_found' });

  // 锁定截止 = 开赛前 5 分钟
  const kickoff = new Date(match.kickoff);
  if (Date.now() > kickoff.getTime() - 5 * 60 * 1000) {
    return res.status(403).json({ error: 'predictions_locked', kickoff: match.kickoff });
  }

  // 同用户同比赛 upsert
  await store.write(d => {
    const existing = d.predictions.find(p => p.user_id === user_id && p.match_id === match_id);
    if (existing) {
      existing.predicted_outcome = pick;
      existing.updated_at = new Date().toISOString();
    } else {
      d.predictions.push({
        prediction_id: 'p_' + Date.now() + '_' + Math.random().toString(36).slice(2, 7),
        user_id,
        match_id,
        predicted_outcome: pick,
        device_fingerprint: device_fingerprint || null,
        ip_country: ip_country || null,
        created_at: new Date().toISOString(),
        locked_at: new Date(kickoff.getTime() - 5 * 60 * 1000).toISOString(),
        status: 'pending',
        is_hit: null,
      });
    }
    // 自动创建 user
    if (!d.users[user_id]) {
      d.users[user_id] = {
        handle: '@User_' + user_id.slice(-6),
        created_at: new Date().toISOString(),
        groups_count: 0,
        social_connections: 0,
        rank: 9999,
      };
    }
  });

  res.json({ ok: true });
});

app.get('/api/predictions/:user_id', (req, res) => {
  const preds = store.db.predictions.filter(p => p.user_id === req.params.user_id);
  const total = preds.length;
  const settled = preds.filter(p => p.status === 'settled');
  const hits = settled.filter(p => p.is_hit).length;
  const grants = store.db.eds_grants.filter(g => g.user_id === req.params.user_id && g.status === 'sent');
  const eds = grants.reduce((s, g) => s + g.amount, 0);
  res.json({
    predictions: preds,
    stats: {
      total,
      pending: total - settled.length,
      settled: settled.length,
      hits,
      hit_rate: settled.length > 0 ? Math.round(hits / settled.length * 100) : 0,
      eds,
    },
  });
});

// === 排行榜 ===
app.get('/api/leaderboard', (req, res) => {
  const stats = {};
  store.db.predictions.filter(p => p.status === 'settled').forEach(p => {
    if (!stats[p.user_id]) stats[p.user_id] = { user_id: p.user_id, total: 0, hits: 0, eds: 0 };
    stats[p.user_id].total++;
    if (p.is_hit) stats[p.user_id].hits++;
  });
  store.db.eds_grants.filter(g => g.status === 'sent').forEach(g => {
    if (!stats[g.user_id]) stats[g.user_id] = { user_id: g.user_id, total: 0, hits: 0, eds: 0 };
    stats[g.user_id].eds += g.amount;
  });
  const list = Object.values(stats)
    .map(s => ({
      ...s,
      handle: store.db.users[s.user_id]?.handle || s.user_id,
      hit_rate: s.total > 0 ? Math.round(s.hits / s.total * 100) : 0,
    }))
    .sort((a, b) => b.eds - a.eds)
    .slice(0, 50);
  res.json({ leaderboard: list });
});

// === 结算(admin / cron)===
app.post('/api/admin/settle/:match_id', async (req, res) => {
  try {
    const r = await settleMatch(req.params.match_id);
    res.json(r);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.post('/api/admin/settle-all', async (req, res) => {
  try {
    const r = await settleAllFinal();
    res.json({ settled: r });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// 调试:测试单源对账(不持久化)
app.get('/api/debug/reconcile/:match_id', async (req, res) => {
  const r = await reconcile(req.params.match_id);
  res.json(r);
});

// === Health ===
app.get('/api/health', (req, res) => {
  const db = store.db;
  res.json({
    ok: true,
    matches: db.matches.length,
    predictions: db.predictions.length,
    settlements: db.settlements.length,
    eds_distributed: db.eds_grants.filter(g => g.status === 'sent').reduce((s, g) => s + g.amount, 0),
    settled_matches: db.matches.filter(m => m.status === 'settled').length,
  });
});

app.listen(PORT, () => {
  console.log(`
🚀 Luffa Predict API on http://localhost:${PORT}

  GET  /api/health                       — 服务状态
  GET  /api/matches                      — 比赛列表
  POST /api/predictions                  — 提交预测
  GET  /api/leaderboard                  — 排行榜
  POST /api/admin/settle/:match_id       — 触发单场结算
  POST /api/admin/settle-all             — 批量结算
  GET  /api/debug/reconcile/:match_id    — 调试三源对账

  Run:
    npm run seed                 ── 初始化数据
    npm start                    ── 起服务

  Try:
    curl -X POST http://localhost:${PORT}/api/predictions \\
      -H 'Content-Type: application/json' \\
      -d '{"user_id":"u_demo","match_id":"m003","pick":"home"}'

    curl -X POST http://localhost:${PORT}/api/admin/settle/m003
  `);
});
