/**
 * Tests du middleware i18n et de la résolution de langue.
 *
 * Le contrat vérifié ici est simple mais essentiel : **la langue doit être
 * la même partout**. Le middleware la résout une fois pour toutes (cookie,
 * sinon `Accept-Language`), la transmet au rendu via l'en-tête `x-rd-lang`,
 * et la persiste dans le cookie pour qu'elle survive aux navigations.
 */
import { describe, expect, it } from "vitest";
import { NextRequest } from "next/server";
import { middleware } from "@/middleware";
import {
  DEFAULT_LOCALE,
  LOCALE_COOKIE,
  LOCALE_HEADER,
  resolveLocale,
} from "@/lib/i18n/locales";

/** Construit une requête avec un cookie de langue éventuellement présent. */
function request(
  opts: { cookie?: string; acceptLanguage?: string; url?: string } = {},
): NextRequest {
  const headers = new Headers();
  if (opts.acceptLanguage) headers.set("accept-language", opts.acceptLanguage);
  if (opts.cookie) headers.set("cookie", `${LOCALE_COOKIE}=${opts.cookie}`);

  return new NextRequest(opts.url ?? "http://localhost/", { headers });
}

/** Langue transmise au rendu serveur par le middleware. */
function forwardedLocale(res: Response): string | null {
  return res.headers.get(`x-middleware-request-${LOCALE_HEADER}`);
}

describe("resolveLocale", () => {
  it("donne la priorité au cookie (choix explicite)", () => {
    expect(resolveLocale("en", "de-DE,de;q=0.9")).toBe("en");
  });

  it("replie sur Accept-Language quand le cookie est absent", () => {
    expect(resolveLocale(null, "de-AT,de;q=0.9")).toBe("de");
    expect(resolveLocale(undefined, "ja")).toBe("ja");
  });

  it("ignore un cookie invalide", () => {
    expect(resolveLocale("klingon", "it")).toBe("it");
  });

  it("retombe sur le français sans aucune indication", () => {
    expect(resolveLocale(null, null)).toBe(DEFAULT_LOCALE);
  });
});

describe("middleware i18n", () => {
  it("transmet la langue résolue au rendu serveur", () => {
    const res = middleware(request({ acceptLanguage: "ja-JP,ja;q=0.9" }));
    expect(forwardedLocale(res)).toBe("ja");
  });

  it("respecte le choix explicite de l'utilisateur", () => {
    const res = middleware(request({ cookie: "es", acceptLanguage: "fr-FR" }));
    expect(forwardedLocale(res)).toBe("es");
  });

  it("pose le cookie à la première visite (langue détectée)", () => {
    const res = middleware(request({ acceptLanguage: "pt-BR" }));
    expect(res.cookies.get(LOCALE_COOKIE)?.value).toBe("pt");
  });

  it("ne réécrit pas un cookie déjà valide", () => {
    const res = middleware(request({ cookie: "ko", acceptLanguage: "fr" }));
    expect(res.cookies.get(LOCALE_COOKIE)).toBeUndefined();
    expect(forwardedLocale(res)).toBe("ko");
  });

  it("remplace un cookie corrompu", () => {
    const res = middleware(request({ cookie: "klingon", acceptLanguage: "nl" }));
    expect(res.cookies.get(LOCALE_COOKIE)?.value).toBe("nl");
  });

  it("retombe sur le français quand le navigateur ne dit rien", () => {
    const res = middleware(request());
    expect(forwardedLocale(res)).toBe(DEFAULT_LOCALE);
    expect(res.cookies.get(LOCALE_COOKIE)?.value).toBe(DEFAULT_LOCALE);
  });

  it("n'a pas de cas particulier pour une Server Action (la bascule passe par /api/locale)", () => {
    // La bascule de langue étant un aller-retour document vers `/api/locale`,
    // le middleware pose le cookie dans tous les cas où il manque ou est
    // invalide — il n'y a plus d'écriture concurrente à craindre.
    const req = new NextRequest("http://localhost/", {
      headers: { "accept-language": "fr-FR", "next-action": "abc123" },
    });
    const res = middleware(req);
    expect(res.cookies.get(LOCALE_COOKIE)?.value).toBe(DEFAULT_LOCALE);
    expect(forwardedLocale(res)).toBe(DEFAULT_LOCALE);
  });
});
