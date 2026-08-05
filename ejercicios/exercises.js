(() => {
  "use strict";

  const grid = document.querySelector("[data-exercises-grid]");
  const countLabel = document.querySelector("[data-exercises-count]");
  const emptyState = document.querySelector("[data-exercises-empty]");
  const searchInput = document.querySelector("[data-exercises-search]");
  const backToTopButton = document.querySelector("[data-back-to-top]");
  const printFavoritesButton = document.querySelector("[data-print-favorites]");

  const filtersOpenButton = document.querySelector("[data-filters-open]");
  const filtersBadge = document.querySelector("[data-filters-badge]");
  const filtersSummary = document.querySelector("[data-filters-summary]");
  const filtersSummaryText = document.querySelector("[data-filters-summary-text]");
  const filtersClearInline = document.querySelector("[data-filters-clear]");
  const filterPanel = document.querySelector("[data-filter-panel]");
  const filterPanelSheet = document.querySelector("[data-filter-panel-sheet]");
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
  const routineSaveButton = document.querySelector("[data-routine-save-favorites]");
  const routineDismissButton = document.querySelector("[data-routine-dismiss]");
  const exercisePage = document.querySelector("[data-exercise-page]");
  const exercisePageContent = document.querySelector("[data-exercise-page-content]");
  const exercisesMain = document.querySelector(".exercises-main");
  const exercisesIntro = document.querySelector(".exercises-intro");
  const exercisesCatalog = document.querySelector(".exercises-catalog");
  const exercisesIntroTools = document.querySelector("[data-exercises-intro-tools]");
  const exercisesCatalogInner = document.querySelector(".exercises-catalog__inner");
  const exercisesSearchbar = document.querySelector(".exercises-searchbar");
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
  const routineCartQr = document.querySelector("[data-routine-cart-qr]");
  const routineCartDownloadQr = document.querySelector("[data-routine-cart-download-qr]");
  const routineCartPrint = document.querySelector("[data-routine-cart-print]");
  const routineCartNoteCount = document.querySelector("[data-routine-cart-note-count]");
  const routineQuickApply = document.querySelector("[data-routine-quick-apply]");
  const routineCartAddMore = document.querySelector("[data-routine-cart-add-more]");
  const routineSummaryExercises = document.querySelector("[data-routine-summary-exercises]");
  const routineSummarySeries = document.querySelector("[data-routine-summary-series]");
  const routineSummaryDuration = document.querySelector("[data-routine-summary-duration]");
  const routineCartPoster = document.querySelector("[data-routine-cart-poster]");
  const routineCartPosterCount = document.querySelector("[data-routine-cart-poster-count]");
  const routineCartPosterDate = document.querySelector("[data-routine-cart-poster-date]");
  const routineCartPosterTitle = document.querySelector("[data-routine-cart-poster-title]");
  const routineCartPosterNote = document.querySelector("[data-routine-cart-poster-note]");
  const routineCartPosterQr = document.querySelector("[data-routine-cart-poster-qr]");
  const routineCartPosterList = document.querySelector("[data-routine-cart-poster-list]");

  if (!grid) {
    return;
  }

  let exercises = [];
  let searchDebounce = null;
  let lastWindowScrollY = window.scrollY;
  let catalogToolsScrollTicking = false;
  let currentExercise = null;
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

  const state = {
    q: "",
    grupo: "",
    equipamiento: "",
    favoritos: false,
  };

  const FAVORITES_KEY = "eltablero:ejercicios:favoritos";
  const ROUTINE_CART_KEY = "eltablero:ejercicios:rutina-carrito";
  const ROUTINE_CART_TOUR_KEY = "eltablero:ejercicios:rutina-carrito-tour-dismissed";

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
  let routineCartItems = loadRoutineCart();

  function saveFavorites() {
    try {
      window.localStorage.setItem(FAVORITES_KEY, JSON.stringify(Array.from(favorites)));
    } catch (error) {
      /* almacenamiento no disponible (navegación privada, cuota, etc.) */
    }
  }

  function normalizeRoutineCartItem(item) {
    if (typeof item === "string") {
      return { id: item, series: "", reps: "", rest: "" };
    }

    return {
      id: item && (item.id || item.i) ? item.id || item.i : "",
      series: item && (item.series || item.s) ? item.series || item.s : "",
      reps: item && (item.reps || item.r) ? item.reps || item.r : "",
      rest: item && (item.rest || item.d) ? item.rest || item.d : "",
    };
  }

  function loadRoutineCart() {
    try {
      const raw = window.localStorage.getItem(ROUTINE_CART_KEY);
      const items = raw ? JSON.parse(raw) : [];
      if (!Array.isArray(items)) {
        return [];
      }
      const seen = new Set();
      return items
        .map(normalizeRoutineCartItem)
        .filter((item) => {
          if (!item.id || seen.has(item.id)) {
            return false;
          }
          seen.add(item.id);
          return true;
        });
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

  function getRoutineCartItem(id) {
    return routineCartItems.find((item) => item.id === id);
  }

  function updateRoutineCartSetting(id, key, value) {
    const item = getRoutineCartItem(id);
    if (!item) {
      return;
    }
    item[key] = sanitizeRoutineValue(value);
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

  function updateRoutineCartBuilderSummary() {
    const exerciseCount = routineCartItems.length;
    const seriesTotal = routineCartItems.reduce((total, item) => total + parseRoutineNumber(item.series), 0);
    const restSeconds = routineCartItems.reduce((total, item) => {
      const series = parseRoutineNumber(item.series);
      const restMinutes = parseRoutineNumber(item.rest);
      return total + series * restMinutes * 60 * 1.2;
    }, 0);
    const activeSeconds = routineCartItems.reduce((total, item) => {
      const series = parseRoutineNumber(item.series);
      const reps = parseRoutineNumber(item.reps);
      return total + series * reps * 2.5;
    }, 0);
    const duration = Math.max(0, Math.round((activeSeconds + restSeconds) / 60));

    if (routineSummaryExercises) {
      routineSummaryExercises.textContent = String(exerciseCount);
    }
    if (routineSummarySeries) {
      routineSummarySeries.textContent = String(seriesTotal);
    }
    if (routineSummaryDuration) {
      routineSummaryDuration.textContent = `≈ ${duration} min`;
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
  }

  function syncFavoriteButtons(id) {
    document.querySelectorAll(`[data-favorite-toggle="${id}"]`).forEach((button) => {
      button.setAttribute("aria-pressed", String(isFavorite(id)));
    });
  }

  function getExerciseById(id) {
    return exercises.find((exercise) => exercise.id === id);
  }

  function isInRoutineCart(id) {
    return routineCartItems.some((item) => item.id === id);
  }

  function syncRoutineButtons(id) {
    document.querySelectorAll("[data-routine-toggle]").forEach((button) => {
      const exerciseId = button.dataset.routineToggle;
      if (id && exerciseId !== id) {
        return;
      }
      const isSelected = isInRoutineCart(exerciseId);
      const label = button.querySelector("[data-routine-toggle-label]");
      button.setAttribute("aria-pressed", String(isSelected));
      button.classList.toggle("is-added", isSelected);
      if (label) {
        label.textContent = isSelected ? "Añadida" : "Añadir a rutina";
      }
      const exercise = getExerciseById(exerciseId);
      if (exercise) {
        button.setAttribute(
          "aria-label",
          `${isSelected ? "Quitar" : "Añadir"} ${exercise.nombre} ${isSelected ? "de" : "a"} la rutina`
        );
      }
    });
  }

  function setRoutineCartOpen(isOpen) {
    if (!routineCart || !routineCartPanel || !routineCartToggle) {
      return;
    }
    if (!isOpen) {
      setRoutineCartBuilderOpen(false);
    }
    routineCart.dataset.open = String(isOpen);
    routineCartPanel.hidden = !isOpen;
    routineCartToggle.setAttribute("aria-expanded", String(isOpen));
  }

  function setRoutineCartBuilderOpen(isOpen) {
    if (!routineCart || !routineCartBuilder) {
      return;
    }
    if (!isOpen) {
      endRoutineCartTour();
      closeRoutineExercisePreview();
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

  function renderRoutineCartBuilder() {
    if (!routineCartBuilderList) {
      return;
    }

    routineCartBuilderList.innerHTML = "";
    const fragment = document.createDocumentFragment();

    routineCartItems.forEach((item, index) => {
      const exercise = getExerciseById(item.id);
      if (!exercise) {
        return;
      }

      const li = document.createElement("li");
      li.className = "routine-cart__builder-item";
      li.innerHTML = `
        <span class="routine-cart__drag" aria-hidden="true">⋮⋮</span>
        <span class="routine-cart__index">${index + 1}</span>
        <span class="routine-cart__builder-copy">
          <span class="routine-cart__builder-title-row">
            <strong>${escapeHtml(exercise.nombre)}</strong>
            </span>
          <span>${escapeHtml(exercise.grupoMuscular)}</span>
        </span>
        <span class="routine-cart__prescription" data-routine-prescription="${escapeHtml(exercise.id)}">
          <label>
            <span>Series</span>
            <input type="text" inputmode="numeric" autocomplete="off" maxlength="24" value="${escapeHtml(item.series)}" data-routine-setting="series" aria-label="Series de ${escapeHtml(exercise.nombre)}">
          </label>
          <label>
            <span>Repeticiones</span>
            <input type="text" inputmode="text" autocomplete="off" maxlength="24" value="${escapeHtml(item.reps)}" data-routine-setting="reps" aria-label="Repeticiones de ${escapeHtml(exercise.nombre)}">
          </label>
          <label>
            <span>Descanso</span>
            <input type="text" inputmode="text" autocomplete="off" maxlength="24" value="${escapeHtml(item.rest)}" data-routine-setting="rest" aria-label="Descanso de ${escapeHtml(exercise.nombre)}">
          </label>
        </span>
        <span class="routine-cart__builder-controls">
          <button type="button" data-routine-info="${escapeHtml(exercise.id)}" aria-label="Ver detalles de ${escapeHtml(exercise.nombre)}">i</button>
          <button type="button" data-routine-move="-1" data-routine-move-id="${escapeHtml(exercise.id)}" ${index === 0 ? "disabled" : ""} aria-label="Subir ${escapeHtml(exercise.nombre)}">↑</button>
          <button type="button" data-routine-move="1" data-routine-move-id="${escapeHtml(exercise.id)}" ${index === routineCartItems.length - 1 ? "disabled" : ""} aria-label="Bajar ${escapeHtml(exercise.nombre)}">↓</button>
          <button type="button" data-routine-remove="${escapeHtml(exercise.id)}" aria-label="Quitar ${escapeHtml(exercise.nombre)}">×</button>
        </span>
      `;
      fragment.appendChild(li);
    });

    routineCartBuilderList.appendChild(fragment);
    updateRoutineCartBuilderSummary();
  }

  function moveRoutineCartItem(id, direction) {
    const index = routineCartItems.findIndex((item) => item.id === id);
    const target = index + direction;
    if (index === -1 || target < 0 || target >= routineCartItems.length) {
      return;
    }
    const [item] = routineCartItems.splice(index, 1);
    routineCartItems.splice(target, 0, item);
    renderRoutineCart();
    if (routineCartResult) {
      routineCartResult.hidden = true;
    }
  }

  function renderRoutineCart() {
    if (!routineCart || !routineCartList) {
      return;
    }

    routineCartItems = routineCartItems.filter((item) => getExerciseById(item.id));
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
        <button type="button" class="routine-cart__remove" data-routine-remove="${escapeHtml(exercise.id)}" aria-label="Quitar ${escapeHtml(exercise.nombre)} de la rutina">
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
    if (isInRoutineCart(id) || !getExerciseById(id)) {
      return;
    }
    routineCartItems.push({ id, series: "", reps: "", rest: "" });
    if (routineCartResult) {
      routineCartResult.hidden = true;
    }
    renderRoutineCart();
    setRoutineCartOpen(true);
  }

  function removeRoutineCartItem(id) {
    routineCartItems = routineCartItems.filter((item) => item.id !== id);
    if (routineCartResult) {
      routineCartResult.hidden = true;
    }
    renderRoutineCart();
  }

  function toggleRoutineCartItem(id) {
    if (isInRoutineCart(id)) {
      removeRoutineCartItem(id);
    } else {
      addRoutineCartItem(id);
    }
  }

  function clearRoutineCart() {
    routineCartItems = [];
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

  const routineCartDefaultTitle = "Rutina de El Tablero Sport Club";

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
      items: routineCartItems,
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
    if (!routineCartPoster || !routineCartPosterTitle || !routineCartPosterList) {
      return;
    }

    if (routine.t === routineCartDefaultTitle) {
      routineCartPosterTitle.innerHTML = "Rutina de<br>El Tablero<br>Sport Club";
    } else {
      routineCartPosterTitle.textContent = routine.t;
    }
    if (routineCartPosterCount) {
      const count = routine.items.length;
      routineCartPosterCount.textContent = count === 1 ? "1 ejercicio" : `${count} ejercicios`;
    }
    if (routineCartPosterDate) {
      routineCartPosterDate.textContent = new Intl.DateTimeFormat("es-ES", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      }).format(new Date());
    }
    if (routineCartPosterNote) {
      routineCartPosterNote.textContent = routine.n || "";
    }
    routineCartPosterList.innerHTML = routine.items
      .map((entry, index) => ({ entry, exercise: getExerciseById(entry.id), index }))
      .filter(({ exercise }) => Boolean(exercise))
      .map(({ entry, exercise, index }) => {
        const prescription = formatPrescription(entry);
        const media = exercise.imagenInicial
          ? `<img src="${escapeHtml(exercise.imagenInicial)}" alt="" decoding="async" width="512" height="512">`
          : "";
        return `
          <li>
            <span class="routine-poster__item-index">${String(index + 1).padStart(2, "0")}</span>
            <span class="routine-poster__item-media">${media}</span>
            <span class="routine-poster__item-copy">
              <strong>${escapeHtml(exercise.nombre)}</strong>
              <span>${escapeHtml(exercise.grupoMuscular)}</span>
              <small>${escapeHtml(exercise.equipamiento[0] || "Peso corporal")}</small>
            </span>
            <span class="routine-poster__item-prescription">${prescription ? escapeHtml(prescription) : "Sin configurar"}</span>
          </li>
        `;
      })
      .join("");
    renderQr(routineCartPosterQr, url, 920, window.QRCode && window.QRCode.CorrectLevel.L);
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

  function generateRoutineCart() {
    if (!window.Routines || routineCartItems.length === 0 || !routineCartLink) {
      return;
    }
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
    if (!routineCartLink || !routineCartLink.value) {
      generateRoutineCart();
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

  const ROUTINE_CART_TOUR_STEPS = [
    {
      selector: ".routine-cart__panel",
      placement: "center",
      title: "Crea rutinas desde el catálogo",
      text: "Los ejercicios añadidos quedan en este panel. Desde aquí puedes revisar la selección y preparar una rutina para entrenar o entregársela a un cliente.",
    },
    {
      selector: "[data-routine-cart-title]",
      placement: "bottom",
      title: "Identifica la rutina",
      text: "Usa el título para nombrar el objetivo, el día o la persona: por ejemplo «Pierna - lunes», «Fuerza tren superior» o el nombre del cliente.",
    },
    {
      selector: ".routine-cart__quick-values",
      placement: "bottom",
      title: "Acelera con valores rápidos",
      text: "Define series, repeticiones y descanso una vez y aplícalos a todos los ejercicios. Después puedes ajustar cualquier ejercicio de forma individual.",
    },
    {
      selector: "[data-routine-cart-builder-list]",
      placement: "left",
      title: "Revisa y ordena",
      text: "Los ejercicios aparecen en el orden de la rutina. Usa las flechas para subir o bajar cada ejercicio, o la × para quitarlo.",
    },
    {
      selector: "[data-routine-info]",
      placement: "left",
      title: "Consulta los detalles",
      text: "Pulsa la i de cualquier ejercicio para ver su explicación, posiciones, músculos implicados y consejos sin perder la configuración de la rutina.",
    },
    {
      selector: ".routine-cart__prescription",
      placement: "bottom",
      title: "Configura cada ejercicio",
      text: "Cada ejercicio puede tener sus propias series, repeticiones y descanso. Estos datos se guardan en el enlace, el QR y la versión impresa.",
    },
    {
      selector: "[data-routine-cart-generate]",
      placement: "top",
      title: "Genera enlace y QR",
      text: "Cuando la rutina esté lista, genera el enlace y el código QR. Después podrás copiarlo, descargar el QR o imprimir una versión preparada para entregar.",
    },
    {
      selector: "[data-routine-cart-tour]",
      placement: "bottom",
      title: "Repite la guía",
      text: "Este botón vuelve a abrir la guía rápida cuando necesites revisar el flujo.",
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

    routineCartTourCloseButton.addEventListener("click", endRoutineCartTour);
    routineCartTourPrevButton.addEventListener("click", () => goToRoutineCartTourStep(routineCartTourIndex - 1, -1));
    routineCartTourNextButton.addEventListener("click", () => {
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

  function groupValuesFor(value) {
    return GROUP_AGGREGATES[value] ? GROUP_AGGREGATES[value].values : [value];
  }

  function countForGroupValue(value) {
    const values = groupValuesFor(value);
    return exercises.filter((exercise) => values.some((item) => exercise.gruposMusculares.includes(item))).length;
  }

  function countForEquipmentValue(value) {
    return exercises.filter((exercise) => exercise.equipamiento.includes(value)).length;
  }

  function createRadioRow({ name, value, label, count, checked }) {
    const row = document.createElement("label");
    row.className = "filter-radio-row";
    row.innerHTML = `
      <input type="radio" name="${escapeHtml(name)}" value="${escapeHtml(value)}" ${checked ? "checked" : ""}>
      <span class="filter-radio-row__indicator" aria-hidden="true"></span>
      <span class="filter-radio-row__label">${escapeHtml(label)}</span>
      ${count === undefined ? "" : `<span class="filter-radio-row__count">${count}</span>`}
    `;
    return row;
  }

  function buildAggregateGroup(key, aggregate, realValues) {
    const isExpanded =
      expandedAggregateGroups.has(key) || draftState.grupo === key || realValues.includes(draftState.grupo);

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
        checked: draftState.grupo === key,
      })
    );
    realValues.forEach((value) => {
      panel.appendChild(
        createRadioRow({
          name: "filter-grupo",
          value,
          label: value,
          count: countForGroupValue(value),
          checked: draftState.grupo === value,
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
    const muscleGroups = payloadGrupos.filter((group) => !EXERCISE_TYPE_VALUES.includes(group));

    filterGroupList.appendChild(
      createRadioRow({ name: "filter-grupo", value: "", label: "Todos", checked: draftState.grupo === "" })
    );

    PRIMARY_GROUP_VALUES.filter((group) => muscleGroups.includes(group)).forEach((group) => {
      filterGroupList.appendChild(
        createRadioRow({
          name: "filter-grupo",
          value: group,
          label: group,
          count: countForGroupValue(group),
          checked: draftState.grupo === group,
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

  function buildEquipmentList() {
    const equipmentSet = new Set();
    exercises.forEach((exercise) => exercise.equipamiento.forEach((item) => equipmentSet.add(item)));
    const equipmentValues = Array.from(equipmentSet).sort((a, b) => a.localeCompare(b, "es"));

    filterEquipmentList.innerHTML = "";
    filterEquipmentList.appendChild(
      createRadioRow({ name: "filter-equipamiento", value: "", label: "Todo el equipamiento", checked: draftState.equipamiento === "" })
    );
    equipmentValues.forEach((value) => {
      filterEquipmentList.appendChild(
        createRadioRow({
          name: "filter-equipamiento",
          value,
          label: value,
          count: countForEquipmentValue(value),
          checked: draftState.equipamiento === value,
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

    if (candidate.grupo) {
      const values = groupValuesFor(candidate.grupo);
      if (!values.some((value) => exercise.gruposMusculares.includes(value))) {
        return false;
      }
    }

    if (candidate.equipamiento && !exercise.equipamiento.includes(candidate.equipamiento)) {
      return false;
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
    const candidate = { q: state.q, grupo: draftState.grupo, equipamiento: draftState.equipamiento, favoritos: draftState.favoritos };
    return exercises.filter((exercise) => matchesFiltersWith(exercise, candidate)).length;
  }

  function renderCard(exercise) {
    const card = document.createElement("div");
    card.className = "exercise-card";
    card.dataset.exerciseId = exercise.id;
    card.dataset.current = String(currentExercise && currentExercise.id === exercise.id);

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
      <button type="button" class="exercise-card__add" data-routine-toggle="${escapeHtml(exercise.id)}" aria-pressed="${isInRoutineCart(exercise.id)}" aria-label="${isInRoutineCart(exercise.id) ? "Quitar" : "Añadir"} ${escapeHtml(exercise.nombre)} ${isInRoutineCart(exercise.id) ? "de" : "a"} la rutina">
        <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M12 5v14M5 12h14" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"></path></svg>
        <span data-routine-toggle-label>${isInRoutineCart(exercise.id) ? "Añadida" : "Añadir a rutina"}</span>
      </button>
    `;

    card
      .querySelector(".exercise-card__open")
      .addEventListener("click", () => openExercise(exercise, true));
    card.querySelector(".exercise-card__favorite").addEventListener("click", () => toggleFavorite(exercise.id));
    card.querySelector(".exercise-card__add").addEventListener("click", () => toggleRoutineCartItem(exercise.id));

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

    const card = renderCard(exercise);
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

  function groupLabelFor(value) {
    return GROUP_AGGREGATES[value] ? GROUP_AGGREGATES[value].label : value;
  }

  function activeFilterLabels() {
    const labels = [];
    if (state.grupo) {
      labels.push(groupLabelFor(state.grupo));
    }
    if (state.equipamiento) {
      labels.push(state.equipamiento);
    }
    if (state.favoritos) {
      labels.push("Solo favoritos");
    }
    return labels;
  }

  function activeFilterCount() {
    return activeFilterLabels().length;
  }

  function resetFilters() {
    state.grupo = "";
    state.equipamiento = "";
    state.favoritos = false;
    renderGrid();
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

  function renderExerciseDetail(exercise) {
    if (!exercisePageContent) {
      return;
    }

    const anatomyImage = exercise.imagenAnatomia || exercise.imagenAnatomica || "";

    exercisePageContent.innerHTML = `
      <article class="exercise-detail" aria-labelledby="exercise-page-title">
        <div class="exercise-detail__topbar">
          <h1 id="exercise-page-title">${escapeHtml(exercise.nombre)}</h1>
          <div class="exercise-detail__actions">
            <button type="button" class="exercise-detail__favorite" data-favorite-toggle="${escapeHtml(exercise.id)}" aria-pressed="${isFavorite(exercise.id)}" aria-label="Guardar ${escapeHtml(exercise.nombre)} en favoritos">
              ${HEART_ICON}
            </button>
            <button type="button" class="exercise-detail__add" data-routine-toggle="${escapeHtml(exercise.id)}" aria-pressed="${isInRoutineCart(exercise.id)}" aria-label="${isInRoutineCart(exercise.id) ? "Quitar" : "Añadir"} ${escapeHtml(exercise.nombre)} ${isInRoutineCart(exercise.id) ? "de" : "a"} la rutina">
              <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M12 5v14M5 12h14" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"></path></svg>
              <span data-routine-toggle-label>${isInRoutineCart(exercise.id) ? "Añadida" : "Añadir a rutina"}</span>
            </button>
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
    if (!routineCartPanel) {
      return;
    }
    const preview = routineCartPanel.querySelector("[data-routine-exercise-preview]");
    if (preview) {
      preview.remove();
    }
  }

  function openRoutineExercisePreview(id) {
    if (!routineCartPanel) {
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
      <article class="routine-cart__exercise-preview-panel">
        <div class="routine-cart__exercise-preview-topbar">
          <div>
            <p>Ficha del ejercicio</p>
            <h2 id="routine-exercise-preview-title">${escapeHtml(exercise.nombre)}</h2>
            <span>${escapeHtml(exercise.grupoMuscular)}${exercise.nombreAlternativo ? ` - ${escapeHtml(exercise.nombreAlternativo)}` : ""}</span>
          </div>
          <button type="button" data-routine-info-close aria-label="Cerrar detalles del ejercicio">
            <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18" stroke="currentColor" stroke-width="2" stroke-linecap="round"></path></svg>
          </button>
        </div>
        <div class="routine-cart__exercise-preview-body">
          ${exercise.descripcion ? `<p class="routine-cart__exercise-preview-description">${escapeHtml(exercise.descripcion)}</p>` : ""}
          ${
            exercise.musculosPrincipales.length || exercise.musculosSecundarios.length
              ? `<section class="routine-cart__exercise-preview-muscles">
                  ${
                    exercise.musculosPrincipales.length
                      ? `<div><span>Músculos principales</span><ul class="exercise-detail__muscle-tags exercise-detail__muscle-tags--primary">${renderList(exercise.musculosPrincipales)}</ul></div>`
                      : ""
                  }
                  ${
                    exercise.musculosSecundarios.length
                      ? `<div><span>Músculos secundarios</span><ul class="exercise-detail__muscle-tags exercise-detail__muscle-tags--secondary">${renderList(exercise.musculosSecundarios)}</ul></div>`
                      : ""
                  }
                </section>`
              : ""
          }
          ${renderMedia(exercise)}
          ${
            anatomyImage
              ? `<figure class="routine-cart__exercise-preview-anatomy"><img src="${escapeHtml(anatomyImage)}" alt="" loading="lazy" decoding="async"></figure>`
              : ""
          }
          <div class="routine-cart__exercise-preview-guidance">
            ${
              exercise.instrucciones.length
                ? `<section><h3>Instrucciones</h3><ol class="exercise-detail__steps">${renderSteps(exercise.instrucciones)}</ol></section>`
                : ""
            }
            ${
              exercise.consejos.length
                ? `<section><h3>Consejos</h3><ul class="exercise-detail__tips">${renderList(exercise.consejos)}</ul></section>`
                : ""
            }
          </div>
        </div>
      </article>
    `;
    routineCartPanel.appendChild(preview);
    initLazyImages(preview);
    const closeButton = preview.querySelector(".routine-cart__exercise-preview-topbar [data-routine-info-close]");
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

  function showExercise(exercise) {
    const useOverlay = usesExerciseOverlay();
    setCatalogToolsReveal(false);
    currentExercise = exercise;
    renderExerciseDetail(exercise);
    syncCurrentCard();
    setCatalogToolsPlacement(useOverlay ? "intro" : "catalog");
    if (exercisePage) {
      exercisePage.hidden = false;
    }
    if (exercisesMain) {
      exercisesMain.classList.add("is-exercise-open");
    }
    document.body.classList.toggle("has-exercise-overlay", useOverlay);
    if (routineView) {
      routineView.hidden = true;
    }
    exercisesIntro.hidden = !useOverlay;
    exercisesCatalog.hidden = false;
    if (backToTopButton) {
      backToTopButton.classList.remove("is-visible");
    }
    if (!useOverlay) {
      alignExerciseLayout(exercise);
    }
  }

  function openExercise(exercise, updateHash) {
    showExercise(exercise);
    if (updateHash) {
      history.pushState({ exercise: exercise.id }, "", `#ejercicio/${exercise.id}`);
    }
  }

  function closeExercise(updateHash) {
    currentExercise = null;
    lastWindowScrollY = window.scrollY;
    if (exercisePage) {
      exercisePage.hidden = true;
    }
    if (exercisePageContent) {
      exercisePageContent.innerHTML = "";
    }
    if (exercisesMain) {
      exercisesMain.classList.remove("is-exercise-open");
    }
    document.body.classList.remove("has-exercise-overlay");
    syncCurrentCard();
    setCatalogToolsPlacement("intro");
    exercisesIntro.hidden = false;
    exercisesCatalog.hidden = false;
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
        }
        document.body.classList.remove("has-exercise-overlay");
        setCatalogToolsPlacement("intro");
        exercisesIntro.hidden = false;
        exercisesCatalog.hidden = false;
      }
      return;
    }

    const exercise = exercises.find((item) => item.id === match[1]);
    if (exercise) {
      showExercise(exercise);
    }
  }

  function checkRoutineView() {
    if (!routineView || !window.Routines) {
      return;
    }

    const routine = window.Routines.decode(location.hash);
    const routineItems = routine ? routine.items || routine.e.map((id) => ({ id })) : [];
    const routineCards = routineItems.map(renderRoutineCard).filter(Boolean);

    if (!routine || routineCards.length === 0) {
      routineView.hidden = true;
      if (!location.hash.startsWith("#ejercicio/") && !currentExercise) {
        setCatalogToolsPlacement("intro");
        exercisesIntro.hidden = false;
        exercisesCatalog.hidden = false;
      }
      return;
    }

    currentExercise = null;
    setCatalogToolsPlacement("intro");
    if (exercisePage) {
      exercisePage.hidden = true;
    }
    if (exercisePageContent) {
      exercisePageContent.innerHTML = "";
    }
    if (exercisesMain) {
      exercisesMain.classList.remove("is-exercise-open");
    }
    document.body.classList.remove("has-exercise-overlay");
    exercisesIntro.hidden = true;
    exercisesCatalog.hidden = true;
    routineView.hidden = false;

    routineTitle.textContent = routine.t || "Rutina compartida";

    if (routine.n) {
      routineNote.textContent = routine.n;
      routineNote.hidden = false;
    } else {
      routineNote.hidden = true;
    }

    routineGrid.innerHTML = "";
    const fragment = document.createDocumentFragment();
    routineCards.forEach((card) => fragment.appendChild(card));
    routineGrid.appendChild(fragment);
    initLazyImages(routineGrid);

    window.scrollTo(0, 0);
  }

  function isRoutineHash(hash) {
    return hash.startsWith("#rutina?") || hash.startsWith("#r?");
  }

  function syncRoute() {
    if (isRoutineHash(location.hash)) {
      checkRoutineView();
      return;
    }

    routineView.hidden = true;
    openFromHash();
  }

  function dismissRoutineView() {
    if (isRoutineHash(location.hash)) {
      history.pushState({}, "", location.pathname);
    }
    checkRoutineView();
  }

  function saveRoutineToFavorites() {
    const routine = window.Routines.decode(location.hash);
    if (!routine) {
      return;
    }

    routine.e.forEach((id) => {
      if (!favorites.has(id)) {
        favorites.add(id);
      }
    });
    saveFavorites();
    routine.e.forEach((id) => syncFavoriteButtons(id));

    if (routineSaveButton) {
      const original = routineSaveButton.textContent;
      routineSaveButton.textContent = "¡Guardada en Favoritos!";
      routineSaveButton.disabled = true;
      window.setTimeout(() => {
        routineSaveButton.textContent = original;
        routineSaveButton.disabled = false;
      }, 1800);
    }
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
    const hasDraftFilters = Boolean(draftState.grupo) || Boolean(draftState.equipamiento) || draftState.favoritos;
    filterPanelClear.classList.toggle("is-visible", hasDraftFilters);
  }

  function refreshFilterPanelLists() {
    buildGroupList();
    buildEquipmentList();
    if (filterEquipmentSearch) {
      filterEquipmentSearch.value = "";
    }
  }

  function openFilterPanel() {
    if (!filterPanel) {
      return;
    }
    draftState.grupo = state.grupo;
    draftState.equipamiento = state.equipamiento;
    draftState.favoritos = state.favoritos;
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
    };
    if (prefersReducedMotion) {
      finish();
    } else {
      window.setTimeout(finish, 260);
    }

    if (filtersOpenButton) {
      filtersOpenButton.focus();
    } else if (previousFocusedElement) {
      previousFocusedElement.focus();
    }
  }

  function applyFilterPanel() {
    state.grupo = draftState.grupo;
    state.equipamiento = draftState.equipamiento;
    state.favoritos = draftState.favoritos;
    renderGrid();
    closeFilterPanel();
  }

  function clearFilterPanel() {
    draftState.grupo = "";
    draftState.equipamiento = "";
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
            openExercise(exercise, true);
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

    if (routineCart) {
      routineCart.addEventListener("click", (event) => {
        if (event.target.closest("[data-routine-info-close]")) {
          closeRoutineExercisePreview();
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

    document.addEventListener("click", (event) => {
      if (event.target.closest("[data-routine-cart-tour]")) {
        startRoutineCartTour();
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

    if (routineQuickApply) {
      routineQuickApply.addEventListener("click", applyRoutineQuickValues);
    }

    if (routineCartAddMore) {
      routineCartAddMore.addEventListener("click", () => setRoutineCartOpen(false));
    }

    if (routineCartGenerate) {
      routineCartGenerate.addEventListener("click", generateRoutineCart);
    }

    if (routineCartCopy) {
      routineCartCopy.addEventListener("click", copyRoutineCartLink);
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

      routineCartBuilderList.addEventListener("click", (event) => {
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
    }

    if (printFavoritesButton) {
      printFavoritesButton.addEventListener("click", () => {
        window.print();
      });
    }

    searchInput.addEventListener("input", () => {
      window.clearTimeout(searchDebounce);
      searchDebounce = window.setTimeout(() => {
        state.q = searchInput.value.trim();
        renderGrid();
      }, 130);
    });

    if (filtersOpenButton) {
      filtersOpenButton.addEventListener("click", openFilterPanel);
    }

    if (filtersClearInline) {
      filtersClearInline.addEventListener("click", resetFilters);
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
          draftState.grupo = target.value;
          updateApplyButtonLabel();
          updateFilterPanelClearVisibility();
        } else if (target.name === "filter-equipamiento") {
          draftState.equipamiento = target.value;
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

    if (routineSaveButton) {
      routineSaveButton.addEventListener("click", saveRoutineToFavorites);
    }

    if (routineDismissButton) {
      routineDismissButton.addEventListener("click", dismissRoutineView);
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
      renderRoutineCart();
      syncRoute();
      updateHeaderHeightVar();
    })
    .catch((error) => {
      grid.innerHTML = `<p class="exercises-empty">No se ha podido cargar el catálogo de ejercicios. Inténtalo de nuevo más tarde.</p>`;
      console.error("[ejercicios] Error cargando data/exercises.json", error);
    });
})();
