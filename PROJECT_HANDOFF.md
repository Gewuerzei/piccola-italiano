# PROJECT_HANDOFF · Piccola Italiano v0.7.1

**仓库：** `Gewuerzei/piccola-italiano`，独立于 Cassola 的 `Gewuerzei/-Piccola`。  
**线上地址：** https://gewuerzei.github.io/piccola-italiano/  
**当前应用版本：** `0.7.1` · **离线缓存：** `piccola-italiano-v0071`。

**施工必读：** [AGENTS.md](AGENTS.md)（行为、安全、测试） → 本文件（实时交接） → [CHANGELOG.md](CHANGELOG.md)（历史） → 读取当前 `main` 源码。禁止凭此文档假定远端代码没有变化。

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
- `sw.js`：Service Worker（`piccola-italiano-v0071`）；`manifest.webmanifest`、`icons/`：安装资源。

**加载顺序：** `content → mission → adventure → bank → archaeology → excavation → codex → chancery → app`。以当前 `index.html` 为最终准据；缓存列表须同步。

## 数据模型与安全

- IndexedDB database `piccola-italiano` / object store `data` / key `state` / schemaVersion `1`；失败时可能回退至 localStorage。
- 原有学习结构含自建词条、记忆进度、错误记录、练习尝试、会话、驾考任务、自定义导入题库、剧情进度、谜题进度及显示设置。
- `state.chancery` 为扩展字段：`cases` + `logs`。每宗卷宗保存已经查看的证据、证词、已完成的条款解码与首次裁决。统计由首次裁决计算，不能反复刷分。
- `state.mysteries.inferences` 保存词根推理记录；新增内容不可清空原有 `mysteries`、`adventure`、`mission` 或 `progress`。
- 备份 JSON 合并不得用较旧状态覆盖当前更完整的本地记录；未满足前置条件的外来裁决不得直接当作完成。
- 目前没有学习记录的云同步功能。静态网页代码公开不代表个人学习数据公开；但用户自行提交个人备份到公开仓库则会泄露。
- **禁止删除或初始化学习数据来修问题。** 切换缓存版本也不应触及 IndexedDB/localStorage。

## 已实现的可见功能

- 生活互动剧情、语言卡片、复习、关联知识库和 Codex 外观主题。
- 36份词源档案、9宗词源谜题、12道输入式词根挑战。
- 6宗城邦文书院调查案件：每宗4份物证、3份证词、2道条款释读题、3种判决。
- 14天驾考任务与独立的题库文件导入入口。原有驾考示例题 **不是** 官方题库。

## 当前限制与后续验收

1. 官方驾考题库的原始 TXT 解析、实际版本和题数，**尚未通过真实文件验证**。不允许做出官方题库已导入的承诺。
2. 已做过源码语法/模拟流程验收，但不能据此断言 iPhone Safari 的语音、离线更新、存储持久化与全部触控交互已经验收。
3. 外部词典链接依赖联网；内置的原创词源解释和主要应用资源可通过 PWA 缓存离线访问（须先在线装载成功）。
4. 非代码型文书维护不需要提升应用版本或 Service Worker 缓存编号。
5. 如果新任务与本文件冲突，以用户明确要求及经过检查的最新仓库代码为准。

## 交接小抄

施工前：读规则 → 读本文件 → 读变更史 → 检查 main。  
施工后：语法/交互验收 → 确认构建部署 → 写 CHANGELOG（代码变化）→ 更新交接（实际变化）。  
**不要把历史更新明细反复追加到本文件；历史归 CHANGELOG。**
