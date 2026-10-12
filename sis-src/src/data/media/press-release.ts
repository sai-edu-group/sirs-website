// CONSTANTS //
import { URLS } from "@/infrastructure/constants/urls";

// TYPES //
import type { BreadcrumbData, SectionHeaderMainData } from "@/types/common";
import type { PressReleaseData } from "@/types/media/press-release";

export const pressRelease: PressReleaseData = {
  id: 7,
  name: "2025",
  years: [2025, 2024, 2023],
  releases: {
    2025: [
      {
        id: 1,
        name: "9th Nov",
        image: "/images/media/press-release/9-nov.jpeg",
      },
      {
        id: 1,
        name: "9th Nov",
        image: "/images/media/press-release/9-nov.jpeg",
      },
    ],
    2024: [
      {
        id: 1,
        name: "10th Nov",
        image: "/images/media/press-release/9-nov.jpeg",
      },
    ],
  },
};

export const pressReleaseBreadcrumbItems: BreadcrumbData[] = [
  { label: "Media", href: URLS.MEDIA.ROOT },
  { label: "Press Release", href: URLS.MEDIA.PRESS_RELEASE },
];

export const pressReleaseSectionHeader: SectionHeaderMainData = {
  title: "Press Release",
  subtitle: "Latest media coverage and SAI highlights.",
};
