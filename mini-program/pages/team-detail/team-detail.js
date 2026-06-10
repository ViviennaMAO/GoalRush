import { getTeam, KOLS, MATCHES, timeToKickoff } from '../../utils/mock-data';
import { getDict, getLang } from '../../utils/i18n';

const app = getApp();

Page({
  data: {
    i18n: {},
    code: '',
    team: null,
    isMyTeam: false,
    teamKols: [],
    teamMatches: []
  },

  onLoad(opts) {
    this.code = opts.code || 'BRA';
    this.refresh();
  },
  onShow() { this.refresh(); },

  refresh() {
    const i18n = getDict(getLang());
    const team = getTeam(this.code);
    const teamKols = KOLS.filter(k => k.team === this.code);
    const teamMatches = MATCHES.filter(m => m.home === this.code || m.away === this.code).map(m => ({
      ...m,
      homeTeam: getTeam(m.home),
      awayTeam: getTeam(m.away),
      countdown: timeToKickoff(m.kickoff)
    }));
    this.setData({
      i18n,
      code: this.code,
      team,
      isMyTeam: app.globalData.myTeam === this.code,
      teamKols,
      teamMatches
    });
  },

  onJoin() {
    app.globalData.myTeam = this.code;
    if (app.globalData.fanLevel < 2) app.globalData.fanLevel = 2;
    app.persist();
    wx.vibrateShort && wx.vibrateShort({ type: 'heavy' });
    wx.showToast({ title: '✓ ' + this.data.team.name, icon: 'success' });
    this.refresh();
  },

  goMatch(e) {
    const id = e.currentTarget.dataset.id;
    wx.navigateTo({ url: '/pages/match-detail/match-detail?id=' + id });
  }
});
