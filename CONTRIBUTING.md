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
├── index.css             Thème Tailwind, reset et utilitaires globaux
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
    ├── ui/               Button, PageTitle, DemoBadge, Filters
    ├── flood/            Types, niveaux d'eau, LevelBadge, données démo
    ├── map/              MapCanvas (carte Leaflet réutilisable)
    └── roadmap/          Section « Feuille de route »
```

Structure type d'une fonctionnalité :

```
features/<nom>/
├── index.ts              API publique (export par défaut de la page)
├── <Nom>Page.tsx         Composant de page : état + assemblage
├── <nom>.css             Styles de la fonctionnalité
├── components/           Composants internes (+ leur CSS si besoin)
├── hooks/  api/  types.ts  data.ts   (selon les besoins)
```

## Règles pour limiter le couplage

1. **Une fonctionnalité n'importe jamais une autre fonctionnalité.** Si deux fonctionnalités ont besoin du même code, il va dans `src/shared/`.
2. **On importe une fonctionnalité via son `index.ts`** (`import MapPage from "@/features/map"`), jamais un fichier interne.
3. **Les styles vivent à côté de leur composant** et sont importés par lui. Préfixez les classes par le nom du composant (`.rank-item`, `.chat-popup`…) pour éviter les collisions.
4. **`src/shared/` et `src/index.css` sont partagés** : toute modification doit être signalée à l'équipe dans la PR.
5. **Fichiers courts** : au-delà d'environ 200 lignes pour un composant (500 pour un CSS), découpez-le.
6. Utilisez l'alias `@/` pour importer depuis `src/` et exportez les composants par défaut.

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
