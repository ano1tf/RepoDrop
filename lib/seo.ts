/**
 * Référencement naturel (SEO) : résolution d'origine canonique, plan de site,
 * directives robots.txt, manifeste web et données structurées Schema.org.
 *
 * Toute la logique pure est rassemblée ici afin d'être testable unitairement
 * sans dépendre du runtime Next.js.
 *
 * Point de sécurité important sur `resolveSiteUrl()` :
 * - En production, lorsque `APP_URL` désigne un vrai domaine public (autre que
 *   `localhost` / `127.0.0.1` / `0.0.0.0`), cette valeur fait **toujours** foi.
 *   On ignore alors `Host` et `X-Forwarded-Host` pour empêcher l'empoisonnement
 *   du `<link rel="canonical">`, de `/sitemap.xml` ou de `/robots.txt` via un
 *   en-tête `Host` forgé.
 * - En développement ou en environnement d'aperçu (où `APP_URL` vaut encore
 *   `http://localhost:3000`), on reconstruit l'origine publique à partir des
 *   en-têtes du proxy (`x-forwarded-host`, `x-forwarded-proto`).
 */
import type { Metadata, MetadataRoute } from "next";
import { config } from "./config";

export const SITE_NAME = "RepoDrop";

export const SITE_DEFAULT_TITLE =
  "RepoDrop — Importez vos archives .rar, .zip et .tar sur GitHub";

export const SITE_DESCRIPTION =
  "Déposez une archive .rar, .zip, .tar ou .tar.gz et poussez votre code sur GitHub en un clic. Extraction sécurisée, aperçu avant envoi, sans terminal ni git.";

export const SITE_OG_IMAGE = {
  url: "/opengraph-image",
  width: 1200,
  height: 630,
  type: "image/png",
  alt: "RepoDrop — Importez vos archives .rar, .zip et .tar directement sur GitHub",
} as const;

export const SITE_TWITTER_IMAGE = "/twitter-image";

/**
 * Métadonnées complètes d'une page publique indexable (canonique, OpenGraph,
 * Twitter Card) afin que chaque segment feuille conserve `og:image` résolu
 * contre `metadataBase` (y compris derrière un proxy).
 */
export function buildPageMetadata(opts: {
  title?: string;
  description?: string;
  path: string;
}): Metadata {
  const fullTitle = opts.title ? `${opts.title} · ${SITE_NAME}` : SITE_DEFAULT_TITLE;
  const description = opts.description ?? SITE_DESCRIPTION;

  return {
    ...(opts.title ? { title: opts.title } : {}),
    description,
    alternates: {
      canonical: opts.path,
    },
    openGraph: {
      type: "website",
      locale: "fr_FR",
      siteName: SITE_NAME,
      url: opts.path,
      title: fullTitle,
      description,
      images: [SITE_OG_IMAGE],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [SITE_TWITTER_IMAGE],
    },
  };
}

export const SITE_KEYWORDS: string[] = [
  "RepoDrop",
  "importer rar sur github",
  "importer zip sur github",
  "importer tar.gz sur github",
  "archive vers github",
  "envoyer code sur github sans git",
  "créer dépôt github depuis archive",
  "push github sans terminal",
  "upload rar github",
  "outil github français",
];

export interface FaqItem {
  question: string;
  answer: string;
}

/**
 * Questions fréquentes partagées entre la section visible de la page d'accueil
 * (`#faq`) et le bloc JSON-LD `FAQPage` : une seule source évite toute dérive
 * entre le texte affiché et les données structurées lues par les moteurs.
 */
export const FAQ_ITEMS: readonly FaqItem[] = [
  {
    question: "Comment mettre une archive .rar ou .zip sur GitHub sans utiliser Git ?",
    answer:
      "Connectez votre compte GitHub sur RepoDrop, glissez-déposez votre fichier .rar, .zip, .tar ou .tar.gz, vérifiez l'aperçu des fichiers extraits puis choisissez un nouveau dépôt ou un dépôt existant. RepoDrop crée le commit et pousse le code directement sous votre identité GitHub, sans terminal ni ligne de commande.",
  },
  {
    question: "Quels formats d'archives et quelles tailles sont pris en charge ?",
    answer:
      "RepoDrop accepte nativement les archives .rar (RAR4 et RAR5), .zip, .tar, .tar.gz et .tgz, détectées par leurs octets magiques côté serveur. Par défaut, une archive peut peser jusqu'à 200 Mo compressés (500 Mo décompressés et 20 000 fichiers).",
  },
  {
    question: "Mon jeton GitHub et mon code source privé sont-ils stockés ?",
    answer:
      "Non. Votre jeton OAuth GitHub est conservé uniquement dans un cookie httpOnly chiffré (JWE A256GCM) dans votre navigateur : il n'est jamais écrit en base de données ni dans les journaux. Les fichiers extraits résident dans un espace temporaire isolé puis sont purgés automatiquement après le push.",
  },
  {
    question: "Puis-je envoyer une archive vers un dépôt GitHub existant sans écraser mon travail ?",
    answer:
      "Oui. Vous pouvez créer un dépôt neuf (public ou privé), pousser sur une branche dédiée d'un dépôt existant afin de préserver la branche principale, ou choisir explicitement l'option de remplacement complet du code avec confirmation.",
  },
  {
    question: "Que deviennent le dossier racine unique et node_modules lors de l'import ?",
    answer:
      "Lorsque l'archive contient un unique dossier englobant (par exemple mon-projet/), RepoDrop propose de le retirer automatiquement pour placer vos fichiers directement à la racine du dépôt. Les dossiers node_modules, .git embarqués et fichiers système superflus (.DS_Store, __MACOSX) sont écartés par défaut.",
  },
];

/** Hôtes locaux ou non routables : ne représentent jamais un domaine public de prod. */
const LOCAL_OR_WILDCARD_HOSTS = new Set([
  "localhost",
  "127.0.0.1",
  "::1",
  "0.0.0.0",
  "::",
  "0:0:0:0:0:0:0:0",
  "",
]);

const NON_ROUTABLE_HOSTS = new Set(["0.0.0.0", "::", "0:0:0:0:0:0:0:0", ""]);

/** Validation stricte d'un en-tête `Host` (`hostname[:port]` ou `[ipv6][:port]`). */
const SAFE_HOST_RE =
  /^(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?(?:\.[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?)*|\[[0-9a-f:]+\])(?::\d{1,5})?$/i;

function firstHeaderValue(value: string | null | undefined): string {
  if (!value) return "";
  return value.split(",")[0]?.trim() ?? "";
}

function stripPort(host: string): string {
  if (host.startsWith("[")) {
    const end = host.indexOf("]");
    return end > 1 ? host.slice(1, end).toLowerCase() : "";
  }
  return host.split(":")[0]?.toLowerCase() ?? "";
}

function parseHttpOrigin(raw: string | undefined): URL | null {
  if (!raw) return null;
  try {
    const parsed = new URL(raw.trim());
    if (parsed.protocol !== "http:" && parsed.protocol !== "https:") return null;
    if (NON_ROUTABLE_HOSTS.has(stripPort(parsed.host))) return null;
    return parsed;
  } catch {
    return null;
  }
}

export interface ResolveSiteUrlOptions {
  /** Surcharge explicite d'`APP_URL` (utile pour les tests). */
  appUrl?: string;
  /** En-têtes HTTP de la requête courante (`next/headers`), en repli local/preview. */
  headers?: Pick<Headers, "get">;
}

/**
 * Détermine l'URL de base canonique du site (sans slash final, ex. `https://repodrop.fr`).
 */
export function resolveSiteUrl(opts: ResolveSiteUrlOptions = {}): string {
  const configured = parseHttpOrigin(
    opts.appUrl ?? process.env.APP_URL ?? config.appUrl,
  );

  // En production, un domaine public configuré dans APP_URL prime toujours sur
  // les en-têtes HTTP afin d'éviter toute injection d'hôte dans le SEO.
  if (configured && !LOCAL_OR_WILDCARD_HOSTS.has(stripPort(configured.host))) {
    return configured.origin;
  }

  if (opts.headers) {
    const candidates = [
      firstHeaderValue(opts.headers.get("x-forwarded-host")),
      firstHeaderValue(opts.headers.get("host")),
    ];
    const host = candidates.find(
      (h) =>
        Boolean(h) &&
        SAFE_HOST_RE.test(h) &&
        !NON_ROUTABLE_HOSTS.has(stripPort(h)),
    );

    if (host) {
      const fwdProto = firstHeaderValue(
        opts.headers.get("x-forwarded-proto"),
      ).toLowerCase();
      const proto =
        fwdProto === "https" || fwdProto === "http"
          ? fwdProto
          : configured?.protocol === "https:"
            ? "https"
            : "http";
      return `${proto}://${host.toLowerCase()}`;
    }
  }

  return configured?.origin ?? "http://localhost:3000";
}

/**
 * Plan de site (`/sitemap.xml`).
 *
 * Seules les pages publiques répondant `200 OK` sans session sont listées :
 * `/import`, `/repos`, `/jobs/*` et `/staff` redirigent vers `/login` ou sont
 * privées (`noindex`), ce que Google Search Console considère comme une erreur
 * si elles figurent dans un sitemap.
 */
export function buildSitemap(
  baseUrl: string,
  now: Date = new Date(),
): MetadataRoute.Sitemap {
  const origin = baseUrl.replace(/\/+$/, "");
  return [
    {
      url: origin,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${origin}/login`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.5,
    },
  ];
}

/**
 * Règles d'exploration (`/robots.txt`).
 *
 * Note importante : `/_next/` n'est volontairement PAS bloqué afin que Googlebot
 * puisse charger les feuilles de style et scripts nécessaires au rendu mobile.
 */
export function buildRobots(baseUrl: string): MetadataRoute.Robots {
  const origin = baseUrl.replace(/\/+$/, "");
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/import", "/repos", "/jobs/", "/staff"],
      },
    ],
    sitemap: `${origin}/sitemap.xml`,
  };
}

/** Manifeste Web App (`/manifest.webmanifest`). */
export function buildManifest(): MetadataRoute.Manifest {
  return {
    name: SITE_DEFAULT_TITLE,
    short_name: SITE_NAME,
    description: SITE_DESCRIPTION,
    start_url: "/",
    scope: "/",
    display: "standalone",
    background_color: "#080b12",
    theme_color: "#080b12",
    lang: "fr",
    categories: ["developer tools", "productivity", "utilities"],
    icons: [
      {
        src: "/icon.svg",
        sizes: "any",
        type: "image/svg+xml",
        purpose: "any",
      },
    ],
  };
}

/**
 * Données structurées Schema.org (`@graph` : `WebSite`, `WebApplication`, `FAQPage`)
 * destinées à la page d'accueil.
 */
export function buildStructuredData(baseUrl: string) {
  const origin = baseUrl.replace(/\/+$/, "");
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${origin}/#website`,
        url: origin,
        name: SITE_NAME,
        description: SITE_DESCRIPTION,
        inLanguage: "fr-FR",
      },
      {
        "@type": "WebApplication",
        "@id": `${origin}/#app`,
        name: SITE_NAME,
        url: origin,
        applicationCategory: "DeveloperApplication",
        operatingSystem: "All",
        browserRequirements: "Requires JavaScript",
        inLanguage: "fr-FR",
        description: SITE_DESCRIPTION,
        image: `${origin}/opengraph-image`,
        offers: {
          "@type": "Offer",
          price: "0",
          priceCurrency: "EUR",
        },
        featureList: [
          "Import d'archives .rar (RAR4/RAR5), .zip, .tar et .tar.gz vers GitHub",
          "Extraction sandboxée anti zip-slip et anti bombes de décompression",
          "Aperçu complet de l'arborescence avant le push",
          "Création de dépôt GitHub public ou privé et push sur branche dédiée",
          "Jeton OAuth GitHub chiffré côté client (cookie httpOnly JWE), jamais stocké en base",
        ],
      },
      {
        "@type": "FAQPage",
        "@id": `${origin}/#faq`,
        url: `${origin}/#faq`,
        inLanguage: "fr-FR",
        mainEntity: FAQ_ITEMS.map((item) => ({
          "@type": "Question",
          name: item.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: item.answer,
          },
        })),
      },
    ],
  };
}

/**
 * Sérialise un objet JSON-LD pour injection dans `<script type="application/ld+json">`
 * en échappant `<`, `>` et `&` afin d'empêcher toute fermeture prématurée de balise.
 */
export function serializeJsonLd(data: unknown): string {
  return JSON.stringify(data)
    .replace(/</g, "\\u003c")
    .replace(/>/g, "\\u003e")
    .replace(/&/g, "\\u0026");
}
