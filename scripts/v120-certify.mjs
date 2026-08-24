import fs from 'node:fs';
import crypto from 'node:crypto';
import vm from 'node:vm';

const read=p=>fs.readFileSync(p,'utf8');
const assert=(ok,msg)=>{if(!ok)throw new Error(msg);console.log('PASS · '+msg)};
const gitBlobSha=s=>{const b=Buffer.from(s,'utf8');return crypto.createHash('sha1').update(Buffer.concat([Buffer.from(`blob ${b.length}\0`),b])).digest('hex')};

const workbench=read('assets/v120/workbench.js');
const browserGate=read('assets/v120/certify.js');
new vm.Script(workbench,{filename:'v120-workbench.js'});console.log('PASS · v1.2.0 workbench JavaScript parses');
new vm.Script(browserGate,{filename:'v120-certify.js'});console.log('PASS · v1.2.0 browser gate JavaScript parses');

for(const token of ['v120-workbench','v120LabMeta','v120Back','LABS','Back to laboratories','#ed','#preview','prefers-reduced-motion'])assert(workbench.includes(token),`workbench source contains '${token}'`);
for(const id of Array.from({length:13},(_,i)=>String(i).padStart(2,'0')))assert(workbench.includes(`'${id}':`),`workbench defines Lab ${id} context`);
assert(browserGate.includes('V120_WORKBENCH_CERTIFIED'),'browser gate exposes exact v1.2.0 certification token');
for(const check of ['Dedicated workbench frame','All 13 active-lab contexts','Readable Markdown editor','Readable result surface','Usable control targets','Cross-lab result containment','Responsive containment'])assert(browserGate.includes(check),`browser gate includes '${check}'`);

const loader=read('index.html');
const p11=loader.indexOf('assets/p11/showcase.js');
const v101=loader.indexOf('assets/v101/interaction.js');
const lab03=loader.indexOf('assets/v101/lab03-fix.js');
const stability=loader.indexOf('assets/v110/lab03-stability.js');
const v110=loader.indexOf('assets/v110/usability.js');
const v120=loader.indexOf('assets/v120/workbench.js');
const v120Gate=loader.indexOf('assets/v120/certify.js');
const v110Gate=loader.indexOf('assets/v110/certify.js');
const v101Gate=loader.indexOf('assets/v101/certify.js');
const p12=loader.indexOf('assets/p12/certify.js');
assert(p11>=0&&v101>p11&&lab03>v101&&stability>lab03&&v110>stability&&v120>v110&&v120Gate>v120&&v110Gate>v120Gate&&v101Gate>v110Gate&&p12>v101Gate,'loader order applies v1.2.0 after v1.1.0 and before regression gates');
assert(loader.includes('2c11ea2a4ec7f508d4503f7aebdfe35f10baf0d8cb73db213b5f9b177b469f1a'),'loader preserves certified P10 runtime hash');

const manifest=JSON.parse(read('release/v1.2.0-manifest.json'));
assert(manifest.version==='1.2.0','v1.2.0 manifest version is correct');
assert(manifest.release_gate==='V120_WORKBENCH_CERTIFIED','v1.2.0 manifest pins workbench certification gate');
assert(['certified-release-candidate','released'].includes(manifest.release_state),'v1.2.0 release state is valid');
assert(manifest.runtime_baseline.p10_sha256==='2c11ea2a4ec7f508d4503f7aebdfe35f10baf0d8cb73db213b5f9b177b469f1a','v1.2.0 preserves P10 baseline');
assert(manifest.runtime_baseline.v120_workbench_git_blob_sha1===gitBlobSha(workbench),'manifest pins v1.2.0 workbench source Git blob');
assert(manifest.runtime_baseline.v120_browser_gate_git_blob_sha1===gitBlobSha(browserGate),'manifest pins v1.2.0 browser gate Git blob');
assert(manifest.coverage.labs===13&&manifest.coverage.workbench_browser_checks===8,'manifest records complete workbench coverage');
assert(fs.existsSync('V120_RELEASE.md'),'v1.2.0 release handoff exists');
assert(read('CHANGELOG.md').includes('1.2.0 — Workbench UX & Visual Design Reconstruction'),'v1.2.0 changelog entry exists');

const report={gate:'V120_REPOSITORY_CERTIFIED',version:'1.2.0',release_state:manifest.release_state,workbench_git_blob_sha1:gitBlobSha(workbench),browser_gate_git_blob_sha1:gitBlobSha(browserGate),labs:13,browser_checks:8,checked_at:new Date().toISOString()};
fs.mkdirSync('artifacts',{recursive:true});fs.writeFileSync('artifacts/v120-static-report.json',JSON.stringify(report,null,2)+'\n');
console.log('\nv1.2.0 WORKBENCH REPOSITORY CERTIFICATION: PASS');
console.log(JSON.stringify(report,null,2));
