/**
 * Tests de l'en-tête global (`components/Header.tsx`).
 *
 * Le bug corrigé : sur un site en français, la navigation restait en anglais
 * (« How it works », « My repos », « Import an archive », « Sign out »). Cause
 * structurelle : l'en-tête résolvait la langue **de son côté** (`getT()`), au
 * lieu de recevoir celle déjà résolue par le layout racine — deux sources de
 * vérité, donc deux occasions de diverger.
 *
 * Ce que ces tests verrouillent :
 *   1. le rendu suit **exactement** le dictionnaire reçu, dans les 16 langues ;
 *   2. aucune chaîne d'une autre langue ne fuit (pas de repli silencieux) ;
 *   3. le composant est **synchrone** : il ne peut pas re-résoudre la langue,
 *      ce qui rend la divergence impossible par construction.
 */
import { describe, expect, it } from "vitest";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { Header } from "@/components/Header";
import { DICTIONARIES } from "@/lib/i18n/dictionary";
import { LOCALES, type Locale } from "@/lib/i18n/locales";
import { en } from "@/lib/i18n/dictionaries/en";
import type { Dict } from "@/lib/i18n/types";
import type { SessionData } from "@/lib/session";

/** Session factice : un utilisateur connecté (avatar absent → initiale). */
const SESSION: SessionData = {
  login: "dimalaxyt",
  name: "Dima",
  avatar: "",
  token: "gho_test",
};

/** `renderToStaticMarkup` échappe apostrophes et esperluettes. */
function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#x27;");
}

function render(t: Dict, locale: Locale, session: SessionData | null = null): string {
  return renderToStaticMarkup(
    createElement(Header, { locale, t, session }) as Parameters<
      typeof renderToStaticMarkup
    >[0],
  );
}

const fr = DICTIONARIES.fr;
const frGuest = render(fr, "fr");
const frUser = render(fr, "fr", SESSION);

describe("Header — langue de la navigation", () => {
  it("affiche la navigation française quand la page est en français (visiteur)", () => {
    expect(frGuest).toContain(escapeHtml(fr.nav.howItWorks)); // « Comment ça marche »
    expect(frGuest).toContain(escapeHtml(fr.nav.login)); // « Connexion »
    expect(frGuest).toContain(escapeHtml(fr.nav.start)); // « Commencer »
  });

  it("ne laisse aucune chaîne anglaise fuir en français", () => {
    for (const leak of [en.nav.howItWorks, en.nav.login, en.nav.start, en.nav.logout]) {
      expect(frGuest, `fuite anglaise : « ${leak} »`).not.toContain(leak);
    }
  });

  it("suit la langue pour un utilisateur connecté (Mes dépôts / Déconnexion)", () => {
    expect(frUser).toContain(escapeHtml(fr.nav.myRepos));
    expect(frUser).toContain(escapeHtml(fr.nav.logout));
    expect(frUser).toContain(escapeHtml(fr.nav.importArchive));
    expect(frUser).not.toContain(en.nav.myRepos);
    expect(frUser).not.toContain(en.nav.logout);
    expect(frUser).not.toContain(en.nav.importArchive);
  });

  it("suit le dictionnaire dans les 16 langues, sans repli sur l'anglais", () => {
    // Clés dont la traduction est distinctive d'une langue à l'autre.
    const keys = ["howItWorks", "myRepos", "importArchive", "logout"] as const;

    for (const l of LOCALES) {
      const dict = DICTIONARIES[l.code];
      const html = render(dict, l.code, SESSION);

      for (const key of keys) {
        const label = dict.nav[key];
        expect(html, `${l.code} → ${key} : « ${label} » absent`).toContain(
          escapeHtml(label),
        );
        // La même clé en anglais ne doit apparaître que si la langue EST l'anglais.
        if (l.code !== "en" && label !== en.nav[key]) {
          expect(html, `${l.code} → ${key} : fuite anglaise`).not.toContain(en.nav[key]);
        }
      }
    }
  });

  it("n'expose que des liens internes pour la navigation", () => {
    for (const href of ["/#comment", "/repos", "/import"]) {
      expect(frUser).toContain(`href="${href}"`);
    }
    // Le lien de connexion n'existe que pour un visiteur anonyme.
    expect(frGuest).toContain('href="/login"');
    expect(frUser).not.toContain('href="/login"');
    // La déconnexion est une route, pas un lien Next (rechargement complet).
    expect(frUser).toContain('href="/api/auth/logout"');
  });
});

describe("Header — contrat d'architecture", () => {
  it("est synchrone : il ne peut pas re-résoudre la langue", () => {
    const out = Header({ locale: "fr", t: fr, session: null });
    // Un `async function` renverrait une Promise ; ce composant de présentation
    // doit rendre son arbre immédiatement, avec le dictionnaire fourni.
    expect(out).not.toBeInstanceOf(Promise);
    expect(out).toBeTruthy();
  });

  it("accepte le dictionnaire complet et n'en utilise que la section nav", () => {
    // Le même composant, avec un dictionnaire dont seule `nav` change, doit
    // suivre `nav` — preuve qu'aucune chaîne n'est codée en dur.
    const custom: Dict = {
      ...fr,
      nav: { ...fr.nav, howItWorks: "NAVIGATION-SENTINELLE", logout: "SORTIE" },
    };
    const html = render(custom, "fr", SESSION);
    expect(html).toContain("NAVIGATION-SENTINELLE");
    expect(html).toContain("SORTIE");
    expect(html).not.toContain(fr.nav.howItWorks);
  });
});
