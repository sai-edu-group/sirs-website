export type ClassData = {
  id: number;
  name: string;
  years: number[];
  results: {
    [year: number]: ResultData[];
  };
};

export type ResultData = {
  id: number;
  studname: string;
  studprofilepic: string;
  percentage: string;
};

export type PlacementData = {
  id: number;
  name: string;
  image: string;
};
