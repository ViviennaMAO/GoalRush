import { getKOL, KOL_QUOTES, MATCHES, getTeam, timeToKickoff } from '../../utils/mock-data';
import { openExternalUrl } from '../../utils/luffa';
import { getDict, getLang } from '../../utils/i18n';

const app = getApp();

// 平台 icon + 显示名映射
const PLATFORM_META = {
  twitter:   { icon: '𝕏', name: 'X (Twitter)' },
  youtube:   { icon: '▶', name: 'YouTube' },
  instagram: { icon: '📷', name: 'Instagram' },
  kick:      { icon: 'K', name: 'Kick' },
  tiktok:    { icon: '♪', name: 'TikTok' },
  website:   { icon: '🌐', name: 'Website' },
};

// 短化 URL 显示
function shortUrl(url) {
  return url
    .replace(/^https?:\/\//, '')
    .replace(/^www\./, '')
    .slice(0, 36);
}

Page({
  data: {
    i18n: {},
    kol: null,
    teamC1: '#14B8A6',
    teamC2: '#0F766E',
    textOn: '#FFFFFF',
    externalLinks: [],
    quotes: [],
    recentPicks: [],
    isFollowing: false,
  },

  onLoad(opts) {
    this.kolId = opts.id || 'davoo_xeneize';
    this.refresh();
  },
  onShow() { this.refresh(); },

  refresh() {
    const i18n = getDict(getLang());
    const kol = getKOL(this.kolId);
    if (!kol) {
      wx.showToast({ title: 'KOL not found', icon: 'none' });
      setTimeout(() => wx.navigateBack(), 1000);
      return;
    }

    // 球队色 + 文字色(复用 mock-data 球队配色)
    const team = getTeam(kol.team);

    // External links 数组:从 kol.external_urls 拆解
    const externalLinks = [];
    const urls = kol.external_urls || {};
    Object.keys(urls).forEach(key => {
      const meta = PLATFORM_META[key] || { icon: '🔗', name: key };
      externalLinks.push({
        key,
        platform: meta.name,
        icon: meta.icon,
        display: shortUrl(urls[key]),
        url: urls[key],
      });
    });

    // Quotes(只展示这位 KOL 的)
    const quotes = KOL_QUOTES.filter(q => q.kol_id === this.kolId).map(q => {
      let platform_name = 'X';
      if (q.url.includes('youtube')) platform_name = 'YouTube';
      else if (q.url.includes('kick'))   platform_name = 'Kick';
      else if (q.url.includes('twitter') || q.url.includes('x.com')) platform_name = 'X';
      else if (q.url.includes('instagram')) platform_name = 'Instagram';
      return { ...q, platform_name };
    });

    // KOL 本届的预测(简化版 · 从 MATCHES 里筛该队比赛 mock 一份)
    const teamMatches = MATCHES
      .filter(m => m.home === kol.team || m.away === kol.team)
      .slice(0, 3)
      .map(m => {
        const home = getTeam(m.home), away = getTeam(m.away);
        // KOL 默认押本国队赢
        const pick = m.home === kol.team ? 'home' : 'away';
        const pickLabel = pick === 'home' ? home.code + ' 赢' : away.code + ' 赢';
        return {
          ...m,
          homeTeam: home,
          awayTeam: away,
          countdown: timeToKickoff(m.kickoff),
          pick,
          pickLabel,
        };
      });

    // 关注状态
    const follows = app.globalData.follows || [];
    const isFollowing = follows.includes(this.kolId);

    this.setData({
      i18n,
      kol,
      teamC1: team.c1,
      teamC2: team.c2,
      textOn: team.textOn,
      externalLinks,
      quotes,
      recentPicks: teamMatches,
      isFollowing,
    });

    wx.setNavigationBarTitle({ title: kol.name });
  },

  // 跳真实外部 URL(走 luffa('openUrl') · 降级剪贴板)
  openExt(e) {
    const url = e.currentTarget.dataset.url;
    openExternalUrl(url);
  },

  toggleFollow() {
    app.globalData.follows = app.globalData.follows || [];
    const idx = app.globalData.follows.indexOf(this.kolId);
    if (idx >= 0) {
      app.globalData.follows.splice(idx, 1);
    } else {
      app.globalData.follows.push(this.kolId);
    }
    if (app.persist) app.persist();
    wx.vibrateShort && wx.vibrateShort({ type: 'light' });
    this.refresh();
  },

  goMatch(e) {
    const id = e.currentTarget.dataset.id;
    wx.navigateTo({ url: '/pages/match-detail/match-detail?id=' + id });
  },

  onShareAppMessage() {
    const { kol } = this.data;
    return {
      title: `${kol.name} · GoalRush KOL`,
      path: `/pages/kol-detail/kol-detail?id=${this.kolId}`,
    };
  }
});
