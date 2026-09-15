import { Link } from "react-router-dom";
import ChromaGrid from "../components/bits/ChromaGrid/ChromaGrid";
import { InnerPage } from "../components/shell/InnerPage";
import { Button } from "../components/ui/Button";
import { categories } from "../data/categories";
import { usePageTitle } from "../hooks/usePageTitle";
import { meta } from "../data/meta";
import { usePrefersReducedMotion } from "../hooks/useLanding";
import { categoryCover } from "../media";

export function Products() {
  usePageTitle(meta.products.title, meta.products.description);
  const reduce = usePrefersReducedMotion();

  const items = categories.map((category) => ({
    image: categoryCover(category.slug),
    title: category.name,
    subtitle: category.scope,
    borderColor: category.border,
    gradient: category.gradient,
    url: `/products/${category.slug}`,
  }));

  return (
    <InnerPage className="inner--wide">
      <p className="eyebrow">Products</p>
      <h1>Thirteen lines. One partner.</h1>
      <p className="inner-lede">
        The goods we stock, deal, and source. Services — import, export, local supply — live on their own pages.
      </p>
      {reduce ? (
        <ul className="category-list">
          {categories.map((category) => (
            <li key={category.slug}>
              <Link to={`/products/${category.slug}`} className="category-row neumo">
                <span className="category-row-name">{category.name}</span>
                <span className="category-row-scope">{category.scope}</span>
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <ChromaGrid items={items} className="catalog-chroma" />
      )}
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
