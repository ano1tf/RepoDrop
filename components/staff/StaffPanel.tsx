"use client";

/**
 * Coquille du panel staff : onglets Activité / Discord / Système.
 * L'accès est vérifié côté serveur (app/staff/page.tsx) — ce composant ne
 * fait que de la présentation, aucune donnée n'est exposée ici.
 */
import { useState } from "react";
import LocaleLink from "@/components/LocaleLink";
import { Activity, ArrowLeft, Bot, Gauge, KeyRound, ShieldCheck } from "lucide-react";
import { ActivityFeed } from "./ActivityFeed";
import { DiscordSettings } from "./DiscordSettings";
import { HealthPanel, type ConfigView } from "./HealthPanel";
import { StaffPassword, type StaffSecurityView } from "./StaffPassword";
import { Badge } from "@/components/ui/badge";
import type { Dict } from "@/lib/i18n/types";
import type { Locale } from "@/lib/i18n/locales";
import { cn } from "@/lib/utils";
import type { ActivityResponse, StaffSettingsResponse, PingRow, UptimeStats } from "@/lib/staff-types";

const TABS = [
  { id: "activity", icon: Activity },
  { id: "discord", icon: Bot },
  { id: "security", icon: KeyRound },
  { id: "system", icon: Gauge },
] as const;

type TabId = (typeof TABS)[number]["id"];

export function StaffPanel({
  locale,
  copy,
  activity,
  settings,
  pings,
  uptime,
  configView,
  security,
  login,
}: {
  locale: Locale;
  copy: Pick<Dict, "staff" | "ui" | "notFound" | "errors" | "activity" | "discord" | "system" | "nav"> & { refreshLabel: string; lastPush: string; repoCreated: string; archiveLimit: string };
  activity: ActivityResponse;
  settings: StaffSettingsResponse;
  pings: PingRow[];
  uptime: UptimeStats;
  configView: ConfigView;
  security: StaffSecurityView;
  login: string;
}) {
  const [tab, setTab] = useState<TabId>("activity");

  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6">
      {/* ------------------------------------------------------------ en-tête */}
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3 animate-fade-up">
        <div className="flex min-w-0 items-center gap-3">
          <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-violet-500/15 text-violet-200 ring-1 ring-violet-400/30">
            <ShieldCheck className="h-5 w-5" />
          </span>
          <div>
            <h1 className="text-xl font-semibold tracking-tight">{copy.staff.title}</h1>
            <p className="text-xs text-mist">
              {copy.staff.lead}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="sky">
            <ShieldCheck className="h-3 w-3" />
            {login}
          </Badge>
          <LocaleLink
            href="/"
            className="inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs text-mist ring-1 ring-edge transition-colors hover:text-chalk"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            {copy.notFound.back}
          </LocaleLink>
        </div>
      </div>

      {/* -------------------------------------------------------------- onglets */}
      <div className="mb-5 flex flex-wrap gap-1 rounded-xl bg-panel p-1 ring-1 ring-edge">
        {TABS.map((t) => (
          <button
            key={t.id}
            type="button"
            onClick={() => setTab(t.id)}
            aria-pressed={tab === t.id}
            className={cn(
              "inline-flex flex-1 items-center justify-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-colors",
              tab === t.id
                ? "bg-violet-500/15 text-violet-100 ring-1 ring-violet-400/30"
                : "text-mist hover:bg-panel2 hover:text-chalk",
            )}
          >
            <t.icon className="h-4 w-4" />
            {t.id === "discord" ? "Discord" : copy.staff[t.id]}
          </button>
        ))}
      </div>

      <div className="animate-fade-in" key={tab}>
        {tab === "activity" && <ActivityFeed initial={activity} locale={locale} copy={copy} />}
        {tab === "discord" && <DiscordSettings initial={settings} locale={locale} copy={copy} />}
        {tab === "security" && <StaffPassword initial={security} locale={locale} copy={copy} />}
        {tab === "system" && (
          <HealthPanel pings={pings} uptime={uptime} configView={configView} locale={locale} copy={copy} />
        )}
      </div>
    </main>
  );
}
