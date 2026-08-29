# In the Room Where Monetary Policy Happens

Exploración interactiva de 16 años de reuniones de política monetaria en Chile (2000-2015). Un scrollytelling que combina datos textuales con indicadores macroeconómicos tradicionales.

## Stack

- **Three.js** — Renderizado 3D de moneda y puerta del Banco Central
- **GSAP ScrollTrigger** — Animaciones vinculadas al scroll
- **D3.js** — Visualización de datos (timeline, ejes)
- **Lenis** — Scroll suave
- **SplitText** — Animación de texto carácter por carácter

## Cómo ejecutar

```bash
# Con Python
python -m http.server 8000

# Abrir en el navegador
# http://localhost:8000
```

## Estructura del proyecto

```
├── index.html              ← Archivo principal (CSS + JS + Three.js inline)
├── js/
│   ├── quotes.js           ← 100 citas de reuniones del Banco Central
│   ├── three.module.js     ← Three.js core
│   ├── vendor/             ← GSAP, D3, Lenis, SplitText
│   ├── loaders/            ← GLTFLoader, DRACOLoader
│   ├── utils/              ← BufferGeometryUtils
│   ├── controls/           ← OrbitControls
│   ├── environments/       ← RoomEnvironment
│   └── objects/            ← Reflector
├── monedav5-draco.glb      ← Modelo 3D de moneda (Draco compressed)
├── puerta-draco.glb        ← Modelo 3D de puerta (Draco compressed)
└── servidor.bat            ← Script para servidor local en Windows
```

## Secciones del scrollytelling

1. **Hero** — Título con moneda 3D flotante
2. **Puerta** — Transición hacia el interior del Banco Central
3. **Hook** — "¿Qué dice el acta?"
4. **Ejes + Contadores** — Sentimiento hawkish/dovish y estadísticas
5. **Metodología** — Pipeline de procesamiento de texto a datos
6. **Timeline** — Orientación de política monetaria en el tiempo
7. **Citas** — Frases destacadas de los participantes
8. **Cierre** — Conclusión del proyecto

## Datos

Los datos son preliminares (maquetación). El dataset real proviene de transcripciones de reuniones de política monetaria del Banco Central de Chile.

## Licencia

ISC
