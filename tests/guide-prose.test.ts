import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { GuideProse } from "@/components/GuideProse";

function render(text: string) {
  return renderToStaticMarkup(createElement(GuideProse, { text }));
}

describe("mise en forme des guides", () => {
  it("affiche les chemins en monospace et les précautions en gras", () => {
    const html = render("Retirez `.env` et **vérifiez l’aperçu**.");
    expect(html).toMatch(/<code dir="ltr"[^>]*>\.env<\/code>/);
    expect(html).toMatch(/<strong[^>]*>vérifiez l’aperçu<\/strong>/);
    expect(html).not.toMatch(/`|\*\*/);
  });

  it("garde les caractères HTML comme du texte, dans et hors des chemins", () => {
    expect(render("Nom: `<file>` & dossier")).toContain("&lt;file&gt;</code> &amp; dossier");
    expect(render("Entrée <archive>")).toBe("Entrée &lt;archive&gt;");
  });
});
