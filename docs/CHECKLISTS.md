# Listas de referencia: qué revisar siempre

Dos preguntas distintas, dos respuestas distintas:

1. **Trabajo de front-end en general** — listas maduras y consensuadas.
2. **Trabajo hecho con IA** — más nuevo, y el riesgo no es el mismo.

---

## 1. Front-end: las que valen la pena

### Front-End Checklist — la más completa

<https://frontendchecklist.io> · [GitHub](https://github.com/thedaviddias/Front-End-Checklist) (74k ★, MIT)

350+ reglas en HTML, CSS, JS, rendimiento (43), accesibilidad (95), SEO (94),
seguridad, privacidad, i18n. Cada regla tiene prioridad: **Critical / High /
Medium / Low**, que es lo que la hace usable — sin eso, 350 reglas paralizan.

Trae listas ya montadas por objetivo: *Launch*, *SEO Audit*, *Performance Quick
Wins*, *Accessibility Essentials*. Y expone un **servidor MCP**
(`https://mcp.frontendchecklist.io`) para conectarla a un agente.

### Accesibilidad

| Recurso | Para qué |
|---|---|
| [A11Y Project Checklist](https://www.a11yproject.com/checklist/) | La más legible. Organizada por rol y por zona (contenido, formularios, color, móvil). Empieza por aquí. |
| [WebAIM WCAG 2 Checklist](https://webaim.org/standards/wcag/checklist) | Plain-English, imprimible, trazable al criterio exacto. |
| [W3C: How to Meet WCAG](https://www.w3.org/WAI/WCAG22/quickref/) | La fuente canónica. Filtrable por nivel A/AA/AAA. Para zanjar discusiones. |

**Nivel objetivo normal: WCAG 2.2 nivel AA.** Es lo que exige la mayoría de
normativa pública.

### Rendimiento: Core Web Vitals

Tres métricas, medidas en el **percentil 75 de usuarios reales** (no Lighthouse):

| Métrica | Qué mide | Bien |
|---|---|---|
| **LCP** | Cuánto tarda en pintarse el elemento más grande | ≤ 2,5 s |
| **INP** | Retardo entre que tocas algo y la página responde | ≤ 200 ms |
| **CLS** | Cuánto se mueve el contenido solo | ≤ 0,1 |

Un dato útil para calibrar expectativas: según el Web Almanac 2025, **solo el
48% de los sitios móviles** pasa las tres a la vez. LCP es la que más falla.

> Ojo con la trampa clásica: **tu puntuación de Lighthouse no son tus Core Web
> Vitals.** Lighthouse es laboratorio; Google puntúa con datos de campo (CrUX).

### Seguridad web

- [OWASP Top 10](https://owasp.org/www-project-top-ten/) — el clásico.
- [OWASP Cheat Sheet Series](https://cheatsheetseries.owasp.org/) — cómo
  arreglar cada cosa, no solo qué buscar.
- [securityheaders.com](https://securityheaders.com) y
  [Mozilla Observatory](https://observatory.mozilla.org) — un escaneo, 30 s.

---

## 2. Cuando el código lo escribe una IA

Aquí hay que separar dos cosas que suelen confundirse.

### 2.a. Si tu producto *incorpora* un LLM

[**OWASP Top 10 for LLM Applications (2025)**](https://genai.owasp.org/) — es
el estándar de facto:

| | Riesgo |
|---|---|
| LLM01 | Prompt injection *(el nº1 dos ediciones seguidas)* |
| LLM02 | Divulgación de información sensible |
| LLM03 | Cadena de suministro |
| LLM04 | Envenenamiento de datos y modelo |
| LLM05 | Tratamiento inseguro de la salida |
| LLM06 | Agencia excesiva |
| LLM07 | Fuga del prompt de sistema |
| LLM08 | Debilidades de vectores y embeddings (RAG) |
| LLM09 | Desinformación |
| LLM10 | Consumo sin límite |

Hay también un **OWASP Top 10 for Agentic AI** (AG01–AG10) para sistemas con
agentes que ejecutan acciones.

### 2.b. Si usas IA para *escribir* código — que es tu caso

No hay un estándar consolidado todavía. Pero de esta auditoría salieron cinco
reglas que sí puedo justificar con lo que pasó:

**1. Un test que nunca ha fallado no prueba nada.**
Cada arreglo se validó revirtiéndolo para ver que la comprobación fallaba con el
mensaje correcto. Sin eso, un test puede estar comprobando nada — y con IA es
fácil generar mucho test decorativo.

**2. Desconfía de las métricas antes que del código.**
El RMSE del hero daba 17% de diferencia y parecía un desastre. La moneda gira:
la métrica medía la fase del giro, no la calidad. Si me guío por el número, o
descarto una optimización buena o "arreglo" algo que no está roto.

**3. Distingue defecto de decisión deliberada.**
Las 99 marcas tabulables parecían un descuido; el código explicaba que eran el
equivalente de teclado de las partículas 3D. **Lo peligroso de una IA no es que
no encuentre cosas: es que "arregle" las que estaban bien a propósito.** Antes de
tocar algo que parece raro, busca por qué está así.

**4. Verifica en ejecución, no leyendo.**
El foco escapándose del modal no se ve leyendo el CSS ni con un linter. Salió
tabulando de verdad en un navegador. Los 3 falsos positivos de contraste también
se cayeron solo al comprobarlos uno a uno.

**5. Que el agente diga qué NO hizo y por qué.**
Un informe que solo lista victorias es un informe incompleto. Aquí quedó escrito
que Three.js no se tocó (exigiría build obligatorio) y que Safari/iOS y los
lectores de pantalla reales no se pueden verificar desde un sandbox.

> Y la de fondo: **el cuello de botella con IA ya no es escribir código, es
> revisarlo.** El volumen que genera supera lo que un humano revisa con
> atención. Por eso la inversión que más rinde no es una lista más larga, sino
> comprobaciones ejecutables — como `npm run audit` en este repo.

---

## Para este proyecto

Ver `docs/AUDITORIA.md` para el estado real. En resumen:

- `npm run audit` cubre lo automatizable: responsive, contraste, foco, áreas
  táctiles, enlaces, SEO/OG, jerarquía, paradas de tabulador.
- `npm audit` cubre las dependencias.
- Lo que **ninguna lista ni script sustituye**: Safari/iOS real y un lector de
  pantalla real. Siguen pendientes y es honesto decirlo.
