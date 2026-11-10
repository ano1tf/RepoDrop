import type { Metadata, Viewport } from "next";
import { headers } from "next/headers";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { getT } from "@/lib/i18n/server";
import { getSession } from "@/lib/session";
import { dirOf } from "@/lib/i18n/locales";
import {
  buildIcons,
  buildVerification,
  resolveSiteUrl,
  SITE_DEFAULT_TITLE,
  SITE_DESCRIPTION,
  SITE_KEYWORDS,
  SITE_NAME,
  SITE_OG_IMAGE,
  SITE_TWITTER_IMAGE,
  twitterHandleFields,
} from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  const baseUrl = resolveSiteUrl({ headers: await headers() });

  return {
    metadataBase: new URL(baseUrl),
    applicationName: SITE_NAME,
    title: {
      default: SITE_DEFAULT_TITLE,
      template: `%s · ${SITE_NAME}`,
    },
    description: SITE_DESCRIPTION,
    keywords: SITE_KEYWORDS,
    authors: [{ name: SITE_NAME }],
    creator: SITE_NAME,
    publisher: SITE_NAME,
    category: "technology",
    icons: buildIcons(),
    // Vérification Google Search Console : balise
    // <meta name="google-site-verification" content="…"> sur toutes les pages.
    verification: buildVerification(),
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    openGraph: {
      type: "website",
      locale: "fr_FR",
      siteName: SITE_NAME,
      url: "/",
      title: SITE_DEFAULT_TITLE,
      description: SITE_DESCRIPTION,
      images: [SITE_OG_IMAGE],
    },
    twitter: {
      card: "summary_large_image",
      title: SITE_DEFAULT_TITLE,
      description: SITE_DESCRIPTION,
      images: [SITE_TWITTER_IMAGE],
      ...twitterHandleFields(),
    },
  };
}

export const viewport: Viewport = {
  themeColor: "#080b12",
  colorScheme: "dark",
};

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  /*
   * **Une seule** résolution de la requête, en haut de l'arbre.
   *
   * `locale`, `t` et `session` sont ensuite passés en props à l'en-tête et au
   * pied de page. Auparavant, chacun appelait `getT()` de son côté : trois
   * lectures de cookies indépendantes pour la même requête, et surtout trois
   * occasions de diverger (l'en-tête affichait la navigation en anglais sur un
   * site français). Ici, la langue de la page et celle de la navigation sont
   * littéralement le même objet `t`.
   */
  const [{ locale, t }, session] = await Promise.all([getT(), getSession()]);

  // `lang`/`dir` reflètent la langue réellement rendue : indispensable pour la
  // synthèse vocale, la césure et le rendu droite-à-gauche (arabe).
  return (
    <html lang={locale} dir={dirOf(locale)}>
      <body className="flex min-h-screen flex-col">
        {/* Grain global : casse les aplats des dégradés. */}
        <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 noise-layer" />
        <Header locale={locale} t={t} session={session} />
        <div className="flex flex-1 flex-col">{children}</div>
        <Footer t={t} />
      </body>
    </html>
  );
}
