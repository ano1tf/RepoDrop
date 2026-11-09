import type { Dict } from "../types";

/**
 * العربية — dictionnaire complet, écrit en arabe standard moderne.
 * L'interface passe en `dir="rtl"` : voir `dirOf()` et `<html dir>` dans le
 * layout. Les marques latines (`.rar`, `GitHub`, `node_modules`) restent en
 * caractères latins, comme dans tout texte technique arabe.
 */
export const ar: Dict = {
  meta: {
    title: "RepoDrop — استورد أرشيفات .rar و.zip و.tar إلى GitHub",
    description:
      "أفلِت أرشيف .rar أو .zip أو .tar أو .tar.gz وادفع شيفرتك إلى GitHub بنقرة واحدة. استخراج آمن، معاينة قبل الإرسال، بلا طرفية وبلا git.",
    loginTitle: "تسجيل الدخول عبر GitHub",
    loginDescription:
      "اربط حساب GitHub بـ RepoDrop لإنشاء مستودع ودفع أرشيفات .rar أو .zip أو .tar بنقرة واحدة. الرمز مشفَّر ولا يُخزَّن في قاعدة البيانات أبدًا.",
    importTitle: "استيراد أرشيف",
    importDescription:
      "ارفع أرشيف .rar أو .zip أو .tar أو .tar.gz لمعاينة ملفاته ودفعه إلى مستودع GitHub.",
  },

  nav: {
    howItWorks: "كيف يعمل",
    myRepos: "مستودعاتي",
    importArchive: "استيراد أرشيف",
    importShort: "استيراد",
    login: "تسجيل الدخول",
    start: "ابدأ",
    logout: "تسجيل الخروج",
    avatarAlt: "صورة {login}",
    language: "اللغة",
    languageChange: "تغيير اللغة",
    languageSearch: "ابحث عن لغة…",
    languageCurrent: "اللغة الحالية: {name}",
  },

  home: {
    heroBadge: "جديد: .tar و.tar.gz",
    heroTitleLine1: "أرشيفات شيفرتك،",
    heroTitleLine2: "على GitHub بسحب وإفلات.",
    heroBody:
      "وصلك مشروع بصيغة .rar أو .zip أو .tar؟ اربط GitHub، أفلِت الأرشيف، اختر المستودع — وقد تم الدفع. بلا طرفية، بلا استنساخ، بلا إعداد.",
    ctaStart: "ابدأ مع GitHub",
    ctaImport: "استيراد أرشيف",
    ctaHow: "كيف يعمل",
    checkSandboxed: "استخراج معزول",
    checkToken: "رمز GitHub لا يُخزَّن أبدًا",
    checkFrench: "سير عمل مفتوح",

    statFormats: "صيغ الأرشيف",
    statFormatsSub: ".rar · .zip · .tar[.gz]",
    statCommands: "سطر أوامر",
    statCommandsSub: "كل شيء بنقرة",
    statDuration: "من الإفلات إلى الدفع",
    statDurationSub: "المعاينة مشمولة",
    statLanguages: "لغات",
    statLanguagesSub: "الواجهة والرسائل",

    stepsTitle: "كيف يعمل؟",
    stepsLead: "ثلاث خطوات، دقيقتان، بلا أي أمر.",
    step1Title: "اربط GitHub",
    step1Body:
      "نقرة تفويض واحدة. نطلب فقط الصلاحيات اللازمة — يبقى رمزك مشفَّرًا داخل متصفحك.",
    step2Title: "أفلِت الأرشيف",
    step2Body:
      "اسحب ملف .rar أو .zip أو .tar. استخراج معزول، مسارات موثَّقة، ومعاينة كاملة قبل الإرسال.",
    step3Title: "ادفع بنقرة واحدة",
    step3Body:
      "أنشئ مستودعًا أو ادفع إلى مستودع قائم. يُنشأ الـ commit بهويتك على GitHub.",

    featuresTitle: "مصمَّم ليكون بسيطًا",
    featuresTitleAccent: "وآمنًا",
    featuresLead:
      "استيراد الشيفرة يجب أن يكون سهلاً — دون تحويل الخادم إلى مصفاة.",
    feature1Title: "دعم أصلي لـ RAR وZIP وTAR",
    feature1Body:
      "تُفتح ملفات .rar (RAR4/RAR5) و.zip و.tar/.tar.gz على الخادم — لا حاجة لتثبيت أي برنامج.",
    feature2Title: "استخراج محصَّن",
    feature2Body:
      "حماية من zip-slip ومن قنابل فك الضغط، واستبعاد مجلدات .git المضمَّنة والروابط الرمزية. تبقى مستودعاتك نظيفة.",
    feature3Title: "معاينة قبل الدفع",
    feature3Body:
      "الملفات والأحجام والمجلد الجذر وnode_modules: ترى بالضبط ما سيخرج، وتبقى مسيطرًا.",
    feature4Title: "صفر سطر أوامر",
    feature4Body:
      "بلا استنساخ، بلا بيانات اعتماد git، بلا «git push -u origin». الأداة تتولى كل شيء عنك.",
    feature5Title: "مستودع جديد أو قائم",
    feature5Body:
      "أنشئ مستودعًا خاصًا أو عامًا، أو أضف الأرشيف إلى مستودع قائم — على فرع مخصَّص إن أحببت.",
    feature6Title: "روابط جاهزة للذكاء الاصطناعي",
    feature6Body:
      "بعد الدفع: Codespaces وvscode.dev ورابط الاستنساخ وأمر gh وأرشيف .zip. يكفي نسخ ولصق.",

    formatsTitle: "أي أرشيف، أيًّا كان عمره",
    formatsBody:
      "ملفات .rar القديمة من Windows، وملفات .zip من تصدير، وملفات .tar.gz من خادم Linux: كل شيء يُقرأ على الخادم، بتدفق، وبنفس الضمانات. يُزال المجلد الجذر الوحيد تلقائيًا، ويُستبعد node_modules افتراضيًا.",

    securityTitle: "ما نرفضه، ولماذا",
    securityLead:
      "فك ضغط أرشيف شخص غريب رياضة محفوفة بالمخاطر. هذه هي الشبكات الممدودة تحت كل استيراد.",
    guard1Title: "Zip-slip وtraversal",
    guard1Body:
      "يُتحقق من كل مسار (../، المطلق، UNC، NUL). محاولة واحدة ويُرفض الأرشيف بأكمله.",
    guard2Title: "قنابل فك الضغط",
    guard2Body:
      "تُجمع الأحجام المعلنة قبل الكتابة: {extract} مفكوكة و{files} ملفًا كحد أقصى.",
    guard3Title: "رمز GitHub",
    guard3Body:
      "كوكي httpOnly مشفَّر (JWE A256GCM)، والدفع عبر GIT_ASKPASS. لا في قاعدة البيانات ولا في السجلات.",
    guard4Title: "الحصص",
    guard4Body:
      "30 رفعًا/ساعة لكل IP و10 دفعات/ساعة لكل مستخدم، بعدادات محفوظة: تبقى الخدمة سليمة.",
    limitsNote:
      "الحدود الافتراضية: {upload} مرفوعة، {extract} مفكوكة، {files} ملفًا لكل استيراد.",

    faqTitle: "أسئلة متكررة",
    faqLead:
      "كل شيء عن استيراد الأرشيفات إلى GitHub والصيغ المقبولة وخصوصية حسابك.",

    ctaTitle: "مستعد لتفريغ أرشيفك التالي على GitHub؟",
    ctaLead: "سجّل الدخول، أفلِت، ادفع. نحن نتولى الباقي.",

    mockFile: "مشروعي.zip",
    mockFileMeta: "{size} · {count} ملفًا",
    mockExcluded: "مستبعد",
    mockPushed: "دُفع إلى github.com/أنت/مشروعي · الفرع main",

    demoEyebrow: "السحر قبل تسجيل الدخول",
    demoTitle: "من أرشيف محلي إلى مستودع GitHub في ثوانٍ.",
    demoTitleAccent: "دون طرفية.",
    demoLead: "أفلِت، راجِع، ثم ادفع. لا أوامر تكتبها ولا مستودع تنسخه، ولا يُرسل شيء قبل موافقتك.",
    demoStep1: "أفلِت الأرشيف",
    demoStep2: "استخراج موثّق",
    demoStep3: "المستودع جاهز",
    demoDropZone: "اسحب وأفلت",
    demoScan: "جارٍ فحص المسارات",
    demoCommit: "Commit على",
    demoPushed: "تم الدفع · قبل ثوانٍ",
    demoBranches: "الفرع main",
    demoCaptionBefore: "لا حاجة إلى حساب لهذا العرض.",
  },

  faq: {
    q1: "كيف أضع أرشيف .rar أو .zip على GitHub دون استخدام Git؟",
    a1: "اربط حساب GitHub على RepoDrop، واسحب ملف .rar أو .zip أو .tar أو .tar.gz وأفلته، وراجع معاينة الملفات المستخرجة ثم اختر مستودعًا جديدًا أو قائمًا. ينشئ RepoDrop الـ commit ويدفع الشيفرة مباشرة بهويتك على GitHub، بلا طرفية وبلا سطر أوامر.",
    q2: "ما صيغ الأرشيف والأحجام المدعومة؟",
    a2: "يدعم RepoDrop أصلاً أرشيفات .rar (RAR4 وRAR5) و.zip و.tar و.tar.gz و.tgz، ويُتعرَّف عليها من بايتاتها السحرية على الخادم. افتراضيًا يمكن أن يزن الأرشيف حتى {upload} مضغوطًا ({extract} مفكوكة و{files} ملفًا).",
    q3: "هل يُخزَّن رمز GitHub والشيفرة الخاصة؟",
    a3: "لا. رمز OAuth الخاص بك يعيش فقط في كوكي httpOnly مشفَّر (JWE A256GCM) داخل متصفحك: لا يُكتب أبدًا في قاعدة البيانات ولا في السجلات. تبقى الملفات المستخرجة في مساحة مؤقتة معزولة وتُمسح تلقائيًا بعد الدفع.",
    q4: "هل يمكنني إرسال أرشيف إلى مستودع GitHub قائم دون الكتابة فوق عملي؟",
    a4: "نعم. يمكنك إنشاء مستودع جديد (عام أو خاص)، أو الدفع إلى فرع مخصَّص في مستودع قائم للحفاظ على الفرع الرئيسي، أو اختيار الاستبدال الكامل صراحةً مع تأكيد.",
    q5: "ماذا يحدث للمجلد الجذر الوحيد وnode_modules عند الاستيراد؟",
    a5: "حين يحتوي الأرشيف على مجلد واحد شامل (مثل مشروعي/)، يقترح RepoDrop إزالته تلقائيًا لتوضع ملفاتك مباشرة في جذر المستودع. ويُستبعد node_modules ومجلدات .git المضمَّنة وملفات النظام غير الضرورية (.DS_Store، __MACOSX) افتراضيًا.",
  },

  login: {
    title: "تسجيل الدخول إلى RepoDrop",
    description: "اسمح بالوصول إلى GitHub لإنشاء المستودعات ودفع أرشيفاتك.",
    continueWithGithub: "المتابعة عبر GitHub",
    scopesLead: "نطلب فقط الصلاحيتين",
    scopesAnd: "و",
    scopesTail:
      ": إنشاء المستودعات ودفع الشيفرة باسمك (بما في ذلك ملفات .github/workflows/). يُشفَّر رمزك في كوكي httpOnly ولا يُخزَّن في قاعدة البيانات أبدًا.",
    bulletCookie: "كوكي httpOnly مشفَّر (A256GCM)",
    bulletLogout: "تسجيل الخروج = حذف الرمز من المتصفح",
    devMode: "وضع التطوير",
    devLogin: "دخول مباشر (GH_TOKEN الخادم)",
    errorState: "انتهت جلسة الدخول. أعد المحاولة.",
    errorOauth: "رفض GitHub التفويض. ابدأ من جديد.",
    errorConfig:
      "التطبيق غير مهيَّأ: عيّن GITHUB_CLIENT_ID / GITHUB_CLIENT_SECRET ثم أعد التشغيل.",
    errorDevauth: "وضع التطوير: GH_TOKEN الخادم مفقود أو غير صالح.",
    errorGeneric: "خطأ في تسجيل الدخول.",
  },

  importPage: {
    title: "استيراد أرشيف",
    lead: "أفلِت ملف .rar أو .zip أو .tar (وكذلك .tar.gz) يحتوي على شيفرتك. سترى معاينة كاملة قبل أي إرسال إلى GitHub.",
    browseLead:
      "أتريد أولاً رؤية ما هو موجود في حسابك؟ تصفَّح مستودعاتك ومحتواها دون إرسال أي شيء.",
    browseCta: "تصفَّح مستودعاتي",
    limitLabel: "الحد:",
    limitBody: "{upload} لكل أرشيف، {extract} مفكوكة.",
    securityLabel: "الأمان:",
    securityBody: "مسارات موثَّقة، واستبعاد .git والروابط.",
    afterLabel: "بعد ذلك:",
    afterBody: "معاينة، اختيار المستودع، ثم الدفع.",
  },

  uploader: {
    dropLabel: "إفلات أرشيف .rar أو .zip أو .tar",
    uploading: "جارٍ إرسال الأرشيف… {progress}%",
    keepOpen: "لا تغلق هذا التبويب.",
    dropHint: "اسحب أرشيفك إلى هنا أو انقر للتصفُّح",
    formatsHint: ".rar و.zip و.tar و.tar.gz — {max} كحد أقصى ({extract} مفكوكة)",
    errorFormat:
      "صيغة غير مدعومة: تُقبل فقط ملفات .rar و.zip و.tar و.tar.gz.",
    errorEmpty: "هذا الملف فارغ.",
    errorTooLarge: "الأرشيف كبير جدًا (الحد الأقصى {max}).",
    errorHttp: "فشل الإرسال (HTTP {status}). أعد المحاولة.",
    errorNetwork: "انقطع الاتصال أثناء الإرسال. أعد المحاولة.",
  },

  footer: {
    tagline:
      "أرشيفات شيفرتك، على GitHub، بسحب وإفلات. بلا طرفية، بلا استنساخ، بلا إعداد git.",
    productTitle: "المنتج",
    home: "الرئيسية",
    importArchive: "استيراد أرشيف",
    howItWorks: "كيف يعمل",
    security: "الأمان",
    faq: "أسئلة متكررة",
    formatsTitle: "الصيغ المدعومة",
    guaranteesTitle: "الضمانات",
    guarantee1: "رمز GitHub مشفَّر ولا يُخزَّن في قاعدة البيانات",
    guarantee2: "استخراج معزول ومسارات موثَّقة",
    guarantee3: "معاينة كاملة قبل أي إرسال",
    copyright: "© {year} RepoDrop — أرشيفاتك، GitHub الخاص بك.",
    reserved: "منطقة محجوزة",
  },

  notFound: {
    title: "الصفحة غير موجودة",
    body: "هذه الصفحة غير موجودة — أو انتهت صلاحية المهمة (تُمسح الأرشيفات بعد مدة).",
    back: "العودة إلى الرئيسية",
  },
};
