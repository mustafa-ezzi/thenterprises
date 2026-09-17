import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { categories } from "../../data/categories";
import { company, landingCopy } from "../../data/company";
import { services } from "../../data/services";
import { usePrefersReducedMotion } from "../../hooks/useLanding";
import { Button } from "../ui/Button";

const CAROUSEL_BASE = "https://pub-6b086f2686134300918c3ecd2486025c.r2.dev/carousal";

const projectImages = [
  {
    src: `${CAROUSEL_BASE}/construction.jfif`,
    alt: "Concrete frame under construction with hard hats on stacked lumber",
    label: "Construction",
    title: "Steel, hardware, and site supply.",
  },
  {
    src: `${CAROUSEL_BASE}/plumbering.jfif`,
    alt: "Plumbing pipes, valves, and fittings for site work",
    label: "Plumbing",
    title: "Pipes, valves, and fittings on demand.",
  },
  {
    src: `${CAROUSEL_BASE}/electrical.jfif`,
    alt: "Open industrial electrical panel with dressed cables and tools",
    label: "Electrical",
    title: "Power, panels, and industrial essentials.",
  },
  {
    src: `${CAROUSEL_BASE}/safety.jfif`,
    alt: "Hard hats, harness, gloves, and hi-vis vests on a navy backdrop",
    label: "Safety equipment",
    title: "PPE that keeps crews protected.",
  },
  {
    src: `${CAROUSEL_BASE}/tools.jfif`,
    alt: "Power drill, hammer, sockets, and a spirit level on a workbench",
    label: "Tools & hardware",
    title: "The kit crews reach for every day.",
  },
  {
    src: `${CAROUSEL_BASE}/industrial.jfif`,
    alt: "Industrial plant floor with pumps, gauges, and a steel walkway",
    label: "Industrial",
    title: "Equipment sourced for real site conditions.",
  },
] as const;

function ProjectCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const reduce = usePrefersReducedMotion();
  const activeImage = projectImages[activeIndex];
  const total = projectImages.length;

  const goTo = (index: number) => {
    setActiveIndex((index + total) % total);
  };

  useEffect(() => {
    if (reduce || paused) {
      return;
    }

    const interval = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % total);
    }, 5200);

    return () => window.clearInterval(interval);
  }, [paused, reduce, total, activeIndex]);

  return (
    <div
      className="project-carousel"
      aria-roledescription="carousel"
      aria-label="On-the-job supply photography"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
          setPaused(false);
        }
      }}
    >
      <div className="project-carousel-stage">
        {projectImages.map((image, index) => (
          <img
            key={image.src}
            src={image.src}
            alt={index === activeIndex ? image.alt : ""}
            className={index === activeIndex ? "is-active" : ""}
            aria-hidden={index !== activeIndex}
          />
        ))}
        <div className="project-carousel-overlay">
          <p className="eyebrow">{activeImage.label}</p>
          <h3>{activeImage.title}</h3>
        </div>
        <span className="project-carousel-count">
          {String(activeIndex + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
        </span>
        <button
          type="button"
          className="carousel-arrow carousel-arrow--prev"
          aria-label="Previous image"
          onClick={() => goTo(activeIndex - 1)}
        >
          &#8592;
        </button>
        <button
          type="button"
          className="carousel-arrow carousel-arrow--next"
          aria-label="Next image"
          onClick={() => goTo(activeIndex + 1)}
        >
          &#8594;
        </button>
      </div>
      <div className="project-carousel-thumbs" role="tablist" aria-label="Choose a job-site photo">
        {projectImages.map((image, index) => (
          <button
            type="button"
            role="tab"
            aria-selected={index === activeIndex}
            aria-label={`Show ${image.label}`}
            className={index === activeIndex ? "is-active" : ""}
            key={image.src}
            onClick={() => goTo(index)}
          >
            <img src={image.src} alt="" />
            <span>{image.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

export function LandingSections() {
  return (
    <div className="landing-rest">
      <section className="landing-band" id="benefits">
        <div className="landing-wrap landing-wrap--wide">
          <p className="eyebrow">On the job</p>
          <h2 className="landing-title">Supply for the work in front of you.</h2>
          <ProjectCarousel />
        </div>
      </section>

      <section className="landing-band landing-band--tint" id="how-it-works">
        <div className="landing-wrap">
          <p className="eyebrow">How it works</p>
          <h2 className="landing-title">From the enquiry to the site.</h2>
          <ol className="step-grid">
            {company.howItWorks.map((item) => (
              <li key={item.step} className="step-card">
                <span className="step-num">{item.step}</span>
                <h3>{item.title}</h3>
                <p>{item.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="landing-band" id="products">
        <div className="landing-wrap landing-wrap--wide">
          <p className="eyebrow">Products</p>
          <h2 className="landing-title">Thirteen lines. One partner.</h2>
          <p className="landing-lede">{company.benefits[1]}.</p>
          <ul className="line-grid">
            {categories.map((category) => (
              <li key={category.slug}>
                <Link to={`/products/${category.slug}`} className="line-card">
                  <span className="line-card-name">{category.name}</span>
                  <span className="line-card-scope">{category.scope}</span>
                </Link>
              </li>
            ))}
          </ul>
          <div className="inner-actions">
            <Button to="/products" variant="solid">
              {landingCopy.ctaCatalog}
            </Button>
          </div>
        </div>
      </section>

      <section className="landing-band landing-band--tint" id="services">
        <div className="landing-wrap">
          <p className="eyebrow">Services</p>
          <h2 className="landing-title">How the goods move.</h2>
          <p className="landing-lede">
            Products are the lines. Services are import, export, local supply, and general sourcing — each on its own page.
          </p>
          <ul className="line-grid">
            {services.map((service) => (
              <li key={service.slug}>
                <Link to={`/services/${service.slug}`} className="line-card">
                  <span className="line-card-name">{service.name}</span>
                  <span className="line-card-scope">{service.lede}</span>
                </Link>
              </li>
            ))}
          </ul>
          <div className="inner-actions">
            <Button to="/services" variant="solid">
              View services
            </Button>
          </div>
        </div>
      </section>

      <section className="landing-band" id="about">
        <div className="landing-wrap">
          <p className="eyebrow">{company.positioning.join(" · ")}</p>
          <h2 className="landing-title">Built for sites that cannot wait on a supplier.</h2>
          <p className="landing-lede">{company.intro}</p>
          <ul className="goal-row">
            {company.goals.map((goal) => (
              <li key={goal}>{goal}</li>
            ))}
          </ul>
          <div className="inner-actions">
            <Button to="/about" variant="ghost">
              Read about us
            </Button>
          </div>
        </div>
      </section>

      <section className="landing-band landing-cta" id="contact">
        <div className="landing-wrap">
          <p className="eyebrow">Karachi</p>
          <h2 className="landing-title">Tell us the line. We will source it.</h2>
          <p className="landing-lede">
            {company.address.full}
            <br />
            {company.phone.display} · {company.email}
          </p>
          <div className="inner-actions">
            <Button to="/contact" variant="solid">
              {landingCopy.ctaQuote}
            </Button>
            <Button to={company.phone.whatsapp} variant="ghost">
              WhatsApp
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
