export type AwardItemData = {
  id: number;
  image: string;
  year: string;
  title: string;
  description: string;
};

export type AwardsData = {
  years: number[];
  awards: {
    [year: number]: AwardItemData[];
  };
};
