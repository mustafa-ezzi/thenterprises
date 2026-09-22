import { useState, type ReactNode } from "react";
import LogoLoop, { type LogoLoopItem } from "../bits/LogoLoop/LogoLoop";
import { brandLogoSources, supplyBrands, type SupplyBrand } from "../../data/brands";
import { usePrefersReducedMotion } from "../../hooks/useLanding";

function initials(name: string) {
  const parts = name.replace(/['’]/g, "").split(/\s+/).filter(Boolean);
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
}

function BrandMark({ brand }: { brand: SupplyBrand }) {
  const sources = brandLogoSources(brand.domain);
  const [sourceIndex, setSourceIndex] = useState(0);
  const src = sources[sourceIndex];

  return (
    <span className="hero-brand-card">
      {src ? (
        <img
          src={src}
          alt=""
          className="hero-brand-logo"
          onError={() => setSourceIndex((index) => index + 1)}
        />
      ) : (
        <span className="hero-brand-fallback" aria-hidden="true">
          {initials(brand.name)}
        </span>
      )}
      <span className="hero-brand-name">{brand.name}</span>
    </span>
  );
}

function toLogos(brands: SupplyBrand[]): LogoLoopItem[] {
  return brands.map((brand) => ({
    alt: brand.name,
    node: <BrandMark brand={brand} /> as ReactNode,
  }));
}

export function BrandStrip() {
  const reduce = usePrefersReducedMotion();
  const midpoint = Math.ceil(supplyBrands.length / 2);
  const top = toLogos(supplyBrands.slice(0, midpoint));
  const bottom = toLogos(supplyBrands.slice(midpoint));

  return (
    <div className="hero-brands" aria-label="Brands under one roof">
      <p className="hero-brands-label">Brands under one roof</p>
      <LogoLoop logos={top} speed={26} logoHeight={40} gap={16} pauseOnHover={!reduce} fadeOut />
      <LogoLoop
        logos={bottom}
        speed={22}
        logoHeight={40}
        gap={16}
        pauseOnHover={!reduce}
        fadeOut
        className="hero-brands-row--rtl"
      />
    </div>
  );
}
