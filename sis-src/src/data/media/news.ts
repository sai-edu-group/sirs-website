// TYPES //
import type { BreadcrumbData, SectionHeaderMainData } from "@/types/common";

// CONSTANTS //
import { URLS } from "@/infrastructure/constants/urls";

/** Years offered in the news filter. */
export const newsYears: number[] = [2025, 2024, 2023];

export const newsBreadcrumbItems: BreadcrumbData[] = [
  { label: "Media", href: URLS.MEDIA.ROOT },
  { label: "News & Blogs", href: URLS.MEDIA.NEWS.ROOT },
];

export const newsSectionHeader: SectionHeaderMainData = {
  title: "The SAI Chronicle",
  eyebrowText: "SAI News & Blogs",
  subtitle:
    "Discover the latest updates, thought leadership, and inspiring stories from the SAI community.",
};
