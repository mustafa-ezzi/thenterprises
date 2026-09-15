import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { company } from "../data/company";

type DocumentMeta = {
  title?: string;
  description: string;
  path?: string;
  noIndex?: boolean;
};

function upsertMeta(attr: "name" | "property", key: string, content: string) {
  let node = document.head.querySelector(`meta[${attr}="${key}"]`);
  if (!node) {
    node = document.createElement("meta");
    node.setAttribute(attr, key);
    document.head.appendChild(node);
  }
  node.setAttribute("content", content);
}

function upsertLink(rel: string, href: string) {
  let node = document.head.querySelector(`link[rel="${rel}"]`);
  if (!node) {
    node = document.createElement("link");
    node.setAttribute("rel", rel);
    document.head.appendChild(node);
  }
  node.setAttribute("href", href);
}

function siteOrigin() {
  const fromEnv = import.meta.env.VITE_SITE_URL?.replace(/\/$/, "");
  if (fromEnv) return fromEnv;
  return window.location.origin;
}

export function useDocumentMeta({ title, description, path, noIndex = false }: DocumentMeta) {
  const location = useLocation();
  const pathname = path ?? location.pathname;

  useEffect(() => {
    const fullTitle = title
      ? title === company.title || title.includes("—")
        ? title
        : `${title} — ${company.brand}`
      : company.title;
    const url = `${siteOrigin()}${pathname}`;

    document.title = fullTitle;
    upsertMeta("name", "description", description);
    upsertMeta("name", "robots", noIndex ? "noindex, nofollow" : "index, follow");
    upsertMeta("property", "og:title", fullTitle);
    upsertMeta("property", "og:description", description);
    upsertMeta("property", "og:type", "website");
    upsertMeta("property", "og:url", url);
    upsertMeta("property", "og:site_name", company.brand);
    upsertMeta("name", "twitter:card", "summary");
    upsertMeta("name", "twitter:title", fullTitle);
    upsertMeta("name", "twitter:description", description);
    upsertLink("canonical", url);

    return () => {
      document.title = company.title;
      upsertMeta("name", "robots", "index, follow");
    };
  }, [description, noIndex, pathname, title]);
}

/** Unique document title plus a description for the current route. */
export function usePageTitle(title: string, description?: string, options?: { noIndex?: boolean }) {
  useDocumentMeta({
    title,
    description: description ?? company.description,
    noIndex: options?.noIndex,
  });
}
