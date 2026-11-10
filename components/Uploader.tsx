"use client";

/**
 * Zone de dépôt d'archive : validation locale (extension / poids), upload
 * XHR avec barre de progression, puis redirection vers la page du job.
 */
import { useCallback, useEffect, useRef, useState, type DragEvent } from "react";
import { useRouter } from "next/navigation";
import { Archive, AlertTriangle, UploadCloud, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { fill } from "@/lib/i18n/format";
import { takePendingFile } from "@/lib/pending-import";
import type { Dict } from "@/lib/i18n/types";

interface Props {
  maxLabel: string;
  extractLabel: string;
  /**
   * Poids maximal accepté, en octets (`config.limits.maxUploadBytes`).
   * Contrôlé **avant** l'envoi : inutile de faire monter 300 Mo pour récolter
   * un 413 après plusieurs minutes de transfert.
   */
  maxBytes: number;
  /** Chaînes de la section `uploader` du dictionnaire courant. */
  t: Dict["uploader"];
}

const OK_EXT = /\.(rar|zip|tar|tar\.gz|tar\.z|tgz|tpz)$/i;

export function Uploader({ maxLabel, extractLabel, maxBytes, t: strings }: Props) {
  const router = useRouter();
  /*
   * Les chaînes viennent d'un objet recréé à chaque rendu serveur : on les
   * fige dans une ref pour que `send` garde une identité stable (sinon le
   * `useCallback` se recrée à chaque rendu et le gestionnaire de dépôt avec).
   */
  const tRef = useRef(strings);
  tRef.current = strings;
  const inputRef = useRef<HTMLInputElement>(null);
  /**
   * Requête en cours. Garder la référence est ce qui rend l'annulation
   * possible : `XMLHttpRequest` n'est pas pilotable autrement.
   */
  const xhrRef = useRef<XMLHttpRequest | null>(null);
  const [drag, setDrag] = useState(false);
  const [progress, setProgress] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  const send = useCallback(
    (file: File) => {
      setError(null);
      if (!OK_EXT.test(file.name)) {
        setError(tRef.current.errorFormat);
        return;
      }
      if (file.size === 0) {
        setError(tRef.current.errorEmpty);
        return;
      }
      /*
       * Même règle que le serveur (`MAX_UPLOAD_MB`), mais annoncée tout de
       * suite : le fichier ne quitte pas le navigateur, l'utilisateur n'attend
       * pas la fin d'un transfert perdu d'avance.
       */
      if (file.size > maxBytes) {
        setError(fill(tRef.current.errorTooLarge, { max: maxLabel }));
        return;
      }

      const form = new FormData();
      form.append("file", file, file.name);

      const xhr = new XMLHttpRequest();
      xhrRef.current = xhr;
      xhr.open("POST", "/api/upload");
      xhr.responseType = "json";
      xhr.upload.onprogress = (e) => {
        if (e.lengthComputable) setProgress(Math.round((e.loaded / e.total) * 100));
      };
      xhr.onload = () => {
        xhrRef.current = null;
        setProgress(null);
        if (xhr.status === 202 && xhr.response?.id) {
          router.push(`/jobs/${xhr.response.id}`);
          return;
        }
        setError(
          xhr.response?.error ??
            (xhr.status === 413
              ? fill(tRef.current.errorTooLarge, { max: maxLabel })
              : fill(tRef.current.errorHttp, { status: xhr.status })),
        );
      };
      xhr.onerror = () => {
        xhrRef.current = null;
        setProgress(null);
        setError(tRef.current.errorNetwork);
      };
      /*
       * Annulation volontaire : on ne signale pas d'erreur (l'utilisateur
       * sait ce qu'il a fait), on rend simplement la zone de dépôt.
       */
      xhr.onabort = () => {
        xhrRef.current = null;
        setProgress(null);
      };
      xhr.send(form);
    },
    [maxBytes, maxLabel, router],
  );

  /** Interrompt l'envoi en cours et revient à la zone de dépôt. */
  const cancel = useCallback(() => {
    const xhr = xhrRef.current;
    xhrRef.current = null;
    setProgress(null);
    // `abort()` peut être appelé après coup : le garde évite un état incohérent.
    if (xhr && xhr.readyState !== XMLHttpRequest.DONE) xhr.abort();
  }, []);

  /*
   * Relais depuis la landing : si un `.zip` a été déposé dans la démo `/`
   * avant le clic sur « Importer une archive » (ou un aller-retour OAuth),
   * il patiente dans IndexedDB. On le relit ici — l'opération le supprime —
   * puis on lance l'envoi comme s'il venait d'être glissé. La lecture et la
   * suppression sont atomiques : pas de double envoi en StrictMode.
   */
  useEffect(() => {
    let cancelled = false;
    void takePendingFile().then((file) => {
      if (!cancelled && file) send(file);
    });
    return () => {
      cancelled = true;
    };
  }, [send]);

  const onDrop = (e: DragEvent) => {
    e.preventDefault();
    setDrag(false);
    if (progress !== null) return;
    const file = e.dataTransfer.files?.[0];
    if (file) send(file);
  };

  const uploading = progress !== null;

  return (
    <div className="animate-fade-up">
      <div
        role="button"
        tabIndex={0}
        aria-label={strings.dropLabel}
        onClick={() => !uploading && inputRef.current?.click()}
        onKeyDown={(e) => {
          if ((e.key === "Enter" || e.key === " ") && !uploading) inputRef.current?.click();
        }}
        onDragOver={(e) => {
          e.preventDefault();
          if (!uploading) setDrag(true);
        }}
        onDragLeave={() => setDrag(false)}
        onDrop={onDrop}
        className={cn(
          "relative flex min-h-72 cursor-pointer flex-col items-center justify-center gap-4 rounded-2xl border-2 border-dashed p-8 text-center transition-all",
          "outline-none focus-visible:ring-2 focus-visible:ring-go/60",
          drag ? "border-go bg-go/5 scale-[1.01]" : "border-edge bg-panel hover:border-go/40",
          uploading && "cursor-default border-go/50",
        )}
      >
        <input
          ref={inputRef}
          type="file"
          accept=".rar,.zip,.tar,.tar.gz,.tgz,.tar.z,.tpz,application/x-rar-compressed,application/zip,application/x-tar,application/gzip"
          className="hidden"
          onChange={(e) => {
            const f = e.target.files?.[0];
            if (f) send(f);
            e.target.value = "";
          }}
        />

        {uploading ? (
          <div className="w-full max-w-sm">
            <div className="mb-3 flex items-center justify-center gap-2 text-sm text-chalk">
              <UploadCloud className="h-5 w-5 text-go" />
              {fill(strings.uploading, { progress: progress ?? 0 })}
            </div>
            <div className="h-2 w-full overflow-hidden rounded-full bg-panel2">
              <div
                className="h-full rounded-full bg-gradient-to-r from-go to-sky transition-[width] duration-200"
                style={{ width: `${progress}%` }}
              />
            </div>
            <p className="mt-3 text-xs text-mist">{strings.keepOpen}</p>
            {/*
              Sortie de secours : une archive de 200 Mo sur une connexion
              lente, c'est plusieurs minutes. Sans ce bouton, la seule issue
              est de fermer l'onglet (et de perdre l'upload de toute façon).
              `stopPropagation` : le clic ne doit pas ouvrir le sélecteur de
              fichiers de la zone de dépôt.
            */}
            <div className="mt-4 flex justify-center">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  cancel();
                }}
                className="inline-flex h-9 items-center justify-center gap-2 rounded-lg px-4 text-sm font-medium text-chalk ring-1 ring-edge transition-colors hover:bg-panel2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-go/60"
              >
                <X className="h-4 w-4" />
                {strings.cancel}
              </button>
            </div>
          </div>
        ) : (
          <>
            <div
              className={cn(
                "grid h-16 w-16 place-items-center rounded-2xl ring-1 transition-colors",
                drag ? "bg-go/15 text-go ring-go/40" : "bg-panel2 text-mist ring-edge",
              )}
            >
              <Archive className={cn("h-8 w-8", drag && "text-go")} />
            </div>
            <div>
              <p className="text-base font-medium text-chalk">{strings.dropHint}</p>
              <p className="mt-1 text-sm text-mist">
                {fill(strings.formatsHint, { max: maxLabel, extract: extractLabel })}
              </p>
            </div>
          </>
        )}
      </div>

      {error && (
        <div
          role="alert"
          className="mt-4 flex items-start gap-2 rounded-xl bg-danger/10 p-3.5 text-sm text-danger ring-1 ring-danger/25 animate-fade-in"
        >
          <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}
    </div>
  );
}
