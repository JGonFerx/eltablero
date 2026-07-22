(function () {
  const config = window.siteConfig || {};
  const siteHeader = document.querySelector("[data-site-header]");

  document.querySelectorAll("[data-current-year]").forEach((node) => {
    node.textContent = new Date().getFullYear();
  });

  const configTextNodes = document.querySelectorAll("[data-config-text]");
  configTextNodes.forEach((node) => {
    const key = node.dataset.configText;
    const value = config[key];
    if (value) {
      node.textContent = value;
    }
  });

  const configLinks = document.querySelectorAll("[data-config-link]");
  configLinks.forEach((link) => {
    const key = link.dataset.configLink;
    const value = config[key];
    const statusNode = link.parentElement.querySelector("[data-config-status]");

    if (value) {
      link.href = value;
      link.removeAttribute("aria-disabled");
      link.classList.remove("is-disabled");

      if (key === "phone") {
        link.href = "tel:" + value.replace(/\s+/g, "");
      }

      if (key === "email") {
        link.href = "mailto:" + value;
      }

      if (key === "whatsapp") {
        link.href = value.startsWith("http")
          ? value
          : "https://wa.me/" + value.replace(/[^\d]/g, "");
      }

      link.textContent = link.dataset.activeLabel || link.textContent;

      if (statusNode) {
        statusNode.textContent = "Disponible";
      }
    } else {
      link.removeAttribute("href");
      link.setAttribute("aria-disabled", "true");
      link.classList.add("is-disabled");

      if (statusNode) {
        statusNode.textContent = link.dataset.pendingLabel || config.bookingStatus || "Próximamente";
      }
    }
  });

  const externalLinks = document.querySelectorAll('a[target="_blank"]');
  externalLinks.forEach((link) => {
    if (!link.rel.includes("noopener")) {
      link.rel = "noopener noreferrer";
    }
  });

  const lazyVideos = Array.from(document.querySelectorAll("video[data-lazy-video-src]"));
  if (lazyVideos.length) {
    const loadLazyVideo = (video) => {
      if (!video || video.dataset.lazyVideoLoaded === "true") {
        return;
      }

      video.src = video.dataset.lazyVideoSrc;
      video.dataset.lazyVideoLoaded = "true";
      video.load();

      if (video.autoplay) {
        const playAttempt = video.play();
        if (playAttempt && typeof playAttempt.catch === "function") {
          playAttempt.catch(() => {});
        }
      }
    };

    if ("IntersectionObserver" in window) {
      const lazyVideoObserver = new IntersectionObserver(
        (entries, observer) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) {
              return;
            }

            loadLazyVideo(entry.target);
            observer.unobserve(entry.target);
          });
        },
        { rootMargin: "420px 0px" }
      );

      lazyVideos.forEach((video) => lazyVideoObserver.observe(video));
    } else {
      lazyVideos.forEach(loadLazyVideo);
    }
  }

  if (siteHeader) {
    const hero = document.querySelector(".hero--immersive");
    const isOverlayHeader = siteHeader.classList.contains("site-header--overlay");

    const toggleHeaderState = () => {
      if (isOverlayHeader && hero) {
        const heroBottom = hero.getBoundingClientRect().bottom;
        const headerHeight = siteHeader.offsetHeight;
        siteHeader.classList.toggle("is-scrolled", heroBottom <= headerHeight);
        return;
      }

      siteHeader.classList.toggle("is-scrolled", window.scrollY > 24);
    };

    toggleHeaderState();
    window.addEventListener("scroll", toggleHeaderState, { passive: true });
    window.addEventListener("resize", toggleHeaderState, { passive: true });
  }

  const heroMedia = document.querySelector(".hero__media");
  if (heroMedia) {
    heroMedia.addEventListener("dragstart", (event) => {
      event.preventDefault();
    });

    heroMedia.addEventListener("contextmenu", (event) => {
      event.preventDefault();
    });
  }

  const clubTickers = Array.from(document.querySelectorAll(".club-ticker"));
  clubTickers.forEach((clubTicker) => {
    if (typeof clubTicker.getAnimations !== "function") {
      return;
    }

    const tickerTrack = clubTicker.querySelector(".club-ticker__track");

    if (tickerTrack && typeof tickerTrack.getAnimations === "function") {
      const setTickerRate = (playbackRate) => {
        tickerTrack.getAnimations().forEach((animation) => {
          if (typeof animation.updatePlaybackRate === "function") {
            animation.updatePlaybackRate(playbackRate);
          } else {
            animation.playbackRate = playbackRate;
          }
        });
      };

      clubTicker.addEventListener("pointerenter", () => setTickerRate(0.64));
      clubTicker.addEventListener("pointerleave", () => setTickerRate(1));
      clubTicker.addEventListener("focusin", () => setTickerRate(0.64));
      clubTicker.addEventListener("focusout", () => setTickerRate(1));
    }
  });

  const mobileStickyActions = document.querySelector("[data-mobile-sticky-actions]");
  if (mobileStickyActions) {
    const siteFooter = document.querySelector(".site-footer");
    const footerLegalSection = document.querySelector("#footer-legal-title")?.closest(".site-footer__section");
    const stickyActionsHideTarget = footerLegalSection || siteFooter;
    const setMobileStickyActionsHidden = (isHidden) => {
      mobileStickyActions.classList.toggle("is-hidden", isHidden);
    };

    if (stickyActionsHideTarget && "IntersectionObserver" in window) {
      const stickyActionsObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            setMobileStickyActionsHidden(entry.isIntersecting);
          });
        },
        { threshold: 0 }
      );

      stickyActionsObserver.observe(stickyActionsHideTarget);
    } else if (stickyActionsHideTarget) {
      const updateMobileStickyActions = () => {
        setMobileStickyActionsHidden(stickyActionsHideTarget.getBoundingClientRect().top <= window.innerHeight);
      };

      updateMobileStickyActions();
      window.addEventListener("scroll", updateMobileStickyActions, { passive: true });
      window.addEventListener("resize", updateMobileStickyActions, { passive: true });
    }
  }

  const tariffMenus = Array.from(document.querySelectorAll("[data-tariff-menu]"));
  if (tariffMenus.length) {
    const canHover = window.matchMedia?.("(hover: hover) and (pointer: fine)");
    const closeTariffMenus = (exceptMenu = null) => {
      tariffMenus.forEach((menu) => {
        if (menu === exceptMenu) {
          return;
        }

        menu.classList.remove("is-open");
        menu.classList.remove("is-suppressed");
        menu.querySelector("[data-tariff-menu-trigger]")?.setAttribute("aria-expanded", "false");
      });
    };

    tariffMenus.forEach((menu) => {
      const trigger = menu.querySelector("[data-tariff-menu-trigger]");

      trigger?.addEventListener("click", (event) => {
        event.preventDefault();
        closeTariffMenus(menu);

        const isHoverOpen = Boolean(canHover?.matches && menu.matches(":hover") && !menu.classList.contains("is-suppressed"));
        const shouldOpen = !menu.classList.contains("is-open") && !isHoverOpen;

        menu.classList.toggle("is-open", shouldOpen);
        menu.classList.toggle("is-suppressed", !shouldOpen);
        trigger.setAttribute("aria-expanded", String(shouldOpen));

        if (!shouldOpen) {
          trigger.blur();
        }
      });

      menu.addEventListener("pointerleave", () => {
        menu.classList.remove("is-suppressed");
      });

      menu.addEventListener("focusout", (event) => {
        if (!menu.contains(event.relatedTarget)) {
          menu.classList.remove("is-open");
          menu.classList.remove("is-suppressed");
          trigger?.setAttribute("aria-expanded", "false");
        }
      });
    });

    document.addEventListener("click", (event) => {
      if (!event.target.closest("[data-tariff-menu]")) {
        closeTariffMenus();
      }
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        closeTariffMenus();
      }
    });
  }

  const bookingTriggers = Array.from(
    document.querySelectorAll(
      "[data-booking-trigger]"
    )
  );

  if (bookingTriggers.length) {
    let bookingPopover = null;
    let activeBookingTrigger = null;

    const getReservationPhoneHref = () => {
      const phone = config.phone || config.secondaryPhone || "";
      return phone ? `tel:${phone.replace(/\s+/g, "")}` : "tel:+34698182542";
    };

    const getReservationWhatsAppHref = () => {
      if (config.whatsapp) {
        return config.whatsapp;
      }

      const phone = config.phone || config.secondaryPhone || "698 182 542";
      return `https://wa.me/${phone.replace(/[^\d]/g, "")}`;
    };

    const closeMobileMenu = () => {
      const menu = document.querySelector("[data-mobile-menu]");
      const openButton = document.querySelector("[data-menu-open]");

      if (!menu || menu.hidden) {
        return;
      }

      menu.hidden = true;
      document.body.classList.remove("menu-open");
      openButton?.setAttribute("aria-expanded", "false");
    };

    const createBookingPopover = () => {
      if (bookingPopover) {
        return bookingPopover;
      }

      bookingPopover = document.createElement("div");
      bookingPopover.className = "booking-popover";
      bookingPopover.id = "booking-popover";
      bookingPopover.setAttribute("role", "dialog");
      bookingPopover.setAttribute("aria-label", "Reservar pista");
      bookingPopover.hidden = true;
      bookingPopover.innerHTML = `
        <div class="booking-popover__head">
          <span class="booking-popover__kicker">Reserva pista</span>
          <button class="booking-popover__close" type="button" aria-label="Cerrar reserva">×</button>
        </div>
        <strong class="booking-popover__title">Reserva con recepción.</strong>
        <p class="booking-popover__text">Contacta con el club para consultar disponibilidad de pista y reservar.</p>
        <div class="booking-popover__actions">
          <a class="booking-popover__action booking-popover__action--primary" href="${getReservationWhatsAppHref()}" target="_blank" rel="noopener noreferrer">WhatsApp</a>
          <a class="booking-popover__action" href="${getReservationPhoneHref()}">Llamar</a>
        </div>
      `;

      document.body.appendChild(bookingPopover);

      bookingPopover.querySelector(".booking-popover__close")?.addEventListener("click", () => {
        closeBookingPopover(true);
      });

      return bookingPopover;
    };

    const positionBookingPopover = (trigger) => {
      const popover = createBookingPopover();
      const triggerRect = trigger.getBoundingClientRect();
      const gutter = 14;
      const isCompact = window.matchMedia?.("(max-width: 47.99rem)")?.matches;
      const isQuickActionTrigger = trigger.matches(
        ".hero__quick-action--primary, .mobile-sticky-actions__link--primary"
      );

      popover.classList.toggle("booking-popover--compact", Boolean(isCompact && !isQuickActionTrigger));
      popover.classList.toggle("booking-popover--quick", Boolean(isQuickActionTrigger));

      if (isCompact && !isQuickActionTrigger) {
        popover.style.removeProperty("--booking-popover-left");
        popover.style.removeProperty("--booking-popover-top");
        return;
      }

      const popoverRect = popover.getBoundingClientRect();
      const shouldOpenAboveTrigger = isQuickActionTrigger;
      const preferredLeft = triggerRect.left + triggerRect.width / 2 - popoverRect.width / 2;
      const left = Math.min(Math.max(gutter, preferredLeft), window.innerWidth - popoverRect.width - gutter);
      const preferredTop = shouldOpenAboveTrigger
        ? triggerRect.top - popoverRect.height - 12
        : triggerRect.bottom + 12;
      const top = Math.min(Math.max(gutter, preferredTop), window.innerHeight - popoverRect.height - gutter);

      popover.style.setProperty("--booking-popover-left", `${left}px`);
      popover.style.setProperty("--booking-popover-top", `${top}px`);
    };

    const openBookingPopover = (trigger) => {
      closeMobileMenu();

      const popover = createBookingPopover();
      activeBookingTrigger = trigger;
      bookingTriggers.forEach((item) => item.setAttribute("aria-expanded", String(item === trigger)));
      popover.hidden = false;
      positionBookingPopover(trigger);

      requestAnimationFrame(() => {
        popover.classList.add("is-open");
      });
    };

    function closeBookingPopover(restoreFocus = false) {
      if (!bookingPopover || bookingPopover.hidden) {
        return;
      }

      bookingPopover.classList.remove("is-open");
      bookingTriggers.forEach((trigger) => trigger.setAttribute("aria-expanded", "false"));

      window.setTimeout(() => {
        if (!bookingPopover.classList.contains("is-open")) {
          bookingPopover.hidden = true;
        }
      }, 180);

      if (restoreFocus && activeBookingTrigger) {
        activeBookingTrigger.focus();
      }

      activeBookingTrigger = null;
    }

    bookingTriggers.forEach((trigger) => {
      trigger.setAttribute("aria-haspopup", "dialog");
      trigger.setAttribute("aria-controls", "booking-popover");
      trigger.setAttribute("aria-expanded", "false");

      trigger.addEventListener("click", (event) => {
        event.preventDefault();

        if (bookingPopover?.classList.contains("is-open") && activeBookingTrigger === trigger) {
          closeBookingPopover();
          return;
        }

        openBookingPopover(trigger);
      });
    });

    document.addEventListener("click", (event) => {
      if (!bookingPopover?.classList.contains("is-open")) {
        return;
      }

      if (event.target.closest(".booking-popover") || event.target.closest('[aria-controls="booking-popover"]')) {
        return;
      }

      closeBookingPopover();
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        closeBookingPopover(true);
      }
    });

    window.addEventListener("resize", () => {
      if (bookingPopover?.classList.contains("is-open") && activeBookingTrigger) {
        positionBookingPopover(activeBookingTrigger);
      }
    });

    window.addEventListener(
      "scroll",
      () => {
        if (bookingPopover?.classList.contains("is-open") && activeBookingTrigger) {
          positionBookingPopover(activeBookingTrigger);
        }
      },
      { passive: true }
    );
  }

  const storyTriggers = Array.from(document.querySelectorAll("[data-story-trigger]"));
  if (storyTriggers.length) {
    const homeStories = document.body.classList.contains("home-page")
      ? [
          {
            label: "El Tablero",
            src: "AQPHk85Y6oLMnLJAZvJOZfmkIVFoGfaBYLdk2aHWlvwL9hQltrPoBWouXM3siZaUff41E7BFTxgq2BHGJoFH6rGWr9KOfkVJ1HrJ2pU-720.mp4",
            base: "imagenes/"
          }
        ]
      : [];
    const stories = [
      ...homeStories,
      { label: "Fitness", src: "vidfitness-720.mp4" },
      { label: "Pádel", src: "padel-720.mp4" },
      { label: "CrossFit", src: "vidcrossfit2-720.mp4" },
      { label: "Hybrid", src: "vidcrossfit1-720.mp4" },
      { label: "Instagram", type: "instagram" }
    ];

    let viewer = null;
    let dialog = null;
    let video = null;
    let title = null;
    let closeButton = null;
    let pauseButton = null;
    let previousButton = null;
    let nextButton = null;
    let instagramSlide = null;
    let instagramLink = null;
    let progressFills = [];
    let activeIndex = 0;
    let resumeIndex = 0;
    let activeBase = "";
    let lastFocusedElement = null;
    let closeTimer = null;
    let pointerStart = null;
    let isViewerOpen = false;
    let isPaused = false;
    const instagramStoryDuration = 8000;
    let instagramFrameId = null;
    let instagramStartedAt = 0;
    let instagramElapsed = 0;

    const playStoryVideo = () => {
      if (!video) {
        return;
      }

      const playAttempt = video.play();
      if (playAttempt && typeof playAttempt.catch === "function") {
        playAttempt.catch(() => {});
      }
    };

    const clearInstagramTimer = () => {
      if (instagramFrameId) {
        window.cancelAnimationFrame(instagramFrameId);
        instagramFrameId = null;
      }

      instagramStartedAt = 0;
    };

    const setInstagramProgress = (progress) => {
      progressFills[activeIndex]?.style.setProperty("transform", `scaleX(${progress})`);
    };

    const markStoriesAsSeen = () => {
      storyTriggers.forEach((trigger) => {
        trigger.classList.add("is-seen");
        trigger.setAttribute("aria-label", "Stories de El Tablero vistas");
      });
    };

    const runInstagramTimer = (timestamp) => {
      if (!instagramStartedAt) {
        instagramStartedAt = timestamp;
      }

      const elapsed = instagramElapsed + timestamp - instagramStartedAt;
      const progress = Math.min(elapsed / instagramStoryDuration, 1);
      setInstagramProgress(progress);

      if (progress >= 1) {
        markStoriesAsSeen();
        clearInstagramTimer();
        goToNextStory();
        return;
      }

      instagramFrameId = window.requestAnimationFrame(runInstagramTimer);
    };

    const startInstagramTimer = () => {
      clearInstagramTimer();
      instagramFrameId = window.requestAnimationFrame(runInstagramTimer);
    };

    const pauseInstagramTimer = () => {
      if (instagramFrameId && instagramStartedAt) {
        instagramElapsed += performance.now() - instagramStartedAt;
      }

      clearInstagramTimer();
    };

    const setPausedState = (paused) => {
      isPaused = paused;
      viewer?.classList.toggle("is-paused", paused);

      if (pauseButton) {
        pauseButton.setAttribute("aria-pressed", String(paused));
        pauseButton.setAttribute("aria-label", paused ? "Reanudar story" : "Pausar story");
      }

      if (stories[activeIndex]?.type === "instagram") {
        if (paused) {
          pauseInstagramTimer();
        } else {
          startInstagramTimer();
        }
        return;
      }

      if (!video || video.hidden) {
        return;
      }

      if (paused) {
        video.pause();
        return;
      }

      playStoryVideo();
    };

    const updateStoryProgress = () => {
      if (!video || !Number.isFinite(video.duration) || video.duration <= 0) {
        progressFills[activeIndex]?.style.setProperty("transform", "scaleX(0)");
        return;
      }

      const progress = Math.min(Math.max(video.currentTime / video.duration, 0), 1);
      progressFills[activeIndex]?.style.setProperty("transform", `scaleX(${progress})`);
    };

    const setStoryProgressState = () => {
      progressFills.forEach((fill, index) => {
        if (index < activeIndex) {
          fill.style.transform = "scaleX(1)";
          return;
        }

        fill.style.transform = "scaleX(0)";
      });
    };

    const showStory = (index) => {
      clearInstagramTimer();
      instagramElapsed = 0;
      activeIndex = Math.min(Math.max(index, 0), stories.length - 1);
      const story = stories[activeIndex];

      setStoryProgressState();
      title.textContent = story.label;
      video.pause();

      if (story.type === "instagram") {
        video.hidden = true;
        video.removeAttribute("src");
        video.load();
        instagramSlide.hidden = false;
        setInstagramProgress(0);
        setPausedState(false);
        return;
      }

      instagramSlide.hidden = true;
      video.hidden = false;
      const storyBase = story.base ? activeBase.replace(/assets\/videos\/?$/, story.base) : activeBase;
      video.muted = true;
      video.src = storyBase + story.src;
      video.currentTime = 0;
      video.load();
      setPausedState(false);
      playStoryVideo();
    };

    const closeStories = () => {
      if (!viewer || !isViewerOpen) {
        return;
      }

      isViewerOpen = false;
      viewer.classList.remove("is-open");
      document.body.classList.remove("dialog-open");

      if (video) {
        video.pause();
        video.removeAttribute("src");
        video.load();
      }

      clearInstagramTimer();
      instagramElapsed = 0;
      resumeIndex = activeIndex;
      title.textContent = "";
      instagramSlide.hidden = true;
      isPaused = false;
      viewer.classList.remove("is-paused");
      pauseButton.setAttribute("aria-pressed", "false");
      pauseButton.setAttribute("aria-label", "Pausar story");

      window.clearTimeout(closeTimer);
      closeTimer = window.setTimeout(() => {
        viewer.hidden = true;
      }, 420);

      if (lastFocusedElement && typeof lastFocusedElement.focus === "function") {
        lastFocusedElement.focus();
      }
    };

    const goToPreviousStory = () => {
      if (!isViewerOpen) {
        return;
      }

      showStory(activeIndex - 1);
    };

    const goToNextStory = () => {
      if (!isViewerOpen) {
        return;
      }

      if (activeIndex >= stories.length - 1) {
        markStoriesAsSeen();
        closeStories();
        return;
      }

      showStory(activeIndex + 1);
    };

    const createStoryViewer = () => {
      if (viewer) {
        return;
      }

      viewer = document.createElement("div");
      viewer.className = "story-viewer";
      viewer.hidden = true;
      viewer.innerHTML = `
        <div class="story-viewer__dialog" role="dialog" aria-modal="true" aria-label="Stories de El Tablero">
          <div class="story-viewer__progress" aria-hidden="true">
            ${stories.map(() => '<span class="story-viewer__progress-bar"><span class="story-viewer__progress-fill"></span></span>').join("")}
          </div>
          <div class="story-viewer__chrome">
            <p class="story-viewer__title"></p>
            <div class="story-viewer__controls">
              <button class="story-viewer__pause" type="button" aria-label="Pausar story" aria-pressed="false">
                <span class="story-viewer__pause-icon" aria-hidden="true"></span>
              </button>
              <button class="story-viewer__close" type="button" aria-label="Cerrar stories"><span aria-hidden="true"></span></button>
            </div>
          </div>
          <button class="story-viewer__nav story-viewer__nav--prev" type="button" aria-label="Story anterior"><span aria-hidden="true"></span></button>
          <button class="story-viewer__nav story-viewer__nav--next" type="button" aria-label="Story siguiente"><span aria-hidden="true"></span></button>
          <video class="story-viewer__video" muted playsinline preload="metadata"></video>
          <div class="story-viewer__instagram" hidden>
            <div class="story-viewer__instagram-card">
              <span class="story-viewer__instagram-icon" aria-hidden="true"></span>
              <h2>Ver más en Instagram</h2>
              <p>Sigue el día a día del club.</p>
              <a class="story-viewer__instagram-link" href="https://www.instagram.com/eltablerosportclub/" target="_blank" rel="noopener noreferrer">
                <span class="story-viewer__instagram-icon" aria-hidden="true"></span>
                <span>Ver más</span>
              </a>
            </div>
          </div>
        </div>
      `;
      document.body.appendChild(viewer);

      dialog = viewer.querySelector(".story-viewer__dialog");
      video = viewer.querySelector(".story-viewer__video");
      title = viewer.querySelector(".story-viewer__title");
      closeButton = viewer.querySelector(".story-viewer__close");
      pauseButton = viewer.querySelector(".story-viewer__pause");
      previousButton = viewer.querySelector(".story-viewer__nav--prev");
      nextButton = viewer.querySelector(".story-viewer__nav--next");
      instagramSlide = viewer.querySelector(".story-viewer__instagram");
      instagramLink = viewer.querySelector(".story-viewer__instagram-link");
      progressFills = Array.from(viewer.querySelectorAll(".story-viewer__progress-fill"));

      if (config.instagramUrl) {
        instagramLink.href = config.instagramUrl;
      }

      closeButton.addEventListener("click", closeStories);
      pauseButton.addEventListener("click", () => setPausedState(!isPaused));
      previousButton.addEventListener("click", goToPreviousStory);
      nextButton.addEventListener("click", goToNextStory);
      video.addEventListener("timeupdate", updateStoryProgress);
      video.addEventListener("ended", goToNextStory);
      video.addEventListener("loadedmetadata", updateStoryProgress);

      viewer.addEventListener("click", (event) => {
        if (event.target === viewer) {
          closeStories();
        }
      });

      dialog.addEventListener("pointerdown", (event) => {
        pointerStart = {
          x: event.clientX,
          y: event.clientY,
          target: event.target
        };
      });

      dialog.addEventListener("pointerup", (event) => {
        if (!pointerStart) {
          return;
        }

        const deltaX = event.clientX - pointerStart.x;
        const deltaY = event.clientY - pointerStart.y;
        const isHorizontalSwipe = Math.abs(deltaX) > 48 && Math.abs(deltaX) > Math.abs(deltaY);
        const startedOnControl = pointerStart.target.closest?.("button");

        if (isHorizontalSwipe) {
          if (deltaX < 0) {
            goToNextStory();
          } else {
            goToPreviousStory();
          }
          pointerStart = null;
          return;
        }

        if (!startedOnControl && pointerStart.target === video) {
          const dialogCenter = dialog.getBoundingClientRect().left + dialog.offsetWidth / 2;
          if (event.clientX < dialogCenter) {
            goToPreviousStory();
          } else {
            goToNextStory();
          }
        }

        pointerStart = null;
      });
    };

    const openStories = (trigger) => {
      createStoryViewer();
      lastFocusedElement = trigger;
      activeBase = trigger.dataset.storyVideoBase || "assets/videos/";
      clearInstagramTimer();
      instagramElapsed = 0;
      instagramSlide.hidden = true;
      video.pause();
      video.removeAttribute("src");
      video.load();
      viewer.hidden = false;
      document.body.classList.add("dialog-open");

      window.clearTimeout(closeTimer);
      window.requestAnimationFrame(() => {
        viewer.classList.add("is-open");
        isViewerOpen = true;
        showStory(resumeIndex);
        closeButton.focus();
      });
    };

    storyTriggers.forEach((trigger) => {
      trigger.addEventListener("click", () => openStories(trigger));
    });

    document.addEventListener("keydown", (event) => {
      if (!isViewerOpen) {
        return;
      }

      if (event.key === "Escape") {
        closeStories();
      }

      if (event.key === "ArrowLeft") {
        event.preventDefault();
        goToPreviousStory();
      }

      if (event.key === "ArrowRight") {
        event.preventDefault();
        goToNextStory();
      }
    });
  }

  const immersiveHero = document.querySelector(".hero--immersive");
  if (immersiveHero && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    immersiveHero.classList.add("hero--scroll-enhanced");
    const decisionPrimary = immersiveHero.querySelector(".hero__decision-primary");
    let ticking = false;

    const clamp = (value, min, max) => Math.min(Math.max(value, min), max);
    const easeInOut = (value) => 0.5 - Math.cos(Math.PI * value) / 2;
    const segmentProgress = (value, start, end) => clamp((value - start) / (end - start), 0, 1);
    const getViewportHeight = () => window.visualViewport?.height || window.innerHeight;
    const mobileViewport = {
      width: window.innerWidth,
      height: getViewportHeight()
    };

    const getStableViewportHeight = (viewportWidth) => {
      const currentHeight = getViewportHeight();

      if (viewportWidth >= 768) {
        mobileViewport.width = viewportWidth;
        mobileViewport.height = currentHeight;
        immersiveHero.style.removeProperty("--hero-mobile-stable-height");
        return currentHeight;
      }

      if (Math.abs(viewportWidth - mobileViewport.width) > 32) {
        mobileViewport.width = viewportWidth;
        mobileViewport.height = currentHeight;
      } else {
        mobileViewport.height = Math.min(mobileViewport.height, currentHeight);
      }

      immersiveHero.style.setProperty("--hero-mobile-stable-height", `${mobileViewport.height.toFixed(2)}px`);
      return mobileViewport.height;
    };

    const updateHeroScrollCamera = () => {
      ticking = false;

      const viewportWidth = window.innerWidth;
      const viewportHeight = getStableViewportHeight(viewportWidth);
      const isMobileHero = viewportWidth < 768;
      const heroTop = immersiveHero.offsetTop;
      const rawScroll = window.scrollY - heroTop;
      const mobileChromeScrollGuard = isMobileHero ? Math.min(128, viewportHeight * 0.15) : 0;
      const adjustedRawScroll = Math.max(rawScroll - mobileChromeScrollGuard, 0);
      const totalScrollDistance = Math.max(immersiveHero.offsetHeight - viewportHeight, viewportHeight * 0.92, 520);
      const revealDistance = Math.min(totalScrollDistance, Math.max(viewportHeight * 1.55, 980));
      const progress = clamp(adjustedRawScroll / revealDistance, 0, 1);
      const easedCameraProgress = easeInOut(progress);

      let targetScale = 2.3;
      let targetShiftX = viewportWidth * -0.185;
      let targetShiftY = viewportHeight * -0.18;
      let targetRotate = -7.5;

      if (viewportWidth < 1024) {
        targetScale = 1.95;
        targetShiftX = viewportWidth * -0.055;
        targetShiftY = viewportHeight * 0.085;
        targetRotate = -4;
      }

      if (isMobileHero) {
        targetScale = 2.34;
        targetShiftX = viewportWidth * -0.12;
        targetShiftY = viewportHeight * -0.015;
        targetRotate = 0;
      }

      const scale = 1 + (targetScale - 1) * easedCameraProgress;
      const shiftX = targetShiftX * easedCameraProgress;
      const shiftY = targetShiftY * easedCameraProgress;
      const rotate = targetRotate * easedCameraProgress;
      const blackoutProgress = segmentProgress(progress, 0.56, 0.8);
      const blackoutOpacity = easeInOut(blackoutProgress) * 0.9;
      const shellFadeProgress = isMobileHero
        ? segmentProgress(progress, 0.055, 0.18)
        : segmentProgress(progress, 0.16, 0.42);
      const shellOpacity = 1 - easeInOut(shellFadeProgress);
      const shellShiftY = (isMobileHero ? 14 : 36) * easeInOut(shellFadeProgress);
      const decisionIntroReveal = easeInOut(segmentProgress(progress, 0.74, 0.88));
      const decisionPrimaryReveal = easeInOut(segmentProgress(progress, 0.68, 0.9));
      const decisionUtilitiesReveal = easeInOut(segmentProgress(progress, 0.9, 0.975));
      const previewMode = progress < 0.4 ? "interactive" : "glow-only";

      immersiveHero.style.setProperty("--hero-scroll-progress", progress.toFixed(4));
      immersiveHero.style.setProperty("--hero-media-scale", scale.toFixed(4));
      immersiveHero.style.setProperty("--hero-media-shift-x", `${shiftX.toFixed(2)}px`);
      immersiveHero.style.setProperty("--hero-media-shift-y", `${shiftY.toFixed(2)}px`);
      immersiveHero.style.setProperty("--hero-media-rotate", `${rotate.toFixed(3)}deg`);
      immersiveHero.style.setProperty("--hero-blackout-opacity", blackoutOpacity.toFixed(4));
      immersiveHero.style.setProperty("--hero-shell-opacity", shellOpacity.toFixed(4));
      immersiveHero.style.setProperty("--hero-shell-shift-y", `${shellShiftY.toFixed(2)}px`);
      immersiveHero.style.setProperty("--hero-decision-intro-opacity", decisionIntroReveal.toFixed(4));
      immersiveHero.style.setProperty(
        "--hero-decision-intro-shift-y",
        `${(44 * (1 - decisionIntroReveal)).toFixed(2)}px`
      );
      immersiveHero.style.setProperty(
        "--hero-decision-intro-scale",
        (0.94 + (0.06 * decisionIntroReveal)).toFixed(4)
      );
      immersiveHero.style.setProperty("--hero-decision-primary-opacity", decisionPrimaryReveal.toFixed(4));
      immersiveHero.style.setProperty(
        "--hero-decision-primary-shift-y",
        `${(52 * (1 - decisionPrimaryReveal)).toFixed(2)}px`
      );
      immersiveHero.style.setProperty(
        "--hero-decision-primary-scale",
        (0.94 + (0.06 * decisionPrimaryReveal)).toFixed(4)
      );
      decisionPrimary?.classList.toggle("is-interactive", decisionPrimaryReveal >= 0.52);
      siteHeader?.classList.toggle("is-protecting-hero-cards", decisionPrimaryReveal > 0.02);
      immersiveHero.style.setProperty("--hero-decision-utilities-opacity", decisionUtilitiesReveal.toFixed(4));
      immersiveHero.style.setProperty(
        "--hero-decision-utilities-shift-y",
        `${(42 * (1 - decisionUtilitiesReveal)).toFixed(2)}px`
      );
      immersiveHero.style.setProperty(
        "--hero-decision-utilities-scale",
        (0.96 + (0.04 * decisionUtilitiesReveal)).toFixed(4)
      );
      immersiveHero.dataset.previewMode = previewMode;
    };

    const requestHeroScrollCameraUpdate = () => {
      if (ticking) {
        return;
      }

      ticking = true;
      window.requestAnimationFrame(updateHeroScrollCamera);
    };

    updateHeroScrollCamera();
    window.addEventListener("scroll", requestHeroScrollCameraUpdate, { passive: true });
    window.addEventListener("resize", requestHeroScrollCameraUpdate, { passive: true });
  } else if (immersiveHero) {
    immersiveHero.querySelector(".hero__decision-primary")?.classList.add("is-interactive");
  }

  const autoscrollTrigger = document.querySelector("[data-hero-autoscroll-trigger]");
  if (autoscrollTrigger) {
    const reduceMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const clubSection = document.querySelector("#club");
    const rootElement = document.documentElement;
    const autoscrollState = {
      active: false,
      frameId: null,
      lastTimestamp: 0,
      runId: 0
    };
    const pixelsPerSecond = 610;
    const stopEvents = ["wheel", "touchstart", "pointerdown", "keydown"];

    const setAutoscrollUi = (isActive) => {
      autoscrollTrigger.setAttribute("aria-pressed", String(isActive));
      autoscrollTrigger.setAttribute(
        "aria-label",
        isActive ? "Detener recorrido automático por la web" : "Iniciar recorrido automático por la web"
      );
    };

    const stopAutoscroll = () => {
      if (!autoscrollState.active && !autoscrollState.frameId) {
        return;
      }

      autoscrollState.active = false;
      autoscrollState.lastTimestamp = 0;
      autoscrollState.runId += 1;
      rootElement.style.scrollBehavior = "";

      if (autoscrollState.frameId) {
        window.cancelAnimationFrame(autoscrollState.frameId);
        autoscrollState.frameId = null;
      }

      setAutoscrollUi(false);
    };

    const handleStopInteraction = (event) => {
      if (event?.target instanceof Element && event.target.closest("[data-hero-autoscroll-trigger]")) {
        return;
      }

      stopAutoscroll();
    };

    const runAutoscroll = (runId, timestamp) => {
      if (!autoscrollState.active || autoscrollState.runId !== runId) {
        return;
      }

      autoscrollState.frameId = null;

      if (!autoscrollState.lastTimestamp) {
        autoscrollState.lastTimestamp = timestamp;
      }

      const elapsedMs = timestamp - autoscrollState.lastTimestamp;
      autoscrollState.lastTimestamp = timestamp;
      const maxScrollTop = document.documentElement.scrollHeight - window.innerHeight;
      const nextScrollTop = Math.min(window.scrollY + (pixelsPerSecond * elapsedMs) / 1000, maxScrollTop);

      window.scrollTo(0, nextScrollTop);

      if (nextScrollTop >= maxScrollTop - 1) {
        stopAutoscroll();
        return;
      }

      autoscrollState.frameId = window.requestAnimationFrame((nextTimestamp) => runAutoscroll(runId, nextTimestamp));
    };

    stopEvents.forEach((eventName) => {
      window.addEventListener(eventName, handleStopInteraction, { passive: true });
    });

    autoscrollTrigger.addEventListener("click", () => {
      if (autoscrollState.active) {
        stopAutoscroll();
        return;
      }

      if (reduceMotionQuery.matches) {
        if (clubSection) {
          clubSection.scrollIntoView();
        }
        return;
      }

      stopAutoscroll();
      autoscrollState.active = true;
      autoscrollState.lastTimestamp = 0;
      autoscrollState.runId += 1;
      const runId = autoscrollState.runId;
      rootElement.style.scrollBehavior = "auto";
      setAutoscrollUi(true);
      autoscrollState.frameId = window.requestAnimationFrame((timestamp) => runAutoscroll(runId, timestamp));
    });
  }

  const cardCarousels = Array.from(document.querySelectorAll("[data-card-carousel]"))
    .map((carousel) => ({
      element: carousel,
      slides: Array.from(carousel.querySelectorAll(".service-link__slide")),
      activeIndex: 0
    }))
    .filter((carousel) => carousel.slides.length > 1);

  if (cardCarousels.length) {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      cardCarousels.forEach((carousel) => {
        carousel.slides.forEach((slide, index) => {
          slide.classList.toggle("is-active", index === 0);
        });
      });
    } else {
      const intervalMs = 2600;
      let timerId = null;
      const requestIdle = window.requestIdleCallback
        ? window.requestIdleCallback.bind(window)
        : (callback) => window.setTimeout(callback, 180);

      const warmSlide = (slide) => {
        if (!slide || slide.dataset.warmed === "true") {
          return;
        }

        slide.dataset.warmed = "true";
        slide.loading = "eager";
        slide.decoding = "async";

        requestIdle(() => {
          if (typeof slide.decode === "function") {
            slide.decode().catch(() => {});
          }
        });
      };

      cardCarousels.forEach((carousel) => {
        const presetIndex = carousel.slides.findIndex((slide) => slide.classList.contains("is-active"));
        carousel.activeIndex = presetIndex >= 0 ? presetIndex : 0;
        carousel.slides.forEach((slide, index) => {
          slide.classList.toggle("is-active", index === carousel.activeIndex);
        });
        warmSlide(carousel.slides[carousel.activeIndex]);
        warmSlide(carousel.slides[(carousel.activeIndex + 1) % carousel.slides.length]);
        warmSlide(carousel.slides[(carousel.activeIndex + 2) % carousel.slides.length]);
      });

      const stepCarousels = () => {
        cardCarousels.forEach((carousel) => {
          carousel.activeIndex = (carousel.activeIndex + 1) % carousel.slides.length;
          carousel.slides.forEach((slide, index) => {
            slide.classList.toggle("is-active", index === carousel.activeIndex);
          });
          warmSlide(carousel.slides[(carousel.activeIndex + 1) % carousel.slides.length]);
          warmSlide(carousel.slides[(carousel.activeIndex + 2) % carousel.slides.length]);
        });
      };

      const startCarousels = () => {
        if (timerId) {
          return;
        }

        timerId = window.setInterval(stepCarousels, intervalMs);
      };

      startCarousels();
    }
  }

  const classCalendars = Array.from(document.querySelectorAll("[data-class-calendar]"));
  classCalendars.forEach((calendar, calendarIndex) => {
    const title = calendar.querySelector("[data-calendar-title]");
    const renderTarget = calendar.querySelector("[data-calendar-render]");
    const viewButtons = Array.from(calendar.querySelectorAll("[data-calendar-view]"));
    const previousButton = calendar.querySelector("[data-calendar-prev]");
    const nextButton = calendar.querySelector("[data-calendar-next]");
    const todayButton = calendar.querySelector("[data-calendar-today]");
    const classFilterButtons = Array.from(calendar.querySelectorAll("[data-calendar-class]"));
    let calendarEvents = null;
    try {
      calendarEvents = calendar.dataset.calendarEvents ? JSON.parse(calendar.dataset.calendarEvents) : null;
    } catch (error) {
      calendarEvents = null;
    }
    const configuredClassNames = calendarEvents
      ? Array.from(new Set(Object.values(calendarEvents).flat().map((event) => event.name).filter(Boolean)))
      : [];
    const filterClassNames = classFilterButtons.map((button) => button.dataset.calendarClass).filter(Boolean);
    const classNames = filterClassNames.length || configuredClassNames.length
      ? Array.from(new Set([...filterClassNames, ...configuredClassNames]))
      : ["Hybrid", "CrossFit"];
    const defaultClassName = calendar.dataset.calendarDefaultClass;
    const visibleClasses = new Set(classNames.includes(defaultClassName) ? [defaultClassName] : classNames);
    const weekdayNames = ["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"];
    const weekdayFullNames = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"];
    const monthNames = [
      "enero",
      "febrero",
      "marzo",
      "abril",
      "mayo",
      "junio",
      "julio",
      "agosto",
      "septiembre",
      "octubre",
      "noviembre",
      "diciembre"
    ];
    const now = new Date();
    let activeDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    let activeView = "week";
    let selectedMobileDateKey = "";
    const calendarValidUntil = calendar.dataset.calendarValidUntil || "";
    const mobilePanelId = calendar.id ? `${calendar.id}-mobile-day` : `class-calendar-${calendarIndex}-mobile-day`;

    const formatDateKey = (date) => [
      date.getFullYear(),
      String(date.getMonth() + 1).padStart(2, "0"),
      String(date.getDate()).padStart(2, "0")
    ].join("-");

    const isSameDay = (left, right) => formatDateKey(left) === formatDateKey(right);

    const addDays = (date, amount) => {
      const nextDate = new Date(date);
      nextDate.setDate(nextDate.getDate() + amount);
      return nextDate;
    };

    const startOfWeek = (date) => {
      const day = (date.getDay() + 6) % 7;
      return addDays(date, -day);
    };

    const startOfMonthGrid = (date) => startOfWeek(new Date(date.getFullYear(), date.getMonth(), 1));

    const getPeriodTitle = () => {
      if (activeView === "day") {
        return `${activeDate.getDate()} de ${monthNames[activeDate.getMonth()]}`;
      }

      if (activeView === "month") {
        return `${monthNames[activeDate.getMonth()]} ${activeDate.getFullYear()}`;
      }

      const start = startOfWeek(activeDate);
      const end = addDays(start, 6);
      return `${start.getDate()} ${monthNames[start.getMonth()]} - ${end.getDate()} ${monthNames[end.getMonth()]}`;
    };

    const getEventsForDate = (date) => {
      if (calendarValidUntil && formatDateKey(date) > calendarValidUntil) {
        return [];
      }

      const day = date.getDay();
      if (calendarEvents) {
        return (calendarEvents[String(day)] || []).filter((event) => visibleClasses.has(event.name));
      }

      if (day === 0 || day === 6) {
        return [];
      }

      return classNames.filter((className) => visibleClasses.has(className)).map((className) => ({
        name: className,
        detail: "Horario pendiente"
      }));
    };

    const createDayMarkup = (date) => {
      const weekdayIndex = (date.getDay() + 6) % 7;
      const events = getEventsForDate(date);
      const isToday = isSameDay(date, now);
      const eventsMarkup = events.length
        ? events.map((event) => `
            <article class="class-calendar-event">
              <strong>${event.name}</strong>
              <span>${event.detail}</span>
            </article>
          `).join("")
        : '<p class="class-calendar-empty">Sin clases previstas</p>';

      return `
        <section class="class-calendar-day${isToday ? " is-today" : ""}${events.length ? "" : " is-empty"}"${isToday ? ' aria-current="date"' : ""}>
          <div class="class-calendar-day__head">
            <span class="class-calendar-day__name">${weekdayNames[weekdayIndex]}</span>
            <span class="class-calendar-day__number">${date.getDate()}</span>
          </div>
          ${eventsMarkup}
        </section>
      `;
    };

    const createMobileDayPanelMarkup = (date) => {
      const weekdayIndex = (date.getDay() + 6) % 7;
      const events = getEventsForDate(date);
      const eventsMarkup = events.length
        ? events.map((event) => `
            <article class="class-calendar-event">
              <strong>${event.name}</strong>
              <span>${event.detail}</span>
            </article>
          `).join("")
        : '<p class="class-calendar-empty">Sin clases previstas.</p>';

      return `
        <section class="class-calendar-mobile-panel" id="${mobilePanelId}" aria-live="polite">
          <h4>${weekdayFullNames[weekdayIndex]} ${date.getDate()}</h4>
          <div class="class-calendar-mobile-panel__events">
            ${eventsMarkup}
          </div>
        </section>
      `;
    };

    const createMobileDaySelectorMarkup = (dates) => `
      <div class="class-calendar-mobile" aria-label="Seleccionar día de la semana">
        <div class="class-calendar-mobile__days" role="group" aria-controls="${mobilePanelId}">
          ${dates.map((date) => {
            const weekdayIndex = (date.getDay() + 6) % 7;
            const dateKey = formatDateKey(date);
            const isSelected = dateKey === selectedMobileDateKey;
            const isToday = isSameDay(date, now);

            return `
              <button class="class-calendar-mobile-day${isSelected ? " is-selected" : ""}${isToday ? " is-today" : ""}" type="button" data-calendar-mobile-day="${dateKey}" aria-pressed="${isSelected}" aria-controls="${mobilePanelId}">
                <span>${weekdayNames[weekdayIndex]}</span>
                <strong>${date.getDate()}</strong>
              </button>
            `;
          }).join("")}
        </div>
        ${createMobileDayPanelMarkup(dates.find((date) => formatDateKey(date) === selectedMobileDateKey) || dates[0])}
      </div>
    `;

    const getVisibleDates = () => {
      if (activeView === "day") {
        return [activeDate];
      }

      if (activeView === "month") {
        const start = startOfMonthGrid(activeDate);
        return Array.from({ length: 35 }, (_, index) => addDays(start, index));
      }

      const start = startOfWeek(activeDate);
      return Array.from({ length: 7 }, (_, index) => addDays(start, index));
    };

    const getDefaultMobileDateKey = (dates) => {
      const todayInWeek = dates.find((date) => isSameDay(date, now));
      return formatDateKey(todayInWeek || dates[0]);
    };

    const syncMobileSelection = (dates, shouldReset = false) => {
      const selectedDateExists = dates.some((date) => formatDateKey(date) === selectedMobileDateKey);

      if (shouldReset || !selectedDateExists) {
        selectedMobileDateKey = getDefaultMobileDateKey(dates);
      }
    };

    const renderCalendar = ({ resetMobileSelection = false } = {}) => {
      if (!renderTarget || !title) {
        return;
      }

      const visibleDates = getVisibleDates();
      syncMobileSelection(visibleDates, resetMobileSelection);

      title.textContent = getPeriodTitle();
      viewButtons.forEach((button) => {
        const isActive = button.dataset.calendarView === activeView;
        button.setAttribute("aria-selected", String(isActive));
      });

      renderTarget.innerHTML = `
        <div class="class-calendar-grid class-calendar-grid--${activeView}">
          ${visibleDates.map(createDayMarkup).join("")}
        </div>
        ${activeView === "week" ? createMobileDaySelectorMarkup(visibleDates) : ""}
      `;
    };

    const syncClassFilterButtons = () => {
      classFilterButtons.forEach((button) => {
        const className = button.dataset.calendarClass;
        button.setAttribute("aria-pressed", String(Boolean(className && visibleClasses.has(className))));
      });
    };

    viewButtons.forEach((button) => {
      button.addEventListener("click", () => {
        activeView = button.dataset.calendarView || "week";
        renderCalendar();
      });
    });

    classFilterButtons.forEach((button) => {
      button.addEventListener("click", () => {
        const className = button.dataset.calendarClass;

        if (!className) {
          return;
        }

        visibleClasses.clear();
        visibleClasses.add(className);
        syncClassFilterButtons();
        renderCalendar();
      });
    });

    syncClassFilterButtons();
    renderTarget?.addEventListener("click", (event) => {
      const dayButton = event.target instanceof Element
        ? event.target.closest("[data-calendar-mobile-day]")
        : null;

      if (!dayButton) {
        return;
      }

      selectedMobileDateKey = dayButton.dataset.calendarMobileDay || selectedMobileDateKey;
      renderCalendar();
    });

    previousButton?.addEventListener("click", () => {
      activeDate = activeView === "month"
        ? new Date(activeDate.getFullYear(), activeDate.getMonth() - 1, 1)
        : addDays(activeDate, activeView === "day" ? -1 : -7);
      renderCalendar({ resetMobileSelection: true });
    });

    nextButton?.addEventListener("click", () => {
      activeDate = activeView === "month"
        ? new Date(activeDate.getFullYear(), activeDate.getMonth() + 1, 1)
        : addDays(activeDate, activeView === "day" ? 1 : 7);
      renderCalendar({ resetMobileSelection: true });
    });

    todayButton?.addEventListener("click", () => {
      activeDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      renderCalendar({ resetMobileSelection: true });
    });

    renderCalendar();
  });

  const galleryMoreButtons = Array.from(document.querySelectorAll("[data-gallery-more]"));
  galleryMoreButtons.forEach((button) => {
    const galleryGroup = button.closest(".concept-gallery-group");
    const extraItems = Array.from(galleryGroup?.querySelectorAll("[data-gallery-extra]") || []);

    if (!extraItems.length) {
      button.hidden = true;
      return;
    }

    button.addEventListener("click", () => {
      const isExpanded = button.getAttribute("aria-expanded") === "true";

      extraItems.forEach((item) => {
        item.hidden = isExpanded;
      });

      button.setAttribute("aria-expanded", String(!isExpanded));
      button.textContent = isExpanded ? "Ver más" : "Ver menos";
    });
  });

  const lightboxDialog = document.querySelector("[data-gallery-dialog]");
  if (lightboxDialog) {
    const image = lightboxDialog.querySelector("[data-gallery-image]");
    const video = lightboxDialog.querySelector("[data-gallery-video]");
    const caption = lightboxDialog.querySelector("[data-gallery-caption]");
    const counter = lightboxDialog.querySelector("[data-gallery-counter]");
    const closeButtons = lightboxDialog.querySelectorAll("[data-gallery-close]");
    const frame = lightboxDialog.querySelector(".gallery-dialog__frame");
    const progress = lightboxDialog.querySelector("[data-gallery-progress]");
    const toggleButton = lightboxDialog.querySelector("[data-gallery-toggle]");
    const centerPlayButton = lightboxDialog.querySelector("[data-gallery-video-play]");
    const previousButton = lightboxDialog.querySelector("[data-gallery-prev]");
    const nextButton = lightboxDialog.querySelector("[data-gallery-next]");
    const galleryTriggers = Array.from(document.querySelectorAll("[data-lightbox-src]"));
    const defaultImageDuration = 6000;
    let lastTrigger = null;
    let activeGalleryItems = galleryTriggers;
    let activeGalleryIndex = 0;
    let progressFills = [];
    let progressFrame = null;
    let isPaused = false;
    let activeIsVideo = false;
    let imageStartedAt = 0;
    let imageElapsedBeforePause = 0;
    let pointerStart = null;
    let backdropCloseGuardUntil = 0;
    let backdropCloseGuardArmed = false;
    const preloadCache = new Map();
    let galleryScrollY = 0;

    const buildGalleryProgress = () => {
      if (!progress) {
        return;
      }

      progress.innerHTML = activeGalleryItems
        .map(() => '<span class="gallery-dialog__progress-bar"><span class="gallery-dialog__progress-fill"></span></span>')
        .join("");
      progressFills = Array.from(progress.querySelectorAll(".gallery-dialog__progress-fill"));
    };

    buildGalleryProgress();

    const clearGalleryProgress = () => {
      if (progressFrame) {
        window.cancelAnimationFrame(progressFrame);
        progressFrame = null;
      }
    };

    const setProgressValue = (index, value) => {
      progressFills[index]?.style.setProperty("transform", `scaleX(${Math.min(Math.max(value, 0), 1)})`);
    };

    const setProgressState = () => {
      progressFills.forEach((fill, index) => {
        fill.style.transform = `scaleX(${index < activeGalleryIndex ? 1 : 0})`;
      });
    };

    const setPausedState = (paused) => {
      isPaused = paused;
      lightboxDialog.classList.toggle("is-paused", paused);
      toggleButton?.setAttribute("aria-pressed", String(paused));
      toggleButton?.setAttribute("aria-label", paused ? "Reanudar galería" : "Pausar galería");

      if (activeIsVideo && video) {
        if (paused) {
          video.pause();
        } else {
          video.play().catch(() => {});
        }
        return;
      }

      if (paused) {
        if (lightboxDialog.open) {
          imageElapsedBeforePause += performance.now() - imageStartedAt;
        }
      } else {
        imageStartedAt = performance.now();
        if (lightboxDialog.open) {
          runGalleryProgress();
        }
      }
    };

    const goToGalleryItem = (index) => {
      showGalleryItem(index);
    };

    const lockGalleryScroll = () => {
      galleryScrollY = window.scrollY || document.documentElement.scrollTop || 0;
      document.body.classList.add("dialog-open");
      document.body.style.position = "fixed";
      document.body.style.top = `-${galleryScrollY}px`;
      document.body.style.left = "0";
      document.body.style.right = "0";
      document.body.style.width = "100%";
    };

    const unlockGalleryScroll = () => {
      const restoreY = galleryScrollY;
      const root = document.documentElement;
      const previousScrollBehavior = root.style.scrollBehavior;

      document.body.classList.remove("dialog-open");
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.left = "";
      document.body.style.right = "";
      document.body.style.width = "";
      root.style.scrollBehavior = "auto";
      window.scrollTo(0, restoreY);
      root.style.scrollBehavior = previousScrollBehavior;
      galleryScrollY = 0;
    };

    const preloadGalleryItem = (index) => {
      if (!activeGalleryItems.length) {
        return;
      }

      const trigger = activeGalleryItems[(index + activeGalleryItems.length) % activeGalleryItems.length];
      const src = trigger?.dataset.lightboxSrc;

      if (!src || preloadCache.has(src)) {
        return;
      }

      if (trigger.dataset.lightboxType === "video") {
        const nextVideo = document.createElement("video");
        nextVideo.preload = "metadata";
        nextVideo.muted = true;
        nextVideo.playsInline = true;
        nextVideo.src = src;
        preloadCache.set(src, nextVideo);
        return;
      }

      const nextImage = new Image();
      nextImage.src = src;
      preloadCache.set(src, nextImage);
    };

    const runGalleryProgress = () => {
      clearGalleryProgress();

      const tick = (timestamp) => {
        if (!lightboxDialog.open) {
          clearGalleryProgress();
          return;
        }

        if (!isPaused) {
          if (activeIsVideo && video && Number.isFinite(video.duration) && video.duration > 0) {
            const videoProgress = video.currentTime / video.duration;
            setProgressValue(activeGalleryIndex, videoProgress);
          } else if (!activeIsVideo) {
            const elapsed = imageElapsedBeforePause + timestamp - imageStartedAt;
            const imageProgress = elapsed / defaultImageDuration;
            setProgressValue(activeGalleryIndex, imageProgress);

            if (imageProgress >= 1) {
              goToGalleryItem(activeGalleryIndex + 1);
              return;
            }
          }
        }

        progressFrame = window.requestAnimationFrame(tick);
      };

      progressFrame = window.requestAnimationFrame(tick);
    };

    function showGalleryItem(index) {
      if (!activeGalleryItems.length || !image) {
        return;
      }

      clearGalleryProgress();
      activeGalleryIndex = (index + activeGalleryItems.length) % activeGalleryItems.length;
      const trigger = activeGalleryItems[activeGalleryIndex];
      const isVideo = trigger.dataset.lightboxType === "video";
      const mediaNode = trigger.querySelector("img, video");
      const mediaWidth = Number(mediaNode?.getAttribute("width")) || mediaNode?.videoWidth || mediaNode?.naturalWidth || 9;
      const mediaHeight = Number(mediaNode?.getAttribute("height")) || mediaNode?.videoHeight || mediaNode?.naturalHeight || 16;
      const mediaRatio = mediaWidth / mediaHeight;
      const frameWidth = isVideo || mediaRatio < 0.9
        ? "min(92vw, 30rem)"
        : mediaRatio > 1.18
          ? "min(94vw, 76rem)"
          : "min(92vw, 44rem)";
      const previousOrientation = lightboxDialog.dataset.galleryOrientation;
      const nextOrientation = isVideo
        ? "story"
        : mediaRatio > 1.18
          ? "landscape"
          : mediaRatio < 0.9
            ? "portrait"
            : "square";

      lightboxDialog.style.setProperty("--gallery-frame-aspect", `${mediaWidth} / ${mediaHeight}`);
      lightboxDialog.style.setProperty("--gallery-dialog-width", frameWidth);
      lightboxDialog.dataset.galleryOrientation = nextOrientation;
      lightboxDialog.dataset.galleryActiveType = isVideo ? "video" : "image";

      if (previousOrientation === "landscape" && (nextOrientation === "portrait" || nextOrientation === "story")) {
        backdropCloseGuardUntil = performance.now() + 2000;
        backdropCloseGuardArmed = false;
      }
      activeIsVideo = isVideo;
      imageElapsedBeforePause = 0;
      imageStartedAt = performance.now();
      setProgressState();

      if (video) {
        video.pause();
        video.removeAttribute("src");
        video.hidden = true;
        video.load();
      }

      if (image) {
        image.removeAttribute("src");
        image.alt = "";
        image.hidden = isVideo;
      }

      if (isVideo && video) {
        video.src = trigger.dataset.lightboxSrc;
        video.muted = true;
        video.defaultMuted = true;
        video.hidden = false;
        video.load();
        if (!isPaused) {
          video.play().catch(() => {});
        }
      } else if (image) {
        image.src = trigger.dataset.lightboxSrc;
        image.alt = trigger.dataset.lightboxAlt || "";
      }

      if (caption) {
        caption.textContent = (trigger.dataset.lightboxCaption || "").split("·")[0].trim();
      }

      if (counter) {
        const current = String(activeGalleryIndex + 1).padStart(2, "0");
        const total = String(activeGalleryItems.length).padStart(2, "0");
        counter.textContent = `${current} / ${total}`;
      }

      preloadGalleryItem(activeGalleryIndex + 1);
      runGalleryProgress();
    }

    const openGallery = (trigger, index) => {
      lastTrigger = trigger;
      const gallerySet = trigger.dataset.gallerySet;
      activeGalleryItems = gallerySet
        ? galleryTriggers.filter((item) => item.dataset.gallerySet === gallerySet)
        : galleryTriggers;
      const scopedIndex = activeGalleryItems.indexOf(trigger);
      isPaused = false;
      lightboxDialog.classList.remove("is-paused");
      toggleButton?.setAttribute("aria-pressed", "false");
      toggleButton?.setAttribute("aria-label", "Pausar galería");
      buildGalleryProgress();
      lockGalleryScroll();

      try {
        if (typeof lightboxDialog.showModal === "function" && !lightboxDialog.open) {
          lightboxDialog.showModal();
        }
      } catch (error) {
        unlockGalleryScroll();
        return;
      }

      showGalleryItem(scopedIndex >= 0 ? scopedIndex : index);
    };

    galleryTriggers.forEach((button, index) => {
      button.addEventListener("click", () => openGallery(button, index));
    });

    closeButtons.forEach((button) => {
      button.addEventListener("click", (event) => {
        event.stopPropagation();
        lightboxDialog.close();
      });
    });

    toggleButton?.addEventListener("click", (event) => {
      event.stopPropagation();
      setPausedState(!isPaused);
    });

    centerPlayButton?.addEventListener("click", (event) => {
      event.stopPropagation();
      setPausedState(false);
    });

    previousButton?.addEventListener("click", (event) => {
      event.stopPropagation();
      showGalleryItem(activeGalleryIndex - 1);
    });

    nextButton?.addEventListener("click", (event) => {
      event.stopPropagation();
      showGalleryItem(activeGalleryIndex + 1);
    });

    video?.addEventListener("loadedmetadata", () => {
      if (!activeIsVideo) {
        return;
      }

      if (!isPaused) {
        video.play().catch(() => {});
      }
      runGalleryProgress();
    });

    video?.addEventListener("ended", () => {
      showGalleryItem(activeGalleryIndex + 1);
    });

    frame?.addEventListener("pointerdown", (event) => {
      pointerStart = {
        x: event.clientX,
        y: event.clientY,
        target: event.target
      };
    });

    frame?.addEventListener("pointerup", (event) => {
      if (!pointerStart || pointerStart.target.closest?.("button")) {
        pointerStart = null;
        return;
      }

      const deltaX = event.clientX - pointerStart.x;
      const deltaY = event.clientY - pointerStart.y;
      const isSwipe = Math.abs(deltaX) > 42 && Math.abs(deltaX) > Math.abs(deltaY);

      if (isSwipe) {
        showGalleryItem(activeGalleryIndex + (deltaX < 0 ? 1 : -1));
        pointerStart = null;
        return;
      }

      const rect = frame.getBoundingClientRect();
      const relativeX = event.clientX - rect.left;
      showGalleryItem(activeGalleryIndex + (relativeX < rect.width / 2 ? -1 : 1));
      pointerStart = null;
    });

    lightboxDialog.addEventListener("click", (event) => {
      if (event.target === lightboxDialog) {
        if (performance.now() < backdropCloseGuardUntil && !backdropCloseGuardArmed) {
          backdropCloseGuardArmed = true;
          return;
        }

        lightboxDialog.close();
      }
    });

    lightboxDialog.addEventListener("keydown", (event) => {
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        showGalleryItem(activeGalleryIndex - 1);
      }

      if (event.key === "ArrowRight") {
        event.preventDefault();
        showGalleryItem(activeGalleryIndex + 1);
      }

      if (event.key === " ") {
        event.preventDefault();
        setPausedState(!isPaused);
      }
    });

    lightboxDialog.addEventListener("close", () => {
      clearGalleryProgress();
      backdropCloseGuardUntil = 0;
      backdropCloseGuardArmed = false;
      delete lightboxDialog.dataset.galleryActiveType;
      isPaused = false;
      lightboxDialog.classList.remove("is-paused");
      toggleButton?.setAttribute("aria-pressed", "false");
      toggleButton?.setAttribute("aria-label", "Pausar galería");
      unlockGalleryScroll();
      if (image) {
        image.removeAttribute("src");
      }
      if (video) {
        video.pause();
        video.removeAttribute("src");
        video.hidden = true;
        video.load();
      }
      setProgressState();

      if (lastTrigger) {
        lastTrigger.focus();
      }
    });
  }
})();
