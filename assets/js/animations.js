(function () {
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const heroSequenceElements = document.querySelectorAll("[data-hero-sequence]");

  if (heroSequenceElements.length) {
    if (reduceMotion) {
      heroSequenceElements.forEach((element) => element.classList.add("is-visible"));
    } else {
      window.requestAnimationFrame(() => {
        window.setTimeout(() => {
          heroSequenceElements.forEach((element) => element.classList.add("is-visible"));
        }, 40);
      });
    }
  }

  const revealElements = document.querySelectorAll("[data-reveal]");
  if (!revealElements.length || reduceMotion || !("IntersectionObserver" in window)) {
    revealElements.forEach((element) => element.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries, currentObserver) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          currentObserver.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.15,
      rootMargin: "0px 0px -40px"
    }
  );

  revealElements.forEach((element) => observer.observe(element));
})();
