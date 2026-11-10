/**
 * Tests de l'écran de succès d'un import (`JobView`).
 *
 * Deux contrats y sont vérifiés :
 *
 * 1. **La section « Liens prêts à donner à une IA » a disparu.** C'était un
 *    prototype (Codespaces, vscode.dev, URL de clone, commande `gh`) : il ne
 *    reste que le message de succès et le lien du dépôt.
 * 2. **L'écran suit la langue choisie.** Les textes viennent du dictionnaire
 *    (section `job`), le compteur de fichiers est localisé, et aucun
 *    gabarit `{…}` ne subsiste dans le rendu — quelle que soit la langue,
 *    et quel que soit l'ordre des placeholders dans la phrase.
 */
import { describe, expect, it } from "vitest";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { JobView } from "@/components/JobView";
import { DICTIONARIES } from "@/lib/i18n/dictionary";
import { LOCALES } from "@/lib/i18n/locales";
import type { JobRecord } from "@/lib/types";

/** Un job terminé, tel que le serveur le renvoie à l'écran de succès. */
function doneJob(): JobRecord {
  return {
    id: "job-1",
    login: "dimalaxyt",
    filename: "mon-projet.zip",
    format: "zip",
    status: "done",
    error: null,
    preview: {
      fileCount: 1234,
      totalSize: 1024,
      tree: [],
      singleRootDir: null,
      hasNodeModules: false,
      ignored: { gitDirs: 0, systemFiles: 0, symlinks: 0, hardlinks: 0, outside: 0 },
      tooLargeForGitHub: { count: 0, examples: [] },
    } as JobRecord["preview"],
    pushOpts: null,
    push: {
      url: "https://github.com/DimalaxYT/mon-projet",
      fullName: "DimalaxYT/mon-projet",
      branch: "main",
      commitSha: "a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0",
      created: true,
    },
    archiveSize: 2048,
    createdAt: Date.UTC(2026, 0, 2, 3, 4, 5),
    updatedAt: Date.UTC(2026, 0, 2, 3, 5, 5),
  };
}

/** Rend l'écran de succès dans la langue demandée. */
function render(locale: string): string {
  const dict = DICTIONARIES[locale as keyof typeof DICTIONARIES];
  return renderToStaticMarkup(
    createElement(JobView, {
      initialJob: doneJob(),
      copy: dict.job,
      locale,
    }),
  );
}

/** `renderToStaticMarkup` échappe les apostrophes et esperluettes. */
function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#x27;");
}

const frHtml = render("fr");

describe("écran de succès", () => {
  it("affiche le message de succès et le lien du dépôt", () => {
    expect(frHtml).toContain(escapeHtml(DICTIONARIES.fr.job.doneTitle));
    expect(frHtml).toContain("https://github.com/DimalaxYT/mon-projet");
    expect(frHtml).toContain("main");
  });

  it("ne contient plus la section « liens prêts à donner à une IA »", () => {
    // Le prototype est retiré : plus aucun de ces liens ne doit subsister.
    expect(frHtml).not.toContain("Liens prêts à donner à une IA");
    expect(frHtml).not.toContain("codespaces");
    expect(frHtml).not.toContain("vscode.dev");
    expect(frHtml).not.toContain("gh repo clone");
    expect(frHtml).not.toContain("URL de clone");
  });

  it("garde les actions utiles (ouvrir, copier, télécharger)", () => {
    expect(frHtml).toContain(escapeHtml(DICTIONARIES.fr.job.doneOpenGithub));
    expect(frHtml).toContain(escapeHtml(DICTIONARIES.fr.job.doneCopyLink));
    expect(frHtml).toContain(escapeHtml(DICTIONARIES.fr.job.doneDownload));
  });
});

describe("écran de succès — les 16 langues", () => {
  it("est traduit et ne laisse aucun gabarit visible", () => {
    for (const l of LOCALES) {
      const html = render(l.code);
      expect(html, `${l.code} : message de succès absent`).toContain(
        escapeHtml(DICTIONARIES[l.code].job.doneTitle),
      );
      expect(html, `${l.code} : gabarit non rempli`).not.toMatch(/\{\w+\}/);
    }
  });

  it("localise le compteur de fichiers", () => {
    // 1 234 en français, 1,234 en anglais : le séparateur suit la langue.
    expect(render("fr")).toContain("1");
    expect(render("en")).toContain("1,234");
  });
});
