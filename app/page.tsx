import type { Metadata } from "next";
import { headers } from "next/headers";
import Link from "next/link";
import {
  Archive,
  ArrowRight,
  Check,
  ChevronDown,
  Eye,
  FileArchive,
  FileWarning,
  FolderArchive,
  Gauge,
  GitBranch,
  Lock,
  MousePointerClick,
  ShieldCheck,
  Terminal,
} from "lucide-react";
import { getSession } from "@/lib/session";
import {
  buildPageMetadata,
  buildStructuredData,
  resolveSiteUrl,
  serializeJsonLd,
} from "@/lib/seo";
import { WorkflowDemo } from "@/components/WorkflowDemo";
import { demoCopyFrom } from "@/components/workflow-demo/copy";
import { buttonVariants } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { getT } from "@/lib/i18n/server";
import { LOCALES, ogLocaleOf } from "@/lib/i18n/locales";
import type { Dict } from "@/lib/i18n/types";
import { fill, formatBytes, formatNumber } from "@/lib/i18n/format";
import { config } from "@/lib/config";

export async function generateMetadata(): Promise<Metadata> {
  const { locale, t } = await getT();
  return buildPageMetadata({
    title: undefined,
    description: t.meta.description,
    path: "/",
    // Le titre localisé remplace le titre par défaut du layout.
    overrideTitle: t.meta.title,
    ogLocale: ogLocaleOf(locale),
  });
}

export default async function Home() {
  const [session, reqHeaders, { locale, t }] = await Promise.all([
    getSession(),
    headers(),
    getT(),
  ]);
  const baseUrl = resolveSiteUrl({ headers: reqHeaders });

  /*
   * Les gabarits du dictionnaire portent des accolades (`{upload}`,
   * `{extract}`, `{files}`) : ils doivent être remplis au rendu, sinon le
   * visiteur lit « jusqu'à {upload} compressés ». Les valeurs viennent de la
   * configuration (donc des vraies limites du serveur) et sont formatées dans
   * la langue courante — « 200 Mo » en français, « 200 MB » en anglais.
   * Le même objet `limitValues` alimente la FAQ visible **et** les données
   * structurées JSON-LD, pour que les deux ne divergent jamais.
   */
  const limitValues = {
    upload: formatBytes(config.limits.maxUploadBytes, locale),
    extract: formatBytes(config.limits.maxExtractBytes, locale),
    files: formatNumber(config.limits.maxFiles, locale),
  };

  const faqItems = [
    { question: t.faq.q1, answer: t.faq.a1 },
    { question: t.faq.q2, answer: fill(t.faq.a2, limitValues) },
    { question: t.faq.q3, answer: t.faq.a3 },
    { question: t.faq.q4, answer: t.faq.a4 },
    { question: t.faq.q5, answer: t.faq.a5 },
  ];

  const jsonLd = serializeJsonLd(
    buildStructuredData(baseUrl, {
      locale,
      title: t.meta.title,
      description: t.meta.description,
      faq: faqItems,
    }),
  );
  // Un visiteur doit se connecter avant de pouvoir importer ; un utilisateur
  // connecté va droit à la page d'import.
  const ctaHref = session ? "/import" : "/login";
  const ctaLabel = t.home.ctaImport;

  return (
    <main className="flex-1">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd }}
      />
      {/* ------------------------------------------------------------ hero */}
      <section className="relative overflow-hidden">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 hero-bg" />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 grid-bg mask-fade opacity-70"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-32 left-1/2 -z-10 h-72 w-[46rem] -translate-x-1/2 rounded-full bg-go/10 blur-[120px] animate-aurora"
        />

        <div className="mx-auto grid max-w-6xl items-center gap-14 px-4 pb-20 pt-16 sm:px-6 sm:pt-24 lg:grid-cols-[1.05fr_0.95fr] lg:pb-28">
          <div className="animate-fade-up">
            <Badge variant="sky" className="mb-6">
              <FolderArchive className="h-3.5 w-3.5" />
              {t.home.heroBadge}
            </Badge>
            <h1 className="text-4xl font-bold leading-[1.08] tracking-tight sm:text-6xl">
              {t.home.heroTitleLine1}
              <br />
              <span className="text-gradient">{t.home.heroTitleLine2}</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-mist">
              {t.home.heroBody}
            </p>

            {/* La démo arrive AVANT le bouton GitHub : on montre le résultat
                avant de demander un compte. */}
            <WorkflowDemo
              copy={demoCopyFrom(t.home)}
              locale={locale}
              authenticated={Boolean(session)}
              maxBytes={config.limits.maxUploadBytes}
            />

            <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
              <Link
                href={ctaHref}
                className={cn(buttonVariants({ size: "lg" }), "w-full sm:w-auto px-8")}
              >
                <FolderArchive className="h-4 w-4" />
                {ctaLabel}
                <ArrowRight className="h-4 w-4 rtl:rotate-180" />
              </Link>
              <a
                href="#comment"
                className={cn(buttonVariants({ variant: "outline", size: "lg" }))}
              >
                {t.home.ctaHow}
              </a>
            </div>

            <ul className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-mist">
              <CheckItem>{t.home.checkSandboxed}</CheckItem>
              <CheckItem>{t.home.checkToken}</CheckItem>
              <CheckItem>{t.home.checkFrench}</CheckItem>
            </ul>
          </div>

          <GitHubRepoMock t={t} />
        </div>
      </section>

      {/* ---------------------------------------------------------- bandeau */}
      <section className="border-y border-edge/60 bg-ink2/50">
        <div className="mx-auto grid max-w-6xl gap-px overflow-hidden px-4 sm:grid-cols-2 sm:px-6 lg:grid-cols-4">
          <Stat value="3" label={t.home.statFormats} sub={t.home.statFormatsSub} />
          <Stat value="0" label={t.home.statCommands} sub={t.home.statCommandsSub} />
          <Stat value="2 min" label={t.home.statDuration} sub={t.home.statDurationSub} />
          <Stat
            value={String(LOCALES.length)}
            label={t.home.statLanguages}
            sub={t.home.statLanguagesSub}
          />
        </div>
      </section>

      {/* ---------------------------------------------------------- étapes */}
      <section id="comment" className="mx-auto max-w-6xl scroll-mt-24 px-4 py-20 sm:px-6">
        <div className="mb-12 text-center">
          <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
            {t.home.stepsTitle}
          </h2>
          <p className="mt-3 text-mist">{t.home.stepsLead}</p>
        </div>
        <div className="relative grid gap-5 md:grid-cols-3">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute left-8 right-8 top-9 hidden h-px bg-gradient-to-r from-go/0 via-go/40 to-go/0 md:block"
          />
          {[
            { n: "1", title: t.home.step1Title, body: t.home.step1Body, icon: Lock },
            { n: "2", title: t.home.step2Title, body: t.home.step2Body, icon: MousePointerClick },
            { n: "3", title: t.home.step3Title, body: t.home.step3Body, icon: GitBranch },
          ].map((s) => (
            <div
              key={s.n}
              className="panel group relative p-6 transition-all duration-300 hover:-translate-y-1 hover:border-go/30"
            >
              <span className="absolute -top-3.5 left-6 grid h-7 w-7 place-items-center rounded-full bg-go text-xs font-bold text-ink shadow-[0_0_20px_-4px_rgba(52,211,153,0.8)] rtl:left-auto rtl:right-6">
                {s.n}
              </span>
              <s.icon className="mb-4 h-6 w-6 text-go transition-transform duration-300 group-hover:scale-110" />
              <h3 className="font-semibold">{s.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-mist">{s.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* -------------------------------------------------------- features */}
      <section className="border-t border-edge/60 bg-ink2/40">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
          <div className="mb-12 max-w-2xl">
            <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
              {t.home.featuresTitle}{" "}
              <span className="text-gradient">{t.home.featuresTitleAccent}</span>
            </h2>
            <p className="mt-3 text-mist">{t.home.featuresLead}</p>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { icon: Archive, title: t.home.feature1Title, body: t.home.feature1Body },
              { icon: ShieldCheck, title: t.home.feature2Title, body: t.home.feature2Body },
              { icon: Eye, title: t.home.feature3Title, body: t.home.feature3Body },
              { icon: Terminal, title: t.home.feature4Title, body: t.home.feature4Body },
              { icon: GitBranch, title: t.home.feature5Title, body: t.home.feature5Body },
            ].map((f) => (
              <div
                key={f.title}
                className="panel group p-6 transition-all duration-300 hover:-translate-y-1 hover:border-sky/30"
              >
                <div className="mb-4 inline-grid h-11 w-11 place-items-center rounded-xl bg-gradient-to-br from-go/15 to-sky/10 text-go ring-1 ring-go/20 transition-colors group-hover:text-sky group-hover:ring-sky/30">
                  <f.icon className="h-5 w-5" />
                </div>
                <h3 className="font-semibold">{f.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-mist">{f.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --------------------------------------------------------- formats */}
      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <div className="panel relative overflow-hidden p-8 sm:p-12">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 grid-bg opacity-40 mask-fade"
          />
          <div className="relative grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <h2 className="text-2xl font-semibold tracking-tight">
                {t.home.formatsTitle}
              </h2>
              <p className="mt-3 max-w-2xl text-sm leading-relaxed text-mist">
                {t.home.formatsBody}
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              {[".rar", ".zip", ".tar", ".tar.gz", ".tgz"].map((ext) => (
                <span
                  key={ext}
                  className="inline-flex items-center gap-1.5 rounded-lg bg-panel2 px-3 py-2 font-mono text-sm text-chalk ring-1 ring-edge"
                >
                  <FileArchive className="h-3.5 w-3.5 text-go" />
                  {ext}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* -------------------------------------------------------- sécurité */}
      <section
        id="securite"
        className="scroll-mt-24 border-t border-edge/60 bg-ink2/40"
      >
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
          <div className="mb-12 max-w-2xl">
            <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
              {t.home.securityTitle}
            </h2>
            <p className="mt-3 text-mist">{t.home.securityLead}</p>
          </div>
          <div className="grid gap-5 sm:grid-cols-2">
            {[
              { icon: ShieldCheck, title: t.home.guard1Title, body: t.home.guard1Body },
              { icon: FileWarning, title: t.home.guard2Title, body: fill(t.home.guard2Body, limitValues) },
              { icon: Lock, title: t.home.guard3Title, body: t.home.guard3Body },
              { icon: Gauge, title: t.home.guard4Title, body: t.home.guard4Body },
            ].map((g) => (
              <div key={g.title} className="panel flex gap-4 p-5">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-go/10 text-go ring-1 ring-go/20">
                  <g.icon className="h-5 w-5" />
                </span>
                <div>
                  <h3 className="text-sm font-semibold">{g.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-mist">{g.body}</p>
                </div>
              </div>
            ))}
          </div>
          <p className="mt-6 text-xs text-mist">{fill(t.home.limitsNote, limitValues)}</p>
        </div>
      </section>

      {/* ------------------------------------------------------------- FAQ */}
      <section
        id="faq"
        className="mx-auto max-w-6xl scroll-mt-24 px-4 pt-20 sm:px-6"
      >
        <div className="mb-10 max-w-2xl">
          <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
            {t.home.faqTitle}
          </h2>
          <p className="mt-3 text-mist">{t.home.faqLead}</p>
        </div>
        <div className="grid gap-3">
          {faqItems.map((item) => (
            <details
              key={item.question}
              className="panel group overflow-hidden transition-colors open:border-go/30"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 p-5 font-medium text-chalk transition-colors hover:text-go [&::-webkit-details-marker]:hidden">
                <span>{item.question}</span>
                <ChevronDown
                  aria-hidden="true"
                  className="h-4 w-4 shrink-0 text-mist transition-transform duration-200 group-open:rotate-180 group-open:text-go"
                />
              </summary>
              <div className="border-t border-edge/60 px-5 pb-5 pt-4 text-sm leading-relaxed text-mist">
                {item.answer}
              </div>
            </details>
          ))}
        </div>
      </section>

      {/* ------------------------------------------------------------ CTA */}
      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <div className="panel relative overflow-hidden p-8 text-center sm:p-14">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_50%_80%_at_50%_0%,rgba(52,211,153,0.14),transparent)]"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-24 left-1/2 h-48 w-96 -translate-x-1/2 rounded-full bg-sky/10 blur-[100px]"
          />
          <h2 className="relative text-2xl font-semibold tracking-tight sm:text-3xl">
            {t.home.ctaTitle}
          </h2>
          <p className="relative mx-auto mt-3 max-w-xl text-mist">
            {t.home.ctaLead}
          </p>
          <div className="relative mt-7">
            <Link href={ctaHref} className={cn(buttonVariants({ size: "lg" }))}>
              {ctaLabel}
              <ArrowRight className="h-4 w-4 rtl:rotate-180" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

/* ------------------------------------------------------------------ briques */

function CheckItem({ children }: { children: React.ReactNode }) {
  return (
    <li className="inline-flex items-center gap-1.5">
      <Check className="h-3.5 w-3.5 text-go" /> {children}
    </li>
  );
}

function Stat({
  value,
  label,
  sub,
}: {
  value: string;
  label: string;
  sub: string;
}) {
  return (
    <div className="px-2 py-8 text-center sm:px-6">
      <div className="text-3xl font-bold tracking-tight text-gradient">{value}</div>
      <div className="mt-1 text-sm font-medium text-chalk/90">{label}</div>
      <div className="mt-0.5 font-mono text-[11px] text-mist">{sub}</div>
    </div>
  );
}

/**
 * Colonne de droite du hero : à quoi ressemble le dépôt **après** l'import.
 *
 * La démonstration du parcours (les 3 étapes) vit dans
 * `components/WorkflowDemo.tsx`, juste au-dessus du bouton GitHub. Ici on montre
 * le résultat, pas le chemin : une page de dépôt GitHub avec ses fichiers et son
 * commit d'import. Le duo « la démo » + « le résultat » couvre les deux
 * questions du visiteur — comment ça marche, et qu'est-ce que j'obtiens.
 *
 * 100 % décoratif : aucun appel réseau, aucun état.
 */
function GitHubRepoMock({ t }: { t: Dict }) {
  const fileName = t.home.mockFile;
  const repoName = fileName.replace(/\.[^.]+$/, "");

  return (
    <div aria-hidden="true" className="relative mx-auto w-full max-w-md lg:max-w-none">
      <div className="pointer-events-none absolute -inset-6 -z-10 rounded-[2rem] bg-gradient-to-br from-go/10 via-transparent to-sky/10 blur-2xl" />

      <div className="panel overflow-hidden animate-float">
        {/* barre de fenêtre */}
        <div className="flex items-center gap-2 border-b border-edge/70 px-4 py-2.5">
          <span className="h-2.5 w-2.5 rounded-full bg-danger/60" />
          <span className="h-2.5 w-2.5 rounded-full bg-amber/60" />
          <span className="h-2.5 w-2.5 rounded-full bg-go/60" />
          <span className="ml-2 flex min-w-0 items-center gap-1.5 rounded-md bg-ink/70 px-2 py-1 font-mono text-[11px] text-mist ring-1 ring-edge">
            <Lock className="h-2.5 w-2.5 shrink-0 text-go" />
            <span className="truncate">
              github.com/you/<span className="text-chalk">{repoName}</span>
            </span>
          </span>
        </div>

        {/* en-tête de dépôt */}
        <div className="flex flex-wrap items-center gap-2 px-4 pt-3.5">
          <FolderArchive className="h-4 w-4 shrink-0 text-mist" />
          <span className="font-mono text-sm text-chalk">
            you/<span className="font-semibold">{repoName}</span>
          </span>
          <Badge variant="muted" className="ms-auto font-mono text-[10px]">
            Public
          </Badge>
        </div>

        {/* bandeau succès */}
        <div className="mx-4 mt-3 flex items-center gap-2 rounded-lg bg-go/10 px-3 py-2 ring-1 ring-go/25">
          <Check className="h-4 w-4 shrink-0 text-go" strokeWidth={3} />
          <span className="truncate text-xs font-medium text-go">
            {t.home.mockPushed}
          </span>
        </div>

        {/* fichiers + dernier commit */}
        <div className="mt-3 border-t border-edge/70">
          <div className="flex items-center justify-between gap-2 px-4 py-2 font-mono text-[11px] text-mist">
            <span className="inline-flex items-center gap-1.5">
              <GitBranch className="h-3 w-3 text-sky" />
              main
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Archive className="h-3 w-3" />
              {fileName}
            </span>
          </div>
          <ul className="font-mono text-[11px]">
            {[
              { name: "src", dir: true, meta: "6 files" },
              { name: "package.json", meta: "1.1 KB" },
              { name: "README.md", meta: "2.4 KB" },
              { name: ".gitignore", meta: "312 B" },
            ].map((row) => (
              <li
                key={row.name}
                className="flex items-center gap-2 border-t border-edge/40 px-4 py-1.5"
              >
                {row.dir ? (
                  <FolderArchive className="h-3 w-3 shrink-0 text-sky/80" />
                ) : (
                  <FileArchive className="h-3 w-3 shrink-0 text-mist/70" />
                )}
                <span className={row.dir ? "text-sky/85" : "text-mist"}>
                  {row.name}
                </span>
                <span className="ms-auto shrink-0 text-mist/50">{row.meta}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* pied : le commit créé */}
        <div className="flex items-center gap-2 border-t border-edge/70 bg-ink2/40 px-4 py-2">
          <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-go/15 text-go ring-1 ring-go/30">
            <GitBranch className="h-3 w-3" />
          </span>
          <span className="truncate font-mono text-[11px] text-mist">
            chore: import {fileName}
          </span>
          <span className="ms-auto shrink-0 rounded bg-panel2 px-1.5 py-0.5 font-mono text-[10px] text-mist ring-1 ring-edge">
            main
          </span>
        </div>
      </div>
    </div>
  );
}
