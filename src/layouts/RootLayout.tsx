import { Outlet } from "react-router-dom";
import ClickSpark from "../components/bits/ClickSpark/ClickSpark";
import { Header } from "../components/landing/Header";
import { Footer } from "../components/shell/Footer";
import { SkipLink } from "../components/shell/SkipLink";
import { MenuProvider, useMenu, usePrefersReducedMotion } from "../hooks/useLanding";

function Shell() {
  const { close } = useMenu();

  return (
    <div className="shell">
      <div className="menu-backdrop" onClick={close} aria-hidden="true" />
      <Header variant="shell" />
      <Outlet />
      <Footer />
    </div>
  );
}

export function RootLayout() {
  const reduce = usePrefersReducedMotion();

  return (
    <ClickSpark sparkColor="#203163" disabled={reduce}>
      <MenuProvider>
        <SkipLink />
        <Shell />
      </MenuProvider>
    </ClickSpark>
  );
}
