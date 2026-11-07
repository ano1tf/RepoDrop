/**
 * Tests SEO : résolution sécurisée de l'origine canonique, sitemap.xml,
 * robots.txt, manifeste web, données structurées Schema.org et image OpenGraph.
 */
import { describe, expect, it } from "vitest";
import {
  buildIcons,
  buildVerification,
  buildManifest,
  buildPageMetadata,
  buildRobots,
  buildSitemap,
  buildStructuredData,
  FAQ_ITEMS,
  resolveContentLastModified,
  resolveSiteUrl,
  serializeJsonLd,
  SITE_CONTENT_LAST_MODIFIED,
  SITE_DESCRIPTION,
  SITE_GOOGLE_SITE_VERIFICATION,
  SITE_NAME,
  twitterHandleFields,
} from "@/lib/seo";
import OpenGraphImage, {
  alt as ogAlt,
  contentType as ogContentType,
  size as ogSize,
} from "@/app/opengraph-image";
import manifestRoute from "@/app/manifest";

function makeHeaders(entries: Record<string, string>): Headers {
  return new Headers(entries);
}

describe("resolveSiteUrl", () => {
  it("normalise un domaine public APP_URL et retire le slash final", () => {
    expect(resolveSiteUrl({ appUrl: "https://repodrop.fr/" })).toBe(
      "https://repodrop.fr",
    );
    expect(resolveSiteUrl({ appUrl: "https://sub.repodrop.fr/chemin" })).toBe(
      "https://sub.repodrop.fr",
    );
  });

  it("ignore Host et X-Forwarded-Host quand APP_URL est un domaine public (anti-empoisonnement)", () => {
    const headers = makeHeaders({
      host: "attacker.example",
      "x-forwarded-host": "evil.example",
      "x-forwarded-proto": "http",
    });
    expect(
      resolveSiteUrl({ appUrl: "https://repodrop.fr", headers }),
    ).toBe("https://repodrop.fr");
  });

  it("utilise x-forwarded-host + x-forwarded-proto quand APP_URL est localhost (preview/dev)", () => {
    const headers = makeHeaders({
      host: "0.0.0.0:3000",
      "x-forwarded-host": "3000-sandbox.e2b.app",
      "x-forwarded-proto": "https",
    });
    expect(
      resolveSiteUrl({ appUrl: "http://localhost:3000", headers }),
    ).toBe("https://3000-sandbox.e2b.app");
  });

  it("rejette les hôtes non routables (0.0.0.0, ::) et les en-têtes malformés", () => {
    const nonRoutable = makeHeaders({
      host: "0.0.0.0:3000",
      "x-forwarded-host": "0.0.0.0:3000",
    });
    expect(
      resolveSiteUrl({ appUrl: "http://localhost:3000", headers: nonRoutable }),
    ).toBe("http://localhost:3000");

    const hostile = makeHeaders({
      "x-forwarded-host": "evil.test/chemin?x=1",
      host: "user@evil.test",
    });
    expect(
      resolveSiteUrl({ appUrl: "http://localhost:3000", headers: hostile }),
    ).toBe("http://localhost:3000");
  });

  it("retombe sur http://localhost:3000 si APP_URL est invalide ou non-HTTP", () => {
    expect(resolveSiteUrl({ appUrl: "javascript:alert(1)" })).toBe(
      "http://localhost:3000",
    );
    expect(resolveSiteUrl({ appUrl: "pas-une-url" })).toBe(
      "http://localhost:3000",
    );
  });
});

describe("buildSitemap", () => {
  const fixedDate = new Date("2026-11-06T00:00:00.000Z");

  it("expose uniquement les pages publiques répondant 200 OK sans session", () => {
    const entries = buildSitemap("https://repodrop.fr/", fixedDate);
    const urls = entries.map((e) => e.url);

    expect(urls).toEqual([
      "https://repodrop.fr",
      "https://repodrop.fr/login",
    ]);

    expect(entries[0]?.priority).toBe(1);
    expect(entries[0]?.changeFrequency).toBe("weekly");
    expect(entries[0]?.lastModified).toEqual(fixedDate);
    expect(entries[1]?.priority).toBe(0.5);
  });

  it("n'inclut aucune route privée, authentifiée ou API", () => {
    const urls = buildSitemap("https://repodrop.fr", fixedDate).map((e) => e.url);
    for (const forbidden of ["/import", "/repos", "/jobs", "/staff", "/api"]) {
      expect(urls.some((u) => u.includes(forbidden))).toBe(false);
    }
  });
});

describe("buildRobots", () => {
  it("autorise la racine, bloque les routes privées/API et déclare le sitemap absolu", () => {
    const robots = buildRobots("https://repodrop.fr/");
    expect(robots.sitemap).toBe("https://repodrop.fr/sitemap.xml");

    const rule = Array.isArray(robots.rules) ? robots.rules[0] : robots.rules;
    expect(rule?.userAgent).toBe("*");
    expect(rule?.allow).toBe("/");
    expect(rule?.disallow).toEqual(
      expect.arrayContaining(["/api/", "/import", "/repos", "/jobs/", "/staff"]),
    );
  });

  it("ne bloque jamais /_next/ (nécessaire au rendu CSS/JS par Googlebot)", () => {
    const robots = buildRobots("https://repodrop.fr");
    const rule = Array.isArray(robots.rules) ? robots.rules[0] : robots.rules;
    const disallow = Array.isArray(rule?.disallow)
      ? rule.disallow
      : [rule?.disallow];
    expect(disallow.some((p) => p?.startsWith("/_next"))).toBe(false);
  });
});

describe("buildManifest", () => {
  it("fournit un manifeste PWA français complet", () => {
    const m = buildManifest();
    expect(m.short_name).toBe(SITE_NAME);
    expect(m.description).toBe(SITE_DESCRIPTION);
    expect(m.lang).toBe("fr");
    expect(m.start_url).toBe("/");
    expect(m.theme_color).toBe("#080b12");
    expect(m.icons?.length).toBeGreaterThan(0);
    // Le manifeste par défaut reste celui d'origine (français).
    expect(buildManifest()).toEqual(m);
  });

  it("suit la langue demandée sans toucher aux icônes", async () => {
    // La route `/manifest.webmanifest` lit le cookie de langue : on vérifie le
    // rendu localisé via `buildManifest`, sans dépendre du contexte Next.
    const ja = buildManifest({
      locale: "ja",
      name: "RepoDrop — アーカイブを GitHub へ",
      description: "説明",
    });
    expect(ja.lang).toBe("ja");
    expect(ja.name).toBe("RepoDrop — アーカイブを GitHub へ");
    expect(ja.start_url).toBe("/");
    expect(ja.icons).toEqual(buildManifest().icons);
    // La route existe toujours et reste une fonction (rendu dynamique).
    expect(typeof manifestRoute).toBe("function");
  });
});

describe("buildStructuredData & serializeJsonLd", () => {
  it("construit un graphe Schema.org cohérent avec les FAQ visibles", () => {
    const ld = buildStructuredData("https://repodrop.fr/");
    expect(ld["@context"]).toBe("https://schema.org");

    const types = ld["@graph"].map((node) => node["@type"]);
    expect(types).toEqual([
      "Organization",
      "WebSite",
      "WebPage",
      "ImageObject",
      "WebApplication",
      "FAQPage",
    ]);

    const faqNode = ld["@graph"].find((n) => n["@type"] === "FAQPage");
    expect(faqNode && "mainEntity" in faqNode ? faqNode.mainEntity : []).toHaveLength(
      FAQ_ITEMS.length,
    );
  });

  it("échappe les chevrons et esperluettes contre la cassure de balise script", () => {
    const raw = serializeJsonLd({ evil: "</script><script>alert(1)&" });
    expect(raw).not.toContain("</script>");
    expect(raw).not.toContain("<");
    expect(raw).not.toContain(">");
    expect(JSON.parse(raw)).toEqual({ evil: "</script><script>alert(1)&" });
  });
});

describe("buildPageMetadata", () => {
  it("produit une URL canonique propre et rattache les images sociales", () => {
    const home = buildPageMetadata({ path: "/" });
    expect(home.alternates?.canonical).toBe("/");
    expect(home.openGraph?.url).toBe("/");

    const login = buildPageMetadata({
      title: "Connexion GitHub",
      path: "/login",
    });
    expect(login.title).toBe("Connexion GitHub");
    expect(login.alternates?.canonical).toBe("/login");
    expect(login.openGraph?.title).toBe("Connexion GitHub · RepoDrop");
  });
});

describe("opengraph-image", () => {
  it("génère une image PNG 1200x630 valide hors réseau", async () => {
    expect(ogSize).toEqual({ width: 1200, height: 630 });
    expect(ogContentType).toBe("image/png");
    expect(ogAlt).toContain("RepoDrop");

    const res = OpenGraphImage();
    const buf = Buffer.from(await res.arrayBuffer());
    // Signature magique PNG : 89 50 4E 47 0D 0A 1A 0A
    expect(buf.subarray(0, 8).toString("hex")).toBe("89504e470d0a1a0a");
    expect(buf.byteLength).toBeGreaterThan(5_000);
  });
});

describe("buildIcons", () => {
  /** Aplatit `string | IconURL | (string | IconURL)[]` en liste d'URLs. */
  function urlsOf(value: unknown): string[] {
    const list = Array.isArray(value) ? value : [value];
    return list
      .map((i) => (typeof i === "string" ? i : (i as { url?: string })?.url))
      .filter((u): u is string => Boolean(u));
  }

  it("déclare un favicon SVG et des PNG de repli (iOS, Google)", () => {
    const icons = buildIcons() as {
      icon?: unknown;
      apple?: unknown;
    };

    expect(urlsOf(icons.icon)).toEqual(
      expect.arrayContaining([
        "/icon.svg",
        "/icons/icon-192.png",
        "/icons/icon-512.png",
      ]),
    );
    expect(urlsOf(icons.apple)).toContain("/apple-icon.png");
  });

  it("pointe vers des fichiers réellement présents (pas de 404 de favicon)", async () => {
    const { existsSync } = await import("node:fs");
    for (const p of [
      "app/icon.svg",
      "app/apple-icon.png",
      "public/icons/icon-192.png",
      "public/icons/icon-512.png",
      "public/icons/icon-maskable-512.png",
    ]) {
      expect(existsSync(p), `${p} manquant`).toBe(true);
    }
  });
});

describe("icônes du manifeste", () => {
  it("fournit un raster 192, un 512 et un maskable (installabilité PWA)", () => {
    const icons = buildManifest().icons ?? [];
    const list = icons.map((i) => ({ src: i.src, purpose: i.purpose, sizes: i.sizes }));

    expect(list.some((i) => i.src === "/icons/icon-192.png" && i.sizes === "192x192")).toBe(
      true,
    );
    expect(list.some((i) => i.src === "/icons/icon-512.png" && i.purpose === "any")).toBe(
      true,
    );
    expect(
      list.some((i) => i.src === "/icons/icon-maskable-512.png" && i.purpose === "maskable"),
    ).toBe(true);
  });
});

describe("twitterHandleFields", () => {
  it("n'émet aucun handle par défaut (pas de crédit à un compte tiers)", () => {
    // NEXT_PUBLIC_TWITTER_HANDLE est absent de l'environnement de test.
    expect(twitterHandleFields()).toEqual({});
  });
});

describe("données structurées enrichies", () => {
  const ld = buildStructuredData("https://repodrop.fr/");
  const byType = (type: string) =>
    ld["@graph"].find((node) => node["@type"] === type) as Record<string, unknown>;

  it("publie une Organization avec un logo raster absolu (résultats enrichis)", () => {
    const org = byType("Organization");
    const logo = org.logo as Record<string, unknown>;

    expect(org["@id"]).toBe("https://repodrop.fr/#organization");
    // Google exige une URL absolue et un raster ≥ 112 px : pas de SVG.
    expect(String(logo.url)).toMatch(/^https:\/\/repodrop\.fr\/.+\.png$/);
    expect(logo.width).toBeGreaterThanOrEqual(112);
    expect(logo.height).toBeGreaterThanOrEqual(112);
  });

  it("relie WebPage, WebSite et WebApplication par @id (un seul graphe)", () => {
    const site = byType("WebSite");
    const page = byType("WebPage");
    const app = byType("WebApplication");

    expect(page.isPartOf).toEqual({ "@id": site["@id"] });
    expect(page.about).toEqual({ "@id": app["@id"] });
    expect(app.isPartOf).toEqual({ "@id": site["@id"] });
    expect(site.publisher).toEqual({ "@id": byType("Organization")["@id"] });
    expect(app.publisher).toEqual({ "@id": byType("Organization")["@id"] });
  });

  it("déclare l'image d'aperçu réellement servie par la page", () => {
    const img = byType("ImageObject");
    expect(img.url).toBe("https://repodrop.fr/opengraph-image");
    expect(img.width).toBe(1200);
    expect(img.height).toBe(630);
  });

  it("cite les images au format absolu et ne laisse aucun @id orphelin", () => {
    const ids = new Set(
      ld["@graph"].map((n) => (n as Record<string, unknown>)["@id"]).filter(Boolean),
    );
    for (const node of ld["@graph"]) {
      for (const value of Object.values(node)) {
        if (
          value &&
          typeof value === "object" &&
          "@id" in (value as Record<string, unknown>) &&
          Object.keys(value as Record<string, unknown>).length === 1
        ) {
          expect(ids.has((value as Record<string, unknown>)["@id"])).toBe(true);
        }
      }
    }
  });
});

describe("métadonnées de pages", () => {
  it("garde la page de connexion partageable mais hors index", () => {
    const login = buildPageMetadata({
      title: "Connexion GitHub",
      path: "/login",
      noIndex: true,
    });
    expect(login.robots).toEqual({ index: false, follow: true });
    // Le partage social reste complet : c'est la partie visible de la balise.
    const images = login.openGraph?.images;
    expect(Array.isArray(images) ? images.length : images ? 1 : 0).toBe(1);
    expect((login.twitter as { card?: string })?.card).toBe("summary_large_image");
  });

  it("n'ajoute aucune directive robots aux pages indexables", () => {
    expect(buildPageMetadata({ path: "/" }).robots).toBeUndefined();
  });
});

describe("resolveContentLastModified", () => {
  it("privilégie SOURCE_DATE_EPOCH pour des builds reproductibles", () => {
    const d = resolveContentLastModified({ SOURCE_DATE_EPOCH: "1794009600" });
    expect(d.toISOString()).toBe("2026-11-07T00:00:00.000Z");
  });

  it("retombe sur la date éditoriale quand la variable est absente ou absurde", () => {
    const expected = new Date(`${SITE_CONTENT_LAST_MODIFIED}T00:00:00.000Z`);
    for (const env of [{}, { SOURCE_DATE_EPOCH: "" }, { SOURCE_DATE_EPOCH: "-5" }, { SOURCE_DATE_EPOCH: "NaN" }]) {
      const d = resolveContentLastModified(env);
      expect(d.toISOString()).toBe(expected.toISOString());
      expect(Number.isNaN(d.getTime())).toBe(false);
    }
  });

  it("n'utilise jamais l'heure de la requête comme lastmod", () => {
    const now = Date.now();
    const d = resolveContentLastModified({});
    expect(now - d.getTime()).toBeGreaterThan(60_000);
    expect(buildSitemap("https://repodrop.fr")[0]?.lastModified).toEqual(d);
  });
});

describe("vérification Google Search Console", () => {
  it("expose un jeton au format attendu par Google", () => {
    // Jetons Search Console : base64url, 43 caractères, jamais vide.
    expect(SITE_GOOGLE_SITE_VERIFICATION).toMatch(/^[A-Za-z0-9_-]{43}$/);
  });

  it("produit le bloc verification des métadonnées Next.js", () => {
    expect(buildVerification()).toEqual({
      google: SITE_GOOGLE_SITE_VERIFICATION,
    });
    // Next.js traduit ce bloc en
    // <meta name="google-site-verification" content="…" /> sur chaque page.
    expect(buildVerification()?.google).toBe(
      "7AQ_yCc-DFuI95AFEHuKT6a3Pi5xPaS9YFqr7oop7ko",
    );
  });
});
