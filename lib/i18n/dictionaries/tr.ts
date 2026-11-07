import type { Dict } from "../types";

export const tr: Dict = {
  meta: {
    title: "RepoDrop — .rar, .zip ve .tar arşivlerinizi GitHub'a aktarın",
    description:
      "Bir .rar, .zip, .tar veya .tar.gz arşivini bırakın, kodunuzu tek tıkla GitHub'a gönderin. Güvenli çıkarma, göndermeden önce önizleme, terminal ve git olmadan.",
    loginTitle: "GitHub ile giriş",
    loginDescription:
      "Bir depo oluşturup .rar, .zip veya .tar arşivlerinizi tek tıkla göndermek için GitHub hesabınızı RepoDrop'a bağlayın. Belirteç şifreli, veritabanına asla kaydedilmez.",
    importTitle: "Arşiv aktar",
    importDescription:
      "Dosyalarını önizlemek ve bir GitHub deposuna göndermek için .rar, .zip, .tar veya .tar.gz arşivi yükleyin.",
  },

  nav: {
    howItWorks: "Nasıl çalışır",
    myRepos: "Depolarım",
    importArchive: "Arşiv aktar",
    importShort: "Aktar",
    login: "Giriş yap",
    start: "Başla",
    logout: "Çıkış yap",
    avatarAlt: "{login} avatarı",
    language: "Dil",
    languageChange: "Dili değiştir",
    languageSearch: "Dil ara…",
    languageCurrent: "Geçerli dil: {name}",
  },

  home: {
    heroBadge: "Yeni: .tar ve .tar.gz",
    heroTitleLine1: "Kod arşivleriniz,",
    heroTitleLine2: "sürükle bırak ile GitHub'da.",
    heroBody:
      "Proje .rar, .zip veya .tar olarak mı geldi? GitHub'ı bağlayın, arşivi bırakın, depoyu seçin — gönderildi. Terminal yok, klonlama yok, yapılandırma yok.",
    ctaStart: "GitHub ile başla",
    ctaImport: "Arşiv aktar",
    ctaHow: "Nasıl çalışır",
    checkSandboxed: "Korumalı çıkarma",
    checkToken: "GitHub belirteci asla saklanmaz",
    checkFrench: "Açık: kaynak kodu herkese açık",

    statFormats: "arşiv biçimi",
    statFormatsSub: ".rar · .zip · .tar[.gz]",
    statCommands: "komut satırı",
    statCommandsSub: "her şey tek tıkla",
    statDuration: "yüklemeden gönderime",
    statDurationSub: "önizleme dahil",
    statDurationValue: "2 dk",
    statLanguages: "dil",
    statLanguagesSub: "arayüz ve mesajlar",

    stepsTitle: "Nasıl çalışır?",
    stepsLead: "Üç adım, iki dakika, hiç komut yok.",
    step1Title: "GitHub'ı bağlayın",
    step1Body:
      "Tek bir yetkilendirme tıklaması. Yalnızca gereken izinleri istiyoruz — belirteciniz tarayıcınızda şifreli kalır.",
    step2Title: "Arşivi bırakın",
    step2Body:
      ".rar, .zip veya .tar dosyanızı sürükleyin. Korumalı çıkarma, doğrulanmış yollar, göndermeden önce tam önizleme.",
    step3Title: "Tek tıkla gönderin",
    step3Body:
      "Bir depo oluşturun veya var olan bir depoya gönderin. Commit, GitHub kimliğinizle oluşturulur.",

    featuresTitle: "Basit olacak şekilde tasarlandı",
    featuresTitleAccent: "ve güvenli",
    featuresLead:
      "Kod aktarmak çocuk oyuncağı olmalı — sunucuyu bir kevgire çevirmeden.",
    feature1Title: "Yerel RAR, ZIP ve TAR",
    feature1Body:
      ".rar (RAR4/RAR5), .zip ve .tar/.tar.gz sunucu tarafında açılır — hiçbir yere yazılım kurmanız gerekmez.",
    feature2Title: "Kilitli çıkarma",
    feature2Body:
      "Zip-slip ve açma bombalarına karşı koruma, gömülü .git ve sembolik bağlantılar ayıklanır. Depolarınız temiz kalır.",
    feature3Title: "Göndermeden önce önizleme",
    feature3Body:
      "Dosyalar, boyutlar, kök klasör, node_modules: neyin gittiğini tam olarak görür ve kontrolü elde tutarsınız.",
    feature4Title: "Sıfır komut satırı",
    feature4Body:
      "Klonlama yok, git kimlik bilgisi yok, «git push -u origin» yok. Aracın her şeyi sizin için yapar.",
    feature5Title: "Yeni veya var olan depo",
    feature5Body:
      "Özel ya da herkese açık bir depo oluşturun veya arşivi var olan bir depoya ekleyin — isterseniz ayrı bir dalda.",
    feature6Title: "Yapay zekâya hazır bağlantılar",
    feature6Body:
      "Gönderimden sonra: Codespaces, vscode.dev, klonlama URL'si, gh komutu ve .zip arşivi. Bir kopyala-yapıştır yeter.",

    formatsTitle: "Hangi yaşta olursa olsun, her arşiv",
    formatsBody:
      "Eski Windows .rar dosyaları, bir dışa aktarımın .zip dosyaları, bir Linux sunucusunun .tar.gz dosyaları: her şey sunucu tarafında, akış hâlinde, aynı güvenlik ağlarıyla okunur. Tek kök klasör otomatik olarak kaldırılır ve node_modules varsayılan olarak hariç tutulur.",

    securityTitle: "Neyi reddediyoruz ve neden",
    securityLead:
      "Bir yabancının arşivini açmak riskli bir spordur. Her aktarımın altına gerilen ağlar bunlar.",
    guard1Title: "Zip-slip ve traversal",
    guard1Body:
      "Her yol doğrulanır (../, mutlak, UNC, NUL). Tek bir deneme ve arşivin tamamı reddedilir.",
    guard2Title: "Açma bombaları",
    guard2Body:
      "Bildirilen boyutlar yazmadan önce toplanır: en fazla {extract} açılmış ve {files} dosya.",
    guard3Title: "GitHub belirteci",
    guard3Body:
      "Şifreli httpOnly çerez (JWE A256GCM), GIT_ASKPASS ile gönderim. Asla veritabanında, asla günlüklerde.",
    guard4Title: "Kotalar",
    guard4Body:
      "IP başına saatte 30 yükleme ve kullanıcı başına saatte 10 gönderim, kalıcı sayaçlar: hizmet sağlıklı kalır.",
    limitsNote:
      "Varsayılan sınırlar: {upload} yüklendi, {extract} açıldı, aktarım başına {files} dosya.",

    faqTitle: "Sık sorulan sorular",
    faqLead:
      "Arşivleri GitHub'a aktarma, kabul edilen biçimler ve hesabınızın gizliliği hakkında her şey.",

    ctaTitle: "Sıradaki arşivinizi GitHub'a boşaltmaya hazır mısınız?",
    ctaLead: "Giriş yapın, bırakın, gönderin. Gerisini biz hallederiz.",

    mockFile: "projem.tar",
    mockFileMeta: "{size} · {count} dosya",
    mockExcluded: "hariç",
    mockPushed: "github.com/sen/projem adresine gönderildi · main dalı",
  },

  faq: {
    q1: "Git kullanmadan bir .rar veya .zip arşivini GitHub'a nasıl koyarım?",
    a1: "RepoDrop'ta GitHub hesabınızı bağlayın, .rar, .zip, .tar veya .tar.gz dosyanızı sürükleyip bırakın, çıkarılan dosyaların önizlemesini kontrol edin ve yeni ya da var olan bir depo seçin. RepoDrop commit'i oluşturur ve kodu doğrudan GitHub kimliğinizle gönderir; terminal veya komut satırı gerekmez.",
    q2: "Hangi arşiv biçimleri ve boyutları destekleniyor?",
    a2: "RepoDrop .rar (RAR4 ve RAR5), .zip, .tar, .tar.gz ve .tgz arşivlerini yerel olarak destekler; bunlar sunucu tarafında sihirli baytlarından tanınır. Varsayılan olarak bir arşiv sıkıştırılmış hâlde {upload} ağırlığında olabilir ({extract} açılmış ve {files} dosya).",
    q3: "GitHub belirteci ve özel kaynak kodum saklanıyor mu?",
    a3: "Hayır. GitHub OAuth belirteciniz yalnızca tarayıcınızdaki şifreli bir httpOnly çerezde (JWE A256GCM) yaşar: asla veritabanına veya günlüklere yazılmaz. Çıkarılan dosyalar yalıtılmış geçici bir alanda durur ve gönderimden sonra otomatik olarak silinir.",
    q4: "Arşivi çalışmamı ezmeden var olan bir GitHub deposuna gönderebilir miyim?",
    a4: "Evet. Yeni bir depo oluşturabilir (herkese açık veya özel), ana dalı korumak için var olan bir deponun ayrı bir dalına gönderebilir ya da onayla birlikte tam değiştirme seçeneğini açıkça seçebilirsiniz.",
    q5: "Aktarım sırasında tek kök klasöre ve node_modules'a ne olur?",
    a5: "Arşiv tek bir sarmalayıcı klasör içeriyorsa (örneğin projem/), RepoDrop dosyalarınızın doğrudan depo köküne yerleşmesi için onu otomatik olarak kaldırmayı önerir. node_modules, gömülü .git klasörleri ve gereksiz sistem dosyaları (.DS_Store, __MACOSX) varsayılan olarak ayıklanır.",
  },

  login: {
    title: "RepoDrop'a giriş",
    description:
      "Depo oluşturmak ve arşivlerinizi göndermek için GitHub erişimine izin verin.",
    continueWithGithub: "GitHub ile devam et",
    scopesLead: "Yalnızca şu izinleri istiyoruz:",
    scopesAnd: "ve",
    scopesTail:
      ": sizin adınıza depo oluşturmak ve kod göndermek (.github/workflows/ dosyalarınız dahil). Belirteciniz bir httpOnly çerezde şifrelenir, asla veritabanına kaydedilmez.",
    bulletCookie: "Şifreli httpOnly çerez (A256GCM)",
    bulletLogout: "Çıkış = belirteç tarayıcıdan silinir",
    devMode: "Geliştirme modu",
    devLogin: "Doğrudan giriş (sunucunun GH_TOKEN'ı)",
    errorState: "Giriş oturumu sona erdi. Tekrar deneyin.",
    errorOauth: "GitHub yetkilendirmeyi reddetti. Baştan başlayın.",
    errorConfig:
      "Uygulama yapılandırılmamış: GITHUB_CLIENT_ID / GITHUB_CLIENT_SECRET tanımlayıp yeniden başlatın.",
    errorDevauth: "Geliştirme modu: sunucunun GH_TOKEN'ı eksik veya geçersiz.",
    errorGeneric: "Giriş hatası.",
  },

  importPage: {
    title: "Arşiv aktar",
    lead: "Kodunuzu içeren bir .rar, .zip veya .tar (aynı zamanda .tar.gz) dosyasını bırakın. GitHub'a herhangi bir gönderimden önce tam bir önizleme göreceksiniz.",
    browseLead:
      "Önce hesabınızda ne olduğuna bakmak ister misiniz? Hiçbir şey göndermeden depolarınızı ve içeriklerini gezin.",
    browseCta: "Depolarımı gezin",
    limitLabel: "Sınır:",
    limitBody: "arşiv başına {upload}, {extract} açılmış.",
    securityLabel: "Güvenlik:",
    securityBody: "doğrulanmış yollar, .git ve bağlantılar ayıklandı.",
    afterLabel: "Sonra:",
    afterBody: "önizleme, depo seçimi, ardından gönderim.",
  },

  uploader: {
    dropLabel: "Bir .rar, .zip veya .tar arşivi bırakın",
    uploading: "Arşiv gönderiliyor… {progress}%",
    keepOpen: "Bu sekmeyi kapatmayın.",
    dropHint: "Arşivinizi buraya sürükleyin veya göz atmak için tıklayın",
    formatsHint: ".rar, .zip, .tar ve .tar.gz — en fazla {max} ({extract} açılmış)",
    errorFormat:
      "Desteklenmeyen biçim: yalnızca .rar, .zip, .tar ve .tar.gz dosyaları kabul edilir.",
    errorEmpty: "Bu dosya boş.",
    errorTooLarge: "Arşiv çok büyük (en fazla {max}).",
    errorHttp: "Gönderim başarısız (HTTP {status}). Tekrar deneyin.",
    errorNetwork: "Gönderim sırasında bağlantı koptu. Tekrar deneyin.",
  },

  footer: {
    tagline:
      "Kod arşivleriniz, GitHub'da, sürükle bırak ile. Terminal yok, klonlama yok, git yapılandırması yok.",
    productTitle: "Ürün",
    home: "Ana sayfa",
    importArchive: "Arşiv aktar",
    howItWorks: "Nasıl çalışır",
    security: "Güvenlik",
    faq: "Sık sorulan sorular",
    formatsTitle: "Desteklenen biçimler",
    guaranteesTitle: "Garantiler",
    guarantee1: "GitHub belirteci şifreli, asla veritabanında saklanmaz",
    guarantee2: "Korumalı çıkarma, doğrulanmış yollar",
    guarantee3: "Her gönderimden önce tam önizleme",
    copyright: "© {year} RepoDrop — arşivleriniz, GitHub'ınız.",
    reserved: "Ayrılmış alan",
  },

  notFound: {
    title: "Sayfa bulunamadı",
    body: "Bu sayfa yok — ya da iş sona erdi (arşivler bir süre sonra silinir).",
    back: "Ana sayfaya dön",
  },
  jobs: {
    metaTitle: "İçe aktarma takibi",

    statusQueued: "Sırada",
    statusExtracting: "Çıkarılıyor",
    statusReady: "Göndermeye hazır",
    statusPushing: "Gönderiliyor…",
    statusDone: "Tamamlandı",
    statusFailed: "Başarısız",

    extractingTitle: "Çıkarma sürüyor…",
    extractingBody:
      "Yollar ve boyutlar doğrulanıyor, kök klasör tespit ediliyor. Her şey sunucu tarafında, yalıtılmış bir alanda olur.",
    pushingTitle: "GitHub'a gönderiliyor…",
    pushingBody:
      "Commit oluşturuluyor ve dosyalar gönderiliyor. Bu sekmeyi açık bırakabilirsiniz — sizi bilgilendireceğiz.",

    failedTitle: "İşlem başarısız oldu",
    failedUnknown: "Bilinmeyen hata.",
    lostConnection: "Bağlantı kesildi. Tekrar deneyin.",
    httpFailed: "Başarısız (HTTP {status}).",
    repoMoved:
      "{repo} deposu içe aktarmanızdan bu yana ilerledi. Dalını bu arşivin tam içeriğiyle üzerine yazabilirsiniz: arşivde olmayan dosyalar depodan silinir ve gönderim zorlanır. Mevcut geçmiş korunur (üzerine yeni bir commit eklenir).",
    repoMovedConfirm:
      "Bu deponun tüm kodunun bu arşivle değiştirilmesini onaylıyor musunuz?",
    replaceAllYes: "Evet, tüm kodu değiştir",
    replaceAllRetry: "Tüm kodu değiştirerek yeniden dene",
    cancel: "Vazgeç",
    retryOtherArchive: "Başka bir arşivle yeniden dene",
    backHome: "Ana sayfaya dön",

    doneTitle: "Gönderildi!",
    doneBody: "{count} dosya şu dala aktarıldı:",
    doneCommit: "commit",
    doneCreated: "· depo oluşturuldu",
    openOnGithub: "GitHub'da aç",
    copyLink: "Bağlantıyı kopyala",
    downloadZip: ".zip olarak indir",
    aiLinksTitle: "Bir yapay zekâya vermeye hazır bağlantılar:",
    anotherImport: "Başka bir arşiv içe aktar",

    linkRepo: "GitHub deposu",
    linkBranch: "«{branch}» dalı",
    linkBranchSub: "Bu dala gönderin",
    linkCommit: "Tam commit",
    linkCodespaces: "Codespaces (GitHub yapay zekâ aracısı)",
    linkCodespacesSub: "vscode.dev kullanıma hazır, Copilot bağlı",
    linkVscode: "vscode.dev (resmî web düzenleyici)",
    linkVscodeSub: "Copilot + düzenleme + çalıştırma (Codespaces)",
    linkClone: "Klonlama URL'si (harici aracı)",
    linkCloneSub: "Aracı kendi GitHub oturumuyla kimlik doğrular",
    linkGh: "`gh` CLI komutu",

    previewTitle: "Arşiv önizlemesi",
    previewLead: "Güvenlik filtrelerinden sonra gönderilecek olanlar.",
    previewFiles: "Dosyalar",
    previewSize: "Açılmış boyut",
    previewIgnored: "Yok sayılanlar:",
    ignoredGit: ".git ({count})",
    ignoredSystemFiles: "sistem dosyaları ({count})",
    ignoredSymlinks: "sembolik bağlantılar ({count})",
    ignoredHardlinks: "sabit bağlantılar ({count})",
    ignoredBlocked: "engellenen yollar ({count})",
    tooLargeForGithub:
      "{count} dosya 100 MB'ı aşıyor: GitHub bunları büyük olasılıkla reddeder. Örn.:",

    filtersTitle: "İçe aktarma filtreleri",
    filtersNone: "Bu arşiv için kullanılabilir filtre yok.",
    stripRootLabel: "Kök klasörü kaldır",
    stripRootHint:
      "Önerilir: proje içeriği doğrudan depo köküne yerleşir.",
    includeNodeModules: "Dahil et",
    includeNodeModulesHint:
      "Varsayılan olarak işaretsiz: ağır ve depoda nadiren yararlı.",

    destTitle: "Hedef",
    destLead: "Bu dosyalar nereye gönderilsin?",
    destNew: "Yeni depo",
    destExisting: "Mevcut depo",
    repoNameLabel: "Depo adı",
    repoNamePlaceholder: "benim-projem",
    repoNameInvalid:
      "Yalnızca harf, rakam, nokta, tire ve alt çizgi (bir harf veya rakamla başlamalı).",
    visibilityLabel: "Görünürlük",
    visibilityPrivate: "Özel",
    visibilityPrivateHint: "Yalnızca siz görürsünüz",
    visibilityPublic: "Herkese açık",
    visibilityPublicHint: "Herkes görür",
    searchRepo: "Depo ara…",
    loadingRepos: "Depolarınız yükleniyor…",
    reposLoadError: "Depolarınız yüklenemedi.",
    noWritableRepo:
      "Yazma izni olan erişilebilir depo yok. Yeni bir tane oluşturun!",
    noRepoMatch: "Aramayla eşleşen depo yok.",
    dedicatedBranch: "Ayrı bir dal oluştur",
    dedicatedHintExisting:
      "Varsayılan dala dokunmamak: paylaşılan bir depo için ideal.",
    dedicatedHintNew:
      "Yeni deponun ilk dal adı (aksi hâlde varsayılan dal).",
    replaceAll: "Deponun tüm kodunu değiştir",
    replaceAllHint:
      "Depo tam olarak arşivdeki dosyaları içerecek: arşivde olmayanlar silinecek ve gönderim zorlanacak — depo bu arada değişmiş olsa bile başarılı olacak («fetch first» hatası artık yok). Arşiv projenin tam yeni sürümüyse kullanın.",
    replaceConfirm:
      "Onaylıyorum: {repo} deposunda bu arşivde olmayan dosyalar gönderilen daldan kalıcı olarak silinecek.",
    replaceConfirmNoRepo:
      "Onaylıyorum: depoda bu arşivde olmayan dosyalar gönderilen daldan kalıcı olarak silinecek.",
    advanced: "Gelişmiş seçenekler",
    commitMessage: "Commit mesajı",
    commitPlaceholder: "{filename} RepoDrop ile içe aktarıldı",
    pushAction: "GitHub'a gönder",
    replacePushAction: "GitHub'daki tüm kodu değiştir",
    sending: "Gönderiliyor…",
    replaceNeedConfirm:
      "Düğmeyi etkinleştirmek için değiştirme onayını işaretleyin.",
    tokenNote:
      "GitHub belirteciniz şifreli bir çerezde kalır — veritabanına asla yazılmaz.",
  },

  repos: {
    metaTitle: "Depolarım",
    pageTitle: "Depolarım",
    pageLead:
      "Bir şey içe aktarmadan önce depolarınıza göz atın: ağaç, dosya önizlemesi, istediğiniz dal. Yeniden adlandırma, görünürlük ve silme bir deponun {actions} sekmesinde bulunur.",

    filterPlaceholder: "Ada, açıklamaya veya dile göre filtrele…",
    filterAria: "Depoları filtrele",
    sortAria: "Sırala",
    sortPushed: "Son etkinlik",
    sortName: "Ad (A→Z)",
    sortSize: "Boyut",
    mine: "Benimkiler",
    refresh: "Yenile",
    errorList: "Liste kullanılamıyor (HTTP {status}).",
    errorServer: "Sunucuya ulaşılamıyor.",
    truncated:
      "Yalnızca en yeni 300 depo yüklendi. Yukarıdaki filtreyle daraltın.",
    loading: "Depolarınız yükleniyor…",
    emptyFilter: "Bu filtreyle eşleşen depo yok.",
    emptyToken: "Bu GitHub belirteciyle görünür depo yok.",
    countAll: "{count} depo",
    countFiltered: "{total} depodan {count}",
    countHint: "— içeriğe göz atmak için tıklayın.",
    noDescription: "Açıklama yok",
    pushedAgo: "{when} gönderildi",
    issues: "{count} issue",
    readOnly: "salt okunur",

    backToList: "Listeye dön",
    list: "Liste",
    badgePrivate: "özel",
    badgePublic: "herkese açık",
    badgeArchived: "arşivlenmiş",
    badgeFork: "fork",
    badgeReadOnly: "salt okunur",
    branchProtected: "(korumalı)",
    downloadTitle: "{repo} deposunu .{format} olarak indir",
    downloadTitleRef: "{repo} ({ref}) deposunu .{format} olarak indir",
    actionsTab: "İşlemler",
    loadingRepo: "Depo yükleniyor…",
    inaccessible: "Depoya erişilemiyor.",
    inaccessibleHttp: "Depoya erişilemiyor (HTTP {status}).",
    errorServerJoin: "Sunucuya ulaşılamıyor.",
    copyDenied: "Tarayıcı kopyalamayı reddetti.",
    reloadFolder: "Bu klasörü yenile",
    root: "kök",
    entries: "{count} öğe",
    loadingShort: "Yükleniyor…",
    emptyRepo:
      "Bu depoda henüz dosya yok. Doldurmak için bir arşiv içe aktarın.",
    loadingFile: "Dosya yükleniyor…",
    selectFile: "Önizlemek için bir dosya seçin.",
    lines: "{count} satır",
    copy: "Kopyala",
    copied: "Kopyalandı",
    raw: "Ham",
    fileTooBig:
      "Dosya önizleme için çok büyük ({size}). GitHub'da açın.",
    fileBinary: "İkili dosya ({size}): metin önizlemesi yok.",

    actionsTitle: "Yeniden adlandır / açıkla",
    nameLabel: "Depo adı",
    renameWarning:
      "Yeniden adlandırma mevcut klonları, bağlantıları ve GitHub sayfalarını bozar. GitHub eski adı yönlendirir, ama sonsuza kadar değil.",
    descLabel: "Açıklama",
    descPlaceholder: "Bu depo ne için?",
    save: "Kaydet",
    writeInsufficient: "Bu depoda yazma izni yetersiz.",
    visibilityTitle: "Görünürlük",
    visibilityCurrently: "Şu anda {visibility}.",
    visibilityToPrivate:
      " Özel yapmak, tüm anonim kullanıcıların erişimini kaldırır.",
    visibilityToPublic:
      " Herkese açık yapmak, tüm commit geçmişini ortaya çıkarır.",
    makePublic: "Herkese açık yap",
    makePrivate: "Özel yap",
    dangerZone: "Tehlikeli bölge",
    deleteWarning:
      "Silme kalıcıdır: kod, geçmiş, issue'lar ve wiki.",
    deleteRepo: "Depoyu sil",
    deleteTitle: "{repo} deposunu sil",
    deleteConfirmBody:
      "Geri dönüş yok. Düğmeyi etkinleştirmek için {name} yazın.",
    deleteForever: "Kalıcı olarak sil",
    cancel: "Vazgeç",
    updated: "Depo güncellendi.",
    deleted: "{repo} deposu silindi.",
    httpFailed: "Başarısız (HTTP {status}).",
  },

  api: {
    authRequired: "Kimlik doğrulama gerekli.",
    jobNotFound: "İş bulunamadı.",
    jobNotReady: "Bu iş henüz hazır değil.",
    jobNotPushable: "Bu iş göndermeye hazır değil.",
    invalidJson: "Geçersiz JSON gövdesi.",
    invalidMultipart: "Geçersiz istek (multipart/form-data bekleniyordu).",
    emptyBody: "Boş istek gövdesi.",
    emptyArchive: "Arşiv boş.",
    uploadFailed: "Dosya alınamadı. Tekrar deneyin.",
    repoNameRequired:
      "Yeni depo oluşturmak için depo adı gereklidir.",
    branchNameTooLong: "Dal adı çok uzun.",
    invalidOptions: "Geçersiz seçenekler.",
    invalidChange: "Geçersiz değişiklik.",
    noChange: "Değişiklik yok.",
    pathRequired: "«path» parametresi gerekli.",
  },
  errors: {
    encrypted:
      "Bu arşiv parola korumalı; bu henüz desteklenmiyor.",
    tooManyFiles: "Arşivde çok fazla dosya var (sınıra ulaşıldı).",
    tooBig:
      "Açılmış içerik izin verilen boyutu aşıyor. Arşivi küçültün (node_modules?).",
    empty: "Bu arşivde kullanılabilir hiçbir dosya yok.",
    corrupt:
      "Arşiv okunamıyor veya bozuk. Dosyayı kontrol edip tekrar deneyin.",
    unsupported:
      "Desteklenmeyen biçim (bilinmeyen sıkıştırma yöntemi veya arşiv türü).",
    volume:
      "Çok parçalı RAR arşivleri (.part1.rar, .part2.rar…) desteklenmiyor.",
    unsafePaths:
      "Arşiv tehlikeli dosya yolları (traversal) içeriyor ve reddedildi.",
    pathLimits:
      "Bir dosya yolu izin verilen sınırları aşıyor (derinlik veya uzunluk).",
    timeout: "Çıkarma çok uzun sürdü ve durduruldu.",
    rateLimited: "Çok fazla istek. Biraz bekleyip tekrar deneyin.",
    notFound: "Kaynak bulunamadı.",
    forbidden:
      "Bu depoda yazma izniniz yok (veya GitHub belirtecinde doğru kapsam yok).",
    repoExists: "Hesabınızda bu adla bir depo zaten var.",
    nameInvalid: "Geçersiz depo veya dal adı.",
    noChanges:
      "Gönderilecek bir şey yok: dosyalar hedef depoyla zaten aynı.",
    conflict:
      "Hedef depo bu arada değişti. Tekrar deneyin, ayrı bir dala gönderin veya dalı arşivin içeriğiyle ezmek için «Tüm kodu değiştir» ile yeniden başlatın.",
    scopeMissing:
      "GitHub workflow dosyalarının (.github/workflows/…) değiştirilmesini reddediyor: belirteçte «workflow» kapsamı yok. Vermek için çıkış yapıp yeniden giriş yapın.",
    gitFailed: "GitHub'a gönderme başarısız oldu.",
    interrupted: "İşlem kesildi (sunucu yeniden başlatıldı).",
    badPath: "Geçersiz dosya yolu.",
    confirmMismatch:
      "Onay, depo adıyla eşleşmiyor: hiçbir şey silinmedi.",
    archiveTooBig:
      "Bu depo tek bir arşiv olarak indirilemeyecek kadar büyük.",
    internal: "Beklenmeyen iç hata. Birazdan tekrar deneyin.",
  },
};
