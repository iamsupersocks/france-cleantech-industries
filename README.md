# France Cleantech Industries

Préversion statique du site public de [France Cleantech Industries](https://www.france-cleantech-industries.com/), destinée à GitHub Pages.

Le contenu éditorial est versionné dans Git (`src/content/`). Aucun backend n'est introduit : le contact passe par `mailto:`. La newsletter WordPress repose sur une liste Mailchimp interne Divi, sans endpoint public direct vérifiable ; le site propose donc un appel à écrire, sans formulaire trompeur.

## Commandes

```bash
npm ci
npm run dev          # http://localhost:4321/
npm run lint
npm run typecheck
npm run build
npm run preview
npm run check:site   # routes, liens internes, absence de secrets
npm run verify       # lint + typecheck + build + check:site
```

Prérequis : Node 20+.

## Éditer le contenu

| Zone | Fichiers |
| --- | --- |
| Textes de pages | `src/content/pages/*.md` |
| Fiches membres | `src/content/members/*.md` |
| Articles | `src/content/articles/*.md` |
| Documents | `src/content/documents/*.md` + PDF dans `public/documents/` |
| Coordonnées, bureau, LinkedIn | `src/content/site.json` |
| Médias | `public/images/` |

Les champs `listed: false` conservent une fiche (URL WordPress) hors de l'annuaire courant. C'est le cas de Sylfen.

## URLs conservées

- `/`, `/notre-histoire/`, `/membres/`, `/contact/`, `/actualites/`
- fiches membres à la racine (`/enertime/`, `/exora/`, …)
- articles à la racine (`/nouveau-site-fci/`, …)
- `/documents-france-cleantech-industries/`
- `/document/<slug>/`
- `/finance-cleantechs-industrielles-francaises/`

Redirections statiques : `/nos-membres/` → `/membres/`, `/home-page/` → `/`, `/document-search/` → documents, `/sitemaps/` → sitemap.

## Publication GitHub Pages

Le workflow `.github/workflows/pages.yml` construit le site avec :

```text
BASE_PATH=/
SITE_URL=https://france-cleantech-industries.com
```

Le site public est `https://france-cleantech-industries.com/`.

Le domaine personnalisé est attaché à GitHub Pages. Le dépôt ne gère pas les enregistrements DNS, les e-mails OVH, Hostinger ni l'ancien WordPress.

GitHub Pages est activé sur le dépôt et déployé par le workflow.

## Import WordPress

Source vérifiée le 2026-08-28 via l'API publique :

- 32 pages, 4 articles, 299 médias
- import limité aux pages et médias nécessaires (accueil, histoire, membres, fiches, documents, étude, actualités, contact)

Aucun contenu n'a été inventé. Les emojis du thème WordPress ont été retirés à la normalisation. Le formulaire de contact Divi et l'inscription Mailchimp n'ont pas été reproduits.

## Hors périmètre

Pas de push, merge, déploiement, secret, ni modification DNS/MX/WordPress depuis ce worktree.
