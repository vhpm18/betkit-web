<script setup lang="ts">
defineProps<{
  value: string
  label: string
  desc?: string
  highlight?: boolean
}>()
</script>

<template>
  <div
    class="px-8 py-10"
    :class="highlight ? 'border-l-2 border-primary' : 'border-l-2 border-border'"
  >
    <p class="font-display text-4xl md:text-5xl font-black text-white tracking-tight">
      {{ value }}
    </p>
    <p class="font-sans text-sm text-slate-300 mt-1">
      {{ label }}
    </p>
    <p v-if="desc" class="font-mono text-[10px] text-slate-400 mt-2 tracking-wider">
      {{ desc }}
    </p>
  </div>
</template>
