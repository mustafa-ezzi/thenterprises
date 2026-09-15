import { useRef, type CSSProperties, type FC, type ReactNode } from "react";

type GlareHoverProps = {
  children?: ReactNode;
  className?: string;
  style?: CSSProperties;
  glareColor?: string;
  glareOpacity?: number;
  glareAngle?: number;
  glareSize?: number;
  transitionDuration?: number;
  borderRadius?: string;
};

const toRgba = (color: string, opacity: number) => {
  const hex = color.replace("#", "");
  if (/^[\dA-Fa-f]{6}$/.test(hex)) {
    const r = parseInt(hex.slice(0, 2), 16);
    const g = parseInt(hex.slice(2, 4), 16);
    const b = parseInt(hex.slice(4, 6), 16);
    return `rgba(${r}, ${g}, ${b}, ${opacity})`;
  }
  return color;
};

const GlareHover: FC<GlareHoverProps> = ({
  children,
  className = "",
  style = {},
  glareColor = "#ffffff",
  glareOpacity = 0.4,
  glareAngle = -45,
  glareSize = 250,
  transitionDuration = 650,
  borderRadius = "18px",
}) => {
  const overlayRef = useRef<HTMLDivElement>(null);
  const rgba = toRgba(glareColor, glareOpacity);

  const animateIn = () => {
    const el = overlayRef.current;
    if (!el) return;
    el.style.transition = "none";
    el.style.backgroundPosition = "-100% -100%, 0 0";
    el.style.transition = `${transitionDuration}ms ease`;
    el.style.backgroundPosition = "100% 100%, 0 0";
  };

  const animateOut = () => {
    const el = overlayRef.current;
    if (!el) return;
    el.style.transition = `${transitionDuration}ms ease`;
    el.style.backgroundPosition = "-100% -100%, 0 0";
  };

  return (
    <div
      className={`glare-hover ${className}`.trim()}
      style={{ borderRadius, ...style }}
      onMouseEnter={animateIn}
      onMouseLeave={animateOut}
    >
      {children}
      <div
        ref={overlayRef}
        className="glare-hover-overlay"
        style={{
          background: `linear-gradient(${glareAngle}deg, hsla(0,0%,0%,0) 60%, ${rgba} 70%, hsla(0,0%,0%,0) 100%)`,
          backgroundSize: `${glareSize}% ${glareSize}%, 100% 100%`,
          backgroundRepeat: "no-repeat",
          backgroundPosition: "-100% -100%, 0 0",
        }}
      />
    </div>
  );
};

export default GlareHover;
