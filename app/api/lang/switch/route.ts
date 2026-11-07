/**
 * Bascule de langue par lien direct : `GET /api/lang?to=de&next=/langues`.
 *
 * Redirige après avoir posé le cookie, ce qui rend le changement de langue
 * partageable (un lien suffit) et testable au `curl`. `next` est restreint aux
 * chemins internes pour empêcher une redirection ouverte (open redirect).
 */
import { NextResponse } from "next/server";
import {
  LOCALE_COOKIE,
  LOCALE_COOKIE_MAX_AGE,
  parseLocale,
  safeNextPath,
} from "@/lib/i18n/locales";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const locale = parseLocale(url.searchParams.get("to"));
  const next = safeNextPath(url.searchParams.get("next"));
  const origin = url.origin;

  if (!locale) {
    return NextResponse.redirect(new URL(next, origin));
  }

  const response = NextResponse.redirect(new URL(next, origin));
  response.cookies.set(LOCALE_COOKIE, locale, {
    path: "/",
    maxAge: LOCALE_COOKIE_MAX_AGE,
    sameSite: "lax",
    httpOnly: false,
  });
  return response;
}
