import fs from 'node:fs';
import crypto from 'node:crypto';
import vm from 'node:vm';

const read=p=>fs.readFileSync(p,'utf8');
const assert=(ok,msg)=>{if(!ok)throw new Error(msg);console.log('PASS · '+msg)};
const gitBlobSha=s=>{const b=Buffer.from(s,'utf8');return crypto.createHash('sha1').update(Buffer.concat([Buffer.from(`blob ${b.length}\0`),b])).digest('hex')};
const sleep=ms=>new Promise(r=>setTimeout(r,ms));
async function fetchLive(url,needles,label){const required=Array.isArray(needles)?needles:[needles];let last='not attempted';for(let attempt=1;attempt<=12;attempt++){try{const r=await fetch(url,{redirect:'follow',cache:'no-store',headers:{'user-agent':'MARKDOWN-LAB-v130-certifier'}});const text=await r.text();last=`HTTP ${r.status} · ${r.url}`;if(r.ok&&required.every(n=>text.includes(n))){console.log(`PASS · live ${label} · ${r.url}`);return{url:r.url,status:r.status,bytes:Buffer.byteLength(text)}}}catch(e){last=String(e?.message||e)}if(attempt<12)await sleep(5000)}throw new Error(`live ${label} failed after retries: ${last}`)}

const learning=read('assets/v130/learning.js');
const browserGate=read('assets/v130/certify.js');
new vm.Script(learning,{filename:'v130-learning.js'});console.log('PASS · v1.3.0 learning JavaScript parses');
new vm.Script(browserGate,{filename:'v130-certify.js'});console.log('PASS · v1.3.0 browser gate JavaScript parses');

for(const token of ['markdown-lab:v130-learning','beginner','intermediate','advanced','v130Practice','Check my work','Challenge mode','free play','getProgress','nextRecommended'])assert(learning.includes(token),`learning source contains '${token}'`);
for(const id of Array.from({length:13},(_,i)=>String(i).padStart(2,'0')))assert(learning.includes(`'${id}':{goal:`),`learning curriculum defines Lab ${id}`);
for(const level of ['beginner','intermediate','advanced'])assert((learning.match(new RegExp(`${level}:\\[`, 'g'))||[]).length>=13,`learning curriculum defines ${level} exercises across all labs`);
assert(browserGate.includes('V130_LEARNING_CERTIFIED'),'browser gate exposes exact v1.3.0 certification token');
for(const check of ['Optional practice panel','39-exercise curriculum','Three difficulty levels','All labs remain unlocked','Real workbench success check','Progressive difficulty completion','Local progress persistence','Hint and reference support','Challenge mode','Recommended learning path','Responsive containment'])assert(browserGate.includes(check),`browser gate includes '${check}'`);

const loader=read('index.html');
const p11=loader.indexOf('assets/p11/showcase.js');
const v101=loader.indexOf('assets/v101/interaction.js');
const v110=loader.indexOf('assets/v110/usability.js');
const v120=loader.indexOf('assets/v120/workbench.js');
const v130=loader.indexOf('assets/v130/learning.js');
const v130Gate=loader.indexOf('assets/v130/certify.js');
const v120Gate=loader.indexOf('assets/v120/certify.js');
const v110Gate=loader.indexOf('assets/v110/certify.js');
const v101Gate=loader.indexOf('assets/v101/certify.js');
const p12=loader.indexOf('assets/p12/certify.js');
assert(p11>=0&&v101>p11&&v110>v101&&v120>v110&&v130>v120&&v130Gate>v130&&v120Gate>v130Gate&&v110Gate>v120Gate&&v101Gate>v110Gate&&p12>v101Gate,'loader order applies learning after workbench and before regression gates');
assert(loader.includes('2c11ea2a4ec7f508d4503f7aebdfe35f10baf0d8cb73db213b5f9b177b469f1a'),'loader preserves certified P10 runtime hash');

const manifest=JSON.parse(read('release/v1.3.0-manifest.json'));
assert(manifest.version==='1.3.0','v1.3.0 manifest version is correct');
assert(manifest.release_gate==='V130_LEARNING_CERTIFIED','v1.3.0 manifest pins learning certification gate');
assert(['certified-release-candidate','released'].includes(manifest.release_state),'v1.3.0 release state is valid');
assert(manifest.runtime_baseline.p10_sha256==='2c11ea2a4ec7f508d4503f7aebdfe35f10baf0d8cb73db213b5f9b177b469f1a','v1.3.0 preserves P10 baseline');
assert(manifest.runtime_baseline.v130_learning_git_blob_sha1===gitBlobSha(learning),'manifest pins v1.3.0 learning source Git blob');
assert(manifest.runtime_baseline.v130_browser_gate_git_blob_sha1===gitBlobSha(browserGate),'manifest pins v1.3.0 browser gate Git blob');
assert(manifest.coverage.labs===13&&manifest.coverage.difficulty_levels===3&&manifest.coverage.exercises===39&&manifest.coverage.browser_learning_checks===11,'manifest records complete learning coverage');
assert(fs.existsSync('V130_RELEASE.md'),'v1.3.0 release handoff exists');
assert(read('CHANGELOG.md').includes('1.3.0 — Guided Learning & Practice Reconstruction'),'v1.3.0 changelog entry exists');

let live=null;
if(manifest.release_state==='released'){
  assert(fs.existsSync('release/V130_RELEASED.txt'),'guarded V130_RELEASED marker exists');
  const base=manifest.deployment_url;
  const home=await fetchLive(base,['assets/v130/learning.js','assets/v130/certify.js'],'v1.3.0 deployed loader');
  const learningLive=await fetchLive(new URL('assets/v130/learning.js',base).href,['markdown-lab:v130-learning','Check my work','Challenge mode'],'v1.3.0 learning asset');
  const gateLive=await fetchLive(new URL('assets/v130/certify.js',base).href,'V130_LEARNING_CERTIFIED','v1.3.0 browser gate asset');
  live={home,learning:learningLive,browser_gate:gateLive};
}

const report={gate:'V130_REPOSITORY_CERTIFIED',version:'1.3.0',release_state:manifest.release_state,learning_git_blob_sha1:gitBlobSha(learning),browser_gate_git_blob_sha1:gitBlobSha(browserGate),labs:13,levels:3,exercises:39,browser_checks:11,live,checked_at:new Date().toISOString()};
fs.mkdirSync('artifacts',{recursive:true});fs.writeFileSync('artifacts/v130-static-report.json',JSON.stringify(report,null,2)+'\n');
console.log('\nv1.3.0 LEARNING REPOSITORY CERTIFICATION: PASS');
console.log(JSON.stringify(report,null,2));
