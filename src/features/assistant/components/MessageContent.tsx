import type { ReactNode } from "react";

// Rendu Markdown minimal des réponses : paragraphes, titres, listes, **gras** et `code`.

function renderInline(text: string): ReactNode[] {
  const nodes: ReactNode[] = [];
  const regex = /(\*\*[^*]+\*\*|`[^`]+`)/g;
  let lastIndex = 0;
  let match: RegExpExecArray | null;
  let key = 0;
  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) nodes.push(text.slice(lastIndex, match.index));
    const token = match[0];
    nodes.push(
      token.startsWith("**") ? (
        <strong key={key++}>{token.slice(2, -2)}</strong>
      ) : (
        <code key={key++} className="rounded bg-black/6 px-1 py-px text-[11px]">
          {token.slice(1, -1)}
        </code>
      ),
    );
    lastIndex = regex.lastIndex;
  }
  if (lastIndex < text.length) nodes.push(text.slice(lastIndex));
  return nodes;
}

const LIST = "mb-1.5 pl-4.5 last:mb-0 [&>li]:my-0.5";

export default function MessageContent({ content }: { content: string }) {
  const blocks: ReactNode[] = [];
  let listItems: ReactNode[] = [];
  let listType: "ul" | "ol" | null = null;
  let key = 0;

  const flushList = () => {
    if (listItems.length && listType) {
      blocks.push(
        listType === "ul" ? (
          <ul key={`list-${key++}`} className={`${LIST} list-disc`}>{listItems}</ul>
        ) : (
          <ol key={`list-${key++}`} className={`${LIST} list-decimal`}>{listItems}</ol>
        ),
      );
    }
    listItems = [];
    listType = null;
  };

  content.split("\n").forEach((raw) => {
    const line = raw.trimEnd();
    const bullet = line.match(/^\s*[-*]\s+(.*)$/);
    const ordered = line.match(/^\s*\d+[.)]\s+(.*)$/);
    const heading = line.match(/^#{1,6}\s+(.*)$/);

    if (bullet || ordered) {
      const type = bullet ? "ul" : "ol";
      if (listType !== type) flushList();
      listType = type;
      listItems.push(<li key={`li-${key++}`}>{renderInline((bullet ?? ordered)![1])}</li>);
      return;
    }
    flushList();
    if (heading) {
      blocks.push(<p key={`h-${key++}`} className="mb-1.5 font-bold last:mb-0">{renderInline(heading[1])}</p>);
    } else if (line.trim()) {
      blocks.push(<p key={`p-${key++}`} className="mb-1.5 last:mb-0">{renderInline(line)}</p>);
    }
  });
  flushList();

  return <>{blocks}</>;
}
