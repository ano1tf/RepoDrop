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
 * Emplacement public du compte X/Twitter. Vide par défaut : on n'émet alors
 * **aucune** balise `twitter:site` / `twitter:creator` plutôt qu'une valeur
 * inventée, qui ferait attribuer les aperçus de partage à un compte tiers.
 */
export const SITE_TWITTER_HANDLE = process.env.NEXT_PUBLIC_TWITTER_HANDLE ?? "";

/**
 * Jeton de vérification Google Search Console (`<meta name="google-site-verification">`).
 *
 * Posé en dur plutôt qu'en variable d'environnement : ce n'est **pas** un secret
 * (il est publié dans le HTML de chaque page) et il doit être identique sur tous
 * les déploiements, sinon la propriété vérifiée ne correspond plus au domaine
 * servi. Surchargeable par `GOOGLE_SITE_VERIFICATION` pour un déploiement de
 * test qui doit rester sur son propre jeton.
 */
export const SITE_GOOGLE_SITE_VERIFICATION =
  process.env.GOOGLE_SITE_VERIFICATION ?? "7AQ_yCc-DFuI95AFEHuKT6a3Pi5xPaS9YFqr7oop7ko";

/**
 * Bloc `verification` des métadonnées Next.js : émet les balises
 * `<meta name="…-site-verification" content="…">`. Un jeton vide est omis
 * plutôt qu'émis vide, ce que Search Console rejetterait.
 */
export function buildVerification(): Metadata["verification"] {
  const google = SITE_GOOGLE_SITE_VERIFICATION.trim();
  return google ? { google } : undefined;
}

/**
 * Date de dernière modification éditoriale du site, au format ISO `AAAA-MM-JJ`.
 *
 * À **remonter à la main** quand le contenu des pages listées change. C'est ce
 * qui donne un `lastmod` crédible dans `/sitemap.xml` : un `lastmod` recalculé à
 * chaque requête (ou à chaque build) annonce au moteur que tout le site change
 * en permanence, et la balise finit purement ignorée. `SOURCE_DATE_EPOCH`
 * (norme reproductible) permet de la surcharger depuis la CI.
 */
export const SITE_CONTENT_LAST_MODIFIED = "2026-11-07";

/**
 * Icônes servies au navigateur, aux moteurs et aux systèmes (installe PWA).
 *
 * `icon.svg` reste la source de vérité visuelle ; les PNG en sont dérivés et
 * versionnés dans `public/icons/` car ni Google (résultats enrichis
 * `Organization.logo`, qui exige un raster ≥ 112 px) ni iOS (`apple-touch-icon`)
 * ne lisent correctement un favicon SVG. Le PNG *maskable* garde une marge de
 * 12,5 % pour que l'icône survive au rognage Android.
 */
export const SITE_ICONS = {
  svg: "/icon.svg",
  png192: "/icons/icon-192.png",
  png512: "/icons/icon-512.png",
  maskable512: "/icons/icon-maskable-512.png",
  appleTouch: "/apple-icon.png",
  /** Raster carré utilisé comme `logo` dans les données structurées. */
  structuredDataLogo: "/icons/icon-512.png",
} as const;

/**
 * Métadonnées complètes d'une page publique indexable (canonique, icônes,
 * OpenGraph, Twitter Card) afin que chaque segment feuille conserve
 * `og:image` résolu contre `metadataBase` (y compris derrière un proxy).
 *
 * `noIndex: true` produit une page complète en partage (titre, description,
 * image) mais explicitement exclue de l'indexation : c'est le bon réglage pour
 * une page de connexion, utile à qui reçoit le lien sans polluer les résultats
 * de recherche avec un écran sans contenu propre.
 */
export function buildPageMetadata(opts: {
  title?: string;
  description?: string;
  path: string;
  noIndex?: boolean;
  /**
   * Titre complet déjà localisé (accueil multilingue) : il remplace le titre
   * par défaut et n'est pas recomposé avec le gabarit `%s · RepoDrop`.
   */
  overrideTitle?: string;
  /** Locale OpenGraph de la page (`fr_FR`, `en_US`…), `fr_FR` par défaut. */
  ogLocale?: string;
}): Metadata {
  const fullTitle = opts.title
    ? `${opts.title} · ${SITE_NAME}`
    : (opts.overrideTitle ?? SITE_DEFAULT_TITLE);
  const description = opts.description ?? SITE_DESCRIPTION;

  return {
    ...(opts.title ? { title: opts.title } : {}),
    ...(opts.overrideTitle ? { title: { absolute: opts.overrideTitle } } : {}),
    description,
    alternates: {
      canonical: opts.path,
    },
    icons: buildIcons(),
    ...(opts.noIndex ? { robots: { index: false, follow: true } } : {}),
    openGraph: {
      type: "website",
      locale: opts.ogLocale ?? "fr_FR",
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
      ...twitterHandleFields(),
    },
  };
}

/**
 * Balises `<link rel="icon">` / `apple-touch-icon` d'une page.
 *
 * Next.js pose déjà l'icône SVG détectée par convention de fichier
 * (`app/icon.svg`) ; on déclare en plus les PNG, sans quoi les navigateurs qui
 * ignorent le SVG (Safari ancien, écran d'accueil iOS) n'affichent qu'un cadre
 * vide, et Google n'a aucun raster à proposer comme logo de site.
 */
export function buildIcons(): Metadata["icons"] {
  return {
    icon: [
      { url: SITE_ICONS.svg, type: "image/svg+xml", sizes: "any" },
      { url: SITE_ICONS.png192, type: "image/png", sizes: "192x192" },
      { url: SITE_ICONS.png512, type: "image/png", sizes: "512x512" },
    ],
    shortcut: [SITE_ICONS.svg],
    apple: [
      { url: SITE_ICONS.appleTouch, type: "image/png", sizes: "180x180" },
    ],
  };
}

/**
 * Champs `twitter:site` / `twitter:creator`, émis **seulement** si un compte
 * est configuré (`NEXT_PUBLIC_TWITTER_HANDLE`). Un handle par défaut inventé
 * ferait créditer les partages à un tiers.
 */
export function twitterHandleFields(): {
  site?: string;
  creator?: string;
} {
  const handle = SITE_TWITTER_HANDLE.trim().replace(/^@/, "");
  if (!handle) return {};
  const at = `@${handle}`;
  return { site: at, creator: at };
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

/**
 * `lastmod` du plan de site, déterministe :
 *   1. `SOURCE_DATE_EPOCH` (secondes Unix) s'il est valide — builds reproductibles ;
 *   2. sinon `SITE_CONTENT_LAST_MODIFIED`.
 * Une valeur absurde (epoch négatif, NaN, date invalide) retombe sur la
 * constante plutôt que de produire un `<lastmod>Invalid Date</lastmod>`.
 */
export function resolveContentLastModified(
  env: Record<string, string | undefined> = process.env,
): Date {
  const epoch = Number(env.SOURCE_DATE_EPOCH);
  if (Number.isFinite(epoch) && epoch > 0) {
    const fromEpoch = new Date(epoch * 1000);
    if (!Number.isNaN(fromEpoch.getTime())) return fromEpoch;
  }
  const fallback = new Date(`${SITE_CONTENT_LAST_MODIFIED}T00:00:00.000Z`);
  return Number.isNaN(fallback.getTime()) ? new Date(0) : fallback;
}

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
 *
 * `lastModified` vaut par défaut la date éditoriale du site (ou
 * `SOURCE_DATE_EPOCH`), **jamais** `new Date()` : voir
 * `SITE_CONTENT_LAST_MODIFIED`.
 */
export function buildSitemap(
  baseUrl: string,
  lastModified: Date = resolveContentLastModified(),
): MetadataRoute.Sitemap {
  const now = lastModified;
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

/**
 * Manifeste Web App (`/manifest.webmanifest`).
 *
 * Les PNG sont nécessaires : Chrome refuse d'installer une PWA dont le
 * manifeste ne fournit que du SVG. Le *maskable* est déclaré séparément (et non
 * en `purpose: "any maskable"` sur la même entrée) pour que le rognage Android
 * s'applique à la version déjà margée.
 */
export function buildManifest(
  /**
   * Traductions du manifeste : le nom et la description de l'application
   * installée suivent la langue de la visite (le reste — icônes, couleurs,
   * portée — ne dépend pas d'elle).
   */
  content: { locale?: string; name?: string; description?: string } = {},
): MetadataRoute.Manifest {
  return {
    name: content.name ?? SITE_DEFAULT_TITLE,
    short_name: SITE_NAME,
    description: content.description ?? SITE_DESCRIPTION,
    start_url: "/",
    scope: "/",
    display: "standalone",
    background_color: "#080b12",
    theme_color: "#080b12",
    lang: content.locale ?? "fr",
    categories: ["developer tools", "productivity", "utilities"],
    icons: [
      {
        src: SITE_ICONS.svg,
        sizes: "any",
        type: "image/svg+xml",
        purpose: "any",
      },
      {
        src: SITE_ICONS.png192,
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: SITE_ICONS.png512,
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
      {
        src: SITE_ICONS.maskable512,
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}

/**
 * Données structurées Schema.org destinées à la page d'accueil.
 *
 * `@graph` plutôt que des blocs séparés : les nœuds se référencent par `@id`,
 * ce qui évite à Google de voir plusieurs entités concurrentes pour un même
 * site. Dépendances utiles aux résultats enrichis :
 *
 * - `Organization` fournit le `logo` (raster carré) et les `sameAs` (profils
 *   officiels) : sans ce nœud, Google n'a aucun logo de site à afficher ;
 * - `WebPage` relie la page au site (`isPartOf`) et à l'application
 *   (`mainEntity`) — c'est le nœud attendu pour un `BreadcrumbList` ultérieur ;
 * - `WebApplication` reste le nœud principal de la page, l'entité à propos de
 *   laquelle la page existe.
 */
export function buildStructuredData(
  baseUrl: string,
  /**
   * Contenu localisé : titres, description et FAQ de la langue rendue. Par
   * défaut, le français — le comportement d'origine est donc préservé.
   *
   * `inLanguage` suit `locale` : sans cela, une page rendue en japonais
   * déclarait `inLanguage: "fr"`, ce qui n'aide pas les moteurs à comprendre
   * qu'il s'agit de la même entité traduite.
   */
  content: {
    locale?: string;
    title?: string;
    description?: string;
    faq?: readonly FaqItem[];
  } = {},
) {
  const origin = baseUrl.replace(/\/+$/, "");
  const lang = content.locale ?? "fr";
  const title = content.title ?? SITE_DEFAULT_TITLE;
  const description = content.description ?? SITE_DESCRIPTION;
  const faq = content.faq ?? FAQ_ITEMS;
  const graph: Record<string, unknown>[] = [
    {
      "@type": "Organization",
      "@id": `${origin}/#organization`,
      name: SITE_NAME,
      url: origin,
      logo: {
        "@type": "ImageObject",
        "@id": `${origin}/#logo`,
        url: `${origin}${SITE_ICONS.structuredDataLogo}`,
        contentUrl: `${origin}${SITE_ICONS.structuredDataLogo}`,
        width: 512,
        height: 512,
        caption: SITE_NAME,
      },
      // Référence inline (et non `{ "@id": ... }`) : une référence par `@id`
      // seule exigerait un nœud `ImageObject` séparé, or Google lit le logo
      // directement sur l'Organization. Évite un pointeur orphelin.
      image: `${origin}${SITE_ICONS.structuredDataLogo}`,
    },
    {
      "@type": "WebSite",
      "@id": `${origin}/#website`,
      url: origin,
      name: SITE_NAME,
      description,
      inLanguage: lang,
      publisher: { "@id": `${origin}/#organization` },
    },
    {
      "@type": "WebPage",
      "@id": `${origin}/#webpage`,
      url: origin,
      name: title,
      description,
      inLanguage: lang,
      isPartOf: { "@id": `${origin}/#website` },
      about: { "@id": `${origin}/#app` },
      primaryImageOfPage: { "@id": `${origin}/#primaryimage` },
    },
    {
      "@type": "ImageObject",
      "@id": `${origin}/#primaryimage`,
      url: `${origin}${SITE_OG_IMAGE.url}`,
      contentUrl: `${origin}${SITE_OG_IMAGE.url}`,
      width: SITE_OG_IMAGE.width,
      height: SITE_OG_IMAGE.height,
      caption: SITE_OG_IMAGE.alt,
    },
    {
      "@type": "WebApplication",
      "@id": `${origin}/#app`,
      name: SITE_NAME,
      url: `${origin}/`,
      applicationCategory: "DeveloperApplication",
      operatingSystem: "All",
      browserRequirements: "Requires JavaScript",
      inLanguage: lang,
      description,
      image: `${origin}${SITE_OG_IMAGE.url}`,
      isPartOf: { "@id": `${origin}/#website` },
      publisher: { "@id": `${origin}/#organization` },
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
      inLanguage: lang,
      isPartOf: { "@id": `${origin}/#webpage` },
      mainEntity: faq.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: item.answer,
        },
      })),
    },
  ];

  return {
    "@context": "https://schema.org",
    "@graph": graph,
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
