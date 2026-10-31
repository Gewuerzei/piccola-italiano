# Piccola Italiano · 完整课程骨架

本文件把已有知识地图落实为可以分批填充的课程目录。**40 个稳定单元覆盖五层知识，当前只有 3 个单元具备本轮自动教学内容，共 3 节微课、36 道原创题。** 其余 37 个单元保留明确目标和先修关系，标记为 `planned`。这些状态不表示用户已经学过，也不表示整套课程已经发布完成。

实际目录与题目以 [course-data.js](course-data.js) 为准；总体原则承接 [LEARNING_ARCHITECTURE.md](LEARNING_ARCHITECTURE.md)。本文件不替代发布记录，也不为已有模块补写未经验证的能力证明。

## 课程边界

- 五层分别为基础骨架、生活自主、连贯组织、逻辑精度、语言系统；层数描述知识结构，不等于 CEFR 等级。
- `core` 是现代意大利语主线，共 34 个单元；`explore` 是自选的历史、拉丁语和跨语探索，共 6 个单元。现代意大利语单元不依赖探索单元。
- 拉丁语旁注可从任意学习阶段打开，不要求先学完 L1–L4。它在目录中归入 L5 是因为内容性质，不是访问门槛；已有词源、卷宗与比较实验室保持各自入口。
- `prereq` 表示内容依赖，帮助解释先学什么；**不直接充当已掌握证明或强制通关锁**。前三节已备好的微课可以直接开始，其先修尚未编成自动课时，应提供说明或复习入口，不能把入口锁死。
- 课程目录通过 `nodeRefs` 连接原有全部 25 个地图节点，不改名、不替换原 ID，也不迁移这些节点关联的学习记录。
- 历史材料必须区分已核实史料与原创虚构故事；新增比较内容须核对来源。目录中的未来目标不是来源核实已经完成的声明。
- 驾考支线练的是语言和逻辑。自编题不得标成官方题库，也不把语言答题结果当作法律判断或考试通过预测。

## 五层目录

表中的先修 ID 均对应本目录的稳定单元。每个目标的可操作说明保存在 `COURSE_UNITS.objective`；所有未标为“已备好”的单元均为规划内容。

### L1 · Fondamenta：基础骨架（8 单元）

| 稳定 ID | 单元与可观察目标 | 先修单元 |
| --- | --- | --- |
| `it-sentence-core` | 简单句：识别谁、动作和对象，按给定词语组句 | 无 |
| `it-nouns-articles` | 名词和冠词：结合语境识别性与数，完成有限一致变化 | `it-sentence-core` |
| `it-present-basics` | 现在时：用常用动词、essere、avere 表达状态和动作 | `it-sentence-core` |
| `it-questions-negation` | 提问与否定：理解疑问词，把给定句改成否定句 | `it-present-basics` |
| `it-time-routines` | 时间与安排：说明什么时候、多久一次做什么 | `it-present-basics` |
| `it-places-prepositions` | 地点与介词：区分位置、方向和基础介词关系 | `it-sentence-core`、`it-present-basics` |
| `it-needs-quantities` | 需要与数量：说明需要多少、是否足够 | `it-nouns-articles`、`it-present-basics` |
| `it-purpose-requests` | 来意与请求：提出明确请求，问出必要信息 | `it-present-basics`、`it-questions-negation` |

### L2 · Autonomia：生活自主（11 单元）

| 稳定 ID | 单元与可观察目标 | 先修单元 |
| --- | --- | --- |
| `it-past-complete` | 过去事件：结合时间线索使用复合过去时 | `it-present-basics`、`it-time-routines` |
| `it-past-background` | 过去背景：区分背景、习惯和已完成事件 | `it-past-complete` |
| `it-objects-forms` | **已备好** · 直接宾语代词：按性与数选择和替换 | `it-nouns-articles`、`it-present-basics` |
| `it-objects-context` | **已备好** · 对话指代：从上文找对象，完成短回答 | `it-objects-forms` |
| `it-objects-negative` | **已备好** · 否定顺序：写出 non + 代词 + 动词 | `it-objects-context`、`it-questions-negation` |
| `it-modal-actions` | 情态动词：表达想做、能做、必须做及合适代词位置 | `it-purpose-requests`、`it-objects-context` |
| `it-polite-requests` | 礼貌条件式：请求、确认与情境选择 | `it-purpose-requests` |
| `it-shortages` | 缺少与替代：报告 manca / mancano 的对象和数量 | `it-needs-quantities` |
| `it-people-datives` | 间接宾语：区分“谁/什么”与“给谁/向谁” | `it-objects-negative`、`it-polite-requests` |
| `it-reflexive-routines` | 自反动词：说明一个人一天的安排 | `it-present-basics`、`it-time-routines` |
| `it-everyday-interaction` | 办事短对话：完成请求、确认和结束三个步骤 | `it-polite-requests`、`it-objects-negative`、`it-time-routines` |

### L3 · Connessioni：连贯组织（8 单元）

| 稳定 ID | 单元与可观察目标 | 先修单元 |
| --- | --- | --- |
| `it-relative-che` | 关系从句：识别修饰对象，用 che 合并给定句 | `it-objects-context` |
| `it-reference-tracking` | 指代链：跟踪名词、代词、关系词及歧义 | `it-relative-che`、`it-objects-negative` |
| `it-cause-result` | 原因与结果：连接事实、理由、后果和转折 | `it-past-complete` |
| `it-connected-narration` | 短叙事：交代背景、事件和结果 | `it-past-background`、`it-cause-result` |
| `it-work-report` | 工作报告：说明现状、问题、影响和下一步 | `it-shortages`、`it-cause-result` |
| `it-shift-negotiation` | 时间协商：解释限制、提出替代并确认 | `it-polite-requests`、`it-cause-result`、`it-time-routines` |
| `it-repair-circumlocution` | 忘词修复：绕述用途、外观或类别并追问 | `it-everyday-interaction`、`it-relative-che` |
| `it-reading-summaries` | 通知复述：提取对象、时间、要求和原因 | `it-reference-tracking`、`it-cause-result` |

### L4 · Precisione：逻辑精度（6 单元）

| 稳定 ID | 单元与可观察目标 | 先修单元 |
| --- | --- | --- |
| `it-subjunctive-intro` | 虚拟式：在选定结构中理解态度与愿望 | `it-relative-che`、`it-cause-result` |
| `it-exceptions-scope` | 范围与例外：辨认规则及适用边界 | `it-cause-result`、`it-reading-summaries` |
| `it-conditions-logics` | 条件与假设：区分限定条件和反事实 | `it-subjunctive-intro`、`it-past-background` |
| `it-consequences-meaning` | 行为与后果：从原创文本找出触发条件和结果 | `it-exceptions-scope`、`it-cause-result` |
| `it-traffic-language` | 驾考语言：理解义务、允许、限制和例外 | `it-exceptions-scope`、`it-conditions-logics` |
| `it-register-precision` | 精确表达：调整指代、限定与礼貌，保留原意 | `it-reading-summaries`、`it-consequences-meaning` |

### L5 · Metalinguaggio：语言系统（7 单元）

| 稳定 ID | 单元与可观察目标 | 先修单元 |
| --- | --- | --- |
| `it-word-formation` | 主线辅助：分析词素、提出猜测并用语境核对 | `it-present-basics` |
| `explore-semantic-history` | 自选：比较历史词义与现代用法 | `it-word-formation` |
| `explore-latin-companion` | 自选：随时打开的拉丁语形式与词源旁注 | 无 |
| `explore-historical-sounds` | 自选：比较音变、例外与重建读音 | `explore-latin-companion`、`it-word-formation` |
| `explore-documents` | 自选：分清历史文书、语体和虚构卷宗 | `it-register-precision`、`explore-semantic-history` |
| `explore-romance-comparison` | 自选：比较同源词、借词和假朋友 | `explore-historical-sounds`、`explore-semantic-history` |
| `explore-grammar-comparison` | 自选：解释语法的功能相似与结构不等价 | `it-subjunctive-intro`、`explore-semantic-history` |

## 首批微课：把一个教学环节做完整

| 顺序 | 稳定课 ID | 本课重点 | 当前题库 |
| --- | --- | --- | --- |
| 1 | `auto-objects-forms` | 名词性与数 → 选择代词 → 替换明确宾语 | 12 题 |
| 2 | `auto-objects-context` | 从上句找前项 → 在短回答中使用代词 | 12 题 |
| 3 | `auto-objects-negative` | 保持指代 → non + 代词 + 变位动词 | 12 题 |

每课三个题目档位各 4 题，每档分别覆盖 `lo`、`la`、`li`、`le`。36 道题均为原创；例句只使用现在时。第一批不引入过去分词一致、省音、间接宾语、敬称 La、代词连用或情态动词后的双位置选择。冠词已经明确性与数的常用名词可以出现，不把词尾猜测当成可靠规则。

1. `level: 1` 是有选项的识别题，`evidence: 'recognition'`。
2. `level: 2` 是只填一个代词的文本题，`evidence: 'controlled_production'`。
3. `level: 3` 是按照明确要求改写完整短句，仍标为 `controlled_production`。

题目档位是本题库的支架差异，不是个人水平。全句题明确规定“只替换给出的宾语，保留其他词”，因此可以使用规范化字符串匹配。它们没有宣称能理解任意自由回答；未来自由表达必须采用适合的评价方式，不能直接沿用这套有限答案表。

题库的 36 题是可选池，并不要求一轮全部做完。教学引擎可根据本轮表现挑选题目，但应保证有界的结束、暂停续做和针对性反馈。提示后的正确回答需要保留“用了提示”的事实，不应与无提示回答混为同一证据。

## 能力证据约定

| 能力与证据 | 首批微课能说明什么 | 后续需要什么 |
| --- | --- | --- |
| 选择识别 | 在给定选项与明确前项下识别代词 | 更换语境、间隔后再观察 |
| 受限书面产出 | 按指定结构填写代词、改写短句 | 增加不同人物、语境和任务，注明约束 |
| 自由书面产出 | **未测量**；完整改写题也不等于自由写作 | 自主组织内容的任务及可解释评价；自评须标为自评 |
| 听力理解 | **未测量**；读出文字或播放音频本身不是听懂的证据 | 有可用音频且不泄露文字答案的独立理解任务 |
| 口头产出与互动 | **未测量**；文本正确不证明说得出来 | 实际口头任务、明确观察方法和设备能力说明 |
| 延迟保持 | 本轮重复只说明练习表现 | 带时间间隔的不同例子，不由 XP 或访问次数推断 |
| 跨语迁移与历史分析 | 当前自动微课**未测量** | 有来源的材料、新语境和说明不等价关系的任务 |

未来 `planned` 单元具备内容后也应沿用这些区分。L1/L2 的词形选择和受限改写、L3 的通知理解和连贯表达、L4 的范围与条件解释、L5 的材料比较都需要各自合适的任务证据；不能仅因一个单元的选择题正确，就把整个单元标为独立掌握。任何层的听力与口语在未实际观察前均保持“未测量”。

## 数据契约与维护

- `COURSE_UNITS`：`id`、`layer`、`title`、`prereq`、`nodeRefs`、`objective`、`track`、`status`、`lessonIds`。
- `AUTO_LESSONS`：`id`、`unitId`、`title`、`goal`、`explanation`、`example: {it, zh}`、`order`。
- `AUTO_QUESTIONS`：`id`、`lessonId`、`level`、`type`、`prompt`、可选 `choices`、`answers`、`answerLabel`、`explanation`、`hint`、`focus`、`evidence`。
- `answers` 是允许提交的文本；`answerLabel` 是反馈中展示的参考答案。填空题的 `answers` 只有代词，`answerLabel` 可以展示补全的整句，二者用途不能混淆。
- `focus` 用于选择练习和汇总本轮证据，不应在用户作答前作为“答案标签”展示。
- 规范化可以忽略首尾空白、无关的大小写和末尾标点；不能随意删掉词语或调整词序，从而接受漏掉 `non` 等改变原意的答案。
- 已发布 ID 保持稳定。扩充时新增单元、微课和题目 ID，不把旧 ID 改成另一个知识目标，也不通过清空本机数据解决内容更新。
- `ready` 单元必须列出真实微课，每课和每题的反向引用必须一致；`planned` 单元当前 `lessonIds` 为空。
- 发布前校验 ID 唯一、所有引用可解析、先修无环、原有 25 节点均被保留引用，以及每课 3 档 × 4 个代词的题目分布。

这两个新增文件只定义课程与教学内容，不读写学习状态。自动教学入口、评分规则、持久化和离线装载由相应运行模块负责，并需要独立验收。
