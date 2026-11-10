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
    jobTitle: "インポートの進行状況",
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
    checkFrench: "オープンなワークフロー",

    statFormats: "種類のアーカイブ形式",
    statFormatsSub: ".rar · .zip · .tar[.gz]",
    statCommands: "コマンドライン",
    statCommandsSub: "すべてクリックで完結",
    statDuration: "ドロップからプッシュまで",
    statDurationSub: "プレビュー込み",
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

    mockFile: "my-project.zip",
    mockFileMeta: "{size} · {count} ファイル",
    mockExcluded: "除外",
    mockPushed: "github.com/you/my-project にプッシュ · main ブランチ",

    demoEyebrow: "ログイン前に、その手触りを。",
    demoTitle: "アーカイブから GitHub リポジトリまで数秒。",
    demoTitleAccent: "ターミナル不要。",
    demoLead: "ドロップして、プレビューを確認して、プッシュ。コマンド不要、承認するまで何も送信されません。",
    demoStep1: "ローカルの ZIP",
    demoStep2: "展開を検証済み",
    demoStep3: "リポジトリ完成",
    demoFileMeta: "18.4 MB · 1,284 ファイル",
    demoScan: "パス検証済み",
    demoPushed: "プッシュ済み · たった今",
    demoBranches: "main",
    demoNoAccount: "アカウントもターミナルも不要。",
    demoLocalBadge: "ローカル",
    demoDropHint: "ここに .zip をドロップ",
    demoDropBrowse: "またはファイルを選択",
    demoDropCta: "アーカイブをインポート",
    demoDropTooLarge: "アーカイブが大きすぎます（上限 {max}）。",
    demoDropError: "対応しているのは .zip ファイルのみです。",
    demoReading: "アーカイブを読み込み中…",
    demoExtracting: "展開中…",
    demoReady: "プッシュの準備ができました",
    demoReadyMeta: "{count} 個のファイルを検出 · ブラウザーの外には出ていません",
    demoPushCta: "GitHub にプッシュ",
    demoLocalNote: "ファイルはブラウザー内に留まります — 何もアップロードされません。",
    demoConnectTitle: "ファイルの準備ができました！",
    demoConnectBody: "GitHub アカウントを連携してプッシュを完了しましょう。",
    demoConnectNote: "アーカイブはブラウザーの外に出ていません — GitHub セッションからプッシュされます。",
    demoConnectCta: "GitHub でログイン",
    demoConnectLater: "あとで",
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
    dropTitle: "ここにアーカイブをドラッグして GitHub にプッシュ",
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
    cancel: "キャンセル",
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

  job: {
    statusQueued: "待機中",
    statusExtracting: "展開中",
    statusReady: "プッシュの準備ができました",
    statusPushing: "プッシュ中…",
    statusDone: "完了",
    statusFailed: "失敗",
    extractingTitle: "展開しています…",
    extractingBody: "パスの検証・サイズ上限の適用・ルートフォルダーの検出を行っています。すべてサーバー側の隔離された領域で処理されます。",
    pushingTitle: "GitHub にプッシュしています…",
    pushingBody: "コミットを作成し、ファイルを送信しています。このタブを閉じておいても、問題があればお知らせします。",
    doneTitle: "プッシュされました！",
    doneFiles: "ブランチ {branch} に {count} 個のファイルをインポートしました",
    doneCommit: "コミット {sha}",
    doneCreated: "リポジトリを作成しました",
    doneOpenGithub: "GitHub で開く",
    doneCopyLink: "リンクをコピー",
    doneDownload: ".zip でダウンロード",
    doneImportAnother: "別のアーカイブをインポート",
  },

  notFound: {
    title: "ページが見つかりません",
    body: "このページは存在しません——またはジョブが期限切れです（アーカイブは一定時間後に削除されます）。",
    back: "ホームに戻る",
  },
};
