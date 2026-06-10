// Luffa Predict — Mock 数据
// 2026 FIFA World Cup · 6/11 - 7/19
// 真实球队 + 编排比赛 + Mock KOL / 用户榜

const TEAMS = {
 ARG: { name: 'Argentina', flag: '🇦🇷', code: 'ARG', color: '#75AADB' },
 BRA: { name: 'Brazil', flag: '🇧🇷', code: 'BRA', color: '#FFDF00' },
 MEX: { name: 'Mexico', flag: '🇲🇽', code: 'MEX', color: '#006847' },
 USA: { name: 'USA', flag: '🇺🇸', code: 'USA', color: '#B31942' },
 ESP: { name: 'Spain', flag: '🇪🇸', code: 'ESP', color: '#AA151B' },
 FRA: { name: 'France', flag: '🇫🇷', code: 'FRA', color: '#0055A4' },
 GER: { name: 'Germany', flag: '🇩🇪', code: 'GER', color: '#000000' },
 ENG: { name: 'England', flag: '🇬🇧', code: 'ENG', color: '#CE1124' },
 POR: { name: 'Portugal', flag: '🇵🇹', code: 'POR', color: '#006600' },
 ITA: { name: 'Italy', flag: '🇮🇹', code: 'ITA', color: '#009246' },
 NED: { name: 'Netherlands', flag: '🇳🇱', code: 'NED', color: '#FF4F00' },
 COL: { name: 'Colombia', flag: '🇨🇴', code: 'COL', color: '#FCD116' },
 URU: { name: 'Uruguay', flag: '🇺🇾', code: 'URU', color: '#7BA4DB' },
 CHI: { name: 'Chile', flag: '🇨🇱', code: 'CHI', color: '#D52B1E' },
 JPN: { name: 'Japan', flag: '🇯🇵', code: 'JPN', color: '#BC002D' },
 KOR: { name: 'South Korea', flag: '🇰🇷', code: 'KOR', color: '#003478' },
 MAR: { name: 'Morocco', flag: '🇲🇦', code: 'MAR', color: '#C1272D' },
 CRO: { name: 'Croatia', flag: '🇭🇷', code: 'CRO', color: '#FF0000' },
 BEL: { name: 'Belgium', flag: '🇧🇪', code: 'BEL', color: '#FAE042' },
 SUI: { name: 'Switzerland', flag: '🇨🇭', code: 'SUI', color: '#DA291C' },
};

// 编排的世界杯赛程(MVP 灰度 + 上线 24h 覆盖)
const MATCHES = [
 // === 6/11 周三 · 开幕日 ===
 {
 id: 'm001',
 home: 'MEX', away: 'ARG',
 kickoff: '2026-06-11T19:00:00Z',
 competition: 'Group A · Opening',
 venue: 'Estadio Azteca, Mexico City',
 weight: 1.0,
 status: 'scheduled',
 distribution: { home: 28, draw: 22, away: 50 },
 },
 {
 id: 'm002',
 home: 'USA', away: 'ITA',
 kickoff: '2026-06-11T22:30:00Z',
 competition: 'Group D',
 venue: 'SoFi Stadium, Los Angeles',
 weight: 1.0,
 status: 'scheduled',
 distribution: { home: 38, draw: 30, away: 32 },
 },
 // === 6/12 周四 ===
 {
 id: 'm003',
 home: 'ESP', away: 'BRA',
 kickoff: '2026-06-12T18:00:00Z',
 competition: 'Group C · Top match',
 venue: 'MetLife Stadium, NJ',
 weight: 1.0,
 status: 'scheduled',
 distribution: { home: 42, draw: 24, away: 34 },
 highlight: true,
 },
 {
 id: 'm004',
 home: 'GER', away: 'FRA',
 kickoff: '2026-06-12T21:00:00Z',
 competition: 'Group F · Classic',
 venue: 'AT&T Stadium, Dallas',
 weight: 1.0,
 status: 'scheduled',
 distribution: { home: 35, draw: 30, away: 35 },
 highlight: true,
 },
 // === 6/13 周五 ===
 {
 id: 'm005',
 home: 'ENG', away: 'POR',
 kickoff: '2026-06-13T19:00:00Z',
 competition: 'Group B',
 venue: 'BMO Stadium, Toronto',
 weight: 1.0,
 status: 'scheduled',
 distribution: { home: 40, draw: 28, away: 32 },
 },
 {
 id: 'm006',
 home: 'NED', away: 'COL',
 kickoff: '2026-06-13T22:00:00Z',
 competition: 'Group E',
 venue: 'Mercedes-Benz Stadium, Atlanta',
 weight: 1.0,
 status: 'scheduled',
 distribution: { home: 48, draw: 25, away: 27 },
 },
 // === 6/14 周六 · 周末高峰 ===
 {
 id: 'm007',
 home: 'BRA', away: 'URU',
 kickoff: '2026-06-14T18:00:00Z',
 competition: 'Group C · Derby',
 venue: 'MetLife Stadium, NJ',
 weight: 1.0,
 status: 'scheduled',
 distribution: { home: 55, draw: 22, away: 23 },
 highlight: true,
 },
 {
 id: 'm008',
 home: 'ARG', away: 'CHI',
 kickoff: '2026-06-14T21:00:00Z',
 competition: 'Group A · Classic',
 venue: 'Estadio Azteca, Mexico City',
 weight: 1.0,
 status: 'scheduled',
 distribution: { home: 62, draw: 20, away: 18 },
 highlight: true,
 },
 // === 6/15 周日 · 静默上线日 ===
 {
 id: 'm009',
 home: 'ESP', away: 'COL',
 kickoff: '2026-06-15T18:00:00Z',
 competition: 'Group C',
 venue: 'Hard Rock Stadium, Miami',
 weight: 1.0,
 status: 'scheduled',
 distribution: { home: 52, draw: 26, away: 22 },
 highlight: true,
 },
 {
 id: 'm010',
 home: 'FRA', away: 'CRO',
 kickoff: '2026-06-15T21:00:00Z',
 competition: 'Group F · Final rematch',
 venue: 'MetLife Stadium, NJ',
 weight: 1.0,
 status: 'scheduled',
 distribution: { home: 58, draw: 24, away: 18 },
 highlight: true,
 },
 // === 6/16 周一 ===
 {
 id: 'm011',
 home: 'JPN', away: 'MAR',
 kickoff: '2026-06-16T17:00:00Z',
 competition: 'Group H',
 venue: 'NRG Stadium, Houston',
 weight: 1.0,
 status: 'scheduled',
 distribution: { home: 42, draw: 30, away: 28 },
 },
 {
 id: 'm012',
 home: 'GER', away: 'BEL',
 kickoff: '2026-06-16T20:00:00Z',
 competition: 'Group F',
 venue: 'Lincoln Financial Field, Philadelphia',
 weight: 1.0,
 status: 'scheduled',
 distribution: { home: 48, draw: 28, away: 24 },
 },
 // === 6/17 周二 ===
 {
 id: 'm013',
 home: 'POR', away: 'KOR',
 kickoff: '2026-06-17T18:00:00Z',
 competition: 'Group B',
 venue: 'Lumen Field, Seattle',
 weight: 1.0,
 status: 'scheduled',
 distribution: { home: 64, draw: 22, away: 14 },
 },
 {
 id: 'm014',
 home: 'NED', away: 'SUI',
 kickoff: '2026-06-17T21:00:00Z',
 competition: 'Group E',
 venue: 'Levi\'s Stadium, San Francisco',
 weight: 1.0,
 status: 'scheduled',
 distribution: { home: 50, draw: 30, away: 20 },
 },
];

// KOL Mock(对应 04 文档 S/A 档建议)
const KOLS = [
 {
 id: 'lucas_br',
 name: 'Lucas Vargas',
 handle: '@LucasBR_Fut',
 region: 'BR',
 flag: '🇧🇷',
 bio: 'Comentarista de futebol · 球迷 + crypto · São Paulo',
 followers_x: 524000,
 followers_tiktok: 1200000,
 avatar_gradient: 'from-yellow-400 to-green-600',
 tier: 'S',
 stats: {
 total_predictions: 47,
 hits: 35,
 hit_rate: 74.5,
 current_rank: 1,
 eds_earned: 12_840,
 streak: 5,
 },
 recent_picks: [
 { match_id: 'm003', pick: 'home', team: 'ESP' },
 { match_id: 'm007', pick: 'home', team: 'BRA' },
 { match_id: 'm008', pick: 'home', team: 'ARG' },
 ],
 },
 {
 id: 'mariana_ar',
 name: 'Mariana Picks',
 handle: '@MarianaPicks',
 region: 'AR',
 flag: '🇦🇷',
 bio: 'Periodista deportiva · Selección Argentina · Buenos Aires',
 followers_x: 318000,
 followers_tiktok: 580000,
 avatar_gradient: 'from-sky-400 to-blue-700',
 tier: 'S',
 stats: {
 total_predictions: 47,
 hits: 33,
 hit_rate: 70.2,
 current_rank: 2,
 eds_earned: 11_620,
 streak: 3,
 },
 recent_picks: [
 { match_id: 'm001', pick: 'away', team: 'ARG' },
 { match_id: 'm008', pick: 'home', team: 'ARG' },
 ],
 },
 {
 id: 'diego_es',
 name: 'Diego Sports',
 handle: '@DiegoSportsES',
 region: 'ES',
 flag: '🇪🇸',
 bio: 'Cronista La Liga · Selección Española · Madrid',
 followers_x: 462000,
 followers_tiktok: 890000,
 avatar_gradient: 'from-red-500 to-yellow-500',
 tier: 'S',
 stats: {
 total_predictions: 47,
 hits: 34,
 hit_rate: 72.3,
 current_rank: 3,
 eds_earned: 10_380,
 streak: 4,
 },
 recent_picks: [
 { match_id: 'm003', pick: 'home', team: 'ESP' },
 { match_id: 'm009', pick: 'home', team: 'ESP' },
 ],
 },
 {
 id: 'carlos_mx',
 name: 'Carlos El Predictor',
 handle: '@CarlosPredictor',
 region: 'MX',
 flag: '🇲🇽',
 bio: 'Análisis Liga MX + Selección · CDMX',
 followers_x: 215000,
 followers_tiktok: 440000,
 avatar_gradient: 'from-green-600 to-red-600',
 tier: 'A',
 stats: {
 total_predictions: 47,
 hits: 32,
 hit_rate: 68.1,
 current_rank: 7,
 eds_earned: 8_240,
 streak: 2,
 },
 recent_picks: [
 { match_id: 'm001', pick: 'home', team: 'MEX' },
 ],
 },
];

// 全网排行榜 Mock(前 20 位)
const LEADERBOARD = [
 { rank: 1, handle: '@LucasBR_Fut', flag: '🇧🇷', kol: 'lucas_br', hit_rate: 74.5, eds: 12_840, streak: 5 },
 { rank: 2, handle: '@MarianaPicks', flag: '🇦🇷', kol: 'mariana_ar', hit_rate: 70.2, eds: 11_620, streak: 3 },
 { rank: 3, handle: '@DiegoSportsES', flag: '🇪🇸', kol: 'diego_es', hit_rate: 72.3, eds: 10_380, streak: 4 },
 { rank: 4, handle: '@futbolero_pablo', flag: '🇦🇷', hit_rate: 69.8, eds: 9_240, streak: 6 },
 { rank: 5, handle: '@samba_predicts', flag: '🇧🇷', hit_rate: 67.5, eds: 8_960, streak: 2 },
 { rank: 6, handle: '@valencia_fan', flag: '🇪🇸', hit_rate: 68.2, eds: 8_640, streak: 1 },
 { rank: 7, handle: '@CarlosPredictor', flag: '🇲🇽', kol: 'carlos_mx', hit_rate: 68.1, eds: 8_240, streak: 2 },
 { rank: 8, handle: '@rio_carioca', flag: '🇧🇷', hit_rate: 66.4, eds: 7_820, streak: 3 },
 { rank: 9, handle: '@aztecaFan', flag: '🇲🇽', hit_rate: 65.9, eds: 7_440, streak: 1 },
 { rank: 10, handle: '@madrid_predicts', flag: '🇪🇸', hit_rate: 64.7, eds: 7_120, streak: 0 },
 { rank: 11, handle: '@goal_keeper99', flag: '🇩🇪', hit_rate: 64.2, eds: 6_840, streak: 1 },
 { rank: 12, handle: '@tigerstars', flag: '🇰🇷', hit_rate: 63.8, eds: 6_520, streak: 2 },
 { rank: 13, handle: '@bogota_picks', flag: '🇨🇴', hit_rate: 62.5, eds: 6_180, streak: 0 },
 { rank: 14, handle: '@oranje_fan', flag: '🇳🇱', hit_rate: 62.1, eds: 5_960, streak: 1 },
 { rank: 15, handle: '@samurai_blue', flag: '🇯🇵', hit_rate: 61.9, eds: 5_720, streak: 3 },
 { rank: 16, handle: '@les_bleus_24', flag: '🇫🇷', hit_rate: 61.2, eds: 5_480, streak: 0 },
 { rank: 17, handle: '@viking_predicts', flag: '🇬🇧', hit_rate: 60.8, eds: 5_240, streak: 1 },
 { rank: 18, handle: '@porto_fan', flag: '🇵🇹', hit_rate: 60.1, eds: 4_980, streak: 0 },
 { rank: 19, handle: '@montevideo_fc', flag: '🇺🇾', hit_rate: 59.5, eds: 4_720, streak: 2 },
 { rank: 20, handle: '@atlas_morocco', flag: '🇲🇦', hit_rate: 59.0, eds: 4_480, streak: 1 },
];

// 群组排行榜 Mock
const GROUPS = [
 { id: 'g001', name: 'Hermanos del Sur ', members: 47, total_eds: 28_400, top_handle: '@futbolero_pablo' },
 { id: 'g002', name: 'Samba Predictors', members: 38, total_eds: 24_820, top_handle: '@samba_predicts' },
 { id: 'g003', name: 'La Roja Forever', members: 32, total_eds: 21_440, top_handle: '@valencia_fan' },
 { id: 'g004', name: 'Aztec Warriors', members: 29, total_eds: 18_960, top_handle: '@CarlosPredictor' },
 { id: 'g005', name: 'Lucas BR Fans', members: 124, total_eds: 18_240, top_handle: '@LucasBR_Fut' },
];

// 7 天观察期统计(对外品牌曝光)
const PLATFORM_STATS = {
 total_users: 12_847,
 total_predictions: 38_420,
 total_eds_distributed: 245_600,
 active_today: 4_280,
 matches_settled: 8,
 settlement_accuracy: 99.7,
};

// 工具:格式化时间
function formatKickoff(iso, locale = 'zh-CN') {
 const d = new Date(iso);
 const opts = { month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit', hour12: false };
 return d.toLocaleString(locale, opts);
}

function timeUntilKickoff(iso) {
 const now = new Date();
 const k = new Date(iso);
 const diff = k - now;
 if (diff < 0) return 'LIVE / FINAL';
 const h = Math.floor(diff / 3600000);
 const m = Math.floor((diff % 3600000) / 60000);
 if (h > 24) return `${Math.floor(h / 24)}d ${h % 24}h`;
 if (h > 0) return `${h}h ${m}m`;
 return `${m}m`;
}

function getMatch(id) {
 return MATCHES.find(m => m.id === id);
}

function getKOL(id) {
 return KOLS.find(k => k.id === id);
}

function getTeam(code) {
 return TEAMS[code] || { name: code, flag: '', code, color: '#999' };
}
