export type AlbumsData = {
  id: number;
  years: number[];
  images: {
    [year: number]: AlbumsItemData[];
  };
};

export type AlbumsItemData = {
  id: number;
  name: string;
  image: string;
  content: string[];
};
