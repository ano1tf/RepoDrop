/**
 * GET /api/auth/dev-login — connexion directe SANS OAuth (DEV_AUTH=1).
 * Utilise le jeton GitHub présent dans l'environnement du serveur
 * (GH_TOKEN / GITHUB_TOKEN) : sert aux démos et au développement local.
 * Inactif en production tant que DEV_AUTH n'est pas "1".
 */
import { config } from "@/lib/config";
import { getViewer } from "@/lib/github";
import { setSessionCookie } from "@/lib/session";
import { isSecureRequest, redirectTo } from "@/lib/http";
import { localeFromUrl, localizePath } from "@/lib/i18n/navigation";
import { clientIp } from "@/lib/ratelimit";
import { logEvent } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function GET(req: Request): Promise<Response> {
  const urlLocale = localeFromUrl(new URL(req.url));
  if (!config.devAuth) {
    return redirectTo(localizePath("/login?error=config", urlLocale));
  }
  const token = process.env.GH_TOKEN ?? process.env.GITHUB_TOKEN ?? "";
  if (!token) {
    return redirectTo(localizePath("/login?error=devauth", urlLocale));
  }
  let viewer: Awaited<ReturnType<typeof getViewer>>;
  try {
    viewer = await getViewer(token);
    await setSessionCookie(
      {
        login: viewer.login,
        name: viewer.name || viewer.login,
        avatar: viewer.avatar_url,
        token,
        id: viewer.id,
      },
      isSecureRequest(req),
    );
  } catch (e) {
    console.error("[dev-login] /user en échec:", e);
    return redirectTo(localizePath("/login?error=devauth", urlLocale));
  }
  logEvent({
    kind: "login",
    login: viewer.login,
    ip: clientIp(req.headers),
    detail: { via: "dev" },
  });
  return redirectTo(localizePath("/import", urlLocale));
}
