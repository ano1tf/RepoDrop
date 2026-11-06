import type { Metadata } from "next";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Page introuvable",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <main className="mx-auto flex max-w-md flex-col items-center justify-center gap-5 px-4 py-32 text-center">
      <p className="text-6xl font-bold text-gradient">404</p>
      <div>
        <h1 className="text-xl font-semibold">Page introuvable</h1>
        <p className="mt-2 text-sm text-mist">
          Cette page n'existe pas — ou le job a expiré (les archives sont purgées après un
          certain temps).
        </p>
      </div>
      <Link href="/" className={buttonVariants({})}>
        Retour à l'accueil
      </Link>
    </main>
  );
}
