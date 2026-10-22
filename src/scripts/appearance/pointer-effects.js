export function initPointerEffects({ document, window }) {
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");
  for (const field of document.querySelectorAll(
    ".interactive-field",
  )) {
    let frame;
    field.addEventListener("pointermove", (event) => {
      if (reducedMotion.matches || !finePointer.matches) return;
      window.cancelAnimationFrame(frame);
      frame = window.requestAnimationFrame(() => {
        const bounds = field.getBoundingClientRect();
        field.style.setProperty(
          "--pointer-x",
          `${event.clientX - bounds.left}px`,
        );
        field.style.setProperty("--pointer-y", `${event.clientY - bounds.top}px`);
      });
    });
    field.addEventListener("pointerleave", () => {
      window.cancelAnimationFrame(frame);
      field.style.removeProperty("--pointer-x");
      field.style.removeProperty("--pointer-y");
    });
  }

}
