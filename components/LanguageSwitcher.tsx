"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { Check, Languages, Search } from "lucide-react";
import { LOCALES, localeDefinition, type Locale } from "@/lib/i18n/locales";
import { localeSwitchPath } from "@/lib/i18n/navigation";
import { cn } from "@/lib/utils";

interface Props {
  locale: Locale;
  changeLabel: string;
  searchLabel: string;
  currentLabel: string;
  emptyLabel: string;
}

function searchKey(text: string, locale: Locale): string {
  return text.toLocaleLowerCase(locale).normalize("NFD").replace(/\p{M}/gu, "");
}

export function LanguageSwitcher({
  locale,
  changeLabel,
  searchLabel,
  currentLabel,
  emptyLabel,
}: Props) {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const detailsRef = useRef<HTMLDetailsElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const pathname = usePathname();
  const search = useSearchParams()?.toString();
  const returnTo = (pathname ?? "/") + (search ? `?${search}` : "");

  const current = localeDefinition(locale);
  const needle = searchKey(query.trim(), locale);
  const names = needle ? new Intl.DisplayNames(locale, { type: "language" }) : null;
  const filtered = needle
    ? LOCALES.filter((l) =>
        [l.nativeName, l.englishName, names?.of(l.code) ?? "", l.code].some(
          (name) => searchKey(name, locale).includes(needle),
        ),
      )
    : LOCALES;

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      if (detailsRef.current) detailsRef.current.open = false;
      detailsRef.current?.querySelector<HTMLElement>("summary")?.focus();
    };
    const onPointerDown = (e: PointerEvent) => {
      const details = detailsRef.current;
      if (details && !details.contains(e.target as Node)) details.open = false;
    };

    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("pointerdown", onPointerDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("pointerdown", onPointerDown);
    };
  }, [open]);

  useEffect(() => {
    if (open) inputRef.current?.focus();
    else setQuery("");
  }, [open]);

  return (
    <details
      ref={detailsRef}
      onToggle={(e) => setOpen(e.currentTarget.open)}
      className="sm:relative"
    >
      <summary
        aria-label={`${changeLabel} — ${currentLabel}`}
        title={changeLabel}
        className={cn(
          "flex cursor-pointer list-none items-center gap-1.5 rounded-lg px-2.5 py-2 text-sm text-mist",
          "transition-colors hover:bg-panel2 hover:text-chalk [&::-webkit-details-marker]:hidden",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-go/60",
          "marker:content-none",
        )}
      >
        <Languages className="h-4 w-4 shrink-0" aria-hidden="true" />
        <span aria-hidden="true" className="text-base leading-none">
          {current.flag}
        </span>
        <span aria-hidden="true" className="hidden text-xs font-medium uppercase sm:inline">
          {current.code}
        </span>
      </summary>

      <div
        className={cn(
          "absolute inset-x-4 top-full z-50 mt-2 overflow-hidden rounded-xl bg-panel ring-1 ring-edge sm:inset-x-auto sm:end-0 sm:w-64",
          "shadow-[0_18px_40px_-24px_rgba(0,0,0,0.9)]",
        )}
      >
        <div className="border-b border-edge/70 p-2">
          <label className="flex items-center gap-2 rounded-lg bg-panel2 px-1.5 py-1.5 ring-1 ring-edge focus-within:ring-go/50">
            <Search className="h-3.5 w-3.5 shrink-0 text-mist" aria-hidden="true" />
            <input
              ref={inputRef}
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={searchLabel}
              aria-label={searchLabel}
              className="w-full bg-transparent text-xs text-chalk outline-none placeholder:text-mist/70"
            />
          </label>
        </div>

        <ul className="max-h-72 overflow-y-auto p-1">
          {filtered.length === 0 && (
            <li className="px-3 py-2 text-xs text-mist" role="status">{emptyLabel}</li>
          )}
          {filtered.map((l) => {
            const active = l.code === locale;
            return (
              <li key={l.code}>
                {/* Navigation document : aucun prefetch Next ne change le cookie. */}
                <a
                  href={localeSwitchPath(l.code, returnTo)}
                  rel="nofollow"
                  aria-current={active ? "true" : undefined}
                  lang={l.code}
                  dir={l.dir}
                  onClick={(e) => {
                    // Le fragment n'est pas transmis au serveur au rendu du lien.
                    if (window.location.hash) {
                      e.currentTarget.href = localeSwitchPath(l.code, returnTo + window.location.hash);
                    }
                  }}
                  className={cn(
                    "flex w-full items-center gap-2 rounded-lg px-2.5 py-1.5 text-start text-sm transition-colors",
                    active
                      ? "bg-go/10 text-go ring-1 ring-go/25"
                      : "text-mist hover:bg-panel2 hover:text-chalk",
                  )}
                >
                  <span aria-hidden="true" className="text-base leading-none">
                    {l.flag}
                  </span>
                  <span className="flex-1 truncate">{l.nativeName}</span>
                  <span aria-hidden="true" className="font-mono text-[10px] uppercase opacity-60">
                    {l.code}
                  </span>
                  {active && <Check className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />}
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </details>
  );
}
