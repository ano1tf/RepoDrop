import { LOCALES, type Locale, type LocaleDefinition } from "./locales";

/** Ignore optional accents and width variants without dropping meaningful
 * vowel signs in scripts such as Devanagari. Used for comparison, never display. */
export function searchKey(text: string, locale: Locale): string {
  return text.normalize("NFKC").toLocaleLowerCase(locale).normalize("NFD")
    .replace(/([\p{Script=Latin}\p{Script=Arabic}])\p{Mark}+/gu, "$1")
    .replace(/ß/g, "ss").replace(/œ/g, "oe").replace(/æ/g, "ae")
    .replace(/ł/g, "l").replace(/ı/g, "i")
    .normalize("NFC").trim();
}

/** Localized names for the gallery and picker, with the endonym as fallback. */
export function languageLabeler(locale: Locale) {
  const names = typeof Intl.DisplayNames === "function"
    ? new Intl.DisplayNames(locale, { type: "language", fallback: "none" })
    : null;
  return (entry: LocaleDefinition) => names?.of(entry.code) ?? entry.nativeName;
}

/** Match a language by code, endonym, English name or translated name. */
export function findLanguages(query: string, locale: Locale) {
  const needle = searchKey(query, locale);
  if (!needle) return LOCALES;
  const label = languageLabeler(locale);
  return LOCALES.filter((entry) => {
    const labels = [entry.code, entry.nativeName, entry.englishName, label(entry)];
    return labels.some((label) => searchKey(label, locale).includes(needle));
  });
}
