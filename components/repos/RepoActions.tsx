"use client";

/**
 * Actions rapides sur un dépôt : renommer, changer la visibilité, éditer la
 * description, supprimer.
 *
 * Garde-fous :
 *   - les boutons sont désactivés quand le jeton n'a pas les droits
 *     (`can.push` / `can.admin`) plutôt que d'échouer côté GitHub ;
 *   - la suppression exige de retaper `owner/repo`, et le bouton reste bloqué
 *     tant que la confirmation ne correspond pas exactement ;
 *   - toute action est tracée côté serveur dans le flux d'activité du staff.
 */
import { useState, type FormEvent } from "react";
import {
  AlertTriangle,
  Check,
  Eye,
  EyeOff,
  Loader2,
  Lock,
  Pencil,
  Trash2,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useLocalizedPath } from "@/components/LocaleLink";
import { fill } from "@/lib/i18n/format";
import type { Dict } from "@/lib/i18n/types";
import { cn } from "@/lib/utils";
import type { RepoSummary } from "@/lib/repo-types";

export function RepoActions({
  repo,
  copy,
  ui,
  onUpdated,
  onDeleted,
}: {
  repo: RepoSummary;
  copy: Dict["repos"];
  ui: Dict["ui"];
  onUpdated: (next: RepoSummary) => void;
  onDeleted: (fullName: string) => void;
}) {
  const localize = useLocalizedPath();
  const [name, setName] = useState(repo.name);
  const [description, setDescription] = useState(repo.description ?? "");
  const [busy, setBusy] = useState<"" | "patch" | "delete">("");
  const [feedback, setFeedback] = useState<{ ok: boolean; text: string } | null>(
    null,
  );
  const [confirmText, setConfirmText] = useState("");
  const [showDelete, setShowDelete] = useState(false);

  const confirmMatches = confirmText.trim() === repo.full_name;

  async function call(
    method: "PATCH" | "DELETE",
    body: unknown,
    kind: "patch" | "delete",
  ) {
    setBusy(kind);
    setFeedback(null);
    try {
      const res = await fetch(
        localize(`/api/repos/${encodeURIComponent(repo.owner)}/${encodeURIComponent(repo.name)}`),
        {
          method,
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        },
      );
      const data = (await res.json().catch(() => ({}))) as {
        repo?: RepoSummary;
        error?: string;
      };
      if (!res.ok) {
        setFeedback({ ok: false, text: data.error ?? fill(ui.httpError, { status: res.status }) });
        return;
      }
      if (method === "DELETE") {
        onDeleted(repo.full_name);
        return;
      }
      if (data.repo) {
        onUpdated(data.repo);
        setFeedback({ ok: true, text: ui.saved });
      }
    } catch {
      setFeedback({ ok: false, text: ui.offline });
    } finally {
      setBusy("");
    }
  }

  function onSave(e: FormEvent) {
    e.preventDefault();
    const next = name.trim();
    if (!next || next === repo.name) {
      // Seul le nom inchangé : on n'envoie que la description si elle a bougé.
      if (description === (repo.description ?? "")) return;
      void call("PATCH", { description }, "patch");
      return;
    }
    void call(
      "PATCH",
      { name: next, description: description === (repo.description ?? "") ? undefined : description },
      "patch",
    );
  }

  const dirty =
    name.trim() !== repo.name || description !== (repo.description ?? "");

  return (
    <div className="space-y-3">
      {/* ------------------------------------------------- renommer / décrire */}
      <form
        onSubmit={onSave}
        className="rounded-xl bg-panel2/60 p-4 ring-1 ring-edge"
      >
        <h3 className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-mist">
          <Pencil className="h-3.5 w-3.5" />
          {copy.editDetails}
        </h3>

        <div className="mt-3 grid gap-3 sm:grid-cols-2">
          <div>
            <label htmlFor="repo-name" className="mb-1.5 block text-xs text-mist">
              {ui.repoName}
            </label>
            <Input
              id="repo-name"
              dir="ltr"
              value={name}
              onChange={(e) => setName(e.target.value)}
              disabled={!repo.can.push || busy !== ""}
              spellCheck={false}
            />
            {name.trim() !== repo.name && (
              <p className="mt-1.5 flex items-start gap-1.5 text-[11px] text-amber">
                <AlertTriangle className="mt-px h-3 w-3 shrink-0" />
                {copy.renameWarning}
              </p>
            )}
          </div>
          <div>
            <label htmlFor="repo-desc" className="mb-1.5 block text-xs text-mist">
              {ui.description}
            </label>
            <Input
              id="repo-desc"
              dir="auto"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              disabled={!repo.can.push || busy !== ""}
              maxLength={350}
            />
          </div>
        </div>

        <div className="mt-3 flex flex-wrap items-center gap-2">
          <Button type="submit" size="sm" disabled={!dirty || !repo.can.push || busy !== ""}>
            {busy === "patch" ? (
              <Loader2 className="h-3.5 w-3.5 animate-spin" />
            ) : (
              <Check className="h-3.5 w-3.5" />
            )}
            {ui.save}
          </Button>
          {!repo.can.push && (
            <span className="text-[11px] text-mist">
              {copy.readOnly}
            </span>
          )}
        </div>
      </form>

      {/* ------------------------------------------------------- visibilité */}
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl bg-panel2/60 p-4 ring-1 ring-edge">
        <div>
          <h3 className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-mist">
            {repo.private ? (
              <Lock className="h-3.5 w-3.5" />
            ) : (
              <Eye className="h-3.5 w-3.5" />
            )}
            {ui.visibility}
          </h3>
          <p className="mt-1 text-xs text-mist">
            <strong className="text-chalk">{repo.private ? ui.private : ui.public}</strong>{" · "}
            {repo.private ? copy.publicWarning : copy.privateWarning}
          </p>
        </div>
        <Button
          variant="outline"
          size="sm"
          disabled={!repo.can.push || busy !== ""}
          onClick={() =>
            void call("PATCH", { private: !repo.private }, "patch")
          }
        >
          {repo.private ? (
            <EyeOff className="h-3.5 w-3.5" />
          ) : (
            <Lock className="h-3.5 w-3.5" />
          )}
          {repo.private ? copy.makePublic : copy.makePrivate}
        </Button>
      </div>

      {/* --------------------------------------------------------- supprimer */}
      <div
        className={cn(
          "rounded-xl p-4 ring-1 transition-colors",
          showDelete ? "bg-danger/5 ring-danger/30" : "bg-panel2/60 ring-edge",
        )}
      >
        {!showDelete ? (
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h3 className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-mist">
                <Trash2 className="h-3.5 w-3.5" />
                {copy.dangerZone}
              </h3>
              <p className="mt-1 text-xs text-mist">
                {copy.deleteWarning}
              </p>
            </div>
            <Button
              variant="outline"
              size="sm"
              disabled={!repo.can.admin}
              onClick={() => {
                setShowDelete(true);
                setConfirmText("");
              }}
            >
              <Trash2 className="h-3.5 w-3.5" />
              {copy.deleteRepo}
            </Button>
          </div>
        ) : (
          <div>
            <h3 className="flex items-center gap-2 text-sm font-semibold text-danger">
              <AlertTriangle className="h-4 w-4" />
              {copy.deleteRepo}: <bdi dir="ltr">{repo.full_name}</bdi>
            </h3>
            <p className="mt-2 text-xs leading-relaxed text-mist">
              {fill(copy.deleteConfirm, { repo: repo.full_name })}
            </p>
            <div className="mt-3 flex flex-wrap items-center gap-2">
              <Input
                aria-label={ui.confirmation}
                dir="ltr"
                value={confirmText}
                onChange={(e) => setConfirmText(e.target.value)}
                placeholder={repo.full_name}
                spellCheck={false}
                autoComplete="off"
                className="max-w-xs"
                disabled={busy !== ""}
              />
              <Button
                variant="danger"
                disabled={!confirmMatches || busy !== ""}
                onClick={() => void call("DELETE", { confirm: confirmText }, "delete")}
              >
                {busy === "delete" ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Trash2 className="h-4 w-4" />
                )}
                {copy.deletePermanent}
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  setShowDelete(false);
                  setConfirmText("");
                }}
              >
                {ui.cancel}
              </Button>
            </div>
          </div>
        )}
      </div>

      {feedback && (
        <p
          className={cn(
            "flex items-center gap-2 rounded-lg px-3 py-2 text-xs ring-1",
            feedback.ok
              ? "bg-go/10 text-go ring-go/30"
              : "bg-danger/10 text-danger ring-danger/30",
          )}
        >
          {feedback.ok ? (
            <Check className="h-3.5 w-3.5" />
          ) : (
            <AlertTriangle className="h-3.5 w-3.5" />
          )}
          {feedback.text}
        </p>
      )}

      <div className="flex flex-wrap gap-1.5">
        <Badge variant={repo.private ? "muted" : "sky"}>
          {repo.private ? ui.private : ui.public}
        </Badge>
        {repo.archived && <Badge variant="amber">{ui.archived}</Badge>}
        {repo.fork && <Badge variant="muted">fork</Badge>}
        {!repo.can.push && <Badge variant="amber">{copy.readOnly}</Badge>}
      </div>
    </div>
  );
}
