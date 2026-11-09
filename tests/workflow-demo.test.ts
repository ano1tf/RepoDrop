/**
 * Tests du composant `WorkflowDemo` (démo « archive → dépôt » du hero).
 *
 * Ce sont des tests de **rendu serveur** : le composant est intentionnellement
 * un Server Component sans état ni effet, on peut donc l'aplatir en HTML avec
 * `renderToStaticMarkup` et vérifier ce que le visiteur reçoit réellement.
 *
 * On couvre ce qui casse silencieusement une landing page :
 *   - les 3 étapes, l'archive source et le dépôt cible sont présents ;
 *   - aucune valeur brute de dictionnaire (`{count}`) ne fuit à l'écran ;
 *   - le visuel reste décoratif pour les lecteurs d'écran, avec une légende ;
 *   - chaque étape porte sa propre animation (donc sa propre fenêtre du cycle) ;
 *   - le composant ne dépend pas de la langue : il rend les 16 dictionnaires.
 */
import { describe, expect, it } from "vitest";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { WorkflowDemo } from "@/components/WorkflowDemo";
import { DICTIONARIES } from "@/lib/i18n/dictionary";
import { LOCALES } from "@/lib/i18n/locales";
import type { Dict } from "@/lib/i18n/types";

function render(t: Dict): string {
  return renderToStaticMarkup(createElement(WorkflowDemo, { t }));
}

const frHtml = render(DICTIONARIES.fr);

describe("WorkflowDemo", () => {
  it("montre les trois étapes dans l'ordre", () => {
    const html = frHtml;
    const steps = [
      DICTIONARIES.fr.home.demoStep1,
      DICTIONARIES.fr.home.demoStep2,
      DICTIONARIES.fr.home.demoStep3,
    ];
    const positions = steps.map((s) => html.indexOf(escapeHtml(s)));
    for (const p of positions) expect(p, "étape absente du rendu").toBeGreaterThan(-1);
    expect(positions).toEqual([...positions].sort((a, b) => a - b));
  });

  it("part d'une archive locale et aboutit sur un dépôt GitHub", () => {
    expect(frHtml).toContain("mon-projet.zip");
    expect(frHtml).toContain("github.com/you/");
    // Le nom du dépôt est dérivé du fichier, sans son extension.
    expect(frHtml).toContain(">mon-projet<");
  });

  it("ne laisse jamais un gabarit {placeholder} visible", () => {
    for (const l of LOCALES) {
      const html = render(DICTIONARIES[l.code]);
      expect(html, `${l.code} : gabarit non rempli`).not.toMatch(/\{\w+\}/);
    }
  });

  it("garde le visuel décoratif mais fournit une légende aux lecteurs d'écran", () => {
    expect(frHtml).toContain('aria-labelledby="workflow-demo-title"');
    expect(frHtml).toContain("sr-only");
    // Les icônes décoratives ne doivent pas être annoncées.
    expect(frHtml).toContain('aria-hidden="true"');
  });

  it("anime chaque étape avec sa propre fenêtre du cycle partagé", () => {
    for (const cls of [
      "animate-demo-glow-1",
      "animate-demo-glow-2",
      "animate-demo-glow-3",
      "animate-demo-fill",
      "animate-demo-packet",
      "animate-demo-pop",
    ]) {
      expect(frHtml, `${cls} manquant`).toContain(cls);
    }
  });

  it("rend les 16 langues sans dépendre du sens d'écriture", () => {
    for (const l of LOCALES) {
      const html = render(DICTIONARIES[l.code]);
      const file = DICTIONARIES[l.code].home.mockFile;
      expect(html, `${l.code} : nom d'archive absent`).toContain(escapeHtml(file));
      // Le nom du dépôt reste dérivé du fichier, quelle que soit la langue.
      expect(html).toContain(escapeHtml(file.replace(/\.[^.]+$/, "")));
      // Aucune classe physique de marge/padding/alignement : le RTL vient de
      // <html dir>, et seules les utilitaires logiques (ms-/me-/text-start) sont
      // permises. Les décalages décoratifs (left-X) restent, eux, assumés.
      expect(html, `${l.code} : utilitaire de direction physique`).not.toMatch(
        /\s(ml|mr|pl|pr)-|text-(left|right)\b/,
      );
    }
  });
});

/** `renderToStaticMarkup` échappe les apostrophes et esperluettes. */
function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#x27;");
}
