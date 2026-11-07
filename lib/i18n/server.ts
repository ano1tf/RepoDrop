/**
 * Résolution de la langue courante côté serveur.
 *
 * Ordre de priorité :
 *   1. cookie `rd_lang` — choix explicite de l'utilisateur, il prime toujours ;
 *   2. en-tête `Accept-Language` — langue du navigateur, à la première visite ;
 *   3. français.
 *
 * `cookies()` et `headers()` sont asynchrones dans Next 15 : les deux lectures
 * se font en parallèle pour ne pas empiler deux attentes sur chaque rendu.
 */
import { cookies, headers } from "next/headers";
import { LOCALE_COOKIE, normalizeLocale, type Locale } from "./locales";
import { getDictionary } from "./dictionary";
import type { Dict } from "./types";

/** Langue effective de la requête courante. */
export async function getLocale(): Promise<Locale> {
  const [jar, hdrs] = await Promise.all([cookies(), headers()]);
  const fromCookie = jar.get(LOCALE_COOKIE)?.value;
  if (fromCookie) return normalizeLocale(fromCookie);
  return normalizeLocale(hdrs.get("accept-language"));
}

/** Dictionnaire de la requête courante, en un appel. */
export async function getT(): Promise<{ locale: Locale; t: Dict }> {
  const locale = await getLocale();
  return { locale, t: getDictionary(locale) };
}
