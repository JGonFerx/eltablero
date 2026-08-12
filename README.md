# El Tablero Sport Club

Web corporativa estatica para **El Tablero Sport Club**, un centro deportivo con gimnasio, CrossFit, Hybrid, sala funcional y padel.

El proyecto no tiene backend, no tiene build y no requiere dependencias para visualizarse. Debe funcionar desde la raiz con:

```bash
python -m http.server 8000
```

Si el entorno usa `python3`:

```bash
python3 -m http.server 8000
```

URL local principal:

```text
http://localhost:8000/
```

## Estado Actual

La direccion visual actual es premium, oscura, editorial y fotografica. La Home se apoya en una fachada nocturna real/generada del club con rotulos `el tablero`, `FITNESS`, `PADEL`, `CROSSFIT` y `HYBRID`.

Puntos consolidados:

- Header oscuro/transparente sobre la Home.
- Hero inmersivo con zoom y oscurecido por scroll.
- Aparicion escalonada de textos del hero.
- Glows animados permanentes en rotulos.
- Hotspots sobre rotulos para hover especifico.
- Previews de video tipo reel tras mantener hover 2.5s sobre Fitness, Padel, CrossFit o Hybrid.
- Carruseles sincronizados de Gimnasio y Padel dentro del scroll dinamico del hero.
- Cinta horizontal infinita con iconos `types` entre hero y `Espacios del club`.
- Seccion `Espacios del club` simplificada para acceso rapido a tarifas y horario.
- Footer con logo transparente actual y creditos.

## Navegacion Actual

La navegacion superior vigente es:

- `Inicio`
- `Servicios y tarifas`
  - `Gimnasio`
  - `Padel`
- `Horario`
- `Contacto`
- `Reserva pista`

Notas importantes:

- `Servicios y tarifas` es un desplegable de escritorio y acordeon en movil.
- `Gimnasio` y `Padel` concentran espacios, galerias, horarios/clases y tarifas en sus propias paginas indice.
- `Servicios y tarifas` no debe quedarse abierto por click.
- El triangulo del desplegable no debe girar.
- `Reserva pista` debe ir al final como CTA y abre un popup informativo con WhatsApp y llamada; no existe pagina propia de reserva.
- `Contacto` agrupa tambien la ubicacion.
- La ruta antigua `ubicacion/` redirige a `contacto/index.html#visita`.

## Rutas Principales

```text
/
/gimnasio/
/padel/
/horarios/
/contacto/
/aviso-legal/
/privacidad/
/cookies/
```

Rutas de compatibilidad mantenidas como redirecciones:

```text
/ubicacion/ -> /contacto/#visita
/gimnasio/clases-horarios/ -> /gimnasio/#clases-horarios
/padel/clases-horarios/ -> /padel/#clases-horarios
/gimnasio/galeria/ -> /gimnasio/#galeria
/padel/galeria/ -> /padel/#galeria
```

## Arquitectura

```text
/
├── index.html
├── gimnasio/
│   └── index.html
├── padel/
│   └── index.html
├── horarios/
│   └── index.html
├── contacto/
│   └── index.html
├── ubicacion/
│   └── index.html
├── assets/
│   ├── css/
│   ├── js/
│   ├── icons/
│   ├── images/
│   └── videos/
├── imagenes/
├── textos/
└── docs/
```

## CSS y JavaScript

CSS principal:

- `assets/css/tokens.css`: variables base.
- `assets/css/base.css`: reset, tipografia y elementos globales.
- `assets/css/layout.css`: header, navegacion, footer y layout compartido.
- `assets/css/components.css`: botones y componentes reutilizables.
- `assets/css/pages.css`: Home, hero, carruseles, cinta de types y secciones especificas.
- `assets/css/animations.css`: revelados y animaciones generales.

JavaScript principal:

- `assets/js/config.js`: datos operativos centralizados.
- `assets/js/navigation.js`: menu movil y dropdown `Servicios y tarifas`.
- `assets/js/main.js`: header sticky, popup de reserva, bloqueo de drag/contextmenu del hero, scroll dinamico, autoscroll, carruseles y lightbox.
- `assets/js/hero-glow.js`: alineacion de hotspots y estados de glow.
- `assets/js/hero-fitness-preview.js`: previews de video por hover mantenido.
- `assets/js/animations.js`: secuencia de aparicion y reveal por viewport.
- `assets/js/forms.js`: validacion visual de formularios estaticos.

## Assets Clave

Hero:

- `assets/images/hero/home-hero-club-night.webp`
- `assets/images/hero/home-hero-club-night.png`
- `assets/images/hero/home-hero-signs-glow-brand-only.webp`
- `assets/images/hero/home-hero-signs-glow-padel-only.webp`
- `assets/images/hero/home-hero-signs-glow-fitness-crossfit-hybrid-only.webp`

Videos publicados:

- `assets/videos/*-720.mp4`
- `imagenes/*-720.mp4`

Videos fuente sin publicar:

- `videos-originales-sin-usar/`

Marca:

- `assets/images/brand/site-logo-header-white-700.webp`
- `assets/images/brand/site-logo-footer.webp`
- `assets/icons/favicon-192.png`

Carruseles:

- `imagenes/carruselgym/`
- `imagenes/carruselpadel/`
- `imagenes/carruselgym/thumbs/`
- `imagenes/carruselpadel/thumbs/`

Las miniaturas `thumbs/` se usan para previews y grids. Los archivos grandes de `carruselgym/` y `carruselpadel/` se mantienen para lightbox/story.

Cinta de iconos:

- `imagenes/types/fitness.webp`
- `imagenes/types/crossfit.webp`
- `imagenes/types/hybrid.webp`
- `imagenes/types/functional.webp`
- `imagenes/types/padel.webp`
- `imagenes/types/logo_negro_grises_transparente.webp`

Videos:

- `assets/videos/vidfitness-720.mp4`
- `assets/videos/padel-720.mp4`
- `assets/videos/vidcrossfit2-720.mp4`
- `assets/videos/vidcrossfit1-720.mp4`

## Contenido Real Recuperado

Los textos fuente viven en `textos/`.

Documentos relevantes:

- `textos/00_todo_el_contenido.md`
- `textos/01_inicio.md`
- `textos/02_tarifas.md`
- `textos/03_horarios.md`
- `textos/04_padel.md`
- `textos/05_entrenamiento_funcional.md`
- `textos/06_sala_fitness.md`
- `textos/08_contacto_redes.md`
- `textos/09_datos_a_validar.md`

## Datos Pendientes

La web integra informacion recuperada, pero conviene validar antes de publicar:

- tarifas vigentes;
- horarios vigentes;
- numero real de pistas si cambia;
- codigo postal exacto;
- enlace definitivo de Google Maps;
- configuracion definitiva de contacto para reserva por recepcion;
- dominio final y canonicals;
- optimizacion final de imagenes pesadas.

Los datos operativos se centralizan en:

```text
assets/js/config.js
```

## Catalogo de ejercicios (/ejercicios/)

Pagina independiente, no enlazada desde el resto del sitio ni desde el sitemap (marcada `noindex`). Cataloga los 400 ejercicios del plan gratuito de RepDB (`https://repdb.co/free-exercise-dataset`), con textos en espanol, filtro por grupo muscular/dificultad/equipamiento y ficha con instrucciones, consejos e imagenes.

Estructura:

```text
ejercicios/
├── index.html
├── exercises.css
├── exercises.js
├── ai-context.json
├── ai/
│   └── index.html
├── data/exercises.json
├── assets/images/flat/*.webp
├── LICENSE-DATA.md
└── ATTRIBUTION.md
```

Los datos no se editan a mano. Para reimportar una version actualizada del dataset:

```bash
curl -L -o repdb-free.zip \
  https://github.com/sergei-argutin/exercise-dataset/releases/latest/download/repdb-free.zip
unzip repdb-free.zip -d repdb-free
node scripts/import-repdb.js repdb-free
```

El script regenera `ejercicios/data/exercises.json`, copia solo las imagenes `images/flat/` referenciadas por los 400 ejercicios y actualiza `ejercicios/LICENSE-DATA.md` y `ejercicios/ATTRIBUTION.md`. Ignora deliberadamente `upgrade-samples/` (contenido de evaluacion de pago). Al terminar imprime un resumen (ejercicios procesados, con/sin imagen, imagenes copiadas) y lista cualquier referencia de imagen rota en el dataset de origen.

La licencia del dataset (`ejercicios/LICENSE-DATA.md`) exige atribucion visible: el enlace a RepDB vive unicamente en el pie de `/ejercicios/`, no en el resto de la web.

### Contexto para ChatGPT/LLMs

La integracion de crear rutinas con IA no debe pedir a un modelo que interprete `exercises.js` ni `routines.js`.

Fuente principal para modelos con navegacion web basica:

```text
https://jgonferx.github.io/eltablero/ejercicios/ai/
```

Fallback estructurado:

```text
https://jgonferx.github.io/eltablero/ejercicios/ai-context.json
```

La pagina HTML contiene directamente el protocolo, los IDs reales, los dias validos y el catalogo compacto necesario para generar enlaces `#r?...` compatibles con `window.Routines.encode`, sin ejecutar JavaScript. El JSON mantiene la misma informacion en formato estructurado.

`ejercicios/ai-context.json` y `ejercicios/ai/index.html` se generan desde `ejercicios/data/exercises.json`; no se editan a mano. Tras modificar o reimportar el catalogo, regenerarlos con:

```bash
node scripts/generate-ai-context.mjs
```

Para generar URLs del dominio definitivo en lugar de GitHub Pages:

```bash
EL_TABLERO_PUBLIC_BASE_URL=https://eltablerosportclub.com node scripts/generate-ai-context.mjs
```

Mas detalle en `ejercicios/AI-CONTEXT.md`.

## Documento de Continuidad

Antes de seguir con otra cuenta de Codex, leer:

```text
docs/CODEX_HANDOFF.md
```

Ese documento recoge decisiones ya consolidadas, puntos delicados y zonas donde conviene no improvisar.
