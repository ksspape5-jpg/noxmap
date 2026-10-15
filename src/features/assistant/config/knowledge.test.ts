import { describe, it, expect } from "vitest";
import { KNOWLEDGE_BASE, buildKnowledgeContext, retrieve } from "./knowledge";

describe("retrieve", () => {
  it("returns the signalement FAQ for a reporting question", () => {
    const hits = retrieve("Comment signaler une inondation ?");
    expect(hits.length).toBeGreaterThan(0);
    expect(hits.map((entry) => entry.id)).toContain("signaler");
  });

  it("returns the levels entry for a water level question", () => {
    const hits = retrieve("que veut dire le niveau genou et point noir");
    expect(hits.map((entry) => entry.id)).toContain("niveaux");
  });

  it("returns nothing for an unrelated query", () => {
    expect(retrieve("recette de cuisine zzzz")).toHaveLength(0);
  });

  it("honors the limit argument", () => {
    expect(retrieve("carte quartier signalement projet", 2)).toHaveLength(2);
  });
});

describe("buildKnowledgeContext", () => {
  it("returns an empty string when nothing matches", () => {
    expect(buildKnowledgeContext("zzzz qqqq")).toBe("");
  });

  it("returns a labelled context block when it matches", () => {
    const context = buildKnowledgeContext("comment exporter le classement ?");
    expect(context).toContain("Base de connaissances");
  });
});

describe("knowledge base", () => {
  it("has unique ids", () => {
    const ids = KNOWLEDGE_BASE.map((entry) => entry.id);
    expect(new Set(ids).size).toBe(ids.length);
  });
});
