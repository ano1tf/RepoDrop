/**
 * Préférence linguistique : `POST /api/lang` avec `{ locale }`.
 *
 * API publique (appelable sans JavaScript, depuis un script externe). Dans
 * l'interface, le sélecteur de langue utilise la Server Action
 * `app/actions/lang.ts`, qui pose le même cookie **et** invalide le cache de
 * navigation côté client — c'est elle qui empêche l'apparition de segments
 * préchargés dans l'ancienne langue.
 *
 * Pourquoi une route et pas une écriture directe depuis le client ?
 * `document.cookie` accepterait n'importe quelle valeur ; ici la langue est
 * **validée contre le catalogue** avant d'être posée. Une valeur inconnue est
 * refusée (400) et le francais reste actif — aucune chaîne arbitraire ne peut
 * donc entrer dans un cookie qui pilote le rendu et l'attribut `lang`.
 *
 * La réponse est volontairement minimale : le client recharge la page derrière
 * (les Server Components doivent être re-rendus avec la nouvelle langue).
 */
import { NextResponse } from "next/server";
import {
  LOCALE_COOKIE,
  LOCALE_COOKIE_MAX_AGE,
  parseLocale,
} from "@/lib/i18n/locales";

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
  response.cookies.set(LOCALE_COOKIE, locale, {
    path: "/",
    maxAge: LOCALE_COOKIE_MAX_AGE,
    sameSite: "lax",
    // Lisible par le client : le sélecteur met en évidence la langue active
    // sans attendre un aller-retour serveur.
    httpOnly: false,
  });
  return response;
}
