function reportFormHeight() {
  const form = document.querySelector<HTMLElement>("[data-quick-enquiry-form]");
  if (!form) return;
  const half = form.offsetHeight / 2;
  document.documentElement.style.setProperty("--qe-form-half", `${half}px`);
}

function boot() {
  reportFormHeight();

  let resizeTimer: number | undefined;
  window.addEventListener("resize", () => {
    window.clearTimeout(resizeTimer);
    resizeTimer = window.setTimeout(reportFormHeight, 150);
  });

  // Fonts/webfonts loading late can shift the form's height slightly.
  if ("fonts" in document) {
    (document as any).fonts.ready.then(reportFormHeight).catch(() => {});
  }
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", boot);
} else {
  boot();
}

document.addEventListener("astro:page-load", boot);
