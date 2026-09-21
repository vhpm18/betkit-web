# demo.vue — Integración del mockup Stitch (solicitar demo)

## Objetivo
Reescribir `app/pages/demo.vue` para reproducir las secciones del `<main>` del
mockup `betkit_solicitar_demo_demo/code.html`, respetando el sistema de diseño M3
y las convenciones de `index.vue` (tokens, display font Archivo Narrow, Lucide, i18n).

## No tocar (scope)
- Header/footer: vienen del layout.
- Descartar `<header>`/`<footer>` del mockup. Solo el `<main>`.
- `CommonCtaButton` (paleta shadcn): CTAs con tokens M3 directos.

## Decisiones de arquitectura
- **Iconos**: Material Symbols → Lucide.
- **i18n**: copy a `demoPage` en los 3 locales (bloque actual se reemplaza).
- **Formulario**: sin backend, feedback inline como el mockup (handleFormSubmit →
  muestra mensaje de sesión registrada). El checkbox térmico se alterna con v-model.
- **Selectores de país**: options con emoji bandera + código (se mantienen como data).
- **Imágenes S3**: URLs efímeras de Google → paneles hud-grid + gradiente (como
  sellers/multi-sucursal) o imágenes locales si existen en public/.
- **Muestra de ticket térmico**: card oscura (no papel físico; es un mock dentro del panel).

## Tareas
- [x] T1. S0 Telemetry bar — WebSocket sandbox + latencia + slot + engine
- [x] T2. S1 Hero — badge + ref + H1 + desc + 2 CTAs
- [x] T3. S2 Workspace — formulario registro (nombre/email/whatsapp país/tipo op/terminales/hipódromos/checkbox térmico) + 4 módulos + ticket sample
- [x] T4. S3 Immersión — kicker + H2 + 2 stats + 2 cards imagen
- [x] T5. S4 B2B trust — 2 pilares + barra hipódromos homologados
- [x] T6. i18n — keys `demoPage.*` es/en/pt-BR
- [ ] T7. Verificación — build OK; QA visual pendiente

## Mapeo de iconos Material → Lucide
- `arrow_downward` → `lucide:arrow-down`
- `arrow_outward` → `lucide:arrow-up-right`
- `badge` → `lucide:badge-check`
- `alternate_email` → `lucide:at-sign`
- `phone_iphone` → `lucide:smartphone`
- `stadium` → `lucide:landmark`
- `terminal` → `lucide:terminal`
- `lock` → `lucide:lock`
- `verified` → `lucide:badge-check`
- `bolt` → `lucide:zap`
- `calculate` → `lucide:calculator`
- `qr_code_scanner` → `lucide:scan-line`
- `shield_person` → `lucide:shield-user`
- `speed` → `lucide:gauge`
- `verified_user` → `lucide:badge-check`
- `public` → `lucide:globe`

## Progreso
- Script: type completo + lógica del formulario (reactive form, validación de campos
  obligatorios, feedback inline reactivo con nombre/código país/whatsapp del usuario).
- Template S0-S4 en tokens M3. Quitado CommonCtaButton y la sección note shadcn.
- i18n: bloque demoPage reescrito en es/en/pt-BR (telemetry/hero/form/includes/
  immersion/trust). Selector de países con emojis bandera en data.
- Build nuxi build OK en Node 22.22.3 (4.19 MB).
- Cards de inmersión: sin imágenes locales aún → paneles hud-grid + gradiente
  (mismo patrón que sellers/multi-sucursal hasta que existan las fotos).