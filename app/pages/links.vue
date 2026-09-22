<script setup lang="ts">
const { t } = useI18n()
const appConfig = useAppConfig()

// Get social URLs from app config
const socialUrls = computed(() => ({
  whatsapp: appConfig.social?.whatsapp || '',
  instagram: appConfig.social?.instagram || '',
  tiktok: appConfig.social?.tiktok || '',
}))

// Merge i18n items with social URLs and filter out placeholders
const visibleLinks = computed(() => {
  const items = t('linksPage.items') as unknown as Array<{icon: string, label: string, micro: string, href: string}>
  return items.filter((item) => {
    // If href is a placeholder (# or empty), check if we have a real URL
    if (!item.href || item.href === '#') {
      // Check if this item is a social link with a real URL
      const icon = item.icon.toLowerCase()
      if (icon.includes('whatsapp') || icon.includes('💬')) {
        return !!socialUrls.value.whatsapp
      }
      if (icon.includes('instagram') || icon.includes('📷')) {
        return !!socialUrls.value.instagram
      }
      if (icon.includes('tiktok') || icon.includes('🎵')) {
        return !!socialUrls.value.tiktok
      }
      return false
    }
    return true
  }).map((item) => {
    // Replace placeholder hrefs with real URLs from app config
    const icon = item.icon.toLowerCase()
    if (item.href === '#' || !item.href) {
      if (icon.includes('whatsapp') || icon.includes('💬')) {
        return { ...item, href: socialUrls.value.whatsapp }
      }
      if (icon.includes('instagram') || icon.includes('📷')) {
        return { ...item, href: socialUrls.value.instagram }
      }
      if (icon.includes('tiktok') || icon.includes('🎵')) {
        return { ...item, href: socialUrls.value.tiktok }
      }
    }
    return item
  })
})

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
          v-for="(item, i) in visibleLinks"
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
