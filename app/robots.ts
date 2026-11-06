import type { MetadataRoute } from "next";
import { headers } from "next/headers";
import { buildRobots, resolveSiteUrl } from "@/lib/seo";

/**
 * Servi sur `GET /robots.txt` (`text/plain`).
 *
 * Généré dynamiquement pour que la directive `Sitemap: <origine>/sitemap.xml`
 * reflète toujours le domaine réel (`APP_URL` en production, ou l'hôte public
 * derrière un proxy en aperçu) au lieu d'un `localhost` statique.
 */
export const dynamic = "force-dynamic";

export default async function robots(): Promise<MetadataRoute.Robots> {
  const baseUrl = resolveSiteUrl({ headers: await headers() });
  return buildRobots(baseUrl);
}
