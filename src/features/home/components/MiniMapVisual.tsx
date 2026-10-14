export default function MiniMapVisual() {
  return (
    <div className="mini-map" aria-label="Aperçu de la carte des signalements">
      <div className="map-road road-one" />
      <div className="map-road road-two" />
      <div className="map-road road-three" />
      <span className="district d1">Pikine</span>
      <span className="district d2">Keur Massar</span>
      <span className="district d3">Thiaroye</span>
      <span className="fake-marker m1 knee">2</span>
      <span className="fake-marker m2 waist">!</span>
      <span className="fake-marker m3 ankle">1</span>
      <div className="map-preview-card"><b>72 points actifs</b><span>Mis à jour il y a 4 min</span></div>
    </div>
  );
}
