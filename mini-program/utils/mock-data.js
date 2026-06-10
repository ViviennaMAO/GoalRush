// GoalRush mock 数据 · 与 web 端 data.js 对齐 · 加了「球迷社交」字段(动态流 / 球迷称号 / 讨论数)

// 球队元数据 · 含母语应援口号(cheer)+ 球队色 banner(c1 + c2 渐变)
// 应援口号有意保留各国母语,因为「VAMOS / FORZA / ALLEZ」是国际通用足球文化
export const TEAMS = {
  ARG: { code: 'ARG', name: '阿根廷', name_en: 'Argentina', flag: '🇦🇷', color: '#75AADB', fans: 412800, cheer: 'VAMOS ARGENTINA',     c1: '#75AADB', c2: '#FFFFFF', textOn: '#0F1F3A' },
  BRA: { code: 'BRA', name: '巴西',   name_en: 'Brazil',    flag: '🇧🇷', color: '#009E2A', fans: 528400, cheer: 'VAMOS BRASIL',         c1: '#FFDF00', c2: '#009E2A', textOn: '#0F1F0F' },
  MEX: { code: 'MEX', name: '墨西哥', name_en: 'Mexico',    flag: '🇲🇽', color: '#006847', fans: 215300, cheer: 'VAMOS MÉXICO',         c1: '#006847', c2: '#CE1126', textOn: '#FFFFFF' },
  USA: { code: 'USA', name: '美国',   name_en: 'USA',       flag: '🇺🇸', color: '#B31942', fans:  89400, cheer: 'USA · USA · USA',      c1: '#002868', c2: '#BF0A30', textOn: '#FFFFFF' },
  ESP: { code: 'ESP', name: '西班牙', name_en: 'Spain',     flag: '🇪🇸', color: '#AA151B', fans: 312500, cheer: '¡VAMOS ESPAÑA!',       c1: '#AA151B', c2: '#F1BF00', textOn: '#1A0A0A' },
  FRA: { code: 'FRA', name: '法国',   name_en: 'France',    flag: '🇫🇷', color: '#0055A4', fans: 198200, cheer: 'ALLEZ LES BLEUS',      c1: '#0055A4', c2: '#EF4135', textOn: '#FFFFFF' },
  GER: { code: 'GER', name: '德国',   name_en: 'Germany',   flag: '🇩🇪', color: '#000000', fans: 167800, cheer: 'AUF GEHT\'S DEUTSCHLAND', c1: '#000000', c2: '#FFCE00', textOn: '#FFFFFF' },
  ENG: { code: 'ENG', name: '英格兰', name_en: 'England',   flag: '🇬🇧', color: '#CE1124', fans: 245600, cheer: 'C\'MON ENGLAND',       c1: '#FFFFFF', c2: '#CE1124', textOn: '#0A0A1F' },
  POR: { code: 'POR', name: '葡萄牙', name_en: 'Portugal',  flag: '🇵🇹', color: '#006600', fans: 178300, cheer: 'FORÇA PORTUGAL',       c1: '#006600', c2: '#D52B1E', textOn: '#FFFFFF' },
  ITA: { code: 'ITA', name: '意大利', name_en: 'Italy',     flag: '🇮🇹', color: '#0066A2', fans: 154200, cheer: 'FORZA AZZURRI',        c1: '#0066A2', c2: '#FFFFFF', textOn: '#0A1F3A' },
  NED: { code: 'NED', name: '荷兰',   name_en: 'Netherlands', flag: '🇳🇱', color: '#FF4F00', fans: 132400, cheer: 'HUP HOLLAND HUP',      c1: '#FF6900', c2: '#FFFFFF', textOn: '#2A1A0A' },
  COL: { code: 'COL', name: '哥伦比亚', name_en: 'Colombia', flag: '🇨🇴', color: '#FCD116', fans: 178900, cheer: '¡VAMOS COLOMBIA!',     c1: '#FCD116', c2: '#003893', textOn: '#1A1500' },
  URU: { code: 'URU', name: '乌拉圭', name_en: 'Uruguay',   flag: '🇺🇾', color: '#7BA4DB', fans:  67200, cheer: 'VAMOS URUGUAY',        c1: '#7BA4DB', c2: '#FFFFFF', textOn: '#0F1F3A' },
  CHI: { code: 'CHI', name: '智利',   name_en: 'Chile',     flag: '🇨🇱', color: '#D52B1E', fans:  54800, cheer: '¡VAMOS CHILE!',        c1: '#D52B1E', c2: '#0033A0', textOn: '#FFFFFF' },
  JPN: { code: 'JPN', name: '日本',   name_en: 'Japan',     flag: '🇯🇵', color: '#BC002D', fans: 124500, cheer: 'NIPPON CHA-CHA-CHA',   c1: '#FFFFFF', c2: '#BC002D', textOn: '#1A0000' },
  KOR: { code: 'KOR', name: '韩国',   name_en: 'Korea',     flag: '🇰🇷', color: '#003478', fans:  89700, cheer: '대~한민국!',           c1: '#FFFFFF', c2: '#003478', textOn: '#0A0A1F' },
};

export const MATCHES = [
  { id: 'm001', home: 'MEX', away: 'ARG', kickoff: '2026-06-11T19:00:00Z', competition: '小组赛 A · 开幕战', venue: 'Estadio Azteca', distribution: { home: 28, draw: 22, away: 50 }, discussions: 1240, highlight: true },
  { id: 'm002', home: 'USA', away: 'ITA', kickoff: '2026-06-11T22:30:00Z', competition: '小组赛 D', venue: 'SoFi Stadium', distribution: { home: 38, draw: 30, away: 32 }, discussions: 420 },
  { id: 'm003', home: 'ESP', away: 'BRA', kickoff: '2026-06-12T18:00:00Z', competition: '小组赛 C · 重磅', venue: 'MetLife Stadium', distribution: { home: 42, draw: 24, away: 34 }, discussions: 3580, highlight: true },
  { id: 'm004', home: 'GER', away: 'FRA', kickoff: '2026-06-12T21:00:00Z', competition: '小组赛 F · 经典', venue: 'AT&T Stadium', distribution: { home: 35, draw: 30, away: 35 }, discussions: 2160, highlight: true },
  { id: 'm005', home: 'ENG', away: 'POR', kickoff: '2026-06-13T19:00:00Z', competition: '小组赛 B', venue: 'BMO Stadium', distribution: { home: 40, draw: 28, away: 32 }, discussions: 980 },
  { id: 'm006', home: 'NED', away: 'COL', kickoff: '2026-06-13T22:00:00Z', competition: '小组赛 E', venue: 'Mercedes-Benz Stadium', distribution: { home: 48, draw: 25, away: 27 }, discussions: 540 },
  { id: 'm007', home: 'BRA', away: 'URU', kickoff: '2026-06-14T18:00:00Z', competition: '小组赛 C · Derby', venue: 'MetLife Stadium', distribution: { home: 55, draw: 22, away: 23 }, discussions: 1820, highlight: true },
  { id: 'm008', home: 'ARG', away: 'CHI', kickoff: '2026-06-14T21:00:00Z', competition: '小组赛 A · 经典', venue: 'Estadio Azteca', distribution: { home: 62, draw: 20, away: 18 }, discussions: 1450, highlight: true },
];

export const KOLS = [
  { id: 'lucas_br',  name: 'Lucas Vargas',    handle: '@LucasBR_Fut',   flag: '🇧🇷', tier: 'S', followers: '524K', team: 'BRA', hit_rate: 74.5, eds_earned: 12840, current_rank: 1, fans: 18420, bio: '巴西足球评论员 · 圣保罗' },
  { id: 'mariana_ar', name: 'Mariana Picks',   handle: '@MarianaPicks',  flag: '🇦🇷', tier: 'S', followers: '318K', team: 'ARG', hit_rate: 70.2, eds_earned: 11620, current_rank: 2, fans: 14260, bio: '阿根廷国家队记者 · 布宜诺斯艾利斯' },
  { id: 'diego_es',  name: 'Diego Sports',    handle: '@DiegoSportsES', flag: '🇪🇸', tier: 'S', followers: '462K', team: 'ESP', hit_rate: 72.3, eds_earned: 10380, current_rank: 3, fans: 16840, bio: '西甲编辑 · 西班牙国家队 · 马德里' },
  { id: 'carlos_mx', name: 'Carlos Predictor', handle: '@CarlosPredictor',flag: '🇲🇽', tier: 'A', followers: '215K', team: 'MEX', hit_rate: 68.1, eds_earned: 8240, current_rank: 7, fans: 9420, bio: '墨西哥联赛分析 · CDMX' },
];

// 球迷动态流(home 首页主内容)
export const FEED = [
  { id: 'f001', type: 'kol_pick', kol: 'lucas_br', match: 'm003', pick: 'home', text: '西班牙这一战是命中率最高的赛季初战', ts_min: 12, likes: 348, replies: 42 },
  { id: 'f002', type: 'group_buzz', group: 'Hermanos del Sur 🌎', members: 47, text: '群里 89% 押巴西胜乌拉圭 · 你呢?', match: 'm007', ts_min: 18, likes: 156 },
  { id: 'f003', type: 'team_event', team: 'BRA', text: 'BRA 球迷增加了 1,240 人 · 4,820 人在讨论今晚开幕战气氛', ts_min: 25 },
  { id: 'f004', type: 'kol_pick', kol: 'mariana_ar', match: 'm001', pick: 'away', text: '梅西最后一届 · 阿根廷这次会拿', ts_min: 32, likes: 612, replies: 88 },
  { id: 'f005', type: 'milestone', text: '🎉 你完成了第 1 次预测 · 获得「初心球迷」称号', ts_min: 38 },
  { id: 'f006', type: 'group_buzz', group: 'La Roja Forever', members: 32, text: '群里 4 位 KOL 都押西班牙赢' , match: 'm003', ts_min: 45, likes: 89 },
  { id: 'f007', type: 'kol_pick', kol: 'diego_es', match: 'm009', pick: 'home', text: '西班牙这次锋线无敌', ts_min: 52, likes: 240, replies: 31 },
];

// 群组 mock
export const GROUPS = [
  { id: 'g001', name: 'Hermanos del Sur 🌎', members: 47, weekly_eds: 28400, top_handle: '@futbolero_pablo' },
  { id: 'g002', name: 'Samba Predictors',    members: 38, weekly_eds: 24820, top_handle: '@samba_predicts' },
  { id: 'g003', name: 'La Roja Forever',     members: 32, weekly_eds: 21440, top_handle: '@valencia_fan' },
  { id: 'g004', name: 'Aztec Warriors',      members: 29, weekly_eds: 18960, top_handle: '@CarlosPredictor' },
];

// 排行榜(多维)
export const LEADERBOARD_HIT = [
  { rank: 1, handle: '@LucasBR_Fut', flag: '🇧🇷', kol: 'lucas_br', hit_rate: 74.5, eds: 12840, streak: 5 },
  { rank: 2, handle: '@MarianaPicks', flag: '🇦🇷', kol: 'mariana_ar', hit_rate: 70.2, eds: 11620, streak: 3 },
  { rank: 3, handle: '@DiegoSportsES', flag: '🇪🇸', kol: 'diego_es', hit_rate: 72.3, eds: 10380, streak: 4 },
  { rank: 4, handle: '@futbolero_pablo', flag: '🇦🇷', hit_rate: 69.8, eds: 9240, streak: 6 },
  { rank: 5, handle: '@samba_predicts', flag: '🇧🇷', hit_rate: 67.5, eds: 8960, streak: 2 },
  { rank: 6, handle: '@valencia_fan', flag: '🇪🇸', hit_rate: 68.2, eds: 8640, streak: 1 },
  { rank: 7, handle: '@CarlosPredictor', flag: '🇲🇽', kol: 'carlos_mx', hit_rate: 68.1, eds: 8240, streak: 2 },
  { rank: 8, handle: '@rio_carioca', flag: '🇧🇷', hit_rate: 66.4, eds: 7820, streak: 3 },
];

// 球迷忠诚度榜(老粉 / 元老球迷)— 与命中率正交,是身份维度
export const LEADERBOARD_LOYALTY = [
  { rank: 1, handle: '@futbolero_pablo', flag: '🇦🇷', team: 'ARG', cups: 4, days: 1820, title: '元老球迷' },
  { rank: 2, handle: '@samba_predicts', flag: '🇧🇷', team: 'BRA', cups: 4, days: 1620, title: '元老球迷' },
  { rank: 3, handle: '@diego_clasico', flag: '🇪🇸', team: 'ESP', cups: 3, days: 1480, title: '资深球迷' },
  { rank: 4, handle: '@LucasBR_Fut', flag: '🇧🇷', kol: 'lucas_br', team: 'BRA', cups: 3, days: 1340, title: '资深球迷' },
  { rank: 5, handle: '@DiegoSportsES', flag: '🇪🇸', kol: 'diego_es', team: 'ESP', cups: 3, days: 1280, title: '资深球迷' },
];

// 单场比赛实时讨论(弹幕)mock
export const DISCUSSIONS_BY_MATCH = {
  m003: [
    { user: '@valencia_fan', flag: '🇪🇸', text: '西班牙锋线无敌 · 必胜!', team: 'ESP', ts_min: 3 },
    { user: '@samba_predicts', flag: '🇧🇷', text: 'Neymar 一回归就翻盘 🇧🇷', team: 'BRA', ts_min: 5 },
    { user: '@futbolero_pablo', flag: '🇦🇷', text: '坐等好戏', ts_min: 7 },
    { user: '@LucasBR_Fut', flag: '🇧🇷', team: 'BRA', kol: 'lucas_br', text: '我押巴西赢 1-0 · 但西班牙是命中率最高的赛季初战', ts_min: 8 },
    { user: '@diego_clasico', flag: '🇪🇸', team: 'ESP', text: '让球场说话 ⚽', ts_min: 10 },
  ],
  m007: [
    { user: '@samba_predicts', flag: '🇧🇷', team: 'BRA', text: '南美德比!', ts_min: 4 },
    { user: '@LucasBR_Fut', flag: '🇧🇷', team: 'BRA', kol: 'lucas_br', text: '巴西稳赢 · 押 home', ts_min: 6 },
  ]
};

// 球迷称号系统
export const FAN_TITLES = [
  { level: 1, name: '初心球迷', desc: '完成第 1 次预测', emoji: '⚽' },
  { level: 2, name: '常驻球迷', desc: '完成 10 次预测', emoji: '🎯' },
  { level: 3, name: '资深球迷', desc: '连续 3 届世界杯参与', emoji: '🏆' },
  { level: 4, name: '元老球迷', desc: '连续 4 届以上 + 100 场预测', emoji: '👑' },
];

// 工具
export function getTeam(code) {
  return TEAMS[code] || { code, name: code, flag: '⚽', color: '#999', fans: 0 };
}
export function getMatch(id) {
  return MATCHES.find(m => m.id === id);
}
export function getKOL(id) {
  return KOLS.find(k => k.id === id);
}
export function timeAgo(min) {
  if (min < 1) return '刚刚';
  if (min < 60) return min + ' 分钟前';
  const h = Math.floor(min / 60);
  if (h < 24) return h + ' 小时前';
  return Math.floor(h / 24) + ' 天前';
}
export function timeToKickoff(iso) {
  const diff = new Date(iso) - new Date();
  if (diff < 0) return 'LIVE';
  const h = Math.floor(diff / 3600000);
  const m = Math.floor((diff % 3600000) / 60000);
  if (h > 24) return Math.floor(h/24) + '天 ' + (h%24) + '时';
  if (h > 0) return h + '时 ' + m + '分';
  return m + ' 分';
}
export function formatTime(iso) {
  const d = new Date(iso);
  const M = (d.getMonth()+1);
  const D = d.getDate();
  const hh = String(d.getHours()).padStart(2, '0');
  const mm = String(d.getMinutes()).padStart(2, '0');
  return `${M}月${D}日 ${hh}:${mm}`;
}
