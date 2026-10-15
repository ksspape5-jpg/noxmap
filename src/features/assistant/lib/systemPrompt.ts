import { ASSISTANT_SYSTEM_PROMPT } from "../config/assistantPrompt";
import { WOLOF_INSTRUCTION, type AssistantLang } from "../config/assistantStrings";
import { buildKnowledgeContext } from "../config/knowledge";

type PromptContext = { query: string; pathname: string; pageLabel: string; lang: AssistantLang };

// Prompt système envoyé à chaque question : consignes + page consultée + extraits de la base de connaissances.
export function buildSystemPrompt({ query, pathname, pageLabel, lang }: PromptContext): string {
  const parts = [
    ASSISTANT_SYSTEM_PROMPT,
    `Contexte de navigation : l'utilisateur consulte actuellement la page « ${pageLabel} » (${pathname}). Tiens-en compte lorsque c'est utile.`,
  ];
  const knowledge = buildKnowledgeContext(query);
  if (knowledge) parts.push(knowledge);
  if (lang === "wo") parts.push(WOLOF_INSTRUCTION);
  return parts.join("\n\n");
}
