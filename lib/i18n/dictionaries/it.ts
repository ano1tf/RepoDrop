import type { Dict } from "../types";

export const it: Dict = {
  meta: {
    title: "RepoDrop — Importa i tuoi archivi .rar, .zip e .tar su GitHub",
    description:
      "Trascina un archivio .rar, .zip, .tar o .tar.gz e pubblica il codice su GitHub con un clic. Estrazione sicura, anteprima prima dell'invio, senza terminale né git.",
    loginTitle: "Accesso con GitHub",
    loginDescription:
      "Collega il tuo account GitHub a RepoDrop per creare un repository e pubblicare i tuoi archivi .rar, .zip o .tar con un clic. Token cifrato, mai salvato nel database.",
    importTitle: "Importa un archivio",
    importDescription:
      "Carica un archivio .rar, .zip, .tar o .tar.gz per visualizzarne i file e pubblicarlo su un repository GitHub.",
  },

  nav: {
    howItWorks: "Come funziona",
    myRepos: "I miei repository",
    importArchive: "Importa un archivio",
    importShort: "Importa",
    login: "Accedi",
    start: "Inizia",
    logout: "Esci",
    avatarAlt: "Avatar di {login}",
    language: "Lingua",
    languageChange: "Cambia lingua",
    languageSearch: "Cerca una lingua…",
    languageCurrent: "Lingua attuale: {name}",
  },

  home: {
    heroBadge: "Novità: .tar e .tar.gz",
    heroTitleLine1: "I tuoi archivi di codice,",
    heroTitleLine2: "su GitHub con un trascinamento.",
    heroBody:
      "Hai ricevuto un progetto .rar, .zip o .tar? Collega GitHub, trascina l'archivio, scegli il repository — è pubblicato. Senza terminale, senza clone, senza configurazione.",
    ctaStart: "Inizia con GitHub",
    ctaImport: "Importa un archivio",
    ctaHow: "Come funziona",
    checkSandboxed: "Estrazione in sandbox",
    checkToken: "Token GitHub mai salvato",
    checkFrench: "Aperto: il codice è pubblico",

    statFormats: "formati di archivio",
    statFormatsSub: ".rar · .zip · .tar[.gz]",
    statCommands: "riga di comando",
    statCommandsSub: "tutto con un clic",
    statDuration: "dal caricamento al push",
    statDurationSub: "anteprima inclusa",
    statDurationValue: "2 min",
    statLanguages: "lingue",
    statLanguagesSub: "interfaccia e messaggi",

    stepsTitle: "Come funziona?",
    stepsLead: "Tre passaggi, due minuti, nessun comando.",
    step1Title: "Collega GitHub",
    step1Body:
      "Un solo clic di autorizzazione. Chiediamo solo gli scope necessari — il tuo token resta cifrato nel browser.",
    step2Title: "Trascina l'archivio",
    step2Body:
      "Trascina il tuo .rar, .zip o .tar. Estrazione in sandbox, percorsi verificati, anteprima completa prima dell'invio.",
    step3Title: "Pubblica con un clic",
    step3Body:
      "Crea un repository o pubblica su uno esistente. Il commit viene creato con la tua identità GitHub.",

    featuresTitle: "Progettato per essere semplice",
    featuresTitleAccent: "e sicuro",
    featuresLead:
      "Importare codice deve essere un gioco da ragazzi — senza trasformare il server in un colabrodo.",
    feature1Title: "RAR, ZIP e TAR nativi",
    feature1Body:
      "I file .rar (RAR4/RAR5), .zip e .tar/.tar.gz si aprono lato server — nessun software da installare, da nessuna parte.",
    feature2Title: "Estrazione blindata",
    feature2Body:
      "Anti zip-slip, anti bombe di decompressione, .git incorporati e link simbolici scartati. I tuoi repository restano puliti.",
    feature3Title: "Anteprima prima del push",
    feature3Body:
      "File, dimensioni, cartella radice, node_modules: vedi esattamente cosa parte e mantieni il controllo.",
    feature4Title: "Zero riga di comando",
    feature4Body:
      "Niente clone, niente credenziali git, niente «git push -u origin». Lo strumento fa tutto per te.",
    feature5Title: "Repository nuovo o esistente",
    feature5Body:
      "Crea un repository privato o pubblico, oppure aggiungi l'archivio a uno esistente — su un branch dedicato se preferisci.",
    feature6Title: "Link pronti per l'IA",
    feature6Body:
      "Dopo il push: Codespaces, vscode.dev, URL di clone, comando gh e archivio .zip. Basta un copia-incolla.",

    formatsTitle: "Qualsiasi archivio, di qualsiasi età",
    formatsBody:
      "I vecchi .rar di Windows, gli .zip di un export, i .tar.gz di un server Linux: tutto viene letto lato server, in streaming, con le stesse protezioni. La cartella radice unica viene rimossa automaticamente e node_modules è escluso per impostazione predefinita.",

    securityTitle: "Cosa rifiutiamo, e perché",
    securityLead:
      "Decomprimere l'archivio di uno sconosciuto è uno sport rischioso. Ecco le reti tese sotto ogni importazione.",
    guard1Title: "Zip-slip e traversal",
    guard1Body:
      "Ogni percorso è validato (../, assoluti, UNC, NUL). Un solo tentativo e l'intero archivio viene rifiutato.",
    guard2Title: "Bombe di decompressione",
    guard2Body:
      "Le dimensioni dichiarate vengono sommate prima della scrittura: massimo {extract} decompressi e {files} file.",
    guard3Title: "Token GitHub",
    guard3Body:
      "Cookie httpOnly cifrato (JWE A256GCM), push tramite GIT_ASKPASS. Mai nel database, mai nei log.",
    guard4Title: "Quote",
    guard4Body:
      "30 upload/h per IP e 10 push/h per utente, contatori persistenti: il servizio resta sano.",
    limitsNote:
      "Limiti predefiniti: {upload} caricati, {extract} decompressi, {files} file per importazione.",

    faqTitle: "Domande frequenti",
    faqLead:
      "Tutto sull'importazione di archivi su GitHub, i formati accettati e la riservatezza del tuo account.",

    ctaTitle: "Pronto a svuotare il tuo prossimo archivio su GitHub?",
    ctaLead: "Accedi, trascina, pubblica. Al resto pensiamo noi.",

    mockFile: "mio-progetto.tar",
    mockFileMeta: "{size} · {count} file",
    mockExcluded: "escluso",
    mockPushed: "Pubblicato su github.com/tu/mio-progetto · branch main",
  },

  faq: {
    q1: "Come metto un archivio .rar o .zip su GitHub senza usare Git?",
    a1: "Collega il tuo account GitHub su RepoDrop, trascina il tuo file .rar, .zip, .tar o .tar.gz, controlla l'anteprima dei file estratti e scegli un repository nuovo o esistente. RepoDrop crea il commit e pubblica il codice direttamente con la tua identità GitHub, senza terminale né riga di comando.",
    q2: "Quali formati di archivio e quali dimensioni sono supportati?",
    a2: "RepoDrop supporta nativamente gli archivi .rar (RAR4 e RAR5), .zip, .tar, .tar.gz e .tgz, riconosciuti dai loro magic bytes lato server. Per impostazione predefinita un archivio può pesare fino a {upload} compressi ({extract} decompressi e {files} file).",
    q3: "Il mio token GitHub e il codice privato vengono salvati?",
    a3: "No. Il tuo token OAuth GitHub vive solo in un cookie httpOnly cifrato (JWE A256GCM) nel tuo browser: non viene mai scritto nel database né nei log. I file estratti risiedono in uno spazio temporaneo isolato e vengono eliminati automaticamente dopo il push.",
    q4: "Posso inviare un archivio a un repository GitHub esistente senza sovrascrivere il mio lavoro?",
    a4: "Sì. Puoi creare un repository nuovo (pubblico o privato), pubblicare su un branch dedicato di un repository esistente per preservare il branch principale, oppure scegliere esplicitamente l'opzione di sostituzione completa con conferma.",
    q5: "Che fine fanno la cartella radice unica e node_modules durante l'importazione?",
    a5: "Quando l'archivio contiene un'unica cartella contenitore (per esempio mio-progetto/), RepoDrop propone di rimuoverla automaticamente per collocare i tuoi file direttamente nella radice del repository. node_modules, le cartelle .git incorporate e i file di sistema inutili (.DS_Store, __MACOSX) vengono scartati per impostazione predefinita.",
  },

  login: {
    title: "Accedi a RepoDrop",
    description:
      "Autorizza l'accesso a GitHub per creare repository e pubblicare i tuoi archivi.",
    continueWithGithub: "Continua con GitHub",
    scopesLead: "Chiediamo solo gli scope",
    scopesAnd: "e",
    scopesTail:
      ": creare repository e pubblicare codice a tuo nome (inclusi i file .github/workflows/). Il tuo token è cifrato in un cookie httpOnly, mai salvato nel database.",
    bulletCookie: "Cookie httpOnly cifrato (A256GCM)",
    bulletLogout: "Uscita = token cancellato dal browser",
    devMode: "Modalità sviluppo",
    devLogin: "Accesso diretto (GH_TOKEN del server)",
    errorState: "La sessione di accesso è scaduta. Riprova.",
    errorOauth: "GitHub ha rifiutato l'autorizzazione. Ricomincia.",
    errorConfig:
      "L'applicazione non è configurata: imposta GITHUB_CLIENT_ID / GITHUB_CLIENT_SECRET e riavvia.",
    errorDevauth: "Modalità dev: il GH_TOKEN del server manca o non è valido.",
    errorGeneric: "Errore di accesso.",
  },

  importPage: {
    title: "Importa un archivio",
    lead: "Trascina un file .rar, .zip o .tar (anche .tar.gz) contenente il tuo codice. Vedrai un'anteprima completa prima di qualsiasi invio a GitHub.",
    browseLead:
      "Vuoi prima vedere cosa c'è già nel tuo account? Esplora i tuoi repository e il loro contenuto senza inviare nulla.",
    browseCta: "Esplora i miei repository",
    limitLabel: "Limite:",
    limitBody: "{upload} per archivio, {extract} decompressi.",
    securityLabel: "Sicurezza:",
    securityBody: "percorsi verificati, .git e link scartati.",
    afterLabel: "Dopo:",
    afterBody: "anteprima, scelta del repository, poi push.",
  },

  uploader: {
    dropLabel: "Trascina un archivio .rar, .zip o .tar",
    uploading: "Invio dell'archivio… {progress}%",
    keepOpen: "Non chiudere questa scheda.",
    dropHint: "Trascina qui il tuo archivio o clicca per sfogliare",
    formatsHint: ".rar, .zip, .tar e .tar.gz — max {max} ({extract} decompressi)",
    errorFormat:
      "Formato non supportato: sono accettati solo file .rar, .zip, .tar e .tar.gz.",
    errorEmpty: "Questo file è vuoto.",
    errorTooLarge: "Archivio troppo grande (max {max}).",
    errorHttp: "Invio non riuscito (HTTP {status}). Riprova.",
    errorNetwork: "Connessione persa durante l'invio. Riprova.",
  },

  footer: {
    tagline:
      "I tuoi archivi di codice, su GitHub, con un trascinamento. Senza terminale, senza clone, senza configurazione git.",
    productTitle: "Prodotto",
    home: "Home",
    importArchive: "Importa un archivio",
    howItWorks: "Come funziona",
    security: "Sicurezza",
    faq: "Domande frequenti",
    formatsTitle: "Formati supportati",
    guaranteesTitle: "Garanzie",
    guarantee1: "Token GitHub cifrato, mai salvato nel database",
    guarantee2: "Estrazione in sandbox, percorsi verificati",
    guarantee3: "Anteprima completa prima di ogni invio",
    copyright: "© {year} RepoDrop — i tuoi archivi, il tuo GitHub.",
    reserved: "Area riservata",
  },

  notFound: {
    title: "Pagina non trovata",
    body: "Questa pagina non esiste — oppure il job è scaduto (gli archivi vengono eliminati dopo un po').",
    back: "Torna alla home",
  },
  jobs: {
    metaTitle: "Monitoraggio dell'importazione",

    statusQueued: "In coda",
    statusExtracting: "Estrazione",
    statusReady: "Pronto per il push",
    statusPushing: "Push in corso…",
    statusDone: "Completato",
    statusFailed: "Errore",

    extractingTitle: "Estrazione in corso…",
    extractingBody:
      "Verifica dei percorsi e delle dimensioni, rilevamento della cartella radice. Tutto avviene sul server, in uno spazio isolato.",
    pushingTitle: "Push verso GitHub…",
    pushingBody:
      "Creazione del commit e invio dei file. Puoi lasciare aperta questa scheda: ti terremo aggiornato.",

    failedTitle: "L'operazione non è riuscita",
    failedUnknown: "Errore sconosciuto.",
    lostConnection: "Connessione persa. Riprova.",
    httpFailed: "Errore (HTTP {status}).",
    repoMoved:
      "Il repository {repo} è avanzato dal tuo import. Puoi sovrascrivere il suo branch con il contenuto esatto di questo archivio: i file assenti dall'archivio verranno eliminati dal repository e il push sarà forzato. La cronologia esistente viene conservata (nuovo commit sopra).",
    repoMovedConfirm:
      "Confermi la sostituzione completa del codice di questo repository con questo archivio?",
    replaceAllYes: "Sì, sostituisci tutto il codice",
    replaceAllRetry: "Riprova sostituendo tutto il codice",
    cancel: "Annulla",
    retryOtherArchive: "Riprova con un altro archivio",
    backHome: "Torna alla home",

    doneTitle: "Push completato!",
    doneBody: "{count} importati sul branch",
    doneCommit: "commit",
    doneCreated: "· repository creato",
    openOnGithub: "Apri su GitHub",
    copyLink: "Copia il link",
    downloadZip: "Scarica in .zip",
    aiLinksTitle: "Link pronti da dare a un'IA:",
    anotherImport: "Importa un altro archivio",

    linkRepo: "Repository GitHub",
    linkBranch: "Branch «{branch}»",
    linkBranchSub: "Esegui il push su questo branch",
    linkCommit: "Commit esatto",
    linkCodespaces: "Codespaces (agente IA di GitHub)",
    linkCodespacesSub: "vscode.dev pronto all'uso, Copilot collegato",
    linkVscode: "vscode.dev (editor web ufficiale)",
    linkVscodeSub: "Copilot + modifica + esecuzione (Codespaces)",
    linkClone: "URL di clone (agente esterno)",
    linkCloneSub: "L'agente si autentica con la propria sessione GitHub",
    linkGh: "Comando CLI `gh`",

    previewTitle: "Anteprima dell'archivio",
    previewLead: "Ciò che verrà pushato, dopo i filtri di sicurezza.",
    previewFiles: "File",
    previewSize: "Peso decompresso",
    previewIgnored: "Ignorati:",
    ignoredGit: ".git ({count})",
    ignoredSystemFiles: "file di sistema ({count})",
    ignoredSymlinks: "link simbolici ({count})",
    ignoredHardlinks: "hardlink ({count})",
    ignoredBlocked: "percorsi bloccati ({count})",
    tooLargeForGithub:
      "{count} file superano i 100 MB: GitHub probabilmente li rifiuterà. Es.:",

    filtersTitle: "Filtri di importazione",
    filtersNone: "Nessun filtro disponibile per questo archivio.",
    stripRootLabel: "Rimuovi la cartella radice",
    stripRootHint:
      "Consigliato: il contenuto del progetto finirebbe nella radice del repository.",
    includeNodeModules: "Includi",
    includeNodeModulesHint:
      "Deselezionato per impostazione predefinita: pesante e raramente utile in un repository.",

    destTitle: "Destinazione",
    destLead: "Dove eseguire il push di questi file?",
    destNew: "Nuovo repository",
    destExisting: "Repository esistente",
    repoNameLabel: "Nome del repository",
    repoNamePlaceholder: "mio-progetto",
    repoNameInvalid:
      "Solo lettere, cifre, punti, trattini e trattini bassi (deve iniziare con una lettera o una cifra).",
    visibilityLabel: "Visibilità",
    visibilityPrivate: "Privato",
    visibilityPrivateHint: "Visibile solo a te",
    visibilityPublic: "Pubblico",
    visibilityPublicHint: "Visibile a tutti",
    searchRepo: "Cerca un repository…",
    loadingRepos: "Caricamento dei tuoi repository…",
    reposLoadError: "Impossibile caricare i tuoi repository.",
    noWritableRepo:
      "Nessun repository accessibile con diritti di scrittura. Creane uno nuovo!",
    noRepoMatch: "Nessun repository corrisponde alla ricerca.",
    dedicatedBranch: "Crea un branch dedicato",
    dedicatedHintExisting:
      "Non toccare il branch predefinito: ideale per un repository condiviso.",
    dedicatedHintNew:
      "Nome del branch iniziale del nuovo repository (altrimenti il branch predefinito).",
    replaceAll: "Sostituisci tutto il codice del repository",
    replaceAllHint:
      "Il repository conterrà esattamente i file dell'archivio: quelli assenti verranno eliminati e il push sarà forzato — riuscirà anche se il repository è cambiato nel frattempo (niente più errore «fetch first»). Da usare quando l'archivio è la nuova versione completa del progetto.",
    replaceConfirm:
      "Confermo: i file del repository {repo} assenti da questo archivio verranno eliminati definitivamente dal branch pushato.",
    replaceConfirmNoRepo:
      "Confermo: i file del repository assenti da questo archivio verranno eliminati definitivamente dal branch pushato.",
    advanced: "Opzioni avanzate",
    commitMessage: "Messaggio di commit",
    commitPlaceholder: "Import di {filename} tramite RepoDrop",
    pushAction: "Esegui il push su GitHub",
    replacePushAction: "Sostituisci tutto il codice su GitHub",
    sending: "Invio…",
    replaceNeedConfirm:
      "Spunta la conferma della sostituzione per attivare il pulsante.",
    tokenNote:
      "Il tuo token GitHub resta in un cookie cifrato: non viene mai scritto nel database.",
  },

  repos: {
    metaTitle: "I miei repository",
    pageTitle: "I miei repository",
    pageLead:
      "Esplora i tuoi repository prima di importare qualcosa: albero, anteprima dei file, branch che preferisci. Rinomina, visibilità ed eliminazione sono nella scheda {actions} di un repository.",

    filterPlaceholder: "Filtra per nome, descrizione o linguaggio…",
    filterAria: "Filtra i repository",
    sortAria: "Ordina",
    sortPushed: "Attività recente",
    sortName: "Nome (A→Z)",
    sortSize: "Dimensione",
    mine: "I miei",
    refresh: "Aggiorna",
    errorList: "Elenco non disponibile (HTTP {status}).",
    errorServer: "Impossibile contattare il server.",
    truncated:
      "Sono caricati solo i 300 repository più recenti. Affina con il filtro qui sopra.",
    loading: "Caricamento dei tuoi repository…",
    emptyFilter: "Nessun repository corrisponde a questo filtro.",
    emptyToken: "Nessun repository visibile con questo token GitHub.",
    countAll: "{count} repository",
    countFiltered: "{count} su {total}",
    countHint: "— fai clic per esplorare il contenuto.",
    noDescription: "Senza descrizione",
    pushedAgo: "pushato {when}",
    issues: "{count} issue",
    readOnly: "sola lettura",

    backToList: "Torna all'elenco",
    list: "Elenco",
    badgePrivate: "privato",
    badgePublic: "pubblico",
    badgeArchived: "archiviato",
    badgeFork: "fork",
    badgeReadOnly: "sola lettura",
    branchProtected: "(protetto)",
    downloadTitle: "Scarica {repo} in .{format}",
    downloadTitleRef: "Scarica {repo} ({ref}) in .{format}",
    actionsTab: "Azioni",
    loadingRepo: "Caricamento del repository…",
    inaccessible: "Repository inaccessibile.",
    inaccessibleHttp: "Repository inaccessibile (HTTP {status}).",
    errorServerJoin: "Impossibile contattare il server.",
    copyDenied: "Copia bloccata dal browser.",
    reloadFolder: "Ricarica questa cartella",
    root: "radice",
    entries: "{count} elemento/i",
    loadingShort: "Caricamento…",
    emptyRepo:
      "Questo repository non contiene ancora file. Importa un archivio per riempirlo.",
    loadingFile: "Caricamento del file…",
    selectFile: "Seleziona un file per vederlo.",
    lines: "{count} righe",
    copy: "Copia",
    copied: "Copiato",
    raw: "Grezzo",
    fileTooBig:
      "File troppo grande per l'anteprima ({size}). Aprilo su GitHub.",
    fileBinary: "File binario ({size}): nessuna anteprima testuale.",

    actionsTitle: "Rinomina / descrivi",
    nameLabel: "Nome del repository",
    renameWarning:
      "Rinominare rompe i cloni, i link e le pagine GitHub esistenti. GitHub reindirizza il vecchio nome, ma non all'infinito.",
    descLabel: "Descrizione",
    descPlaceholder: "A cosa serve questo repository?",
    save: "Salva",
    writeInsufficient: "Diritti di scrittura insufficienti su questo repository.",
    visibilityTitle: "Visibilità",
    visibilityCurrently: "Attualmente {visibility}.",
    visibilityToPrivate:
      " Renderlo privato toglie l'accesso a tutti gli anonimi.",
    visibilityToPublic:
      " Renderlo pubblico espone tutta la cronologia dei commit.",
    makePublic: "Rendi pubblico",
    makePrivate: "Rendi privato",
    dangerZone: "Zona sensibile",
    deleteWarning:
      "L'eliminazione è definitiva: codice, cronologia, issue e wiki.",
    deleteRepo: "Elimina il repository",
    deleteTitle: "Elimina {repo}",
    deleteConfirmBody:
      "Nessun recupero possibile. Digita {name} per sbloccare il pulsante.",
    deleteForever: "Elimina definitivamente",
    cancel: "Annulla",
    updated: "Repository aggiornato.",
    deleted: "Repository {repo} eliminato.",
    httpFailed: "Errore (HTTP {status}).",
  },

  api: {
    authRequired: "Autenticazione richiesta.",
    jobNotFound: "Job non trovato.",
    jobNotReady: "Questo job non è ancora pronto.",
    jobNotPushable: "Questo job non è pronto per il push.",
    invalidJson: "Corpo JSON non valido.",
    invalidMultipart: "Richiesta non valida (atteso multipart/form-data).",
    emptyBody: "Corpo della richiesta vuoto.",
    emptyArchive: "L'archivio è vuoto.",
    uploadFailed: "Impossibile ricevere il file. Riprova.",
    repoNameRequired:
      "Il nome del repository è obbligatorio per crearne uno nuovo.",
    branchNameTooLong: "Nome del branch troppo lungo.",
    invalidOptions: "Opzioni non valide.",
    invalidChange: "Modifica non valida.",
    noChange: "Nessuna modifica.",
    pathRequired: "Parametro «path» obbligatorio.",
  },
  errors: {
    encrypted:
      "Questo archivio è protetto da password, cosa non ancora supportata.",
    tooManyFiles: "Troppi file nell'archivio (limite raggiunto).",
    tooBig:
      "Il contenuto decompresso supera la dimensione consentita. Riduci l'archivio (node_modules?).",
    empty: "Questo archivio non contiene alcun file utilizzabile.",
    corrupt:
      "Archivio illeggibile o corrotto. Controlla il file e riprova.",
    unsupported:
      "Formato non supportato (metodo di compressione o variante di archivio sconosciuta).",
    volume:
      "Gli archivi RAR multi-volume (.part1.rar, .part2.rar…) non sono supportati.",
    unsafePaths:
      "L'archivio contiene percorsi di file pericolosi (traversal) ed è stato rifiutato.",
    pathLimits:
      "Un percorso di file supera i limiti consentiti (profondità o lunghezza).",
    timeout: "L'estrazione ha richiesto troppo tempo ed è stata interrotta.",
    rateLimited: "Troppe richieste. Attendi un momento e riprova.",
    notFound: "Risorsa non trovata.",
    forbidden:
      "Non hai i diritti di scrittura su questo repository (o al token GitHub manca lo scope giusto).",
    repoExists: "Esiste già un repository con questo nome sul tuo account.",
    nameInvalid: "Nome del repository o del branch non valido.",
    noChanges:
      "Niente da pushare: i file corrispondono già al repository di destinazione.",
    conflict:
      "Il repository di destinazione è cambiato nel frattempo. Riprova, esegui il push su un branch dedicato oppure rilancia con «Sostituisci tutto il codice» per sovrascrivere il branch con il contenuto dell'archivio.",
    scopeMissing:
      "GitHub rifiuta la modifica dei file di workflow (.github/workflows/…): al token manca lo scope «workflow». Esci e rientra per concederlo.",
    gitFailed: "Il push verso GitHub non è riuscito.",
    interrupted: "L'elaborazione è stata interrotta (riavvio del server).",
    badPath: "Percorso di file non valido.",
    confirmMismatch:
      "La conferma non corrisponde al nome del repository: non è stato eliminato nulla.",
    archiveTooBig:
      "Questo repository è troppo grande per essere scaricato come archivio.",
    internal: "Errore interno imprevisto. Riprova tra un istante.",
  },
};
