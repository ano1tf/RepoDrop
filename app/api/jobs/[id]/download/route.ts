/**
 * GET /api/jobs/[id]/download — télécharge le code extrait du job en .zip.
 *
 * Le zip est reconstruit depuis l'espace d'extraction (sécurité déjà faite :
 * pas de symlink, pas de `.git`, pas de traversal). node_modules est exclu
 * par défaut.
 */
import { promises as fs } from "node:fs";
import path from "node:path";
import { config } from "@/lib/config";
import { AppError } from "@/lib/errors";
import { getSession } from "@/lib/session";
import { jobOwnedBy } from "@/lib/jobs";
import { zipJob } from "@/lib/zip";

import { apiError, apiException } from "@/lib/i18n/api-errors";

export const dynamic = "force-dynamic";

interface Params {
  params: Promise<{ id: string }>;
}

export async function GET(req: Request, { params }: Params): Promise<Response> {
  const session = await getSession();
  if (!session) return apiError(req, "AUTH_REQUIRED", 401);

  const { id } = await params;
  const job = jobOwnedBy(id, session.login);
  if (!job) return apiError(req, "NOT_FOUND", 404);

  // Le zip n'a de sens que si l'extraction est disponible.
  if (job.status !== "done" && job.status !== "ready") {
    return apiError(req, "JOB_NOT_READY", 409);
  }

  const jobDir = path.join(config.jobsDir, id);
  let src: string | null = path.join(jobDir, "extract");
  if (job.preview?.singleRootDir) {
    src = path.join(src, job.preview.singleRootDir);
  }
  const st = await fs.stat(src).catch(() => null);
  if (!st?.isDirectory()) {
    return apiError(req, "INTERRUPTED", 410);
  }

  try {
    const { path: zipPath, name } = await zipJob(id, src, job.filename, false);
    return new Response(await fs.readFile(zipPath), {
      headers: {
        "Content-Type": "application/zip",
        "Content-Disposition": `attachment; filename="${name}.zip"`,
        "Cache-Control": "no-store",
        "X-Content-Type-Options": "nosniff",
      },
    });
  } catch (err) {
    return apiException(req, err, err instanceof AppError ? 500 : 502);
  }
}
