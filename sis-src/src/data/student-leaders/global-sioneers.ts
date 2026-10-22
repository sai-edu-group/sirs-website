// TYPES //
import type { BreadcrumbData } from "@/types/common";

// CONSTANTS //
import { URLS } from "@/infrastructure/constants/urls";

// Breadcrumbs
export const globalSioneersBreadcrumbItems: BreadcrumbData[] = [
  {
    label: "Student Leaders",
    href: URLS.STUDENT_LEADERS.ROOT,
  },
  {
    label: "Global SAIoneers",
    href: URLS.STUDENT_LEADERS.GLOBAL_SIONEERS,
  },
];

// Section Header
export const globalSioneersSectionHeader = {
  title: "Global SAIoneers",
  subtitle:
    "Celebrating students who secured admissions to leading universities across the world.",
};

