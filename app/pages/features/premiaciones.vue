<script setup lang="ts">
const displayFont = "'Archivo Narrow', 'Archivo', sans-serif"
const page = usePageMessages<{
  fullTitle: string
  fullDesc: string
  telemetry: { label: string, regions: string, item1: string, item2: string }
  hero: {
    pill: string
    title: string
    desc: string
    ctaSimulator: string
    ctaDocs: string
    stats: Array<{ label: string, value: string, unit: string, tone?: string }>
  }
  simulator: {
    kicker: string
    title: string
    traceChip: string
    paramsLabel: string
    paramsBadge: string
    trackLabel: string
    tracks: Array<{ value: string, cap: number, label: string }>
    betTypeLabel: string
    betTypes: Array<{ value: string, factor: number, label: string }>
    runnersLabel: string
    runnersSuffix: string
    runnersMin: number
    runnersMax: number
    runnersDefault: number
    tierMin: string
    tierA: string
    tierB: string
    tierMax: string
    dividendLabel: string
    stakeLabel: string
    presetsLabel: string
    presets: number[]
    cap: { icon: string, label: string, active: string, template: string }
    engine: {
      label: string
      execLabel: string
      trace: Array<{ num: string, label: string, key: string }>
      finalLabel: string
      unit: string
      recalculate: string
      agencyLabel: string
    }
  }
  features: {
    kicker: string
    title: string
    desc: string
    cards: Array<{ icon: string, rule: string, title: string, desc: string, footer: string }>
    wide: { icon: string, title: string, badge: string, desc: string, footerLabel: string, footerValue: string }
  }
  templates: {
    kicker: string
    title: string
    desc: string
    cta: string
    cards: Array<{ id: string, title: string, code: string, desc: string, features: string[] }>
  }
  audit: {
    kicker: string
    title: string
    desc: string
    checks: Array<{ icon: string, label: string }>
    panelLabel: string
    panelBadge: string
    chartLabel: string
    chartSub: string
    chartTimes: string[]
    chartNow: string
    stats: Array<{ label: string, value: string, tone?: string }>
  }
  cta: {
    kicker: string
    title: string
    desc: string
    primary: string
    secondary: string
    micro: string[]
  }
}>('features.premiaciones')

// === Prize simulator state (S1) ===
const RETENTION_RATE = 0.12

const simTrack = ref(0)
const simBetType = ref(0)
const simRunners = ref(12)
const simDividend = ref(142.5)
const simStake = ref(10)

const activeTrack = computed(() => page.simulator.tracks[simTrack.value])
const activeBet = computed(() => page.simulator.betTypes[simBetType.value])
const maxCap = computed(() => activeTrack.value.cap)

const execTimer = computed(() => ((Math.random() * (14.2 - 8.8)) + 8.8).toFixed(1))

const capConfigLabel = computed(() =>
  page.simulator.cap.template
    .replace('{track}', activeTrack.value.label.split('(')[0].trim())
    .replace('{cap}', maxCap.value.toLocaleString()),
)

const grossPayout = computed(() => simStake.value * simDividend.value)
const retentionAmount = computed(() => grossPayout.value * RETENTION_RATE)
const netCalculated = computed(() => {
  const net = grossPayout.value - retentionAmount.value
  return net > maxCap.value ? maxCap.value : net
})
const capApplied = computed(() => grossPayout.value - retentionAmount.value > maxCap.value)
const agencyCommission = computed(() => (simStake.value * 0.08) + (retentionAmount.value * 0.4))

const traceRuleMatch = computed(() => `${activeTrack.value.value}-${activeBet.value.value.toUpperCase()} (${simRunners.value} Corredores)`)
const traceFactor = computed(() => `Monto $${simStake.value.toFixed(2)} × Modalidad ${activeBet.value.label.split('(')[0]}`)
const traceRawPayout = computed(() => `$${simStake.value.toFixed(2)} × $${simDividend.value.toFixed(2)} = $${grossPayout.value.toFixed(2)}`)
const traceRetention = computed(() => `- $${retentionAmount.value.toFixed(2)} (12% Takeout)`)
const traceCapEvaluation = computed(() => capApplied.value
  ? `Límite: $${maxCap.value.toLocaleString()}.00 (TOPE ACTIVADO)`
  : `Límite: $${maxCap.value.toLocaleString()}.00 (SIN RECORTE)`,
)
const capStatusSubtext = computed(() => capApplied.value
  ? `¡Tope de riesgo aplicado! Monto acotado por balance institucional a $${maxCap.value.toLocaleString()} USD`
  : `Protección activada: Payout máximo $${maxCap.value.toLocaleString()} USD`,
)

const finalPayoutDisplay = computed(() => '$' + netCalculated.value.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }))

function setPreset(amount: number) {
  simStake.value = amount
}

// === Template loader (S3) ===
function loadTemplate(trackCode: string) {
  const idx = page.simulator.tracks.findIndex((t) => t.value === trackCode)
  if (idx === -1) return
  simTrack.value = idx
  if (trackCode === 'HSI') {
    simBetType.value = page.simulator.betTypes.findIndex((b) => b.value === 'trifecta_box')
    simRunners.value = 14
    simDividend.value = 180
  }
  else if (trackCode === 'LRN') {
    simBetType.value = page.simulator.betTypes.findIndex((b) => b.value === 'ganador')
    simRunners.value = 10
    simDividend.value = 45.2
  }
  else if (trackCode === 'MAR') {
    simBetType.value = page.simulator.betTypes.findIndex((b) => b.value === 'cuatrifecta')
    simRunners.value = 16
    simDividend.value = 320
  }
}

// === Trace log rows (S1) ===
const traceRows = computed(() => [
  { num: page.simulator.engine.trace[0].num, label: page.simulator.engine.trace[0].label, value: traceRuleMatch.value, error: false },
  { num: page.simulator.engine.trace[1].num, label: page.simulator.engine.trace[1].label, value: traceFactor.value, error: false },
  { num: page.simulator.engine.trace[2].num, label: page.simulator.engine.trace[2].label, value: traceRawPayout.value, error: false },
  { num: page.simulator.engine.trace[3].num, label: page.simulator.engine.trace[3].label, value: traceRetention.value, error: true },
  { num: page.simulator.engine.trace[4].num, label: page.simulator.engine.trace[4].label, value: traceCapEvaluation.value, error: false, cap: capApplied.value },
])

useHead({
  title: page.fullTitle,
  meta: [
    { name: 'description', content: page.fullDesc },
    { name: 'robots', content: 'index, follow' },
  ],
})
</script>

<template>
  <div class="font-body">
    <!-- S0: Top Telemetry Bar -->
    <section class="relative w-full bg-surface-container-lowest px-4 sm:px-8 lg:px-12 py-5">
      <div class="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div class="flex items-center gap-3">
          <span class="relative flex h-2.5 w-2.5">
            <span class="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary-container opacity-60" aria-hidden="true"></span>
            <span class="relative inline-flex rounded-full h-2.5 w-2.5 bg-primary-container" aria-hidden="true"></span>
          </span>
          <span class="font-mono text-[11px] font-medium uppercase tracking-[0.15em] text-primary-container">{{ page.telemetry.label }}</span>
          <span class="text-outline-variant" aria-hidden="true">/</span>
          <span class="font-mono text-[11px] text-on-surface-variant">{{ page.telemetry.regions }}</span>
        </div>
        <div class="flex flex-wrap items-center gap-x-6 gap-y-2 font-mono text-[11px] text-on-surface-variant">
          <div class="flex items-center gap-1.5">
            <Icon name="lucide:gauge" :size="16" class="text-tertiary-fixed" aria-hidden="true" />
            <span class="text-on-surface">{{ page.telemetry.item1 }}</span>
          </div>
          <div class="hidden sm:flex items-center gap-1.5">
            <Icon name="lucide:trophy" :size="16" class="text-primary-container" aria-hidden="true" />
            <span>{{ page.telemetry.item2 }}</span>
          </div>
        </div>
      </div>
    </section>

    <!-- S0: Overview Hero -->
    <section class="relative w-full bg-surface-container-lowest px-4 lg:px-12 pt-16 pb-16 overflow-hidden hud-grid">
      <!-- Ambient glow behind hero -->
      <div class="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-brand-yellow/10 blur-[130px] rounded-full pointer-events-none z-0" aria-hidden="true"></div>
      <div class="absolute inset-0 bg-gradient-to-b from-surface-container-low/40 via-surface-container-lowest to-surface-container-lowest pointer-events-none" aria-hidden="true"></div>
      <div class="absolute top-0 right-1/4 w-96 h-96 bg-primary-container/5 rounded-full blur-3xl pointer-events-none" aria-hidden="true"></div>
      <div class="relative w-full max-w-7xl mx-auto flex flex-col gap-8">
        <!-- Status pill -->
        <div class="inline-flex items-center gap-2 self-start px-3 py-1.5 bg-surface-container-high rounded">
          <span class="w-1.5 h-1.5 rounded-full bg-primary-container animate-pulse" aria-hidden="true"></span>
          <span class="font-mono text-[11px] text-primary-container uppercase tracking-wider">{{ page.hero.pill }}</span>
        </div>
        <!-- Title & CTA grid -->
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
          <div class="lg:col-span-8 flex flex-col gap-4">
            <h1 class="font-display text-4xl md:text-5xl font-black text-on-surface uppercase tracking-tight leading-[1.08]" :style="{ fontFamily: displayFont }">
              {{ page.hero.title }}
            </h1>
            <p class="text-lg text-secondary max-w-3xl leading-relaxed">
              {{ page.hero.desc }}
            </p>
          </div>
          <div class="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-2 justify-end">
            <NuxtLinkLocale
              to="#simulador"
              class="w-full bg-primary-container hover:bg-primary-fixed-dim text-on-primary-container font-bold text-sm uppercase px-6 py-3.5 text-center tracking-wide transition-all shadow-[0_2px_16px_rgba(255,199,26,0.18)] flex items-center justify-center gap-2 rounded-lg font-display"
              :style="{ fontFamily: displayFont }"
            >
              <Icon name="lucide:play-circle" :size="20" aria-hidden="true" />
              <span>{{ page.hero.ctaSimulator }}</span>
            </NuxtLinkLocale>
            <NuxtLinkLocale
              to="#plantillas"
              class="w-full bg-surface-container hover:bg-surface-container-high text-on-surface font-bold text-sm uppercase px-6 py-3.5 text-center tracking-wide transition-colors flex items-center justify-center gap-2 rounded-lg font-display"
              :style="{ fontFamily: displayFont }"
            >
              <Icon name="lucide:book-open" :size="20" aria-hidden="true" />
              <span>{{ page.hero.ctaDocs }}</span>
            </NuxtLinkLocale>
          </div>
        </div>
        <!-- Telemetry strip -->
        <div class="grid grid-cols-2 md:grid-cols-4 gap-2 pt-4 mt-4 bg-surface-container/60 p-4 rounded-lg">
          <div v-for="(stat, i) in page.hero.stats" :key="i" class="flex flex-col">
            <span class="font-mono text-[10px] text-secondary uppercase">{{ stat.label }}</span>
            <span class="font-display text-xl md:text-2xl font-bold" :style="{ fontFamily: displayFont }" :class="stat.tone === 'primary' ? 'text-primary-container' : 'text-on-surface'">
              {{ stat.value }}
              <span v-if="stat.unit" class="font-mono text-xs text-primary-container font-normal">{{ stat.unit }}</span>
            </span>
          </div>
        </div>
      </div>
    </section>

    <!-- S1: Interactive Simulator -->
    <section class="w-full bg-surface px-4 lg:px-12 py-16 lg:py-20 scroll-mt-24" id="simulador">
      <div class="w-full max-w-7xl mx-auto flex flex-col gap-8">
        <div class="flex flex-col md:flex-row md:items-end justify-between gap-2">
          <div class="flex flex-col">
            <span class="font-mono text-[11px] text-primary-container uppercase">{{ page.simulator.kicker }}</span>
            <h2 class="font-display text-3xl md:text-4xl font-black uppercase text-on-surface tracking-tight" :style="{ fontFamily: displayFont }">
              {{ page.simulator.title }}
            </h2>
          </div>
          <div class="flex items-center gap-2 px-3 py-1.5 bg-surface-container rounded self-start md:self-auto">
            <span class="w-2 h-2 rounded-full bg-primary-container animate-ping" aria-hidden="true"></span>
            <span class="font-mono text-[10px] text-secondary uppercase">{{ page.simulator.traceChip }}</span>
          </div>
        </div>

        <!-- Sandbox terminal -->
        <div class="w-full grid grid-cols-1 lg:grid-cols-12 gap-4">
          <!-- Left: params -->
          <div class="lg:col-span-5 bg-surface-container-low p-6 rounded-xl flex flex-col gap-4">
            <div class="flex items-center justify-between pb-1">
              <span class="font-mono text-[11px] text-secondary uppercase">{{ page.simulator.paramsLabel }}</span>
              <span class="font-mono text-[10px] text-primary-container">{{ page.simulator.paramsBadge }}</span>
            </div>

            <!-- Track select -->
            <div class="flex flex-col gap-1">
              <label for="simTrack" class="font-mono text-[11px] text-secondary uppercase">{{ page.simulator.trackLabel }}</label>
              <select
                id="simTrack"
                v-model.number="simTrack"
                class="w-full bg-surface-container-highest text-on-surface px-4 py-2.5 rounded-lg outline-none cursor-pointer focus:bg-surface-variant transition-colors text-sm"
              >
                <option v-for="(track, i) in page.simulator.tracks" :key="track.value" :value="i">{{ track.label }}</option>
              </select>
            </div>

            <!-- Bet type select -->
            <div class="flex flex-col gap-1">
              <label for="simBetType" class="font-mono text-[11px] text-secondary uppercase">{{ page.simulator.betTypeLabel }}</label>
              <select
                id="simBetType"
                v-model.number="simBetType"
                class="w-full bg-surface-container-highest text-on-surface px-4 py-2.5 rounded-lg outline-none cursor-pointer focus:bg-surface-variant transition-colors text-sm"
              >
                <option v-for="(bet, i) in page.simulator.betTypes" :key="bet.value" :value="i">{{ bet.label }}</option>
              </select>
            </div>

            <!-- Runners range -->
            <div class="flex flex-col gap-1">
              <div class="flex justify-between items-center">
                <label for="simRunners" class="font-mono text-[11px] text-secondary uppercase">{{ page.simulator.runnersLabel }}</label>
                <span class="font-mono text-xs text-primary-container font-bold">{{ simRunners }} {{ page.simulator.runnersSuffix }}</span>
              </div>
              <input
                id="simRunners"
                v-model.number="simRunners"
                type="range"
                :min="page.simulator.runnersMin"
                :max="page.simulator.runnersMax"
                class="w-full accent-primary-container cursor-pointer"
              >
              <div class="flex justify-between text-secondary font-mono text-[10px]">
                <span>{{ page.simulator.tierMin }}</span>
                <span>{{ page.simulator.tierA }}</span>
                <span>{{ page.simulator.tierB }}</span>
                <span>{{ page.simulator.tierMax }}</span>
              </div>
            </div>

            <!-- Dividend + Stake -->
            <div class="grid grid-cols-2 gap-2">
              <div class="flex flex-col gap-1">
                <label for="simDividend" class="font-mono text-[11px] text-secondary uppercase">{{ page.simulator.dividendLabel }}</label>
                <div class="relative">
                  <span class="absolute left-3 top-1/2 -translate-y-1/2 font-mono text-xs text-secondary" aria-hidden="true">$</span>
                  <input
                    id="simDividend"
                    v-model.number="simDividend"
                    type="number"
                    step="0.05"
                    class="w-full bg-surface-container-highest text-on-surface font-mono pl-7 pr-2 py-2.5 rounded-lg outline-none focus:bg-surface-variant transition-colors text-sm"
                  >
                </div>
              </div>
              <div class="flex flex-col gap-1">
                <label for="simStake" class="font-mono text-[11px] text-secondary uppercase">{{ page.simulator.stakeLabel }}</label>
                <div class="relative">
                  <span class="absolute left-3 top-1/2 -translate-y-1/2 font-mono text-xs text-secondary" aria-hidden="true">$</span>
                  <input
                    id="simStake"
                    v-model.number="simStake"
                    type="number"
                    step="1.00"
                    class="w-full bg-surface-container-highest text-on-surface font-mono pl-7 pr-2 py-2.5 rounded-lg outline-none focus:bg-surface-variant transition-colors text-sm"
                  >
                </div>
              </div>
            </div>

            <!-- Presets -->
            <div class="flex items-center gap-1 pt-1">
              <span class="font-mono text-[10px] text-secondary uppercase mr-1">{{ page.simulator.presetsLabel }}</span>
              <button
                v-for="amount in page.simulator.presets"
                :key="amount"
                type="button"
                class="px-2.5 py-1 bg-surface-container text-on-surface font-mono text-[11px] rounded-lg hover:bg-surface-container-high transition-colors"
                @click="setPreset(amount)"
              >
                ${{ amount }}
              </button>
            </div>

            <!-- Cap notice -->
            <div class="mt-auto p-2 bg-surface-container-highest rounded-lg flex items-center justify-between">
              <div class="flex items-center gap-2">
                <Icon name="lucide:shield" :size="20" class="text-primary-container" aria-hidden="true" />
                <div class="flex flex-col">
                  <span class="font-mono text-[10px] text-on-surface uppercase">{{ page.simulator.cap.label }}</span>
                  <span class="font-mono text-[10px] text-secondary">{{ capConfigLabel }}</span>
                </div>
              </div>
              <span class="font-mono text-[11px] text-primary-container uppercase px-2 bg-surface-container rounded">{{ page.simulator.cap.active }}</span>
            </div>
          </div>

          <!-- Right: engine -->
          <div class="lg:col-span-7 bg-surface-container p-6 rounded-xl flex flex-col justify-between gap-4">
            <div class="flex items-center justify-between pb-1">
              <span class="font-mono text-[11px] text-secondary uppercase">{{ page.simulator.engine.label }}</span>
              <span class="font-mono text-[10px] text-secondary">EXEC TIME: <span class="text-primary-container">{{ execTimer }}ms</span></span>
            </div>

            <!-- Trace log -->
            <div class="flex flex-col gap-1 bg-surface-container-lowest p-4 rounded-lg font-mono text-xs">
              <div v-for="row in traceRows" :key="row.num" class="flex items-start justify-between text-secondary py-1">
                <div class="flex items-center gap-2">
                  <span class="text-primary-container">{{ row.num }}</span>
                  <span>{{ row.label }}</span>
                </div>
                <span :class="row.error ? 'text-error' : row.cap ? 'text-primary-container' : 'text-on-surface'" class="text-right">{{ row.value }}</span>
              </div>
            </div>

            <!-- Final calculation banner -->
            <div class="p-4 bg-surface-container-highest rounded-lg flex flex-col md:flex-row items-center justify-between gap-4">
              <div class="flex flex-col">
                <span class="font-mono text-[10px] text-secondary uppercase">{{ page.simulator.engine.finalLabel }}</span>
                <div class="flex items-baseline gap-2">
                  <span class="font-display text-3xl font-bold text-primary-container" :style="{ fontFamily: displayFont }">{{ finalPayoutDisplay }}</span>
                  <span class="font-mono text-[11px] text-secondary uppercase">{{ page.simulator.engine.unit }}</span>
                </div>
                <span class="font-mono text-[10px] text-secondary">{{ capStatusSubtext }}</span>
              </div>
              <div class="flex flex-col items-end gap-1">
                <button
                  type="button"
                  class="bg-primary-container hover:bg-primary-fixed-dim text-on-primary-container font-bold text-sm uppercase px-4 py-2 rounded-lg transition-colors flex items-center gap-2 font-display"
                  :style="{ fontFamily: displayFont }"
                >
                  <Icon name="lucide:refresh-cw" :size="18" aria-hidden="true" />
                  <span>{{ page.simulator.engine.recalculate }}</span>
                </button>
                <span class="font-mono text-[10px] text-secondary uppercase">{{ page.simulator.engine.agencyLabel }} <span class="text-on-surface">${{ agencyCommission.toFixed(2) }} USD</span></span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- S2: 7 Core Capabilities -->
    <section class="w-full bg-surface-container-lowest px-4 lg:px-12 py-16 lg:py-20">
      <div class="w-full max-w-7xl mx-auto flex flex-col gap-8">
        <div class="flex flex-col gap-1 max-w-3xl">
          <span class="font-mono text-[11px] text-primary-container uppercase">{{ page.features.kicker }}</span>
          <h2 class="font-display text-3xl md:text-4xl font-black uppercase text-on-surface tracking-tight" :style="{ fontFamily: displayFont }">
            {{ page.features.title }}
          </h2>
          <p class="text-secondary">
            {{ page.features.desc }}
          </p>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div
            v-for="card in page.features.cards"
            :key="card.rule"
            class="bg-surface-container-low hover:bg-surface-container transition-colors p-6 rounded-xl flex flex-col justify-between gap-4"
          >
            <div class="flex flex-col gap-2">
              <div class="flex items-center justify-between">
                <Icon :name="card.icon" :size="28" class="text-primary-container" aria-hidden="true" />
                <span class="font-mono text-[10px] text-secondary uppercase">{{ card.rule }}</span>
              </div>
              <h3 class="font-display text-base text-on-surface uppercase font-bold" :style="{ fontFamily: displayFont }">{{ card.title }}</h3>
              <p class="text-sm text-secondary leading-relaxed">{{ card.desc }}</p>
            </div>
            <div class="pt-2 flex items-center gap-2">
              <span class="w-1.5 h-1.5 rounded-full bg-primary-container" aria-hidden="true"></span>
              <span class="font-mono text-[10px] text-secondary uppercase">{{ card.footer }}</span>
            </div>
          </div>
          <!-- Wide card (span 3) -->
          <div class="md:col-span-2 lg:col-span-3 bg-surface-container hover:bg-surface-container-high transition-colors p-6 rounded-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div class="flex items-start gap-4 max-w-2xl">
              <div class="p-2 bg-primary-container text-on-primary-container rounded-lg shrink-0">
                <Icon :name="page.features.wide.icon" :size="28" aria-hidden="true" />
              </div>
              <div class="flex flex-col gap-1">
                <div class="flex items-center gap-2">
                  <h3 class="font-display text-base text-on-surface uppercase font-bold" :style="{ fontFamily: displayFont }">{{ page.features.wide.title }}</h3>
                  <span class="font-mono text-[10px] text-primary-container bg-surface-container-lowest px-1.5 py-0.5 rounded">{{ page.features.wide.badge }}</span>
                </div>
                <p class="text-sm text-secondary">{{ page.features.wide.desc }}</p>
              </div>
            </div>
            <div class="flex items-center gap-4 shrink-0 w-full md:w-auto justify-end">
              <div class="flex flex-col items-end">
                <span class="font-mono text-[10px] text-secondary uppercase">{{ page.features.wide.footerLabel }}</span>
                <span class="font-mono text-xs text-primary-container">{{ page.features.wide.footerValue }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- S3: Templates -->
    <section class="w-full bg-surface px-4 lg:px-12 py-16 lg:py-20 scroll-mt-24" id="plantillas">
      <div class="w-full max-w-7xl mx-auto flex flex-col gap-8">
        <div class="flex flex-col gap-1">
          <span class="font-mono text-[11px] text-primary-container uppercase">{{ page.templates.kicker }}</span>
          <h2 class="font-display text-3xl md:text-4xl font-black uppercase text-on-surface tracking-tight" :style="{ fontFamily: displayFont }">
            {{ page.templates.title }}
          </h2>
          <p class="text-secondary max-w-2xl">{{ page.templates.desc }}</p>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div v-for="tpl in page.templates.cards" :key="tpl.code" class="bg-surface-container-low p-6 rounded-xl flex flex-col justify-between gap-4">
            <div class="flex flex-col gap-4">
              <div class="flex justify-between items-center">
                <span class="font-display text-base text-on-surface uppercase font-bold" :style="{ fontFamily: displayFont }">{{ tpl.title }}</span>
                <span class="font-mono text-[10px] text-primary-container bg-surface-container px-1.5 py-0.5 rounded">{{ tpl.code }}</span>
              </div>
              <p class="text-sm text-secondary">{{ tpl.desc }}</p>
              <ul class="flex flex-col gap-1 font-mono text-xs text-secondary">
                <li v-for="(feat, i) in tpl.features" :key="i" class="flex items-center gap-2">
                  <Icon name="lucide:check" :size="16" class="text-primary-container" aria-hidden="true" />
                  <span>{{ feat }}</span>
                </li>
              </ul>
            </div>
            <button
              type="button"
              class="w-full bg-surface-container hover:bg-surface-container-high text-on-surface font-bold text-sm uppercase py-2.5 rounded-lg transition-colors text-center font-display"
              :style="{ fontFamily: displayFont }"
              @click="loadTemplate(tpl.id)"
            >
              {{ page.templates.cta }}
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- S4: Audit & Fiscal Shield -->
    <section class="w-full bg-surface-container-lowest px-4 lg:px-12 py-16 lg:py-20">
      <div class="w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        <div class="lg:col-span-5 flex flex-col gap-4">
          <span class="font-mono text-[11px] text-primary-container uppercase">{{ page.audit.kicker }}</span>
          <h2 class="font-display text-2xl md:text-3xl font-black uppercase text-on-surface tracking-tight" :style="{ fontFamily: displayFont }">
            {{ page.audit.title }}
          </h2>
          <p class="text-sm text-secondary">{{ page.audit.desc }}</p>
          <div class="flex flex-col gap-1 font-mono text-xs text-secondary">
            <div v-for="(check, i) in page.audit.checks" :key="i" class="flex items-center gap-2">
              <Icon :name="check.icon" :size="18" class="text-primary-container" aria-hidden="true" />
              <span>{{ check.label }}</span>
            </div>
          </div>
        </div>
        <div class="lg:col-span-7 bg-surface-container-low p-6 rounded-xl flex flex-col gap-4">
          <div class="flex items-center justify-between pb-1">
            <span class="font-mono text-[11px] text-secondary uppercase">{{ page.audit.panelLabel }}</span>
            <span class="font-mono text-[10px] text-primary-container">{{ page.audit.panelBadge }}</span>
          </div>
          <!-- SVG latency chart -->
          <div class="w-full h-44 bg-surface-container-lowest p-2 rounded-lg flex flex-col justify-between">
            <div class="flex justify-between items-center text-secondary font-mono text-[10px]">
              <span>{{ page.audit.chartLabel }}</span>
              <span>{{ page.audit.chartSub }}</span>
            </div>
            <svg class="w-full h-28 overflow-visible" preserveAspectRatio="none" viewBox="0 0 500 100" aria-hidden="true">
              <line stroke="#353534" stroke-dasharray="2 2" stroke-width="0.5" x1="0" x2="500" y1="20" y2="20"></line>
              <line stroke="#353534" stroke-dasharray="2 2" stroke-width="0.5" x1="0" x2="500" y1="50" y2="50"></line>
              <line stroke="#353534" stroke-dasharray="2 2" stroke-width="0.5" x1="0" x2="500" y1="80" y2="80"></line>
              <polygon fill="#ffc71a" fill-opacity="0.08" points="0,95 20,80 50,75 80,78 120,60 160,65 200,45 240,50 280,35 320,40 360,30 400,32 440,25 480,28 500,20 500,95 0,95"></polygon>
              <polyline fill="none" points="0,95 20,80 50,75 80,78 120,60 160,65 200,45 240,50 280,35 320,40 360,30 400,32 440,25 480,28 500,20" stroke="#ffc71a" stroke-width="2"></polyline>
              <circle cx="500" cy="20" fill="#ffc71a" r="3"></circle>
            </svg>
            <div class="flex justify-between items-center text-secondary font-mono text-[10px]">
              <span v-for="t in page.audit.chartTimes" :key="t">{{ t }}</span>
              <span class="text-primary-container">{{ page.audit.chartNow }}</span>
            </div>
          </div>
          <!-- Stats -->
          <div class="grid grid-cols-3 gap-2 pt-1 text-center font-mono text-xs">
            <div v-for="(stat, i) in page.audit.stats" :key="i" class="bg-surface-container p-2 rounded-lg flex flex-col">
              <span class="text-secondary text-[10px]">{{ stat.label }}</span>
              <span :class="stat.tone === 'primary' ? 'text-primary-container' : 'text-on-surface'" class="font-bold text-lg">{{ stat.value }}</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- S5: Final CTA -->
    <section class="w-full bg-surface-container-high px-4 lg:px-12 py-16 lg:py-20">
      <div class="w-full max-w-4xl mx-auto flex flex-col items-center text-center gap-4">
        <span class="font-mono text-[11px] text-primary-container uppercase tracking-wider">{{ page.cta.kicker }}</span>
        <h2 class="font-display text-2xl md:text-3xl font-black uppercase text-on-surface tracking-tight" :style="{ fontFamily: displayFont }">
          {{ page.cta.title }}
        </h2>
        <p class="text-lg text-secondary max-w-2xl">{{ page.cta.desc }}</p>
        <div class="flex flex-col sm:flex-row items-center gap-4 pt-4">
          <NuxtLinkLocale
            to="/demo"
            class="w-full sm:w-auto bg-primary-container hover:bg-primary-fixed-dim text-on-primary-container font-bold text-sm uppercase px-8 py-4 rounded-lg text-center tracking-wide transition-all shadow-[0_4px_20px_rgba(255,199,26,0.25)] flex items-center justify-center gap-2 font-display"
            :style="{ fontFamily: displayFont }"
          >
            <Icon name="lucide:calendar" :size="20" aria-hidden="true" />
            <span>{{ page.cta.primary }}</span>
          </NuxtLinkLocale>
          <NuxtLinkLocale
            to="/features/tipos-de-jugadas"
            class="w-full sm:w-auto bg-surface-container-highest hover:bg-surface-variant text-on-surface font-bold text-sm uppercase px-6 py-4 rounded-lg text-center tracking-wide transition-colors flex items-center justify-center gap-2 font-display"
            :style="{ fontFamily: displayFont }"
          >
            <Icon name="lucide:network" :size="20" aria-hidden="true" />
            <span>{{ page.cta.secondary }}</span>
          </NuxtLinkLocale>
        </div>
        <div class="flex flex-wrap items-center justify-center gap-4 pt-2 text-secondary font-mono text-[10px] uppercase">
          <template v-for="(item, i) in page.cta.micro" :key="i">
            <span v-if="i > 0" class="text-outline" aria-hidden="true">·</span>
            <span>{{ item }}</span>
          </template>
        </div>
      </div>
    </section>
  </div>
</template>
