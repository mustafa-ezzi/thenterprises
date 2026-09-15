import { Link } from "react-router-dom";
import { LegalPage } from "../components/shell/LegalPage";
import { company } from "../data/company";
import { meta } from "../data/meta";

export function Cookies() {
  return (
    <LegalPage title="Cookie Policy" updated="7 September 2026" description={meta.cookies.description}>
      <p>
        This site uses only cookies or storage that the browser needs to load pages (for example session data used by the
        host). We do not set marketing cookies and we do not run third-party analytics pixels.
      </p>
      <p>
        If we add optional analytics later, this page will say so and you will be able to refuse them.
      </p>
      <p>
        Questions: <a href={`mailto:${company.email}`}>{company.email}</a>. See the{" "}
        <Link to="/privacy">Privacy Policy</Link> for how enquiry data is handled.
      </p>
    </LegalPage>
  );
}
