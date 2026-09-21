<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    badge: string
    title: string
    desc: string
    cta: string
    to: string
    featured?: boolean
  }>(),
  { featured: false },
)

const badgeClasses = computed(() =>
  props.featured
    ? 'bg-primary/10 border border-primary/20'
    : 'bg-cyan-500/10 border border-cyan-500/20',
)

const badgeDotClasses = computed(() =>
  props.featured ? 'bg-primary' : 'bg-cyan-400',
)

const badgeTextClasses = computed(() =>
  props.featured ? 'text-primary' : 'text-cyan-400',
)
</script>

<template>
  <div class="rounded-xl bg-card border border-border p-8 md:p-10 flex flex-col">
    <div class="inline-flex items-center gap-2 rounded-full px-3 py-1 mb-5" :class="badgeClasses">
      <span class="w-1.5 h-1.5 rounded-full" :class="badgeDotClasses" aria-hidden="true" />
      <span class="font-mono text-[10px] tracking-wider uppercase" :class="badgeTextClasses">{{ badge }}</span>
    </div>
    <h3 class="font-display text-2xl font-bold text-white tracking-tight uppercase mb-3">
      {{ title }}
    </h3>
    <p class="font-sans text-sm text-slate-300 leading-relaxed mb-8">
      {{ desc }}
    </p>
    <CommonCtaButton :to="to" class="mt-auto self-start" :variant="featured ? 'primary' : 'outline'">
      {{ cta }}
    </CommonCtaButton>
  </div>
</template>
