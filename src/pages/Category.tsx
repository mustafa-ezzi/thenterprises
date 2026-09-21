import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { InnerPage } from "../components/shell/InnerPage";
import { Button } from "../components/ui/Button";
import { getCategory } from "../data/categories";
import { meta } from "../data/meta";
import { usePageTitle } from "../hooks/usePageTitle";
import { categoryCover, categoryGallery, media } from "../media";
import { NotFound } from "./NotFound";

export function Category() {
  const { slug } = useParams();
  const category = slug ? getCategory(slug) : undefined;
  const [failed, setFailed] = useState<Record<string, boolean>>({});

  usePageTitle(
    category?.name ?? "Page not found",
    category ? `${category.name}. ${category.scope}` : meta.notFound.description,
    { noIndex: !category },
  );

  if (!category) {
    return <NotFound />;
  }

  const cover = categoryCover(category.slug);
  const stills = categoryGallery(category.slug).filter((src) => !failed[src]);
  const showStills = stills.length > 0;

  return (
    <InnerPage className="inner--wide">
      <p className="eyebrow">
        <Link to="/products">Products</Link>
        <span aria-hidden="true"> / </span>
        {category.name}
      </p>
      <h1>{category.name}</h1>
      <p className="inner-lede">{category.scope}</p>

      {showStills ? (
        <div className="category-gallery">
          {stills.map((src) => (
            <img
              key={src}
              src={src}
              alt={`${category.name} product`}
              width={800}
              height={600}
              className="gallery-image"
              onError={() => setFailed((prev) => ({ ...prev, [src]: true }))}
            />
          ))}
        </div>
      ) : (
        <div className="category-empty">
          <img
            src={cover}
            alt={category.name}
            className="gallery-image gallery-plate--hero"
            width={1200}
            height={750}
            onError={(event) => {
              event.currentTarget.src = media.fallbackCover;
            }}
          />
          <p className="inner-note">Ask us to source this line. Low MOQ, quick delivery, and items not in stock sourced on request.</p>
        </div>
      )}

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
