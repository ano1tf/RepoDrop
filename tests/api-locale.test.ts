import { describe, expect, it } from "vitest";
import { GET, POST } from "@/app/api/locale/route";
import { EMBEDDED_LOCALE_COOKIE, LOCALE_COOKIE } from "@/lib/i18n/locales";

function getReq(query: string, headers?: HeadersInit): Request {
  return new Request(`http://localhost/api/locale${query}`, { headers });
}

function postReq(body: string): Request {
  return new Request("http://localhost/api/locale", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body,
  });
}

describe("GET /api/locale", () => {
  function sentLocale(res: Awaited<ReturnType<typeof GET>>): string | null {
    return res.cookies.get(LOCALE_COOKIE)?.value ?? null;
  }

  it("pose le cookie puis redirige vers `next` (Location relatif)", async () => {
    const res = await GET(getReq("?to=ja&next=/langues"));
    expect(res.status).toBe(307);
    expect(res.headers.get("location")).toBe("/langues?lang=ja");
    expect(res.headers.get("cache-control")).toBe("no-store");
    expect(res.cookies.get(EMBEDDED_LOCALE_COOKIE)).toBeUndefined();
    expect(sentLocale(res)).toBe("ja");
  });

  it("remplace la langue précédente et conserve la requête et le fragment", async () => {
    const next = encodeURIComponent("/recherche?q=projet%20zip&lang=fr#resultats");
    const res = await GET(getReq(`?to=nl&next=${next}`));
    expect(res.headers.get("location")).toBe("/recherche?q=projet+zip&lang=nl#resultats");
    expect(sentLocale(res)).toBe("nl");
  });

  it("permet de mémoriser le choix en iframe derrière un proxy HTTPS", async () => {
    const res = await GET(getReq("?to=ar", {
      "x-forwarded-host": "preview.e2b.app",
      "x-forwarded-proto": "https",
    }));
    expect(res.cookies.get(LOCALE_COOKIE)).toMatchObject({ value: "ar", secure: true, sameSite: "lax" });
    expect(res.cookies.get(EMBEDDED_LOCALE_COOKIE)).toMatchObject({
      value: "ar", secure: true, sameSite: "none", partitioned: true,
    });
    expect(res.headers.get("location")).toBe("/?lang=ar");
  });

  it.each([
    { rsc: "1" },
    { "next-router-prefetch": "1" },
    { "next-router-segment-prefetch": "/_tree" },
    { "sec-purpose": "prefetch;prerender" },
  ])("ne modifie pas la langue lors d'un préchargement (%j)", async (headers) => {
    const res = await GET(getReq("?to=fr&next=/langues", new Headers(Object.entries(headers))));
    expect(res.status).toBe(204);
    expect(res.headers.has("set-cookie")).toBe(false);
  });

  it("normalise les variantes régionales (de-AT → de)", async () => {
    const res = await GET(getReq("?to=de-AT&next=/import"));
    expect(sentLocale(res)).toBe("de");
  });

  it("redirige vers / quand `next` vise l'extérieur (open redirect)", async () => {
    for (const evil of ["//evil.com", "https://evil.com", "/\\evil.com"]) {
      const res = await GET(getReq(`?to=en&next=${encodeURIComponent(evil)}`));
      expect(res.headers.get("location")).toBe("/?lang=en");
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
