import { useLayoutEffect, useRef, type ReactNode } from "react";

type ScrollStackProps = {
  children: ReactNode;
  className?: string;
  itemDistance?: number;
  itemScale?: number;
  itemStackDistance?: number;
  baseScale?: number;
};

export function ScrollStackItem({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <article className={`scroll-stack-card ${className}`.trim()}>{children}</article>;
}

export default function ScrollStack({
  children,
  className = "",
  itemDistance = 72,
  itemScale = 0.035,
  itemStackDistance = 22,
  baseScale = 0.9,
}: ScrollStackProps) {
  const rootRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const cards = Array.from(root.querySelectorAll<HTMLElement>(".scroll-stack-card"));
    if (cards.length === 0) return;

    cards.forEach((card, index) => {
      card.style.marginBottom = `${itemDistance}px`;
      card.style.top = `${96 + index * itemStackDistance}px`;
      card.style.zIndex = String(index + 1);
    });

    let frame = 0;
    const update = () => {
      const vh = window.innerHeight;
      cards.forEach((card, index) => {
        const rect = card.getBoundingClientRect();
        const progress = Math.min(1, Math.max(0, (vh * 0.22 - rect.top) / (vh * 0.35)));
        const scale = 1 - progress * (1 - baseScale) - index * itemScale * progress;
        card.style.transform = `translate3d(0, 0, 0) scale(${Math.max(baseScale - 0.08, scale)})`;
      });
      frame = 0;
    };

    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [baseScale, itemDistance, itemScale, itemStackDistance, children]);

  return (
    <div ref={rootRef} className={`scroll-stack ${className}`.trim()}>
      <div className="scroll-stack-inner">{children}</div>
    </div>
  );
}
