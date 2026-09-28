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
    submenu: [
      { title: "Ethos of SAI", href: URLS.ABOUT.ETHOS },
      { title: "Guru Shishya Parampara", href: URLS.ABOUT.GURU_SHISHYA },
      { title: "Our Founder", href: URLS.ABOUT.FOUNDER },
      { title: "Learning @360", href: URLS.ABOUT.LEARNING_360.ROOT },
      { title: "Awards", href: URLS.AWARDS },
    ],
    icon: "home",
    active: true,
  },
  {
    title: "ABOUT US",
    submenu: [
      { title: "The Perfect Master", href: URLS.ABOUT.PERFECT_MASTER },
      { title: "Vision, Mission & Values", href: URLS.ABOUT.VISION_MISSION_VALUES },
      { title: "Our Founder", href: URLS.ABOUT.FOUNDER },
      { title: "Key Personnel", href: URLS.ABOUT.KEY_PERSONNEL },
      { title: "Advisory Board", href: URLS.ABOUT.ADVISORY_BOARD },
      { title: "Learning & Beyond", href: URLS.ABOUT.LEARNING_AND_BEYOND.ROOT },
      { title: "Our Affiliations", href: URLS.ABOUT.AFFILIATIONS },
    ],
    icon: "about",
  },
  {
    title: "RESULTS",
    submenu: [{ title: "Results", href: URLS.RESULTS.ROOT }],
    icon: "results",
  },
  {
    title: "GLOBAL CONNECT",
    submenu: [{ title: "Global Connect", href: URLS.GLOBAL_CONNECT }],
    icon: "global-connect",
  },
  {
    title: "STUDENT LEADERS",
    submenu: [{ title: "Student Leaders", href: URLS.STUDENT_LEADERS }],
    icon: "leaders",
  },
  {
    title: "MEDIA",
    submenu: [
      { title: "News & Blogs", href: URLS.MEDIA.BLOGS.ROOT },
      { title: "Albums", href: URLS.MEDIA.ALBUMS.ROOT },
      { title: "Radio Orange", href: URLS.MEDIA.RADIO_ORANGE },
      { title: "SAI TV", href: URLS.MEDIA.SAI_TV },
    ],
    icon: "media",
  },
  {
    title: "ADMISSIONS",
    submenu: [
      { title: "Transfer Certificates", href: URLS.ADMISSIONS.TRANSFER_CERTIFICATES },
      { title: "Admissions Guidelines", href: URLS.ADMISSIONS.GUIDELINES },
      { title: "EWS Admissions", href: URLS.ADMISSIONS.EWS },
      { title: "Apply Now", href: URLS.ADMISSIONS.ROOT },
    ],
    icon: "admissions",
  },
];
