// CONSTANTS //
import { URLS } from "@/infrastructure/constants/urls";

// TYPES //
import type { BreadcrumbData, SectionHeaderMainData } from "@/types/common";
import type { NewsBulletinData } from "@/types/media/news-bulletin";

export const newsBulletin: NewsBulletinData = {
  id: 7,
  years: [2025, 2024, 2023],
  news: {
    2025: [
      {
        id: 1,
        name: "3rd December",
        image: "/images/media/news-bulletin/17nov.jpg",
        contentUrl: "https://saiinternational.edu.in/mail/new/171125/",
      },
      {
        id: 2,
        name: "2nd December",
        image: "/images/media/news-bulletin/12nov.jpg",
        contentUrl: "",
      },
    ],
    2024: [
      {
        id: 1,
        name: "2nd January",
        image: "/images/media/news-bulletin/12nov.jpg",
        contentUrl: "https://saiinternational.edu.in/mail/new/171125/",
      },
    ],
  },
};

export const newsBulletinBreadcrumbItems: BreadcrumbData[] = [
  { label: "Media", href: URLS.MEDIA.ROOT },
  { label: "News Bulletin", href: URLS.MEDIA.NEWS_BULLETIN.ROOT },
];

export const newsBulletinSectionHeader: SectionHeaderMainData = {
  title: "News Bulletin",
  subtitle: "Stay updated with the latest school events and achievements.",
};
