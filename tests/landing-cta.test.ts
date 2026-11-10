/**
 * Tests du CTA « Importer une archive » de la landing, et de la frontière
 * d'authentification.
 *
 * Règle produit (et non « redirect to /login » systématique) :
 *
 *   - **visiteur anonyme sur `/`** : le CTA ouvre le sélecteur de fichiers de
 *     la démo (`TryDemoButton`) — il peut déposer, voir l'aperçu, et c'est le
 *     bouton « Pousser sur GitHub » qui ouvre la modale « Connect GitHub ».
 *     Aucun mur de connexion sur la page vitrine ;
 *   - **utilisateur connecté sur `/`** : le CTA est un `<Link href="/import">`
 *     (aucun JavaScript requis) ;
 *   - **`/import`** : protégé dans tous les cas — sans session, redirection
 *     vers `/login`.
 */
import { beforeEach, describe, expect, it, vi } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";
import { DICTIONARIES } from "@/lib/i18n/dictionary";
import type { SessionData } from "@/lib/session";

/* --------------------------------------------------------------- mocks --- */

const state = vi.hoisted(() => ({
  session: null as SessionData | null,
  getViewer: vi.fn(async (_token: string) => ({ login: "dimalaxyt", id: 1 })),
}));

vi.mock("@/lib/session", () => ({
  getSession: async () => state.session,
}));

vi.mock("@/lib/github", () => ({
  getViewer: state.getViewer,
}));

vi.mock("next/headers", () => ({
  headers: async () => new Headers({ "x-rd-lang": "fr" }),
  cookies: async () => ({ get: () => undefined }),
}));

/** `redirect()` de Next lève une erreur que le framework intercepte. */
vi.mock("next/navigation", () => ({
  redirect: (path: string) => {
    throw Object.assign(new Error(`NEXT_REDIRECT ${path}`), { redirect: path });
  },
  useRouter: () => ({ push: () => {}, replace: () => {}, refresh: () => {} }),
}));

const SESSION: SessionData = {
  login: "dimalaxyt",
  name: "Dima",
  avatar: "",
  token: "gho_test",
};

const fr = DICTIONARIES.fr;

async function renderHome(): Promise<string> {
  const { default: Home } = await import("@/app/page");
  return renderToStaticMarkup(
    (await Home()) as Parameters<typeof renderToStaticMarkup>[0],
  );
}

beforeEach(() => {
  state.session = null;
  state.getViewer.mockClear();
  state.getViewer.mockResolvedValue({ login: "dimalaxyt", id: 1 });
});

/* ---------------------------------------------------------------- tests --- */

describe("landing — CTA selon la session", () => {
  it("visiteur : le CTA ouvre la démo, il ne mène pas à /login", async () => {
    const html = await renderHome();

    // Le CTA est le bouton-pont vers le sélecteur de la démo…
    expect(html).toContain("data-rd-demo-pick");
    expect(html).toContain(fr.home.ctaImport);
    // …et la landing ne contient aucun lien de connexion : le visiteur peut
    // déposer une archive et voir l'aperçu avant toute authentification.
    expect(html).not.toContain('href="/login"');
    // La zone de dépôt de la démo est bien là (l'essai est possible).
    expect(html).toContain('data-wd="archive-card"');
    expect(html).toContain('type="file"');
  });

  it("visiteur : le CTA n'est pas un lien (pas de navigation immédiate)", async () => {
    const html = await renderHome();
    const pick = /<button[^>]*data-rd-demo-pick[^>]*>/.exec(html)?.[0] ?? "";
    expect(pick).toContain('type="button"');
    expect(pick).not.toContain("href=");
  });

  it("utilisateur connecté : le CTA mène directement à /import", async () => {
    state.session = SESSION;
    const html = await renderHome();

    expect(html).toContain('href="/import"');
    // Plus de pont vers la démo : il n'a rien à « essayer ».
    expect(html).not.toContain("data-rd-demo-pick");
  });
});

describe("/import — authentification obligatoire", () => {
  it("redirige un visiteur anonyme vers /login", async () => {
    const { default: ImportPage } = await import("@/app/import/page");
    await expect(ImportPage()).rejects.toMatchObject({ redirect: "/login" });
  });

  it("affiche la zone de dépôt à un utilisateur connecté", async () => {
    state.session = SESSION;
    const { default: ImportPage } = await import("@/app/import/page");
    const html = renderToStaticMarkup(
      (await ImportPage()) as Parameters<typeof renderToStaticMarkup>[0],
    );
    expect(html).toContain(fr.uploader.dropHint);
    expect(state.getViewer).toHaveBeenCalledWith(SESSION.token);
  });
});
