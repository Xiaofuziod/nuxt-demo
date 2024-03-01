export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'taurion',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      {charset: 'utf-8'},
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1,user-scalable=no,  maximum-scale=1.0, minimum-scale=1.0'
      },
      {
        hid: 'description',
        name: 'description',
        content: 'xxx'
      },
      {name: 'keywords', content: 'xxx'},
      {name: 'format-detection', content: 'telephone=no'},
    ],
    link: [
      {rel: 'icon', type: 'image/x-icon', href: '/favicon.ico'}
    ],
    script: [
      {
        src: '',
        async: true
      },
    ]
  },

  css: [],

  plugins: [
    '@/plugins/request',
  ],

  axios: {
    proxy: true,
    baseURL: 'xxx',
  },
  proxy: {
    '/api': {
      target: 'http://api-test.taurion.ai',
      // target: 'http://localhost:4000',
      pathRewrite: {
        '^/api': '' // 删除url中的/api
      }
    }
  },
  components: true,
  buildModules: [],
  server: {
    port: 9898, // default: 3000
    host: '0.0.0.0' // default: localhost
  },

  auth: {
    strategies: {
      google: {
        clientId: '86595109680-ago8qfvgdi7785110dp2f95uu3c2e002.apps.googleusercontent.com',
        codeChallengeMethod: '',
        responseType: 'token id_token',
        redirectUri: 'http://localhost:9898',
        scope: [],
        // 更多配置...
      },
      local: {
        scheme: "refresh",
        token: {
          property: "access_token",
          maxAge: 1800
          // type: 'Bearer'
        },
        refreshToken: {
          property: "refresh_token",
          data: "refresh_token",
          maxAge: 60 * 60 * 24 * 30
        },
        user: {
          property: ""
        },
        endpoints: {
          // backend endpoints
          login: {
            url: "/auth/login", // triggering access_token exchange.
            method: "post"
          },
          refresh: {
            url: "/auth/refresh", // backend api's refresh token endpoint (irrelevant from twitter)
            method: "post"
          },
          user: {
            url: "/me/profile", // returns twitter profile
            method: "get"
          },
          logout: false
        },
        autoLogout: false
      }
    },
    // 其他auth模块配置...
  },

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/proxy',
    '@nuxtjs/i18n',
    '@nuxtjs/auth-next'
  ],
  i18n: {
    strategy: 'prefix',
    locales: [
      {code: 'en', iso: 'en', file: 'en.js'},
      {code: 'zh', iso: 'zh', file: 'zh.js'},
    ],
    defaultLocale: 'zh',
    lazy: true,
    langDir: 'lang/',
    silentTranslationWarn: true,
    baseUrl: 'xxx',
    detectBrowserLanguage: false,
  },
  build: {
  }
}
