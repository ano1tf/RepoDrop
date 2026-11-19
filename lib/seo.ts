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
import { DEFAULT_LOCALE, type Locale } from "./i18n/locales";
import { localizePath } from "./i18n/navigation";

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
  alt: "RepoDrop · .rar / .zip / .tar → GitHub",
} as const;

/**
 * Image de carte Twitter/X (`twitter:image`).
 *
 * `alt` : les lecteurs d'écran et certains agrégateurs lisent
 * `twitter:image:alt` ; sans lui, l'image de partage est un cadre muet. On
 * réutilise l'alt de l'aperçu OpenGraph : un seul texte à maintenir.
 * `width`/`height` : mêmes dimensions que l'aperçu OpenGraph, pour que les
 * agrégateurs calculent le ratio sans recalcul.
 */
export const SITE_TWITTER_IMAGE = {
  url: "/twitter-image",
  width: SITE_OG_IMAGE.width,
  height: SITE_OG_IMAGE.height,
  alt: SITE_OG_IMAGE.alt,
} as const;

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
 * Jeton de vérification Bing Webmaster Tools (`<meta name="msvalidate.01">`).
 *
 * Vide par défaut : Bing n'exige pas de jeton pour indexer, et émettre une
 * balise vide serait rejeté. `BING_SITE_VERIFICATION` permet d'activer la
 * vérification de propriété lorsque l'on gère le site dans Bing.
 */
export const SITE_BING_SITE_VERIFICATION =
  process.env.BING_SITE_VERIFICATION ?? "";

/**
 * Bloc `verification` des métadonnées Next.js : émet les balises
 * `<meta name="…-site-verification" content="…">`. Un jeton vide est omis
 * plutôt qu'émis vide, ce que Search Console / Bing rejetteraient.
 *
 * Bing passe par le champ `other` de Next.js, qui émet
 * `<meta name="msvalidate.01" content="…">` — la balise attendue par Bing
 * Webmaster Tools.
 */
export function buildVerification(): Metadata["verification"] {
  const google = SITE_GOOGLE_SITE_VERIFICATION.trim();
  const bing = SITE_BING_SITE_VERIFICATION.trim();

  const verification: NonNullable<Metadata["verification"]> = {};
  if (google) verification.google = google;
  if (bing) verification.other = { "msvalidate.01": bing };
  return Object.keys(verification).length > 0 ? verification : undefined;
}

/**
 * Profils officiels reliés à l'entité `Organization` par `sameAs`.
 *
 * Vide par défaut : on n'émet **aucune** balise plutôt qu'une URL inventée,
 * qui associerait RepoDrop à un profil tiers. Chaque variable doit être une
 * URL absolue http/https valide ; une valeur malformée est ignorée plutôt
 * que publiée dans le JSON-LD.
 */
export const SITE_SAME_AS: readonly string[] = [
  process.env.NEXT_PUBLIC_GITHUB_URL,
  process.env.NEXT_PUBLIC_DISCORD_URL,
  process.env.NEXT_PUBLIC_TWITTER_URL,
].filter((url): url is string => isPublicUrl(url));

/** Validé : URL absolue http/https, sans espace ni jeton. */
function isPublicUrl(raw: string | undefined): raw is string {
  if (!raw) return false;
  try {
    const parsed = new URL(raw.trim());
    return parsed.protocol === "http:" || parsed.protocol === "https:";
  } catch {
    return false;
  }
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
  /** Mots-clés spécifiques à la page (écrits par-dessus les mots-clés globaux). */
  keywords?: string[];
  /** Type OpenGraph : `article` pour une page de contenu, `website` par défaut. */
  ogType?: "website" | "article";
  /** Balises `article:*` OpenGraph (pages de contenu datées). */
  article?: {
    publishedTime?: string;
    modifiedTime?: string;
    section?: string;
    tags?: string[];
  };
  /**
   * Lien de navigation séquentiel (`rel="prev"` / `rel="next"`). Les moteurs
   * l'utilisent pour reconstituer la structure d'une série de contenus
   * (index de guides) et consolident le maillage interne. Next.js l'émet
   * via `metadata.pagination`.
   */
  prev?: string;
  next?: string;
}): Metadata {
  const fullTitle = opts.title
    ? `${opts.title} · ${SITE_NAME}`
    : (opts.overrideTitle ?? SITE_DEFAULT_TITLE);
  const description = opts.description ?? SITE_DESCRIPTION;

  return {
    ...(opts.title ? { title: opts.title } : {}),
    ...(opts.overrideTitle ? { title: { absolute: opts.overrideTitle } } : {}),
    description,
    ...(opts.keywords?.length ? { keywords: opts.keywords } : {}),
    alternates: {
      canonical: opts.path,
    },
    ...(opts.prev || opts.next
      ? {
          pagination: {
            ...(opts.prev ? { previous: opts.prev } : {}),
            ...(opts.next ? { next: opts.next } : {}),
          },
        }
      : {}),
    icons: buildIcons(),
    ...(opts.noIndex ? { robots: { index: false, follow: true } } : {}),
    openGraph: {
      type: opts.ogType ?? "website",
      locale: opts.ogLocale ?? "fr_FR",
      siteName: SITE_NAME,
      url: opts.path,
      title: fullTitle,
      description,
      images: [SITE_OG_IMAGE],
      ...(opts.article
        ? {
            article: {
              ...(opts.article.publishedTime
                ? { publishedTime: opts.article.publishedTime }
                : {}),
              ...(opts.article.modifiedTime
                ? { modifiedTime: opts.article.modifiedTime }
                : {}),
              ...(opts.article.section
                ? { section: opts.article.section }
                : {}),
              ...(opts.article.tags?.length
                ? { tags: opts.article.tags }
                : {}),
            },
          }
        : {}),
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
 * Seules les pages publiques répondant `200 OK` sans session **et indexables**
 * sont listées : `/import`, `/repos`, `/jobs/*` et `/staff` redirigent vers
 * `/login` ou sont privées. `/login` est `noindex` : une URL `noindex` dans le
 * sitemap est signalée comme une erreur par Google Search Console (« Submitted
 * URL has meta noindex »), elle n'y figure donc **pas**.
 *
 * `lastModified` vaut par défaut la date éditoriale du site (ou
 * `SOURCE_DATE_EPOCH`), **jamais** `new Date()` : voir
 * `SITE_CONTENT_LAST_MODIFIED`.
 */
export interface SitemapExtraPage {
  url: string;
  lastModified?: Date;
  changeFrequency?: MetadataRoute.Sitemap[number]["changeFrequency"];
  priority?: number;
  /** Images associées à la page (sitemap d'images intégré). */
  images?: string[];
}

export function buildSitemap(
  baseUrl: string,
  lastModified: Date = resolveContentLastModified(),
  pages: readonly SitemapExtraPage[] = [],
): MetadataRoute.Sitemap {
  const now = lastModified;
  const origin = baseUrl.replace(/\/+$/, "");
  return [
    {
      url: origin,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
      images: [`${origin}${SITE_OG_IMAGE.url}`],
    },
    ...pages.map((p) => ({
      url: p.url,
      ...(p.lastModified ? { lastModified: p.lastModified } : {}),
      ...(p.changeFrequency ? { changeFrequency: p.changeFrequency } : {}),
      ...(p.priority !== undefined ? { priority: p.priority } : {}),
      ...(p.images ? { images: p.images } : {}),
    })),
  ];
}

/**
 * En-tête `X-Robots-Tag` pour les routes non indexables.
 *
 * Les pages privées posent déjà une balise méta `noindex` ; cet en-tête est
 * une **seconde barrière** au niveau HTTP, indépendante du HTML : un moteur
 * qui ignorerait la balise méta (ou un crawler simplifié) voit la directive
 * directement dans la réponse. Appliqué aux routes privées de `next.config.ts`.
 */
export function buildNoIndexHeaders(): { key: string; value: string }[] {
  return [{ key: "X-Robots-Tag", value: "noindex, nofollow" }];
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
export function buildManifest(copy?: Pick<MetadataRoute.Manifest, "name" | "description" | "lang" | "dir" | "start_url">): MetadataRoute.Manifest {
  return {
    name: SITE_DEFAULT_TITLE,
    short_name: SITE_NAME,
    description: SITE_DESCRIPTION,
    start_url: "/",
    id: "/",
    scope: "/",
    display: "standalone",
    background_color: "#080b12",
    theme_color: "#080b12",
    lang: DEFAULT_LOCALE,
    ...copy,
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
 *   officiels, s'ils sont configurés) : sans ce nœud, Google n'a aucun logo
 *   de site à afficher ;
 * - `WebPage` relie la page au site (`isPartOf`) et à l'application
 *   (`mainEntity`), et pointe vers le `BreadcrumbList` (`breadcrumb`) ;
 * - `WebApplication` reste le nœud principal de la page, l'entité à propos de
 *   laquelle la page existe ;
 * - `BreadcrumbList` : piste de navigation explicite pour les moteurs, même
 *   sur une page d'accueil où elle ne contient qu'une entrée.
 */
export function buildStructuredData(
  baseUrl: string,
  /**
   * Contenu localisé : titres, description et FAQ de la langue rendue. Par
   * défaut, le français — le comportement d'origine est donc préservé.
   */
  content: {
    locale?: string;
    title?: string;
    description?: string;
    faq?: readonly FaqItem[];
    /** Étapes pas à pas (alimente le JSON-LD `HowTo` de la page). */
    steps?: readonly string[];
    features?: readonly string[];
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
      description,
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
      // Profils officiels : absence de valeur par défaut (voir `SITE_SAME_AS`),
      // une URL inventée associerait RepoDrop à un compte tiers.
      ...(SITE_SAME_AS.length > 0 ? { sameAs: SITE_SAME_AS } : {}),
    },
    {
      "@type": "WebSite",
      "@id": `${origin}/#website`,
      url: origin,
      name: SITE_NAME,
      description,
      inLanguage: lang,
      publisher: { "@id": `${origin}/#organization` },
      // Sitelinks Search Box : une page de recherche intégrée permet à
      // Google d'afficher une barre de recherche enrichie dans les résultats.
      potentialAction: buildSearchAction(origin),
    },
    {
      "@type": "WebPage",
      "@id": `${origin}/#webpage`,
      url: origin,
      name: title,
      headline: title,
      description,
      inLanguage: lang,
      // Dates éditoriale, pas l'heure de la requête : un `dateModified` qui
      // bouge à chaque crawl est ignoré par les moteurs.
      datePublished: SITE_CONTENT_LAST_MODIFIED,
      dateModified: SITE_CONTENT_LAST_MODIFIED,
      // Dernière révision éditoriale (même date que `dateModified` : le
      // contenu de la page a été revu à cette date).
      lastReviewed: SITE_CONTENT_LAST_MODIFIED,
      isPartOf: { "@id": `${origin}/#website` },
      about: { "@id": `${origin}/#app` },
      // Entité principale de la page : l'application elle-même.
      mainEntity: { "@id": `${origin}/#app` },
      primaryImageOfPage: { "@id": `${origin}/#primaryimage` },
      // Piste de navigation pour les moteurs (un seul niveau sur l'accueil).
      breadcrumb: { "@id": `${origin}/#breadcrumb` },
    },
    {
      "@type": "ImageObject",
      "@id": `${origin}/#primaryimage`,
      url: `${origin}${SITE_OG_IMAGE.url}`,
      contentUrl: `${origin}${SITE_OG_IMAGE.url}`,
      width: SITE_OG_IMAGE.width,
      height: SITE_OG_IMAGE.height,
      caption: SITE_OG_IMAGE.alt,
      // Image représentative de la page (image de partage principale).
      representativeOfPage: true,
    },
    {
      "@type": "WebApplication",
      "@id": `${origin}/#app`,
      name: SITE_NAME,
      url: `${origin}/`,
      applicationCategory: "DeveloperApplication",
      operatingSystem: "All",
      browserRequirements: "JavaScript",
      inLanguage: lang,
      description,
      image: `${origin}${SITE_OG_IMAGE.url}`,
      // Aperçu visuel de l'application pour les résultats enrichis : l'image
      // OpenGraph sert de screenshot (même dimensions, déjà statique).
      screenshot: {
        url: `${origin}${SITE_OG_IMAGE.url}`,
        caption: SITE_OG_IMAGE.alt,
        width: SITE_OG_IMAGE.width,
        height: SITE_OG_IMAGE.height,
      },
      isPartOf: { "@id": `${origin}/#website` },
      publisher: { "@id": `${origin}/#organization` },
      // Gratuit : propriété explicite pour les résultats enrichis d'application.
      isAccessibleForFree: true,
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "EUR",
        // Disponibilité explicite : une offre sans `availability` est
        // parfois considérée comme incertaine par les moteurs.
        availability: "https://schema.org/InStock",
      },
      featureList: content.features ?? [
        "Import d'archives .rar (RAR4/RAR5), .zip, .tar et .tar.gz vers GitHub",
        "Extraction sandboxée anti zip-slip et anti bombes de décompression",
        "Aperçu complet de l'arborescence avant le push",
        "Création de dépôt GitHub public ou privé et push sur branche dédiée",
        "Jeton OAuth GitHub chiffré côté client (cookie httpOnly JWE), jamais stocké en base",
      ],
    },
    // HowTo : les étapes « Comment ça marche » de l'accueil alimentent un
    // résultat enrichi « comment faire » (seulement si des étapes sont fournies).
    ...(content.steps && content.steps.length > 0
      ? [
          {
            "@type": "HowTo",
            "@id": `${origin}/#howto`,
            name: title,
            description,
            inLanguage: lang,
            step: content.steps.map((text, i) => ({
              "@type": "HowToStep",
              position: i + 1,
              name: lang === DEFAULT_LOCALE ? `Étape ${i + 1}` : text,
              text,
            })),
          },
        ]
      : []),
    {
      "@type": "FAQPage",
      "@id": `${origin}/#faq`,
      url: `${origin}/#faq`,
      inLanguage: lang,
      // Date éditoriale, jamais l'heure de la requête (voir SITE_CONTENT_LAST_MODIFIED).
      dateModified: SITE_CONTENT_LAST_MODIFIED,
      isPartOf: { "@id": `${origin}/#webpage` },
      mainEntity: faq.map((item) => ({
        "@type": "Question",
        name: item.question,
        // Dates éditoriales (voir SITE_CONTENT_LAST_MODIFIED), jamais l'heure
        // de la requête : elles donnent un `datePublished` crédible aux
        // questions et un `dateModified` aux réponses.
        datePublished: SITE_CONTENT_LAST_MODIFIED,
        acceptedAnswer: {
          "@type": "Answer",
          text: item.answer,
          dateModified: SITE_CONTENT_LAST_MODIFIED,
        },
      })),
    },
    {
      "@type": "BreadcrumbList",
      "@id": `${origin}/#breadcrumb`,
      inLanguage: lang,
      isPartOf: { "@id": `${origin}/#webpage` },
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: SITE_NAME,
          item: origin,
        },
      ],
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

/**
 * Données structurées de la **page « À propos »** : `AboutPage` +
 * `Organization` + `BreadcrumbList`.
 *
 * L'`AboutPage` rattache la page à l'entité `Organization` (via `about`)
 * et alimente la crédibilité du site auprès des moteurs (E-E-A-T :
 * expérience, expertise, autorité, confiance).
 */
export function buildAboutStructuredData(
  origin: string,
  opts: {
    title: string;
    description: string;
    /** Breadcrumbs. */
    breadcrumbs: readonly BreadcrumbItem[];
    /** Langue du contenu (`fr` par défaut). */
    inLanguage?: string;
  },
): Record<string, unknown> {
  const originClean = origin.replace(/\/+$/, "");
  const lang = opts.inLanguage ?? "fr";
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "AboutPage",
        "@id": `${originClean}/#about`,
        url: `${originClean}/a-propos`,
        name: opts.title,
        description: opts.description,
        inLanguage: lang,
        datePublished: SITE_CONTENT_LAST_MODIFIED,
        dateModified: SITE_CONTENT_LAST_MODIFIED,
        about: { "@id": `${originClean}/#organization` },
        mainEntity: { "@id": `${originClean}/#organization` },
      },
      {
        "@type": "Organization",
        "@id": `${originClean}/#organization`,
        name: SITE_NAME,
        url: originClean,
        description: opts.description,
        logo: {
          "@type": "ImageObject",
          url: `${originClean}${SITE_ICONS.structuredDataLogo}`,
          width: 512,
          height: 512,
        },
        image: `${originClean}${SITE_ICONS.structuredDataLogo}`,
      },
      buildBreadcrumbList(origin, opts.breadcrumbs),
    ],
  };
}

/* ============================================================ pages de contenu */

export interface BreadcrumbItem {
  name: string;
  path: string;
}

/**
 * BreadcrumbList pour une page de contenu (guide, FAQ).
 *
 * Les chemins sont des URLs absolues résolues contre l'origine canonique :
 * les moteurs exigent des `item` absolues pour afficher la piste de
 * navigation dans les résultats.
 */
export function buildBreadcrumbList(
  origin: string,
  items: readonly BreadcrumbItem[],
): Record<string, unknown> {
  const originClean = origin.replace(/\/+$/, "");
  return {
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: item.path.startsWith("http")
        ? item.path
        : `${originClean}${item.path}`,
    })),
  };
}

/**
 * Données structurées d'une **page guide** : Article + HowTo + FAQPage +
 * BreadcrumbList, dans un seul graphe lié par `@id`.
 *
 * `Article` donne au moteur un contenu éditorial daté (datePublished /
 * dateModified éditoriales, jamais l'heure de la requête) ; `HowTo` permet
 * l'apparition en résultats enrichis « comment faire » ; `FAQPage` cible
 * les extraits FAQ ; `BreadcrumbList` alimente la piste de navigation.
 */
export function buildArticleStructuredData(opts: {
  origin: string;
  title: string;
  description: string;
  /** Date ISO `AAAA-MM-JJ` (contenu éditorial, pas la requête). */
  datePublished: string;
  dateModified: string;
  /** Mots-clés de la page. */
  keywords?: readonly string[];
  /** Étapes pas à pas (HowTo). */
  steps?: readonly string[];
  /** FAQ locale (FAQPage). */
  faq?: readonly { question: string; answer: string }[];
  /** Breadcrumbs. */
  breadcrumbs?: readonly BreadcrumbItem[];
  /** Langue du contenu (`fr` par défaut). */
  inLanguage?: string;
}): Record<string, unknown> {
  const originClean = opts.origin.replace(/\/+$/, "");
  const lang = opts.inLanguage ?? "fr";
  const graph: Record<string, unknown>[] = [
    {
      "@type": "Article",
      "@id": `${originClean}/#article`,
      headline: opts.title,
      name: opts.title,
      description: opts.description,
      inLanguage: lang,
      datePublished: opts.datePublished,
      dateModified: opts.dateModified,
      mainEntityOfPage: { "@type": "WebPage", "@id": `${originClean}/#article` },
      image: `${originClean}${SITE_OG_IMAGE.url}`,
      author: { "@type": "Organization", name: SITE_NAME },
      publisher: {
        "@type": "Organization",
        name: SITE_NAME,
        logo: {
          "@type": "ImageObject",
          url: `${originClean}${SITE_ICONS.structuredDataLogo}`,
          width: 512,
          height: 512,
        },
      },
      ...(opts.keywords?.length ? { keywords: opts.keywords.join(", ") } : {}),
    },
  ];

  if (opts.steps && opts.steps.length > 0) {
    graph.push({
      "@type": "HowTo",
      "@id": `${originClean}/#howto`,
      name: opts.title,
      description: opts.description,
      inLanguage: lang,
      step: opts.steps.map((text, i) => ({
        "@type": "HowToStep",
        position: i + 1,
        name: lang === DEFAULT_LOCALE ? `Étape ${i + 1}` : text,
        text,
      })),
    });
  }

  if (opts.faq && opts.faq.length > 0) {
    graph.push({
      "@type": "FAQPage",
      "@id": `${originClean}/#faq`,
      inLanguage: lang,
      dateModified: opts.dateModified,
      mainEntity: opts.faq.map((item) => ({
        "@type": "Question",
        name: item.question,
        datePublished: opts.datePublished,
        acceptedAnswer: {
          "@type": "Answer",
          text: item.answer,
          dateModified: opts.dateModified,
        },
      })),
    });
  }

  if (opts.breadcrumbs && opts.breadcrumbs.length > 0) {
    graph.push(buildBreadcrumbList(opts.origin, opts.breadcrumbs));
  }

  return {
    "@context": "https://schema.org",
    "@graph": graph,
  };
}

/**
 * Données structurées de la **page d'index des guides** : ItemList listant
 * les guides, avec breadcrumb. Aide les moteurs à découvrir et hiérarchiser
 * l'ensemble du contenu éditorial.
 */
export function buildGuidesIndexStructuredData(
  origin: string,
  guides: readonly { title: string; slug: string; description: string }[],
  breadcrumbs: readonly BreadcrumbItem[],
  copy?: { name: string; description: string; locale: string },
): Record<string, unknown> {
  const originClean = origin.replace(/\/+$/, "");
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ItemList",
        "@id": `${originClean}/#guides`,
        name: copy?.name ?? "Guides RepoDrop",
        inLanguage: copy?.locale ?? "fr",
        description: copy?.description ??
          "Tutoriels pas à pas pour importer vos archives .rar, .zip et .tar sur GitHub.",
        numberOfItems: guides.length,
        itemListElement: guides.map((g, i) => ({
          "@type": "ListItem",
          position: i + 1,
          name: g.title,
          description: g.description,
          item: `${originClean}/guides/${g.slug}`,
        })),
      },
      buildBreadcrumbList(origin, breadcrumbs),
    ],
  };
}

/**
 * Sitelinks Search Box : cible une page de recherche intégrée
 * (`/recherche?q={search_term_string}`). Quand le site a une page de
 * recherche fonctionnelle, Google peut afficher une barre de recherche
 * enrichie dans les résultats — un gain de visibilité notable.
 */
export function buildSearchAction(origin: string): Record<string, unknown> {
  const originClean = origin.replace(/\/+$/, "");
  return {
    "@type": "SearchAction",
    target: `${originClean}/recherche?q={search_term_string}`,
    "query-input": "required name=search_term_string",
  };
}

/**
 * Flux RSS 2.0 : découverte de contenu par les agrégateurs et les moteurs
 * qui l'abordent (Google Actualités, Feedly…). Le `link` de chaque item
 * pointe vers la page guide absolue.
 */
export function buildRssFeed(
  origin: string,
  guides: readonly {
    slug: string;
    title: string;
    description: string;
    dateModified: string;
  }[],
  siteDescription: string,
  copy?: { locale: Locale; title: string },
): string {
  const originClean = origin.replace(/\/+$/, "");
  const escape = (s: string) =>
    s
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");

  const locale = copy?.locale ?? DEFAULT_LOCALE;
  const pathLocale = locale === DEFAULT_LOCALE ? null : locale;
  const items = guides
    .map((g) => {
      const canonical = `${originClean}/guides/${g.slug}`;
      const link = `${originClean}${localizePath(`/guides/${g.slug}`, pathLocale)}`;
      return `    <item>
      <title>${escape(g.title)}</title>
      <link>${link}</link>
      <guid isPermaLink="true">${canonical}</guid>
      <description>${escape(g.description)}</description>
      <pubDate>${new Date(`${g.dateModified}T00:00:00Z`).toUTCString()}</pubDate>
    </item>`;
    })
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>${escape(`${SITE_NAME} — ${copy?.title ?? "Guides"}`)}</title>
    <link>${originClean}${pathLocale ? localizePath("/", pathLocale) : ""}</link>
    <description>${escape(siteDescription)}</description>
    <language>${locale}</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
${items}
  </channel>
</rss>
`;
}
