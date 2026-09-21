<script setup lang="ts">
const displayFont = "'Archivo Narrow', 'Archivo', sans-serif"
const page = usePageMessages<{
  telemetry: { label: string, regions: string, item1: string, item2: string }
  badge: string
  title: string
  subtitle: string
  ctaPrimary: string
  ctaSecondary: string
  microbadge: string
  hardware: { kicker: string, title: string, latency: string, overlayTitle: string, overlaySub: string, chips: string[] }
  statsLabel: string
  statsKicker: string
  statsUptime: string
  stats: Array<{ number: string, label: string, desc: string, icon: string, tone: string, kicker: string }>
  countries: {
    kicker: string
    title: string
    badge: string
    items: Array<{ flag: string, name: string, code: string, badge: string, tone: string }>
  }
  dual: {
    kicker: string
    title: string
    desc: string
    banker: {
      label: string
      title: string
      desc: string
      bullets: string[]
      console: {
        label: string
        currencyLabel: string
        currencies: string[]
        kpiLabel: string
        kpiValue: string
        kpiUnit: string
        marginLabel: string
        marginValue: string
        marginUnit: string
        auditLabel: string
        agencies: Array<{ name: string, currency: string, value: string }>
        syncLabel: string
        closeBtn: string
      }
    }
    cashier: {
      label: string
      title: string
      desc: string
      bullets: string[]
      terminal: {
        label: string
        currency: string
        status: string
        race: string
        track: string
        bet: string
        picks: string[]
        combosLabel: string
        totalLabel: string
        payBtn: string
        cancelBtn: string
        ws: string
        hash: string
      }
    }
  }
  matrix: {
    kicker: string
    title: string
    desc: string
    headers: string[]
    rows: Array<{ dim: string, banker: string, cashier: string }>
  }
  closing: {
    pill: string
    title: string
    desc: string
    ctaPrimary: string
    ctaSecondary: string
    seeLabel: string
    links: Array<{ to: string, label: string }>
  }
}>('banquerosPage')

definePageMeta({ layout: 'default' })

// === Multi-currency selector (banker console mockup) ===
const activeCurrency = ref(0)

// Icons for the cashier feature bullets (order matches page.dual.cashier.bullets)
const bulletIcons = [
  'lucide:zap',
  'lucide:repeat',
  'lucide:refresh-cw',
  'lucide:printer',
  'lucide:wifi-off',
  'lucide:clipboard-check',
]

useHead({
  title: page.title,
  meta: [
    { name: 'description', content: page.subtitle },
    { name: 'robots', content: 'index, follow' },
  ],
})
</script>

<template>
  <div class="min-h-screen bg-surface text-on-surface font-body">
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
            <Icon name="lucide:clipboard-check" :size="16" class="text-tertiary-fixed" aria-hidden="true" />
            <span class="text-on-surface">{{ page.telemetry.item1 }}</span>
          </div>
          <div class="hidden sm:flex items-center gap-1.5">
            <Icon name="lucide:wifi-off" :size="16" class="text-primary-container" aria-hidden="true" />
            <span>{{ page.telemetry.item2 }}</span>
          </div>
        </div>
      </div>
    </section>

    <!-- S0: Hero -->
    <section class="relative w-full overflow-hidden hud-grid">
      <!-- Ambient glow behind hero -->
      <div class="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-brand-yellow/10 blur-[130px] rounded-full pointer-events-none z-0" aria-hidden="true"></div>
      <div class="relative z-10 w-full px-4 lg:px-12 py-16 lg:py-24 max-w-7xl mx-auto flex flex-col items-start gap-6">
        <div class="inline-flex items-center gap-2 px-4 py-1 bg-surface-container border border-outline-variant/40 shadow-sm rounded">
          <span class="w-2 h-2 rounded-full bg-primary-container animate-pulse" aria-hidden="true"></span>
          <span class="font-mono text-[11px] uppercase text-primary-container tracking-widest font-semibold">{{ page.badge }}</span>
        </div>
        <div class="flex flex-col gap-2 max-w-4xl">
          <h1 class="font-display text-4xl md:text-5xl font-black text-on-surface tracking-tight uppercase leading-[1.08]" :style="{ fontFamily: displayFont }">{{ page.title }}</h1>
          <p class="text-lg text-on-surface-variant max-w-3xl font-light leading-relaxed">{{ page.subtitle }}</p>
        </div>
        <div class="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto pt-1">
          <NuxtLinkLocale
            to="/demo"
            class="inline-flex items-center justify-center gap-2 bg-primary-container hover:bg-primary-fixed-dim text-on-primary-container font-bold text-sm uppercase px-6 py-3 transition-all tracking-wide shadow-[0_2px_14px_rgba(255,199,26,0.25)] hover:shadow-[0_4px_20px_rgba(255,199,26,0.35)] rounded-lg font-display"
            :style="{ fontFamily: displayFont }"
          >
            <span>{{ page.ctaPrimary }}</span>
            <Icon name="lucide:arrow-right" :size="20" aria-hidden="true" />
          </NuxtLinkLocale>
          <NuxtLinkLocale
            to="/contacto"
            class="inline-flex items-center justify-center gap-2 bg-surface-container-high hover:bg-surface-variant border border-outline-variant/40 text-on-surface font-bold text-sm uppercase px-6 py-3 transition-colors tracking-wide rounded-lg font-display"
            :style="{ fontFamily: displayFont }"
          >
            <Icon name="lucide:play-circle" :size="20" aria-hidden="true" />
            <span>{{ page.ctaSecondary }}</span>
          </NuxtLinkLocale>
        </div>
        <div class="flex items-center gap-2 pt-1">
          <Icon name="lucide:badge-check" :size="18" class="text-primary-container" aria-hidden="true" />
          <span class="font-mono text-[10px] text-secondary tracking-wide uppercase">{{ page.microbadge }}</span>
        </div>
      </div>
    </section>

    <!-- S1: Hardware & Terminals -->
    <section class="w-full bg-surface-container-lowest py-16 lg:py-20">
      <div class="w-full px-4 lg:px-12 max-w-7xl mx-auto flex flex-col gap-6">
        <div class="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <span class="font-mono text-[11px] text-primary-container uppercase tracking-widest">{{ page.hardware.kicker }}</span>
            <h2 class="font-display text-3xl md:text-4xl font-black uppercase text-on-surface mt-1" :style="{ fontFamily: displayFont }">{{ page.hardware.title }}</h2>
          </div>
          <span class="font-mono text-[11px] text-primary-container uppercase bg-surface-container px-4 py-1 border border-outline-variant/30 rounded">{{ page.hardware.latency }}</span>
        </div>
        <div class="w-full h-80 sm:h-96 md:h-[420px] flex flex-col justify-end p-6 relative overflow-hidden border border-outline-variant/30 shadow-2xl rounded-xl bg-surface-container-lowest">
          <img
            src="/imges/banqueros/Infraestructura.jpg"
            alt="Terminal POS BetKit en una agencia hípica con impresora térmica"
            class="absolute inset-0 w-full h-full object-cover"
            loading="lazy"
          >
          <div class="absolute inset-0 bg-gradient-to-t from-surface-container-lowest via-surface-container-lowest/70 to-transparent" aria-hidden="true"></div>
          <div class="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div class="flex flex-col">
              <span class="font-mono text-[11px] text-primary-container uppercase font-bold">{{ page.hardware.overlayTitle }}</span>
              <p class="font-display text-lg uppercase text-on-surface font-bold" :style="{ fontFamily: displayFont }">{{ page.hardware.overlaySub }}</p>
            </div>
            <div class="flex items-center gap-2">
              <span v-for="chip in page.hardware.chips" :key="chip" class="px-3 py-1 bg-surface-container-lowest/90 border border-outline-variant/30 text-primary-container font-mono text-[11px] uppercase font-semibold rounded">{{ chip }}</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- S2: Metrics -->
<section class="w-full bg-surface py-16 lg:py-20">
   <div class="w-full px-4 lg:px-12 max-w-7xl mx-auto flex flex-col gap-6">
    <div class="flex flex-col md:flex-row md:items-end justify-between gap-2">
     <div>
      <span class="font-mono text-[11px] text-primary-container uppercase tracking-widest">{{ page.statsKicker }}</span>
            <h2 class="font-display text-3xl md:text-4xl font-black uppercase text-on-surface mt-1" :style="{ fontFamily: displayFont }">{{ page.statsLabel }}</h2>
          </div>
          <p class="font-mono text-[11px] text-on-surface-variant uppercase">{{ page.statsUptime }}</p>
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div
            v-for="(stat, i) in page.stats"
            :key="i"
            class="bg-surface-container p-6 flex flex-col justify-between h-56 border border-outline-variant/20 hover:border-primary-container/60 hover:bg-surface-container-high transition-all rounded-xl"
          >
            <div class="flex items-center justify-between">
              <span class="font-mono text-[10px] text-on-surface-variant uppercase tracking-widest">{{ stat.kicker }}</span>
              <Icon :name="stat.icon" :size="20" :class="stat.tone === 'primary' ? 'text-primary-container' : stat.tone === 'tertiary' ? 'text-tertiary-container' : 'text-primary-container'" aria-hidden="true" />
            </div>
            <div>
              <div class="font-display text-4xl font-black tracking-tighter" :class="stat.tone === 'primary' ? 'text-primary-container' : stat.tone === 'tertiary' ? 'text-tertiary-container' : 'text-primary-container'" :style="{ fontFamily: displayFont }">{{ stat.number }}</div>
              <div class="font-display text-sm uppercase text-on-surface mt-1 font-bold" :style="{ fontFamily: displayFont }">{{ stat.label }}</div>
              <p class="text-sm text-on-surface-variant mt-1 leading-snug">{{ stat.desc }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- S3: Countries -->
<section class="w-full bg-surface-container-lowest py-16 lg:py-20">
   <div class="w-full px-4 lg:px-12 max-w-7xl mx-auto flex flex-col gap-6">
    <div class="flex flex-col md:flex-row md:items-end justify-between gap-2">
     <div>
      <span class="font-mono text-[11px] text-primary-container uppercase tracking-widest">{{ page.countries.kicker }}</span>
            <h2 class="font-display text-3xl md:text-4xl font-black uppercase text-on-surface mt-1" :style="{ fontFamily: displayFont }">{{ page.countries.title }}</h2>
          </div>
          <span class="font-mono text-[11px] text-secondary uppercase bg-surface-container px-4 py-1 border border-outline-variant/30 rounded">{{ page.countries.badge }}</span>
        </div>
        <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-9 gap-2">
          <div v-for="c in page.countries.items" :key="c.code" class="bg-surface-container hover:bg-surface-container-high border border-outline-variant/30 p-4 flex flex-col items-center text-center gap-1 transition-all rounded-lg">
            <span class="text-3xl py-1" aria-hidden="true">{{ c.flag }}</span>
            <span class="font-display text-sm uppercase text-on-surface font-bold" :style="{ fontFamily: displayFont }">{{ c.name }}</span>
            <span class="font-mono text-[10px] text-primary-container">{{ c.code }}</span>
            <span
              class="mt-2 text-[9px] font-mono uppercase tracking-wider bg-surface-container-lowest px-1.5 py-0.5 border rounded"
              :class="c.tone === 'tertiary' ? 'text-tertiary-container border-tertiary-container/30' : c.tone === 'secondary' ? 'text-secondary border-outline-variant/40' : 'text-primary-container border-primary-container/30'"
            >{{ c.badge }}</span>
          </div>
        </div>
      </div>
    </section>

    <!-- S4: Dual Banquero vs Cajero -->
    <section class="w-full bg-surface-container-low py-16 lg:py-20">
      <div class="w-full px-4 lg:px-12 max-w-7xl mx-auto flex flex-col gap-8">
        <div class="flex flex-col gap-1 text-center max-w-2xl mx-auto">
          <span class="font-mono text-[11px] text-primary-container uppercase tracking-widest">{{ page.dual.kicker }}</span>
          <h2 class="font-display text-3xl md:text-4xl font-black uppercase text-on-surface" :style="{ fontFamily: displayFont }">{{ page.dual.title }}</h2>
          <p class="text-on-surface-variant">{{ page.dual.desc }}</p>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
          <!-- Banker panel -->
          <div class="bg-surface-container-lowest p-6 flex flex-col gap-4 shadow-xl border border-outline-variant/30 rounded-xl">
            <div class="flex flex-col gap-1">
              <div class="inline-flex items-center gap-2">
                <span class="w-2 h-2 bg-primary-container inline-block" aria-hidden="true"></span>
                <span class="font-mono text-[11px] text-primary-container uppercase font-semibold">{{ page.dual.banker.label }}</span>
              </div>
              <h3 class="font-display text-xl text-on-surface uppercase font-bold" :style="{ fontFamily: displayFont }">{{ page.dual.banker.title }}</h3>
              <p class="text-sm text-on-surface-variant leading-relaxed">{{ page.dual.banker.desc }}</p>
            </div>
            <ul class="flex flex-col gap-2 pt-1">
              <li v-for="(bullet, i) in page.dual.banker.bullets" :key="i" class="flex items-start gap-2">
                <Icon name="lucide:check-square" :size="20" class="text-primary-container shrink-0 mt-0.5" aria-hidden="true" />
                <span class="text-sm text-on-surface">{{ bullet }}</span>
              </li>
            </ul>
            <!-- Console mockup -->
            <div class="bg-surface-container p-4 mt-2 flex flex-col gap-4 border border-outline-variant/30 rounded-lg">
              <div class="flex items-center justify-between pb-1 border-b border-surface-container-high/60">
                <div class="flex items-center gap-2">
                  <Icon name="lucide:shield" :size="18" class="text-primary-container" aria-hidden="true" />
                  <span class="font-mono text-[11px] text-on-surface uppercase">{{ page.dual.banker.console.label }}</span>
                </div>
                <div class="flex items-center gap-1 bg-surface-container-lowest p-0.5 border border-outline-variant/30 rounded">
                  <button
                    v-for="(cur, i) in page.dual.banker.console.currencies"
                    :key="cur"
                    type="button"
                    class="font-mono text-[10px] px-2 py-0.5 transition-colors rounded"
                    :class="activeCurrency === i ? 'bg-primary-container text-on-primary-container font-bold' : 'text-on-surface-variant hover:text-on-surface'"
                    @click="activeCurrency = i"
                  >{{ cur }}</button>
                </div>
              </div>
              <div class="bg-surface-container-lowest p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border border-outline-variant/20 rounded-lg">
                <div>
                  <span class="font-mono text-[10px] text-on-surface-variant uppercase">{{ page.dual.banker.console.kpiLabel }}</span>
                  <div class="font-display text-2xl text-primary-container tracking-tight font-bold" :style="{ fontFamily: displayFont }">{{ page.dual.banker.console.kpiValue }} <span class="text-sm text-on-surface-variant">{{ page.dual.banker.console.kpiUnit }}</span></div>
                </div>
                <div class="sm:text-right">
                  <span class="font-mono text-[10px] text-on-surface-variant uppercase">{{ page.dual.banker.console.marginLabel }}</span>
                  <div class="font-display text-lg text-tertiary font-bold" :style="{ fontFamily: displayFont }">{{ page.dual.banker.console.marginValue }} <span class="font-mono text-[10px] text-tertiary">{{ page.dual.banker.console.marginUnit }}</span></div>
                </div>
              </div>
              <div class="flex flex-col gap-1">
                <span class="font-mono text-[10px] text-on-surface-variant uppercase">{{ page.dual.banker.console.auditLabel }}</span>
                <div v-for="(agency, i) in page.dual.banker.console.agencies" :key="i" class="flex items-center justify-between bg-surface-container-low px-3 py-1.5 border border-outline-variant/20 rounded">
                  <div class="flex items-center gap-2">
                    <span class="w-1.5 h-1.5 rounded-full bg-primary-container" aria-hidden="true"></span>
                    <span class="text-xs font-bold text-on-surface uppercase">{{ agency.name }}</span>
                    <span class="font-mono text-[10px] text-tertiary-container bg-surface-container px-1 rounded">{{ agency.currency }}</span>
                  </div>
                  <span class="font-mono text-xs text-on-surface">{{ agency.value }}</span>
                </div>
              </div>
              <div class="flex items-center justify-between pt-1">
                <span class="font-mono text-[10px] text-on-surface-variant">{{ page.dual.banker.console.syncLabel }}</span>
                <button type="button" class="inline-flex items-center gap-2 bg-surface-bright hover:bg-surface-variant text-on-surface font-mono text-[11px] uppercase px-3 py-1.5 transition-colors border border-outline-variant/30 rounded-lg">
                  <Icon name="lucide:download" :size="16" aria-hidden="true" />
                  <span>{{ page.dual.banker.console.closeBtn }}</span>
                </button>
              </div>
            </div>
          </div>

          <!-- Cashier panel -->
          <div class="bg-surface-container-lowest p-6 flex flex-col gap-4 shadow-xl border border-outline-variant/30 rounded-xl">
            <div class="flex flex-col gap-1">
              <div class="inline-flex items-center gap-2">
                <span class="w-2 h-2 bg-tertiary-container inline-block" aria-hidden="true"></span>
                <span class="font-mono text-[11px] text-primary-container uppercase font-semibold">{{ page.dual.cashier.label }}</span>
              </div>
              <h3 class="font-display text-xl text-on-surface uppercase font-bold" :style="{ fontFamily: displayFont }">{{ page.dual.cashier.title }}</h3>
              <p class="text-sm text-on-surface-variant leading-relaxed">{{ page.dual.cashier.desc }}</p>
            </div>
            <ul class="flex flex-col gap-2 pt-1">
              <li v-for="(bullet, i) in page.dual.cashier.bullets" :key="i" class="flex items-start gap-2">
                <Icon :name="bulletIcons[i]" :size="20" class="text-primary-container shrink-0 mt-0.5" aria-hidden="true" />
                <span class="text-sm text-on-surface">{{ bullet }}</span>
              </li>
            </ul>
            <!-- Terminal mockup -->
            <div class="bg-surface-container p-4 mt-2 flex flex-col gap-4 border border-outline-variant/30 rounded-lg">
              <div class="flex items-center justify-between pb-1 border-b border-surface-container-high/60">
                <div class="flex items-center gap-2">
                  <Icon name="lucide:monitor" :size="18" class="text-primary-container" aria-hidden="true" />
                  <span class="font-mono text-[11px] text-on-surface uppercase">{{ page.dual.cashier.terminal.label }}</span>
                </div>
                <div class="flex items-center gap-2">
                  <span class="bg-surface-container-lowest px-2 py-0.5 font-mono text-[10px] text-primary-container border border-outline-variant/30 uppercase rounded">{{ page.dual.cashier.terminal.currency }}</span>
                  <div class="flex items-center gap-1">
                    <span class="w-2 h-2 rounded-full bg-primary-container" aria-hidden="true"></span>
                    <span class="font-mono text-[10px] text-on-surface uppercase">{{ page.dual.cashier.terminal.status }}</span>
                  </div>
                </div>
              </div>
              <div class="bg-surface-container-lowest p-4 flex flex-col gap-2 border border-outline-variant/20 rounded-lg">
                <div class="flex items-center justify-between">
                  <div class="flex items-center gap-2">
                    <span class="bg-surface-variant px-1.5 py-0.5 font-mono text-[10px] text-primary-container uppercase rounded">{{ page.dual.cashier.terminal.race }}</span>
                    <span class="text-xs font-bold text-on-surface uppercase">{{ page.dual.cashier.terminal.track }}</span>
                  </div>
                  <span class="font-mono text-[11px] text-primary-container uppercase font-bold">{{ page.dual.cashier.terminal.bet }}</span>
                </div>
                <div class="flex items-center gap-1 pt-1 flex-wrap">
                  <span v-for="pick in page.dual.cashier.terminal.picks" :key="pick" class="bg-primary-container text-on-primary-container font-mono text-[10px] px-2 py-1 font-bold rounded">{{ pick }}</span>
                </div>
                <div class="flex items-center justify-between pt-1 border-t border-surface-container-high/40">
                  <span class="font-mono text-[10px] text-on-surface-variant uppercase">{{ page.dual.cashier.terminal.combosLabel }}</span>
                  <span class="font-display text-base text-primary-container font-bold" :style="{ fontFamily: displayFont }">{{ page.dual.cashier.terminal.totalLabel }}</span>
                </div>
              </div>
              <div class="flex flex-col sm:flex-row items-center gap-2">
                <button type="button" class="w-full bg-primary-container hover:bg-primary-fixed-dim text-on-primary-container font-bold text-sm uppercase py-2.5 flex items-center justify-center gap-2 transition-colors shadow-sm rounded-lg font-display" :style="{ fontFamily: displayFont }">
                  <Icon name="lucide:printer" :size="20" aria-hidden="true" />
                  <span>{{ page.dual.cashier.terminal.payBtn }}</span>
                </button>
                <button type="button" class="w-full sm:w-auto bg-surface-container-high hover:bg-surface-variant border border-outline-variant/40 text-on-surface font-bold text-sm uppercase px-4 py-2.5 transition-colors whitespace-nowrap rounded-lg font-display" :style="{ fontFamily: displayFont }">{{ page.dual.cashier.terminal.cancelBtn }}</button>
              </div>
              <div class="flex items-center justify-between text-on-surface-variant font-mono text-[10px]">
                <span>{{ page.dual.cashier.terminal.ws }}</span>
                <span>{{ page.dual.cashier.terminal.hash }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- S5: Matrix -->
<section class="w-full bg-surface py-16 lg:py-20">
   <div class="w-full px-4 lg:px-12 max-w-7xl mx-auto flex flex-col gap-6">
    <div class="flex flex-col gap-1">
     <span class="font-mono text-[11px] text-primary-container uppercase tracking-widest">{{ page.matrix.kicker }}</span>
          <h2 class="font-display text-3xl md:text-4xl font-black uppercase text-on-surface" :style="{ fontFamily: displayFont }">{{ page.matrix.title }}</h2>
          <p class="text-on-surface-variant max-w-2xl">{{ page.matrix.desc }}</p>
        </div>
        <div class="w-full overflow-x-auto bg-surface-container-lowest shadow-lg border border-outline-variant/30 rounded-xl">
          <table class="w-full text-left text-sm">
            <thead>
              <tr class="bg-surface-container border-b border-outline-variant/40">
                <th class="p-4 font-display text-on-surface uppercase tracking-wide w-1/4 font-bold" :style="{ fontFamily: displayFont }">{{ page.matrix.headers[0] }}</th>
                <th class="p-4 font-display text-primary-container uppercase tracking-wide font-bold" :style="{ fontFamily: displayFont }">{{ page.matrix.headers[1] }}</th>
                <th class="p-4 font-display text-primary-container uppercase tracking-wide font-bold" :style="{ fontFamily: displayFont }">{{ page.matrix.headers[2] }}</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-surface-container-high/40">
              <tr v-for="row in page.matrix.rows" :key="row.dim" class="hover:bg-surface-container/30 transition-colors">
                <td class="p-4 font-bold text-on-surface">{{ row.dim }}</td>
                <td class="p-4 text-on-surface-variant">{{ row.banker }}</td>
                <td class="p-4 text-on-surface">{{ row.cashier }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>

    <!-- S6: Closing CTA -->
    <section class="w-full bg-surface-container-lowest py-16 lg:py-24">
      <div class="w-full px-4 lg:px-12 max-w-5xl mx-auto flex flex-col items-center text-center gap-6">
        <div class="inline-flex items-center gap-2 px-4 py-1 bg-surface-container border border-outline-variant/30 rounded">
          <span class="w-2 h-2 rounded-full bg-primary-container" aria-hidden="true"></span>
          <span class="font-mono text-[11px] uppercase text-primary-container tracking-widest font-semibold">{{ page.closing.pill }}</span>
        </div>
        <div class="flex flex-col gap-1">
          <h2 class="font-display text-3xl md:text-4xl font-black text-on-surface uppercase tracking-tight" :style="{ fontFamily: displayFont }">{{ page.closing.title }}</h2>
          <p class="text-lg text-on-surface-variant max-w-2xl mx-auto font-light">{{ page.closing.desc }}</p>
        </div>
        <div class="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto pt-1">
          <NuxtLinkLocale
            to="/demo"
            class="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-primary-container hover:bg-primary-fixed-dim text-on-primary-container font-bold text-sm uppercase px-8 py-3 transition-all shadow-[0_2px_14px_rgba(255,199,26,0.25)] hover:shadow-[0_4px_20px_rgba(255,199,26,0.35)] rounded-lg font-display"
            :style="{ fontFamily: displayFont }"
          >
            <span>{{ page.closing.ctaPrimary }}</span>
            <Icon name="lucide:arrow-right" :size="20" aria-hidden="true" />
          </NuxtLinkLocale>
          <NuxtLinkLocale
            to="/contacto"
            class="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-surface-container-high hover:bg-surface-variant border border-outline-variant/40 text-on-surface font-bold text-sm uppercase px-6 py-3 transition-colors rounded-lg font-display"
            :style="{ fontFamily: displayFont }"
          >{{ page.closing.ctaSecondary }}</NuxtLinkLocale>
        </div>
        <div class="flex flex-wrap items-center justify-center gap-4 pt-1">
          <span class="font-mono text-[10px] uppercase text-on-surface-variant">{{ page.closing.seeLabel }}</span>
          <template v-for="(link, i) in page.closing.links" :key="link.to">
            <span v-if="i > 0" class="text-outline-variant" aria-hidden="true">•</span>
            <NuxtLinkLocale :to="link.to" class="font-mono text-[11px] text-primary-container hover:text-on-surface transition-colors flex items-center gap-1 uppercase">
              <span>{{ link.label }}</span>
              <Icon name="lucide:chevron-right" :size="16" aria-hidden="true" />
            </NuxtLinkLocale>
          </template>
        </div>
      </div>
    </section>
  </div>
</template>
