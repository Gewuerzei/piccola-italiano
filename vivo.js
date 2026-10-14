/* Piccola Italiano v0.8.0 · Italiano Vivo / original offline practice.
   Free writing is self-assessed against examples, never marketed as AI correction. */
'use strict';
const VIVO_DECKS=[
 {id:'dialogue',icon:'🗣️',title:'NPC 即兴对话',subtitle:'Conversazione viva',desc:'四个生活现场，每个三回合。自己回答，再对照自然表达。',kind:'self'},
 {id:'paraphrase',icon:'🧩',title:'忘词绕路',subtitle:'Spiegalo senza dirlo',desc:'忘记单词也别停，换一种意大利语让对方听懂。',kind:'self'},
 {id:'detective',icon:'🕵️',title:'语法侦探',subtitle:'Caccia all’errore',desc:'抓出句子的关键错误，输入正确词形。',kind:'exact'},
 {id:'roots',icon:'🏛️',title:'词根反推',subtitle:'Dal passato al presente',desc:'从语源线索还原今天的意大利语词汇。',kind:'exact'}
];
const VIVO_TASKS={
 dialogue:[
 {id:'vd-s1',group:'🍣 Sushi · 忙碌的周六',npc:'Chef',line:'Pietro, sono finiti i gamberi. Come facciamo?',goal:'先说明库存没有了，再建议用替代食材。',sample:'Sono finiti i gamberi. Possiamo usare un ingrediente alternativo per ora?',hint:'sono finiti... / possiamo usare...',note:'finiti 和 gamberi 配合；per ora = 暂时。'},
 {id:'vd-s2',group:'🍣 Sushi · 忙碌的周六',npc:'Chef',line:'Va bene. Quando arriva il fornitore?',goal:'解释供应商还没到，并承诺一有消息就通知。',sample:'Non è ancora arrivato. Ti avviso appena arriva.',hint:'non ... ancora / appena...',note:'appena arriva 在此可表示“他一到就……”。'},
 {id:'vd-s3',group:'🍣 Sushi · 忙碌的周六',npc:'Collega',line:'Posso prendere gli avocado maturi?',goal:'答应，并提醒要保留一些给晚班。',sample:'Certo, ma lasciamone alcuni per il turno di stasera.',hint:'certo, ma... / lasciamone...',note:'ne 指代部分 avocado；lasciamone = 我们留一些。'},
 {id:'vd-m1',group:'🏥 Ambulatorio · 预约医生',npc:'Segretaria',line:'Buongiorno, mi dica. Di cosa ha bisogno?',goal:'礼貌说明你想预约一次检查。',sample:'Buongiorno, vorrei prenotare una visita medica, per favore.',hint:'vorrei + infinito',note:'vorrei 比 voglio 更适合正式预约。'},
 {id:'vd-m2',group:'🏥 Ambulatorio · 预约医生',npc:'Segretaria',line:'Abbiamo posto giovedì mattina. Le va bene?',goal:'说明周四上午要工作，询问其他时间。',sample:'Giovedì mattina lavoro. Avete disponibilità nel pomeriggio?',hint:'giovedì mattina lavoro / nel pomeriggio',note:'avete disponibilità? 用来询问有没有空位。'},
 {id:'vd-m3',group:'🏥 Ambulatorio · 预约医生',npc:'Segretaria',line:'Venerdì alle sedici, allora. Conferma?',goal:'确认时间并询问需要带什么证件。',sample:'Sì, confermo. Devo portare qualche documento?',hint:'sì, confermo / devo portare...',note:'qualche 后通常接单数名词。'},
 {id:'vd-p1',group:'🚗 Autoscuola · 理论考试',npc:'Istruttore',line:'Perché ti sei fermato prima dell’incrocio?',goal:'解释因为看到了STOP标志。',sample:'Mi sono fermato perché ho visto il segnale di STOP.',hint:'mi sono fermato perché...',note:'fermarsi 的复合过去时用 essere。'},
 {id:'vd-p2',group:'🚗 Autoscuola · 理论考试',npc:'Istruttore',line:'E se il veicolo viene da destra?',goal:'说明一般应让右侧来车先行。',sample:'In generale devo dare la precedenza al veicolo che viene da destra.',hint:'dare la precedenza / che viene...',note:'che viene da destra 是修饰 veicolo 的关系从句。'},
 {id:'vd-p3',group:'🚗 Autoscuola · 理论考试',npc:'Istruttore',line:'Sulla strada bagnata che cosa cambia?',goal:'解释要降速并增加安全距离。',sample:'Riduco la velocità e aumento la distanza di sicurezza.',hint:'riduco / aumento',note:'两个现在时动词共同描述安全措施。'},
 {id:'vd-c1',group:'🏛️ Comune · 市政窗口',npc:'Impiegata',line:'Buongiorno. Qual è il motivo della sua visita?',goal:'说明你来领取一份文件。',sample:'Buongiorno, sono qui per ritirare un documento.',hint:'sono qui per + infinito',note:'per ritirare 表目的。'},
 {id:'vd-c2',group:'🏛️ Comune · 市政窗口',npc:'Impiegata',line:'Ha portato la ricevuta?',goal:'解释收据在手机里并询问电子版可不可以。',sample:'Ho la ricevuta sul telefono. Va bene anche in formato digitale?',hint:'ho ... sul telefono / va bene anche...?',note:'in formato digitale = 电子格式。'},
 {id:'vd-c3',group:'🏛️ Comune · 市政窗口',npc:'Impiegata',line:'Il documento sarà pronto la settimana prossima.',goal:'表示明白，并询问具体哪一天。',sample:'Ho capito, grazie. In quale giorno della prossima settimana posso tornare?',hint:'ho capito / in quale giorno...',note:'sarà 是 essere 的将来时。'}
 ],
 paraphrase:[
 {id:'vp-1',group:'厨房',npc:'词语禁令',line:'frigorifero',goal:'别直接说 frigorifero，描述它有什么用途。',sample:'È una macchina che mantiene il cibo freddo.',hint:'una macchina che... / il cibo freddo',note:'关系代词 che 可以修饰 macchina。'},
 {id:'vp-2',group:'诊所',npc:'词语禁令',line:'appuntamento',goal:'不能使用 appuntamento，向别人说明你要提前约好一个时间。',sample:'Vorrei fissare un orario per incontrare il medico.',hint:'fissare un orario / incontrare il medico',note:'用更熟悉的动词绕过抽象名词。'},
 {id:'vp-3',group:'驾考',npc:'词语禁令',line:'precedenza',goal:'不使用 precedenza，解释路口谁应该先通过。',sample:'Devo lasciare passare prima il veicolo che arriva da destra.',hint:'lasciare passare prima...',note:'用行为描述替换专业术语。'},
 {id:'vp-4',group:'市政',npc:'词语禁令',line:'scadenza',goal:'不使用 scadenza，解释最晚何时必须提交文件。',sample:'È l’ultimo giorno entro il quale devo consegnare il documento.',hint:'l’ultimo giorno / entro il quale...',note:'entro il quale 引出期限。'},
 {id:'vp-5',group:'购物',npc:'词语禁令',line:'scontrino',goal:'不说 scontrino，解释买东西后收银员给的纸。',sample:'È il foglio che ricevo alla cassa dopo aver pagato.',hint:'il foglio che ricevo / alla cassa',note:'dopo aver pagato = 付款之后。'},
 {id:'vp-6',group:'道路',npc:'词语禁令',line:'sottopassaggio',goal:'不用 sottopassaggio，解释从道路下方穿过去的通道。',sample:'È un passaggio che permette di andare sotto una strada.',hint:'un passaggio sotto una strada',note:'不会名词时可以用 che permette di... 描述功能。'}
 ],
 detective:[
 {id:'ve-1',group:'一致关系',line:'Ci vuole due ore per arrivare.',goal:'哪个动词词形需要修改？只输入正确词形。',answer:['vogliono'],sample:'Ci vogliono due ore per arrivare.',hint:'due ore 是复数。',note:'ci vogliono + 复数名词。'},
 {id:'ve-2',group:'过去时',line:'Ieri sono studiato tutto il giorno.',goal:'助动词有误。输入正确的第一人称单数形式。',answer:['ho'],sample:'Ieri ho studiato tutto il giorno.',hint:'studiare 在这里使用 avere。',note:'不是所有发生在过去的动词都用 essere。'},
 {id:'ve-3',group:'介词',line:'Si può incorrere a una multa.',goal:'固定搭配的介词是什么？',answer:['in'],sample:'Si può incorrere in una multa.',hint:'incorrere __ qualcosa',note:'incorrere in + 负面后果。'},
 {id:'ve-4',group:'虚拟式',line:'Puoi uscire, purché tu hai il permesso.',goal:'purché 后面的动词应改成什么？',answer:['abbia'],sample:'Puoi uscire, purché tu abbia il permesso.',hint:'avere 的现在虚拟式，tu...',note:'purché 表达条件，通常接 congiuntivo。'},
 {id:'ve-5',group:'宾语代词',line:'Il documento? La ritiro domani.',goal:'代词性数不合。输入正确的代词。',answer:['lo'],sample:'Il documento? Lo ritiro domani.',hint:'documento 是阳性单数。',note:'lo 是阳性单数直接宾语代词。'},
 {id:'ve-6',group:'存在与一致',line:'Sul tavolo ci sono un libro.',goal:'把动词改成与 un libro 一致的形式。',answer:['e','è'],sample:'Sul tavolo c’è un libro.',hint:'un libro 是单数。',note:'c’è 相当于 ci è；输入 è 或 e 都接受。'}
 ],
 roots:[
 {id:'vr-1',group:'拉丁语',line:'patēre → patens → lettera ...',goal:'今天表示「驾照 / 许可证」的单词？',answer:['patente'],sample:'patente',hint:'p 开头，7个字母。',note:'从“公开的文书”引申为官方许可。'},
 {id:'vr-2',group:'拉丁语',line:'ante- + stare',goal:'今天表示「位于前面的」的形容词？',answer:['antistante'],sample:'antistante',hint:'ante + stare 的派生词。',note:'ante- 表「之前」，不是 anti-「反对」。'},
 {id:'vr-3',group:'拉丁语',line:'trans- + portare',goal:'今天表示「运输」的动词？',answer:['trasportare'],sample:'trasportare',hint:'tra... + portare',note:'词形演变中可见 trans- 的痕迹。'},
 {id:'vr-4',group:'拉丁语',line:'signum → sigillum',goal:'今天表示「封印、印章」的名词？',answer:['sigillo'],sample:'sigillo',hint:'si...llo',note:'小印记逐渐成为文书上的封印。'},
 {id:'vr-5',group:'拉丁语',line:'prae-（事先）+ cautio（谨慎）',goal:'今天表示「预防措施」的名词？',answer:['precauzione'],sample:'precauzione',hint:'pre + cauzione 的类似词形。',note:'构词线索帮你理解在事情发生前小心防备。'},
 {id:'vr-6',group:'复合词',line:'sotto + passaggio',goal:'今天表示「下穿通道」的名词？',answer:['sottopassaggio'],sample:'sottopassaggio',hint:'把两个词连接起来。',note:'从词素即可猜出空间关系。'}
 ]
};
const VIVO_ALL=Object.values(VIVO_TASKS).reduce((all,arr)=>all.concat(arr),[]);
function vivoStore(){
 if(!state.vivo||typeof state.vivo!=='object'||Array.isArray(state.vivo))state.vivo={records:{},logs:[]};
 if(!state.vivo.records||typeof state.vivo.records!=='object'||Array.isArray(state.vivo.records))state.vivo.records={};
 if(!Array.isArray(state.vivo.logs))state.vivo.logs=[];
 return state.vivo;
}
function vivoNormalize(x){return String(x||'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/[’']/g,'').replace(/[^a-z0-9]+/g,' ').trim();}
function vivoComplete(t){return !!vivoStore().records[t.id]?.firstPassAt;}
function vivoStats(mode){
 const list=mode?VIVO_TASKS[mode]||[]:VIVO_ALL;
 return {done:list.filter(vivoComplete).length,total:list.length};
}
function vivoHomePanel(){
 const s=vivoStats();
 return '<section class="vivo-entry"><div class="vivo-orbit">🗣️</div><div><span class="vivo-kicker">NUOVO · ITALIANO VIVO</span><h2>让单词真正开口</h2><p>对话、忘词绕路、语法侦探、词根反推。离线也能练，表达题由你自己对照判定。</p><small>'+s.done+' / '+s.total+' 道首次通过</small></div><button class="btn primary" data-action="vivo-open">进入实战训练 ↗</button></section>';
}
function vivoBoardPanel(){return vivoHomePanel();}
function vivoHub(){
 const total=vivoStats();
 return '<div class="vivo-wrap"><div class="vivo-head"><span>LABORATORIO DI LINGUA · V0.8</span><h1>Italiano Vivo</h1><p>开口之前，先用文字把思路练熟。每道题首次通过只计一次，不靠重复点击刷成绩。</p><strong>'+total.done+' / '+total.total+' · 任务已通过</strong></div><div class="vivo-grid">'+VIVO_DECKS.map(m=>{
  const s=vivoStats(m.id);
  return '<button class="vivo-mode" data-action="vivo-select" data-id="'+m.id+'"><span class="vivo-bigicon">'+m.icon+'</span><b>'+m.title+'</b><i>'+m.subtitle+'</i><p>'+m.desc+'</p><span class="vivo-count">'+s.done+' / '+s.total+' 完成　 →</span></button>';
 }).join('')+'</div><p class="vivo-disclaimer">本模块为原创离线训练，并非实时AI聊天或官方考试题库。自由表达由学习者参考样例自行评价；精确填词采用规范化文字匹配。</p><button class="btn secondary" data-action="vivo-exit">← 返回冒险中心</button></div>';
}
function vivoCurrent(){return (VIVO_TASKS[ui.vivoMode]||[])[ui.vivoIndex]||null;}
function vivoView(){
 if(!ui.vivoMode)return vivoHub();
 const deck=VIVO_DECKS.find(m=>m.id===ui.vivoMode),list=VIVO_TASKS[ui.vivoMode]||[],t=vivoCurrent();
 if(!deck||!t)return vivoHub();
 const rec=vivoStore().records[t.id]||{},exact=deck.kind==='exact',feedback=ui.vivoFeedback;
 const pos=ui.vivoIndex+1,percent=Math.round(100*pos/list.length);
 return '<div class="vivo-wrap"><div class="vivo-route"><button class="btn secondary small" data-action="vivo-hub">← 四大训练区</button><span>'+deck.icon+' '+deck.title+'</span></div>'+
 '<div class="vivo-track"><div style="width:'+percent+'%"></div></div><div class="vivo-pagination"><span>关卡 '+pos+' / '+list.length+'</span><span>'+(rec.firstPassAt?'✓ 首次通关已记载':'等待首次通关')+'</span></div>'+
 '<section class="vivo-stage"><div class="vivo-chapter">'+esc(t.group)+' · '+esc(deck.subtitle)+'</div>'+
 '<div class="vivo-npc"><span class="vivo-avatar">'+(ui.vivoMode==='dialogue'?'💬':ui.vivoMode==='detective'?'🕵️':ui.vivoMode==='roots'?'🏺':'🧩')+'</span><div><small>'+esc(t.npc||'任务文书')+'</small><p>'+esc(t.line)+'</p></div></div>'+
 '<div class="vivo-mission"><strong>🎯 今日目标</strong><p>'+esc(t.goal)+'</p></div>'+
 (feedback?'<div class="vivo-response"><small>你刚刚的回答</small><p>'+esc(ui.vivoDraft)+'</p></div><div class="vivo-reference"><strong>📜 参考表达</strong><p>'+esc(t.sample)+'</p><small>'+esc(t.note)+'</small></div>'+
 (feedback.self?'<div class="vivo-controls"><button class="btn primary" data-action="vivo-grade" data-grade="1">✓ 我能独立表达</button><button class="btn secondary" data-action="vivo-grade" data-grade="0">还需练习</button></div><p class="vivo-disclaimer">参考表达不是唯一答案。请按含义和语法自行判定，不是AI批改。</p>':
 '<div class="vivo-result '+(feedback.passed?'good':'again')+'">'+(feedback.passed?'✓ 已记下这次成功。':'↻ 本题记为待巩固，可以再试。')+'</div><div class="vivo-controls"><button class="btn secondary" data-action="vivo-retry">再试这道题</button><button class="btn primary" data-action="vivo-next">下一关 →</button></div>'):
 '<form data-vivo-submit class="vivo-form"><label for="vivo-input">'+(exact?'输入正确词语':'用意大利语写出自己的回答')+'</label><textarea id="vivo-input" rows="'+(exact?'2':'3')+'" maxlength="450" required autocapitalize="sentences" autocomplete="off" spellcheck="false" placeholder="'+(exact?'Scrivi la risposta…':'Prova a rispondere in italiano…')+'">'+esc(ui.vivoDraft||'')+'</textarea><div class="vivo-controls"><button type="button" class="btn secondary" data-action="vivo-hint">'+(ui.vivoHint?'收起提示':'🕯️ 一点提示')+'</button><button type="submit" class="btn primary">'+(exact?'核对词形':'对照参考表达')+' →</button></div></form>'+
 (ui.vivoHint?'<div class="vivo-tip">'+esc(t.hint)+'</div>':''))+
 '</section><div class="vivo-footnav"><button class="btn secondary" data-action="vivo-prev" '+(ui.vivoIndex===0?'disabled':'')+'>← 上一关</button><button class="btn secondary" data-action="vivo-next">跳到下一关 →</button></div></div>';
}
function vivoReset(){ui.vivoDraft='';ui.vivoFeedback=null;ui.vivoHint=false;}
function vivoOpen(){
 ui.tab='practice';ui.vivoOpen=true;ui.vivoMode=null;ui.vivoIndex=0;vivoReset();ui.chanceryId=null;ui.quiz=null;ui.sceneId=null;ui.adventureId=null;ui.mysteryId=null;ui.rootsOpen=false;ui.detailId=null;
 render();window.scrollTo(0,0);
}
function vivoStart(mode){
 if(!VIVO_TASKS[mode])return;
 vivoOpen();ui.vivoMode=mode;const arr=VIVO_TASKS[mode];const index=arr.findIndex(t=>!vivoComplete(t));ui.vivoIndex=index<0?0:index;render();
}
function vivoMove(step){
 const arr=VIVO_TASKS[ui.vivoMode]||[];if(!arr.length)return;
 const next=ui.vivoIndex+step;if(next<0){return}if(next>=arr.length){ui.vivoMode=null;vivoReset();render();window.scrollTo(0,0);return}
 ui.vivoIndex=next;vivoReset();render();window.scrollTo(0,0);
}
function vivoSaveResult(passed){
 const t=vivoCurrent();if(!t||!ui.vivoFeedback||ui.vivoFeedback.self===false)return;
 const store=vivoStore(),at=Date.now(),prev=store.records[t.id]||{tries:0,firstPassAt:null};
 store.records[t.id]={tries:Math.max(0,Number(prev.tries)||0)+1,firstPassAt:prev.firstPassAt||(passed?at:null),lastAt:at,lastPass:!!passed};
 store.logs.push({id:'vivo-'+at+'-'+Math.random().toString(36).slice(2,8),taskId:t.id,passed:!!passed,at:at,answer:String(ui.vivoDraft).slice(0,450)});
 store.logs=store.logs.slice(-120);save();
 ui.vivoFeedback={self:false,passed:!!passed};render();
}
function vivoSubmit(form){
 const t=vivoCurrent();if(!t)return;
 const value=String(form.querySelector('#vivo-input')?.value||'').trim().slice(0,450);
 if(!value){toast('先写下你自己的意大利语回答');return}
 ui.vivoDraft=value;const mode=VIVO_DECKS.find(m=>m.id===ui.vivoMode);
 if(mode.kind==='exact'){
  const passed=(t.answer||[]).some(x=>vivoNormalize(x)===vivoNormalize(value));
  ui.vivoFeedback={self:true};vivoSaveResult(passed);
 }else{ui.vivoFeedback={self:true};render();}
}
function vivoImportFromBackup(imported){
 if(!imported||typeof imported!=='object'||Array.isArray(imported))return;
 const store=vivoStore(),valid=new Set(VIVO_ALL.map(t=>t.id));
 for(const [id,src] of Object.entries(imported.records||{})){
  if(!valid.has(id)||!src||typeof src!=='object')continue;
  const dest=store.records[id]||{tries:0,firstPassAt:null,lastAt:0,lastPass:false};
  const candidate=Number(src.firstPassAt),ts=Number(src.lastAt);
  if(Number.isFinite(candidate)&&candidate>0)dest.firstPassAt=dest.firstPassAt?Math.min(dest.firstPassAt,candidate):candidate;
  dest.tries=Math.max(Number(dest.tries)||0,Math.min(99999,Math.max(0,Number(src.tries)||0)));
  if(Number.isFinite(ts)&&ts>Number(dest.lastAt||0)){dest.lastAt=ts;dest.lastPass=!!src.lastPass;}
  store.records[id]=dest;
 }
 const seen=new Set(store.logs.map(x=>x.id));
 for(const x of Array.isArray(imported.logs)?imported.logs:[]){
  if(!x||typeof x.id!=='string'||x.id.length>90||seen.has(x.id)||!valid.has(x.taskId)||!Number.isFinite(x.at))continue;
  seen.add(x.id);store.logs.push({id:x.id,taskId:x.taskId,passed:!!x.passed,at:x.at,answer:String(x.answer||'').slice(0,450)});
 }
 store.logs=store.logs.sort((a,b)=>a.at-b.at).slice(-120);
}
function vivoAction(name,btn){
 if(name==='vivo-open'){vivoOpen();return true}
 if(name==='vivo-exit'){ui.vivoOpen=false;ui.vivoMode=null;vivoReset();render();return true}
 if(name==='vivo-hub'){ui.vivoMode=null;vivoReset();render();return true}
 if(name==='vivo-select'){vivoStart(btn.dataset.id);return true}
 if(!ui.vivoOpen||!ui.vivoMode)return false;
 if(name==='vivo-hint'){ui.vivoDraft=document.querySelector('#vivo-input')?.value||ui.vivoDraft;ui.vivoHint=!ui.vivoHint;render();return true}
 if(name==='vivo-grade'){if(ui.vivoFeedback?.self)vivoSaveResult(btn.dataset.grade==='1');return true}
 if(name==='vivo-retry'){vivoReset();render();return true}
 if(name==='vivo-next'){vivoMove(1);return true}
 if(name==='vivo-prev'){vivoMove(-1);return true}
 return false;
}
document.addEventListener('submit',e=>{if(e.target?.matches?.('[data-vivo-submit]')){e.preventDefault();vivoSubmit(e.target)}});
