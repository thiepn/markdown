import fs from 'node:fs';
import crypto from 'node:crypto';
import vm from 'node:vm';

const read=p=>fs.readFileSync(p,'utf8');
const assert=(ok,msg)=>{if(!ok)throw new Error(msg);console.log('PASS · '+msg)};
const gitBlobSha=s=>{const b=Buffer.from(s,'utf8');return crypto.createHash('sha1').update(Buffer.concat([Buffer.from(`blob ${b.length}\0`),b])).digest('hex')};
const sleep=ms=>new Promise(r=>setTimeout(r,ms));
async function fetchLive(url,needles,label){const required=Array.isArray(needles)?needles:[needles];let last='not attempted';for(let attempt=1;attempt<=12;attempt++){try{const r=await fetch(url,{redirect:'follow',cache:'no-store',headers:{'user-agent':'MARKDOWN-LAB-v140-certifier'}});const text=await r.text();last=`HTTP ${r.status} · ${r.url}`;if(r.ok&&required.every(n=>text.includes(n))){console.log(`PASS · live ${label} · ${r.url}`);return{url:r.url,status:r.status,bytes:Buffer.byteLength(text)}}}catch(e){last=String(e?.message||e)}if(attempt<12)await sleep(5000)}throw new Error(`live ${label} failed after retries: ${last}`)}

const mastery=read('assets/v140/mastery.js');
const browserGate=read('assets/v140/certify.js');
new vm.Script(mastery,{filename:'v140-mastery.js'});console.log('PASS · v1.4.0 mastery JavaScript parses');
new vm.Script(browserGate,{filename:'v140-certify.js'});console.log('PASS · v1.4.0 browser gate JavaScript parses');

for(const token of ['markdown-lab:v140-mastery','markdown-lab:v130-learning','WEIGHTS={beginner:20,intermediate:35,advanced:45}','REVIEW_DAYS=[7,14,30]','v140Mastery','v140Queue','v140ReviewBar','Verify review','Export progress','Reset review history','__V140_MASTERY__'])assert(mastery.includes(token),`mastery source contains '${token}'`);
for(const id of Array.from({length:13},(_,i)=>String(i).padStart(2,'0')))assert(mastery.includes(`'${id}':`),`mastery source defines Lab ${id}`);
assert(mastery.includes("check.click()")&&mastery.includes("dataset.status==='pass'"),'review verification delegates to the real v1.3 grader');
assert(browserGate.includes('V140_MASTERY_CERTIFIED'),'browser gate exposes exact v1.4.0 certification token');
for(const check of ['Mastery dashboard','All 13 lab mastery rows','Weighted mastery model','Progress summary','Weak-skill review queue','Mastered-lab review schedule','Review launches real lab','v1.3 grader review bridge','Per-lab practice confidence','Spaced review cadence','Progress export payload','Review reset preserves exercises','Lab mastery decoration','Responsive containment'])assert(browserGate.includes(check),`browser gate includes '${check}'`);

const loader=read('index.html');
const v130=loader.indexOf('assets/v130/learning.js'),grade=loader.indexOf('assets/v130/grading-fix.js'),v140=loader.indexOf('assets/v140/mastery.js'),v140Gate=loader.indexOf('assets/v140/certify.js'),v130Gate=loader.indexOf('assets/v130/certify.js'),v120Gate=loader.indexOf('assets/v120/certify.js'),p12=loader.indexOf('assets/p12/certify.js');
assert(v130>=0&&grade>v130&&v140>grade&&v140Gate>v140&&v130Gate>v140Gate&&v120Gate>v130Gate&&p12>v120Gate,'loader applies mastery after v1.3 grading and before all certification gates');
assert(loader.includes('2c11ea2a4ec7f508d4503f7aebdfe35f10baf0d8cb73db213b5f9b177b469f1a'),'loader preserves certified P10 runtime hash');

const manifest=JSON.parse(read('release/v1.4.0-manifest.json'));
assert(manifest.version==='1.4.0','v1.4.0 manifest version is correct');
assert(manifest.release_gate==='V140_MASTERY_CERTIFIED','v1.4.0 manifest pins mastery certification gate');
assert(['certified-release-candidate','released'].includes(manifest.release_state),'v1.4.0 release state is valid');
assert(manifest.runtime_baseline.p10_sha256==='2c11ea2a4ec7f508d4503f7aebdfe35f10baf0d8cb73db213b5f9b177b469f1a','v1.4.0 preserves P10 baseline');
assert(manifest.runtime_baseline.v140_mastery_git_blob_sha1===gitBlobSha(mastery),'manifest pins v1.4.0 mastery source Git blob');
assert(manifest.runtime_baseline.v140_browser_gate_git_blob_sha1===gitBlobSha(browserGate),'manifest pins v1.4.0 browser gate Git blob');
assert(manifest.coverage.labs===13&&manifest.coverage.exercises===39&&manifest.coverage.browser_mastery_checks===14,'manifest records complete mastery coverage');
assert(Array.isArray(manifest.review_cadence_days)&&manifest.review_cadence_days.join(',')==='7,14,30','manifest records review cadence');
assert(fs.existsSync('V140_RELEASE.md'),'v1.4.0 release handoff exists');
assert(read('CHANGELOG.md').includes('1.4.0 — Learning Progress, Mastery & Review Reconstruction'),'v1.4.0 changelog entry exists');

let live=null;
if(manifest.release_state==='released'){
 assert(fs.existsSync('release/V140_RELEASED.txt'),'guarded V140_RELEASED marker exists');
 const base=manifest.deployment_url;
 const home=await fetchLive(base,['assets/v140/mastery.js','assets/v140/certify.js'],'v1.4.0 deployed loader');
 const masteryLive=await fetchLive(new URL('assets/v140/mastery.js',base).href,['markdown-lab:v140-mastery','REVIEW_DAYS=[7,14,30]','Verify review'],'v1.4.0 mastery asset');
 const gateLive=await fetchLive(new URL('assets/v140/certify.js',base).href,'V140_MASTERY_CERTIFIED','v1.4.0 browser gate asset');
 live={home,mastery:masteryLive,browser_gate:gateLive};
}

const report={gate:'V140_REPOSITORY_CERTIFIED',version:'1.4.0',release_state:manifest.release_state,mastery_git_blob_sha1:gitBlobSha(mastery),browser_gate_git_blob_sha1:gitBlobSha(browserGate),labs:13,exercises:39,review_cadence_days:[7,14,30],browser_checks:14,live,checked_at:new Date().toISOString()};
fs.mkdirSync('artifacts',{recursive:true});fs.writeFileSync('artifacts/v140-static-report.json',JSON.stringify(report,null,2)+'\n');
console.log('\nv1.4.0 MASTERY REPOSITORY CERTIFICATION: PASS');
console.log(JSON.stringify(report,null,2));