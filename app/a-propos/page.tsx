import type { Metadata } from "next";
import Link from "next/link";

import {
  buildAboutStructuredData,
  buildPageMetadata,
  serializeJsonLd,
  SITE_NAME,
} from "@/lib/seo";
import { getT } from "@/lib/i18n/server";

/**
 * Page « À propos » indexable (`/a-propos`).
 *
 * Page de confiance : mission, sécurité, localisation. Elle émet un
 * JSON-LD `AboutPage` + `Organization` (preuve d'E-E-A-T) et figure dans le
 * sitemap et le pied de page, pour renforcer l'entité RepoDrop auprès des
 * moteurs au-delà des mots-clés transactionnels.
 */
export const dynamic = "force-static";

export async function generateMetadata(): Promise<Metadata> {
  const { t } = await getT();
  return buildPageMetadata({
    title: t.about.aboutTitle,
    description: t.about.aboutLead,
    keywords: ["RepoDrop", "à propos RepoDrop", "outil import GitHub", "import archive GitHub outil", "pourquoi RepoDrop"],
    path: "/a-propos",
  });
}

export default async function AboutPage() {
  const { locale, t } = await getT();
  const origin = process.env.NEXT_PUBLIC_SITE_URL ?? "https://repodrop.com";

  const structuredData = buildAboutStructuredData(origin, {
    title: `${t.about.aboutTitle} — ${SITE_NAME}`,
    description: t.about.aboutLead,
    breadcrumbs: [{ name: t.footer.home, path: "/" }, { name: t.about.aboutTitle, path: "/a-propos" }],
    inLanguage: locale,
  });

  const breadcrumbs = [
    { name: t.footer.home, path: "/" },
    { name: t.about.aboutTitle, path: "/a-propos" },
  ];

  const sections = [
    { heading: t.about.aboutSecurityTitle, body: t.about.aboutSecurityBody },
    { heading: t.about.aboutLocalTitle, body: t.about.aboutLocalBody },
    { heading: t.about.aboutFaqTitle, body: t.about.aboutFaqBody },
  ];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(structuredData) }} />
      <main className="mx-auto w-full max-w-4xl px-4 py-16 sm:py-24">
        <nav aria-label="breadcrumb" className="mb-8">
          <ol className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
            {breadcrumbs.map((crumb, index) => (
              <li key={crumb.name} className="flex items-center gap-2">
                {index > 0 && <span aria-hidden="true">/</span>}
                {crumb.path === "/" ? (
                  <Link href={crumb.path} className="font-medium text-foreground hover:underline">
                    {crumb.name}
                  </Link>
                ) : (
                  <span className="font-medium text-foreground">{crumb.name}</span>
                )}
              </li>
            ))}
          </ol>
        </nav>

        <header className="mb-12">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">{t.about.aboutTitle}</h1>
          <p className="mt-4 text-lg text-muted-foreground">{t.about.aboutLead}</p>
        </header>

        <div className="space-y-12">
          <section>
            <h2 className="text-xl font-semibold tracking-tight">{t.about.aboutMissionTitle}</h2>
            <p className="mt-3 leading-relaxed text-muted-foreground">{t.about.aboutIntro}</p>
          </section>

          {sections.map((section) => (
            <section key={section.heading}>
              <h2 className="text-xl font-semibold tracking-tight">{section.heading}</h2>
              <p className="mt-3 leading-relaxed text-muted-foreground">{section.body}</p>
            </section>
          ))}
        </div>

        <div className="mt-16 border-t pt-8">
          <Link href="/" className="font-medium text-primary underline-offset-4 hover:underline">
            ← {t.footer.home}
          </Link>
        </div>
      </main>
    </>
  );
}
