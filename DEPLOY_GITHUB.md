# GitHub Pages · 已有项目的维护与部署

**当前仓库：** https://github.com/Gewuerzei/piccola-italiano  
**线上网站：** https://gewuerzei.github.io/piccola-italiano/  
**发布来源：** `main` 分支，`/ (root)`。本仓库已经建好，并且已发布，不需要再执行“新建仓库”流程。

## 更新与验收

1. 读取 `AGENTS.md`、`PROJECT_HANDOFF.md`、`CHANGELOG.md`，核实远端 `main` 最新源码。
2. 使用有权限的 GitHub 连接器或 Git 工作流更新**本仓库**文件。不能误操作 Cassola 项目的 `Gewuerzei/-Piccola`。
3. 如修改应用 JS/CSS/HTML 或资源列表，检查 `index.html` 的加载顺序与 `sw.js` 的 ASSETS 缓存清单；需要时更新缓存键以推动离线升级。
4. 提交到 `main` 后查看 [Actions](https://github.com/Gewuerzei/piccola-italiano/actions)。只有相关 Pages 部署工作流结束且 `conclusion=success`，才写“部署成功”。
5. 用 Safari 打开线上链接，刷新并确认版本。已安装主屏幕 PWA 可能需关闭重开才能看到新版本。
6. 离线、数据持久化、语音及设备触控应在 iPhone 上分别实测，不要仅凭 Actions 成功就宣称设备通过。

## 不可破坏的内容

- 保留 `piccola-italiano` IndexedDB 内的 `data/state` 以及 localStorage 备用记录。
- 不通过清空 Safari 网站数据、卸载 PWA 或重建 IndexedDB 解决升级/缓存问题。
- 重要学习记录先从“我的”导出 JSON 备份；不要把个人备份提交到公开仓库。
- 官网发布成功只能确认代码上线，**不能**确认用户已导入官方驾考题库、设备已成功更新缓存或个人进度已同步到云端。

## 首次安装（仅供新设备）

首次在线打开网站后，用 iPhone Safari “分享 → 添加到主屏幕”。随后启动并完成一小条学习记录，重启验证，再试离线打开。用户已完成过此步骤则无须重复安装。

## 回退与故障排查

- 先看当前 `main` 提交、Actions 构建记录、手机实际显示版本，区分部署失败与客户端缓存滞后。
- 只回退有问题的**代码提交**；保留本地 IndexedDB/localStorage，不触碰用户数据。
- 如果缓存状态不一致，检查 Service Worker 名称与预缓存路径，发布修复后的新版本；不要建议随意“清除全部网站数据”。
- GitHub Pages 代码与用户浏览器存储相互独立。即使回退代码，也要检查与现有本地数据的兼容性。
