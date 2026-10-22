import EmblaCarousel from "embla-carousel";
import EmblaCarouselAutoplay from "embla-carousel-autoplay";
import EmblaCarouselAutoHeight from "embla-carousel-auto-height";
import EmblaCarouselFade from "embla-carousel-fade";

type EmblaOptions = {
  autoplay?: boolean;
  delay?: number;
  [key: string]: any;
};

export const initEmblaRoot = (
  root: HTMLElement,
  options: EmblaOptions = {},
) => {
  const viewport = root.querySelector<HTMLElement>("[data-embla-viewport]");
  if (!viewport) return;

  const embla = EmblaCarousel(
    viewport,
    {
      align: "start",
      containScroll: false,
      loop: true,
      dragFree: false,
      duration: 15,
      ...options,
    },
    [
      EmblaCarouselAutoHeight(),
      EmblaCarouselFade(),
      options.autoplay
        ? EmblaCarouselAutoplay({ delay: options.delay || 3000 })
        : undefined,
    ].filter(Boolean),
  );

  const snaps = embla.scrollSnapList();

  // Prev / Next
  const prevBtn = root.querySelector<HTMLElement>("[data-embla-prev]");
  const nextBtn = root.querySelector<HTMLElement>("[data-embla-next]");

  if (snaps.length > 1) {
    prevBtn?.style.setProperty("display", "flex");
    nextBtn?.style.setProperty("display", "flex");

    prevBtn?.addEventListener("click", () => embla.scrollPrev());
    nextBtn?.addEventListener("click", () => embla.scrollNext());
  }

  // Dots
  const dotsHost = root.querySelector<HTMLElement>("[data-embla-dots]");

  const buildDots = () => {
    if (!dotsHost) return [];
    dotsHost.innerHTML = "";

    if (snaps.length <= 1) return [];

    return snaps.map((_, i) => {
      const btn = document.createElement("button");
      btn.className =
        "embla-dot bg-n-300 size-1.5 md:size-2.5 rounded-full transition-[background-color,transform] duration-150 aria-selected:scale-110 aria-selected:bg-orange-500";
      btn.addEventListener("click", () => embla.scrollTo(i));
      dotsHost.appendChild(btn);
      return btn;
    });
  };

  let dots = buildDots();

  const setSelectedDot = () => {
    const selected = embla.selectedScrollSnap();
    dots.forEach((dot, i) => {
      const active = i === selected;
      dot.setAttribute("aria-selected", active ? "true" : "false");
      dot.classList.toggle("scale-110", active);
    });
  };

  embla.on("select", setSelectedDot);
  embla.on("reInit", () => {
    dots = buildDots();
    setSelectedDot();
  });

  setSelectedDot();

  // embla-carousel-autoplay silently no-ops if document.visibilityState
  // isn't "visible" at the exact moment it initializes (a known timing
  // edge case during initial page load). Re-kick it a frame later so a
  // late/inconsistent visibility read at init time can't permanently
  // prevent autoplay from ever starting.
  if (options.autoplay) {
    const autoplay = embla.plugins().autoplay;
    if (autoplay) {
      requestAnimationFrame(() => {
        if (!autoplay.isPlaying()) autoplay.play();
      });
    }
  }

  return embla;
};
