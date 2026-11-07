/**
 * Traduction d'une erreur en message utilisateur, dans la langue courante.
 *
 * Le serveur ne transmet jamais de phrase : il transmet `{ code, detail }`
 * (voir `lib/errors.ts`). Ce module est le seul endroit qui transforme ce
 * couple en texte affichable — côté serveur (`getT()` puis `translateError`)
 * comme côté client (dictionnaire passé en prop).
 *
 * `legacy` couvre les jobs enregistrés avant la traduction : un message déjà
 * rédigé en français reste affiché tel quel plutôt que remplacé par un code
 * d'erreur interne incompréhensible.
 */
import { ERROR_KEYS, type ErrorCode, type ErrorPayload } from "../errors";
import type { ApiErrorCode } from "../http";
import type { Dict } from "./types";

/**
 * Code d'erreur API (`ApiErrorCode`) → clé du dictionnaire `api`.
 * Table exhaustive : un nouveau code sans traduction casse la compilation.
 */
export const API_ERROR_KEYS: Record<ApiErrorCode, keyof Dict["api"]> = {
  AUTH_REQUIRED: "authRequired",
  JOB_NOT_FOUND: "jobNotFound",
  JOB_NOT_READY: "jobNotReady",
  JOB_NOT_PUSHABLE: "jobNotPushable",
  INVALID_JSON: "invalidJson",
  INVALID_MULTIPART: "invalidMultipart",
  EMPTY_BODY: "emptyBody",
  EMPTY_ARCHIVE: "emptyArchive",
  UPLOAD_FAILED: "uploadFailed",
  REPO_NAME_REQUIRED: "repoNameRequired",
  BRANCH_NAME_TOO_LONG: "branchNameTooLong",
  INVALID_OPTIONS: "invalidOptions",
  INVALID_CHANGE: "invalidChange",
  NO_CHANGE: "noChange",
  PATH_REQUIRED: "pathRequired",
};

/** Vrai si le code vient des routes API (et non des `ErrorCode` métier). */
export function isApiErrorCode(code: unknown): code is ApiErrorCode {
  return typeof code === "string" && code in API_ERROR_KEYS;
}

/** Message traduit d'un code d'erreur API. */
export function translateApiError(t: ErrorDictionary, code: ApiErrorCode | null | undefined): string {
  return code ? t.api[API_ERROR_KEYS[code]] : t.errors.internal;
}

/** Ce dont `translateError` a besoin : les sections `errors` et `api`. */
export type ErrorDictionary = Pick<Dict, "errors" | "api">;

export type ErrorInput =
  | ErrorPayload
  | { code?: string | null; detail?: string | null; legacy?: string | null }
  | string
  | null
  | undefined;

/**
 * Rend un message traduit.
 *
 *   translateError(t, { code: "TOO_BIG" })            → « Le contenu décompressé… »
 *   translateError(t, { code: "NAME_INVALID", detail: "la branche existe déjà" })
 *                                                       → « … invalide. (la branche…) »
 *   translateError(t, "Archive corrompue.")            → texte hérité, intact
 */
export function translateError(t: ErrorDictionary, input: ErrorInput): string {
  if (!input) return t.errors.internal;

  if (typeof input === "string") {
    return input.trim() || t.errors.internal;
  }

  if (input.legacy) return input.legacy;
  if (!input.code) return t.errors.internal;
  if (isApiErrorCode(input.code)) return translateApiError(t, input.code);

  const key = ERROR_KEYS[input.code as ErrorCode];
  const base = key ? t.errors[key] : t.errors.internal;
  const detail = (input.detail ?? "").trim();
  return detail ? `${base} (${detail})` : base;
}
