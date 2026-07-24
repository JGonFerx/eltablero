(() => {
  "use strict";

  const grid = document.querySelector("[data-exercises-grid]");
  const countLabel = document.querySelector("[data-exercises-count]");
  const emptyState = document.querySelector("[data-exercises-empty]");
  const searchInput = document.querySelector("[data-exercises-search]");
  const difficultySelect = document.querySelector("[data-exercises-difficulty]");
  const equipmentSelect = document.querySelector("[data-exercises-equipment]");
  const groupsContainer = document.querySelector("[data-exercises-groups]");
  const activeFiltersContainer = document.querySelector("[data-exercises-active]");
  const backToTopButton = document.querySelector("[data-back-to-top]");
  const dialog = document.querySelector("[data-exercise-dialog]");
  const dialogPanel = document.querySelector("[data-exercise-dialog-panel]");
  const dialogContent = document.querySelector("[data-exercise-dialog-content]");
  const prevButton = document.querySelector("[data-exercise-prev]");
  const nextButton = document.querySelector("[data-exercise-next]");
  const navCount = document.querySelector("[data-exercise-nav-count]");
  const favoritesChip = document.querySelector("[data-favorites-chip]");
  const favoritesCountLabel = document.querySelector("[data-favorites-count]");
  const bodyweightChip = document.querySelector("[data-bodyweight-chip]");
  const printFavoritesButton = document.querySelector("[data-print-favorites]");
  const compareBar = document.querySelector("[data-compare-bar]");
  const compareBarText = document.querySelector("[data-compare-bar-text]");
  const compareClearButton = document.querySelector("[data-compare-clear]");
  const compareViewButton = document.querySelector("[data-compare-view]");
  const compareDialog = document.querySelector("[data-compare-dialog]");
  const compareDialogPanel = document.querySelector("[data-compare-dialog-panel]");
  const compareDialogContent = document.querySelector("[data-compare-dialog-content]");

  if (!grid) {
    return;
  }

  let exercises = [];
  let lastFocusedElement = null;
  let searchDebounce = null;
  let currentExercise = null;
  let closeTimer = null;
  let compareSet = [];
  let compareLastFocused = null;

  const state = {
    q: "",
    grupo: "",
    dificultad: "",
    equipamiento: "",
    favoritos: false,
    pesoCorporal: false,
  };

  const FAVORITES_KEY = "eltablero:ejercicios:favoritos";

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

  function saveFavorites() {
    try {
      window.localStorage.setItem(FAVORITES_KEY, JSON.stringify(Array.from(favorites)));
    } catch (error) {
      /* almacenamiento no disponible (navegación privada, cuota, etc.) */
    }
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
    updateFavoritesChip();

    if (state.favoritos) {
      renderGrid();
    }
  }

  function updateFavoritesChip() {
    if (favoritesCountLabel) {
      favoritesCountLabel.textContent = favorites.size;
    }
    if (favoritesChip) {
      favoritesChip.setAttribute("aria-pressed", String(state.favoritos));
    }
  }

  function syncFavoriteButtons(id) {
    document.querySelectorAll(`[data-favorite-toggle="${id}"]`).forEach((button) => {
      button.setAttribute("aria-pressed", String(isFavorite(id)));
    });
  }

  function toggleCompare(id, checkboxEl) {
    const index = compareSet.indexOf(id);

    if (index !== -1) {
      compareSet.splice(index, 1);
    } else {
      if (compareSet.length >= 2) {
        const removedId = compareSet.shift();
        document.querySelectorAll(`[data-compare-toggle="${removedId}"]`).forEach((el) => {
          el.checked = false;
        });
      }
      compareSet.push(id);
    }

    if (checkboxEl) {
      checkboxEl.checked = compareSet.includes(id);
    }
    document.querySelectorAll(`[data-compare-toggle="${id}"]`).forEach((el) => {
      el.checked = compareSet.includes(id);
    });

    updateCompareBar();
  }

  function updateCompareBar() {
    if (!compareBar) {
      return;
    }

    if (compareSet.length === 0) {
      compareBar.hidden = true;
      if (backToTopButton) {
        backToTopButton.classList.remove("is-lifted");
      }
      return;
    }

    compareBar.hidden = false;
    if (backToTopButton) {
      backToTopButton.classList.add("is-lifted");
    }
    compareViewButton.disabled = compareSet.length < 2;
    const names = compareSet
      .map((id) => exercises.find((item) => item.id === id))
      .filter(Boolean)
      .map((item) => item.nombre);

    compareBarText.textContent =
      compareSet.length === 1
        ? `${names[0]} — elige uno más para comparar`
        : `Comparando: ${names.join(" · ")}`;
  }

  function clearCompare() {
    compareSet.forEach((id) => {
      document.querySelectorAll(`[data-compare-toggle="${id}"]`).forEach((el) => {
        el.checked = false;
      });
    });
    compareSet = [];
    updateCompareBar();
  }

  function renderCompareColumn(exercise) {
    const facts = [
      ["Parte del cuerpo", exercise.parteCuerpo],
      ["Categoría", exercise.categoria],
      ["Dificultad", exercise.dificultad],
      ["Mecánica", exercise.mecanica],
      ["Tipo de fuerza", exercise.tipoFuerza],
      ["Equipamiento", exercise.equipamiento[0] || "Peso corporal"],
    ];

    const media = exercise.imagenInicial
      ? `<img src="${escapeHtml(exercise.imagenInicial)}" alt="${escapeHtml(exercise.nombre)}" loading="lazy" decoding="async" width="512" height="512">`
      : `<div class="exercise-detail__media-empty" style="margin:0;">Sin imagen disponible</div>`;

    return `
      <div class="compare-column">
        <p class="exercise-detail__eyebrow">${escapeHtml(exercise.grupoMuscular)}</p>
        <h3>${escapeHtml(exercise.nombre)}</h3>
        <div class="compare-column__media">${media}</div>
        <ul class="exercise-detail__facts compare-column__facts">
          ${facts
            .map(([label, value]) => `<li><span>${escapeHtml(label)}</span><strong>${escapeHtml(value)}</strong></li>`)
            .join("")}
        </ul>
        ${
          exercise.musculosPrincipales.length
            ? `<ul class="exercise-detail__muscle-tags exercise-detail__muscle-tags--primary">${renderList(exercise.musculosPrincipales)}</ul>`
            : ""
        }
        <button type="button" class="compare-column__open" data-compare-open-exercise="${escapeHtml(exercise.id)}">Ver ficha completa →</button>
      </div>
    `;
  }

  function renderComparison() {
    const items = compareSet.map((id) => exercises.find((item) => item.id === id)).filter(Boolean);

    compareDialogContent.innerHTML = `
      <div class="compare-grid">
        ${items.map(renderCompareColumn).join("")}
      </div>
    `;

    initLazyImages(compareDialogContent);
  }

  function openCompare() {
    if (compareSet.length < 2) {
      return;
    }

    compareLastFocused = document.activeElement;
    renderComparison();
    compareDialog.hidden = false;
    document.body.style.overflow = "hidden";
    compareDialogPanel.focus();
    document.addEventListener("keydown", onCompareKeydown);
  }

  function closeCompare() {
    if (compareDialog.hidden) {
      return;
    }

    compareDialog.hidden = true;
    document.body.style.overflow = "";
    document.removeEventListener("keydown", onCompareKeydown);

    if (compareLastFocused) {
      compareLastFocused.focus();
    }
  }

  function onCompareKeydown(event) {
    if (event.key === "Escape") {
      closeCompare();
      return;
    }

    if (event.key !== "Tab") {
      return;
    }

    const focusable = compareDialogPanel.querySelectorAll(
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

  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const HEART_ICON =
    '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M12 20.5s-7.5-4.6-9.8-9.1C.7 8 2.2 4.7 5.4 4c2-.4 3.9.5 5 2.1C11.6 4.5 13.5 3.6 15.5 4c3.2.7 4.7 4 3.2 7.4C16.4 15.9 12 20.5 12 20.5Z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"></path></svg>';

  const escapeHtml = (value) =>
    String(value).replace(/[&<>"']/g, (char) => (
      { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[char]
    ));

  const normalize = (value) =>
    value
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");

  function chipLabel(text, count) {
    return `${escapeHtml(text)} <span class="exercises-chip__count">${count}</span>`;
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

  function populateFilters(payload) {
    const allChip = groupsContainer.querySelector('[data-group-chip=""]');
    allChip.innerHTML = chipLabel("Todos", exercises.length);

    payload.grupos.forEach((group) => {
      const count = exercises.filter((exercise) => exercise.gruposMusculares.includes(group)).length;
      const chip = document.createElement("button");
      chip.type = "button";
      chip.className = "exercises-chip";
      chip.dataset.groupChip = group;
      chip.innerHTML = chipLabel(group, count);
      groupsContainer.appendChild(chip);
    });

    const difficulties = Array.from(new Set(exercises.map((exercise) => exercise.dificultad))).sort();
    difficulties.forEach((difficulty) => {
      const option = document.createElement("option");
      option.value = difficulty;
      option.textContent = difficulty;
      difficultySelect.appendChild(option);
    });

    const equipmentSet = new Set();
    exercises.forEach((exercise) => exercise.equipamiento.forEach((item) => equipmentSet.add(item)));
    Array.from(equipmentSet)
      .sort((a, b) => a.localeCompare(b, "es"))
      .forEach((item) => {
        const option = document.createElement("option");
        option.value = item;
        option.textContent = item;
        equipmentSelect.appendChild(option);
      });
  }

  function matchesFilters(exercise) {
    if (state.favoritos && !isFavorite(exercise.id)) {
      return false;
    }

    if (state.pesoCorporal && !exercise.esPesoCorporal) {
      return false;
    }

    if (state.grupo && !exercise.gruposMusculares.includes(state.grupo)) {
      return false;
    }

    if (state.dificultad && exercise.dificultad !== state.dificultad) {
      return false;
    }

    if (state.equipamiento && !exercise.equipamiento.includes(state.equipamiento)) {
      return false;
    }

    if (state.q) {
      const haystack = normalize(`${exercise.nombre} ${exercise.nombreAlternativo || ""}`);
      if (!haystack.includes(normalize(state.q))) {
        return false;
      }
    }

    return true;
  }

  function renderCard(exercise) {
    const card = document.createElement("div");
    card.className = "exercise-card";
    card.dataset.exerciseId = exercise.id;

    const media = exercise.imagenInicial
      ? `<img src="${escapeHtml(exercise.imagenInicial)}" alt="" loading="lazy" decoding="async" width="512" height="512">`
      : `<div class="exercise-card__media--empty">Sin imagen disponible</div>`;

    card.innerHTML = `
      <button type="button" class="exercise-card__open" aria-haspopup="dialog">
        <span class="exercise-card__media">
          ${media}
          <span class="exercise-card__difficulty">${escapeHtml(exercise.dificultad)}</span>
        </span>
        <span class="exercise-card__body">
          <span class="exercise-card__group">${escapeHtml(exercise.grupoMuscular)}</span>
          <span class="exercise-card__name" role="heading" aria-level="2">${escapeHtml(exercise.nombre)}</span>
          <span class="exercise-card__footer">
            <span class="exercise-card__meta">${escapeHtml(exercise.equipamiento[0] || "Peso corporal")}</span>
            <span class="exercise-card__cta">Ver ficha →</span>
          </span>
        </span>
      </button>
      <button type="button" class="exercise-card__favorite" data-favorite-toggle="${escapeHtml(exercise.id)}" aria-pressed="${isFavorite(exercise.id)}" aria-label="Guardar ${escapeHtml(exercise.nombre)} en favoritos">
        ${HEART_ICON}
      </button>
      <label class="exercise-card__compare-row">
        <input type="checkbox" data-compare-toggle="${escapeHtml(exercise.id)}" ${compareSet.includes(exercise.id) ? "checked" : ""}>
        Comparar
      </label>
    `;

    card
      .querySelector(".exercise-card__open")
      .addEventListener("click", (event) => openExercise(exercise, true, event));
    card.querySelector(".exercise-card__favorite").addEventListener("click", () => toggleFavorite(exercise.id));
    card
      .querySelector("[data-compare-toggle]")
      .addEventListener("change", (event) => toggleCompare(exercise.id, event.target));

    return card;
  }

  function activeFilterDescriptors() {
    const items = [];
    if (state.favoritos) {
      items.push({ key: "favoritos", label: "Favoritos" });
    }
    if (state.pesoCorporal) {
      items.push({ key: "pesoCorporal", label: "Sin material" });
    }
    if (state.q) {
      items.push({ key: "q", label: `“${state.q}”` });
    }
    if (state.grupo) {
      items.push({ key: "grupo", label: state.grupo });
    }
    if (state.dificultad) {
      items.push({ key: "dificultad", label: state.dificultad });
    }
    if (state.equipamiento) {
      items.push({ key: "equipamiento", label: state.equipamiento });
    }
    return items;
  }

  function clearFilter(key) {
    if (key === "favoritos") {
      state.favoritos = false;
      updateFavoritesChip();
    } else if (key === "pesoCorporal") {
      state.pesoCorporal = false;
      if (bodyweightChip) {
        bodyweightChip.setAttribute("aria-pressed", "false");
      }
    } else if (key === "q") {
      state.q = "";
      searchInput.value = "";
    } else if (key === "grupo") {
      state.grupo = "";
      groupsContainer.querySelectorAll(".exercises-chip").forEach((el) => {
        el.classList.toggle("is-active", el.dataset.groupChip === "");
      });
    } else if (key === "dificultad") {
      state.dificultad = "";
      difficultySelect.value = "";
    } else if (key === "equipamiento") {
      state.equipamiento = "";
      equipmentSelect.value = "";
    }
    renderGrid();
  }

  function clearAllFilters() {
    state.q = "";
    state.grupo = "";
    state.dificultad = "";
    state.equipamiento = "";
    state.favoritos = false;
    state.pesoCorporal = false;
    searchInput.value = "";
    difficultySelect.value = "";
    equipmentSelect.value = "";
    groupsContainer.querySelectorAll(".exercises-chip").forEach((el) => {
      el.classList.toggle("is-active", el.dataset.groupChip === "");
    });
    if (bodyweightChip) {
      bodyweightChip.setAttribute("aria-pressed", "false");
    }
    updateFavoritesChip();
    renderGrid();
  }

  function renderActiveFilters() {
    const items = activeFilterDescriptors();

    if (items.length === 0) {
      activeFiltersContainer.hidden = true;
      activeFiltersContainer.innerHTML = "";
      return;
    }

    activeFiltersContainer.hidden = false;
    activeFiltersContainer.innerHTML =
      items
        .map(
          (item) => `
            <span class="exercises-active-filter" data-filter-key="${item.key}">
              ${escapeHtml(item.label)}
              <button type="button" aria-label="Quitar filtro ${escapeHtml(item.label)}" data-remove-filter="${item.key}">×</button>
            </span>
          `
        )
        .join("") +
      `<button type="button" class="exercises-clear-filters" data-clear-filters>Limpiar filtros</button>`;
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
        ? `${exercises.length} ejercicios`
        : `${filtered.length} de ${exercises.length} ejercicios`;

    if (printFavoritesButton) {
      printFavoritesButton.hidden = !(state.favoritos && filtered.length > 0);
    }

    renderActiveFilters();
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

  function getSimilarExercises(exercise, limit) {
    return exercises
      .filter((item) => item.id !== exercise.id)
      .filter((item) => item.gruposMusculares.some((group) => exercise.gruposMusculares.includes(group)))
      .slice(0, limit);
  }

  function renderSimilar(exercise) {
    const similar = getSimilarExercises(exercise, 4);

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
      <div class="exercise-detail__similar">
        <h3>Ejercicios similares</h3>
        <div class="exercise-detail__similar-grid">${cards}</div>
      </div>
    `;
  }

  function renderExerciseDetail(exercise) {
    const facts = [
      ["Parte del cuerpo", exercise.parteCuerpo],
      ["Categoría", exercise.categoria],
      ["Dificultad", exercise.dificultad],
      ["Mecánica", exercise.mecanica],
      ["Tipo de fuerza", exercise.tipoFuerza],
      ["Equipamiento", exercise.equipamiento[0] || "Peso corporal"],
    ];

    dialogContent.innerHTML = `
      <div class="exercise-detail__header">
        <p class="exercise-detail__eyebrow">${escapeHtml(exercise.grupoMuscular)}</p>
        <h2 id="exercise-dialog-title">${escapeHtml(exercise.nombre)}</h2>
        ${exercise.nombreAlternativo ? `<p class="exercise-detail__alt-name">${escapeHtml(exercise.nombreAlternativo)}</p>` : ""}
      </div>
      <div class="exercise-detail__body">
        <div class="exercise-detail__media-col">
          <button type="button" class="exercise-detail__favorite" data-favorite-toggle="${escapeHtml(exercise.id)}" aria-pressed="${isFavorite(exercise.id)}" aria-label="Guardar ${escapeHtml(exercise.nombre)} en favoritos">
            ${HEART_ICON}
          </button>
          <button type="button" class="exercise-detail__share" data-copy-link="${escapeHtml(exercise.id)}">
            <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="6" cy="12" r="2.6" stroke="currentColor" stroke-width="1.8"></circle><circle cx="17" cy="6" r="2.6" stroke="currentColor" stroke-width="1.8"></circle><circle cx="17" cy="18" r="2.6" stroke="currentColor" stroke-width="1.8"></circle><path d="m8.3 10.8 6.4-3.6M8.3 13.2l6.4 3.6" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"></path></svg>
            <span data-copy-link-label>Copiar enlace</span>
          </button>
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
      ${renderSimilar(exercise)}
    `;

    initLazyImages(dialogContent);
  }

  function getFilteredList() {
    return exercises.filter(matchesFilters);
  }

  function updateNavControls(exercise) {
    if (!prevButton || !nextButton) {
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

  function copyExerciseLink(button) {
    const id = button.dataset.copyLink;
    const url = `${location.origin}${location.pathname}#ejercicio/${id}`;
    const label = button.querySelector("[data-copy-link-label]");

    const showCopied = () => {
      button.classList.add("is-copied");
      if (label) {
        label.textContent = "¡Enlace copiado!";
      }
      window.clearTimeout(button._copyResetTimer);
      button._copyResetTimer = window.setTimeout(() => {
        button.classList.remove("is-copied");
        if (label) {
          label.textContent = "Copiar enlace";
        }
      }, 1800);
    };

    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(url).then(showCopied).catch(() => fallbackCopy(url, showCopied));
    } else {
      fallbackCopy(url, showCopied);
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

  function showExercise(exercise, updateHash) {
    currentExercise = exercise;
    renderExerciseDetail(exercise);
    dialogPanel.scrollTop = 0;
    updateNavControls(exercise);

    if (updateHash) {
      history.pushState({ exercise: exercise.id }, "", `#ejercicio/${exercise.id}`);
    }
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

    showExercise(list[nextIndex], true);
  }

  function setDialogOrigin(originEvent) {
    if (!originEvent || typeof originEvent.clientX !== "number") {
      dialogPanel.style.removeProperty("--dialog-origin-x");
      dialogPanel.style.removeProperty("--dialog-origin-y");
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

  function openExercise(exercise, updateHash, originEvent) {
    window.clearTimeout(closeTimer);
    lastFocusedElement = document.activeElement;
    showExercise(exercise, updateHash);
    dialog.hidden = false;
    dialog.classList.remove("is-visible");
    setDialogOrigin(originEvent);
    document.body.style.overflow = "hidden";
    if (backToTopButton) {
      backToTopButton.classList.remove("is-visible");
    }
    dialogPanel.focus();

    document.addEventListener("keydown", onDialogKeydown);

    requestAnimationFrame(() => {
      dialog.classList.add("is-visible");
    });
  }

  function closeExercise(updateHash) {
    if (dialog.hidden || closeTimer) {
      return;
    }

    dialog.classList.remove("is-visible");
    currentExercise = null;
    document.removeEventListener("keydown", onDialogKeydown);
    if (backToTopButton) {
      backToTopButton.classList.toggle("is-visible", window.scrollY > 640);
    }

    if (updateHash && location.hash.startsWith("#ejercicio/")) {
      history.pushState({}, "", location.pathname);
    }

    closeTimer = window.setTimeout(
      () => {
        dialog.hidden = true;
        document.body.style.overflow = "";
        closeTimer = null;
      },
      prefersReducedMotion ? 0 : 300
    );

    if (lastFocusedElement) {
      lastFocusedElement.focus();
    }
  }

  function onDialogKeydown(event) {
    if (event.key === "Escape") {
      closeExercise(true);
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

    if (event.key !== "Tab") {
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

  function openFromHash() {
    const match = location.hash.match(/^#ejercicio\/(.+)$/);
    if (!match) {
      closeExercise(false);
      return;
    }

    const exercise = exercises.find((item) => item.id === match[1]);
    if (exercise) {
      openExercise(exercise, false);
    }
  }

  function bindBackToTop() {
    if (!backToTopButton) {
      return;
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

  function bindEvents() {
    document.querySelectorAll("[data-exercise-dialog-close]").forEach((element) => {
      element.addEventListener("click", () => closeExercise(true));
    });

    if (prevButton) {
      prevButton.addEventListener("click", () => navigate(-1));
    }

    if (nextButton) {
      nextButton.addEventListener("click", () => navigate(1));
    }

    dialogContent.addEventListener("click", (event) => {
      const favoriteButton = event.target.closest("[data-favorite-toggle]");
      if (favoriteButton) {
        toggleFavorite(favoriteButton.dataset.favoriteToggle);
        return;
      }

      const similarCard = event.target.closest("[data-similar-id]");
      if (similarCard) {
        const exercise = exercises.find((item) => item.id === similarCard.dataset.similarId);
        if (exercise) {
          showExercise(exercise, true);
        }
        return;
      }

      const shareButton = event.target.closest("[data-copy-link]");
      if (shareButton) {
        copyExerciseLink(shareButton);
      }
    });

    if (favoritesChip) {
      favoritesChip.addEventListener("click", () => {
        state.favoritos = !state.favoritos;
        updateFavoritesChip();
        renderGrid();
      });
    }

    if (bodyweightChip) {
      bodyweightChip.addEventListener("click", () => {
        state.pesoCorporal = !state.pesoCorporal;
        bodyweightChip.setAttribute("aria-pressed", String(state.pesoCorporal));
        renderGrid();
      });
    }

    if (printFavoritesButton) {
      printFavoritesButton.addEventListener("click", () => {
        window.print();
      });
    }

    if (compareClearButton) {
      compareClearButton.addEventListener("click", clearCompare);
    }

    if (compareViewButton) {
      compareViewButton.addEventListener("click", openCompare);
    }

    document.querySelectorAll("[data-compare-dialog-close]").forEach((element) => {
      element.addEventListener("click", closeCompare);
    });

    if (compareDialogContent) {
      compareDialogContent.addEventListener("click", (event) => {
        const openButton = event.target.closest("[data-compare-open-exercise]");
        if (!openButton) {
          return;
        }
        const exercise = exercises.find((item) => item.id === openButton.dataset.compareOpenExercise);
        if (exercise) {
          closeCompare();
          openExercise(exercise, true);
        }
      });
    }

    searchInput.addEventListener("input", () => {
      window.clearTimeout(searchDebounce);
      searchDebounce = window.setTimeout(() => {
        state.q = searchInput.value.trim();
        renderGrid();
      }, 130);
    });

    difficultySelect.addEventListener("change", () => {
      state.dificultad = difficultySelect.value;
      renderGrid();
    });

    equipmentSelect.addEventListener("change", () => {
      state.equipamiento = equipmentSelect.value;
      renderGrid();
    });

    groupsContainer.addEventListener("click", (event) => {
      const chip = event.target.closest("[data-group-chip]");
      if (!chip) {
        return;
      }

      state.grupo = chip.dataset.groupChip;
      groupsContainer.querySelectorAll(".exercises-chip").forEach((el) => {
        el.classList.toggle("is-active", el === chip);
      });
      renderGrid();
    });

    activeFiltersContainer.addEventListener("click", (event) => {
      const removeButton = event.target.closest("[data-remove-filter]");
      if (removeButton) {
        clearFilter(removeButton.dataset.removeFilter);
        return;
      }
      if (event.target.closest("[data-clear-filters]")) {
        clearAllFilters();
      }
    });

    window.addEventListener("hashchange", openFromHash);
    window.addEventListener("popstate", openFromHash);
    window.addEventListener("resize", updateHeaderHeightVar);

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
      updateFavoritesChip();
      renderGrid();
      openFromHash();
      updateHeaderHeightVar();
    })
    .catch((error) => {
      grid.innerHTML = `<p class="exercises-empty">No se ha podido cargar el catálogo de ejercicios. Inténtalo de nuevo más tarde.</p>`;
      console.error("[ejercicios] Error cargando data/exercises.json", error);
    });
})();
