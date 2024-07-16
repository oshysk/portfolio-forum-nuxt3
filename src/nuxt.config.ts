// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  css: [
    '@/assets/css/theme.css',
    '@/assets/css/user.css'
  ],
  app: {
    head: {
      charset: 'utf-8',
      htmlAttrs: {
        lang: 'ja' // 必要に応じて言語を指定
      },
      meta: [
        { 'http-equiv': 'X-UA-Compatible', content: 'IE=edge' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'msapplication-TileImage', content: '/img/favicons/mstile-150x150.png' },
        { name: 'theme-color', content: '#ffffff' }
      ],
      title: '掲示板（FastAPI + Nuxt3）',
      link: [
        { rel: 'apple-touch-icon', sizes: '180x180', href: '/img/favicons/apple-touch-icon.png' },
        { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/img/favicons/favicon-32x32.png' },
        { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/img/favicons/favicon-16x16.png' },
        { rel: 'shortcut icon', type: 'image/x-icon', href: '/img/favicons/favicon.ico' },
        { rel: 'manifest', href: '/img/favicons/manifest.json' },
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Raleway:wght@100;200;300;400;500;600;700;900&family=Roboto:wght@100;300;400;500;700;900&display=swap' }
      ],
      script: [
        { src: '/vendors/overlayscrollbars/OverlayScrollbars.min.js', defer: true },
        { src: '/vendors/popper/popper.min.js', defer: true },
        { src: '/vendors/bootstrap/bootstrap.min.js', defer: true },
        { src: '/vendors/anchorjs/anchor.min.js', defer: true },
        { src: '/vendors/is/is.min.js', defer: true },
        { src: '/vendors/fontawesome/all.min.js', defer: true },
        { src: '/vendors/lodash/lodash.min.js', defer: true },
        { src: '/vendors/imagesloaded/imagesloaded.pkgd.min.js', defer: true },
        { src: '/vendors/gsap/gsap.js', defer: true },
        { src: '/vendors/gsap/customEase.js', defer: true },
        { src: '/js/theme.js', defer: true }
      ]
    }
  },
  runtimeConfig: {
    public: {
      apiUrlClient: process.env.API_URL_CLIENT
      // apiUrl: process.env.API_URL
      // apiUrl: "http://0.0.0.0:8000"
      // apiUrl: "http://host.docker.internal:8000"
    },
    private: {
      apiUrlServer: process.env.API_URL_SERVER
    }
  },
  sourcemap: {
    server: true,
    client: true
  }
})