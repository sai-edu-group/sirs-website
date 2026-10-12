export const URLS = {
  HOME: "/",

  ABOUT: {
    ROOT: "/about",
    ETHOS: "/about#ethos",
    GURU_SHISHYA: "/about#guru-shishya",
    VISION_MISSION_VALUES: "/about#vision-mission-values",
    FOUNDER: "/about#our-founder",
    KEY_PERSONNEL: "/about#key-personnel",
    ADVISORY_BOARD: "/about#advisory-board",
    AFFILIATIONS: "/about#our-affiliations",
    DETAIL: (slug: string) => `/about/${slug}`,
    LEARNING_360: {
      ROOT: "/sirs-experience/learning-360",
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
    ADVISORY_MEMBER: (name: string) => `/about/advisory/${name}`,
  },

  SIRS_EXPERIENCE: {
    ROOT: "/sirs-experience",
    DETAIL: (slug: string) => `/sirs-experience/${slug}`,
    GLOBAL_SAIONEERSS: "/sirs-experience/global-saIoneers",
  },

  GLOBAL_CONNECT: "/global-connect",

  STUDENT_LEADERS: "/student-leaders",

  ADMISSIONS: {
    ROOT: "/admissions",
    GUIDELINES: "/admissions/guidelines",
    TRANSFER_CERTIFICATES: "/admissions/transfer-certificates",
    EWS: "/admissions/ews-admissions",
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
      DETAIL: (id: string, title: string) => `/media/blogs/${id}/${title}`,
    },
    ALBUMS: {
      ROOT: "/media/albums",
    },
    RADIO_ORANGE: "/media/radio-orange",
    SAI_TV: "/media/sai-tv",
  },

  CAMPUS: {
    DETAIL: (slug: string) => `/campus/${slug}`,
  },
} as const;
