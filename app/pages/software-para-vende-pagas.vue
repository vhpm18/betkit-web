<script setup lang="ts">
const { t } = useI18n()

useHead({
  title: () => t('softwarePage.title'),
  meta: [
    { name: 'description', content: () => t('softwarePage.desc') },
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
        <h1 class="text-4xl md:text-5xl lg:text-6xl font-display font-black uppercase tracking-tight text-foreground">
          {{ t('softwarePage.title') }}
        </h1>
        <p class="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
          {{ t('softwarePage.desc') }}
        </p>
      </div>
    </section>

    <!-- Feature Cards -->
    <section class="py-16">
      <div class="max-w-5xl mx-auto px-6">
        <div class="grid gap-8 md:grid-cols-2">
          <div v-for="(feat, i) in (t('softwarePage.features') as unknown as Array<{title: string, desc: string}>)" :key="i" class="rounded-2xl bg-surface-container shadow-xl p-8 md:p-10 space-y-4">
            <div class="flex items-center gap-3">
              <span class="flex items-center justify-center w-10 h-10 rounded-xl bg-primary/10">
                <Icon name="lucide:check" :size="20" class="text-primary" aria-hidden="true" />
              </span>
              <h2 class="text-xl font-display font-bold uppercase text-foreground">{{ feat.title }}</h2>
            </div>
            <p class="text-muted-foreground text-sm leading-relaxed">
              {{ feat.desc }}
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="py-16">
      <div class="max-w-3xl mx-auto px-6 text-center flex flex-col sm:flex-row gap-4 justify-center">
        <a
          href="/pricing"
          class="inline-flex items-center justify-center px-8 py-4 bg-primary hover:bg-brand-hover text-black font-bold rounded-xl text-base transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        >
          {{ t('softwarePage.cta') }}
        </a>
        <a
          href="/banqueros"
          class="inline-flex items-center justify-center px-8 py-4 bg-muted hover:bg-dark-750 text-slate-200 border border-border font-bold rounded-xl text-base transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        >
          {{ t('footer.banqueros') }}
        </a>
      </div>
    </section>
  </div>
</template>
