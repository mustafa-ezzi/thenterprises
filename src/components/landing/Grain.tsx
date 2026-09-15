import Noise from "../bits/Noise/Noise";
import { usePrefersReducedMotion } from "../../hooks/useLanding";

export function Grain() {
  const reduce = usePrefersReducedMotion();
  if (reduce) return <div className="grain" aria-hidden="true" />;
  return (
    <div className="grain" aria-hidden="true">
      <Noise patternAlpha={14} patternRefreshInterval={3} />
    </div>
  );
}
