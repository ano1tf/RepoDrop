import type { Dict } from "../types";

export const nl: Dict = {
  meta: {
    title: "RepoDrop — Importeer je .rar-, .zip- en .tar-archieven naar GitHub",
    description:
      "Sleep een .rar-, .zip-, .tar- of .tar.gz-archief en push je code met één klik naar GitHub. Veilige extractie, voorbeeld voor het uploaden, zonder terminal en zonder git.",
    loginTitle: "Inloggen met GitHub",
    loginDescription:
      "Koppel je GitHub-account aan RepoDrop om een repository aan te maken en je .rar-, .zip- of .tar-archieven met één klik te pushen. Token versleuteld, nooit in de database opgeslagen.",
    importTitle: "Een archief importeren",
    importDescription:
      "Upload een .rar-, .zip-, .tar- of .tar.gz-archief om de bestanden te bekijken en het naar een GitHub-repository te pushen.",
    jobTitle: "Importvolgsysteem",
  },

  nav: {
    howItWorks: "Hoe het werkt",
    myRepos: "Mijn repo's",
    importArchive: "Een archief importeren",
    importShort: "Importeren",
    login: "Inloggen",
    start: "Beginnen",
    logout: "Uitloggen",
    avatarAlt: "Avatar van {login}",
    language: "Taal",
    languageChange: "Taal wijzigen",
    languageSearch: "Zoek een taal…",
    languageCurrent: "Huidige taal: {name}",
  },

  home: {
    heroBadge: "Nieuw: .tar en .tar.gz",
    heroTitleLine1: "Jouw code-archieven,",
    heroTitleLine2: "op GitHub met slepen en neerzetten.",
    heroBody:
      "Een project als .rar, .zip of .tar ontvangen? Koppel GitHub, sleep het archief erin, kies de repository — en het staat erop. Zonder terminal, zonder clone, zonder configuratie.",
    ctaStart: "Beginnen met GitHub",
    ctaImport: "Een archief importeren",
    ctaHow: "Hoe het werkt",
    checkSandboxed: "Extractie in sandbox",
    checkToken: "GitHub-token nooit opgeslagen",
    checkFrench: "Open werkwijze",

    statFormats: "archiefformaten",
    statFormatsSub: ".rar · .zip · .tar[.gz]",
    statCommands: "opdrachtregel",
    statCommandsSub: "alles met één klik",
    statDuration: "van upload tot push",
    statDurationSub: "voorbeeld inbegrepen",
    statLanguages: "talen",
    statLanguagesSub: "interface en meldingen",

    stepsTitle: "Hoe werkt het?",
    stepsLead: "Drie stappen, twee minuten, geen enkele opdracht.",
    step1Title: "Koppel GitHub",
    step1Body:
      "Eén klik om te autoriseren. We vragen alleen de nodige scopes — je token blijft versleuteld in je browser.",
    step2Title: "Sleep het archief erin",
    step2Body:
      "Sleep je .rar, .zip of .tar. Extractie in sandbox, gecontroleerde paden, volledig voorbeeld voor het versturen.",
    step3Title: "Push met één klik",
    step3Body:
      "Maak een repository of push naar een bestaande. De commit wordt gemaakt met jouw GitHub-identiteit.",

    featuresTitle: "Ontworpen om eenvoudig te zijn",
    featuresTitleAccent: "en veilig",
    featuresLead:
      "Code importeren moet kinderspel zijn — zonder de server tot vergiet te maken.",
    feature1Title: "RAR, ZIP en TAR native",
    feature1Body:
      ".rar (RAR4/RAR5), .zip en .tar/.tar.gz openen server-side — geen software te installeren, nergens.",
    feature2Title: "Dichtgetimmerde extractie",
    feature2Body:
      "Anti zip-slip, anti decompressiebommen, ingebedde .git-mappen en symlinks weggegooid. Je repo's blijven schoon.",
    feature3Title: "Voorbeeld voor de push",
    feature3Body:
      "Bestanden, groottes, hoofdmap, node_modules: je ziet precies wat er vertrekt en houdt de controle.",
    feature4Title: "Nul opdrachtregel",
    feature4Body:
      "Geen clone, geen git-referenties, geen ‘git push -u origin’. De tool doet alles voor je.",
    feature5Title: "Nieuwe of bestaande repo",
    feature5Body:
      "Maak een privé- of openbare repo, of voeg het archief toe aan een bestaande — op een aparte branch als je dat wilt.",

    formatsTitle: "Elk archief, hoe oud ook",
    formatsBody:
      "Oude Windows-.rar-bestanden, geëxporteerde .zip-bestanden, .tar.gz van een Linux-server: alles wordt server-side gelezen, gestreamd, met dezelfde vangnetten. De enkele hoofdmap wordt automatisch verwijderd en node_modules is standaard uitgesloten.",

    securityTitle: "Wat we weigeren, en waarom",
    securityLead:
      "Het archief van een onbekende uitpakken is een riskante sport. Dit zijn de netten onder elke import.",
    guard1Title: "Zip-slip & traversal",
    guard1Body:
      "Elk pad wordt gevalideerd (../, absoluut, UNC, NUL). Eén poging en het hele archief wordt geweigerd.",
    guard2Title: "Decompressiebommen",
    guard2Body:
      "Opgegeven groottes worden opgeteld vóór het schrijven: maximaal {extract} uitgepakt en {files} bestanden.",
    guard3Title: "GitHub-token",
    guard3Body:
      "Versleutelde httpOnly-cookie (JWE A256GCM), push via GIT_ASKPASS. Nooit in de database, nooit in logs.",
    guard4Title: "Quota",
    guard4Body:
      "30 uploads/u per IP en 10 pushes/u per gebruiker, persistente tellers: de dienst blijft gezond.",
    limitsNote:
      "Standaardlimieten: {upload} geüpload, {extract} uitgepakt, {files} bestanden per import.",

    faqTitle: "Veelgestelde vragen",
    faqLead:
      "Alles over het importeren van archieven naar GitHub, de geaccepteerde formaten en de privacy van je account.",

    ctaTitle: "Klaar om je volgende archief op GitHub te legen?",
    ctaLead: "Log in, sleep, push. Wij doen de rest.",

    mockFile: "mijn-project.zip",
    mockFileMeta: "{size} · {count} bestanden",
    mockExcluded: "uitgesloten",
    mockPushed: "Gepusht naar github.com/jij/mijn-project · branch main",

    demoEyebrow: "De magie, vóór het inloggen",
    demoTitle: "Van archief naar GitHub-repo in seconden.",
    demoTitleAccent: "Zonder terminal.",
    demoLead: "Sleep, check de preview, push. Geen commando's, niets gaat weg zonder jouw akkoord.",
    demoStep1: "Lokaal archief",
    demoStep2: "Extractie gecheckt",
    demoStep3: "Repo klaar",
    demoFileMeta: "18,4 MB · 1.284 bestanden",
    demoScan: "Paden gecheckt",
    demoPushed: "Gepusht · net nu",
    demoBranches: "main",
    demoNoAccount: "Geen account, geen terminal.",
    demoLocalBadge: "Lokaal",
    demoDropHint: "Sleep hier een .zip",
    demoDropBrowse: "of kies een bestand",
    demoDropCta: "Een archief importeren",
    demoDropError: "Alleen .zip-bestanden worden geaccepteerd.",
    demoReading: "Archief wordt gelezen…",
    demoExtracting: "Uitpakken…",
    demoReady: "Klaar om te pushen",
    demoReadyMeta: "{count} bestanden gevonden · niets verliet je browser",
    demoPushCta: "Naar GitHub pushen",
    demoLocalNote: "Je bestanden blijven in je browser — er wordt niets geüpload.",
    demoConnectTitle: "Bestand klaar!",
    demoConnectBody: "Verbind je GitHub-account om de push af te ronden.",
    demoConnectNote: "Het archief verliet je browser niet — het wordt gepusht vanuit je GitHub-sessie.",
    demoConnectCta: "Inloggen met GitHub",
    demoConnectLater: "Later",
  },

  faq: {
    q1: "Hoe zet ik een .rar- of .zip-archief op GitHub zonder Git te gebruiken?",
    a1: "Koppel je GitHub-account op RepoDrop, sleep je .rar-, .zip-, .tar- of .tar.gz-bestand erin, controleer het voorbeeld van de uitgepakte bestanden en kies een nieuwe of bestaande repository. RepoDrop maakt de commit en pusht de code rechtstreeks onder jouw GitHub-identiteit, zonder terminal en zonder opdrachtregel.",
    q2: "Welke archiefformaten en groottes worden ondersteund?",
    a2: "RepoDrop ondersteunt native .rar- (RAR4 en RAR5), .zip-, .tar-, .tar.gz- en .tgz-archieven, server-side herkend aan hun magic bytes. Standaard mag een archief tot {upload} gecomprimeerd wegen ({extract} uitgepakt en {files} bestanden).",
    q3: "Worden mijn GitHub-token en privécode opgeslagen?",
    a3: "Nee. Je GitHub OAuth-token leeft alleen in een versleutelde httpOnly-cookie (JWE A256GCM) in je browser: het wordt nooit naar de database of de logs geschreven. Uitgepakte bestanden staan in een geïsoleerde tijdelijke ruimte en worden na de push automatisch opgeruimd.",
    q4: "Kan ik een archief naar een bestaande GitHub-repository sturen zonder mijn werk te overschrijven?",
    a4: "Ja. Je kunt een gloednieuwe repository maken (openbaar of privé), pushen naar een aparte branch van een bestaande repository zodat de hoofdbranch behouden blijft, of expliciet de volledige vervanging met bevestiging kiezen.",
    q5: "Wat gebeurt er tijdens de import met de enkele hoofdmap en node_modules?",
    a5: "Bevat het archief één omhullende map (bijvoorbeeld mijn-project/), dan biedt RepoDrop aan die automatisch te verwijderen zodat je bestanden direct in de root van de repository staan. node_modules, ingebedde .git-mappen en overbodige systeembestanden (.DS_Store, __MACOSX) worden standaard weggegooid.",
  },

  login: {
    title: "Inloggen bij RepoDrop",
    description:
      "Geef toegang tot GitHub om repositories te maken en je archieven te pushen.",
    continueWithGithub: "Doorgaan met GitHub",
    scopesLead: "We vragen alleen de scopes",
    scopesAnd: "en",
    scopesTail:
      "aan: repositories maken en code in jouw naam pushen (inclusief je bestanden onder .github/workflows/). Je token wordt versleuteld in een httpOnly-cookie, nooit in de database opgeslagen.",
    bulletCookie: "Versleutelde httpOnly-cookie (A256GCM)",
    bulletLogout: "Uitloggen = token gewist uit de browser",
    devMode: "Ontwikkelmodus",
    devLogin: "Direct inloggen (GH_TOKEN van de server)",
    errorState: "De inlogsessie is verlopen. Probeer opnieuw.",
    errorOauth: "GitHub weigerde de autorisatie. Begin opnieuw.",
    errorConfig:
      "De app is niet geconfigureerd: stel GITHUB_CLIENT_ID / GITHUB_CLIENT_SECRET in en herstart.",
    errorDevauth: "Dev-modus: de GH_TOKEN van de server ontbreekt of is ongeldig.",
    errorGeneric: "Inlogfout.",
  },

  importPage: {
    title: "Een archief importeren",
    dropTitle: "Sleep je archief hierheen om het naar GitHub te pushen.",
    lead: "Sleep een .rar-, .zip- of .tar-bestand (ook .tar.gz) met je code erin. Je ziet een volledig voorbeeld voordat er iets naar GitHub gaat.",
    browseLead:
      "Wil je eerst zien wat er al in je account staat? Blader door je repo's en hun inhoud zonder iets te versturen.",
    browseCta: "Mijn repo's doorbladeren",
    limitLabel: "Limiet:",
    limitBody: "{upload} per archief, {extract} uitgepakt.",
    securityLabel: "Veiligheid:",
    securityBody: "gecontroleerde paden, .git en links weggegooid.",
    afterLabel: "Daarna:",
    afterBody: "voorbeeld, repo kiezen, dan pushen.",
  },

  uploader: {
    dropLabel: "Een .rar-, .zip- of .tar-archief neerzetten",
    uploading: "Archief wordt verzonden… {progress}%",
    keepOpen: "Sluit dit tabblad niet.",
    dropHint: "Sleep je archief hierheen of klik om te bladeren",
    formatsHint: ".rar, .zip, .tar & .tar.gz — max. {max} ({extract} uitgepakt)",
    errorFormat:
      "Niet-ondersteund formaat: alleen .rar-, .zip-, .tar- en .tar.gz-bestanden worden geaccepteerd.",
    errorEmpty: "Dit bestand is leeg.",
    errorTooLarge: "Archief te groot (max. {max}).",
    errorHttp: "Verzenden mislukt (HTTP {status}). Probeer opnieuw.",
    errorNetwork: "Verbinding verbroken tijdens het verzenden. Probeer opnieuw.",
  },

  footer: {
    tagline:
      "Je code-archieven, op GitHub, met slepen en neerzetten. Zonder terminal, zonder clone, zonder git-configuratie.",
    productTitle: "Product",
    home: "Start",
    importArchive: "Een archief importeren",
    howItWorks: "Hoe het werkt",
    security: "Veiligheid",
    faq: "Veelgestelde vragen",
    formatsTitle: "Ondersteunde formaten",
    guaranteesTitle: "Garanties",
    guarantee1: "GitHub-token versleuteld, nooit in de database opgeslagen",
    guarantee2: "Extractie in sandbox, gecontroleerde paden",
    guarantee3: "Volledig voorbeeld voor elk versturen",
    copyright: "© {year} RepoDrop — jouw archieven, jouw GitHub.",
    reserved: "Besloten gedeelte",
  },

  job: {
    statusQueued: "In wachtrij",
    statusExtracting: "Uitpakken",
    statusReady: "Klaar om te pushen",
    statusPushing: "Bezig met pushen…",
    statusDone: "Klaar",
    statusFailed: "Mislukt",
    extractingTitle: "Uitpakken…",
    extractingBody: "Paden worden gecontroleerd, het groottelimiet toegepast en de wortelmap herkend. Alles gebeurt server-side, in een geïsoleerde ruimte.",
    pushingTitle: "Pussen naar GitHub…",
    pushingBody: "De commit wordt aangemaakt en de bestanden worden verstuurd. Je kunt dit tabblad open laten — we houden je op de hoogte.",
    doneTitle: "Het is gepusht!",
    doneFiles: "{count} bestanden geïmporteerd op branch {branch}",
    doneCommit: "commit {sha}",
    doneCreated: "repository aangemaakt",
    doneOpenGithub: "Openen op GitHub",
    doneCopyLink: "Link kopiëren",
    doneDownload: "Downloaden als .zip",
    doneImportAnother: "Nog een archief importeren",
  },

  notFound: {
    title: "Pagina niet gevonden",
    body: "Deze pagina bestaat niet — of de job is verlopen (archieven worden na verloop van tijd opgeruimd).",
    back: "Terug naar start",
  },
};
