# impresion.vue — Integración del mockup Stitch (impresión de tickets)

## Objetivo
Reescribir `app/pages/features/impresion.vue` para reproducir las secciones del
`<main>` del mockup `betkit_impresi_n_de_tickets_features_impresion_tickets/code.html`,
respetando el sistema de diseño M3 y convenciones de `index.vue`.

## No tocar (scope)
- Header/footer del layout. Solo `<main>`.
- `CommonCtaSection`/`CommonCtaButton`: CTAs con tokens M3 directos.

## Decisiones de arquitectura
- **Iconos**: Material Symbols → Lucide.
- **i18n**: copy a `features.printing` en los 3 locales (bloque actual reemplazado).
- **Simulador**: `setTemplate()`, width switcher y print click del mockup (JS vanilla)
  → Vue refs + computed. Los datos de los 4 templates (track/race/base/combos/total/hash)
  viven en i18n; el cuerpo del boleto se renderiza con v-if por tipo.
- **Ticket térmico**: colores `#f8f7f2`/`#121212` como excepción documentada (papel físico).
- **QR del ticket**: SVG decorativo (como bet-types/multi-sucursal).
- **Diagrama SVG hardware**: se porta (decorativo, hex del mockup).

## Tareas
- [x] T1. S0 Telemetry — DRV_CORE + spooler + SHA-256 + latencia
- [x] T2. S1 Hero — badge + H1 + 2 CTAs + 4 stats telemetry
- [x] T3. S2 Simulador — width switcher + 4 tabs plantillas + ticket render dinámico + panel hardware + print test
- [x] T4. S3 5 Capacidades — 5 MOD cards (último span 2)
- [x] T5. S4 Flujo — 4 pasos + diagrama SVG hardware
- [x] T6. S5 Garantía — 2 CTAs (demo + whatsapp)
- [x] T7. i18n — keys `features.printing.*` es/en/pt-BR
- [ ] T8. Verificación — build OK; QA visual pendiente

## Mapeo de iconos Material → Lucide
- `print` → `lucide:printer`
- `receipt_long` → `lucide:receipt`
- `download_for_offline` → `lucide:download`
- `radio_button_checked` → `lucide:radio`
- `radio_button_unchecked` → `lucide:circle`
- `view_quilt` → `lucide:layout-grid`
- `settings_ethernet` → `lucide:network`
- `autorenew` → `lucide:refresh-cw`
- `qr_code_2` → `lucide:qrcode`
- `admin_panel_settings` → `lucide:shield`
- `bolt` → `lucide:zap`
- `qr_code_scanner` → `lucide:scan-line`
- `sync` → `lucide:refresh-cw`
- `verified` → `lucide:badge-check`
- `verified_user` → `lucide:badge-check`
- `handshake` → `lucide:handshake`
- `chat` → `lucide:message-circle`

## Progreso
- Script: type completo + lógica del simulador de tickets portada de JS vanilla a Vue:
  templateData object con los 4 templates (track/race/type/rows/base/combos/total/hash),
  activeTemplate ref + setTemplate(), ticketWidth ref (58/80mm), activeProfile,
  firePrintTest() con opacity + alert (600ms timeout como el mockup).
- Template S0-S5 en tokens M3. Quitado CommonCtaSection y la lista features shadcn.
- i18n: bloque features.printing reescrito en es/en/pt-BR (telemetry/hero/simulator/
  features/flow/guarantee).
- Ticket térmico: colores #f8f7f2/#121212 como excepción documentada (papel físico).
- Diagrama SVG hardware portado (hex del mockup, decorativo).
- Build nuxi build OK en Node 22.22.3 (4.25 MB).