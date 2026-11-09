/**
 * Résolution de la langue courante côté serveur.
 *
 * Ordre de priorité :
 *   1. cookie `rd_lang` — choix explicite de l'utilisateur, il prime toujours ;
 *   2. en-tête `x-rd-lang` — langue déjà résolue par le middleware ;
 *   3. en-tête `Accept-Language` — langue du navigateur, à la première visite ;
 *   4. français.
 *
 * Pourquoi lire le cookie **et** l'en-tête du middleware ?
 * --------------------------------------------------------
 * Les deux portent la même information, mais pas au même moment : le
 * middleware pose le cookie sur la *réponse*, si bien que la toute première
 * requête ne le voit pas encore dans son propre jar. L'en-tête
 * `x-rd-lang` comble exactement ce trou — et garantit que le rendu serveur
 * et le middleware parlent de la même langue.
 *
 * `cookies()` et `headers()` sont asynchrones dans Next 15 : les deux lectures
 * se font en parallèle pour ne pas empiler deux attentes sur chaque rendu.
 */
import { cookies, headers } from "next/headers";
import {
  isLocale,
  LOCALE_COOKIE,
  LOCALE_HEADER,
  normalizeLocale,
  type Locale,
} from "./locales";
import { getDictionary } from "./dictionary";
import type { Dict } from "./types";

/** Langue effective de la requête courante. */
export async function getLocale(): Promise<Locale> {
  const [jar, hdrs] = await Promise.all([cookies(), headers()]);

  const fromCookie = jar.get(LOCALE_COOKIE)?.value;
  if (isLocale(fromCookie)) return fromCookie;

  const fromMiddleware = hdrs.get(LOCALE_HEADER);
  if (isLocale(fromMiddleware)) return fromMiddleware;

  return normalizeLocale(hdrs.get("accept-language"));
}

/** Dictionnaire de la requête courante, en un appel. */
export async function getT(): Promise<{ locale: Locale; t: Dict }> {
  const locale = await getLocale();
  return { locale, t: getDictionary(locale) };
}
