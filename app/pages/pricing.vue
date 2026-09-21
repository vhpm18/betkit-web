<script setup lang="ts">
interface PricingStep {
  title: string
  desc: string
}

interface PricingMetric {
  label: string
  value: string
}

interface CompareRow {
  criterion: string
  legacySub: string
  legacy: string
  betkit: string
}

interface FaqItem {
  q: string
  a: string
}

interface MasterFeature {
  title: string
  sub: string
}

definePageMeta({ layout: 'default' })

const { t } = useI18n()

// Structured (array/object) messages must be resolved via usePageMessages:
// t() only renders string messages and returns the raw key for arrays on SSR.
const page = usePageMessages<{
  telemetry: { label: string, regions: string, liquidation: string, contract: string }
  steps: PricingStep[]
  microMetrics: PricingMetric[]
  table: { headers: string[]; rows: string[][] }
  compareRows: CompareRow[]
  faqItems: FaqItem[]
  masterFeatures: MasterFeature[]
}>('pricingPage')

// Design system display face: Archivo Narrow 700 (Archivo as fallback until loaded)
const displayFont = "'Archivo Narrow', 'Archivo', sans-serif"

// === Simulator (illustrative $ amounts only — no commission % revealed) ===
// The illustrative factors below are NOT displayed anywhere. The product copy
// only references a generic "micro-commission per transaction" model per the
// commercial constraint (see docs/sintesis-web-betkit.md:81,198).
const volumePresets = [25000, 60000, 150000, 500000]
const selectedVolume = ref(60000)

const simCost = computed(() => Math.round(selectedVolume.value * 0.0095))
const simSavings = computed(() => Math.round(selectedVolume.value * 0.024))

function formatUsd(n: number) {
  return n.toLocaleString('en-US')
}

// === FAQ accordion (one open at a time) ===
const openFaqIndex = ref(0)

function toggleFaq(index: number) {
  openFaqIndex.value = openFaqIndex.value === index ? -1 : index
}

useHead({
  title: () => t('pricingPage.title'),
  meta: [
    { name: 'description', content: () => `${t('pricingPage.subtitleBefore')} ${t('pricingPage.subtitleChip')} ${t('pricingPage.subtitleAfter')}` },
    { name: 'robots', content: 'index, follow' },
  ],
})
</script>

<template>
  <!-- Override layout's bg so the pricing page controls its own dark canvas -->
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

    <!-- Hero -->
    <section class="relative pt-16 pb-24 md:pt-24 md:pb-32 overflow-hidden hud-grid">
      <!-- Ambient glow behind hero (from home mockup) -->
      <div
        class="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-175 h-87.5 bg-brand-yellow/10 blur-[130px] rounded-full pointer-events-none z-0"
        aria-hidden="true"
      ></div>
      <div class="relative z-10 max-w-6xl mx-auto px-6 text-center space-y-8">
        <div class="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-surface-container-high shadow-sm">
          <span class="w-2 h-2 rounded-full bg-primary-container animate-ping" aria-hidden="true" />
          <span class="font-mono text-[11px] tracking-widest text-primary-container uppercase">
            {{ t('pricingPage.badge') }}
          </span>
        </div>

        <h1
          :style="{ fontFamily: displayFont }"
          class="text-4xl md:text-[54px] md:leading-[52px] font-bold uppercase tracking-tight text-on-surface max-w-4xl mx-auto"
        >
          {{ t('pricingPage.titleStart') }}
          <span class="text-primary-container">{{ t('pricingPage.titleHighlight') }}</span>
          {{ t('pricingPage.titleAfter') }}
        </h1>

        <p
          class="text-[19px] md:text-body-lg md:leading-relaxed text-on-surface-variant max-w-2xl mx-auto"
        >
          {{ t('pricingPage.subtitleBefore') }}
          <span
            class="font-mono text-[13px] tracking-widest text-primary-container font-bold px-1.5 py-0.5 rounded bg-surface-container"
            >{{ t('pricingPage.subtitleChip') }}</span
          >
          {{ t('pricingPage.subtitleAfter') }}
        </p>

        <dl class="grid grid-cols-2 lg:grid-cols-4 gap-3 max-w-4xl mx-auto pt-2">
          <!-- Feature metrics use bg-surface-container-low per design system -->
          <div
            v-for="(m, i) in page.microMetrics"
            :key="i"
            class="rounded bg-surface-container-low p-3 text-left"
          >
            <dt class="block font-mono text-[11px] tracking-[0.08em] text-on-surface-variant uppercase">
              {{ m.label }}
            </dt>
            <dd
              class="block font-mono text-[13px] tracking-widest font-semibold uppercase mt-1.5"
              :class="i < 2 ? 'text-primary-container' : 'text-on-surface'"
            >
              {{ m.value }}
            </dd>
          </div>
        </dl>
      </div>
    </section>

    <!-- Master price card: specs left / action panel right -->
    <section class="py-16 md:py-20 bg-surface-container-lowest relative">
      <div class="max-w-6xl mx-auto px-6">
        <div class="relative overflow-hidden rounded-xl bg-surface-container p-6 sm:p-10 lg:p-12 shadow-2xl shadow-black/60">
          <div class="absolute top-0 left-0 right-0 h-1 bg-linear-to-r from-transparent via-primary-container to-transparent" aria-hidden="true" />
          <div class="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            <!-- Left: feature checklist -->
            <div class="lg:col-span-7 flex flex-col gap-6">
              <div class="flex flex-wrap items-center gap-3">
                <span
                  class="inline-block bg-primary-container text-on-primary-fixed font-bold text-[13px] uppercase tracking-wider px-3 py-1"
                  :style="{ fontFamily: displayFont }"
                >
                  {{ t('pricingPage.masterBadge') }}
                </span>
                <span class="font-mono text-[13px] tracking-[0.1em] text-on-surface/70 uppercase">
                  {{ t('pricingPage.masterEdition') }}
                </span>
              </div>

              <div class="space-y-4">
                <h2
                  :style="{ fontFamily: displayFont }"
                  class="text-3xl md:text-4xl font-bold uppercase tracking-tight text-on-surface leading-[.95]"
                >
                  {{ t('pricingPage.masterTitle') }}
                </h2>
                <p class="text-[16px] leading-[1.6] text-on-surface/70 max-w-xl">
                  {{ t('pricingPage.payOnly') }}
                </p>
              </div>

              <ul class="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6">
                <li
                  v-for="(feature, i) in page.masterFeatures"
                  :key="i"
                  class="flex items-start gap-3"
                >
                  <Icon name="lucide:circle-check" :size="20" class="text-primary-container shrink-0 mt-0.5" aria-hidden="true" />
                  <div class="flex flex-col">
                    <span class="font-semibold text-[16px] text-on-surface">{{ feature.title }}</span>
                    <span class="font-mono text-[11px] tracking-[0.08em] text-on-surface/70 uppercase">{{ feature.sub }}</span>
                  </div>
                </li>
              </ul>
            </div>

            <!-- Right: action panel -->
            <div
              class="lg:col-span-5 rounded-lg bg-surface-container-high shadow-inner p-6 sm:p-8 flex flex-col justify-between gap-8"
            >
              <div class="space-y-8">
                <div class="flex items-start justify-between gap-4">
                  <div>
                    <span class="font-mono text-[11px] tracking-[0.08em] text-on-surface/70 uppercase">
                      {{ t('pricing.fixedLabel') }}
                    </span>
                    <div class="flex items-baseline gap-2 mt-2">
                      <span
                        :style="{ fontFamily: displayFont }"
                        class="text-5xl md:text-6xl font-bold text-on-surface leading-none"
                      >
                        {{ t('pricing.fixedPrice') }}
                      </span>
                      <span class="font-mono text-[13px] tracking-widest text-on-surface-variant uppercase">
                        {{ t('pricing.fixedUnit') }}
                      </span>
                    </div>
                  </div>
                  <span
                    class="rounded bg-surface-container-highest text-primary-container font-mono text-[11px] tracking-[0.08em] uppercase px-2 py-1 font-bold shrink-0"
                  >
                    {{ t('pricingPage.freeBadge') }}
                  </span>
                </div>

                <div class="space-y-2.5">
                    <span class="block font-mono text-[11px] tracking-[0.08em] text-on-surface-variant uppercase">
                      {{ t('pricingPage.scheduleLabel') }}
                    </span>
                    <div class="flex justify-between items-center gap-4 py-1">
                      <span class="font-mono text-[11px] tracking-[0.08em] text-on-surface-variant uppercase">{{ t('pricingPage.scheduleModel') }}</span>
                      <span class="font-mono text-[12px] tracking-[0.02em] text-on-surface font-bold text-right">{{ t('pricingPage.scheduleModelValue') }}</span>
                    </div>
                    <div class="flex justify-between items-center gap-4 py-1">
                      <span class="font-mono text-[11px] tracking-[0.08em] text-on-surface-variant uppercase">{{ t('pricingPage.scheduleTicket') }}</span>
                      <span class="font-mono text-[12px] tracking-[0.02em] text-primary-container font-bold text-right">{{ t('pricingPage.scheduleTicketValue') }}</span>
                    </div>
                    <div class="flex justify-between items-center gap-4 py-1">
                      <span class="font-mono text-[11px] tracking-[0.08em] text-on-surface-variant uppercase">{{ t('pricingPage.scheduleVoid') }}</span>
                      <span class="font-mono text-[12px] tracking-[0.02em] text-on-surface font-bold text-right">{{ t('pricingPage.scheduleVoidValue') }}</span>
                    </div>
                    <div class="flex justify-between items-center gap-4 py-1">
                      <span class="font-mono text-[11px] tracking-[0.08em] text-on-surface-variant uppercase">{{ t('pricingPage.scheduleUpdate') }}</span>
                      <span class="font-mono text-[12px] tracking-[0.02em] text-tertiary font-bold text-right">{{ t('pricingPage.scheduleUpdateValue') }}</span>
                    </div>
                </div>
              </div>

              <div class="space-y-3">
                <NuxtLinkLocale
                  to="/demo"
                  :style="{ fontFamily: displayFont }"
                  class="inline-flex w-full items-center justify-center gap-2 py-3.5 rounded-xl bg-primary-container hover:bg-primary-fixed-dim text-on-primary-container font-bold text-base tracking-tight transition-all shadow-lg shadow-brand-yellow/15 hover:shadow-brand-yellow/25 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ffc71a] focus-visible:ring-offset-2 focus-visible:ring-offset-[#131313] active:translate-y-0"
                >
                  <span>{{ t('pricingPage.masterCta') }}</span>
                  <Icon name="lucide:arrow-right" :size="20" aria-hidden="true" />
                </NuxtLinkLocale>
                <p class="font-mono text-[11px] tracking-[0.08em] text-on-surface-variant uppercase text-center flex items-center justify-center gap-1.5">
                  <Icon name="lucide:lock" :size="16" class="text-tertiary" aria-hidden="true" />
                  <span>{{ t('pricingPage.masterLockNote') }}</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Simulator (illustrative $ only — no commission % revealed) -->
    <section class="w-full px-4 lg:px-12 py-16">
      <div class="max-w-6xl mx-auto flex flex-col gap-10">
        <div class="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <span class="font-mono text-[13px] tracking-[0.1em] text-primary-container uppercase block mb-2">
              {{ t('pricingPage.simulatorKicker') }}
            </span>
            <h2
              :style="{ fontFamily: displayFont }"
              class="text-3xl md:text-4xl font-bold uppercase tracking-tight text-on-surface leading-[.95] mt-2"
            >
              {{ t('pricingPage.simulatorTitle') }}
            </h2>
          </div>
          <p class="text-[15px] leading-[1.6] text-on-surface-variant max-w-md">
            {{ t('pricingPage.simulatorDesc') }}
          </p>
        </div>

        <div class="rounded-xl bg-surface-container-low shadow-lg p-6 sm:p-8">
          <!-- Volume presets -->
          <div class="flex flex-col gap-3 mb-8">
            <div class="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
              <span class="font-semibold text-[16px] text-on-surface">
                {{ t('pricingPage.simulatorVolume') }}:
              </span>
              <span class="font-mono text-[20px] md:text-[22px] font-bold text-primary-container">
                ${{ formatUsd(selectedVolume) }} {{ t('pricingPage.simulatorVolumeSuffix') }}
              </span>
            </div>
            <div class="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2">
              <button
                v-for="preset in volumePresets"
                :key="preset"
                type="button"
                @click="selectedVolume = preset"
                class="py-2.5 px-4 rounded-lg font-mono text-[13px] uppercase text-center transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ffc71a]"
                :class="selectedVolume === preset
                  ? 'bg-primary-container text-on-primary-container font-bold'
                  : 'bg-surface-container hover:bg-surface-container-high text-on-surface font-semibold'"
              >
                ${{ formatUsd(preset) }} USD
              </button>
            </div>
          </div>

          <!-- Metric cards -->
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4" aria-live="polite">
            <div class="rounded-lg bg-surface-container p-5 flex flex-col justify-between">
              <div class="flex items-center justify-between mb-2">
                <span class="font-mono text-[11px] tracking-wider text-on-surface-variant uppercase">
                  {{ t('pricingPage.simulatorModel') }}
                </span>
                <Icon name="lucide:percent" :size="18" class="text-on-surface-variant" aria-hidden="true" />
              </div>
              <span class="font-mono text-[18px] font-bold text-primary-container my-1">
                {{ t('pricingPage.simulatorModelValue') }}
              </span>
              <span class="font-mono text-[11px] tracking-wider text-on-surface-variant uppercase">
                {{ t('pricingPage.simulatorModelHint') }}
              </span>
            </div>
            <div class="rounded-lg bg-surface-container p-5 flex flex-col justify-between">
              <div class="flex items-center justify-between mb-2">
                <span class="font-mono text-[11px] tracking-wider text-on-surface-variant uppercase">
                  {{ t('pricingPage.simulatorCost') }}
                </span>
                <Icon name="lucide:credit-card" :size="18" class="text-on-surface-variant" aria-hidden="true" />
              </div>
              <span class="font-mono text-[24px] font-bold text-on-surface my-1">
                ${{ formatUsd(simCost) }} USD
              </span>
              <span class="font-mono text-[11px] tracking-wider text-on-surface-variant uppercase">
                {{ t('pricingPage.simulatorCostHint') }}
              </span>
            </div>
            <div class="rounded-lg bg-surface-container-highest p-5 flex flex-col justify-between">
              <div class="flex items-center justify-between mb-2">
                <span class="font-mono text-[11px] tracking-wider text-primary-container uppercase font-bold">
                  {{ t('pricingPage.simulatorSavings') }}
                </span>
                <Icon name="lucide:badge-check" :size="18" class="text-primary-container" aria-hidden="true" />
              </div>
              <span class="font-mono text-[24px] font-bold text-tertiary-fixed my-1">
                +${{ formatUsd(simSavings) }} USD
              </span>
              <span class="font-mono text-[11px] tracking-wider text-on-surface-variant uppercase">
                {{ t('pricingPage.simulatorSavingsHint') }}
              </span>
            </div>
          </div>

          <div class="mt-6 rounded bg-surface-container-lowest p-4 flex gap-3 items-center">
            <Icon name="lucide:trending-up" :size="20" class="text-primary-container shrink-0" aria-hidden="true" />
            <p class="text-[15px] leading-[1.6] text-on-surface-variant">
              <strong>{{ t('pricingPage.simulatorImpact.title') }}</strong> {{ t('pricingPage.simulatorImpact.sub') }}
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Comparison: BetKit vs legacy systems -->
    <section class="bg-surface-container-lowest">
      <div class="max-w-6xl mx-auto px-6 pt-16 md:pt-20 pb-16 md:pb-20">
        <div class="text-center max-w-2xl mx-auto mb-10">
          <span class="font-mono text-[13px] tracking-[0.1em] text-primary-container uppercase block">
            {{ t('pricingPage.compareKicker') }}
          </span>
          <h2
            :style="{ fontFamily: displayFont }"
            class="text-3xl md:text-4xl font-bold uppercase tracking-tight text-on-surface leading-[.95] mt-2 mb-3"
          >
            {{ t('pricingPage.compareTitle') }}
          </h2>
          <p class="text-[15px] leading-[1.6] text-on-surface-variant">
            {{ t('pricingPage.compareDesc') }}
          </p>
        </div>

        <div class="rounded-xl overflow-hidden bg-surface-container shadow-xl">
          <!-- Table header -->
          <div class="grid grid-cols-1 md:grid-cols-12 p-4 sm:p-5 bg-surface-container-high">
            <div class="md:col-span-5 font-semibold text-[15px] uppercase tracking-wider text-on-surface">
              {{ t('pricingPage.compareColCriterion') }}
            </div>
            <div class="md:col-span-4 font-semibold text-[15px] uppercase tracking-wider text-on-surface-variant">
              {{ t('pricingPage.compareColLegacy') }}
            </div>
            <div class="md:col-span-3 font-extrabold text-[15px] uppercase tracking-wider text-primary-container flex items-center gap-1.5">
              <span class="inline-block w-2 h-2 rounded-full bg-primary-container" aria-hidden="true" />
              {{ t('pricingPage.compareColBetkit') }}
            </div>
          </div>

          <!-- Rows -->
          <div
            v-for="(row, i) in page.compareRows"
            :key="i"
            class="grid grid-cols-1 md:grid-cols-12 p-4 sm:p-5 items-center transition-colors"
            :class="i % 2 === 0 ? 'bg-surface-container hover:bg-surface-container-high' : 'bg-surface-container-low hover:bg-surface-container-high'"
          >
            <div class="md:col-span-5 mb-2 md:mb-0">
              <span class="font-semibold text-[15px] text-on-surface block">{{ row.criterion }}</span>
              <span class="font-mono text-[11px] tracking-wider text-on-surface-variant uppercase">{{ row.legacySub }}</span>
            </div>
            <div class="md:col-span-4 flex items-center gap-1.5 text-error">
              <Icon name="lucide:x" :size="16" aria-hidden="true" />
              <span class="font-mono text-[12px] tracking-[0.02em]">{{ row.legacy }}</span>
            </div>
            <div class="md:col-span-3 flex items-center gap-1.5 text-primary-container font-bold">
              <Icon name="lucide:circle-check" :size="16" class="text-primary-container" aria-hidden="true" />
              <span class="font-mono text-[12px] tracking-[0.02em]">{{ row.betkit }}</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- FAQ accordion -->
    <section>
      <div class="max-w-4xl mx-auto px-6 pt-16 md:pt-20 pb-16 md:pb-20">
        <div class="text-center mb-10">
          <span class="font-mono text-[13px] tracking-[0.1em] text-primary-container uppercase">
            {{ t('pricingPage.faqKicker') }}
          </span>
          <h2
            :style="{ fontFamily: displayFont }"
            class="text-3xl md:text-4xl font-bold uppercase tracking-tight text-on-surface leading-[.95] mt-2 mb-3"
          >
            {{ t('pricingPage.faqTitle') }}
          </h2>
          <p class="text-[15px] leading-[1.6] text-on-surface/70">
            {{ t('pricingPage.faqDesc') }}
          </p>
        </div>

        <div class="flex flex-col gap-3">
          <div
            v-for="(item, i) in page.faqItems"
            :key="i"
            class="rounded-lg bg-surface-container overflow-hidden"
          >
            <button
              type="button"
              class="w-full p-5 text-left flex items-center justify-between gap-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-container"
              :aria-expanded="openFaqIndex === i"
              :aria-controls="`faq-panel-${i}`"
              @click="toggleFaq(i)"
            >
              <span
                :style="{ fontFamily: displayFont }"
                class="font-bold text-[18px] uppercase tracking-wide text-on-surface"
              >
                {{ item.q }}
              </span>
              <Icon
                name="lucide:chevron-down"
                :size="20"
                class="text-primary-container shrink-0 transition-transform duration-200"
                :class="{ 'rotate-180': openFaqIndex === i }"
                aria-hidden="true"
              />
            </button>
            <div
              v-show="openFaqIndex === i"
              :id="`faq-panel-${i}`"
              class="px-5 pb-5 pt-0 text-[15px] leading-[1.6] text-on-surface-variant"
            >
              {{ item.a }}
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Closing banner with WhatsApp -->
    <section class="bg-surface-container-lowest">
      <div class="max-w-6xl mx-auto px-6 py-16">
        <div class="rounded-xl bg-linear-to-br from-surface-container-high via-surface-container to-surface-container-low p-8 sm:p-12 lg:p-16 shadow-2xl relative overflow-hidden">
          <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            <div class="lg:col-span-8 flex flex-col gap-4 text-left">
              <div class="inline-flex items-center gap-2 font-mono text-[13px] tracking-[0.1em] text-primary-container uppercase font-bold">
                <Icon name="lucide:headset" :size="18" class="text-primary-container shrink-0" aria-hidden="true" />
                <span>{{ t('pricingPage.bannerKicker') }}</span>
              </div>
              <h2
                :style="{ fontFamily: displayFont }"
                class="text-3xl md:text-[44px] font-bold uppercase tracking-tight text-on-surface leading-none"
              >
                {{ t('pricingPage.bannerTitle') }}
              </h2>
              <p class="text-[15px] leading-[1.6] text-on-surface-variant max-w-xl">
                {{ t('pricingPage.bannerDesc') }}
              </p>
            </div>
            <div class="lg:col-span-4 flex flex-col gap-3">
              <a
                href="https://wa.me/5491140928873"
                target="_blank"
                rel="noopener noreferrer"
                :style="{ fontFamily: displayFont }"
                class="w-full py-4 px-6 rounded bg-primary-container hover:bg-primary-fixed-dim text-on-primary-fixed font-bold uppercase tracking-wider text-center transition-all shadow-[0_0_20px_rgba(255,199,26,0.3)] inline-flex items-center justify-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-container focus-visible:ring-offset-2 focus-visible:ring-offset-surface-container-lowest"
              >
                <Icon name="lucide:message-circle" :size="20" aria-hidden="true" />
                <span>{{ t('pricingPage.bannerWhatsapp') }}</span>
              </a>
              <NuxtLinkLocale
                to="/demo"
                :style="{ fontFamily: displayFont }"
                class="w-full py-3.5 px-6 rounded bg-surface-container-highest hover:bg-surface-bright text-on-surface font-bold uppercase tracking-wider text-center transition-all inline-flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-container focus-visible:ring-offset-2 focus-visible:ring-offset-surface-container-lowest"
              >
                {{ t('pricingPage.bannerDemo') }}
              </NuxtLinkLocale>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Closing CTA -->
    <section class="pb-16 md:pb-24 pt-16 md:pt-20">
      <div class="max-w-6xl mx-auto px-6">
        <div class="rounded-xl bg-surface-container p-8 md:p-14 text-center space-y-6">
          <h2
            :style="{ fontFamily: displayFont }"
            class="text-3xl md:text-5xl font-bold uppercase tracking-tight text-on-surface leading-[.95]"
          >
            {{ t('pricingPage.closingTitle') }}
          </h2>
          <p class="text-on-surface-variant max-w-xl mx-auto leading-[1.6]">
            {{ t('pricingPage.closingDesc') }}
          </p>
          <div class="flex flex-col sm:flex-row gap-3 justify-center pt-2">
            <NuxtLinkLocale
              to="/demo"
              :style="{ fontFamily: displayFont }"
              class="inline-flex items-center justify-center gap-2 rounded bg-primary-container hover:bg-primary-fixed-dim text-on-primary-container font-bold uppercase tracking-wider text-base px-8 py-4 transition-all shadow-[0_0_20px_rgba(255,199,26,0.3)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ffc71a] focus-visible:ring-offset-2 focus-visible:ring-offset-[#131313]"
            >
              {{ t('pricingPage.cta') }}
              <Icon name="lucide:arrow-right" :size="20" class="text-black" aria-hidden="true" />
            </NuxtLinkLocale>
            <NuxtLinkLocale
              to="/contacto"
              :style="{ fontFamily: displayFont }"
              class="inline-flex items-center justify-center gap-2 rounded bg-surface-container-highest hover:bg-surface-bright text-on-surface font-bold uppercase tracking-wider text-base px-8 py-4 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ffc71a] focus-visible:ring-offset-2 focus-visible:ring-offset-[#131313]"
            >
              <Icon name="lucide:message-circle" :size="20" class="text-on-surface" aria-hidden="true" />
              {{ t('common.contactUs') }}
            </NuxtLinkLocale>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
