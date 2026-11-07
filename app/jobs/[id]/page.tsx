import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { getSession } from "@/lib/session";
import { ensureWorkerInit, jobOwnedBy } from "@/lib/jobs";
import { JobView } from "@/components/JobView";
import { getT } from "@/lib/i18n/server";
import { translateError } from "@/lib/i18n/errors";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const { t } = await getT();
  return {
    title: t.jobs.metaTitle,
    robots: { index: false, follow: false },
  };
}

export default async function JobPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const session = await getSession();
  if (!session) redirect("/login");

  ensureWorkerInit();
  const [{ id }, { locale, t }] = await Promise.all([params, getT()]);
  const job = jobOwnedBy(id, session.login);
  if (!job) notFound();

  /*
   * Traduction de l'échec **côté serveur** : la page connaît la langue, le
   * composant client non (`cookies()` lui est interdit). On lui passe donc le
   * message déjà traduit. `error` (phrase héritée d'un ancien job) sert de
   * repli, `errorCode` de source pour les jobs récents.
   */
  const errorMessage =
    job.status === "failed"
      ? translateError(t, {
          code: job.errorCode,
          detail: job.errorDetail,
          legacy: job.error,
        })
      : null;

  return (
    <main>
      <JobView
        initialJob={job}
        t={{ jobs: t.jobs, errors: t.errors, api: t.api }}
        locale={locale}
        errorMessage={errorMessage}
      />
    </main>
  );
}
