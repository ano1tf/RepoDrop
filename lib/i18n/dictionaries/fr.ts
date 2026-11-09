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
    checkFrench: "Interface 100 % française",

    statFormats: "formats d'archives",
    statFormatsSub: ".rar · .zip · .tar[.gz]",
    statCommands: "ligne de commande",
    statCommandsSub: "tout se fait au clic",
    statDuration: "du dépôt au push",
    statDurationSub: "aperçu inclus",
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

    mockFile: "mon-projet.zip",
    mockFileMeta: "{size} · {count} fichiers",
    mockExcluded: "exclu",
    mockPushed: "Poussé sur github.com/vous/mon-projet · branche main",

    demoEyebrow: "La magie, avant le login",
    demoTitle: "De l'archive au repo GitHub en quelques secondes.",
    demoTitleAccent: "Sans terminal.",
    demoLead: "Glissez-déposez, vérifiez l'aperçu, pushez. Aucune commande, rien n'est envoyé sans votre accord.",
    demoStep1: "Glissez le ZIP",
    demoStep2: "Extraction vérifiée",
    demoStep3: "Repo prêt",
    demoDropZone: "Glissez-déposez",
    demoScan: "Chemins vérifiés",
    demoPushed: "Pushé · à l'instant",
    demoBranches: "main",
    demoNoAccount: "Zéro compte, zéro terminal.",
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
} as const;
