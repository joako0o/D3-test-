# 🎬 GUÍA MAESTRA: Transiciones, Desapariciones y Efectos Visuales Ultra-Premium (2026)

> **De "Sitio Web Funcional" a "Experiencia Inmersiva de Nivel Awwwards / Apple / Active Theory"**  
> Este documento condensa los principios, matemáticas, curvas de aceleración, arquitectura de código y patrones de coreografía necesarios para dominar el movimiento y la desaparición de elementos 2D y 3D en la web.

---

## 📑 ÍNDICE DE CONTENIDOS
1. [La Psicología y Física del Movimiento Premium](#1-la-psicología-y-física-del-movimiento-premium)
2. [La Regla de Oro: Asimetría Entrada vs Salida](#2-la-regla-de-oro-asimetría-entrada-vs-salida)
3. [El Patrón "Multi-Channel": Por qué el Fade simple se ve barato](#3-el-patrón-multi-channel)
4. [Las 6 Técnicas Supremas de Desaparición / Salida](#4-las-6-técnicas-supremas-de-desaparición--salida)
5. [Curvas de Easing Cinemáticas y sus Fórmulas](#5-curvas-de-easing-cinemáticas-y-sus-fórmulas)
6. [Coreografía y Staggering: Guiar el Ojo](#6-coreografía-y-staggering-guiar-el-ojo)
7. [Scroll-Scrubbing con GSAP: La Arquitectura de los 3 Tercios](#7-scroll-scrubbing-con-gsap-la-arquitectura-de-los-3-tercios)
8. [Transiciones 3D en Three.js / WebGL](#8-transiciones-3d-en-threejs--webgl)
9. [Recetario de Código: Snippets Listos para Usar](#9-recetario-de-código-snippets-listos-para-usar)
10. [Diagnóstico y Configuración de Nuestro Proyecto (D3-test)](#10-diagnóstico-y-configuración-de-nuestro-proyecto)

---

## 1. LA PSICOLOGÍA Y FÍSICA DEL MOVIMIENTO PREMIUM

En el mundo físico, **ningún objeto aparece de la nada ni desaparece de golpe**. Todo objeto tiene:
- **Masa e Inercia:** Requiere energía para acelerar y distancia para frenar.
- **Profundidad Óptica:** Las cámaras de cine tienen una distancia focal; los objetos desenfocados se desvanecen suavemente en el bokeh.
- **Conservación de la Atención:** El ojo humano reacciona a los contrastes de velocidad. Si todo se mueve igual, el cerebro lo interpreta como ruido.

### Lo que hace que algo se sienta "Barato / Amateur":
- ❌ **Fade lineal (`linear`):** La opacidad cae a ritmo constante (0.5 al 50% del tiempo). Se siente robótico y de diapositiva de PowerPoint.
- ❌ **Mover objetos sin holding zone:** El texto entra y empieza a salir inmediatamente antes de que el usuario termine de leerlo.
- ❌ **Simetría forzada:** Hacer que un elemento salga exactamente al revés de como entró.
- ❌ **Layout Thrashing:** Animar `top`, `left`, `width` o `margin` en lugar de `transform` y `opacity` (provoca caídas de FPS a 15-30 fps).

### Lo que hace que algo se sienta "Ultra-Premium":
- ✅ **Composición Multi-Propiedad:** Combinar escala + opacidad + traslación Y/Z + desenfoque (blur).
- ✅ **Desaceleración orgánica:** Curvas cúbicas con pendientes iniciales altas y amortiguación final suave (`cubic-bezier(0.16, 1, 0.3, 1)`).
- ✅ **Continuidad Espacial:** Los objetos 3D no desaparecen, se transforman (se dispersan en partículas, viajan al fondo o se convierten en datos).
- ✅ **60 FPS constantes:** Animaciones ejecutadas en la GPU (usando capas de compositor `transform`, `opacity`, `filter`).

---

## 2. LA REGLA DE ORO: ASIMETRÍA ENTRADA VS SALIDA

Uno de los errores más comunes en diseño web es usar la misma duración y curva tanto para la entrada como para la salida de un objeto.

```
       ENTRADA (Entrance)                 SALIDA (Exit)
┌────────────────────────────────┐   ┌──────────────────────────────┐
│ • Objetivo: Atraer atención    │   │ • Objetivo: Despejar escena  │
│ • Percepción: Suave, elegante  │   │ • Percepción: Rápida, limpia │
│ • Curva: Ease-Out (Decelerate) │   │ • Curva: Ease-In (Accelerate)│
│ • Duración: 600ms - 1000ms     │   │ • Duración: 250ms - 400ms    │
│ • Distancia Y: +30px a 0px     │   │ • Distancia Y: 0px a -20px   │
└────────────────────────────────┘   └──────────────────────────────┘
```

### Por qué funciona:
1. **Al entrar**, el usuario necesita tiempo para detectar el nuevo elemento, fijar su mirada y comenzar la lectura. Una entrada rápida causa sensación de agresividad.
2. **Al salir**, el usuario ya procesó la información. Si el objeto tarda demasiado en salir, bloquea visualmente el siguiente contenido y hace que la web se sienta lenta.

---

## 3. EL PATRÓN "MULTI-CHANNEL"
### Por qué un fade simple no basta

Un fade simple solo cambia la propiedad `opacity: 1 -> 0`.  
Un efecto **Multi-Channel Premium** orquesta 3 a 5 propiedades en sincronía armónica:

```javascript
// ❌ AMATEUR (Fade Simple)
gsap.to(element, { opacity: 0, duration: 0.5 });

// ✅ ULTRA-PREMIUM (Multi-Channel Exit: Depth Push + Blur + Fade)
gsap.to(element, {
  opacity: 0,
  y: -30,                       // Ligero impulso hacia arriba (despedida)
  scale: 0.95,                  // Se aleja en el espacio tridimensional
  filter: "blur(8px)",          // Pierde enfoque óptico
  duration: 0.35,
  ease: "power2.in",            // Acelera al marcharse
  clearProps: "filter"          // Limpia GPU después de animar
});
```

---

## 4. LAS 6 TÉCNICAS SUPREMAS DE DESAPARICIÓN / SALIDA

### Técnica 1: The Depth Sink (Hundimiento en Profundidad)
El objeto no solo se vuelve transparente, sino que da la ilusión de retroceder en el eje Z (hacia el fondo de la pantalla).
- **Propiedades:** `scale: 1 -> 0.92`, `y: 0 -> -20px`, `opacity: 1 -> 0`, `filter: blur(0px) -> blur(12px)`.
- **Ideal para:** Tarjetas (cards), modales, títulos de sección, HUDs.

```javascript
gsap.to(".card", {
  scale: 0.92,
  y: -24,
  opacity: 0,
  filter: "blur(10px)",
  duration: 0.4,
  ease: "cinematicIn"
});
```

---

### Técnica 2: The Editorial Curtain / Mask Wipe (Corte por Máscara Vectorial)
El elemento se corta mediante un contenedor con `overflow: hidden` o un `clip-path` poligonal. Es el sello distintivo de marcas editoriales de lujo, moda y alta finanza.
- **Propiedades:** `clipPath: 'inset(0% 0% 0% 0%)' -> 'inset(0% 0% 100% 0%)'`.
- **Ventaja:** No requiere cambio de opacidad; el texto se "corta" limpiamente como si entrara detrás de una pared invisible.

```css
.text-mask-container {
  overflow: hidden;
  display: inline-block;
}
```
```javascript
// Revelación y salida editorial
gsap.fromTo(".text-line", 
  { yPercent: 0 }, 
  { yPercent: -105, duration: 0.45, ease: "cinematicIn" }
);
```

---

### Técnica 3: The Particle Dissolve / Scatter (Dispersión en Partículas)
En lugar de desaparecer, el objeto 3D o gráfico se fragmenta en cientos de puntos o fragmentos que vuelan orgánicamente hacia la cámara o el fondo, guiando al siguiente acto.
- **Matemática:** Interpolación cúbica `lerp(posOriginal, posScatter, progress)` + onda senoidal de turbulencia `Math.sin(time + id * 0.2)`.
- **Ideal para:** Transición entre objetos 3D (ej. la Moneda de oro disolviéndose en el scatter de intervenciones de la RPM).

---

### Técnica 4: The Directional Sweep (Barrido Direccional con Stagger)
Cuando un bloque de elementos (como una grilla o lista) debe salir, no todos salen juntos: salen en cascada en la dirección del scroll.
- **Dirección hacia abajo:** Los elementos superiores salen primero (`stagger: 0.04`).
- **Dirección hacia arriba:** Los elementos inferiores salen primero.

```javascript
gsap.to(".list-item", {
  opacity: 0,
  y: -40,
  stagger: {
    amount: 0.2,
    from: "start",
    ease: "power1.in"
  },
  duration: 0.35
});
```

---

### Técnica 5: The Atmospheric Fog Fade (Disolución Atmosférica 3D)
En Three.js, un objeto 3D sólido (como la Puerta del Banco Central) no debe cortarse súbitamente. Debe integrarse con la niebla (`scene.fog`) y la atenuación de spots de luz.
- **Fórmula:** 
  1. `material.transparent = true`
  2. `material.opacity = doorFade`
  3. `scene.fog.density = baseFog * doorFade`
  4. `spotLights.forEach(s => s.intensity = baseIntensity * doorFade)`

---

### Técnica 6: The Morph / State Handoff (Transferencia de Estado)
Un elemento nunca desaparece si puede transformarse en el siguiente elemento.
- Ejemplo: La silueta de la moneda se contrae y se convierte en el primer punto del gráfico D3 de la trayectoria temporal de tasas de interés.

---

## 5. CURVAS DE EASING CINEMÁTICAS Y SUS FÓRMULAS

Las curvas estándar de CSS (`ease`, `ease-in-out`) son simétricas y carecen de personalidad. Para lograr un look cinemático de $50,000+ USD se utilizan curvas Bézier personalizadas:

```javascript
// Registrador GSAP CustomEase
gsap.registerPlugin(CustomEase);

// 1. CINEMATIC OUT (Para Entradas Elegantes)
// Despega rápido y frena con sedosa amortiguación
CustomEase.create("cinematicOut", "0.16, 1, 0.3, 1");

// 2. CINEMATIC IN (Para Salidas Rápidas y Decididas)
// Comienza pausado y acelera rápidamente hacia la salida
CustomEase.create("cinematicIn", "0.4, 0, 1, 1");

// 3. CINEMATIC SILK (Para Cámaras 3D y Movimientos Continuos)
// Curva S perfecta: sin tirones al inicio ni al final
CustomEase.create("cinematicSilk", "0.45, 0.05, 0.55, 0.95");

// 4. CINEMATIC SNAP (Para Hover States y Micro-interacciones)
// Ultra reactivo, imita la tensión de un resorte metálico
CustomEase.create("cinematicSnap", "0.25, 1, 0.5, 1");
```

### Tabla de Selección de Easing por Caso de Uso:

| Evento | Curva Recomendada | Duración (ms) | Sensación |
|---|---|---|---|
| **Aparición de Títulos (Hero / H2)** | `cinematicOut` | 700 - 900ms | Majestuoso, seguro |
| **Desaparición de Textos** | `cinematicIn` | 300 - 450ms | Limpio, sin estorbar |
| **Paneo de Cámara 3D** | `cinematicSilk` | Scrub continuo | Cinemático, de película |
| **Botones / Hover de Cards** | `cinematicSnap` | 200 - 300ms | Táctil, de alta gama |
| **Modales / Overlays (Entrada)** | `cinematicOut` | 400 - 500ms | Enfoque dramático |
| **Modales / Overlays (Salida)** | `power2.in` | 250 - 300ms | Descarte instantáneo |

---

## 6. COREOGRAFÍA Y STAGGERING: GUIAR EL OJO

Cuando un usuario interactúa con una escena, su mirada solo puede procesar **un punto focal a la vez**. La coreografía divide los elementos en una secuencia cronológica:

```
Tiempo 0.0s ───────────────────────────────► 1.0s
[1. Fondo / Luces] ──► (se iluminan)
   [2. Objeto 3D] ────────► (asciende y rota)
      [3. Subtítulo / Badge] ──► (aparece)
         [4. Título Principal (Chars Split)] ─────► (se revela letra por letra)
            [5. Datos / Gráficos / CTAs] ──────────────► (entran en cascada)
```

### Configuración con SplitText:
```javascript
// Revelación de texto por caracteres con rotación 3D
const split = new SplitText(".headline", { type: "chars, words" });

gsap.fromTo(split.chars, 
  {
    opacity: 0,
    y: 28,
    rotationX: -45,
    transformOrigin: "0% 50% -20"
  },
  {
    opacity: 1,
    y: 0,
    rotationX: 0,
    duration: 0.65,
    stagger: 0.018,         // 18ms entre cada letra
    ease: "cinematicOut"
  }
);
```

---

## 7. SCROLL-SCRUBBING CON GSAP: LA ARQUITECTURA DE LOS 3 TERCIOS

Cuando una sección está pineada (`pin: true`) o controlada por el scroll del usuario, el timeline del ScrollTrigger debe dividirse estrictamente en tres fases:

```
0% ──────────── 20% ────────────────────────── 75% ──────────── 100%
┌──────────────────┬─────────────────────────────┬──────────────────┐
│   FASE 1: ENTRADA│   FASE 2: HOLDING ZONE      │   FASE 3: SALIDA │
│ • Fade In 0 -> 1 │ • Opacidad = 100%           │ • Fade Out 1 -> 0│
│ • Y: 30px -> 0px │ • Texto perfectamente legible│ • Y: 0px -> -25px│
│ • Scale: 0.96->1 │ • El usuario lee tranquilo  │ • Scale: 1->0.95 │
│ • 3D: se acerca  │ • Interactividad activa     │ • 3D: se disuelve│
└──────────────────┴─────────────────────────────┴──────────────────┘
```

### Implementación en Código:
```javascript
const sectionTimeline = gsap.timeline({
  scrollTrigger: {
    trigger: "#stageObjective",
    start: "top top",
    end: "bottom top",
    scrub: true
  }
});

// FASE 1: ENTRADA (0.00 a 0.20)
sectionTimeline.fromTo(".objective-card", 
  { opacity: 0, y: 35, scale: 0.96 },
  { opacity: 1, y: 0, scale: 1, duration: 0.20, ease: "none" },
  0.00
);

// FASE 2: HOLD (0.20 a 0.70)
// No agregamos tweens aquí; el elemento se queda estático para su lectura

// FASE 3: SALIDA (0.70 a 1.00)
sectionTimeline.to(".objective-card",
  { opacity: 0, y: -25, scale: 0.94, filter: "blur(6px)", duration: 0.30, ease: "none" },
  0.70
);
```

---

## 8. TRANSICIONES 3D EN THREE.JS / WEBGL

### 1. Manejo del canal Alfa (Sin Z-Fighting ni parpadeos negros):
Al cambiar la opacidad de mallas en Three.js, si `depthWrite` permanece en `true`, los objetos semitransparentes tapan erróneamente lo que está detrás.

```javascript
function setModelOpacity(model, alpha) {
  model.traverse((child) => {
    if (child.isMesh && child.material) {
      const mats = Array.isArray(child.material) ? child.material : [child.material];
      mats.forEach((mat) => {
        mat.transparent = true;
        mat.opacity = alpha;
        // Si es semitransparente, deshabilitamos depthWrite para evitar artefactos
        mat.depthWrite = (alpha > 0.99);
      });
    }
  });
}
```

### 2. Sincronización de Luz Ambiental y de Contorno:
Al retirar un modelo 3D (como la Moneda o la Puerta), desvanecer gradualmente sus luces secundarias (`spotLights`, `rimLights`) para que el espacio no quede iluminado artificialmente en la nada:

```javascript
const dim = THREE.MathUtils.lerp(1, 0, exitProgress);
keyLight.intensity = baseKeyIntensity * dim;
rimLight.intensity = baseRimIntensity * dim;
```

---

## 9. RECETARIO DE CÓDIGO: SNIPPETS LISTOS PARA USAR

### Snippet A: Desaparición Premium de Tarjeta al Click (Dismiss)
```javascript
function dismissCard(cardElement, onComplete) {
  gsap.to(cardElement, {
    opacity: 0,
    scale: 0.92,
    y: -20,
    filter: "blur(12px)",
    duration: 0.35,
    ease: "power2.in",
    onComplete: () => {
      cardElement.style.display = "none";
      if (onComplete) onComplete();
    }
  });
}
```

### Snippet B: Modal Dialog con Entrada / Salida Cinemática
```javascript
// Abrir Modal
function openModal(modalEl) {
  modalEl.style.display = "flex";
  gsap.fromTo(modalEl, 
    { opacity: 0, backdropFilter: "blur(0px)" },
    { opacity: 1, backdropFilter: "blur(16px)", duration: 0.4, ease: "power2.out" }
  );
  gsap.fromTo(modalEl.querySelector(".modal-card"),
    { opacity: 0, scale: 0.9, y: 30 },
    { opacity: 1, scale: 1, y: 0, duration: 0.5, ease: "cinematicOut", delay: 0.05 }
  );
}

// Cerrar Modal
function closeModal(modalEl) {
  gsap.to(modalEl.querySelector(".modal-card"), {
    opacity: 0,
    scale: 0.94,
    y: -15,
    filter: "blur(8px)",
    duration: 0.25,
    ease: "power2.in"
  });
  gsap.to(modalEl, {
    opacity: 0,
    backdropFilter: "blur(0px)",
    duration: 0.3,
    ease: "power2.in",
    delay: 0.05,
    onComplete: () => { modalEl.style.display = "none"; }
  });
}
```

### Snippet C: Transición de Color de Fondo Reactiva al Scroll
```javascript
const stages = [
  { trigger: '#hero', color: '#0a0e1a' },
  { trigger: '#stageObjective', color: '#0c1020' },
  { trigger: '#stagePipeline', color: '#070b14' },
  { trigger: '#stageQuotes', color: '#0d1225' },
];

stages.forEach(({ trigger, color }) => {
  ScrollTrigger.create({
    trigger,
    start: 'top center',
    end: 'bottom center',
    onToggle: (self) => {
      if (self.isActive) {
        gsap.to(['html', 'body'], {
          backgroundColor: color,
          duration: 1.2,
          ease: 'power2.inOut'
        });
      }
    }
  });
});
```

---

## 10. DIAGNÓSTICO Y CONFIGURACIÓN EN NUESTRO PROYECTO (`D3-test`)

En el código de `index.html`, aplicamos esta arquitectura de la siguiente forma:

1. **Acto 1 a Acto 2 (Moneda -> Puerta):**
   - En lugar de cortar la moneda, `scatterProgress` dispersa sus partículas por el espacio 3D mientras la cámara ajusta su ángulo Y.
   - La puerta entra con una curva cúbica suave `doorFade * doorFade * (3 - 2 * doorFade)` y se apoya matemáticamente en el plano del suelo (`groundY`).

2. **Stage 2 (Texto "La Reunión"):**
   - Entrada: `0.05` del timeline con `cinematicOut` y stagger de 0.04s.
   - Holding: desde `0.25` hasta `0.60` (fijo para lectura cómoda).
   - Salida: a partir de `0.60` con `cinematicIn` y desplazamiento ascendente de `-25px`.

3. **Stage 4 (Canvas D3.js & Scatter de Intervenciones):**
   - El canvas `#d3-canvas` entra suavemente de `0% a 15%`, se mantiene activo durante todo el análisis de los ejes y sale con rampa suave de `85% a 100%` para no cruzarse con el Pipeline.

4. **Quote Cards (Acto 7):**
   - Tarjetas con micro-interacción al hover: escala de 1.02x y `boxShadow` de resplandor dorado/azul según el tono (Hawkish vs Dovish).
   - Modal de cita completa con apertura en desenfoque y cierre acelerado.

---

*Guía creada para el proyecto Central Bank Scrollytelling — 2026*
