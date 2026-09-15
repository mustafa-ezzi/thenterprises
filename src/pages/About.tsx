import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import SpotlightCard from "../components/bits/SpotlightCard/SpotlightCard";
import { InnerPage } from "../components/shell/InnerPage";
import { Button } from "../components/ui/Button";
import { company } from "../data/company";
import { meta } from "../data/meta";
import { usePageTitle } from "../hooks/usePageTitle";

export function About() {
  usePageTitle(meta.about.title, meta.about.description);
  const location = useLocation();

  useEffect(() => {
    const raw = location.hash.replace("#", "");
    const id = raw === "capabilities" ? "goals" : raw;
    if (!id) return;
    requestAnimationFrame(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }, [location]);

  return (
    <InnerPage>
      <p className="eyebrow">About</p>
      <h1>Built for sites that cannot wait on a supplier.</h1>
      <p className="inner-lede">{company.intro}</p>

      <section className="capability-block" id="goals">
        <h2>Goals</h2>
        <div className="spotlight-grid spotlight-grid--two">
          {company.goals.map((goal) => (
            <SpotlightCard key={goal} className="neumo">
              <p className="spotlight-copy">{goal}</p>
            </SpotlightCard>
          ))}
        </div>
      </section>

      <section className="capability-block" id="benefits">
        <h2>How you benefit</h2>
        <div className="spotlight-grid">
          {company.benefits.map((benefit) => (
            <SpotlightCard key={benefit} className="neumo">
              <p className="spotlight-copy">{benefit}</p>
            </SpotlightCard>
          ))}
        </div>
      </section>

      <div className="inner-actions">
        <Button to="/contact" variant="solid">
          Request a Quote
        </Button>
        <Button to="/products" variant="ghost">
          View products
        </Button>
        <Button to="/services" variant="ghost">
          View services
        </Button>
      </div>
    </InnerPage>
  );
}
