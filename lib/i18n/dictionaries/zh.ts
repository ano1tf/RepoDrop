import type { Dict } from "../types";

export const zh: Dict = {
  meta: {
    title: "RepoDrop — 把 .rar、.zip 和 .tar 压缩包导入 GitHub",
    description:
      "拖入 .rar、.zip、.tar 或 .tar.gz 压缩包，一键把代码推送到 GitHub。安全解压，推送前预览，无需终端和 git。",
    loginTitle: "GitHub 登录",
    loginDescription:
      "将 GitHub 账号连接到 RepoDrop，一键创建仓库并推送 .rar、.zip 或 .tar 压缩包。令牌加密，绝不存入数据库。",
    importTitle: "导入压缩包",
    importDescription:
      "上传 .rar、.zip、.tar 或 .tar.gz 压缩包，预览其中的文件并推送到 GitHub 仓库。",
  },

  nav: {
    howItWorks: "工作原理",
    myRepos: "我的仓库",
    importArchive: "导入压缩包",
    importShort: "导入",
    login: "登录",
    start: "开始使用",
    logout: "退出登录",
    avatarAlt: "{login} 的头像",
    language: "语言",
    languageChange: "切换语言",
    languageSearch: "搜索语言…",
    languageCurrent: "当前语言：{name}",
  },

  home: {
    heroBadge: "新增：.tar 与 .tar.gz",
    heroTitleLine1: "你的代码压缩包，",
    heroTitleLine2: "拖放即可上 GitHub。",
    heroBody:
      "收到 .rar、.zip 或 .tar 项目？连接 GitHub，拖入压缩包，选择仓库——已经推送完成。无需终端、无需克隆、无需配置。",
    ctaStart: "使用 GitHub 开始",
    ctaImport: "导入压缩包",
    ctaHow: "工作原理",
    checkSandboxed: "沙箱解压",
    checkToken: "GitHub 令牌永不存储",
    checkFrench: "开放工作流",

    statFormats: "种压缩格式",
    statFormatsSub: ".rar · .zip · .tar[.gz]",
    statCommands: "命令行",
    statCommandsSub: "全程点击完成",
    statDuration: "从拖入到推送",
    statDurationSub: "含预览",
    statLanguages: "种语言",
    statLanguagesSub: "界面与提示",

    stepsTitle: "工作原理",
    stepsLead: "三步、两分钟、零命令。",
    step1Title: "连接 GitHub",
    step1Body:
      "只需一次授权点击。我们仅申请必需的权限范围——令牌始终加密保存在你的浏览器中。",
    step2Title: "拖入压缩包",
    step2Body:
      "拖入 .rar、.zip 或 .tar。沙箱解压、路径校验、发送前完整预览。",
    step3Title: "一键推送",
    step3Body: "新建仓库或推送到已有仓库。提交以你的 GitHub 身份创建。",

    featuresTitle: "简洁",
    featuresTitleAccent: "且安全",
    featuresLead: "导入代码应当轻松——同时不把服务器变成筛子。",
    feature1Title: "原生支持 RAR、ZIP 和 TAR",
    feature1Body:
      ".rar（RAR4/RAR5）、.zip 与 .tar/.tar.gz 均在服务端打开——无需安装任何软件。",
    feature2Title: "加固的解压",
    feature2Body:
      "防 zip-slip、防解压炸弹，丢弃内嵌的 .git 和符号链接。仓库保持干净。",
    feature3Title: "推送前预览",
    feature3Body:
      "文件、大小、根目录、node_modules：你清楚看到将要推送的内容，并保持掌控。",
    feature4Title: "零命令行",
    feature4Body:
      "无需克隆、无需 git 凭据、无需「git push -u origin」。工具替你完成一切。",
    feature5Title: "新建或已有仓库",
    feature5Body:
      "创建私有或公开仓库，或把压缩包加入已有仓库——也可以推送到独立分支。",
    feature6Title: "为 AI 准备的链接",
    feature6Body:
      "推送后：Codespaces、vscode.dev、克隆地址、gh 命令和 .zip 压缩包。复制粘贴即可。",

    formatsTitle: "无论多老的压缩包",
    formatsBody:
      "Windows 的老 .rar、导出得到的 .zip、Linux 服务器的 .tar.gz：全部在服务端以流式读取，并有同样的防护。唯一的根目录会自动去掉，node_modules 默认排除。",

    securityTitle: "我们拒绝什么，以及为什么",
    securityLead: "解压陌生人的压缩包是有风险的运动。以下是每次导入下方张开的网。",
    guard1Title: "Zip-slip 与路径穿越",
    guard1Body: "每个路径都被校验（../、绝对路径、UNC、NUL）。一次命中即拒收整个压缩包。",
    guard2Title: "解压炸弹",
    guard2Body: "声明的大小在写入前累加：最多 {extract} 解压量、{files} 个文件。",
    guard3Title: "GitHub 令牌",
    guard3Body:
      "加密的 httpOnly Cookie（JWE A256GCM），通过 GIT_ASKPASS 推送。绝不入库、绝不写日志。",
    guard4Title: "配额",
    guard4Body: "每 IP 每小时 30 次上传、每用户每小时 10 次推送，计数持久化：服务保持健康。",
    limitsNote: "默认限制：上传 {upload}、解压 {extract}、每次导入 {files} 个文件。",

    faqTitle: "常见问题",
    faqLead: "关于把压缩包导入 GitHub、支持的格式以及账号隐私的一切。",

    ctaTitle: "准备好把下一个压缩包倒进 GitHub 了吗？",
    ctaLead: "登录、拖入、推送。其余交给我们。",

    mockFile: "my-project.zip",
    mockFileMeta: "{size} · {count} 个文件",
    mockExcluded: "已排除",
    mockPushed: "已推送到 github.com/you/my-project · main 分支",

    demoEyebrow: "登录之前，先看魔法",
    demoTitle: "从压缩包到 GitHub 仓库，只要几秒。",
    demoTitleAccent: "无需终端。",
    demoLead: "拖入、看预览、点推送。不用敲任何命令，你确认前什么都不会发出。",
    demoStep1: "拖入 ZIP",
    demoStep2: "解压已校验",
    demoStep3: "仓库就绪",
    demoDropZone: "拖放到此处",
    demoScan: "路径已校验",
    demoPushed: "已推送 · 刚刚",
    demoBranches: "main",
    demoNoAccount: "不用账号，不用终端。",
  },

  faq: {
    q1: "如何在不使用 Git 的情况下把 .rar 或 .zip 压缩包放到 GitHub？",
    a1: "在 RepoDrop 上连接你的 GitHub 账号，拖入 .rar、.zip、.tar 或 .tar.gz 文件，检查解压后的文件预览，然后选择新建或已有仓库。RepoDrop 会创建提交并以你的 GitHub 身份直接推送代码，无需终端和命令行。",
    q2: "支持哪些压缩格式和大小？",
    a2: "RepoDrop 原生支持 .rar（RAR4 与 RAR5）、.zip、.tar、.tar.gz 和 .tgz 压缩包，在服务端通过魔数识别。默认情况下压缩包最大为 {upload}（解压后 {extract}、{files} 个文件）。",
    q3: "我的 GitHub 令牌和私有源码会被存储吗？",
    a3: "不会。你的 GitHub OAuth 令牌只存在于浏览器中加密的 httpOnly Cookie（JWE A256GCM）里：绝不写入数据库或日志。解压出的文件位于隔离的临时空间，推送后自动清除。",
    q4: "可以把压缩包发到已有 GitHub 仓库而不覆盖我的工作吗？",
    a4: "可以。你可以新建仓库（公开或私有）、推送到已有仓库的独立分支以保留主分支，或明确选择带确认的完整替换。",
    q5: "导入时唯一的根目录和 node_modules 会怎样？",
    a5: "当压缩包只包含一个包裹目录时（例如 my-project/），RepoDrop 会建议自动去掉它，让文件直接位于仓库根目录。node_modules、内嵌的 .git 目录以及多余的系统文件（.DS_Store、__MACOSX）默认被丢弃。",
  },

  login: {
    title: "登录 RepoDrop",
    description: "授权访问 GitHub，以创建仓库并推送你的压缩包。",
    continueWithGithub: "使用 GitHub 继续",
    scopesLead: "我们只申请",
    scopesAnd: "和",
    scopesTail:
      "两个权限范围：以你的名义创建仓库并推送代码（包括你的 .github/workflows/ 文件）。令牌加密保存在 httpOnly Cookie 中，绝不存入数据库。",
    bulletCookie: "加密的 httpOnly Cookie（A256GCM）",
    bulletLogout: "退出登录 = 从浏览器清除令牌",
    devMode: "开发模式",
    devLogin: "直接登录（服务器的 GH_TOKEN）",
    errorState: "登录会话已过期，请重试。",
    errorOauth: "GitHub 拒绝了授权，请重新开始。",
    errorConfig: "应用未配置：请设置 GITHUB_CLIENT_ID / GITHUB_CLIENT_SECRET 后重启。",
    errorDevauth: "开发模式：服务器的 GH_TOKEN 缺失或无效。",
    errorGeneric: "登录出错。",
  },

  importPage: {
    title: "导入压缩包",
    lead: "拖入包含你代码的 .rar、.zip 或 .tar 文件（也支持 .tar.gz）。在向 GitHub 发送任何内容之前，你会看到完整预览。",
    browseLead: "想先看看账号里已有什么？浏览你的仓库及其内容，不发送任何东西。",
    browseCta: "浏览我的仓库",
    limitLabel: "限制：",
    limitBody: "每个压缩包 {upload}，解压后 {extract}。",
    securityLabel: "安全：",
    securityBody: "路径校验，丢弃 .git 和链接。",
    afterLabel: "之后：",
    afterBody: "预览、选择仓库，然后推送。",
  },

  uploader: {
    dropLabel: "拖入 .rar、.zip 或 .tar 压缩包",
    uploading: "正在发送压缩包… {progress}%",
    keepOpen: "请勿关闭此标签页。",
    dropHint: "将压缩包拖到此处，或点击浏览",
    formatsHint: ".rar、.zip、.tar 和 .tar.gz — 最大 {max}（解压后 {extract}）",
    errorFormat: "不支持的格式：仅接受 .rar、.zip、.tar 和 .tar.gz 文件。",
    errorEmpty: "该文件为空。",
    errorTooLarge: "压缩包过大（最大 {max}）。",
    errorHttp: "发送失败（HTTP {status}），请重试。",
    errorNetwork: "发送时连接中断，请重试。",
  },

  footer: {
    tagline: "你的代码压缩包，拖放上 GitHub。无需终端、无需克隆、无需配置 git。",
    productTitle: "产品",
    home: "首页",
    importArchive: "导入压缩包",
    howItWorks: "工作原理",
    security: "安全",
    faq: "常见问题",
    formatsTitle: "支持的格式",
    guaranteesTitle: "保障",
    guarantee1: "GitHub 令牌加密，绝不存入数据库",
    guarantee2: "沙箱解压，路径校验",
    guarantee3: "发送前完整预览",
    copyright: "© {year} RepoDrop — 你的压缩包，你的 GitHub。",
    reserved: "保留区域",
  },

  notFound: {
    title: "页面不存在",
    body: "此页面不存在——或者任务已过期（压缩包会在一段时间后被清除）。",
    back: "返回首页",
  },
};
