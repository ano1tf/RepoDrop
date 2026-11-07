import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Check, Languages } from "lucide-react";
import { getT } from "@/lib/i18n/server";
import { DICTIONARIES } from "@/lib/i18n/dictionary";
import { LOCALES } from "@/lib/i18n/locales";
import { buildPageMetadata, serializeJsonLd } from "@/lib/seo";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

/**
 * Page de présentation des langues (`/langues`).
 *
 * Elle sert de **preview** : chaque carte montre le titre et l'accroche tirés
 * du dictionnaire de la langue (pas une simple liste de noms), et cliquer
 * dessus bascule réellement l'interface (`/api/lang/switch?to=xx&next=/`), puis y
 * revient.
 *
 * `noindex` : c'est un utilitaire de démonstration, pas du contenu éditorial.
 */
export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const { locale, t } = await getT();
  return buildPageMetadata({
    title: t.nav.language,
    description: t.meta.description,
    path: "/langues",
    noIndex: true,
    ogLocale: LOCALES.find((l) => l.code === locale)?.ogLocale,
  });
}

export default async function LanguagesPage() {
  const { locale, t } = await getT();

  const jsonLd = serializeJsonLd({
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: `${t.nav.language} — RepoDrop`,
    numberOfItems: LOCALES.length,
    itemListElement: LOCALES.map((l, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: l.nativeName,
      identifier: l.code,
    })),
  });

  return (
    <main className="relative flex-1 overflow-hidden">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-72 hero-bg"
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd }}
      />

      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="animate-fade-up">
          <h1 className="flex items-center gap-3 text-2xl font-semibold tracking-tight">
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-go/10 text-go ring-1 ring-go/25">
              <Languages className="h-5 w-5" />
            </span>
            {t.nav.language}
          </h1>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-mist">
            {t.home.statLanguagesSub}
          </p>
          <p className="mt-2 font-mono text-xs text-go">
            {LOCALES.length} · {t.nav.languageCurrent.replace("{name}", locale.toUpperCase())}
          </p>
        </div>

        <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {LOCALES.map((l) => {
            const dict = DICTIONARIES[l.code];
            const active = l.code === locale;
            return (
              <li key={l.code}>
                <Link
                  href={`/api/lang/switch?to=${l.code}&next=/langues`}
                  lang={l.code}
                  dir={l.dir}
                  aria-current={active ? "true" : undefined}
                  className={cn(
                    "panel group flex h-full flex-col gap-2 p-4 transition-all",
                    active
                      ? "border-go/40 bg-go/5 ring-1 ring-go/25"
                      : "hover:-translate-y-0.5 hover:border-sky/30",
                  )}
                >
                  <div className="flex items-center gap-2">
                    <span aria-hidden="true" className="text-xl leading-none">
                      {l.flag}
                    </span>
                    <span className="flex-1 truncate font-semibold text-chalk">
                      {l.nativeName}
                    </span>
                    <span className="font-mono text-[10px] uppercase text-mist">
                      {l.code}
                    </span>
                    {active && <Check className="h-4 w-4 shrink-0 text-go" />}
                  </div>

                  <p className="flex items-center gap-2 text-xs text-mist/70">
                    <span className="line-clamp-1">{l.englishName}</span>
                    {l.dir === "rtl" && (
                      <span className="rounded bg-panel2 px-1.5 py-0.5 font-mono text-[10px] text-sky">
                        RTL
                      </span>
                    )}
                  </p>

                  {/* Aperçu réel : le titre de la langue, pas une étiquette. */}
                  <p className="mt-1 line-clamp-2 text-sm font-medium leading-snug text-chalk/90">
                    {dict.meta.title}
                  </p>
                  <p className="line-clamp-2 text-xs leading-relaxed text-mist">
                    {dict.home.heroTitleLine2}
                  </p>

                  <span className="mt-auto inline-flex items-center gap-1 pt-2 text-xs font-medium text-go opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100">
                    {dict.nav.start}
                    <ArrowRight className="h-3 w-3 rtl:rotate-180" />
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="mt-10">
          <Link href="/" className={cn(buttonVariants({ variant: "outline" }))}>
            {t.notFound.back}
          </Link>
        </div>
      </div>
    </main>
  );
}
