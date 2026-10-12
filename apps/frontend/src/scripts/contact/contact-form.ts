// ENUMS //
import { EVENTS } from "@/enums/analytics.enum";

// SCRIPTS //
import {
  setupFormStartTracking,
  setupInViewTracking,
  trackEvent,
  trackFormViewEvent,
} from "@/scripts/analytics";

// SERVICES //
import { contactEnquiryRequest } from "@/services/api/form.api.service";

const SUBMIT_ERROR =
  "Something went wrong while submitting your enquiry. Please try again.";

type FormField = HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;

const init = () => {
  const form = document.querySelector(
    "form#contact-enquiry-form",
  ) as HTMLFormElement | null;
  const step1 = document.getElementById("step-1");
  const thankYou = document.getElementById("thank-you");
  const next1 = document.getElementById("next-1") as HTMLButtonElement | null;

  if (!form) return;

  // Analytics: form started + form viewed
  setupFormStartTracking(form, EVENTS.ENQUIRY_FORM_STARTED);
  setupInViewTracking("contact-form", () => {
    trackFormViewEvent("contact-form", EVENTS.ENQUIRY_FORM_VIEWED);
  });

  // Initial state: the thank-you panel is `hidden` in the markup, so it never
  // flashes before JavaScript runs; only the form is shown.
  step1?.classList.remove("hidden");
  thankYou?.classList.add("hidden");
  thankYou?.classList.remove("flex");

  // Enter key / any native submit must never reload the page
  form.addEventListener("submit", (e) => e.preventDefault());

  const validateStep = (stepEl: HTMLElement | null) => {
    if (!stepEl) return false;
    const fields = stepEl.querySelectorAll<FormField>("input, select, textarea");
    let valid = true;

    fields.forEach((field) => {
      const errorText = field
        .closest("[data-field]")
        ?.querySelector("[data-error]");
      let fieldValid = true;
      const value = field.value.trim();

      // Required check
      if (field.hasAttribute("required") && !value) fieldValid = false;

      // Email check
      if (field.type === "email" && value !== "") {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(value)) fieldValid = false;
      }

      // NAME VALIDATION: should NOT contain digits
      if (field.name === "fullName" && value !== "") {
        if (/\d/.test(value)) fieldValid = false;
      }

      // PHONE VALIDATION: should contain ONLY digits
      if (field.name === "phoneNumber" && value !== "") {
        const notNumbers = /\D/.test(value);
        if (notNumbers || field.value.length !== 10) fieldValid = false;
      }

      // Style updates
      if (!fieldValid) {
        valid = false;
        field.classList.add("border-red-500", "focus:ring-red-500");
        errorText?.classList.remove("hidden");
      } else {
        field.classList.remove("border-red-500", "focus:ring-red-500");
        errorText?.classList.add("hidden");
      }
    });

    return valid;
  };

  // Submit handler (Send Message)
  next1?.addEventListener("click", async (e) => {
    e.preventDefault();

    const originalText = next1.innerText;

    if (!validateStep(step1)) return;

    // Disable button during request
    next1.disabled = true;
    next1.innerText = "Sending...";

    const payload = Object.fromEntries(new FormData(form).entries());

    try {
      const response = await contactEnquiryRequest(payload);

      if (response.status === false) {
        alert(SUBMIT_ERROR);
        next1.disabled = false;
        next1.innerText = originalText;
        return;
      }

      trackEvent(EVENTS.ENQUIRY_FORM_COMPLETED, payload);

      // Show thank you screen
      step1?.classList.add("hidden");
      thankYou?.classList.remove("hidden");
      thankYou?.classList.add("flex");
    } catch (err) {
      console.error("Failed to submit enquiry:", err);
      alert(SUBMIT_ERROR);
      next1.disabled = false;
      next1.innerText = originalText;
    }
  });
};

if (document.readyState === "loading") {
  window.addEventListener("DOMContentLoaded", init);
} else {
  init();
}
