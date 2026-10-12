import type { Saioneer, Talent } from "@/data/home/saioneers";

/** Text fade (left column) */
const FADE_MS = 300;
/** Photo slide (right column): each card slides on its own, one after another */
const SLIDE_MS = 700;
const SLIDE_STAGGER_MS = 130;
const SLIDE_EASING = "cubic-bezier(0.65, 0, 0.35, 1)";

function initSaioneers(section: HTMLElement) {
  const people = JSON.parse(section.dataset.saioneers ?? "[]") as Saioneer[];
  const shuffleBtn = section.querySelector<HTMLButtonElement>(
    "[data-saioneer-shuffle]",
  );
  const nameEl = section.querySelector<HTMLElement>("[data-saioneer-name]");
  const metaEl = section.querySelector<HTMLElement>("[data-saioneer-meta]");
  const quoteEl = section.querySelector<HTMLElement>("[data-saioneer-quote]");
  const cards = Array.from(
    section.querySelectorAll<HTMLElement>("[data-saioneer-card]"),
  );
  const fadeEls = Array.from(
    section.querySelectorAll<HTMLElement>("[data-saioneer-fade]"),
  );

  if (people.length < 2 || !shuffleBtn || !nameEl || !metaEl || !quoteEl) {
    shuffleBtn?.classList.add("hidden");
    return;
  }

  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  let current = 0;
  let busy = false;

  /** Pick a random student other than the one on screen */
  function pickNext() {
    let next = current;
    while (next === current) next = Math.floor(Math.random() * people.length);
    return next;
  }

  /** Fill one slide (placeholder / photo / label) with a talent */
  function fillSlide(slide: HTMLElement, talent: Talent) {
    const img = slide.querySelector<HTMLImageElement>("[data-card-img]");
    const placeholder = slide.querySelector<HTMLElement>(
      "[data-card-placeholder]",
    );
    const label = slide.querySelector<HTMLElement>("[data-card-label]");
    if (!img || !placeholder || !label) return;

    label.textContent = talent.label;
    placeholder.dataset.tone = talent.tone;

    if (talent.image) {
      img.src = talent.image;
      img.alt = talent.imageAlt ?? "";
      img.classList.remove("hidden");
      placeholder.classList.add("hidden");
    } else {
      img.removeAttribute("src");
      img.alt = "";
      img.classList.add("hidden");
      placeholder.classList.remove("hidden");
    }
  }

  /** Slide a new photo into a card while the old one slides out */
  function slideCard(card: HTMLElement, talent: Talent, delay: number) {
    const outgoing = card.querySelector<HTMLElement>("[data-slide]");
    if (!outgoing) return Promise.resolve();

    const incoming = outgoing.cloneNode(true) as HTMLElement;
    fillSlide(incoming, talent);

    if (reduced) {
      outgoing.replaceWith(incoming);
      return Promise.resolve();
    }

    // Sits off to the right until its animation starts
    incoming.style.transform = "translateX(100%)";
    card.appendChild(incoming);

    const timing = {
      duration: SLIDE_MS,
      delay,
      easing: SLIDE_EASING,
      fill: "both" as FillMode,
    };
    const out = outgoing.animate(
      [{ transform: "translateX(0)" }, { transform: "translateX(-100%)" }],
      timing,
    );
    const inn = incoming.animate(
      [{ transform: "translateX(100%)" }, { transform: "translateX(0)" }],
      timing,
    );

    // Resolve when both are done, with a timer as a safety net
    return Promise.race([
      Promise.all([out.finished, inn.finished]).catch(() => {}),
      new Promise((resolve) => setTimeout(resolve, SLIDE_MS + delay + 300)),
    ]).then(() => {
      out.cancel();
      inn.cancel();
      incoming.style.transform = "";
      outgoing.remove();
    });
  }

  /** Make sure the next student's photos are ready before they slide in */
  function preload(person: Saioneer) {
    return Promise.all(
      person.talents.map((talent) =>
        talent.image
          ? new Promise<void>((resolve) => {
              const img = new Image();
              img.onload = img.onerror = () => resolve();
              img.src = talent.image!;
            })
          : Promise.resolve(),
      ),
    );
  }

  shuffleBtn.addEventListener("click", async () => {
    if (busy) return;
    busy = true;

    const nextIndex = pickNext();
    const next = people[nextIndex];

    // Left text fades out while the photos get ready
    fadeEls.forEach((el) => el.setAttribute("data-swapping", ""));
    await Promise.all([
      preload(next),
      new Promise((resolve) => setTimeout(resolve, FADE_MS)),
    ]);

    current = nextIndex;

    // Text fades back in with the new student...
    nameEl!.textContent = next.name;
    metaEl!.textContent = `From ${next.from} · ${next.grade}`;
    quoteEl!.textContent = next.quote;
    fadeEls.forEach((el) => el.removeAttribute("data-swapping"));

    // ...and each photo card slides to its next photo, one after another
    await Promise.all(
      cards.map((card, index) =>
        slideCard(card, next.talents[index], index * SLIDE_STAGGER_MS),
      ),
    );

    busy = false;
  });
}

function boot() {
  document
    .querySelectorAll<HTMLElement>('[data-section="Meet a SAIoneer"]')
    .forEach(initSaioneers);
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", boot);
} else {
  boot();
}

document.addEventListener("astro:page-load", boot);
