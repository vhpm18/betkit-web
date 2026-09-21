<script setup lang="ts">
const displayFont = "'Archivo Narrow', 'Archivo', sans-serif"
const page = usePageMessages<{
  fullTitle: string
  fullDesc: string
  telemetry: { driver: string, spooler: string, sha: string, latency: string }
  hero: {
    badge: string
    title: string
    desc: string
    ctaDemo: string
    ctaSpec: string
    stats: Array<{ label: string, value: string, sub: string, tone?: string }>
  }
  simulator: {
    kicker: string
    title: string
    widthLabel: string
    width58: string
    width80: string
    templates: Array<{ key: string, label: string, sub: string }>
    printerLabel: string
    ticket: {
      brand: string
      agency: string
      cuit: string
      terminal: string
      cashier: string
      ticketNo: string
      trackLabel: string
      baseLabel: string
      combosLabel: string
      totalLabel: string
      qrHint: string
      hashLabel: string
      legal: string
    }
    hardware: {
      title: string
      status: string
      specs: Array<{ label: string, value: string, tone: string }>
      profileLabel: string
      profiles: string[]
      testTitle: string
      testPort: string
      testDesc: string
      testBtn: string
      testAlert: string
      calloutTitle: string
      calloutDesc: string
    }
  }
  features: {
    kicker: string
    title: string
    desc: string
    cards: Array<{ code: string, icon: string, title: string, desc: string, footer: string }>
    wide: {
      code: string
      icon: string
      title: string
      desc: string
      levels: Array<{ title: string, desc: string }>
      footer: string
    }
  }
  flow: {
    kicker: string
    title: string
    desc: string
    steps: Array<{ num: string, badge: string, title: string, desc: string, icon: string, footer: string, tone: string }>
    diagram: { label: string, title: string, endpoint: string }
  }
  guarantee: { kicker: string, title: string, desc: string, ctaDemo: string, ctaWhatsapp: string }
}>('features.printing')

// === Ticket simulator state (S2) ===
const activeTemplate = ref('simple')
const ticketWidth = ref('80')
const printing = ref(false)
const printAlert = ref(false)

// Template data for the live ticket render
const templateData = {
  simple: {
    track: 'SAN ISIDRO (ARG)',
    race: 'CARRERA 8 · 1600M',
    type: 'TIPO: GANADOR (WIN)',
    typeRight: 'DIV: TABLERO',
    rows: [
      { name: '#4 DON TICIANO', value: '$ 250.00', sub: 'JOCKEY: W. PEREYRA', subRight: 'CAT: TP-1' },
    ],
    base: '$ 250.00',
    combos: '1 JUGADA',
    total: '$ 250.00 ARS',
    hash: 'e89b4317fbc8201a44e50d68f7129ca99f430294101e405a76cb4723bb1d92a1',
  },
  multi: {
    track: 'PALERMO (ARG)',
    race: 'CARRERA 5 · 1000M',
    type: 'TIPO: COMBINADA MULTI',
    typeRight: 'MULTIPLE BOLETO',
    rows: [
      { name: '#2 EL GRAN PATRON (GAN)', value: '$ 150.00' },
      { name: '#7 MISS VALENTINA (PLA)', value: '$ 150.00' },
      { name: '#11 SOY VELOZ (TER)', value: '$ 150.00' },
    ],
    base: '$ 150.00 / ITEM',
    combos: '3 SELECCIONES',
    total: '$ 450.00 ARS',
    hash: 'a4387d81239f82d001b3309e4a812389104c8e7631980a34bcf10948ac0193bb',
  },
  combo: {
    track: 'LA PLATA (ARG)',
    race: 'CARRERA 11 · 1200M',
    type: 'TIPO: TRIFECTA BOX (COMBINADA)',
    typeRight: '6 COMBOS',
    rows: [
      { name: 'CABALLOS: [1] - [4] - [9]', value: 'PERMUTACIONES: 6' },
      { name: '1-4-9 | 1-9-4 | 4-1-9', value: '4-9-1 | 9-1-4 | 9-4-1' },
    ],
    base: '$ 100.00',
    combos: '6 COMBINACIONES',
    total: '$ 600.00 ARS',
    hash: '7f4c9a890123b0923184ac918347102948201a4e50d68f7129ca99f430294101',
  },
  multirace: {
    track: 'GULFSTREAM PARK (USA)',
    race: 'PICK 4 · (CARRERAS 6 A 9)',
    type: 'TIPO: PICK 4 ACUMULATIVO',
    typeRight: 'POZO ASEGURADO',
    rows: [
      { name: 'LEG 1 (C6):', value: '#2, #5' },
      { name: 'LEG 2 (C7):', value: '#1 ONLY' },
      { name: 'LEG 3 (C8):', value: '#4, #6, #8' },
      { name: 'LEG 4 (C9):', value: '#3, #7' },
    ],
    base: '$ 50.00',
    combos: '12 COMBOS (2x1x3x2)',
    total: '$ 600.00 ARS',
    hash: 'b01984210acbf942817293a9482701e938472910482019481203948102948123',
  },
}

const activeTicket = computed(() => templateData[activeTemplate.value])

function setTemplate(key: string) {
  activeTemplate.value = key
}

function setWidth(width: string) {
  ticketWidth.value = width
}

const activeProfile = ref(0)

function firePrintTest() {
  if (printing.value) return
  printing.value = true
  setTimeout(() => {
    printing.value = false
    printAlert.value = true
    setTimeout(() => { printAlert.value = false }, 3500)
  }, 600)
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
    <!-- S0: Top Telemetry Micro Ticker -->
    <section class="relative w-full bg-surface-container-lowest px-4 sm:px-8 lg:px-12 py-5">
      <div class="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div class="flex items-center gap-3">
          <span class="relative flex h-2.5 w-2.5">
            <span class="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary-container opacity-60" aria-hidden="true"></span>
            <span class="relative inline-flex rounded-full h-2.5 w-2.5 bg-primary-container" aria-hidden="true"></span>
          </span>
          <span class="font-mono text-[11px] font-medium uppercase tracking-[0.15em] text-primary-container">{{ page.telemetry.driver }}</span>
          <span class="text-outline-variant" aria-hidden="true">/</span>
          <span class="font-mono text-[11px] text-on-surface-variant">{{ page.telemetry.spooler }}</span>
        </div>
        <div class="flex flex-wrap items-center gap-x-6 gap-y-2 font-mono text-[11px] text-on-surface-variant">
          <div class="flex items-center gap-1.5">
            <Icon name="lucide:shield-check" :size="16" class="text-tertiary-fixed" aria-hidden="true" />
            <span class="text-on-surface">{{ page.telemetry.sha }}</span>
          </div>
          <div class="hidden sm:flex items-center gap-1.5">
            <Icon name="lucide:gauge" :size="16" class="text-primary-container" aria-hidden="true" />
            <span>{{ page.telemetry.latency }}</span>
          </div>
        </div>
      </div>
    </section>

    <!-- S1: Hero -->
    <section class="w-full bg-surface px-4 lg:px-12 py-16 lg:py-20 relative overflow-hidden hud-grid">
      <!-- Ambient glow behind hero -->
      <div class="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-brand-yellow/10 blur-[130px] rounded-full pointer-events-none z-0" aria-hidden="true"></div>
      <div class="absolute -right-24 top-0 w-96 h-96 bg-gradient-to-br from-primary-container/10 via-primary/5 to-transparent rounded-full blur-3xl pointer-events-none" aria-hidden="true"></div>
      <div class="max-w-7xl mx-auto flex flex-col gap-8 relative z-10">
        <div class="inline-flex items-center gap-2 self-start px-3 py-1.5 bg-surface-container rounded">
          <Icon name="lucide:printer" :size="16" class="text-primary-container" aria-hidden="true" />
          <span class="font-mono text-[11px] text-primary-container uppercase">{{ page.hero.badge }}</span>
        </div>
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
          <div class="lg:col-span-8 flex flex-col gap-2">
            <h1 class="font-display text-4xl md:text-5xl font-black text-on-surface uppercase tracking-tight leading-[1.08]" :style="{ fontFamily: displayFont }">
              {{ page.hero.title }}
            </h1>
            <p class="text-lg text-on-surface-variant max-w-3xl">{{ page.hero.desc }}</p>
          </div>
          <div class="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-2">
            <NuxtLinkLocale
              to="#simulador"
              class="bg-primary-container hover:bg-primary-fixed-dim text-on-primary-container font-bold text-sm uppercase px-6 py-3 tracking-wide transition-all shadow-md flex items-center justify-center gap-2 rounded-lg font-display"
              :style="{ fontFamily: displayFont }"
            >
              <Icon name="lucide:receipt" :size="20" aria-hidden="true" />
              <span>{{ page.hero.ctaDemo }}</span>
            </NuxtLinkLocale>
            <button type="button" class="bg-surface-container hover:bg-surface-container-high text-on-surface text-sm px-6 py-3 uppercase tracking-wide transition-all flex items-center justify-center gap-2 rounded-lg font-bold-md-bold font-display" :style="{ fontFamily: displayFont }">
              <Icon name="lucide:download" :size="18" aria-hidden="true" />
              <span>{{ page.hero.ctaSpec }}</span>
            </button>
          </div>
        </div>
        <!-- Telemetry stats -->
        <div class="grid grid-cols-2 md:grid-cols-4 gap-2 pt-4">
          <div v-for="(stat, i) in page.hero.stats" :key="i" class="bg-surface-container-lowest p-4 flex flex-col justify-between rounded-lg">
            <span class="font-mono text-[10px] text-on-surface-variant uppercase">{{ stat.label }}</span>
            <span class="font-display text-xl font-bold" :style="{ fontFamily: displayFont }" :class="stat.tone === 'primary' ? 'text-primary-container' : 'text-on-surface'">{{ stat.value }}</span>
            <span class="font-mono text-[10px] text-on-surface">{{ stat.sub }}</span>
          </div>
        </div>
      </div>
    </section>

    <!-- S2: Interactive Simulator -->
    <section class="w-full bg-surface-container-lowest px-4 lg:px-12 py-16 lg:py-20" id="simulador">
      <div class="max-w-7xl mx-auto flex flex-col gap-8">
        <div class="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <span class="font-mono text-[10px] text-primary-container uppercase tracking-wider block">{{ page.simulator.kicker }}</span>
            <h2 class="font-display text-3xl md:text-4xl font-black uppercase text-on-surface tracking-tight" :style="{ fontFamily: displayFont }">{{ page.simulator.title }}</h2>
          </div>
          <div class="flex items-center gap-2 bg-surface-container p-1 rounded-lg">
            <span class="font-mono text-[10px] text-on-surface-variant uppercase px-1">{{ page.simulator.widthLabel }}</span>
            <button
              type="button"
              class="px-2.5 py-1 font-mono text-xs uppercase transition-colors rounded"
              :class="ticketWidth === '58' ? 'bg-primary-container text-on-primary-container font-bold' : 'text-on-surface-variant hover:text-on-surface'"
              @click="setWidth('58')"
            >{{ page.simulator.width58 }}</button>
            <button
              type="button"
              class="px-2.5 py-1 font-mono text-xs uppercase transition-colors rounded"
              :class="ticketWidth === '80' ? 'bg-primary-container text-on-primary-container font-bold' : 'text-on-surface-variant hover:text-on-surface'"
              @click="setWidth('80')"
            >{{ page.simulator.width80 }}</button>
          </div>
        </div>

        <!-- Template tabs -->
        <div class="grid grid-cols-2 lg:grid-cols-4 gap-1 bg-surface-container-low p-1 rounded-lg">
          <button
            v-for="tpl in page.simulator.templates"
            :key="tpl.key"
            type="button"
            class="flex items-center justify-between p-2 rounded-lg transition-colors"
            :class="activeTemplate === tpl.key ? 'bg-surface-container-high text-on-surface' : 'bg-surface-container hover:bg-surface-container-high text-on-surface-variant'"
            @click="setTemplate(tpl.key)"
          >
            <div class="flex flex-col text-left">
              <span class="font-display text-sm uppercase font-bold" :style="{ fontFamily: displayFont }">{{ tpl.label }}</span>
              <span class="font-mono text-[10px] uppercase" :class="activeTemplate === tpl.key ? 'text-primary-container' : ''">{{ tpl.sub }}</span>
            </div>
            <Icon :name="activeTemplate === tpl.key ? 'lucide:radio' : 'lucide:circle'" :size="18" class="text-primary-container" aria-hidden="true" />
          </button>
        </div>

        <!-- Stage: ticket vs telemetry -->
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <!-- Ticket render (left) -->
          <div class="lg:col-span-6 flex flex-col items-center justify-center p-6 bg-surface-container-low min-h-[640px] relative overflow-hidden rounded-xl">
            <div class="absolute top-4 left-4 font-mono text-[10px] text-on-surface-variant uppercase tracking-widest flex items-center gap-2">
              <span class="w-1.5 h-1.5 rounded-full bg-primary-container" aria-hidden="true"></span>
              <span>{{ page.simulator.printerLabel }}</span>
            </div>
            <!-- Physical paper -->
            <div
              class="transition-all duration-300 w-full bg-[#f8f7f2] text-[#121212] font-mono text-[11px] p-6 shadow-xl relative mt-4 select-none rounded-sm"
              :class="ticketWidth === '58' ? 'max-w-[280px]' : 'max-w-[390px]'"
              :style="{ opacity: printing ? 0.5 : 1 }"
            >
              <!-- Header -->
              <div class="flex flex-col items-center text-center pb-2">
                <span class="font-display text-sm tracking-tighter uppercase text-[#000000] font-bold" :style="{ fontFamily: displayFont }">{{ page.simulator.ticket.brand }}</span>
                <span class="font-mono text-[10px] uppercase font-bold tracking-widest">{{ page.simulator.ticket.agency }}</span>
                <span class="text-[10px] uppercase text-[#333333]">{{ page.simulator.ticket.cuit }}</span>
                <div class="w-full my-1 border-b border-dashed border-[#888888]" aria-hidden="true"></div>
                <div class="w-full flex justify-between text-[11px] font-bold">
                  <span>{{ page.simulator.ticket.terminal }}</span>
                  <span>{{ page.simulator.ticket.cashier }}</span>
                </div>
                <div class="w-full flex justify-between text-[11px]">
                  <span>{{ page.simulator.ticket.ticketNo }}</span>
                  <span>19/10/2024 16:42:19</span>
                </div>
              </div>
              <div class="w-full my-1 border-b border-dashed border-[#888888]" aria-hidden="true"></div>
              <!-- Track & race -->
              <div class="bg-[#121212] text-[#f8f7f2] p-1.5 flex justify-between items-center uppercase font-bold text-[12px] rounded-sm">
                <span>{{ activeTicket.track }}</span>
                <span>{{ activeTicket.race }}</span>
              </div>
              <!-- Bet body -->
              <div class="py-1 flex flex-col gap-1">
                <div class="flex justify-between font-bold text-[12px]">
                  <span>{{ activeTicket.type }}</span>
                  <span>{{ activeTicket.typeRight }}</span>
                </div>
                <template v-for="(row, i) in activeTicket.rows" :key="i">
                  <div v-if="activeTicket.rows.length === 1" class="bg-[#e4e2d8] p-1 text-[11px] rounded-sm">
                    <div class="flex justify-between font-bold">
                      <span>{{ row.name }}</span>
                      <span>{{ row.value }}</span>
                    </div>
                    <div class="flex justify-between text-[10px] text-[#444444]">
                      <span>{{ row.sub }}</span>
                      <span>{{ row.subRight }}</span>
                    </div>
                  </div>
                  <div v-else-if="activeTemplate === 'multi'" class="flex justify-between text-[11px] bg-[#e4e2d8] p-0.5 px-1 rounded-sm">
                    <span>{{ row.name }}</span>
                    <span>{{ row.value }}</span>
                  </div>
                  <div v-else-if="activeTemplate === 'combo'" class="flex justify-between text-[10px] font-mono">
                    <span>{{ row.name }}</span>
                    <span>{{ row.value }}</span>
                  </div>
                  <div v-else class="flex justify-between text-[10px] font-mono">
                    <span>{{ row.name }}</span>
                    <span class="font-bold">{{ row.value }}</span>
                  </div>
                </template>
              </div>
              <div class="w-full my-1 border-b border-dashed border-[#888888]" aria-hidden="true"></div>
              <!-- Financial -->
              <div class="flex flex-col gap-0.5 text-[11px]">
                <div class="flex justify-between font-bold">
                  <span>{{ page.simulator.ticket.baseLabel }}</span>
                  <span>{{ activeTicket.base }}</span>
                </div>
                <div class="flex justify-between">
                  <span>{{ page.simulator.ticket.combosLabel }}</span>
                  <span>{{ activeTicket.combos }}</span>
                </div>
                <div class="flex justify-between text-[13px] font-bold py-1 bg-[#eae8de] px-1 rounded-sm">
                  <span>{{ page.simulator.ticket.totalLabel }}</span>
                  <span>{{ activeTicket.total }}</span>
                </div>
              </div>
              <!-- QR + hash -->
              <div class="mt-2 flex flex-col items-center gap-2 text-center">
                <div class="flex flex-col items-center w-full">
                  <svg class="w-28 h-28 bg-white p-1" fill="currentColor" viewBox="0 0 100 100" role="img" aria-label="QR">
                    <path d="M0,0 h30 v30 h-30 z M6,6 h18 v18 h-18 z M10,10 h10 v10 h-10 z"></path>
                    <path d="M70,0 h30 v30 h-30 z M76,6 h18 v18 h-18 z M80,10 h10 v10 h-10 z"></path>
                    <path d="M0,70 h30 v30 h-30 z M6,76 h18 v18 h-18 z M10,80 h10 v10 h-10 z"></path>
                    <rect height="18" width="6" x="36" y="6"></rect>
                    <rect height="6" width="12" x="48" y="10"></rect>
                    <rect height="6" width="18" x="42" y="22"></rect>
                    <rect height="12" width="6" x="6" y="36"></rect>
                    <rect height="6" width="18" x="18" y="42"></rect>
                    <rect height="6" width="28" x="36" y="36"></rect>
                    <rect height="14" width="8" x="48" y="48"></rect>
                    <rect height="6" width="14" x="62" y="42"></rect>
                    <rect height="8" width="14" x="80" y="36"></rect>
                    <rect height="14" width="6" x="88" y="48"></rect>
                    <rect height="24" width="8" x="36" y="70"></rect>
                    <rect height="6" width="18" x="48" y="76"></rect>
                    <rect height="10" width="10" x="70" y="70"></rect>
                    <rect height="18" width="8" x="86" y="70"></rect>
                    <rect height="6" width="24" x="52" y="88"></rect>
                    <rect height="4" width="12" x="82" y="92"></rect>
                  </svg>
                  <span class="text-[9px] uppercase text-[#444444] mt-1">{{ page.simulator.ticket.qrHint }}</span>
                </div>
                <div class="w-full flex flex-col gap-0.5">
                  <span class="text-[9px] font-bold tracking-tight text-[#000000]">{{ page.simulator.ticket.hashLabel }}</span>
                  <span class="text-[8px] break-all text-[#333333] font-mono leading-none">{{ activeTicket.hash }}</span>
                </div>
                <span class="text-[8px] uppercase text-[#666666] leading-tight">{{ page.simulator.ticket.legal }}</span>
              </div>
            </div>
          </div>

          <!-- Hardware control panel (right) -->
          <div class="lg:col-span-6 flex flex-col gap-4">
            <div class="bg-surface-container p-4 flex flex-col gap-2 rounded-xl">
              <div class="flex items-center justify-between">
                <span class="font-display text-base uppercase text-on-surface font-bold" :style="{ fontFamily: displayFont }">{{ page.simulator.hardware.title }}</span>
                <span class="px-1.5 py-0.5 bg-primary-container text-on-primary-container font-mono text-[10px] uppercase font-bold rounded">{{ page.simulator.hardware.status }}</span>
              </div>
              <div class="grid grid-cols-2 gap-1 text-on-surface-variant">
                <div v-for="(spec, i) in page.simulator.hardware.specs" :key="i" class="bg-surface-container-high p-2 flex flex-col rounded-lg">
                  <span class="font-mono text-[10px] text-outline">{{ spec.label }}</span>
                  <span class="text-sm font-bold" :class="spec.tone === 'primary' ? 'text-primary-container' : 'text-on-surface'">{{ spec.value }}</span>
                </div>
              </div>
              <div class="flex flex-col gap-1 pt-1">
                <span class="font-mono text-[10px] text-on-surface-variant uppercase">{{ page.simulator.hardware.profileLabel }}</span>
                <div class="grid grid-cols-2 sm:grid-cols-4 gap-1">
                  <button
                    v-for="(profile, i) in page.simulator.hardware.profiles"
                    :key="profile"
                    type="button"
                    class="p-1 text-center font-mono text-[10px] rounded transition-colors"
                    :class="activeProfile === i ? 'bg-surface-bright text-on-surface' : 'bg-surface-container-high text-on-surface-variant hover:text-on-surface'"
                    @click="activeProfile = i"
                  >{{ profile }}</button>
                </div>
              </div>
            </div>
            <!-- Print test -->
            <div class="bg-surface-container p-4 flex flex-col gap-2 rounded-xl">
              <div class="flex items-center justify-between">
                <span class="font-display text-base uppercase text-on-surface font-bold" :style="{ fontFamily: displayFont }">{{ page.simulator.hardware.testTitle }}</span>
                <span class="font-mono text-[10px] text-on-surface-variant">{{ page.simulator.hardware.testPort }}</span>
              </div>
              <p class="text-sm text-on-surface-variant">{{ page.simulator.hardware.testDesc }}</p>
              <div class="flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  class="bg-primary-container hover:bg-primary-fixed-dim text-on-primary-container font-bold text-sm uppercase px-4 py-2 tracking-wide transition-all flex items-center gap-2 rounded-lg font-display"
                  :style="{ fontFamily: displayFont }"
                  :disabled="printing"
                  @click="firePrintTest"
                >
                  <Icon name="lucide:printer" :size="18" aria-hidden="true" />
                  <span>{{ page.simulator.hardware.testBtn }}</span>
                </button>
                <span v-if="printAlert" class="font-mono text-xs text-primary-container">{{ page.simulator.hardware.testAlert }}</span>
              </div>
            </div>
            <!-- Callout -->
            <div class="bg-surface-container-low p-4 flex flex-col gap-1 rounded-xl">
              <div class="flex items-center gap-1 text-primary-container">
                <Icon name="lucide:badge-check" :size="18" aria-hidden="true" />
                <span class="font-mono text-[11px] uppercase font-bold">{{ page.simulator.hardware.calloutTitle }}</span>
              </div>
              <p class="text-sm text-on-surface-variant">{{ page.simulator.hardware.calloutDesc }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- S3: 5 Core Capabilities -->
    <section class="w-full bg-surface px-4 lg:px-12 py-16 lg:py-20">
      <div class="max-w-7xl mx-auto flex flex-col gap-8">
        <div class="flex flex-col gap-1 max-w-3xl">
          <span class="font-mono text-[11px] text-primary-container uppercase tracking-widest">{{ page.features.kicker }}</span>
          <h2 class="font-display text-3xl md:text-4xl font-black uppercase text-on-surface tracking-tight" :style="{ fontFamily: displayFont }">{{ page.features.title }}</h2>
          <p class="text-lg text-on-surface-variant">{{ page.features.desc }}</p>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div v-for="card in page.features.cards" :key="card.code" class="bg-surface-container p-6 flex flex-col justify-between gap-4 rounded-xl">
            <div class="flex flex-col gap-2">
              <div class="flex items-center justify-between">
                <span class="font-mono text-[11px] text-primary-container uppercase font-bold">{{ card.code }}</span>
                <Icon :name="card.icon" :size="24" class="text-outline-variant" aria-hidden="true" />
              </div>
              <h3 class="font-display text-base text-on-surface uppercase font-bold" :style="{ fontFamily: displayFont }">{{ card.title }}</h3>
              <p class="text-sm text-on-surface-variant">{{ card.desc }}</p>
            </div>
            <span class="font-mono text-[10px] text-outline uppercase tracking-wider">{{ card.footer }}</span>
          </div>
          <!-- Wide MOD_05 -->
          <div class="bg-surface-container p-6 flex flex-col justify-between gap-4 rounded-xl md:col-span-2 lg:col-span-2">
            <div class="flex flex-col gap-2">
              <div class="flex items-center justify-between">
                <span class="font-mono text-[11px] text-primary-container uppercase font-bold">{{ page.features.wide.code }}</span>
                <Icon :name="page.features.wide.icon" :size="24" class="text-outline-variant" aria-hidden="true" />
              </div>
              <h3 class="font-display text-base text-on-surface uppercase font-bold" :style="{ fontFamily: displayFont }">{{ page.features.wide.title }}</h3>
              <p class="text-sm text-on-surface-variant">{{ page.features.wide.desc }}</p>
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                <div v-for="(level, i) in page.features.wide.levels" :key="i" class="bg-surface-container-high p-2 flex flex-col gap-1 rounded-lg">
                  <span class="font-mono text-[10px] font-bold" :class="i === 0 ? 'text-primary-container' : 'text-on-surface'">{{ level.title }}</span>
                  <p class="text-sm text-on-surface">{{ level.desc }}</p>
                </div>
              </div>
            </div>
            <span class="font-mono text-[10px] text-outline uppercase tracking-wider">{{ page.features.wide.footer }}</span>
          </div>
        </div>
      </div>
    </section>

    <!-- S4: Flow Experience -->
    <section class="w-full bg-surface-container-lowest px-4 lg:px-12 py-16 lg:py-20">
      <div class="max-w-7xl mx-auto flex flex-col gap-8">
        <div class="flex flex-col gap-1">
          <span class="font-mono text-[11px] text-primary-container uppercase tracking-widest">{{ page.flow.kicker }}</span>
          <h2 class="font-display text-3xl md:text-4xl font-black uppercase text-on-surface tracking-tight" :style="{ fontFamily: displayFont }">{{ page.flow.title }}</h2>
          <p class="text-lg text-on-surface-variant max-w-2xl">{{ page.flow.desc }}</p>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2 relative">
          <div v-for="step in page.flow.steps" :key="step.num" class="bg-surface-container p-4 flex flex-col justify-between relative overflow-hidden rounded-xl">
            <div class="flex flex-col gap-2">
              <div class="flex items-center justify-between">
                <span class="w-8 h-8 flex items-center justify-center text-sm font-bold font-display" :class="step.tone === 'primary' ? 'bg-primary-container text-on-primary-container' : 'bg-surface-container-high text-on-surface'" :style="{ fontFamily: displayFont }">{{ step.num }}</span>
                <span class="font-mono text-[10px] text-on-surface-variant">{{ step.badge }}</span>
              </div>
              <h3 class="font-display text-base text-on-surface uppercase font-bold" :style="{ fontFamily: displayFont }">{{ step.title }}</h3>
              <p class="text-sm text-on-surface-variant">{{ step.desc }}</p>
            </div>
            <div class="pt-4 flex items-center gap-1 font-mono text-[10px] uppercase" :class="step.tone === 'primary' ? 'text-primary-container' : 'text-on-surface-variant'">
              <Icon :name="step.icon" :size="16" aria-hidden="true" />
              <span>{{ step.footer }}</span>
            </div>
          </div>
        </div>
        <!-- Hardware diagram -->
        <div class="w-full bg-surface-container p-6 flex flex-col gap-4 rounded-xl">
          <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <span class="font-mono text-[10px] text-primary-container uppercase">{{ page.flow.diagram.label }}</span>
              <h4 class="font-display text-base text-on-surface uppercase font-bold" :style="{ fontFamily: displayFont }">{{ page.flow.diagram.title }}</h4>
            </div>
            <span class="font-mono text-xs text-on-surface-variant">{{ page.flow.diagram.endpoint }}</span>
          </div>
          <div class="w-full overflow-x-auto py-2">
            <svg class="w-full min-w-[700px] h-36" fill="none" viewBox="0 0 800 120" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <rect fill="#1c1b1b" height="80" stroke="#353534" stroke-width="2" width="180" x="10" y="20"></rect>
              <text fill="#ffe9ba" font-family="JetBrains Mono" font-size="11" font-weight="bold" x="25" y="45">TERMINAL POS AGENCIA</text>
              <text fill="#e5e2e1" font-family="Source Sans 3" font-size="12" x="25" y="65">Teclado Vende-Paga</text>
              <text fill="#ffc71a" font-family="JetBrains Mono" font-size="10" x="25" y="85">Spooler Local Activo</text>
              <line stroke="#ffc71a" stroke-dasharray="4 4" stroke-width="2" x1="190" x2="300" y1="60" y2="60"></line>
              <circle cx="245" cy="60" fill="#ffc71a" r="4"></circle>
              <text fill="#d2c5ac" font-family="JetBrains Mono" font-size="9" x="210" y="52">ESC/POS 0.8s</text>
              <rect fill="#1c1b1b" height="80" stroke="#353534" stroke-width="2" width="190" x="300" y="20"></rect>
              <text fill="#ffe9ba" font-family="JetBrains Mono" font-size="11" font-weight="bold" x="315" y="45">IMPRESORA TERMICA</text>
              <text fill="#e5e2e1" font-family="Source Sans 3" font-size="12" x="315" y="65">Epson / Star 58-80mm</text>
              <text fill="#c0f4ff" font-family="JetBrains Mono" font-size="10" x="315" y="85">Auto-Cutter + QR Stamp</text>
              <line stroke="#ffc71a" stroke-width="2" x1="490" x2="600" y1="60" y2="60"></line>
              <circle cx="545" cy="60" fill="#ffc71a" r="4"></circle>
              <text fill="#d2c5ac" font-family="JetBrains Mono" font-size="9" x="515" y="52">QR Scanner</text>
              <rect fill="#1c1b1b" height="80" stroke="#353534" stroke-width="2" width="190" x="600" y="20"></rect>
              <text fill="#ffe9ba" font-family="JetBrains Mono" font-size="11" font-weight="bold" x="615" y="45">BETKIT CLOUD LEDGER</text>
              <text fill="#e5e2e1" font-family="Source Sans 3" font-size="12" x="615" y="65">Validación SHA-256</text>
              <text fill="#01e3ff" font-family="JetBrains Mono" font-size="10" x="615" y="85">Doble Nivel de Acceso</text>
            </svg>
          </div>
        </div>
      </div>
    </section>

    <!-- S5: Hardware Guarantee & CTA -->
    <section class="w-full bg-surface-container-high px-4 lg:px-12 py-16 lg:py-20">
      <div class="max-w-7xl mx-auto flex flex-col lg:flex-row lg:items-center justify-between gap-8">
        <div class="flex flex-col gap-1 max-w-2xl">
          <div class="inline-flex items-center gap-1 text-primary-container">
            <Icon name="lucide:badge-check" :size="20" aria-hidden="true" />
            <span class="font-mono text-[11px] uppercase font-bold">{{ page.guarantee.kicker }}</span>
          </div>
          <h2 class="font-display text-2xl md:text-3xl font-black uppercase text-on-surface tracking-tight" :style="{ fontFamily: displayFont }">{{ page.guarantee.title }}</h2>
          <p class="text-lg text-on-surface-variant">{{ page.guarantee.desc }}</p>
        </div>
        <div class="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 shrink-0">
          <NuxtLinkLocale
            to="/demo"
            class="bg-primary-container hover:bg-primary-fixed-dim text-on-primary-container font-bold text-sm uppercase px-6 py-3.5 tracking-wide transition-all shadow-xl flex items-center justify-center gap-2 rounded-lg font-display"
            :style="{ fontFamily: displayFont }"
          >
            <Icon name="lucide:handshake" :size="20" aria-hidden="true" />
            <span>{{ page.guarantee.ctaDemo }}</span>
          </NuxtLinkLocale>
          <a
            href="https://wa.me/5491140928873"
            target="_blank"
            rel="noopener noreferrer"
            class="bg-surface-container hover:bg-surface-bright text-on-surface text-sm px-6 py-3.5 uppercase tracking-wide transition-all flex items-center justify-center gap-2 rounded-lg font-bold font-display"
            :style="{ fontFamily: displayFont }"
          >
            <Icon name="lucide:message-circle" :size="18" aria-hidden="true" />
            <span>{{ page.guarantee.ctaWhatsapp }}</span>
          </a>
        </div>
      </div>
    </section>
  </div>
</template>
