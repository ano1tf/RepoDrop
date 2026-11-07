/**
 * Dictionnaire de référence : **toutes** les clés de l'interface, en français.
 *
 * C'est la source de vérité du typage (`Dict = typeof fr`) : ajouter une clé ici
 * casse la compilation des vingt-cinq autres dictionnaires tant qu'elle n'est
 * pas traduite. Aucune clé ne peut donc rester silencieusement en français dans
 * une autre langue — c'est exactement le bug que ce typage évite.
 *
 * Les valeurs sont des chaînes simples ou des gabarits à accolades
 * (`{count}`, `{max}`) rendus par `lib/i18n/format.ts`. Pas de fonction dans
 * les dictionnaires : ils restent sérialisables et comparables par les tests.
 */

export const fr = {
  meta: {
    title: "RepoDrop — Importez vos archives .rar, .zip et .tar sur GitHub",
    description:
      "Déposez une archive .rar, .zip, .tar ou .tar.gz et poussez votre code sur GitHub en un clic. Extraction sécurisée, aperçu avant envoi, sans terminal ni git.",
    loginTitle: "Connexion GitHub",
    loginDescription:
      "Connectez votre compte GitHub à RepoDrop pour créer un dépôt et pousser vos archives .rar, .zip ou .tar en un clic. Jeton chiffré, jamais stocké en base.",
    importTitle: "Importer une archive",
    importDescription:
      "Téléversez une archive .rar, .zip, .tar ou .tar.gz pour prévisualiser ses fichiers et la pousser vers un dépôt GitHub.",
  },

  nav: {
    howItWorks: "Comment ça marche",
    myRepos: "Mes dépôts",
    importArchive: "Importer une archive",
    importShort: "Importer",
    login: "Connexion",
    start: "Commencer",
    logout: "Déconnexion",
    avatarAlt: "Avatar de {login}",
    language: "Langue",
    languageChange: "Changer la langue",
    languageSearch: "Rechercher une langue…",
    languageCurrent: "Langue actuelle : {name}",
  },

  home: {
    heroBadge: "Nouveau : .tar et .tar.gz",
    heroTitleLine1: "Vos archives de code,",
    heroTitleLine2: "sur GitHub en un glisser-déposer.",
    heroBody:
      "Recevez un .rar, un .zip ou un .tar de projet ? Connectez GitHub, déposez l'archive, choisissez le dépôt — c'est poussé. Sans terminal, sans clone, sans configuration.",
    ctaStart: "Commencer avec GitHub",
    ctaImport: "Importer une archive",
    ctaHow: "Comment ça marche",
    checkSandboxed: "Extraction sandboxée",
    checkToken: "Jeton GitHub jamais stocké",
    checkFrench: "Ouvert : le code est public",

    statFormats: "formats d'archives",
    statFormatsSub: ".rar · .zip · .tar[.gz]",
    statCommands: "ligne de commande",
    statCommandsSub: "tout se fait au clic",
    statDuration: "du dépôt au push",
    statDurationSub: "aperçu inclus",
    statDurationValue: "2 min",
    statLanguages: "langues",
    statLanguagesSub: "interface et messages",

    stepsTitle: "Comment ça marche ?",
    stepsLead: "Trois étapes, deux minutes, aucune commande.",
    step1Title: "Connectez GitHub",
    step1Body:
      "Un simple clic d'autorisation. Nous demandons uniquement les scopes nécessaires — votre jeton reste chiffré dans votre navigateur.",
    step2Title: "Déposez l'archive",
    step2Body:
      "Glissez votre .rar, .zip ou .tar. Extraction sandboxée, chemins vérifiés, aperçu complet avant l'envoi.",
    step3Title: "Pushez en un clic",
    step3Body:
      "Créez un dépôt ou poussez dans un dépôt existant. Le commit est créé avec votre identité GitHub.",

    featuresTitle: "Conçu pour être simple",
    featuresTitleAccent: "et sûr",
    featuresLead:
      "Importer du code doit être un jeu d'enfant — sans transformer le serveur en passoire.",
    feature1Title: "RAR, ZIP et TAR natifs",
    feature1Body:
      "Les .rar (RAR4/RAR5), .zip et .tar/.tar.gz s'ouvrent côté serveur — aucun logiciel à installer, nulle part.",
    feature2Title: "Extraction verrouillée",
    feature2Body:
      "Anti zip-slip, anti bombes de décompression, .git embarqué et liens symboliques écartés. Vos dépôts restent propres.",
    feature3Title: "Aperçu avant push",
    feature3Body:
      "Fichiers, poids, dossier racine, node_modules : vous voyez exactement ce qui part, et vous gardez le contrôle.",
    feature4Title: "Zéro ligne de commande",
    feature4Body:
      "Pas de clone, pas de credentials git, pas de « git push -u origin ». L'outil fait tout à votre place.",
    feature5Title: "Dépôt existant ou neuf",
    feature5Body:
      "Créez un dépôt privé ou public, ou ajoutez l'archive à un dépôt existant — en branche dédiée si vous préférez.",
    feature6Title: "Liens prêts pour une IA",
    feature6Body:
      "Après le push : Codespaces, vscode.dev, URL de clone, commande gh et archive .zip. Un copier-coller suffit.",

    formatsTitle: "Une archive, quel que soit son âge",
    formatsBody:
      "Les vieux .rar de Windows, les .zip d'un export, les .tar.gz d'un serveur Linux : tout est lu côté serveur, en streaming, avec les mêmes garde-fous. Le dossier racine unique est retiré automatiquement, et node_modules est exclu par défaut.",

    securityTitle: "Ce qu'on refuse, et pourquoi",
    securityLead:
      "Décompresser l'archive d'un inconnu est un sport à risque. Voilà les filets tendus sous chaque import.",
    guard1Title: "Zip-slip & traversal",
    guard1Body:
      "Chaque chemin est validé (../, absolus, UNC, NUL). Une seule tentative et l'archive entière est refusée.",
    guard2Title: "Bombes de décompression",
    guard2Body:
      "Les tailles déclarées sont cumulées avant écriture : {extract} décompressés et {files} fichiers au maximum.",
    guard3Title: "Jeton GitHub",
    guard3Body:
      "Cookie httpOnly chiffré (JWE A256GCM), push via GIT_ASKPASS. Jamais en base, jamais dans les logs.",
    guard4Title: "Quotas",
    guard4Body:
      "30 uploads/h par IP et 10 push/h par utilisateur, compteurs persistants : le service reste sain.",
    limitsNote:
      "Limites par défaut : {upload} uploadés, {extract} décompressés, {files} fichiers par import.",

    faqTitle: "Questions fréquentes",
    faqLead:
      "Tout savoir sur l'import d'archives vers GitHub, les formats acceptés et la confidentialité de votre compte.",

    ctaTitle: "Prêt à vider votre prochaine archive sur GitHub ?",
    ctaLead: "Connectez-vous, déposez, pushez. On s'occupe du reste.",

    mockFile: "mon-projet.tar",
    mockFileMeta: "{size} · {count} fichiers",
    mockExcluded: "exclu",
    mockPushed: "Poussé sur github.com/vous/mon-projet · branche main",
  },

  faq: {
    q1: "Comment mettre une archive .rar ou .zip sur GitHub sans utiliser Git ?",
    a1: "Connectez votre compte GitHub sur RepoDrop, glissez-déposez votre fichier .rar, .zip, .tar ou .tar.gz, vérifiez l'aperçu des fichiers extraits puis choisissez un nouveau dépôt ou un dépôt existant. RepoDrop crée le commit et pousse le code directement sous votre identité GitHub, sans terminal ni ligne de commande.",
    q2: "Quels formats d'archives et quelles tailles sont pris en charge ?",
    a2: "RepoDrop accepte nativement les archives .rar (RAR4 et RAR5), .zip, .tar, .tar.gz et .tgz, détectées par leurs octets magiques côté serveur. Par défaut, une archive peut peser jusqu'à {upload} compressés ({extract} décompressés et {files} fichiers).",
    q3: "Mon jeton GitHub et mon code source privé sont-ils stockés ?",
    a3: "Non. Votre jeton OAuth GitHub est conservé uniquement dans un cookie httpOnly chiffré (JWE A256GCM) dans votre navigateur : il n'est jamais écrit en base de données ni dans les journaux. Les fichiers extraits résident dans un espace temporaire isolé puis sont purgés automatiquement après le push.",
    q4: "Puis-je envoyer une archive vers un dépôt GitHub existant sans écraser mon travail ?",
    a4: "Oui. Vous pouvez créer un dépôt neuf (public ou privé), pousser sur une branche dédiée d'un dépôt existant afin de préserver la branche principale, ou choisir explicitement l'option de remplacement complet du code avec confirmation.",
    q5: "Que deviennent le dossier racine unique et node_modules lors de l'import ?",
    a5: "Lorsque l'archive contient un unique dossier englobant (par exemple mon-projet/), RepoDrop propose de le retirer automatiquement pour placer vos fichiers directement à la racine du dépôt. Les dossiers node_modules, .git embarqués et fichiers système superflus (.DS_Store, __MACOSX) sont écartés par défaut.",
  },

  login: {
    title: "Connexion à RepoDrop",
    description:
      "Autorisez l'accès à GitHub pour créer des dépôts et pousser vos archives.",
    continueWithGithub: "Continuer avec GitHub",
    scopesLead: "Nous demandons uniquement les scopes",
    scopesAnd: "et",
    scopesTail:
      ": créer des dépôts et pousser du code en votre nom (y compris vos fichiers .github/workflows/). Votre jeton est chiffré dans un cookie httpOnly, jamais stocké en base.",
    bulletCookie: "Cookie httpOnly chiffré (A256GCM)",
    bulletLogout: "Déconnexion = jeton effacé du navigateur",
    devMode: "Mode développement",
    devLogin: "Connexion directe (GH_TOKEN du serveur)",
    errorState: "La session de connexion a expiré. Réessayez.",
    errorOauth: "GitHub a refusé l'autorisation. Réessayez depuis le début.",
    errorConfig:
      "L'application n'est pas configurée : renseignez GITHUB_CLIENT_ID / GITHUB_CLIENT_SECRET puis relancez.",
    errorDevauth: "Mode dev : le jeton GH_TOKEN du serveur est absent ou invalide.",
    errorGeneric: "Erreur de connexion.",
  },

  importPage: {
    title: "Importer une archive",
    lead: "Déposez un fichier .rar, .zip ou .tar (aussi .tar.gz) contenant votre code. Vous verrez un aperçu complet avant tout envoi vers GitHub.",
    browseLead:
      "Vous voulez d'abord regarder ce qu'il y a déjà sur votre compte ? Parcourez vos dépôts et leur contenu, sans rien envoyer.",
    browseCta: "Parcourir mes dépôts",
    limitLabel: "Limite :",
    limitBody: "{upload} par archive, {extract} décompressés.",
    securityLabel: "Sécurité :",
    securityBody: "chemins vérifiés, .git et liens écartés.",
    afterLabel: "Après :",
    afterBody: "aperçu, choix du dépôt, puis push.",
  },

  uploader: {
    dropLabel: "Déposer une archive .rar, .zip ou .tar",
    uploading: "Envoi de l'archive… {progress}%",
    keepOpen: "Ne fermez pas cet onglet.",
    dropHint: "Glissez votre archive ici, ou cliquez pour parcourir",
    formatsHint: ".rar, .zip, .tar & .tar.gz — {max} max ({extract} décompressés)",
    errorFormat:
      "Format non supporté : seuls les fichiers .rar, .zip, .tar et .tar.gz sont acceptés.",
    errorEmpty: "Ce fichier est vide.",
    errorTooLarge: "Archive trop volumineuse (max {max}).",
    errorHttp: "Échec de l'envoi (HTTP {status}). Réessayez.",
    errorNetwork: "Connexion perdue pendant l'envoi. Réessayez.",
  },

  footer: {
    tagline:
      "Vos archives de code, sur GitHub, en un glisser-déposer. Sans terminal, sans clone, sans configuration git.",
    productTitle: "Produit",
    home: "Accueil",
    importArchive: "Importer une archive",
    howItWorks: "Comment ça marche",
    security: "Sécurité",
    faq: "Questions fréquentes",
    formatsTitle: "Formats pris en charge",
    guaranteesTitle: "Garanties",
    guarantee1: "Jeton GitHub chiffré, jamais stocké en base",
    guarantee2: "Extraction sandboxée, chemins vérifiés",
    guarantee3: "Aperçu complet avant tout envoi",
    copyright: "© {year} RepoDrop — vos archives, votre GitHub.",
    reserved: "Espace réservé",
  },

  notFound: {
    title: "Page introuvable",
    body: "Cette page n'existe pas — ou le job a expiré (les archives sont purgées après un certain temps).",
    back: "Retour à l'accueil",
  },

  /*
   * Suivi d'un import (`/jobs/[id]`) : statuts en direct, aperçu de l'archive,
   * choix de la destination, résultat. Les jetons `{count}`, `{repo}`… sont
   * rendus par `fill()` ; le gras du texte d'origine devient du texte simple,
   * seule la donnée (nom du dépôt, SHA) reste dans un `<code>`.
   */
  jobs: {
    metaTitle: "Suivi de l'import",

    statusQueued: "En file d'attente",
    statusExtracting: "Extraction",
    statusReady: "Prêt à pousser",
    statusPushing: "Poussage…",
    statusDone: "Terminé",
    statusFailed: "Échec",

    extractingTitle: "Extraction en cours…",
    extractingBody:
      "Vérification des chemins, limite de taille, détection du dossier racine. Tout se passe côté serveur, dans un espace isolé.",
    pushingTitle: "Poussage vers GitHub…",
    pushingBody:
      "Création du commit et envoi des fichiers. L'onglet peut rester ouvert, on vous tient au courant.",

    failedTitle: "L'opération a échoué",
    failedUnknown: "Erreur inconnue.",
    lostConnection: "Connexion perdue. Réessayez.",
    httpFailed: "Échec (HTTP {status}).",
    repoMoved:
      "Le dépôt {repo} a avancé depuis votre import. Vous pouvez écraser sa branche avec le contenu exact de cette archive : les fichiers absents de l'archive seront supprimés du dépôt et le push sera forcé. L'historique existant est conservé (nouveau commit par-dessus).",
    repoMovedConfirm:
      "Confirmez-vous le remplacement complet du code de ce dépôt par cette archive ?",
    replaceAllYes: "Oui, remplacer tout le code",
    replaceAllRetry: "Réessayer en remplaçant tout le code",
    cancel: "Annuler",
    retryOtherArchive: "Réessayer avec une autre archive",
    backHome: "Retour à l'accueil",

    doneTitle: "C'est poussé !",
    doneBody: "{count} importés sur la branche",
    doneCommit: "commit",
    doneCreated: "· dépôt créé",
    openOnGithub: "Ouvrir sur GitHub",
    copyLink: "Copier le lien",
    downloadZip: "Télécharger en .zip",
    aiLinksTitle: "Liens prêts à donner à une IA :",
    anotherImport: "Importer une autre archive",

    linkRepo: "Dépôt GitHub",
    linkBranch: "Branche « {branch} »",
    linkBranchSub: "Poussez sur cette branche",
    linkCommit: "Commit précis",
    linkCodespaces: "Codespaces (agent IA GitHub)",
    linkCodespacesSub: "vscode.dev clé-en-main, Copilot connecté",
    linkVscode: "vscode.dev (éditeur web officiel)",
    linkVscodeSub: "Copilot + édition + exécution (Codespaces)",
    linkClone: "URL de clone (agent externe)",
    linkCloneSub: "L'agent s'authentifie lui-même via sa session GitHub",
    linkGh: "Commande CLI `gh`",

    previewTitle: "Aperçu de l'archive",
    previewLead: "Ce qui sera poussé, après filtres de sécurité.",
    previewFiles: "Fichiers",
    previewSize: "Poids décompressé",
    previewIgnored: "Ignorés :",
    ignoredGit: ".git ({count})",
    ignoredSystemFiles: "fichiers système ({count})",
    ignoredSymlinks: "symlinks ({count})",
    ignoredHardlinks: "hardlinks ({count})",
    ignoredBlocked: "chemins bloqués ({count})",
    tooLargeForGithub:
      "{count} fichier(s) dépassent 100 Mo : GitHub les refusera probablement. Ex. :",

    filtersTitle: "Filtres d'import",
    filtersNone: "Aucun filtre disponible pour cette archive.",
    stripRootLabel: "Retirer le dossier racine",
    stripRootHint: "Recommandé : le contenu du projet irait à la racine du dépôt.",
    includeNodeModules: "Inclure",
    includeNodeModulesHint: "Décoché par défaut : lourd et rarement utile dans un dépôt.",

    destTitle: "Destination",
    destLead: "Où pousser ces fichiers ?",
    destNew: "Nouveau dépôt",
    destExisting: "Dépôt existant",
    repoNameLabel: "Nom du dépôt",
    repoNamePlaceholder: "mon-projet",
    repoNameInvalid:
      "Lettres, chiffres, points, tirets et tirets bas uniquement (doit commencer par une lettre ou un chiffre).",
    visibilityLabel: "Visibilité",
    visibilityPrivate: "Privé",
    visibilityPrivateHint: "Visible par vous seul",
    visibilityPublic: "Public",
    visibilityPublicHint: "Visible par tout le monde",
    searchRepo: "Rechercher un dépôt…",
    loadingRepos: "Chargement de vos dépôts…",
    reposLoadError: "Impossible de charger vos dépôts.",
    noWritableRepo: "Aucun dépôt accessible avec droits d'écriture. Créez-en un nouveau !",
    noRepoMatch: "Aucun dépôt ne correspond à la recherche.",
    dedicatedBranch: "Créer une branche dédiée",
    dedicatedHintExisting:
      "Ne pas toucher à la branche par défaut : idéal pour un dépôt partagé.",
    dedicatedHintNew:
      "Nom de branche initial du nouveau dépôt (sinon la branche par défaut).",
    replaceAll: "Remplacer tout le code du dépôt",
    replaceAllHint:
      "Le dépôt contiendra exactement les fichiers de l'archive : ceux qui n'y sont pas seront supprimés, et le push sera forcé — il réussira même si le dépôt a été modifié entre-temps (plus d'erreur « fetch first »). À utiliser quand l'archive est la nouvelle version complète du projet.",
    replaceConfirm:
      "Je confirme : les fichiers du dépôt {repo} absents de cette archive seront définitivement supprimés de la branche poussée.",
    replaceConfirmNoRepo:
      "Je confirme : les fichiers du dépôt absents de cette archive seront définitivement supprimés de la branche poussée.",
    advanced: "Options avancées",
    commitMessage: "Message de commit",
    commitPlaceholder: "Import de {filename} via RepoDrop",
    pushAction: "Pousser sur GitHub",
    replacePushAction: "Remplacer tout le code sur GitHub",
    sending: "Envoi…",
    replaceNeedConfirm: "Cochez la confirmation de remplacement pour activer le bouton.",
    tokenNote:
      "Votre jeton GitHub reste dans un cookie chiffré — il n'est jamais écrit en base.",
  },

  /*
   * Navigateur de dépôts (`/repos`) : liste, recherche, tri, aperçu du contenu
   * et actions destructives.
   */
  repos: {
    metaTitle: "Mes dépôts",
    pageTitle: "Mes dépôts",
    pageLead:
      "Parcourez le contenu de vos dépôts avant d'importer quoi que ce soit : arborescence, aperçu des fichiers, branche de votre choix. Renommage, visibilité et suppression sont disponibles depuis l'onglet {actions} d'un dépôt.",

    filterPlaceholder: "Filtrer par nom, description ou langage…",
    filterAria: "Filtrer les dépôts",
    sortAria: "Trier",
    sortPushed: "Activité récente",
    sortName: "Nom (A→Z)",
    sortSize: "Taille",
    mine: "Les miens",
    refresh: "Actualiser",
    errorList: "Liste indisponible (HTTP {status}).",
    errorServer: "Impossible de joindre le serveur.",
    truncated:
      "Seuls les 300 dépôts les plus récents sont chargés. Affinez avec le filtre ci-dessus.",
    loading: "Chargement de vos dépôts…",
    emptyFilter: "Aucun dépôt ne correspond à ce filtre.",
    emptyToken: "Aucun dépôt visible avec ce jeton GitHub.",
    countAll: "{count} dépôt(s)",
    countFiltered: "{count} sur {total}",
    countHint: "— cliquez pour en parcourir le contenu.",
    noDescription: "Sans description",
    pushedAgo: "poussé {when}",
    issues: "{count} issue(s)",
    readOnly: "lecture seule",

    backToList: "Retour à la liste",
    list: "Liste",
    badgePrivate: "privé",
    badgePublic: "public",
    badgeArchived: "archivé",
    badgeFork: "fork",
    badgeReadOnly: "lecture seule",
    branchProtected: "(protégée)",
    downloadTitle: "Télécharger {repo} en .{format}",
    downloadTitleRef: "Télécharger {repo} ({ref}) en .{format}",
    actionsTab: "Actions",
    loadingRepo: "Chargement du dépôt…",
    inaccessible: "Dépôt inaccessible.",
    inaccessibleHttp: "Dépôt inaccessible (HTTP {status}).",
    errorServerJoin: "Impossible de joindre le serveur.",
    copyDenied: "Copie refusée par le navigateur.",
    reloadFolder: "Recharger ce dossier",
    root: "racine",
    entries: "{count} entrée(s)",
    loadingShort: "Chargement…",
    emptyRepo: "Ce dépôt ne contient encore aucun fichier. Importez une archive pour le remplir.",
    loadingFile: "Chargement du fichier…",
    selectFile: "Sélectionnez un fichier pour l'apercevoir.",
    lines: "{count} lignes",
    copy: "Copier",
    copied: "Copié",
    raw: "Brut",
    fileTooBig: "Fichier trop volumineux pour l'aperçu ({size}). Ouvrez-le sur GitHub.",
    fileBinary: "Fichier binaire ({size}) : aucun aperçu texte.",

    actionsTitle: "Renommer / décrire",
    nameLabel: "Nom du dépôt",
    renameWarning:
      "Renommer casse les clones, les liens et les pages GitHub existants. GitHub redirige l'ancien nom, mais pas indéfiniment.",
    descLabel: "Description",
    descPlaceholder: "À quoi sert ce dépôt ?",
    save: "Enregistrer",
    writeInsufficient: "Droits d'écriture insuffisants sur ce dépôt.",
    visibilityTitle: "Visibilité",
    visibilityCurrently: "Actuellement {visibility}.",
    visibilityToPrivate:
      "Le rendre privé retire l'accès à tous les anonymes.",
    visibilityToPublic:
      "Le rendre public expose tout l'historique des commits.",
    makePublic: "Rendre public",
    makePrivate: "Rendre privé",
    dangerZone: "Zone sensible",
    deleteWarning:
      "La suppression est définitive : code, historique, issues et wiki.",
    deleteRepo: "Supprimer le dépôt",
    deleteTitle: "Supprimer {repo}",
    deleteConfirmBody:
      "Aucune récupération possible. Tapez {name} pour débloquer le bouton.",
    deleteForever: "Supprimer définitivement",
    cancel: "Annuler",
    updated: "Dépôt mis à jour.",
    deleted: "Dépôt {repo} supprimé.",
    httpFailed: "Échec (HTTP {status}).",
  },

  /*
   * Messages des routes API (`/api/*`). Le serveur ne connaît pas de cookie
   * fiable à chaque appel : il renvoie un **code**, le client le traduit.
   * `errors.ts` garde les mêmes textes pour les rares réponses rendues
   * directement par le serveur (ex. téléchargement d'archive).
   */
  api: {
    authRequired: "Authentification requise.",
    jobNotFound: "Job introuvable.",
    jobNotReady: "Ce job n'est pas encore prêt.",
    jobNotPushable: "Ce job n'est pas prêt à être poussé.",
    invalidJson: "Corps JSON invalide.",
    invalidMultipart: "Requête invalide (multipart/form-data attendu).",
    emptyBody: "Corps de requête vide.",
    emptyArchive: "L'archive est vide.",
    uploadFailed: "Réception du fichier impossible. Réessayez.",
    repoNameRequired: "Le nom du dépôt est requis pour créer un nouveau dépôt.",
    branchNameTooLong: "Nom de branche trop long.",
    invalidOptions: "Options invalides.",
    invalidChange: "Modification invalide.",
    noChange: "Aucune modification.",
    pathRequired: "Paramètre « path » requis.",
  },

  /*
   * Messages des codes `ErrorCode` (`lib/errors.ts`). Un job en échec stocke
   * son code, pas une phrase : la page de suivi affiche la traduction de la
   * langue courante, et un même historique reste lisible après un changement
   * de langue. Aucune de ces chaînes ne contient de détail technique — le
   * détail (stderr git) est ajouté entre parenthèses, déjà nettoyé.
   */
  errors: {
    encrypted:
      "Cette archive est protégée par un mot de passe, ce qui n'est pas supporté pour l'instant.",
    tooManyFiles: "Trop de fichiers dans l'archive (limite atteinte).",
    tooBig:
      "Le contenu décompressé dépasse la taille autorisée. Réduisez l'archive (node_modules ?).",
    empty: "Cette archive ne contient aucun fichier exploitable.",
    corrupt: "Archive illisible ou corrompue. Vérifiez le fichier puis réessayez.",
    unsupported:
      "Format non pris en charge (méthode de compression ou variante d'archive inconnue).",
    volume:
      "Les archives RAR multi-volumes (.part1.rar, .part2.rar…) ne sont pas supportées.",
    unsafePaths:
      "L'archive contient des chemins de fichiers dangereux (traversal) et a été refusée.",
    pathLimits:
      "Un chemin de fichier dépasse les limites autorisées (profondeur ou longueur).",
    timeout: "L'extraction a pris trop de temps et a été interrompue.",
    rateLimited: "Trop de requêtes. Patientez un instant puis réessayez.",
    notFound: "Ressource introuvable.",
    forbidden:
      "Vous n'avez pas les droits d'écriture sur ce dépôt (ou le jeton GitHub n'a pas le bon scope).",
    repoExists: "Un dépôt porte déjà ce nom sur votre compte.",
    nameInvalid: "Nom de dépôt ou de branche invalide.",
    noChanges: "Rien à pousser : les fichiers correspondent déjà au dépôt destination.",
    conflict:
      "Le dépôt destination a changé entre-temps. Réessayez, poussez sur une branche dédiée, ou relancez en mode « Remplacer tout le code » pour écraser la branche avec le contenu de l'archive.",
    scopeMissing:
      "GitHub refuse la modification des fichiers de workflow (.github/workflows/…) : le jeton n'a pas le scope « workflow ». Déconnectez-vous puis reconnectez-vous pour l'accorder.",
    gitFailed: "Le push vers GitHub a échoué.",
    interrupted: "Le traitement a été interrompu (redémarrage du serveur).",
    badPath: "Chemin de fichier invalide.",
    confirmMismatch:
      "La confirmation ne correspond pas au nom du dépôt : rien n'a été supprimé.",
    archiveTooBig: "Ce dépôt est trop volumineux pour être téléchargé en une archive.",
    internal: "Erreur interne inattendue. Réessayez dans un instant.",
  },
} as const;
