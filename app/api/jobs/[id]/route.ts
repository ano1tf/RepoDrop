/** GET /api/jobs/[id] — état du job (statut, aperçu, résultat du push). */
import { getSession } from "@/lib/session";
import { json } from "@/lib/http";
import { ensureWorkerInit, jobOwnedBy } from "@/lib/jobs";

import { localizeJob } from "@/lib/i18n/job-errors";
import { requestLocale } from "@/lib/i18n/request";

import { apiError } from "@/lib/i18n/api-errors";

export const dynamic = "force-dynamic";

interface Params {
  params: Promise<{ id: string }>;
}

export async function GET(req: Request, { params }: Params): Promise<Response> {
  ensureWorkerInit();
  const session = await getSession();
  if (!session) return apiError(req, "AUTH_REQUIRED", 401);

  const { id } = await params;
  const job = jobOwnedBy(id, session.login);
  if (!job) return apiError(req, "NOT_FOUND", 404);

  const locale = requestLocale(req);
  return json({ job: localizeJob(job, locale) }, 200, { "Content-Language": locale });
}
