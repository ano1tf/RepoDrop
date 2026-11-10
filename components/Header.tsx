import Link from "next/link";
import { ArrowUpRight, FolderSearch } from "lucide-react";
import type { SessionData } from "@/lib/session";
import type { Dict } from "@/lib/i18n/types";
import type { Locale } from "@/lib/i18n/locales";
import { GitHubIcon, Wordmark } from "@/components/Brand";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";

/**
 * En-tête global.
 *
 * Composant **de présentation, synchrone** : il ne lit ni cookie, ni en-tête,
 * ni session. Tout lui vient du layout racine, qui a déjà résolu la requête :
 *
 *   - `locale` — la langue effective (cookie `rd_lang`, sinon en-tête du
 *     middleware, sinon `Accept-Language`) ;
 *   - `t` — **le dictionnaire de cette langue**, le même objet que celui rendu
 *     dans le corps de la page ;
 *   - `session` — la session déjà ouverte pour cette requête.
 *
 * Pourquoi ce passage par props (et pas `getT()` ici) ?
 * -----------------------------------------------
 * Un composant qui résout lui-même la langue *peut* diverger de la page :
 * c'est exactement ce qui se produisait côté navigateur (en-tête en anglais,
 * contenu en français). Une seule résolution par requête, faite en haut de
 * l'arbre, rend la divergence **impossible par construction** : l'en-tête ne
 * possède plus de source de vérité alternative. Bonus : une seule lecture des
 * cookies et des en-têtes par rendu au lieu de trois (layout, Header, Footer).
 *
 * Conséquence assumée : le composant n'est pas `async`, donc il ne peut pas
 * « re-décider » de la langue en cours de route — c'est précisément le but.
 * (`tests/header.test.ts` verrouille ce contrat.)
 */
export function Header({
  locale,
  t,
  session,
}: {
  /** Langue réellement rendue (`<html lang>` de la requête). */
  locale: Locale;
  /** Dictionnaire complet de cette langue — l'en-tête lit sa section `nav`. */
  t: Dict;
  /** Session de la requête, ou `null` pour un visiteur anonyme. */
  session: SessionData | null;
}) {
  const nav = t.nav;

  return (
    <header className="sticky top-0 z-40 border-b border-edge/70 glass">
      {/* Filet lumineux : rappelle l'accent du produit. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-go/45 to-transparent"
      />
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-3 px-4 sm:px-6">
        <Link
          href="/"
          className="group flex items-center text-chalk transition-opacity hover:opacity-90"
        >
          <Wordmark />
        </Link>

        <nav aria-label={nav.howItWorks} className="flex items-center gap-1.5 sm:gap-2">
          <Link
            href="/#comment"
            className="hidden rounded-lg px-3 py-2 text-sm text-mist transition-colors hover:bg-panel2 hover:text-chalk lg:inline-block"
          >
            {nav.howItWorks}
          </Link>

          <LanguageSwitcher
            locale={locale}
            label={nav.language}
            changeLabel={nav.languageChange}
            searchLabel={nav.languageSearch}
            currentLabel={nav.languageCurrent.replace("{name}", locale.toUpperCase())}
          />

          {session ? (
            <>
              <Link
                href="/repos"
                className="hidden items-center gap-1.5 rounded-lg px-3 py-2 text-sm text-mist transition-colors hover:bg-panel2 hover:text-chalk md:inline-flex"
              >
                <FolderSearch className="h-4 w-4" />
                {nav.myRepos}
              </Link>
              <Link
                href="/import"
                className={cn(buttonVariants({ size: "sm" }), "hidden xl:inline-flex")}
              >
                {nav.importArchive}
              </Link>
              <Link
                href="/import"
                className={cn(buttonVariants({ size: "sm", variant: "secondary" }), "xl:hidden")}
              >
                {nav.importShort}
              </Link>
              <span className="hidden items-center gap-2 rounded-full bg-panel2 py-1 pl-1 pr-3 ring-1 ring-edge sm:flex">
                {session.avatar ? (
                  <img
                    src={session.avatar}
                    alt={nav.avatarAlt.replace("{login}", session.login)}
                    className="h-6 w-6 rounded-full ring-1 ring-edge"
                    referrerPolicy="no-referrer"
                  />
                ) : (
                  <span className="grid h-6 w-6 place-items-center rounded-full bg-go/20 text-xs font-bold text-go">
                    {session.login.slice(0, 1).toUpperCase()}
                  </span>
                )}
                <span className="max-w-28 truncate text-xs font-medium text-chalk/90">
                  {session.login}
                </span>
              </span>
              <a
                href="/api/auth/logout"
                rel="nofollow"
                className={cn(buttonVariants({ variant: "ghost", size: "sm" }), "hidden sm:inline-flex")}
              >
                {nav.logout}
              </a>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className={cn(buttonVariants({ variant: "ghost", size: "sm" }))}
              >
                {nav.login}
              </Link>
              <Link href="/login" className={cn(buttonVariants({ size: "sm" }))}>
                <GitHubIcon />
                <span className="hidden sm:inline">{nav.start}</span>
                <ArrowUpRight className="h-3.5 w-3.5 sm:hidden" />
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
