import { redirect } from "next/navigation";
import Link from "next/link";
import { ShieldOff } from "lucide-react";
import { getSession } from "@/lib/session";
import {
  staffAccess,
  staffConfigured,
  staffPasswordUpdatedAt,
} from "@/lib/staff";
import { getString } from "@/lib/settings";
import { ensureWorkerInit } from "@/lib/jobs";
import {
  activityStats,
  countEvents,
  listEventLogins,
  listEvents,
  listPings,
  pingStats,
} from "@/lib/db";
import { discordSettingsView, getDiscordSettings } from "@/lib/settings";
import { getMonitorStatus } from "@/lib/discord/monitor";
import { config } from "@/lib/config";
import { StaffPanel } from "@/components/staff/StaffPanel";
import { StaffGate } from "@/components/staff/StaffGate";
import { buttonVariants } from "@/components/ui/button";
import type { ActivityResponse } from "@/lib/staff-types";
import type { ConfigView } from "@/components/staff/HealthPanel";

export const metadata = {
  title: "Panel staff",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default async function StaffPage() {
  ensureWorkerInit();

  const session = await getSession();
  if (!session) redirect("/login");

  // Trois états : « denied » (pas staff), « locked » (staff, mot de passe à
  // saisir), « granted ». On reste discret : pas d'indexation, et aucun détail
  // de configuration n'est affiché (ni nom de compte autorisé, ni variable
  // d'environnement) — l'écran de refus reste muet.
  const access = await staffAccess();
  if (access === "denied") {
    return <NoAccess login={session.login} />;
  }
  if (access === "locked") {
    return <StaffGate login={session.login} />;
  }

  const pings = listPings(60);
  const activity: ActivityResponse = {
    events: listEvents({ limit: 25 }),
    total: countEvents({}),
    stats: activityStats(),
    logins: listEventLogins(40),
    pings,
    uptime: pingStats(24 * 3_600_000),
    page: { limit: 25, offset: 0 },
  };

  const configView: ConfigView = {
    appUrl: config.appUrl,
    jobsDir: config.jobsDir,
    maxUploadBytes: config.limits.maxUploadBytes,
    maxExtractBytes: config.limits.maxExtractBytes,
    maxFiles: config.limits.maxFiles,
    pushesPerHour: config.limits.pushesPerHour,
    uploadsPerHour: config.limits.uploadsPerHour,
    devAuth: config.devAuth,
    sessionSecretSet: Boolean(config.sessionSecret),
    staffLogins: [
      ...config.staffLogins,
      ...config.staffIds.map((id) => String(id)),
    ],
    nodeVersion: process.version,
  };

  return (
    <StaffPanel
      activity={activity}
      settings={{
        settings: discordSettingsView(getDiscordSettings()),
        status: getMonitorStatus(),
        staffConfigured: staffConfigured(),
        persistentSecrets: Boolean(config.sessionSecret),
      }}
      pings={pings}
      uptime={activity.uptime}
      configView={configView}
      security={{
        passwordSet:
          Boolean(getString("staff.passwordHash")) ||
          Boolean(config.staffPassword),
        source: getString("staff.passwordHash")
          ? "panel"
          : config.staffPassword
            ? "env"
            : "none",
        updatedAt: await staffPasswordUpdatedAt(),
      }}
      login={session.login}
    />
  );
}

/** Écran affiché à un compte connecté mais non staff : volontairement muet. */
function NoAccess({ login }: { login: string }) {
  return (
    <main className="mx-auto flex max-w-lg flex-col items-center gap-5 px-4 py-24 text-center">
      <span className="grid h-14 w-14 place-items-center rounded-2xl bg-danger/10 text-danger ring-1 ring-danger/30">
        <ShieldOff className="h-7 w-7" />
      </span>
      <div>
        <h1 className="text-xl font-semibold tracking-tight">Accès restreint</h1>
        <p className="mt-2 text-sm text-mist">
          Le compte <strong className="text-chalk">{login}</strong> n&apos;a pas
          accès à cet espace. Vous pouvez revenir à l&apos;accueil et continuer
          à importer vos archives.
        </p>
      </div>

      <Link href="/" className={buttonVariants({ variant: "secondary" })}>
        Retour à l&apos;accueil
      </Link>
    </main>
  );
}
