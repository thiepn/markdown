(()=>{'use strict';
const $=(s,r=document)=>r.querySelector(s), $$=(s,r=document)=>[...r.querySelectorAll(s)];
const wait=ms=>new Promise(r=>setTimeout(r,ms));
const KEY='markdown-lab:p12-certification';
const CHAOS_IDS=['markdown-fence','worker-timeout','mermaid-invalid','data-type-skew','api-http-error','sandbox-storage'];
const EXPECT={
 'markdown-fence':()=>$('#ed')?.value.includes('Broken specimen'),
 'worker-timeout':()=>$('#js')?.value.includes('while (true)'),
 'mermaid-invalid':()=>$('#mermaidSource')?.value.includes('A --> --> B'),
 'data-type-skew':()=>$('#dataSource')?.value.includes('???'),
 'api-http-error':()=>$('#apiExample')?.value==='error',
 'sandbox-storage':()=>localStorage.getItem('markdown-lab:p11-chaos-sandbox')==='{not-json}'
};
const state={running:false,results:[],started:null,finished:null,gate:'NOT_RUN'};

function style(){if($('#p12Style'))return;const s=document.createElement('style');s.id='p12Style';s.textContent=`
#p12Certification{margin:34px 0 10px;border-top:1px solid var(--b);padding-top:26px}.p12-head{display:flex;gap:14px;align-items:end;justify-content:space-between}.p12-head p{color:var(--m);max-width:720px}.p12-actions{display:flex;gap:7px;flex-wrap:wrap}.p12-btn{border:1px solid var(--b);background:var(--p);color:var(--t);padding:8px 10px;font:800 10px var(--mono);cursor:pointer}.p12-btn:hover{border-color:var(--a);color:var(--a2)}.p12-btn.primary{background:var(--a);border-color:var(--a);color:#fff}.p12-status{margin:14px 0;border-left:4px solid var(--m);background:var(--p);padding:12px}.p12-status.pass{border-color:var(--g)}.p12-status.fail{border-color:var(--r)}.p12-status b{display:block;font:900 12px var(--mono)}.p12-status small{color:var(--m)}.p12-list{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));border-left:1px solid var(--b);border-top:1px solid var(--b)}.p12-row{border-right:1px solid var(--b);border-bottom:1px solid var(--b);padding:9px 11px;font:10px/1.4 var(--mono)}.p12-row.pass{color:var(--g)}.p12-row.fail{color:var(--r)}.p12-row span{display:block;color:var(--m);margin-top:2px}.p12-marker{position:absolute;left:-99999px;width:1px;height:1px;overflow:hidden}@media(max-width:680px){.p12-head{align-items:flex-start;flex-direction:column}.p12-list{grid-template-columns:1fr}}
`;document.head.append(s)}
function panel(){
 if($('#p12Certification'))return;
 const home=$('#p11Home');if(!home)return;
 home.insertAdjacentHTML('afterend',`<section id="p12Certification"><div class="p12-head"><div><div class="ey">## P12 · Production Release Certification</div><h2>Executable regression gate.</h2><p>Runs navigation, the complete P11 scenario deck, all four cross-lab routes, all six controlled failure/recovery cycles, Final Form, Worker/storage/crypto primitives, accessibility labels, and viewport overflow checks. The result is stored locally and exposed for headless release CI.</p></div><div class="p12-actions"><button class="p12-btn primary" id="p12Run">Run certification</button><button class="p12-btn" id="p12Export">Export report</button></div></div><div id="p12Status" class="p12-status"><b>NOT RUN</b><small>No release claim has been made in this browser profile.</small></div><div id="p12Results" class="p12-list"></div><div id="p12CiResult" class="p12-marker" data-status="not-run">NOT_RUN</div></section>`);
 $('#p12Run').onclick=run;
 $('#p12Export').onclick=exportReport;
 render();
}
function render(){
 const box=$('#p12Results'),status=$('#p12Status'),marker=$('#p12CiResult');if(!box||!status||!marker)return;
 box.innerHTML=state.results.map(x=>`<div class="p12-row ${x.ok?'pass':'fail'}">${x.ok?'PASS':'FAIL'} · ${escapeHtml(x.name)}<span>${escapeHtml(x.detail||'')}</span></div>`).join('');
 const failed=state.results.filter(x=>!x.ok).length,passed=state.results.length-failed;
 status.className='p12-status '+(state.gate==='P12_RELEASE_CERTIFIED'?'pass':state.gate==='FAILED'?'fail':'');
 status.innerHTML=`<b>${state.running?'RUNNING':state.gate}</b><small>${state.running?'Regression suite is executing.':`${passed} passed · ${failed} failed${state.finished?` · ${state.finished}`:''}`}</small>`;
 marker.dataset.status=state.gate==='P12_RELEASE_CERTIFIED'?'pass':state.gate==='FAILED'?'fail':'running';marker.dataset.passed=String(passed);marker.dataset.failed=String(failed);marker.textContent=state.gate;
}
function escapeHtml(v){return String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[c]))}
async function check(name,fn){let ok=false,detail='';try{const v=await fn();if(v&&typeof v==='object'&&'ok'in v){ok=!!v.ok;detail=v.detail||''}else{ok=!!v;detail=ok?'verified':'returned false'}}catch(e){detail=String(e?.message||e)}state.results.push({name,ok,detail});render();if(!ok)throw new Error(name+': '+detail)}
async function soft(name,fn){try{await check(name,fn)}catch{} }
function clickLab(id){const b=$(`[data-lab="${id}"]`);if(!b)throw Error('lab button '+id+' missing');b.click()}
async function labReady(id){clickLab(id);await wait(id==='11'||id==='12'?150:70);const li=$('#li')?.textContent||'';return {ok:li.includes(id),detail:li.trim()||'lab heading missing'}}
function p11(){try{return JSON.parse(localStorage.getItem('markdown-lab:p11')||'{}')}catch{return {}}}
async function workerProbe(){return new Promise((resolve,reject)=>{const u=URL.createObjectURL(new Blob(['onmessage=e=>postMessage(e.data*2)'],{type:'text/javascript'}));const w=new Worker(u);const t=setTimeout(()=>{w.terminate();URL.revokeObjectURL(u);reject(Error('worker timeout'))},1200);w.onmessage=e=>{clearTimeout(t);w.terminate();URL.revokeObjectURL(u);resolve({ok:e.data===42,detail:'dedicated Worker returned '+e.data})};w.onerror=e=>{clearTimeout(t);w.terminate();URL.revokeObjectURL(u);reject(Error(e.message))};w.postMessage(21)})}
async function storageProbe(){const k='markdown-lab:p12-sandbox',v='p12-'+Math.random();localStorage.setItem(k,v);const ok=localStorage.getItem(k)===v;localStorage.removeItem(k);return {ok:ok&&!localStorage.getItem(k),detail:'isolated write/read/delete'}}
async function shaProbe(){const d=await crypto.subtle.digest('SHA-256',new TextEncoder().encode('MARKDOWN//LAB P12'));const h=[...new Uint8Array(d)].map(x=>x.toString(16).padStart(2,'0')).join('');return {ok:h.length===64,detail:h.slice(0,12)+'…'}}
async function navigationProbe(){for(let i=0;i<13;i++){const id=String(i).padStart(2,'0'),r=await labReady(id);if(!r.ok)return {ok:false,detail:'failed at lab '+id}}return {ok:true,detail:'13/13 labs routed'}}
async function scenarioProbe(){const buttons=$$('[data-p11-scenario]');if(buttons.length!==13)return {ok:false,detail:`${buttons.length}/13 scenario controls`};for(const b of buttons){b.click();await wait(85)}const s=p11();return {ok:Array.isArray(s.launched)&&s.launched.length===13,detail:`${s.launched?.length||0}/13 scenarios launched`}}
async function compositionProbe(){const buttons=$$('[data-p11-comp]');if(buttons.length!==4)return {ok:false,detail:`${buttons.length}/4 route controls`};let good=0;for(const b of buttons){b.click();await wait(110);if($('#p11RouteBanner'))good++}return {ok:good===4,detail:`${good}/4 cross-lab routes opened`}}
async function chaosProbe(){let passed=0;for(const id of CHAOS_IDS){clickLab('11');await wait(170);const b=$(`[data-p11-mutate="${id}"]`);if(!b)continue;b.click();await wait(190);if(!EXPECT[id]())continue;const back=$('[data-return-chaos]');if(!back)continue;back.click();await wait(650);const s=p11();if(Array.isArray(s.chaos?.recoveries)&&s.chaos.recoveries.includes(id)&&$('#view')?.dataset.p11==='11')passed++}return {ok:passed===6,detail:`${passed}/6 mutation + recovery cycles`}}
async function finalProbe(){clickLab('12');await wait(160);const run=$('#p11RunFinal');if(!run)return {ok:false,detail:'Final Form run control missing'};run.click();for(let i=0;i<35;i++){await wait(100);const s=p11();if(s.final?.last?.ok)return {ok:true,detail:`run ${s.final.runs} · ${s.final.last.ms||'?'} ms`};if(s.final?.last?.error)return {ok:false,detail:s.final.last.error}}return {ok:false,detail:'Final Form did not finish'}}
function accessibilityProbe(){const controls=$$('button,input,select,textarea,a[href]');const bad=controls.filter(el=>{if(el.disabled)return false;const tag=el.tagName;if(tag==='INPUT'||tag==='TEXTAREA'||tag==='SELECT')return !!(el.getAttribute('aria-label')||el.getAttribute('aria-labelledby')||el.labels?.length||el.title||el.placeholder);return !!(el.textContent.trim()||el.getAttribute('aria-label')||el.title)});return {ok:bad.length===0,detail:`${controls.length} controls · ${bad.length} unlabeled`}}
function overflowProbe(){const root=document.documentElement;const delta=root.scrollWidth-root.clientWidth;return {ok:delta<=2,detail:`viewport ${root.clientWidth}px · overflow ${Math.max(0,delta)}px`}}
function primitivesProbe(){const missing=['Worker','Blob','URL','crypto','localStorage','DecompressionStream','MutationObserver','matchMedia'].filter(k=>!(k in window));return {ok:missing.length===0,detail:missing.length?'missing '+missing.join(', '):'required browser primitives present'}}
async function sourceInventoryProbe(){const text=await fetch('assets/p11/showcase.js',{cache:'no-store'}).then(r=>{if(!r.ok)throw Error('P11 source fetch '+r.status);return r.text()});const scenarios=(text.match(/id:'(?:system-baseline|parser-specimen|worker-telemetry|polyglot-statistics|math-expression|diagram-pipeline|typed-benchmark|api-error-recovery|browser-worker|terminal-orchestration|component-gallery|chaos-recovery|final-form)'/g)||[]).length;const muts=(text.match(/id:'(?:markdown-fence|worker-timeout|mermaid-invalid|data-type-skew|api-http-error|sandbox-storage)'/g)||[]).length;const comps=(text.match(/id:'(?:doc-data-sql|markdown-diagram-final|terminal-chaos|browser-data-worker)'/g)||[]).length;return {ok:scenarios===13&&muts===6&&comps===4,detail:`inventory ${scenarios}/13 scenarios · ${comps}/4 routes · ${muts}/6 mutations`}}
async function run(){if(state.running)return;state.running=true;state.results=[];state.started=new Date().toISOString();state.finished=null;state.gate='RUNNING';render();
 const tests=[
  ['Browser primitives',primitivesProbe],['Storage round-trip',storageProbe],['Dedicated Worker lifecycle',workerProbe],['WebCrypto SHA-256',shaProbe],['P11 source inventory',sourceInventoryProbe],['13-lab navigation',navigationProbe],['13 showcase scenarios',scenarioProbe],['4 cross-lab compositions',compositionProbe],['6 chaos recoveries',chaosProbe],['Final Form composition',finalProbe],['Accessible control names',accessibilityProbe],['Viewport overflow',overflowProbe]
 ];
 for(const [n,f] of tests)await soft(n,f);
 state.running=false;state.finished=new Date().toISOString();state.gate=state.results.every(x=>x.ok)&&state.results.length===tests.length?'P12_RELEASE_CERTIFIED':'FAILED';
 const report={schema:1,gate:state.gate,started:state.started,finished:state.finished,userAgent:navigator.userAgent,viewport:{width:innerWidth,height:innerHeight,dpr:devicePixelRatio},results:state.results};
 try{localStorage.setItem(KEY,JSON.stringify(report))}catch{}render();
 window.__P12_REPORT__=report;
}
function exportReport(){const raw=localStorage.getItem(KEY)||JSON.stringify({gate:'NOT_RUN'},null,2);const a=document.createElement('a');a.href=URL.createObjectURL(new Blob([raw],{type:'application/json'}));a.download='markdown-lab-p12-certification.json';a.click();setTimeout(()=>URL.revokeObjectURL(a.href),500)}
async function boot(){style();for(let i=0;i<120&&!($('#p11Home')&&$$('[data-lab]').length>=13);i++)await wait(50);panel();if(new URLSearchParams(location.search).get('p12-ci')==='1'){await wait(100);run()}}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot,{once:true});else boot();
})();