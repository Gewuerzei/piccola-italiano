# PROJECT_HANDOFF · Piccola Italiano v0.12.0

**仓库：** `Gewuerzei/piccola-italiano`，独立于 Cassola 的 `Gewuerzei/-Piccola`。  
**线上地址：** https://gewuerzei.github.io/piccola-italiano/  
**当前应用版本：** `0.12.0` · **离线缓存：** `piccola-italiano-v0120`。

**施工必读：** [AGENTS.md](AGENTS.md)（行为、安全、测试） → 本文件（实时交接） → [CHANGELOG.md](CHANGELOG.md)（历史） → 读取当前 `main` 源码。禁止凭此文档假定远端代码没有变化。

## 教学架构（S1地图 + S2轻量能力定位）

- [LEARNING_ARCHITECTURE.md](LEARNING_ARCHITECTURE.md) 定义五层知识、能力证据、价值分类及分期路线。
- v0.9.0 已编写25个只读知识节点与先修网络、知识卡连接和Latino in tasca发音示例。`curriculumValidate` 对节点ID、先修循环、教材/练习引用做了校验。
- 地图本身不判定个人能力；v0.10新增可跳过的探索式定位：三方向各4道选择题、按答题表现调节难度，以及一项写作自评。它只是未经心理测量学校准的小规模任务观察，**不是** CEFR 评级，也不能推断真实口语或听力。
- 实现了暂停续做、本地保存最近8轮结果以及非破坏性备份合并；自由写作原文只用于本轮屏幕自评，不保存或上传。
- 下一阶段先由用户验收 v0.9 地图与 v0.10 测评的 iPhone 实机表现，继续完善 S3 可解释的学习建议与 S4 比较语言课程，不以此测评宣称完整掌握程度。

## 当前结构

- `index.html`：页面、脚本装载次序。
- `styles.css`：整体布局、响应式 UI、Codex 羊皮纸与 Cancelleria 文书院界面。
- `app.js`：主页面、知识种子集成、IndexedDB/localStorage 持久化、备份合并、UI 操作及程序初始化。
- `content.js`：生活/驾考语言教材、场景与自编练习。
- `mission.js`：14天驾考计划、示例题、模拟计时逻辑。
- `bank.js`：保守的题库导入与解析；**MIT 原始 TXT 未经过实际完整导入验证**。
- `adventure.js`：生活情景分支冒险。
- `archaeology.js`：最初词源档案与词源谜题。
- `excavation.js`：后续词源档案、谜题与12关输入式词根挑战。
- `codex.js`：中古文书词源和三宗卷轴案件。
- `chancery.js`：六宗虚构城邦案件、证据/证人、条款填词、首次裁决及本地记录。
- `vivo.js` / `vivo.css`：Italiano Vivo 四类原创离线训练，30道题（12对话、6忘词解释、6语法纠错、6词根反推）；独立首次通关记录、参考答案与自评。
- `curriculum.js` / `curriculum.css`：25个节点的五层知识地图、先修链接与教材入口、IPA/拉丁语声音示例。无成绩写入。
- `placement.js` / `placement.css`：文书院可选定位、15道自编题池（每方向5级各1题）、每次12道适应性选择题 + 1项自由写作自评、分方向观察报告。
- `pathway.js` / `pathway.css`：只读个人学习建议，结合先修节点、课程实用性及最近有限测评证据；不修改成绩或复习安排。
- `bridges.js` / `bridges.css`：只读罗曼语对照，3组同源词和1组功能相近但非同源的必要性句型；标准现代语音依赖设备可用voice，拉丁语仅展示重建IPA。
- `sw.js`：Service Worker（`piccola-italiano-v0120`）；`manifest.webmanifest`、`icons/`：安装资源。

**加载顺序：** `content → mission → adventure → bank → archaeology → excavation → codex → chancery → vivo → curriculum → placement → pathway → bridges → app`。以当前 `index.html` 为最终准据；缓存列表须同步。

## 数据模型与安全

- IndexedDB database `piccola-italiano` / object store `data` / key `state` / schemaVersion `1`；失败时可能回退至 localStorage。
- 原有学习结构含自建词条、记忆进度、错误记录、练习尝试、会话、驾考任务、自定义导入题库、剧情进度、谜题进度及显示设置。
- `state.placement` 是可选新增字段：`{active,history}`；活动中的答题进度本机持久化，完成记录最多保留8轮。JSON备份合并仅导入经过基本校验的已完成记录，绝不覆盖本机未完成测评，也不保存写作原文。**原有学习成绩、XP和复习安排完全独立。**
- `state.vivo` 为扩展字段，`records` + `logs`，每个题目第一次通过才增加进度；自由表达是参考样例后自评，填词是规范化严格匹配。旧的 JSON 备份导入可保守合并 vivo 进度；不改变 schemaVersion 1。
- `state.chancery` 为扩展字段：`cases` + `logs`。每宗卷宗保存已经查看的证据、证词、已完成的条款解码与首次裁决。统计由首次裁决计算，不能反复刷分。
- `state.mysteries.inferences` 保存词根推理记录；新增内容不可清空原有 `mysteries`、`adventure`、`mission` 或 `progress`。
- 备份 JSON 合并不得用较旧状态覆盖当前更完整的本地记录；未满足前置条件的外来裁决不得直接当作完成。
- 目前没有学习记录的云同步功能。静态网页代码公开不代表个人学习数据公开；但用户自行提交个人备份到公开仓库则会泄露。
- **禁止删除或初始化学习数据来修问题。** 切换缓存版本也不应触及 IndexedDB/localStorage。

## 已实现的可见功能

- 生活互动剧情、语言卡片、复习、关联知识库和 Codex 外观主题。
- 36份词源档案、9宗词源谜题、12道输入式词根挑战。
- 五层只读知识地图（每层5个节点），包含先修关系、原有课程链接及历史发音演变示范。
- 新增城邦书记官能力定位：阅读/语法/词汇三方向独立采样、写作范例自评、可跳题/暂停/重测；报告必须显示不确定性和未测量的口语、听力。
- 6宗城邦文书院调查案件：每宗4份物证、3份证词、2道条款释读题、3种判决。
- Italiano Vivo 四种离线训练：NPC对话（固定剧情 + 用户自由回复，自评）、绕词解释（禁词表达，自评）、语法侦探（输入单词）、词根反推（输入单词），共30题。
- 14天驾考任务与独立的题库文件导入入口。原有驾考示例题 **不是** 官方题库。

- v0.11已新增可解释的五项学习建议和知识地图跳转；仍属启发式排序，非CEFR能力评级。

- v0.12新增可选跨语言实验室；比较例子有外部参考入口，但尚未经完整学术来源逐项审定。

## 当前限制与后续验收

1. 官方驾考题库的原始 TXT 解析、实际版本和题数，**尚未通过真实文件验证**。不允许做出官方题库已导入的承诺。
2. 已做过源码语法/模拟流程验收，但不能据此断言 iPhone Safari 的语音、离线更新、存储持久化与全部触控交互已经验收。Italiano Vivo 不是AI批改，自由表达的理解和语法需学习者自己判断。v0.9地图及v0.10测评在iPhone的实机触控、续做、存储、语音及离线缓存仍待验证。
3. 外部词典链接依赖联网；内置的原创词源解释和主要应用资源可通过 PWA 缓存离线访问（须先在线装载成功）。
4. 非代码型文书维护不需要提升应用版本或 Service Worker 缓存编号。
5. 如果新任务与本文件冲突，以用户明确要求及经过检查的最新仓库代码为准。

## 交接小抄

施工前：读规则 → 读本文件 → 读变更史 → 检查 main。  
施工后：语法/交互验收 → 确认构建部署 → 写 CHANGELOG（代码变化）→ 更新交接（实际变化）。  
**不要把历史更新明细反复追加到本文件；历史归 CHANGELOG。**
