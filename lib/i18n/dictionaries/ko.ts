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
    jobTitle: "가져오기 진행 상황",
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
    checkFrench: "열린 워크플로",

    statFormats: "가지 압축 형식",
    statFormatsSub: ".rar · .zip · .tar[.gz]",
    statCommands: "명령줄",
    statCommandsSub: "모두 클릭 한 번",
    statDuration: "올리기부터 푸시까지",
    statDurationSub: "미리보기 포함",
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

    mockFile: "nae-peurojekteu.zip",
    mockFileMeta: "{size} · {count}개 파일",
    mockExcluded: "제외됨",
    mockPushed: "github.com/you/nae-peurojekteu에 푸시됨 · main 브랜치",

    demoEyebrow: "로그인 전에 보는 마법",
    demoTitle: "압축 파일에서 GitHub 리포지토리까지 몇 초.",
    demoTitleAccent: "터미널 없이.",
    demoLead: "끌어다 놓고, 미리 보고, 푸시하세요. 명령어 없이, 승인 전에는 아무것도 전송되지 않습니다.",
    demoStep1: "로컬 ZIP",
    demoStep2: "압축 해제 검증됨",
    demoStep3: "리포 준비 완료",
    demoFileMeta: "18.4MB · 파일 1,284개",
    demoScan: "경로 검증됨",
    demoPushed: "푸시됨 · 방금",
    demoBranches: "main",
    demoNoAccount: "계정도 터미널도 필요 없음.",
    demoLocalBadge: "로컬",
    demoDropHint: "여기에 .zip 파일을 놓으세요",
    demoDropBrowse: "또는 파일 선택",
    demoDropCta: "압축 파일 가져오기",
    demoDropTooLarge: "압축 파일이 너무 큽니다(최대 {max}).",
    demoDropError: ".zip 파일만 사용할 수 있습니다.",
    demoReading: "압축파일 읽는 중…",
    demoExtracting: "압축 푸는 중…",
    demoReady: "푸시 준비 완료",
    demoReadyMeta: "파일 {count}개 감지됨 · 브라우저 밖으로 나가지 않았습니다",
    demoPushCta: "GitHub로 푸시",
    demoLocalNote: "파일은 브라우저에만 남습니다 — 아무것도 업로드되지 않습니다.",
    demoConnectTitle: "파일이 준비되었습니다!",
    demoConnectBody: "GitHub 계정을 연결해 푸시를 완료하세요.",
    demoConnectNote: "압축파일은 브라우저 밖으로 나가지 않았습니다 — GitHub 세션에서 푸시됩니다.",
    demoConnectCta: "GitHub로 연결",
    demoConnectLater: "나중에",
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
    dropTitle: "여기로 아카이브를 드래그하여 GitHub에 푸시하세요.",
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
    cancel: "취소",
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

  job: {
    statusQueued: "대기 중",
    statusExtracting: "압축 푸는 중",
    statusReady: "푸시 준비 완료",
    statusPushing: "푸시 중…",
    statusDone: "완료",
    statusFailed: "실패",
    extractingTitle: "압축 푸는 중…",
    extractingBody: "경로 검증, 크기 제한 적용, 루트 폴더 확인을 진행합니다. 모든 작업은 서버의 격리된 공간에서 처리됩니다.",
    pushingTitle: "GitHub로 푸시 중…",
    pushingBody: "커밋을 만들고 파일을 전송하고 있습니다. 이 탭을 열어 두셔도 됩니다 — 진행 상황을 알려드리겠습니다.",
    doneTitle: "푸시 완료!",
    doneFiles: "{branch} 브랜치에 {count}개 파일을 가져왔습니다",
    doneCommit: "커밋 {sha}",
    doneCreated: "저장소 생성됨",
    doneOpenGithub: "GitHub에서 열기",
    doneCopyLink: "링크 복사",
    doneDownload: ".zip으로 다운로드",
    doneImportAnother: "다른 아카이브 가져오기",
  },

  notFound: {
    title: "페이지를 찾을 수 없습니다",
    body: "이 페이지는 존재하지 않습니다 — 또는 작업이 만료되었습니다(압축 파일은 일정 시간 후 삭제됩니다).",
    back: "홈으로 돌아가기",
  },
};
