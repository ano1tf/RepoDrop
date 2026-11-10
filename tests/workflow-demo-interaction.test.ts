// @vitest-environment jsdom
/**
 * Tests d'interaction de la démo de la landing (`WorkflowDemo`).
 *
 * Le contrat vérifié ici est **fonctionnel**, pas structurel :
 *
 *   1. déposer un `.zip` réel est accepté ;
 *   2. l'archive est indexée **dans le navigateur** (les noms de fichiers
 *      s'affichent) — aucune requête réseau n'est émise ;
 *   3. une extraction simulée s'anime (barre de progression) ;
 *   4. l'interface bascule dans l'état « prêt à pousser » ;
 *   5. le clic sur « Pousser sur GitHub » ouvre une modale qui invite à
 *      connecter GitHub — et **rien n'est envoyé**.
 */
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { act, createElement } from "react";
import { createRoot, type Root } from "react-dom/client";
import yazl from "yazl";
import { WorkflowDemo } from "@/components/WorkflowDemo";
import { demoCopyFrom } from "@/components/workflow-demo/copy";
import { DICTIONARIES } from "@/lib/i18n/dictionary";

/** React 19 exige ce drapeau pour `act` hors de React Testing Library. */
(globalThis as unknown as { IS_REACT_ACT_ENVIRONMENT: boolean }).IS_REACT_ACT_ENVIRONMENT =
  true;

const COPY = demoCopyFrom(DICTIONARIES.fr.home);

let container: HTMLDivElement;
let root: Root;

/** Construit un vrai ZIP (binaire) pour le test. */
async function makeZipFile(name: string, entries: string[]): Promise<File> {
  const zf = new yazl.ZipFile();
  for (const path of entries) {
    zf.addBuffer(Buffer.from(`contenu de ${path}\n`, "utf8"), path);
  }
  const bytes = await new Promise<Uint8Array>((resolve, reject) => {
    const chunks: Buffer[] = [];
    zf.outputStream.on("data", (c: Buffer) => chunks.push(c));
    zf.outputStream.on("error", reject);
    zf.outputStream.on("end", () =>
      resolve(new Uint8Array(Buffer.concat(chunks))),
    );
    zf.end();
  });
  return new File([bytes.slice().buffer as ArrayBuffer], name, {
    type: "application/zip",
  });
}

/** Simule un dépôt de fichier (jsdom n'implémente pas `DataTransfer`). */
function dropFile(target: Element, file: File) {
  const event = new Event("drop", { bubbles: true, cancelable: true });
  Object.defineProperty(event, "dataTransfer", {
    value: { files: [file], dropEffect: "copy" },
  });
  act(() => {
    target.dispatchEvent(event);
  });
}

/**
 * Laisse les promesses et les timers se résoudre.
 *
 * On procède par **cycles courts** : React ne flush ses effets passifs
 * (`useEffect`) qu'à la fin d'un scope `act`. Un seul `act` de 2,5 s
 * retarderait donc la création de l'intervalle de progression jusqu'au bout,
 * et la barre resterait bloquée à 0 %.
 */
async function flush(totalMs = 0) {
  const step = 25;
  const cycles = Math.max(1, Math.ceil(totalMs / step));
  for (let i = 0; i < cycles; i++) {
    await act(async () => {
      await new Promise((r) => setTimeout(r, step));
    });
  }
}

/**
 * jsdom n'implémente pas `matchMedia`, dont GSAP/ScrollTrigger a besoin dès
 * son enregistrement. On fournit une implémentation minimale.
 */
function stubMatchMedia() {
  window.matchMedia = ((query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addEventListener: () => {},
    removeEventListener: () => {},
    addListener: () => {},
    removeListener: () => {},
    dispatchEvent: () => false,
  })) as unknown as typeof window.matchMedia;
}

beforeEach(() => {
  stubMatchMedia();
  container = document.createElement("div");
  document.body.appendChild(container);
  root = createRoot(container);
  act(() => {
    root.render(createElement(WorkflowDemo, { copy: COPY, locale: "fr" }));
  });
});

afterEach(() => {
  act(() => root.unmount());
  container.remove();
  vi.restoreAllMocks();
});

describe("démo interactive de la landing", () => {
  it("accepte un .zip déposé, l'indexe localement et atteint l'état « prêt »", async () => {
    const card = container.querySelector('[data-wd="archive-card"]');
    expect(card, "zone de dépôt absente").not.toBeNull();

    // Aucun appel réseau : l'archive ne doit jamais quitter le navigateur.
    const fetchSpy = vi.spyOn(globalThis, "fetch");

    const file = await makeZipFile("mon-projet.zip", [
      "mon-projet/src/index.ts",
      "mon-projet/package.json",
    ]);
    dropFile(card!, file);

    // 1. L'index est lu : les noms de fichiers apparaissent.
    await flush(50);
    expect(container.textContent).toContain("mon-projet/src/index.ts");
    expect(container.textContent).toContain("mon-projet/package.json");

    // 2. L'extraction simulée s'anime.
    expect(container.querySelector('[role="progressbar"]')).not.toBeNull();

    // 3. L'état final : « Prêt à pousser ».
    await flush(2500);
    expect(container.textContent).toContain(COPY.ready);
    expect(container.textContent).toContain("2");

    // 4. Rien n'a été envoyé.
    expect(fetchSpy).not.toHaveBeenCalled();
  });

  it("ouvre une modale « connectez GitHub » au clic sur « pousser »", async () => {
    const card = container.querySelector('[data-wd="archive-card"]');
    const file = await makeZipFile("demo.zip", ["a.ts"]);
    dropFile(card!, file);
    await flush(2500);

    const pushButton = Array.from(container.querySelectorAll("button")).find((b) =>
      b.textContent?.includes(COPY.pushCta),
    );
    expect(pushButton, "bouton « pousser » absent").toBeTruthy();

    act(() => {
      pushButton!.click();
    });

    // La modale explique la situation et propose de se connecter.
    const dialog = document.querySelector('[role="dialog"]');
    expect(dialog, "modale absente").not.toBeNull();
    expect(dialog!.textContent).toContain(COPY.connectTitle);
    expect(dialog!.textContent).toContain(COPY.connectBody);

    const cta = dialog!.querySelector("a");
    expect(cta?.getAttribute("href")).toBe("/login");
  });

  it("refuse un fichier qui n'est pas un .zip", async () => {
    const card = container.querySelector('[data-wd="archive-card"]');
    const file = new File(["pas une archive"], "photo.png", { type: "image/png" });
    dropFile(card!, file);
    await flush(50);

    const alert = container.querySelector('[role="alert"]');
    expect(alert, "message d'erreur absent").not.toBeNull();
    expect(alert!.textContent).toContain(COPY.dropError);
  });

  it("signale une archive .zip illisible", async () => {
    const card = container.querySelector('[data-wd="archive-card"]');
    const file = new File(["ceci nest pas un zip"], "faux.zip", {
      type: "application/zip",
    });
    dropFile(card!, file);
    await flush(100);

    const alert = container.querySelector('[role="alert"]');
    expect(alert, "message d'erreur absent").not.toBeNull();
    expect(alert!.textContent).toContain(COPY.dropError);
  });
});
