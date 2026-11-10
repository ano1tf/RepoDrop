/**
 * GET /logout — déconnexion puis ré-authentification immédiate.
 *
 * Distinct de `/api/auth/logout` (qui renvoie à l'accueil) : cette route est
 * l'issue du cas « jeton GitHub expiré ou révoqué ». Le cookie de session est
 * encore valide (7 jours) mais le jeton qu'il contient ne l'est plus : le
 * laisser en place ne ferait que reproduire le 401 à chaque tentative.
 *
 * On purge donc la session **puis** on enchaîne sur `/api/auth/login`, qui
 * ouvre l'écran d'autorisation GitHub. L'utilisateur n'a qu'un clic à faire
 * (« Authorize ») et revient sur `/import` avec un jeton neuf — sans jamais
 * repasser par une page d'erreur.
 *
 * La déconnexion est journalisée comme les autres (panel staff), avec l'IP
 * réelle derrière le proxy.
 */
import { clearSessionCookie, getSession } from "@/lib/session";
import { redirectTo } from "@/lib/http";
import { clientIp } from "@/lib/ratelimit";
import { logEvent } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function GET(req: Request): Promise<Response> {
  const session = await getSession();
  await clearSessionCookie();
  logEvent({
    kind: "logout",
    login: session?.login ?? null,
    ip: clientIp(req.headers),
  });
  return redirectTo("/api/auth/login");
}
