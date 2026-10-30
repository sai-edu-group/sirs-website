export const learning360Header = {
  eyebrow: "Learning @ 360",
  titleLead: "Education that shapes",
  titleHighlight: "every side",
  titleTail: "of a child.",
  subtitle:
    "Smart academics, creative arts and physical education — not three separate tracks, but one circle that closes around your child.",
  note: "Three pillars. Nine programmes. One child.",
  noteCaption: "Academic · Artistic · Physical",
  promise:
    "The circle closes when a child can think, create and move with confidence.",
  promiseBy: "The Learning @ 360 promise",
};

export interface LearningPillar {
  index: string;
  title: string;
  tagline: string;
  lead: string;
  icon: "book" | "palette" | "pulse";
  accent: "orange" | "violet" | "slate";
  items: { title: string; description: string }[];
}

export const learningPillars: LearningPillar[] = [
  {
    index: "01",
    title: "Smart Academics",
    tagline: "Think",
    lead: "Curiosity taught well — classrooms that question, labs that prove, and support that arrives before a child falls behind.",
    icon: "book",
    accent: "orange",
    items: [
      {
        title: "Smart Classrooms",
        description: "Engaging spaces that inspire active and joyful learning.",
      },
      {
        title: "Future-Ready Curriculum",
        description: "Learning designed for tomorrow's skills and challenges.",
      },
      {
        title: "Labs & Experiential Learning",
        description: "Hands-on experiences that bring concepts to life.",
      },
      {
        title: "Assessment & Remediation",
        description: "Ongoing evaluation with targeted support for growth.",
      },
    ],
  },
  {
    index: "02",
    title: "Creative Arts",
    tagline: "Create",
    lead: "A stage, a studio and an audience for every child — because expression is a skill, not an extra.",
    icon: "palette",
    accent: "violet",
    items: [
      {
        title: "Music & Dance",
        description:
          "Nurturing rhythm, expression and creativity through performance.",
      },
      {
        title: "Visual Arts",
        description:
          "Encouraging imagination and skill through hands-on artistic exploration.",
      },
      {
        title: "Drama & Theatre",
        description:
          "Building confidence, storytelling and collaborative creativity on stage.",
      },
    ],
  },
  {
    index: "03",
    title: "Physical Education",
    tagline: "Move",
    lead: "Daily movement, coached properly — building stamina, discipline and the quiet confidence that comes from play.",
    icon: "pulse",
    accent: "slate",
    items: [
      {
        title: "Sports Training",
        description:
          "Developing skills, teamwork and discipline through active play.",
      },
      {
        title: "Yoga & Fitness",
        description:
          "Promoting physical well-being, mindfulness and a balanced lifestyle.",
      },
    ],
  },
];
