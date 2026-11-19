import type { Metadata } from "next";
import LocaleLink from "@/components/LocaleLink";
import { ArrowRight, Search } from "lucide-react";
import { getT } from "@/lib/i18n/server";
import { LOCALE_PARAM, ogLocaleOf } from "@/lib/i18n/locales";
import { buildPageMetadata } from "@/lib/seo";
import { guideQuery, MAX_GUIDE_QUERY_LENGTH, searchGuides } from "@/lib/seo-guides";

/**
 * Page de recherche intégrée (`/recherche?q=…`).
 *
 * C'est la **cible du `SearchAction`** (sitelinks search box) déclaré dans
 * les données structurées de l'accueil : Google peut afficher une barre de
 * recherche enrichie dans les résultats. La page est `noindex` : une page de
 * recherche ne doit pas être indexée (contenu dynamique, pas de valeur
 * éditoriale propre), mais elle reste utilisable par le moteur.
 */
export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const { locale, t } = await getT();
  return buildPageMetadata({
    title: t.guides.searchTitle,
    description: t.guides.searchTitle,
    path: "/recherche",
    noIndex: true,
    ogLocale: ogLocaleOf(locale),
  });
}

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string | string[] }>;
}) {
  const [{ q: rawQuery }, { locale, urlLocale, t }] = await Promise.all([searchParams, getT()]);
  const q = guideQuery(rawQuery);
  const results = searchGuides(q, locale);
  const [beforeQuery, afterQuery] = t.guides.searchResultsFor.split("{q}");

  return (
    <main className="flex-1">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-72 hero-bg"
      />

      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6">
        <div className="animate-fade-up">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            {t.guides.searchTitle}
          </h1>

          <form
            action="/recherche"
            method="get"
            role="search"
            className="mt-6"
            aria-label={t.guides.searchTitle}
          >
            {urlLocale && <input type="hidden" name={LOCALE_PARAM} value={urlLocale} />}
            <div className="flex gap-2">
              <div className="flex min-w-0 flex-1 items-center gap-2.5 rounded-lg border border-edge/70 bg-panel2/60 px-3.5 transition-colors focus-within:border-go/60">
                <Search className="h-4 w-4 shrink-0 text-mist" aria-hidden="true" />
                <input
                  type="search"
                  name="q"
                  defaultValue={q}
                  maxLength={MAX_GUIDE_QUERY_LENGTH}
                  dir="auto"
                  placeholder={t.guides.searchPlaceholder}
                  aria-label={t.guides.searchPlaceholder}
                  className="min-w-0 flex-1 bg-transparent py-2.5 text-sm text-chalk outline-none placeholder:text-mist/60"
                />
              </div>
              <button
                type="submit"
                className="rounded-lg bg-go px-4 py-2.5 text-sm font-medium text-ink transition-colors hover:bg-go/90"
              >
                {t.guides.searchTitle}
              </button>
            </div>
          </form>

          <div className="mt-8">
            {results.length === 0 ? (
              <div className="panel space-y-3 p-4">
                <p className="text-sm leading-relaxed text-mist">
                  {q ? t.guides.searchNoResults : t.guides.searchEmpty}
                </p>
                <LocaleLink href="/guides" className="inline-flex items-center gap-1.5 text-sm font-medium text-go hover:underline">
                  {t.guides.backToGuides}
                  <ArrowRight className="h-3.5 w-3.5 rtl:rotate-180" aria-hidden="true" />
                </LocaleLink>
              </div>
            ) : (
              <>
                <p className="mb-4 text-sm text-mist">
                  {beforeQuery}<bdi className="break-all">{q}</bdi>{afterQuery}
                </p>
                <ul className="space-y-3">
                  {results.map((guide) => (
                    <li key={guide.slug}>
                      <LocaleLink
                        href={`/guides/${guide.slug}`}
                        className="panel group flex items-start gap-3 p-4 transition-colors transition-transform duration-200 ease-out hover:-translate-y-0.5 hover:border-go/30"
                      >
                        <span className="mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-lg bg-go/10 text-go ring-1 ring-go/25">
                          <Search className="h-3.5 w-3.5" aria-hidden="true" />
                        </span>
                        <div className="min-w-0 flex-1">
                          <h2 className="font-semibold text-chalk">
                            {guide.title}
                          </h2>
                          <p className="mt-1 line-clamp-2 text-sm leading-relaxed text-mist">
                            {guide.description}
                          </p>
                        </div>
                        <ArrowRight
                          className="mt-1 h-4 w-4 shrink-0 text-mist transition-transform duration-200 group-hover:translate-x-1 group-hover:text-go rtl:rotate-180"
                          aria-hidden="true"
                        />
                      </LocaleLink>
                    </li>
                  ))}
                </ul>
              </>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
