// @vitest-environment jsdom
/**
 * Tests de la chorégraphie GSAP (`components/workflow-demo/timeline.ts`).
 *
 * On monte le **vrai balisage** de `WorkflowDemo` puis la **vraie timeline** :
 * le but n'est pas de vérifier des nombres, mais que la démo ne vise aucun
 * élément inexistant et qu'elle respecte `prefers-reduced-motion`. Une
 * sélection cassée (`data-wd` renommé d'un côté seulement) produit une animation
 * muette — exactement le genre de panne qu'on ne voit pas en revue de code.
 */
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { DICTIONARIES } from "@/lib/i18n/dictionary";
import { WorkflowDemo } from "@/components/WorkflowDemo";

/** Monte le balisage du composant dans le document de test. */
function mountMarkup() {
  const html = renderToStaticMarkup(
    createElement(WorkflowDemo, { t: DICTIONARIES.fr }),
  );
  document.body.innerHTML = html;
  const root = document.getElementById("workflow-demo");
  if (!root) throw new Error("panneau #workflow-demo absent du rendu");
  return root;
}

/** Force la valeur de `prefers-reduced-motion` avant le chargement du module. */
function stubReducedMotion(reduce: boolean) {
  const listeners = new Set<() => void>();
  const matchMedia = vi.fn((query: string) => {
    const matches = query.includes("no-preference") ? !reduce : reduce;
    return {
      matches,
      media: query,
      onchange: null,
      addEventListener: (_: string, cb: () => void) => listeners.add(cb),
      removeEventListener: (_: string, cb: () => void) => listeners.delete(cb),
      addListener: (cb: () => void) => listeners.add(cb),
      removeListener: (cb: () => void) => listeners.delete(cb),
      dispatchEvent: () => true,
    };
  });
  window.matchMedia = matchMedia as unknown as typeof window.matchMedia;
  return listeners;
}

describe("timeline GSAP de la démo", () => {
  beforeEach(() => {
    vi.resetModules();
  });

  afterEach(() => {
    document.body.innerHTML = "";
    vi.restoreAllMocks();
  });

  it("monte sans viser d'élément manquant et se nettoie proprement", async () => {
    const errors: unknown[] = [];
    vi.spyOn(console, "error").mockImplementation((...args) => errors.push(args));
    vi.spyOn(console, "warn").mockImplementation((...args) => errors.push(args));
    stubReducedMotion(false);
    const root = mountMarkup();

    const { mountWorkflowDemo } = await import("@/components/workflow-demo/timeline");
    const dispose = mountWorkflowDemo(root);

    // GSAP pose ses styles en ligne : preuve que la timeline a bien démarré.
    const bars = root.querySelectorAll<HTMLElement>('[data-wd="bar"]');
    expect(bars.length).toBe(12);
    expect(bars[0]?.getAttribute("style") ?? "").toMatch(/transform|opacity|visibility/);

    // Les tweens en boucle ne doivent pas tourner hors du viewport sans pause :
    // le ScrollTrigger est créé, donc `start`/`end` sont renseignés par GSAP.
    expect(() => dispose()).not.toThrow();
    expect(errors, `GSAP a signalé : ${JSON.stringify(errors)}`).toEqual([]);
  });

  it("fige la démo sur l'état final en `prefers-reduced-motion`", async () => {
    stubReducedMotion(true);
    const root = mountMarkup();

    const { mountWorkflowDemo } = await import("@/components/workflow-demo/timeline");
    const dispose = mountWorkflowDemo(root);

    const bar = root.querySelector<HTMLElement>('[data-wd="bar"]');
    const check = root.querySelector<HTMLElement>('[data-wd="scan-check"]');
    const comet = root.querySelector<HTMLElement>('[data-wd="comet"]');
    const halos = root.querySelectorAll<HTMLElement>('[data-wd="halo"]');
    const resultCheck = root.querySelector<HTMLElement>('[data-wd="result-check"]');

    // Barres pleines, coches visibles, comète et halos éteints : l'état final.
    // Échelle 1 : GSAP omet `scale()` quand la valeur vaut 1, et une barre
    // réduite s'écrirait `scale(0.14)`.
    expect(bar?.style.transform ?? "").not.toMatch(/scale\(0\./);
    expect(resultCheck?.style.opacity ?? "1").toBe("1");
    expect(check?.style.opacity ?? "1").toBe("1");
    expect(comet?.style.opacity).toBe("0");
    for (const halo of halos) expect(halo.style.opacity).toBe("0");

    dispose();
  });

  it("révèle la démo et lance la boucle après le chargement du chunk", async () => {
    stubReducedMotion(false);
    const root = mountMarkup();

    const { mountWorkflowDemo } = await import("@/components/workflow-demo/timeline");
    const dispose = mountWorkflowDemo(root);

    // `root` EST le panneau ([data-wd="panel"]) : l'entrée en scène part de
    // l'opacité 0 posée par GSAP…
    expect(root.style.opacity).toBe("0");
    expect(root.style.visibility).toBe("hidden");

    // … puis, quelques frames plus tard, elle est en cours : l'animation
    // démarre seule, sans interaction ni scroll.
    await new Promise((r) => setTimeout(r, 120));
    expect(Number(root.style.opacity)).toBeGreaterThan(0);

    dispose();
  });
});
