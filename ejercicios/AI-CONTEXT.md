# AI context para rutinas

`ai/index.html` y `ai-context.json` son los recursos publicos pensados para ChatGPT y otros LLMs que necesiten crear enlaces de rutinas sin inspeccionar JavaScript.

Fuente principal para modelos con navegacion web basica:

```text
https://eltablerosportclub.com/ejercicios/ai/
```

Fallback JSON estructurado:

```text
https://eltablerosportclub.com/ejercicios/ai-context.json
```

La pagina HTML contiene directamente:

- protocolo exacto del hash compacto `#r?...`;
- algoritmo `base64url UTF-8` compatible con `window.Routines.encode`;
- dias validos;
- formato de cada item `id:series:reps:rest:day:note`;
- catalogo compacto generado desde `data/exercises.json`;
- reglas de duracion y seleccion utiles para LLMs.

No se edita a mano. Para regenerar ambos recursos tras cambiar el catalogo:

```bash
node scripts/generate-ai-context.mjs
```

El generador lee:

```text
ejercicios/data/exercises.json
```

y escribe:

```text
ejercicios/ai-context.json
ejercicios/ai/index.html
```

Prompt recomendado para herramientas externas:

```text
Primero intenta inspeccionar la página HTML de contexto para IA: https://eltablerosportclub.com/ejercicios/ai/. No necesitas inspeccionar JavaScript. Si no puedes abrirla, usa como fallback https://eltablerosportclub.com/ejercicios/ai-context.json y, solo si hace falta, https://eltablerosportclub.com/ejercicios/data/exercises.json. Genera un enlace valido de rutina para https://eltablerosportclub.com/ejercicios/ usando exclusivamente IDs reales y el protocolo de codificacion descrito.
```
