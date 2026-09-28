interface HeroEl extends HTMLElement {
  dataset: DOMStringMap;
}

function initHero(hero: HeroEl) {
  const headlineEl = hero.querySelector<HTMLElement>("[data-hero-headline]");
  const textCol = hero.querySelector<HTMLElement>("[data-hero-textcol]");
  const dots = Array.from(hero.querySelectorAll<HTMLButtonElement>(".hero-dot"));
  const videoStage = hero.querySelector<HTMLElement>("[data-hero-video-stage]");
  const videos = Array.from(hero.querySelectorAll<HTMLVideoElement>("[data-hero-video]"));
  if (!headlineEl || dots.length < 2) return;

  const headlines = JSON.parse(headlineEl.dataset.slides ?? "[]") as string[];

  const interval = Number(hero.dataset.interval ?? 5000);
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduced || headlines.length < 2) return;

  let headlineIndex = 0;
  let timer: number | undefined;
  let visible = true;
  let focused = !document.hidden;

  function loadVideo(video: HTMLVideoElement) {
    const source = video.querySelector("source");
    if (source?.dataset.src && !source.getAttribute("src")) {
      source.src = source.dataset.src;
      video.load();
    }
  }

  if (videos.length > 1) {
    videoStage?.classList.add("is-enhanced");
    videos[0]?.classList.add("is-active");
    loadVideo(videos[1]);
  }

  function setActiveDot(activeIndex: number) {
    dots.forEach((dot, dotIndex) => {
      const active = dotIndex === activeIndex;
      dot.classList.toggle("bg-white", active);
      dot.classList.toggle("bg-white/35", !active);
      dot.setAttribute("aria-current", active ? "true" : "false");
    });
  }

  /** Chrome will sometimes abort play() on a still-transparent
   * (opacity: 0) video with "video-only background media was paused to
   * save power", misreading it as backgrounded before its fade-in has
   * had a chance to start. A single short-delayed retry reliably
   * succeeds once the opacity transition is actually under way. */
  function attemptPlay(video: HTMLVideoElement) {
    video.play().catch((err) => {
      if (err?.name === "AbortError") {
        window.setTimeout(() => video.play().catch(() => {}), 60);
      }
    });
  }

  function crossfadeVideo(nextIndex: number) {
    const nextVideo = videos[nextIndex];
    const currentVideo = videos[headlineIndex];
    if (!nextVideo || nextVideo === currentVideo) return;

    loadVideo(nextVideo);
    nextVideo.currentTime = 0;
    attemptPlay(nextVideo);
    nextVideo.classList.add("is-active");

    if (currentVideo) {
      currentVideo.classList.remove("is-active");
      window.setTimeout(() => currentVideo.pause(), 700);
    }

    loadVideo(videos[(nextIndex + 1) % videos.length]);
  }

  function goTo(nextIndex: number) {
    if (!headlineEl) return;

    crossfadeVideo(nextIndex);

    // The text block is vertically centered in the hero, so it re-centers
    // whenever the headline's line count changes. A FLIP (First-Last-
    // Invert-Play) turns that instant reflow snap into a smooth glide:
    // measure where the block sits now, swap the text, measure where it
    // lands, then animate from the old spot to the new one.
    const firstRect = textCol?.getBoundingClientRect();

    headlineEl.style.opacity = "0";
    headlineEl.style.transform = "translateY(-8px)";

    window.setTimeout(() => {
      headlineEl.textContent = headlines[nextIndex];

      if (textCol && firstRect) {
        const lastRect = textCol.getBoundingClientRect();
        const deltaY = firstRect.top - lastRect.top;
        if (deltaY !== 0) {
          textCol.style.transition = "none";
          textCol.style.transform = `translateY(${deltaY}px)`;
          // A single rAF (or even an offsetHeight read) isn't reliably
          // enough to force the inverted state to paint before the
          // transition is switched back on — the browser can still
          // batch both style changes into the same frame, leaving the
          // transform stuck instead of animating. The first rAF is
          // queued for the frame that follows the paint of the inverted
          // state, and the second rAF then starts the transition on the
          // frame after that.
          requestAnimationFrame(() => {
            requestAnimationFrame(() => {
              textCol.style.transition = "transform 550ms cubic-bezier(0.4, 0, 0.2, 1)";
              textCol.style.transform = "translateY(0)";
            });
          });
        }
      }

      headlineEl.style.transform = "translateY(8px)";
      void headlineEl.offsetWidth;
      headlineEl.style.opacity = "1";
      headlineEl.style.transform = "translateY(0)";
    }, 350);
    headlineIndex = nextIndex;
    setActiveDot(headlineIndex);
  }

  function schedule() {
    window.clearTimeout(timer);
    if (!visible || !focused) return;
    // goTo() only performs a single transition, so the timeout callback
    // must re-arm the timer itself or the slider stops after one hop.
    timer = window.setTimeout(() => {
      goTo((headlineIndex + 1) % headlines.length);
      schedule();
    }, interval);
  }

  dots.forEach((dot, dotIndex) => {
    dot.addEventListener("click", () => {
      goTo(dotIndex);
      schedule();
    });
  });

  document.addEventListener("visibilitychange", () => {
    focused = !document.hidden;
    if (!focused) window.clearTimeout(timer);
    else schedule();
  });

  if ("IntersectionObserver" in window) {
    new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        if (!visible) window.clearTimeout(timer);
        else schedule();
      },
      { threshold: 0.1 },
    ).observe(hero);
  }

  schedule();
}

function boot() {
  document.querySelectorAll<HTMLElement>("[data-hero]").forEach((el) => initHero(el));
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", boot);
} else {
  boot();
}

// Re-initialize after Astro view transitions (if using them)
document.addEventListener("astro:page-load", boot);
