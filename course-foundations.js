/* Piccola Italiano v0.15 · original foundation and everyday-grammar micro-lessons.
 * Data extension only. Load after course-data.js; existing IDs and learner data stay intact.
 * Text tasks are explicitly constrained; these samples do not measure spontaneous speech.
 */
'use strict';
{
  const lessons = [];
  const questions = [];
  const choice = (focus,prompt,choices,answer,answerLabel,explanation,hint,speech) => ({focus,prompt,choices,answers:[answer],answerLabel,explanation,hint,speech,type:'choice',evidence:'recognition',taskLabel:'选择合适的答案'});
  const text = (focus,prompt,answers,answerLabel,explanation,hint,speech,inputLabel='填写空缺内容') => ({focus,prompt,answers:Array.isArray(answers)?answers:[answers],answerLabel,explanation,hint,speech,type:'text',evidence:'controlled_production',inputLabel,placeholder:inputLabel==='写出完整句子'?'在这里写完整句子':'按题目要求填写',taskLabel:inputLabel});
  function add(unitId,title,goal,explanation,example,focusLabels,items){
    const id='auto-'+unitId.slice(3);
    lessons.push({id,unitId,title,goal,explanation,example,focusLabels,speech:example.it,order:COURSE_UNITS.findIndex(u=>u.id===unitId)+1});
    items.forEach((item,index)=>questions.push({id:id+'-'+String(index+1).padStart(2,'0'),lessonId:id,level:Math.floor(index/4)+1,...item}));
  }

  add('it-sentence-core','一句话：人、动作、对象','从短句中找到主语、动词和宾语，按给定信息组成完整句子。',[
    '先找动词：它表达动作或状态。再问“谁在做”“动作指向谁或什么”。',
    '意大利语可以省略能从动词推断的主语；入门改写题先保留题目给出的主语。不是每个句子都需要宾语。',
    '本课组句题会指定词语或改动范围；照要求写出一句完整的话。'
  ],{it:'Marta prepara il riso.',zh:'Marta 准备米饭：Marta 是主语，prepara 是动词，il riso 是宾语。'},
  {subject:'找出主语',verb:'找出动词',object:'找出宾语',clause:'组成完整句子'},[
    choice('subject','Marco lava i piatti. 谁在洗盘子？选择句子中的主语。',['i piatti','Marco','lava','i'],'Marco','Marco','Marco 是做动作的人；i piatti 是被洗的盘子。','问“谁在洗？”','Marco lava i piatti.'),
    choice('verb','Anna legge un messaggio. 哪个词表示“读”这个动作？',['Anna','un','legge','messaggio'],'legge','legge','legge 是动词，表示她正在读或平时读。','寻找句子里的动作词。','Anna legge un messaggio.'),
    choice('object','Il cuoco taglia il pane. 厨师切的是什么？选完整宾语。',['il pane','Il cuoco','taglia','cuoco'],'il pane','il pane','taglia 的对象是 il pane，宾语短语包含冠词 il。','问“切什么？”','Il cuoco taglia il pane.'),
    choice('clause','哪一句用完整的现在时句子表达“火车到站”？',['Il treno arrivare.','Il treno alla.','Il arriva treno.','Il treno arriva.'],'Il treno arriva.','Il treno arriva.','Il treno 是主语，arriva 是对应的现在时动词；这句话不需要宾语。','需要一个已经变位的动词。','Il treno arriva.'),
    text('subject','Paolo apre la porta. 谁打开门？只抄写主语。','Paolo','Paolo','开门的人是 Paolo，la porta 是被打开的对象。','找动作的执行者。','Paolo apre la porta.','写出主语'),
    text('verb','Il cliente paga il conto. 只抄写句中的动作词。','paga','paga','paga 表示“付款”，是句中的动词。','Il cliente 是人，il conto 是账单。','Il cliente paga il conto.','写出一个动词'),
    text('object','Elena cerca le chiavi. 她找什么？只写完整的宾语名词短语，保留冠词。','le chiavi','le chiavi','Elena 找的是 le chiavi；这是动词 cerca 的宾语。','答案包括表示复数的冠词。','Elena cerca le chiavi.','写出宾语短语'),
    text('clause','补上 essere 的第三人称单数现在时，只写一个词：La cucina ___ pulita.','è','La cucina è pulita.','这里需要动词 è，连接厨房和“干净”这个状态。','不是所有动词都表示看得见的动作。','La cucina è pulita.'),
    text('subject','只把 Marco 换成 Giulia，其他词语不变；写完整句子：Marco porta il vassoio.','Giulia porta il vassoio.','Giulia porta il vassoio.','两个人名都作第三人称单数主语，所以 porta 保持不变。','只更换做动作的人。','Giulia porta il vassoio.','写出完整句子'),
    text('verb','只把动作 lava 改为 asciuga（擦干），其他词语不变；写完整句子：Luca lava i bicchieri.','Luca asciuga i bicchieri.','Luca asciuga i bicchieri.','改变动作词后，主语 Luca 和宾语 i bicchieri 都保留。','把“洗”改成“擦干”。','Luca asciuga i bicchieri.','写出完整句子'),
    text('object','只把 il pane 换成 le verdure，其他词语不变；写完整句子：Il cuoco taglia il pane.','Il cuoco taglia le verdure.','Il cuoco taglia le verdure.','改变的是被切的对象；动词仍随主语 Il cuoco 使用 taglia。','宾语换成复数不要求把 taglia 变复数。','Il cuoco taglia le verdure.','写出完整句子'),
    text('clause','用全部给定词语组成完整句子，以人名开头：lavora / Marta。','Marta lavora.','Marta lavora.','Marta lavora 是完整句子，表达“Marta 工作”。','主语放前，给定的动词放后。','Marta lavora.','写出完整句子')
  ]);

  add('it-nouns-articles','冠词告诉你性与数','结合冠词和具体名词识别性与数，完成明确指定的变化。',[
    '先连着冠词记名词：il libro、la finestra。词尾常有线索，但存在例外，不能只靠词尾猜。',
    '本课的特殊开头用 lo studente、lo zaino；lo 的复数形式是 gli，例如 gli studenti。',
    '变复数时要检查整组词：冠词、名词，以及题目要求变化的动词和形容词。'
  ],{it:'I piatti sono puliti.',zh:'这些盘子是干净的。i、piatti、sono、puliti 都对应复数。'},
  {masculine:'阳性单数冠词',feminine:'阴性单数冠词','special-article':'lo 与特殊开头',plural:'整组词的复数'},[
    choice('masculine','给 libro 填定冠词：___ libro è nuovo.',['la','lo','il','le'],'il','Il libro è nuovo.','libro 是阳性单数，这个开头使用 il。','把冠词和名词一起记。','Il libro è nuovo.'),
    choice('feminine','给 finestra 填定冠词：___ finestra è aperta.',['la','il','i','lo'],'la','La finestra è aperta.','finestra 是阴性单数，使用 la。','这里说的是一扇窗。','La finestra è aperta.'),
    choice('special-article','给 studente 填定冠词：___ studente parla.',['il','la','le','lo'],'lo','Lo studente parla.','这里的阳性单数 studente 以 s 加辅音开头，使用 lo。','本课的例子是 lo studente。','Lo studente parla.'),
    choice('plural','选择 la sedia 的复数形式。',['i sedie','le sedie','la sedie','le sedia'],'le sedie','Le sedie sono qui.','阴性单数 la sedia 变为阴性复数 le sedie。','冠词和名词都要检查。','Le sedie sono qui.'),
    text('masculine','只填定冠词：___ tavolo è pulito.','il','Il tavolo è pulito.','tavolo 是阳性单数，使用 il。','tavolo 和 libro 在本课使用同一类冠词。','Il tavolo è pulito.'),
    text('feminine','只填定冠词：___ borsa è pesante.','la','La borsa è pesante.','borsa 是阴性单数，使用 la。','这是一个包。','La borsa è pesante.'),
    text('special-article','只填阳性单数定冠词：___ zaino è blu.','lo','Lo zaino è blu.','本课的 zaino 以 z 开头，使用 lo。','回忆 lo studente、lo zaino 这一组。','Lo zaino è blu.'),
    text('plural','把 il piatto 变成复数。只写冠词和名词，不写句子。','i piatti','i piatti','il 变为 i，piatto 变为 piatti。','这组词表示多个盘子。','I piatti sono pronti.','写出冠词和名词'),
    text('masculine','补上定冠词并写出整句，不改其他词：___ telefono funziona.','Il telefono funziona.','Il telefono funziona.','telefono 是阳性单数，使用 il；funziona 保留。','句子只缺一个冠词。','Il telefono funziona.','写出完整句子'),
    text('feminine','使用全部词语组句，以定冠词开头：è / aperta / porta / la。','La porta è aperta.','La porta è aperta.','la porta 是阴性单数，给定的 aperta 与它一致。','顺序为冠词、名词、动词、状态。','La porta è aperta.','写出完整句子'),
    text('special-article','只改错误的冠词，其他词语不变；写完整句子：Il zaino è rosso.','Lo zaino è rosso.','Lo zaino è rosso.','zaino 在这里使用 lo，不使用 il。','改动只发生在第一个词。','Lo zaino è rosso.','写出完整句子'),
    text('plural','把整句改成复数：Il bicchiere è pulito. 使用给定的复数形式 bicchieri、sono、puliti，冠词也要变化。','I bicchieri sono puliti.','I bicchieri sono puliti.','这里 il 变 i，其他三个词分别使用题目给定的复数形式。','不要保留单数冠词 il。','I bicchieri sono puliti.','写出完整句子')
  ]);

  add('it-present-basics','现在时跟着谁变化','用 essere、avere 和选定的规则动词表达现在的状态与动作。',[
    'essere：io sono、tu sei、lui/lei è、noi siamo、voi siete、loro sono。',
    'avere：io ho、tu hai、lui/lei ha、noi abbiamo、voi avete、loro hanno。不要把“饿了”逐词写成 essere。',
    '常见规则动词按人称变化。部分 -ire 动词有 -isc- 等形式，本课只练给定的具体动词，不把一个结尾套给所有词。'
  ],{it:'Noi lavoriamo qui e abbiamo due tavoli liberi.',zh:'我们在这里工作，还有两张空桌。两个动词都配合 noi。'},
  {essere:'essere 的人称变化',avere:'avere 与常用搭配',are:'规则 -are 动词','ere-ire':'选定的 -ere / -ire 动词'},[
    choice('essere','Tu ___ in ritardo. 选择 essere 的现在时。',['sono','sei','è','siamo'],'sei','Tu sei in ritardo.','主语 tu 对应 sei。','先确定人称是“你”。','Tu sei in ritardo.'),
    choice('avere','Noi ___ due tavoli liberi. 选择 avere 的现在时。',['ha','hanno','avete','abbiamo'],'abbiamo','Noi abbiamo due tavoli liberi.','noi 对应 abbiamo，表示“我们有”。','主语是 noi，不是后面的 tavoli。','Noi abbiamo due tavoli liberi.'),
    choice('are','Io ___ oggi. 用 lavorare 的现在时。',['lavoro','lavora','lavori','lavorano'],'lavoro','Io lavoro oggi.','io 对应 lavoro；今天的工作用现在时表达。','lavorare 的第一人称单数以 -o 结尾。','Io lavoro oggi.'),
    choice('ere-ire','Voi ___ il menu. 用 leggere 的现在时。',['leggo','leggi','leggete','leggono'],'leggete','Voi leggete il menu.','voi 对应 leggete。','这里是对多人说“你们”。','Voi leggete il menu.'),
    text('essere','只填 essere 的现在时：Loro ___ pronti.','sono','Loro sono pronti.','loro 对应 sono；它与 io sono 同形，要结合主语理解。','这里说的是“他们准备好了”。','Loro sono pronti.'),
    text('avere','只填 avere 的现在时：Tu ___ fame?','hai','Tu hai fame?','“饿”用 avere fame，tu 对应 hai。','不是把中文“是饿的”逐词翻译。','Tu hai fame?'),
    text('are','只填 parlare 的现在时：Noi ___ italiano.','parliamo','Noi parliamo italiano.','noi 对应 parliamo。','注意第一人称复数的 -iamo。','Noi parliamo italiano.'),
    text('ere-ire','只填 aprire 的现在时：Io ___ alle nove.','apro','Io apro alle nove.','aprire 的第一人称单数现在时是 apro。','这里练的是具体动词 aprire。','Io apro alle nove.'),
    text('essere','把 Io 换成 Noi，并修改必要的动词，其他词不变：Io sono qui.','Noi siamo qui.','Noi siamo qui.','Noi 对应 siamo，qui 不变。','只改主语和 essere。','Noi siamo qui.','写出完整句子'),
    text('avere','把 Lei 换成 Io，并修改必要的动词，其他词不变：Lei ha una prenotazione.','Io ho una prenotazione.','Io ho una prenotazione.','Io 对应 ho；una prenotazione 是拥有的预约，不决定动词人称。','保留完整的宾语短语。','Io ho una prenotazione.','写出完整句子'),
    text('are','把 Tu 换成 Voi，并修改必要的动词，其他词不变：Tu lavori in cucina.','Voi lavorate in cucina.','Voi lavorate in cucina.','Voi 对应 lavorate。','“你工作”改为“你们工作”。','Voi lavorate in cucina.','写出完整句子'),
    text('ere-ire','把 Noi 换成 Lui，并修改必要的动词，其他词不变：Noi prendiamo il treno.','Lui prende il treno.','Lui prende il treno.','prendere 的第三人称单数是 prende。','变化跟着主语 Lui。','Lui prende il treno.','写出完整句子')
  ]);

  add('it-questions-negation','问清楚，再说“不”','用地点、时间和原因疑问词提问，并正确放置简单否定词 non。',[
    'Dove 问地点，Quando 问时间，Perché 问原因。看回答的内容能帮助选疑问词。',
    '本课简单句把 non 放在变位动词前：Io non lavoro。单独回答“不”则可以用 No。',
    '组句题会指定词语。Dove è 和省音形式 Dov’è 都可以用于本课的问题。'
  ],{it:'Dove lavori? Oggi non lavoro.',zh:'你在哪里工作？我今天不工作。'},
  {where:'询问地点',when:'询问时间',why:'询问原因',negation:'non 的位置'},[
    choice('where','___ abiti? — A Padova. 选择询问地点的词。',['Quando','Quanto','Dove','Perché'],'Dove','Dove abiti?','A Padova 回答地点，因此使用 Dove。','回答是一座城市。','Dove abiti? Abito a Padova.'),
    choice('when','___ arriva il treno? — Alle otto. 选择合适的疑问词。',['Quando','Dove','Chi','Perché'],'Quando','Quando arriva il treno?','Alle otto 回答时间，因此选择 Quando。','回答告诉你几点。','Quando arriva il treno? Arriva alle otto.'),
    choice('why','___ sei in ritardo? — Perché il bus non passa.',['Dove','Chi','Quando','Perché'],'Perché','Perché sei in ritardo?','回答给出原因，因此用 Perché 提问。','不是问地点或时刻。','Perché sei in ritardo? Perché il bus non passa.'),
    choice('negation','表达“我今天不工作”：Io ___ lavoro oggi.',['no','non','nessuno','senza'],'non','Io non lavoro oggi.','句内否定使用 non，放在 lavoro 前。','区分单独回答 No 与句内 non。','Io non lavoro oggi.'),
    text('where','询问地点，只填一个疑问词：___ lavori? — In un ristorante.','Dove','Dove lavori?','In un ristorante 是地点信息，对应 Dove。','答案是“在哪里”。','Dove lavori? Lavoro in un ristorante.'),
    text('when','询问时间，只填一个疑问词：___ finisci? — Alle dieci.','Quando','Quando finisci?','Alle dieci 表示结束时刻；一个词的时间疑问词是 Quando。','不要填表示时长的 Quanto。','Quando finisci? Finisco alle dieci.'),
    text('why','询问原因，只填一个疑问词：___ studi italiano? — Per parlare con i clienti.','Perché','Perché studi italiano?','Per parlare con i clienti 说明目的，可以回答为什么学意大利语。','意大利语的“为什么”带重音符号。','Perché studi italiano? Per parlare con i clienti.'),
    text('negation','把 Domani lavoro. 变成否定句，只填缺少的否定词：Domani ___ lavoro.','non','Domani non lavoro.','non 放在变位动词 lavoro 前，其他词保留。','这道题只需要一个词。','Domani non lavoro.'),
    text('where','使用全部给定词语提问，以 Dove 开头：la stazione / è / dove。可以使用省音形式。',["Dove è la stazione?","Dov'è la stazione?"],'Dov’è la stazione?','Dove è la stazione? 和 Dov’è la stazione? 都是这里可接受的地点提问。','先放疑问词，再放 è 和名词短语。',"Dov'è la stazione?",'写出完整句子'),
    text('when','只使用 Quando 和 aprite 提问，写出完整问题，以 Quando 开头。','Quando aprite?','Quando aprite?','Quando aprite? 询问对方什么时候开门。','不需要增加别的词。','Quando aprite?','写出完整句子'),
    text('why','按给定顺序写出完整问题：Perché / il negozio / è chiuso。','Perché il negozio è chiuso?','Perché il negozio è chiuso?','Perché 在这里询问店关门的原因。','保留给出的主语和动词。','Perché il negozio è chiuso?','写出完整句子'),
    text('negation','只添加 non 把句子改为否定；保留 Io 和其他词：Io mangio carne.','Io non mangio carne.','Io non mangio carne.','non 放在变位动词 mangio 前。','否定词不要放到句尾。','Io non mangio carne.','写出完整句子')
  ]);

  add('it-time-routines','把时间说清楚','区分时刻、频率、先后顺序和一段活动的时长。',[
    '说具体时刻常用 alle otto、alle due；一点用 all’una。时间段和持续多久是不同问题。',
    'Ogni giorno 和 tutti i giorni 都能表达“每天”；prima…poi…帮助安排先后顺序。',
    '本课用 per due ore 表示一段活动的时长。正在持续的“已经多久”还可能用 da，不能把所有时长都机械地配 per。'
  ],{it:"La pausa comincia all'una. Poi torno al lavoro.",zh:'休息一点开始，随后我回去工作。'},
  {clock:'具体时刻',frequency:'重复频率',sequence:'先后顺序',duration:'活动时长'},[
    choice('clock','Comincio ___ nove. 这里要表达“我九点开始”。',['alla','alle','in','di'],'alle','Comincio alle nove.','具体时刻九点使用 alle nove。','这里问几点，不是持续几小时。','Comincio alle nove.'),
    choice('frequency','哪一项放入句子能表示“我每周一在酒吧工作”？___ lavoro al bar.',['Ieri','Domani','Adesso','Ogni lunedì'],'Ogni lunedì','Ogni lunedì lavoro al bar.','Ogni lunedì 表示每个周一，是重复频率。','要表达重复发生，不是单独的一天。','Ogni lunedì lavoro al bar.'),
    choice('sequence','表达“先洗手，然后准备米饭”：Prima lavo le mani, ___ preparo il riso.',['poi','dove','perché','quanto'],'poi','Prima lavo le mani, poi preparo il riso.','prima 和 poi 标出先后顺序。','空缺表达“然后”。','Prima lavo le mani, poi preparo il riso.'),
    choice('duration','Lavoro dalle dieci alle dodici. 从十点工作到十二点，一共多久？',['un minuto','tre ore','due ore','due giorni'],'due ore','Lavoro per due ore.','十点到十二点相隔两个小时，这里回答的是时长。','不要把结束时刻当作持续时间。','Lavoro per due ore.'),
    text('clock','把“在一点”完整填入空缺，使用文字而不是数字：La pausa comincia ___.',"all'una","La pausa comincia all'una.",'一点使用 all’una，而不是 alle una。','这里需要介词和一点的完整组合。',"La pausa comincia all'una.",'写出时间短语'),
    text('frequency','用含 giorno 或 giorni 的短语表达“每天”，只填短语：___ bevo un caffè.',['Ogni giorno','Tutti i giorni'],'Ogni giorno bevo un caffè.','Ogni giorno 和 tutti i giorni 都符合这个明确要求。','可以用 ogni 加单数，或 tutti i 加复数。','Ogni giorno bevo un caffè.','写出时间短语'),
    text('sequence','补出 prima…poi…结构中缺少的词：Prima controllo la lista, ___ faccio la spesa.','poi','Prima controllo la lista, poi faccio la spesa.','先检查清单，再去采购，用 poi 引出后一步。','题目指定的是 prima…poi…这一组。','Prima controllo la lista, poi faccio la spesa.'),
    text('duration','用 per 加文字数量填入“两个小时”的完整时长短语：Studio ___.','per due ore','Studio per due ore.','这项练习指定 per + 时长，两个小时是 due ore。','数量后需要复数 ore。','Studio per due ore.','写出时长短语'),
    text('clock','把时间改为“在一点”，其余词语不变，时间用文字：La pausa comincia alle due.',"La pausa comincia all'una.","La pausa comincia all'una.",'从 alle due 改为 all’una，需要同时调整介词组合。','不是只把 due 换成 una。',"La pausa comincia all'una.",'写出完整句子'),
    text('frequency','用 tutti i giorni 替换 ogni giorno，保留时间短语在句首及其他词语：Ogni giorno studio italiano.','Tutti i giorni studio italiano.','Tutti i giorni studio italiano.','两种短语在这个句子里都表示每天。','本题明确要求使用 tutti i giorni。','Tutti i giorni studio italiano.','写出完整句子'),
    text('sequence','把两句按原先顺序合为一句，只用一个逗号连接，保留所有词：Prima preparo il tè. Poi faccio colazione.','Prima preparo il tè, poi faccio colazione.','Prima preparo il tè, poi faccio colazione.','prima 和 poi 保留，清楚表达先泡茶、再吃早饭。','不要颠倒两个动作。','Prima preparo il tè, poi faccio colazione.','写出完整句子'),
    text('duration',"把时长改为三个小时，保留其他词，数量用文字：Studio per un'ora.",'Studio per tre ore.','Studio per tre ore.','一个小时 un’ora 改为三个小时 tre ore，使用复数 ore。','保留表示时长的 per。','Studio per tre ore.','写出完整句子')
  ]);

  add('it-places-prepositions','去哪里，从哪里来','在指定城市、国家和人物目的地中选择合适的基础介词。',[
    '本课城市用 a：a Roma、a Torino；国家用 in：in Italia、in Francia。地点表达需要随具体词组学习。',
    '去某人那里常用 da，本课例子是 dal medico、dal dentista。dal 是 da + il 的合并形式。',
    '说明来源可以用 da：da Roma；带冠词时要合并，例如 dalla Francia。不要把“去”和“来自”的介词混为一谈。'
  ],{it:'Vivo a Roma, ma vengo dalla Francia.',zh:'我住在罗马，但来自法国。'},
  {city:'城市前的 a',country:'国家前的 in',destination:'去某人那里',origin:'来自哪里'},[
    choice('city','Vivo ___ Milano. 选择本课表示居住城市的介词。',['in','da','a','su'],'a','Vivo a Milano.','在这项城市表达中使用 a Milano。','Milano 是城市名。','Vivo a Milano.'),
    choice('country','Abito ___ Italia. 选择本课表示居住国家的介词。',['a','in','di','per'],'in','Abito in Italia.','国家 Italia 在这个表达中使用 in。','本课把城市与国家的常用表达分开练。','Abito in Italia.'),
    choice('destination','要表达“我去医生那里”：Vado ___ medico.',['nel','sul','del','dal'],'dal','Vado dal medico.','去医生那里用 dal medico，dal 是 da + il。','这里的目的地是一个人提供服务的地方。','Vado dal medico.'),
    choice('origin','Vengo ___ Roma. 表达“我来自罗马”。',['da','a','in','con'],'da','Vengo da Roma.','来自某城市，在这里用 da Roma。','先判断是来源还是去向。','Vengo da Roma.'),
    text('city','只填介词，表达“我去都灵”：Vado ___ Torino.','a','Vado a Torino.','本课城市目的地用 a Torino。','这是城市，不是国家。','Vado a Torino.'),
    text('country','只填介词，表达“我在法国工作”：Lavoro ___ Francia.','in','Lavoro in Francia.','本课国家地点用 in Francia。','和 in Italia 属于同一组表达。','Lavoro in Francia.'),
    text('destination','把 da + il 合并为一个词填空：Domani vado ___ dentista.','dal','Domani vado dal dentista.','da + il 合并为 dal，表示去牙医那里。','不要分开写 da il。','Domani vado dal dentista.'),
    text('origin','把 da + la 合并为一个词填空：Vengo ___ Spagna.','dalla','Vengo dalla Spagna.','da + la 合并为 dalla，在这里说明来自西班牙。','保留两个 l。','Vengo dalla Spagna.'),
    text('city','只改地点前的介词，保留其他词语：Abito in Padova.','Abito a Padova.','Abito a Padova.','本课城市表达使用 a Padova。','修改目标是 in。','Abito a Padova.','写出完整句子'),
    text('country','把地点 Roma 换成 Italia，并相应修改介词；保留 Vivo：Vivo a Roma.','Vivo in Italia.','Vivo in Italia.','本课从城市 a Roma 改为国家 in Italia。','不能只替换地名而保留 a。','Vivo in Italia.','写出完整句子'),
    text('destination','只合并必要的介词和冠词，其他词序不变：Vado da il medico domani.','Vado dal medico domani.','Vado dal medico domani.','da il 要合并为 dal。','只把两个词合成一个。','Vado dal medico domani.','写出完整句子'),
    text('origin','按给定顺序写出整句，并合并介词和冠词：Vengo / da / la / Francia。','Vengo dalla Francia.','Vengo dalla Francia.','来自法国在这里写成 Vengo dalla Francia。','da + la 不是两个独立保留的词。','Vengo dalla Francia.','写出完整句子')
  ]);

  add('it-needs-quantities','需要多少，够不够','用 bisogno、ci vuole / ci vogliono 和 bastare 说明实际需要。',[
    'Ho bisogno di…表示“我需要……”。avere 跟需要的人变化，di 后面说明需要的东西或帮助。',
    'Ci vuole un minuto；ci vogliono due minuti。这里动词的单复数跟所需要的事物或时间表达一致。',
    'Basta una sedia / Due sedie bastano 表示够用。Abbiamo abbastanza acqua 表示水足够；要结合实际数量判断。'
  ],{it:'Ci vogliono due penne. Abbiamo abbastanza penne.',zh:'需要两支笔。我们的笔够用。'},
  {bisogno:'avere bisogno di','singular-need':'ci vuole 与单数','plural-need':'ci vogliono 与复数',enough:'说明足够'},[
    choice('bisogno','Ho bisogno ___ una penna. 选择固定结构中的介词。',['a','in','per','di'],'di','Ho bisogno di una penna.','这里使用 avere bisogno di。','需要的物品接在 di 后。','Ho bisogno di una penna.'),
    choice('singular-need','Per la ricetta ci ___ un uovo.',['vogliono','vuole','voglio','vuoi'],'vuole','Per la ricetta ci vuole un uovo.','un uovo 是单数，使用 ci vuole。','看需要的鸡蛋数量。','Per la ricetta ci vuole un uovo.'),
    choice('plural-need','Per preparare tutto ci ___ due ore.',['vuole','voglio','vogliono','vuoi'],'vogliono','Per preparare tutto ci vogliono due ore.','due ore 是复数，所以使用 vogliono。','所需时间在这里是两个小时。','Per preparare tutto ci vogliono due ore.'),
    choice('enough','水够大家喝。哪句表达这个意思？',['Abbiamo abbastanza acqua.','Non abbiamo acqua.','Abbiamo troppa acqua.','Abbiamo poca acqua.'],'Abbiamo abbastanza acqua.','Abbiamo abbastanza acqua.','abbastanza 在这里表示足够；troppa 是太多，poca 是少。','选择表示数量足够的词。','Abbiamo abbastanza acqua.'),
    text('bisogno','只填 avere 的现在时：Noi ___ bisogno di aiuto.','abbiamo','Noi abbiamo bisogno di aiuto.','Noi 对应 abbiamo，构成 abbiamo bisogno di。','动词跟需要帮助的人变化。','Noi abbiamo bisogno di aiuto.'),
    text('singular-need','用本课 ci vuole / ci vogliono 结构，只填动词：Ci ___ un documento.','vuole','Ci vuole un documento.','un documento 是单数，所以用 vuole。','不要让动词跟隐含的“我”变化。','Ci vuole un documento.'),
    text('plural-need','用本课 ci vuole / ci vogliono 结构，只填动词：Ci ___ tre persone.','vogliono','Ci vogliono tre persone.','tre persone 是复数，使用 vogliono。','数量是三个人。','Ci vogliono tre persone.'),
    text('enough','只填 bastare 的现在时：Per quattro ospiti, quattro posti ___.','bastano','Per quattro ospiti, quattro posti bastano.','主语 quattro posti 是复数，使用 bastano 表示够用。','这一句不是 ci vuole 结构。','Per quattro ospiti, quattro posti bastano.'),
    text('bisogno','把 Io 改为 Noi，并修改必要的动词，其他词不变：Io ho bisogno di una pausa.','Noi abbiamo bisogno di una pausa.','Noi abbiamo bisogno di una pausa.','avere 跟主语从 ho 变为 abbiamo；di una pausa 保留。','需要休息的人从“我”变成“我们”。','Noi abbiamo bisogno di una pausa.','写出完整句子'),
    text('singular-need','把 due penne 改成 una penna，同时修改必要的动词：Ci vogliono due penne.','Ci vuole una penna.','Ci vuole una penna.','所需物品从复数变成单数，vogliono 要变为 vuole。','数量和动词都要检查。','Ci vuole una penna.','写出完整句子'),
    text('plural-need','把 un minuto 改成 cinque minuti，同时修改必要的动词：Ci vuole un minuto.','Ci vogliono cinque minuti.','Ci vogliono cinque minuti.','cinque minuti 是复数，使用 ci vogliono。','保留句首的 Ci。','Ci vogliono cinque minuti.','写出完整句子'),
    text('enough','把 Una sedia 改成 Due sedie，同时修改必要的动词：Una sedia basta.','Due sedie bastano.','Due sedie bastano.','主语变复数后，basta 变成 bastano。','本题把整个主语短语换成复数。','Due sedie bastano.','写出完整句子')
  ]);

  add('it-purpose-requests','说明来意，问到需要的信息','用简短固定结构说明目的、请求许可、询问信息和请人澄清。',[
    'Sono qui per + 不定式 可以说明来意，例如 Sono qui per ritirare un pacco。',
    'Posso + 不定式 可以询问自己能否做某事；询问信息时，让疑问词对应价格、时间或地点。',
    '没有听清可以请对方重复或慢一点。对陌生人使用礼貌 Lei 形式 Può；对熟人常用 Puoi。'
  ],{it:'Buongiorno, sono qui per ritirare un documento.',zh:'您好，我是来领取一份文件的。'},
  {purpose:'说明来意',permission:'询问许可',information:'询问具体信息',clarification:'请人重复或放慢'},[
    choice('purpose','用 per + 不定式说明目的：Sono qui ___ ritirare un pacco.',['con','di','per','su'],'per','Sono qui per ritirare un pacco.','本题指定 per + 不定式表达“来这里是为了领取包裹”。','后面是动作 ritirare。','Sono qui per ritirare un pacco.'),
    choice('permission','选择“我可以进来吗？”这个许可问题。',['Posso entrare?','Devo entrare.','Entri domani.','Non entro.'],'Posso entrare?','Posso entrare?','Posso entrare? 用 potere 的第一人称单数询问自己能否进入。','要询问自己的许可，不是发布指令。','Posso entrare?'),
    choice('information','你想知道店几点关门，选择对应的问题。',['Quanto costa?','Dove abiti?','Come si chiama?','A che ora chiudete?'],'A che ora chiudete?','A che ora chiudete?','A che ora 询问时刻，chiudete 在这里指店方关门。','要问时间，不是价格。','A che ora chiudete?'),
    choice('clarification','没有听清陌生人的话，哪一句请对方重复？',['Ho capito.','Può ripetere, per favore?','Può pagare, per favore?','È già pronto.'],'Può ripetere, per favore?','Può ripetere, per favore?','ripetere 表示重复，Può 是这里的礼貌 Lei 形式。','不是要求付款。','Può ripetere, per favore?'),
    text('purpose',"用 per + 不定式说明目的，只填介词：Sono qui ___ chiedere un'informazione.",'per',"Sono qui per chiedere un'informazione.",'本题指定用 per 把来意和动作 chiedere 连接起来。','只填写表示目的的介词。',"Sono qui per chiedere un'informazione."),
    text('permission','只填 potere 的第一人称单数现在时：___ usare il bagno?','Posso','Posso usare il bagno?','我能否使用洗手间，用 Posso usare il bagno?。','后面的 usare 已经是不定式。','Posso usare il bagno?'),
    text('information','询问票价，只填 costare 的现在时：Quanto ___ il biglietto?','costa','Quanto costa il biglietto?','il biglietto 是单数，询问它多少钱用 costa。','不是给 tu 或 io 变位。','Quanto costa il biglietto?'),
    text('clarification','把括号动词以不定式填入：Può ___ più lentamente?（parlare）','parlare','Può parlare più lentamente?','Può 后接不定式 parlare，整个请求是请对方说慢一点。','不要把第二个动词也变成人称形式。','Può parlare più lentamente?'),
    text('purpose','用 per 合成一句，以 Sono qui 开头；去掉 Voglio，其他词保留：Sono qui. Voglio ritirare il documento.','Sono qui per ritirare il documento.','Sono qui per ritirare il documento.','用 per ritirare il documento 说明来到这里的目的。','不保留第二句的 Voglio。','Sono qui per ritirare il documento.','写出完整句子'),
    text('permission','只使用给定词语，按顺序写出一个许可问题：Posso / aprire / la finestra。','Posso aprire la finestra?','Posso aprire la finestra?','Posso 加不定式 aprire，询问能否开窗。','第二个动词保留不定式。','Posso aprire la finestra?','写出完整句子'),
    text('information',"只使用给定词语，按顺序提问：Dove / si trova / l'ufficio。","Dove si trova l'ufficio?","Dove si trova l'ufficio?",'Dove si trova…? 是这里询问地点的完整结构。','保留给出的 si trova，不新增信息。',"Dove si trova l'ufficio?",'写出完整句子'),
    text('clarification','把对熟人的 Puoi 改为礼貌 Lei 形式，其他词不变：Puoi ripetere, per favore?',['Può ripetere, per favore?','Può ripetere per favore?'],'Può ripetere, per favore?','礼貌 Lei 在这里使用第三人称单数 Può；ripetere 保持不定式。','改变的是第一个动词。','Può ripetere, per favore?','写出完整句子')
  ]);

  add('it-past-complete','把已经发生的事说出来','使用复合过去时的助动词和过去分词，处理本课的基本一致与不规则形式。',[
    '复合过去时由现在时助动词和过去分词组成，例如 ho comprato、sono arrivato。助动词需要随具体动词学习。',
    '本课的 andare、arrivare、tornare 使用 essere，过去分词与主语性数一致。不能把所有表示移动的动词都当作使用 essere。',
    '本课也练 scritto、letto、fatto 等不规则过去分词。练习中的 avere 句子没有前置宾语代词，不在这里引入它带来的其他一致问题。'
  ],{it:'Giulia è tornata a casa e ha preparato la cena.',zh:'Giulia 回到家并做了晚饭。tornata 与 Giulia 一致，ha preparato 使用 avere。'},
  {avere:'使用 avere 的过去时',essere:'本课使用 essere 的动词',agreement:'过去分词与主语一致',irregular:'常见不规则过去分词'},[
    choice('avere','Ieri io ___ comprato il pane. 选择 avere 的正确形式。',['sono','hai','ho','è'],'ho','Ieri io ho comprato il pane.','comprare 在这个句子里使用 avere，io 对应 ho。','助动词随 io 变化。','Ieri io ho comprato il pane.'),
    choice('essere','Ieri Marco ___ arrivato presto. 选择正确的助动词形式。',['è','ha','sono','ho'],'è','Ieri Marco è arrivato presto.','本课 arrivare 使用 essere，Marco 对应 è。','不要把助动词只按中文“做了”统一处理。','Ieri Marco è arrivato presto.'),
    choice('agreement','Sara è ___ alle otto. 用 tornare 的过去分词。',['tornato','tornati','tornate','tornata'],'tornata','Sara è tornata alle otto.','Sara 是女性单数主语，使用 tornata。','这句的助动词是 essere。','Sara è tornata alle otto.'),
    choice('irregular','Ho ___ un messaggio. 用 scrivere 的过去分词。',['scrivuto','scritto','scrive','scrivato'],'scritto','Ho scritto un messaggio.','scrivere 的过去分词是 scritto。','这是需要单独记住的不规则形式。','Ho scritto un messaggio.'),
    text('avere','只填 avere 的正确形式：Ieri noi ___ pulito la cucina.','abbiamo','Ieri noi abbiamo pulito la cucina.','noi 对应 abbiamo；pulito 已经是给定的过去分词。','不要修改后面的 pulito。','Ieri noi abbiamo pulito la cucina.'),
    text('essere','只填 essere 的正确形式：Ieri loro ___ andati a Roma.','sono','Ieri loro sono andati a Roma.','loro 对应 sono；本课 andare 使用 essere。','andati 已经给出复数形式。','Ieri loro sono andati a Roma.'),
    text('agreement','只填 partire 的过去分词：Giulia e Sara sono ___ presto.','partite','Giulia e Sara sono partite presto.','两位女性构成阴性复数主语，使用 partite。','主语不止一个人，而且两人都是女性。','Giulia e Sara sono partite presto.'),
    text('irregular','只填 leggere 的过去分词：Ieri ho ___ un libro.','letto','Ieri ho letto un libro.','leggere 的过去分词是 letto。','这不是简单把词尾改成 -uto。','Ieri ho letto un libro.'),
    text('avere','把句子改成复合过去时，保留 Io 和其他词，不增加时间词：Io preparo la cena.','Io ho preparato la cena.','Io ho preparato la cena.','preparare 使用 ho preparato，原来的宾语 la cena 保留。','需要助动词和过去分词两个词。','Io ho preparato la cena.','写出完整句子'),
    text('essere','把句子改成复合过去时，保留 Marco 和其他词：Marco torna a casa.','Marco è tornato a casa.','Marco è tornato a casa.','本课 tornare 使用 essere，Marco 对应 è tornato。','Marco 是男性单数。','Marco è tornato a casa.','写出完整句子'),
    text('agreement','只把 Marco 改成 Giulia，并修改必要的一致关系：Marco è andato al mercato.','Giulia è andata al mercato.','Giulia è andata al mercato.','主语改为女性单数后，andato 改成 andata；è 仍是单数。','不需要更换助动词。','Giulia è andata al mercato.','写出完整句子'),
    text('irregular','把句子改成复合过去时，保留 Io 和其他词：Io faccio la spesa.','Io ho fatto la spesa.','Io ho fatto la spesa.','fare 的过去分词是 fatto，这里用 ho fatto。','不要写 facciuto 或 facciato。','Io ho fatto la spesa.','写出完整句子')
  ]);

  add('it-past-background','背景、习惯与发生的那一下','按题目指定的叙述角度区分 imperfetto 背景与复合过去时完成事件。',[
    'Imperfetto 可以描写过去的背景、状态和反复的习惯，例如 era pieno、andavo ogni giorno。',
    '在本课场景中，用 mentre + imperfetto 描述当时进行中的背景，再用复合过去时交代发生的事件。',
    '同一件事可能因叙述角度不同而用不同过去时。题目会明确要求背景或已完成事件，不能仅看到 ieri 就断定某一个时态。'
  ],{it:'Mentre preparavo la cena, il telefono ha squillato.',zh:'我当时在做晚饭，电话响了。前半句给背景，后半句交代发生的事件。'},
  {background:'过去的状态背景',habit:'过去的反复习惯',interruption:'背景中的新事件',completed:'一次已完成的事件'},[
    choice('background','描述那晚的状态，按要求用 essere 的 imperfetto：La sala ___ piena.',['ero','erano','eri','era'],'era','La sala era piena.','La sala 是第三人称单数；本题指定状态背景，因此用 era。','不是用复数 erano。','La sala era piena.'),
    choice('habit','描述过去习惯，用 andare 的 imperfetto：Da bambina, Marta ___ a scuola a piedi ogni giorno.',['andavo','andava','andavano','andavi'],'andava','Da bambina, Marta andava a scuola a piedi ogni giorno.','Marta 对应 andava；ogni giorno 表明这里描述反复的习惯。','主语是第三人称单数 Marta。','Da bambina, Marta andava a scuola a piedi ogni giorno.'),
    choice('interruption','按要求用 cucinare 的 imperfetto 描述进行中的背景：Mentre io ___, il telefono ha squillato.',['cucinavo','ho cucinato','cucinano','cucinerò'],'cucinavo','Mentre io cucinavo, il telefono ha squillato.','本题把做饭作为当时进行中的背景，io 对应 cucinavo。','前半句负责铺背景。','Mentre io cucinavo, il telefono ha squillato.'),
    choice('completed','明确报告昨天完成的一次关门动作，用 chiudere 的复合过去时：Ieri ___ la porta alle otto.',['chiudevo','chiudo','ho chiuso','chiuderò'],'ho chiuso','Ieri ho chiuso la porta alle otto.','本题指定一次已完成事件，因此使用 ho chiuso；不是仅凭 ieri 选时态。','需要助动词和过去分词。','Ieri ho chiuso la porta alle otto.'),
    text('background','描写过去天气，按要求填 fare 的 imperfetto：Quella sera ___ freddo.','faceva','Quella sera faceva freddo.','天气表达 fare freddo 在这里用第三人称单数 faceva。','用过去背景形式，不用现在时 fa。','Quella sera faceva freddo.'),
    text('habit',"描述过去习惯，填 prendere 的 imperfetto：Da studente, io ___ l'autobus ogni mattina.",'prendevo',"Da studente, io prendevo l'autobus ogni mattina.",'io 对应 prendevo，ogni mattina 表示过去反复发生。','主语是 io。',"Da studente, io prendevo l'autobus ogni mattina."),
    text('interruption','用 leggere 的 imperfetto 描述当时正在读：Mentre io ___, è suonato il campanello.','leggevo','Mentre io leggevo, è suonato il campanello.','阅读是背景，门铃响是这个场景中出现的事件；io 对应 leggevo。','这里只填背景动词。','Mentre io leggevo, è suonato il campanello.'),
    text('completed','明确讲一次已经吃完的事，填 mangiare 的第一人称单数复合过去时：Ieri ___ una pizza.','ho mangiato','Ieri ho mangiato una pizza.','题目指定完成事件，使用 ho mangiato。','答案需要两个词。','Ieri ho mangiato una pizza.'),
    text('background','只把 è 改成 essere 的 imperfetto，其他词语不变：La cucina è tranquilla.','La cucina era tranquilla.','La cucina era tranquilla.','本题明确要求 imperfetto，所以 è 改为 era。','保留名词和形容词。','La cucina era tranquilla.','写出完整句子'),
    text('habit','只把 vado 改成 andare 的 imperfetto，保留 Io 和其他词：Io vado al mercato ogni sabato.','Io andavo al mercato ogni sabato.','Io andavo al mercato ogni sabato.','把现在的习惯改成过去的习惯，io 使用 andavo。','不要添加新的时间词。','Io andavo al mercato ogni sabato.','写出完整句子'),
    text('interruption','用 Mentre 把两句连接成一句，第一句仍在前，用逗号连接，保留两句动词时态：Preparavo il tè. Il telefono ha squillato.','Mentre preparavo il tè, il telefono ha squillato.','Mentre preparavo il tè, il telefono ha squillato.','Mentre 引出准备茶的背景，电话响的完成事件保留复合过去时。','只添加 Mentre 和连接逗号，不改动词。','Mentre preparavo il tè, il telefono ha squillato.','写出完整句子'),
    text('completed','把 Oggi 改为 Ieri，并用复合过去时报告一次买票的完成事件；不增加其他词：Oggi compro un biglietto.','Ieri ho comprato un biglietto.','Ieri ho comprato un biglietto.','题目要求复合过去时，compro 改为 ho comprato，Oggi 改为 Ieri。','保留 un biglietto。','Ieri ho comprato un biglietto.','写出完整句子')
  ]);

  add('it-modal-actions','想做、能做、必须做','用现在时情态动词配合不定式，并处理本课宾语代词的两种位置。',[
    'Voglio 表示我想要，posso 表示我能或可以，devo 表示我必须；具体含义仍取决于场景。更委婉的请求会在礼貌表达课里练。',
    '本课结构中，情态动词跟主语变化，后面的动作保持不定式：Noi dobbiamo partire。',
    '本课的直接宾语代词可以前置，也可以接到不定式后：La voglio comprare / Voglio comprarla。接后面时，comprare + la 写成 comprarla。'
  ],{it:'La voglio comprare. Voglio comprarla.',zh:'我想买它。这里的两个句子都可以，la 指阴性单数宾语。'},
  {volere:'表达想要',potere:'表达能够或许可',dovere:'表达必须','pronoun-placement':'情态结构里的代词位置'},[
    choice('volere','Io ___ un caffè. 选择 volere 的现在时。',['vuole','voglio','vogliamo','volete'],'voglio','Io voglio un caffè.','io 对应 voglio。这里表达愿望，不自动等于最委婉的点单方式。','主语是“我”。','Io voglio un caffè.'),
    choice('potere','Tu ___ venire domani? 选择 potere 的现在时。',['posso','può','possono','puoi'],'puoi','Tu puoi venire domani?','tu 对应 puoi，后面的 venire 保持不定式。','只变第一个动词的人称。','Tu puoi venire domani?'),
    choice('dovere','Noi ___ partire alle sei. 选择 dovere 的现在时。',['dobbiamo','devi','devono','deve'],'dobbiamo','Noi dobbiamo partire alle sei.','noi 对应 dobbiamo。','这里表达“我们必须”。','Noi dobbiamo partire alle sei.'),
    choice('pronoun-placement','题目指定把 la 接在 comprare 后面，补一个词：Posso ___.',['comprarela','la comprare','comprarla','comprala'],'comprarla','Posso comprarla.','在这个不定式加代词的组合中，comprare 去掉末尾 e，得到 comprarla。','不是把完整 comprare 和 la 直接拼在一起。','Posso comprarla.'),
    text('volere','只填 volere 的现在时：Noi ___ prenotare un tavolo.','vogliamo','Noi vogliamo prenotare un tavolo.','Noi 对应 vogliamo，prenotare 保持不定式。','不要同时修改第二个动词。','Noi vogliamo prenotare un tavolo.'),
    text('potere','只填 potere 的现在时：Io ___ aiutarti.','posso','Io posso aiutarti.','io 对应 posso；aiutarti 是题目给出的“帮助你”。','先确定第一人称单数。','Io posso aiutarti.'),
    text('dovere','只填 dovere 的现在时：Tu ___ lavorare stasera.','devi','Tu devi lavorare stasera.','tu 对应 devi；lavorare 保持不定式。','这是“你必须”，不是“我必须”。','Tu devi lavorare stasera.'),
    text('pronoun-placement','把 leggere 和宾语代词 lo 接成一个词，只填这个词：Voglio ___.','leggerlo','Voglio leggerlo.','leggere 接 lo 写作 leggerlo，去掉不定式末尾的 e。','代词放后面时必须连写。','Voglio leggerlo.'),
    text('volere','把 Io 改为 Noi，并修改必要的情态动词；其他词不变：Io voglio mangiare.','Noi vogliamo mangiare.','Noi vogliamo mangiare.','Noi 对应 vogliamo，mangiare 不变。','第二个动词仍是不定式。','Noi vogliamo mangiare.','写出完整句子'),
    text('potere','把 Voi 改为 Lei（她），并修改必要的情态动词；其他词不变：Voi potete venire.','Lei può venire.','Lei può venire.','第三人称单数 Lei 对应 può；venire 不变。','注意 può 的重音。','Lei può venire.','写出完整句子'),
    text('dovere','把 Tu 改为 Noi，并修改必要的情态动词；其他词不变：Tu devi aspettare.','Noi dobbiamo aspettare.','Noi dobbiamo aspettare.','Noi 对应 dobbiamo，动作 aspettare 保持不定式。','表达的是“我们必须等待”。','Noi dobbiamo aspettare.','写出完整句子'),
    text('pronoun-placement','只把 la borsa 换成代词 la，其余意义和动词不变；可把代词前置或接在不定式后：Voglio comprare la borsa.',['La voglio comprare.','Voglio comprarla.'],'La voglio comprare. / Voglio comprarla.','本课这个情态结构允许两种位置，两种答案都接受。','前置要分开写；后置要与不定式连写。','La voglio comprare. Voglio comprarla.','写出完整句子')
  ]);

  add('it-reflexive-routines','自反代词跟着谁走','在给定的日常动词中配合主语选择 mi、ti、si、ci。',[
    '本课对应关系：io mi、tu ti、lui/lei si、noi ci。代词和动词的人称需要一起检查。',
    '例如 Io mi alzo、Tu ti alzi。描述清洗自己的身体部位时，本课使用 Mi lavo le mani。',
    '这些代词动词并非都能逐词理解成“对自己做动作”；像 riposarsi 这样的词应连同常用形式一起学习。'
  ],{it:'Mi alzo presto, mi preparo e vado al lavoro.',zh:'我起得早，准备好，然后去上班。'},
  {mi:'io 配合 mi',ti:'tu 配合 ti',si:'lui / lei 配合 si',ci:'noi 配合 ci'},[
    choice('mi','Io ___ sveglio presto. 选择与 io 配合的代词。',['si','ci','mi','ti'],'mi','Io mi sveglio presto.','io 使用 mi，构成 mi sveglio。','不要跟 presto 的位置判断人称。','Io mi sveglio presto.'),
    choice('ti','Tu ___ prepari. 选择与 tu 配合的代词。',['ti','mi','si','ci'],'ti','Tu ti prepari.','tu 使用 ti，动词 prepari 也对应 tu。','代词和变位都要配合“你”。','Tu ti prepari.'),
    choice('si','Luca ___ lava le mani. 选择合适的代词。',['mi','ci','ti','si'],'si','Luca si lava le mani.','Luca 是第三人称单数，这里使用 si。','le mani 是洗的部位，不是决定人称的主语。','Luca si lava le mani.'),
    choice('ci','Noi ___ alziamo alle otto. 选择与 noi 配合的代词。',['si','ci','mi','ti'],'ci','Noi ci alziamo alle otto.','noi 使用 ci，动词 alziamo 对应第一人称复数。','这里说“我们起床”。','Noi ci alziamo alle otto.'),
    text('mi','只填代词：Io ___ vesto alle otto.','mi','Io mi vesto alle otto.','Io 配合 mi，构成 mi vesto。','动词 vesto 已经给出。','Io mi vesto alle otto.'),
    text('ti','只填代词：Tu ___ siedi qui.','ti','Tu ti siedi qui.','Tu 配合 ti，构成 ti siedi。','这里只填代词，不修改 siedi。','Tu ti siedi qui.'),
    text('si','只填代词：Giulia ___ riposa.','si','Giulia si riposa.','Giulia 是第三人称单数，使用 si riposa。','女性主语也使用第三人称代词 si。','Giulia si riposa.'),
    text('ci','只填代词：Noi ___ prepariamo per uscire.','ci','Noi ci prepariamo per uscire.','Noi 配合 ci，构成 ci prepariamo。','不要因为后面有 uscire 而改变主语。','Noi ci prepariamo per uscire.'),
    text('mi','这句话要表达“我七点醒来”。只补上缺少的自反代词，保留其他词：Io sveglio alle sette.','Io mi sveglio alle sette.','Io mi sveglio alle sette.','表达自己醒来使用 mi sveglio；mi 放在动词前。','主语 Io 也要保留。','Io mi sveglio alle sette.','写出完整句子'),
    text('ti','把 Io 改为 Tu，同时修改代词和动词，其他词不变：Io mi alzo presto.','Tu ti alzi presto.','Tu ti alzi presto.','主语变为 Tu 后，mi 变 ti，alzo 变 alzi。','需要检查两个位置。','Tu ti alzi presto.','写出完整句子'),
    text('si','把 Io 改为 Luca，同时修改代词和动词：Io mi preparo.','Luca si prepara.','Luca si prepara.','Luca 是第三人称单数，使用 si prepara。','不只换代词，也要换动词结尾。','Luca si prepara.','写出完整句子'),
    text('ci','把 Tu 改为 Noi，同时修改代词和动词，其他词不变：Tu ti lavi le mani.','Noi ci laviamo le mani.','Noi ci laviamo le mani.','Noi 使用 ci laviamo，宾语 le mani 保留。','“你洗手”改为“我们洗手”。','Noi ci laviamo le mani.','写出完整句子')
  ]);

  AUTO_LESSONS.push(...lessons);
  AUTO_QUESTIONS.push(...questions);
  lessons.forEach(lesson=>{
    const unit=COURSE_UNITS.find(item=>item.id===lesson.unitId);
    unit.status='ready';
    unit.lessonIds=[lesson.id];
  });
}
