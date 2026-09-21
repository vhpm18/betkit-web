import tailwindcss from '@tailwindcss/vite'
import { fileURLToPath } from 'node:url'

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: {
    enabled: process.env.NODE_ENV !== 'production',
  },

  future: { compatibilityVersion: 4 },

  modules: [
    '@nuxt/fonts',
    '@nuxt/icon',
    'shadcn-nuxt',
    '@nuxt/eslint',
    '@nuxtjs/seo',
    '@nuxtjs/i18n',
    '@vercel/analytics',
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
    display: 'swap',
  },

  icon: { size: '20px' },

  shadcn: {
    prefix: '',
    componentDir: fileURLToPath(new URL('./app/components/ui', import.meta.url)),
  },

  css: ['~/assets/css/main.css'],

  vite: {
    plugins: [tailwindcss()],
    // OptimizeDeps for faster HMR
    optimizeDeps: {
      include: ['vue', 'vue-router', 'vue-i18n'],
    },
  },

  site: {
    url: process.env.NUXT_PUBLIC_SITE_URL || 'https://betkit.io',
    name: 'BetKit',
    description: 'Plataforma todo-en-uno para hipódromos, billeteras digitales y corredores de apuestas.',
    defaultLocale: 'es',
    indexable: true,
  },

  linkChecker: { enabled: false },

  ogImage: { enabled: false },

  sitemap: {
    enabled: true,
    // Auto-generates per-locale sitemaps with hreflang alternates via @nuxtjs/i18n
    urls: [],
    defaults: {
      changefreq: 'weekly',
      priority: 0.7,
      lastmod: new Date().toISOString(),
    },
    exclude: [
      '/api/**',
      '/__nuxt_error',
    ],
  },

  robots: {
    enabled: true,
    blockAiBots: false,
    allow: '/',
    disallow: ['/api/', '/__nuxt_error'],
  },

  routeRules: {
    '/api/**': { cors: true, headers: { 'Access-Control-Allow-Origin': '*' } },
    '/': { prerender: true, sitemap: { priority: 1.0, changefreq: 'daily' } },
    '/pricing': { prerender: true, sitemap: { priority: 0.9, changefreq: 'weekly' } },
    '/demo': { prerender: true, sitemap: { priority: 0.9, changefreq: 'weekly' } },
    '/contacto': { prerender: true, sitemap: { priority: 0.8, changefreq: 'monthly' } },
    '/banqueros': { prerender: true, sitemap: { priority: 0.8, changefreq: 'monthly' } },
    '/sellers': { prerender: true, sitemap: { priority: 0.8, changefreq: 'monthly' } },
    '/vendedores': { prerender: true, sitemap: { priority: 0.8, changefreq: 'monthly' } },
    '/blog': { prerender: true, sitemap: { priority: 0.7, changefreq: 'daily' } },
    '/links': { prerender: true, sitemap: { priority: 0.3, changefreq: 'monthly' } },
    '/software-para-vende-pagas': { prerender: true, sitemap: { priority: 0.7, changefreq: 'monthly' } },
    '/features/**': { prerender: true, sitemap: { priority: 0.8, changefreq: 'weekly' } },
  },

  nitro: {
    compressPublicAssets: true,
  },
})
