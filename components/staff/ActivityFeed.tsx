"use client";

/**
 * Journal d'activité du panel staff : qui a poussé du code, où, et à quelle
 * heure. Rafraîchissement manuel ou automatique (15 s), filtres, pagination
 * et export CSV de la page courante.
 */
import { useCallback, useEffect, useState } from "react";
import {
  Activity,
  ArrowLeft,
  ArrowRight,
  Bot,
  CheckCircle2,
  Download,
  GitBranch,
  LogIn,
  RefreshCw,
  Search,
  Settings2,
  ShieldAlert,
  Upload,
  XCircle,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Spinner } from "@/components/ui/spinner";
import { cn } from "@/lib/utils";
import { useLocalizedPath } from "@/components/LocaleLink";
import { fill, formatBytes, formatDateTime, formatNumber, formatRelativeTime, formatTime } from "@/lib/i18n/format";
import type { Dict } from "@/lib/i18n/types";
import type { Locale } from "@/lib/i18n/locales";
import type { ActivityEvent, ActivityResponse, PushDetail } from "@/lib/staff-types";

const PAGE = 25;
const AUTO_REFRESH_MS = 15_000;

const KIND_META: Record<
  ActivityEvent["kind"] | "all",
  { icon: typeof Activity; tone: string }
> = {
  all: { icon: Activity, tone: "text-chalk" },
  push: { icon: GitBranch, tone: "text-go" },
  upload: { icon: Upload, tone: "text-sky" },
  login: { icon: LogIn, tone: "text-mist" },
  logout: { icon: LogIn, tone: "text-mist" },
  settings: { icon: Settings2, tone: "text-amber" },
  discord: { icon: Bot, tone: "text-violet" },
  system: { icon: ShieldAlert, tone: "text-mist" },
};

type EventKind = keyof typeof KIND_META;
type ActivityCopy = Pick<Dict, "activity" | "ui" | "nav" | "staff" | "discord"> & {
  refreshLabel: string;
  lastPush: string;
  repoCreated: string;
};

function kindLabel(kind: EventKind, copy: ActivityCopy): string {
  switch (kind) {
    case "all": return copy.ui.all;
    case "discord": return "Discord";
    case "system": return copy.staff.system;
    case "login": return copy.nav.login;
    case "logout": return copy.nav.logout;
    default: return copy.activity[kind];
  }
}

export function ActivityFeed({ initial, locale, copy }: { initial: ActivityResponse; locale: Locale; copy: ActivityCopy }) {
  const { activity: t, ui } = copy;
  const localize = useLocalizedPath();
  const [data, setData] = useState<ActivityResponse>(initial);
  const [kind, setKind] = useState<ActivityEvent["kind"] | "all">("all");
  const [login, setLogin] = useState("");
  const [q, setQ] = useState("");
  const [search, setSearch] = useState("");
  const [offset, setOffset] = useState(0);
  const [auto, setAuto] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(
    async (nextOffset: number, silent = false) => {
      if (!silent) setLoading(true);
      const params = new URLSearchParams({
        limit: String(PAGE),
        offset: String(nextOffset),
      });
      if (kind !== "all") params.set("kind", kind);
      if (login) params.set("login", login);
      if (search) params.set("q", search);
      try {
        const res = await fetch(localize(`/api/staff/activity?${params}`), {
          cache: "no-store",
        });
        const body = (await res.json()) as ActivityResponse & { error?: string };
        if (!res.ok) {
          setError(body.error ?? fill(ui.httpError, { status: res.status }));
          return;
        }
        setError(null);
        setData(body);
        setOffset(nextOffset);
      } catch {
        if (!silent) setError(ui.offline);
      } finally {
        setLoading(false);
      }
    },
    [kind, login, search, localize, ui],
  );

  // Rechargement quand un filtre change (et retour à la première page).
  useEffect(() => {
    void load(0);
  }, [load]);

  useEffect(() => {
    if (!auto) return;
    const iv = setInterval(() => void load(offset, true), AUTO_REFRESH_MS);
    return () => clearInterval(iv);
  }, [auto, load, offset]);

  const stats = data.stats;
  const page = Math.floor(offset / PAGE) + 1;
  const pages = Math.max(1, Math.ceil(data.total / PAGE));

  return (
    <div className="flex flex-col gap-5">
      {/* ------------------------------------------------------- statistiques */}
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <StatTile
          label={t.successfulPushes}
          value={formatNumber(stats.totalPushes - stats.failedPushes, locale)}
          sub={fill(t.lastDay, { count: formatNumber(stats.pushes24h, locale) })}
          icon={GitBranch}
          tone="go"
        />
        <StatTile
          label={t.activeUsers}
          value={formatNumber(stats.users24h, locale)}
          sub={t.inLastDay}
          icon={LogIn}
          tone="violet"
        />
        <StatTile
          label={t.received}
          value={formatNumber(stats.totalJobs, locale)}
          sub={t.sinceStart}
          icon={Upload}
          tone="sky"
        />
        <StatTile
          label={t.failedPushes}
          value={formatNumber(stats.failedPushes, locale)}
          sub={
            stats.lastPushAt
              ? fill(copy.lastPush, { time: formatRelativeTime(stats.lastPushAt, locale, data.generatedAt) })
              : t.noPush
          }
          icon={XCircle}
          tone={stats.failedPushes > 0 ? "danger" : "muted"}
        />
      </div>

      {/* ------------------------------------------------------------- barre */}
      <div className="panel flex flex-col gap-3 p-4">
        <div className="flex flex-wrap items-center gap-2">
          {(Object.keys(KIND_META) as (ActivityEvent["kind"] | "all")[]).map(
            (k) => {
              const meta = KIND_META[k];
              const active = kind === k;
              return (
                <button
                  key={k}
                  type="button"
                  onClick={() => setKind(k)}
                  className={cn(
                    "inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium transition-colors",
                    active
                      ? "bg-violet-500/15 text-violet-200 ring-1 ring-violet-400/40"
                      : "bg-panel2 text-mist ring-1 ring-edge hover:text-chalk",
                  )}
                >
                  <meta.icon className="h-3.5 w-3.5" />
                  {kindLabel(k, copy)}
                </button>
              );
            },
          )}
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <div className="relative min-w-52 flex-1">
            <Search className="pointer-events-none absolute start-3 top-1/2 h-4 w-4 -translate-y-1/2 text-mist" />
            <Input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  setSearch(q.trim());
                }
              }}
              placeholder={t.search}
              aria-label={t.search}
              className="ps-9"
            />
          </div>
          <select
            value={login}
            aria-label={t.users}
            onChange={(e) => setLogin(e.target.value)}
            className="h-10 rounded-lg bg-panel2 px-3 text-sm text-chalk ring-1 ring-edge outline-none focus-visible:ring-2 focus-visible:ring-go/50"
          >
            <option value="">{t.users}</option>
            {data.logins.map((l) => (
              <option key={l.login} value={l.login}>
                {l.login} ({formatNumber(l.events, locale)})
              </option>
            ))}
          </select>
          {search && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                setQ("");
                setSearch("");
              }}
            >
              {ui.clear}
            </Button>
          )}
          <span className="ms-auto flex max-w-full flex-wrap items-center gap-3">
            <span className="flex items-center gap-2 text-xs text-mist">
              <Switch
                checked={auto}
                onChange={setAuto}
                label={t.autoRefresh}
              />
              {t.autoRefresh}
            </span>
            <Button
              variant="secondary"
              size="sm"
              onClick={() => void load(offset)}
              disabled={loading}
            >
              {loading ? <Spinner /> : <RefreshCw className="h-3.5 w-3.5" />}
              {copy.refreshLabel}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => exportCsv(data.events)}
              aria-label={t.export}
              title={t.export}
            >
              <Download className="h-3.5 w-3.5" />
              CSV
            </Button>
          </span>
        </div>

        {error && (
          <p role="alert" className="text-xs text-danger">
            {error}
          </p>
        )}
      </div>

      {/* -------------------------------------------------------------- liste */}
      <div className="panel overflow-hidden">
        <div className="flex items-center justify-between border-b border-edge px-4 py-3">
          <h2 className="text-sm font-semibold">
            {fill(t.events, { count: formatNumber(data.total, locale) })}
          </h2>
          <div className="flex items-center gap-2 text-xs text-mist">
            <Button
              variant="ghost"
              size="sm"
              aria-label={ui.previous}
              disabled={offset === 0 || loading}
              onClick={() => void load(Math.max(0, offset - PAGE))}
            >
              <ArrowLeft className="h-3.5 w-3.5 rtl:rotate-180" />
            </Button>
            <span className="tabular-nums">
              {formatNumber(page, locale)} / {formatNumber(pages, locale)}
            </span>
            <Button
              variant="ghost"
              size="sm"
              aria-label={ui.next}
              disabled={offset + PAGE >= data.total || loading}
              onClick={() => void load(offset + PAGE)}
            >
              <ArrowRight className="h-3.5 w-3.5 rtl:rotate-180" />
            </Button>
          </div>
        </div>

        {data.events.length === 0 ? (
          <p className="px-4 py-14 text-center text-sm text-mist">
            {t.empty}
          </p>
        ) : (
          <ul className="divide-y divide-edge/70">
            {data.events.map((e) => (
              <EventRow key={e.id} event={e} locale={locale} now={data.generatedAt} copy={copy} />
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ détail */

function EventRow({ event, locale, now, copy }: {
  event: ActivityEvent; locale: Locale; now: number; copy: ActivityCopy;
}) {
  const d = event.detail ?? {};
  const { ui, discord, staff } = copy;
  let actionLabel: string | undefined;
  let outcome: string | undefined;
  let eventData: string | undefined;
  if (event.kind === "discord") {
    const actions: Record<string, string> = {
      test: discord.testToken, send: discord.sendTest, "send-test": discord.sendTest,
      ping: discord.pingNow, "ping-now": discord.pingNow,
      start: discord.start, stop: discord.stop,
      heal: discord.status, tick: discord.lastPing, heartbeat: discord.heartbeat,
    };
    if (typeof d.action === "string" && Object.hasOwn(actions, d.action)) actionLabel = actions[d.action];
    if (d.ok === false || d.running === false) outcome = ui.failed;
  } else if (event.kind === "settings") {
    if (d.scope === "staff.password") {
      actionLabel = staff.panelPassword;
      if (typeof d.enabled === "boolean") outcome = d.enabled ? ui.active : ui.inactive;
    } else if (d.scope === "staff.unlock") {
      actionLabel = d.action === "lock" ? staff.lock : staff.unlock;
      if (typeof d.ok === "boolean") outcome = d.ok ? ui.success : ui.failed;
    } else if (Array.isArray(d.changed)) {
      const labels: Record<string, string> = {
        enabled: discord.enable, token: discord.token, channelId: discord.channelId,
        intervalMin: discord.interval, heartbeat: discord.heartbeat, notifyPush: discord.notifyPush,
        alertOnDown: discord.alertDown, probeUrl: discord.probeUrl, roleMention: discord.mention,
      };
      const changed = d.changed.flatMap((key) => typeof key === "string" && Object.hasOwn(labels, key) ? [labels[key]] : []);
      if (changed.length) actionLabel = new Intl.ListFormat(locale).format(changed);
    }
  } else if (event.kind === "upload" && typeof d.filename === "string") {
    eventData = d.filename;
  } else if (event.kind === "system" && typeof d.repo === "string") {
    eventData = d.repo;
  }
  const meta = KIND_META[event.kind] ?? KIND_META.system;
  const push = event.kind === "push" ? (event.detail as unknown as PushDetail) : null;

  return (
    <li
      className={cn(
        "flex flex-wrap items-start gap-3 px-4 py-3 transition-colors hover:bg-panel2/60",
        push?.ok === true && "border-s-2 border-s-go/60",
        push?.ok === false && "border-s-2 border-s-danger/60",
      )}
    >
      {/* horodatage */}
      <div className="w-28 shrink-0 pt-0.5" title={formatDateTime(event.createdAt, locale)}>
        <div className="text-xs font-medium text-chalk tabular-nums">
          {formatTime(event.createdAt, locale)}
        </div>
        <div className="text-[11px] text-mist">{formatRelativeTime(event.createdAt, locale, now)}</div>
      </div>

      {/* utilisateur */}
      <div className="flex min-w-36 shrink-0 items-center gap-2">
        {event.login ? (
          <>
            <img
              src={`https://github.com/${encodeURIComponent(event.login)}.png?size=48`}
              alt=""
              referrerPolicy="no-referrer"
              className="h-7 w-7 rounded-full bg-panel2 ring-1 ring-edge"
            />
            <span className="truncate text-sm font-medium text-chalk">
              {event.login}
            </span>
          </>
        ) : (
          <span className="grid h-7 w-7 place-items-center rounded-full bg-panel2 text-mist ring-1 ring-edge">
            <meta.icon className="h-3.5 w-3.5" />
          </span>
        )}
      </div>

      {/* contenu */}
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant={event.kind === "push" ? "default" : "muted"}>
            <meta.icon className="h-3 w-3" />
            {kindLabel(event.kind, copy)}
          </Badge>
          {push && (
            <Badge variant={push.ok ? "default" : "danger"}>
              {push.ok ? (
                <CheckCircle2 className="h-3 w-3" />
              ) : (
                <XCircle className="h-3 w-3" />
              )}
              {push.ok ? ui.success : ui.failed}
            </Badge>
          )}
          {(actionLabel || outcome) && (
            <span className="text-sm text-chalk/90">{[actionLabel, outcome].filter(Boolean).join(" · ")}</span>
          )}
          {eventData && <bdi className="truncate text-sm text-chalk/90">{eventData}</bdi>}
        </div>

        {push && (
          <div className="mt-1.5 flex flex-wrap items-center gap-1.5 text-[11px]">
            {push.repo && (
              <Chip href={`https://github.com/${push.repo}`}>
                <GitBranch className="h-3 w-3" />
                {push.repo}
              </Chip>
            )}
            {push.branch && (
              <Chip
                href={
                  push.repo ? `https://github.com/${push.repo}/tree/${push.branch}` : undefined
                }
              >
                {push.branch}
              </Chip>
            )}
            {push.sha && (
              <Chip
                href={
                  push.repo ? `https://github.com/${push.repo}/commit/${push.sha}` : undefined
                }
                mono
              >
                {push.sha.slice(0, 7)}
              </Chip>
            )}
            {push.files !== undefined && <Chip>{fill(ui.filesCount, { count: formatNumber(push.files, locale) })}</Chip>}
            {push.bytes ? <Chip>{formatBytes(push.bytes, locale)}</Chip> : null}
            {push.filename && <Chip>{push.filename}</Chip>}
            {push.created && <Chip>{copy.repoCreated}</Chip>}
          </div>
        )}
        {push?.error && (
          <p className="mt-1.5 text-[11px] text-danger/90">{push.error}</p>
        )}
      </div>

      {/* ip */}
      {event.ip && (
        <span className="shrink-0 font-mono text-[11px] text-mist/70">
          {event.ip}
        </span>
      )}
    </li>
  );
}

function Chip({
  children,
  href,
  mono,
}: {
  children: React.ReactNode;
  href?: string;
  mono?: boolean;
}) {
  const cls = cn(
    "inline-flex items-center gap-1 rounded-md bg-panel2 px-1.5 py-0.5 ring-1 ring-edge",
    mono && "font-mono",
    href ? "text-sky/90 hover:text-sky hover:ring-sky/40" : "text-mist",
  );
  if (!href) return <span className={cls}>{children}</span>;
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>
      {children}
    </a>
  );
}

function StatTile({
  label,
  value,
  sub,
  icon: Icon,
  tone,
}: {
  label: string;
  value: string;
  sub: string;
  icon: typeof Activity;
  tone: "go" | "sky" | "violet" | "danger" | "muted";
}) {
  const tones = {
    go: "bg-go/10 text-go ring-go/25",
    sky: "bg-sky/10 text-sky ring-sky/25",
    violet: "bg-violet-500/10 text-violet-300 ring-violet-400/25",
    danger: "bg-danger/10 text-danger ring-danger/25",
    muted: "bg-panel2 text-mist ring-edge",
  } as const;
  return (
    <div className="panel flex items-center gap-3 p-4">
      <span className={cn("grid h-10 w-10 place-items-center rounded-xl ring-1", tones[tone])}>
        <Icon className="h-5 w-5" />
      </span>
      <div className="min-w-0">
        <div className="text-[11px] uppercase tracking-wide text-mist">{label}</div>
        <div className="text-xl font-semibold tabular-nums text-chalk">{value}</div>
        <div className="truncate text-[11px] text-mist">{sub}</div>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------- export CSV */

function exportCsv(events: ActivityEvent[]): void {
  const header = [
    "date",
    "type",
    "login",
    "statut",
    "depot",
    "branche",
    "commit",
    "fichiers",
    "octets",
    "archive",
    "ip",
  ];
  const rows = events.map((e) => {
    const d = (e.detail ?? {}) as Record<string, unknown> as PushDetail &
      Record<string, unknown>;
    return [
      new Date(e.createdAt).toISOString(),
      e.kind,
      e.login ?? "",
      e.kind === "push" ? (d.ok ? "ok" : "echec") : "",
      d.repo ?? "",
      d.branch ?? "",
      d.sha ?? "",
      d.files ?? "",
      d.bytes ?? "",
      d.filename ?? "",
      e.ip ?? "",
    ];
  });
  const csv = [header, ...rows]
    .map((r) =>
      r
        .map((c) => {
          const s = String(c);
          return /[",;\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
        })
        .join(";"),
    )
    .join("\n");
  const url = URL.createObjectURL(new Blob([`\uFEFF${csv}`], { type: "text/csv" }));
  const a = document.createElement("a");
  a.href = url;
  a.download = `repodrop-activite-${new Date().toISOString().slice(0, 10)}.csv`;
  a.click();
  URL.revokeObjectURL(url);
}
