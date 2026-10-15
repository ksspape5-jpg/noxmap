# Points Noirs Dakar — NdoxMap

Carte citoyenne des rues inondées à Dakar et dans sa banlieue, alimentée par les habitants.

> Voir où l'eau monte. Agir plus vite.

[![CI](https://github.com/ksspape5-jpg/noxmap/actions/workflows/ci.yml/badge.svg)](https://github.com/ksspape5-jpg/noxmap/actions/workflows/ci.yml)

## Le problème

Après une forte pluie, l'information sur les rues impraticables circule mal entre quartiers.
Points Noirs Dakar propose un signalement simple, une carte partagée et des données lisibles
pour aider à prioriser les interventions.

## Fonctionnalités

- **Carte** : points actifs avec niveau, heure et confirmations, recentrage via `?focus=`.
- **Signalement** : placer le point, choisir le niveau d'eau (cheville, genou, taille), photo facultative.
- **Classement** : quartiers les plus touchés, filtres par période et par indicateur (volume, gravité, niveau),
  fiche détail par quartier, comparaison avec la saison précédente, export **CSV / GeoJSON / PDF**.
- **Assistant IA** : guide intégré (contexte de page, base de connaissances, suggestions par page,
  streaming, historique, retour 👍/👎, dictée et lecture vocale, interface FR/Wolof).
- **PWA** : installable, coquille mise en cache pour un usage hors-ligne partiel.
- **API** : proxy Gemini (`/api/chat`, `/api/chat/stream`) avec CORS restreint et limitation de débit.

Les données affichées sont **de démonstration**.

## Stack

React 19 · Vite 8 · TypeScript 5.7 · Tailwind CSS v4 · Leaflet / React-Leaflet ·
React Router 7 · Lucide React · Express (proxy Gemini) · Vitest + Testing Library.

## Démarrage

Prérequis : Node 22 et pnpm.

```bash
pnpm install
cp .env.example .env
# renseignez GEMINI_API_KEY dans .env
pnpm dev:all   # front (http://localhost:8443) + API (http://localhost:3001)
```

Autres scripts :

```bash
pnpm dev       # front seul
pnpm dev:api   # API seule
pnpm build     # build de production
pnpm preview   # prévisualiser le build
pnpm typecheck # vérification TypeScript
pnpm test      # tests (Vitest)
```

## Variables d'environnement

| Variable | Portée | Défaut | Description |
| --- | --- | --- | --- |
| `GEMINI_API_KEY` | serveur | — | Clé API Google Gemini (obligatoire pour l'assistant). |
| `GEMINI_MODEL` | serveur | `gemini-3.1-flash-lite` | Modèle utilisé. |
| `PORT` | serveur | `3001` | Port de l'API. |
| `ALLOWED_ORIGINS` | serveur | origines locales | Liste d'origines CORS autorisées, séparées par des virgules. |
| `RATE_LIMIT_MAX` | serveur | `20` | Requêtes max par fenêtre et par IP. |
| `RATE_LIMIT_WINDOW_MS` | serveur | `60000` | Taille de la fenêtre de limitation (ms). |
| `VITE_API_BASE_URL` | client | `http://localhost:3001` | URL de l'API. |
| `VITE_REPO_URL` | client | `https://github.com/ksspape5-jpg/noxmap` | Dépôt utilisé par « Signaler une erreur ». |

> La clé `GEMINI_API_KEY` reste **côté serveur** : elle n'est jamais exposée au navigateur.

## Structure

```
src/
  App.tsx                    pages + carte + classement
  components/                ChatFlottant (+ CSS, tests)
  config/                    assistant (prompt), knowledge (RAG léger), i18n
  lib/                       logique pure testable (ranking, assistant)
  test/                      setup Vitest
server/                      API Express (proxy Gemini)
public/                      assets PWA (manifest, service worker, icônes)
```

## Feuille de route IA

**Déjà prévu**

- Lire les photos : eau oui/non, hauteur estimée, indice de confiance _(MVP)_.
- Écarter les faux signalements _(MVP, amélioré V2)_.
- Comprendre les messages vocaux en français et en wolof _(V2)_.
- Regrouper et valider les signalements proches _(MVP, règles simples)_.
- Prédire les quartiers à risque _(V3, après une saison de données)_.

**À ajouter**

6. Flouter les visages et les plaques d'immatriculation _(MVP, vie privée)_.
7. Trouver le lieu à partir d'un texte ou d'un vocal _(V2)_.
8. Répondre aux questions sur WhatsApp depuis les données de la carte _(V2)_.
9. Rédiger des rapports automatiques pour la mairie _(V3)_.
10. Modérer les contenus (photos inappropriées, spam, abus) _(V2)_.

**Ce que l'IA ne fait pas**

Elle ne décide jamais seule d'une urgence, elle n'invente pas d'information
(elle répond « donnée insuffisante » quand elle ne sait pas) et elle indique
toujours un niveau de confiance.

**Premier prototype** — l'équipe IA se concentre sur trois choses : la lecture des
photos (1), le floutage des visages et plaques (6) et la détection des doublons (2 et 4).

## Feuille de route produit

- Données réelles (PostGIS) et version wolof validée par un locuteur natif.
- Alertes météo réelles.
- Carte de risque prédictive.

## Contribuer

Les contributions sont bienvenues — voir [CONTRIBUTING.md](./CONTRIBUTING.md).
Projet né lors du Hacktoberfest 2026 Dakar avec le soutien de Galsen DEV.

## Licence

MIT.
