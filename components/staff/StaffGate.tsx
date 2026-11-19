"use client";

/**
 * Verrou du panel staff : écran de saisie du mot de passe.
 *
 * Affiché à un compte reconnu comme staff (`STAFF_LOGINS`) mais dont la session
 * n'a pas encore validé le mot de passe. La vérification est faite par
 * `/api/staff/unlock`, qui pose le claim `staffUnlocked` dans le cookie de
 * session chiffré — rien n'est stocké côté client.
 */
import { useState, type FormEvent } from "react";
import LocaleLink, { useLocalizedPath } from "@/components/LocaleLink";
import { useRouter } from "next/navigation";
import { KeyRound, Loader2, Lock } from "lucide-react";
import { Input } from "@/components/ui/input";
import { buttonVariants } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { fill } from "@/lib/i18n/format";
import type { Dict } from "@/lib/i18n/types";
import { cn } from "@/lib/utils";

export function StaffGate({ login, copy }: { login: string; copy: Pick<Dict, "staff" | "ui" | "notFound"> }) {
  const localize = useLocalizedPath();
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (busy) return;
    setBusy(true);
    setError("");
    try {
      const res = await fetch(localize("/api/staff/unlock"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      const data = (await res.json().catch(() => ({}))) as {
        ok?: boolean;
        error?: string;
      };
      if (!res.ok || !data.ok) {
        setError(
          data.error ?? fill(copy.ui.httpError, { status: res.status }),
        );
        setPassword("");
        setBusy(false);
        return;
      }
      // Le cookie est posé : on redemande le rendu serveur de /staff.
      router.refresh();
    } catch {
      setError(copy.ui.offline);
      setBusy(false);
    }
  }

  return (
    <main className="mx-auto flex w-full max-w-md flex-col items-center gap-6 px-4 py-24">
      <div className="w-full animate-fade-up rounded-2xl bg-panel p-6 text-center shadow-panel ring-1 ring-edge sm:p-8">
        <span className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-violet-500/15 text-violet-200 ring-1 ring-violet-400/30">
          <Lock className="h-6 w-6" />
        </span>

        <h1 className="mt-4 text-xl font-semibold tracking-tight">
          {copy.staff.locked}
        </h1>
        <p className="mt-2 text-sm leading-relaxed text-mist">
          {copy.staff.lockedLead}
        </p>

        <Badge variant="sky" className="mt-3">
          <bdi>{login}</bdi>
        </Badge>

        <form onSubmit={onSubmit} className="mt-6 space-y-3 text-start">
          <label
            htmlFor="staff-password"
            className="text-xs font-medium uppercase tracking-wider text-mist"
          >
            {copy.staff.panelPassword}
          </label>
          <Input
            id="staff-password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            autoComplete="current-password"
            autoFocus
            required
            className={cn(error && "ring-danger/50")}
          />

          {error && (
            <p className="rounded-lg bg-danger/10 px-3 py-2 text-xs text-danger ring-1 ring-danger/30">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={busy || password.length === 0}
            className={cn(
              buttonVariants({ size: "lg" }),
              "w-full",
              (busy || password.length === 0) && "opacity-60",
            )}
          >
            {busy ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <KeyRound className="h-4 w-4" />
            )}
            {busy ? copy.ui.loading : copy.staff.unlock}
          </button>
        </form>

        <p className="mt-4 text-xs leading-relaxed text-mist/80">
          {copy.staff.attemptLimit}
        </p>
      </div>

      <LocaleLink
        href="/"
        className={buttonVariants({ variant: "ghost", size: "sm" })}
      >
        {copy.notFound.back}
      </LocaleLink>
    </main>
  );
}
