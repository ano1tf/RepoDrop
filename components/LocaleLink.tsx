"use client";

import Link from "next/link";
import { createContext, useCallback, useContext, type ComponentProps, type ReactNode } from "react";
import type { Locale } from "@/lib/i18n/locales";
import { localizePath } from "@/lib/i18n/navigation";
import type { Dict } from "@/lib/i18n/types";

type ErrorCopy = Dict["errorPage"] & { home: string };
const LocaleContext = createContext<{ urlLocale: Locale | null; errorCopy?: ErrorCopy }>({ urlLocale: null });

export function LocaleNavigation({ urlLocale, errorCopy, children }: {
  urlLocale: Locale | null;
  errorCopy?: ErrorCopy;
  children: ReactNode;
}) {
  return <LocaleContext.Provider value={{ urlLocale, errorCopy }}>{children}</LocaleContext.Provider>;
}

export function usePageErrorCopy() {
  return useContext(LocaleContext).errorCopy;
}

export function useLocalizedPath() {
  const { urlLocale: locale } = useContext(LocaleContext);
  return useCallback((href: string) => localizePath(href, locale), [locale]);
}

/** En mode sans cookie, les liens internes transmettent la langue au serveur. */
export default function LocaleLink({ href, ...props }: Omit<ComponentProps<typeof Link>, "href"> & { href: string }) {
  const localize = useLocalizedPath();
  return <Link {...props} href={localize(href)} />;
}
