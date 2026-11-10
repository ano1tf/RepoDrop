/**
 * Tests du parcours « jeton GitHub expiré ».
 *
 * Deux écrans doivent réagir, et différemment :
 *
 *   1. `JobView` (état d'échec) : un job tombé en 401 affiche un CTA primaire
 *      « Se reconnecter » vers `/api/auth/login` — et non « Réessayer » qui
 *      échouerait à l'identique. Un échec banal (archive corrompue) ne doit
 *      PAS afficher ce CTA.
 *   2. `/import` : la page valide le jeton **avant** d'afficher la zone de
 *      dépôt. S'il est refusé, elle redirige vers `/logout` (purge du cookie),
 *      qui relance l'autorisation GitHub. Une panne réseau, elle, ne doit pas
 *      déconnecter l'utilisateur.
 */
import { beforeEach, describe, expect, it, vi } from "vitest";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { DICTIONARIES } from "@/lib/i18n/dictionary";
import { AppError, frMessage } from "@/lib/errors";
import type { JobRecord } from "@/lib/types";

/* --------------------------------------------------------------- mocks --- */

/** `getViewer` piloté par chaque test (comportement du client GitHub). */
const gh = vi.hoisted(() => ({
  getViewer: vi.fn<(token: string) => Promise<unknown>>(),
}));

vi.mock("@/lib/github", () => ({ getViewer: gh.getViewer }));

/** Session toujours présente : le cookie existe, c'est le jeton qui est mort. */
vi.mock("@/lib/session", () => ({
  getSession: async () => ({
    login: "dimalaxyt",
    name: "Dima",
    avatar: "",
    token: "gho_expire",
  }),
}));

vi.mock("next/headers", () => ({
  headers: async () => new Headers({ "x-rd-lang": "fr" }),
  cookies: async () => ({ get: () => undefined }),
}));

/**
 * `next/navigation` hors requête Next : `redirect()` lève——comme le vrai——une
 * erreur que le framework intercepte. On la marque pour l'identifier.
 */
vi.mock("next/navigation", () => ({
  redirect: (path: string) => {
    throw Object.assign(new Error(`NEXT_REDIRECT ${path}`), { redirect: path });
  },
  useRouter: () => ({ push: () => {}, replace: () => {}, refresh: () => {} }),
  usePathname: () => "/import",
}));

/* ------------------------------------------------------------- fabriques --- */

/** Un job en échec, tel que le serveur le renvoie (statut + message FR). */
function failedJob(error: string): JobRecord {
  return {
    id: "job-401",
    login: "dimalaxyt",
    filename: "mon-projet.zip",
    format: "zip",
    status: "failed",
    error,
    preview: null,
    pushOpts: null,
    push: null,
    archiveSize: 2048,
    createdAt: Date.UTC(2026, 0, 2, 3, 4, 5),
    updatedAt: Date.UTC(2026, 0, 2, 3, 5, 5),
  };
}

async function renderFailed(error: string): Promise<string> {
  const { JobView } = await import("@/components/JobView");
  return renderToStaticMarkup(
    createElement(JobView, {
      initialJob: failedJob(error),
      copy: DICTIONARIES.fr.job,
      locale: "fr",
    }) as Parameters<typeof renderToStaticMarkup>[0],
  );
}

beforeEach(() => {
  gh.getViewer.mockReset();
});

/* ---------------------------------------------------------------- tests --- */

describe("JobView — session GitHub expirée", () => {
  it("propose « Se reconnecter » vers /api/auth/login (CTA primaire)", async () => {
    const html = await renderFailed(frMessage("UNAUTHORIZED"));

    expect(html).toContain("Se reconnecter");
    expect(html).toContain('href="/api/auth/login"');
    // Le message explique la cause, l'utilisateur n'a pas à la deviner.
    expect(html).toContain("session GitHub a expiré");
  });

  it("reconnaît aussi l'ancien message contenant « 401 »", async () => {
    const html = await renderFailed(
      "Vous n'avez pas les droits… (401 token invalide)",
    );
    expect(html).toContain('href="/api/auth/login"');
  });

  it("ne le propose pas pour un échec sans rapport (archive corrompue)", async () => {
    const html = await renderFailed(frMessage("CORRUPT"));
    expect(html).not.toContain('href="/api/auth/login"');
    expect(html).toContain("Réessayer avec une autre archive");
  });
});

describe("/import — validation du jeton avant l'upload", () => {
  it("redirige vers /logout quand GitHub répond 401", async () => {
    gh.getViewer.mockRejectedValue(new AppError("UNAUTHORIZED"));
    const { default: ImportPage } = await import("@/app/import/page");

    await expect(ImportPage()).rejects.toMatchObject({ redirect: "/logout" });
    expect(gh.getViewer).toHaveBeenCalledWith("gho_expire");
  });

  it("n'affiche pas la zone de dépôt quand le jeton est mort", async () => {
    gh.getViewer.mockRejectedValue(new AppError("UNAUTHORIZED"));
    const { default: ImportPage } = await import("@/app/import/page");
    const outcome = await ImportPage().then(
      () => "rendu",
      (e: { redirect?: string }) => e.redirect ?? "erreur",
    );
    expect(outcome).toBe("/logout");
  });

  it("laisse passer une panne réseau : on ne déconnecte pas pour rien", async () => {
    gh.getViewer.mockRejectedValue(new AppError("INTERNAL"));
    const { default: ImportPage } = await import("@/app/import/page");

    const html = renderToStaticMarkup(
      (await ImportPage()) as Parameters<typeof renderToStaticMarkup>[0],
    );
    expect(html).toContain(DICTIONARIES.fr.importPage.dropTitle);
  });

  it("affiche la zone de dépôt quand le jeton est valide", async () => {
    gh.getViewer.mockResolvedValue({ login: "dimalaxyt", id: 1 });
    const { default: ImportPage } = await import("@/app/import/page");

    const html = renderToStaticMarkup(
      (await ImportPage()) as Parameters<typeof renderToStaticMarkup>[0],
    );
    expect(html).toContain(DICTIONARIES.fr.uploader.dropHint);
  });
});
