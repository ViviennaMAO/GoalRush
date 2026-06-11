import { MATCHES, FEED, getTeam, getMatch, getKOL, timeAgo, timeToKickoff } from '../../utils/mock-data';
import { getDict, getLang } from '../../utils/i18n';

const app = getApp();

// 快速选阵营 · 默认展示 5 大热门球队(球迷数 Top + 区域代表)
const QUICK_PICK_CODES = ['BRA', 'ARG', 'ESP', 'FRA', 'ENG'];

Page({
  data: {
    i18n: {},
    wallet: null,
    myTeam: null,
    myTeamData: null,       // 含 c1 / c2 / cheer / textOn 渐变色 + 应援口号
    fanLevel: 1,
    predCount: 0,
    eds: 0,
    followCount: 0,
    todayMatches: [],
    feed: [],
    quickTeams: [],
  },

  onLoad() { this.refresh(); },
  onShow() { this.refresh(); },
  onPullDownRefresh() { this.refresh(); wx.stopPullDownRefresh(); },

  refresh() {
    const g = app.globalData;
    const lang = getLang();
    const i18n = getDict(lang);
    const myTeamData = g.myTeam ? getTeam(g.myTeam) : null;
    const predCount = Object.keys(g.predictions || {}).length;

    // 今日重磅(highlight + 前 3 场)
    const todayMatches = MATCHES.filter(m => m.highlight).slice(0, 3).map(m => ({
      ...m,
      homeTeam: getTeam(m.home),
      awayTeam: getTeam(m.away),
      countdown: timeToKickoff(m.kickoff),
    }));

    // 球迷动态流
    const feed = FEED.map(f => {
      const out = { ...f, timeAgo: timeAgo(f.ts_min) };
      if (f.type === 'kol_pick') {
        out.kolData = getKOL(f.kol);
        const m = getMatch(f.match);
        if (m) {
          out.matchData = { ...m, homeTeam: getTeam(m.home), awayTeam: getTeam(m.away) };
          const pickTeam = f.pick === 'home' ? out.matchData.homeTeam : out.matchData.awayTeam;
          out.pickLabel = f.pick === 'draw' ? i18n.pick_draw : pickTeam.code;
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

    // 快速选阵营球队列表
    const quickTeams = QUICK_PICK_CODES.map(c => getTeam(c));

    this.setData({
      i18n,
      wallet: g.wallet,
      myTeam: g.myTeam,
      myTeamData,
      fanLevel: g.fanLevel || 1,
      predCount,
      eds: g.eds || 0,
      followCount: (g.follows || []).length,
      todayMatches,
      feed,
      quickTeams,
    });
  },

  // 快速选阵营(home 内联,不跳页面)
  quickPick(e) {
    const code = e.currentTarget.dataset.code;
    const team = getTeam(code);
    app.globalData.myTeam = code;
    if (app.globalData.fanLevel < 2) app.globalData.fanLevel = 2;
    app.persist();
    wx.vibrateShort && wx.vibrateShort({ type: 'heavy' });
    // 用 toast 显示应援口号(就在地化展示「你加入了 XX 营」)
    wx.showToast({ title: team.cheer, icon: 'none', duration: 1500 });
    this.refresh();
  },

  goAllTeams() { wx.switchTab({ url: '/pages/teams/teams' }); },

  goMatches() { wx.switchTab({ url: '/pages/match/match' }); },
  goMatch(e) {
    const id = e.currentTarget.dataset.id;
    wx.navigateTo({ url: '/pages/match-detail/match-detail?id=' + id });
  },
  goTeam(e) {
    const code = e.currentTarget.dataset.code;
    wx.navigateTo({ url: '/pages/team-detail/team-detail?code=' + code });
  },
  goKol(e) {
    const id = e.currentTarget.dataset.id;
    if (!id) return;
    wx.navigateTo({ url: '/pages/kol-detail/kol-detail?id=' + id });
  }
});
