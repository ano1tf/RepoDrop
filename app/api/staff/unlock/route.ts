/**
 * /api/staff/unlock — déverrouille (ou reverrouille) le panel staff.
 *
 * Le mot de passe n'est jamais renvoyé ni stocké en clair : il est comparé à
 * une empreinte scrypt (`lib/staff.ts`), et la validation est portée par le
 * cookie de session chiffré (`staffUnlocked`). Elle disparaît donc à la
 * déconnexion et n'est jamais partagée entre comptes.
 *
 * Prérequis : être déjà connecté avec un compte de `STAFF_LOGINS`. Cette route
 * ne donne accès à rien d'autre qu'au claim `staffUnlocked`.
 */
import { z } from "zod";
import { isSecureRequest, json } from "@/lib/http";
import { getSession, setSessionCookie } from "@/lib/session";
import {
  isStaffAccount,
  isStaffPasswordSet,
  recordUnlockFailure,
  resetUnlockAttempts,
  staffConfigured,
  unlockThrottledUntil,
  verifyStaffPassword,
} from "@/lib/staff";
import { logEvent } from "@/lib/db";
import { clientIp } from "@/lib/ratelimit";

import { apiError } from "@/lib/i18n/api-errors";

export const dynamic = "force-dynamic";

const bodySchema = z.object({
  password: z.string().max(200).optional(),
  action: z.enum(["unlock", "lock"]).optional(),
});

/** État du verrou — aucune donnée sensible, seulement des booléens. */
export async function GET(): Promise<Response> {
  const session = await getSession();
  return json({
    authenticated: Boolean(session),
    staff: await isStaffAccount(session),
    staffConfigured: staffConfigured(),
    passwordRequired: await isStaffPasswordSet(),
    unlocked: session?.staffUnlocked === true,
  });
}

export async function POST(req: Request): Promise<Response> {
  const session = await getSession();
  if (!session) return apiError(req, "AUTH_REQUIRED", 401);
  if (!(await isStaffAccount(session))) {
    return apiError(req, "STAFF_DENIED", 403);
  }

  let raw: unknown;
  try {
    raw = await req.json();
  } catch {
    return apiError(req, "INVALID_REQUEST", 400);
  }
  const parsed = bodySchema.safeParse(raw);
  if (!parsed.success) return apiError(req, "INVALID_REQUEST", 400);

  const password = parsed.data.password ?? "";
  const action = parsed.data.action ?? "unlock";
  const secure = isSecureRequest(req);
  const ip = clientIp(req.headers);

  // Verrouillage manuel : on retire le claim, le panel redemande le mot de passe.
  if (action === "lock") {
    await setSessionCookie({ ...session, staffUnlocked: false }, secure);
    logEvent({
      kind: "settings",
      login: session.login,
      ip,
      detail: { scope: "staff.unlock", action: "lock" },
    });
    return json({ ok: true, unlocked: false });
  }

  // Aucun mot de passe configuré : l'allowlist suffit, rien à saisir.
  if (!(await isStaffPasswordSet())) {
    await setSessionCookie({ ...session, staffUnlocked: true }, secure);
    return json({ ok: true, unlocked: true, passwordRequired: false });
  }

  // Anti brute force : 6 essais par IP sur 15 minutes.
  const until = unlockThrottledUntil(ip);
  if (until > 0) {
    const sec = Math.max(1, Math.ceil((until - Date.now()) / 1000));
    return apiError(req, "STAFF_RATE_LIMITED", 429, { retryAfterSec: sec });
  }

  if (!(await verifyStaffPassword(password))) {
    const left = recordUnlockFailure(ip);
    logEvent({
      kind: "settings",
      login: session.login,
      ip,
      detail: { scope: "staff.unlock", ok: false },
    });
    return apiError(req, left > 0 ? "WRONG_PASSWORD" : "STAFF_RATE_LIMITED", 401, { attemptsLeft: left });
  }

  resetUnlockAttempts(ip);
  await setSessionCookie({ ...session, staffUnlocked: true }, secure);
  logEvent({
    kind: "settings",
    login: session.login,
    ip,
    detail: { scope: "staff.unlock", ok: true },
  });
  return json({ ok: true, unlocked: true, passwordRequired: true });
}
