"use client";

import { useEffect, useRef } from "react";

/**
 * Crochet unique de chargement de la chorégraphie GSAP.
 *
 * Pourquoi ce fichier existe
 * --------------------------
 * `WorkflowDemo` reste un **Server Component** : la landing continue d'être
 * rendue côté serveur et ne bascule pas entièrement en `"use client"`. Seul ce
 * wrapper minuscule est client.
 *
 * Pourquoi pas `useGSAP` de `@gsap/react`
 * ---------------------------------------
 * Le hook est pratique, mais il importe `gsap` **statiquement** : la librairie
 * finit alors dans le bundle initial de la page (≈ 20 kB gzip pour rien, avant
 * même l'hydratation). Ici l'import est dynamique et le hook maison s'appuie sur
 * `useEffect` : GSAP vit entièrement dans le chunk `timeline.ts`, chargé après
 * l'hydratation. Le callback de nettoyage joue le rôle de `contextSafe`.
 *
 * Rien ne casse si le chunk n'arrive pas : le balisage de la démo est déjà dans
 * son état final (voir `WorkflowDemo.tsx`).
 */
export function WorkflowDemoMotion({ targetId }: { targetId: string }) {
  const mounted = useRef(true);

  useEffect(() => {
    mounted.current = true;
    let cleanup: (() => void) | undefined;

    void import("./workflow-demo/timeline").then(({ mountWorkflowDemo }) => {
      const root = document.getElementById(targetId);
      if (!root) return;
      // Le composant a pu être démonté pendant le chargement du chunk.
      if (!mounted.current) return;
      cleanup = mountWorkflowDemo(root);
    });

    return () => {
      mounted.current = false;
      cleanup?.();
    };
  }, [targetId]);

  return null;
}
