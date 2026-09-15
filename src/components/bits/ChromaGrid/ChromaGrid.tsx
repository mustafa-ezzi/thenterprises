import { useEffect, useRef, type CSSProperties, type FC, type PointerEvent } from "react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import { usePrefersReducedMotion } from "../../../hooks/useLanding";
import GlareHover from "../GlareHover/GlareHover";

export type ChromaItem = {
  image: string;
  title: string;
  subtitle: string;
  borderColor?: string;
  gradient?: string;
  url?: string;
};

type ChromaGridProps = {
  items: ChromaItem[];
  className?: string;
  radius?: number;
  damping?: number;
  fadeOut?: number;
  ease?: string;
};

type SetterFn = (v: number | string) => void;

const ChromaGrid: FC<ChromaGridProps> = ({
  items,
  className = "",
  radius = 280,
  damping = 0.45,
  fadeOut = 0.6,
  ease = "power3.out",
}) => {
  const rootRef = useRef<HTMLDivElement>(null);
  const fadeRef = useRef<HTMLDivElement>(null);
  const setX = useRef<SetterFn | null>(null);
  const setY = useRef<SetterFn | null>(null);
  const pos = useRef({ x: 0, y: 0 });
  const reduce = usePrefersReducedMotion();

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    setX.current = gsap.quickSetter(el, "--x", "px") as SetterFn;
    setY.current = gsap.quickSetter(el, "--y", "px") as SetterFn;
    const { width, height } = el.getBoundingClientRect();
    pos.current = { x: width / 2, y: height / 2 };
    setX.current(pos.current.x);
    setY.current(pos.current.y);
  }, []);

  const moveTo = (x: number, y: number) => {
    gsap.to(pos.current, {
      x,
      y,
      duration: damping,
      ease,
      onUpdate: () => {
        setX.current?.(pos.current.x);
        setY.current?.(pos.current.y);
      },
      overwrite: true,
    });
  };

  const handleMove = (e: PointerEvent<HTMLDivElement>) => {
    if (reduce) return;
    const r = rootRef.current!.getBoundingClientRect();
    moveTo(e.clientX - r.left, e.clientY - r.top);
    gsap.to(fadeRef.current, { opacity: 0, duration: 0.25, overwrite: true });
  };

  const handleLeave = () => {
    if (reduce) return;
    gsap.to(fadeRef.current, { opacity: 1, duration: fadeOut, overwrite: true });
  };

  const maskClear =
    "radial-gradient(circle var(--r) at var(--x) var(--y),transparent 0%,transparent 15%,rgba(0,0,0,0.10) 30%,rgba(0,0,0,0.22)45%,rgba(0,0,0,0.35)60%,rgba(0,0,0,0.50)75%,rgba(0,0,0,0.68)88%,white 100%)";
  const maskFade =
    "radial-gradient(circle var(--r) at var(--x) var(--y),white 0%,white 15%,rgba(255,255,255,0.90)30%,rgba(255,255,255,0.78)45%,rgba(255,255,255,0.65)60%,rgba(255,255,255,0.50)75%,rgba(255,255,255,0.32)88%,transparent 100%)";

  return (
    <div
      ref={rootRef}
      onPointerMove={handleMove}
      onPointerLeave={handleLeave}
      className={`chroma-grid ${className}`.trim()}
      style={{ ["--r" as string]: `${radius}px`, ["--x" as string]: "50%", ["--y" as string]: "50%" } as CSSProperties}
    >
      {items.map((item) => (
        <GlareHover
          key={item.url ?? item.title}
          className="chroma-glare"
          glareColor="#ffffff"
          glareOpacity={0.28}
          borderRadius="18px"
        >
          <Link
            to={item.url || "/products"}
            className="chroma-card"
            style={
              {
                ["--card-border" as string]: item.borderColor || "#203163",
                background: item.gradient,
              } as CSSProperties
            }
          >
            <img
              src={item.image}
              alt={item.title}
              width={800}
              height={500}
              className="chroma-card-image"
              onError={(event) => {
                event.currentTarget.src = "/placeholders/category.svg";
              }}
            />
            <div className="chroma-card-copy">
              <h2>{item.title}</h2>
              <p>{item.subtitle}</p>
            </div>
          </Link>
        </GlareHover>
      ))}
      <div
        className="chroma-mask"
        style={{
          backdropFilter: "grayscale(1) brightness(0.78)",
          WebkitBackdropFilter: "grayscale(1) brightness(0.78)",
          maskImage: maskClear,
          WebkitMaskImage: maskClear,
        }}
      />
      <div
        ref={fadeRef}
        className="chroma-fade"
        style={{
          backdropFilter: "grayscale(1) brightness(0.78)",
          WebkitBackdropFilter: "grayscale(1) brightness(0.78)",
          maskImage: maskFade,
          WebkitMaskImage: maskFade,
        }}
      />
    </div>
  );
};

export default ChromaGrid;
