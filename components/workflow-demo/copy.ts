/**
 * Textes de la démo « archive → dépôt » de la landing.
 *
 * Pourquoi un sous-ensemble plutôt que le dictionnaire entier ?
 * ------------------------------------------------------------------
 * La démo est **interactive** : elle vit dans un Client Component. Or un
 * Client Component reçoit ses props par sérialisation RSC — passer le
 * dictionnaire complet (≈ 12 ko de chaînes pour les 16 langues) gonflerait
 * le payload de la page d'accueil pour rien.
 *
 * On ne garde donc que les ~26 chaînes réellement affichées, extraites
 * côté serveur (`app/page.tsx`) via `demoCopyFrom`. Le typage `Dict` garantit
 * qu'aucune clé ne peut manquer ou changer de nom sans casser la
 * compilation.
 */
import type { Dict } from "@/lib/i18n/types";

/** Sous-ensemble du dictionnaire nécessaire à la démo. */
export interface DemoCopy {
  /** Pastille d'accroche (« La magie, avant le login »). */
  eyebrow: string;
  /** Titre. */
  title: string;
  /** Partie accentuée du titre. */
  titleAccent: string;
  /** Chapeau sous le titre. */
  lead: string;
  /** Mention « aucun compte requis ». */
  noAccount: string;

  /** Libellé de l'étape 1. */
  step1: string;
  /** Libellé de l'étape 2. */
  step2: string;
  /** Libellé de l'étape 3. */
  step3: string;

  /** Nom de l'archive de démonstration. */
  mockFile: string;
  /** Métadonnées de l'archive de démonstration. */
  mockFileMeta: string;
  /** Message de l'étape « extraction vérifiée ». */
  scan: string;
  /** Message de l'étape « repo prêt ». */
  pushed: string;
  /** Badge « local » apposé sur l'archive. */
  localBadge: string;

  /** Invite à déposer un `.zip`. */
  dropHint: string;
  /** Alternative clavier (choisir un fichier). */
  dropBrowse: string;
  /** Gros bouton primaire de la zone de dépôt (« Importer une archive »). */
  dropCta: string;
  /** Message d'erreur (format non supporté / archive illisible). */
  dropError: string;
  /** Message d'erreur : archive au-delà de la limite d'envoi (`{max}`). */
  dropTooLarge: string;
  /** Étape « lecture de l'archive ». */
  reading: string;
  /** Étape « extraction ». */
  extracting: string;
  /** État final : prêt à pousser. */
  ready: string;
  /** Détail de l'état « prêt à pousser » (`{count}`). */
  readyMeta: string;
  /** Bouton de push. */
  pushCta: string;
  /** Réassurance : l'archive reste dans le navigateur. */
  localNote: string;

  /** Titre de la modale de connexion. */
  connectTitle: string;
  /** Message de la modale de connexion. */
  connectBody: string;
  /** Précision rassurante de la modale. */
  connectNote: string;
  /** Bouton « se connecter avec GitHub ». */
  connectCta: string;
  /** Bouton « plus tard ». */
  connectLater: string;
}

/** Extrait les textes de la démo depuis la section `home` d'un dictionnaire. */
export function demoCopyFrom(home: Dict["home"]): DemoCopy {
  return {
    eyebrow: home.demoEyebrow,
    title: home.demoTitle,
    titleAccent: home.demoTitleAccent,
    lead: home.demoLead,
    noAccount: home.demoNoAccount,

    step1: home.demoStep1,
    step2: home.demoStep2,
    step3: home.demoStep3,

    mockFile: home.mockFile,
    mockFileMeta: home.demoFileMeta,
    scan: home.demoScan,
    pushed: home.demoPushed,
    localBadge: home.demoLocalBadge,

    dropHint: home.demoDropHint,
    dropBrowse: home.demoDropBrowse,
    dropCta: home.demoDropCta,
    dropError: home.demoDropError,
    dropTooLarge: home.demoDropTooLarge,
    reading: home.demoReading,
    extracting: home.demoExtracting,
    ready: home.demoReady,
    readyMeta: home.demoReadyMeta,
    pushCta: home.demoPushCta,
    localNote: home.demoLocalNote,

    connectTitle: home.demoConnectTitle,
    connectBody: home.demoConnectBody,
    connectNote: home.demoConnectNote,
    connectCta: home.demoConnectCta,
    connectLater: home.demoConnectLater,
  };
}
