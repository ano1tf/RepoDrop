// @vitest-environment jsdom
/**
 * Tests des garde-fous de dépôt (`Uploader` et `WorkflowDemo`).
 *
 * Trois règles, nées du même incident : une archive refusée par le serveur ne
 * doit jamais coûter un transfert complet ni laisser un fichier « en attente »
 * que `/import` relancerait en boucle.
 *
 *   1. `Uploader` refuse **localement** un fichier trop lourd : aucun XHR,
 *      message immédiat.
 *   2. `Uploader` peut **annuler** un envoi en cours (bouton « Annuler ») :
 *      le XHR est interrompu et la zone de dépôt revient.
 *   3. `WorkflowDemo` ne range une archive dans IndexedDB qu'après une lecture
 *      d'index réussie, et seulement si elle respecte la limite de poids.
 */
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { act, createElement } from "react";
import { createRoot, type Root } from "react-dom/client";
import yazl from "yazl";
import { Uploader } from "@/components/Uploader";
import { WorkflowDemo } from "@/components/WorkflowDemo";
import { demoCopyFrom } from "@/components/workflow-demo/copy";
import { DICTIONARIES } from "@/lib/i18n/dictionary";
import { formatBytes } from "@/lib/i18n/format";

/** Relais IndexedDB : espionné (et sans effet) dans ces tests. */
const pending = vi.hoisted(() => ({
  savePendingFile: vi.fn(async (_file: File) => {}),
  takePendingFile: vi.fn(async () => null as File | null),
}));

vi.mock("@/lib/pending-import", () => ({
  savePendingFile: pending.savePendingFile,
  takePendingFile: pending.takePendingFile,
}));

vi.mock("next/navigation", () => ({
  useRouter: () => ({ push: () => {}, replace: () => {}, refresh: () => {} }),
}));

/**
 * Chorégraphie GSAP neutralisée : elle n'est pas testée ici, et son import
 * dynamique (`components/workflow-demo/timeline`) peut se résoudre **après**
 * le démontage du test — jsdom est alors détruit et `document` n'existe plus
 * (« ReferenceError: document is not defined », vu en CI). Un test des
 * garde-fous d'upload n'a aucune raison de dépendre de cette course.
 */
vi.mock("@/components/WorkflowDemoMotion", () => ({
  WorkflowDemoMotion: () => null,
}));

(globalThis as unknown as { IS_REACT_ACT_ENVIRONMENT: boolean }).IS_REACT_ACT_ENVIRONMENT =
  true;

/* ------------------------------------------------------------- utilitaires */

let container: HTMLDivElement;
let root: Root;

/**
 * Faux `XMLHttpRequest` : enregistre les instances pour pouvoir déclencher
 * `onprogress` et vérifier `abort()`. Aucune requête réseau n'est émise.
 */
class FakeXHR {
  static instances: FakeXHR[] = [];
  static DONE = 4;
  static UNSENT = 0;

  readyState = 0;
  status = 0;
  response: { id?: string; error?: string } | null = null;
  responseType = "";
  upload: {
    onprogress?: (e: { lengthComputable: boolean; loaded: number; total: number }) => void;
  } = {};
  onload: (() => void) | null = null;
  onerror: (() => void) | null = null;
  onabort: (() => void) | null = null;
  method = "";
  url = "";
  aborted = false;

  open(method: string, url: string) {
    this.method = method;
    this.url = url;
    this.readyState = 1;
  }

  send() {
    FakeXHR.instances.push(this);
  }

  abort() {
    this.aborted = true;
    this.readyState = FakeXHR.DONE;
    this.onabort?.();
  }
}

/** Laisse les promesses (lecture d'index, effets) se résoudre. */
async function flush(ms = 0) {
  await act(async () => {
    await new Promise((r) => setTimeout(r, ms));
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

/** Fichier dont on force la taille (sans allouer les octets). */
function fileOfSize(name: string, size: number): File {
  const file = new File([new Uint8Array(8)], name, { type: "application/zip" });
  Object.defineProperty(file, "size", { value: size });
  return file;
}

/** Construit un vrai ZIP (index lisible) pour la démo. */
async function makeZipFile(name: string, entries: string[]): Promise<File> {
  const zf = new yazl.ZipFile();
  for (const p of entries) zf.addBuffer(Buffer.from(`contenu de ${p}\n`, "utf8"), p);
  const bytes = await new Promise<Uint8Array>((resolve, reject) => {
    const chunks: Buffer[] = [];
    zf.outputStream.on("data", (c: Buffer) => chunks.push(c));
    zf.outputStream.on("error", reject);
    zf.outputStream.on("end", () => resolve(new Uint8Array(Buffer.concat(chunks))));
    zf.end();
  });
  return new File([bytes.slice().buffer as ArrayBuffer], name, { type: "application/zip" });
}

/** jsdom n'implémente pas `matchMedia`, requis par GSAP au chargement. */
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
  FakeXHR.instances = [];
  pending.savePendingFile.mockClear();
  pending.takePendingFile.mockClear();
  vi.stubGlobal("XMLHttpRequest", FakeXHR);
  container = document.createElement("div");
  document.body.appendChild(container);
  root = createRoot(container);
});

afterEach(() => {
  act(() => root.unmount());
  container.remove();
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
});

/* --------------------------------------------------------------- Uploader */

const MAX_UPLOAD = 200 * 1024 * 1024;

function renderUploader(maxBytes = MAX_UPLOAD) {
  act(() => {
    root.render(
      createElement(Uploader, {
        maxLabel: formatBytes(maxBytes, "fr"),
        extractLabel: "500 Mo",
        maxBytes,
        t: DICTIONARIES.fr.uploader,
      }),
    );
  });
  const zone = container.querySelector('[role="button"]');
  expect(zone, "zone de dépôt absente").not.toBeNull();
  return zone as Element;
}

describe("Uploader — poids maximal", () => {
  it("refuse un fichier trop lourd sans ouvrir de requête", async () => {
    const zone = renderUploader();
    dropFile(zone, fileOfSize("enorme.zip", MAX_UPLOAD + 1));
    await flush();

    expect(FakeXHR.instances).toHaveLength(0);
    expect(container.textContent).toContain("Archive trop volumineuse");
    // La limite annoncée est la vraie, formatée.
    expect(container.textContent).toContain(formatBytes(MAX_UPLOAD, "fr"));
  });

  it("accepte un fichier à la limite exacte", async () => {
    const zone = renderUploader();
    dropFile(zone, fileOfSize("limite.zip", MAX_UPLOAD));
    await flush();

    expect(FakeXHR.instances).toHaveLength(1);
    expect(container.textContent).not.toContain("Archive trop volumineuse");
  });

  it("ne vérifie que la limite fournie (pas de valeur codée en dur)", async () => {
    const small = 1024; // 1 Ko
    const zone = renderUploader(small);
    dropFile(zone, fileOfSize("gros.zip", small + 1));
    await flush();

    expect(FakeXHR.instances).toHaveLength(0);
    expect(container.textContent).toContain(formatBytes(small, "fr"));
  });
});

describe("Uploader — annulation", () => {
  it("affiche « Annuler » pendant l'envoi et interrompt la requête", async () => {
    const zone = renderUploader();
    dropFile(zone, fileOfSize("projet.zip", 1024));
    await flush();

    const xhr = FakeXHR.instances[0];
    expect(xhr, "aucune requête ouverte").toBeTruthy();

    // Progression à 40 % : l'écran d'envoi (et son bouton) apparaît.
    act(() => {
      xhr.upload.onprogress?.({ lengthComputable: true, loaded: 40, total: 100 });
    });
    await flush();
    expect(container.textContent).toContain("40%");

    const cancel = [...container.querySelectorAll("button")].find((b) =>
      b.textContent?.includes(DICTIONARIES.fr.uploader.cancel),
    );
    expect(cancel, "bouton d'annulation absent").toBeTruthy();

    act(() => {
      cancel?.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });
    await flush();

    expect(xhr.aborted).toBe(true);
    // Retour à la zone de dépôt : plus de progression, pas d'erreur affichée.
    expect(container.textContent).not.toContain("40%");
    expect(container.querySelector('[role="alert"]')).toBeNull();
    expect(container.textContent).toContain(DICTIONARIES.fr.uploader.dropHint);
  });

  it("ne montre pas « Annuler » au repos", () => {
    renderUploader();
    const labels = [...container.querySelectorAll("button")].map((b) => b.textContent ?? "");
    expect(labels.some((l) => l.includes(DICTIONARIES.fr.uploader.cancel))).toBe(false);
  });
});

/* ----------------------------------------------------------- WorkflowDemo */

const COPY = demoCopyFrom(DICTIONARIES.fr.home);

function renderDemo(maxBytes?: number) {
  act(() => {
    root.render(createElement(WorkflowDemo, { copy: COPY, locale: "fr", maxBytes }));
  });
  const zone = container.querySelector('[data-wd="archive-card"]');
  expect(zone, "zone de dépôt de la démo absente").not.toBeNull();
  return zone as Element;
}

describe("WorkflowDemo — relais IndexedDB", () => {
  it("ne range pas une archive illisible", async () => {
    const zone = renderDemo();
    const broken = new File(["pas un zip"], "casse.zip", { type: "application/zip" });
    dropFile(zone, broken);
    await flush(20);

    expect(pending.savePendingFile).not.toHaveBeenCalled();
    expect(container.textContent).toContain(COPY.dropError);
  });

  it("ne range pas une archive au-delà de la limite", async () => {
    const zone = renderDemo(1024);
    dropFile(zone, fileOfSize("enorme.zip", 2048));
    await flush();

    expect(pending.savePendingFile).not.toHaveBeenCalled();
    expect(container.textContent).toContain("Archive trop volumineuse");
  });

  it("range l'archive après une lecture d'index réussie", async () => {
    const zip = await makeZipFile("projet.zip", ["index.ts", "src/app.ts"]);
    const zone = renderDemo();
    dropFile(zone, zip);
    await flush(20);

    expect(pending.savePendingFile).toHaveBeenCalledTimes(1);
    expect(pending.savePendingFile.mock.calls[0]?.[0]).toBe(zip);
  });
});
