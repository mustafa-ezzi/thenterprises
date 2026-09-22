import { Link } from "react-router-dom";
import { BrandMark } from "../brands/BrandMark";
import LogoLoop from "../bits/LogoLoop/LogoLoop";
import { supplyBrands } from "../../data/brands";
import { usePrefersReducedMotion } from "../../hooks/useLanding";

const logos = supplyBrands.map((brand) => ({
  alt: brand.name,
  node: <BrandMark brand={brand} variant="pill" />,
}));

export function BrandStrip() {
  const reduce = usePrefersReducedMotion();

  return (
    <div className="hero-brands" aria-label="Brands under one roof">
      <p className="hero-brands-label">
        <Link to="/brands">Trusted brands</Link>
      </p>
      <LogoLoop
        logos={logos}
        speed={8}
        logoHeight={28}
        gap={14}
        duration={120}
        pauseOnHover={!reduce}
        fadeOut
      />
    </div>
  );
}
