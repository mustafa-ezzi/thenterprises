import { useState } from "react";
import { usePrefersReducedMotion } from "../../hooks/useLanding";
import { media } from "../../media";

export function HeroMedia() {
  const [videoFailed, setVideoFailed] = useState(false);
  const reduce = usePrefersReducedMotion();
  const showVideo = !reduce && !videoFailed;

  return (
    <div className="hero-media hero-photo">
      {showVideo ? (
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster={media.heroPoster}
          src={media.heroVideo}
          aria-hidden="true"
          onError={() => setVideoFailed(true)}
        />
      ) : (
        <img src={media.heroPoster} alt="" width={1920} height={1080} className="hero-poster" />
      )}
    </div>
  );
}
