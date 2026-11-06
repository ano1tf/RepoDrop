import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { getSession } from "@/lib/session";
import { ensureWorkerInit, jobOwnedBy } from "@/lib/jobs";
import { JobView } from "@/components/JobView";

export const metadata: Metadata = {
  title: "Suivi de l'import",
  robots: { index: false, follow: false },
};

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

  return (
    <main>
      <JobView initialJob={job} />
    </main>
  );
}
