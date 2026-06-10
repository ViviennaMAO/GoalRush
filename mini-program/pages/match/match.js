import { MATCHES, getTeam, timeToKickoff, formatTime } from '../../utils/mock-data';

const app = getApp();

const PICK_LABELS = { home: '主队', draw: '平', away: '客队' };

Page({
  data: {
    tabs: [
      { key: 'all', label: '全部' },
      { key: 'hot', label: '🔥 重磅' },
      { key: '0611', label: '6月11日' },
      { key: '0612', label: '6月12日' },
      { key: '0613', label: '6月13日' },
      { key: '0614', label: '6月14日' },
    ],
    currentTab: 'all',
    matches: []
  },

  onLoad() { this.refresh(); },
  onShow() { this.refresh(); },
  onPullDownRefresh() { this.refresh(); wx.stopPullDownRefresh(); },

  refresh() {
    const preds = app.globalData.predictions || {};
    let list = MATCHES;
    const t = this.data.currentTab;
    if (t === 'hot') list = list.filter(m => m.highlight);
    else if (t === '0611') list = list.filter(m => m.kickoff.startsWith('2026-06-11'));
    else if (t === '0612') list = list.filter(m => m.kickoff.startsWith('2026-06-12'));
    else if (t === '0613') list = list.filter(m => m.kickoff.startsWith('2026-06-13'));
    else if (t === '0614') list = list.filter(m => m.kickoff.startsWith('2026-06-14'));

    const matches = list.map(m => {
      const home = getTeam(m.home), away = getTeam(m.away);
      const userPick = preds[m.id];
      const pickLabel = userPick === 'home' ? home.code : userPick === 'away' ? away.code : userPick === 'draw' ? '平局' : '';
      return {
        ...m,
        homeTeam: home,
        awayTeam: away,
        countdown: timeToKickoff(m.kickoff),
        kickoffTxt: formatTime(m.kickoff),
        userPick,
        pickLabel,
      };
    });

    this.setData({ matches });
  },

  onTab(e) {
    this.setData({ currentTab: e.currentTarget.dataset.key }, () => this.refresh());
  },

  goMatch(e) {
    const id = e.currentTarget.dataset.id;
    wx.navigateTo({ url: '/pages/match-detail/match-detail?id=' + id });
  }
});
