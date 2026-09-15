import { EnquiryForm } from "../components/contact/EnquiryForm";
import { InnerPage } from "../components/shell/InnerPage";
import { company } from "../data/company";
import { meta } from "../data/meta";
import { usePageTitle } from "../hooks/usePageTitle";

export function Contact() {
  usePageTitle(meta.contact.title, meta.contact.description);

  return (
    <InnerPage>
      <p className="eyebrow">Karachi</p>
      <h1>Request a quote.</h1>
      <p className="inner-lede">Tell us the product line or the service, the site, and the timeline. We will source it.</p>

      <div className="contact-panel neumo">
        <div className="contact-channels">
          <a className="contact-channel" href={`tel:${company.phone.tel}`}>
            <span className="contact-label">Call</span>
            {company.phone.display}
          </a>
          <a className="contact-channel" href={company.phone.whatsapp} target="_blank" rel="noreferrer">
            <span className="contact-label">WhatsApp</span>
            Message {company.brand}
          </a>
          <a className="contact-channel" href={`mailto:${company.email}`}>
            <span className="contact-label">Email</span>
            {company.email}
          </a>
        </div>

        <p>
          <span className="contact-label">Address</span>
          {company.address.line1}
          <br />
          {company.address.line2}
          <br />
          {company.address.city}
        </p>

        <EnquiryForm />
      </div>
    </InnerPage>
  );
}
