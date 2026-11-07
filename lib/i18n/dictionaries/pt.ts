import type { Dict } from "../types";

export const pt: Dict = {
  meta: {
    title: "RepoDrop — Importe os seus arquivos .rar, .zip e .tar para o GitHub",
    description:
      "Arraste um arquivo .rar, .zip, .tar ou .tar.gz e envie o seu código para o GitHub com um clique. Extração segura, pré-visualização antes do envio, sem terminal nem git.",
    loginTitle: "Início de sessão com GitHub",
    loginDescription:
      "Ligue a sua conta GitHub ao RepoDrop para criar um repositório e enviar os seus arquivos .rar, .zip ou .tar com um clique. Token cifrado, nunca guardado na base de dados.",
    importTitle: "Importar um arquivo",
    importDescription:
      "Carregue um arquivo .rar, .zip, .tar ou .tar.gz para pré-visualizar os ficheiros e enviá-lo para um repositório GitHub.",
  },

  nav: {
    howItWorks: "Como funciona",
    myRepos: "Os meus repositórios",
    importArchive: "Importar um arquivo",
    importShort: "Importar",
    login: "Entrar",
    start: "Começar",
    logout: "Sair",
    avatarAlt: "Avatar de {login}",
    language: "Idioma",
    languageChange: "Mudar de idioma",
    languageSearch: "Procurar um idioma…",
    languageCurrent: "Idioma atual: {name}",
  },

  home: {
    heroBadge: "Novo: .tar e .tar.gz",
    heroTitleLine1: "Os seus arquivos de código,",
    heroTitleLine2: "no GitHub com arrastar e largar.",
    heroBody:
      "Recebeu um .rar, um .zip ou um .tar de um projeto? Ligue o GitHub, largue o arquivo, escolha o repositório — está enviado. Sem terminal, sem clone, sem configuração.",
    ctaStart: "Começar com GitHub",
    ctaImport: "Importar um arquivo",
    ctaHow: "Como funciona",
    checkSandboxed: "Extração em sandbox",
    checkToken: "Token GitHub nunca guardado",
    checkFrench: "Aberto: o código é público",

    statFormats: "formatos de arquivo",
    statFormatsSub: ".rar · .zip · .tar[.gz]",
    statCommands: "linha de comandos",
    statCommandsSub: "tudo com um clique",
    statDuration: "do envio ao push",
    statDurationSub: "pré-visualização incluída",
    statDurationValue: "2 min",
    statLanguages: "idiomas",
    statLanguagesSub: "interface e mensagens",

    stepsTitle: "Como funciona?",
    stepsLead: "Três passos, dois minutos, nenhum comando.",
    step1Title: "Ligue o GitHub",
    step1Body:
      "Um único clique de autorização. Pedimos apenas os scopes necessários — o seu token fica cifrado no navegador.",
    step2Title: "Largue o arquivo",
    step2Body:
      "Arraste o seu .rar, .zip ou .tar. Extração em sandbox, caminhos verificados, pré-visualização completa antes do envio.",
    step3Title: "Envie com um clique",
    step3Body:
      "Crie um repositório ou envie para um existente. O commit é criado com a sua identidade GitHub.",

    featuresTitle: "Feito para ser simples",
    featuresTitleAccent: "e seguro",
    featuresLead:
      "Importar código deve ser fácil — sem transformar o servidor num passador.",
    feature1Title: "RAR, ZIP e TAR nativos",
    feature1Body:
      "Os .rar (RAR4/RAR5), .zip e .tar/.tar.gz abrem no servidor — nada para instalar, em lado nenhum.",
    feature2Title: "Extração blindada",
    feature2Body:
      "Anti zip-slip, anti bombas de descompressão, .git embutidos e links simbólicos descartados. Os seus repositórios ficam limpos.",
    feature3Title: "Pré-visualização antes do push",
    feature3Body:
      "Ficheiros, tamanhos, pasta raiz, node_modules: vê exatamente o que sai e mantém o controlo.",
    feature4Title: "Zero linha de comandos",
    feature4Body:
      "Sem clone, sem credenciais git, sem «git push -u origin». A ferramenta faz tudo por si.",
    feature5Title: "Repositório novo ou existente",
    feature5Body:
      "Crie um repositório privado ou público, ou junte o arquivo a um existente — num branch dedicado, se preferir.",
    feature6Title: "Ligações prontas para IA",
    feature6Body:
      "Depois do push: Codespaces, vscode.dev, URL de clone, comando gh e arquivo .zip. Basta copiar e colar.",

    formatsTitle: "Qualquer arquivo, independentemente da idade",
    formatsBody:
      "Os velhos .rar do Windows, os .zip de uma exportação, os .tar.gz de um servidor Linux: tudo é lido no servidor, em streaming, com as mesmas proteções. A pasta raiz única é removida automaticamente e node_modules é excluído por predefinição.",

    securityTitle: "O que recusamos, e porquê",
    securityLead:
      "Descomprimir o arquivo de um desconhecido é um desporto de risco. Eis as redes esticadas sob cada importação.",
    guard1Title: "Zip-slip e traversal",
    guard1Body:
      "Cada caminho é validado (../, absolutos, UNC, NUL). Uma única tentativa e o arquivo inteiro é recusado.",
    guard2Title: "Bombas de descompressão",
    guard2Body:
      "Os tamanhos declarados são somados antes da escrita: no máximo {extract} descomprimidos e {files} ficheiros.",
    guard3Title: "Token GitHub",
    guard3Body:
      "Cookie httpOnly cifrado (JWE A256GCM), push via GIT_ASKPASS. Nunca na base de dados, nunca nos logs.",
    guard4Title: "Quotas",
    guard4Body:
      "30 uploads/h por IP e 10 push/h por utilizador, contadores persistentes: o serviço mantém-se saudável.",
    limitsNote:
      "Limites predefinidos: {upload} carregados, {extract} descomprimidos, {files} ficheiros por importação.",

    faqTitle: "Perguntas frequentes",
    faqLead:
      "Tudo sobre a importação de arquivos para o GitHub, os formatos aceites e a privacidade da sua conta.",

    ctaTitle: "Pronto para vazar o seu próximo arquivo no GitHub?",
    ctaLead: "Entre, largue, envie. Nós tratamos do resto.",

    mockFile: "meu-projeto.tar",
    mockFileMeta: "{size} · {count} ficheiros",
    mockExcluded: "excluído",
    mockPushed: "Enviado para github.com/voce/meu-projeto · branch main",
  },

  faq: {
    q1: "Como colocar um arquivo .rar ou .zip no GitHub sem usar Git?",
    a1: "Ligue a sua conta GitHub no RepoDrop, arraste o seu ficheiro .rar, .zip, .tar ou .tar.gz, verifique a pré-visualização dos ficheiros extraídos e escolha um repositório novo ou existente. O RepoDrop cria o commit e envia o código diretamente com a sua identidade GitHub, sem terminal nem linha de comandos.",
    q2: "Que formatos de arquivo e tamanhos são suportados?",
    a2: "O RepoDrop suporta nativamente arquivos .rar (RAR4 e RAR5), .zip, .tar, .tar.gz e .tgz, detetados pelos seus magic bytes no servidor. Por predefinição, um arquivo pode pesar até {upload} comprimidos ({extract} descomprimidos e {files} ficheiros).",
    q3: "O meu token GitHub e o código privado são guardados?",
    a3: "Não. O seu token OAuth GitHub vive apenas num cookie httpOnly cifrado (JWE A256GCM) no seu navegador: nunca é escrito na base de dados nem nos registos. Os ficheiros extraídos ficam num espaço temporário isolado e são eliminados automaticamente após o push.",
    q4: "Posso enviar um arquivo para um repositório GitHub existente sem sobrescrever o meu trabalho?",
    a4: "Sim. Pode criar um repositório novo (público ou privado), enviar para um branch dedicado de um repositório existente para preservar o branch principal, ou escolher explicitamente a opção de substituição total com confirmação.",
    q5: "O que acontece à pasta raiz única e a node_modules durante a importação?",
    a5: "Quando o arquivo contém uma única pasta envolvente (por exemplo meu-projeto/), o RepoDrop propõe removê-la automaticamente para colocar os seus ficheiros diretamente na raiz do repositório. node_modules, pastas .git embutidas e ficheiros de sistema inúteis (.DS_Store, __MACOSX) são descartados por predefinição.",
  },

  login: {
    title: "Entrar no RepoDrop",
    description:
      "Autorize o acesso ao GitHub para criar repositórios e enviar os seus arquivos.",
    continueWithGithub: "Continuar com GitHub",
    scopesLead: "Pedimos apenas os scopes",
    scopesAnd: "e",
    scopesTail:
      ": criar repositórios e enviar código em seu nome (incluindo os seus ficheiros .github/workflows/). O seu token é cifrado num cookie httpOnly, nunca guardado na base de dados.",
    bulletCookie: "Cookie httpOnly cifrado (A256GCM)",
    bulletLogout: "Sair = token apagado do navegador",
    devMode: "Modo desenvolvimento",
    devLogin: "Início de sessão direto (GH_TOKEN do servidor)",
    errorState: "A sessão expirou. Tente novamente.",
    errorOauth: "O GitHub recusou a autorização. Comece de novo.",
    errorConfig:
      "A aplicação não está configurada: defina GITHUB_CLIENT_ID / GITHUB_CLIENT_SECRET e reinicie.",
    errorDevauth: "Modo dev: o GH_TOKEN do servidor falta ou é inválido.",
    errorGeneric: "Erro de início de sessão.",
  },

  importPage: {
    title: "Importar um arquivo",
    lead: "Largue um ficheiro .rar, .zip ou .tar (também .tar.gz) com o seu código. Verá uma pré-visualização completa antes de qualquer envio para o GitHub.",
    browseLead:
      "Quer primeiro ver o que já existe na sua conta? Explore os seus repositórios e o seu conteúdo, sem enviar nada.",
    browseCta: "Explorar os meus repositórios",
    limitLabel: "Limite:",
    limitBody: "{upload} por arquivo, {extract} descomprimidos.",
    securityLabel: "Segurança:",
    securityBody: "caminhos verificados, .git e links descartados.",
    afterLabel: "Depois:",
    afterBody: "pré-visualização, escolha do repositório e push.",
  },

  uploader: {
    dropLabel: "Largar um arquivo .rar, .zip ou .tar",
    uploading: "A enviar o arquivo… {progress}%",
    keepOpen: "Não feche este separador.",
    dropHint: "Arraste o seu arquivo para aqui ou clique para procurar",
    formatsHint: ".rar, .zip, .tar e .tar.gz — máx. {max} ({extract} descomprimidos)",
    errorFormat:
      "Formato não suportado: apenas ficheiros .rar, .zip, .tar e .tar.gz são aceites.",
    errorEmpty: "Este ficheiro está vazio.",
    errorTooLarge: "Arquivo demasiado grande (máx. {max}).",
    errorHttp: "Falha no envio (HTTP {status}). Tente novamente.",
    errorNetwork: "Ligação perdida durante o envio. Tente novamente.",
  },

  footer: {
    tagline:
      "Os seus arquivos de código, no GitHub, com arrastar e largar. Sem terminal, sem clone, sem configuração git.",
    productTitle: "Produto",
    home: "Início",
    importArchive: "Importar um arquivo",
    howItWorks: "Como funciona",
    security: "Segurança",
    faq: "Perguntas frequentes",
    formatsTitle: "Formatos suportados",
    guaranteesTitle: "Garantias",
    guarantee1: "Token GitHub cifrado, nunca guardado na base de dados",
    guarantee2: "Extração em sandbox, caminhos verificados",
    guarantee3: "Pré-visualização completa antes de qualquer envio",
    copyright: "© {year} RepoDrop — os seus arquivos, o seu GitHub.",
    reserved: "Área reservada",
  },

  notFound: {
    title: "Página não encontrada",
    body: "Esta página não existe — ou o job expirou (os arquivos são eliminados após algum tempo).",
    back: "Voltar ao início",
  },
  jobs: {
    metaTitle: "Acompanhar a importação",

    statusQueued: "Em fila",
    statusExtracting: "A extrair",
    statusReady: "Pronto a enviar",
    statusPushing: "A enviar…",
    statusDone: "Concluído",
    statusFailed: "Falhou",

    extractingTitle: "Extração em curso…",
    extractingBody:
      "Verificação dos caminhos e dos tamanhos, deteção da pasta raiz. Tudo acontece no servidor, num espaço isolado.",
    pushingTitle: "A enviar para o GitHub…",
    pushingBody:
      "Criação do commit e envio dos ficheiros. Pode deixar este separador aberto: vamos mantê-lo informado.",

    failedTitle: "A operação falhou",
    failedUnknown: "Erro desconhecido.",
    lostConnection: "Ligação perdida. Tente novamente.",
    httpFailed: "Falhou (HTTP {status}).",
    repoMoved:
      "O repositório {repo} avançou desde a sua importação. Pode substituir o seu ramo pelo conteúdo exato deste arquivo: os ficheiros ausentes do arquivo serão apagados do repositório e o push será forçado. O histórico existente é mantido (novo commit por cima).",
    repoMovedConfirm:
      "Confirma a substituição completa do código deste repositório por este arquivo?",
    replaceAllYes: "Sim, substituir todo o código",
    replaceAllRetry: "Tentar novamente substituindo todo o código",
    cancel: "Cancelar",
    retryOtherArchive: "Tentar novamente com outro arquivo",
    backHome: "Voltar ao início",

    doneTitle: "Enviado!",
    doneBody: "{count} importados no ramo",
    doneCommit: "commit",
    doneCreated: "· repositório criado",
    openOnGithub: "Abrir no GitHub",
    copyLink: "Copiar a ligação",
    downloadZip: "Transferir em .zip",
    aiLinksTitle: "Ligações prontas a dar a uma IA:",
    anotherImport: "Importar outro arquivo",

    linkRepo: "Repositório GitHub",
    linkBranch: "Ramo «{branch}»",
    linkBranchSub: "Envie para este ramo",
    linkCommit: "Commit exato",
    linkCodespaces: "Codespaces (agente de IA do GitHub)",
    linkCodespacesSub: "vscode.dev pronto a usar, Copilot ligado",
    linkVscode: "vscode.dev (editor web oficial)",
    linkVscodeSub: "Copilot + edição + execução (Codespaces)",
    linkClone: "URL de clone (agente externo)",
    linkCloneSub: "O agente autentica-se com a sua própria sessão GitHub",
    linkGh: "Comando CLI `gh`",

    previewTitle: "Pré-visualização do arquivo",
    previewLead: "O que será enviado, depois dos filtros de segurança.",
    previewFiles: "Ficheiros",
    previewSize: "Tamanho descomprimido",
    previewIgnored: "Ignorados:",
    ignoredGit: ".git ({count})",
    ignoredSystemFiles: "ficheiros de sistema ({count})",
    ignoredSymlinks: "ligações simbólicas ({count})",
    ignoredHardlinks: "hard links ({count})",
    ignoredBlocked: "caminhos bloqueados ({count})",
    tooLargeForGithub:
      "{count} ficheiro(s) excedem 100 MB: o GitHub provavelmente recusá-los-á. Ex.:",

    filtersTitle: "Filtros de importação",
    filtersNone: "Nenhum filtro disponível para este arquivo.",
    stripRootLabel: "Remover a pasta raiz",
    stripRootHint:
      "Recomendado: o conteúdo do projeto ficaria na raiz do repositório.",
    includeNodeModules: "Incluir",
    includeNodeModulesHint:
      "Desmarcado por predefinição: pesado e raramente útil num repositório.",

    destTitle: "Destino",
    destLead: "Para onde enviar estes ficheiros?",
    destNew: "Novo repositório",
    destExisting: "Repositório existente",
    repoNameLabel: "Nome do repositório",
    repoNamePlaceholder: "meu-projeto",
    repoNameInvalid:
      "Apenas letras, dígitos, pontos, hífenes e underscores (tem de começar por uma letra ou um dígito).",
    visibilityLabel: "Visibilidade",
    visibilityPrivate: "Privado",
    visibilityPrivateHint: "Visível apenas para si",
    visibilityPublic: "Público",
    visibilityPublicHint: "Visível para todos",
    searchRepo: "Procurar um repositório…",
    loadingRepos: "A carregar os seus repositórios…",
    reposLoadError: "Não foi possível carregar os seus repositórios.",
    noWritableRepo:
      "Nenhum repositório acessível com permissões de escrita. Crie um novo!",
    noRepoMatch: "Nenhum repositório corresponde à procura.",
    dedicatedBranch: "Criar um ramo dedicado",
    dedicatedHintExisting:
      "Não tocar no ramo predefinido: ideal para um repositório partilhado.",
    dedicatedHintNew:
      "Nome do ramo inicial do novo repositório (caso contrário, o ramo predefinido).",
    replaceAll: "Substituir todo o código do repositório",
    replaceAllHint:
      "O repositório passará a conter exatamente os ficheiros do arquivo: os que faltarem serão apagados e o push será forçado — vai funcionar mesmo que o repositório tenha mudado entretanto (fim do erro «fetch first»). A usar quando o arquivo é a nova versão completa do projeto.",
    replaceConfirm:
      "Confirmo: os ficheiros do repositório {repo} ausentes deste arquivo serão definitivamente apagados do ramo enviado.",
    replaceConfirmNoRepo:
      "Confirmo: os ficheiros do repositório ausentes deste arquivo serão definitivamente apagados do ramo enviado.",
    advanced: "Opções avançadas",
    commitMessage: "Mensagem de commit",
    commitPlaceholder: "Importação de {filename} via RepoDrop",
    pushAction: "Enviar para o GitHub",
    replacePushAction: "Substituir todo o código no GitHub",
    sending: "A enviar…",
    replaceNeedConfirm:
      "Assinale a confirmação da substituição para ativar o botão.",
    tokenNote:
      "O seu token GitHub fica num cookie cifrado — nunca é escrito na base de dados.",
  },

  repos: {
    metaTitle: "Os meus repositórios",
    pageTitle: "Os meus repositórios",
    pageLead:
      "Explore os seus repositórios antes de importar seja o que for: árvore, pré-visualização de ficheiros, ramo à sua escolha. Renomear, visibilidade e eliminação estão no separador {actions} de um repositório.",

    filterPlaceholder: "Filtrar por nome, descrição ou linguagem…",
    filterAria: "Filtrar os repositórios",
    sortAria: "Ordenar",
    sortPushed: "Atividade recente",
    sortName: "Nome (A→Z)",
    sortSize: "Tamanho",
    mine: "Os meus",
    refresh: "Atualizar",
    errorList: "Lista indisponível (HTTP {status}).",
    errorServer: "Não é possível contactar o servidor.",
    truncated:
      "Apenas os 300 repositórios mais recentes estão carregados. Refine com o filtro acima.",
    loading: "A carregar os seus repositórios…",
    emptyFilter: "Nenhum repositório corresponde a este filtro.",
    emptyToken: "Nenhum repositório visível com este token GitHub.",
    countAll: "{count} repositório(s)",
    countFiltered: "{count} de {total}",
    countHint: "— clique para explorar o conteúdo.",
    noDescription: "Sem descrição",
    pushedAgo: "enviado {when}",
    issues: "{count} issue(s)",
    readOnly: "só leitura",

    backToList: "Voltar à lista",
    list: "Lista",
    badgePrivate: "privado",
    badgePublic: "público",
    badgeArchived: "arquivado",
    badgeFork: "fork",
    badgeReadOnly: "só leitura",
    branchProtected: "(protegido)",
    downloadTitle: "Transferir {repo} em .{format}",
    downloadTitleRef: "Transferir {repo} ({ref}) em .{format}",
    actionsTab: "Ações",
    loadingRepo: "A carregar o repositório…",
    inaccessible: "Repositório inacessível.",
    inaccessibleHttp: "Repositório inacessível (HTTP {status}).",
    errorServerJoin: "Não é possível contactar o servidor.",
    copyDenied: "Cópia recusada pelo navegador.",
    reloadFolder: "Recarregar esta pasta",
    root: "raiz",
    entries: "{count} entrada(s)",
    loadingShort: "A carregar…",
    emptyRepo:
      "Este repositório ainda não contém ficheiros. Importe um arquivo para o preencher.",
    loadingFile: "A carregar o ficheiro…",
    selectFile: "Selecione um ficheiro para o pré-visualizar.",
    lines: "{count} linhas",
    copy: "Copiar",
    copied: "Copiado",
    raw: "Em bruto",
    fileTooBig:
      "Ficheiro demasiado grande para a pré-visualização ({size}). Abra-o no GitHub.",
    fileBinary: "Ficheiro binário ({size}): sem pré-visualização de texto.",

    actionsTitle: "Renomear / descrever",
    nameLabel: "Nome do repositório",
    renameWarning:
      "Renomear quebra os clones, as ligações e as páginas GitHub existentes. O GitHub redireciona o nome antigo, mas não para sempre.",
    descLabel: "Descrição",
    descPlaceholder: "Para que serve este repositório?",
    save: "Guardar",
    writeInsufficient: "Permissões de escrita insuficientes neste repositório.",
    visibilityTitle: "Visibilidade",
    visibilityCurrently: "Atualmente {visibility}.",
    visibilityToPrivate:
      " Torná-lo privado retira o acesso a todos os anónimos.",
    visibilityToPublic:
      " Torná-lo público expõe todo o histórico de commits.",
    makePublic: "Tornar público",
    makePrivate: "Tornar privado",
    dangerZone: "Zona sensível",
    deleteWarning:
      "A eliminação é definitiva: código, histórico, issues e wiki.",
    deleteRepo: "Eliminar o repositório",
    deleteTitle: "Eliminar {repo}",
    deleteConfirmBody:
      "Nenhuma recuperação possível. Escreva {name} para desbloquear o botão.",
    deleteForever: "Eliminar definitivamente",
    cancel: "Cancelar",
    updated: "Repositório atualizado.",
    deleted: "Repositório {repo} eliminado.",
    httpFailed: "Falhou (HTTP {status}).",
  },

  api: {
    authRequired: "Autenticação necessária.",
    jobNotFound: "Job não encontrado.",
    jobNotReady: "Este job ainda não está pronto.",
    jobNotPushable: "Este job não está pronto para ser enviado.",
    invalidJson: "Corpo JSON inválido.",
    invalidMultipart: "Pedido inválido (multipart/form-data esperado).",
    emptyBody: "Corpo do pedido vazio.",
    emptyArchive: "O arquivo está vazio.",
    uploadFailed: "Não foi possível receber o ficheiro. Tente novamente.",
    repoNameRequired:
      "O nome do repositório é obrigatório para criar um novo repositório.",
    branchNameTooLong: "Nome do ramo demasiado longo.",
    invalidOptions: "Opções inválidas.",
    invalidChange: "Alteração inválida.",
    noChange: "Nenhuma alteração.",
    pathRequired: "Parâmetro «path» obrigatório.",
  },
  errors: {
    encrypted:
      "Este arquivo está protegido por palavra-passe, o que ainda não é suportado.",
    tooManyFiles: "Demasiados ficheiros no arquivo (limite atingido).",
    tooBig:
      "O conteúdo descomprimido excede o tamanho permitido. Reduza o arquivo (node_modules?).",
    empty: "Este arquivo não contém nenhum ficheiro utilizável.",
    corrupt:
      "Arquivo ilegível ou corrompido. Verifique o ficheiro e tente novamente.",
    unsupported:
      "Formato não suportado (método de compressão ou variante de arquivo desconhecida).",
    volume:
      "Os arquivos RAR multivolume (.part1.rar, .part2.rar…) não são suportados.",
    unsafePaths:
      "O arquivo contém caminhos de ficheiro perigosos (traversal) e foi recusado.",
    pathLimits:
      "Um caminho de ficheiro excede os limites permitidos (profundidade ou comprimento).",
    timeout: "A extração demorou demasiado e foi interrompida.",
    rateLimited: "Demasiados pedidos. Aguarde um momento e tente novamente.",
    notFound: "Recurso não encontrado.",
    forbidden:
      "Não tem permissões de escrita neste repositório (ou o token do GitHub não tem o scope certo).",
    repoExists: "Já existe um repositório com esse nome na sua conta.",
    nameInvalid: "Nome de repositório ou de ramo inválido.",
    noChanges:
      "Nada para enviar: os ficheiros já correspondem ao repositório de destino.",
    conflict:
      "O repositório de destino mudou entretanto. Tente novamente, envie para um ramo dedicado ou relance com «Substituir todo o código» para sobrescrever o ramo com o conteúdo do arquivo.",
    scopeMissing:
      "O GitHub recusa a alteração de ficheiros de workflow (.github/workflows/…): ao token falta o scope «workflow». Termine a sessão e volte a entrar para o conceder.",
    gitFailed: "O push para o GitHub falhou.",
    interrupted: "O processamento foi interrompido (reinício do servidor).",
    badPath: "Caminho de ficheiro inválido.",
    confirmMismatch:
      "A confirmação não corresponde ao nome do repositório: nada foi eliminado.",
    archiveTooBig:
      "Este repositório é demasiado grande para ser transferido como arquivo.",
    internal: "Erro interno inesperado. Tente novamente dentro de instantes.",
  },
};
