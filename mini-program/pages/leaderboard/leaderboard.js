import { LEADERBOARD_HIT, LEADERBOARD_LOYALTY, KOLS, GROUPS } from '../../utils/mock-data';
import { getDict, getLang } from '../../utils/i18n';

Page({
  data: {
    i18n: {},
    tabs: [],
    currentTab: 'hit',
    list: [],
    podium: []
  },

  onLoad() { this.refresh(); },
  onShow() { this.refresh(); },

  refresh() {
    const i18n = getDict(getLang());
    const tabs = [
      { key: 'hit', label: i18n.lb_tab_hit },
      { key: 'loyalty', label: i18n.lb_tab_loyalty },
      { key: 'kol', label: i18n.lb_tab_kols },
      { key: 'group', label: i18n.lb_tab_groups },
    ];

    const t = this.data.currentTab;
    let list = [];

    if (t === 'hit') {
      list = LEADERBOARD_HIT.map(u => ({
        ...u,
        statLabel: u.eds.toLocaleString() + ' EDS',
        sub: u.hit_rate + '% · 🔥 ' + u.streak + ' ' + i18n.lb_streak_suffix
      }));
    } else if (t === 'loyalty') {
      list = LEADERBOARD_LOYALTY.map(u => ({
        ...u,
        statLabel: u.cups + ' ' + i18n.lb_world_cups,
        sub: u.days + ' ' + i18n.lb_days_active + ' · ' + (i18n['title_' + (u.cups >= 4 ? 4 : 3)] || u.title)
      }));
    } else if (t === 'kol') {
      list = KOLS.sort((a, b) => a.current_rank - b.current_rank).map(k => ({
        rank: k.current_rank,
        handle: k.name,
        kol: k.id,
        flag: k.flag,
        title: k.tier,
        statLabel: k.hit_rate + '%',
        sub: k.handle + ' · ' + k.fans.toLocaleString() + ' ' + i18n.lb_fans_count
      }));
    } else if (t === 'group') {
      list = GROUPS.map((g, i) => ({
        rank: i + 1,
        handle: g.name,
        flag: '👥',
        statLabel: g.weekly_eds.toLocaleString() + ' EDS',
        sub: g.members + ' ' + i18n.lb_members_weekly
      }));
    }

    this.setData({
      i18n,
      tabs,
      list,
      podium: list.slice(0, 3)
    });
  },

  onTab(e) {
    this.setData({ currentTab: e.currentTarget.dataset.key }, () => this.refresh());
  }
});
