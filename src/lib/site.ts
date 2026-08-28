import site from "../content/site.json";

export type ContactPerson = {
  label: string;
  value: string;
  href: string;
};

export type BureauMember = {
  name: string;
  role: string;
  linkedin: string;
  bio: string;
};

export type SiteConfig = {
  name: string;
  shortName: string;
  tagline: string;
  description: string;
  founded: string;
  email: string;
  linkedin: string;
  contacts: ContactPerson[];
  newsletterNote: string;
  bureau: BureauMember[];
  source?: {
    wordpress: string;
    importedAt: string;
    pages: number;
    posts: number;
    media: number;
    scopedPages: number;
    scopedPosts: number;
  };
};

export const siteConfig = site as SiteConfig;

export const navItems = [
  { href: "/", label: "Accueil" },
  { href: "/notre-histoire/", label: "Notre histoire" },
  { href: "/membres/", label: "Membres" },
  { href: "/documents-france-cleantech-industries/", label: "Documents" },
  { href: "/finance-cleantechs-industrielles-francaises/", label: "Étude" },
  { href: "/actualites/", label: "Actualités" },
  { href: "/contact/", label: "Contact" },
] as const;

export const memberFilters = [
  { id: "all", label: "Tous" },
  { id: "pac-haute-temperature", label: "PAC Haute température" },
  { id: "chauffage", label: "Chauffage" },
  { id: "hydrogene", label: "Hydrogène" },
  { id: "chaleur-fatale", label: "Chaleur fatale" },
  { id: "stockage", label: "Stockage" },
  { id: "froid", label: "Froid" },
  { id: "production-electricite", label: "Production d'électricité" },
] as const;

export function formatDate(iso: string): string {
  return new Intl.DateTimeFormat("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(`${iso}T00:00:00`));
}
