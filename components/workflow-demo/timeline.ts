/**
 * Chorégraphie GSAP de la démo « archive → dépôt ».
 *
 * ⚠ Ce module est **importé dynamiquement** par `components/WorkflowDemo.tsx`.
 * Il est le seul endroit du site qui charge GSAP : le Webpack de Next en fait un
 * chunk séparé, chargé après l'hydratation. La landing reste donc légère et le
 * reste de l'application ne paie pas la librairie.
 *
 * Principes
 * ---------
 * - **Le balisage est déjà dans son état final** (barres pleines, coches
 *   visibles). Sans JavaScript, ou en `prefers-reduced-motion`, la démo reste
 *   une illustration complète et lisible : aucun contenu ne dépend de GSAP.
 * - **Une seule timeline maîtresse** qui boucle (`repeat: -1`) : chaque cycle
 *   commence par un `set()` qui remet tout à zéro, ce qui garantit un
 *   recommencement propre, sans état résiduel.
 * - **Tout est `transform`/`opacity`/`filter`** : aucun reflow pendant la boucle
 *   (la position du point de liaison passe par `left`, sur un rail isolé).
 * - **Rien ne tourne hors écran** : `ScrollTrigger` met la boucle en pause dès
 *   que la démo sort du viewport, et `visibilitychange` fait de même quand
 *   l'onglet est masqué.
 */
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/** Sélecteurs du balisage, centralisés pour rester lisibles dans la timeline. */
const SEL = {
  panel: '[data-wd="panel"]',
  intro: "[data-wd-intro]",
  step: '[data-wd="step"]',
  halo: '[data-wd="halo"]',
  archive: '[data-wd="archive"]',
  archiveCard: '[data-wd="archive-card"]',
  archiveIcon: '[data-wd="archive-icon"]',
  bar: '[data-wd="bar"]',
  scanLabel: '[data-wd="scan-label"]',
  scanCheck: '[data-wd="scan-check"]',
  line: '[data-wd="line"]',
  lineCheck: '[data-wd="line-check"]',
  rail: '[data-wd="rail"]',
  railFill: '[data-wd="rail-fill"]',
  // Le point lumineux est l'enfant de `comet` : il suit ses déplacements, donc
  // aucune sélection dédiée n'est nécessaire (le hook reste dans le balisage
  // comme point d'ancrage lisible pour de futures variantes).
  comet: '[data-wd="comet"]',
  trail: '[data-wd="trail"]',
  result: '[data-wd="result"]',
  resultCheck: '[data-wd="result-check"]',
  resultShine: '[data-wd="result-shine"]',
} as const;

const pick = <T extends Element>(root: HTMLElement, sel: string) =>
  Array.from(root.querySelectorAll<T>(sel));

/**
 * Monte la démo animée. Renvoie une fonction de nettoyage : GSAP `matchMedia`
 * révoque la timeline, les tweens et les `ScrollTrigger` créés ici.
 *
 * @param root Racine du composant (portée de toutes les sélections).
 */
export function mountWorkflowDemo(root: HTMLElement): () => void {
  const mm = gsap.matchMedia(root);

  /* ---------------------------------------------------- mouvement réduit --
   * On ne coupe pas une animation en plein vol : on affiche l'état final.
   * C'est aussi l'état rendu par le serveur, donc aucun saut visuel. */
  mm.add("(prefers-reduced-motion: reduce)", () => {
    gsap.set(pick<HTMLElement>(root, SEL.halo), { autoAlpha: 0 });
    gsap.set(pick<HTMLElement>(root, SEL.comet), { autoAlpha: 0 });
    gsap.set(pick<HTMLElement>(root, SEL.bar), { scaleY: 1 });
    gsap.set(pick<HTMLElement>(root, SEL.line), { autoAlpha: 1, y: 0 });
    gsap.set(pick<HTMLElement>(root, SEL.lineCheck), { scale: 1 });
    gsap.set(pick<HTMLElement>(root, SEL.scanCheck), { scale: 1, autoAlpha: 1 });
    gsap.set(pick<HTMLElement>(root, SEL.resultCheck), { scale: 1, autoAlpha: 1 });
  });

  mm.add("(prefers-reduced-motion: no-preference)", () => {
    const q = <T extends Element>(sel: string) => pick<T>(root, sel);

    const panel = root.querySelector<HTMLElement>(SEL.panel) ?? root;
    const intro = q<HTMLElement>(SEL.intro);
    const steps = q<HTMLElement>(SEL.step);
    const halos = q<HTMLElement>(SEL.halo);
    const [halo1, halo2, halo3] = halos;
    const archive = q<HTMLElement>(SEL.archive);
    const archiveCard = q<HTMLElement>(SEL.archiveCard);
    const archiveIcon = q<HTMLElement>(SEL.archiveIcon);
    const bars = q<HTMLElement>(SEL.bar);
    const [scanLabel] = q<HTMLElement>(SEL.scanLabel);
    const [scanCheck] = q<HTMLElement>(SEL.scanCheck);
    const lines = q<HTMLElement>(SEL.line);
    const lineChecks = q<HTMLElement>(SEL.lineCheck);
    const railFill = q<HTMLElement>(SEL.railFill);
    const [comet] = q<HTMLElement>(SEL.comet);
    const [trail] = q<HTMLElement>(SEL.trail);
    const [result] = q<HTMLElement>(SEL.result);
    const [resultCheck] = q<HTMLElement>(SEL.resultCheck);
    const [resultShine] = q<HTMLElement>(SEL.resultShine);

    /* ------------------------------------------------------- état de repos --
     * Posé une fois, hors timeline : c'est l'état « statique » de la démo,
     * identique à celui du serveur. La timeline le réinitialise à chaque cycle. */
    gsap.set(halos, { autoAlpha: 0 });
    gsap.set([comet, trail], { autoAlpha: 0 });
    gsap.set(railFill, { scaleX: 0, transformOrigin: "left center" });
    gsap.set(bars, { scaleY: 1, transformOrigin: "bottom center" });
    gsap.set(lineChecks, { scale: 1, transformOrigin: "center" });
    gsap.set([scanCheck, resultCheck], { autoAlpha: 1, scale: 1 });

    /* ------------------------------------------------- axe « flottement » --
     * Le ZIP respire en continu, indépendamment du cycle : c'est ce qui donne
     * l'impression que la carte est vivante même entre deux étapes. */
    const float = gsap.to(archiveIcon, {
      y: -3,
      rotate: -1.5,
      duration: 1.8,
      ease: "sine.inOut",
      yoyo: true,
      repeat: -1,
    });

    /* -------------------------------------------------- timeline principale */
    const loop = gsap.timeline({
      repeat: -1,
      repeatDelay: 1.1,
      paused: true,
      defaults: { ease: "power2.out" },
    });

    loop
      /* ---- remise à zéro (rejouée à chaque cycle) ---------------------- */
      .set(halos, { autoAlpha: 0 })
      .set([comet, trail], { autoAlpha: 0 })
      .set(railFill, { scaleX: 0 })
      .set(bars, { scaleY: 0.14 })
      .set([scanCheck, resultCheck], { scale: 0, autoAlpha: 0 })
      .set([scanLabel], { autoAlpha: 1 })
      .set(lines, { autoAlpha: 0.18, y: 5 })
      .set(lineChecks, { scale: 0 })
      .set(result, { boxShadow: "0 0 0 0 rgba(52,211,153,0)" })
      // La carte est un fichier statique : sa bordure reste neutre, puis
      // s'illumine en vert quand le fichier est pris en charge.
      .set(archiveCard, {
        borderColor: "rgba(35,42,59,0.7)",
        boxShadow: "0 0 0 0 rgba(52,211,153,0)",
      })

      /* ---- 1. le ZIP s'allume et lévite ------------------------------- */
      .to(halo1, { autoAlpha: 1, duration: 0.35 }, 0)
      .to(
        archive,
        { y: -5, duration: 1.1, ease: "sine.inOut", yoyo: true, repeat: 1 },
        0,
      )
      .to(
        archiveCard,
        {
          borderColor: "rgba(52,211,153,0.45)",
          boxShadow: "0 0 24px -8px rgba(52,211,153,0.55)",
          duration: 0.6,
        },
        0,
      )

      /* ---- 2. le colis part vers le dépôt ----------------------------- */
      /* La comète naît sur l'étape 1, traverse le rail, s'éteint sur l'étape 3.
         La traînée est un dégradé qui s'étire derrière elle (scaleX, origine à
         droite) : le « glow trail » ne coûte qu'un transform. */
      .to(
        archiveCard,
        {
          borderColor: "rgba(35,42,59,0.7)",
          boxShadow: "0 0 0 0 rgba(52,211,153,0)",
          duration: 0.5,
        },
        1.35,
      )
      .to(halo1, { autoAlpha: 0.55, duration: 0.4 }, 1.35)
      .to([comet, trail], { autoAlpha: 1, duration: 0.2 }, 1.5)
      .to(trail, { scaleX: 1, duration: 0.9, ease: "power2.out" }, 1.5)
      .to(
        comet,
        { left: "100%", duration: 1.5, ease: "power1.inOut" },
        1.5,
      )
      .to(railFill, { scaleX: 1, duration: 1.6, ease: "power1.inOut" }, 1.5)
      .to([comet, trail], { autoAlpha: 0, duration: 0.35 }, 2.85)
      .to(halo1, { autoAlpha: 0, duration: 0.4 }, 2.9)

      /* ---- 3. extraction : les barres poussent, puis « pop » ----------- */
      .to(halo2, { autoAlpha: 1, duration: 0.3 }, 2.7)
      .to(scanLabel, { autoAlpha: 0.45, duration: 0.3 }, 2.7)
      .to(
        bars,
        { scaleY: 1, duration: 0.5, stagger: 0.035, ease: "power2.out" },
        2.8,
      )
      .to(scanLabel, { autoAlpha: 1, duration: 0.25 }, 3.35)
      .to(
        scanCheck,
        {
          scale: 1,
          autoAlpha: 1,
          duration: 0.55,
          ease: "back.out(3.2)",
        },
        3.4,
      )
      /* le « pop » de validation : léger dépassement, du centre vers l'extérieur */
      .to(
        bars,
        {
          scaleY: 1.14,
          duration: 0.16,
          stagger: { each: 0.018, from: "center" },
          yoyo: true,
          repeat: 1,
          ease: "power1.inOut",
        },
        3.85,
      )
      .to(halo2, { autoAlpha: 0, duration: 0.4 }, 4.15)

      /* ---- 4. le dépôt se remplit, coche par coche -------------------- */
      .to(halo3, { autoAlpha: 1, duration: 0.3 }, 4.05)
      .to(lines, { autoAlpha: 1, y: 0, duration: 0.4, stagger: 0.1 }, 4.0)
      .to(
        lineChecks,
        {
          scale: 1,
          duration: 0.6,
          stagger: 0.12,
          ease: "back.out(2.6)",
        },
        4.1,
      )
      .to(halo3, { autoAlpha: 0, duration: 0.45 }, 5.4)

      /* ---- 5. verdict : le bandeau vert s'allume et brille ------------- */
      .to(
        result,
        {
          boxShadow:
            "0 0 0 1px rgba(52,211,153,0.55), 0 10px 30px -16px rgba(52,211,153,0.95)",
          duration: 0.5,
        },
        5.25,
      )
      .to(
        resultCheck,
        {
          scale: 1,
          autoAlpha: 1,
          duration: 0.75,
          ease: "elastic.out(1, 0.55)",
        },
        5.25,
      )
      .fromTo(
        resultShine,
        { xPercent: -140 },
        { xPercent: 140, duration: 0.95, ease: "power2.inOut" },
        5.35,
      )
      .to(result, { boxShadow: "0 0 0 0 rgba(52,211,153,0)", duration: 0.6 }, 6.6);

    /* ----------------------------------------------------- entrée en scène --
     * Deuxième timeline, jouée une seule fois : le panneau se pose, puis les
     * cartes montent en cascade. La boucle démarre juste après. */
    const entrance = gsap.timeline({
      paused: true,
      defaults: { ease: "power3.out" },
      onComplete: () => loop.play(),
    });

    entrance
      .from(panel, { y: 22, autoAlpha: 0, duration: 0.75 })
      .from(
        intro,
        { y: 12, autoAlpha: 0, duration: 0.6, stagger: 0.07 },
        0.15,
      )
      .from(
        steps,
        { y: 16, autoAlpha: 0, duration: 0.6, stagger: 0.09 },
        0.3,
      )
      .from(result, { y: 10, autoAlpha: 0, duration: 0.5 }, 0.65);

    /* ------------------------------------------------------ mise en veille --
     * Le hero est visible au chargement : on lance l'entrée tout de suite. En
     * revanche, dès que la démo quitte l'écran (ou que l'onglet passe en
     * arrière-plan), tout est mis en pause — pas de CPU brûlé pour personne. */
    let started = false;
    const play = () => {
      if (started) {
        loop.play();
        float.play();
      } else {
        started = true;
        entrance.play();
        float.play();
      }
    };
    const pause = () => {
      loop.pause();
      float.pause();
    };

    play();

    const trigger = ScrollTrigger.create({
      trigger: root,
      start: "top bottom",
      end: "bottom top",
      onEnter: play,
      onEnterBack: play,
      onLeave: pause,
      onLeaveBack: pause,
    });

    const onVisibility = () => {
      if (document.hidden) pause();
      else if (trigger.isActive) play();
    };
    document.addEventListener("visibilitychange", onVisibility);

    /* Nettoyage : `matchMedia` révoque la timeline, les tweens et le trigger
       créé dans ce contexte. */
    return () => {
      document.removeEventListener("visibilitychange", onVisibility);
      trigger.kill();
      float.kill();
      loop.kill();
      entrance.kill();
    };
  });

  return () => mm.revert();
}
