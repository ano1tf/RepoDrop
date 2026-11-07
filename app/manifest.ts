import type { MetadataRoute } from "next";
import { buildManifest } from "@/lib/seo";
import { getT } from "@/lib/i18n/server";

/**
 * Manifeste installable (`/manifest.webmanifest`).
 *
 * Nom et description suivent la langue courante (cookie `rd_lang`) : une
 * personne qui installe l'application depuis une interface japonaise voit
 * « RepoDrop » décrit en japonais sur son écran d'accueil. Les icônes, les
 * couleurs et `start_url` ne changent pas — un manifeste par langue n'aurait
 * aucun intérêt et casserait le cache des navigateurs.
 */
export default async function manifest(): Promise<MetadataRoute.Manifest> {
  const { locale, t } = await getT();
  return buildManifest({
    locale,
    name: t.meta.title,
    description: t.meta.description,
  });
}
