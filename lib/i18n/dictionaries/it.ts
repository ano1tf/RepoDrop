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
    jobTitle: "Monitoraggio importazione",
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
    checkFrench: "Flusso di lavoro aperto",

    statFormats: "formati di archivio",
    statFormatsSub: ".rar · .zip · .tar[.gz]",
    statCommands: "riga di comando",
    statCommandsSub: "tutto con un clic",
    statDuration: "dal caricamento al push",
    statDurationSub: "anteprima inclusa",
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

    mockFile: "mio-progetto.zip",
    mockFileMeta: "{size} · {count} file",
    mockExcluded: "escluso",
    mockPushed: "Pubblicato su github.com/tu/mio-progetto · branch main",

    demoEyebrow: "La magia, prima del login",
    demoTitle: "Dall'archivio al repo GitHub in pochi secondi.",
    demoTitleAccent: "Senza terminale.",
    demoLead: "Trascina, controlla il preview, fai push. Nessun comando, e niente parte senza il tuo ok.",
    demoStep1: "Archivio locale",
    demoStep2: "Estrazione verificata",
    demoStep3: "Repo pronto",
    demoFileMeta: "18,4 MB · 1.284 file",
    demoScan: "Percorsi verificati",
    demoPushed: "Pushato · ora",
    demoBranches: "main",
    demoNoAccount: "Zero account, zero terminale.",
    demoLocalBadge: "Locale",
    demoDropHint: "Trascina qui un .zip",
    demoDropBrowse: "oppure scegli un file",
    demoDropCta: "Importa un archivio",
    demoDropError: "Sono accettati solo i file .zip.",
    demoReading: "Lettura dell'archivio…",
    demoExtracting: "Estrazione…",
    demoReady: "Pronto per il push",
    demoReadyMeta: "{count} file rilevati · nulla è uscito dal browser",
    demoPushCta: "Push su GitHub",
    demoLocalNote: "I tuoi file restano nel browser: non viene inviato nulla.",
    demoConnectTitle: "File pronto!",
    demoConnectBody: "Collega il tuo account GitHub per completare il push.",
    demoConnectNote: "L'archivio non è uscito dal browser: verrà pushato dalla tua sessione GitHub.",
    demoConnectCta: "Accedi con GitHub",
    demoConnectLater: "Più tardi",
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
    dropTitle: "Trascina qui il tuo archivio e invialo a GitHub.",
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

  job: {
    statusQueued: "In coda",
    statusExtracting: "Estrazione",
    statusReady: "Pronto per il push",
    statusPushing: "Push in corso…",
    statusDone: "Completato",
    statusFailed: "Errore",
    extractingTitle: "Estrazione in corso…",
    extractingBody: "Verifica dei percorsi, limite di dimensione e rilevamento della cartella radice. Tutto avviene sul server, in uno spazio isolato.",
    pushingTitle: "Push su GitHub…",
    pushingBody: "Creazione del commit e invio dei file. Puoi lasciare aperta questa scheda: ti aggiorneremo.",
    doneTitle: "È stato pushato!",
    doneFiles: "{count} file importati sul branch {branch}",
    doneCommit: "commit {sha}",
    doneCreated: "repository creato",
    doneOpenGithub: "Apri su GitHub",
    doneCopyLink: "Copia il link",
    doneDownload: "Scarica come .zip",
    doneImportAnother: "Importa un altro archivio",
  },

  notFound: {
    title: "Pagina non trovata",
    body: "Questa pagina non esiste — oppure il job è scaduto (gli archivi vengono eliminati dopo un po').",
    back: "Torna alla home",
  },
};
