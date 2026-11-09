"use client";

/**
 * Modale « votre fichier est prêt, connectez GitHub ».
 *
 * Rôle : c'est le **point de bascule** de la démo interactive. Le visiteur a
 * déposé un `.zip`, l'archive a été indexée **dans son navigateur** ; pour
 * la pousser, il faut un compte GitHub. On ne peut donc pas pousser : on
 * invite à se connecter, sans jamais donner l'illusion que l'archive est
 * partie.
 *
 * Accessibilité : rôle `dialog` + `aria-modal`, focus posé sur l'action
 * principale à l'ouverture, Échap ferme, clic sur le fond ferme, le focus
 * revient à l'élément déclencheur (géré par l'appelant).
 */
import { useEffect, useRef } from "react";
import Link from "next/link";
import { ShieldCheck } from "lucide-react";
import { GitHubIcon } from "@/components/Brand";
import { buttonVariants } from "@/components/ui/button";

export interface ConnectModalProps {
  title: string;
  body: string;
  note: string;
  cta: string;
  later: string;
  /** Destination de l'action principale (page de connexion GitHub). */
  href: string;
  onClose: () => void;
}

export function ConnectModal({
  title,
  body,
  note,
  cta,
  later,
  href,
  onClose,
}: ConnectModalProps) {
  const ctaRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      e.preventDefault();
      onClose();
    };

    document.addEventListener("keydown", onKeyDown);
    // Le fond ne doit pas défiler pendant que la modale est ouverte.
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    ctaRef.current?.focus();

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="absolute inset-0 bg-ink/85 backdrop-blur-sm" aria-hidden="true" />

      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="demo-connect-title"
        className="panel relative w-full max-w-md animate-fade-up p-6 text-center"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-go/60 to-transparent"
        />

        <span className="mx-auto grid h-12 w-12 place-items-center rounded-2xl bg-go/15 text-go ring-1 ring-go/30">
          <ShieldCheck className="h-6 w-6" aria-hidden="true" />
        </span>

        <h3 id="demo-connect-title" className="mt-4 text-lg font-semibold tracking-tight">
          {title}
        </h3>
        <p className="mx-auto mt-2 max-w-sm text-sm leading-relaxed text-mist">{body}</p>

        <div className="mt-5 flex flex-col gap-2.5">
          <Link
            ref={ctaRef}
            href={href}
            className={buttonVariants({ size: "lg" })}
            onClick={onClose}
          >
            <GitHubIcon className="h-4 w-4" />
            {cta}
          </Link>
          <button
            type="button"
            onClick={onClose}
            className="text-xs text-mist underline decoration-edge underline-offset-4 transition-colors hover:text-chalk"
          >
            {later}
          </button>
        </div>

        <p className="mt-4 flex items-start gap-1.5 text-left text-[11px] leading-snug text-mist">
          <ShieldCheck className="mt-px h-3 w-3 shrink-0 text-go/80" aria-hidden="true" />
          <span>{note}</span>
        </p>
      </div>
    </div>
  );
}
