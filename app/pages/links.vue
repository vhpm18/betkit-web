<script setup lang="ts">
definePageMeta({ layout: 'links' })

const { t, tm } = useI18n()
const appConfig = useAppConfig()

// Get social URLs from app config
const socialUrls = computed(() => ({
  whatsapp: appConfig.social?.whatsapp || '',
  instagram: appConfig.social?.instagram || '',
  tiktok: appConfig.social?.tiktok || '',
}))

// tm() returns i18n message nodes, not plain strings — we need to coerce with String()
const visibleLinks = computed(() => {
  const raw = tm('linksPage.items')
  if (!Array.isArray(raw)) return []
  return raw
    .map((item: any) => ({
      icon: String(item.icon ?? ''),
      label: String(item.label ?? ''),
      micro: String(item.micro ?? ''),
      href: String(item.href ?? ''),
    }))
    .filter((item) => {
      if (!item.href || item.href === '#') {
        const icon = item.icon
        if (icon.includes('whatsapp') || icon === '💬') return !!socialUrls.value.whatsapp
        if (icon.includes('instagram') || icon === '📸') return !!socialUrls.value.instagram
        if (icon.includes('tiktok') || icon === '🎵') return !!socialUrls.value.tiktok
        return false
      }
      return true
    })
    .map((item) => {
      const icon = item.icon
      if (item.href === '#' || !item.href) {
        if (icon.includes('whatsapp') || icon === '💬') return { ...item, href: socialUrls.value.whatsapp }
        if (icon.includes('instagram') || icon === '📸') return { ...item, href: socialUrls.value.instagram }
        if (icon.includes('tiktok') || icon === '🎵') return { ...item, href: socialUrls.value.tiktok }
      }
      return item
    })
})

// Link card styles based on index
const linkStyles = computed(() => {
  const links = visibleLinks.value
  return links.map((item, i) => {
    const icon = item.icon
    // Hero: first link (Prueba gratis) — gold glow
    if (i === 0) return 'hero'
    // WhatsApp — emerald accent
    if (icon.includes('whatsapp') || icon === '💬') return 'whatsapp'
    // Standard
    return 'standard'
  })
})

useHead({
  title: () => t('linksPage.bio', { highlight: t('linksPage.bioHighlight') }),
  meta: [
    { name: 'description', content: () => t('linksPage.bio', { highlight: t('linksPage.bioHighlight') }) },
    { name: 'robots', content: 'index, follow' },
  ],
})
</script>

<template>
  <div class="min-h-screen flex flex-col items-center justify-start p-4">
    <main class="w-full max-w-[420px] mx-auto pt-4 pb-12 flex flex-col items-center gap-6">

      <!-- ===== Header Section ===== -->
      <header class="w-full flex flex-col items-center text-center relative px-2">
        <!-- SLA Status Pill -->
        <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-dark-900 border border-dark-stroke mb-5 shadow-inner">
          <span class="relative flex h-2 w-2">
            <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-emerald opacity-75" />
            <span class="relative inline-flex rounded-full h-2 w-2 bg-accent-emerald" />
          </span>
          <span class="font-mono text-[10px] tracking-wider font-semibold text-accent-emerald uppercase">
            SLA 99.99% · LATAM NODE ACTIVE
          </span>
        </div>

        <!-- Brand Icon with Golden Accent -->
        <div class="relative group mb-3.5">
          <div class="absolute -inset-2 bg-brand-yellow/25 rounded-3xl blur-xl transition-all duration-500 group-hover:bg-brand-yellow/40" />
          <div class="relative w-20 h-20 rounded-2xl bg-gradient-to-b from-[#ffdb4d] via-brand-yellow to-[#d69f00] p-0.5 shadow-2xl flex items-center justify-center">
            <div class="w-full h-full bg-[#0a0a0c] rounded-[14px] flex items-center justify-center flex-col border border-white/10 relative overflow-hidden">
              <div class="absolute inset-0 bg-gradient-to-tr from-brand-yellow/15 to-transparent" />
              <span class="font-mono font-black text-2xl tracking-tighter text-brand-yellow drop-shadow-sm">BK</span>
              <div class="w-4 h-0.5 bg-brand-yellow rounded-full mt-0.5" />
            </div>
          </div>
          <!-- Version Badge -->
          <span class="absolute -bottom-1.5 -right-2 bg-dark-900 text-brand-yellow border border-dark-stroke text-[9px] font-mono font-bold px-1.5 py-0.5 rounded-md shadow-md">
            v4.8
          </span>
        </div>

        <!-- Title -->
        <div class="flex items-center justify-center gap-1.5 mt-1">
          <h1 class="text-2xl font-black tracking-tight text-foreground flex items-center gap-1.5">
            BETKIT
            <span class="bg-gradient-to-r from-brand-yellow via-amber-300 to-yellow-500 bg-clip-text text-transparent font-black tracking-widest text-lg">
              TURF OS
            </span>
          </h1>
        </div>

        <!-- Tagline -->
        <p class="mt-2.5 text-xs sm:text-[13px] text-foreground-muted font-normal leading-relaxed max-w-[340px] px-1">
          {{ t('linksPage.bio', { highlight: '' }).replace(/\s*$/, ' ').trim() }}
          <span class="text-foreground font-medium">{{ t('linksPage.bioHighlight') }}</span>
        </p>

        <!-- Coverage Ticker -->
        <div class="mt-3.5 flex flex-wrap items-center justify-center gap-1 text-[10px] font-mono text-foreground-muted bg-dark-900/60 border border-dark-stroke/60 py-1.5 px-3 rounded-full">
          <span class="text-foreground-subtle font-semibold">COBERTURA:</span>
          <span class="hover:text-brand-yellow transition-colors">AR</span>·
          <span class="hover:text-brand-yellow transition-colors">VE</span>·
          <span class="hover:text-brand-yellow transition-colors">CL</span>·
          <span class="hover:text-brand-yellow transition-colors">CO</span>·
          <span class="hover:text-brand-yellow transition-colors">PE</span>·
          <span class="hover:text-brand-yellow transition-colors">UY</span>·
          <span class="hover:text-brand-yellow transition-colors">MX</span>·
          <span class="hover:text-brand-yellow transition-colors">PA</span>·
          <span class="hover:text-brand-yellow transition-colors">DO</span>
        </div>
      </header>

      <!-- ===== Stats Grid ===== -->
      <section class="w-full grid grid-cols-3 gap-2 px-1">
        <div class="bg-dark-900 border border-dark-stroke rounded-xl p-2.5 flex flex-col items-center justify-center text-center shadow-sm">
          <span class="font-mono text-sm font-bold text-foreground tracking-tight">0.8s</span>
          <span class="text-[10px] text-foreground-muted uppercase font-medium mt-0.5">Emisión Ticket</span>
        </div>
        <div class="bg-dark-900 border border-dark-stroke rounded-xl p-2.5 flex flex-col items-center justify-center text-center shadow-sm relative overflow-hidden">
          <div class="absolute top-0 right-0 w-1.5 h-1.5 bg-brand-yellow rounded-bl" />
          <span class="font-mono text-sm font-bold text-brand-yellow tracking-tight">67</span>
          <span class="text-[10px] text-foreground-muted uppercase font-medium mt-0.5">Jugadas Turf</span>
        </div>
        <div class="bg-dark-900 border border-dark-stroke rounded-xl p-2.5 flex flex-col items-center justify-center text-center shadow-sm">
          <span class="font-mono text-sm font-bold text-accent-emerald tracking-tight">100%</span>
          <span class="text-[10px] text-foreground-muted uppercase font-medium mt-0.5">Modo Offline</span>
        </div>
      </section>

      <!-- ===== Primary Link Cards ===== -->
      <section class="w-full flex flex-col gap-3 px-1">
        <template v-for="(item, i) in visibleLinks" :key="i">
          <!-- HERO card: gold glow + badge -->
          <a
            v-if="linkStyles[i] === 'hero'"
            :href="item.href"
            class="group relative block w-full bg-gradient-to-r from-dark-800 to-[#1d1e28] border-2 border-brand-yellow/70 hover:border-brand-yellow rounded-2xl p-4 transition-all duration-200 active:scale-[0.985] text-left"
            :class="[
              'shadow-[0_0_25px_-4px_rgba(255,199,26,0.28)]',
              'hover:shadow-[0_0_30px_-4px_rgba(255,199,26,0.35)]',
            ]"
          >
            <!-- Badge -->
            <div class="absolute -top-2.5 right-4 bg-brand-yellow text-dark-950 text-[9px] font-mono font-extrabold uppercase px-2 py-0.5 rounded-full tracking-wider shadow-md">
              {{ String(tm('linksPage.badgeMostChosen') || 'MÁS ELEGIDO') }}
            </div>
            <div class="flex items-center justify-between gap-3">
              <div class="flex items-center gap-3.5">
                <div class="w-11 h-11 rounded-xl bg-gradient-to-br from-amber-400/20 to-yellow-500/10 border border-brand-yellow/40 flex items-center justify-center text-xl shrink-0 group-hover:scale-105 transition-transform">
                  {{ item.icon }}
                </div>
                <div>
                  <h2 class="text-sm font-bold text-foreground group-hover:text-brand-yellow transition-colors flex items-center gap-1.5">
                    {{ item.label }}
                  </h2>
                  <p class="text-xs text-foreground-muted font-normal mt-0.5">
                    {{ item.micro }}
                  </p>
                </div>
              </div>
              <div class="text-brand-yellow text-base group-hover:translate-x-1 transition-transform shrink-0 pr-1">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
                  <path d="M9 5l7 7-7 7" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
              </div>
            </div>
          </a>

          <!-- WHATSAPP card: emerald accent -->
          <a
            v-else-if="linkStyles[i] === 'whatsapp'"
            :href="item.href"
            class="group relative block w-full bg-dark-900 hover:bg-[#121c17] border border-dark-stroke hover:border-accent-emerald/40 rounded-2xl p-4 transition-all duration-200 active:scale-[0.985] text-left shadow-[0_10px_30px_-10px_rgba(0,0,0,0.7)]"
            target="_blank"
            rel="noopener noreferrer"
          >
            <div class="flex items-center justify-between gap-3">
              <div class="flex items-center gap-3.5">
                <div class="w-11 h-11 rounded-xl bg-emerald-950/40 border border-accent-emerald/30 flex items-center justify-center text-xl shrink-0 group-hover:border-accent-emerald/60 transition-colors">
                  {{ item.icon }}
                </div>
                <div>
                  <div class="flex items-center gap-2">
                    <h2 class="text-sm font-bold text-foreground group-hover:text-accent-emerald transition-colors">
                      {{ item.label }}
                    </h2>
                    <span class="inline-flex items-center gap-1 text-[9px] font-mono font-semibold px-1.5 py-0.2 rounded bg-accent-emerald/15 text-accent-emerald border border-accent-emerald/30">
                      <span class="w-1.5 h-1.5 rounded-full bg-accent-emerald" /> ONLINE
                    </span>
                  </div>
                  <p class="text-xs text-foreground-muted font-normal mt-0.5">
                    Respondemos en minutos con ingenieros de turno
                  </p>
                </div>
              </div>
              <div class="text-accent-emerald group-hover:translate-x-1 transition-all shrink-0 pr-1">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                  <path d="M9 5l7 7-7 7" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
              </div>
            </div>
          </a>

          <!-- STANDARD card -->
          <a
            v-else
            :href="item.href"
            class="group relative block w-full bg-dark-900 hover:bg-dark-800 border border-dark-stroke hover:border-dark-stroke rounded-2xl p-4 transition-all duration-200 active:scale-[0.985] text-left shadow-[0_10px_30px_-10px_rgba(0,0,0,0.7)]"
          >
            <div class="flex items-center justify-between gap-3">
              <div class="flex items-center gap-3.5">
                <div class="w-11 h-11 rounded-xl bg-dark-800 border border-dark-stroke flex items-center justify-center text-xl shrink-0 group-hover:border-foreground-muted/30 transition-colors">
                  {{ item.icon }}
                </div>
                <div>
                  <div class="flex items-center gap-2">
                    <h2 class="text-sm font-bold text-foreground group-hover:text-foreground-subtle transition-colors">
                      {{ item.label }}
                    </h2>
                  </div>
                  <p class="text-xs text-foreground-muted font-normal mt-0.5">
                    {{ item.micro }}
                  </p>
                </div>
              </div>
              <div class="text-foreground-muted group-hover:text-foreground group-hover:translate-x-1 transition-all shrink-0 pr-1">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                  <path d="M9 5l7 7-7 7" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
              </div>
            </div>
          </a>
        </template>
      </section>

      <!-- ===== Secondary Features ===== -->
      <section class="w-full mt-2 px-1 flex flex-col gap-2.5">
        <div class="flex items-center justify-between px-1">
          <h3 class="text-[11px] font-mono uppercase tracking-wider text-foreground-muted font-semibold">
            Especificaciones &amp; Recursos
          </h3>
          <span class="text-[10px] font-mono text-brand-yellow">ENTERPRISE GRADE</span>
        </div>

        <!-- 2-column utility grid -->
        <div class="grid grid-cols-2 gap-2">
          <a class="flex flex-col p-3 rounded-xl bg-dark-900 border border-dark-stroke hover:border-dark-stroke text-left transition-colors" href="#simulator">
            <div class="flex items-center gap-1.5 mb-1">
              <span class="text-base">🏇</span>
              <span class="text-xs font-semibold text-foreground-subtle">Simulador</span>
            </div>
            <p class="text-[11px] text-foreground-muted leading-tight">Exacta, Trifecta, Pick 4/6 &amp; Tablas fijas</p>
          </a>
          <a class="flex flex-col p-3 rounded-xl bg-dark-900 border border-dark-stroke hover:border-dark-stroke text-left transition-colors" href="#rules">
            <div class="flex items-center gap-1.5 mb-1">
              <span class="text-base">⚙️</span>
              <span class="text-xs font-semibold text-foreground-subtle">Motor Premios</span>
            </div>
            <p class="text-[11px] text-foreground-muted leading-tight">Lógica por Hipódromo y Divisas</p>
          </a>
        </div>

        <!-- Hardware Badge -->
        <div class="w-full p-3 rounded-xl bg-dark-900/70 border border-dark-stroke/80 flex items-center justify-between text-left">
          <div class="flex items-center gap-2.5">
            <div class="w-7 h-7 rounded-lg bg-dark-800 border border-dark-stroke flex items-center justify-center text-sm">
              🖨️
            </div>
            <div>
              <div class="text-xs font-medium text-foreground-subtle">Soporte Térmico ESC/POS 58 &amp; 80mm</div>
              <div class="text-[10px] text-foreground-muted font-mono">Bluetooth, USB y Red local directa</div>
            </div>
          </div>
          <span class="text-[9px] font-mono font-bold text-accent-emerald bg-emerald-950/60 px-1.5 py-0.5 rounded border border-accent-emerald/20">READY</span>
        </div>
      </section>

      <!-- ===== Footer ===== -->
      <footer class="w-full mt-4 pt-6 border-t border-dark-stroke/60 flex flex-col items-center text-center gap-4 px-2">
        <!-- Social Icons Row -->
        <div class="flex items-center justify-center gap-4 text-foreground-muted">
          <!-- Telegram -->
          <a aria-label="Telegram" class="w-9 h-9 rounded-full bg-dark-900 border border-dark-stroke flex items-center justify-center hover:text-brand-yellow hover:border-brand-yellow/50 transition-colors" href="https://t.me/" target="_blank" rel="noopener noreferrer">
            <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .38z" />
            </svg>
          </a>
          <!-- X (Twitter) -->
          <a aria-label="X Twitter" class="w-9 h-9 rounded-full bg-dark-900 border border-dark-stroke flex items-center justify-center hover:text-brand-yellow hover:border-brand-yellow/50 transition-colors" href="https://x.com/" target="_blank" rel="noopener noreferrer">
            <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
          </a>
          <!-- LinkedIn -->
          <a aria-label="LinkedIn" class="w-9 h-9 rounded-full bg-dark-900 border border-dark-stroke flex items-center justify-center hover:text-brand-yellow hover:border-brand-yellow/50 transition-colors" href="https://linkedin.com/" target="_blank" rel="noopener noreferrer">
            <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
            </svg>
          </a>
          <!-- YouTube -->
          <a aria-label="YouTube" class="w-9 h-9 rounded-full bg-dark-900 border border-dark-stroke flex items-center justify-center hover:text-brand-yellow hover:border-brand-yellow/50 transition-colors" href="https://youtube.com/" target="_blank" rel="noopener noreferrer">
            <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
            </svg>
          </a>
        </div>

        <!-- Legal Text -->
        <div class="space-y-1">
          <p class="text-[11px] font-medium text-foreground-muted">
            BetKit Turf OS · Infraestructura B2B de Alta Disponibilidad
          </p>
          <p class="text-[10px] font-mono text-foreground-muted">
            Tecnología homologada para agencias hípicas &amp; remates en LATAM
          </p>
        </div>

        <!-- Security Badge -->
        <div class="inline-flex items-center gap-1.5 text-[9px] font-mono text-foreground-muted py-1 px-2.5 rounded-full bg-dark-900 border border-dark-stroke/50">
          <svg class="w-3 h-3 text-accent-emerald" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" />
          </svg>
          <span>CONEXIÓN CIFRADA TLS 1.3 · SERVIDORES DEDICADOS</span>
        </div>
      </footer>
    </main>
  </div>
</template>

<style scoped>
/* Animations from mockup */
@keyframes pulse-subtle {
  0%, 100% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.65; transform: scale(0.96); }
}
.animate-ping {
  animation: pulse-subtle 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}
</style>
