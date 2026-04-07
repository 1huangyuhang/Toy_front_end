## Animations

### Footer Reveal（页脚抽出）

目标：滚动到页面接近底部时，页脚像“从底部抽出来”，参考 Defi 官网的 footer reveal 手感。

实现文件：
- `src/animations/footerReveal.js`

接入点：
- `src/components/FooterReveal.jsx`

可调参数：
- `maxTranslate`：页脚初始下移像素（默认 72）
- `revealRange`：进入底部多少像素开始 reveal（默认 420）

