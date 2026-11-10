import { describe, expect, it } from "vitest";
import {
  buildRepoLinks,
  encodePath,
  repoFullName,
} from "@/lib/links";
import type { JobRecord } from "@/lib/types";

type PushOverrides = Partial<NonNullable<JobRecord["push"]>>;
function makePush(overrides: PushOverrides = {}): NonNullable<JobRecord["push"]> {
  return {
    url: "https://github.com/DimalaxYT/mon-projet",
    branch: "main",
    commitSha: "a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0",
    created: false,
    ...overrides,
  };
}

describe("encodePath", () => {
  it("encode chaque segment mais conserve les /", () => {
    expect(encodePath("feat/une-modification")).toBe("feat/une-modification");
    expect(encodePath("feat/a b/c")).toBe("feat/a%20b/c");
    expect(encodePath("import/démo")).toBe("import/d%C3%A9mo");
    expect(encodePath("main")).toBe("main");
  });
});

describe("repoFullName", () => {
  it("utilise fullName si présent", () => {
    expect(repoFullName(makePush({ fullName: "owner/repo" }))).toBe("owner/repo");
  });
  it("dérive fullName depuis l'URL si absent", () => {
    expect(repoFullName(makePush({ url: "https://github.com/owner/repo" }))).toBe(
      "owner/repo",
    );
  });
});

describe("buildRepoLinks", () => {
  it("construit les URLs affichées sur l'écran de succès", () => {
    const l = buildRepoLinks(
      makePush({ fullName: "DimalaxYT/mon-projet", branch: "feat/une-modife" }),
    );
    expect(l.fullName).toBe("DimalaxYT/mon-projet");
    expect(l.repoUrl).toBe("https://github.com/DimalaxYT/mon-projet");
    expect(l.branchUrl).toBe(
      "https://github.com/DimalaxYT/mon-projet/tree/feat/une-modife",
    );
    expect(l.commitUrl).toBe(
      "https://github.com/DimalaxYT/mon-projet/commit/a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0",
    );
  });

  it("n'expose plus les liens « prêts à donner à une IA »", () => {
    // La section a été retirée de l'écran de succès : plus aucun lien
    // Codespaces / vscode.dev / clonage ne doit subsister dans le module.
    const l = buildRepoLinks(makePush());
    expect(Object.keys(l).sort()).toEqual([
      "branchUrl",
      "commitUrl",
      "fullName",
      "repoUrl",
    ]);
  });

  it("gère les branches avec / via encodePath", () => {
    const l = buildRepoLinks(makePush({ branch: "feat/x" }));
    expect(l.branchUrl).toContain("/tree/feat/x");
  });

  it("gère les branches vides", () => {
    const l = buildRepoLinks(makePush({ branch: "" }));
    expect(l.branchUrl).toBe("https://github.com/DimalaxYT/mon-projet/tree/main");
  });

  it("gère l'absence de commit (êtat intermédiaire)", () => {
    const l = buildRepoLinks(makePush({ commitSha: undefined }));
    expect(l.commitUrl).toBeNull();
  });

  it("supporte les URLs avec .git suffixe", () => {
    const l = buildRepoLinks(makePush({ url: "https://github.com/a/b.git" }));
    expect(l.fullName).toBe("a/b");
    expect(l.repoUrl).toBe("https://github.com/a/b");
  });
});
