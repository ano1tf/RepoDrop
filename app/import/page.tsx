import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { Archive, Eye, FolderArchive, FolderSearch, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { getSession } from "@/lib/session";
import { config } from "@/lib/config";
import { Uploader } from "@/components/Uploader";
import { formatBytes } from "@/lib/utils";
import { getT } from "@/lib/i18n/server";
import { fill } from "@/lib/i18n/format";

export async function generateMetadata(): Promise<Metadata> {
  const { t } = await getT();
  return {
    title: t.meta.importTitle,
    description: t.meta.importDescription,
    robots: { index: false, follow: false },
  };
}

/**
 * Page d'import — réservée aux utilisateurs connectés.
 *
 * Si une archive a été déposée sur la landing (`/`), elle a été déposée dans
 * IndexedDB (`lib/pending-import.ts`) : le composant `Uploader` la récupère
 * à son montage et lance l'envoi. Sinon, la zone de dépôt attend un fichier.
 */
export default async function ImportPage() {
  const [session, { t }] = await Promise.all([getSession(), getT()]);
  if (!session) redirect("/login");

  const maxLabel = formatBytes(config.limits.maxUploadBytes);
  const extractLabel = formatBytes(config.limits.maxExtractBytes);

  return (
    <main className="relative flex-1 overflow-hidden">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-72 hero-bg"
      />
      <div className="mx-auto max-w-3xl px-4 py-14 sm:px-6">
        {/* ------------------------------------------------------ titre */}
        <div className="animate-fade-up text-center">
          <span className="inline-grid h-14 w-14 place-items-center rounded-2xl bg-go/10 text-go ring-1 ring-go/25">
            <FolderArchive className="h-7 w-7" />
          </span>
          {/* Titre large : c'est l'instruction principale de la page. */}
          <h1 className="mx-auto mt-5 max-w-2xl text-3xl font-bold leading-[1.15] tracking-tight sm:text-4xl">
            {t.importPage.dropTitle}
          </h1>
          <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-mist">
            {t.importPage.lead}
          </p>
          <div className="mt-4 flex flex-wrap justify-center gap-1.5">
            {[".rar", ".zip", ".tar", ".tar.gz", ".tgz"].map((ext) => (
              <span
                key={ext}
                className="inline-flex items-center gap-1 rounded-md bg-panel2 px-2 py-1 font-mono text-[11px] text-mist ring-1 ring-edge"
              >
                <Archive className="h-3 w-3 text-go/80" />
                {ext}
              </span>
            ))}
          </div>
        </div>

        {/* ----------------------------------------------- zone de dépôt */}
        <div className="mt-8">
          <Uploader maxLabel={maxLabel} extractLabel={extractLabel} t={t.uploader} />
        </div>

        <div className="mt-6 flex flex-wrap items-center justify-between gap-3 rounded-xl bg-panel p-4 ring-1 ring-edge">
          <p className="text-sm text-mist">{t.importPage.browseLead}</p>
          <Link
            href="/repos"
            className={cn(buttonVariants({ variant: "outline", size: "sm" }))}
          >
            <FolderSearch className="h-4 w-4" />
            {t.importPage.browseCta}
          </Link>
        </div>

        <ul className="mt-6 grid gap-2 text-xs text-mist sm:grid-cols-3">
          <li className="rounded-lg bg-panel p-3 ring-1 ring-edge">
            <strong className="text-chalk">{t.importPage.limitLabel}</strong>{" "}
            {fill(t.importPage.limitBody, { upload: maxLabel, extract: extractLabel })}
          </li>
          <li className="rounded-lg bg-panel p-3 ring-1 ring-edge">
            <ShieldCheck className="mr-1 inline h-3.5 w-3.5 text-go" />
            <strong className="text-chalk">{t.importPage.securityLabel}</strong>{" "}
            {t.importPage.securityBody}
          </li>
          <li className="rounded-lg bg-panel p-3 ring-1 ring-edge">
            <Eye className="mr-1 inline h-3.5 w-3.5 text-go" />
            <strong className="text-chalk">{t.importPage.afterLabel}</strong>{" "}
            {t.importPage.afterBody}
          </li>
        </ul>
      </div>
    </main>
  );
}
