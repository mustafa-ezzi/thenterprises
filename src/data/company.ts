export const company = {

  brand: "T&H Enterprise",

  legalName: "T&H Enterprise",

  title: "T&H Enterprise — General Supply · Import · Export",

  description:

    "Karachi general supplier — importer, exporter, local supply, and services. Safety, tools, pneumatics, steel, HVAC, electrical, and more under one roof.",

  positioning: [

    "Importer",

    "Exporter",

    "Local Supply",

    "General Services Provider",

  ] as const,

  intro:

    "We are proud to introduce T&H Enterprise. We are stockists, dealers, and sources of quality certified imported goods — fire and fall protection, safety and PPEs, protective clothing, road and safety products, pneumatic materials, PU pipes, fittings, valves, gauges, HVAC essentials, hardware and power tools, and more. We supply national and multinational organisations. T&H Enterprise is committed to customer requirements and to continuous improvement in quality services.",

  goals: [

    "Supply products that offer value in price and quality",

    "Establish long-term relationships with customers",

  ] as const,

  benefits: [

    "Low minimum order quantity",

    "Variety of products under one roof",

    "Quick sourcing of products not in stock",

    "Quick delivery",

  ] as const,

  howItWorks: [

    {

      step: "01",

      title: "Tell us about the site",

      body: "Share the line, quantity, and timeline. A phone call, WhatsApp, or email is enough to start.",

    },

    {

      step: "02",

      title: "We source the goods",

      body: "Stock first. If it is not on the floor, we import or source it quickly so the job does not wait.",

    },

    {

      step: "03",

      title: "We deliver",

      body: "Karachi dispatch with national reach — packed, documented, and sent to the site that needs it.",

    },

  ] as const,

  address: {

    line1: "Wo 2/39, Tailoring Shop",

    line2: "Wadhumal Udharam Road",

    city: "Karachi, Pakistan",

    full: "Wo 2/39, Tailoring Shop, Wadhumal Udharam Road, Karachi, Pakistan",

  },

  phone: {

    raw: "03371294786",

    display: "0337 1294786",

    tel: "+923371294786",

    whatsapp: "https://wa.me/923371294786",

  },

  email: "t.henterprise1920@gmail.com",

  credit: {

    label: "Designed and managed by",

    name: "TrisiteSolutions",

    href: "https://trisitesolutions.com/",

  },

} as const;



export const landingCopy = {
  badge: "Importer · Exporter · Local Supply · Services",
  h1Line1Before: "Supply ",
  h1Emphasis: "everything",
  h1Line1After: " your site needs",
  h1Line2: "from one roof in Karachi.",
  lede: "Stockist, dealer, and source of certified imported goods — safety, tools, pneumatics, steel, HVAC, electrical, and more — for national and multinational organisations.",
  ctaQuote: "Request a Quote",
  ctaCatalog: "View products",
  stats: [
    "13+ supply lines under one roof",
    "Low MOQ · fast sourcing · quick delivery",
    "National & multinational teams supplied",
  ] as const,
} as const;

export type NavChild = { label: string; to: string };

export type NavItem = {
  label: string;
  to: string;
  appear: string;
  delay: string;
  children?: readonly NavChild[];
};

export const navItems: readonly NavItem[] = [
  {
    label: "About",
    to: "/about",
    appear: "appear--scale",
    delay: "0.16s",
    children: [
      { label: "Company", to: "/about" },
      { label: "Goals", to: "/about#goals" },
      { label: "How you benefit", to: "/about#benefits" },
    ],
  },
  {
    label: "Products",
    to: "/products",
    appear: "appear--soft",
    delay: "0.28s",
    children: [
      { label: "All products", to: "/products" },
      { label: "Safety products", to: "/products/safety" },
      { label: "Pneumatic materials", to: "/products/pneumatic" },
      { label: "Power & hand tools", to: "/products/tools" },
      { label: "Construction materials", to: "/products/construction" },
      { label: "Welding & cutting", to: "/products/welding" },
      { label: "Iron & steel", to: "/products/steel" },
      { label: "Air conditioning & refrigeration", to: "/products/hvac" },
      { label: "Electronic materials", to: "/products/electronics" },
      { label: "Electrical goods", to: "/products/electrical" },
      { label: "Pipes, fittings & valves", to: "/products/pipes" },
      { label: "Janitorial & packing", to: "/products/janitorial" },
      { label: "Lubricant oil & grease", to: "/products/lubricants" },
      { label: "Medical equipment", to: "/products/medical" },
      { label: "Brands", to: "/brands" },
    ],
  },
  {
    label: "Services",
    to: "/services",
    appear: "appear--scale",
    delay: "0.40s",
    children: [
      { label: "All services", to: "/services" },
      { label: "Import", to: "/services/import" },
      { label: "Export", to: "/services/export" },
      { label: "Local supply", to: "/services/local-supply" },
      { label: "General services", to: "/services/general-services" },
    ],
  },
  { label: "Contact", to: "/contact", appear: "appear--soft", delay: "0.52s" },
];

export const landingNav = navItems;



export const policyLinks = [

  { label: "Privacy Policy", to: "/privacy" },

  { label: "Terms of Use", to: "/terms" },

  { label: "Cookie Policy", to: "/cookies" },

] as const;


