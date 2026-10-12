export type NewsData = {
  id: number;
  years: number[];
  news: {
    [year: number]: NewsItemData[];
  };
};

export type NewsItemData = {
  id: number;
  title: string;
  img: string;
  thumbnailImg: string;
  topText: string;
  tags: string[];
  date: string;
  author: string;
  readTimeMins: number;
  content: string;
  landscapeImg: string;
};
