# GoalRush · Luffa SuperBox 小程序

> 球迷社交向世界杯小程序 · Powered by Luffa SuperBox Runtime
> 与外部 web 版品牌一致(GoalRush),但**产品形态完全不同**:web 版偏「KOL 投放落地页 + 短视频素材」,小程序偏「真球迷身份 + IM 群组社交」

---

## 设计哲学:为什么这里不是「预测器」

竞品分析(详 PR/预测市场PR/1.Luffa_World_Cup_竞品分析与战略定位.docx)的关键洞察:

- Polymarket / OKX / Kalshi / Myriad 抢加密 trader 和高净值用户
- bet365 / William Hill 抢重度博彩用户
- **Luffa 抢的是「不押过球但是球迷」的纯球迷 · 全球 5 亿+**
- 这群人**怕被叫赌徒**,但**渴望和朋友 / KOL 一起玩**

所以小程序的核心动作是「**社交身份**」,预测只是社交动作的一种表现:
1. 球迷阵营(我支持谁)
2. 球迷动态流(看 KOL / 群友 / 阵营在干嘛)
3. 实时讨论(看比赛时的群组弹幕)
4. 球迷称号体系(初心 / 常驻 / 资深 / 元老,**忠诚度独立于命中率**)
5. KOL 跟随(球迷文化的核心)

---

## 7 个页面

| 页面 | 路径 | 是 tabBar | 用途 |
|---|---|---|---|
| **球迷动态流** | `pages/home/home` | ✅ | 主入口:个人身份卡 + 今日重磅 + FEED(KOL/群组/阵营/里程碑)|
| **比赛列表** | `pages/match/match` | ✅ | 浮动比赛卡 + 多 tab 过滤 |
| **球迷阵营** | `pages/teams/teams` | ✅ | 选你支持的球队 + 全部 16 队 grid |
| **多维榜** | `pages/leaderboard/leaderboard` | ✅ | 命中率 / 忠诚度 / KOL / 群组 四榜并存 |
| **我的** | `pages/profile/profile` | ✅ | 球迷身份卡 + Luffa 钱包 + 我的预测 |
| 比赛详情 | `pages/match-detail/match-detail` | — | 预测三选项 + KOL 在押 + 实时讨论(弹幕)+ 分享 |
| 球队主页 | `pages/team-detail/team-detail` | — | 加入阵营 + 阵营 KOL + 该队比赛 |

---

## 视觉系统(对标 Soccer & Football League App UI Kit)

- 背景 `#F7F7F9` 米白 · 卡片纯白浮动 · 软紫色阴影
- 主紫 `#6D5BFF` / 副紫 `#8B7AFF`
- 圆角大 24/28rpx · 留白多 · 字体清爽
- 头像统一圆形(球队 emoji + 国旗)
- 进度条用渐变 · 数据卡用 mono 字体
- Hero 用紫色渐变 + 软阴影

---

## 法律红线(代码级)

| 已做 | 关键证据 |
|---|---|
| ✅ 无 stake / bet / odds / payout / wager / sportsbook 字眼 | grep 全代码 0 命中 |
| ✅ 无金额输入框 | 提交预测仅接受 enum `home / draw / away` |
| ✅ 玩家分布标注「不构成赔率」 | match-detail / match 列表都有 |
| ✅ 法律 footer | 每页底部「Operated within a group holding HK SFC licenses」 |

---

## 在 Luffa Cloud-Devtools 里跑起来

### 1. 申请 AppID(Phase 1 · 一次性)

- 登录 https://cloud.luffa.com/(或集团给的 Luffa Cloud 控制台)
- 「创建小程序」→ 填名字 / 类目 / 描述 → 拿到 AppID(形如 `mpz5g4hpzd5p3k2l`)
- 把 AppID 填进 `project.config.json` 的 `TCMPPappid` 字段(替换 `REPLACE_WITH_YOUR_APPID`)
- 控制台 → request 合法域名 → 加入:
  - `https://goalrush.app`(后端 API · 上线后填正式域名)
  - 其他需要的 wss / uploadFile 等

### 2. 打开 IDE

- 下载 Luffa Cloud-Devtools(控制台首页有 dmg/exe/AppImage 下载)
- 登录同账号
- **创建项目 → 选 AppID(从下拉)→ 项目目录选 `mini-program/`**(本目录)
- Compile,模拟器即可看到 5 个 tab + 主页动态流

### 3. 跑通的 5 个验收路径

1. **主页**:看到「嗨 👋」+ 球迷身份卡(等级 1)+ 今日重磅 3 场 + 动态流(KOL / 群组 / 阵营 / 里程碑)
2. **底部 tab 切到「阵营」**:全部 16 队 grid + 长按设为我支持的(`巴西`)→ 回主页头部变绿色巴西国旗
3. **比赛 tab → 点开 ESP vs BRA(m003)**:看到大头像 vs · 倒计时 · 三选项预测 · KOL 在押 · 实时讨论
4. **押一个预测**:震动反馈 + toast + 回 my-predictions 看到已押
5. **我的 tab**:看到球迷身份卡 · 「连接 Luffa 钱包」按钮 · 我的预测列表

### 4. 连接 Luffa 钱包(任一处「连接」按钮触发)

会调 `wx.invokeNativePlugin({ api_name: 'luffaWebRequest', data: { methodName: 'connect' } })`。
- 在 Luffa Cloud-Devtools 模拟器:返回 mock 身份(查看 console)
- 在真实 Luffa app:弹钱包确认 → 拿到 address / nickname / avatar

---

## 文件结构

```
mini-program/
├── project.config.json       — Luffa IDE 配置(TCMPPappid 待填)
├── app.json                  — 页面注册 + tabBar(5 个)+ 窗口
├── app.js                    — 全局 state(wallet/myTeam/predictions)+ persist
├── app.wxss                  — 全局设计系统(米白+紫色+浮动卡)
├── sitemap.json              — 搜索规则
├── images/                   — tabBar 占位 PNG(64×64 透明 · 团队替换为真图标)
├── utils/
│   ├── luffa.js              — Promise wrapper · wx.invokeNativePlugin
│   ├── mock-data.js          — 16 队 + 8 场 + 4 KOL + FEED + 多维榜
│   └── api.js                — 后端 client(可降级到本地)
└── pages/
    ├── home/                 — 球迷动态流(tabBar 1)
    ├── match/                — 比赛列表(tabBar 2)
    ├── teams/                — 球迷阵营(tabBar 3)
    ├── leaderboard/          — 多维榜(tabBar 4)
    ├── profile/              — 我的(tabBar 5)
    ├── match-detail/         — 单场预测 + 弹幕(navigateTo)
    └── team-detail/          — 球队主页(navigateTo)
```

---

## 与外部 web 版(GoalRush)的关系

| 维度 | Web (GoalRush) | 小程序 (GoalRush in SuperBox) |
|---|---|---|
| 视觉 | 深夜场黑 + 青绿 + 金 · 球场氛围 | 米白 + 紫色 + 浮动卡 · 社交友好 |
| 主目标 | KOL 投放落地页 + 品牌曝光 + Luffa 下载漏斗 | IM 内球迷社交闭环 + 真领 EDS |
| 核心动作 | 预测 + 看 KOL + 分享 | 选阵营 + 看动态流 + 群组讨论 + 跟 KOL |
| 法律分类 | 同(play-money + utility token) | 同 |
| 用户来源 | 外部 KOL 引流 + X / TikTok | Luffa App 内 SuperBox 入口 |
| 数据同步 | localStorage 独立 | 同 Luffa 用户体系 + EDS pipeline |

二者**互补不冲突**,Web 版负责拉新到 Luffa,小程序负责留存 + 真金转化。

---

## 替换占位图标

`images/` 下 10 个 PNG 都是 64×64 透明占位。设计师做完真图标后:

- 每个 tab 需要两张:正常态 + 选中态(`tab-home.png` / `tab-home-active.png`)
- 推荐尺寸 81×81(WeChat 标准)
- 文件名保持不变,直接覆盖即可,不需要改 `app.json`

设计建议:
- 正常态 `#9CA3AF` 灰
- 选中态 `#6D5BFF` 紫
- 简洁线条 / 实心 emoji 风,与 Soccer App UI Kit 风格一致

---

## 上线 checklist(在跑通之后)

- [ ] AppID 已填进 project.config.json
- [ ] request 合法域名已加(后端 API 域名 + CDN 域名)
- [ ] 替换 10 个 tabBar 占位图标
- [ ] 隐私政策包含「钱包地址读取」声明(Luffa 钱包连接必须)
- [ ] 测试账号给审核员(若小程序需要登录)
- [ ] `utils/api.js` 的 `API_BASE` 改成正式后端域名
- [ ] 把 `submit for review` 流程跑通(Luffa Cloud 控制台 → 版本管理)

---

— 详细 PRD:`../PRD_Luffa_Predict_MVP.md`
— SuperBox 部署技术细节:`~/.claude/skills/luffa-superbox-deploy/reference.md`
