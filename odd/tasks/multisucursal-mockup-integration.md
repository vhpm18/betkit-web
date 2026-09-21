# multi-sucursal.vue — Integración del mockup Stitch (multi sucursal)

## Objetivo
Reescribir `app/pages/features/multi-sucursal.vue` para reproducir las secciones del
`<main>` del mockup `betkit_multi_sucursal_features_multi_sucursal/code.html`,
respetando el sistema de diseño M3 y convención del proyecto (iconos Lucide, i18n).

## No tocar (scope)
- Header (`LayoutSiteHeader`) y footer: vienen del layout.
- Descartar `<header>` y `<footer>` del mockup. Solo el `<main>`.
- `CommonCtaButton`/`CommonCtaSection` (paleta shadcn): CTAs se arman con tokens M3.

## Decisiones de arquitectura
- **Iconos**: Material Symbols → Lucide.
- **i18n**: todo el copy pasa a `features.multiSucursal` en los 3 locales.
- **Interactividad**: `selectBranch()` del mockup (branchData) → Vue `ref(selectedBranch)`
  + computeds que leen el objeto de la sede seleccionada.
- **Topología SVG del hero**: se porta el SVG tal cual (decorativo, con tokens M3 en
  strokes/fills). Es la excepción documentada igual que el ticket térmico/QR.
- **Imágenes de showcase**: URLs efímeras de Google → paneles `hud-grid` + gradiente.

## Tareas
- [x] T1. S0 Protocol bar — multi-tenant / latencia / regla fiscal / nodos
- [x] T2. S1 Hero — badge + H1 + CTAs + métricas + visual topología (SVG + 4 nodos + telemetry)
- [x] T3. S2 Pilares — 4 cards MOD_01-04 con footer spec
- [x] T4. S3 Switcher interactivo — selector 4 sedes + panel telemetría + QR + specs (branchData)
- [x] T5. S4 Canal vendedores — 3 puntos + CTA /sellers + mini simulador
- [x] T6. S5 Showcase — 2 cards imagen (hud-grid + badge)
- [x] T7. S6 CTA final — kicker + H2 + desc + CTA demo
- [x] T8. i18n — keys `features.multiSucursal.*` es/en/pt-BR
- [ ] T9. Verificación — build OK; QA visual pendiente

## Mapeo de iconos Material → Lucide
- `lan` → `lucide:network`
- `swap_horiz` → `lucide:arrow-left-right`
- `arrow_forward` → `lucide:arrow-right`
- `domain_add` → `lucide:building-2`
- `badge` → `lucide:badge-check`
- `tune` → `lucide:sliders-horizontal`
- `qr_code_2` → `lucide:qrcode`
- `toggle_on` → `lucide:toggle-right`
- `verified_user` → `lucide:badge-check`
- `chevron_right` → `lucide:chevron-right`
- `security` → `lucide:shield-check`
- `groups` → `lucide:users`
- `settings` → `lucide:settings`
- `rocket_launch` → `lucide:rocket`
- `hub` → `lucide:hub`

## Progreso
- Script: type completo + lógica del switcher (selectedBranchIndex + activeBranch/activeBranchData computeds + selectBranch()).
  nodePositions array fijo para las 4 cards de nodos del visual de topología.
- Template S0-S6 en tokens M3. Quitado `CommonCtaSection` y la card shadcn de canal
  (cyan-500) — ahora es la sección S4 completa del mockup con mini simulador.
- i18n: bloque `features.multiSucursal` reescrito en es/en/pt-BR (telemetry/hero/pillars/
  switcher/channel/showcase/closing). `features.*` y `channelTitle/channelDesc` viejos removidos.
- Build `nuxi build` OK en Node 22.22.3 (4.09 MB).
- Visual de topología: SVG portado (radar rings + beams) + cards de nodos estáticas con
  posiciones fijas (top-left/top-right/bottom-left/bottom-right).
- Showcase: imágenes efímeras de Google reemplazadas por paneles hud-grid + gradiente.