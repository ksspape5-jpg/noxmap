# Contribuer à Points Noirs Dakar

Merci de votre intérêt ! Ce projet vise à rendre l'information sur les inondations plus lisible à Dakar.

En participant, vous vous engagez à respecter un comportement respectueux et inclusif envers les autres.

## Mise en place

```bash
pnpm install
cp .env.example .env   # puis renseignez GEMINI_API_KEY
pnpm dev:all
```

## Avant d'ouvrir une Pull Request

La CI exécute plusieurs vérifications. Lancez-les en local :

```bash
pnpm typecheck   # TypeScript
pnpm test        # Vitest
pnpm build       # build de production
```

- Gardez des PR **petites et ciblées** (une fonctionnalité ou un correctif par PR).
- Ajoutez des **tests** pour toute logique nouvelle (voir `src/lib/*.test.ts`).
- Respectez le style existant (double quotes, composants en export par défaut).
- Vérifiez l'accessibilité (libellés ARIA, navigation clavier, contrastes).

## Convention de commits

Messages courts au présent, par ex. :

```
classement: ajoute la comparaison avec la saison précédente
assistant: corrige le streaming SSE
```

## Bonnes premières contributions

Ces tâches sont bien délimitées et idéales pour débuter :

- [ ] **Valider les traductions wolof** de l'assistant (`src/config/assistantStrings.ts`).
- [ ] **Enrichir la base de connaissances** de l'assistant (`src/config/knowledge.ts`).
- [ ] **Ajouter des tests** pour `ChatFlottant` (envoi, streaming, retour).
- [ ] **Améliorer l'accessibilité** : lien d'évitement, focus visible, rôles ARIA.
- [ ] **Documenter** une fonctionnalité dans le README.
- [ ] **Ajouter un indicateur** au classement (par ex. par confirmations).

## Signaler un bug

Ouvrez une issue en décrivant : la page concernée, ce que vous attendiez, ce qui s'est produit,
et si possible une capture d'écran. L'assistant propose aussi un bouton « Signaler une erreur »
sur chaque réponse.

## Idées plus larges

Le premier prototype IA se concentre sur trois choses : **lecture des photos**,
**floutage des visages et plaques** et **détection des doublons**. Le reste suit :

- Comprendre les messages vocaux (français et wolof).
- Trouver le lieu à partir d'un texte ou d'un vocal.
- Répondre sur WhatsApp à partir des données de la carte.
- Rédiger des rapports automatiques pour la mairie.
- Modérer les contenus (photos inappropriées, spam, abus).
- Prédire les quartiers à risque (altitude, pluie prévue, historique).
- Passer des données de démonstration à de vraies données (PostGIS).

Principes à respecter : l'IA ne décide jamais seule d'une urgence, n'invente pas
d'information (réponse « donnée insuffisante » sinon) et indique un niveau de confiance.
