"use server";

/**
 * Changement de langue — **Server Action**.
 *
 * Pourquoi une Server Action plutôt qu'un `POST /api/lang` suivi d'un
 * `router.refresh()` ?
 * --------------------------------------------------
 * Next.js réutilise pendant plusieurs minutes les segments RSC **préchargés**
 * par les `<Link>` (`prefetchCache`, 5 minutes par défaut). Ces segments ont
 * été rendus dans l'ancienne langue : sans invalidation, revenir sur la
 * page d'origine affiche le contenu **dans l'ancienne langue** — c'est
 * exactement le bug « je passe en anglais, je navigue, et tout revient en
 * français ».
 *
 * `router.refresh()` ne suffit pas : il ne recharge que la page courante et
 * laisse le cache de préchargement intact. Une Server Action, elle, renvoie
 * le nouvel arbre RSC **et** vide le cache de navigation côté client
 * (`mutable.prefetchCache = new Map()` côté Next.js) ; `revalidatePath`
 * invalide en plus le cache serveur de toutes les routes.
 *
 * La Server Action pose aussi le cookie : `cookies().set()` y est autorisé,
 * et la valeur est validée contre le catalogue avant d'être écrite.
 */
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import {
  LOCALE_COOKIE,
  LOCALE_COOKIE_MAX_AGE,
  parseLocale,
  type Locale,
} from "@/lib/i18n/locales";

/** Résultat de l'action : `ok` false si la langue est inconnue. */
export interface SetLocaleResult {
  ok: boolean;
  locale?: Locale;
}

/**
 * Change la langue de l'interface et invalide les caches de rendu.
 *
 * @param code Code de langue (`fr`, `en`, `ja`…). Une valeur inconnue est
 *             refusée : le français reste actif.
 */
export async function setLocale(code: string): Promise<SetLocaleResult> {
  // Validation stricte (`parseLocale`, pas `normalizeLocale`) : une langue
  // inconnue doit être refusée, pas repliée silencieusement en français.
  const locale = parseLocale(code);
  if (!locale) return { ok: false };

  const jar = await cookies();
  jar.set(LOCALE_COOKIE, locale, {
    path: "/",
    maxAge: LOCALE_COOKIE_MAX_AGE,
    sameSite: "lax",
    // Lisible par le client : le sélecteur met en évidence la langue active
    // sans attendre un aller-retour serveur.
    httpOnly: false,
  });

  /*
   * Invalidation globale :
   * - côté serveur, le cache de rendu de toutes les routes estmarks comme
   *   périmé (elles seront rendues dans la nouvelle langue) ;
   * - côté client, l'action renvoie le nouvel arbre RSC, ce qui vide le
   *   cache de navigation : plus aucun segment préchargé dans l'ancienne
   *   langue ne peut resservir.
   */
  revalidatePath("/", "layout");

  return { ok: true, locale };
}
