import { Link } from "react-router-dom";
import { LegalPage } from "../components/shell/LegalPage";
import { company } from "../data/company";
import { meta } from "../data/meta";

export function Privacy() {
  return (
    <LegalPage title="Privacy Policy" updated="7 September 2026" description={meta.privacy.description}>
      <p>
        {company.brand} ({company.legalName}) collects only the information you send when you request a quote or otherwise
        contact us — typically your name, organisation, phone, email, and the details of the supply enquiry.
      </p>
      <p>
        We use that information to respond to your request, source goods, and keep a record of the conversation. We do not
        sell personal data. We do not run advertising trackers on this site.
      </p>
      <p>
        Enquiries may be handled over email, phone, or WhatsApp. Those services have their own privacy terms.
      </p>
      <p>
        To ask what we hold, or to request a correction, write to{" "}
        <a href={`mailto:${company.email}`}>{company.email}</a> or call{" "}
        <a href={`tel:${company.phone.tel}`}>{company.phone.display}</a>.
      </p>
      <p>
        See also our <Link to="/terms">Terms of Use</Link> and <Link to="/cookies">Cookie Policy</Link>.
      </p>
    </LegalPage>
  );
}
