---
draft: true
---

# 浅谈博客建站的技术选型

## 博客的本质

博客的本质是CMS

CMS系统的主要行为：管理内容及其生命周期（内容生产、发布、过期、删除）

## 当今博客建站的主流选择

> 这里可以用圆环交集图来表示, 或者十字坐标


- SSG
  - Hexo
  - Hugo
- Vitepress Docs
- Wordpress + 数据库
- Nuxt Content ()

### SSG

静态站点生成，纯静态服务, 适合部署 GitHub Pages

- Hugo
- Jerkll
- Hugo

### Vitepress

带点动态的静态站点, 开始使用 Vue 组件扩展 Markdown 的表达和排版能力

既然加了 Vue 组件，就已经不是纯静态站点了，已经成为了应用，可以是客户端渲染的应用or服务端渲染的应用

### Nuxt Content

Content-based CMS

动态，辅助内容生产但不直接接管, 内容发布、删除等操作仍为用户手动进行，负责内容发布

### WordPress

动态的大型内容管理系统，把内容生产这一环也接管

