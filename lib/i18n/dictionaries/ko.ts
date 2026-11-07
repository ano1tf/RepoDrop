import type { Dict } from "../types";

export const ko: Dict = {
  meta: {
    title: "RepoDrop — .rar, .zip, .tar 압축 파일을 GitHub로 가져오기",
    description:
      ".rar, .zip, .tar, .tar.gz 압축 파일을 끌어다 놓고 클릭 한 번으로 코드를 GitHub에 푸시하세요. 안전한 압축 해제, 전송 전 미리보기, 터미널도 git도 필요 없습니다.",
    loginTitle: "GitHub 로그인",
    loginDescription:
      "GitHub 계정을 RepoDrop에 연결하면 저장소를 만들고 .rar, .zip, .tar 압축 파일을 클릭 한 번으로 푸시할 수 있습니다. 토큰은 암호화되며 데이터베이스에 저장되지 않습니다.",
    importTitle: "압축 파일 가져오기",
    importDescription:
      ".rar, .zip, .tar, .tar.gz 압축 파일을 업로드하여 파일을 미리 보고 GitHub 저장소로 푸시하세요.",
  },

  nav: {
    howItWorks: "사용 방법",
    myRepos: "내 저장소",
    importArchive: "압축 파일 가져오기",
    importShort: "가져오기",
    login: "로그인",
    start: "시작하기",
    logout: "로그아웃",
    avatarAlt: "{login}의 아바타",
    language: "언어",
    languageChange: "언어 변경",
    languageSearch: "언어 검색…",
    languageCurrent: "현재 언어: {name}",
  },

  home: {
    heroBadge: "신규: .tar 및 .tar.gz",
    heroTitleLine1: "코드 압축 파일을,",
    heroTitleLine2: "끌어다 놓으면 GitHub에.",
    heroBody:
      "프로젝트가 .rar, .zip, .tar로 왔나요? GitHub를 연결하고 압축 파일을 떨어뜨린 뒤 저장소를 고르면 — 이미 푸시되었습니다. 터미널도, 클론도, 설정도 없습니다.",
    ctaStart: "GitHub로 시작하기",
    ctaImport: "압축 파일 가져오기",
    ctaHow: "사용 방법",
    checkSandboxed: "샌드박스 압축 해제",
    checkToken: "GitHub 토큰은 저장되지 않음",
    checkFrench: "오픈: 소스 코드 공개",

    statFormats: "가지 압축 형식",
    statFormatsSub: ".rar · .zip · .tar[.gz]",
    statCommands: "명령줄",
    statCommandsSub: "모두 클릭 한 번",
    statDuration: "올리기부터 푸시까지",
    statDurationSub: "미리보기 포함",
    statDurationValue: "2분",
    statLanguages: "개 언어",
    statLanguagesSub: "인터페이스와 메시지",

    stepsTitle: "어떻게 동작하나요?",
    stepsLead: "세 단계, 이 분, 명령어 없음.",
    step1Title: "GitHub 연결",
    step1Body:
      "권한 승인 클릭 한 번. 필요한 범위만 요청하며 토큰은 브라우저 안에서 암호화된 채로 남습니다.",
    step2Title: "압축 파일 올리기",
    step2Body:
      ".rar, .zip, .tar를 끌어다 놓으세요. 샌드박스 압축 해제, 경로 검증, 전송 전 전체 미리보기.",
    step3Title: "클릭 한 번으로 푸시",
    step3Body:
      "저장소를 새로 만들거나 기존 저장소로 푸시합니다. 커밋은 당신의 GitHub 아이덴티티로 생성됩니다.",

    featuresTitle: "단순하도록 설계",
    featuresTitleAccent: "그리고 안전하게",
    featuresLead:
      "코드 가져오기는 아주 쉬워야 합니다 — 서버를 체로 만들지 않으면서.",
    feature1Title: "RAR, ZIP, TAR 기본 지원",
    feature1Body:
      ".rar(RAR4/RAR5), .zip, .tar/.tar.gz 는 서버 측에서 열립니다 — 어디에도 설치할 프로그램이 없습니다.",
    feature2Title: "견고한 압축 해제",
    feature2Body:
      "zip-slip 및 압축 폭탄 방지, 내장 .git과 심볼릭 링크는 버립니다. 저장소는 깨끗하게 유지됩니다.",
    feature3Title: "푸시 전 미리보기",
    feature3Body:
      "파일, 크기, 루트 폴더, node_modules: 무엇이 나가는지 정확히 보고 통제권을 유지합니다.",
    feature4Title: "명령줄 제로",
    feature4Body:
      "클론 없음, git 자격 증명 없음, «git push -u origin» 없음. 도구가 모든 것을 대신합니다.",
    feature5Title: "새 저장소든 기존 저장소든",
    feature5Body:
      "비공개 또는 공개 저장소를 만들거나 기존 저장소에 압축 파일을 추가하세요 — 원하면 전용 브랜치로도.",
    feature6Title: "AI를 위한 링크",
    feature6Body:
      "푸시 후: Codespaces, vscode.dev, 클론 URL, gh 명령, .zip 압축 파일. 복사-붙여넣기면 충분합니다.",

    formatsTitle: "얼마나 오래된 압축 파일이든",
    formatsBody:
      "Windows의 오래된 .rar, 내보내기에서 나온 .zip, Linux 서버의 .tar.gz: 모두 서버 측에서 스트리밍으로 읽히고 같은 보호 장치가 적용됩니다. 단일 루트 폴더는 자동으로 제거되고 node_modules는 기본적으로 제외됩니다.",

    securityTitle: "무엇을 거부하고, 왜",
    securityLead:
      "낯선 사람의 압축 파일을 푸는 것은 위험한 스포츠입니다. 모든 가져오기 아래 펼쳐진 그물은 이렇습니다.",
    guard1Title: "Zip-slip 및 경로 이탈",
    guard1Body:
      "모든 경로를 검증합니다(../, 절대 경로, UNC, NUL). 한 번이라도 걸리면 압축 파일 전체가 거부됩니다.",
    guard2Title: "압축 폭탄",
    guard2Body:
      "선언된 크기를 쓰기 전에 합산합니다: 최대 {extract} 압축 해제, {files}개 파일.",
    guard3Title: "GitHub 토큰",
    guard3Body:
      "암호화된 httpOnly 쿠키(JWE A256GCM), GIT_ASKPASS로 푸시. DB에도 로그에도 남기지 않습니다.",
    guard4Title: "할당량",
    guard4Body:
      "IP당 시간당 30 업로드, 사용자당 시간당 10 푸시, 영구 카운터: 서비스가 건강하게 유지됩니다.",
    limitsNote:
      "기본 한도: {upload} 업로드, {extract} 압축 해제, 가져오기당 {files}개 파일.",

    faqTitle: "자주 묻는 질문",
    faqLead:
      "GitHub로 압축 파일 가져오기, 지원 형식, 계정 개인정보에 관한 모든 것.",

    ctaTitle: "다음 압축 파일을 GitHub에 풀어 놓을 준비가 되셨나요?",
    ctaLead: "로그인하고, 올리고, 푸시하세요. 나머지는 저희가.",

    mockFile: "nae-peurojekteu.tar",
    mockFileMeta: "{size} · {count}개 파일",
    mockExcluded: "제외됨",
    mockPushed: "github.com/you/nae-peurojekteu에 푸시됨 · main 브랜치",
  },

  faq: {
    q1: "Git을 쓰지 않고 .rar 또는 .zip 압축 파일을 GitHub에 올리려면?",
    a1: "RepoDrop에서 GitHub 계정을 연결하고 .rar, .zip, .tar, .tar.gz 파일을 끌어다 놓은 뒤, 압축을 푼 파일의 미리보기를 확인하고 새 저장소나 기존 저장소를 고르세요. RepoDrop이 커밋을 만들고 당신의 GitHub 아이덴티티로 코드를 직접 푸시합니다. 터미널도 명령줄도 필요 없습니다.",
    q2: "어떤 압축 형식과 크기를 지원하나요?",
    a2: "RepoDrop은 .rar(RAR4 및 RAR5), .zip, .tar, .tar.gz, .tgz 압축 파일을 기본 지원하며 서버 측에서 매직 바이트로 판별합니다. 기본적으로 압축 파일은 압축 상태로 {upload}까지 가능합니다(압축 해제 후 {extract}, {files}개 파일).",
    q3: "GitHub 토큰과 비공개 소스 코드가 저장되나요?",
    a3: "아니요. GitHub OAuth 토큰은 브라우저 안의 암호화된 httpOnly 쿠키(JWE A256GCM)에만 존재하며 데이터베이스나 로그에 기록되지 않습니다. 압축을 푼 파일은 격리된 임시 공간에 있으며 푸시 후 자동으로 삭제됩니다.",
    q4: "작업을 덮어쓰지 않고 기존 GitHub 저장소로 압축 파일을 보낼 수 있나요?",
    a4: "네. 새 저장소(공개 또는 비공개)를 만들거나, 기본 브랜치를 지키기 위해 기존 저장소의 전용 브랜치로 푸시하거나, 확인과 함께 전체 교체를 명시적으로 선택할 수 있습니다.",
    q5: "가져오기 중 단일 루트 폴더와 node_modules는 어떻게 되나요?",
    a5: "압축 파일에 감싸는 폴더가 하나뿐이면(예: nae-peurojekteu/), RepoDrop이 자동으로 제거하여 파일이 저장소 루트에 바로 놓이도록 제안합니다. node_modules, 내장 .git 폴더, 불필요한 시스템 파일(.DS_Store, __MACOSX)은 기본적으로 제외됩니다.",
  },

  login: {
    title: "RepoDrop 로그인",
    description: "저장소를 만들고 압축 파일을 푸시하려면 GitHub 접근을 허용하세요.",
    continueWithGithub: "GitHub로 계속",
    scopesLead: "요청하는 범위는",
    scopesAnd: "와",
    scopesTail:
      "뿐입니다: 당신의 이름으로 저장소를 만들고 코드를 푸시합니다(.github/workflows/ 파일 포함). 토큰은 httpOnly 쿠키에 암호화되며 데이터베이스에 저장되지 않습니다.",
    bulletCookie: "암호화된 httpOnly 쿠키(A256GCM)",
    bulletLogout: "로그아웃 = 브라우저에서 토큰 삭제",
    devMode: "개발 모드",
    devLogin: "직접 로그인(서버 GH_TOKEN)",
    errorState: "로그인 세션이 만료되었습니다. 다시 시도하세요.",
    errorOauth: "GitHub가 권한을 거부했습니다. 처음부터 다시 하세요.",
    errorConfig:
      "앱이 구성되지 않았습니다: GITHUB_CLIENT_ID / GITHUB_CLIENT_SECRET을 설정하고 다시 시작하세요.",
    errorDevauth: "개발 모드: 서버 GH_TOKEN이 없거나 유효하지 않습니다.",
    errorGeneric: "로그인 오류.",
  },

  importPage: {
    title: "압축 파일 가져오기",
    lead: "코드가 담긴 .rar, .zip 또는 .tar(.tar.gz 포함) 파일을 끌어다 놓으세요. GitHub로 무엇이든 보내기 전에 전체 미리보기를 볼 수 있습니다.",
    browseLead:
      "먼저 계정에 무엇이 있는지 보고 싶나요? 아무것도 보내지 않고 저장소와 내용을 살펴보세요.",
    browseCta: "내 저장소 둘러보기",
    limitLabel: "한도:",
    limitBody: "압축 파일당 {upload}, 압축 해제 후 {extract}.",
    securityLabel: "보안:",
    securityBody: "경로 검증, .git과 링크 제외.",
    afterLabel: "그다음:",
    afterBody: "미리보기, 저장소 선택, 그리고 푸시.",
  },

  uploader: {
    dropLabel: ".rar, .zip, .tar 압축 파일 놓기",
    uploading: "압축 파일 전송 중… {progress}%",
    keepOpen: "이 탭을 닫지 마세요.",
    dropHint: "압축 파일을 여기로 끌거나 클릭하여 찾아보세요",
    formatsHint: ".rar, .zip, .tar 및 .tar.gz — 최대 {max}(압축 해제 후 {extract})",
    errorFormat:
      "지원하지 않는 형식입니다: .rar, .zip, .tar, .tar.gz 파일만 허용됩니다.",
    errorEmpty: "이 파일은 비어 있습니다.",
    errorTooLarge: "압축 파일이 너무 큽니다(최대 {max}).",
    errorHttp: "전송 실패(HTTP {status}). 다시 시도하세요.",
    errorNetwork: "전송 중 연결이 끊겼습니다. 다시 시도하세요.",
  },

  footer: {
    tagline:
      "코드 압축 파일을, 끌어다 놓으면 GitHub로. 터미널도, 클론도, git 설정도 없습니다.",
    productTitle: "제품",
    home: "홈",
    importArchive: "압축 파일 가져오기",
    howItWorks: "사용 방법",
    security: "보안",
    faq: "자주 묻는 질문",
    formatsTitle: "지원 형식",
    guaranteesTitle: "보증",
    guarantee1: "GitHub 토큰 암호화, 데이터베이스에 저장 안 함",
    guarantee2: "샌드박스 압축 해제, 경로 검증",
    guarantee3: "어떤 전송 전에도 전체 미리보기",
    copyright: "© {year} RepoDrop — 당신의 압축 파일, 당신의 GitHub.",
    reserved: "관계자 전용",
  },

  notFound: {
    title: "페이지를 찾을 수 없습니다",
    body: "이 페이지는 존재하지 않습니다 — 또는 작업이 만료되었습니다(압축 파일은 일정 시간 후 삭제됩니다).",
    back: "홈으로 돌아가기",
  },
  jobs: {
    metaTitle: "가져오기 진행 상황",

    statusQueued: "대기 중",
    statusExtracting: "압축 해제 중",
    statusReady: "푸시 준비 완료",
    statusPushing: "푸시 중…",
    statusDone: "완료",
    statusFailed: "실패",

    extractingTitle: "압축을 푸는 중…",
    extractingBody:
      "경로와 크기를 검사하고 루트 폴더를 찾습니다. 모든 작업은 서버의 격리된 공간에서 이루어집니다.",
    pushingTitle: "GitHub로 푸시하는 중…",
    pushingBody:
      "커밋을 만들고 파일을 보내고 있습니다. 이 탭을 열어 두셔도 됩니다. 진행 상황을 알려 드리겠습니다.",

    failedTitle: "작업이 실패했습니다",
    failedUnknown: "알 수 없는 오류입니다.",
    lostConnection: "연결이 끊겼습니다. 다시 시도해 주세요.",
    httpFailed: "실패 (HTTP {status}).",
    repoMoved:
      "저장소 {repo}이(가) 가져온 뒤 변경되었습니다. 이 압축 파일의 내용 그대로 브랜치를 덮어쓸 수 있습니다. 압축 파일에 없는 파일은 저장소에서 삭제되고 푸시는 강제로 진행됩니다. 기존 기록은 유지됩니다(그 위에 새 커밋).",
    repoMovedConfirm:
      "이 저장소의 코드를 이 압축 파일로 완전히 바꿀까요?",
    replaceAllYes: "예, 모든 코드를 바꿉니다",
    replaceAllRetry: "모든 코드를 바꾸어 다시 시도",
    cancel: "취소",
    retryOtherArchive: "다른 압축 파일로 다시 시도",
    backHome: "홈으로 돌아가기",

    doneTitle: "푸시 완료!",
    doneBody: "{count}개를 다음 브랜치에 가져왔습니다:",
    doneCommit: "커밋",
    doneCreated: "· 저장소 생성됨",
    openOnGithub: "GitHub에서 열기",
    copyLink: "링크 복사",
    downloadZip: ".zip으로 내려받기",
    aiLinksTitle: "AI에게 바로 넘길 수 있는 링크:",
    anotherImport: "다른 압축 파일 가져오기",

    linkRepo: "GitHub 저장소",
    linkBranch: "브랜치 '{branch}'",
    linkBranchSub: "이 브랜치로 푸시하세요",
    linkCommit: "특정 커밋",
    linkCodespaces: "Codespaces (GitHub AI 에이전트)",
    linkCodespacesSub: "vscode.dev 바로 사용 가능, Copilot 연결됨",
    linkVscode: "vscode.dev (공식 웹 편집기)",
    linkVscodeSub: "Copilot + 편집 + 실행 (Codespaces)",
    linkClone: "클론 URL (외부 에이전트)",
    linkCloneSub: "에이전트가 자신의 GitHub 세션으로 직접 인증합니다",
    linkGh: "`gh` CLI 명령",

    previewTitle: "압축 파일 미리보기",
    previewLead: "안전 필터를 거친 뒤 푸시될 내용입니다.",
    previewFiles: "파일",
    previewSize: "압축 해제 후 크기",
    previewIgnored: "제외됨:",
    ignoredGit: ".git ({count})",
    ignoredSystemFiles: "시스템 파일 ({count})",
    ignoredSymlinks: "심볼릭 링크 ({count})",
    ignoredHardlinks: "하드 링크 ({count})",
    ignoredBlocked: "차단된 경로 ({count})",
    tooLargeForGithub:
      "{count}개 파일이 100MB를 넘습니다. GitHub가 거부할 가능성이 높습니다. 예:",

    filtersTitle: "가져오기 필터",
    filtersNone: "이 압축 파일에 사용할 수 있는 필터가 없습니다.",
    stripRootLabel: "루트 폴더 제거",
    stripRootHint:
      "권장: 프로젝트 내용이 저장소 루트에 바로 놓입니다.",
    includeNodeModules: "포함",
    includeNodeModulesHint:
      "기본값은 해제: 무겁고 저장소에서는 거의 쓸모가 없습니다.",

    destTitle: "대상",
    destLead: "이 파일들을 어디로 푸시할까요?",
    destNew: "새 저장소",
    destExisting: "기존 저장소",
    repoNameLabel: "저장소 이름",
    repoNamePlaceholder: "my-project",
    repoNameInvalid:
      "영문자, 숫자, 마침표, 하이픈, 밑줄만 사용할 수 있습니다(영문자나 숫자로 시작해야 합니다).",
    visibilityLabel: "공개 범위",
    visibilityPrivate: "비공개",
    visibilityPrivateHint: "나만 볼 수 있음",
    visibilityPublic: "공개",
    visibilityPublicHint: "누구나 볼 수 있음",
    searchRepo: "저장소 검색…",
    loadingRepos: "저장소를 불러오는 중…",
    reposLoadError: "저장소를 불러오지 못했습니다.",
    noWritableRepo:
      "쓰기 권한이 있는 저장소가 없습니다. 새로 만드세요!",
    noRepoMatch: "검색과 일치하는 저장소가 없습니다.",
    dedicatedBranch: "전용 브랜치 만들기",
    dedicatedHintExisting:
      "기본 브랜치를 건드리지 않음: 공유 저장소에 적합합니다.",
    dedicatedHintNew:
      "새 저장소의 첫 브랜치 이름(없으면 기본 브랜치).",
    replaceAll: "저장소의 모든 코드 바꾸기",
    replaceAllHint:
      "저장소에는 압축 파일의 파일만 남습니다. 없는 파일은 삭제되고 푸시는 강제로 진행되므로, 그사이 저장소가 바뀌었어도 성공합니다('fetch first' 오류가 더 이상 나지 않습니다). 압축 파일이 프로젝트의 완전한 새 버전일 때 사용하세요.",
    replaceConfirm:
      "확인합니다: 저장소 {repo}에서 이 압축 파일에 없는 파일은 푸시된 브랜치에서 영구히 삭제됩니다.",
    replaceConfirmNoRepo:
      "확인합니다: 저장소에서 이 압축 파일에 없는 파일은 푸시된 브랜치에서 영구히 삭제됩니다.",
    advanced: "고급 옵션",
    commitMessage: "커밋 메시지",
    commitPlaceholder: "RepoDrop으로 {filename} 가져오기",
    pushAction: "GitHub로 푸시",
    replacePushAction: "GitHub의 모든 코드 바꾸기",
    sending: "보내는 중…",
    replaceNeedConfirm: "바꾸기 확인을 체크해야 버튼이 활성화됩니다.",
    tokenNote:
      "GitHub 토큰은 암호화된 쿠키에 남아 있으며 데이터베이스에는 절대 기록되지 않습니다.",
  },

  repos: {
    metaTitle: "내 저장소",
    pageTitle: "내 저장소",
    pageLead:
      "가져오기 전에 저장소를 살펴보세요. 트리, 파일 미리보기, 원하는 브랜치. 이름 변경, 공개 범위, 삭제는 저장소의 {actions} 탭에서 할 수 있습니다.",

    filterPlaceholder: "이름, 설명 또는 언어로 필터링…",
    filterAria: "저장소 필터링",
    sortAria: "정렬",
    sortPushed: "최근 활동",
    sortName: "이름 (A→Z)",
    sortSize: "크기",
    mine: "내 저장소",
    refresh: "새로 고침",
    errorList: "목록을 불러올 수 없습니다 (HTTP {status}).",
    errorServer: "서버에 연결할 수 없습니다.",
    truncated:
      "최신 300개 저장소만 불러왔습니다. 위 필터로 범위를 좁히세요.",
    loading: "저장소를 불러오는 중…",
    emptyFilter: "이 필터와 일치하는 저장소가 없습니다.",
    emptyToken: "이 GitHub 토큰으로 볼 수 있는 저장소가 없습니다.",
    countAll: "저장소 {count}개",
    countFiltered: "{total}개 중 {count}개",
    countHint: "— 클릭하면 내용을 볼 수 있습니다.",
    noDescription: "설명 없음",
    pushedAgo: "{when} 푸시됨",
    issues: "이슈 {count}개",
    readOnly: "읽기 전용",

    backToList: "목록으로 돌아가기",
    list: "목록",
    badgePrivate: "비공개",
    badgePublic: "공개",
    badgeArchived: "보관됨",
    badgeFork: "fork",
    badgeReadOnly: "읽기 전용",
    branchProtected: "(보호됨)",
    downloadTitle: "{repo}을(를) .{format}으로 내려받기",
    downloadTitleRef: "{repo}({ref})을(를) .{format}으로 내려받기",
    actionsTab: "작업",
    loadingRepo: "저장소를 불러오는 중…",
    inaccessible: "저장소에 접근할 수 없습니다.",
    inaccessibleHttp: "저장소에 접근할 수 없습니다 (HTTP {status}).",
    errorServerJoin: "서버에 연결할 수 없습니다.",
    copyDenied: "브라우저가 복사를 거부했습니다.",
    reloadFolder: "이 폴더 새로 고침",
    root: "루트",
    entries: "항목 {count}개",
    loadingShort: "불러오는 중…",
    emptyRepo:
      "이 저장소에는 아직 파일이 없습니다. 압축 파일을 가져와 채워 보세요.",
    loadingFile: "파일을 불러오는 중…",
    selectFile: "파일을 선택하면 미리 볼 수 있습니다.",
    lines: "{count}줄",
    copy: "복사",
    copied: "복사됨",
    raw: "원본",
    fileTooBig:
      "파일이 너무 커서 미리 볼 수 없습니다({size}). GitHub에서 여세요.",
    fileBinary: "바이너리 파일({size}): 텍스트 미리보기가 없습니다.",

    actionsTitle: "이름 변경 / 설명",
    nameLabel: "저장소 이름",
    renameWarning:
      "이름을 바꾸면 기존 클론, 링크, GitHub 페이지가 깨집니다. GitHub는 이전 이름을 리디렉션하지만 영원하지는 않습니다.",
    descLabel: "설명",
    descPlaceholder: "이 저장소는 무엇을 위한 것인가요?",
    save: "저장",
    writeInsufficient: "이 저장소에 대한 쓰기 권한이 부족합니다.",
    visibilityTitle: "공개 범위",
    visibilityCurrently: "현재 {visibility}.",
    visibilityToPrivate:
      " 비공개로 바꾸면 모든 익명 사용자의 접근이 사라집니다.",
    visibilityToPublic:
      " 공개로 바꾸면 모든 커밋 기록이 드러납니다.",
    makePublic: "공개로 전환",
    makePrivate: "비공개로 전환",
    dangerZone: "위험 구역",
    deleteWarning:
      "삭제는 되돌릴 수 없습니다: 코드, 기록, 이슈, 위키.",
    deleteRepo: "저장소 삭제",
    deleteTitle: "{repo} 삭제",
    deleteConfirmBody:
      "복구할 수 없습니다. 버튼을 활성화하려면 {name}을(를) 입력하세요.",
    deleteForever: "영구 삭제",
    cancel: "취소",
    updated: "저장소를 업데이트했습니다.",
    deleted: "저장소 {repo}을(를) 삭제했습니다.",
    httpFailed: "실패 (HTTP {status}).",
  },

  api: {
    authRequired: "인증이 필요합니다.",
    jobNotFound: "작업을 찾을 수 없습니다.",
    jobNotReady: "이 작업은 아직 준비되지 않았습니다.",
    jobNotPushable: "이 작업은 푸시할 준비가 되지 않았습니다.",
    invalidJson: "잘못된 JSON 본문입니다.",
    invalidMultipart: "잘못된 요청입니다(multipart/form-data 필요).",
    emptyBody: "요청 본문이 비어 있습니다.",
    emptyArchive: "압축 파일이 비어 있습니다.",
    uploadFailed: "파일을 받지 못했습니다. 다시 시도해 주세요.",
    repoNameRequired: "새 저장소를 만들려면 저장소 이름이 필요합니다.",
    branchNameTooLong: "브랜치 이름이 너무 깁니다.",
    invalidOptions: "잘못된 옵션입니다.",
    invalidChange: "잘못된 변경입니다.",
    noChange: "변경 사항이 없습니다.",
    pathRequired: "'path' 매개변수가 필요합니다.",
  },
  errors: {
    encrypted: "이 압축 파일은 비밀번호로 보호되어 있어 아직 지원되지 않습니다.",
    tooManyFiles: "압축 파일에 파일이 너무 많습니다(한도 도달).",
    tooBig:
      "압축을 푼 내용이 허용 크기를 초과합니다. 압축 파일을 줄이세요(node_modules?).",
    empty: "이 압축 파일에는 쓸 수 있는 파일이 없습니다.",
    corrupt: "압축 파일을 읽을 수 없거나 손상되었습니다. 파일을 확인하고 다시 시도하세요.",
    unsupported: "지원하지 않는 형식입니다(알 수 없는 압축 방식 또는 압축 파일 종류).",
    volume: "분할 RAR 압축 파일(.part1.rar, .part2.rar…)은 지원되지 않습니다.",
    unsafePaths: "압축 파일에 위험한 경로(경로 탈출)가 있어 거부되었습니다.",
    pathLimits: "파일 경로가 허용 한도(깊이 또는 길이)를 초과합니다.",
    timeout: "압축 해제에 시간이 너무 오래 걸려 중단되었습니다.",
    rateLimited: "요청이 너무 많습니다. 잠시 후 다시 시도하세요.",
    notFound: "리소스를 찾을 수 없습니다.",
    forbidden:
      "이 저장소에 대한 쓰기 권한이 없습니다(또는 GitHub 토큰에 필요한 범위가 없습니다).",
    repoExists: "계정에 같은 이름의 저장소가 이미 있습니다.",
    nameInvalid: "저장소 또는 브랜치 이름이 잘못되었습니다.",
    noChanges: "푸시할 내용이 없습니다. 파일이 이미 대상 저장소와 같습니다.",
    conflict:
      "대상 저장소가 그사이 변경되었습니다. 다시 시도하거나 전용 브랜치로 푸시하거나, '모든 코드 바꾸기'로 다시 실행해 압축 파일 내용으로 브랜치를 덮어쓰세요.",
    scopeMissing:
      "GitHub가 workflow 파일(.github/workflows/…) 변경을 거부합니다. 토큰에 'workflow' 범위가 없습니다. 로그아웃 후 다시 로그인해 권한을 부여하세요.",
    gitFailed: "GitHub로 푸시하지 못했습니다.",
    interrupted: "처리가 중단되었습니다(서버 재시작).",
    badPath: "파일 경로가 잘못되었습니다.",
    confirmMismatch: "확인 내용이 저장소 이름과 일치하지 않습니다. 아무것도 삭제되지 않았습니다.",
    archiveTooBig: "이 저장소는 너무 커서 압축 파일 하나로 내려받을 수 없습니다.",
    internal: "예기치 않은 내부 오류입니다. 잠시 후 다시 시도하세요.",
  },
};
