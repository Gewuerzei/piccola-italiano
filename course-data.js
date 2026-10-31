/* Piccola Italiano · stable course catalogue and original automatic-lesson content.
 * Catalogue layers describe knowledge structure, not a learner's CEFR level.
 * A ready unit has the micro-lessons listed here; planned units are a blueprint.
 * This file is data only: no learner-state, storage, score, or network operations.
 */
'use strict';

const COURSE_UNITS = [
  {id:'it-sentence-core',layer:1,title:'简单句：谁在做什么',prereq:[],nodeRefs:['sentence'],objective:'识别简单句中的主语、动词和宾语，并按给定词语组成一句完整的话。',track:'core',status:'planned',lessonIds:[]},
  {id:'it-nouns-articles',layer:1,title:'名词、冠词与单复数',prereq:['it-sentence-core'],nodeRefs:['sentence','agreement'],objective:'借助冠词和语境识别常用名词的性与数，完成限定范围内的一致变化。',track:'core',status:'planned',lessonIds:[]},
  {id:'it-present-basics',layer:1,title:'现在时与常用动词',prereq:['it-sentence-core'],nodeRefs:['present'],objective:'用给定的常用动词、essere 和 avere 表达身份、状态及眼前的动作。',track:'core',status:'planned',lessonIds:[]},
  {id:'it-questions-negation',layer:1,title:'提问与否定',prereq:['it-present-basics'],nodeRefs:['sentence','present'],objective:'读懂日常疑问词，并把给定的现在时肯定句改为否定句。',track:'core',status:'planned',lessonIds:[]},
  {id:'it-time-routines',layer:1,title:'时间、频率与日常安排',prereq:['it-present-basics'],nodeRefs:['time','present'],objective:'辨认时间和频率线索，用短句说明什么时候做什么。',track:'core',status:'planned',lessonIds:[]},
  {id:'it-places-prepositions',layer:1,title:'地点、方向与基础介词',prereq:['it-sentence-core','it-present-basics'],nodeRefs:['sentence','requests'],objective:'在熟悉地点的语境中区分位置与去向，并补全基础介词短语。',track:'core',status:'planned',lessonIds:[]},
  {id:'it-needs-quantities',layer:1,title:'需要、数量与是否足够',prereq:['it-nouns-articles','it-present-basics'],nodeRefs:['needs','agreement'],objective:'用数量、bisogno 和 ci vuole / ci vogliono 说明一项具体需要。',track:'core',status:'planned',lessonIds:[]},
  {id:'it-purpose-requests',layer:1,title:'说明来意与提出请求',prereq:['it-present-basics','it-questions-negation'],nodeRefs:['requests'],objective:'按场景说明来意、提出一个明确请求，并询问必要信息。',track:'core',status:'planned',lessonIds:[]},

  {id:'it-past-complete',layer:2,title:'讲述已经发生的事情',prereq:['it-present-basics','it-time-routines'],nodeRefs:['past'],objective:'结合时间线索使用复合过去时，区分常见的助动词选择和基本一致关系。',track:'core',status:'planned',lessonIds:[]},
  {id:'it-past-background',layer:2,title:'过去的背景与事件',prereq:['it-past-complete'],nodeRefs:['past','time'],objective:'在短叙事中区分背景、习惯和已完成事件，并解释所选时态的作用。',track:'core',status:'planned',lessonIds:[]},
  {id:'it-objects-forms',layer:2,title:'lo / la / li / le：先找性与数',prereq:['it-nouns-articles','it-present-basics'],nodeRefs:['objects','agreement'],objective:'根据明确的名词前项选择 lo、la、li、le，并在给定现在时句子中替换宾语。',track:'core',status:'ready',lessonIds:['auto-objects-forms']},
  {id:'it-objects-context',layer:2,title:'把宾语代词放回对话',prereq:['it-objects-forms'],nodeRefs:['objects'],objective:'从前一句找出宾语所指，在现在时短回答中填入或写出正确的直接宾语代词。',track:'core',status:'ready',lessonIds:['auto-objects-context']},
  {id:'it-objects-negative',layer:2,title:'否定句里的宾语代词',prereq:['it-objects-context','it-questions-negation'],nodeRefs:['objects'],objective:'保留正确的指代，按 non + 代词 + 变位动词的顺序改写给定的现在时句子。',track:'core',status:'ready',lessonIds:['auto-objects-negative']},
  {id:'it-modal-actions',layer:2,title:'想做、能做与必须做',prereq:['it-purpose-requests','it-objects-context'],nodeRefs:['requests','needs','objects'],objective:'用 volere、potere、dovere 加不定式表达行动，并辨认允许的代词位置。',track:'core',status:'planned',lessonIds:[]},
  {id:'it-polite-requests',layer:2,title:'礼貌请求与确认',prereq:['it-purpose-requests'],nodeRefs:['politeness'],objective:'用礼貌条件式提出请求、确认信息，并根据情境调整表达。',track:'core',status:'planned',lessonIds:[]},
  {id:'it-shortages',layer:2,title:'缺货、不足与替代',prereq:['it-needs-quantities'],nodeRefs:['shortage','agreement'],objective:'用 manca / mancano 说明缺少的物品与数量，并给出一个简短替代方案。',track:'core',status:'planned',lessonIds:[]},
  {id:'it-people-datives',layer:2,title:'给谁、告诉谁：间接宾语',prereq:['it-objects-negative','it-polite-requests'],nodeRefs:['objects','politeness'],objective:'在明确语境中区分直接宾语和间接宾语，避免把所有 le 都解释为阴性复数。',track:'core',status:'planned',lessonIds:[]},
  {id:'it-reflexive-routines',layer:2,title:'自反动词与一天的安排',prereq:['it-present-basics','it-time-routines'],nodeRefs:['present','time'],objective:'按人物和时间线索使用常见自反动词，组成简短的日常安排。',track:'core',status:'planned',lessonIds:[]},
  {id:'it-everyday-interaction',layer:2,title:'预约、购物与办事短对话',prereq:['it-polite-requests','it-objects-negative','it-time-routines'],nodeRefs:['requests','politeness','time'],objective:'在原创日常场景中完成请求、确认和结束对话三个步骤。',track:'core',status:'planned',lessonIds:[]},

  {id:'it-relative-che',layer:3,title:'用 che 连接与修饰',prereq:['it-objects-context'],nodeRefs:['relative'],objective:'找出关系从句修饰的名词，并把两个给定短句合并为带 che 的句子。',track:'core',status:'planned',lessonIds:[]},
  {id:'it-reference-tracking',layer:3,title:'长句中谁指向谁',prereq:['it-relative-che','it-objects-negative'],nodeRefs:['referent'],objective:'沿着名词、代词和关系词追踪同一指代对象，指出可能的歧义。',track:'core',status:'planned',lessonIds:[]},
  {id:'it-cause-result',layer:3,title:'原因、结果与转折',prereq:['it-past-complete'],nodeRefs:['reason'],objective:'用常见连接词把事实、原因和结果组织清楚，并区分转折。',track:'core',status:'planned',lessonIds:[]},
  {id:'it-connected-narration',layer:3,title:'把经历说成一段话',prereq:['it-past-background','it-cause-result'],nodeRefs:['past','reason','time'],objective:'按时间顺序写出短叙事，交代背景、事件和结果。',track:'core',status:'planned',lessonIds:[]},
  {id:'it-work-report',layer:3,title:'报告工作情况与下一步',prereq:['it-shortages','it-cause-result'],nodeRefs:['work'],objective:'在工作情境中依次说明现状、问题、影响和建议行动。',track:'core',status:'planned',lessonIds:[]},
  {id:'it-shift-negotiation',layer:3,title:'协商时间与换班',prereq:['it-polite-requests','it-cause-result','it-time-routines'],nodeRefs:['negotiation'],objective:'说明时间限制和原因，提出一个具体替代安排并确认对方意见。',track:'core',status:'planned',lessonIds:[]},
  {id:'it-repair-circumlocution',layer:3,title:'忘词时解释与追问',prereq:['it-everyday-interaction','it-relative-che'],nodeRefs:['requests','work'],objective:'用用途、外观或类别绕述一个忘记的词，并提出澄清问题。',track:'core',status:'planned',lessonIds:[]},
  {id:'it-reading-summaries',layer:3,title:'读通知、找重点、再复述',prereq:['it-reference-tracking','it-cause-result'],nodeRefs:['referent','reason'],objective:'从短通知找出对象、时间、要求和原因，再用自己的短句复述。',track:'core',status:'planned',lessonIds:[]},

  {id:'it-subjunctive-intro',layer:4,title:'态度、愿望与虚拟式',prereq:['it-relative-che','it-cause-result'],nodeRefs:['subjunctive'],objective:'在选定高频结构中区分陈述与态度表达，辨认并使用相应动词形式。',track:'core',status:'planned',lessonIds:[]},
  {id:'it-exceptions-scope',layer:4,title:'规则的范围与例外',prereq:['it-cause-result','it-reading-summaries'],nodeRefs:['exception'],objective:'识别一般规则、适用范围和例外条件，避免把例外扩大为整条规则。',track:'core',status:'planned',lessonIds:[]},
  {id:'it-conditions-logics',layer:4,title:'条件、假设与反事实',prereq:['it-subjunctive-intro','it-past-background'],nodeRefs:['conditions'],objective:'区分常见条件结构、限定条件与反事实，并解释结果依赖什么。',track:'core',status:'planned',lessonIds:[]},
  {id:'it-consequences-meaning',layer:4,title:'行为与后果的语言',prereq:['it-exceptions-scope','it-cause-result'],nodeRefs:['consequences'],objective:'从原创行政或规则文本中找出触发条件及其后果，并用日常语言解释。',track:'core',status:'planned',lessonIds:[]},
  {id:'it-traffic-language',layer:4,title:'驾考文本的逻辑阅读',prereq:['it-exceptions-scope','it-conditions-logics'],nodeRefs:['traffic-logic'],objective:'在明确标为自编的语言练习中读懂义务、允许、限制与例外，不把练习当作官方题库。',track:'core',status:'planned',lessonIds:[]},
  {id:'it-register-precision',layer:4,title:'把表达写得准确合宜',prereq:['it-reading-summaries','it-consequences-meaning'],nodeRefs:['register'],objective:'比较日常与正式表达，保留原意并调整指代、限定范围和礼貌程度。',track:'core',status:'planned',lessonIds:[]},

  {id:'it-word-formation',layer:5,title:'用词根与词缀辅助理解',prereq:['it-present-basics'],nodeRefs:['morphology'],objective:'在受限例子中拆分词素、提出词义猜测，并用语境核对而非只凭外形下结论。',track:'core',status:'planned',lessonIds:[]},
  {id:'explore-semantic-history',layer:5,title:'词义如何变化',prereq:['it-word-formation'],nodeRefs:['semantic-history'],objective:'对照有来源的例子区分历史词义与现代用法，并指出证据边界。',track:'explore',status:'planned',lessonIds:[]},
  {id:'explore-latin-companion',layer:5,title:'口袋拉丁语：随时可看的旁注',prereq:[],nodeRefs:['morphology','sound-change'],objective:'在可随时退出的旁注中认识已核实的拉丁语形式、形态信息和现代对应词。',track:'explore',status:'planned',lessonIds:[]},
  {id:'explore-historical-sounds',layer:5,title:'历史音变与读音重建',prereq:['explore-latin-companion','it-word-formation'],nodeRefs:['sound-change'],objective:'比较有来源的形式与读音，区分历史音变规律、例外和重建读音。',track:'explore',status:'planned',lessonIds:[]},
  {id:'explore-documents',layer:5,title:'历史文书与虚构卷宗',prereq:['it-register-precision','explore-semantic-history'],nodeRefs:['register','semantic-history'],objective:'分清史料与原创虚构故事，在文书中识别语体、含义和需要查证的历史信息。',track:'explore',status:'planned',lessonIds:[]},
  {id:'explore-romance-comparison',layer:5,title:'罗曼语同源词与假朋友',prereq:['explore-historical-sounds','explore-semantic-history'],nodeRefs:['comparative','sound-change'],objective:'在已核实例子中比较同源词、借词和假朋友，拒绝把音变模式当作万能翻译器。',track:'explore',status:'planned',lessonIds:[]},
  {id:'explore-grammar-comparison',layer:5,title:'跨语言语法：相似但不等同',prereq:['it-subjunctive-intro','explore-semantic-history'],nodeRefs:['comparative','subjunctive'],objective:'先说明意大利语句子的作用，再比较其他语言的相关结构与不等价之处。',track:'explore',status:'planned',lessonIds:[]}
];

const AUTO_LESSONS = [
  {
    id:'auto-objects-forms',unitId:'it-objects-forms',title:'先找性与数',order:1,
    goal:'把明确提过的名词换成 lo、la、li 或 le。',
    explanation:[
      '直接宾语回答“动词作用于谁或什么”。本课用代词替换已经明确的宾语，避免重复。',
      '阳性单数 → lo；阴性单数 → la；阳性复数 → li；阴性复数 → le。看所指名词的性与数，不看说话者。',
      '这些现在时短句里，代词放在变位动词前。词形、填空、完整短句会逐步出现。'
    ],
    example:{it:'Guardo il menu. → Lo guardo.',zh:'我看菜单。→ 我看它。il menu 是阳性单数，因此用 lo。'}
  },
  {
    id:'auto-objects-context',unitId:'it-objects-context',title:'放回真实的短回答',order:2,
    goal:'先从上文找出所指的东西，再完成一个现在时回答。',
    explanation:[
      '宾语可以在上一句出现。先找代词代替哪个名词，再判断它的性与数。',
      '代词仍放在变位动词前：动词说的是“我”还是“你”，不会改变宾语的性与数。',
      '完整回答题已经给出动词，只按要求替换重复的名词；不用另想一种说法。'
    ],
    example:{it:'Leggi il giornale? — Sì, lo leggo.',zh:'你读报纸吗？——是的，我读。lo 指前一句的 il giornale。'}
  },
  {
    id:'auto-objects-negative',unitId:'it-objects-negative',title:'加上 non，顺序别乱',order:3,
    goal:'在否定句中正确放置 non 和直接宾语代词。',
    explanation:[
      '否定不会改变所指名词的性与数：阳性单数用 lo，阴性单数用 la，阳性复数用 li，阴性复数用 le。',
      '本课现在时句子的顺序是 non + 代词 + 变位动词，例如 Non lo vedo。',
      '改写时保留原来的 non、动词和其他词，只替换明确指出的宾语。'
    ],
    example:{it:'Non compro le pere. → Non le compro.',zh:'我不买梨。→ 我不买它们。le pere 是阴性复数，non 放在代词 le 前。'}
  }
];

const AUTO_QUESTIONS = [
  {
    id:'auto-objects-forms-01',lessonId:'auto-objects-forms',level:1,type:'choice',
    prompt:'il pane（面包）是阳性单数。用哪个直接宾语代词代替它？',choices:['la','lo','li','le'],
    answers:['lo'],answerLabel:'lo',explanation:'il pane 是阳性单数，所以用 lo。',hint:'先看单数还是复数，再看名词的性。',focus:'lo',evidence:'recognition'
  },
  {
    id:'auto-objects-forms-02',lessonId:'auto-objects-forms',level:1,type:'choice',
    prompt:'la porta（门）是阴性单数。用哪个直接宾语代词代替它？',choices:['li','le','la','lo'],
    answers:['la'],answerLabel:'la',explanation:'la porta 是阴性单数，所以用 la。这里的代词代替整个名词短语。',hint:'一个阴性名词，对应阴性单数的代词。',focus:'la',evidence:'recognition'
  },
  {
    id:'auto-objects-forms-03',lessonId:'auto-objects-forms',level:1,type:'choice',
    prompt:'i piatti（盘子）是阳性复数。用哪个直接宾语代词代替它们？',choices:['li','la','le','lo'],
    answers:['li'],answerLabel:'li',explanation:'i piatti 是阳性复数，所以用 li。',hint:'这里有多个盘子；i 提示阳性复数。',focus:'li',evidence:'recognition'
  },
  {
    id:'auto-objects-forms-04',lessonId:'auto-objects-forms',level:1,type:'choice',
    prompt:'le chiavi（钥匙）是阴性复数。用哪个直接宾语代词代替它们？',choices:['lo','li','la','le'],
    answers:['le'],answerLabel:'le',explanation:'le chiavi 是阴性复数，所以用 le。不要只凭 chiavi 的词尾猜性别。',hint:'冠词 le 已经说明这是阴性复数。',focus:'le',evidence:'recognition'
  },
  {
    id:'auto-objects-forms-05',lessonId:'auto-objects-forms',level:2,type:'text',
    prompt:'代替 il libro（书），只填一个代词：Leggo il libro. → ___ leggo.',
    answers:['lo'],answerLabel:'Lo leggo.',explanation:'il libro 是阳性单数，用 lo；lo 放在 leggo 前。',hint:'il libro 是一个阳性单数名词。',focus:'lo',evidence:'controlled_production'
  },
  {
    id:'auto-objects-forms-06',lessonId:'auto-objects-forms',level:2,type:'text',
    prompt:'代替 la borsa（包），只填一个代词：Porto la borsa. → ___ porto.',
    answers:['la'],answerLabel:'La porto.',explanation:'la borsa 是阴性单数，用 la；la 放在 porto 前。',hint:'这里只替换一个阴性单数的包。',focus:'la',evidence:'controlled_production'
  },
  {
    id:'auto-objects-forms-07',lessonId:'auto-objects-forms',level:2,type:'text',
    prompt:'代替 i bicchieri（玻璃杯），只填一个代词：Lavo i bicchieri. → ___ lavo.',
    answers:['li'],answerLabel:'Li lavo.',explanation:'i bicchieri 是阳性复数，用 li；lavo 的形式不需要改变。',hint:'i 表明这里的杯子是阳性复数。',focus:'li',evidence:'controlled_production'
  },
  {
    id:'auto-objects-forms-08',lessonId:'auto-objects-forms',level:2,type:'text',
    prompt:'代替 le sedie（椅子），只填一个代词：Sposto le sedie. → ___ sposto.',
    answers:['le'],answerLabel:'Le sposto.',explanation:'le sedie 是阴性复数，用 le；le 放在 sposto 前。',hint:'le sedie 表示多把椅子，是阴性复数。',focus:'le',evidence:'controlled_production'
  },
  {
    id:'auto-objects-forms-09',lessonId:'auto-objects-forms',level:3,type:'text',
    prompt:'只把 il telefono（电话）换成代词，其余词语不变；写完整句子：Cerco il telefono.',
    answers:['Lo cerco.'],answerLabel:'Lo cerco.',explanation:'il telefono 是阳性单数，改为 lo，并把它放在 cerco 前。',hint:'用“代词 + cerco”组成完整短句。',focus:'lo',evidence:'controlled_production'
  },
  {
    id:'auto-objects-forms-10',lessonId:'auto-objects-forms',level:3,type:'text',
    prompt:'只把 la finestra（窗户）换成代词，其余词语不变；写完整句子：Chiudo la finestra.',
    answers:['La chiudo.'],answerLabel:'La chiudo.',explanation:'la finestra 是阴性单数，改为 la；chiudo 保持不变。',hint:'代词要放在 chiudo 前面。',focus:'la',evidence:'controlled_production'
  },
  {
    id:'auto-objects-forms-11',lessonId:'auto-objects-forms',level:3,type:'text',
    prompt:'只把 i tavoli（桌子）换成代词，其余词语不变；写完整句子：Preparo i tavoli.',
    answers:['Li preparo.'],answerLabel:'Li preparo.',explanation:'i tavoli 是阳性复数，改为 li，得到 Li preparo。',hint:'多个阳性名词对应 li；仍用原来的 preparo。',focus:'li',evidence:'controlled_production'
  },
  {
    id:'auto-objects-forms-12',lessonId:'auto-objects-forms',level:3,type:'text',
    prompt:'只把 le mele（苹果）换成代词，其余词语不变；写完整句子：Compro le mele.',
    answers:['Le compro.'],answerLabel:'Le compro.',explanation:'le mele 是阴性复数，改为 le，得到 Le compro。',hint:'先确定 le mele 的性与数，再把代词放在 compro 前。',focus:'le',evidence:'controlled_production'
  },

  {
    id:'auto-objects-context-01',lessonId:'auto-objects-context',level:1,type:'choice',
    prompt:'Bevi il tè?（你喝茶吗？）— Sì, ___ bevo.',choices:['le','la','lo','li'],
    answers:['lo'],answerLabel:'Sì, lo bevo.',explanation:'所指的是前一句的 il tè，阳性单数，因此用 lo。',hint:'先找到“喝什么”：il tè。',focus:'lo',evidence:'recognition'
  },
  {
    id:'auto-objects-context-02',lessonId:'auto-objects-context',level:1,type:'choice',
    prompt:'Leggi la mail?（你读这封邮件吗？）— Sì, ___ leggo.',choices:['la','li','lo','le'],
    answers:['la'],answerLabel:'Sì, la leggo.',explanation:'la mail 是阴性单数，回答用 la；leggo 说明动作由“我”完成。',hint:'回答中的代词指 la mail。',focus:'la',evidence:'recognition'
  },
  {
    id:'auto-objects-context-03',lessonId:'auto-objects-context',level:1,type:'choice',
    prompt:'Porti i documenti?（你带这些文件吗？）— Sì, ___ porto.',choices:['lo','la','le','li'],
    answers:['li'],answerLabel:'Sì, li porto.',explanation:'i documenti 是阳性复数，回答用 li，不随 porto 的第一人称单数变化。',hint:'动词的“我”不影响文件的阳性复数。',focus:'li',evidence:'recognition'
  },
  {
    id:'auto-objects-context-04',lessonId:'auto-objects-context',level:1,type:'choice',
    prompt:'Guardi le foto?（你看这些照片吗？）— Sì, ___ guardo.',choices:['li','le','la','lo'],
    answers:['le'],answerLabel:'Sì, le guardo.',explanation:'le foto 是阴性复数，回答用 le。foto 的词尾不随复数改变，要结合冠词判断。',hint:'冠词 le 比 foto 的词尾更直接地告诉你性与数。',focus:'le',evidence:'recognition'
  },
  {
    id:'auto-objects-context-05',lessonId:'auto-objects-context',level:2,type:'text',
    prompt:'Il biglietto è sul tavolo.（票在桌上。）___ prendo. 只填代词，意思是“我把它拿走”。',
    answers:['lo'],answerLabel:'Lo prendo.',explanation:'代词指 il biglietto，阳性单数，用 lo。',hint:'找前一句中的 il biglietto，不要看 tavolo。',focus:'lo',evidence:'controlled_production'
  },
  {
    id:'auto-objects-context-06',lessonId:'auto-objects-context',level:2,type:'text',
    prompt:'La pizza è pronta.（披萨做好了。）___ porto al tavolo. 只填代词，意思是“我把它端到桌上”。',
    answers:['la'],answerLabel:'La porto al tavolo.',explanation:'要端的是 la pizza，阴性单数，用 la。',hint:'al tavolo 说明送到哪里；宾语是前一句的披萨。',focus:'la',evidence:'controlled_production'
  },
  {
    id:'auto-objects-context-07',lessonId:'auto-objects-context',level:2,type:'text',
    prompt:'I pomodori sono freschi.（番茄很新鲜。）___ compro. 只填代词，意思是“我买它们”。',
    answers:['li'],answerLabel:'Li compro.',explanation:'i pomodori 是阳性复数，所指不变，用 li。',hint:'这里买的是多个番茄：i pomodori。',focus:'li',evidence:'controlled_production'
  },
  {
    id:'auto-objects-context-08',lessonId:'auto-objects-context',level:2,type:'text',
    prompt:'Le bottiglie sono vuote.（瓶子空了。）___ porto in cucina. 只填代词，意思是“我把它们拿进厨房”。',
    answers:['le'],answerLabel:'Le porto in cucina.',explanation:'代词指 le bottiglie，阴性复数，用 le；in cucina 只是说明去向。',hint:'代词代替瓶子，不代替厨房。',focus:'le',evidence:'controlled_production'
  },
  {
    id:'auto-objects-context-09',lessonId:'auto-objects-context',level:3,type:'text',
    prompt:'把回答里的 il caffè 换成代词，保留 Sì 和原来的动词；只写修改后的完整回答：— Prendi il caffè? — Sì, prendo il caffè.',
    answers:['Sì, lo prendo.'],answerLabel:'Sì, lo prendo.',explanation:'il caffè 是阳性单数，用 lo。保留 Sì 和 prendo，得到 Sì, lo prendo。',hint:'回答框架是“Sì, 代词 + prendo”。',focus:'lo',evidence:'controlled_production'
  },
  {
    id:'auto-objects-context-10',lessonId:'auto-objects-context',level:3,type:'text',
    prompt:'把回答里的 la ricevuta（收据）换成代词，保留 Sì 和原来的动词；只写修改后的完整回答：— Conservi la ricevuta? — Sì, conservo la ricevuta.',
    answers:['Sì, la conservo.'],answerLabel:'Sì, la conservo.',explanation:'la ricevuta 是阴性单数，用 la，放在 conservo 前。',hint:'只替换回答里重复的收据，保留 conservo。',focus:'la',evidence:'controlled_production'
  },
  {
    id:'auto-objects-context-11',lessonId:'auto-objects-context',level:3,type:'text',
    prompt:'把回答里的 i prezzi（价格）换成代词，保留 Sì 和原来的动词；只写修改后的完整回答：— Controlli i prezzi? — Sì, controllo i prezzi.',
    answers:['Sì, li controllo.'],answerLabel:'Sì, li controllo.',explanation:'i prezzi 是阳性复数，用 li，放在 controllo 前。',hint:'价格在这里是阳性复数；完整回答仍以 Sì 开头。',focus:'li',evidence:'controlled_production'
  },
  {
    id:'auto-objects-context-12',lessonId:'auto-objects-context',level:3,type:'text',
    prompt:'把回答里的 le tazze（杯子）换成代词，保留 Sì 和原来的动词；只写修改后的完整回答：— Pulisci le tazze? — Sì, pulisco le tazze.',
    answers:['Sì, le pulisco.'],answerLabel:'Sì, le pulisco.',explanation:'le tazze 是阴性复数，用 le；回答中保留已经给出的 pulisco。',hint:'不要把 pulisco 换成问题里的 pulisci；这里只练替换宾语。',focus:'le',evidence:'controlled_production'
  },

  {
    id:'auto-objects-negative-01',lessonId:'auto-objects-negative',level:1,type:'choice',
    prompt:'Non trovo il portafoglio.（我找不到钱包。）→ Non ___ trovo.',choices:['lo','le','li','la'],
    answers:['lo'],answerLabel:'Non lo trovo.',explanation:'il portafoglio 是阳性单数，用 lo；non 放在 lo 前。',hint:'否定不改变钱包的性与数。',focus:'lo',evidence:'recognition'
  },
  {
    id:'auto-objects-negative-02',lessonId:'auto-objects-negative',level:1,type:'choice',
    prompt:'Non prendo la macchina.（我不开车去。）→ Non ___ prendo.',choices:['le','li','lo','la'],
    answers:['la'],answerLabel:'Non la prendo.',explanation:'la macchina 是阴性单数，用 la；顺序是 Non la prendo。',hint:'保留 non 和 prendo，中间放指汽车的代词。',focus:'la',evidence:'recognition'
  },
  {
    id:'auto-objects-negative-03',lessonId:'auto-objects-negative',level:1,type:'choice',
    prompt:'Non vedo i colleghi.（我没看到这些同事。）→ Non ___ vedo.',choices:['la','li','le','lo'],
    answers:['li'],answerLabel:'Non li vedo.',explanation:'i colleghi 是阳性复数，直接宾语代词用 li；本句仍是现在时。',hint:'代词也可以指人；这里的名词是阳性复数。',focus:'li',evidence:'recognition'
  },
  {
    id:'auto-objects-negative-04',lessonId:'auto-objects-negative',level:1,type:'choice',
    prompt:'Non compro le fragole.（我不买草莓。）→ Non ___ compro.',choices:['li','lo','le','la'],
    answers:['le'],answerLabel:'Non le compro.',explanation:'le fragole 是阴性复数，用 le；否定句的顺序是 Non le compro。',hint:'多颗草莓是阴性复数；non 已经在正确的位置。',focus:'le',evidence:'recognition'
  },
  {
    id:'auto-objects-negative-05',lessonId:'auto-objects-negative',level:2,type:'text',
    prompt:'Il computer è spento.（电脑关着。）Non ___ tocco. 只填代词，意思是“我不碰它”。',
    answers:['lo'],answerLabel:'Non lo tocco.',explanation:'代词指 il computer，阳性单数，因此是 Non lo tocco。',hint:'computer 虽然不以 -o 结尾，但冠词 il 说明它是阳性单数。',focus:'lo',evidence:'controlled_production'
  },
  {
    id:'auto-objects-negative-06',lessonId:'auto-objects-negative',level:2,type:'text',
    prompt:'La risposta è difficile.（这个回答很难懂。）Non ___ capisco. 只填代词，意思是“我不理解它”。',
    answers:['la'],answerLabel:'Non la capisco.',explanation:'la risposta 是阴性单数，用 la；non 在代词前。',hint:'capisco 的宾语是前一句中的回答。',focus:'la',evidence:'controlled_production'
  },
  {
    id:'auto-objects-negative-07',lessonId:'auto-objects-negative',level:2,type:'text',
    prompt:'I guanti sono qui.（手套就在这里。）Non ___ cerco. 只填代词，意思是“我不找它们”。',
    answers:['li'],answerLabel:'Non li cerco.',explanation:'i guanti 是阳性复数，用 li；句子仍按 non + 代词 + 动词排列。',hint:'这里的手套是阳性复数，不是一个单数物品。',focus:'li',evidence:'controlled_production'
  },
  {
    id:'auto-objects-negative-08',lessonId:'auto-objects-negative',level:2,type:'text',
    prompt:'Le scarpe sono sporche.（鞋子脏了。）Non ___ metto. 只填代词，意思是“我不穿它们”。',
    answers:['le'],answerLabel:'Non le metto.',explanation:'le scarpe 是阴性复数，用 le，得到 Non le metto。',hint:'代词指 le scarpe；metto 已经给出，不需要另作变位。',focus:'le',evidence:'controlled_production'
  },
  {
    id:'auto-objects-negative-09',lessonId:'auto-objects-negative',level:3,type:'text',
    prompt:'只把 il pesce（鱼）换成代词，保留 Non 和原来的动词；写完整句子：Non mangio il pesce.',
    answers:['Non lo mangio.'],answerLabel:'Non lo mangio.',explanation:'il pesce 是阳性单数，用 lo。按 Non + lo + mangio 排列。',hint:'non 必须在代词前面，不能漏掉。',focus:'lo',evidence:'controlled_production'
  },
  {
    id:'auto-objects-negative-10',lessonId:'auto-objects-negative',level:3,type:'text',
    prompt:'只把 la strada（路）换成代词，保留 Non 和原来的动词；写完整句子：Non conosco la strada.',
    answers:['Non la conosco.'],answerLabel:'Non la conosco.',explanation:'la strada 是阴性单数，用 la；完整句子是 Non la conosco。',hint:'用“Non + 阴性单数代词 + conosco”。',focus:'la',evidence:'controlled_production'
  },
  {
    id:'auto-objects-negative-11',lessonId:'auto-objects-negative',level:3,type:'text',
    prompt:'只把 i libri（书）换成代词，保留 Non 和原来的动词；写完整句子：Non vendo i libri.',
    answers:['Non li vendo.'],answerLabel:'Non li vendo.',explanation:'i libri 是阳性复数，用 li；完整句子是 Non li vendo。',hint:'保留 vendo，只把多个阳性宾语换成代词并前移。',focus:'li',evidence:'controlled_production'
  },
  {
    id:'auto-objects-negative-12',lessonId:'auto-objects-negative',level:3,type:'text',
    prompt:'只把 le verdure（蔬菜）换成代词，保留 Non 和原来的动词；写完整句子：Non preparo le verdure.',
    answers:['Non le preparo.'],answerLabel:'Non le preparo.',explanation:'le verdure 是阴性复数，用 le；完整句子是 Non le preparo。',hint:'顺序是 Non，然后是代词，最后是 preparo。',focus:'le',evidence:'controlled_production'
  }
];
