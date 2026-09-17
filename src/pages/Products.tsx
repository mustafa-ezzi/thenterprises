import { Link } from "react-router-dom";
import { InnerPage } from "../components/shell/InnerPage";
import { Button } from "../components/ui/Button";
import { categories } from "../data/categories";
import { usePageTitle } from "../hooks/usePageTitle";
import { meta } from "../data/meta";
import { categoryCover, media } from "../media";

export function Products() {
  usePageTitle(meta.products.title, meta.products.description);

  return (
    <InnerPage className="inner--wide inner--catalog">
      <p className="eyebrow">Products</p>
      <h1>Thirteen lines. One partner.</h1>
      <p className="inner-lede">
        The goods we stock, deal, and source. Services — import, export, local supply — live on their own pages.
      </p>
      <ul className="catalog-grid">
        {categories.map((category) => (
          <li key={category.slug}>
            <Link to={`/products/${category.slug}`} className="catalog-card">
              <span className="catalog-card-media">
                <img
                  src={categoryCover(category.slug)}
                  alt=""
                  width={800}
                  height={600}
                  onError={(event) => {
                    event.currentTarget.src = media.fallbackCover;
                  }}
                />
              </span>
              <span className="catalog-card-body">
                <span className="catalog-card-name">{category.name}</span>
                <span className="catalog-card-scope">{category.scope}</span>
                <span className="catalog-card-cta">View line</span>
              </span>
            </Link>
          </li>
        ))}
      </ul>
      <div className="inner-actions">
        <Button to="/contact" variant="solid">
          Request a Quote
        </Button>
        <Button to="/services" variant="ghost">
          View services
        </Button>
      </div>
    </InnerPage>
  );
}
