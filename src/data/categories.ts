export type CategorySlug =
  | "safety"
  | "pneumatic"
  | "tools"
  | "construction"
  | "welding"
  | "steel"
  | "hvac"
  | "electronics"
  | "electrical"
  | "pipes"
  | "janitorial"
  | "lubricants"
  | "medical";

export type Category = {
  slug: CategorySlug;
  name: string;
  scope: string;
  accent: string;
  border: string;
  gradient: string;
};

const plate = (from: string) => `linear-gradient(160deg, ${from} 0%, #ffffff 100%)`;

export const categories: Category[] = [
  {
    slug: "safety",
    name: "Safety products",
    scope: "Fire protection, fall protection, PPEs, protective clothing, road and safety.",
    accent: "var(--brand)",
    border: "#003d70",
    gradient: plate("#dceaf4"),
  },
  {
    slug: "pneumatic",
    name: "Pneumatic materials & essentials",
    scope: "PU pipes, fittings, valves, pressure and temperature gauges, HVAC essentials.",
    accent: "var(--brand)",
    border: "#203163",
    gradient: plate("#e4f0f8"),
  },
  {
    slug: "tools",
    name: "Power & hand tools",
    scope: "All kinds of power tools and hand tools.",
    accent: "var(--brand)",
    border: "#00457d",
    gradient: plate("#dfeaf4"),
  },
  {
    slug: "construction",
    name: "Construction materials",
    scope: "Building and site materials.",
    accent: "var(--brand)",
    border: "#203163",
    gradient: plate("#e8f2fa"),
  },
  {
    slug: "welding",
    name: "Welding & cutting",
    scope: "Welding and cutting machines and equipment.",
    accent: "var(--brand)",
    border: "#003d70",
    gradient: plate("#d9e7f2"),
  },
  {
    slug: "steel",
    name: "Iron & steel",
    scope: "Iron and steel supply.",
    accent: "var(--brand)",
    border: "#2a6fa8",
    gradient: plate("#edf4f9"),
  },
  {
    slug: "hvac",
    name: "Air conditioning & refrigeration",
    scope: "Copper pipes, fittings, compressors, and HVAC components.",
    accent: "var(--brand)",
    border: "#203163",
    gradient: plate("#e2eef6"),
  },
  {
    slug: "electronics",
    name: "Electronic materials & essentials",
    scope: "Electronic goods and essentials.",
    accent: "var(--brand)",
    border: "#4d88b8",
    gradient: plate("#eef5fa"),
  },
  {
    slug: "electrical",
    name: "Electrical goods",
    scope: "Wires, fittings, breakers, switch boards, and plugs.",
    accent: "var(--brand)",
    border: "#203163",
    gradient: plate("#e6f0f8"),
  },
  {
    slug: "pipes",
    name: "Pipes, fittings & valves",
    scope: "GI, MS, and SS pipes, valves, fittings, and joints.",
    accent: "var(--brand)",
    border: "#003d70",
    gradient: plate("#dce8f2"),
  },
  {
    slug: "janitorial",
    name: "Stationery, packing, chemicals, janitorial",
    scope: "Stationery, packing materials, chemicals, and cleaning tools.",
    accent: "var(--brand)",
    border: "#2a6fa8",
    gradient: plate("#eaf4fa"),
  },
  {
    slug: "lubricants",
    name: "Lubricant oil & grease",
    scope: "Oils and greases.",
    accent: "var(--brand)",
    border: "#00457d",
    gradient: plate("#e0ecf5"),
  },
  {
    slug: "medical",
    name: "Medical equipment",
    scope: "Medical equipment.",
    accent: "var(--brand)",
    border: "#4d88b8",
    gradient: plate("#f2f7fb"),
  },
];

export function getCategory(slug: string): Category | undefined {
  return categories.find((c) => c.slug === slug);
}
