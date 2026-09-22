<script setup lang="ts">
const head = useLocaleHead()

useHead(() => ({
  htmlAttrs: { lang: head.value.htmlAttrs?.lang ?? 'es' },
  link: head.value.link ?? [],
  meta: head.value.meta ?? [],
}))
</script>

<template>
  <div class="min-h-screen bg-dark-950 text-foreground font-body antialiased">
    <main class="flex-1">
      <slot />
    </main>
  </div>
</template>

<style>
/* Ambient background gradients */
.min-h-screen {
  min-height: 100vh;
  background-color: var(--color-dark-950);
  background-image:
    radial-gradient(circle at 50% 0%, rgba(255, 199, 26, 0.08) 0%, transparent 45%),
    radial-gradient(circle at 10% 40%, rgba(16, 185, 129, 0.03) 0%, transparent 40%),
    radial-gradient(circle at 90% 80%, rgba(255, 199, 26, 0.04) 0%, transparent 50%);
  background-attachment: fixed;
}

/* Custom scrollbar */
::-webkit-scrollbar {
  width: 6px;
}
::-webkit-scrollbar-track {
  background: var(--color-dark-900);
}
::-webkit-scrollbar-thumb {
  background: var(--color-dark-700);
  border-radius: 3px;
}
::-webkit-scrollbar-thumb:hover {
  background: var(--color-dark-stroke);
}

/* iOS tap highlight */
* {
  -webkit-tap-highlight-color: transparent;
}

/* Antialiased text */
.antialiased {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.flex-1 {
  flex: 1 1 0%;
}

.font-body {
  font-feature-settings: "liga" 0;
  text-rendering: optimizeLegibility;
}

/* Selection color */
::selection {
  background-color: var(--color-brand-yellow);
  color: var(--color-dark-950);
}
</style>
