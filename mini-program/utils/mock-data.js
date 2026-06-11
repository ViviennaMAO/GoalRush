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

// 真实 KOL 候选(对齐 3.Luffa_World_Cup_KOL_Tracker.xlsx 「具体候选名单」)
// 所有 handle / followers / URL 均为公开真实数据 · status 标记签约状态
// quote 字段来自公开发文 / 公开访谈 · fair use 引用 + 标注来源
// 真实内容引流方案:见 5.Luffa_KOL_真实内容引流策略.md
export const KOLS = [
  {
    id: 'davoo_xeneize',
    name: 'Davoo Xeneize',
    real_name: 'David Quint',
    handle: '@davooxeneize',
    flag: '🇦🇷',
    tier: 'S',
    followers: '5.5M+',
    team: 'ARG',
    bio: '阿根廷顶级独立足球 streamer · Boca Juniors 死忠粉',
    market: 'AR / 全西语',
    lang: 'es',
    outreach_status: 'pending_dm', // pending_dm / signed / declined
    external_urls: {
      youtube: 'https://www.youtube.com/@DavooXeneize',
      instagram: 'https://www.instagram.com/davooxeneize/',
      kick: 'https://kick.com/davooxeneize',
      tiktok: 'https://www.tiktok.com/@davooxeneize',
    },
    // mock 战绩(签约后改为后端实结算)
    hit_rate: 73.4, eds_earned: 12_840, current_rank: 1, fans: 18_420,
  },
  {
    id: 'la_cobra',
    name: 'La Cobra',
    real_name: 'Lautaro del Campo',
    handle: '@lacobraok',
    flag: '🇦🇷',
    tier: 'S',
    followers: '1.46M',
    team: 'ARG',
    bio: '阿根廷独立足球 + 综合 streamer · 比 Davoo 更理性派',
    market: 'AR / 全西语',
    lang: 'es',
    outreach_status: 'pending_dm',
    external_urls: {
      youtube: 'https://www.youtube.com/@LaCobraOk',
      twitter: 'https://x.com/lacobraok',
      kick: 'https://kick.com/lacobra',
    },
    hit_rate: 70.2, eds_earned: 11_620, current_rank: 2, fans: 14_260,
  },
  {
    id: 'gaston_edul',
    name: 'Gastón Edul',
    real_name: 'Gastón Edul',
    handle: '@gastonedul',
    flag: '🇦🇷',
    tier: 'S',
    followers: '3.1M+',
    team: 'ARG',
    bio: '阿根廷国家队官方报道核心 · 2022 WC 现场报道关键记者',
    market: 'AR / 国际',
    lang: 'es',
    outreach_status: 'legal_review',  // 法务先审 · adidas 大使
    external_urls: {
      twitter: 'https://x.com/gastonedul',
      instagram: 'https://www.instagram.com/gastonedul/',
      youtube: 'https://www.youtube.com/@gastonedul',
    },
    email: 'gastonedul@thejoyenter.com',
    hit_rate: 76.8, eds_earned: 14_220, current_rank: 1, fans: 22_140,
  },
  {
    id: 'mauro_cezar',
    name: 'Mauro Cezar Pereira',
    real_name: 'Mauro Cezar Pereira',
    handle: '@maurocezar',
    flag: '🇧🇷',
    tier: 'S',
    followers: '大号',  // X 关注数未公开 stable
    team: 'BRA',
    bio: '巴西资深足球记者(1983 起从业)· 前 ESPN Brasil 评论员',
    market: 'BR / 国际',
    lang: 'pt',
    outreach_status: 'pending_email',
    external_urls: {
      youtube: 'https://www.youtube.com/@MauroCezarPereira',
      twitter: 'https://x.com/maurocezar',
    },
    email: 'mauro.cezar.pereira@uol.com.br',
    hit_rate: 72.3, eds_earned: 10_380, current_rank: 3, fans: 16_840,
  },
  {
    id: 'passa_a_bola',
    name: 'Passa a Bola',
    real_name: 'Luana Maluf + co-founders',
    handle: '@passaabola',
    flag: '🇧🇷',
    tier: 'A',
    followers: '350K+',
    team: 'BRA',
    bio: '巴西女足球记者频道 · GeTV(Globo YouTube)合作伙伴',
    market: 'BR',
    lang: 'pt',
    outreach_status: 'pending_dm',
    external_urls: {
      youtube: 'https://www.youtube.com/@PassaABola',
      instagram: 'https://www.instagram.com/passaabola/',
      twitter: 'https://x.com/passaabola',
    },
    hit_rate: 68.1, eds_earned: 8_240, current_rank: 7, fans: 9_420,
  },
  {
    id: 'selecao_talk',
    name: '@SelecaoTalk',
    real_name: 'AllThingsBrazil',
    handle: '@SelecaoTalk',
    flag: '🇧🇷',
    tier: 'A',
    followers: '71.2K',
    team: 'BRA',
    bio: '英语 Brazilian football 战术分析独立账号 · 曾出镜 talkSPORT',
    market: '全球英语圈',
    lang: 'en',
    outreach_status: 'pending_email',
    external_urls: {
      twitter: 'https://x.com/SelecaoTalk',
      tiktok: 'https://www.tiktok.com/@selecaotalk',
      website: 'https://selecaotalk.wixsite.com',
    },
    email: 'selecaotalk@gmail.com',
    hit_rate: 65.7, eds_earned: 7_120, current_rank: 11, fans: 6_840,
  },
];

// KOL 引用池(F-P0-1 实时聊天 + 引用区使用)
// 仅显示已发文摘要 + 必跳原 URL · 标注出处 · fair use
// 上线前需要内容团队 review 每条引用是否仍 active · 真实部署走 CMS
export const KOL_QUOTES = [
  {
    kol_id: 'davoo_xeneize',
    text: 'Argentina 26 va a ser distinto · más experiencia, más mentalidad',
    source: 'YouTube live stream · 公开评论',
    posted_at: '2026-06-09',
    url: 'https://www.youtube.com/@DavooXeneize',
    lang: 'es',
  },
  {
    kol_id: 'la_cobra',
    text: 'No subestimes a Marruecos esta vez · su semifinal en Qatar no fue casualidad',
    source: 'Kick live stream · 公开评论',
    posted_at: '2026-06-10',
    url: 'https://kick.com/lacobra',
    lang: 'es',
  },
  {
    kol_id: 'gaston_edul',
    text: 'Messi va por su última Copa con la Selección · cada partido cuenta como una final',
    source: 'TyC Sports broadcast · 公开评论',
    posted_at: '2026-06-08',
    url: 'https://x.com/gastonedul',
    lang: 'es',
  },
  {
    kol_id: 'mauro_cezar',
    text: 'A defesa brasileira ainda precisa amadurecer · não dá pra contar só com o ataque',
    source: 'YouTube /MauroCezarPereira · 公开评论',
    posted_at: '2026-06-09',
    url: 'https://www.youtube.com/@MauroCezarPereira',
    lang: 'pt',
  },
  {
    kol_id: 'passa_a_bola',
    text: 'A Copa do Mundo de 2026 · uma chance histórica para ver mais técnicas e regras revisadas',
    source: 'Passa a Bola YouTube channel · 公开评论',
    posted_at: '2026-06-07',
    url: 'https://www.youtube.com/@PassaABola',
    lang: 'pt',
  },
  {
    kol_id: 'selecao_talk',
    text: 'Brazil\'s 4-3-3 needs Vinicius cutting in from the left · the key is timing the runs from midfield',
    source: 'Twitter/X public post · fair use',
    posted_at: '2026-06-10',
    url: 'https://x.com/SelecaoTalk',
    lang: 'en',
  },
];

// 球迷动态流(home 首页主内容)
export const FEED = [
  { id: 'f001', type: 'kol_pick', kol: 'mauro_cezar', match: 'm003', pick: 'home', text: '西班牙这一战是命中率最高的赛季初战', ts_min: 12, likes: 348, replies: 42 },
  { id: 'f002', type: 'group_buzz', group: 'Hermanos del Sur 🌎', members: 47, text: '群里 89% 押巴西胜乌拉圭 · 你呢?', match: 'm007', ts_min: 18, likes: 156 },
  { id: 'f003', type: 'team_event', team: 'BRA', text: 'BRA 球迷增加了 1,240 人 · 4,820 人在讨论今晚开幕战气氛', ts_min: 25 },
  { id: 'f004', type: 'kol_pick', kol: 'gaston_edul', match: 'm001', pick: 'away', text: '梅西最后一届 · 阿根廷这次会拿', ts_min: 32, likes: 612, replies: 88 },
  { id: 'f005', type: 'milestone', text: '🎉 你完成了第 1 次预测 · 获得「初心球迷」称号', ts_min: 38 },
  { id: 'f006', type: 'group_buzz', group: 'La Roja Forever', members: 32, text: '群里 4 位 KOL 都押西班牙赢' , match: 'm003', ts_min: 45, likes: 89 },
  { id: 'f007', type: 'kol_pick', kol: 'davoo_xeneize', match: 'm009', pick: 'home', text: '西班牙这次锋线无敌', ts_min: 52, likes: 240, replies: 31 },
];

// 群组 mock
export const GROUPS = [
  { id: 'g001', name: 'Hermanos del Sur 🌎', members: 47, weekly_eds: 28400, top_handle: '@futbolero_pablo' },
  { id: 'g002', name: 'Samba Predictors',    members: 38, weekly_eds: 24820, top_handle: '@samba_predicts' },
  { id: 'g003', name: 'La Roja Forever',     members: 32, weekly_eds: 21440, top_handle: '@valencia_fan' },
  { id: 'g004', name: 'Aztec Warriors',      members: 29, weekly_eds: 18960, top_handle: '@lacobraok' },
];

// 排行榜(多维)
export const LEADERBOARD_HIT = [
  { rank: 1, handle: '@maurocezar', flag: '🇧🇷', kol: 'mauro_cezar', hit_rate: 74.5, eds: 12840, streak: 5 },
  { rank: 2, handle: '@gastonedul', flag: '🇦🇷', kol: 'gaston_edul', hit_rate: 70.2, eds: 11620, streak: 3 },
  { rank: 3, handle: '@davooxeneize', flag: '🇪🇸', kol: 'davoo_xeneize', hit_rate: 72.3, eds: 10380, streak: 4 },
  { rank: 4, handle: '@futbolero_pablo', flag: '🇦🇷', hit_rate: 69.8, eds: 9240, streak: 6 },
  { rank: 5, handle: '@samba_predicts', flag: '🇧🇷', hit_rate: 67.5, eds: 8960, streak: 2 },
  { rank: 6, handle: '@valencia_fan', flag: '🇪🇸', hit_rate: 68.2, eds: 8640, streak: 1 },
  { rank: 7, handle: '@lacobraok', flag: '🇲🇽', kol: 'la_cobra', hit_rate: 68.1, eds: 8240, streak: 2 },
  { rank: 8, handle: '@rio_carioca', flag: '🇧🇷', hit_rate: 66.4, eds: 7820, streak: 3 },
];

// 球迷忠诚度榜(老粉 / 元老球迷)— 与命中率正交,是身份维度
export const LEADERBOARD_LOYALTY = [
  { rank: 1, handle: '@futbolero_pablo', flag: '🇦🇷', team: 'ARG', cups: 4, days: 1820, title: '元老球迷' },
  { rank: 2, handle: '@samba_predicts', flag: '🇧🇷', team: 'BRA', cups: 4, days: 1620, title: '元老球迷' },
  { rank: 3, handle: '@diego_clasico', flag: '🇪🇸', team: 'ESP', cups: 3, days: 1480, title: '资深球迷' },
  { rank: 4, handle: '@maurocezar', flag: '🇧🇷', kol: 'mauro_cezar', team: 'BRA', cups: 3, days: 1340, title: '资深球迷' },
  { rank: 5, handle: '@davooxeneize', flag: '🇪🇸', kol: 'davoo_xeneize', team: 'ESP', cups: 3, days: 1280, title: '资深球迷' },
];

// 好友 mock(F-P0-5)· 真实场景从 Luffa contacts API 拉
// 给每位好友一个支持的球队 + 历史 1v1 战绩
export const MOCK_FRIENDS = [
  { id: 'fr_diego',   handle: '@diego_madrid', flag: '🇪🇸', team: 'ESP', win: 12, loss: 7 },
  { id: 'fr_marco',   handle: '@marco_rio',    flag: '🇧🇷', team: 'BRA', win: 8,  loss: 11 },
  { id: 'fr_lucas',   handle: '@lucas_buenos', flag: '🇦🇷', team: 'ARG', win: 9,  loss: 9 },
  { id: 'fr_anita',   handle: '@anita_dortmund', flag: '🇩🇪', team: 'GER', win: 5, loss: 4 },
  { id: 'fr_pierre',  handle: '@pierre_paris', flag: '🇫🇷', team: 'FRA', win: 6,  loss: 3 },
  { id: 'fr_luis',    handle: '@luis_cdmx',    flag: '🇲🇽', team: 'MEX', win: 4,  loss: 7 },
];

// 实时聊天模拟池(F-P0-1)· 用于 mock 每 8-12s 推一条
// 真实场景:Ken 后端 WebSocket 推送 · 这是开发期 + 演示用
export const CHAT_MOCK_POOL = [
  { user: '@valencia_fan',     flag: '🇪🇸', camp: 'ESP', text: 'VAMOS ESPAÑA!!!' },
  { user: '@samba_predicts',   flag: '🇧🇷', camp: 'BRA', text: 'Vinícius está em chamas hoje' },
  { user: '@futbolero_pablo',  flag: '🇦🇷', camp: 'ARG', text: 'Messi siempre Messi' },
  { user: '@maurocezar',      flag: '🇧🇷', camp: 'BRA', text: '高位逼抢的效果出来了 · 西班牙这一波防得很好', kol: 'mauro_cezar' },
  { user: '@aztecaFan',        flag: '🇲🇽', camp: 'MEX', text: 'Que partidazo!' },
  { user: '@madrid_predicts',  flag: '🇪🇸', camp: 'ESP', text: 'Pedri lleva el partido' },
  { user: '@rio_carioca',      flag: '🇧🇷', camp: 'BRA', text: 'Esse árbitro tá favorecendo o adversário' },
  { user: '@davooxeneize',    flag: '🇪🇸', camp: 'ESP', text: '场面控制得不错 · 但需要更直接的传球', kol: 'davoo_xeneize' },
  { user: '@gastonedul',     flag: '🇦🇷', camp: 'ARG', text: 'Llamando al penal!', kol: 'gaston_edul' },
  { user: '@diego_clasico',    flag: '🇪🇸', camp: 'ESP', text: '👏👏👏' },
  { user: '@bogota_picks',     flag: '🇨🇴', camp: 'COL', text: 'GOOOOAAALLL si entra!' },
  { user: '@oranje_fan',       flag: '🇳🇱', camp: 'NED', text: 'This referee...' },
  { user: '@porto_fan',        flag: '🇵🇹', camp: 'POR', text: 'Próximo é Portugal vs França · vai ser épico' },
  { user: '@montevideo_fc',    flag: '🇺🇾', camp: 'URU', text: 'Garra charrúa hasta el final' },
  { user: '@samurai_blue',     flag: '🇯🇵', camp: 'JPN', text: 'がんばれ!' },
  { user: '@les_bleus_24',     flag: '🇫🇷', camp: 'FRA', text: 'Mbappé doit accélérer' },
  { user: '@goal_keeper99',    flag: '🇩🇪', camp: 'GER', text: 'Druck machen!' },
  { user: '@viking_predicts',  flag: '🇬🇧', camp: 'ENG', text: 'England all the way' },
  { user: '@tigerstars',       flag: '🇰🇷', camp: 'KOR', text: 'Son이 폭발할 시간!' },
  { user: '@lacobraok',  flag: '🇲🇽', camp: 'MEX', text: '战术变化已经出现 · 看下半场', kol: 'la_cobra' },
  // 反应类(emoji-only)
  { user: '@valencia_fan',     flag: '🇪🇸', camp: 'ESP', text: '🔥🔥🔥' },
  { user: '@samba_predicts',   flag: '🇧🇷', camp: 'BRA', text: '😱' },
  { user: '@futbolero_pablo',  flag: '🇦🇷', camp: 'ARG', text: '⚽⚽⚽' },
  { user: '@madrid_predicts',  flag: '🇪🇸', camp: 'ESP', text: '❤️' },
  { user: '@maurocezar',      flag: '🇧🇷', camp: 'BRA', text: '👍', kol: 'mauro_cezar' },
];

// 单场比赛实时讨论(弹幕)mock(v1 静态版 · v2 上线后将弃用)
export const DISCUSSIONS_BY_MATCH = {
  m003: [
    { user: '@valencia_fan', flag: '🇪🇸', text: '西班牙锋线无敌 · 必胜!', team: 'ESP', ts_min: 3 },
    { user: '@samba_predicts', flag: '🇧🇷', text: 'Neymar 一回归就翻盘 🇧🇷', team: 'BRA', ts_min: 5 },
    { user: '@futbolero_pablo', flag: '🇦🇷', text: '坐等好戏', ts_min: 7 },
    { user: '@maurocezar', flag: '🇧🇷', team: 'BRA', kol: 'mauro_cezar', text: '我押巴西赢 1-0 · 但西班牙是命中率最高的赛季初战', ts_min: 8 },
    { user: '@diego_clasico', flag: '🇪🇸', team: 'ESP', text: '让球场说话 ⚽', ts_min: 10 },
  ],
  m007: [
    { user: '@samba_predicts', flag: '🇧🇷', team: 'BRA', text: '南美德比!', ts_min: 4 },
    { user: '@maurocezar', flag: '🇧🇷', team: 'BRA', kol: 'mauro_cezar', text: '巴西稳赢 · 押 home', ts_min: 6 },
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
