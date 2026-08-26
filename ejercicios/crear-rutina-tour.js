(() => {
  "use strict";

  const DISMISSED_KEY = "eltablero:crear-rutina:tour-dismissed";

  const STEPS = [
    {
      selector: ".exercises-intro__inner",
      placement: "center",
      title: "Crea una rutina en un minuto",
      text: "Elige ejercicios del catálogo, ordénalos y comparte la rutina con un enlace o un código QR. Esta guía rápida te muestra cómo.",
    },
    {
      selector: ".routine-builder__search",
      placement: "bottom",
      title: "Busca ejercicios",
      text: "Escribe un nombre o usa los filtros de grupo muscular, justo debajo, para encontrar lo que buscas.",
    },
    {
      selector: "[data-builder-grid] .routine-builder__card",
      placement: "top",
      title: "Añade ejercicios a la rutina",
      text: "Pulsa «Añadir» en cualquier tarjeta. El orden en que los vayas añadiendo será el orden final de la rutina.",
    },
    {
      selector: ".routine-builder__selected",
      placement: "right",
      title: "Revisa y reordena",
      text: "Los ejercicios elegidos aparecen aquí. Usa las flechas ↑ ↓ para cambiar el orden, o la × para quitar alguno.",
    },
    {
      selector: ".routine-builder__field",
      placement: "right",
      title: "Ponle nombre a la rutina",
      text: "Escribe un título, por ejemplo «Piernas — Lunes», y si quieres, una nota para quien la reciba.",
    },
    {
      selector: "[data-generate-routine]",
      placement: "right",
      title: "Genera el enlace y el QR",
      text: "Cuando la rutina esté lista, pulsa aquí. Podrás copiar el enlace, compartirlo o imprimirlo como «rutina del día».",
    },
    {
      selector: "[data-tour-restart]",
      placement: "bottom",
      title: "¿Necesitas verla otra vez?",
      text: "Pulsa este botón cuando quieras para repetir la guía desde el principio.",
    },
  ];

  let overlayBuilt = false;
  let backdrop, spot, popup, stepLabel, titleEl, textEl, dismissCheckbox, prevBtn, nextBtn, closeBtn;
  let currentIndex = 0;
  let active = false;
  let repositionHandler = null;
  let previousFocus = null;


  function currentTarget() {
    const step = STEPS[currentIndex];
    return step.placement !== "center" ? document.querySelector(step.selector) : null;
  }

  function buildOverlay() {
    if (overlayBuilt) {
      return;
    }
    overlayBuilt = true;

    backdrop = document.createElement("div");
    backdrop.className = "tour-backdrop";
    backdrop.hidden = true;

    spot = document.createElement("div");
    spot.className = "tour-spot";

    popup = document.createElement("div");
    popup.className = "tour-popup";
    popup.setAttribute("role", "dialog");
    popup.setAttribute("aria-modal", "true");
    popup.setAttribute("aria-labelledby", "tour-popup-title");
    popup.innerHTML = `
      <button type="button" class="tour-popup__close" data-tour-close aria-label="Cerrar guía">×</button>
      <p class="tour-popup__step" data-tour-step></p>
      <h2 class="tour-popup__title" id="tour-popup-title" data-tour-title></h2>
      <p class="tour-popup__text" data-tour-text></p>
      <div class="tour-popup__footer">
        <label class="tour-popup__dismiss">
          <input type="checkbox" data-tour-dismiss-checkbox>
          No volver a mostrar
        </label>
        <div class="tour-popup__nav">
          <button type="button" class="tour-popup__prev" data-tour-prev>Anterior</button>
          <button type="button" class="tour-popup__next" data-tour-next>Siguiente</button>
        </div>
      </div>
    `;

    backdrop.appendChild(spot);
    backdrop.appendChild(popup);
    document.body.appendChild(backdrop);

    stepLabel = popup.querySelector("[data-tour-step]");
    titleEl = popup.querySelector("[data-tour-title]");
    textEl = popup.querySelector("[data-tour-text]");
    dismissCheckbox = popup.querySelector("[data-tour-dismiss-checkbox]");
    prevBtn = popup.querySelector("[data-tour-prev]");
    nextBtn = popup.querySelector("[data-tour-next]");
    closeBtn = popup.querySelector("[data-tour-close]");

    closeBtn.addEventListener("click", endTour);
    prevBtn.addEventListener("click", () => goTo(currentIndex - 1, -1));
    nextBtn.addEventListener("click", () => {
      if (currentIndex === STEPS.length - 1) {
        endTour();
      } else {
        goTo(currentIndex + 1, 1);
      }
    });

    document.addEventListener("keydown", (event) => {
      if (!active) {
        return;
      }
      if (event.key === "Escape") {
        event.preventDefault();
        endTour();
      } else if (event.key === "ArrowRight") {
        nextBtn.click();
      } else if (event.key === "ArrowLeft" && !prevBtn.disabled) {
        prevBtn.click();
      } else if (event.key === "Tab") {
        trapFocus(event);
      }
    });
  }

  function trapFocus(event) {
    const focusable = popup.querySelectorAll("button, input");
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

  function goTo(requestedIndex, direction) {
    let index = requestedIndex;
    while (index >= 0 && index < STEPS.length) {
      const step = STEPS[index];
      if (step.placement === "center" || document.querySelector(step.selector)) {
        currentIndex = index;
        renderStep();
        return;
      }
      index += direction;
    }
    endTour();
  }

  function renderStep() {
    const step = STEPS[currentIndex];
    stepLabel.textContent = `Paso ${currentIndex + 1} de ${STEPS.length}`;
    titleEl.textContent = step.title;
    textEl.textContent = step.text;
    prevBtn.disabled = currentIndex === 0;
    nextBtn.textContent = currentIndex === STEPS.length - 1 ? "Entendido" : "Siguiente";

    const target = currentTarget();
    if (target) {
      target.scrollIntoView({
        block: "center",
        inline: "nearest",
        behavior: "smooth",
      });
    }

    const delay = target ? 340 : 0;
    window.setTimeout(() => positionAt(step, target), delay);
  }

  function positionAt(step, target) {
    if (!target) {
      popup.style.transform = "translate(-50%, -50%)";
      popup.style.top = "50%";
      popup.style.left = "50%";
      const popupRect = popup.getBoundingClientRect();
      const pad = 10;
      spot.style.top = `${popupRect.top - pad}px`;
      spot.style.left = `${popupRect.left - pad}px`;
      spot.style.width = `${popupRect.width + pad * 2}px`;
      spot.style.height = `${popupRect.height + pad * 2}px`;
      return;
    }

    const rect = target.getBoundingClientRect();
    const pad = 8;
    spot.style.top = `${rect.top - pad}px`;
    spot.style.left = `${rect.left - pad}px`;
    spot.style.width = `${rect.width + pad * 2}px`;
    spot.style.height = `${rect.height + pad * 2}px`;

    popup.style.transform = "none";
    const popupWidth = popup.offsetWidth || 320;
    const popupHeight = popup.offsetHeight || 180;
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

    popup.style.top = `${top}px`;
    popup.style.left = `${left}px`;
  }

  function startTour() {
    buildOverlay();
    previousFocus = document.activeElement;
    active = true;
    backdrop.hidden = false;
    dismissCheckbox.checked = false;
    goTo(0, 1);
    window.setTimeout(() => nextBtn.focus(), 60);

    repositionHandler = () => {
      if (active) {
        positionAt(STEPS[currentIndex], currentTarget());
      }
    };
    window.addEventListener("resize", repositionHandler);
    window.addEventListener("scroll", repositionHandler, true);
  }

  function endTour() {
    if (!active) {
      return;
    }
    active = false;
    backdrop.hidden = true;
    if (dismissCheckbox.checked) {
      window.localStorage.setItem(DISMISSED_KEY, "1");
    }
    window.removeEventListener("resize", repositionHandler);
    window.removeEventListener("scroll", repositionHandler, true);
    repositionHandler = null;

    if (previousFocus && document.contains(previousFocus)) {
      previousFocus.focus();
    }
  }

  function maybeAutoStart() {
    if (window.localStorage.getItem(DISMISSED_KEY) === "1") {
      return;
    }
    startTour();
  }

  document.addEventListener("routine-builder:ready", maybeAutoStart, { once: true });

  document.addEventListener("click", (event) => {
    if (event.target.closest("[data-tour-restart]")) {
      startTour();
    }
  });
})();
