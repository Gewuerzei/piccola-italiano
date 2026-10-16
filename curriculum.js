/* Piccola Italiano v0.9.0 · Curriculum foundation. Static teaching map, no learner state writes. */
'use strict';
const CURRICULUM_LEVELS=[
 {id:1,name:"Fondamenta",cn:"基础骨架",hint:"先能读懂、说出简单而完整的话"},
 {id:2,name:"Autonomia",cn:"生活自主",hint:"可以描述经历与需求，使用代词和礼貌表达"},
 {id:3,name:"Connessioni",cn:"连贯组织",hint:"能把事实、理由、关系和行动连接起来"},
 {id:4,name:"Precisione",cn:"逻辑精度",hint:"辨别条件、例外、语气与限定范围"},
 {id:5,name:"Metalinguaggio",cn:"语言系统",hint:"理解词源、语体、音变与跨语言关系"}
];
const CURRICULUM_NODES=[{"id":"sentence","layer":1,"title":"句子的基本骨架","italian":"La frase semplice","utility":"A","dimensions":["grammar","reading"],"prereq":[],"contentRefs":["s-documento"],"practiceRefs":["e14"],"why":"识别主语、动词与目的短语，是阅读长句的起点。"},{"id":"present","layer":1,"title":"现在时和基本动词","italian":"Il presente","utility":"A","dimensions":["grammar","production_written"],"prereq":["sentence"],"contentRefs":["w-prenotare"],"practiceRefs":["e9"],"why":"现在时是描述日常工作、需求和安排的基础。"},{"id":"needs","layer":1,"title":"表达需要与必要","italian":"Necessità","utility":"A","dimensions":["lexicon","grammar"],"prereq":["sentence"],"contentRefs":["w-necessario"],"practiceRefs":["e2"],"why":"需要、必须等高频表达有助于组织实际任务。"},{"id":"time","layer":1,"title":"时间线索词","italian":"Avverbi di tempo","utility":"A","dimensions":["reading","lexicon"],"prereq":["sentence"],"contentRefs":["w-ultimamente"],"practiceRefs":["e15"],"why":"判断最近、之前、稍后，是理解时态的第一步。"},{"id":"requests","layer":1,"title":"表达目的与请求","italian":"Scopo e richieste","utility":"A","dimensions":["production_written","grammar"],"prereq":["present"],"contentRefs":["s-visita"],"practiceRefs":["e13"],"why":"能说明自己为什么来、希望获得什么帮助。"},{"id":"past","layer":2,"title":"复合过去时","italian":"Passato prossimo","utility":"A","dimensions":["grammar","production_written"],"prereq":["present","time"],"contentRefs":["g-passato"],"practiceRefs":["e3"],"why":"用过去时自主讲述已经发生的事情。"},{"id":"agreement","layer":2,"title":"单复数与一致","italian":"Accordo","utility":"A","dimensions":["grammar"],"prereq":["sentence","present"],"contentRefs":["g-ci"],"practiceRefs":["e1","e2"],"why":"Ci vuole / vogliono的变化是常见的一致关系练习。"},{"id":"objects","layer":2,"title":"直接宾语代词","italian":"Pronomi diretti","utility":"A","dimensions":["grammar","production_written"],"prereq":["sentence","present"],"contentRefs":["g-pronomi"],"practiceRefs":["e6"],"why":"lo/la/li/le帮助避免不断重复前面提过的名词。"},{"id":"politeness","layer":2,"title":"礼貌条件式","italian":"Condizionale di cortesia","utility":"A","dimensions":["production_written","grammar"],"prereq":["requests","present"],"contentRefs":["g-condizionale"],"practiceRefs":["e4"],"why":"在诊所、驾校和公共机关更自然地提出请求。"},{"id":"shortage","layer":2,"title":"说明缺货与不足","italian":"Manca / mancano","utility":"A","dimensions":["lexicon","production_written"],"prereq":["agreement"],"contentRefs":["w-mancare"],"practiceRefs":[],"why":"工作场景高价值，练习后置主语引发的单复数变化。"},{"id":"relative","layer":3,"title":"关系从句che","italian":"Frasi relative","utility":"A","dimensions":["grammar","reading"],"prereq":["objects"],"contentRefs":["g-che"],"practiceRefs":["e5"],"why":"学会修饰一个已出现的名词，读懂较长句子。"},{"id":"referent","layer":3,"title":"从句中的指代对象","italian":"Referenti e legami","utility":"A","dimensions":["reading","grammar"],"prereq":["relative","objects"],"contentRefs":["s-persona"],"practiceRefs":["e5"],"why":"区分che在从句中代表什么，避免误判句子关系。"},{"id":"reason","layer":3,"title":"解释原因与结果","italian":"Cause e conseguenze","utility":"A","dimensions":["production_written","reading"],"prereq":["past"],"contentRefs":["sc-guida2"],"practiceRefs":[],"why":"讲清原因是超越简单回答的重要一步。"},{"id":"work","layer":3,"title":"连贯报告工作情况","italian":"Rapporti al lavoro","utility":"A","dimensions":["production_written"],"prereq":["shortage","reason"],"contentRefs":["sc-sushi"],"practiceRefs":[],"why":"把库存问题、替代方案和反馈组织成连续表达。"},{"id":"negotiation","layer":3,"title":"礼貌协商换班","italian":"Negoziare un turno","utility":"B","dimensions":["production_written"],"prereq":["politeness","reason"],"contentRefs":["sc-turno"],"practiceRefs":[],"why":"综合运用条件式、时间和解释。"},{"id":"subjunctive","layer":4,"title":"虚拟式基础","italian":"Congiuntivo","utility":"A","dimensions":["grammar","reading"],"prereq":["relative","reason"],"contentRefs":["g-congiuntivo"],"practiceRefs":["e7"],"why":"理解态度、愿望、限定条件中的动词语气。"},{"id":"exception","layer":4,"title":"规则里的例外","italian":"Salvo / eccezioni","utility":"A","dimensions":["reading","grammar"],"prereq":["reason"],"contentRefs":["w-salvo"],"practiceRefs":[],"why":"尤其重要的驾考逻辑：先识别规则的适用范围。"},{"id":"conditions","layer":4,"title":"purché附加条件","italian":"Condizioni","utility":"A","dimensions":["reading","grammar"],"prereq":["subjunctive"],"contentRefs":["w-purche"],"practiceRefs":[],"why":"理解“只要符合条件”，并区别一般因果句。"},{"id":"consequences","layer":4,"title":"法律后果与触发","italian":"Incorrere in","utility":"A","dimensions":["reading","lexicon"],"prereq":["reason","exception"],"contentRefs":["w-incorrere"],"practiceRefs":["e10"],"why":"读懂违规、罚款和例外可能引发的后果。"},{"id":"traffic-logic","layer":4,"title":"路权判断与限制","italian":"Precedenza e limiti","utility":"A","dimensions":["reading"],"prereq":["exception","conditions"],"contentRefs":["w-precedenza"],"practiceRefs":[],"why":"在驾照场景精确处理常规规则与标志的限制。"},{"id":"morphology","layer":5,"title":"词素与前缀","italian":"Morfologia","utility":"B","dimensions":["metalinguistic","lexicon"],"prereq":["present"],"contentRefs":["w-trasportare"],"practiceRefs":[],"why":"从trans-、portare等组成部分分析构词，建立可迁移方法。"},{"id":"semantic-history","layer":5,"title":"词义的历史迁移","italian":"Evoluzione semantica","utility":"C","dimensions":["metalinguistic"],"prereq":["morphology"],"contentRefs":["w-metafora"],"practiceRefs":[],"why":"理解词源与现代词义为何不总是一一对应。"},{"id":"register","layer":5,"title":"法律文书的语体","italian":"Registro formale","utility":"B","dimensions":["reading","metalinguistic"],"prereq":["exception","consequences"],"contentRefs":["w-decreto"],"practiceRefs":[],"why":"区分日常表达、行政语体与历史文书，不把用词差异当作语法等级。"},{"id":"sound-change","layer":5,"title":"拉丁语历史音变","italian":"Mutamenti fonetici","utility":"C","dimensions":["metalinguistic","lexicon"],"prereq":["morphology"],"contentRefs":[],"practiceRefs":[],"why":"观察noctem、notte、noche、nuit；这是实验示例，尚未映射为正式词条。"},{"id":"comparative","layer":5,"title":"跨语言语法比较","italian":"Linguistica comparata","utility":"C","dimensions":["metalinguistic"],"prereq":["subjunctive","semantic-history"],"contentRefs":["g-congiuntivo"],"practiceRefs":[],"why":"先理解意大利语结构，再比较其他语言的相似与不等价之处。"}];
const CURRICULUM_SOUNDS=[
 {lang:"la",variety:"古典拉丁语 · 重建读音",word:"noctem",ipa:"/ˈnɔk.tɛm/",audio:false},
 {lang:"it-IT",variety:"现代意大利语",word:"notte",ipa:"/ˈnɔt.te/",audio:true},
 {lang:"es-ES",variety:"现代西班牙语",word:"noche",ipa:"/ˈno.tʃe/",audio:true},
 {lang:"fr-FR",variety:"现代法语",word:"nuit",ipa:"/nɥi/",audio:true}
];
function curriculumValidate(items,exercises){
 const itemIds=new Set(items.map(x=>x.id)),exIds=new Set(exercises.map(x=>x.id)),nodeIds=new Set(),issues=[];
 CURRICULUM_NODES.forEach(n=>{if(nodeIds.has(n.id))issues.push("重复节点："+n.id);nodeIds.add(n.id)});
 const graph=new Map(CURRICULUM_NODES.map(n=>[n.id,n.prereq]));
 CURRICULUM_NODES.forEach(n=>{
  if(n.layer<1||n.layer>5)issues.push("错误层级："+n.id);
  n.prereq.forEach(p=>{if(!graph.has(p))issues.push("无先修节点："+n.id+" → "+p)});
  n.contentRefs.forEach(p=>{if(!itemIds.has(p))issues.push("缺少内容："+n.id+" → "+p)});
  n.practiceRefs.forEach(p=>{if(!exIds.has(p))issues.push("缺少练习："+n.id+" → "+p)});
 });
 const visited=new Set(),stack=new Set();
 function visit(id){if(stack.has(id)){issues.push("先修图存在循环："+id);return}if(visited.has(id))return;stack.add(id);(graph.get(id)||[]).forEach(p=>{if(graph.has(p))visit(p)});stack.delete(id);visited.add(id)}
 graph.forEach((_,id)=>visit(id));return issues;
}
function curriculumPanel(){
 return "<section class='card curriculum-promo'><div><span class='eyebrow'>ATLANTE DEL SAPERE · v0.9</span><h3>🗺️ 知识地图</h3><p>五层知识架构、25个先修节点，附小型拉丁语声音考古。这里不测分，也不把Pietro贴上等级标签。</p></div><button type='button' class='btn primary' data-action='curriculum-open'>打开知识地图 →</button></section>";
}
function curriculumView(){
 const chosen=ui.curriculumLevel||"all";
 const visible=CURRICULUM_NODES.filter(n=>chosen==="all"||String(n.layer)===chosen);
 const focus=visible.find(n=>n.id===ui.curriculumNode)||visible[0]||null;
 const status=curriculumValidate(SEED.concat(state.customItems),EXERCISES);
 function card(n){
  return "<button type='button' class='curriculum-node "+(focus&&n.id===focus.id?"is-selected":"")+"' data-action='curriculum-focus' data-id='"+esc(n.id)+"' aria-pressed='"+(focus&&n.id===focus.id?"true":"false")+"'><span class='curriculum-level-badge'>L"+n.layer+"</span><span class='curriculum-node-copy'><b>"+esc(n.title)+"</b><small>"+esc(n.italian)+"</small></span><span class='curriculum-utility'>"+esc(n.utility)+"</span></button>";
 }
 function detail(n){
  if(!n)return "";
  const layer=CURRICULUM_LEVELS.find(l=>l.id===n.layer);
  const prereqs=n.prereq.map(id=>CURRICULUM_NODES.find(x=>x.id===id)).filter(Boolean);
  const references=n.contentRefs.map(id=>byId(id)).filter(Boolean);
  const matched=n.practiceRefs.filter(id=>EXERCISES.some(x=>x.id===id));
  return "<article class='card curriculum-detail'><span class='eyebrow'>L"+n.layer+" · "+esc(layer.name)+" · 价值 "+esc(n.utility)+"</span><h2>"+esc(n.title)+"</h2><p class='curriculum-italian'>"+esc(n.italian)+"</p><p>"+esc(n.why)+"</p><div class='curriculum-rels'><h4>先修知识</h4>"+(prereqs.length?prereqs.map(p=>"<button type='button' data-action='curriculum-focus' data-id='"+esc(p.id)+"'>↖ "+esc(p.title)+"</button>").join(""):"<span>起点节点，无强制先修</span>")+"</div><div class='curriculum-rels'><h4>连接已有教材</h4>"+(references.length?references.map(x=>"<button type='button' data-action='curriculum-detail' data-id='"+esc(x.id)+"'>"+esc(x.title)+" ↗</button>").join(""):"<span>教学示范，尚未建立词条对应</span>")+"</div><p class='curriculum-meta'>教材引用 "+references.length+" · 已有练习引用 "+matched.length+" · 对应能力 "+esc(n.dimensions.join(" / "))+"</p><p class='curriculum-disclaimer'>此处展示的是知识难度与结构，不代表你的个人能力等级。</p></article>";
 }
 const sections=CURRICULUM_LEVELS.filter(l=>chosen==="all"||String(l.id)===chosen).map(l=>{
  const these=visible.filter(n=>n.layer===l.id);
  return "<section class='curriculum-group'><div class='curriculum-group-title'><strong>L"+l.id+" · "+esc(l.cn)+"</strong><small>"+esc(l.name)+" · "+esc(l.hint)+"</small></div>"+these.map(card).join("")+"</section>";
 }).join("");
 const tabs=["all","1","2","3","4","5"].map(x=>"<button type='button' data-action='curriculum-level' data-id='"+x+"' aria-pressed='"+(chosen===x?"true":"false")+"' class='"+(chosen===x?"active":"")+"'>"+(x==="all"?"全部":"L"+x)+"</button>").join("");
 const sound=CURRICULUM_SOUNDS.map(x=>"<div class='curriculum-sound'><span class='curriculum-sound-locale'>"+esc(x.variety)+"</span><strong lang='"+esc(x.lang)+"'>"+esc(x.word)+"</strong><code>"+esc(x.ipa)+"</code>"+(x.audio?"<button type='button' data-action='curriculum-play' data-id='"+esc(x.lang)+"' aria-label='播放"+esc(x.variety)+"的"+esc(x.word)+"'>▶ 听发音</button>":"<span class='curriculum-no-audio'>重建IPA · 暂无可信音频</span>")+"</div>").join("");
 return "<section class='curriculum-shell'><div class='curriculum-top'><button type='button' class='btn secondary small' data-action='curriculum-close'>← 返回知识库</button><span class='eyebrow'>LA MAPPA DELLE CONOSCENZE</span><h1>🗺️ 意大利语知识地图</h1><p>25个经过整理的教学节点，按知识结构分层。先认识网络，再决定下一步学什么。</p><div class='curriculum-counter'>"+CURRICULUM_NODES.length+" 个节点 · 5 层 · 只读 · 无能力评分</div></div>"+
 (status.length?"<p class='curriculum-warning'>⚠ 教材校验出现问题："+esc(status.slice(0,3).join("；"))+"</p>":"")+
 "<div class='curriculum-tabs' role='group' aria-label='筛选知识层级'>"+tabs+"</div><div class='curriculum-layout'><div class='curriculum-nodes'>"+sections+"</div>"+detail(focus)+"</div>"+
 "<section class='card curriculum-latin'><span class='eyebrow'>LATINO IN TASCA · SOUND LAB</span><h2>🔊 拉丁语的声音后代</h2><p>同源词并不等于同音。下面的拉丁语为重建读法；现代语言播放取决于本机是否安装了对应语音。</p><div class='curriculum-sound-grid'>"+sound+"</div><p class='curriculum-foot'>示例：拉丁语 <i>noctem</i> 与意大利语 <i>notte</i> 展示 -ct- → -tt- 的常见演变；西班牙语与法语分别沿自己的历史路径发展。当前没有真正的古典拉丁语录音。</p></section></section>";
}
function curriculumAction(name,btn){
 switch(name){
  case "curriculum-open":ui.tab="library";ui.detailId=null;ui.rootsOpen=false;ui.curriculumOpen=true;ui.curriculumLevel="all";ui.curriculumNode=null;render();window.scrollTo(0,0);return true;
  case "curriculum-close":ui.curriculumOpen=false;ui.curriculumNode=null;ui.detailId=null;render();return true;
  case "curriculum-level":ui.curriculumLevel=btn.dataset.id;ui.curriculumNode=null;render();return true;
  case "curriculum-focus":{const node=CURRICULUM_NODES.find(n=>n.id===btn.dataset.id);if(!node)return true;ui.curriculumLevel="all";ui.curriculumNode=node.id;render();return true;}
  case "curriculum-detail":{const id=btn.dataset.id;if(!byId(id))return true;ui.detailId=id;ui.tab="library";render();window.scrollTo(0,0);return true;}
  case "curriculum-play":{
   const sound=CURRICULUM_SOUNDS.find(x=>x.lang===btn.dataset.id&&x.audio);
   if(!sound)return true;
   if(!("speechSynthesis" in window)||!window.SpeechSynthesisUtterance){toast("当前设备不支持语音播放");return true}
   const voices=window.speechSynthesis.getVoices(), lang=sound.lang.toLowerCase();
   const voice=voices.find(v=>v.lang.toLowerCase()===lang)||voices.find(v=>v.lang.toLowerCase().split("-")[0]===lang.split("-")[0]);
   if(!voice){toast("未找到"+sound.variety+"语音，请在系统中安装后重试");return true}
   window.speechSynthesis.cancel();
   const utterance=new SpeechSynthesisUtterance(sound.word);utterance.voice=voice;utterance.lang=voice.lang;utterance.rate=.82;
   window.speechSynthesis.speak(utterance);return true;
  }
  default:return false;
 }
}
