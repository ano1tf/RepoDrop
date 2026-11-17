import type { MetadataRoute } from "next";
import { headers } from "next/headers";
import {
  buildSitemap,
  resolveContentLastModified,
  resolveSiteUrl,
  SITE_OG_IMAGE,
} from "@/lib/seo";
import { GUIDES } from "@/lib/seo-guides";

/**
 * Plan de site complet.
 *
 * Rendu dynamique à la requête : en Docker (`Dockerfile`), `APP_URL` est
 * fourni au démarrage du conteneur (`next start`) et non lors de
 * `next build`. Figer `/sitemap.xml` à la compilation y écrirait
 * `http://localhost:3000`.
 *
 * Le `lastModified` ne vient en revanche **pas** de l'heure de la requête :
 * il est résolu par `resolveContentLastModified()` (`SOURCE_DATE_EPOCH` ou
 * date éditoriale), sinon chaque crawl verrait un site « modifié à
 * l'instant ». Les pages de contenu (guides, FAQ) portent leur propre date
 * éditoriale.
 *
 * Inclut **toutes** les pages publiques indexables : l'accueil, l'index des
 * guides, chaque guide, la FAQ et la page « à propos ». Les pages privées
 * (`/import`, `/repos`, `/jobs/*`, `/staff`) et `noindex` (`/login`,
 * `/recherche`) sont exclues.
 */
export const dynamic = "force-dynamic";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = resolveSiteUrl({ headers: await headers() });
  const origin = baseUrl.replace(/\/+$/, "");
  const now = resolveContentLastModified();

  const guidePages = GUIDES.map((g) => ({
    url: `${origin}/guides/${g.slug}`,
    lastModified: new Date(`${g.dateModified}T00:00:00.000Z`),
    changeFrequency: "monthly" as const,
    priority: 0.8,
    images: [`${origin}${SITE_OG_IMAGE.url}`],
  }));

  return buildSitemap(
    baseUrl,
    now,
    [
      {
        url: `${origin}/guides`,
        lastModified: now,
        changeFrequency: "weekly",
        priority: 0.9,
        images: [`${origin}${SITE_OG_IMAGE.url}`],
      },
      {
        url: `${origin}/a-propos`,
        lastModified: now,
        changeFrequency: "monthly",
        priority: 0.6,
        images: [`${origin}${SITE_OG_IMAGE.url}`],
      },
      {
        url: `${origin}/faq`,
        lastModified: now,
        changeFrequency: "monthly",
        priority: 0.7,
        images: [`${origin}${SITE_OG_IMAGE.url}`],
      },
      ...guidePages,
    ],
  );
}
