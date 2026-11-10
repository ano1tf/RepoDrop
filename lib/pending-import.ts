/**
 * Passage de relais **navigateur → navigateur** pour l'archive déposée sur la
 * landing.
 *
 * Problème : un visiteur dépose un `.zip` dans la démo `/`, clique sur
 * « Importer une archive » (ou sur « Pousser sur GitHub ») et atterrit —
 * parfois après un aller-retour OAuth complet — sur `/import`. Un objet
 * `File` ne survit pas à un aller-retour document : il n'est pas
 * sérialisable dans l'URL.
 *
 * Solution : on range le fichier dans **IndexedDB** (même navigateur, même
 * origine) au moment du dépôt, puis la page `/import` le relit à son montage
 * (`takePendingFile`, qui le **supprime** en même temps) et relance l'envoi.
 * Le fichier n'est jamais uploadé par la démo : seul l'index est lu, dans
 * le navigateur.
 *
 * Garde-fous :
 *   - IndexedDB est absent (SSR, jsdom, vieille webview) → toute erreur est
 *     absorbée : le passage de relais est un confort, jamais un prérequis ;
 *   - l'enregistrement expire après 1 h (`PENDING_TTL_MS`) : un `/import`
 *     visité bien plus tard ne relance pas un envoi que l'utilisateur a
 *     oublié ;
 *   - `takePendingFile` fait la lecture **et** la suppression dans la même
 *     transaction : deux montages concurrents (StrictMode) ne peuvent pas
 *     envoyer deux fois le même fichier.
 */

const DB_NAME = "repodrop";
const DB_VERSION = 1;
const STORE = "pending-import";
const KEY = "file";
const PENDING_TTL_MS = 60 * 60 * 1000; // 1 h

interface PendingRecord {
  file: File;
  savedAt: number;
}

function openDb(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);
    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains(STORE)) db.createObjectStore(STORE);
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error ?? new Error("indexedDB open failed"));
  });
}

/** Range l'archive déposée pour la page `/import` (réécrase tout relais). */
export async function savePendingFile(file: File): Promise<void> {
  if (typeof indexedDB === "undefined") return;
  try {
    const db = await openDb();
    try {
      await new Promise<void>((resolve, reject) => {
        const tx = db.transaction(STORE, "readwrite");
        const record: PendingRecord = { file, savedAt: Date.now() };
        tx.objectStore(STORE).put(record, KEY);
        tx.oncomplete = () => resolve();
        tx.onerror = () => reject(tx.error ?? new Error("indexedDB put failed"));
        tx.onabort = () => reject(tx.error ?? new Error("indexedDB put aborted"));
      });
    } finally {
      db.close();
    }
  } catch {
    // Relais indisponible : la démo fonctionne quand même (dépôt à refaire).
  }
}

/**
 * Lit **et** supprime l'archive en attente. Renvoie `null` si aucune — ou si
 * elle a expiré.
 */
export async function takePendingFile(): Promise<File | null> {
  if (typeof indexedDB === "undefined") return null;
  try {
    const db = await openDb();
    try {
      return await new Promise<File | null>((resolve, reject) => {
        // Lecture + suppression atomiques : un seul montage repartira avec
        // le fichier, même en cas de double exécution d'effet.
        const tx = db.transaction(STORE, "readwrite");
        const store = tx.objectStore(STORE);
        const getReq = store.get(KEY);
        let record: PendingRecord | undefined;
        getReq.onsuccess = () => {
          record = getReq.result as PendingRecord | undefined;
          store.delete(KEY);
        };
        tx.oncomplete = () => {
          if (!record?.file) return resolve(null);
          if (Date.now() - record.savedAt > PENDING_TTL_MS) return resolve(null);
          resolve(record.file);
        };
        tx.onerror = () => reject(tx.error ?? new Error("indexedDB take failed"));
        tx.onabort = () => reject(tx.error ?? new Error("indexedDB take aborted"));
      });
    } finally {
      db.close();
    }
  } catch {
    return null;
  }
}
