<script setup lang="ts">
const { t } = useI18n()
const displayFont = "'Archivo Narrow', 'Archivo', sans-serif"

const featuresMenu = [
  { to: '/features/multi-sucursal', label: () => t('features.multiSucursal.title'), icon: 'lucide:building-2', desc: () => t('features.multiSucursal.desc') },
  { to: '/features/premiaciones', label: () => t('features.premiaciones.title'), icon: 'lucide:calculator', desc: () => t('features.premiaciones.desc') },
  { to: '/features/tipos-de-jugadas', label: () => t('features.betTypes.title'), icon: 'lucide:list-ordered', desc: () => t('features.betTypes.desc') },
  { to: '/features/impresion', label: () => t('features.printing.title'), icon: 'lucide:printer', desc: () => t('features.printing.desc') },
]

const open = ref(false)
const dropdownRef = ref<HTMLElement | null>(null)

function onKeydown(event: KeyboardEvent) {
  if (event.key === 'Escape')
    open.value = false
}

function onClickOutside(event: MouseEvent) {
  if (dropdownRef.value && !dropdownRef.value.contains(event.target as Node))
    open.value = false
}

onMounted(() => {
  document.addEventListener('keydown', onKeydown)
  document.addEventListener('click', onClickOutside)
})

onBeforeUnmount(() => {
  document.removeEventListener('keydown', onKeydown)
  document.removeEventListener('click', onClickOutside)
})

const mobileOpen = ref(false)
</script>

<template>
  <header class="sticky top-0 z-50 bg-surface/85 backdrop-blur-xl border-b border-outline-variant/20">
    <div class="max-w-[1400px] mx-auto h-20 flex items-center justify-between px-4 sm:px-8">
      <!-- Logo -->
      <div class="flex items-center gap-8">
        <NuxtLinkLocale to="/" class="flex items-center gap-3 group rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-container focus-visible:ring-offset-2 focus-visible:ring-offset-surface" aria-label="BetKit">
          <div class="w-10 h-10 rounded-xl bg-primary-container flex items-center justify-center font-display font-black text-on-primary-container text-xl tracking-tighter shadow-md shadow-brand-yellow/10 group-hover:scale-105 transition-transform" :style="{ fontFamily: displayFont }">
            BK
          </div>
          <div class="flex flex-col">
            <div class="flex items-center gap-1.5">
              <span class="font-display font-black text-2xl tracking-tight text-on-surface uppercase leading-none" :style="{ fontFamily: displayFont }">BETKIT</span>
              <span class="text-[10px] font-mono font-bold bg-surface-container-high text-primary-container px-1.5 py-0.5 rounded border border-outline-variant/20">OS</span>
            </div>
            <span class="text-[10px] font-mono tracking-widest text-on-surface-variant uppercase leading-none mt-1">{{ t('nav.turfArchitecture') }}</span>
          </div>
        </NuxtLinkLocale>
      </div>

      <!-- Desktop nav -->
      <nav class="hidden md:flex items-center gap-1.5 ml-4 text-sm font-medium" :aria-label="t('nav.main')">
        <!-- Features dropdown -->
        <div ref="dropdownRef" class="relative">
          <button
            type="button"
            class="inline-flex items-center gap-1.5 px-3 py-2 text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-container rounded-lg"
            :aria-expanded="open"
            aria-controls="features-menu"
            @click="open = !open"
          >
            {{ t('nav.features') }}
            <Icon name="lucide:chevron-down" :size="14" class="transition-transform" :class="open ? 'rotate-180' : ''" aria-hidden="true" />
          </button>
          <div
            v-show="open"
            id="features-menu"
            class="absolute left-0 top-full mt-2 w-80 rounded-xl bg-surface-container-high border border-outline-variant/20 shadow-2xl shadow-black/50 p-2"
          >
            <NuxtLinkLocale
              v-for="item in featuresMenu"
              :key="item.to"
              :to="item.to"
              class="flex items-start gap-3 px-3 py-2.5 rounded-lg text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-container"
              @click="open = false"
            >
              <span class="w-9 h-9 shrink-0 rounded-lg bg-surface-container flex items-center justify-center">
                <Icon :name="item.icon" :size="18" class="text-primary-container" aria-hidden="true" />
              </span>
              <span class="flex flex-col">
                <span class="text-sm font-semibold text-on-surface">{{ item.label() }}</span>
                <span class="text-xs text-on-surface-variant leading-snug">{{ item.desc() }}</span>
              </span>
            </NuxtLinkLocale>
          </div>
        </div>

        <NuxtLinkLocale to="/banqueros" class="px-3 py-2 rounded-lg text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-container">
          {{ t('nav.banqueros') }}
        </NuxtLinkLocale>
        <NuxtLinkLocale to="/sellers" class="px-3 py-2 rounded-lg text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-container">
          {{ t('nav.sellers') }}
        </NuxtLinkLocale>
        <NuxtLinkLocale to="/pricing" class="px-3 py-2 rounded-lg text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-container">
          {{ t('nav.pricing') }}
        </NuxtLinkLocale>
        <NuxtLinkLocale to="/demo" class="px-3 py-2 rounded-lg text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-container">
          {{ t('nav.demo') }}
        </NuxtLinkLocale>
      </nav>

      <!-- Right Action CTAs -->
      <div class="hidden md:flex items-center gap-3">
        <LayoutLanguageSwitcher />
        <NuxtLinkLocale
          to="/demo"
          class="relative inline-flex items-center justify-center px-5 py-2.5 rounded-lg bg-primary-container hover:bg-primary-fixed-dim text-on-primary-container font-bold text-sm tracking-tight transition-all duration-200 shadow-md hover:shadow-brand-yellow/20 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-container focus-visible:ring-offset-2 focus-visible:ring-offset-surface font-display"
          :style="{ fontFamily: displayFont }"
        >
          {{ t('common.tryFree') }}
        </NuxtLinkLocale>
      </div>

      <!-- Mobile toggle -->
      <button
        type="button"
        class="md:hidden inline-flex items-center justify-center w-10 h-10 rounded-lg border border-outline-variant/20 text-on-surface-variant hover:text-on-surface focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-container"
        :aria-expanded="mobileOpen"
        aria-controls="mobile-menu"
        @click="mobileOpen = !mobileOpen"
      >
        <span class="sr-only">{{ t('nav.menu') }}</span>
        <Icon :name="mobileOpen ? 'lucide:x' : 'lucide:menu'" :size="20" aria-hidden="true" />
      </button>
    </div>

    <!-- Mobile panel -->
    <div v-show="mobileOpen" id="mobile-menu" class="md:hidden border-t border-outline-variant/20 bg-surface px-6 py-4 space-y-3">
      <NuxtLinkLocale v-for="item in featuresMenu" :key="item.to" :to="item.to" class="flex items-center gap-3 py-1.5 text-sm text-on-surface-variant" @click="mobileOpen = false">
        <Icon :name="item.icon" :size="16" class="text-primary-container shrink-0" aria-hidden="true" />
        <span>{{ t('nav.features') }} · {{ item.label() }}</span>
      </NuxtLinkLocale>
      <NuxtLinkLocale to="/banqueros" class="block py-1.5 text-sm text-on-surface-variant" @click="mobileOpen = false">{{ t('nav.banqueros') }}</NuxtLinkLocale>
      <NuxtLinkLocale to="/sellers" class="block py-1.5 text-sm text-on-surface-variant" @click="mobileOpen = false">{{ t('nav.sellers') }}</NuxtLinkLocale>
      <NuxtLinkLocale to="/pricing" class="block py-1.5 text-sm text-on-surface-variant" @click="mobileOpen = false">{{ t('nav.pricing') }}</NuxtLinkLocale>
      <NuxtLinkLocale to="/demo" class="block py-1.5 text-sm text-on-surface-variant" @click="mobileOpen = false">{{ t('nav.demo') }}</NuxtLinkLocale>
      <NuxtLinkLocale to="/contacto" class="block py-1.5 text-sm text-on-surface-variant" @click="mobileOpen = false">{{ t('nav.contact') }}</NuxtLinkLocale>
      <div class="flex items-center gap-4 pt-2">
        <LayoutLanguageSwitcher />
        <NuxtLinkLocale
          to="/demo"
          class="bg-primary-container hover:bg-primary-fixed-dim text-on-primary-container font-bold text-sm rounded-lg px-5 py-2.5 font-display"
          :style="{ fontFamily: displayFont }"
          @click="mobileOpen = false"
        >
          {{ t('common.tryFree') }}
        </NuxtLinkLocale>
      </div>
    </div>
  </header>
</template>