# Sandy Xie — UX Portfolio

React + Tailwind CSS 个人作品集站点，营销页对标 [Cole 参考站](https://sx.framer.website/)，案例与简历还原 Figma 设计稿。

## 功能

- **首页** `/` — 简介、精选作品、关于摘要、经历、联系
- **作品集** `/works` — Autel Enterprise / Autel Mapper
- **案例详情** `/works/:slug` — Figma 全画板纵向滚动（22 + 9 屏）
- **关于** `/about` — 扩展介绍与简历入口
- **简历** `/resume` — 在线简历 + PDF 下载

## 本地开发

```bash
npm install
npm run dev
```

访问 http://localhost:5173

## 导出 Figma 画板图片

1. 在 Figma 创建 [Personal Access Token](https://www.figma.com/developers/api#access-tokens)
2. 运行：

```bash
FIGMA_ACCESS_TOKEN=你的token npm run sync:figma
```

图片将保存到 `public/cases/{slug}/{id}.png`。

也可在 Figma 中手动导出 PNG，按相同路径命名。

## 简历 PDF

将 PDF 放到：

```
public/resume/xie-xiaoshan-resume.pdf
```

## 构建与部署

```bash
npm run build
npm run preview
```

### Vercel

```bash
npx vercel
```

已包含 `vercel.json` SPA 回退。

### Netlify

```bash
npm run build
```

发布目录：`dist`（已包含 `netlify.toml`）。

## 技术栈

- Vite 8 · React 19 · TypeScript
- Tailwind CSS 4
- React Router 7
- Framer Motion

## Figma 源文件

[给Cursor的作品集](https://www.figma.com/design/PTSrG96cG7WoDsxUndH0rT/%E7%BB%99Cursor%E7%9A%84%E4%BD%9C%E5%93%81%E9%9B%86?node-id=0-1)
