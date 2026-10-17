# Larry-Tech · 个人作品主页

GitHub Pages： https://run-luo-tech.github.io/

公开的静态作品页，无服务器、数据库、账号系统、分析追踪或第三方字体依赖。使用 HTML/CSS/原生 JavaScript，可直接部署 main 分支根目录。

## 页面内容

个人作品介绍、Musica 实际界面截图、功能说明、三步使用流程、Windows 正式版下载、Mac 源码预览状态、图文 PDF 说明书、常见问题、GitHub 联系入口。支持中英切换和手机布局。

Windows 下载指向已核实的 v0.2.0 Release 附件；Mac 没有可验证的原生发行包，因此只链接源码仓库。更新版本时修改 index.html 中的下载 URL、版本与说明，不应将未发布版本标记为可直接下载。

## 本地预览

```sh
python -m http.server 8765
```

访问 http://localhost:8765 。本地预览才需要 Python；线上访客只需要浏览器。页面和界面截图全部在本仓库内，无需 npm 安装或构建。

## 维护与部署

- index.html：文案、链接与页面结构。
- styles.css：视觉样式与移动端断点。
- app.js：中英切换与截图切换。
- assets：演示截图、图标和中文 PDF；截图来自 Musica 隔离演示曲库，不含个人歌曲。
- .nojekyll：按原始静态文件发布。

本项目为轻量静态展示页，不增加完整软件工程框架。推送到 main 后由 GitHub Pages 更新。网站名称是 Larry-Tech，GitHub 账号名仍为 run-luo-tech。
