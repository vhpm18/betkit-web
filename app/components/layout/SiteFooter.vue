<script setup lang="ts">
const { t } = useI18n()
const displayFont = "'Archivo Narrow', 'Archivo', sans-serif"
</script>

<template>
  <footer class="bg-surface-container-lowest border-t border-outline-variant/20 text-on-surface-variant text-sm">
    <div class="max-w-[1400px] mx-auto px-4 sm:px-8 py-16">
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10">
        <!-- Col 1: Brand -->
        <div class="lg:col-span-2 flex flex-col gap-4">
          <div class="flex items-center gap-2.5">
            <div class="w-8 h-8 rounded-lg bg-primary-container flex items-center justify-center">
              <span class="font-display font-black text-on-primary-container text-base" :style="{ fontFamily: displayFont }">BK</span>
            </div>
            <span class="font-display font-black text-xl tracking-tight text-on-surface uppercase" :style="{ fontFamily: displayFont }">BETKIT</span>
          </div>
          <p class="text-on-surface-variant text-sm leading-relaxed max-w-sm">{{ t('footer.desc') }}</p>
          <div class="font-mono text-xs text-tertiary flex items-center gap-2 pt-2">
            <span class="w-2 h-2 rounded-full bg-tertiary" aria-hidden="true" />
            {{ t('footer.certified') }}
          </div>
        </div>

        <!-- Col 2: Producto -->
        <div class="flex flex-col gap-3">
          <span class="text-on-surface font-mono uppercase tracking-wider text-xs font-semibold">{{ t('footer.product') }}</span>
          <ul class="flex flex-col gap-2 font-medium text-on-surface-variant">
            <li>
              <NuxtLinkLocale to="/features" class="hover:text-primary-container focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary-container rounded transition-colors">
                {{ t('footer.links.terminal') }}
              </NuxtLinkLocale>
            </li>
            <li>
              <NuxtLinkLocale to="/features/tipos-de-jugadas" class="hover:text-primary-container focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary-container rounded transition-colors">
                {{ t('footer.links.betTypes') }}
              </NuxtLinkLocale>
            </li>
            <li>
              <NuxtLinkLocale to="/pricing" class="hover:text-primary-container focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary-container rounded transition-colors">
                {{ t('footer.links.motor') }}
              </NuxtLinkLocale>
            </li>
            <li>
              <NuxtLinkLocale to="/features/impresion" class="hover:text-primary-container focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary-container rounded transition-colors">
                {{ t('footer.links.printing') }}
              </NuxtLinkLocale>
            </li>
            <li>
              <NuxtLinkLocale to="/features/tipos-de-jugadas" class="hover:text-primary-container focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary-container rounded transition-colors">
                {{ t('footer.links.audit') }}
              </NuxtLinkLocale>
            </li>
          </ul>
        </div>

        <!-- Col 3: Empresa -->
        <div class="flex flex-col gap-3">
          <span class="text-on-surface font-mono uppercase tracking-wider text-xs font-semibold">{{ t('footer.company') }}</span>
          <ul class="flex flex-col gap-2 font-medium text-on-surface-variant">
            <li>
              <NuxtLinkLocale to="/sellers" class="hover:text-primary-container focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary-container rounded transition-colors">
                {{ t('footer.links.sellers') }}
              </NuxtLinkLocale>
            </li>
            <li>
              <NuxtLinkLocale to="/pricing" class="hover:text-primary-container focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary-container rounded transition-colors">
                {{ t('footer.links.terms') }}
              </NuxtLinkLocale>
            </li>
            <li>
              <NuxtLinkLocale to="/features" class="hover:text-primary-container focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary-container rounded transition-colors">
                {{ t('footer.links.security') }}
              </NuxtLinkLocale>
            </li>
            <li>
              <NuxtLinkLocale to="/contacto" class="hover:text-primary-container focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary-container rounded transition-colors">
                {{ t('footer.links.helpdesk') }}
              </NuxtLinkLocale>
            </li>
          </ul>
        </div>

        <!-- Col 4: Mesa Banqueros -->
        <div class="flex flex-col gap-3">
          <span class="text-primary-container font-mono uppercase tracking-wider text-xs font-semibold">{{ t('footer.sellerDesk') }}</span>
          <p class="text-on-surface-variant text-sm leading-relaxed">{{ t('footer.sellerDeskDesc') }}</p>
          <div class="p-3 rounded-lg bg-surface-container-low border border-outline-variant/20 font-mono text-xs text-on-surface-variant flex flex-col gap-1">
            <span class="text-primary-container font-bold">{{ t('footer.whatsappLine') }}</span>
            <a href="https://wa.me/5491140928873" class="text-on-surface font-semibold flex items-center gap-2">
              <!-- WhatsApp brand glyph (non-Lucide, keep inline) -->
              <svg class="w-4 h-4 text-tertiary shrink-0" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
              {{ t('footer.whatsappNumber') }}
            </a>
          </div>
        </div>
      </div>

      <!-- Bottom Bar -->
      <div class="mt-12 pt-6 border-t border-outline-variant/20 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs text-on-surface-variant">
        <p class="text-on-surface-variant font-medium">{{ t('footer.copyright') }}</p>
        <div class="flex items-center gap-4">
          <span class="text-on-surface-variant">{{ t('footer.nodes') }}</span>
          <span class="text-on-surface-variant font-medium" aria-hidden="true">•</span>
          <span class="text-on-surface-variant font-medium">{{ t('footer.ssl') }}</span>
        </div>
      </div>
    </div>
  </footer>
</template>
