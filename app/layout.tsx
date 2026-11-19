import type { Metadata, Viewport } from "next";
import { headers } from "next/headers";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { LocaleNavigation } from "@/components/LocaleLink";
import { getLocaleState, getT } from "@/lib/i18n/server";
import { dirOf, ogLocaleOf } from "@/lib/i18n/locales";
import {
  buildIcons,
  buildVerification,
  resolveSiteUrl,
  SITE_KEYWORDS,
  SITE_NAME,
  SITE_OG_IMAGE,
  SITE_TWITTER_IMAGE,
  twitterHandleFields,
} from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  const [requestHeaders, { locale, t }] = await Promise.all([headers(), getT()]);
  const baseUrl = resolveSiteUrl({ headers: requestHeaders });

  return {
    metadataBase: new URL(baseUrl),
    applicationName: SITE_NAME,
    title: {
      default: t.meta.title,
      template: `%s · ${SITE_NAME}`,
    },
    description: t.meta.description,
    keywords: SITE_KEYWORDS,
    authors: [{ name: SITE_NAME }],
    creator: SITE_NAME,
    publisher: SITE_NAME,
    category: "technology",
    icons: buildIcons(),
    // Vérification Google Search Console : balise
    // <meta name="google-site-verification" content="…"> sur toutes les pages.
    verification: buildVerification(),
    // Application web installable sur iOS (PWA) : titre de l'écran d'accueil
    // et style de la barre d'état, au-delà du apple-touch-icon déjà posé.
    appleWebApp: {
      capable: true,
      title: SITE_NAME,
      statusBarStyle: "black-translucent",
    },
    // Désactive la détection automatique des numéros de téléphone : sans
    // cela, Safari transforme tout numéro en lien cliquable, ce qui dégrade
    // le rendu et peut fausser la détection de contenu par les moteurs.
    formatDetection: {
      telephone: false,
    },
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
      locale: ogLocaleOf(locale),
      siteName: SITE_NAME,
      url: "/",
      title: t.meta.title,
      description: t.meta.description,
      images: [SITE_OG_IMAGE],
    },
    twitter: {
      card: "summary_large_image",
      title: t.meta.title,
      description: t.meta.description,
      images: [SITE_TWITTER_IMAGE],
      ...twitterHandleFields(),
    },
  };
}

export const viewport: Viewport = {
  themeColor: "#080b12",
  colorScheme: "dark",
  // Contenu repoussé hors des zones notch/indicateur (utilisé avec
  // env(safe-area-inset-*) dans le header/footer).
  viewportFit: "cover",
};

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const { locale, urlLocale } = await getLocaleState();

  // `lang`/`dir` reflètent la langue réellement rendue : indispensable pour la
  // synthèse vocale, la césure et le rendu droite-à-gauche (arabe).
  return (
    <html lang={locale} dir={dirOf(locale)}>
      {/* Découverte de contenu : lien RSS pour les agrégateurs et les moteurs. */}
      <link rel="alternate" type="application/rss+xml" title="RepoDrop — Guides" href="/feed.xml" />
      <body className="flex min-h-screen flex-col">
        {/* Grain global : casse les aplats des dégradés. */}
        <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 noise-layer" />
        <LocaleNavigation urlLocale={urlLocale}>
          <Header />
          <div className="flex flex-1 flex-col">{children}</div>
          <Footer />
        </LocaleNavigation>
      </body>
    </html>
  );
}
