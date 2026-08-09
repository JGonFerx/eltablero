(() => {
  "use strict";

  const grid = document.querySelector("[data-exercises-grid]");
  const countLabel = document.querySelector("[data-exercises-count]");
  const emptyState = document.querySelector("[data-exercises-empty]");
  const searchInput = document.querySelector("[data-exercises-search]");
  const backToTopButton = document.querySelector("[data-back-to-top]");
  const printFavoritesButton = document.querySelector("[data-print-favorites]");

  const filtersOpenButton = document.querySelector("[data-filters-open]");
  const catalogTourButton = document.querySelector("[data-catalog-tour]");
  const filtersBadge = document.querySelector("[data-filters-badge]");
  const filtersSummary = document.querySelector("[data-filters-summary]");
  const filtersSummaryText = document.querySelector("[data-filters-summary-text]");
  const filtersClearInline = document.querySelector("[data-filters-clear]");
  const filterPanel = document.querySelector("[data-filter-panel]");
  const filterPanelSheet = document.querySelector("[data-filter-panel-sheet]");
  const filterPanelOriginalParent = filterPanel ? filterPanel.parentElement : null;
  const filterPanelOriginalNext = filterPanel ? filterPanel.nextElementSibling : null;
  const filterFavoritesSwitch = document.querySelector("[data-filter-favorites]");
  const filterGroupList = document.querySelector("[data-filter-group-list]");
  const filterEquipmentList = document.querySelector("[data-filter-equipment-list]");
  const filterEquipmentSearchWrap = document.querySelector("[data-equipment-search-wrap]");
  const filterEquipmentSearch = document.querySelector("[data-filter-equipment-search]");
  const filterPanelApply = document.querySelector("[data-filter-panel-apply]");
  const filterPanelClear = document.querySelector("[data-filter-panel-clear]");
  const routineView = document.querySelector("[data-routine-view]");
  const routineTitle = document.querySelector("[data-routine-title]");
  const routineNote = document.querySelector("[data-routine-note]");
  const routineGrid = document.querySelector("[data-routine-grid]");
  const routineDayFilters = document.querySelector("[data-routine-day-filters]");
  const routineSearchInput = document.querySelector("[data-routine-search]");
  const routineFiltersOpenButton = document.querySelector("[data-routine-filters-open]");
  const routineViewTourButton = document.querySelector("[data-routine-view-tour]");
  const routineFiltersBadge = document.querySelector("[data-routine-filters-badge]");
  const routineFiltersSummary = document.querySelector("[data-routine-filters-summary]");
  const routineFiltersSummaryText = document.querySelector("[data-routine-filters-summary-text]");
  const routineFiltersClearInline = document.querySelector("[data-routine-filters-clear]");
  const routineEmpty = document.querySelector("[data-routine-empty]");
  const routineEditButton = document.querySelector("[data-routine-edit]");
  const routineSaveButton = document.querySelector("[data-routine-save-favorites]");
  const routineDismissButton = document.querySelector("[data-routine-dismiss]");
  const routineFavoritesSection = document.querySelector("[data-routine-favorites]");
  const routineFavoritesList = document.querySelector("[data-routine-favorites-list]");
  const routineFavoritesToggle = document.querySelector("[data-routine-favorites-toggle]");
  const routineFavoritesClose = document.querySelector("[data-routine-favorites-close]");
  const routineFavoritesCount = document.querySelector("[data-routine-favorites-count]");
  const exercisePage = document.querySelector("[data-exercise-page]");
  const exercisePageContent = document.querySelector("[data-exercise-page-content]");
  const exercisePageOriginalParent = exercisePage ? exercisePage.parentElement : null;
  const exercisePageOriginalNext = exercisePage ? exercisePage.nextElementSibling : null;
  const exercisesMain = document.querySelector(".exercises-main");
  const exercisesIntro = document.querySelector(".exercises-intro");
  const exercisesCatalog = document.querySelector(".exercises-catalog");
  const exercisesIntroTools = document.querySelector("[data-exercises-intro-tools]");
  const exercisesCatalogInner = document.querySelector(".exercises-catalog__inner");
  const exercisesSearchbar = document.querySelector("[data-catalog-searchbar]");
  const exercisesResultsBar = document.querySelector(".exercises-results-bar");
  const routineCart = document.querySelector("[data-routine-cart]");
  const routineCartToggle = document.querySelector("[data-routine-cart-toggle]");
  const routineCartPanel = document.querySelector("[data-routine-cart-panel]");
  const routineCartClose = document.querySelector("[data-routine-cart-close]");
  const routineCartCount = document.querySelector("[data-routine-cart-count]");
  const routineCartSummary = document.querySelector("[data-routine-cart-summary]");
  const routineCartList = document.querySelector("[data-routine-cart-list]");
  const routineCartEmpty = document.querySelector("[data-routine-cart-empty]");
  const routineCartClear = document.querySelector("[data-routine-cart-clear]");
  const routineCartView = document.querySelector("[data-routine-cart-view]");
  const routineCartBuilder = document.querySelector("[data-routine-cart-builder]");
  const routineCartTitleInput = document.querySelector("[data-routine-cart-title]");
  const routineCartNoteInput = document.querySelector("[data-routine-cart-note]");
  const routineCartBuilderList = document.querySelector("[data-routine-cart-builder-list]");
  const routineCartGenerate = document.querySelector("[data-routine-cart-generate]");
  const routineCartResult = document.querySelector("[data-routine-cart-result]");
  const routineCartLink = document.querySelector("[data-routine-cart-link]");
  const routineCartCopy = document.querySelector("[data-routine-cart-copy]");
  const routineCartOpen = document.querySelector("[data-routine-cart-open]");
  const routineCartQr = document.querySelector("[data-routine-cart-qr]");
  const routineCartDownloadQr = document.querySelector("[data-routine-cart-download-qr]");
  const routineCartPrint = document.querySelector("[data-routine-cart-print]");
  const routineCartNoteCount = document.querySelector("[data-routine-cart-note-count]");
  const routineQuickApply = document.querySelector("[data-routine-quick-apply]");
  const routineCartAddMore = document.querySelector("[data-routine-cart-add-more]");
  const routineSummaryDays = document.querySelector("[data-routine-summary-days]");
  const routineSummaryExercises = document.querySelector("[data-routine-summary-exercises]");
  const routineSummarySeries = document.querySelector("[data-routine-summary-series]");
  const routineSummaryDuration = document.querySelector("[data-routine-summary-duration]");
  const routineWeekDaysWrap = document.querySelector("[data-routine-week-days]");
  const routineWeekCount = document.querySelector("[data-routine-week-count]");
  const routineCartValidation = document.querySelector("[data-routine-cart-validation]");
  const routineCartPoster = document.querySelector("[data-routine-cart-poster]");
  const routineCartPosterCount = document.querySelector("[data-routine-cart-poster-count]");
  const routineCartPosterDate = document.querySelector("[data-routine-cart-poster-date]");
  const routineCartPosterTitle = document.querySelector("[data-routine-cart-poster-title]");
  const routineCartPosterNote = document.querySelector("[data-routine-cart-poster-note]");
  const routineCartPosterMeta = document.querySelector("[data-routine-cart-poster-meta]");
  const routineCartPosterQr = document.querySelector("[data-routine-cart-poster-qr]");
  const routineCartPosterList = document.querySelector("[data-routine-cart-poster-list]");
  const routineAiPanel = document.querySelector("[data-routine-ai]");
  const routineAiOpenButtons = document.querySelectorAll("[data-routine-ai-open]");
  const routineAiBrief = document.querySelector("[data-routine-ai-brief]");
  const routineAiChatgpt = document.querySelector("[data-routine-ai-chatgpt]");
  const routineAiStatus = document.querySelector("[data-routine-ai-status]");

  if (!grid) {
    return;
  }

  let exercises = [];
  let searchDebounce = null;
  let lastWindowScrollY = window.scrollY;
  let catalogToolsScrollTicking = false;
  let currentExercise = null;
  let exerciseReturnContext = "catalog";
  let routineViewDayFilter = "";
  let routineViewItems = [];
  let filterPanelMode = "catalog";
  let routineFavoritesOpen = false;
  let routineCartTourAutoStarted = false;
  let routineCartTourBuilt = false;
  let routineCartTourActive = false;
  let routineCartTourIndex = 0;
  let routineCartTourPreviousFocus = null;
  let routineCartTourRepositionHandler = null;
  let routineCartTourBackdrop;
  let routineCartTourSpot;
  let routineCartTourPopup;
  let routineCartTourStepLabel;
  let routineCartTourTitle;
  let routineCartTourText;
  let routineCartTourDismissCheckbox;
  let routineCartTourPrevButton;
  let routineCartTourNextButton;
  let routineCartTourCloseButton;
  let catalogTourBuilt = false;
  let catalogTourActive = false;
  let catalogTourIndex = 0;
  let catalogTourPreviousFocus = null;
  let catalogTourRepositionHandler = null;
  let catalogTourBackdrop;
  let catalogTourSpot;
  let catalogTourPopup;
  let catalogTourStepLabel;
  let catalogTourTitle;
  let catalogTourText;
  let catalogTourDismissCheckbox;
  let catalogTourPrevButton;
  let catalogTourNextButton;
  let catalogTourCloseButton;
  let catalogTourAutoStarted = false;
  let routineViewTourBuilt = false;
  let routineViewTourActive = false;
  let routineViewTourIndex = 0;
  let routineViewTourPreviousFocus = null;
  let routineViewTourRepositionHandler = null;
  let routineViewTourBackdrop;
  let routineViewTourSpot;
  let routineViewTourPopup;
  let routineViewTourStepLabel;
  let routineViewTourTitle;
  let routineViewTourText;
  let routineViewTourDismissCheckbox;
  let routineViewTourPrevButton;
  let routineViewTourNextButton;
  let routineViewTourCloseButton;
  let routineViewTourAutoStarted = false;
  let pendingRoutineFavoriteRemoveIndex = null;
  let pendingRoutineFavoriteRemoveTimer = 0;
  let pendingRoutineSaveRemoveId = "";
  let pendingRoutineSaveRemoveTimer = 0;

  const state = {
    q: "",
    grupo: [],
    equipamiento: [],
    favoritos: false,
  };
  const routineFilterState = {
    q: "",
    grupo: [],
    equipamiento: [],
    favoritos: false,
  };
  const routineExercisePickerState = {
    q: "",
    grupo: [],
    equipamiento: [],
    favoritos: false,
  };

  const FAVORITES_KEY = "eltablero:ejercicios:favoritos";
  const ROUTINE_FAVORITES_KEY = "eltablero:ejercicios:rutinas-favoritas";
  const ROUTINE_FAVORITES_DEFAULTS_KEY = "eltablero:ejercicios:rutinas-favoritas-defaults-v1";
  const ROUTINE_CART_KEY = "eltablero:ejercicios:rutina-carrito";
  const ROUTINE_CART_DAYS_KEY = "eltablero:ejercicios:rutina-dias";
  const ROUTINE_CART_TOUR_KEY = "eltablero:ejercicios:rutina-carrito-tour-dismissed";
  const CATALOG_TOUR_KEY = "eltablero:ejercicios:catalogo-tour-dismissed";
  const ROUTINE_VIEW_TOUR_KEY = "eltablero:ejercicios:rutina-compartida-tour-dismissed";
  const ROUTINE_UNASSIGNED_DAY = "";
  const ROUTINE_DEFAULT_SERIES = "3";
  const ROUTINE_DEFAULT_REPS = "10";
  const ROUTINE_DEFAULT_REST = "2";
  const CHATGPT_ROUTINE_URL = "https://chatgpt.com/?q=";
  const ROUTINE_REMOVE_CONFIRM_DELAY = 4500;
  const WEEK_DAYS = [
    { id: "lunes", label: "Lunes", short: "Lun" },
    { id: "martes", label: "Martes", short: "Mar" },
    { id: "miercoles", label: "Miércoles", short: "Mié" },
    { id: "jueves", label: "Jueves", short: "Jue" },
    { id: "viernes", label: "Viernes", short: "Vie" },
    { id: "sabado", label: "Sábado", short: "Sáb" },
    { id: "domingo", label: "Domingo", short: "Dom" },
  ];
  const DEFAULT_ROUTINE_TEMPLATES = [
    {
      title: "Cuerpo completo básico - 3 días",
      note: "Rutina orientativa para principiantes. Prioriza la técnica, usa cargas cómodas y deja al menos un día de descanso entre sesiones.",
      days: ["lunes", "miercoles", "viernes"],
      plan: {
        lunes: ["bodyweight-squat", "db-bench-press", "lat-pulldown", "glute-bridge", "plank"],
        miercoles: ["lunge", "chest-press-machine", "wide-grip-seated-cable-row", "dumbbell-shoulder-press", "sit-ups"],
        viernes: ["goblet-squat", "single-arm-db-row", "dumbbell-tricep-extension", "barbell-curl", "lying-leg-raise"],
      },
    },
    {
      title: "Cuerpo completo básico - 4 días",
      note: "Plan semanal sencillo para ganar constancia. Mantén un ritmo controlado, sin llegar al fallo, y ajusta cargas si la técnica se degrada.",
      days: ["lunes", "martes", "jueves", "viernes"],
      plan: {
        lunes: ["leg-press", "chest-press-machine", "lat-pulldown", "glute-bridge", "plank"],
        martes: ["bodyweight-squat", "wide-grip-seated-cable-row", "dumbbell-shoulder-press", "seated-leg-curl", "sit-ups"],
        jueves: ["goblet-squat", "db-bench-press", "single-arm-db-row", "bodyweight-good-morning", "lying-leg-raise"],
        viernes: ["lunge", "cable-chest-press", "lat-pulldown", "dumbbell-calf-raise", "plank"],
      },
    },
    {
      title: "Cuerpo completo básico - 5 días",
      note: "Rutina base para practicar los patrones principales con volumen moderado. Descansa lo necesario y aumenta la carga solo cuando el movimiento sea estable.",
      days: ["lunes", "martes", "miercoles", "jueves", "viernes"],
      plan: {
        lunes: ["bodyweight-squat", "chest-press-machine", "wide-grip-seated-cable-row", "plank"],
        martes: ["leg-press", "dumbbell-shoulder-press", "lat-pulldown", "sit-ups"],
        miercoles: ["goblet-squat", "db-bench-press", "single-arm-db-row", "glute-bridge"],
        jueves: ["lunge", "cable-chest-press", "seated-leg-curl", "lying-leg-raise"],
        viernes: ["bodyweight-good-morning", "lat-pulldown", "dumbbell-tricep-extension", "barbell-curl"],
      },
    },
  ];

  function loadFavorites() {
    try {
      const raw = window.localStorage.getItem(FAVORITES_KEY);
      const ids = raw ? JSON.parse(raw) : [];
      return new Set(Array.isArray(ids) ? ids : []);
    } catch (error) {
      return new Set();
    }
  }

  const favorites = loadFavorites();
  let routineCartKeyCounter = 0;
  let routineCartDays = loadRoutineCartDays();
  let routineCartItems = loadRoutineCart();
  let routineCartSelectedIds = new Set();
  let routineTouchDrag = null;
  let routineDayDropTray = null;

  function saveFavorites() {
    try {
      window.localStorage.setItem(FAVORITES_KEY, JSON.stringify(Array.from(favorites)));
    } catch (error) {
      /* almacenamiento no disponible (navegación privada, cuota, etc.) */
    }
  }

  function loadRoutineFavorites() {
    try {
      const raw = window.localStorage.getItem(ROUTINE_FAVORITES_KEY);
      const routines = raw ? JSON.parse(raw) : [];
      return Array.isArray(routines) ? routines : [];
    } catch (error) {
      return [];
    }
  }

  function saveRoutineFavorites(routines) {
    try {
      window.localStorage.setItem(ROUTINE_FAVORITES_KEY, JSON.stringify(routines));
    } catch (error) {
      /* almacenamiento no disponible */
    }
  }

  function clearRoutineFavoriteRemoveConfirmation(render = true) {
    pendingRoutineFavoriteRemoveIndex = null;
    if (pendingRoutineFavoriteRemoveTimer) {
      window.clearTimeout(pendingRoutineFavoriteRemoveTimer);
      pendingRoutineFavoriteRemoveTimer = 0;
    }
    if (render) {
      renderRoutineFavorites();
    }
  }

  function clearRoutineSaveRemoveConfirmation(update = true) {
    pendingRoutineSaveRemoveId = "";
    if (pendingRoutineSaveRemoveTimer) {
      window.clearTimeout(pendingRoutineSaveRemoveTimer);
      pendingRoutineSaveRemoveTimer = 0;
    }
    if (update && isRoutineHash(location.hash) && window.Routines) {
      updateRoutineSaveButton(window.Routines.decode(location.hash));
    }
  }

  function buildDefaultRoutine(template) {
    const items = template.days.flatMap((day) =>
      (template.plan[day] || []).map((id) => ({
        id,
        series: ROUTINE_DEFAULT_SERIES,
        reps: ROUTINE_DEFAULT_REPS,
        rest: ROUTINE_DEFAULT_REST,
        day,
      }))
    );
    return {
      t: template.title,
      n: template.note,
      days: template.days,
      items,
    };
  }

  function seedDefaultRoutineFavorites() {
    if (!window.Routines) {
      return;
    }
    try {
      if (window.localStorage.getItem(ROUTINE_FAVORITES_DEFAULTS_KEY) === "1") {
        return;
      }
      const currentRoutines = loadRoutineFavorites();
      const existingIds = new Set(currentRoutines.map((routine) => routine && routine.id).filter(Boolean));
      const seededRoutines = DEFAULT_ROUTINE_TEMPLATES.map((template) => {
        const routine = buildDefaultRoutine(template);
        const items = routineEntriesFromRoutine(routine);
        const days = routineDaysForEntries(items, routine.days);
        return {
          id: window.Routines.encode({ t: routine.t, n: routine.n, days, items }),
          title: routine.t,
          note: routine.n,
          days,
          items,
          savedAt: new Date().toISOString(),
          version: 1,
          defaultRoutine: true,
        };
      }).filter((routine) => routine.items.length > 0 && !existingIds.has(routine.id));

      if (seededRoutines.length) {
        saveRoutineFavorites([...seededRoutines, ...currentRoutines]);
      }
      window.localStorage.setItem(ROUTINE_FAVORITES_DEFAULTS_KEY, "1");
    } catch (error) {
      /* almacenamiento no disponible */
    }
  }

  function routineDayMeta(day) {
    if (!day) {
      return { id: ROUTINE_UNASSIGNED_DAY, label: "Sin día definido", short: "Sin día" };
    }
    return WEEK_DAYS.find((item) => item.id === day) || { id: ROUTINE_UNASSIGNED_DAY, label: "Sin día definido", short: "Sin día" };
  }

  function normalizeRoutineCartDays(days) {
    const selected = new Set(Array.isArray(days) ? days : []);
    const normalized = WEEK_DAYS.map((day) => day.id).filter((day) => selected.has(day));
    return normalized.length ? normalized : [WEEK_DAYS[0].id];
  }

  function isRoutineDaySelected(day) {
    return routineCartDays.includes(day);
  }

  function normalizeRoutineDay(day) {
    return isRoutineDaySelected(day) ? day : ROUTINE_UNASSIGNED_DAY;
  }

  function normalizeRoutineCartItem(item) {
    if (typeof item === "string") {
      return {
        key: createRoutineCartItemKey(item),
        id: item,
        series: ROUTINE_DEFAULT_SERIES,
        reps: ROUTINE_DEFAULT_REPS,
        rest: ROUTINE_DEFAULT_REST,
        day: ROUTINE_UNASSIGNED_DAY,
      };
    }

    return {
      key: item && (item.key || item.k) ? String(item.key || item.k) : createRoutineCartItemKey(item && (item.id || item.i)),
      id: item && (item.id || item.i) ? item.id || item.i : "",
      series: item && (item.series || item.s) ? item.series || item.s : ROUTINE_DEFAULT_SERIES,
      reps: item && (item.reps || item.r) ? item.reps || item.r : ROUTINE_DEFAULT_REPS,
      rest: item && (item.rest || item.d) ? item.rest || item.d : ROUTINE_DEFAULT_REST,
      day: normalizeRoutineDay(item && (item.day || item.w) ? item.day || item.w : ROUTINE_UNASSIGNED_DAY),
    };
  }

  function normalizeRoutineEntry(item) {
    if (typeof item === "string") {
      return {
        key: createRoutineCartItemKey(item),
        id: item,
        series: ROUTINE_DEFAULT_SERIES,
        reps: ROUTINE_DEFAULT_REPS,
        rest: ROUTINE_DEFAULT_REST,
        day: ROUTINE_UNASSIGNED_DAY,
      };
    }

    const day = item && (item.day || item.w) ? item.day || item.w : ROUTINE_UNASSIGNED_DAY;
    const isValidDay = WEEK_DAYS.some((entry) => entry.id === day);
    return {
      key: item && (item.key || item.k) ? String(item.key || item.k) : createRoutineCartItemKey(item && (item.id || item.i)),
      id: item && (item.id || item.i) ? item.id || item.i : "",
      series: item && (item.series || item.s) ? item.series || item.s : ROUTINE_DEFAULT_SERIES,
      reps: item && (item.reps || item.r) ? item.reps || item.r : ROUTINE_DEFAULT_REPS,
      rest: item && (item.rest || item.d) ? item.rest || item.d : ROUTINE_DEFAULT_REST,
      day: isValidDay ? day : ROUTINE_UNASSIGNED_DAY,
    };
  }

  function routineEntriesFromRoutine(routine) {
    if (!routine) {
      return [];
    }
    const source = Array.isArray(routine.items)
      ? routine.items
      : Array.isArray(routine.e)
        ? routine.e.map((id) => ({ id }))
        : [];
    return withRoutineCartItemKeys(source
      .map(normalizeRoutineEntry)
      .filter((item) => {
        return item.id && getExerciseById(item.id);
      }));
  }

  function loadRoutineCartDays() {
    try {
      const raw = window.localStorage.getItem(ROUTINE_CART_DAYS_KEY);
      return normalizeRoutineCartDays(raw ? JSON.parse(raw) : []);
    } catch (error) {
      return normalizeRoutineCartDays([]);
    }
  }

  function saveRoutineCartDays() {
    try {
      window.localStorage.setItem(ROUTINE_CART_DAYS_KEY, JSON.stringify(routineCartDays));
    } catch (error) {
      /* almacenamiento no disponible */
    }
  }

  function loadRoutineCart() {
    try {
      const raw = window.localStorage.getItem(ROUTINE_CART_KEY);
      const items = raw ? JSON.parse(raw) : [];
      if (!Array.isArray(items)) {
        return [];
      }
      return withRoutineCartItemKeys(items
        .map(normalizeRoutineCartItem)
        .filter((item) => {
          return item.id && getExerciseById(item.id);
        }));
    } catch (error) {
      return [];
    }
  }

  function saveRoutineCart() {
    try {
      window.localStorage.setItem(ROUTINE_CART_KEY, JSON.stringify(routineCartItems));
    } catch (error) {
      /* almacenamiento no disponible */
    }
  }

  function sanitizeRoutineValue(value) {
    return String(value).trim().replace(/\s+/g, " ").slice(0, 24);
  }

  function createRoutineCartItemKey(id) {
    routineCartKeyCounter += 1;
    const slug = String(id || "ejercicio").replace(/[^a-z0-9_-]+/gi, "-").replace(/^-+|-+$/g, "").slice(0, 48) || "ejercicio";
    return `rutina-${Date.now().toString(36)}-${routineCartKeyCounter}-${slug}`;
  }

  function withRoutineCartItemKeys(items) {
    const seen = new Set();
    return items.map((item) => {
      let key = item.key ? String(item.key) : createRoutineCartItemKey(item.id);
      while (seen.has(key)) {
        key = createRoutineCartItemKey(item.id);
      }
      seen.add(key);
      return { ...item, key };
    });
  }

  function getRoutineCartItem(key) {
    return routineCartItems.find((item) => item.key === key);
  }

  function clearRoutineCartValidation() {
    if (routineCartValidation) {
      routineCartValidation.hidden = true;
      routineCartValidation.textContent = "";
    }
  }

  function setRoutineCartValidation(message) {
    if (!routineCartValidation) {
      return;
    }
    routineCartValidation.textContent = message;
    routineCartValidation.hidden = false;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    routineCartValidation.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "center" });
  }

  function hasRoutineValue(value) {
    return parseRoutineNumber(value) > 0;
  }

  function hasCompleteRoutinePrescription(item) {
    return hasRoutineValue(item.series) && hasRoutineValue(item.reps) && hasRoutineValue(item.rest);
  }

  function updateRoutineCartSetting(itemKey, key, value) {
    const item = getRoutineCartItem(itemKey);
    if (!item) {
      return;
    }
    item[key] = key === "day" ? normalizeRoutineDay(value) : sanitizeRoutineValue(value);
    clearRoutineCartValidation();
    saveRoutineCart();
    updateRoutineCartBuilderSummary();
    if (routineCartResult) {
      routineCartResult.hidden = true;
    }
  }

  function parseRoutineNumber(value) {
    const match = String(value || "").replace(",", ".").match(/\d+(?:\.\d+)?/);
    return match ? Number(match[0]) : 0;
  }

  function routineItemSeconds(item) {
    const series = parseRoutineNumber(item.series);
    const reps = parseRoutineNumber(item.reps);
    const restMinutes = parseRoutineNumber(item.rest);
    return series * reps * 2.5 + series * restMinutes * 60 * 1.2;
  }

  function routineDayDuration(day) {
    return Math.max(
      0,
      Math.round(
        routineCartItems
          .filter((item) => normalizeRoutineDay(item.day) === day)
          .reduce((total, item) => total + routineItemSeconds(item), 0) / 60
      )
    );
  }

  function updateRoutineCartBuilderSummary() {
    const exerciseCount = routineCartItems.length;
    const seriesTotal = routineCartItems.reduce((total, item) => total + parseRoutineNumber(item.series), 0);
    const durationByDay = routineCartDays
      .map((day) => `<span>${routineDayMeta(day).short} ≈ ${routineDayDuration(day)} min</span>`)
      .join("");

    if (routineSummaryDays) {
      routineSummaryDays.textContent = String(routineCartDays.length);
    }
    if (routineSummaryExercises) {
      routineSummaryExercises.textContent = String(exerciseCount);
    }
    if (routineSummarySeries) {
      routineSummarySeries.textContent = String(seriesTotal);
    }
    if (routineSummaryDuration) {
      routineSummaryDuration.innerHTML = durationByDay || "<span>≈ 0 min</span>";
    }
    if (routineCartNoteCount && routineCartNoteInput) {
      routineCartNoteCount.textContent = String(routineCartNoteInput.value.trim().length);
    }
  }

  function resizeRoutineCartNote() {
    if (!routineCartNoteInput) {
      return;
    }
    routineCartNoteInput.style.height = "auto";
    routineCartNoteInput.style.height = `${routineCartNoteInput.scrollHeight}px`;
  }

  function renderRoutineWeekControls() {
    if (!routineWeekDaysWrap) {
      return;
    }
    routineCartDays = normalizeRoutineCartDays(routineCartDays);
    if (routineWeekCount) {
      routineWeekCount.textContent = routineCartDays.length === 1 ? "1 día" : `${routineCartDays.length} días`;
    }
    routineWeekDaysWrap.innerHTML = WEEK_DAYS
      .map((day) => {
        const selected = routineCartDays.includes(day.id);
        return `<button type="button" data-routine-week-day="${day.id}" aria-pressed="${selected}">${day.short}</button>`;
      })
      .join("");
  }

  function setRoutineWeekDay(day, isSelected) {
    if (!WEEK_DAYS.some((item) => item.id === day)) {
      return;
    }
    if (isSelected) {
      routineCartDays = normalizeRoutineCartDays([...routineCartDays, day]);
    } else if (routineCartDays.length > 1) {
      routineCartDays = normalizeRoutineCartDays(routineCartDays.filter((item) => item !== day));
    }
    routineCartItems = routineCartItems.map((item) => ({ ...item, day: normalizeRoutineDay(item.day) }));
    clearRoutineCartValidation();
    saveRoutineCartDays();
    saveRoutineCart();
    if (routineCartResult) {
      routineCartResult.hidden = true;
    }
    renderRoutineCart();
  }

  function applyRoutineQuickValues() {
    const values = {};
    document.querySelectorAll("[data-routine-quick-setting]").forEach((input) => {
      values[input.dataset.routineQuickSetting] = sanitizeRoutineValue(input.value);
    });
    routineCartItems = routineCartItems.map((item) => ({
      ...item,
      series: values.series || item.series,
      reps: values.reps || item.reps,
      rest: values.rest || item.rest,
    }));
    clearRoutineCartValidation();
    saveRoutineCart();
    if (routineCartResult) {
      routineCartResult.hidden = true;
    }
    renderRoutineCart();
  }

  function isFavorite(id) {
    return favorites.has(id);
  }

  function toggleFavorite(id) {
    if (favorites.has(id)) {
      favorites.delete(id);
    } else {
      favorites.add(id);
    }
    saveFavorites();
    syncFavoriteButtons(id);

    if (state.favoritos) {
      renderGrid();
    }
    if (routineFilterState.favoritos && routineView && !routineView.hidden) {
      checkRoutineView({ scrollToTop: false });
    }
  }

  function syncFavoriteButtons(id) {
    document.querySelectorAll(`[data-favorite-toggle="${id}"]`).forEach((button) => {
      button.setAttribute("aria-pressed", String(isFavorite(id)));
    });
  }

  function routineDayExerciseCount(day) {
    return routineCartItems.filter((item) => normalizeRoutineDay(item.day) === day).length;
  }

  function getExerciseById(id) {
    return exercises.find((exercise) => exercise.id === id);
  }

  function isInRoutineCart(id) {
    return routineCartItems.some((item) => item.id === id);
  }

  function routineCartExerciseCount(id) {
    return routineCartItems.filter((item) => item.id === id).length;
  }

  function syncRoutineButtons(id) {
    document.querySelectorAll("[data-routine-toggle]").forEach((button) => {
      const exerciseId = button.dataset.routineToggle;
      if (id && exerciseId !== id) {
        return;
      }
      const selectedCount = routineCartExerciseCount(exerciseId);
      const isSelected = selectedCount > 0;
      const label = button.querySelector("[data-routine-toggle-label]");
      button.setAttribute("aria-pressed", String(isSelected));
      button.classList.toggle("is-added", isSelected);
      if (label) {
        label.textContent = isSelected ? "Añadir otra vez" : "Añadir a rutina";
      }
      const exercise = getExerciseById(exerciseId);
      if (exercise) {
        button.setAttribute(
          "aria-label",
          isSelected
            ? `Añadir otra vez ${exercise.nombre} a la rutina`
            : `Añadir ${exercise.nombre} a la rutina`
        );
      }
    });
  }

  function setRoutineCartOpen(isOpen) {
    if (!routineCart || !routineCartPanel || !routineCartToggle) {
      return;
    }
    if (isOpen) {
      setRoutineFavoritesOpen(false);
    }
    if (!isOpen) {
      setRoutineCartBuilderOpen(false);
    }
    routineCart.dataset.open = String(isOpen);
    routineCartPanel.hidden = !isOpen;
    routineCartToggle.setAttribute("aria-expanded", String(isOpen));
  }

  function setRoutineFavoritesOpen(isOpen) {
    if (!routineFavoritesSection || !routineFavoritesToggle) {
      return;
    }
    const routines = loadRoutineFavorites();
    routineFavoritesOpen = Boolean(isOpen && routines.length);
    routineFavoritesSection.hidden = !routineFavoritesOpen;
    routineFavoritesToggle.setAttribute("aria-expanded", String(routineFavoritesOpen));
    if (routineFavoritesOpen) {
      setRoutineCartOpen(false);
    }
  }

  function setRoutineCartBuilderOpen(isOpen) {
    if (!routineCart || !routineCartBuilder) {
      return;
    }
    if (!isOpen) {
      endRoutineCartTour();
      closeRoutineExercisePreview();
      closeRoutineExercisePicker();
    }
    routineCart.dataset.mode = isOpen ? "builder" : "summary";
    routineCartBuilder.hidden = !isOpen;
    document.body.classList.toggle("has-routine-cart-builder", isOpen);
    if (routineCartView) {
      routineCartView.textContent = "Crear rutina";
    }
    if (isOpen) {
      window.setTimeout(resizeRoutineCartNote, 0);
      window.setTimeout(maybeAutoStartRoutineCartTour, 260);
    }
  }

  function pruneRoutineCartSelection() {
    const validKeys = new Set(routineCartItems.map((item) => item.key));
    routineCartSelectedIds = new Set(Array.from(routineCartSelectedIds).filter((key) => validKeys.has(key)));
  }

  function routineDragIds(anchorKey) {
    const selected = routineCartItems.filter((item) => routineCartSelectedIds.has(item.key)).map((item) => item.key);
    return selected.includes(anchorKey) ? selected : [anchorKey];
  }

  function renderRoutineCartBuilderItem(item, index, dayIndex, dayTotal) {
    const exercise = getExerciseById(item.id);
    if (!exercise) {
      return null;
    }

    item.day = normalizeRoutineDay(item.day);
    const isUnassigned = !item.day;
    const hasMissingPrescription = !hasCompleteRoutinePrescription(item);
    const itemKey = item.key;
    const dragLabel = routineCartSelectedIds.has(itemKey) && routineCartSelectedIds.size > 1
      ? `Arrastrar ${routineCartSelectedIds.size} ejercicios a otro día`
      : `Arrastrar ${exercise.nombre} a otro día`;
    const li = document.createElement("li");
    li.className = `routine-cart__builder-item${routineCartSelectedIds.has(itemKey) ? " is-selected" : ""}${isUnassigned ? " is-unassigned" : ""}${hasMissingPrescription ? " has-missing-prescription" : ""}`;
    li.dataset.routineDay = item.day;
    li.dataset.routineBuilderId = itemKey;
    li.innerHTML = `
      <label class="routine-cart__select" title="Marcar para mover en grupo">
        <input type="checkbox" data-routine-select="${escapeHtml(itemKey)}" ${routineCartSelectedIds.has(itemKey) ? "checked" : ""} aria-label="Marcar ${escapeHtml(exercise.nombre)} para mover en grupo">
        <span aria-hidden="true"></span>
      </label>
      <span class="routine-cart__drag" data-routine-drag-id="${escapeHtml(itemKey)}" role="button" tabindex="0" aria-label="${escapeHtml(dragLabel)}" title="Arrastrar a otro día"><svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="9" cy="5" r="1.45" fill="currentColor"></circle><circle cx="15" cy="5" r="1.45" fill="currentColor"></circle><circle cx="9" cy="12" r="1.45" fill="currentColor"></circle><circle cx="15" cy="12" r="1.45" fill="currentColor"></circle><circle cx="9" cy="19" r="1.45" fill="currentColor"></circle><circle cx="15" cy="19" r="1.45" fill="currentColor"></circle></svg></span>
      <span class="routine-cart__index">${index + 1}</span>
      <span class="routine-cart__builder-copy">
        <span class="routine-cart__builder-title-row">
          <strong>${escapeHtml(exercise.nombre)}</strong>
        </span>
        <span>${escapeHtml(exercise.grupoMuscular)}</span>
      </span>
      <span class="routine-cart__prescription" data-routine-prescription="${escapeHtml(itemKey)}">
        <label>
          <span>Series</span>
          <input type="text" inputmode="numeric" autocomplete="off" maxlength="24" value="${escapeHtml(item.series)}" data-routine-setting="series" aria-label="Series de ${escapeHtml(exercise.nombre)}" aria-invalid="${!hasRoutineValue(item.series)}">
        </label>
        <label>
          <span>Repeticiones</span>
          <input type="text" inputmode="text" autocomplete="off" maxlength="24" value="${escapeHtml(item.reps)}" data-routine-setting="reps" aria-label="Repeticiones de ${escapeHtml(exercise.nombre)}" aria-invalid="${!hasRoutineValue(item.reps)}">
        </label>
        <label>
          <span>Descanso</span>
          <input type="text" inputmode="text" autocomplete="off" maxlength="24" value="${escapeHtml(item.rest)}" data-routine-setting="rest" aria-label="Descanso de ${escapeHtml(exercise.nombre)}" aria-invalid="${!hasRoutineValue(item.rest)}">
        </label>
      </span>
      <span class="routine-cart__builder-controls">
        <button type="button" data-routine-info="${escapeHtml(exercise.id)}" aria-label="Ver detalles de ${escapeHtml(exercise.nombre)}">i</button>
        <button type="button" data-routine-move="-1" data-routine-move-id="${escapeHtml(itemKey)}" ${dayIndex === 0 ? "disabled" : ""} aria-label="Subir ${escapeHtml(exercise.nombre)}">↑</button>
        <button type="button" data-routine-move="1" data-routine-move-id="${escapeHtml(itemKey)}" ${dayIndex === dayTotal - 1 ? "disabled" : ""} aria-label="Bajar ${escapeHtml(exercise.nombre)}">↓</button>
        <button type="button" data-routine-remove="${escapeHtml(itemKey)}" aria-label="Quitar ${escapeHtml(exercise.nombre)}">×</button>
      </span>
    `;
    return li;
  }

  function renderRoutineCartBuilder() {
    if (!routineCartBuilderList) {
      return;
    }

    renderRoutineWeekControls();
    pruneRoutineCartSelection();
    routineCartBuilderList.innerHTML = "";
    const fragment = document.createDocumentFragment();
    let globalIndex = 0;

    const renderDayGroup = (day, entries, isUnassigned) => {
      const meta = routineDayMeta(day);
      const selectedCount = routineCartSelectedIds.size;
      const group = document.createElement("li");
      group.className = `routine-cart__day-group${isUnassigned ? " routine-cart__day-group--unassigned" : ""}`;
      group.dataset.routineDayDrop = day;
      group.innerHTML = `
        <div class="routine-cart__day-head">
          <div>
            <strong>${escapeHtml(meta.label)}</strong>
            <span>${entries.length === 1 ? "1 ejercicio" : `${entries.length} ejercicios`} · ≈ ${routineDayDuration(day)} min</span>
          </div>
          ${selectedCount && !isUnassigned ? `<button type="button" data-routine-move-selected-day="${escapeHtml(day)}">Mover marcados aquí</button>` : ""}
        </div>
        <ol class="routine-cart__day-list" data-routine-day-list="${escapeHtml(day)}"></ol>
      `;
      const list = group.querySelector("[data-routine-day-list]");
      entries.forEach((item, dayIndex) => {
        const row = renderRoutineCartBuilderItem(item, globalIndex, dayIndex, entries.length);
        if (row) {
          globalIndex += 1;
          list.appendChild(row);
        }
      });
      if (entries.length === 0) {
        const empty = document.createElement("li");
        empty.className = "routine-cart__day-empty";
        empty.textContent = isUnassigned ? "Los ejercicios nuevos aparecerán aquí." : "Arrastra ejercicios aquí.";
        list.appendChild(empty);
      }
      fragment.appendChild(group);
    };

    const unassignedEntries = routineCartItems.filter((item) => !normalizeRoutineDay(item.day));
    if (unassignedEntries.length) {
      renderDayGroup(ROUTINE_UNASSIGNED_DAY, unassignedEntries, true);
    }
    routineCartDays.forEach((day) => {
      renderDayGroup(day, routineCartItems.filter((item) => normalizeRoutineDay(item.day) === day), false);
    });

    routineCartBuilderList.appendChild(fragment);
    updateRoutineCartBuilderSummary();
  }

  function renderRoutineCartWithReorderAnimation(movedIds) {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const previousRects = new Map();
    if (routineCartBuilderList && !reduceMotion) {
      routineCartBuilderList.querySelectorAll("[data-routine-builder-id]").forEach((row) => {
        previousRects.set(row.dataset.routineBuilderId, row.getBoundingClientRect());
      });
    }

    renderRoutineCart();

    if (!routineCartBuilderList || reduceMotion || previousRects.size === 0) {
      return;
    }

    const movedSet = new Set(movedIds || []);
    window.requestAnimationFrame(() => {
      routineCartBuilderList.querySelectorAll("[data-routine-builder-id]").forEach((row) => {
        const previous = previousRects.get(row.dataset.routineBuilderId);
        if (!previous) {
          return;
        }
        const current = row.getBoundingClientRect();
        const dx = previous.left - current.left;
        const dy = previous.top - current.top;
        if (Math.abs(dx) > 1 || Math.abs(dy) > 1) {
          row.animate(
            [
              { transform: `translate(${dx}px, ${dy}px)` },
              { transform: "translate(0, 0)" },
            ],
            { duration: 320, easing: "cubic-bezier(0.22, 1, 0.36, 1)" }
          );
        }
        if (movedSet.has(row.dataset.routineBuilderId)) {
          row.classList.add("is-just-moved");
          window.setTimeout(() => row.classList.remove("is-just-moved"), 520);
        }
      });
    });
  }

  function moveRoutineCartItem(itemKey, direction) {
    const item = getRoutineCartItem(itemKey);
    if (!item) {
      return;
    }
    const day = normalizeRoutineDay(item.day);
    const dayItems = routineCartItems.filter((entry) => normalizeRoutineDay(entry.day) === day);
    const dayIndex = dayItems.findIndex((entry) => entry.key === itemKey);
    const targetDayItem = dayItems[dayIndex + direction];
    if (!targetDayItem) {
      return;
    }
    const index = routineCartItems.findIndex((entry) => entry.key === itemKey);
    const target = routineCartItems.findIndex((entry) => entry.key === targetDayItem.key);
    const [moved] = routineCartItems.splice(index, 1);
    routineCartItems.splice(target, 0, moved);
    renderRoutineCartWithReorderAnimation([itemKey]);
    if (routineCartResult) {
      routineCartResult.hidden = true;
    }
  }

  function cleanupRoutineTouchDrag() {
    if (!routineTouchDrag) {
      return;
    }
    const pointerId = routineTouchDrag.pointerId;
    window.clearTimeout(routineTouchDrag.timer);
    if (routineTouchDrag.scrollFrame) {
      window.cancelAnimationFrame(routineTouchDrag.scrollFrame);
    }
    if (routineTouchDrag.ghost) {
      routineTouchDrag.ghost.remove();
    }
    hideRoutineDayDropTray();
    if (routineTouchDrag.handle) {
      if (routineTouchDrag.previousDraggable === null) {
        routineTouchDrag.handle.removeAttribute("draggable");
      } else if (typeof routineTouchDrag.previousDraggable === "string") {
        routineTouchDrag.handle.setAttribute("draggable", routineTouchDrag.previousDraggable);
      }
    }
    document.body.classList.remove("is-routine-touch-dragging");
    document.removeEventListener("pointermove", handleRoutinePointerMove);
    document.removeEventListener("pointerup", finishPointerRoutineTouchDrag);
    document.removeEventListener("pointercancel", cancelPointerRoutineTouchDrag);
    if (routineCartBuilderList) {
      routineCartBuilderList.querySelectorAll(".is-touch-dragging, .is-drop-target").forEach((element) => {
        element.classList.remove("is-touch-dragging", "is-drop-target");
      });
    }
    if (routineTouchDrag.handle && typeof routineTouchDrag.handle.releasePointerCapture === "function" && pointerId !== undefined) {
      try {
        routineTouchDrag.handle.releasePointerCapture(pointerId);
      } catch (error) {
        /* La captura puede estar ya liberada. */
      }
    }
    routineTouchDrag = null;
  }

  function routineTouchPoint(event) {
    const touch = event.touches && event.touches[0] ? event.touches[0] : event.changedTouches && event.changedTouches[0];
    return touch ? { x: touch.clientX, y: touch.clientY } : null;
  }

  function routinePointerPoint(event) {
    return { x: event.clientX, y: event.clientY };
  }

  function createRoutineTouchGhost(ids, point, sourceRow) {
    let ghost;
    if (ids.length > 1) {
      const names = ids
        .map((id) => getRoutineCartItem(id))
        .map((item) => item && getExerciseById(item.id))
        .filter(Boolean)
        .slice(0, 3)
        .map((exercise) => `<span>${escapeHtml(exercise.nombre)}</span>`)
        .join("");
      ghost = document.createElement("div");
      ghost.className = "routine-cart__touch-ghost routine-cart__touch-ghost--stack";
      ghost.innerHTML = `
        <strong>Mover ${ids.length} ejercicios</strong>
        <span class="routine-cart__touch-ghost-list">${names}</span>
      `;
    } else {
      ghost = sourceRow ? sourceRow.cloneNode(true) : document.createElement("div");
      ghost.className = "routine-cart__touch-ghost";
      ghost.removeAttribute("data-routine-builder-id");
      ghost.querySelectorAll("input, button, select, [draggable]").forEach((element) => {
        element.setAttribute("tabindex", "-1");
        element.removeAttribute("draggable");
      });
      if (!sourceRow) {
        ghost.textContent = "Mover 1 ejercicio";
      }
    }
    if (ids.length > 1) {
      const badge = document.createElement("span");
      badge.className = "routine-cart__touch-ghost-count";
      badge.textContent = `${ids.length} ejercicios`;
      ghost.appendChild(badge);
    }
    document.body.appendChild(ghost);
    const baseWidth = ids.length > 1 ? 360 : 420;
    ghost.style.width = `${Math.min(baseWidth, window.innerWidth - 24)}px`;
    positionRoutineTouchGhost(ghost, point);
    return ghost;
  }

  function clearRoutineHtmlDragState() {
    if (!routineCartBuilderList) {
      return;
    }
    routineCartBuilderList.querySelectorAll(".is-dragging, .is-drop-target").forEach((element) => {
      element.classList.remove("is-dragging", "is-drop-target");
    });
    clearRoutineDayDropTrayTarget();
  }

  function showRoutineDayDropTray(ids) {
    hideRoutineDayDropTray();
    if (!routineCartDays.length) {
      return;
    }
    const movingIds = new Set(ids || []);
    const sourceDays = new Set(
      routineCartItems
        .filter((item) => movingIds.has(item.key))
        .map((item) => normalizeRoutineDay(item.day))
    );
    const singleSourceDay = sourceDays.size === 1 ? Array.from(sourceDays)[0] : null;
    const tray = document.createElement("div");
    tray.className = "routine-cart__drop-tray";
    tray.dataset.routineDayDropTray = "";
    tray.setAttribute("aria-label", "Mover ejercicios a un día");
    tray.innerHTML = `
      <span class="routine-cart__drop-tray-label">Soltar en</span>
      <span class="routine-cart__drop-tray-days">
        ${routineCartDays.map((day) => {
          const meta = routineDayMeta(day);
          const count = routineCartItems.filter((item) => normalizeRoutineDay(item.day) === day).length;
          const isCurrent = singleSourceDay === day;
          return `
            <button type="button" data-routine-day-drop="${escapeHtml(day)}" class="${isCurrent ? "is-current-day" : ""}" aria-label="Mover a ${escapeHtml(meta.label)}">
              <strong>${escapeHtml(meta.short)}</strong>
              <span>${count}</span>
            </button>
          `;
        }).join("")}
      </span>
    `;
    document.body.appendChild(tray);
    routineDayDropTray = tray;
    document.body.classList.add("has-routine-day-drop-tray");
    window.requestAnimationFrame(() => tray.classList.add("is-visible"));
  }

  function hideRoutineDayDropTray() {
    if (!routineDayDropTray) {
      return;
    }
    routineDayDropTray.remove();
    routineDayDropTray = null;
    document.body.classList.remove("has-routine-day-drop-tray");
  }

  function clearRoutineDayDropTrayTarget() {
    if (!routineDayDropTray) {
      return;
    }
    routineDayDropTray.querySelectorAll("[data-routine-day-drop]").forEach((element) => {
      element.classList.remove("is-drop-target");
    });
  }

  function trayDropTargetFromPoint(point) {
    if (!routineDayDropTray || !point) {
      return null;
    }
    return Array.from(routineDayDropTray.querySelectorAll("[data-routine-day-drop]")).find((element) => {
      const rect = element.getBoundingClientRect();
      return point.x >= rect.left && point.x <= rect.right && point.y >= rect.top && point.y <= rect.bottom;
    }) || null;
  }

  function positionRoutineTouchGhost(ghost, point) {
    if (!ghost || !point) {
      return;
    }
    const isTouch = routineTouchDrag && routineTouchDrag.pointerType === "touch";
    const isStack = ghost.classList.contains("routine-cart__touch-ghost--stack");
    const offsetX = isTouch ? -ghost.offsetWidth / 2 : isStack ? -22 : -24;
    const offsetY = isTouch ? -28 : isStack ? -18 : -24;
    const x = Math.max(12, Math.min(window.innerWidth - ghost.offsetWidth - 12, point.x + offsetX));
    const y = Math.max(12, Math.min(window.innerHeight - ghost.offsetHeight - 12, point.y + offsetY));
    ghost.style.transform = `translate3d(${x}px, ${y}px, 0)`;
  }

  function routineTouchScrollContainer() {
    return routineCartPanel && routineCartPanel.scrollHeight > routineCartPanel.clientHeight
      ? routineCartPanel
      : document.scrollingElement;
  }

  function updateRoutineTouchAutoScroll(point) {
    if (!routineTouchDrag || !routineTouchDrag.active || !point) {
      return;
    }
    const container = routineTouchScrollContainer();
    if (!container) {
      return;
    }
    const rect = container === document.scrollingElement
      ? { top: 0, bottom: window.innerHeight }
      : container.getBoundingClientRect();
    const edge = 72;
    const maxSpeed = 18;
    let speed = 0;
    if (point.y < rect.top + edge) {
      speed = -Math.ceil(((rect.top + edge - point.y) / edge) * maxSpeed);
    } else if (point.y > rect.bottom - edge) {
      speed = Math.ceil(((point.y - (rect.bottom - edge)) / edge) * maxSpeed);
    }
    routineTouchDrag.scrollSpeed = speed;
    routineTouchDrag.lastPoint = point;
    if (!speed || routineTouchDrag.scrollFrame) {
      return;
    }
    const tick = () => {
      if (!routineTouchDrag || !routineTouchDrag.active || !routineTouchDrag.scrollSpeed) {
        if (routineTouchDrag) {
          routineTouchDrag.scrollFrame = 0;
        }
        return;
      }
      container.scrollTop += routineTouchDrag.scrollSpeed;
      markRoutineTouchDropTarget(routineTouchDrag.lastPoint);
      routineTouchDrag.scrollFrame = window.requestAnimationFrame(tick);
    };
    routineTouchDrag.scrollFrame = window.requestAnimationFrame(tick);
  }

  function routineDropGroupFromPoint(point) {
    if (!point) {
      return null;
    }
    const trayTarget = trayDropTargetFromPoint(point);
    if (trayTarget) {
      return trayTarget;
    }
    const ghost = routineTouchDrag && routineTouchDrag.ghost;
    const ghostRect = ghost ? ghost.getBoundingClientRect() : null;

    let bestGroup = null;
    let bestArea = 0;
    const groups = routineCartBuilderList
      ? Array.from(routineCartBuilderList.querySelectorAll("[data-routine-day-drop]")).filter((group) => group.dataset.routineDayDrop)
      : [];

    groups.forEach((group) => {
      const rect = group.getBoundingClientRect();
      const pointInside =
        point.x >= rect.left &&
        point.x <= rect.right &&
        point.y >= rect.top &&
        point.y <= rect.bottom;

      let area = pointInside ? 1 : 0;
      if (ghostRect && ghostRect.width && ghostRect.height) {
        const xOverlap = Math.max(0, Math.min(rect.right, ghostRect.right) - Math.max(rect.left, ghostRect.left));
        const yOverlap = Math.max(0, Math.min(rect.bottom, ghostRect.bottom) - Math.max(rect.top, ghostRect.top));
        area = Math.max(area, xOverlap * yOverlap);
      }

      if (area > bestArea) {
        bestArea = area;
        bestGroup = group;
      }
    });

    return bestGroup;
  }

  function markRoutineTouchDropTarget(point) {
    if (!routineCartBuilderList) {
      return null;
    }
    const group = routineDropGroupFromPoint(point);
    routineCartBuilderList.querySelectorAll("[data-routine-day-drop]").forEach((element) => {
      element.classList.toggle("is-drop-target", element === group);
    });
    if (routineDayDropTray) {
      routineDayDropTray.querySelectorAll("[data-routine-day-drop]").forEach((element) => {
        element.classList.toggle("is-drop-target", element === group);
      });
    }
    return group;
  }

  function startRoutineTouchDrag(handle, point) {
    if (!routineTouchDrag) {
      return;
    }
    const ids = routineDragIds(handle.dataset.routineDragId);
    const sourceRow = handle.closest("[data-routine-builder-id]");
    routineTouchDrag.active = true;
    routineTouchDrag.ids = ids;
    routineTouchDrag.ghost = createRoutineTouchGhost(ids, point, sourceRow);
    showRoutineDayDropTray(ids);
    document.body.classList.add("is-routine-touch-dragging");
    positionRoutineTouchGhost(routineTouchDrag.ghost, point);
    if (routineCartBuilderList) {
      routineCartBuilderList.querySelectorAll("[data-routine-builder-id]").forEach((row) => {
        row.classList.toggle("is-touch-dragging", ids.includes(row.dataset.routineBuilderId));
      });
    }
    markRoutineTouchDropTarget(point);
  }

  function finishRoutineTouchDrag(point) {
    if (!routineTouchDrag) {
      return;
    }
    const wasActive = routineTouchDrag.active;
    const ids = routineTouchDrag.ids;
    const group = wasActive ? routineDropGroupFromPoint(point) : null;
    cleanupRoutineTouchDrag();
    if (wasActive && group) {
      moveRoutineCartItemsToDay(ids, group.dataset.routineDayDrop, "");
    } else if (wasActive) {
      routineCartSelectedIds.clear();
      renderRoutineCartBuilder();
    }
  }

  function handleRoutinePointerMove(event) {
    if (!routineTouchDrag || routineTouchDrag.pointerId !== event.pointerId) {
      return;
    }
    const point = routinePointerPoint(event);
    const distance = Math.hypot(point.x - routineTouchDrag.startX, point.y - routineTouchDrag.startY);
    if (!routineTouchDrag.active && routineTouchDrag.pointerType !== "touch" && distance > 2) {
      window.clearTimeout(routineTouchDrag.timer);
      startRoutineTouchDrag(routineTouchDrag.handle, routineTouchDrag.lastPoint);
    } else if (!routineTouchDrag.active && distance > 22) {
      cleanupRoutineTouchDrag();
      return;
    }
    if (!routineTouchDrag.active) {
      return;
    }
    event.preventDefault();
    positionRoutineTouchGhost(routineTouchDrag.ghost, point);
    markRoutineTouchDropTarget(point);
    updateRoutineTouchAutoScroll(point);
  }

  function finishPointerRoutineTouchDrag(event) {
    if (!routineTouchDrag || routineTouchDrag.pointerId !== event.pointerId) {
      return;
    }
    finishRoutineTouchDrag(routinePointerPoint(event));
  }

  function cancelPointerRoutineTouchDrag(event) {
    if (!routineTouchDrag || routineTouchDrag.pointerId !== event.pointerId) {
      return;
    }
    const wasActive = routineTouchDrag.active;
    cleanupRoutineTouchDrag();
    if (wasActive) {
      routineCartSelectedIds.clear();
      renderRoutineCartBuilder();
    }
  }

  function moveRoutineCartItemsToDay(ids, day, targetId) {
    const normalizedDay = normalizeRoutineDay(day);
    const uniqueIds = Array.from(new Set(ids)).filter((id) => routineCartItems.some((item) => item.key === id));
    if (uniqueIds.length === 0) {
      return;
    }
    const isSameDayDrop = !targetId && uniqueIds.every((id) => {
      const item = getRoutineCartItem(id);
      return item && normalizeRoutineDay(item.day) === normalizedDay;
    });
    if (isSameDayDrop) {
      routineCartSelectedIds.clear();
      renderRoutineCartBuilder();
      return;
    }
    const movingIds = new Set(uniqueIds);
    const movingItems = routineCartItems.filter((item) => movingIds.has(item.key)).map((item) => ({ ...item, day: normalizedDay }));
    routineCartItems = routineCartItems.filter((item) => !movingIds.has(item.key));

    const targetIndex = targetId && !movingIds.has(targetId) ? routineCartItems.findIndex((entry) => entry.key === targetId) : -1;
    if (targetIndex !== -1) {
      routineCartItems.splice(targetIndex, 0, ...movingItems);
    } else {
      const lastInDay = routineCartItems
        .map((entry, entryIndex) => ({ entry, entryIndex }))
        .filter(({ entry }) => normalizeRoutineDay(entry.day) === normalizedDay)
        .pop();
      routineCartItems.splice(lastInDay ? lastInDay.entryIndex + 1 : routineCartItems.length, 0, ...movingItems);
    }

    routineCartSelectedIds.clear();
    clearRoutineCartValidation();
    renderRoutineCartWithReorderAnimation(uniqueIds);
    if (routineCartResult) {
      routineCartResult.hidden = true;
    }
  }

  function renderRoutineCart() {
    if (!routineCart || !routineCartList) {
      return;
    }

    routineCartItems = withRoutineCartItemKeys(routineCartItems.filter((item) => getExerciseById(item.id)));
    const count = routineCartItems.length;
    const label = count === 1 ? "1 ejercicio" : `${count} ejercicios`;

    if (routineCartCount) {
      routineCartCount.textContent = label;
    }
    if (routineCartSummary) {
      routineCartSummary.textContent =
        count === 0 ? "Selecciona ejercicios del catálogo." : `${label} · Completa los datos para generar tu rutina.`;
    }
    if (routineCartEmpty) {
      routineCartEmpty.hidden = count > 0;
    }
    if (routineCartClear) {
      routineCartClear.disabled = count === 0;
    }
    if (routineCartView) {
      routineCartView.disabled = count === 0;
    }
    if (routineCartGenerate) {
      routineCartGenerate.disabled = count === 0;
    }
    if (count === 0) {
      setRoutineCartBuilderOpen(false);
      if (routineCartResult) {
        routineCartResult.hidden = true;
      }
    }

    routineCartList.innerHTML = "";
    const fragment = document.createDocumentFragment();

    routineCartItems.forEach((item, index) => {
      const exercise = getExerciseById(item.id);
      if (!exercise) {
        return;
      }

      const li = document.createElement("li");
      li.className = "routine-cart__item";
      li.innerHTML = `
        <span class="routine-cart__index">${index + 1}</span>
        <span class="routine-cart__media">
          ${
            exercise.imagenInicial
              ? `<img src="${escapeHtml(exercise.imagenInicial)}" alt="" loading="lazy" decoding="async" width="128" height="128">`
              : ""
          }
        </span>
        <span class="routine-cart__item-copy">
          <strong>${escapeHtml(exercise.nombre)}</strong>
          <span>${escapeHtml(exercise.grupoMuscular)}</span>
        </span>
        <button type="button" class="routine-cart__remove" data-routine-remove="${escapeHtml(item.key)}" aria-label="Quitar ${escapeHtml(exercise.nombre)} de la rutina">
          <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18" stroke="currentColor" stroke-width="2" stroke-linecap="round"></path></svg>
        </button>
      `;
      fragment.appendChild(li);
    });

    routineCartList.appendChild(fragment);
    initLazyImages(routineCartList);
    renderRoutineCartBuilder();
    saveRoutineCart();
    syncRoutineButtons();
  }

  function addRoutineCartItem(id) {
    if (!getExerciseById(id)) {
      return;
    }
    routineCartItems.push({
      key: createRoutineCartItemKey(id),
      id,
      series: ROUTINE_DEFAULT_SERIES,
      reps: ROUTINE_DEFAULT_REPS,
      rest: ROUTINE_DEFAULT_REST,
      day: ROUTINE_UNASSIGNED_DAY,
    });
    if (routineCartResult) {
      routineCartResult.hidden = true;
    }
    renderRoutineCart();
    setRoutineCartOpen(true);
  }

  function removeRoutineCartItem(itemKey) {
    routineCartSelectedIds.delete(itemKey);
    routineCartItems = routineCartItems.filter((item) => item.key !== itemKey);
    if (routineCartResult) {
      routineCartResult.hidden = true;
    }
    renderRoutineCart();
  }

  function toggleRoutineCartItem(id) {
    addRoutineCartItem(id);
  }

  function syncRoutineExercisePickerControls(picker) {
    const search = picker.querySelector("[data-routine-exercise-picker-search]");
    const filtersButton = picker.querySelector("[data-routine-exercise-picker-filters]");
    const filtersBadge = picker.querySelector("[data-routine-exercise-picker-filters-badge]");
    const filtersCount = filterCountForState(routineExercisePickerState);

    if (search && search.value !== routineExercisePickerState.q) {
      search.value = routineExercisePickerState.q;
    }
    if (filtersButton) {
      filtersButton.classList.toggle("is-active", filtersCount > 0);
    }
    if (filtersBadge) {
      filtersBadge.hidden = filtersCount === 0;
      filtersBadge.textContent = String(filtersCount);
    }
  }

  function getRoutineExercisePickerMatches() {
    return exercises.filter((exercise) => matchesFiltersWith(exercise, routineExercisePickerState));
  }

  function renderRoutineExercisePickerList(picker) {
    const list = picker.querySelector("[data-routine-exercise-picker-list]");
    const count = picker.querySelector("[data-routine-exercise-picker-count]");
    if (!list) {
      return;
    }
    syncRoutineExercisePickerControls(picker);
    const matches = getRoutineExercisePickerMatches();

    if (count) {
      count.textContent = `${matches.length} ejercicio${matches.length === 1 ? "" : "s"}`;
    }

    list.innerHTML = matches.length
      ? matches.map((exercise) => {
          const isAdded = isInRoutineCart(exercise.id);
          const media = exercise.imagenInicial
            ? `<img src="${escapeHtml(exercise.imagenInicial)}" alt="" loading="lazy" decoding="async" width="128" height="128">`
            : "";
          return `
            <article class="routine-exercise-picker__item">
              <button type="button" class="routine-exercise-picker__open" data-routine-picker-open="${escapeHtml(exercise.id)}">
                <span class="routine-exercise-picker__media">${media}</span>
                <span class="routine-exercise-picker__copy">
                  <strong>${escapeHtml(exercise.nombre)}</strong>
                  <span>${escapeHtml(exercise.grupoMuscular)}</span>
                  <small>${escapeHtml((exercise.equipamiento && exercise.equipamiento[0]) || "Peso corporal")}</small>
                </span>
              </button>
              <button type="button" data-routine-picker-add="${escapeHtml(exercise.id)}">
                ${isAdded ? "Añadir otra vez" : "Añadir"}
              </button>
            </article>
          `;
        }).join("")
      : `<p class="routine-exercise-picker__empty">No hay ejercicios que coincidan con los filtros.</p>`;
    initLazyImages(list);
  }

  function closeRoutineExercisePicker() {
    const picker = document.querySelector("[data-routine-exercise-picker]");
    if (picker) {
      picker.remove();
    }
    document.removeEventListener("keydown", onRoutineExercisePickerKeydown);
  }

  function onRoutineExercisePickerKeydown(event) {
    if (event.key === "Escape") {
      const picker = document.querySelector("[data-routine-exercise-picker]");
      if (picker && closeRoutineExercisePickerDetail(picker)) {
        return;
      }
      closeRoutineExercisePicker();
    }
  }

  function openRoutineExercisePicker() {
    if (!routineCart || !routineCartBuilder || routineCartBuilder.hidden) {
      return;
    }
    closeRoutineExercisePicker();
    const picker = document.createElement("div");
    picker.className = "routine-exercise-picker";
    picker.dataset.routineExercisePicker = "";
    picker.setAttribute("role", "dialog");
    picker.setAttribute("aria-modal", "true");
    picker.setAttribute("aria-labelledby", "routine-exercise-picker-title");
    picker.innerHTML = `
      <button type="button" class="routine-exercise-picker__backdrop" data-routine-exercise-picker-close aria-label="Cerrar selector de ejercicios"></button>
      <section class="routine-exercise-picker__panel">
        <header class="routine-exercise-picker__head">
          <div>
            <h2 id="routine-exercise-picker-title">Añadir ejercicios</h2>
            <p data-routine-exercise-picker-count></p>
          </div>
          <button type="button" data-routine-exercise-picker-close aria-label="Cerrar selector de ejercicios">×</button>
        </header>
        <div class="routine-exercise-picker__tools">
          <label class="routine-exercise-picker__search">
            <span class="visually-hidden">Buscar ejercicio</span>
            <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="11" cy="11" r="7" stroke="currentColor" stroke-width="2"></circle><path d="m20 20-3.2-3.2" stroke="currentColor" stroke-width="2" stroke-linecap="round"></path></svg>
            <input type="search" placeholder="Buscar ejercicio, músculo o equipo..." autocomplete="off" data-routine-exercise-picker-search>
          </label>
          <button type="button" class="routine-exercise-picker__filters-btn exercises-filters-btn" data-routine-exercise-picker-filters>
            <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M4 7h16M7 12h10M10 17h4" stroke="currentColor" stroke-width="2" stroke-linecap="round"></path></svg>
            <span>Filtros</span>
            <span class="exercises-filters-btn__badge" data-routine-exercise-picker-filters-badge hidden>0</span>
          </button>
        </div>
        <div class="routine-exercise-picker__list" data-routine-exercise-picker-list></div>
      </section>
    `;
    document.body.appendChild(picker);
    renderRoutineExercisePickerList(picker);

    picker.addEventListener("click", (event) => {
      if (event.target.closest("[data-routine-picker-detail-close]")) {
        closeRoutineExercisePickerDetail(picker);
        return;
      }
      const similarCard = event.target.closest(".routine-exercise-picker__detail [data-similar-id]");
      if (similarCard) {
        openRoutineExercisePickerDetail(picker, similarCard.dataset.similarId);
        return;
      }
      if (event.target.closest("[data-routine-exercise-picker-close]")) {
        closeRoutineExercisePicker();
        return;
      }
      const filtersButton = event.target.closest("[data-routine-exercise-picker-filters]");
      if (filtersButton) {
        openFilterPanel("picker");
        return;
      }
      const addButton = event.target.closest("[data-routine-picker-add]");
      if (addButton) {
        addRoutineCartItem(addButton.dataset.routinePickerAdd);
        renderRoutineExercisePickerList(picker);
        return;
      }
      const pickerItem = event.target.closest("[data-routine-picker-open]");
      if (pickerItem) {
        openRoutineExercisePickerDetail(picker, pickerItem.dataset.routinePickerOpen);
      }
    });

    const search = picker.querySelector("[data-routine-exercise-picker-search]");
    if (search) {
      search.addEventListener("input", () => {
        routineExercisePickerState.q = search.value.trim();
        renderRoutineExercisePickerList(picker);
      });
      window.setTimeout(() => search.focus(), 50);
    }
    document.addEventListener("keydown", onRoutineExercisePickerKeydown);
  }

  function clearRoutineCart() {
    routineCartItems = [];
    routineCartSelectedIds.clear();
    if (routineCartResult) {
      routineCartResult.hidden = true;
    }
    renderRoutineCart();
  }

  function viewRoutineCart() {
    if (routineCartItems.length === 0) {
      return;
    }
    setRoutineCartOpen(true);
    setRoutineCartBuilderOpen(!routineCartBuilder || routineCartBuilder.hidden);
  }

  const routineCartDefaultTitle = "Rutina semanal";

  function routineDaysForEntries(entries, days) {
    const valid = new Set(WEEK_DAYS.map((day) => day.id));
    const selected = normalizeRoutineCartDays(days && days.length ? days : entries.map((item) => item.day).filter(Boolean));
    entries.forEach((entry) => {
      if (valid.has(entry.day) && !selected.includes(entry.day)) {
        selected.push(entry.day);
      }
    });
    return selected;
  }

  function routineEntryDay(entry, days) {
    return days.includes(entry.day) ? entry.day : days[0];
  }

  function groupRoutineEntries(entries, days) {
    return days.map((day) => ({
      day,
      entries: entries.filter((entry) => routineEntryDay(entry, days) === day),
    }));
  }

  function routineMusclesForEntries(entries) {
    const seen = new Set();
    const muscles = [];
    entries.forEach((entry) => {
      const exercise = getExerciseById(entry.id);
      const names = exercise && exercise.musculosPrincipales.length ? exercise.musculosPrincipales : exercise ? [exercise.grupoMuscular] : [];
      names.forEach((name) => {
        const normalized = normalize(name);
        if (name && !seen.has(normalized)) {
          seen.add(normalized);
          muscles.push(name);
        }
      });
    });
    return muscles.join(", ");
  }

  function routineSummaryLabel(routine) {
    const items = Array.isArray(routine.items) ? routine.items : [];
    const days = Array.isArray(routine.days) ? routine.days : routineDaysForEntries(items, []);
    const seriesTotal = items.reduce((total, item) => total + parseRoutineNumber(item.series || item.s), 0);
    const dayLabel = days.length === 1 ? "1 día" : `${days.length} días`;
    const exerciseLabel = items.length === 1 ? "1 ejercicio" : `${items.length} ejercicios`;
    return `${dayLabel} · ${exerciseLabel} · ${seriesTotal} series`;
  }

  function renderRoutineFavorites() {
    if (!routineFavoritesSection || !routineFavoritesList || !window.Routines) {
      return;
    }
    const routines = loadRoutineFavorites();
    if (routineFavoritesToggle) {
      routineFavoritesToggle.hidden = false;
    }
    if (routineFavoritesCount) {
      routineFavoritesCount.textContent = String(routines.length);
    }
    routineFavoritesSection.hidden = !routineFavoritesOpen;
    if (routineFavoritesToggle) {
      routineFavoritesToggle.setAttribute("aria-expanded", String(!routineFavoritesSection.hidden));
    }
    if (routines.length === 0) {
      routineFavoritesList.innerHTML = `
        <article class="routine-favorites__empty">
          <h3>No hay rutinas guardadas todavía</h3>
          <p>Cuando guardes una rutina aparecerá aquí para abrirla o editarla desde este dispositivo y navegador.</p>
        </article>
      `;
      return;
    }

    routineFavoritesList.innerHTML = routines
      .map((routine, index) => {
        const items = Array.isArray(routine.items) ? routine.items : [];
        const days = Array.isArray(routine.days) ? routine.days : routineDaysForEntries(items, []);
        const isRemoveConfirming = pendingRoutineFavoriteRemoveIndex === index;
        const dayPreview = groupRoutineEntries(items, days)
          .filter((group) => group.entries.length)
          .map((group) => {
            const muscles = routineMusclesForEntries(group.entries);
            return `<span><strong>${escapeHtml(routineDayMeta(group.day).short)}</strong>${muscles ? ` ${escapeHtml(muscles)}` : ""}</span>`;
          })
          .join("");
        return `
          <article class="routine-favorites__card">
            <div>
              <h3>${escapeHtml(routine.title || "Rutina guardada")}</h3>
              <p>${escapeHtml(routineSummaryLabel(routine))}</p>
              ${dayPreview ? `<div class="routine-favorites__days">${dayPreview}</div>` : ""}
            </div>
            <div class="routine-favorites__actions">
              <button type="button" data-routine-favorite-remove="${index}" data-confirming="${isRemoveConfirming}" aria-label="${isRemoveConfirming ? "Confirmar eliminación de" : "Eliminar"} ${escapeHtml(routine.title || "rutina guardada")}">${isRemoveConfirming ? "Confirmar" : "×"}</button>
              <button type="button" data-routine-favorite-open="${index}">Abrir</button>
              <button type="button" data-routine-favorite-edit="${index}">Editar</button>
            </div>
          </article>
        `;
      })
      .join("");
  }

  function openRoutineFavorite(index) {
    const routines = loadRoutineFavorites();
    const routine = routines[index];
    if (!routine || !routine.id) {
      return;
    }
    setRoutineFavoritesOpen(false);
    location.hash = routine.id;
  }

  function editRoutineFavorite(index) {
    const routines = loadRoutineFavorites();
    const routine = routines[index];
    if (!routine || !routine.id || !window.Routines) {
      return;
    }
    const decoded = window.Routines.decode(routine.id);
    loadRoutineIntoBuilder(decoded || routine);
  }

  function requestRoutineFavoriteRemoval(index) {
    if (pendingRoutineFavoriteRemoveIndex === index) {
      clearRoutineFavoriteRemoveConfirmation(false);
      removeRoutineFavorite(index);
      return;
    }
    pendingRoutineFavoriteRemoveIndex = index;
    if (pendingRoutineFavoriteRemoveTimer) {
      window.clearTimeout(pendingRoutineFavoriteRemoveTimer);
    }
    pendingRoutineFavoriteRemoveTimer = window.setTimeout(() => {
      clearRoutineFavoriteRemoveConfirmation();
    }, ROUTINE_REMOVE_CONFIRM_DELAY);
    renderRoutineFavorites();
  }

  function removeRoutineFavorite(index) {
    const routines = loadRoutineFavorites();
    if (!routines[index]) {
      return;
    }
    routines.splice(index, 1);
    saveRoutineFavorites(routines);
    renderRoutineFavorites();
    if (isRoutineHash(location.hash)) {
      updateRoutineSaveButton(window.Routines.decode(location.hash));
    }
  }

  function renderRoutineDayFilters(days) {
    if (!routineDayFilters) {
      return;
    }
    if (days.length <= 1) {
      routineDayFilters.hidden = true;
      routineDayFilters.innerHTML = "";
      routineViewDayFilter = "";
      return;
    }

    if (routineViewDayFilter && !days.includes(routineViewDayFilter)) {
      routineViewDayFilter = "";
    }

    const buttons = [
      `<button type="button" data-routine-day-filter="" aria-pressed="${routineViewDayFilter === ""}">Todos</button>`,
      ...days.map((day) => {
        const meta = routineDayMeta(day);
        return `<button type="button" data-routine-day-filter="${escapeHtml(day)}" aria-pressed="${routineViewDayFilter === day}">${escapeHtml(meta.label)}</button>`;
      }),
    ];
    routineDayFilters.innerHTML = buttons.join("");
    routineDayFilters.hidden = false;
  }

  function getRoutineCartTitle() {
    return routineCartTitleInput && routineCartTitleInput.value.trim()
      ? routineCartTitleInput.value.trim()
      : routineCartDefaultTitle;
  }

  function getRoutineCartNote() {
    return routineCartNoteInput ? routineCartNoteInput.value.trim() : "";
  }

  function buildRoutineCartUrl() {
    const routine = {
      t: getRoutineCartTitle(),
      n: getRoutineCartNote(),
      e: routineCartItems.map((item) => item.id),
      items: routineCartItems.map((item) => ({ ...item, day: normalizeRoutineDay(item.day) })),
      days: routineCartDays,
    };
    const hash = window.Routines.encode(routine);
    return { routine, url: `${location.origin}${location.pathname}${hash}` };
  }

  function renderQr(container, text, size, correctLevel) {
    if (!container) {
      return;
    }
    container.innerHTML = "";
    if (!window.QRCode) {
      container.textContent = "No se pudo generar el código QR.";
      return;
    }
    // eslint-disable-next-line no-new
    new window.QRCode(container, {
      text,
      width: size,
      height: size,
      colorDark: "#000000",
      colorLight: "#ffffff",
      correctLevel: correctLevel || window.QRCode.CorrectLevel.M,
    });
  }

  function prepareRoutineCartPoster(routine, url) {
    if (!routineCartPoster) {
      return;
    }
    const routineDays = routineDaysForEntries(routine.items, routine.days || []);
    const posterGroups = groupRoutineEntries(routine.items, routineDays)
      .map((group) => ({
        ...group,
        entries: group.entries.filter((entry) => Boolean(getExerciseById(entry.id))),
      }))
      .filter((group) => group.entries.length > 0);

    const dateLabel = new Intl.DateTimeFormat("es-ES", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    }).format(new Date());
    const title = routine.t || routineCartDefaultTitle;
    const subtitle = routine.t === routineCartDefaultTitle ? "Fuerza y acondicionamiento" : "Plan de entrenamiento";
    const daysCount = posterGroups.length;
    const exerciseCount = posterGroups.reduce((total, group) => total + group.entries.length, 0);
    const seriesTotal = posterGroups.reduce((total, group) => (
      total + group.entries.reduce((groupTotal, entry) => groupTotal + parseRoutineNumber(entry.series), 0)
    ), 0);
    const averageMinutes = daysCount
      ? Math.round(
        posterGroups.reduce((total, group) => (
          total + Math.round(group.entries.reduce((groupTotal, entry) => groupTotal + routineItemSeconds(entry), 0) / 60)
        ), 0) / daysCount
      )
      : 0;
    const pageCount = Math.max(1, posterGroups.length + 1);
    const notes = routine.n
      ? routine.n.split(/\n+/).map((line) => line.trim()).filter(Boolean)
      : ["Ajusta las cargas según el nivel y prioriza la técnica en cada repetición."];

    const icon = (name) => {
      const icons = {
        calendar: '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M7 3v4M17 3v4M4.5 9h15M6 5h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2Z" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>',
        dumbbell: '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M6 8v8M18 8v8M3.5 10v4M20.5 10v4M6 12h12" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>',
        stack: '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="m12 4 8 4-8 4-8-4 8-4ZM4 12l8 4 8-4M4 16l8 4 8-4" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/></svg>',
        clock: '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="2"/><path d="M12 7v5l3 2" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>',
      };
      return icons[name] || "";
    };
    const footer = (pageNumber) => `
      <footer class="routine-poster__page-footer">
        <span>https://eltablerosportclub.com</span>
        <span>${escapeHtml(dateLabel)}</span>
        <span>Página ${pageNumber} de ${pageCount}</span>
      </footer>
    `;
    const dayDuration = (entries) => Math.round(entries.reduce((total, entry) => total + routineItemSeconds(entry), 0) / 60);
    const formatPosterGroups = (entries) => {
      const groups = Array.from(new Set(
        entries
          .map((entry) => getExerciseById(entry.id))
          .filter(Boolean)
          .map((exercise) => exercise.grupoMuscular)
      ));
      if (groups.length === 0) {
        return "Trabajo general";
      }
      if (groups.length === 1) {
        return groups[0];
      }
      if (groups.length === 2) {
        return `${groups[0]} y ${groups[1]}`;
      }
      return `${groups.slice(0, -1).join(", ")} y ${groups[groups.length - 1]}`;
    };
    const coverRows = posterGroups.map((group, index) => {
      return `
        <li>
          <span>${index + 1}</span>
          <strong>Día ${index + 1}</strong>
          <em>${escapeHtml(formatPosterGroups(group.entries))}</em>
          <small>≈ ${dayDuration(group.entries)} min</small>
        </li>
      `;
    }).join("");
    const dayPages = posterGroups.map((group, groupIndex) => {
      const label = routineDayMeta(group.day).label;
      const rows = group.entries.map((entry, entryIndex) => {
        const exercise = getExerciseById(entry.id);
        const media = exercise && exercise.imagenInicial
          ? `<img src="${escapeHtml(exercise.imagenInicial)}" alt="" decoding="async" width="512" height="512">`
          : "";
        return `
          <tr>
            <td class="routine-poster__table-index">${entryIndex + 1}</td>
            <td class="routine-poster__table-exercise">
              <span>${media}</span>
              <strong>${escapeHtml(exercise.nombre)}</strong>
              <em>${escapeHtml(exercise.grupoMuscular)}</em>
              <small>${escapeHtml(exercise.equipamiento[0] || "Peso corporal")}</small>
            </td>
            <td>${escapeHtml(entry.series || "No definido")}</td>
            <td>${escapeHtml(entry.reps || "No definido")}</td>
            <td>${entry.rest ? `${escapeHtml(entry.rest)} min` : "No definido"}</td>
          </tr>
        `;
      }).join("");
      const duration = dayDuration(group.entries);
      const daySeries = group.entries.reduce((total, entry) => total + parseRoutineNumber(entry.series), 0);
      return `
        <article class="routine-poster__page routine-poster__day-page">
          <header class="routine-poster__page-header">
            <img class="routine-poster__page-logo" src="../assets/images/brand/site-logo-header-white-700.webp" alt="El Tablero Sport Club" width="700" height="265">
          </header>
          <h2><span>Día ${groupIndex + 1}</span> · ${escapeHtml(label)}</h2>
          <dl class="routine-poster__stats routine-poster__stats--day">
            <div>${icon("dumbbell")}<dt>${group.entries.length}</dt><dd>ejercicios</dd></div>
            <div>${icon("stack")}<dt>${daySeries}</dt><dd>series</dd></div>
            <div>${icon("clock")}<dt>≈ ${duration} min</dt><dd>tiempo estimado</dd></div>
          </dl>
          <table class="routine-poster__table">
            <colgroup>
              <col class="routine-poster__col-index">
              <col class="routine-poster__col-exercise">
              <col class="routine-poster__col-series">
              <col class="routine-poster__col-reps">
              <col class="routine-poster__col-rest">
            </colgroup>
            <thead>
              <tr>
                <th>#</th>
                <th>Ejercicio</th>
                <th>Series</th>
                <th>Reps</th>
                <th>Descanso</th>
              </tr>
            </thead>
            <tbody>${rows}</tbody>
          </table>
          ${footer(groupIndex + 2)}
        </article>
      `;
    }).join("");

    routineCartPoster.innerHTML = `
      <article class="routine-poster__page routine-poster__cover">
        <header class="routine-poster__cover-header">
          <img class="routine-poster__cover-logo" src="../assets/images/brand/site-logo-header-white-700.webp" alt="El Tablero Sport Club" width="700" height="265">
          <aside class="routine-poster__cover-qr">
            <strong>Escanea para abrir la rutina</strong>
            <div data-routine-cart-poster-qr></div>
          </aside>
        </header>
        <section class="routine-poster__cover-title">
          <h1>${escapeHtml(title)}</h1>
          <p>${escapeHtml(subtitle)}</p>
        </section>
        <dl class="routine-poster__stats">
          <div>${icon("calendar")}<dt>${daysCount}</dt><dd>${daysCount === 1 ? "día" : "días"}</dd></div>
          <div>${icon("dumbbell")}<dt>${exerciseCount}</dt><dd>ejercicios</dd></div>
          <div>${icon("stack")}<dt>${seriesTotal}</dt><dd>series</dd></div>
          <div>${icon("clock")}<dt>≈ ${averageMinutes} min</dt><dd>media diaria</dd></div>
        </dl>
        <section class="routine-poster__notes">
          <h2>Notas</h2>
          <ul>${notes.map((note) => `<li>${escapeHtml(note)}</li>`).join("")}</ul>
        </section>
        <section class="routine-poster__weekly">
          <h2>Resumen semanal</h2>
          <ol>${coverRows}</ol>
        </section>
        ${footer(1)}
      </article>
      ${dayPages}
    `;
    renderQr(routineCartPoster.querySelector("[data-routine-cart-poster-qr]"), url, 620, window.QRCode && window.QRCode.CorrectLevel.L);
    initLazyImages(routineCartPoster);
  }

  function revealRoutineCartResult() {
    if (!routineCartResult) {
      return;
    }
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.setTimeout(() => {
      routineCartResult.scrollIntoView({
        behavior: reduceMotion ? "auto" : "smooth",
        block: "center",
        inline: "nearest",
      });
    }, 50);
  }

  function validateRoutineCartBeforeGenerate() {
    const withoutDay = routineCartItems.filter((item) => !normalizeRoutineDay(item.day)).length;
    const incomplete = routineCartItems.filter((item) => !hasCompleteRoutinePrescription(item)).length;
    const messages = [];
    if (withoutDay) {
      messages.push(`${withoutDay} ${withoutDay === 1 ? "ejercicio no tiene día asignado" : "ejercicios no tienen día asignado"}`);
    }
    if (incomplete) {
      messages.push(`${incomplete} ${incomplete === 1 ? "ejercicio no tiene series, repeticiones y descanso completos" : "ejercicios no tienen series, repeticiones y descanso completos"}`);
    }
    return messages;
  }

  function generateRoutineCart() {
    if (!window.Routines || routineCartItems.length === 0 || !routineCartLink) {
      return;
    }
    const validationMessages = validateRoutineCartBeforeGenerate();
    if (validationMessages.length) {
      setRoutineCartValidation(`Antes de generar la rutina: ${validationMessages.join(" y ")}.`);
      renderRoutineCartBuilder();
      return;
    }
    clearRoutineCartValidation();
    const { routine, url } = buildRoutineCartUrl();
    routineCartLink.value = url;
    renderQr(routineCartQr, url, 180);
    prepareRoutineCartPoster(routine, url);
    if (routineCartResult) {
      routineCartResult.hidden = false;
      revealRoutineCartResult();
    }
  }

  function copyRoutineCartLink() {
    if (!routineCartLink || !routineCartLink.value || !routineCartCopy) {
      return;
    }
    const done = () => {
      const original = routineCartCopy.innerHTML;
      routineCartCopy.textContent = "¡Copiado!";
      window.setTimeout(() => {
        routineCartCopy.innerHTML = original;
      }, 1600);
    };

    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(routineCartLink.value).then(done).catch(() => fallbackCopy(routineCartLink.value, done));
    } else {
      fallbackCopy(routineCartLink.value, done);
    }
  }

  function openRoutineCartLink() {
    if (!routineCartLink || !routineCartLink.value) {
      return;
    }
    window.open(routineCartLink.value, "_blank", "noopener");
  }

  function downloadRoutineCartQr() {
    if (!routineCartQr) {
      return;
    }
    const canvas = routineCartQr.querySelector("canvas");
    const image = routineCartQr.querySelector("img");
    const source = canvas ? canvas.toDataURL("image/png") : image ? image.src : "";
    if (!source) {
      return;
    }
    const link = document.createElement("a");
    link.href = source;
    link.download = "rutina-el-tablero-qr.png";
    document.body.appendChild(link);
    link.click();
    link.remove();
  }

  function printRoutineCart() {
    const validationMessages = validateRoutineCartBeforeGenerate();
    if (validationMessages.length) {
      setRoutineCartValidation(`Antes de imprimir la rutina: ${validationMessages.join(" y ")}.`);
      renderRoutineCartBuilder();
      return;
    }
    const { routine, url } = buildRoutineCartUrl();
    if (routineCartLink) {
      routineCartLink.value = url;
    }
    renderQr(routineCartQr, url, 180);
    prepareRoutineCartPoster(routine, url);
    if (routineCartResult) {
      routineCartResult.hidden = false;
    }
    document.body.classList.add("is-printing-routine-cart");
    window.setTimeout(() => {
      window.print();
      window.setTimeout(() => {
        document.body.classList.remove("is-printing-routine-cart");
      }, 700);
    }, 120);
  }

  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const HEART_ICON =
    '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M12 20.5s-7.5-4.6-9.8-9.1C.7 8 2.2 4.7 5.4 4c2-.4 3.9.5 5 2.1C11.6 4.5 13.5 3.6 15.5 4c3.2.7 4.7 4 3.2 7.4C16.4 15.9 12 20.5 12 20.5Z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"></path></svg>';

  const CATALOG_TOUR_STEPS = [
    {
      selector: "[data-catalog-searchbar]",
      placement: "bottom",
      title: "Busca y filtra ejercicios",
      text: "Usa el buscador para localizar ejercicios por nombre, músculo o material. Con Filtros puedes acotar por favoritos, grupo muscular o equipamiento.",
    },
    {
      selector: "[data-exercises-count]",
      placement: "bottom",
      title: "Revisa los resultados",
      text: "El contador muestra cuántos ejercicios coinciden con la búsqueda y los filtros activos.",
    },
    {
      selector: "[data-exercises-grid] .exercise-card",
      placement: "right",
      title: "Abre la ficha",
      text: "Pulsa una tarjeta para ver la explicación completa, posiciones, músculos implicados, instrucciones y consejos.",
    },
    {
      selector: "[data-exercises-grid] [data-favorite-toggle]",
      placement: "left",
      title: "Guarda favoritos",
      text: "El corazón permite marcar ejercicios para encontrarlos más rápido desde el filtro de favoritos.",
    },
    {
      selector: "[data-exercises-grid] [data-routine-toggle]",
      placement: "top",
      title: "Añade a una rutina",
      text: "Añadir a rutina envía el ejercicio al asistente, donde puedes organizarlo por días, series, repeticiones y descanso.",
    },
    {
      selector: "[data-routine-cart-toggle]",
      placement: "top",
      title: "Abre el asistente",
      text: "Este acceso flotante muestra los ejercicios añadidos y abre el asistente para crear, imprimir o compartir una rutina.",
    },
    {
      selector: "[data-routine-favorites-toggle]",
      placement: "top",
      title: "Rutinas guardadas",
      text: "Desde este acceso puedes abrir o editar las rutinas guardadas en este dispositivo y navegador. Conserva siempre también el enlace o el QR para no depender solo del guardado local.",
    },
    {
      selector: "[data-catalog-tour]",
      placement: "bottom",
      title: "Vuelve a ver la guía",
      text: "Puedes abrir esta guía rápida siempre que necesites repasar cómo usar el catálogo de ejercicios.",
    },
  ];

  const ROUTINE_CART_TOUR_STEPS = [
    {
      selector: ".routine-cart__panel",
      placement: "center",
      title: "Crea rutinas semanales",
      text: "Los ejercicios añadidos quedan en este panel. Desde aquí puedes organizar una rutina por días para entrenar o entregársela a un cliente.",
    },
    {
      selector: "[data-routine-cart-title]",
      placement: "bottom",
      title: "Identifica la rutina",
      text: "El título puede ser el objetivo, la semana, el nivel o el nombre del cliente. En notas puedes añadir indicaciones generales sin límite de texto.",
    },
    {
      selector: ".routine-cart__week-planner",
      placement: "bottom",
      title: "Elige los días",
      text: "Activa los días de entrenamiento que necesites. Cada día crea su propia caja y el resumen muestra ejercicios, series y tiempo estimado por día.",
    },
    {
      selector: ".routine-cart__day-group--unassigned",
      placement: "left",
      title: "Evita ejercicios sin día",
      text: "Los ejercicios nuevos entran en “Sin día definido”. Para generar enlace, QR o impresión, todos deben estar asignados a un día activo.",
    },
    {
      selector: "[data-routine-select]",
      placement: "left",
      title: "Marca varios a la vez",
      text: "Selecciona varios ejercicios para moverlos juntos. Los ejercicios marcados quedan resaltados para que sepas exactamente qué bloque vas a organizar.",
    },
    {
      selector: "[data-routine-drag-id]",
      placement: "left",
      title: "Arrastra a cualquier día",
      text: "Arrastra desde el icono de puntos para mover uno o varios ejercicios. Al arrastrar aparecen los días disponibles como zona rápida para soltar.",
    },
    {
      selector: "[data-routine-info]",
      placement: "left",
      title: "Revisa la técnica",
      text: "Pulsa la i para consultar la ficha del ejercicio: explicación, posiciones, músculos implicados, instrucciones y consejos.",
    },
    {
      selector: ".routine-cart__quick-values",
      placement: "bottom",
      title: "Usa valores rápidos",
      text: "Define series, repeticiones y descanso una vez y aplícalos a todos. Después puedes ajustar cada ejercicio de forma individual.",
    },
    {
      selector: ".routine-cart__prescription",
      placement: "bottom",
      title: "Completa cada ejercicio",
      text: "Series, repeticiones y descanso son obligatorios. También puedes reordenar, eliminar o abrir la ficha de cada ejercicio desde sus botones.",
    },
    {
      selector: "[data-routine-cart-generate]",
      placement: "top",
      title: "Genera enlace, QR e impresión",
      text: "Si falta un día o algún parámetro, el asistente te avisará. Cuando todo esté completo, podrás copiar o abrir el enlace, descargar el QR e imprimir la rutina.",
    },
    {
      selector: "[data-routine-cart-generate]",
      placement: "top",
      title: "Abre y guarda la rutina",
      text: "Tras generar el enlace y el QR podrás abrir la rutina compartida. Desde esa vista se puede guardar en Rutinas guardadas; aun así, conserva siempre el enlace o el QR.",
    },
    {
      selector: "[data-routine-cart-tour]",
      placement: "bottom",
      title: "Repite la guía",
      text: "Este botón vuelve a abrir la guía rápida cuando necesites revisar el flujo.",
    },
  ];

  const ROUTINE_VIEW_TOUR_STEPS = [
    {
      selector: ".routine-view__searchbar",
      placement: "bottom",
      title: "Busca dentro de la rutina",
      text: "Usa el buscador para encontrar ejercicios por nombre, músculo o material. El botón Filtros permite afinar la rutina por favoritos, grupo muscular o equipamiento.",
    },
    {
      selector: "[data-routine-day-filters]",
      placement: "bottom",
      title: "Filtra por día",
      text: "Usa los días para revisar una sesión concreta o vuelve a Todos para ver la rutina completa.",
    },
    {
      selector: ".routine-view__grid .exercise-card",
      placement: "right",
      title: "Consulta cada ejercicio",
      text: "Pulsa cualquier ejercicio para abrir su ficha técnica con posiciones, músculos implicados, instrucciones y consejos.",
    },
    {
      selector: "[data-routine-save-favorites]",
      placement: "top",
      title: "Guarda la rutina",
      text: "Puedes guardar la rutina completa en este dispositivo y navegador. Conserva también el enlace o el QR para no depender solo del guardado local.",
    },
    {
      selector: "[data-routine-edit]",
      placement: "top",
      title: "Modifica la rutina",
      text: "Editar rutina abre el asistente con esta rutina cargada para cambiar días, añadir ejercicios, ordenar y ajustar series, repeticiones o descanso.",
    },
    {
      selector: "[data-routine-dismiss]",
      placement: "top",
      title: "Cierra la rutina",
      text: "Este botón cierra la rutina compartida y te lleva al catálogo completo para explorar todos los ejercicios.",
    },
    {
      selector: "[data-routine-view-tour]",
      placement: "bottom",
      title: "Vuelve a ver la guía",
      text: "Puedes abrir esta guía rápida siempre que necesites repasar cómo revisar, guardar o editar una rutina compartida.",
    },
  ];

  const escapeHtml = (value) =>
    String(value).replace(/[&<>"']/g, (char) => (
      { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[char]
    ));

  const normalize = (value) =>
    value
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");

  function catalogTourCurrentTarget() {
    const step = CATALOG_TOUR_STEPS[catalogTourIndex];
    return step ? document.querySelector(step.selector) : null;
  }

  function buildCatalogTour() {
    if (catalogTourBuilt) {
      return;
    }
    catalogTourBuilt = true;

    catalogTourBackdrop = document.createElement("div");
    catalogTourBackdrop.className = "tour-backdrop";
    catalogTourBackdrop.hidden = true;

    catalogTourSpot = document.createElement("div");
    catalogTourSpot.className = "tour-spot";

    catalogTourPopup = document.createElement("div");
    catalogTourPopup.className = "tour-popup";
    catalogTourPopup.setAttribute("role", "dialog");
    catalogTourPopup.setAttribute("aria-modal", "true");
    catalogTourPopup.setAttribute("aria-labelledby", "catalog-tour-title");
    catalogTourPopup.innerHTML = `
      <button type="button" class="tour-popup__close" data-catalog-tour-close aria-label="Cerrar guía">×</button>
      <p class="tour-popup__step" data-catalog-tour-step></p>
      <h2 class="tour-popup__title" id="catalog-tour-title" data-catalog-tour-title></h2>
      <p class="tour-popup__text" data-catalog-tour-text></p>
      <div class="tour-popup__footer">
        <label class="tour-popup__dismiss">
          <input type="checkbox" data-catalog-tour-dismiss>
          No volver a mostrar
        </label>
        <div class="tour-popup__nav">
          <button type="button" class="tour-popup__prev" data-catalog-tour-prev>Anterior</button>
          <button type="button" class="tour-popup__next" data-catalog-tour-next>Siguiente</button>
        </div>
      </div>
    `;

    catalogTourBackdrop.appendChild(catalogTourSpot);
    catalogTourBackdrop.appendChild(catalogTourPopup);
    document.body.appendChild(catalogTourBackdrop);

    catalogTourStepLabel = catalogTourPopup.querySelector("[data-catalog-tour-step]");
    catalogTourTitle = catalogTourPopup.querySelector("[data-catalog-tour-title]");
    catalogTourText = catalogTourPopup.querySelector("[data-catalog-tour-text]");
    catalogTourDismissCheckbox = catalogTourPopup.querySelector("[data-catalog-tour-dismiss]");
    catalogTourPrevButton = catalogTourPopup.querySelector("[data-catalog-tour-prev]");
    catalogTourNextButton = catalogTourPopup.querySelector("[data-catalog-tour-next]");
    catalogTourCloseButton = catalogTourPopup.querySelector("[data-catalog-tour-close]");

    catalogTourCloseButton.addEventListener("click", () => {
      if (maybeJumpToCatalogTourFinalStep()) {
        return;
      }
      endCatalogTour();
    });
    catalogTourPrevButton.addEventListener("click", () => {
      if (maybeJumpToCatalogTourFinalStep()) {
        return;
      }
      goToCatalogTourStep(catalogTourIndex - 1, -1);
    });
    catalogTourNextButton.addEventListener("click", () => {
      if (maybeJumpToCatalogTourFinalStep()) {
        return;
      }
      if (catalogTourIndex === CATALOG_TOUR_STEPS.length - 1) {
        endCatalogTour();
      } else {
        goToCatalogTourStep(catalogTourIndex + 1, 1);
      }
    });

    document.addEventListener("keydown", (event) => {
      if (!catalogTourActive) {
        return;
      }
      if (event.key === "Escape") {
        event.preventDefault();
        if (!maybeJumpToCatalogTourFinalStep()) {
          endCatalogTour();
        }
      } else if (event.key === "ArrowRight") {
        catalogTourNextButton.click();
      } else if (event.key === "ArrowLeft" && !catalogTourPrevButton.disabled) {
        catalogTourPrevButton.click();
      } else if (event.key === "Tab") {
        trapCatalogTourFocus(event);
      }
    });
  }

  function maybeJumpToCatalogTourFinalStep() {
    if (
      catalogTourDismissCheckbox &&
      catalogTourDismissCheckbox.checked &&
      catalogTourIndex < CATALOG_TOUR_STEPS.length - 1
    ) {
      goToCatalogTourStep(CATALOG_TOUR_STEPS.length - 1, 1);
      return true;
    }
    return false;
  }

  function trapCatalogTourFocus(event) {
    const focusable = catalogTourPopup.querySelectorAll("button, input");
    if (focusable.length === 0) {
      return;
    }
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  }

  function goToCatalogTourStep(requestedIndex, direction) {
    let index = requestedIndex;
    while (index >= 0 && index < CATALOG_TOUR_STEPS.length) {
      const step = CATALOG_TOUR_STEPS[index];
      if (document.querySelector(step.selector)) {
        catalogTourIndex = index;
        renderCatalogTourStep();
        return;
      }
      index += direction;
    }
    endCatalogTour();
  }

  function renderCatalogTourStep() {
    const step = CATALOG_TOUR_STEPS[catalogTourIndex];
    catalogTourStepLabel.textContent = `Paso ${catalogTourIndex + 1} de ${CATALOG_TOUR_STEPS.length}`;
    catalogTourTitle.textContent = step.title;
    catalogTourText.textContent = step.text;
    catalogTourPrevButton.disabled = catalogTourIndex === 0;
    catalogTourNextButton.textContent = catalogTourIndex === CATALOG_TOUR_STEPS.length - 1 ? "Entendido" : "Siguiente";

    const target = catalogTourCurrentTarget();
    if (target) {
      target.scrollIntoView({
        block: "center",
        inline: "nearest",
        behavior: prefersReducedMotion ? "auto" : "smooth",
      });
    }
    window.setTimeout(() => positionCatalogTourAt(step, target), target && !prefersReducedMotion ? 260 : 0);
  }

  function positionCatalogTourAt(step, target) {
    if (!catalogTourPopup || !catalogTourSpot) {
      return;
    }
    if (!target) {
      return;
    }

    const rect = target.getBoundingClientRect();
    const pad = 8;
    catalogTourSpot.style.top = `${rect.top - pad}px`;
    catalogTourSpot.style.left = `${rect.left - pad}px`;
    catalogTourSpot.style.width = `${rect.width + pad * 2}px`;
    catalogTourSpot.style.height = `${rect.height + pad * 2}px`;

    catalogTourPopup.style.transform = "none";
    const popupWidth = catalogTourPopup.offsetWidth || 320;
    const popupHeight = catalogTourPopup.offsetHeight || 180;
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const gap = 16;
    const margin = 12;
    const fits = {
      bottom: vh - rect.bottom >= popupHeight + gap,
      top: rect.top >= popupHeight + gap,
      right: vw - rect.right >= popupWidth + gap,
      left: rect.left >= popupWidth + gap,
    };

    let side = step.placement;
    if (!fits[side]) {
      side = ["bottom", "top", "right", "left"].find((candidate) => fits[candidate]) || "bottom";
    }

    let top;
    let left;
    if (side === "bottom" || side === "top") {
      top = side === "bottom" ? rect.bottom + gap : rect.top - gap - popupHeight;
      left = rect.left + rect.width / 2 - popupWidth / 2;
    } else {
      left = side === "right" ? rect.right + gap : rect.left - gap - popupWidth;
      top = rect.top + rect.height / 2 - popupHeight / 2;
    }

    top = Math.min(Math.max(top, margin), vh - popupHeight - margin);
    left = Math.min(Math.max(left, margin), vw - popupWidth - margin);
    catalogTourPopup.style.top = `${top}px`;
    catalogTourPopup.style.left = `${left}px`;
  }

  function startCatalogTour() {
    if (!exercisesCatalog || exercisesCatalog.hidden || currentExercise || isRoutineHash(location.hash)) {
      return;
    }
    buildCatalogTour();
    endRoutineCartTour();
    endRoutineViewTour();
    catalogTourPreviousFocus = document.activeElement;
    catalogTourActive = true;
    catalogTourBackdrop.hidden = false;
    catalogTourDismissCheckbox.checked = false;
    goToCatalogTourStep(0, 1);
    window.setTimeout(() => catalogTourNextButton.focus(), 60);

    catalogTourRepositionHandler = () => {
      if (catalogTourActive) {
        positionCatalogTourAt(CATALOG_TOUR_STEPS[catalogTourIndex], catalogTourCurrentTarget());
      }
    };
    window.addEventListener("resize", catalogTourRepositionHandler);
    window.addEventListener("scroll", catalogTourRepositionHandler, true);
  }

  function endCatalogTour() {
    if (!catalogTourActive) {
      return;
    }
    catalogTourActive = false;
    catalogTourBackdrop.hidden = true;
    if (catalogTourDismissCheckbox && catalogTourDismissCheckbox.checked) {
      try {
        window.localStorage.setItem(CATALOG_TOUR_KEY, "1");
      } catch (error) {
        /* almacenamiento no disponible */
      }
    }
    window.removeEventListener("resize", catalogTourRepositionHandler);
    window.removeEventListener("scroll", catalogTourRepositionHandler, true);
    catalogTourRepositionHandler = null;

    if (catalogTourPreviousFocus && document.contains(catalogTourPreviousFocus)) {
      catalogTourPreviousFocus.focus();
    }
  }

  function maybeAutoStartCatalogTour() {
    if (catalogTourAutoStarted) {
      return;
    }
    catalogTourAutoStarted = true;
    try {
      if (window.localStorage.getItem(CATALOG_TOUR_KEY) === "1") {
        return;
      }
    } catch (error) {
      /* almacenamiento no disponible */
    }
    startCatalogTour();
  }

  function resetAndStartCatalogTour() {
    try {
      window.localStorage.removeItem(CATALOG_TOUR_KEY);
    } catch (error) {
      /* almacenamiento no disponible */
    }
    catalogTourAutoStarted = false;
    startCatalogTour();
  }

  function routineCartTourCurrentTarget() {
    const step = ROUTINE_CART_TOUR_STEPS[routineCartTourIndex];
    return step.placement !== "center" ? document.querySelector(step.selector) : null;
  }

  function buildRoutineCartTour() {
    if (routineCartTourBuilt) {
      return;
    }
    routineCartTourBuilt = true;

    routineCartTourBackdrop = document.createElement("div");
    routineCartTourBackdrop.className = "tour-backdrop";
    routineCartTourBackdrop.hidden = true;

    routineCartTourSpot = document.createElement("div");
    routineCartTourSpot.className = "tour-spot";

    routineCartTourPopup = document.createElement("div");
    routineCartTourPopup.className = "tour-popup";
    routineCartTourPopup.setAttribute("role", "dialog");
    routineCartTourPopup.setAttribute("aria-modal", "true");
    routineCartTourPopup.setAttribute("aria-labelledby", "routine-cart-tour-title");
    routineCartTourPopup.innerHTML = `
      <button type="button" class="tour-popup__close" data-routine-cart-tour-close aria-label="Cerrar guía">×</button>
      <p class="tour-popup__step" data-routine-cart-tour-step></p>
      <h2 class="tour-popup__title" id="routine-cart-tour-title" data-routine-cart-tour-title></h2>
      <p class="tour-popup__text" data-routine-cart-tour-text></p>
      <div class="tour-popup__footer">
        <label class="tour-popup__dismiss">
          <input type="checkbox" data-routine-cart-tour-dismiss>
          No volver a mostrar
        </label>
        <div class="tour-popup__nav">
          <button type="button" class="tour-popup__prev" data-routine-cart-tour-prev>Anterior</button>
          <button type="button" class="tour-popup__next" data-routine-cart-tour-next>Siguiente</button>
        </div>
      </div>
    `;

    routineCartTourBackdrop.appendChild(routineCartTourSpot);
    routineCartTourBackdrop.appendChild(routineCartTourPopup);
    document.body.appendChild(routineCartTourBackdrop);

    routineCartTourStepLabel = routineCartTourPopup.querySelector("[data-routine-cart-tour-step]");
    routineCartTourTitle = routineCartTourPopup.querySelector("[data-routine-cart-tour-title]");
    routineCartTourText = routineCartTourPopup.querySelector("[data-routine-cart-tour-text]");
    routineCartTourDismissCheckbox = routineCartTourPopup.querySelector("[data-routine-cart-tour-dismiss]");
    routineCartTourPrevButton = routineCartTourPopup.querySelector("[data-routine-cart-tour-prev]");
    routineCartTourNextButton = routineCartTourPopup.querySelector("[data-routine-cart-tour-next]");
    routineCartTourCloseButton = routineCartTourPopup.querySelector("[data-routine-cart-tour-close]");

    routineCartTourCloseButton.addEventListener("click", () => {
      if (maybeJumpToRoutineCartTourFinalStep()) {
        return;
      }
      endRoutineCartTour();
    });
    routineCartTourPrevButton.addEventListener("click", () => {
      if (maybeJumpToRoutineCartTourFinalStep()) {
        return;
      }
      goToRoutineCartTourStep(routineCartTourIndex - 1, -1);
    });
    routineCartTourNextButton.addEventListener("click", () => {
      if (maybeJumpToRoutineCartTourFinalStep()) {
        return;
      }
      if (routineCartTourIndex === ROUTINE_CART_TOUR_STEPS.length - 1) {
        endRoutineCartTour();
      } else {
        goToRoutineCartTourStep(routineCartTourIndex + 1, 1);
      }
    });

    document.addEventListener("keydown", (event) => {
      if (!routineCartTourActive) {
        return;
      }
      if (event.key === "Escape") {
        event.preventDefault();
        endRoutineCartTour();
      } else if (event.key === "ArrowRight") {
        routineCartTourNextButton.click();
      } else if (event.key === "ArrowLeft" && !routineCartTourPrevButton.disabled) {
        routineCartTourPrevButton.click();
      } else if (event.key === "Tab") {
        trapRoutineCartTourFocus(event);
      }
    });
  }

  function maybeJumpToRoutineCartTourFinalStep() {
    if (
      routineCartTourDismissCheckbox &&
      routineCartTourDismissCheckbox.checked &&
      routineCartTourIndex < ROUTINE_CART_TOUR_STEPS.length - 1
    ) {
      goToRoutineCartTourStep(ROUTINE_CART_TOUR_STEPS.length - 1, 1);
      return true;
    }
    return false;
  }

  function trapRoutineCartTourFocus(event) {
    const focusable = routineCartTourPopup.querySelectorAll("button, input");
    if (focusable.length === 0) {
      return;
    }
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  }

  function goToRoutineCartTourStep(requestedIndex, direction) {
    let index = requestedIndex;
    while (index >= 0 && index < ROUTINE_CART_TOUR_STEPS.length) {
      const step = ROUTINE_CART_TOUR_STEPS[index];
      if (step.placement === "center" || document.querySelector(step.selector)) {
        routineCartTourIndex = index;
        renderRoutineCartTourStep();
        return;
      }
      index += direction;
    }
    endRoutineCartTour();
  }

  function renderRoutineCartTourStep() {
    const step = ROUTINE_CART_TOUR_STEPS[routineCartTourIndex];
    routineCartTourStepLabel.textContent = `Paso ${routineCartTourIndex + 1} de ${ROUTINE_CART_TOUR_STEPS.length}`;
    routineCartTourTitle.textContent = step.title;
    routineCartTourText.textContent = step.text;
    routineCartTourPrevButton.disabled = routineCartTourIndex === 0;
    routineCartTourNextButton.textContent =
      routineCartTourIndex === ROUTINE_CART_TOUR_STEPS.length - 1 ? "Entendido" : "Siguiente";

    const target = routineCartTourCurrentTarget();
    if (target) {
      target.scrollIntoView({
        block: "center",
        inline: "nearest",
        behavior: prefersReducedMotion ? "auto" : "smooth",
      });
    }

    window.setTimeout(() => positionRoutineCartTourAt(step, target), target && !prefersReducedMotion ? 260 : 0);
  }

  function positionRoutineCartTourAt(step, target) {
    if (!routineCartTourPopup || !routineCartTourSpot) {
      return;
    }

    if (!target) {
      routineCartTourPopup.style.transform = "translate(-50%, -50%)";
      routineCartTourPopup.style.top = "50%";
      routineCartTourPopup.style.left = "50%";
      routineCartTourPopup.style.maxWidth = "calc(100vw - 2rem)";
      const popupRect = routineCartTourPopup.getBoundingClientRect();
      const pad = 10;
      routineCartTourSpot.style.top = `${popupRect.top - pad}px`;
      routineCartTourSpot.style.left = `${popupRect.left - pad}px`;
      routineCartTourSpot.style.width = `${popupRect.width + pad * 2}px`;
      routineCartTourSpot.style.height = `${popupRect.height + pad * 2}px`;
      return;
    }

    const rect = target.getBoundingClientRect();
    const pad = 8;
    routineCartTourSpot.style.top = `${rect.top - pad}px`;
    routineCartTourSpot.style.left = `${rect.left - pad}px`;
    routineCartTourSpot.style.width = `${rect.width + pad * 2}px`;
    routineCartTourSpot.style.height = `${rect.height + pad * 2}px`;

    routineCartTourPopup.style.transform = "none";
    const popupWidth = routineCartTourPopup.offsetWidth || 320;
    const popupHeight = routineCartTourPopup.offsetHeight || 180;
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const gap = 16;
    const margin = 12;
    const fits = {
      bottom: vh - rect.bottom >= popupHeight + gap,
      top: rect.top >= popupHeight + gap,
      right: vw - rect.right >= popupWidth + gap,
      left: rect.left >= popupWidth + gap,
    };

    let side = step.placement;
    if (!fits[side]) {
      side = ["bottom", "top", "right", "left"].find((candidate) => fits[candidate]) || "bottom";
    }

    let top;
    let left;
    if (side === "bottom" || side === "top") {
      top = side === "bottom" ? rect.bottom + gap : rect.top - gap - popupHeight;
      left = rect.left + rect.width / 2 - popupWidth / 2;
    } else {
      left = side === "right" ? rect.right + gap : rect.left - gap - popupWidth;
      top = rect.top + rect.height / 2 - popupHeight / 2;
    }

    top = Math.min(Math.max(top, margin), vh - popupHeight - margin);
    left = Math.min(Math.max(left, margin), vw - popupWidth - margin);
    routineCartTourPopup.style.top = `${top}px`;
    routineCartTourPopup.style.left = `${left}px`;
  }

  function startRoutineCartTour() {
    if (!routineCart || !routineCartBuilder || routineCartBuilder.hidden) {
      return;
    }
    buildRoutineCartTour();
    routineCartTourPreviousFocus = document.activeElement;
    routineCartTourActive = true;
    routineCartTourBackdrop.hidden = false;
    routineCartTourDismissCheckbox.checked = false;
    goToRoutineCartTourStep(0, 1);
    window.setTimeout(() => routineCartTourNextButton.focus(), 60);

    routineCartTourRepositionHandler = () => {
      if (routineCartTourActive) {
        positionRoutineCartTourAt(ROUTINE_CART_TOUR_STEPS[routineCartTourIndex], routineCartTourCurrentTarget());
      }
    };
    window.addEventListener("resize", routineCartTourRepositionHandler);
    window.addEventListener("scroll", routineCartTourRepositionHandler, true);
  }

  function endRoutineCartTour() {
    if (!routineCartTourActive) {
      return;
    }
    routineCartTourActive = false;
    routineCartTourBackdrop.hidden = true;
    if (routineCartTourDismissCheckbox.checked) {
      try {
        window.localStorage.setItem(ROUTINE_CART_TOUR_KEY, "1");
      } catch (error) {
        /* almacenamiento no disponible */
      }
    }
    window.removeEventListener("resize", routineCartTourRepositionHandler);
    window.removeEventListener("scroll", routineCartTourRepositionHandler, true);
    routineCartTourRepositionHandler = null;

    if (routineCartTourPreviousFocus && document.contains(routineCartTourPreviousFocus)) {
      routineCartTourPreviousFocus.focus();
    }
  }

  function maybeAutoStartRoutineCartTour() {
    if (routineCartTourAutoStarted) {
      return;
    }
    routineCartTourAutoStarted = true;
    try {
      if (window.localStorage.getItem(ROUTINE_CART_TOUR_KEY) === "1") {
        return;
      }
    } catch (error) {
      /* almacenamiento no disponible */
    }
    startRoutineCartTour();
  }

  function resetAndStartRoutineCartTour() {
    try {
      window.localStorage.removeItem(ROUTINE_CART_TOUR_KEY);
    } catch (error) {
      /* almacenamiento no disponible */
    }
    routineCartTourAutoStarted = false;
    startRoutineCartTour();
  }

  function routineViewTourCurrentTarget() {
    const step = ROUTINE_VIEW_TOUR_STEPS[routineViewTourIndex];
    return step ? document.querySelector(step.selector) : null;
  }

  function buildRoutineViewTour() {
    if (routineViewTourBuilt) {
      return;
    }
    routineViewTourBuilt = true;

    routineViewTourBackdrop = document.createElement("div");
    routineViewTourBackdrop.className = "tour-backdrop";
    routineViewTourBackdrop.hidden = true;

    routineViewTourSpot = document.createElement("div");
    routineViewTourSpot.className = "tour-spot";

    routineViewTourPopup = document.createElement("div");
    routineViewTourPopup.className = "tour-popup";
    routineViewTourPopup.setAttribute("role", "dialog");
    routineViewTourPopup.setAttribute("aria-modal", "true");
    routineViewTourPopup.setAttribute("aria-labelledby", "routine-view-tour-title");
    routineViewTourPopup.innerHTML = `
      <button type="button" class="tour-popup__close" data-routine-view-tour-close aria-label="Cerrar guía">×</button>
      <p class="tour-popup__step" data-routine-view-tour-step></p>
      <h2 class="tour-popup__title" id="routine-view-tour-title" data-routine-view-tour-title></h2>
      <p class="tour-popup__text" data-routine-view-tour-text></p>
      <div class="tour-popup__footer">
        <label class="tour-popup__dismiss">
          <input type="checkbox" data-routine-view-tour-dismiss>
          No volver a mostrar
        </label>
        <div class="tour-popup__nav">
          <button type="button" class="tour-popup__prev" data-routine-view-tour-prev>Anterior</button>
          <button type="button" class="tour-popup__next" data-routine-view-tour-next>Siguiente</button>
        </div>
      </div>
    `;

    routineViewTourBackdrop.appendChild(routineViewTourSpot);
    routineViewTourBackdrop.appendChild(routineViewTourPopup);
    document.body.appendChild(routineViewTourBackdrop);

    routineViewTourStepLabel = routineViewTourPopup.querySelector("[data-routine-view-tour-step]");
    routineViewTourTitle = routineViewTourPopup.querySelector("[data-routine-view-tour-title]");
    routineViewTourText = routineViewTourPopup.querySelector("[data-routine-view-tour-text]");
    routineViewTourDismissCheckbox = routineViewTourPopup.querySelector("[data-routine-view-tour-dismiss]");
    routineViewTourPrevButton = routineViewTourPopup.querySelector("[data-routine-view-tour-prev]");
    routineViewTourNextButton = routineViewTourPopup.querySelector("[data-routine-view-tour-next]");
    routineViewTourCloseButton = routineViewTourPopup.querySelector("[data-routine-view-tour-close]");

    routineViewTourCloseButton.addEventListener("click", () => {
      if (maybeJumpToRoutineViewTourFinalStep()) {
        return;
      }
      endRoutineViewTour();
    });
    routineViewTourPrevButton.addEventListener("click", () => {
      if (maybeJumpToRoutineViewTourFinalStep()) {
        return;
      }
      goToRoutineViewTourStep(routineViewTourIndex - 1, -1);
    });
    routineViewTourNextButton.addEventListener("click", () => {
      if (maybeJumpToRoutineViewTourFinalStep()) {
        return;
      }
      if (routineViewTourIndex === ROUTINE_VIEW_TOUR_STEPS.length - 1) {
        endRoutineViewTour();
      } else {
        goToRoutineViewTourStep(routineViewTourIndex + 1, 1);
      }
    });

    document.addEventListener("keydown", (event) => {
      if (!routineViewTourActive) {
        return;
      }
      if (event.key === "Escape") {
        event.preventDefault();
        endRoutineViewTour();
      } else if (event.key === "ArrowRight") {
        routineViewTourNextButton.click();
      } else if (event.key === "ArrowLeft" && !routineViewTourPrevButton.disabled) {
        routineViewTourPrevButton.click();
      } else if (event.key === "Tab") {
        trapRoutineViewTourFocus(event);
      }
    });
  }

  function maybeJumpToRoutineViewTourFinalStep() {
    if (
      routineViewTourDismissCheckbox &&
      routineViewTourDismissCheckbox.checked &&
      routineViewTourIndex < ROUTINE_VIEW_TOUR_STEPS.length - 1
    ) {
      goToRoutineViewTourStep(ROUTINE_VIEW_TOUR_STEPS.length - 1, 1);
      return true;
    }
    return false;
  }

  function trapRoutineViewTourFocus(event) {
    const focusable = routineViewTourPopup.querySelectorAll("button, input");
    if (focusable.length === 0) {
      return;
    }
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  }

  function goToRoutineViewTourStep(requestedIndex, direction) {
    let index = requestedIndex;
    while (index >= 0 && index < ROUTINE_VIEW_TOUR_STEPS.length) {
      const step = ROUTINE_VIEW_TOUR_STEPS[index];
      if (step.placement === "center" || document.querySelector(step.selector)) {
        routineViewTourIndex = index;
        renderRoutineViewTourStep();
        return;
      }
      index += direction;
    }
    endRoutineViewTour();
  }

  function renderRoutineViewTourStep() {
    const step = ROUTINE_VIEW_TOUR_STEPS[routineViewTourIndex];
    routineViewTourStepLabel.textContent = `Paso ${routineViewTourIndex + 1} de ${ROUTINE_VIEW_TOUR_STEPS.length}`;
    routineViewTourTitle.textContent = step.title;
    routineViewTourText.textContent = step.text;
    routineViewTourPrevButton.disabled = routineViewTourIndex === 0;
    routineViewTourNextButton.textContent =
      routineViewTourIndex === ROUTINE_VIEW_TOUR_STEPS.length - 1 ? "Entendido" : "Siguiente";

    const target = routineViewTourCurrentTarget();
    if (target) {
      target.scrollIntoView({
        block: "center",
        inline: "nearest",
        behavior: prefersReducedMotion ? "auto" : "smooth",
      });
    }
    window.setTimeout(() => positionRoutineViewTourAt(step, target), target && !prefersReducedMotion ? 260 : 0);
  }

  function positionRoutineViewTourAt(step, target) {
    if (!routineViewTourPopup || !routineViewTourSpot) {
      return;
    }

    if (!target) {
      routineViewTourPopup.style.transform = "translate(-50%, -50%)";
      routineViewTourPopup.style.top = "50%";
      routineViewTourPopup.style.left = "50%";
      routineViewTourPopup.style.maxWidth = "calc(100vw - 2rem)";
      const popupRect = routineViewTourPopup.getBoundingClientRect();
      const pad = 10;
      routineViewTourSpot.style.top = `${popupRect.top - pad}px`;
      routineViewTourSpot.style.left = `${popupRect.left - pad}px`;
      routineViewTourSpot.style.width = `${popupRect.width + pad * 2}px`;
      routineViewTourSpot.style.height = `${popupRect.height + pad * 2}px`;
      return;
    }

    const rect = target.getBoundingClientRect();
    const pad = 8;
    routineViewTourSpot.style.top = `${rect.top - pad}px`;
    routineViewTourSpot.style.left = `${rect.left - pad}px`;
    routineViewTourSpot.style.width = `${rect.width + pad * 2}px`;
    routineViewTourSpot.style.height = `${rect.height + pad * 2}px`;

    routineViewTourPopup.style.transform = "none";
    const popupWidth = routineViewTourPopup.offsetWidth || 320;
    const popupHeight = routineViewTourPopup.offsetHeight || 180;
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const gap = 16;
    const margin = 12;
    const fits = {
      bottom: vh - rect.bottom >= popupHeight + gap,
      top: rect.top >= popupHeight + gap,
      right: vw - rect.right >= popupWidth + gap,
      left: rect.left >= popupWidth + gap,
    };

    let side = step.placement;
    if (!fits[side]) {
      side = ["bottom", "top", "right", "left"].find((candidate) => fits[candidate]) || "bottom";
    }

    let top;
    let left;
    if (side === "bottom" || side === "top") {
      top = side === "bottom" ? rect.bottom + gap : rect.top - gap - popupHeight;
      left = rect.left + rect.width / 2 - popupWidth / 2;
    } else {
      left = side === "right" ? rect.right + gap : rect.left - gap - popupWidth;
      top = rect.top + rect.height / 2 - popupHeight / 2;
    }

    top = Math.min(Math.max(top, margin), vh - popupHeight - margin);
    left = Math.min(Math.max(left, margin), vw - popupWidth - margin);
    routineViewTourPopup.style.top = `${top}px`;
    routineViewTourPopup.style.left = `${left}px`;
  }

  function startRoutineViewTour() {
    if (!routineView || routineView.hidden) {
      return;
    }
    buildRoutineViewTour();
    endRoutineCartTour();
    routineViewTourPreviousFocus = document.activeElement;
    routineViewTourActive = true;
    routineViewTourBackdrop.hidden = false;
    routineViewTourDismissCheckbox.checked = false;
    goToRoutineViewTourStep(0, 1);
    window.setTimeout(() => routineViewTourNextButton.focus(), 60);

    routineViewTourRepositionHandler = () => {
      if (routineViewTourActive) {
        positionRoutineViewTourAt(ROUTINE_VIEW_TOUR_STEPS[routineViewTourIndex], routineViewTourCurrentTarget());
      }
    };
    window.addEventListener("resize", routineViewTourRepositionHandler);
    window.addEventListener("scroll", routineViewTourRepositionHandler, true);
  }

  function endRoutineViewTour() {
    if (!routineViewTourActive) {
      return;
    }
    routineViewTourActive = false;
    routineViewTourBackdrop.hidden = true;
    if (routineViewTourDismissCheckbox && routineViewTourDismissCheckbox.checked) {
      try {
        window.localStorage.setItem(ROUTINE_VIEW_TOUR_KEY, "1");
      } catch (error) {
        /* almacenamiento no disponible */
      }
    }
    window.removeEventListener("resize", routineViewTourRepositionHandler);
    window.removeEventListener("scroll", routineViewTourRepositionHandler, true);
    routineViewTourRepositionHandler = null;

    if (routineViewTourPreviousFocus && document.contains(routineViewTourPreviousFocus)) {
      routineViewTourPreviousFocus.focus();
    }
  }

  function maybeAutoStartRoutineViewTour() {
    if (routineViewTourAutoStarted) {
      return;
    }
    routineViewTourAutoStarted = true;
    try {
      if (window.localStorage.getItem(ROUTINE_VIEW_TOUR_KEY) === "1") {
        return;
      }
    } catch (error) {
      /* almacenamiento no disponible */
    }
    startRoutineViewTour();
  }

  function resetAndStartRoutineViewTour() {
    try {
      window.localStorage.removeItem(ROUTINE_VIEW_TOUR_KEY);
    } catch (error) {
      /* almacenamiento no disponible */
    }
    routineViewTourAutoStarted = false;
    startRoutineViewTour();
  }

  function updateHeaderHeightVar() {
    const header = document.querySelector(".site-header");
    if (!header) {
      return;
    }
    document.documentElement.style.setProperty("--exercises-header-h", `${header.offsetHeight}px`);
  }

  function renderSkeleton(count) {
    grid.innerHTML = "";
    const fragment = document.createDocumentFragment();
    for (let i = 0; i < count; i += 1) {
      const card = document.createElement("div");
      card.className = "exercise-card-skeleton";
      card.innerHTML = `
        <div class="exercise-card-skeleton__media"></div>
        <div class="exercise-card-skeleton__body">
          <div class="exercise-card-skeleton__line exercise-card-skeleton__line--narrow"></div>
          <div class="exercise-card-skeleton__line exercise-card-skeleton__line--wide"></div>
        </div>
      `;
      fragment.appendChild(card);
    }
    grid.appendChild(fragment);
  }

  const EXERCISE_TYPE_VALUES = ["Cuerpo completo", "Cardio", "Movilidad y estiramientos"];
  const PRIMARY_GROUP_VALUES = ["Pecho", "Espalda", "Hombros"];
  const GROUP_AGGREGATES = {
    brazos: { label: "Brazos", all: "Brazo completo", values: ["Bíceps", "Tríceps", "Antebrazos"] },
    piernas: {
      label: "Piernas",
      all: "Pierna completa",
      values: ["Cuádriceps", "Isquiotibiales", "Glúteos", "Gemelos", "Aductores y abductores"],
    },
    core: { label: "Core", all: "Core completo", values: ["Abdominales", "Zona lumbar"] },
  };

  let payloadGrupos = [];
  const draftState = { grupo: "", equipamiento: "", favoritos: false };
  const expandedAggregateGroups = new Set();
  let previousFocusedElement = null;

  function routineFilterSourceExercises() {
    const seen = new Set();
    return routineViewItems
      .map((entry) => exercises.find((exercise) => exercise.id === entry.id))
      .filter((exercise) => {
        if (!exercise || seen.has(exercise.id)) {
          return false;
        }
        seen.add(exercise.id);
        return true;
      });
  }

  function filterSourceExercises() {
    return filterPanelMode === "routine" ? routineFilterSourceExercises() : exercises;
  }

  function filterValues(value) {
    if (Array.isArray(value)) {
      return value.map((item) => String(item || "").trim()).filter(Boolean);
    }
    return value ? [String(value).trim()].filter(Boolean) : [];
  }

  function uniqueFilterValues(values) {
    return Array.from(new Set(filterValues(values)));
  }

  function filterHasValue(source, value) {
    return filterValues(source).includes(value);
  }

  function filterCountForState(source) {
    return filterValues(source.grupo).length + filterValues(source.equipamiento).length + Number(Boolean(source.favoritos));
  }

  function groupValuesFor(value) {
    return GROUP_AGGREGATES[value] ? GROUP_AGGREGATES[value].values : [value];
  }

  function groupValuesForSelection(values) {
    return Array.from(new Set(filterValues(values).flatMap((value) => groupValuesFor(value))));
  }

  function countForGroupValue(value) {
    const values = groupValuesFor(value);
    return filterSourceExercises().filter((exercise) => values.some((item) => exercise.gruposMusculares.includes(item))).length;
  }

  function countForEquipmentValue(value) {
    return equipmentFilterSourceExercises().filter((exercise) => exercise.equipamiento.includes(value)).length;
  }

  function createRadioRow({ name, value, label, count, checked }) {
    const row = document.createElement("label");
    row.className = "filter-radio-row";
    row.innerHTML = `
      <input type="checkbox" name="${escapeHtml(name)}" value="${escapeHtml(value)}" ${checked ? "checked" : ""}>
      <span class="filter-radio-row__indicator" aria-hidden="true"></span>
      <span class="filter-radio-row__label">${escapeHtml(label)}</span>
      ${count === undefined ? "" : `<span class="filter-radio-row__count">${count}</span>`}
    `;
    return row;
  }

  function buildAggregateGroup(key, aggregate, realValues) {
    const selectedGroups = filterValues(draftState.grupo);
    const isExpanded =
      expandedAggregateGroups.has(key) || selectedGroups.includes(key) || realValues.some((value) => selectedGroups.includes(value));

    const wrapper = document.createElement("div");
    wrapper.className = "filter-expand-group";

    const toggle = document.createElement("button");
    toggle.type = "button";
    toggle.className = "filter-expand-toggle";
    toggle.setAttribute("aria-expanded", String(isExpanded));
    toggle.innerHTML = `
      <svg class="filter-expand-toggle__caret" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="m9 6 6 6-6 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path></svg>
      <span>${escapeHtml(aggregate.label)}</span>
    `;

    const panel = document.createElement("div");
    panel.className = "filter-expand-panel";
    panel.hidden = !isExpanded;
    panel.appendChild(
      createRadioRow({
        name: "filter-grupo",
        value: key,
        label: aggregate.all,
        count: countForGroupValue(key),
        checked: selectedGroups.includes(key),
      })
    );
    realValues.forEach((value) => {
      panel.appendChild(
        createRadioRow({
          name: "filter-grupo",
          value,
          label: value,
          count: countForGroupValue(value),
          checked: selectedGroups.includes(value),
        })
      );
    });

    toggle.addEventListener("click", () => {
      const expand = panel.hidden;
      panel.hidden = !expand;
      toggle.setAttribute("aria-expanded", String(expand));
      if (expand) {
        expandedAggregateGroups.add(key);
      } else {
        expandedAggregateGroups.delete(key);
      }
    });

    wrapper.appendChild(toggle);
    wrapper.appendChild(panel);
    return wrapper;
  }

  function buildGroupList() {
    filterGroupList.innerHTML = "";
    const selectedGroups = filterValues(draftState.grupo);
    const sourceGroups = filterPanelMode === "routine"
      ? Array.from(new Set(filterSourceExercises().flatMap((exercise) => exercise.gruposMusculares || [])))
      : payloadGrupos;
    const muscleGroups = sourceGroups.filter((group) => !EXERCISE_TYPE_VALUES.includes(group));

    filterGroupList.appendChild(
      createRadioRow({ name: "filter-grupo", value: "", label: "Todos", checked: selectedGroups.length === 0 })
    );

    PRIMARY_GROUP_VALUES.filter((group) => muscleGroups.includes(group)).forEach((group) => {
      filterGroupList.appendChild(
        createRadioRow({
          name: "filter-grupo",
          value: group,
          label: group,
          count: countForGroupValue(group),
          checked: selectedGroups.includes(group),
        })
      );
    });

    Object.entries(GROUP_AGGREGATES).forEach(([key, aggregate]) => {
      const realValues = aggregate.values.filter((value) => muscleGroups.includes(value));
      if (realValues.length > 0) {
        filterGroupList.appendChild(buildAggregateGroup(key, aggregate, realValues));
      }
    });
  }

  function exerciseMatchesDraftGroup(exercise) {
    const selectedValues = groupValuesForSelection(draftState.grupo);
    if (selectedValues.length === 0) {
      return true;
    }
    return selectedValues.some((value) => exercise.gruposMusculares.includes(value));
  }

  function equipmentFilterSourceExercises() {
    return filterSourceExercises().filter((exercise) => {
      if (draftState.favoritos && !isFavorite(exercise.id)) {
        return false;
      }
      return exerciseMatchesDraftGroup(exercise);
    });
  }

  function buildEquipmentList() {
    const equipmentSet = new Set();
    const selectedEquipment = filterValues(draftState.equipamiento);
    equipmentFilterSourceExercises().forEach((exercise) => exercise.equipamiento.forEach((item) => equipmentSet.add(item)));
    const equipmentValues = Array.from(equipmentSet).sort((a, b) => a.localeCompare(b, "es"));

    if (selectedEquipment.length) {
      draftState.equipamiento = selectedEquipment.filter((value) => equipmentSet.has(value));
    }

    filterEquipmentList.innerHTML = "";
    filterEquipmentList.appendChild(
      createRadioRow({ name: "filter-equipamiento", value: "", label: "Todo el equipamiento", checked: filterValues(draftState.equipamiento).length === 0 })
    );
    equipmentValues.forEach((value) => {
      filterEquipmentList.appendChild(
        createRadioRow({
          name: "filter-equipamiento",
          value,
          label: value,
          count: countForEquipmentValue(value),
          checked: filterHasValue(draftState.equipamiento, value),
        })
      );
    });

    if (filterEquipmentSearchWrap) {
      filterEquipmentSearchWrap.hidden = equipmentValues.length <= 8;
    }
  }

  function filterEquipmentRows(query) {
    const normalized = normalize(query.trim());
    let anyVisible = false;
    filterEquipmentList.querySelectorAll(".filter-radio-row").forEach((row) => {
      const input = row.querySelector("input");
      const isAll = input.value === "";
      const match = isAll || !normalized || normalize(row.textContent).includes(normalized);
      row.hidden = !match;
      if (match) {
        anyVisible = true;
      }
    });
    let emptyEl = filterEquipmentList.querySelector(".filter-radio-list__empty");
    if (!anyVisible) {
      if (!emptyEl) {
        emptyEl = document.createElement("p");
        emptyEl.className = "filter-radio-list__empty";
        emptyEl.textContent = "Sin resultados.";
        filterEquipmentList.appendChild(emptyEl);
      }
    } else if (emptyEl) {
      emptyEl.remove();
    }
  }

  function populateFilters(payload) {
    payloadGrupos = payload.grupos;
    buildGroupList();
    buildEquipmentList();
  }

  function matchesFiltersWith(exercise, candidate) {
    if (candidate.favoritos && !isFavorite(exercise.id)) {
      return false;
    }

    const selectedGroups = groupValuesForSelection(candidate.grupo);
    if (selectedGroups.length) {
      if (!selectedGroups.some((value) => exercise.gruposMusculares.includes(value))) {
        return false;
      }
    }

    const selectedEquipment = filterValues(candidate.equipamiento);
    if (selectedEquipment.length) {
      if (!selectedEquipment.some((value) => exercise.equipamiento.includes(value))) {
        return false;
      }
    }

    if (candidate.q) {
      const haystack = normalize(
        [
          exercise.nombre,
          exercise.nombreAlternativo || "",
          exercise.grupoMuscular,
          exercise.parteCuerpo,
          exercise.categoria,
          ...(exercise.gruposMusculares || []),
          ...(exercise.musculosPrincipales || []),
          ...(exercise.musculosSecundarios || []),
          ...(exercise.equipamiento || []),
        ].join(" ")
      );
      if (!haystack.includes(normalize(candidate.q))) {
        return false;
      }
    }

    return true;
  }

  function matchesFilters(exercise) {
    return matchesFiltersWith(exercise, state);
  }

  function countMatchesForDraft() {
    const baseState = filterPanelMode === "routine"
      ? routineFilterState
      : filterPanelMode === "picker"
        ? routineExercisePickerState
        : state;
    const candidate = { q: baseState.q, grupo: draftState.grupo, equipamiento: draftState.equipamiento, favoritos: draftState.favoritos };
    return filterSourceExercises().filter((exercise) => matchesFiltersWith(exercise, candidate)).length;
  }

  function renderCard(exercise, options = {}) {
    const isRoutineCard = options.context === "routine";
    const card = document.createElement("div");
    card.className = isRoutineCard ? "exercise-card exercise-card--routine" : "exercise-card";
    card.dataset.exerciseId = exercise.id;
    card.dataset.current = String(currentExercise && currentExercise.id === exercise.id);
    const isInRoutine = isInRoutineCart(exercise.id);
    const routineActionLabel = isInRoutine
      ? `Añadir otra vez ${exercise.nombre} a la rutina`
      : `Añadir ${exercise.nombre} a la rutina`;

    const media = exercise.imagenInicial
      ? `<img src="${escapeHtml(exercise.imagenInicial)}" alt="" loading="lazy" decoding="async" width="512" height="512">`
      : `<div class="exercise-card__media--empty">Sin imagen disponible</div>`;

    card.innerHTML = `
      <button type="button" class="exercise-card__open">
        <span class="exercise-card__media">
          ${media}
        </span>
        <span class="exercise-card__body">
          <span class="exercise-card__name" role="heading" aria-level="2">${escapeHtml(exercise.nombre)}</span>
          <span class="exercise-card__group">${escapeHtml(exercise.grupoMuscular)}</span>
          <span class="exercise-card__meta">${escapeHtml(exercise.equipamiento[0] || "Peso corporal")}</span>
        </span>
      </button>
      <button type="button" class="exercise-card__favorite" data-favorite-toggle="${escapeHtml(exercise.id)}" aria-pressed="${isFavorite(exercise.id)}" aria-label="Guardar ${escapeHtml(exercise.nombre)} en favoritos">
        ${HEART_ICON}
      </button>
      ${
        isRoutineCard
          ? ""
          : `<button type="button" class="exercise-card__add" data-routine-toggle="${escapeHtml(exercise.id)}" aria-pressed="${isInRoutine}" aria-label="${escapeHtml(routineActionLabel)}">
              <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M12 5v14M5 12h14" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"></path></svg>
              <span data-routine-toggle-label>${isInRoutine ? "Añadir otra vez" : "Añadir a rutina"}</span>
            </button>`
      }
    `;

    card
      .querySelector(".exercise-card__open")
      .addEventListener("click", () => (isRoutineCard ? openExerciseFromRoutine(exercise) : openExercise(exercise, true)));
    card.querySelector(".exercise-card__favorite").addEventListener("click", () => toggleFavorite(exercise.id));
    const addButton = card.querySelector(".exercise-card__add");
    if (addButton) {
      addButton.addEventListener("click", () => toggleRoutineCartItem(exercise.id));
    }

    return card;
  }

  function syncCurrentCard() {
    grid.querySelectorAll("[data-exercise-id]").forEach((card) => {
      const isCurrent = Boolean(currentExercise && card.dataset.exerciseId === currentExercise.id);
      card.dataset.current = String(isCurrent);
    });
  }

  function formatPrescription(settings) {
    const parts = [];
    if (settings.series) {
      parts.push(`${settings.series} series`);
    }
    if (settings.reps) {
      parts.push(`${settings.reps} reps`);
    }
    if (settings.rest) {
      const rest = String(settings.rest).trim();
      const restLabel = /^\d+(?:[.,]\d+)?$/.test(rest) ? `${rest} min` : rest;
      parts.push(`Descanso ${restLabel}`);
    }
    return parts.join(" · ");
  }

  function renderRoutineCard(entry) {
    const exercise = exercises.find((item) => item.id === entry.id);
    if (!exercise) {
      return null;
    }

    const card = renderCard(exercise, { context: "routine" });
    const prescription = formatPrescription(entry);
    if (prescription) {
      const body = card.querySelector(".exercise-card__body");
      const footer = card.querySelector(".exercise-card__footer");
      const prescriptionEl = document.createElement("span");
      prescriptionEl.className = "routine-view__prescription";
      prescriptionEl.textContent = prescription;
      body.insertBefore(prescriptionEl, footer);
    }
    return card;
  }

  function routineEntryMatches(entry) {
    const exercise = exercises.find((item) => item.id === entry.id);
    return Boolean(exercise && matchesFiltersWith(exercise, routineFilterState));
  }

  function groupLabelFor(value) {
    return GROUP_AGGREGATES[value] ? GROUP_AGGREGATES[value].label : value;
  }

  function activeFilterLabels() {
    const labels = [];
    filterValues(state.grupo).forEach((value) => labels.push(groupLabelFor(value)));
    filterValues(state.equipamiento).forEach((value) => labels.push(value));
    if (state.favoritos) {
      labels.push("Solo favoritos");
    }
    return labels;
  }

  function activeRoutineFilterLabels() {
    const labels = [];
    filterValues(routineFilterState.grupo).forEach((value) => labels.push(groupLabelFor(value)));
    filterValues(routineFilterState.equipamiento).forEach((value) => labels.push(value));
    if (routineFilterState.favoritos) {
      labels.push("Solo favoritos");
    }
    return labels;
  }

  function activeFilterCount() {
    return activeFilterLabels().length;
  }

  function activeRoutineFilterCount() {
    return activeRoutineFilterLabels().length;
  }

  function resetFilters() {
    state.grupo = [];
    state.equipamiento = [];
    state.favoritos = false;
    renderGrid();
  }

  function resetRoutineFilters() {
    routineFilterState.grupo = [];
    routineFilterState.equipamiento = [];
    routineFilterState.favoritos = false;
    checkRoutineView({ scrollToTop: false });
  }

  function updateFiltersButton() {
    const count = activeFilterCount();
    if (filtersBadge) {
      filtersBadge.hidden = count === 0;
      filtersBadge.textContent = String(count);
    }
    if (filtersOpenButton) {
      filtersOpenButton.classList.toggle("is-active", count > 0);
    }
  }

  function updateRoutineFiltersButton() {
    const count = activeRoutineFilterCount();
    if (routineFiltersBadge) {
      routineFiltersBadge.hidden = count === 0;
      routineFiltersBadge.textContent = String(count);
    }
    if (routineFiltersOpenButton) {
      routineFiltersOpenButton.classList.toggle("is-active", count > 0);
    }
  }

  function renderFiltersSummary() {
    const labels = activeFilterLabels();
    if (!filtersSummary) {
      return;
    }
    if (labels.length === 0) {
      filtersSummary.hidden = true;
      return;
    }
    filtersSummary.hidden = false;
    filtersSummaryText.textContent = `Filtros: ${labels.join(" · ")}`;
  }

  function renderRoutineFiltersSummary() {
    const labels = activeRoutineFilterLabels();
    if (!routineFiltersSummary) {
      return;
    }
    if (labels.length === 0) {
      routineFiltersSummary.hidden = true;
      return;
    }
    routineFiltersSummary.hidden = false;
    routineFiltersSummaryText.textContent = `Filtros: ${labels.join(" · ")}`;
  }

  function initLazyImages(container) {
    container.querySelectorAll("img").forEach((img) => {
      if (img.complete && img.naturalWidth > 0) {
        img.classList.add("is-loaded");
        return;
      }
      img.addEventListener(
        "load",
        () => {
          img.classList.add("is-loaded");
        },
        { once: true }
      );
    });
  }

  function renderGrid() {
    const filtered = exercises.filter(matchesFilters);

    grid.innerHTML = "";
    const fragment = document.createDocumentFragment();
    filtered.forEach((exercise) => fragment.appendChild(renderCard(exercise)));
    grid.appendChild(fragment);
    initLazyImages(grid);

    emptyState.hidden = filtered.length > 0;
    emptyState.textContent =
      state.favoritos && favorites.size === 0
        ? "Aún no tienes ejercicios favoritos. Toca el ♥ de una tarjeta para guardarlos aquí."
        : "No hay ejercicios que coincidan con estos filtros. Prueba a cambiar la búsqueda o el grupo muscular.";
    countLabel.textContent =
      filtered.length === exercises.length
        ? `${exercises.length} ejercicios encontrados`
        : `${filtered.length} de ${exercises.length} ejercicios encontrados`;

    if (printFavoritesButton) {
      printFavoritesButton.hidden = !(state.favoritos && filtered.length > 0);
    }

    updateFiltersButton();
    renderFiltersSummary();
  }

  function renderMedia(exercise) {
    const figures = [];
    if (exercise.imagenInicial) {
      figures.push(`
        <figure class="exercise-detail__position">
          <figcaption>Posición inicial</figcaption>
          <img src="${escapeHtml(exercise.imagenInicial)}" alt="${escapeHtml(exercise.nombre)} — posición inicial" loading="lazy" decoding="async" width="512" height="512">
        </figure>
      `);
    }
    if (exercise.imagenFinal) {
      figures.push(`
        <figure class="exercise-detail__position">
          <figcaption>Posición final</figcaption>
          <img src="${escapeHtml(exercise.imagenFinal)}" alt="${escapeHtml(exercise.nombre)} — posición final" loading="lazy" decoding="async" width="512" height="512">
        </figure>
      `);
    }

    if (figures.length === 0) {
      return "";
    }

    return `<div class="exercise-detail__positions ${figures.length === 1 ? "has-one" : "has-two"}">${figures.join("")}</div>`;
  }

  function renderList(items) {
    return items.map((item) => `<li>${escapeHtml(item)}</li>`).join("");
  }

  function renderSteps(items) {
    return items.map((item, index) => `<li><span>${index + 1}</span><p>${escapeHtml(item)}</p></li>`).join("");
  }

  function getSimilarExercises(exercise, limit) {
    return exercises
      .filter((item) => item.id !== exercise.id)
      .filter((item) => item.gruposMusculares.some((group) => exercise.gruposMusculares.includes(group)))
      .slice(0, limit);
  }

  function renderSimilar(exercise) {
    const similar = getSimilarExercises(exercise, 8);

    if (similar.length === 0) {
      return "";
    }

    const cards = similar
      .map(
        (item) => `
          <button type="button" class="exercise-detail__similar-card" data-similar-id="${escapeHtml(item.id)}">
            <span class="exercise-detail__similar-card-media">
              ${
                item.imagenInicial
                  ? `<img src="${escapeHtml(item.imagenInicial)}" alt="" loading="lazy" decoding="async" width="512" height="512">`
                  : ""
              }
            </span>
            <span>${escapeHtml(item.nombre)}</span>
          </button>
        `
      )
      .join("");

    return `
      <section class="exercise-detail__similar">
        <h3>Ejercicios similares</h3>
        <div class="exercise-detail__similar-row">${cards}</div>
      </section>
    `;
  }

  function renderExerciseDetail(exercise, options = {}) {
    if (!exercisePageContent) {
      return;
    }

    const anatomyImage = exercise.imagenAnatomia || exercise.imagenAnatomica || "";
    const showRoutineActions = !options.readOnlyRoutine;
    const isInRoutine = isInRoutineCart(exercise.id);
    const routineActionLabel = isInRoutine
      ? `Añadir otra vez ${exercise.nombre} a la rutina`
      : `Añadir ${exercise.nombre} a la rutina`;

    exercisePageContent.innerHTML = `
      <article class="exercise-detail" aria-labelledby="exercise-page-title">
        <div class="exercise-detail__topbar">
          <h1 id="exercise-page-title">${escapeHtml(exercise.nombre)}</h1>
          <div class="exercise-detail__actions">
            ${
              showRoutineActions
                ? `<button type="button" class="exercise-detail__favorite" data-favorite-toggle="${escapeHtml(exercise.id)}" aria-pressed="${isFavorite(exercise.id)}" aria-label="Guardar ${escapeHtml(exercise.nombre)} en favoritos">
                    ${HEART_ICON}
                  </button>
                  <button type="button" class="exercise-detail__add" data-routine-toggle="${escapeHtml(exercise.id)}" aria-pressed="${isInRoutine}" aria-label="${escapeHtml(routineActionLabel)}">
                    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M12 5v14M5 12h14" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"></path></svg>
                    <span data-routine-toggle-label>${isInRoutine ? "Añadir otra vez" : "Añadir a rutina"}</span>
                  </button>`
                : ""
            }
            <button type="button" class="exercise-detail__close" data-exercise-back aria-label="Cerrar ficha de ejercicio">
              <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18" stroke="currentColor" stroke-width="2" stroke-linecap="round"></path></svg>
            </button>
          </div>
        </div>

        <header class="exercise-detail__header">
          <div class="exercise-detail__meta-line">
            <p class="exercise-detail__eyebrow">${escapeHtml(exercise.grupoMuscular)}</p>
            ${exercise.nombreAlternativo ? `<p class="exercise-detail__alt-name">${escapeHtml(exercise.nombreAlternativo)}</p>` : ""}
          </div>
        </header>

        ${exercise.descripcion ? `<p class="exercise-detail__description">${escapeHtml(exercise.descripcion)}</p>` : ""}

        <div class="exercise-detail__info">
          <div class="exercise-detail__copy">
            ${
              exercise.musculosPrincipales.length || exercise.musculosSecundarios.length
                ? `<section class="exercise-detail__muscles">
                    ${
                      exercise.musculosPrincipales.length
                        ? `<div class="exercise-detail__muscle-group"><span>Músculos principales</span><ul class="exercise-detail__muscle-tags exercise-detail__muscle-tags--primary">${renderList(exercise.musculosPrincipales)}</ul></div>`
                        : ""
                    }
                    ${
                      exercise.musculosSecundarios.length
                        ? `<div class="exercise-detail__muscle-group"><span>Músculos secundarios</span><ul class="exercise-detail__muscle-tags exercise-detail__muscle-tags--secondary">${renderList(exercise.musculosSecundarios)}</ul></div>`
                        : ""
                    }
                  </section>`
                : ""
            }
          </div>
          ${
            anatomyImage
              ? `<figure class="exercise-detail__anatomy"><img src="${escapeHtml(anatomyImage)}" alt="" loading="lazy" decoding="async"></figure>`
              : ""
          }
        </div>

        ${renderMedia(exercise)}

        <div class="exercise-detail__guidance">
          ${
            exercise.instrucciones.length
              ? `<section class="exercise-detail__section">
                  <h2>Instrucciones</h2>
                  <ol class="exercise-detail__steps">${renderSteps(exercise.instrucciones)}</ol>
                </section>`
              : ""
          }
          ${
            exercise.consejos.length
              ? `<section class="exercise-detail__section">
                  <h2>Consejos</h2>
                  <ul class="exercise-detail__tips">${renderList(exercise.consejos)}</ul>
                </section>`
              : ""
          }
        </div>

        ${renderSimilar(exercise)}
      </article>
    `;

    initLazyImages(exercisePageContent);
  }

  function closeRoutineExercisePreview() {
    if (!routineCart) {
      return;
    }
    const preview = routineCart.querySelector("[data-routine-exercise-preview]");
    if (preview) {
      preview.remove();
    }
  }

  function openRoutineExercisePreview(id) {
    if (!routineCart) {
      return;
    }
    const exercise = getExerciseById(id);
    if (!exercise) {
      return;
    }
    closeRoutineExercisePreview();

    const anatomyImage = exercise.imagenAnatomia || exercise.imagenAnatomica || "";
    const preview = document.createElement("div");
    preview.className = "routine-cart__exercise-preview";
    preview.dataset.routineExercisePreview = "";
    preview.setAttribute("role", "dialog");
    preview.setAttribute("aria-modal", "false");
    preview.setAttribute("aria-labelledby", "routine-exercise-preview-title");
    preview.innerHTML = `
      <button type="button" class="routine-cart__exercise-preview-backdrop" data-routine-info-close aria-label="Cerrar detalles del ejercicio"></button>
      <article class="routine-cart__exercise-preview-panel exercise-detail" aria-labelledby="routine-exercise-preview-title">
        <div class="exercise-detail__topbar">
          <h1 id="routine-exercise-preview-title">${escapeHtml(exercise.nombre)}</h1>
          <div class="exercise-detail__actions">
            <button type="button" class="exercise-detail__add" data-routine-info-add="${escapeHtml(exercise.id)}" aria-label="Añadir otra vez ${escapeHtml(exercise.nombre)} a la rutina">
              <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M12 5v14M5 12h14" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"></path></svg>
              <span>Añadir otra vez</span>
            </button>
            <button type="button" class="exercise-detail__close" data-routine-info-close aria-label="Cerrar detalles del ejercicio">
              <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18" stroke="currentColor" stroke-width="2" stroke-linecap="round"></path></svg>
            </button>
          </div>
        </div>

        <header class="exercise-detail__header">
          <div class="exercise-detail__meta-line">
            <p class="exercise-detail__eyebrow">${escapeHtml(exercise.grupoMuscular)}</p>
            ${exercise.nombreAlternativo ? `<p class="exercise-detail__alt-name">${escapeHtml(exercise.nombreAlternativo)}</p>` : ""}
          </div>
        </header>

        ${exercise.descripcion ? `<p class="exercise-detail__description">${escapeHtml(exercise.descripcion)}</p>` : ""}

        <div class="exercise-detail__info">
          <div class="exercise-detail__copy">
            ${
              exercise.musculosPrincipales.length || exercise.musculosSecundarios.length
                ? `<section class="exercise-detail__muscles">
                    ${
                      exercise.musculosPrincipales.length
                        ? `<div class="exercise-detail__muscle-group"><span>Músculos principales</span><ul class="exercise-detail__muscle-tags exercise-detail__muscle-tags--primary">${renderList(exercise.musculosPrincipales)}</ul></div>`
                        : ""
                    }
                    ${
                      exercise.musculosSecundarios.length
                        ? `<div class="exercise-detail__muscle-group"><span>Músculos secundarios</span><ul class="exercise-detail__muscle-tags exercise-detail__muscle-tags--secondary">${renderList(exercise.musculosSecundarios)}</ul></div>`
                        : ""
                    }
                  </section>`
                : ""
            }
          </div>
          ${
            anatomyImage
              ? `<figure class="exercise-detail__anatomy"><img src="${escapeHtml(anatomyImage)}" alt="" loading="lazy" decoding="async"></figure>`
              : ""
          }
        </div>

        ${renderMedia(exercise)}

        <div class="exercise-detail__guidance">
          ${
            exercise.instrucciones.length
              ? `<section class="exercise-detail__section"><h2>Instrucciones</h2><ol class="exercise-detail__steps">${renderSteps(exercise.instrucciones)}</ol></section>`
              : ""
          }
          ${
            exercise.consejos.length
              ? `<section class="exercise-detail__section"><h2>Consejos</h2><ul class="exercise-detail__tips">${renderList(exercise.consejos)}</ul></section>`
              : ""
          }
        </div>

        ${renderSimilar(exercise)}
      </article>
    `;
    routineCart.appendChild(preview);
    initLazyImages(preview);
    const closeButton = preview.querySelector(".exercise-detail__close[data-routine-info-close]");
    if (closeButton) {
      closeButton.focus({ preventScroll: true });
    }
  }

  function closeRoutineExercisePickerDetail(picker = document.querySelector("[data-routine-exercise-picker]")) {
    if (!picker) {
      return false;
    }
    const preview = picker.querySelector("[data-routine-exercise-picker-detail]");
    if (!preview) {
      return false;
    }
    preview.remove();
    return true;
  }

  function openRoutineExercisePickerDetail(picker, id) {
    const exercise = getExerciseById(id);
    if (!picker || !exercise) {
      return;
    }
    closeRoutineExercisePickerDetail(picker);

    const anatomyImage = exercise.imagenAnatomia || exercise.imagenAnatomica || "";
    const preview = document.createElement("div");
    preview.className = "routine-cart__exercise-preview routine-exercise-picker__detail";
    preview.dataset.routineExercisePickerDetail = "";
    preview.setAttribute("role", "dialog");
    preview.setAttribute("aria-modal", "false");
    preview.setAttribute("aria-labelledby", "routine-exercise-picker-detail-title");
    preview.innerHTML = `
      <button type="button" class="routine-cart__exercise-preview-backdrop" data-routine-picker-detail-close aria-label="Cerrar detalles del ejercicio"></button>
      <article class="routine-cart__exercise-preview-panel exercise-detail" aria-labelledby="routine-exercise-picker-detail-title">
        <div class="exercise-detail__topbar">
          <h1 id="routine-exercise-picker-detail-title">${escapeHtml(exercise.nombre)}</h1>
          <div class="exercise-detail__actions">
            <button type="button" class="exercise-detail__close" data-routine-picker-detail-close aria-label="Cerrar detalles del ejercicio">
              <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18" stroke="currentColor" stroke-width="2" stroke-linecap="round"></path></svg>
            </button>
          </div>
        </div>

        <header class="exercise-detail__header">
          <div class="exercise-detail__meta-line">
            <p class="exercise-detail__eyebrow">${escapeHtml(exercise.grupoMuscular)}</p>
            ${exercise.nombreAlternativo ? `<p class="exercise-detail__alt-name">${escapeHtml(exercise.nombreAlternativo)}</p>` : ""}
          </div>
        </header>

        ${exercise.descripcion ? `<p class="exercise-detail__description">${escapeHtml(exercise.descripcion)}</p>` : ""}

        <div class="exercise-detail__info">
          <div class="exercise-detail__copy">
            ${
              exercise.musculosPrincipales.length || exercise.musculosSecundarios.length
                ? `<section class="exercise-detail__muscles">
                    ${
                      exercise.musculosPrincipales.length
                        ? `<div class="exercise-detail__muscle-group"><span>Músculos principales</span><ul class="exercise-detail__muscle-tags exercise-detail__muscle-tags--primary">${renderList(exercise.musculosPrincipales)}</ul></div>`
                        : ""
                    }
                    ${
                      exercise.musculosSecundarios.length
                        ? `<div class="exercise-detail__muscle-group"><span>Músculos secundarios</span><ul class="exercise-detail__muscle-tags exercise-detail__muscle-tags--secondary">${renderList(exercise.musculosSecundarios)}</ul></div>`
                        : ""
                    }
                  </section>`
                : ""
            }
          </div>
          ${
            anatomyImage
              ? `<figure class="exercise-detail__anatomy"><img src="${escapeHtml(anatomyImage)}" alt="" loading="lazy" decoding="async"></figure>`
              : ""
          }
        </div>

        ${renderMedia(exercise)}

        <div class="exercise-detail__guidance">
          ${
            exercise.instrucciones.length
              ? `<section class="exercise-detail__section"><h2>Instrucciones</h2><ol class="exercise-detail__steps">${renderSteps(exercise.instrucciones)}</ol></section>`
              : ""
          }
          ${
            exercise.consejos.length
              ? `<section class="exercise-detail__section"><h2>Consejos</h2><ul class="exercise-detail__tips">${renderList(exercise.consejos)}</ul></section>`
              : ""
          }
        </div>

        ${renderSimilar(exercise)}
      </article>
    `;
    picker.appendChild(preview);
    initLazyImages(preview);
    const closeButton = preview.querySelector(".exercise-detail__close[data-routine-picker-detail-close]");
    if (closeButton) {
      closeButton.focus({ preventScroll: true });
    }
  }

  function getFilteredList() {
    return exercises.filter(matchesFilters);
  }

  function fallbackCopy(text, onDone) {
    const textarea = document.createElement("textarea");
    textarea.value = text;
    textarea.style.position = "fixed";
    textarea.style.opacity = "0";
    document.body.appendChild(textarea);
    textarea.select();
    try {
      document.execCommand("copy");
      onDone();
    } catch (error) {
      /* portapapeles no disponible */
    }
    document.body.removeChild(textarea);
  }

  function copyTextToClipboard(text, onDone) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(onDone).catch(() => fallbackCopy(text, onDone));
    } else {
      fallbackCopy(text, onDone);
    }
  }

  function setRoutineAiStatus(message, type = "info") {
    if (!routineAiStatus) {
      return;
    }
    routineAiStatus.textContent = message;
    routineAiStatus.dataset.state = type;
    routineAiStatus.hidden = !message;
  }

  function openRoutineAiPanel() {
    if (!routineAiPanel) {
      return;
    }
    setRoutineAiStatus("");
    routineAiPanel.hidden = false;
    document.body.classList.add("has-routine-ai");
    window.setTimeout(() => {
      const target = routineAiBrief || routineAiChatgpt || routineAiPanel.querySelector("button");
      if (target) {
        target.focus({ preventScroll: true });
      }
    }, 40);
  }

  function closeRoutineAiPanel() {
    if (!routineAiPanel) {
      return;
    }
    routineAiPanel.hidden = true;
    document.body.classList.remove("has-routine-ai");
  }

  function routineAiCurrentDraftLines() {
    if (!routineCartItems.length) {
      return "No hay ejercicios añadidos todavía.";
    }
    return routineCartItems.map((item, index) => {
      const exercise = getExerciseById(item.id);
      return `${index + 1}. ${item.id} | ${exercise ? exercise.nombre : item.id} | día: ${routineDayMeta(item.day).label} | ${item.series} series | ${item.reps} reps | descanso ${item.rest} min`;
    }).join("\n");
  }

  function buildRoutineAiPrompt() {
    const selectedDays = routineCartDays.map((day) => routineDayMeta(day).id).join(", ");
    const userBrief = routineAiBrief && routineAiBrief.value.trim()
      ? routineAiBrief.value.trim()
      : "No se han indicado preferencias adicionales.";
    return [
      "Actúa como entrenador personal para El Tablero Sport Club.",
      "Necesito que crees una rutina y me devuelvas un enlace completo listo para abrir en el navegador.",
      "",
      "Web pública:",
      "https://eltablerosportclub.com/ejercicios/",
      "",
      "Archivos que debes inspeccionar para no inventar ejercicios:",
      "- Catálogo real: https://eltablerosportclub.com/ejercicios/exercises.js",
      "- Codificador de URL: https://eltablerosportclub.com/ejercicios/routines.js",
      "",
      "Cómo debes construir el enlace:",
      "- Usa la ruta base https://eltablerosportclub.com/ejercicios/",
      "- La rutina va en el hash compacto #r?... tal como define window.Routines.encode en routines.js.",
      "- Estructura lógica: { t, n, days, items }.",
      "- Cada item debe tener id, series, reps, rest y day.",
      "- El parámetro i contiene ejercicios como id:series:reps:rest:day.",
      "- series, reps y rest se codifican con base64url UTF-8 igual que compactValue en routines.js.",
      "- t y n también se codifican con base64url UTF-8.",
      "- days se codifica en w con días separados por coma.",
      "- Si no puedes inspeccionar esos archivos, dilo claramente y no inventes IDs.",
      "",
      "Reglas de entrenamiento:",
      "- Usa exclusivamente IDs reales existentes en exercises.js.",
      "- Puedes repetir un mismo ejercicio si tiene sentido.",
      "- Los días válidos son: lunes, martes, miercoles, jueves, viernes, sabado, domingo.",
      "- Series, repeticiones y descanso son obligatorios en cada ejercicio.",
      "- El descanso va en minutos, sin escribir la unidad dentro del valor.",
      "- Mantén una rutina realista, simple y segura para el nivel indicado.",
      "",
      "Formato de respuesta:",
      "1. Primera línea: solo el enlace completo de la rutina.",
      "2. Después: resumen breve por días.",
      "3. No incluyas JSON salvo que te lo pida expresamente.",
      "",
      `Días seleccionados actualmente en la web: ${selectedDays || "ninguno"}.`,
      "Borrador actual del asistente:",
      routineAiCurrentDraftLines(),
      "",
      "Indicaciones del usuario:",
      userBrief,
    ].join("\n");
  }

  function openRoutineAiInChatgpt() {
    const prompt = buildRoutineAiPrompt();
    const chatUrl = `${CHATGPT_ROUTINE_URL}${encodeURIComponent(prompt)}`;
    const opened = window.open(chatUrl, "_blank", "noopener");
    if (opened) {
      setRoutineAiStatus("ChatGPT se ha abierto con el encargo preparado. Cuando te devuelva el enlace, ábrelo para ver la rutina.", "success");
      return;
    }
    copyTextToClipboard(prompt, () => {
      setRoutineAiStatus("El navegador bloqueó la pestaña. He copiado el encargo para que lo pegues en ChatGPT.", "warning");
    });
  }

  function setCatalogToolsPlacement(target) {
    if (!exercisesSearchbar || !exercisesResultsBar) {
      return;
    }

    if (target === "catalog" && exercisesCatalogInner) {
      exercisesCatalogInner.insertBefore(exercisesResultsBar, exercisesCatalogInner.firstElementChild);
      if (filtersSummary) {
        exercisesCatalogInner.insertBefore(filtersSummary, exercisesResultsBar);
      }
      exercisesCatalogInner.insertBefore(exercisesSearchbar, filtersSummary || exercisesResultsBar);
      return;
    }

    if (exercisesIntroTools) {
      exercisesIntroTools.appendChild(exercisesSearchbar);
      if (filtersSummary) {
        exercisesIntroTools.appendChild(filtersSummary);
      }
      exercisesIntroTools.appendChild(exercisesResultsBar);
    }
  }

  function usesExerciseOverlay() {
    return window.matchMedia("(max-width: 56rem)").matches;
  }

  function setCatalogToolsReveal(isVisible) {
    if (!exercisesSearchbar) {
      return;
    }

    if (isVisible) {
      if (exercisesSearchbar.parentElement !== document.body) {
        document.body.appendChild(exercisesSearchbar);
      }
      document.body.classList.add("is-catalog-tools-revealed");
      return;
    }

    document.body.classList.remove("is-catalog-tools-revealed");
    if (!currentExercise && exercisesIntroTools && exercisesSearchbar.parentElement === document.body) {
      exercisesIntroTools.insertBefore(exercisesSearchbar, filtersSummary || exercisesResultsBar || null);
    }
  }

  function updateCatalogToolsReveal() {
    catalogToolsScrollTicking = false;
    const currentY = window.scrollY;
    const isScrollingUp = currentY < lastWindowScrollY;
    const isScrollingDown = currentY > lastWindowScrollY;
    const headerHeight = parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--exercises-header-h")) || 72;
    const catalogRect = exercisesCatalog ? exercisesCatalog.getBoundingClientRect() : null;
    const toolsArePastHeader = catalogRect ? catalogRect.top < headerHeight + 12 : currentY > headerHeight;
    const canReveal =
      !currentExercise &&
      (!routineView || routineView.hidden) &&
      exercisesIntro &&
      !exercisesIntro.hidden &&
      toolsArePastHeader &&
      currentY > headerHeight + 48;

    if (!canReveal || isScrollingDown) {
      setCatalogToolsReveal(false);
    } else if (isScrollingUp) {
      setCatalogToolsReveal(true);
    }

    lastWindowScrollY = currentY;
  }

  function onCatalogToolsScroll() {
    if (catalogToolsScrollTicking) {
      return;
    }
    catalogToolsScrollTicking = true;
    window.requestAnimationFrame(updateCatalogToolsReveal);
  }

  function alignExerciseLayout(exercise) {
    if (!exercisesMain) {
      return;
    }

    window.requestAnimationFrame(() => {
      const headerHeight = parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--exercises-header-h")) || 72;
      const top = exercisesMain.getBoundingClientRect().top + window.scrollY - headerHeight - 12;
      window.scrollTo({ top: Math.max(0, top), behavior: "auto" });

      if (window.matchMedia("(min-width: 56.01rem)").matches && exercisesCatalog) {
        const selectedCard = Array.from(grid.querySelectorAll("[data-exercise-id]"))
          .find((card) => card.dataset.exerciseId === exercise.id);
        if (selectedCard) {
          const catalogRect = exercisesCatalog.getBoundingClientRect();
          const cardRect = selectedCard.getBoundingClientRect();
          const targetScroll =
            exercisesCatalog.scrollTop +
            cardRect.top -
            catalogRect.top -
            (catalogRect.height - cardRect.height) / 2;
          exercisesCatalog.scrollTop = Math.max(0, targetScroll);
        }
      }
    });
  }

  function moveExercisePageToBody() {
    if (!exercisePage || exercisePage.parentElement === document.body) {
      return;
    }
    document.body.appendChild(exercisePage);
  }

  function restoreExercisePagePlacement() {
    if (!exercisePage || !exercisePageOriginalParent || exercisePage.parentElement === exercisePageOriginalParent) {
      return;
    }
    exercisePageOriginalParent.insertBefore(exercisePage, exercisePageOriginalNext);
  }

  function resetExercisePageScroll() {
    if (!exercisePage) {
      return;
    }
    exercisePage.scrollTop = 0;
    if (exercisePageContent) {
      exercisePageContent.scrollTop = 0;
    }
    window.requestAnimationFrame(() => {
      exercisePage.scrollTop = 0;
      if (exercisePageContent) {
        exercisePageContent.scrollTop = 0;
      }
    });
  }

  function showExercise(exercise, options = {}) {
    const useOverlay = usesExerciseOverlay();
    const fromRoutine = options.fromRoutine === true;
    endCatalogTour();
    endRoutineViewTour();
    setCatalogToolsReveal(false);
    currentExercise = exercise;
    exerciseReturnContext = fromRoutine ? "routine" : "catalog";
    if (fromRoutine) {
      moveExercisePageToBody();
    } else {
      restoreExercisePagePlacement();
    }
    renderExerciseDetail(exercise, { readOnlyRoutine: fromRoutine });
    syncCurrentCard();
    setCatalogToolsPlacement(!fromRoutine && useOverlay ? "intro" : "catalog");
    if (exercisePage) {
      exercisePage.hidden = false;
      resetExercisePageScroll();
    }
    if (exercisesMain) {
      exercisesMain.classList.toggle("is-exercise-open", !fromRoutine);
      exercisesMain.classList.toggle("is-routine-exercise-open", fromRoutine);
    }
    document.body.classList.toggle("has-exercise-overlay", !fromRoutine && useOverlay);
    document.body.classList.toggle("has-routine-exercise-overlay", fromRoutine);
    if (routineView) {
      routineView.hidden = fromRoutine ? false : true;
    }
    exercisesIntro.hidden = fromRoutine ? true : !useOverlay;
    exercisesCatalog.hidden = fromRoutine ? true : false;
    setRoutineFavoritesOpen(false);
    if (backToTopButton) {
      backToTopButton.classList.remove("is-visible");
    }
    if (!fromRoutine && !useOverlay) {
      alignExerciseLayout(exercise);
    }
  }

  function openExercise(exercise, updateHash) {
    showExercise(exercise);
    if (updateHash) {
      history.pushState({ exercise: exercise.id }, "", `#ejercicio/${exercise.id}`);
    }
  }

  function openExerciseFromRoutine(exercise) {
    showExercise(exercise, { fromRoutine: true });
  }

  function closeExercise(updateHash) {
    const shouldReturnToRoutine = exerciseReturnContext === "routine" && isRoutineHash(location.hash);
    currentExercise = null;
    exerciseReturnContext = "catalog";
    lastWindowScrollY = window.scrollY;
    if (exercisePage) {
      exercisePage.hidden = true;
    }
    if (exercisePageContent) {
      exercisePageContent.innerHTML = "";
    }
    if (exercisesMain) {
      exercisesMain.classList.remove("is-exercise-open");
      exercisesMain.classList.remove("is-routine-exercise-open");
    }
    document.body.classList.remove("has-exercise-overlay");
    document.body.classList.remove("has-routine-exercise-overlay");
    syncCurrentCard();
    restoreExercisePagePlacement();

    if (shouldReturnToRoutine) {
      checkRoutineView({ scrollToTop: false });
      return;
    }

    setCatalogToolsPlacement("intro");
    exercisesIntro.hidden = false;
    exercisesCatalog.hidden = false;
    renderRoutineFavorites();
    if (backToTopButton) {
      backToTopButton.classList.toggle("is-visible", window.scrollY > 640);
    }

    if (updateHash && location.hash.startsWith("#ejercicio/")) {
      history.pushState({}, "", location.pathname);
    }
  }

  function openFromHash() {
    const match = location.hash.match(/^#ejercicio\/(.+)$/);
    if (!match) {
      if (currentExercise) {
        closeExercise(false);
      } else {
        if (exercisePage) {
          exercisePage.hidden = true;
        }
        if (exercisesMain) {
          exercisesMain.classList.remove("is-exercise-open");
          exercisesMain.classList.remove("is-routine-exercise-open");
        }
        document.body.classList.remove("has-exercise-overlay");
        document.body.classList.remove("has-routine-exercise-overlay");
        restoreExercisePagePlacement();
        setCatalogToolsPlacement("intro");
        exercisesIntro.hidden = false;
        exercisesCatalog.hidden = false;
        renderRoutineFavorites();
      }
      return;
    }

    const exercise = exercises.find((item) => item.id === match[1]);
    if (exercise) {
      showExercise(exercise);
    }
  }

  function checkRoutineView(options = {}) {
    if (!routineView || !window.Routines) {
      return;
    }

    const routine = window.Routines.decode(location.hash);
    const validRoutineItems = routineEntriesFromRoutine(routine);
    routineViewItems = validRoutineItems;
    const filteredRoutineItems = validRoutineItems.filter(routineEntryMatches);
    const routineCards = filteredRoutineItems.map(renderRoutineCard).filter(Boolean);

    if (!routine || validRoutineItems.length === 0) {
      endCatalogTour();
      endRoutineViewTour();
      routineView.hidden = true;
      routineViewItems = [];
      if (routineGrid) {
        routineGrid.classList.remove("routine-view__grid--weekly");
      }
      if (routineDayFilters) {
        routineDayFilters.hidden = true;
        routineDayFilters.innerHTML = "";
      }
      routineViewDayFilter = "";
      updateRoutineFiltersButton();
      renderRoutineFiltersSummary();
      if (exercisesMain) {
        exercisesMain.classList.remove("is-routine-exercise-open");
      }
      if (!location.hash.startsWith("#ejercicio/") && !currentExercise) {
        setCatalogToolsPlacement("intro");
        exercisesIntro.hidden = false;
        exercisesCatalog.hidden = false;
        renderRoutineFavorites();
      }
      return;
    }

    currentExercise = null;
    endCatalogTour();
    setCatalogToolsPlacement("intro");
    if (exercisePage) {
      exercisePage.hidden = true;
    }
    if (exercisePageContent) {
      exercisePageContent.innerHTML = "";
    }
    if (exercisesMain) {
      exercisesMain.classList.remove("is-exercise-open");
      exercisesMain.classList.remove("is-routine-exercise-open");
    }
    document.body.classList.remove("has-exercise-overlay");
    document.body.classList.remove("has-routine-exercise-overlay");
    restoreExercisePagePlacement();
    exercisesIntro.hidden = true;
    exercisesCatalog.hidden = true;
    setRoutineFavoritesOpen(false);
    routineView.hidden = false;

    routineTitle.textContent = routine.t || "Rutina compartida";
    updateRoutineSaveButton(routine);

    if (routine.n) {
      routineNote.textContent = routine.n;
      routineNote.hidden = false;
    } else {
      routineNote.hidden = true;
    }
    if (routineSearchInput && routineSearchInput.value !== routineFilterState.q) {
      routineSearchInput.value = routineFilterState.q;
    }

    routineGrid.innerHTML = "";
    if (routineEmpty) {
      routineEmpty.hidden = true;
    }
    const routineDays = routineDaysForEntries(validRoutineItems, routine.days || []);
    const hasAssignedDays = validRoutineItems.some((item) => item.day);
    const useWeeklyLayout = routineDays.length > 1 || hasAssignedDays;
    renderRoutineDayFilters(routineDays);
    routineGrid.classList.toggle("routine-view__grid--weekly", useWeeklyLayout);
    if (useWeeklyLayout) {
      groupRoutineEntries(filteredRoutineItems, routineDays)
        .filter((group) => !routineViewDayFilter || group.day === routineViewDayFilter)
        .forEach((group) => {
        const section = document.createElement("section");
        section.className = "routine-view__day";
        const muscles = routineMusclesForEntries(group.entries);
        section.innerHTML = `
          <div class="routine-view__day-head">
            <h2>${escapeHtml(routineDayMeta(group.day).label)}</h2>
            ${muscles ? `<p>${escapeHtml(muscles)}</p>` : ""}
          </div>
          <div class="exercises-grid routine-view__day-grid"></div>
        `;
        const dayGrid = section.querySelector(".routine-view__day-grid");
        group.entries.map(renderRoutineCard).filter(Boolean).forEach((card) => dayGrid.appendChild(card));
        if (dayGrid.children.length) {
          routineGrid.appendChild(section);
        }
      });
    } else {
      const fragment = document.createDocumentFragment();
      routineCards.forEach((card) => fragment.appendChild(card));
      routineGrid.appendChild(fragment);
    }
    initLazyImages(routineGrid);
    updateRoutineFiltersButton();
    renderRoutineFiltersSummary();
    if (routineEmpty) {
      routineEmpty.hidden = routineGrid.children.length > 0;
    }

    window.setTimeout(maybeAutoStartRoutineViewTour, 260);

    if (options.scrollToTop !== false) {
      window.scrollTo(0, 0);
    }
  }

  function isRoutineHash(hash) {
    return hash.startsWith("#rutina?") || hash.startsWith("#r?");
  }

  function syncRoute() {
    if (isRoutineHash(location.hash)) {
      checkRoutineView();
      return;
    }

    endRoutineViewTour();
    if (!currentExercise) {
      endCatalogTour();
    }
    routineView.hidden = true;
    openFromHash();
  }

  function dismissRoutineView() {
    endRoutineViewTour();
    if (isRoutineHash(location.hash)) {
      history.pushState({}, "", location.pathname);
    }
    checkRoutineView();
  }

  function buildSavedRoutine(routine) {
    if (!routine || !window.Routines) {
      return null;
    }
    const items = routineEntriesFromRoutine(routine);
    if (items.length === 0) {
      return null;
    }
    const days = routineDaysForEntries(items, routine.days || []);
    return {
      id: window.Routines.encode({ t: routine.t, n: routine.n, days, items }),
      title: routine.t || "Rutina compartida",
      note: routine.n || "",
      days,
      items,
      savedAt: new Date().toISOString(),
      version: 1,
    };
  }

  function routineFavoriteIndex(routine) {
    const savedRoutine = buildSavedRoutine(routine);
    if (!savedRoutine) {
      return -1;
    }
    return loadRoutineFavorites().findIndex((item) => item.id === savedRoutine.id);
  }

  function updateRoutineSaveButton(routine) {
    if (!routineSaveButton) {
      return;
    }
    const savedRoutine = buildSavedRoutine(routine);
    const isSaved = savedRoutine ? loadRoutineFavorites().some((item) => item.id === savedRoutine.id) : false;
    const isConfirming = Boolean(isSaved && savedRoutine && pendingRoutineSaveRemoveId === savedRoutine.id);
    routineSaveButton.textContent = isConfirming
      ? "Confirmar quitar"
      : isSaved
        ? "Quitar rutina de Favoritos"
        : "Guardar rutina en Favoritos";
    routineSaveButton.setAttribute("aria-pressed", String(isSaved));
    routineSaveButton.classList.toggle("is-confirming", isConfirming);
    routineSaveButton.disabled = false;
  }

  function toggleRoutineFavorite() {
    const routine = window.Routines.decode(location.hash);
    const savedRoutine = buildSavedRoutine(routine);
    if (!savedRoutine) {
      return;
    }

    const routines = loadRoutineFavorites();
    const existingIndex = routines.findIndex((item) => item.id === savedRoutine.id);
    if (existingIndex >= 0) {
      if (pendingRoutineSaveRemoveId !== savedRoutine.id) {
        pendingRoutineSaveRemoveId = savedRoutine.id;
        if (pendingRoutineSaveRemoveTimer) {
          window.clearTimeout(pendingRoutineSaveRemoveTimer);
        }
        pendingRoutineSaveRemoveTimer = window.setTimeout(() => {
          clearRoutineSaveRemoveConfirmation();
        }, ROUTINE_REMOVE_CONFIRM_DELAY);
        updateRoutineSaveButton(routine);
        return;
      }
      clearRoutineSaveRemoveConfirmation(false);
      routines.splice(existingIndex, 1);
    } else {
      clearRoutineSaveRemoveConfirmation(false);
      routines.unshift(savedRoutine);
    }
    saveRoutineFavorites(routines);
    renderRoutineFavorites();
    updateRoutineSaveButton(routine);
  }

  function loadRoutineIntoBuilder(routine) {
    if (!routine || !routineCart || !routineCartPanel || !routineCartBuilder) {
      return;
    }
    const items = routineEntriesFromRoutine(routine);
    if (items.length === 0) {
      return;
    }
    const days = routineDaysForEntries(items, routine.days || []);
    routineCartDays = normalizeRoutineCartDays(days);
    routineCartItems = withRoutineCartItemKeys(items.map((item) => ({
      ...item,
      day: routineCartDays.includes(item.day) ? item.day : ROUTINE_UNASSIGNED_DAY,
    })));
    routineCartSelectedIds.clear();
    clearRoutineCartValidation();
    saveRoutineCartDays();
    if (routineCartTitleInput) {
      routineCartTitleInput.value = routine.t || routineCartDefaultTitle;
    }
    if (routineCartNoteInput) {
      routineCartNoteInput.value = routine.n || "";
      resizeRoutineCartNote();
    }
    if (routineCartLink) {
      routineCartLink.value = "";
    }
    if (routineCartQr) {
      routineCartQr.innerHTML = "";
    }
    if (routineCartResult) {
      routineCartResult.hidden = true;
    }
    setRoutineFavoritesOpen(false);
    renderRoutineCart();
    setRoutineCartOpen(true);
    setRoutineCartBuilderOpen(true);
    if (routineCartPanel) {
      routineCartPanel.scrollTo({ top: 0, behavior: "auto" });
    }
  }

  function editCurrentRoutine() {
    if (!window.Routines || !isRoutineHash(location.hash)) {
      return;
    }
    loadRoutineIntoBuilder(window.Routines.decode(location.hash));
  }

  function bindBackToTop() {
    if (!backToTopButton) {
      return;
    }

    if (routineCart) {
      backToTopButton.classList.add("is-lifted");
    }

    let ticking = false;
    const threshold = 640;

    const update = () => {
      ticking = false;
      backToTopButton.classList.toggle("is-visible", window.scrollY > threshold);
    };

    window.addEventListener("scroll", () => {
      if (!ticking) {
        window.requestAnimationFrame(update);
        ticking = true;
      }
    });

    backToTopButton.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: prefersReducedMotion ? "auto" : "smooth" });
    });
  }

  function updateApplyButtonLabel() {
    if (!filterPanelApply) {
      return;
    }
    const count = countMatchesForDraft();
    filterPanelApply.textContent = `Ver ${count} ejercicio${count === 1 ? "" : "s"}`;
  }

  function updateFilterPanelClearVisibility() {
    if (!filterPanelClear) {
      return;
    }
    const hasDraftFilters = filterValues(draftState.grupo).length > 0 || filterValues(draftState.equipamiento).length > 0 || draftState.favoritos;
    filterPanelClear.classList.toggle("is-visible", hasDraftFilters);
  }

  function refreshFilterPanelLists() {
    buildGroupList();
    buildEquipmentList();
    if (filterEquipmentSearch) {
      filterEquipmentSearch.value = "";
    }
  }

  function mountFilterPanelToBody() {
    if (filterPanel && filterPanel.parentElement !== document.body) {
      document.body.appendChild(filterPanel);
    }
  }

  function restoreFilterPanelMount() {
    if (!filterPanel || !filterPanelOriginalParent || filterPanel.parentElement !== document.body) {
      return;
    }
    if (filterPanelOriginalNext && filterPanelOriginalNext.parentElement === filterPanelOriginalParent) {
      filterPanelOriginalParent.insertBefore(filterPanel, filterPanelOriginalNext);
    } else {
      filterPanelOriginalParent.appendChild(filterPanel);
    }
  }

  function openFilterPanel(mode = "catalog") {
    if (!filterPanel) {
      return;
    }
    mountFilterPanelToBody();
    filterPanelMode = mode === "routine" || mode === "picker" ? mode : "catalog";
    const sourceState = filterPanelMode === "routine"
      ? routineFilterState
      : filterPanelMode === "picker"
        ? routineExercisePickerState
        : state;
    draftState.grupo = filterValues(sourceState.grupo);
    draftState.equipamiento = filterValues(sourceState.equipamiento);
    draftState.favoritos = sourceState.favoritos;
    if (filterFavoritesSwitch) {
      filterFavoritesSwitch.checked = draftState.favoritos;
    }
    refreshFilterPanelLists();
    updateApplyButtonLabel();
    updateFilterPanelClearVisibility();

    previousFocusedElement = document.activeElement;
    filterPanel.hidden = false;
    document.body.classList.add("has-filter-panel-open");
    window.requestAnimationFrame(() => {
      filterPanel.classList.add("is-open");
    });
    filterPanelSheet.focus();
    document.addEventListener("keydown", onFilterPanelKeydown);
  }

  function closeFilterPanel() {
    if (!filterPanel || filterPanel.hidden) {
      return;
    }
    filterPanel.classList.remove("is-open");
    document.body.classList.remove("has-filter-panel-open");
    document.removeEventListener("keydown", onFilterPanelKeydown);

    const finish = () => {
      filterPanel.hidden = true;
      restoreFilterPanelMount();
    };
    if (prefersReducedMotion) {
      finish();
    } else {
      window.setTimeout(finish, 260);
    }

    if (previousFocusedElement) {
      previousFocusedElement.focus();
    } else if (filtersOpenButton) {
      filtersOpenButton.focus();
    }
  }

  function applyFilterPanel() {
    if (filterPanelMode === "routine") {
      routineFilterState.grupo = uniqueFilterValues(draftState.grupo);
      routineFilterState.equipamiento = uniqueFilterValues(draftState.equipamiento);
      routineFilterState.favoritos = draftState.favoritos;
      checkRoutineView({ scrollToTop: false });
    } else if (filterPanelMode === "picker") {
      routineExercisePickerState.grupo = uniqueFilterValues(draftState.grupo);
      routineExercisePickerState.equipamiento = uniqueFilterValues(draftState.equipamiento);
      routineExercisePickerState.favoritos = draftState.favoritos;
      const picker = document.querySelector("[data-routine-exercise-picker]");
      if (picker) {
        renderRoutineExercisePickerList(picker);
      }
    } else {
      state.grupo = uniqueFilterValues(draftState.grupo);
      state.equipamiento = uniqueFilterValues(draftState.equipamiento);
      state.favoritos = draftState.favoritos;
      renderGrid();
    }
    closeFilterPanel();
  }

  function clearFilterPanel() {
    draftState.grupo = [];
    draftState.equipamiento = [];
    draftState.favoritos = false;
    if (filterFavoritesSwitch) {
      filterFavoritesSwitch.checked = false;
    }
    expandedAggregateGroups.clear();
    refreshFilterPanelLists();
    updateApplyButtonLabel();
    if (filterPanelClear) {
      filterPanelClear.classList.remove("is-visible");
    }
    applyFilterPanel();
  }

  function onFilterPanelKeydown(event) {
    if (event.key === "Escape") {
      event.preventDefault();
      closeFilterPanel();
      return;
    }
    if (event.key !== "Tab") {
      return;
    }
    const focusable = filterPanelSheet.querySelectorAll(
      'a[href], button:not([disabled]), input:not([disabled]), [tabindex]:not([tabindex="-1"])'
    );
    if (focusable.length === 0) {
      return;
    }
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  }

  function bindEvents() {
    document.addEventListener(
      "pointerdown",
      (event) => {
        if (exerciseReturnContext !== "routine" || !currentExercise || !exercisePage || exercisePage.hidden) {
          return;
        }
        if (exercisePage.contains(event.target)) {
          return;
        }
        if (event.target.closest(".site-header, .mobile-menu, [data-menu-toggle], [data-mobile-menu]")) {
          return;
        }
        event.preventDefault();
        event.stopPropagation();
        closeExercise(false);
      },
      true
    );

    if (exercisePageContent) {
      exercisePageContent.addEventListener("click", (event) => {
        const backButton = event.target.closest("[data-exercise-back]");
        if (backButton) {
          closeExercise(true);
          return;
        }

        const routineButton = event.target.closest("[data-routine-toggle]");
        if (routineButton) {
          toggleRoutineCartItem(routineButton.dataset.routineToggle);
          return;
        }

        const favoriteButton = event.target.closest("[data-favorite-toggle]");
        if (favoriteButton) {
          toggleFavorite(favoriteButton.dataset.favoriteToggle);
          return;
        }

        const similarCard = event.target.closest("[data-similar-id]");
        if (similarCard) {
          const exercise = exercises.find((item) => item.id === similarCard.dataset.similarId);
          if (exercise) {
            if (exerciseReturnContext === "routine") {
              openExerciseFromRoutine(exercise);
            } else {
              openExercise(exercise, true);
            }
          }
          return;
        }
      });
    }

    if (routineCartToggle) {
      routineCartToggle.addEventListener("click", () => {
        setRoutineCartOpen(routineCartPanel ? routineCartPanel.hidden : true);
      });
    }

    if (routineFavoritesToggle) {
      routineFavoritesToggle.addEventListener("click", () => {
        renderRoutineFavorites();
        setRoutineFavoritesOpen(!routineFavoritesOpen);
      });
    }

    if (routineFavoritesClose) {
      routineFavoritesClose.addEventListener("click", () => {
        setRoutineFavoritesOpen(false);
      });
    }

    if (routineCart) {
      routineCart.addEventListener("click", (event) => {
        if (event.target.closest("[data-routine-info-close]")) {
          closeRoutineExercisePreview();
          return;
        }
        const previewAddButton = event.target.closest("[data-routine-info-add]");
        if (previewAddButton) {
          addRoutineCartItem(previewAddButton.dataset.routineInfoAdd);
          previewAddButton.classList.add("is-added");
          previewAddButton.querySelector("span").textContent = "Añadido";
          window.setTimeout(() => {
            if (document.body.contains(previewAddButton)) {
              previewAddButton.classList.remove("is-added");
              previewAddButton.querySelector("span").textContent = "Añadir otra vez";
            }
          }, 900);
          return;
        }
        const similarCard = event.target.closest(".routine-cart__exercise-preview [data-similar-id]");
        if (similarCard) {
          openRoutineExercisePreview(similarCard.dataset.similarId);
          return;
        }
        if (routineCart.dataset.mode !== "builder" || event.target !== routineCart) {
          return;
        }
        setRoutineCartBuilderOpen(false);
      });
    }

    if (routineCartClose) {
      routineCartClose.addEventListener("click", () => setRoutineCartOpen(false));
    }

    if (routineCartClear) {
      routineCartClear.addEventListener("click", clearRoutineCart);
    }

    if (routineCartView) {
      routineCartView.addEventListener("click", viewRoutineCart);
    }

    routineAiOpenButtons.forEach((button) => {
      button.addEventListener("click", openRoutineAiPanel);
    });

    if (routineAiPanel) {
      routineAiPanel.addEventListener("click", (event) => {
        if (event.target.closest("[data-routine-ai-close]")) {
          closeRoutineAiPanel();
        }
      });
    }

    if (routineAiChatgpt) {
      routineAiChatgpt.addEventListener("click", openRoutineAiInChatgpt);
    }

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && routineAiPanel && !routineAiPanel.hidden) {
        closeRoutineAiPanel();
      }
    });

    document.addEventListener("click", (event) => {
      if (event.target.closest("[data-routine-cart-tour]")) {
        resetAndStartRoutineCartTour();
      }
    });

    if (routineCartTitleInput) {
      routineCartTitleInput.addEventListener("input", () => {
        if (routineCartResult) {
          routineCartResult.hidden = true;
        }
      });
    }

    if (routineCartNoteInput) {
      routineCartNoteInput.addEventListener("input", () => {
        resizeRoutineCartNote();
        updateRoutineCartBuilderSummary();
        if (routineCartResult) {
          routineCartResult.hidden = true;
        }
      });
      resizeRoutineCartNote();
    }

    if (routineWeekDaysWrap) {
      routineWeekDaysWrap.addEventListener("click", (event) => {
        const button = event.target.closest("[data-routine-week-day]");
        if (!button) {
          return;
        }
        setRoutineWeekDay(button.dataset.routineWeekDay, button.getAttribute("aria-pressed") !== "true");
      });
    }

    if (routineQuickApply) {
      routineQuickApply.addEventListener("click", applyRoutineQuickValues);
    }

    if (routineCartAddMore) {
      routineCartAddMore.addEventListener("click", openRoutineExercisePicker);
    }

    if (routineCartGenerate) {
      routineCartGenerate.addEventListener("click", generateRoutineCart);
    }

    if (routineCartCopy) {
      routineCartCopy.addEventListener("click", copyRoutineCartLink);
    }

    if (routineCartOpen) {
      routineCartOpen.addEventListener("click", openRoutineCartLink);
    }

    if (routineCartDownloadQr) {
      routineCartDownloadQr.addEventListener("click", downloadRoutineCartQr);
    }

    if (routineCartPrint) {
      routineCartPrint.addEventListener("click", printRoutineCart);
    }

    if (routineCartList) {
      routineCartList.addEventListener("click", (event) => {
        const removeButton = event.target.closest("[data-routine-remove]");
        if (!removeButton) {
          return;
        }
        removeRoutineCartItem(removeButton.dataset.routineRemove);
      });
    }

    if (routineCartBuilderList) {
      routineCartBuilderList.addEventListener("input", (event) => {
        const input = event.target.closest("[data-routine-setting]");
        const row = event.target.closest("[data-routine-prescription]");
        if (!input || !row) {
          return;
        }
        updateRoutineCartSetting(row.dataset.routinePrescription, input.dataset.routineSetting, input.value);
      });

      routineCartBuilderList.addEventListener("change", (event) => {
        const checkbox = event.target.closest("[data-routine-select]");
        if (checkbox) {
          if (checkbox.checked) {
            routineCartSelectedIds.add(checkbox.dataset.routineSelect);
          } else {
            routineCartSelectedIds.delete(checkbox.dataset.routineSelect);
          }
          renderRoutineCartBuilder();
          return;
        }
      });

      routineCartBuilderList.addEventListener("click", (event) => {
        const moveSelectedButton = event.target.closest("[data-routine-move-selected-day]");
        if (moveSelectedButton) {
          moveRoutineCartItemsToDay(Array.from(routineCartSelectedIds), moveSelectedButton.dataset.routineMoveSelectedDay, "");
          return;
        }

        const infoButton = event.target.closest("[data-routine-info]");
        if (infoButton) {
          openRoutineExercisePreview(infoButton.dataset.routineInfo);
          return;
        }

        const moveButton = event.target.closest("[data-routine-move]");
        if (moveButton) {
          moveRoutineCartItem(moveButton.dataset.routineMoveId, Number(moveButton.dataset.routineMove));
          return;
        }

        const removeButton = event.target.closest("[data-routine-remove]");
        if (removeButton) {
          removeRoutineCartItem(removeButton.dataset.routineRemove);
        }
      });

      if (window.PointerEvent) {
        routineCartBuilderList.addEventListener("pointerdown", (event) => {
          const handle = event.target.closest("[data-routine-drag-id]");
          if (!handle || event.button > 0) {
            return;
          }
          event.preventDefault();
          const point = routinePointerPoint(event);
          cleanupRoutineTouchDrag();
          try {
            handle.setPointerCapture(event.pointerId);
          } catch (error) {
            /* Algunos navegadores liberan la captura si el nodo cambia durante el gesto. */
          }
          routineTouchDrag = {
            active: false,
            handle,
            pointerId: event.pointerId,
            pointerType: event.pointerType,
            ids: [],
            startX: point.x,
            startY: point.y,
            ghost: null,
            scrollFrame: 0,
            scrollSpeed: 0,
            lastPoint: point,
            timer: 0,
          };
          startRoutineTouchDrag(handle, point);
          document.addEventListener("pointermove", handleRoutinePointerMove, { passive: false });
          document.addEventListener("pointerup", finishPointerRoutineTouchDrag);
          document.addEventListener("pointercancel", cancelPointerRoutineTouchDrag);
        });
      } else {
        routineCartBuilderList.addEventListener("touchstart", (event) => {
          const handle = event.target.closest("[data-routine-drag-id]");
          if (!handle || event.touches.length !== 1) {
            return;
          }
          const point = routineTouchPoint(event);
          if (!point) {
            return;
          }
          cleanupRoutineTouchDrag();
          routineTouchDrag = {
            active: false,
            handle,
            ids: [],
            startX: point.x,
            startY: point.y,
            ghost: null,
            scrollFrame: 0,
            scrollSpeed: 0,
            lastPoint: point,
            timer: 0,
          };
          startRoutineTouchDrag(handle, point);
        }, { passive: true });

        routineCartBuilderList.addEventListener("touchmove", (event) => {
          if (!routineTouchDrag) {
            return;
          }
          const point = routineTouchPoint(event);
          if (!point) {
            return;
          }
          const distance = Math.hypot(point.x - routineTouchDrag.startX, point.y - routineTouchDrag.startY);
          if (!routineTouchDrag.active && distance > 10) {
            cleanupRoutineTouchDrag();
            return;
          }
          if (!routineTouchDrag.active) {
            return;
          }
          event.preventDefault();
          positionRoutineTouchGhost(routineTouchDrag.ghost, point);
          markRoutineTouchDropTarget(point);
          updateRoutineTouchAutoScroll(point);
        }, { passive: false });

        routineCartBuilderList.addEventListener("touchend", (event) => {
          finishRoutineTouchDrag(routineTouchPoint(event));
        });

        routineCartBuilderList.addEventListener("touchcancel", cleanupRoutineTouchDrag);
      }
    }

    document.addEventListener("dragend", clearRoutineHtmlDragState);
    document.addEventListener("drop", clearRoutineHtmlDragState);
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        clearRoutineHtmlDragState();
        cleanupRoutineTouchDrag();
      }
    });

    if (printFavoritesButton) {
      printFavoritesButton.addEventListener("click", () => {
        window.print();
      });
    }

    if (catalogTourButton) {
      catalogTourButton.addEventListener("click", resetAndStartCatalogTour);
    }

    searchInput.addEventListener("input", () => {
      window.clearTimeout(searchDebounce);
      searchDebounce = window.setTimeout(() => {
        state.q = searchInput.value.trim();
        renderGrid();
      }, 130);
    });

    if (routineSearchInput) {
      routineSearchInput.addEventListener("input", () => {
        window.clearTimeout(searchDebounce);
        searchDebounce = window.setTimeout(() => {
          routineFilterState.q = routineSearchInput.value.trim();
          checkRoutineView({ scrollToTop: false });
        }, 130);
      });
    }

    if (filtersOpenButton) {
      filtersOpenButton.addEventListener("click", () => openFilterPanel("catalog"));
    }

    if (routineFiltersOpenButton) {
      routineFiltersOpenButton.addEventListener("click", () => openFilterPanel("routine"));
    }

    if (filtersClearInline) {
      filtersClearInline.addEventListener("click", resetFilters);
    }

    if (routineFiltersClearInline) {
      routineFiltersClearInline.addEventListener("click", resetRoutineFilters);
    }

    if (filterPanel) {
      document.querySelectorAll("[data-filter-panel-close]").forEach((element) => {
        element.addEventListener("click", closeFilterPanel);
      });

      if (filterPanelApply) {
        filterPanelApply.addEventListener("click", applyFilterPanel);
      }

      if (filterPanelClear) {
        filterPanelClear.addEventListener("click", clearFilterPanel);
      }

      if (filterFavoritesSwitch) {
        filterFavoritesSwitch.addEventListener("change", () => {
          draftState.favoritos = filterFavoritesSwitch.checked;
          buildEquipmentList();
          if (filterEquipmentSearch) {
            filterEquipmentSearch.value = "";
          }
          updateApplyButtonLabel();
          updateFilterPanelClearVisibility();
        });
      }

      if (filterEquipmentSearch) {
        filterEquipmentSearch.addEventListener("input", () => {
          filterEquipmentRows(filterEquipmentSearch.value);
        });
      }

      filterPanel.addEventListener("change", (event) => {
        const target = event.target;
        if (target.name === "filter-grupo") {
          if (target.value === "") {
            draftState.grupo = [];
          } else {
            const values = new Set(filterValues(draftState.grupo));
            if (target.checked) {
              values.add(target.value);
            } else {
              values.delete(target.value);
            }
            draftState.grupo = Array.from(values);
          }
          buildGroupList();
          buildEquipmentList();
          if (filterEquipmentSearch) {
            filterEquipmentSearch.value = "";
          }
          updateApplyButtonLabel();
          updateFilterPanelClearVisibility();
        } else if (target.name === "filter-equipamiento") {
          if (target.value === "") {
            draftState.equipamiento = [];
          } else {
            const values = new Set(filterValues(draftState.equipamiento));
            if (target.checked) {
              values.add(target.value);
            } else {
              values.delete(target.value);
            }
            draftState.equipamiento = Array.from(values);
          }
          buildEquipmentList();
          if (filterEquipmentSearch) {
            filterEquipmentSearch.value = "";
          }
          updateApplyButtonLabel();
          updateFilterPanelClearVisibility();
        }
      });
    }

    window.addEventListener("hashchange", () => {
      syncRoute();
    });
    window.addEventListener("popstate", () => {
      syncRoute();
    });
    window.addEventListener("resize", updateHeaderHeightVar);
    window.addEventListener("scroll", onCatalogToolsScroll, { passive: true });

    if (routineEditButton) {
      routineEditButton.addEventListener("click", editCurrentRoutine);
    }

    if (routineSaveButton) {
      routineSaveButton.addEventListener("click", toggleRoutineFavorite);
    }

    if (routineViewTourButton) {
      routineViewTourButton.addEventListener("click", resetAndStartRoutineViewTour);
    }

    if (routineDismissButton) {
      routineDismissButton.addEventListener("click", dismissRoutineView);
    }

    if (routineDayFilters) {
      routineDayFilters.addEventListener("click", (event) => {
        const button = event.target.closest("[data-routine-day-filter]");
        if (!button) {
          return;
        }
        routineViewDayFilter = button.dataset.routineDayFilter || "";
        checkRoutineView({ scrollToTop: false });
      });
    }

    if (routineFavoritesList) {
      routineFavoritesList.addEventListener("click", (event) => {
        const openButton = event.target.closest("[data-routine-favorite-open]");
        if (openButton) {
          openRoutineFavorite(Number(openButton.dataset.routineFavoriteOpen));
          return;
        }

        const editButton = event.target.closest("[data-routine-favorite-edit]");
        if (editButton) {
          editRoutineFavorite(Number(editButton.dataset.routineFavoriteEdit));
          return;
        }

        const removeButton = event.target.closest("[data-routine-favorite-remove]");
        if (removeButton) {
          requestRoutineFavoriteRemoval(Number(removeButton.dataset.routineFavoriteRemove));
        }
      });
    }

    bindBackToTop();
  }

  updateHeaderHeightVar();
  renderSkeleton(10);

  fetch("./data/exercises.json")
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }
      return response.json();
    })
    .then((payload) => {
      exercises = payload.exercises;
      populateFilters(payload);
      bindEvents();
      renderGrid();
      seedDefaultRoutineFavorites();
      renderRoutineFavorites();
      renderRoutineCart();
      syncRoute();
      window.setTimeout(maybeAutoStartCatalogTour, 320);
      updateHeaderHeightVar();
    })
    .catch((error) => {
      grid.innerHTML = `<p class="exercises-empty">No se ha podido cargar el catálogo de ejercicios. Inténtalo de nuevo más tarde.</p>`;
      console.error("[ejercicios] Error cargando data/exercises.json", error);
    });
})();
