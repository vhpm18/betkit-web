<script setup lang="ts">
const head = useLocaleHead()

useHead(() => ({
  htmlAttrs: { lang: head.value.htmlAttrs?.lang ?? 'es' },
  link: head.value.link ?? [],
  meta: head.value.meta ?? [],
}))
</script>

<template>
  <div class="min-h-screen bg-[#0D0E12] text-[#E2E4E9] font-body">
    <main class="flex-1">
      <slot />
    </main>
  </div>
</template>

<style>
.min-h-screen {
  min-height: 100vh;
}

.flex-1 {
  flex: 1 1 0%;
}

.font-body {
  font-feature-settings: "liga" 0;
  text-rendering: optimizeLegibility;
}
</style>
