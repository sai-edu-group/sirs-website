// TYPES //
import type { BreadcrumbData } from "@/types/common";

// CONSTANTS //
import { URLS } from "@/infrastructure/constants/urls";

// Breadcrumbs
export const studentCouncilBreadcrumbItems: BreadcrumbData[] = [
  {
    label: "Student Leaders",
    href: URLS.STUDENT_LEADERS.ROOT,
  },
  {
    label: "Student Council",
    href: URLS.STUDENT_LEADERS.STUDENT_COUNCIL,
  },
];

// Section Header
export const studentCouncilSectionHeader = {
  title: "Student Council",
  subtitle:
    "Empowering student leaders to represent, inspire, and drive positive change within the school community.",
};
