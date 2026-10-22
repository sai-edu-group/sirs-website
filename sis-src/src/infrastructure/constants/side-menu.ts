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
      { title: "Ethos of SAI", href: `${URLS.HOME}#ethos` },
      { title: "Guru Shishya Parampara", href: `${URLS.HOME}#guru-shishya` },
      { title: "Our Founder", href: `${URLS.HOME}#our-founder` },
      { title: "Learning @360", href: `${URLS.HOME}#learning-360` },
      { title: "Awards", href: `${URLS.HOME}#awards` },
      // { title: "Our Affiliations", href: "#", active: true },
    ],
    icon: "home",
    active: true,
  },
  {
    title: "ABOUT US",
    submenu: [
      { title: "The Perfect Master", href: `${URLS.ABOUT.ROOT}#ethos` },
      {
        title: "Vision, Mission & Values",
        href: URLS.ABOUT.VISION_MISSION_VALUES,
      },
      { title: "Our Founder", href: `${URLS.ABOUT.ROOT}#our-founder` },
      { title: "Key Personnel", href: `${URLS.ABOUT.ROOT}#key-personnel` },
      { title: "Advisory Board", href: `${URLS.ABOUT.ROOT}#advisory-board` },
      { title: "Learning & Beyond", href: URLS.ABOUT.LEARNING_AND_BEYOND.ROOT },
      {
        title: "Our Affiliations",
        href: URLS.ABOUT.AFFILIATIONS.ROOT,
        active: true,
      },
    ],
    icon: "about",
  },
  // {
  //   title: "SAI Entrance Test 2026",
  //   submenu: [
  //     {
  //       title: "Registrations",
  //       href: "https://saiinternational.edu.in/set/",
  //       target: "_blank",
  //     },
  //   ],
  //   icon: "admissions",
  // },
  {
    title: "RESULTS",
    submenu: [
      { title: "CBSE Results – Class XII", href: URLS.RESULTS.CBSE_12.ROOT },
      { title: "CBSE Results – Class X", href: URLS.RESULTS.CBSE_10 },
      { title: "Career Results", href: URLS.RESULTS.CAREER_RESULTS.ROOT },
      { title: "Placements", href: URLS.RESULTS.PLACEMENTS },
    ],
    icon: "results",
  },
  {
    title: "GLOBAL CONNECT",
    submenu: [
      { title: "Global Vision", href: URLS.GLOBAL_CONNECT.GLOBAL_VISION },
      { title: "Global Programs", href: URLS.GLOBAL_CONNECT.PROGRAMS.ROOT },
      { title: "Global Partners", href: URLS.GLOBAL_CONNECT.PARTNERS.ROOT },
      {
        title: "Advanced Placements",
        href: URLS.ADVANCED_PLACEMENTS,
      },
    ],
    icon: "globe",
  },
  {
    title: "STUDENT LEADERS",
    submenu: [
      { title: "Student Council", href: URLS.STUDENT_LEADERS.STUDENT_COUNCIL },
      { title: "Global SAIoneers", href: URLS.STUDENT_LEADERS.GLOBAL_SIONEERS },
      // {
      //   title: "Icons & Achievers",
      //   href: URLS.STUDENT_LEADERS.ICONS_ACHIEVERS,
      // },
    ],
    icon: "leaders",
  },
  {
    title: "MEDIA",
    submenu: [
      { title: "News & Blogs", href: URLS.MEDIA.NEWS.ROOT },
      // { title: "Press Releases", href: URLS.MEDIA.PRESS_RELEASE },
      // { title: "News Bulletin", href: URLS.MEDIA.NEWS_BULLETIN.ROOT },
      { title: "Albums", href: URLS.MEDIA.ALBUMS.ROOT },
      { title: "Radio Orange", href: URLS.MEDIA.RADIO_ORANGE },
      { title: "SAI TV", href: URLS.MEDIA.SAI_TV },
    ],
    icon: "media",
  },
  // {
  //   title: "ALUMNI",
  //   submenu: [
  //     { title: "Success Stories", href: "#" },
  //     { title: "Reunions", href: "#" },
  //     { title: "Alumni Association", href: "#" },
  //   ],
  //   icon: "alumni",
  // },
  {
    title: "ADMISSIONS",
    submenu: [
      {
        title: "Transfer Certificates",
        href: URLS.ADMISSIONS.TRANSFER_CERTIFICATES,
      },
      { title: "Admissions Guidelines", href: URLS.ADMISSIONS.GUIDELINE },
      { title: "EWS Admissions", href: URLS.ADMISSIONS.EWS },
      { title: "Apply Now", href: URLS.ADMISSIONS.APPLY_NOW, target: "_blank" },
    ],
    icon: "admissions",
  },
  {
    title: "CONTACT",
    submenu: [
      {
        title: "Reach Us",
        href: URLS.CONTACT,
      },
    ],
    icon: "phone",
  },
];
