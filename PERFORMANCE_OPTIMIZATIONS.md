# Performance Optimizations - BetKit Nuxt.js Application

## Overview
This document details the performance optimizations implemented for the BetKit Nuxt.js application to improve the performance score from 84/100.

## ✅ Implemented Optimizations

### 1. Compression & Server Tuning
**File**: `nuxt.config.ts`

- **Brotli & Gzip Compression**: Enabled full compression for static and server assets with quality level 11 (highest)
- **Compression Threshold**: Set to 1024 bytes to ensure only compressible assets are compressed
- **Threshold Optimization**: Only compress files larger than 1KB
- **Static Asset Compression**: Enabled for all static assets

```ts
nitro: {
  compressPublicAssets: true,
  compression: {
    enabled: true,
    threshold: 1024,
    algo: 'brotliCompress',
    // ... detailed brotli/gzip options
  },
}
```

### 2. Accessibility Fix
**Files**: `SiteHeader.vue`, `i18n/locales/{es,en,pt-BR}.json`

- **Fixed Accessible Name Mismatch**: The logo link `aria-label` now matches the visible text content
- **Dynamic Translation**: Added `header.logoAriaLabel` translation key in all supported languages

**Before**:
```html
<a href="/" aria-label="BetKit — página principal">...</a>
<!-- Accessible name didn't match visible text -->
```

**After**:
```html
<NuxtLinkLocale to="/" :aria-label="t('header.logoAriaLabel')">
  <span>BETKIT</span>
  <span>OS</span>
  <span>Arquitectura Turf</span>
</NuxtLinkLocale>
```

### 3. Event Listener Optimization
**File**: `plugins/performance.client.ts`

- **Passive Event Listeners**: Added `{ passive: true }` to scroll-related event listeners
- **DOM Batching**: Created batched DOM operation utilities to prevent layout thrashing
- **Memory Management**: Proper cleanup of event listeners on component unmount

### 4. CSS Optimization
**Files**: `tailwind.config.ts`, `app/assets/css/critical.css`

- **JIT Mode**: Enabled just-in-time mode for minimal CSS output
- **Utility Reduction**: Removed unused Tailwind plugins
- **Critical CSS File**: Created `critical.css` for above-the-fold styles
- **Font Optimization**: Added `display: 'swap'` for font loading

### 5. Animation Performance
**File**: `SiteHeader.vue`

- **Transition Optimization**: Added `duration-150` to smooth transitions
- **Faster Animations**: Reduced animation durations from default to 150ms
- **Added `will-change`**: CSS properties optimized for GPU acceleration

### 6. Layout Optimization
**File**: `layouts/default.vue`

- **Flexbox Fixes**: Added `flex-1` to main content for proper layout
- **Font Anti-aliasing**: Optimized font rendering for performance
- **Will-change Property**: Added for sticky header animations

## 📊 Expected Performance Improvements

| Metric | Before | Target | Notes |
|--------|--------|--------|-------|
| Performance Score | 84 | 90+ | +6-10 points |
| TBT | 290ms | <200ms | Reduced blocking time |
| Main-thread Work | 2.3s | <2.0s | Optimized JS execution |
| CSS Size | ~200ms | Reduced | Critical CSS inlined |
| Unused JS | 107.3kB | Reduced | Code splitting |

## 🔧 Build Optimization Recommendations

### 1. Code Splitting (To be implemented)
Consider adding dynamic imports for heavy components:

```ts
// Example: Lazy load heavy components
const FeaturesMenu = defineAsyncComponent(() => 
  import('../components/features/FeaturesMenu.vue')
)
```

### 2. Bundle Analysis
Run bundle analyzer to identify unused code:

```bash
npm install --save-dev @nuxt/bundle-analyzer
# Add to nuxt.config.ts
```

### 3. Image Optimization
Consider adding nuxt-image for automatic image optimization:

```bash
npm install @nuxt/image
```

## 🚀 Deployment Recommendations

1. **Enable HTTP/2**: Ensure server supports HTTP/2 for multiplexing
2. **CDN**: Use CDN for static asset delivery
3. **Font Optimization**: Preload critical fonts:
   ```html
   <link rel="preload" href="/fonts/archivo-narrow.woff2" as="font" type="font/woff2" crossorigin>
   ```

## 📝 Files Modified

1. `nuxt.config.ts` - Server compression, build optimization
2. `app/components/layout/SiteHeader.vue` - Accessibility, event optimization
3. `app/layouts/default.vue` - Layout improvements, critical styles
4. `tailwind.config.ts` - JIT mode, utility reduction
5. `i18n/locales/es.json` - Added `header.logoAriaLabel`
6. `i18n/locales/en.json` - Added `header.logoAriaLabel`
7. `i18n/locales/pt-BR.json` - Added `header.logoAriaLabel`
8. `app/plugins/performance.client.ts` - New performance plugin (created)
9. `app/assets/css/critical.css` - Critical CSS (created)

## 🔄 Next Steps

1. Run production build: `npm run build`
2. Analyze bundle with bundle-analyzer
3. Test performance with Lighthouse
4. Monitor Web Vitals in production
5. Consider implementing `next-themes` for theme switching optimization