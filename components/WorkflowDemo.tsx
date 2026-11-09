import type { Dict } from "@/lib/i18n/types";
import { cn } from "@/lib/utils";
import {
  Archive,
  Check,
  FileArchive,
  FileCode2,
  FileJson2,
  FolderArchive,
  GitBranch,
  Lock,
  Sparkles,
} from "lucide-react";

/**
 * Démonstration visuelle « archive → dépôt », posée **juste au-dessus** du
 * bouton GitHub : le visiteur voit ce qu'il obtient avant d'avoir à faire
 * confiance (retour de test utilisateur : « connecter un compte avant d'avoir
 * vu le résultat, c'est trop de friction »).
 *
 * Choix techniques
 * ----------------
 * - **Serveur pur** : aucun `"use client"`, aucun état, aucun appel réseau.
 *   La boucle est entièrement en CSS (`globals.css`, animations `demo-*`) :
 *   zéro JavaScript envoyé au navigateur, la page d'accueil reste statique.
 * - **Une seule horloge** : toutes les pièces partagent un cycle de 7,2 s. La
 *   chronologie vit dans les keyframes (`demo-glow-1/2/3`, `demo-fill`,
 *   `demo-pop`), pas dans les `animation-delay` — les feuilles de style Tailwind
 *   ne peuvent pas être générées à l'exécution. Seules les micro-vagues
 *   décoratives (barres, lignes de l'arbre) sont décalées en style inline.
 * - **Dégradation propre** : si les animations sont coupées (`prefers-reduced-
 *   motion`), l'état de repos est l'état final — tout allumé, arbre complet. La
 *   démo reste une illustration lisible des trois étapes.
 * - **Accessibilité** : le visuel est décoratif (`aria-hidden`), une légende
 *   `sr-only` décrit la séquence pour les lecteurs d'écran.
 *
 * Tous les textes viennent du dictionnaire i18n : la page d'accueil est
 * traduite en 16 langues, ce composant ne fait pas exception.
 */
export function WorkflowDemo({ t }: { t: Dict }) {
  const { home } = t;
  const fileName = home.mockFile; // « my-project.zip »
  const repoName = fileName.replace(/\.[^.]+$/, "");

  return (
    <section aria-labelledby="workflow-demo-title" className="relative mt-9 w-full">
      <div className="panel relative overflow-hidden">
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
          <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-go/10 px-2.5 py-1 text-[11px] font-medium text-go ring-1 ring-go/25">
              <Sparkles className="h-3 w-3" aria-hidden="true" />
              {home.demoEyebrow}
            </span>
            <span className="inline-flex items-center gap-1.5 font-mono text-[11px] text-mist">
              <Lock className="h-3 w-3 shrink-0 text-go" aria-hidden="true" />
              {home.demoCaptionBefore}
            </span>
          </div>

          <h3
            id="workflow-demo-title"
            className="max-w-xl text-base font-semibold leading-snug tracking-tight sm:text-lg"
          >
            {home.demoTitle}{" "}
            <span className="text-gradient">{home.demoTitleAccent}</span>
          </h3>
          <p className="mt-2 max-w-xl text-sm leading-relaxed text-mist">
            {home.demoLead}
          </p>

          {/* --------------------------------------------------- étapes 1→3 */}
          <div className="mt-5 grid gap-2.5 sm:grid-cols-3">
            <DemoCard glow="animate-demo-glow-1" step={1} label={home.demoStep1}>
              <div className="rounded-lg border border-dashed border-go/35 bg-go/[0.05] p-2.5">
                <div className="flex items-center gap-2">
                  <span className="grid h-8 w-8 shrink-0 place-items-center rounded-md bg-amber/10 text-amber ring-1 ring-amber/25">
                    <FileArchive className="h-4 w-4" aria-hidden="true" />
                  </span>
                  <div className="min-w-0">
                    <p className="truncate font-mono text-[11px] text-chalk">
                      {fileName}
                    </p>
                    <p className="mt-0.5 flex items-center gap-1 truncate text-[10px] text-mist">
                      <Archive className="h-2.5 w-2.5 shrink-0" aria-hidden="true" />
                      {home.demoDropZone}
                    </p>
                  </div>
                </div>
              </div>
            </DemoCard>

            <DemoCard glow="animate-demo-glow-2" step={2} label={home.demoStep2}>
              <div className="rounded-lg border border-dashed border-go/20 bg-panel2/40 p-2.5">
                <div
                  className="flex h-8 items-end gap-[3px]"
                  aria-hidden="true"
                >
                  {[38, 62, 46, 78, 55, 88, 70, 95, 60, 84, 48, 72].map((h, i) => (
                    <span
                      key={i}
                      className="w-full rounded-sm bg-gradient-to-t from-go/20 to-go/80 animate-demo-bob"
                      style={{
                        height: `${Math.round(h / 3.4)}px`,
                        animationDelay: `${i * 90}ms`,
                        animationDuration: "2.4s",
                      }}
                    />
                  ))}
                </div>
                <p className="mt-1 flex items-center gap-1 truncate font-mono text-[10px] text-go">
                  <Check className="h-2.5 w-2.5 shrink-0" aria-hidden="true" />
                  {home.demoScan}
                </p>
              </div>
            </DemoCard>

            <DemoCard glow="animate-demo-glow-3" step={3} label={home.demoStep3}>
              <div className="rounded-lg border border-dashed border-go/20 bg-panel2/40 p-2.5 font-mono text-[10px] leading-4">
                <RepoLine name="src/" depth={0} dir index={0} />
                <RepoLine name="index.ts" depth={1} index={1} />
                <RepoLine name="package.json" depth={0} index={2} />
              </div>
            </DemoCard>
          </div>

          {/* Rail de progression : le trait se remplit, une capsule le parcourt.
              Synchrone avec les halos ci-dessus (même cycle de 7,2 s). */}
          <div aria-hidden="true" className="relative mt-3 h-2">
            <span className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-edge" />
            <span className="absolute inset-x-0 top-1/2 h-px origin-left -translate-y-1/2 animate-demo-fill bg-gradient-to-r from-go via-go/80 to-sky rtl:origin-right" />
            <span className="absolute top-1/2 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-go shadow-[0_0_10px_2px_rgba(52,211,153,0.6)] animate-demo-packet" />
          </div>

          {/* ------------------------------------------------------- résultat */}
          <div className="mt-3 flex flex-wrap items-center gap-x-2 gap-y-1 rounded-lg bg-go/[0.07] px-3 py-2 ring-1 ring-go/20">
            <span
              aria-hidden="true"
              className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-go text-ink animate-demo-pop"
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
          </div>

          <p className="sr-only">
            {home.demoStep1} → {home.demoStep2} → {home.demoStep3}.{" "}
            {home.demoPushed}
          </p>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ briques */

/** Carte d'étape : numéro, libellé, visuel. Le halo s'allume seul, en CSS. */
function DemoCard({
  glow,
  step,
  label,
  children,
}: {
  glow: string;
  step: number;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="relative flex flex-col rounded-xl bg-ink/60 p-2.5 ring-1 ring-edge">
      <span
        aria-hidden="true"
        className={cn(
          "pointer-events-none absolute inset-0 rounded-xl ring-1 ring-go/45",
          "shadow-[0_0_28px_-12px_rgba(52,211,153,0.7)]",
          glow,
        )}
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

/** Ligne de l'arborescence simulée ; `index` échelonne l'apparition. */
function RepoLine({
  name,
  depth,
  dir,
  index,
}: {
  name: string;
  depth: number;
  dir?: boolean;
  index: number;
}) {
  const Icon = dir ? FolderArchive : name.endsWith(".json") ? FileJson2 : FileCode2;

  return (
    <div
      className="flex items-center gap-1 animate-demo-line"
      style={{ animationDelay: `${index * 120}ms`, animationDuration: "7.2s" }}
    >
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
        aria-hidden="true"
        className="ms-auto h-2.5 w-2.5 shrink-0 text-go/70"
        strokeWidth={2.5}
      />
    </div>
  );
}
