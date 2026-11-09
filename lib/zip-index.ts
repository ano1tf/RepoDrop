/**
 * Index d'une archive ZIP, lu **côté navigateur**.
 *
 * Pourquoi un module maison plutôt que `jszip` ?
 * ---------------------------------------------
 * La démo « aperçu » de la landing doit connaître la **liste des fichiers**
 * d'un `.zip` pour afficher un aperçu crédible. Ce besoin ne justifie pas
 * une dépendance de ~100 kB dans le bundle : le format ZIP est documenté,
 * et son *répertoire central* (« central directory ») suffit à lister les
 * entrées sans rien décompresser.
 *
 * Conséquences :
 *   - **aucun octet de l'archive ne quitte le navigateur** ;
 *   - aucun paquet supplémentaire à installer ni à mettre à jour ;
 *   - seule la fin du fichier (répertoire central) est lue : on ne charge
 *     pas les Mo de données compressées pour lister 200 fichiers.
 *
 * Format suivi : PKWARE APPNOTE 6.3.3 (spécification ZIP). Seules les
 * structures nécessaires à l'indexation sont lues :
 *   - « End of Central Directory Record » (EOCD, signature `PK\x05\x06`) ;
 *   - « ZIP64 End of Central Directory Record » pour les archives > 4 Go
 *     ou > 65 535 entrées ;
 *   - « Central Directory File Header » (signature `PK\x01\x02`), une entrée
 *     par fichier.
 *
 * Le module ne dépend **ni de Node ni du DOM** : il manipule des
 * `Uint8Array` et lit un `Blob` via l'API standard (`Blob.slice` +
 * `Blob.arrayBuffer`), ce qui le rend testable sous Vitest.
 */

/** Une entrée de l'archive (fichier ou répertoire). */
export interface ZipEntry {
  /** Chemin de l'entrée ; un répertoire se termine par « / ». */
  name: string;
  /** Taille décompressée annoncée, en octets. */
  size: number;
  /** Vrai si l'entrée est un répertoire. */
  isDirectory: boolean;
}

/** Erreur explicite : l'archive n'est pas un ZIP lisible. */
export class ZipIndexError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ZipIndexError";
  }
}

/* --------------------------------------------------------------- constantes */

/** Signatures PKWARE (little-endian). */
const SIG_EOCD = 0x06054b50;
const SIG_CENTRAL = 0x02014b50;
const SIG_ZIP64_EOCD = 0x06064b50;
const SIG_ZIP64_LOCATOR = 0x07064b50;

/** Taille maximale de la « queue » à inspecter pour trouver l'EOCD. */
const MAX_COMMENT = 0xffff;
/** Taille minimale d'un EOCD (22 octets). */
const EOCD_MIN_SIZE = 22;
/** En-tête d'une entrée du répertoire central. */
const CENTRAL_HEADER_SIZE = 46;
/** Extension ZIP64 dans le champ « extra » d'une entrée. */
const ZIP64_EXTRA_ID = 0x0001;

/* ------------------------------------------------------------------ helpers */

/** Lit un entier non signé 16 bits, little-endian. */
function u16(bytes: Uint8Array, offset: number): number {
  return bytes[offset] | (bytes[offset + 1] << 8);
}

/** Lit un entier non signé 32 bits, little-endian. */
function u32(bytes: Uint8Array, offset: number): number {
  return (
    (bytes[offset] |
      (bytes[offset + 1] << 8) |
      (bytes[offset + 2] << 16) |
      (bytes[offset + 3] << 24)) >>>
    0
  );
}

/**
 * Lit un entier non signé 64 bits, little-endian.
 *
 * Les valeurs au-delà de `Number.MAX_SAFE_INTEGER` sont astronomiquement
 * improbables pour un répertoire central ; on les sature plutôt que de
 * renvoyer un `NaN` qui casserait les comparaisons.
 */
function u64(bytes: Uint8Array, offset: number): number {
  const low = u32(bytes, offset);
  const high = u32(bytes, offset + 4);
  const value = high * 0x1_0000_0000 + low;
  return Number.isSafeInteger(value) ? value : Number.MAX_SAFE_INTEGER;
}

/**
 * Décode un nom d'entrée.
 *
 * Le bit 11 du drapeau général indique un nom en UTF-8 ; sinon la
 * spécification impose CP437. On retombe sur windows-1252 (sur-couverture
 * CP437 pour les caractères imprimables), ce qui est suffisant pour un
 * affichage — et de toute façon sans effet sur la sécurité.
 */
function decodeName(bytes: Uint8Array, utf8: boolean): string {
  const encoding = utf8 ? "utf-8" : "windows-1252";
  try {
    return new TextDecoder(encoding).decode(bytes);
  } catch {
    return new TextDecoder("utf-8").decode(bytes);
  }
}

/**
 * Nettoie un nom d'entrée avant affichage.
 *
 * Les archives réelles contiennent des noms douteux (retours chariot,
 * caractères de contrôle, chemins Windows). On les neutralise : ce texte
 * n'est jamais réinterprété comme du HTML (React l'échappe), mais il ne
 * doit pas non plus polluer l'interface.
 */
export function sanitizeEntryName(name: string, maxLength = 120): string {
  const cleaned = name
    // Contrôles ASCII (Tabulation et saut de ligne compris).
    .replace(/[\u0000-\u001f\u007f]/g, "")
    .replace(/\s+/g, " ")
    .trim();
  if (cleaned.length <= maxLength) return cleaned;
  return `${cleaned.slice(0, maxLength - 1)}…`;
}

/* ------------------------------------------------------------------- EOCD */

/** Informations extraites de l'« End of Central Directory Record ». */
interface Eocd {
  /** Nombre total d'entrées. */
  count: number;
  /** Taille du répertoire central, en octets. */
  size: number;
  /** Position du répertoire central dans le fichier. */
  offset: number;
  /** Position de l'EOCD dans le tampon fourni. */
  at: number;
}

/**
 * Trouve et décode l'EOCD dans un tampon qui contient **la fin** du fichier.
 *
 * Le répertoire central est suivi d'un éventuel commentaire d'archive
 * (jusqu'à 64 Ko) : on balaie donc depuis la fin.
 */
function findEocd(tail: Uint8Array): Eocd | null {
  const limit = Math.max(0, tail.length - EOCD_MIN_SIZE);
  for (let i = tail.length - EOCD_MIN_SIZE; i >= limit; i--) {
    if (u32(tail, i) !== SIG_EOCD) continue;
    const count = u16(tail, i + 10);
    const size = u32(tail, i + 12);
    const offset = u32(tail, i + 16);
    return { count, size, offset, at: i };
  }
  return null;
}

/* ------------------------------------------------- répertoire central */

/**
 * Décode les en-têtes du répertoire central.
 *
 * @param cd      octets du répertoire central
 * @param count   nombre d'entrées attendu (servant de garde-fou)
 */
function parseCentralDirectory(cd: Uint8Array, count: number): ZipEntry[] {
  const entries: ZipEntry[] = [];
  let offset = 0;

  // On ne lit jamais plus d'entrées que le répertoire n'en contient : un
  // fichier tronqué ne doit pas faire boucler la lecture.
  const maxEntries = Math.min(count > 0 ? count : Number.MAX_SAFE_INTEGER, 100_000);

  while (offset + CENTRAL_HEADER_SIZE <= cd.length && entries.length < maxEntries) {
    if (u32(cd, offset) !== SIG_CENTRAL) break;

    const flags = u16(cd, offset + 8);
    const compressedSize = u32(cd, offset + 20);
    const uncompressedSize = u32(cd, offset + 24);
    const nameLength = u16(cd, offset + 28);
    const extraLength = u16(cd, offset + 30);
    const commentLength = u16(cd, offset + 32);

    const nameStart = offset + CENTRAL_HEADER_SIZE;
    const nameEnd = nameStart + nameLength;
    if (nameEnd > cd.length) break;

    const rawName = cd.subarray(nameStart, nameEnd);
    const name = decodeName(rawName, (flags & 0x0800) !== 0);

    let size = uncompressedSize;
    let localOffset = u32(cd, offset + 42);

    // Champ « extra » : on n'en retient que l'extension ZIP64, qui porte
    // les tailles et le décalage réels quand les champs 32 bits saturent.
    const extraStart = nameEnd;
    const extraEnd = Math.min(extraStart + extraLength, cd.length);
    let cursor = extraStart;
    while (cursor + 4 <= extraEnd) {
      const headerId = u16(cd, cursor);
      const dataSize = u16(cd, cursor + 2);
      if (headerId === ZIP64_EXTRA_ID) {
        let field = cursor + 4;
        // Les champs ZIP64 sont présents **dans l'ordre**, et seulement
        // ceux qui ont saturé dans l'en-tête 32 bits.
        if (uncompressedSize === 0xffffffff && field + 8 <= extraEnd) {
          size = u64(cd, field);
          field += 8;
        }
        if (compressedSize === 0xffffffff) field += 8;
        if (localOffset === 0xffffffff && field + 8 <= extraEnd) {
          localOffset = u64(cd, field);
        }
        break;
      }
      cursor += 4 + dataSize;
    }

    const isDirectory = name.endsWith("/");
    entries.push({
      name: sanitizeEntryName(name),
      size: isDirectory ? 0 : size,
      isDirectory,
    });

    offset = extraEnd + commentLength;
  }

  return entries;
}

/* ------------------------------------------------------------ API publique */

/**
 * Lit l'index d'un ZIP **entier** (octets en mémoire).
 *
 * Variante synchrone, pratique pour les tests et pour un fichier déjà
 * chargé. `readZipIndex` (asynchrone) est préférable en production : elle
 * ne lit que la fin du fichier.
 */
export function parseZipIndex(bytes: Uint8Array): ZipEntry[] {
  if (bytes.length < EOCD_MIN_SIZE) {
    throw new ZipIndexError("too_small");
  }
  const tailStart = Math.max(0, bytes.length - (MAX_COMMENT + EOCD_MIN_SIZE));
  const tail = bytes.subarray(tailStart);
  const eocd = findEocd(tail);
  if (!eocd) throw new ZipIndexError("not_a_zip");

  const absoluteEocd = tailStart + eocd.at;
  const locatorAt = absoluteEocd - 20;
  let count = eocd.count;
  let size = eocd.size;
  let offset = eocd.offset;

  // ZIP64 : le répertoire central peut se trouver au-delà de 4 Go.
  if (
    (count === 0xffff || size === 0xffffffff || offset === 0xffffffff) &&
    locatorAt >= 0 &&
    u32(bytes, locatorAt) === SIG_ZIP64_LOCATOR
  ) {
    const zip64Offset = u64(bytes, locatorAt + 8);
    if (zip64Offset + 56 <= bytes.length && u32(bytes, zip64Offset) === SIG_ZIP64_EOCD) {
      count = u64(bytes, zip64Offset + 32);
      size = u64(bytes, zip64Offset + 40);
      offset = u64(bytes, zip64Offset + 48);
    }
  }

  if (offset + size > bytes.length) throw new ZipIndexError("truncated");

  const cd = bytes.subarray(offset, offset + size);
  const entries = parseCentralDirectory(cd, count);
  if (entries.length === 0 && count > 0) throw new ZipIndexError("empty_index");
  return entries;
}

/**
 * Lit l'index d'un ZIP depuis un `Blob` (fichier choisi par l'utilisateur).
 *
 * Seuls deux fragments sont lus : la fin du fichier (EOCD) et le répertoire
 * central. Le contenu compressé n'est **jamais** chargé en mémoire.
 *
 * @throws {ZipIndexError} si le fichier n'est pas un ZIP lisible.
 */
export async function readZipIndex(blob: Blob): Promise<ZipEntry[]> {
  if (blob.size < EOCD_MIN_SIZE) throw new ZipIndexError("too_small");

  const tailStart = Math.max(0, blob.size - (MAX_COMMENT + EOCD_MIN_SIZE));
  const tail = new Uint8Array(await blob.slice(tailStart).arrayBuffer());
  const eocd = findEocd(tail);
  if (!eocd) throw new ZipIndexError("not_a_zip");

  let count = eocd.count;
  let size = eocd.size;
  let offset = eocd.offset;

  // ZIP64 : le « locator » est exactement 20 octets avant l'EOCD.
  if (
    (count === 0xffff || size === 0xffffffff || offset === 0xffffffff) &&
    eocd.at >= 20 &&
    u32(tail, eocd.at - 20) === SIG_ZIP64_LOCATOR
  ) {
    const zip64Offset = u64(tail, eocd.at - 20 + 8);
    if (zip64Offset + 56 <= blob.size) {
      const record = new Uint8Array(
        await blob.slice(zip64Offset, zip64Offset + 56).arrayBuffer(),
      );
      if (u32(record, 0) === SIG_ZIP64_EOCD) {
        count = u64(record, 32);
        size = u64(record, 40);
        offset = u64(record, 48);
      }
    }
  }

  if (offset + size > blob.size) throw new ZipIndexError("truncated");

  const cd = new Uint8Array(await blob.slice(offset, offset + size).arrayBuffer());
  const entries = parseCentralDirectory(cd, count);
  if (entries.length === 0 && count > 0) throw new ZipIndexError("empty_index");
  return entries;
}

/**
 * Vrai si le fichier ressemble à un ZIP (signature PK + type d'en-tête).
 *
 * Vérification rapide, purement locale : elle évite d'annoncer une erreur
 * d'archive à l'utilisateur après une lecture complète.
 */
export function looksLikeZip(bytes: Uint8Array): boolean {
  if (bytes.length < 4) return false;
  if (bytes[0] !== 0x50 || bytes[1] !== 0x4b) return false; // « PK »
  // 03 04 : en-tête local · 05 06 : EOCD (archive vide) · 07 08 : spanned.
  return (
    bytes[2] === 0x03 ||
    bytes[2] === 0x05 ||
    bytes[2] === 0x07 ||
    (bytes[2] === 0x06 && bytes[3] === 0x06)
  );
}
