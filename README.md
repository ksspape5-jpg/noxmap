# Points Noirs Dakar

Carte citoyenne des rues inondées à Dakar et dans sa banlieue, alimentée par les habitants.

- **Signaler** une rue inondée et le niveau d'eau (cheville, genou, taille = point noir)
- **Voir** les points actifs sur une carte
- **Classer** les quartiers les plus touchés
- **Demander** de l'aide à l'assistant intégré

> Version de démonstration : les données affichées sont fictives.

## Stack

React 19 · Vite · Tailwind CSS v4 · React Router · Leaflet — API Express + Gemini pour l'assistant.

## Démarrage

```bash
pnpm install
cd server && npm install && cd ..
pnpm dev:all
```

Créez `server/.env` avec `GEMINI_API_KEY=...` pour activer l'assistant.

## Contribuer

L'architecture, les règles d'organisation et le workflow Git sont décrits dans [CONTRIBUTING.md](CONTRIBUTING.md).
