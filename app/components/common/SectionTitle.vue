<script setup lang="ts">
defineProps<{
  kicker?: string
  title: string
  desc?: string
}>()
</script>

<template>
  <div class="max-w-2xl space-y-4">
    <div v-if="kicker" class="flex items-center gap-3">
      <span class="w-2 h-2 rounded-full bg-primary" aria-hidden="true" />
      <span class="font-mono text-[11px] tracking-wider text-slate-400 uppercase">{{ kicker }}</span>
    </div>
    <h2 class="font-display text-3xl md:text-4xl font-black text-white tracking-tight uppercase leading-tight">
      {{ title }}
    </h2>
    <p v-if="desc" class="text-lg text-slate-400 leading-relaxed">
      {{ desc }}
    </p>
  </div>
</template>
