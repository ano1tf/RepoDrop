"use client";

/**
 * Sélecteur de langue de l'en-tête.
 *
 * Choix d'interface :
 *   - un `<details>` natif plutôt qu'un menu maison : le clavier (Entrée/Espace)
 *     et `aria-expanded` sont fournis par le navigateur, sans piège de focus à
 *     réimplémenter ;
 *   - un champ de recherche, parce que 16 langues ne se parcourent pas à l'œil ;
 *   - `role="menuitemradio"` + `aria-checked` : le lecteur d'écran annonce la
 *     langue active, pas seulement une liste de drapeaux.
 *
 * Ce que `<details>` ne fait **pas** — vérifié, et donc écrit à la main :
 *   - la fermeture au clic extérieur (d'où l'écoute `pointerdown` ci-dessous) ;
 *   - la fermeture sur Échap ;
 *   - le focus dans la recherche à l'ouverture.
 *
 * Le changement de langue passe par la Server Action `app/actions/lang.ts` :
 * elle pose le cookie **et** invalide le cache de navigation côté client
 * (les segments RSC préchargés par les `<Link>`, rendus dans l'ancienne
 * langue). Sans cette invalidation, revenir sur une page préchargée
 * afficherait l'ancienne langue : c'est le bug « ça revient en français ».
 *
 * `localStorage` n'est qu'un **miroir** du cookie : il permet de retrouver
 * le choix de l'utilisateur si le cookie a été effacé ou bloqué.
 */
import { useEffect, useRef, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Check, Languages, Search } from "lucide-react";
import {
  LOCALES,
  readStoredLocale,
  writeStoredLocale,
  type Locale,
} from "@/lib/i18n/locales";
import { setLocale } from "@/app/actions/lang";
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
  const inputRef = useRef<HTMLInputElement>(null);
  /** Évite de rejouer la réconciliation à chaque rendu. */
  const reconciled = useRef(false);

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

  // Échap ferme et rend le focus au déclencheur ; un clic extérieur ferme.
  useEffect(() => {
    if (!open) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      setOpen(false);
      detailsRef.current?.querySelector<HTMLElement>("summary")?.focus();
    };
    const onPointerDown = (e: PointerEvent) => {
      if (!detailsRef.current?.contains(e.target as Node)) setOpen(false);
    };

    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("pointerdown", onPointerDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("pointerdown", onPointerDown);
    };
  }, [open]);

  // À l'ouverture, le curseur va directement dans la recherche.
  useEffect(() => {
    if (open) inputRef.current?.focus();
    else setQuery("");
  }, [open]);

  /**
   * Reconciliation au chargement : si le navigateur se souvient d'une langue
   * (`localStorage`) mais que le serveur n'a pas de cookie (cookie effacé,
   * bloqué, ou navigation privée stricte), on remet le cookie à jour.
   *
   * C'est le filet de sécurité qui garantit que « la langue ne lâche pas ».
   */
  useEffect(() => {
    if (reconciled.current) return;
    reconciled.current = true;

    const stored = readStoredLocale();
    if (!stored || stored === locale) return;

    void setLocale(stored).then((result) => {
      if (result.ok) startTransition(() => router.refresh());
    });
    // Au montage uniquement : la réconciliation se fait une fois (le garde
    // `reconciled` ci-dessus empêche toute relance).
  }, []);

  async function choose(code: Locale) {
    setOpen(false);
    if (code === locale) return;

    try {
      const result = await setLocale(code);
      if (!result.ok) return;
    } catch {
      return; // réseau indisponible : on garde la langue courante
    }

    // Miroir client : la langue choisie survit à un cookie effacé.
    writeStoredLocale(code);
    // Repli immédiat côté client : le serveur vient de poser le cookie.
    document.cookie = `rd_lang=${code}; path=/; max-age=31536000; samesite=lax`;
    // L'action a déjà renvoyé le nouvel arbre RSC (cache de navigation
    // invalidé) ; le refresh garantit que la page courante est bien rendue
    // dans la nouvelle langue.
    startTransition(() => router.refresh());
  }

  return (
    // `onToggle` est indispensable : le navigateur ouvre/ferme nativement le
    // `<details>` (clic sur le summary, Entrée, Échap), et React doit suivre
    // cet état sous peine de le réécrire au rendu suivant.
    <details
      ref={detailsRef}
      open={open}
      onToggle={(e) => setOpen(e.currentTarget.open)}
      className="relative"
    >
      <summary
        aria-label={`${changeLabel} — ${currentLabel}`}
        title={changeLabel}
        className={cn(
          "flex cursor-pointer list-none items-center gap-1.5 rounded-lg px-2.5 py-2 text-sm text-mist",
          "transition-colors hover:bg-panel2 hover:text-chalk [&::-webkit-details-marker]:hidden",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-go/60",
          "marker:content-none",
          pending && "opacity-60",
        )}
      >
        <Languages className="h-4 w-4 shrink-0" aria-hidden="true" />
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
          "absolute end-0 z-50 mt-2 w-64 overflow-hidden rounded-xl bg-panel ring-1 ring-edge",
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
