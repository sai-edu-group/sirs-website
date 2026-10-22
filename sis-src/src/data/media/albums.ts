// TYPES //
import type { BreadcrumbData, SectionHeaderMainData } from "@/types/common";
import type { AlbumsData } from "@/types/media/albums";

// CONSTANTS //
import { URLS } from "@/infrastructure/constants/urls";

export const albums: AlbumsData = {
  id: 7,
  years: [2025, 2024, 2023, 2022, 2021],
  images: {
    2025: [
      {
        id: 1,
        name: "Investiture Ceremony 2024",
        image: "/images/media/albums/album-dummy.jpg",
        content: ["/images/media/albums/album-dummy.jpg"],
      },
      {
        id: 2,
        name: "Teachers' Day 2024",
        image: "/images/media/albums/album-dummy.jpg",
        content: ["/images/media/albums/album-dummy.jpg"],
      },
    ],
    2024: [
      {
        id: 1,
        name: "SAI Abhinandan 2024",
        image: "/images/media/news-bulletin/12nov.jpg",
        content: ["/images/media/news-bulletin/12nov.jpg"],
      },
    ],
  },
};

export const albumsBreadcrumbItems: BreadcrumbData[] = [
  { label: "Media", href: URLS.MEDIA.ROOT },
  { label: "Albums", href: URLS.MEDIA.ALBUMS.ROOT },
];

export const albumsSectionHeader: SectionHeaderMainData = {
  eyebrowText: "Moments at SAI",
  title: "Capturing Joy, Learning, and Growth",
  subtitle:
    "A glimpse into the vibrant events and everyday experiences that make SAI International truly special.",
};
