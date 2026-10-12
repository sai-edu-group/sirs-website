// DATA //
import { URLS } from "@/infrastructure/constants/urls";

// TYPES //
import type { BreadcrumbData, SectionHeaderMainData } from "@/types/common";
import type { PlacementData } from "@/types/results/results";

export const placements: PlacementData[] = [
  {
    id: 1,
    name: "2026 Batch",
    image: "/images/results/placements/2026.jpg",
  },
  {
    id: 2,
    name: "2025 Batch",
    image: "/images/results/placements/2025.jpg",
  },
  {
    id: 3,
    name: "2024 Batch",
    image: "/images/results/placements/2024.jpg",
  },
  {
    id: 4,
    name: "2023 Batch",
    image: "/images/results/placements/2023.jpg",
  },
  {
    id: 5,
    name: "2022 Batch",
    image: "/images/results/placements/2022.jpg",
  },

];

export const placementsSectionHeader: SectionHeaderMainData = {
  title: "Guiding Futures Beyond School",
  subtitle:
    "Our students excel at top national and global institutions, reflecting SAI’s focus on holistic growth and future readiness.",
};

export const placementsBreadcrumbItems: BreadcrumbData[] = [
  {
    label: "Results",
    href: URLS.RESULTS.ROOT,
  },
  {
    label: "Placements",
    href: URLS.RESULTS.PLACEMENTS,
  },
];
