import { useState } from "react";
import LogoLoop from "../components/bits/LogoLoop/LogoLoop";
import { InnerPage } from "../components/shell/InnerPage";
import { Button } from "../components/ui/Button";
import { categories } from "../data/categories";
import { company } from "../data/company";
import { meta } from "../data/meta";
import { usePageTitle } from "../hooks/usePageTitle";
import { usePrefersReducedMotion } from "../hooks/useLanding";
import { brandLogo, hasRemoteMedia } from "../media";

export function Brands() {
  usePageTitle(meta.brands.title, meta.brands.description);
  const reduce = usePrefersReducedMotion();
  const [failed, setFailed] = useState<Record<string, boolean>>({});

  const marks = categories.map((category) => {
    const src = hasRemoteMedia ? brandLogo(category.slug) : "";
    if (src && !failed[src]) {
      return { alt: category.name, src };
    }
    return { alt: category.name };
  });

  return (
    <InnerPage className="inner--wide">
      <p className="eyebrow">
        Products
        <span aria-hidden="true"> / </span>
        Brands
      </p>
      <h1>Brands under one roof.</h1>
      <p className="inner-lede">
        Certified imported goods across safety, tools, pneumatics, steel, HVAC, electrical, and more — sourced for national and
        multinational organisations.
      </p>

      {!reduce ? <LogoLoop logos={marks} speed={32} logoHeight={22} gap={56} /> : null}

      <ul className="brand-grid">
        {categories.map((category) => {
          const src = hasRemoteMedia ? brandLogo(category.slug) : "";
          const showImage = Boolean(src && !failed[src]);
          return (
            <li key={category.slug} className="brand-tile neumo">
              {showImage ? (
                <img
                  src={src}
                  alt=""
                  width={96}
                  height={48}
                  className="brand-tile-mark"
                  onError={() => setFailed((prev) => ({ ...prev, [src]: true }))}
                />
              ) : null}
              <span className="brand-tile-name">{category.name}</span>
              <span className="brand-tile-scope">{category.scope}</span>
            </li>
          );
        })}
      </ul>

      <p className="inner-note">
        Named manufacturer marks appear in the loop once they are in the TNH-media library. Until then these are the lines{" "}
        {company.legalName} sources — ask us which brands we can get for your site.
      </p>

      <div className="inner-actions">
        <Button to="/contact" variant="solid">
          Request a Quote
        </Button>
        <Button to="/products" variant="ghost">
          All products
        </Button>
      </div>
    </InnerPage>
  );
}
