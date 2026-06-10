// Luffa Predict — 全局状态 + 预测逻辑 + Luffa 下载漏斗埋点

const STORAGE_KEY = 'luffa_predict_v1';

function loadState() {
 try {
 const raw = localStorage.getItem(STORAGE_KEY);
 if (raw) return JSON.parse(raw);
 } catch (e) {}
 return {
 handle: null,
 flag: '',
 predictions: {}, // { match_id: 'home' | 'draw' | 'away' }
 eds: 0,
 hits: 0,
 misses: 0,
 joined_at: new Date().toISOString(),
 luffa_downloaded: false,
 };
}

function saveState(s) {
 localStorage.setItem(STORAGE_KEY, JSON.stringify(s));
}

let STATE = loadState();

// 首次访客 → 引导起一个 anonymous handle
function ensureHandle() {
 if (!STATE.handle) {
 const animals = ['Tiger', 'Eagle', 'Lion', 'Wolf', 'Falcon', 'Jaguar', 'Cobra', 'Hawk'];
 const n = Math.floor(Math.random() * 9000) + 1000;
 STATE.handle = `@${animals[Math.floor(Math.random() * animals.length)]}_${n}`;
 saveState(STATE);
 }
}

// 提交预测
function submitPrediction(matchId, pick) {
 ensureHandle();
 STATE.predictions[matchId] = pick;
 saveState(STATE);
 trackEvent('prediction_submit', { match_id: matchId, pick });
 return true;
}

function hasPredicted(matchId) {
 return !!STATE.predictions[matchId];
}

function getPrediction(matchId) {
 return STATE.predictions[matchId];
}

// 我的战绩
function getMyStats() {
 const total = Object.keys(STATE.predictions).length;
 const hitRate = total > 0 ? Math.round((STATE.hits / total) * 100) : 0;
 return {
 handle: STATE.handle || '@Guest',
 total_predictions: total,
 eds: STATE.eds || 0,
 hit_rate: hitRate,
 hits: STATE.hits,
 misses: STATE.misses,
 };
}

// 模拟「KOL 跟随预测」
function followKOLPicks(kolId) {
 const kol = getKOL(kolId);
 if (!kol) return 0;
 let n = 0;
 kol.recent_picks.forEach(p => {
 if (!hasPredicted(p.match_id)) {
 submitPrediction(p.match_id, p.pick);
 n++;
 }
 });
 trackEvent('kol_follow', { kol_id: kolId, count: n });
 return n;
}

// 埋点 —— 落到 console + dataLayer(后续接 GA/Mixpanel)
function trackEvent(name, props = {}) {
 const evt = { event: name, ...props, ts: new Date().toISOString(), handle: STATE.handle };
 if (!window.LUFFA_EVENTS) window.LUFFA_EVENTS = [];
 window.LUFFA_EVENTS.push(evt);
 console.log('[LuffaTrack]', name, props);
 if (window.dataLayer) window.dataLayer.push(evt);
}

// Luffa 下载漏斗 CTA
function triggerLuffaDownload(source = 'unknown') {
 trackEvent('luffa_download_click', { source });
 STATE.luffa_downloaded = true;
 saveState(STATE);
 // 真实环境会跳到 App Store / Play Store 智能识别
 const modal = document.getElementById('luffa-modal');
 if (modal) {
 modal.classList.add('open');
 } else {
 alert('下载 Luffa,在 App 中同步战绩 + 真领 EDS。\n\nApp Store / Google Play 搜索「Luffa」。');
 }
}

function closeLuffaModal() {
 const modal = document.getElementById('luffa-modal');
 if (modal) modal.classList.remove('open');
}

// 通用:渲染 Luffa 下载弹窗
function mountLuffaModal() {
 if (document.getElementById('luffa-modal')) return;
 const html = `
 <div class="luffa-modal" id="luffa-modal" onclick="if(event.target===this)closeLuffaModal()"> <div class="luffa-modal-card"> <button class="luffa-modal-close" onclick="closeLuffaModal()">×</button> <div class="luffa-modal-icon"></div> <h2>${typeof t === 'function' ? t('prof.connect_msg_title') : 'Get Luffa · Claim real EDS'}</h2> <p class="luffa-modal-sub">${typeof t === 'function' ? t('prof.connect_msg_body') : 'Without connecting, your picks live only on this device. Connect to receive EDS directly.'}</p> <div class="luffa-modal-stats"> <div><strong>${PLATFORM_STATS.total_users.toLocaleString()}</strong><span>玩家</span></div> <div><strong>${(PLATFORM_STATS.total_eds_distributed/1000).toFixed(0)}K</strong><span>EDS 已发</span></div> <div><strong>${PLATFORM_STATS.settlement_accuracy}%</strong><span>结算正确率</span></div> </div> <div class="luffa-modal-cta"> <a href="#" class="btn-primary" onclick="trackEvent('luffa_download_store',{store:'ios'})">App Store 下载</a> <a href="#" class="btn-secondary" onclick="trackEvent('luffa_download_store',{store:'android'})">Google Play 下载</a> </div> <div class="luffa-modal-foot"> <small>Operated within a group holding HK SFC licenses · Play-money + utility token reward</small> </div> </div> </div>
 `;
 const div = document.createElement('div');
 div.innerHTML = html;
 document.body.appendChild(div.firstElementChild);
}

// 通用:页脚 + 头部
function renderHeader(active = '') {
 const hasI18n = typeof t === 'function';
 const navItems = hasI18n
 ? { home: t('nav.home'), matches: t('nav.matches'), groups: t('nav.groups'), leaderboard: t('nav.leaderboard'), mypred: t('nav.mypred'), faq: t('nav.faq'), download: t('cta.download') }
 : { home: '首页', matches: '比赛', groups: '群组', leaderboard: '排行榜', mypred: '我的', faq: 'FAQ', download: '下载 Luffa' };
 return `
 <header class="site-header"> <a href="index.html" class="logo"> <span class="logo-mark"></span> <span class="logo-text">Goal<em>Rush</em></span> </a> <nav class="nav"> <a href="index.html" class="${active==='home'?'active':''}">${navItems.home}</a> <a href="matches.html" class="${active==='matches'?'active':''}">${navItems.matches}</a> <a href="groups.html" class="${active==='groups'?'active':''}">${navItems.groups}</a> <a href="leaderboard.html" class="${active==='leaderboard'?'active':''}">${navItems.leaderboard}</a> <a href="my-predictions.html" class="${active==='mypred'?'active':''}">${navItems.mypred}</a> <a href="faq.html" class="${active==='faq'?'active':''}">${navItems.faq}</a> </nav>
 ${hasI18n ? renderLangSwitcher() : ''}
 <button class="btn-cta-mini" onclick="triggerLuffaDownload('header')">${navItems.download}</button> </header>
 `;
}

function renderFooter() {
 const hasI18n = typeof t === 'function';
 const tagline = hasI18n ? t('brand.tagline') : 'Predict for free. Earn for real.';
 const l1 = hasI18n ? t('legal.line1') : 'GoalRush · Powered by Luffa · Play-money predictions + utility token reward';
 const l2 = hasI18n ? t('legal.line2') : 'Operated within a group holding HK SFC licenses · Not a prediction market / sportsbook';
 const l3 = hasI18n ? t('legal.line3') : 'Geo-restricted in US (retail) / Mainland China / parts of EU (subject to MiCA review)';
 return `
 <footer class="site-footer"> <div class="footer-inner"> <div class="footer-brand"> <span class="logo-mark"></span> <strong>GoalRush</strong> <p>${tagline}</p> </div> <div class="footer-links"> <a href="faq.html" onclick="trackEvent('footer_click',{link:'rules'})">FAQ</a> <a href="poster.html" onclick="trackEvent('footer_click',{link:'poster'})">Poster Studio</a> </div> <div class="footer-legal"> <small>
 ${l1}<br/>${l2}<br/>${l3}
 </small> </div> </div> </footer>
 `;
}

// 页面入口时调用
function bootstrap(active) {
 ensureHandle();
 const header = document.getElementById('header-slot');
 const footer = document.getElementById('footer-slot');
 if (header) header.innerHTML = renderHeader(active);
 if (footer) footer.innerHTML = renderFooter();
 mountLuffaModal();
 if (typeof applyI18n === 'function') applyI18n();
 trackEvent('page_view', { page: active, path: location.pathname });
}

// === GA4 / 投放跟踪占位 ===
// 部署时把 GA_MEASUREMENT_ID 替换为真实 ID,放开下面的 gtag 脚本
// 当前 LUFFA_EVENTS 仍可通过 console.log 在 dev 看到
(function setupAnalytics() {
 // window.dataLayer = window.dataLayer || [];
 // function gtag(){ dataLayer.push(arguments); }
 // window.gtag = gtag;
 // gtag('js', new Date());
 // gtag('config', 'G-XXXXXXXXXX'); // ← 部署时替换
 // const s = document.createElement('script');
 // s.async = true;
 // s.src = 'https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX';
 // document.head.appendChild(s);
})();
