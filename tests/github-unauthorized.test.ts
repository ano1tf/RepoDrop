/**
 * Tests du jeton GitHub expiré/révoqué (HTTP 401).
 *
 * Un 401 n'est pas un problème de droits — c'est une session morte : aucune
 * relance, aucun réglage de dépôt ne peut la ranimer, il faut se reconnecter.
 * Le client GitHub doit donc lever `UNAUTHORIZED` (et non `FORBIDDEN`, qui
 * affichait « Vous n'avez pas les droits d'écriture… »).
 */
import { afterEach, describe, expect, it, vi } from "vitest";
import { ghRaw, getViewer, listRepos, type FetchImpl } from "@/lib/github";
import { AppError, frMessage, isUnauthorizedError, toUserMessage } from "@/lib/errors";

/** Fausse API : répond toujours `status` avec un corps JSON. */
function fakeFetch(status: number, body: unknown = { message: "Bad credentials" }) {
  const calls: string[] = [];
  const impl = (async (input: string | URL | Request) => {
    calls.push(String(input));
    return new Response(JSON.stringify(body), {
      status,
      headers: { "Content-Type": "application/json" },
    });
  }) as unknown as FetchImpl;
  return { impl, calls };
}

afterEach(() => {
  vi.unstubAllGlobals();
});

describe("ghRaw face à un jeton refusé", () => {
  it("un 401 devient UNAUTHORIZED, jamais FORBIDDEN", async () => {
    const { impl } = fakeFetch(401);
    const err = await ghRaw("gho_expire", "/user", { method: "GET" }, impl).catch(
      (e: unknown) => e,
    );

    expect(err).toBeInstanceOf(AppError);
    expect((err as AppError).code).toBe("UNAUTHORIZED");
    expect((err as AppError).code).not.toBe("FORBIDDEN");
  });

  it("getViewer relaie le UNAUTHORIZED (validation du jeton à l'entrée)", async () => {
    vi.stubGlobal("fetch", fakeFetch(401).impl);
    await expect(getViewer("gho_revoque")).rejects.toMatchObject({
      name: "AppError",
      code: "UNAUTHORIZED",
    });
  });

  it("listRepos aussi : le code n'est pas propre à une seule route", async () => {
    vi.stubGlobal("fetch", fakeFetch(401).impl);
    await expect(listRepos("gho_revoque")).rejects.toMatchObject({
      code: "UNAUTHORIZED",
    });
  });
});

describe("message utilisateur", () => {
  it("porte la consigne de reconnexion, sans jargon technique", () => {
    const err = new AppError("UNAUTHORIZED");
    expect(frMessage("UNAUTHORIZED")).toBe(
      "Votre session GitHub a expiré ou a été révoquée. Déconnectez-vous puis reconnectez-vous pour continuer.",
    );
    // Aucun détail n'est ajouté : le message affiché est exactement la phrase.
    expect(toUserMessage(err)).toBe(frMessage("UNAUTHORIZED"));
  });

  it("isUnauthorizedError reconnaît la phrase ET l'ancien message « 401 »", () => {
    expect(isUnauthorizedError(frMessage("UNAUTHORIZED"))).toBe(true);
    // Messages déjà en base avant ce correctif (401 mappé en FORBIDDEN).
    expect(
      isUnauthorizedError("Vous n'avez pas les droits… (401 token invalide)"),
    ).toBe(true);
    // Un vrai refus de droits ne doit pas déclencher « Se reconnecter ».
    expect(isUnauthorizedError(frMessage("FORBIDDEN"))).toBe(false);
    expect(isUnauthorizedError(null)).toBe(false);
  });
});
