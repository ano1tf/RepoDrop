"use client";

/**
 * CTA principal de la landing **pour un visiteur non connecté**.
 *
 * Comportement (et pourquoi)
 * --------------------------
 * Un visiteur anonyme qui clique « Importer une archive » n'est pas envoyé sur
 * `/login` : ce serait un cul-de-sac, alors que toute la page est justement
 * construite pour qu'il essaie **avant** de donner un compte. Le clic :
 *
 *   1. amène la démo à l'écran (`scrollIntoView`) — si le sélecteur est annulé,
 *      le visiteur voit l'illustration et comprend où déposer son archive ;
 *   2. demande à la démo d'ouvrir son propre `<input type="file">`.
 *
 * Le dépôt reste purement local (seul l'index du `.zip` est lu) ; c'est le
 * bouton « Pousser sur GitHub » de la démo qui ouvre la modale « Connect GitHub ».
 * L'authentification n'arrive donc qu'au moment où elle a un sens.
 *
 * Pour un visiteur **connecté**, la landing n'utilise pas ce composant : elle
 * rend directement un `<Link href="/import">` (aucun JavaScript requis).
 *
 * Contrainte technique : `requestDemoPick()` doit être appelé **de façon
 * synchrone** dans le gestionnaire de clic — sinon le navigateur bloque
 * l'ouverture du sélecteur (perte du geste utilisateur).
 */
import { ArrowRight, FolderArchive } from "lucide-react";
import { DEMO_ID, requestDemoPick } from "./events";

export function TryDemoButton({
  label,
  className,
}: {
  /** Libellé du bouton (dictionnaire de la langue courante). */
  label: string;
  /** Classes du bouton (le style vient de `buttonVariants` côté serveur). */
  className?: string;
}) {
  return (
    <button
      type="button"
      // Marqueur de test : distingue ce CTA du bouton interne de la démo
      // (mêmes libellés, comportements différents).
      data-rd-demo-pick=""
      onClick={() => {
        // Le panneau peut être plus bas dans la page : on l'amène à l'écran
        // avant d'ouvrir le sélecteur (les deux appels sont synchrones).
        const panel = document.getElementById(DEMO_ID);
        // `scrollIntoView` est absent de certains environnements (jsdom,
        // vieilles webviews) : son absence ne doit pas empêcher d'ouvrir le
        // sélecteur.
        panel?.scrollIntoView?.({ behavior: "smooth", block: "center" });
        requestDemoPick();
      }}
      className={className}
    >
      <FolderArchive className="h-4 w-4" />
      {label}
      <ArrowRight className="h-4 w-4 rtl:rotate-180" />
    </button>
  );
}
