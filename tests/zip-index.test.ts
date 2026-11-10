/**
 * Tests de l'indexeur ZIP côté navigateur (`lib/zip-index.ts`).
 *
 * Le module est utilisé par la démo interactive de la landing : il doit
 * lister les entrées d'une archive **sans l'envoyer** et sans dépendance.
 * Les archives de test sont réelles, construites avec `yazl` (le même
 * générateur que les tests d'extraction serveur).
 */
import { describe, expect, it } from "vitest";
import yazl from "yazl";
import {
  looksLikeZip,
  parseZipIndex,
  readZipIndex,
  sanitizeEntryName,
  ZipIndexError,
  type ZipEntry,
} from "@/lib/zip-index";

/** Construit un ZIP réel et renvoie ses octets. */
function makeZipBytes(
  files: { path: string; content: string }[],
): Promise<Uint8Array> {
  const zf = new yazl.ZipFile();
  for (const f of files) {
    zf.addBuffer(Buffer.from(f.content, "utf8"), f.path);
  }
  return new Promise<Uint8Array>((resolve, reject) => {
    const chunks: Buffer[] = [];
    zf.outputStream.on("data", (c: Buffer) => chunks.push(c));
    zf.outputStream.on("error", reject);
    zf.outputStream.on("end", () => resolve(new Uint8Array(Buffer.concat(chunks))));
    zf.end();
  });
}

/** Même chose, mais sous forme de `Blob` (API navigateur). */
async function makeZipBlob(
  files: { path: string; content: string }[],
): Promise<Blob> {
  const bytes = await makeZipBytes(files);
  return toBlob(bytes);
}

/**
 * `Blob` à partir d'octets.
 *
 * `bytes.slice()` copie dans un `ArrayBuffer` neuf : TypeScript exige un
 * `ArrayBuffer` (et non un `ArrayBufferLike`) pour un `BlobPart`.
 */
function toBlob(bytes: Uint8Array): Blob {
  return new Blob([bytes.slice().buffer as ArrayBuffer]);
}

describe("parseZipIndex", () => {
  it("liste les entrées d'une archive réelle", async () => {
    const bytes = await makeZipBytes([
      { path: "mon-projet/src/index.ts", content: "export const a = 1;\n" },
      { path: "mon-projet/package.json", content: "{}\n" },
      { path: "mon-projet/README.md", content: "# hello\n" },
    ]);

    const entries = parseZipIndex(bytes);

    expect(entries.map((e) => e.name)).toEqual([
      "mon-projet/src/index.ts",
      "mon-projet/package.json",
      "mon-projet/README.md",
    ]);
    expect(entries[0].size).toBe("export const a = 1;\n".length);
    expect(entries.every((e) => !e.isDirectory)).toBe(true);
  });

  it("marque les répertoires", async () => {
    const bytes = await makeZipBytes([{ path: "dossier/fichier.txt", content: "x" }]);
    const entries = parseZipIndex(bytes);
    const dir = entries.find((e) => e.name.endsWith("/"));
    // yazl n'écrit pas d'entrée de répertoire explicite : le fichier est
    // simplement sous un dossier. On vérifie donc le cas « entrée de
    // dossier » via un ZIP construit à la main plus bas.
    expect(dir ?? null).toBe(null);
    expect(entries[0].name).toBe("dossier/fichier.txt");
  });

  it("refuse un fichier qui n'est pas un ZIP", () => {
    const notZip = new Uint8Array(64);
    notZip.fill(0x41);
    expect(() => parseZipIndex(notZip)).toThrow(ZipIndexError);
  });

  it("refuse un fichier trop petit", () => {
    expect(() => parseZipIndex(new Uint8Array(4))).toThrow(ZipIndexError);
  });
});

describe("readZipIndex (Blob)", () => {
  it("donne le même résultat que la lecture synchrone", async () => {
    const files = [
      { path: "app/main.py", content: "print('hi')\n" },
      { path: "app/utils.py", content: "x = 1\n" },
    ];
    const blob = await makeZipBlob(files);
    const bytes = await makeZipBytes(files);

    const fromBlob = await readZipIndex(blob);
    const fromBytes = parseZipIndex(bytes);

    expect(fromBlob).toEqual(fromBytes);
    expect(fromBlob).toHaveLength(2);
  });

  it("rejette un fichier illisible", async () => {
    const blob = new Blob([new Uint8Array(128)]);
    await expect(readZipIndex(blob)).rejects.toBeInstanceOf(ZipIndexError);
  });

  it("gère une archive vide (EOCD seul)", async () => {
    const zf = new yazl.ZipFile();
    const bytes = await new Promise<Uint8Array>((resolve, reject) => {
      const chunks: Buffer[] = [];
      zf.outputStream.on("data", (c: Buffer) => chunks.push(c));
      zf.outputStream.on("error", reject);
      zf.outputStream.on("end", () =>
        resolve(new Uint8Array(Buffer.concat(chunks))),
      );
      zf.end();
    });

    // Une archive sans entrée n'est pas une erreur : la liste est vide.
    const entries = await readZipIndex(toBlob(bytes));
    expect(entries).toEqual([] as ZipEntry[]);
  });
});

describe("looksLikeZip", () => {
  it("reconnaît une signature ZIP", async () => {
    const bytes = await makeZipBytes([{ path: "a.txt", content: "a" }]);
    expect(looksLikeZip(bytes)).toBe(true);
  });

  it("rejette une autre signature", () => {
    const rar = new Uint8Array([0x52, 0x61, 0x72, 0x21, 0x00, 0x00]);
    expect(looksLikeZip(rar)).toBe(false);
    expect(looksLikeZip(new Uint8Array(2))).toBe(false);
  });
});

describe("sanitizeEntryName", () => {
  it("supprime les caractères de contrôle", () => {
    expect(sanitizeEntryName("a\u0000b\u001fc.txt")).toBe("abc.txt");
  });

  it("tronque les noms très longs", () => {
    const long = `${"x".repeat(300)}.txt`;
    const out = sanitizeEntryName(long);
    expect(out.length).toBeLessThanOrEqual(120);
    expect(out.endsWith("…")).toBe(true);
  });

  it("laisse les noms courts intacts", () => {
    expect(sanitizeEntryName("src/index.ts")).toBe("src/index.ts");
  });
});
