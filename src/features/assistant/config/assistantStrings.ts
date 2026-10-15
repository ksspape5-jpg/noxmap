export type AssistantLang = "fr" | "wo";

export type AssistantStrings = {
  subtitle: string;
  open: string;
  close: string;
  newChat: string;
  emptyTitle: string;
  emptySubtitle: string;
  placeholder: string;
  loading: string;
  listen: string;
  useful: string;
  notUseful: string;
  micStart: string;
  micStop: string;
  send: string;
  report: string;
  copied: string;
  disclaimer: string;
  reviewNote?: string;
};

export const ASSISTANT_STRINGS: Record<AssistantLang, AssistantStrings> = {
  fr: {
    subtitle: "Guide intelligent",
    open: "Ouvrir l'assistant",
    close: "Fermer l'assistant",
    newChat: "Nouvelle conversation",
    emptyTitle: "Comment puis-je vous aider ?",
    emptySubtitle: "Je vous guide dans l'utilisation de l'application",
    placeholder: "Posez votre question...",
    loading: "Réflexion en cours...",
    listen: "Écouter la réponse",
    useful: "Réponse utile",
    notUseful: "Réponse peu utile",
    micStart: "Dicter une question",
    micStop: "Arrêter la dictée",
    send: "Envoyer",
    report: "Signaler une erreur",
    copied: "Copié — collez-le dans une issue GitHub.",
    disclaimer: "Assistant IA — il peut se tromper. Ne remplace pas les secours officiels.",
  },
  wo: {
    subtitle: "Jàngalekat xelmu",
    open: "Ubbi jàppalekat bi",
    close: "Tëj jàppalekat bi",
    newChat: "Waxtaan bu bees",
    emptyTitle: "Naka laa la mën a jàppale ?",
    emptySubtitle: "Dama lay jàngal ni ngir jëfandikoo app bi",
    placeholder: "Laajal sa laaj...",
    loading: "Mungi xalaat...",
    listen: "Déglu tontu bi",
    useful: "Tontu bu baax",
    notUseful: "Tontu bu baaxul",
    micStart: "Waxal sa laaj",
    micStop: "Taxawal wax bi",
    send: "Yónnee",
    report: "Yégal tuuti",
    copied: "Mën naa kopye — tëral ko ci issue GitHub.",
    disclaimer: "Jàppalekat IA — man nañu fàww. Du taxawal ndimbal yi.",
    reviewNote: "Traductions wolof à valider par un locuteur natif.",
  },
};

export const WOLOF_INSTRUCTION =
  "L'utilisateur a choisi le wolof : réponds exclusivement en wolof, simplement, et garde les termes techniques de l'application tels quels si nécessaire.";
