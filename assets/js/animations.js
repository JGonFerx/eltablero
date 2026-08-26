(function () {
  const heroSequenceElements = document.querySelectorAll("[data-hero-sequence]");

  if (heroSequenceElements.length) {
    window.requestAnimationFrame(() => {
      window.setTimeout(() => {
        heroSequenceElements.forEach((element) => element.classList.add("is-visible"));
      }, 40);
    });
  }

  const revealElements = document.querySelectorAll("[data-reveal]");
  if (!revealElements.length || !("IntersectionObserver" in window)) {
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
