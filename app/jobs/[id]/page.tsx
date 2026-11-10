import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { getSession } from "@/lib/session";
import { ensureWorkerInit, jobOwnedBy } from "@/lib/jobs";
import { JobView } from "@/components/JobView";
import { getT } from "@/lib/i18n/server";
import { buildPageMetadata } from "@/lib/seo";
import { ogLocaleOf } from "@/lib/i18n/locales";

/**
 * La page de suivi d'un import est **dynamique** (`noIndex`) : elle dépend
 * de la session et de la langue courante. Le titre suit donc la langue
 * choisie, comme le reste de l'interface.
 */
export async function generateMetadata(): Promise<Metadata> {
  const { locale, t } = await getT();
  return buildPageMetadata({
    title: t.meta.jobTitle,
    description: t.meta.description,
    path: "/jobs",
    noIndex: true,
    ogLocale: ogLocaleOf(locale),
  });
}

export default async function JobPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const session = await getSession();
  if (!session) redirect("/login");

  ensureWorkerInit();
  const { id } = await params;
  const job = jobOwnedBy(id, session.login);
  if (!job) notFound();

  // La page de suivi suit la langue choisie : on passe les textes (section
  // `job` du dictionnaire) et la locale au composant client.
  const { locale, t } = await getT();

  return (
    <main>
      <JobView initialJob={job} copy={t.job} locale={locale} />
    </main>
  );
}
