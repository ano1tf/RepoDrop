import { LOCALES, type Locale } from "./locales";

/** Ignore optional accents and width variants without dropping meaningful
 * vowel signs in scripts such as Devanagari. Used for comparison, never display. */
export function searchKey(text: string, locale: Locale): string {
  return text.normalize("NFKC").toLocaleLowerCase(locale).normalize("NFD")
    .replace(/([\p{Script=Latin}\p{Script=Arabic}])\p{Mark}+/gu, "$1")
    .replace(/ß/g, "ss").replace(/œ/g, "oe").replace(/æ/g, "ae")
    .replace(/ł/g, "l").replace(/ı/g, "i")
    .normalize("NFC").trim();
}

/** Match a language by code, endonym, or the name in the current UI language. */
export function findLanguages(query: string, locale: Locale) {
  const needle = searchKey(query, locale);
  if (!needle) return LOCALES;
  const names = typeof Intl.DisplayNames === "function"
    ? new Intl.DisplayNames(locale, { type: "language" })
    : null;
  return LOCALES.filter((entry) => {
    const labels = [entry.code, entry.nativeName, entry.englishName, names?.of(entry.code) ?? ""];
    return labels.some((label) => searchKey(label, locale).includes(needle));
  });
}
