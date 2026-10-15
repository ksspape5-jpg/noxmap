# Points Noirs Dakar

> Voir où l'eau monte. Agir plus vite.

Une carte citoyenne des rues inondées à Dakar et dans sa banlieue (Keur Massar, Pikine, Thiaroye, Guédiawaye, Rufisque…), alimentée par les habitants eux-mêmes.

![React](https://img.shields.io/badge/React-19-149eca) ![Vite](https://img.shields.io/badge/Vite-8-646cff) ![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-38bdf8) ![TypeScript](https://img.shields.io/badge/TypeScript-5.7-3178c6) ![Statut](https://img.shields.io/badge/statut-démo-e0a500)

---

## Sommaire

- [Pourquoi ce projet ?](#pourquoi-ce-projet-)
- [Fonctionnalités](#fonctionnalités)
- [État actuel du projet](#état-actuel-du-projet)
- [Démarrage rapide](#démarrage-rapide)
- [Configuration](#configuration)
- [Scripts disponibles](#scripts-disponibles)
- [Architecture](#architecture)
- [Design](#design)
- [Contribuer](#contribuer)
- [Feuille de route](#feuille-de-route)
- [Licence](#licence)

---

## Pourquoi ce projet ?

**Le problème.** À chaque forte pluie, des rues de Dakar et de sa banlieue deviennent impraticables. L'information circule mal entre quartiers : on découvre une rue inondée en y arrivant.

**Notre réponse.** Une application simple, **sans compte**, où chacun peut :

1. **Signaler** une rue inondée en moins d'une minute (lieu + niveau d'eau) ;
2. **Voir** sur une carte les zones à éviter ;
3. **Prévenir** son quartier et aider à prioriser les interventions.

> ⚠️ L'application aide à réagir, elle **ne remplace ni les alertes officielles ni les secours**.

### Les niveaux d'eau

Toute l'application s'appuie sur trois niveaux, faciles à estimer à l'œil nu :

| Niveau | Signification |
| --- | --- |
| 🟡 **Cheville** | La rue reste praticable avec prudence. |
| 🟠 **Genou** | Le passage à pied devient dangereux. |
| ⚫ **Taille — « point noir »** | Zone dangereuse, évitez tout passage. |

---

## Fonctionnalités

| Page | Route | Ce qu'on y fait |
| --- | --- | --- |
| **Accueil** | `/` | Présentation, chiffres du jour, les 3 gestes, feuille de route |
| **Carte** | `/carte` | Carte des signalements actifs, liste latérale, fiche détaillée de chaque point, légende |
| **Signaler** | `/signaler` | Formulaire en 2 étapes : placer le point, puis choisir le niveau d'eau (photo facultative) |
| **Classement** | `/classement` | Quartiers les plus touchés, zones récurrentes |
| **À propos** | `/a-propos` | Le projet, la vie privée, les limites de l'outil |

Sur toutes les pages :

- un **bandeau de vigilance pluie** ;
- un **assistant intégré** (bouton ✨ en bas à droite) qui répond aux questions sur l'utilisation de l'application, propulsé par l'API Gemini.

L'interface est pensée **mobile d'abord** : barre de navigation en bas de l'écran, fiche de détail qui glisse depuis le bas sur la carte.

---

## État actuel du projet

Le projet est une **démonstration fonctionnelle de l'interface**. Concrètement :

| ✅ Fonctionne | 🚧 Simulé pour l'instant |
| --- | --- |
| Navigation complète et responsive | Signalements, chiffres et classement (données de démo dans le code) |
| Carte interactive (Leaflet + OpenStreetMap) | Envoi d'un signalement (rien n'est enregistré) |
| Parcours de signalement complet | Position « Ma position » et choix du lieu sur la carte |
| Assistant connecté à Gemini (via l'API locale) | Filtres par période (Dernière heure / Aujourd'hui / 7 jours) |
| | Alerte météo |

Ces points sont de bonnes premières contributions : voir [Contribuer](#contribuer).

---

## Démarrage rapide

### Prérequis

- **Node.js 22** ou plus
- **pnpm** (`npm install -g pnpm`)
- Une **clé API Gemini** (gratuite sur [Google AI Studio](https://aistudio.google.com/apikey)), uniquement pour l'assistant

> Si vous utilisez [mise](https://mise.jdx.dev/), `mise install` installe les bonnes versions de Node et pnpm (voir `.mise.toml`).

### Installation

```bash
# 1. Cloner le dépôt
git clone https://github.com/ksspape5-jpg/noxmap.git
cd noxmap

# 2. Installer les dépendances du front
pnpm install

# 3. Installer les dépendances de l'API
cd server && npm install && cd ..

# 4. Configurer la clé de l'assistant
echo "GEMINI_API_KEY=votre_cle_ici" > server/.env

# 5. Lancer le front et l'API ensemble
pnpm dev:all
```

Ouvrez ensuite **<http://localhost:5173>**. 🎉

> L'assistant est la seule partie qui a besoin de l'API. Pour travailler uniquement sur l'interface, `pnpm dev` suffit : tout fonctionne, sauf les réponses du chat.

---

## Configuration

Les fichiers `.env` ne sont jamais commités (ils sont dans `.gitignore`).

**API — `server/.env`**

| Variable | Obligatoire | Défaut | Rôle |
| --- | --- | --- | --- |
| `GEMINI_API_KEY` | oui (pour l'assistant) | — | Clé de l'API Gemini |
| `GEMINI_MODEL` | non | `gemini-3.1-flash-lite` | Modèle Gemini utilisé |
| `PORT` | non | `3001` | Port de l'API |

**Front — `.env` à la racine (facultatif)**

| Variable | Défaut | Rôle |
| --- | --- | --- |
| `VITE_API_BASE_URL` | `http://localhost:3001` | Adresse de l'API appelée par l'assistant |

---

## Scripts disponibles

À lancer depuis la racine du projet :

| Commande | Effet |
| --- | --- |
| `pnpm dev` | Lance le front (Vite) sur <http://localhost:5173> |
| `pnpm dev:api` | Lance l'API (Express) sur <http://localhost:3001> |
| `pnpm dev:all` | Lance les deux en parallèle |
| `pnpm build` | Construit la version de production dans `dist/` |
| `pnpm preview` | Sert localement la version construite |
| `pnpm format` | Formate le code avec oxfmt |

---

## Architecture

### Vue d'ensemble

```text
┌───────────────────────────┐   POST /api/chat   ┌────────────────────┐        ┌────────────┐
│  Front (React + Vite)     │ ─────────────────▶ │  API (Express)     │ ─────▶ │ API Gemini │
│  http://localhost:5173    │ ◀───────────────── │  localhost:3001    │ ◀───── │  (Google)  │
└───────────────────────────┘      réponse       └────────────────────┘        └────────────┘
   Carte : tuiles OpenStreetMap
```

Le front fonctionne seul. L'API ne sert qu'à l'assistant, pour que la clé Gemini ne soit **jamais exposée dans le navigateur**.

### Stack technique

| Côté | Outils |
| --- | --- |
| Front | React 19, TypeScript, Vite 8, React Router 7 |
| Styles | Tailwind CSS v4 (thème dans `src/index.css`), tailwind-merge |
| Carte | Leaflet + react-leaflet, tuiles OpenStreetMap |
| Icônes | lucide-react |
| API | Node.js, Express, Gemini |

### Organisation du code

Le front est découpé **par fonctionnalité** : chaque développeur peut travailler dans son dossier sans toucher à celui des autres.

```text
src/
├── app/            Coquille de l'application (layout global, routes)
├── layout/         En-tête, navigation mobile, pied de page
├── features/       Une fonctionnalité = un dossier
│   ├── home/           Accueil
│   ├── map/            Carte
│   ├── report/         Formulaire de signalement
│   ├── ranking/        Classement
│   ├── about/          À propos
│   ├── weather-alert/  Bandeau météo
│   └── assistant/      Chat flottant
└── shared/         Code partagé (composants UI, niveaux d'eau, carte, données de démo)

server/
├── index.js        Démarrage
└── src/            Config, routes, service Gemini
```

**Où trouver quoi ?**

| Je veux… | Je regarde… |
| --- | --- |
| Modifier une page | `src/features/<page>/` |
| Ajouter une route ou un lien de menu | `src/app/AppRoutes.tsx` et `src/layout/navItems.ts` |
| Changer les couleurs | bloc `@theme` de `src/index.css` |
| Modifier les données de démo | `src/shared/flood/mockReports.ts`, `src/features/ranking/rankingData.ts` |
| Modifier le comportement de l'assistant | `src/features/assistant/config/assistantPrompt.ts` |
| Modifier l'appel à Gemini | `server/src/services/gemini.js` |

Le détail des règles d'organisation est dans [CONTRIBUTING.md](CONTRIBUTING.md).

---

## Design

L'interface utilise la palette **« Teranga »** : vert Sénégal profond, touches d'or et fond sable clair. Toutes les couleurs sont des **tokens Tailwind** définis à un seul endroit (`src/index.css`) : changer la palette ne demande de modifier aucun composant.

| Token | Couleur | Usage |
| --- | --- | --- |
| `primary` | `#00704A` | Boutons, liens actifs, accents |
| `primary-dark` | `#00553A` | Survol, panneaux sombres |
| `accent` | `#E0A500` | Touches d'or (logo, badges, étapes validées) |
| `ink` | `#10231C` | Texte principal |
| `canvas` | `#F6F7F3` | Fond de page |
| `ankle` / `knee` / `waist` | `#F2C230` / `#E8590C` / `#2B0A0F` | Niveaux d'eau |

Police : [Plus Jakarta Sans](https://fonts.google.com/specimen/Plus+Jakarta+Sans). Version mobile sous **800px** (`max-md:` dans les classes).

---

## Contribuer

Toutes les contributions sont les bienvenues : code, design, traduction en wolof, retours d'usage.

1. Lisez [CONTRIBUTING.md](CONTRIBUTING.md) (architecture, conventions de style, workflow Git).
2. Créez une branche depuis `main` : `feat/…` ou `fix/…`.
3. Faites des commits au format [Conventional Commits](https://www.conventionalcommits.org/fr/), par exemple `feat: ajouter le filtre par période sur la carte`.
4. Vérifiez que `pnpm build` passe, puis ouvrez une Pull Request.

**Idées pour commencer** : brancher les filtres par période, utiliser la vraie géolocalisation pour « Ma position », enregistrer les signalements dans une base de données.

---

## Feuille de route

- [ ] Enregistrement réel des signalements (API + base de données)
- [ ] Analyse IA des photos (confirmation du niveau d'eau)
- [ ] Bot WhatsApp pour signaler sans ouvrir l'application
- [ ] Alertes météo réelles
- [ ] Version wolof avec messages audio
- [ ] Carte des zones à risque (altitude, historique, pluie prévue)

---

## Licence

Le code a vocation à être publié sous **licence MIT**. Le fichier `LICENSE` reste à ajouter au dépôt.
