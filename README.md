# Rory's Pages

A website for handsomes and beauties to get to know about Rory powered by [Nuxt Content](https://content.nuxt.com/).

## ✨ Features Plan

- [x] 🌛 Dark Mode
- [x] 🌍 Customized Navigations
- [x] 🔧 Overwrite basic markdown components
- [x] 🔍 Content Search
- [x] 📄 TOC for articles
- [ ] Custom text selection color
- [ ] Refactor nav styles
- [ ] Sync toc-nav highlight item with content position
- [ ] Responsive Adaptation for mobile phone
    - [x] Collapse navigation bar to menu button
- [ ] Add scroll-triggered animations and more UI elements
- [ ] Add connection-visualized graph
- [ ] i18n
- [ ] favicon.ico

### Markdown Components Override

- [x] p
- [x] h1
- [x] h2
- [x] h3
- [x] ul
- [x] ol
- [x] li
- [x] code
- [x] pre
- [x] img
- [ ] h4
- [ ] h5
- [ ] h6
- [ ] table
- [ ] quote

## 🚀 Optimizations

- [ ] Use CDN for external dependencies
- [ ] Reduce times that search requests being sent

## 🐛 Bugs

- [ ] ban iOS bouncing slide
- [ ] code block overflow
- [ ] 

## 📄 Contents

- [ ] About

## 📁 Project Directory Structure
```
.
├── assets
│   ├── icons
│   └── images
├── components
│   ├── blog (Components used in blog page)
│   ├── content (Overrided markdown components)
│   ├── profile (Components used in profile)
│   └── search
├── composables
├── content (Content files)
├── pages (Custom pages)
├── public
├── server
├── stores
├── types
└── utils
```

## ⚙️ Integrated Modules

- [@nuxtjs/color-mode](https://nuxt.com/modules/color-mode)
- [@nuxt/content](https://content.nuxt.com/)
- [@nuxtjs/tailwindcss](https://tailwindcss.nuxtjs.org/)
- [@nuxtjs/color-mode](https://color-mode.nuxtjs.org/)
- [@nuxtjs/google-fonts](https://google-fonts.nuxtjs.org/)
- [nuxt-svgo](https://nuxt.com/modules/nuxt-svgo)
- [@vueuse/nuxt](https://vueuse.org/nuxt/README.html)
- [dayjs-nuxt](https://nuxt.com/modules/dayjs)
- [@hypernym/nuxt-anime](https://nuxt.com/modules/animejs)