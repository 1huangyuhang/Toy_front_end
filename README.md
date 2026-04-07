# T 项目（Sports AI）

本仓库包含一个基于 **Vite + React + React Router** 的前端站点（`sports-ai-react/`），以及部分历史静态页面（根目录若干 `*.html`）。

## 目录结构

- `sports-ai-react/`：主应用（React 工程）
  - `src/`
    - `components/`：页面布局与可复用组件（导航、页脚、视频区块等）
    - `views/`：路由页面（Home/Cases/About/Contact/Login/Register）
    - `router/`：路由表
    - `animations/`：动画模块（含页脚 reveal 动画）
    - `auth/`：前端登录态（AuthContext）
    - `styles/`：全局样式（Tailwind 入口 + 少量全局复用样式）
  - `server/`：本地联调用轻量服务（签名上传/认证示例）
- `js/`：历史遗留目录（如无使用可后续清理）
- `*.html`：历史静态页面（迁移前版本）

## 前端运行

进入 React 工程目录：

```bash
cd sports-ai-react
npm install
npm run dev
```

## 分支约定

- `main`：稳定分支（可部署）
- `test`：测试验证分支
- `develop`：日常开发主分支
- `feature_dev*`：功能开发分支（从 `develop` 切出）

## 开发流程建议

1. 日常开发在 `develop`
2. 新需求从 `develop` 创建 `feature_devXXX`
3. 功能完成后合并回 `develop`
4. 发版时将 `develop` 合并到 `test` 验证，通过后合并到 `main`

