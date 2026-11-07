/**
 * Catalogue des langues proposées par l'interface.
 *
 * Choix de conception : la langue vit dans un **cookie** (`rd_lang`), pas dans
 * l'URL. RepoDrop n'a qu'une poignée de pages publiques ; préfixer chaque route
 * par `/fr`, `/en`, `/ja` multiplierait les URL canoniques, les redirections et
 * le sitemap pour un bénéfice SEO nul tant que les contenus ne sont pas
 * réellement éditorialisés par langue. Conséquence assumée : les moteurs
 * indexent la version par défaut (français) — voir README.
 *
 * Le cookie n'est *pas* `httpOnly` pour une raison précise : il est écrit par
 * une route serveur (`POST /api/lang`) afin que la valeur soit validée contre
 * `LOCALES` avant d'être posée. Une valeur inconnue retombe toujours sur le
 * français au lieu de casser le rendu.
 */

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
  { code: "fr", nativeName: "Français", englishName: "French", flag: "🇫🇷", dir: "ltr" , ogLocale: "fr_FR" },
  { code: "en", nativeName: "English", englishName: "English", flag: "🇬🇧", dir: "ltr" , ogLocale: "en_US" },
  { code: "es", nativeName: "Español", englishName: "Spanish", flag: "🇪🇸", dir: "ltr" , ogLocale: "es_ES" },
  { code: "de", nativeName: "Deutsch", englishName: "German", flag: "🇩🇪", dir: "ltr" , ogLocale: "de_DE" },
  { code: "it", nativeName: "Italiano", englishName: "Italian", flag: "🇮🇹", dir: "ltr" , ogLocale: "it_IT" },
  { code: "pt", nativeName: "Português", englishName: "Portuguese", flag: "🇵🇹", dir: "ltr" , ogLocale: "pt_PT" },
  { code: "nl", nativeName: "Nederlands", englishName: "Dutch", flag: "🇳🇱", dir: "ltr" , ogLocale: "nl_NL" },
  { code: "pl", nativeName: "Polski", englishName: "Polish", flag: "🇵🇱", dir: "ltr" , ogLocale: "pl_PL" },
  { code: "ru", nativeName: "Русский", englishName: "Russian", flag: "🇷🇺", dir: "ltr" , ogLocale: "ru_RU" },
  { code: "uk", nativeName: "Українська", englishName: "Ukrainian", flag: "🇺🇦", dir: "ltr" , ogLocale: "uk_UA" },
  { code: "tr", nativeName: "Türkçe", englishName: "Turkish", flag: "🇹🇷", dir: "ltr" , ogLocale: "tr_TR" },
  { code: "ar", nativeName: "العربية", englishName: "Arabic", flag: "🇸🇦", dir: "rtl" , ogLocale: "ar_AR" },
  { code: "hi", nativeName: "हिन्दी", englishName: "Hindi", flag: "🇮🇳", dir: "ltr" , ogLocale: "hi_IN" },
  { code: "zh", nativeName: "中文", englishName: "Chinese", flag: "🇨🇳", dir: "ltr" , ogLocale: "zh_CN" },
  { code: "ja", nativeName: "日本語", englishName: "Japanese", flag: "🇯🇵", dir: "ltr" , ogLocale: "ja_JP" },
  { code: "ko", nativeName: "한국어", englishName: "Korean", flag: "🇰🇷", dir: "ltr" , ogLocale: "ko_KR" },
] as const satisfies readonly LocaleDefinition[];

export type Locale = (typeof LOCALES)[number]["code"];

export const DEFAULT_LOCALE: Locale = "fr";

/** Nom du cookie de préférence linguistique (posé par `POST /api/lang`). */
export const LOCALE_COOKIE = "rd_lang";

/** Un an : une préférence de langue n'a pas besoin d'expirer plus vite. */
export const LOCALE_COOKIE_MAX_AGE = 60 * 60 * 24 * 365;

const LOCALE_CODES = new Set<string>(LOCALES.map((l) => l.code));

/** Vrai si la valeur est un code de langue supporté, exactement. */
export function isLocale(value: string | null | undefined): value is Locale {
  return typeof value === "string" && LOCALE_CODES.has(value);
}

/**
 * Normalise une valeur brute (cookie, `Accept-Language`) en langue supportée.
 *
 *   `"de-AT"` → `"de"` · `"zh_CN"` → `"zh"` · `"pt-BR"` → `"pt"`
 *   `"en-US,en;q=0.9"` → `"en"` · `"xx"` → `"fr"` (défaut)
 *
 * Volontairement tolérant mais jamais devin : une valeur inconnue ne produit
 * pas d'erreur, elle retombe sur le français.
 */
export function normalizeLocale(
  raw: string | null | undefined,
  fallback: Locale = DEFAULT_LOCALE,
): Locale {
  if (!raw) return fallback;
  // En-tête Accept-Language : on garde la première langue de la liste.
  const first = raw.split(",")[0]?.trim() ?? "";
  const base = first.split(";")[0]?.trim().toLowerCase().replace(/_/g, "-") ?? "";
  if (isLocale(base)) return base;
  const primary = base.split("-")[0] ?? "";
  if (isLocale(primary)) return primary;
  return fallback;
}

/** Locale OpenGraph d'une langue (`en` → `en_US`). */
export function ogLocaleOf(locale: Locale): string {
  return LOCALES.find((l) => l.code === locale)?.ogLocale ?? "fr_FR";
}

/**
 * Variante **stricte** de `normalizeLocale` : renvoie `null` au lieu de replier
 * sur le français. Réservée aux entrées utilisateur (`POST /api/lang`), où
 * accepter silencieusement « klingon » comme du français masquerait un bug
 * d'appel au lieu de le signaler.
 *
 * Les variantes légitimes restent ramenées à leur langue de base
 * (`pt-BR` → `pt`, `de-AT` → `de`), exactement comme l'en-tête
 * `Accept-Language`.
 */
export function parseLocale(raw: string | null | undefined): Locale | null {
  const normalized = normalizeLocale(raw, DEFAULT_LOCALE);
  // `normalizeLocale` a replié : la valeur d'origine n'était pas supportée.
  if (normalized !== DEFAULT_LOCALE) return normalized;
  const base = (raw ?? "")
    .split(",")[0]
    ?.split(";")[0]
    ?.trim()
    .toLowerCase()
    .replace(/_/g, "-");
  return base === DEFAULT_LOCALE ? DEFAULT_LOCALE : null;
}

/** Sens d'écriture d'une langue (alimente `<html dir>`). */
export function dirOf(locale: Locale): "ltr" | "rtl" {
  return LOCALES.find((l) => l.code === locale)?.dir ?? "ltr";
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
 * `/api/lang/switch?to=de&next=//evil.com` serait une redirection ouverte
 * pilotée par un simple lien.
 */
export function safeNextPath(value: string | null | undefined): string {
  if (!value || !value.startsWith("/") || value.startsWith("//")) return "/";
  // Les navigateurs normalisent `/\` et `/ <tab>` en `//` : refusés aussi.
  if (/[\\\s]/.test(value)) return "/";
  return value;
}
