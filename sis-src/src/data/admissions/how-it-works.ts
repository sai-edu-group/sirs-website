/** A single step in the admission process */
export interface AdmissionStepData {
  id: number;
  number: string;
  icon: string;
  title: string;
  description: string;
}

/** Header copy for the "Admission Process" section on /admissions */
export const sectionHeaderContent = {
  title: "Admission Process",
  subtitle: "Step by step Admission Procedure",
  description:
    "Getting your child into SAI is meant to feel simple, not stressful. Here's how it works, from your first message to us, all the way to your child's first day at school.",
};

/** Admission steps shown as cards, in order */
export const admissionSteps: AdmissionStepData[] = [
  {
    id: 1,
    number: "1",
    icon: "/icons/form.svg",
    title: "Fill in a quick inquiry form",
    description:
      "Just a few basic details to get started — nothing complicated.",
  },
  {
    id: 2,
    number: "2",
    icon: "/icons/headphone.svg",
    title: "Talk to our admissions counsellor",
    description:
      "Someone from our team will personally reach out to understand what you're looking for and answer your questions.",
  },
  {
    id: 3,
    number: "3",
    icon: "/icons/campus.svg",
    title: "Visit the campus or take a virtual tour",
    description:
      "Come see SAI for yourself — in person or online — and get a feel for where your child will spend their days.",
  },
  {
    id: 4,
    number: "4",
    icon: "/icons/doc.svg",
    title: "Submit the application and documents",
    description:
      "We'll hand you a clear checklist so you know exactly what's needed, with no guesswork.",
  },
  {
    id: 5,
    number: "5",
    icon: "/icons/interaction.svg",
    title: "Assessment and interaction",
    description:
      "Your child will have a friendly, age-appropriate conversation with our team — this isn't meant to be intimidating, just a chance for us to get to know them.",
  },
  {
    id: 6,
    number: "6",
    icon: "/icons/offer-letter.svg",
    title: "Receive your offer of admission",
    description:
      "Once everything's confirmed, we'll share the good news and walk you through the next steps.",
  },
];
