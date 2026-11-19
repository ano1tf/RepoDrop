"use client";

import { TriangleAlert } from "lucide-react";
import LocaleLink, { usePageErrorCopy } from "@/components/LocaleLink";
import { Button, buttonVariants } from "@/components/ui/button";

/** Keep the layout's language on recoverable page errors. Do not display
 * framework or provider exception text to the visitor. */
export default function PageError({ reset }: { reset: () => void }) {
  const copy = usePageErrorCopy();
  if (!copy) return null; // This boundary is rendered inside the root layout.

  return (
    <main className="mx-auto flex max-w-lg flex-1 flex-col items-center justify-center gap-4 px-4 py-24 text-center">
      <TriangleAlert className="h-9 w-9 text-amber" aria-hidden="true" />
      <div role="alert">
        <h1 className="text-xl font-semibold">{copy.title}</h1>
        <p className="mt-2 text-sm leading-relaxed text-mist">{copy.body}</p>
      </div>
      <div className="flex flex-wrap justify-center gap-2">
        <Button type="button" onClick={reset}>{copy.retry}</Button>
        <LocaleLink href="/" className={buttonVariants({ variant: "outline" })}>{copy.home}</LocaleLink>
      </div>
    </main>
  );
}
