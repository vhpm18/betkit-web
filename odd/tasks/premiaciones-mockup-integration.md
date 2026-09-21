# premiaciones.vue — Integración del mockup Stitch (motor de premios)

## Objetivo
Reescribir `app/pages/features/premiaciones.vue` para reproducir las secciones del
`<main>` del mockup `betkit_motor_de_premios_features_motor_premios/code.html`,
respetando el sistema de diseño M3 y las convenciones de `index.vue` (tokens,
display font Archivo Narrow, iconos Lucide, i18n).

## No tocar (scope)
- Header (`LayoutSiteHeader`) y footer: vienen del layout.
- Descartar `<header>`/`<footer>` del mockup. Solo el `<main>`.
- `CommonCtaSection`/`CommonCtaButton`: CTAs con tokens M3 directos.

## Decisiones de arquitectura
- **Iconos**: Material Symbols → Lucide (convención del proyecto).
- **i18n**: todo el copy pasa a `features.premiaciones` en los 3 locales.
- **Simulador**: `calculatePayout()`, `setPreset()`, `loadTemplate()` del mockup
  (JS vanilla) → Vue `ref`/`computed` reactivos. La lógica de cálculo es idéntica
  (gross = stake × dividend; retención 12%; cap por hipódromo; comisión agencia).
- **loadTemplate()**: los botones de templates cambian track/betType/runners/dividend
  en el simulador y hacen scroll suave al `#simulador`.
- **Chart SVG de auditoría**: se porta (decorativo, con hex del mockup como excepción).
- **Tier runners**: slider muestra "N Caballos"; labels Min/Tier A/Tier B/Max.
- **selects**: `v-model` con option data en i18n (cap por track, factor por modalidad).

## Tareas
- [x] T1. S0 Overview hero — pill + H1 + 2 CTAs + telemetry strip 4 métricas
- [x] T2. S1 Simulador — panel params (selects/slider/inputs/presets/cap) + motor liquidación (trace 5 pasos + payout + comisión)
- [x] T3. S2 Features — 7 pilares (6 cards + 1 spanning)
- [x] T4. S3 Templates — 3 cards + "Cargar en Simulador" (interactivo, scroll a #simulador)
- [x] T5. S4 Auditoría — checklist + SVG chart + 3 stats
- [x] T6. S5 CTA final — 2 CTAs + micro-line
- [x] T7. i18n — keys `features.premiaciones.*` es/en/pt-BR
- [ ] T8. Verificación — build OK; QA visual pendiente

## Mapeo de iconos Material → Lucide
- `play_circle` → `lucide:play-circle`
- `menu_book` → `lucide:book-open`
- `shield` → `lucide:shield`
- `cached` → `lucide:refresh-cw`
- `stadium` → `lucide:landmark`
- `format_list_numbered` → `lucide:list-ordered`
- `functions` → `lucide:sigma`
- `terminal` → `lucide:terminal`
- `copy_all` → `lucide:copy`
- `storefront` → `lucide:store`
- `check` → `lucide:check`
- `lock` → `lucide:lock`
- `verified` → `lucide:badge-check`
- `sync_saved_locally` → `lucide:cloud-download`
- `event` → `lucide:calendar`
- `schema` → `lucide:network`

## Progreso
- Script: type completo + lógica del simulador portada de JS vanilla a Vue computeds:
  RETENTION_RATE 0.12, grossPayout = stake × dividend, retention = gross × 12%,
  cap por hipódromo (data-cap del i18n), comisión agencia = (stake×0.08)+(retention×0.4).
  setPreset() y loadTemplate() (HSI/LRN/MAR con defaults propios) reactivos.
- Template S0-S5 en tokens M3. Quitado CommonCtaSection y la lista features shadcn.
- i18n: bloque features.premiaciones reescrito en es/en/pt-BR (hero/simulator/features/
  templates/audit/cta). Los tracks llevan `cap` numérico y los betTypes `factor` numérico.
- Build nuxi build OK en Node 22.22.3 (4.15 MB).
- SVG chart de auditoría portado (hex del mockup como excepción decorativa).
- loadTemplate hace scroll suave al #simulador vía NuxtLinkLocale href #simulador.