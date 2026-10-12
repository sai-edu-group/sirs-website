export const URLS = {
  HOME: "/",

  ABOUT: {
    ROOT: "/about",

    ETHOS: "/about/ethos",
    GURU_SHISHYA: "/about/guru-shishya-parampara",

    LEARNING_360: {
      ITEM: (name: string) => `/about/learning-360/${name}`,
    },

    LEARNING_AND_BEYOND: {
      ROOT: "/about/learning-and-beyond",
      AMENITY: (amenityTitle: string) =>
        `/about/learning-and-beyond/amenities/${amenityTitle}`,
      CURRICULUM: (curriculumTitle: string) =>
        `/about/learning-and-beyond/curriculum/${curriculumTitle}`,
      SAI_SEVA: (sevaTitle: string) =>
        `/about/learning-and-beyond/sai-seva/${sevaTitle}`,
      FLAGSHIP_EVENT: (eventTitle: string) =>
        `/about/learning-and-beyond/flagship-events/${eventTitle}`,
    },

    AFFILIATIONS: {
      ROOT: "/about/affiliations",
      ITEM: (name: string) => `/about/affiliations/${name}`,
    },

    TEAM_MEMBER: (name: string) => `/about/team/${name}/`,

    ADVISOR: {
      ITEM: (id: string, name: string) => `/about/founder/${id}/${name}`,
    },

    VISION_MISSION_VALUES: "/about/vision-mission-values",
  },

  AWARDS: "/awards",

  CONTACT: "/contact-us",

  NEWS: {
    ROOT: "/news",
    ITEM: (id: string, title: string) => `/news/${id}/${title}`,
  },

  CASE_STUDIES: {
    ROOT: "/case-studies",
    IIM: "/case/studies/iim",
  },

  RESULTS: {
    ROOT: "/results",
    CBSE_12: {
      ROOT: "/results/cbse-12th",
      STREAM: (streamId: string) => `/results/cbse-12th/${streamId}`,
    },

    CBSE_10: "/results/cbse-10th",

    CAREER_RESULTS: {
      ROOT: "/results/career-results",
      EXAM: (exam: string) => `/results/career-results/${exam}`,
    },

    PLACEMENTS: "/results/placements",
  },

  GLOBAL_CONNECT: {
    ROOT: "/global-connect",

    GLOBAL_VISION: "/global-connect/global-vision",

    PROGRAMS: {
      ROOT: "/global-connect/global-programs",
      ITEM: (programId: string) =>
        `/global-connect/global-programs/${programId}`,
    },

    PARTNERS: {
      ROOT: "/global-connect/global-partners",
      ITEM: (partnerId: string) =>
        `/global-connect/global-partners/${partnerId}`,
    },
  },

  ADVANCED_PLACEMENTS: "/ap-exams",

  STUDENT_LEADERS: {
    ROOT: "/student-leaders",
    STUDENT_COUNCIL: "/student-leaders/student-council",
    GLOBAL_SIONEERS: "/student-leaders/global-sioneers",
    ICONS_ACHIEVERS: "/student-leaders/icons-and-achievers",
  },

  MEDIA: {
    ROOT: "/media",

    NEWS: {
      ROOT: "/media/news-and-blogs",
      ITEM: (id: string, title: string) =>
        `/media/news-and-blogs/${id}/${title}`,
    },

    ANNOUNCEMENTS: "/blogs/announcement",

    BLOGS: {
      ROOT: "/media/blogs",
      ITEM: (blogId: string, title: string) =>
        `/media/blogs/${blogId}/${title}`,
    },

    PRESS_RELEASE: "/media/press-release",

    NEWS_BULLETIN: {
      ROOT: "/media/news-bulletin",
      ITEM: (bulletinId: string) => `/media/news-bulletin/${bulletinId}`,
    },

    ALBUMS: {
      ROOT: "/media/albums",
      ITEM: (albumId: string) => `/media/albums/${albumId}`,
    },

    RADIO_ORANGE: "/media/radio-orange",
    SAI_TV: "/media/sai-tv",
  },

  ADMISSIONS: {
    ROOT: "/admissions",
    GUIDELINE: "/admissions/guideline",
    EWS: "/admissions/ews-admission",
    TRANSFER_CERTIFICATES: "/admissions/transfer-certificates",
    APPLY_NOW: "https://saiinternational.edu.in/set/",
  },
} as const;
