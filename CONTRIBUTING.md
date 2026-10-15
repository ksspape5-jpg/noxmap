# Contribuer à Points Noirs Dakar

Ce guide explique comment le code est organisé et comment travailler à plusieurs sans se marcher dessus.

## Lancer le projet

```bash
pnpm install            # dépendances du front
cd server && npm install # dépendances de l'API
pnpm dev:all            # front (Vite) + API (Express) en parallèle
```

L'API a besoin d'un fichier `server/.env` contenant `GEMINI_API_KEY=...` (jamais commité).

## Architecture du front (`src/`)

```
src/
├── main.tsx              Point d'entrée : charge index.css puis App
├── App.tsx               Routeur (BrowserRouter)
├── index.css             Thème Tailwind (@theme : couleurs, breakpoint) et styles de base
├── app/                  Coquille de l'application
│   ├── AppLayout.tsx     En-tête, alerte, pages, pied de page, chat
│   └── AppRoutes.tsx     Déclaration des routes
├── layout/               Header, MobileNav, Footer, Logo, navItems
├── features/             Une fonctionnalité = un dossier
│   ├── home/             Page d'accueil
│   ├── map/              Carte des signalements
│   ├── report/           Formulaire « Ici c'est inondé »
│   ├── ranking/          Classement des quartiers
│   ├── about/            Page « À propos »
│   ├── weather-alert/    Bandeau de vigilance pluie
│   └── assistant/        Chat flottant (hook, appel API, prompt)
└── shared/               Code utilisé par plusieurs fonctionnalités
    ├── ui/               Button, IconButton, Eyebrow, SectionHeading, PageTitle,
    │                     DemoBadge, Filters, ContentPage
    ├── lib/cn.ts         Fusion de classes Tailwind (tailwind-merge)
    ├── flood/            Types, niveaux d'eau, LevelBadge, données démo
    ├── map/              MapCanvas (carte Leaflet réutilisable)
    └── roadmap/          Section « Feuille de route »
```

Structure type d'une fonctionnalité :

```
features/<nom>/
├── index.ts              API publique (export par défaut de la page)
├── <Nom>Page.tsx         Composant de page : état + assemblage
├── components/           Composants internes
├── hooks/  api/  types.ts  data.ts   (selon les besoins)
```

## Règles pour limiter le couplage

1. **Une fonctionnalité n'importe jamais une autre fonctionnalité.** Si deux fonctionnalités ont besoin du même code, il va dans `src/shared/`.
2. **On importe une fonctionnalité via son `index.ts`** (`import MapPage from "@/features/map"`), jamais un fichier interne.
3. **Pas de fichier CSS par composant** : les styles s'écrivent en classes Tailwind dans le JSX (voir « Styles » ci-dessous).
4. **`src/shared/` et `src/index.css` sont partagés** : toute modification doit être signalée à l'équipe dans la PR.
5. **Fichiers courts** : au-delà d'environ 150 lignes pour un composant, découpez-le.
6. Utilisez l'alias `@/` pour importer depuis `src/` et exportez les composants par défaut.

## Styles (Tailwind CSS v4)

- **Couleurs : uniquement les tokens du thème** (`bg-primary`, `text-muted`, `border-border`, `bg-ankle`…), définis dans `@theme` de `src/index.css`. Pas de code hexadécimal dans les composants : changer de palette = modifier ce bloc. Sur fond sombre, utilisez du blanc translucide (`text-white/70`).
- **Mobile : `max-md:`** (le breakpoint `md` vaut 800px dans ce projet).
- **Espacements** : Tailwind v4 accepte tout multiple de 0.25, avec 1 = 4px (`p-4.5` = 18px, `w-87.5` = 350px) ; les crochets (`text-[13px]`) seulement si nécessaire.
- **Classes conditionnelles** : `cn()` de `@/shared/lib/cn`, qui résout aussi les conflits (`cn("px-5", "px-2")` → `px-2`). Les composants partagés acceptent `className` pour être ajustés.
- **Jamais de nom de classe construit dynamiquement** (`bg-${level}`) : Tailwind ne le détecterait pas. Utilisez un objet (`LEVEL_BG[level]`).
- Listes de classes longues : découpez-les dans `cn("…base…", "…mobile…")` ou une constante nommée.
- Ajouter un token (couleur, ombre) dans `src/index.css` est une modification partagée : signalez-la dans la PR.

## Ajouter une page

1. Créez `src/features/<nom>/` avec `index.ts` et `<Nom>Page.tsx`.
2. Ajoutez la route dans `src/app/AppRoutes.tsx`.
3. Si la page doit apparaître dans le menu, ajoutez-la dans `src/layout/navItems.ts`.

Ce sont les deux seuls fichiers communs à toucher : gardez ces modifications petites.

## API (`server/`)

```
server/
├── index.js              Démarre le serveur
└── src/
    ├── app.js            Application Express (middlewares + routes)
    ├── config.js         Variables d'environnement
    ├── routes/chat.js    POST /api/chat
    └── services/gemini.js Appel à l'API Gemini
```

Une nouvelle route = un fichier dans `routes/` branché dans `app.js` ; la logique métier va dans `services/`.

## Workflow Git

- Une branche par tâche, créée depuis `main` : `feat/map-filtres`, `fix/report-position`…
- Petits commits au format [Conventional Commits](https://www.conventionalcommits.org/fr/), en une phrase claire :
  - `feat: ajouter le filtre par période sur la carte`
  - `fix: corriger la largeur des barres du classement`
  - `refactor: extraire le panneau de signalements`
  - `docs:`, `style:`, `chore:` pour le reste
- Avant d'ouvrir une PR : `pnpm build` doit passer et `git pull --rebase origin main` pour rester à jour.
