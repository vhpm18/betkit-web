<script setup lang="ts">
const displayFont = "'Archivo Narrow', 'Archivo', sans-serif"
const page = usePageMessages<{
  fullTitle: string
  fullDesc: string
  telemetry: {
    engineLabel: string
    engineSub: string
    resolutionLabel: string
    resolutionValue: string
    qrLabel: string
    qrValue: string
    updateLabel: string
  }
  hero: {
    badge: string
    title: string
    titleHighlight: string
    subtitle: string
    searchPlaceholder: string
    searchClearHint: string
    searchAriaLabel: string
    filtersAriaLabel: string
    filters: Array<{ category: string, label: string }>
    stats: Array<{ label: string, value: string, sub: string, tone: string }>
  }
  catalog: {
    kicker: string
    title: string
    desc: string
    cards: Array<{
      category: string
      badge: string
      badgeTone: string
      code: string
      title: string
      desc: string
      specs: Array<{ label: string, value: string, tone: string }>
      venues: string
      action: string
    }>
    compliance: {
      icon: string
      kicker: string
      title: string
      desc: string
      tracks: Array<{ name: string, rule: string }>
    }
  }
  simulator: {
    kicker: string
    title: string
    desc: string
    terminal: {
      ariaLabel: string
      counterLabel: string
      status: string
      trackLabel: string
      tracks: Array<{ id: string, label: string }>
      raceLabel: string
      raceClose: string
      races: string[]
      betTypeLabel: string
      betTypes: Array<{ id: string, label: string, hotkey: string }>
      runnersLabel: string
      runners: string[]
      stakeLabel: string
      stakes: number[]
      emitLabel: string
      printing: string
      emitted: string
    }
    ticket: {
      ariaLabel: string
      brand: string
      brandSub: string
      meta: { date: string, track: string, race: string, mode: string }
      combosLabel: string
      unitBets: string
      totalLabel: string
      hash: string
      expires: string
      qrAriaLabel: string
      printerNote: string
    }
  }
  banker: {
    kicker: string
    title: string
    desc: string
    cards: Array<{ icon: string, title: string, desc: string, footer: string }>
  }
  deploy: {
    kicker: string
    title: string
    desc: string
    cta: string
  }
  cta: {
    kicker: string
    title: string
    desc: string
    primary: string
    secondary: string
    telemetry: string[]
  }
}>('features.betTypes')

// === Catalog filters (S2) ===
const activeCategory = ref('all')
const searchQuery = ref('')

function onSearchKeydown(e: KeyboardEvent) {
  if (e.key === 'Escape') {
    searchQuery.value = ''
  }
}

const visibleCards = computed(() => {
  const q = searchQuery.value.toLowerCase().trim()
  return page.catalog.cards.filter((card) => {
    const matchesCat = activeCategory.value === 'all' || card.category === activeCategory.value
    const text = [card.title, card.desc, card.badge, card.code, card.venues, card.action, ...card.specs.map((s) => s.label + ' ' + s.value)]
      .join(' ')
      .toLowerCase()
    const matchesQuery = q.length === 0 || text.includes(q)
    return matchesCat && matchesQuery
  })
})

// === Ticket simulator (S4) ===
const activeTrack = ref(0)
const activeRace = ref('R4')
const activeBetType = ref(1) // TRIFECTA BOX
const activeStake = ref(500)
const selectedRunners = ref<string[]>(['3', '5', '7'])
const emitting = ref(false)
const emitDone = ref(false)

function toggleRunner(num: string) {
  const i = selectedRunners.value.indexOf(num)
  if (i >= 0) {
    if (selectedRunners.value.length > 2) {
      selectedRunners.value.splice(i, 1)
    }
  }
  else {
    selectedRunners.value.push(num)
    selectedRunners.value.sort((a, b) => parseInt(a) - parseInt(b))
  }
}

function computeFormulas(): number {
  const n = selectedRunners.value.length
  const type = page.simulator.terminal.betTypes[activeBetType.value]?.id ?? ''
  if (type.includes('BOX')) {
    const m = n * (n - 1) * (n - 2)
    return m < 1 ? 1 : m
  }
  if (type === 'EXACTA') {
    return n > 1 ? n * (n - 1) : 1
  }
  return n
}

const totalStake = computed(() => computeFormulas() * activeStake.value)

function formatUsdAr(n: number) {
  return '$' + n.toLocaleString('es-AR') + ',00'
}

const ticketUnitBets = computed(() =>
  page.simulator.ticket.unitBets.replace('{count}', String(computeFormulas())).replace('{stake}', '$' + activeStake.value.toLocaleString('es-AR')),
)
const ticketRunners = computed(() => {
  const box = page.simulator.terminal.betTypes[activeBetType.value]?.id.includes('BOX') ? ' BOX' : ''
  return `[ ${selectedRunners.value.join(' - ')} ]${box}`
})
const ticketMode = computed(() => {
  const b = page.simulator.terminal.betTypes[activeBetType.value]
  return b ? b.id + (b.id.includes('BOX') ? ' (' + computeFormulas() + ' FÓRMULAS)' : '') : ''
})

function emitTicket() {
  if (emitting.value) return
  emitting.value = true
  setTimeout(() => {
    emitting.value = false
    emitDone.value = true
    setTimeout(() => { emitDone.value = false }, 1200)
  }, 700)
}

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
    <!-- S0: Top Telemetry & Status Bar -->
    <section class="relative w-full px-4 sm:px-8 lg:px-12 py-5 bg-surface-container-lowest">
      <div class="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div class="flex items-center gap-3">
          <span class="relative flex h-2.5 w-2.5">
            <span class="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary-container opacity-60" aria-hidden="true"></span>
            <span class="relative inline-flex rounded-full h-2.5 w-2.5 bg-primary-container" aria-hidden="true"></span>
          </span>
          <span class="font-mono text-[11px] font-medium uppercase tracking-[0.15em] text-primary-container">{{ page.telemetry.engineLabel }}</span>
          <span class="text-outline-variant" aria-hidden="true">/</span>
          <span class="font-mono text-[11px] text-on-surface-variant">{{ page.telemetry.engineSub }}</span>
        </div>
        <div class="flex flex-wrap items-center gap-x-6 gap-y-2 font-mono text-[11px] text-on-surface-variant">
          <div class="flex items-center gap-1.5">
            <Icon name="lucide:gauge" :size="16" class="text-tertiary-fixed" aria-hidden="true" />
            <span class="text-on-surface">{{ page.telemetry.resolutionLabel }} <strong class="text-primary-container font-mono font-bold">{{ page.telemetry.resolutionValue }}</strong></span>
          </div>
          <div class="hidden sm:flex items-center gap-1.5">
            <Icon name="lucide:shield-check" :size="16" class="text-primary-container" aria-hidden="true" />
            <span>{{ page.telemetry.qrLabel }} <strong class="text-tertiary">{{ page.telemetry.qrValue }}</strong></span>
          </div>
        </div>
      </div>
    </section>

    <!-- S1: Hero Minimalista de Alto Impacto -->
    <section class="w-full px-4 lg:px-12 pt-14 pb-20 bg-gradient-to-b from-surface-container-low via-surface to-surface flex flex-col items-start relative overflow-hidden hud-grid">
      <!-- Ambient glow behind hero -->
      <div class="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-brand-yellow/10 blur-[130px] rounded-full pointer-events-none z-0" aria-hidden="true"></div>
      <!-- Radial glow -->
      <div class="absolute right-0 top-0 w-1/2 h-full opacity-10 pointer-events-none bg-[radial-gradient(circle_at_top_right,#ffc71a,transparent_70%)]" aria-hidden="true"></div>
      <div class="relative z-10">
        <!-- Badge -->
        <div class="inline-flex items-center gap-2.5 px-3 py-1.5 rounded-full bg-surface-container-high text-on-surface shadow-sm mb-6">
          <span class="w-2 h-2 rounded-full bg-primary-container animate-pulse" aria-hidden="true"></span>
          <span class="font-mono text-[11px] tracking-widest uppercase text-primary-container">{{ page.hero.badge }}</span>
        </div>

        <!-- Headline -->
        <h1 class="font-display text-4xl md:text-5xl lg:text-6xl font-black text-on-surface tracking-tight uppercase max-w-5xl leading-[1.08] mb-6" :style="{ fontFamily: displayFont }">
          {{ page.hero.title }}
          <br>
          <span class="text-primary-container">{{ page.hero.titleHighlight }}</span>
        </h1>

        <!-- Subtitle -->
        <p class="text-lg md:text-xl text-on-surface-variant max-w-3xl leading-relaxed mb-10">
          {{ page.hero.subtitle }}
        </p>

        <!-- Search & Quick Filters Terminal Bar -->
        <div class="w-full max-w-4xl bg-surface-container-high p-2 rounded-xl shadow-xl flex flex-col md:flex-row items-center gap-2">
          <div class="relative w-full md:flex-1 flex items-center bg-surface-container-lowest rounded-lg px-4 py-3">
            <Icon name="lucide:search" :size="22" class="text-primary-container mr-3 shrink-0" aria-hidden="true" />
            <input
              v-model="searchQuery"
              type="text"
              class="w-full bg-transparent text-on-surface placeholder:text-on-surface-variant/50 focus:outline-none text-sm"
              :placeholder="page.hero.searchPlaceholder"
              :aria-label="page.hero.searchAriaLabel"
              @keydown="onSearchKeydown"
            >
            <span class="font-mono text-[10px] text-on-surface-variant/60 hidden sm:inline-block ml-3">{{ page.hero.searchClearHint }}</span>
          </div>
          <!-- Quick Filter Category Pills -->
          <div class="flex items-center gap-1.5 w-full md:w-auto overflow-x-auto p-1 font-mono text-xs" role="tablist" :aria-label="page.hero.filtersAriaLabel">
            <button
              v-for="filter in page.hero.filters"
              :key="filter.category"
              type="button"
              role="tab"
              :aria-selected="activeCategory === filter.category"
              class="px-3.5 py-2.5 rounded font-bold transition-all whitespace-nowrap"
              :class="activeCategory === filter.category
                ? 'bg-primary-container text-on-primary-fixed shadow-sm'
                : 'bg-surface-container-lowest text-on-surface-variant hover:text-on-surface hover:bg-surface-container'"
              @click="activeCategory = filter.category"
            >
              {{ filter.label }}
            </button>
          </div>
        </div>

        <!-- Quick Stats Grid -->
        <div class="grid grid-cols-2 md:grid-cols-4 gap-6 w-full max-w-4xl mt-12 pt-8">
          <div v-for="(stat, i) in page.hero.stats" :key="i" class="flex flex-col">
            <span class="font-mono text-[11px] text-on-surface-variant uppercase">{{ stat.label }}</span>
            <span class="text-2xl font-bold mt-1 font-mono" :class="stat.tone === 'primary' ? 'text-primary-container' : stat.tone === 'tertiary' ? 'text-tertiary' : 'text-on-surface'">
              {{ stat.value }}
            </span>
            <span class="text-xs text-on-surface-variant">{{ stat.sub }}</span>
          </div>
        </div>
      </div>
    </section>

    <!-- S2: Interactive Catalog Showcase -->
    <section class="w-full px-4 lg:px-12 py-16 bg-surface-container-lowest">
      <div class="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
        <div>
          <div class="font-mono text-[11px] uppercase tracking-wider text-primary-container mb-2">{{ page.catalog.kicker }}</div>
          <h2 class="font-display text-3xl md:text-4xl font-black uppercase text-on-surface tracking-tight" :style="{ fontFamily: displayFont }">
            {{ page.catalog.title }}
          </h2>
        </div>
        <p class="text-on-surface-variant max-w-md text-sm leading-relaxed">
          {{ page.catalog.desc }}
        </p>
      </div>

      <!-- Bet Type Cards Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div
          v-for="(card, i) in visibleCards"
          :key="i"
          class="bg-surface-container-high rounded-xl p-6 shadow-md hover:shadow-xl transition-all flex flex-col justify-between"
        >
          <div>
            <div class="flex items-center justify-between mb-4">
              <span
                class="px-2.5 py-1 rounded font-mono text-[11px] font-semibold uppercase"
                :class="card.badgeTone === 'primary' ? 'bg-surface-container-highest text-primary-container'
                  : card.badgeTone === 'tertiary' ? 'bg-surface-container-highest text-tertiary'
                  : card.badgeTone === 'container' ? 'bg-primary-container text-on-primary-fixed'
                  : 'bg-surface-container-highest text-on-surface'"
              >
                {{ card.badge }}
              </span>
              <span class="font-mono text-[11px] text-on-surface-variant">{{ card.code }}</span>
            </div>
            <h3 class="font-display text-xl text-on-surface uppercase mb-2 font-bold" :style="{ fontFamily: displayFont }">
              {{ card.title }}
            </h3>
            <p class="text-on-surface-variant text-sm mb-6 leading-relaxed">
              {{ card.desc }}
            </p>
            <div class="bg-surface-container-lowest p-3.5 rounded-lg mb-4 space-y-2">
              <div v-for="(spec, j) in card.specs" :key="j" class="flex justify-between font-mono text-[11px] text-on-surface-variant">
                <span>{{ spec.label }}</span>
                <span :class="spec.tone === 'primary' ? 'text-primary-container font-bold' : spec.tone === 'tertiary' ? 'text-tertiary' : 'text-on-surface'">
                  {{ spec.value }}
                </span>
              </div>
            </div>
          </div>
          <div class="flex items-center justify-between pt-4 font-mono text-[11px] text-on-surface-variant">
            <span class="flex items-center gap-1.5">
              <span class="w-2 h-2 rounded-full bg-primary-container" aria-hidden="true"></span>
              {{ card.venues }}
            </span>
            <span class="text-primary-container flex items-center font-bold">
              {{ card.action }}
              <Icon name="lucide:arrow-forward" :size="14" class="ml-1" aria-hidden="true" />
            </span>
          </div>
        </div>
      </div>

      <!-- Empty state (no results) -->
      <div v-if="visibleCards.length === 0" class="text-center py-16 text-on-surface-variant">
        <p class="font-mono text-sm">Sin resultados para «{{ searchQuery }}»</p>
      </div>

      <!-- S3: Compliance Banner -->
      <div class="mt-12 p-8 bg-surface-container rounded-xl flex flex-col lg:flex-row items-center justify-between gap-8 shadow-lg">
        <div class="space-y-3 max-w-2xl">
          <div class="inline-flex items-center gap-2 text-primary-container font-mono text-[11px]">
            <Icon :name="page.catalog.compliance.icon" :size="18" aria-hidden="true" />
            <span>{{ page.catalog.compliance.kicker }}</span>
          </div>
          <h4 class="font-display text-xl text-on-surface uppercase" :style="{ fontFamily: displayFont }">
            {{ page.catalog.compliance.title }}
          </h4>
          <p class="text-on-surface-variant text-sm leading-relaxed">
            {{ page.catalog.compliance.desc }}
          </p>
        </div>
        <div class="flex flex-wrap items-center gap-3">
          <div v-for="track in page.catalog.compliance.tracks" :key="track.name" class="px-4 py-3 bg-surface-container-highest rounded-lg text-center">
            <div class="font-mono text-[11px] text-on-surface font-bold">{{ track.name }}</div>
            <div class="font-mono text-[11px] text-primary-container">{{ track.rule }}</div>
          </div>
        </div>
      </div>
    </section>

    <!-- S4: Window / Ticket Simulator -->
    <section class="w-full px-4 lg:px-12 py-20 bg-surface flex flex-col items-center">
      <div class="text-center max-w-3xl mb-14 space-y-3">
        <div class="inline-flex items-center gap-2 px-3 py-1 rounded bg-surface-container text-primary-container font-mono text-[11px]">
          <Icon name="lucide:zap" :size="16" aria-hidden="true" />
          <span>{{ page.simulator.kicker }}</span>
        </div>
        <h2 class="font-display text-3xl md:text-4xl font-black uppercase text-on-surface tracking-tight" :style="{ fontFamily: displayFont }">
          {{ page.simulator.title }}
        </h2>
        <p class="text-on-surface-variant">
          {{ page.simulator.desc }}
        </p>
      </div>

      <!-- Terminal & Ticket Interactive Stage -->
      <div class="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <!-- Interactive Terminal Controls (Left 7 Cols) -->
        <div class="lg:col-span-7 bg-surface-container-high p-6 rounded-xl shadow-2xl flex flex-col gap-6" role="region" :aria-label="page.simulator.terminal.ariaLabel">
          <div class="flex items-center justify-between pb-4">
            <div class="flex items-center gap-3">
              <span class="w-3 h-3 rounded-full bg-primary-container" aria-hidden="true"></span>
              <span class="font-mono text-[11px] text-on-surface font-bold">{{ page.simulator.terminal.counterLabel }}</span>
            </div>
            <span class="font-mono text-[11px] px-2 py-1 rounded bg-surface-container-lowest text-tertiary">{{ page.simulator.terminal.status }}</span>
          </div>

          <!-- Track Selector -->
          <div>
            <span class="font-mono text-[11px] text-on-surface-variant block mb-2">{{ page.simulator.terminal.trackLabel }}</span>
            <div class="grid grid-cols-3 gap-2">
              <button
                v-for="(track, i) in page.simulator.terminal.tracks"
                :key="i"
                type="button"
                class="py-2 px-3 rounded font-bold text-sm uppercase text-center font-display transition-colors"
                :style="{ fontFamily: displayFont }"
                :class="activeTrack === i
                  ? 'bg-primary-container text-on-primary-fixed'
                  : 'bg-surface-container-lowest text-on-surface hover:bg-surface-container'"
                @click="activeTrack = i"
              >
                {{ track.label }}
              </button>
            </div>
          </div>

          <!-- Race Selector -->
          <div>
            <div class="flex justify-between items-center mb-2">
              <span class="font-mono text-[11px] text-on-surface-variant">{{ page.simulator.terminal.raceLabel }}</span>
              <span class="font-mono text-[11px] text-primary-container">{{ page.simulator.terminal.raceClose }}</span>
            </div>
            <div class="flex items-center gap-2 overflow-x-auto pb-1 font-mono text-xs">
              <button
                v-for="race in page.simulator.terminal.races"
                :key="race"
                type="button"
                class="px-4 py-2 rounded font-bold transition-colors"
                :class="activeRace === race
                  ? 'bg-primary-container text-on-primary-fixed'
                  : 'bg-surface-container-lowest text-on-surface-variant hover:text-on-surface'"
                @click="activeRace = race"
              >
                {{ race }}
              </button>
            </div>
          </div>

          <!-- Bet Type Fast Buttons -->
          <div>
            <span class="font-mono text-[11px] text-on-surface-variant block mb-2">{{ page.simulator.terminal.betTypeLabel }}</span>
            <div class="grid grid-cols-4 gap-2">
              <button
                v-for="(bet, i) in page.simulator.terminal.betTypes"
                :key="i"
                type="button"
                class="py-2.5 rounded font-bold text-sm uppercase text-center font-display transition-colors"
                :style="{ fontFamily: displayFont }"
                :class="activeBetType === i
                  ? 'bg-primary-container text-on-primary-fixed'
                  : 'bg-surface-container text-on-surface hover:bg-surface-container-highest'"
                @click="activeBetType = i"
              >
                {{ bet.label }} [{{ bet.hotkey }}]
              </button>
            </div>
          </div>

          <!-- Runner Selection Row -->
          <div>
            <span class="font-mono text-[11px] text-on-surface-variant block mb-2">{{ page.simulator.terminal.runnersLabel }}</span>
            <div class="grid grid-cols-8 gap-1.5">
              <button
                v-for="num in page.simulator.terminal.runners"
                :key="num"
                type="button"
                class="py-3 rounded font-bold text-lg font-display transition-colors"
                :style="{ fontFamily: displayFont }"
                :class="selectedRunners.includes(num)
                  ? 'bg-primary-container text-on-primary-fixed'
                  : 'bg-surface-container-lowest text-on-surface hover:bg-surface-container'"
                @click="toggleRunner(num)"
              >
                {{ num }}
              </button>
            </div>
          </div>

          <!-- Stake Denomination + Emit -->
          <div class="flex items-center justify-between gap-4 pt-2">
            <div class="flex flex-wrap items-center gap-2">
              <span class="font-mono text-[11px] text-on-surface-variant">{{ page.simulator.terminal.stakeLabel }}</span>
              <button
                v-for="stake in page.simulator.terminal.stakes"
                :key="stake"
                type="button"
                class="px-3 py-1.5 rounded font-mono text-sm transition-colors"
                :class="activeStake === stake
                  ? 'bg-primary-container text-on-primary-fixed font-bold'
                  : 'bg-surface-container-highest text-on-surface hover:bg-surface-container-lowest'"
                @click="activeStake = stake"
              >
                ${{ stake.toLocaleString('es-AR') }}
              </button>
            </div>
            <button
              type="button"
              class="px-6 py-3 rounded bg-primary-container hover:bg-primary-fixed-dim active:scale-95 text-on-primary-fixed font-bold text-sm uppercase tracking-wider shadow-lg flex items-center gap-2 transition-all font-display shrink-0"
              :style="{ fontFamily: displayFont }"
              @click="emitTicket"
            >
              <Icon :name="emitting ? 'lucide:refresh-cw' : emitDone ? 'lucide:check' : 'lucide:printer'" :size="20" :class="emitting ? 'animate-spin' : ''" aria-hidden="true" />
              <span>{{ emitting ? page.simulator.terminal.printing : emitDone ? page.simulator.terminal.emitted : page.simulator.terminal.emitLabel }}</span>
            </button>
          </div>
        </div>

        <!-- Thermal Printed Ticket Visualizer (Right 5 Cols) -->
        <div class="lg:col-span-5 flex flex-col items-center" role="region" :aria-label="page.simulator.ticket.ariaLabel">
          <!-- Physical Thermal Paper Look -->
          <div class="w-full max-w-sm bg-[#faf8f5] text-[#121212] p-6 rounded-t-lg shadow-2xl font-mono text-xs relative">
            <!-- Subtle Paper Zigzag cut top -->
            <div class="absolute -top-2 left-0 w-full h-2" style="background-image: radial-gradient(circle, transparent 2px, #faf8f5 2px); background-size: 6px 6px;" aria-hidden="true"></div>

            <!-- Header -->
            <div class="text-center pb-4 mb-4 border-b border-dashed border-stone-400">
              <div class="font-black text-lg tracking-wider">{{ page.simulator.ticket.brand }}</div>
              <div class="text-[11px] font-medium text-stone-600">{{ page.simulator.ticket.brandSub }}</div>
              <div class="text-[11px] text-stone-700 mt-1 font-medium">{{ ticketUnitBets }}</div>
            </div>

            <!-- Transaction Metas -->
            <div class="space-y-1 text-xs border-b border-dashed border-stone-400 pb-3 mb-3">
              <div class="flex justify-between"><span class="text-stone-600">{{ page.simulator.ticket.meta.date }}</span><span class="font-bold">2025-05-18 14:31:09</span></div>
              <div class="flex justify-between"><span class="text-stone-600">{{ page.simulator.ticket.meta.track }}</span><span class="font-bold">{{ page.simulator.terminal.tracks[activeTrack].id }}</span></div>
              <div class="flex justify-between"><span class="text-stone-600">{{ page.simulator.ticket.meta.race }}</span><span class="font-bold">{{ activeRace }} (1600 Mts)</span></div>
              <div class="flex justify-between"><span class="text-stone-600">{{ page.simulator.ticket.meta.mode }}</span><span class="font-bold">{{ ticketMode }}</span></div>
            </div>

            <!-- Runners Selection Body -->
            <div class="py-2 mb-3 border-b border-dashed border-stone-400">
              <div class="text-stone-600 text-[11px] uppercase mb-1">{{ page.simulator.ticket.combosLabel }}</div>
              <div class="font-mono text-base font-black tracking-widest text-stone-900">{{ ticketRunners }}</div>
              <div class="text-[11px] text-stone-700 mt-1 font-medium">{{ ticketUnitBets }}</div>
            </div>

            <!-- Total Calculation -->
            <div class="flex justify-between items-baseline py-2 mb-4 bg-stone-200 px-3 rounded">
              <span class="text-xs font-bold uppercase tracking-wider text-stone-700">{{ page.simulator.ticket.totalLabel }}</span>
              <span class="font-mono text-xl font-black text-black">{{ formatUsdAr(totalStake) }}</span>
            </div>

            <!-- Security QR & Hash -->
            <div class="flex flex-col items-center justify-center pt-2">
              <div class="p-2 bg-white rounded shadow-sm border border-stone-300 mb-2">
                <svg class="w-28 h-28" fill="#121212" viewBox="0 0 100 100" role="img" :aria-label="page.simulator.ticket.qrAriaLabel">
                  <rect fill="none" height="25" stroke="#121212" stroke-width="6" width="25" x="5" y="5"></rect>
                  <rect height="11" width="11" x="12" y="12"></rect>
                  <rect fill="none" height="25" stroke="#121212" stroke-width="6" width="25" x="70" y="5"></rect>
                  <rect height="11" width="11" x="77" y="12"></rect>
                  <rect fill="none" height="25" stroke="#121212" stroke-width="6" width="25" x="5" y="70"></rect>
                  <rect height="11" width="11" x="12" y="77"></rect>
                  <rect height="6" width="6" x="35" y="10"></rect>
                  <rect height="6" width="6" x="45" y="10"></rect>
                  <rect height="6" width="6" x="55" y="15"></rect>
                  <rect height="6" width="6" x="35" y="25"></rect>
                  <rect height="6" width="16" x="45" y="35"></rect>
                  <rect height="6" width="15" x="10" y="45"></rect>
                  <rect height="12" width="6" x="35" y="50"></rect>
                  <rect height="6" width="12" x="50" y="50"></rect>
                  <rect height="6" width="10" x="70" y="45"></rect>
                  <rect height="8" width="8" x="85" y="50"></rect>
                  <rect height="8" width="8" x="70" y="70"></rect>
                  <rect height="6" width="12" x="82" y="75"></rect>
                  <rect height="18" width="6" x="45" y="75"></rect>
                  <rect height="8" width="8" x="55" y="80"></rect>
                </svg>
              </div>
              <div class="text-[10px] font-mono text-stone-700 uppercase tracking-tight text-center max-w-[240px] truncate font-semibold">{{ page.simulator.ticket.hash }}</div>
              <div class="text-[10px] text-stone-700 mt-1 uppercase text-center font-medium">{{ page.simulator.ticket.expires }}</div>
            </div>
          </div>

          <!-- Sub-status badge -->
          <div class="mt-4 flex items-center gap-2 font-mono text-[11px] text-on-surface-variant">
            <Icon name="lucide:badge-check" :size="16" class="text-primary-container" aria-hidden="true" />
            <span>{{ page.simulator.ticket.printerNote }}</span>
          </div>
        </div>
      </div>
    </section>

    <!-- S5: Banker Benefits -->
    <section class="w-full px-4 lg:px-12 py-20 bg-surface-container-low">
      <div class="max-w-4xl mb-14">
        <div class="font-mono text-[11px] uppercase tracking-wider text-primary-container mb-2">{{ page.banker.kicker }}</div>
        <h2 class="font-display text-3xl md:text-4xl font-black uppercase text-on-surface tracking-tight" :style="{ fontFamily: displayFont }">
          {{ page.banker.title }}
        </h2>
        <p class="text-on-surface-variant mt-2 max-w-2xl leading-relaxed">
          {{ page.banker.desc }}
        </p>
      </div>

      <!-- 3 Big Clean Cards -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div
          v-for="(card, i) in page.banker.cards"
          :key="i"
          class="bg-surface-container rounded-xl p-8 shadow-md flex flex-col justify-between"
        >
          <div>
            <div class="w-12 h-12 rounded-xl bg-surface-container-highest flex items-center justify-center text-primary-container mb-6">
              <Icon :name="card.icon" :size="28" aria-hidden="true" />
            </div>
            <h3 class="font-display text-lg text-on-surface uppercase mb-3 font-bold" :style="{ fontFamily: displayFont }">
              {{ card.title }}
            </h3>
            <p class="text-on-surface-variant leading-relaxed text-sm">
              {{ card.desc }}
            </p>
          </div>
          <div class="mt-8 pt-4 bg-surface-container flex items-center justify-between font-mono text-[11px] text-primary-container">
            <span>{{ card.footer }}</span>
            <Icon name="lucide:check-circle" :size="16" aria-hidden="true" />
          </div>
        </div>
      </div>
    </section>

    <!-- S6: Editorial Proof Break + Final CTA -->
    <section class="w-full px-4 lg:px-12 py-12 bg-surface-container-lowest flex flex-col items-center">
      <div class="w-full max-w-6xl bg-surface-container-high rounded-xl p-8 lg:p-12 flex flex-col md:flex-row items-center justify-between gap-8">
        <div class="space-y-4 max-w-xl">
          <span class="font-mono text-[11px] uppercase font-bold text-primary-container">{{ page.deploy.kicker }}</span>
          <h3 class="font-display text-2xl md:text-3xl font-black uppercase leading-none text-on-surface" :style="{ fontFamily: displayFont }">
            {{ page.deploy.title }}
          </h3>
          <p class="text-on-surface-variant">
            {{ page.deploy.desc }}
          </p>
        </div>
        <div class="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
          <NuxtLinkLocale
            to="/demo"
            class="px-8 py-4 rounded bg-primary-container hover:bg-primary-fixed-dim text-on-primary-fixed font-bold text-sm uppercase tracking-wider transition-all text-center shadow-md font-display"
            :style="{ fontFamily: displayFont }"
          >
            {{ page.deploy.cta }}
          </NuxtLinkLocale>
        </div>
      </div>
    </section>

    <section class="w-full px-4 lg:px-12 py-24 bg-surface flex flex-col items-center text-center relative overflow-hidden">
      <div class="w-24 h-1 bg-primary-container mb-8" aria-hidden="true"></div>
      <div class="font-mono text-[11px] text-primary-container uppercase tracking-widest mb-3">
        {{ page.cta.kicker }}
      </div>
      <h2 class="font-display text-2xl md:text-3xl lg:text-4xl font-black uppercase max-w-3xl leading-tight text-on-surface mb-6" :style="{ fontFamily: displayFont }">
        {{ page.cta.title }}
      </h2>
      <p class="text-lg text-on-surface-variant max-w-2xl mb-10 leading-relaxed">
        {{ page.cta.desc }}
      </p>
      <div class="flex flex-col sm:flex-row items-center gap-4">
        <NuxtLinkLocale
          to="/demo"
          class="px-8 py-4 rounded bg-primary-container hover:bg-primary-fixed-dim text-on-primary-fixed font-bold text-sm uppercase tracking-wider transition-all shadow-xl font-display"
          :style="{ fontFamily: displayFont }"
        >
          {{ page.cta.primary }}
        </NuxtLinkLocale>
        <NuxtLinkLocale
          to="/contacto"
          class="px-8 py-4 rounded bg-surface-container-high hover:bg-surface-container-highest text-on-surface font-bold text-sm uppercase tracking-wider transition-all font-display"
          :style="{ fontFamily: displayFont }"
        >
          {{ page.cta.secondary }}
        </NuxtLinkLocale>
      </div>

      <!-- Live Telemetry Micro-line -->
      <div class="mt-16 flex flex-wrap items-center justify-center gap-4 text-on-surface-variant font-mono text-[11px]">
        <template v-for="(item, i) in page.cta.telemetry" :key="i">
          <span v-if="i > 0" class="" aria-hidden="true">·</span>
          <span class="flex items-center gap-1.5">
            <span v-if="i === 0" class="w-2 h-2 rounded-full bg-primary-container" aria-hidden="true"></span>
            {{ item }}
          </span>
        </template>
      </div>
    </section>
  </div>
</template>
