# Larry-Tech · 个人作品主页

GitHub Pages： https://run-luo-tech.github.io/

公开的静态作品页，无需自行维护服务器、数据库或账号系统，无第三方字体依赖；访问计数依赖外部不蒜子服务。使用 HTML/CSS/原生 JavaScript，可直接部署 main 分支根目录。

## 页面内容

首页展示个人介绍、分类作品架、正在探索的方向与访客彩蛋。作品架支持全部／音乐与聚会／效率工具／研究与数据／脑洞实验室筛选；目前仅 Musica 已发布，其他分类明确为占位，不提供空下载或假链接。Musica 独立详情页保留实际截图、使用方法、下载与常见问题。两页均支持中英切换和手机布局。

首页 #about 提供 Musica v0.3.1 的简短更新：新 Logo、可拖动播放进度、Windows/Mac 安装包及升级保留数据。详情页提供已核实的 Windows v0.3.1 Setup/便携 ZIP，以及 Mac Apple Silicon/Intel 原生 DMG，附对应版本说明与两平台 PDF。更新版本时同步公告、版本、下载链接与截图，不把未发布版本标记为可直接下载。

## 本地预览

```sh
python -m http.server 8765
```

访问 http://localhost:8765 。本地预览才需要 Python；线上访客只需要浏览器。页面和界面截图全部在本仓库内，无需 npm 安装或构建。

## 维护与部署

- index.html / home.css：个人首页、分类作品卡片、个人介绍。
- musica.html：Musica 的独立产品详情与下载页。
- catalog.js：分类筛选、可直达的分类 hash、筛选状态播报。
- styles.css：视觉样式与移动端断点。
- app.js：共享中英切换及详情页的截图切换。
- assets：演示截图、图标和中文 PDF；截图来自 Musica 隔离演示曲库，不含个人歌曲。`larry-mark.svg` 是页头和介绍区共用的 L／上升箭头标志，`favicon.svg` 使用同一几何形状。
- .nojekyll：按原始静态文件发布。

本项目为轻量静态展示页，不增加完整软件工程框架。推送到 main 后由 GitHub Pages 更新。网站名称是 Larry-Tech，GitHub 账号名仍为 run-luo-tech。

## 访问计数与欢迎彩蛋

- `visitors.js` / `visitors.css`：共享访问计数、双语欢迎卡片和 Canvas 烟花。
- 仅正式域名 `run-luo-tech.github.io` 请求 [不蒜子公共 API](https://github.com/soxft/busuanzi/wiki/API)。每次完整加载页面 POST 一次 `/api`，以 `data.site_pv` 作为访问序号；切换语言、截图及重新查看彩蛋不会增加计数。刷新会增加访问次数，不是去重人数，不能用来认定第几个独立用户。
- 使用服务方当前官方脚本采用的 API 主机 `https://bsz.iirose.cn/api`，固定站点标识仍为 `https://run-luo-tech.github.io/`，沿用已有计数。旧文档的 `busuanzi.9420.ltd/api` 出现过响应超时，不再请求该地址。
- 从功能启用时开始计数，不补算历史访问。总数由服务端共享持久化，本地预览不请求服务。接口失败或超过 10 秒，显示通用欢迎和“访问计数暂未连接”，隐藏计数前缀与单位；不伪造序号、不自动重试，以免服务端已计数但响应丢失时重复增加访问。
- 免费公共服务无需 API 密钥，也无可用性、数据完整或防刷保证，适合个人主页的趣味统计；更换服务或域名时需要安排数据迁移。[服务说明](https://busuanzi.9420.ltd/)
- 计数请求会把站点地址发送给第三方，该服务能接收请求 IP 等访问记录；本站不发送姓名、邮箱、页面查询参数或指纹，不保存访客身份。页面底部显示服务来源。
- 欢迎卡片约 14 秒后收起（鼠标停留或键盘聚焦时保留），可关闭或按 Esc。烟花约 2.8 秒、无声音、不遮挡操作，系统启用减少动态效果时不播放。底部按钮可重新查看，不重新计数。

## 新作品与分类维护

首页 `data-filter` 和卡片 `data-category` 使用同一个分类 ID（music/tools/research/lab）。已发布卡片声明 `data-released="true"` 并链接真实详情页；筹备分类不伪装成可下载产品。新增产品时可在同一分类增加卡片，复制 `musica.html` 的页面结构并替换内容，图片仍放 assets；同步更新首页的作品数量文案。中英文内容通过 `data-en` 配对。

`index.html#category=music` 可直接打开音乐分类。分类状态仅在浏览器内，无服务端依赖；禁用 JavaScript 时仍能看到全部卡片并打开详情。访客计数与彩蛋仅在首页加载，进入产品页不会重复弹出或增加首页计数。原首页 `#download` 深链接兼容跳转到 `musica.html#download`。
