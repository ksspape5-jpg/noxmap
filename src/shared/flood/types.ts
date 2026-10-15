export type Level = "ankle" | "knee" | "waist";

export type LevelMeta = {
  label: string;
  short: string;
  color: string;
  radius: number;
  help: string;
};

export type FloodReport = {
  id: number;
  place: string;
  detail: string;
  time: string;
  level: Level;
  lat: number;
  lng: number;
  confirms: number;
  photo: boolean;
};
