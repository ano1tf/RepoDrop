import type { MetadataRoute } from "next";
import { headers } from "next/headers";
import { buildSitemap, resolveSiteUrl } from "@/lib/seo";

/**
 * Rendu dynamique à la requête : en Docker (`Dockerfile`), `APP_URL` est fourni
 * au démarrage du conteneur (`next start`) et non lors de `next build`.
 * Figer `/sitemap.xml` à la compilation y écrirait `http://localhost:3000`.
 */
export const dynamic = "force-dynamic";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = resolveSiteUrl({ headers: await headers() });
  return buildSitemap(baseUrl);
}
