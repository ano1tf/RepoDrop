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
    checkFrench: "Open: de code is openbaar",

    statFormats: "archiefformaten",
    statFormatsSub: ".rar · .zip · .tar[.gz]",
    statCommands: "opdrachtregel",
    statCommandsSub: "alles met één klik",
    statDuration: "van upload tot push",
    statDurationSub: "voorbeeld inbegrepen",
    statDurationValue: "2 min",
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
    feature6Title: "AI-klare links",
    feature6Body:
      "Na de push: Codespaces, vscode.dev, clone-URL, gh-opdracht en .zip-archief. Eén kopieer-en-plak volstaat.",

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

    mockFile: "mijn-project.tar",
    mockFileMeta: "{size} · {count} bestanden",
    mockExcluded: "uitgesloten",
    mockPushed: "Gepusht naar github.com/jij/mijn-project · branch main",
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

  notFound: {
    title: "Pagina niet gevonden",
    body: "Deze pagina bestaat niet — of de job is verlopen (archieven worden na verloop van tijd opgeruimd).",
    back: "Terug naar start",
  },
  jobs: {
    metaTitle: "Import volgen",

    statusQueued: "In de wachtrij",
    statusExtracting: "Uitpakken",
    statusReady: "Klaar om te pushen",
    statusPushing: "Bezig met pushen…",
    statusDone: "Voltooid",
    statusFailed: "Mislukt",

    extractingTitle: "Bezig met uitpakken…",
    extractingBody:
      "Paden en groottes worden gecontroleerd, de hoofdmap wordt gedetecteerd. Alles gebeurt op de server, in een geïsoleerde ruimte.",
    pushingTitle: "Pushen naar GitHub…",
    pushingBody:
      "De commit wordt aangemaakt en de bestanden worden verstuurd. Je kunt dit tabblad open laten: we houden je op de hoogte.",

    failedTitle: "De bewerking is mislukt",
    failedUnknown: "Onbekende fout.",
    lostConnection: "Verbinding verbroken. Probeer het opnieuw.",
    httpFailed: "Mislukt (HTTP {status}).",
    repoMoved:
      "De repository {repo} is sinds je import verder gegaan. Je kunt zijn branch overschrijven met de exacte inhoud van dit archief: bestanden die niet in het archief zitten, worden uit de repository verwijderd en de push wordt geforceerd. De bestaande geschiedenis blijft behouden (nieuwe commit erbovenop).",
    repoMovedConfirm:
      "Bevestig je dat alle code van deze repository door dit archief wordt vervangen?",
    replaceAllYes: "Ja, alle code vervangen",
    replaceAllRetry: "Opnieuw proberen met vervanging van alle code",
    cancel: "Annuleren",
    retryOtherArchive: "Opnieuw proberen met een ander archief",
    backHome: "Terug naar home",

    doneTitle: "Gepusht!",
    doneBody: "{count} geïmporteerd op de branch",
    doneCommit: "commit",
    doneCreated: "· repository aangemaakt",
    openOnGithub: "Openen op GitHub",
    copyLink: "Link kopiëren",
    downloadZip: "Downloaden als .zip",
    aiLinksTitle: "Links die je zo aan een AI kunt geven:",
    anotherImport: "Nog een archief importeren",

    linkRepo: "GitHub-repository",
    linkBranch: "Branch ‘{branch}’",
    linkBranchSub: "Push naar deze branch",
    linkCommit: "Exacte commit",
    linkCodespaces: "Codespaces (AI-agent van GitHub)",
    linkCodespacesSub: "vscode.dev direct bruikbaar, Copilot verbonden",
    linkVscode: "vscode.dev (officiële webeditor)",
    linkVscodeSub: "Copilot + bewerken + uitvoeren (Codespaces)",
    linkClone: "Clone-URL (externe agent)",
    linkCloneSub: "De agent authenticeert zichzelf via zijn GitHub-sessie",
    linkGh: "`gh`-CLI-opdracht",

    previewTitle: "Voorbeeld van het archief",
    previewLead: "Wat er wordt gepusht, na de veiligheidsfilters.",
    previewFiles: "Bestanden",
    previewSize: "Uitgepakte grootte",
    previewIgnored: "Genegeerd:",
    ignoredGit: ".git ({count})",
    ignoredSystemFiles: "systeembestanden ({count})",
    ignoredSymlinks: "symlinks ({count})",
    ignoredHardlinks: "hardlinks ({count})",
    ignoredBlocked: "geblokkeerde paden ({count})",
    tooLargeForGithub:
      "{count} bestand(en) zijn groter dan 100 MB: GitHub weigert ze waarschijnlijk. Bijv.:",

    filtersTitle: "Importfilters",
    filtersNone: "Geen filter beschikbaar voor dit archief.",
    stripRootLabel: "De hoofdmap verwijderen",
    stripRootHint:
      "Aanbevolen: de projectinhoud komt dan direct in de hoofdmap van de repository.",
    includeNodeModules: "Meenemen",
    includeNodeModulesHint:
      "Standaard uitgeschakeld: zwaar en zelden nuttig in een repository.",

    destTitle: "Bestemming",
    destLead: "Waar moeten deze bestanden naartoe?",
    destNew: "Nieuwe repository",
    destExisting: "Bestaande repository",
    repoNameLabel: "Naam van de repository",
    repoNamePlaceholder: "mijn-project",
    repoNameInvalid:
      "Alleen letters, cijfers, punten, koppeltekens en underscores (moet beginnen met een letter of cijfer).",
    visibilityLabel: "Zichtbaarheid",
    visibilityPrivate: "Privé",
    visibilityPrivateHint: "Alleen voor jou zichtbaar",
    visibilityPublic: "Openbaar",
    visibilityPublicHint: "Voor iedereen zichtbaar",
    searchRepo: "Een repository zoeken…",
    loadingRepos: "Je repositories worden geladen…",
    reposLoadError: "Je repositories konden niet worden geladen.",
    noWritableRepo:
      "Geen repository met schrijfrechten gevonden. Maak er een nieuwe aan!",
    noRepoMatch: "Geen repository komt overeen met de zoekopdracht.",
    dedicatedBranch: "Een aparte branch aanmaken",
    dedicatedHintExisting:
      "De standaardbranch niet aanraken: ideaal voor een gedeelde repository.",
    dedicatedHintNew:
      "Naam van de eerste branch van de nieuwe repository (anders de standaardbranch).",
    replaceAll: "Alle code van de repository vervangen",
    replaceAllHint:
      "De repository bevat daarna precies de bestanden van het archief: wat er niet in zit, wordt verwijderd en de push wordt geforceerd — hij lukt dus ook als de repository intussen is gewijzigd (geen ‘fetch first’-fout meer). Gebruik dit wanneer het archief de volledige nieuwe versie van het project is.",
    replaceConfirm:
      "Ik bevestig: bestanden van de repository {repo} die niet in dit archief zitten, worden definitief uit de gepushte branch verwijderd.",
    replaceConfirmNoRepo:
      "Ik bevestig: bestanden van de repository die niet in dit archief zitten, worden definitief uit de gepushte branch verwijderd.",
    advanced: "Geavanceerde opties",
    commitMessage: "Commit-bericht",
    commitPlaceholder: "Import van {filename} via RepoDrop",
    pushAction: "Naar GitHub pushen",
    replacePushAction: "Alle code op GitHub vervangen",
    sending: "Versturen…",
    replaceNeedConfirm:
      "Vink de bevestiging van het vervangen aan om de knop te activeren.",
    tokenNote:
      "Je GitHub-token blijft in een versleutelde cookie — het wordt nooit in de database opgeslagen.",
  },

  repos: {
    metaTitle: "Mijn repositories",
    pageTitle: "Mijn repositories",
    pageLead:
      "Bekijk je repositories voordat je iets importeert: boomstructuur, bestandsvoorbeeld, branch naar keuze. Hernoemen, zichtbaarheid en verwijderen vind je op het tabblad {actions} van een repository.",

    filterPlaceholder: "Filteren op naam, beschrijving of taal…",
    filterAria: "Repositories filteren",
    sortAria: "Sorteren",
    sortPushed: "Recente activiteit",
    sortName: "Naam (A→Z)",
    sortSize: "Grootte",
    mine: "De mijne",
    refresh: "Vernieuwen",
    errorList: "Lijst niet beschikbaar (HTTP {status}).",
    errorServer: "Kan de server niet bereiken.",
    truncated:
      "Alleen de 300 meest recente repositories zijn geladen. Verfijn met het filter hierboven.",
    loading: "Je repositories worden geladen…",
    emptyFilter: "Geen repository komt overeen met dit filter.",
    emptyToken: "Geen repository zichtbaar met dit GitHub-token.",
    countAll: "{count} repository('s)",
    countFiltered: "{count} van {total}",
    countHint: "— klik om de inhoud te bekijken.",
    noDescription: "Geen beschrijving",
    pushedAgo: "gepusht {when}",
    issues: "{count} issue(s)",
    readOnly: "alleen lezen",

    backToList: "Terug naar de lijst",
    list: "Lijst",
    badgePrivate: "privé",
    badgePublic: "openbaar",
    badgeArchived: "gearchiveerd",
    badgeFork: "fork",
    badgeReadOnly: "alleen lezen",
    branchProtected: "(beschermd)",
    downloadTitle: "{repo} downloaden als .{format}",
    downloadTitleRef: "{repo} ({ref}) downloaden als .{format}",
    actionsTab: "Acties",
    loadingRepo: "Repository wordt geladen…",
    inaccessible: "Repository niet bereikbaar.",
    inaccessibleHttp: "Repository niet bereikbaar (HTTP {status}).",
    errorServerJoin: "Kan de server niet bereiken.",
    copyDenied: "Kopiëren geweigerd door de browser.",
    reloadFolder: "Deze map opnieuw laden",
    root: "hoofdmap",
    entries: "{count} item(s)",
    loadingShort: "Laden…",
    emptyRepo:
      "Deze repository bevat nog geen bestanden. Importeer een archief om hem te vullen.",
    loadingFile: "Bestand wordt geladen…",
    selectFile: "Selecteer een bestand om het te bekijken.",
    lines: "{count} regels",
    copy: "Kopiëren",
    copied: "Gekopieerd",
    raw: "Ruw",
    fileTooBig:
      "Bestand te groot voor het voorbeeld ({size}). Open het op GitHub.",
    fileBinary: "Binair bestand ({size}): geen tekstvoorbeeld.",

    actionsTitle: "Hernoemen / beschrijven",
    nameLabel: "Naam van de repository",
    renameWarning:
      "Hernoemen breekt bestaande clones, links en GitHub-pagina's. GitHub verwijst de oude naam door, maar niet voor altijd.",
    descLabel: "Beschrijving",
    descPlaceholder: "Waar dient deze repository voor?",
    save: "Opslaan",
    writeInsufficient: "Onvoldoende schrijfrechten op deze repository.",
    visibilityTitle: "Zichtbaarheid",
    visibilityCurrently: "Momenteel {visibility}.",
    visibilityToPrivate:
      " Privé maken ontneemt alle anonieme gebruikers de toegang.",
    visibilityToPublic:
      " Openbaar maken stelt de hele commitgeschiedenis tentoon.",
    makePublic: "Openbaar maken",
    makePrivate: "Privé maken",
    dangerZone: "Gevarenzone",
    deleteWarning:
      "Verwijderen is definitief: code, geschiedenis, issues en wiki.",
    deleteRepo: "De repository verwijderen",
    deleteTitle: "{repo} verwijderen",
    deleteConfirmBody:
      "Geen herstel mogelijk. Typ {name} om de knop vrij te geven.",
    deleteForever: "Definitief verwijderen",
    cancel: "Annuleren",
    updated: "Repository bijgewerkt.",
    deleted: "Repository {repo} verwijderd.",
    httpFailed: "Mislukt (HTTP {status}).",
  },

  api: {
    authRequired: "Authenticatie vereist.",
    jobNotFound: "Job niet gevonden.",
    jobNotReady: "Deze job is nog niet klaar.",
    jobNotPushable: "Deze job is niet klaar om te pushen.",
    invalidJson: "Ongeldige JSON-inhoud.",
    invalidMultipart: "Ongeldig verzoek (multipart/form-data verwacht).",
    emptyBody: "Lege verzoekinhoud.",
    emptyArchive: "Het archief is leeg.",
    uploadFailed: "Het bestand kon niet worden ontvangen. Probeer het opnieuw.",
    repoNameRequired:
      "Een repositorynaam is vereist om een nieuwe repository aan te maken.",
    branchNameTooLong: "Branchnaam te lang.",
    invalidOptions: "Ongeldige opties.",
    invalidChange: "Ongeldige wijziging.",
    noChange: "Geen wijziging.",
    pathRequired: "Parameter ‘path’ vereist.",
  },
  errors: {
    encrypted:
      "Dit archief is met een wachtwoord beveiligd, wat nog niet wordt ondersteund.",
    tooManyFiles: "Te veel bestanden in het archief (limiet bereikt).",
    tooBig:
      "De uitgepakte inhoud overschrijdt de toegestane grootte. Verklein het archief (node_modules?).",
    empty: "Dit archief bevat geen bruikbaar bestand.",
    corrupt:
      "Archief onleesbaar of beschadigd. Controleer het bestand en probeer het opnieuw.",
    unsupported:
      "Niet-ondersteund formaat (onbekende compressiemethode of archiefvariant).",
    volume:
      "RAR-archieven in meerdere delen (.part1.rar, .part2.rar…) worden niet ondersteund.",
    unsafePaths:
      "Het archief bevat gevaarlijke bestandspaden (traversal) en is geweigerd.",
    pathLimits:
      "Een bestandspad overschrijdt de toegestane grenzen (diepte of lengte).",
    timeout: "Het uitpakken duurde te lang en is afgebroken.",
    rateLimited: "Te veel verzoeken. Wacht even en probeer het opnieuw.",
    notFound: "Bron niet gevonden.",
    forbidden:
      "Je hebt geen schrijfrechten op deze repository (of het GitHub-token heeft niet de juiste scope).",
    repoExists: "Er bestaat al een repository met die naam op je account.",
    nameInvalid: "Ongeldige repository- of branchnaam.",
    noChanges:
      "Niets te pushen: de bestanden komen al overeen met de doelrepository.",
    conflict:
      "De doelrepository is intussen gewijzigd. Probeer het opnieuw, push naar een aparte branch, of start opnieuw met ‘Alle code vervangen’ om de branch met de inhoud van het archief te overschrijven.",
    scopeMissing:
      "GitHub weigert wijzigingen aan workflowbestanden (.github/workflows/…): het token mist de scope ‘workflow’. Log uit en weer in om die toe te kennen.",
    gitFailed: "De push naar GitHub is mislukt.",
    interrupted: "De verwerking is onderbroken (herstart van de server).",
    badPath: "Ongeldig bestandspad.",
    confirmMismatch:
      "De bevestiging komt niet overeen met de repositorynaam: er is niets verwijderd.",
    archiveTooBig:
      "Deze repository is te groot om als archief te downloaden.",
    internal: "Onverwachte interne fout. Probeer het zo opnieuw.",
  },
};
