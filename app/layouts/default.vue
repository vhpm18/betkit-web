<script setup lang="ts">
const { t } = useI18n()
const head = useLocaleHead()

useHead(() => ({
  htmlAttrs: { lang: head.value.htmlAttrs?.lang ?? 'es' },
  link: head.value.link ?? [],
  meta: head.value.meta ?? [],
}))
</script>

<template>
  <div class="min-h-screen bg-[#0D0E12] text-[#E2E4E9] font-body">
    <a
      href="#main-content"
      class="sr-only focus:not-sr-only focus:absolute focus:z-[100] focus:top-2 focus:left-2 focus:bg-[#FFC71A] focus:text-black focus:font-bold focus:px-4 focus:py-2 focus:rounded-lg"
    >
      {{ t('common.skipToContent') }}
    </a>
    <LayoutSiteHeader />
    <main id="main-content">
      <slot />
    </main>
    <LayoutSiteFooter />
  </div>
</template>
