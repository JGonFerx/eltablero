import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, "..");
const sourcePath = path.join(rootDir, "ejercicios", "data", "exercises.json");
const routinesPath = path.join(rootDir, "ejercicios", "routines.js");
const jsonOutputPath = path.join(rootDir, "ejercicios", "ai-context.json");
const htmlOutputDir = path.join(rootDir, "ejercicios", "ai");
const htmlOutputPath = path.join(htmlOutputDir, "index.html");

const publicBaseUrl = (process.env.EL_TABLERO_PUBLIC_BASE_URL || "https://eltablerosportclub.com").replace(/\/+$/, "");
const appBaseUrl = `${publicBaseUrl}/ejercicios/`;
const aiHtmlUrl = `${appBaseUrl}ai/`;
const aiJsonUrl = `${appBaseUrl}ai-context.json`;
const catalogJsonUrl = `${appBaseUrl}data/exercises.json`;

const source = JSON.parse(fs.readFileSync(sourcePath, "utf8"));
const exercises = Array.isArray(source.exercises) ? source.exercises : [];

const validDays = [
  { id: "lunes", label: "Lunes", short: "Lun" },
  { id: "martes", label: "Martes", short: "Mar" },
  { id: "miercoles", label: "Miércoles", short: "Mié" },
  { id: "jueves", label: "Jueves", short: "Jue" },
  { id: "viernes", label: "Viernes", short: "Vie" },
  { id: "sabado", label: "Sábado", short: "Sáb" },
  { id: "domingo", label: "Domingo", short: "Dom" },
];

function uniqueSorted(values) {
  return Array.from(new Set(values.filter(Boolean))).sort((a, b) => a.localeCompare(b, "es"));
}

function exerciseEquipment(exercise) {
  return Array.isArray(exercise.equipamiento) && exercise.equipamiento.length
    ? exercise.equipamiento
    : ["Peso corporal"];
}

function compactExercise(exercise) {
  return {
    id: exercise.id,
    name: exercise.nombre,
    primaryGroup: exercise.grupoMuscular || "",
    primaryMuscles: Array.isArray(exercise.musculosPrincipales) ? exercise.musculosPrincipales : [],
    equipment: exerciseEquipment(exercise),
    difficulty: exercise.dificultad || "",
    bodyPart: exercise.parteCuerpo || "",
    category: exercise.categoria || "",
    bodyweight: Boolean(exercise.esPesoCorporal),
  };
}

function escapeHtml(value) {
  return String(value || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function loadRoutines() {
  const code = fs.readFileSync(routinesPath, "utf8");
  const sandbox = {
    window: {},
    btoa: (value) => Buffer.from(value, "binary").toString("base64"),
    atob: (value) => Buffer.from(value, "base64").toString("binary"),
    encodeURIComponent,
    decodeURIComponent,
    URLSearchParams,
  };
  vm.runInNewContext(code, sandbox, { filename: "routines.js" });
  return sandbox.window.Routines;
}

const Routines = loadRoutines();
const routineSpec = Routines.spec || {};

const routineEncoding = {
  sourceOfTruth: "./routines.js",
  specFromSource: routineSpec,
  hashPrefix: routineSpec.hashPrefix || "#r?",
  fullUrlPattern: `${appBaseUrl}#r?i=<items>&w=<days>&t=<title>&n=<notes>`,
  parameters: {
    i: {
      name: "items",
      required: true,
      separator: routineSpec.itemSeparator || ",",
      itemFormat: routineSpec.itemFormat || "id:series:reps:rest:day:note",
      trailingEmptyFields: routineSpec.trailingEmptyFields || "Routines.encode elimina campos vacíos finales. Si note está vacío puede omitirse; si day o campos previos existen deben conservarse las posiciones con dos puntos.",
      fields: [
        { index: 0, name: "id", encoding: "encodeURIComponent", required: true },
        { index: 1, name: "series", encoding: "base64url UTF-8 sin padding", required: true, maxCharactersInApp: 24 },
        { index: 2, name: "reps", encoding: "base64url UTF-8 sin padding", required: true, maxCharactersInApp: 24 },
        { index: 3, name: "rest", encoding: "base64url UTF-8 sin padding", required: "obligatorio salvo si series = 1", description: "Descanso en minutos, sin escribir la unidad. Si series = 1, puede quedar vacío o ser 0.", maxCharactersInApp: 24 },
        { index: 4, name: "day", encoding: "encodeURIComponent", required: true, allowedValues: validDays.map((day) => day.id) },
        { index: 5, name: "note", encoding: "base64url UTF-8 sin padding", required: false, maxCharactersInApp: 110 },
      ],
    },
    w: {
      name: "days",
      required: true,
      encoding: "Días separados por coma. Cada día usa encodeURIComponent.",
      allowedValues: validDays.map((day) => day.id),
      description: "Debe contener los días usados por los items, en orden semanal.",
    },
    t: {
      name: "title",
      required: false,
      encoding: "base64url UTF-8 sin padding",
    },
    n: {
      name: "generalNotes",
      required: false,
      encoding: "base64url UTF-8 sin padding",
    },
  },
  valueEncoding: {
    name: "base64url UTF-8 sin padding",
    algorithm: [
      "Convertir el texto a bytes UTF-8.",
      "Codificar esos bytes en Base64 estándar.",
      "Reemplazar + por -.",
      "Reemplazar / por _.",
      "Eliminar cualquier = final de padding.",
    ],
    browserEquivalent: "btoa(unescape(encodeURIComponent(value))).replace(/\\+/g, '-').replace(/\\//g, '_').replace(/=+$/g, '')",
    nodeEquivalent: "Buffer.from(String(value), 'utf8').toString('base64').replace(/\\+/g, '-').replace(/\\//g, '_').replace(/=+$/g, '')",
  },
  decodeSummary: "La web usa URLSearchParams sobre el hash #r?, separa i por coma, separa cada item por dos puntos, decodifica id/day con decodeURIComponent y series/reps/rest/note/t/n desde base64url UTF-8.",
  backwardsCompatibility: "La web también acepta hashes legacy #rutina?, pero los enlaces nuevos deben usar #r?.",
};

const trainingRulesForLLMs = [
  "Usa exclusivamente IDs presentes en exercises[].id o en el catálogo HTML de /ejercicios/ai/.",
  "Puedes repetir un mismo ejercicio si tiene sentido.",
  "Todos los items deben tener id, series, reps y day.",
  "rest es obligatorio salvo si series = 1. En ejercicios de 1 serie puede ir vacío o como 0.",
  "El descanso se expresa en minutos y el valor rest no debe incluir la palabra min.",
  "Las notas por ejercicio son opcionales y deben tener como máximo 110 caracteres.",
  "Incluye en w todos los días usados por los ejercicios.",
  "Ordena los días según validDays.",
  "Para estimar duración: segundos por ejercicio = (series × repeticiones × 2.5) + (series × descanso_minutos × 60 × 1.2).",
  "Duración por día = suma de segundos de los ejercicios del día / 60, redondeada al minuto más cercano.",
];

const compactExercises = exercises.map(compactExercise);
const sampleRoutine = {
  t: "Rutina de prueba con ñ",
  n: "Notas generales: técnica, control y respiración.",
  days: ["lunes", "miercoles", "viernes"],
  items: [
    { id: compactExercises[0].id, series: "3", reps: "10", rest: "2", day: "lunes", note: "Controla la técnica y evita impulsos." },
    { id: compactExercises[1].id, series: "4", reps: "12", rest: "1.5", day: "miercoles", note: "Última serie con margen." },
    { id: compactExercises[2].id, series: "2", reps: "15", rest: "1", day: "viernes", note: "Rango cómodo, sin dolor." },
  ],
};
const sampleHash = Routines.encode(sampleRoutine);
const sampleDecoded = Routines.decode(sampleHash);

if (
  !sampleDecoded ||
  sampleDecoded.t !== sampleRoutine.t ||
  sampleDecoded.n !== sampleRoutine.n ||
  sampleDecoded.days.join("|") !== sampleRoutine.days.join("|") ||
  sampleDecoded.items.length !== sampleRoutine.items.length ||
  sampleDecoded.items.some((item, index) => {
    const expected = sampleRoutine.items[index];
    return item.id !== expected.id ||
      item.series !== expected.series ||
      item.reps !== expected.reps ||
      item.rest !== expected.rest ||
      item.day !== expected.day ||
      item.note !== expected.note;
  })
) {
  throw new Error("Routines.encode/decode no coincide con el protocolo documentado.");
}

const context = {
  version: 2,
  purpose: "Contexto estático para que ChatGPT u otros LLMs generen enlaces compactos de rutinas de El Tablero Sport Club sin inspeccionar JavaScript.",
  canonicalUrl: aiJsonUrl,
  htmlContextUrl: aiHtmlUrl,
  appBaseUrl,
  catalogUrl: catalogJsonUrl,
  catalogSource: {
    path: "./data/exercises.json",
    sourceMeta: source.meta || {},
    exerciseCount: exercises.length,
    note: "Este archivo se genera desde ejercicios/data/exercises.json mediante scripts/generate-ai-context.mjs. No editar a mano.",
  },
  routineEncoding,
  validDays,
  defaults: {
    series: "3",
    reps: "10",
    restMinutes: "2",
    title: "Rutina semanal",
  },
  trainingRulesForLLMs,
  indexes: {
    groups: uniqueSorted(exercises.flatMap((exercise) => [
      exercise.grupoMuscular,
      ...(Array.isArray(exercise.gruposMusculares) ? exercise.gruposMusculares : []),
    ])),
    equipment: uniqueSorted(exercises.flatMap(exerciseEquipment)),
    difficulties: uniqueSorted(exercises.map((exercise) => exercise.dificultad)),
    categories: uniqueSorted(exercises.map((exercise) => exercise.categoria)),
    bodyParts: uniqueSorted(exercises.map((exercise) => exercise.parteCuerpo)),
  },
  exercises: compactExercises,
  example: {
    routine: sampleRoutine,
    url: `${appBaseUrl}${sampleHash}`,
    decoded: sampleDecoded,
  },
};

function generateHtml() {
  const protocolText = [
    "FUENTE PRINCIPAL PARA LLMs",
    `Base URL de la aplicación: ${appBaseUrl}`,
    `URL de esta página HTML: ${aiHtmlUrl}`,
    `Fallback JSON estructurado: ${aiJsonUrl}`,
    `Fallback catálogo real completo: ${catalogJsonUrl}`,
    "",
    "FORMATO DE URL",
    `URL final = ${appBaseUrl}#r?i=<items>&w=<days>&t=<title>&n=<notes>`,
    "Parámetro i: lista de ejercicios separados por coma.",
    "Formato de cada ejercicio: id:series:reps:rest:day:note",
    "id: encodeURIComponent(id real del catálogo).",
    "series/reps/rest/note/t/n: base64url UTF-8 sin padding.",
    "day: encodeURIComponent(day).",
    "w: días usados separados por coma, en orden semanal.",
    "Días válidos: lunes, martes, miercoles, jueves, viernes, sabado, domingo.",
    "rest es obligatorio salvo si series = 1. En ejercicios de 1 serie puede ir vacío o como 0.",
    "note es opcional; máximo 110 caracteres.",
    "Routines.encode elimina campos vacíos finales, pero los campos previos conservan su posición.",
    "",
    "BASE64URL UTF-8 SIN PADDING",
    "1. Convertir texto a UTF-8.",
    "2. Base64 estándar.",
    "3. Cambiar + por - y / por _.",
    "4. Eliminar = finales.",
    "",
    "REGLAS PARA CREAR RUTINAS",
    ...trainingRulesForLLMs.map((rule) => `- ${rule}`),
    "",
    "EJEMPLO VALIDADO POR Routines.decode",
    `${appBaseUrl}${sampleHash}`,
  ].join("\n");

  const catalogLines = [
    "id | name | primaryGroup | equipment | difficulty | bodyweight | bodyPart | category | primaryMuscles",
    ...compactExercises.map((exercise) => [
      exercise.id,
      exercise.name,
      exercise.primaryGroup,
      exercise.equipment.join("; "),
      exercise.difficulty,
      exercise.bodyweight ? "sí" : "no",
      exercise.bodyPart,
      exercise.category,
      exercise.primaryMuscles.join("; "),
    ].join(" | ")),
  ].join("\n");

  return `<!doctype html>
<html lang="es">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Contexto para IA — Rutinas El Tablero Sport Club</title>
    <meta name="description" content="Catálogo y protocolo para que ChatGPT y otros modelos generen URLs de rutinas compatibles con El Tablero Sport Club.">
    <meta name="robots" content="index, follow">
    <link rel="canonical" href="${escapeHtml(aiHtmlUrl)}">
    <style>
      body{margin:0;background:#fbfaf6;color:#171816;font-family:Arial,system-ui,sans-serif;line-height:1.55}
      main{max-width:1120px;margin:0 auto;padding:32px 20px 56px}
      h1{font-size:32px;margin:0 0 8px}
      h2{font-size:22px;margin:32px 0 10px}
      p{max-width:860px}
      a{color:#9d603e}
      code,pre{font-family:ui-monospace,SFMono-Regular,Consolas,monospace}
      pre{white-space:pre-wrap;word-break:break-word;background:#fff;border:1px solid #e4d8cf;border-radius:16px;padding:18px;overflow:auto}
      .summary{display:grid;grid-template-columns:repeat(auto-fit,minmax(180px,1fr));gap:12px;margin:24px 0}
      .summary div{border:1px solid #e4d8cf;border-radius:14px;background:#fff;padding:14px}
      .label{display:block;color:#8a8178;font-size:12px;text-transform:uppercase;letter-spacing:.08em;font-weight:700}
    </style>
  </head>
  <body>
    <main>
      <h1>Contexto para IA — Rutinas El Tablero Sport Club</h1>
      <p>Esta página contiene el catálogo y protocolo necesarios para que ChatGPT y otros modelos generen URLs de rutinas compatibles con El Tablero Sport Club. No hace falta inspeccionar JavaScript.</p>
      <p>La información fundamental está escrita directamente en este HTML. Si tu herramienta puede leer HTML básico, puede crear enlaces válidos <code>#r?...</code>.</p>

      <section class="summary" aria-label="Resumen">
        <div><span class="label">Base URL</span>${escapeHtml(appBaseUrl)}</div>
        <div><span class="label">Ejercicios</span>${compactExercises.length}</div>
        <div><span class="label">Días válidos</span>${validDays.map((day) => day.id).join(", ")}</div>
      </section>

      <h2>Protocolo de rutinas</h2>
      <pre>${escapeHtml(protocolText)}</pre>

      <h2>Catálogo compacto completo</h2>
      <p>Formato de cada línea: <code>id | name | primaryGroup | equipment | difficulty | bodyweight | bodyPart | category | primaryMuscles</code>.</p>
      <pre>${escapeHtml(catalogLines)}</pre>

      <h2>Fallbacks</h2>
      <p>Si necesitas JSON estructurado, intenta <a href="../ai-context.json">ai-context.json</a>. Si necesitas el catálogo completo original, intenta <a href="../data/exercises.json">data/exercises.json</a>.</p>
    </main>
  </body>
</html>
`;
}

fs.mkdirSync(htmlOutputDir, { recursive: true });
fs.writeFileSync(jsonOutputPath, `${JSON.stringify(context, null, 2)}\n`, "utf8");
fs.writeFileSync(htmlOutputPath, generateHtml(), "utf8");

console.log(`AI JSON generated: ${path.relative(rootDir, jsonOutputPath)} (${context.exercises.length} exercises)`);
console.log(`AI HTML generated: ${path.relative(rootDir, htmlOutputPath)} (${context.exercises.length} exercises)`);
console.log(`Example URL: ${context.example.url}`);
