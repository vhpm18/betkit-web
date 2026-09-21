# BetKit — Sitio Web de Marketing
## Documento de síntesis y estructuración del site

> **Objetivo:** sintetizar el contenido de la plataforma **BetKit** para construir un sitio web B2B **preciso y que enganche al cliente**, enfocado desde **dos puntos de vista**:
> - **Punto de vista 1 — Banqueros y Cashiers** (el negocio en acción).
> - **Punto de vista 2 — Sellers** (el canal de venta).
>
> Estilo visual inspirado en **Binance** (negro profundo, amarillo, blanco). Trilingüe: **español, inglés y portugués (BR)**. Sitio **sin sobrecargar**: cada mensaje es claro, directo y orientado a conversión.

---

## 1. Los dos puntos de vista (audiencias)

> **Regla de oro del copy:** cada sección le habla a UNA persona concreta, en su idioma, sobre SU dolor. No es "features del sistema" — es "esto es lo que ganás vos".

### Punto de vista 1 — Banqueros y Cashiers (el núcleo del negocio)

#### 1.1.1 Banquero — el dueño de la Vende Paga (DECIDE y compra)

**Quién es:** propietario/operador de una o varias agencias de apuestas hípicas (Vende Pagas). Es quien decide si el sistema entra a su negocio. Su decisión es **de inversión y control**.

**Su dolor (el que lo hace perder plata hoy):**
- No sabe cuánto ganó hoy, cuánto pagó en premios, ni qué sucursal rinde.
- Gestiona en papel / Excel — sin visibilidad de caja por local.
- Premios mal calculados, sin control de topes ni de riesgo.
- Siente que cada sucursal es un mundo aparte y no las puede ver juntas.

**Mensajes de venta (en orden de fuerza):**
1. **"Pagás solo cuando facturás"** — Sin mensualidad fija. Comisión por transacción. Primer mes gratis. *(El argumento de cierre: reduce el riesgo de invertir.)*
2. **Control total de tu red** — Multi-sucursal + multi-moneda desde una sola cuenta. Cada agencia con sus cajeros, moneda y reglas.
3. **Motor de premiaciones configurable** — Reglas por hipódromo y cantidad de competidores, cálculo fijo/acumulativo, topes por grupo, simulador en vivo, plantillas reutilizables.
4. **60 tipos de apuesta** — La variedad más completa del mercado. Tu cliente no se va por falta de opciones. *(Verificado en `BetTypesEnum.php` — el backend tiene 60 cases.)*
5. **Tus números en tiempo real** — Dashboard por sucursal, ranking de cajeros, alertas de exposición, comisiones. Sin Excel. Sin esperar el cierre del mes.

**Stats que respaldan (elegir 4-6):**
| Dato | Número |
|---|---|
| Tipos de apuesta | **60** (verificado en BetTypesEnum.php) |
| Módulos DDD | 24 |
| Componentes UI | 739 |
| Tests del motor de cálculo | 86 |
| Contraste WCAG AAA | **12.8:1** (amarillo/negro) |
| Soporte | Español nativo + bilingüe |

#### 1.1.2 Cashier — el que atiende la Vende Paga (USA a diario)

**Quién es:** la persona que atiende el local y vende apuestas a los clientes. Es el que toca el sistema todos los días. Su decisión no es comprar, pero **su experiencia es la que retiene al banquero** — un cashier que no puede trabajar rápido empuja al dueño a buscar otra cosa.

**Su dolor (el que lo hace lento y le genera errores):**
- Taquilla lenta con clientes haciendo fila.
- Tickets falsificados o difíciles de verificar.
- Cortes de internet que lo dejan sin vender.
- Cierre de turno a mano, con calculadora y papel.

**Mensajes de venta:**
1. **Vende en segundos** — Flujo unificado: pista → carrera → tipo → estilo → competidores → monto → preview → confirmar.
2. **Datos en tiempo real** — Cuotas, estados de carrera (MTP) y resultados por WebSocket. Sin recargar la pantalla.
3. **Impresión térmica con QR** — Tickets profesionales y verificables. Epson/Star, 58/80mm, 4 plantillas.
4. **Sigue vendiendo sin internet** — Contingencia offline / satelital. La taquilla no se detiene.
5. **Cierra turno con un botón** — Resumen automático, sin calculadora ni errores.

> **Por qué venderlos juntos:** el banquero compra, el cashier opera. La web le habla al banquero para que **compre**, y le muestra al cashier para que el banquero **vea que su equipo va a estar cómodo**. Juntos forman el núcleo del negocio.

---

### Punto de vista 2 — Sellers (el canal de venta)

**Quién es:** el vendedor / distribuidor del sistema. Recluta agencias (Vende Pagas) para que operen con BetKit. Es un socio comercial, no un operador.

**Su dolor (el que lo frena):**
- Ingresos variables, sin modelo recurrente.
- No sabe cuánto va a ganar por cada agencia que suma.
- Sin herramientas para gestionar su red ni sus referidos.

**Mensajes de venta:**
1. **Comisión recurrente por cada agencia activa** — Ingreso predecible que crece con tu red.
2. **Panel propio de Seller** — Banqueros, comisiones, pagos, referidos y reportes, todo en un lugar.
3. **Referidos en cascada** — Cada agencia que sumás genera ingresos adicionales.
4. **Soporte incluido** — El sistema te acompaña en el reclutamiento y la gestión.

> **⚠️ Restricción comercial:** NO publicar el % exacto de comisión ni la mecánica de márgenes. Solo **"comisión por transacción"** / **"comisión recurrente"**.

> **Por qué es el segundo punto de vista:** los Sellers son el **canal de crecimiento**. No operan apuestas, pero hacen crecer la red de BetKit. La web los convierte en el "segundo producto": si sos vendedor, BetKit te da ingresos recurrentes.

---

## 2. Estructura del site (sitemap)

> **Principio de navegación (estilo Binance):** pocas opciones, claras, con CTA siempre visible. El header solo lleva a lo esencial.

```
/                            → Home
│                             (hero que engancha + ticker en vivo + stats + 2 puntos de vista + CTA)
│
├── /banqueros                → Landing Punto de vista 1 (Banquero + Cashier)   [NÚCLEO]
│   ├── /features/multi-sucursal      → Control multi-sucursal
│   ├── /features/premiaciones        → Motor de premiaciones
│   ├── /features/tipos-de-jugadas    → 60 tipos de apuesta
│   ├── /features/impresion           → Impresión térmica + QR (para el cashier)
│   ├── /features/dashboard-roles     → Dashboard y métricas por rol
│   └── /features/recargas-retiros    → Recargas y retiros
│
├── /sellers                 → Landing Punto de vista 2 (Sellers)                [CANAL]
│   ├── /features/whatsapp            → Apuestas por WhatsApp (PRÓXIMAMENTE)
│   └── /features/pollas              → Pollas hípicas (PRÓXIMAMENTE)
│
├── /pricing                 → Modelo por transacción (sin mensualidad)
├── /demo                    → Demo en vivo
├── /contacto                → Contacto
└── /blog                    → Blog / noticias
```

**Qué NO debe ir en la web (para no sobrecargar):**
- Tablas enormes de los 60 tipos (solo resumen en stat blocks + categorías).
- Mecánica interna de comisiones/márgenes.
- Certificaciones o renders 3D que no existen (el design system lo prohíbe).
- Prometer como disponibles features "en desarrollo" (WhatsApp, Pollas) → etiquetar **PRÓXIMAMENTE**.

---

## 3. Design system (look Binance)

### 3.1 Paleta base (reutilizar la existente — NO rehacer)
Los tokens ya están implementados en `betkit/web/app/assets/css/main.css` (`@theme inline`) y son prácticamente idénticos al look Binance. Mantenerlos, unificar hardcoded hacia tokens semánticos.

| Token | Valor | Uso |
|---|---|---|
| `--color-dark-950` | `#090A0D` | Fondo profundo (casi negro) |
| `--color-dark-900` | `#0D0E12` | Superficie principal |
| `--color-brand-yellow` | `#FFC71A` | **Amarillo reservado** para CTA, alertas en vivo, estados y bordes críticos |
| `--color-brand-hover` | `#E5B215` | Hover del amarillo |
| Texto base | `#FCFAF5` | Blanco cálido (newsprint) |
| Texto atenuado | `#A1A1AA` / `#94A3B8` | Metadatos secundarios (contraste ≥ 4.5:1) |

**Regla dorada (90/10):** el negro domina >90%; el amarillo es escaso y de alto impacto. **El amarillo NUNCA en texto largo** — solo CTA/bordes/estados.

### 3.2 Tipografía
- **Display / títulos:** Archivo Narrow, Bold 700, condensada, line-height < 1.0.
- **Cuerpo / lectura:** Source Sans 3, Regular 400 / Semi-Bold 600, base 19px.
- **Datos / métricas / tickers:** JetBrains Mono, 11-13px, mayúsculas, tracking 0.1em.

### 3.3 Forma y profundidad
- **Forma Sharp (0px)** — bordes rectos en todo. Sin radio.
- **Elevación por tono, no por sombra** — tarjetas `#141416` con borde hairline 1px `#2A2A2E`. Modales `#1A1A1E` con borde 1px `#FFC71A`.
- **Sin blur, sin drop shadows** — jerarquía por capas tonales y contornos de bajo contraste.

### 3.4 Accesibilidad (obligatoria — ya auditada)
El design system pasó auditoría WCAG 2.1 A/AA/AAA. Requisitos a respetar en todo componente nuevo:
- **Contraste:** amarillo `#FFC71A` + texto `#0A0A0A` = 12.8:1 (AAA). Textos atenuados ≥ 4.5:1.
- **Foco visible:** `focus-visible:ring-2 focus-visible:ring-[#FFC71A] focus-visible:ring-offset-2 focus-visible:ring-offset-[#131313]`.
- **Semántica:** `<h1>`–`<h3>`, `<label for>`↔`<input id>`, `<button>`, `role="tab"`/`role="tablist"`, `aria-expanded`, `aria-selected`.
- **Estado no solo por color:** incluir texto junto a luces verde/roja (daltonismo).
- **Gráficos SVG:** `role="img"` + `aria-label` + texto `.sr-only`.
- **Dinamismo:** `aria-live="polite"` en calculadoras/simuladores.

---

## 4. Estrategia i18n (3 idiomas)

- **Config ya presente** en `nuxt.config.ts`: locales `es`, `en`, `pt-BR`, default `es`, `strategy: prefix_except_default`, detección por cookie.
- **Idioma fuente:** español (mercado principal). `en` y `pt-BR` son traducciones.
- **Bloqueante a resolver:** locales duplicados en `app/locales/` y `i18n/locales/` (mismo contenido). Decidir fuente única y eliminar la otra. Se recomienda mantener `i18n/locales/` si es lo que lee el módulo; verificar y limpiar.
- **Cobertura:** cada clave nueva (features ampliados, WhatsApp, pollas, roles, recargas) debe existir en los 3 archivos con traducción real (no automática).
- **Nota:** el `pt-BR` es portugués de Brasil. El `es` puede usar variantes neutras (el mercado es LATAM). No mezclar jerga regional en el copy del site.

---

## 5. Estado actual del site vs. trabajo requerido

### Ya existe (en `betkit/web/app/pages/`)
- `index.vue` (623 líneas, madura) — home data-driven con hero + ticker + stats.
- `pricing.vue`, `demo.vue`, `vendedores.vue`, `contacto.vue`, `blog.vue`, `links.vue`, `software-para-vende-pagas.vue` — ligeras/placeholder.
- `features/`: index + multi-sucursal, premiaciones, tipos-de-jugadas, impresion (esqueletos 33 líneas).
- Design tokens ya aplicados en `assets/css/main.css`. i18n es/en/pt-BR configurado.

### Gaps a cubrir
1. **Componentes compartidos ausentes** — header, footer, layout de navegación (solo existe `components/ui/button/`). Cada página se autopista hoy.
2. **Falta el enfoque por punto de vista** — no hay landing `/banqueros` (banquero+cashier) ni `/sellers` como página propia. La actual `vendedores.vue` es el germen de los Sellers.
3. **Páginas features esqueléticas** — hay que enriquecerlas con el contenido del content-base.
4. **Faltan secciones** — WhatsApp, Pollas, Dashboard por rol, Recargas/Retiros, Referidos, Plataformas (Web+Electron), Roles detallados.
5. **Demo sin credenciales reales** — resolver antes de prometer la demo.
6. **i18n duplicado + claves nuevas × 3 idiomas.**
7. **Número de tipos de apuesta incorrecto en el content-base** — el `content-base.md` dice 67, pero `BetTypesEnum.php` tiene **60 cases**. La web debe decir **60** (número real verificado), no 67.
8. **Hardcoded en templates** — unificar `bg-[#0D0E12]`, `border-[#262936]` hacia tokens semánticos.
9. **WhatsApp/Pollas "en desarrollo"** — etiquetar PRÓXIMAMENTE.

---

## 6. Bloqueantes y decisiones pendientes

| # | Bloqueante | Decisión recomendada |
|---|---|---|
| 1 | Cuentas demo no existen | No prometer credenciales funcionales; o crear cuentas demo reales antes de lanzar `/demo`. |
| 2 | Locales duplicados | Fuente única: verificar cuál lee `@nuxtjs/i18n`, eliminar la otra, migrar claves. |
| 3 | Componentes compartidos | Crear `layout`, `header`, `footer`, `nav` primero. |
| 4 | Número de tipos (67 en content-base) | **Corregir a 60** — verificado en `BetTypesEnum.php` (60 cases). |
| 5 | Features en desarrollo | Etiquetar como **PRÓXIMAMENTE** (WhatsApp, Pollas). |
| 6 | % de comisión | **No publicar** — solo "comisión por transacción/recurrente". |

---

## 7. Fuentes de información

- **Contenido principal:** `betkit/content-base.md` (hero, features, tipos de apuesta, roles, impresión, plataformas, dashboard por rol, recargas, retiros, referidos, WhatsApp, pollas). ⚠️ El content-base dice 67 tipos pero el código real tiene 60 — usar 60.
- **Marketing kit y copys:** `betkit/stitch_betkit_platform_redesign/kit_de_marketing.md` + `betkit_marketing_kit_y_copys_comerciales/code.html`.
- **Design system:** `betkit/stitch_betkit_platform_redesign/DESIGN.md` (tokens + reglas).
- **Accesibilidad:** auditorías WCAG 2.1 (`.txt` con hallazgos y `...actualizado.md` post-remediación).
- **Site existente:** `betkit/web/` (Nuxt 4, i18n, tokens).
- **Mockups de pantallas:** `betkit/stitch_betkit_platform_redesign/*/code.html` y `screen.png` (home, tipos de apuesta, precios, vendedores, dashboard, carruseles).
