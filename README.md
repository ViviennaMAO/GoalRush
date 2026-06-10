# GoalRush — Web Prototype

> 2026 FIFA World Cup · Predict for free. Earn for real.
> 网页版预测小游戏 + KOL 投放落地页 + 内容团队海报工具
> 双 KPI 设计:**品牌曝光**(GoalRush DAU / 分享数)+ **Luffa 下载漏斗**(modal CTA / 跳商店点击)
> 命名约定:对外品牌 = **GoalRush** · 链上钱包能力 = **Powered by Luffa** · 内部 PRD 仍称 Luffa Predict

---

## 一图看懂

```
品牌曝光 KPI                          Luffa 下载 KPI
─────────────                          ─────────────
网页 DAU       ───┐                ┌── Luffa modal 打开率
KOL 战绩页分享     │                │    跳商店点击数
短视频海报下载     ├── 投放漏斗 ──┤    App 内同步战绩数
SEO / sitemap     │                │    EDS 实领转化
社交 OG 卡片      ─┘                └──
```

---

## 8 个页面

| 页面 | URL | 主要用途 |
|---|---|---|
| **Hero 首页** | `index.html` | 投放落地页 · Hero + 今日比赛 + KOL 网格 + 排行榜 |
| **比赛列表** | `matches.html` | 全 14 场比赛 + 4 个 tab 过滤 |
| **单场预测** | `match.html?id=m003` | 三选项预测 + 倒计时 + 分享 |
| **群组挑战** | `groups.html` | K-factor 引擎说明 + 顶尖群组榜 |
| **我的预测** | `my-predictions.html` | localStorage 战绩 + 下载 Luffa 同步 CTA |
| **排行榜** | `leaderboard.html` | 全网 / 群组 / KOL 三榜 |
| **KOL 战绩页** | `kol.html?id=lucas_br` | **KOL 直接放 X bio 的核心营销资产** |
| **FAQ** | `faq.html` | 玩法 / 结算 / 法律分类 / 反作弊 |
| **海报工具** | `poster.html` | 内容团队:4 模板 × 4 语言 |
| **OG 卡片** | `og-image.html` | 社交分享卡片 1200×630 模板 |

---

## 跑起来

**0 依赖,任意静态服务器即可**:

```bash
# Python
python3 -m http.server 8000

# Node
npx serve .

# 直接打开
open index.html
```

---

## 部署到 Vercel / Netlify(5 分钟)

```bash
# Vercel
npm i -g vercel
vercel --prod

# Netlify
npm i -g netlify-cli
netlify deploy --prod --dir=.
```

无需 build step。所有文件直接 ship。

### 部署后必做

1. **替换 GA4 ID** — `assets/js/app.js` 底部 `G-XXXXXXXXXX` → 你的 GA4 Measurement ID,并放开注释
2. **生成 OG 图** — 打开 `og-image.html`,Chrome DevTools → 设置设备 1200×630 → 截图保存为 `og-image.png` 放根目录
3. **改域名** — `sitemap.xml` / `robots.txt` 中 `luffa.predict` → 你的实际域名
4. **绑定 X / TikTok pixel** — 同 GA4 在 `app.js` setupAnalytics 中追加

---

## 项目结构

```
.
├── index.html            ── Hero 首页
├── matches.html          ── 全比赛列表
├── match.html            ── 单场预测页
├── leaderboard.html      ── 排行榜
├── groups.html           ── 群组挑战
├── my-predictions.html   ── 我的预测
├── kol.html              ── KOL 战绩页(查询参数 ?id=)
├── faq.html              ── FAQ + 法律说明
├── poster.html           ── 内容团队海报工具
├── og-image.html         ── OG 卡片源模板
├── robots.txt
├── sitemap.xml
└── assets/
    ├── css/style.css     ── 完整设计系统
    └── js/
        ├── data.js       ── 20 队 + 14 场 + 4 KOL + 排行榜 mock
        ├── i18n.js       ── 中 / 英 / 西 / 葡 四语
        ├── app.js        ── localStorage + 埋点 + Luffa 下载漏斗
        └── poster.js     ── Canvas 4 模板海报引擎
```

---

## KPI 与埋点

每个用户行为都有 `trackEvent(name, props)` 埋点,落到:
- `window.LUFFA_EVENTS` 数组(dev / debug)
- `window.dataLayer` (GA4 / GTM)
- console.log(开发期)

### 品牌曝光 KPI 事件

| Event | 触发 | Props |
|---|---|---|
| `page_view` | 任一页面打开 | `page`, `path` |
| `prediction_submit` | 提交预测 | `match_id`, `pick` |
| `kol_follow` | 跟随 KOL 一键预测 | `kol_id`, `count` |
| `kol_share` | 分享 KOL 战绩页 | `kol_id` |
| `share_prediction` | 分享自己的预测 | `match_id` |
| `poster_download` | 下载海报 PNG | `tpl`, `lang` |
| `poster_copy` | 复制海报到剪贴板 | `tpl` |
| `lang_switch` | 切换语言 | `lang` |
| `faq_open` | 打开 FAQ 折叠 | `q` |

### Luffa 下载漏斗事件

| Event | 触发 | Props |
|---|---|---|
| `luffa_download_click` | 任一处「下载 Luffa」CTA | `source`(hero / header / kol_page / my_card / after_predict / footer / faq_bottom / group_card_xxx 等) |
| `luffa_download_store` | modal 内点 App Store / Google Play | `store: ios / android` |

漏斗看板可以直接接 GA4 Explorer:
- 第一步:`page_view`
- 第二步:`prediction_submit` 或 `kol_follow`
- 第三步:`luffa_download_click`
- 第四步:`luffa_download_store`

---

## 双 KPI 拆分(对应营销策略)

### KPI 目标 1 · 品牌曝光(主战场,7 天观察期)

| 指标 | 7 天目标 | 测量方式 |
|---|---|---|
| 网页 DAU | ≥ 5,000 | GA4 unique users |
| 预测提交数(localStorage) | ≥ 8,000 | `prediction_submit` event 计数 |
| KOL 战绩页打开 | ≥ 12,000 | `kol.html` page_view |
| 分享数 | ≥ 800 | `share_prediction` + `kol_share` |
| 海报下载数 | ≥ 50(内部内容团队) | `poster_download` |
| 多语言覆盖 | EN/ES/PT 占比 ≥ 50% | `lang_switch` + 浏览器 lang |

### KPI 目标 2 · Luffa 新增下载(漏斗末端)

| 指标 | 7 天目标 | 测量方式 |
|---|---|---|
| Luffa modal 打开率 | ≥ 12% of DAU | `luffa_download_click` / `page_view` |
| 跳商店点击率 | ≥ 50% of modal | `luffa_download_store` / `luffa_download_click` |
| 实际 Luffa 安装(归因 source) | ≥ 600 | Appsflyer / Branch.io 接入归因 |
| KOL 页 → Luffa 下载转化 | ≥ 15%(高于均值)| KOL page session → modal 漏斗 |

---

## 内容团队工具(海报工具 ≠ Photoshop)

打开 `poster.html`,**4 模板 × 4 语言 = 16 组合**:

| 模板 | 尺寸 | 用法 | 出图节奏 |
|---|---|---|---|
| **KOL 战绩** | 1080×1080 | KOL 在 X / IG 个人主页晒 | 每周 1 张 / KOL |
| **赛前预测** | 1080×1080 | 群发 + KOL 转发 | 开赛前 4 小时 |
| **赛后战报** | 1080×1080 | 决出胜负 30 分钟内推 | 每场比赛 |
| **TikTok / Reel** | 1080×1920 | 短视频 cover / 静态 Reel | 每日 3-5 张 |

工作流:
1. 选模板 + 选 KOL/比赛 + 选语言
2. 改自定义副标题(可选)
3. 点「下载 PNG」或「复制图片」
4. 直接粘贴到 X / TG / IG / TikTok 后台

---

## 法律红线检查 ✓

- [x] 无 `bet` / `wager` / `odds` / `payout` / `sportsbook` / `prediction market` 字眼
- [x] 无金额输入框 / 无 stake 字段
- [x] 「玩家分布 X%」严格标注「不构成赔率 / not odds」
- [x] 页脚 + FAQ + modal 三处「Operated within a group holding HK SFC licenses」
- [x] geo-fence 声明(US retail / Mainland China / EU MiCA review)
- [x] 多语言核心句对齐 PRD §A.2 安全词汇

---

## 与 Plan B 5 天工程节奏的关系

| 阶段 | 网页版作用 |
|---|---|
| **D1-D4(6/11-14)** | 网页版是<strong>对外可见的唯一产品</strong>(Polymind + 手动 settle 在 Luffa App 内灰度)。KOL outreach 时直接发战绩页 URL |
| **D5(6/15)Luffa Predict 静默上线** | 网页版同步加大投放;Luffa App 内入口同步切换;数据双轨观察 |
| **6/15-6/21 7 天观察** | 网页版 = 品牌曝光主场;Luffa App = 下载漏斗主场;**互不依赖,可独立达标 KPI** |
| **6/22 大推广(若 GREEN)** | 网页版做 KOL 内容矩阵;Luffa 下载做付费投放主入口 |
| **6/22(若 RED 静默回滚)** | 网页版保持运营(品牌曝光不受工程问题影响);Luffa App 内入口下线 |

→ **网页版是 Plan B 的「降落伞」**:即使 Luffa App 内出问题,品牌曝光仍可独立跑。

---

## 关联文档

- [PRD](PRD_Luffa_Predict_MVP.md) — MVP 产品需求文档
- [06 工程清单](../../LUFFA/PR/6月10日-分阶段GTM战略/06.Luffa_Predict_工程5天开干清单.md) — 5 天工程节奏
- [05 风险简报](../../LUFFA/PR/6月10日-分阶段GTM战略/05.Luffa_世界杯预言机风险简报与PlanB建议.md) — Plan B 背景
- [04 30 天执行手册](../../LUFFA/PR/6月10日-分阶段GTM战略/04.Luffa_世界杯30天执行手册_3-5人紧迫版.md)
