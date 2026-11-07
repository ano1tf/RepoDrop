/**
 * Erreurs métier **sans texte** : un `code` et, éventuellement, un `detail`
 * technique (stderr git, nom de dossier fautif…).
 *
 * ---------------------------------------------------------------------------
 * Pourquoi aucun message français ici ?
 * ---------------------------------------------------------------------------
 * Ces erreurs naissent dans le worker (extraction, push) et dans les routes
 * API — deux endroits qui ne connaissent pas la langue de l'utilisateur au
 * moment où elles ont lieu : un push peut échouer trois secondes après une
 * bascule de langue, et une réponse JSON est consommée par un composant client
 * qui, lui, sait quelle langue est affichée.
 *
 * Le serveur renvoie donc `{ code, detail }` :
 *   - `lib/jobs.ts` stocke le code dans le job (`errorCode`) ;
 *   - les routes API renvoient le code (`jsonCodeError`) ;
 *   - l'interface (serveur ou client) traduit via `lib/i18n/errors.ts`.
 *
 * Conséquence concrète : un job en échec change de langue avec l'interface, et
 * un même journal d'activité reste lisible dans les seize langues.
 *
 * `frMessage` / `toUserMessage` restent disponibles pour les rares réponses qui
 * ne peuvent pas passer par l'interface (téléchargement direct d'une archive) ;
 * elles s'appuient sur le dictionnaire français, source de vérité unique.
 */

import { getDictionary } from "./i18n/dictionary";
import { DEFAULT_LOCALE } from "./i18n/locales";
import type { Dict } from "./i18n/types";

export type ErrorCode =
  | "ENCRYPTED"
  | "TOO_MANY_FILES"
  | "TOO_BIG"
  | "EMPTY"
  | "CORRUPT"
  | "UNSUPPORTED"
  | "VOLUME"
  | "UNSAFE_PATHS"
  | "PATH_LIMITS"
  | "TIMEOUT"
  | "RATE_LIMITED"
  | "NOT_FOUND"
  | "FORBIDDEN"
  | "REPO_EXISTS"
  | "NAME_INVALID"
  | "NO_CHANGES"
  | "CONFLICT"
  | "SCOPE_MISSING"
  | "GIT_FAILED"
  | "INTERRUPTED"
  | "BAD_PATH"
  | "CONFIRM_MISMATCH"
  | "ARCHIVE_TOO_BIG"
  | "INTERNAL";

/**
 * Code d'erreur → clé du dictionnaire `errors`.
 *
 * Table exhaustive : ajouter un code à `ErrorCode` sans son entrée ici casse la
 * compilation, et le test `tests/i18n.test.ts` vérifie que chaque clé existe
 * réellement dans les seize dictionnaires.
 */
export const ERROR_KEYS: Record<ErrorCode, keyof Dict["errors"]> = {
  ENCRYPTED: "encrypted",
  TOO_MANY_FILES: "tooManyFiles",
  TOO_BIG: "tooBig",
  EMPTY: "empty",
  CORRUPT: "corrupt",
  UNSUPPORTED: "unsupported",
  VOLUME: "volume",
  UNSAFE_PATHS: "unsafePaths",
  PATH_LIMITS: "pathLimits",
  TIMEOUT: "timeout",
  RATE_LIMITED: "rateLimited",
  NOT_FOUND: "notFound",
  FORBIDDEN: "forbidden",
  REPO_EXISTS: "repoExists",
  NAME_INVALID: "nameInvalid",
  NO_CHANGES: "noChanges",
  CONFLICT: "conflict",
  SCOPE_MISSING: "scopeMissing",
  GIT_FAILED: "gitFailed",
  INTERRUPTED: "interrupted",
  BAD_PATH: "badPath",
  CONFIRM_MISMATCH: "confirmMismatch",
  ARCHIVE_TOO_BIG: "archiveTooBig",
  INTERNAL: "internal",
};

export class AppError extends Error {
  code: ErrorCode;
  detail?: string;

  constructor(code: ErrorCode, message?: string, detail?: string) {
    // `message` n'est qu'un confort de débogage (logs serveur) : jamais affiché.
    super(message ?? code);
    this.name = "AppError";
    this.code = code;
    this.detail = detail;
  }
}

const CODES = new Set<string>(Object.keys(ERROR_KEYS));

/** Vrai si la valeur est un code d'erreur connu. */
export function isErrorCode(value: unknown): value is ErrorCode {
  return typeof value === "string" && CODES.has(value);
}

/**
 * Décode un code lu en base (ou reçu d'une réponse JSON).
 *
 * Une base plus ancienne peut contenir une phrase française complète ; on ne
 * peut pas la retraduire, mais elle reste affichable. Le client la préfixe
 * donc comme un texte brut (`detail`) plutôt que de la perdre.
 */
export function asErrorCode(value: unknown): ErrorCode | null {
  return isErrorCode(value) ? value : null;
}

/**
 * Nettoie un détail technique avant stockage/affichage : une seule ligne,
 * longueur bornée, et jamais de jeton (l'authentification passe par
 * `GIT_ASKPASS`, donc l'URL git ne contient pas de secret — ce nettoyage est
 * une ceinture supplémentaire, pas la seule barrière).
 */
export function cleanDetail(detail: string | undefined): string | undefined {
  if (!detail) return undefined;
  const one = detail.replace(/\s+/g, " ").trim().slice(0, 300);
  return one.length > 0 ? one : undefined;
}

/** Charge utile d'erreur échangée entre serveur et client. */
export interface ErrorPayload {
  /** Code traduisible ; absent pour un message hérité déjà rédigé. */
  code?: ErrorCode;
  /** Contexte technique neutre (nom de dépôt, stderr git…). */
  detail?: string;
  /** Message déjà rédigé (jobs antérieurs à la traduction). */
  legacy?: string;
}

/** Construit la charge utile à partir d'une exception quelconque. */
export function toErrorPayload(err: unknown): ErrorPayload {
  if (err instanceof AppError) {
    return { code: err.code, detail: cleanDetail(err.detail) };
  }
  return { code: "INTERNAL" };
}

/**
 * Message français d'un code.
 *
 * Réservé aux réponses qui ne passent pas par l'interface (téléchargement
 * direct, en-têtes). Le reste du code doit renvoyer le **code**.
 */
export function frMessage(code: ErrorCode): string {
  return getDictionary(DEFAULT_LOCALE).errors[ERROR_KEYS[code] ?? "internal"];
}

/** Message français sûr d'une exception (jamais de détail technique brut seul). */
export function toUserMessage(err: unknown): string {
  if (err instanceof AppError) {
    const base = frMessage(err.code);
    const detail = cleanDetail(err.detail);
    return detail ? `${base} (${detail})` : base;
  }
  return frMessage("INTERNAL");
}
