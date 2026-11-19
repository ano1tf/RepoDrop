/**
 * Tests SEO : résolution sécurisée de l'origine canonique, sitemap.xml,
 * robots.txt, manifeste web, données structurées Schema.org et image OpenGraph.
 */
import { describe, expect, it } from "vitest";
import {
  buildAboutStructuredData,
  buildArticleStructuredData,
  buildBreadcrumbList,
  buildGuidesIndexStructuredData,
  buildIcons,
  buildNoIndexHeaders,
  buildRssFeed,
  buildSearchAction,
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
  SITE_DEFAULT_TITLE,
  SITE_DESCRIPTION,
  SITE_GOOGLE_SITE_VERIFICATION,
  SITE_NAME,
  SITE_SAME_AS,
  twitterHandleFields,
} from "@/lib/seo";
import { LOCALES } from "@/lib/i18n/locales";
import { getDictionary } from "@/lib/i18n/dictionary";
import { getGuides, GUIDES, searchGuides } from "@/lib/seo-guides";
import OpenGraphImage, {
  alt as ogAlt,
  contentType as ogContentType,
  size as ogSize,
} from "@/app/opengraph-image";
import { GET as manifestRoute } from "@/app/manifest.webmanifest/route";

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

  it("expose uniquement les pages publiques indexables", () => {
    const entries = buildSitemap("https://repodrop.fr/", fixedDate);
    const urls = entries.map((e) => e.url);

    // `/login` est `noindex` : une URL noindex dans le sitemap est une erreur
    // signalée par Google Search Console.
    expect(urls).toEqual(["https://repodrop.fr"]);

    expect(entries[0]?.priority).toBe(1);
    expect(entries[0]?.changeFrequency).toBe("weekly");
    expect(entries[0]?.lastModified).toEqual(fixedDate);
  });

  it("n'inclut aucune route privée, authentifiée ou noindex", () => {
    const urls = buildSitemap("https://repodrop.fr", fixedDate).map((e) => e.url);
    for (const forbidden of [
      "/import",
      "/repos",
      "/jobs",
      "/staff",
      "/login",
      "/api",
    ]) {
      expect(urls.some((u) => u.includes(forbidden))).toBe(false);
    }
  });
});

describe("buildNoIndexHeaders", () => {
  it("pose X-Robots-Tag noindex, nofollow (barrière HTTP indépendante du HTML)", () => {
    expect(buildNoIndexHeaders()).toEqual([
      { key: "X-Robots-Tag", value: "noindex, nofollow" },
    ]);
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
  it("fournit un manifeste PWA français complet", async () => {
    const m = buildManifest();
    expect(m.short_name).toBe(SITE_NAME);
    expect(m.description).toBe(SITE_DESCRIPTION);
    expect(m.lang).toBe("fr");
    expect(m.start_url).toBe("/");
    expect(m.theme_color).toBe("#080b12");
    expect(m.icons?.length).toBeGreaterThan(0);
    expect(await manifestRoute(new Request("https://repodrop.test/manifest.webmanifest")).json()).toEqual(m);
  });

  it.each(LOCALES)("localise le manifeste en $code sans changer l’identité de l’application", async ({ code, dir }) => {
    const response = manifestRoute(new Request(`https://repodrop.test/manifest.webmanifest?lang=${code}`));
    expect(response.headers.get("content-language")).toBe(code);
    const manifest = await response.json();
    expect(manifest).toMatchObject({ id: "/", lang: code, start_url: code === "fr" ? "/" : `/?lang=${code}` });
    if (code !== "fr") {
      expect(manifest).toMatchObject({ dir, description: getDictionary(code).meta.description });
    }
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
      "BreadcrumbList",
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

  it("annonce la date éditoriale sur WebPage (jamais l'heure de la requête)", () => {
    const page = byType("WebPage");
    expect(page.datePublished).toBe(SITE_CONTENT_LAST_MODIFIED);
    expect(page.dateModified).toBe(SITE_CONTENT_LAST_MODIFIED);
    expect(page.headline).toBe(SITE_DEFAULT_TITLE);
  });

  it("relie WebPage à l'application (mainEntity) et au breadcrumb", () => {
    const page = byType("WebPage");
    expect(page.mainEntity).toEqual({ "@id": "https://repodrop.fr/#app" });
    expect(page.breadcrumb).toEqual({ "@id": "https://repodrop.fr/#breadcrumb" });
  });

  it("fournit une description à l'entité Organization", () => {
    const org = byType("Organization");
    expect(org.description).toBe(SITE_DESCRIPTION);
  });

  it("déclare un BreadcrumbList cohérent avec la page", () => {
    const bc = byType("BreadcrumbList");
    expect(bc["@id"]).toBe("https://repodrop.fr/#breadcrumb");
    expect(bc.isPartOf).toEqual({ "@id": "https://repodrop.fr/#webpage" });
    const items = bc.itemListElement as { position: number; name: string; item: string }[];
    expect(items).toHaveLength(1);
    expect(items[0]?.position).toBe(1);
    expect(items[0]?.name).toBe(SITE_NAME);
    expect(items[0]?.item).toBe("https://repodrop.fr");
  });

  it("déclare l'application gratuite (isAccessibleForFree)", () => {
    const app = byType("WebApplication");
    expect(app.isAccessibleForFree).toBe(true);
  });

  it("fournit un screenshot de l'application (image OG statique)", () => {
    const app = byType("WebApplication");
    const shot = app.screenshot as Record<string, unknown>;
    expect(String(shot.url)).toBe("https://repodrop.fr/opengraph-image");
    expect(shot.width).toBe(1200);
    expect(shot.height).toBe(630);
  });

  it("marque l'image principale comme représentative de la page", () => {
    const img = byType("ImageObject");
    expect(img.representativeOfPage).toBe(true);
  });

  it("date la FAQ de modification éditoriale", () => {
    const faq = byType("FAQPage");
    expect(faq.dateModified).toBe(SITE_CONTENT_LAST_MODIFIED);
  });

  it("annonce la disponibilité de l'offre (InStock)", () => {
    const app = byType("WebApplication");
    const offer = app.offers as Record<string, unknown>;
    expect(offer.availability).toBe("https://schema.org/InStock");
    expect(offer.price).toBe("0");
    expect(offer.priceCurrency).toBe("EUR");
  });

  it("annonce la dernière révision éditoriale de la page (lastReviewed)", () => {
    const page = byType("WebPage");
    expect(page.lastReviewed).toBe(SITE_CONTENT_LAST_MODIFIED);
  });

  it("date les questions et réponses de la FAQ éditorialement", () => {
    const faq = byType("FAQPage");
    const questions = faq.mainEntity as {
      datePublished: string;
      acceptedAnswer: { dateModified: string };
    }[];
    expect(questions).toHaveLength(FAQ_ITEMS.length);
    for (const q of questions) {
      expect(q.datePublished).toBe(SITE_CONTENT_LAST_MODIFIED);
      expect(q.acceptedAnswer.dateModified).toBe(SITE_CONTENT_LAST_MODIFIED);
    }
  });

  it("n'émet aucun sameAs par défaut (pas d'association à un profil tiers)", () => {
    const org = byType("Organization");
    // En environnement de test, aucune variable NEXT_PUBLIC_* n'est posée.
    expect(org.sameAs ?? []).toEqual(SITE_SAME_AS);
    expect(SITE_SAME_AS).toEqual([]);
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

  it("pose un alt sur l'image Twitter (twitter:image:alt)", () => {
    const meta = buildPageMetadata({ path: "/" });
    const images = meta.twitter?.images;
    const first = Array.isArray(images) ? images[0] : images;
    // `TwitterImageDescriptor` porte `url` et `alt` ; les strings sont exclus.
    const img = first as { url?: string; alt?: string } | undefined;
    expect(img?.url).toBe("/twitter-image");
    expect(img?.alt).toContain("RepoDrop");
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

describe("vérification des moteurs", () => {
  it("expose un jeton Google au format attendu par Search Console", () => {
    // Jetons Search Console : base64url, 43 caractères, jamais vide.
    expect(SITE_GOOGLE_SITE_VERIFICATION).toMatch(/^[A-Za-z0-9_-]{43}$/);
  });

  it("produit le bloc verification des métadonnées Next.js", () => {
    // Bing n'est activé que via BING_SITE_VERIFICATION : absent en test, il
    // n'émet aucune balise msvalidate.01.
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

describe("buildBreadcrumbList", () => {
  it("génère une piste de navigation avec URLs absolues", () => {
    const bc = buildBreadcrumbList("https://repodrop.fr", [
      { name: "Accueil", path: "/" },
      { name: "Guides", path: "/guides" },
      { name: "Import RAR", path: "/guides/importer-rar-sur-github" },
    ]) as {
      itemListElement: { position: number; name: string; item: string }[];
    };

    expect(bc.itemListElement).toHaveLength(3);
    expect(bc.itemListElement[0]).toEqual({
      "@type": "ListItem",
      position: 1,
      name: "Accueil",
      item: "https://repodrop.fr/",
    });
    expect(bc.itemListElement[2]?.item).toBe(
      "https://repodrop.fr/guides/importer-rar-sur-github",
    );
    // Les URLs déjà absolues ne sont pas doublement préfixées.
    const abs = buildBreadcrumbList("https://repodrop.fr", [
      { name: "X", path: "https://example.com/y" },
    ]) as {
      itemListElement: { item: string }[];
    };
    expect(abs.itemListElement[0]?.item).toBe("https://example.com/y");
  });
});

describe("buildArticleStructuredData (pages de contenu)", () => {
  const opts = {
    origin: "https://repodrop.fr",
    title: "Comment importer un fichier RAR sur GitHub",
    description: "Importez un .rar sur GitHub sans git ni terminal.",
    datePublished: "2026-11-07",
    dateModified: "2026-11-07",
    keywords: ["importer rar sur github", "rar github"],
    steps: ["Étape 1", "Étape 2"],
    faq: [{ question: "Q ?", answer: "R." }],
    breadcrumbs: [
      { name: "Accueil", path: "/" },
      { name: "Guide", path: "/guides/x" },
    ],
  };

  it("construit Article + HowTo + FAQPage + BreadcrumbList", () => {
    const ld = buildArticleStructuredData(opts);
    const types = (ld["@graph"] as Record<string, unknown>[]).map(
      (n) => n["@type"],
    );
    expect(types).toEqual(["Article", "HowTo", "FAQPage", "BreadcrumbList"]);
  });

  it("date l'Article de façon éditoriale et cite les mots-clés", () => {
    const ld = buildArticleStructuredData(opts);
    const article = (ld["@graph"] as Record<string, unknown>[]).find(
      (n) => n["@type"] === "Article",
    ) as Record<string, unknown>;

    expect(article.datePublished).toBe("2026-11-07");
    expect(article.dateModified).toBe("2026-11-07");
    expect(article.keywords).toBe("importer rar sur github, rar github");
    expect(article.author).toEqual({ "@type": "Organization", name: SITE_NAME });
  });

  it("omets HowTo/FAQPage/breadcrumbs quand ils sont absents", () => {
    const ld = buildArticleStructuredData({
      origin: "https://repodrop.fr",
      title: "T",
      description: "D",
      datePublished: "2026-11-07",
      dateModified: "2026-11-07",
    });
    const types = (ld["@graph"] as Record<string, unknown>[]).map(
      (n) => n["@type"],
    );
    expect(types).toEqual(["Article"]);
  });

  it("omets keywords vides", () => {
    const ld = buildArticleStructuredData({
      origin: "https://repodrop.fr",
      title: "T",
      description: "D",
      datePublished: "2026-11-07",
      dateModified: "2026-11-07",
      keywords: [],
    });
    const article = (ld["@graph"] as Record<string, unknown>[]).find(
      (n) => n["@type"] === "Article",
    ) as Record<string, unknown>;
    expect("keywords" in article).toBe(false);
  });
});

describe("buildGuidesIndexStructuredData", () => {
  it("liste tous les guides dans un ItemList avec positions", () => {
    const ld = buildGuidesIndexStructuredData(
      "https://repodrop.fr",
      GUIDES.map((g) => ({ slug: g.slug, title: g.title, description: g.description })),
      [
        { name: "Accueil", path: "/" },
        { name: "Guides", path: "/guides" },
      ],
    );
    const graph = ld["@graph"] as Record<string, unknown>[];
    const list = graph.find((n) => n["@type"] === "ItemList") as Record<string, unknown>;

    expect(list.numberOfItems).toBe(GUIDES.length);
    const items = list.itemListElement as { position: number; item: string }[];
    expect(items).toHaveLength(GUIDES.length);
    expect(items[0]?.item).toBe("https://repodrop.fr/guides/importer-rar-sur-github");
    expect(items[0]?.position).toBe(1);
  });
});

describe("buildSearchAction (sitelinks search box)", () => {
  it("cible la page de recherche intégrée", () => {
    expect(buildSearchAction("https://repodrop.fr")).toEqual({
      "@type": "SearchAction",
      target: "https://repodrop.fr/recherche?q={search_term_string}",
      "query-input": "required name=search_term_string",
    });
  });

  it("est exposé dans le WebSite de l'accueil", () => {
    const ld = buildStructuredData("https://repodrop.fr/");
    const site = (ld["@graph"] as Record<string, unknown>[]).find(
      (n) => n["@type"] === "WebSite",
    ) as Record<string, unknown>;
    expect(site.potentialAction).toEqual(buildSearchAction("https://repodrop.fr"));
  });
});

describe("buildRssFeed", () => {
  it("produit un flux RSS 2.0 valide avec les guides", () => {
    const xml = buildRssFeed(
      "https://repodrop.fr",
      GUIDES.map((g) => ({
        slug: g.slug,
        title: g.title,
        description: g.description,
        dateModified: g.dateModified,
      })),
      SITE_DESCRIPTION,
    );

    expect(xml).toContain('<?xml version="1.0" encoding="UTF-8"?>');
    expect(xml).toContain("<rss version=\"2.0\">");
    expect(xml).toContain("<title>RepoDrop — Guides</title>");
    expect(xml).toContain("https://repodrop.fr/guides/importer-rar-sur-github");
    expect(xml).toContain("<language>fr</language>");
    // Un item par guide.
    const itemCount = (xml.match(/<item>/g) ?? []).length;
    expect(itemCount).toBe(GUIDES.length);
  });

  it("échappe les caractères XML des titres", () => {
    const xml = buildRssFeed(
      "https://repodrop.fr",
      [
        {
          slug: "x",
          title: "A & B <c>",
          description: "d",
          dateModified: "2026-11-07",
        },
      ],
      "desc",
    );
    expect(xml).toContain("A &amp; B &lt;c&gt;");
    expect(xml).not.toContain("A & B <c>");
  });
});

describe("buildSitemap enrichi", () => {
  it("inclut les pages de contenu ajoutées en paramètre", () => {
    const entries = buildSitemap(
      "https://repodrop.fr",
      new Date("2026-11-07T00:00:00.000Z"),
      [
        {
          url: "https://repodrop.fr/guides",
          priority: 0.9,
          changeFrequency: "weekly",
          images: ["https://repodrop.fr/opengraph-image"],
        },
        {
          url: "https://repodrop.fr/guides/importer-rar-sur-github",
          priority: 0.8,
          changeFrequency: "monthly",
        },
      ],
    );

    const urls = entries.map((e) => e.url);
    expect(urls).toEqual([
      "https://repodrop.fr",
      "https://repodrop.fr/guides",
      "https://repodrop.fr/guides/importer-rar-sur-github",
    ]);
    expect(entries[1]?.priority).toBe(0.9);
    expect(entries[2]?.changeFrequency).toBe("monthly");
    expect(entries[1]?.images).toEqual(["https://repodrop.fr/opengraph-image"]);
  });

  it("le home porte l'image OG dans le sitemap", () => {
    const entries = buildSitemap("https://repodrop.fr");
    expect(entries[0]?.images).toEqual(["https://repodrop.fr/opengraph-image"]);
  });
});

describe("contenu des guides (lib/seo-guides)", () => {
  it("définit des guides uniques avec mots-clés et FAQ", () => {
    const slugs = GUIDES.map((g) => g.slug);
    expect(new Set(slugs).size).toBe(slugs.length);

    for (const g of GUIDES) {
      expect(g.title.length).toBeGreaterThan(10);
      expect(g.description.length).toBeGreaterThan(80);
      expect(g.keywords.length).toBeGreaterThan(0);
      expect(g.sections.length).toBeGreaterThan(0);
      expect(g.steps.length).toBeGreaterThan(0);
      expect(g.faq.length).toBeGreaterThan(0);
      // Les guides associés existent réellement.
      for (const rel of g.related) {
        expect(slugs).toContain(rel);
      }
    }
  });

  it("recherche les guides par mot-clé (insensible à la casse)", () => {
    const rar = searchGuides("rar");
    expect(rar.some((g) => g.slug === "importer-rar-sur-github")).toBe(true);

    expect(searchGuides("zip").some((g) => g.slug === "importer-zip-sur-github")).toBe(
      true,
    );
    expect(searchGuides("github sans git").length).toBeGreaterThan(0);
    expect(searchGuides("")).toEqual([]);
    expect(searchGuides("   ")).toEqual([]);
    expect(searchGuides("zzzz-inexistant")).toEqual([]);
  });
});

describe("éditions localisées des guides", () => {
  it.each(LOCALES)("couvre chaque guide en $code sans modifier les slugs", ({ code }) => {
    const guides = getGuides(code);
    expect(guides.map((guide) => guide.slug)).toEqual(GUIDES.map((guide) => guide.slug));
    for (const [i, guide] of guides.entries()) {
      const source = GUIDES[i];
      expect(guide.related).toEqual(source.related);
      expect(guide.datePublished).toBe(source.datePublished);
      expect(guide.steps).toHaveLength(3);
      expect(guide.sections.length).toBeGreaterThan(0);
      expect(guide.faq.length).toBeGreaterThan(0);
      expect(JSON.stringify(guide)).not.toMatch(/\{\w+\}/);
      if (code !== "fr") {
        expect(guide.title).not.toBe(source.title);
        expect(guide.intro).not.toBe(source.intro);
        expect(guide.steps).not.toEqual(source.steps);
        expect(guide.sections).not.toEqual(source.sections);
        expect(guide.faq).not.toEqual(source.faq);
      }
      expect(searchGuides(guide.title, code).map((result) => result.slug)).toContain(guide.slug);
    }
  });

  it("recherche le contenu traduit et conserve les accents facultatifs", () => {
    expect(searchGuides("NUMERO DE ARCHIVOS", "es").map((guide) => guide.slug)).toContain("importer-rar-sur-github");
    expect(searchGuides("github sans git", "en")).toEqual([]);
  });

  it("annonce le flux traduit avec des liens qui conservent la langue et des GUID stables", () => {
    const guides = getGuides("ja");
    const copy = getDictionary("ja");
    const xml = buildRssFeed("https://repodrop.fr", guides, copy.meta.description, {
      locale: "ja", title: copy.guides.guidesTitle,
    });
    expect(xml).toContain(`<title>RepoDrop — ${copy.guides.guidesTitle}</title>`);
    expect(xml).toContain(`<description>${copy.meta.description}</description>`);
    expect(xml).toContain("<language>ja</language>");
    const canonical = `https://repodrop.fr/guides/${guides[0].slug}`;
    expect(xml).toContain(`<link>${canonical}?lang=ja</link>`);
    expect(xml).toContain(`<guid isPermaLink="true">${canonical}</guid>`);
  });
});

describe("buildPageMetadata keywords", () => {
  it("ajoute les mots-clés spécifiques à la page", () => {
    const meta = buildPageMetadata({
      title: "T",
      path: "/x",
      keywords: ["a", "b"],
    });
    expect(meta.keywords).toEqual(["a", "b"]);
  });

  it("omets les mots-clés vides", () => {
    const meta = buildPageMetadata({ title: "T", path: "/x", keywords: [] });
    expect(meta.keywords).toBeUndefined();
  });
});

describe("HowTo sur l'accueil (buildStructuredData)", () => {
  it("injecte un nœud HowTo numéroté quand des étapes sont fournies", () => {
    const ld = buildStructuredData("https://repodrop.fr", {
      steps: ["Étape un", "Étape deux", "Étape trois"],
    });
    const graph = ld["@graph"] as Array<Record<string, unknown>>;
    const howto = graph.find((n) => n["@type"] === "HowTo");
    expect(howto).toBeDefined();
    expect(howto?.["@id"]).toBe("https://repodrop.fr/#howto");
    const steps = howto?.step as Array<{
      "@type": string;
      position: number;
      name: string;
      text: string;
    }>;
    expect(steps).toHaveLength(3);
    expect(steps?.[0].position).toBe(1);
    expect(steps?.[2].position).toBe(3);
    expect(steps?.[0].name).toBe("Étape 1");
    expect(steps?.[0].text).toBe("Étape un");
  });

  it("n'émet pas de HowTo quand aucune étape n'est fournie", () => {
    const ld = buildStructuredData("https://repodrop.fr");
    const graph = ld["@graph"] as Array<Record<string, unknown>>;
    expect(graph.some((n) => n["@type"] === "HowTo")).toBe(false);
  });
});

describe("buildAboutStructuredData (/a-propos)", () => {
  it("produit AboutPage + Organization + BreadcrumbList liés par @id", () => {
    const ld = buildAboutStructuredData(
      "https://repodrop.fr/",
      {
        title: "À propos de RepoDrop",
        description: "Description",
        breadcrumbs: [
          { name: "Accueil", path: "/" },
          { name: "À propos", path: "/a-propos" },
        ],
        inLanguage: "fr",
      },
    );
    expect(ld["@context"]).toBe("https://schema.org");
    const graph = ld["@graph"] as Array<Record<string, unknown>>;
    const types = graph.map((n) => n["@type"]);
    expect(types).toContain("AboutPage");
    expect(types).toContain("Organization");
    expect(types).toContain("BreadcrumbList");

    const about = graph.find((n) => n["@type"] === "AboutPage");
    expect(about?.url).toBe("https://repodrop.fr/a-propos");
    expect(about?.inLanguage).toBe("fr");
    // Nœuds liés : about/mainEntity pointent vers l'Organization.
    expect(about?.about).toEqual({ "@id": "https://repodrop.fr/#organization" });
    expect(about?.mainEntity).toEqual({ "@id": "https://repodrop.fr/#organization" });

    const org = graph.find((n) => n["@type"] === "Organization");
    expect(org?.name).toBe(SITE_NAME);
    const logo = org?.logo as { url?: string } | undefined;
    expect(String(logo?.url ?? org?.image)).toContain("https://repodrop.fr");

    const breadcrumb = graph.find((n) => n["@type"] === "BreadcrumbList");
    const elements = breadcrumb?.itemListElement as Array<{ name: string }>;
    expect(elements?.map((e) => e.name)).toEqual(["Accueil", "À propos"]);
  });
});

describe("rel=prev/next entre guides (buildPageMetadata)", () => {
  it("ajoute les balises prev/next via metadata.pagination", () => {
    const meta = buildPageMetadata({
      title: "Guide",
      path: "/guides/g",
      prev: "/guides/prev",
      next: "/guides/next",
    });
    expect(meta.pagination?.previous).toBe("/guides/prev");
    expect(meta.pagination?.next).toBe("/guides/next");
    expect(meta.alternates?.canonical).toBe("/guides/g");
  });

  it("omets prev/next quand ils ne sont pas fournis", () => {
    const meta = buildPageMetadata({ title: "Guide", path: "/guides/g" });
    expect(meta.pagination).toBeUndefined();
  });
});

describe("article OpenGraph (pages de contenu)", () => {
  it("émet og:type=article et les balises article:*", () => {
    const meta = buildPageMetadata({
      title: "Guide",
      path: "/guides/g",
      ogType: "article",
      article: {
        publishedTime: "2026-11-07T00:00:00.000Z",
        modifiedTime: "2026-11-10T00:00:00.000Z",
        section: "Guides",
        tags: ["rar", "github"],
      },
    });
    const og = meta.openGraph as {
      type?: string;
      article?: Record<string, unknown>;
    };
    expect(og.type).toBe("article");
    expect(og.article).toEqual({
      publishedTime: "2026-11-07T00:00:00.000Z",
      modifiedTime: "2026-11-10T00:00:00.000Z",
      section: "Guides",
      tags: ["rar", "github"],
    });
  });

  it("garde og:type=website par défaut", () => {
    const meta = buildPageMetadata({ title: "Accueil", path: "/" });
    const og = meta.openGraph as { type?: string };
    expect(og.type).toBe("website");
  });
});
