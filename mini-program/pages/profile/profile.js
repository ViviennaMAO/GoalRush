import { MATCHES, getMatch, getTeam, getKOL, FAN_TITLES, timeToKickoff } from '../../utils/mock-data';
import { connectWallet } from '../../utils/luffa';

const app = getApp();

Page({
  data: {
    wallet: null,
    walletShort: '',
    myTeam: null,
    myTeamFlag: '',
    fanLevel: 1,
    title: { name: '初心球迷', emoji: '⚽' },
    eds: 0,
    predCount: 0,
    pendingCount: 0,
    hitCount: 0,
    myPreds: [],
    follows: [],
    followedKols: []
  },

  onLoad() { this.refresh(); },
  onShow() { this.refresh(); },

  refresh() {
    const g = app.globalData;
    const predIds = Object.keys(g.predictions || {});
    const myTeamData = g.myTeam ? getTeam(g.myTeam) : null;
    const title = FAN_TITLES.find(t => t.level === (g.fanLevel || 1)) || FAN_TITLES[0];

    const myPreds = predIds.map(id => {
      const m = getMatch(id);
      if (!m) return null;
      const pick = g.predictions[id];
      const home = getTeam(m.home), away = getTeam(m.away);
      return {
        ...m,
        homeTeam: home,
        awayTeam: away,
        pickLabel: pick === 'home' ? home.code : pick === 'away' ? away.code : '平',
        countdown: timeToKickoff(m.kickoff),
      };
    }).filter(Boolean);

    const follows = g.follows || [];
    const followedKols = follows.map(id => getKOL(id)).filter(Boolean);

    let walletShort = '';
    if (g.wallet && g.wallet.address) {
      const a = g.wallet.address;
      walletShort = a.length > 14 ? a.slice(0, 6) + '...' + a.slice(-4) : a;
    }

    this.setData({
      wallet: g.wallet,
      walletShort,
      myTeam: g.myTeam,
      myTeamFlag: myTeamData ? myTeamData.flag : '',
      fanLevel: g.fanLevel || 1,
      title,
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
      wx.showLoading({ title: '连接 Luffa…' });
      const wallet = await connectWallet();
      wx.hideLoading();
      app.globalData.wallet = wallet;
      app.persist();
      wx.showToast({ title: '已连接 ' + (wallet.nickname || ''), icon: 'success' });
      this.refresh();
    } catch (e) {
      wx.hideLoading();
      wx.showToast({ title: '连接已取消', icon: 'none' });
    }
  },

  goMatches() { wx.switchTab({ url: '/pages/match/match' }); },
  goMatch(e) {
    const id = e.currentTarget.dataset.id;
    wx.navigateTo({ url: '/pages/match-detail/match-detail?id=' + id });
  },

  clearLocal() {
    wx.showModal({
      title: '清空本地数据?',
      content: '会清掉预测 + 钱包连接 + 球迷阵营。不可恢复。',
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
          wx.showToast({ title: '已清空', icon: 'success' });
        }
      }
    });
  }
});
