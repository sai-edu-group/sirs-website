// TYPES //
import type { BreadcrumbData, SectionHeaderMainData } from "@/types/common";

// CONSTANTS //
import { URLS } from "@/infrastructure/constants/urls";

export const albums = {
  years: [2025, 2024, 2023, 2022, 2021],
};

export const albumsBreadcrumbItems = [
  { label: "Media", href: URLS.MEDIA.ROOT },
  { label: "Albums", href: URLS.MEDIA.ALBUMS.ROOT },
];

export const albumsSectionHeader = {
  eyebrowText: "Moments at SAI",
  title: "Capturing Joy, Learning, and Growth",
  subtitle:
    "A glimpse into the vibrant events and everyday experiences that make SAI International Residential School truly special.",
};