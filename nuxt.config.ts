import { Markdown } from './.nuxt/components.d';
// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  build: {
    analyze: true,
  },
  app: {
    pageTransition: { name: 'page', mode: 'out-in' }
  },
  devtools: { enabled: true },
  modules: [
    '@nuxt/content',
    "@nuxtjs/tailwindcss",
    '@nuxtjs/color-mode',
    '@nuxtjs/google-fonts',
    'nuxt-svgo',
    '@vueuse/nuxt',
    '@hypernym/nuxt-anime',
    'dayjs-nuxt',
    '@pinia/nuxt',
    "@nuxtjs/i18n"
  ],
  svgo: {
    autoImportPath: './assets/icons/',
  },
  dayjs: {
    locales: ['en', 'fr'],
    plugins: ['relativeTime', 'utc', 'timezone'],
    defaultLocale: 'en',
    defaultTimezone: 'America/New_York',
  },
  googleFonts: {
    // Options
    download: true,
    families: {
      Barlow: {
        wght: [200, 400, 600, 800],
        normal: 400,
        regular: 400,
      },
      'Barlow Semi Condensed': {
        wght: [200, 400, 600],
        normal: 400,
        regular: 400,
      },
      'Playfair Display': {
        wght: [400],
        normal: 400,
        regular: 400,
      }
      // 'Fira Sans': [200, 300, 400, 500, 600, 700],
      // 'Fira Sans Condensed': [400, 500, 600, 700],
    }
  },
  colorMode: {
    classSuffix: '',
    preference: 'system', // default value of $colorMode.preference
    fallback: 'light', // fallback value if not system preference found
    hid: 'nuxt-color-mode-script',
    globalName: '__NUXT_COLOR_MODE__',
    componentName: 'ColorScheme',
    classPrefix: '',
    // classSuffix: '-ode',
    storageKey: 'nuxt-color-mode'
  },
  i18n: {
    defaultLocale: 'en',
    locales: [
      {
        code: 'en',
        name: 'En'
      },
      {
        code: 'zh',
        name: '中文'
      },
    ]
  },
  content: {
    ignores: [
      '.dft.md$'
    ],
    experimental: {
      search: true
    },
    markdown: {
      toc: { depth: 3, searchDepth: 3 },
      remarkPlugins: {
        // Override remark-emoji options
        // 'remark-emoji': {
        //   emoticon: true
        // },
        // // Disable remark-gfm
        // 'remark-gfm': false,
        // // Add remark-oembed
        // 'remark-oembed': {
        //   // Options
        // }
      },
    },
    highlight: {
      langs: ['json', 'js', 'ts', 'html', 'css', 'vue', 'shell', 'mdc', 'md', 'yaml', 'dart', 'swift', 'kotlin', 'tsx', 'objective-c'],
      theme: {
        // Default theme (same as single string)
        default: 'github-light',
        // Theme used if `html.dark`
        dark: 'github-dark',
        // Theme used if `html.sepia`
        sepia: 'monokai'
      }
    }
  }
})