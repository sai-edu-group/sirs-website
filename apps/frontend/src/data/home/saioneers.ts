/** Header copy for the "Meet a SAIoneer" section on the home page */
export const sectionHeaderContent = {
  eyebrow: "Meet a SAIoneer",
  title: "Many Talents. One SAIoneer.",
  shuffleLabel: "Meet another SAIoneer",
};

/** Placeholder colour used for a talent card until it has a photo */
export type TalentTone = "orange" | "violet" | "slate";

export interface Talent {
  /** Shown on the pill at the bottom of the card, e.g. "Football" */
  label: string;
  /** Portrait photo path inside /public. Leave out to show a coloured placeholder. */
  image?: string;
  imageAlt?: string;
  tone: TalentTone;
}

export interface Saioneer {
  id: number;
  name: string;
  /** e.g. "New Delhi" */
  from: string;
  /** e.g. "Class VIII" */
  grade: string;
  quote: string;
  /** Always three, shown left to right */
  talents: [Talent, Talent, Talent];
}

// NOTE: placeholder content. Replace the names, quotes and photos with real
// students; add or remove entries freely (keep three talents per student).
export const saioneers: Saioneer[] = [
  {
    id: 1,
    name: "Rahul Sharma",
    from: "New Delhi",
    grade: "Class VIII",
    quote:
      "I love solving equations, football's my Friday ritual, and I never miss a debate. SIRS lets me be good at all of it.",
    talents: [
      {
        label: "Mathematics",
        image: "/images/saioneers/rahul-mathematics.jpg",
        imageAlt: "Rahul solving an equation on the whiteboard",
        tone: "orange",
      },
      {
        label: "Football",
        image: "/images/saioneers/rahul-football.jpg",
        imageAlt: "Rahul dribbling a football on the school field",
        tone: "violet",
      },
      {
        label: "Debate",
        image: "/images/saioneers/rahul-debate.jpg",
        imageAlt: "Rahul speaking at the debate podium",
        tone: "slate",
      },
    ],
  },
  {
    id: 2,
    name: "Ananya Patnaik",
    from: "Bhubaneswar",
    grade: "Class IX",
    quote:
      "Mornings are for the science lab, evenings are for the stage. Here I never have to choose between my two favourite things.",
    talents: [
      { label: "Science", tone: "violet" },
      { label: "Odissi Dance", tone: "orange" },
      { label: "Theatre", tone: "slate" },
    ],
  },
  {
    id: 3,
    name: "Arjun Mehta",
    from: "Mumbai",
    grade: "Class VII",
    quote:
      "I came here for cricket and found out I love robotics too. My house parents cheered the loudest for both.",
    talents: [
      { label: "Cricket", tone: "slate" },
      { label: "Robotics", tone: "orange" },
      { label: "Chess", tone: "violet" },
    ],
  },
  {
    id: 4,
    name: "Meera Iyer",
    from: "Chennai",
    grade: "Class X",
    quote:
      "Painting at sunrise, swimming before lunch, and a library I never want to leave. Every day here feels full in the best way.",
    talents: [
      { label: "Painting", tone: "orange" },
      { label: "Swimming", tone: "slate" },
      { label: "Reading", tone: "violet" },
    ],
  },
];
