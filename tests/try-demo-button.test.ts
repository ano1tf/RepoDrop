// @vitest-environment jsdom
/**
 * Test du pont « CTA de la landing → sélecteur de fichiers de la démo ».
 *
 * Le contrat : pour un visiteur anonyme, le bouton « Importer une archive » de
 * la page d'accueil doit ouvrir le **vrai** `<input type="file">` de
 * `WorkflowDemo`, dans la continuité du geste utilisateur (sinon le navigateur
 * bloque le sélecteur). C'est ce qui permet d'essayer le glisser-déposer sans
 * compte, puis de se connecter seulement au moment du push.
 *
 * La chorégraphie GSAP est neutralisée : elle n'a rien à voir avec ce test.
 */
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { act, createElement } from "react";
import { createRoot, type Root } from "react-dom/client";
import { WorkflowDemo } from "@/components/WorkflowDemo";
import { TryDemoButton } from "@/components/workflow-demo/TryDemoButton";
import { demoCopyFrom } from "@/components/workflow-demo/copy";
import { DEMO_ID } from "@/components/workflow-demo/events";
import { DICTIONARIES } from "@/lib/i18n/dictionary";

vi.mock("@/components/WorkflowDemoMotion", () => ({
  WorkflowDemoMotion: () => null,
}));

vi.mock("@/lib/pending-import", () => ({
  savePendingFile: async () => {},
  takePendingFile: async () => null,
}));

(globalThis as unknown as { IS_REACT_ACT_ENVIRONMENT: boolean }).IS_REACT_ACT_ENVIRONMENT =
  true;

const COPY = demoCopyFrom(DICTIONARIES.fr.home);

let container: HTMLDivElement;
let root: Root;
/** Éléments réellement cliqués via `HTMLInputElement.prototype.click`. */
let clicked: HTMLInputElement[];

beforeEach(() => {
  clicked = [];
  vi.spyOn(HTMLInputElement.prototype, "click").mockImplementation(function (
    this: HTMLInputElement,
  ) {
    clicked.push(this);
  });

  container = document.createElement("div");
  document.body.appendChild(container);
  root = createRoot(container);
  act(() => {
    root.render(
      createElement(
        "div",
        null,
        createElement(WorkflowDemo, { copy: COPY, locale: "fr" }),
        createElement(TryDemoButton, { label: COPY.dropCta, className: "btn" }),
      ),
    );
  });
});

afterEach(() => {
  act(() => root.unmount());
  container.remove();
  vi.restoreAllMocks();
});

/** Le CTA de la landing (distinct du bouton interne de la démo). */
function cta(): HTMLButtonElement {
  const el = container.querySelector<HTMLButtonElement>("[data-rd-demo-pick]");
  expect(el, "CTA de la landing absent").not.toBeNull();
  return el as HTMLButtonElement;
}

describe("CTA de la landing (visiteur)", () => {
  it("ouvre le sélecteur de fichiers de la démo", () => {
    expect(clicked).toHaveLength(0);

    act(() => {
      cta().dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });

    expect(clicked).toHaveLength(1);
    const input = clicked[0]!;
    expect(input.type).toBe("file");
    // C'est bien le champ de la démo, pas un autre input de la page.
    expect(input.closest(`#${DEMO_ID}`)).not.toBeNull();
    expect(input.accept).toContain(".zip");
  });

  it("ne navigue pas et n'ouvre aucune modale à ce stade", () => {
    act(() => {
      cta().dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });

    // Aucun dialogue « Connect GitHub » tant que l'utilisateur n'a pas poussé.
    expect(container.querySelector("dialog")).toBeNull();
    expect(container.textContent).not.toContain(COPY.connectTitle);
  });

  it("reste sans effet si la démo n'est pas montée (autre page)", () => {
    act(() => root.unmount());
    const isolated = document.createElement("div");
    document.body.appendChild(isolated);
    root = createRoot(isolated);
    act(() => {
      root.render(createElement(TryDemoButton, { label: COPY.dropCta }));
    });

    const button = isolated.querySelector("[data-rd-demo-pick]") as HTMLButtonElement;
    expect(() =>
      act(() => {
        button.dispatchEvent(new MouseEvent("click", { bubbles: true }));
      }),
    ).not.toThrow();
    expect(clicked).toHaveLength(0);
    isolated.remove();
  });
});
