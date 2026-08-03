export const URLS = {
  HOME: "/",

  ABOUT: {
    ROOT: "/about",
    ETHOS: "/about#ethos",
    GURU_SHISHYA: "/about#guru-shishya",
    DETAIL: (slug: string) => `/about/${slug}`,
    LEARNING_360: {
      ITEM: (name: string) => `/sirs-experience/learning-360/${name}`,
    },
    LEARNING_AND_BEYOND: {
      ROOT: "/sirs-experience",
      CURRICULUM: (name: string) => `/sirs-experience/curriculum/${name}`,
      AMENITY: (name: string) => `/sirs-experience/amenities/${name}`,
      SAI_SEVA: (name: string) => `/sirs-experience/sai-seva/${name}`,
      FLAGSHIP_EVENT: (name: string) => `/sirs-experience/flagship-events/${name}`,
    },
    TEAM_MEMBER: (name: string) => `/about/team/${name}`,
  },

  SIRS_EXPERIENCE: {
    ROOT: "/sirs-experience",
    DETAIL: (slug: string) => `/sirs-experience/${slug}`,
    GLOBAL_SAIONEERSS: "/sirs-experience/global-saIoneers",
  },

  ADMISSIONS: {
    ROOT: "/admissions",
    GUIDELINES: "/admissions/guidelines",
  },

  CONTACT: "/contact-us",

  AWARDS: "/awards",

  RESULTS: {
    ROOT: "/results",
  },

  MEDIA: {
    ROOT: "/media",
    BLOGS: {
      ROOT: "/media/blogs",
      DETAIL: (slug: string) => `/media/blogs/${slug}`,
    },
    ALBUMS: {
      ROOT: "/media/albums",
    },
  },

  CAMPUS: {
    DETAIL: (slug: string) => `/campus/${slug}`,
  },
} as const;
