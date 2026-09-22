import { BrandMark } from "../components/brands/BrandMark";
import { InnerPage } from "../components/shell/InnerPage";
import { Button } from "../components/ui/Button";
import { supplyBrands } from "../data/brands";
import { company } from "../data/company";
import { meta } from "../data/meta";
import { usePageTitle } from "../hooks/usePageTitle";

function latticeRows<T>(items: T[]) {
  const rows: T[][] = [];
  let index = 0;
  let wide = true;
  while (index < items.length) {
    const size = wide ? 5 : 4;
    rows.push(items.slice(index, index + size));
    index += size;
    wide = !wide;
  }
  return rows;
}

export function Brands() {
  usePageTitle(meta.brands.title, meta.brands.description);
  const rows = latticeRows([...supplyBrands]);

  return (
    <InnerPage className="inner--wide inner--brands">
      <p className="eyebrow">Collaboration</p>
      <h1>Brands under one roof.</h1>
      <p className="inner-lede">
        Manufacturer marks {company.legalName} stocks, deals, and sources for sites in Karachi and beyond.
      </p>

      <section className="brand-poster" aria-label="Brand wall">
        <div className="brand-poster-head">
          <p>Brand under one roof</p>
        </div>
        <div className="brand-diamonds">
          {rows.map((row) => (
            <ul className="brand-diamond-row" key={row.map((brand) => brand.name).join("-")}>
              {row.map((brand) => (
                <li key={brand.name}>
                  <span className="brand-diamond">
                    <BrandMark brand={brand} variant="diamond" />
                  </span>
                </li>
              ))}
            </ul>
          ))}
        </div>
      </section>

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
