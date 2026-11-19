import { getDictionary } from "@/lib/i18n/dictionary";
import { DEFAULT_LOCALE, dirOf } from "@/lib/i18n/locales";
import { localeFromUrl, localizePath } from "@/lib/i18n/navigation";
import { buildManifest } from "@/lib/seo";

/** Cache by URL, never by the reader's cookies or Accept-Language. */
export function GET(request: Request) {
  const locale = localeFromUrl(new URL(request.url)) ?? DEFAULT_LOCALE;
  const { meta } = getDictionary(locale);
  const manifest = locale === DEFAULT_LOCALE ? buildManifest() : buildManifest({
    name: meta.title,
    description: meta.description,
    lang: locale,
    dir: dirOf(locale),
    start_url: localizePath("/", locale),
  });
  return new Response(JSON.stringify(manifest), { headers: {
    "Content-Type": "application/manifest+json; charset=utf-8",
    "Cache-Control": "public, max-age=3600",
    "Content-Language": locale,
  } });
}
