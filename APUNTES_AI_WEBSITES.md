# Cómo Crear Sitios Web Increíbles con IA — Guía Completa 2026

## RESUMEN EJECUTIVO

**No se trata del modelo (Fable, GPT, Claude). Se trata de las SKILLS y técnicas que aplicas.**

La gente crea sitios premium con IA usando un workflow de 4 pasos:
1. **Preparación** — Definir identidad, referencias, stack
2. **Generación** — Prompts específicos, por componentes
3. **Iteración** — Feedback con screenshots y valores exactos
4. **Optimización** — Performance, SEO, deploy

---

## PARTE 1: HERRAMIENTAS DISPONIBLES

### Categoría A: AI Website Builders (Sin código)

| Herramienta | Mejor Para | Precio | Lo que hace |
|-------------|-----------|--------|-------------|
| **Framer** | Diseñadores, portafolios | $10/mes | Wireframes con IA, animaciones suaves |
| **Wix** | Negocios pequeños | $17/mes | Chatbot genera sitio completo, 800+ templates |
| **Squarespace** | Creativos, fotógrafos | $16/mes | Blueprint AI, tipografía premium |
| **Webflow** | Agencias, enterprise | $18/mes | AI Site Builder + design system |
| **Hostinger** | Presupuesto bajo | $1.79/mes | Sitio en 45 segundos |
| **Durable** | Velocidad extrema | $12/mes | Sitio en 30 segundos |

### Categoría B: AI Coding Assistants (Con código)

| Herramienta | Mejor Para | Precio | Stack |
|-------------|-----------|--------|-------|
| **Lovable** | MVPs rápidos | $20/mes | React, Supabase, Tailwind |
| **Bolt.new** | Apps en navegador | Freemium | React, Next.js, Vue, Svelte |
| **v0.dev** | Componentes UI | Freemium | React, Next.js, Tailwind, shadcn/ui |
| **Cursor** | Código personalizado | $20/mes | Cualquier stack |
| **Windsurf** | IDE gratuito | Gratis | Cualquier stack |

### Modelos de IA Disponibles en Cursor

| Modelo | Precio/M tokens | Velocidad | Para qué |
|--------|-----------------|-----------|----------|
| **Claude Fable 5** | $10 | Medio | Código complejo, arquitectura |
| **GPT-5.6 Sol** | $4 | Rápido | General, buen balance |
| **Grok 4.6** | $2 | Rápido | Via Cursor (SpaceXAI) |
| **Composer 2.5** | $0.5 | Rápido | Ediciones rápidas |
| **Claude Opus 5** | $5 | Medio | Máxima calidad |

---

## PARTE 2: LAS 8 SKILLS SECRETAS (Lo que NO te dicen)

### Skill 1: CLAUDE.md — El Ancla de Identidad

**ANTES de escribir UNA SOLA línea de código**, crea un archivo `CLAUDE.md` que defina:

```markdown
# Proyecto: [Nombre]

## Stack
- Framework: Next.js / React / Vue
- Estilos: Tailwind CSS
- Componentes: shadcn/ui
- Animaciones: GSAP
- 3D: Three.js / Spline

## Identidad Visual
- Colores primarios: #0a0e1a (fondo), #ffd76a (acento dorado)
- Colores secundarios: #8ab4f8 (dovish), #cfd6e4 (texto)
- Fuentes: Playfair Display (display), Segoe UI (body)
- Espaciado: 8px base,倍数 de 8

## Principios de Diseño
- Fondo oscuro premium
- Espaciado generoso entre secciones
- Jerarquía clara con tamaños de fuente
- Animaciones sutiles, no decorativas
- Mobile-first responsive

## Referencias Visuales
- stripe.com (limpieza, espaciado)
- apple.com (tipografía, productos)
- linear.app (dark mode, gradientes)

## Lo que NO quiero
- NO gradients genéricos
- NO fuentes del sistema (Arial)
- NO animaciones excesivas
- NO stock photos
- NO textos lorem ipsum
```

**Sin esto, tu sitio vuelve a ser "genérico" en 15 mensajes.**

---

### Skill 2: Mega-Prompt Inicial (Los 5 Elementos)

Un buen prompt tiene **5 elementos**:

```
1. TIPO DE SITIO: Landing page, portfolio, SaaS, e-commerce
2. AUDIENCE: A quién va dirigido
3. FEATURES: Qué necesita (form, pricing, testimonials)
4. ESTILO VISUAL: Descripción + referencias
5. DATA/INTEGRATIONS: APIs, bases de datos, pagos
```

**Ejemplo MALO:**
> "Hazme un sitio web profesional"

**Ejemplo BUENO:**
> "Crea una landing page para un scrollytelling sobre política monetaria en Chile.
> Target: economistas y estudiantes de economics.
> Features: hero con moneda 3D, sección de datos con D3.js, timeline interactivo, citas de expertos.
> Estilo: premium dark mode, fondos #0a0e1a, acentos dorados #ffd76a, tipografía Playfair Display.
> Referencias: stripe.com para espaciado, nytimes.com para scrollytelling.
> NO usar: gradients genéricos, fuentes del sistema, animaciones excesivas."

---

### Skill 3: Iteración por Componentes (NO todo junto)

**Mal enfoque:** Pedir todo el sitio de una vez
**Buen enfoque:** Construir pieza por pieza

```
Prompt 1: "Genera solo la navbar con logo centrado y botón CTA a la derecha"
Prompt 2: "Genera el hero section con headline bold, subheadline, y dos botones"
Prompt 3: "Genera la sección de features en grid 3 columnas con iconos"
Prompt 4: "Genera la sección de pricing con 3 planes y toggle mensual/anual"
Prompt 5: "Genera los testimonials en carousel con fotos y nombres"
```

**Cada prompt = 1 componente = código limpio y enfocado.**

---

### Skill 4: Feedback Específico con Screenshots

**LA TÉCNICA MÁS IMPORTANTE:**

1. Tomas screenshot de una sección
2. Señalas el defecto específico
3. Das feedback con valores exactos

**MAL:**
> "Mejora el diseño"

**BUENO:**
> "En el hero section (screenshot adjunto):
> - Aumenta el padding top a 6rem
> - Cambia el color del botón a #0F172A
> - Agrega sombra con blur 20px y opacidad 0.3
> - Reduce el font-size del subheadline a 1.1rem"

**Esto es 5x más rápido porque elimina la "adivinanza".**

---

### Skill 5: Stack Moderno Obligatorio

Los sitios premium en 2026 usan:

| Capa | Herramienta | Por qué |
|------|-------------|---------|
| Framework | Next.js / React | SSR, performance, ecosistema |
| Estilos | Tailwind CSS | Consistencia, speed, responsive |
| Componentes | shadcn/ui | Accesibilidad, design system |
| Animaciones | GSAP + ScrollTrigger | Cinematic scroll, performance |
| 3D | Three.js / Spline | Impacto visual, interactividad |
| Deploy | Vercel / Netlify | CI/CD automático, edge |

---

### Skill 6: Tipografía Premium

**NO usar:** Arial, system-sans, fuentes genéricas

**SÍ usar:**
- **Display/Títulos**: Playfair Display, Space Grotesk, Inter
- **Body/Texto**: Inter, system-ui, Segoe UI
- **Code/Datos**: JetBrains Mono, Fira Code

**Reglas:**
- Letter-spacing tight para títulos (-0.02em a -0.04em)
- Line-height 1.2-1.4 para títulos
- Line-height 1.6-1.8 para body text
- Medida de lectura: 45-75 caracteres por línea
- Máximo 2 familias de fuente

---

### Skill 7: Fondos como Decisión de Diseño

**NO usar:** Gradients genéricos de CSS

**SÍ usar:**
- Texturas sutiles (ruido, grain)
- Patrones geométricos (grid, dots)
- Degradados específicos con hex codes
- Radial gradients controlados

**Ejemplo premium:**
```css
background: 
  radial-gradient(circle at 50% 42%, rgba(255,215,106,0.03), transparent 35%),
  radial-gradient(circle at 50% 50%, transparent 52%, rgba(0,0,0,0.4) 100%);
```

---

### Skill 8: Movimiento con Propósito

**NO animar:** Todo por animar

**SÍ animar:**
- Transiciones de estado (loading → ready)
- Feedback de interacción (hover, click)
- Continuidad espacial (scroll → reveal)
- Jerarquía temporal (primero esto, luego aquello)

**Herramientas:**
- GSAP para scroll-driven animations
- CSS transitions para estados simples
- Three.js para 3D transforms
- `prefers-reduced-motion` para accesibilidad

---

## PARTE 3: EL WORKFLOW COMPLETO

### Fase 1: Preparación (15-30 min)

```markdown
Antes de abrir cualquier herramienta IA:

□ Definir audience objetivo
□ Elegir 3 referencias visuales (sitios que te gusten)
□ Definir paleta exacta (3-5 colores con hex codes)
□ Elegir 2 fuentes máximo
□ Listar secciones necesarias
□ Definir features requeridas
□ Crear archivo CLAUDE.md o documentación equivalente
```

### Fase 2: Generación Inicial (30-60 min)

```
Opción A: AI Website Builder (sin código)
1. Ve a Framer/Wix/Squarespace
2. Describe tu negocio con mega-prompt
3. La IA genera sitio completo
4. Exporta/edita en drag-and-drop

Opción B: AI Coding Assistant (con código)
1. Abre Cursor/v0/Bolt
2. Genera componente por componente
3. Cada prompt = 1 pieza específica
4. Itera con feedback específico
```

### Fase 3: Iteración (1-3 horas)

```
Para cada sección:
1. Revisa el output
2. Toma screenshot si algo no se ve bien
3. Da feedback específico con valores
4. Repite hasta que esté correcto

Ejemplo de ciclo:
- Prompt: "Genera hero section"
- Output: [código generado]
- Review: "El headline está muy pequeño"
- Feedback: "Aumenta font-size a clamp(22px, 3.2vw, 38px)"
- Output: [código actualizado]
- ✓ Listo, siguiente componente
```

### Fase 4: Optimización (30-60 min)

```
□ Comprimir imágenes (TinyPNG → WebP)
□ Implementar lazy loading
□ Minificar CSS/JS
□ Agregar meta tags SEO
□ Verificar responsive en 3 breakpoints
□ Testear performance (PageSpeed Insights)
□ Agregar prefers-reduced-motion
□ Verificar accesibilidad (contrast, ARIA)
```

### Fase 5: Deploy (15-30 min)

```
Opción A: Hosting incluido
- Lovable/Bolt/Wix → publish button

Opción B: Vercel/Netlify
1. Push a GitHub
2. Conectar repo a Vercel/Netlify
3. Auto-deploy en cada commit
4. Agregar custom domain + SSL
```

---

## PARTE 4: EJEMPLOS REALES

### Caso 1: Startup de Educación (Klar)
- **Herramienta**: Lovable
- **Resultado**: €130K ARR en 30 días
- **Workflow**: Prompt → React + Supabase → Deploy

### Caso 2: Inmobiliaria (eXp Realty)
- **Herramienta**: Lovable
- **Ahorro**: $2M+ en contratos SaaS
- **Workflow**: Describir herramienta → IA genera → 83K agentes conectados

### Caso 3: Consultoría (The Scion Group)
- **Herramienta**: Lovable
- **Resultado**: 100+ apps en 4 meses
- **Workflow**: Cada departamento crea sus propias herramientas

---

## PARTE 5: ERRORES COMUNES

### ❌ Error 1: Prompt vago
**Mal**: "Hazme un sitio web profesional"
**Bien**: "Crea landing page para SaaS de project management targeting remote teams. Incluye hero con video demo, features grid 3 columnas, pricing table con toggle, testimonials carousel. Estilo: minimal, navy/white, inspired by Basecamp."

### ❌ Error 2: Pedir todo junto
**Mal**: "Genera el sitio completo"
**Bien**: "Genera solo la navbar" → "Genera solo el hero" → etc.

### ❌ Error 3: Aceptar primer output
**Mal**: Publicar lo que la IA genera sin revisar
**Bien**: Iterar 3-5 veces con feedback específico

### ❌ Error 4: Feedback vago
**Mal**: "Mejora el diseño"
**Bien**: "Aumenta padding a 6rem, cambia color del botón a #0F172A, agrega sombra blur 20px"

### ❌ Error 5: Ignorar mobile
**Mal**: Solo probar en desktop
**Bien**: Probar en 3 breakpoints: mobile, tablet, desktop

### ❌ Error 6: No definir identidad
**Mal**: Empezar a generar sin CLAUDE.md
**Bien**: Definir stack, colores, fuentes, principios ANTES de generar

---

## PARTE 6: RECURSOS ADICIONALES

### Inspiración Visual
- **Awwwards.com** — Sitios web ganadores de premios
- **Dribbble.com** — UI/UX design inspiration
- **Mobbin.com** — UI patterns reales
- **Godly.website** — Sitios web premium

### Herramientas de Diseño
- **Coolors.co** — Generador de paletas de color
- **Google Fonts** — Tipografías gratuitas
- **Heroicons.com** — Iconos para interfaces
- **Unsplash.com** — Fotos gratuitas de alta calidad

### Aprendizaje
- **Flux Academy** — Cursos de diseño web
- **Designlab** — Fundamentos de UX
- **YouTube: Fireship** — Tutoriales rápidos de código
- **YouTube: Theo** — Opinion sobre frontend

---

## PARTE 7: PARA NUESTRO PROYECTO D3.JS

### Cómo Aplicar Estas Skills

1. **Crear CLAUDE.md** con:
   - Stack: Three.js + D3.js + GSAP + Lenis
   - Colores: #0a0e1a (fondo), #ffd76a (dorado), #8ab4f8 (azul)
   - Fuentes: Playfair Display + Segoe UI
   - Estilo: Premium dark mode, scrollytelling, data visualization

2. **Prompt específico para cada componente**:
   - Hero: "Genera hero con moneda 3D rotando, título gradient dorado, scroll hint animado"
   - Hook: "Genera sección de texto con SplitText character reveal, easing cinematicOut"
   - Counters: "Genera counters animados con GSAP, números subiendo desde 0"
   - Timeline: "Genera timeline SVG con D3.js, línea con gradiente, eventos marcados"

3. **Feedback con valores exactos**:
   - "Aumenta font-size del counter a clamp(36px, 5vw, 64px)"
   - "Cambia opacity del quote-card de 0 a 1 con duration 0.8s"
   - "Agrega text-shadow: 0 0 12px rgba(255,215,106,0.08)"

4. **Optimización post-generación**:
   - Draco compression para GLB (ya hecho: 5.4MB → 4.4MB)
   - Lazy loading para Three.js
   - prefers-reduced-motion para animaciones

---

## PARTE 8: ANÁLISIS DE PERFORMANCE (según revisión de código)

### Lo que YA está bien hecho
- Detección de móvil + pixel ratio bajo (`isMobile ? 1.5 : 2`)
- Fallback si no hay WebGL
- Raycaster con throttle de 32ms
- Respeta `prefers-reduced-motion`
- Modelos comprimidos con DRACO
- Sin `pin: true` en ScrollTrigger (más barato)

### Cuellos de botella identificados (mayor a menor impacto)

| # | Problema | Impacto | Solución |
|---|----------|---------|----------|
| 1 | **Texturas GLB** — DRACO solo comprime geometría, no texturas | Alto | Pasar por `gltf-transform` a KTX2/Basis Universal |
| 2 | **Shadow maps** — 4 luces direccionales + point + spots para puerta | Alto | Usar sombra falsa con CanvasTexture (como la moneda) |
| 3 | **6 scripts vendor sin defer** | Medio | Bundlear en uno solo o agregar `defer` |
| 4 | **Antialiasing + pixel ratio 2x desktop** | Medio | Capar a 1.5 en desktop o usar FXAA post-proceso |
| 5 | **Blur por velocidad de scroll** — `filter: blur()` en cada frame | Bajo-Medio | Eliminar o reducir frecuencia |

### Diagnóstico recomendado
```
1. Chrome DevTools → Performance → grabar scroll típico
2. Pestaña Network → ordenar por tamaño (¿GLB o JS?)
3. Pestaña Performance → ¿domina Scripting, Rendering, o Painting?
```

---

## PARTE 9: TÉCNICAS PREMIUM PARA ELEVAR NUESTRO SITIO (2026)

### Lo que separa un sitio "bonito" de uno "WOW"

Según jurados de Awwwards y expertos en 2026:

| Sitio "bonito" | Sitio "WOW" |
|----------------|-------------|
| Template pulido | Punto de vista específico |
| Animaciones pegadas | Coreografiado, con propósito |
| Cortes duros / fades | Transiciones continuas, dirigidas |
| Muere bajo carga | 60fps en Android mid-range |
| Accessibility ignorada | Reduced-motion path construido |

---

### TÉCNICA 1: Scroll-Scrubbed Timeline (Apple-style)

**Qué es:** La animación está atada al scroll. El usuario controla la velocidad.

```javascript
const tl = gsap.timeline({
  scrollTrigger: {
    trigger: ".section",
    start: "top top",
    end: "+=150%",
    scrub: 1,     // 1 segundo de lag suave
    pin: true,
  },
});

tl.from(".headline", { yPercent: 100, opacity: 0 })
  .to(".bg", { scale: 1.2, ease: "none" }, 0);
```

**Clave:** `scrub: 1` suaviza. `scrub: true` es 1:1 (rígido).

---

### TÉCNICA 2: Parallax de Profundidad

**Qué es:** Capas que se mueven a diferentes velocidades → ilusión de profundidad.

```javascript
// Fondo: se mueve poco
gsap.to(".layer-back", {
  yPercent: -30,
  ease: "none",
  scrollTrigger: { trigger: ".scene", start: "top bottom", end: "bottom top", scrub: true },
});

// Primer plano: se mueve más
gsap.to(".layer-front", {
  yPercent: -60,
  ease: "none",
  scrollTrigger: { trigger: ".scene", start: "top bottom", end: "bottom top", scrub: true },
});
```

**Regla:** Nunca hacer parallax en texto (daña legibilidad). Solo elementos decorativos.

---

### TÉCNICA 3: Texto con Clip Reveal (overflow:hidden)

**Qué es:** El texto se revela deslizándose desde abajo, enmascarado por un contenedor.

```css
.line-wrapper {
  overflow: hidden;
}
.line-inner {
  transform: translateY(100%);
  animation: slideUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}
@keyframes slideUp {
  to { transform: translateY(0); }
}
```

**Por qué es premium:** Pure compositor (60fps garantizado). Es lo que usa Apple en sus product pages.

---

### TÉCNICA 4: Kinetic Typography con SplitText

**Qué es:** Dividir texto en caracteres/palabras y animar individualmente.

```javascript
const split = new SplitType(".heading", { types: "words" });

gsap.from(split.words, {
  y: 30,
  opacity: 0,
  stagger: 0.05,
  scrollTrigger: {
    trigger: ".heading",
    start: "top 80%",
    end: "top 40%",
    scrub: true,
  },
});
```

---

### TÉCNICA 5: SVG Path Drawing

**Qué es:** Dibujar líneas SVG progresivamente con el scroll.

```javascript
gsap.to("#path", {
  strokeDashoffset: 0,
  scrollTrigger: {
    trigger: "#path",
    start: "top 80%",
    end: "bottom 20%",
    scrub: true,
  },
});
```

---

### TÉCNICA 6: Snap Scroll por Secciones

**Qué es:** Cada sección "encaja" al hacer scroll (como Apple en sus product pages).

```javascript
ScrollTrigger.create({
  trigger: ".section",
  start: "top top",
  end: "+=100%",
  snap: {
    snapTo: 1 / (sections.length - 1),
    duration: { min: 0.2, max: 0.8 },
    delay: 0.1,
    ease: "power1.inOut",
  },
});
```

---

### TÉCNICA 7: Background Color Transition entre Secciones

**Qué es:** El color de fondo cambia suavemente al pasar de una sección a otra.

```javascript
gsap.to("body", {
  backgroundColor: "#1a1a2e",
  scrollTrigger: {
    trigger: ".dark-section",
    start: "top center",
    end: "bottom center",
    scrub: true,
  },
});
```

---

### TÉCNICA 8: Velocity-Based Distortion

**Qué es:** Efectos que reaccionan a la velocidad del scroll.

```javascript
ScrollTrigger.create({
  trigger: ".element",
  onUpdate: (self) => {
    const velocity = self.getVelocity();
    const distortion = Math.min(Math.abs(velocity) / 1000, 5);
    gsap.to(".element", {
      filter: `blur(${distortion}px)`,
      duration: 0.3,
    });
  },
});
```

---

### TÉCNICA 9: GLSL Shaders Reactivos al Scroll

**Qué es:** Shaders que cambian con el scroll (para efectos de distorsión, ondas, etc.).

```javascript
// En el fragment shader:
uniform float uScrollProgress;
uniform float uScrollVelocity;

void main() {
  vec2 uv = vUv;
  float distortion = sin(uv.x * 10.0 + uScrollProgress * 6.28) * 0.02 * uScrollVelocity;
  uv.x += distortion;
  // ...
}
```

---

### TÉCNICA 10: Mouse Trail / Cursor Effects

**Qué es:** Efectos que siguen al cursor (halftone dots, trails, distorsión).

```javascript
// Ejemplo: trail de puntos halftone (del proyecto Studio375)
const canvas = document.createElement("canvas");
const ctx = canvas.getContext("2d");

document.addEventListener("mousemove", (e) => {
  ctx.fillStyle = "rgba(255,215,106,0.1)";
  ctx.beginPath();
  ctx.arc(e.clientX, e.clientY, 4, 0, Math.PI * 2);
  ctx.fill();
});
```

---

### SITIOS DE INSPIRACIÓN PARA NUESTRO PROYECTO

| Sitio | Qué copiar | URL |
|-------|-----------|-----|
| **Apple AirPods Pro** | Pinned 3D + scroll scrub | apple.com/airpods-pro |
| **By-Kin** | Tipografía editorial + transitions | by-kin.com |
| **Iventions** | Three.js para atmósfera, no espectáculo | ictions.com |
| **Mat Voyce** | Kinetic typography premiada | matvoyce.com |
| **Uncommon Studio** | Grid que quiebra + GSAP transitions | uncommonstudio.com |
| **Minh Pham** | Three.js + GSAP, 60fps | minhpham.com |
| **Lusion** | GLSL shaders, partículas | lusion.co |
| **Active Theory** | WebGL production-grade | activetheory.net |
| **Razorpay Sprint 26** | 100+ scroll interactions | razorpay.com/sprint26 |
| **Scrollytelling.ai** | Plataforma de referencia | scrollytelling.ai |
| **Codrops** | Tutoriales técnicos premium | tympanus.net/codrops |

---

### STACK RECOMENDADO PARA NUESTRO PROYECTO

```
Core:
- Three.js (WebGL)
- GSAP + ScrollTrigger (scroll-driven animation)
- Lenis (smooth scroll)
- SplitText (texto cinemático)

Avanzado (futuro):
- Custom GLSL shaders (distortion, noise)
- KTX2 textures (GPU compression)
- Howler.js (audio reactivo al scroll)
- Observer (unificar mouse/touch/trackpad)

Performance:
- Draco compression (ya hecho)
- AdaptiveDPR (limitar devicePixelRatio a 1.5)
- IntersectionObserver (activar escenas bajo demanda)
- prefers-reduced-motion (ya implementado)
```

---

### CHECKLIST ANTES DE "WOW"

```
□ Cada sección tiene un momento cinemático claro
□ El scroll controla la animación (scrub), no timers
□ Transiciones entre secciones son continuas, no cortes
□ Texto se revela con overflow:hidden (compositor-only)
□ Parallax sutil en fondos (nunca en texto)
□ Hover states en todos los elementos interactivos
□ reduced-motion funciona gracefully
□ 60fps en mid-range Android
□ Loading time < 3 segundos
□ Sin layout thrashing en animations
```

---

*Documento actualizado: 29 Agosto 2026*
*Fuentes: Awwwards, Codrops, GSAP Docs, Hon Tran, Scrollytelling.ai, Studio375*
