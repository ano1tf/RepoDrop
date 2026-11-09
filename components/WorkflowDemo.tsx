import type { Dict } from "@/lib/i18n/types";
import { cn } from "@/lib/utils";
import { WorkflowDemoMotion } from "@/components/WorkflowDemoMotion";
import {
  Check,
  FileArchive,
  FileCode2,
  FileJson2,
  FolderArchive,
  GitBranch,
  Info,
  Lock,
  Sparkles,
} from "lucide-react";

/**
 * Démonstration visuelle « archive → dépôt », posée **juste au-dessus** du
 * bouton GitHub : le visiteur voit ce qu'il obtient avant d'avoir à faire
 * confiance (retour de test utilisateur : « connecter un compte avant d'avoir
 * vu le résultat, c'est trop de friction »).
 *
 * Architecture
 * ------------
 * - **Ce fichier reste un Server Component.** Aucun `"use client"` : le HTML
 *   complet est rendu côté serveur et la landing ne bascule pas entièrement
 *   côté client.
 * - **Le balisage est déjà dans son état final.** Barres pleines, coches
 *   visibles, dépôt rempli. Sans JavaScript — ou avec `prefers-reduced-motion`
 *   — la démo est une illustration statique complète, jamais un squelette vide.
 * - **GSAP vit ailleurs.** `WorkflowDemoMotion` (client) charge
 *   `components/workflow-demo/timeline.ts` en import dynamique : la librairie
 *   part dans un chunk séparé, après l'hydratation. Le premier rendu ne paie
 *   rien, le reste du site non plus.
 * - **Accessibilité.** Le visuel est décoratif (`aria-hidden`) sauf le titre ;
 *   une légende `sr-only` décrit la séquence pour les lecteurs d'écran, et les
 *   halos/coches animés n'exposent aucune information indispensable.
 *
 * Tous les textes viennent du dictionnaire i18n : la page d'accueil est
 * traduite en 16 langues, ce composant ne fait pas exception.
 */

/** Id du panneau animé : le wrapper client le retrouve sans ref partagée. */
const DEMO_ID = "workflow-demo";

export function WorkflowDemo({ t }: { t: Dict }) {
  const { home } = t;
  const fileName = home.mockFile; // « my-project.zip »
  const repoName = fileName.replace(/\.[^.]+$/, "");

  return (
    <section aria-labelledby="workflow-demo-title" className="relative mt-9 w-full">
      <div id={DEMO_ID} data-wd="panel" className="panel relative overflow-hidden">
        {/* Filet lumineux supérieur + décor : grille estompée et halo froid. */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-go/60 to-transparent"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 grid-bg opacity-30 mask-fade"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-16 -top-20 h-48 w-48 rounded-full bg-sky/10 blur-[70px]"
        />

        <div className="relative p-4 sm:p-6">
          {/* ------------------------------------------------------- en-tête */}
          <div data-wd-intro className="mb-4 flex flex-wrap items-center justify-between gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-go/10 px-2.5 py-1 text-[11px] font-medium text-go ring-1 ring-go/25">
              <Sparkles className="h-3 w-3" aria-hidden="true" />
              {home.demoEyebrow}
            </span>
            <span className="inline-flex items-center gap-1.5 font-mono text-[11px] text-mist">
              <Lock className="h-3 w-3 shrink-0 text-go" aria-hidden="true" />
              {home.demoNoAccount}
            </span>
          </div>

          <h3
            id="workflow-demo-title"
            data-wd-intro
            className="max-w-xl text-base font-semibold leading-snug tracking-tight sm:text-lg"
          >
            {home.demoTitle}{" "}
            <span className="text-gradient">{home.demoTitleAccent}</span>
          </h3>
          <p data-wd-intro className="mt-2 max-w-xl text-sm leading-relaxed text-mist">
            {home.demoLead}
          </p>

          {/* --------------------------------------------------- étapes 1→3 */}
          <div className="mt-5 grid gap-2.5 sm:grid-cols-3">
            <DemoCard step={1} label={home.demoStep1}>
              {/*
                Carte de fichier *statique*, volontairement pas une zone de
                dépôt : aucune bordure pointillée, aucune invite à interagir.
                Avant connexion, la démo ne doit pas laisser croire qu'on peut
                glisser un fichier ici — c'est une illustration du parcours.
              */}
              <div
                data-wd="archive-card"
                className="rounded-lg border border-edge/70 bg-panel2/70 p-2.5"
              >
                <div className="flex items-center gap-2">
                  <span
                    data-wd="archive"
                    className="grid h-8 w-8 shrink-0 place-items-center rounded-md bg-amber/10 text-amber ring-1 ring-amber/25 [will-change:transform]"
                  >
                    <FileArchive data-wd="archive-icon" className="h-4 w-4" aria-hidden="true" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-mono text-[11px] text-chalk">
                      {fileName}
                    </p>
                    <p className="mt-0.5 truncate text-[10px] text-mist">
                      {home.demoFileMeta}
                    </p>
                  </div>
                  <span className="shrink-0 rounded bg-sky/10 px-1.5 py-0.5 text-[9px] font-medium uppercase tracking-wide text-sky ring-1 ring-sky/25">
                    {home.demoPreview}
                  </span>
                </div>
              </div>
            </DemoCard>

            <DemoCard step={2} label={home.demoStep2}>
              <div className="rounded-lg border border-edge/70 bg-panel2/70 p-2.5">
                <div className="flex h-8 items-end gap-[3px]" aria-hidden="true">
                  {[38, 62, 46, 78, 55, 88, 70, 95, 60, 84, 48, 72].map((h, i) => (
                    <span
                      key={i}
                      data-wd="bar"
                      className="w-full origin-bottom rounded-sm bg-gradient-to-t from-go/20 to-go/80"
                      style={{ height: `${Math.round(h / 3.4)}px` }}
                    />
                  ))}
                </div>
                <p className="mt-1 flex items-center gap-1 truncate font-mono text-[10px] text-go">
                  <Check
                    data-wd="scan-check"
                    className="h-2.5 w-2.5 shrink-0"
                    aria-hidden="true"
                  />
                  <span data-wd="scan-label" className="truncate">{home.demoScan}</span>
                </p>
              </div>
            </DemoCard>

            <DemoCard step={3} label={home.demoStep3}>
              <div className="rounded-lg border border-edge/70 bg-panel2/70 p-2.5 font-mono text-[10px] leading-4">
                <RepoLine name="src/" depth={0} dir />
                <RepoLine name="index.ts" depth={1} />
                <RepoLine name="package.json" depth={0} />
              </div>
            </DemoCard>
          </div>

          {/* Clarification : la démo est une illustration, pas une zone de dépôt. */}
          <p
            data-wd-intro
            className="mt-3 flex items-center gap-1.5 text-[11px] leading-snug text-mist"
          >
            <Info className="h-3 w-3 shrink-0 text-sky/80" aria-hidden="true" />
            <span>{home.demoPreviewNote}</span>
          </p>

          {/* Rail : se remplit au passage de la comète (trait + traînée + point). */}
          <div aria-hidden="true" className="relative mt-3 h-2">
            <span className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-edge" />
            <span
              data-wd="rail-fill"
              className="absolute inset-x-0 top-1/2 h-px origin-left -translate-y-1/2 bg-gradient-to-r from-go via-go/80 to-sky rtl:origin-right"
            />
            <span data-wd="comet" className="absolute inset-0">
              <span
                data-wd="trail"
                className="absolute top-1/2 h-[3px] w-16 origin-right -translate-x-full -translate-y-1/2 scale-x-0 rounded-full bg-gradient-to-r from-go/0 via-go/40 to-go/90 blur-[2px] rtl:origin-left rtl:translate-x-0"
              />
              <span
                data-wd="dot"
                className="absolute top-1/2 h-1.5 w-1.5 -translate-y-1/2 rounded-full bg-go shadow-[0_0_10px_2px_rgba(52,211,153,0.65)]"
              />
            </span>
          </div>

          {/* ------------------------------------------------------- résultat */}
          <div
            data-wd="result"
            className="relative mt-3 flex flex-wrap items-center gap-x-2 gap-y-1 overflow-hidden rounded-lg bg-go/[0.07] px-3 py-2 ring-1 ring-go/20"
          >
            <span
              data-wd="result-check"
              aria-hidden="true"
              className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-go text-ink"
            >
              <Check className="h-3 w-3" strokeWidth={3} />
            </span>
            <span className="inline-flex min-w-0 items-center gap-1 font-mono text-[11px]">
              <span className="shrink-0 text-mist">github.com/you/</span>
              <span className="truncate font-semibold text-go">{repoName}</span>
            </span>
            <span className="flex items-center gap-1 font-mono text-[11px] text-mist">
              <GitBranch className="h-3 w-3 shrink-0" aria-hidden="true" />
              <span className="truncate">{home.demoPushed}</span>
            </span>
            {/* Reflet qui balaie le bandeau au moment du verdict. */}
            <span
              data-wd="result-shine"
              aria-hidden="true"
              className="pointer-events-none absolute inset-y-0 -left-1/4 w-1/4 -skew-x-12 bg-gradient-to-r from-transparent via-go/25 to-transparent"
            />
          </div>

          <p className="sr-only">
            {home.demoStep1} → {home.demoStep2} → {home.demoStep3}.{" "}
            {home.demoPushed} {home.demoPreviewNote}
          </p>
        </div>
      </div>

      <WorkflowDemoMotion targetId={DEMO_ID} />
    </section>
  );
}

/* ------------------------------------------------------------------ briques */

/**
 * Carte d'étape : numéro, libellé, visuel.
 *
 * Le halo est visible par défaut — c'est l'état « statique » (sans JS ou en
 * `prefers-reduced-motion`). GSAP l'éteint puis le rallume au bon moment.
 */
function DemoCard({
  step,
  label,
  children,
}: {
  step: number;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div
      data-wd="step"
      className="relative flex flex-col rounded-xl bg-ink/60 p-2.5 ring-1 ring-edge"
    >
      <span
        data-wd="halo"
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-go/45 shadow-[0_0_28px_-12px_rgba(52,211,153,0.7)]"
      />
      <div className="relative mb-1.5 flex items-center gap-1.5">
        <span className="grid h-4 w-4 shrink-0 place-items-center rounded-full bg-panel2 font-mono text-[9px] font-bold text-mist ring-1 ring-edge">
          {step}
        </span>
        <span className="truncate text-[11px] font-medium text-chalk/90">
          {label}
        </span>
      </div>
      <div className="relative flex-1">{children}</div>
    </div>
  );
}

/** Ligne de l'arborescence simulée : GSAP les révèle et coche en cascade. */
function RepoLine({
  name,
  depth,
  dir,
}: {
  name: string;
  depth: number;
  dir?: boolean;
}) {
  const Icon = dir ? FolderArchive : name.endsWith(".json") ? FileJson2 : FileCode2;

  return (
    <div data-wd="line" className="flex items-center gap-1">
      <Icon
        aria-hidden="true"
        className={cn(
          "h-2.5 w-2.5 shrink-0",
          dir ? "text-sky/80" : name.endsWith(".json") ? "text-amber/80" : "text-mist/80",
        )}
      />
      <span
        className={cn("truncate", dir ? "text-sky/85" : "text-mist")}
        style={{ paddingInlineStart: depth * 6 }}
      >
        {name}
      </span>
      <Check
        data-wd="line-check"
        aria-hidden="true"
        className="ms-auto h-2.5 w-2.5 shrink-0 text-go/70"
        strokeWidth={2.5}
      />
    </div>
  );
}
