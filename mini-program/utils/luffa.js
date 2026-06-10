// Promise wrapper around wx.invokeNativePlugin · Luffa SuperBox native bridge
// 见 skill reference: methodName ∈ { connect, signMessageV2, language, openUrl, share, navigateToMiniProgram, ... }

export function luffa(methodName, data = {}) {
  return new Promise((resolve, reject) => {
    if (typeof wx === 'undefined' || !wx.invokeNativePlugin) {
      reject(new Error('wx.invokeNativePlugin 不可用 · 请在 Luffa Cloud-Devtools 或真实 Luffa 客户端运行'));
      return;
    }
    wx.invokeNativePlugin({
      api_name: 'luffaWebRequest',
      data: { methodName, ...data },
      success: resolve,
      fail: reject
    });
  });
}

export function sessionUuid() {
  return 'sess-' + Date.now() + '-' + Math.random().toString(36).slice(2, 10);
}

// 在 IDE 模拟器外(比如普通微信开发者工具)优雅降级
export function isLuffaAvailable() {
  return typeof wx !== 'undefined' && !!wx.invokeNativePlugin;
}

// 包装常用动作:连接钱包 + 拿身份
export async function connectWallet() {
  if (!isLuffaAvailable()) {
    // 降级返回 mock 身份 · 仅用于非 Luffa IDE 调试
    return {
      address: '0xMOCK_LUFFA_5b3a',
      nickname: 'Guest Fan',
      avatar: '',
      uid: 'mock-uid',
      cid: 'mock-cid'
    };
  }
  return await luffa('connect', { uuid: sessionUuid(), network: 'mainnet' });
}

// IM 内分享(群组挑战 · KOL 战绩晒图)
export async function shareToIM(payload) {
  if (!isLuffaAvailable()) {
    console.log('[mock share]', payload);
    return { ok: true };
  }
  return await luffa('share', payload);
}

// 跳到另一个 SuperBox(例如从战绩页跳 KOL 个人 IM 群)
export async function navigateToMini(appid, path = '') {
  return await luffa('navigateToMiniProgram', { appId: appid, path });
}
