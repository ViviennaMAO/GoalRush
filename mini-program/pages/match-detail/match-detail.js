import { getMatch, getTeam, KOLS, DISCUSSIONS_BY_MATCH, CHAT_MOCK_POOL, timeAgo, timeToKickoff, formatTime } from '../../utils/mock-data';
import { shareToIM } from '../../utils/luffa';
import { submitPrediction } from '../../utils/api';
import { getDict, getLang } from '../../utils/i18n';

const app = getApp();

// F-P0-1 实时聊天配置
const REACTIONS = ['👍', '🔥', '😱', '⚽', '❤️', '😭'];
const MOCK_PUSH_INTERVAL_MIN = 8000;   // 真实 WS 推送间隔下限 (ms)
const MOCK_PUSH_INTERVAL_MAX = 14000;  // 上限
const RATE_LIMIT_WINDOW_MS = 10000;    // 防刷屏窗口
const RATE_LIMIT_MAX = 3;              // 窗口内最多发条数
let _msgIdSeq = 0;
function nextMsgId() { return 'm_' + Date.now() + '_' + (++_msgIdSeq); }

// F-P0-3 半场重押配置
const HT_WINDOW_MS = 60 * 1000;        // 60 秒决策窗口
const HT_PROGRESS_TICK_MS = 1000;      // 进度条 tick
const HT_EDS_REWARD = 30;
const HT_OPTIONS_DEF = [
  { key: '0-0' },
  { key: '1-0' },
  { key: '1-1' },
  { key: '2-1' },
  { key: '2-0' },
];

// F-P0-2 confetti 颜色池(中性 + 球队色会动态加入)
const CONFETTI_COLORS_BASE = ['#FFD54A', '#14B8A6', '#FF6B7D', '#5EEAD4', '#FFFFFF', '#F0AB22'];

function buildConfetti(teamC1, teamC2, count = 36) {
  const colors = [...CONFETTI_COLORS_BASE, teamC1, teamC2];
  return Array.from({ length: count }, (_, i) => ({
    i,
    x: Math.random() * 100,             // left % of viewport
    color: colors[Math.floor(Math.random() * colors.length)],
    delay: (Math.random() * 0.9).toFixed(2),
    dur:   (1.6 + Math.random() * 1.4).toFixed(2),
    w: 16 + Math.floor(Math.random() * 14),
    h: 22 + Math.floor(Math.random() * 18),
  }));
}

Page({
  data: {
    i18n: {},
    matchId: '',
    match: null,
    homeTeam: null,
    awayTeam: null,
    countdown: '',
    kickoffTxt: '',
    userPick: null,
    pickLabel: '',
    kols: [],
    discussions: [],
    // F-P0-2 GOAL! moment state
    showGoal: false,
    goalC1: '#14B8A6',
    goalC2: '#0F766E',
    goalTextOn: '#FFFFFF',
    goalTeamFlag: '',
    goalScoreLabel: '',
    goalScorer: '',
    confetti: [],
    _goalTimer: null,
    // F-P0-1 chat state
    chatMessages: [],
    chatDraft: '',
    lastMessageId: '',
    watching: 0,
    reactions: REACTIONS,
    hasCamp: false,
    myFlag: '',
    myCampCode: '',
    _chatTimer: null,
    _sendTimestamps: [],  // 用于速率限制窗口
    // F-P0-3 halftime state
    showHt: false,
    htOptions: [],
    htPick: '',
    htSecondsLeft: 60,
    htProgress: 100,
    htCurrentScore: '0 : 0',
    htSocialText: '',
    _htCountdownTimer: null,
    _htAutoCloseTimer: null,
  },

  onLoad(opts) {
    this.matchId = opts.id || 'm003';
    this.refresh();
    this.startChatMock();
  },
  onShow() { this.refresh(); },
  onUnload() {
    this.stopChatMock();
    if (this.data._goalTimer) clearTimeout(this.data._goalTimer);
    if (this.data._htCountdownTimer) clearInterval(this.data._htCountdownTimer);
    if (this.data._htAutoCloseTimer) clearTimeout(this.data._htAutoCloseTimer);
  },

  refresh() {
    const lang = getLang();
    const i18n = getDict(lang);
    const match = getMatch(this.matchId);
    if (!match) {
      wx.showToast({ title: '?', icon: 'none' });
      return;
    }
    const homeTeam = getTeam(match.home);
    const awayTeam = getTeam(match.away);
    const userPick = (app.globalData.predictions || {})[this.matchId];
    const pickLabel = userPick === 'home' ? homeTeam.code + ' ' + i18n.pick_home_win
                    : userPick === 'draw' ? i18n.pick_draw
                    : userPick === 'away' ? awayTeam.code + ' ' + i18n.pick_away_win
                    : '';

    // KOL 在押(本场 mock pick)— S 档 KOL 押主队,A 档押客队
    const kols = KOLS.map(k => {
      const pick = k.tier === 'S' ? 'home' : 'away';
      const pickLabel = pick === 'home' ? homeTeam.code : pick === 'away' ? awayTeam.code : i18n.pick_draw;
      return { ...k, pick, pickLabel };
    });

    const discussions = (DISCUSSIONS_BY_MATCH[this.matchId] || []).map(d => ({
      ...d,
      ago: timeAgo(d.ts_min)
    }));

    // === F-P0-1 chat 初始化 ===
    const app = getApp();
    const myCamp = app.globalData.myTeam;
    const myCampData = myCamp ? getTeam(myCamp) : null;

    // 首次进入:种 4 条 mock 历史消息(用本场参赛队的球迷优先)
    let chatMessages = this.data.chatMessages;
    if (chatMessages.length === 0) {
      const matchTeams = [match.home, match.away];
      const seedPool = CHAT_MOCK_POOL.filter(m => matchTeams.includes(m.camp));
      const seed = (seedPool.length >= 4 ? seedPool : CHAT_MOCK_POOL).slice(0, 4);
      chatMessages = seed.map((m, idx) =>
        this._buildIncomingMsg(m, myCamp, match, /*minutesAgo*/ 4 - idx)
      );
    }

    this.setData({
      i18n,
      matchId: this.matchId,
      match,
      homeTeam,
      awayTeam,
      countdown: timeToKickoff(match.kickoff),
      kickoffTxt: formatTime(match.kickoff),
      userPick,
      pickLabel,
      kols,
      discussions,
      hasCamp: !!myCamp,
      myCampCode: myCamp || '',
      myFlag: myCampData ? myCampData.flag : '',
      chatMessages,
      // mock 在线观众数 + 随机波动
      watching: 8000 + Math.floor(Math.random() * 6000),
      lastMessageId: chatMessages.length ? chatMessages[chatMessages.length - 1].scrollAnchor : '',
    });
  },

  async onPick(e) {
    const pick = e.currentTarget.dataset.pick;
    const matchId = this.matchId;
    app.globalData.predictions = app.globalData.predictions || {};
    app.globalData.predictions[matchId] = pick;
    app.persist();
    const userId = (app.globalData.wallet && app.globalData.wallet.address) || 'mp_local';
    submitPrediction(userId, matchId, pick).catch(() => {});
    wx.vibrateShort && wx.vibrateShort({ type: 'light' });
    wx.showToast({ title: this.data.i18n.pick_confirmed || '✓', icon: 'none' });
    this.refresh();
  },

  followKol(e) {
    const id = e.currentTarget.dataset.id;
    const kol = this.data.kols.find(k => k.id === id);
    if (!kol) return;
    app.globalData.predictions = app.globalData.predictions || {};
    app.globalData.predictions[this.matchId] = kol.pick;
    app.globalData.follows = app.globalData.follows || [];
    if (!app.globalData.follows.includes(id)) app.globalData.follows.push(id);
    app.persist();
    wx.showToast({ title: kol.name, icon: 'success' });
    this.refresh();
  },

  goKol() { wx.showToast({ title: 'KOL', icon: 'none' }); },

  async onShare() {
    const { homeTeam, awayTeam, pickLabel } = this.data;
    try {
      await shareToIM({
        title: 'GoalRush',
        content: `${homeTeam.flag} ${homeTeam.code} vs ${awayTeam.code} ${awayTeam.flag} · ${pickLabel || '?'}`,
        path: `/pages/match-detail/match-detail?id=${this.matchId}`
      });
      wx.showToast({ title: '✓', icon: 'success' });
    } catch (e) {
      wx.showToast({ title: '✗', icon: 'none' });
    }
  },

  onShareAppMessage() {
    const { homeTeam, awayTeam } = this.data;
    return {
      title: `${homeTeam.flag} ${homeTeam.code} vs ${awayTeam.code} ${awayTeam.flag} · GoalRush`,
      path: `/pages/match-detail/match-detail?id=${this.matchId}`
    };
  },

  // ============ F-P0-2 GOAL! moment ============
  // 真实环境:由 SofaScore goal event polling 触发(5s 内推送)
  // 此处提供 demo handler · 让 IDE 预览和 KOL 演示直接看到效果
  triggerGoal({ team, scorer, score }) {
    const t = team || this.data.homeTeam;
    const app = getApp();
    const myCamp = app.globalData.myTeam;

    // 仅当本方进球时触发 confetti(对方进球不打扰,见 PRD §3.2 验收 + §10.2 Q3)
    if (myCamp && t.code !== myCamp) {
      wx.showToast({ title: 'Opposing goal · no confetti for you', icon: 'none', duration: 1500 });
      return;
    }

    // 清除可能存在的上次 timer
    if (this.data._goalTimer) clearTimeout(this.data._goalTimer);

    this.setData({
      showGoal: true,
      goalC1: t.c1 || '#14B8A6',
      goalC2: t.c2 || '#0F766E',
      goalTextOn: t.textOn || '#FFFFFF',
      goalTeamFlag: t.flag,
      goalScoreLabel: `${t.code} ${score || '1-0'}`,
      goalScorer: scorer || '',
      confetti: buildConfetti(t.c1, t.c2),
    });

    // 震动 · 让用户「身体」感受到进球
    wx.vibrateLong && wx.vibrateLong({});

    // 3.5 秒后自动关闭
    const timer = setTimeout(() => this.hideGoal(), 3500);
    this.data._goalTimer = timer;
  },

  hideGoal() {
    if (this.data._goalTimer) {
      clearTimeout(this.data._goalTimer);
      this.data._goalTimer = null;
    }
    this.setData({ showGoal: false });
  },

  noop() {/* catchtap 内层点击不冒泡到外层 hideGoal */},

  async shareGoal() {
    const { goalTeamFlag, goalScoreLabel, goalScorer } = this.data;
    try {
      const { shareToIM } = require('../../utils/luffa');
      await shareToIM({
        title: 'GOAL! ' + goalScoreLabel,
        content: `${goalTeamFlag} ${goalScoreLabel}${goalScorer ? ' · ' + goalScorer : ''}`,
        path: `/pages/match-detail/match-detail?id=${this.matchId}`
      });
      wx.showToast({ title: '✓', icon: 'success' });
      this.hideGoal();
    } catch (e) {
      wx.showToast({ title: '✗', icon: 'none' });
    }
  },

  // ============ F-P0-1 聊天室 ============

  // 构建一条进站消息(应用阵营染色 + 时间戳 + scroll anchor)
  _buildIncomingMsg(raw, myCamp, match, minutesAgo) {
    const isMyCamp = myCamp && raw.camp === myCamp;
    const isOpponent = myCamp && (raw.camp === match.home || raw.camp === match.away) && raw.camp !== myCamp;
    const teamData = getTeam(raw.camp);
    const id = nextMsgId();
    return {
      id,
      scrollAnchor: 'msg-' + id,
      user: raw.user,
      flag: raw.flag,
      camp: raw.camp,
      campCode: raw.camp,
      campColor: teamData ? teamData.c1 : 'transparent',
      kol: raw.kol || null,
      text: raw.text,
      isMine: false,
      isMyCamp: !!isMyCamp,
      isOpponent: !!isOpponent,
      timeTxt: minutesAgo === 0 ? 'now' : minutesAgo + 'm',
    };
  },

  startChatMock() {
    if (this.data._chatTimer) return;
    const tick = () => {
      if (this.isDestroyed) return;
      this._injectMockMessage();
      const next = MOCK_PUSH_INTERVAL_MIN + Math.random() * (MOCK_PUSH_INTERVAL_MAX - MOCK_PUSH_INTERVAL_MIN);
      this.data._chatTimer = setTimeout(tick, next);
    };
    // 首次延迟 5s,给用户看到初始消息后再开始注入
    this.data._chatTimer = setTimeout(tick, 5000);
  },

  stopChatMock() {
    this.isDestroyed = true;
    if (this.data._chatTimer) {
      clearTimeout(this.data._chatTimer);
      this.data._chatTimer = null;
    }
  },

  _injectMockMessage() {
    const app = getApp();
    const myCamp = app.globalData.myTeam;
    const match = this.data.match;
    if (!match) return;
    const matchTeams = [match.home, match.away];
    // 70% 概率拉本场参赛队球迷的发言(让聊天更相关)
    const pool = Math.random() < 0.7
      ? CHAT_MOCK_POOL.filter(m => matchTeams.includes(m.camp))
      : CHAT_MOCK_POOL;
    const picked = pool[Math.floor(Math.random() * pool.length)];
    const newMsg = this._buildIncomingMsg(picked, myCamp, match, 0);
    const messages = [...this.data.chatMessages, newMsg].slice(-50); // 保留最近 50 条
    this.setData({
      chatMessages: messages,
      lastMessageId: newMsg.scrollAnchor,
      watching: this.data.watching + Math.floor(Math.random() * 3) - 1, // 微波动
    });
  },

  onDraftInput(e) {
    this.setData({ chatDraft: e.detail.value });
  },

  sendMessage() {
    const text = (this.data.chatDraft || '').trim();
    if (!text) return;
    if (!this.data.hasCamp) {
      wx.showToast({ title: this.data.i18n.chat_camp_required, icon: 'none' });
      return;
    }
    // 速率限制:窗口内 ≤ 3 条
    const now = Date.now();
    const recent = (this.data._sendTimestamps || []).filter(t => now - t < RATE_LIMIT_WINDOW_MS);
    if (recent.length >= RATE_LIMIT_MAX) {
      wx.showToast({ title: this.data.i18n.chat_rate_limited, icon: 'none' });
      return;
    }
    const app = getApp();
    const myCampData = getTeam(this.data.myCampCode);
    const id = nextMsgId();
    const myMsg = {
      id,
      scrollAnchor: 'msg-' + id,
      user: (app.globalData.wallet && app.globalData.wallet.nickname) || 'You',
      flag: myCampData ? myCampData.flag : '⚽',
      camp: this.data.myCampCode,
      campCode: this.data.myCampCode,
      campColor: myCampData ? myCampData.c1 : 'transparent',
      kol: null,
      text,
      isMine: true,
      isMyCamp: true,
      isOpponent: false,
      timeTxt: 'now',
    };
    recent.push(now);
    this.setData({
      chatMessages: [...this.data.chatMessages, myMsg].slice(-50),
      chatDraft: '',
      lastMessageId: myMsg.scrollAnchor,
      _sendTimestamps: recent,
    });
    wx.vibrateShort && wx.vibrateShort({ type: 'light' });
  },

  sendReaction(e) {
    const r = e.currentTarget.dataset.r;
    if (!this.data.hasCamp) {
      wx.showToast({ title: this.data.i18n.chat_camp_required, icon: 'none' });
      return;
    }
    // 速率限制同 sendMessage
    const now = Date.now();
    const recent = (this.data._sendTimestamps || []).filter(t => now - t < RATE_LIMIT_WINDOW_MS);
    if (recent.length >= RATE_LIMIT_MAX) {
      wx.showToast({ title: this.data.i18n.chat_rate_limited, icon: 'none' });
      return;
    }
    const app = getApp();
    const myCampData = getTeam(this.data.myCampCode);
    const id = nextMsgId();
    const myMsg = {
      id,
      scrollAnchor: 'msg-' + id,
      user: (app.globalData.wallet && app.globalData.wallet.nickname) || 'You',
      flag: myCampData ? myCampData.flag : '⚽',
      camp: this.data.myCampCode,
      campCode: this.data.myCampCode,
      campColor: myCampData ? myCampData.c1 : 'transparent',
      kol: null,
      text: r,
      isMine: true,
      isMyCamp: true,
      isOpponent: false,
      timeTxt: 'now',
    };
    recent.push(now);
    this.setData({
      chatMessages: [...this.data.chatMessages, myMsg].slice(-50),
      lastMessageId: myMsg.scrollAnchor,
      _sendTimestamps: recent,
    });
    wx.vibrateShort && wx.vibrateShort({ type: 'light' });
  },

  onPickTeam() {
    wx.switchTab({ url: '/pages/teams/teams' });
  },

  // ============ F-P0-3 半场重押 ============

  // 真实环境:由 cron 检测到 halftime status 推送给当前 active 用户
  // demo 环境:从 hero 下方 demoHalftime() 按钮触发
  triggerHalftime({ currentScore = '0 : 0' } = {}) {
    const app = getApp();
    // 防套利:必须押过主预测才开放半场重押(PRD §3.3 验收)
    const mainPick = (app.globalData.predictions || {})[this.matchId];
    if (!mainPick) {
      wx.showToast({
        title: this.data.i18n.ht_first_half_required,
        icon: 'none', duration: 2000
      });
      return;
    }

    // 已押过半场重押 → 显示锁定 toast,不重弹
    const htAll = app.globalData.halftimePredictions || {};
    if (htAll[this.matchId]) {
      const pick = htAll[this.matchId].pick;
      wx.showToast({
        title: (this.data.i18n.ht_locked || '').replace('{pick}', pick),
        icon: 'none', duration: 2000
      });
      return;
    }

    // 生成 5 个选项 + 群友 mock 同押数据(社交反馈)
    const options = HT_OPTIONS_DEF.map(o => ({
      key: o.key,
      label: o.key,
      friendCount: Math.floor(Math.random() * 4), // 0-3 群友
    }));
    // 至少 1 个选项有群友(保证社交反馈有内容可显示)
    if (!options.some(o => o.friendCount > 0)) {
      options[Math.floor(Math.random() * options.length)].friendCount = 2;
    }

    // 清旧 timer
    if (this.data._htCountdownTimer) clearInterval(this.data._htCountdownTimer);
    if (this.data._htAutoCloseTimer) clearTimeout(this.data._htAutoCloseTimer);

    this.setData({
      showHt: true,
      htOptions: options,
      htPick: '',
      htSecondsLeft: 60,
      htProgress: 100,
      htCurrentScore: currentScore,
      htSocialText: '',
    });
    wx.vibrateLong && wx.vibrateLong({});

    // 启动 1Hz 倒计时
    const startTs = Date.now();
    const tick = () => {
      const elapsed = Date.now() - startTs;
      const left = Math.max(0, Math.ceil((HT_WINDOW_MS - elapsed) / 1000));
      const progress = Math.max(0, 100 - (elapsed / HT_WINDOW_MS) * 100);
      this.setData({ htSecondsLeft: left, htProgress: progress });
      if (left <= 0) {
        clearInterval(this.data._htCountdownTimer);
        // 时间到:若有 pick 自动 confirm,否则 skip
        if (this.data.htPick) this.htConfirm({ auto: true });
        else this.htSkip({ auto: true });
      }
    };
    this.data._htCountdownTimer = setInterval(tick, HT_PROGRESS_TICK_MS);
  },

  htPickOption(e) {
    const key = e.currentTarget.dataset.key;
    const opt = this.data.htOptions.find(o => o.key === key);
    if (!opt) return;
    // 社交反馈文案
    let socialText = '';
    if (opt.friendCount > 0) {
      const tmpl = this.data.i18n.ht_social_friends || 'Your group · {n}/{m} picked {pick}';
      socialText = tmpl
        .replace('{n}', opt.friendCount)
        .replace('{m}', 7)
        .replace('{pick}', key);
    }
    this.setData({ htPick: key, htSocialText: socialText });
    wx.vibrateShort && wx.vibrateShort({ type: 'light' });
  },

  htConfirm(arg) {
    const auto = arg && arg.auto;
    const pick = this.data.htPick;
    if (!pick) return;

    const app = getApp();
    app.globalData.halftimePredictions = app.globalData.halftimePredictions || {};
    app.globalData.halftimePredictions[this.matchId] = {
      pick,
      decided_in_ms: (60 - this.data.htSecondsLeft) * 1000,
      timestamp: new Date().toISOString(),
      status: 'pending',
      potential_eds: HT_EDS_REWARD,
    };
    if (app.persist) app.persist();

    this._htCloseOverlay();
    wx.showToast({
      title: `${pick} · +${HT_EDS_REWARD} EDS pending`,
      icon: 'success', duration: 1800
    });
  },

  htSkip() {
    this._htCloseOverlay();
  },

  _htCloseOverlay() {
    if (this.data._htCountdownTimer) {
      clearInterval(this.data._htCountdownTimer);
      this.data._htCountdownTimer = null;
    }
    if (this.data._htAutoCloseTimer) {
      clearTimeout(this.data._htAutoCloseTimer);
      this.data._htAutoCloseTimer = null;
    }
    this.setData({ showHt: false, htPick: '', htSocialText: '' });
  },

  // DEMO 触发器
  demoHalftime() {
    const scores = ['0 : 0', '1 : 0', '0 : 1', '1 : 1', '2 : 1'];
    const score = scores[Math.floor(Math.random() * scores.length)];
    this.triggerHalftime({ currentScore: score });
  },

  // DEMO 触发器:随机用主队或客队进球(若用户已选阵营则优先用本方)
  demoGoal() {
    const app = getApp();
    const myCamp = app.globalData.myTeam;
    let team = this.data.homeTeam;
    if (myCamp === this.data.awayTeam.code) team = this.data.awayTeam;
    else if (Math.random() < 0.5 && !myCamp) team = this.data.awayTeam;

    const minute = 20 + Math.floor(Math.random() * 75);
    const scorers = {
      ESP: 'Pedri', BRA: 'Vinícius', ARG: 'Messi', FRA: 'Mbappé',
      ENG: 'Bellingham', GER: 'Wirtz', ITA: 'Chiesa', POR: 'Ronaldo',
      MEX: 'Lozano', USA: 'Pulisic', NED: 'Gakpo', COL: 'James',
      URU: 'Núñez', CHI: 'Sánchez', JPN: 'Mitoma', KOR: 'Son',
    };
    const scorer = (scorers[team.code] || 'Anonymous') + ' · ' + minute + "'";

    this.triggerGoal({ team, scorer, score: '1-0' });
  }
});
