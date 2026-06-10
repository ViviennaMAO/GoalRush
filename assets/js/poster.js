// Luffa Predict — Canvas 海报生成引擎
// 4 个模板:KOL 战绩 / 赛前预测 / 赛后战报 / TikTok·Reel(9:16)

const POSTER_I18N = {
 en: {
 brand: 'GOALRUSH', tagline: 'Predict for free. Earn for real.',
 hit_rate: 'Hit Rate', eds_earned: 'EDS Earned', rank: 'Rank', wins: 'Wins', streak: 'Streak',
 pred_for: 'I pick', win: 'wins', draw: 'Draw',
 vs: 'VS', kickoff: 'Kickoff', final: 'FT',
 kol_sub: 'Free World Cup predictions · Follow the KOL',
 pre_sub: 'Who do you pick? Free predict. Win real EDS.',
 res_sub: 'Match settled · EDS sent on-chain',
 reel_cta: 'Free to play · Real rewards · Zero entry',
 download: 'Download Luffa · Claim EDS',
 settled: '✓ Settled via 3-source reconcile',
 },
 es: {
 brand: 'GOALRUSH', tagline: 'Predice gratis. Gana de verdad.',
 hit_rate: 'Acierto', eds_earned: 'EDS Ganados', rank: 'Posición', wins: 'Victorias', streak: 'Racha',
 pred_for: 'Yo apuesto a', win: 'gana', draw: 'Empate',
 vs: 'VS', kickoff: 'Inicio', final: 'Final',
 kol_sub: 'Predicciones gratis del Mundial · Sigue al KOL',
 pre_sub: '¿Por quién apuestas? Gratis. Gana EDS reales.',
 res_sub: 'Partido finalizado · EDS enviados on-chain',
 reel_cta: 'Gratis · Premios reales · Sin barreras',
 download: 'Descarga Luffa · Reclama EDS',
 settled: '✓ Liquidado · 3 fuentes',
 },
 pt: {
 brand: 'GOALRUSH', tagline: 'Preveja grátis. Ganhe de verdade.',
 hit_rate: 'Acertos', eds_earned: 'EDS Ganhos', rank: 'Posição', wins: 'Vitórias', streak: 'Sequência',
 pred_for: 'Eu aposto em', win: 'vence', draw: 'Empate',
 vs: 'VS', kickoff: 'Início', final: 'Final',
 kol_sub: 'Palpites grátis da Copa · Siga o KOL',
 pre_sub: 'Em quem você aposta? Grátis. Ganhe EDS real.',
 res_sub: 'Jogo finalizado · EDS enviado on-chain',
 reel_cta: 'Grátis · Prêmios reais · Sem barreiras',
 download: 'Baixe Luffa · Receba EDS',
 settled: '✓ Liquidado · 3 fontes',
 },
 de: {
 brand: 'GOALRUSH', tagline: 'Kostenlos tippen. Echt gewinnen.',
 hit_rate: 'Trefferquote', eds_earned: 'EDS gewonnen', rank: 'Rang', wins: 'Siege', streak: 'Serie',
 pred_for: 'Mein Tipp', win: 'gewinnt', draw: 'Unentsch.',
 vs: 'VS', kickoff: 'Anpfiff', final: 'Schluss',
 kol_sub: 'WM-Tipps gratis · Folge dem KOL',
 pre_sub: 'Wem traust du? Gratis tippen. Echte EDS gewinnen.',
 res_sub: 'Spiel beendet · EDS on-chain ausgezahlt',
 reel_cta: 'Gratis · echte Preise · keine Hürden',
 download: 'Luffa laden · EDS holen',
 settled: '✓ Per Drei-Quellen-Abgleich',
 },
 fr: {
 brand: 'GOALRUSH', tagline: 'Pronostique gratuit. Gagne pour de vrai.',
 hit_rate: 'Précision', eds_earned: 'EDS gagnés', rank: 'Rang', wins: 'Victoires', streak: 'Série',
 pred_for: 'Je pronostique', win: 'gagne', draw: 'Nul',
 vs: 'VS', kickoff: 'Coup d\'envoi', final: 'Fin',
 kol_sub: 'Pronos CM gratuits · Suis le KOL',
 pre_sub: 'Pour qui tu votes ? Gratuit. Gagne de vrais EDS.',
 res_sub: 'Match terminé · EDS envoyés on-chain',
 reel_cta: 'Gratuit · vraies récompenses · zéro barrière',
 download: 'Télécharger Luffa · Récupérer EDS',
 settled: '✓ Réglé par triple source',
 },
 'zh-Hant': {
 brand: 'GOALRUSH', tagline: '免費預測,真領 EDS。',
 hit_rate: '命中率', eds_earned: 'EDS 累計', rank: '排名', wins: '場勝', streak: '連勝',
 pred_for: '我押', win: '贏', draw: '平局',
 vs: 'VS', kickoff: '開賽時間', final: '終場',
 kol_sub: '世界盃免費預測 · 跟隨 KOL 一鍵玩',
 pre_sub: '你押誰?加入免費預測,贏真金 EDS',
 res_sub: '比賽結束 · EDS 已發放到鏈上錢包',
 reel_cta: '免費玩 · 真金獎勵 · 0 門檻',
 download: '下載 Luffa · 真領 EDS',
 settled: '✓ 三源對賬已結算',
 },
};

const PosterEngine = (function() {

 // ============ 颜色(GoalRush 调色)============
 const COLOR = {
 bg1: '#0a0e14',
 bg2: '#11161f',
 bg3: '#1d2538',
 ink: '#f0f6fc',
 ink2: '#95a5b8',
 ink3: '#5b6878',
 accent: '#5EEAD4',
 accent2: '#2DD4BF',
 gold: '#FFD54A',
 gold2: '#F0AB22',
 red: '#FF6B7D',
 };

 // ============ 通用绘制 ============
 function bg(ctx, W, H, withVignette = true) {
 // 主底色
 const g1 = ctx.createLinearGradient(0, 0, 0, H);
 g1.addColorStop(0, COLOR.bg2);
 g1.addColorStop(1, COLOR.bg1);
 ctx.fillStyle = g1;
 ctx.fillRect(0, 0, W, H);

 // 顶部绿色光晕
 const g2 = ctx.createRadialGradient(W * 0.5, -H * 0.1, 0, W * 0.5, -H * 0.1, W * 0.7);
 g2.addColorStop(0, 'rgba(0,255,136,.18)');
 g2.addColorStop(1, 'transparent');
 ctx.fillStyle = g2;
 ctx.fillRect(0, 0, W, H);

 // 右下金色光晕
 const g3 = ctx.createRadialGradient(W * 1.0, H * 1.0, 0, W * 1.0, H * 1.0, W * 0.6);
 g3.addColorStop(0, 'rgba(255,210,74,.12)');
 g3.addColorStop(1, 'transparent');
 ctx.fillStyle = g3;
 ctx.fillRect(0, 0, W, H);

 // Vignette
 if (withVignette) {
 const g4 = ctx.createRadialGradient(W/2, H/2, W*0.3, W/2, H/2, W*0.75);
 g4.addColorStop(0, 'transparent');
 g4.addColorStop(1, 'rgba(0,0,0,.3)');
 ctx.fillStyle = g4;
 ctx.fillRect(0, 0, W, H);
 }
 }

 function roundRect(ctx, x, y, w, h, r) {
 ctx.beginPath();
 ctx.moveTo(x + r, y);
 ctx.arcTo(x + w, y, x + w, y + h, r);
 ctx.arcTo(x + w, y + h, x, y + h, r);
 ctx.arcTo(x, y + h, x, y, r);
 ctx.arcTo(x, y, x + w, y, r);
 ctx.closePath();
 }

 function pill(ctx, x, y, w, h, fill, stroke) {
 roundRect(ctx, x, y, w, h, h/2);
 if (fill) { ctx.fillStyle = fill; ctx.fill(); }
 if (stroke) { ctx.strokeStyle = stroke; ctx.lineWidth = 2; ctx.stroke(); }
 }

 function header(ctx, W, t) {
 // logo mark
 const lx = 60, ly = 60, lw = 56, lh = 56;
 const g = ctx.createLinearGradient(lx, ly, lx + lw, ly + lh);
 g.addColorStop(0, COLOR.accent);
 g.addColorStop(1, COLOR.gold);
 roundRect(ctx, lx, ly, lw, lh, 14);
 ctx.fillStyle = g;
 ctx.fill();
 ctx.font = 'bold 36px Inter, system-ui';
 ctx.fillStyle = COLOR.bg1;
 ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
 ctx.fillText('G', lx + lw/2, ly + lh/2 + 2);

 // brand text
 ctx.textAlign = 'left'; ctx.textBaseline = 'middle';
 ctx.font = 'bold 28px Inter, system-ui';
 ctx.fillStyle = COLOR.ink;
 ctx.fillText('Goal', lx + lw + 16, ly + 18);
 ctx.font = 'bold 28px Inter, system-ui';
 ctx.fillStyle = COLOR.accent;
 ctx.fillText('Rush', lx + lw + 16 + ctx.measureText('Goal').width, ly + 18);

 ctx.font = '14px Inter, system-ui';
 ctx.fillStyle = COLOR.ink3;
 ctx.fillText(t.tagline, lx + lw + 16, ly + 44);

 // 顶部 LIVE pill
 const pillX = W - 60 - 140, pillY = 70;
 pill(ctx, pillX, pillY, 140, 36, 'rgba(0,255,136,.12)', 'rgba(0,255,136,.4)');
 ctx.fillStyle = COLOR.accent;
 ctx.beginPath(); ctx.arc(pillX + 18, pillY + 18, 5, 0, Math.PI*2); ctx.fill();
 ctx.font = 'bold 12px Inter, system-ui';
 ctx.textAlign = 'left'; ctx.textBaseline = 'middle';
 ctx.fillText('FIFA WC 2026', pillX + 32, pillY + 18);
 }

 function footer(ctx, W, H, url, t) {
 const fy = H - 100;
 ctx.font = 'bold 18px Inter, system-ui';
 ctx.fillStyle = COLOR.ink;
 ctx.textAlign = 'left'; ctx.textBaseline = 'middle';
 ctx.fillText(' ' + url, 60, fy);

 // CTA pill 右侧
 const ctaText = t.download;
 ctx.font = 'bold 18px Inter, system-ui';
 const ctaW = ctx.measureText(ctaText).width + 56;
 const ctaH = 52, ctaX = W - 60 - ctaW, ctaY = fy - ctaH/2;
 const g = ctx.createLinearGradient(ctaX, ctaY, ctaX + ctaW, ctaY + ctaH);
 g.addColorStop(0, COLOR.accent);
 g.addColorStop(1, COLOR.accent2);
 pill(ctx, ctaX, ctaY, ctaW, ctaH, g);
 ctx.fillStyle = COLOR.bg1;
 ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
 ctx.fillText(ctaText, ctaX + ctaW/2, ctaY + ctaH/2);
 }

 // ============ 模板 1 · KOL 战绩 ============
 function drawKol(ctx, W, H, opts) {
 const t = POSTER_I18N[opts.lang];
 const k = opts.kol || KOLS[0];
 bg(ctx, W, H);
 header(ctx, W, t);

 // KOL 头像 大圆
 const cx = W/2, cy = 380;
 const r = 90;
 const g = ctx.createLinearGradient(cx - r, cy - r, cx + r, cy + r);
 g.addColorStop(0, COLOR.accent);
 g.addColorStop(1, COLOR.gold);
 ctx.fillStyle = g;
 ctx.beginPath(); ctx.arc(cx, cy, r, 0, Math.PI*2); ctx.fill();
 // 旗帜
 ctx.font = '120px sans-serif';
 ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
 ctx.fillText(k.flag, cx, cy + 4);

 // 名字
 ctx.font = 'bold 60px Inter, system-ui';
 ctx.fillStyle = COLOR.ink;
 ctx.textAlign = 'center';
 ctx.fillText(k.name, cx, 530);
 // handle
 ctx.font = '24px JetBrains Mono, monospace';
 ctx.fillStyle = COLOR.accent;
 ctx.fillText(k.handle, cx, 568);
 // tier pill
 pill(ctx, cx - 68, 590, 136, 30, COLOR.gold);
 ctx.font = 'bold 12px Inter';
 ctx.fillStyle = COLOR.bg1;
 ctx.textBaseline = 'middle';
 ctx.fillText(`${k.tier} TIER KOL`, cx, 605);

 // 中央巨大命中率
 ctx.font = '24px Inter, system-ui';
 ctx.fillStyle = COLOR.ink3;
 ctx.fillText(t.hit_rate, cx, 690);
 ctx.font = 'bold 180px JetBrains Mono, monospace';
 const g2 = ctx.createLinearGradient(cx - 200, 700, cx + 200, 900);
 g2.addColorStop(0, COLOR.accent);
 g2.addColorStop(1, COLOR.gold);
 ctx.fillStyle = g2;
 ctx.fillText(k.stats.hit_rate + '%', cx, 820);

 // 三栏 stats
 const sy = 920;
 const cols = [
 { lbl: t.eds_earned, val: k.stats.eds_earned.toLocaleString(), color: COLOR.gold },
 { lbl: '#' + t.rank, val: '#' + k.stats.current_rank, color: COLOR.ink },
 { lbl: ' ' + t.streak, val: k.stats.streak, color: COLOR.accent },
 ];
 cols.forEach((c, i) => {
 const x = W * (0.18 + i * 0.32);
 ctx.font = '18px Inter, system-ui';
 ctx.fillStyle = COLOR.ink3;
 ctx.textAlign = 'center';
 ctx.fillText(c.lbl, x, sy);
 ctx.font = 'bold 56px JetBrains Mono, monospace';
 ctx.fillStyle = c.color;
 ctx.fillText(c.val, x, sy + 60);
 });

 // sub line
 ctx.font = '22px Inter, system-ui';
 ctx.fillStyle = COLOR.ink2;
 ctx.textAlign = 'center';
 ctx.fillText(opts.sub || t.kol_sub, cx, 1020);

 footer(ctx, W, H, opts.url, t);
 }

 // ============ 模板 2 · 赛前预测 ============
 function drawPrematch(ctx, W, H, opts) {
 const t = POSTER_I18N[opts.lang];
 const m = opts.match || MATCHES[0];
 const home = getTeam(m.home), away = getTeam(m.away);
 bg(ctx, W, H);
 header(ctx, W, t);

 // Competition
 ctx.font = 'bold 22px Inter, system-ui';
 ctx.fillStyle = COLOR.accent;
 ctx.textAlign = 'center';
 ctx.textBaseline = 'top';
 ctx.fillText(m.competition.toUpperCase(), W/2, 200);

 // 队伍 VS 大块
 const teamY = 320, flagSize = 220;
 // home
 ctx.font = `${flagSize}px sans-serif`;
 ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
 ctx.fillText(home.flag, W * 0.25, teamY);
 ctx.font = 'bold 64px Inter, system-ui';
 ctx.fillStyle = COLOR.ink;
 ctx.fillText(home.code, W * 0.25, teamY + 160);

 // away
 ctx.font = `${flagSize}px sans-serif`;
 ctx.fillText(away.flag, W * 0.75, teamY);
 ctx.font = 'bold 64px Inter, system-ui';
 ctx.fillStyle = COLOR.ink;
 ctx.fillText(away.code, W * 0.75, teamY + 160);

 // VS
 ctx.font = 'bold 80px Inter, system-ui';
 ctx.fillStyle = COLOR.gold;
 ctx.fillText(t.vs, W/2, teamY);

 // 玩家分布卡
 const distY = 580;
 ctx.font = '20px Inter, system-ui';
 ctx.fillStyle = COLOR.ink3;
 ctx.textAlign = 'center';
 ctx.fillText(' ' + (opts.lang === 'zh' ? '当前玩家分布' : 'Current pick distribution'), W/2, distY);

 // 三栏条形
 const barY = distY + 40, barW = W - 200, barH = 64;
 const segs = [
 { lbl: home.code, pct: m.distribution.home, color: COLOR.accent },
 { lbl: t.draw, pct: m.distribution.draw, color: COLOR.gold },
 { lbl: away.code, pct: m.distribution.away, color: COLOR.red },
 ];
 let xOff = 100;
 segs.forEach((s, i) => {
 const w = barW * (s.pct / 100);
 roundRect(ctx, xOff, barY, w, barH, 12);
 ctx.fillStyle = s.color;
 ctx.fill();
 ctx.font = 'bold 22px JetBrains Mono';
 ctx.fillStyle = COLOR.bg1;
 ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
 ctx.fillText(s.pct + '%', xOff + w/2, barY + barH/2);
 xOff += w;
 });
 // 三标签
 ctx.font = 'bold 18px Inter, system-ui';
 ctx.fillStyle = COLOR.ink;
 ctx.textAlign = 'center'; ctx.textBaseline = 'top';
 let lx = 100;
 segs.forEach(s => {
 const w = barW * (s.pct / 100);
 ctx.fillText(s.lbl, lx + w/2, barY + barH + 12);
 lx += w;
 });

 // 大标语
 ctx.font = 'bold 56px Inter, system-ui';
 ctx.fillStyle = COLOR.ink;
 ctx.textAlign = 'center';
 ctx.fillText(opts.sub || t.pre_sub, W/2, 820);

 // 时间
 ctx.font = '22px JetBrains Mono';
 ctx.fillStyle = COLOR.ink3;
 ctx.fillText('⏱ ' + formatKickoff(m.kickoff), W/2, 900);

 footer(ctx, W, H, opts.url, t);
 }

 // ============ 模板 3 · 赛后战报 ============
 function drawResult(ctx, W, H, opts) {
 const t = POSTER_I18N[opts.lang];
 const m = opts.match || MATCHES[0];
 const home = getTeam(m.home), away = getTeam(m.away);
 // 假比分(mock)
 const hScore = 2, aScore = 1;
 bg(ctx, W, H);
 header(ctx, W, t);

 ctx.font = 'bold 22px Inter, system-ui';
 ctx.fillStyle = COLOR.gold;
 ctx.textAlign = 'center'; ctx.textBaseline = 'top';
 ctx.fillText(t.final.toUpperCase() + ' · ' + m.competition.toUpperCase(), W/2, 200);

 // 比分大块
 const teamY = 380, flagSize = 180;
 ctx.font = `${flagSize}px sans-serif`;
 ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
 ctx.fillText(home.flag, W * 0.2, teamY);
 ctx.fillText(away.flag, W * 0.8, teamY);

 ctx.font = 'bold 200px JetBrains Mono';
 const winnerColor = hScore > aScore ? COLOR.accent : COLOR.ink;
 const loserColor = hScore > aScore ? COLOR.ink : COLOR.accent;
 ctx.fillStyle = winnerColor;
 ctx.fillText(hScore, W * 0.4, teamY + 20);
 ctx.fillStyle = COLOR.ink3;
 ctx.font = 'bold 80px Inter';
 ctx.fillText('-', W/2, teamY + 20);
 ctx.font = 'bold 200px JetBrains Mono';
 ctx.fillStyle = loserColor;
 ctx.fillText(aScore, W * 0.6, teamY + 20);

 ctx.font = 'bold 42px Inter, system-ui';
 ctx.fillStyle = COLOR.ink;
 ctx.fillText(home.code, W * 0.2, teamY + 160);
 ctx.fillText(away.code, W * 0.8, teamY + 160);

 // 结算说明
 ctx.font = 'bold 22px Inter, system-ui';
 ctx.fillStyle = COLOR.accent;
 ctx.fillText(t.settled, W/2, 700);

 // 大标语
 ctx.font = 'bold 50px Inter, system-ui';
 ctx.fillStyle = COLOR.ink;
 ctx.fillText(opts.sub || t.res_sub, W/2, 800);

 // 三块统计
 const sy = 920, mock_eds = '8.4K', mock_winners = '2,140', mock_acc = '99.7%';
 const cols = [
 { lbl: 'EDS', val: mock_eds, color: COLOR.gold },
 { lbl: t.wins, val: mock_winners, color: COLOR.accent },
 { lbl: '✓', val: mock_acc, color: COLOR.ink },
 ];
 cols.forEach((c, i) => {
 const x = W * (0.18 + i * 0.32);
 ctx.font = '18px Inter';
 ctx.fillStyle = COLOR.ink3;
 ctx.textAlign = 'center';
 ctx.fillText(c.lbl, x, sy);
 ctx.font = 'bold 54px JetBrains Mono';
 ctx.fillStyle = c.color;
 ctx.fillText(c.val, x, sy + 56);
 });

 footer(ctx, W, H, opts.url, t);
 }

 // ============ 模板 4 · TikTok / Reel(9:16)============
 function drawReel(ctx, W, H, opts) {
 const t = POSTER_I18N[opts.lang];
 const k = opts.kol || KOLS[0];
 const m = opts.match || MATCHES[0];
 const home = getTeam(m.home), away = getTeam(m.away);

 // 背景 - 竖版风格
 bg(ctx, W, H, false);
 // 额外加深下半 1/3
 const g = ctx.createLinearGradient(0, H * 0.55, 0, H);
 g.addColorStop(0, 'transparent');
 g.addColorStop(1, 'rgba(0,0,0,.5)');
 ctx.fillStyle = g;
 ctx.fillRect(0, H * 0.55, W, H * 0.45);

 // 顶部 brand
 ctx.font = 'bold 56px Inter, system-ui';
 ctx.fillStyle = COLOR.accent;
 ctx.textAlign = 'center'; ctx.textBaseline = 'top';
 ctx.fillText(' GOALRUSH', W/2, 80);

 ctx.font = '28px Inter';
 ctx.fillStyle = COLOR.ink3;
 ctx.fillText(t.tagline, W/2, 160);

 // 比赛 vs(if match)
 if (m) {
 ctx.font = 'bold 32px Inter';
 ctx.fillStyle = COLOR.gold;
 ctx.fillText(m.competition.toUpperCase(), W/2, 280);

 const ty = 480, fs = 280;
 ctx.font = `${fs}px sans-serif`;
 ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
 ctx.fillText(home.flag, W * 0.27, ty);
 ctx.fillText(away.flag, W * 0.73, ty);
 ctx.font = 'bold 72px Inter';
 ctx.fillStyle = COLOR.gold;
 ctx.fillText('VS', W/2, ty);
 ctx.font = 'bold 80px Inter';
 ctx.fillStyle = COLOR.ink;
 ctx.fillText(home.code, W * 0.27, ty + 230);
 ctx.fillText(away.code, W * 0.73, ty + 230);
 }

 // 中部大字
 ctx.font = 'bold 96px Inter, system-ui';
 ctx.fillStyle = COLOR.ink;
 ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
 const sub = opts.sub || t.pre_sub;
 // 分两行处理
 wrapText(ctx, sub, W/2, H * 0.65, W - 120, 110);

 // 巨大 CTA 区
 const ctaY = H - 360;
 const ctaH = 120, ctaW = W - 120, ctaX = 60;
 const cg = ctx.createLinearGradient(ctaX, ctaY, ctaX + ctaW, ctaY + ctaH);
 cg.addColorStop(0, COLOR.accent);
 cg.addColorStop(1, COLOR.accent2);
 pill(ctx, ctaX, ctaY, ctaW, ctaH, cg);
 ctx.font = 'bold 44px Inter';
 ctx.fillStyle = COLOR.bg1;
 ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
 ctx.fillText(' ' + t.download, W/2, ctaY + ctaH/2);

 // URL
 ctx.font = 'bold 32px JetBrains Mono';
 ctx.fillStyle = COLOR.ink;
 ctx.fillText(opts.url, W/2, H - 140);

 ctx.font = '24px Inter';
 ctx.fillStyle = COLOR.ink3;
 ctx.fillText(t.reel_cta, W/2, H - 80);
 }

 function wrapText(ctx, text, x, y, maxWidth, lineHeight) {
 const words = text.split(' ');
 const lines = [];
 let cur = '';
 words.forEach(w => {
 const test = cur ? cur + ' ' + w : w;
 if (ctx.measureText(test).width > maxWidth && cur) {
 lines.push(cur);
 cur = w;
 } else {
 cur = test;
 }
 });
 if (cur) lines.push(cur);
 // 中心垂直对齐
 const totalH = lines.length * lineHeight;
 lines.forEach((ln, i) => {
 ctx.fillText(ln, x, y - totalH/2 + i * lineHeight + lineHeight/2);
 });
 }

 // ============ 主调度 ============
 function draw(canvas, opts) {
 let W, H;
 if (opts.tpl === 'reel') {
 W = 1080; H = 1920;
 } else {
 W = 1080; H = 1080;
 }
 canvas.width = W;
 canvas.height = H;
 const ctx = canvas.getContext('2d');
 ctx.clearRect(0, 0, W, H);

 if (opts.tpl === 'kol') drawKol(ctx, W, H, opts);
 else if (opts.tpl === 'prematch') drawPrematch(ctx, W, H, opts);
 else if (opts.tpl === 'result') drawResult(ctx, W, H, opts);
 else if (opts.tpl === 'reel') drawReel(ctx, W, H, opts);
 }

 return { draw };
})();
