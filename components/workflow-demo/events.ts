/**
 * Événements partagés entre la démo interactive et le reste de la landing.
 *
 * Pourquoi des événements DOM plutôt que des props ou un contexte ?
 * -----------------------------------------------------------------
 * 1. **La chorégraphie** : quand le visiteur dépose une vraie archive,
 *    l'illustration en boucle (archive → comète → extraction → dépôt) raconte
 *    une histoire qui n'est plus celle de l'écran : elle s'arrête. Le passage
 *    de relais se fait par un événement sur le panneau, sans coupler
 *    `WorkflowDemo` (client) et `WorkflowDemoMotion` (client lui aussi).
 * 2. **Le bouton d'appel à l'action de la landing** : pour un visiteur non
 *    connecté, « Importer une archive » ne doit pas l'envoyer sur `/login`
 *    (cul-de-sac) mais ouvrir le sélecteur de fichiers **de la démo**, pour
 *    qu'il essaie le glisser-déposer sans compte. Ce bouton vit dans la page
 *    (Server Component) ; il déclenche donc la même mécanique.
 *
 * `DEMO_ID` est exporté ici pour que l'appelant n'ait pas à connaître
 * l'identifiant du panneau : il passe par `requestDemoPick()`.
 */

/** Id DOM du panneau de la démo (ancre + cible des événements). */
export const DEMO_ID = "workflow-demo";

/** Émis par la démo dès qu'un fichier réel est pris en charge. */
export const DEMO_INTERACT_EVENT = "repodrop:demo-interact";

/**
 * Émis vers la démo pour qu'elle ouvre son `<input type="file">`.
 *
 * Il **doit** être émis de façon synchrone depuis un gestionnaire de clic :
 * les navigateurs n'ouvrent un sélecteur de fichiers que dans la continuité
 * d'un geste utilisateur.
 */
export const DEMO_PICK_EVENT = "repodrop:demo-pick";

/** Demande à la démo d'ouvrir son sélecteur (no-op si elle n'est pas montée). */
export function requestDemoPick(): void {
  if (typeof document === "undefined") return;
  document.getElementById(DEMO_ID)?.dispatchEvent(new CustomEvent(DEMO_PICK_EVENT));
}
