function boot() {
  const statsSection = document.querySelector('[data-section="Home Stats"]');
  if (!statsSection) return;

  const observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        statsSection.classList.add("in-view");
        observer.disconnect();
      }
    },
    // Fires once the section's midpoint crosses the viewport's midpoint,
    // instead of as soon as a sliver of the section appears — otherwise
    // most of the draw animation finishes before it's even in view.
    { rootMargin: "-50% 0px -50% 0px" },
  );
  observer.observe(statsSection);
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", boot);
} else {
  boot();
}

document.addEventListener("astro:page-load", boot);
