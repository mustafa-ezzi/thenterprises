export type ServiceSlug = "import" | "export" | "local-supply" | "general-services";

export type Service = {
  slug: ServiceSlug;
  name: string;
  lede: string;
  body: string;
};

export const services: Service[] = [
  {
    slug: "import",
    name: "Import",
    lede: "Certified imported goods into Karachi, for the site that needs them.",
    body: "T&H Enterprise is an importer and stockist of quality certified imported goods — fire and fall protection, PPEs, pneumatics, tools, HVAC essentials, and more. We bring the line in so national and multinational organisations are not waiting on a broker.",
  },
  {
    slug: "export",
    name: "Export",
    lede: "Export alongside local supply, from one roof.",
    body: "We operate as an exporter as well as a local supplier. Ask us the destination, the line, and the documents you need. We source first from stock, then import or pack for outbound supply.",
  },
  {
    slug: "local-supply",
    name: "Local supply",
    lede: "Karachi dispatch with national reach.",
    body: "Local supply is the daily work: stock on the floor, quick delivery to the site, and low minimum order quantity. If it is not in stock, we source it quickly so the job does not wait.",
  },
  {
    slug: "general-services",
    name: "General services",
    lede: "Stockist, dealer, and source — not a single-line trader.",
    body: "As a general services provider we deal, stock, and source across thirteen lines under one roof. Variety, quick sourcing of items not in stock, and a long-term relationship with the site are the point of the service, not a catalog login.",
  },
];

export function getService(slug: string): Service | undefined {
  return services.find((service) => service.slug === slug);
}
