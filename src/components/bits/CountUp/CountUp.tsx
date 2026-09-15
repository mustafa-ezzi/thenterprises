import { useEffect, useState } from "react";
import { usePrefersReducedMotion } from "../../../hooks/useLanding";

type CountUpProps = {
  to: number;
  duration?: number;
  delay?: number;
  suffix?: string;
  className?: string;
};

export default function CountUp({ to, duration = 1.5, delay = 1120, suffix = "", className = "" }: CountUpProps) {
  const reduce = usePrefersReducedMotion();
  const [value, setValue] = useState(reduce ? to : 0);

  useEffect(() => {
    if (reduce) {
      setValue(to);
      return;
    }

    let frame = 0;
    const timeout = window.setTimeout(() => {
      const start = performance.now();
      const tick = (now: number) => {
        const t = Math.min(1, (now - start) / (duration * 1000));
        const eased = 1 - (1 - t) ** 3;
        setValue(Math.round(to * eased));
        if (t < 1) frame = requestAnimationFrame(tick);
      };
      frame = requestAnimationFrame(tick);
    }, delay);

    return () => {
      window.clearTimeout(timeout);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [delay, duration, reduce, to]);

  return (
    <span className={`count-up ${className}`.trim()}>
      {value}
      {suffix}
    </span>
  );
}
