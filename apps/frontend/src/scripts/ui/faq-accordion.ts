/** FaqItem accordion behaviour — imported by the component so every page that uses it works */

const setOpen = (accordion: HTMLElement, open: boolean) => {
  const content = accordion.querySelector<HTMLElement>(
    "[data-accordion-content]",
  );
  const arrow = accordion.querySelector<HTMLElement>("[data-accordion-arrow]");
  const trigger = accordion.querySelector<HTMLElement>(
    "[data-accordion-trigger]",
  );
  if (!content || !arrow || !trigger) return;

  accordion.dataset.open = String(open);
  trigger.setAttribute("aria-expanded", String(open));
  content.style.height = open ? `${content.scrollHeight}px` : "0px";
  arrow.classList.toggle("rotate-45", open);
};

function initFaqAccordions() {
  const accordions = document.querySelectorAll<HTMLElement>(
    "[data-faq-accordion]",
  );

  accordions.forEach((accordion) => {
    if (accordion.dataset.ready) return;
    accordion.dataset.ready = "true";

    const trigger = accordion.querySelector<HTMLElement>(
      "[data-accordion-trigger]",
    );
    if (!trigger) return;

    // The server renders the first panel open with height:auto; only the
    // collapsed ones need pinning so the first click animates from zero.
    if (accordion.dataset.open !== "true") setOpen(accordion, false);

    trigger.addEventListener("click", () => {
      const wasOpen = accordion.dataset.open === "true";
      accordions.forEach((other) => setOpen(other, false));
      if (!wasOpen) setOpen(accordion, true);
    });

    // An open panel measures better as auto once the expand animation lands,
    // so late font/image loading cannot clip it.
    const content = accordion.querySelector<HTMLElement>(
      "[data-accordion-content]",
    );
    if (content) {
      content.addEventListener("transitionend", () => {
        if (accordion.dataset.open === "true") content.style.height = "auto";
      });
    }
  });

  // Open panels are height:auto, so a resize needs no re-measurement; this
  // only fixes panels still pinned to a pixel height from an earlier click.
  window.addEventListener("resize", () => {
    document
      .querySelectorAll<HTMLElement>(
        "[data-faq-accordion][data-open='true'] [data-accordion-content]",
      )
      .forEach((content) => {
        content.style.height = "auto";
      });
  });
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initFaqAccordions);
} else {
  initFaqAccordions();
}

document.addEventListener("astro:page-load", initFaqAccordions);
