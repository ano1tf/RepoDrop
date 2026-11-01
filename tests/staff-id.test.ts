/**
 * Allowlist staff **insensible aux renommages de compte GitHub**.
 *
 * Cas réel : `STAFF_LOGINS=DimalaxYT` alors que le compte s'appelle désormais
 * `ano1tf`. GitHub ne redirige pas les profils : l'ancien login répond 404 (et
 * devient réclamable). Seul l'**identifiant numérique** est stable — c'est lui
 * qui doit faire foi.
 */
import { describe, expect, it, vi } from "vitest";

async function loadStaff(env: {
  STAFF_LOGINS?: string;
  DEV_AUTH?: string;
}): Promise<typeof import("@/lib/staff")> {
  vi.resetModules();
  delete process.env.STAFF_LOGINS;
  delete process.env.DEV_AUTH;
  for (const [k, v] of Object.entries(env)) {
    if (v !== undefined) process.env[k] = v;
  }
  return import("@/lib/staff");
}

const ANO1TF_ID = 98652864;

describe("STAFF_LOGINS : formes acceptées", () => {
  it("sépare les identifiants numériques des logins", async () => {
    const staff = await loadStaff({ STAFF_LOGINS: `${ANO1TF_ID}, Bob` });
    const { config } = await import("@/lib/config");

    expect(config.staffIds).toEqual([ANO1TF_ID]);
    expect(config.staffLogins).toEqual(["bob"]);
    expect(staff.staffConfigured()).toBe(true);
  });

  it("accepte le propriétaire par son ID, même renommé", async () => {
    const staff = await loadStaff({ STAFF_LOGINS: `${ANO1TF_ID}` });

    // Nouveau pseudo, ancien pseudo, casse indifférente : seul l'ID compte.
    await expect(
      staff.isStaffAccount({ login: "ano1tf", id: ANO1TF_ID }),
    ).resolves.toBe(true);
    await expect(
      staff.isStaffAccount({ login: "DimalaxYT", id: ANO1TF_ID }),
    ).resolves.toBe(true);
    // Un autre compte ne passe pas, même avec un login qui « ressemble ».
    await expect(
      staff.isStaffAccount({ login: "ano1tf", id: 7 }),
    ).resolves.toBe(false);
  });

  it("refuse un ID qui n'est pas dans la liste", async () => {
    const staff = await loadStaff({ STAFF_LOGINS: "42" });
    expect(staff.isStaffLogin("peu-importe", 42)).toBe(true);
    expect(staff.isStaffLogin("peu-importe", 43)).toBe(false);
    // Un ID ne vaut pas un login (et inversement).
    expect(staff.isStaffLogin("42")).toBe(false);
  });

  it("considère la liste comme configurée même si elle ne contient qu'un ID", async () => {
    const staff = await loadStaff({ STAFF_LOGINS: `${ANO1TF_ID}` });
    expect(staff.staffConfigured()).toBe(true);
    expect(staff.isStaffLogin("alice")).toBe(false);
  });

  it("laisse l'ancien login fermé : il appartient désormais à personne", async () => {
    const staff = await loadStaff({ STAFF_LOGINS: `${ANO1TF_ID}` });
    // Ce que l'utilisateur voit avant de mettre à jour son .env.
    expect(staff.isStaffLogin("DimalaxYT", undefined)).toBe(false);
    await expect(staff.isStaffAccount({ login: "DimalaxYT" })).resolves.toBe(false);
  });

  it("ne dépend jamais du réseau", async () => {
    const fetchSpy = vi.spyOn(globalThis, "fetch");
    const staff = await loadStaff({ STAFF_LOGINS: `${ANO1TF_ID}` });
    await staff.isStaffAccount({ login: "ano1tf", id: ANO1TF_ID });
    expect(fetchSpy).not.toHaveBeenCalled();
    fetchSpy.mockRestore();
  });
});
