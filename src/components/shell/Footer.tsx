import { Link } from "react-router-dom";
import { company, policyLinks } from "../../data/company";
import { services } from "../../data/services";
import { Logo } from "../ui/Logo";

export function Footer() {
  return (
    <footer className="site-footer" aria-label="Site">
      <div className="site-footer-grid">
        <div className="site-footer-brand">
          <Logo to="/" animated={false} className="logo--footer" />
          <p className="site-footer-legal">{company.legalName}</p>
          <p className="site-footer-address">{company.address.full}</p>
          <nav className="site-footer-links" aria-label="Direct contact">
            <a href={`tel:${company.phone.tel}`}>{company.phone.display}</a>
            <a href={`mailto:${company.email}`}>{company.email}</a>
            <a href={company.phone.whatsapp} target="_blank" rel="noreferrer">
              WhatsApp
            </a>
          </nav>
        </div>

        <div className="site-footer-col">
          <p className="site-footer-heading">Products</p>
          <nav className="site-footer-links" aria-label="Products">
            <Link to="/products">All products</Link>
            <Link to="/brands">Brands</Link>
          </nav>
        </div>

        <div className="site-footer-col">
          <p className="site-footer-heading">Services</p>
          <nav className="site-footer-links" aria-label="Services">
            <Link to="/services">All services</Link>
            {services.map((service) => (
              <Link key={service.slug} to={`/services/${service.slug}`}>
                {service.name}
              </Link>
            ))}
          </nav>
        </div>

        <div className="site-footer-col">
          <p className="site-footer-heading">Company</p>
          <nav className="site-footer-links" aria-label="Company">
            <Link to="/about">About</Link>
            <Link to="/contact">Contact</Link>
            {policyLinks.map((item) => (
              <Link key={item.to} to={item.to}>
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>

      <div className="site-footer-bar">
        <p>
          © {new Date().getFullYear()} {company.brand}. All rights reserved.
        </p>
        <p>
          {company.credit.label}{" "}
          <a className="credit-link" href={company.credit.href} target="_blank" rel="noreferrer">
            {company.credit.name}
          </a>
        </p>
      </div>
    </footer>
  );
}
