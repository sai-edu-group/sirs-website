function initCampusTour(section: Element) {
  const playBtn = section.querySelector<HTMLButtonElement>("[data-campus-play]");
  const image = section.querySelector<HTMLImageElement>("[data-campus-image]");
  const tourWrap = section.querySelector<HTMLElement>("[data-campus-tour-wrap]");
  const tour = section.querySelector<HTMLIFrameElement>("[data-campus-tour]");
  const audioBtn = section.querySelector<HTMLButtonElement>("[data-campus-audio]");
  const audioEl = section.querySelector<HTMLAudioElement>("[data-campus-audio-el]");
  const mutedIcon = section.querySelector<HTMLElement>("[data-campus-audio-icon-muted]");
  const unmutedIcon = section.querySelector<HTMLElement>("[data-campus-audio-icon-unmuted]");
  const card = section.querySelector<HTMLElement>("[data-campus-card]");
  const pills = section.querySelector<HTMLElement>("[data-campus-pills]");

  // The 360 viewer is heavy (its own player script plus panorama tiles), so
  // it is not loaded with the page. It starts loading, hidden, once this
  // section is within about 600px of the viewport (or the play button
  // is hovered), so it is normally ready by the time play is clicked.
  // Clicking play first simply starts the load straight away.
  const loadTour = () => {
    if (!tour || tour.getAttribute("src") || !tour.dataset.src) return;
    tour.src = tour.dataset.src;
  };

  // Fade the tour in over the grey backdrop only once it has loaded
  tour?.addEventListener("load", () => {
    if (tour.getAttribute("src")) tour.dataset.loaded = "";
  });

  const connection = (navigator as Navigator & {
    connection?: { saveData?: boolean };
  }).connection;

  if (!connection?.saveData) {
    playBtn?.addEventListener("pointerenter", loadTour, { once: true });
    playBtn?.addEventListener("focus", loadTour, { once: true });

    if ("IntersectionObserver" in window) {
      const nearView = new IntersectionObserver(
        (entries) => {
          if (entries.some((entry) => entry.isIntersecting)) {
            nearView.disconnect();
            loadTour();
          }
        },
        { rootMargin: "600px 0px" },
      );
      nearView.observe(section);
    }
  }

  playBtn?.addEventListener(
    "click",
    () => {
      loadTour();
      tourWrap?.classList.remove("opacity-0", "pointer-events-none");
      tourWrap?.classList.add("opacity-100", "pointer-events-auto");
      image?.classList.add("opacity-0");
      playBtn.classList.add("opacity-0", "pointer-events-none");
      audioBtn?.classList.add("opacity-0", "pointer-events-none");
      // Clear the overlays so nothing sits on top of the tour: the distance
      // tags fade out, and the "49 Acres" card fades out and is then taken
      // out of the layout so no empty gap is left under the tour.
      pills?.classList.add("opacity-0");
      card?.classList.add("opacity-0", "pointer-events-none");
      setTimeout(() => card?.classList.add("hidden"), 500);
    },
    { once: true },
  );

  audioBtn?.addEventListener("click", () => {
    if (!audioEl) return;
    if (audioEl.paused) {
      audioEl.play().catch(() => {});
    } else {
      audioEl.pause();
    }
  });

  audioEl?.addEventListener("play", () => {
    mutedIcon?.classList.add("hidden");
    unmutedIcon?.classList.remove("hidden");
  });

  audioEl?.addEventListener("pause", () => {
    mutedIcon?.classList.remove("hidden");
    unmutedIcon?.classList.add("hidden");
  });
}

function boot() {
  document
    .querySelectorAll('[data-section="Home Campus Tour"]')
    .forEach((section) => initCampusTour(section));
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", boot);
} else {
  boot();
}

document.addEventListener("astro:page-load", boot);
