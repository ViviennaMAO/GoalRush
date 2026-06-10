import { TEAMS, getTeam } from '../../utils/mock-data';

const app = getApp();

Page({
  data: {
    teams: [],
    myTeam: null,
    myTeamData: null,
    myFanIndex: 0
  },

  onLoad() { this.refresh(); },
  onShow() { this.refresh(); },

  refresh() {
    const teams = Object.values(TEAMS).sort((a, b) => b.fans - a.fans);
    const myTeam = app.globalData.myTeam;
    const myTeamData = myTeam ? getTeam(myTeam) : null;
    this.setData({
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
    // 自动升级球迷等级
    if (app.globalData.fanLevel < 2) app.globalData.fanLevel = 2;
    app.persist();
    wx.vibrateShort && wx.vibrateShort({ type: 'heavy' });
    wx.showToast({ title: '✓ 加入 ' + team.name + ' 阵营', icon: 'success' });
    this.refresh();
  }
});
