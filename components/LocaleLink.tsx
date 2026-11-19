"use client";

import Link from "next/link";
import { createContext, useCallback, useContext, type ComponentProps, type ReactNode } from "react";
import type { Locale } from "@/lib/i18n/locales";
import { localizePath } from "@/lib/i18n/navigation";

const UrlLocaleContext = createContext<Locale | null>(null);

export function LocaleNavigation({ urlLocale, children }: { urlLocale: Locale | null; children: ReactNode }) {
  return <UrlLocaleContext.Provider value={urlLocale}>{children}</UrlLocaleContext.Provider>;
}

export function useLocalizedPath() {
  const locale = useContext(UrlLocaleContext);
  return useCallback((href: string) => localizePath(href, locale), [locale]);
}

/** En mode sans cookie, les liens internes transmettent la langue au serveur. */
export default function LocaleLink({ href, ...props }: Omit<ComponentProps<typeof Link>, "href"> & { href: string }) {
  const localize = useLocalizedPath();
  return <Link {...props} href={localize(href)} />;
}
