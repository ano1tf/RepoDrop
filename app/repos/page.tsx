import { redirect } from "next/navigation";
import LocaleLink from "@/components/LocaleLink";
import { FolderSearch, UploadCloud } from "lucide-react";
import { getSession } from "@/lib/session";
import { getT } from "@/lib/i18n/server";
import { localizePath } from "@/lib/i18n/navigation";
import { RepoBrowser } from "@/components/repos/RepoBrowser";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export async function generateMetadata() {
  const { t } = await getT();
  return { title: t.nav.myRepos, robots: { index: false, follow: false } };
}

export const dynamic = "force-dynamic";

export default async function ReposPage() {
  const [session, { locale, urlLocale, t }] = await Promise.all([getSession(), getT()]);
  if (!session) redirect(localizePath("/login", urlLocale));

  return (
    <main className="relative flex-1 overflow-hidden">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-64 hero-bg"
      />
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <div className="mb-6 animate-fade-up">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <h1 className="flex items-center gap-3 text-2xl font-semibold tracking-tight">
                <span className="grid h-10 w-10 place-items-center rounded-xl bg-sky/10 text-sky ring-1 ring-sky/25">
                  <FolderSearch className="h-5 w-5" />
                </span>
                {t.nav.myRepos}
              </h1>
              <p className="mt-3 max-w-2xl text-sm leading-relaxed text-mist">
                {t.repos.lead}
              </p>
            </div>
            <LocaleLink
              href="/import"
              className={cn(buttonVariants({ variant: "secondary" }))}
            >
              <UploadCloud className="h-4 w-4" />
              {t.nav.importArchive}
            </LocaleLink>
          </div>
        </div>

        <RepoBrowser login={session.login} locale={locale} copy={t.repos} ui={t.ui} importLabel={t.nav.importArchive} />
      </div>
    </main>
  );
}
