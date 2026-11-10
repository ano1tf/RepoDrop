/**
 * Tests de la route `/api/locale` — la bascule de langue.
 *
 * Le contrat vérifié :
 *   1. GET `?to=xx&next=/chemin` pose le cookie `rd_lang` **sur la réponse
 *      de redirection** et renvoie vers `next` ;
 *   2. `next` est cantonné aux chemins internes (pas de redirection ouverte) ;
 *   3. une langue inconnue ne pose pas de cookie ;
 *   4. POST `{ locale }` répond en JSON avec le même cookie ;
 *   5. une langue inconnue en POST est un 400 explicite.
 */
import { describe, expect, it } from "vitest";
import { GET, POST } from "@/app/api/locale/route";
import { LOCALE_COOKIE } from "@/lib/i18n/locales";

function getReq(query: string): Request {
  return new Request(`http://localhost/api/locale${query}`);
}

function postReq(body: string): Request {
  return new Request("http://localhost/api/locale", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body,
  });
}

describe("GET /api/locale", () => {
  /** Cookie `rd_lang` lu dans l'en-tête `set-cookie` (réponse plain). */
  function sentLocale(res: Response): string | null {
    const raw = res.headers.get("set-cookie");
    const m = raw?.match(new RegExp(`${LOCALE_COOKIE}=([^;]+)`));
    return m?.[1] ?? null;
  }

  it("pose le cookie puis redirige vers `next` (Location relatif)", async () => {
    const res = await GET(getReq("?to=ja&next=/langues"));
    expect(res.status).toBe(307);
    expect(res.headers.get("location")).toBe("/langues");
    expect(sentLocale(res)).toBe("ja");
  });

  it("normalise les variantes régionales (de-AT → de)", async () => {
    const res = await GET(getReq("?to=de-AT&next=/import"));
    expect(sentLocale(res)).toBe("de");
  });

  it("redirige vers / quand `next` vise l'extérieur (open redirect)", async () => {
    for (const evil of ["//evil.com", "https://evil.com", "/\\evil.com"]) {
      const res = await GET(getReq(`?to=en&next=${encodeURIComponent(evil)}`));
      expect(res.headers.get("location")).toBe("/");
      expect(sentLocale(res)).toBe("en");
    }
  });

  it("une langue inconnue redirige sans poser de cookie", async () => {
    const res = await GET(getReq("?to=klingon&next=/import"));
    expect(sentLocale(res)).toBeNull();
    expect(res.headers.get("location")).toBe("/import");
  });

  it("sans paramètre, redirige vers / sans cookie", async () => {
    const res = await GET(getReq(""));
    expect(res.headers.get("location")).toBe("/");
    expect(sentLocale(res)).toBeNull();
  });
});

describe("POST /api/locale", () => {
  it("répond JSON et pose le cookie", async () => {
    const res = await POST(postReq(JSON.stringify({ locale: "pt-BR" })));
    expect(res.status).toBe(200);
    expect(await res.json()).toEqual({ locale: "pt" });
    expect(res.cookies.get(LOCALE_COOKIE)?.value).toBe("pt");
  });

  it("refuse une langue inconnue avec un 400", async () => {
    const res = await POST(postReq(JSON.stringify({ locale: "klingon" })));
    expect(res.status).toBe(400);
    expect(res.cookies.get(LOCALE_COOKIE)).toBeUndefined();
  });

  it("refuse un JSON invalide avec un 400", async () => {
    const res = await POST(postReq("{pas du json"));
    expect(res.status).toBe(400);
  });
});
