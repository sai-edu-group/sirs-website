/** A single FAQ entry rendered by `FaqItem` */
export interface FaqItemData {
  question: string;
  answer: string;
  pointers?: string[];
}

/** FAQs shown on /admissions (first item is open by default) */
export const faqDetails: FaqItemData[] = [
  {
    question: "Is SAI International School a CBSE affiliated school in Odisha?",
    answer:
      "Yes, it is. SAI International is a CBSE-affiliated school based in Bhubaneswar, Odisha, following the CBSE curriculum from the early years right through to Grade XII.",
  },
  {
    question: "Does the school offer the IGCSE curriculum?",
    answer:
      "Yes. Alongside CBSE, SAI also offers the Cambridge International curriculum, including IGCSE and AS & A Levels, for families who want a more globally focused path for their child.",
  },
  {
    question:
      "What curriculum options are available at SAI International School?",
    answer:
      "Parents can choose between two boards — CBSE, which builds strong fundamentals and prepares students for national exams like JEE and NEET, and Cambridge International (IGCSE, AS & A Levels), which suits students planning to study abroad.",
  },
  {
    question: "Why choose a top school in Bhubaneswar for your child?",
    answer:
      "Because the school your child grows up in shapes far more than their report card. A top school in Bhubaneswar like SAI International School brings together strong academics, a safe and well-equipped campus, caring teachers, and countless opportunities outside the classroom — all of which help a child grow into a confident, capable individual, not just a good student.",
  },
  {
    question: "What facilities are available for students?",
    answer:
      "SAI's campus spans over 3 lakh sq. ft. and includes smart classrooms, science and STEAM labs, a well-stocked library, sports arenas, hostels, a cafeteria, an infirmary, and auditoriums for events and performances. Everything on campus is designed to support both learning and everyday comfort.",
  },
  {
    question: "What extracurricular activities are offered at the school?",
    answer:
      "Students can pick from 25+ clubs and societies, along with music, dance, drama, fine arts, sports training, and yoga. Whether a child is drawn to the stage, the sports field, or a science project, there's a space for them to explore it at SAI.",
  },
  {
    question: "What is the admission process for SAI International School?",
    answer:
      "It's a simple six-step journey: fill in an inquiry form, get a personal call from our admissions counsellor, visit the campus (or take a virtual tour), submit your application and documents, go through a short assessment and interaction, and then receive your offer of admission. You can start the process online, on campus, by phone, or even over WhatsApp.",
  },
];

/** Header copy for the FAQ section */
export const sectionHeaderContent = {
  title: "Frequently Asked Questions",
};
