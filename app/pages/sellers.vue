<script setup lang="ts">
const displayFont = "'Archivo Narrow', 'Archivo', sans-serif"

definePageMeta({ layout: 'default' })

// Structured (array/object) messages must be resolved via usePageMessages:
// t() only renders string messages and returns the raw key for arrays on SSR.
const page = usePageMessages<{
  telemetry: {
    label: string
    regions: string
    liquidation: string
    contract: string
  }
  hero: {
    badge: string
    title: string
    titleHighlight: string
    subtitle: string
    ctaPrimary: string
    ctaSecondary: string
    metrics: Array<{ value: string, label: string }>
    node: {
      label: string
      sla: string
      territoryLabel: string
      territory: string
      payoutLabel: string
      payout: string
      payoutTrend: string
    }
  }
  simulator: {
    kicker: string
    title: string
    desc: string
    chip: string
    agenciesLabel: string
    agencies: Array<{ count: number, label: string }>
    volumeLabel: string
    volumeMin: number
    volumeMax: number
    volumeStep: number
    volumeSmall: string
    volumeLarge: string
    commissionLabel: string
    commissionValue: string
    commissionNote: string
    frequencyLabel: string
    frequencyValue: string
    frequencyNote: string
    resultKicker: string
    resultBadge: string
    resultLabel: string
    resultUnit: string
    weeklyLabel: string
    terminalsLabel: string
    terminalsValue: string
    networkVolumeLabel: string
    supportCostLabel: string
    supportCostValue: string
    cta: string
    footnote: string
  }
  model: {
    kicker: string
    title: string
    desc: string
    steps: Array<{ num: string, icon: string, title: string, desc: string, badge: string, badgeIcon: string, badgeTone: string }>
  }
  panel: {
    kicker: string
    title: string
    desc: string
    suiteName: string
    suiteId: string
    syncLabel: string
    statusLabel: string
    metrics: Array<{ label: string, value: string, unit: string, delta: string, sub: string }>
    table: {
      headers: string[]
      rows: string[][]
    }
  }
  formInfo: {
    badge: string
    title: string
    desc: string
    guarantees: Array<{ icon: string, title: string, desc: string }>
  }
  form: {
    header: string
    stepLabel: string
    name: string
    namePh: string
    whatsapp: string
    whatsappPh: string
    country: string
    countryPh: string
    agencies: string
    agenciesOptions: Array<{ value: string, label: string }>
    experience: string
    experiencePh: string
    submit: string
    legalNote: string
    successTitle: string
    successDesc: string
    required: string
  }
}>('sellersPage')

// WhatsApp CTA target (kept out of i18n to avoid locale-specific number churn).
const WHATSAPP_HREF = 'https://wa.me/5491140928873'

// === Earnings simulator (S2) — illustrative projection, not a guarantee. ===
const { t } = useI18n()
const PARTNER_RATE = 0.0175 // 1.75% net of GGR (illustrative)

const agencyOptions = computed(() => page.simulator.agencies.map((a) => ({ count: a.count, label: a.label })))
const activeAgencies = ref(8)
const weeklyVolume = ref(12000)

const totalWeeklyVolume = computed(() => weeklyVolume.value * activeAgencies.value)
const weeklyEarnings = computed(() => Math.round(totalWeeklyVolume.value * PARTNER_RATE))
const monthlyEarnings = computed(() => weeklyEarnings.value * 4)
const terminalsCount = computed(() => activeAgencies.value * 2)
const monthlyNetworkVolume = computed(() => totalWeeklyVolume.value * 4)

function setAgencies(count: number) {
  activeAgencies.value = count
}

function formatUsd(n: number) {
  return n.toLocaleString('en-US')
}

const weeklyLabel = computed(() => t('sellersPage.simulator.weeklyLabel', { value: formatUsd(weeklyEarnings.value) }))
const terminalsLabel = computed(() => t('sellersPage.simulator.terminalsValue', { count: terminalsCount.value }))

// === Application form (S5, mailto, no backend) ===
const form = reactive({
  name: '',
  whatsapp: '',
  country: '',
  agencies: '4-10',
  experience: '',
})

// Track validation state for ARIA attributes
const validationErrors = ref<{ [key: string]: boolean }>({})

function showInvalid(field: string): boolean {
  return validationErrors.value[field] || false
}

function validateField(field: string, value: string): boolean {
  const isValid = value.trim().length > 0
  validationErrors.value[field] = field === 'name' || field === 'whatsapp' || field === 'country' ? !isValid : false
  return isValid
}

const formSubmitted = ref(false)

function onSubmit() {
  // Validate required fields
  const nameValid = validateField('name', form.name)
  const whatsappValid = validateField('whatsapp', form.whatsapp)
  const countryValid = validateField('country', form.country)

  if (!nameValid || !whatsappValid || !countryValid) {
    return
  }

  // Build and submit mailto link
  const agenciesLabel = page.form.agenciesOptions.find((o) => o.value === form.agencies)?.label ?? form.agencies
  const mailto = buildMailto('info@betkit.com', page.form.header, [
    { label: page.form.name, value: form.name },
    { label: page.form.whatsapp, value: form.whatsapp },
    { label: page.form.country, value: form.country },
    { label: page.form.agencies, value: agenciesLabel },
    { label: page.form.experience, value: form.experience },
  ])
  formSubmitted.value = true
  window.location.href = mailto
}

useHead({
  title: page.hero.title,
  meta: [
    { name: 'description', content: page.hero.subtitle },
    { name: 'robots', content: 'index, follow' },
  ],
})
</script>

<template>
  <div class="bg-surface text-on-surface font-body">
    <!-- SECTION 0: Telemetry & Partner Banner -->
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
            <Icon name="lucide:banknote" :size="16" class="text-tertiary-fixed" aria-hidden="true" />
            <span class="text-on-surface">{{ page.telemetry.liquidation }}</span>
          </div>
          <div class="hidden sm:flex items-center gap-1.5">
            <Icon name="lucide:shield-check" :size="16" class="text-primary-container" aria-hidden="true" />
            <span>{{ page.telemetry.contract }}</span>
          </div>
        </div>
      </div>
    </section>

    <!-- SECTION 1: Hero B2B -->
    <section class="relative w-full bg-surface px-4 sm:px-8 lg:px-12 pt-16 pb-20 overflow-hidden hud-grid">
      <!-- Ambient glow behind hero -->
      <div class="absolute top-1/4 left-1/4 w-[700px] h-[350px] bg-brand-yellow/10 blur-[130px] rounded-full pointer-events-none z-0" aria-hidden="true"></div>
      <div class="relative z-10 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
        <!-- Left: copy -->
        <div class="lg:col-span-8 flex flex-col items-start space-y-6">
          <!-- Badge -->
          <div class="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-lg bg-surface-container-high shadow-md">
            <span class="w-1.5 h-1.5 rounded-full bg-primary-container" aria-hidden="true"></span>
            <span class="font-mono text-[11px] text-primary-fixed uppercase tracking-wider font-semibold">{{ page.hero.badge }}</span>
          </div>

          <!-- Headline -->
          <h1 class="font-display text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-tight text-on-surface leading-[1.08] max-w-4xl" :style="{ fontFamily: displayFont }">
            {{ page.hero.title }}
            <br class="hidden sm:block">
            <span class="text-primary-container">{{ page.hero.titleHighlight }}</span>
          </h1>

          <!-- Subtitle -->
          <p class="text-lg md:text-xl text-on-surface-variant max-w-2xl leading-relaxed">
            {{ page.hero.subtitle }}
          </p>

          <!-- CTA Cluster -->
          <div class="flex flex-wrap items-center gap-4 pt-4">
            <NuxtLinkLocale
              to="#postulacion"
              class="inline-flex items-center justify-center px-8 py-4 rounded-lg bg-primary-container text-on-primary-fixed font-bold text-sm uppercase tracking-wider hover:bg-primary-fixed-dim transition-all shadow-xl shadow-primary-container/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-container focus-visible:ring-offset-2 focus-visible:ring-offset-surface"
            >
              {{ page.hero.ctaPrimary }}
            </NuxtLinkLocale>
            <a
              :href="WHATSAPP_HREF"
              target="_blank"
              rel="noopener noreferrer"
              class="inline-flex items-center justify-center gap-2.5 px-7 py-4 rounded-lg bg-surface-container-high text-on-surface hover:text-primary hover:bg-surface-container-highest transition-all text-sm uppercase tracking-wide focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-container focus-visible:ring-offset-2 focus-visible:ring-offset-surface"
            >
              <Icon name="lucide:message-circle" :size="20" class="text-primary-container" aria-hidden="true" />
              {{ page.hero.ctaSecondary }}
            </a>
          </div>

          <!-- Metric highlights pill row -->
          <div class="pt-8 flex flex-wrap items-center gap-6 sm:gap-8 text-on-surface-variant">
            <template v-for="(metric, i) in page.hero.metrics" :key="i">
              <div v-if="i > 0" class="w-px h-8 bg-surface-container-highest hidden sm:block" aria-hidden="true"></div>
              <div class="flex flex-col gap-1">
                <span :class="i === 1 ? 'text-2xl font-mono font-bold text-primary-container' : 'text-2xl font-mono font-bold text-on-surface'">
                  {{ metric.value }}
                </span>
                <span class="text-xs font-mono uppercase tracking-wider">{{ metric.label }}</span>
              </div>
            </template>
          </div>
        </div>

        <!-- Right: NODO PARTNER ACTIVO card -->
        <div class="lg:col-span-4 flex justify-center lg:justify-end">
          <div class="w-full max-w-md bg-surface-container-low p-6 rounded-xl shadow-xl shadow-black/40 flex flex-col gap-5">
            <div class="flex items-center justify-between pb-3">
              <div class="flex items-center gap-2">
                <Icon name="lucide:hub" :size="22" class="text-primary-container" aria-hidden="true" />
                <span class="font-mono text-[11px] uppercase tracking-wider text-on-surface">{{ page.hero.node.label }}</span>
              </div>
              <span class="font-mono text-[10px] px-2 py-0.5 rounded bg-surface-container-highest text-tertiary font-bold tracking-widest">{{ page.hero.node.sla }}</span>
            </div>

            <!-- Partner Card Graphic -->
            <div class="relative w-full h-48 rounded-lg overflow-hidden bg-surface-container-lowest">
              <img
                src="/imges/seller/sellers.jpg"
                alt="Terminal de apuestas BetKit en una agencia hípica"
                class="w-full h-full object-cover opacity-80"
                loading="lazy"
              >
              <div class="absolute inset-0 bg-gradient-to-t from-surface-container-lowest via-surface-container-lowest/40 to-transparent" aria-hidden="true"></div>
              <div class="absolute bottom-3 left-3 right-3 flex items-end justify-between">
                <div>
                  <span class="font-mono text-[10px] text-on-surface-variant uppercase block">{{ page.hero.node.territoryLabel }}</span>
                  <span class="font-display text-lg font-bold text-on-surface" :style="{ fontFamily: displayFont }">{{ page.hero.node.territory }}</span>
                </div>
                <Icon name="lucide:badge-check" :size="28" class="text-primary-container" aria-hidden="true" />
              </div>
            </div>

            <!-- Realtime payout pill -->
            <div class="bg-surface-container p-4 rounded-lg flex items-center justify-between">
              <div class="flex flex-col">
                <span class="font-mono text-[11px] text-on-surface-variant uppercase">{{ page.hero.node.payoutLabel }}</span>
                <span class="font-mono text-lg text-primary-container font-bold">{{ page.hero.node.payout }}</span>
              </div>
              <div class="flex items-center gap-1 font-mono text-xs text-tertiary">
                <Icon name="lucide:trending-up" :size="16" aria-hidden="true" />
                <span>{{ page.hero.node.payoutTrend }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- SECTION 2: Interactive Earnings Simulator -->
    <section class="w-full bg-surface-container-low px-4 sm:px-8 lg:px-12 py-20">
      <div class="max-w-7xl mx-auto flex flex-col gap-12">
        <div class="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div class="max-w-xl space-y-2">
            <span class="font-mono text-[11px] uppercase tracking-wider text-primary-container">{{ page.simulator.kicker }}</span>
            <h2 class="font-display text-3xl md:text-4xl font-black uppercase text-on-surface tracking-tight" :style="{ fontFamily: displayFont }">
              {{ page.simulator.title }}
            </h2>
            <p class="text-on-surface-variant leading-relaxed">
              {{ page.simulator.desc }}
            </p>
          </div>
          <div class="inline-flex items-center gap-2 px-3 py-1.5 rounded bg-surface-container font-mono text-[11px] text-tertiary">
            <Icon name="lucide:shield-check" :size="16" aria-hidden="true" />
            <span>{{ page.simulator.chip }}</span>
          </div>
        </div>

        <!-- Simulator Interactive Canvas -->
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          <!-- Controls Side -->
          <div class="lg:col-span-7 bg-surface-container p-6 sm:p-8 rounded-xl shadow-lg flex flex-col justify-between gap-8">
            <div class="space-y-6">
              <!-- Agency Selector -->
              <div>
                <div class="flex justify-between items-center mb-3">
                  <label class="font-display text-[17px] uppercase text-on-surface tracking-wide font-bold" :style="{ fontFamily: displayFont }">
                    {{ page.simulator.agenciesLabel }}
                  </label>
                  <span class="font-mono text-lg text-primary-container font-bold">{{ activeAgencies }} {{ activeAgencies === 1 ? 'Agencia' : 'Agencias' }}</span>
                </div>
                <div class="grid grid-cols-3 gap-3">
                  <button
                    v-for="option in agencyOptions"
                    :key="option.count"
                    type="button"
                    class="py-3 px-4 rounded-lg font-mono text-xs font-semibold transition-colors"
                    :class="activeAgencies === option.count
                      ? 'bg-primary-container text-on-primary-fixed shadow-md'
                      : 'bg-surface-container-high text-on-surface hover:bg-surface-container-highest'"
                    @click="setAgencies(option.count)"
                  >
                    {{ option.label }}
                  </button>
                </div>
              </div>

              <!-- Volume Slider -->
              <div>
                <div class="flex justify-between items-center mb-2">
                  <label for="volume-slider" class="font-display text-[17px] uppercase text-on-surface tracking-wide font-bold" :style="{ fontFamily: displayFont }">
                    {{ page.simulator.volumeLabel }}
                  </label>
                  <span class="font-mono text-base text-tertiary font-bold">${{ formatUsd(weeklyVolume) }} USD / sem</span>
                </div>
                <input
                  id="volume-slider"
                  v-model.number="weeklyVolume"
                  type="range"
                  :min="page.simulator.volumeMin"
                  :max="page.simulator.volumeMax"
                  :step="page.simulator.volumeStep"
                  class="w-full h-2 bg-surface-container-highest rounded-lg appearance-none cursor-pointer accent-primary-container"
                  :aria-label="page.simulator.volumeLabel"
                  :aria-valuemin="page.simulator.volumeMin"
                  :aria-valuemax="page.simulator.volumeMax"
                  :aria-valuenow="weeklyVolume"
                >
                <div class="flex justify-between font-mono text-[10px] text-on-surface-variant mt-1">
                  <span>{{ page.simulator.volumeSmall }}</span>
                  <span>{{ page.simulator.volumeLarge }}</span>
                </div>
              </div>

              <!-- Included software parameters -->
              <div class="pt-4 grid grid-cols-2 gap-4">
                <div class="bg-surface-container-low p-3.5 rounded-lg">
                  <span class="font-mono text-[10px] text-on-surface-variant block uppercase">{{ page.simulator.commissionLabel }}</span>
                  <span class="font-mono text-lg text-on-surface font-bold">{{ page.simulator.commissionValue }} <span class="text-xs text-on-surface-variant font-normal">{{ page.simulator.commissionNote }}</span></span>
                </div>
                <div class="bg-surface-container-low p-3.5 rounded-lg">
                  <span class="font-mono text-[10px] text-on-surface-variant block uppercase">{{ page.simulator.frequencyLabel }}</span>
                  <span class="font-mono text-lg text-tertiary font-bold">{{ page.simulator.frequencyValue }} <span class="text-xs text-on-surface-variant font-normal">{{ page.simulator.frequencyNote }}</span></span>
                </div>
              </div>
            </div>
            <div class="pt-2 text-on-surface font-body text-sm">
              {{ page.simulator.footnote }}
            </div>
          </div>

          <!-- Result Display Card -->
          <div class="lg:col-span-5 bg-surface-container-highest p-6 sm:p-8 rounded-xl shadow-2xl flex flex-col justify-between relative overflow-hidden" aria-live="polite">
            <!-- Background Glow Effect -->
            <div class="absolute -top-16 -right-16 w-56 h-56 rounded-full bg-primary-container/10 blur-3xl pointer-events-none" aria-hidden="true"></div>
            <div class="flex flex-col gap-6 relative z-10">
              <div class="flex items-center justify-between pb-3">
                <span class="font-mono text-[11px] text-primary uppercase tracking-widest font-bold">{{ page.simulator.resultKicker }}</span>
                <span class="px-2 py-0.5 rounded bg-surface-container text-tertiary-fixed font-mono text-[10px] font-bold uppercase">{{ page.simulator.resultBadge }}</span>
              </div>
              <div class="space-y-1">
                <span class="text-on-surface-variant">{{ page.simulator.resultLabel }}</span>
                <div class="flex items-baseline gap-2">
                  <span class="font-display text-4xl text-primary-container font-extrabold tracking-tight" :style="{ fontFamily: displayFont }">${{ formatUsd(monthlyEarnings) }}</span>
                  <span class="text-base text-on-surface">{{ page.simulator.resultUnit }}</span>
                </div>
                <span class="font-mono text-xs text-tertiary block">
                  {{ weeklyLabel }}
                </span>
              </div>
              <!-- Breakdown list -->
              <div class="space-y-3 pt-4">
                <div class="flex justify-between items-center py-1.5 font-mono text-[11px]">
                  <span class="text-on-surface">{{ page.simulator.terminalsLabel }}</span>
                  <span class="text-on-surface font-semibold">{{ terminalsLabel }}</span>
                </div>
                <div class="flex justify-between items-center py-1.5 font-mono text-[11px]">
                  <span class="text-on-surface">{{ page.simulator.networkVolumeLabel }}</span>
                  <span class="text-on-surface font-semibold">${{ formatUsd(monthlyNetworkVolume) }} USD</span>
                </div>
                <div class="flex justify-between items-center py-1.5 font-mono text-[11px]">
                  <span class="text-on-surface">{{ page.simulator.supportCostLabel }}</span>
                  <span class="text-tertiary font-bold uppercase text-[10px]">{{ page.simulator.supportCostValue }}</span>
                </div>
              </div>
            </div>
            <div class="pt-6 relative z-10">
              <NuxtLinkLocale
                to="#postulacion"
                class="w-full inline-flex items-center justify-center gap-2 py-3.5 px-6 rounded-lg bg-primary-container hover:bg-primary-fixed-dim text-on-primary-fixed font-bold text-sm uppercase tracking-wider transition-all shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-container focus-visible:ring-offset-2 focus-visible:ring-offset-surface-container-highest"
              >
                <span>{{ page.simulator.cta }}</span>
                <Icon name="lucide:arrow-forward" :size="18" aria-hidden="true" />
              </NuxtLinkLocale>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- SECTION 3: Operating model in 4 steps -->
    <section class="w-full bg-surface px-4 sm:px-8 lg:px-12 py-24">
      <div class="max-w-7xl mx-auto space-y-16">
        <div class="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
          <div class="space-y-2">
            <span class="font-mono text-[11px] uppercase tracking-widest text-primary-container">{{ page.model.kicker }}</span>
            <h2 class="font-display text-3xl md:text-4xl font-black uppercase text-on-surface tracking-tight" :style="{ fontFamily: displayFont }">
              {{ page.model.title }}
            </h2>
          </div>
          <p class="text-on-surface-variant max-w-md leading-relaxed">
            {{ page.model.desc }}
          </p>
        </div>

        <!-- 4-Column Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div
            v-for="step in page.model.steps"
            :key="step.num"
            class="bg-surface-container p-6 rounded-xl shadow-md flex flex-col justify-between gap-6 hover:bg-surface-container-high transition-all"
          >
            <div class="space-y-4">
              <div class="flex justify-between items-center">
                <span class="font-mono text-2xl text-primary-container font-bold">{{ step.num }}</span>
                <span class="p-2 rounded-lg bg-surface-container-low text-on-surface">
                  <Icon :name="step.icon" :size="20" aria-hidden="true" />
                </span>
              </div>
              <h3 class="font-display text-base uppercase text-on-surface font-bold tracking-wide" :style="{ fontFamily: displayFont }">
                {{ step.title }}
              </h3>
              <p class="text-sm text-on-surface-variant leading-relaxed">
                {{ step.desc }}
              </p>
            </div>
            <div class="pt-2 font-mono text-[11px] flex items-center gap-1.5" :class="step.badgeTone">
              <Icon :name="step.badgeIcon" :size="14" aria-hidden="true" />
              <span v-html="step.badge"></span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- SECTION 4: Partner panel snapshot -->
    <section class="w-full bg-surface-container-low px-4 sm:px-8 lg:px-12 py-20">
      <div class="max-w-7xl mx-auto flex flex-col gap-10">
        <div class="max-w-2xl space-y-2">
          <span class="font-mono text-[11px] uppercase tracking-widest text-primary-container">{{ page.panel.kicker }}</span>
          <h2 class="font-display text-3xl md:text-4xl font-black uppercase text-on-surface tracking-tight" :style="{ fontFamily: displayFont }">
            {{ page.panel.title }}
          </h2>
          <p class="text-on-surface-variant leading-relaxed">
            {{ page.panel.desc }}
          </p>
        </div>

        <!-- Clean Terminal Dashboard UI Mockup -->
        <div class="w-full bg-surface-container rounded-xl shadow-2xl overflow-hidden p-6 sm:p-8 flex flex-col gap-6">
          <!-- Mockup Subheader with live indicator -->
          <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4">
            <div class="flex items-center gap-3">
              <span class="inline-block w-2.5 h-2.5 rounded-full bg-primary-container" aria-hidden="true"></span>
              <span class="font-mono text-[11px] text-on-surface uppercase font-bold">{{ page.panel.suiteName }}</span>
              <span class="font-mono text-[10px] text-on-surface-variant px-2 py-0.5 rounded bg-surface-container-highest">{{ page.panel.suiteId }}</span>
            </div>
            <div class="flex flex-wrap items-center gap-3 font-mono text-[11px] text-on-surface-variant">
              <span>{{ page.panel.syncLabel }}</span>
              <span class="px-2.5 py-1 rounded bg-surface-container-highest text-tertiary uppercase font-bold">{{ page.panel.statusLabel }}</span>
            </div>
          </div>

          <!-- 3-Pillar Metric Cards -->
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div
              v-for="(metric, i) in page.panel.metrics"
              :key="i"
              class="bg-surface-container-low p-5 rounded-lg flex flex-col justify-between gap-3"
            >
              <span class="font-mono text-[11px] text-on-surface-variant uppercase">{{ metric.label }}</span>
              <div class="flex items-baseline justify-between">
                <span class="text-2xl text-on-surface font-bold">
                  {{ metric.value }}
                  <span v-if="metric.unit" class="text-sm font-normal text-on-surface-variant">{{ metric.unit }}</span>
                </span>
                <span v-if="metric.delta" class="font-mono text-[11px] font-semibold" :class="i === 2 ? 'text-primary-container' : 'text-tertiary'">{{ metric.delta }}</span>
                <Icon v-else name="lucide:wallet" :size="20" class="text-primary-container" aria-hidden="true" />
              </div>
              <div class="font-mono text-[11px] text-on-surface-variant" :class="i === 2 ? 'text-tertiary-fixed' : ''">
                {{ metric.sub }}
              </div>
            </div>
          </div>

          <!-- Agencies Breakdown Table -->
          <div class="w-full overflow-x-auto">
            <table class="w-full text-left font-mono text-[11px]">
              <thead>
                <tr class="text-on-surface uppercase bg-surface-container-low font-bold">
                  <th v-for="header in page.panel.table.headers" :key="header" class="py-3 px-4">{{ header }}</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-transparent">
                <tr v-for="row in page.panel.table.rows" :key="row[0]" class="hover:bg-surface-container-high transition-colors">
                  <td class="py-3 px-4 text-on-surface font-sans text-sm">{{ row[0] }}</td>
                  <td class="py-3 px-4 text-on-surface-variant">{{ row[1] }}</td>
                  <td class="py-3 px-4 text-on-surface">{{ row[2] }}</td>
                  <td class="py-3 px-4 text-on-surface font-semibold">{{ row[3] }}</td>
                  <td class="py-3 px-4 text-primary-container font-bold">{{ row[4] }}</td>
                  <td class="py-3 px-4">
                    <span class="px-2 py-0.5 rounded bg-surface-container-highest text-tertiary font-bold">{{ row[5] }}</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>

    <!-- SECTION 5: Application form -->
    <section id="postulacion" class="w-full bg-surface px-4 sm:px-8 lg:px-12 py-24">
      <div class="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12">
        <!-- Left: Info / guarantees -->
        <div class="lg:col-span-5 space-y-6">
          <div class="inline-flex items-center gap-2 px-3 py-1 rounded bg-surface-container-high font-mono text-[11px] text-primary-container uppercase">
            {{ page.formInfo.badge }}
          </div>
          <h2 class="font-display text-3xl md:text-4xl font-black uppercase text-on-surface tracking-tight leading-none" :style="{ fontFamily: displayFont }">
            {{ page.formInfo.title }}
          </h2>
          <p class="text-on-surface-variant leading-relaxed">
            {{ page.formInfo.desc }}
          </p>
          <!-- Guarantee features -->
          <div class="space-y-4 pt-4">
            <div
              v-for="(g, i) in page.formInfo.guarantees"
              :key="i"
              class="flex items-start gap-3"
            >
              <Icon :name="g.icon" :size="20" class="text-primary-container shrink-0 mt-0.5" aria-hidden="true" />
              <div>
                <h4 class="font-display text-base uppercase text-on-surface font-bold tracking-wide" :style="{ fontFamily: displayFont }">
                  {{ g.title }}
                </h4>
                <p class="text-sm text-on-surface-variant leading-relaxed">
                  {{ g.desc }}
                </p>
              </div>
            </div>
          </div>
        </div>

        <!-- Right: Application form -->
        <div class="lg:col-span-7">
          <form
            class="bg-surface-container p-8 sm:p-10 rounded-xl shadow-2xl flex flex-col gap-6"
            novalidate
            @submit.prevent="onSubmit"
          >
            <div class="flex justify-between items-center pb-2">
              <h3 class="font-display text-base uppercase text-on-surface font-bold tracking-wide" :style="{ fontFamily: displayFont }">
                {{ page.form.header }}
              </h3>
              <span class="font-mono text-[11px] text-on-surface font-semibold">{{ page.form.stepLabel }}</span>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div class="flex flex-col gap-2">
                <label for="seller-name" class="font-mono text-[11px] uppercase text-on-surface font-bold">
                  {{ page.form.name }} <span class="text-primary-container" aria-hidden="true">*</span>
                  <span class="sr-only">({{ page.form.required }})</span>
                </label>
                <input
                  id="seller-name"
                  v-model="form.name"
                  type="text"
                  name="name"
                  required
                  :aria-required="true"
                  :placeholder="page.form.namePh"
                  :aria-invalid="showInvalid('name') || undefined"
                  class="w-full px-4 py-3 rounded-lg bg-surface-container-low text-on-surface border border-outline-variant focus:outline-none focus:bg-surface-container-highest transition-colors text-sm"
                >
              </div>
              <div class="flex flex-col gap-2">
                <label for="seller-whatsapp" class="font-mono text-[11px] uppercase text-on-surface font-bold">
                  {{ page.form.whatsapp }} <span class="text-primary-container" aria-hidden="true">*</span>
                  <span class="sr-only">({{ page.form.required }})</span>
                </label>
                <input
                  id="seller-whatsapp"
                  v-model="form.whatsapp"
                  type="tel"
                  name="whatsapp"
                  required
                  :aria-required="true"
                  :placeholder="page.form.whatsappPh"
                  :aria-invalid="showInvalid('whatsapp') || undefined"
                  class="w-full px-4 py-3 rounded-lg bg-surface-container-low text-on-surface border border-outline-variant focus:outline-none focus:bg-surface-container-highest transition-colors font-mono text-sm"
                >
              </div>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div class="flex flex-col gap-2">
                <label for="seller-country" class="font-mono text-[11px] uppercase text-on-surface font-bold">
                  {{ page.form.country }} <span class="text-primary-container" aria-hidden="true">*</span>
                  <span class="sr-only">({{ page.form.required }})</span>
                </label>
                <input
                  id="seller-country"
                  v-model="form.country"
                  type="text"
                  name="country"
                  required
                  :aria-required="true"
                  :placeholder="page.form.countryPh"
                  :aria-invalid="showInvalid('country') || undefined"
                  class="w-full px-4 py-3 rounded-lg bg-surface-container-low text-on-surface border border-outline-variant focus:outline-none focus:bg-surface-container-highest transition-colors text-sm"
                >
              </div>
              <div class="flex flex-col gap-2">
                <label for="seller-agencies" class="font-mono text-[11px] uppercase text-on-surface font-bold">
                  {{ page.form.agencies }} <span class="text-primary-container" aria-hidden="true">*</span>
                </label>
                <select
                  id="seller-agencies"
                  v-model="form.agencies"
                  name="agencies"
                  class="w-full px-4 py-3 rounded-lg bg-surface-container-low text-on-surface border border-outline-variant focus:outline-none focus:bg-surface-container-highest transition-colors text-sm"
                >
                  <option v-for="opt in page.form.agenciesOptions" :key="opt.value" :value="opt.value">{{ opt.label }}</option>
                </select>
              </div>
            </div>

            <div class="flex flex-col gap-2">
              <label for="seller-experience" class="font-mono text-[11px] uppercase text-on-surface font-bold">
                {{ page.form.experience }}
              </label>
              <input
                id="seller-experience"
                v-model="form.experience"
                type="text"
                name="experience"
                :placeholder="page.form.experiencePh"
                class="w-full px-4 py-3 rounded-lg bg-surface-container-low text-on-surface border border-outline-variant focus:outline-none focus:bg-surface-container-highest transition-colors text-sm"
              >
            </div>

            <div class="pt-4">
              <button
                type="submit"
                class="w-full py-4 px-8 rounded-lg bg-primary-container hover:bg-primary-fixed-dim text-on-primary-fixed font-bold text-sm uppercase tracking-wider transition-all shadow-xl hover:shadow-primary-container/20 active:scale-[0.99] flex items-center justify-center gap-2 border border-primary-container focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-container focus-visible:ring-offset-2 focus-visible:ring-offset-surface-container"
              >
                <span>{{ page.form.submit }}</span>
                <Icon name="lucide:send" :size="20" aria-hidden="true" />
              </button>
              <p class="font-mono text-[11px] text-on-surface text-center mt-3">
                {{ page.form.legalNote }}
              </p>
            </div>

            <!-- Success message (shown after submit) -->
            <div
              v-if="formSubmitted"
              class="p-4 rounded-lg bg-surface-container-highest text-tertiary font-mono text-sm flex items-center gap-2"
              role="status"
              aria-live="polite"
            >
              <Icon name="lucide:check-circle" :size="20" aria-hidden="true" />
              <span>
                <strong>{{ page.form.successTitle }}</strong>
                {{ page.form.successDesc }}
              </span>
            </div>
          </form>
        </div>
      </div>
    </section>
  </div>
</template>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        
