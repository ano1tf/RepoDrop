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
    checkFrench: "Açık iş akışı",

    statFormats: "arşiv biçimi",
    statFormatsSub: ".rar · .zip · .tar[.gz]",
    statCommands: "komut satırı",
    statCommandsSub: "her şey tek tıkla",
    statDuration: "yüklemeden gönderime",
    statDurationSub: "önizleme dahil",
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

    mockFile: "projem.zip",
    mockFileMeta: "{size} · {count} dosya",
    mockExcluded: "hariç",
    mockPushed: "github.com/sen/projem adresine gönderildi · main dalı",

    demoEyebrow: "Girişten önce sihir",
    demoTitle: "Arşivden GitHub reposuna saniyeler içinde.",
    demoTitleAccent: "Terminal yok.",
    demoLead: "Sürükle, önizlemeye bak, push'la. Komut yok; onaylamadan hiçbir şey gitmez.",
    demoStep1: "ZIP'i sürükle",
    demoStep2: "Çıkarma doğrulandı",
    demoStep3: "Repo hazır",
    demoDropZone: "Sürükle bırak",
    demoScan: "Yollar doğrulandı",
    demoPushed: "Push'landı · az önce",
    demoBranches: "main",
    demoNoAccount: "Hesap yok, terminal yok.",
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
};
