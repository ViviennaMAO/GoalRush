import { MATCHES, FEED, getTeam, getMatch, getKOL, timeAgo, timeToKickoff } from '../../utils/mock-data';
import { connectWallet } from '../../utils/luffa';

const app = getApp();

Page({
  data: {
    wallet: null,
    myTeam: null,
    myTeamName: '',
    myTeamFlag: '',
    fanLevel: 1,
    predCount: 0,
    eds: 0,
    followCount: 0,
    todayMatches: [],
    feed: []
  },

  onLoad() { this.refresh(); },
  onShow() { this.refresh(); },
  onPullDownRefresh() { this.refresh(); wx.stopPullDownRefresh(); },

  refresh() {
    const g = app.globalData;
    const myTeam = g.myTeam ? getTeam(g.myTeam) : null;
    const predCount = Object.keys(g.predictions || {}).length;

    // 今日重磅(highlight + 前 3 场)
    const todayMatches = MATCHES.filter(m => m.highlight).slice(0, 3).map(m => ({
      ...m,
      homeTeam: getTeam(m.home),
      awayTeam: getTeam(m.away),
      countdown: timeToKickoff(m.kickoff),
    }));

    // 球迷动态流(关联 kol / match / team 数据)
    const pickLabels = { home: '主队赢', draw: '平局', away: '客队赢' };
    const feed = FEED.map(f => {
      const out = { ...f, timeAgo: timeAgo(f.ts_min) };
      if (f.type === 'kol_pick') {
        out.kolData = getKOL(f.kol);
        const m = getMatch(f.match);
        if (m) {
          out.matchData = { ...m, homeTeam: getTeam(m.home), awayTeam: getTeam(m.away) };
          const pickTeam = f.pick === 'home' ? out.matchData.homeTeam : out.matchData.awayTeam;
          out.pickLabel = f.pick === 'draw' ? '平局' : pickTeam.code + ' 赢';
        }
      }
      if (f.type === 'group_buzz' && f.match) {
        const m = getMatch(f.match);
        if (m) out.matchData = { ...m, homeTeam: getTeam(m.home), awayTeam: getTeam(m.away) };
      }
      if (f.type === 'team_event') {
        out.teamData = getTeam(f.team);
      }
      return out;
    });

    this.setData({
      wallet: g.wallet,
      myTeam: g.myTeam,
      myTeamName: myTeam ? myTeam.name : '',
      myTeamFlag: myTeam ? myTeam.flag : '',
      fanLevel: g.fanLevel || 1,
      predCount,
      eds: g.eds || 0,
      followCount: (g.follows || []).length,
      todayMatches,
      feed,
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

  onPickTeam() {
    wx.switchTab({ url: '/pages/teams/teams' });
  },

  goMatches() { wx.switchTab({ url: '/pages/match/match' }); },
  goMatch(e) {
    const id = e.currentTarget.dataset.id;
    wx.navigateTo({ url: '/pages/match-detail/match-detail?id=' + id });
  },
  goTeam(e) {
    const code = e.currentTarget.dataset.code;
    wx.navigateTo({ url: '/pages/team-detail/team-detail?code=' + code });
  }
});
