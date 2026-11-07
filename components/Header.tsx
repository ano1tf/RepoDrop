import Link from "next/link";
import { ArrowUpRight, FolderSearch } from "lucide-react";
import { getSession } from "@/lib/session";
import { GitHubIcon, Wordmark } from "@/components/Brand";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { getT } from "@/lib/i18n/server";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";

/** En-tête global (server component) — reflète la session et la langue. */
export async function Header() {
  const [session, { locale, t }] = await Promise.all([getSession(), getT()]);

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

        <nav
          aria-label={t.nav.howItWorks}
          className="flex items-center gap-1.5 sm:gap-2"
        >
          <Link
            href="/#comment"
            className="hidden rounded-lg px-3 py-2 text-sm text-mist transition-colors hover:bg-panel2 hover:text-chalk lg:inline-block"
          >
            {t.nav.howItWorks}
          </Link>

          <LanguageSwitcher
            locale={locale}
            label={t.nav.language}
            changeLabel={t.nav.languageChange}
            searchLabel={t.nav.languageSearch}
            currentLabel={t.nav.languageCurrent.replace("{name}", locale.toUpperCase())}
          />

          {session ? (
            <>
              <Link
                href="/repos"
                className="hidden items-center gap-1.5 rounded-lg px-3 py-2 text-sm text-mist transition-colors hover:bg-panel2 hover:text-chalk md:inline-flex"
              >
                <FolderSearch className="h-4 w-4" />
                {t.nav.myRepos}
              </Link>
              <Link
                href="/import"
                className={cn(buttonVariants({ size: "sm" }), "hidden xl:inline-flex")}
              >
                {t.nav.importArchive}
              </Link>
              <Link
                href="/import"
                className={cn(buttonVariants({ size: "sm", variant: "secondary" }), "xl:hidden")}
              >
                {t.nav.importShort}
              </Link>
              <span className="hidden items-center gap-2 rounded-full bg-panel2 py-1 pl-1 pr-3 ring-1 ring-edge sm:flex">
                {session.avatar ? (
                  <img
                    src={session.avatar}
                    alt={t.nav.avatarAlt.replace("{login}", session.login)}
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
                {t.nav.logout}
              </a>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className={cn(buttonVariants({ variant: "ghost", size: "sm" }))}
              >
                {t.nav.login}
              </Link>
              <Link href="/login" className={cn(buttonVariants({ size: "sm" }))}>
                <GitHubIcon />
                <span className="hidden sm:inline">{t.nav.start}</span>
                <ArrowUpRight className="h-3.5 w-3.5 sm:hidden" />
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
