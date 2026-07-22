(function () {
  const hero = document.querySelector(".hero--immersive");
  const supportsHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const openDelay = 2500;

  const previews = [
    {
      hotspot: document.querySelector(".hotspot--fitness"),
      preview: document.querySelector("[data-fitness-preview]"),
      closeSelector: "[data-fitness-preview-close]"
    },
    {
      hotspot: document.querySelector(".hotspot--padel"),
      preview: document.querySelector("[data-padel-preview]"),
      closeSelector: "[data-padel-preview-close]"
    },
    {
      hotspot: document.querySelector(".hotspot--crossfit"),
      preview: document.querySelector("[data-crossfit-preview]"),
      closeSelector: "[data-crossfit-preview-close]"
    },
    {
      hotspot: document.querySelector(".hotspot--hybrid"),
      preview: document.querySelector("[data-hybrid-preview]"),
      closeSelector: "[data-hybrid-preview-close]"
    }
  ].filter((item) => item.hotspot && item.preview);

  if (!previews.length) {
    return;
  }

  const state = new Map();
  const isPreviewEnabled = () => hero?.dataset.previewMode !== "glow-only";
  const unloadVideo = (video) => {
    if (!video) {
      return;
    }

    video.pause();
    video.currentTime = 0;
    video.removeAttribute("src");
    video.load();
  };

  const closeAllPreviews = () => {
    previews.forEach(({ hotspot, preview }) => {
      const itemState = state.get(hotspot);
      if (!itemState) {
        return;
      }

      if (itemState.hoverTimer) {
        window.clearTimeout(itemState.hoverTimer);
        itemState.hoverTimer = null;
      }

      hotspot.classList.remove("is-arming");

      if (!itemState.isOpen) {
        return;
      }

      itemState.isOpen = false;
      preview.classList.remove("is-open");

      unloadVideo(itemState.video);

      if (reduceMotion) {
        preview.hidden = true;
      } else {
        window.setTimeout(() => {
          if (!itemState.isOpen) {
            preview.hidden = true;
          }
        }, 500);
      }
    });

    document.body.classList.remove("dialog-open");
  };

  previews.forEach(({ hotspot, preview, closeSelector }) => {
    const closeTriggers = preview.querySelectorAll(closeSelector);
    const dialog = preview.querySelector(".fitness-preview__dialog");
    const video = preview.querySelector(".fitness-preview__video");
    const itemState = {
      hoverTimer: null,
      isOpen: false,
      dialog,
      video
    };

    state.set(hotspot, itemState);

    const setArmingState = (isArming) => {
      hotspot.classList.toggle("is-arming", isArming && !itemState.isOpen);
    };

    const clearHoverTimer = () => {
      if (itemState.hoverTimer) {
        window.clearTimeout(itemState.hoverTimer);
        itemState.hoverTimer = null;
      }
      setArmingState(false);
    };

    itemState.clearHoverTimer = clearHoverTimer;

    const playVideo = () => {
      if (!video) {
        return;
      }

      if (video.dataset.videoSrc && video.getAttribute("src") !== video.dataset.videoSrc) {
        video.setAttribute("src", video.dataset.videoSrc);
        video.load();
      }

      const playAttempt = video.play();
      if (playAttempt && typeof playAttempt.catch === "function") {
        playAttempt.catch(() => {});
      }
    };

    const openPreview = () => {
      if (itemState.isOpen || !isPreviewEnabled()) {
        return;
      }

      closeAllPreviews();

      itemState.isOpen = true;
      setArmingState(false);
      preview.hidden = false;
      document.body.classList.add("dialog-open");

      window.requestAnimationFrame(() => {
        window.requestAnimationFrame(() => {
          preview.classList.add("is-open");
          playVideo();
        });
      });
    };

    const closePreview = () => {
      if (!itemState.isOpen) {
        clearHoverTimer();
        return;
      }

      itemState.isOpen = false;
      clearHoverTimer();
      preview.classList.remove("is-open");

      unloadVideo(video);

      document.body.classList.remove("dialog-open");

      if (reduceMotion) {
        preview.hidden = true;
        return;
      }

      window.setTimeout(() => {
        if (!itemState.isOpen) {
          preview.hidden = true;
        }
      }, 500);
    };

    if (supportsHover) {
      hotspot.addEventListener("pointerenter", () => {
        if (!isPreviewEnabled()) {
          clearHoverTimer();
          return;
        }

        clearHoverTimer();
        setArmingState(true);
        itemState.hoverTimer = window.setTimeout(openPreview, openDelay);
      });

      hotspot.addEventListener("pointerleave", () => {
        clearHoverTimer();
      });
    }

    closeTriggers.forEach((trigger) => {
      trigger.addEventListener("click", closePreview);
    });

    preview.addEventListener("click", (event) => {
      if (dialog && !dialog.contains(event.target)) {
        closePreview();
      }
    });

    if (video) {
      video.addEventListener("click", () => {
        if (video.paused) {
          playVideo();
          return;
        }

        video.pause();
      });
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeAllPreviews();
    }
  });

  const syncPreviewAvailability = () => {
    if (isPreviewEnabled()) {
      return;
    }

    closeAllPreviews();
  };

  syncPreviewAvailability();
  window.addEventListener("scroll", syncPreviewAvailability, { passive: true });
  window.addEventListener("resize", syncPreviewAvailability, { passive: true });
})();
