// GoalRush · Luffa SuperBox App lifecycle
// 全局状态:用户身份 + 球迷阵营 + 语言 + 我的预测 · 持久化到 wx.storage

App({
  globalData: {
    wallet: null,        // { address, nickname, avatar, cid, uid } 来自 luffa('connect')
    language: 'zh-Hans',
    myTeam: null,        // 我支持的球队 code,例如 'BRA'
    fanLevel: 1,         // 球迷等级(本地累积:1=路人 / 2=粉丝 / 3=老粉 / 4=元老)
    eds: 0,              // EDS 余额(显示用,真值在 Luffa 钱包)
    predictions: {},     // { match_id: 'home' | 'draw' | 'away' }
    follows: [],         // 关注的 KOL ids
  },

  onLaunch() {
    // 1. 拉取持久化状态
    try {
      const stored = wx.getStorageSync('goalrush_state');
      if (stored) Object.assign(this.globalData, stored);
    } catch (e) {}

    if (typeof wx === 'undefined' || !wx.invokeNativePlugin) return;

    // 2. 拉取 Luffa 系统语言 — 不阻塞
    wx.invokeNativePlugin({
      api_name: 'luffaWebRequest',
      data: { methodName: 'language' },
      success: (res) => { if (res && res.result) this.globalData.language = res.result; },
      fail: () => {}
    });

    // 3. 静默 auto-connect Luffa 钱包(SuperBox 内单点登录,用户已授权)
    // 不弹任何 UI · 失败也不打扰用户(他可以照常浏览)
    wx.invokeNativePlugin({
      api_name: 'luffaWebRequest',
      data: { methodName: 'connect', uuid: 'autostart-' + Date.now(), network: 'mainnet' },
      success: (res) => {
        if (res && res.address) {
          this.globalData.wallet = res;
          // mock EDS 余额:实际应通过 Endless SDK 拉链上余额
          if (!this.globalData.eds || this.globalData.eds === 0) {
            this.globalData.eds = 100;
          }
          this.persist();
          // 通知当前页面刷新
          const pages = getCurrentPages();
          const cur = pages[pages.length - 1];
          if (cur && typeof cur.refresh === 'function') cur.refresh();
        }
      },
      fail: () => {}
    });
  },

  onShow() {},

  onHide() { this.persist(); },

  onError(err) { console.error('[App.onError]', err); },

  // 写回 storage(全局调用)
  persist() {
    try {
      wx.setStorageSync('goalrush_state', {
        wallet: this.globalData.wallet,
        myTeam: this.globalData.myTeam,
        fanLevel: this.globalData.fanLevel,
        eds: this.globalData.eds,
        predictions: this.globalData.predictions,
        follows: this.globalData.follows,
      });
    } catch (e) {}
  }
});
