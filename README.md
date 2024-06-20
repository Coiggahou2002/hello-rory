[![nuxt-content-social-card](https://github.com/nuxt/content/blob/main/docs/public/social-card.png?raw=true)](https://content.nuxt.com)

# Rory's Pages

[![Nuxt][nuxt-src]][nuxt-href]
[![Nuxt Content][nuxt-content-src]][nuxt-content-href]
[![Tailwind][tailwind-src]][tailwind-href]
[![Vercel][vercel-src]][vercel-href]

A website for handsomes and beauties to get to know about Rory powered by [Nuxt Content](https://content.nuxt.com/).

## ✨ Features Plan

- [x] 🌛 Dark Mode
- [x] 🌍 Customized Navigations
- [x] 🔧 Overwrite basic markdown components
- [x] 🔍 Content Search
- [x] 📄 TOC for articles
- [x] 📱 Responsive Adaptation for mobile phone
    - [x] Collapse navigation bar to menu button
- [x] 💬 i18n
- [x] 🎨 Custom text selection color
- [ ] Sync toc-nav highlight item with content position
- [ ] Add scroll-triggered animations and more UI elements
- [ ] Add connection-visualized graph
- [ ] favicon.ico
- [ ] GSAP scroll animations
- [ ] 3D models and animations by TresJS
- [ ] 2D frame animations by lottie
- [ ] Separate content source with the source code of this framework

### Markdown Components Override

- [x] p
- [x] a
- [x] h1
- [x] h2
- [x] h3
- [x] ul
- [x] ol
- [x] li
- [x] code
- [x] pre
- [x] img
- [x] blockquote
- [ ] h4
- [ ] h5
- [ ] h6
- [ ] table

## 🚀 Optimizations

- [ ] Use CDN for external dependencies
- [ ] Reduce times that search requests being sent

## 🐛 Bugs

- [ ] ban iOS bouncing slide
- [ ] code block overflow

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
- [@nuxtjs/i18n](https://nuxt.com/modules/i18n)
- [@pinia/nuxt](https://nuxt.com/modules/pinia)


[tailwind-src]: https://img.shields.io/badge/Tailwind-18181B?logo=TailwindCSS
[tailwind-href]: https://tailwindcss.com/

[nuxt-src]: https://img.shields.io/badge/Nuxt-18181B?logo=nuxt.js
[nuxt-href]: https://nuxt.com

[nuxt-content-src]: https://img.shields.io/badge/Nuxt_Content-18181B?logo=nuxt.js
[nuxt-content-href]: https://content.nuxt.com

[vercel-src]: https://img.shields.io/badge/vercel-18181B?logo=Vercel
[vercel-href]: https://vercel.com