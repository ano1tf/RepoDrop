import { fr } from "./i18n/dictionaries/fr";

const ERROR_CODES = [
  "ENCRYPTED",
  "TOO_MANY_FILES",
  "TOO_BIG",
  "EMPTY",
  "CORRUPT",
  "UNSUPPORTED",
  "VOLUME",
  "UNSAFE_PATHS",
  "PATH_LIMITS",
  "TIMEOUT",
  "RATE_LIMITED",
  "NOT_FOUND",
  "FORBIDDEN",
  "UNAUTHORIZED",
  "REPO_EXISTS",
  "NAME_INVALID",
  "NO_CHANGES",
  "CONFLICT",
  "SCOPE_MISSING",
  "GIT_FAILED",
  "INTERRUPTED",
  "BAD_PATH",
  "CONFIRM_MISMATCH",
  "ARCHIVE_TOO_BIG",
  "INTERNAL",
  "BRANCH_EXISTS",
  "DELETE_SCOPE_MISSING",
] as const;

export type ErrorCode = (typeof ERROR_CODES)[number];

export class AppError extends Error {
  code: ErrorCode;
  detail?: string;

  constructor(code: ErrorCode, message?: string, detail?: string) {
    super(message ?? code);
    this.name = "AppError";
    this.code = code;
    this.detail = detail;
  }
}

export function frMessage(code: ErrorCode): string {
  return fr.errors[code] ?? fr.errors.INTERNAL;
}

export function errorCodeOf(err: unknown): ErrorCode {
  return err instanceof AppError ? err.code : "INTERNAL";
}

export function isUnauthorizedError(message: string | null | undefined): boolean {
  return Boolean(message && (message.includes(frMessage("UNAUTHORIZED")) || /\b401\b/.test(message)));
}

/** Compatibility with pre-i18n job rows. New failures store the code itself.
 * Legacy patterns are only consulted for those rows, never on translated UI text. */
export function legacyErrorCode(value: string | null | undefined): ErrorCode | null {
  if (!value) return null;
  const code = ERROR_CODES.find((candidate) => candidate === value);
  if (code) return code;
  if (isUnauthorizedError(value)) return "UNAUTHORIZED";
  if (/changé entre-temps|non-fast-forward|\[rejected\]|fetch first/i.test(value)) return "CONFLICT";
  if (value.includes("la branche existe déjà")) return "BRANCH_EXISTS";
  return ERROR_CODES.find((candidate) => {
    const text = frMessage(candidate);
    return value === text || value.startsWith(`${text} (`);
  }) ?? null;
}

/** Message FR destiné aux notifications et journaux historiques, avec détail éventuel. */
export function toUserMessage(err: unknown): string {
  if (err instanceof AppError) {
    const base = frMessage(err.code);
    if (err.detail) {
      // Détail fourni par la lib (ex : stderr git) — jamais de token ici,
      // l'auth se fait via GIT_ASKPASS (env), jamais via l'URL ou les args.
      const d = err.detail.replace(/\s+/g, " ").trim().slice(0, 300);
      if (d) return `${base} (${d})`;
    }
    return base;
  }
  return fr.errors.INTERNAL;
}
