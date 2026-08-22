(()=>{'use strict';
const $=(s,r=document)=>r.querySelector(s), $$=(s,r=document)=>[...r.querySelectorAll(s)];
const KEY='markdown-lab:p11';
const CORE_KEY='markdown-lab:settings';
const VERSION=1;
const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[c]));
const clamp=(n,a,b)=>Math.max(a,Math.min(b,n));
const now=()=>new Date().toISOString();

const DEMO_MD=`# MARKDOWN//LAB Showcase

> [!IMPORTANT]
> P11 turns the laboratories into a curated, repeatable showcase.

## Capability matrix

| System | Phase | State |
| :--- | ---: | :--- |
| Markdown parser | P1 | live |
| Worker runtime | P2 | live |
| Polyglot WASM | P3 | live |
| Math + diagrams + data | P4–P6 | live |
| API + browser + terminal | P7–P8 | live |
| UI kit + progression | P9–P10 | live |
| Showcase + final form | P11 | live |

- [x] deterministic scenario
- [x] visible recovery path
- [x] no feature gating

Footnote reference.[^p11]

[^p11]: Every scenario can be revisited without resetting progress.`;

const DEMO_JS=`const values = Array.from({length: 1200}, (_, i) => Math.sin(i / 17) * 40 + 60);
const sum = values.reduce((a,b) => a + b, 0);
const mean = sum / values.length;
const peak = Math.max(...values);
console.log("samples", values.length);
console.log("mean", mean.toFixed(3));
return {samples: values.length, mean: +mean.toFixed(3), peak: +peak.toFixed(3)};`;

const DEMO_PY=`values = [((i * 17) % 97) for i in range(1, 51)]
mean = sum(values) / len(values)
_result = {
    "count": len(values),
    "mean": round(mean, 3),
    "min": min(values),
    "max": max(values)
}
print(_result)`;

const DEMO_MATH=`sqrt(2)^2 + sin(pi / 6)^2 + log(e^3)`;

const DEMO_MERMAID=`flowchart LR
    MD[Markdown] --> Parse[Parser]
    Parse --> Data[Typed data]
    Data --> Worker[Worker compute]
    Parse --> Diagram[Mermaid metadata]
    Worker --> Final[Final Form]
    Diagram --> Final
    Final --> Recover{Recoverable?}
    Recover -->|yes| Ship[P11 Showcase]`;

const DEMO_DATA=`| Lab | Phase | Score | Stable | Date |
| :--- | ---: | ---: | :---: | :--- |
| Parser | 1 | 98 | true | 2026-08-22 |
| Worker | 2 | 95 | true | 2026-08-22 |
| Polyglot | 3 | 91 | true | 2026-08-22 |
| Math | 4 | 94 | true | 2026-08-22 |
| Mermaid | 5 | 93 | true | 2026-08-22 |
| Data | 6 | 96 | true | 2026-08-22 |
| Browser | 7 | 90 | true | 2026-08-22 |
| Terminal | 8 | 97 | true | 2026-08-22 |`;

const FINAL_DEFAULT={
 markdown:`# Final Form Composition

This document is assembled by **four independent systems**:

1. Markdown parsing and sanitization.
2. Typed tabular data.
3. Mermaid diagram metadata.
4. An isolated Worker computation.

> [!NOTE]
> P11 keeps the stages inspectable instead of hiding them behind one opaque “magic” result.`,
 data:`| Metric | Value | Weight |
| :--- | ---: | ---: |
| Correctness | 96 | 0.40 |
| Coverage | 92 | 0.25 |
| Recovery | 98 | 0.20 |
| Clarity | 94 | 0.15 |`,
 mermaid:`flowchart TD
    Source --> Markdown
    Source --> Data
    Source --> Diagram
    Data --> Worker
    Markdown --> Final
    Diagram --> Final
    Worker --> Final`,
 worker:`const numeric = rows.map(r => Number(r.Value)).filter(Number.isFinite);
const mean = numeric.reduce((a,b)=>a+b,0) / (numeric.length || 1);
return {
  rows: rows.length,
  numeric: numeric.length,
  mean: +mean.toFixed(2),
  verdict: mean >= 90 ? "showcase-ready" : "review"
};`
};

const SCENARIOS=[
{id:'system-baseline',lab:'00',title:'Capability baseline',level:'guided',summary:'Inspect runtime support, lazy engines, persistence, and browser boundaries before touching content.',preset:'system'},
{id:'parser-specimen',lab:'01',title:'Parser specimen document',level:'guided',summary:'Render a compact document that exercises headings, alert syntax, tables, tasks, links, and footnotes.',preset:'parser'},
{id:'worker-telemetry',lab:'02',title:'Worker telemetry',level:'advanced',summary:'Run a bounded numerical workload in the disposable JavaScript Worker and return structured output.',preset:'code'},
{id:'polyglot-statistics',lab:'03',title:'Polyglot statistics',level:'advanced',summary:'Load a Python result-producing example and inspect lazy runtime lifecycle behavior.',preset:'poly'},
{id:'math-expression',lab:'04',title:'Mathematical expression',level:'guided',summary:'Evaluate and typeset a mixed exact/numeric expression without leaving the browser.',preset:'math'},
{id:'diagram-pipeline',lab:'05',title:'Pipeline diagram',level:'guided',summary:'Render a production Mermaid flowchart and preserve a last-known-good SVG across failures.',preset:'mermaid'},
{id:'typed-benchmark',lab:'06',title:'Typed benchmark table',level:'advanced',summary:'Promote Markdown table cells into inferred numbers, booleans, dates, nulls, computed columns, and exports.',preset:'data'},
{id:'api-error-recovery',lab:'07',title:'API error and recovery',level:'stress',summary:'Use the local mock error path, inspect the response, then recover with the deterministic users endpoint.',preset:'api'},
{id:'browser-worker',lab:'08',title:'Browser Worker probe',level:'advanced',summary:'Exercise a native browser capability with an explicit state and a bounded dedicated Worker.',preset:'browser'},
{id:'terminal-orchestration',lab:'09',title:'Terminal orchestration',level:'advanced',summary:'Use the safe application shell to discover labs, filter state, and route to another laboratory.',preset:'terminal'},
{id:'component-gallery',lab:'10',title:'Component gallery tour',level:'guided',summary:'Inspect the P9 UI kit as a coherent production system rather than isolated decorative widgets.',preset:'components'},
{id:'chaos-recovery',lab:'11',title:'Certified chaos recovery',level:'stress',summary:'Inject a controlled failure, restore the known-good preset, and record a certified recovery.',preset:'chaos'},
{id:'final-form',lab:'12',title:'Final Form composition',level:'advanced',summary:'Compile Markdown, typed data, Mermaid metadata, and Worker computation into one inspectable composition.',preset:'final'}
];

const COMPOSITIONS=[
{id:'doc-data-sql',title:'Document → Data → SQL',labs:['01','06','03'],summary:'Start with Markdown structure, promote a table to typed data, then hand the dataset toward the SQLite runtime.'},
{id:'markdown-diagram-final',title:'Markdown → Diagram → Final Form',labs:['01','05','12'],summary:'Use one conceptual source across prose, graph metadata, and the composed Final Form output.'},
{id:'terminal-chaos',title:'Terminal → Chaos → Recovery',labs:['09','11','01'],summary:'Discover a target from the shell, inject a controlled defect, then recover to a known-good parser state.'},
{id:'browser-data-worker',title:'Browser → Data → Worker',labs:['08','06','12'],summary:'Pair native browser capability checks with typed data and an isolated computation stage.'}
];

const MUTATIONS=[
{id:'markdown-fence',name:'Broken Markdown fence',target:'01',risk:'parser diagnostic',expected:'Odd fence count is detected; recovery restores a valid showcase document.',apply:()=>setEditor('#ed','# Broken specimen\n\n```js\nconst broken = true;'),recover:()=>setEditor('#ed',DEMO_MD,true)},
{id:'worker-timeout',name:'Worker timeout',target:'02',risk:'bounded compute timeout',expected:'The disposable Worker is terminated by the existing timeout control.',apply:()=>{setEditor('#js','while (true) {}');const t=$('#timeout');if(t){t.value='1000';t.dispatchEvent(new Event('change',{bubbles:true}))}},recover:()=>setEditor('#js',DEMO_JS)},
{id:'mermaid-invalid',name:'Invalid Mermaid source',target:'05',risk:'renderer parse failure',expected:'The previous successful SVG remains available; recovery renders a valid graph.',apply:()=>setEditor('#mermaidSource','flowchart LR\nA --> --> B',true),recover:()=>setEditor('#mermaidSource',DEMO_MERMAID,true)},
{id:'data-type-skew',name:'Typed-data skew',target:'06',risk:'mixed inference',expected:'Ambiguous cells stay inspectable; recovery restores a clean typed table.',apply:()=>setEditor('#dataSource','| Name | Score |\n| --- | ---: |\n| A | 9 |\n| B | ??? |\n| C | 12 |',true),recover:()=>setEditor('#dataSource',DEMO_DATA,true)},
{id:'api-http-error',name:'Mock HTTP error',target:'07',risk:'HTTP error path',expected:'The error response is visible without corrupting history; recovery uses mock users.',apply:()=>{const ex=$('#apiExample');if(ex){ex.value='error';$('#loadApiExample')?.click()}},recover:()=>{const ex=$('#apiExample');if(ex){ex.value='users';$('#loadApiExample')?.click()}}},
{id:'sandbox-storage',name:'Sandbox state corruption',target:'08',risk:'isolated storage only',expected:'Only the P11 sandbox key is malformed; recovery deletes it. Core settings are never touched.',apply:()=>{try{localStorage.setItem('markdown-lab:p11-chaos-sandbox','{not-json')}catch{}},recover:()=>{try{localStorage.removeItem('markdown-lab:p11-chaos-sandbox')}catch{}}}
];

const defaultState=()=>({
 version:VERSION,
 mode:'guided',
 launched:[],
 lastScenario:null,
 achievements:[],
 compositions:[],
 chaos:{current:null,recoveries:[],log:[]},
 final:{runs:0,last:null,markdown:FINAL_DEFAULT.markdown,data:FINAL_DEFAULT.data,mermaid:FINAL_DEFAULT.mermaid,worker:FINAL_DEFAULT.worker}
});
let ST=loadState();
let customRendering=false;
let observerTimer=0;

function loadState(){
 try{
   const x=JSON.parse(localStorage.getItem(KEY)||'null');
   if(x&&typeof x==='object'){
     const d=defaultState();
     return {...d,...x,chaos:{...d.chaos,...(x.chaos||{})},final:{...d.final,...(x.final||{})}};
   }
 }catch{}
 return defaultState();
}
function saveState(){
 try{localStorage.setItem(KEY,JSON.stringify(ST))}catch{}
 syncCoreAchievements();
 updateHomeStats();
}
function syncCoreAchievements(){
 if(!ST.achievements.length)return;
 try{
   const core=JSON.parse(localStorage.getItem(CORE_KEY)||'{}');
   const ach=Array.isArray(core.ach)?core.ach:[];
   let changed=false;
   for(const name of ST.achievements)if(!ach.includes(name)){ach.push(name);changed=true}
   if(changed){core.ach=ach;localStorage.setItem(CORE_KEY,JSON.stringify(core))}
 }catch{}
}
function toast(msg){
 const t=$('#toast');
 if(!t)return;
 t.textContent='`'+msg+'`';
 t.classList.add('show');
 clearTimeout(toast.t);
 toast.t=setTimeout(()=>t.classList.remove('show'),1800);
}
function grant(name){
 if(ST.achievements.includes(name))return;
 ST.achievements.push(name);
 saveState();
 toast('Achievement: '+name);
}
function setEditor(sel,value,run=false){
 const el=$(sel); if(!el)return false;
 el.value=value;
 el.dispatchEvent(new Event('input',{bubbles:true}));
 el.dispatchEvent(new Event('change',{bubbles:true}));
 if(run){
   const map={'#ed':'#renderMD','#mermaidSource':'#renderDiagram','#dataSource':'#dataParse'};
   $(map[sel])?.click();
 }
 return true;
}
function currentLab(){return (location.hash.match(/lab-(\d\d)/)||[])[1]||null}
function navigateLab(id){
 const b=$(`[data-lab="${id}"]`);
 if(b)b.click();
 else location.hash='lab-'+id;
}
function afterNav(fn,delay=90){setTimeout(fn,delay)}
function scenarioForLab(id){return SCENARIOS.find(s=>s.lab===id)}
function levelLabel(level){return level==='stress'?'STRESS':level==='advanced'?'ADVANCED':'GUIDED'}

function applyScenarioPreset(s){
 if(!s)return;
 switch(s.preset){
   case 'parser': setEditor('#ed', ST.mode==='stress'?DEMO_MD+'\n\n```\nunclosed':DEMO_MD, true); break;
   case 'code': setEditor('#js', ST.mode==='stress'?'for(;;){}':DEMO_JS); break;
   case 'poly': {
     const py=$('[data-lang="python"]'); if(py&&!py.classList.contains('on'))py.click();
     setTimeout(()=>setEditor('#polyEd',DEMO_PY),60); break;
   }
   case 'math': {
     const expr=$('#mathExpr'); if(expr){expr.value=ST.mode==='stress'?'sqrt(-1) + 1/0':DEMO_MATH;expr.dispatchEvent(new Event('input',{bubbles:true}))}
     break;
   }
   case 'mermaid': setEditor('#mermaidSource',ST.mode==='stress'?'flowchart LR\nA --> --> B':DEMO_MERMAID,true); break;
   case 'data': setEditor('#dataSource',ST.mode==='stress'?DEMO_DATA+'\n| Broken | NaN | maybe | false | not-a-date |':DEMO_DATA,true); break;
   case 'api': {
     const ex=$('#apiExample'); if(ex){ex.value=ST.mode==='stress'?'error':'users';$('#loadApiExample')?.click()}
     break;
   }
   case 'browser': {
     $('[data-browser-tab="worker"]')?.click();
     setTimeout(()=>{const n=$('#workerN');if(n)n.value=ST.mode==='stress'?'2500000':'250000'},60);
     break;
   }
   case 'terminal': {
     const t=$('#term'); if(t){t.value=ST.mode==='guided'?'help':'labs | grep LIVE';t.focus()}
     break;
   }
   case 'chaos': renderCustomLab(true); break;
   case 'final': renderCustomLab(true); break;
 }
 showScenarioBanner(s);
}
function launchScenario(id){
 const s=SCENARIOS.find(x=>x.id===id); if(!s)return;
 ST.lastScenario=id;
 if(!ST.launched.includes(id))ST.launched.push(id);
 saveState();
 navigateLab(s.lab);
 afterNav(()=>applyScenarioPreset(s));
 if(ST.launched.length>=13)grant('Showcase Cartographer');
}
function showScenarioBanner(s){
 if(!s||['11','12'].includes(s.lab))return;
 const v=$('#view'); if(!v)return;
 let bar=$('#p11ScenarioBanner');
 if(!bar){
   bar=document.createElement('div');
   bar.id='p11ScenarioBanner';
   bar.className='p11-scenario-banner';
   v.prepend(bar);
 }
 bar.innerHTML=`<div><span class="p11-kicker">P11 SCENARIO · ${levelLabel(ST.mode)}</span><b>${esc(s.title)}</b><small>${esc(s.summary)}</small></div><button class="p11-btn" data-p11-open-chaos>Chaos test</button>`;
 $('[data-p11-open-chaos]',bar)?.addEventListener('click',()=>navigateLab('11'));
}

function injectStyle(){
 if($('#p11Style'))return;
 const st=document.createElement('style');st.id='p11Style';st.textContent=`
 .p11-wrap{margin-top:16px}.p11-toolbar{display:flex;flex-wrap:wrap;gap:7px;align-items:center;margin:10px 0 14px}.p11-toolbar .grow{flex:1}
 .p11-btn{border:1px solid var(--b);background:var(--p);color:var(--t);padding:7px 9px;font:700 11px var(--mono);cursor:pointer}.p11-btn:hover,.p11-btn.on{border-color:var(--a);color:var(--a2)}.p11-btn.primary{background:var(--a);border-color:var(--a);color:#fff}.p11-btn.danger{border-color:var(--r);color:var(--r)}
 .p11-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));border-left:1px solid var(--b);border-top:1px solid var(--b)}.p11-card{border-right:1px solid var(--b);border-bottom:1px solid var(--b);padding:13px;min-width:0;background:transparent}.p11-card:hover{background:var(--p)}.p11-card b{display:block;margin:5px 0;font-size:13px}.p11-card p{color:var(--m);font-size:11px;margin:0 0 11px;min-height:50px}.p11-card small{font:800 9px var(--mono);color:var(--a2)}
 .p11-scenario-banner{display:flex;gap:12px;align-items:center;justify-content:space-between;border-left:4px solid var(--a);background:var(--p);padding:10px 12px;margin:12px 0}.p11-scenario-banner div{min-width:0}.p11-scenario-banner b,.p11-scenario-banner small{display:block}.p11-scenario-banner small{color:var(--m);margin-top:3px}.p11-kicker{display:block;font:800 9px var(--mono);color:var(--a2);letter-spacing:.08em}
 .p11-metrics{display:grid;grid-template-columns:repeat(4,1fr);border-left:1px solid var(--b);border-top:1px solid var(--b);margin:12px 0}.p11-metric{border-right:1px solid var(--b);border-bottom:1px solid var(--b);padding:11px}.p11-metric b{display:block;font:800 9px var(--mono);color:var(--m)}.p11-metric span{font:800 21px var(--mono)}
 .p11-chaos-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:10px}.p11-chaos-card{border:1px solid var(--b);padding:12px;background:var(--p)}.p11-chaos-card .risk{font:800 9px var(--mono);color:var(--w)}.p11-chaos-card p{color:var(--m);font-size:12px}.p11-log{max-height:260px;overflow:auto;background:var(--p);border:1px solid var(--b);padding:10px;font:11px/1.55 var(--mono);white-space:pre-wrap}
 .p11-current{border-left:4px solid var(--w);padding:11px 13px;background:var(--p);margin:12px 0}.p11-current.recovered{border-color:var(--g)}
 .p11-final-grid{display:grid;grid-template-columns:1fr 1fr;gap:12px}.p11-final-field{border:1px solid var(--b);background:var(--p)}.p11-final-field label{display:block;background:var(--p2);border-bottom:1px solid var(--b);padding:7px 10px;font:800 10px var(--mono);color:var(--m)}.p11-final-field textarea{width:100%;min-height:210px;resize:vertical;border:0;background:transparent;color:var(--t);padding:10px;font:12px/1.5 var(--mono);outline:0}
 .p11-output-grid{display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-top:12px}.p11-output{border:1px solid var(--b);min-height:180px;overflow:auto}.p11-output h3{font:800 10px var(--mono);color:var(--m);margin:0;padding:8px 10px;border-bottom:1px solid var(--b);background:var(--p)}.p11-output .body{padding:10px;font-size:12px}.p11-output pre{white-space:pre-wrap;overflow-wrap:anywhere;margin:0;font:11px/1.5 var(--mono)}.p11-output table{border-collapse:collapse;width:100%}.p11-output td,.p11-output th{border:1px solid var(--b);padding:4px 6px;text-align:left}
 .p11-pipeline{display:flex;gap:0;overflow:auto;margin:12px 0}.p11-step{flex:1;min-width:125px;border:1px solid var(--b);border-right:0;padding:8px 10px;font:10px var(--mono);color:var(--m)}.p11-step:last-child{border-right:1px solid var(--b)}.p11-step.ok{color:var(--g);border-top-color:var(--g)}.p11-step.bad{color:var(--r);border-top-color:var(--r)}
 .p11-home{margin-top:32px;border-top:1px solid var(--b);padding-top:28px}.p11-home-head{display:flex;gap:14px;justify-content:space-between;align-items:end}.p11-home-head h2{margin:4px 0 0}.p11-home-head p{max-width:650px;color:var(--m);margin:5px 0 0}.p11-comps{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:8px;margin-top:12px}.p11-comp{border:1px solid var(--b);padding:10px;background:var(--p)}.p11-comp b{display:block;font-size:12px}.p11-comp small{display:block;color:var(--m);margin:4px 0 8px}.p11-route{font:800 9px var(--mono);color:var(--a2)}
 .p11-error{border-left:3px solid var(--r);background:var(--p);padding:9px 10px;color:var(--r);font:11px var(--mono)}.p11-good{border-left:3px solid var(--g);background:var(--p);padding:9px 10px;color:var(--g);font:11px var(--mono)}
 @media(max-width:900px){.p11-grid{grid-template-columns:repeat(2,minmax(0,1fr))}.p11-comps{grid-template-columns:repeat(2,minmax(0,1fr))}.p11-final-grid,.p11-output-grid{grid-template-columns:1fr}.p11-metrics{grid-template-columns:repeat(2,1fr)}}
 @media(max-width:560px){.p11-grid,.p11-chaos-grid,.p11-comps{grid-template-columns:1fr}.p11-scenario-banner{align-items:flex-start;flex-direction:column}.p11-metrics{grid-template-columns:1fr 1fr}}
 `;
 document.head.append(st);
}

function updateHero(){
 document.title='MARKDOWN//LAB — P11 Showcase Content Expansion';
 const main=$('main'); if(!main)return;
 const first=$('main > section:first-child');
 if(first){
   const ey=$('.ey',first), h=$('h1',first), lead=$('.lead',first), sys=$('.alert.system',first);
   if(ey)ey.textContent='P11 · Showcase Content Expansion';
   if(h)h.innerHTML='Show it.<br>Break it. Recover it.';
   if(lead)lead.textContent='Every canonical laboratory now has a curated launch scenario. Lab 11 is a controlled Chaos control room; Lab 12 is an executable Final Form composer that combines Markdown, typed data, diagram metadata, and isolated Worker computation.';
   if(sys)sys.innerHTML='<div class="at">[!P11]</div>P1–P10 remain intact and ungated. P11 adds curated scenarios, cross-lab compositions, controlled failure/recovery demonstrations, and two attainable capstone achievements without replacing the existing runtimes.';
   const chips=$('.chips',first);
   if(chips&&!$('#p11Chip',chips))chips.insertAdjacentHTML('afterbegin','<span class="chip good" id="p11Chip">SHOWCASE · LIVE P11</span><span class="chip good">CHAOS · CERTIFIED RECOVERY</span><span class="chip good">FINAL FORM · EXECUTABLE</span>');
 }
 const foot=$('.footer');
 if(foot&&!foot.dataset.p11){foot.dataset.p11='1';foot.innerHTML='MARKDOWN//LAB · <b>P11 Showcase Content Expansion</b> · curated scenarios · controlled chaos · executable Final Form · '+foot.innerHTML}
}

function updateGrid(){
 const a=$('[data-lab="11"]'), b=$('[data-lab="12"]');
 for(const [el,label] of [[a,'LIVE · P11'],[b,'LIVE · P11']]){
   if(!el)continue;
   const s=$('.ls',el); if(s)s.textContent=label;
 }
 if(a){const d=$('.ld',a);if(d)d.textContent='Controlled mutation, recovery, and certification control room.'}
 if(b){const d=$('.ld',b);if(d)d.textContent='Executable Markdown + data + diagram metadata + Worker composition.'}
}

function homeSectionHTML(){
 const launched=ST.launched.length, rec=ST.chaos.recoveries.length, runs=ST.final.runs;
 return `<section class="p11-home" id="p11Home">
   <div class="p11-home-head"><div><div class="ey">## P11 Showcase Deck</div><h2>One curated scenario per laboratory.</h2><p>Use Guided for a concise tour, Advanced for composition-heavy examples, or Stress to load deliberately difficult/failing inputs. Scenarios never lock features.</p></div>
   <div class="p11-toolbar">${['guided','advanced','stress'].map(m=>`<button class="p11-btn ${ST.mode===m?'on':''}" data-p11-mode="${m}">${levelLabel(m)}</button>`).join('')}</div></div>
   <div class="p11-metrics"><div class="p11-metric"><b>SCENARIOS LAUNCHED</b><span id="p11LaunchCount">${launched}/13</span></div><div class="p11-metric"><b>CERTIFIED RECOVERIES</b><span id="p11RecoveryCount">${rec}</span></div><div class="p11-metric"><b>FINAL FORM RUNS</b><span id="p11RunCount">${runs}</span></div><div class="p11-metric"><b>P11 ACHIEVEMENTS</b><span id="p11AchCount">${ST.achievements.length}</span></div></div>
   <div class="p11-grid">${SCENARIOS.map(s=>`<article class="p11-card"><small>${s.lab} · ${levelLabel(s.level)}</small><b>${esc(s.title)}</b><p>${esc(s.summary)}</p><button class="p11-btn ${ST.launched.includes(s.id)?'on':''}" data-p11-scenario="${s.id}">${ST.launched.includes(s.id)?'Launch again':'Launch scenario'}</button></article>`).join('')}</div>
   <div style="margin-top:22px"><div class="ey">### Cross-lab compositions</div><div class="p11-comps">${COMPOSITIONS.map(c=>`<article class="p11-comp"><div class="p11-route">${c.labs.join(' → ')}</div><b>${esc(c.title)}</b><small>${esc(c.summary)}</small><button class="p11-btn" data-p11-comp="${c.id}">Start route</button></article>`).join('')}</div></div>
 </section>`;
}
function ensureHome(){
 const grid=$('#grid'); if(!grid)return;
 const labSection=grid.closest('section'); if(!labSection)return;
 let home=$('#p11Home');
 if(!home){labSection.insertAdjacentHTML('afterend',homeSectionHTML());home=$('#p11Home')}
 bindHome();
 updateHomeStats();
}
function bindHome(){
 $$('[data-p11-mode]').forEach(b=>b.onclick=()=>{ST.mode=b.dataset.p11Mode;saveState();$('#p11Home')?.remove();ensureHome();toast('Showcase mode: '+levelLabel(ST.mode))});
 $$('[data-p11-scenario]').forEach(b=>b.onclick=()=>launchScenario(b.dataset.p11Scenario));
 $$('[data-p11-comp]').forEach(b=>b.onclick=()=>startComposition(b.dataset.p11Comp));
}
function updateHomeStats(){
 const set=(id,v)=>{const e=$(id);if(e)e.textContent=v};
 set('#p11LaunchCount',`${ST.launched.length}/13`);
 set('#p11RecoveryCount',String(ST.chaos.recoveries.length));
 set('#p11RunCount',String(ST.final.runs));
 set('#p11AchCount',String(ST.achievements.length));
}
function startComposition(id){
 const c=COMPOSITIONS.find(x=>x.id===id); if(!c)return;
 ST.compositions.push({id,at:now()}); if(ST.compositions.length>40)ST.compositions.shift();
 saveState(); navigateLab(c.labs[0]);
 const s=scenarioForLab(c.labs[0]); afterNav(()=>{if(s)applyScenarioPreset(s);showRouteBanner(c)},100);
}
function showRouteBanner(c){
 const v=$('#view');if(!v)return;
 let bar=$('#p11RouteBanner'); if(!bar){bar=document.createElement('div');bar.id='p11RouteBanner';bar.className='p11-scenario-banner';v.prepend(bar)}
 bar.innerHTML=`<div><span class="p11-kicker">CROSS-LAB COMPOSITION</span><b>${esc(c.title)}</b><small>${esc(c.summary)} · Route ${c.labs.join(' → ')}</small></div><button class="p11-btn" data-p11-next-route>Next lab</button>`;
 let i=c.labs.indexOf(currentLab()); if(i<0)i=0;
 $('[data-p11-next-route]',bar).onclick=()=>{const next=c.labs[(i+1)%c.labs.length];navigateLab(next);const s=scenarioForLab(next);afterNav(()=>{if(s)applyScenarioPreset(s);showRouteBanner(c)},100)}
}

function chaosHTML(){
 const cur=ST.chaos.current;
 const log=ST.chaos.log.slice(-16).reverse().map(x=>`${x.at.slice(11,19)}  ${x.type.padEnd(9)}  ${x.name}`).join('\n')||'No chaos events yet.';
 return `<div class="p11-wrap">
   <div class="p11-toolbar"><button class="p11-btn primary" data-p11-random>Inject random mutation</button><button class="p11-btn" data-p11-recover ${cur&&!cur.recovered?'':'disabled'}>Recover current</button><button class="p11-btn" data-p11-reset-chaos>Reset chaos log</button><div class="grow"></div><span class="chip">${ST.chaos.recoveries.length} certified recoveries</span></div>
   ${cur?`<div class="p11-current ${cur.recovered?'recovered':''}"><span class="p11-kicker">${cur.recovered?'RECOVERED':'ACTIVE MUTATION'} · LAB ${cur.target}</span><b>${esc(cur.name)}</b><div style="color:var(--m);margin-top:4px">${esc(cur.expected)}</div></div>`:'<div class="alert system"><div class="at">[!CHAOS CONTRACT]</div>Mutations are explicit and scoped. They alter only controlled showcase inputs or a dedicated P11 sandbox key. Core progress data is never intentionally corrupted.</div>'}
   <div class="p11-chaos-grid">${MUTATIONS.map(m=>`<article class="p11-chaos-card"><span class="risk">${esc(m.risk).toUpperCase()} · LAB ${m.target}</span><h3>${esc(m.name)}</h3><p>${esc(m.expected)}</p><div class="tools"><button class="p11-btn danger" data-p11-mutate="${m.id}">Inject</button><button class="p11-btn" data-p11-recover-id="${m.id}">Known-good recovery</button></div></article>`).join('')}</div>
   <div style="margin-top:18px"><div class="ey">### Recovery log</div><pre class="p11-log">${esc(log)}</pre></div>
 </div>`;
}
function bindChaos(){
 $('[data-p11-random]')?.addEventListener('click',()=>injectMutation(MUTATIONS[Math.floor(Math.random()*MUTATIONS.length)].id));
 $('[data-p11-recover]')?.addEventListener('click',()=>ST.chaos.current&&recoverMutation(ST.chaos.current.id));
 $('[data-p11-reset-chaos]')?.addEventListener('click',()=>{ST.chaos.current=null;ST.chaos.log=[];saveState();renderCustomLab(true)});
 $$('[data-p11-mutate]').forEach(b=>b.onclick=()=>injectMutation(b.dataset.p11Mutate));
 $$('[data-p11-recover-id]').forEach(b=>b.onclick=()=>recoverMutation(b.dataset.p11RecoverId));
}
function injectMutation(id){
 const m=MUTATIONS.find(x=>x.id===id);if(!m)return;
 ST.chaos.current={id:m.id,name:m.name,target:m.target,expected:m.expected,at:now(),recovered:false};
 ST.chaos.log.push({at:now(),type:'INJECT',name:m.name});if(ST.chaos.log.length>80)ST.chaos.log.shift();saveState();
 navigateLab(m.target);afterNav(()=>{try{m.apply()}catch(e){toast('Mutation hook: '+e.message)}showChaosReturn(m)},110);
}
function showChaosReturn(m){
 const v=$('#view');if(!v)return;
 const bar=document.createElement('div');bar.className='p11-scenario-banner';bar.id='p11ChaosReturn';
 bar.innerHTML=`<div><span class="p11-kicker">CHAOS ACTIVE · ${esc(m.risk)}</span><b>${esc(m.name)}</b><small>${esc(m.expected)}</small></div><button class="p11-btn primary" data-return-chaos>Return + recover</button>`;
 v.prepend(bar);$('[data-return-chaos]',bar).onclick=()=>{navigateLab('11');afterNav(()=>recoverMutation(m.id),90)}
}
function recoverMutation(id){
 const m=MUTATIONS.find(x=>x.id===id);if(!m)return;
 const doRecover=()=>{try{m.recover()}catch(e){toast('Recovery hook: '+e.message)}ST.chaos.current={id:m.id,name:m.name,target:m.target,expected:m.expected,at:ST.chaos.current?.at||now(),recovered:true,recoveredAt:now()};if(!ST.chaos.recoveries.includes(id))ST.chaos.recoveries.push(id);ST.chaos.log.push({at:now(),type:'RECOVER',name:m.name});saveState();if(ST.chaos.recoveries.length>=3)grant('Chaos Engineer');navigateLab('11');afterNav(()=>renderCustomLab(true),70)};
 if(currentLab()!==m.target){navigateLab(m.target);afterNav(doRecover,100)}else doRecover();
}

function parseTypedTable(src){
 const lines=String(src).split(/\r?\n/).map(x=>x.trim()).filter(Boolean);
 if(lines.length<2)throw Error('Typed data needs a Markdown header and separator.');
 const split=line=>line.replace(/^\||\|$/g,'').split('|').map(x=>x.trim());
 const headers=split(lines[0]); const sep=split(lines[1]);
 if(headers.length<2||sep.length!==headers.length||!sep.every(x=>/^:?-{3,}:?$/.test(x)))throw Error('Invalid Markdown table separator.');
 const type=v=>{
   if(v==='')return null;
   if(/^(true|false)$/i.test(v))return v.toLowerCase()==='true';
   if(/^[-+]?\d+(\.\d+)?$/.test(v))return Number(v);
   if(/^\d{4}-\d{2}-\d{2}$/.test(v)&&!Number.isNaN(Date.parse(v)))return v;
   return v;
 };
 const rows=lines.slice(2).map(line=>{const cells=split(line),o={};headers.forEach((h,i)=>o[h]=type(cells[i]??''));return o});
 const schema=headers.map(h=>{const vals=rows.map(r=>r[h]).filter(v=>v!==null);let kind='string';if(vals.length&&vals.every(v=>typeof v==='number'))kind='number';else if(vals.length&&vals.every(v=>typeof v==='boolean'))kind='boolean';else if(vals.length&&vals.every(v=>typeof v==='string'&&/^\d{4}-\d{2}-\d{2}$/.test(v)))kind='date';return {name:h,type:kind,nulls:rows.filter(r=>r[h]===null).length}});
 return {headers,rows,schema};
}
function diagramMeta(src){
 const s=String(src).trim();if(!s)throw Error('Diagram source is empty.');
 const first=(s.split(/\r?\n/).find(Boolean)||'').trim();
 const family=(first.match(/^(flowchart|graph|sequenceDiagram|classDiagram|stateDiagram(?:-v2)?|erDiagram|journey|gantt|pie|gitGraph|mindmap|timeline|quadrantChart|requirementDiagram)/)||[])[1]||'unknown';
 const lines=s.split(/\r?\n/).filter(x=>x.trim());
 const edges=(s.match(/-->|---|==>|-.->/g)||[]).length;
 return {family,lines:lines.length,edges,chars:s.length,valid:family!=='unknown'};
}
function runIsolatedWorker(code,rows,timeout=1600){
 return new Promise((resolve,reject)=>{
   const wrapper=`"use strict";self.fetch=undefined;self.XMLHttpRequest=undefined;self.WebSocket=undefined;self.importScripts=undefined;self.onmessage=async(e)=>{const rows=e.data.rows;try{const fn=async(rows)=>{${code}\n};const result=await fn(rows);self.postMessage({ok:true,result});}catch(err){self.postMessage({ok:false,error:String(err&&err.stack||err)});}};`;
   const url=URL.createObjectURL(new Blob([wrapper],{type:'text/javascript'}));const w=new Worker(url);let done=false;
   const finish=(fn,v)=>{if(done)return;done=true;clearTimeout(t);w.terminate();URL.revokeObjectURL(url);fn(v)};
   const t=setTimeout(()=>finish(reject,new Error('Worker timed out after '+timeout+' ms')),timeout);
   w.onmessage=e=>e.data?.ok?finish(resolve,e.data.result):finish(reject,new Error(e.data?.error||'Worker failed'));
   w.onerror=e=>finish(reject,new Error(e.message||'Worker error'));
   w.postMessage({rows});
 });
}
function renderTypedTable(ds){
 return `<table><thead><tr>${ds.headers.map(h=>`<th>${esc(h)}</th>`).join('')}</tr></thead><tbody>${ds.rows.slice(0,20).map(r=>`<tr>${ds.headers.map(h=>`<td>${esc(r[h]===null?'null':r[h])}</td>`).join('')}</tr>`).join('')}</tbody></table><p style="color:var(--m)">schema: ${ds.schema.map(x=>`${esc(x.name)}:${x.type}${x.nulls?`?${x.nulls}`:''}`).join(' · ')}</p>`;
}
function finalHTML(){
 const f=ST.final,last=f.last||{};
 return `<div class="p11-wrap">
   <div class="p11-toolbar"><button class="p11-btn primary" id="p11RunFinal">Run Final Form</button><button class="p11-btn" id="p11ResetFinal">Load canonical composition</button><button class="p11-btn" id="p11ExportFinal">Export composition JSON</button><div class="grow"></div><span class="chip">${f.runs} successful runs</span></div>
   <div class="p11-pipeline"><div class="p11-step ${last.markdown?'ok':''}">1 · MARKDOWN</div><div class="p11-step ${last.data?'ok':''}">2 · TYPED DATA</div><div class="p11-step ${last.diagram?'ok':''}">3 · DIAGRAM META</div><div class="p11-step ${last.worker?'ok':''}">4 · WORKER</div><div class="p11-step ${last.ok?'ok':last.error?'bad':''}">5 · COMPOSE</div></div>
   <div class="p11-final-grid">
    <div class="p11-final-field"><label>Markdown document</label><textarea id="p11FinalMd">${esc(f.markdown)}</textarea></div>
    <div class="p11-final-field"><label>Typed data · Markdown table</label><textarea id="p11FinalData">${esc(f.data)}</textarea></div>
    <div class="p11-final-field"><label>Mermaid metadata source</label><textarea id="p11FinalMermaid">${esc(f.mermaid)}</textarea></div>
    <div class="p11-final-field"><label>Isolated Worker body · receives rows</label><textarea id="p11FinalWorker">${esc(f.worker)}</textarea></div>
   </div>
   <div id="p11FinalStatus">${last.error?`<div class="p11-error">${esc(last.error)}</div>`:'<div class="alert system"><div class="at">[!FINAL FORM CONTRACT]</div>Each stage remains independently inspectable. The editable computation executes in a dedicated disposable Worker with a hard timeout and without injected secrets.</div>'}</div>
   <div class="p11-output-grid">
    <section class="p11-output"><h3>MARKDOWN RENDER</h3><div class="body preview" id="p11OutMd">${last.html||'<span style="color:var(--m)">Run the composition.</span>'}</div></section>
    <section class="p11-output"><h3>TYPED DATA</h3><div class="body" id="p11OutData">${last.dataHtml||'<span style="color:var(--m)">Run the composition.</span>'}</div></section>
    <section class="p11-output"><h3>DIAGRAM METADATA</h3><div class="body"><pre id="p11OutDiagram">${esc(last.diagramText||'Run the composition.')}</pre></div></section>
    <section class="p11-output"><h3>WORKER RESULT</h3><div class="body"><pre id="p11OutWorker">${esc(last.workerText||'Run the composition.')}</pre></div></section>
   </div>
 </div>`;
}
function syncFinalInputs(){
 const f=ST.final;
 f.markdown=$('#p11FinalMd')?.value??f.markdown;f.data=$('#p11FinalData')?.value??f.data;f.mermaid=$('#p11FinalMermaid')?.value??f.mermaid;f.worker=$('#p11FinalWorker')?.value??f.worker;saveState();
}
async function runFinal(){
 syncFinalInputs();const f=ST.final,start=performance.now();
 const state={at:now(),markdown:false,data:false,diagram:false,worker:false,ok:false};
 const status=$('#p11FinalStatus');if(status)status.innerHTML='<div class="alert system"><div class="at">[!RUNNING]</div>Compiling independent stages…</div>';
 try{
   let html;
   if(typeof window.markdownit==='function')html=window.markdownit({html:true,linkify:true,typographer:false}).render(f.markdown);
   else html='<pre>'+esc(f.markdown)+'</pre>';
   if(window.DOMPurify)html=window.DOMPurify.sanitize(html);
   state.markdown=true;state.html=html;
   const ds=parseTypedTable(f.data);state.data=true;state.dataHtml=renderTypedTable(ds);
   const dm=diagramMeta(f.mermaid);state.diagram=true;state.diagramText=JSON.stringify(dm,null,2);
   const wr=await runIsolatedWorker(f.worker,ds.rows);state.worker=true;state.workerText=JSON.stringify(wr,null,2);
   state.ok=true;state.ms=+(performance.now()-start).toFixed(2);f.runs++;f.last=state;saveState();grant('Final Form Composer');
   renderCustomLab(true);toast('Final Form compiled in '+state.ms+' ms');
 }catch(e){
   state.error=String(e?.message||e);state.ms=+(performance.now()-start).toFixed(2);f.last=state;saveState();renderCustomLab(true);
 }
}
function exportFinal(){
 syncFinalInputs();const payload={format:'markdown-lab-final-form',version:1,exportedAt:now(),composition:{markdown:ST.final.markdown,data:ST.final.data,mermaid:ST.final.mermaid,worker:ST.final.worker},last:ST.final.last};
 const a=document.createElement('a');a.href=URL.createObjectURL(new Blob([JSON.stringify(payload,null,2)],{type:'application/json'}));a.download='markdown-lab-final-form.json';a.click();setTimeout(()=>URL.revokeObjectURL(a.href),500);
}
function bindFinal(){
 ['#p11FinalMd','#p11FinalData','#p11FinalMermaid','#p11FinalWorker'].forEach(s=>$(s)?.addEventListener('change',syncFinalInputs));
 $('#p11RunFinal')?.addEventListener('click',runFinal);
 $('#p11ResetFinal')?.addEventListener('click',()=>{ST.final={...ST.final,...FINAL_DEFAULT,last:null};saveState();renderCustomLab(true)});
 $('#p11ExportFinal')?.addEventListener('click',exportFinal);
}

function renderCustomLab(force=false){
 if(customRendering)return;
 const id=currentLab();if(!['11','12'].includes(id))return;
 const view=$('#view'),li=$('#li'),lt=$('#lt'),lk=$('#lk'),lb=$('#lb');if(!view)return;
 if(!force&&view.dataset.p11===id)return;
 customRendering=true;
 try{
   if(id==='11'){if(li)li.textContent='11 · CHAOS';if(lt)lt.textContent='Chaos & Recovery Control Room';if(lk)lk.textContent='Inject controlled failures, restore known-good state, and certify recovery without corrupting core progress.';if(lb)lb.textContent='LIVE · P11';view.innerHTML=chaosHTML();view.dataset.p11='11';bindChaos()}
   else{if(li)li.textContent='12 · FINAL FORM';if(lt)lt.textContent='Executable Final Form Composer';if(lk)lk.textContent='Compose Markdown parsing, typed data, diagram metadata, and isolated Worker computation into one inspectable pipeline.';if(lb)lb.textContent='LIVE · P11';view.innerHTML=finalHTML();view.dataset.p11='12';bindFinal()}
 }finally{customRendering=false}
}
function restoreScenarioBanner(){
 const id=currentLab();if(!id||['11','12'].includes(id))return;
 const s=SCENARIOS.find(x=>x.id===ST.lastScenario&&x.lab===id);if(s)showScenarioBanner(s);
}
function watch(){
 const target=$('.stage')||document.body;
 const mo=new MutationObserver(()=>{clearTimeout(observerTimer);observerTimer=setTimeout(()=>{updateGrid();renderCustomLab();restoreScenarioBanner();syncCoreAchievements()},15)});
 mo.observe(target,{childList:true,subtree:true});
 window.addEventListener('hashchange',()=>setTimeout(()=>{updateGrid();renderCustomLab(true);restoreScenarioBanner()},30));
 document.addEventListener('click',e=>{const b=e.target.closest?.('[data-lab]');if(b)setTimeout(()=>{updateGrid();renderCustomLab(true);restoreScenarioBanner()},25)},true);
}
function boot(){
 injectStyle();updateHero();updateGrid();ensureHome();renderCustomLab(true);restoreScenarioBanner();syncCoreAchievements();watch();
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot,{once:true});else boot();
})();