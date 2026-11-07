import type { Metadata } from "next";
import { redirect } from "next/navigation";
import Link from "next/link";
import { FolderSearch, UploadCloud } from "lucide-react";
import { getSession } from "@/lib/session";
import { RepoBrowser } from "@/components/repos/RepoBrowser";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { getT } from "@/lib/i18n/server";
import { fill } from "@/lib/i18n/format";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const { t } = await getT();
  return {
    title: t.repos.metaTitle,
    robots: { index: false, follow: false },
  };
}

export default async function ReposPage() {
  const [session, { locale, t }] = await Promise.all([getSession(), getT()]);
  if (!session) redirect("/login");

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
                {t.repos.pageTitle}
              </h1>
              {/*
                Le texte d'accroche mentionne l'onglet « Actions » : on
                l'interpole depuis le dictionnaire (`{actions}`) pour qu'il
                reste juste dans les langues où le libellé change de casse.
              */}
              <p className="mt-3 max-w-2xl text-sm leading-relaxed text-mist">
                {fill(t.repos.pageLead, { actions: t.repos.actionsTab })}
              </p>
            </div>
            <Link
              href="/import"
              className={cn(buttonVariants({ variant: "secondary" }))}
            >
              <UploadCloud className="h-4 w-4" />
              {t.nav.importArchive}
            </Link>
          </div>
        </div>

        <RepoBrowser
          login={session.login}
          t={t.repos}
          tErrors={{ errors: t.errors, api: t.api }}
          importLabel={t.nav.importArchive}
          locale={locale}
        />
      </div>
    </main>
  );
}
