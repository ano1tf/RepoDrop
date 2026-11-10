/**
 * Test d'intégration du layout racine : **une page, une seule langue**.
 *
 * C'est le test de non-régression du bug « contenu en français, en-tête en
 * anglais ». Il rend l'arbre complet (`RootLayout` + `Home`) tel que Next le
 * sert, et vérifie que `<html lang>`, la navigation, le corps de la page et le
 * pied de page parlent tous la même langue.
 *
 * La langue est choisie exactement comme en production : l'en-tête `x-rd-lang`
 * posé par le middleware (voir `lib/i18n/server.ts`).
 */
import { describe, expect, it, vi } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";
import { DICTIONARIES } from "@/lib/i18n/dictionary";
import type { Locale } from "@/lib/i18n/locales";

/** Langue transmise par le middleware à chaque rendu. */
const state = vi.hoisted(() => ({ lang: "fr" }));

vi.mock("next/headers", () => ({
  headers: async () => new Headers({ "x-rd-lang": state.lang }),
  // Visiteur anonyme : aucun cookie de session.
  cookies: async () => ({ get: () => undefined }),
}));

/**
 * Hors requête Next, il n'y a pas de routeur monté : `SecretDoor` (pied de
 * page, client) appelle `useRouter()` et exigerait sinon un contexte App
 * Router. On fournit un routeur inerte — rien de ce qu'il fait n'est testé ici.
 */
vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push: () => {},
    replace: () => {},
    refresh: () => {},
    prefetch: () => {},
    back: () => {},
    forward: () => {},
  }),
  usePathname: () => "/",
  useSearchParams: () => new URLSearchParams(),
}));

/** Rend la landing *dans son layout* (en-tête + corps + pied de page). */
async function renderLanding(locale: Locale): Promise<string> {
  state.lang = locale;
  const [{ default: RootLayout }, { default: Home }] = await Promise.all([
    import("@/app/layout"),
    import("@/app/page"),
  ]);
  const tree = await RootLayout({ children: await Home() });
  return renderToStaticMarkup(tree as Parameters<typeof renderToStaticMarkup>[0]);
}

const fr = DICTIONARIES.fr;
const en = DICTIONARIES.en;

describe("layout racine — cohérence de langue", () => {
  it("rend en français l'en-tête, le corps et le pied de page ensemble", async () => {
    const html = await renderLanding("fr");

    expect(html).toContain('<html lang="fr"');
    // En-tête
    expect(html).toContain(fr.nav.howItWorks);
    expect(html).toContain(fr.nav.login);
    // Corps
    expect(html).toContain(fr.home.heroTitleLine1);
    // Pied de page
    expect(html).toContain(fr.footer.home);

    // Aucune trace de la version anglaise de la navigation.
    expect(html).not.toContain(en.nav.howItWorks);
    expect(html).not.toContain(en.nav.login);
    expect(html).not.toContain(en.nav.start);
  });

  it("rend en anglais l'en-tête, le corps et le pied de page ensemble", async () => {
    const html = await renderLanding("en");

    expect(html).toContain('<html lang="en"');
    expect(html).toContain(en.nav.howItWorks);
    expect(html).toContain(en.nav.login);
    expect(html).toContain(en.home.heroTitleLine1);
    expect(html).toContain(en.footer.home);

    expect(html).not.toContain(fr.nav.howItWorks);
    expect(html).not.toContain(fr.nav.login);
    expect(html).not.toContain(fr.home.heroTitleLine1);
  });

  it("n'a qu'un seul <html lang> et il correspond à la langue rendue", async () => {
    for (const locale of ["fr", "en", "de", "ja"] as const) {
      state.lang = locale;
      const html = await renderLanding(locale);
      const langs = [...html.matchAll(/<html lang="([a-z]{2})"/g)].map((m) => m[1]);
      expect(langs).toEqual([locale]);
      // L'en-tête de cette langue est bien présent.
      expect(html).toContain(DICTIONARIES[locale].nav.howItWorks);
    }
  });
});
