/* eslint.config.mjs — reglas del linter (`npm run lint`).
 *
 * Alcance: el código PROPIO (js/, scripts/, tools/). Las bibliotecas copiadas
 * al repo (three.js, sus loaders/addons y js/vendor) se excluyen: no se editan
 * aquí y sus avisos no dicen nada del proyecto.
 *
 * Criterio: solo reglas que cazan errores reales (variable sin definir, código
 * inalcanzable, clave duplicada, `let` que debía ser `const`, import sin
 * usar). Nada de estilo: de eso se ocupa Prettier (`npm run format:check`).
 */
import globals from 'globals';

export default [
  {
    ignores: [
      'js/three.module.js',
      'js/three.module.min.js',
      'js/vendor/**',
      'js/loaders/**',
      'js/utils/BufferGeometryUtils.js',
      'js/environments/**',
      'node_modules/**',
      '.cache/**',
      '.shots/**',
      '.smoke-tmp/**',
    ],
  },
  {
    files: ['js/**/*.js', 'scripts/**/*.mjs', 'tools/**/*.mjs'],
    languageOptions: {
      ecmaVersion: 2023,
      sourceType: 'module',
      globals: {
        ...globals.browser,
        ...globals.node,
        /* Vendor cargados como <script> clásico (index.html): existen en window. */
        gsap: 'readonly',
        ScrollTrigger: 'readonly',
        CustomEase: 'readonly',
        SplitText: 'readonly',
        d3: 'readonly',
        Lenis: 'readonly',
      },
    },
    rules: {
      'no-undef': 'error',
      'no-redeclare': 'error',
      'no-dupe-keys': 'error',
      'no-duplicate-case': 'error',
      'no-unreachable': 'error',
      'no-self-assign': 'error',
      'no-shadow-restricted-names': 'error',
      'no-unused-vars': ['warn', { args: 'none', caughtErrors: 'none' }],
      'no-constant-condition': 'warn',
      'no-empty': ['warn', { allowEmptyCatch: true }],
      'no-cond-assign': 'warn',
      'no-fallthrough': 'warn',
      'no-useless-escape': 'warn',
      'no-var': 'warn',
      'prefer-const': 'warn',
      eqeqeq: ['warn', 'smart'],
    },
  },
  /* quotes.js es un <script> clásico que define window.QUOTES. */
  { files: ['js/quotes.js'], languageOptions: { sourceType: 'script' } },
];
