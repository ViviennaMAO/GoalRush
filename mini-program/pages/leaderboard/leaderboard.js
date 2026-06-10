import { LEADERBOARD_HIT, LEADERBOARD_LOYALTY, KOLS, GROUPS } from '../../utils/mock-data';

Page({
  data: {
    tabs: [
      { key: 'hit', label: '🎯 命中率' },
      { key: 'loyalty', label: '🏆 忠诚度' },
      { key: 'kol', label: '⭐ KOL' },
      { key: 'group', label: '👥 群组' },
    ],
    currentTab: 'hit',
    list: [],
    podium: []
  },

  onLoad() { this.refresh(); },

  refresh() {
    const t = this.data.currentTab;
    let list = [];

    if (t === 'hit') {
      list = LEADERBOARD_HIT.map(u => ({
        ...u,
        statLabel: u.eds.toLocaleString() + ' EDS',
        sub: '命中率 ' + u.hit_rate + '% · 🔥 ' + u.streak + ' 连胜'
      }));
    } else if (t === 'loyalty') {
      list = LEADERBOARD_LOYALTY.map(u => ({
        ...u,
        statLabel: u.cups + ' 届世界杯',
        sub: u.days + ' 天活跃 · ' + u.title
      }));
    } else if (t === 'kol') {
      list = KOLS.sort((a, b) => a.current_rank - b.current_rank).map(k => ({
        rank: k.current_rank,
        handle: k.name,
        kol: k.id,
        flag: k.flag,
        title: k.tier + ' 档',
        statLabel: k.hit_rate + '%',
        sub: k.handle + ' · ' + k.fans.toLocaleString() + ' 粉丝'
      }));
    } else if (t === 'group') {
      list = GROUPS.map((g, i) => ({
        rank: i + 1,
        handle: g.name,
        flag: '👥',
        statLabel: g.weekly_eds.toLocaleString() + ' EDS',
        sub: g.members + ' 位成员 · 周排名'
      }));
    }

    this.setData({
      list,
      podium: list.slice(0, 3)
    });
  },

  onTab(e) {
    this.setData({ currentTab: e.currentTarget.dataset.key }, () => this.refresh());
  }
});
