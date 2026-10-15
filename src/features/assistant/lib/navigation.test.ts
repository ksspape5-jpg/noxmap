import { describe, it, expect } from "vitest";
import { PAGE_LABELS, quickLinksFor, suggestionsFor } from "./navigation";

describe("quickLinksFor", () => {
  it("suggests the reporting page for a signaler answer", () => {
    const links = quickLinksFor("Pour signaler une inondation, ouvrez la page Signaler.");
    expect(links.map((link) => link.to)).toContain("/signaler");
  });

  it("suggests the ranking page for a classement answer", () => {
    const links = quickLinksFor("Le classement affiche les quartiers les plus touchés.");
    expect(links.map((link) => link.to)).toContain("/classement");
  });

  it("caps the number of links", () => {
    const links = quickLinksFor("signalement carte classement projet");
    expect(links.length).toBeLessThanOrEqual(3);
  });
});

describe("suggestionsFor", () => {
  it("returns page specific suggestions", () => {
    expect(suggestionsFor("/classement").join(" ")).toContain("classement");
  });

  it("falls back to defaults for an unknown page", () => {
    expect(suggestionsFor("/inconnu").length).toBeGreaterThan(0);
  });

  it("covers every labelled page", () => {
    for (const pathname of Object.keys(PAGE_LABELS)) {
      expect(suggestionsFor(pathname).length).toBeGreaterThan(0);
    }
  });
});
