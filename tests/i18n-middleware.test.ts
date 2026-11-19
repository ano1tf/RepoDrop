import { describe, expect, it } from "vitest";
import { NextRequest } from "next/server";
import { middleware } from "@/middleware";
import {
  DEFAULT_LOCALE,
  EMBEDDED_LOCALE_COOKIE,
  LOCALE_COOKIE,
  LOCALE_HEADER,
  URL_LOCALE_HEADER,
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

  it("annonce la langue de la page via l'en-tête Content-Language", () => {
    // Source indépendante du `lang` du HTML : les crawlers qui n'analysent
    // pas le DOM peuvent s'y fier pour localiser la page.
    const res = middleware(request({ acceptLanguage: "de-DE,de;q=0.9" }));
    expect(res.headers.get("content-language")).toBe("de");

    const explicit = middleware(request({ cookie: "ar" }));
    expect(explicit.headers.get("content-language")).toBe("ar");
  });

  it("respecte le choix explicite de l'utilisateur", () => {
    const res = middleware(request({ cookie: "es", acceptLanguage: "fr-FR" }));
    expect(forwardedLocale(res)).toBe("es");
  });

  it("rend le choix URL malgré un cookie qui contient encore le français", () => {
    const res = middleware(request({ cookie: "fr", url: "http://localhost/a-propos?lang=ar" }));
    expect(forwardedLocale(res)).toBe("ar");
    expect(res.headers.get(`x-middleware-request-${URL_LOCALE_HEADER}`)).toBe("ar");
    expect(res.headers.get("content-language")).toBe("ar");
    expect(res.cookies.get(LOCALE_COOKIE)).toBeUndefined();
  });

  it("ne propage pas le paramètre quand le navigateur garde le cookie", () => {
    const res = middleware(request({ cookie: "ja", url: "http://localhost/langues?lang=ja" }));
    expect(forwardedLocale(res)).toBe("ja");
    expect(res.headers.get(`x-middleware-request-${URL_LOCALE_HEADER}`)).toBeNull();
  });

  it("lit le cookie partitionné quand le cookie de premier niveau est absent", () => {
    const req = new NextRequest("https://preview.e2b.app/a-propos", {
      headers: { cookie: `${EMBEDDED_LOCALE_COOKIE}=ja`, "accept-language": "fr" },
    });
    const res = middleware(req);
    expect(forwardedLocale(res)).toBe("ja");
    expect(res.cookies.get(LOCALE_COOKIE)).toBeUndefined();
  });

  it("ignore une langue inconnue et remplace les en-têtes i18n du client", () => {
    const req = new NextRequest("https://preview.e2b.app/?lang=invalid", {
      headers: {
        cookie: `${LOCALE_COOKIE}=ja`,
        [LOCALE_HEADER]: "ar",
        [URL_LOCALE_HEADER]: "ar",
      },
    });
    const res = middleware(req);
    expect(forwardedLocale(res)).toBe("ja");
    expect(res.headers.get(`x-middleware-request-${URL_LOCALE_HEADER}`)).toBeNull();
  });

  it("ne mémorise pas de préférence lors d'un préchargement", () => {
    const res = middleware(new NextRequest("http://localhost/a-propos", {
      headers: { "next-router-prefetch": "1", "accept-language": "en" },
    }));
    expect(forwardedLocale(res)).toBe("en");
    expect(res.cookies.get(LOCALE_COOKIE)).toBeUndefined();
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

});
