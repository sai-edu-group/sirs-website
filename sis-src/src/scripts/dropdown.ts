/** Initialize all dropdowns on the page */
function initDropdowns() {
  const dropdowns = document.querySelectorAll("[data-dropdown]");

  dropdowns.forEach((dropdown) => {
    const btn = dropdown.querySelector("[data-button]") as HTMLButtonElement;
    const menu = dropdown.querySelector("[data-menu]") as HTMLElement;
    const label = dropdown.querySelector("[data-label]") as HTMLElement;
    const input = dropdown.querySelector("[data-input]") as HTMLInputElement;
    const arrow = dropdown.querySelector("[data-arrow]") as HTMLElement;
    const options = dropdown.querySelectorAll("[data-option]");

    if (!btn || !menu || !label || !input || !arrow) return;

    // Open/Close dropdown
    btn.addEventListener("click", (e) => {
      e.stopPropagation();

      const isCurrentlyOpen = !menu.classList.contains("hidden");

      // Close all other dropdowns
      closeAllDropdowns();

      // Toggle current dropdown
      if (isCurrentlyOpen) {
        closeDropdown(dropdown);
      } else {
        openDropdown(dropdown);
      }
    });

    // Prevent menu clicks from closing
    menu.addEventListener("click", (e) => {
      e.stopPropagation();
    });

    // Select option
    options.forEach((option) => {
      option.addEventListener("click", () => {
        const optionElement = option as HTMLElement;
        label.textContent = optionElement.textContent;
        label.style.color = "#314158";
        input.value = optionElement.dataset.value || "";
        closeDropdown(dropdown);
      });
    });
  });

  // Close all dropdowns on outside click
  document.addEventListener("click", () => {
    closeAllDropdowns();
  });
}

/** Open a dropdown */
function openDropdown(dropdown: Element) {
  const menu = dropdown.querySelector("[data-menu]") as HTMLElement;
  const arrow = dropdown.querySelector("[data-arrow]") as HTMLElement;

  // Show menu and rotate arrow
  if (menu && arrow) {
    menu.classList.remove("hidden");
    arrow.style.transform = "rotate(180deg)";
  }
}

/** Close a dropdown */
function closeDropdown(dropdown: Element) {
  const menu = dropdown.querySelector("[data-menu]") as HTMLElement;
  const arrow = dropdown.querySelector("[data-arrow]") as HTMLElement;

  if (menu && arrow) {
    menu.classList.add("hidden");
    arrow.style.transform = "rotate(0deg)";
  }
}

/** Close all dropdowns on the page */
function closeAllDropdowns() {
  document.querySelectorAll("[data-dropdown]").forEach((dropdown) => {
    closeDropdown(dropdown);
  });
}

// Initialize on DOM ready
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initDropdowns);
} else {
  initDropdowns();
}

// Re-initialize after Astro view transitions (if using them)
document.addEventListener("astro:page-load", initDropdowns);
