import { Markdown } from './.nuxt/components.d';
// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    pageTransition: { name: 'page', mode: 'out-in' }
  },
  devtools: { enabled: true },
  modules: ['@nuxt/content',
    "@nuxtjs/tailwindcss",
    '@nuxtjs/color-mode',
    '@nuxtjs/google-fonts',
    'nuxt-svgo',
    '@vueuse/nuxt',
    '@hypernym/nuxt-anime',
    'dayjs-nuxt',
    '@pinia/nuxt',
  ],
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
      Roboto: true,
      Barlow: {
        wght: [200, 400, 600, 800],
        normal: 400,
        regular: 400,
      },
      'Ubuntu Condensed': [400],
      'Fira Sans': [200, 300, 400, 500, 600, 700],
      'Fira Sans Condensed': [200, 300, 400, 500, 600, 700],
      'Fira Sans Extra Condensed': [400, 500, 600, 700],
      Ubuntu: [300, 400, 500, 700],
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
  content: {
    // experimental: {
    //   search: true
    // },
    markdown: {
      toc: { depth: 2, searchDepth: 2 },
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