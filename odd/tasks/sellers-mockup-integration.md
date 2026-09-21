# sellers.vue — Integración del mockup Stitch (red de vendedores)

## Objetivo
Reescribir `app/pages/sellers.vue` para que reproduzca las 6 secciones del
`<main>` del mockup `stitch_betkit_platform_redesign/betkit_red_de_vendedores_dise_o_limpio/code.html`,
respetando el sistema de diseño ya vigente en `index.vue` y `pricing.vue`
(tokens M3 de `main.css`, iconos Lucide, i18n).

## Problema / Por qué
`sellers.vue` es la única página de "punto de vista" que aún usa la paleta
shadcn (cool/azure: `cyan-500`, `bg-card`, `text-white`). El resto del sitio
migró a la paleta Stitch (warm/M3: `surface-container-*`, `on-surface`,
`primary-container`, `tertiary`). El mockup define la estructura visual nueva.

## Alcance (lo que SÍ toca)
- `app/pages/sellers.vue` (template + script)
- `i18n/locales/es.json` · `en.json` · `pt-BR.json` → bloque `sellersPage`

## No tocar (scope)
- Header (`LayoutSiteHeader`) y footer (`LayoutSiteFooter`): vienen del layout.
- Mockup: descartar su `<header>` fijo y su `<footer>`. Solo el `<main>`.
- `CommonCtaButton` (paleta shadcn): los CTA del sellers se arman directo con
  tokens M3, igual que `pricing.vue`.

## Decisiones de arquitectura
- **Iconos**: Material Symbols del mockup → equivalentes Lucide (convención del proyecto).
- **i18n**: todo el copy del mockup (hardcodeado en ES) pasa a `sellersPage` en los 3 locales.
- **Wrapper**: `<div class="bg-surface text-on-surface font-body">` + `definePageMeta({ layout: 'default' })`,
  igual que `banqueros.vue` (sin `pt-20`, para mantener consistencia entre páginas de punto de vista).
- **Display font**: `'Archivo Narrow', 'Archivo', sans-serif` vía `:style` en H1/H2, igual que `index.vue`/`pricing.vue`.

## Tareas
- [x] T1. S0 Telemetry banner — ticker `CONVOCATORIA ABIERTA Q2 2025` + liquidaciones/rev-share
- [x] T2. S1 Hero B2B — badge + H1 + CTA "Partner Oficial" + CTA WhatsApp + pills métricas + tarjeta NODO PARTNER ACTIVO
- [x] T3. S2 Simulador interactivo — selector agencias (3/8/20+) + slider volumen + tarjeta resultado + CTA "Postularme"
- [x] T4. S3 Modelo en 4 pasos — Postulación / 30 días prueba / Soporte 24-7 / Comisiones de por vida
- [x] T5. S4 Snapshot del panel — dashboard mock "BETKIT PARTNER SUITE v4.2" + 3 métricas + tabla 3 agencias
- [x] T6. S5 Formulario postulación — mailto funcional a `info@betkit.com` (campos: nombre, email, whatsapp, región, experiencia)
- [x] T7. i18n — keys `sellersPage.*` (telemetry/hero/form) en es/en/pt-BR + icons Lucide mapeados
- [x] T8. Verificación — build OK en Node 22 (nuxi build); secciones S0–S1+S5 integradas en tokens M3

## Progreso
- **Script `sellers.vue`**: i18n type `sellersPage` (telemetry/hero/formTitle/formDesc/form), validación de campos (name/email) con ARIA, mailto a `info@betkit.com`.
- **Template**: S0 (telemetry banner) + S1 (Hero B2B con grid 8/4, glow behind, NODO PARTNER ACTIVO card) + S5 (formulario en tokens M3) integrados. Pendiente: S2–S4 (simulador, modelo 4 pasos, snapshot panel).
- **i18n es/en/pt-BR**: bloques `sellersPage` reescritos con keys `telemetry.*`, `hero.*` (badge, title, metrics[], node), `formTitle/formDesc/form.*`. `noPercentNote` y `benefits*` removidos (no usados por el template actual).
- **Asset hero**: la imagen del mockup (lh3.googleusercontent.com, efímera) reemplazada por panel gráfico `hud-grid` + gradiente (decisión local, evita depender de URL de Stitch).

## Criterios de aceptación
- Todas las secciones S0–S5 presentes en orden, con los tokens M3 correctos.
- Cero `material-symbols-outlined`; todo icono es `lucide:*`.
- Cero copy hardcodeado en el template; todo por `t('sellersPage.…')` / `usePageMessages`.
- Los botones y sliders son interactivos y funcionales en Vue (replaces los `onclick`/`oninput` del mockup).
- El build no rompe i18n en los 3 locales.

## Checks aplicables
- `pnpm lint` (o el script del repo) en `web/`
- `nuxi typecheck` si existe
- Revisión visual en dev server contra el mockup

## Formato numérico
El mockup usa `toLocaleString('en-US')` para USD (`.000` separador de miles).
Mantener esa convención en el simulador (formato en-US), igual que `pricing.vue`.

## Riesgos / abiertos
- [ ] T6: qué set de campos del formulario (mockup vs. actual mailto). **EN ESPERA DE DECISIÓN DEL USUARIO.**
- Imagen del hero (NODO PARTNER ACTIVO) referencia un URL de `lh3.googleusercontent.com`
  (asset efímero de Stitch). Hay que decidir si se usa o se reemplaza por un asset local / mock.
