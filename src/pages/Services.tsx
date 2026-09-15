import { Link } from "react-router-dom";
import { InnerPage } from "../components/shell/InnerPage";
import { Button } from "../components/ui/Button";
import { services } from "../data/services";
import { meta } from "../data/meta";
import { usePageTitle } from "../hooks/usePageTitle";

export function Services() {
  usePageTitle(meta.services.title, meta.services.description);

  return (
    <InnerPage>
      <p className="eyebrow">Services</p>
      <h1>Import, export, local supply, and sourcing.</h1>
      <p className="inner-lede">
        Products are the lines. Services are how they move — in, out, on the floor, and onto the site.
      </p>

      <ul className="category-list">
        {services.map((service) => (
          <li key={service.slug}>
            <Link to={`/services/${service.slug}`} className="category-row neumo">
              <span className="category-row-name">{service.name}</span>
              <span className="category-row-scope">{service.lede}</span>
            </Link>
          </li>
        ))}
      </ul>

      <div className="inner-actions">
        <Button to="/contact" variant="solid">
          Request a Quote
        </Button>
        <Button to="/products" variant="ghost">
          View products
        </Button>
      </div>
    </InnerPage>
  );
}
