import { legacyErrorCode } from "../errors";
import type { ActivityEvent } from "../staff-types";
import { getDictionary } from "./dictionary";
import type { Locale } from "./locales";

export function localizeActivity(events: ActivityEvent[], locale: Locale): ActivityEvent[] {
  const { errors } = getDictionary(locale);
  return events.map((event) => {
    const detail = event.detail;
    if (event.kind !== "push" || !detail || typeof detail.error !== "string") return event;
    const code = legacyErrorCode(typeof detail.errorCode === "string" ? detail.errorCode : detail.error);
    return { ...event, detail: { ...detail, error: errors[code ?? "INTERNAL"] } };
  });
}
