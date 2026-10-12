// ENUMS //
import { EVENTS } from "@/enums/analytics.enum";

// SCRIPTS //
import {
  setupFormStartTracking,
  trackFormCompletionEvent,
} from "@/scripts/analytics";

// SERVICES //
import { admissionEnquiryRequest } from "@/services/api/form.api.service";

declare global {
  interface Window {
    /** Set by the LeadSquared tracker script, when it is on the page */
    MXCProspectId?: string;
  }
}

/** Lead source label stored on the LeadSquared lead (mx_Source_V2) */
const LEAD_SOURCE = "SIRS Website Home Page";
const SUCCESS_VISIBLE_MS = 6000;
const SUBMIT_ERROR =
  "Something went wrong submitting your enquiry. Please try again.";

function reportFormHeight() {
  const form = document.querySelector<HTMLElement>("[data-quick-enquiry-form]");
  if (!form) return;
  const half = form.offsetHeight / 2;
  document.documentElement.style.setProperty("--qe-form-half", `${half}px`);
}

/** Quick enquiry form: validate, send to LeadSquared, show the result */
function initEnquiryForm(form: HTMLFormElement) {
  if (form.dataset.ready) return;
  form.dataset.ready = "true";

  setupFormStartTracking(form);

  const submitBtn = form.querySelector<HTMLButtonElement>(
    "[data-quick-enquiry-submit]",
  );
  const success = form.querySelector<HTMLElement>(
    "[data-quick-enquiry-success]",
  );
  const nameInput = form.querySelector<HTMLInputElement>('[name="studentName"]');
  const gradeInput = form.querySelector<HTMLInputElement>('[name="grade"]');
  const phoneInput = form.querySelector<HTMLInputElement>('[name="phone"]');
  if (!submitBtn || !nameInput || !gradeInput || !phoneInput) return;

  const submitLabel = submitBtn.textContent?.trim() ?? "Send";

  const errorEl = (field: string) =>
    form.querySelector<HTMLElement>(`[data-error="${field}"]`);

  const setError = (field: string, message: string, input?: HTMLElement) => {
    const el = errorEl(field);
    if (el) {
      el.textContent = message;
      el.classList.toggle("hidden", !message);
    }
    input?.classList.toggle("ring-2", !!message);
    input?.classList.toggle("ring-red-500", !!message);
  };

  /** Returns true when every field is fine; shows a message under any that is not */
  const validate = (values: { name: string; grade: string; phone: string }) => {
    let valid = true;

    if (!values.name) {
      setError("studentName", "Please enter the student name.", nameInput);
      valid = false;
    } else if (/\d/.test(values.name)) {
      setError("studentName", "Name cannot contain numbers.", nameInput);
      valid = false;
    } else {
      setError("studentName", "", nameInput);
    }

    if (!values.grade) {
      setError("grade", "Please select a grade.");
      valid = false;
    } else {
      setError("grade", "");
    }

    if (!/^[0-9]{10}$/.test(values.phone)) {
      setError("phone", "Please enter a valid 10-digit phone number.", phoneInput);
      valid = false;
    } else {
      setError("phone", "", phoneInput);
    }

    return valid;
  };

  // Digits only in the phone field
  phoneInput.addEventListener("input", () => {
    phoneInput.value = phoneInput.value.replace(/\D/g, "");
  });

  // Clear a field's message as soon as the visitor starts fixing it
  nameInput.addEventListener("input", () => setError("studentName", "", nameInput));
  phoneInput.addEventListener("input", () => setError("phone", "", phoneInput));
  form
    .querySelector("#dropdownMenu")
    ?.addEventListener("click", () => setError("grade", ""));

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const values = {
      name: nameInput.value.trim(),
      grade: gradeInput.value.trim(),
      phone: phoneInput.value.trim(),
    };

    if (!validate(values)) return;

    submitBtn.disabled = true;
    submitBtn.textContent = "Sending...";

    try {
      const payload = [
        { Attribute: "FirstName", Value: values.name },
        { Attribute: "Phone", Value: values.phone },
        { Attribute: "mx_Grade", Value: values.grade },
        { Attribute: "mx_Hostel_Facility", Value: "Yes" },
        { Attribute: "mx_Source_V2", Value: LEAD_SOURCE },
        { Attribute: "ProspectID", Value: window.MXCProspectId || "" },
      ];

      const response = await admissionEnquiryRequest(payload);

      // Check LSQ errors
      if (response.ExceptionMessage || response.Status !== "Success") {
        alert(SUBMIT_ERROR);
        return;
      }

      trackFormCompletionEvent(
        { student_name: values.name, grade: values.grade, phone: values.phone },
        EVENTS.INTEREST_FORM_COMPLETED,
      );

      // Show the thank-you over the form, then reset it for the next enquiry
      form.reset();
      // A hidden input keeps its value through reset(), so clear the grade by hand
      gradeInput.value = "";
      const gradeLabel = form.querySelector("#dropdownLabel");
      if (gradeLabel) gradeLabel.textContent = "Grade";
      success?.classList.remove("hidden");
      success?.classList.add("flex");
      window.setTimeout(() => {
        success?.classList.add("hidden");
        success?.classList.remove("flex");
      }, SUCCESS_VISIBLE_MS);
    } catch (err) {
      console.error(err);
      alert(SUBMIT_ERROR);
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = submitLabel;
    }
  });
}

function boot() {
  reportFormHeight();

  document
    .querySelectorAll<HTMLFormElement>("[data-quick-enquiry-form]")
    .forEach(initEnquiryForm);

  let resizeTimer: number | undefined;
  window.addEventListener("resize", () => {
    window.clearTimeout(resizeTimer);
    resizeTimer = window.setTimeout(reportFormHeight, 150);
  });

  // Fonts/webfonts loading late can shift the form's height slightly.
  if ("fonts" in document) {
    (document as any).fonts.ready.then(reportFormHeight).catch(() => {});
  }
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", boot);
} else {
  boot();
}

document.addEventListener("astro:page-load", boot);
