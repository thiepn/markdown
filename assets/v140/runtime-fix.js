(()=>{'use strict';
const $=(s,r=document)=>r.querySelector(s),sleep=ms=>new Promise(r=>setTimeout(r,ms));
async function ready(){for(let i=0;i<200&&!window.__V140_MASTERY__;i++)await sleep(40);const api=window.__V140_MASTERY__;if(!api)return;
 const original=api.beginReview;
 api.beginReview=async id=>{original?.(id);for(let i=0;i<80;i++){const p=$('#v130Practice');if(p?.dataset.lab===id){const state=api.getState(),level=state.activeReview?.level||'advanced',b=$(`[data-v130-level="${level}"]`);if(b&&!b.classList.contains('on'))b.click();await sleep(40);return $('#v130Practice')?.dataset.lab===id}await sleep(40)}return false};
 async function verify(){const state=api.getState(),a=state.activeReview,check=$('#v130Check');if(!a||!check)return false;check.click();for(let i=0;i<80;i++){await sleep(50);const f=$('#v130Feedback'),st=f?.dataset.status;if(st==='pass'){api.completeReview(a.lab);return true}if(st==='fail')return false}return false}
 api.verifyActiveReview=verify;
 document.addEventListener('click',e=>{const q=e.target.closest?.('[data-v140-review]');if(q){e.preventDefault();e.stopImmediatePropagation();api.beginReview(q.dataset.v140Review);return}if(e.target.closest?.('#v140Verify')){e.preventDefault();e.stopImmediatePropagation();verify()}},true);
 window.__V140_RUNTIME_FIX__={version:'1.4.0',reviewTargetWait:true,singleCheckTelemetry:true};
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',ready,{once:true});else ready();
})();