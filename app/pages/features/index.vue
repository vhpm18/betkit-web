<script setup lang="ts">
const { t } = useI18n()

useHead({
  title: () => t('features.title'),
  meta: [
    { name: 'description', content: () => t('features.subtitle') },
    { name: 'robots', content: 'index, follow' },
  ],
})
</script>

<template>
  <div class="container py-24 space-y-12">
    <div class="max-w-3xl space-y-4">
      <h1 class="text-4xl font-display font-black tracking-tight">
        {{ t('features.title') }}
      </h1>
      <p class="text-lg text-muted-foreground">
        {{ t('features.subtitle') }}
      </p>
    </div>

    <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      <NuxtLinkLocale
        to="/features/multi-sucursal"
        class="group rounded-xl border border-border bg-card p-6 transition-colors hover:border-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
      >
        <h2 class="text-xl font-display font-bold">{{ t('features.multiSucursal.title') }}</h2>
        <p class="mt-2 text-muted-foreground text-sm">
          {{ t('features.multiSucursal.desc') }}
        </p>
      </NuxtLinkLocale>

      <NuxtLinkLocale
        to="/features/premiaciones"
        class="group rounded-xl border border-border bg-card p-6 transition-colors hover:border-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
      >
        <h2 class="text-xl font-display font-bold">{{ t('features.premiaciones.title') }}</h2>
        <p class="mt-2 text-muted-foreground text-sm">
          {{ t('features.premiaciones.desc') }}
        </p>
      </NuxtLinkLocale>

      <NuxtLinkLocale
        to="/features/tipos-de-jugadas"
        class="group rounded-xl border border-border bg-card p-6 transition-colors hover:border-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
      >
        <h2 class="text-xl font-display font-bold">{{ t('features.betTypes.title') }}</h2>
        <p class="mt-2 text-muted-foreground text-sm">
          {{ t('features.betTypes.desc') }}
        </p>
      </NuxtLinkLocale>

      <NuxtLinkLocale
        to="/features/impresion"
        class="group rounded-xl border border-border bg-card p-6 transition-colors hover:border-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
      >
        <h2 class="text-xl font-display font-bold">{{ t('features.printing.title') }}</h2>
        <p class="mt-2 text-muted-foreground text-sm">
          {{ t('features.printing.desc') }}
        </p>
      </NuxtLinkLocale>

      <!-- Coming soon -->
      <div class="rounded-xl border border-border bg-card p-6">
        <span class="inline-flex items-center gap-2 rounded-full bg-muted border border-border px-3 py-1 font-mono text-[10px] tracking-wider text-slate-300 uppercase mb-3">
          {{ t('common.comingSoon') }}
        </span>
        <h2 class="text-xl font-display font-bold">{{ t('features.whatsapp.title') }}</h2>
        <p class="mt-2 text-muted-foreground text-sm">
          {{ t('features.whatsapp.desc') }}
        </p>
      </div>

      <div class="rounded-xl border border-border bg-card p-6">
        <span class="inline-flex items-center gap-2 rounded-full bg-muted border border-border px-3 py-1 font-mono text-[10px] tracking-wider text-slate-300 uppercase mb-3">
          {{ t('common.comingSoon') }}
        </span>
        <h2 class="text-xl font-display font-bold">{{ t('features.pollas.title') }}</h2>
        <p class="mt-2 text-muted-foreground text-sm">
          {{ t('features.pollas.desc') }}
        </p>
      </div>

      <NuxtLinkLocale
        to="/sellers"
        class="group rounded-xl border border-border bg-card p-6 transition-colors hover:border-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
      >
        <h2 class="text-xl font-display font-bold">{{ t('features.multiSucursal.channel.title') }}</h2>
        <p class="mt-2 text-muted-foreground text-sm">
          {{ t('features.multiSucursal.channel.desc') }}
        </p>
      </NuxtLinkLocale>
    </div>
  </div>
</template>
