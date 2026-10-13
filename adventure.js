/* Piccola Italiano v0.3: original, choice-driven Italian life adventures.
   Data is local to the learner. Badges/XP are bounded, never paywalled. */
'use strict';
const ADVENTURES = [
  {id:'sushi-rush',emoji:'🍣',zone:'Lavoro',level:'A2',title:'周六寿司台告急',subtitle:'Il sabato del caos',lead:'今晚有300多位客人。Gamberi突然不够，Chef转头看向你。',links:['w-mancare','s-mancano','g-ci'],badge:'🥢 冷静小厨师',steps:[
    {who:'Chef',line:'Pietro, mancano i gamberi! Cosa facciamo?',scene:'厨师希望你提出办法。',options:[['Possiamo usare un ingrediente alternativo.','✓ 解决思路清楚，也很自然。',2],['Non è problema, ciao.','缺少冠词，而且现在说再见不合场景。',0],['Ne mancano due confezioni.','正确地说明数量，但还没提出解决办法。',1]],tip:'mancano + 复数；possiamo + 不定式。'},
    {who:'Collega',line:'Puoi controllare anche gli avocado?',scene:'请给同事一个明确承诺。',options:[['Sì, li controllo subito e ti faccio sapere.','✓ li 指代 gli avocado，沟通完整。',2],['Sì, controlla subito.','controlla 是你让对方检查，不是在答应自己检查。',0],['Va bene, controllo.','可以，但还没有说明何时反馈。',1]],tip:'ti faccio sapere = 我会告诉你。'},
    {who:'Chef',line:'Se arriva il fornitore, avvisami.',scene:'供应商到了该怎么答？',options:[['Certo, appena arriva ti avviso.','✓ 简洁自然的回应。',2],['Arrivato domani forse.','没有表达你会通知Chef。',0],['D’accordo!','这句没错，但完整回应更好。',1]],tip:'appena arriva = 他一到。'}]},
  {id:'bassano-bar',emoji:'☕',zone:'Veneto',level:'A2–B1',title:'Bassano咖啡馆暗号',subtitle:'Ciò, toso!',lead:'同事带你去小酒吧，地方口语突然变得密集。',links:['w-schei','w-toso','w-ciacole','w-mona'],badge:'☕ Veneto通行证',steps:[
    {who:'Amico',line:'Ciò, toso! Come buta?',scene:'一声地方问候，你该怎么接？',options:[['Tutto bene, grazie! E tu?','✓ 用标准意大利语回应方言非常自然。',2],['Non capisco, sei pazzo!','太冲，朋友可能被吓一跳。',0],['Ciao!','当然可以，但少了回应近况。',1]],tip:'Ciò/toso 属于地域口语；不必强行模仿方言。'},
    {who:'Amico',line:'Facciamo due ciacole?',scene:'这里的ciacole到底是什么？',options:[['Volentieri, parliamo un po’!','✓ ciacole ≈ chiacchiere，闲聊。',2],['Sì, due caffè molto lunghi.','ciacole 不是两杯咖啡。',0],['Magari più tardi.','合理拒绝，但没有展现你理解词义。',1]],tip:'Veneto ciacole = chiacchiere；地方拼写可能有差异。'},
    {who:'Amico',line:'Oggi non go schei!',scene:'朋友说没钱，你想礼貌地请客。',options:[['Tranquillo, oggi offro io!','✓ schei = soldi；offro io = 我请客。',2],['Dai, non fare il mona!','mona 可能带冒犯意味，不适合随便模仿。',0],['Va bene.','语法没问题，但未表达请客。',1]],tip:'在正式语境优先使用 soldi。'}]},
  {id:'autoscuola',emoji:'🚦',zone:'Patente',level:'A2–B1',title:'教练的路口陷阱',subtitle:'Chi ha la precedenza?',lead:'驾校教练把车停在路口，准备连续三问。',links:['w-precedenza','w-salvo','s-precedenza'],badge:'🚦 路权观察员',steps:[
    {who:'Istruttore',line:'Non ci sono segnali. Da dove arriva un veicolo: chi passa prima?',scene:'一般情况下，没有特殊标志的交叉口。',options:[['Di norma do precedenza a chi arriva da destra.','✓ 一般规则是右方来车优先。',2],['Passo sempre io.','危险，而且不符合规则。',0],['Dipende dai segnali.','有例外，但题目说没有信号，需要说出基本规则。',1]],tip:'salvo diversa segnalazione = 除非有其他标志。'},
    {who:'Istruttore',line:'Vedi STOP. Basta rallentare?',scene:'车已来到STOP标志前。',options:[['No, devo fermarmi completamente.','✓ STOP不仅是减速，必须停车。',2],['Sì, se non vedo macchine.','不对。即使没车也要停车。',0],['Guardo prima a destra.','观察很重要，但不能省略停车。',1]],tip:'fermarsi = 停车；rallentare = 减速。'},
    {who:'Istruttore',line:'Piove. Che cosa fai?',scene:'下雨，制动距离可能延长。',options:[['Riduco la velocità e aumento la distanza.','✓ 降速并增大车距。',2],['Accelero per uscire dalla pioggia.','雨天加速可能增加风险。',0],['Accendo i fari se necessario.','灯光可能有帮助，但问题更关注速度和距离。',1]],tip:'aderenza = 抓地力；distanza di sicurezza = 安全距离。'}]},
  {id:'questura',emoji:'🪪',zone:'Vita',level:'A2',title:'窗口领取证件',subtitle:'Buongiorno, mi dica.',lead:'窗口工作人员语速很快，你得说明来意。',links:['w-ritirare','g-pronomi','s-documento'],badge:'🪪 办事小能手',steps:[
    {who:'Impiegata',line:'Buongiorno, di cosa ha bisogno?',scene:'你是来领取居留证的。',options:[['Sono qui per ritirare il permesso di soggiorno.','✓ 目的表达完整且礼貌。',2],['Io qui documento.','缺少核心动词，不够自然。',0],['Buongiorno!','有礼貌，但还没说明目的。',1]],tip:'essere qui per + 动词不定式。'},
    {who:'Impiegata',line:'Ha un documento d’identità?',scene:'身份证带着，应该怎么回答？',options:[['Sì, ce l’ho qui.','✓ ce l’ho = 我带着它。',2],['No, non esisto.','语义不对。',0],['Sì, certo.','可以，但再说明就在这里更清楚。',1]],tip:'ce l’ho：ci + lo + ho 的常见口语组合。'},
    {who:'Impiegata',line:'Deve aspettare qualche minuto.',scene:'工作人员让你稍等。',options:[['Va bene, grazie. Aspetto qui.','✓ 简短且礼貌。',2],['Aspetti tu!','你反而命令对方等。',0],['Va bene.','可以，但表达更具体更自然。',1]],tip:'deve aspettare = 您需要等。'}]},
  {id:'vicini',emoji:'🏠',zone:'Vita',level:'B1',title:'邻居敲门投诉',subtitle:'Scusa il disturbo.',lead:'晚上，你正在玩游戏。邻居敲门表示声音太大。',links:['g-condizionale','sc-vicini'],badge:'🏠 和平邻居',steps:[
    {who:'Vicino',line:'Si sente molto rumore dal tuo appartamento.',scene:'先表达歉意。',options:[['Mi dispiace, non me ne ero accorto.','✓ 礼貌且自然。',2],['È casa mia, faccio quello che voglio.','生硬且会让冲突升级。',0],['Davvero?','能用，但尚未回应困扰。',1]],tip:'non me ne ero accorto = 我之前没注意到。'},
    {who:'Vicino',line:'Domani mi alzo molto presto.',scene:'你可以怎么安排？',options:[['Abbasso subito il volume.','✓ 直接解决问题。',2],['Alzati più tardi!','是在命令对方晚起。',0],['Capisco.','表达理解，但还没有承诺。',1]],tip:'abbassare il volume = 调低音量。'},
    {who:'Vicino',line:'Grazie, buona notte.',scene:'礼貌结束对话。',options:[['Buona notte, scusa ancora!','✓ 自然得体。',2],['Mona!','不要用侮辱性方言回应邻居。',0],['Ciao.','可以，但不如祝晚安更贴切。',1]],tip:'熟悉的人也要区分口语和不礼貌表达。'}]},
  {id:'vet-timo',emoji:'🐭',zone:'Vita',level:'B1',title:'带Timo去宠物医院',subtitle:'Dal veterinario',lead:'要向兽医清楚描述龙猫的状态和时间变化。',links:['w-appuntamento','g-passato'],badge:'🐭 Timo守护者',steps:[
    {who:'Veterinaria',line:'Buongiorno, che cosa è successo?',scene:'假设Timo昨天跳跃时有点跛。',options:[['Ieri ha iniziato a zoppicare dopo un salto.','✓ 清楚描述时间和发生顺序。',2],['Timo piede ieri no.','表达过于零碎。',0],['Non lo so.','如实表达可以，但应该补充你观察到的事实。',1]],tip:'zoppicare = 跛行；iniziare a + 不定式。'},
    {who:'Veterinaria',line:'Mangia e beve normalmente?',scene:'假设食欲和喝水情况正常。',options:[['Sì, mangia e beve come al solito.','✓ 回答准确、具体。',2],['Sì, ieri ho bevuto io.','ho bevuto io 是说你自己喝水。',0],['Sì.','可以，但少了关键信息。',1]],tip:'come al solito = 和往常一样。'},
    {who:'Veterinaria',line:'Se nota cambiamenti, mi chiami.',scene:'回应观察建议。',options:[['D’accordo, la contatto se cambia qualcosa.','✓ 正式礼貌，信息完整。',2],['Non ti ascolto.','语义不合适。',0],['Grazie.','礼貌，但承诺可以更明确。',1]],tip:'la contatto：正式场合用La作宾语代词。'}]}
];
function adventureData(){
 if(!state.adventure||typeof state.adventure!=='object')state.adventure={};
 const a=state.adventure;
 if(!a.stepWins||typeof a.stepWins!=='object')a.stepWins={};
 if(!a.episodes||typeof a.episodes!=='object')a.episodes={};
 if(!Array.isArray(a.logs))a.logs=[];
 return a;
}
function adventureXP(){const a=adventureData();return Object.values(a.stepWins).filter(Boolean).length*10+Object.keys(a.episodes).length*30;}
function adventureLevel(){const xp=adventureXP();return {title:xp>=300?'Capitano delle parole':xp>=140?'Esploratore':xp>=50?'Apprendista':'Nuovo arrivato',number:xp>=300?4:xp>=140?3:xp>=50?2:1};}
function adventureHomePanel(){const a=adventureData(),level=adventureLevel(),count=Object.keys(a.episodes).length;return `<section class="story-promo"><div><span class="eyebrow">🎲 IL MONDO DI PIETRO</span><h3>生活是一场意大利语冒险</h3><p>${count}/${ADVENTURES.length} 剧情通关 · LV.${level.number} ${level.title} · ${adventureXP()} XP</p></div><button class="btn secondary small" data-action="adventure-open">打开冒险地图 ↗</button></section>`}
function adventureMap(){const a=adventureData(),level=adventureLevel(),done=Object.keys(a.episodes).length;
 return `<section class="adventure-top"><div><span class="eyebrow">🎲 PICCOLA STORIES</span><h1>La vita è un’avventura.</h1><p>不必死背台词。像玩剧情游戏一样，听懂NPC、作出选择、发现用法，最后打开关联知识。</p></div><div class="adv-stats"><span>⭐ ${adventureXP()} XP</span><span>🧭 LV.${level.number} ${level.title}</span><span>🎖 ${done}/${ADVENTURES.length} 徽章</span></div></section>
 <div class="notice">💡 没有扣血、没有断签惩罚。第一次完成正确情景会获得XP，反复玩可复习但不会无限刷分。</div>
 <div class="adventure-grid">${ADVENTURES.map((c,i)=>`<button class="adv-entry" data-action="adventure-play" data-id="${c.id}"><span class="adv-emoji">${c.emoji}</span><span class="adv-meta">EPISODIO ${String(i+1).padStart(2,'0')} · ${esc(c.zone)} · ${esc(c.level)}</span><strong>${esc(c.title)}</strong><em>${esc(c.subtitle)}</em><p>${esc(c.lead)}</p><span class="adv-status">${a.episodes[c.id]?'🏅 已通关 · 重玩':'▶ 开始剧情'}</span></button>`).join('')}</div>
 <section class="card" style="margin-top:18px"><h3>🏆 勋章墙</h3><div class="badge-wall">${ADVENTURES.map(c=>`<span class="badge-medal ${a.episodes[c.id]?'earned':''}">${a.episodes[c.id]?esc(c.badge):'🔒 '+esc(c.badge.replace(/^\S+ /,''))}</span>`).join('')}</div></section>`
}
function adventurePlayView(){const chapter=ADVENTURES.find(x=>x.id===ui.adventureId);if(!chapter){ui.adventureId=null;return adventureMap()}
 const i=ui.adventureStep||0,step=chapter.steps[i],result=ui.adventureChoice,points=(ui.adventureRun||[]).reduce((n,s)=>n+s.score,0);
 if(i>=chapter.steps.length)return adventureEnding(chapter,points);
 return `${heading('🎬 ${esc(chapter.title)}',`${esc(chapter.subtitle)} · ${i+1}/${chapter.steps.length}`,`<button class="btn secondary small" data-action="adventure-exit">← 地图</button>`)}
 <section class="adventure-play card"><div class="adv-scene-icon">${chapter.emoji}</div><div class="adv-scene-caption">${esc(chapter.lead)}</div><div class="progress-track"><span style="width:${100*(i+(result!==null?1:0))/chapter.steps.length}%"></span></div>
 <div class="adv-speaker"><span>🗣️ ${esc(step.who)}</span><button class="btn secondary small" data-action="adventure-speak" data-say="${esc(step.line)}">🔊 听发音</button></div>
 <div class="adv-speech" lang="it">${esc(step.line)}</div><div class="adv-goal">🎯 ${esc(step.scene)}</div>
 <div class="adv-options">${step.options.map(([answer,feedback,score],j)=>`<button class="adv-option ${result===j?'chosen':''}" data-action="adventure-choice" data-choice="${j}" ${result!==null?'disabled':''}><span>${'ABC'[j]}.</span><strong lang="it">${esc(answer)}</strong></button>`).join('')}</div>
 ${result!==null?`<div class="adv-feedback ${step.options[result][2]===2?'good':''}"><b>${step.options[result][2]===2?'✨ Benissimo!':'📖 学到了新东西'}</b><p>${esc(step.options[result][1])}</p><small>🧠 ${esc(step.tip)}</small></div><button class="btn primary" data-action="adventure-next">${i+1===chapter.steps.length?'查看结局 →':'下一幕 →'}</button>`:'<p class="muted small">请选择一个回应。选择后会解释原因，所有选项都能继续剧情。</p>'}
 </section><section class="card" style="margin-top:15px"><b>🔗 这集的语言线索</b><div class="adv-connections">${chapter.links.map(id=>{const item=byId(id);return item?`<button class="chip" data-action="detail" data-id="${esc(id)}">${esc(item.title)} ↗</button>`:''}).join('')}</div></section>`;
}
function adventureEnding(chapter,score){const max=chapter.steps.length*2,quality=score>=max-1?'🌟 完美交涉':score>=3?'✅ 成功完成':'📚 还可以再练练';return `${heading('🎞️ 剧终 · Episodio completato','你完成了这个生活场景！',`<button class="btn secondary small" data-action="adventure-exit">返回地图</button>`)}<section class="card adv-ending"><div class="adv-ending-icon">${chapter.emoji}</div><h2>${esc(quality)}</h2><p>${esc(chapter.title)}</p><div class="adv-score">${score}<small> / ${max}</small></div><div class="notice">${score>=max-1?'NPC对你印象不错！表达自然、反应及时。':'真实交流没有一条唯一台词。复习知识点，再挑战可以更自然。'}</div><p>已解锁：${esc(chapter.badge)}</p><div class="adv-end-buttons"><button class="btn secondary" data-action="adventure-replay">↻ 重玩本集</button><button class="btn primary" data-action="adventure-exit">去下一集 ↗</button></div></section>`}
function startAdventure(id){if(!ADVENTURES.some(x=>x.id===id))return;ui.tab='practice';ui.quiz=null;ui.sceneId=null;ui.adventureId=id;ui.adventureStep=0;ui.adventureChoice=null;ui.adventureRun=[];render();window.scrollTo(0,0)}
function adventureAction(name,btn){switch(name){
 case 'adventure-open':ui.tab='practice';ui.quiz=null;ui.sceneId=null;ui.adventureId=null;render();window.scrollTo(0,0);return true;
 case 'adventure-play':startAdventure(btn.dataset.id);return true;
 case 'adventure-exit':ui.adventureId=null;ui.adventureChoice=null;ui.adventureRun=[];render();return true;
 case 'adventure-replay':startAdventure(ui.adventureId);return true;
 case 'adventure-choice':{const c=ADVENTURES.find(x=>x.id===ui.adventureId);if(!c||ui.adventureChoice!==null)return true;const j=Number(btn.dataset.choice),step=c.steps[ui.adventureStep];if(!Number.isInteger(j)||!step?.options[j])return true;ui.adventureChoice=j;const win=step.options[j][2]===2;if(win){const a=adventureData();a.stepWins[c.id+':'+ui.adventureStep]=true;save()}render();return true;}
 case 'adventure-next':{const c=ADVENTURES.find(x=>x.id===ui.adventureId);if(!c||ui.adventureChoice===null)return true;const step=c.steps[ui.adventureStep];ui.adventureRun.push({step:ui.adventureStep,answer:ui.adventureChoice,score:step.options[ui.adventureChoice][2]});ui.adventureStep++;ui.adventureChoice=null;if(ui.adventureStep===c.steps.length){const a=adventureData();a.episodes[c.id]=Math.max(a.episodes[c.id]||0,ui.adventureRun.reduce((n,x)=>n+x.score,0));a.logs.push({id:'adventure-'+Date.now()+'-'+Math.random().toString(36).slice(2,6),episode:c.id,score:ui.adventureRun.reduce((n,x)=>n+x.score,0),ts:Date.now()});a.logs=a.logs.slice(-100);save();}render();window.scrollTo(0,0);return true;}
 case 'adventure-speak':{if(!window.speechSynthesis||!window.SpeechSynthesisUtterance){toast('本机浏览器暂不支持发音');return true}speechSynthesis.cancel();const utterance=new SpeechSynthesisUtterance(btn.dataset.say||'');utterance.lang='it-IT';utterance.rate=.87;speechSynthesis.speak(utterance);return true;}
 default:return false;
}}