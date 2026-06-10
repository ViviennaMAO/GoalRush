# Luffa Predict · MVP 产品需求文档(PRD v1.0)

> 版本:v1.0 · 日期:**2026-06-10 晚**
> 状态:**Plan B 默认通过 · 5 天工程窗口 6/11-6/15 · 7 天静默观察 6/15-6/21**
> 收件:Ken(后端 / 自动结算 / EDS)· Roger(前端 / SuperBox / 排行榜)· Vivienna(决策 / 法务对接)· T3 内容 · T5 运营
> 关联:[02 产品功能匹配](../../LUFFA/PR/6月10日-分阶段GTM战略/02.Luffa_世界杯专题_产品功能匹配与独立分析.md) · [04 30 天手册](../../LUFFA/PR/6月10日-分阶段GTM战略/04.Luffa_世界杯30天执行手册_3-5人紧迫版.md) · [05 风险简报](../../LUFFA/PR/6月10日-分阶段GTM战略/05.Luffa_世界杯预言机风险简报与PlanB建议.md) · [06 工程清单](../../LUFFA/PR/6月10日-分阶段GTM战略/06.Luffa_Predict_工程5天开干清单.md)

---

## 0. TL;DR(一页读完)

### 0.1 我们要做什么

**Luffa Predict** —— 一个跑在 Luffa SuperBox Runtime 上的「世界杯免费预测 → 真金 EDS 奖励」轻量产品。**5 天 ship MVP**,**6/15 静默接管 Polymind** 成为主战场,**7 天观察数据 GREEN 才大推广**。

### 0.2 一句话定位(法律红线)

> 「Play-money 预测 + 自有 utility token 奖励 ≠ prediction market ≠ betting」。
> 用户**不押本金**、不入金、不竞猜赔率。EDS 奖励作为「平台推广 token reward」发放,法律分类与 Polymarket / bet365 不同。

### 0.3 5 天 MVP 必有功能(MUST · 8 项)

| # | 功能 | 一句话 | 工程 owner |
|---|---|---|---|
| F1 | **比赛列表** | 展示当日 / 本周比赛 + 多时区 | Roger |
| F2 | **单场预测(binary)** | 主队赢 / 平 / 客队赢 · 开赛前 5 分钟锁定 | Roger |
| F3 | **多源自动结算** | SofaScore + API-Football + ESPN 三源对账 | Ken |
| F4 | **EDS 即时发放** | 结算后 5 分钟内到账 + 反作弊集成 | Ken |
| F5 | **排行榜** | 全网 + 群组双榜 · 实时更新 | Ken + Roger |
| F6 | **开群挑战(K-factor)** | 邀 5 友 = 500 EDS + 群主皮肤 | Ken + Roger |
| F7 | **KOL 战绩页 SuperBox** | AI Coach 自动生成 · 公开可分享 | Roger |
| F8 | **SA 推送钩子** | 赛前 30min + 赛后 15min 模板 | Ken |

### 0.4 暂不做(WON'T · 守住 5 天节奏)

- ❌ 比分预测(F10 留 W2 迭代)
- ❌ Bracket Challenge(F9 留 W3 6/28)
- ❌ LuffaPay 真金升级(F11 留 W3+,且必须 Chainlink + 法务 sign-off)
- ❌ Chainlink Oracle 接入(留 Phase 3)
- ❌ KOL 对决直播 / 数字人讲解(W3+)
- ❌ 自定义私房 markets(W3+ 群主玩法升级)
- ❌ SBT / NFT 纪念(W5 决赛日)
- ❌ 任何「赔率」「odds」「betting」字眼

### 0.5 上线门槛 / 数据 Gate

| 门槛 | 触发 | 决议 |
|---|---|---|
| **D4(6/14)21:00 GO/NO-GO** | 50 位种子首次预测完成率 ≥ 80% · 结算正确率 ≥ 98% · P0 bug = 0 | 三项命中 → 6/15 GO · 任一不达 → 推迟 24h |
| **D5(6/15)上线时机** | 当日第一场比赛开赛前 4 小时 | 给团队 4 小时观察窗口 |
| **6/22 7 天 Gate** | 8 项观察指标命中 ≥ 7 项 | GREEN 大推广 / YELLOW 调优 / RED 静默回滚 |

---

## 1. 产品定位与法律分类(最关键一节)

### 1.1 产品分类四象限

|  | **押真金** | **不押真金(play-money)** |
|---|---|---|
| **结算靠 oracle** | Polymarket / Kalshi(prediction market · MiCA / CFTC 管辖) | 多数 Fantasy 游戏 |
| **结算靠平台 + 多源对账** | 🔴 **禁区**(无 oracle 押真金 = 违规博彩) | ✅ **Luffa Predict 站位 · play-money + utility token reward** |

**Luffa Predict 严格站在右下象限**。这是法律分类的核心,5 天工程期间不得跨格。

### 1.2 法律红线(代码 / 文案 / 数据库均需遵守)

| 红线 | 实现要求 |
|---|---|
| 用户**不入金** | 数据库无「stake amount」字段 · 前端无「下注」按钮 · 改用「预测 predict」「pick」 |
| **EDS 不是赔付,是平台奖励** | 发放逻辑写在 `reward_pool` 而非 `payout` · 文案统一「奖励 reward」 |
| 不出现敏感词 | 代码、UI、推送、客服模板全量扫描:`betting / odds / wager / stake / payout / sportsbook / prediction market` 一律替换 |
| 安全表述 | 「Predict for free. Earn EDS rewards.」/「Operated within a group holding HK SFC licenses」 |
| 西班牙地区文案 | P1(Vivienna)多审一道,避开 MiCA 敏感词 |
| 北美用户 | geo-fence 屏蔽(IP + 手机区号)· 显示「unavailable in your region」 |
| 中国大陆 | 完全 hidden · 不展示入口 |

### 1.3 与 Polymind 的关系

| 维度 | 关系 |
|---|---|
| **6/11-6/14**(D1-D4)| Polymind 仍是用户主入口,Luffa Predict 内测灰度 |
| **6/15**(D5)| Luffa Predict 静默上架 + 默认入口,Polymind 标签下移到「同类应用」二级 |
| **6/15-6/21**(7 天观察) | 老用户仍可访问 Polymind,新用户默认进 Luffa Predict · **不预宣传** |
| **6/22 后** | GREEN → Polymind 静默淡出 · RED → Luffa Predict 标记 beta + Polymind 标签恢复 |

---

## 2. 用户画像与核心 JTBD

### 2.1 P0 用户画像(MVP 灰度 + 上线主面向)

| Persona | 描述 | 占比 | 核心痛点 | Luffa Predict 解决 |
|---|---|---|---|---|
| **A · 拉美球迷** | 西/葡语原生 · 加密接受度高 · 没本金 · 想跟朋友一起玩 | 50% | Polymarket 钱包门槛 + 押真金压力 | 0 门槛 + 不押本金 + 群组社交 |
| **A2 · 西班牙球迷** | Polymarket / Kalshi 被封 · 找替代品 | 10% | 没合规的免费玩法 | 法律分类不同 · 可正常运营 |
| **E · Luffa 欧洲老用户** | 8 万 DAU 中的足球受众 · 已有 Luffa 钱包 | 30% | 想要新玩法 + 群组挑战 | 一键即玩 · 群组排行榜 |
| **B' · KOL** | 拉美 / 西语 / 加密交叉 KOL | <1% but 关键 | 想要可信战绩展示 + 不引流粉丝去 Polymarket | KOL 战绩页 SuperBox · AI 生成 |

### 2.2 核心 Jobs-to-be-Done

| Job | 说明 | 对应功能 |
|---|---|---|
| **J1** 「我看完比赛想立刻看赢没赢」 | 结算延迟 = 致命断点 | F3 多源对账 5 分钟内 + F4 即时 EDS |
| **J2** 「我想拉群和兄弟一起预测」 | 社交是留存核心 | F6 开群挑战 |
| **J3** 「我想跟着 KOL 的判断玩,但不去 Polymarket」 | KOL 在 Luffa 内闭环 | F7 KOL 战绩页 + Luffa SA |
| **J4** 「我想看自己在拉美 / 群里排第几」 | 攀比 + 炫耀驱动二次打开 | F5 排行榜双榜 |
| **J5** 「我想 30 秒进来就玩,不要钱包 / KYC」 | 0 门槛是 Luffa 唯一独占优势 | F3 钱包 0 KYC(Luffa 现有)|

---

## 3. MVP 范围(对齐 D1-D5 工程节奏)

> 范围管理就是「时间窗口管理」。下面每个 feature 对齐 06 文档的 D1-D5 deliverable,**任何一天未达自动降级**。

### 3.1 范围表(MUST / SHOULD / WON'T)

| 优先级 | 功能 | D1 | D2 | D3 | D4 | D5 | 降级方案 |
|---|---|---|---|---|---|---|---|
| MUST | F1 比赛列表 + 时区 | skeleton | ✅ done | — | — | — | 多时区切换砍 → 只 UTC + 用户本地 |
| MUST | F2 单场 binary 预测 | — | ✅ done | — | — | — | 砍「平局」选项 → 二元(主/客) |
| MUST | F3 多源对账自动结算 | 设计 | v1 单源 | ✅ 三源 | — | — | 砍 ESPN → 双源(SofaScore + API-Football) |
| MUST | F4 EDS 即时发放 | — | — | ✅ 接入 | — | — | 砍即时 → 延迟到次日批量 |
| MUST | 反作弊 L1+L3 集成 | — | — | ✅ | — | — | 砍 L3 排名乘数 → 仅 L1 账号成熟度 |
| MUST | F5 排行榜双榜 | — | — | ✅ | — | — | 砍群组榜 → 仅全网榜 |
| MUST | 50 位灰度灰度开关 | — | — | ✅ | — | — | 不可砍(回滚生命线)|
| SHOULD | F6 开群挑战 | — | — | — | ✅ | — | 砍群主皮肤 → 只 500 EDS 奖励 |
| SHOULD | F7 KOL 战绩页 | — | — | — | ✅(1 位 KOL 灰度) | — | 砍 AI Coach 自动生成 → 手工模板 |
| SHOULD | F8 SA 推送钩子 | — | — | — | ✅ | — | 砍赛后 15min → 仅赛前 30min |
| MUST | 上线 SOP + rollback | — | — | — | ✅ 文档 | ✅ 上线 | 不可砍 |
| WON'T(本期不做)| F9 Bracket / F10 比分 / F11 LuffaPay 真金 / 私房自定义 / 数字人 / SBT / Chainlink | — | — | — | — | — | — |

### 3.2 「不可砍」清单(MVP 最小可玩 = F1+F2+F3+F4)

如果 D3 出现重大延期,**最后保留下面 4 件**就能让用户跑通完整闭环:
1. 看到比赛(F1)
2. 选预测(F2)
3. 比赛结束系统知道结果(F3 即使降到单源)
4. EDS 到账(F4 即使降到次日)

F5 排行榜 / F6 群组 / F7 KOL 战绩 / F8 SA 都是放大器,不影响 MVP 跑通。

---

## 4. 用户旅程(端到端 5 个核心流程)

### 4.1 Flow A · 新用户首次预测(0-3 分钟)

```
进入入口(Luffa App / KOL 链接 / SA 推送)
  ↓
看到 Luffa Predict SuperBox Hero 页
  ↓ 展示:今日 3 场关键战 + 最新排行榜 Top 10
  ↓
点「立即预测」CTA
  ↓
[首次] 一键创建 Luffa 钱包(30s · 现有 Luffa 流程)
  ↓
进入比赛列表(F1)
  ↓
选某场比赛 → 进单场详情(F2)
  ↓ 三个按钮:主队赢 / 平 / 客队赢
  ↓ 显示:其他用户分布(社会证明)+ 截止倒计时
  ↓
点「确认预测」(无金额输入框 · 无 stake 概念)
  ↓
成功 toast「预测已提交 · 比赛结束后 5 分钟内出结果」
  ↓
返回 Hero 页 · 看到「我的预测」tab 多了一条
```

**关键设计点**:
- 不要让用户「确认押多少 EDS」 —— 预测本身就是入场券,EDS 按命中 + 排名分发
- 预测分布(60% 押主队)是「社会证明」而非「赔率」,文案严格区分
- 截止时间 = 开赛前 5 分钟(给数据源稳定)

### 4.2 Flow B · 比赛结束 → 结算 → EDS 到账(自动 · 30 分钟内)

```
比赛终场哨(T0)
  ↓
T0 + 0 - 5 min:Ken 后端 cron 每分钟拉 SofaScore + API-Football
  ↓
任一源返回 final 状态 → 进入对账队列
  ↓
T0 + 5 - 10 min:三源对账(SofaScore + API-Football + ESPN)
  ↓ 一致 → 直接结算
  ↓ 2:1 多数 → 取多数 + 标记 `review_pending` · 仍发放
  ↓ 全不一致 → 推迟到次日 12:00 强制运营 review
  ↓
T0 + 10 min:结算引擎跑分(预测命中表 + 排名乘数)
  ↓
T0 + 15 min:EDS 发放(走 Luffa 现有 EDS pipeline)
  ↓
T0 + 15 - 20 min:F5 排行榜实时刷新
  ↓
T0 + 20 - 30 min:F8 SA 推送「结果出炉 + 你赢了 X EDS」
```

**SLA 硬指标**:
- 结算正确率(用户视角)≥ 98% / D5 · ≥ 99.5% / 7 天观察期末
- 结算延迟均值 < 15 min / D5 · < 5 min / 7 天观察期末
- EDS 发放成功率 = 100%(失败必须重试 + alert)

### 4.3 Flow C · 开群挑战(K-factor 主引擎)

```
用户 A 在群里点「邀请群友一起预测」
  ↓
生成专属邀请链接(带 referrer_id + group_id)
  ↓
群友点链接 → 进入 Luffa Predict(若未注册,创建 Luffa 钱包)
  ↓
自动加入 group_id 对应的群组挑战
  ↓
触发条件:群组成员 ≥ 10 人 → 参与群组排行榜
  ↓
A 邀请满 5 友 → 即时获得 500 EDS + 群主皮肤(头像挂件)
  ↓
每周一群组周排行榜 Top 3:5000 / 2500 / 1000 EDS
```

**反作弊**:
- 新邀请用户必须独立设备指纹 + 独立手机号
- 单 A 邀请人上限:5000 EDS / 周(防作弊农场)
- 群组成员 24h 内活跃预测 < 30% → 群组奖励降权

### 4.4 Flow D · KOL 战绩页(品牌资产)

```
T5 给 KOL 开通战绩页权限(灰度名单)
  ↓
系统在 Luffa 内为该 KOL 自动生成 SuperBox URL · 如 /predict/kol/{kol_id}
  ↓
战绩页展示:
  - KOL 头像 + 名称 + 粉丝数
  - 累计预测数 / 命中率 / 当前排名 / EDS 余额
  - 「跟随 KOL 一键预测」(KOL 当日预测列表,可一键复用)
  - 历史比赛战绩(最近 20 场)
  - 分享按钮(X / TG / IG · 自动生成多语种海报)
  ↓
KOL 把链接放 X / TG bio · 粉丝点进来直接进 Luffa
```

**关键**:
- 战绩页是 KOL 的「公开品牌资产」,KOL 自己不能改数据(可信度)
- 海报由 AI Coach 自动生成(中 + 英 + 西 + 葡)
- D4 至少 1 位 KOL 灰度试用 → D5 推广 3-5 位 → W2 末铺到 10+ 位

### 4.5 Flow E · 客服 / 异常 ticket(运营路径)

```
用户客服:「我赢了为什么没到账?」
  ↓
客服后台查询用户预测 ID
  ↓ 状态 = settled + EDS_sent → 引导用户查钱包
  ↓ 状态 = review_pending → 「您预测的比赛结果三方数据源对账中,12h 内出结果」
  ↓ 状态 = settled + EDS_failed → 触发后端重试 + 4h 内必到
  ↓
SLA:4h 内首次响应 · 24h 内闭环
```

---

## 5. 信息架构 + 页面清单

### 5.1 Luffa Predict SuperBox 页面树

```
Luffa Predict(SuperBox 主入口)
├── P1 · Hero 首页 ────────────── 今日 3 场关键 + 排行榜 Top 10 + 我的预测入口
│
├── P2 · 比赛列表(F1)──────────── 当日 / 本周 / 已结束 tab + 时区切换
│   └── P2.1 · 比赛详情(F2)──── 三选项预测 + 用户分布 + 倒计时
│
├── P3 · 我的预测 ──────────────── 已提交 / 待结算 / 已结算 tab
│   └── P3.1 · 单条预测详情 ─── 命中? + EDS 奖励 + 分享按钮
│
├── P4 · 排行榜(F5)───────────── 全网榜 / 群组榜 / 好友榜 tab
│   └── P4.1 · 用户公开战绩页 ── 任意用户的预测历史 + 命中率
│
├── P5 · 群组挑战(F6)──────────── 我的群组列表 + 邀请按钮 + 群组排名
│   └── P5.1 · 单群组排行榜 ──── 成员列表 + 本周积分 + 邀请链接
│
├── P6 · KOL 战绩页(F7)────────── 仅限 KOL 灰度名单(URL 直达)
│
└── P7 · 帮助 / FAQ ──────────────── 法律分类说明 + 结算规则 + 客服入口
```

### 5.2 入口位置(Luffa 主端集成)

| 入口 | 位置 | 6/15 上线状态 |
|---|---|---|
| **SuperBox 主面板** | 默认 pin 在第一屏 | ✅ 6/15 启用 |
| **IM 卡片消息** | 群里发的「赛后战绩晒图」可点击进入 | ✅ 6/15 启用(模板) |
| **Luffa World Cup HQ SA** | 推送内卡片 | ✅ 6/15 启用 |
| **KOL SuperBox** | 战绩页独立 URL | ✅ 6/15 启用(灰度) |
| **深链(Polymind)** | Polymind 内放「试试 Luffa Predict」入口 | ⚠ 6/15-6/21 期间不放 · 等数据 GREEN |

---

## 6. 数据模型(后端必须 D1 锁定)

> Ken 在 D1 必须完成,后续两天全部代码依赖这个 schema。

### 6.1 核心表(最小集合)

```sql
-- 比赛主表
matches
  match_id            PK
  external_ids        JSON   -- {sofascore: ..., api_football: ..., espn: ...}
  competition         VARCHAR -- 'FIFA_WC_2026'
  home_team / away_team
  kickoff_at          TIMESTAMP
  status              ENUM   -- scheduled / live / final / postponed / cancelled
  result              JSON   -- {home_score, away_score, outcome: home/draw/away}
  result_sources      JSON   -- {sofascore: {...}, api_football: {...}, espn: {...}}
  reconciled_at       TIMESTAMP
  reconciliation      ENUM   -- consensus / majority / conflict
  
-- 用户预测表
predictions
  prediction_id       PK
  user_id             FK     -- Luffa 现有用户体系
  match_id            FK
  predicted_outcome   ENUM   -- home / draw / away
  group_id            FK NULL -- 若群组挑战
  referrer_id         FK NULL -- 邀请人
  device_fingerprint  VARCHAR -- 反作弊 L2
  ip_country          VARCHAR -- 反作弊 L2 + geo-fence
  created_at          TIMESTAMP
  locked_at           TIMESTAMP -- 开赛前 5 分钟
  status              ENUM   -- pending / settled / review / cancelled
  is_hit              BOOLEAN NULL
  
-- 结算日志表(审计 · 不可删)
settlements
  settlement_id       PK
  match_id            FK
  predictions_total   INT
  predictions_hit     INT
  eds_distributed     DECIMAL
  reconciliation      ENUM
  triggered_at        TIMESTAMP
  completed_at        TIMESTAMP
  raw_sources_dump    JSON  -- 完整三源数据快照 · 法务 / 审计 / 复盘用
  
-- EDS 发放表(对账)
eds_grants
  grant_id            PK
  user_id             FK
  prediction_id       FK NULL  -- 来源(命中)
  group_id            FK NULL  -- 来源(群组排名)
  referrer_id         FK NULL  -- 来源(邀请)
  amount              DECIMAL
  reason              ENUM    -- hit / rank_bonus / invite_bonus / group_weekly / kol
  anti_cheat_score    DECIMAL -- 反作弊计算结果
  status              ENUM    -- pending / sent / failed / clawback
  external_tx_id      VARCHAR -- Luffa EDS pipeline 回执
  granted_at          TIMESTAMP

-- 群组表
groups
  group_id            PK
  owner_user_id       FK
  name                VARCHAR
  created_at          TIMESTAMP
  member_count        INT
  
-- 排行榜物化视图(每 5 分钟刷新)
leaderboards_global / leaderboards_group / leaderboards_kol
```

### 6.2 关键字段规则

| 字段 | 规则 | 反作弊 / 法律意义 |
|---|---|---|
| `predicted_outcome` | 只接受三值枚举 | 不存在「金额」字段 = 法律分类清晰 |
| `device_fingerprint` | 必须存储 | L2 反作弊核心 |
| `ip_country` | 必须存储 | geo-fence + 法律取证 |
| `external_ids` | 必须存全三源 ID | 出问题可追溯到原始数据 |
| `raw_sources_dump` | 必须保留 90 天 | 法务 / 审计 / 用户纠纷复盘 |
| `anti_cheat_score` | 每笔发放前计算 | EDS 发放可审计 |

### 6.3 不存什么(法律红线)

- ❌ 不存 stake / wager / odds 字段
- ❌ 不存 payout / win_amount(改为 `reward_amount`)
- ❌ 不存任何「赔率」相关数值
- ❌ 不展示「期望值 EV」「投注回报率」

---

## 7. 业务规则(可直接转代码 case)

### 7.1 结算规则(F3 多源对账)

```
def reconcile(match_id):
    sources = [sofascore, api_football, espn]
    final_results = []
    
    for src in sources:
        r = src.fetch_final(match_id, timeout=10s, retry=3)
        if r and r.status == 'final':
            final_results.append((src.name, r.outcome))
    
    # 规则 1:三源一致 → consensus
    if len(set(r.outcome for r in final_results)) == 1 and len(final_results) >= 2:
        return ('consensus', final_results[0].outcome)
    
    # 规则 2:三源中 2:1 → majority + 标记 review
    if len(final_results) == 3:
        from collections import Counter
        counts = Counter(r.outcome for r in final_results)
        most_common, n = counts.most_common(1)[0]
        if n == 2:
            return ('majority', most_common, flag='review_pending')
    
    # 规则 3:全不一致 OR 仅 1 源 → 延迟到次日 12:00
    return ('conflict', None, defer_until='next_day_12:00')
```

**SLA**:
- T0+5min 触发首轮拉取
- T0+10min 完成对账,90% 进入 consensus / majority
- conflict 必须运营 24h 内人工 review
- 任一冲突 ≥ 5 场 / 天 → P1 alert 通知 Ken

### 7.2 EDS 分发规则(F4)

```
基础 EDS = 命中 × 比赛权重
比赛权重 = 1.0 (小组赛) / 1.5 (淘汰赛) / 2.0 (决赛)

排名乘数(反作弊 L3):
  Top 10% 用户:5.0×
  Top 10-50%:1.0×
  Bottom 50%:0.5×

最终 EDS = 基础 EDS × 排名乘数 × anti_cheat_score

约束:
  单账号日 EDS ≤ 200(L3 反作弊)
  单账号周 EDS ≤ 1000
  超出 → 累计到下周(不丢失)
```

### 7.3 反作弊规则(L1+L3 集成 · MVP 范围)

| Layer | MVP 实现 | D3 上线 |
|---|---|---|
| **L1 账号成熟度** | Luffa 账号 ≥ 7 天 + 至少 1 个非系统群 | ✅ MUST |
| **L2 设备/IP 指纹** | 记录但不强校验(W2 加强) | ⚠ 仅记录 |
| **L3 EDS 日上限 + 排名乘数** | 200 EDS / 日 + 5x/1x/0.5x | ✅ MUST |
| **L4 社交图加权** | 真实好友互动 × 2 / 孤狼 × 0.3 | ⏳ W2 |
| **L5 决赛前 30% 池保留** | 决赛日才用,本期不实现 | ⏳ W3+ |

**熔断**(Ken 单独可拍板,不开会):
- 结算正确率单日 < 95% → 暂停 EDS 发放 + 当日所有结算延迟
- 多源对账冲突 > 50% → 暂停自动结算 + 切人工

### 7.4 灰度开关(D3 必出)

```
config.luffa_predict_enabled:
  - global_default: false  # 6/15 前默认关
  - whitelist_users: [50 位种子 user_id]  # D4 灰度
  - whitelist_groups: [3 个种子群]
  - rollout_percentage: 0  # 6/15 起逐步 0 → 100
  
config.luffa_predict_features:
  - F1, F2, F3, F4: required  # 不可单独关
  - F5: can_disable  # 排行榜可单独熔断
  - F6: can_disable  # 群组挑战可单独熔断
  - F7: can_disable  # KOL 战绩可单独熔断
  - F8: can_disable  # SA 推送可单独熔断
```

**5 分钟内可回滚**:任一开关触发 → 默认入口切回 Polymind + 维护页。

---

## 8. 集成边界(与 Luffa 主端 / Polymind / 体育 API)

### 8.1 复用 Luffa 现有能力

| 系统 | 用法 | 谁负责对接 |
|---|---|---|
| 用户 / 钱包(0 KYC) | 直接调 Luffa user_service | Ken |
| EDS 发放 pipeline | 调 Luffa eds_service.grant() | Ken |
| IM + 群组 | 用 Luffa group_service 创建 / 查询 | Ken |
| SA 推送 | 调 Luffa sa_service 模板 push | Ken + T10 站内 |
| 反作弊基础设施 | 复用 Luffa antifraud 已有的 L1 / L2 | Ken |
| AI Coach(F7 战绩页生成) | 调 Luffa ai_coach API + 模板 | Roger |

### 8.2 新建独立微服务

```
luffa-predict-service(独立服务 · 复用 Luffa 微服务 stack)
├── matches/        ── 比赛拉取 + 多源对账(F3)
├── predictions/    ── 用户预测增删查 + 锁定(F2)
├── settlements/    ── 结算引擎 + EDS 调用(F4)
├── leaderboards/   ── 排行榜物化视图刷新(F5)
├── groups/         ── 群组挑战逻辑(F6)
├── kol/            ── KOL 战绩页(F7)
└── webhooks/       ── SA 推送钩子(F8)
```

**为什么独立**:出问题不影响 Polymind / Luffa 主端;灰度开关粒度更细;6/22 RED 回滚干净。

### 8.3 与体育数据 API

| 源 | 优先级 | SLA | 月费 | 备注 |
|---|---|---|---|---|
| SofaScore | 主源 | 5 min 内 final | $0(免费层) | 拉美球迷视角全面 |
| API-Football | 副源 | 5-10 min | $50-100 | 欧洲赛事强 |
| ESPN | 校验源 | 10-15 min | $0(公开 endpoint) | 权威 |

**降级**:任一源宕机 > 30 分钟 → 切换为剩余两源对账 + alert · 不停产品。

---

## 9. 上线门槛 + 7 天观察期数据 Gate

### 9.1 D5(6/15)上线前最后 checklist

| # | 检查项 | 通过标准 | 责任人 |
|---|---|---|---|
| 1 | 50 位种子内测 D4(6/14) | 首次预测完成率 ≥ 80% | T5 |
| 2 | 结算正确率(D4 内测样本) | ≥ 98% | Ken |
| 3 | P0 bug | = 0 | Ken + Roger |
| 4 | 法务 sign-off | ✅ 完成 | Vivienna |
| 5 | 灰度开关 / rollback SOP | ✅ 演练过 1 次 | Ken |
| 6 | 多源 API 状态 | 三源连续 24h 健康 | Ken |
| 7 | EDS pipeline 端到端 | D4 至少 100 笔成功 | Ken |
| 8 | 客服 SOP + FAQ | ✅ 中英西三语 | T3 + T5 |

**任一不达 → 推迟 24h 到 6/16。**

### 9.2 7 天观察期 KPI(细化版,对齐 06 文档 §4.2)

| # | 指标 | 6/15 D5 | 6/17 W1 末 | 6/21 7 天末 | 备注 |
|---|---|---|---|---|---|
| O1 | 新用户首次预测完成率 | ≥ 70% | ≥ 75% | ≥ 80% | 衡量 onboarding |
| O2 | 结算正确率(用户无投诉) | 100% | ≥ 99% | ≥ 99.5% | 法律风险底线 |
| O3 | 结算延迟均值(分钟) | < 15 | < 10 | < 5 | 体验底线 |
| O4 | EDS 发放成功率 | 100% | 100% | 100% | pipeline 稳定性 |
| O5 | 用户客服投诉数(累计) | 0 | ≤ 5 | ≤ 15 | 信任建立 |
| O6 | 系统宕机分钟数 | 0 | ≤ 10 | ≤ 30 | 工程质量 |
| O7 | D1 留存(灰度 + 自然) | ≥ 40% | ≥ 40% | ≥ 45% | 产品力 |
| O8 | D3 留存 | — | ≥ 30% | ≥ 32% | 长期 |

### 9.3 6/22 Gate 决议

| 状态 | 触发 | 决议 |
|---|---|---|
| ✅ GREEN | 8 项全部达标 OR ≥ 7 项 | 大推广启动(详 04 文档 W2)|
| 🟡 YELLOW | 5-6 项 | 延迟 1 周 · 修 RED 项 · 6/29 二次评估 |
| 🔴 RED | ≤ 4 项 OR O2 < 95% | **静默回滚** · Polymind 标签恢复 · Luffa Predict 标 beta |

---

## 10. 风险登记 + 开放问题

### 10.1 已识别风险

| 风险 | 等级 | 应对 | Owner |
|---|---|---|---|
| 5 天 ship 不出 | 🔴 高 | D3 review · 砍 F5-F8 留 F1-F4 | Vivienna |
| 多源 API 数据延迟 / 错误 | 🟡 中 | 三方对账 + 24h 人工 review · 极端切单源 + 标记延迟 | Ken |
| 与 Polymind 用户体验割裂 | 🟡 中 | 6/11-14 Polymind 维持 · 6/15 静默切 · 老用户路径仍通 | Roger |
| 法律质疑(自研 = 博彩?)| 🔴 高 | 法务 sign-off + play-money 第一原则 + 数据库无 stake 字段 | Vivienna |
| Polymind 团队反对 | 🟡 中 | 定位为「Luffa SuperBox 模板示范」 · 后续可整合 | Vivienna |
| 反作弊 L1+L3 不够 | 🟡 中 | EDS 日上限硬卡 + 熔断机制 · W2 补 L4 | Ken |
| KOL 战绩页 AI 生成失败 | 🟢 低 | 降级到手工模板 · 不影响 MVP | Roger |
| 7 天观察期内部「忍不住宣传」 | 🟡 中 | 04 文档 §4.1 纪律明文 · Vivienna 当 enforcer | Vivienna |

### 10.2 D0 启动会前需要 Vivienna 拍板的开放问题

| # | 问题 | 我的建议 |
|---|---|---|
| Q1 | 「平」选项是否做?(F2) | **做**。SofaScore / API-Football 都有平局数据;砍掉等于让足球预测失真 |
| Q2 | 6/15 上线时,Polymind 老用户的入金 / EDS 余额怎么迁移? | **不迁移 · 同账户互通**。同 Luffa user_id,EDS 余额在 user_service 共用,不需要迁移逻辑 |
| Q3 | 50 位灰度种子从哪里来? | **从 Luffa 欧洲 Top 500 老用户 + 内部员工 + Polymind 现有 30 位活跃用户**中筛 |
| Q4 | KOL 战绩页 D4 灰度 1 位是谁? | **建议从 02 文档 §3.2 S 档已 outreach 的拉美 KOL 中选 1 位最先签约的** |
| Q5 | 西班牙地区 D5 是否同步上线? | **同步上线**。但文案 P1 多审 · 监控前 24h 反馈,有问题 IP 临时屏蔽 |
| Q6 | 7 天观察期内 KOL 主动问「能不能推」怎么答? | **统一口径**:「Luffa Predict 在灰度内测,你的战绩页已生成,粉丝可以来玩,但我们 6/22 后才正式推广」 |

### 10.3 留给 W2 / W3 的明确路线图

| 时间 | 功能 | 触发条件 |
|---|---|---|
| W2(6/22-)| 比分预测(F10)· 反作弊 L4 · 群组私房自定义玩法 v1 | 6/22 GREEN |
| W3(6/28)| Bracket Challenge(F9 · 20K EDS 大奖池) | 6/22 GREEN + 工程余量 |
| W3+(6/28+)| LuffaPay 真金升级(F11) | Chainlink Oracle 升级 + 法务 sign-off · 任一不达 → 砍掉真金 |
| W5(7/14)| 决赛日特别直播 + 颁奖典礼 SBT | W4 末团队评估 |

---

## 11. 给工程的「明天 D1 第一件事」

### Ken(D1 必做 · 21:00 前交付)

1. SofaScore + API-Football API key 申请(09:30 启动会前可以同步发出)
2. 数据库 schema(本 PRD §6.1)落地到迁移文件
3. luffa-predict-service skeleton + 接 Luffa user / wallet / EDS pipeline
4. 多源对账逻辑设计文档(本 PRD §7.1)
5. SofaScore API 拉取脚本 + cron(6/11 比赛结果可入库)

### Roger(D1 必做 · 21:00 前交付)

1. SuperBox 主框架 + Hero 页(P1)+ 占位数据可渲染
2. Polymind 后台手动 settle 入口 SOP 文档(撑 6/11-6/14)
3. 与 Ken 对齐 F1 / F2 接口 schema(明天 D2 直接干)

### Vivienna(D1 必做)

1. 法务 sign-off 拿到(本 PRD §1.2 红线)
2. 50 位灰度种子名单初稿(从 Top 500 + 员工 + Polymind 30 活跃)
3. KOL 战绩页 D4 灰度 1 位人选确认

---

## 附录 A · 文案 / 复制资产红线(给 T3)

### A.1 安全词汇

| ✅ 必用 | ❌ 禁用 |
|---|---|
| predict / pick | bet / wager |
| EDS reward / 奖励 | payout / 赔付 |
| outcome / 结果 | odds / 赔率 |
| free predict | sportsbook |
| Predict for free. Earn EDS rewards. | prediction market(对外)|
| Operated within a group holding HK SFC licenses | SFC-licensed / regulated by SFC |
| Luffa Predict(SuperBox)| Luffa betting / gaming |

### A.2 多语种核心句

| 语言 | 核心句 |
|---|---|
| 中文 | 「免费预测,赢真金 EDS。」 |
| English | 「Predict for free. Earn for real.」 |
| Español | 「Predice gratis. Gana EDS reales.」 |
| Português | 「Preveja grátis. Ganhe EDS real.」 |

### A.3 上线时静态说明页(P7)必含

1. 「Luffa Predict 是什么」(一段话)
2. 「它和 Polymarket 有什么不同」(法律分类对比)
3. 「EDS 怎么发」(规则 §7.2)
4. 「我赢了为什么还没到账」(SLA + 客服入口)
5. 「我哪些地区不能玩」(geo-fence 列表)

---

— 文档完 —

*Luffa Predict · MVP 产品需求文档 · v1.0 · 2026 年 6 月 10 日晚*
*下一步:D0 启动会评审本文档 → 工程拆 D1 任务 → 6/11 09:30 第一次 standup*
