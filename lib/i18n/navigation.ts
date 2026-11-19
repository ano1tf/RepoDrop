import { LOCALE_PARAM, parseLocale, safeNextPath, type Locale } from "./locales";

/** Ajoute/remplace la langue sans toucher à l'origine, au chemin ni à l'ancre. */
export function localizePath(path: string, locale: Locale | null): string {
  if (!locale || safeNextPath(path) !== path) return path;

  const hashIndex = path.indexOf("#");
  const hash = hashIndex < 0 ? "" : path.slice(hashIndex);
  const withoutHash = hashIndex < 0 ? path : path.slice(0, hashIndex);
  const queryIndex = withoutHash.indexOf("?");
  const pathname = queryIndex < 0 ? withoutHash : withoutHash.slice(0, queryIndex);
  const params = new URLSearchParams(queryIndex < 0 ? "" : withoutHash.slice(queryIndex + 1));
  params.set(LOCALE_PARAM, locale);
  return `${pathname}?${params}${hash}`;
}

/** Lien document (pas de `next/link`) qui enregistre une préférence explicite. */
export function localeSwitchPath(locale: Locale, next: string): string {
  return `/api/locale?${new URLSearchParams({ to: locale, next: safeNextPath(next) })}`;
}

export function localeFromUrl(url: URL): Locale | null {
  return parseLocale(url.searchParams.get(LOCALE_PARAM));
}

/** Un préchargement du navigateur ou du routeur ne choisit jamais une langue. */
export function isPrefetch(headers: Headers): boolean {
  return headers.has("next-router-prefetch") ||
    headers.has("next-router-segment-prefetch") ||
    ["purpose", "sec-purpose"].some((name) => /\bprefetch\b/i.test(headers.get(name) ?? ""));
}
