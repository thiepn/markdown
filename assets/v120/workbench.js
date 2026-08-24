(()=>{'use strict';
const $=(s,r=document)=>r.querySelector(s),$$=(s,r=document)=>[...r.querySelectorAll(s)];
const sleep=ms=>new Promise(r=>setTimeout(r,ms));
const LABS={
'00':['System','Inspect browser capabilities, runtime support, and the environment behind the playground.'],
'01':['Markdown Parser','Write Markdown, render it immediately, and inspect the real browser preview.'],
'02':['Code Runtime','Run JavaScript in an isolated Worker and inspect structured execution output.'],
'03':['Polyglot','Use the built-in WebAssembly demo or explicitly load Python, SQLite, and Lua runtimes.'],
'04':['Math','Evaluate expressions and inspect numeric and typeset mathematical results.'],
'05':['Mermaid','Turn diagram source into a rendered Mermaid visualization.'],
'06':['Data','Promote Markdown tables and structured text into typed, inspectable data.'],
'07':['API','Send deterministic requests, inspect responses, and exercise recovery behavior.'],
'08':['Browser','Experiment with native browser primitives such as dedicated Workers.'],
'09':['Terminal','Use the application command shell to inspect and orchestrate laboratory state.'],
'10':['UI Components','Inspect interface components and run the built-in accessibility audit.'],
'11':['Chaos','Inject controlled failures, recover them, and verify the application remains stable.'],
'12':['Final Form','Compose Markdown, data, diagrams, and compute into one end-to-end result.']
};
function labId(){return ($('#li')?.textContent.match(/\b(\d\d)\b/)||[])[1]||'00'}
function stage(){return $('#view')?.closest('section.stage')||$('#view')?.parentElement}
function nav(){return $('#grid')?.closest('section')}
function injectStyle(){if($('#v120Style'))return;const s=document.createElement('style');s.id='v120Style';s.textContent=`
:root{--v120-rule:color-mix(in srgb,var(--b) 82%,transparent);--v120-soft:color-mix(in srgb,var(--p) 88%,var(--bg));--v120-focus:color-mix(in srgb,var(--a) 70%,white)}
section.stage.v120-workbench{scroll-margin-top:14px;border-top:1px solid var(--v120-rule);border-bottom:1px solid var(--v120-rule);background:linear-gradient(180deg,color-mix(in srgb,var(--p) 94%,var(--bg)),var(--bg));padding-top:0}
.v120-meta{display:flex;align-items:flex-start;justify-content:space-between;gap:18px;padding:15px 18px 14px;border-bottom:1px solid var(--v120-rule);background:var(--v120-soft)}
.v120-context{min-width:0}.v120-kicker{display:flex;align-items:center;gap:8px;color:var(--a);font:800 10px/1.2 var(--mono);letter-spacing:.09em;text-transform:uppercase;margin-bottom:6px}.v120-number{display:inline-flex;align-items:center;justify-content:center;min-width:28px;height:22px;border:1px solid color-mix(in srgb,var(--a) 50%,var(--b));padding:0 5px;color:var(--a)}.v120-context h2{margin:0;color:var(--t);font-size:clamp(18px,2vw,24px);line-height:1.18;letter-spacing:-.02em}.v120-context p{margin:6px 0 0;max-width:760px;color:var(--m);font-size:13px;line-height:1.55}.v120-back{flex:0 0 auto;border:1px solid var(--b);background:transparent;color:var(--t);padding:9px 11px;min-height:38px;font:800 10px/1 var(--mono);letter-spacing:.04em;cursor:pointer}.v120-back:hover{border-color:var(--a);color:var(--a)}
.v120-workbench .stagehead{padding-top:18px}.v120-workbench .stagehead h2,.v120-workbench .stagehead h3{letter-spacing:-.015em}.v120-workbench .lead,.v120-workbench p{line-height:1.58}
#view{font-size:14px;line-height:1.55}#view label,#view .label,#view .v101-k{letter-spacing:.045em}#view input,#view select,#view textarea,#view button{box-sizing:border-box}#view input,#view select,#view textarea{font-size:14px;line-height:1.5}#view button,.v101-dock button{min-height:38px}#view textarea{resize:vertical;tab-size:2}
#ed,#js,#polyEd,#mermaidSource,#dataSource{min-height:280px!important;font:14px/1.62 var(--mono)!important;padding:13px!important}
#preview,#codeOut,#polyOutput,#mathOutput,#mermaidCanvas,#dataOutput,#apiResponse,#workerOut,#termLog,#uiAuditResults{min-height:108px;max-width:100%;overflow:auto;overflow-wrap:anywhere;scrollbar-gutter:stable}
#preview{font-size:15px;line-height:1.65}#preview h1,#preview h2,#preview h3{line-height:1.25}#preview table{font-size:13px}#codeOut,#polyOutput,#apiResponse,#workerOut,#termLog,#uiAuditResults{font-size:13px;line-height:1.58}
#view pre,#view code{font-family:var(--mono);line-height:1.58}#view pre{max-width:100%;overflow:auto;white-space:pre-wrap;overflow-wrap:anywhere}
.v101-dock{border-top:1px solid var(--v120-rule);border-bottom:1px solid var(--v120-rule)}.v101-main small,.v101-route small{line-height:1.45}.v101-result{outline-offset:3px}
.v120-workbench :is(button,input,select,textarea,a):focus-visible{outline:2px solid var(--v120-focus)!important;outline-offset:2px!important}.v120-workbench :disabled{cursor:not-allowed;opacity:.55}
@media(max-width:760px){section.stage.v120-workbench{margin-left:0;margin-right:0}.v120-meta{padding:13px 12px;gap:10px;flex-direction:column}.v120-context p{font-size:12px}.v120-back{width:100%;min-height:42px}#view{font-size:14px}#view button,.v101-dock button{min-height:42px}#ed,#js,#polyEd,#mermaidSource,#dataSource{min-height:210px!important;font-size:13px!important;padding:11px!important}#preview,#codeOut,#polyOutput,#mathOutput,#mermaidCanvas,#dataOutput,#apiResponse,#workerOut,#termLog,#uiAuditResults{min-height:96px}.v101-main,.v101-route{gap:10px}}
@media(prefers-reduced-motion:reduce){.v120-workbench *{scroll-behavior:auto!important;transition-duration:.01ms!important;animation-duration:.01ms!important;animation-iteration-count:1!important}}
`;document.head.append(s)}
function ensureMeta(){const st=stage();if(!st)return null;st.classList.add('v120-workbench');let m=$('#v120LabMeta');if(!m){m=document.createElement('div');m.id='v120LabMeta';m.className='v120-meta';m.innerHTML='<div class="v120-context"><div class="v120-kicker">LABORATORY <span id="v120LabNumber" class="v120-number">00</span></div><h2 id="v120LabTitle">System</h2><p id="v120LabDescription"></p></div><button type="button" id="v120Back" class="v120-back">Back to laboratories</button>';st.insertAdjacentElement('afterbegin',m);$('#v120Back').addEventListener('click',()=>{const n=nav();n?.scrollIntoView({behavior:'smooth',block:'start'});setTimeout(()=>$('#v110Search')?.focus({preventScroll:true}),180)})}return m}
function refresh(){const m=ensureMeta();if(!m)return false;const id=labId(),info=LABS[id]||['Laboratory','Use the active controls below and inspect the visible result.'];$('#v120LabNumber').textContent=id;$('#v120LabTitle').textContent=info[0];$('#v120LabDescription').textContent=info[1];stage()?.setAttribute('data-v120-lab',id);return true}
function bind(){document.addEventListener('click',e=>{if(e.target.closest?.('[data-lab]')||e.target.closest?.('[data-p11-scenario]')||e.target.closest?.('[data-p11-comp]')){setTimeout(refresh,0);setTimeout(refresh,140)}},false);document.addEventListener('v120:refresh',refresh)}
async function boot(){injectStyle();for(let i=0;i<200&&!($('#grid')&&$('#view')&&window.__V110_USABILITY__);i++)await sleep(40);if(!$('#view'))return;ensureMeta();refresh();bind();window.__V120_WORKBENCH__={version:'1.2.0',refresh,getState:()=>({lab:labId(),title:LABS[labId()]?.[0]||null,stage:!!stage(),meta:!!$('#v120LabMeta')}),labs:JSON.parse(JSON.stringify(LABS))}}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot,{once:true});else boot();
})();
