import {
  createContext,
  createElement,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export function useLandingLock() {
  useEffect(() => {
    document.documentElement.classList.add("landing-lock");
    document.body.classList.add("landing-lock");
    return () => {
      document.documentElement.classList.remove("landing-lock");
      document.body.classList.remove("landing-lock");
    };
  }, []);
}

export function useAppear() {
  useEffect(() => {
    const nodes = Array.from(document.querySelectorAll<HTMLElement>(".appear, .hero-media"));

    const onEnd = (event: AnimationEvent) => {
      (event.currentTarget as HTMLElement).classList.add("is-in");
    };

    nodes.forEach((el) => el.addEventListener("animationend", onEnd, { once: true }));

    const id = requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        const anyPlayed = nodes.some((el) =>
          el.getAnimations().some((a) => a.playState === "running" || a.playState === "finished"),
        );
        if (!anyPlayed) {
          nodes.forEach((el) => el.classList.add("is-in"));
        }
      });
    });

    return () => {
      cancelAnimationFrame(id);
      nodes.forEach((el) => el.removeEventListener("animationend", onEnd));
    };
  }, []);
}

type MenuApi = {
  open: boolean;
  toggle: () => void;
  close: () => void;
};

const MenuContext = createContext<MenuApi | null>(null);

export function MenuProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const close = useCallback(() => setOpen(false), []);
  const toggle = useCallback(() => setOpen((value) => !value), []);

  useEffect(() => {
    document.body.classList.toggle("menu-open", open);
    return () => document.body.classList.remove("menu-open");
  }, [open]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
    };
    const onResize = () => {
      if (window.matchMedia("(min-width: 901px)").matches) close();
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
    };
  }, [close]);

  useEffect(() => {
    const nav = document.getElementById("site-nav");
    const onNavClick = (event: Event) => {
      if ((event.target as HTMLElement | null)?.closest("a")) close();
    };
    nav?.addEventListener("click", onNavClick);

    if (open) {
      nav?.querySelector<HTMLElement>("a")?.focus();
    }

    return () => nav?.removeEventListener("click", onNavClick);
  }, [close, open]);

  const value = useMemo(() => ({ open, toggle, close }), [open, toggle, close]);

  return createElement(MenuContext.Provider, { value }, children);
}

export function useMenu() {
  const ctx = useContext(MenuContext);
  if (!ctx) {
    throw new Error("useMenu must be used inside MenuProvider");
  }
  return ctx;
}

export function useDesktopNav() {
  const [desktop, setDesktop] = useState(
    () => typeof window !== "undefined" && window.matchMedia("(min-width: 901px)").matches,
  );

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 901px)");
    const onChange = () => setDesktop(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  return desktop;
}

export function usePrefersReducedMotion() {
  const [reduce, setReduce] = useState(
    () => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = () => setReduce(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  return reduce;
}
