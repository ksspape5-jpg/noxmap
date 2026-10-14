export type DistrictRank = {
  name: string;
  count: number;
  trend: string;
  black: boolean;
  recurring: boolean;
};

// Données de démonstration.
export const rankData: DistrictRank[] = [
  { name: "Keur Massar", count: 24, trend: "+8 aujourd'hui", black: true, recurring: true },
  { name: "Pikine", count: 18, trend: "+4 aujourd'hui", black: true, recurring: true },
  { name: "Thiaroye", count: 13, trend: "+2 aujourd'hui", black: false, recurring: true },
  { name: "Guédiawaye", count: 9, trend: "stable", black: false, recurring: false },
  { name: "Rufisque", count: 6, trend: "+1 aujourd'hui", black: false, recurring: false },
];
