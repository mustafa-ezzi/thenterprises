import { BrandStrip } from "../components/landing/BrandStrip";
import ClickSpark from "../components/bits/ClickSpark/ClickSpark";
import { Header } from "../components/landing/Header";
import { Hero } from "../components/landing/Hero";
import { HeroMedia } from "../components/landing/HeroMedia";
import { LandingSections } from "../components/landing/LandingSections";
import { Stats } from "../components/landing/Stats";
import { Footer } from "../components/shell/Footer";
import { SkipLink } from "../components/shell/SkipLink";
import { company } from "../data/company";
import { meta } from "../data/meta";
import { MenuProvider, useAppear, useMenu, usePrefersReducedMotion } from "../hooks/useLanding";
import { useDocumentMeta } from "../hooks/usePageTitle";

function HomeChrome() {
  const { close } = useMenu();

  return (
    <div className="landing">
      <div className="menu-backdrop" onClick={close} aria-hidden="true" />
      <Header variant="locked" />
      <main id="main">
        <section className="landing-frame">
          <HeroMedia />
          <Hero />
          <Stats />
          <BrandStrip />
        </section>
        <LandingSections />
      </main>
      <Footer />
    </div>
  );
}

export function Home() {
  useAppear();
  useDocumentMeta({
    title: meta.home.title,
    description: meta.home.description,
    path: "/",
  });
  const reduce = usePrefersReducedMotion();

  return (
    <ClickSpark sparkColor="#ffffff" disabled={reduce}>
      <MenuProvider>
        <SkipLink />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd()) }} />
        <HomeChrome />
      </MenuProvider>
    </ClickSpark>
  );
}

function jsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: company.brand,
    legalName: company.legalName,
    description: company.description,
    email: company.email,
    telephone: company.phone.tel,
    url: typeof window === "undefined" ? undefined : window.location.origin,
    address: {
      "@type": "PostalAddress",
      streetAddress: `${company.address.line1}, ${company.address.line2}`,
      addressLocality: "Karachi",
      addressCountry: "PK",
    },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: company.phone.tel,
      contactType: "sales",
      areaServed: "PK",
      availableLanguage: "en",
    },
  };
}
