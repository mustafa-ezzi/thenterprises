import type { ReactNode } from "react";
import { usePageTitle } from "../../hooks/usePageTitle";
import { InnerPage } from "./InnerPage";

type LegalPageProps = {
  title: string;
  updated: string;
  description: string;
  children: ReactNode;
};

export function LegalPage({ title, updated, description, children }: LegalPageProps) {
  usePageTitle(title, description);

  return (
    <InnerPage className="legal-page">
      <p className="eyebrow">Legal</p>
      <h1>{title}</h1>
      <p className="inner-note">Last updated {updated}</p>
      <div className="legal-copy">{children}</div>
    </InnerPage>
  );
}