import type { Dict } from "../types";

export const ja: Dict = {
  meta: {
    title: "RepoDrop — .rar・.zip・.tar アーカイブを GitHub にインポート",
    description:
      ".rar、.zip、.tar、.tar.gz アーカイブをドロップして、ワンクリックで GitHub にコードをプッシュ。安全な展開、送信前のプレビュー、ターミナルも git も不要。",
    loginTitle: "GitHub でログイン",
    loginDescription:
      "GitHub アカウントを RepoDrop に接続すると、リポジトリを作成して .rar・.zip・.tar アーカイブをワンクリックでプッシュできます。トークンは暗号化され、データベースには保存されません。",
    importTitle: "アーカイブをインポート",
    importDescription:
      ".rar、.zip、.tar、.tar.gz アーカイブをアップロードしてファイルをプレビューし、GitHub リポジトリにプッシュします。",
  },

  nav: {
    howItWorks: "使い方",
    myRepos: "マイリポジトリ",
    importArchive: "アーカイブをインポート",
    importShort: "インポート",
    login: "ログイン",
    start: "はじめる",
    logout: "ログアウト",
    avatarAlt: "{login} のアバター",
    language: "言語",
    languageChange: "言語を変更",
    languageSearch: "言語を検索…",
    languageCurrent: "現在の言語: {name}",
  },

  home: {
    heroBadge: "新機能: .tar と .tar.gz",
    heroTitleLine1: "コードのアーカイブを、",
    heroTitleLine2: "ドラッグ＆ドロップで GitHub へ。",
    heroBody:
      "プロジェクトが .rar、.zip、.tar で届きましたか？GitHub を接続し、アーカイブをドロップし、リポジトリを選ぶ——もうプッシュ済みです。ターミナルもクローンも設定も不要。",
    ctaStart: "GitHub ではじめる",
    ctaImport: "アーカイブをインポート",
    ctaHow: "使い方",
    checkSandboxed: "サンドボックス展開",
    checkToken: "GitHub トークンは保存しません",
    checkFrench: "オープン：ソースコードは公開",

    statFormats: "種類のアーカイブ形式",
    statFormatsSub: ".rar · .zip · .tar[.gz]",
    statCommands: "コマンドライン",
    statCommandsSub: "すべてクリックで完結",
    statDuration: "ドロップからプッシュまで",
    statDurationSub: "プレビュー込み",
    statDurationValue: "2 分",
    statLanguages: "言語",
    statLanguagesSub: "インターフェースとメッセージ",

    stepsTitle: "使い方",
    stepsLead: "3 ステップ、2 分、コマンドは一切なし。",
    step1Title: "GitHub を接続",
    step1Body:
      "認可のクリックは 1 回だけ。必要なスコープだけを要求し、トークンはブラウザ内で暗号化されたままです。",
    step2Title: "アーカイブをドロップ",
    step2Body:
      ".rar、.zip、.tar をドラッグ。サンドボックス展開、パスの検証、送信前の完全なプレビュー。",
    step3Title: "ワンクリックでプッシュ",
    step3Body:
      "リポジトリを新規作成するか既存のものへプッシュ。コミットはあなたの GitHub アイデンティティで作成されます。",

    featuresTitle: "シンプルに",
    featuresTitleAccent: "そして安全に",
    featuresLead:
      "コードのインポートは簡単であるべき——サーバーをザルにすることなく。",
    feature1Title: "RAR・ZIP・TAR をネイティブ対応",
    feature1Body:
      ".rar（RAR4/RAR5）、.zip、.tar/.tar.gz はサーバー側で開きます——どこにもソフトをインストールする必要はありません。",
    feature2Title: "堅牢な展開",
    feature2Body:
      "zip-slip 対策、展開爆弾対策、埋め込まれた .git とシンボリックリンクは破棄。リポジトリは清潔なまま。",
    feature3Title: "プッシュ前のプレビュー",
    feature3Body:
      "ファイル、サイズ、ルートフォルダ、node_modules：何が出ていくかを正確に把握し、主導権を保てます。",
    feature4Title: "コマンドラインはゼロ",
    feature4Body:
      "クローン不要、git 認証情報不要、「git push -u origin」も不要。ツールがすべて代行します。",
    feature5Title: "新規でも既存でも",
    feature5Body:
      "非公開または公開リポジトリを作成するか、既存リポジトリへアーカイブを追加。必要なら専用ブランチに。",
    feature6Title: "AI 向けのリンク",
    feature6Body:
      "プッシュ後：Codespaces、vscode.dev、クローン URL、gh コマンド、.zip アーカイブ。コピー＆ペーストで完結。",

    formatsTitle: "どんなに古いアーカイブでも",
    formatsBody:
      "Windows の古い .rar、エクスポートの .zip、Linux サーバーの .tar.gz：すべてサーバー側でストリーミング読み込みされ、同じ防護網が適用されます。単一のルートフォルダは自動的に取り除かれ、node_modules は既定で除外されます。",

    securityTitle: "何を拒否し、なぜか",
    securityLead:
      "見知らぬ人のアーカイブを展開するのは危険なスポーツです。すべてのインポートの下に張られた網がこれです。",
    guard1Title: "Zip-slip とトラバーサル",
    guard1Body:
      "すべてのパスを検証（../、絶対パス、UNC、NUL）。一度でも該当すればアーカイブ全体を拒否します。",
    guard2Title: "展開爆弾",
    guard2Body:
      "宣言されたサイズを書き込み前に合算：最大 {extract} 展開、{files} ファイルまで。",
    guard3Title: "GitHub トークン",
    guard3Body:
      "暗号化された httpOnly Cookie（JWE A256GCM）、GIT_ASKPASS 経由でプッシュ。DB にもログにも残しません。",
    guard4Title: "クォータ",
    guard4Body:
      "IP あたり毎時 30 アップロード、ユーザーあたり毎時 10 プッシュ、永続カウンタ：サービスは健全に保たれます。",
    limitsNote:
      "既定の上限：{upload} アップロード、{extract} 展開、1 インポートあたり {files} ファイル。",

    faqTitle: "よくある質問",
    faqLead:
      "GitHub へのアーカイブのインポート、対応形式、アカウントのプライバシーについて。",

    ctaTitle: "次のアーカイブを GitHub に流し込みますか？",
    ctaLead: "ログインして、ドロップして、プッシュ。あとはこちらで。",

    mockFile: "my-project.tar",
    mockFileMeta: "{size} · {count} ファイル",
    mockExcluded: "除外",
    mockPushed: "github.com/you/my-project にプッシュ · main ブランチ",
  },

  faq: {
    q1: "Git を使わずに .rar や .zip アーカイブを GitHub に置くには？",
    a1: "RepoDrop で GitHub アカウントを接続し、.rar、.zip、.tar、.tar.gz ファイルをドラッグ＆ドロップし、展開されたファイルのプレビューを確認して、新規または既存のリポジトリを選びます。RepoDrop がコミットを作成し、あなたの GitHub アイデンティティで直接コードをプッシュします。ターミナルもコマンドラインも不要です。",
    q2: "対応しているアーカイブ形式とサイズは？",
    a2: "RepoDrop は .rar（RAR4 と RAR5）、.zip、.tar、.tar.gz、.tgz をネイティブ対応し、サーバー側でマジックバイトにより判別します。既定ではアーカイブは圧縮状態で {upload} まで（展開後 {extract}、{files} ファイル）。",
    q3: "GitHub トークンや非公開コードは保存されますか？",
    a3: "いいえ。GitHub OAuth トークンはブラウザ内の暗号化された httpOnly Cookie（JWE A256GCM）にのみ存在し、データベースにもログにも書かれません。展開されたファイルは隔離された一時領域に置かれ、プッシュ後に自動的に削除されます。",
    q4: "作業を上書きせずに既存の GitHub リポジトリへアーカイブを送れますか？",
    a4: "はい。新しいリポジトリ（公開・非公開）を作成するか、メインブランチを保つために既存リポジトリの専用ブランチへプッシュするか、確認付きの完全置換を明示的に選べます。",
    q5: "インポート時に単一のルートフォルダと node_modules はどうなりますか？",
    a5: "アーカイブが 1 つの包みフォルダ（例：my-project/）を含む場合、RepoDrop はそれを自動的に取り除き、ファイルをリポジトリ直下に置くことを提案します。node_modules、埋め込まれた .git フォルダ、不要なシステムファイル（.DS_Store、__MACOSX）は既定で破棄されます。",
  },

  login: {
    title: "RepoDrop にログイン",
    description: "リポジトリを作成しアーカイブをプッシュするため、GitHub へのアクセスを許可します。",
    continueWithGithub: "GitHub で続ける",
    scopesLead: "要求するスコープは",
    scopesAnd: "と",
    scopesTail:
      "のみです：あなたの名義でリポジトリを作成しコードをプッシュします（.github/workflows/ のファイルを含む）。トークンは httpOnly Cookie に暗号化され、データベースには保存されません。",
    bulletCookie: "暗号化された httpOnly Cookie（A256GCM）",
    bulletLogout: "ログアウト = ブラウザからトークンを削除",
    devMode: "開発モード",
    devLogin: "直接ログイン（サーバーの GH_TOKEN）",
    errorState: "ログインセッションが切れました。もう一度お試しください。",
    errorOauth: "GitHub が認可を拒否しました。最初からやり直してください。",
    errorConfig:
      "アプリが設定されていません：GITHUB_CLIENT_ID / GITHUB_CLIENT_SECRET を設定して再起動してください。",
    errorDevauth: "開発モード：サーバーの GH_TOKEN がないか無効です。",
    errorGeneric: "ログインエラー。",
  },

  importPage: {
    title: "アーカイブをインポート",
    lead: "コードを含む .rar、.zip、.tar（.tar.gz も可）をドロップしてください。GitHub へ何かを送る前に完全なプレビューが表示されます。",
    browseLead:
      "まずアカウントの中身を確認しますか？何も送信せずにリポジトリとその内容を閲覧できます。",
    browseCta: "マイリポジトリを見る",
    limitLabel: "上限:",
    limitBody: "アーカイブあたり {upload}、展開後 {extract}。",
    securityLabel: "セキュリティ:",
    securityBody: "パス検証、.git とリンクは破棄。",
    afterLabel: "その後:",
    afterBody: "プレビュー、リポジトリ選択、そしてプッシュ。",
  },

  uploader: {
    dropLabel: ".rar、.zip、.tar アーカイブをドロップ",
    uploading: "アーカイブを送信中… {progress}%",
    keepOpen: "このタブを閉じないでください。",
    dropHint: "アーカイブをここにドラッグするか、クリックして選択",
    formatsHint: ".rar、.zip、.tar、.tar.gz — 最大 {max}（展開後 {extract}）",
    errorFormat:
      "未対応の形式です：.rar、.zip、.tar、.tar.gz ファイルのみ受け付けます。",
    errorEmpty: "このファイルは空です。",
    errorTooLarge: "アーカイブが大きすぎます（最大 {max}）。",
    errorHttp: "送信に失敗しました（HTTP {status}）。もう一度お試しください。",
    errorNetwork: "送信中に接続が切れました。もう一度お試しください。",
  },

  footer: {
    tagline:
      "コードのアーカイブを、ドラッグ＆ドロップで GitHub へ。ターミナルもクローンも git 設定も不要。",
    productTitle: "プロダクト",
    home: "ホーム",
    importArchive: "アーカイブをインポート",
    howItWorks: "使い方",
    security: "セキュリティ",
    faq: "よくある質問",
    formatsTitle: "対応フォーマット",
    guaranteesTitle: "保証",
    guarantee1: "GitHub トークンは暗号化、データベースには保存しません",
    guarantee2: "サンドボックス展開、パス検証",
    guarantee3: "送信前の完全なプレビュー",
    copyright: "© {year} RepoDrop — あなたのアーカイブ、あなたの GitHub。",
    reserved: "関係者専用",
  },

  notFound: {
    title: "ページが見つかりません",
    body: "このページは存在しません——またはジョブが期限切れです（アーカイブは一定時間後に削除されます）。",
    back: "ホームに戻る",
  },
  jobs: {
    metaTitle: "インポートの状況",

    statusQueued: "待機中",
    statusExtracting: "展開中",
    statusReady: "プッシュ可能",
    statusPushing: "プッシュ中…",
    statusDone: "完了",
    statusFailed: "失敗",

    extractingTitle: "展開しています…",
    extractingBody:
      "パスとサイズの検証、ルートフォルダの検出を行います。すべてサーバー側の隔離された領域で処理されます。",
    pushingTitle: "GitHub にプッシュしています…",
    pushingBody:
      "コミットを作成してファイルを送信中です。このタブは開いたままで構いません。進み具合はこちらでお知らせします。",

    failedTitle: "処理に失敗しました",
    failedUnknown: "不明なエラー。",
    lostConnection: "接続が切れました。もう一度お試しください。",
    httpFailed: "失敗 (HTTP {status})。",
    repoMoved:
      "リポジトリ {repo} はインポート後に更新されています。このアーカイブの内容そのものでブランチを上書きできます。アーカイブにないファイルはリポジトリから削除され、プッシュは強制実行されます。既存の履歴は保持されます（その上に新しいコミット）。",
    repoMovedConfirm:
      "このリポジトリのコードをすべてこのアーカイブで置き換えてよいですか？",
    replaceAllYes: "はい、すべてのコードを置き換える",
    replaceAllRetry: "すべてのコードを置き換えて再試行",
    cancel: "キャンセル",
    retryOtherArchive: "別のアーカイブで再試行",
    backHome: "ホームに戻る",

    doneTitle: "プッシュしました！",
    doneBody: "{count} 件をブランチにインポートしました:",
    doneCommit: "コミット",
    doneCreated: "・リポジトリを作成しました",
    openOnGithub: "GitHub で開く",
    copyLink: "リンクをコピー",
    downloadZip: ".zip でダウンロード",
    aiLinksTitle: "AI にそのまま渡せるリンク:",
    anotherImport: "別のアーカイブをインポート",

    linkRepo: "GitHub リポジトリ",
    linkBranch: "ブランチ「{branch}」",
    linkBranchSub: "このブランチにプッシュしてください",
    linkCommit: "特定のコミット",
    linkCodespaces: "Codespaces（GitHub の AI エージェント）",
    linkCodespacesSub: "vscode.dev がすぐ使える状態、Copilot 接続済み",
    linkVscode: "vscode.dev（公式 Web エディタ）",
    linkVscodeSub: "Copilot + 編集 + 実行（Codespaces）",
    linkClone: "クローン URL（外部エージェント）",
    linkCloneSub: "エージェントは自身の GitHub セッションで認証します",
    linkGh: "`gh` CLI コマンド",

    previewTitle: "アーカイブのプレビュー",
    previewLead: "安全フィルター適用後にプッシュされる内容です。",
    previewFiles: "ファイル数",
    previewSize: "展開後のサイズ",
    previewIgnored: "除外:",
    ignoredGit: ".git（{count}）",
    ignoredSystemFiles: "システムファイル（{count}）",
    ignoredSymlinks: "シンボリックリンク（{count}）",
    ignoredHardlinks: "ハードリンク（{count}）",
    ignoredBlocked: "ブロックされたパス（{count}）",
    tooLargeForGithub:
      "{count} 件のファイルが 100 MB を超えています。GitHub はおそらく拒否します。例:",

    filtersTitle: "インポートフィルター",
    filtersNone: "このアーカイブに使えるフィルターはありません。",
    stripRootLabel: "ルートフォルダを取り除く",
    stripRootHint:
      "推奨: プロジェクトの内容がリポジトリ直下に置かれます。",
    includeNodeModules: "含める",
    includeNodeModulesHint:
      "既定ではオフ: 重く、リポジトリではほとんど不要です。",

    destTitle: "宛先",
    destLead: "これらのファイルをどこにプッシュしますか？",
    destNew: "新しいリポジトリ",
    destExisting: "既存のリポジトリ",
    repoNameLabel: "リポジトリ名",
    repoNamePlaceholder: "my-project",
    repoNameInvalid:
      "英数字、ピリオド、ハイフン、アンダースコアのみ（英数字で始める必要があります）。",
    visibilityLabel: "公開範囲",
    visibilityPrivate: "非公開",
    visibilityPrivateHint: "自分のみ閲覧可能",
    visibilityPublic: "公開",
    visibilityPublicHint: "誰でも閲覧可能",
    searchRepo: "リポジトリを検索…",
    loadingRepos: "リポジトリを読み込み中…",
    reposLoadError: "リポジトリを読み込めませんでした。",
    noWritableRepo:
      "書き込み権限のあるリポジトリがありません。新しく作成しましょう！",
    noRepoMatch: "検索に一致するリポジトリはありません。",
    dedicatedBranch: "専用ブランチを作成",
    dedicatedHintExisting:
      "既定のブランチに触れない: 共有リポジトリに最適です。",
    dedicatedHintNew:
      "新しいリポジトリの最初のブランチ名（未指定なら既定のブランチ）。",
    replaceAll: "リポジトリのコードをすべて置き換える",
    replaceAllHint:
      "リポジトリの内容はアーカイブのファイルだけになります。含まれないファイルは削除され、プッシュは強制実行されるため、途中でリポジトリが更新されていても成功します（「fetch first」エラーは発生しません）。アーカイブがプロジェクトの完全な新版である場合に使います。",
    replaceConfirm:
      "確認します: リポジトリ {repo} のうち、このアーカイブにないファイルはプッシュ先のブランチから完全に削除されます。",
    replaceConfirmNoRepo:
      "確認します: リポジトリのうち、このアーカイブにないファイルはプッシュ先のブランチから完全に削除されます。",
    advanced: "詳細オプション",
    commitMessage: "コミットメッセージ",
    commitPlaceholder: "RepoDrop による {filename} のインポート",
    pushAction: "GitHub にプッシュ",
    replacePushAction: "GitHub 上のコードをすべて置き換える",
    sending: "送信中…",
    replaceNeedConfirm:
      "置き換えの確認にチェックを入れるとボタンが有効になります。",
    tokenNote:
      "GitHub トークンは暗号化された Cookie に保存され、データベースには決して書き込まれません。",
  },

  repos: {
    metaTitle: "マイリポジトリ",
    pageTitle: "マイリポジトリ",
    pageLead:
      "インポートする前にリポジトリを確認できます。ツリー、ファイルのプレビュー、任意のブランチ。名前の変更・公開範囲・削除は、リポジトリの {actions} タブにあります。",

    filterPlaceholder: "名前・説明・言語で絞り込む…",
    filterAria: "リポジトリを絞り込む",
    sortAria: "並べ替え",
    sortPushed: "最近のアクティビティ",
    sortName: "名前（A→Z）",
    sortSize: "サイズ",
    mine: "自分のもの",
    refresh: "更新",
    errorList: "一覧を取得できません (HTTP {status})。",
    errorServer: "サーバーに接続できません。",
    truncated:
      "最新 300 件のリポジトリのみ読み込まれています。上のフィルターで絞り込んでください。",
    loading: "リポジトリを読み込み中…",
    emptyFilter: "このフィルターに一致するリポジトリはありません。",
    emptyToken: "この GitHub トークンで表示できるリポジトリはありません。",
    countAll: "{count} 件のリポジトリ",
    countFiltered: "{total} 件中 {count} 件",
    countHint: "— クリックすると内容を閲覧できます。",
    noDescription: "説明なし",
    pushedAgo: "{when}にプッシュ",
    issues: "{count} 件の issue",
    readOnly: "読み取り専用",

    backToList: "一覧に戻る",
    list: "一覧",
    badgePrivate: "非公開",
    badgePublic: "公開",
    badgeArchived: "アーカイブ済み",
    badgeFork: "fork",
    badgeReadOnly: "読み取り専用",
    branchProtected: "（保護）",
    downloadTitle: "{repo} を .{format} でダウンロード",
    downloadTitleRef: "{repo}（{ref}）を .{format} でダウンロード",
    actionsTab: "操作",
    loadingRepo: "リポジトリを読み込み中…",
    inaccessible: "リポジトリにアクセスできません。",
    inaccessibleHttp: "リポジトリにアクセスできません (HTTP {status})。",
    errorServerJoin: "サーバーに接続できません。",
    copyDenied: "ブラウザがコピーを拒否しました。",
    reloadFolder: "このフォルダを再読み込み",
    root: "ルート",
    entries: "{count} 件",
    loadingShort: "読み込み中…",
    emptyRepo:
      "このリポジトリにはまだファイルがありません。アーカイブをインポートして埋めましょう。",
    loadingFile: "ファイルを読み込み中…",
    selectFile: "ファイルを選ぶとプレビューします。",
    lines: "{count} 行",
    copy: "コピー",
    copied: "コピーしました",
    raw: "生データ",
    fileTooBig:
      "ファイルが大きすぎてプレビューできません（{size}）。GitHub で開いてください。",
    fileBinary: "バイナリファイル（{size}）: テキストのプレビューはありません。",

    actionsTitle: "名前の変更 / 説明",
    nameLabel: "リポジトリ名",
    renameWarning:
      "名前を変えると既存のクローン、リンク、GitHub ページが壊れます。GitHub は旧名をリダイレクトしますが、永久ではありません。",
    descLabel: "説明",
    descPlaceholder: "このリポジトリは何のため？",
    save: "保存",
    writeInsufficient: "このリポジトリへの書き込み権限が不足しています。",
    visibilityTitle: "公開範囲",
    visibilityCurrently: "現在は{visibility}です。",
    visibilityToPrivate:
      " 非公開にすると、匿名ユーザーはすべてアクセスできなくなります。",
    visibilityToPublic:
      " 公開にすると、コミット履歴がすべて見えるようになります。",
    makePublic: "公開にする",
    makePrivate: "非公開にする",
    dangerZone: "危険な操作",
    deleteWarning:
      "削除は取り消せません: コード、履歴、issue、wiki。",
    deleteRepo: "リポジトリを削除",
    deleteTitle: "{repo} を削除",
    deleteConfirmBody:
      "復元はできません。ボタンを有効にするには {name} と入力してください。",
    deleteForever: "完全に削除",
    cancel: "キャンセル",
    updated: "リポジトリを更新しました。",
    deleted: "リポジトリ {repo} を削除しました。",
    httpFailed: "失敗 (HTTP {status})。",
  },

  api: {
    authRequired: "認証が必要です。",
    jobNotFound: "ジョブが見つかりません。",
    jobNotReady: "このジョブはまだ準備できていません。",
    jobNotPushable: "このジョブはプッシュできる状態ではありません。",
    invalidJson: "JSON 本文が不正です。",
    invalidMultipart: "不正なリクエストです（multipart/form-data が必要）。",
    emptyBody: "リクエスト本文が空です。",
    emptyArchive: "アーカイブが空です。",
    uploadFailed: "ファイルを受信できませんでした。もう一度お試しください。",
    repoNameRequired: "新しいリポジトリを作成するには名前が必要です。",
    branchNameTooLong: "ブランチ名が長すぎます。",
    invalidOptions: "オプションが不正です。",
    invalidChange: "変更内容が不正です。",
    noChange: "変更はありません。",
    pathRequired: "「path」パラメータが必要です。",
  },
  errors: {
    encrypted: "このアーカイブはパスワードで保護されています。まだ対応していません。",
    tooManyFiles: "アーカイブ内のファイルが多すぎます（上限に達しました）。",
    tooBig:
      "展開後の内容が許容サイズを超えています。アーカイブを小さくしてください（node_modules？）。",
    empty: "このアーカイブには使えるファイルがありません。",
    corrupt: "アーカイブが読めないか壊れています。ファイルを確認して再試行してください。",
    unsupported: "未対応の形式です（不明な圧縮方式またはアーカイブの種類）。",
    volume: "分割 RAR アーカイブ（.part1.rar、.part2.rar…）は未対応です。",
    unsafePaths: "アーカイブに危険なパス（トラバーサル）が含まれていたため拒否しました。",
    pathLimits: "ファイルパスが許容範囲（深さまたは長さ）を超えています。",
    timeout: "展開に時間がかかりすぎたため中断しました。",
    rateLimited: "リクエストが多すぎます。少し待ってから再試行してください。",
    notFound: "リソースが見つかりません。",
    forbidden:
      "このリポジトリへの書き込み権限がありません（または GitHub トークンに必要なスコープがありません）。",
    repoExists: "同じ名前のリポジトリがすでにあなたのアカウントにあります。",
    nameInvalid: "リポジトリ名またはブランチ名が不正です。",
    noChanges: "プッシュするものがありません。ファイルはすでに宛先リポジトリと一致しています。",
    conflict:
      "宛先リポジトリがその間に変更されました。再試行するか、専用ブランチにプッシュするか、「すべてのコードを置き換える」でアーカイブの内容によりブランチを上書きしてください。",
    scopeMissing:
      "GitHub は workflow ファイル（.github/workflows/…）の変更を拒否しました。トークンに「workflow」スコープがありません。サインアウトして再度サインインし、権限を付与してください。",
    gitFailed: "GitHub へのプッシュに失敗しました。",
    interrupted: "処理が中断されました（サーバーの再起動）。",
    badPath: "ファイルパスが不正です。",
    confirmMismatch: "確認内容がリポジトリ名と一致しません。何も削除されていません。",
    archiveTooBig: "このリポジトリは大きすぎて、1 つのアーカイブとしてダウンロードできません。",
    internal: "予期しない内部エラーです。しばらくしてから再試行してください。",
  },
};
