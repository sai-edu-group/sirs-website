import { initEmblaRoot } from "@/scripts/embla";

function boot() {
  const root = document.getElementById("testimonial-slider");
  if (!root) return;

  /** Init the slider */
  initEmblaRoot(root, {
    autoplay: true,
    delay: 4000,
  });

  const modal = document.getElementById("testimonial-modal");
  const iframe = document.getElementById("testimonial-iframe") as HTMLIFrameElement | null;
  const closeTargets = document.querySelectorAll("[data-modal-close]");
  const triggers = document.querySelectorAll("[data-video-trigger]");

  const html = document.documentElement;

  /** Get the embed URL for the video */
  const getEmbedUrl = (url: string) => {
    try {
      // Parse the URL
      const parsed = new URL(url);

      // youtube.com/watch?v=...
      if (parsed.hostname.includes("youtube")) {
        const videoId = parsed.searchParams.get("v");
        const list = parsed.searchParams.get("list");
        let finalUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1`;
        if (list) finalUrl += `&list=${list}`;
        return finalUrl;
      }

      return url;
    } catch (err) {
      return url;
    }
  };

  /** Open the modal and set the video */
  const openModal = (url: string) => {
    if (!modal || !iframe) return;
    iframe.src = getEmbedUrl(url);
    modal.classList.add("open");
    modal.setAttribute("aria-hidden", "false");
    html.classList.add("overflow-hidden");
    modal.setAttribute("tabindex", "-1");
    (modal as HTMLElement).focus();
  };

  /** Close the modal and reset the video */
  const closeModal = () => {
    if (!modal || !iframe) return;
    iframe.removeAttribute("src");
    modal.classList.remove("open");
    modal.setAttribute("aria-hidden", "true");
    html.classList.remove("overflow-hidden");
  };

  /** Close the modal and reset the video */
  triggers.forEach((trigger) => {
    trigger.addEventListener("click", () => {
      const url = trigger.getAttribute("data-video-url") || "";
      openModal(url);
    });
  });

  /** Close the modal when the close button is clicked */
  closeTargets.forEach((closeTarget) => {
    closeTarget.addEventListener("click", closeModal);
  });

  /** Close the modal when the escape key is pressed */
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeModal();
    }
  });
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", boot);
} else {
  boot();
}

document.addEventListener("astro:page-load", boot);
