import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { getT } from "@/lib/i18n/server";

/**
 * Page 404.
 *
 * Contrairement aux autres pages, elle ne déclare **pas** de `metadata` :
 * Next.js ignore les exports de métadonnées d'un `not-found.tsx` (le `<head>`
 * reste celui du layout). Vérifié au `curl` : un `generateMetadata()` ici ne
 * change ni le `<title>` ni les balises `robots` — la 404 étant de toute façon
 * non indexable, seul le contenu visible est traduit, et il l'est bien.
 */
export default async function NotFound() {
  const { t } = await getT();

  return (
    <main className="mx-auto flex max-w-md flex-col items-center justify-center gap-5 px-4 py-32 text-center">
      <p className="text-6xl font-bold text-gradient">404</p>
      <div>
        <h1 className="text-xl font-semibold">{t.notFound.title}</h1>
        <p className="mt-2 text-sm text-mist">{t.notFound.body}</p>
      </div>
      <Link href="/" className={buttonVariants({})}>
        {t.notFound.back}
      </Link>
    </main>
  );
}
