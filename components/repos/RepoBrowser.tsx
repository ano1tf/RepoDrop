"use client";

/**
 * Navigateur de dépôts : liste, recherche, tri, puis aperçu du contenu et
 * actions rapides.
 *
 * La liste vient de `/api/repos` (propriétaire + collaborateur, 300 dépôts au
 * plus). La recherche et le tri sont faits côté client sur ce jeu déjà chargé :
 * aucune requête supplémentaire, donc aucune consommation de quota GitHub en
 * tapant dans le champ de recherche.
 */
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import LocaleLink, { useLocalizedPath } from "@/components/LocaleLink";
import { useRouter, useSearchParams } from "next/navigation";
import {
  AlertTriangle,
  Archive,
  FolderArchive,
  GitFork,
  Lock,
  Loader2,
  RefreshCw,
  Search,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button, buttonVariants } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { RepoDetail } from "./RepoDetail";
import { cn } from "@/lib/utils";
import { fill, formatBytes, formatNumber, formatRelativeTime } from "@/lib/i18n/format";
import type { Dict } from "@/lib/i18n/types";
import type { Locale } from "@/lib/i18n/locales";
import {
  REPO_SORTS,
  type RepoListResponse,
  type RepoSort,
  type RepoSummary,
} from "@/lib/repo-types";
import { parseRepoView, serializeRepoView, type RepoView } from "@/lib/repo-view";

export function RepoBrowser({ login, locale, copy, ui, importLabel }: {
  login: string;
  locale: Locale;
  copy: Dict["repos"];
  ui: Dict["ui"];
  importLabel: string;
}) {
  const router = useRouter();
  const localize = useLocalizedPath();
  const searchParams = useSearchParams();

  const [repos, setRepos] = useState<RepoSummary[] | null>(null);
  const [truncated, setTruncated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState<{ status: number; message?: string } | "offline" | null>(null);
  const error = loadError === null
    ? null
    : loadError === "offline" ? copy.offline : loadError.message ?? fill(copy.loadFailed, { status: loadError.status });

  /**
   * Filtre, tri et dépôt consulté vivent dans l'URL (`?repo=&q=&sort=&mine=`).
   *
   * Auparavant c'étaient de simples `useState` : un rafraîchissement, un retour
   * arrière ou un lien partagé ramenaient à la liste, en perdant le dépôt en
   * cours de consultation.
   */
  const view = useMemo(
    () => parseRepoView(new URLSearchParams(searchParams.toString())),
    [searchParams],
  );
  const { query, sort, onlyMine } = view;
  const selected = view.repo;

  /**
   * Écrit l'état dans l'URL. `push` uniquement pour l'ouverture d'un dépôt, afin
   * que le bouton retour du navigateur revienne à la liste ; le reste est un
   * `replace`, pour ne pas saturer l'historique à chaque frappe.
   */
  const update = (patch: Partial<RepoView>, push = false) => {
    const href = localize(`/repos${serializeRepoView({ ...view, ...patch })}`);
    if (push) router.push(href, { scroll: false });
    else router.replace(href, { scroll: false });
  };
  // Stable pour RepoDetail : le chargement du dépôt ne doit pas redémarrer à
  // chaque mise à jour de l'URL (dossier/fichier/branche).
  const updateRef = useRef(update);
  updateRef.current = update;
  const handleViewChange = useCallback(
    (patch: Partial<RepoView>, push = false) => updateRef.current(patch, push),
    [],
  );

  const load = useCallback(async () => {
    setLoading(true);
    setLoadError(null);
    try {
      const res = await fetch(localize("/api/repos"), { cache: "no-store" });
      const data = (await res.json().catch(() => ({}))) as (Partial<RepoListResponse> & { code?: string; error?: string }) | undefined;
      if (!res.ok || !data?.repos) {
        setLoadError({ status: res.status, message: data?.code ? data.error : undefined });
        setRepos(null);
        return;
      }
      setRepos(data.repos);
      setTruncated(data.truncated === true);
    } catch {
      setLoadError("offline");
    } finally {
      setLoading(false);
    }
  }, [localize]);

  useEffect(() => {
    void load();
  }, [load]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    const out = (repos ?? []).filter((r) => {
      // « Les miens » = dépôts dont le login connecté est propriétaire
      // (exclut ceux où il n'est que collaborateur).
      if (onlyMine && r.owner.toLowerCase() !== login.toLowerCase()) return false;
      if (!q) return true;
      return (
        r.full_name.toLowerCase().includes(q) ||
        (r.description ?? "").toLowerCase().includes(q) ||
        (r.language ?? "").toLowerCase().includes(q)
      );
    });
    const byName = (a: RepoSummary, b: RepoSummary) =>
      a.full_name.localeCompare(b.full_name, locale, { sensitivity: "base" });
    if (sort === "name") return out.sort(byName);
    if (sort === "size") return out.sort((a, b) => b.size - a.size || byName(a, b));
    return out.sort(
      (a, b) =>
        new Date(b.pushed_at ?? b.updated_at ?? 0).getTime() -
          new Date(a.pushed_at ?? a.updated_at ?? 0).getTime() || byName(a, b),
    );
  }, [repos, query, sort, onlyMine, login, locale]);

  if (selected) {
    return (
      <RepoDetail
        fullName={selected}
        locale={locale}
        copy={copy}
        ui={ui}
        view={view}
        onViewChange={handleViewChange}
        onBack={() => update({ repo: "", ref: "", path: "", file: "" })}
        onChanged={(next) => {
          setRepos((prev) =>
            (prev ?? []).map((r) =>
              r.full_name === selected || r.full_name === next.full_name ? next : r,
            ),
          );
          update({ repo: next.full_name, ref: "", path: "", file: "" });
        }}
        onDeleted={(fullName) => {
          setRepos((prev) => (prev ?? []).filter((r) => r.full_name !== fullName));
          update({ repo: "", ref: "", path: "", file: "" });
        }}
      />
    );
  }

  return (
    <div className="space-y-4">
      {/* --------------------------------------------------- barre d'outils */}
      <div className="flex flex-wrap items-center gap-2">
        <label className="relative min-w-[14rem] flex-1">
          <Search className="pointer-events-none absolute start-3 top-1/2 h-4 w-4 -translate-y-1/2 text-mist" />
          <Input
            value={query}
            onChange={(e) => update({ query: e.target.value })}
            placeholder={copy.filter}
            className="ps-9"
            aria-label={copy.filter}
          />
        </label>

        <select
          value={sort}
          onChange={(e) => update({ sort: e.target.value as RepoSort })}
          aria-label={copy.sort}
          className="h-10 rounded-lg bg-panel2 px-3 text-sm text-chalk ring-1 ring-edge outline-none focus-visible:ring-2 focus-visible:ring-go/50"
        >
          {REPO_SORTS.map((id) => (
            <option key={id} value={id} className="bg-panel">
              {copy[id]}
            </option>
          ))}
        </select>

        <Button
          variant={onlyMine ? "secondary" : "outline"}
          onClick={() => update({ onlyMine: !onlyMine })}
        >
          <Lock className="h-4 w-4" />
          {copy.onlyMine}
        </Button>

        <Button variant="ghost" onClick={() => void load()} disabled={loading}>
          {loading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <RefreshCw className="h-4 w-4" />
          )}
          {copy.refresh}
        </Button>
      </div>

      {error && (
        <p className="flex items-center gap-2 rounded-lg bg-danger/10 px-3 py-2 text-xs text-danger ring-1 ring-danger/30">
          <AlertTriangle className="h-3.5 w-3.5" />
          {error}
        </p>
      )}

      {truncated && (
        <p className="flex items-center gap-2 rounded-lg bg-amber/10 px-3 py-2 text-xs text-amber ring-1 ring-amber/30">
          <AlertTriangle className="h-3.5 w-3.5" />
          {copy.truncated}
        </p>
      )}

      {/* ---------------------------------------------------------- liste */}
      {loading && !repos ? (
        <p className="flex items-center gap-3 rounded-2xl bg-panel p-8 text-sm text-mist ring-1 ring-edge">
          <Loader2 className="h-4 w-4 animate-spin" />
          {copy.loading}
        </p>
      ) : !repos ? null : filtered.length === 0 ? (
        <div className="rounded-2xl bg-panel p-10 text-center ring-1 ring-edge">
          <FolderArchive className="mx-auto h-8 w-8 text-mist" />
          <p className="mt-3 text-sm text-mist">
            {repos?.length ? copy.emptyFilter : copy.empty}
          </p>
          <LocaleLink href="/import" className={cn(buttonVariants({ size: "sm" }), "mt-4")}>
            {importLabel}
          </LocaleLink>
        </div>
      ) : (
        <>
          <p className="text-xs text-mist">
            {fill(copy.shown, {
              count: formatNumber(filtered.length, locale),
              total: formatNumber(repos?.length ?? 0, locale),
            })}
          </p>
          <ul className="grid gap-2 sm:grid-cols-2">
            {filtered.map((r) => (
              <li key={r.full_name}>
                <button
                  type="button"
                  onClick={() => update({ repo: r.full_name, ref: "", path: "", file: "" }, true)}
                  className="group flex w-full flex-col gap-2 rounded-2xl bg-panel p-4 text-start ring-1 ring-edge transition-colors hover:bg-panel2 hover:ring-go/30"
                >
                  <span className="flex w-full items-center gap-2">
                    <span className="truncate font-medium text-chalk">{r.name}</span>
                    <span className="ms-auto flex shrink-0 items-center gap-1.5">
                      {r.private && <Lock className="h-3.5 w-3.5 text-mist" />}
                      {r.fork && <GitFork className="h-3.5 w-3.5 text-mist" />}
                      {r.archived && <Archive className="h-3.5 w-3.5 text-amber" />}
                    </span>
                  </span>

                  <span className="line-clamp-2 min-h-[2.5rem] text-xs leading-relaxed text-mist">
                    {r.description || <em className="text-mist/60">{copy.noDescription}</em>}
                  </span>

                  <span className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] text-mist/80">
                    {r.language && (
                      <Badge variant="muted">{r.language}</Badge>
                    )}
                    <span>{formatBytes(r.size * 1024, locale)}</span>
                    {r.pushed_at && (
                      <span>{fill(copy.lastPush, { time: formatRelativeTime(Date.parse(r.pushed_at), locale) })}</span>
                    )}
                    {r.open_issues_count > 0 && (
                      <span>{fill(copy.issues, { count: formatNumber(r.open_issues_count, locale) })}</span>
                    )}
                    {!r.can.push && (
                      <span className="text-amber">{copy.readOnly}</span>
                    )}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}
