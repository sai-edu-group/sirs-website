import { URLS } from "@/infrastructure/constants/urls";

// TYPES //
import type { BreadcrumbData, SectionHeaderMainData } from "@/types/common";

export const careerResultsBreadcrumbs: BreadcrumbData[] = [
  {
    label: "Results",
    href: URLS.RESULTS.ROOT,
  },
  { label: "Career Results", href: URLS.RESULTS.CAREER_RESULTS.ROOT },
];

export const careerResultsSectionHeader: SectionHeaderMainData = {
  title: "Career Results",
  subtitle: "Celebrating our students hard work and achievements",
};
