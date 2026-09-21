<script setup lang="ts">
const { t, locale, locales } = useI18n()
const switchLocalePath = useSwitchLocalePath()

const labels = computed(() =>
  locales.value.map(loc => ({
    code: loc.code,
    short: loc.code === 'pt-BR' ? 'BR' : loc.code.toUpperCase(),
    name: loc.name ?? loc.code,
  })),
)
</script>

<template>
  <nav
    class="flex items-center gap-1 border border-border rounded-lg px-2.5 py-1 text-xs font-mono bg-card"
    :aria-label="t('common.language')"
  >
    <NuxtLink
      v-for="loc in labels"
      :key="loc.code"
      :to="switchLocalePath(loc.code)"
      :hreflang="loc.code"
      :aria-current="locale === loc.code ? 'true' : undefined"
      :class="[
        'px-1 rounded transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary',
        locale === loc.code ? 'text-primary font-bold' : 'text-slate-400 hover:text-white',
      ]"
      :title="loc.name"
    >
      {{ loc.short }}
    </NuxtLink>
  </nav>
</template>
