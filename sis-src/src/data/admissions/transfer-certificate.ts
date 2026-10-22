// DATA //
import { URLS } from "@/infrastructure/constants/urls";

// TYPES //
import type { BreadcrumbData, SectionHeaderMainData } from "@/types/common";

export const transferCertificates = [
  {
    id: 1,
    name: "TC-13691",
    image: "/images/admissions/transfer-certificates/tc-13691.jpg",
  },
  {
    id: 2,
    name: "TC-10625",
    image: "/images/admissions/transfer-certificates/tc-10625.jpg",
  },
];

export const sectionHeaderContent: SectionHeaderMainData = {
  title: "Transfer Certificates",
  subtitle: "Official TC records for verification and reference.",
};

export const transferCertificatesBreadcrumbItems: BreadcrumbData[] = [
  {
    label: "Admissions",
    href: URLS.ADMISSIONS.ROOT,
  },
  {
    label: "Transfer Certificates",
    href: URLS.ADMISSIONS.TRANSFER_CERTIFICATES,
  },
];
