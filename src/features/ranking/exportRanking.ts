import { buildRankingCsv, buildRankingGeoJson, type RankRow } from "./rankingData";

function downloadFile(filename: string, content: string, type: string) {
  const url = URL.createObjectURL(new Blob([content], { type }));
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}

export const exportCsv = (rows: RankRow[]) =>
  downloadFile("points-noirs-classement.csv", buildRankingCsv(rows), "text/csv;charset=utf-8");

export const exportGeoJson = (rows: RankRow[]) =>
  downloadFile("points-noirs-classement.geojson", buildRankingGeoJson(rows), "application/geo+json");

// Le PDF passe par l'impression du navigateur : seuls le titre et la liste sont imprimés (voir `print:hidden`).
export const exportPdf = () => window.print();
