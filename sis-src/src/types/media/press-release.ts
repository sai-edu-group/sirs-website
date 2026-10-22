export type PressReleaseData = {
  id: number;
  name: string;
  years: number[];
  releases: {
    [year: number]: PressReleaseItemData[];
  };
};

export type PressReleaseItemData = {
  id: number;
  name: string;
  image: string;
};
