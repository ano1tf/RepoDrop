import type { Dict } from "../types";

export const de: Dict = {
  meta: {
    title: "RepoDrop — Importiere deine .rar-, .zip- und .tar-Archive zu GitHub",
    description:
      "Archiv .rar, .zip, .tar oder .tar.gz ablegen und den Code mit einem Klick zu GitHub pushen. Sichere Extraktion, Vorschau vor dem Upload, ohne Terminal und ohne git.",
    loginTitle: "GitHub-Anmeldung",
    loginDescription:
      "Verbinde dein GitHub-Konto mit RepoDrop, um ein Repository zu erstellen und deine .rar-, .zip- oder .tar-Archive mit einem Klick zu pushen. Token verschlüsselt, nie in der Datenbank gespeichert.",
    importTitle: "Archiv importieren",
    importDescription:
      "Lade ein .rar-, .zip-, .tar- oder .tar.gz-Archiv hoch, sieh dir die Dateien in der Vorschau an und pushe sie zu einem GitHub-Repository.",
  },

  nav: {
    howItWorks: "So funktioniert es",
    myRepos: "Meine Repos",
    importArchive: "Archiv importieren",
    importShort: "Importieren",
    login: "Anmelden",
    start: "Loslegen",
    logout: "Abmelden",
    avatarAlt: "Avatar von {login}",
    language: "Sprache",
    languageChange: "Sprache ändern",
    languageSearch: "Sprache suchen…",
    languageCurrent: "Aktuelle Sprache: {name}",
  },

  home: {
    heroBadge: "Neu: .tar und .tar.gz",
    heroTitleLine1: "Deine Code-Archive,",
    heroTitleLine2: "per Drag-and-drop auf GitHub.",
    heroBody:
      "Ein Projekt als .rar, .zip oder .tar erhalten? GitHub verbinden, Archiv ablegen, Repository wählen — schon gepusht. Ohne Terminal, ohne Clone, ohne Einrichtung.",
    ctaStart: "Mit GitHub starten",
    ctaImport: "Archiv importieren",
    ctaHow: "So funktioniert es",
    checkSandboxed: "Sandbox-Extraktion",
    checkToken: "GitHub-Token wird nie gespeichert",
    checkFrench: "Offen: der Quellcode ist öffentlich",

    statFormats: "Archivformate",
    statFormatsSub: ".rar · .zip · .tar[.gz]",
    statCommands: "Kommandozeile",
    statCommandsSub: "alles per Klick",
    statDuration: "vom Ablegen bis zum Push",
    statDurationSub: "Vorschau inklusive",
    statDurationValue: "2 Min.",
    statLanguages: "Sprachen",
    statLanguagesSub: "Oberfläche und Meldungen",

    stepsTitle: "Wie funktioniert es?",
    stepsLead: "Drei Schritte, zwei Minuten, kein Befehl.",
    step1Title: "GitHub verbinden",
    step1Body:
      "Ein einziger Freigabe-Klick. Wir fordern nur die nötigen Berechtigungen — dein Token bleibt verschlüsselt im Browser.",
    step2Title: "Archiv ablegen",
    step2Body:
      "Zieh deine .rar, .zip oder .tar hierher. Sandbox-Extraktion, geprüfte Pfade, vollständige Vorschau vor dem Senden.",
    step3Title: "Mit einem Klick pushen",
    step3Body:
      "Erstelle ein Repository oder pushe in ein bestehendes. Der Commit entsteht mit deiner GitHub-Identität.",

    featuresTitle: "Gemacht, um einfach zu sein",
    featuresTitleAccent: "und sicher",
    featuresLead:
      "Code zu importieren soll kinderleicht sein — ohne den Server zum Sieb zu machen.",
    feature1Title: "RAR, ZIP und TAR nativ",
    feature1Body:
      ".rar (RAR4/RAR5), .zip und .tar/.tar.gz öffnen serverseitig — keine Software zu installieren, nirgends.",
    feature2Title: "Abgesicherte Extraktion",
    feature2Body:
      "Anti Zip-Slip, Anti-Dekompressionsbomben, eingebettete .git-Ordner und Symlinks aussortiert. Deine Repos bleiben sauber.",
    feature3Title: "Vorschau vor dem Push",
    feature3Body:
      "Dateien, Größen, Wurzelordner, node_modules: du siehst genau, was rausgeht, und behältst die Kontrolle.",
    feature4Title: "Null Kommandozeile",
    feature4Body:
      "Kein Clone, keine git-Credentials, kein „git push -u origin“. Das Tool erledigt alles für dich.",
    feature5Title: "Neues oder bestehendes Repo",
    feature5Body:
      "Erstelle ein privates oder öffentliches Repo oder füge das Archiv einem bestehenden hinzu — auf Wunsch auf einem eigenen Branch.",
    feature6Title: "KI-fertige Links",
    feature6Body:
      "Nach dem Push: Codespaces, vscode.dev, Clone-URL, gh-Befehl und .zip-Archiv. Ein Copy-and-paste genügt.",

    formatsTitle: "Jedes Archiv, egal wie alt",
    formatsBody:
      "Alte Windows-.rar-Dateien, exportierte .zip-Dateien, .tar.gz von einem Linux-Server: alles wird serverseitig und gestreamt gelesen, mit denselben Schutznetzen. Der einzelne Wurzelordner wird automatisch entfernt, node_modules standardmäßig ausgeschlossen.",

    securityTitle: "Was wir ablehnen, und warum",
    securityLead:
      "Das Archiv eines Fremden zu entpacken ist ein Risikosport. Hier sind die Netze unter jedem Import.",
    guard1Title: "Zip-Slip & Traversal",
    guard1Body:
      "Jeder Pfad wird geprüft (../, absolut, UNC, NUL). Ein einziger Versuch und das ganze Archiv wird abgelehnt.",
    guard2Title: "Dekompressionsbomben",
    guard2Body:
      "Angegebene Größen werden vor dem Schreiben summiert: maximal {extract} entpackt und {files} Dateien.",
    guard3Title: "GitHub-Token",
    guard3Body:
      "Verschlüsseltes httpOnly-Cookie (JWE A256GCM), Push über GIT_ASKPASS. Nie in der Datenbank, nie in Logs.",
    guard4Title: "Kontingente",
    guard4Body:
      "30 Uploads/h pro IP und 10 Pushes/h pro Nutzer, persistente Zähler: der Dienst bleibt gesund.",
    limitsNote:
      "Standardgrenzen: {upload} hochgeladen, {extract} entpackt, {files} Dateien pro Import.",

    faqTitle: "Häufige Fragen",
    faqLead:
      "Alles zum Import von Archiven zu GitHub, zu den akzeptierten Formaten und zur Privatsphäre deines Kontos.",

    ctaTitle: "Bereit, dein nächstes Archiv auf GitHub zu entleeren?",
    ctaLead: "Anmelden, ablegen, pushen. Wir kümmern uns um den Rest.",

    mockFile: "mein-projekt.tar",
    mockFileMeta: "{size} · {count} Dateien",
    mockExcluded: "ausgeschlossen",
    mockPushed: "Gepusht zu github.com/du/mein-projekt · Branch main",
  },

  faq: {
    q1: "Wie bekomme ich ein .rar- oder .zip-Archiv ohne Git auf GitHub?",
    a1: "Verbinde dein GitHub-Konto mit RepoDrop, zieh deine .rar-, .zip-, .tar- oder .tar.gz-Datei hinein, prüfe die Vorschau der extrahierten Dateien und wähle ein neues oder bestehendes Repository. RepoDrop erstellt den Commit und pusht den Code direkt unter deiner GitHub-Identität, ohne Terminal und ohne Kommandozeile.",
    q2: "Welche Archivformate und Größen werden unterstützt?",
    a2: "RepoDrop unterstützt nativ .rar- (RAR4 und RAR5), .zip-, .tar-, .tar.gz- und .tgz-Archive, serverseitig an ihren Magic Bytes erkannt. Standardmäßig darf ein Archiv bis zu {upload} komprimiert wiegen ({extract} entpackt und {files} Dateien).",
    q3: "Werden mein GitHub-Token und mein privater Quellcode gespeichert?",
    a3: "Nein. Dein GitHub-OAuth-Token liegt ausschließlich in einem verschlüsselten httpOnly-Cookie (JWE A256GCM) in deinem Browser: Er wird nie in die Datenbank oder in Logs geschrieben. Extrahierte Dateien liegen in einem isolierten temporären Bereich und werden nach dem Push automatisch gelöscht.",
    q4: "Kann ich ein Archiv in ein bestehendes GitHub-Repository senden, ohne meine Arbeit zu überschreiben?",
    a4: "Ja. Du kannst ein neues Repository anlegen (öffentlich oder privat), auf einen eigenen Branch eines bestehenden Repositories pushen, damit der Hauptbranch erhalten bleibt, oder ausdrücklich den vollständigen Ersatz mit Bestätigung wählen.",
    q5: "Was passiert beim Import mit dem einzelnen Wurzelordner und node_modules?",
    a5: "Enthält das Archiv einen einzelnen umschließenden Ordner (zum Beispiel mein-projekt/), bietet RepoDrop an, ihn automatisch zu entfernen, damit deine Dateien direkt im Repository-Wurzelverzeichnis landen. node_modules, eingebettete .git-Ordner und überflüssige Systemdateien (.DS_Store, __MACOSX) werden standardmäßig aussortiert.",
  },

  login: {
    title: "Bei RepoDrop anmelden",
    description:
      "Autorisiere den GitHub-Zugriff, um Repositories zu erstellen und deine Archive zu pushen.",
    continueWithGithub: "Mit GitHub fortfahren",
    scopesLead: "Wir fordern nur die Berechtigungen",
    scopesAnd: "und",
    scopesTail:
      "an: Repositories erstellen und Code in deinem Namen pushen (einschließlich deiner Dateien unter .github/workflows/). Dein Token wird in einem httpOnly-Cookie verschlüsselt, nie in der Datenbank gespeichert.",
    bulletCookie: "Verschlüsseltes httpOnly-Cookie (A256GCM)",
    bulletLogout: "Abmelden = Token wird aus dem Browser gelöscht",
    devMode: "Entwicklungsmodus",
    devLogin: "Direkte Anmeldung (GH_TOKEN des Servers)",
    errorState: "Die Anmeldesitzung ist abgelaufen. Versuche es erneut.",
    errorOauth: "GitHub hat die Autorisierung abgelehnt. Starte von vorn.",
    errorConfig:
      "Die App ist nicht konfiguriert: GITHUB_CLIENT_ID / GITHUB_CLIENT_SECRET setzen und neu starten.",
    errorDevauth: "Dev-Modus: das GH_TOKEN des Servers fehlt oder ist ungültig.",
    errorGeneric: "Anmeldefehler.",
  },

  importPage: {
    title: "Archiv importieren",
    lead: "Lege eine .rar-, .zip- oder .tar-Datei (auch .tar.gz) mit deinem Code ab. Du siehst eine vollständige Vorschau, bevor etwas zu GitHub geht.",
    browseLead:
      "Du willst zuerst sehen, was schon in deinem Konto liegt? Durchstöbere deine Repositories und deren Inhalt, ohne etwas zu senden.",
    browseCta: "Meine Repos durchsuchen",
    limitLabel: "Grenze:",
    limitBody: "{upload} pro Archiv, {extract} entpackt.",
    securityLabel: "Sicherheit:",
    securityBody: "geprüfte Pfade, .git und Links aussortiert.",
    afterLabel: "Danach:",
    afterBody: "Vorschau, Repository wählen, dann Push.",
  },

  uploader: {
    dropLabel: "Ein .rar-, .zip- oder .tar-Archiv ablegen",
    uploading: "Archiv wird gesendet… {progress}%",
    keepOpen: "Schließe diesen Tab nicht.",
    dropHint: "Zieh dein Archiv hierher oder klicke zum Durchsuchen",
    formatsHint: ".rar, .zip, .tar & .tar.gz — max. {max} ({extract} entpackt)",
    errorFormat:
      "Nicht unterstütztes Format: nur .rar-, .zip-, .tar- und .tar.gz-Dateien werden akzeptiert.",
    errorEmpty: "Diese Datei ist leer.",
    errorTooLarge: "Archiv zu groß (max. {max}).",
    errorHttp: "Senden fehlgeschlagen (HTTP {status}). Versuche es erneut.",
    errorNetwork: "Verbindung beim Senden verloren. Versuche es erneut.",
  },

  footer: {
    tagline:
      "Deine Code-Archive, per Drag-and-drop auf GitHub. Ohne Terminal, ohne Clone, ohne git-Einrichtung.",
    productTitle: "Produkt",
    home: "Startseite",
    importArchive: "Archiv importieren",
    howItWorks: "So funktioniert es",
    security: "Sicherheit",
    faq: "Häufige Fragen",
    formatsTitle: "Unterstützte Formate",
    guaranteesTitle: "Garantien",
    guarantee1: "GitHub-Token verschlüsselt, nie in der Datenbank gespeichert",
    guarantee2: "Sandbox-Extraktion, geprüfte Pfade",
    guarantee3: "Vollständige Vorschau vor jedem Senden",
    copyright: "© {year} RepoDrop — deine Archive, dein GitHub.",
    reserved: "Reservierter Bereich",
  },

  notFound: {
    title: "Seite nicht gefunden",
    body: "Diese Seite existiert nicht — oder der Job ist abgelaufen (Archive werden nach einer Weile gelöscht).",
    back: "Zurück zur Startseite",
  },
  jobs: {
    metaTitle: "Import verfolgen",

    statusQueued: "In der Warteschlange",
    statusExtracting: "Extraktion",
    statusReady: "Bereit zum Pushen",
    statusPushing: "Wird gepusht…",
    statusDone: "Fertig",
    statusFailed: "Fehlgeschlagen",

    extractingTitle: "Extraktion läuft…",
    extractingBody:
      "Prüfung der Pfade und Größen, Erkennung des Wurzelordners. Alles geschieht serverseitig, in einem isolierten Bereich.",
    pushingTitle: "Push zu GitHub…",
    pushingBody:
      "Der Commit wird erstellt und die Dateien werden gesendet. Der Tab kann offen bleiben, wir halten dich auf dem Laufenden.",

    failedTitle: "Der Vorgang ist fehlgeschlagen",
    failedUnknown: "Unbekannter Fehler.",
    lostConnection: "Verbindung verloren. Bitte erneut versuchen.",
    httpFailed: "Fehlgeschlagen (HTTP {status}).",
    repoMoved:
      "Das Repository {repo} hat sich seit deinem Import weiterentwickelt. Du kannst seinen Branch mit dem exakten Inhalt dieses Archivs überschreiben: Dateien, die nicht im Archiv sind, werden aus dem Repository gelöscht und der Push wird erzwungen. Die bestehende Historie bleibt erhalten (neuer Commit darüber).",
    repoMovedConfirm:
      "Bestätigst du, dass der gesamte Code dieses Repositorys durch dieses Archiv ersetzt wird?",
    replaceAllYes: "Ja, den gesamten Code ersetzen",
    replaceAllRetry: "Erneut versuchen und dabei den gesamten Code ersetzen",
    cancel: "Abbrechen",
    retryOtherArchive: "Mit einem anderen Archiv erneut versuchen",
    backHome: "Zurück zur Startseite",

    doneTitle: "Gepusht!",
    doneBody: "{count} importiert auf dem Branch",
    doneCommit: "Commit",
    doneCreated: "· Repository erstellt",
    openOnGithub: "Auf GitHub öffnen",
    copyLink: "Link kopieren",
    downloadZip: "Als .zip herunterladen",
    aiLinksTitle: "Links, die du direkt an eine KI geben kannst:",
    anotherImport: "Weiteres Archiv importieren",

    linkRepo: "GitHub-Repository",
    linkBranch: "Branch „{branch}“",
    linkBranchSub: "Auf diesen Branch pushen",
    linkCommit: "Exakter Commit",
    linkCodespaces: "Codespaces (KI-Agent von GitHub)",
    linkCodespacesSub: "vscode.dev sofort einsatzbereit, Copilot verbunden",
    linkVscode: "vscode.dev (offizieller Web-Editor)",
    linkVscodeSub: "Copilot + Bearbeiten + Ausführen (Codespaces)",
    linkClone: "Clone-URL (externer Agent)",
    linkCloneSub: "Der Agent authentifiziert sich selbst über seine GitHub-Sitzung",
    linkGh: "`gh`-CLI-Befehl",

    previewTitle: "Archivvorschau",
    previewLead: "Was nach den Sicherheitsfiltern gepusht wird.",
    previewFiles: "Dateien",
    previewSize: "Entpackte Größe",
    previewIgnored: "Ignoriert:",
    ignoredGit: ".git ({count})",
    ignoredSystemFiles: "Systemdateien ({count})",
    ignoredSymlinks: "Symlinks ({count})",
    ignoredHardlinks: "Hardlinks ({count})",
    ignoredBlocked: "blockierte Pfade ({count})",
    tooLargeForGithub:
      "{count} Datei(en) überschreiten 100 MB: GitHub wird sie wahrscheinlich ablehnen. Z. B.:",

    filtersTitle: "Importfilter",
    filtersNone: "Für dieses Archiv ist kein Filter verfügbar.",
    stripRootLabel: "Wurzelordner entfernen",
    stripRootHint:
      "Empfohlen: der Projektinhalt landet dann direkt im Repository-Stamm.",
    includeNodeModules: "Einschließen",
    includeNodeModulesHint:
      "Standardmäßig deaktiviert: schwer und in einem Repository selten nützlich.",

    destTitle: "Ziel",
    destLead: "Wohin sollen diese Dateien gepusht werden?",
    destNew: "Neues Repository",
    destExisting: "Bestehendes Repository",
    repoNameLabel: "Repository-Name",
    repoNamePlaceholder: "mein-projekt",
    repoNameInvalid:
      "Nur Buchstaben, Ziffern, Punkte, Bindestriche und Unterstriche (muss mit einem Buchstaben oder einer Ziffer beginnen).",
    visibilityLabel: "Sichtbarkeit",
    visibilityPrivate: "Privat",
    visibilityPrivateHint: "Nur für dich sichtbar",
    visibilityPublic: "Öffentlich",
    visibilityPublicHint: "Für alle sichtbar",
    searchRepo: "Repository suchen…",
    loadingRepos: "Deine Repositories werden geladen…",
    reposLoadError: "Deine Repositories konnten nicht geladen werden.",
    noWritableRepo:
      "Kein Repository mit Schreibrechten gefunden. Erstelle ein neues!",
    noRepoMatch: "Kein Repository entspricht der Suche.",
    dedicatedBranch: "Eigenen Branch erstellen",
    dedicatedHintExisting:
      "Den Standard-Branch nicht anfassen: ideal für ein gemeinsam genutztes Repository.",
    dedicatedHintNew:
      "Name des ersten Branches im neuen Repository (sonst der Standard-Branch).",
    replaceAll: "Den gesamten Code des Repositorys ersetzen",
    replaceAllHint:
      "Das Repository enthält danach genau die Dateien des Archivs: alles, was fehlt, wird gelöscht und der Push wird erzwungen — er gelingt auch, wenn das Repository inzwischen geändert wurde (kein „fetch first“-Fehler mehr). Sinnvoll, wenn das Archiv die vollständige neue Version des Projekts ist.",
    replaceConfirm:
      "Ich bestätige: Dateien des Repositorys {repo}, die nicht in diesem Archiv sind, werden endgültig aus dem gepushten Branch gelöscht.",
    replaceConfirmNoRepo:
      "Ich bestätige: Dateien des Repositorys, die nicht in diesem Archiv sind, werden endgültig aus dem gepushten Branch gelöscht.",
    advanced: "Erweiterte Optionen",
    commitMessage: "Commit-Nachricht",
    commitPlaceholder: "Import von {filename} über RepoDrop",
    pushAction: "Zu GitHub pushen",
    replacePushAction: "Den gesamten Code auf GitHub ersetzen",
    sending: "Senden…",
    replaceNeedConfirm:
      "Aktiviere die Bestätigung des Ersetzens, um die Schaltfläche freizugeben.",
    tokenNote:
      "Dein GitHub-Token bleibt in einem verschlüsselten Cookie — er wird nie in der Datenbank gespeichert.",
  },

  repos: {
    metaTitle: "Meine Repositories",
    pageTitle: "Meine Repositories",
    pageLead:
      "Sieh dir deine Repositories an, bevor du etwas importierst: Baumansicht, Dateivorschau, Branch deiner Wahl. Umbenennen, Sichtbarkeit und Löschen findest du im Tab {actions} eines Repositorys.",

    filterPlaceholder: "Nach Name, Beschreibung oder Sprache filtern…",
    filterAria: "Repositories filtern",
    sortAria: "Sortieren",
    sortPushed: "Letzte Aktivität",
    sortName: "Name (A→Z)",
    sortSize: "Größe",
    mine: "Meine",
    refresh: "Aktualisieren",
    errorList: "Liste nicht verfügbar (HTTP {status}).",
    errorServer: "Der Server ist nicht erreichbar.",
    truncated:
      "Nur die 300 neuesten Repositories sind geladen. Grenze die Liste mit dem Filter oben ein.",
    loading: "Deine Repositories werden geladen…",
    emptyFilter: "Kein Repository entspricht diesem Filter.",
    emptyToken: "Mit diesem GitHub-Token ist kein Repository sichtbar.",
    countAll: "{count} Repository(s)",
    countFiltered: "{count} von {total}",
    countHint: "— klicke, um den Inhalt anzusehen.",
    noDescription: "Keine Beschreibung",
    pushedAgo: "gepusht {when}",
    issues: "{count} Issue(s)",
    readOnly: "schreibgeschützt",

    backToList: "Zurück zur Liste",
    list: "Liste",
    badgePrivate: "privat",
    badgePublic: "öffentlich",
    badgeArchived: "archiviert",
    badgeFork: "Fork",
    badgeReadOnly: "schreibgeschützt",
    branchProtected: "(geschützt)",
    downloadTitle: "{repo} als .{format} herunterladen",
    downloadTitleRef: "{repo} ({ref}) als .{format} herunterladen",
    actionsTab: "Aktionen",
    loadingRepo: "Repository wird geladen…",
    inaccessible: "Repository nicht erreichbar.",
    inaccessibleHttp: "Repository nicht erreichbar (HTTP {status}).",
    errorServerJoin: "Der Server ist nicht erreichbar.",
    copyDenied: "Kopieren wurde vom Browser abgelehnt.",
    reloadFolder: "Diesen Ordner neu laden",
    root: "Stamm",
    entries: "{count} Eintrag/Einträge",
    loadingShort: "Wird geladen…",
    emptyRepo:
      "Dieses Repository enthält noch keine Datei. Importiere ein Archiv, um es zu füllen.",
    loadingFile: "Datei wird geladen…",
    selectFile: "Wähle eine Datei, um sie anzusehen.",
    lines: "{count} Zeilen",
    copy: "Kopieren",
    copied: "Kopiert",
    raw: "Roh",
    fileTooBig: "Datei zu groß für die Vorschau ({size}). Öffne sie auf GitHub.",
    fileBinary: "Binärdatei ({size}): keine Textvorschau.",

    actionsTitle: "Umbenennen / beschreiben",
    nameLabel: "Repository-Name",
    renameWarning:
      "Umbenennen bricht bestehende Clones, Links und GitHub-Seiten. GitHub leitet den alten Namen weiter, aber nicht dauerhaft.",
    descLabel: "Beschreibung",
    descPlaceholder: "Wozu dient dieses Repository?",
    save: "Speichern",
    writeInsufficient: "Unzureichende Schreibrechte auf diesem Repository.",
    visibilityTitle: "Sichtbarkeit",
    visibilityCurrently: "Aktuell {visibility}.",
    visibilityToPrivate:
      " Wenn du es privat machst, verlieren alle anonymen Nutzer den Zugriff.",
    visibilityToPublic:
      " Wenn du es öffentlich machst, wird die gesamte Commit-Historie sichtbar.",
    makePublic: "Öffentlich machen",
    makePrivate: "Privat machen",
    dangerZone: "Gefahrenzone",
    deleteWarning:
      "Das Löschen ist endgültig: Code, Historie, Issues und Wiki.",
    deleteRepo: "Repository löschen",
    deleteTitle: "{repo} löschen",
    deleteConfirmBody:
      "Keine Wiederherstellung möglich. Gib {name} ein, um die Schaltfläche freizugeben.",
    deleteForever: "Endgültig löschen",
    cancel: "Abbrechen",
    updated: "Repository aktualisiert.",
    deleted: "Repository {repo} gelöscht.",
    httpFailed: "Fehlgeschlagen (HTTP {status}).",
  },

  api: {
    authRequired: "Anmeldung erforderlich.",
    jobNotFound: "Job nicht gefunden.",
    jobNotReady: "Dieser Job ist noch nicht bereit.",
    jobNotPushable: "Dieser Job ist nicht bereit zum Pushen.",
    invalidJson: "Ungültiger JSON-Inhalt.",
    invalidMultipart: "Ungültige Anfrage (multipart/form-data erwartet).",
    emptyBody: "Leerer Anfrageinhalt.",
    emptyArchive: "Das Archiv ist leer.",
    uploadFailed: "Die Datei konnte nicht empfangen werden. Bitte erneut versuchen.",
    repoNameRequired:
      "Ein Repository-Name ist erforderlich, um ein neues Repository zu erstellen.",
    branchNameTooLong: "Branch-Name zu lang.",
    invalidOptions: "Ungültige Optionen.",
    invalidChange: "Ungültige Änderung.",
    noChange: "Keine Änderung.",
    pathRequired: "Parameter „path“ erforderlich.",
  },
  errors: {
    encrypted:
      "Dieses Archiv ist passwortgeschützt, was derzeit nicht unterstützt wird.",
    tooManyFiles: "Zu viele Dateien im Archiv (Grenze erreicht).",
    tooBig:
      "Der entpackte Inhalt überschreitet die erlaubte Größe. Verkleinere das Archiv (node_modules?).",
    empty: "Dieses Archiv enthält keine verwertbare Datei.",
    corrupt:
      "Archiv unlesbar oder beschädigt. Prüfe die Datei und versuche es erneut.",
    unsupported:
      "Nicht unterstütztes Format (unbekanntes Komprimierungsverfahren oder Archivvariante).",
    volume:
      "Mehrteilige RAR-Archive (.part1.rar, .part2.rar…) werden nicht unterstützt.",
    unsafePaths:
      "Das Archiv enthält gefährliche Dateipfade (Traversal) und wurde abgelehnt.",
    pathLimits:
      "Ein Dateipfad überschreitet die erlaubten Grenzen (Tiefe oder Länge).",
    timeout: "Die Extraktion hat zu lange gedauert und wurde abgebrochen.",
    rateLimited: "Zu viele Anfragen. Warte einen Moment und versuche es erneut.",
    notFound: "Ressource nicht gefunden.",
    forbidden:
      "Du hast keine Schreibrechte für dieses Repository (oder dem GitHub-Token fehlt der richtige Scope).",
    repoExists: "Ein Repository mit diesem Namen existiert bereits in deinem Konto.",
    nameInvalid: "Ungültiger Repository- oder Branch-Name.",
    noChanges:
      "Nichts zu pushen: die Dateien entsprechen bereits dem Ziel-Repository.",
    conflict:
      "Das Ziel-Repository hat sich inzwischen geändert. Versuche es erneut, pushe auf einen eigenen Branch oder starte neu mit „Gesamten Code ersetzen“, um den Branch mit dem Inhalt des Archivs zu überschreiben.",
    scopeMissing:
      "GitHub verweigert Änderungen an Workflow-Dateien (.github/workflows/…): dem Token fehlt der Scope „workflow“. Melde dich ab und wieder an, um ihn zu erteilen.",
    gitFailed: "Der Push zu GitHub ist fehlgeschlagen.",
    interrupted: "Die Verarbeitung wurde unterbrochen (Serverneustart).",
    badPath: "Ungültiger Dateipfad.",
    confirmMismatch:
      "Die Bestätigung entspricht nicht dem Repository-Namen: nichts wurde gelöscht.",
    archiveTooBig:
      "Dieses Repository ist zu groß, um als Archiv heruntergeladen zu werden.",
    internal: "Unerwarteter interner Fehler. Versuche es gleich noch einmal.",
  },
};
