export type AchieverItemData = {
  id: number;
  name: string;
  description: string;
  date: string;
};

export type AchieversData = {
  years: number[];
  achievers: {
    [year: number]: AchieverItemData[];
  };
};
