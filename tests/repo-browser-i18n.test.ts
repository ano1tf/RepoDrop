// @vitest-environment jsdom
import { act, createElement } from "react";
import { createRoot } from "react-dom/client";
import { afterEach, describe, expect, it, vi } from "vitest";
import { LocaleNavigation } from "@/components/LocaleLink";
import { RepoBrowser } from "@/components/repos/RepoBrowser";
import { getDictionary } from "@/lib/i18n/dictionary";
import type { Locale } from "@/lib/i18n/locales";
import type { RepoSummary } from "@/lib/repo-types";

const router = vi.hoisted(() => ({ push: vi.fn(), replace: vi.fn() }));
vi.mock("next/navigation", () => ({
  useRouter: () => router,
  useSearchParams: () => new URLSearchParams(),
}));

(globalThis as { IS_REACT_ACT_ENVIRONMENT?: boolean }).IS_REACT_ACT_ENVIRONMENT = true;

const repo: RepoSummary = {
  owner: "octo",
  name: "example",
  full_name: "octo/example",
  default_branch: "main",
  size: 2048,
  description: null,
  private: true,
  archived: false,
  fork: false,
  pushed_at: null,
  updated_at: null,
  language: "Go",
  html_url: "https://github.com/octo/example",
  stargazers_count: 0,
  open_issues_count: 1000,
  can: { pull: true, push: false, admin: false },
};

const container = document.createElement("div");
let root: ReturnType<typeof createRoot>;

async function render(locale: Locale) {
  const t = getDictionary(locale);
  document.body.append(container);
  root = createRoot(container);
  await act(async () => {
    root.render(createElement(LocaleNavigation, {
      urlLocale: locale,
      children: createElement(RepoBrowser, {
        login: "octo",
        locale,
        copy: t.repos,
        ui: t.ui,
        importLabel: t.nav.importArchive,
      }),
    }));
  });
}

afterEach(() => {
  act(() => root.unmount());
  container.remove();
  vi.unstubAllGlobals();
  vi.clearAllMocks();
});

describe("navigateur de dépôts localisé", () => {
  it("rend les libellés et compteurs anglais et conserve lang dans l'URL du dépôt", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue(Response.json({ repos: [repo] })));
    await render("en");
    expect(container.textContent).toContain("Showing 1 of 1 repositories");
    expect(container.textContent).toContain("Open issues: 1,000");
    expect(container.textContent).toContain("2 MB");
    expect(container.textContent).not.toContain("Sans description");
    const card = Array.from(container.querySelectorAll("button")).find((el) => el.textContent.includes("example"));
    expect(card).toBeDefined();
    act(() => card!.click());
    expect(router.push).toHaveBeenCalledWith("/repos?repo=octo%2Fexample&lang=en", { scroll: false });
  });

  it("affiche l'erreur locale même si l'API renvoie un message français", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue(Response.json({ error: "Authentification requise." }, { status: 401 })));
    await render("en");
    expect(container.textContent).toContain("Could not load repositories (HTTP 401).");
    expect(container.textContent).not.toMatch(/Authentification requise|No repositories are accessible/);
  });
});
