import fs from 'node:fs';
import crypto from 'node:crypto';
import vm from 'node:vm';

const read=p=>fs.readFileSync(p,'utf8');
const assert=(ok,msg)=>{if(!ok)throw new Error(msg);console.log('PASS · '+msg)};
const gitBlobSha=s=>{const b=Buffer.from(s,'utf8');return crypto.createHash('sha1').update(Buffer.concat([Buffer.from(`blob ${b.length}\0`),b])).digest('hex')};
const usability=read('assets/v110/usability.js');
const browserGate=read('assets/v110/certify.js');
new vm.Script(usability,{filename:'v110-usability.js'});console.log('PASS · v1.1.0 usability JavaScript parses');
new vm.Script(browserGate,{filename:'v110-certify.js'});console.log('PASS · v1.1.0 browser gate JavaScript parses');

for(const token of ['Learn Markdown','v110StartMarkdown','v110GuidedTour','v110FinalForm','v110Search','data-v110-filter','history.replaceState','#lab-'])assert(usability.includes(token),`usability source contains '${token}'`);
for(const category of ['markdown','code','create','web','advanced'])assert(usability.includes(`${category}:`),`lab category '${category}' is declared`);
assert(browserGate.includes('V110_USABILITY_CERTIFIED'),'browser gate exposes exact v1.1.0 certification token');
for(const check of ['Plain-language product entry','Task-first quick starts','Lab search discovery','Category discovery','Guided tour quick start','Responsive containment'])assert(browserGate.includes(check),`browser gate includes '${check}'`);

const loader=read('index.html');
const p11=loader.indexOf('assets/p11/showcase.js');
const v101=loader.indexOf('assets/v101/interaction.js');
const lab03=loader.indexOf('assets/v101/lab03-fix.js');
const v110=loader.indexOf('assets/v110/usability.js');
const v110Gate=loader.indexOf('assets/v110/certify.js');
const v101Gate=loader.indexOf('assets/v101/certify.js');
const p12=loader.indexOf('assets/p12/certify.js');
assert(p11>=0&&v101>p11&&lab03>v101&&v110>lab03&&v110Gate>v110&&v101Gate>v110Gate&&p12>v101Gate,'loader order preserves certified runtime then applies v1.1.0 usability before legacy gates');
assert(loader.includes('2c11ea2a4ec7f508d4503f7aebdfe35f10baf0d8cb73db213b5f9b177b469f1a'),'loader preserves certified P10 runtime hash');

const manifest=JSON.parse(read('release/v1.1.0-manifest.json'));
assert(manifest.version==='1.1.0','v1.1.0 manifest version is correct');
assert(manifest.release_gate==='V110_USABILITY_CERTIFIED','v1.1.0 manifest pins usability certification gate');
assert(['certified-release-candidate','released'].includes(manifest.release_state),'v1.1.0 release state is valid');
assert(manifest.runtime_baseline.p10_sha256==='2c11ea2a4ec7f508d4503f7aebdfe35f10baf0d8cb73db213b5f9b177b469f1a','v1.1.0 preserves P10 baseline');
assert(manifest.runtime_baseline.v110_usability_git_blob_sha1===gitBlobSha(usability),'manifest pins v1.1.0 usability source Git blob');
assert(manifest.runtime_baseline.v110_browser_gate_git_blob_sha1===gitBlobSha(browserGate),'manifest pins v1.1.0 browser gate Git blob');
assert(manifest.coverage.labs===13&&manifest.coverage.quick_starts===3&&manifest.coverage.lab_categories===5,'manifest records complete usability coverage');
assert(fs.existsSync('V110_RELEASE.md'),'v1.1.0 release handoff exists');
assert(read('CHANGELOG.md').includes('1.1.0 — Product Usability & Information Architecture Reconstruction'),'v1.1.0 changelog entry exists');

const report={gate:'V110_REPOSITORY_CERTIFIED',version:'1.1.0',release_state:manifest.release_state,usability_git_blob_sha1:gitBlobSha(usability),browser_gate_git_blob_sha1:gitBlobSha(browserGate),labs:13,quick_starts:3,categories:5,checked_at:new Date().toISOString()};
fs.mkdirSync('artifacts',{recursive:true});fs.writeFileSync('artifacts/v110-static-report.json',JSON.stringify(report,null,2)+'\n');
console.log('\nv1.1.0 USABILITY REPOSITORY CERTIFICATION: PASS');
console.log(JSON.stringify(report,null,2));
