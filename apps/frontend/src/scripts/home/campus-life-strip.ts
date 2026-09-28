function initStrip(viewport: HTMLElement) {
  const prev = document.querySelector("[data-strip-prev]");
  const next = document.querySelector("[data-strip-next]");
  const INTERVAL = 2000;
  let timer: number | undefined;

  const step = () => {
    const first = viewport.querySelector("figure");
    if (!first) return 320;
    const gap = 24;
    return (first as HTMLElement).offsetWidth + gap;
  };

  const atEnd = () => viewport.scrollLeft + viewport.clientWidth >= viewport.scrollWidth - 4;

  function advance() {
    if (atEnd()) {
      viewport.scrollTo({ left: 0, behavior: "smooth" });
    } else {
      viewport.scrollBy({ left: step(), behavior: "smooth" });
    }
  }

  function schedule() {
    window.clearInterval(timer);
    timer = window.setInterval(advance, INTERVAL);
  }

  prev?.addEventListener("click", () => {
    viewport.scrollBy({ left: -step(), behavior: "smooth" });
    schedule();
  });
  next?.addEventListener("click", () => {
    advance();
    schedule();
  });

  viewport.addEventListener("mouseenter", () => window.clearInterval(timer));
  viewport.addEventListener("mouseleave", schedule);

  schedule();
}

function boot() {
  const viewport = document.querySelector<HTMLElement>("[data-strip-viewport]");
  if (viewport) initStrip(viewport);
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", boot);
} else {
  boot();
}

document.addEventListener("astro:page-load", boot);
