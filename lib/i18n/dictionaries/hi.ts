import type { Dict } from "../types";

export const hi: Dict = {
  meta: {
    title: "RepoDrop — अपने .rar, .zip और .tar आर्काइव GitHub पर इम्पोर्ट करें",
    description:
      ".rar, .zip, .tar या .tar.gz आर्काइव छोड़ें और एक क्लिक में अपना कोड GitHub पर पुश करें। सुरक्षित एक्सट्रैक्शन, भेजने से पहले पूर्वावलोकन, बिना टर्मिनल और बिना git।",
    loginTitle: "GitHub से साइन इन",
    loginDescription:
      "रिपॉज़िटरी बनाने और अपने .rar, .zip या .tar आर्काइव एक क्लिक में पुश करने के लिए अपना GitHub खाता RepoDrop से जोड़ें। टोकन एन्क्रिप्टेड, डेटाबेस में कभी संग्रहीत नहीं।",
    importTitle: "आर्काइव इम्पोर्ट करें",
    importDescription:
      "फ़ाइलों का पूर्वावलोकन करने और उसे GitHub रिपॉज़िटरी पर पुश करने के लिए .rar, .zip, .tar या .tar.gz आर्काइव अपलोड करें।",
  },

  nav: {
    howItWorks: "यह कैसे काम करता है",
    myRepos: "मेरी रिपॉज़",
    importArchive: "आर्काइव इम्पोर्ट करें",
    importShort: "इम्पोर्ट",
    login: "साइन इन",
    start: "शुरू करें",
    logout: "साइन आउट",
    avatarAlt: "{login} का अवतार",
    language: "भाषा",
    languageChange: "भाषा बदलें",
    languageSearch: "भाषा खोजें…",
    languageCurrent: "वर्तमान भाषा: {name}",
  },

  home: {
    heroBadge: "नया: .tar और .tar.gz",
    heroTitleLine1: "आपके कोड आर्काइव,",
    heroTitleLine2: "GitHub पर सिर्फ़ खींचकर छोड़ें।",
    heroBody:
      "प्रोजेक्ट .rar, .zip या .tar में मिला? GitHub जोड़ें, आर्काइव छोड़ें, रिपॉज़िटरी चुनें — पुश हो गया। बिना टर्मिनल, बिना क्लोन, बिना सेटअप।",
    ctaStart: "GitHub के साथ शुरू करें",
    ctaImport: "आर्काइव इम्पोर्ट करें",
    ctaHow: "यह कैसे काम करता है",
    checkSandboxed: "सैंडबॉक्स एक्सट्रैक्शन",
    checkToken: "GitHub टोकन कभी संग्रहीत नहीं",
    checkFrench: "खुला: सोर्स कोड सार्वजनिक है",

    statFormats: "आर्काइव फ़ॉर्मैट",
    statFormatsSub: ".rar · .zip · .tar[.gz]",
    statCommands: "कमांड लाइन",
    statCommandsSub: "सब कुछ एक क्लिक में",
    statDuration: "छोड़ने से पुश तक",
    statDurationSub: "पूर्वावलोकन सहित",
    statDurationValue: "2 मिनट",
    statLanguages: "भाषाएँ",
    statLanguagesSub: "इंटरफ़ेस और संदेश",

    stepsTitle: "यह कैसे काम करता है?",
    stepsLead: "तीन चरण, दो मिनट, कोई कमांड नहीं।",
    step1Title: "GitHub जोड़ें",
    step1Body:
      "अनुमति का एक क्लिक। हम केवल ज़रूरी स्कोप माँगते हैं — आपका टोकन ब्राउज़र में एन्क्रिप्टेड रहता है।",
    step2Title: "आर्काइव छोड़ें",
    step2Body:
      "अपना .rar, .zip या .tar खींचें। सैंडबॉक्स एक्सट्रैक्शन, जाँचे गए पाथ, भेजने से पहले पूरा पूर्वावलोकन।",
    step3Title: "एक क्लिक में पुश करें",
    step3Body:
      "रिपॉज़िटरी बनाएँ या मौजूदा में पुश करें। कमिट आपकी GitHub पहचान से बनता है।",

    featuresTitle: "सरल बनाया गया",
    featuresTitleAccent: "और सुरक्षित",
    featuresLead:
      "कोड इम्पोर्ट करना बच्चों का खेल होना चाहिए — सर्वर को छलनी बनाए बिना।",
    feature1Title: "मूल RAR, ZIP और TAR",
    feature1Body:
      ".rar (RAR4/RAR5), .zip और .tar/.tar.gz सर्वर पर खुलते हैं — कहीं कोई सॉफ़्टवेयर इंस्टॉल नहीं करना।",
    feature2Title: "सुरक्षित एक्सट्रैक्शन",
    feature2Body:
      "zip-slip और डीकंप्रेशन बम से सुरक्षा, अंदर के .git और सिमलिंक हटा दिए जाते हैं। आपकी रिपॉज़ साफ़ रहती हैं।",
    feature3Title: "पुश से पहले पूर्वावलोकन",
    feature3Body:
      "फ़ाइलें, आकार, रूट फ़ोल्डर, node_modules: आप ठीक-ठीक देखते हैं क्या जा रहा है, और नियंत्रण में रहते हैं।",
    feature4Title: "शून्य कमांड लाइन",
    feature4Body:
      "कोई क्लोन नहीं, कोई git क्रेडेंशियल नहीं, कोई «git push -u origin» नहीं। टूल सब कुछ आपके लिए करता है।",
    feature5Title: "नई या मौजूदा रिपॉज़िटरी",
    feature5Body:
      "निजी या सार्वजनिक रिपॉज़िटरी बनाएँ, या आर्काइव को मौजूदा में जोड़ें — चाहें तो अलग ब्रांच पर।",
    feature6Title: "AI के लिए तैयार लिंक",
    feature6Body:
      "पुश के बाद: Codespaces, vscode.dev, क्लोन URL, gh कमांड और .zip आर्काइव। एक कॉपी-पेस्ट काफ़ी है।",

    formatsTitle: "कोई भी आर्काइव, चाहे कितना भी पुराना हो",
    formatsBody:
      "Windows के पुराने .rar, किसी एक्सपोर्ट के .zip, Linux सर्वर के .tar.gz: सब कुछ सर्वर पर, स्ट्रीमिंग में, उन्हीं सुरक्षा जालों के साथ पढ़ा जाता है। एकमात्र रूट फ़ोल्डर अपने आप हट जाता है और node_modules डिफ़ॉल्ट रूप से बाहर रखा जाता है।",

    securityTitle: "हम क्या अस्वीकार करते हैं, और क्यों",
    securityLead:
      "किसी अजनबी का आर्काइव खोलना जोखिम भरा खेल है। हर इम्पोर्ट के नीचे तने ये जाले हैं।",
    guard1Title: "Zip-slip और traversal",
    guard1Body:
      "हर पाथ जाँचा जाता है (../, निरपेक्ष, UNC, NUL)। एक भी कोशिश और पूरा आर्काइव अस्वीकार।",
    guard2Title: "डीकंप्रेशन बम",
    guard2Body:
      "घोषित आकार लिखने से पहले जोड़े जाते हैं: अधिकतम {extract} खुले और {files} फ़ाइलें।",
    guard3Title: "GitHub टोकन",
    guard3Body:
      "एन्क्रिप्टेड httpOnly कुकी (JWE A256GCM), GIT_ASKPASS से पुश। कभी डेटाबेस में नहीं, कभी लॉग में नहीं।",
    guard4Title: "कोटा",
    guard4Body:
      "प्रति IP 30 अपलोड/घंटा और प्रति उपयोगकर्ता 10 पुश/घंटा, स्थायी काउंटर: सेवा स्वस्थ रहती है।",
    limitsNote:
      "डिफ़ॉल्ट सीमाएँ: {upload} अपलोड, {extract} खुले, प्रति इम्पोर्ट {files} फ़ाइलें।",

    faqTitle: "अक्सर पूछे जाने वाले प्रश्न",
    faqLead:
      "GitHub पर आर्काइव इम्पोर्ट, स्वीकार्य फ़ॉर्मैट और आपके खाते की निजता के बारे में सब कुछ।",

    ctaTitle: "अपना अगला आर्काइव GitHub पर खाली करने के लिए तैयार?",
    ctaLead: "साइन इन करें, छोड़ें, पुश करें। बाकी हम संभाल लेंगे।",

    mockFile: "mera-project.tar",
    mockFileMeta: "{size} · {count} फ़ाइलें",
    mockExcluded: "बाहर",
    mockPushed: "github.com/aap/mera-project पर पुश · ब्रांच main",
  },

  faq: {
    q1: "Git का उपयोग किए बिना .rar या .zip आर्काइव GitHub पर कैसे रखें?",
    a1: "RepoDrop पर अपना GitHub खाता जोड़ें, अपनी .rar, .zip, .tar या .tar.gz फ़ाइल खींचकर छोड़ें, निकाली गई फ़ाइलों का पूर्वावलोकन देखें और नई या मौजूदा रिपॉज़िटरी चुनें। RepoDrop कमिट बनाता है और कोड सीधे आपकी GitHub पहचान से पुश करता है, बिना टर्मिनल और बिना कमांड लाइन।",
    q2: "कौन से आर्काइव फ़ॉर्मैट और आकार समर्थित हैं?",
    a2: "RepoDrop मूल रूप से .rar (RAR4 और RAR5), .zip, .tar, .tar.gz और .tgz आर्काइव समर्थित करता है, जिन्हें सर्वर पर उनके मैजिक बाइट्स से पहचाना जाता है। डिफ़ॉल्ट रूप से आर्काइव संपीड़ित रूप में {upload} तक हो सकता है ({extract} खुले और {files} फ़ाइलें)।",
    q3: "क्या मेरा GitHub टोकन और निजी सोर्स कोड संग्रहीत होता है?",
    a3: "नहीं। आपका GitHub OAuth टोकन केवल आपके ब्राउज़र में एक एन्क्रिप्टेड httpOnly कुकी (JWE A256GCM) में रहता है: वह कभी डेटाबेस या लॉग में नहीं लिखा जाता। निकाली गई फ़ाइलें एक अलग अस्थायी स्थान में रहती हैं और पुश के बाद अपने आप मिट जाती हैं।",
    q4: "क्या मैं अपना काम मिटाए बिना किसी मौजूदा GitHub रिपॉज़िटरी में आर्काइव भेज सकता हूँ?",
    a4: "हाँ। आप नई रिपॉज़िटरी (सार्वजनिक या निजी) बना सकते हैं, मुख्य ब्रांच बचाने के लिए मौजूदा रिपॉज़िटरी की अलग ब्रांच पर पुश कर सकते हैं, या पुष्टि के साथ पूर्ण प्रतिस्थापन स्पष्ट रूप से चुन सकते हैं।",
    q5: "इम्पोर्ट के दौरान एकमात्र रूट फ़ोल्डर और node_modules का क्या होता है?",
    a5: "जब आर्काइव में एक ही लपेटने वाला फ़ोल्डर हो (जैसे mera-project/), तो RepoDrop उसे अपने आप हटाने का सुझाव देता है ताकि आपकी फ़ाइलें सीधे रिपॉज़िटरी रूट में आ जाएँ। node_modules, अंदर के .git फ़ोल्डर और अनावश्यक सिस्टम फ़ाइलें (.DS_Store, __MACOSX) डिफ़ॉल्ट रूप से हटा दी जाती हैं।",
  },

  login: {
    title: "RepoDrop में साइन इन करें",
    description:
      "रिपॉज़िटरी बनाने और अपने आर्काइव पुश करने के लिए GitHub पहुँच की अनुमति दें।",
    continueWithGithub: "GitHub के साथ जारी रखें",
    scopesLead: "हम केवल ये स्कोप माँगते हैं:",
    scopesAnd: "और",
    scopesTail:
      "— आपके नाम पर रिपॉज़िटरी बनाना और कोड पुश करना (आपकी .github/workflows/ फ़ाइलों सहित)। आपका टोकन httpOnly कुकी में एन्क्रिप्ट होता है, डेटाबेस में कभी संग्रहीत नहीं।",
    bulletCookie: "एन्क्रिप्टेड httpOnly कुकी (A256GCM)",
    bulletLogout: "साइन आउट = ब्राउज़र से टोकन मिटा",
    devMode: "डेवलपमेंट मोड",
    devLogin: "सीधा साइन इन (सर्वर का GH_TOKEN)",
    errorState: "साइन-इन सत्र समाप्त हो गया। फिर से कोशिश करें।",
    errorOauth: "GitHub ने अनुमति अस्वीकार कर दी। शुरू से करें।",
    errorConfig:
      "ऐप कॉन्फ़िगर नहीं है: GITHUB_CLIENT_ID / GITHUB_CLIENT_SECRET सेट करें और पुनः आरंभ करें।",
    errorDevauth: "डेव मोड: सर्वर का GH_TOKEN अनुपलब्ध या अमान्य है।",
    errorGeneric: "साइन-इन त्रुटि।",
  },

  importPage: {
    title: "आर्काइव इम्पोर्ट करें",
    lead: "अपना कोड रखने वाली .rar, .zip या .tar (और .tar.gz) फ़ाइल छोड़ें। GitHub पर कुछ भी भेजने से पहले आपको पूरा पूर्वावलोकन दिखेगा।",
    browseLead:
      "पहले देखना चाहते हैं कि आपके खाते में क्या है? कुछ भी भेजे बिना अपनी रिपॉज़ और उनकी सामग्री ब्राउज़ करें।",
    browseCta: "मेरी रिपॉज़ ब्राउज़ करें",
    limitLabel: "सीमा:",
    limitBody: "प्रति आर्काइव {upload}, {extract} खुले।",
    securityLabel: "सुरक्षा:",
    securityBody: "जाँचे गए पाथ, .git और लिंक हटाए गए।",
    afterLabel: "इसके बाद:",
    afterBody: "पूर्वावलोकन, रिपॉज़ चुनाव, फिर पुश।",
  },

  uploader: {
    dropLabel: ".rar, .zip या .tar आर्काइव छोड़ें",
    uploading: "आर्काइव भेजा जा रहा है… {progress}%",
    keepOpen: "यह टैब बंद न करें।",
    dropHint: "अपना आर्काइव यहाँ खींचें, या ब्राउज़ करने के लिए क्लिक करें",
    formatsHint: ".rar, .zip, .tar और .tar.gz — अधिकतम {max} ({extract} खुले)",
    errorFormat:
      "असमर्थित फ़ॉर्मैट: केवल .rar, .zip, .tar और .tar.gz फ़ाइलें स्वीकार्य हैं।",
    errorEmpty: "यह फ़ाइल खाली है।",
    errorTooLarge: "आर्काइव बहुत बड़ा (अधिकतम {max})।",
    errorHttp: "भेजना विफल (HTTP {status})। फिर से कोशिश करें।",
    errorNetwork: "भेजते समय कनेक्शन टूट गया। फिर से कोशिश करें।",
  },

  footer: {
    tagline:
      "आपके कोड आर्काइव, GitHub पर, खींचकर छोड़ें। बिना टर्मिनल, बिना क्लोन, बिना git सेटअप।",
    productTitle: "उत्पाद",
    home: "होम",
    importArchive: "आर्काइव इम्पोर्ट करें",
    howItWorks: "यह कैसे काम करता है",
    security: "सुरक्षा",
    faq: "अक्सर पूछे जाने वाले प्रश्न",
    formatsTitle: "समर्थित फ़ॉर्मैट",
    guaranteesTitle: "गारंटियाँ",
    guarantee1: "GitHub टोकन एन्क्रिप्टेड, डेटाबेस में कभी संग्रहीत नहीं",
    guarantee2: "सैंडबॉक्स एक्सट्रैक्शन, जाँचे गए पाथ",
    guarantee3: "किसी भी भेजने से पहले पूरा पूर्वावलोकन",
    copyright: "© {year} RepoDrop — आपके आर्काइव, आपका GitHub।",
    reserved: "आरक्षित क्षेत्र",
  },

  notFound: {
    title: "पृष्ठ नहीं मिला",
    body: "यह पृष्ठ मौजूद नहीं है — या जॉब समाप्त हो गया (आर्काइव कुछ समय बाद मिटा दिए जाते हैं)।",
    back: "होम पर लौटें",
  },
  jobs: {
    metaTitle: "इम्पोर्ट की प्रगति",

    statusQueued: "कतार में",
    statusExtracting: "एक्सट्रैक्ट हो रहा है",
    statusReady: "पुश के लिए तैयार",
    statusPushing: "पुश हो रहा है…",
    statusDone: "पूरा हुआ",
    statusFailed: "विफल",

    extractingTitle: "एक्सट्रैक्शन चल रहा है…",
    extractingBody:
      "पाथ और आकार की जाँच, रूट फ़ोल्डर की पहचान। सब कुछ सर्वर पर, एक अलग सुरक्षित जगह में होता है।",
    pushingTitle: "GitHub पर पुश हो रहा है…",
    pushingBody:
      "कमिट बनाया जा रहा है और फ़ाइलें भेजी जा रही हैं। आप यह टैब खुला छोड़ सकते हैं — हम आपको जानकारी देते रहेंगे।",

    failedTitle: "कार्रवाई विफल रही",
    failedUnknown: "अज्ञात त्रुटि।",
    lostConnection: "कनेक्शन टूट गया। फिर से कोशिश करें।",
    httpFailed: "विफल (HTTP {status})।",
    repoMoved:
      "आपके इम्पोर्ट के बाद रिपॉज़िटरी {repo} आगे बढ़ चुकी है। आप इस आर्काइव की ठीक वही सामग्री से उसकी ब्रांच को बदल सकते हैं: जो फ़ाइलें आर्काइव में नहीं हैं, वे रिपॉज़िटरी से हटा दी जाएँगी और पुश ज़बरदस्ती होगा। मौजूदा इतिहास सुरक्षित रहता है (ऊपर नया कमिट)।",
    repoMovedConfirm:
      "क्या आप पुष्टि करते हैं कि इस रिपॉज़िटरी का सारा कोड इस आर्काइव से बदल दिया जाए?",
    replaceAllYes: "हाँ, सारा कोड बदलें",
    replaceAllRetry: "सारा कोड बदलकर फिर से कोशिश करें",
    cancel: "रद्द करें",
    retryOtherArchive: "दूसरे आर्काइव के साथ फिर से कोशिश करें",
    backHome: "होम पर लौटें",

    doneTitle: "पुश हो गया!",
    doneBody: "{count} फ़ाइलें इस ब्रांच पर इम्पोर्ट हुईं:",
    doneCommit: "कमिट",
    doneCreated: "· रिपॉज़िटरी बनाई गई",
    openOnGithub: "GitHub पर खोलें",
    copyLink: "लिंक कॉपी करें",
    downloadZip: ".zip में डाउनलोड करें",
    aiLinksTitle: "किसी AI को देने के लिए तैयार लिंक:",
    anotherImport: "दूसरा आर्काइव इम्पोर्ट करें",

    linkRepo: "GitHub रिपॉज़िटरी",
    linkBranch: "ब्रांच «{branch}»",
    linkBranchSub: "इस ब्रांच पर पुश करें",
    linkCommit: "ठीक वही कमिट",
    linkCodespaces: "Codespaces (GitHub AI एजेंट)",
    linkCodespacesSub: "vscode.dev तुरंत तैयार, Copilot जुड़ा हुआ",
    linkVscode: "vscode.dev (आधिकारिक वेब एडिटर)",
    linkVscodeSub: "Copilot + एडिटिंग + चलाना (Codespaces)",
    linkClone: "क्लोन URL (बाहरी एजेंट)",
    linkCloneSub: "एजेंट अपनी GitHub सत्र से खुद प्रमाणित होता है",
    linkGh: "`gh` CLI कमांड",

    previewTitle: "आर्काइव का पूर्वावलोकन",
    previewLead: "सुरक्षा फ़िल्टर के बाद क्या पुश होगा।",
    previewFiles: "फ़ाइलें",
    previewSize: "खुलने के बाद आकार",
    previewIgnored: "छोड़ी गईं:",
    ignoredGit: ".git ({count})",
    ignoredSystemFiles: "सिस्टम फ़ाइलें ({count})",
    ignoredSymlinks: "सिमलिंक ({count})",
    ignoredHardlinks: "हार्डलिंक ({count})",
    ignoredBlocked: "अवरुद्ध पाथ ({count})",
    tooLargeForGithub:
      "{count} फ़ाइलें 100 MB से बड़ी हैं: GitHub संभवतः उन्हें अस्वीकार कर देगा। उदा.:",

    filtersTitle: "इम्पोर्ट फ़िल्टर",
    filtersNone: "इस आर्काइव के लिए कोई फ़िल्टर उपलब्ध नहीं।",
    stripRootLabel: "रूट फ़ोल्डर हटाएँ",
    stripRootHint:
      "सुझाया गया: प्रोजेक्ट की सामग्री सीधे रिपॉज़िटरी की जड़ में आ जाएगी।",
    includeNodeModules: "शामिल करें",
    includeNodeModulesHint:
      "डिफ़ॉल्ट रूप से बिना चिह्न: भारी और रिपॉज़िटरी में शायद ही उपयोगी।",

    destTitle: "गंतव्य",
    destLead: "ये फ़ाइलें कहाँ पुश करें?",
    destNew: "नई रिपॉज़िटरी",
    destExisting: "मौजूदा रिपॉज़िटरी",
    repoNameLabel: "रिपॉज़िटरी का नाम",
    repoNamePlaceholder: "mera-project",
    repoNameInvalid:
      "केवल अक्षर, अंक, बिंदु, हाइफ़न और अंडरस्कोर (अक्षर या अंक से शुरू होना चाहिए)।",
    visibilityLabel: "दृश्यता",
    visibilityPrivate: "निजी",
    visibilityPrivateHint: "केवल आपको दिखेगी",
    visibilityPublic: "सार्वजनिक",
    visibilityPublicHint: "सबको दिखेगी",
    searchRepo: "रिपॉज़िटरी खोजें…",
    loadingRepos: "आपकी रिपॉज़िटरियाँ लोड हो रही हैं…",
    reposLoadError: "आपकी रिपॉज़िटरियाँ लोड नहीं हो सकीं।",
    noWritableRepo:
      "लिखने के अधिकार वाली कोई रिपॉज़िटरी नहीं मिली। नई बनाएँ!",
    noRepoMatch: "खोज से कोई रिपॉज़िटरी मेल नहीं खाती।",
    dedicatedBranch: "अलग ब्रांच बनाएँ",
    dedicatedHintExisting:
      "डिफ़ॉल्ट ब्रांच को न छुएँ: साझा रिपॉज़िटरी के लिए आदर्श।",
    dedicatedHintNew:
      "नई रिपॉज़िटरी की पहली ब्रांच का नाम (वरना डिफ़ॉल्ट ब्रांच)।",
    replaceAll: "रिपॉज़िटरी का सारा कोड बदलें",
    replaceAllHint:
      "रिपॉज़िटरी में ठीक आर्काइव की फ़ाइलें रहेंगी: जो नहीं हैं वे हटा दी जाएँगी और पुश ज़बरदस्ती होगा — रिपॉज़िटरी इस बीच बदल भी गई हो तो भी सफल होगा («fetch first» त्रुटि अब नहीं)। जब आर्काइव प्रोजेक्ट का पूरा नया संस्करण हो तब इस्तेमाल करें।",
    replaceConfirm:
      "मैं पुष्टि करता/करती हूँ: रिपॉज़िटरी {repo} की जो फ़ाइलें इस आर्काइव में नहीं हैं, वे पुश की गई ब्रांच से हमेशा के लिए हट जाएँगी।",
    replaceConfirmNoRepo:
      "मैं पुष्टि करता/करती हूँ: रिपॉज़िटरी की जो फ़ाइलें इस आर्काइव में नहीं हैं, वे पुश की गई ब्रांच से हमेशा के लिए हट जाएँगी।",
    advanced: "उन्नत विकल्प",
    commitMessage: "कमिट संदेश",
    commitPlaceholder: "{filename} को RepoDrop से इम्पोर्ट",
    pushAction: "GitHub पर पुश करें",
    replacePushAction: "GitHub पर सारा कोड बदलें",
    sending: "भेजा जा रहा है…",
    replaceNeedConfirm:
      "बटन सक्रिय करने के लिए बदलने की पुष्टि पर चिह्न लगाएँ।",
    tokenNote:
      "आपका GitHub टोकन एक एन्क्रिप्टेड कुकी में रहता है — यह कभी डेटाबेस में नहीं लिखा जाता।",
  },

  repos: {
    metaTitle: "मेरी रिपॉज़िटरियाँ",
    pageTitle: "मेरी रिपॉज़िटरियाँ",
    pageLead:
      "कुछ भी इम्पोर्ट करने से पहले अपनी रिपॉज़िटरियाँ देखें: ट्री, फ़ाइलों का पूर्वावलोकन, अपनी पसंद की ब्रांच। नाम बदलना, दृश्यता और हटाना रिपॉज़िटरी के {actions} टैब में उपलब्ध हैं।",

    filterPlaceholder: "नाम, विवरण या भाषा से फ़िल्टर करें…",
    filterAria: "रिपॉज़िटरियाँ फ़िल्टर करें",
    sortAria: "क्रम में लगाएँ",
    sortPushed: "हाल की गतिविधि",
    sortName: "नाम (A→Z)",
    sortSize: "आकार",
    mine: "मेरी",
    refresh: "रीफ़्रेश करें",
    errorList: "सूची उपलब्ध नहीं (HTTP {status})।",
    errorServer: "सर्वर से संपर्क नहीं हो पा रहा।",
    truncated:
      "केवल 300 सबसे नई रिपॉज़िटरियाँ लोड हुई हैं। ऊपर के फ़िल्टर से सीमित करें।",
    loading: "आपकी रिपॉज़िटरियाँ लोड हो रही हैं…",
    emptyFilter: "इस फ़िल्टर से कोई रिपॉज़िटरी मेल नहीं खाती।",
    emptyToken: "इस GitHub टोकन से कोई रिपॉज़िटरी दिखाई नहीं देती।",
    countAll: "{count} रिपॉज़िटरियाँ",
    countFiltered: "{total} में से {count}",
    countHint: "— सामग्री देखने के लिए क्लिक करें।",
    noDescription: "कोई विवरण नहीं",
    pushedAgo: "{when} पुश हुई",
    issues: "{count} issue",
    readOnly: "केवल पढ़ने योग्य",

    backToList: "सूची पर लौटें",
    list: "सूची",
    badgePrivate: "निजी",
    badgePublic: "सार्वजनिक",
    badgeArchived: "संग्रहीत",
    badgeFork: "fork",
    badgeReadOnly: "केवल पढ़ने योग्य",
    branchProtected: "(सुरक्षित)",
    downloadTitle: "{repo} को .{format} में डाउनलोड करें",
    downloadTitleRef: "{repo} ({ref}) को .{format} में डाउनलोड करें",
    actionsTab: "कार्रवाइयाँ",
    loadingRepo: "रिपॉज़िटरी लोड हो रही है…",
    inaccessible: "रिपॉज़िटरी पहुँच से बाहर है।",
    inaccessibleHttp: "रिपॉज़िटरी पहुँच से बाहर है (HTTP {status})।",
    errorServerJoin: "सर्वर से संपर्क नहीं हो पा रहा।",
    copyDenied: "ब्राउज़र ने कॉपी करने से मना कर दिया।",
    reloadFolder: "यह फ़ोल्डर फिर से लोड करें",
    root: "जड़",
    entries: "{count} प्रविष्टियाँ",
    loadingShort: "लोड हो रहा है…",
    emptyRepo:
      "इस रिपॉज़िटरी में अभी कोई फ़ाइल नहीं है। इसे भरने के लिए आर्काइव इम्पोर्ट करें।",
    loadingFile: "फ़ाइल लोड हो रही है…",
    selectFile: "देखने के लिए कोई फ़ाइल चुनें।",
    lines: "{count} पंक्तियाँ",
    copy: "कॉपी करें",
    copied: "कॉपी हो गया",
    raw: "मूल",
    fileTooBig:
      "फ़ाइल पूर्वावलोकन के लिए बहुत बड़ी है ({size})। इसे GitHub पर खोलें।",
    fileBinary: "बाइनरी फ़ाइल ({size}): कोई टेक्स्ट पूर्वावलोकन नहीं।",

    actionsTitle: "नाम बदलें / विवरण",
    nameLabel: "रिपॉज़िटरी का नाम",
    renameWarning:
      "नाम बदलने से मौजूदा क्लोन, लिंक और GitHub पेज टूट जाते हैं। GitHub पुराने नाम को रीडायरेक्ट करता है, पर हमेशा नहीं।",
    descLabel: "विवरण",
    descPlaceholder: "यह रिपॉज़िटरी किसलिए है?",
    save: "सहेजें",
    writeInsufficient: "इस रिपॉज़िटरी पर लिखने के अधिकार अपर्याप्त हैं।",
    visibilityTitle: "दृश्यता",
    visibilityCurrently: "अभी {visibility}।",
    visibilityToPrivate:
      " इसे निजी बनाने पर सभी अनाम उपयोगकर्ताओं की पहुँच हट जाती है।",
    visibilityToPublic:
      " इसे सार्वजनिक बनाने पर पूरा कमिट इतिहास दिखने लगता है।",
    makePublic: "सार्वजनिक करें",
    makePrivate: "निजी करें",
    dangerZone: "संवेदनशील क्षेत्र",
    deleteWarning:
      "हटाना स्थायी है: कोड, इतिहास, issues और wiki।",
    deleteRepo: "रिपॉज़िटरी हटाएँ",
    deleteTitle: "{repo} हटाएँ",
    deleteConfirmBody:
      "कोई वापसी संभव नहीं। बटन खोलने के लिए {name} लिखें।",
    deleteForever: "हमेशा के लिए हटाएँ",
    cancel: "रद्द करें",
    updated: "रिपॉज़िटरी अपडेट हुई।",
    deleted: "रिपॉज़िटरी {repo} हटा दी गई।",
    httpFailed: "विफल (HTTP {status})।",
  },

  api: {
    authRequired: "प्रमाणीकरण आवश्यक है।",
    jobNotFound: "जॉब नहीं मिला।",
    jobNotReady: "यह जॉब अभी तैयार नहीं है।",
    jobNotPushable: "यह जॉब पुश के लिए तैयार नहीं है।",
    invalidJson: "अमान्य JSON सामग्री।",
    invalidMultipart: "अमान्य अनुरोध (multipart/form-data अपेक्षित)।",
    emptyBody: "अनुरोध सामग्री खाली है।",
    emptyArchive: "आर्काइव खाली है।",
    uploadFailed: "फ़ाइल प्राप्त नहीं हो सकी। फिर से कोशिश करें।",
    repoNameRequired:
      "नई रिपॉज़िटरी बनाने के लिए रिपॉज़िटरी का नाम आवश्यक है।",
    branchNameTooLong: "ब्रांच का नाम बहुत लंबा है।",
    invalidOptions: "अमान्य विकल्प।",
    invalidChange: "अमान्य बदलाव।",
    noChange: "कोई बदलाव नहीं।",
    pathRequired: "«path» पैरामीटर आवश्यक है।",
  },
  errors: {
    encrypted:
      "यह आर्काइव पासवर्ड से सुरक्षित है, जो अभी समर्थित नहीं है।",
    tooManyFiles: "आर्काइव में बहुत अधिक फ़ाइलें हैं (सीमा पूरी)।",
    tooBig:
      "खुलने के बाद सामग्री अनुमत आकार से अधिक है। आर्काइव छोटा करें (node_modules?)।",
    empty: "इस आर्काइव में कोई काम की फ़ाइल नहीं है।",
    corrupt:
      "आर्काइव पढ़ा नहीं जा सकता या खराब है। फ़ाइल जाँचें और फिर से कोशिश करें।",
    unsupported:
      "असमर्थित फ़ॉर्मैट (अज्ञात कम्प्रेशन विधि या आर्काइव प्रकार)।",
    volume:
      "मल्टी-वॉल्यूम RAR आर्काइव (.part1.rar, .part2.rar…) समर्थित नहीं हैं।",
    unsafePaths:
      "आर्काइव में खतरनाक फ़ाइल पाथ (traversal) हैं और इसे अस्वीकार कर दिया गया।",
    pathLimits:
      "एक फ़ाइल पाथ अनुमत सीमा से अधिक है (गहराई या लंबाई)।",
    timeout: "एक्सट्रैक्शन में बहुत समय लगा और इसे रोक दिया गया।",
    rateLimited: "बहुत अधिक अनुरोध। थोड़ी देर रुककर फिर कोशिश करें।",
    notFound: "संसाधन नहीं मिला।",
    forbidden:
      "इस रिपॉज़िटरी पर आपको लिखने का अधिकार नहीं है (या GitHub टोकन में सही स्कोप नहीं है)।",
    repoExists: "आपके खाते में इस नाम की रिपॉज़िटरी पहले से है।",
    nameInvalid: "रिपॉज़िटरी या ब्रांच का नाम अमान्य है।",
    noChanges:
      "पुश करने को कुछ नहीं: फ़ाइलें पहले से गंतव्य रिपॉज़िटरी से मेल खाती हैं।",
    conflict:
      "गंतव्य रिपॉज़िटरी इस बीच बदल गई। फिर से कोशिश करें, अलग ब्रांच पर पुश करें, या «सारा कोड बदलें» के साथ दोबारा चलाएँ ताकि ब्रांच आर्काइव की सामग्री से बदल जाए।",
    scopeMissing:
      "GitHub workflow फ़ाइलों (.github/workflows/…) में बदलाव अस्वीकार करता है: टोकन में «workflow» स्कोप नहीं है। इसे देने के लिए साइन आउट करके दोबारा साइन इन करें।",
    gitFailed: "GitHub पर पुश विफल रहा।",
    interrupted: "प्रोसेसिंग रोक दी गई (सर्वर रीस्टार्ट)।",
    badPath: "फ़ाइल पाथ अमान्य है।",
    confirmMismatch:
      "पुष्टि रिपॉज़िटरी के नाम से मेल नहीं खाती: कुछ भी नहीं हटाया गया।",
    archiveTooBig:
      "यह रिपॉज़िटरी एक आर्काइव के रूप में डाउनलोड करने के लिए बहुत बड़ी है।",
    internal: "अप्रत्याशित आंतरिक त्रुटि। थोड़ी देर में फिर कोशिश करें।",
  },
};
