import tailwindcss from '@tailwindcss/vite'
import { fileURLToPath } from 'node:url'

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  future: { compatibilityVersion: 4 },

  modules: [
    '@nuxt/fonts',
    '@nuxt/icon',
    'shadcn-nuxt',
    '@nuxt/eslint',
    '@nuxtjs/seo',
    '@nuxtjs/i18n',
  ],

  i18n: {
    langDir: 'locales',
    locales: [
      { code: 'es', name: 'Español', language: 'es', file: 'es.json' },
      { code: 'en', name: 'English', language: 'en', file: 'en.json' },
      { code: 'pt-BR', name: 'Português (BR)', language: 'pt-BR', file: 'pt-BR.json' },
    ],
    defaultLocale: 'es',
    strategy: 'prefix_except_default',
    baseUrl: process.env.NUXT_PUBLIC_SITE_URL || 'https://betkit.io',
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_redirected',
      redirectOn: 'root',
    },
  },

  fonts: {
    families: [
      { name: 'Archivo Narrow', provider: 'google', weights: [600, 700], display: 'swap' },
      { name: 'Archivo', provider: 'google', weights: [500, 600, 700, 800, 900], display: 'swap' },
      { name: 'Source Sans 3', provider: 'google', weights: [300, 400, 500, 600, 700], display: 'swap' },
      { name: 'JetBrains Mono', provider: 'google', weights: [400, 500, 600, 700], display: 'swap' },
    ],
  },

  icon: { size: '20px' },

  shadcn: {
    prefix: '',
    componentDir: fileURLToPath(new URL('./app/components/ui', import.meta.url)),
  },

  css: ['~/assets/css/main.css'],

  vite: {
    plugins: [tailwindcss()],
  },

  site: {
    url: process.env.NUXT_PUBLIC_SITE_URL || 'https://betkit.io',
    name: 'BetKit',
    description: 'Plataforma todo-en-uno para hipódromos, billeteras digitales y corredores de apuestas.',
    defaultLocale: 'es',
  },

  ogImage: { enabled: false },
  sitemap: { enabled: true },
  robots: { enabled: true },

  routeRules: {
    '/api/**': { cors: true, headers: { 'Access-Control-Allow-Origin': '*' } },
  },
})
