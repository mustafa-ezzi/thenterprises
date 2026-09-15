import { Link } from "react-router-dom";
import { LegalPage } from "../components/shell/LegalPage";
import { company } from "../data/company";
import { meta } from "../data/meta";

export function Terms() {
  return (
    <LegalPage title="Terms of Use" updated="7 September 2026" description={meta.terms.description}>
      <p>
        This website is a product and service showcase for {company.brand}. It is not a shop. Listings describe supply
        lines; they are not an offer, a price list, or a guarantee of stock.
      </p>
      <p>
        Quotes, lead times, and availability are confirmed only after we review your enquiry. Nothing on this site forms a
        contract until both parties agree in writing or by a confirmed order.
      </p>
      <p>
        You may not scrape, copy, or republish our catalogue copy or media for a competing supply site without permission.
      </p>
      <p>
        Pakistani law governs these terms. Our office is at {company.address.full}. Contact{" "}
        <a href={`mailto:${company.email}`}>{company.email}</a>.
      </p>
      <p>
        Related: <Link to="/privacy">Privacy Policy</Link> · <Link to="/cookies">Cookie Policy</Link>.
      </p>
    </LegalPage>
  );
}
