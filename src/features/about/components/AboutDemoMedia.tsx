import { useState } from "react";
import HeroSlideshow from "./HeroSlideshow";

const DEMO_VIDEO_SRC = "/demo.mp4";

export default function AboutDemoMedia() {
  const [videoUnavailable, setVideoUnavailable] = useState(false);

  if (videoUnavailable) return <HeroSlideshow />;

  return (
    <figure className="m-0">
      <video
        className="aspect-[4/3] w-full rounded-[24px] border border-border bg-subtle object-cover shadow-[0_18px_50px_rgba(16,35,28,.12)]"
        controls
        playsInline
        preload="metadata"
        aria-label="Vidéo de démonstration de NdoxMap"
        onError={() => setVideoUnavailable(true)}
      >
        <source src={DEMO_VIDEO_SRC} type="video/mp4" />
      </video>
      <figcaption className="mt-2 text-[11px] leading-normal text-muted">
        Vidéo de démonstration de NdoxMap.
      </figcaption>
    </figure>
  );
}
