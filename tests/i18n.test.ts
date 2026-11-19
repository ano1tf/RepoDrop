/**
 * Tests i18n : intégrité du catalogue, complétude des 16 dictionnaires,
 * cohérence des placeholders et normalisation des langues.
 *
 * Le typage (`Dict`) empêche déjà un dictionnaire incomplet de compiler.
 * Ces tests couvrent ce que TypeScript ne voit pas : clés vides, gabarits
 * `{…}` divergents, doublons de code, et traductions restées en français.
 */
import { describe, expect, it } from "vitest";
import {
  DEFAULT_LOCALE,
  dirOf,
  isLocale,
  LOCALE_COOKIE,
  LOCALES,
  localeDefinition,
  normalizeLocale,
  ogLocaleOf,
  parseLocale,
  safeNextPath,
} from "@/lib/i18n/locales";
import { DICTIONARIES, getDictionary, section } from "@/lib/i18n/dictionary";
import { fill, formatDateTime, formatNumber, formatRelativeTime, formatTime, hasPlaceholders, placeholdersOf } from "@/lib/i18n/format";
import { localizePath, localeSwitchPath } from "@/lib/i18n/navigation";

/** Aplatit un dictionnaire en `section.clé` → valeur. */
function flatten(obj: Record<string, unknown>, prefix = ""): Map<string, string> {
  const out = new Map<string, string>();
  for (const [key, value] of Object.entries(obj)) {
    const path = prefix ? `${prefix}.${key}` : key;
    if (typeof value === "string") out.set(path, value);
    else if (value && typeof value === "object") {
      for (const [k, v] of flatten(value as Record<string, unknown>, path)) {
        out.set(k, v);
      }
    }
  }
  return out;
}

describe("catalogue de langues", () => {
  it("propose 16 langues aux codes uniques", () => {
    expect(LOCALES).toHaveLength(16);
    const codes = LOCALES.map((l) => l.code);
    expect(new Set(codes).size).toBe(codes.length);
    expect(codes).toContain("fr");
    expect(codes).toContain("ar");
    expect(codes).toContain("ja");
  });

  it("déclare le bon sens d'écriture et une locale OpenGraph", () => {
    expect(dirOf("ar")).toBe("rtl");
    expect(dirOf("fr")).toBe("ltr");
    expect(ogLocaleOf("en")).toBe("en_US");
    expect(ogLocaleOf("ja")).toBe("ja_JP");
    // Le repli ne doit jamais jeter.
    expect(ogLocaleOf("xx" as never)).toBe("fr_FR");
  });

  it("donne un nom natif et un drapeau non vides pour chaque langue", () => {
    for (const l of LOCALES) {
      expect(l.nativeName.trim().length).toBeGreaterThan(1);
      expect(l.englishName.trim().length).toBeGreaterThan(1);
      expect(l.flag.length).toBeGreaterThan(0);
      expect(l.ogLocale).toMatch(/^[a-z]{2}_[A-Z]{2}$/);
    }
  });

  it("a un dictionnaire pour chaque langue du catalogue", () => {
    for (const l of LOCALES) {
      expect(DICTIONARIES[l.code], `dictionnaire manquant : ${l.code}`).toBeTruthy();
      expect(localeDefinition(l.code).code).toBe(l.code);
    }
  });
});

describe("dictionnaires", () => {
  const reference = flatten(DICTIONARIES[DEFAULT_LOCALE]);

  it("couvre exactement les mêmes clés que le français", () => {
    for (const l of LOCALES) {
      const dict = flatten(DICTIONARIES[l.code]);
      const missing = [...reference.keys()].filter((k) => !dict.has(k));
      const extra = [...dict.keys()].filter((k) => !reference.has(k));
      expect(missing, `clés manquantes en ${l.code}`).toEqual([]);
      expect(extra, `clés en trop en ${l.code}`).toEqual([]);
    }
  });

  it("n'a aucune valeur vide", () => {
    for (const l of LOCALES) {
      for (const [key, value] of flatten(DICTIONARIES[l.code])) {
        expect(value.trim(), `${l.code} → ${key}`).not.toBe("");
      }
    }
  });

  it("conserve les mêmes placeholders que le français", () => {
    for (const l of LOCALES) {
      const dict = flatten(DICTIONARIES[l.code]);
      for (const [key, frValue] of reference) {
        expect(
          placeholdersOf(dict.get(key) ?? ""),
          `${l.code} → ${key} : placeholders divergents`,
        ).toEqual(placeholdersOf(frValue));
      }
    }
  });

  it("traduit réellement les chaînes d'interface (hors noms propres)", () => {
    // Les marques et codes techniques peuvent rester identiques ; une phrase
    // entière qui reste en français signale une traduction oubliée.
    const isBrandish = (s: string) =>
      /^(RepoDrop|GitHub|\.rar.*|RepoDrop — .*GitHub)$/.test(s);
    for (const l of LOCALES) {
      if (l.code === "fr") continue;
      const dict = flatten(DICTIONARIES[l.code]);
      const untranslated = [...reference.entries()].filter(
        ([key, frValue]) =>
          dict.get(key) === frValue &&
          frValue.length > 40 &&
          !isBrandish(frValue) &&
          // `meta.title` et le slogan gardent la marque : tolérés.
          !key.startsWith("meta."),
      );
      expect(
        untranslated.map(([k]) => k),
        `chaînes non traduites en ${l.code}`,
      ).toEqual([]);
    }
  });
});

describe("normalizeLocale", () => {
  it("accepte les codes exacts", () => {
    expect(normalizeLocale("de")).toBe("de");
    expect(normalizeLocale("ja")).toBe("ja");
  });

  it("réduit une variante régionale ou un en-tête Accept-Language", () => {
    expect(normalizeLocale("de-AT")).toBe("de");
    expect(normalizeLocale("pt-BR")).toBe("pt");
    expect(normalizeLocale("zh_CN")).toBe("zh");
    expect(normalizeLocale("en-US,en;q=0.9,fr;q=0.8")).toBe("en");
    expect(normalizeLocale("AR")).toBe("ar");
  });

  it("sélectionne la langue prise en charge la mieux pondérée", () => {
    expect(normalizeLocale("sv-SE, fr;q=0.4, pt-BR;q=0.9")).toBe("pt");
    expect(normalizeLocale("ja;q=0, ko;q=0.7, ar;q=0.7")).toBe("ko");
    expect(normalizeLocale("ja;q=0, *;q=0.6")).toBe(DEFAULT_LOCALE);
    expect(normalizeLocale("en;q=abc, es;q=0.5")).toBe("es");
  });

  it("retombe sur le français pour une valeur inconnue ou vide", () => {
    expect(normalizeLocale("xx")).toBe(DEFAULT_LOCALE);
    expect(normalizeLocale("")).toBe(DEFAULT_LOCALE);
    expect(normalizeLocale(null)).toBe(DEFAULT_LOCALE);
    expect(normalizeLocale(undefined)).toBe(DEFAULT_LOCALE);
  });

  it("protège le cookie : seuls les codes connus sont acceptés", () => {
    expect(isLocale("fr")).toBe(true);
    expect(isLocale("klingon")).toBe(false);
    expect(isLocale(null)).toBe(false);
    // Une valeur d'en-tête ne doit jamais finir telle quelle dans le cookie.
    expect(normalizeLocale("../../etc/passwd")).toBe(DEFAULT_LOCALE);
    expect(LOCALE_COOKIE).toBe("rd_lang");
  });
});

describe("parseLocale (validation stricte)", () => {
  it("refuse une langue inconnue au lieu de la replier en français", () => {
    expect(parseLocale("klingon")).toBeNull();
    expect(parseLocale("")).toBeNull();
    expect(parseLocale(null)).toBeNull();
    expect(parseLocale("xx-YY")).toBeNull();
    expect(parseLocale("en,fr")).toBeNull();
    expect(parseLocale("en;q=0")).toBeNull();
    expect(parseLocale("en-../etc")).toBeNull();
    // Une tentative d'injection ne doit jamais ressortir comme une langue.
    expect(parseLocale("../../etc/passwd")).toBeNull();
  });

  it("accepte les codes exacts, le français et les variantes régionales", () => {
    expect(parseLocale("fr")).toBe("fr");
    expect(parseLocale("fr-FR")).toBe("fr");
    expect(parseLocale("fr_CA")).toBe("fr");
    expect(parseLocale("ja")).toBe("ja");
    expect(parseLocale("pt-BR")).toBe("pt");
    expect(parseLocale("de-AT")).toBe("de");
    expect(parseLocale("zh_CN")).toBe("zh");
  });
});

describe("formatage", () => {
  it("remplit les gabarits et laisse les inconnus intacts", () => {
    expect(fill("Envoi… {progress}%", { progress: 42 })).toBe("Envoi… 42%");
    expect(fill("{a} et {b}", { a: 1, b: 2 })).toBe("1 et 2");
    expect(fill("{missing}", {})).toBe("{missing}");
  });

  it("détecte et liste les placeholders", () => {
    expect(hasPlaceholders("aucun")).toBe(false);
    expect(placeholdersOf("{b} puis {a}")).toEqual(["a", "b"]);
  });

  it("localise les dates relatives", () => {
    const now = Date.UTC(2026, 10, 18);
    expect(formatRelativeTime(now - 120_000, "en", now)).toBe("2 minutes ago");
    expect(formatRelativeTime(now - 120_000, "fr", now)).toBe("il y a 2 minutes");
    expect(formatRelativeTime(NaN, "fr", now)).toBe("—");
  });

  it("rend les horodatages UTC sans périodes du jour ambiguës entre versions ICU", () => {
    const ts = Date.UTC(2026, 10, 18, 23, 12);
    expect(formatTime(ts, "ko")).toBe("23:12");
    expect(formatDateTime(ts, "ko")).toContain("23시");
    expect(formatDateTime("invalid", "fr")).toBe("—");
  });

  it("localise les nombres et survit à une locale invalide", () => {
    expect(formatNumber(1234, "fr")).toMatch(/1\s?234/);
    expect(formatNumber(1234, "en")).toBe("1,234");
    expect(() => formatNumber(1234, "zxx-invalid-!!")).not.toThrow();
  });
});

describe("accès au dictionnaire", () => {
  it("replie sur le français pour un code inconnu", () => {
    expect(getDictionary("xx" as never)).toBe(DICTIONARIES.fr);
  });

  it("expose les sections typées", () => {
    expect(section("en", "nav").login).toBe("Sign in");
    expect(section("ar", "nav").login).toBe("تسجيل الدخول");
    expect(section("ja", "nav").login).toBe("ログイン");
  });

  it("a un titre et une description propres à chaque langue", () => {
    const titles = LOCALES.map((l) => DICTIONARIES[l.code].meta.title);
    expect(new Set(titles).size).toBe(LOCALES.length);
    for (const l of LOCALES) {
      expect(DICTIONARIES[l.code].meta.description.length).toBeGreaterThan(40);
    }
  });
});

describe("safeNextPath (bascule par lien direct)", () => {
  it("n'autorise que les chemins internes (pas d'open redirect)", () => {
    expect(safeNextPath("/langues")).toBe("/langues");
    expect(safeNextPath("/repos?repo=a")).toBe("/repos?repo=a");
    expect(safeNextPath("/")).toBe("/");
    expect(safeNextPath(null)).toBe("/");
    expect(safeNextPath(undefined)).toBe("/");
    expect(safeNextPath("")).toBe("/");
    expect(safeNextPath("https://evil.com")).toBe("/");
    expect(safeNextPath("//evil.com")).toBe("/");
    expect(safeNextPath("/\\evil.com")).toBe("/");
    expect(safeNextPath("/\tlangues")).toBe("/");
  });
});


describe("liens avec repli URL", () => {
  it("préserve tous les paramètres de navigation, hors langue remplacée", () => {
    expect(localizePath("/repos?repo=a%2Fb&lang=en&ref=main#file", "ar"))
      .toBe("/repos?repo=a%2Fb&lang=ar&ref=main#file");
    expect(localizePath("/#faq", "ja")).toBe("/?lang=ja#faq");
    expect(localizePath("/faq", null)).toBe("/faq");
  });

  it("ne modifie pas les liens externes ni les ancres relatives", () => {
    expect(localizePath("#faq", "ja")).toBe("#faq");
    expect(localizePath("https://github.com/RepoDrop", "ja")).toBe("https://github.com/RepoDrop");
    expect(localizePath("//github.com/RepoDrop", "ja")).toBe("//github.com/RepoDrop");
  });

  it("construit un lien document correctement encodé", () => {
    const target = "/recherche?q=caf%C3%A9#resultats";
    const url = new URL(localeSwitchPath("ja", target), "https://example.test");
    expect(url.pathname).toBe("/api/locale");
    expect(url.searchParams.get("to")).toBe("ja");
    expect(url.searchParams.get("next")).toBe(target);
  });
});
