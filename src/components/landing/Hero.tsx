import Magnet from "../bits/Magnet/Magnet";
import ShinyText from "../bits/ShinyText/ShinyText";
import { landingCopy } from "../../data/company";
import { usePrefersReducedMotion } from "../../hooks/useLanding";
import { Button } from "../ui/Button";

export function Hero() {
  const reduce = usePrefersReducedMotion();

  return (
    <section className="hero" id="top">
      <div className="hero-copy">
        <div className="badge appear appear--pop" style={{ ["--d" as string]: "0.22s" }}>
          <svg className="badge-star" viewBox="0 0 24 24" fill="white" aria-hidden="true">
            <path d="M12 2.6C12.55 2.6 12.88 3.15 13.08 4.7c.62 4.7 1.52 5.6 6.22 6.22 1.55.2 2.1.53 2.1 1.08s-.55.88-2.1 1.08c-4.7.62-5.6 1.52-6.22 6.22-.2 1.55-.53 2.1-1.08 2.1s-.88-.55-1.08-2.1c-.62-4.7-1.52-5.6-6.22-6.22C3.15 12.88 2.6 12.55 2.6 12s.55-.88 2.1-1.08c4.7-.62 5.6-1.52 6.22-6.22C11.12 3.15 11.45 2.6 12 2.6Z" />
          </svg>
          <ShinyText text={landingCopy.badge} disabled={reduce} />
        </div>

        <h1>
          <span className="headline-line">
            <span className="appear appear--mask" style={{ ["--d" as string]: "0.42s", display: "inline-block" }}>
              {landingCopy.h1Line1Before}
              <em>{landingCopy.h1Emphasis}</em>
              {landingCopy.h1Line1After}
            </span>
          </span>
          <span className="headline-line">
            <span className="appear appear--mask" style={{ ["--d" as string]: "0.62s", display: "inline-block" }}>
              {landingCopy.h1Line2}
            </span>
          </span>
        </h1>

        <p className="lede appear appear--soft" style={{ ["--d" as string]: "0.82s" }}>
          {landingCopy.lede}
        </p>

        <div className="hero-actions">
          <Magnet padding={60} magnetStrength={3} disabled={reduce}>
            <Button
              to="/contact"
              variant="solid"
              className="btn-hero appear appear--btn"
              style={{ ["--d" as string]: "0.96s" }}
            >
              {landingCopy.ctaQuote}
            </Button>
          </Magnet>
          <Magnet padding={60} magnetStrength={3} disabled={reduce}>
            <Button
              to="/products"
              variant="ghost"
              className="btn-hero appear appear--side"
              style={{ ["--d" as string]: "1.10s" }}
            >
              {landingCopy.ctaCatalog}
            </Button>
          </Magnet>
        </div>
      </div>
    </section>
  );
}
