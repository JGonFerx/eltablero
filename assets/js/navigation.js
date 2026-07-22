(function () {
  const menu = document.querySelector("[data-mobile-menu]");
  const openButton = document.querySelector("[data-menu-open]");
  const closeButton = document.querySelector("[data-menu-close]");
  const backdrop = document.querySelector("[data-menu-backdrop]");
  const accordions = document.querySelectorAll("[data-mobile-accordion]");
  const dropdowns = document.querySelectorAll("[data-dropdown]");
  const config = window.siteConfig || {};
  let lastFocused = null;

  if (menu && !menu.querySelector(".mobile-menu__contact")) {
    const panel = menu.querySelector(".mobile-menu__panel");
    const phone = config.phone || "698 182 542";
    const phoneHref = `tel:${phone.replace(/\s+/g, "")}`;
    const whatsappHref = config.whatsapp || `https://wa.me/${phone.replace(/[^\d]/g, "")}`;

    panel?.insertAdjacentHTML(
      "beforeend",
      `<div class="mobile-menu__contact">
        <p>¿Prefieres hablar?</p>
        <div class="mobile-menu__contact-row">
          <a class="mobile-menu__phone" href="${phoneHref}" aria-label="Llamar al ${phone}">${phone}</a>
          <a class="mobile-menu__whatsapp" href="${whatsappHref}" target="_blank" rel="noopener noreferrer" aria-label="Abrir WhatsApp de El Tablero Sport Club"></a>
        </div>
      </div>`
    );
  }

  function setDropdownState(dropdown, expanded) {
    dropdown.classList.toggle("is-open", expanded);
    const trigger = dropdown.querySelector("[data-dropdown-button]");
    if (trigger && trigger.tagName === "BUTTON") {
      trigger.setAttribute("aria-expanded", String(expanded));
    }
  }

  function closeDropdowns() {
    dropdowns.forEach((dropdown) => {
      setDropdownState(dropdown, false);
    });
  }

  function getFocusable(container) {
    return container.querySelectorAll(
      'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'
    );
  }

  function openMenu() {
    if (!menu) {
      return;
    }

    lastFocused = document.activeElement;
    menu.hidden = false;
    document.body.classList.add("menu-open");
    openButton.setAttribute("aria-expanded", "true");

    const focusable = getFocusable(menu);
    if (focusable.length) {
      focusable[0].focus();
    }
  }

  function closeMenu() {
    if (!menu) {
      return;
    }

    menu.hidden = true;
    document.body.classList.remove("menu-open");
    openButton.setAttribute("aria-expanded", "false");

    if (lastFocused) {
      lastFocused.focus();
    }
  }

  if (openButton && closeButton && menu && backdrop) {
    openButton.addEventListener("click", openMenu);
    closeButton.addEventListener("click", closeMenu);
    backdrop.addEventListener("click", closeMenu);

    menu.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        closeMenu();
        return;
      }

      if (event.key !== "Tab") {
        return;
      }

      const focusable = Array.from(getFocusable(menu));
      if (!focusable.length) {
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
    });
  }

  accordions.forEach((accordion) => {
    const button = accordion.querySelector("[data-accordion-button]");
    const panel = accordion.querySelector("[data-accordion-panel]");

    if (!button || !panel) {
      return;
    }

    button.addEventListener("click", (event) => {
      const expanded = button.getAttribute("aria-expanded") === "true";
      button.setAttribute("aria-expanded", String(!expanded));
      panel.hidden = expanded;

      if (event.detail > 0) {
        button.blur();
      }
    });
  });

  dropdowns.forEach((dropdown) => {
    const button = dropdown.querySelector("[data-dropdown-button]");
    const currentItem = dropdown.querySelector('.nav-dropdown__panel [aria-current="page"]');

    if (!button) {
      return;
    }

    if (currentItem) {
      dropdown.classList.add("has-current");
    }

    if (button.tagName !== "BUTTON") {
      button.addEventListener("click", () => {
        closeDropdowns();
        button.blur();
      });
      return;
    }

    dropdown.addEventListener("mouseenter", () => {
      setDropdownState(dropdown, true);
    });

    dropdown.addEventListener("mouseleave", () => {
      setDropdownState(dropdown, false);
    });

    dropdown.addEventListener("focusin", () => {
      setDropdownState(dropdown, true);
    });

    dropdown.addEventListener("focusout", (event) => {
      if (!dropdown.contains(event.relatedTarget)) {
        setDropdownState(dropdown, false);
      }
    });

    button.addEventListener("click", (event) => {
      event.preventDefault();

      if (event.detail > 0) {
        button.blur();
        setDropdownState(dropdown, false);
      }
    });
  });

  document.addEventListener("click", (event) => {
    dropdowns.forEach((dropdown) => {
      if (!dropdown.contains(event.target)) {
        closeDropdowns();
      }
    });
  });

  document.addEventListener("keydown", (event) => {
    if (event.key !== "Escape") {
      return;
    }

    closeDropdowns();
  });
})();
