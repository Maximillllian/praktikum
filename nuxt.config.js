export default {
  // Target: https://go.nuxtjs.dev/config-target
  target: 'server',

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'Яндекс.Стырили',
    htmlAttrs: {
      lang: 'ru',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },

      // Подключаем стили яндекса
      { rel: 'stylesheet', href: "//praktikum.s3.yandex.net/praktikum/v0.195.16-1640694944/static/build/vendor.build.css" },
      { rel: 'stylesheet', href: "//praktikum.s3.yandex.net/praktikum/v0.195.16-1640694944/static/build/trainer.build.css" }
  ],
  },

  server: {
    host: process.env.HOST || 'localhost'
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '~/assets/css/baseStyles.scss',
    "~/assets/css/yandex/proficiency.build.css"
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    { src: '~/plugins/vuesax.js' },
    { src: '~/plugins/vuelidate.js'}
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    '@nuxtjs/google-fonts',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/auth-next',
    'nuxt-material-design-icons-iconfont'
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // baseURL: process.env.BASE_URL || 'http://localhost:8000/api/',
    baseURL: 'https://cryptodeputat.pythonanywhere.com/api'
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    loaders: {
      sass: {
        implementation: require('sass'),
      },
      scss: {
        implementation: require('sass'),
      },
    },

    extend(config, ctx) {
      config.module.rules.push({
        enforce: 'pre',
        test: /\.txt$/,
        loader: 'raw-loader',
        exclude: /(node_modules)/,
      })
    },
  },

  // postcss: false,

  router: {
    middleware: ['auth']
  },

  auth: {
    localStorage: false,
    strategies: {
      local: {
        scheme: 'refresh',
        token: {
          property: 'access',
          maxAge: 1800,
          type: 'Bearer'
        },
        refreshToken: {
          property: 'refresh',
          data: 'refresh',
          maxAge: 60 * 60 * 24 * 30
        },
        user: {
          property: false
        },
        endpoints: {
          login: { url: '/auth/token/', method: 'post' },
          refresh: { url: '/auth/token/refresh/', method: 'post' },
          user: { url: '/auth/profile/', method: 'get' }
        }
      }
    }
  },

  googleFonts: {
    families: {
      Montserrat: {
        wght: [100, 200, 300, 400, 500, 600, 700, 800, 900],
        ital: [100, 200, 300, 400, 500, 600, 700, 800, 900],
      },
    },
  },
}
