// 种子数据脚本 · npm run seed
// 从前端 mock 数据初始化 db.json

import { store } from './store.js';

const MATCHES_SEED = [
  { id: 'm001', home: 'MEX', away: 'ARG', kickoff: '2026-06-11T19:00:00Z', competition: 'Group A · Opening', competition_type: 'group' },
  { id: 'm002', home: 'USA', away: 'ITA', kickoff: '2026-06-11T22:30:00Z', competition: 'Group D', competition_type: 'group' },
  { id: 'm003', home: 'ESP', away: 'BRA', kickoff: '2026-06-12T18:00:00Z', competition: 'Group C · Top match', competition_type: 'group' },
  { id: 'm004', home: 'GER', away: 'FRA', kickoff: '2026-06-12T21:00:00Z', competition: 'Group F · Classic', competition_type: 'group' },
  { id: 'm005', home: 'ENG', away: 'POR', kickoff: '2026-06-13T19:00:00Z', competition: 'Group B', competition_type: 'group' },
  { id: 'm006', home: 'NED', away: 'COL', kickoff: '2026-06-13T22:00:00Z', competition: 'Group E', competition_type: 'group' },
  { id: 'm007', home: 'BRA', away: 'URU', kickoff: '2026-06-14T18:00:00Z', competition: 'Group C · Derby', competition_type: 'group' },
  { id: 'm008', home: 'ARG', away: 'CHI', kickoff: '2026-06-14T21:00:00Z', competition: 'Group A', competition_type: 'group' },
];

const USERS_SEED = {
  'u_seed_lucas': { handle: '@LucasBR_Fut', created_at: '2026-05-01T00:00:00Z', groups_count: 5, social_connections: 200, rank: 1 },
  'u_seed_mariana': { handle: '@MarianaPicks', created_at: '2026-05-02T00:00:00Z', groups_count: 4, social_connections: 180, rank: 2 },
  'u_seed_diego': { handle: '@DiegoSportsES', created_at: '2026-05-03T00:00:00Z', groups_count: 3, social_connections: 220, rank: 3 },
};

await store.write(d => {
  d.matches = MATCHES_SEED.map(m => ({
    ...m,
    status: 'scheduled',
    external_ids: { sofascore: 'mock_' + m.id, api_football: 'mock_' + m.id, espn: 'mock_' + m.id },
  }));
  d.users = USERS_SEED;
  d.predictions = [];
  d.settlements = [];
  d.eds_grants = [];
});

console.log('✓ Seeded db.json');
console.log(`  Matches: ${MATCHES_SEED.length}`);
console.log(`  Seed users: ${Object.keys(USERS_SEED).length}`);
console.log('  Predictions / Settlements / Grants: 0 (clean)');
