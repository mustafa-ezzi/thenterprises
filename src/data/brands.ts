export type SupplyBrand = {
  name: string;
  domain?: string;
};

export const supplyBrands: SupplyBrand[] = [
  { name: "Lessmann", domain: "lessmann.com" },
  { name: "Rhodius", domain: "rhodius-abrasives.com" },
  { name: "Pressol", domain: "pressol.com" },
  { name: "FuelWorks", domain: "fuelworks.com" },
  { name: "AEG Powertools", domain: "aeg-powertools.com" },
  { name: "Anchor", domain: "anchor.com.pk" },
  { name: "Dong Cheng", domain: "dongcheng.com" },
  { name: "Toptul", domain: "toptul.com" },
  { name: "Tolsen", domain: "tolsen.com" },
  { name: "Licota", domain: "licota.com" },
  { name: "Force", domain: "force.com.tw" },
  { name: "Insize", domain: "insize.com" },
  { name: "Mitutoyo", domain: "mitutoyo.com" },
  { name: "Dormer", domain: "dormerpramet.com" },
  { name: "MSA", domain: "msasafety.com" },
  { name: "3M", domain: "3m.com" },
  { name: "JSP", domain: "jsp.co.uk" },
  { name: "Protecta", domain: "3m.com" },
  { name: "Safety Jogger", domain: "safetyjogger.com" },
  { name: "Rangers", domain: "rangers.com" },
  { name: "Haier", domain: "haier.com" },
  { name: "Panasonic", domain: "panasonic.com" },
  { name: "Philips", domain: "philips.com" },
  { name: "WD-40", domain: "wd40.com" },
  { name: "Eclipse", domain: "eclipsemagnetics.com" },
  { name: "Puma", domain: "puma-safety.com" },
  { name: "Wika", domain: "wika.com" },
  { name: "Empeo", domain: "empeo.com" },
  { name: "Tempress", domain: "tempress.com" },
  { name: "True Teller" },
  { name: "Nurafimm" },
  { name: "Honeywell", domain: "honeywell.com" },
  { name: "Danfoss", domain: "danfoss.com" },
  { name: "Alco Controls", domain: "emerson.com" },
  { name: "Ingco", domain: "ingco.com" },
  { name: "Wadfow", domain: "wadfow.com" },
  { name: "Grob's", domain: "grobs.com" },
  { name: "Berger", domain: "bergerpaints.com" },
  { name: "Dulux", domain: "dulux.com" },
  { name: "Adamjee", domain: "adamjee.com" },
];

export function brandLogoSources(domain?: string) {
  if (!domain) return [];
  return [
    `https://logo.clearbit.com/${domain}`,
    `https://www.google.com/s2/favicons?domain=${domain}&sz=128`,
  ];
}
