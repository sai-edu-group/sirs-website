function initCampusTour(section: Element) {
  const playBtn = section.querySelector<HTMLButtonElement>("[data-campus-play]");
  const image = section.querySelector<HTMLImageElement>("[data-campus-image]");
  const videoWrap = section.querySelector<HTMLElement>("[data-campus-video-wrap]");
  const video = section.querySelector<HTMLIFrameElement>("[data-campus-video]");
  const audioBtn = section.querySelector<HTMLButtonElement>("[data-campus-audio]");
  const audioEl = section.querySelector<HTMLAudioElement>("[data-campus-audio-el]");
  const mutedIcon = section.querySelector<HTMLElement>("[data-campus-audio-icon-muted]");
  const unmutedIcon = section.querySelector<HTMLElement>("[data-campus-audio-icon-unmuted]");
  const card = section.querySelector<HTMLElement>("[data-campus-card]");

  playBtn?.addEventListener(
    "click",
    () => {
      videoWrap?.classList.remove("opacity-0", "pointer-events-none");
      videoWrap?.classList.add("opacity-100", "pointer-events-auto");
      image?.classList.add("opacity-0");
      playBtn.classList.add("opacity-0", "pointer-events-none");
      audioBtn?.classList.add("opacity-0", "pointer-events-none");
      // Slide the card clear of the video on mobile/tablet, where it
      // rests with a slight overlap. Set as an inline style (not a
      // Tailwind class) since the class only exists in this script, not
      // in any scanned markup, so Tailwind never generates its CSS.
      // Guarded to <lg so it doesn't fight the lg: overlap on desktop.
      if (card && !window.matchMedia("(min-width: 1024px)").matches) {
        card.style.marginTop = "2rem";
      }

      video?.contentWindow?.postMessage(
        JSON.stringify({ event: "command", func: "playVideo", args: [] }),
        "https://www.youtube.com",
      );
      // cc_load_policy=0 on the embed URL isn't always enough to keep
      // captions off, so also force them off via the player API once
      // it's ready to receive commands.
      video?.contentWindow?.postMessage(
        JSON.stringify({ event: "command", func: "unloadModule", args: ["captions"] }),
        "https://www.youtube.com",
      );
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
