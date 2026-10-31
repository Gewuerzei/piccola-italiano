# PROJECT_HANDOFF · Piccola Italiano v0.15.0

**仓库：** `Gewuerzei/piccola-italiano`，与 Cassola 的 `Gewuerzei/-Piccola` 完全独立。
**应用：** https://gewuerzei.github.io/piccola-italiano/
**运行版本：** `0.15.0` · **缓存：** `piccola-italiano-v0151` · **数据 schema：** `1`。

源码是实际状态来源。施工先确认远端 main，再按改动范围读相关文件；不要每轮重读所有模块和全部版本历史。

## 当前重点

产品方向见 [PROJECT_PLAN.md](PROJECT_PLAN.md)：默认打开即继续学习，围绕日常意大利语的一条主线推进。课程、引擎、界面边界已分开；下一批优先实现一个完整的听辨与情境表达场景，再丰富主线练习，之后扩展高阶与语言探索。

- 固定 40 个单元（34 主线、6 探索），保留原知识图全部 25 个节点。L1–L3 的 27 个单元已提供起始微课，共 324 道原创题；L4–L5 的 13 个单元仍 planned。微课可用不表示整层语言能力训练已齐备。
- 每课四个具名学习点，三个档位各覆盖一次；每轮八道不同题。识别、受限填空/改写分别记录；提示和自动例句都是辅助证据。连续卡住给支撑，连续无辅助答对提高题目档位。
- 一次薄弱表现最多建议立即重练一次；整课回顾间隔为启发式 1–2 天。新用户从基础句开始；旧代词学习者接着原路线，不强制重头再来。目录允许自行选择起点，先修不是硬锁。
- 混合复习从已练课中最近答错、跳过或需要提示的学习点选八题，优先未出现的同类题，不足以已练课其他题补足。保存固定题目队列，可暂停续做；不把零散复习算成完成整课。
- 首页仍有一个主要学习按钮，旧活动保留在折叠探索区及原导航。课程目录为五层紧凑折叠列表。
- 例句和答后表达可手动调用可用的意大利语系统语音；不自动播放，不写入成绩，缺少声音可继续文字练习。

## 按任务找文件

| 任务 | 入口 | 不需要重读 |
| --- | --- | --- |
| 填充或修订现有题型课程 | COURSE_AUTHORING、分配单元及相应 course 文件 | app 全文、旧活动、完整 CHANGELOG |
| 修改教学选题/续做/复习 | auto.js、tests/auto.cjs、tests/continuity.cjs | 不相关题库与探索模块 |
| 修改主线界面 | auto-view.js、auto.css；受影响的 app 入口 | 不相关旧活动 |
| 修复旧模块 | 对应模块、相关 regression 检查 | 其他无关模块 |
| 发布 | index.html、sw.js、DEPLOY_GITHUB | 已审校内容全文 |

**单一检查入口：** `node scripts/check.cjs` 自动选择内容或完整检查；显式 `content` / `full` 可用于确定批次。内容检查不启动 app、不访问存储。完整检查含所有 JS 语法、内容契约、16 项教学行为、8 项连续性/混合复习与 14 项旧功能回归；27 课的参数化教学检查覆盖 432 轮完整路径。

## 运行结构

`course-data.js` 固定单元并保留原三节代词课；`course-foundations.js` 和 `course-connected.js` 分别增加 12 节课、144 题。内容文件只产生教材对象。`auto.js` 负责教学、判定、状态验证与朗读；`auto-view.js` / `auto.css` 负责渲染；`app.js` 只连接入口、保存和导航。

**装载顺序：** `content → mission → adventure → bank → archaeology → excavation → codex → chancery → vivo → curriculum → placement → pathway → bridges → transfer → course-data → course-foundations → course-connected → auto → auto-view → app`。app 最后加载；index 与 sw 缓存清单保持一致。

原模块保持：生活冒险与知识库、14 天驾考计划与独立导入器、词源档案/谜题/词根挑战、Codex/Chancery 虚构案件、Italiano Vivo 四模式、25 节点知识地图、可选能力定位、学习建议、罗曼语对照和迁移练习。详细历史保留在 CHANGELOG，不在交接中重复列每次扩充。

## 数据连续性

- 原 IndexedDB `piccola-italiano` / store `data` / key `state`，schemaVersion 1；降级 localStorage 键 `piccola-italiano-state`。绝不清空或重建用户学习数据。
- `autoTutor = {active, history, records}` 是可选增量字段。active 保存当前题、提示、反馈与最多 200 字符草稿；history 保留最近 60 轮；records 按 lessonId 保存最近一次完整课程记录，不受 history 滚动影响。
- v0.14 的 active 无需 kind 字段；恢复时先将有效整课 history 迁入 records，再裁剪近期历史。已发布课/题 ID 保持不变。
- 混合复习用 `lessonId:'auto-mixed-review'`、`kind:'review'`、固定八个 `reviewIds`；校验题目成员、唯一性、阶段、时间和答案。只进入 history，不覆盖整课 records。
- 导入重新计算答案证据，拒绝无效/重复/跨课数据，保留本机活动课和本机同 ID 记录。相同课程仅用有效且更近的完成记录更新 records；可从备份恢复本机没有的有效活动课。
- 原 progress、customItems、errors、attempts、sceneLogs、mission、adventure、mysteries、chancery、vivo、placement 等字段及旧 ID 保留。完整 JSON 导出包含增量字段，导入做非破坏性合并。
- 学习记录只存在本机，没有自动云同步，不向公共仓库上传用户备份。清缓存版本只影响应用资源，不触碰学习数据。

## 已验收与剩余边界

- 本地：内容契约与 38 项行为检查通过；432 条完整课程路径覆盖正常回答、错误、辅助、跳过和四种选题轮换。新增 288 题已交叉语言审校，修正合理省音/词序变体与题干约束。主线界面有针对性渲染检查。
- 发布状态：本候选版本等待 Pages 部署及受影响线上流程验收；通过后记录工作流和实际浏览器证据。
- iPhone Safari/PWA 的触控、真实离线、存储持久性和语音仍待实机验收；Node/VM 和云端 Chrome 不能替代。
- 系统朗读依赖设备语音，有些声音可能需要联网；没有真实听辨、语音识别、口语评分或任意自由表达 AI 批改。当前证据不认证 CEFR。
- 永久 records 只保存每课最近一次；混合复习证据随最近 60 轮滚动，较早在混合复习里纠正过的点可能再次出现。课程“练过”标记仍保留。
- 官方驾考题库的原始 TXT、版本、总量和真实导入尚未验收；自编练习不称官方题库。历史城邦故事是虚构，历史语言与比较材料继续遵守来源规则。

下一轮先按 PROJECT_PLAN 确定一个学习问题和完成标准。纯扩课沿用 COURSE_AUTHORING；不要为每批题目另加首页模块或重写教学引擎。
