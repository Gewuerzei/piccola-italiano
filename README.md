# Piccola Italiano 🇮🇹

**意大利语学习 PWA · v0.8.0**  
[打开应用](https://gewuerzei.github.io/piccola-italiano/) · [源码仓库](https://github.com/Gewuerzei/piccola-italiano)

一款完全独立于 Cassola 餐馆生产系统的 **local-first** 意大利语学习应用。用生活会话、词源考古、文字谜题、驾考术语与城邦文书游戏练习意大利语。

## 学习模式

| 模块 | 当前内容 | 用途 |
| --- | --- | --- |
| 知识库与复习 | 关联词汇、语法、例句及场景；本机间隔复习 | 建立可重复使用的语言知识 |
| 互动冒险 | 生活场景分支、意大利语会话和自我练习 | 从识别正确表达走向自己造句 |
| Italiano Vivo | 12回合NPC实战对话、6个绕词挑战、6道语法侦探、6道词根反推 | 30个离线表达与推理关卡，独立首次通过记录；自由表达为参考答案自评 |
| 词源考古 | 36份有词典来源链接的词源档案 | 追查拉丁语、希腊语、Veneto 等语源 |
| 词源谜案 | 9宗连续谜题，另有12关词根推理 | 输入词形、排序线索、验证推断 |
| 中古城邦文书院 | 6宗虚构案件：24份物证、18段证词、12道条款解码 | 在调查与裁决中理解意大利语 |
| Operazione Patente B | 14天复习计划、示例题与题库导入入口 | 驾考术语训练及模拟练习 |

**关于考试题库：** 当前仓库没有内置完整、经校验的意大利官方理论考试题库。原有40道驾考示例题是自编练习，不应标注为官方真题。导入器可以读取带有明确题干和答案字段的受支持文件；MIT 原始 TXT 尚未完成真实文件格式验证，不能声称官方题库已经成功导入。模拟考试也不应被宣传为已经复现官方抽题算法。

**关于历史内容：** 中古城邦剧情是虚构设定，题目中的意大利语为面向现代学习者的教学文本，不是声称出土的中世纪原始文书。词源档案为自行编写的解释，附有外部词典出处，不复制外部词典全文。

## 如何使用

1. 用 iPhone Safari 打开上方应用链接。可用“分享 → 添加到主屏幕”安装。
2. 从首页选择学习模块；点开知识库项目可查看例句及关联词源。
3. 城邦文书院需调查物证、询问证人、完成语言解码，再选择一次正式裁决。Italiano Vivo 在首页或冒险中心进入；自由回答需要对照范例自行评估，不是AI对话或AI批改。
4. 在“我的”中定期 **导出 JSON 备份**。删除网页数据或卸载 PWA 可能丢失本地学习记录。

## 数据与技术

- 纯前端静态站点，GitHub Pages 部署，离线资源由 `sw.js` 缓存。
- 学习记录默认存在设备 IndexedDB：`piccola-italiano` / store `data` / key `state`，`schemaVersion=1`；不可用时降级至 localStorage。
- 无账号登录、云端学习记录同步，也**不会**通过 GitHub 自动上传用户本地数据。
- JSON 备份支持非破坏性合并。**严禁通过清空 IndexedDB/localStorage 来处理升级或故障。**
- 公共仓库不存放私人学习备份、授权令牌、密码或用户数据。
- 意大利语朗读功能依赖设备本地语音服务；实际设备是否提供该语音需单独测试。

## 项目维护文书

| 文件 | 只负责 |
| --- | --- |
| [AGENTS.md](AGENTS.md) | AI/自动化施工规则和安全边界 |
| [PROJECT_HANDOFF.md](PROJECT_HANDOFF.md) | 当前模块、状态、风险与交接 |
| [CHANGELOG.md](CHANGELOG.md) | 版本变更历史 |
| [DEPLOY_GITHUB.md](DEPLOY_GITHUB.md) | 已有 Pages 项目的维护、部署和验收 |
| [LEARNING_ARCHITECTURE.md](LEARNING_ARCHITECTURE.md) | 知识分层、能力定位与跨语言迁移的分期设计蓝图（尚未上线） |

后续版本功能沿革请看 CHANGELOG，不把每次修改都重复堆进 README。

## 外部出处

- [MIT · 2024年理论考试题库通函](https://www.mit.gov.it/normativa/circolare-protocollo-19281-del-05072024)
- [MIT 网站法律声明](https://www.mit.gov.it/note-legali)
- [Treccani 意大利语词典](https://www.treccani.it/vocabolario/)

**仓库：** `Gewuerzei/piccola-italiano`。与 Cassola 的 `Gewuerzei/-Piccola` 完全分离。
