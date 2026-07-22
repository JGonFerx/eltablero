(function () {
  const hero = document.querySelector(".hero--immersive");
  const siteHeader = document.querySelector("[data-site-header]");

  if (!hero || !siteHeader) {
    return;
  }

  const glowLayers = {
    brand: hero.querySelector('[data-glow-layer="brand"]'),
    padel: hero.querySelector('[data-glow-layer="padel"]'),
    fitness: hero.querySelector('[data-glow-layer="fitness"]')
  };
  const media = hero.querySelector(".hero__media");
  const heroImage = hero.querySelector(".hero__image");
  const hotspotLayer = hero.querySelector(".hero__hotspot-layer");

  if (!glowLayers.brand || !glowLayers.padel || !glowLayers.fitness || !media || !heroImage || !hotspotLayer) {
    return;
  }

  const supportsHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  const zoneElements = [hero, siteHeader];
  let keyboardMode = false;
  let pointerState = null;
  let focusState = null;

  const isNode = (value) => value instanceof Node;
  const isWithinZone = (value) =>
    isNode(value) && zoneElements.some((zoneElement) => zoneElement.contains(value));

  const getTriggerElement = (value) => {
    if (!(value instanceof Element)) {
      return null;
    }

    const trigger = value.closest("[data-hero-glow]");
    if (!trigger || !isWithinZone(trigger)) {
      return null;
    }

    return trigger;
  };

  const getTriggerState = (value) => getTriggerElement(value)?.dataset.heroGlow || null;

  const parseObjectPositionValue = (value, axis) => {
    const normalized = value.trim().toLowerCase();

    if (normalized.endsWith("%")) {
      return Number.parseFloat(normalized) / 100;
    }

    if (axis === "x") {
      if (normalized === "left") return 0;
      if (normalized === "center") return 0.5;
      if (normalized === "right") return 1;
    } else {
      if (normalized === "top") return 0;
      if (normalized === "center") return 0.5;
      if (normalized === "bottom") return 1;
    }

    return 0.5;
  };

  const updateHotspotLayout = () => {
    const mediaRect = media.getBoundingClientRect();
    const naturalWidth = heroImage.naturalWidth || 1646;
    const naturalHeight = heroImage.naturalHeight || 956;

    if (!mediaRect.width || !mediaRect.height || !naturalWidth || !naturalHeight) {
      return;
    }

    const imageStyles = window.getComputedStyle(heroImage);
    const objectPosition = imageStyles.objectPosition.split(/\s+/);
    const posX = parseObjectPositionValue(objectPosition[0] || "50%", "x");
    const posY = parseObjectPositionValue(objectPosition[1] || objectPosition[0] || "50%", "y");
    const scale = Math.max(mediaRect.width / naturalWidth, mediaRect.height / naturalHeight);
    const renderedWidth = naturalWidth * scale;
    const renderedHeight = naturalHeight * scale;
    const offsetX = (mediaRect.width - renderedWidth) * posX;
    const offsetY = (mediaRect.height - renderedHeight) * posY;

    hotspotLayer.style.left = `${offsetX}px`;
    hotspotLayer.style.top = `${offsetY}px`;
    hotspotLayer.style.width = `${renderedWidth}px`;
    hotspotLayer.style.height = `${renderedHeight}px`;
  };

  const setGlowState = (state) => {
    const nextState = state || null;
    hero.dataset.glowState = nextState || "none";

    Object.entries(glowLayers).forEach(([name, layer]) => {
      layer.classList.toggle("is-active", name === nextState);
    });
  };

  const refreshGlowState = () => {
    if (keyboardMode && focusState) {
      setGlowState(focusState);
      return;
    }

    if (pointerState) {
      setGlowState(pointerState);
      return;
    }

    setGlowState(null);
  };

  document.addEventListener(
    "keydown",
    (event) => {
      if (event.metaKey || event.ctrlKey || event.altKey) {
        return;
      }

      keyboardMode = true;
    },
    true
  );

  document.addEventListener(
    "pointerdown",
    () => {
      keyboardMode = false;
    },
    true
  );

  if (supportsHover) {
    document.addEventListener(
      "pointerenter",
      (event) => {
        const nextState = getTriggerState(event.target);
        if (!nextState) {
          return;
        }

        pointerState = nextState;
        refreshGlowState();
      },
      true
    );

    document.addEventListener(
      "pointerleave",
      (event) => {
        const trigger = getTriggerElement(event.target);
        if (!trigger) {
          return;
        }

        const nextState = getTriggerState(event.relatedTarget);
        if (nextState) {
          pointerState = nextState;
          refreshGlowState();
          return;
        }

        if (isWithinZone(event.relatedTarget)) {
          pointerState = null;
          refreshGlowState();
          return;
        }

        pointerState = null;
        refreshGlowState();
      },
      true
    );
  }

  document.addEventListener(
    "focusin",
    (event) => {
      if (!isWithinZone(event.target)) {
        return;
      }

      const nextState = getTriggerState(event.target);

      if (nextState) {
        if (supportsHover || keyboardMode) {
          focusState = nextState;
          refreshGlowState();
        }

        return;
      }

      if (keyboardMode) {
        focusState = null;
        refreshGlowState();
      }
    },
    true
  );

  document.addEventListener(
    "focusout",
    (event) => {
      if (!isWithinZone(event.target)) {
        return;
      }

      if (isWithinZone(event.relatedTarget)) {
        return;
      }

      focusState = null;
      refreshGlowState();
    },
    true
  );

  window.addEventListener("blur", () => {
    focusState = null;
    refreshGlowState();
  });

  if ("ResizeObserver" in window) {
    const resizeObserver = new ResizeObserver(() => {
      updateHotspotLayout();
    });

    resizeObserver.observe(media);
  } else {
    window.addEventListener("resize", updateHotspotLayout, { passive: true });
  }

  if (heroImage.complete) {
    updateHotspotLayout();
  } else {
    heroImage.addEventListener("load", updateHotspotLayout, { once: true });
  }

  setGlowState(null);
})();
