import type { Metadata } from "next";
import LocaleLink from "@/components/LocaleLink";
import { ChevronDown, HelpCircle } from "lucide-react";
import { headers } from "next/headers";
import { getT } from "@/lib/i18n/server";
import { ogLocaleOf } from "@/lib/i18n/locales";
import {
  buildArticleStructuredData,
  buildPageMetadata,
  resolveSiteUrl,
  serializeJsonLd,
} from "@/lib/seo";
import { fill, formatBytes, formatNumber } from "@/lib/i18n/format";
import { config } from "@/lib/config";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

/**
 * Page FAQ indexable (`/faq`).
 *
 * Les questions fréquentes suivent le dictionnaire de la requête et alimentent
 * un JSON-LD `Article` + `FAQPage` + `BreadcrumbList` — cible des extraits
 * FAQ dans les résultats de recherche.
 */
export async function generateMetadata(): Promise<Metadata> {
  const { locale, t } = await getT();
  return buildPageMetadata({
    title: t.home.faqTitle,
    description: t.home.faqLead,
    path: "/faq",
    ogLocale: ogLocaleOf(locale),
  });
}

export default async function FaqPage() {
  const [reqHeaders, { locale, t }] = await Promise.all([headers(), getT()]);
  const baseUrl = resolveSiteUrl({ headers: reqHeaders });

  // Les réponses techniques mentionnent les vraies limites du serveur.
  const faqItems = [
    { question: t.faq.q1, answer: t.faq.a1 },
    { question: t.faq.q2, answer: fill(t.faq.a2, {
      upload: formatBytes(config.limits.maxUploadBytes, locale),
      extract: formatBytes(config.limits.maxExtractBytes, locale),
      files: formatNumber(config.limits.maxFiles, locale),
    }) },
    { question: t.faq.q3, answer: t.faq.a3 },
    { question: t.faq.q4, answer: t.faq.a4 },
    { question: t.faq.q5, answer: t.faq.a5 },
  ];

  const jsonLd = serializeJsonLd(
    buildArticleStructuredData({
      origin: baseUrl,
      title: t.home.faqTitle,
      description: t.home.faqLead,
      datePublished: "2026-11-07",
      dateModified: "2026-11-07",
      faq: faqItems,
      inLanguage: locale,
      breadcrumbs: [
        { name: t.footer.home, path: "/" },
        { name: t.home.faqTitle, path: "/faq" },
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
        <nav aria-label={t.home.faqTitle} className="mb-8">
          <ol className="flex flex-wrap items-center gap-1.5 text-xs text-mist">
            <li>
              <LocaleLink href="/" className="transition-colors hover:text-chalk">
                {t.footer.home}
              </LocaleLink>
            </li>
            <li aria-hidden="true">/</li>
            <li className="text-chalk/80">{t.home.faqTitle}</li>
          </ol>
        </nav>

        <div className="animate-fade-up">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-go/10 px-2.5 py-1 text-[11px] font-medium text-go ring-1 ring-go/25">
            <HelpCircle className="h-3 w-3" aria-hidden="true" />
            {t.home.faqTitle}
          </span>
          <h1 className="mt-5 text-3xl font-bold tracking-tight sm:text-4xl">
            {t.home.faqTitle}
          </h1>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-mist">
            {t.home.faqLead}
          </p>

          <div className="mt-10 space-y-3">
            {faqItems.map((item) => (
              <details
                key={item.question}
                className="panel group overflow-hidden"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 p-5 font-medium text-chalk transition-colors hover:text-go [&::-webkit-details-marker]:hidden">
                  <span>{item.question}</span>
                  <ChevronDown
                    aria-hidden="true"
                    className="h-4 w-4 shrink-0 text-mist transition-transform duration-200 group-open:rotate-180 group-open:text-go"
                  />
                </summary>
                <div className="border-t border-edge/60 px-5 pb-5 pt-4 text-sm leading-relaxed text-mist">
                  {item.answer}
                </div>
              </details>
            ))}
          </div>

          <div className="mt-10">
            <LocaleLink
              href="/"
              className={cn(buttonVariants({ variant: "outline" }))}
            >
              {t.notFound.back}
            </LocaleLink>
          </div>
        </div>
      </div>
    </main>
  );
}
