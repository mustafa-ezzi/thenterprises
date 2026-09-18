import { useState } from "react";
import { Link } from "react-router-dom";
import { company } from "../../data/company";
import { logoCandidates } from "../../media";
import { LogoMark } from "./LogoMark";

type LogoProps = {
  to?: string;
  animated?: boolean;
  className?: string;
};

export function Logo({ to = "#top", animated = true, className = "" }: LogoProps) {
  const [srcIndex, setSrcIndex] = useState(0);
  const src = logoCandidates[srcIndex];
  const classes = `logo${animated ? " appear appear--scale" : ""} ${className}`.trim();
  const body = (
    <>
      {src ? (
        <img src={src} alt="" width={72} height={72} className="logo-img" onError={() => setSrcIndex((index) => index + 1)} />
      ) : (
        <LogoMark />
      )}
      <span>
        T&H <span className="logo-suffix">Enterprise</span>
      </span>
    </>
  );

  if (to.startsWith("#")) {
    return (
      <a href={to} className={classes} aria-label={company.brand} style={{ ["--d" as string]: "0.08s" }}>
        {body}
      </a>
    );
  }

  return (
    <Link to={to} className={classes} aria-label={company.brand}>
      {body}
    </Link>
  );
}

export { LogoMark } from "./LogoMark";
