# AGENTS · Piccola Italiano

**源码是实际状态来源。** 任务仅针对 `Gewuerzei/piccola-italiano`；绝不访问或修改 Cassola 生产仓库 `Gewuerzei/-Piccola`。

## 先定范围，按需读取

1. 读取本文件与 PROJECT_HANDOFF 的当前摘要，确认远端 main 的实际版本与改动状态。
2. 产品方向和建设顺序见 PROJECT_PLAN；每轮确定一个批次的学习问题、文件边界与完成标准。
3. 纯课程内容任务只读 COURSE_AUTHORING、分配单元与对应内容文件；不必重读 app 全文、旧活动或全部版本历史。历史问题才查询 CHANGELOG 对应段落。
4. 引擎、存储、UI 或旧模块变更，读取对应源码和相关验收项；建设新的评价方式或跨语内容时读 LEARNING_ARCHITECTURE 对应原则。
5. 依照实际变更选择检查、整批发布、确认 Pages 成功。不要把“已提交”当成“部署成功”。

## 数据与内容边界

- 保留 IndexedDB `piccola-italiano` / store `data` / key `state` / schemaVersion 1，以及 fallback localStorage `piccola-italiano-state`。不得清空、覆盖或重建学习数据来修问题。
- 保留旧课题 ID、知识点、进度、自建词汇、错题、剧情、卷宗、测评和导入题库记录。确需迁移时定义向后兼容方案并验证保留结果。
- JSON 备份仅作可验证的非破坏性合并；不覆盖本机活动学习，不凭文件名判断题库真实性。
- 不将访问密钥、真实用户备份、私人会话等提交公共仓库。
- 未核对官方格式、版本和授权时，不称自编驾考练习为官方题库。
- 虚构城邦故事不可冒充史料；不镜像或大段复制第三方词典。历史/词源/比较内容要核对来源与不确定性。
- 识别、受限产出、自由表达、自评、听力与口语分别说明。完成次数、XP 或题目档位不证明 CEFR 等级。

## 模块职责

- `course-data.js` / `course-foundations.js` / `course-connected.js`：纯课程对象与题库，不读写 state、DOM、存储或网络。
- `auto.js`：选择、判定、辅助证据、续做、备份验证、复习与系统朗读。扩充已有题型的内容时保持稳定。
- `auto-view.js` / `auto.css`：从统一字段渲染主线界面；不为某课写专属判分逻辑。
- `app.js`：应用入口、全局保存与导航。保持教学模块接入点小，app 必须最后加载。
- 旧模块独立保留，仅在任务涉及它们时深入修改。

**装载顺序：** `content → mission → adventure → bank → archaeology → excavation → codex → chancery → vivo → curriculum → placement → pathway → bridges → transfer → course-data → course-foundations → course-connected → auto → auto-view → app`。以 index.html 为准，资源与 sw.js 同步。

## 验收与发布

- `node scripts/check.cjs` 为统一入口；按当前改动选择内容或完整检查。
- 纯教材增补：`node scripts/check.cjs content` 加交叉语言审校。检查 ID、引用、先修、三档四学习点覆盖、答案格式和朗读文本。无需人工重走不相关的旧活动。
- 引擎、存储、导航、加载关系或综合运行变更：`node scripts/check.cjs full`，包含教学、连续性/导入/混合复习与旧功能自动回归。必要时检查实际改变的浏览器路径。
- 所有运行发布检查 app 版本和 SW 缓存版本、脚本/样式资源一致性；代码或教材有变化需要更新资源版本。纯文档修改不升级缓存。
- 旧功能自动回归覆盖数据保留、导航/主题、知识图、缺语音回退、词源返回、卷宗纠错/防重复、Vivo四模式、定位适应/跳过/续做、自评报告、备份和导出。保持这些可重复执行的检查，避免每轮手工重查整个应用。
- Pages 使用 main / root；确认 workflow `completed / success`，再验证受影响的线上主线。浏览器模拟不等于真实 iPhone Safari/PWA 验收；未测的离线、语音或设备行为如实标注。

## 文书职责

- README：现在是什么、怎么使用。
- PROJECT_PLAN：产品方向、后续顺序、完成标准。
- COURSE_BLUEPRINT：40 单元结构和知识目标。
- COURSE_AUTHORING：内容作者最小契约。
- PROJECT_HANDOFF：当前运行状态、边界、风险及验证证据；不堆版本历史。
- CHANGELOG：历史事实。
- DEPLOY_GITHUB：发布和设备验收操作。

文书与源码冲突时先检查源码；不要为匹配旧文书修改正确实现。
