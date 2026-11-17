import { headers } from "next/headers";
import { buildRssFeed, resolveSiteUrl, SITE_DESCRIPTION } from "@/lib/seo";
import { GUIDES } from "@/lib/seo-guides";

/**
 * Flux RSS 2.0 (`/feed.xml`).
 *
 * Découverte de contenu par les agrégateurs (Feedly…) et les moteurs qui
 * abordent les flux. Le `link` de chaque item pointe vers la page guide
 * absolue, résolue contre l'origine canonique (`APP_URL` en production,
 * hôte du proxy en aperçu).
 */
export const dynamic = "force-dynamic";

export async function GET() {
  const baseUrl = resolveSiteUrl({ headers: await headers() });
  const xml = buildRssFeed(
    baseUrl,
    GUIDES.map((g) => ({
      slug: g.slug,
      title: g.title,
      description: g.description,
      dateModified: g.dateModified,
    })),
    SITE_DESCRIPTION,
  );

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
