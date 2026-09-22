import { useState } from "react";
import { brandLogoSources, type SupplyBrand } from "../../data/brands";

function initials(name: string) {
  const parts = name.replace(/['’]/g, "").split(/\s+/).filter(Boolean);
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
}

type BrandMarkProps = {
  brand: SupplyBrand;
  variant?: "pill" | "diamond";
};

export function BrandMark({ brand, variant = "pill" }: BrandMarkProps) {
  const sources = brandLogoSources(brand.domain);
  const [sourceIndex, setSourceIndex] = useState(0);
  const src = sources[sourceIndex];

  return (
    <span className={`brand-mark brand-mark--${variant}`}>
      {src ? (
        <img
          src={src}
          alt=""
          className="brand-mark-logo"
          onError={() => setSourceIndex((index) => index + 1)}
        />
      ) : (
        <span className="brand-mark-fallback">{initials(brand.name)}</span>
      )}
      {variant === "diamond" || !src ? <span className="brand-mark-name">{brand.name}</span> : null}
    </span>
  );
}
