// ENUMS //
import { EVENTS } from "@/enums/analytics.enum";

// SCRIPTS //
import {
  setupFormStartTracking,
  setupInViewTracking,
  trackEvent,
  trackFormCompletionEvent,
  trackFormViewEvent,
} from "@/scripts/analytics";
import { getDeviceType } from "@/scripts/device";

// SERVICES //
import { admissionEnquiryRequest } from "@/services/api/form.api.service";

declare global {
  interface Window {
    /** Set by the LeadSquared tracker script, when it is on the page */
    MXCProspectId?: string;
  }
}

/** Lead source label stored on the LeadSquared lead (mx_Source_V2) */
const LEAD_SOURCE = "SIRS Website Admission Page";

/** Convert the form fields → LeadSquared Attribute/Value array */
const mapToLeadSquared = (formObj: Record<string, FormDataEntryValue>) => {
  // Format date from YYYY-MM-DD to DD/MM/YYYY
  const formatDate = (dateStr: string) => {
    if (!dateStr) return "";
    const [year, month, day] = dateStr.split("-");
    return `${day}/${month}/${year}`;
  };

  return [
    { Attribute: "FirstName", Value: formObj.firstName || "" },
    { Attribute: "LastName", Value: formObj.lastName || "" },
    { Attribute: "EmailAddress", Value: formObj.emailId || "" },
    { Attribute: "Phone", Value: formObj.mobileNo || "" },
    { Attribute: "mx_DOB", Value: formatDate(String(formObj.dob || "")) },
    { Attribute: "mx_Grade", Value: formObj.className || "" },
    { Attribute: "mx_Parent_Name", Value: formObj.parentName || "" },
    { Attribute: "mx_Hostel_Facility", Value: formObj.hostel || "" },
    { Attribute: "mx_Current_School", Value: formObj.currentSchool || "" },
    { Attribute: "mx_City", Value: formObj.city || "" },
    { Attribute: "mx_Message", Value: formObj.message || "" },
    { Attribute: "mx_Source_V2", Value: LEAD_SOURCE },
  ];
};

const initAdmissionForm = () => {
  const steps = [
    document.getElementById("step-1"),
    document.getElementById("step-2"),
    document.getElementById("step-3"),
  ];
  const thankYou = document.getElementById("thank-you");
  const submitting = document.getElementById("submitting");

  // Timing tracking
  const formStartTime = Date.now();
  let stepStartTime = Date.now();

  const showStep = (idx: number) => {
    steps.forEach((el, i) => el?.classList.toggle("hidden", i !== idx));
    thankYou?.classList.add("hidden");

    // Update step start time when switching steps
    stepStartTime = Date.now();

    // Track Step View
    const stepTitles = ["Student Info", "Parent Info", "Message"];
    trackEvent(`admission_form_step_${idx + 1}_viewed`, {
      step_number: idx + 1,
      step_title: stepTitles[idx],
      device_type: getDeviceType(),
      page_path: window.location.pathname,
    });
  };

  // Initially show step 1
  showStep(0);

  // Validation
  const validateStep = (stepEl: HTMLElement | null) => {
    if (!stepEl) return false;
    const fields = stepEl.querySelectorAll("input, select, textarea");
    let valid = true;

    fields.forEach((el) => {
      const field = el as
        | HTMLInputElement
        | HTMLSelectElement
        | HTMLTextAreaElement;
      const errorText = field
        .closest("[data-field]")
        ?.querySelector("[data-error]");
      let fieldValid = true;
      const value = field.value.trim();

      if (field.hasAttribute("required") && !value) fieldValid = false;

      if (field.type === "email" && value !== "") {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(value)) fieldValid = false;
      }

      // NAME VALIDATION: should NOT contain digits
      if (
        (field.name === "firstName" ||
          field.name === "lastName" ||
          field.name === "parentName" ||
          field.name === "city") &&
        value !== ""
      ) {
        if (/\d/.test(value)) fieldValid = false;
      }

      // PHONE VALIDATION: should contain ONLY digits, 10 long
      if (field.name === "mobileNo" && value !== "") {
        const notNumbers = /\D/.test(value);
        if (notNumbers || value.length !== 10) fieldValid = false;
      }

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

  // Step navigation
  document.getElementById("next-1")?.addEventListener("click", () => {
    if (validateStep(steps[0])) {
      const duration = (Date.now() - stepStartTime) / 1000; // in seconds

      showStep(1);

      trackEvent(EVENTS.ADMISSION_FORM_NEXT_CLICKED, {
        device_type: getDeviceType(),
        from_step: 1,
        to_step: 2,
        time_spent_on_step: duration,
      });
    }
  });

  document.getElementById("next-2")?.addEventListener("click", (e) => {
    e.preventDefault();
    if (validateStep(steps[1])) {
      const duration = (Date.now() - stepStartTime) / 1000; // in seconds
      showStep(2);

      trackEvent(EVENTS.ADMISSION_FORM_NEXT_CLICKED, {
        device_type: getDeviceType(),
        from_step: 2,
        to_step: 3,
        time_spent_on_step: duration,
      });
    }
  });

  document
    .getElementById("back-2")
    ?.addEventListener("click", () => showStep(0));
  document
    .getElementById("back-3")
    ?.addEventListener("click", () => showStep(1));

  // Submit handler
  document.getElementById("submit")?.addEventListener("click", async (e) => {
    e.preventDefault();
    if (!validateStep(steps[2])) return;

    const prospectId = window.MXCProspectId || "";
    const totalDuration = (Date.now() - formStartTime) / 1000;

    // In hh:mm:ss format
    const formatDuration = (seconds: number) => {
      const hours = Math.floor(seconds / 3600);
      const minutes = Math.floor((seconds % 3600) / 60);
      const remainingSeconds = Math.floor(seconds % 60);
      return `${hours}:${minutes}:${remainingSeconds}`;
    };

    const formEl = document.querySelector(
      "form#admission-form",
    ) as HTMLFormElement | null;
    if (!formEl) return;
    const formObj = Object.fromEntries(new FormData(formEl).entries());

    // Convert to LeadSquared format
    const leadSquaredPayload = [
      ...mapToLeadSquared(formObj),
      { Attribute: "ProspectID", Value: prospectId },
    ];

    // Hide steps, reset visibility
    steps.forEach((el) => el?.classList.add("hidden"));
    thankYou?.classList.add("hidden");

    // Remove old animation classes to re-trigger
    submitting?.classList.remove("slide-parent");
    submitting?.offsetHeight; // force reflow
    submitting?.classList.add("slide-parent");

    // Show submitting screen
    submitting?.classList.remove("hidden");

    try {
      const response = await admissionEnquiryRequest(leadSquaredPayload);

      // Check LSQ errors — send the user back to the last step to retry
      if (response.ExceptionMessage || response.Status !== "Success") {
        submitting?.classList.add("hidden");
        steps[2]?.classList.remove("hidden");
        alert(
          "Something went wrong submitting your enquiry. Please try again.",
        );
        return;
      }

      // Track Form Completion
      trackFormCompletionEvent(
        {
          ...formObj,
          time_taken_for_submission: totalDuration,
          submission_time: formatDuration(totalDuration),
        },
        EVENTS.ADMISSION_FORM_COMPLETED,
      );

      // Hide loader & show thank you with stagger animation
      submitting?.classList.add("hidden");

      thankYou?.classList.remove("slide-parent");
      thankYou?.offsetHeight;
      thankYou?.classList.add("slide-parent");

      thankYou?.classList.remove("hidden");
    } catch (err) {
      submitting?.classList.add("hidden");
      steps[2]?.classList.remove("hidden");
      console.error("Failed to submit enquiry:", err);
      alert(
        "Something went wrong while submitting your enquiry. Please try again.",
      );
    }
  });

  // Analytics: form started / form viewed
  const form = document.querySelector(
    "form#admission-form",
  ) as HTMLFormElement | null;

  if (form) {
    setupFormStartTracking(form, EVENTS.ADMISSION_FORM_STARTED);
    // Track when form comes into view
    setupInViewTracking("admission-form", () => {
      trackFormViewEvent("admission-form", EVENTS.ADMISSION_FORM_VIEWED);
    });
  }
};

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initAdmissionForm);
} else {
  initAdmissionForm();
}
