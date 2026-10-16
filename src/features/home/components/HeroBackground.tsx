import type { CSSProperties } from "react";

/*
 * Keyframes locales au hero pour ne pas toucher la feuille partagée src/index.css.
 * Les noms sont préfixés « hero- » pour éviter toute collision.
 */
const BACKGROUND_CSS = `
@keyframes hero-blob-a {
  0%, 100% { transform: translate3d(0, 0, 0) scale(1); }
  50% { transform: translate3d(4%, -5%, 0) scale(1.15); }
}
@keyframes hero-blob-b {
  0%, 100% { transform: translate3d(0, 0, 0) scale(1.08); }
  50% { transform: translate3d(-5%, 4%, 0) scale(1); }
}
@keyframes hero-grid-pan {
  from { transform: translate3d(0, 0, 0); }
  to { transform: translate3d(-52px, -52px, 0); }
}
@keyframes hero-fall {
  0% { transform: translate3d(0, -40px, 0); opacity: 0; }
  12% { opacity: .7; }
  100% { transform: translate3d(0, 640px, 0); opacity: 0; }
}
.hero-blob-a { animation: hero-blob-a 24s ease-in-out infinite; }
.hero-blob-b { animation: hero-blob-b 30s ease-in-out infinite; }
.hero-grid-pan { animation: hero-grid-pan 22s linear infinite; }
.hero-drop { animation: hero-fall linear infinite; }
@media (prefers-reduced-motion: reduce) {
  .hero-blob-a, .hero-blob-b, .hero-grid-pan, .hero-drop { animation: none; }
}
`;

const GRID_STYLE: CSSProperties = {
  backgroundImage:
    "linear-gradient(var(--color-border) 1px, transparent 1px), linear-gradient(90deg, var(--color-border) 1px, transparent 1px)",
  backgroundSize: "52px 52px",
  maskImage: "radial-gradient(115% 85% at 72% 28%, #000 0%, transparent 70%)",
  WebkitMaskImage: "radial-gradient(115% 85% at 72% 28%, #000 0%, transparent 70%)",
};

// Gouttes d'eau : positions/tailles/vitesses variées pour un effet naturel.
const DROPS = [
  { left: "8%", size: 5, delay: -2, duration: 11 },
  { left: "22%", size: 4, delay: -6, duration: 14 },
  { left: "37%", size: 6, delay: -9, duration: 12 },
  { left: "55%", size: 4, delay: -4, duration: 15 },
  { left: "68%", size: 5, delay: -11, duration: 10 },
  { left: "82%", size: 4, delay: -7, duration: 13 },
  { left: "93%", size: 6, delay: -3, duration: 16 },
];

export default function HeroBackground() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      <style>{BACKGROUND_CSS}</style>
      <div className="absolute inset-0 bg-gradient-to-b from-primary-soft/70 via-canvas to-canvas" />
      <div className="hero-grid-pan absolute -inset-12 opacity-50" style={GRID_STYLE} />
      <div className="hero-blob-a absolute -top-40 -right-32 size-150 rounded-full bg-primary-soft blur-3xl" />
      <div className="hero-blob-b absolute top-1/4 -left-28 size-120 rounded-full bg-accent/12 blur-3xl" />
      <div className="absolute right-1/4 -bottom-28 size-110 rounded-full bg-primary/10 blur-3xl" />
      {DROPS.map((drop, index) => (
        <span
          key={index}
          className="hero-drop absolute top-0 rounded-full bg-primary/25"
          style={{
            left: drop.left,
            width: drop.size,
            height: drop.size,
            animationDelay: `${drop.delay}s`,
            animationDuration: `${drop.duration}s`,
          }}
        />
      ))}
    </div>
  );
}
