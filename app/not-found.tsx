import type { Metadata } from "next";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { getT } from "@/lib/i18n/server";

export const metadata: Metadata = {
  robots: { index: false, follow: true },
};

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
