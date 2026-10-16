/* Piccola Italiano 0.10 · optional bounded adaptive placement. Original questions, local-first. */
'use strict';
const PLACEMENT_DIMENSIONS=[
 {id:"reading",name:"阅读理解",italian:"Comprensione scritta",detail:"读懂书面句子及其逻辑关系"},
 {id:"grammar",name:"语法判断",italian:"Grammatica",detail:"识别符合上下文的句法与变位"},
 {id:"lexicon",name:"词汇理解",italian:"Lessico",detail:"理解常用词及语义限定"}
];
const PLACEMENT_ITEMS=[{"id":"pl-reading-1","dimension":"reading","layer":1,"prompt":"La signora ha comprato due mele.","question":"这位女士做了什么？","choices":["买了两个苹果","卖了两个苹果","准备买两个苹果"],"correct":0,"why":"Ha comprato是已经完成的过去动作。"},{"id":"pl-reading-2","dimension":"reading","layer":2,"prompt":"Marco non è venuto ieri perché doveva lavorare.","question":"为什么Marco昨天没来？","choices":["因为工作","因为今天休息","因为迷路"],"correct":0,"why":"perché表示原因；doveva lavorare说明当时有工作义务。"},{"id":"pl-reading-3","dimension":"reading","layer":3,"prompt":"Se il fornitore arriva prima delle sei, prepariamo subito l'ordine.","question":"这句话说明什么？","choices":["任何情况下都马上准备","供应商六点前到才马上准备","订单已经准备好了"],"correct":1,"why":"se引出一个尚未确定的条件。"},{"id":"pl-reading-4","dimension":"reading","layer":4,"prompt":"Salvo diversa indicazione, l'accesso è consentito soltanto ai veicoli autorizzati.","question":"哪种解释最准确？","choices":["所有车辆都能进入","只有被授权的车辆可进入，除非另有指示","没有人能进入"],"correct":1,"why":"salvo diversa indicazione是例外；soltanto表示仅限。"},{"id":"pl-reading-5","dimension":"reading","layer":5,"prompt":"Benché il documento fosse stato firmato, l'ufficio non lo ritenne valido.","question":"办事处最终如何看待文件？","choices":["虽已签署，仍认为无效","只要签署就有效","没有人签署文件"],"correct":0,"why":"benché引出让步；non lo ritenne valido是结论。"},{"id":"pl-grammar-1","dimension":"grammar","layer":1,"prompt":"Io ___ italiano.","question":"哪个动词变位适合？","choices":["parla","parlo","parlano"],"correct":1,"why":"io对应现在时第一人称单数。"},{"id":"pl-grammar-2","dimension":"grammar","layer":2,"prompt":"Ieri ___ al lavoro presto.","question":"补全句子","choices":["sono andato","ho andato","vado"],"correct":0,"why":"andare的复合过去时通常使用essere。"},{"id":"pl-grammar-3","dimension":"grammar","layer":3,"prompt":"Il documento? ___ ritiro domani.","question":"选择合适的代词","choices":["Gli","Lo","Ne"],"correct":1,"why":"il documento是阳性单数直接宾语，用lo。"},{"id":"pl-grammar-4","dimension":"grammar","layer":4,"prompt":"È necessario che tu ___ il permesso.","question":"选出自然的动词形式","choices":["abbia","hai","avrai"],"correct":0,"why":"è necessario che常要求虚拟式：tu abbia。"},{"id":"pl-grammar-5","dimension":"grammar","layer":5,"prompt":"Se l'avessi saputo, non ci ___.","question":"补全过去反事实条件句","choices":["andavo","andrei","sarei andato"],"correct":2,"why":"过去反事实结果使用过去条件式：sarei andato。"},{"id":"pl-lexicon-1","dimension":"lexicon","layer":1,"prompt":"Ho bisogno di un appuntamento.","question":"appuntamento是什么意思？","choices":["预约","罚单","车票"],"correct":0,"why":"appuntamento指约定或预约。"},{"id":"pl-lexicon-2","dimension":"lexicon","layer":2,"prompt":"Ci vogliono due ore.","question":"这句话在表达什么？","choices":["需要两个小时","现在是两点","两个小时以前"],"correct":0,"why":"ci vogliono表示需要，后接复数名词。"},{"id":"pl-lexicon-3","dimension":"lexicon","layer":3,"prompt":"Mancano due scatole di riso.","question":"mancano在这里表示？","choices":["不够、缺少","已经支付","正在运送"],"correct":0,"why":"mancare表示缺少，主语是缺少的东西。"},{"id":"pl-lexicon-4","dimension":"lexicon","layer":4,"prompt":"Salvo eccezioni, la regola vale per tutti.","question":"salvo eccezioni是？","choices":["如果没有例外情况","除了允许的例外","只在夜间"],"correct":1,"why":"salvo eccezioni表示除了例外情况之外；并不等于没有例外。"},{"id":"pl-lexicon-5","dimension":"lexicon","layer":5,"prompt":"È opportuno evitare affermazioni categoriche.","question":"opportuno最接近？","choices":["适当的、合宜的","被迫的","无效的"],"correct":0,"why":"opportuno表示适宜、合适。"}];
const PLACEMENT_WRITING={
 prompt:"Buongiorno, vorrei cambiare il mio appuntamento perché venerdì lavoro. Avete un altro orario?",
 goal:"用意大利语向诊所提出改预约时间的请求，解释原因并询问其他时间。",
 sample:"Buongiorno, vorrei spostare l'appuntamento perché venerdì devo lavorare. Avete disponibilità per un altro giorno?",
 note:"看看你是否表达了：①礼貌请求；②周五要工作的原因；③询问其他时段。不同表达也可以正确，不必与范例逐字一致。"
};
const PLACEMENT_MAX_ITEMS=4;
function placementStore(){
 if(!state.placement||typeof state.placement!=="object"||Array.isArray(state.placement))state.placement={active:null,history:[]};
 if(!Array.isArray(state.placement.history))state.placement.history=[];
 return state.placement;
}
function placementNewSession(){
 return {id:"placement-"+Date.now().toString(36)+"-"+Math.random().toString(36).slice(2,7),startedAt:Date.now(),phase:"reading",tracks:{reading:{level:2,answers:[]},grammar:{level:2,answers:[]},lexicon:{level:2,answers:[]}},writing:{status:"unmeasured"},completedAt:null};
}
function placementCurrentQuestion(s){
 if(!s||s.phase==="writing"||s.phase==="done")return null;
 const track=s.tracks[s.phase];
 if(!track||track.answers.length>=PLACEMENT_MAX_ITEMS)return null;
 const used=new Set(track.answers.map(x=>x.questionId));
 const options=PLACEMENT_ITEMS.filter(x=>x.dimension===s.phase&&!used.has(x.id));
 options.sort((a,b)=>Math.abs(a.layer-track.level)-Math.abs(b.layer-track.level)||b.layer-a.layer);
 return options[0]||null;
}
function placementAdvance(s){
 const names=PLACEMENT_DIMENSIONS.map(x=>x.id);
 if(s.phase==="writing"||s.phase==="done")return;
 const i=names.indexOf(s.phase);
 const answers=s.tracks[s.phase].answers;
 if(answers.length>=PLACEMENT_MAX_ITEMS||!placementCurrentQuestion(s))s.phase=names[i+1]||"writing";
}
function placementRecord(s,questionId,answer){
 const q=placementCurrentQuestion(s);
 if(!q||q.id!==questionId||!(Number.isInteger(answer)&&answer>=-1&&answer<q.choices.length))return false;
 const tr=s.tracks[s.phase];
 tr.answers.push({questionId:q.id,dimension:q.dimension,layer:q.layer,method:"fixed-choice",choice:answer,correct:answer===q.correct,skipped:answer===-1,observedAt:Date.now()});
 if(answer>=0)tr.level=Math.min(5,Math.max(1,tr.level+(answer===q.correct?1:-1)));
 placementAdvance(s);return true;
}
function placementComplete(s,grade){
 if(!s||s.phase!=="writing")return false;
 if(!["self_good","self_partial","self_needs_help","skipped"].includes(grade))return false;
 s.writing={status:grade,method:grade==="skipped"?"unmeasured":"learner-self-rating",observedAt:Date.now()};
 s.phase="done";s.completedAt=Date.now();return true;
}
function placementSummary(s){
 const result={};
 for(const d of PLACEMENT_DIMENSIONS){
  const tr=s?.tracks?.[d.id],answers=Array.isArray(tr?.answers)?tr.answers:[];
  const observed=answers.filter(x=>!x.skipped),correct=observed.filter(x=>x.correct);
  const max=correct.length?Math.max(...correct.map(x=>x.layer)):null;
  const checked=[...new Set(observed.map(x=>x.layer))].sort();
  result[d.id]={observed:observed.length,correct:correct.length,max,checked,confidence:observed.length>=4?"有限：4道题":"初步：样本少",skipped:answers.length-observed.length};
 }
 return result;
}
function placementImportFromBackup(imported){
 if(!imported||typeof imported!=="object"||!Array.isArray(imported.history))return;
 const local=placementStore();const validIds=new Set(PLACEMENT_ITEMS.map(q=>q.id));
 for(const s of imported.history.slice(-8)){
  if(!s||typeof s.id!=="string"||!/^placement-[a-z0-9-]{1,80}$/.test(s.id)||!Number.isFinite(s.completedAt)||s.phase!=="done"||!s.tracks||!s.writing)continue;
  if(!PLACEMENT_DIMENSIONS.every(d=>Array.isArray(s.tracks[d.id]?.answers)&&s.tracks[d.id].answers.length<=PLACEMENT_MAX_ITEMS&&s.tracks[d.id].answers.every(a=>a&&validIds.has(a.questionId)&&a.dimension===d.id&&typeof a.correct==="boolean"&&Number.isFinite(a.layer)&&a.layer>=1&&a.layer<=5&&Number.isFinite(a.observedAt))))continue;
  if(!["self_good","self_partial","self_needs_help","skipped"].includes(s.writing.status))continue;
  if(!local.history.some(x=>x.id===s.id))local.history.push(JSON.parse(JSON.stringify(s)));
 }
 local.history.sort((a,b)=>(a.completedAt||0)-(b.completedAt||0));
 local.history=local.history.slice(-8);
}
function placementPanel(){
 const p=state.placement,active=p?.active&&p.active.phase!=="done";
 const runs=p?.history?.length||0;
 return "<section class='card placement-promo'><div><span class='eyebrow'>CANCELLIERE · ORIENTAMENTO</span><h3>🧭 新任书记官能力定位</h3><p>自适应小测，阅读、语法与词汇分开观察；自由写作由你自评。不贴等级标签，随时暂停。</p></div><button class='btn primary' data-action='placement-open'>"+(active?"继续测评":runs?"查看报告 / 再测一次":"走进文书院 →")+"</button></section>";
}
function placementProgress(session){
 if(!session)return 0;
 let n=0;for(const d of PLACEMENT_DIMENSIONS)n+=session.tracks[d.id]?.answers?.length||0;
 return Math.min(13,n+(session.phase==="done"?1:0));
}
function placementView(){
 const store=placementStore(),s=store.active;
 if(!s){
  const previous=store.history.length?store.history[store.history.length-1]:null;
  return "<div class='placement-shell'><div class='placement-hero'><span class='eyebrow'>CANCELLIERIA · ORIENTAMENTO</span><h1>🧭 你的语言地图，从哪里开始？</h1><p>约 8–12 分钟；12道小题按回答调整难度，再加一项可跳过的写作自评。没有口语、听力的真实证据就不会评这两项。</p></div><section class='card placement-section'><h2>这不是晋升考试</h2><p>学习者可以暂停、跳题、选择只看知识地图。系统只会给出该组小题中观察到的表现，不能证明CEFR等级，也不会影响旧复习经验值。</p><div class='placement-buttons'><button type='button' class='btn primary' data-action='placement-start'>开始探索 →</button><button type='button' class='btn secondary' data-action='placement-close'>暂不测评</button></div></section>"+
  (previous?placementReport(previous):"")+"</div>";
 }
 if(s.phase==="done")return "<div class='placement-shell'>"+placementReport(s)+"</div>";
 const step=placementProgress(s);
 const heading="<div class='placement-head'><button type='button' class='btn secondary small' data-action='placement-close'>← 暂停，稍后继续</button><span>"+step+" / 13 · 已记录</span></div>";
 const bar="<div class='placement-bar'><span style='width:"+Math.round(step/13*100)+"%'></span></div>";
 if(s.phase==="writing"){
  const revealed=ui.placementWritingRevealed;
  return "<div class='placement-shell'>"+heading+bar+"<section class='card placement-section'><span class='eyebrow'>ULTIMO FASCICOLO · 自由表达</span><h2>最后一份公文：改预约时间</h2><p>"+esc(PLACEMENT_WRITING.goal)+"</p>"+(revealed?
    "<div class='placement-sample'><strong>参考表达</strong><p>"+esc(PLACEMENT_WRITING.sample)+"</p><small>"+esc(PLACEMENT_WRITING.note)+"</small></div><p>回想一下刚才自己能否独立完成，而不是单纯看懂范例。</p><div class='placement-choices'><button data-action='placement-write-grade' data-id='self_good'>✓ 基本独立表达</button><button data-action='placement-write-grade' data-id='self_partial'>◐ 表达了一部分</button><button data-action='placement-write-grade' data-id='self_needs_help'>↺ 需要范例帮助</button></div>":
    "<label class='placement-writing-label' for='placement-writing'>试着自己写下来（仅用于当场自评，不保存原文）</label><textarea id='placement-writing' rows='5' placeholder='Buongiorno, vorrei…' maxlength='850'></textarea><div class='placement-buttons'><button class='btn primary' data-action='placement-write-reveal'>对照范例并自评</button><button class='btn secondary' data-action='placement-write-grade' data-id='skipped'>跳过写作</button></div>")+"</section></div>";
 }
 const d=PLACEMENT_DIMENSIONS.find(x=>x.id===s.phase),tr=s.tracks[d.id],q=placementCurrentQuestion(s);
 if(!q)return "<div class='placement-shell'>"+heading+bar+"<section class='card placement-section'>正在整理下一份卷宗…</section></div>";
 return "<div class='placement-shell'>"+heading+bar+"<section class='card placement-section'><span class='eyebrow'>"+esc(d.italian)+" · "+esc(d.name)+"</span><h2>第 "+(tr.answers.length+1)+" 份 / 本方向最多 "+PLACEMENT_MAX_ITEMS+" 份卷宗</h2><p>根据前面回答调整题目难度；当前题属于知识地图 L"+q.layer+" 层。这是题目难度，不是你的能力等级。</p><div class='placement-question'><span class='eyebrow'>DOCUMENTO</span><p lang='it'>"+esc(q.prompt)+"</p><strong>"+esc(q.question)+"</strong></div><div class='placement-choices'>"+q.choices.map((choice,i)=>"<button data-action='placement-answer' data-id='"+esc(q.id)+"' data-choice='"+i+"'><span>"+String.fromCharCode(65+i)+"</span>"+esc(choice)+"</button>").join("")+"</div><button class='placement-skip' data-action='placement-answer' data-id='"+esc(q.id)+"' data-choice='-1'>这题先跳过，不计作错误 →</button></section></div>";
}
function placementReport(s){
 const summary=placementSummary(s);
 const labels={reading:"阅读理解",grammar:"语法判断",lexicon:"词汇理解"};
 const rows=PLACEMENT_DIMENSIONS.map(d=>{
  const r=summary[d.id];
  const detail=r.observed?("这组题中回答正确 "+r.correct+" / "+r.observed+"；已测试层级："+(r.checked.map(x=>"L"+x).join("、"))+(r.max?"；最高答对 L"+r.max:"；暂无答对记录")):"未取得判断证据（全部跳过）";
  return "<div class='placement-report-row'><div><strong>"+labels[d.id]+"</strong><span>"+esc(detail)+"</span></div><small>"+(r.observed?esc(r.confidence):"尚未测量")+"</small></div>";
 }).join("");
 const write=s.writing?.status||"unmeasured";
 const wr={"self_good":"自评：基本可独立写出","self_partial":"自评：可以表达一部分","self_needs_help":"自评：需要帮助","skipped":"尚未测量","unmeasured":"尚未测量"}[write]||"尚未测量";
 const candidates=PLACEMENT_DIMENSIONS.map(d=>({key:d.id,...summary[d.id]})).filter(x=>x.observed>0).sort((a,b)=>a.correct/Math.max(1,a.observed)-b.correct/Math.max(1,b.observed));
 const low=candidates[0],suggestion=low?"可以先复习「"+labels[low.key]+"」中本次遇到的难点，再回到知识地图按先修顺序扩展。":"本次缺少足够回答，不推荐具体补课方向。";
 return "<section class='card placement-report'><span class='eyebrow'>RISULTATI · "+new Date(s.completedAt||Date.now()).toLocaleDateString("zh-CN")+"</span><h2>📜 文书院能力观察报告</h2><p>这是根据少量自编题形成的临时观察，不是 CEFR 认证，也不是完整的语言能力评级。</p>"+rows+"<div class='placement-report-row'><div><strong>主动书面表达</strong><span>"+wr+"。没有AI自动批改。</span></div><small>自我评估</small></div><div class='placement-report-row'><div><strong>口语 · 听力</strong><span>缺乏录音与听力题证据。</span></div><small>尚未测量</small></div><p class='placement-suggestion'>"+esc(suggestion)+"</p><p class='placement-caveat'>选择题只有少量样本，分层比较不具统计校准；低置信度不可视为稳定技能等级。重复练同一题会有熟悉效应。</p><div class='placement-buttons'><button type='button' class='btn primary' data-action='placement-restart'>重新观察</button><button type='button' class='btn secondary' data-action='curriculum-open'>打开知识地图</button><button type='button' class='btn secondary' data-action='placement-close'>结束</button></div></section>";
}
function placementAction(name,btn){
 const store=placementStore(),s=store.active;
 switch(name){
 case "placement-open":ui.placementOpen=true;ui.placementWritingRevealed=false;ui.tab="home";render();return true;
 case "placement-close":ui.placementOpen=false;ui.placementWritingRevealed=false;render();return true;
 case "placement-start":case "placement-restart":
  store.active=placementNewSession();ui.placementWritingRevealed=false;ui.placementOpen=true;save();render();return true;
 case "placement-answer":{
  if(!s||s.phase==="writing"||s.phase==="done")return true;
  const answer=Number(btn.dataset.choice);
  if(!placementRecord(s,btn.dataset.id,answer))return true;
  save();render();return true;
 }
 case "placement-write-reveal":{
  if(!s||s.phase!=="writing")return true;
  const written=String(document.querySelector("#placement-writing")?.value||"").trim();
  if(written.length<8){toast("先试着写一句意大利语，或直接选择跳过");return true}
  ui.placementWritingRevealed=true;render();return true;
 }
 case "placement-write-grade":{
  if(!s||s.phase!=="writing"||btn.dataset.id!=="skipped"&&!ui.placementWritingRevealed)return true;
  if(!placementComplete(s,btn.dataset.id))return true;
  store.history.push(s);store.history=store.history.slice(-8);
  store.active=null;ui.placementWritingRevealed=false;save();render();return true;
 }
 default:return false;
 }
}
