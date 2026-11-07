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
    checkFrench: "Open: the source is public",

    statFormats: "archive formats",
    statFormatsSub: ".rar · .zip · .tar[.gz]",
    statCommands: "command line",
    statCommandsSub: "everything is a click",
    statDuration: "from drop to push",
    statDurationSub: "preview included",
    statDurationValue: "2 min",
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
    feature6Title: "AI-ready links",
    feature6Body:
      "After the push: Codespaces, vscode.dev, clone URL, gh command and .zip archive. One copy-paste is enough.",

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

    mockFile: "my-project.tar",
    mockFileMeta: "{size} · {count} files",
    mockExcluded: "excluded",
    mockPushed: "Pushed to github.com/you/my-project · main branch",
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

  notFound: {
    title: "Page not found",
    body: "This page does not exist — or the job expired (archives are purged after a while).",
    back: "Back to home",
  },
  jobs: {
    metaTitle: "Import tracking",

    statusQueued: "Queued",
    statusExtracting: "Extracting",
    statusReady: "Ready to push",
    statusPushing: "Pushing…",
    statusDone: "Done",
    statusFailed: "Failed",

    extractingTitle: "Extracting…",
    extractingBody:
      "Checking paths and sizes, detecting the root folder. Everything happens server-side, in an isolated space.",
    pushingTitle: "Pushing to GitHub…",
    pushingBody:
      "Creating the commit and sending the files. You can leave this tab open — we'll keep you posted.",

    failedTitle: "The operation failed",
    failedUnknown: "Unknown error.",
    lostConnection: "Connection lost. Try again.",
    httpFailed: "Failed (HTTP {status}).",
    repoMoved:
      "The {repo} repository has moved on since your import. You can overwrite its branch with the exact content of this archive: files that are not in the archive will be deleted from the repository and the push will be forced. The existing history is kept (new commit on top).",
    repoMovedConfirm:
      "Do you confirm replacing all of this repository's code with this archive?",
    replaceAllYes: "Yes, replace all the code",
    replaceAllRetry: "Retry, replacing all the code",
    cancel: "Cancel",
    retryOtherArchive: "Try again with another archive",
    backHome: "Back to home",

    doneTitle: "Pushed!",
    doneBody: "{count} imported on branch",
    doneCommit: "commit",
    doneCreated: "· repository created",
    openOnGithub: "Open on GitHub",
    copyLink: "Copy link",
    downloadZip: "Download as .zip",
    aiLinksTitle: "Links ready to hand to an AI:",
    anotherImport: "Import another archive",

    linkRepo: "GitHub repository",
    linkBranch: "Branch “{branch}”",
    linkBranchSub: "Push to this branch",
    linkCommit: "Exact commit",
    linkCodespaces: "Codespaces (GitHub AI agent)",
    linkCodespacesSub: "vscode.dev, ready to use, Copilot connected",
    linkVscode: "vscode.dev (official web editor)",
    linkVscodeSub: "Copilot + editing + running (Codespaces)",
    linkClone: "Clone URL (external agent)",
    linkCloneSub: "The agent authenticates itself with its GitHub session",
    linkGh: "`gh` CLI command",

    previewTitle: "Archive preview",
    previewLead: "What will be pushed, after the safety filters.",
    previewFiles: "Files",
    previewSize: "Uncompressed size",
    previewIgnored: "Ignored:",
    ignoredGit: ".git ({count})",
    ignoredSystemFiles: "system files ({count})",
    ignoredSymlinks: "symlinks ({count})",
    ignoredHardlinks: "hardlinks ({count})",
    ignoredBlocked: "blocked paths ({count})",
    tooLargeForGithub:
      "{count} file(s) are over 100 MB: GitHub will most likely reject them. E.g.:",

    filtersTitle: "Import filters",
    filtersNone: "No filter available for this archive.",
    stripRootLabel: "Remove the root folder",
    stripRootHint: "Recommended: the project content would land at the repository root.",
    includeNodeModules: "Include",
    includeNodeModulesHint: "Unchecked by default: heavy and rarely useful in a repository.",

    destTitle: "Destination",
    destLead: "Where should these files be pushed?",
    destNew: "New repository",
    destExisting: "Existing repository",
    repoNameLabel: "Repository name",
    repoNamePlaceholder: "my-project",
    repoNameInvalid:
      "Letters, digits, dots, hyphens and underscores only (must start with a letter or digit).",
    visibilityLabel: "Visibility",
    visibilityPrivate: "Private",
    visibilityPrivateHint: "Visible to you only",
    visibilityPublic: "Public",
    visibilityPublicHint: "Visible to everyone",
    searchRepo: "Search a repository…",
    loadingRepos: "Loading your repositories…",
    reposLoadError: "Could not load your repositories.",
    noWritableRepo: "No repository found with write access. Create a new one!",
    noRepoMatch: "No repository matches the search.",
    dedicatedBranch: "Create a dedicated branch",
    dedicatedHintExisting:
      "Leave the default branch untouched: ideal for a shared repository.",
    dedicatedHintNew:
      "Initial branch name of the new repository (otherwise the default branch).",
    replaceAll: "Replace all the repository's code",
    replaceAllHint:
      "The repository will contain exactly the archive's files: anything missing from it will be deleted, and the push will be forced — it will succeed even if the repository changed in the meantime (no more “fetch first” error). Use it when the archive is the project's complete new version.",
    replaceConfirm:
      "I confirm: files of the {repo} repository that are not in this archive will be permanently deleted from the pushed branch.",
    replaceConfirmNoRepo:
      "I confirm: files of the repository that are not in this archive will be permanently deleted from the pushed branch.",
    advanced: "Advanced options",
    commitMessage: "Commit message",
    commitPlaceholder: "Import of {filename} via RepoDrop",
    pushAction: "Push to GitHub",
    replacePushAction: "Replace all the code on GitHub",
    sending: "Sending…",
    replaceNeedConfirm: "Tick the replacement confirmation to enable the button.",
    tokenNote:
      "Your GitHub token stays in an encrypted cookie — it is never written to the database.",
  },

  repos: {
    metaTitle: "My repositories",
    pageTitle: "My repositories",
    pageLead:
      "Browse your repositories before importing anything: tree, file preview, branch of your choice. Renaming, visibility and deletion are available from a repository's {actions} tab.",

    filterPlaceholder: "Filter by name, description or language…",
    filterAria: "Filter repositories",
    sortAria: "Sort",
    sortPushed: "Recent activity",
    sortName: "Name (A→Z)",
    sortSize: "Size",
    mine: "Mine",
    refresh: "Refresh",
    errorList: "List unavailable (HTTP {status}).",
    errorServer: "Cannot reach the server.",
    truncated:
      "Only the 300 most recent repositories are loaded. Narrow it down with the filter above.",
    loading: "Loading your repositories…",
    emptyFilter: "No repository matches this filter.",
    emptyToken: "No repository visible with this GitHub token.",
    countAll: "{count} repository(ies)",
    countFiltered: "{count} of {total}",
    countHint: "— click to browse the contents.",
    noDescription: "No description",
    pushedAgo: "pushed {when}",
    issues: "{count} issue(s)",
    readOnly: "read-only",

    backToList: "Back to the list",
    list: "List",
    badgePrivate: "private",
    badgePublic: "public",
    badgeArchived: "archived",
    badgeFork: "fork",
    badgeReadOnly: "read-only",
    branchProtected: "(protected)",
    downloadTitle: "Download {repo} as .{format}",
    downloadTitleRef: "Download {repo} ({ref}) as .{format}",
    actionsTab: "Actions",
    loadingRepo: "Loading the repository…",
    inaccessible: "Repository unreachable.",
    inaccessibleHttp: "Repository unreachable (HTTP {status}).",
    errorServerJoin: "Cannot reach the server.",
    copyDenied: "Copy blocked by the browser.",
    reloadFolder: "Reload this folder",
    root: "root",
    entries: "{count} entry(ies)",
    loadingShort: "Loading…",
    emptyRepo: "This repository has no files yet. Import an archive to fill it.",
    loadingFile: "Loading the file…",
    selectFile: "Select a file to preview it.",
    lines: "{count} lines",
    copy: "Copy",
    copied: "Copied",
    raw: "Raw",
    fileTooBig: "File too large to preview ({size}). Open it on GitHub.",
    fileBinary: "Binary file ({size}): no text preview.",

    actionsTitle: "Rename / describe",
    nameLabel: "Repository name",
    renameWarning:
      "Renaming breaks existing clones, links and GitHub pages. GitHub redirects the old name, but not forever.",
    descLabel: "Description",
    descPlaceholder: "What is this repository for?",
    save: "Save",
    writeInsufficient: "Insufficient write rights on this repository.",
    visibilityTitle: "Visibility",
    visibilityCurrently: "Currently {visibility}.",
    visibilityToPrivate: " Making it private removes access for all anonymous users.",
    visibilityToPublic: " Making it public exposes the whole commit history.",
    makePublic: "Make public",
    makePrivate: "Make private",
    dangerZone: "Danger zone",
    deleteWarning:
      "Deletion is permanent: code, history, issues and wiki.",
    deleteRepo: "Delete the repository",
    deleteTitle: "Delete {repo}",
    deleteConfirmBody:
      "No recovery is possible. Type {name} to unlock the button.",
    deleteForever: "Delete permanently",
    cancel: "Cancel",
    updated: "Repository updated.",
    deleted: "Repository {repo} deleted.",
    httpFailed: "Failed (HTTP {status}).",
  },

  api: {
    authRequired: "Authentication required.",
    jobNotFound: "Job not found.",
    jobNotReady: "This job is not ready yet.",
    jobNotPushable: "This job is not ready to be pushed.",
    invalidJson: "Invalid JSON body.",
    invalidMultipart: "Invalid request (multipart/form-data expected).",
    emptyBody: "Empty request body.",
    emptyArchive: "The archive is empty.",
    uploadFailed: "Could not receive the file. Try again.",
    repoNameRequired: "A repository name is required to create a new repository.",
    branchNameTooLong: "Branch name too long.",
    invalidOptions: "Invalid options.",
    invalidChange: "Invalid change.",
    noChange: "No change.",
    pathRequired: "“path” parameter required.",
  },
  errors: {
    encrypted:
      "This archive is password-protected, which is not supported yet.",
    tooManyFiles: "Too many files in the archive (limit reached).",
    tooBig:
      "The decompressed content exceeds the allowed size. Reduce the archive (node_modules?).",
    empty: "This archive contains no usable file.",
    corrupt: "Archive unreadable or corrupted. Check the file and try again.",
    unsupported:
      "Unsupported format (unknown compression method or archive variant).",
    volume:
      "Multi-volume RAR archives (.part1.rar, .part2.rar…) are not supported.",
    unsafePaths:
      "The archive contains dangerous file paths (traversal) and was rejected.",
    pathLimits:
      "A file path exceeds the allowed limits (depth or length).",
    timeout: "The extraction took too long and was interrupted.",
    rateLimited: "Too many requests. Wait a moment and try again.",
    notFound: "Resource not found.",
    forbidden:
      "You do not have write access to this repository (or the GitHub token lacks the right scope).",
    repoExists: "A repository with that name already exists on your account.",
    nameInvalid: "Invalid repository or branch name.",
    noChanges: "Nothing to push: the files already match the destination repository.",
    conflict:
      "The destination repository changed in the meantime. Try again, push to a dedicated branch, or rerun with “Replace all the code” to overwrite the branch with the archive's content.",
    scopeMissing:
      "GitHub refuses changes to workflow files (.github/workflows/…): the token lacks the “workflow” scope. Sign out and sign in again to grant it.",
    gitFailed: "The push to GitHub failed.",
    interrupted: "The processing was interrupted (server restart).",
    badPath: "Invalid file path.",
    confirmMismatch:
      "The confirmation does not match the repository name: nothing was deleted.",
    archiveTooBig: "This repository is too large to be downloaded as an archive.",
    internal: "Unexpected internal error. Try again in a moment.",
  },
};
