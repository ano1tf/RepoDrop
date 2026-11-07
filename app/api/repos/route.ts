/**
 * GET /api/repos — dépôts visibles par le jeton de l'utilisateur connecté.
 *
 * Sert deux usages :
 *   - le sélecteur de destination du push (JobView), qui ne lit que `repos` ;
 *   - le navigateur de dépôts (/repos), qui utilise en plus `truncated`.
 *
 * La pagination est plafonnée (`max_pages`, 3 par défaut = 300 dépôts) pour ne
 * pas multiplier les appels à l'API GitHub : `truncated` signale la troncature.
 */
import { getSession } from "@/lib/session";
import { API_ERROR, json, jsonCodeError, jsonErrorPayload } from "@/lib/http";
import { listRepos } from "@/lib/github";
import { AppError } from "@/lib/errors";

export const dynamic = "force-dynamic";

export async function GET(req: Request): Promise<Response> {
  const session = await getSession();
  if (!session) return jsonCodeError(API_ERROR.AUTH_REQUIRED, 401);

  const url = new URL(req.url);
  const maxPages = Number.parseInt(url.searchParams.get("max_pages") ?? "3", 10);

  try {
    const { repos, truncated, pages } = await listRepos(session.token, {
      maxPages: Number.isFinite(maxPages) ? maxPages : 3,
    });
    return json({ repos, truncated, pages });
  } catch (e) {
    const status = e instanceof AppError && e.code === "RATE_LIMITED" ? 429 : 500;
    return jsonErrorPayload(e, status);
  }
}
