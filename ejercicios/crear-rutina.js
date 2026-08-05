(() => {
  "use strict";

  const titleInput = document.querySelector("[data-routine-title-input]");
  const noteInput = document.querySelector("[data-routine-note-input]");
  const selectedList = document.querySelector("[data-selected-list]");
  const selectedCount = document.querySelector("[data-selected-count]");
  const selectedEmpty = document.querySelector("[data-selected-empty]");
  const generateButton = document.querySelector("[data-generate-routine]");
  const resultBox = document.querySelector("[data-routine-result]");
  const linkInput = document.querySelector("[data-routine-link]");
  const copyLinkButton = document.querySelector("[data-copy-routine-link]");
  const qrContainer = document.querySelector("[data-routine-qr]");
  const printButton = document.querySelector("[data-print-routine]");

  const searchInput = document.querySelector("[data-builder-search]");
  const countLabel = document.querySelector("[data-builder-count]");
  const grid = document.querySelector("[data-builder-grid]");
  const filtersOpenButton = document.querySelector("[data-filters-open]");
  const filtersBadge = document.querySelector("[data-filters-badge]");
  const filtersSummary = document.querySelector("[data-filters-summary]");
  const filtersSummaryText = document.querySelector("[data-filters-summary-text]");
  const filtersClearInline = document.querySelector("[data-filters-clear]");
  const filterPanel = document.querySelector("[data-filter-panel]");
  const filterPanelSheet = document.querySelector("[data-filter-panel-sheet]");
  const filterGroupList = document.querySelector("[data-filter-group-list]");
  const filterEquipmentList = document.querySelector("[data-filter-equipment-list]");
  const filterEquipmentSearchWrap = document.querySelector("[data-equipment-search-wrap]");
  const filterEquipmentSearch = document.querySelector("[data-filter-equipment-search]");
  const filterPanelApply = document.querySelector("[data-filter-panel-apply]");
  const filterPanelClear = document.querySelector("[data-filter-panel-clear]");
  const dialog = document.querySelector("[data-exercise-dialog]");
  const dialogPanel = document.querySelector("[data-exercise-dialog-panel]");
  const dialogContent = document.querySelector("[data-exercise-dialog-content]");
  const prevButton = document.querySelector("[data-exercise-prev]");
  const nextButton = document.querySelector("[data-exercise-next]");
  const navCount = document.querySelector("[data-exercise-nav-count]");

  const posterTitle = document.querySelector("[data-poster-title]");
  const posterNote = document.querySelector("[data-poster-note]");
  const posterQr = document.querySelector("[data-poster-qr]");
  const posterList = document.querySelector("[data-poster-list]");

  if (!grid) {
    return;
  }

  let exercises = [];
  let selected = [];
  let exerciseSettings = new Map();
  let searchDebounce = null;
  let payloadGrupos = [];
  let previousFocusedElement = null;
  let currentExercise = null;
  let lastFocusedElement = null;
  let closeTimer = null;

  const state = { q: "", grupo: "", equipamiento: "" };
  const draftState = { grupo: "", equipamiento: "" };
  const expandedAggregateGroups = new Set();

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

  const prefersReducedMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const escapeHtml = (value) =>
    String(value).replace(/[&<>"']/g, (char) => (
      { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[char]
    ));

  const normalize = (value) =>
    value
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");

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

  function matchesFiltersWith(exercise, candidate) {
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
      const haystack = normalize(`${exercise.nombre} ${exercise.nombreAlternativo || ""}`);
      if (!haystack.includes(normalize(candidate.q))) {
        return false;
      }
    }
    return true;
  }

  function matchesFilters(exercise) {
    return matchesFiltersWith(exercise, state);
  }

  function initLazyImages(container) {
    container.querySelectorAll("img").forEach((img) => {
      if (img.complete && img.naturalWidth > 0) {
        img.classList.add("is-loaded");
        return;
      }
      img.addEventListener("load", () => img.classList.add("is-loaded"), { once: true });
    });
  }

  function getExerciseSettings(id) {
    if (!exerciseSettings.has(id)) {
      exerciseSettings.set(id, { series: "", reps: "", rest: "" });
    }
    return exerciseSettings.get(id);
  }

  function sanitizeRoutineValue(value) {
    return value.trim().replace(/\s+/g, " ").slice(0, 24);
  }

  function updateExerciseSetting(id, key, value) {
    const settings = getExerciseSettings(id);
    settings[key] = sanitizeRoutineValue(value);
    resultBox.hidden = true;
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
      parts.push(`Descanso ${settings.rest}`);
    }
    return parts.join(" · ");
  }

  function toggleSelected(id) {
    const index = selected.indexOf(id);
    if (index === -1) {
      selected.push(id);
      getExerciseSettings(id);
    } else {
      selected.splice(index, 1);
      exerciseSettings.delete(id);
    }
    renderSelected();
    syncCardStates();
    resultBox.hidden = true;
  }

  function moveSelected(id, direction) {
    const index = selected.indexOf(id);
    const target = index + direction;
    if (index === -1 || target < 0 || target >= selected.length) {
      return;
    }
    const [item] = selected.splice(index, 1);
    selected.splice(target, 0, item);
    renderSelected();
    resultBox.hidden = true;
  }

  function syncCardStates() {
    grid.querySelectorAll("[data-builder-exercise]").forEach((card) => {
      const isSelected = selected.includes(card.dataset.builderExercise);
      card.dataset.selected = String(isSelected);
      card.classList.toggle("is-selected", isSelected);
      const addButton = card.querySelector(".routine-builder__card-add");
      if (addButton) {
        addButton.setAttribute("aria-pressed", String(isSelected));
        const exerciseName = card.dataset.builderExerciseName || "ejercicio";
        addButton.setAttribute(
          "aria-label",
          isSelected ? `Quitar ${exerciseName} de la rutina` : `Añadir ${exerciseName} a la rutina`
        );
      }
      const action = card.querySelector(".routine-builder__card-action");
      if (action) {
        action.textContent = isSelected ? "Añadido ✓" : "Añadir +";
      }
    });
  }

  function renderSelected() {
    selectedCount.textContent = `(${selected.length})`;
    selectedEmpty.hidden = selected.length > 0;
    selectedList.innerHTML = "";
    generateButton.disabled = selected.length === 0;

    const fragment = document.createDocumentFragment();
    selected.forEach((id, index) => {
      const exercise = exercises.find((item) => item.id === id);
      if (!exercise) {
        return;
      }
      const li = document.createElement("li");
      const settings = getExerciseSettings(id);
      li.innerHTML = `
        <span class="routine-builder__list-index">${index + 1}</span>
        <img src="${escapeHtml(exercise.imagenInicial || "")}" alt="" loading="lazy" decoding="async">
        <span class="routine-builder__list-detail">
          <span class="routine-builder__list-name">${escapeHtml(exercise.nombre)}</span>
          <span class="routine-builder__prescription" data-prescription-id="${escapeHtml(id)}">
            <label>
              <span>Series</span>
              <input type="text" inputmode="numeric" autocomplete="off" maxlength="24" value="${escapeHtml(settings.series)}" data-prescription-field="series" aria-label="Series de ${escapeHtml(exercise.nombre)}">
            </label>
            <label>
              <span>Reps</span>
              <input type="text" inputmode="text" autocomplete="off" maxlength="24" value="${escapeHtml(settings.reps)}" data-prescription-field="reps" aria-label="Repeticiones de ${escapeHtml(exercise.nombre)}">
            </label>
            <label>
              <span>Descanso</span>
              <input type="text" inputmode="text" autocomplete="off" maxlength="24" value="${escapeHtml(settings.rest)}" data-prescription-field="rest" aria-label="Descanso de ${escapeHtml(exercise.nombre)}">
            </label>
          </span>
        </span>
        <span class="routine-builder__list-controls">
          <button type="button" data-move-up ${index === 0 ? "disabled" : ""} aria-label="Subir ${escapeHtml(exercise.nombre)}">↑</button>
          <button type="button" data-move-down ${index === selected.length - 1 ? "disabled" : ""} aria-label="Bajar ${escapeHtml(exercise.nombre)}">↓</button>
          <button type="button" data-remove aria-label="Quitar ${escapeHtml(exercise.nombre)}">×</button>
        </span>
      `;
      li.querySelector("[data-move-up]").addEventListener("click", () => moveSelected(id, -1));
      li.querySelector("[data-move-down]").addEventListener("click", () => moveSelected(id, 1));
      li.querySelector("[data-remove]").addEventListener("click", () => toggleSelected(id));
      li.querySelectorAll("[data-prescription-field]").forEach((input) => {
        input.addEventListener("input", () => updateExerciseSetting(id, input.dataset.prescriptionField, input.value));
      });
      fragment.appendChild(li);
    });
    selectedList.appendChild(fragment);
  }

  function renderCard(exercise) {
    const isSelected = selected.includes(exercise.id);
    const card = document.createElement("div");
    card.className = "exercise-card routine-builder__card";
    card.dataset.builderExercise = exercise.id;
    card.dataset.builderExerciseName = exercise.nombre;
    card.dataset.selected = String(isSelected);
    card.classList.toggle("is-selected", isSelected);

    const media = exercise.imagenInicial
      ? `<img src="${escapeHtml(exercise.imagenInicial)}" alt="" loading="lazy" decoding="async" width="512" height="512">`
      : `<div class="exercise-card__media--empty">Sin imagen disponible</div>`;

    card.innerHTML = `
      <button type="button" class="exercise-card__open routine-builder__card-add" aria-pressed="${isSelected}" aria-label="${isSelected ? "Quitar" : "Añadir"} ${escapeHtml(exercise.nombre)} ${isSelected ? "de" : "a"} la rutina">
        <span class="exercise-card__media">
          ${media}
        </span>
        <span class="exercise-card__body">
          <span class="exercise-card__group">${escapeHtml(exercise.grupoMuscular)}</span>
          <span class="exercise-card__name">${escapeHtml(exercise.nombre)}</span>
          <span class="routine-builder__card-action">${isSelected ? "Añadido ✓" : "Añadir +"}</span>
        </span>
      </button>
      <button type="button" class="routine-builder__card-info" aria-label="Ver detalles de ${escapeHtml(exercise.nombre)}" title="Ver detalles">
        <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <circle cx="12" cy="12" r="8.5" stroke="currentColor" stroke-width="2"></circle>
          <path d="M12 11.2v5" stroke="currentColor" stroke-width="2" stroke-linecap="round"></path>
          <circle cx="12" cy="7.8" r="0.2" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"></circle>
        </svg>
      </button>
    `;

    card.querySelector(".routine-builder__card-add").addEventListener("click", () => toggleSelected(exercise.id));
    card.querySelector(".routine-builder__card-info").addEventListener("click", (event) => openExercise(exercise, event));
    return card;
  }

  function renderGrid() {
    const filtered = exercises.filter(matchesFilters);
    grid.innerHTML = "";
    const fragment = document.createDocumentFragment();
    filtered.forEach((exercise) => fragment.appendChild(renderCard(exercise)));
    grid.appendChild(fragment);
    initLazyImages(grid);
    countLabel.textContent =
      filtered.length === exercises.length
        ? `${exercises.length} ejercicios disponibles`
        : `${filtered.length} de ${exercises.length} ejercicios`;
    updateFiltersButton();
    renderFiltersSummary();
  }

  function renderMedia(exercise) {
    if (exercise.imagenInicial && exercise.imagenFinal) {
      return `
        <div class="exercise-detail__media has-two">
          <figure class="exercise-detail__media-figure">
            <img src="${escapeHtml(exercise.imagenInicial)}" alt="${escapeHtml(exercise.nombre)} — posición inicial" loading="lazy" decoding="async" width="512" height="512">
            <figcaption>Posición inicial</figcaption>
          </figure>
          <figure class="exercise-detail__media-figure">
            <img src="${escapeHtml(exercise.imagenFinal)}" alt="${escapeHtml(exercise.nombre)} — posición final" loading="lazy" decoding="async" width="512" height="512">
            <figcaption>Posición final</figcaption>
          </figure>
        </div>
      `;
    }

    if (exercise.imagenInicial) {
      return `
        <div class="exercise-detail__media">
          <figure class="exercise-detail__media-figure">
            <img src="${escapeHtml(exercise.imagenInicial)}" alt="${escapeHtml(exercise.nombre)}" loading="lazy" decoding="async" width="512" height="512">
          </figure>
        </div>
      `;
    }

    return `<div class="exercise-detail__media-empty">Sin imagen disponible para este ejercicio</div>`;
  }

  function renderList(items) {
    return items.map((item) => `<li>${escapeHtml(item)}</li>`).join("");
  }

  function renderExerciseDetail(exercise) {
    if (!dialogContent) {
      return;
    }

    const facts = [
      ["Parte del cuerpo", exercise.parteCuerpo],
      ["Categoría", exercise.categoria],
      ["Dificultad", exercise.dificultad],
      ["Mecánica", exercise.mecanica],
      ["Tipo de fuerza", exercise.tipoFuerza],
      ["Equipamiento", exercise.equipamiento[0] || "Peso corporal"],
    ];

    dialogContent.innerHTML = `
      <article class="exercise-detail">
        <div class="exercise-detail__header">
          <p class="exercise-detail__eyebrow">${escapeHtml(exercise.grupoMuscular)}</p>
          <h2 id="exercise-dialog-title">${escapeHtml(exercise.nombre)}</h2>
          ${exercise.nombreAlternativo ? `<p class="exercise-detail__alt-name">${escapeHtml(exercise.nombreAlternativo)}</p>` : ""}
        </div>
        <div class="exercise-detail__body">
          <div class="exercise-detail__media-col">
            ${renderMedia(exercise)}
          </div>
          <div class="exercise-detail__text-col">
            <ul class="exercise-detail__facts">
              ${facts
                .map(([label, value]) => `<li><span>${escapeHtml(label)}</span><strong>${escapeHtml(value)}</strong></li>`)
                .join("")}
            </ul>
            ${exercise.descripcion ? `<p class="exercise-detail__description">${escapeHtml(exercise.descripcion)}</p>` : ""}
            ${
              exercise.musculosPrincipales.length || exercise.musculosSecundarios.length
                ? `<div class="exercise-detail__section">
                    <h3>Músculos implicados</h3>
                    ${
                      exercise.musculosPrincipales.length
                        ? `<ul class="exercise-detail__muscle-tags exercise-detail__muscle-tags--primary">${renderList(exercise.musculosPrincipales)}</ul>`
                        : ""
                    }
                    ${
                      exercise.musculosSecundarios.length
                        ? `<ul class="exercise-detail__muscle-tags exercise-detail__muscle-tags--secondary" style="margin-top:0.5rem;">${renderList(exercise.musculosSecundarios)}</ul>`
                        : ""
                    }
                  </div>`
                : ""
            }
            ${
              exercise.instrucciones.length
                ? `<div class="exercise-detail__section">
                    <h3>Instrucciones</h3>
                    <ol>${renderList(exercise.instrucciones)}</ol>
                  </div>`
                : ""
            }
            ${
              exercise.consejos.length
                ? `<div class="exercise-detail__section">
                    <h3>Consejos</h3>
                    <ul>${renderList(exercise.consejos)}</ul>
                  </div>`
                : ""
            }
          </div>
        </div>
      </article>
    `;

    initLazyImages(dialogContent);
  }

  function getFilteredList() {
    return exercises.filter(matchesFilters);
  }

  function updateNavControls(exercise) {
    if (!prevButton || !nextButton || !navCount) {
      return;
    }

    const list = getFilteredList();
    const index = list.findIndex((item) => item.id === exercise.id);

    if (index === -1) {
      prevButton.disabled = true;
      nextButton.disabled = true;
      navCount.textContent = "";
      return;
    }

    prevButton.disabled = index <= 0;
    nextButton.disabled = index >= list.length - 1;
    navCount.textContent = `${index + 1} de ${list.length}`;
  }

  function showExercise(exercise) {
    currentExercise = exercise;
    renderExerciseDetail(exercise);
    if (dialogPanel) {
      dialogPanel.scrollTop = 0;
    }
    updateNavControls(exercise);
  }

  function navigate(direction) {
    if (!currentExercise) {
      return;
    }

    const list = getFilteredList();
    const index = list.findIndex((item) => item.id === currentExercise.id);
    const nextIndex = index + direction;

    if (index === -1 || nextIndex < 0 || nextIndex >= list.length) {
      return;
    }

    showExercise(list[nextIndex]);
  }

  function setDialogOrigin(originEvent) {
    if (!dialogPanel || !originEvent || typeof originEvent.clientX !== "number") {
      if (dialogPanel) {
        dialogPanel.style.removeProperty("--dialog-origin-x");
        dialogPanel.style.removeProperty("--dialog-origin-y");
      }
      return;
    }

    const rect = dialogPanel.getBoundingClientRect();
    if (rect.width === 0 || rect.height === 0) {
      return;
    }

    const originX = ((originEvent.clientX - rect.left) / rect.width) * 100;
    const originY = ((originEvent.clientY - rect.top) / rect.height) * 100;
    dialogPanel.style.setProperty("--dialog-origin-x", `${originX.toFixed(1)}%`);
    dialogPanel.style.setProperty("--dialog-origin-y", `${originY.toFixed(1)}%`);
  }

  function openExercise(exercise, originEvent) {
    if (!dialog || !dialogPanel) {
      return;
    }

    window.clearTimeout(closeTimer);
    closeTimer = null;
    lastFocusedElement = document.activeElement;
    showExercise(exercise);
    dialog.hidden = false;
    dialogPanel.scrollTop = 0;
    dialog.classList.remove("is-visible");
    setDialogOrigin(originEvent);
    document.body.style.overflow = "hidden";
    dialogPanel.focus();

    document.addEventListener("keydown", onDialogKeydown);

    window.requestAnimationFrame(() => {
      dialogPanel.scrollTop = 0;
      dialog.classList.add("is-visible");
    });
  }

  function closeExercise() {
    if (!dialog || dialog.hidden || closeTimer) {
      return;
    }

    dialog.classList.remove("is-visible");
    currentExercise = null;
    document.removeEventListener("keydown", onDialogKeydown);

    closeTimer = window.setTimeout(
      () => {
        dialog.hidden = true;
        document.body.style.overflow = "";
        closeTimer = null;
      },
      prefersReducedMotion() ? 0 : 300
    );

    if (lastFocusedElement) {
      lastFocusedElement.focus();
    }
  }

  function onDialogKeydown(event) {
    if (event.key === "Escape") {
      closeExercise();
      return;
    }

    if (event.key === "ArrowLeft") {
      navigate(-1);
      return;
    }

    if (event.key === "ArrowRight") {
      navigate(1);
      return;
    }

    if (event.key !== "Tab" || !dialogPanel) {
      return;
    }

    const focusable = dialogPanel.querySelectorAll(
      'a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])'
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
    if (!filterGroupList) {
      return;
    }

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
    if (!filterEquipmentList) {
      return;
    }

    const equipmentSet = new Set();
    exercises.forEach((exercise) => exercise.equipamiento.forEach((item) => equipmentSet.add(item)));
    const equipmentValues = Array.from(equipmentSet).sort((a, b) => a.localeCompare(b, "es"));

    filterEquipmentList.innerHTML = "";
    filterEquipmentList.appendChild(
      createRadioRow({
        name: "filter-equipamiento",
        value: "",
        label: "Todo el equipamiento",
        checked: draftState.equipamiento === "",
      })
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
    if (!filterEquipmentList) {
      return;
    }

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
    return labels;
  }

  function updateFiltersButton() {
    const count = activeFilterLabels().length;
    if (filtersBadge) {
      filtersBadge.hidden = count === 0;
      filtersBadge.textContent = String(count);
    }
    if (filtersOpenButton) {
      filtersOpenButton.classList.toggle("is-active", count > 0);
    }
  }

  function renderFiltersSummary() {
    if (!filtersSummary || !filtersSummaryText) {
      return;
    }

    const labels = activeFilterLabels();
    if (labels.length === 0) {
      filtersSummary.hidden = true;
      return;
    }

    filtersSummary.hidden = false;
    filtersSummaryText.textContent = `Filtros: ${labels.join(" · ")}`;
  }

  function buildRoutineUrl() {
    const items = selected.map((id) => ({
      id,
      ...getExerciseSettings(id),
    }));
    const routine = {
      t: titleInput.value.trim() || "Rutina semanal",
      n: noteInput.value.trim(),
      e: selected,
      items,
    };
    const hash = window.Routines.encode(routine);
    return { routine, url: `${location.origin}${location.pathname.replace(/crear-rutina\.html$/, "index.html")}${hash}` };
  }

  function renderQr(container, text, size) {
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
      correctLevel: window.QRCode.CorrectLevel.M,
    });
  }

  function generateRoutine() {
    const { routine, url } = buildRoutineUrl();
    linkInput.value = url;
    renderQr(qrContainer, url, 180);
    resultBox.hidden = false;

    const panel = document.querySelector("[data-routine-panel]");
    if (panel) {
      panel.scrollTo({ top: panel.scrollHeight, left: 0, behavior: "smooth" });
    }
  }

  function preparePoster() {
    const { routine, url } = buildRoutineUrl();
    posterTitle.textContent = routine.t;
    posterNote.textContent = routine.n || "";
    posterList.innerHTML = routine.items
      .map((entry) => ({ entry, exercise: exercises.find((item) => item.id === entry.id) }))
      .filter(({ exercise }) => Boolean(exercise))
      .map(({ entry, exercise }) => {
        const prescription = formatPrescription(entry);
        return `
          <li>
            <strong>${escapeHtml(exercise.nombre)}</strong>
            ${prescription ? `<span>${escapeHtml(prescription)}</span>` : ""}
          </li>
        `;
      })
      .join("");
    renderQr(posterQr, url, 320);
  }

  function copyRoutineLink() {
    const url = linkInput.value;
    const done = () => {
      const original = copyLinkButton.textContent;
      copyLinkButton.textContent = "¡Copiado!";
      window.setTimeout(() => {
        copyLinkButton.textContent = original;
      }, 1600);
    };

    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(url).then(done).catch(() => fallbackCopy(url, done));
    } else {
      fallbackCopy(url, done);
    }
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

  function countMatchesForDraft() {
    const candidate = { q: state.q, grupo: draftState.grupo, equipamiento: draftState.equipamiento };
    return exercises.filter((exercise) => matchesFiltersWith(exercise, candidate)).length;
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
    const hasDraftFilters = Boolean(draftState.grupo) || Boolean(draftState.equipamiento);
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
    if (!filterPanel || !filterPanelSheet) {
      return;
    }

    draftState.grupo = state.grupo;
    draftState.equipamiento = state.equipamiento;
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
    if (prefersReducedMotion()) {
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
    renderGrid();
    closeFilterPanel();
  }

  function clearFilterPanel() {
    draftState.grupo = "";
    draftState.equipamiento = "";
    expandedAggregateGroups.clear();
    refreshFilterPanelLists();
    updateApplyButtonLabel();
    if (filterPanelClear) {
      filterPanelClear.classList.remove("is-visible");
    }
    applyFilterPanel();
  }

  function resetFilters() {
    state.grupo = "";
    state.equipamiento = "";
    expandedAggregateGroups.clear();
    renderGrid();
  }

  function onFilterPanelKeydown(event) {
    if (event.key === "Escape") {
      event.preventDefault();
      closeFilterPanel();
      return;
    }
    if (event.key !== "Tab" || !filterPanelSheet) {
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
    document.querySelectorAll("[data-exercise-dialog-close]").forEach((element) => {
      element.addEventListener("click", closeExercise);
    });

    if (prevButton) {
      prevButton.addEventListener("click", () => navigate(-1));
    }

    if (nextButton) {
      nextButton.addEventListener("click", () => navigate(1));
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

    generateButton.addEventListener("click", generateRoutine);
    copyLinkButton.addEventListener("click", copyRoutineLink);
    printButton.addEventListener("click", () => {
      preparePoster();
      window.setTimeout(() => window.print(), 150);
    });

    [titleInput, noteInput].forEach((el) => {
      el.addEventListener("input", () => {
        resultBox.hidden = true;
      });
    });
  }

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
      renderSelected();
      document.dispatchEvent(new CustomEvent("routine-builder:ready"));
    })
    .catch((error) => {
      grid.innerHTML = `<p class="exercises-empty">No se ha podido cargar el catálogo de ejercicios.</p>`;
      console.error("[crear-rutina] Error cargando data/exercises.json", error);
      document.dispatchEvent(new CustomEvent("routine-builder:ready"));
    });
})();
