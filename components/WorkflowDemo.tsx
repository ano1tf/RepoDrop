"use client";

/**
 * Démonstration « archive → dépôt », **interactive**.
 *
 * Ce que la démo fait
 * -------------------
 * - Elle **reçoit** un `.zip` : glissé-déposé ou choisi via le bouton.
 * - Elle lit **uniquement l'index de l'archive** (le répertoire central du
 *   ZIP), dans le navigateur : la liste des fichiers s'affiche, le contenu
 *   n'est jamais décompressé et **rien n'est envoyé au serveur**.
 * - Elle rejoue une extraction **simulée** (barre de progression) puis
 *   bascule dans un état « prêt à pousser ».
 * - Cliquer sur « Pousser sur GitHub » ouvre une modale qui renvoie vers la
 *   connexion GitHub : c'est là, et seulement là, que l'utilisateur décide
 *   de s'authentifier. Le message est explicite sur ce qui s'est passé
 *   (« votre fichier est prêt, connectez-vous pour terminer le push »).
 *
 * Architecture
 * ------------
 * - **Client Component** : l'interactivité est ici, pas dans le reste de la
 *   landing. Les Server Components environnants (hero, FAQ…) ne sont pas
 *   affectés.
 * - **Props minimales** : le composant ne reçoit que les ~28 chaînes
 *   réellement affichées (`components/workflow-demo/copy.ts`), pas le
 *   dictionnaire complet — un Client Component sérialise ses props dans le
 *   payload RSC.
 * - **GSAP vit ailleurs** : `WorkflowDemoMotion` (client) charge
 *   `components/workflow-demo/timeline.ts` en import dynamique ; la
 *   chorégraphie n'est pas dans le bundle initial.
 * - **Rendu SSR complet** : sans JavaScript (ou avec `prefers-reduced-motion`)
 *   la démo reste l'illustration statique d'origine, jamais un squelette
 *   vide. Le balisage est déjà dans son état final.
 * - **Accessibilité** : la zone de dépôt a une alternative clavier (champ
 *   `<input type="file">` réel), la modale est un `dialog` modal, et la
 *   légende `sr-only` décrit la séquence aux lecteurs d'écran.
 */

import { useCallback, useEffect, useRef, useState } from "react";
import {
  Check,
  FileArchive,
  FileCode2,
  FileJson2,
  FolderArchive,
  GitBranch,
  Info,
  Loader2,
  Lock,
  Rocket,
  Sparkles,
  UploadCloud,
} from "lucide-react";
import { WorkflowDemoMotion } from "@/components/WorkflowDemoMotion";
import { ConnectModal } from "@/components/workflow-demo/ConnectModal";
import type { DemoCopy } from "@/components/workflow-demo/copy";
import { DEMO_INTERACT_EVENT } from "@/components/workflow-demo/events";
import { readZipIndex, type ZipEntry } from "@/lib/zip-index";
import { savePendingFile } from "@/lib/pending-import";
import { fill, formatBytes, formatNumber } from "@/lib/i18n/format";
import { cn } from "@/lib/utils";

/** Id du panneau animé : le wrapper client le retrouve sans ref partagée. */
const DEMO_ID = "workflow-demo";

/** Étapes de l'aperçu interactif. */
type Phase = "idle" | "reading" | "extracting" | "ready" | "error";

export function WorkflowDemo({
  copy,
  locale,
  authenticated = false,
  maxBytes,
}: {
  copy: DemoCopy;
  locale: string;
  /**
   * Visiteur connecté : le bouton « pousser » mène directement à `/import`
   * (l'archive est relayée via IndexedDB). Sinon, la modale « Connecter
   * GitHub » s'ouvre — c'est la conversion attendue.
   */
  authenticated?: boolean;
  /**
   * Poids maximal accepté pour une archive (`config.limits.maxUploadBytes`).
   *
   * Passé par le serveur : un Client Component ne peut pas importer
   * `lib/config` (qui lit `process.env` et `node:crypto`) sans embarquer du
   * code serveur dans le bundle. Absent (tests, intégrations tierces) : pas
   * de contrôle local, le serveur reste seul juge.
   */
  maxBytes?: number;
}) {
  const [phase, setPhase] = useState<Phase>("idle");
  const [dragging, setDragging] = useState(false);
  const [fileName, setFileName] = useState<string | null>(null);
  const [fileSize, setFileSize] = useState<number | null>(null);
  const [entries, setEntries] = useState<ZipEntry[]>([]);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);
  /** Profondeur d'imbrication des `dragenter` : évite le clignotement. */
  const dragDepth = useRef(0);

  /* ------------------------------------------------------------- fichier */

  const loadFile = useCallback(
    async (file: File) => {
      setError(null);
      setEntries([]);
      setProgress(0);
      setFileName(file.name);
      setFileSize(file.size);

      // L'illustration laisse la place à l'archive réelle.
      document
        .getElementById(DEMO_ID)
        ?.dispatchEvent(new CustomEvent(DEMO_INTERACT_EVENT));

      if (!file.name.toLowerCase().endsWith(".zip")) {
        setPhase("error");
        setError(copy.dropError);
        return;
      }

      /*
       * Contrôle **avant** lecture : inutile de parcourir le répertoire
       * central d'une archive que le serveur refusera de toute façon. Le
       * message annonce la limite réelle, formatée dans la langue de la page.
       */
      if (maxBytes !== undefined && file.size > maxBytes) {
        setPhase("error");
        setError(fill(copy.dropTooLarge, { max: formatBytes(maxBytes, locale) }));
        return;
      }

      setPhase("reading");
      try {
        // Lecture **locale** : seul l'index de l'archive est lu.
        const list = await readZipIndex(file);
        setEntries(list);
        setPhase("extracting");

        /*
         * Relais pour /import, **après** une lecture réussie : si le visiteur
         * part se connecter (ou clique « pousser »), l'archive l'attend côté
         * import — jamais uploadée pour autant, elle ne quitte le navigateur
         * qu'après le choix du dépôt.
         *
         * Pourquoi si tard ? Une archive illisible (ou trop grosse) ne doit
         * pas être rangée dans IndexedDB : `/import` la relancerait, l'envoi
         * échouerait côté serveur, et le visiteur perdrait son fichier sans
         * comprendre. On ne met en attente que ce que l'on sait exploitable.
         */
        void savePendingFile(file);
      } catch {
        setPhase("error");
        setError(copy.dropError);
      }
    },
    [copy.dropError, copy.dropTooLarge, locale, maxBytes],
  );

  /* ------------------------------------------- extraction simulée ------- */
  /* La lecture de l'index est instantanée : sans animation, le visiteur ne
     comprendrait pas ce qui se passe. On rejoue donc une extraction
     « propre » (~1 s), comme le ferait la vraie décompression serveur. */
  useEffect(() => {
    if (phase !== "extracting") return;
    const timer = setInterval(() => {
      setProgress((p) => Math.min(100, p + 4 + Math.round(Math.random() * 9)));
    }, 70);
    return () => clearInterval(timer);
  }, [phase]);

  useEffect(() => {
    if (phase === "extracting" && progress >= 100) setPhase("ready");
  }, [phase, progress]);

  /* ------------------------------------------------------ glisser-déposer */

  const onDragEnter = (e: React.DragEvent) => {
    e.preventDefault();
    dragDepth.current += 1;
    setDragging(true);
  };

  const onDragOver = (e: React.DragEvent) => {
    // Sans `preventDefault`, le navigateur refuse le dépôt.
    e.preventDefault();
    e.dataTransfer.dropEffect = "copy";
  };

  const onDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    dragDepth.current = Math.max(0, dragDepth.current - 1);
    if (dragDepth.current === 0) setDragging(false);
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    dragDepth.current = 0;
    setDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) void loadFile(file);
  };

  /** Ouvre le sélecteur de fichiers (bouton « ou choisissez un fichier »). */
  const openPicker = useCallback(() => {
    inputRef.current?.click();
  }, []);

  const reset = useCallback(() => {
    setPhase("idle");
    setEntries([]);
    setProgress(0);
    setError(null);
    setFileName(null);
    setFileSize(null);
    if (inputRef.current) inputRef.current.value = "";
  }, []);

  /* ------------------------------------------------------- rendu ---------- */

  const repoName = copy.mockFile.replace(/\.[^.]+$/, "");
  const ready = phase === "ready";
  const fileCount = entries.filter((e) => !e.isDirectory).length;
  const readyMeta = fill(copy.readyMeta, {
    count: formatNumber(fileCount, locale),
  });

  const displayName = fileName ?? copy.mockFile;
  const displayMeta = fileSize
    ? `${formatBytes(fileSize, locale)} · ${formatNumber(fileCount, locale)}`
    : copy.mockFileMeta;

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
              {copy.eyebrow}
            </span>
            <span className="inline-flex items-center gap-1.5 font-mono text-[11px] text-mist">
              <Lock className="h-3 w-3 shrink-0 text-go" aria-hidden="true" />
              {copy.noAccount}
            </span>
          </div>

          <h3
            id="workflow-demo-title"
            data-wd-intro
            className="max-w-xl text-base font-semibold leading-snug tracking-tight sm:text-lg"
          >
            {copy.title}{" "}
            <span className="text-gradient">{copy.titleAccent}</span>
          </h3>
          <p data-wd-intro className="mt-2 max-w-xl text-sm leading-relaxed text-mist">
            {copy.lead}
          </p>

          {/* --------------------------------------------------- étapes 1→3 */}
          <div className="mt-5 grid gap-2.5 sm:grid-cols-3">
            <DemoCard step={1} label={copy.step1}>
              {/* Carte 1 : la zone de dépôt. */}
              <div
                data-wd="archive-card"
                onDragEnter={onDragEnter}
                onDragOver={onDragOver}
                onDragLeave={onDragLeave}
                onDrop={onDrop}
                className={cn(
                  "relative rounded-lg border border-edge/70 bg-panel2/70 p-2.5 transition-colors",
                  dragging && "border-go/70 bg-go/[0.06]",
                )}
              >
                {/* Halo de dépôt : superposition, jamais un changement de
                    structure (GSAP anime la bordure de cette carte). */}
                {dragging && (
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 rounded-lg border-2 border-dashed border-go/70"
                  />
                )}

                <div className="flex items-center gap-2">
                  <span
                    data-wd="archive"
                    className="grid h-8 w-8 shrink-0 place-items-center rounded-md bg-amber/10 text-amber ring-1 ring-amber/25 [will-change:transform]"
                  >
                    <FileArchive data-wd="archive-icon" className="h-4 w-4" aria-hidden="true" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p
                      data-wd="archive-name"
                      className="truncate font-mono text-[11px] text-chalk"
                      title={displayName}
                    >
                      {displayName}
                    </p>
                    <p data-wd="archive-meta" className="mt-0.5 truncate text-[10px] text-mist">
                      {displayMeta}
                    </p>
                  </div>
                  <span className="shrink-0 rounded bg-sky/10 px-1.5 py-0.5 text-[9px] font-medium uppercase tracking-wide text-sky ring-1 ring-sky/25">
                    {copy.localBadge}
                  </span>
                </div>

                {/* ------------------------------------------- état de l'aperçu */}
                <div className="mt-2">
                  {phase === "idle" && (
                    <DropHint copy={copy} onBrowse={openPicker} />
                  )}

                  {phase === "reading" && (
                    <p className="flex items-center gap-1.5 text-[11px] text-mist">
                      <Loader2 className="h-3 w-3 animate-spin text-sky" aria-hidden="true" />
                      {copy.reading}
                    </p>
                  )}

                  {phase === "extracting" && (
                    <div>
                      <div className="flex items-center justify-between gap-2 text-[10px] text-mist">
                        <span>{copy.extracting}</span>
                        <span className="font-mono tabular-nums">{progress}%</span>
                      </div>
                      <div
                        role="progressbar"
                        aria-valuenow={progress}
                        aria-valuemin={0}
                        aria-valuemax={100}
                        className="mt-1 h-1.5 w-full overflow-hidden rounded-full bg-panel2"
                      >
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-go to-sky transition-[width] duration-100 ease-linear"
                          style={{ width: `${progress}%` }}
                        />
                      </div>
                    </div>
                  )}

                  {phase === "ready" && (
                    <p className="flex items-center gap-1.5 text-[11px] text-go">
                      <Check className="h-3 w-3 shrink-0" strokeWidth={3} aria-hidden="true" />
                      <span className="truncate">{copy.ready}</span>
                    </p>
                  )}

                  {phase === "error" && (
                    <p role="alert" className="text-[11px] leading-snug text-danger">
                      {error ?? copy.dropError}
                    </p>
                  )}

                  {/* Les premiers fichiers de l'archive : la preuve que
                      l'index a bien été lu, localement. */}
                  {entries.length > 0 && (
                    <ul className="mt-1.5 max-h-16 space-y-0.5 overflow-y-auto font-mono text-[10px] text-mist">
                      {entries.slice(0, 8).map((e) => (
                        <li key={e.name} className="truncate">
                          {e.name}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                {/*
                  Champ réel : masqué (il ne doit pas apparaître dans la
                  mise en page), mais activable par le bouton ci-dessus —
                  c'est lui qui donne l'accès clavier et les lecteurs d'écran.
                */}
                <input
                  ref={inputRef}
                  id={DROP_INPUT_ID}
                  type="file"
                  accept=".zip,application/zip"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    // On repart d'un état propre ; le champ est vidé pour
                    // que le même fichier puisse être re-sélectionné.
                    reset();
                    if (file) void loadFile(file);
                  }}
                />
              </div>
            </DemoCard>

            <DemoCard step={2} label={copy.step2}>
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
                  <span data-wd="scan-label" className="truncate">{copy.scan}</span>
                </p>
              </div>
            </DemoCard>

            <DemoCard step={3} label={copy.step3}>
              <div className="rounded-lg border border-edge/70 bg-panel2/70 p-2.5 font-mono text-[10px] leading-4">
                <RepoLine name="src/" depth={0} dir />
                <RepoLine name="index.ts" depth={1} />
                <RepoLine name="package.json" depth={0} />
              </div>
            </DemoCard>
          </div>

          {/* Réassurance : l'archive ne quitte pas le navigateur. */}
          <p
            data-wd-intro
            className="mt-3 flex items-center gap-1.5 text-[11px] leading-snug text-mist"
          >
            <Info className="h-3 w-3 shrink-0 text-sky/80" aria-hidden="true" />
            <span>{copy.localNote}</span>
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

            {ready ? (
              <>
                <span className="truncate text-[11px] font-semibold text-go">
                  {copy.ready}
                </span>
                <span className="min-w-0 truncate font-mono text-[11px] text-mist">
                  {readyMeta}
                </span>
                <button
                  type="button"
                  onClick={() => {
                    if (authenticated) window.location.assign("/import");
                    else setModalOpen(true);
                  }}
                  className="ms-auto inline-flex shrink-0 items-center gap-1.5 rounded-lg bg-go px-2.5 py-1.5 text-[11px] font-semibold text-ink transition-colors hover:bg-[#4ee2ac]"
                >
                  <Rocket className="h-3 w-3" aria-hidden="true" />
                  {copy.pushCta}
                </button>
              </>
            ) : (
              <>
                <span className="inline-flex min-w-0 items-center gap-1 font-mono text-[11px]">
                  <span className="shrink-0 text-mist">github.com/you/</span>
                  <span className="truncate font-semibold text-go">{repoName}</span>
                </span>
                <span className="flex items-center gap-1 font-mono text-[11px] text-mist">
                  <GitBranch className="h-3 w-3 shrink-0" aria-hidden="true" />
                  <span className="truncate">{copy.pushed}</span>
                </span>
              </>
            )}

            {/* Reflet qui balaie le bandeau au moment du verdict. */}
            <span
              data-wd="result-shine"
              aria-hidden="true"
              className="pointer-events-none absolute inset-y-0 -left-1/4 w-1/4 -skew-x-12 bg-gradient-to-r from-transparent via-go/25 to-transparent"
            />
          </div>

          <p className="sr-only">
            {copy.step1} → {copy.step2} → {copy.step3}. {copy.pushed}{" "}
            {copy.localNote}
          </p>
        </div>
      </div>

      <WorkflowDemoMotion targetId={DEMO_ID} />

      {modalOpen && (
        <ConnectModal
          title={copy.connectTitle}
          body={copy.connectBody}
          note={copy.connectNote}
          cta={copy.connectCta}
          later={copy.connectLater}
          href="/login"
          onClose={() => setModalOpen(false)}
        />
      )}
    </section>
  );
}

/* ------------------------------------------------------------------ briques */

/** Id du champ de sélection de fichier (libellé + `<label for>`). */
const DROP_INPUT_ID = "demo-zip-input";

/**
 * Invite au dépôt + alternative clavier.
 *
 * Le bouton déclenche le vrai `<input type="file">` : clic, clavier et
 * lecteurs d'écran passent par le même chemin, et le champ reste invisible.
 */
function DropHint({
  copy,
  onBrowse,
}: {
  copy: DemoCopy;
  onBrowse: () => void;
}) {
  return (
    <div className="flex flex-col items-center gap-1.5 py-1 text-center">
      <p className="flex items-center gap-1.5 text-[11px] leading-snug text-mist">
        <UploadCloud className="h-3 w-3 shrink-0 text-go/80" aria-hidden="true" />
        <span className="min-w-0">{copy.dropHint}</span>
      </p>
      {/*
        CTA primaire, centré : c'est l'appel à l'action principal de la démo
        (et de la landing). Il ouvre le vrai `<input type="file">` masqué —
        clic, clavier et lecteurs d'écran passent par le même chemin.
      */}
      <button
        type="button"
        onClick={onBrowse}
        className="mt-0.5 inline-flex w-full items-center justify-center gap-1.5 rounded-lg bg-go px-3 py-2 text-[11px] font-semibold text-ink shadow-[0_0_24px_-10px_rgba(52,211,153,0.7)] transition-colors hover:bg-[#4ee2ac] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-go/60"
      >
        <UploadCloud className="h-3.5 w-3.5" aria-hidden="true" />
        {copy.dropCta}
      </button>
      <span className="text-[9px] leading-snug text-mist/70">{copy.dropBrowse}</span>
    </div>
  );
}

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
