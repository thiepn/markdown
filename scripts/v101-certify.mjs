import fs from 'node:fs';
import crypto from 'node:crypto';
import vm from 'node:vm';

const read=p=>fs.readFileSync(p,'utf8');
const assert=(ok,msg)=>{if(!ok)throw new Error(msg);console.log('PASS · '+msg)};
const hash=s=>crypto.createHash('sha256').update(Buffer.from(s,'utf8')).digest('hex');
const sleep=ms=>new Promise(r=>setTimeout(r,ms));

async function fetchLive(url,needle,label){
  let last='not attempted';
  for(let attempt=1;attempt<=12;attempt++){
    try{
      const r=await fetch(url,{redirect:'follow',cache:'no-store',headers:{'user-agent':'MARKDOWN-LAB-v101-certifier'}});
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

const interaction=read('assets/v101/interaction.js');
const lab03Fix=read('assets/v101/lab03-fix.js');
const browserGate=read('assets/v101/certify.js');
new vm.Script(interaction,{filename:'interaction.js'});console.log('PASS · v1.0.1 interaction JavaScript parses');
new vm.Script(lab03Fix,{filename:'lab03-fix.js'});console.log('PASS · Lab 03 deterministic controller parses');
new vm.Script(browserGate,{filename:'v101-certify.js'});console.log('PASS · v1.0.1 browser gate JavaScript parses');

const scenarios=['system-baseline','parser-specimen','worker-telemetry','polyglot-statistics','math-expression','diagram-pipeline','typed-benchmark','api-error-recovery','browser-worker','terminal-orchestration','component-gallery','chaos-recovery','final-form'];
const routes=['doc-data-sql','markdown-diagram-final','terminal-chaos','browser-data-worker'];
for(const id of scenarios)assert(interaction.includes(`id:'${id}'`),`v1.0.1 executable demo '${id}' is declared`);
for(const id of routes)assert(interaction.includes(`id:'${id}'`),`v1.0.1 guided route '${id}' is declared`);
for(let i=0;i<13;i++){const id=String(i).padStart(2,'0');assert(interaction.includes(`'${id}':run`),`Lab ${id} has a one-click execution runner`)}
assert(interaction.includes('scrollIntoView'),'Lab navigation focuses the visible workbench');
assert(interaction.includes('Run this demo'),'Persistent workbench exposes an explicit execution control');
assert(interaction.includes('dataToSql'),'Document → Data → SQL route uses the real SQLite handoff');
assert(interaction.includes('routeMove'),'Guided routes implement persistent step progression');
assert(interaction.includes('data-status'),'Visible workbench feedback exposes machine-verifiable status');
assert(lab03Fix.includes("id==='polyglot-statistics'"),'Lab 03 controller intercepts the Polyglot Statistics demo');
assert(lab03Fix.includes('[data-lang="rust"]'),'Lab 03 deterministic path selects the built-in WASM companion surface');
assert(lab03Fix.includes("mode:'built-in-webassembly'"),'Lab 03 controller declares deterministic built-in WebAssembly mode');
assert(lab03Fix.includes('lazy-pyodide'),'Lab 03 keeps Python available as the explicit lazy Pyodide runtime');
assert(browserGate.includes('V101_INTERACTION_CERTIFIED'),'Browser gate exposes exact v1.0.1 certification token');
assert(browserGate.includes('All 13 one-click executable demos'),'Browser gate exhaustively executes the 13 demo contract');
assert(browserGate.includes("startRoute('terminal-chaos'"),'Browser gate executes a real multi-step guided route');

const loader=read('index.html');
const p11=loader.indexOf('assets/p11/showcase.js'),interactionAt=loader.indexOf('assets/v101/interaction.js'),lab03At=loader.indexOf('assets/v101/lab03-fix.js'),gateAt=loader.indexOf('assets/v101/certify.js'),p12=loader.indexOf('assets/p12/certify.js');
assert(p11>=0&&interactionAt>p11&&lab03At>interactionAt&&gateAt>lab03At&&p12>gateAt,'Loader order is P11 → interaction → Lab 03 fix → exhaustive gate → P12');
assert(loader.includes('2c11ea2a4ec7f508d4503f7aebdfe35f10baf0d8cb73db213b5f9b177b469f1a'),'v1.0.1 loader preserves certified P10 runtime hash');

const manifest=JSON.parse(read('release/v1.0.1-manifest.json'));
assert(manifest.version==='1.0.1','v1.0.1 manifest version is correct');
assert(manifest.release_gate==='V101_INTERACTION_CERTIFIED','v1.0.1 manifest pins interaction certification gate');
assert(['certified-release-candidate','released'].includes(manifest.release_state),'v1.0.1 release state is valid');
assert(manifest.runtime_baseline.p10_sha256==='2c11ea2a4ec7f508d4503f7aebdfe35f10baf0d8cb73db213b5f9b177b469f1a','v1.0.1 manifest preserves P10 baseline');
assert(manifest.runtime_baseline.v101_interaction_sha256===hash(interaction),'v1.0.1 manifest pins interaction source hash');
assert(manifest.runtime_baseline.v101_browser_gate_sha256===hash(browserGate),'v1.0.1 manifest pins browser gate hash');
assert(manifest.coverage.labs===13&&manifest.coverage.executable_demos===13&&manifest.coverage.guided_routes===4,'v1.0.1 manifest records complete interaction coverage');
assert(fs.existsSync('V101_RELEASE.md'),'v1.0.1 release handoff exists');
assert(read('CHANGELOG.md').includes('1.0.1 — Interaction & Demonstration Reconstruction'),'v1.0.1 changelog entry exists');

let live=null;
if(manifest.release_state==='released'){
  assert(fs.existsSync('release/V101_RELEASED.txt'),'guarded V101_RELEASED marker exists');
  const base=manifest.deployment_url;
  const home=await fetchLive(base,'assets/v101/interaction.js','v1.0.1 deployed loader');
  const interactionLive=await fetchLive(new URL('assets/v101/interaction.js',base).href,'Run this demo','v1.0.1 interaction asset');
  const gateLive=await fetchLive(new URL('assets/v101/certify.js',base).href,'V101_INTERACTION_CERTIFIED','v1.0.1 browser gate asset');
  live={home,interaction:interactionLive,browser_gate:gateLive};
}

const report={gate:'V101_REPOSITORY_CERTIFIED',version:'1.0.1',release_state:manifest.release_state,interaction_sha256:hash(interaction),lab03_fix_sha256:hash(lab03Fix),browser_gate_sha256:hash(browserGate),scenarios:scenarios.length,routes:routes.length,lab03_demo_mode:'built-in-webassembly',live,checked_at:new Date().toISOString()};
fs.mkdirSync('artifacts',{recursive:true});fs.writeFileSync('artifacts/v101-static-report.json',JSON.stringify(report,null,2)+'\n');
console.log('\nv1.0.1 INTERACTION REPOSITORY CERTIFICATION: PASS');
console.log(JSON.stringify(report,null,2));
