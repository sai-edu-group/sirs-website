export interface QuickContactDetail {
  icon: string;
  title: string;
  type: "email" | "phone" | "location";
  infoText: string[];
}

export const contactDetails: QuickContactDetail[] = [
  {
    icon: "mail",
    title: "Talk to Admissions",
    type: "email",
    infoText: ["admissions@sairesidentialschool.com"],
  },
  {
    icon: "footer-phone",
    title: "Connect by Phone",
    type: "phone",
    infoText: ["+91 9337377701"],
  },
  {
    icon: "campus",
    title: "Visit Our Campus",
    type: "location",
    infoText: ["SAI Residential School, Odisha, India"],
  },
];
