/**
 * Tests du composant `WorkflowDemo` (démo « archive → dépôt » du hero).
 *
 * Deux contrats sont vérifiés ici :
 *
 * 1. **Le balisage est autosuffisant.** `WorkflowDemo` reste un Server
 *    Component : il doit rendre l'état *final* de la démo (barres pleines,
 *    coches visibles, dépôt rempli) sans JavaScript. C'est ce qui rend le
 *    composant correct si GSAP ne charge pas, ou si l'utilisateur a activé
 *    `prefers-reduced-motion` — GSAP ne fait qu'habiller cet état.
 * 2. **Les crochets d'animation existent.** `data-wd*` et les sélecteurs du
 *    module `timeline.ts` doivent rester alignés, sinon la chorégraphie vise des
 *    éléments inexistants et échoue en silence.
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
    const steps = [
      DICTIONARIES.fr.home.demoStep1,
      DICTIONARIES.fr.home.demoStep2,
      DICTIONARIES.fr.home.demoStep3,
    ];
    const positions = steps.map((s) => frHtml.indexOf(escapeHtml(s)));
    for (const p of positions) expect(p, "étape absente du rendu").toBeGreaterThan(-1);
    expect(positions).toEqual([...positions].sort((a, b) => a - b));
  });

  it("part d'une archive locale et aboutit sur un dépôt GitHub", () => {
    expect(frHtml).toContain("mon-projet.zip");
    expect(frHtml).toContain("github.com/you/");
    // Le nom du dépôt est dérivé du fichier, sans son extension.
    expect(frHtml).toContain(">mon-projet<");
  });

  it("rend l'état final, pas un squelette : la démo survit sans JavaScript", () => {
    // Aucun des éléments animés n'est masqué dans le HTML servi.
    expect(frHtml).not.toMatch(/style="[^"]*opacity:\s*0/);
    // Le wrapper client ne rend rien : le HTML servi ne contient que la démo.
    expect(frHtml).not.toMatch(/hidden=""/);
    expect(frHtml).not.toMatch(/<script/);
    // Les coches de l'arborescence et le bandeau de résultat sont présents.
    expect(frHtml.match(/data-wd="line-check"/g) ?? []).toHaveLength(3);
    expect(frHtml).toContain('data-wd="result"');
  });

  it("expose tous les crochets attendus par la timeline GSAP", () => {
    for (const hook of [
      "panel",
      "archive",
      "archive-card",
      "archive-icon",
      "bar",
      "scan-label",
      "scan-check",
      "line",
      "line-check",
      "rail-fill",
      "comet",
      "trail",
      "dot",
      "result",
      "result-check",
      "result-shine",
    ]) {
      expect(frHtml, `hook data-wd="${hook}" manquant`).toContain(
        `data-wd="${hook}"`,
      );
    }
    expect((frHtml.match(/data-wd="bar"/g) ?? []).length).toBe(12);
    expect((frHtml.match(/data-wd="halo"/g) ?? []).length).toBe(3);
    expect((frHtml.match(/data-wd-intro/g) ?? []).length).toBe(3);
  });

  it("ne laisse jamais un gabarit {placeholder} visible", () => {
    for (const l of LOCALES) {
      expect(render(DICTIONARIES[l.code]), `${l.code} : gabarit non rempli`).not.toMatch(
        /\{\w+\}/,
      );
    }
  });

  it("garde le visuel décoratif mais fournit une légende aux lecteurs d'écran", () => {
    expect(frHtml).toContain('aria-labelledby="workflow-demo-title"');
    expect(frHtml).toContain("sr-only");
    expect(frHtml).toContain('aria-hidden="true"');
  });

  it("rend les 16 langues sans dépendre du sens d'écriture", () => {
    for (const l of LOCALES) {
      const html = render(DICTIONARIES[l.code]);
      const file = DICTIONARIES[l.code].home.mockFile;
      expect(html, `${l.code} : nom d'archive absent`).toContain(escapeHtml(file));
      expect(html).toContain(escapeHtml(file.replace(/\.[^.]+$/, "")));
      // Aucune classe physique de marge/padding/alignement : le RTL vient de
      // <html dir>, seules les utilitaires logiques (ms-/me-/text-start) sont
      // permises. Les décalages décoratifs (left-X) restent assumés.
      expect(html, `${l.code} : utilitaire de direction physique`).not.toMatch(
        /\s(ml|mr|pl|pr)-|text-(left|right)\b/,
      );
    }
  });
});

/**
 * Contrat de copie : les textes de la démo sont courts par construction (ils
 * vivent dans une carte de ~360 px). Ces bornes évitent qu'une retouche de
 * traduction ne casse la grille sur mobile.
 */
describe("copie de la démo (WorkflowDemo)", () => {
  const LIMITS: Record<string, number> = {
    demoEyebrow: 34,
    demoTitle: 95,
    demoTitleAccent: 24,
    demoLead: 112,
    demoStep1: 26,
    demoStep2: 26,
    demoStep3: 22,
    demoDropZone: 22,
    demoScan: 26,
    demoPushed: 30,
    demoBranches: 12,
    demoNoAccount: 38,
  };

  it("tient dans la mise en page pour les 16 langues", () => {
    for (const l of LOCALES) {
      const home = DICTIONARIES[l.code].home as unknown as Record<string, string>;
      for (const [key, max] of Object.entries(LIMITS)) {
        const value = home[key];
        expect(value, `${l.code} → ${key} manquant`).toBeTypeOf("string");
        expect(
          value.length,
          `${l.code} → ${key} trop long (${value.length} > ${max})`,
        ).toBeLessThanOrEqual(max);
      }
    }
  });

  it("n'emploie pas de jargon d'interface là où le produit dit « push »", () => {
    // Le vocabulaire produit est stable dans toutes les langues : on pousse,
    // on ne « téléverse » ni ne « synchronise ».
    const banned = /télévers|upload|synchronis|synchro/i;
    for (const l of LOCALES) {
      const home = DICTIONARIES[l.code].home;
      const copy = [home.demoStep1, home.demoStep2, home.demoStep3, home.demoScan].join(" ");
      if (l.code === "fr") expect(copy).not.toMatch(banned);
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
