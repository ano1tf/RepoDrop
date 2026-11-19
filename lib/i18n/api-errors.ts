import { config } from "../config";
import { errorCodeOf } from "../errors";
import { json } from "../http";
import { getDictionary } from "./dictionary";
import { fill, formatBytes } from "./format";
import { requestLocale } from "./request";
import type { Dict } from "./types";

export type ApiErrorCode = keyof Dict["errors"];

/** Keep the machine-readable code and translate only the human-facing text.
 * Never send provider diagnostics or Zod's unlocalized messages to the UI. */
export function apiError(
  request: Request,
  code: ApiErrorCode,
  status: number,
  extra?: { retryAfterSec?: number; attemptsLeft?: number },
): Response {
  const locale = requestLocale(request);
  const copy = getDictionary(locale).errors;
  let error = copy[code];
  if (code === "UPLOAD_TOO_BIG") {
    error = fill(error, { max: formatBytes(config.limits.maxUploadBytes, locale) });
  } else if (code === "STAFF_RATE_LIMITED") {
    const minutes = Math.ceil((extra?.retryAfterSec ?? 900) / 60);
    const delay = new Intl.NumberFormat(locale, { style: "unit", unit: "minute" }).format(minutes);
    error = fill(error, { delay });
  }
  return json({ error, code, ...extra }, status, { "Content-Language": locale });
}

export function apiException(request: Request, err: unknown, status: number): Response {
  const code = errorCodeOf(err);
  return apiError(request, code, code === "UNAUTHORIZED" ? 401 : status);
}
