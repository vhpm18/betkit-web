# BetKit — Sitio Web de Marketing
## Plan de Implementación paso a paso

> **Objetivo:** implementar el sitio web de marketing B2B de **BetKit** en `betkit/web/` (Nuxt 4), enfocado desde **dos puntos de vista**: (1) **Banqueros y Cashiers** (el negocio en acción — el núcleo de conversión) y (2) **Sellers** (el canal de venta). Look Binance (negro/amarillo/blanco), 3 idiomas (es/en/pt-BR), accesible WCAG 2.1. Sin sobrecargar: cada página comunica un mensaje claro.

---

## Fase 0 — Preparación y bloqueantes previos

- [ ] **0.1** Resolver duplicación de locales: verificar cuál carpeta (`app/locales/` vs `i18n/locales/`) lee `@nuxtjs/i18n` (revisar `nuxt.config.ts` y la configuración real del módulo). Eliminar la duplicada y consolidar claves.
- [ ] **0.2** Corregir el número de tipos de apuesta a **60** (verificado en `api.betkit/app/Enums/BetTypesEnum.php` — 60 cases). El `content-base.md` dice 67 pero es incorrecto; la web debe usar 60.
- [ ] **0.3** Decidir el estado de la página `/demo`: o crear cuentas demo reales, o cambiar el copy a "solicitá una demo" (no prometer credenciales que no existen).
- [ ] **0.4** Confirmar con el negocio: no publicar % de comisión ni mecánica de márgenes. Etiquetar WhatsApp y Pollas como **PRÓXIMAMENTE**.
- [ ] **0.5** Guardar contexto: `mem_save` con la decisión de diseño, paleta y sitemap para recuperación entre sesiones.

---

## Fase 1 — Infraestructura de componentes compartidos

> Sin esto, cada página se autopista. Es la base de todo lo demás.

- [ ] **1.1** Crear `app/layouts/default.vue` — layout global con header + footer + zona de contenido, con `<NuxtLink>` para i18n y `useLocaleHead()`.
- [ ] **1.2** Crear `app/components/layout/SiteHeader.vue` — nav sticky con: logo BetKit, dropdown **Funciones**, enlaces Precios/Demo/Vendedores, switch de idioma (es/en/pt-BR), CTA "Prueba gratis" (amarillo `#FFC71A`).
- [ ] **1.3** Crear `app/components/layout/SiteFooter.vue` — footer con columnas (Producto, Recursos, Legal), enlaces de idioma, marca BetKit Turf OS.
- [ ] **1.4** Crear `app/components/layout/LanguageSwitcher.vue` — switch de idioma usando `useLocalePath()` y `useSwitchLocalePath()`.
- [ ] **1.5** Crear `app/components/common/` — componentes reutilizables: `CtaButton.vue` (primario amarillo / secundario outline), `SectionTitle.vue`, `StatBlock.vue`, `MarqueeTicker.vue` (si aplica), `FeatureCard.vue`, `AudienceCard.vue`.
- [ ] **1.6** Unificar estilos: reemplazar `bg-[#0D0E12]`, `border-[#262936]`, etc. hardcodeados por tokens semánticos (`bg-dark-900`, `border-dark-*`, `text-brand-yellow`).
- [ ] **1.7** Verificar: `pnpm typecheck` y `pnpm lint` en `betkit/web/`.

---

## Fase 2 — Home (página principal, foco de conversión)

- [ ] **2.1** Revisar `index.vue` existente (623 líneas) y asegurar que use el layout compartido y tokens semánticos.
- [ ] **2.2** Secciones del hero (en orden):
  1. **Hero** — H1 "Gestiona tu Vende Paga con la plataforma más completa del mercado" + subheadline + CTA primario "Probá gratis 30 días" + CTA secundario "Ver demo en vivo". Ticker/marquee en vivo con datos (opcional, ya existe).
  2. **Stat blocks** — 60 tipos de apuesta / 24 módulos DDD / 739 componentes / 86 tests / 12.8:1 contraste AAA.
  3. **Split de los dos puntos de vista** — 2 tarjetas grandes: **Banqueros + Cashiers** (núcleo, destacada, link a `/banqueros`) y **Sellers** (canal, link a `/sellers`). Cada una con su mensaje clave.
  4. **Features core (grid)** — 6 cards: multi-sucursal, multi-moneda, motor de premiaciones, 60 tipos, tiempo real, impresión QR. Con CTA a cada página de feature.
  5. **Cierre emocional** — "Tus números en tiempo real. Sin Excel." + CTA repetido.
- [ ] **2.3** Asegurar accesibilidad en hero: simulador de terminal como `role="region"` + `aria-label`, focus rings, contraste.
- [ ] **2.4** Verificar: `pnpm typecheck`, `pnpm lint`.

---

## Fase 3 — Páginas de Features

> Cada feature tiene su página. Ampliar las esqueletas existentes (33 líneas) con el contenido del `content-base.md`. No sobrecargar: mensaje claro + 3-5 bullets + 1 stat + CTA.

- [ ] **3.1** `features/index.vue` — índice con cards de todas las funciones + CTA.
- [ ] **3.2** `features/multi-sucursal.vue` — gestión multi-sucursal (CRUD, asignación de personal, config independiente, QR por sucursal).
- [ ] **3.3** `features/premiaciones.vue` — motor de premiaciones (reglas por hipódromo, agrupación por competidores, FIXED/SUM, topes, simulador, plantillas).
- [ ] **3.4** `features/tipos-de-jugadas.vue` — mostrar los **60 tipos** reales (verificados en `BetTypesEnum.php`). Estructura: categorías (Básicas / Exóticas / Multi-carrera / Modificadores) con stat blocks. NO volcar los 60 en una tabla gigante.
- [ ] **3.5** `features/impresion.vue` — impresión térmica (4 plantillas, Epson/Star, 58/80mm, QR de verificación pública).
- [ ] **3.6** `features/whatsapp.vue` — apuestas por WhatsApp (etiqueta **PRÓXIMAMENTE**). IA conversacional, sin app, 75% penetración LATAM.
- [ ] **3.7** `features/pollas.vue` — pollas hípicas (etiqueta **PRÓXIMAMENTE**). Especiales/Nacionales/Combinadas, pozos.
- [ ] **3.8** `features/dashboard-roles.vue` — dashboard y métricas por rol (banquero/cajero/vendedor), reportes Excel/PDF por email.
- [ ] **3.9** `features/recargas-retiros.vue` — recargas (5 métodos, acreditación instantánea) y retiros (aprobación segura).
- [ ] **3.10** Añadir página de **plataformas** (Web + Electron) y **roles/jerarquía** (si no existe) — o integrarlas en una página de roles.
- [ ] **3.11** Verificar: `pnpm typecheck`, `pnpm lint`, accesibilidad de cada página (semántica, focus, contraste, aria).

---

## Fase 4 — Páginas de conversión

- [ ] **4.1** `banqueros.vue` — **Landing del Punto de vista 1 (Banquero + Cashier, el NÚCLEO)**. Hero "Pagás solo cuando facturás" + stats + beneficios para el banquero (control total, 60 tipos, motor de premiaciones, dashboard) + beneficios para el cashier (velocidad, tiempo real, impresión QR, offline) + CTA. Esta es la página de conversión principal.
- [ ] **4.2** `sellers.vue` — **Landing del Punto de vista 2 (Sellers, el CANAL)**. Comisión recurrente por agencia activa, panel propio, referidos en cascada, soporte incluido. Formulario de postulación con `label for`↔`input id`, `aria-required`. **Sin % exacto de comisión.** (Renombrar/evolucionar la actual `vendedores.vue`.)
- [ ] **4.3** `pricing.vue` — modelo por transacción, **sin mensualidad**. Destacar "pagás solo cuando facturás" + "primer mes gratis". Si existe, revisar el simulador de rentabilidad (accesible, `aria-live`).
- [ ] **4.4** `demo.vue` — demo en vivo. Según decisión 0.3: credenciales reales o "solicitá una demo".
- [ ] **4.5** `contacto.vue` — formulario de contacto accesible.
- [ ] **4.6** `blog.vue` y `links.vue` — revisar y alinear con el nuevo sitemap.
- [ ] **4.7** `software-para-vende-pagas.vue` — página categoría para cluster SEO (orientada a banqueros).
- [ ] **4.8** Verificar: `pnpm typecheck`, `pnpm lint`.

---

## Fase 5 — i18n (3 idiomas) — transversal

> El contenido fuente está en español. `en` y `pt-BR` son traducciones reales (no automáticas). Este paso corre en paralelo a las fases 2-4.

- [ ] **5.1** Resolver duplicación de locales (0.1) — fuente única.
- [ ] **5.2** Definir estructura de claves i18n: `common`, `home`, `features`, `banqueros`, `sellers`, `pricing`, `demo`, `contacto`, `footer`.
- [ ] **5.3** Traducir y completar `es.json`, `en.json`, `pt-BR.json` con **cobertura paralela** (mismas claves en los 3).
- [ ] **5.4** Verificar que no queden strings hardcodeados en los `.vue` (todo por i18n, salvo variables/código).
- [ ] **5.5** Revisar los mockups en español (`code.html`) y traducir el copy clave.
- [ ] **5.6** Verificar detección de idioma por cookie y rutas con prefijo (`/en/`, `/pt-br/`).

---

## Fase 6 — Accesibilidad (transversal, obligatoria)

> El design system ya pasó auditoría WCAG 2.1 A/AA/AAA. Respetar en todo componente nuevo.

- [ ] **6.1** Contraste: amarillo `#FFC71A` + texto `#0A0A0A` = 12.8:1. Textos atenuados ≥ 4.5:1 (usar `#A1A1AA`/`#94A3B8`, no `#555`).
- [ ] **6.2** Foco visible: `focus-visible:ring-2 focus-visible:ring-[#FFC71A]` en todos los interactivos.
- [ ] **6.3** Semántica: `h1`–`h3`, `button`, `label for`↔`input id`, `role="tab"`/`tablist`, `aria-expanded`, `aria-selected`, `aria-controls`.
- [ ] **6.4** Estado no solo por color (daltonismo): texto junto a luces verde/roja.
- [ ] **6.5** Gráficos SVG: `role="img"` + `aria-label` + `.sr-only`.
- [ ] **6.6** Dinamismo: `aria-live="polite"` en simuladores/calculadoras.
- [ ] **6.7** Verificar con la auditoría de referencia (`...actualizado.md`) que cada pantalla cumple.

---

## Fase 7 — Verificación y QA

- [ ] **7.1** `pnpm typecheck` — sin errores TS.
- [ ] **7.2** `pnpm lint` — sin errores ESLint (config Antfu).
- [ ] **7.3** `pnpm build` — build de producción OK.
- [ ] **7.4** Revisar la home en desktop (1280px+), tablet (768-1279) y mobile (<768): layout responsive, sticky header, menu.
- [ ] **7.5** Probar los 3 idiomas en las rutas `/`, `/en/`, `/pt-br/` — switch de idioma funciona.
- [ ] **7.6** Revisar accesibilidad con la lista de la Fase 6.
- [ ] **7.7** Verificar SEO: `@nuxtjs/seo` (sitemap, robots, meta, og-image si se habilita). `public/llms.txt` y `_robots.txt`.
- [ ] **7.8** Revisar que el copy no prometa features "en desarrollo" como disponibles.

---

## Fase 8 — Prueba de contenido (copy) y afinado

- [ ] **8.1** Revisar que cada página comunique un mensaje, no un volcado. Quitar features irrelevantes para la audiencia.
- [ ] **8.2** Reforzar el **Punto de vista 1 (Banqueros + Cashiers)**: hero + features core + ROI + CTA repetido. Es el núcleo de conversión.
- [ ] **8.3** Reforzar el **Punto de vista 2 (Sellers)**: comisión recurrente, panel propio, referidos en cascada. El "segundo producto" del site.
- [ ] **8.4** Usar las frases de venta del content-base (stat blocks, "pagás solo cuando facturás", etc.) y los copys del marketing kit.
- [ ] **8.5** Revisar contra los mockups `code.html` de referencia (home, tipos, precios, vendedores, dashboard) para alinear el diseño.

---

## Fase 9 — Entrega y publicación (under repository policy)

> Los gates de commit/push/PR son informativos y no gestionados por SDD. La política del repositorio decide la entrega.

- [ ] **9.1** Verificar el diff con `git status`, `git diff` y `git log --oneline -10`.
- [ ] **9.2** Commit por unidad de trabajo (work-unit commits), convencional (sin atribución AI).
- [ ] **9.3** Considerar `size:exception` o PRs encadenados si el cambio supera 400 líneas (review workload guard).
- [ ] **9.4** Notificar al equipo: paleta binance aplicada, 3 idiomas, accesibilidad cumplida, sitemap completo.

---

## Orden recomendado de trabajo

```
0 (bloqueantes) → 1 (componentes) → 2 (home) → 3 (features)
→ 4 (conversión) → [5 y 6 en paralelo a 2-4] → 7 (QA) → 8 (copy) → 9 (entrega)
```

## Comandos de verificación

```bash
cd betkit/web
pnpm typecheck
pnpm lint
pnpm build
```

## Notas
- Este es un cambio de **marketing web**, no de software de apuestas. No se toca el backend.
- El design system y los tokens ya existen y son el look Binance → no rehacer, solo unificar.
- El contenido se sintetiza, no se copia completo. Web sin sobrecargar.
- Revisar periódicamente el `content-base.md` para mantener el copy alineado.
