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
    checkFrench: "Fluxo de trabalho aberto",

    statFormats: "formatos de arquivo",
    statFormatsSub: ".rar · .zip · .tar[.gz]",
    statCommands: "linha de comandos",
    statCommandsSub: "tudo com um clique",
    statDuration: "do envio ao push",
    statDurationSub: "pré-visualização incluída",
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

    mockFile: "meu-projeto.zip",
    mockFileMeta: "{size} · {count} ficheiros",
    mockExcluded: "excluído",
    mockPushed: "Enviado para github.com/voce/meu-projeto · branch main",

    demoEyebrow: "A magia, antes de entrar",
    demoTitle: "De um arquivo local a um repositório no GitHub em segundos.",
    demoTitleAccent: "Sem terminal.",
    demoLead: "Arraste, confira, envie. Nenhum comando para digitar, nenhum repositório para clonar — e nada é enviado antes da sua aprovação.",
    demoStep1: "Arraste o arquivo",
    demoStep2: "Extração verificada",
    demoStep3: "Repositório pronto",
    demoDropZone: "Arraste e solte",
    demoScan: "Verificando caminhos",
    demoCommit: "Commit em",
    demoPushed: "Enviado · há poucos segundos",
    demoBranches: "branch main",
    demoCaptionBefore: "Nenhuma conta necessária nesta demo.",
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
};
