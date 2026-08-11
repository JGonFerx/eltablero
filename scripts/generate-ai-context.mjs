import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, "..");
const sourcePath = path.join(rootDir, "ejercicios", "data", "exercises.json");
const outputPath = path.join(rootDir, "ejercicios", "ai-context.json");

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

function compactExercise(exercise) {
  return {
    id: exercise.id,
    name: exercise.nombre,
    alternateName: exercise.nombreAlternativo || "",
    description: exercise.descripcion || "",
    category: exercise.categoria || "",
    difficulty: exercise.dificultad || "",
    strengthType: exercise.tipoFuerza || "",
    mechanics: exercise.mecanica || "",
    bodyPart: exercise.parteCuerpo || "",
    primaryGroup: exercise.grupoMuscular || "",
    muscleGroups: Array.isArray(exercise.gruposMusculares) ? exercise.gruposMusculares : [],
    primaryMuscles: Array.isArray(exercise.musculosPrincipales) ? exercise.musculosPrincipales : [],
    secondaryMuscles: Array.isArray(exercise.musculosSecundarios) ? exercise.musculosSecundarios : [],
    equipment: Array.isArray(exercise.equipamiento) ? exercise.equipamiento : [],
    goals: Array.isArray(exercise.objetivos) ? exercise.objetivos : [],
    bodyweight: Boolean(exercise.esPesoCorporal),
    unilateral: Boolean(exercise.esUnilateral),
  };
}

const context = {
  version: 1,
  purpose: "Contexto estático para que ChatGPT u otros LLMs generen enlaces compactos de rutinas de El Tablero Sport Club sin inspeccionar JavaScript.",
  canonicalUrl: "https://eltablerosportclub.com/ejercicios/ai-context.json",
  appBaseUrl: "https://eltablerosportclub.com/ejercicios/",
  catalogSource: {
    path: "./data/exercises.json",
    sourceMeta: source.meta || {},
    exerciseCount: exercises.length,
    note: "Este archivo se genera desde ejercicios/data/exercises.json mediante scripts/generate-ai-context.mjs. No editar a mano.",
  },
  routineEncoding: {
    hashPrefix: "#r?",
    fullUrlPattern: "https://eltablerosportclub.com/ejercicios/#r?i=<items>&w=<days>&t=<title>&n=<notes>",
    parameters: {
      i: {
        name: "items",
        required: true,
        separator: ",",
        itemFormat: "id:series:reps:rest:day:note",
        trailingEmptyFields: "Se eliminan campos vacíos finales. Por eso note y day pueden faltar si están vacíos.",
        fields: [
          { index: 0, name: "id", encoding: "encodeURIComponent", required: true },
          { index: 1, name: "series", encoding: "base64url UTF-8 sin padding", required: true, maxCharactersInApp: 24 },
          { index: 2, name: "reps", encoding: "base64url UTF-8 sin padding", required: true, maxCharactersInApp: 24 },
          { index: 3, name: "rest", encoding: "base64url UTF-8 sin padding", required: true, description: "Descanso en minutos, sin escribir la unidad.", maxCharactersInApp: 24 },
          { index: 4, name: "day", encoding: "encodeURIComponent", required: true, allowedValues: validDays.map((day) => day.id) },
          { index: 5, name: "note", encoding: "base64url UTF-8 sin padding", required: false, maxCharactersInApp: 110 },
        ],
      },
      w: {
        name: "days",
        required: true,
        encoding: "Días separados por coma. Cada día usa encodeURIComponent.",
        allowedValues: validDays.map((day) => day.id),
        description: "Debe contener los días usados por los items, preferiblemente en orden semanal.",
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
    base64urlUtf8: {
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
    backwardsCompatibility: "No cambies este formato. La web también acepta hashes legacy #rutina?, pero los enlaces nuevos deben usar #r?.",
    logicalRoutineShape: {
      t: "Título opcional de rutina",
      n: "Notas generales opcionales de rutina",
      days: ["lunes", "miercoles", "viernes"],
      items: [
        {
          id: "exercise-id-real",
          series: "3",
          reps: "10",
          rest: "2",
          day: "lunes",
          note: "Nota opcional de máximo 110 caracteres",
        },
      ],
    },
  },
  trainingRulesForLLMs: [
    "Usa exclusivamente IDs presentes en exercises[].id.",
    "Puedes repetir un mismo ejercicio si tiene sentido.",
    "Todos los items deben tener id, series, reps, rest y day.",
    "El descanso se expresa en minutos y el valor rest no debe incluir la palabra min.",
    "Las notas por ejercicio son opcionales y deben tener como máximo 110 caracteres.",
    "Incluye en w todos los días usados por los ejercicios.",
    "Ordena los días según validDays.",
    "Para estimar duración: segundos por ejercicio = (series × repeticiones × 2.5) + (series × descanso_minutos × 60 × 1.2).",
    "Duración por día = suma de segundos de los ejercicios del día / 60, redondeada al minuto más cercano.",
  ],
  validDays,
  defaults: {
    series: "3",
    reps: "10",
    restMinutes: "2",
    title: "Rutina semanal",
  },
  indexes: {
    groups: uniqueSorted(exercises.flatMap((exercise) => [
      exercise.grupoMuscular,
      ...(Array.isArray(exercise.gruposMusculares) ? exercise.gruposMusculares : []),
    ])),
    equipment: uniqueSorted(exercises.flatMap((exercise) => (
      Array.isArray(exercise.equipamiento) && exercise.equipamiento.length ? exercise.equipamiento : ["Peso corporal"]
    ))),
    difficulties: uniqueSorted(exercises.map((exercise) => exercise.dificultad)),
    categories: uniqueSorted(exercises.map((exercise) => exercise.categoria)),
    bodyParts: uniqueSorted(exercises.map((exercise) => exercise.parteCuerpo)),
  },
  exercises: exercises.map(compactExercise),
};

fs.writeFileSync(outputPath, `${JSON.stringify(context, null, 2)}\n`, "utf8");
console.log(`AI context generated: ${path.relative(rootDir, outputPath)} (${context.exercises.length} exercises)`);
