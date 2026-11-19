import { NextResponse } from "next/server";
import {
  EMBEDDED_LOCALE_COOKIE,
  LOCALE_COOKIE,
  LOCALE_COOKIE_OPTIONS,
  parseLocale,
  safeNextPath,
  type Locale,
} from "@/lib/i18n/locales";
import { isPrefetch, localizePath } from "@/lib/i18n/navigation";
import { isSecureRequest } from "@/lib/http";

const NO_STORE = { "Cache-Control": "no-store" };

function saveLocale(response: NextResponse, request: Request, locale: Locale) {
  const secure = isSecureRequest(request);
  response.cookies.set(LOCALE_COOKIE, locale, { ...LOCALE_COOKIE_OPTIONS, secure });
  if (secure) {
    // Les navigateurs qui bloquent les cookies tiers peuvent accepter ce
    // cookie propre au site parent de l'iframe. Pas de changement sur la session.
    response.cookies.set(EMBEDDED_LOCALE_COOKIE, locale, {
      ...LOCALE_COOKIE_OPTIONS,
      sameSite: "none",
      secure: true,
      partitioned: true,
    });
  }
}

/**
 * Navigation document vers une URL relative, compatible avec le proxy.
 * `lang` assure le rendu de la page cible même si les cookies sont bloqués.
 */
export async function GET(request: Request) {
  if (isPrefetch(request.headers) || request.headers.has("rsc")) {
    return new NextResponse(null, { status: 204, headers: NO_STORE });
  }
  const { searchParams } = new URL(request.url);
  const locale = parseLocale(searchParams.get("to"));
  const next = safeNextPath(searchParams.get("next"));
  const response = new NextResponse(null, {
    status: 307,
    headers: { ...NO_STORE, Location: localizePath(next, locale) },
  });
  if (locale) saveLocale(response, request, locale);
  return response;
}

/** `POST /api/locale` `{ locale }` → `{ locale }` + cookie. */
export async function POST(request: Request) {
  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: "invalid_json" }, { status: 400, headers: NO_STORE });
  }

  const raw = (payload as { locale?: unknown } | null)?.locale;
  const locale = typeof raw === "string" ? parseLocale(raw) : null;
  if (!locale) {
    return NextResponse.json({ error: "unsupported_locale" }, { status: 400, headers: NO_STORE });
  }

  const response = NextResponse.json({ locale }, { headers: NO_STORE });
  saveLocale(response, request, locale);
  return response;
}
