<script setup lang="ts">
const { t } = useI18n()

defineProps<{
  title: string
  desc?: string
  to?: string
  badge?: string
}>()
</script>

<template>
  <NuxtLinkLocale
    v-if="to"
    :to="to"
    class="group rounded-xl bg-card border border-border p-8 transition-colors hover:border-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
  >
    <h3 class="font-display text-xl font-bold uppercase text-white tracking-tight">
      {{ title }}
    </h3>
    <p v-if="desc" class="mt-3 text-slate-400 text-sm leading-relaxed">
      {{ desc }}
    </p>
    <span class="mt-5 inline-flex items-center gap-2 font-mono text-[11px] tracking-wider text-primary uppercase">
      {{ t('common.learnMore') }}
      <span aria-hidden="true">→</span>
    </span>
  </NuxtLinkLocale>

  <div v-else class="rounded-xl bg-card border border-border p-8">
    <span
      v-if="badge"
      class="inline-flex items-center gap-2 rounded-full bg-muted border border-border px-3 py-1 font-mono text-[10px] tracking-wider text-slate-300 uppercase mb-4"
    >
      {{ badge }}
    </span>
    <h3 class="font-display text-xl font-bold uppercase text-white tracking-tight">
      {{ title }}
    </h3>
    <p v-if="desc" class="mt-3 text-slate-400 text-sm leading-relaxed">
      {{ desc }}
    </p>
  </div>
</template>
