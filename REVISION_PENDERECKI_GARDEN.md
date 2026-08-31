# Revisión profunda — Penderecki's Garden · *The Maestro's Manor*

- **Objeto revisado:** `https://pendereckisgarden.pl/en/the-maestros-manor` (y el recorrido general `https://pendereckisgarden.pl/en`)
- **Fecha de revisión:** 31 de agosto de 2026
- **Autoria:** Huncwot para el Adam Mickiewicz Institute (IAM), con contenido del IAM.
- **Tecnología declarada:** Three.js + TypeScript + GLSL, Web Audio API, GSAP, point clouds PCD comprimidos con gzip, backend/CMS propio (PHP).
- **Cómo se revisó:** exploración del contenido disponible en la web, revisión de la estructura de capítulos/navegación, análisis de la página de accesibilidad oficial y contraste con el proceso documentado por el estudio.

> ⚠️ **Aclaración importante sobre el repositorio local.** El workspace actual (`/home/user/D3-test-`) es un **proyecto distinto**: es un *scrollytelling* sobre el Banco Central de Chile (`In the room where monetary policy happens`) con Three.js, GSAP, Lenis y D3, y no contiene código de `pendereckisgarden.pl`. Esta revisión se hizo **sobre la web en vivo que me indicaste**. Si lo que quieres es una revisión del **código del repo de Chile**, dímelo y hago una revisión técnica de `index.html`, `js/` y los `.glb` por separado.

---

## 1. Veredicto sintético

| Dimensión | Nota | Comentario |
|---|---|---|
| Concepto y narrativa | ★★★★★ | Idea sólida y emotiva: música + jardín + memoria. El capítulo "The Maestro's Manor" aterriza muy bien el "lado humano" de Penderecki. |
| Dirección visual | ★★★★★ | Nube de puntos fotorrealista + ilustraciones a mano + tipografía clásica = identidad muy clara. |
| 3D / WebGL / shaders | ★★★★★ | Tecnología ambiciosa y bien ejecutada; partículas reactivas al audio es lo más memorable. |
| Arquitectura de información | ★★★★☆ | 7 capítulos claros; pero la experiencia de descubrimiento tiene algunos puntos confusos. |
| Accesibilidad | ★★★☆☆ | Ambición destacable (teclado, contraste, lectores de pantalla), pero la propia página de accesibilidad del sitio reconoce brechas vigentes. |
| Rendimiento / soporte | ★★★☆☆ | Muy pesado para móvil y equipos modestos; sin fallback 3D evidente. |
| Internacionalización | ★★☆☆☆ | Bilingüe PL/EN, pero hay contenido sin traducir en la versión EN y un formulario que queda en polaco. |
| Privacidad / cumplimiento | ★★☆☆☆ | El banner de cookies no ofrece un rechazo explícito; el consentimiento del formulario mezcla newsletter con "dejar un recuerdo". |
| Mantenimiento de contenido | ★★★☆☆ | El CMS permite editar, pero hay contenido caducado y erratas visibles en producción. |

**Nota global: ~8.4/10.** Es una pieza premiada y técnicamente admirable (Awwwards **Site of the Day + Developer Award**, abr. 2021). No es un proyecto "malo"; los hallazgos importantes son de **pulido, cumplimiento, a11y y contenido**, no de concepto.

---

## 2. Qué hace muy bien (fortalezas)

1. **Concepto que conecta dos obsesiones.** Krzysztof Penderecki como compositor y jardinero; el jardín virtual como metáfora de su legado que "crece con él". La idea de combinar árboles, obras y testimonios en un mismo espacio es potente y fiel al sujeto.

2. **Dirección visual coherente.** Referencias al vinilo clásico: colores desaturados, serif + sans geométrica; luego se enriquece con paletas naturales del jardín. El resultado es sobrio, culto y nada genérico.

3. **Tecnología de punto de nube.** Fueron capaces de convertir billones de partículas de fotogrametría con drones en PCD + gzip y aún así renderizarlo en el navegador. Esto es muy difícil y está muy bien resuelto ([Communication Arts](https://www.commarts.com/webpicks/penderecki-s-garden)).

4. **Partículas reactivas al audio.** El Web Audio API con un *analyzer* sincroniza el movimiento de las partículas con la música (p. ej. *De natura sonoris II*). Es el momento más "wow" del sitio y convierte un slide-show de 3D en casi un videoclip generativo.

5. **Múltiples rutas de navegación.** Menú, slider de inicio y mapa interactivo permiten tanto una visita rápida como una exploración profunda. Buena decisión para distintos tipos de usuario ([Communication Arts](https://www.commarts.com/webpicks/penderecki-s-garden)).

6. **Hotspots optimizados.** Los hotspots se dibujan como texturas SVG horneadas dentro de la capa WebGL, no como overlays DOM, lo que ahorra tiempo de render ([WebGPU showcase](https://www.webgpu.com/showcase/pendereckis-garden-threejs-point-cloud-photogrammetry/)).

7. **Accesibilidad ambiciosa en WebGL.** Navegación completa con teclado, modo contraste y soporte de lector de pantalla — algo rarísimo en experiencias WebGL. Fue un requisito del cliente y un juez de Awwwards lo destacó explícitamente ([Awwwards / Huncwot](https://www.awwwards.com/pendereckis-garden-by-huncwot.html)).

8. **Contenido rico y curado.** 13 historias en *The Maestro's Manor*, decenas de árboles en *The Park*, obras en *The Music Salon*, anécdotas, testimonios y memorias de familiares/colegas. El contenido es el corazón del proyecto y está bien denso.

---

## 3. Hallazgos por área

### 3.1 Concepto, narrativa y UX/IA

**Fortalezas**
- El capítulo *The Maestro's Manor* funciona como "puerta de entrada humana": Anne-Sophie Mutter, Arto Noras, Szymon Nehring, anécdotas (el coñac de la Sra. Solecka, el Malczewski al precio de un armario, la fuga de Stefania Szylkiewicz, Winnetou en alemán, etc.). La mezcla de personas, objetos, paisajes y obras es muy orgánica.
- El medidor "You have discovered **0%** of this chapter" gamifica la exploración y da una meta clara de recompensa.

**Áreas de mejora**
- **Elementos "bloqueados" vs enlaces rotos.** En el menú del capítulo conviven ítems enlazados (p. ej. *Look at Trees!*) y ítems de texto plano (p. ej. *Cognac from Mrs Solecka*). Un usuario puede interpretar los de texto plano como enlaces rotos. Recomendación: en estado bloqueado usar `aria-disabled="true"` + texto visual del tipo "🔒 Descubre este punto en el jardín", o algún indicador de que están en la escena.
- **Solo 3 hotspots inicialmente desbloqueables** en uno de los capítulos más ricos: puede frustrar a un visitante de paso. Sugeriría mostrar siempre un camino lineal mínimo ("primeros 3 relatos") y el resto como contenido opcional con recompensa.
- **Progreso por capítulo pero no global.** Hay "% descubierto" por capítulo, pero no se ve un "progreso global" de todo el sitio ni una ruta recomendada de 5–10 minutos. Un *guided tour* opcional ayudaría a nuevos visitantes.
- **Volver a la escena desde un relato** no siempre es evidente; los subpages individuales (p. ej. `/look-at-trees`) deberían tener un *breadcrumb* o botón "Volver al jardín" fijo.

### 3.2 Visual, 3D y shaders

**Fortalezas**
- Photogrammetría con drones + ilustración a mano conviven sin chocar: el toque "análogo-digital" funciona.
- La cámara, los movimientos y las transiciones de página están muy cuidadas (un punto reconocido por el propio estudio).
- El uso de partículas con GLSL le da un movimiento orgánico ("como hojas que casi recuerdas").

**Áreas de mejora**
- **Carga y peso.** Un sitio con nubes de punto gigantes + audio + imágenes es muy exigente. No se observa un *fallback* claro para: WebGL deshabilitado, GPU débil, Safari antiguo o conexiones lentas. Recomendaría:
  - presupuesto de rendimiento por perfil (móvil/medio/alto);
  - carga diferida de capítulos y de las nubes de puntos;
  - *adaptive quality* (reducir densidad de partículas según `devicePixelRatio`/frame rate);
  - preloader visible con progreso y estimación.
- **Reduced motion.** Al haber tanto movimiento de cámara y partículas, debería respetarse `prefers-reduced-motion` para usuarios con mareo/sensibilidad al movimiento. No es visible en el texto renderizado.
- **Permiso de sensores.** El sitio pide *Motion and Orientation* sensors. Esa petición debe hacerse **después** de una intención clara (p. ej. activar "experiencia con sensores") y no de forma automática; y si el usuario la rechaza, la experiencia debe seguir siendo completa.
- **Modo contraste.** Existe y es un plus, pero conviene verificar que también se aplique a los hotspots y a los textos dentro del lienzo WebGL, no solo al DOM.

### 3.3 Audio / Web Audio API

**Fortalezas**
- La música es el hilo conductor (playlist de ~7 min con *De natura sonoris II* y obras del Salón Musical). El *playlist* cierra muy bien la narrativa.
- El audio reactivo a los shaders es la firma del proyecto.

**Áreas de mejora**
- **Autoplay y entornos silenciosos.** El aviso "Use headphones for the best experience" es correcto, pero el audio debe pausarse siempre que el usuario lo pida y recordar la preferencia en `localStorage`.
- **Sin captions/audio descriptions.** La propia página de accesibilidad dice: *"No extended subtitles and audio descriptions are available."* Los fragmentos de audio de las memorias (2–7 min) deberían tener transcripción/CC, al menos en EN/PL.
- **Controles de volumen/velocidad inaccesibles por teclado.** La página declara: *"Keyboard cannot be used to slide the video material timeline."* Para el material audiovisual del anfiteatro, añadir soporte de teclado (flechas) y `aria-valuetext`.
- **Playlist paralela.** En *The Garden of Memory* el listado de piezas se repite dos veces en el DOM renderizado (probable duplicación para carrusel/adaptación móvil). Conviene verificar que no se dupliquen controles de audio en lectores de pantalla (ocultar duplicados con `aria-hidden`).

### 3.4 Accesibilidad

La ambición es de las mejores que he visto en un proyecto WebGL. **Sin embargo, la declaración de accesibilidad publicada por el propio sitio lista brechas vigentes.** Esto es oro para la revisión porque no hay que adivinarlas:

Según la página oficial de accesibilidad del sitio ([pendereckisgarden.pl/en/accessibility](https://pendereckisgarden.pl/en/accessibility)):

- "The website is in the process of being published." (declaración no finalizada)
- "No extended subtitles and audio descriptions are available."
- "Links incomprehensible without their visual context may occur."
- "The on/off, show/hide status is missing."
- "Keyboard cannot be used to slide the video material timeline."

**Qué hacer (prioridad alta):**
1. **Subtítulos y descripciones de audio** para los materiales de video/audio (Amphitheatre, Garden of Memory).
2. **Estado on/off / show-hide explícito** en todos los controles (`aria-expanded`, `aria-pressed`, `aria-current` en menús).
3. **Soporte de teclado para la línea de tiempo** de video (Home/End, flechas, página), como exige WCAG 2.1.2 *Pause, Stop, Hide* y 2.1.1 *Keyboard*.
4. **Nombres de enlaces más descriptivos** ("Leer: *A Journey to Italy*" en vez de solo "Read more"), para que no dependan del contexto visual.
5. **Publicar una declaración formal de accesibilidad** (WCAG 2.1/A), con fecha y vías de contacto, en vez de "está en proceso".
6. **Contraste del modo contraste**: verificar con axe/Lighthouse que el ratio contraste mínimo se cumpla en todos los estados.
7. **Skip link / enfoque fresco**: tras cerrar un modal de hotspot, devolver el foco al elemento que lo abrió.

### 3.5 Rendimiento y compatibilidad

- **Carga de contenido del SPA.** En el HTML renderizado se aprecia que un solo recorrido trae todo el contenido de *The Maestro's Manor*, *The Park*, *The Music Salon*, *The Amphitheatre*, *The Labirynth*, *The Studio* y *The Garden of Memory* (más de 200 entradas). Esto es **muy probablemente** una carga inicial pesada para una página que solo necesitas para un capítulo. (Inferencia a partir del contenido extraído; conviene medir con Network/Performance.)
- **Imágenes en base64.** En la extracción del DOM aparecen marcadores "Base64-Image-Removed", señal de que algunas imágenes viajan inline (probablemente iconos/thumbnails). Si es así, conviene externalizarlas y servirlas con caché, salvo que sean muy pequeñas.
- **Sin fallback WebGL.** Si el navegador no soporta WebGL (o el usuario desactiva la aceleración por hardware), el sitio cae mal. Un fallback estático con las ilustraciones + contenido textual (que existe) sería un salva-vidas.
- **Recomendación concreta:** ejecutar Lighthouse (móvil y desktop), PageSpeed Insights / CrUX y una prueba real en móvil 3G. Definir un presupuesto: p. ej. LCP < 2.5 s en desktop, < 4 s en móvil 4G.

### 3.6 Internacionalización y contenido

Aquí es donde encontré más ruido visual en la versión en inglés:

| Ubicación | Texto observado | Problema |
|---|---|---|
| Landing en EN | *"The **Centernary** of Regaining Independence"* | Typo → **Centenary** |
| Laberinto | *"Read **moremore** about the Labirynth"* | Palabra duplicada |
| Salón Musical | *"master's **oevre**"* | Typo → **oeuvre** |
| *The Park* (EN) | *Cypryśnik, Laska teściowej, Kasztan jadalny, Szyszki czy ogórki?, Platan, W wieku Profesora, Wejmutka, Ogrody włoskie* | Items en polaco en la versión EN |
| Formulario "Leave a memory" (EN) | *"Twoje wspomnienie zostanie sprawdzone… / Wyrażam zgodę na przetwarzanie…"* | Formulario en polaco dentro de una página EN |

**Acciones:**
- Pasar contenido, formularios y metadatos por una **qAA de i18n** (PL/EN), con *translation memory* y *fallback* al idioma origen si falta traducción.
- Corregir typos en producción (rápido y barato; impacta percepción de calidad).
- Añadir pruebas lingüísticas automatizadas (p. ej. detectar caracteres polacos sin traducir en la ruta `/en`).
- Revisar que las URLs internas de `/en` no apunten a contenido `/pl` y viceversa.

### 3.7 Privacidad, cookies y sensores

- **Banner de cookies no da elección.** El texto dice: *"If you do not accept cookies from this site, please update your browser settings, otherwise no further action has to be taken."* + solo un botón *"Accept privacy policy"*.
  - **Problema:** no hay botón "Rechazar" ni selector de preferencias. Bajo GDPR/ePrivacy, el banner debe permitir **aceptar o rechazar** con igual facilidad; la redacción actual es además confusa y no aclara el carácter del consentimiento.
  - **Acción:** implementar banner con "Aceptar" / "Rechazar" / "Preferencias", y no cargar cookies de analítica hasta el consentimiento explícito.
- **Consentimiento del formulario desalineado.** El checkbox dice con fines de *newsletter y eventos del IAM* mientras el formulario es para "dejar un recuerdo". Son consentimientos distintos: separarlos (uno para publicar el recuerdo, otro opcional para newsletter).
- **Sensores de movimiento/orientación.** Positivo que se pida permiso; debe ser **ópt-in**, con explicación de para qué sirve y desactivarlo sin salir del sitio.
- Enlace de política de privacidad apunta a [iam.pl/en/privacy-policy](https://iam.pl/en/privacy-policy). Verificar que esa política cubra explícitamente este sitio (PCD/3D, audio, sensores, formulario).

### 3.8 SEO y arquitectura técnica

- **Contenido depende mucho del renderizado en cliente.** Buena parte del contenido es inyectada por JS, lo que puede afectar indexación, `LCP`, y los *rich snippets*. Recomendaría **pre-render/SSR** (o static generation) de las páginas de relatos, con `sitemap.xml` y canonical, o al menos `robots.txt` + prerender para crawlers.
- **Metadatos por página.** En las subpáginas (p. ej. `/en/the-maestros-manor/look-at-trees`) sería ideal tener `og:title`, `og:description`, `og:image` y `<title>` únicos por relato; hoy no puedo confirmarlo desde la captura, pero es un punto a auditar.
- **Estructura de URLs.** Slugs legibles (`look-at-trees`, `itll-go-well-for-sure`), bien. Algunos son frases largas; están bien para SEO pero conviene mantenerlos estables (no regenerar al editar título).
- **Contenido caducado.** En el anfiteatro se ve *"String Quartet No. 3 … Available until 31.12.2024"*. Al día de la revisión (2026), esa ventana ya expiró. **Eliminar o archivar** el contenido con fecha, o convertirlo en "histórico".
- **CMS / backend propio.** Es una fortaleza (muy editable), pero también un riesgo de mantenimiento. Recomendaría:
  - documentar el esquema de contenido;
  - versionar plantillas y componentes;
  - *CI/lint* para detectar enlaces rotos, contenido sin traducir y contenido con fechas vencidas;
  - backups/entornos de staging.

---

## 4. Roadmap priorizado

### 🔴 P0 — Corregir a producción (esta semana)
1. Quitar/archivar *"Available until 31.12.2024"* (contenido caducado).
2. Banner de cookies: **Aceptar / Rechazar / Preferencias**.
3. Separar consentimiento de newsletter del consentimiento de "dejar un recuerdo".
4. Traducir el formulario a EN (y PL) y todo el contenido del capítulo Park que quedó en polaco.
5. Corregir los typos: *Centenary*, *Read more* (sin "moremore"), *oeuvre*.

### 🟠 P1 — Accesibilidad y robustez (2–4 semanas)
6. Implementar la lista de la página de accesibilidad: CC/subtítulos, descripciones de audio, `aria-expanded`/`aria-pressed`/`aria-disabled`, teclado en timeline de video, enlaces más descriptivos.
7. Publicar declaración formal de accesibilidad WCAG 2.1 A/AA.
8. Fallback sin WebGL + respeto a `prefers-reduced-motion`.
9. Petición de sensores solo bajo acción del usuario y con explicación.
10. Auditoría Lighthouse/PageSpeed mobile+desktop; definir presupuesto de rendimiento.

### 🟡 P2 — Experiencia, SEO y mantenimiento (1–3 meses)
11. *Guided tour* opcional de 5–10 minutos + progreso global de descubrimiento.
12. Estado claro de hotspots bloqueados y *breadcrumbs* en subpáginas.
13. Pre-render/SSR, sitemap, metadatos por página y JSON-LD para las obras/relatos.
14. Búsqueda/filtro entre las >200 entradas y "marcar como leído/guardar".
15. QA i18n automatizado y detección de contenido vencido en el CMS.
16. Telemetría de experiencia (ver métricas abajo).

---

## 5. Métricas que recomiendo medir

- **Descubrimiento:** % de usuarios que alcanzan 100% en *The Maestro's Manor* y por capítulo; duración media; tasa de abandono por capítulo.
- **Audio:** % de usuarios que activan sonido, tiempo medio de escucha, uso del playlist y clics de "Pausa".
- **Exito narrativo:** % que visitan ≥3 relatos de *The Maestro's Manor*; % que entran a *The Park* desde un relato.
- **Rendimiento:** LCP, TBT, CLS (móvil vs desktop), % de sesiones con WebGL deshabilitado o pérdida de FPS (<30fps).
- **Accesibilidad:** porcentaje de completado de pruebas con teclado; uso del modo contraste; incidencias reportadas por lectores de pantalla.
- **i18n/calidad:** % de sesiones EN vs PL; número de cadenas sin traducir detectadas por QA; enlaces rotos (con monitorización).
- **Contenido vivo:** alertas automáticas cuando una pieza tenga fecha de disponibilidad próxima a vencer.

---

## 6. Conclusión

**Penderecki's Garden: The Maestro's Manor** es una experiencia de referencia: visión editorial potente, ejecución WebGL de élite, audio-reactividad memorable y una apuesta por la accesibilidad muy por encima de la media. Merece los premios obtenidos.

Aun así, en 2026 tiene **deuda de mantenimiento**:

- contenido caducado y erratas en EN,
- banner de cookies que no cumple del todo con el modelo de consentimiento,
- brechas de accesibilidad reconocidas por el propio sitio,
- una navegación con algunos ítems "bloqueados" fáciles de confundir con enlaces rotos,
- peso/pre-render de un SPA que probablemente afecta rendimiento y SEO,
- y un contenido bilingüe que quedó a medias en la versión inglesa.

Si lo tratas como un **proyecto vivo** (no como una pieza terminada de 2021), las mejoras P0 + P1 (contenido, consentimiento, accesibilidad) son alcanzables en pocas semanas y harán que la experiencia no solo sea "espectacular", sino también **cuidada, accesible y sostenible**.

---

*Fuentes principales: [Awwwards — Penderecki's Garden](https://www.awwwards.com/sites/pendereckis-garden) · [Huncwot / Awwwards: proceso](https://www.awwwards.com/pendereckis-garden-by-huncwot.html) · [Communication Arts: Huncwot](https://www.commarts.com/webpicks/penderecki-s-garden) · [WebGPU showcase](https://www.webgpu.com/showcase/pendereckis-garden-threejs-point-cloud-photogrammetry/) · [Página de accesibilidad del sitio](https://pendereckisgarden.pl/en/accessibility).*
