/**
 * GET /api/staff/activity — journal d'activité du panel staff.
 *
 * Répond à « qui a poussé du code, et à quelle heure » : chaque événement
 * `push` porte le login, l'horodatage, le dépôt, la branche, le SHA, le nombre
 * de fichiers et le volume. Filtrable (kind / login / recherche) et paginé.
 */
import { z } from "zod";
import { json } from "@/lib/http";
import { checkStaff } from "@/lib/staff";
import {
  activityStats,
  countEvents,
  listEventLogins,
  listEvents,
  listPings,
  pingStats,
  type EventKind,
} from "@/lib/db";
import { ensureWorkerInit } from "@/lib/jobs";

import { localizeActivity } from "@/lib/i18n/activity-errors";
import { requestLocale } from "@/lib/i18n/request";
import { apiError } from "@/lib/i18n/api-errors";

export const dynamic = "force-dynamic";

const KINDS: EventKind[] = [
  "upload",
  "push",
  "login",
  "logout",
  "settings",
  "discord",
  "system",
];

const querySchema = z.object({
  limit: z.coerce.number().int().min(1).max(200).default(50),
  offset: z.coerce.number().int().min(0).default(0),
  kind: z.enum(KINDS as [EventKind, ...EventKind[]]).optional(),
  login: z.string().trim().max(100).optional(),
  q: z.string().trim().max(120).optional(),
});

export async function GET(req: Request): Promise<Response> {
  ensureWorkerInit();
  const gate = await checkStaff();
  if (!gate.ok) return apiError(req, gate.code, gate.status);

  const url = new URL(req.url);
  const parsed = querySchema.safeParse(Object.fromEntries(url.searchParams));
  if (!parsed.success) {
    return apiError(req, "INVALID_REQUEST", 400);
  }
  const q = parsed.data;
  const filters = {
    kind: q.kind,
    login: q.login || undefined,
    q: q.q || undefined,
  };

  const locale = requestLocale(req);
  return json({
    generatedAt: Date.now(),
    events: localizeActivity(listEvents({ ...filters, limit: q.limit, offset: q.offset }), locale),
    total: countEvents(filters),
    stats: activityStats(),
    logins: listEventLogins(40),
    pings: listPings(60),
    uptime: pingStats(24 * 3_600_000),
    page: { limit: q.limit, offset: q.offset },
  }, 200, { "Content-Language": locale });
}
