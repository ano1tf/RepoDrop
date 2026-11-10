import type { Dict } from "../types";

/**
 * English. Terminologie alignée sur le produit : « push » et « repo » restent
 * des mots anglais, « archive » est conservé (plus court que « compressed
 * file » et compris de tous les publics visés).
 */
export const en: Dict = {
  meta: {
    title: "RepoDrop — Import your .rar, .zip and .tar archives to GitHub",
    description:
      "Drop a .rar, .zip, .tar or .tar.gz archive and push your code to GitHub in one click. Safe extraction, preview before upload, no terminal and no git.",
    loginTitle: "GitHub sign-in",
    loginDescription:
      "Connect your GitHub account to RepoDrop to create a repo and push your .rar, .zip or .tar archives in one click. Token encrypted, never stored in the database.",
    importTitle: "Import an archive",
    importDescription:
      "Upload a .rar, .zip, .tar or .tar.gz archive to preview its files and push it to a GitHub repository.",
    jobTitle: "Import tracking",
  },

  nav: {
    howItWorks: "How it works",
    myRepos: "My repos",
    importArchive: "Import an archive",
    importShort: "Import",
    login: "Sign in",
    start: "Get started",
    logout: "Sign out",
    avatarAlt: "{login}'s avatar",
    language: "Language",
    languageChange: "Change language",
    languageSearch: "Search a language…",
    languageCurrent: "Current language: {name}",
  },

  home: {
    heroBadge: "New: .tar and .tar.gz",
    heroTitleLine1: "Your code archives,",
    heroTitleLine2: "on GitHub with a drag and drop.",
    heroBody:
      "Received a project .rar, .zip or .tar? Connect GitHub, drop the archive, pick the repo — it's pushed. No terminal, no clone, no setup.",
    ctaStart: "Get started with GitHub",
    ctaImport: "Import an archive",
    ctaHow: "How it works",
    checkSandboxed: "Sandboxed extraction",
    checkToken: "GitHub token never stored",
    checkFrench: "Open source workflow",

    statFormats: "archive formats",
    statFormatsSub: ".rar · .zip · .tar[.gz]",
    statCommands: "command line",
    statCommandsSub: "everything is a click",
    statDuration: "from drop to push",
    statDurationSub: "preview included",
    statLanguages: "languages",
    statLanguagesSub: "interface and messages",

    stepsTitle: "How does it work?",
    stepsLead: "Three steps, two minutes, zero commands.",
    step1Title: "Connect GitHub",
    step1Body:
      "One authorization click. We only request the scopes we need — your token stays encrypted in your browser.",
    step2Title: "Drop the archive",
    step2Body:
      "Drag your .rar, .zip or .tar. Sandboxed extraction, verified paths, full preview before anything is sent.",
    step3Title: "Push in one click",
    step3Body:
      "Create a repo or push to an existing one. The commit is created with your GitHub identity.",

    featuresTitle: "Built to be simple",
    featuresTitleAccent: "and safe",
    featuresLead:
      "Importing code should be child's play — without turning the server into a sieve.",
    feature1Title: "Native RAR, ZIP and TAR",
    feature1Body:
      ".rar (RAR4/RAR5), .zip and .tar/.tar.gz open server-side — no software to install, anywhere.",
    feature2Title: "Locked-down extraction",
    feature2Body:
      "Anti zip-slip, anti decompression bombs, embedded .git and symlinks discarded. Your repos stay clean.",
    feature3Title: "Preview before push",
    feature3Body:
      "Files, sizes, root folder, node_modules: you see exactly what leaves, and you stay in control.",
    feature4Title: "Zero command line",
    feature4Body:
      "No clone, no git credentials, no “git push -u origin”. The tool does it all for you.",
    feature5Title: "New or existing repo",
    feature5Body:
      "Create a private or public repo, or add the archive to an existing one — on a dedicated branch if you prefer.",

    formatsTitle: "Any archive, however old",
    formatsBody:
      "Old Windows .rar files, exported .zip files, .tar.gz from a Linux server: everything is read server-side, streamed, with the same guard rails. The single root folder is removed automatically and node_modules is excluded by default.",

    securityTitle: "What we refuse, and why",
    securityLead:
      "Unpacking a stranger's archive is a risky sport. Here are the nets stretched under every import.",
    guard1Title: "Zip-slip & traversal",
    guard1Body:
      "Every path is validated (../, absolute, UNC, NUL). A single attempt and the whole archive is rejected.",
    guard2Title: "Decompression bombs",
    guard2Body:
      "Declared sizes are summed before writing: {extract} extracted and {files} files maximum.",
    guard3Title: "GitHub token",
    guard3Body:
      "Encrypted httpOnly cookie (JWE A256GCM), push through GIT_ASKPASS. Never in the database, never in logs.",
    guard4Title: "Quotas",
    guard4Body:
      "30 uploads/h per IP and 10 pushes/h per user, persisted counters: the service stays healthy.",
    limitsNote:
      "Default limits: {upload} uploaded, {extract} extracted, {files} files per import.",

    faqTitle: "Frequently asked questions",
    faqLead:
      "Everything about importing archives to GitHub, the accepted formats and your account's privacy.",

    ctaTitle: "Ready to empty your next archive into GitHub?",
    ctaLead: "Sign in, drop, push. We handle the rest.",

    mockFile: "my-project.zip",
    mockFileMeta: "{size} · {count} files",
    mockExcluded: "excluded",
    mockPushed: "Pushed to github.com/you/my-project · main branch",

    demoEyebrow: "The magic, before sign-in",
    demoTitle: "From archive to GitHub repo in seconds.",
    demoTitleAccent: "No terminal.",
    demoLead: "The archive gets verified, the preview opens, the push goes out. Nothing leaves until you say so.",
    demoStep1: "Local archive",
    demoStep2: "Extraction verified",
    demoStep3: "Repo ready",
    demoFileMeta: "18.4 MB · 1,284 files",
    demoScan: "Paths verified",
    demoPushed: "Pushed · just now",
    demoBranches: "main",
    demoNoAccount: "Zero account, zero terminal.",
    demoLocalBadge: "Local",
    demoDropHint: "Drop a .zip here",
    demoDropBrowse: "or choose a file",
    demoDropError: "Only .zip files are accepted.",
    demoReading: "Reading the archive…",
    demoExtracting: "Extracting…",
    demoReady: "Ready to push",
    demoReadyMeta: "{count} files found · nothing left your browser",
    demoPushCta: "Push to GitHub",
    demoLocalNote: "Your files stay in your browser — nothing is uploaded.",
    demoConnectTitle: "File ready!",
    demoConnectBody: "Connect your GitHub account to finish the push.",
    demoConnectNote: "The archive never left your browser — it will be pushed from your GitHub session.",
    demoConnectCta: "Sign in with GitHub",
    demoConnectLater: "Later",
  },

  faq: {
    q1: "How do I put a .rar or .zip archive on GitHub without using Git?",
    a1: "Connect your GitHub account on RepoDrop, drag and drop your .rar, .zip, .tar or .tar.gz file, check the preview of the extracted files, then pick a new or existing repository. RepoDrop creates the commit and pushes the code directly under your GitHub identity, with no terminal and no command line.",
    q2: "Which archive formats and sizes are supported?",
    a2: "RepoDrop natively supports .rar (RAR4 and RAR5), .zip, .tar, .tar.gz and .tgz archives, detected from their magic bytes server-side. By default an archive can weigh up to {upload} compressed ({extract} extracted and {files} files).",
    q3: "Are my GitHub token and private source code stored?",
    a3: "No. Your GitHub OAuth token lives only in an encrypted httpOnly cookie (JWE A256GCM) in your browser: it is never written to the database or to the logs. Extracted files sit in an isolated temporary space and are purged automatically after the push.",
    q4: "Can I send an archive to an existing GitHub repository without overwriting my work?",
    a4: "Yes. You can create a brand-new repository (public or private), push to a dedicated branch of an existing repository so the main branch is preserved, or explicitly choose the full replacement option with confirmation.",
    q5: "What happens to the single root folder and node_modules during import?",
    a5: "When the archive contains a single wrapping folder (for example my-project/), RepoDrop offers to remove it automatically so your files land directly at the repository root. node_modules, embedded .git folders and useless system files (.DS_Store, __MACOSX) are discarded by default.",
  },

  login: {
    title: "Sign in to RepoDrop",
    description: "Authorize GitHub access to create repos and push your archives.",
    continueWithGithub: "Continue with GitHub",
    scopesLead: "We only request the",
    scopesAnd: "and",
    scopesTail:
      "scopes: create repositories and push code on your behalf (including your .github/workflows/ files). Your token is encrypted in an httpOnly cookie, never stored in the database.",
    bulletCookie: "Encrypted httpOnly cookie (A256GCM)",
    bulletLogout: "Signing out = token erased from the browser",
    devMode: "Development mode",
    devLogin: "Direct sign-in (server GH_TOKEN)",
    errorState: "The sign-in session expired. Try again.",
    errorOauth: "GitHub refused the authorization. Start again.",
    errorConfig:
      "The app is not configured: set GITHUB_CLIENT_ID / GITHUB_CLIENT_SECRET and restart.",
    errorDevauth: "Dev mode: the server GH_TOKEN is missing or invalid.",
    errorGeneric: "Sign-in error.",
  },

  importPage: {
    title: "Import an archive",
    lead: "Drop a .rar, .zip or .tar file (also .tar.gz) containing your code. You will see a full preview before anything is sent to GitHub.",
    browseLead:
      "Want to look at what is already on your account first? Browse your repos and their content without sending anything.",
    browseCta: "Browse my repos",
    limitLabel: "Limit:",
    limitBody: "{upload} per archive, {extract} extracted.",
    securityLabel: "Security:",
    securityBody: "verified paths, .git and links discarded.",
    afterLabel: "Next:",
    afterBody: "preview, pick the repo, then push.",
  },

  uploader: {
    dropLabel: "Drop a .rar, .zip or .tar archive",
    uploading: "Uploading the archive… {progress}%",
    keepOpen: "Do not close this tab.",
    dropHint: "Drag your archive here, or click to browse",
    formatsHint: ".rar, .zip, .tar & .tar.gz — {max} max ({extract} extracted)",
    errorFormat:
      "Unsupported format: only .rar, .zip, .tar and .tar.gz files are accepted.",
    errorEmpty: "This file is empty.",
    errorTooLarge: "Archive too large (max {max}).",
    errorHttp: "Upload failed (HTTP {status}). Try again.",
    errorNetwork: "Connection lost during upload. Try again.",
  },

  footer: {
    tagline:
      "Your code archives, on GitHub, with a drag and drop. No terminal, no clone, no git setup.",
    productTitle: "Product",
    home: "Home",
    importArchive: "Import an archive",
    howItWorks: "How it works",
    security: "Security",
    faq: "Frequently asked questions",
    formatsTitle: "Supported formats",
    guaranteesTitle: "Guarantees",
    guarantee1: "GitHub token encrypted, never stored in the database",
    guarantee2: "Sandboxed extraction, verified paths",
    guarantee3: "Full preview before anything is sent",
    copyright: "© {year} RepoDrop — your archives, your GitHub.",
    reserved: "Reserved area",
  },

  job: {
    statusQueued: "Queued",
    statusExtracting: "Extracting",
    statusReady: "Ready to push",
    statusPushing: "Pushing…",
    statusDone: "Done",
    statusFailed: "Failed",
    extractingTitle: "Extracting…",
    extractingBody: "Paths are checked, the size limit applied and the root folder detected. Everything happens server-side, in an isolated space.",
    pushingTitle: "Pushing to GitHub…",
    pushingBody: "Creating the commit and sending the files. You can leave this tab open — we'll keep you posted.",
    doneTitle: "It's pushed!",
    doneFiles: "{count} files imported on branch {branch}",
    doneCommit: "commit {sha}",
    doneCreated: "repository created",
    doneOpenGithub: "Open on GitHub",
    doneCopyLink: "Copy link",
    doneDownload: "Download as .zip",
    doneImportAnother: "Import another archive",
  },

  notFound: {
    title: "Page not found",
    body: "This page does not exist — or the job expired (archives are purged after a while).",
    back: "Back to home",
  },
};
