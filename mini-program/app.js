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

    // 2. 拉取 Luffa 系统语言(用户的 IM 语言)— 不阻塞
    if (typeof wx !== 'undefined' && wx.invokeNativePlugin) {
      wx.invokeNativePlugin({
        api_name: 'luffaWebRequest',
        data: { methodName: 'language' },
        success: (res) => { if (res && res.result) this.globalData.language = res.result; },
        fail: () => {}
      });
    }
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
