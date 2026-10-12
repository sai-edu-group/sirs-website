/** Header copy for the "Vision, Mission and Commitment" section on /about */
export const sectionHeaderContent = {
  title: "Vision, Mission and Commitment",
  subtitle: "What guides us, every single day.",
};

export type VisionMissionTone = "orange" | "violet" | "slate";

export interface VisionMissionCardData {
  id: number;
  /** Small label above the heading, e.g. "Vision" */
  label: string;
  heading: string;
  description: string;
  /** Colour of the label, and of the block when no `image` is supplied */
  tone: VisionMissionTone;
  /** Optional photo path inside /public; replaces the colour block */
  image?: string;
  imageAlt?: string;
}

export const visionMissionCards: VisionMissionCardData[] = [
  {
    id: 1,
    label: "Vision",
    heading: "To be a beacon of knowledge, shaping the thought leaders of tomorrow.",
    description:
      "A campus where curiosity is never rationed and every child is trusted to reach further than they think they can.",
    tone: "orange",
    image: "/images/vision.webp",
    imageAlt: "SIRS students studying together on a sunlit campus wall",
  },
  {
    id: 2,
    label: "Mission",
    heading: "Holistic education, for the whole child.",
    description:
      "Intellectual growth, emotional maturity, social responsibility, physical wellbeing and spiritual grounding, held together, not taught apart.",
    tone: "violet",
    image: "/images/mission.webp",
    imageAlt: "SIRS students chatting with books and a football",
  },
  {
    id: 3,
    label: "Commitment",
    heading: "Values we commit to, in every child.",
    description:
      "A lifelong learner. Introspective. Responsible. A leader. Compassionate and humble. These are not slogans, they are what we hold ourselves to.",
    tone: "slate",
    image: "/images/commitment.webp",
    imageAlt: "SIRS students looking ahead together, one pointing to the future",
  },
];
