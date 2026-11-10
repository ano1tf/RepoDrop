"use client";

/**
 * Vue d'un job : statuts en direct (polling), aperçu de l'archive,
 * choix de la destination, lancement du push, résultat.
 */
import { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  AlertTriangle,
  Archive,
  ArrowRight,
  Check,
  CheckCircle2,
  ChevronDown,
  Clipboard,
  Download,
  File,
  FileText,
  Folder,
  GitBranch,
  GitFork,
  Lock,
  RefreshCw,
  Rocket,
  Search,
  Trash2,
  Unlock,
} from "lucide-react";
import type { Dict } from "@/lib/i18n/types";
import type { JobRecord, PreviewEntry } from "@/lib/types";
import { buildRepoLinks } from "@/lib/links";
import { isUnauthorizedError } from "@/lib/errors";
import type { PushableRepo } from "@/lib/github";
import { formatBytes, formatCount } from "@/lib/utils";
import { fill, formatNumber } from "@/lib/i18n/format";
import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input, Label } from "@/components/ui/input";
import { Spinner, IndeterminateBar } from "@/components/ui/spinner";
import { cn } from "@/lib/utils";

const POLLING = new Set(["queued", "extracting", "pushing"]);

/** Textes de la page de suivi d'un import (section `job` du dictionnaire). */
type JobCopy = Dict["job"];

/**
 * Statut du job : libellé traduit + couleur du badge.
 *
 * Le libellé vient du dictionnaire (donc de la langue choisie) ; seule la
 * couleur reste une décision de mise en forme.
 */
function statusMeta(
  status: JobRecord["status"],
  copy: JobCopy,
): { label: string; variant: "default" | "sky" | "muted" | "danger" | "amber" } {
  switch (status) {
    case "queued":
      return { label: copy.statusQueued, variant: "muted" };
    case "extracting":
      return { label: copy.statusExtracting, variant: "sky" };
    case "ready":
      return { label: copy.statusReady, variant: "default" };
    case "pushing":
      return { label: copy.statusPushing, variant: "sky" };
    case "done":
      return { label: copy.statusDone, variant: "default" };
    case "failed":
      return { label: copy.statusFailed, variant: "danger" };
  }
}

const REPO_NAME_RE = /^[A-Za-z0-9][A-Za-z0-9._-]{0,99}$/;

export function JobView({
  initialJob,
  copy,
  locale,
}: {
  initialJob: JobRecord;
  /** Textes de la page (dictionnaire, section `job`). */
  copy: JobCopy;
  /** Langue courante : sert au formatage de la date. */
  locale: string;
}) {
  const [job, setJob] = useState(initialJob);
  const id = job.id;

  // ------------------------------------------------------------- polling
  useEffect(() => {
    if (!POLLING.has(job.status)) return;
    let cancelled = false;
    const tick = async () => {
      try {
        const res = await fetch(`/api/jobs/${id}`, { cache: "no-store" });
        if (!res.ok) return;
        const data = (await res.json()) as { job?: JobRecord };
        if (cancelled || !data.job) return;
        const next = data.job;
        // Arborescence parfois très lourde : on ne déclenche un re-render
        // que si l'état a réellement changé (même objet ⇒ pas de rendu).
        setJob((prev) =>
          prev.status === next.status && prev.updatedAt === next.updatedAt
            ? prev
            : next,
        );
      } catch {
        /* on retentera au prochain tick */
      }
    };
    void tick();
    const iv = setInterval(() => void tick(), 1200);
    return () => {
      cancelled = true;
      clearInterval(iv);
    };
  }, [id, job.status]);

  const meta = statusMeta(job.status, copy);

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
      {/* ------------------------------------------------------- en-tête */}
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3 animate-fade-up">
        <div className="flex min-w-0 items-center gap-3">
          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-panel2 text-mist ring-1 ring-edge">
            <Archive className="h-5 w-5" />
          </span>
          <div className="min-w-0">
            <h1 className="truncate text-lg font-semibold tracking-tight" title={job.filename}>
              {job.filename}
            </h1>
            <p className="text-xs text-mist">
              {new Date(job.createdAt).toLocaleString(locale)} ·{" "}
              {formatBytes(job.archiveSize)} · {job.login}
            </p>
          </div>
        </div>
        <Badge variant={meta.variant}>{meta.label}</Badge>
      </div>

      {/* ------------------------------------------------------ états */}
      {(job.status === "queued" || job.status === "extracting") && (
        <ExtractingState copy={copy} />
      )}
      {job.status === "pushing" && <PushingState copy={copy} />}
      {job.status === "ready" && job.preview && (
        <ReadyState job={job} onPushing={(j) => setJob(j)} />
      )}
      {job.status === "done" && job.push && (
        <DoneState job={job} copy={copy} locale={locale} />
      )}
      {job.status === "failed" && (
        <FailedState job={job} onPushing={(j) => setJob(j)} />
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ états */

function ExtractingState({ copy }: { copy: JobCopy }) {
  return (
    <Card className="animate-fade-in">
      <CardContent className="flex flex-col items-center gap-5 py-14 text-center">
        <span className="grid h-14 w-14 place-items-center rounded-2xl bg-sky/10 text-sky ring-1 ring-sky/25">
          <Spinner className="h-7 w-7" />
        </span>
        <div>
          <h2 className="text-lg font-semibold">{copy.extractingTitle}</h2>
          <p className="mt-1.5 max-w-md text-sm text-mist">{copy.extractingBody}</p>
        </div>
        <IndeterminateBar className="max-w-xs" />
      </CardContent>
    </Card>
  );
}

function PushingState({ copy }: { copy: JobCopy }) {
  return (
    <Card className="animate-fade-in">
      <CardContent className="flex flex-col items-center gap-5 py-14 text-center">
        <span className="grid h-14 w-14 place-items-center rounded-2xl bg-go/10 text-go ring-1 ring-go/25">
          <Spinner className="h-7 w-7" />
        </span>
        <div>
          <h2 className="text-lg font-semibold">{copy.pushingTitle}</h2>
          <p className="mt-1.5 max-w-md text-sm text-mist">{copy.pushingBody}</p>
        </div>
        <IndeterminateBar className="max-w-xs" />
      </CardContent>
    </Card>
  );
}

function FailedState({
  job,
  onPushing,
}: {
  job: JobRecord;
  onPushing: (job: JobRecord) => void;
}) {
  // Relance « remplacer tout » : proposée uniquement quand elle peut
  // débloquer la situation, c.-à-d. un rejet parce que le dépôt a avancé
  // (non-fast-forward) lors d'un push vers un dépôt existant dont on a
  // gardé les options. Pas besoin de ré-uploader l'archive.
  const canReplaceRetry =
    job.pushOpts?.mode === "existing" &&
    Boolean(job.pushOpts.repo) &&
    /changé entre-temps|non-fast-forward|\[rejected\]|fetch first/i.test(job.error ?? "");
  /*
   * Jeton GitHub expiré/révoqué : aucune relance ne peut aboutir tant que la
   * session n'est pas renouvelée. On remplace donc l'action principale
   * (« Réessayer avec une autre archive ») par « Se reconnecter », qui purge
   * la session côté serveur et relance l'OAuth GitHub.
   */
  const mustReconnect = isUnauthorizedError(job.error);
  const [confirming, setConfirming] = useState(false);
  const [busy, setBusy] = useState(false);
  const [retryError, setRetryError] = useState<string | null>(null);

  const retryReplace = useCallback(async () => {
    if (!job.pushOpts) return;
    setBusy(true);
    setRetryError(null);
    try {
      const res = await fetch(`/api/jobs/${job.id}/push`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...job.pushOpts, replaceAll: true }),
      });
      const data = (await res.json().catch(() => ({}))) as { error?: string };
      if (res.status === 202) {
        onPushing({ ...job, status: "pushing", error: null });
        return;
      }
      setRetryError(data.error ?? `Échec (HTTP ${res.status}).`);
    } catch {
      setRetryError("Connexion perdue. Réessayez.");
    } finally {
      setBusy(false);
    }
  }, [job, onPushing]);

  return (
    <Card className="animate-fade-in border-danger/30">
      <CardContent className="flex flex-col items-center gap-5 py-14 text-center">
        <span className="grid h-14 w-14 place-items-center rounded-2xl bg-danger/10 text-danger ring-1 ring-danger/25">
          <AlertTriangle className="h-7 w-7" />
        </span>
        <div>
          <h2 className="text-lg font-semibold">L'opération a échoué</h2>
          <p className="mx-auto mt-2 max-w-lg text-sm leading-relaxed text-mist">
            {job.error ?? "Erreur inconnue."}
          </p>
        </div>

        {canReplaceRetry && (
          <div className="w-full max-w-lg rounded-xl bg-amber/10 p-4 text-left ring-1 ring-amber/30">
            <p className="flex items-start gap-2 text-sm leading-relaxed text-amber">
              <Trash2 className="mt-0.5 h-4 w-4 shrink-0" />
              <span>
                Le dépôt <strong>{job.pushOpts?.repo}</strong> a avancé depuis votre import.
                Vous pouvez écraser sa branche avec le contenu exact de cette archive :
                les fichiers absents de l'archive seront supprimés du dépôt et le push
                sera forcé. L'historique existant est conservé (nouveau commit par-dessus).
              </span>
            </p>
            {confirming ? (
              <div className="mt-3 flex flex-col gap-2">
                <p className="text-xs text-amber">
                  Confirmez-vous le remplacement complet du code de ce dépôt par cette archive ?
                </p>
                <div className="flex flex-wrap gap-2">
                  <Button
                    type="button"
                    variant="danger"
                    disabled={busy}
                    onClick={() => void retryReplace()}
                  >
                    {busy ? <Spinner /> : <RefreshCw className="h-4 w-4" />}
                    {busy ? "Envoi…" : "Oui, remplacer tout le code"}
                  </Button>
                  <Button
                    type="button"
                    variant="ghost"
                    disabled={busy}
                    onClick={() => setConfirming(false)}
                  >
                    Annuler
                  </Button>
                </div>
              </div>
            ) : (
              <Button
                type="button"
                variant="danger"
                className="mt-3"
                onClick={() => setConfirming(true)}
              >
                <RefreshCw className="h-4 w-4" />
                Réessayer en remplaçant tout le code
              </Button>
            )}
            {retryError && (
              <p role="alert" className="mt-2 text-xs text-danger">
                {retryError}
              </p>
            )}
          </div>
        )}

        <div className="flex flex-wrap justify-center gap-3">
          {mustReconnect && (
            <Link href="/api/auth/login" className={buttonVariants({})}>
              <RefreshCw className="h-4 w-4" />
              Se reconnecter
            </Link>
          )}
          <Link
            href="/import"
            className={buttonVariants({ variant: mustReconnect ? "outline" : "default" })}
          >
            Réessayer avec une autre archive
          </Link>
          <Link href="/" className={buttonVariants({ variant: "ghost" })}>
            Retour à l'accueil
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}

function DoneState({
  job,
  copy,
  locale,
}: {
  job: JobRecord;
  copy: JobCopy;
  locale: string;
}) {
  const push = job.push!;
  const links = buildRepoLinks({
    url: push.url,
    fullName: push.fullName,
    branch: push.branch,
    commitSha: push.commitSha,
  });
  const shortSha = push.commitSha?.slice(0, 7);
  const branch = links.branchUrl.replace(/^.*\/tree\//, "");
  // Le compteur de fichiers suit la langue de l'interface (1 234 / 1,234).
  const fileCount = formatNumber(job.preview?.fileCount ?? 0, locale);
  /*
   * Les gabarits sont découpés **avant** remplissage : la branche et le SHA
   * s'affichent dans une puce monospace, au milieu de la phrase. La position
   * du décorateur est donc celle du gabarit traduit, pas celle du français.
   */
  const [beforeBranch, afterBranch = ""] = copy.doneFiles.split("{branch}");
  const [beforeSha, afterSha = ""] = copy.doneCommit.split("{sha}");
  return (
    <Card className="animate-fade-in border-go/40 relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_70%_at_50%_-20%,rgba(52,211,153,0.14),transparent)]" />
      <CardContent className="relative flex flex-col gap-5 py-10">
        <div className="flex flex-col items-center gap-4 text-center">
          <span className="grid h-14 w-14 place-items-center rounded-2xl bg-go/15 text-go ring-1 ring-go/40">
            <CheckCircle2 className="h-8 w-8" />
          </span>
          <div>
            <h2 className="text-lg font-semibold">{copy.doneTitle}</h2>
            <p className="mx-auto mt-2 max-w-lg text-sm text-mist">
              {fill(beforeBranch, { count: fileCount })}
              <code className="rounded bg-panel2 px-1.5 py-0.5 text-xs text-chalk ring-1 ring-edge">
                {branch}
              </code>
              {fill(afterBranch, { count: fileCount })}
              {shortSha && (
                <>
                  {" · "}
                  {beforeSha}
                  <code className="rounded bg-panel2 px-1.5 py-0.5 text-xs text-chalk ring-1 ring-edge">{shortSha}</code>
                  {afterSha}
                </>
              )}
              {push.created && ` · ${copy.doneCreated}`}.
            </p>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-2">
            <a href={links.repoUrl} target="_blank" rel="noopener noreferrer" className={buttonVariants({ size: "lg" })}>
              <GitFork className="h-4 w-4" />
              {copy.doneOpenGithub}
              <ArrowRight className="h-4 w-4" />
            </a>
            <Button type="button" variant="outline" size="lg" onClick={() => void navigator.clipboard.writeText(links.repoUrl)}>
              <Clipboard className="h-4 w-4" />
              {copy.doneCopyLink}
            </Button>
            <Button type="button" variant="outline" size="lg" onClick={() => (window.location.href = `/api/jobs/${job.id}/download`)}>
              <Download className="h-4 w-4" />
              {copy.doneDownload}
            </Button>
          </div>
        </div>
        <div className="flex items-center justify-between gap-3 border-t border-edge pt-4">
          <a
            href={links.repoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="truncate font-mono text-xs text-mist underline decoration-edge underline-offset-4 hover:text-chalk"
          >
            {links.repoUrl.replace("https://", "")}
          </a>
          <Link href="/import" className="text-xs text-mist underline decoration-edge underline-offset-4 hover:text-chalk">
            {copy.doneImportAnother}
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}

/* --------------------------------------------------------------- aperçu */

function TreeLine({ entry }: { entry: PreviewEntry }) {
  const isDir = entry.path.endsWith("/");
  const clean = isDir ? entry.path.slice(0, -1) : entry.path;
  const parts = clean.split("/");
  const depth = parts.length - 1;
  const name = parts[parts.length - 1];
  const Icon = isDir ? Folder : entry.path.match(/\.(md|txt|rst|json)$/i) ? FileText : File;
  return (
    <div
      className="flex items-center justify-between gap-3 rounded px-2 py-1 text-xs hover:bg-panel2"
      style={{ paddingLeft: 8 + depth * 14 }}
    >
      <span className="flex min-w-0 items-center gap-1.5">
        <Icon
          className={cn("h-3.5 w-3.5 shrink-0", isDir ? "text-sky/80" : "text-mist/70")}
        />
        <span className={cn("truncate", isDir && "text-chalk/90 font-medium")}>
          {name}
          {isDir && "/"}
        </span>
      </span>
      {!isDir && entry.size > 0 && (
        <span className="shrink-0 tabular-nums text-mist/70">{formatBytes(entry.size)}</span>
      )}
    </div>
  );
}

function PreviewPanel({ job }: { job: JobRecord }) {
  const p = job.preview!;
  const ignoredParts: string[] = [];
  if (p.ignored.gitDirs > 0) ignoredParts.push(`.git (${p.ignored.gitDirs})`);
  if (p.ignored.systemFiles > 0)
    ignoredParts.push(`fichiers système (${p.ignored.systemFiles})`);
  if (p.ignored.symlinks > 0) ignoredParts.push(`symlinks (${p.ignored.symlinks})`);
  if (p.ignored.hardlinks) ignoredParts.push(`hardlinks (${p.ignored.hardlinks})`);
  if (p.ignored.outside > 0) ignoredParts.push(`chemins bloqués (${p.ignored.outside})`);

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between gap-2">
          <CardTitle>Aperçu de l'archive</CardTitle>
          <Badge
            variant={
              job.format === "rar" ? "sky" : job.format === "tar" ? "default" : "muted"
            }
          >
            {job.format === "tar" ? "TAR" : job.format?.toUpperCase()}
          </Badge>
        </div>
        <CardDescription>Ce qui sera poussé, après filtres de sécurité.</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <div className="grid grid-cols-2 gap-2 text-sm">
          <Stat label="Fichiers" value={formatCount(p.fileCount)} />
          <Stat label="Poids décompressé" value={formatBytes(p.totalSize)} />
        </div>

        {ignoredParts.length > 0 && (
          <p className="text-xs text-mist">
            <span className="text-chalk/80">Ignorés :</span> {ignoredParts.join(" · ")}
          </p>
        )}

        {p.tooLargeForGitHub.count > 0 && (
          <div className="flex items-start gap-2 rounded-lg bg-amber/10 p-3 text-xs leading-relaxed text-amber ring-1 ring-amber/30">
            <AlertTriangle className="mt-0.5 h-3.5 w-3.5 shrink-0" />
            <span>
              {p.tooLargeForGitHub.count} fichier(s) dépassent 100 Mo : GitHub les refusera
              probablement. Ex. :{" "}
              <code className="text-chalk">
                {p.tooLargeForGitHub.examples[0]?.path}{" "}
                ({formatBytes(p.tooLargeForGitHub.examples[0]?.size ?? 0)})
              </code>
            </span>
          </div>
        )}

        <div className="max-h-72 overflow-y-auto rounded-xl bg-ink/60 p-2 ring-1 ring-edge">
          {p.tree.map((e) => (
            <TreeLine key={e.path} entry={e} />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg bg-panel2 px-3 py-2.5 ring-1 ring-edge">
      <div className="text-[11px] uppercase tracking-wide text-mist">{label}</div>
      <div className="mt-0.5 font-medium text-chalk">{value}</div>
    </div>
  );
}

/* ----------------------------------------------------------- destination */

function ReadyState({
  job,
  onPushing,
}: {
  job: JobRecord;
  onPushing: (job: JobRecord) => void;
}) {
  const p = job.preview!;

  // options
  const [stripRoot, setStripRoot] = useState(Boolean(p.singleRootDir));
  const [includeNM, setIncludeNM] = useState(false);

  // destination
  const [dest, setDest] = useState<"new" | "existing">("new");
  const [name, setName] = useState("");
  const [visibility, setVisibility] = useState<"private" | "public">("private");
  const [selectedRepo, setSelectedRepo] = useState("");
  const [search, setSearch] = useState("");

  // avancé
  const [dedicated, setDedicated] = useState(false);
  const [branchName, setBranchName] = useState("");
  const [commitMsg, setCommitMsg] = useState("");

  // remplacement intégral (dépôt existant uniquement, destructif)
  const [replaceAll, setReplaceAll] = useState(false);
  const [replaceConfirm, setReplaceConfirm] = useState(false);

  // état réseau
  const [repos, setRepos] = useState<PushableRepo[] | null>(null);
  const [reposError, setReposError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  // Chargement des dépôts (une seule fois, à la demande).
  useEffect(() => {
    if (dest !== "existing" || repos !== null) return;
    let cancelled = false;
    fetch("/api/repos", { cache: "no-store" })
      .then(async (r) => {
        const data = (await r.json()) as { repos?: PushableRepo[]; error?: string };
        if (cancelled) return;
        if (r.ok) setRepos(data.repos ?? []);
        else {
          setRepos([]);
          setReposError(data.error ?? "Impossible de charger vos dépôts.");
        }
      })
      .catch(() => {
        if (!cancelled) {
          setRepos([]);
          setReposError("Impossible de charger vos dépôts.");
        }
      });
    return () => {
      cancelled = true;
    };
  }, [dest, repos]);

  const filtered = useMemo(() => {
    if (!repos) return [];
    const q = search.trim().toLowerCase();
    const list = q ? repos.filter((r) => r.full_name.toLowerCase().includes(q)) : repos;
    return list.slice(0, 60);
  }, [repos, search]);

  const nameValid = REPO_NAME_RE.test(name.trim());
  const replaceActive = dest === "existing" && replaceAll;
  const canPush =
    !busy &&
    (!replaceActive || replaceConfirm) &&
    ((dest === "new" && nameValid) || (dest === "existing" && Boolean(selectedRepo)));

  const submit = useCallback(async () => {
    setFormError(null);
    if (!canPush) return;
    setBusy(true);
    try {
      const body = {
        mode: dest,
        name: dest === "new" ? name.trim() : undefined,
        private: visibility === "private",
        repo: dest === "existing" ? selectedRepo : undefined,
        dedicatedBranch: dedicated,
        branchName: dedicated ? branchName.trim() || undefined : undefined,
        replaceAll: replaceActive,
        includeNodeModules: includeNM,
        stripRoot,
        commitMessage: commitMsg.trim() || undefined,
      };
      const res = await fetch(`/api/jobs/${job.id}/push`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const data = (await res.json().catch(() => ({}))) as { error?: string };
      if (res.status === 202) {
        onPushing({ ...job, status: "pushing" });
        return;
      }
      setFormError(data.error ?? `Échec (HTTP ${res.status}).`);
    } catch {
      setFormError("Connexion perdue. Réessayez.");
    } finally {
      setBusy(false);
    }
  }, [
    canPush,
    commitMsg,
    dedicated,
    dest,
    includeNM,
    job,
    name,
    onPushing,
    selectedRepo,
    stripRoot,
    visibility,
    branchName,
    replaceActive,
  ]);

  const defaultBranchHint = `import/${job.filename.replace(/\.[^.]+$/, "").toLowerCase()}`;

  return (
    <div className="grid gap-5 lg:grid-cols-2 animate-fade-in">
      {/* ---------------------------------------------------- aperçu */}
      <div className="flex flex-col gap-5">
        <PreviewPanel job={job} />

        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Filtres d'import</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-3 pt-1">
            {p.singleRootDir && (
              <CheckRow
                row
                checked={stripRoot}
                onChange={setStripRoot}
                label={
                  <>
                    Retirer le dossier racine{" "}
                    <code className="text-chalk">{p.singleRootDir}/</code>
                    <span className="block text-xs font-normal text-mist">
                      Recommandé : le contenu du projet irait à la racine du dépôt.
                    </span>
                  </>
                }
              />
            )}
            {p.hasNodeModules && (
              <CheckRow
                row
                checked={includeNM}
                onChange={setIncludeNM}
                label={
                  <>
                    Inclure <code className="text-chalk">node_modules</code>
                    <span className="block text-xs font-normal text-mist">
                      Décoché par défaut : lourd et rarement utile dans un dépôt.
                    </span>
                  </>
                }
              />
            )}
            {!p.singleRootDir && !p.hasNodeModules && (
              <p className="text-xs text-mist">Aucun filtre disponible pour cette archive.</p>
            )}
          </CardContent>
        </Card>
      </div>

      {/* -------------------------------------------------- destination */}
      <div className="flex flex-col gap-5">
        <Card>
          <CardHeader>
            <CardTitle>Destination</CardTitle>
            <CardDescription>Où pousser ces fichiers&nbsp;?</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-4 pt-1">
            {/* onglets radio */}
            <div className="grid grid-cols-2 gap-2 rounded-xl bg-panel2 p-1 ring-1 ring-edge">
              <DestTab active={dest === "new"} onClick={() => setDest("new")}>
                <Rocket className="h-4 w-4" /> Nouveau dépôt
              </DestTab>
              <DestTab active={dest === "existing"} onClick={() => setDest("existing")}>
                <GitBranch className="h-4 w-4" /> Dépôt existant
              </DestTab>
            </div>

            {dest === "new" ? (
              <div className="flex flex-col gap-3">
                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="repo-name">Nom du dépôt</Label>
                  <Input
                    id="repo-name"
                    placeholder="mon-projet"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    maxLength={100}
                    autoComplete="off"
                    spellCheck={false}
                  />
                  {name.length > 0 && !nameValid && (
                    <p className="text-xs text-danger">
                      Lettres, chiffres, points, tirets et tirets bas uniquement (doit commencer
                      par une lettre ou un chiffre).
                    </p>
                  )}
                </div>
                <div className="flex flex-col gap-1.5">
                  <Label>Visibilité</Label>
                  <div className="grid grid-cols-2 gap-2">
                    <VisBtn
                      active={visibility === "private"}
                      onClick={() => setVisibility("private")}
                      icon={<Lock className="h-3.5 w-3.5" />}
                      title="Privé"
                      hint="Visible par vous seul"
                    />
                    <VisBtn
                      active={visibility === "public"}
                      onClick={() => setVisibility("public")}
                      icon={<Unlock className="h-3.5 w-3.5" />}
                      title="Public"
                      hint="Visible par tout le monde"
                    />
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex flex-col gap-3">
                <div className="relative">
                  <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-mist" />
                  <Input
                    placeholder="Rechercher un dépôt…"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="pl-9"
                    autoComplete="off"
                  />
                </div>

                {repos === null && (
                  <div className="flex items-center justify-center gap-2 rounded-xl bg-panel2 py-8 text-sm text-mist ring-1 ring-edge">
                    <Spinner /> Chargement de vos dépôts…
                  </div>
                )}
                {repos !== null && reposError && (
                  <div className="flex items-start gap-2 rounded-xl bg-danger/10 p-3 text-xs text-danger ring-1 ring-danger/25">
                    <AlertTriangle className="mt-0.5 h-3.5 w-3.5 shrink-0" />
                    {reposError}
                  </div>
                )}
                {repos !== null && !reposError && filtered.length === 0 && (
                  <div className="rounded-xl bg-panel2 py-8 text-center text-sm text-mist ring-1 ring-edge">
                    {repos.length === 0
                      ? "Aucun dépôt accessible avec droits d'écriture. Créez-en un nouveau !"
                      : "Aucun dépôt ne correspond à la recherche."}
                  </div>
                )}
                {repos !== null && filtered.length > 0 && (
                  <div className="max-h-64 overflow-y-auto rounded-xl ring-1 ring-edge">
                    {filtered.map((r) => {
                      const active = selectedRepo === r.full_name;
                      return (
                        <button
                          key={r.full_name}
                          type="button"
                          onClick={() => setSelectedRepo(r.full_name)}
                          className={cn(
                            "flex w-full items-center justify-between gap-2 border-b border-edge/60 px-3 py-2.5 text-left text-sm transition-colors last:border-0 cursor-pointer",
                            active ? "bg-go/10 text-chalk" : "hover:bg-panel2 text-mist",
                          )}
                        >
                          <span className="flex min-w-0 items-center gap-2">
                            <GitFork
                              className={cn("h-3.5 w-3.5 shrink-0", active && "text-go")}
                            />
                            <span className="truncate">{r.full_name}</span>
                          </span>
                          <span className="flex shrink-0 items-center gap-2 text-xs">
                            {r.private && <Lock className="h-3 w-3" />}
                            {active && <Check className="h-4 w-4 text-go" />}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            )}

            {/* options de branche */}
            <div className="border-t border-edge/60 pt-4">
              <label className="flex cursor-pointer items-start gap-2.5 text-sm">
                <input
                  type="checkbox"
                  checked={dedicated}
                  onChange={(e) => setDedicated(e.target.checked)}
                  className="mt-0.5 h-4 w-4 accent-[#34d399]"
                />
                <span>
                  Créer une branche dédiée
                  <span className="block text-xs font-normal text-mist">
                    {dest === "existing"
                      ? "Ne pas toucher à la branche par défaut : idéal pour un dépôt partagé."
                      : "Nom de branche initial du nouveau dépôt (sinon la branche par défaut)."}
                  </span>
                </span>
              </label>
              {dedicated && (
                <Input
                  placeholder={defaultBranchHint}
                  value={branchName}
                  onChange={(e) => setBranchName(e.target.value)}
                  className="mt-2.5"
                  maxLength={100}
                  autoComplete="off"
                />
              )}
            </div>

            {/* remplacement intégral — dépôt existant uniquement */}
            {dest === "existing" && (
              <div
                className={cn(
                  "border-t border-edge/60 pt-4",
                  replaceAll && "rounded-xl bg-danger/5 p-3 ring-1 ring-danger/25",
                )}
              >
                <label className="flex cursor-pointer items-start gap-2.5 text-sm">
                  <input
                    type="checkbox"
                    checked={replaceAll}
                    onChange={(e) => {
                      setReplaceAll(e.target.checked);
                      setReplaceConfirm(false);
                    }}
                    className="mt-0.5 h-4 w-4 accent-[#f87171]"
                  />
                  <span>
                    <span className="flex items-center gap-1.5 font-medium text-chalk">
                      <Trash2 className="h-4 w-4 text-danger" />
                      Remplacer tout le code du dépôt
                    </span>
                    <span className="block text-xs font-normal text-mist">
                      Le dépôt contiendra exactement les fichiers de l'archive : ceux qui
                      n'y sont pas seront supprimés, et le push sera forcé — il réussira
                      même si le dépôt a été modifié entre-temps (plus d'erreur
                      « fetch first »). À utiliser quand l'archive est la nouvelle
                      version complète du projet.
                    </span>
                  </span>
                </label>
                {replaceAll && (
                  <label className="mt-3 flex cursor-pointer items-start gap-2.5 border-t border-danger/20 pt-3 text-sm text-danger">
                    <input
                      type="checkbox"
                      checked={replaceConfirm}
                      onChange={(e) => setReplaceConfirm(e.target.checked)}
                      className="mt-0.5 h-4 w-4 accent-[#f87171]"
                    />
                    <span>
                      Je confirme : les fichiers du dépôt
                      {selectedRepo ? (
                        <>
                          {" "}
                          <code className="text-chalk">{selectedRepo}</code>
                        </>
                      ) : null}{" "}
                      absents de cette archive seront définitivement supprimés de la
                      branche poussée.
                    </span>
                  </label>
                )}
              </div>
            )}

            {/* avancé */}
            <details className="group border-t border-edge/60 pt-4">
              <summary className="flex cursor-pointer list-none items-center gap-1.5 text-sm text-mist transition-colors hover:text-chalk">
                <ChevronDown className="h-4 w-4 transition-transform group-open:rotate-180" />
                Options avancées
              </summary>
              <div className="mt-3 flex flex-col gap-1.5">
                <Label htmlFor="commit-msg">Message de commit</Label>
                <Input
                  id="commit-msg"
                  placeholder={`Import de ${job.filename} via RepoDrop`}
                  value={commitMsg}
                  onChange={(e) => setCommitMsg(e.target.value)}
                  maxLength={200}
                />
              </div>
            </details>
          </CardContent>
        </Card>

        {/* action */}
        <div className="flex flex-col gap-3">
          {formError && (
            <div
              role="alert"
              className="flex items-start gap-2 rounded-xl bg-danger/10 p-3.5 text-sm text-danger ring-1 ring-danger/25 animate-fade-in"
            >
              <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" />
              <span>{formError}</span>
            </div>
          )}
          <Button
            size="lg"
            variant={replaceActive ? "danger" : "default"}
            className="w-full"
            disabled={!canPush}
            onClick={() => void submit()}
          >
            {busy ? <Spinner /> : replaceActive ? <Trash2 className="h-4 w-4" /> : <Rocket className="h-4 w-4" />}
            {busy
              ? "Envoi…"
              : replaceActive
                ? "Remplacer tout le code sur GitHub"
                : "Pousser sur GitHub"}
          </Button>
          {replaceActive && !replaceConfirm && (
            <p className="text-center text-xs text-danger">
              Cochez la confirmation de remplacement pour activer le bouton.
            </p>
          )}
          <p className="text-center text-xs text-mist">
            Votre jeton GitHub reste dans un cookie chiffré — il n'est jamais écrit en base.
          </p>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------- petits éléments */

function DestTab({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "flex items-center justify-center gap-1.5 rounded-lg py-2 text-sm font-medium transition-colors cursor-pointer",
        active ? "bg-panel text-chalk shadow-sm ring-1 ring-edge" : "text-mist hover:text-chalk",
      )}
    >
      {children}
    </button>
  );
}

function VisBtn({
  active,
  onClick,
  icon,
  title,
  hint,
}: {
  active: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  title: string;
  hint: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "flex flex-col items-start gap-0.5 rounded-xl p-3 text-left ring-1 transition-colors cursor-pointer",
        active
          ? "bg-go/10 ring-go/40"
          : "bg-panel2 ring-edge hover:ring-mist/40",
      )}
    >
      <span className={cn("flex items-center gap-1.5 text-sm font-medium", active ? "text-go" : "text-chalk")}>
        {icon}
        {title}
      </span>
      <span className="text-xs text-mist">{hint}</span>
    </button>
  );
}

function CheckRow({
  checked,
  onChange,
  label,
  row = false,
}: {
  checked: boolean;
  onChange: (v: boolean) => void;
  label: React.ReactNode;
  row?: boolean;
}) {
  return (
    <label className={cn("flex cursor-pointer items-start gap-2.5 text-sm", row && "w-full")}>
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="mt-0.5 h-4 w-4 accent-[#34d399]"
      />
      <span>{label}</span>
    </label>
  );
}
