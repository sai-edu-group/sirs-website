// TYPES //
import { URLS } from "@/infrastructure/constants/urls";

// TYPES //
import type { AwardsData } from "@/types/awards/awards";
import type { BreadcrumbData } from "@/types/common";

export const awards: AwardsData = {
  years: [2025, 2024, 2023, 2022, 2021, 2020],
  awards: {
    2025: [
      {
        id: 1,
        image: "/images/awards/2025/1.jpg",
        year: "2025",
        title:
          "Ivy League Status by Education World India School Rankings 2025-26",
        description:
          "SAl International is among the six elite schools in India to be accorded the prestigious Ivy League' status, recognizing our commitment to comprehensive excellence.",
      },
      {
        id: 2,
        image: "/images/awards/2025/2.jpg",
        year: "2025",
        title:
          "Ivy League Status by Education World India School Rankings 2025-26",
        description:
          "SAl International is among the six elite schools in India to be accorded the prestigious Ivy League' status, recognizing our commitment to comprehensive excellence.",
      },
    ],
    2024: [
      {
        id: 1,
        image: "/images/awards/2024/1.jpg",
        year: "2024",
        title:
          "Ivy League Status by Education World India School Rankings 2025-26",
        description:
          "SAl International is among the six elite schools in India to be accorded the prestigious Ivy League' status, recognizing our commitment to comprehensive excellence.",
      },
      {
        id: 2,
        image: "/images/awards/2024/2.jpg",
        year: "2024",
        title:
          "Ivy League Status by Education World India School Rankings 2025-26",
        description:
          "SAl International is among the six elite schools in India to be accorded the prestigious Ivy League' status, recognizing our commitment to comprehensive excellence.",
      },
    ],
  },
};

export const awardsBreadcrumbItems: BreadcrumbData[] = [
  {
    label: "Awards & Achievements",
    href: URLS.AWARDS,
  },
];

export const awardsSectionHeader = {
  title: "Awards & Achievements",
  subtitle: "Celebrating excellence and milestones that define our journey",
};
