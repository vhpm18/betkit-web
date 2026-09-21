<script setup lang="ts">
const { t } = useI18n()
const page = usePageMessages<{ features: string[] }>('pricing')
const displayFont = "'Archivo Narrow', 'Archivo', sans-serif"

// Social proof metrics (SECTION 3) — accent tone per stat, content comes from i18n
const metricKeys = [
  { key: 'betTypes', accent: 'text-on-surface' },
  { key: 'latency', accent: 'text-primary-container' },
  { key: 'fixedCost', accent: 'text-on-surface' },
  { key: 'uptime', accent: 'text-tertiary-fixed' },
]

definePageMeta({ layout: 'default' })

useHead({
  title: () => t('hero.title', { highlight: t('hero.titleHighlight') }),
  meta: [
    { name: 'description', content: () => t('hero.subtitle') },
    { property: 'og:title', content: () => t('hero.title', { highlight: t('hero.titleHighlight') }) },
    { property: 'og:description', content: () => t('hero.subtitle') },
    { name: 'robots', content: 'index, follow' },
  ],
})
</script>

<template>
  <div class="min-h-screen bg-surface text-on-surface font-body">
    <!-- SECTION 1: Hero -->
    <section class="relative max-w-[1400px] mx-auto px-6 py-16 md:py-24 overflow-hidden hud-grid">
      <!-- Ambient glow behind hero -->
      <div class="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-brand-yellow/10 blur-[130px] rounded-full pointer-events-none z-0" aria-hidden="true"></div>
      <div class="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        <!-- Left Column -->
        <div class="lg:col-span-6 space-y-8">
          <div class="inline-flex items-center gap-2 bg-surface-container border border-outline-variant/20 rounded-full px-4 py-1.5">
            <span class="w-1.5 h-1.5 rounded-full bg-tertiary" aria-hidden="true" />
            <span class="font-mono text-[11px] tracking-wider text-primary-container font-semibold">{{ t('ticker.osVersion') }}</span>
            <span class="font-mono text-[11px] text-on-surface-variant" aria-hidden="true">|</span>
            <span class="font-mono text-[11px] text-on-surface-variant">{{ t('hero.badge') }}</span>
          </div>

          <h1 class="font-display text-4xl md:text-5xl lg:text-[3.4rem] font-black tracking-tight text-on-surface leading-[1.08] uppercase" :style="{ fontFamily: displayFont }">
            {{ t('hero.title', { highlight: '' }) }}
            <span class="text-primary-container">{{ t('hero.titleHighlight') }}.</span>
          </h1>

          <p class="text-lg text-on-surface-variant leading-relaxed max-w-xl">
            {{ t('hero.subtitle') }}
          </p>

          <div class="flex flex-col sm:flex-row gap-4">
            <a href="/demo" class="inline-flex items-center justify-center gap-2 bg-primary-container hover:bg-primary-fixed-dim text-on-primary-container font-bold rounded-xl px-7 py-3.5 text-sm sm:text-base tracking-tight transition-all shadow-lg shadow-brand-yellow/15 hover:shadow-brand-yellow/25 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-container focus-visible:ring-offset-2 focus-visible:ring-offset-surface">
              {{ t('hero.ctaPrimary') }}
              <Icon name="lucide:arrow-right" :size="16" class="text-on-primary-container" aria-hidden="true" />
            </a>
            <a href="/demo" class="inline-flex items-center justify-center gap-2 bg-surface-container-high hover:bg-surface-variant text-on-surface border border-outline-variant/30 font-semibold rounded-xl px-6 py-3.5 text-sm sm:text-base tracking-tight transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-container focus-visible:ring-offset-2 focus-visible:ring-offset-surface">
              <Icon name="lucide:play-circle" :size="20" class="text-primary-container" aria-hidden="true" />
              {{ t('hero.ctaSecondary') }}
            </a>
          </div>

          <div class="flex flex-wrap items-center gap-6 pt-4 text-xs font-mono text-on-surface-variant border-t border-outline-variant/20 w-full">
            <div class="flex items-center gap-2">
              <Icon name="lucide:badge-check" :size="16" class="text-tertiary" aria-hidden="true" />
              <span class="text-xs font-mono text-on-surface-variant">{{ t('common.noCreditCard') }}</span>
            </div>
            <div class="flex items-center gap-2">
              <Icon name="lucide:badge-check" :size="16" class="text-tertiary" aria-hidden="true" />
              <span class="text-xs font-mono text-on-surface-variant">{{ t('common.setup10Min') }}</span>
            </div>
            <div class="flex items-center gap-2">
              <Icon name="lucide:badge-check" :size="16" class="text-tertiary" aria-hidden="true" />
              <span class="text-xs font-mono text-on-surface-variant">{{ t('common.thermalHardware') }}</span>
            </div>
          </div>
        </div>

        <!-- Right Column: Terminal HUD -->
        <div class="lg:col-span-6">
          <div class="rounded-xl bg-surface-container-lowest border border-outline-variant/20 overflow-hidden shadow-2xl shadow-black/40">
            <!-- Window Chrome -->
            <div class="flex items-center justify-between px-4 py-2.5 bg-surface-container border-b border-outline-variant/20">
              <div class="flex items-center gap-1.5">
                <span class="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                <span class="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                <span class="w-2.5 h-2.5 rounded-full bg-tertiary/80" />
              </div>
              <span class="font-mono text-[10px] tracking-wider text-on-surface-variant">BETKIT_TERMINAL // AGENCIA CENTRAL #04</span>
              <span class="w-16" />
            </div>

            <!-- Race Header -->
            <div class="flex items-center justify-between px-5 py-3 bg-surface border-b border-outline-variant/20">
              <div class="flex items-center gap-3">
                <span class="font-display text-lg font-black text-primary-container uppercase">R7</span>
                <div>
                  <p class="font-sans text-xs font-semibold text-on-surface">La Rinconada</p>
                  <p class="font-mono text-[10px] text-on-surface-variant">1,400 Metros • Clásico Simón Bolívar</p>
                </div>
              </div>
              <div class="text-right">
                <p class="font-mono text-[10px] text-on-surface-variant uppercase">Tiempo Cierre</p>
                <p class="font-mono text-xs font-bold text-primary-container">03:42 min</p>
              </div>
            </div>

            <!-- Runners Table -->
            <div class="px-5 py-4 space-y-0">
              <!-- Table Header -->
              <div class="grid grid-cols-[32px_1fr_64px_56px_36px] gap-2 items-center px-2 pb-2 border-b border-outline-variant/20">
                <span class="font-mono text-[9px] text-on-surface-variant uppercase">#</span>
                <span class="font-mono text-[9px] text-on-surface-variant uppercase">Ejemplar / Jinete</span>
                <span class="font-mono text-[9px] text-on-surface-variant uppercase text-right">Div.</span>
                <span class="font-mono text-[9px] text-on-surface-variant uppercase text-right">Pool</span>
                <span class="font-mono text-[9px] text-on-surface-variant uppercase text-center">Box</span>
              </div>
              <!-- Row 1 — Active -->
              <div class="grid grid-cols-[32px_1fr_64px_56px_36px] gap-2 items-center px-2 py-2.5 bg-primary-container/5 rounded-lg border border-primary-container/20 -mx-1">
                <span class="font-mono text-xs text-primary-container font-semibold">1</span>
                <div class="min-w-0">
                  <p class="font-sans text-xs text-on-surface font-medium">Gran Tornado</p>
                  <p class="font-sans text-[10px] text-on-surface-variant">J: E. Jaramillo (54kg)</p>
                </div>
                <span class="font-mono text-xs text-primary-container text-right font-semibold">2.80</span>
                <span class="font-mono text-[10px] text-on-surface-variant text-right">$18,450</span>
                <div class="flex justify-center">
                  <span class="w-4 h-4 rounded bg-primary-container text-on-primary-container flex items-center justify-center">
                    <Icon name="lucide:check" :size="12" class="text-on-primary-container" aria-hidden="true" />
                  </span>
                </div>
              </div>
              <!-- Row 2 — FAV -->
              <div class="grid grid-cols-[32px_1fr_64px_56px_36px] gap-2 items-center px-2 py-2.5 bg-primary-container/[0.03] -mx-1">
                <span class="font-mono text-xs text-primary-container font-semibold">3</span>
                <div class="min-w-0">
                  <p class="font-sans text-xs text-primary-container font-medium flex items-center gap-1.5">
                    Rey de Copas
                    <span class="font-mono text-[9px] font-bold text-primary-container bg-primary-container/20 rounded px-1 py-0.2">FAV</span>
                  </p>
                  <p class="font-sans text-[10px] text-on-surface-variant">J: J. Lugo (56kg)</p>
                </div>
                <span class="font-mono text-xs text-primary-container text-right font-semibold">1.95</span>
                <span class="font-mono text-[10px] text-on-surface-variant text-right">$42,900</span>
                <div class="flex justify-center">
                  <span class="w-4 h-4 rounded bg-primary-container text-on-primary-container flex items-center justify-center">
                    <Icon name="lucide:check" :size="12" class="text-on-primary-container" aria-hidden="true" />
                  </span>
                </div>
              </div>
              <!-- Row 3 -->
              <div class="grid grid-cols-[32px_1fr_64px_56px_36px] gap-2 items-center px-2 py-2.5 -mx-1">
                <span class="font-mono text-xs text-on-surface-variant">5</span>
                <div class="min-w-0">
                  <p class="font-sans text-xs text-on-surface">Bella Dama</p>
                  <p class="font-sans text-[10px] text-on-surface-variant">J: R. Capriles (52kg)</p>
                </div>
                <span class="font-mono text-xs text-on-surface-variant text-right font-medium">4.10</span>
                <span class="font-mono text-[10px] text-on-surface-variant text-right">$12,300</span>
                <div class="flex justify-center">
                  <span class="w-4 h-4 rounded bg-primary-container text-on-primary-container flex items-center justify-center">
                    <Icon name="lucide:check" :size="12" class="text-on-primary-container" aria-hidden="true" />
                  </span>
                </div>
              </div>
            </div>

            <!-- Bet Slip -->
            <div class="mx-5 mb-4 rounded-xl bg-surface-container border border-outline-variant/20 p-4 space-y-3">
              <div class="flex items-center justify-between gap-2">
                <span class="font-mono text-[10px] tracking-wider text-on-surface-variant uppercase">Apuesta Seleccionada:</span>
                <span class="font-mono text-[10px] text-primary-container uppercase font-semibold">Trifecta Box (#1, #3, #5)</span>
              </div>
              <div class="flex items-center justify-between pt-2 border-t border-outline-variant/20">
                <span class="font-mono text-[10px] text-on-surface-variant">COMBINACIONES: <span class="text-on-surface font-bold">6</span></span>
                <span class="font-mono text-[10px] text-on-surface-variant">TOTAL APUESTA: <span class="text-tertiary font-bold">$12.00 USD</span></span>
              </div>
              <div class="flex items-center gap-3">
                <button class="flex-1 bg-surface-container-low border border-outline-variant/20 text-on-surface-variant font-mono text-[10px] rounded-lg py-2 transition-colors">
                  Hotkeys F1..F8
                </button>
                <button class="flex-1 bg-primary-container hover:bg-primary-fixed-dim text-on-primary-container font-bold font-mono text-[10px] rounded-lg py-2 transition-colors flex items-center justify-center gap-1.5">
                  <Icon name="lucide:printer" :size="14" class="text-on-primary-container" aria-hidden="true" />
                  Emitir Ticket 80mm
                </button>
              </div>
            </div>

            <!-- Status Bar -->
            <div class="flex items-center justify-between px-5 py-2 bg-surface-container-lowest border-t border-outline-variant/20">
              <span class="flex items-center gap-1.5">
                <span class="w-1.5 h-1.5 rounded-full bg-tertiary" aria-hidden="true" />
                <span class="font-mono text-[9px] text-on-surface-variant">Buffer Térmico Listo • QR SHA-256</span>
              </span>
              <span class="font-mono text-[9px] font-semibold text-on-surface-variant">SLA Impr: 0.8s</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- SECTION 3: Social Proof Metrics -->
    <section class="bg-surface-container-lowest py-12 md:py-16">
      <div class="max-w-[1400px] mx-auto px-4 sm:px-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div
          v-for="m in metricKeys"
          :key="m.key"
          class="bg-surface-container p-6 flex flex-col gap-3 rounded-xl border border-outline-variant/20 hover:border-primary-container/60 hover:bg-surface-container-high transition-all"
        >
          <div class="flex items-center justify-between">
            <span class="font-mono text-[10px] text-on-surface-variant uppercase tracking-widest">{{ t(`metrics.${m.key}.kicker`) }}</span>
            <Icon :name="t(`metrics.${m.key}.icon`)" :size="20" :class="m.accent" aria-hidden="true" />
          </div>
          <div>
            <p class="font-display text-4xl md:text-5xl font-black tracking-tight" :class="m.accent">{{ t(`metrics.${m.key}.number`) }}</p>
            <p class="font-sans text-sm font-medium text-on-surface mt-1">{{ t(`metrics.${m.key}.label`) }}</p>
            <p class="font-mono text-xs text-on-surface-variant mt-2">{{ t(`metrics.${m.key}.desc`) }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- SECTION 4: Three Pillars -->
    <section id="pilares" class="bg-surface py-24 md:py-32">
      <div class="max-w-[1400px] mx-auto px-4 sm:px-8 flex flex-col gap-16">
        <!-- Header -->
        <div class="flex flex-col gap-3 max-w-2xl">
          <div class="inline-flex items-center gap-2 text-primary-container font-mono text-xs uppercase tracking-wider font-semibold">
            <span class="w-1.5 h-1.5 rounded-full bg-primary-container" aria-hidden="true" />
            {{ t('pillars.sectionLabel') }}
          </div>
          <h2 class="font-display font-bold text-3xl sm:text-4xl text-on-surface uppercase tracking-tight leading-tight" :style="{ fontFamily: displayFont }">
            {{ t('pillars.title') }}
          </h2>
          <p class="text-on-surface-variant text-base leading-relaxed">{{ t('pillars.desc') }}</p>
        </div>

        <!-- Pillars Grid -->
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <!-- Card 1: Terminal Multi-Taquilla (Row 1: Span 7) -->
          <div class="lg:col-span-7 rounded-xl bg-surface-container border border-primary-container/30 shadow-lg shadow-primary-container/5 p-8 md:p-10 flex flex-col justify-between gap-8">
            <div class="flex flex-col gap-5">
              <div class="flex items-center justify-between">
                <div class="w-12 h-12 rounded-xl bg-primary-container/10 border border-primary-container/25 flex items-center justify-center text-primary-container">
                  <Icon name="lucide:store" :size="26" aria-hidden="true" />
                </div>
                <span class="text-[10px] font-mono text-on-surface-variant bg-surface-container-low border border-outline-variant/20 px-2.5 py-1 rounded font-semibold">{{ t('pillars.terminal.module') }}</span>
              </div>
              <div class="flex flex-col gap-2 max-w-xl">
                <h3 class="font-display font-bold text-2xl uppercase tracking-tight text-on-surface" :style="{ fontFamily: displayFont }">{{ t('pillars.terminal.shortTitle') }}</h3>
                <p class="text-on-surface-variant text-sm sm:text-base leading-relaxed">{{ t('pillars.terminal.shortDesc') }}</p>
              </div>
            </div>
            <ul class="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-on-surface-variant pt-6 border-t border-outline-variant/20 font-mono">
              <li class="flex items-center gap-2">
                <Icon name="lucide:check-circle" :size="16" class="text-primary-container shrink-0" aria-hidden="true" />
                <span>{{ t('pillars.terminal.feature1') }}</span>
              </li>
              <li class="flex items-center gap-2">
                <Icon name="lucide:check-circle" :size="16" class="text-primary-container shrink-0" aria-hidden="true" />
                <span>{{ t('pillars.terminal.feature2') }}</span>
              </li>
              <li class="flex items-center gap-2">
                <Icon name="lucide:check-circle" :size="16" class="text-primary-container shrink-0" aria-hidden="true" />
                <span>{{ t('pillars.terminal.feature3') }}</span>
              </li>
            </ul>
          </div>

          <!-- Card 2: Motor Pari-Mutuel (Row 1: Span 5) -->
          <div class="lg:col-span-5 rounded-xl bg-surface-container border border-primary-container/30 p-8 md:p-10 flex flex-col justify-between gap-8 relative shadow-lg shadow-primary-container/5">
            <div class="absolute top-6 right-6 bg-primary-container/10 text-primary-container text-[10px] font-mono font-bold px-2.5 py-0.5 rounded border border-primary-container/20">{{ t('pillars.motor.module') }}</div>
            <div class="flex flex-col gap-5">
              <div class="w-12 h-12 rounded-xl bg-primary-container/15 border border-primary-container/40 flex items-center justify-center text-primary-container">
                <Icon name="lucide:zap" :size="26" aria-hidden="true" />
              </div>
              <div class="flex flex-col gap-2">
                <h3 class="font-display font-bold text-xl sm:text-2xl uppercase tracking-tight text-on-surface" :style="{ fontFamily: displayFont }">{{ t('pillars.motor.shortTitle') }}</h3>
                <p class="text-on-surface-variant text-sm leading-relaxed">{{ t('pillars.motor.shortDesc') }}</p>
              </div>
            </div>
            <ul class="flex flex-col gap-2.5 text-xs text-on-surface-variant pt-6 border-t border-outline-variant/20 font-mono">
              <li class="flex items-center gap-2">
                <Icon name="lucide:check-circle" :size="16" class="text-primary-container shrink-0" aria-hidden="true" />
                <span>{{ t('pillars.motor.feature1') }}</span>
              </li>
              <li class="flex items-center gap-2">
                <Icon name="lucide:check-circle" :size="16" class="text-primary-container shrink-0" aria-hidden="true" />
                <span>{{ t('pillars.motor.feature2') }}</span>
              </li>
              <li class="flex items-center gap-2">
                <Icon name="lucide:check-circle" :size="16" class="text-primary-container shrink-0" aria-hidden="true" />
                <span>{{ t('pillars.motor.feature3') }}</span>
              </li>
            </ul>
          </div>

          <!-- Card 3: Impresión Térmica (Row 2: Span 5) -->
          <div class="lg:col-span-5 rounded-xl bg-surface-container border border-primary-container/30 p-8 md:p-10 flex flex-col justify-between gap-8 relative shadow-lg shadow-primary-container/5">
            <div class="flex flex-col gap-5">
              <div class="w-12 h-12 rounded-xl bg-tertiary-container/10 border border-tertiary-container/25 flex items-center justify-center text-tertiary-container">
                <Icon name="lucide:receipt" :size="26" aria-hidden="true" />
              </div>
              <div class="flex flex-col gap-2">
                <h3 class="font-display font-bold text-xl sm:text-2xl uppercase tracking-tight text-on-surface" :style="{ fontFamily: displayFont }">{{ t('pillars.printing.shortTitle') }}</h3>
                <p class="text-on-surface-variant text-sm leading-relaxed">{{ t('pillars.printing.shortDesc') }}</p>
              </div>
            </div>
            <ul class="flex flex-col gap-2.5 text-xs text-on-surface-variant pt-6 border-t border-outline-variant/20 font-mono">
              <li class="flex items-center gap-2">
                <Icon name="lucide:check-circle" :size="16" class="text-primary-container shrink-0" aria-hidden="true" />
                <span>{{ t('pillars.printing.feature1') }}</span>
              </li>
              <li class="flex items-center gap-2">
                <Icon name="lucide:check-circle" :size="16" class="text-primary-container shrink-0" aria-hidden="true" />
                <span>{{ t('pillars.printing.feature2') }}</span>
              </li>
              <li class="flex items-center gap-2">
                <Icon name="lucide:check-circle" :size="16" class="text-primary-container shrink-0" aria-hidden="true" />
                <span>{{ t('pillars.printing.feature3') }}</span>
              </li>
            </ul>
          </div>

          <!-- Card 4: Auditoría SHA-256 (Row 2: Span 7) -->
          <div class="lg:col-span-7 rounded-xl bg-surface-container border border-primary-container/30 shadow-lg shadow-primary-container/5 p-8 md:p-10 flex flex-col justify-between gap-8">
            <div class="flex flex-col gap-5">
              <div class="flex items-center justify-between">
                <div class="w-12 h-12 rounded-xl bg-primary-container/10 border border-primary-container/25 flex items-center justify-center text-primary-container">
                  <Icon name="lucide:shield-check" :size="26" aria-hidden="true" />
                </div>
                <span class="text-[10px] font-mono text-on-surface-variant bg-surface-container-low border border-outline-variant/20 px-2.5 py-1 rounded font-semibold">{{ t('pillars.audit.module') }}</span>
              </div>
              <div class="flex flex-col gap-2 max-w-xl">
                <h3 class="font-display font-bold text-2xl uppercase tracking-tight text-on-surface" :style="{ fontFamily: displayFont }">{{ t('pillars.audit.shortTitle') }}</h3>
                <p class="text-on-surface-variant text-sm sm:text-base leading-relaxed">{{ t('pillars.audit.shortDesc') }}</p>
              </div>
            </div>
            <ul class="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-on-surface-variant pt-6 border-t border-outline-variant/20 font-mono">
              <li class="flex items-center gap-2">
                <Icon name="lucide:check-circle" :size="16" class="text-primary-container shrink-0" aria-hidden="true" />
                <span>{{ t('pillars.audit.feature1') }}</span>
              </li>
              <li class="flex items-center gap-2">
                <Icon name="lucide:check-circle" :size="16" class="text-primary-container shrink-0" aria-hidden="true" />
                <span>{{ t('pillars.audit.feature2') }}</span>
              </li>
              <li class="flex items-center gap-2">
                <Icon name="lucide:check-circle" :size="16" class="text-primary-container shrink-0" aria-hidden="true" />
                <span>{{ t('pillars.audit.feature3') }}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <!-- SECTION 5: Pricing -->
    <section id="modelo-riesgo-cero" class="bg-surface-container-lowest py-20 md:py-28">
      <div class="max-w-[1400px] mx-auto px-4 sm:px-8">
        <div class="rounded-xl bg-surface-container shadow-2xl shadow-black/40 p-8 md:p-14 overflow-hidden relative">
          <div class="absolute top-0 left-0 right-0 h-1 bg-linear-to-r from-transparent via-primary-container to-transparent" aria-hidden="true"></div>
          <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
            <!-- Left: Info -->
            <div class="lg:col-span-7 flex flex-col gap-5">
              <div class="inline-flex items-center gap-2 text-primary-container font-mono text-xs uppercase font-semibold">
                <span class="w-2 h-2 rounded-full bg-primary-container" aria-hidden="true" />
                {{ t('pricing.sectionLabel') }}
              </div>
              <h2 class="font-display text-3xl sm:text-4xl font-black text-on-surface tracking-tight uppercase leading-tight" :style="{ fontFamily: displayFont }">
                {{ t('pricing.title', { price: t('pricing.titlePrice') }) }}
              </h2>
              <p class="text-on-surface-variant text-base leading-relaxed">{{ t('pricing.desc') }}</p>
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs font-mono text-on-surface-variant">
                <div v-for="(feature, i) in page.features" :key="i" class="flex items-center gap-2.5 bg-surface-container-lowest p-2.5 rounded-lg border border-outline-variant/20">
                  <Icon name="lucide:circle-check" :size="14" class="text-primary-container shrink-0" aria-hidden="true" />
                  <span>{{ feature }}</span>
                </div>
              </div>
            </div>

            <!-- Right: Price Card -->
            <div class="lg:col-span-5 flex flex-col items-center justify-center p-8 bg-surface-container-lowest rounded-xl border border-outline-variant/30 text-center gap-4 relative overflow-hidden">
              <div class="absolute top-0 left-0 right-0 h-1 bg-linear-to-r from-transparent via-primary-container to-transparent" aria-hidden="true"></div>
              <span class="text-xs font-mono uppercase text-on-surface-variant tracking-wider font-semibold">{{ t('pricing.fixedLabel') }}</span>
              <p class="font-display font-black text-6xl text-on-surface tracking-tight">
                {{ t('pricing.fixedPrice') }}<span class="text-primary-container text-2xl font-mono">{{ t('pricing.fixedUnit') }}</span>
              </p>
              <p class="text-xs text-on-surface-variant max-w-xs font-mono leading-relaxed">{{ t('pricing.fixedDesc') }}</p>
              <NuxtLinkLocale to="/demo" class="inline-flex items-center w-full justify-center gap-2 rounded-lg bg-primary-container hover:bg-primary-fixed-dim text-on-primary-container font-bold uppercase tracking-wider text-base px-8 py-4 transition-all shadow-[0_0_20px_rgba(255,199,26,0.3)] font-display" :style="{ fontFamily: displayFont }">
                {{ t('pricing.cta') }}
              </NuxtLinkLocale>
              <span class="text-[11px] font-mono text-on-surface-variant">{{ t('pricing.migration') }}</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- SECTION 6: Vendedores / Banqueros CTA -->
    <section id="vendedores" class="bg-surface-container-lowest py-20 md:py-28">
      <div class="max-w-[1400px] mx-auto px-4 sm:px-8">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
          <!-- Left: Dueños y Banqueros -->
          <div class="p-8 md:p-10 rounded-xl bg-surface-container shadow-xl flex flex-col justify-between gap-6">
            <div class="flex flex-col gap-4">
              <div class="flex items-center justify-between">
                <span class="text-xs font-mono text-primary-container font-bold uppercase bg-primary-container/10 px-2.5 py-1 rounded border border-primary-container/20">
                  {{ t('home.banqueros.badge') }}
                </span>
                <Icon name="lucide:landmark" :size="24" class="text-on-surface-variant" aria-hidden="true" />
              </div>
              <h3 class="font-display text-2xl font-bold text-on-surface tracking-tight uppercase" :style="{ fontFamily: displayFont }">
                {{ t('home.banqueros.title') }}
              </h3>
              <p class="text-on-surface-variant text-sm leading-relaxed">
                {{ t('home.banqueros.desc') }}
              </p>
            </div>
            <NuxtLinkLocale to="/banqueros" class="inline-flex items-center justify-center gap-2 rounded-lg bg-primary-container hover:bg-primary-fixed-dim text-on-primary-container font-bold uppercase tracking-wider text-base px-8 py-4 transition-all shadow-[0_0_20px_rgba(255,199,26,0.3)] font-display" :style="{ fontFamily: displayFont }">
              {{ t('home.banqueros.cta') }}
              <Icon name="lucide:arrow-right" :size="18" aria-hidden="true" />
            </NuxtLinkLocale>
          </div>

          <!-- Right: Programa de Expansión -->
          <div class="p-8 md:p-10 rounded-xl bg-surface-container shadow-xl flex flex-col justify-between gap-6">
            <div class="flex flex-col gap-4">
              <div class="flex items-center justify-between">
                <span class="text-xs font-mono text-tertiary-container font-bold uppercase bg-tertiary-container/10 px-2.5 py-1 rounded border border-tertiary-container/20">
                  {{ t('home.expansion.badge') }}
                </span>
                <Icon name="lucide:users" :size="24" class="text-on-surface-variant" aria-hidden="true" />
              </div>
              <h3 class="font-display text-2xl font-bold text-on-surface tracking-tight uppercase" :style="{ fontFamily: displayFont }">
                {{ t('home.expansion.title') }}
              </h3>
              <p class="text-on-surface-variant text-sm leading-relaxed">
                {{ t('home.expansion.desc') }}
              </p>
            </div>
            <NuxtLinkLocale to="/sellers" class="inline-flex items-center justify-center gap-2 rounded-lg bg-surface-container-highest hover:bg-surface-bright text-on-surface font-bold uppercase tracking-wider text-base px-8 py-4 transition-all font-display" :style="{ fontFamily: displayFont }">
              {{ t('home.expansion.cta') }}
              <Icon name="lucide:message-circle" :size="18" aria-hidden="true" />
            </NuxtLinkLocale>
          </div>
        </div>
      </div>
    </section>

  </div>
</template>
