/**
 * /api/staff/discord — pilotage du bot depuis le panel staff.
 *
 * GET  : état du moniteur (connecté ? dernière sonde ? prochaine exécution ?)
 * POST : { action } →
 *   "test"      valide le jeton (+ le canal) auprès de l'API Discord
 *   "send"      envoie un message de test dans le canal configuré
 *   "ping"      déclenche un ping tout de suite (sonde + message)
 *   "start"     démarre le moniteur
 *   "stop"      l'arrête
 */
import { z } from "zod";
import { json } from "@/lib/http";
import { checkStaff } from "@/lib/staff";
import { clientIp } from "@/lib/ratelimit";
import { logEvent } from "@/lib/db";
import { getDiscordSettings, isWebhookUrl } from "@/lib/settings";
import {
  fetchBotUser,
  fetchChannel,
  DiscordApiError,
} from "@/lib/discord/client";
import {
  getMonitorStatus,
  restartMonitor,
  runTick,
  sendTestMessage,
  stopMonitor,
} from "@/lib/discord/monitor";
import { ensureWorkerInit } from "@/lib/jobs";

import { getDictionary } from "@/lib/i18n/dictionary";
import { requestLocale } from "@/lib/i18n/request";
import { apiError } from "@/lib/i18n/api-errors";

export const dynamic = "force-dynamic";

const bodySchema = z.object({
  action: z.enum(["test", "send", "ping", "start", "stop"]),
});

export async function GET(req: Request): Promise<Response> {
  ensureWorkerInit();
  const gate = await checkStaff();
  if (!gate.ok) return apiError(req, gate.code, gate.status);
  return json({ status: getMonitorStatus() });
}

export async function POST(req: Request): Promise<Response> {
  ensureWorkerInit();
  const gate = await checkStaff();
  if (!gate.ok) return apiError(req, gate.code, gate.status);

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return apiError(req, "INVALID_REQUEST", 400);
  }
  const parsed = bodySchema.safeParse(body);
  if (!parsed.success) return apiError(req, "INVALID_REQUEST", 400);
  const { action } = parsed.data;
  const locale = requestLocale(req);
  const copy = getDictionary(locale);

  const settings = getDiscordSettings();

  try {
    switch (action) {
      /* ---------------------------------------------------- valider le jeton */
      case "test": {
        if (!settings.token) {
          return apiError(req, "DISCORD_UNCONFIGURED", 400);
        }
        if (isWebhookUrl(settings.token)) {
          // Un webhook ne se « valide » qu'en écrivant : on laisse le bouton
          // « Envoyer un message de test » faire le travail.
          return json({
            ok: true,
            mode: "webhook",
            message: copy.discord.testWebhook,
            status: getMonitorStatus(),
          }, 200, { "Content-Language": locale });
        }
        const me = await fetchBotUser(settings.token);
        const channel = settings.channelId
          ? await fetchChannel(settings.token, settings.channelId)
          : null;
        logEvent({
          kind: "discord",
          login: gate.session.login,
          ip: clientIp(req.headers),
          detail: { action: "test", ok: true, bot: me.username },
        });
        return json({
          ok: true,
          mode: "bot",
          bot: me,
          channel,
          status: getMonitorStatus(),
        });
      }

      /* ------------------------------------------------ message de test */
      case "send": {
        await sendTestMessage(gate.session.login);
        logEvent({
          kind: "discord",
          login: gate.session.login,
          ip: clientIp(req.headers),
          detail: { action: "send-test", ok: true },
        });
        return json({ ok: true, status: getMonitorStatus() });
      }

      /* ------------------------------------------------------- ping immédiat */
      case "ping": {
        const outcome = await runTick({ silent: false, force: true });
        logEvent({
          kind: "discord",
          login: gate.session.login,
          ip: clientIp(req.headers),
          detail: {
            action: "ping-now",
            ok: outcome.probe.ok,
            sent: outcome.sent,
            latencyMs: outcome.probe.latencyMs,
          },
        });
        return json({
          ok: outcome.probe.ok,
          probe: outcome.probe,
          sent: outcome.sent,
          error: outcome.error ? copy.errors.DISCORD_FAILED : null,
          status: getMonitorStatus(),
        }, 200, { "Content-Language": locale });
      }

      /* ---------------------------------------------------------- démarrage */
      case "start": {
        const status = restartMonitor();
        logEvent({
          kind: "discord",
          login: gate.session.login,
          ip: clientIp(req.headers),
          detail: { action: "start", running: status.running },
        });
        return json({ ok: status.running, status });
      }

      /* --------------------------------------------------------------- arrêt */
      case "stop": {
        const status = stopMonitor();
        logEvent({
          kind: "discord",
          login: gate.session.login,
          ip: clientIp(req.headers),
          detail: { action: "stop" },
        });
        return json({ ok: true, status });
      }
    }
  } catch (e) {
    const message =
      e instanceof DiscordApiError
        ? e.message
        : e instanceof Error
          ? e.message
          : "Erreur inattendue.";
    logEvent({
      kind: "discord",
      login: gate.session.login,
      ip: clientIp(req.headers),
      detail: { action, ok: false, error: message.slice(0, 300) },
    });
    const status = e instanceof DiscordApiError && e.status === 401 ? 401 : 502;
    return apiError(req, "DISCORD_FAILED", status);
  }

  return apiError(req, "INVALID_REQUEST", 400);
}
