import { describe, expect, it } from "vitest";
import { AppError, frMessage, legacyErrorCode } from "@/lib/errors";
import { localizeActivity } from "@/lib/i18n/activity-errors";
import { apiError, apiException } from "@/lib/i18n/api-errors";
import { getDictionary } from "@/lib/i18n/dictionary";
import { localizeJob } from "@/lib/i18n/job-errors";
import { LOCALES } from "@/lib/i18n/locales";
import { requestLocale } from "@/lib/i18n/request";
import type { ActivityEvent } from "@/lib/staff-types";
import type { JobRecord } from "@/lib/types";

const legacyConflict = `${frMessage("CONFLICT")} (non-fast-forward)`;

const failedJob: JobRecord = {
  id: "job-1",
  login: "test",
  filename: "archive.zip",
  format: "zip",
  status: "failed",
  error: legacyConflict,
  preview: null,
  pushOpts: null,
  push: null,
  archiveSize: 120,
  createdAt: 1,
  updatedAt: 2,
};

const activity: ActivityEvent = {
  id: 1,
  kind: "push",
  login: "test",
  detail: { ok: false, error: legacyConflict, filename: "archive.zip" },
  ip: null,
  createdAt: 1,
};

describe("langue et codes stables dans les erreurs", () => {
  it("résout URL, cookie normal ou partitionné, Accept-Language puis français", () => {
    const request = (suffix: string, headers: HeadersInit = {}) =>
      new Request(`http://localhost/api/upload${suffix}`, { headers });
    expect(requestLocale(request("?lang=ja", { Cookie: "rd_lang=en; rd_lang_embed=ar" }))).toBe("ja");
    expect(requestLocale(request("?lang=xx", { Cookie: "rd_lang=en; rd_lang_embed=ar" }))).toBe("en");
    expect(requestLocale(request("", { Cookie: "rd_lang_embed=ar" }))).toBe("ar");
    expect(requestLocale(request("", { "Accept-Language": "de-AT,fr;q=0.2" }))).toBe("de");
    expect(requestLocale(request("", { "x-rd-lang": "ja" }))).toBe("fr");
  });

  it.each(LOCALES)("traduit une erreur GitHub sans transmettre ses diagnostics en $code", async ({ code }) => {
    const response = apiException(
      new Request(`http://localhost/api/repos?lang=${code}`),
      new AppError("UNAUTHORIZED", undefined, "provider detail"),
      502,
    );
    expect(response.status).toBe(401);
    expect(response.headers.get("content-language")).toBe(code);
    expect(await response.json()).toEqual({ code: "UNAUTHORIZED", error: getDictionary(code).errors.UNAUTHORIZED });
  });

  it("conserve les métadonnées et remplit les gabarits des quotas et limites", async () => {
    const request = new Request("http://localhost/api/staff/unlock?lang=ar");
    const response = apiError(request, "STAFF_RATE_LIMITED", 429, { retryAfterSec: 60 });
    const quota = await response.json();
    expect(response.status).toBe(429);
    expect(quota).toMatchObject({ code: "STAFF_RATE_LIMITED", retryAfterSec: 60 });
    expect(quota.error).not.toContain("{delay}");
    const size = await apiError(request, "UPLOAD_TOO_BIG", 413).json();
    expect(size.code).toBe("UPLOAD_TOO_BIG");
    expect(size.error).not.toContain("{max}");
  });

  it.each(LOCALES)("retraduit un échec historique à la lecture en $code", ({ code }) => {
    const { errors } = getDictionary(code);
    expect(localizeJob(failedJob, code)).toMatchObject({ errorCode: "CONFLICT", error: errors.CONFLICT });
    expect(localizeJob({ ...failedJob, error: "INTERRUPTED" }, code)).toMatchObject({
      errorCode: "INTERRUPTED", error: errors.INTERRUPTED,
    });
    expect(localizeActivity([activity], code)[0].detail).toEqual({ ...activity.detail, error: errors.CONFLICT });
  });

  it("distingue les erreurs historiques et ignore les détails inconnus", () => {
    expect(legacyErrorCode("GitHub HTTP 401 — jeton refusé")).toBe("UNAUTHORIZED");
    expect(legacyErrorCode(`${frMessage("NAME_INVALID")} (la branche existe déjà)`)).toBe("BRANCH_EXISTS");
    expect(legacyErrorCode("AUTH_REQUIRED")).toBeNull();
    expect(localizeJob({ ...failedJob, error: "provider detail" }, "en").error).toBe(getDictionary("en").errors.INTERNAL);
    expect(failedJob.error).toBe(legacyConflict);
    expect(activity.detail?.error).toBe(legacyConflict);
  });
});
