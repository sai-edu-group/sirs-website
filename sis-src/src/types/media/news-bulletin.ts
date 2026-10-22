export type NewsBulletinData = {
  id: number;
  years: number[];
  news: {
    [year: number]: NewsBulletinItemData[];
  };
};

export type NewsBulletinItemData = {
  id: number;
  name: string;
  image: string;
  contentUrl: string;
};
