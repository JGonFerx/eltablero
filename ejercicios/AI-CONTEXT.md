# AI context para rutinas

`ai-context.json` es el recurso publico pensado para ChatGPT y otros LLMs que necesiten crear enlaces de rutinas sin inspeccionar JavaScript.

URL publica prevista:

```text
https://eltablerosportclub.com/ejercicios/ai-context.json
```

El fichero contiene:

- protocolo exacto del hash compacto `#r?...`;
- algoritmo `base64url UTF-8` compatible con `window.Routines.encode`;
- dias validos;
- formato de cada item `id:series:reps:rest:day:note`;
- catalogo compacto generado desde `data/exercises.json`;
- reglas de duracion y seleccion utiles para LLMs.

No se edita a mano. Para regenerarlo tras cambiar el catalogo:

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
```

Prompt recomendado para herramientas externas:

```text
Inspecciona https://eltablerosportclub.com/ejercicios/ai-context.json y genera un enlace valido de rutina para https://eltablerosportclub.com/ejercicios/ usando exclusivamente IDs reales de ese JSON y el protocolo de codificacion que describe.
```
