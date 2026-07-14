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
    submenu: [{ title: "About Us", href: URLS.ABOUT.ROOT }],
    icon: "about",
  },
  {
    title: "SIRS EXPERIENCE",
    submenu: [{ title: "SIRS Experience", href: URLS.SIRS_EXPERIENCE.ROOT }],
    icon: "leaders",
  },
  {
    title: "ADMISSIONS",
    submenu: [{ title: "Apply Now", href: URLS.ADMISSIONS.ROOT }],
    icon: "admissions",
  },
  {
    title: "CONTACT",
    submenu: [{ title: "Reach Us", href: URLS.CONTACT }],
    icon: "phone",
  },
];
