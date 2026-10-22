export function initTheme({ document, window }) {
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const themeButtons = [...document.querySelectorAll("[data-theme-toggle]")];
  function selectTheme(theme) {
    document.documentElement.dataset.theme = theme;
    for (const button of themeButtons) {
      button.setAttribute(
        "aria-label",
        `Switch to ${theme === "light" ? "dark" : "light"} theme`,
      );
      button.setAttribute("aria-pressed", String(theme === "light"));
    }
  }

  let savedTheme = "dark";
  try {
    if (window.localStorage.getItem("portfolio-theme") === "light")
      savedTheme = "light";
  } catch {
    // Theme switching still works when browser storage is unavailable.
  }
  selectTheme(savedTheme);
  let requestedTheme = savedTheme;
  let themeTransition;
  let themeFallbackTimer;
  function changeTheme(theme) {
    requestedTheme = theme;
    themeTransition?.skipTransition();
    window.clearTimeout(themeFallbackTimer);
    document.documentElement.classList.remove("theme-changing");
    const update = () => selectTheme(requestedTheme);
    if (reducedMotion.matches) {
      update();
    } else if (document.startViewTransition) {
      themeTransition = document.startViewTransition(update);
      // Skipped transitions still apply their update; no rejected animation promise leaks.
      themeTransition.ready.catch(() => {});
      themeTransition.finished.catch(() => {});
    } else {
      document.documentElement.classList.add("theme-changing");
      update();
      themeFallbackTimer = window.setTimeout(() => {
        document.documentElement.classList.remove("theme-changing");
      }, 400);
    }
  }
  for (const button of themeButtons) {
    button.addEventListener("click", () => {
      const theme = requestedTheme === "light" ? "dark" : "light";
      changeTheme(theme);
      try {
        window.localStorage.setItem("portfolio-theme", theme);
      } catch {
        /* Keep the in-page choice. */
      }
    });
  }

}
