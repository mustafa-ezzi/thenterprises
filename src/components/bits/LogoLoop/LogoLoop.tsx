import type { CSSProperties, ReactNode } from "react";

export type LogoLoopItem = {
  alt: string;
  src?: string;
  href?: string;
  node?: ReactNode;
};

type LogoLoopProps = {
  logos: LogoLoopItem[];
  speed?: number;
  logoHeight?: number;
  gap?: number;
  pauseOnHover?: boolean;
  fadeOut?: boolean;
  duration?: number;
  className?: string;
};

export default function LogoLoop({
  logos,
  speed = 36,
  logoHeight = 28,
  gap = 48,
  pauseOnHover = true,
  fadeOut = true,
  duration,
  className = "",
}: LogoLoopProps) {
  if (logos.length === 0) return null;

  const loopDuration = duration ?? Math.max(18, (logos.length * gap) / Math.max(speed, 8));
  const track = [...logos, ...logos];

  return (
    <div
      className={`logo-loop${fadeOut ? " logo-loop--fade" : ""}${pauseOnHover ? " logo-loop--pause" : ""} ${className}`.trim()}
      style={
        {
          ["--loop-duration" as string]: `${loopDuration}s`,
          ["--loop-gap" as string]: `${gap}px`,
          ["--loop-height" as string]: `${logoHeight}px`,
        } as CSSProperties
      }
    >
      <div className="logo-loop-track">
        {track.map((item, index) => {
          const inner = item.src ? (
            <img src={item.src} alt={item.alt} className="logo-loop-img" />
          ) : (
            (item.node ?? <span className="logo-loop-name">{item.alt}</span>)
          );
          const key = `${item.alt}-${index}`;
          if (item.href) {
            return (
              <a key={key} href={item.href} className="logo-loop-item" aria-label={item.alt}>
                {inner}
              </a>
            );
          }
          return (
            <span key={key} className="logo-loop-item">
              {inner}
            </span>
          );
        })}
      </div>
    </div>
  );
}
