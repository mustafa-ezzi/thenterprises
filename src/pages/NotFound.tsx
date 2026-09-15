import { InnerPage } from "../components/shell/InnerPage";
import { Button } from "../components/ui/Button";
import { company } from "../data/company";
import { meta } from "../data/meta";
import { usePageTitle } from "../hooks/usePageTitle";

export function NotFound() {
  usePageTitle(meta.notFound.title, meta.notFound.description, { noIndex: true });

  return (
    <InnerPage className="inner--center">
      <p className="eyebrow">404</p>
      <h1>This page is not on the floor.</h1>
      <p className="inner-lede">
        The link may be old. {company.brand} is still here — products, services, or a quote.
      </p>
      <div className="inner-actions">
        <Button to="/" variant="solid">
          Home
        </Button>
        <Button to="/products" variant="ghost">
          View products
        </Button>
      </div>
    </InnerPage>
  );
}
