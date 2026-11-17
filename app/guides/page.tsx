import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BookOpen } from "lucide-react";
import { getT } from "@/lib/i18n/server";
import { ogLocaleOf } from "@/lib/i18n/locales";
import {
  buildGuidesIndexStructuredData,
  buildPageMetadata,
  resolveSiteUrl,
  serializeJsonLd,
} from "@/lib/seo";
import { GUIDES } from "@/lib/seo-guides";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { headers } from "next/headers";

/**
 * Page d'index des **guides SEO** (`/guides`).
 *
 * Page publique indexable : elle regroupe l'ensemble du contenu éditorial
 * ciblé par mots-clés (import RAR/ZIP/TAR sur GitHub…) et sert de hub de
 * maillage interne vers chaque guide. Les données structurées `ItemList`
 * aident les moteurs à hiérarchiser le contenu.
 */
export async function generateMetadata(): Promise<Metadata> {
  const { locale, t } = await getT();
  return buildPageMetadata({
    title: t.guides.guidesTitle,
    description: t.guides.guidesLead,
    path: "/guides",
    ogLocale: ogLocaleOf(locale),
  });
}

export default async function GuidesPage() {
  const [reqHeaders, { locale, t }] = await Promise.all([headers(), getT()]);
  const baseUrl = resolveSiteUrl({ headers: reqHeaders });

  const jsonLd = serializeJsonLd(
    buildGuidesIndexStructuredData(
      baseUrl,
      GUIDES.map((g) => ({ slug: g.slug, title: g.title, description: g.description })),
      [
        { name: t.footer.home, path: "/" },
        { name: t.guides.guidesTitle, path: "/guides" },
      ],
    ),
  );

  return (
    <main className="flex-1">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd }}
      />
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-72 hero-bg" />

      <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6">
        <div className="animate-fade-up">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-go/10 px-2.5 py-1 text-[11px] font-medium text-go ring-1 ring-go/25">
            <BookOpen className="h-3 w-3" aria-hidden="true" />
            {t.guides.guidesTitle}
          </span>
          <h1 className="mt-5 text-3xl font-bold tracking-tight sm:text-4xl">
            {t.guides.guidesTitle}
          </h1>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-mist">
            {t.guides.guidesLead}
          </p>
        </div>

        <ul className="mt-10 grid gap-4">
          {GUIDES.map((guide) => (
            <li key={guide.slug}>
              <Link
                href={`/guides/${guide.slug}`}
                className="panel group flex h-full flex-col gap-2 p-5 transition-colors transition-transform duration-200 ease-out hover:-translate-y-0.5 hover:border-go/30"
              >
                <div className="flex items-start justify-between gap-3">
                  <h2 className="font-semibold tracking-tight text-chalk">
                    {guide.title}
                  </h2>
                  <ArrowRight
                    className="mt-1 h-4 w-4 shrink-0 text-mist transition-transform duration-200 group-hover:translate-x-1 group-hover:text-go rtl:rotate-180"
                    aria-hidden="true"
                  />
                </div>
                <p className="line-clamp-3 text-sm leading-relaxed text-mist">
                  {guide.description}
                </p>
                <span className="mt-auto inline-flex items-center gap-1 pt-2 text-xs font-medium text-go">
                  {t.guides.readMore}
                </span>
              </Link>
            </li>
          ))}
        </ul>

        <div className="mt-10">
          <Link
            href={`/api/locale?to=${locale}&next=/guides`}
            className={cn(buttonVariants({ variant: "outline" }))}
          >
            {t.notFound.back}
          </Link>
        </div>
      </div>
    </main>
  );
}
