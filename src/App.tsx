import { useEffect, useMemo, useState } from "react";
import {
  BrowserRouter,
  NavLink,
  Route,
  Routes,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import {
  ArrowRight,
  BarChart3,
  BellRing,
  Camera,
  Check,
  ChevronDown,
  CircleDot,
  CloudRain,
  Code2,
  Download,
  FileJson,
  FileText,
  Home,
  Info,
  Layers3,
  LocateFixed,
  Map as MapIcon,
  MapPin,
  Menu,
  Navigation,
  Plus,
  ShieldCheck,
  Sparkles,
  Trash2,
  TrendingUp,
  Waves,
  X,
} from "lucide-react";
import { CircleMarker, MapContainer, Popup, TileLayer, useMap } from "react-leaflet";
import type { LatLngExpression } from "leaflet";
import "leaflet/dist/leaflet.css";
import ChatFlottant from "./components/ChatFlottant";
import "./components/ChatFlottant.css";
import {
  buildRankingCsv,
  buildRankingGeoJson,
  periodFromFilter,
  rankMetricLabel,
  rankRows,
  seasonDelta,
  type RankMetric,
} from "./lib/ranking";

type Level = "ankle" | "knee" | "waist";
type PageTitleProps = { eyebrow?: string; title: string; description?: string };

const DAKAR: LatLngExpression = [14.75, -17.32];
const photoUrl =
  "https://images.unsplash.com/photo-1569103470612-0414542f9355?auto=format&fit=crop&w=720&q=75";

const levelMeta: Record<
  Level,
  { label: string; short: string; color: string; radius: number; help: string }
> = {
  ankle: {
    label: "Niveau cheville",
    short: "Cheville",
    color: "#D89516",
    radius: 8,
    help: "La rue reste praticable avec prudence.",
  },
  knee: {
    label: "Niveau genou",
    short: "Genou",
    color: "#DB5D27",
    radius: 11,
    help: "Le passage à pied devient dangereux.",
  },
  waist: {
    label: "Point noir — niveau taille",
    short: "Taille",
    color: "#421C22",
    radius: 15,
    help: "Zone dangereuse. Évitez tout passage.",
  },
};

const reports = [
  { id: 1, place: "Keur Massar", detail: "Unité 14, route de Jaxaay", time: "il y a 8 min", level: "waist" as Level, lat: 14.786, lng: -17.311, confirms: 3, photo: true },
  { id: 2, place: "Pikine", detail: "Rue 10, près du marché", time: "il y a 12 min", level: "knee" as Level, lat: 14.755, lng: -17.391, confirms: 2, photo: false },
  { id: 3, place: "Thiaroye", detail: "Route de la gare", time: "il y a 24 min", level: "ankle" as Level, lat: 14.746, lng: -17.36, confirms: 1, photo: false },
  { id: 4, place: "Guédiawaye", detail: "Cité Cheikh Wade", time: "il y a 37 min", level: "knee" as Level, lat: 14.775, lng: -17.411, confirms: 4, photo: true },
  { id: 5, place: "Rufisque", detail: "Canal de l'Ouest", time: "il y a 2 h", level: "waist" as Level, lat: 14.72, lng: -17.27, confirms: 5, photo: false },
  { id: 6, place: "Diamaguène", detail: "Route des Niayes", time: "il y a 3 h", level: "ankle" as Level, lat: 14.766, lng: -17.346, confirms: 2, photo: false },
];

const metricOptions: { key: RankMetric; label: string }[] = [
  { key: "volume", label: "Volume" },
  { key: "severity", label: "Gravité" },
  { key: "waist", label: "Taille" },
  { key: "knee", label: "Genou" },
  { key: "ankle", label: "Cheville" },
];

function downloadFile(filename: string, content: string, type: string) {
  const blob = new Blob([content], { type });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}

function Sparkline({ data, color = "currentColor" }: { data: number[]; color?: string }) {
  const width = 140;
  const height = 40;
  const pad = 3;
  const max = Math.max(...data, 1);
  const min = Math.min(...data, 0);
  const span = max - min || 1;
  const points = data
    .map((value, index) => {
      const x = pad + (index / Math.max(data.length - 1, 1)) * (width - pad * 2);
      const y = height - pad - ((value - min) / span) * (height - pad * 2);
      return `${x.toFixed(1)},${y.toFixed(1)}`;
    })
    .join(" ");
  return (
    <svg className="sparkline" viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="none" aria-hidden="true">
      <polyline points={points} fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function Logo() {
  return (
    <span className="logo-mark" aria-label="Points Noirs Dakar">
      <MapPin size={25} strokeWidth={2.5} />
      <Waves size={12} strokeWidth={3} />
    </span>
  );
}

function Button({
  children,
  variant = "primary",
  className = "",
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "ghost" | "danger";
}) {
  return (
    <button className={`btn btn-${variant} ${className}`} {...props}>
      {children}
    </button>
  );
}

function PageTitle({ eyebrow, title, description }: PageTitleProps) {
  return (
    <div className="page-title">
      {eyebrow && <p className="eyebrow">{eyebrow}</p>}
      <h1>{title}</h1>
      {description && <p>{description}</p>}
    </div>
  );
}

function DemoBadge() {
  return <span className="demo-badge">Données de démonstration</span>;
}

function LevelBadge({ level }: { level: Level }) {
  const meta = levelMeta[level];
  return (
    <span className={`level-badge level-${level}`}>
      <Waves size={14} />
      {meta.short}
      {level === "waist" && <b>Point noir</b>}
    </span>
  );
}

function WeatherAlert() {
  const [visible, setVisible] = useState(true);
  const navigate = useNavigate();
  if (!visible) return null;
  return (
    <aside className="weather-alert">
      <div className="weather-copy">
        <CloudRain size={22} />
        <div>
          <b>Vigilance pluie — simulation</b>
          <span>Forte pluie prévue demain soir : Keur Massar et Pikine à risque</span>
        </div>
      </div>
      <Button variant="ghost" onClick={() => navigate("/carte")}>
        Voir la carte <ArrowRight size={16} />
      </Button>
      <button className="icon-btn alert-close" aria-label="Fermer" onClick={() => setVisible(false)}>
        <X size={18} />
      </button>
    </aside>
  );
}

const navItems = [
  { to: "/", label: "Accueil", icon: Home },
  { to: "/carte", label: "Carte", icon: MapIcon },
  { to: "/signaler", label: "Signaler", icon: Plus, featured: true },
  { to: "/classement", label: "Classement", icon: BarChart3 },
  { to: "/a-propos", label: "À propos", icon: Info },
];

function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="header">
      <NavLink to="/" className="brand" aria-label="Accueil Points Noirs Dakar">
        <Logo />
        <span>Points Noirs <b>Dakar</b></span>
      </NavLink>
      <nav className="desktop-nav">
        {navItems.map(({ to, label, featured }) => (
          <NavLink key={to} to={to} className={({ isActive }) => `${featured ? "nav-report" : ""} ${isActive ? "active" : ""}`}>
            {featured && <Plus size={17} />} {label}
          </NavLink>
        ))}
      </nav>
      <button className="icon-btn menu-btn" aria-label="Ouvrir le menu" onClick={() => setOpen(!open)}>
        {open ? <X /> : <Menu />}
      </button>
      {open && (
        <nav className="mobile-menu">
          {navItems.map(({ to, label }) => (
            <NavLink key={to} to={to} onClick={() => setOpen(false)}>
              {label}
            </NavLink>
          ))}
        </nav>
      )}
    </header>
  );
}

function MobileNav() {
  return (
    <nav className="mobile-nav" aria-label="Navigation principale">
      {navItems.map(({ to, label, icon: Icon, featured }) => (
        <NavLink key={to} to={to} className={({ isActive }) => `${featured ? "nav-main" : ""} ${isActive ? "active" : ""}`}>
          <span><Icon size={featured ? 24 : 20} /></span>
          {label}
        </NavLink>
      ))}
    </nav>
  );
}

function Footer() {
  return (
    <footer>
      <div><Logo /><b>Un outil citoyen, construit au grand jour.</b></div>
      <p>Projet open source pour mieux comprendre et partager les risques d'inondation.</p>
      <a href="https://github.com/ksspape5-jpg/noxmap" target="_blank" rel="noreferrer"><Code2 size={16} /> Voir sur GitHub</a>
      <span>Hacktoberfest 2026 Dakar — Galsen DEV</span>
    </footer>
  );
}

function AppLayout() {
  const location = useLocation();
  const isMap = location.pathname === "/carte";
  return (
    <div className={`app-shell ${isMap ? "map-route" : ""}`}>
      <Header />
      {!isMap && <WeatherAlert />}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/carte" element={<MapPage />} />
        <Route path="/signaler" element={<ReportPage />} />
        <Route path="/classement" element={<RankingPage />} />
        <Route path="/a-propos" element={<AboutPage />} />
      </Routes>
      {!isMap && <Footer />}
      <MobileNav />
      <ChatFlottant />
    </div>
  );
}

function MiniMapVisual() {
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

function Roadmap() {
  const items = [
    ["Lecture des photos (hauteur, confiance)", "MVP", Sparkles],
    ["Floutage des visages et plaques", "MVP", ShieldCheck],
    ["Détection des doublons", "MVP", Layers3],
    ["Messages vocaux (français, wolof)", "V2", Waves],
    ["Lieu depuis un texte ou un vocal", "V2", MapPin],
    ["Réponses WhatsApp depuis la carte", "V2", BellRing],
    ["Modération des contenus", "V2", ShieldCheck],
    ["Rapports automatiques pour la mairie", "V3", FileText],
    ["Prédiction des quartiers à risque", "V3", TrendingUp],
    ["Alertes météo réelles", "V3", CloudRain],
  ] as const;
  return (
    <section className="roadmap">
      <div className="section-heading">
        <div><p className="eyebrow">Feuille de route IA</p><h2>Ce que nous voulons construire ensuite</h2></div>
        <span className="soon-pill">Bientôt</span>
      </div>
      <p>Ces fonctions présentent notre vision. Elles ne sont pas encore actives dans cette démo. Le premier prototype se concentre sur la lecture des photos, le floutage des visages et plaques, et la détection des doublons.</p>
      <div className="roadmap-grid">
        {items.map(([label, priority, Icon]) => (
          <div key={label}><Icon size={21} /><span>{label}</span><small className={`priority-${priority.toLowerCase()}`}>{priority}</small></div>
        ))}
      </div>
    </section>
  );
}

function HomePage() {
  const navigate = useNavigate();
  return (
    <main>
      <section className="hero">
        <div className="hero-copy">
          <DemoBadge />
          <h1>Voir où l'eau monte.<br /><em>Agir plus vite.</em></h1>
          <p>Une carte citoyenne des rues inondées à Dakar et dans sa banlieue, alimentée par les habitants.</p>
          <div className="hero-actions">
            <Button onClick={() => navigate("/carte")}><MapIcon size={19} /> Voir la carte</Button>
            <Button variant="secondary" onClick={() => navigate("/signaler")}><Plus size={19} /> Ici c'est inondé</Button>
          </div>
          <p className="safety-note"><ShieldCheck size={17} /> Aide à réagir, ne remplace ni les alertes officielles ni les secours.</p>
        </div>
        <div className="hero-map"><MiniMapVisual /></div>
      </section>

      <section className="stats-section">
        <div className="stats-head"><span>La situation aujourd'hui</span><DemoBadge /></div>
        <div className="stats-grid">
          <div><strong>72</strong><span>signalements actifs</span><small><TrendingUp size={13} /> +16 depuis ce matin</small></div>
          <div><strong>5</strong><span>quartiers touchés</span><small>sur la zone de démo</small></div>
          <div><strong>8 min</strong><span>dernier point noir</span><small>Keur Massar</small></div>
          <div><strong>18</strong><span>points confirmés</span><small>par plusieurs habitants</small></div>
        </div>
      </section>

      <section className="how-section">
        <div className="section-heading"><div><p className="eyebrow">Simple et citoyen</p><h2>Trois gestes pour mieux circuler</h2></div></div>
        <div className="steps-grid">
          <article><span>01</span><div className="step-icon"><MapPin /></div><h3>Signaler</h3><p>Indiquez le lieu et le niveau d'eau en moins d'une minute.</p></article>
          <article><span>02</span><div className="step-icon"><MapIcon /></div><h3>Voir</h3><p>Consultez la carte et évitez les rues les plus touchées.</p></article>
          <article><span>03</span><div className="step-icon"><BellRing /></div><h3>Prévenir</h3><p>Partagez une information utile avec votre quartier.</p></article>
        </div>
      </section>
      <Roadmap />
    </main>
  );
}

function MapController({ center }: { center?: [number, number] }) {
  const map = useMap();
  useEffect(() => {
    if (center) map.flyTo(center, 14, { duration: 0.8 });
  }, [center, map]);
  return null;
}

function MapCanvas({
  onSelect,
  selected,
  newReport,
  compact = false,
  center,
}: {
  onSelect?: (id: number) => void;
  selected?: number | null;
  newReport?: boolean;
  compact?: boolean;
  center?: [number, number];
}) {
  const visibleReports = compact ? reports.slice(0, 3) : reports;
  return (
    <MapContainer center={DAKAR} zoom={11} zoomControl={!compact} scrollWheelZoom className="leaflet-map">
      <TileLayer attribution="&copy; OpenStreetMap" url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      {visibleReports.map((report) => {
        const meta = levelMeta[report.level];
        return (
          <CircleMarker
            key={report.id}
            center={[report.lat, report.lng]}
            radius={meta.radius + (selected === report.id ? 4 : 0)}
            pathOptions={{ fillColor: meta.color, color: "#fff", weight: selected === report.id ? 5 : 3, fillOpacity: 1 }}
            eventHandlers={{ click: () => onSelect?.(report.id) }}
          >
            {!compact && (
              <Popup>
                <b>{meta.label}</b><br />{report.place} · {report.time}
              </Popup>
            )}
          </CircleMarker>
        );
      })}
      {newReport && (
        <CircleMarker center={[14.778, -17.33]} radius={19} pathOptions={{ fillColor: "#421C22", color: "#fff", weight: 6, fillOpacity: 1 }}>
          <Popup><b>Nouveau point noir</b><br />Votre signalement vient d'être ajouté.</Popup>
        </CircleMarker>
      )}
      <MapController center={center} />
    </MapContainer>
  );
}

function Filters({ active, onChange }: { active: string; onChange: (filter: string) => void }) {
  return (
    <div className="filters" role="group" aria-label="Période">
      {["Dernière heure", "Aujourd'hui", "7 jours"].map((filter) => (
        <button key={filter} className={active === filter ? "active" : ""} onClick={() => onChange(filter)}>{filter}</button>
      ))}
    </div>
  );
}

function Legend() {
  const [open, setOpen] = useState(false);
  return (
    <div className={`map-legend ${open ? "open" : ""}`}>
      <button onClick={() => setOpen(!open)}><Layers3 size={17} /> Légende <ChevronDown size={16} /></button>
      {open && (
        <div>
          {(Object.keys(levelMeta) as Level[]).map((level) => (
            <span key={level}><i className={`legend-dot ${level}`} /><b>{levelMeta[level].short}</b>{level === "waist" && <small>Point noir</small>}</span>
          ))}
        </div>
      )}
    </div>
  );
}

function ReportDetail({ reportId, onClose }: { reportId: number; onClose: () => void }) {
  const report = reports.find((item) => item.id === reportId)!;
  return (
    <aside className="report-sheet">
      <div className="sheet-handle" />
      <button className="icon-btn sheet-close" aria-label="Fermer" onClick={onClose}><X size={19} /></button>
      {report.photo && <img src={photoUrl} alt="Rue du quartier signalée, photo de démonstration" />}
      <div className="sheet-content">
        <LevelBadge level={report.level} />
        <h2>{report.place}</h2>
        <p>{report.detail} · {report.time}</p>
        <div className="confirm-row"><span><Check size={16} /></span><div><b>Confirmé par {report.confirms} signalements</b><small>Concordance des informations reçues</small></div></div>
        <div className="expiry"><Info size={17} /><span><b>Point temporaire</b>Il expirera dans 2 h sans nouvelle confirmation.</span></div>
        <Button className="w-full"><Navigation size={18} /> Voir un itinéraire alternatif</Button>
      </div>
    </aside>
  );
}

function MapPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const focus = searchParams.get("focus");
  const focusReport = focus ? reports.find((report) => report.place === focus) : undefined;
  const focusCenter = useMemo<[number, number] | undefined>(
    () => (focusReport ? [focusReport.lat, focusReport.lng] : undefined),
    [focusReport],
  );
  const [filter, setFilter] = useState("Aujourd'hui");
  const [selected, setSelected] = useState<number | null>(
    focusReport ? focusReport.id : location.state?.newReport ? 1 : null,
  );
  const [legendOpen] = useState(true);
  const newReport = Boolean(location.state?.newReport);
  return (
    <main className="map-page">
      <aside className="reports-panel">
        <div className="panel-head">
          <p className="eyebrow">Carte citoyenne</p>
          <h1>Points actifs</h1>
          <p><span className="live-dot" /> 72 signalements · données démo</p>
        </div>
        <Filters active={filter} onChange={setFilter} />
        <div className="report-list">
          {reports.map((report) => (
            <button key={report.id} className={selected === report.id ? "active" : ""} onClick={() => setSelected(report.id)}>
              <span className={`list-marker ${report.level}`}><Waves size={15} /></span>
              <span><b>{report.place}</b><small>{report.detail}</small><em>{report.time}</em></span>
              <LevelBadge level={report.level} />
            </button>
          ))}
        </div>
      </aside>
      <section className="map-stage">
        <MapCanvas onSelect={setSelected} selected={selected} newReport={newReport} center={focusCenter} />
        <div className="map-top-mobile"><Filters active={filter} onChange={setFilter} /></div>
        <div className="map-status"><span className="live-dot" /> 72 points actifs <small>démo</small></div>
        {legendOpen && <Legend />}
        <button className="locate-btn" aria-label="Ma position"><LocateFixed size={20} /><span>Ma position</span></button>
        <Button className="floating-report" onClick={() => navigate("/signaler")}><Plus size={20} /> Ici c'est inondé</Button>
        {selected && <ReportDetail reportId={selected} onClose={() => setSelected(null)} />}
        {newReport && !selected && <div className="success-toast"><Check size={18} /><span><b>Signalement ajouté</b>Le nouveau point est mis en avant.</span></div>}
      </section>
    </main>
  );
}

function LevelCard({ level, selected, onClick }: { level: Level; selected: boolean; onClick: () => void }) {
  const meta = levelMeta[level];
  return (
    <button className={`level-card ${selected ? "selected" : ""} ${level === "waist" ? "critical" : ""}`} onClick={onClick}>
      <span className="water-figure">
        <i className={`water-line ${level}`} />
        <span />
      </span>
      <span className="level-copy"><b>{meta.short}</b><small>{meta.help}</small>{level === "waist" && <em>Point noir</em>}</span>
      <span className="select-circle">{selected && <Check size={15} />}</span>
    </button>
  );
}

function ReportPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [locationSet, setLocationSet] = useState(false);
  const [level, setLevel] = useState<Level | null>(null);
  const [photo, setPhoto] = useState(false);
  const [consent, setConsent] = useState(false);
  const [error, setError] = useState("");
  const [sending, setSending] = useState(false);

  const next = () => {
    if (!locationSet) return setError("Choisissez un lieu sur la carte ou utilisez votre position.");
    setError("");
    setStep(2);
  };
  const submit = () => {
    if (!level || !consent) return setError("Choisissez un niveau et confirmez la règle de confidentialité.");
    setSending(true);
    window.setTimeout(() => { setSending(false); setStep(3); }, 800);
  };

  if (step === 3) {
    return (
      <main className="form-page confirmation-page">
        <section className="confirmation-card">
          <span className="success-icon"><Check size={34} /></span>
          <p className="eyebrow">Signalement envoyé</p>
          <h1>Merci, votre signalement est sur la carte.</h1>
          <p>Les habitants peuvent maintenant voir ce point et le confirmer.</p>
          <div className="summary-card"><span><MapPin /></span><div><b>Keur Massar — Unité 14</b><small>À l'instant · {level && levelMeta[level].label}</small></div>{level && <LevelBadge level={level} />}</div>
          <div className="privacy-confirm"><ShieldCheck size={18} /> Aucune adresse de maison n'est publiée.</div>
          <Button onClick={() => navigate("/carte", { state: { newReport: true } })}><MapIcon size={18} /> Voir sur la carte</Button>
          <Button variant="secondary" onClick={() => { setStep(1); setLevel(null); setLocationSet(false); }}><Plus size={18} /> Nouveau signalement</Button>
        </section>
      </main>
    );
  }

  return (
    <main className="form-page">
      <section className="form-shell">
        <div className="form-main">
        <div className="progress-head">
          <button className="back-link" onClick={() => step === 2 ? setStep(1) : navigate(-1)}>← Retour</button>
          <span>Étape {step} sur 2</span>
        </div>
        <div className="progress-track"><i className={step === 2 ? "full" : ""} /></div>
        {step === 1 ? (
          <>
            <PageTitle eyebrow="Nouveau signalement" title="Où est-ce inondé ?" description="Touchez la carte pour placer le point au plus près. Aucune adresse de maison ne sera publiée." />
            <div className={`location-map ${locationSet ? "selected" : ""}`} onClick={() => { setLocationSet(true); setError(""); }}>
              <MapCanvas compact />
              <span className="location-pin"><MapPin size={24} /></span>
              {locationSet && <span className="location-label"><Check size={15} /> Keur Massar, Unité 14</span>}
            </div>
            <div className="or-divider"><span>ou</span></div>
            <Button variant="secondary" className="w-full" onClick={() => { setLocationSet(true); setError(""); }}><LocateFixed size={19} /> Utiliser ma position</Button>
            {error && <p className="form-error"><Info size={16} />{error}</p>}
            <Button className="w-full" onClick={next}>Continuer <ArrowRight size={18} /></Button>
          </>
        ) : (
          <>
            <PageTitle eyebrow="Nouveau signalement" title="Quel niveau d'eau ?" description="Choisissez le niveau le plus proche de ce que vous observez." />
            <div className="level-selector">
              {(Object.keys(levelMeta) as Level[]).map((item) => <LevelCard key={item} level={item} selected={level === item} onClick={() => { setLevel(item); setError(""); }} />)}
            </div>
            <div className="photo-field">
              {!photo ? (
                <button onClick={() => setPhoto(true)}><span><Camera size={21} /></span><div><b>Ajouter une photo</b><small>Facultatif · aide à confirmer le niveau</small></div><Plus size={19} /></button>
              ) : (
                <div className="photo-preview"><img src={photoUrl} alt="Aperçu de la photo ajoutée" /><div><b>Photo ajoutée</b><small>Les visages et plaques seront floutés.</small></div><button aria-label="Retirer la photo" onClick={() => setPhoto(false)}><Trash2 size={18} /></button></div>
              )}
            </div>
            <label className="consent-row"><input type="checkbox" checked={consent} onChange={(event) => setConsent(event.target.checked)} /><span><b>Je confirme que l'information est actuelle.</b> Les visages et plaques seront floutés. Aucune adresse de maison n'est publiée.</span></label>
            {error && <p className="form-error"><Info size={16} />{error}</p>}
            <Button className="w-full" onClick={submit} disabled={sending}>{sending ? <><span className="spinner" /> Envoi en cours…</> : <>Publier le signalement <ArrowRight size={18} /></>}</Button>
          </>
        )}
        </div>
        <aside className="form-assurance">
          <DemoBadge />
          <div className="assurance-icon"><ShieldCheck size={28} /></div>
          <h2>Un signalement utile, sans compte.</h2>
          <p>Deux informations suffisent pour aider les habitants à éviter une rue inondée.</p>
          <ol>
            <li className={step === 1 ? "active" : "done"}><span>{step === 1 ? "1" : <Check size={14} />}</span><div><b>Placer le point</b><small>Position approximative publique</small></div></li>
            <li className={step === 2 ? "active" : ""}><span>2</span><div><b>Décrire le niveau</b><small>Photo toujours facultative</small></div></li>
          </ol>
          <div className="assurance-note"><ShieldCheck size={18} /><span><b>Vie privée visible</b>Aucun nom, téléphone ou adresse personnelle n'est demandé.</span></div>
        </aside>
      </section>
    </main>
  );
}

function RankingPage() {
  const [filter, setFilter] = useState("Aujourd'hui");
  const [metric, setMetric] = useState<RankMetric>("volume");
  const [recurringOnly, setRecurringOnly] = useState(false);
  const [selected, setSelected] = useState<string | null>(null);
  const navigate = useNavigate();

  const period = periodFromFilter(filter);
  const rows = rankRows(metric, period, recurringOnly);
  const max = Math.max(...rows.map((item) => item.value), 1);
  const total = rows.reduce((sum, item) => sum + item.value, 0);
  const top = rows[0];
  const share = top && total > 0 ? Math.round((top.value / total) * 100) : 0;
  const detail = rows.find((item) => item.name === selected) ?? null;
  const unit = rankMetricLabel(metric);
  const focusMap = (name: string) => navigate(`/carte?focus=${encodeURIComponent(name)}`);

  const exportCsv = () => downloadFile("points-noirs-classement.csv", buildRankingCsv(rows), "text/csv;charset=utf-8");
  const exportGeoJson = () => downloadFile("points-noirs-classement.geojson", buildRankingGeoJson(rows), "application/geo+json");
  const exportPdf = () => window.print();

  return (
    <main className="content-page ranking-page">
      <div className="content-container">
        <PageTitle eyebrow="Priorités citoyennes" title="Quartiers les plus touchés" description="Une lecture simple des signalements reçus pour aider à prioriser les interventions." />
        <div className="ranking-toolbar">
          <Filters active={filter} onChange={setFilter} />
          <div className="ranking-metrics" role="group" aria-label="Indicateur affiché">
            {metricOptions.map((option) => (
              <button key={option.key} className={`rank-chip ${metric === option.key ? "active" : ""}`} onClick={() => setMetric(option.key)}>
                {option.label}
              </button>
            ))}
            <button className={`rank-chip ${recurringOnly ? "active" : ""}`} onClick={() => setRecurringOnly((value) => !value)}>
              <TrendingUp size={14} /> Zones récurrentes
            </button>
          </div>
          <div className="ranking-actions">
            <DemoBadge />
            <button className="rank-export" onClick={exportCsv}><Download size={15} /> CSV</button>
            <button className="rank-export" onClick={exportGeoJson}><FileJson size={15} /> GeoJSON</button>
            <button className="rank-export" onClick={exportPdf}><FileText size={15} /> PDF</button>
          </div>
        </div>
        <div className="ranking-layout">
          <section className="ranking-list">
            {rows.map((item, index) => (
              <button key={item.name} className={`rank-item ${selected === item.name ? "active" : ""}`} onClick={() => setSelected(item.name)}>
                <span className={`rank-number ${index < 3 ? "top" : ""}`}>{String(index + 1).padStart(2, "0")}</span>
                <span className="rank-main">
                  <span className="rank-title"><b>{item.name}</b>{item.recurring && <em>Zone récurrente</em>}</span>
                  <span className="bar-track"><i style={{ width: `${Math.round((item.value / max) * 100)}%` }} /></span>
                  <small><TrendingUp size={13} /> {item.trend}</small>
                </span>
                <span className="rank-count"><b>{item.value}</b><small>{unit}</small>{item.black && <em>Point noir</em>}</span>
                <ArrowRight size={18} />
              </button>
            ))}
          </section>
          {detail ? (
            <aside className="ranking-detail">
              <button className="icon-btn detail-close" aria-label="Fermer le détail" onClick={() => setSelected(null)}><X size={17} /></button>
              <p className="eyebrow">Détail du quartier</p>
              <h2>{detail.name}</h2>
              <div className="detail-tags">
                {detail.black && <span className="tag-black">Point noir</span>}
                {detail.recurring && <span className="tag-recurring">Zone récurrente</span>}
              </div>
              <div className="detail-stat">
                <b>{detail.value}</b>
                <span>{unit} · {total > 0 ? Math.round((detail.value / total) * 100) : 0} % du total</span>
              </div>
              {(() => {
                const delta = seasonDelta(detail);
                return (
                  <div className={`detail-season ${delta >= 0 ? "up" : "down"}`}>
                    <TrendingUp size={15} />
                    <span><b>{delta >= 0 ? `+${delta}` : delta} %</b> vs saison précédente ({detail.previous} signalements)</span>
                  </div>
                );
              })()}
              <div className="detail-chart">
                <span>Évolution sur 7 jours</span>
                <Sparkline data={detail.history} color="#3d5f58" />
              </div>
              <div className="detail-levels">
                <span className="detail-levels-title">Répartition par niveau (24 h)</span>
                {(Object.keys(levelMeta) as Level[]).map((level) => {
                  const value = detail.levels[level];
                  const pct = detail.counts.day > 0 ? Math.round((value / detail.counts.day) * 100) : 0;
                  return (
                    <span key={level} className="detail-level">
                      <i className={`legend-dot ${level}`} />
                      <b>{levelMeta[level].short}</b>
                      <span className="detail-level-bar"><i style={{ width: `${pct}%`, background: levelMeta[level].color }} /></span>
                      <small>{value}</small>
                    </span>
                  );
                })}
              </div>
              <Button className="w-full" onClick={() => focusMap(detail.name)}><MapIcon size={17} /> Voir sur la carte</Button>
              <Button variant="secondary" className="w-full" onClick={() => navigate("/signaler")}><Plus size={17} /> Signaler ici</Button>
            </aside>
          ) : (
            <aside className="ranking-summary">
              <div><span className="summary-icon"><BarChart3 /></span><h2>{total} {unit}</h2><p>recensés sur {rows.length} quartiers dans cette démonstration.</p></div>
              <hr />
              <p><b>À retenir</b>{top ? `${top.name} concentre ${share} % du total et les niveaux les plus élevés.` : "Aucun quartier ne correspond à ce filtre."}</p>
              <p className="summary-hint">Touchez un quartier pour voir son détail et l'ouvrir sur la carte.</p>
              <Button onClick={() => navigate("/carte")}>Explorer la carte <ArrowRight size={17} /></Button>
            </aside>
          )}
        </div>
        <Roadmap />
      </div>
    </main>
  );
}

function AboutPage() {
  return (
    <main className="content-page about-page">
      <div className="content-container">
        <PageTitle eyebrow="À propos du projet" title="Une carte construite avec les habitants, pour les habitants." description="Points Noirs Dakar est une démonstration open source née au Hacktoberfest 2026 Dakar." />
        <section className="about-grid">
          <article><span><Waves /></span><h2>Le problème</h2><p>Après une forte pluie, l'information sur les rues impraticables circule difficilement entre quartiers.</p></article>
          <article><span><MapIcon /></span><h2>Notre réponse</h2><p>Un signalement simple, une carte partagée et des données lisibles pour orienter l'attention.</p></article>
          <article><span><ShieldCheck /></span><h2>Vie privée d'abord</h2><p>Pas de compte, pas d'adresse de maison. Les visages et plaques seront floutés dans une future version.</p></article>
          <article><span><Info /></span><h2>Nos limites</h2><p>Les informations sont citoyennes et peuvent être incomplètes. Cet outil ne remplace pas les secours.</p></article>
        </section>
        <section className="wolof-note"><p className="eyebrow">Bienvenue</p><h2>Dalal ak jàmm — soyez les bienvenus.</h2><p>Quelques contenus pourront être proposés en wolof. Toute traduction sera validée par un locuteur natif avant mise en ligne.</p></section>
        <section className="wolof-note"><p className="eyebrow">Principes</p><h2>Ce que l'IA ne fait pas.</h2><p>Elle ne décide jamais seule d'une urgence, elle n'invente pas d'information — elle répond « donnée insuffisante » quand elle ne sait pas — et elle indique toujours un niveau de confiance.</p></section>
        <section className="opensource-card"><Code2 size={30} /><div><h2>Ouvert par principe</h2><p>Le code a vocation à être publié sous licence MIT. Une équipe de 4 contribue à cette démo avec le soutien de Galsen DEV et MLH.</p></div><a href="https://github.com/ksspape5-jpg/noxmap"><Code2 size={17} /> Explorer le projet</a></section>
        <Roadmap />
      </div>
    </main>
  );
}

export default function App() {
  return <BrowserRouter><AppLayout /></BrowserRouter>;
}
