import { legacyErrorCode } from "../errors";
import type { JobRecord } from "../types";
import { getDictionary } from "./dictionary";
import type { Locale } from "./locales";

/** A job can be revisited in any language. Translate at read time, not at
 * processing time. During rollout old rows can still contain French prose. */
export function localizeJob(job: JobRecord, locale: Locale): JobRecord {
  if (job.status !== "failed") return job;
  const errorCode = job.errorCode ?? legacyErrorCode(job.error) ?? "INTERNAL";
  return { ...job, errorCode, error: getDictionary(locale).errors[errorCode] };
}
