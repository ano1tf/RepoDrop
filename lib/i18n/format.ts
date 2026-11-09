/**
 * Rendu des gabarits de dictionnaire.
 *
 * Les dictionnaires ne contiennent **pas** de fonctions (elles ne sont pas
 * sérialisables, et un test ne peut pas les comparer clé à clé). À la place,
 * quelques chaînes portent des accolades : `"Envoi… {progress}%"`. Ce module
 * les remplit, en refusant silencieusement de produire un `{placeholder}` visible.
 */

/** Remplace `{clé}` par sa valeur ; les placeholders inconnus restent tels quels. */
export function fill(
  template: string,
  values: Record<string, string | number>,
): string {
  return template.replace(/\{(\w+)\}/g, (match, key: string) => {
    const value = values[key];
    if (value === undefined || value === null) return match;
    return String(value);
  });
}

/** Vrai si le gabarit attend au moins un paramètre. */
export function hasPlaceholders(template: string): boolean {
  return /\{\w+\}/.test(template);
}

/**
 * Liste les placeholders d'un gabarit, triés : `"{a} et {b}"` → `["a", "b"]`.
 * Sert aux tests qui vérifient qu'une traduction conserve les mêmes paramètres
 * que la version française (un `{compteur}` oublié produirait un texte figé).
 */
export function placeholdersOf(template: string): string[] {
  return [...template.matchAll(/\{(\w+)\}/g)]
    .map((m) => m[1] ?? "")
    .sort();
}

/**
 * Chiffres localisés : `12345` → `"12 345"` (fr), `"12,345"` (en), `"12.345"` (de).
 * Utilisé pour les compteurs affichés (nombre de fichiers d'une maquette).
 */
export function formatNumber(value: number, locale: string): string {
  try {
    return new Intl.NumberFormat(locale).format(value);
  } catch {
    return String(value);
  }
}

/**
 * Tailles localisées : `1536` → `"1,5 Mo"` (fr), `"1.5 MB"` (en).
 *
 * `Intl.NumberFormat` en style « unit » fournit à la fois le séparateur
 * décimal et l'unité dans la langue demandée — c'est exactement ce qu'il
 * faut pour une taille de fichier affichée à côté du reste de l'interface.
 */
export function formatBytes(bytes: number, locale: string): string {
  const abs = Math.abs(bytes);
  let value = bytes;
  let unit = "byte";

  if (abs >= 1024) {
    value = bytes / 1024;
    unit = "kilobyte";
    if (abs >= 1024 ** 2) {
      value = bytes / 1024 ** 2;
      unit = "megabyte";
    }
    if (abs >= 1024 ** 3) {
      value = bytes / 1024 ** 3;
      unit = "gigabyte";
    }
    if (abs >= 1024 ** 4) {
      value = bytes / 1024 ** 4;
      unit = "terabyte";
    }
  }

  try {
    return new Intl.NumberFormat(locale, {
      style: "unit",
      unit,
      unitDisplay: "short",
      maximumFractionDigits: Math.abs(value) >= 100 ? 0 : 1,
    }).format(value);
  } catch {
    return `${value.toFixed(1)} ${unit}`;
  }
}
