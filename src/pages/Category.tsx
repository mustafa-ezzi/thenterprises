import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import GlareHover from "../components/bits/GlareHover/GlareHover";
import ScrollStack, { ScrollStackItem } from "../components/bits/ScrollStack/ScrollStack";
import { InnerPage } from "../components/shell/InnerPage";
import { Button } from "../components/ui/Button";
import { getCategory } from "../data/categories";
import { meta } from "../data/meta";
import { usePageTitle } from "../hooks/usePageTitle";
import { usePrefersReducedMotion } from "../hooks/useLanding";
import { categoryCover, categoryGallery, media } from "../media";
import { NotFound } from "./NotFound";

export function Category() {
  const { slug } = useParams();
  const category = slug ? getCategory(slug) : undefined;
  const [failed, setFailed] = useState<Record<string, boolean>>({});
  const reduce = usePrefersReducedMotion();

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
        reduce ? (
          <div className="category-gallery">
            {stills.map((src) => (
              <img
                key={src}
                src={src}
                alt={`${category.name} still`}
                width={1200}
                height={750}
                className="gallery-image gallery-plate"
              />
            ))}
          </div>
        ) : (
          <ScrollStack className="category-stack">
            {stills.map((src) => (
              <ScrollStackItem key={src}>
                <GlareHover className="gallery-plate" glareColor="#ffffff" glareOpacity={0.22} borderRadius="18px">
                  <img
                    src={src}
                    alt={`${category.name} still`}
                    width={1200}
                    height={750}
                    className="gallery-image"
                    onError={() => setFailed((prev) => ({ ...prev, [src]: true }))}
                  />
                </GlareHover>
              </ScrollStackItem>
            ))}
          </ScrollStack>
        )
      ) : (
        <div className="category-empty">
          {reduce ? (
            <img
              src={cover}
              alt={category.name}
              className="gallery-image gallery-plate gallery-plate--hero"
              width={1200}
              height={750}
              onError={(event) => {
                event.currentTarget.src = media.fallbackCover;
              }}
            />
          ) : (
            <GlareHover className="gallery-plate gallery-plate--hero" glareColor="#ffffff" glareOpacity={0.22} borderRadius="18px">
              <img
                src={cover}
                alt={category.name}
                className="gallery-image"
                width={1200}
                height={750}
                onError={(event) => {
                  event.currentTarget.src = media.fallbackCover;
                }}
              />
            </GlareHover>
          )}
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
