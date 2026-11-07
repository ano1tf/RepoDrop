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
    checkFrench: "مفتوح: الشيفرة المصدرية متاحة",

    statFormats: "صيغ الأرشيف",
    statFormatsSub: ".rar · .zip · .tar[.gz]",
    statCommands: "سطر أوامر",
    statCommandsSub: "كل شيء بنقرة",
    statDuration: "من الإفلات إلى الدفع",
    statDurationSub: "المعاينة مشمولة",
    statDurationValue: "دقيقتان",
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

    mockFile: "مشروعي.tar",
    mockFileMeta: "{size} · {count} ملفًا",
    mockExcluded: "مستبعد",
    mockPushed: "دُفع إلى github.com/أنت/مشروعي · الفرع main",
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
  jobs: {
    metaTitle: "متابعة الاستيراد",

    statusQueued: "في قائمة الانتظار",
    statusExtracting: "جارٍ الاستخراج",
    statusReady: "جاهز للدفع",
    statusPushing: "جارٍ الدفع…",
    statusDone: "تم",
    statusFailed: "فشل",

    extractingTitle: "الاستخراج جارٍ…",
    extractingBody:
      "التحقق من المسارات والأحجام، واكتشاف المجلد الجذري. كل شيء يحدث على الخادم، في مساحة معزولة.",
    pushingTitle: "جارٍ الدفع إلى GitHub…",
    pushingBody:
      "يُنشأ الـ commit وتُرسَل الملفات. يمكنك ترك هذا التبويب مفتوحًا — سنُبقيك على اطلاع.",

    failedTitle: "فشلت العملية",
    failedUnknown: "خطأ غير معروف.",
    lostConnection: "انقطع الاتصال. أعد المحاولة.",
    httpFailed: "فشل (HTTP {status}).",
    repoMoved:
      "تقدّم المستودع {repo} منذ استيرادك. يمكنك استبدال فرعه بالمحتوى الدقيق لهذا الأرشيف: الملفات غير الموجودة في الأرشيف ستُحذف من المستودع وسيُفرض الدفع. يُحتفظ بالسجل الحالي (commit جديد فوقه).",
    repoMovedConfirm:
      "هل تؤكد استبدال كود هذا المستودع بالكامل بهذا الأرشيف؟",
    replaceAllYes: "نعم، استبدل الكود كله",
    replaceAllRetry: "أعد المحاولة باستبدال الكود كله",
    cancel: "إلغاء",
    retryOtherArchive: "أعد المحاولة بأرشيف آخر",
    backHome: "العودة إلى الصفحة الرئيسية",

    doneTitle: "تم الدفع!",
    doneBody: "{count} مستوردة على الفرع",
    doneCommit: "commit",
    doneCreated: "· أُنشئ المستودع",
    openOnGithub: "افتح على GitHub",
    copyLink: "انسخ الرابط",
    downloadZip: "نزّل بصيغة .zip",
    aiLinksTitle: "روابط جاهزة لتسليمها إلى ذكاء اصطناعي:",
    anotherImport: "استورد أرشيفًا آخر",

    linkRepo: "مستودع GitHub",
    linkBranch: "الفرع «{branch}»",
    linkBranchSub: "ادفع إلى هذا الفرع",
    linkCommit: "commit محدد",
    linkCodespaces: "Codespaces (وكيل الذكاء الاصطناعي من GitHub)",
    linkCodespacesSub: "vscode.dev جاهز للاستخدام، Copilot متصل",
    linkVscode: "vscode.dev (محرر الويب الرسمي)",
    linkVscodeSub: "Copilot + تحرير + تشغيل (Codespaces)",
    linkClone: "رابط الاستنساخ (وكيل خارجي)",
    linkCloneSub: "يُصادق الوكيل بنفسه عبر جلسة GitHub الخاصة به",
    linkGh: "أمر CLI ‏`gh`",

    previewTitle: "معاينة الأرشيف",
    previewLead: "ما سيُدفع، بعد مرشحات الأمان.",
    previewFiles: "الملفات",
    previewSize: "الحجم بعد فك الضغط",
    previewIgnored: "تم تجاهلها:",
    ignoredGit: ".git ‏({count})",
    ignoredSystemFiles: "ملفات النظام ({count})",
    ignoredSymlinks: "روابط رمزية ({count})",
    ignoredHardlinks: "روابط صلبة ({count})",
    ignoredBlocked: "مسارات محظورة ({count})",
    tooLargeForGithub:
      "{count} ملف/ملفات تتجاوز 100 ميغابايت: من المرجح أن يرفضها GitHub. مثال:",

    filtersTitle: "مرشحات الاستيراد",
    filtersNone: "لا يوجد مرشح متاح لهذا الأرشيف.",
    stripRootLabel: "إزالة المجلد الجذري",
    stripRootHint:
      "موصى به: سيُوضع محتوى المشروع مباشرة في جذر المستودع.",
    includeNodeModules: "ضمّن",
    includeNodeModulesHint:
      "غير محدد افتراضيًا: ثقيل ونادرًا ما يكون مفيدًا في مستودع.",

    destTitle: "الوجهة",
    destLead: "إلى أين تُدفع هذه الملفات؟",
    destNew: "مستودع جديد",
    destExisting: "مستودع موجود",
    repoNameLabel: "اسم المستودع",
    repoNamePlaceholder: "مشروعي",
    repoNameInvalid:
      "حروف وأرقام ونقاط وشرطات وشرطات سفلية فقط (يجب أن يبدأ بحرف أو رقم).",
    visibilityLabel: "الظهور",
    visibilityPrivate: "خاص",
    visibilityPrivateHint: "تراه أنت فقط",
    visibilityPublic: "عام",
    visibilityPublicHint: "يراه الجميع",
    searchRepo: "ابحث عن مستودع…",
    loadingRepos: "جارٍ تحميل مستودعاتك…",
    reposLoadError: "تعذّر تحميل مستودعاتك.",
    noWritableRepo:
      "لا يوجد مستودع متاح بحقوق كتابة. أنشئ مستودعًا جديدًا!",
    noRepoMatch: "لا يوجد مستودع يطابق البحث.",
    dedicatedBranch: "أنشئ فرعًا مخصصًا",
    dedicatedHintExisting:
      "دون المساس بالفرع الافتراضي: مثالي لمستودع مشترك.",
    dedicatedHintNew:
      "اسم الفرع الأول للمستودع الجديد (وإلا فالفرع الافتراضي).",
    replaceAll: "استبدل كود المستودع كله",
    replaceAllHint:
      "سيحتوي المستودع على ملفات الأرشيف بالضبط: ما ليس فيه سيُحذف، وسيُفرض الدفع — سينجح حتى لو تغيّر المستودع في الأثناء (لا مزيد من خطأ «fetch first»). استخدمه عندما يكون الأرشيف هو النسخة الجديدة الكاملة للمشروع.",
    replaceConfirm:
      "أؤكد: ملفات المستودع {repo} غير الموجودة في هذا الأرشيف ستُحذف نهائيًا من الفرع المدفوع.",
    replaceConfirmNoRepo:
      "أؤكد: ملفات المستودع غير الموجودة في هذا الأرشيف ستُحذف نهائيًا من الفرع المدفوع.",
    advanced: "خيارات متقدمة",
    commitMessage: "رسالة الـ commit",
    commitPlaceholder: "استيراد {filename} عبر RepoDrop",
    pushAction: "ادفع إلى GitHub",
    replacePushAction: "استبدل الكود كله على GitHub",
    sending: "جارٍ الإرسال…",
    replaceNeedConfirm:
      "حدّد تأكيد الاستبدال لتفعيل الزر.",
    tokenNote:
      "يبقى رمز GitHub الخاص بك في كوكي مشفّر — ولا يُكتب أبدًا في قاعدة البيانات.",
  },

  repos: {
    metaTitle: "مستودعاتي",
    pageTitle: "مستودعاتي",
    pageLead:
      "تصفّح مستودعاتك قبل استيراد أي شيء: الشجرة، معاينة الملفات، والفرع الذي تختاره. إعادة التسمية والظهور والحذف متاحة من تبويب {actions} في المستودع.",

    filterPlaceholder: "تصفية بالاسم أو الوصف أو اللغة…",
    filterAria: "تصفية المستودعات",
    sortAria: "ترتيب",
    sortPushed: "النشاط الأخير",
    sortName: "الاسم (أ→ي)",
    sortSize: "الحجم",
    mine: "مستودعاتي",
    refresh: "تحديث",
    errorList: "القائمة غير متاحة (HTTP {status}).",
    errorServer: "تعذّر الوصول إلى الخادم.",
    truncated:
      "تم تحميل أحدث 300 مستودع فقط. ضيّق النطاق بالمرشح أعلاه.",
    loading: "جارٍ تحميل مستودعاتك…",
    emptyFilter: "لا يوجد مستودع يطابق هذا المرشح.",
    emptyToken: "لا يوجد مستودع ظاهر بهذا الرمز من GitHub.",
    countAll: "{count} مستودع",
    countFiltered: "{count} من {total}",
    countHint: "— انقر لتصفّح المحتوى.",
    noDescription: "بلا وصف",
    pushedAgo: "دُفع {when}",
    issues: "{count} issue",
    readOnly: "قراءة فقط",

    backToList: "العودة إلى القائمة",
    list: "القائمة",
    badgePrivate: "خاص",
    badgePublic: "عام",
    badgeArchived: "مؤرشف",
    badgeFork: "fork",
    badgeReadOnly: "قراءة فقط",
    branchProtected: "(محمي)",
    downloadTitle: "نزّل {repo} بصيغة .{format}",
    downloadTitleRef: "نزّل {repo} ‏({ref}) بصيغة .{format}",
    actionsTab: "إجراءات",
    loadingRepo: "جارٍ تحميل المستودع…",
    inaccessible: "المستودع غير متاح.",
    inaccessibleHttp: "المستودع غير متاح (HTTP {status}).",
    errorServerJoin: "تعذّر الوصول إلى الخادم.",
    copyDenied: "رفض المتصفح النسخ.",
    reloadFolder: "أعد تحميل هذا المجلد",
    root: "الجذر",
    entries: "{count} عنصر",
    loadingShort: "جارٍ التحميل…",
    emptyRepo:
      "لا يحتوي هذا المستودع على ملفات بعد. استورد أرشيفًا لملئه.",
    loadingFile: "جارٍ تحميل الملف…",
    selectFile: "اختر ملفًا لمعاينته.",
    lines: "{count} سطرًا",
    copy: "نسخ",
    copied: "تم النسخ",
    raw: "خام",
    fileTooBig:
      "الملف أكبر من أن يُعاين ({size}). افتحه على GitHub.",
    fileBinary: "ملف ثنائي ({size}): لا معاينة نصية.",

    actionsTitle: "إعادة تسمية / وصف",
    nameLabel: "اسم المستودع",
    renameWarning:
      "إعادة التسمية تكسر النسخ والروابط وصفحات GitHub الحالية. يعيد GitHub توجيه الاسم القديم، لكن ليس إلى الأبد.",
    descLabel: "الوصف",
    descPlaceholder: "ما الغرض من هذا المستودع؟",
    save: "حفظ",
    writeInsufficient: "حقوق الكتابة غير كافية في هذا المستودع.",
    visibilityTitle: "الظهور",
    visibilityCurrently: "حاليًا {visibility}.",
    visibilityToPrivate:
      " جعله خاصًا يمنع الوصول عن كل المستخدمين المجهولين.",
    visibilityToPublic:
      " جعله عامًا يكشف سجل الـ commit بأكمله.",
    makePublic: "اجعله عامًا",
    makePrivate: "اجعله خاصًا",
    dangerZone: "منطقة حساسة",
    deleteWarning:
      "الحذف نهائي: الكود والسجل وissues والويكي.",
    deleteRepo: "احذف المستودع",
    deleteTitle: "احذف {repo}",
    deleteConfirmBody:
      "لا يمكن الاستعادة. اكتب {name} لتفعيل الزر.",
    deleteForever: "احذف نهائيًا",
    cancel: "إلغاء",
    updated: "تم تحديث المستودع.",
    deleted: "تم حذف المستودع {repo}.",
    httpFailed: "فشل (HTTP {status}).",
  },

  api: {
    authRequired: "المصادقة مطلوبة.",
    jobNotFound: "المهمة غير موجودة.",
    jobNotReady: "هذه المهمة ليست جاهزة بعد.",
    jobNotPushable: "هذه المهمة ليست جاهزة للدفع.",
    invalidJson: "نص JSON غير صالح.",
    invalidMultipart: "طلب غير صالح (يُتوقع multipart/form-data).",
    emptyBody: "نص الطلب فارغ.",
    emptyArchive: "الأرشيف فارغ.",
    uploadFailed: "تعذّر استقبال الملف. أعد المحاولة.",
    repoNameRequired:
      "اسم المستودع مطلوب لإنشاء مستودع جديد.",
    branchNameTooLong: "اسم الفرع طويل جدًا.",
    invalidOptions: "خيارات غير صالحة.",
    invalidChange: "تغيير غير صالح.",
    noChange: "لا تغيير.",
    pathRequired: "المعامل «path» مطلوب.",
  },
  errors: {
    encrypted:
      "هذا الأرشيف محمي بكلمة مرور، وهذا غير مدعوم حتى الآن.",
    tooManyFiles: "ملفات كثيرة جدًا في الأرشيف (تم بلوغ الحد).",
    tooBig:
      "المحتوى بعد فك الضغط يتجاوز الحجم المسموح. قلّل حجم الأرشيف (node_modules؟).",
    empty: "هذا الأرشيف لا يحتوي على أي ملف قابل للاستخدام.",
    corrupt:
      "الأرشيف غير قابل للقراءة أو تالف. تحقق من الملف ثم أعد المحاولة.",
    unsupported:
      "صيغة غير مدعومة (طريقة ضغط أو نوع أرشيف غير معروف).",
    volume:
      "أرشيفات RAR متعددة الأجزاء (.part1.rar، .part2.rar…) غير مدعومة.",
    unsafePaths:
      "يحتوي الأرشيف على مسارات ملفات خطرة (traversal) وتم رفضه.",
    pathLimits:
      "مسار ملف يتجاوز الحدود المسموح بها (العمق أو الطول).",
    timeout: "استغرق الاستخراج وقتًا طويلًا وتم إيقافه.",
    rateLimited: "طلبات كثيرة جدًا. انتظر قليلًا ثم أعد المحاولة.",
    notFound: "المورد غير موجود.",
    forbidden:
      "ليست لديك حقوق الكتابة في هذا المستودع (أو أن رمز GitHub لا يملك النطاق المناسب).",
    repoExists: "يوجد مستودع بهذا الاسم في حسابك بالفعل.",
    nameInvalid: "اسم مستودع أو فرع غير صالح.",
    noChanges:
      "لا شيء للدفع: الملفات مطابقة أصلًا للمستودع الهدف.",
    conflict:
      "تغيّر المستودع الهدف في الأثناء. أعد المحاولة، أو ادفع إلى فرع مخصص، أو أعد التشغيل بخيار «استبدل الكود كله» لاستبدال الفرع بمحتوى الأرشيف.",
    scopeMissing:
      "يرفض GitHub تعديل ملفات workflow ‏(.github/workflows/…): الرمز لا يملك النطاق «workflow». سجّل الخروج ثم الدخول مجددًا لمنحه.",
    gitFailed: "فشل الدفع إلى GitHub.",
    interrupted: "توقفت المعالجة (إعادة تشغيل الخادم).",
    badPath: "مسار ملف غير صالح.",
    confirmMismatch:
      "التأكيد لا يطابق اسم المستودع: لم يُحذف أي شيء.",
    archiveTooBig:
      "هذا المستودع أكبر من أن يُنزّل كأرشيف واحد.",
    internal: "خطأ داخلي غير متوقع. أعد المحاولة بعد لحظة.",
  },
};
