"use client";

/**
 * Sélecteur de langue de l'en-tête.
 *
 * Choix d'interface :
 *   - un `<details>` natif plutôt qu'un menu maison : clavier, Échap et
 *     clic-extérieur sont gérés par le navigateur, sans piège de focus à
 *     réimplémenter ;
 *   - un champ de recherche, parce que 16 langues ne tiennent pas dans une
 *     liste qu'on parcourt à l'œil ;
 *   - `role="menuitemradio"` + `aria-checked` : le lecteur d'écran annonce la
 *     langue active, pas seulement une liste de drapeaux.
 *
 * L'écriture passe par `POST /api/lang` (validation serveur), puis
 * `router.refresh()` : les Server Components se re-rendent dans la nouvelle
 * langue sans perdre la page courante. Le cookie étant aussi lu par le client,
 * l'état local bascule immédiatement.
 */
import { useRef, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Check, Languages, Search } from "lucide-react";
import { LOCALES, LOCALE_COOKIE, type Locale } from "@/lib/i18n/locales";
import { cn } from "@/lib/utils";

interface Props {
  locale: Locale;
  label: string;
  changeLabel: string;
  searchLabel: string;
  currentLabel: string;
}

export function LanguageSwitcher({
  locale,
  label,
  changeLabel,
  searchLabel,
  currentLabel,
}: Props) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const detailsRef = useRef<HTMLDetailsElement>(null);

  const current = LOCALES.find((l) => l.code === locale) ?? LOCALES[0];
  const needle = query.trim().toLowerCase();
  const filtered = needle
    ? LOCALES.filter(
        (l) =>
          l.nativeName.toLowerCase().includes(needle) ||
          l.englishName.toLowerCase().includes(needle) ||
          l.code.startsWith(needle),
      )
    : LOCALES;

  async function choose(code: Locale) {
    setOpen(false);
    detailsRef.current?.removeAttribute("open");
    if (code === locale) return;

    try {
      const res = await fetch("/api/lang", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ locale: code }),
      });
      if (!res.ok) return;
    } catch {
      return; // réseau indisponible : on garde la langue courante
    }

    // Repli immédiat côté client (le cookie vient d'être posé par le serveur).
    document.cookie = `${LOCALE_COOKIE}=${code}; path=/; max-age=31536000; samesite=lax`;
    startTransition(() => router.refresh());
  }

  return (
    <details
      ref={detailsRef}
      open={open}
      onToggle={(e) => setOpen((e.currentTarget as HTMLDetailsElement).open)}
      className="relative"
    >
      <summary
        aria-label={`${changeLabel} — ${currentLabel}`}
        title={changeLabel}
        className={cn(
          "flex cursor-pointer list-none items-center gap-1.5 rounded-lg px-2.5 py-2 text-sm text-mist",
          "transition-colors hover:bg-panel2 hover:text-chalk [&::-webkit-details-marker]:hidden",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-go/60",
          pending && "opacity-60",
        )}
      >
        <Languages className="h-4 w-4" aria-hidden="true" />
        <span aria-hidden="true" className="text-base leading-none">
          {current.flag}
        </span>
        <span className="hidden text-xs font-medium uppercase sm:inline">
          {current.code}
        </span>
        <span className="sr-only">{label}</span>
      </summary>

      <div
        role="menu"
        aria-label={label}
        className={cn(
          "absolute right-0 z-50 mt-2 w-64 overflow-hidden rounded-xl bg-panel ring-1 ring-edge",
          "shadow-[0_18px_40px_-24px_rgba(0,0,0,0.9)]",
        )}
      >
        <div className="border-b border-edge/70 p-2">
          <label className="flex items-center gap-2 rounded-lg bg-panel2 px-2 py-1.5 ring-1 ring-edge focus-within:ring-go/50">
            <Search className="h-3.5 w-3.5 shrink-0 text-mist" aria-hidden="true" />
            <input
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
            <li className="px-3 py-2 text-xs text-mist">—</li>
          )}
          {filtered.map((l) => {
            const active = l.code === locale;
            return (
              <li key={l.code}>
                <button
                  type="button"
                  role="menuitemradio"
                  aria-checked={active}
                  lang={l.code}
                  dir={l.dir}
                  onClick={() => choose(l.code)}
                  className={cn(
                    "flex w-full items-center gap-2 rounded-lg px-2.5 py-1.5 text-left text-sm transition-colors",
                    active
                      ? "bg-go/10 text-go ring-1 ring-go/25"
                      : "text-mist hover:bg-panel2 hover:text-chalk",
                  )}
                >
                  <span aria-hidden="true" className="text-base leading-none">
                    {l.flag}
                  </span>
                  <span className="flex-1 truncate">{l.nativeName}</span>
                  <span className="font-mono text-[10px] uppercase opacity-60">
                    {l.code}
                  </span>
                  {active && <Check className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />}
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </details>
  );
}
