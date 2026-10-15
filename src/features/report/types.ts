export type ReportStep = 1 | 2 | 3;

export type ReportLocation = {
  lat: number;
  lng: number;
  accuracy?: number;
  placeName: string;
  subtext?: string;
  isRealGps?: boolean;
};

export type ReportPhoto = {
  id: string;
  url: string;
  name: string;
  size?: number;
  file?: File;
  timestamp: number;
};
