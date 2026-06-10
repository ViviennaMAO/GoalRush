import { MATCHES, getTeam, timeToKickoff, formatTime } from '../../utils/mock-data';
import { getDict, getLang } from '../../utils/i18n';

const app = getApp();

Page({
  data: {
    i18n: {},
    tabs: [],
    currentTab: 'all',
    matches: []
  },

  onLoad() { this.refresh(); },
  onShow() { this.refresh(); },
  onPullDownRefresh() { this.refresh(); wx.stopPullDownRefresh(); },

  refresh() {
    const lang = getLang();
    const i18n = getDict(lang);
    const tabs = [
      { key: 'all', label: i18n.match_tabs_all },
      { key: 'hot', label: i18n.match_tabs_hot },
      { key: '0611', label: i18n.match_tabs_jun11 },
      { key: '0612', label: i18n.match_tabs_jun12 },
      { key: '0613', label: i18n.match_tabs_jun13 },
      { key: '0614', label: i18n.match_tabs_jun14 },
    ];
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
      return {
        ...m,
        homeTeam: home,
        awayTeam: away,
        countdown: timeToKickoff(m.kickoff),
        kickoffTxt: formatTime(m.kickoff),
        userPick,
      };
    });

    this.setData({ i18n, tabs, matches });
  },

  onTab(e) {
    this.setData({ currentTab: e.currentTarget.dataset.key }, () => this.refresh());
  },

  goMatch(e) {
    const id = e.currentTarget.dataset.id;
    wx.navigateTo({ url: '/pages/match-detail/match-detail?id=' + id });
  }
});
