import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";

function normalizeBase(value: string | undefined): string {
  if (!value || value === "/") {
    return "/";
  }
  const trimmed = value.startsWith("/") ? value : `/${value}`;
  return trimmed.endsWith("/") ? trimmed : `${trimmed}/`;
}

const site =
  process.env.SITE_URL ?? "https://iamsupersocks.github.io";
const base = normalizeBase(process.env.BASE_PATH);

export default defineConfig({
  site,
  base,
  trailingSlash: "always",
  integrations: [sitemap()],
  redirects: {
    "/nos-membres": "/membres",
    "/home-page": "/",
    "/document-search": "/documents-france-cleantech-industries",
    "/sitemaps": "/sitemap-index.xml",
  },
});
