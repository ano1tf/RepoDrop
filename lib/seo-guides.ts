import { config } from "./config";
import { getDictionary } from "./i18n/dictionary";
import { fill, formatBytes, formatNumber } from "./i18n/format";
import { DEFAULT_LOCALE, type Locale } from "./i18n/locales";
import { searchKey } from "./i18n/search";

export interface GuideSection {
  heading: string;
  paragraphs: string[];
}

export interface GuideFaqItem {
  question: string;
  answer: string;
}

export interface Guide {
  /** Slug URL (`/guides/<slug>`). ASCII, kebab-case. */
  slug: string;
  /** Titre H1, mot-clé principal en tête. */
  title: string;
  /** Métadescription propre à l’édition. */
  description: string;
  /** Mots-clés secondaires pour la page. */
  keywords: string[];
  /** Date de publication / dernière modification (ISO `AAAA-MM-JJ`). */
  datePublished: string;
  dateModified: string;
  /** Chapeau de la page. */
  intro: string;
  /** Sections de contenu (H2 + paragraphes). */
  sections: GuideSection[];
  /** Étapes pas à pas (alimentent le JSON-LD `HowTo`). */
  steps: string[];
  /** FAQ locale (alimente le JSON-LD `FAQPage` de la page). */
  faq: GuideFaqItem[];
  /** Slugs des guides associés (maillage interne). */
  related: string[];
}

function archiveLimitValues(locale: Locale) {
  return {
    upload: formatBytes(config.limits.maxUploadBytes, locale),
    extract: formatBytes(config.limits.maxExtractBytes, locale),
    files: formatNumber(config.limits.maxFiles, locale),
  };
}

/** Stable editorial URLs, chronology and cross-links. All reader-facing
 * content is assembled from the same dictionary keys, including in French. */
const GUIDE_CATALOG = [
  {
    slug: "importer-rar-sur-github",
    frenchKeywords: [
      "importer rar sur github",
      "envoyer rar sur github",
      "téléverser rar github",
      "rar vers github",
      "deposer rar github",
    ],
    related: [
      "importer-zip-sur-github",
      "envoyer-du-code-sur-github-sans-git",
      "creer-un-depot-github-depuis-une-archive",
    ],
  },
  {
    slug: "importer-zip-sur-github",
    frenchKeywords: [
      "importer zip sur github",
      "envoyer zip sur github",
      "téléverser zip github",
      "zip vers github",
      "deposer zip github",
    ],
    related: [
      "importer-rar-sur-github",
      "importer-tar-sur-github",
      "envoyer-du-code-sur-github-sans-git",
    ],
  },
  {
    slug: "importer-tar-sur-github",
    frenchKeywords: [
      "importer tar sur github",
      "importer tar.gz github",
      "tgz vers github",
      "envoyer tar github",
      "deposer tar.gz github",
    ],
    related: [
      "importer-zip-sur-github",
      "importer-rar-sur-github",
      "creer-un-depot-github-depuis-une-archive",
    ],
  },
  {
    slug: "envoyer-du-code-sur-github-sans-git",
    frenchKeywords: [
      "envoyer du code sur github sans git",
      "push github sans terminal",
      "github sans git",
      "publier du code sur github sans git",
      "importer du code sur github",
    ],
    related: [
      "importer-rar-sur-github",
      "creer-un-depot-github-depuis-une-archive",
      "importer-tar-sur-github",
    ],
  },
  {
    slug: "creer-un-depot-github-depuis-une-archive",
    frenchKeywords: [
      "créer un dépôt github depuis une archive",
      "créer dépôt github zip",
      "init github depuis archive",
      "créer repo github rar",
      "dépôt github sans git",
    ],
    related: [
      "importer-rar-sur-github",
      "envoyer-du-code-sur-github-sans-git",
      "importer-zip-sur-github",
    ],
  },
  {
    slug: "televerser-du-code-sur-github",
    frenchKeywords: [
      "téléverser du code sur github",
      "televerser code github",
      "uploader du code github",
      "envoyer du code github",
      "téléverser fichier github",
    ],
    related: [
      "importer-du-code-sur-github",
      "publier-du-code-sur-github",
      "importer-zip-sur-github",
    ],
  },
  {
    slug: "importer-du-code-sur-github",
    frenchKeywords: [
      "importer du code sur github",
      "comment importer du code sur github",
      "importer code github",
      "ajouter du code sur github",
      "import code github archive",
    ],
    related: [
      "televerser-du-code-sur-github",
      "publier-du-code-sur-github",
      "envoyer-du-code-sur-github-sans-git",
    ],
  },
  {
    slug: "publier-du-code-sur-github",
    frenchKeywords: [
      "publier du code sur github",
      "comment publier du code sur github",
      "publish code github sans git",
      "publier code github archive",
      "github sans terminal",
    ],
    related: [
      "importer-du-code-sur-github",
      "televerser-du-code-sur-github",
      "envoyer-du-code-sur-github-sans-git",
    ],
  },
] as const;

export const GUIDE_SLUGS: readonly string[] = GUIDE_CATALOG.map(({ slug }) => slug);

type GuideSlug = (typeof GUIDE_CATALOG)[number]["slug"];
type Edition = Pick<Guide, "title" | "intro" | "sections" | "faq"> & {
  drop?: string;
  keywords?: string[];
};

function section(heading: string, ...paragraphs: string[]): GuideSection {
  return { heading, paragraphs };
}

/** One table of contents for all 16 editions. Reuse the actual app/FAQ
 * descriptions where the workflow is identical instead of translating limits
 * or permissions differently from the screens where they apply. */
export function getGuides(locale: Locale = DEFAULT_LOCALE): readonly Guide[] {
  const { guides: copy, home, faq, job, login } = getDictionary(locale);
  const formats = { question: faq.q2, answer: fill(faq.a2, archiveLimitValues(locale)) };
  const privacy = { question: faq.q3, answer: faq.a3 };
  const existing = { question: faq.q4, answer: faq.a4 };
  const filters = { question: faq.q5, answer: faq.a5 };
  const history = { question: copy.historyQ, answer: copy.historyA };
  const visibility = { question: copy.privateQ, answer: copy.privateA };
  const noGit = { question: faq.q1, answer: faq.a1 };

  const connect = section(home.step1Title, home.step1Body, login.scopes.repo);
  const limits = section(home.feature1Title, formats.answer);
  const safety = section(home.feature2Title, copy.safeArchive);
  const preview = section(home.feature3Title, home.feature3Body, filters.answer);
  const destination = section(job.destination, visibility.answer, existing.answer);
  const tip = (...paragraphs: string[]) => section(copy.tipTitle, ...paragraphs);

  const editions: Record<GuideSlug, Edition> = {
    "importer-rar-sur-github": {
      title: fill(copy.formatTitle, { format: "RAR" }),
      intro: copy.rarIntro,
      drop: "RAR",
      keywords: ["RAR4", "RAR5", ".rar"],
      sections: [connect, limits, safety, tip(copy.rarTip)],
      faq: [filters, privacy, existing],
    },
    "importer-zip-sur-github": {
      title: fill(copy.formatTitle, { format: "ZIP" }),
      intro: copy.zipIntro,
      drop: "ZIP",
      keywords: [".zip"],
      sections: [preview, destination, safety, tip(copy.zipTip)],
      faq: [formats, privacy, history],
    },
    "importer-tar-sur-github": {
      title: fill(copy.formatTitle, { format: "TAR (.tar.gz, .tgz)" }),
      intro: copy.tarIntro,
      drop: ".tar / .tar.gz / .tgz",
      keywords: [".tar", ".tar.gz", ".tgz"],
      sections: [limits, preview, safety, tip(copy.tarTip)],
      faq: [existing, privacy, history],
    },
    "envoyer-du-code-sur-github-sans-git": {
      title: copy.noGitTitle,
      intro: copy.noGitIntro,
      sections: [section(home.feature4Title, noGit.answer), connect, section(history.question, history.answer), tip(copy.noGitTip)],
      faq: [formats, privacy, existing],
    },
    "creer-un-depot-github-depuis-une-archive": {
      title: copy.newRepoTitle,
      intro: copy.newRepoIntro,
      sections: [preview, destination, section(job.newRepo, job.nameHint), tip(copy.newRepoTip)],
      faq: [formats, privacy, history],
    },
    "televerser-du-code-sur-github": {
      title: copy.uploadTitle,
      intro: copy.uploadIntro,
      sections: [limits, safety, preview, tip(copy.uploadTip)],
      faq: [noGit, visibility, privacy],
    },
    "importer-du-code-sur-github": {
      title: copy.importTitle,
      intro: copy.importIntro,
      sections: [connect, destination, preview, tip(job.existingBranchHint, job.replaceWarning)],
      faq: [history, formats, privacy],
    },
    "publier-du-code-sur-github": {
      title: copy.publishTitle,
      intro: copy.publishIntro,
      sections: [destination, preview, safety, tip(copy.publishTip)],
      faq: [formats, history, privacy],
    },
  };

  return GUIDE_CATALOG.map(({ slug, frenchKeywords, related }) => {
    const { title, intro, drop, keywords = [], sections, faq: questions } = editions[slug];
    return {
      slug,
      title,
      description: intro,
      intro,
      keywords: [title, ...keywords, ...(locale === DEFAULT_LOCALE ? frenchKeywords : [])],
      datePublished: "2026-11-07",
      dateModified: "2026-11-18",
      steps: [home.step1Title, drop ? fill(copy.dropFormat, { format: drop }) : home.step2Title, copy.review],
      sections,
      faq: questions,
      related: [...related],
    };
  });
}

/** Default edition, used for canonical sitemap entries. */
export const GUIDES = getGuides(DEFAULT_LOCALE);

export function getGuide(slug: string, locale?: Locale): Guide | undefined {
  return getGuides(locale).find((g) => g.slug === slug);
}

export const MAX_GUIDE_QUERY_LENGTH = 160;

export function guideQuery(value: string | string[] | undefined): string {
  const query = Array.isArray(value) ? value[0] : value;
  return (query ?? "").trim().slice(0, MAX_GUIDE_QUERY_LENGTH).trim();
}

/** Match every term, in any order. Put guides that actually cover the subject
 * above guides that only mention it in a shared FAQ or a list of formats. */
export function searchGuides(query: string, locale: Locale = DEFAULT_LOCALE): Guide[] {
  const needle = searchKey(guideQuery(query), locale);
  // Keep file extensions such as `tar.gz` together; accept e.g. `.ZIP, GitHub`.
  const words = needle.match(/[\p{L}\p{N}][\p{L}\p{N}\p{M}]*(?:\.[\p{L}\p{N}]+)*/gu) ?? [];
  if (!words.length) return [];
  const terms = [...new Set(words)];

  return getGuides(locale).flatMap((guide) => {
    const title = searchKey(guide.title, locale);
    const summary = searchKey([guide.description, guide.intro].join(" "), locale);
    const keywords = searchKey(guide.keywords.join(" "), locale);
    const body = searchKey([
      ...guide.steps,
      ...guide.sections.flatMap(({ heading, paragraphs }) => [heading, ...paragraphs]),
      ...guide.faq.flatMap(({ question, answer }) => [question, answer]),
    ].join(" "), locale);
    // An exact title is the best destination even for long queries.
    let score = title === needle ? 200 : title.includes(needle) ? 20 : 0;
    for (const term of terms) {
      if (title.includes(term)) score += 12;
      else if (keywords.includes(term)) score += 5;
      else if (summary.includes(term)) score += 3;
      else if (body.includes(term)) score += 1;
      else return [];
    }
    return [{ guide, score }];
  }).sort((a, b) => b.score - a.score).map(({ guide }) => guide);
}
