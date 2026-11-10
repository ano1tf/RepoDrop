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
    jobTitle: "Śledzenie importu",
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
    checkFrench: "Otwarty przepływ pracy",

    statFormats: "formaty archiwów",
    statFormatsSub: ".rar · .zip · .tar[.gz]",
    statCommands: "wiersz poleceń",
    statCommandsSub: "wszystko jednym kliknięciem",
    statDuration: "od wgrania do pusha",
    statDurationSub: "z podglądem",
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

    mockFile: "moj-projekt.zip",
    mockFileMeta: "{size} · {count} plików",
    mockExcluded: "pominięty",
    mockPushed: "Wypchnięto do github.com/ty/moj-projekt · branch main",

    demoEyebrow: "Magia przed logowaniem",
    demoTitle: "Z archiwum do repo na GitHubie w sekundy.",
    demoTitleAccent: "Bez terminala.",
    demoLead: "Przeciągnij, sprawdź podgląd, pushuj. Zero komend, nic nie wychodzi bez twojej zgody.",
    demoStep1: "Lokalne archiwum",
    demoStep2: "Rozpakowanie OK",
    demoStep3: "Repo gotowe",
    demoFileMeta: "18,4 MB · 1 284 pliki",
    demoScan: "Ścieżki sprawdzone",
    demoPushed: "Pushnięte · teraz",
    demoBranches: "main",
    demoNoAccount: "Zero konta, zero terminala.",
    demoLocalBadge: "Lokalnie",
    demoDropHint: "Przeciągnij tutaj plik .zip",
    demoDropBrowse: "lub wybierz plik",
    demoDropCta: "Importuj archiwum",
    demoDropError: "Akceptowane są tylko pliki .zip.",
    demoReading: "Odczyt archiwum…",
    demoExtracting: "Rozpakowywanie…",
    demoReady: "Gotowe do wypchnięcia",
    demoReadyMeta: "Wykryto {count} plików · nic nie opuściło przeglądarki",
    demoPushCta: "Wypchnij na GitHub",
    demoLocalNote: "Twoje pliki zostają w przeglądarce — nic nie jest wysyłane.",
    demoConnectTitle: "Plik gotowy!",
    demoConnectBody: "Połącz konto GitHub, aby dokończyć wypchnięcie.",
    demoConnectNote: "Archiwum nie opuściło przeglądarki: zostanie wypchnięte z Twojej sesji GitHub.",
    demoConnectCta: "Połącz z GitHub",
    demoConnectLater: "Później",
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
    dropTitle: "Przeciągnij tutaj archiwum, aby wypchnąć je na GitHub.",
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

  job: {
    statusQueued: "W kolejce",
    statusExtracting: "Rozpakowywanie",
    statusReady: "Gotowe do wypchnięcia",
    statusPushing: "Wypychanie…",
    statusDone: "Gotowe",
    statusFailed: "Błąd",
    extractingTitle: "Rozpakowywanie…",
    extractingBody: "Sprawdzanie ścieżek, limit rozmiaru i wykrywanie katalogu głównego. Wszystko dzieje się na serwerze, w izolowanym środowisku.",
    pushingTitle: "Wypychanie na GitHub…",
    pushingBody: "Tworzenie commita i wysyłanie plików. Możesz zostawić tę kartę otwartą — będziemy informować.",
    doneTitle: "Wypchnięte!",
    doneFiles: "Zaimportowano {count} plików na gałąź {branch}",
    doneCommit: "commit {sha}",
    doneCreated: "repozytorium utworzone",
    doneOpenGithub: "Otwórz na GitHubie",
    doneCopyLink: "Kopiuj link",
    doneDownload: "Pobierz jako .zip",
    doneImportAnother: "Zaimportuj inną archiwum",
  },

  notFound: {
    title: "Nie znaleziono strony",
    body: "Ta strona nie istnieje — albo zadanie wygasło (archiwa są usuwane po pewnym czasie).",
    back: "Wróć na stronę główną",
  },
};
