import { describe, it, expect, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import ChatFlottant from "./ChatFlottant";

function renderAssistant(pathname = "/") {
  return render(
    <MemoryRouter initialEntries={[pathname]}>
      <ChatFlottant />
    </MemoryRouter>,
  );
}

describe("ChatFlottant", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("renders the floating button closed by default", () => {
    renderAssistant();
    expect(screen.getByRole("button", { name: "Ouvrir l'assistant" })).toBeInTheDocument();
  });

  it("opens the panel and shows page-specific suggestions", () => {
    renderAssistant("/classement");
    fireEvent.click(screen.getByRole("button", { name: "Ouvrir l'assistant" }));
    expect(screen.getByText("Comment puis-je vous aider ?")).toBeInTheDocument();
    expect(screen.getByText("Comment est calculé le classement ?")).toBeInTheDocument();
  });

  it("switches the assistant language to wolof", () => {
    renderAssistant();
    fireEvent.click(screen.getByRole("button", { name: "Ouvrir l'assistant" }));
    fireEvent.click(screen.getByRole("button", { name: "Passer en wolof" }));
    expect(screen.getByText("Naka laa la mën a jàppale ?")).toBeInTheDocument();
  });
});
