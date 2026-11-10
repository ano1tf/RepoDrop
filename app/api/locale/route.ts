/**
 * Changement de langue — **route API**, sans Server Action.
 *
 * Pourquoi une route plutôt qu'une Server Action ?
 * -------------------------------------------
 * Le comportement attendu est un **simple aller-retour document** :
 *
 *   GET /api/locale?to=de&next=/import
 *     → pose le cookie `rd_lang` sur la réponse de redirection
 *     → 307 vers `/import`, déjà rendu **en allemand**
 *
 * Le cookie est écrit par le navigateur *avant* le rendu de la page cible :
 * la langue persiste donc 100 % du temps, y compris après un `hard load`,
 * un nouvel onglet ou un retour arrière. Une Server Action, elle, renvoie un
 * payload RSC que Next.js peut servir depuis le cache de navigation
 * (préchargé dans l'ancienne langue) : c'était la cause du bug « ça revient
 * en français ».
 *
 * Deux interfaces, même cookie :
 *   - **GET** `?to=xx&next=/chemin` — redirection (sélecteur de langue,
 *     liens directs, `curl`). `next` est restreint aux chemins internes
 *     (`safeNextPath`) : pas de redirection ouverte. Le `Location` est
 *     **relatif** (cf. `lib/http.ts`) : `req.url` désigne souvent l'adresse
 *     interne du serveur (`0.0.0.0`), inexploitable par le navigateur.
 *   - **POST** `{ "locale": "xx" }` → JSON `{ locale }` — pour les appels
 *     programmatiques (aucune redirection).
 *
 * Dans les deux cas la langue est validée par `parseLocale` : une valeur
 * inconnue est un 400 explicite (POST) ou une redirection **sans** poser de
 * cookie (GET), jamais un repli silencieux en français.
 */
import { NextResponse } from "next/server";
import {
  LOCALE_COOKIE,
  LOCALE_COOKIE_MAX_AGE,
  parseLocale,
  safeNextPath,
  type Locale,
} from "@/lib/i18n/locales";

const COOKIE_OPTIONS = {
  path: "/",
  maxAge: LOCALE_COOKIE_MAX_AGE,
  sameSite: "lax",
  // Lisible par le client : le sélecteur met en évidence la langue active
  // sans attendre un aller-retour serveur.
  httpOnly: false,
} as const;

/** Sérialise le cookie de langue (`locale` vient d'une liste blanche). */
function serializeLocaleCookie(locale: Locale): string {
  return `${LOCALE_COOKIE}=${locale}; Path=/; Max-Age=${LOCALE_COOKIE_MAX_AGE}; SameSite=Lax`;
}

/** `GET /api/locale?to=de&next=/import` → cookie + redirection (relative). */
export async function GET(request: Request) {
  const url = new URL(request.url);
  const locale = parseLocale(url.searchParams.get("to"));
  const next = safeNextPath(url.searchParams.get("next"));

  const headers = new Headers({
    Location: next,
    "Cache-Control": "no-store",
  });
  if (locale) headers.append("Set-Cookie", serializeLocaleCookie(locale));
  return new Response(null, { status: 307, headers });
}

/** `POST /api/locale` `{ locale }` → `{ locale }` + cookie. */
export async function POST(request: Request) {
  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: "invalid_json" }, { status: 400 });
  }

  const raw = (payload as { locale?: unknown } | null)?.locale;
  if (typeof raw !== "string") {
    return NextResponse.json({ error: "unsupported_locale" }, { status: 400 });
  }

  /*
   * Validation stricte (`parseLocale`, pas `normalizeLocale`) : une langue
   * inconnue doit être un 400 explicite, pas un repli silencieux en français.
   * Les variantes légitimes (`pt-BR`, `de-AT`) restent ramenées à leur langue
   * de base, comme pour l'en-tête `Accept-Language`.
   */
  const locale = parseLocale(raw);
  if (!locale) {
    return NextResponse.json({ error: "unsupported_locale" }, { status: 400 });
  }

  const response = NextResponse.json({ locale });
  response.cookies.set(LOCALE_COOKIE, locale, COOKIE_OPTIONS);
  return response;
}
