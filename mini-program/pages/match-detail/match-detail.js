import { getMatch, getTeam, KOLS, DISCUSSIONS_BY_MATCH, timeAgo, timeToKickoff, formatTime } from '../../utils/mock-data';
import { shareToIM } from '../../utils/luffa';
import { submitPrediction } from '../../utils/api';
import { getDict, getLang } from '../../utils/i18n';

const app = getApp();

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
    discussions: []
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
  }
});
