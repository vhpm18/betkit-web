<script setup lang="ts">
const { t } = useI18n()

useHead({
  title: () => t('linksPage.bio', { highlight: t('linksPage.bioHighlight') }),
  meta: [
    { name: 'description', content: () => t('linksPage.bio', { highlight: t('linksPage.bioHighlight') }) },
    { name: 'robots', content: 'index, follow' },
  ],
})
</script>

<template>
  <div class="min-h-screen flex items-center justify-center py-12 px-6">
    <div class="w-full max-w-md mx-auto space-y-10">
      <!-- Logo -->
      <div class="flex items-center justify-center gap-3">
        <span class="flex items-center justify-center w-12 h-12 rounded-lg bg-primary text-black font-display font-black text-lg">BK</span>
        <span class="text-2xl font-display font-black uppercase tracking-tight text-foreground">BetKit</span>
      </div>

      <!-- Bio -->
      <p class="text-center text-muted-foreground text-sm leading-relaxed">
        {{ t('linksPage.bio', { highlight: t('linksPage.bioHighlight') }) }}
      </p>

      <!-- Links -->
      <div class="space-y-4">
        <a
          v-for="(item, i) in (t('linksPage.items') as unknown as Array<{icon: string, label: string, micro: string, href: string}>)"
          :key="i"
          :href="item.href"
          class="flex items-center justify-between w-full min-h-[56px] px-6 rounded-xl bg-card border border-border hover:border-primary transition-colors group"
        >
          <div class="flex items-center gap-3">
            <span class="text-lg">{{ item.icon }}</span>
            <span class="text-foreground font-medium text-sm">{{ item.label }}</span>
          </div>
          <span class="text-muted-foreground text-xs">{{ item.micro }}</span>
        </a>
      </div>
    </div>
  </div>
</template>
