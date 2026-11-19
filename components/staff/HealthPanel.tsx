"use client";

/**
 * Onglet « Système » : historique de disponibilité (les sondes du bot),
 * et l'état de la configuration — utile pour diagnostiquer sans SSH.
 */
import { AlertTriangle, CheckCircle2, Gauge, ServerCog } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { fill, formatBytes, formatDateTime, formatDuration, formatNumber, formatPercent, formatRelativeTime } from "@/lib/i18n/format";
import type { Dict } from "@/lib/i18n/types";
import type { Locale } from "@/lib/i18n/locales";
import type { PingRow, UptimeStats } from "@/lib/staff-types";

export interface ConfigView {
  appUrl: string;
  jobsDir: string;
  maxUploadBytes: number;
  maxExtractBytes: number;
  maxFiles: number;
  pushesPerHour: number;
  uploadsPerHour: number;
  devAuth: boolean;
  sessionSecretSet: boolean;
  staffLogins: string[];
  nodeVersion: string;
}

export function HealthPanel({
  pings,
  locale,
  copy,
  uptime,
  configView,
}: {
  pings: PingRow[];
  locale: Locale;
  copy: Pick<Dict, "system" | "ui" | "discord"> & { archiveLimit: string };
  uptime: UptimeStats;
  configView: ConfigView;
}) {
  // Du plus ancien au plus récent pour la lecture gauche → droite.
  const { system: t, ui } = copy;
  const ordered = [...pings].reverse();
  const maxLatency = Math.max(1, ...ordered.map((p) => p.latencyMs ?? 0));
  const duration = (ms: number | null) => ms === null ? "—" : formatDuration(ms, "millisecond", locale);

  return (
    <div className="grid grid-cols-1 gap-5 lg:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)]">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Gauge className="h-4 w-4 text-violet-300" />
            {t.uptime}
          </CardTitle>
          <CardDescription>
            {t.uptimeLead}
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <div className="grid grid-cols-3 gap-2">
            <Metric
              label={t.uptime24}
              value={uptime.uptimePct !== null ? formatPercent(uptime.uptimePct, locale) : "—"}
            />
            <Metric
              label={t.averageLatency}
              value={duration(uptime.avgLatencyMs)}
            />
            <Metric label={t.probes} value={`${formatNumber(uptime.ok, locale)} / ${formatNumber(uptime.total, locale)}`} />
          </div>

          {ordered.length === 0 ? (
            <p className="rounded-xl bg-panel2 p-6 text-center text-sm text-mist ring-1 ring-edge">
              {t.empty}
            </p>
          ) : (
            <div className="flex h-24 items-end gap-[2px] rounded-xl bg-panel2 p-2 ring-1 ring-edge">
              {ordered.map((p) => {
                const h = p.ok
                  ? Math.max(8, Math.round(((p.latencyMs ?? 0) / maxLatency) * 100))
                  : 100;
                return (
                  <span
                    key={p.id}
                    title={`${p.ok ? ui.success : ui.failed} · ${formatDateTime(p.createdAt, locale)}${
                      p.latencyMs !== null ? ` · ${duration(p.latencyMs)}` : ""
                    }`}
                    style={{ height: `${h}%` }}
                    className={cn(
                      "flex-1 rounded-sm transition-colors",
                      p.ok ? "bg-go/70 hover:bg-go" : "bg-danger/80 hover:bg-danger",
                    )}
                  />
                );
              })}
            </div>
          )}

          <div className="overflow-x-auto rounded-xl ring-1 ring-edge">
            <table className="w-full text-xs">
              <thead className="bg-panel2 text-mist">
                <tr>
                  <th className="px-3 py-2 text-start font-medium">{ui.date}</th>
                  <th className="px-3 py-2 text-start font-medium">{ui.status}</th>
                  <th className="px-3 py-2 text-end font-medium">{t.latency}</th>
                  <th className="px-3 py-2 text-end font-medium">HTTP</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-edge/70">
                {pings.slice(0, 12).map((p) => (
                  <tr key={p.id} className="hover:bg-panel2/60">
                    <td className="px-3 py-2 text-chalk/90" title={formatDateTime(p.createdAt, locale)}>
                      {formatRelativeTime(p.createdAt, locale)}
                    </td>
                    <td className="px-3 py-2">
                      {p.ok ? (
                        <span className="inline-flex items-center gap-1 text-go">
                          <CheckCircle2 className="h-3.5 w-3.5" /> {ui.success}
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-danger" title={p.status === null ? copy.discord.unreachable : fill(ui.httpError, { status: p.status })}>
                          <AlertTriangle className="h-3.5 w-3.5" />
                          {ui.failed}
                        </span>
                      )}
                    </td>
                    <td className="px-3 py-2 text-end tabular-nums text-mist">
                      {duration(p.latencyMs)}
                    </td>
                    <td className="px-3 py-2 text-end tabular-nums text-mist">
                      {p.status ?? "—"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ServerCog className="h-4 w-4 text-violet-300" />
            {t.configuration}
          </CardTitle>
          <CardDescription>
            {t.configLead}
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-3">
          <ConfigRow label={t.publicUrl} value={configView.appUrl} mono />
          <ConfigRow label="Node.js" value={configView.nodeVersion} mono />
          <ConfigRow
            label={t.archiveLimits}
            value={fill(copy.archiveLimit, { upload: formatBytes(configView.maxUploadBytes, locale), extract: formatBytes(configView.maxExtractBytes, locale) })}
          />
          <ConfigRow
            label={t.maxFiles}
            value={formatNumber(configView.maxFiles, locale)}
          />
          <ConfigRow
            label={t.quotas}
            value={fill(t.quotaValues, { pushes: formatNumber(configView.pushesPerHour, locale), uploads: formatNumber(configView.uploadsPerHour, locale) })}
          />
          <ConfigRow label={t.workDir} value={configView.jobsDir} mono />
          <ConfigRow
            label={t.sessionSecret}
            value={configView.sessionSecretSet ? t.configured : t.notConfigured}
          />
          <ConfigRow
            label={t.staffAccounts}
            value={
              configView.staffLogins.length
                ? configView.staffLogins.join(", ")
                : configView.devAuth
                  ? t.allDev
                  : ui.none
            }
          />
          {configView.devAuth && (
            <p className="rounded-lg bg-amber/10 p-3 text-xs leading-relaxed text-amber ring-1 ring-amber/30">
              <AlertTriangle className="me-1 inline h-3.5 w-3.5" />
              {t.devWarning}
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl bg-panel2 px-3 py-2.5 ring-1 ring-edge">
      <div className="text-[10px] uppercase tracking-wide text-mist">{label}</div>
      <div className="text-lg font-semibold tabular-nums text-chalk">{value}</div>
    </div>
  );
}

function ConfigRow({
  label,
  value,
  mono,
}: {
  label: string;
  value: string;
  mono?: boolean;
}) {
  return (
    <div className="flex items-center justify-between gap-3 rounded-lg bg-panel2 px-3 py-2 ring-1 ring-edge">
      <span className="shrink-0 text-[11px] uppercase tracking-wide text-mist">
        {label}
      </span>
      <span className="flex min-w-0 items-center gap-2">
        <span
          className={cn(
            "truncate text-xs text-chalk/90",
            mono && "font-mono text-[11px]",
          )}
          title={value}
        >
          {value}
        </span>
      </span>
    </div>
  );
}
