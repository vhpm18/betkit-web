<script setup lang="ts">
const displayFont = "'Archivo Narrow', 'Archivo', sans-serif"
const page = usePageMessages<{
  title: string
  desc: string
  telemetry: { ws: string, latency: string, slot: string, engine: string }
  hero: {
    badge: string
    ref: string
    title: string
    desc: string
    ctaPrimary: string
    ctaSecondary: string
  }
  form: {
    title: string
    badge: string
    desc: string
    name: string
    namePh: string
    email: string
    emailPh: string
    whatsapp: string
    whatsappPh: string
    countries: Array<{ value: string, label: string }>
    operationType: string
    operationPlaceholder: string
    operationOptions: string[]
    terminals: string
    terminalsPlaceholder: string
    terminalsOptions: string[]
    racetracks: string
    racetracksPh: string
    thermal: string
    submit: string
    noteTitle: string
    note: string
    feedback: string
  }
  includes: {
    title: string
    badge: string
    items: Array<{ icon: string, title: string, badge: string, desc: string, footerL: string, footerR: string, footerRTone: string }>
    ticket: {
      label: string
      id: string
      track: string
      time: string
      bet: string
      amount: string
      hash: string
      exp: string
    }
  }
  immersion: {
    kicker: string
    title: string
    desc: string
    stats: Array<{ value: string, label: string }>
    cards: Array<{ title: string, sub: string }>
  }
  trust: {
    pillars: Array<{ icon: string, kicker: string, title: string, desc: string, m1v: string, m1l: string, m2v: string, m2l: string }>
    feedsLabel: string
    feeds: string[]
    feedsMore: string
  }
}>('demoPage')

// === Demo request form (S2) ===
const form = reactive({
  name: '',
  email: '',
  countryCode: '+54',
  whatsapp: '',
  operationType: '',
  terminals: '',
  racetracks: '',
  thermal: false,
})

// Immersion photos (S3) — paths resolved from public/ (order matches page.immersion.cards).
const immersionImages = [
  '/imges/demo/puntos_de_ventas.jpg',
  '/imges/demo/matris_de_cuotas.jpg',
]

const formSubmitted = ref(false)
const isSubmitting = ref(false)
const formError = ref('')
const feedbackMessage = computed(() => formSubmitted.value
  ? `SESIÓN REGISTRADA PARA ${form.name.toUpperCase()} (${form.countryCode} ${form.whatsapp}) - ASIGNANDO INGENIERO TURF OS. NOS CONTACTAREMOS VÍA WHATSAPP EN BREVE.`
  : page.form.feedback,
)

async function handleFormSubmit() {
  const valid = form.name.trim()
    && form.email.trim()
    && form.whatsapp.trim()
    && form.operationType
    && form.terminals
    && form.racetracks.trim()
  if (!valid) {
    return
  }

  isSubmitting.value = true
  formError.value = ''

  try {
    const res = await $fetch('/api/telegram', {
      method: 'POST',
      body: {
        formType: 'demo',
        name: form.name,
        email: form.email,
        countryCode: form.countryCode,
        whatsapp: form.whatsapp,
        operationType: form.operationType,
        terminals: form.terminals,
        racetracks: form.racetracks,
      },
    })

    if (res.success) {
      formSubmitted.value = true
    }
    else {
      formError.value = 'Error al enviar. Intentá de nuevo.'
    }
  }
  catch {
    formError.value = 'Error de conexión. Intentá de nuevo.'
  }
  finally {
    isSubmitting.value = false
  }
}

useHead({
  title: page.title,
  meta: [
    { name: 'description', content: page.desc },
    { name: 'robots', content: 'index, follow' },
  ],
})
</script>

<template>
  <div class="font-body">
    <!-- S0: Top Live Telemetry Bar -->
    <section class="relative w-full bg-surface-container-lowest px-4 sm:px-8 lg:px-12 py-5">
      <div class="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div class="flex items-center gap-3">
          <span class="relative flex h-2.5 w-2.5">
            <span class="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary-container opacity-60" aria-hidden="true"></span>
            <span class="relative inline-flex rounded-full h-2.5 w-2.5 bg-primary-container" aria-hidden="true"></span>
          </span>
          <span class="font-mono text-[11px] font-medium uppercase tracking-[0.15em] text-primary-container">{{ page.telemetry.ws }}</span>
          <span class="text-outline-variant" aria-hidden="true">/</span>
          <span class="font-mono text-[11px] text-on-surface-variant">{{ page.telemetry.latency }}</span>
        </div>
        <div class="flex flex-wrap items-center gap-x-6 gap-y-2 font-mono text-[11px] text-on-surface-variant">
          <div class="flex items-center gap-1.5">
            <Icon name="lucide:clock" :size="16" class="text-tertiary-fixed" aria-hidden="true" />
            <span class="text-on-surface">{{ page.telemetry.slot }}</span>
          </div>
          <div class="hidden sm:flex items-center gap-1.5">
            <Icon name="lucide:layers" :size="16" class="text-primary-container" aria-hidden="true" />
            <span>{{ page.telemetry.engine }}</span>
          </div>
        </div>
      </div>
    </section>

    <!-- S1: Hero Editorial -->
    <section class="w-full bg-surface-dim py-16 lg:py-20 px-4 lg:px-12 relative overflow-hidden hud-grid">
      <!-- Ambient glow behind hero -->
      <div class="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-brand-yellow/10 blur-[130px] rounded-full pointer-events-none z-0" aria-hidden="true"></div>
      <div class="relative z-10 max-w-7xl mx-auto flex flex-col gap-8">
        <div class="flex flex-wrap items-center gap-2">
          <span class="font-mono text-[11px] text-primary-container bg-surface-container px-3 py-1.5 uppercase tracking-widest shadow-sm rounded">{{ page.hero.badge }}</span>
          <span class="font-mono text-[10px] text-on-surface-variant uppercase tracking-widest hidden md:inline">{{ page.hero.ref }}</span>
        </div>
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
          <div class="lg:col-span-8 flex flex-col gap-4">
            <h1 class="font-display text-4xl md:text-5xl font-black text-on-surface uppercase tracking-tight leading-[1.08]" :style="{ fontFamily: displayFont }">
              {{ page.hero.title }}
            </h1>
            <p class="text-lg text-secondary max-w-3xl">{{ page.hero.desc }}</p>
          </div>
          <div class="lg:col-span-4 flex flex-wrap lg:justify-end items-center gap-4">
            <NuxtLinkLocale
              to="#formulario-demo"
              class="bg-primary-container hover:bg-primary-fixed-dim text-on-primary-container font-bold text-sm uppercase px-6 py-3 tracking-wide transition-all shadow-md flex items-center gap-2 rounded-lg font-display"
              :style="{ fontFamily: displayFont }"
            >
              <span>{{ page.hero.ctaPrimary }}</span>
              <Icon name="lucide:arrow-down" :size="20" aria-hidden="true" />
            </NuxtLinkLocale>
            <NuxtLinkLocale
              to="/pricing"
              class="bg-surface-container-high hover:bg-surface-bright text-on-surface font-bold text-sm uppercase px-6 py-3 tracking-wide transition-all shadow-sm flex items-center gap-2 rounded-lg font-display"
              :style="{ fontFamily: displayFont }"
            >
              <span>{{ page.hero.ctaSecondary }}</span>
              <Icon name="lucide:arrow-up-right" :size="20" aria-hidden="true" />
            </NuxtLinkLocale>
          </div>
        </div>
      </div>
    </section>

    <!-- S2: Two-Column Workspace -->
    <section class="w-full bg-surface py-16 lg:py-20 px-4 lg:px-12" id="formulario-demo">
      <div class="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
        <!-- Left: Form -->
        <div class="lg:col-span-7 flex flex-col gap-8">
          <div class="bg-surface-container-low p-6 lg:p-8 shadow-xl flex flex-col gap-6 rounded-xl">
            <div class="flex flex-col gap-1 pb-2 bg-surface-container-lowest p-4 rounded-lg">
              <div class="flex items-center justify-between">
                <span class="font-display text-base text-on-surface uppercase tracking-wide font-bold" :style="{ fontFamily: displayFont }">{{ page.form.title }}</span>
                <span class="font-mono text-[10px] text-primary-container uppercase">{{ page.form.badge }}</span>
              </div>
              <p class="text-sm text-secondary">{{ page.form.desc }}</p>
            </div>
            <form class="flex flex-col gap-4" novalidate @submit.prevent="handleFormSubmit">
              <!-- Error Message -->
              <div
                v-if="formError"
                class="bg-red-500/10 border border-red-500/30 text-red-400 rounded-lg px-4 py-3 text-sm font-medium"
              >
                {{ formError }}
              </div>
              <!-- Row 1: Name & Email -->
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div class="flex flex-col gap-1">
                  <label for="fullName" class="font-mono text-[11px] text-on-surface uppercase">{{ page.form.name }}</label>
                  <div class="bg-surface-container-lowest p-2.5 flex items-center gap-2 rounded-lg">
                    <Icon name="lucide:badge-check" :size="18" class="text-secondary" aria-hidden="true" />
                    <input id="fullName" v-model="form.name" type="text" required :placeholder="page.form.namePh" class="bg-transparent text-on-surface placeholder:text-surface-variant w-full focus:outline-none text-sm">
                  </div>
                </div>
                <div class="flex flex-col gap-1">
                  <label for="corporateEmail" class="font-mono text-[11px] text-on-surface uppercase">{{ page.form.email }}</label>
                  <div class="bg-surface-container-lowest p-2.5 flex items-center gap-2 rounded-lg">
                    <Icon name="lucide:at-sign" :size="18" class="text-secondary" aria-hidden="true" />
                    <input id="corporateEmail" v-model="form.email" type="email" required :placeholder="page.form.emailPh" class="bg-transparent text-on-surface placeholder:text-surface-variant w-full focus:outline-none text-sm">
                  </div>
                </div>
              </div>
              <!-- Row 2: WhatsApp with country -->
              <div class="flex flex-col gap-1">
                <label for="whatsappNumber" class="font-mono text-[11px] text-on-surface uppercase">{{ page.form.whatsapp }}</label>
                <div class="grid grid-cols-12 gap-1">
                  <div class="col-span-5 sm:col-span-4 bg-surface-container-lowest p-2.5 flex items-center rounded-lg">
                    <select id="countryCode" v-model="form.countryCode" class="bg-transparent text-on-surface font-mono text-xs w-full focus:outline-none cursor-pointer">
                      <option v-for="c in page.form.countries" :key="c.value" :value="c.value" class="bg-surface-container text-on-surface">{{ c.label }}</option>
                    </select>
                  </div>
                  <div class="col-span-7 sm:col-span-8 bg-surface-container-lowest p-2.5 flex items-center gap-2 rounded-lg">
                    <Icon name="lucide:smartphone" :size="18" class="text-secondary" aria-hidden="true" />
                    <input id="whatsappNumber" v-model="form.whatsapp" type="tel" required :placeholder="page.form.whatsappPh" class="bg-transparent text-on-surface placeholder:text-surface-variant font-mono text-xs w-full focus:outline-none">
                  </div>
                </div>
              </div>
              <!-- Row 3: Operation type & terminals -->
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div class="flex flex-col gap-1">
                  <label for="operationType" class="font-mono text-[11px] text-on-surface uppercase">{{ page.form.operationType }}</label>
                  <div class="bg-surface-container-lowest p-2.5 flex items-center rounded-lg">
                    <select id="operationType" v-model="form.operationType" class="bg-transparent text-on-surface text-sm w-full focus:outline-none cursor-pointer" required>
                      <option value="" disabled class="bg-surface-container text-secondary">{{ page.form.operationPlaceholder }}</option>
                      <option v-for="opt in page.form.operationOptions" :key="opt" :value="opt" class="bg-surface-container text-on-surface">{{ opt }}</option>
                    </select>
                  </div>
                </div>
                <div class="flex flex-col gap-1">
                  <label for="terminalsCount" class="font-mono text-[11px] text-on-surface uppercase">{{ page.form.terminals }}</label>
                  <div class="bg-surface-container-lowest p-2.5 flex items-center rounded-lg">
                    <select id="terminalsCount" v-model="form.terminals" class="bg-transparent text-on-surface text-sm w-full focus:outline-none cursor-pointer" required>
                      <option value="" disabled class="bg-surface-container text-secondary">{{ page.form.terminalsPlaceholder }}</option>
                      <option v-for="opt in page.form.terminalsOptions" :key="opt" :value="opt" class="bg-surface-container text-on-surface">{{ opt }}</option>
                    </select>
                  </div>
                </div>
              </div>
              <!-- Row 4: Racetracks -->
              <div class="flex flex-col gap-1">
                <label for="racetracks" class="font-mono text-[11px] text-on-surface uppercase">{{ page.form.racetracks }}</label>
                <div class="bg-surface-container-lowest p-2.5 flex items-center gap-2 rounded-lg">
                  <Icon name="lucide:landmark" :size="18" class="text-secondary" aria-hidden="true" />
                  <input id="racetracks" v-model="form.racetracks" type="text" required :placeholder="page.form.racetracksPh" class="bg-transparent text-on-surface placeholder:text-surface-variant w-full focus:outline-none text-sm">
                </div>
              </div>
              <!-- Row 5: Thermal checkbox -->
              <div class="bg-surface-container p-3 flex items-start gap-2 rounded-lg">
                <input id="thermalCompatibility" v-model="form.thermal" type="checkbox" class="mt-1 w-4 h-4 accent-primary-container cursor-pointer">
                <label for="thermalCompatibility" class="text-sm text-on-surface cursor-pointer select-none">{{ page.form.thermal }}</label>
              </div>
              <!-- Submit -->
              <div class="flex flex-col gap-2 pt-1">
                <button type="submit" class="w-full bg-primary-container hover:bg-primary-fixed-dim text-on-primary-container font-bold text-sm uppercase tracking-wider transition-all shadow-lg flex items-center justify-center gap-2 rounded-lg font-display py-3.5" :style="{ fontFamily: displayFont }" :disabled="formSubmitted || isSubmitting">
                  <template v-if="formSubmitted">
                    <Icon name="lucide:check-circle" :size="24" aria-hidden="true" />
                    <span>{{ page.form.sentButton }}</span>
                  </template>
                  <template v-else-if="isSubmitting">
                    <Icon name="lucide:loader-2" :size="24" class="animate-spin" aria-hidden="true" />
                    <span>Enviando...</span>
                  </template>
                  <template v-else>
                    <Icon name="lucide:terminal" :size="24" aria-hidden="true" />
                    <span>{{ page.form.submit }}</span>
                  </template>
                </button>
                <div class="bg-surface-container-lowest p-3 flex items-start gap-2 rounded-lg">
                  <Icon name="lucide:lock" :size="20" class="text-primary-container shrink-0 mt-[2px]" aria-hidden="true" />
                  <p class="text-sm text-secondary"><strong class="text-on-surface">{{ page.form.noteTitle }}</strong> {{ page.form.note }}</p>
                </div>
              </div>
              <!-- Feedback -->
              <div v-if="formSubmitted" class="p-3 bg-surface-container text-primary-container font-mono text-xs rounded-lg" role="status" aria-live="polite">
                {{ feedbackMessage }}
              </div>
            </form>
          </div>
        </div>

        <!-- Right: includes + ticket -->
        <div class="lg:col-span-5 flex flex-col gap-4">
          <div class="bg-surface-container-high p-4 flex items-center justify-between rounded-lg">
            <div class="flex items-center gap-2">
              <Icon name="lucide:badge-check" :size="20" class="text-primary-container" aria-hidden="true" />
              <span class="font-display text-base text-on-surface uppercase tracking-wide font-bold" :style="{ fontFamily: displayFont }">{{ page.includes.title }}</span>
            </div>
            <span class="font-mono text-[10px] text-secondary uppercase">{{ page.includes.badge }}</span>
          </div>
          <div v-for="item in page.includes.items" :key="item.title" class="bg-surface-container-low p-5 shadow-md flex flex-col gap-2 rounded-xl">
            <div class="flex items-center justify-between">
              <div class="flex items-center gap-2">
                <div class="w-9 h-9 bg-surface-container flex items-center justify-center rounded-lg">
                  <Icon :name="item.icon" :size="20" class="text-primary-container" aria-hidden="true" />
                </div>
                <h3 class="font-display text-sm text-on-surface uppercase tracking-tight font-bold" :style="{ fontFamily: displayFont }">{{ item.title }}</h3>
              </div>
              <span class="font-mono text-[10px] text-primary-container bg-surface-container px-1.5 py-[2px] uppercase rounded">{{ item.badge }}</span>
            </div>
            <p class="text-sm text-secondary">{{ item.desc }}</p>
            <div class="bg-surface-container-lowest p-2 flex items-center justify-between font-mono text-[10px] text-on-surface-variant rounded">
              <span>{{ item.footerL }}</span>
              <span :class="item.footerRTone === 'primary' ? 'text-primary-container font-medium' : 'text-on-surface'">{{ item.footerR }}</span>
            </div>
          </div>
          <!-- Ticket sample -->
          <div class="bg-surface-container-lowest p-4 shadow-inner flex flex-col gap-1 rounded-xl">
            <div class="flex items-center justify-between">
              <span class="font-mono text-[10px] text-secondary uppercase">{{ page.includes.ticket.label }}</span>
              <span class="font-mono text-[10px] text-primary-container">{{ page.includes.ticket.id }}</span>
            </div>
            <div class="bg-surface p-2 font-mono text-[10px] text-on-surface-variant flex flex-col gap-[2px] rounded">
              <div class="flex justify-between text-on-surface">
                <span>{{ page.includes.ticket.track }}</span>
                <span>{{ page.includes.ticket.time }}</span>
              </div>
              <div class="flex justify-between text-primary-container font-bold">
                <span>{{ page.includes.ticket.bet }}</span>
                <span>{{ page.includes.ticket.amount }}</span>
              </div>
              <div class="flex justify-between text-secondary pt-1">
                <span>{{ page.includes.ticket.hash }}</span>
                <span>{{ page.includes.ticket.exp }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- S3: Immersion -->
    <section class="w-full bg-surface-container-lowest py-16 lg:py-20 px-4 lg:px-12">
      <div class="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
        <div class="lg:col-span-5 flex flex-col gap-4">
          <span class="font-mono text-[11px] text-primary-container uppercase tracking-widest">{{ page.immersion.kicker }}</span>
          <h2 class="font-display text-2xl md:text-3xl font-black uppercase text-on-surface tracking-tight" :style="{ fontFamily: displayFont }">{{ page.immersion.title }}</h2>
          <p class="text-secondary">{{ page.immersion.desc }}</p>
          <div class="grid grid-cols-2 gap-4 pt-1">
            <div v-for="(stat, i) in page.immersion.stats" :key="i" class="bg-surface-container p-4 flex flex-col gap-1 rounded-lg">
              <span class="font-display text-lg text-primary-container uppercase font-bold" :style="{ fontFamily: displayFont }">{{ stat.value }}</span>
              <span class="font-mono text-[10px] text-secondary uppercase">{{ stat.label }}</span>
            </div>
          </div>
        </div>
        <div class="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div v-for="(card, i) in page.immersion.cards" :key="i" class="bg-surface-container-low p-2 shadow-md flex flex-col gap-2 rounded-xl">
            <div class="relative w-full h-56 rounded-lg overflow-hidden bg-surface-container-lowest">
              <img
                :src="immersionImages[i]"
                :alt="card.title"
                class="w-full h-full object-cover opacity-80"
                loading="lazy"
              >
              <div class="absolute inset-0 bg-gradient-to-t from-surface-container-lowest via-surface-container-lowest/40 to-transparent" aria-hidden="true"></div>
            </div>
            <div class="px-1 pb-1 flex justify-between items-center">
              <span class="font-mono text-xs text-on-surface uppercase">{{ card.title }}</span>
              <span class="font-mono text-[10px] text-primary-container">{{ card.sub }}</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- S4: B2B Trust -->
    <section class="w-full bg-surface-container py-16 lg:py-20 px-4 lg:px-12">
      <div class="max-w-7xl mx-auto flex flex-col gap-8">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
          <div v-for="(pillar, i) in page.trust.pillars" :key="i" class="bg-surface-container-lowest p-8 shadow-lg flex flex-col gap-4 justify-between rounded-xl">
            <div class="flex flex-col gap-2">
              <div class="flex items-center gap-2">
                <Icon :name="pillar.icon" :size="28" class="text-primary-container" aria-hidden="true" />
                <span class="font-mono text-[11px] text-primary-container uppercase tracking-widest">{{ pillar.kicker }}</span>
              </div>
              <h3 class="font-display text-lg text-on-surface uppercase tracking-tight font-bold" :style="{ fontFamily: displayFont }">{{ pillar.title }}</h3>
              <p class="text-sm text-secondary">{{ pillar.desc }}</p>
            </div>
            <div class="flex items-center gap-4 pt-4">
              <div class="flex flex-col">
                <span class="font-display text-lg text-on-surface font-bold" :style="{ fontFamily: displayFont }">{{ pillar.m1v }}</span>
                <span class="font-mono text-[10px] text-secondary uppercase">{{ pillar.m1l }}</span>
              </div>
              <span class="font-mono text-[10px] text-secondary" aria-hidden="true">|</span>
              <div class="flex flex-col">
                <span class="font-display text-lg text-primary-container font-bold" :style="{ fontFamily: displayFont }">{{ pillar.m2v }}</span>
                <span class="font-mono text-[10px] text-secondary uppercase">{{ pillar.m2l }}</span>
              </div>
            </div>
          </div>
        </div>
        <!-- Feeds bar -->
        <div class="bg-surface-container-high p-6 flex flex-col md:flex-row items-center justify-between gap-4 rounded-xl">
          <div class="flex items-center gap-2">
            <Icon name="lucide:globe" :size="22" class="text-secondary" aria-hidden="true" />
            <span class="font-display text-base text-on-surface uppercase font-bold" :style="{ fontFamily: displayFont }">{{ page.trust.feedsLabel }}</span>
          </div>
          <div class="flex flex-wrap items-center gap-1">
            <span v-for="feed in page.trust.feeds" :key="feed" class="bg-surface-container-lowest px-2 py-1 font-mono text-[10px] text-secondary rounded">{{ feed }}</span>
            <span class="bg-surface-container-lowest px-2 py-1 font-mono text-[10px] text-primary-container rounded">{{ page.trust.feedsMore }}</span>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
