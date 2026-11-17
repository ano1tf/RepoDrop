import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Search } from "lucide-react";
import { getT } from "@/lib/i18n/server";
import { buildPageMetadata } from "@/lib/seo";
import { searchGuides } from "@/lib/seo-guides";

/**
 * Page de recherche intégrée (`/recherche?q=…`).
 *
 * C'est la **cible du `SearchAction`** (sitelinks search box) declared dans
 * les données structurées de l'accueil : Google peut afficher une barre de
 * recherche enrichie dans les résultats. La page est `noindex` : une page de
 * recherche ne doit pas être indexée (contenu dynamique, pas de valeur
 * éditoriale propre), mais elle reste utilisable par le moteur.
 */
export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const { t } = await getT();
  return buildPageMetadata({
    title: t.guides.searchTitle,
    description: t.guides.searchTitle,
    path: "/recherche",
    noIndex: true,
  });
}

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const [{ q }, { t }] = await Promise.all([searchParams, getT()]);
  const results = searchGuides(q ?? "");

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
            className="mt-6"
            aria-label={t.guides.searchTitle}
          >
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Search
                  className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-mist"
                  aria-hidden="true"
                />
                <input
                  type="search"
                  name="q"
                  defaultValue={q ?? ""}
                  placeholder={t.guides.searchPlaceholder}
                  aria-label={t.guides.searchPlaceholder}
                  className="w-full rounded-lg border border-edge/70 bg-panel2/60 py-2.5 pl-10 pr-3 text-sm text-chalk outline-none transition-colors placeholder:text-mist/60 focus:border-go/60"
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
            {q === undefined || q.trim() === "" ? (
              <p className="text-sm leading-relaxed text-mist">
                {t.guides.searchEmpty}
              </p>
            ) : results.length === 0 ? (
              <p className="text-sm leading-relaxed text-mist">
                {t.guides.searchNoResults}
              </p>
            ) : (
              <>
                <p className="mb-4 text-sm text-mist">
                  {t.guides.searchResultsFor.replace("{q}", q)}
                </p>
                <ul className="space-y-3">
                  {results.map((guide) => (
                    <li key={guide.slug}>
                      <Link
                        href={`/guides/${guide.slug}`}
                        className="panel group flex items-start gap-3 p-4 transition-all hover:-translate-y-0.5 hover:border-go/30"
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
                      </Link>
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
