import { NextResponse, type NextRequest } from "next/server";
import {
  EMBEDDED_LOCALE_COOKIE,
  LOCALE_COOKIE,
  LOCALE_COOKIE_OPTIONS,
  LOCALE_HEADER,
  URL_LOCALE_HEADER,
  resolveLocale,
  savedLocale,
} from "@/lib/i18n/locales";
import { isPrefetch, localeFromUrl } from "@/lib/i18n/navigation";

export const config = {
  // Les API, les fichiers et les visuels de partage ont leur propre rendu.
  matcher: [
    "/((?!api|_next/static|_next/image|opengraph-image|twitter-image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|webmanifest|txt|xml)$).*)",
  ],
};

export function middleware(request: NextRequest): NextResponse {
  const cookieLocale = savedLocale(
    request.cookies.get(LOCALE_COOKIE)?.value,
    request.cookies.get(EMBEDDED_LOCALE_COOKIE)?.value,
  );
  const urlLocale = localeFromUrl(request.nextUrl);
  const locale = urlLocale ?? resolveLocale(cookieLocale, request.headers.get("accept-language"));

  // La préférence dans l'URL prime : au retour de /api/locale, le navigateur
  // peut avoir bloqué le nouveau cookie. Les liens gardent `lang` tant que le
  // serveur ne reçoit pas un cookie qui confirme le choix.
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set(LOCALE_HEADER, locale);
  requestHeaders.delete(URL_LOCALE_HEADER);
  if (urlLocale && urlLocale !== cookieLocale) requestHeaders.set(URL_LOCALE_HEADER, urlLocale);

  const response = NextResponse.next({ request: { headers: requestHeaders } });
  response.headers.set("Content-Language", locale);

  // Seule la route de bascule écrit une préférence explicite. On peut mémoriser
  // la négociation initiale, mais jamais depuis un prefetch ni un rendu de repli.
  if (!cookieLocale && !urlLocale && !isPrefetch(request.headers) && !request.headers.has("rsc")) {
    response.cookies.set(LOCALE_COOKIE, locale, LOCALE_COOKIE_OPTIONS);
  }

  return response;
}
