import { EMBEDDED_LOCALE_COOKIE, LOCALE_COOKIE, resolveLocale, savedLocale } from "./locales";
import { localeFromUrl } from "./navigation";

/** API handlers do not run through the page middleware. Resolve the same
 * preferences from the request, without trusting internal locale headers. */
export function requestLocale(request: Request) {
  const cookies = new Map(request.headers.get("cookie")?.split(";").map((part) => {
    const [name, ...value] = part.trim().split("=");
    return [name, value.join("=")];
  }));
  return localeFromUrl(new URL(request.url)) ?? resolveLocale(
    savedLocale(cookies.get(LOCALE_COOKIE), cookies.get(EMBEDDED_LOCALE_COOKIE)),
    request.headers.get("accept-language"),
  );
}
