// CONSTANTS //
import { URLS } from "@/infrastructure/constants/urls";

// TYPES //
export interface SubMenuItemData {
  title: string;
  href: string;
  active?: boolean;
  target?: string;
}
export interface MenuItemData {
  title: string;
  active?: boolean;
  submenu?: SubMenuItemData[];
  icon?: string;
}

export const menu: MenuItemData[] = [
  {
    title: "HOME",
    submenu: [{ title: "Home", href: URLS.HOME }],
    icon: "home",
    active: true,
  },
  {
    title: "ABOUT US",
    submenu: [
      { title: "About Us", href: URLS.ABOUT.ROOT },
      { title: "Vision & Mission", href: "/about/vision-mission" },
      { title: "Ethos", href: URLS.ABOUT.ETHOS },
      { title: "Guru Shishya Parampara", href: URLS.ABOUT.GURU_SHISHYA },
      { title: "Learning 360", href: URLS.ABOUT.LEARNING_360.ROOT },
    ],
    icon: "about",
  },
  {
    title: "SIRS EXPERIENCE",
    submenu: [
      { title: "SIRS Experience", href: URLS.SIRS_EXPERIENCE.ROOT },
      { title: "Academics", href: "/sirs-experience#academics" },
      { title: "Arts", href: "/sirs-experience#arts" },
      { title: "Boarding", href: "/sirs-experience#boarding" },
      { title: "Digital", href: "/sirs-experience#digital" },
      { title: "Sports", href: "/sirs-experience#sports" },
      { title: "Global Saioneers", href: URLS.SIRS_EXPERIENCE.GLOBAL_SAIONEERSS },
    ],
    icon: "leaders",
  },
  {
    title: "ADMISSIONS",
    submenu: [
      { title: "Admissions", href: URLS.ADMISSIONS.ROOT },
      { title: "Guidelines", href: URLS.ADMISSIONS.GUIDELINES },
      { title: "Process", href: "/admissions#process" },
      { title: "Form", href: "/admissions#form" },
    ],
    icon: "admissions",
  },
  {
    title: "AWARDS",
    submenu: [{ title: "Awards Listing", href: URLS.AWARDS }],
    icon: "award",
  },
  {
    title: "MEDIA",
    submenu: [
      { title: "Blogs Listing", href: URLS.MEDIA.BLOGS.ROOT },
      { title: "Albums Listing", href: URLS.MEDIA.ALBUMS.ROOT },
      { title: "News & Blogs", href: URLS.MEDIA.NEWS.ROOT },
    ],
    icon: "media",
  },
  {
    title: "CAMPUS",
    submenu: [{ title: "Campus Tour", href: "/campus" }],
    icon: "campus",
  },
  {
    title: "CONTACT",
    submenu: [{ title: "Reach Us", href: URLS.CONTACT }],
    icon: "phone",
  },
];