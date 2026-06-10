import { getMatch, getTeam, KOLS, DISCUSSIONS_BY_MATCH, timeAgo, timeToKickoff, formatTime } from '../../utils/mock-data';
import { shareToIM } from '../../utils/luffa';
import { submitPrediction } from '../../utils/api';

const app = getApp();
const PICK_LABELS = { home: 'home', draw: 'draw', away: 'away' };

Page({
  data: {
    matchId: '',
    match: null,
    homeTeam: null,
    awayTeam: null,
    countdown: '',
    kickoffTxt: '',
    userPick: null,
    pickLabel: '',
    kols: [],
    discussions: []
  },

  onLoad(opts) {
    this.matchId = opts.id || 'm003';
    this.refresh();
  },
  onShow() { this.refresh(); },

  refresh() {
    const match = getMatch(this.matchId);
    if (!match) {
      wx.showToast({ title: '比赛未找到', icon: 'none' });
      return;
    }
    const homeTeam = getTeam(match.home);
    const awayTeam = getTeam(match.away);
    const userPick = (app.globalData.predictions || {})[this.matchId];
    const pickLabel = userPick === 'home' ? homeTeam.code + ' 赢' : userPick === 'draw' ? '平局' : userPick === 'away' ? awayTeam.code + ' 赢' : '';

    // KOL 在押(本场 mock pick)
    const kols = KOLS.map(k => {
      // 简单 mock:S 档 KOL 押主队,A 档押客队
      const pick = k.tier === 'S' ? 'home' : 'away';
      const pickLabel = pick === 'home' ? homeTeam.code : pick === 'away' ? awayTeam.code : '平';
      return { ...k, pick, pickLabel };
    });

    // 实时讨论
    const discussions = (DISCUSSIONS_BY_MATCH[this.matchId] || []).map(d => ({
      ...d,
      ago: timeAgo(d.ts_min)
    }));

    this.setData({
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

    // 本地优先
    app.globalData.predictions = app.globalData.predictions || {};
    app.globalData.predictions[matchId] = pick;
    app.persist();

    // 后端(若可达)
    const userId = (app.globalData.wallet && app.globalData.wallet.address) || 'mp_local';
    submitPrediction(userId, matchId, pick).catch(() => {});

    wx.vibrateShort && wx.vibrateShort({ type: 'light' });
    wx.showToast({ title: '✓ 已押 · 等待结算', icon: 'none' });
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
    wx.showToast({ title: `已跟随 ${kol.name}`, icon: 'success' });
    this.refresh();
  },

  goKol(e) {
    // future: 跳 KOL 个人页(本期 mock)
    const id = e.currentTarget.dataset.id;
    wx.showToast({ title: 'KOL 页开发中', icon: 'none' });
  },

  async onShare() {
    const { homeTeam, awayTeam, pickLabel } = this.data;
    try {
      await shareToIM({
        title: 'GoalRush 一起预测',
        content: `${homeTeam.flag} ${homeTeam.code} vs ${awayTeam.code} ${awayTeam.flag} · 我押 ${pickLabel || '?'} · 你呢?`,
        path: `/pages/match-detail/match-detail?id=${this.matchId}`
      });
      wx.showToast({ title: '已分享到 IM 群', icon: 'success' });
    } catch (e) {
      wx.showToast({ title: '分享已取消', icon: 'none' });
    }
  },

  onShareAppMessage() {
    const { homeTeam, awayTeam } = this.data;
    return {
      title: `${homeTeam.flag} ${homeTeam.code} vs ${awayTeam.code} ${awayTeam.flag} · 一起 GoalRush`,
      path: `/pages/match-detail/match-detail?id=${this.matchId}`
    };
  }
});
