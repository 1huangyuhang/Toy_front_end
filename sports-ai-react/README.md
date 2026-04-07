# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

## AI 开发协作（重要）

本项目已加入 AI 协作规则与“记忆锚点”文件，用于：
- **限制读取范围**：AI 默认只读取当前模块相关文件，避免无关文件干扰
- **持续记忆进度**：AI 通过固定状态文件快速接上一次开发进度与问题

使用方式：
- 每次开始新任务前，先更新 `docs/ai/STATE.md` 的“当前任务/模块范围/验收标准”
- 提需求时尽量带上模块入口路径（例如 `src/pages/ProductsPage.jsx`）或直接引用 `docs/ai/STATE.md`

相关文件：
- `docs/ai/STATE.md`：唯一“上一次做到哪”的可信来源（建议每次任务更新）
- `.cursor/rules/01-scope-and-memory.md`：Cursor 规则（强制先读 STATE，并限制无关文件读取）
