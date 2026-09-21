<script setup lang="ts">
const { t } = useI18n()

defineProps<{
  title?: string
  desc?: string
}>()
</script>

<template>
  <section class="pb-20 md:pb-28">
    <div class="max-w-[1400px] mx-auto px-6">
      <div class="rounded-3xl bg-card border border-border p-10 md:p-14 text-center space-y-6">
        <h2 v-if="title" class="font-display text-3xl md:text-4xl font-black text-white tracking-tight uppercase">
          {{ title }}
        </h2>
        <p v-if="desc" class="text-slate-400 max-w-xl mx-auto leading-relaxed">
          {{ desc }}
        </p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <CommonCtaButton to="/demo" size="lg">
            {{ t('common.tryFree') }}
          </CommonCtaButton>
          <CommonCtaButton to="/contacto" variant="outline" size="lg">
            {{ t('common.contactUs') }}
          </CommonCtaButton>
        </div>
      </div>
    </div>
  </section>
</template>
