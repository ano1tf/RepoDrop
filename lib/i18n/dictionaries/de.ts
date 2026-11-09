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
    checkFrench: "Offener Workflow",

    statFormats: "Archivformate",
    statFormatsSub: ".rar · .zip · .tar[.gz]",
    statCommands: "Kommandozeile",
    statCommandsSub: "alles per Klick",
    statDuration: "vom Ablegen bis zum Push",
    statDurationSub: "Vorschau inklusive",
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

    mockFile: "mein-projekt.zip",
    mockFileMeta: "{size} · {count} Dateien",
    mockExcluded: "ausgeschlossen",
    mockPushed: "Gepusht zu github.com/du/mein-projekt · Branch main",

    demoEyebrow: "Die Magie vor dem Login",
    demoTitle: "Vom Archiv zum GitHub-Repo – in Sekunden.",
    demoTitleAccent: "Ohne Terminal.",
    demoLead: "Reinziehen, Vorschau prüfen, pushen. Keine Befehle, und nichts geht raus ohne dein Okay.",
    demoStep1: "Lokales Archiv",
    demoStep2: "Extraktion geprüft",
    demoStep3: "Repo bereit",
    demoFileMeta: "18,4 MB · 1.284 Dateien",
    demoPreview: "Vorschau",
    demoScan: "Pfade geprüft",
    demoPushed: "Gepusht · gerade eben",
    demoBranches: "main",
    demoNoAccount: "Kein Account, kein Terminal.",
    demoPreviewNote: "Nur eine Vorschau. Verbinde GitHub, um hochzuladen.",
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
};
