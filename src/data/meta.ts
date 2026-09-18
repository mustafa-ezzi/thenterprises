import { company } from "./company";

export const meta = {
  home: {
    title: company.title,
    description: company.description,
  },
  products: {
    title: "Products",
    description:
      "Thirteen supply lines under one roof in Karachi — safety, tools, pneumatics, steel, HVAC, electrical, pipes, and more.",
  },
  services: {
    title: "Services",
    description:
      "Import, export, local supply, and general sourcing from T&H Enterprise in Karachi. Products are the lines; services are how they move.",
  },
  brands: {
    title: "Brands",
    description:
      "Certified imported goods across T&H supply lines. Ask which manufacturer marks we can source for your site.",
  },
  about: {
    title: "About",
    description:
      "T&H Enterprise is a Karachi stockist, dealer, and source of certified imported goods for national and multinational organisations.",
  },
  contact: {
    title: "Contact",
    description: `Request a quote from T&H Enterprise. Call ${company.phone.display}, WhatsApp, or email ${company.email}.`,
  },
  privacy: {
    title: "Privacy Policy",
    description: "How T&H Enterprise handles enquiry data. No advertising trackers on this site.",
  },
  terms: {
    title: "Terms of Use",
    description: "This site is a product and service showcase, not a shop. Quotes are confirmed after enquiry.",
  },
  cookies: {
    title: "Cookie Policy",
    description: "T&H Enterprise does not set marketing cookies or third-party analytics pixels.",
  },
  notFound: {
    title: "Page not found",
    description: "This page is not on the T&H Enterprise site. Return home or browse products.",
  },
} as const;
