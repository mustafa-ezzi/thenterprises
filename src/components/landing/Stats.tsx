import CountUp from "../bits/CountUp/CountUp";
import { landingCopy } from "../../data/company";

export function Stats() {
  return (
    <div className="stats" role="list" aria-label="Company facts">
      <div className="stat appear appear--stat" style={{ ["--d" as string]: "1.12s" }} role="listitem">
        <svg className="stat-icon" viewBox="0 0 24 24" aria-hidden="true">
          <defs>
            <linearGradient id="pill-a" x1="3" y1="2" x2="14" y2="22">
              <stop offset="0" stopColor="#ffffff" stopOpacity="0.38" />
              <stop offset="1" stopColor="#3a3a3a" stopOpacity="0.62" />
            </linearGradient>
            <linearGradient id="pill-b" x1="3" y1="2" x2="14" y2="22">
              <stop offset="0" stopColor="#3a3a3a" stopOpacity="0.38" />
              <stop offset="1" stopColor="#ffffff" stopOpacity="0.62" />
            </linearGradient>
          </defs>
          <rect x="3.4" y="2.6" width="7.2" height="18.8" rx="3.6" fill="url(#pill-a)" />
          <rect x="13.4" y="2.6" width="7.2" height="18.8" rx="3.6" fill="url(#pill-b)" />
          <rect x="9.2" y="10.9" width="5.6" height="2.2" rx="1.1" fill="#4a4a4a" />
        </svg>
        <span>
          <CountUp to={13} suffix="+" /> supply lines under one roof
        </span>
      </div>

      <div className="stat appear appear--stat" style={{ ["--d" as string]: "1.28s" }} role="listitem">
        <svg className="stat-icon" viewBox="0 0 24 24" aria-hidden="true">
          <rect x="2.4" y="2.4" width="19.2" height="19.2" rx="6.2" fill="#ffffff" />
          <path
            d="M12 7.1v7.4M8.15 12.35L12 16.2l3.85-3.85"
            fill="none"
            stroke="#111"
            strokeWidth="1.85"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        {landingCopy.stats[1]}
      </div>

      <div className="stat appear appear--stat" style={{ ["--d" as string]: "1.44s" }} role="listitem">
        <svg className="stat-icon-wide" viewBox="0 0 40 22" aria-hidden="true">
          <circle cx="10.2" cy="11" r="9.2" fill="#2b2b2b" />
          <ellipse cx="10.2" cy="12.1" rx="4.15" ry="3.7" fill="#f4f4f4" />
          <polygon points="6.4,9.2 5.1,6.4 8.1,8.2" fill="#f4f4f4" />
          <polygon points="14,9.2 15.3,6.4 12.3,8.2" fill="#f4f4f4" />
          <circle cx="8.7" cy="12" r="0.7" fill="#1a1a1a" />
          <circle cx="11.7" cy="12" r="0.7" fill="#1a1a1a" />

          <circle cx="20.2" cy="11" r="9.2" fill="#ffffff" />
          <circle cx="17.8" cy="10.2" r="1.7" fill="#1a1a1a" />
          <circle cx="22.6" cy="10.2" r="1.7" fill="#1a1a1a" />
          <ellipse cx="20.2" cy="12.4" rx="1.1" ry="0.7" fill="#111" />
          <path d="M17.6 14.4c1.5 1.3 3.7 1.3 5.2 0" fill="none" stroke="#111" strokeWidth="1.2" strokeLinecap="round" />

          <circle cx="30.2" cy="11" r="9.2" fill="#f26b1d" />
          <text x="30.2" y="15.1" textAnchor="middle" fill="#fff" fontFamily="Inter, sans-serif" fontWeight="700" fontSize="12.5">
            e
          </text>
        </svg>
        {landingCopy.stats[2]}
      </div>
    </div>
  );
}
