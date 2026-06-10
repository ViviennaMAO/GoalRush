import { getMatch, getTeam, KOLS, DISCUSSIONS_BY_MATCH, timeAgo, timeToKickoff, formatTime } from '../../utils/mock-data';
import { shareToIM } from '../../utils/luffa';
import { submitPrediction } from '../../utils/api';
import { getDict, getLang } from '../../utils/i18n';

const app = getApp();

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
  },

  onLoad(opts) {
    this.matchId = opts.id || 'm003';
    this.refresh();
  },
  onShow() { this.refresh(); },

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
