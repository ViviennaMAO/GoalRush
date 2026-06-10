import { MATCHES, getMatch, getTeam, getKOL, FAN_TITLES, timeToKickoff } from '../../utils/mock-data';
import { connectWallet } from '../../utils/luffa';
import { getDict, getLang, setLang, LANG_LABELS, ALL_LANGS } from '../../utils/i18n';

const app = getApp();

Page({
  data: {
    i18n: {},
    wallet: null,
    walletShort: '',
    myTeam: null,
    myTeamFlag: '',
    fanLevel: 1,
    titleEmoji: '⚽',
    titleName: '',
    eds: 0,
    predCount: 0,
    pendingCount: 0,
    hitCount: 0,
    myPreds: [],
    follows: [],
    followedKols: [],
    langs: [],
    currentLang: 'en'
  },

  onLoad() { this.refresh(); },
  onShow() { this.refresh(); },

  refresh() {
    const currentLang = getLang();
    const i18n = getDict(currentLang);
    const g = app.globalData;
    const predIds = Object.keys(g.predictions || {});
    const myTeamData = g.myTeam ? getTeam(g.myTeam) : null;
    const fanLevel = g.fanLevel || 1;
    const titleEmoji = (FAN_TITLES.find(t => t.level === fanLevel) || FAN_TITLES[0]).emoji;
    const titleName = i18n['title_' + fanLevel] || i18n.title_1;

    const myPreds = predIds.map(id => {
      const m = getMatch(id);
      if (!m) return null;
      const pick = g.predictions[id];
      const home = getTeam(m.home), away = getTeam(m.away);
      const pickLabel = pick === 'home' ? home.code
                      : pick === 'away' ? away.code
                      : i18n.pick_draw;
      return { ...m, homeTeam: home, awayTeam: away, pickLabel, countdown: timeToKickoff(m.kickoff) };
    }).filter(Boolean);

    const follows = g.follows || [];
    const followedKols = follows.map(id => getKOL(id)).filter(Boolean);

    let walletShort = '';
    if (g.wallet && g.wallet.address) {
      const a = g.wallet.address;
      walletShort = a.length > 14 ? a.slice(0, 6) + '...' + a.slice(-4) : a;
    }

    const langs = ALL_LANGS.map(k => ({ key: k, label: LANG_LABELS[k] }));

    this.setData({
      i18n,
      currentLang,
      langs,
      wallet: g.wallet,
      walletShort,
      myTeam: g.myTeam,
      myTeamFlag: myTeamData ? myTeamData.flag : '',
      fanLevel,
      titleEmoji,
      titleName,
      eds: g.eds || 0,
      predCount: myPreds.length,
      pendingCount: myPreds.length,
      hitCount: 0,
      myPreds,
      follows,
      followedKols,
    });
  },

  async onConnect() {
    try {
      wx.showLoading({ title: '...' });
      const wallet = await connectWallet();
      wx.hideLoading();
      app.globalData.wallet = wallet;
      app.persist();
      wx.showToast({ title: '✓ ' + (wallet.nickname || ''), icon: 'success' });
      this.refresh();
    } catch (e) {
      wx.hideLoading();
      wx.showToast({ title: '✗', icon: 'none' });
    }
  },

  onPickLang(e) {
    const key = e.currentTarget.dataset.key;
    setLang(key);
    wx.vibrateShort && wx.vibrateShort({ type: 'light' });
    wx.showToast({ title: LANG_LABELS[key], icon: 'success', duration: 800 });
    this.refresh();
  },

  goMatches() { wx.switchTab({ url: '/pages/match/match' }); },
  goMatch(e) {
    const id = e.currentTarget.dataset.id;
    wx.navigateTo({ url: '/pages/match-detail/match-detail?id=' + id });
  },

  clearLocal() {
    wx.showModal({
      title: this.data.i18n.prof_clear_local,
      content: '⚠',
      success: (r) => {
        if (r.confirm) {
          wx.removeStorageSync('goalrush_state');
          app.globalData.wallet = null;
          app.globalData.myTeam = null;
          app.globalData.fanLevel = 1;
          app.globalData.eds = 0;
          app.globalData.predictions = {};
          app.globalData.follows = [];
          this.refresh();
          wx.showToast({ title: '✓', icon: 'success' });
        }
      }
    });
  }
});
