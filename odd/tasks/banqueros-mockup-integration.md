# banqueros.vue — Integración del mockup Stitch (banqueros y cajeros roles)

## Objetivo
Reescribir `app/pages/banqueros.vue` para reproducir las secciones del `<main>` del
mockup `betkit_banqueros_y_cajeros_roles/code.html`, respetando el sistema M3 y
convenciones de index.vue.

## No tocar (scope)
- Header/footer del layout. Solo `<main>`.
- `CommonCtaButton`/`CommonStatBlock` (paleta shadcn): CTAs con tokens M3 directos.

## Decisiones de arquitectura
- **Iconos**: Material Symbols → Lucide.
- **i18n**: `banquerosPage` reescrito en los 3 locales — conserva el copy cliente-orientado
  ya hecho (stats 67/9/Multi/Offline, banker/cashier bullets, países) y agrega las
  secciones nuevas del mockup (hardware, countries grid con badges, dual mockups,
  matriz comparativa, CTA links).
- **Mockup consola banquero**: selector multi-moneda (USD/ARS/VEF/CLP) con ref activo,
  KPI consolidado, tabla de agencias (datos en i18n).
- **Mockup taquilla cajero**: moneda del perfil, slip de apuesta con chips, botones
  (Cobrar e Imprimir / Anular F9) — estáticos como el mockup.
- **Imagen S1 hardware**: URLs efímeras de Google → panel hud-grid + gradiente.
- **Matriz comparativa**: tabla 5 filas (dimensión / banquero / cajero) desde i18n.

## Tareas
- [x] T1. S0 Hero — kicker + H1 + 2 CTAs + microbadge 48hs
- [x] T2. S1 Hardware — kicker + H2 + badge 0.8s + panel imagen + chips
- [x] T3. S2 Metrics — 4 cards (67/9/Multi/Offline) con iconos
- [x] T4. S3 Países — grid 9 cards con bandera + badge (Homologado/Feed/SLA)
- [x] T5. S4 Dual — sinergia + panel banquero (bullets + consola mock) + panel cajero (bullets + taquilla mock)
- [x] T6. S5 Matriz — tabla 5 filas banquero vs cajero
- [x] T7. S6 CTA — pill + H2 + 2 CTAs + 4 links secundarios
- [x] T8. i18n — keys `banquerosPage.*` es/en/pt-BR
- [ ] T9. Verificación — build OK; QA visual pendiente

## Mapeo de iconos Material → Lucide
- `arrow_forward` → `lucide:arrow-right`
- `play_circle` → `lucide:play-circle`
- `verified` → `lucide:badge-check`
- `sports_score` → `lucide:trophy`
- `public` → `lucide:globe`
- `currency_exchange` → `lucide:repeat`
- `wifi_off` → `lucide:wifi-off`
- `check_box` → `lucide:check-square`
- `admin_panel_settings` → `lucide:shield`
- `download` → `lucide:download`
- `bolt` → `lucide:zap`
- `sync_alt` → `lucide:refresh-cw`
- `print` → `lucide:printer`
- `fact_check` → `lucide:clipboard-check`
- `point_of_sale` → `lucide:monitor`
- `chevron_right` → `lucide:chevron-right`

## Progreso
- Script: type completo + activeCurrency ref (selector multi-moneda de la consola)
  + bulletIcons array para los bullets del cajero.
- Template S0-S6 en tokens M3. Quitados CommonCtaButton y CommonStatBlock (paleta shadcn).
- i18n: bloque banquerosPage reescrito en es/en/pt-BR — hero/hardware/stats/countries/
  dual/matrix/closing. Países con bandera + badge de estado (Homologado/Feed Oficial/
  SLA 99.9%).
- Mockups UI: consola ejecutiva del banquero (selector USD/ARS/VEF/CLP + KPI + agencias
  + cierre diario) y taquilla del cajero (moneda del perfil + slip TRIFECTA BOX + botones).
- Imagen S1 hardware: panel hud-grid + gradiente (placeholder).
- Build nuxi build OK en Node 22.22.3 (4.29 MB).