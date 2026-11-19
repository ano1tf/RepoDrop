import { headers } from "next/headers";
import { buildRssFeed, resolveSiteUrl, SITE_DESCRIPTION } from "@/lib/seo";
import { getGuides } from "@/lib/seo-guides";
import { getDictionary } from "@/lib/i18n/dictionary";
import { DEFAULT_LOCALE } from "@/lib/i18n/locales";
import { localeFromUrl } from "@/lib/i18n/navigation";

/**
 * Flux RSS 2.0 (`/feed.xml`).
 *
 * Découverte de contenu par les agrégateurs (Feedly…) et les moteurs qui
 * abordent les flux. Le `link` de chaque item pointe vers la page guide
 * absolue, résolue contre l'origine canonique (`APP_URL` en production,
 * hôte du proxy en aperçu).
 */
export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const locale = localeFromUrl(new URL(request.url)) ?? DEFAULT_LOCALE;
  const { meta, guides } = getDictionary(locale);
  const baseUrl = resolveSiteUrl({ headers: await headers() });
  const xml = buildRssFeed(
    baseUrl,
    getGuides(locale),
    locale === DEFAULT_LOCALE ? SITE_DESCRIPTION : meta.description,
    { locale, title: guides.guidesTitle },
  );

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
      "Content-Language": locale,
    },
  });
}
