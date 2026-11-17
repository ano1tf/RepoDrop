import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Calendar, ChevronDown } from "lucide-react";
import { headers } from "next/headers";
import { notFound } from "next/navigation";
import { getT } from "@/lib/i18n/server";
import {
  buildArticleStructuredData,
  buildPageMetadata,
  resolveSiteUrl,
  serializeJsonLd,
} from "@/lib/seo";
import { GUIDES, getGuide } from "@/lib/seo-guides";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

/**
 * Page de **guide individuel** (`/guides/<slug>`).
 *
 * Page publique indexable, ciblée par un mot-clé principal (titre H1) et
 * ses mots-clés secondaires. Le contenu éditorial est en français (langue
 * d'indexation par défaut du site). Les données structurées `Article` +
 * `HowTo` + `FAQPage` + `BreadcrumbList` couvrent les résultats enrichis,
 * les extraits « comment faire » et la piste de navigation.
 */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const guide = getGuide(slug);
  if (!guide) return {};

  // Lien de navigation séquentielle entre guides (rel="prev"/"next") :
  // consolide le maillage interne et aide les moteurs à reconstituer la
  // structure de l'index des guides.
  const currentIndex = GUIDES.findIndex((g) => g.slug === guide.slug);
  const prev = currentIndex > 0 ? GUIDES[currentIndex - 1] : undefined;
  const next =
    currentIndex >= 0 && currentIndex < GUIDES.length - 1
      ? GUIDES[currentIndex + 1]
      : undefined;

  return buildPageMetadata({
    title: guide.title,
    description: guide.description,
    path: `/guides/${guide.slug}`,
    ogLocale: "fr_FR",
    keywords: guide.keywords,
    // Contenu éditorial daté : type article et dates dans OpenGraph.
    ogType: "article",
    article: {
      publishedTime: guide.datePublished,
      modifiedTime: guide.dateModified,
      section: "Guides",
      tags: guide.keywords,
    },
    // rel="prev"/"next" dans le <head> (balises <link>).
    prev: prev ? `/guides/${prev.slug}` : undefined,
    next: next ? `/guides/${next.slug}` : undefined,
  });
}

export async function generateStaticParams() {
  return GUIDES.map((g) => ({ slug: g.slug }));
}

export default async function GuidePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const guide = getGuide(slug);
  if (!guide) notFound();

  const [reqHeaders, { t }] = await Promise.all([headers(), getT()]);
  const baseUrl = resolveSiteUrl({ headers: reqHeaders });

  const related = guide.related
    .map((s) => getGuide(s))
    .filter((g): g is NonNullable<typeof g> => Boolean(g));

  // Navigation séquentielle (rel="prev"/"next") : guide précédent / suivant.
  const currentIndex = GUIDES.findIndex((g) => g.slug === guide.slug);
  const prev = currentIndex > 0 ? GUIDES[currentIndex - 1] : undefined;
  const next =
    currentIndex >= 0 && currentIndex < GUIDES.length - 1
      ? GUIDES[currentIndex + 1]
      : undefined;

  const jsonLd = serializeJsonLd(
    buildArticleStructuredData({
      origin: baseUrl,
      title: guide.title,
      description: guide.description,
      datePublished: guide.datePublished,
      dateModified: guide.dateModified,
      keywords: guide.keywords,
      steps: guide.steps,
      faq: guide.faq,
      breadcrumbs: [
        { name: t.footer.home, path: "/" },
        { name: t.guides.guidesTitle, path: "/guides" },
        { name: guide.title, path: `/guides/${guide.slug}` },
      ],
    }),
  );

  return (
    <main className="flex-1">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-72 hero-bg"
      />

      <div className="mx-auto max-w-3xl px-4 py-14 sm:px-6">
        {/* Breadcrumb visible */}
        <nav aria-label="Navigation" className="mb-8">
          <ol className="flex flex-wrap items-center gap-1.5 text-xs text-mist">
            <li>
              <Link href="/" className="transition-colors hover:text-chalk">
                {t.footer.home}
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li>
              <Link
                href="/guides"
                className="transition-colors hover:text-chalk"
              >
                {t.guides.guidesTitle}
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li className="truncate text-chalk/80">{guide.title}</li>
          </ol>
        </nav>

        <article className="animate-fade-up">
          <h1 className="text-3xl font-bold leading-tight tracking-tight sm:text-4xl">
            {guide.title}
          </h1>
          <div className="mt-3 flex items-center gap-2 text-xs text-mist">
            <Calendar className="h-3.5 w-3.5" aria-hidden="true" />
            <time dateTime={guide.dateModified}>
              {guide.dateModified}
            </time>
          </div>
          <p className="mt-5 text-base leading-relaxed text-mist">
            {guide.intro}
          </p>

          {/* Étapes HowTo */}
          <section className="mt-10">
            <h2 className="text-xl font-semibold tracking-tight">
              Étapes
            </h2>
            <ol className="mt-4 grid gap-3">
              {guide.steps.map((step, i) => (
                <li
                  key={i}
                  className="panel flex gap-3 p-4"
                >
                  <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-go/15 text-xs font-bold text-go ring-1 ring-go/30">
                    {i + 1}
                  </span>
                  <p className="text-sm leading-relaxed text-chalk/90">
                    {step}
                  </p>
                </li>
              ))}
            </ol>
          </section>

          {/* Sections */}
          {guide.sections.map((section) => (
            <section key={section.heading} className="mt-10">
              <h2 className="text-xl font-semibold tracking-tight">
                {section.heading}
              </h2>
              <div className="mt-4 space-y-4">
                {section.paragraphs.map((p, i) => (
                  <p key={i} className="text-sm leading-relaxed text-mist">
                    {p}
                  </p>
                ))}
              </div>
            </section>
          ))}

          {/* FAQ locale */}
          {guide.faq.length > 0 && (
            <section className="mt-10">
              <h2 className="text-xl font-semibold tracking-tight">
                Question fréquente
              </h2>
              <div className="mt-4 space-y-3">
                {guide.faq.map((item) => (
                  <details
                    key={item.question}
                    className="panel group overflow-hidden"
                  >
                    <summary className="flex cursor-pointer list-none items-center justify-between gap-4 p-4 font-medium text-chalk transition-colors hover:text-go [&::-webkit-details-marker]:hidden">
                      <span>{item.question}</span>
                      <ChevronDown
                        aria-hidden="true"
                        className="h-4 w-4 shrink-0 text-mist transition-transform duration-200 group-open:rotate-180 group-open:text-go"
                      />
                    </summary>
                    <div className="border-t border-edge/60 px-4 pb-4 pt-3 text-sm leading-relaxed text-mist">
                      {item.answer}
                    </div>
                  </details>
                ))}
              </div>
            </section>
          )}

          {/* Guides associés — maillage interne */}
          {related.length > 0 && (
            <section className="mt-12">
              <h2 className="text-lg font-semibold tracking-tight">
                {t.guides.relatedTitle}
              </h2>
              <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                {related.map((r) => (
                  <li key={r.slug}>
                    <Link
                      href={`/guides/${r.slug}`}
                      className="panel group flex h-full flex-col gap-1 p-4 transition-colors transition-transform duration-200 ease-out hover:-translate-y-0.5 hover:border-go/30"
                    >
                      <span className="flex items-center justify-between gap-2">
                        <span className="text-sm font-medium text-chalk">
                          {r.title}
                        </span>
                        <ArrowRight
                          className="h-3.5 w-3.5 shrink-0 text-mist transition-transform duration-200 group-hover:translate-x-1 group-hover:text-go rtl:rotate-180"
                          aria-hidden="true"
                        />
                      </span>
                      <span className="line-clamp-2 text-xs leading-relaxed text-mist">
                        {r.description}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* Navigation séquentielle entre guides (rel=prev/next) */}
          {(prev || next) && (
            <nav aria-label="Guides précédent et suivant" className="mt-12 grid gap-3 sm:grid-cols-2">
              {prev ? (
                <Link
                  href={`/guides/${prev.slug}`}
                  rel="prev"
                  className="panel group flex flex-col gap-1 p-4 transition-colors transition-transform duration-200 ease-out hover:-translate-y-0.5 hover:border-go/30"
                >
                  <span className="flex items-center gap-1.5 text-xs text-mist">
                    <ArrowLeft className="h-3.5 w-3.5 rtl:rotate-180" aria-hidden="true" />
                    Précédent
                  </span>
                  <span className="text-sm font-medium text-chalk">{prev.title}</span>
                </Link>
              ) : (
                <span className="hidden sm:block" />
              )}
              {next ? (
                <Link
                  href={`/guides/${next.slug}`}
                  rel="next"
                  className="panel group flex flex-col items-end gap-1 p-4 text-right transition-colors transition-transform duration-200 ease-out hover:-translate-y-0.5 hover:border-go/30"
                >
                  <span className="flex items-center gap-1.5 text-xs text-mist">
                    Suivant
                    <ArrowRight className="h-3.5 w-3.5 rtl:rotate-180" aria-hidden="true" />
                  </span>
                  <span className="text-sm font-medium text-chalk">{next.title}</span>
                </Link>
              ) : (
                <span className="hidden sm:block" />
              )}
            </nav>
          )}

          {/* Retour */}
          <div className="mt-12">
            <Link
              href="/guides"
              className={cn(buttonVariants({}), "inline-flex items-center gap-1.5")}
            >
              <ArrowLeft className="h-4 w-4 rtl:rotate-180" />
              {t.guides.backToGuides}
            </Link>
          </div>
        </article>
      </div>
    </main>
  );
}
