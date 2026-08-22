import fs from 'node:fs';
import crypto from 'node:crypto';
import zlib from 'node:zlib';
import vm from 'node:vm';

const read=p=>fs.readFileSync(p,'utf8');
const assert=(ok,msg)=>{if(!ok)throw new Error(msg);console.log('PASS · '+msg)};
const hash=s=>crypto.createHash('sha256').update(Buffer.from(s,'utf8')).digest('hex');
const gunzip64=s=>zlib.gunzipSync(Buffer.from(s,'base64')).toString('utf8');
const join=paths=>paths.map(p=>read(p).trim()).join('');
const sleep=ms=>new Promise(r=>setTimeout(r,ms));

async function fetchLive(url,needle,label){
  let last='not attempted';
  for(let attempt=1;attempt<=12;attempt++){
    try{
      const r=await fetch(url,{redirect:'follow',cache:'no-store',headers:{'user-agent':'MARKDOWN-LAB-v1-release-certifier'}});
      const text=await r.text();
      last=`HTTP ${r.status} · ${r.url}`;
      if(r.ok&&text.includes(needle)){
        console.log(`PASS · live ${label} · ${r.url}`);
        return {url:r.url,status:r.status,bytes:Buffer.byteLength(text)};
      }
    }catch(e){last=String(e?.message||e)}
    if(attempt<12)await sleep(5000);
  }
  throw new Error(`live ${label} failed after retries: ${last}`);
}

const p7=[...Array.from({length:26},(_,i)=>`assets/p7/runtime/payload-${String(i+1).padStart(2,'0')}.txt`),'assets/p7/runtime/payload-27-1.txt','assets/p7/runtime/payload-27-2.txt',...Array.from({length:3},(_,i)=>`assets/p7/runtime/payload-${i+28}.txt`)];
const p7b=join(p7);
assert(p7b.length===89168,'P7 payload length = 89168');
let html=gunzip64(p7b);
assert(html.length>200000,'P7 runtime reconstructs to substantial HTML');

let b=join(Array.from({length:25},(_,i)=>`assets/p8/runtime/piece-${String(i+1).padStart(2,'0')}.txt`));
assert(b.length===12212,'P8 patch payload length = 12212');
let ops=JSON.parse(gunzip64(b));
for(let i=0;i<ops.length;i++){
  const o=ops[i];
  if(o[0]==='replace'){
    const a=html.indexOf(o[1]);assert(a>=0,`P8 operation ${i+1} replacement target exists`);html=html.slice(0,a)+o[2]+html.slice(a+o[1].length);
  }else{
    const a=html.indexOf(o[1]),z=a<0?-1:html.indexOf(o[2],a);assert(a>=0&&z>=0,`P8 operation ${i+1} bounded target exists`);html=html.slice(0,a)+o[3]+html.slice(z+o[2].length);
  }
}
assert(Buffer.byteLength(html)===245006,'P8 reconstructed byte size = 245006');
assert(hash(html)==='ee34e712f7ed8b64d3ec303252d23abdf4a8ba1bbca637af7ee91d2c65181ced','P8 reconstructed SHA-256 matches release baseline');

b=join(Array.from({length:20},(_,i)=>`assets/p9/runtime/piece-${String(i+1).padStart(2,'0')}.txt`));
assert(b.length===19040,'P9 patch payload length = 19040');
ops=JSON.parse(gunzip64(b));
for(let i=ops.length-1;i>=0;i--){const o=ops[i];assert(Number.isInteger(o[0])&&Number.isInteger(o[1])&&o[0]>=0&&o[1]>=o[0]&&o[1]<=html.length,`P9 operation ${i+1} range valid`);html=html.slice(0,o[0])+o[2]+html.slice(o[1])}
assert(Buffer.byteLength(html)===274928,'P9 reconstructed byte size = 274928');
assert(hash(html)==='2ac93a255cfb6f57a5a3083248fa9e34de9e1810c8fe7c58b54850f10ba082b5','P9 reconstructed SHA-256 matches release baseline');

b=join(Array.from({length:26},(_,i)=>`assets/p10/runtime/piece-${String(i+1).padStart(2,'0')}.txt`));
assert(b.length===25036,'P10 patch payload length = 25036');
ops=JSON.parse(gunzip64(b));
for(let i=ops.length-1;i>=0;i--){const o=ops[i];assert(Number.isInteger(o[0])&&Number.isInteger(o[1])&&o[0]>=0&&o[1]>=o[0]&&o[1]<=html.length,`P10 operation ${i+1} range valid`);html=html.slice(0,o[0])+o[2]+html.slice(o[1])}
assert(Buffer.byteLength(html)===296930,'P10 reconstructed byte size = 296930');
assert(hash(html)==='2c11ea2a4ec7f508d4503f7aebdfe35f10baf0d8cb73db213b5f9b177b469f1a','P10 reconstructed SHA-256 matches release baseline');

const p11=read('assets/p11/showcase.js');
const p12=read('assets/p12/certify.js');
new vm.Script(p11,{filename:'showcase.js'});console.log('PASS · P11 JavaScript parses');
new vm.Script(p12,{filename:'certify.js'});console.log('PASS · P12 JavaScript parses');

const scenarioIds=['system-baseline','parser-specimen','worker-telemetry','polyglot-statistics','math-expression','diagram-pipeline','typed-benchmark','api-error-recovery','browser-worker','terminal-orchestration','component-gallery','chaos-recovery','final-form'];
const compIds=['doc-data-sql','markdown-diagram-final','terminal-chaos','browser-data-worker'];
const chaosIds=['markdown-fence','worker-timeout','mermaid-invalid','data-type-skew','api-http-error','sandbox-storage'];
const expectedLabs=Array.from({length:13},(_,i)=>String(i).padStart(2,'0'));
for(const id of scenarioIds)assert(p11.includes(`id:'${id}'`),`P11 scenario '${id}' present`);
for(const id of compIds)assert(p11.includes(`id:'${id}'`),`P11 composition '${id}' present`);
for(const id of chaosIds){assert(p11.includes(`id:'${id}'`),`P11 chaos mutation '${id}' present`);const at=p11.indexOf(`id:'${id}'`),next=p11.indexOf("\n{id:'",at+5),segment=p11.slice(at,next<0?p11.length:next);assert(segment.includes('apply:')&&segment.includes('recover:'),`P11 '${id}' has inject and recovery hooks`)}
assert((p11.match(/data-p11-scenario/g)||[]).length>=1,'P11 scenario controls are rendered');
const labIds=[...new Set([...p11.matchAll(/lab:'(\d\d)'/g)].map(m=>m[1]))].sort();
assert(JSON.stringify(labIds)===JSON.stringify(expectedLabs),'P11 scenario catalog covers labs 00–12 exactly once or more');
assert(p11.includes("grant('Chaos Engineer')"),'Chaos Engineer has concrete unlock path');
assert(p11.includes("grant('Final Form Composer')"),'Final Form Composer has concrete unlock path');
assert(p12.includes('P12_RELEASE_CERTIFIED'),'P12 browser gate exposes certification token');
for(const id of chaosIds)assert(p12.includes(`'${id}'`),`P12 browser suite covers chaos mutation '${id}'`);

for(const id of ['ed','js','timeout','mermaidSource','dataSource','apiExample'])assert(html.includes(`id="${id}"`)||html.includes(`id='${id}'`),`P10 target #${id} exists for P11 recovery`);
assert(p12.includes("['13-lab navigation',navigation]"),'Rendered 13-lab navigation is delegated to the browser certification gate');

const loader=read('index.html');
assert(loader.includes('Loading P12'),'Loader identifies P12');
const i11=loader.indexOf('assets/p11/showcase.js'),i12=loader.indexOf('assets/p12/certify.js');
assert(i11>=0&&i12>i11,'Loader injects P11 before P12');
assert(loader.includes('2c11ea2a4ec7f508d4503f7aebdfe35f10baf0d8cb73db213b5f9b177b469f1a'),'Loader retains exact P10 checksum');

const manifest=JSON.parse(read('release/p12-manifest.json'));
assert(manifest.phase==='P12','Release manifest phase is P12');
assert(manifest.version==='1.0.0-rc.1','Release candidate version is 1.0.0-rc.1');
assert(manifest.baselines.P10.sha256==='2c11ea2a4ec7f508d4503f7aebdfe35f10baf0d8cb73db213b5f9b177b469f1a','Manifest pins P10 runtime hash');
assert(manifest.gate==='P12_RELEASE_CERTIFIED','Manifest defines exact certification gate');
assert(fs.existsSync('P12_RELEASE.md'),'P12 release handoff exists');
assert(fs.existsSync('.github/workflows/p12-certification.yml'),'P12 GitHub Actions workflow exists');

const v1=JSON.parse(read('release/v1.0.0-manifest.json'));
assert(v1.version==='1.0.0','v1 release manifest version is 1.0.0');
assert(['V1_PROMOTION_READY','V1_RELEASED'].includes(v1.release_gate),'v1 release gate is a valid promotion state');
assert(v1.canonical_branch==='main','v1 canonical branch is main');
assert(v1.runtime_baseline.p10_sha256==='2c11ea2a4ec7f508d4503f7aebdfe35f10baf0d8cb73db213b5f9b177b469f1a','v1 manifest pins certified P10 runtime hash');
assert(v1.certified_candidate.sha==='bf596ecb3b991b94b2b338ed151e655cc73eb393','v1 manifest records frozen P12 certification source');
assert(fs.existsSync('V1_RELEASE.md'),'v1 release promotion handoff exists');
assert(fs.existsSync('CHANGELOG.md'),'v1 changelog exists');
const workflow=read('.github/workflows/p12-certification.yml');
assert(workflow.includes('- main'),'Certification workflow covers main branch promotion');

let live=null;
if(v1.release_gate==='V1_RELEASED'){
  assert(fs.existsSync('release/V1_RELEASED.txt'),'guarded V1_RELEASED marker exists');
  const base=v1.live_verification.github_pages_url;
  const home=await fetchLive(base,v1.live_verification.required_loader_marker,'GitHub Pages loader');
  const p11Live=await fetchLive(new URL('assets/p11/showcase.js',base).href,"id:'system-baseline'",'P11 showcase asset');
  const p12Live=await fetchLive(new URL('assets/p12/certify.js',base).href,'P12_RELEASE_CERTIFIED','P12 certification asset');
  live={home,p11:p11Live,p12:p12Live};
}

const report={gate:'REPOSITORY_CERTIFIED',phase:'P12',version:manifest.version,release_version:v1.version,release_gate:v1.release_gate,p10_sha256:hash(html),p11_sha256:hash(p11),p12_sha256:hash(p12),scenarios:scenarioIds.length,compositions:compIds.length,chaos:chaosIds.length,live,checked_at:new Date().toISOString()};
fs.mkdirSync('artifacts',{recursive:true});fs.writeFileSync('artifacts/p12-static-report.json',JSON.stringify(report,null,2)+'\n');
console.log('\nP12 REPOSITORY CERTIFICATION: PASS');
console.log(JSON.stringify(report,null,2));
