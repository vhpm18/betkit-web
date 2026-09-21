<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    to?: string
    href?: string
    variant?: 'primary' | 'outline'
    block?: boolean
    size?: 'md' | 'lg'
  }>(),
  {
    to: undefined,
    href: undefined,
    variant: 'primary',
    block: false,
    size: 'md',
  },
)

const classes = computed(() => {
  const base = [
    'inline-flex items-center justify-center font-bold transition-colors',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background',
    props.block ? 'w-full' : '',
    props.size === 'lg' ? 'px-7 py-3.5 text-base' : 'px-5 py-2.5 text-sm',
  ]
  const variants = {
    primary: 'bg-primary hover:bg-brand-hover text-black rounded-xl',
    outline: 'bg-muted hover:bg-dark-750 text-slate-200 border border-border rounded-xl',
  }
  return [...base, variants[props.variant]].filter(Boolean).join(' ')
})
</script>

<template>
  <NuxtLinkLocale v-if="to" :to="to" :class="classes">
    <slot />
  </NuxtLinkLocale>
  <a v-else-if="href" :href="href" :class="classes">
    <slot />
  </a>
  <button v-else type="button" :class="classes">
    <slot />
  </button>
</template>
