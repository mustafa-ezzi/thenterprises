import type { ButtonHTMLAttributes, CSSProperties, ReactNode } from "react";
import { Link } from "react-router-dom";

type ButtonProps = {
  to?: string;
  children: ReactNode;
  variant?: "solid" | "ghost";
  className?: string;
  style?: CSSProperties;
  type?: ButtonHTMLAttributes<HTMLButtonElement>["type"];
  disabled?: boolean;
};

export function Button({
  to,
  children,
  variant = "solid",
  className = "",
  style,
  type = "button",
  disabled = false,
}: ButtonProps) {
  const classes = `btn ${variant === "solid" ? "btn-solid" : "btn-ghost"} ${className}`.trim();

  if (!to) {
    return (
      <button type={type} className={classes} style={style} disabled={disabled}>
        {children}
      </button>
    );
  }

  const isHash = to.startsWith("#");
  const isExternal = /^(https?:|mailto:|tel:)/.test(to);
  if (isHash || isExternal) {
    const extra =
      to.startsWith("http") || to.startsWith("https://wa.me")
        ? { target: "_blank" as const, rel: "noreferrer" as const }
        : {};
    return (
      <a href={to} className={classes} style={style} {...extra}>
        {children}
      </a>
    );
  }

  return (
    <Link to={to} className={classes} style={style}>
      {children}
    </Link>
  );
}
