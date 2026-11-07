/**
 * Accès aux dictionnaires — sans dépendance à Next.js, pour rester testable
 * (`tests/i18n.test.ts`) et utilisable depuis n'importe quel fichier.
 */
import type { Dict } from "./types";
import { fr } from "./dictionaries/fr";
import { en } from "./dictionaries/en";
import { es } from "./dictionaries/es";
import { de } from "./dictionaries/de";
import { it } from "./dictionaries/it";
import { pt } from "./dictionaries/pt";
import { nl } from "./dictionaries/nl";
import { pl } from "./dictionaries/pl";
import { ru } from "./dictionaries/ru";
import { uk } from "./dictionaries/uk";
import { tr } from "./dictionaries/tr";
import { ar } from "./dictionaries/ar";
import { hi } from "./dictionaries/hi";
import { zh } from "./dictionaries/zh";
import { ja } from "./dictionaries/ja";
import { ko } from "./dictionaries/ko";
import { DEFAULT_LOCALE, type Locale } from "./locales";

/**
 * Table des dictionnaires.
 *
 * `Record<Locale, Dict>` et non un objet libre : si une langue du catalogue
 * n'a pas de dictionnaire, la compilation échoue ici plutôt que de produire un
 * écran vide en production.
 */
export const DICTIONARIES: Record<Locale, Dict> = {
  fr,
  en,
  es,
  de,
  it,
  pt,
  nl,
  pl,
  ru,
  uk,
  tr,
  ar,
  hi,
  zh,
  ja,
  ko,
};

/** Dictionnaire d'une langue ; repli sur le français si le code est inconnu. */
export function getDictionary(locale: Locale): Dict {
  return DICTIONARIES[locale] ?? DICTIONARIES[DEFAULT_LOCALE];
}

/** Section typée d'un dictionnaire (`dict.home`, `dict.faq`…) avec repli. */
export function section<K extends keyof Dict>(locale: Locale, key: K): Dict[K] {
  return getDictionary(locale)[key];
}
