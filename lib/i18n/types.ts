import type { fr } from "./dictionaries/fr";

/**
 * Forme d'un dictionnaire.
 *
 * `DeepStringify` transforme les littéraux (`"Connexion"`) en `string` : un
 * dictionnaire traduit n'a pas à répéter la valeur française, il doit
 * seulement fournir **toutes** les clés, au bon endroit, avec des chaînes.
 * L'ajout d'une clé dans `fr` casse donc la compilation des autres langues.
 */
type DeepStringify<T> = {
  [K in keyof T]: T[K] extends string ? string : DeepStringify<T[K]>;
};

export type Dict = DeepStringify<typeof fr>;

export type DictSection = keyof Dict;
