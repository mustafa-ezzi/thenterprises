import { Link, useParams } from "react-router-dom";
import { InnerPage } from "../components/shell/InnerPage";
import { Button } from "../components/ui/Button";
import { meta } from "../data/meta";
import { getService } from "../data/services";
import { usePageTitle } from "../hooks/usePageTitle";
import { NotFound } from "./NotFound";

export function Service() {
  const { slug } = useParams();
  const service = slug ? getService(slug) : undefined;

  usePageTitle(
    service?.name ?? meta.notFound.title,
    service?.lede ?? meta.notFound.description,
    { noIndex: !service },
  );

  if (!service) {
    return <NotFound />;
  }

  return (
    <InnerPage>
      <p className="eyebrow">
        <Link to="/services">Services</Link>
        <span aria-hidden="true"> / </span>
        {service.name}
      </p>
      <h1>{service.name}</h1>
      <p className="inner-lede">{service.lede}</p>
      <p className="inner-note">{service.body}</p>
      <div className="inner-actions">
        <Button to="/contact" variant="solid">
          Request a Quote
        </Button>
        <Button to="/services" variant="ghost">
          All services
        </Button>
        <Button to="/products" variant="ghost">
          View products
        </Button>
      </div>
    </InnerPage>
  );
}
