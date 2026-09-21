<script setup lang="ts">
const { t } = useI18n()

useHead({
  title: () => t('blogPage.title'),
  meta: [
    { name: 'description', content: () => t('blogPage.subtitle') },
    { name: 'robots', content: 'index, follow' },
  ],
})
</script>

<template>
  <div class="min-h-screen bg-surface text-on-surface font-body">
    <!-- Hero -->
    <section class="relative py-20 md:py-28 overflow-hidden hud-grid">
      <!-- Ambient glow behind hero -->
      <div class="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-brand-yellow/10 blur-[130px] rounded-full pointer-events-none z-0" aria-hidden="true"></div>
      <div class="relative z-10 max-w-4xl mx-auto px-6 text-center space-y-6">
        <h1 class="text-4xl md:text-5xl font-display font-black uppercase tracking-tight text-foreground">
          {{ t('blogPage.title') }}
        </h1>
        <p class="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
          {{ t('blogPage.subtitle') }}
        </p>
      </div>
    </section>

    <!-- Empty State -->
    <section class="py-16">
      <div class="max-w-3xl mx-auto px-6">
        <div class="rounded-2xl bg-surface-container shadow-xl p-10 md:p-14 text-center space-y-6">
          <div class="flex items-center justify-center w-14 h-14 rounded-full bg-muted mx-auto">
            <Icon name="lucide:book-open" :size="24" class="text-muted-foreground" aria-hidden="true" />
          </div>
          <h2 class="text-xl font-display font-bold uppercase text-foreground">{{ t('blogPage.comingSoon') }}</h2>
          <p class="text-muted-foreground text-sm leading-relaxed max-w-md mx-auto">
            {{ t('blogPage.emptyState') }}
          </p>
        </div>
      </div>
    </section>

    <!-- Placeholder Article -->
    <section class="py-8 pb-20">
      <div class="max-w-3xl mx-auto px-6">
        <div class="rounded-xl bg-surface-container shadow-lg p-8 opacity-60">
          <div class="flex items-center gap-3 mb-4">
            <span class="px-3 py-1 rounded-full bg-muted text-muted-foreground text-xs font-mono uppercase tracking-wider">{{ t('blogPage.comingSoon') }}</span>
            <span class="text-muted-foreground text-xs font-mono">—</span>
          </div>
          <h3 class="text-lg font-display font-bold text-foreground mb-2">{{ t('blogPage.exampleArticle') }}</h3>
          <p class="text-muted-foreground text-sm leading-relaxed">
            {{ t('blogPage.exampleDesc') }}
          </p>
        </div>
      </div>
    </section>
  </div>
</template>
