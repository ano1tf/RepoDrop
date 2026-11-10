/**
 * Middleware i18n — résout la langue **à chaque requête**.
 *
 * Pourquoi un middleware ?
 * -----------------------
 * La langue vit dans un cookie (`rd_lang`). Sans middleware, chaque page
 * devait retrouver elle-même le cookie et se rabattre sur
 * `Accept-Language` : une logique dupliquée, et facile à oublier sur une
 * nouvelle route. Le middleware centralise la règle :
 *
 *   1. le cookie `rd_lang` — choix explicite de l'utilisateur ;
 *   2. l'en-tête `Accept-Language` — langue du navigateur ;
 *   3. le français.
 *
 * Il fait deux choses :
 *
 *   - il **pose le cookie** dès la première visite, pour que la langue
 *     détectée reste stable d'une page à l'autre (et d'une visite à l'autre) ;
 *   - il transmet la langue résolue au rendu via l'en-tête `x-rd-lang`,
 *     que `lib/i18n/server.ts` relit. Le rendu serveur et le middleware
 *     voient ainsi **exactement** la même langue.
 *
 * Le changement de langue lui-même est assuré par `/api/locale` (route GET
 * avec redirection) : c'est un aller-retour document classique, donc aucune
 * course avec le cache de navigation côté client.
 */
import { NextResponse, type NextRequest } from "next/server";
import {
  LOCALE_COOKIE,
  LOCALE_COOKIE_MAX_AGE,
  LOCALE_HEADER,
  resolveLocale,
} from "@/lib/i18n/locales";

export const config = {
  /**
   * On laisse de côté :
   * - `api` : les routes API ne sont pas localisées, et `/api/locale` pose
   *   elle-même le cookie — elle ne doit pas entrer en conflit avec le
   *   middleware ;
   * - `_next/*` : les assets sont servis tels quels ;
   * - les fichiers statiques (images, icônes, `robots.txt`, `sitemap.xml`).
   */
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|webmanifest|txt|xml)$).*)",
  ],
};

export function middleware(request: NextRequest): NextResponse {
  const cookieValue = request.cookies.get(LOCALE_COOKIE)?.value;
  const locale = resolveLocale(cookieValue, request.headers.get("accept-language"));

  // La langue résolue est transmise au rendu serveur.
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set(LOCALE_HEADER, locale);

  const response = NextResponse.next({
    request: { headers: requestHeaders },
  });

  /*
   * On (re)pose le cookie s'il est absent ou invalide : la langue détectée
   * devient alors explicite et survit aux navigations comme aux sessions.
   * Une bascule de langue passe toujours par `/api/locale`, qui écrit le
   * cookie lui-même et redirige — le middleware ne fait que rattraper les
   * visites sans préférence.
   */
  if (cookieValue !== locale) {
    response.cookies.set(LOCALE_COOKIE, locale, {
      path: "/",
      maxAge: LOCALE_COOKIE_MAX_AGE,
      sameSite: "lax",
      // Lisible par le client : le sélecteur de langue met en évidence la
      // langue active sans attendre un aller-retour serveur.
      httpOnly: false,
    });
  }

  return response;
}
