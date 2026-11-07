import type { Dict } from "../types";

export const pl: Dict = {
  meta: {
    title: "RepoDrop — Importuj archiwa .rar, .zip i .tar do GitHuba",
    description:
      "Przeciągnij archiwum .rar, .zip, .tar lub .tar.gz i wypchnij kod do GitHuba jednym kliknięciem. Bezpieczne rozpakowywanie, podgląd przed wysłaniem, bez terminala i bez gita.",
    loginTitle: "Logowanie przez GitHub",
    loginDescription:
      "Połącz konto GitHub z RepoDrop, aby utworzyć repozytorium i wypchnąć archiwa .rar, .zip lub .tar jednym kliknięciem. Token zaszyfrowany, nigdy nie zapisywany w bazie.",
    importTitle: "Importuj archiwum",
    importDescription:
      "Wgraj archiwum .rar, .zip, .tar lub .tar.gz, aby podejrzeć pliki i wypchnąć je do repozytorium GitHub.",
  },

  nav: {
    howItWorks: "Jak to działa",
    myRepos: "Moje repozytoria",
    importArchive: "Importuj archiwum",
    importShort: "Importuj",
    login: "Zaloguj się",
    start: "Zaczynaj",
    logout: "Wyloguj się",
    avatarAlt: "Awatar {login}",
    language: "Język",
    languageChange: "Zmień język",
    languageSearch: "Szukaj języka…",
    languageCurrent: "Aktualny język: {name}",
  },

  home: {
    heroBadge: "Nowość: .tar i .tar.gz",
    heroTitleLine1: "Twoje archiwa kodu,",
    heroTitleLine2: "na GitHubie przeciągnij i upuść.",
    heroBody:
      "Dostałeś projekt jako .rar, .zip albo .tar? Połącz GitHuba, wrzuć archiwum, wybierz repozytorium — już jest wypchnięte. Bez terminala, bez klonowania, bez konfiguracji.",
    ctaStart: "Zacznij z GitHubem",
    ctaImport: "Importuj archiwum",
    ctaHow: "Jak to działa",
    checkSandboxed: "Rozpakowywanie w sandboxie",
    checkToken: "Token GitHub nigdy nie zapisywany",
    checkFrench: "Otwarte: kod jest publiczny",

    statFormats: "formaty archiwów",
    statFormatsSub: ".rar · .zip · .tar[.gz]",
    statCommands: "wiersz poleceń",
    statCommandsSub: "wszystko jednym kliknięciem",
    statDuration: "od wgrania do pusha",
    statDurationSub: "z podglądem",
    statDurationValue: "2 min",
    statLanguages: "języków",
    statLanguagesSub: "interfejs i komunikaty",

    stepsTitle: "Jak to działa?",
    stepsLead: "Trzy kroki, dwie minuty, żadnego polecenia.",
    step1Title: "Połącz GitHuba",
    step1Body:
      "Jedno kliknięcie autoryzacji. Prosimy tylko o niezbędne zakresy — token pozostaje zaszyfrowany w przeglądarce.",
    step2Title: "Wrzuć archiwum",
    step2Body:
      "Przeciągnij .rar, .zip lub .tar. Rozpakowywanie w sandboxie, sprawdzone ścieżki, pełny podgląd przed wysłaniem.",
    step3Title: "Wypchnij jednym kliknięciem",
    step3Body:
      "Utwórz repozytorium albo wypchnij do istniejącego. Commit powstaje z Twoją tożsamością GitHub.",

    featuresTitle: "Proste z założenia",
    featuresTitleAccent: "i bezpieczne",
    featuresLead:
      "Importowanie kodu powinno być dziecinnie łatwe — bez zamieniania serwera w sito.",
    feature1Title: "RAR, ZIP i TAR natywnie",
    feature1Body:
      ".rar (RAR4/RAR5), .zip oraz .tar/.tar.gz otwierają się po stronie serwera — nic nie trzeba instalować.",
    feature2Title: "Zabezpieczone rozpakowywanie",
    feature2Body:
      "Anti zip-slip, ochrona przed bombami dekompresji, osadzone .git i dowiązania symboliczne odrzucane. Repozytoria pozostają czyste.",
    feature3Title: "Podgląd przed pushem",
    feature3Body:
      "Pliki, rozmiary, folder główny, node_modules: widzisz dokładnie, co wyjdzie, i zachowujesz kontrolę.",
    feature4Title: "Zero wiersza poleceń",
    feature4Body:
      "Bez klonowania, bez danych git, bez „git push -u origin”. Narzędzie robi wszystko za Ciebie.",
    feature5Title: "Nowe lub istniejące repo",
    feature5Body:
      "Utwórz prywatne lub publiczne repozytorium albo dodaj archiwum do istniejącego — w razie potrzeby na osobnym branchu.",
    feature6Title: "Linki gotowe dla AI",
    feature6Body:
      "Po pushu: Codespaces, vscode.dev, URL do klonowania, polecenie gh i archiwum .zip. Wystarczy kopiuj-wklej.",

    formatsTitle: "Każde archiwum, nieważne jak stare",
    formatsBody:
      "Stare .rar z Windows, .zip z eksportu, .tar.gz z serwera Linux: wszystko jest czytane po stronie serwera, strumieniowo, z tymi samymi zabezpieczeniami. Pojedynczy folder główny jest usuwany automatycznie, a node_modules wykluczany domyślnie.",

    securityTitle: "Czego odmawiamy i dlaczego",
    securityLead:
      "Rozpakowywanie archiwum nieznajomego to ryzykowny sport. Oto siatki rozpięte pod każdym importem.",
    guard1Title: "Zip-slip i traversal",
    guard1Body:
      "Każda ścieżka jest sprawdzana (../, bezwzględne, UNC, NUL). Jedna próba i całe archiwum jest odrzucane.",
    guard2Title: "Bomby dekompresji",
    guard2Body:
      "Deklarowane rozmiary są sumowane przed zapisem: maksymalnie {extract} rozpakowanych i {files} plików.",
    guard3Title: "Token GitHub",
    guard3Body:
      "Zaszyfrowane ciasteczko httpOnly (JWE A256GCM), push przez GIT_ASKPASS. Nigdy w bazie, nigdy w logach.",
    guard4Title: "Limity",
    guard4Body:
      "30 wgrań/h na IP i 10 pushy/h na użytkownika, trwałe liczniki: usługa pozostaje zdrowa.",
    limitsNote:
      "Domyślne limity: {upload} wgranych, {extract} rozpakowanych, {files} plików na import.",

    faqTitle: "Najczęstsze pytania",
    faqLead:
      "Wszystko o imporcie archiwów do GitHuba, akceptowanych formatach i prywatności Twojego konta.",

    ctaTitle: "Gotów opróżnić kolejne archiwum na GitHuba?",
    ctaLead: "Zaloguj się, wrzuć, wypchnij. Resztą zajmiemy się my.",

    mockFile: "moj-projekt.tar",
    mockFileMeta: "{size} · {count} plików",
    mockExcluded: "pominięty",
    mockPushed: "Wypchnięto do github.com/ty/moj-projekt · branch main",
  },

  faq: {
    q1: "Jak umieścić archiwum .rar lub .zip na GitHubie bez używania Gita?",
    a1: "Połącz konto GitHub w RepoDrop, przeciągnij plik .rar, .zip, .tar lub .tar.gz, sprawdź podgląd rozpakowanych plików i wybierz nowe lub istniejące repozytorium. RepoDrop tworzy commit i wypycha kod bezpośrednio pod Twoją tożsamością GitHub, bez terminala i bez wiersza poleceń.",
    q2: "Jakie formaty archiwów i rozmiary są obsługiwane?",
    a2: "RepoDrop obsługuje natywnie archiwa .rar (RAR4 i RAR5), .zip, .tar, .tar.gz i .tgz, rozpoznawane po magicznych bajtach po stronie serwera. Domyślnie archiwum może ważyć do {upload} po kompresji ({extract} rozpakowanych i {files} plików).",
    q3: "Czy mój token GitHub i prywatny kod są zapisywane?",
    a3: "Nie. Twój token OAuth GitHub przebywa wyłącznie w zaszyfrowanym ciasteczku httpOnly (JWE A256GCM) w przeglądarce: nigdy nie trafia do bazy ani do logów. Rozpakowane pliki leżą w odizolowanej przestrzeni tymczasowej i są automatycznie usuwane po pushu.",
    q4: "Czy mogę wysłać archiwum do istniejącego repozytorium GitHub bez nadpisywania pracy?",
    a4: "Tak. Możesz utworzyć nowe repozytorium (publiczne lub prywatne), wypchnąć na osobny branch istniejącego repozytorium, aby zachować główny branch, albo świadomie wybrać pełne zastąpienie z potwierdzeniem.",
    q5: "Co dzieje się podczas importu z pojedynczym folderem głównym i node_modules?",
    a5: "Gdy archiwum zawiera jeden folder nadrzędny (na przykład moj-projekt/), RepoDrop proponuje usunąć go automatycznie, aby pliki znalazły się bezpośrednio w katalogu głównym repozytorium. node_modules, osadzone foldery .git i zbędne pliki systemowe (.DS_Store, __MACOSX) są domyślnie odrzucane.",
  },

  login: {
    title: "Zaloguj się do RepoDrop",
    description:
      "Zezwól na dostęp do GitHuba, aby tworzyć repozytoria i wypychać archiwa.",
    continueWithGithub: "Kontynuuj z GitHubem",
    scopesLead: "Prosimy tylko o zakresy",
    scopesAnd: "i",
    scopesTail:
      ": tworzenie repozytoriów i wypychanie kodu w Twoim imieniu (łącznie z plikami .github/workflows/). Token jest szyfrowany w ciasteczku httpOnly, nigdy nie zapisywany w bazie.",
    bulletCookie: "Zaszyfrowane ciasteczko httpOnly (A256GCM)",
    bulletLogout: "Wylogowanie = token usunięty z przeglądarki",
    devMode: "Tryb programistyczny",
    devLogin: "Bezpośrednie logowanie (GH_TOKEN serwera)",
    errorState: "Sesja logowania wygasła. Spróbuj ponownie.",
    errorOauth: "GitHub odrzucił autoryzację. Zacznij od nowa.",
    errorConfig:
      "Aplikacja nie jest skonfigurowana: ustaw GITHUB_CLIENT_ID / GITHUB_CLIENT_SECRET i uruchom ponownie.",
    errorDevauth: "Tryb dev: brak GH_TOKEN serwera lub jest nieprawidłowy.",
    errorGeneric: "Błąd logowania.",
  },

  importPage: {
    title: "Importuj archiwum",
    lead: "Przeciągnij plik .rar, .zip lub .tar (także .tar.gz) z kodem. Zobaczysz pełny podgląd, zanim cokolwiek pójdzie na GitHuba.",
    browseLead:
      "Chcesz najpierw zobaczyć, co już masz na koncie? Przejrzyj swoje repozytoria i ich zawartość, nic nie wysyłając.",
    browseCta: "Przeglądaj moje repozytoria",
    limitLabel: "Limit:",
    limitBody: "{upload} na archiwum, {extract} rozpakowanych.",
    securityLabel: "Bezpieczeństwo:",
    securityBody: "sprawdzone ścieżki, .git i linki odrzucone.",
    afterLabel: "Potem:",
    afterBody: "podgląd, wybór repozytorium, push.",
  },

  uploader: {
    dropLabel: "Upuść archiwum .rar, .zip lub .tar",
    uploading: "Wysyłanie archiwum… {progress}%",
    keepOpen: "Nie zamykaj tej karty.",
    dropHint: "Przeciągnij archiwum tutaj lub kliknij, aby wybrać",
    formatsHint: ".rar, .zip, .tar i .tar.gz — maks. {max} ({extract} rozpakowanych)",
    errorFormat:
      "Nieobsługiwany format: akceptowane są tylko pliki .rar, .zip, .tar i .tar.gz.",
    errorEmpty: "Ten plik jest pusty.",
    errorTooLarge: "Archiwum za duże (maks. {max}).",
    errorHttp: "Wysyłka nie powiodła się (HTTP {status}). Spróbuj ponownie.",
    errorNetwork: "Połączenie przerwane podczas wysyłki. Spróbuj ponownie.",
  },

  footer: {
    tagline:
      "Twoje archiwa kodu, na GitHubie, przeciągnij i upuść. Bez terminala, bez klonowania, bez konfiguracji gita.",
    productTitle: "Produkt",
    home: "Start",
    importArchive: "Importuj archiwum",
    howItWorks: "Jak to działa",
    security: "Bezpieczeństwo",
    faq: "Najczęstsze pytania",
    formatsTitle: "Obsługiwane formaty",
    guaranteesTitle: "Gwarancje",
    guarantee1: "Token GitHub zaszyfrowany, nigdy nie zapisywany w bazie",
    guarantee2: "Rozpakowywanie w sandboxie, sprawdzone ścieżki",
    guarantee3: "Pełny podgląd przed każdym wysłaniem",
    copyright: "© {year} RepoDrop — Twoje archiwa, Twój GitHub.",
    reserved: "Obszar zastrzeżony",
  },

  notFound: {
    title: "Nie znaleziono strony",
    body: "Ta strona nie istnieje — albo zadanie wygasło (archiwa są usuwane po pewnym czasie).",
    back: "Wróć na stronę główną",
  },
  jobs: {
    metaTitle: "Śledzenie importu",

    statusQueued: "W kolejce",
    statusExtracting: "Rozpakowywanie",
    statusReady: "Gotowe do wysłania",
    statusPushing: "Wysyłanie…",
    statusDone: "Zakończone",
    statusFailed: "Błąd",

    extractingTitle: "Rozpakowywanie…",
    extractingBody:
      "Sprawdzanie ścieżek i rozmiarów, wykrywanie katalogu głównego. Wszystko dzieje się po stronie serwera, w odizolowanej przestrzeni.",
    pushingTitle: "Wysyłanie do GitHuba…",
    pushingBody:
      "Tworzenie commita i przesyłanie plików. Możesz zostawić tę kartę otwartą — damy znać, gdy skończymy.",

    failedTitle: "Operacja nie powiodła się",
    failedUnknown: "Nieznany błąd.",
    lostConnection: "Utracono połączenie. Spróbuj ponownie.",
    httpFailed: "Błąd (HTTP {status}).",
    repoMoved:
      "Repozytorium {repo} zmieniło się od Twojego importu. Możesz nadpisać jego gałąź dokładną zawartością tego archiwum: pliki, których nie ma w archiwum, zostaną usunięte z repozytorium, a wypchnięcie zostanie wymuszone. Istniejąca historia zostanie zachowana (nowy commit na wierzchu).",
    repoMovedConfirm:
      "Czy potwierdzasz zastąpienie całego kodu tego repozytorium tym archiwum?",
    replaceAllYes: "Tak, zastąp cały kod",
    replaceAllRetry: "Spróbuj ponownie, zastępując cały kod",
    cancel: "Anuluj",
    retryOtherArchive: "Spróbuj ponownie z innym archiwum",
    backHome: "Powrót do strony głównej",

    doneTitle: "Wysłano!",
    doneBody: "{count} zaimportowanych na gałęzi",
    doneCommit: "commit",
    doneCreated: "· repozytorium utworzone",
    openOnGithub: "Otwórz na GitHubie",
    copyLink: "Kopiuj link",
    downloadZip: "Pobierz jako .zip",
    aiLinksTitle: "Linki gotowe do przekazania AI:",
    anotherImport: "Zaimportuj inne archiwum",

    linkRepo: "Repozytorium GitHub",
    linkBranch: "Gałąź „{branch}”",
    linkBranchSub: "Wypchnij na tę gałąź",
    linkCommit: "Dokładny commit",
    linkCodespaces: "Codespaces (agent AI GitHuba)",
    linkCodespacesSub: "vscode.dev gotowe do użycia, Copilot podłączony",
    linkVscode: "vscode.dev (oficjalny edytor webowy)",
    linkVscodeSub: "Copilot + edycja + uruchamianie (Codespaces)",
    linkClone: "URL klonowania (agent zewnętrzny)",
    linkCloneSub: "Agent uwierzytelnia się własną sesją GitHuba",
    linkGh: "Polecenie CLI `gh`",

    previewTitle: "Podgląd archiwum",
    previewLead: "Co zostanie wypchnięte, po filtrach bezpieczeństwa.",
    previewFiles: "Pliki",
    previewSize: "Rozmiar po rozpakowaniu",
    previewIgnored: "Pominięte:",
    ignoredGit: ".git ({count})",
    ignoredSystemFiles: "pliki systemowe ({count})",
    ignoredSymlinks: "dowiązania symboliczne ({count})",
    ignoredHardlinks: "twarde dowiązania ({count})",
    ignoredBlocked: "zablokowane ścieżki ({count})",
    tooLargeForGithub:
      "{count} plik(ów) przekracza 100 MB: GitHub prawdopodobnie je odrzuci. Np.:",

    filtersTitle: "Filtry importu",
    filtersNone: "Brak dostępnych filtrów dla tego archiwum.",
    stripRootLabel: "Usuń katalog główny",
    stripRootHint:
      "Zalecane: zawartość projektu trafi bezpośrednio do katalogu głównego repozytorium.",
    includeNodeModules: "Dołącz",
    includeNodeModulesHint:
      "Domyślnie odznaczone: ciężkie i rzadko przydatne w repozytorium.",

    destTitle: "Cel",
    destLead: "Dokąd wysłać te pliki?",
    destNew: "Nowe repozytorium",
    destExisting: "Istniejące repozytorium",
    repoNameLabel: "Nazwa repozytorium",
    repoNamePlaceholder: "moj-projekt",
    repoNameInvalid:
      "Tylko litery, cyfry, kropki, myślniki i podkreślenia (musi zaczynać się od litery lub cyfry).",
    visibilityLabel: "Widoczność",
    visibilityPrivate: "Prywatne",
    visibilityPrivateHint: "Widoczne tylko dla Ciebie",
    visibilityPublic: "Publiczne",
    visibilityPublicHint: "Widoczne dla wszystkich",
    searchRepo: "Szukaj repozytorium…",
    loadingRepos: "Wczytywanie Twoich repozytoriów…",
    reposLoadError: "Nie udało się wczytać Twoich repozytoriów.",
    noWritableRepo:
      "Brak repozytorium z prawem zapisu. Utwórz nowe!",
    noRepoMatch: "Żadne repozytorium nie pasuje do wyszukiwania.",
    dedicatedBranch: "Utwórz osobną gałąź",
    dedicatedHintExisting:
      "Nie ruszać gałęzi domyślnej: idealne dla współdzielonego repozytorium.",
    dedicatedHintNew:
      "Nazwa początkowej gałęzi nowego repozytorium (w przeciwnym razie gałąź domyślna).",
    replaceAll: "Zastąp cały kod repozytorium",
    replaceAllHint:
      "Repozytorium będzie zawierać dokładnie pliki z archiwum: te, których w nim nie ma, zostaną usunięte, a wypchnięcie zostanie wymuszone — powiedzie się nawet, jeśli repozytorium zmieniło się w międzyczasie (koniec błędu „fetch first”). Użyj, gdy archiwum to pełna nowa wersja projektu.",
    replaceConfirm:
      "Potwierdzam: pliki repozytorium {repo}, których nie ma w tym archiwum, zostaną trwale usunięte z wypychanej gałęzi.",
    replaceConfirmNoRepo:
      "Potwierdzam: pliki repozytorium, których nie ma w tym archiwum, zostaną trwale usunięte z wypychanej gałęzi.",
    advanced: "Opcje zaawansowane",
    commitMessage: "Wiadomość commita",
    commitPlaceholder: "Import {filename} przez RepoDrop",
    pushAction: "Wypchnij na GitHuba",
    replacePushAction: "Zastąp cały kod na GitHubie",
    sending: "Wysyłanie…",
    replaceNeedConfirm:
      "Zaznacz potwierdzenie zastąpienia, aby aktywować przycisk.",
    tokenNote:
      "Twój token GitHub pozostaje w szyfrowanym pliku cookie — nigdy nie trafia do bazy danych.",
  },

  repos: {
    metaTitle: "Moje repozytoria",
    pageTitle: "Moje repozytoria",
    pageLead:
      "Przejrzyj swoje repozytoria, zanim cokolwiek zaimportujesz: drzewo, podgląd plików, wybrana gałąź. Zmiana nazwy, widoczność i usuwanie są na karcie {actions} repozytorium.",

    filterPlaceholder: "Filtruj po nazwie, opisie lub języku…",
    filterAria: "Filtruj repozytoria",
    sortAria: "Sortuj",
    sortPushed: "Ostatnia aktywność",
    sortName: "Nazwa (A→Z)",
    sortSize: "Rozmiar",
    mine: "Moje",
    refresh: "Odśwież",
    errorList: "Lista niedostępna (HTTP {status}).",
    errorServer: "Nie można połączyć się z serwerem.",
    truncated:
      "Wczytano tylko 300 najnowszych repozytoriów. Zawęź listę filtrem powyżej.",
    loading: "Wczytywanie Twoich repozytoriów…",
    emptyFilter: "Żadne repozytorium nie pasuje do tego filtra.",
    emptyToken: "Żadne repozytorium nie jest widoczne z tym tokenem GitHuba.",
    countAll: "{count} repozytoriów",
    countFiltered: "{count} z {total}",
    countHint: "— kliknij, aby przejrzeć zawartość.",
    noDescription: "Bez opisu",
    pushedAgo: "wypchnięto {when}",
    issues: "{count} zgłoszeń",
    readOnly: "tylko do odczytu",

    backToList: "Powrót do listy",
    list: "Lista",
    badgePrivate: "prywatne",
    badgePublic: "publiczne",
    badgeArchived: "zarchiwizowane",
    badgeFork: "fork",
    badgeReadOnly: "tylko do odczytu",
    branchProtected: "(chroniona)",
    downloadTitle: "Pobierz {repo} jako .{format}",
    downloadTitleRef: "Pobierz {repo} ({ref}) jako .{format}",
    actionsTab: "Działania",
    loadingRepo: "Wczytywanie repozytorium…",
    inaccessible: "Repozytorium niedostępne.",
    inaccessibleHttp: "Repozytorium niedostępne (HTTP {status}).",
    errorServerJoin: "Nie można połączyć się z serwerem.",
    copyDenied: "Przeglądarka odmówiła kopiowania.",
    reloadFolder: "Odśwież ten folder",
    root: "katalog główny",
    entries: "{count} pozycji",
    loadingShort: "Wczytywanie…",
    emptyRepo:
      "To repozytorium nie zawiera jeszcze plików. Zaimportuj archiwum, aby je zapełnić.",
    loadingFile: "Wczytywanie pliku…",
    selectFile: "Wybierz plik, aby zobaczyć podgląd.",
    lines: "{count} wierszy",
    copy: "Kopiuj",
    copied: "Skopiowano",
    raw: "Surowy",
    fileTooBig:
      "Plik zbyt duży do podglądu ({size}). Otwórz go na GitHubie.",
    fileBinary: "Plik binarny ({size}): brak podglądu tekstowego.",

    actionsTitle: "Zmień nazwę / opis",
    nameLabel: "Nazwa repozytorium",
    renameWarning:
      "Zmiana nazwy psuje istniejące klony, linki i strony GitHuba. GitHub przekierowuje starą nazwę, ale nie bez końca.",
    descLabel: "Opis",
    descPlaceholder: "Do czego służy to repozytorium?",
    save: "Zapisz",
    writeInsufficient: "Niewystarczające prawa zapisu w tym repozytorium.",
    visibilityTitle: "Widoczność",
    visibilityCurrently: "Obecnie {visibility}.",
    visibilityToPrivate:
      " Uczynienie go prywatnym odbiera dostęp wszystkim anonimowym użytkownikom.",
    visibilityToPublic:
      " Uczynienie go publicznym ujawnia całą historię commitów.",
    makePublic: "Ustaw jako publiczne",
    makePrivate: "Ustaw jako prywatne",
    dangerZone: "Strefa niebezpieczna",
    deleteWarning:
      "Usunięcie jest nieodwracalne: kod, historia, zgłoszenia i wiki.",
    deleteRepo: "Usuń repozytorium",
    deleteTitle: "Usuń {repo}",
    deleteConfirmBody:
      "Nie ma możliwości przywrócenia. Wpisz {name}, aby odblokować przycisk.",
    deleteForever: "Usuń trwale",
    cancel: "Anuluj",
    updated: "Repozytorium zaktualizowane.",
    deleted: "Repozytorium {repo} usunięte.",
    httpFailed: "Błąd (HTTP {status}).",
  },

  api: {
    authRequired: "Wymagane uwierzytelnienie.",
    jobNotFound: "Nie znaleziono zadania.",
    jobNotReady: "To zadanie nie jest jeszcze gotowe.",
    jobNotPushable: "To zadanie nie jest gotowe do wypchnięcia.",
    invalidJson: "Nieprawidłowa treść JSON.",
    invalidMultipart: "Nieprawidłowe żądanie (oczekiwano multipart/form-data).",
    emptyBody: "Pusta treść żądania.",
    emptyArchive: "Archiwum jest puste.",
    uploadFailed: "Nie udało się odebrać pliku. Spróbuj ponownie.",
    repoNameRequired:
      "Nazwa repozytorium jest wymagana do utworzenia nowego repozytorium.",
    branchNameTooLong: "Nazwa gałęzi jest zbyt długa.",
    invalidOptions: "Nieprawidłowe opcje.",
    invalidChange: "Nieprawidłowa zmiana.",
    noChange: "Brak zmian.",
    pathRequired: "Wymagany parametr „path”.",
  },
  errors: {
    encrypted:
      "To archiwum jest chronione hasłem, co nie jest jeszcze obsługiwane.",
    tooManyFiles: "Zbyt wiele plików w archiwum (osiągnięto limit).",
    tooBig:
      "Rozpakowana zawartość przekracza dozwolony rozmiar. Zmniejsz archiwum (node_modules?).",
    empty: "To archiwum nie zawiera żadnego użytecznego pliku.",
    corrupt:
      "Archiwum nieczytelne lub uszkodzone. Sprawdź plik i spróbuj ponownie.",
    unsupported:
      "Nieobsługiwany format (nieznana metoda kompresji lub wariant archiwum).",
    volume:
      "Wieloczęściowe archiwa RAR (.part1.rar, .part2.rar…) nie są obsługiwane.",
    unsafePaths:
      "Archiwum zawiera niebezpieczne ścieżki plików (traversal) i zostało odrzucone.",
    pathLimits:
      "Ścieżka pliku przekracza dozwolone limity (głębokość lub długość).",
    timeout: "Rozpakowanie trwało zbyt długo i zostało przerwane.",
    rateLimited: "Zbyt wiele żądań. Odczekaj chwilę i spróbuj ponownie.",
    notFound: "Nie znaleziono zasobu.",
    forbidden:
      "Nie masz prawa zapisu w tym repozytorium (lub token GitHub nie ma właściwego zakresu).",
    repoExists: "Repozytorium o tej nazwie już istnieje na Twoim koncie.",
    nameInvalid: "Nieprawidłowa nazwa repozytorium lub gałęzi.",
    noChanges:
      "Nie ma czego wypychać: pliki już odpowiadają repozytorium docelowemu.",
    conflict:
      "Repozytorium docelowe zmieniło się w międzyczasie. Spróbuj ponownie, wypchnij na osobną gałąź albo uruchom ponownie z opcją „Zastąp cały kod”, aby nadpisać gałąź zawartością archiwum.",
    scopeMissing:
      "GitHub odmawia zmiany plików workflow (.github/workflows/…): token nie ma zakresu „workflow”. Wyloguj się i zaloguj ponownie, aby go przyznać.",
    gitFailed: "Wypchnięcie na GitHuba nie powiodło się.",
    interrupted: "Przetwarzanie zostało przerwane (restart serwera).",
    badPath: "Nieprawidłowa ścieżka pliku.",
    confirmMismatch:
      "Potwierdzenie nie odpowiada nazwie repozytorium: nic nie zostało usunięte.",
    archiveTooBig:
      "To repozytorium jest zbyt duże, aby pobrać je jako archiwum.",
    internal: "Nieoczekiwany błąd wewnętrzny. Spróbuj ponownie za chwilę.",
  },
};
