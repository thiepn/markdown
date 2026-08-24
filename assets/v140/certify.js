(()=>{'use strict';
const $=(s,r=document)=>r.querySelector(s),$$=(s,r=document)=>[...r.querySelectorAll(s)],sleep=ms=>new Promise(r=>setTimeout(r,ms));
const CI=new URLSearchParams(location.search).has('v140-ci');if(!CI)return;
const LEARN='markdown-lab:v130-learning',KEY='markdown-lab:v140-mastery';
const checks=[];function add(name,pass,detail=''){checks.push({name,pass:!!pass,detail});console.log(`${pass?'PASS':'FAIL'} · v1.4.0 · ${name}${detail?' · '+detail:''}`)}
async function wait(fn,ticks=120,ms=50){for(let i=0;i<ticks;i++){try{const v=fn();if(v)return v}catch{}await sleep(ms)}return null}
function renderResult(){let n=$('#v140CiResult');if(!n){n=document.createElement('pre');n.id='v140CiResult';n.style.cssText='position:fixed;left:-10000px;top:0;white-space:pre-wrap';document.body.append(n)}const pass=checks.every(x=>x.pass);n.dataset.status=pass?'pass':'fail';n.textContent=`${pass?'V140_MASTERY_CERTIFIED':'V140_MASTERY_FAILED'}\n${checks.map(x=>`${x.pass?'PASS':'FAIL'} · ${x.name}${x.detail?' · '+x.detail:''}`).join('\n')}`}
async function run(){
 const api=await wait(()=>window.__V140_MASTERY__);if(!api){add('Mastery engine available',false);renderResult();return}
 localStorage.setItem(LEARN,JSON.stringify({level:'beginner',challenge:false,attempts:0,completed:{'01':{beginner:true,intermediate:true,advanced:true},'02':{beginner:true},'03':{beginner:true,intermediate:true}}}));
 localStorage.setItem(KEY,JSON.stringify({version:1,createdAt:Date.now(),reviews:{'01':{count:0,lastReviewedAt:null,nextDueAt:Date.now()-1000}},checks:{},activeReview:null}));
 api.refresh();await sleep(120);
 add('Mastery dashboard',!!$('#v140Mastery')&&$$('#v140Metrics .v140-metric').length===4);
 $('#v140Toggle')?.click();await sleep(50);add('All 13 lab mastery rows',$$('[data-v140-lab]').length===13,`${$$('[data-v140-lab]').length}/13`);
 const s=api.summary();add('Weighted mastery model',api.mastery('01')===100&&api.mastery('02')===20&&api.mastery('03')===55,`100 / 20 / 55`);
 add('Progress summary',s.exercises===6&&s.labsStarted===3&&s.labsMastered===1&&s.mastery===13,`${s.exercises}/39 · ${s.mastery}%`);
 const q=api.queue();add('Weak-skill review queue',q.length>=3&&q[0].id==='02'&&q[0].level==='intermediate'&&q.some(x=>x.id==='01'&&x.mode==='review'),q.map(x=>x.id+':'+x.mode).join(','));
 add('Mastered-lab review schedule',api.status('01').key==='review-due'&&q.some(x=>x.id==='01'));
 const opened=await api.beginReview('02');await sleep(180);add('Review launches real lab',opened&&$('#v130Practice')?.dataset.lab==='02'&&$('[data-v130-level="intermediate"]')?.classList.contains('on'),$('#v130Practice')?.dataset.lab||'none');
 add('v1.3 grader review bridge',!!$('#v140ReviewBar')&&!!$('#v140Verify')&&!!$('#v130Check'));
 api.recordCheck('02',false);api.recordCheck('02',true);add('Per-lab practice confidence',api.confidence('02')===50,`${api.confidence('02')}%`);
 const base=Date.now(),r=api.completeReview('01',base),delta=Math.round((r.nextDueAt-base)/86400000);add('Spaced review cadence',r.count===1&&delta===14,`${delta} days`);
 const ex=api.exportObject();add('Progress export payload',ex.version==='1.4.0'&&ex.learning.completed['01'].advanced===true&&ex.mastery.reviews['01'].count===1);
 const before=JSON.parse(localStorage.getItem(LEARN));api.resetReviewHistory();const after=JSON.parse(localStorage.getItem(LEARN));add('Review reset preserves exercises',before.completed['01'].advanced===after.completed['01'].advanced&&Object.keys(api.getState().checks).length===0);
 api.refresh();add('Lab mastery decoration',$$('[data-lab][data-v140-mastery]').length>=13&&$('[data-lab="01"]')?.dataset.v140Mastery==='100');
 const overflow=document.documentElement.scrollWidth-document.documentElement.clientWidth;add('Responsive containment',overflow<=2,`${overflow}px overflow`);
 renderResult();
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',()=>setTimeout(run,120),{once:true});else setTimeout(run,120);
})();