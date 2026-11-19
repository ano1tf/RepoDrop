import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { GET as login } from "@/app/api/auth/login/route";
import { GET as callback } from "@/app/api/auth/callback/route";

const fake = vi.hoisted(() => ({
  jar: { get: vi.fn(), set: vi.fn(), delete: vi.fn() },
  fetch: vi.fn(),
  getViewer: vi.fn(),
  setSessionCookie: vi.fn(),
}));

vi.mock("next/headers", () => ({ cookies: async () => fake.jar }));
vi.mock("@/lib/config", () => ({
  config: { appUrl: "https://repodrop.test", github: { configured: true, clientId: "fixture", clientSecret: "fixture" } },
}));
vi.mock("@/lib/github", () => ({ getViewer: fake.getViewer }));
vi.mock("@/lib/session", () => ({ setSessionCookie: fake.setSessionCookie }));
vi.mock("@/lib/db", () => ({ logEvent: vi.fn() }));

beforeEach(() => {
  vi.resetAllMocks();
  vi.stubGlobal("fetch", fake.fetch);
});
afterEach(() => vi.unstubAllGlobals());

function returning(state: string, search = "code=fixture-code") {
  return callback(new Request(`https://repodrop.test/api/auth/callback?state=${state}&${search}`));
}

describe("langue lors de l’aller-retour OAuth", () => {
  it("associe la langue explicite à l’état vérifié par le cookie", async () => {
    const response = await login(new Request("https://repodrop.test/api/auth/login?lang=ja"));
    const state = new URL(response.headers.get("location")!).searchParams.get("state");
    expect(state).toMatch(/^[0-9a-f]{32}\.ja$/);
    expect(fake.jar.set).toHaveBeenCalledWith("rd_oauth", state, expect.objectContaining({ httpOnly: true, maxAge: 600 }));
  });

  it.each([["nonce.ar", "/import?lang=ar"], ["nonce", "/import"]])(
    "accepte l’état %s et retrouve la langue après la connexion", async (state, location) => {
      fake.jar.get.mockReturnValue({ value: state });
      fake.fetch.mockResolvedValue(Response.json({ access_token: "fixture-token" }));
      fake.getViewer.mockResolvedValue({ login: "fixture", id: 42, avatar_url: "" });
      const response = await returning(state);
      expect(response.headers.get("location")).toBe(location);
      expect(fake.jar.delete).toHaveBeenCalledWith("rd_oauth");
      expect(fake.setSessionCookie).toHaveBeenCalledWith(expect.objectContaining({ login: "fixture" }), true);
    },
  );

  it("conserve la langue si l’utilisateur annule une autorisation valide", async () => {
    fake.jar.get.mockReturnValue({ value: "nonce.pl" });
    const response = await returning("nonce.pl", "error=access_denied");
    expect(response.headers.get("location")).toBe("/login?error=state&lang=pl");
    expect(fake.fetch).not.toHaveBeenCalled();
  });

  it("n’utilise pas une langue provenant d’un état qui ne correspond pas au cookie", async () => {
    fake.jar.get.mockReturnValue({ value: "nonce.ja" });
    const response = await returning("nonce.ar");
    expect(response.headers.get("location")).toBe("/login?error=state");
    expect(fake.fetch).not.toHaveBeenCalled();
    expect(fake.setSessionCookie).not.toHaveBeenCalled();
  });
});
