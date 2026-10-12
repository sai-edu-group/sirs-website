// DATA //
import { URLS } from "@/infrastructure/constants/urls";

// TYPES //
import type { BreadcrumbData, SectionHeaderMainData } from "@/types/common";

export const ewsAdmissions = {
  content: `<p>Please refer to RTE Paradarshi Portal&nbsp;<a href="http://rteparadarshi.odisha.gov.in/" target="_blank" rel="noreferrer noopener">rteparadarshi.odisha.gov.in</a>&nbsp;for details about admission under Right to Education, Section 12(1)(c)</p>`,
};

export const sectionHeaderContent: SectionHeaderMainData = {
  title: "EWS Admissions",
};

export const ewsBreadcrumbItems: BreadcrumbData[] = [
  {
    label: "Admissions",
    href: URLS.ADMISSIONS.ROOT,
  },
  {
    label: "EWS Admissions",
    href: URLS.ADMISSIONS.EWS,
  },
];
