// TYPES //
import type { BreadcrumbData } from "@/types/common";
import type { AchieversData } from "@/types/student-leaders/achievers";

// CONSTANTS //
import { URLS } from "@/infrastructure/constants/urls";

// Breadcrumbs
export const achieversBreadcrumbItems: BreadcrumbData[] = [
  {
    label: "Student Leaders",
    href: URLS.STUDENT_LEADERS.ROOT,
  },
  {
    label: "Achievers",
    href: URLS.STUDENT_LEADERS.ICONS_ACHIEVERS,
  },
];

// Section Header
export const achieversSectionHeader = {
  title: "Icons & Achievers",
  subtitle:
    "Celebrating students who excelled in academics, sports, research, and creative arts.",
};

// Icons & Achievers - Items (Every Year)
export const achievers: AchieversData = {
  years: [2025, 2024, 2023, 2022, 2021, 2020],
  achievers: {
    2025: [
      {
        id: 1,
        name: "Atiksh Nayak",
        description:
          "Selected amongst top 30 winner in the grand finale of the 18th edition of Young Astronomer Talent Search",
        date: "November 2025",
      },
      {
        id: 2,
        name: "Mehr Seal",
        description: `Received title "Fellow of the Fellowship" Artivist Fellowship conducted by Young Leaders for Active Citizenship (YLAC)`,
        date: "November 2025",
      },
    ],
    2024: [
      {
        id: 1,
        name: "John Doe",
        description: "John Doe",
        date: "November 2025",
      },
      {
        id: 2,
        name: "John Doe",
        description: "John Doe",
        date: "November 2025",
      },
    ],
  },
};
