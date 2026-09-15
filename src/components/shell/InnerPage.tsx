import type { ReactNode } from "react";

type InnerPageProps = {
  children: ReactNode;
  className?: string;
  id?: string;
};

export function InnerPage({ children, className = "", id = "main" }: InnerPageProps) {
  return (
    <main className={`inner ${className}`.trim()} id={id}>
      {children}
    </main>
  );
}
