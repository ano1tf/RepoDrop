import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import PageError from "@/app/error";
import { LocaleNavigation } from "@/components/LocaleLink";
import { RepoActions } from "@/components/repos/RepoActions";
import { HealthPanel } from "@/components/staff/HealthPanel";
import { ActivityFeed } from "@/components/staff/ActivityFeed";
import { DiscordSettings } from "@/components/staff/DiscordSettings";
import { getDictionary } from "@/lib/i18n/dictionary";
import { fill } from "@/lib/i18n/format";
import { LOCALES } from "@/lib/i18n/locales";
import type { RepoSummary } from "@/lib/repo-types";
import type { ActivityResponse, StaffSettingsResponse } from "@/lib/staff-types";

function escaped(s: string) {
  return s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#x27;" }[c] ?? c));
}

const fork = {
  full_name: "octo/demo", name: "demo", owner: "octo", private: true, archived: false, fork: true,
  default_branch: "main", pushed_at: null, updated_at: null, size: 0, description: null, language: null,
  html_url: "https://github.com/octo/demo", stargazers_count: 0, open_issues_count: 0,
  can: { pull: true, push: true, admin: false },
} satisfies RepoSummary;

describe("textes des états moins fréquents", () => {
  it.each(LOCALES)("affiche le secours et le retour localisés en $code", ({ code }) => {
    const copy = getDictionary(code);
    const html = renderToStaticMarkup(createElement(LocaleNavigation, {
      urlLocale: code,
      errorCopy: { ...copy.errorPage, home: copy.notFound.back },
      children: createElement(PageError, { reset: () => {} }),
    }));
    expect(html).toContain('role="alert"');
    expect(html).toContain(escaped(copy.errorPage.title));
    expect(html).toContain(escaped(copy.errorPage.body));
    expect(html).toContain(escaped(copy.errorPage.retry));
    expect(html).toContain(`href="/?lang=${code}"`);
  });

  it.each(LOCALES)("traduit le badge d’un dépôt dérivé en $code sans changer son nom", ({ code }) => {
    const { repos, ui } = getDictionary(code);
    const html = renderToStaticMarkup(createElement(RepoActions, {
      repo: fork, copy: repos, ui, onUpdated: () => {}, onDeleted: () => {},
    }));
    expect(html).toContain(`>${escaped(ui.fork)}</span>`);
    expect(html).toContain('value="demo"');
    expect(html).not.toContain(">fork<");
  });

  it("traduit l’infobulle d’une sonde en échec sans y exposer le diagnostic brut", () => {
    const locale = "ja";
    const t = getDictionary(locale);
    const html = renderToStaticMarkup(createElement(HealthPanel, {
      locale,
      copy: { ...t, archiveLimit: t.importPage.limitBody },
      pings: [{ id: 1, ok: false, latencyMs: 13, status: 503, error: "fixture provider details", createdAt: 0 }],
      uptime: { total: 1, ok: 0, uptimePct: 0, avgLatencyMs: null },
      configView: {
        appUrl: "https://repodrop.test", jobsDir: "/tmp/jobs", maxUploadBytes: 1024, maxExtractBytes: 2048,
        maxFiles: 10, pushesPerHour: 2, uploadsPerHour: 10, devAuth: false, sessionSecretSet: true,
        staffLogins: ["octo"], nodeVersion: "v22",
      },
    }));
    expect(html).toContain(`title="${escaped(fill(t.ui.httpError, { status: 503 }))}"`);
    expect(html).not.toContain("fixture provider details");
  });

  it("affiche l’état du moniteur en japonais et garde le diagnostic dans un volet fermé", () => {
    const locale = "ja";
    const copy = getDictionary(locale);
    const probeUrl = "https://repodrop.test/api/health";
    const diagnostic = "fixture provider details";
    const initial: StaffSettingsResponse = {
      staffConfigured: true, persistentSecrets: true,
      settings: { enabled: true, tokenSet: true, tokenKind: "bot", tokenMasked: "••••",
        channelId: "123", intervalMin: 10, heartbeat: true, notifyPush: false, alertOnDown: true, probeUrl, roleMention: "" },
      status: { enabled: true, configured: true, mode: "bot", running: true, probeUrl, intervalMin: 10,
        startedAt: null, lastRunAt: null, nextRunAt: null, lastOk: false, lastLatencyMs: null,
        consecutiveFailures: 1, messagesSent: 0, lastError: diagnostic,
        uptime24h: { total: 1, ok: 0, uptimePct: 0, avgLatencyMs: null },
        bot: { connected: true, user: "test-bot", latencyMs: 13, reconnects: 0, lastError: null } },
    };
    const html = renderToStaticMarkup(createElement(DiscordSettings, { locale, initial, copy }));
    expect(html).toContain(escaped(copy.discord.gatewayConnected));
    expect(html).toContain(escaped(copy.discord.monitorIssue));
    expect(html).toContain(escaped(copy.discord.unreachable));
    expect(html).toContain(escaped(copy.staff.diagnostics));
    const details = html.match(/<details([^>]*)>([\s\S]*?)<\/details>/)?.slice(1) ?? [];
    expect(details[0]).not.toMatch(/\bopen=/);
    expect(details[1]).toContain(diagnostic);
  });

  it("nomme les réglages Discord modifiés dans la langue du journal", () => {
    const locale = "ar";
    const t = getDictionary(locale);
    const initial: ActivityResponse = {
      generatedAt: 0,
      events: [{ id: 1, login: "octo", ip: null, kind: "settings", detail: { changed: ["channelId", "notifyPush", "futureField"] }, createdAt: 0 }],
      total: 1,
      stats: { totalJobs: 0, totalPushes: 0, failedPushes: 0, pushes24h: 0, users24h: 0, lastPushAt: null },
      logins: [], pings: [], uptime: { total: 0, ok: 0, uptimePct: null, avgLatencyMs: null },
      page: { limit: 25, offset: 0 },
    };
    const html = renderToStaticMarkup(createElement(ActivityFeed, {
      locale, initial, copy: { ...t, refreshLabel: t.repos.refresh, lastPush: t.repos.lastPush, repoCreated: t.job.doneCreated },
    }));
    expect(html).toContain(escaped(t.discord.channelId));
    expect(html).toContain(escaped(t.discord.notifyPush));
    expect(html).not.toMatch(/channelId|notifyPush|futureField/);
  });
});
