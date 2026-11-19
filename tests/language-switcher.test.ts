// @vitest-environment jsdom
import { act, createElement } from "react";
import { createRoot } from "react-dom/client";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { getDictionary } from "@/lib/i18n/dictionary";
import type { Locale } from "@/lib/i18n/locales";

vi.mock("next/navigation", () => ({
  usePathname: () => "/recherche",
  useSearchParams: () => new URLSearchParams("q=zip&lang=fr"),
}));

(globalThis as { IS_REACT_ACT_ENVIRONMENT?: boolean }).IS_REACT_ACT_ENVIRONMENT = true;

let container: HTMLDivElement;
let root: ReturnType<typeof createRoot>;

beforeEach(() => {
  container = document.createElement("div");
  document.body.append(container);
  root = createRoot(container);
});

afterEach(() => {
  act(() => root.unmount());
  container.remove();
  window.history.replaceState(null, "", "/");
});

function toggle(details: HTMLDetailsElement, action: () => void) {
  return act(async () => {
    const changed = new Promise((resolve) => details.addEventListener("toggle", resolve, { once: true }));
    action();
    await changed;
  });
}

async function open(locale: Locale) {
  const { nav } = getDictionary(locale);
  act(() => root.render(createElement(LanguageSwitcher, {
    locale,
    changeLabel: nav.language,
    searchLabel: nav.languageSearch,
    currentLabel: nav.languageCurrent,
    emptyLabel: nav.languageEmpty,
  })));
  const details = container.querySelector("details")!;
  const summary = details.querySelector("summary")!;
  await toggle(details, () => summary.click());
  return { details, summary, search: details.querySelector("input")! };
}

function press(element: Element, key: string, options: KeyboardEventInit = {}) {
  element.dispatchEvent(new KeyboardEvent("keydown", { key, bubbles: true, cancelable: true, ...options }));
}

function type(search: HTMLInputElement, value: string) {
  act(() => {
    Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, "value")!.set!.call(search, value);
    search.dispatchEvent(new Event("input", { bubbles: true }));
  });
}

describe("sélecteur de langue au clavier", () => {
  it("parcourt les liens, revient au filtre et ferme le menu avec Échap", async () => {
    const { details, search, summary } = await open("ar");
    const links = [...details.querySelectorAll("a[lang]")];
    expect(document.activeElement).toBe(search);
    expect(links).toHaveLength(16);
    expect(details.querySelector('a[aria-current="true"]')?.getAttribute("lang")).toBe("ar");
    expect(details.querySelector('a[lang="ar"] bdi')?.getAttribute("dir")).toBe("rtl");
    expect(details.querySelector('a[lang="en"] bdi')?.getAttribute("dir")).toBe("ltr");

    press(search, "ArrowDown");
    expect(document.activeElement).toBe(links[0]);
    press(links[0], "End");
    expect(document.activeElement).toBe(links.at(-1));
    press(links.at(-1)!, "Home");
    expect(document.activeElement).toBe(links[0]);
    press(links[0], "ArrowUp");
    expect(document.activeElement).toBe(search);
    press(search, "Enter"); // Plusieurs résultats : naviguer, pas changer de langue.
    expect(document.activeElement).toBe(links[0]);
    await toggle(details, () => press(links[0], "Escape"));
    expect(details.open).toBe(false);
    expect(document.activeElement).toBe(summary);
  });

  it("active le résultat unique avec le chemin, la requête et le fragment d'origine", async () => {
    const { details, search } = await open("fr");
    window.history.replaceState(null, "", "/recherche#formats");
    type(search, "angláis");
    const links = [...details.querySelectorAll("a")];
    expect(links.map((link) => link.lang)).toEqual(["en"]);
    const navigate = vi.fn((event: MouseEvent) => event.preventDefault());
    container.addEventListener("click", navigate);
    press(search, "Enter", { isComposing: true });
    expect(navigate).not.toHaveBeenCalled();
    press(search, "Enter");
    expect(navigate).toHaveBeenCalledOnce();
    const redirect = new URL(links[0].href);
    expect(redirect.pathname).toBe("/api/locale");
    expect(redirect.searchParams.get("to")).toBe("en");
    expect(redirect.searchParams.get("next")).toBe("/recherche?q=zip&lang=fr#formats");
  });

  it("annonce une recherche vide de résultats et se ferme quand le focus en sort", async () => {
    const { details, search } = await open("fr");
    type(search, "zzzzz");
    expect(details.querySelector('[role="status"]')?.textContent).toBe(getDictionary("fr").nav.languageEmpty);
    expect(details.querySelectorAll("a[lang]")).toHaveLength(0);
    press(search, "ArrowDown");
    expect(document.activeElement).toBe(search);

    const outside = document.createElement("button");
    container.append(outside);
    await toggle(details, () => outside.focus());
    expect(details.open).toBe(false);
    expect(document.activeElement).toBe(outside);
  });
});
