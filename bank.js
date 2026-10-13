/* User-supplied licence-compatible driving-question importer. Never assert official verification. */
'use strict';
const MIT_LIST_URL='https://www.mit.gov.it/nfsmitgov/files/media/normativa/2024-07/LISTATO_definitivo%20%281%29.txt';
const MIT_CIRCULAR_URL='https://www.mit.gov.it/normativa/circolare-protocollo-19281-del-05072024';
function officialQuestions(){return Array.isArray(missionData().bank)?missionData().bank:[]}
function examQuestions(source){return source==='imported'?officialQuestions():DRIVE_QUIZ}
function normalizeBool(value){if(typeof value==='boolean')return value;const s=String(value??'').trim().toUpperCase();if(['V','VERO','TRUE','T','SI','SÌ','YES'].includes(s))return true;if(['F','FALSO','FALSE','NO','N'].includes(s))return false;return null}
function normalizeQuestion(obj,ix){
 if(!obj||typeof obj!=='object')return null;
 const lookup=Object.fromEntries(Object.entries(obj).map(([k,v])=>[k.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/[ _.-]/g,''),v]));
 const pick=(...k)=>k.map(x=>lookup[x]).find(x=>x!==undefined&&x!==null&&String(x).trim()!=='');
 const prompt=String(pick('testo','domanda','quesito','frase','question','prompt','enunciato')||'').trim();
 const correct=normalizeBool(pick('risposta','rispostacorretta','corretta','esito','vf','verofalso','correct','answer','soluzione'));
 const chapter=String(pick('capitolo','chapter','argomento','topic','cap')||'').trim();
 const id=String(pick('id','numero','num','codice','progressivo','nquiz')||ix+1).trim();
 if(prompt.length<12||prompt.length>800||correct===null)return null;
 return {id:'mit-'+id.replace(/[^\w-]/g,'').slice(0,55)+'-'+ix,prompt,correct,chapter:chapter.slice(0,80),why:'用户导入题目：原始文件未包含已核实的中文解析。请结合官方法规和驾校教材。',source:'user-import'};
}
function detectDelimited(text){const lines=text.replace(/^\uFEFF/,'').split(/\r?\n/).filter(s=>s.trim());if(lines.length<2)return[];
 const sep=['\t',';',',','|'].map(x=>({sep:x,c:lines.slice(0,12).reduce((n,l)=>n+l.split(x).length-1,0)})).sort((a,b)=>b.c-a.c)[0];if(!sep||sep.c<5)return[];
 function fields(line){const res=[];let out='',quoted=false;for(let i=0;i<line.length;i++){const c=line[i];if(c==='"'){if(quoted&&line[i+1]==='"'){out+='"';i++}else quoted=!quoted}else if(c===sep.sep&&!quoted){res.push(out.trim());out=''}else out+=c}res.push(out.trim());return res}
 const first=fields(lines[0]);const header=first.some(x=>/(domanda|quesito|testo|risposta|esito|verofalso|corretta|question|correct|prompt)/i.test(x));
 const cols=header?first.map(x=>x.trim()):['capitolo','numero','domanda','risposta'];
 const out=[];for(let i=header?1:0;i<lines.length;i++){const cells=fields(lines[i]);if(cells.length<(header?2:3))continue;const record={};cells.forEach((v,j)=>{record[cols[j]||('campo'+j)]=v});let item=normalizeQuestion(record,i);if(!item&&!header){const bool=normalizeBool(cells[cells.length-1]);const textCol=cells.findIndex(x=>x.length>20);if(bool!==null&&textCol>=0)item=normalizeQuestion({id:cells[0],capitolo:cells[1],domanda:cells[textCol],risposta:cells[cells.length-1]},i)}if(item)out.push(item)}return out;
}
function detectTextRows(text){const lines=text.split(/\r?\n/).filter(x=>x.trim());const items=[];
 for(let i=0;i<lines.length;i++){
  // Accept conservative, visibly delimited rows only. Never guess the answer.
  const match=lines[i].match(/^\s*(?:(\d{1,3})[.\-\s]+)?(\d{1,6})[.)\-\s]+(.{18,800}?)\s*\|\s*(V|F|VERO|FALSO)\s*$/i);
  if(!match)continue;
  const q=normalizeQuestion({capitolo:match[1]||'',numero:match[2],domanda:match[3],risposta:match[4]},i);if(q)items.push(q);
 }return items;
}
function parseQuestionBank(text,filename){let records=[];if(/\.json$/i.test(filename)||text.trim().startsWith('[')||text.trim().startsWith('{')){
 try{const data=JSON.parse(text);const list=Array.isArray(data)?data:(data.questions||data.quiz||data.items||[]);if(!Array.isArray(list))throw Error('JSON中没有题目数组');records=list.map(normalizeQuestion).filter(Boolean)}catch(e){throw Error('JSON格式不支持：'+e.message)}
 }else{records=detectDelimited(text);if(records.length<10)records=detectTextRows(text)}
 const seen=new Set();return records.filter(q=>{const key=q.prompt.toLowerCase().replace(/\s+/g,' ');if(seen.has(key))return false;seen.add(key);return true});
}
async function importQuestionBank(file){if(!file)return;if(file.size>12*1024*1024){toast('文件超过12 MB，暂不支持');return}
 try{let text=await file.text();if(text.includes('\uFFFD')){const bytes=await file.arrayBuffer();const cp=new TextDecoder('windows-1252').decode(bytes);if((cp.match(/\uFFFD/g)||[]).length<(text.match(/\uFFFD/g)||[]).length)text=cp}
 const questions=parseQuestionBank(text,file.name);if(questions.length<30)throw Error(`只识别到 ${questions.length} 道可靠的判断题；未导入。支持JSON/CSV/TSV，官方TXT格式尚未完成适配，不能猜测答案。`);
 const m=missionData();m.bank=questions;m.bankMeta={filename:file.name,loadedAt:new Date().toISOString(),count:questions.length,source:'用户本地导入，真实性及考试适用版本尚未核验',officialLink:MIT_CIRCULAR_URL};await save();render();toast('✅ 已导入 '+questions.length+' 道判断题。请确认题源和答案。');
 }catch(err){console.error(err);toast('⚠ '+err.message)}
}
function bankPanel(){const q=officialQuestions(),meta=missionData().bankMeta,chapters=new Set(q.map(x=>x.chapter).filter(Boolean));return `<section class="card bank-panel"><div class="bank-heading"><span class="eyebrow">🏛️ BANCA DATI</span><h2>官方题库导入站</h2><p>MIT已公开提供原始题库。现支持结构化JSON / CSV / TSV；官方TXT仍须验证原始字段格式，不能擅自判定对错。</p></div>
 <div class="bank-status"><strong>${q.length?`${q.length.toLocaleString('it-IT')} 道已导入`:'尚未导入题库'}</strong><span>${q.length?`来自你上传的 ${esc(meta?.filename||'文件')} · ${chapters.size||'未分类'} 个章节标签`:'当前仅有40道自编教学题'}</span></div>
 <div class="bank-buttons"><a class="btn secondary" href="${MIT_LIST_URL}" target="_blank" rel="noopener noreferrer">下载MIT原始TXT ↗</a><button class="btn primary" data-action="bank-import">导入题库文件 →</button></div>
 <p class="muted tiny">原始来源：<a href="${MIT_CIRCULAR_URL}" target="_blank" rel="noopener noreferrer">MIT第19281号通函（2024）</a>。官网默认CC BY 3.0，需注明来源。用户上传题库并不等于已核实当前考试采用版本；无法识别的TXT不会导入，原有40道题始终保留。</p></section>`}
function bankAction(name,btn){if(name==='bank-import'){const input=document.createElement('input');input.type='file';input.accept='.json,.txt,.csv,.tsv,text/plain,application/json';input.onchange=()=>importQuestionBank(input.files?.[0]);input.click();return true}return false}