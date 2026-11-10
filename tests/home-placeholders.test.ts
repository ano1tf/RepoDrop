/**
 * Tests de rendu de la landing (`app/page.tsx`).
 *
 * Contrat vérifié : **aucun gabarit `{…}` ne doit atteindre le navigateur**.
 *
 * Les dictionnaires ne contiennent pas de fonctions : les phrases qui varient
 * (limites, compteurs) portent des accolades — `"jusqu'à {upload}"`. Le rendu
 * doit les remplir avec `fill()`, sinon le visiteur lit littéralement
 * « jusqu'à {upload} compressés ». Le bug est invisible en test unitaire de
 * dictionnaire (la chaîne est correcte) : il ne se voit qu'au rendu.
 *
 * Le test couvre :
 *   1. le HTML des deux langues demandées (fr, en) — aucun `{placeholder}` ;
 *   2. les valeurs réellement injectées (limites de `config`, formatées) ;
 *   3. les données structurées JSON-LD : la réponse FAQ y est remplie aussi,
 *      sinon Google indexe le gabarit brut.
 *
 * La page est un Server Component asynchrone : on l'exécute (`await Home()`)
 * puis on rend l'arbre obtenu, en simulant `next/headers` pour choisir la
 * langue (cookie/en-tête) comme le ferait le middleware.
 */
import { describe, expect, it, vi } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";
import { DICTIONARIES } from "@/lib/i18n/dictionary";
import { formatBytes, formatNumber } from "@/lib/i18n/format";
import { LOCALES, type Locale } from "@/lib/i18n/locales";
import { config } from "@/lib/config";

/**
 * Langue lue par les `headers()` simulés.
 * `vi.hoisted` est indispensable : la fabrique de `vi.mock` est hissée avant
 * les déclarations du module (sinon « cannot access before initialization »).
 */
const state = vi.hoisted(() => ({ lang: "fr" }));

vi.mock("next/headers", () => ({
  headers: async () => new Headers({ "x-rd-lang": state.lang }),
  // Aucune session : la landing doit se rendre pour un visiteur anonyme.
  cookies: async () => ({ get: () => undefined }),
}));

/** Rend la landing dans la langue demandée et renvoie le HTML. */
async function renderHome(locale: Locale): Promise<string> {
  state.lang = locale;
  const { default: Home } = await import("@/app/page");
  const element = await Home();
  return renderToStaticMarkup(element as Parameters<typeof renderToStaticMarkup>[0]);
}

/** `renderToStaticMarkup` échappe apostrophes, guillemets et esperluettes. */
function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#x27;");
}

/** Valeurs attendues, calculées avec les mêmes helpers que la page. */
function expectedValues(locale: Locale) {
  return {
    upload: formatBytes(config.limits.maxUploadBytes, locale),
    extract: formatBytes(config.limits.maxExtractBytes, locale),
    files: formatNumber(config.limits.maxFiles, locale),
  };
}

const PLACEHOLDER = /\{[a-zA-Z]+\}/;

describe("landing : gabarits i18n remplis", () => {
  it("ne rend aucun placeholder en français", async () => {
    const html = await renderHome("fr");
    expect(html.match(PLACEHOLDER)).toBeNull();
  });

  it("ne rend aucun placeholder en anglais", async () => {
    const html = await renderHome("en");
    expect(html.match(PLACEHOLDER)).toBeNull();
  });

  it("remplit les trois gabarits avec les limites de la configuration", async () => {
    for (const locale of ["fr", "en"] as const) {
      const html = await renderHome(locale);
      const dict = DICTIONARIES[locale];
      const values = expectedValues(locale);

      // Les valeurs sont bien celles du serveur (et localisées).
      expect(values.upload).not.toMatch(PLACEHOLDER);
      expect(values.files).not.toMatch(PLACEHOLDER);

      for (const template of [
        dict.home.guard2Body,
        dict.home.limitsNote,
        dict.faq.a2,
      ]) {
        const filled = template.replace(/\{(\w+)\}/g, (_m, k: keyof typeof values) =>
          String(values[k] ?? ""),
        );
        expect(html, `${locale} : gabarit non rempli → ${template}`).toContain(
          escapeHtml(filled),
        );
      }
    }
  });

  it("remplit aussi la réponse FAQ des données structurées JSON-LD", async () => {
    for (const locale of ["fr", "en"] as const) {
      const html = await renderHome(locale);
      const raw = /<script type="application\/ld\+json">([\s\S]*?)<\/script>/.exec(html);
      expect(raw, `${locale} : JSON-LD absent`).not.toBeNull();

      const jsonLd = raw?.[1] ?? "";
      expect(jsonLd).not.toMatch(PLACEHOLDER);

      const data = JSON.parse(jsonLd) as {
        "@graph": { "@type": string; mainEntity?: { acceptedAnswer: { text: string } }[] }[];
      };
      const faq = data["@graph"].find((n) => n["@type"] === "FAQPage");
      expect(faq, `${locale} : FAQPage absente du JSON-LD`).toBeTruthy();

      const answers = (faq?.mainEntity ?? []).map((q) => q.acceptedAnswer.text).join(" ");
      expect(answers).toContain(expectedValues(locale).upload);
      expect(answers).toContain(expectedValues(locale).files);
    }
  });

  it("tient pour les 16 langues du catalogue", async () => {
    for (const l of LOCALES) {
      const html = await renderHome(l.code);
      expect(html.match(PLACEHOLDER), `${l.code} : placeholder visible`).toBeNull();
    }
  });
});
