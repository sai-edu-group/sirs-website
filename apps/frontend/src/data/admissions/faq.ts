export interface FaqDetail {
  question: string;
  answer: string;
  pointers?: string[];
}

export const sectionHeaderContent = {
  title: "Frequently Asked Questions",
};

export const faqDetails: FaqDetail[] = [
  {
    question: "Which classes can apply to SAI Residential School?",
    answer:
      "Admissions are open for Classes IV to XII. SIRS is a fully residential CBSE school, and every student lives and learns on our 49-acre campus.",
  },
  {
    question: "What is the admission process?",
    answer: "Admission is a simple six-step journey:",
    pointers: [
      "Fill in a quick inquiry form.",
      "Get a personal call from our admissions counsellor.",
      "Visit the 49-acre campus, or take a virtual tour.",
      "Submit the application and documents.",
      "Go through a short assessment and interaction.",
      "Receive your offer of admission.",
    ],
  },
  {
    question: "Is there an entrance assessment for new admissions?",
    answer:
      "For Classes IV and above, students appear for a warm, age-appropriate written assessment followed by a personal interaction, so we can get to know your child and help them feel at home.",
  },
  {
    question: "Is SIRS fully residential?",
    answer:
      "Yes. Every SIRS student is a boarder. Pastoral care, supervised prep, sports, arts and weekend life are all part of the residential rhythm, guided by house parents and mentors.",
  },
  {
    question: "What documents are required for admission?",
    answer: "List of required documents:",
    pointers: [
      "Two recent passport-size photographs of the student, father, and mother",
      "Birth certificate issued by a municipal or government authority",
      "Aadhaar card or valid ID proof of student and parents",
      "Transfer Certificate (original) from the previous school",
      "Copies of the last two years' report cards",
      "Proof of residence such as electricity bill, rent agreement, Aadhaar, passport, or voter ID",
    ],
  },
  {
    question: "How do we reach the admissions team?",
    answer:
      "Write to admissions@sairesidentialschool.com, call +91 9337377701, or visit the campus in Odisha. Share your details through the enquiry form above and our team will get back to you shortly.",
  },
];
