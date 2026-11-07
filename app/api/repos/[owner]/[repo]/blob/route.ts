/**
 * GET /api/repos/[owner]/[repo]/blob?path=&ref=
 *
 * Contenu d'un fichier, en texte seulement. Deux garde-fous :
 *   - au-delà de `MAX_VIEW_BYTES`, rien n'est transféré (`tooBig`) ;
 *   - un contenu non décodable en UTF-8 strict est signalé `binary`.
 * Le client affiche le texte tel quel : jamais d'interprétation HTML/SVG.
 */
import { getSession } from "@/lib/session";
import { API_ERROR, json, jsonCodeError, jsonErrorPayload } from "@/lib/http";
import { getBlob, safeRef, safeRepoPath } from "@/lib/github";
import { AppError } from "@/lib/errors";

export const dynamic = "force-dynamic";

interface Params {
  params: Promise<{ owner: string; repo: string }>;
}

export async function GET(req: Request, { params }: Params): Promise<Response> {
  const session = await getSession();
  if (!session) return jsonCodeError(API_ERROR.AUTH_REQUIRED, 401);

  const { owner, repo } = await params;
  const url = new URL(req.url);

  let path = "";
  let ref = "";
  try {
    path = safeRepoPath(url.searchParams.get("path") ?? "");
    ref = safeRef(url.searchParams.get("ref"));
  } catch (e) {
    return jsonErrorPayload(e, 400);
  }
  if (!path) return jsonCodeError(API_ERROR.PATH_REQUIRED, 400);

  try {
    return json({ blob: await getBlob(session.token, owner, repo, path, ref) });
  } catch (e) {
    const status =
      e instanceof AppError && e.code === "NOT_FOUND"
        ? 404
        : e instanceof AppError && e.code === "RATE_LIMITED"
          ? 429
          : 500;
    return jsonErrorPayload(e, status);
  }
}
