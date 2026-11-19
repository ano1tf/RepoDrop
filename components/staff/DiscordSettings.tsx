"use client";

/**
 * Réglages du bot Discord — le jeton se configure ICI, depuis le dashboard.
 *
 * Le jeton est write-only : le serveur ne le renvoie jamais, seulement un
 * masque (`mtok…••••1a2b`). Laisser le champ vide conserve la valeur stockée ;
 * le bouton « Effacer » la supprime.
 *
 * Les champs sont **hydratés depuis le serveur au montage** : changer d'onglet
 * démontait ce composant et son remontage repartait des propriétés du
 * chargement de page (données d'avant sauvegarde) — un « Enregistrer »
 * depuis ce formulaire périmé écrasait le canal / la mention et désactivait
 * le bot, donnant l'impression que tout avait été supprimé.
 */
import { useCallback, useEffect, useRef, useState } from "react";
import {
  Activity as ActivityIcon,
  Bot,
  Check,
  Eye,
  EyeOff,
  KeyRound,
  Loader2,
  Plug,
  PlugZap,
  Radio,
  Save,
  Send,
  ShieldCheck,
  Trash2,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input, Label } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";
import { useLocalizedPath } from "@/components/LocaleLink";
import { fill, formatDateTime, formatDuration, formatNumber, formatPercent, formatRelativeTime } from "@/lib/i18n/format";
import type { Dict } from "@/lib/i18n/types";
import type { Locale } from "@/lib/i18n/locales";
import type {
  DiscordSettingsView,
  MonitorStatus,
  StaffSettingsResponse,
} from "@/lib/staff-types";

const PRESETS = [5, 10, 15, 30, 60];

export function DiscordSettings({
  initial,
  copy,
  locale,
}: {
  initial: StaffSettingsResponse;
  copy: Pick<Dict, "discord" | "staff" | "ui" | "system" | "errors">;
  locale: Locale;
}) {
  const { discord: t, staff, ui, system, errors } = copy;
  const localize = useLocalizedPath();
  const duration = (ms: number | null) => ms === null ? "—" : formatDuration(ms, "millisecond", locale);
  const [settings, setSettings] = useState<DiscordSettingsView>(initial.settings);
  const [status, setStatus] = useState<MonitorStatus>(initial.status);
  const [token, setToken] = useState("");
  const [showToken, setShowToken] = useState(false);
  const [channelId, setChannelId] = useState(initial.settings.channelId);
  const [intervalMin, setIntervalMin] = useState(String(initial.settings.intervalMin));
  const [probeUrl, setProbeUrl] = useState(initial.settings.probeUrl);
  const [roleMention, setRoleMention] = useState(initial.settings.roleMention);
  const [heartbeat, setHeartbeat] = useState(initial.settings.heartbeat);
  const [notifyPush, setNotifyPush] = useState(initial.settings.notifyPush);
  const [alertOnDown, setAlertOnDown] = useState(initial.settings.alertOnDown);
  const [enabled, setEnabled] = useState(initial.settings.enabled);
  const [busy, setBusy] = useState<string | null>(null);
  const [message, setMessage] = useState<{ kind: "ok" | "err"; text: string } | null>(
    null,
  );
  // Erreur du rafraîchissement automatique : sans elle, une session expirée ou
  // un serveur en erreur figeait le panneau « État du bot » sans aucun indice.
  const [statusError, setStatusError] = useState<string | null>(null);
  // true = les champs du formulaire reflètent la base (1ʳᵉ lecture réussie).
  // Tant que c'est faux, l'enregistrement est bloqué : sauvegarder un
  // formulaire jamais hydraté écraserait les réglages serveur avec des vides.
  const [hydrated, setHydrated] = useState(false);
  const hydratedRef = useRef(false);

  /** Applique les réglages serveur au formulaire + à l'aperçu (pas au jeton). */
  const applySettings = useCallback((s: DiscordSettingsView) => {
    setSettings(s);
    setChannelId(s.channelId);
    setIntervalMin(String(s.intervalMin));
    setProbeUrl(s.probeUrl);
    setRoleMention(s.roleMention);
    setHeartbeat(s.heartbeat);
    setNotifyPush(s.notifyPush);
    setAlertOnDown(s.alertOnDown);
    setEnabled(s.enabled);
    hydratedRef.current = true;
    setHydrated(true);
  }, []);

  // Rafraîchissement automatique :
  //  - à CHAQUE cycle : l'état du moniteur (badges, prochain ping, compteurs) ;
  //  - au PREMIER cycle réussi seulement : les champs du formulaire, remplis
  //    depuis la base. Les cycles suivants n'y touchent jamais (la saisie en
  //    cours ne doit pas être écrasée).
  const refresh = useCallback(async () => {
    try {
      const res = await fetch(localize("/api/staff/settings"), { cache: "no-store" });
      const body = (await res.json().catch(() => ({}))) as Partial<StaffSettingsResponse> & { error?: string };
      if (!res.ok) {
        setStatusError(body.error ?? fill(ui.httpError, { status: res.status }));
        return;
      }
      setStatusError(null);
      if (body.status) setStatus(body.status);
      if (!hydratedRef.current && body.settings) {
        // Le champ `token` n'est JAMAIS touché : il est write-only côté
        // serveur, et une saisie déjà commencée ne doit pas être perdue.
        applySettings(body.settings);
      }
    } catch {
      setStatusError(ui.offline);
    }
  }, [applySettings, localize, ui]);

  useEffect(() => {
    void refresh(); // hydration immédiate au montage (attendre 10 s laissait
    //                   le temps de cliquer « Enregistrer » sur un formulaire vide)
    const iv = setInterval(() => void refresh(), 10_000);
    return () => clearInterval(iv);
  }, [refresh]);

  const save = async (
    patch: Record<string, unknown>,
    label = ui.saved,
  ): Promise<boolean> => {
    setBusy("save");
    setMessage(null);
    try {
      const res = await fetch(localize("/api/staff/settings"), {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(patch),
      });
      const body = (await res.json().catch(() => ({}))) as
        | { settings?: DiscordSettingsView; status?: MonitorStatus; error?: string };
      if (!res.ok) {
        setMessage({ kind: "err", text: body.error ?? fill(ui.httpError, { status: res.status }) });
        return false;
      }
      if (body.settings) {
        // Renvoie la vérité serveur au formulaire (valeurs bornées, jeton
        // consigné…) — et marque l'hydratation comme faite si la sauvegarde
        // a devancé le premier refresh.
        applySettings(body.settings);
        setToken("");
      }
      if (body.status) setStatus(body.status);
      setMessage({ kind: "ok", text: label });
      return true;
    } catch {
      setMessage({ kind: "err", text: ui.offline });
      return false;
    } finally {
      setBusy(null);
    }
  };

  const action = async (actionName: string, okText: string): Promise<void> => {
    setBusy(actionName);
    setMessage(null);
    try {
      const res = await fetch(localize("/api/staff/discord"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: actionName }),
      });
      const body = (await res.json().catch(() => ({}))) as {
        error?: string;
        ok?: boolean;
        mode?: "bot" | "webhook";
        status?: MonitorStatus;
        bot?: { username: string };
        channel?: { name: string } | null;
        probe?: { ok: boolean; latencyMs: number | null; status: number | null };
        sent?: boolean;
      };
      if (!res.ok) {
        setMessage({ kind: "err", text: body.error ?? fill(ui.httpError, { status: res.status }) });
        return;
      }
      if (body.status) setStatus(body.status);
      let text = okText;
      if (body.mode === "webhook") text = t.testWebhook;
      if (body.bot) {
        text = [t.tokenValid, body.bot.username, body.channel?.name].filter(Boolean).join(" · ");
      }
      if (body.probe) {
        text = [
          body.probe.ok ? t.reachable : t.unreachable,
          duration(body.probe.latencyMs),
          body.sent ? t.sent : t.notSent,
        ].join(" · ");
      }
      const failed = body.ok === false || Boolean(body.error);
      setMessage({ kind: failed ? "err" : "ok", text: body.error ?? (failed && !body.probe ? errors.DISCORD_FAILED : text) });
    } catch {
      setMessage({ kind: "err", text: ui.offline });
    } finally {
      setBusy(null);
    }
  };

  const saveAll = (): void => {
    const patch: Record<string, unknown> = {
      enabled,
      channelId,
      intervalMin: Math.min(1440, Math.max(1, Number(intervalMin) || 10)),
      heartbeat,
      notifyPush,
      alertOnDown,
      probeUrl,
      roleMention,
    };
    if (token.trim() !== "") patch.token = token.trim();
    void save(patch);
  };

  const configured = settings.tokenSet;
  const webhook = settings.tokenKind === "webhook";

  return (
    <div className="grid grid-cols-1 gap-5 lg:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)]">
      {/* ---------------------------------------------------------- réglages */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bot className="h-4 w-4 text-violet-300" />
            {t.title}
          </CardTitle>
          <CardDescription>
            {t.lead}
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-5">
          {!initial.persistentSecrets && (
            <p className="rounded-lg bg-amber/10 p-3 text-xs leading-relaxed text-amber ring-1 ring-amber/30">
              <ShieldCheck className="me-1 inline h-3.5 w-3.5" />
              {t.secretWarning}
            </p>
          )}

          <Field
            id="discord-token"
            label={t.token}
            hint={
              settings.tokenSet
                ? settings.tokenMasked
                : system.notConfigured
            }
            icon={<KeyRound className="h-4 w-4" />}
          >
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Input
                  id="discord-token"
                  dir="ltr"
                  type={showToken ? "text" : "password"}
                  value={token}
                  onChange={(e) => setToken(e.target.value)}
                  placeholder={
                    settings.tokenSet ? t.keepToken : "https://discord.com/api/webhooks/…"
                  }
                  autoComplete="off"
                  spellCheck={false}
                  className={cn("pe-10", webhook && "font-mono text-xs")}
                />
                <button
                  type="button"
                  onClick={() => setShowToken((v) => !v)}
                  className="absolute end-2 top-1/2 -translate-y-1/2 text-mist hover:text-chalk"
                  aria-label={showToken ? t.hideToken : t.showToken}
                >
                  {showToken ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
              {settings.tokenSet && (
                <Button
                  type="button"
                  variant="danger"
                  onClick={() =>
                    void save({ token: "" }, t.tokenRemoved)
                  }
                  title={t.removeToken}
                  aria-label={t.removeToken}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              )}
            </div>
          </Field>

          <Field
            id="discord-channel"
            label={t.channelId}
            hint={
              webhook
                ? t.webhookHint
                : t.channelHint
            }
          >
            <Input
              id="discord-channel"
              dir="ltr"
              value={channelId}
              onChange={(e) => setChannelId(e.target.value.replace(/\D/g, "").slice(0, 25))}
              placeholder="1234567890123456789"
              inputMode="numeric"
              className="font-mono"
            />
          </Field>

          <Field id="discord-interval" label={t.interval}>
            <div className="flex flex-wrap items-center gap-2">
              <Input
                id="discord-interval"
                type="number"
                min={1}
                max={1440}
                value={intervalMin}
                onChange={(e) => setIntervalMin(e.target.value)}
                className="w-28"
              />
              <div className="flex flex-wrap gap-1">
                {PRESETS.map((p) => (
                  <button
                    key={p}
                    type="button"
                    onClick={() => setIntervalMin(String(p))}
                    className={cn(
                      "rounded-md px-2 py-1 text-xs ring-1 transition-colors",
                      Number(intervalMin) === p
                        ? "bg-go/15 text-go ring-go/40"
                        : "bg-panel2 text-mist ring-edge hover:text-chalk",
                    )}
                  >
                    {formatDuration(p, "minute", locale)}
                  </button>
                ))}
              </div>
            </div>
          </Field>

          <div className="grid gap-2 sm:grid-cols-3">
            <Toggle
              label={t.heartbeat}
              desc={t.heartbeatHint}
              checked={heartbeat}
              onChange={setHeartbeat}
            />
            <Toggle
              label={t.notifyPush}
              desc={t.notifyPushHint}
              checked={notifyPush}
              onChange={setNotifyPush}
            />
            <Toggle
              label={t.alertDown}
              desc={t.alertHint}
              checked={alertOnDown}
              onChange={setAlertOnDown}
            />
          </div>

          <Field
            id="discord-mention"
            label={t.mention}
            hint={t.mentionHint}
          >
            <Input
              id="discord-mention"
              dir="ltr"
              value={roleMention}
              onChange={(e) => setRoleMention(e.target.value)}
              placeholder="@here"
            />
          </Field>

          <Field
            id="discord-probe"
            label={t.probeUrl}
            hint={fill(t.defaultProbe, { url: status.probeUrl })}
          >
            <Input
              id="discord-probe"
              dir="ltr"
              value={probeUrl}
              onChange={(e) => setProbeUrl(e.target.value)}
              placeholder="https://example.com/api/health"
              className="font-mono text-xs"
            />
          </Field>

          <div className="flex flex-wrap items-center gap-2 border-t border-edge pt-4">
            <Switch
              checked={enabled}
              onChange={setEnabled}
              label={t.enable}
            />
            <span className="text-sm text-chalk/90">
              {enabled ? ui.active : ui.inactive}
            </span>
            <div className="ms-auto flex flex-wrap gap-2">
              <Button
                type="button"
                onClick={saveAll}
                disabled={busy !== null || !hydrated}
                title={
                  hydrated
                    ? undefined
                    : ui.loading
                }
              >
                {busy === "save" ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Save className="h-4 w-4" />
                )}
                {ui.save}
              </Button>
            </div>
          </div>

          {message && (
            <p
              role="status"
              className={cn(
                "rounded-lg p-3 text-xs ring-1 animate-fade-in",
                message.kind === "ok"
                  ? "bg-go/10 text-go ring-go/25"
                  : "bg-danger/10 text-danger ring-danger/25",
              )}
            >
              {message.text}
            </p>
          )}
        </CardContent>
      </Card>

      {/* ------------------------------------------------------------ état */}
      <div className="flex flex-col gap-5">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Radio className="h-4 w-4 text-violet-300" />
              {t.status}
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-3">
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant={status.running ? "default" : "muted"}>
                {status.running ? <PlugZap className="h-3 w-3" /> : <Plug className="h-3 w-3" />}
                {status.running ? t.running : t.stopped}
              </Badge>
              <Badge variant={configured ? "sky" : "amber"}>
                {configured
                  ? webhook
                    ? t.webhookMode
                    : t.botMode
                  : system.notConfigured}
              </Badge>
              {status.bot.connected && (
                <Badge variant="default">
                  <Check className="h-3 w-3" />
                  {t.gatewayConnected}{status.bot.user && <>: <bdi>{status.bot.user}</bdi></>}
                  {status.bot.latencyMs !== null ? ` · ${duration(status.bot.latencyMs)}` : ""}
                </Badge>
              )}
            </div>

            <dl className="grid grid-cols-2 gap-2 text-sm">
              <Row label={t.nextPing}>
                {status.nextRunAt ? formatRelativeTime(status.nextRunAt, locale) : "—"}
              </Row>
              <Row label={t.lastPing}>
                {status.lastRunAt ? formatRelativeTime(status.lastRunAt, locale) : "—"}
              </Row>
              <Row label={system.latency}>
                {duration(status.lastLatencyMs)}
              </Row>
              <Row label={system.uptime24}>
                {status.uptime24h.uptimePct !== null
                  ? formatPercent(status.uptime24h.uptimePct, locale)
                  : "—"}
              </Row>
              <Row label={system.probes}>
                {formatNumber(status.uptime24h.ok, locale)} / {formatNumber(status.uptime24h.total, locale)}
              </Row>
              <Row label={t.messagesSent}>
                {formatNumber(status.messagesSent, locale)}
              </Row>
            </dl>

            {statusError && (
              <p
                role="status"
                className="rounded-lg bg-amber/10 p-2.5 text-xs leading-relaxed text-amber ring-1 ring-amber/30"
              >
                {statusError}
              </p>
            )}
            {status.lastOk === false && (
              <p className="text-xs text-amber">{t.unreachable}</p>
            )}
            {status.lastError && (
              <div className="rounded-lg bg-danger/10 p-2.5 text-xs text-danger ring-1 ring-danger/25">
                <p>{t.monitorIssue}</p>
                <details className="mt-2">
                  <summary className="cursor-pointer">{staff.diagnostics}</summary>
                  <code dir="auto" className="mt-2 block break-all">{status.lastError}</code>
                </details>
              </div>
            )}
            {status.startedAt && (
              <p className="text-[11px] text-mist">
                {fill(t.startedAt, { date: formatDateTime(status.startedAt, locale) })}
              </p>
            )}

            <div className="flex flex-wrap gap-2 border-t border-edge pt-3">
              <Button
                variant="secondary"
                size="sm"
                onClick={() => void action("test", t.tokenValid)}
                disabled={busy !== null || !configured}
              >
                {busy === "test" ? (
                  <Loader2 className="h-3.5 w-3.5 animate-spin" />
                ) : (
                  <ShieldCheck className="h-3.5 w-3.5" />
                )}
                {t.testToken}
              </Button>
              <Button
                variant="secondary"
                size="sm"
                onClick={() => void action("send", t.testSent)}
                disabled={busy !== null || !configured}
              >
                {busy === "send" ? (
                  <Loader2 className="h-3.5 w-3.5 animate-spin" />
                ) : (
                  <Send className="h-3.5 w-3.5" />
                )}
                {t.sendTest}
              </Button>
              <Button
                variant="secondary"
                size="sm"
                onClick={() => void action("ping", ui.success)}
                disabled={busy !== null || !configured}
              >
                {busy === "ping" ? (
                  <Loader2 className="h-3.5 w-3.5 animate-spin" />
                ) : (
                  <ActivityIcon className="h-3.5 w-3.5" />
                )}
                {t.pingNow}
              </Button>
              <Button
                variant={status.running ? "danger" : "outline"}
                size="sm"
                onClick={() => void action(status.running ? "stop" : "start", ui.success)}
                disabled={busy !== null}
              >
                {status.running ? t.stop : t.start}
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm">{t.setup}</CardTitle>
          </CardHeader>
          <CardContent>
            <ol className="list-decimal space-y-3 ps-4 text-xs leading-relaxed text-mist">
              <li>{t.setupBot}</li>
              <li>{t.setupChannel}</li>
              <li>{t.setupVerify}</li>
            </ol>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

/* ----------------------------------------------------------------- briques */

function Field({
  id,
  label,
  hint,
  icon,
  children,
}: {
  id: string;
  label: string;
  hint?: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <Label htmlFor={id} className="flex items-center gap-1.5">
        {icon}
        {label}
      </Label>
      {children}
      {hint && <p className="text-[11px] text-mist">{hint}</p>}
    </div>
  );
}

function Toggle({
  label,
  desc,
  checked,
  onChange,
}: {
  label: string;
  desc: string;
  checked: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <div
      className={cn(
        "flex flex-col gap-1 rounded-xl p-3 ring-1 transition-colors",
        checked ? "bg-go/5 ring-go/30" : "bg-panel2 ring-edge",
      )}
    >
      <span className="flex items-center gap-2">
        <Switch checked={checked} onChange={onChange} label={label} />
        <span className="text-xs font-medium text-chalk">{label}</span>
      </span>
      <span className="text-[11px] leading-snug text-mist">{desc}</span>
    </div>
  );
}

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="rounded-lg bg-panel2 px-3 py-2 ring-1 ring-edge">
      <dt className="text-[10px] uppercase tracking-wide text-mist">{label}</dt>
      <dd className="text-sm text-chalk">{children}</dd>
    </div>
  );
}
