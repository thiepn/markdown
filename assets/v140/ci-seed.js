(()=>{'use strict';
const q=new URLSearchParams(location.search);if(!q.has('v140-ci'))return;
const now=Date.now();
localStorage.setItem('markdown-lab:v130-learning',JSON.stringify({level:'beginner',challenge:false,attempts:0,completed:{'01':{beginner:true,intermediate:true,advanced:true},'02':{beginner:true},'03':{beginner:true,intermediate:true}}}));
localStorage.setItem('markdown-lab:v140-mastery',JSON.stringify({version:1,createdAt:now,reviews:{'01':{count:0,lastReviewedAt:null,nextDueAt:now-1000}},checks:{},activeReview:null}));
window.__V140_CI_SEEDED__=true;
})();