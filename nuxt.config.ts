export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    '@nuxtjs/i18n',
    '@pinia/nuxt',
    '@whoj/nuxt3-axios',
  ],
  i18n: {
    locales: [
      {code: 'en', iso: 'en', file: 'en.js'},
      {code: 'zh-CN', iso: 'zh', file: 'zh.js'},
    ],
    defaultLocale: 'zh-CN',
    lazy: true,
    langDir: 'lang/',
    // baseUrl: 'https://www.xxx.com',
    detectBrowserLanguage: false,
  }
})
