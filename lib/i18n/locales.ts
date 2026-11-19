/** Catalogue des langues et résolution des préférences de RepoDrop. */

export interface LocaleDefinition {
  /** Code BCP-47 court, tel qu'utilisé dans `<html lang>` et dans le cookie. */
  code: string;
  /** Nom de la langue **dans cette langue** (ce que voit l'utilisateur). */
  nativeName: string;
  /** Nom en anglais, pour la recherche dans le sélecteur. */
  englishName: string;
  /** Drapeau emoji : lisible partout, aucun asset à charger. */
  flag: string;
  /** Sens d'écriture ; `rtl` alimente l'attribut `dir` de `<html>`. */
  dir: "ltr" | "rtl";
  /** Locale OpenGraph correspondante (`og:locale`). */
  ogLocale: string;
}

export const LOCALES = [
  { code: "fr", nativeName: "Français", englishName: "French", flag: "🇫🇷", dir: "ltr", ogLocale: "fr_FR" },
  { code: "en", nativeName: "English", englishName: "English", flag: "🇬🇧", dir: "ltr", ogLocale: "en_US" },
  { code: "es", nativeName: "Español", englishName: "Spanish", flag: "🇪🇸", dir: "ltr", ogLocale: "es_ES" },
  { code: "de", nativeName: "Deutsch", englishName: "German", flag: "🇩🇪", dir: "ltr", ogLocale: "de_DE" },
  { code: "it", nativeName: "Italiano", englishName: "Italian", flag: "🇮🇹", dir: "ltr", ogLocale: "it_IT" },
  { code: "pt", nativeName: "Português", englishName: "Portuguese", flag: "🇵🇹", dir: "ltr", ogLocale: "pt_PT" },
  { code: "nl", nativeName: "Nederlands", englishName: "Dutch", flag: "🇳🇱", dir: "ltr", ogLocale: "nl_NL" },
  { code: "pl", nativeName: "Polski", englishName: "Polish", flag: "🇵🇱", dir: "ltr", ogLocale: "pl_PL" },
  { code: "ru", nativeName: "Русский", englishName: "Russian", flag: "🇷🇺", dir: "ltr", ogLocale: "ru_RU" },
  { code: "uk", nativeName: "Українська", englishName: "Ukrainian", flag: "🇺🇦", dir: "ltr", ogLocale: "uk_UA" },
  { code: "tr", nativeName: "Türkçe", englishName: "Turkish", flag: "🇹🇷", dir: "ltr", ogLocale: "tr_TR" },
  { code: "ar", nativeName: "العربية", englishName: "Arabic", flag: "🇸🇦", dir: "rtl", ogLocale: "ar_AR" },
  { code: "hi", nativeName: "हिन्दी", englishName: "Hindi", flag: "🇮🇳", dir: "ltr", ogLocale: "hi_IN" },
  { code: "zh", nativeName: "中文", englishName: "Chinese", flag: "🇨🇳", dir: "ltr", ogLocale: "zh_CN" },
  { code: "ja", nativeName: "日本語", englishName: "Japanese", flag: "🇯🇵", dir: "ltr", ogLocale: "ja_JP" },
  { code: "ko", nativeName: "한국어", englishName: "Korean", flag: "🇰🇷", dir: "ltr", ogLocale: "ko_KR" },
] as const satisfies readonly LocaleDefinition[];

export type Locale = (typeof LOCALES)[number]["code"];

export const DEFAULT_LOCALE: Locale = "fr";

/** Préférence linguistique, persistée pendant un an. */
export const LOCALE_COOKIE = "rd_lang";
export const EMBEDDED_LOCALE_COOKIE = "rd_lang_embed";
export const LOCALE_COOKIE_OPTIONS = {
  path: "/",
  maxAge: 60 * 60 * 24 * 365,
  sameSite: "lax",
  httpOnly: true,
} as const;

/** Langue demandée dans l'URL, utilisable même si les cookies sont bloqués. */
export const LOCALE_PARAM = "lang";

/** En-têtes internes écrasés par le middleware. */
export const LOCALE_HEADER = "x-rd-lang";
export const URL_LOCALE_HEADER = "x-rd-url-lang";

const LOCALE_CODES = new Set<string>(LOCALES.map((l) => l.code));

/** Vrai si la valeur est un code de langue supporté, exactement. */
export function isLocale(value: string | null | undefined): value is Locale {
  return typeof value === "string" && LOCALE_CODES.has(value);
}

/** Valide un code unique, avec repli d'une variante régionale sur sa langue. */
export function parseLocale(raw: string | null | undefined): Locale | null {
  const tag = raw?.trim().toLowerCase().replace(/_/g, "-") ?? "";
  if (!/^[a-z]{2,8}(?:-[a-z0-9]{1,8})*$/.test(tag)) return null;
  const primary = tag.split("-", 1)[0];
  return isLocale(primary) ? primary : null;
}

/**
 * Négocie `Accept-Language` : meilleur poids parmi les langues prises en
 * charge, ordre du navigateur en cas d'égalité. `q=0` exclut une entrée.
 */
export function normalizeLocale(
  raw: string | null | undefined,
  fallback: Locale = DEFAULT_LOCALE,
): Locale {
  let best = fallback;
  let bestWeight = 0;
  for (const range of (raw ?? "").split(",")) {
    const [tag, quality, ...extra] = range.split(";");
    const locale = parseLocale(tag);
    if (!locale || extra.length) continue;
    const weight = quality === undefined
      ? 1
      : Number(/^q\s*=\s*(0(?:\.\d{0,3})?|1(?:\.0{0,3})?)$/i.exec(quality.trim())?.[1]);
    if (weight > bestWeight) {
      best = locale;
      bestWeight = weight;
    }
  }
  return best;
}

/** Le cookie partitionné permet de mémoriser le choix en iframe HTTPS. */
export function savedLocale(
  firstParty: string | null | undefined,
  embedded: string | null | undefined,
): Locale | null {
  if (isLocale(firstParty)) return firstParty;
  return isLocale(embedded) ? embedded : null;
}

/** La préférence enregistrée prime sur le navigateur, puis le français. */
export function resolveLocale(
  cookieValue: string | null | undefined,
  acceptLanguage: string | null | undefined,
): Locale {
  return isLocale(cookieValue) ? cookieValue : normalizeLocale(acceptLanguage);
}

/** Locale OpenGraph d'une langue (`en` → `en_US`). */
export function ogLocaleOf(locale: Locale): string {
  return localeDefinition(locale).ogLocale;
}

/** Sens d'écriture d'une langue (alimente `<html dir>`). */
export function dirOf(locale: Locale): "ltr" | "rtl" {
  return localeDefinition(locale).dir;
}

/** Définition complète d'une langue (nom natif, drapeau, sens). */
export function localeDefinition(locale: Locale): LocaleDefinition {
  return LOCALES.find((l) => l.code === locale) ?? LOCALES[0];
}

/**
 * Destination autorisée après une bascule de langue par lien direct.
 *
 * Seuls les chemins absolus **internes** sont acceptés : `https://evil.com`,
 * `//evil.com`, `/\evil.com` et `/<tab>` retombent tous sur `/`. Sans ce filtre,
 * `/api/locale?to=de&next=//evil.com` serait une redirection ouverte pilotée
 * par un simple lien.
 */
export function safeNextPath(value: string | null | undefined): string {
  if (!value || !value.startsWith("/") || value.startsWith("//")) return "/";
  // Les navigateurs normalisent `/\` et `/ <tab>` en `//` : refusés aussi.
  if (/[\\\s\x00-\x1f\x7f]/.test(value)) return "/";
  return value;
}
