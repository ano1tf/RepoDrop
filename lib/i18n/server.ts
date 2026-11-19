import { cache } from "react";
import { cookies, headers } from "next/headers";
import {
  EMBEDDED_LOCALE_COOKIE,
  isLocale,
  LOCALE_COOKIE,
  LOCALE_HEADER,
  URL_LOCALE_HEADER,
  resolveLocale,
  savedLocale,
  type Locale,
} from "./locales";
import { getDictionary } from "./dictionary";

/** La langue et son éventuel repli URL, identiques pour le layout et la page. */
export const getLocaleState = cache(async () => {
  const [jar, hdrs] = await Promise.all([cookies(), headers()]);
  const resolved = hdrs.get(LOCALE_HEADER);
  // Le middleware connaît la préférence URL, qui doit primer sur le cookie.
  const locale: Locale = isLocale(resolved)
    ? resolved
    : resolveLocale(
        savedLocale(jar.get(LOCALE_COOKIE)?.value, jar.get(EMBEDDED_LOCALE_COOKIE)?.value),
        hdrs.get("accept-language"),
      );
  const urlLocale = hdrs.get(URL_LOCALE_HEADER) === locale ? locale : null;
  return { locale, urlLocale };
});

export async function getT() {
  const state = await getLocaleState();
  return { ...state, t: getDictionary(state.locale) };
}
