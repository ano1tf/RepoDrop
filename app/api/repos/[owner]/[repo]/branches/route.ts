/** GET /api/repos/[owner]/[repo]/branches — branches du dépôt (sélecteur de ref). */
import { getSession } from "@/lib/session";
import { json } from "@/lib/http";
import { listBranches } from "@/lib/github";
import { AppError } from "@/lib/errors";

import { apiError, apiException } from "@/lib/i18n/api-errors";

export const dynamic = "force-dynamic";

interface Params {
  params: Promise<{ owner: string; repo: string }>;
}

export async function GET(req: Request, { params }: Params): Promise<Response> {
  const session = await getSession();
  if (!session) return apiError(req, "AUTH_REQUIRED", 401);

  const { owner, repo } = await params;
  try {
    return json({ branches: await listBranches(session.token, owner, repo) });
  } catch (e) {
    const status =
      e instanceof AppError && e.code === "NOT_FOUND"
        ? 404
        : e instanceof AppError && e.code === "RATE_LIMITED"
          ? 429
          : 500;
    return apiException(req, e, status);
  }
}
