import { createPortal } from "react-dom";
import { NavLink, useLocation } from "react-router-dom";
import { landingCopy, navItems, type NavChild, type NavItem } from "../../data/company";
import { useDesktopNav, useMenu } from "../../hooks/useLanding";
import { Button } from "../ui/Button";
import { Logo } from "../ui/Logo";

type HeaderProps = {
  variant?: "locked" | "shell";
};

function isNavActive(to: string, pathname: string) {
  const path = to.split("#")[0];
  if (!path) return false;
  if (path === "/") return pathname === "/";
  if (path === "/products") {
    return pathname === "/products" || pathname.startsWith("/products/") || pathname === "/brands";
  }
  if (path === "/services") {
    return pathname === "/services" || pathname.startsWith("/services/");
  }
  if (path === "/about") {
    return pathname === "/about";
  }
  return pathname === path;
}

function isChildActive(to: string, pathname: string, hash: string) {
  const [path, fragment] = to.split("#");
  if (fragment) {
    return pathname === path && hash === `#${fragment}`;
  }
  if (path === "/products") return pathname === "/products";
  if (path === "/services") return pathname === "/services";
  if (path === "/about") return pathname === "/about" && !hash;
  return pathname === path;
}

function FlyoutLink({ child, pathname, hash }: { child: NavChild; pathname: string; hash: string }) {
  const active = isChildActive(child.to, pathname, hash);
  return (
    <NavLink
      to={child.to}
      className={`nav-flyout-link${active ? " is-active" : ""}`}
      role="listitem"
      aria-current={active ? "page" : undefined}
    >
      {child.label}
    </NavLink>
  );
}

function NavEntry({
  item,
  animate,
  pathname,
  hash,
}: {
  item: NavItem;
  animate: boolean;
  pathname: string;
  hash: string;
}) {
  const active = isNavActive(item.to, pathname);
  const classes = `nav-pill${animate ? ` appear ${item.appear}` : ""}${!animate && active ? " is-active" : ""}`;
  const style = animate ? { ["--d" as string]: item.delay } : undefined;
  const children = item.children;
  const flyoutId = `nav-${item.label.toLowerCase()}`;

  const parent = (
    <NavLink
      to={item.to}
      className={classes}
      style={style}
      aria-current={!animate && active ? "page" : undefined}
      aria-haspopup={children?.length ? "true" : undefined}
      aria-controls={children?.length ? flyoutId : undefined}
    >
      {item.label}
    </NavLink>
  );

  if (!children?.length) return parent;

  return (
    <div className={`nav-group${children.length > 6 ? " nav-group--wide" : ""}`}>
      {parent}
      <div className="nav-flyout" id={flyoutId} role="list">
        {children.map((child) => (
          <FlyoutLink key={child.to} child={child} pathname={pathname} hash={hash} />
        ))}
      </div>
    </div>
  );
}

function PrimaryNav({ animate }: { animate: boolean }) {
  const { pathname, hash } = useLocation();

  return (
    <nav id="site-nav" aria-label="Primary">
      {navItems.map((item) => (
        <NavEntry key={item.to} item={item} animate={animate} pathname={pathname} hash={hash} />
      ))}
    </nav>
  );
}

export function Header({ variant = "locked" }: HeaderProps) {
  const locked = variant === "locked";
  const desktop = useDesktopNav();
  const { open, toggle } = useMenu();
  const animate = locked && desktop;
  const nav = <PrimaryNav animate={animate} />;

  return (
    <header className={`header${locked ? "" : " header--shell"}`}>
      <Logo to="/" animated={animate} />
      {desktop ? nav : null}
      <Button
        to="/contact"
        variant="solid"
        className={`header-cta${animate ? " appear appear--scale" : ""}`}
        style={animate ? { ["--d" as string]: "0.34s" } : undefined}
      >
        {landingCopy.ctaQuote}
      </Button>
      <button
        type="button"
        className={`burger${animate ? " appear appear--scale" : ""}`}
        aria-controls="site-nav"
        aria-expanded={open}
        aria-label={open ? "Close menu" : "Open menu"}
        style={animate ? { ["--d" as string]: "0.34s" } : undefined}
        onClick={toggle}
      >
        <span className="burger-bars" aria-hidden="true">
          <span className="burger-bar" />
          <span className="burger-bar" />
          <span className="burger-bar" />
        </span>
      </button>
      {!desktop && typeof document !== "undefined" ? createPortal(nav, document.body) : null}
    </header>
  );
}
