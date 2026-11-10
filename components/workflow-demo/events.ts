/**
 * Événements partagés entre la démo interactive et sa chorégraphie GSAP.
 *
 * Quand le visiteur dépose une vraie archive, l'illustration en boucle
 * (archive → comète → extraction → dépôt) raconte une histoire qui n'est
 * plus celle de l'écran : elle s'arrête. Le passage de relais se fait par
 * un événement DOM sur le panneau, ce qui évite de coupler les deux
 * composants (ni par props, ni par contexte).
 */

/** Émis par la démo dès qu'un fichier réel est pris en charge. */
export const DEMO_INTERACT_EVENT = "repodrop:demo-interact";
