/**
 * Formatage localisé utilisable **côté client** (aucune dépendance serveur).
 *
 * Pendant longtemps, `lib/utils.ts` formatait en dur en français
 * (`1,2 Mo`, `il y a 3 min`, `1 234 fichiers`) : le sélecteur de langue
 * changeait les titres mais laissait ces valeurs en français. Ce module les
 * rend dans la langue courante via `Intl` — aucune dépendance, aucun
 * dictionnaire à maintenir pour les unités :
 *
 *   formatBytes(1_500_000, "de")  → « 1,5 MB »
 *   formatBytes(1_500_000, "fr")  → « 1,5 Mo »
 *   timeAgo(t, "ru")              → « 3 минуты назад »
 *
 * Le module est volontairement séparé de `lib/utils.ts` : celui-ci est importé
 * par des modules serveur (worker, routes) qui n'ont pas besoin d'`Intl`, et
 * par des composants client qui n'ont pas besoin du reste.
 */

import { hasPlaceholders, placeholdersOf } from "./format";

/** Locale `Intl` sûre : retombe sur le français si le code est invalide. */
function safeLocale(locale: string): string {
  try {
    // `Intl` lève une RangeError sur un code BCP-47 malformé.
    new Intl.NumberFormat(locale).format(1);
    return locale;
  } catch {
    return "fr";
  }
}

/**
 * Taille lisible : « 1,2 Mo », « 1.2 MB », « 1,2 МБ ».
 *
 * On s'appuie sur `style: "unit"` : l'unité suit les conventions de la langue
 * (Mo/MB/МБ/メガバイト…) sans table de correspondance à maintenir.
 */
export function formatBytes(bytes: number, locale = "fr"): string {
  const l = safeLocale(locale);
  try {
    if (bytes < 1024) {
      return new Intl.NumberFormat(l, {
        style: "unit",
        unit: "byte",
        unitDisplay: "short",
        maximumFractionDigits: 0,
      }).format(bytes);
    }
    const units = ["kilobyte", "megabyte", "gigabyte", "terabyte"] as const;
    let v = bytes / 1024;
    let i = 0;
    while (v >= 1024 && i < units.length - 1) {
      v /= 1024;
      i++;
    }
    return new Intl.NumberFormat(l, {
      style: "unit",
      unit: units[i],
      unitDisplay: "short",
      maximumFractionDigits: 1,
    }).format(v);
  } catch {
    // Environnement sans données d'unités : repli neutre, jamais un crash.
    return `${Math.round(bytes / 1024)} Ko`;
  }
}

/** Nombre localisé (sans unité) : « 1 234 », « 1,234 », « 1.234 ». */
export function formatNumberLocale(value: number, locale = "fr"): string {
  return new Intl.NumberFormat(safeLocale(locale)).format(value);
}

/**
 * Format relatif : « il y a 3 minutes », « 3 minutes ago ».
 * `numeric: "auto"` donne les formes idiomatiques (« hier », « yesterday »).
 */
export function formatRelative(
  value: number,
  unit: Intl.RelativeTimeFormatUnit,
  locale = "fr",
): string {
  const l = safeLocale(locale);
  try {
    return new Intl.RelativeTimeFormat(l, { numeric: "auto" }).format(value, unit);
  } catch {
    return `${value} ${unit}`;
  }
}

/**
 * Remplit un gabarit `{clé}` en **réutilisant** la clé brute si elle manque.
 *
 * `fill` existe déjà dans `format.ts` ; cette variante évite un `undefined`
 * affiché quand une traduction oublie une valeur secondaire (libellé de
 * formulaire, par exemple). Les tests de placeholders garantissent qu'on ne
 * devrait jamais y arriver — c'est un filet, pas une excuse.
 */
export function fillLoose(
  template: string,
  values: Record<string, string | number>,
): string {
  if (!hasPlaceholders(template)) return template;
  return template.replace(/\{(\w+)\}/g, (match, key: string) => {
    const v = values[key];
    return v === undefined || v === null ? match : String(v);
  });
}

/* ------------------------------------------------------------- dates */

const MINUTE = 60_000;
const HOUR = 60 * MINUTE;
const DAY = 24 * HOUR;

/**
 * « il y a 3 minutes », « 3 minutes ago », « 3 minuti fa ».
 *
 * Au-delà d'un mois on bascule sur une date absolue, formatée dans la langue
 * courante (pas de dépendance à une bibliothèque de dates).
 */
export function timeAgo(ts: number, locale = "fr", now = Date.now()): string {
  const diff = Math.max(0, now - ts);
  if (diff < 45_000) return formatRelative(0, "second", locale);
  if (diff < HOUR) return formatRelative(-Math.round(diff / MINUTE), "minute", locale);
  if (diff < DAY) return formatRelative(-Math.round(diff / HOUR), "hour", locale);
  if (diff < 30 * DAY) return formatRelative(-Math.round(diff / DAY), "day", locale);
  return new Date(ts).toLocaleDateString(safeLocale(locale));
}

/** « dans 10 minutes » / « in 10 minutes » — compte à rebours. */
export function timeUntil(ts: number, locale = "fr", now = Date.now()): string {
  const diff = ts - now;
  if (diff <= 0) return formatRelative(0, "second", locale);
  const sec = Math.round(diff / 1000);
  if (sec < 60) return formatRelative(sec, "second", locale);
  const min = Math.round(sec / 60);
  if (min < 60) return formatRelative(min, "minute", locale);
  return formatRelative(Math.round(min / 60), "hour", locale);
}

/** Horodatage complet localisé : « 20 mars 2026 à 14:02:07 » / « Mar 20, 2026… ». */
export function formatDateTime(ts: number, locale = "fr"): string {
  return new Date(ts).toLocaleString(safeLocale(locale), {
    dateStyle: "long",
    timeStyle: "medium",
  });
}

/** Heure seule : « 14:02:07 ». */
export function formatTime(ts: number, locale = "fr"): string {
  return new Date(ts).toLocaleTimeString(safeLocale(locale), {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
}

/** Vrai si un gabarit attend au moins une valeur. */
export { hasPlaceholders, placeholdersOf };
