(function () {
  const stage = document.querySelector("[data-member-card-3d]");
  const object = stage?.querySelector("[data-member-card-object]");

  if (!stage || !object) {
    return;
  }

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const state = {
    dragging: false,
    pointerId: null,
    lastX: 0,
    lastY: 0,
    rotateX: -8,
    rotateY: -18,
    autoRotation: -18,
  };

  const setRotation = () => {
    stage.style.setProperty("--member-card-rotate-x", `${state.rotateX.toFixed(2)}deg`);
    stage.style.setProperty("--member-card-rotate-y", `${state.rotateY.toFixed(2)}deg`);
  };

  const startDrag = (event) => {
    state.dragging = true;
    state.pointerId = event.pointerId;
    state.lastX = event.clientX;
    state.lastY = event.clientY;
    stage.classList.add("is-dragging");
    stage.setPointerCapture?.(event.pointerId);
  };

  const moveDrag = (event) => {
    if (!state.dragging || event.pointerId !== state.pointerId) {
      return;
    }

    const deltaX = event.clientX - state.lastX;
    const deltaY = event.clientY - state.lastY;
    state.rotateY += deltaX * 0.28;
    state.rotateX = Math.max(-26, Math.min(18, state.rotateX - deltaY * 0.16));
    state.autoRotation = state.rotateY;
    state.lastX = event.clientX;
    state.lastY = event.clientY;
    setRotation();
  };

  const endDrag = (event) => {
    if (event.pointerId !== state.pointerId) {
      return;
    }

    state.dragging = false;
    state.pointerId = null;
    stage.classList.remove("is-dragging");
    stage.releasePointerCapture?.(event.pointerId);
  };

  stage.addEventListener("pointerdown", startDrag);
  stage.addEventListener("pointermove", moveDrag);
  stage.addEventListener("pointerup", endDrag);
  stage.addEventListener("pointercancel", endDrag);

  if (!reduceMotion) {
    let lastTime = performance.now();

    const tick = (time) => {
      const delta = Math.min(time - lastTime, 48);
      lastTime = time;

      if (!state.dragging) {
        state.autoRotation += delta * 0.004;
        state.rotateY += (state.autoRotation - state.rotateY) * 0.025;
        setRotation();
      }

      window.requestAnimationFrame(tick);
    };

    window.requestAnimationFrame(tick);
  }

  setRotation();
})();
