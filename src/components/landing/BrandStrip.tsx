import LogoLoop from "../bits/LogoLoop/LogoLoop";
import { supplyBrands } from "../../data/brands";
import { usePrefersReducedMotion } from "../../hooks/useLanding";

const logos = supplyBrands.map((name) => ({ alt: name }));

export function BrandStrip() {
  const reduce = usePrefersReducedMotion();

  return (
    <div className="hero-brands" aria-label="Brands under one roof">
      <LogoLoop logos={logos} speed={28} logoHeight={18} gap={52} pauseOnHover={!reduce} fadeOut />
    </div>
  );
}
