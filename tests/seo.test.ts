/**
 * Tests SEO : résolution sécurisée de l'origine canonique, sitemap.xml,
 * robots.txt, manifeste web, données structurées Schema.org et image OpenGraph.
 */
import { describe, expect, it } from "vitest";
import {
  buildManifest,
  buildPageMetadata,
  buildRobots,
  buildSitemap,
  buildStructuredData,
  FAQ_ITEMS,
  resolveSiteUrl,
  serializeJsonLd,
  SITE_DESCRIPTION,
  SITE_NAME,
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
    expect(manifestRoute()).toEqual(m);
  });
});

describe("buildStructuredData & serializeJsonLd", () => {
  it("construit un graphe Schema.org cohérent avec les FAQ visibles", () => {
    const ld = buildStructuredData("https://repodrop.fr/");
    expect(ld["@context"]).toBe("https://schema.org");

    const types = ld["@graph"].map((node) => node["@type"]);
    expect(types).toEqual(["WebSite", "WebApplication", "FAQPage"]);

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
