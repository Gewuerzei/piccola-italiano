# AGENTS · Piccola Italiano

给使用 GitHub、命令行、本地模型或自动化流程的施工代理使用。**仓库代码是真实状态来源；文书与聊天记忆不能覆盖当前代码事实。**

## 每次施工的检查顺序

1. 读取本文件 `AGENTS.md`，再读 `PROJECT_HANDOFF.md`、`CHANGELOG.md`。
2. 查看当前 `main` 最新提交及实际源码；对照 `index.html`、`app.js`、`sw.js` 核实版本与模块。
3. 说明准备修改的范围；仅修改被授权的独立项目。
4. 改完后做语法检查、页面/交互测试、持久化和安全兼容性检查。
5. 提交代码、观察 GitHub Pages 部署工作流；不要把“已提交”说成“部署成功”。
6. 若变更影响运行、存储或模块关系，同步更新交接文书；版本历史只写入 CHANGELOG，README 只保留当前概览。

## 绝对边界

- **只操作 `Gewuerzei/piccola-italiano`**。`Gewuerzei/-Piccola` 属于 Cassola 生产系统，未经明确要求不得访问或修改。
- 数据 **local-first**。不得清空、覆盖或重建现有用户 IndexedDB `piccola-italiano`、localStorage 学习状态，也不得静默改变存储模型。
- 当前数据库对象：IndexedDB `piccola-italiano`、store `data`、key `state`、`schemaVersion=1`。如确需迁移，制定向后兼容迁移、保留旧数据并单独验收。
- 旧 ID、知识点、复习进度、卷宗记录、错题、对话历史、题库导入记录不得因添加功能而丢失。
- 备份导入只作可验证的非破坏性合并，不应凭文件名推测可信题库来源。
- 不往公共仓库提交访问密钥、用户备份、私人会话或其它隐私数据。
- 未核对官方格式、版本及授权时，不得把自编驾考练习题称为官方题库。
- 不将虚构城邦故事冒充历史史料；不要镜像或大段复制 Treccani 等第三方词典正文。

## 前端装载次序

以现有 `index.html` 为准。目前应用脚本依次是：

```text
content.js
mission.js
adventure.js
bank.js
archaeology.js
excavation.js
codex.js
chancery.js
vivo.js
app.js
```

`chancery.js` 会向前置种子集合追加内容；`vivo.js` 是离线练习模块，必须在 `app.js` 之前载入；`app.js` 必须最后加载。保持 `index.html` 与 `sw.js` 中缓存资源清单一致。

## 测试与发布原则

- 语法检查覆盖所有 JS；没有验证运行就不能宣称功能验收完成。
- 至少测试正常导航、主题切换、词源返回、案件答案纠错、首次裁决不重复计分、Italiano Vivo 四模式文字交互/首次通关计分、旧数据保留以及导出/合并逻辑。
- 有实际运行文件变化时，检查 Service Worker 缓存版本是否需要变更，确保新资源离线可用。**纯文档修改不需要升级缓存。**
- GitHub Pages 采用 `main` / `/ (root)`；确认最终工作流 `completed / success` 才能宣称成功部署。
- 本地浏览器模拟不等于 iPhone Safari/PWA 设备验收。未测的功能应如实标注。
- 遇到文书与源码矛盾，先核实源码，再更新文书；不要为了匹配文书而修改正确代码。

## 教学路线图

建设知识层级、摸底测评或跨语功能前必须阅读 [LEARNING_ARCHITECTURE.md](LEARNING_ARCHITECTURE.md)。按阶段实施并验收；**规划文书不可当成已发布功能**。不得把用户的答题次数、自评或XP直接当成经验证的CEFR等级。

## 文书责任分配

- README：现在是什么、怎么用。
- PROJECT_HANDOFF：当前代码结构、当前风险与下一次交接重点。
- CHANGELOG：历史版本事实，不删除重要变更记录。
- DEPLOY_GITHUB：维护、发布、回退及设备验收步骤。
