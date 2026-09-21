<script setup lang="ts">
const displayFont = "'Archivo Narrow', 'Archivo', sans-serif"
const page = usePageMessages<{
  fullTitle: string
  fullDesc: string
  telemetry: { mode: string, latency: string, fiscal: string, nodes: string }
  hero: {
    badge: string
    title: string
    desc: string
    ctaPrimary: string
    ctaSecondary: string
    metrics: Array<{ label: string, value: string }>
    topology: {
      headerLabel: string
      latency: string
      live: string
      hubLabel: string
      hubSub: string
      nodes: Array<{ name: string, status: string, windows: string, latency: string, uptime: string, link: string }>
      footerTickets: string
      footerIsolation: string
    }
  }
  pillars: {
    kicker: string
    title: string
    desc: string
    cards: Array<{ code: string, icon: string, title: string, desc: string, footerLabel: string, footerValue: string }>
  }
  switcher: {
    kicker: string
    title: string
    desc: string
    selectorLabel: string
    modeLabel: string
    branches: Array<{ key: string, name: string, windows: string, currency: string, status: string, tone: string }>
    branchesData: Array<{ title: string, currencyBadge: string, volume: string, margin: string, leaks: string, qr: string, tracks: string, payout: string, commission: string }>
    panel: {
      sessionLabel: string
      metrics: { volume: { label: string, sub: string }, margin: { label: string, sub: string }, leaks: { label: string, sub: string } }
      consolidatedLabel: string
      consolidatedValue: string
      chart: Array<{ label: string, width: string, barClass: string, title: string }>
      footerLabel: string
      footerLink: string
    }
    qr: {
      label: string
      badge: string
      scanNote: string
      specs: Array<{ label: string, key: string }>
      button: string
    }
  }
  channel: {
    badge: string
    title: string
    desc: string
    points: Array<{ title: string, desc: string }>
    cta: string
    sim: {
      label: string
      agencies: { label: string, value: string }
      turnover: { label: string, value: string }
      commission: { label: string, value: string }
      note: string
    }
  }
  showcase: {
    items: Array<{ title: string, sub: string, badge: string }>
  }
  closing: {
    kicker: string
    title: string
    desc: string
    cta: string
  }
}>('features.multiSucursal')

// === Branch switcher (S3) ===
const selectedBranchIndex = ref(0)

const activeBranch = computed(() => page.switcher.branches[selectedBranchIndex.value])
const activeBranchData = computed(() => page.switcher.branchesData[selectedBranchIndex.value])

function selectBranch(index: number) {
  selectedBranchIndex.value = index
}

// Fixed positions for the 4 topology nodes (top-left, top-right, bottom-left, bottom-right)
const nodePositions = [
  'top-3 left-3',
  'top-3 right-3',
  'bottom-3 left-3',
  'bottom-3 right-3',
]

// Bar colors for the consolidated chart — declared as literals here so Tailwind
// generates them (i18n JSON is not scanned by the Tailwind content detector).
const chartBarClasses = [
  'bg-primary-container',
  'bg-on-primary-fixed-variant',
  'bg-secondary-container',
  'bg-surface-variant',
]

// Showcase photos (S5) — paths resolved from public/ (order matches page.showcase.items).
const showcaseImages = [
  '/imges/features/multi_sucursal/operador_central.jpg',
  '/imges/features/multi_sucursal/supervision_general.jpg',
]

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
    <!-- S0: Top Protocol Bar -->
    <section class="relative w-full bg-surface-container-lowest px-4 sm:px-8 lg:px-12 py-5">
      <div class="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div class="flex items-center gap-3">
          <span class="relative flex h-2.5 w-2.5">
            <span class="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary-container opacity-60" aria-hidden="true"></span>
            <span class="relative inline-flex rounded-full h-2.5 w-2.5 bg-primary-container" aria-hidden="true"></span>
          </span>
          <span class="font-mono text-[11px] font-medium uppercase tracking-[0.15em] text-primary-container">{{ page.telemetry.mode }}</span>
          <span class="text-outline-variant" aria-hidden="true">/</span>
          <span class="font-mono text-[11px] text-on-surface-variant">{{ page.telemetry.fiscal }}</span>
        </div>
        <div class="flex flex-wrap items-center gap-x-6 gap-y-2 font-mono text-[11px] text-on-surface-variant">
          <div class="flex items-center gap-1.5">
            <Icon name="lucide:zap" :size="16" class="text-tertiary-fixed" aria-hidden="true" />
            <span class="text-on-surface">{{ page.telemetry.latency }}</span>
          </div>
          <div class="hidden sm:flex items-center gap-1.5">
            <Icon name="lucide:network" :size="16" class="text-primary-container" aria-hidden="true" />
            <span>{{ page.telemetry.nodes }}</span>
          </div>
        </div>
      </div>
    </section>

    <!-- S1: Hero Section -->
    <section class="w-full bg-surface px-4 lg:px-12 py-16 lg:py-16 relative overflow-hidden hud-grid">
      <!-- Ambient glow behind hero -->
      <div class="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-brand-yellow/10 blur-[130px] rounded-full pointer-events-none z-0" aria-hidden="true"></div>
      <div class="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 items-center relative z-10">
        <!-- Left: copy -->
        <div class="lg:col-span-7 flex flex-col items-start">
          <div class="inline-flex items-center gap-2 px-3 py-1.5 bg-surface-container text-primary-container font-mono text-[11px] uppercase mb-4 shadow-sm">
            <Icon name="lucide:network" :size="16" aria-hidden="true" />
            <span>{{ page.hero.badge }}</span>
          </div>
          <h1 class="font-display text-4xl md:text-5xl lg:text-6xl font-black text-on-surface uppercase tracking-tight mb-4 leading-[1.08]" :style="{ fontFamily: displayFont }">
            {{ page.hero.title }}
          </h1>
          <p class="text-lg text-on-surface-variant max-w-2xl mb-8 leading-relaxed">
            {{ page.hero.desc }}
          </p>
          <div class="flex flex-wrap items-center gap-4 w-full sm:w-auto">
            <NuxtLinkLocale
              to="#switcher-demo"
              class="w-full sm:w-auto bg-primary-container hover:bg-primary-fixed-dim text-on-primary-container font-bold text-sm px-6 py-3.5 uppercase tracking-wide transition-all shadow-md flex items-center justify-center gap-2 rounded-lg font-display"
              :style="{ fontFamily: displayFont }"
            >
              <span>{{ page.hero.ctaPrimary }}</span>
              <Icon name="lucide:arrow-left-right" :size="20" aria-hidden="true" />
            </NuxtLinkLocale>
            <NuxtLinkLocale
              to="/demo"
              class="w-full sm:w-auto bg-surface-container hover:bg-surface-container-high text-on-surface font-bold text-sm px-6 py-3.5 uppercase tracking-wide transition-all flex items-center justify-center gap-2 rounded-lg font-display"
              :style="{ fontFamily: displayFont }"
            >
              <span>{{ page.hero.ctaSecondary }}</span>
              <Icon name="lucide:arrow-right" :size="20" aria-hidden="true" />
            </NuxtLinkLocale>
          </div>
          <!-- Metric micro-strip -->
          <div class="mt-10 pt-4 flex flex-wrap items-center gap-6 lg:gap-8 text-on-surface-variant">
            <template v-for="(metric, i) in page.hero.metrics" :key="i">
              <div v-if="i > 0" class="w-px h-8 bg-surface-variant" aria-hidden="true"></div>
              <div class="flex flex-col">
                <span class="font-mono text-[11px] text-primary-container uppercase">{{ metric.label }}</span>
                <span class="font-display text-lg text-on-surface font-bold" :style="{ fontFamily: displayFont }">{{ metric.value }}</span>
              </div>
            </template>
          </div>
        </div>

        <!-- Right: topology visual -->
        <div class="lg:col-span-5 relative">
          <div class="bg-surface-container-low p-4 relative overflow-hidden shadow-xl border border-surface-variant/40 rounded-xl">
            <!-- Terminal Header / Radar Status Bar -->
            <div class="flex items-center justify-between pb-2 mb-3 bg-surface-container-lowest px-3 py-2 border-b border-surface-variant/30 rounded-t-lg">
              <div class="flex items-center gap-2">
                <span class="relative flex h-2 w-2">
                  <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-container opacity-75" aria-hidden="true"></span>
                  <span class="relative inline-flex rounded-full h-2 w-2 bg-primary-container" aria-hidden="true"></span>
                </span>
                <span class="font-mono text-[10px] text-on-surface uppercase tracking-wider font-bold">{{ page.hero.topology.headerLabel }}</span>
              </div>
              <div class="flex items-center gap-2">
                <span class="font-mono text-[10px] text-primary-container bg-primary-container/10 px-1.5 py-0.5 border border-primary-container/30 uppercase rounded">{{ page.hero.topology.latency }}</span>
                <span class="font-mono text-[10px] text-accent-emerald flex items-center gap-1">
                  <span class="w-1.5 h-1.5 rounded-full bg-accent-emerald inline-block" aria-hidden="true"></span>
                  {{ page.hero.topology.live }}
                </span>
              </div>
            </div>

            <!-- Main Canvas / Topology Visualizer -->
            <div class="relative w-full h-96 bg-surface-container-lowest overflow-hidden border border-surface-variant/20 rounded-lg">
              <!-- Blueprint grid bg -->
              <div class="absolute inset-0 hud-grid opacity-20" aria-hidden="true"></div>

              <!-- Precision SVG Dynamic Network Connections -->
              <svg class="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 440 384" preserveAspectRatio="none" aria-hidden="true">
                <circle cx="220" cy="192" r="55" fill="none" stroke="#ffc71a" stroke-width="1" stroke-opacity="0.15"></circle>
                <circle cx="220" cy="192" r="95" fill="none" stroke="#ffc71a" stroke-width="1" stroke-dasharray="3,6" stroke-opacity="0.25"></circle>
                <circle cx="220" cy="192" r="140" fill="none" stroke="#9b8f78" stroke-width="0.75" stroke-dasharray="1,4" stroke-opacity="0.2"></circle>
                <circle cx="220" cy="192" r="175" fill="none" stroke="#ffc71a" stroke-width="0.5" stroke-opacity="0.1"></circle>
                <line x1="220" y1="10" x2="220" y2="374" stroke="#353534" stroke-width="0.75" stroke-dasharray="2,4"></line>
                <line x1="10" y1="192" x2="430" y2="192" stroke="#353534" stroke-width="0.75" stroke-dasharray="2,4"></line>
                <path d="M 220 192 Q 130 150 88 78" fill="none" stroke="#ffc71a" stroke-width="1.5" stroke-opacity="0.7"></path>
                <circle cx="145" cy="132" r="2" fill="#ffc71a" class="animate-pulse"></circle>
                <path d="M 220 192 Q 310 145 352 78" fill="none" stroke="#01e3ff" stroke-width="1.5" stroke-dasharray="4,3" stroke-opacity="0.7"></path>
                <circle cx="292" cy="128" r="2" fill="#01e3ff"></circle>
                <path d="M 220 192 Q 135 235 92 300" fill="none" stroke="#ffc71a" stroke-width="1.5" stroke-opacity="0.7"></path>
                <circle cx="152" cy="250" r="2" fill="#10b981"></circle>
                <path d="M 220 192 Q 305 240 348 300" fill="none" stroke="#ffc71a" stroke-width="1.5" stroke-opacity="0.7"></path>
                <circle cx="288" cy="248" r="2" fill="#ffc71a"></circle>
              </svg>

              <!-- Center Master Hub -->
              <div class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 flex flex-col items-center pointer-events-none">
                <div class="relative flex items-center justify-center">
                  <div class="absolute w-16 h-16 rounded-full bg-primary-container/20 blur-md animate-pulse" aria-hidden="true"></div>
                  <div class="w-12 h-12 rounded-full bg-surface-container border-2 border-primary-container flex items-center justify-center shadow-[0_0_15px_rgba(255,199,26,0.35)] relative z-10">
                    <Icon name="lucide:cloud-sync" :size="22" class="text-primary-container" aria-hidden="true" />
                  </div>
                </div>
                <div class="mt-1.5 px-2 py-0.5 bg-surface-container-high/90 border border-primary-container/40 rounded shadow-sm flex flex-col items-center">
                  <span class="font-mono text-[10px] text-primary-container font-bold uppercase tracking-widest leading-none">{{ page.hero.topology.hubLabel }}</span>
                  <span class="font-mono text-[8px] text-on-surface-variant uppercase leading-tight">{{ page.hero.topology.hubSub }}</span>
                </div>
              </div>

              <!-- Nodes -->
              <div v-for="(node, i) in page.hero.topology.nodes" :key="node.name" class="absolute z-10 w-40 bg-surface-container/95 border p-2 shadow-md hover:border-primary-container transition-all rounded-lg" :class="nodePositions[i]">
                <div class="flex items-center justify-between pb-1 border-b border-surface-variant/40">
                  <span class="font-display text-xs text-on-surface uppercase font-bold tracking-tight leading-none" :style="{ fontFamily: displayFont }">{{ node.name }}</span>
                  <span class="flex items-center gap-1 font-mono text-[9px] text-accent-emerald font-bold">
                    <span class="w-1.5 h-1.5 rounded-full bg-accent-emerald" aria-hidden="true"></span>{{ node.status }}
                  </span>
                </div>
                <div class="mt-1 flex items-center justify-between text-on-surface-variant font-mono text-[10px]">
                  <span>{{ node.windows }}</span>
                  <span class="text-primary-container font-mono font-semibold">{{ node.latency }}</span>
                </div>
                <div class="mt-1 w-full bg-surface-container-lowest h-1 overflow-hidden rounded">
                  <div class="bg-primary-container h-full w-[95%] rounded"></div>
                </div>
                <div class="mt-1 flex items-center justify-between text-on-surface-variant font-mono text-[9px]">
                  <span>{{ node.uptime }}</span>
                  <span class="text-on-surface">{{ node.link }}</span>
                </div>
              </div>
            </div>

            <!-- Bottom telemetry strip -->
            <div class="mt-2 bg-surface-container-lowest px-3 py-2 flex flex-wrap items-center justify-between gap-2 text-on-surface-variant font-mono text-[11px] border-t border-surface-variant/20 rounded-b-lg">
              <div class="flex items-center gap-2">
                <Icon name="lucide:shield-check" :size="14" class="text-primary-container" aria-hidden="true" />
                <span class="text-on-surface font-semibold">{{ page.hero.topology.footerTickets }}</span>
              </div>
              <div class="flex items-center gap-2">
                <span class="text-accent-emerald uppercase font-mono text-[10px]">{{ page.hero.topology.footerIsolation }}</span>
                <span class="w-2 h-2 rounded-full bg-primary-container" aria-hidden="true"></span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- S2: 4 Structural Pillars -->
    <section class="w-full bg-surface-container-lowest px-4 lg:px-12 py-16 lg:py-20">
      <div class="max-w-7xl mx-auto">
        <div class="flex flex-col md:flex-row md:items-end justify-between mb-10 pb-4">
          <div>
            <span class="font-mono text-[11px] text-primary-container uppercase tracking-widest block mb-2">{{ page.pillars.kicker }}</span>
            <h2 class="font-display text-3xl md:text-4xl font-black uppercase text-on-surface tracking-tight" :style="{ fontFamily: displayFont }">
              {{ page.pillars.title }}
            </h2>
          </div>
          <p class="text-on-surface-variant max-w-md mt-4 md:mt-0">
            {{ page.pillars.desc }}
          </p>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div v-for="card in page.pillars.cards" :key="card.code" class="bg-surface-container-low p-6 flex flex-col justify-between shadow-sm hover:bg-surface-container transition-colors rounded-xl">
            <div>
              <div class="flex items-center justify-between mb-4">
                <span class="font-mono text-[11px] text-primary-container">{{ card.code }}</span>
                <Icon :name="card.icon" :size="24" class="text-primary-container" aria-hidden="true" />
              </div>
              <h3 class="font-display text-base text-on-surface uppercase tracking-wide mb-2 font-bold" :style="{ fontFamily: displayFont }">
                {{ card.title }}
              </h3>
              <p class="text-sm text-on-surface-variant mb-4 leading-relaxed">
                {{ card.desc }}
              </p>
            </div>
            <div class="bg-surface-container-lowest p-2 rounded-lg">
              <span class="font-mono text-[10px] text-on-surface-variant uppercase block">{{ card.footerLabel }}</span>
              <span class="font-mono text-sm text-on-surface font-bold">{{ card.footerValue }}</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- S3: Interactive Switcher -->
    <section class="w-full bg-surface px-4 lg:px-12 py-16 lg:py-20" id="switcher-demo">
      <div class="max-w-7xl mx-auto">
        <div class="flex flex-col mb-8">
          <span class="font-mono text-[11px] text-primary-container uppercase tracking-widest block mb-2">{{ page.switcher.kicker }}</span>
          <h2 class="font-display text-3xl md:text-4xl font-black uppercase text-on-surface tracking-tight" :style="{ fontFamily: displayFont }">
            {{ page.switcher.title }}
          </h2>
          <p class="text-lg text-on-surface-variant max-w-3xl">
            {{ page.switcher.desc }}
          </p>
        </div>

        <!-- Terminal workspace -->
        <div class="bg-surface-container-low p-4 md:p-6 shadow-xl rounded-xl">
          <!-- Top switcher bar -->
          <div class="mb-6">
            <div class="flex items-center justify-between pb-2 mb-3">
              <span class="font-mono text-[11px] text-on-surface uppercase tracking-wider flex items-center gap-2">
                <Icon name="lucide:toggle-right" :size="18" class="text-primary-container" aria-hidden="true" />
                {{ page.switcher.selectorLabel }}
              </span>
              <span class="font-mono text-[11px] text-primary-container uppercase">{{ page.switcher.modeLabel }}</span>
            </div>
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
              <button
                v-for="(branch, i) in page.switcher.branches"
                :key="branch.key"
                type="button"
                class="text-left p-4 transition-all flex flex-col justify-between shadow-sm rounded-lg"
                :class="selectedBranchIndex === i
                  ? 'bg-surface-container-high'
                  : 'bg-surface-container hover:bg-surface-container-high'"
                @click="selectBranch(i)"
              >
                <div>
                  <div class="flex items-center justify-between mb-1">
                    <span class="font-display text-sm text-on-surface uppercase font-bold" :style="{ fontFamily: displayFont }">{{ branch.name }}</span>
                    <span class="w-2 h-2 rounded-full bg-primary-container" aria-hidden="true"></span>
                  </div>
                  <p class="font-mono text-[10px] text-on-surface-variant">{{ branch.windows }}</p>
                </div>
                <div class="mt-4 pt-1 flex items-center justify-between text-on-surface-variant font-mono text-[10px]">
                  <span>MONEDA: <strong class="text-on-surface">{{ branch.currency }}</strong></span>
                  <span :class="branch.tone === 'tertiary' ? 'text-tertiary' : 'text-primary-container'">{{ branch.status }}</span>
                </div>
              </button>
            </div>
          </div>

          <!-- Comparative telemetry -->
          <div class="grid grid-cols-1 lg:grid-cols-12 gap-4">
            <!-- Consolidated vs Sede Panel -->
            <div class="lg:col-span-8 bg-surface-container p-4 flex flex-col justify-between shadow-sm rounded-lg">
              <div>
                <div class="flex flex-wrap items-center justify-between pb-2 mb-4">
                  <div>
                    <span class="font-mono text-[10px] text-on-surface-variant uppercase">{{ page.switcher.panel.sessionLabel }}</span>
                    <h3 class="font-display text-lg text-on-surface uppercase font-bold" :style="{ fontFamily: displayFont }">{{ activeBranchData.title }}</h3>
                  </div>
                  <span class="px-2 py-1 bg-surface-container-highest text-primary-container font-mono text-[11px] uppercase font-bold rounded">{{ activeBranchData.currencyBadge }}</span>
                </div>
                <!-- Metrics triad -->
                <div class="grid grid-cols-1 sm:grid-cols-3 gap-2 mb-4">
                  <div class="bg-surface-container-lowest p-3 rounded-lg">
                    <span class="font-mono text-[10px] text-on-surface-variant uppercase block mb-1">{{ page.switcher.panel.metrics.volume.label }}</span>
                    <span class="font-mono text-lg text-primary-container block">{{ activeBranchData.volume }}</span>
                    <span class="font-mono text-[11px] text-on-surface-variant">{{ page.switcher.panel.metrics.volume.sub }}</span>
                  </div>
                  <div class="bg-surface-container-lowest p-3 rounded-lg">
                    <span class="font-mono text-[10px] text-on-surface-variant uppercase block mb-1">{{ page.switcher.panel.metrics.margin.label }}</span>
                    <span class="font-mono text-lg text-on-surface block">{{ activeBranchData.margin }}</span>
                    <span class="font-mono text-[11px] text-primary-container">{{ page.switcher.panel.metrics.margin.sub }}</span>
                  </div>
                  <div class="bg-surface-container-lowest p-3 rounded-lg">
                    <span class="font-mono text-[10px] text-on-surface-variant uppercase block mb-1">{{ page.switcher.panel.metrics.leaks.label }}</span>
                    <span class="font-mono text-lg text-on-surface block">{{ activeBranchData.leaks }}</span>
                    <span class="font-mono text-[11px] text-primary-container">{{ page.switcher.panel.metrics.leaks.sub }}</span>
                  </div>
                </div>
                <!-- Consolidated network strip -->
                <div class="bg-surface-container-low p-3 rounded-lg">
                  <div class="flex items-center justify-between mb-2">
                    <span class="font-mono text-[10px] text-on-surface uppercase">{{ page.switcher.panel.consolidatedLabel }}</span>
                    <span class="font-mono text-[11px] text-primary-container font-bold">{{ page.switcher.panel.consolidatedValue }}</span>
                  </div>
                  <div class="w-full h-12 bg-surface-container-lowest p-1 flex items-center gap-1">
                    <div v-for="(bar, i) in page.switcher.panel.chart" :key="bar.label" :class="chartBarClasses[i]" class="h-full" :style="{ width: bar.width }" :title="bar.title"></div>
                  </div>
                  <div class="flex items-center justify-between text-on-surface-variant font-mono text-[10px] mt-1 uppercase">
                    <span v-for="bar in page.switcher.panel.chart" :key="bar.label">{{ bar.label }}</span>
                  </div>
                </div>
              </div>
              <!-- Footer action -->
              <div class="mt-4 pt-2 flex flex-wrap items-center justify-between gap-2 bg-surface-container-lowest p-2 rounded-lg">
                <div class="flex items-center gap-2 text-on-surface-variant font-mono text-[11px]">
                  <Icon name="lucide:badge-check" :size="16" class="text-primary-container" aria-hidden="true" />
                  <span>{{ page.switcher.panel.footerLabel }}</span>
                </div>
                <NuxtLinkLocale to="/demo" class="text-primary-container hover:text-on-surface font-bold text-sm uppercase tracking-wider flex items-center gap-1 font-display" :style="{ fontFamily: displayFont }">
                  <span>{{ page.switcher.panel.footerLink }}</span>
                  <Icon name="lucide:chevron-right" :size="16" aria-hidden="true" />
                </NuxtLinkLocale>
              </div>
            </div>

            <!-- Branch Config & QR Card -->
            <div class="lg:col-span-4 bg-surface-container p-4 flex flex-col justify-between shadow-sm rounded-lg">
              <div>
                <div class="flex items-center justify-between pb-2 mb-3">
                  <span class="font-mono text-[10px] text-on-surface-variant uppercase">{{ page.switcher.qr.label }}</span>
                  <span class="font-mono text-[11px] text-primary-container font-bold">{{ page.switcher.qr.badge }}</span>
                </div>
                <!-- QR -->
                <div class="bg-surface-container-lowest p-4 flex flex-col items-center justify-center text-center mb-4 rounded-lg">
                  <div class="w-36 h-36 bg-on-surface p-2 shadow-inner flex items-center justify-center mb-2 rounded">
                    <svg class="w-full h-full text-surface-container-lowest fill-current" viewBox="0 0 100 100" role="img" aria-label="QR">
                      <rect fill="black" height="28" width="28" x="5" y="5"></rect>
                      <rect fill="white" height="20" width="20" x="9" y="9"></rect>
                      <rect fill="black" height="12" width="12" x="13" y="13"></rect>
                      <rect fill="black" height="28" width="28" x="67" y="5"></rect>
                      <rect fill="white" height="20" width="20" x="71" y="9"></rect>
                      <rect fill="black" height="12" width="12" x="75" y="13"></rect>
                      <rect fill="black" height="28" width="28" x="5" y="67"></rect>
                      <rect fill="white" height="20" width="20" x="9" y="71"></rect>
                      <rect fill="black" height="12" width="12" x="13" y="75"></rect>
                      <rect fill="black" height="8" width="8" x="42" y="10"></rect>
                      <rect fill="black" height="14" width="6" x="54" y="22"></rect>
                      <rect fill="black" height="20" width="20" x="40" y="40"></rect>
                      <rect fill="black" height="14" width="14" x="10" y="42"></rect>
                      <rect fill="black" height="10" width="18" x="70" y="42"></rect>
                      <rect fill="black" height="18" width="12" x="42" y="70"></rect>
                      <rect fill="black" height="10" width="10" x="65" y="70"></rect>
                      <rect fill="black" height="12" width="12" x="80" y="80"></rect>
                    </svg>
                  </div>
                  <span class="font-mono text-xs text-primary-container uppercase font-bold tracking-wider">{{ activeBranchData.qr }}</span>
                  <span class="font-mono text-[10px] text-on-surface-variant mt-1">{{ page.switcher.qr.scanNote }}</span>
                </div>
                <!-- Rule matrix -->
                <div class="space-y-1 font-mono text-[11px]">
                  <div v-for="spec in page.switcher.qr.specs" :key="spec.key" class="flex items-center justify-between p-2 bg-surface-container-lowest rounded">
                    <span class="text-on-surface-variant uppercase text-[10px]">{{ spec.label }}</span>
                    <span class="text-on-surface font-bold">{{ activeBranchData[spec.key] }}</span>
                  </div>
                </div>
              </div>
              <button type="button" class="w-full mt-4 bg-surface-container-highest hover:bg-surface-bright text-on-surface text-sm py-2 uppercase tracking-wider transition-colors flex items-center justify-center gap-2 rounded-lg font-bold font-display" :style="{ fontFamily: displayFont }">
                <Icon name="lucide:settings" :size="18" aria-hidden="true" />
                <span>{{ page.switcher.qr.button }}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- S4: Commercial Channel -->
    <section class="w-full bg-surface-container-lowest px-4 lg:px-12 py-16 lg:py-20">
      <div class="max-w-7xl mx-auto">
        <div class="bg-surface-container p-6 lg:p-10 shadow-lg relative overflow-hidden rounded-xl">
          <div class="absolute top-0 left-0 w-2 h-full bg-primary-container" aria-hidden="true"></div>
          <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div class="lg:col-span-8 flex flex-col items-start pl-2">
              <div class="inline-flex items-center gap-2 px-3 py-1.5 bg-surface-container-highest text-primary-container font-mono text-[11px] uppercase mb-3 rounded">
                <Icon name="lucide:users" :size="16" aria-hidden="true" />
                <span>{{ page.channel.badge }}</span>
              </div>
              <h2 class="font-display text-2xl md:text-3xl font-black uppercase text-on-surface tracking-tight mb-3" :style="{ fontFamily: displayFont }">
                {{ page.channel.title }}
              </h2>
              <p class="text-lg text-on-surface-variant mb-6 max-w-2xl leading-relaxed">
                {{ page.channel.desc }}
              </p>
              <div class="grid grid-cols-1 sm:grid-cols-3 gap-2 w-full mb-6">
                <div v-for="point in page.channel.points" :key="point.title" class="bg-surface-container-lowest p-3 rounded-lg">
                  <span class="font-mono text-[11px] text-primary-container block font-bold">{{ point.title }}</span>
                  <span class="text-sm text-on-surface">{{ point.desc }}</span>
                </div>
              </div>
              <NuxtLinkLocale
                to="/sellers"
                class="bg-surface-container-highest hover:bg-surface-bright text-on-surface font-bold text-sm px-6 py-3 uppercase tracking-wide transition-colors inline-flex items-center gap-2 rounded-lg font-display"
                :style="{ fontFamily: displayFont }"
              >
                <span>{{ page.channel.cta }}</span>
                <Icon name="lucide:chevron-right" :size="20" aria-hidden="true" />
              </NuxtLinkLocale>
            </div>
            <!-- Micro visual -->
            <div class="lg:col-span-4 bg-surface-container-lowest p-4 shadow-inner flex flex-col justify-between rounded-lg">
              <div class="flex items-center justify-between pb-2 mb-3">
                <span class="font-mono text-[10px] text-on-surface-variant uppercase">{{ page.channel.sim.label }}</span>
                <span class="w-2 h-2 rounded-full bg-primary-container" aria-hidden="true"></span>
              </div>
              <div class="space-y-2 font-mono text-xs">
                <div class="flex items-center justify-between">
                  <span class="text-on-surface-variant">{{ page.channel.sim.agencies.label }}</span>
                  <span class="text-on-surface font-bold">{{ page.channel.sim.agencies.value }}</span>
                </div>
                <div class="flex items-center justify-between">
                  <span class="text-on-surface-variant">{{ page.channel.sim.turnover.label }}</span>
                  <span class="text-on-surface font-bold">{{ page.channel.sim.turnover.value }}</span>
                </div>
                <div class="flex items-center justify-between pt-1 bg-surface-container p-2 rounded">
                  <span class="text-primary-container font-bold">{{ page.channel.sim.commission.label }}</span>
                  <span class="text-primary-container font-bold font-mono">{{ page.channel.sim.commission.value }}</span>
                </div>
              </div>
              <p class="font-mono text-[11px] text-on-surface-variant mt-3 leading-normal">
                {{ page.channel.sim.note }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- S5: Showcase -->
    <section class="w-full bg-surface px-4 lg:px-12 py-16 lg:py-20">
      <div class="max-w-7xl mx-auto">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
          <div v-for="(item, i) in page.showcase.items" :key="item.title" class="relative bg-surface-container p-4 shadow-lg rounded-xl">
            <div class="relative w-full h-72 rounded-lg overflow-hidden bg-surface-container-lowest">
              <img
                :src="showcaseImages[i]"
                :alt="item.title"
                class="w-full h-full object-cover opacity-80"
                loading="lazy"
              >
              <div class="absolute inset-0 bg-gradient-to-t from-surface-container-lowest via-surface-container-lowest/40 to-transparent" aria-hidden="true"></div>
              <div class="absolute bottom-3 left-3 right-3 flex items-end justify-between">
                <div>
                  <span class="font-display text-base text-on-surface uppercase block font-bold" :style="{ fontFamily: displayFont }">{{ item.title }}</span>
                  <span class="font-mono text-[10px] text-on-surface-variant uppercase">{{ item.sub }}</span>
                </div>
              </div>
            </div>
            <div class="mt-2 flex items-center justify-between">
              <div />
              <span class="px-2 py-1 bg-surface-container-highest font-mono text-[11px] text-primary-container rounded">{{ item.badge }}</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- S6: Closing B2B Banner -->
    <section class="w-full bg-surface-container-lowest px-4 lg:px-12 py-16 lg:py-20">
      <div class="max-w-7xl mx-auto bg-surface-container-high p-8 lg:p-12 shadow-xl relative overflow-hidden rounded-xl">
        <div class="absolute -right-24 -bottom-24 w-96 h-96 bg-primary-container/10 rounded-full blur-3xl pointer-events-none" aria-hidden="true"></div>
        <div class="flex flex-col md:flex-row items-center justify-between gap-8 relative z-10">
          <div class="flex flex-col max-w-2xl">
            <div class="flex items-center gap-2 font-mono text-[11px] text-primary-container uppercase mb-2">
              <Icon name="lucide:rocket" :size="18" aria-hidden="true" />
              <span>{{ page.closing.kicker }}</span>
            </div>
            <h2 class="font-display text-2xl md:text-3xl font-black uppercase text-on-surface tracking-tight mb-3" :style="{ fontFamily: displayFont }">
              {{ page.closing.title }}
            </h2>
            <p class="text-lg text-on-surface-variant">
              {{ page.closing.desc }}
            </p>
          </div>
          <div class="shrink-0 w-full md:w-auto">
            <NuxtLinkLocale
              to="/demo"
              class="w-full md:w-auto bg-primary-container hover:bg-primary-fixed-dim text-on-primary-container font-bold text-sm px-8 py-4 uppercase tracking-wide transition-all shadow-md flex items-center justify-center gap-2 rounded-lg font-display"
              :style="{ fontFamily: displayFont }"
            >
              <span>{{ page.closing.cta }}</span>
              <Icon name="lucide:arrow-right" :size="22" aria-hidden="true" />
            </NuxtLinkLocale>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
