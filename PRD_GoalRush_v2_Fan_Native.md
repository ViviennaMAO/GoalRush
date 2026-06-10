# GoalRush · Fan-Native PRD v2.0

> 版本:v2.0 · 日期:**2026-06-11** · 开赛日
> 状态:**v1 MVP 已 ship · v2 是「从预测器走向球迷社群」的产品升级**
> 关联:[PRD_Luffa_Predict_MVP.md (v1)](PRD_Luffa_Predict_MVP.md) · [04 30天执行手册](../../LUFFA/PR/6月10日-分阶段GTM战略/04.Luffa_世界杯30天执行手册_3-5人紧迫版.md) · [02 产品功能匹配](../../LUFFA/PR/6月10日-分阶段GTM战略/02.Luffa_世界杯专题_产品功能匹配与独立分析.md) · [1 竞品分析](../../LUFFA/PR/预测市场PR/1.Luffa_World_Cup_竞品分析与战略定位.docx)

---

## 0. TL;DR(一页读完)

### 0.1 v1 → v2 的核心转变

| 维度 | v1 MVP(已 ship) | v2 Fan-Native(本 PRD)|
|---|---|---|
| **产品自我定位** | 「预测器 + 加点社交」 | **「球迷社群 + 加点预测玩法」** |
| **主战场** | 赛前押注 · 赛后结算 | **赛中 90 分钟 + 群组社交** |
| **EDS 奖励的语义** | 「猜对了得到」 | **「证明你比朋友懂球得到」** |
| **阵营(camp)** | 一次性选择 + 身份标签 | **半永久社群 + 实时士气 + 内部排名 + 跨营 PK** |
| **预测玩法** | 三选一(主/平/客) | **+ 比分 + 首球者 + 半场重押 + Bold Call 加倍** |
| **社交关系** | 关注 KOL | **+ 1v1 好友挑战 + 群组每场冠军 + Beat the KOL** |
| **核心情绪** | 命中的满足 | **共鸣 + 炫耀 + 归属** |
| **竞品象限** | 弱化版 Polymarket | **5 亿真球迷的唯一选择** |

### 0.2 一句话战略

> 让一个**怕被叫赌徒**、**想和朋友一起看球**、**想证明自己懂球**的真球迷,**在 90 分钟里不离开 GoalRush** —— 因为离开就等于离开了他的兄弟、他的阵营、他的庆祝时刻。

### 0.3 7 个 P0 功能(MUST · W2-W3 上线)

| # | 功能 | 一句话 | 估工 |
|---|---|---|---|
| F-P0-1 | **赛中实时聊天室 + 阵营色识别** | 球迷看球必须有「兄弟同看」感 | 5 天 |
| F-P0-2 | **GOAL! 全屏庆祝时刻** | 进球时多巴胺爆发 + 自动发到群里 | 2 天 |
| F-P0-3 | **半场重押**(60 秒 / 30 EDS) | 留住用户看完 90 分钟 · 续费钩子 | 3 天 |
| F-P0-4 | **进阶预测 + Bold Call 加倍** | 比分 / 首球者 + 押冷门 5× EDS | 4 天 |
| F-P0-5 | **1v1 好友挑战** | 输方在群发指定 sticker | 4 天 |
| F-P0-6 | **可分享胜利卡 + Beat the KOL 徽章** | 炫耀 = 最强传播驱动 | 3 天 |
| F-P0-7 | **群组每场冠军颁奖** | 群组每天有事可期待 | 2 天 |

**合计 23 工程日 · 2-3 人 1.5 周可吃完。**

### 0.4 与 GTM 时间线对齐

```
6/11 开赛 ─── v1 MVP 已上线(本 PRD 之前)
6/15 ────── Luffa Predict 静默上线(原 06 工程清单)
6/15-6/21 ── 7 天观察期 · 收集 v2 用户访谈反馈
6/22 GREEN ─ 大推广启动 + v2 P0 开发开工
6/22-7/5 ── 13 天工程窗口 · 7 个 P0 全部 ship
7/6-7/13 ── P1 功能补强 · 决赛前的最后冲刺
7/14 决赛 ── 赛末故事卡 + 颁奖典礼(P1 必备)
```

---

## 1. 用户重定义:5 亿真球迷的画像

### 1.1 主用户画像(P0 设计的锚点)

```
姓名: Pablo Sánchez
年龄: 32
居住: 马德里
身份: 巴萨 + 西班牙国家队死忠粉 · 软件工程师
家庭: 已婚 · 1 个 4 岁儿子
经济: 中产 · 但不会在博彩平台押真金白银
社群: 5 人微信群 / Telegram 群(从大学开始的兄弟群)

世界杯期间的行为:
- 休 5 天年假看重要比赛
- 每年和兄弟群「预测谁夺冠」(口头赌局 · 输方请客)
- 不去 bet365 因为「不想被老婆 / 同事 / 儿子知道我在赌博」
- 不去 Polymarket 因为「我没有 USDC,也不想学钱包」
- 主要使用 X / Telegram / WhatsApp 讨论球
- 跟随 3-4 位拉美足球 KOL(看战术分析)

Pablo 的内心独白:
「我看了 22 届世界杯,我懂球。我能预测得比 70% 的人准。
我想要的是和兄弟一起玩,赢了请喝一瓶啤酒,
输了承认我那场看走眼了。我不想要彩金,我想要尊重。」
```

### 1.2 三个被忽略但关键的次画像

| Persona | 描述 | 占比 | Pablo 之外的特殊需求 |
|---|---|---|---|
| **Maria · 阿根廷家庭主妇 · 38 岁** | 跟着丈夫看球 6 年 · 突然这届迷上自己 push | 15% | 想要简洁、低学习成本 · 进群组比独立预测重要 |
| **Diego · 巴西 19 岁大学生 · TikTok 重度** | 想分享给同学晒「我赢了」| 20% | 视觉炫耀 + 短视频集成 · 分享卡是核心 |
| **Camille · 法国财经记者 · 28 岁** | 严肃球迷 + 关注数据 | 10% | 进阶玩法 + 数据 dashboard · 拒绝「猜钱币」感 |

### 1.3 三个核心洞察(决定 v2 所有产品决策)

#### 洞察 1 · 预测 ≠ 押注 ≠ 博彩

| 词 | 用户内心 | EDS 发放语义 |
|---|---|---|
| **预测**(predict) | 「我用脑力赢」| 奖励 **判断力** |
| **押注**(bet) | 「我用钱赢」| ❌ bet365 干的事 |
| **博彩**(gamble) | 「我靠运气」| ❌ 不是球迷想要的 |

→ 产品语言 / EDS 算法 / 排行榜口径 全部统一到「judgment / 判断力」。Bold Call(押冷门加倍)、Beat the KOL(超越大 V)、进阶预测(比分 / 首球者)都是这个洞察的产物。

#### 洞察 2 · 「我在哪个阵营」比「我命中多少」更重要

v1 把阵营做成「选了就完事」 · v2 必须让阵营是身份 + 社群 + 情绪:

```
阵营的 4 层升级路径(v2):
1. 半永久身份(已有)
2. 阵营专属群(P1)
3. 阵营内排名(P1)
4. 跨阵营 PK · 跨阵营 KPI(P1)
```

#### 洞察 3 · 90 分钟是 GoalRush 最重要的 90 分钟

v1 的用户路径:**赛前押注 → 跳出看球 → 赛后回来结算** · 中间 90 分钟用户不在 app 里。

v2 必须**把主战场迁到比赛中**:

```
v1 路径:[ App ] → 跳出 → [电视看球] → 回来 [App] (用户脱离 70 分钟)
v2 路径:[ App + 电视双屏] · 用户 80 分钟在 App 里 ── 这是 90 分钟实时聊天室 + GOAL! moment + 半场重押 三件套的核心目标
```

---

## 2. 完整功能架构

### 2.1 按情感旅程组织(纵向)

```
                赛前 4h         赛中 90min        赛后 30min       长期 48 天
                  │                │                │                │
情绪              期待             共鸣             多巴胺          身份建设
                  │                │                │                │
对应模块         简报/海报      实时聊天/GOAL/      胜利卡/Beat       球迷称号
                 好友预测墙     半场重押/士气计     KOL徽章/群冠军    /段位/故事卡
                  │                │                │                │
v1 现状         🟡 海报半成      🔴 全空缺          🟡 后端有         🟢 部分有
                                                    前端无动画
                  │                │                │                │
v2 P0           简报卡(P1)     ① 实时聊天        ⑥ 胜利卡          段位赛(P1)
                好友墙(P1)     ② GOAL!           ⑥ Beat the KOL
                进阶预测(P0)   ③ 半场重押        ⑦ 群组冠军
                Bold Call(P0)  ④ Bold Call
                1v1 挑战(P0)    
```

### 2.2 按用户类型纵切

| 用户类型 | 最在乎什么 | v2 P0 服务 |
|---|---|---|
| **Pablo · 严肃球迷** | 判断力被认可 | 进阶预测 / Bold Call / Beat the KOL |
| **Maria · 跟队球迷** | 和家人在一起 | 实时聊天室 / GOAL! / 群组冠军 |
| **Diego · 炫耀 TikToker** | 发出去被看见 | 胜利卡 / Beat the KOL 徽章 |
| **Camille · 数据派** | 多维数据 + 进阶玩法 | 进阶预测 / 阵营士气计(P1) |
| **KOL** | 内容引流 + 收益 | KOL 战绩页 + Beat the KOL(反向引流) |

---

## 3. P0 功能详细规格

> 7 个 P0 功能,合计 23 工程日。每个功能含:用户故事 / 功能规格 / UI 设计 / 数据模型 / API / 验收标准 / 依赖。

---

### 3.1 F-P0-1 · 赛中实时聊天室 + 阵营色识别

#### 用户故事

> **作为** Pablo,**当** 西班牙 vs 巴西打到 60 分钟 1-1 时,**我希望** 看到所有西班牙营的兄弟在刷屏「VAMOS!」,**这样** 我感觉自己不是一个人在沙发上看球。

#### 功能规格

| 项 | 说明 |
|---|---|
| **入口** | 比赛详情页(match-detail) · 滑动到「实时讨论」section |
| **聊天室类型** | 每场比赛 1 个全网聊天室(public) · 用户阵营自动标记 |
| **消息类型** | 文字 · emoji · 预设反应(👍 🔥 😱 ⚽ ❤)· KOL 推文嵌入(可选) |
| **阵营识别** | 用户头像旁显示其支持球队的 flag · 西班牙营消息底色 #AA151B 微染色 · 阿根廷营 #75AADB 微染色 |
| **进入门槛** | 已登录用户即可进 · 未选阵营也能看,但发言强制要求选阵营 |
| **滚动行为** | 默认锁定在最新 · 用户上滑后停止自动滚动 · 显示「N 条新消息」红点 |
| **频率限制** | 单用户 10 秒内发 ≤ 3 条 · 防刷屏 |
| **反作弊** | 同 IP / 同设备多账号 → 自动 mute · KOL 标记蓝勾 |

#### UI / UX(对齐截图 3 emerald 风)

```
比赛详情页 ─ 实时讨论 section
┌─────────────────────────────────────────────┐
│  💬 Live discussion   60' · 12,840 watching │
├─────────────────────────────────────────────┤
│  🇪🇸 @valencia_fan  · 西班牙营 · 1m ago     │
│     VAMOS! 西班牙加油!!!                    │  ← 西班牙营 · 红色微染色
│                                              │
│  🇧🇷 @samba_predicts · 巴西营 · 50s ago     │  ← 巴西营 · 黄色微染色
│     这球罚得真烂...                          │
│                                              │
│  🇪🇸 @LucasBR_Fut [KOL] · 30s ago           │  ← KOL 蓝勾
│     西班牙的高位逼抢见效了                    │
│                                              │
│  🇪🇸 @TigerEagle_1234 · 西班牙营 · 10s ago   │
│     [👍] [🔥] [😱] [⚽] [❤]                  │  ← 快速反应
│                                              │
├─────────────────────────────────────────────┤
│  [输入框] Cheer for your team...     [Send] │
│  [👍][🔥][😱][⚽][❤][📤 分享]                │
└─────────────────────────────────────────────┘
```

#### 数据模型

```sql
match_chat_rooms
  room_id           PK
  match_id          FK
  status            ENUM  -- scheduled / live / closed
  opened_at         TIMESTAMP
  closed_at         TIMESTAMP
  total_messages    INT
  peak_concurrent   INT

chat_messages
  message_id        PK
  room_id           FK
  user_id           FK
  user_camp         VARCHAR  -- 'ESP' | 'BRA' | null
  content           TEXT
  reaction_type     ENUM NULL  -- 👍 🔥 😱 ⚽ ❤
  created_at        TIMESTAMP
  is_kol            BOOLEAN
  is_muted          BOOLEAN
```

#### API

```
GET  /api/match/:id/chat        ─ 拉取最近 50 条
POST /api/match/:id/chat        ─ 发消息
WS   /api/match/:id/chat/live   ─ WebSocket 订阅实时推送
POST /api/match/:id/chat/react  ─ 快速反应
```

#### 工程估时

- 后端 WebSocket gateway + Redis pub/sub:**2 天**
- 前端聊天 UI + 阵营染色 + 反应栏:**2 天**
- 反作弊 + 频率限制 + 灰度:**1 天**
- **合计 5 天**

#### 验收标准

- [ ] 单场聊天室 ≥ 500 并发用户无延迟(message 到达 ≤ 1s)
- [ ] 阵营色识别正确率 100%
- [ ] 频率限制生效(11 秒内第 4 条消息被拒)
- [ ] KOL 蓝勾正确显示
- [ ] 离场后再回来可看到滚动期间的消息

#### 依赖

- 后端 WebSocket 基础设施(Luffa 现有 IM 可复用)
- Redis pub/sub
- 灰度开关(可单独熔断)

---

### 3.2 F-P0-2 · GOAL! 全屏庆祝时刻

#### 用户故事

> **作为** Pablo,**当** 西班牙刚刚进球的瞬间,**我希望** GoalRush 立刻全屏 confetti + 巨大「GOAL!」字样 + 自动把这一刻发到我的群组,**这样** 我感觉这个进球的喜悦被放大了 10 倍,而且我兄弟群秒知。

#### 功能规格

| 项 | 说明 |
|---|---|
| **触发** | 后端对账三源任一返回新进球事件(SofaScore 优先 · 5 秒内推送)|
| **触发条件** | 仅当用户阵营 = 进球方时(西班牙营 + 西班牙进球 = 触发)|
| **持续时间** | 3 秒全屏(可设置中划取消)|
| **视觉** | (a) 全屏 confetti 颗粒动画 (b) 中心大字「GOAL!」(c) 球队色背景脉冲 (d) 进球球员名(如有)(e) 比分变化动画 |
| **声音** | 短促欢呼声(用户可设置静音)|
| **群组联动** | 用户已加入群组 → 全屏结束后弹出「分享到群组?」一键发送庆祝卡 |
| **统计** | 用户每场可触发的 GOAL moment 数被记录(进入「我的本届时刻」)|

#### UI / UX

```
全屏 confetti 模式 ───────────────────────────
                                                          
                       ╭─────────╮                        
                       │ GOAL!   │  ← Bebas Neue 200rpx
                       ╰─────────╯                        
                       Spain 1-0                          
                                                          
                       Pedri · 62'                        
                                                          
                       [分享到群组]  [关闭]                 
                                                          
   confetti 颗粒持续 3 秒                                  
   背景:西班牙国旗渐变脉冲                                
─────────────────────────────────────────────────────────
```

#### 数据模型

```sql
goal_events
  event_id          PK
  match_id          FK
  team_code         VARCHAR  -- 'ESP'
  minute            INT
  scorer_name       VARCHAR NULL
  goal_type         ENUM  -- normal / penalty / own_goal
  detected_at       TIMESTAMP
  source            VARCHAR  -- 'sofascore'

user_moments  ── 用户触发的 GOAL moment 记录
  moment_id         PK
  user_id           FK
  goal_event_id     FK
  triggered_at      TIMESTAMP
  shared_to_group   BOOLEAN
  shared_group_id   FK NULL
```

#### API

```
WS   /api/match/:id/events/live   ─ 订阅 goal 事件
POST /api/moment/:id/share        ─ 分享到群组
```

#### 工程估时

- 后端 SofaScore goal 事件 polling 升级到 5s 频率 + WS 推送:**0.5 天**
- 前端 confetti 动画 + 全屏 layer + 球员名:**1 天**
- 群组分享卡 generator(复用 poster.js 资产):**0.5 天**
- **合计 2 天**

#### 验收标准

- [ ] 进球后 10 秒内全屏触发(SofaScore SLA 5s + 推送延迟 5s)
- [ ] 仅本方进球触发(对方进球不打扰)
- [ ] confetti 动画 60fps 流畅
- [ ] 一键分享到群组成功率 100%

#### 依赖

- 后端 goal event polling(SofaScore live API)
- WebSocket(同 3.1)
- Canvas confetti 库(可直接用 canvas-confetti npm)

---

### 3.3 F-P0-3 · 半场重押(60 秒微预测 / 30 EDS)

#### 用户故事

> **作为** Pablo,**当** 上半场 0-0 比较闷,**我希望** 半场休息时 GoalRush 弹一个「下半场 1-0 / 1-1 / 2-1 ?」60 秒微预测,**这样** 我有理由继续看 + 群里有新话题 + 命中再得 30 EDS。

#### 功能规格

| 项 | 说明 |
|---|---|
| **触发** | 比赛第 45+ 分钟结束 · 半场状态识别(从 SofaScore status = 'halftime')|
| **窗口** | 半场休息 15 分钟内开放 · 用户有 60 秒决定 |
| **预测内容** | 下半场比分(简化版:0-0 / 1-0 / 1-1 / 2-1 / 其他) |
| **EDS 奖励** | 命中得 30 EDS(单押)· 推荐用户的群组同押 → +10 EDS / 人 |
| **不重押** | 上半场未押过 → 不开放半场重押(防止半场押大) |
| **互动** | 押完后弹「你押 1-1 · 你 3 位群友也押了相同结果」社交反馈 |

#### UI / UX

```
半场弹窗 ─────────────────────────────────────────
┌──────────────────────────────────────────────┐
│  HALFTIME · ESP 0 : 0 BRA                    │
│                                               │
│  下半场比分预测 · 60s · +30 EDS               │
│  ━━━━━━━━━━━━━━ 59s                          │
│                                               │
│  ┌─────┐  ┌─────┐  ┌─────┐                  │
│  │ 0-0 │  │ 1-0 │  │ 1-1 │                  │
│  └─────┘  └─────┘  └─────┘                  │
│  ┌─────┐  ┌─────┐                            │
│  │ 2-1 │  │ 其他 │                            │
│  └─────┘  └─────┘                            │
│                                               │
│  你的群友 4/7 选了 1-1                       │
│                                               │
│  [跳过]                              [确认] │
└──────────────────────────────────────────────┘
```

#### 数据模型

```sql
halftime_predictions
  prediction_id     PK
  user_id           FK
  match_id          FK
  pick              ENUM  -- '0-0' / '1-0' / '1-1' / '2-1' / 'other'
  decided_in_ms     INT   -- 决定耗时(运营 metric)
  group_id          FK NULL  -- 若同押群组
  eds_awarded       INT   -- 命中后填
  status            ENUM  -- pending / hit / miss
  created_at        TIMESTAMP
```

#### API

```
GET  /api/match/:id/halftime/window  ─ 检查是否开放
POST /api/match/:id/halftime/pick    ─ 提交预测
GET  /api/match/:id/halftime/social  ─ 拿你群友的同押数据
```

#### 工程估时

- 后端 halftime 状态识别 + 窗口管理:**0.5 天**
- 前端弹窗 + 60s 倒计时 + 5 选项 UI:**1.5 天**
- 群友同押社交反馈 + EDS 发放 hook:**1 天**
- **合计 3 天**

#### 验收标准

- [ ] 半场结束 30 秒内弹窗(SLA)
- [ ] 60 秒到点自动锁定
- [ ] 一旦上半场未押 → 不开放(防套利)
- [ ] 命中后 EDS 在赛后 5 分钟内到账(走 v1 settlement pipeline)
- [ ] 群友同押社交反馈正确显示

#### 依赖

- v1 settlement engine(已有)
- 上半场 prediction 存在性检查(v1 数据模型已有)

---

### 3.4 F-P0-4 · 进阶预测 + Bold Call 加倍

#### 用户故事

> **作为** Pablo,**当** 我看到「西班牙 vs 巴西」三选一让我感到「这太简单了 · 体现不出我懂球」,**我希望** 能选「比分 1-0」或「Pedri 首球」,而且如果我押冷门 → 命中 EDS × 5,**这样** 我能用我对足球的理解证明我比朋友懂球。

#### 功能规格

| 项 | 说明 |
|---|---|
| **进阶玩法 1**:**比分预测** | 在三选一基础上 + 选具体比分(0-0 / 1-0 / 1-1 / 2-0 / 2-1 / 2-2 / 3+ 其他)· 命中比分 EDS × 3 |
| **进阶玩法 2**:**首球者** | 选「谁先进球」(从主队 / 客队 / 不进球 三选)· 命中 + 50 EDS · 不影响主预测 |
| **进阶玩法 3**:**红黄牌** | 选「全场红卡数」(0 / 1 / 2+)· 命中 + 20 EDS |
| **Bold Call 加倍** | 任何预测 + 选「Bold」开关 → 风险翻倍(命中 EDS × 5,不中 0)· 仅当玩家分布 < 25% 选项可用 |
| **可见性** | 普通玩家界面只看到三选一 · 「Show advanced」展开 |
| **限制** | 单场比赛 ≤ 1 个进阶预测 + 1 个 Bold Call(防止滥用) |

#### UI / UX

```
比赛预测页 · 主区
┌──────────────────────────────────────────────┐
│  Your pick                                    │
│                                               │
│  [🇪🇸 ESP wins]  [Draw]  [🇧🇷 BRA wins]      │ ← 三选一(已有)
│   42%             24%      34%                │
│                                               │
│  ───── Bold Call ─────                       │
│  □ 押冷门 · 命中 × 5                          │ ← Bold 开关
│                                               │
│  ── Advanced (optional) ──                   │ ← 进阶折叠
│  比分: 1-0 / 1-1 / 2-1 / ...                  │
│  首球: ESP / BRA / 无                          │
│  红黄牌: 0 / 1 / 2+                            │
└──────────────────────────────────────────────┘
```

#### 数据模型

```sql
predictions ── 扩展 v1 表
  prediction_id     PK
  user_id           FK
  match_id          FK
  predicted_outcome ENUM  -- home / draw / away(主预测,v1 已有)
  is_bold           BOOLEAN  -- 新增 · Bold Call 加倍
  bold_multiplier   DECIMAL(3,2)  -- 5.00(命中)/ 0(不中)
  status            ENUM  -- pending / settled

advanced_predictions  ── 新表
  pred_id           PK
  user_id           FK
  match_id          FK
  type              ENUM  -- score / first_scorer / cards
  pick              VARCHAR  -- '1-0' / 'ESP' / '2+'
  eds_potential     INT
  status            ENUM
  is_hit            BOOLEAN NULL
  settled_at        TIMESTAMP NULL
```

#### Bold Call 判定逻辑

```python
def is_bold_eligible(prediction, distribution):
    # 用户选的项分布 < 25%(冷门)
    return distribution[prediction.pick] < 25

def calculate_eds(prediction, is_hit):
    base = 100 * weight * rank_multiplier
    if prediction.is_bold:
        return (base * 5) if is_hit else 0
    return base if is_hit else 0
```

#### API

```
POST /api/predictions       ─ 扩展现有 endpoint · 支持 is_bold + advanced
GET  /api/match/:id/advanced  ─ 列出本场可用的进阶玩法 + 当前分布
```

#### 工程估时

- 数据模型扩展 + migration:**0.5 天**
- 后端进阶预测结算逻辑(三类各异):**2 天**
- 前端进阶折叠 + Bold 开关 + 限制 UI:**1.5 天**
- **合计 4 天**

#### 验收标准

- [ ] 比分预测命中 EDS × 3 正确发放
- [ ] Bold Call 仅当分布 < 25% 可勾选
- [ ] 用户一场比赛进阶预测 ≤ 1 个 + Bold ≤ 1 个
- [ ] 不影响 v1 三选一主预测的现有流程
- [ ] 进阶预测的 EDS 单独计入排行榜 metric「judgment_score」(为洞察 1 服务)

#### 依赖

- v1 prediction model + settlement engine(扩展)
- v1 分布数据(已有 mock,真实需 polling)

---

### 3.5 F-P0-5 · 1v1 好友挑战

#### 用户故事

> **作为** Pablo,**当** 我和兄弟 @Diego 互相不服「你押的根本不行」,**我希望** 我能在 GoalRush 里直接发起「**1v1**:这场你押 ARG,我押 ESP,输的请喝啤酒 + 在群里发指定 sticker」,**这样** 我们的玩法不只是「各自预测」,而是「直接较量」。

#### 功能规格

| 项 | 说明 |
|---|---|
| **入口** | 比赛详情页 · 「与好友挑战」按钮 |
| **发起方式** | 选好友(从 Luffa contact 列表) + 选自己的押 + 自定义罚则(可选)|
| **接受方式** | 好友 IM 收到挑战消息卡 · 必须在开赛前 5 分钟接受 |
| **押法** | 必须押**不同**结果(防止双方都赢)· 系统强制 |
| **罚则** | 输方在挑战群组里发指定 sticker / 文案 · 自动定时器 |
| **奖励** | 赢方得 50 EDS(从 1v1 池)+ 「Beat a Friend」徽章 |
| **历史** | 个人战绩页显示「1v1 胜率」 · 「Pablo 击败你 12 / 输给你 7」|
| **公开度** | 挑战结果在群组里公开 · 不公开到全网(保护朋友隐私)|

#### UI / UX

```
比赛详情页 · 1v1 入口
┌──────────────────────────────────────────────┐
│  ⚔ Challenge a friend                        │
│  Pick different sides · loser sends sticker  │
│                                               │
│  [Choose your friend]                        │
└──────────────────────────────────────────────┘

挑战卡(IM 内)─────────────────────────────────
┌──────────────────────────────────────────────┐
│  Pablo wants to challenge you                 │
│                                               │
│  ⚔ ESP vs BRA · Tomorrow 18:00                │
│                                               │
│  Pablo picks: 🇪🇸 ESP wins                    │
│  You pick:    🇧🇷 BRA wins / Draw             │
│                                               │
│  Loser sends [sticker.png] to group           │
│                                               │
│  [Accept] [Decline]                          │
└──────────────────────────────────────────────┘
```

#### 数据模型

```sql
duels
  duel_id           PK
  initiator_id      FK
  challenger_id     FK NULL  -- 接受前 null
  match_id          FK
  initiator_pick    ENUM
  challenger_pick   ENUM NULL
  forfeit_payload   JSON  -- {type: 'sticker', sticker_url: '...', group_id: 'g001'}
  status            ENUM  -- pending / accepted / declined / settled
  winner_id         FK NULL
  settled_at        TIMESTAMP NULL
  created_at        TIMESTAMP
```

#### API

```
POST /api/duel/create               ─ 发起挑战
POST /api/duel/:id/accept           ─ 接受
POST /api/duel/:id/decline          ─ 拒绝
GET  /api/duel/history/:user_id     ─ 个人战绩
```

#### 工程估时

- 数据模型 + migration:**0.5 天**
- 后端挑战逻辑(发起 / 接受 / 结算):**1.5 天**
- 前端发起页 + IM 挑战卡(Luffa share API):**1 天**
- 个人战绩 1v1 区:**1 天**
- **合计 4 天**

#### 验收标准

- [ ] 必须押不同结果(系统拒绝相同押)
- [ ] 接受窗口 = 开赛前 5 分钟(同 v1 锁定时间)
- [ ] 输方在自定义群组的 sticker 发送通过 Luffa share API 自动触发
- [ ] 个人战绩页正确累积 1v1 胜率
- [ ] 比赛取消 → 挑战自动作废 · EDS 不扣

#### 依赖

- Luffa share API(已有 `share` methodName)
- Luffa contact 列表(需 `contacts` methodName · 可能需协商)
- v1 prediction model

---

### 3.6 F-P0-6 · 可分享胜利卡 + Beat the KOL 徽章

#### 用户故事

> **作为** Diego(19 岁巴西大学生),**当** 我押对了「BRA 2-1 ARG · 巴西胜」 + 而 @LucasBR_Fut KOL 押错了,**我希望** GoalRush 立刻给我生成一张「我比 Lucas KOL 厉害」的炫耀卡,**这样** 我能马上发到 TikTok / Instagram / 群里炫耀。

#### 功能规格

| 项 | 说明 |
|---|---|
| **触发** | 比赛结算后 30 秒内 · 自动生成 + 推送到「我的本届时刻」 |
| **卡片类型 A**:**普通胜利卡** | 任何命中预测都生成 · 9:16 + 1:1 两版 |
| **卡片类型 B**:**Beat the KOL 徽章卡** | 你命中 + KOL 该场押错 → 解锁特殊徽章卡(对比版式)|
| **卡片类型 C**:**Bold Call 命中卡** | 你用 Bold Call 押冷门命中 → 「× 5 EDS」突出展示 |
| **卡片类型 D**:**1v1 胜利卡** | 1v1 挑战赢了 → 显示「击败 @friend」+ 应用罚则结果 |
| **设计** | 复用 web 端 poster.js · 移植到小程序(Canvas API 兼容)|
| **多语种** | 6 语种(EN / ES / PT / DE / FR / 繁中)|
| **分享** | 一键下载 PNG + Luffa share API 分享到群组 |

#### UI / UX

```
胜利卡(类型 B:Beat the KOL · 1:1)──────────────
┌──────────────────────────────────────────────┐
│ GOALRUSH                          MATCHDAY    │
│                                               │
│      I beat @LucasBR_Fut today                │
│      ─────────────────────────                │
│                                               │
│        🇪🇸 ESP   1 - 0   🇧🇷 BRA              │
│                                               │
│      ✓ My pick: ESP wins  ─ HIT               │
│      ✗ Lucas:   BRA wins  ─ MISS              │
│                                               │
│              + 150 EDS earned                 │
│                                               │
│      goalrush.app · Powered by Luffa          │
└──────────────────────────────────────────────┘
```

#### 数据模型

```sql
victory_cards
  card_id           PK
  user_id           FK
  prediction_id     FK
  card_type         ENUM  -- standard / beat_kol / bold_call / duel
  template          ENUM  -- 'square_1080' / 'reel_1080x1920'
  data              JSON  -- 卡片所需数据(KOL id / 对比 / EDS 等)
  generated_at      TIMESTAMP
  shared_count      INT
```

#### API

```
GET  /api/card/auto/:prediction_id  ─ 拿到自动生成卡片
GET  /api/card/render?id=...&lang=... ─ Canvas 实时渲染
POST /api/card/share                 ─ 记录 share event
```

#### 工程估时

- 后端结算后自动触发胜利卡 + Beat the KOL 逻辑识别:**1 天**
- 前端 Canvas 卡片 4 种 template(复用 web poster):**1.5 天**
- Luffa share API 集成 + 分享统计埋点:**0.5 天**
- **合计 3 天**

#### 验收标准

- [ ] 命中预测 30 秒内推送卡片到「我的本届时刻」
- [ ] Beat the KOL 仅在 KOL 该场押错时触发(系统校验)
- [ ] 6 语种卡片正确渲染
- [ ] 一键分享到 Luffa 群组成功率 100%

#### 依赖

- v1 settlement engine 结算事件
- 6 语种 i18n 字典(已有)
- 小程序 Canvas API(WeChat-compatible)
- KOL 数据(知道 KOL 本场押了什么)

---

### 3.7 F-P0-7 · 群组每场冠军 + 颁奖

#### 用户故事

> **作为** Maria,**当** 西班牙 vs 巴西比赛结束,**我希望** 我的家庭群组 30 秒内自动颁出「本场 MVP」奖给押对又最早决定的成员,而且全员可领 50 EDS,**这样** 我的群组每场比赛都有期待感 · 我儿子也愿意每场都来玩。

#### 功能规格

| 项 | 说明 |
|---|---|
| **触发** | 比赛结算完成后 30 秒内 · 群组内自动计算 |
| **MVP 定义** | 群组内**命中** + **最早决定**(decided_in_ms 最小)+ **Bold Call 加分** |
| **奖励** | MVP 得 100 EDS + 「Group MVP」徽章 · 群组其他命中者各得 30 EDS · 未命中者得 10 EDS(安慰)|
| **通知** | Luffa IM 群组里自动推一张「Group MVP Card」 · 显示 MVP 头像 + 球队 + 命中数据 |
| **历史** | 群组主页累积每场 MVP 列表 · 「赛季最佳预测者」周榜 + 整赛榜 |
| **多群组** | 用户在多个群组 → 各群独立计算 MVP(可能多群同时赢)|

#### UI / UX

```
群组内 Luffa IM 自动推送 ───────────────────────
┌──────────────────────────────────────────────┐
│  🏆 Group MVP · ESP 1-0 BRA                  │
│                                               │
│       [Avatar]                                │
│       @pablo_madrid                           │
│                                               │
│       Picked: ESP wins · Bold Call · ×5       │
│       Decided in: 47 seconds                  │
│       + 500 EDS                               │
│                                               │
│       Other hits: 4 / 7 members               │
│                                               │
│       [View group board]                     │
└──────────────────────────────────────────────┘
```

#### 数据模型

```sql
group_match_results
  result_id         PK
  group_id          FK
  match_id          FK
  mvp_user_id       FK NULL  -- 可能无人命中
  total_members     INT
  hit_count         INT
  miss_count        INT
  eds_distributed   INT
  awarded_at        TIMESTAMP
```

#### API

```
POST /api/group/:id/match-result   ─ 触发计算(cron + manual)
GET  /api/group/:id/mvp-history    ─ 群组 MVP 历史
```

#### 工程估时

- 后端 MVP 算法 + EDS 分发:**1 天**
- Luffa IM 群组卡片推送(走 Luffa share API)+ 群组榜 UI:**1 天**
- **合计 2 天**

#### 验收标准

- [ ] 结算后 30 秒内群组卡片推送到 Luffa IM
- [ ] 同点(命中 + 时间)算法:谁先押谁赢
- [ ] 群组 < 5 人 → 不评 MVP(防退化)
- [ ] EDS 分发遵守 v1 反作弊上限(200/日 / 1000/周)

#### 依赖

- v1 group 数据模型(已有)
- v1 settlement engine
- Luffa share / group API

---

## 4. P1 功能规格(W3+ · 决赛前必上)

> 7 个 P1 功能,合计 18 工程日。每个简化版规格(可直接转 ticket)。

### 4.1 阵营士气计 + 阵营内排行榜

- **士气计**:实时聚合该阵营当日预测命中率 + 信心指数(自己球队赢的押注 %)
- **阵营内排行榜**:阵营内 Top 100 球迷,与全网榜并列
- **跨阵营 PK**:每场比赛对应双方阵营 KPI(命中率 + 总 EDS + 群组数)对比显示
- **估时**:3 天

### 4.2 赛前 3 分钟简报卡

- 每天 09:00 自动推送「今日必看 N 场」卡片
- 内含:焦点 1 场 + 数据看点 + KOL 共识(嵌入 X)
- 6 语种自动翻译(沿用 i18n)
- **估时**:3 天(含内容运营 SOP)

### 4.3 赛后 2 小时聊天室持续

- 比赛结束后聊天室不立即关
- 持续 2 小时 · 高赞评论置顶 · KOL 复盘自动 pin
- 鼓励「酒吧延续」 + 长尾留存
- **估时**:1 天(基于 P0-1 扩展)

### 4.4 Believer 信仰者奖章 + 段位赛

- **Believer 奖章**:从开赛到决赛持续支持同一球队 → 解锁「忠诚信仰者」+ 200 EDS
- **段位赛**:小组赛 = 青铜 / 16 强 = 铂金 / 决赛 = 钻石 · 段位是「球迷专业度」勋章
- **估时**:2 天

### 4.5 赛末故事卡(Spotify Wrapped for Football)

- 决赛后自动生成你这 48 天的:总预测 / 命中率 / 最神操作 / EDS / 支持球队 / 群组 MVP 数
- 1 张分享卡 · 6 语种 · 可直接发 TikTok / X
- **估时**:3 天

### 4.6 跟随 KOL 30 天战绩对比

- 用户点开关注的 KOL 战绩页 · 系统计算「跟随他」的过去 30 天收益 vs「我自己押」收益
- 信任建立 · 鼓励长期跟随
- **估时**:2 天

### 4.7 加油海报一键生成接入小程序

- 已有的 web poster.js 移植到小程序 Canvas
- 4 模板 × 6 语种(已有)+ Luffa share API 集成
- **估时**:4 天

---

## 5. P2 功能(决赛后或下届评估)

| # | 功能 | 留到何时 |
|---|---|---|
| 5.1 赛前一键扫盲(球队历史 / 球星 / 战绩) | 等签约 KOL 后做内容产线 |
| 5.2 微反应弹幕(角球 / 红牌时滑动反应) | P0 数据出来再加 |
| 5.3 群组同步观赛 + 在线状态 | 复杂度高 · 8 月评估 |
| 5.4 逆转加注 / Comeback 预测 | 玩法多反分散 |
| 5.5 匿名模式 / SafeMode | 边角需求 |
| 5.6 球员 props(Top Scorer / Golden Glove) | 下届世界杯 / 大型赛事 |

---

## 6. 数据模型扩展总览(v1 → v2 新增)

```
v1 已有(不动)
─────────────────
matches / predictions / settlements / eds_grants / groups / users

v2 新增(7 张表)
─────────────────
match_chat_rooms          ── F-P0-1
chat_messages             ── F-P0-1
goal_events               ── F-P0-2
user_moments              ── F-P0-2
halftime_predictions      ── F-P0-3
advanced_predictions      ── F-P0-4
duels                     ── F-P0-5
victory_cards             ── F-P0-6
group_match_results       ── F-P0-7

v1 表扩展
─────────────────
predictions  + is_bold + bold_multiplier
users        + camp_confidence_score(P1)
groups       + match_mvp_count(P1)
```

---

## 7. 法律红线维持(v1 → v2 不变)

| 红线 | v2 验证 |
|---|---|
| 无 stake / bet / odds / payout / wager / sportsbook 字眼 | ✅ 全 P0 / P1 功能文案 review |
| 无金额输入框 | ✅ Bold Call「× 5」是倍数不是金额 |
| 玩家分布 ≠ 赔率 | ✅ 进阶预测页继续标「不构成赔率」|
| play-money + utility token reward | ✅ 半场重押 / 1v1 / 群组 MVP 全部 EDS 单一货币 |
| Operated within a group holding HK SFC licenses | ✅ 全页脚 footer 显示 |
| Geo-fence(美国零售 / 中国大陆 / 部分欧盟) | ✅ 不变 |
| 1v1 罚则(发 sticker)≠ 真金赌局 | ✅ 罚则限定为 sticker / 文案,不可设置真金 |

---

## 8. 工程节奏(W2-W3 P0 + W3-W4 P1)

### 8.1 P0 · 13 天工程窗口(6/22 GREEN 后 → 7/5)

```
Week 1(6/22-6/28):前 3 个 P0(13 工程日累)
─────────────────────────────────────
D1-D5: F-P0-1 实时聊天室
D6-D7: F-P0-2 GOAL! moment
D8-D10: F-P0-3 半场重押
↓
6/28 16 强首战:F-P0-1 + F-P0-2 上线灰度

Week 2(6/29-7/5):后 4 个 P0(10 工程日累)
─────────────────────────────────────
D11-D14: F-P0-4 进阶预测 + Bold Call
D15-D18: F-P0-5 1v1 好友挑战
D19-D21: F-P0-6 胜利卡 + Beat the KOL
D22-D23: F-P0-7 群组 MVP
↓
7/5 8 强首战:全 P0 上线 + W4 大推广
```

### 8.2 团队配置

- **Ken 后端 + AI Coach** · 主负责 F-P0-1 / 2 / 3 / 7 后端
- **Roger 前端 + SuperBox** · 主负责 F-P0-1 / 2 / 4 / 6 前端
- **外部短期 1 人**(可选)· 主负责 F-P0-5 / 6 加速

### 8.3 P1 · W3-W4(7/6-7/13)

```
D24-D26: 阵营士气计 + 排行榜
D27-D29: 赛前简报卡
D30:    赛后 2h 聊天室持续
D31-D32: Believer 奖章 + 段位
D33-D35: 赛末故事卡
D36-D37: 跟随 KOL 30 天对比
D38-D41: 加油海报小程序移植
```

---

## 9. KPI 更新(v2)

### 9.1 现有 KPI(v1 沿用)

- 累计注册 / DAU / D7 留存 / K-factor / EDS 池实发 / LuffaPay 转化

### 9.2 v2 新增 KPI(围绕「球迷社群」)

| # | 指标 | W3 目标 | W4 目标 |
|---|---|---|---|
| V1 | **比赛中聊天室 DAU** | ≥ 30% MAU | ≥ 45% MAU |
| V2 | **平均观赛时长**(在 app 中)| ≥ 25 min/场 | ≥ 45 min/场 |
| V3 | **GOAL! moment 触发率** | ≥ 60% 进球被触发 | ≥ 85% |
| V4 | **半场重押接受率** | ≥ 25% 用户 | ≥ 40% |
| V5 | **Bold Call 比例**(占主预测的 %)| ≥ 8% | ≥ 15% |
| V6 | **1v1 挑战发起数** | ≥ 100/天 | ≥ 500/天 |
| V7 | **群组 MVP 发出数** | ≥ 200/天 | ≥ 1,000/天 |
| V8 | **胜利卡分享数** | ≥ 30/天 | ≥ 200/天 |
| V9 | **「judgment_score」分发** | EDS 通过 Bold Call / 进阶 / Beat KOL ≥ 25% | ≥ 40% |

### 9.3 取舍

- **v1 KPI 优先级降**:看 DAU 之类(不变)
- **v2 KPI 优先级升**:V1-V4 是「球迷 vs 预测器」的判别指标 · V5-V9 是「judgment vs gamble」的判别指标
- 任何 KPI 达不到 → 退到 P0 单独 review(不要整体 RED)

---

## 10. 风险与开放问题

### 10.1 已识别风险

| 风险 | 等级 | 应对 | Owner |
|---|---|---|---|
| WebSocket 基础设施压力(F-P0-1)| 🔴 高 | 复用 Luffa IM gateway · 灰度 100 → 500 → 全量 | Ken |
| SofaScore 进球事件延迟 > 30s(F-P0-2)| 🟡 中 | 双源 polling(SofaScore + API-Football)| Ken |
| 半场重押作弊(用户故意上半场押错以保留下半场窗口)| 🟡 中 | 上半场未押 → 半场重押不开放 + 反作弊分析单账号行为 | Ken |
| Bold Call 滥用(KOL 操纵分布制造 Bold 机会)| 🟡 中 | 单场限 1 个 + Bold 命中也走反作弊 L3 排名乘数 | Ken |
| 1v1 挑战的罚则法律风险 | 🟡 中 | 限定 sticker / 文案 · 禁真金 / 服务 · 法务 sign-off | Vivienna |
| 群组 MVP 反映「群主作弊」(自己设置假群)| 🟡 中 | 群组 < 5 人不评 + 反作弊 L2 设备指纹去重 | Ken |

### 10.2 给 Vivienna 拍板的开放问题

| # | 问题 | 我的建议 |
|---|---|---|
| Q1 | 1v1 挑战需要 Luffa contact 列表 API · 与 Luffa 团队需协商扩 SDK | 先用 group_id 替代 · 群内挑战即可 |
| Q2 | 阵营染色(F-P0-1)是否会让对方阵营球迷不开心? | 染色仅在自己阵营消息的左侧色条,不染全消息 |
| Q3 | GOAL! moment 是否对对方阵营也播放?(降级版,无 confetti 但有提示)| 不,对方阵营球迷不应被打扰 |
| Q4 | 半场重押的 EDS 来源 · 走主 EDS 池还是新建专项池? | 走主池 · 已计入 v1 反作弊日上限 |
| Q5 | 胜利卡 / Beat KOL 卡片的 KOL 名字使用是否需要 KOL 同意? | 命中是事实陈述 · 不构成 endorsement · 法务 review |

---

## 11. 与 v1 的差异总表(给团队对照用)

| 维度 | v1 MVP | v2 Fan-Native |
|---|---|---|
| **核心功能数** | 8 个 MUST(F1-F8) | + 7 个 P0(F-P0-1 到 F-P0-7)= 15 个 |
| **预测玩法** | 三选一(home/draw/away) | + 比分 + 首球者 + 红黄牌 + Bold Call + 半场重押 |
| **社交关系** | 跟随 KOL + 群组挑战 | + 1v1 好友 + 群组 MVP + 实时聊天 + Beat KOL |
| **实时性** | 仅赛前 + 赛后 | + 赛中 90 分钟实时(聊天 / GOAL / 半场重押) |
| **EDS 发放语义** | 命中(运气感) | + judgment 加权(Bold Call × 5 / Beat KOL / 进阶)|
| **群组功能** | 邀友 5 = 500 EDS(已有) | + 每场 MVP 颁奖 + 群组 MVP 历史 |
| **阵营功能** | 选择 + 标签(已有)| + 实时士气(P1)+ 内部排名(P1)+ 跨营 PK(P1) |
| **数据表** | 6 张 v1 表 | + 9 张 v2 表 |
| **工程总量** | 5 天 MVP + 5 天迭代 | + 13 天 P0 + 18 天 P1 = 31 天 |
| **法律分类** | play-money + utility token | ✅ 不变 |

---

## 12. 给 Vivienna 的两段话

### 12.1 为什么必须做 v2

v1 已经能让 GoalRush 上线、让用户预测、让 EDS 真金到账。这是底线。但 v1 让 GoalRush 站在「弱化版 Polymarket」的位置 —— 同样三选一 · 同样命中 · 同样发奖。这违反了**[1.Luffa_World_Cup_竞品分析与战略定位.docx](../../LUFFA/PR/预测市场PR/1.Luffa_World_Cup_竞品分析与战略定位.docx)** 里识别的核心机会:**5 亿真球迷的右下空白象限**。

v2 的 7 个 P0 把 GoalRush 推到「球迷社群 + 加点预测玩法」 —— 这是 Polymarket / bet365 / FIFA Fantasy / Myriad 都做不到的位置。**实时聊天室 / GOAL! moment / 半场重押 / Bold Call / 1v1 挑战 / 胜利卡 / 群组 MVP** 这 7 件事,任何一家竞品做不齐两件。这是 Luffa 利用「IM 原生 + 钱包 + 多语言全球分发」三个独占资产唯一能开发的产品形态。

### 12.2 风险与机会

最大风险:**13 天工程窗口能否吃完 23 工程日 P0 + 18 工程日 P1**。我的判断:**能 · 但只能** —— 工程组配置必须 2-3 人全职,任一阻塞需 Vivienna 当场拍板。

最大机会:**v2 P0 完成 + 决赛日推广**(F-P1-5 赛末故事卡 + F-P0-6 胜利卡疯传)= **病毒传播窗口**。一个赛末「Spotify Wrapped for World Cup 2026」卡 + 一个「我比 Lucas KOL 厉害」卡,**就是 Luffa 拉美 + 西班牙市场的引爆点**。

---

— 文档完 —

*GoalRush · Fan-Native PRD v2.0 · 2026 年 6 月 11 日(开赛日)*
*下一步:Vivienna 拍板 5 个开放问题(§10.2)· Ken / Roger 评估 P0 工程拆解 · 6/22 GREEN 后正式开工*
