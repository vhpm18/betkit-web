# tipos-de-jugadas.vue — Integración del mockup Stitch (67 tipos de apuesta)

## Objetivo
Reescribir `app/pages/features/tipos-de-jugadas.vue` para reproducir las secciones
del `<main>` del mockup `stitch_betkit_platform_redesign/betkit_67_tipos_de_apuesta_dise_o_limpio/code.html`,
respetando el sistema de diseño M3 (tokens `surface-container-*`, `on-surface`,
`primary-container`, `tertiary`) y convención del proyecto (iconos Lucide, i18n).

## No tocar (scope)
- Header (`LayoutSiteHeader`) y footer: vienen del layout.
- Descartar `<header>` y `<footer>` del mockup. Solo el `<main>`.
- `CommonCtaButton` (paleta shadcn): CTAs se arman directo con tokens M3.

## Decisiones de arquitectura
- **Iconos**: Material Symbols del mockup → Lucide (convención del proyecto).
- **i18n**: todo el copy (hardcodeado en ES en el mockup) pasa a `features.betTypes` en los 3 locales.
- **Display font**: `'Archivo Narrow', 'Archivo', sans-serif` vía `:style` en H1/H2/H3.
- **Wrapper**: el layout ya aplica `pt-20`; mantener consistencia.
- **Interactividad**: el mockup usa JS vanilla (filtros, buscador, simulador de ticket).
  Portarlo a Vue con `ref`/`computed` (reemplaza los `onclick`/`oninput`).
- **Colores del ticket térmico**: el ticket usa `bg-[#faf8f5] text-[#121212]` (papel físico).
  Mantener como excepción documentada: es un asset gráfico de "papel térmico", no un token del sitio.

## Tareas
- [x] T1. S0 Telemetry/status bar — motor determinista + resolución + QR + actualización
- [x] T2. S1 Hero — badge + H1 + buscador + pills de filtro + stats grid 4
- [x] T3. S2 Showcase catálogo — 6 bet-cards + filtros por categoría + buscador
- [x] T4. S3 Banner compliance regulatorio — tablas oficiales + 4 hipódromos
- [x] T5. S4 Simulador de taquilla — terminal interactiva (7 cols) + ticket térmico (5 cols)
- [x] T6. S5 Beneficios banquero — 3 cards (Cero Discrepancia / Topes Riesgo / Buffer Offline)
- [x] T7. S6 CTA final — deploy + 2 botones + telemetry micro-line
- [x] T8. i18n — keys `features.betTypes.*` en es/en/pt-BR + icons Lucide mapeados
- [ ] T9. Verificación — `nuxi typecheck`/build + consistencia visual (build OK; QA visual pendiente)

## Mapeo de iconos Material → Lucide
- `search` → `lucide:search`
- `verified` → `lucide:shield-check`
- `bolt` → `lucide:zap`
- `print` → `lucide:printer`
- `sync` → `lucide:refresh-cw`
- `check` → `lucide:check`
- `check_circle` → `lucide:check-circle`
- `balance` → `lucide:scale`
- `shield` → `lucide:shield`
- `wifi_off` → `lucide:wifi-off`
- `verified_user` → `lucide:badge-check`
- `arrow_forward` → `lucide:arrow-forward`

## Progreso
- Script completo: lógica de filtros (categoría + búsqueda + ESC para limpiar), simulador de ticket
  (tracks, carreras, tipo de jugada con hotkeys, runners, stakes, cálculo de fórmulas y total),
  y botones de emit/printing con estados (emitting/done).
- Template completo S0–S6 en tokens M3. Quitado el componente legado `CommonStatBlock` y
  `CommonCtaSection` (paleta shadcn) — la página ahora es autocontenida con tokens M3.
- i18n: bloque `features.betTypes` reescrito en es/en/pt-BR con estructura completa
  (telemetry, hero, catalog, simulator, banker, deploy, cta).
- Build `nuxi build` OK en Node 22.22.3 (4.03 MB).
- Ticket térmico: se mantiene la excepción documentada de colores `#faf8f5`/`#121212` (papel físico),
  no tokens M3.
