import { TEAMS, getTeam } from '../../utils/mock-data';
import { getDict, getLang } from '../../utils/i18n';

const app = getApp();

Page({
  data: {
    i18n: {},
    teams: [],
    myTeam: null,
    myTeamData: null,
    myFanIndex: 0
  },

  onLoad() { this.refresh(); },
  onShow() { this.refresh(); },

  refresh() {
    const i18n = getDict(getLang());
    const teams = Object.values(TEAMS).sort((a, b) => b.fans - a.fans);
    const myTeam = app.globalData.myTeam;
    const myTeamData = myTeam ? getTeam(myTeam) : null;
    this.setData({
      i18n,
      teams,
      myTeam,
      myTeamData,
      myFanIndex: myTeamData ? Math.floor(myTeamData.fans * 0.8) : 0
    });
  },

  goTeam(e) {
    const code = e.currentTarget.dataset.code;
    wx.navigateTo({ url: '/pages/team-detail/team-detail?code=' + code });
  },

  setMine(e) {
    const code = e.currentTarget.dataset.codeMine;
    const team = getTeam(code);
    app.globalData.myTeam = code;
    if (app.globalData.fanLevel < 2) app.globalData.fanLevel = 2;
    app.persist();
    wx.vibrateShort && wx.vibrateShort({ type: 'heavy' });
    wx.showToast({ title: '✓ ' + team.name, icon: 'success' });
    this.refresh();
  }
});
