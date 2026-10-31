/* Piccola Italiano v0.15 · original, constrained practice for everyday communication.
 * This block extends the catalogue only; it does not read or write learner state.
 * Exact-match text tasks specify the words or transformation to use.
 */
'use strict';
{
  const lessons = [
    {
      id:'auto-polite-requests',unitId:'it-polite-requests',title:'把请求说得礼貌、明确',
      goal:'按对象和目的，使用 vorrei、potresti、potrei 与确认句。',
      focusLabels:{desire:'表达愿望',request:'请对方帮忙',permission:'询问许可',confirmation:'确认信息'},
      explanation:['Vorrei + 不定式表达“我想……”，常用于礼貌提出需求。','Potresti + 不定式是对熟悉的人说“你能否……”；对陌生人可用敬称 Potrebbe。','Potrei 表示“我能否……”。想确认信息，可以说 Vorrei sapere…；本课改写题会指定人称和形式。'],
      example:{it:'Potresti ripetere l’orario, per favore?',zh:'你能重复一下时间吗？potresti 对应熟悉对象 tu。'},
      speech:'Potresti ripetere l’orario, per favore?'
    },
    {
      id:'auto-shortages',unitId:'it-shortages',title:'把缺货和替代方案说清楚',
      goal:'用 manca、mancano、basta、bastano 说明数量，再提出具体替代。',
      focusLabels:{singular:'缺少一项',plural:'缺少多项',enough:'是否足够',alternative:'提出替代'},
      explanation:['Manca un piatto 表示缺一个盘子；Mancano due piatti 表示缺两个。动词跟缺少的东西配合。','Basta un minuto / Bastano due minuti：是否足够，同样看后面的数量。','替代可以用 Possiamo usare… 或 al posto di…；这里只检查指定短句，不判断任意建议。'],
      example:{it:'Mancano due vassoi. Possiamo usare due piatti grandi.',zh:'缺两个托盘。我们可以用两个大盘子。'},
      speech:'Mancano due vassoi. Possiamo usare due piatti grandi.'
    },
    {
      id:'auto-people-datives',unitId:'it-people-datives',title:'给谁、向谁：看清动词的对象',
      goal:'在明确对象下区分 lo / la 与 gli / le / mi。',
      focusLabels:{to_him:'向他：gli',to_her:'向她：le',to_me:'向我：mi',direct_indirect:'直接与间接对象'},
      explanation:['Vedo Marco：看见谁，Marco 是直接宾语，所以用 Lo vedo。Telefono a Marco：打电话给谁，用 Gli telefono。','间接宾语的 a lui → gli，a lei → le，a me → mi。这里的 le 可以表示“向她”，不一定是“她们”。','必须结合动词结构和上下文判断。本课只练单个代词，先不组合两个代词。'],
      example:{it:'Scrivo a Giulia. Le scrivo ogni settimana.',zh:'我给 Giulia 写信。每周给她写。le 在这里代替 a Giulia。'},
      speech:'Scrivo a Giulia. Le scrivo ogni settimana.'
    },
    {
      id:'auto-everyday-interaction',unitId:'it-everyday-interaction',title:'办事对话：请求、确认、结束',
      goal:'在预约和购物场景完成一个清楚的短回合。',
      focusLabels:{appointment:'提出预约',order:'说明购买需求',clarification:'请求澄清',closing:'确认与结束'},
      explanation:['先说需求：Vorrei prenotare… / Vorrei comprare…；需要时补上时间或数量。','没听清可以请求重复：Può ripetere, per favore? 不必假装已经听懂。','结束前确认关键时间或数量。本课只填写指定表达；文字答题不等于真实电话听力。'],
      example:{it:'Vorrei prenotare un tavolo per due. Per le otto, grazie.',zh:'我想订一张两人桌。晚上八点，谢谢。'},
      speech:'Vorrei prenotare un tavolo per due. Per le otto, grazie.'
    },
    {
      id:'auto-relative-che',unitId:'it-relative-che',title:'用 che 把两句话接起来',
      goal:'识别被修饰的名词，按指定结构合并主语或宾语关系句。',
      focusLabels:{subject:'che 作主语',object:'che 作宾语',antecedent:'找到被修饰名词',plural:'复数关系句'},
      explanation:['关系代词 che 接在被修饰名词后，可以在从句里作主语：Il collega che lavora qui…','Che 也可作直接宾语：Il libro che leggo…，leggo 的主语是 io，书是被读的东西。','Che 本身不随性数变化；若 che 是从句主语，动词仍需配合所指名词的单复数。'],
      example:{it:'La collega che lavora al bar si chiama Anna.',zh:'在吧台工作的那位女同事叫 Anna。che 指 la collega，作 lavora 的主语。'},
      speech:'La collega che lavora al bar si chiama Anna.'
    },
    {
      id:'auto-reference-tracking',unitId:'it-reference-tracking',title:'长一点的句子里，谁指向谁',
      goal:'追踪人物、东西与收件对象；发现指代不清时重新写明名字。',
      focusLabels:{subject:'主语指代',object:'物品指代',recipient:'接受者',ambiguity:'消除歧义'},
      explanation:['先找代词前面已经出现的名词，再用性数、动词意义和上下文核对。','Marco dà il pacco a Giulia. Lei lo apre. 这里 lei 是 Giulia，lo 是 il pacco。','两个同性人物都可能是 lui 的对象时，单靠代词不一定能判断；把名字写出来更清楚。'],
      example:{it:'Anna prende la borsa. La porta a Marco. Lui la apre.',zh:'Anna 拿起包，带给 Marco。Marco 打开它；lui 指 Marco，两处 la 都指包。'},
      speech:'Anna prende la borsa. La porta a Marco. Lui la apre.'
    },
    {
      id:'auto-cause-result',unitId:'it-cause-result',title:'分清原因、结果与转折',
      goal:'按给定逻辑选择连接词，并用指定连接词合并短句。',
      focusLabels:{cause:'说明原因',result:'说明结果',contrast:'表达转折',sequence:'交代顺序'},
      explanation:['Perché 可以引出原因：Resto a casa perché sono stanco。','Quindi 常引出结果；però 表示与前句预期不同的转折。','Prima / poi 说明先后顺序，不自动说明因果。填空题会明确要求使用哪个关系或词。'],
      example:{it:'Il negozio è chiuso, quindi torniamo domani.',zh:'商店关门了，因此我们明天再来。quindi 连接前面的情况与后面的结果。'},
      speech:'Il negozio è chiuso, quindi torniamo domani.'
    },
    {
      id:'auto-connected-narration',unitId:'it-connected-narration',title:'把背景、事件与结果接起来',
      goal:'在给定材料内区分过去背景和完成事件，并整理时间顺序。',
      focusLabels:{background:'过去背景',event:'完成事件',sequence:'事件顺序',result:'最后结果'},
      explanation:['Pioveva 描写当时的背景；sono arrivato 交代一个完成事件。时态要结合句子意思。','Mentre cucinavo, è arrivato Marco：做饭是持续背景，Marco 到来是发生的事件。','先后可用 prima、poi、alla fine。这里按指定词改写，不把有限答案当作自由叙事评分。'],
      example:{it:'Mentre preparavo la cena, è suonato il telefono.',zh:'我正在准备晚餐时，电话响了。背景用未完成过去时，发生的事件用复合过去时。'},
      speech:'Mentre preparavo la cena, è suonato il telefono.'
    },
    {
      id:'auto-work-report',unitId:'it-work-report',title:'报告现状、问题与下一步',
      goal:'用简短、可核对的句子报告数量、影响与拟采取的行动。',
      focusLabels:{status:'当前现状',problem:'具体问题',impact:'造成的影响',action:'下一步行动'},
      explanation:['先给事实：Abbiamo sei vassoi pronti，而不是只说“出问题了”。','再说明问题和影响：Mancano due scatole, quindi…；数量要与实际文本一致。','行动用明确主语和动词：Chiamo il fornitore。练习只根据给定事实，不能擅自增加承诺或原因。'],
      example:{it:'Mancano due scatole di riso. Chiamo il fornitore per chiedere informazioni.',zh:'少了两箱米。我联系供应商询问信息。'},
      speech:'Mancano due scatole di riso. Chiamo il fornitore per chiedere informazioni.'
    },
    {
      id:'auto-shift-negotiation',unitId:'it-shift-negotiation',title:'说明限制，再提出替代时间',
      goal:'解释不能到场的原因，提出具体替代并确认安排。',
      focusLabels:{constraint:'时间限制',reason:'说明原因',alternative:'替代方案',confirmation:'确认安排'},
      explanation:['Non posso venire alle tre 说明限制；perché 后面可以补上原因。','给出可以执行的替代：Potrei venire alle cinque / Possiamo scambiare i turni?','确认时重述已经商定的日期和时间。题目会指定句式，不把多个合理协商方案混成唯一答案。'],
      example:{it:'Alle tre non posso venire. Potrei arrivare alle cinque.',zh:'三点我来不了。我可以五点到。'},
      speech:'Alle tre non posso venire. Potrei arrivare alle cinque.'
    },
    {
      id:'auto-repair-circumlocution',unitId:'it-repair-circumlocution',title:'忘词时，用类别和用途绕过去',
      goal:'使用给定句式描述类别、用途和外观，并请求对方补充词语。',
      focusLabels:{category:'说出类别',function:'说明用途',appearance:'描述外观',repair:'追问与修复'},
      explanation:['忘记名词时，可以先说类别：È un oggetto / È una persona…','再说用途或特征：Serve per aprire… / È rotondo…；不必为了一个词让对话停住。','可以直接问 Come si chiama? 本课练指定短语和改写；任意绕述是否有效，不能由严格匹配判断。'],
      example:{it:'Non ricordo il nome. È un oggetto che serve per aprire le bottiglie.',zh:'我想不起名字。它是一种用来开瓶子的东西。'},
      speech:'Non ricordo il nome. È un oggetto che serve per aprire le bottiglie.'
    },
    {
      id:'auto-reading-summaries',unitId:'it-reading-summaries',title:'通知里抓住谁、何时、做什么',
      goal:'从短通知提取对象、时间、要求与原因，并按给定模板复述。',
      focusLabels:{who:'通知对象',when:'时间信息',requirement:'要求做什么',reason:'说明原因'},
      explanation:['先分别找对象、时间和要求，避免把背景信息当成指令。','原因通常解释安排为何改变；没有写出的理由就不要自己补充。','本课需要提取原文或按给定模板改写，不要求猜测通知背后的额外信息。'],
      example:{it:'Domani i dipendenti entrano alle nove per una riunione.',zh:'明天员工九点进入，参加会议。对象是员工，时间是明天九点，目的是开会。'},
      speech:'Domani i dipendenti entrano alle nove per una riunione.'
    }
  ];
  lessons.forEach(lesson => { lesson.order = COURSE_UNITS.findIndex(unit => unit.id === lesson.unitId) + 1; });

  function q(slug, number, focus, prompt, answers, speech, explanation, hint, choices, inputLabel) {
    const level = Math.ceil(number / 4);
    return {
      id:'auto-' + slug + '-' + String(number).padStart(2,'0'), lessonId:'auto-' + slug,
      level, type:level === 1 ? 'choice' : 'text', focus,
      evidence:level === 1 ? 'recognition' : 'controlled_production',
      prompt, answers, answerLabel:speech, speech, explanation, hint,
      ...(choices ? {choices} : {}),
      ...(level > 1 ? {inputLabel:inputLabel || (level === 2 ? '填写题目指定的词语或短语' : '按指定要求写出句子'), placeholder:level === 2 ? 'Scrivi la parola…' : 'Scrivi la frase…'} : {}),
      taskLabel:level === 1 ? '读懂并选择' : level === 2 ? '按要求补全' : '按要求改写'
    };
  }

  const questions = [
    // 礼貌请求：愿望、请人帮忙、许可、确认。
    q('polite-requests',1,'desire','在窗口礼貌表达“我想预约”，哪句符合？',['Vorrei prenotare un appuntamento.'],'Vorrei prenotare un appuntamento.','Vorrei + 不定式说明自己的需求。','找“我想……”而不是命令对方的句子。',['Prenota subito!','Vorrei prenotare un appuntamento.','Hai prenotato ieri.']),
    q('polite-requests',2,'request','向熟悉的同事礼貌请求“你能重复一下吗？”请选择条件式句子。',['Potresti ripetere?'],'Potresti ripetere?','Potresti 对应 tu，表示请对方帮忙。','动作由“你”来做，用 potere 的 tu 条件式。',['Potrei ripetere?','Potresti ripetere?','Vorrei ripetere.']),
    q('polite-requests',3,'permission','你想问“我可以坐这里吗？”哪个句子的主语是 io？',['Potrei sedermi qui?'],'Potrei sedermi qui?','Potrei 是“我能否”，sedermi 对应我自己坐下。','看 potere 的第一人称条件式。',['Potresti sederti qui?','Potrebbero sedersi qui?','Potrei sedermi qui?']),
    q('polite-requests',4,'confirmation','你想礼貌确认商店几点关门，哪句符合？',['Vorrei sapere a che ora chiudete.'],'Vorrei sapere a che ora chiudete.','Vorrei sapere 引出想确认的信息。','要询问信息，不能把它说成已经知道的事实。',['Vorrei sapere a che ora chiudete.','So già a che ora chiudete.','Chiudete subito!']),
    q('polite-requests',5,'desire','用 volere 的 io 现在条件式，只填一个词：___ comprare un biglietto.',['Vorrei'],'Vorrei comprare un biglietto.','Volere 的 io 条件式是 vorrei。','我想要，而不是我现在坚持要。'),
    q('polite-requests',6,'request','对熟悉的同事说“你能帮我吗？”用 potere 的 tu 条件式：___ aiutarmi?',['Potresti'],'Potresti aiutarmi?','Potresti 的主语是 tu；aiutarmi 表示帮助我。','用 potere 的第二人称单数条件式。'),
    q('polite-requests',7,'permission','用 potere 的 io 条件式询问许可：___ usare questa sedia? 只填动词。',['Potrei'],'Potrei usare questa sedia?','Potrei usare… = 我可以使用……吗？','询问自己是否可以做，用 potrei。'),
    q('polite-requests',8,'confirmation','保留“我想知道”的句式，只补 sapere：Vorrei ___ se il tavolo è libero.',['sapere'],'Vorrei sapere se il tavolo è libero.','Vorrei 后面接不定式 sapere，se 引出是否空着。','不是 so；这里需要不定式。'),
    q('polite-requests',9,'desire','只把 voglio 改为 io 的现在条件式，其余词不变：Voglio parlare con il responsabile.',['Vorrei parlare con il responsabile.'],'Vorrei parlare con il responsabile.','把 voglio 换成 vorrei，使请求更委婉。','只替换句首动词。'),
    q('polite-requests',10,'request','只把 puoi 改为 tu 的现在条件式，其余词不变：Puoi controllare il numero?',['Potresti controllare il numero?'],'Potresti controllare il numero?','Puoi → potresti；对象还是熟悉的“你”。','用 potresti，后面的不定式不变。'),
    q('polite-requests',11,'permission','只把 posso 改为 io 的现在条件式：Posso pagare con la carta?',['Potrei pagare con la carta?'],'Potrei pagare con la carta?','Posso → potrei，询问自己能否这样付款。','主语仍然是 io，不用 potresti。'),
    q('polite-requests',12,'confirmation','按给定顺序组成一句，不添加其他词：Vorrei / sapere / quando / apre / l’ufficio.',['Vorrei sapere quando apre l’ufficio.'],'Vorrei sapere quando apre l’ufficio.','Quando apre l’ufficio 是要确认的信息。','保持给定词序，vorrei 后用 sapere。'),

    // 缺货与替代：单项、多项、足够、替代。
    q('shortages',1,'singular','只缺一个盘子，哪句正确？',['Manca un piatto.'],'Manca un piatto.','缺少的东西 un piatto 是单数，用 manca。','动词跟缺少的物品配合。',['Mancano un piatto.','Manca un piatto.','Manco un piatto.']),
    q('shortages',2,'plural','缺少两箱米，哪句正确？',['Mancano due scatole di riso.'],'Mancano due scatole di riso.','主语是复数 due scatole，而不是 riso。','数一数缺少的是几箱。',['Manca due scatole di riso.','Mancano due scatole di riso.','Mancate due scatole di riso.']),
    q('shortages',3,'enough','“两个小时足够”，哪句正确？',['Bastano due ore.'],'Bastano due ore.','Due ore 是复数，bastare 用 bastano。','足够的时间以复数 ore 表达。',['Basta due ore.','Bastano due ore.','Bastiamo due ore.']),
    q('shortages',4,'alternative','没有托盘，但有大盘子。哪句提出了替代办法？',['Possiamo usare un piatto grande.'],'Possiamo usare un piatto grande.','Possiamo usare… 给出可以采用的替代物。','找一个可执行的办法。',['Non ci sono vassoi.','Il piatto è grande.','Possiamo usare un piatto grande.']),
    q('shortages',5,'singular','用 mancare 的现在时，只填动词：___ una bottiglia d’acqua.',['Manca'],'Manca una bottiglia d’acqua.','Una bottiglia 是单数，所以用 manca。','不是所有缺货句都用复数。'),
    q('shortages',6,'plural','用 mancare 的现在时，只填动词：___ tre bicchieri.',['Mancano'],'Mancano tre bicchieri.','Tre bicchieri 是复数，用 mancano。','动词用第三人称复数。'),
    q('shortages',7,'enough','用 bastare 的现在时，只填动词：Per questo lavoro ___ una persona.',['basta'],'Per questo lavoro basta una persona.','Una persona 是单数，basta 表示一个人就够。','看 una persona，而不是前面的 lavoro。'),
    q('shortages',8,'alternative','补全固定短语 al posto di，表示替代：Usiamo il riso ___ posto della pasta. 只填一个词。',['al'],'Usiamo il riso al posto della pasta.','Al posto di = 代替；di + la 成为 della。','al posto di 是完整结构。'),
    q('shortages',9,'singular','把“两个勺子”改成“一个勺子”，只相应改变数量、名词和动词：Mancano due cucchiai.',['Manca un cucchiaio.'],'Manca un cucchiaio.','Due cucchiai → un cucchiaio，mancano 同时变成 manca。','单数是 un cucchiaio。'),
    q('shortages',10,'plural','把“一个托盘”改成“三个托盘”，作相应一致变化：Manca un vassoio.',['Mancano tre vassoi.'],'Mancano tre vassoi.','Un vassoio → tre vassoi，因此动词用 mancano。','Vassoio 的复数是 vassoi。'),
    q('shortages',11,'enough','把“一个瓶子”改成“两个瓶子”，作相应一致变化：Basta una bottiglia.',['Bastano due bottiglie.'],'Bastano due bottiglie.','Due bottiglie 是复数，basta 变为 bastano。','同时改变动词、数量和名词。'),
    q('shortages',12,'alternative','按给定词序写出替代建议，不增减词：Possiamo / usare / questi / piatti / al posto dei / vassoi.',['Possiamo usare questi piatti al posto dei vassoi.'],'Possiamo usare questi piatti al posto dei vassoi.','用这些盘子代替托盘，al posto dei = al posto di + i。','把给定词组连成完整句子。'),

    // 间接宾语：gli、le、mi，与直接宾语的区别。
    q('people-datives',1,'to_him','Telefono a Marco. 用代词替换 a Marco，选哪句？',['Gli telefono.'],'Gli telefono.','Telefonare a qualcuno 是向某人打电话，a Marco 用 gli。','这里有介词 a，问的是“打给谁”。',['Lo telefono.','Gli telefono.','Le telefono.']),
    q('people-datives',2,'to_her','Scrivo a Giulia. 用代词替换 a Giulia，选哪句？',['Le scrivo.'],'Le scrivo.','Le 在这里是间接宾语“向她”，不是阴性复数“她们”。','Giulia 是接收信息的人。',['La scrivo.','Gli scrivo.','Le scrivo.']),
    q('people-datives',3,'to_me','Marco dà il menu a me. 只替换 a me，选哪句？',['Marco mi dà il menu.'],'Marco mi dà il menu.','Mi 代替 a me；il menu 仍然是递出的东西。','区分给什么和给谁。',['Marco mi dà il menu.','Marco lo dà il menu.','Marco gli dà il menu.']),
    q('people-datives',4,'direct_indirect','Vedo Marco. Marco 在这里是直接宾语，选正确的代词句。',['Lo vedo.'],'Lo vedo.','Vedere qualcuno 不带 a；直接宾语 Marco 用 lo。','不要因为 Marco 是人就一律用 gli。',['Gli vedo.','Lo vedo.','Le vedo.']),
    q('people-datives',5,'to_him','Paolo aspetta una risposta. Scrivo a Paolo. 只把 a Paolo 换成代词：___ scrivo.',['Gli'],'Gli scrivo.','A Paolo 表示写给他，代词是 gli。','使用间接宾语代词“向他”。'),
    q('people-datives',6,'to_her','Anna aspetta una telefonata. Telefono ad Anna. 只填代词：___ telefono.',['Le'],'Le telefono.','Ad Anna 表示给她打电话，所以用 le。','此处 le 是单数“向她”。'),
    q('people-datives',7,'to_me','“你把消息告诉我”：Tu ___ dai la notizia. 用代词替换 a me，只填一个词。',['mi'],'Tu mi dai la notizia.','Mi 表示消息的接受者是我；la notizia 是消息本身。','代词放在变位动词 dai 前。'),
    q('people-datives',8,'direct_indirect','Vedo Anna ogni giorno. 只替换直接宾语 Anna：___ vedo ogni giorno.',['La'],'La vedo ogni giorno.','Vedo Anna 中 Anna 是直接宾语，用 la，而不是 le。','动词 vedere 这里直接接对象。'),
    q('people-datives',9,'to_him','只把 a Luca 换成代词，保留其他词：Mando un messaggio a Luca.',['Gli mando un messaggio.'],'Gli mando un messaggio.','Gli 指向 Luca；un messaggio 仍是寄送的内容。','把 gli 放在 mando 前。'),
    q('people-datives',10,'to_her','只把 a Sara 换成代词，保留其他词：Porto il conto a Sara.',['Le porto il conto.'],'Le porto il conto.','Le 指接受账单的 Sara；il conto 不变。','这里要写“给她”，不是“把她”。'),
    q('people-datives',11,'to_me','只把 a me 换成代词，保留其他词：Luca scrive a me ogni lunedì.',['Luca mi scrive ogni lunedì.'],'Luca mi scrive ogni lunedì.','A me 变成 mi，放在 scrive 前，Luca 仍是主语。','保留主语 Luca 和时间短语。'),
    q('people-datives',12,'direct_indirect','只把直接宾语 Paolo 换成代词，其余词不变：Aspetto Paolo davanti al bar.',['Lo aspetto davanti al bar.','L’aspetto davanti al bar.'],'Lo aspetto davanti al bar.','Aspettare qualcuno 直接接等待的人，用 lo；在元音前省音为 l’ 也接受。','别把“等他”写成“给他”。'),

    // 日常对话：预约、购物、澄清、结束。
    q('everyday-interaction',1,'appointment','店员问 In cosa posso aiutarla? 你要预约一次检查，哪句符合？',['Vorrei prenotare una visita.'],'Vorrei prenotare una visita.','明确提出预约需求，不必先提供无关信息。','找 prenotare 加具体预约事项。',['Vorrei prenotare una visita.','La visita era ieri.','Non so dove sia il bar.']),
    q('everyday-interaction',2,'order','你需要买两张票，哪句准确表达数量和物品？',['Vorrei due biglietti.'],'Vorrei due biglietti.','Due biglietti 说明两张票，vorrei 表达礼貌需求。','不要改变数量。',['Vorrei un biglietto.','Vorrei due biglietti.','Ho perso due biglietti.']),
    q('everyday-interaction',3,'clarification','你没听清柜台人员说的时间，哪句请求对方重复？',['Può ripetere l’orario, per favore?'],'Può ripetere l’orario, per favore?','Può 用敬称 Lei，ripetere l’orario 明确请求重复的内容。','不是请对方改变预约，而是重复说明。',['Può cancellare tutto?','Può ripetere l’orario, per favore?','L’orario va bene.']),
    q('everyday-interaction',4,'closing','已确认明天十点见面，哪句结束时保留了这个安排？',['Perfetto, a domani alle dieci.'],'Perfetto, a domani alle dieci.','结束前复述已确认的日期和时间。','明天十点，不要变成今天。',['Perfetto, a oggi alle dieci.','Perfetto, a domani alle dieci.','Forse ieri alle dieci.']),
    q('everyday-interaction',5,'appointment','只填 prenotare：Vorrei ___ un tavolo per quattro.',['prenotare'],'Vorrei prenotare un tavolo per quattro.','Prenotare un tavolo 是订桌，per quattro 说明四个人。','Vorrei 后用动词不定式。'),
    q('everyday-interaction',6,'order','你要两个咖啡。只填数字的意大利语单词：Vorrei ___ caffè, per favore.',['due'],'Vorrei due caffè, per favore.','Due 表示两个；caffè 的单复数词形相同。','只写两个的单词，不写整句。'),
    q('everyday-interaction',7,'clarification','补全“您能重复一下吗？”用 ripetere：Può ___, per favore?',['ripetere'],'Può ripetere, per favore?','Può 后面接不定式 ripetere。','不是变位动词 ripete。'),
    q('everyday-interaction',8,'closing','用 domani 表示“明天见”，只填一个词：Grazie, a ___.',['domani'],'Grazie, a domani.','A domani 是约好明天再见时的结束语。','这里已经明确时间是明天。'),
    q('everyday-interaction',9,'appointment','按给定顺序写出一句，不增加词：Vorrei / prenotare / un appuntamento / per venerdì.',['Vorrei prenotare un appuntamento per venerdì.'],'Vorrei prenotare un appuntamento per venerdì.','说明预约需求和希望的星期；这句话尚不表示预约已获确认。','用完整的 Vorrei prenotare… 结构。'),
    q('everyday-interaction',10,'order','把“一个三明治”改为“两个三明治”，作相应的数量和名词复数变化，保留 Vorrei：Vorrei un panino.',['Vorrei due panini.'],'Vorrei due panini.','Un panino 变为 due panini，名词也需要复数。','这里不保留单数冠词 un。'),
    q('everyday-interaction',11,'clarification','只把 il nome 换成 l’indirizzo，其余词不变：Può ripetere il nome, per favore?',['Può ripetere l’indirizzo, per favore?','Può ripetere l’indirizzo per favore?'],'Può ripetere l’indirizzo, per favore?','现在要确认的是地址，不是姓名；保留礼貌请求形式。','L’indirizzo 表示地址，注意省音。'),
    q('everyday-interaction',12,'closing','只把 domani alle nove 换成 venerdì alle dieci，写完整句子：Perfetto, ci vediamo domani alle nove.',['Perfetto, ci vediamo venerdì alle dieci.','Perfetto ci vediamo venerdì alle dieci.'],'Perfetto, ci vediamo venerdì alle dieci.','复述的安排是星期五十点，其他表达不变。','保留 ci vediamo，再替换日期和时间。'),

    // 关系从句：主语、宾语、先行词与复数。
    q('relative-che',1,'subject','Il collega che prepara il caffè si chiama Luca. 谁在准备咖啡？',['il collega'],'Il collega prepara il caffè.','Che 指 il collega，在 prepara 的从句中作主语。','先找 che 前面被修饰的人。',['il caffè','il collega','另一个未提到的人']),
    q('relative-che',2,'object','Il libro che legge Anna è interessante. Che 代替什么被读的东西？',['il libro'],'Anna legge il libro.','Legge 的主语是 Anna，che 代表直接宾语 il libro。','谁在读与读什么不是同一个成分。',['Anna','il libro','interessante']),
    q('relative-che',3,'antecedent','Vedo la collega che lavora al bar. 哪个名词被 che 从句修饰？',['la collega'],'Vedo la collega che lavora al bar.','Che lavora al bar 说明是哪位同事。','从句描述的是一个人，不是 bar。',['il bar','la collega','io']),
    q('relative-che',4,'plural','选出与复数 persone 一致的动词：Le persone che ___ qui sono gentili.',['lavorano'],'Le persone che lavorano qui sono gentili.','Che 指复数 le persone，因此动词用 lavorano。','Che 不变形，动词仍须配合复数主语。',['lavora','lavoro','lavorano']),
    q('relative-che',5,'subject','用关系代词 che，只填一个词：Il cuoco ___ prepara il riso è qui.',['che'],'Il cuoco che prepara il riso è qui.','Che 指 il cuoco，作 prepara 的主语。','本题要连接“准备米饭的厨师”。'),
    q('relative-che',6,'object','用关系代词 che，只填一个词：La canzone ___ ascolto è italiana.',['che'],'La canzone che ascolto è italiana.','Ascolto 的主语是 io；che 代替被听的 la canzone。','主语已经由 ascolto 的变位说明。'),
    q('relative-che',7,'antecedent','La ragazza che parla con Marco si chiama Elena. 从原句抄出 che 修饰的名词组，包含冠词。',['la ragazza'],'La ragazza parla con Marco.','Che 修饰 la ragazza；Marco 是和她说话的人。','抄出 che 前面的完整名词组。',undefined,'写出原文中的名词组（含冠词）'),
    q('relative-che',8,'plural','把 lavorare 变为现在时，只填动词：I camerieri che ___ qui parlano italiano.',['lavorano'],'I camerieri che lavorano qui parlano italiano.','Che 指复数 i camerieri，用 lavorano。','用第三人称复数。'),
    q('relative-che',9,'subject','用 che 合并，保留第一句开头，删去第二句重复的 Il ragazzo：Conosco un ragazzo. Il ragazzo lavora qui.',['Conosco un ragazzo che lavora qui.'],'Conosco un ragazzo che lavora qui.','Che 代替重复的 il ragazzo，把工作地点作为人物说明。','先写 Conosco un ragazzo，再接 che lavora qui。'),
    q('relative-che',10,'object','用 che 合并，保留第一句开头：Cerco il documento. Tu hai il documento. 只删除第二句的 il documento，其余词保留。',['Cerco il documento che tu hai.','Cerco il documento che hai tu.'],'Cerco il documento che tu hai.','Che 是 hai 的直接宾语，tu 仍是 hai 的主语；tu 在 hai 前后都可以。','按题目要求保留 tu。'),
    q('relative-che',11,'antecedent','合并为“La borsa che… è rossa.”：La borsa è sul tavolo. La borsa è rossa. 用第一句内容修饰 borsa，保留 è rossa 为主句谓语。',['La borsa che è sul tavolo è rossa.'],'La borsa che è sul tavolo è rossa.','Che è sul tavolo 说明是哪只包，主句再说它是红色的。','按给定骨架放入 è sul tavolo。'),
    q('relative-che',12,'plural','合并为“I colleghi che… parlano italiano.”：I colleghi lavorano qui. I colleghi parlano italiano.',['I colleghi che lavorano qui parlano italiano.'],'I colleghi che lavorano qui parlano italiano.','Che 指多位同事，lavorano 和 parlano 都保持复数。','先写修饰语 che lavorano qui，再写 parlano italiano。'),

    // 指代链：人物、物品、接受者与歧义。
    q('reference-tracking',1,'subject','Anna è arrivata. Lei aspetta fuori. Lei 指谁？',['Anna'],'Anna aspetta fuori.','此处唯一明确的女性人物是 Anna，lei 延续这个对象。','找前一句已出现的人。',['Anna','另一个未提到的人','fuori']),
    q('reference-tracking',2,'object','Marco ha una borsa. La apre. La 代替什么？',['una borsa'],'Marco apre la borsa.','La 是直接宾语，代替前一句的 borsa，不是 Marco。','看被打开的东西。',['Marco','una borsa','apre']),
    q('reference-tracking',3,'recipient','Anna manda un messaggio a Luca. Gli scrive ogni lunedì. Gli 指向谁？',['Luca'],'Anna scrive a Luca ogni lunedì.','Gli 是消息接受者，延续 a Luca。','不要把发消息的 Anna 当成接受者。',['Anna','Luca','un messaggio']),
    q('reference-tracking',4,'ambiguity','Luca incontra Marco. Lui è stanco. 单凭这两句，lui 是否能唯一确定？',['不能唯一确定，可能是 Luca 或 Marco'],'Luca incontra Marco. Una delle due persone è stanca.','两个男性人物都可能被 lui 指代；上下文不足时应写清名字。','性别线索无法在两个男性人物之间唯一选择。',['一定是 Luca','一定是 Marco','不能唯一确定，可能是 Luca 或 Marco']),
    q('reference-tracking',5,'subject','Giulia parla con Paolo. Lui ascolta. 只写 Lui 在这里所指的人名。',['Paolo'],'Paolo ascolta.','Lui 是男性单数，所指是 Paolo；Giulia 是女性名字。','从已有的人物中核对性别。',undefined,'写一个人名'),
    q('reference-tracking',6,'object','I documenti sono sul banco. Li prendo. 从原文抄出 li 代替的名词组，包含冠词。',['i documenti'],'Prendo i documenti.','Li 是阳性复数，指 i documenti；sul banco 说明位置。','不是单数 il banco。',undefined,'写出名词组（含冠词）'),
    q('reference-tracking',7,'recipient','Marco porta una lettera a Sara. Le dice: «È urgente». 只写 le 指向的人名。',['Sara'],'Marco dice a Sara che la lettera è urgente.','Le 是间接宾语“向她”，指 Sara，不是 lettera。','谁在接收这句话？',undefined,'写一个人名'),
    q('reference-tracking',8,'ambiguity','Anna vede Sara. Lei sorride. 两人都可能是 lei。只用指定词 ambigua 补全：La frase è ___.',['ambigua'],'La frase è ambigua.','两位女性都可能微笑，单靠 lei 不能把对象说清。','Frase 是阴性，因此指定词为 ambigua。'),
    q('reference-tracking',9,'subject','已知 lui 指 Marco。只在第二句把 Lui 换成 Marco，写出第二句：Anna saluta Marco. Lui risponde.',['Marco risponde.'],'Marco risponde.','写出名字后，回答的人就明确是 Marco。','只提交第二句。'),
    q('reference-tracking',10,'object','La 指 la scatola。把代词换回这个完整名词组，其余词不变：La apro subito.',['Apro la scatola subito.','Apro subito la scatola.'],'Apro subito la scatola.','代词还原为名词后放在动词后；两种 subito 位置都自然。','保留 apro 和 subito，写明 la scatola。'),
    q('reference-tracking',11,'recipient','Gli 指 a Paolo。用完整姓名短语还原，以 Scrivo 开头，保持时间在句末：Gli scrivo domani.',['Scrivo a Paolo domani.'],'Scrivo a Paolo domani.','Gli 还原为 a Paolo，说明写给谁。','不是 Scrivo Paolo；间接对象保留 a。'),
    q('reference-tracking',12,'ambiguity','Luca incontra Marco. Lui è stanco. 说话者明确指 Marco。只把第二句的 Lui 换成名字，写出第二句。',['Marco è stanco.'],'Marco è stanco.','明确说 Marco 可消除两名男性人物之间的指代歧义。','不要改动 è stanco。'),

    // 连接逻辑：原因、结果、转折与时间顺序。
    q('cause-result',1,'cause','要说明留在家的原因：Resto a casa ___ sono stanco. 选原因连接词。',['perché'],'Resto a casa perché sono stanco.','疲倦是留在家的原因，用 perché 引出。','后半句回答为什么留在家。',['quindi','perché','oppure']),
    q('cause-result',2,'result','要说明下雨带来的结果：Piove, ___ porto l’ombrello.',['quindi'],'Piove, quindi porto l’ombrello.','带伞是根据下雨情况采取的行动，用 quindi。','这里要求结果，不是反方向解释原因。',['perché','oppure','quindi']),
    q('cause-result',3,'contrast','已经约好了，所以虽然累仍要去：Sono stanco, ___ vengo lo stesso. 选转折词。',['però'],'Sono stanco, però vengo lo stesso.','Vengo lo stesso 与“累所以可能不来”的预期相反，用 però。','Lo stesso 表示仍然、照样。',['però','quindi','perché']),
    q('cause-result',4,'sequence','要说“先付款，然后拿票”：Prima pago, ___ prendo il biglietto.',['poi'],'Prima pago, poi prendo il biglietto.','Prima… poi… 标记时间先后。','这次只问哪一步在后面。',['perché','poi','nonostante']),
    q('cause-result',5,'cause','只用 perché 补全原因：Non esco ___ piove.',['perché'],'Non esco perché piove.','下雨解释了不出门的原因；perché 带重音。','题目指定原因连接词 perché。'),
    q('cause-result',6,'result','只用 quindi 补全结果：Il treno è in ritardo, ___ aspetto.',['quindi'],'Il treno è in ritardo, quindi aspetto.','火车晚点，所以我等待；quindi 引出结果。','保留前因后果的方向。'),
    q('cause-result',7,'contrast','只用 però 补全转折：Il lavoro è difficile, ___ mi piace.',['però'],'Il lavoro è difficile, però mi piace.','困难但仍然喜欢，però 表示转折，重音不能省略。','指定的转折词是 però。'),
    q('cause-result',8,'sequence','只用 poi 补全先后：Prima lavo le verdure, ___ le taglio.',['poi'],'Prima lavo le verdure, poi le taglio.','先洗再切；poi 不自动表示因果。','与 prima 配对的“然后”。'),
    q('cause-result',9,'cause','用 perché 合并，保持第一句在前，其余词不变：Arrivo tardi. Il bus è in ritardo.',['Arrivo tardi perché il bus è in ritardo.'],'Arrivo tardi perché il bus è in ritardo.','公交晚点是我晚到的原因。','第一句说明结果，perché 后说明原因。'),
    q('cause-result',10,'result','用 quindi 合并，保持原顺序和所有词：Ho finito il turno. Torno a casa.',['Ho finito il turno, quindi torno a casa.','Ho finito il turno quindi torno a casa.'],'Ho finito il turno, quindi torno a casa.','下班结束后回家，quindi 引出接下来的结果。','只把两句用 quindi 接起来。'),
    q('cause-result',11,'contrast','用 però 合并，保持原顺序和所有词：Il locale è piccolo. È comodo.',['Il locale è piccolo, però è comodo.','Il locale è piccolo però è comodo.'],'Il locale è piccolo, però è comodo.','地方虽小但舒适，用 però 保留转折。','第二句的 è 不删除。'),
    q('cause-result',12,'sequence','在第一句前加 Prima，用 poi 连接第二句，其他词不变：Controllo l’ordine. Chiamo il fornitore.',['Prima controllo l’ordine, poi chiamo il fornitore.','Prima controllo l’ordine poi chiamo il fornitore.'],'Prima controllo l’ordine, poi chiamo il fornitore.','先核对订单，再联系供应商；这是明确的工作顺序。','两个动作都保持现在时第一人称。'),

    // 短叙事：背景、完成事件、先后与结果。
    q('connected-narration',1,'background','Ieri pioveva quando sono uscito. 哪部分描写当时的天气背景？',['pioveva'],'Ieri pioveva quando sono uscito.','Pioveva 描写出门时正在下雨的背景。','找持续的天气状态，不是出门动作。',['sono uscito','pioveva','quando']),
    q('connected-narration',2,'event','Mentre lavoravo, è arrivato il corriere. 哪件事作为完成事件发生？',['快递员到了'],'Mentre lavoravo, è arrivato il corriere.','Lavoravo 是背景，è arrivato 交代快递员到来这一事件。','看复合过去时表达的动作。',['我平时总在工作','快递员到了','快递员一直没来']),
    q('connected-narration',3,'sequence','Prima ho telefonato, poi sono partito. 哪件事先发生？',['Ho telefonato.'],'Prima ho telefonato, poi sono partito.','Prima 标记打电话先于出发。','不要只看句子里哪个动词更长。',['Sono partito.','Ho telefonato.','两件事的先后不明']),
    q('connected-narration',4,'result','Ho cercato le chiavi per dieci minuti. Alla fine le ho trovate. 最后发生了什么？',['钥匙找到了'],'Alla fine ho trovato le chiavi.','Alla fine 引出寻找结束后的结果：找到了钥匙。','结尾说 ho trovato，不是继续寻找。',['钥匙丢得更远了','钥匙找到了','根本没有找过']),
    q('connected-narration',5,'background','用 piovere 的未完成过去时，只填一个词：Quando sono arrivato, ___.',['pioveva'],'Quando sono arrivato, pioveva.','题目要求描写到达时的天气背景，用 pioveva。','不是现在时 piove。'),
    q('connected-narration',6,'event','用 arrivare 的复合过去时，主语 Luca 为男性；只填助动词：Luca ___ arrivato alle otto.',['è'],'Luca è arrivato alle otto.','Arrivare 的复合过去时用 essere，Luca 对应 è。','保留 è 的重音。'),
    q('connected-narration',7,'sequence','只用 poi 表示“然后”：Prima ho cenato, ___ ho lavato i piatti.',['poi'],'Prima ho cenato, poi ho lavato i piatti.','先吃晚饭，然后洗盘子。','题目要求时间先后，不是原因。'),
    q('connected-narration',8,'result','补全指定短语 alla fine：Ho provato tre volte. ___ fine ho capito. 只填一个词。',['Alla'],'Ho provato tre volte. Alla fine ho capito.','Alla fine = 最后；这里说明多次尝试后的结果。','Fine 在这个固定表达里搭配 alla。'),
    q('connected-narration',9,'background','用 mentre 合并，把背景放在前面，保留其他词：Preparavo la cena. È suonato il telefono.',['Mentre preparavo la cena, è suonato il telefono.','Mentre preparavo la cena è suonato il telefono.'],'Mentre preparavo la cena, è suonato il telefono.','准备晚餐是持续背景，电话响是期间发生的事件。','以 Mentre preparavo la cena 开头。'),
    q('connected-narration',10,'event','只把原句的现在时 arriva 改成复合过去时，保留其他词：Il fornitore arriva alle nove.',['Il fornitore è arrivato alle nove.'],'Il fornitore è arrivato alle nove.','主语 il fornitore 为男性单数，arrivare 用 è arrivato。','助动词用 essere，分词用 arrivato。'),
    q('connected-narration',11,'sequence','按给定顺序组成一句，不增减词：Prima / ho controllato / l’ordine, / poi / ho chiamato / il negozio.',['Prima ho controllato l’ordine, poi ho chiamato il negozio.','Prima ho controllato l’ordine poi ho chiamato il negozio.'],'Prima ho controllato l’ordine, poi ho chiamato il negozio.','先核对订单，后打电话；两个动作都已完成。','保留两个 ho。'),
    q('connected-narration',12,'result','只在给定句前加 Alla fine，其余词不变：Abbiamo trovato l’indirizzo.',['Alla fine abbiamo trovato l’indirizzo.','Alla fine, abbiamo trovato l’indirizzo.'],'Alla fine abbiamo trovato l’indirizzo.','Alla fine 标明最终找到地址的结果。','保持 abbiamo trovato 的主语和时态。'),

    // 工作报告：事实、具体问题、影响和下一步。
    q('work-report',1,'status','报告：Abbiamo sei vassoi pronti e due da preparare. 当前已经准备好几个托盘？',['sei'],'Abbiamo sei vassoi pronti.','Pronti 表示已经准备好；另两个仍待准备。','只计算 pronti 的数量。',['due','otto','sei']),
    q('work-report',2,'problem','报告：Sono arrivate tre scatole, ma ne aspettavamo quattro. 哪个问题与文本一致？',['少了一箱'],'Manca una scatola.','原本预计四箱，实际三箱，所以少一箱。','用预计数量减去实际数量。',['少了一箱','多了一箱','全部没有送到']),
    q('work-report',3,'impact','Manca un collega, quindi la preparazione è più lenta. 这里报告的影响是什么？',['准备工作更慢'],'La preparazione è più lenta.','Quindi 后面说明缺少一位同事造成的影响。','别把原因与影响颠倒。',['准备工作更慢','供应商今天休息','所有菜都已做好']),
    q('work-report',4,'action','你准备联系供应商询问缺失的货物，哪句说明这个下一步？',['Chiamo il fornitore per chiedere informazioni.'],'Chiamo il fornitore per chiedere informazioni.','这句话明确说明要采取的行动和目的，没有凭空保证送达时间。','找具体的联系行动。',['Mancano due scatole.','Chiamo il fornitore per chiedere informazioni.','Il fornitore è già arrivato.']),
    q('work-report',5,'status','用 essere 的现在时配合复数 vassoi，只填动词：I vassoi ___ pronti.',['sono'],'I vassoi sono pronti.','I vassoi 是第三人称复数，essere 用 sono。','主语是托盘们，不是我。'),
    q('work-report',6,'problem','用 mancare 的现在时报告问题，只填动词：___ una scatola di riso.',['Manca'],'Manca una scatola di riso.','缺少的是单数 una scatola，动词用 manca。','数量是一箱。'),
    q('work-report',7,'impact','只用 quindi 连接问题与影响：Il frigo non funziona, ___ spostiamo le bevande.',['quindi'],'Il frigo non funziona, quindi spostiamo le bevande.','冰箱不工作，因此转移饮料；只说明文本给出的行动。','要求结果连接词 quindi。'),
    q('work-report',8,'action','用 chiamare 的 io 现在时，只填动词：Ora ___ il responsabile.',['chiamo'],'Ora chiamo il responsabile.','Chiamo 明确说明由我来联系负责人。','Chiamare 的第一人称单数。'),
    q('work-report',9,'status','只把“两个”改成“三个”，其余词不变：Abbiamo due tavoli liberi.',['Abbiamo tre tavoli liberi.'],'Abbiamo tre tavoli liberi.','报告中的空桌数量改为 tre，不改变“空着”的状态。','只替换 due 为 tre。'),
    q('work-report',10,'problem','把“一个”改成“两个”，作相应单复数变化：Manca un ingrediente.',['Mancano due ingredienti.'],'Mancano due ingredienti.','数量和名词变为复数，动词也用 mancano。','Un ingrediente → due ingredienti。'),
    q('work-report',11,'impact','用 quindi 合并并保持顺序：Mancano due scatole. L’ordine è incompleto.',['Mancano due scatole, quindi l’ordine è incompleto.','Mancano due scatole quindi l’ordine è incompleto.'],'Mancano due scatole, quindi l’ordine è incompleto.','少两箱是订单不完整的具体依据；不新增其他原因。','保留 l’ordine è incompleto。'),
    q('work-report',12,'action','用 per 把目的接到行动后，删掉 Voglio，其余词不变：Chiamo il fornitore. Voglio confermare l’orario.',['Chiamo il fornitore per confermare l’orario.'],'Chiamo il fornitore per confermare l’orario.','Per + 不定式说明联系供应商的目的。','删掉 Voglio，以 per confermare 接下去。'),

    // 时间协商：限制、理由、替代、确认。
    q('shift-negotiation',1,'constraint','“三点我不能来，但五点可以。”哪句准确表达限制？',['Alle tre non posso venire, ma alle cinque sì.'],'Alle tre non posso venire, ma alle cinque sì.','三点不能、五点可以；non 与 sì 分别限定两个时间。','不要交换两个时间的可行性。',['Alle tre posso venire, ma alle cinque no.','Alle tre non posso venire, ma alle cinque sì.','Non posso venire né alle tre né alle cinque.']),
    q('shift-negotiation',2,'reason','Non posso cambiare turno perché ho un appuntamento. 不能换班的原因是什么？',['已有一个预约'],'Non posso cambiare turno perché ho un appuntamento.','Perché 后面的预约是明确说明的原因。','不要补入原文没有说的原因。',['不知道上班时间','已有一个预约','想多工作几个小时']),
    q('shift-negotiation',3,'alternative','你原本被约在周一，但只能周二。哪句提出替代日期？',['Potrei venire martedì.'],'Potrei venire martedì.','条件式 potrei 提出周二这个可行选项。','替代方案应说清新的时间。',['Lunedì non posso.','Potrei venire martedì.','Martedì non posso.']),
    q('shift-negotiation',4,'confirmation','双方已经同意星期五下午五点，哪句确认了同一个安排？',['Va bene, venerdì alle cinque.'],'Va bene, venerdì alle cinque.','复述星期五五点，与已经商定的安排一致。','确认时别改变日期或时间。',['Va bene, giovedì alle cinque.','Va bene, venerdì alle tre.','Va bene, venerdì alle cinque.']),
    q('shift-negotiation',5,'constraint','只填 non 表示无法参加：Domani ___ posso lavorare.',['non'],'Domani non posso lavorare.','Non 放在变位动词 posso 前，说明明天不能工作。','这是限制，不是提出愿望。'),
    q('shift-negotiation',6,'reason','只用 perché 引出原因：Arrivo dopo le sei ___ prima lavoro.',['perché'],'Arrivo dopo le sei perché prima lavoro.','六点前有工作，所以六点之后到达。','题目要求写原因连接词，保留重音。'),
    q('shift-negotiation',7,'alternative','用 potere 的 io 现在条件式提出替代，只填动词：___ iniziare alle quattro.',['Potrei'],'Potrei iniziare alle quattro.','Potrei 提出我可以四点开始这个选项。','第一人称条件式，不是 potresti。'),
    q('shift-negotiation',8,'confirmation','补全指定时间短语 alle otto：Confermo il turno di venerdì ___ otto. 只填介词。',['alle'],'Confermo il turno di venerdì alle otto.','八点用 alle otto，确认的是周五八点的班次。','与复数小时搭配的形式是 alle。'),
    q('shift-negotiation',9,'constraint','只把明天 domani 改成星期一 lunedì，其余词不变：Domani non posso venire.',['Lunedì non posso venire.'],'Lunedì non posso venire.','限制被改到星期一，否定和行动保持原样。','Lunedì 的重音不能省掉。'),
    q('shift-negotiation',10,'reason','用 perché 合并，保持原顺序：Non posso venire alle tre. Ho una visita.',['Non posso venire alle tre perché ho una visita.'],'Non posso venire alle tre perché ho una visita.','有一次就诊预约是三点来不了的原因。','第一句的 non 必须保留。'),
    q('shift-negotiation',11,'alternative','只把 posso 改成 io 的现在条件式，保留其余词：Posso lavorare sabato mattina.',['Potrei lavorare sabato mattina.'],'Potrei lavorare sabato mattina.','Potrei 把周六上午工作作为可商量的替代方案。','只变 posso → potrei。'),
    q('shift-negotiation',12,'confirmation','用下面词语确认时间，按给定顺序，不增加词：Va bene, / ci vediamo / martedì / alle quattro.',['Va bene, ci vediamo martedì alle quattro.','Va bene ci vediamo martedì alle quattro.'],'Va bene, ci vediamo martedì alle quattro.','明确复述周二四点的安排。','保留 martedì 的重音和 alle quattro。'),

    // 忘词修复：类别、用途、外观、追问。
    q('repair-circumlocution',1,'category','你忘了护士的意大利语词，想先说“这是一个人”。哪句给出正确类别？',['È una persona.'],'È una persona.','先说 persona，能把范围限定为人；不需要立即想起具体职业名。','不要把人说成物品或地点。',['È un oggetto.','È una persona.','È un luogo.']),
    q('repair-circumlocution',2,'function','È un oggetto che serve per aprire le bottiglie di vino. 哪个物品符合用途？',['un cavatappi'],'Un cavatappi serve per aprire le bottiglie di vino.','Cavatappi 是开葡萄酒瓶塞的工具；用途可帮助找回词语。','注意 aprire le bottiglie di vino。',['un tagliere','un cavatappi','un colino']),
    q('repair-circumlocution',3,'appearance','物品被描述为 lungo e sottile，哪项意思吻合？',['长而细'],'L’oggetto è lungo e sottile.','Lungo 描述长度，sottile 表示薄或细；这里合起来是长而细。','两个形容词分别说明形状的不同方面。',['短而宽','圆而厚','长而细']),
    q('repair-circumlocution',4,'repair','不知道物品叫什么，想请对方告诉你名称，哪句适合？',['Come si chiama questo oggetto?'],'Come si chiama questo oggetto?','Come si chiama…? 用来询问名称。','不是询问价格或数量。',['Quanto costa questo oggetto?','Come si chiama questo oggetto?','Quanti oggetti ci sono?']),
    q('repair-circumlocution',5,'category','要把某人描述为“一个在这里工作的人”。只填不定冠词：È ___ persona che lavora qui.',['una'],'È una persona che lavora qui.','Persona 是阴性名词，用 una，不论所指的人是男是女。','看名词 persona 的语法性。'),
    q('repair-circumlocution',6,'function','补全指定句式 serve per + 不定式，只填介词：Serve ___ tagliare il pane.',['per'],'Serve per tagliare il pane.','Per + 不定式说明用途，本题指定 serve per 这个句式。','题目指定 per，不要另换表达结构。'),
    q('repair-circumlocution',7,'appearance','把 rotondo 与阴性 scatola 配合，只填形容词：È una scatola ___.',['rotonda'],'È una scatola rotonda.','Scatola 是阴性单数，形容词变为 rotonda。','保持“圆的”含义，只改性数。'),
    q('repair-circumlocution',8,'repair','补全固定问法 Come si chiama，只填一个词：Come ___ chiama questo utensile?',['si'],'Come si chiama questo utensile?','Come si chiama…? 是询问名称的常用结构。','这里的代词是 si，不带重音。'),
    q('repair-circumlocution',9,'category','用 che 合并，保留第一句开头，删去第二句的 La persona：È una persona. La persona consegna la posta.',['È una persona che consegna la posta.'],'È una persona che consegna la posta.','先给出 persona 的类别，再用送信这一行为帮助识别。','不要另填具体职业名，按 che 从句合并。'),
    q('repair-circumlocution',10,'function','用 che 合并，保留第一句开头：È un oggetto. L’oggetto serve per aprire le bottiglie. 删除第二句重复的 L’oggetto。',['È un oggetto che serve per aprire le bottiglie.'],'È un oggetto che serve per aprire le bottiglie.','类别与用途合起来，即使忘了具体名词也能提供线索。','保留 serve per，不要漏掉 per。'),
    q('repair-circumlocution',11,'appearance','合并为“È una scatola + 形容词”：È una scatola. La scatola è rotonda. 只保留一次 scatola 和一次 è。',['È una scatola rotonda.'],'È una scatola rotonda.','用一个一致的形容词直接描述物品外观。','把 rotonda 放在 scatola 后。'),
    q('repair-circumlocution',12,'repair','按给定词序组成询问名称的句子，不增减词：Come / si / chiama / questo / oggetto?',['Come si chiama questo oggetto?'],'Come si chiama questo oggetto?','这句话让对方提供缺少的词语。','保持 Come si chiama 的顺序。'),

    // 通知提取：对象、时间、要求与原因。
    q('reading-summaries',1,'who','通知：Domani i nuovi dipendenti devono presentarsi alla reception alle nove. 要到前台报到的是谁？',['新员工'],'I nuovi dipendenti devono presentarsi alla reception.','通知明确限定 i nuovi dipendenti，没有说所有顾客或供应商。','先找 devono 的主语。',['所有顾客','供应商','新员工']),
    q('reading-summaries',2,'when','通知：La riunione di venerdì è spostata dalle dieci alle undici. 会议现在是星期五几点？',['alle undici'],'La riunione di venerdì è alle undici.','Dalle dieci 是原时间，alle undici 是更改后的时间。','问的是新时间。',['alle dieci','alle undici','a mezzogiorno']),
    q('reading-summaries',3,'requirement','通知：Per ritirare il pacco, portate un documento. 通知要求带什么？',['un documento'],'Per ritirare il pacco, portate un documento.','Portate 后面的 un documento 是要求携带的东西。','领取的包裹和要带来的证件不同。',['un documento','il pacco','un ombrello']),
    q('reading-summaries',4,'reason','通知：Oggi il negozio chiude prima perché manca l’elettricità. 提前关门的原因是什么？',['停电'],'Il negozio chiude prima perché manca l’elettricità.','Perché 后面明确说缺少电力，不是没有顾客或员工休假。','只采用通知里写明的原因。',['停电','没有顾客','全员休假']),
    q('reading-summaries',5,'who','通知：I fornitori devono usare l’ingresso laterale. 从原文抄出通知对象，包含冠词，不写其他词。',['i fornitori'],'I fornitori devono usare l’ingresso laterale.','I fornitori 是供应商，是 devono usare 的主语。','只抄出主语名词组。',undefined,'抄出对象名词组（含冠词）'),
    q('reading-summaries',6,'when','通知：L’appuntamento è martedì alle quindici. 从原文抄出“几点”的短语，包含 alle，不写星期。',['alle quindici'],'L’appuntamento è alle quindici.','Alle quindici 表示十五点；题目只要求时间，不含 martedì。','按原文用单词写时间，不改成数字。',undefined,'抄出时间短语（含 alle）'),
    q('reading-summaries',7,'requirement','通知：Prima di entrare, spegnete il telefono. 从原文抄出要求执行的动词，只写一个词。',['spegnete'],'Spegnete il telefono prima di entrare.','Spegnete 要求关掉；entrare 是说明在进入之前。','找发出要求的动词，不是时间从句里的动词。',undefined,'抄出要求执行的动词'),
    q('reading-summaries',8,'reason','通知：La consegna è in ritardo perché il furgone è guasto. 从原文抄出 perché 后的原因，不包含 perché。',['il furgone è guasto'],'La consegna è in ritardo perché il furgone è guasto.','原因是货车坏了；不是把“交货晚点”再当作原因。','从 il furgone 开始抄到 guasto。',undefined,'抄出原因分句（不含 perché）'),
    q('reading-summaries',9,'who','通知：Domani i cuochi iniziano alle otto. 只去掉 Domani，保留其他词，写出“谁几点开始”的句子。',['I cuochi iniziano alle otto.'],'I cuochi iniziano alle otto.','主语是厨师们，时间是八点；按题目要求不写明天。','只删除 Domani，不改主语和变位。'),
    q('reading-summaries',10,'when','通知：La visita è stata spostata a lunedì alle dieci. 按模板复述：La visita è + 原文中的 lunedì alle dieci。不增加介词，不保留 stata spostata。',['La visita è lunedì alle dieci.'],'La visita è lunedì alle dieci.','新安排是星期一十点；在这个模板中直接说 è lunedì。','A 属于 spostata a 的结构，不能写成 è a lunedì。'),
    q('reading-summaries',11,'requirement','通知要求：Portate un documento. 用“Dovete + 不定式 + 原宾语”复述，只写一句。',['Dovete portare un documento.'],'Dovete portare un documento.','Dovete 后接不定式 portare，保留要携带的 un documento。','不要用 Dovete portate。'),
    q('reading-summaries',12,'reason','两条通知信息：L’ufficio resta chiuso. Ci sono lavori. 用 perché 合并，保持原顺序和所有词。',['L’ufficio resta chiuso perché ci sono lavori.'],'L’ufficio resta chiuso perché ci sono lavori.','有施工是办公室保持关闭的原因；不添加原文未说明的日期。','以 L’ufficio resta chiuso 开头。'),
  ];

  AUTO_LESSONS.push(...lessons);
  AUTO_QUESTIONS.push(...questions);
  lessons.forEach(lesson => {
    const unit = COURSE_UNITS.find(item => item.id === lesson.unitId);
    unit.status = 'ready';
    unit.lessonIds = [lesson.id];
  });
}
