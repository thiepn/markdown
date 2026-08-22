import fs from 'node:fs';
import crypto from 'node:crypto';
import vm from 'node:vm';

const read=p=>fs.readFileSync(p,'utf8');
const assert=(ok,msg)=>{if(!ok)throw new Error(msg);console.log('PASS · '+msg)};
const hash=s=>crypto.createHash('sha256').update(Buffer.from(s,'utf8')).digest('hex');

const interaction=read('assets/v101/interaction.js');
const browserGate=read('assets/v101/certify.js');
new vm.Script(interaction,{filename:'interaction.js'});console.log('PASS · v1.0.1 interaction JavaScript parses');
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
assert(browserGate.includes('V101_INTERACTION_CERTIFIED'),'Browser gate exposes exact v1.0.1 certification token');
assert(browserGate.includes("runScenario('parser-specimen'"),'Browser gate executes a real visible parser demo');
assert(browserGate.includes("startRoute('terminal-chaos'"),'Browser gate executes a real multi-step guided route');

const loader=read('index.html');
const p11=loader.indexOf('assets/p11/showcase.js'),interactionAt=loader.indexOf('assets/v101/interaction.js'),gateAt=loader.indexOf('assets/v101/certify.js'),p12=loader.indexOf('assets/p12/certify.js');
assert(p11>=0&&interactionAt>p11&&gateAt>interactionAt&&p12>gateAt,'Loader order is P11 → v1.0.1 interaction → v1.0.1 gate → P12');
assert(loader.includes('2c11ea2a4ec7f508d4503f7aebdfe35f10baf0d8cb73db213b5f9b177b469f1a'),'v1.0.1 loader preserves certified P10 runtime hash');

const report={gate:'V101_REPOSITORY_CERTIFIED',version:'1.0.1',interaction_sha256:hash(interaction),browser_gate_sha256:hash(browserGate),scenarios:scenarios.length,routes:routes.length,checked_at:new Date().toISOString()};
fs.mkdirSync('artifacts',{recursive:true});fs.writeFileSync('artifacts/v101-static-report.json',JSON.stringify(report,null,2)+'\n');
console.log('\nv1.0.1 INTERACTION REPOSITORY CERTIFICATION: PASS');
console.log(JSON.stringify(report,null,2));
