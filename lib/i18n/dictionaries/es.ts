import type { Dict } from "../types";

export const es: Dict = {
  meta: {
    title: "RepoDrop — Importa tus archivos .rar, .zip y .tar a GitHub",
    description:
      "Suelta un archivo .rar, .zip, .tar o .tar.gz y sube tu código a GitHub con un clic. Extracción segura, vista previa antes del envío, sin terminal ni git.",
    loginTitle: "Inicio de sesión con GitHub",
    loginDescription:
      "Conecta tu cuenta de GitHub a RepoDrop para crear un repositorio y subir tus archivos .rar, .zip o .tar con un clic. Token cifrado, nunca guardado en la base de datos.",
    importTitle: "Importar un archivo",
    importDescription:
      "Sube un archivo .rar, .zip, .tar o .tar.gz para previsualizar sus ficheros y subirlo a un repositorio de GitHub.",
  },

  nav: {
    howItWorks: "Cómo funciona",
    myRepos: "Mis repositorios",
    importArchive: "Importar un archivo",
    importShort: "Importar",
    login: "Iniciar sesión",
    start: "Empezar",
    logout: "Cerrar sesión",
    avatarAlt: "Avatar de {login}",
    language: "Idioma",
    languageChange: "Cambiar de idioma",
    languageSearch: "Buscar un idioma…",
    languageCurrent: "Idioma actual: {name}",
  },

  home: {
    heroBadge: "Nuevo: .tar y .tar.gz",
    heroTitleLine1: "Tus archivos de código,",
    heroTitleLine2: "en GitHub con arrastrar y soltar.",
    heroBody:
      "¿Te llega un .rar, un .zip o un .tar de un proyecto? Conecta GitHub, suelta el archivo, elige el repositorio — ya está subido. Sin terminal, sin clonar, sin configuración.",
    ctaStart: "Empezar con GitHub",
    ctaImport: "Importar un archivo",
    ctaHow: "Cómo funciona",
    checkSandboxed: "Extracción en sandbox",
    checkToken: "Token de GitHub nunca guardado",
    checkFrench: "Abierto: el código es público",

    statFormats: "formatos de archivo",
    statFormatsSub: ".rar · .zip · .tar[.gz]",
    statCommands: "línea de comandos",
    statCommandsSub: "todo se hace con un clic",
    statDuration: "del envío al push",
    statDurationSub: "vista previa incluida",
    statDurationValue: "2 min",
    statLanguages: "idiomas",
    statLanguagesSub: "interfaz y mensajes",

    stepsTitle: "¿Cómo funciona?",
    stepsLead: "Tres pasos, dos minutos, ningún comando.",
    step1Title: "Conecta GitHub",
    step1Body:
      "Un solo clic de autorización. Solo pedimos los permisos necesarios — tu token permanece cifrado en tu navegador.",
    step2Title: "Suelta el archivo",
    step2Body:
      "Arrastra tu .rar, .zip o .tar. Extracción en sandbox, rutas verificadas, vista previa completa antes del envío.",
    step3Title: "Haz push con un clic",
    step3Body:
      "Crea un repositorio o sube a uno existente. El commit se crea con tu identidad de GitHub.",

    featuresTitle: "Diseñado para ser simple",
    featuresTitleAccent: "y seguro",
    featuresLead:
      "Importar código debe ser un juego de niños — sin convertir el servidor en un colador.",
    feature1Title: "RAR, ZIP y TAR nativos",
    feature1Body:
      "Los .rar (RAR4/RAR5), .zip y .tar/.tar.gz se abren en el servidor — sin instalar nada, en ningún sitio.",
    feature2Title: "Extracción blindada",
    feature2Body:
      "Anti zip-slip, anti bombas de descompresión, .git embebido y enlaces simbólicos descartados. Tus repositorios quedan limpios.",
    feature3Title: "Vista previa antes del push",
    feature3Body:
      "Ficheros, tamaños, carpeta raíz, node_modules: ves exactamente qué sale y mantienes el control.",
    feature4Title: "Cero línea de comandos",
    feature4Body:
      "Sin clonar, sin credenciales git, sin «git push -u origin». La herramienta lo hace todo por ti.",
    feature5Title: "Repositorio nuevo o existente",
    feature5Body:
      "Crea un repositorio privado o público, o añade el archivo a uno existente — en una rama dedicada si lo prefieres.",
    feature6Title: "Enlaces listos para IA",
    feature6Body:
      "Después del push: Codespaces, vscode.dev, URL de clonado, comando gh y archivo .zip. Basta un copiar y pegar.",

    formatsTitle: "Cualquier archivo, sin importar su edad",
    formatsBody:
      "Los viejos .rar de Windows, los .zip de una exportación, los .tar.gz de un servidor Linux: todo se lee en el servidor, en streaming, con las mismas protecciones. La carpeta raíz única se elimina automáticamente y node_modules se excluye por defecto.",

    securityTitle: "Lo que rechazamos, y por qué",
    securityLead:
      "Descomprimir el archivo de un desconocido es un deporte de riesgo. Estas son las redes tendidas bajo cada importación.",
    guard1Title: "Zip-slip y traversal",
    guard1Body:
      "Cada ruta se valida (../, absolutas, UNC, NUL). Un solo intento y se rechaza el archivo entero.",
    guard2Title: "Bombas de descompresión",
    guard2Body:
      "Los tamaños declarados se suman antes de escribir: {extract} descomprimidos y {files} ficheros como máximo.",
    guard3Title: "Token de GitHub",
    guard3Body:
      "Cookie httpOnly cifrada (JWE A256GCM), push mediante GIT_ASKPASS. Nunca en la base de datos, nunca en los logs.",
    guard4Title: "Cuotas",
    guard4Body:
      "30 subidas/h por IP y 10 push/h por usuario, contadores persistentes: el servicio sigue sano.",
    limitsNote:
      "Límites por defecto: {upload} subidos, {extract} descomprimidos, {files} ficheros por importación.",

    faqTitle: "Preguntas frecuentes",
    faqLead:
      "Todo sobre la importación de archivos a GitHub, los formatos aceptados y la privacidad de tu cuenta.",

    ctaTitle: "¿Listo para soltar tu próximo archivo en GitHub?",
    ctaLead: "Conéctate, suelta, haz push. Nosotros nos ocupamos del resto.",

    mockFile: "mi-proyecto.tar",
    mockFileMeta: "{size} · {count} ficheros",
    mockExcluded: "excluido",
    mockPushed: "Subido a github.com/tu/mi-proyecto · rama main",
  },

  faq: {
    q1: "¿Cómo pongo un archivo .rar o .zip en GitHub sin usar Git?",
    a1: "Conecta tu cuenta de GitHub en RepoDrop, arrastra y suelta tu fichero .rar, .zip, .tar o .tar.gz, revisa la vista previa de los ficheros extraídos y elige un repositorio nuevo o existente. RepoDrop crea el commit y sube el código directamente con tu identidad de GitHub, sin terminal ni línea de comandos.",
    q2: "¿Qué formatos y tamaños de archivo se admiten?",
    a2: "RepoDrop admite de forma nativa archivos .rar (RAR4 y RAR5), .zip, .tar, .tar.gz y .tgz, detectados por sus bytes mágicos en el servidor. Por defecto un archivo puede pesar hasta {upload} comprimido ({extract} descomprimidos y {files} ficheros).",
    q3: "¿Se guardan mi token de GitHub y mi código privado?",
    a3: "No. Tu token OAuth de GitHub solo vive en una cookie httpOnly cifrada (JWE A256GCM) de tu navegador: nunca se escribe en la base de datos ni en los registros. Los ficheros extraídos residen en un espacio temporal aislado y se purgan automáticamente tras el push.",
    q4: "¿Puedo enviar un archivo a un repositorio de GitHub existente sin sobrescribir mi trabajo?",
    a4: "Sí. Puedes crear un repositorio nuevo (público o privado), subir a una rama dedicada de un repositorio existente para preservar la rama principal, o elegir explícitamente la opción de reemplazo total con confirmación.",
    q5: "¿Qué pasa con la carpeta raíz única y node_modules durante la importación?",
    a5: "Cuando el archivo contiene una única carpeta contenedora (por ejemplo mi-proyecto/), RepoDrop ofrece quitarla automáticamente para que tus ficheros queden directamente en la raíz del repositorio. node_modules, las carpetas .git embebidas y los ficheros de sistema inútiles (.DS_Store, __MACOSX) se descartan por defecto.",
  },

  login: {
    title: "Iniciar sesión en RepoDrop",
    description:
      "Autoriza el acceso a GitHub para crear repositorios y subir tus archivos.",
    continueWithGithub: "Continuar con GitHub",
    scopesLead: "Solo pedimos los permisos",
    scopesAnd: "y",
    scopesTail:
      ": crear repositorios y subir código en tu nombre (incluidos tus ficheros .github/workflows/). Tu token se cifra en una cookie httpOnly, nunca se guarda en la base de datos.",
    bulletCookie: "Cookie httpOnly cifrada (A256GCM)",
    bulletLogout: "Cerrar sesión = token borrado del navegador",
    devMode: "Modo desarrollo",
    devLogin: "Inicio de sesión directo (GH_TOKEN del servidor)",
    errorState: "La sesión de inicio caducó. Inténtalo de nuevo.",
    errorOauth: "GitHub rechazó la autorización. Empieza de nuevo.",
    errorConfig:
      "La aplicación no está configurada: define GITHUB_CLIENT_ID / GITHUB_CLIENT_SECRET y reinicia.",
    errorDevauth: "Modo dev: el GH_TOKEN del servidor falta o no es válido.",
    errorGeneric: "Error de inicio de sesión.",
  },

  importPage: {
    title: "Importar un archivo",
    lead: "Suelta un fichero .rar, .zip o .tar (también .tar.gz) que contenga tu código. Verás una vista previa completa antes de cualquier envío a GitHub.",
    browseLead:
      "¿Quieres ver primero lo que ya hay en tu cuenta? Explora tus repositorios y su contenido sin enviar nada.",
    browseCta: "Explorar mis repositorios",
    limitLabel: "Límite:",
    limitBody: "{upload} por archivo, {extract} descomprimidos.",
    securityLabel: "Seguridad:",
    securityBody: "rutas verificadas, .git y enlaces descartados.",
    afterLabel: "Después:",
    afterBody: "vista previa, elección del repositorio y push.",
  },

  uploader: {
    dropLabel: "Soltar un archivo .rar, .zip o .tar",
    uploading: "Enviando el archivo… {progress}%",
    keepOpen: "No cierres esta pestaña.",
    dropHint: "Arrastra tu archivo aquí o haz clic para explorar",
    formatsHint: ".rar, .zip, .tar y .tar.gz — {max} máx. ({extract} descomprimidos)",
    errorFormat:
      "Formato no admitido: solo se aceptan ficheros .rar, .zip, .tar y .tar.gz.",
    errorEmpty: "Este fichero está vacío.",
    errorTooLarge: "Archivo demasiado grande (máx. {max}).",
    errorHttp: "Fallo en el envío (HTTP {status}). Inténtalo de nuevo.",
    errorNetwork: "Conexión perdida durante el envío. Inténtalo de nuevo.",
  },

  footer: {
    tagline:
      "Tus archivos de código, en GitHub, con arrastrar y soltar. Sin terminal, sin clonar, sin configurar git.",
    productTitle: "Producto",
    home: "Inicio",
    importArchive: "Importar un archivo",
    howItWorks: "Cómo funciona",
    security: "Seguridad",
    faq: "Preguntas frecuentes",
    formatsTitle: "Formatos admitidos",
    guaranteesTitle: "Garantías",
    guarantee1: "Token de GitHub cifrado, nunca guardado en la base de datos",
    guarantee2: "Extracción en sandbox, rutas verificadas",
    guarantee3: "Vista previa completa antes de cualquier envío",
    copyright: "© {year} RepoDrop — tus archivos, tu GitHub.",
    reserved: "Área reservada",
  },

  notFound: {
    title: "Página no encontrada",
    body: "Esta página no existe — o el trabajo caducó (los archivos se purgan tras un tiempo).",
    back: "Volver al inicio",
  },
  jobs: {
    metaTitle: "Seguimiento de la importación",

    statusQueued: "En cola",
    statusExtracting: "Extrayendo",
    statusReady: "Listo para subir",
    statusPushing: "Subiendo…",
    statusDone: "Terminado",
    statusFailed: "Error",

    extractingTitle: "Extrayendo…",
    extractingBody:
      "Verificación de rutas y tamaños, detección de la carpeta raíz. Todo ocurre en el servidor, en un espacio aislado.",
    pushingTitle: "Subiendo a GitHub…",
    pushingBody:
      "Se crea el commit y se envían los archivos. Puedes dejar esta pestaña abierta: te iremos informando.",

    failedTitle: "La operación ha fallado",
    failedUnknown: "Error desconocido.",
    lostConnection: "Conexión perdida. Inténtalo de nuevo.",
    httpFailed: "Error (HTTP {status}).",
    repoMoved:
      "El repositorio {repo} ha avanzado desde tu importación. Puedes sobrescribir su rama con el contenido exacto de este archivo: los archivos que no estén en él se borrarán del repositorio y el push se forzará. Se conserva el historial existente (nuevo commit encima).",
    repoMovedConfirm:
      "¿Confirmas el reemplazo completo del código de este repositorio por este archivo?",
    replaceAllYes: "Sí, reemplazar todo el código",
    replaceAllRetry: "Reintentar reemplazando todo el código",
    cancel: "Cancelar",
    retryOtherArchive: "Reintentar con otro archivo",
    backHome: "Volver al inicio",

    doneTitle: "¡Subido!",
    doneBody: "{count} importados en la rama",
    doneCommit: "commit",
    doneCreated: "· repositorio creado",
    openOnGithub: "Abrir en GitHub",
    copyLink: "Copiar el enlace",
    downloadZip: "Descargar en .zip",
    aiLinksTitle: "Enlaces listos para dar a una IA:",
    anotherImport: "Importar otro archivo",

    linkRepo: "Repositorio de GitHub",
    linkBranch: "Rama «{branch}»",
    linkBranchSub: "Sube a esta rama",
    linkCommit: "Commit exacto",
    linkCodespaces: "Codespaces (agente IA de GitHub)",
    linkCodespacesSub: "vscode.dev listo para usar, Copilot conectado",
    linkVscode: "vscode.dev (editor web oficial)",
    linkVscodeSub: "Copilot + edición + ejecución (Codespaces)",
    linkClone: "URL de clonación (agente externo)",
    linkCloneSub: "El agente se autentica con su propia sesión de GitHub",
    linkGh: "Comando CLI `gh`",

    previewTitle: "Vista previa del archivo",
    previewLead: "Lo que se subirá, tras los filtros de seguridad.",
    previewFiles: "Archivos",
    previewSize: "Peso descomprimido",
    previewIgnored: "Ignorados:",
    ignoredGit: ".git ({count})",
    ignoredSystemFiles: "archivos del sistema ({count})",
    ignoredSymlinks: "enlaces simbólicos ({count})",
    ignoredHardlinks: "enlaces duros ({count})",
    ignoredBlocked: "rutas bloqueadas ({count})",
    tooLargeForGithub:
      "{count} archivo(s) superan los 100 MB: es probable que GitHub los rechace. Ej.:",

    filtersTitle: "Filtros de importación",
    filtersNone: "No hay filtros disponibles para este archivo.",
    stripRootLabel: "Quitar la carpeta raíz",
    stripRootHint:
      "Recomendado: el contenido del proyecto iría a la raíz del repositorio.",
    includeNodeModules: "Incluir",
    includeNodeModulesHint:
      "Desmarcado por defecto: pesado y rara vez útil en un repositorio.",

    destTitle: "Destino",
    destLead: "¿A dónde subir estos archivos?",
    destNew: "Repositorio nuevo",
    destExisting: "Repositorio existente",
    repoNameLabel: "Nombre del repositorio",
    repoNamePlaceholder: "mi-proyecto",
    repoNameInvalid:
      "Solo letras, cifras, puntos, guiones y guiones bajos (debe empezar por una letra o una cifra).",
    visibilityLabel: "Visibilidad",
    visibilityPrivate: "Privado",
    visibilityPrivateHint: "Visible solo para ti",
    visibilityPublic: "Público",
    visibilityPublicHint: "Visible para todo el mundo",
    searchRepo: "Buscar un repositorio…",
    loadingRepos: "Cargando tus repositorios…",
    reposLoadError: "No se han podido cargar tus repositorios.",
    noWritableRepo:
      "Ningún repositorio accesible con permisos de escritura. ¡Crea uno nuevo!",
    noRepoMatch: "Ningún repositorio coincide con la búsqueda.",
    dedicatedBranch: "Crear una rama dedicada",
    dedicatedHintExisting:
      "No tocar la rama por defecto: ideal para un repositorio compartido.",
    dedicatedHintNew:
      "Nombre de rama inicial del nuevo repositorio (si no, la rama por defecto).",
    replaceAll: "Reemplazar todo el código del repositorio",
    replaceAllHint:
      "El repositorio contendrá exactamente los archivos del archivo: los que no estén se borrarán y el push se forzará, de modo que funcionará aunque el repositorio haya cambiado mientras tanto (adiós al error «fetch first»). Úsalo cuando el archivo sea la nueva versión completa del proyecto.",
    replaceConfirm:
      "Lo confirmo: los archivos del repositorio {repo} que no estén en este archivo se borrarán definitivamente de la rama subida.",
    replaceConfirmNoRepo:
      "Lo confirmo: los archivos del repositorio que no estén en este archivo se borrarán definitivamente de la rama subida.",
    advanced: "Opciones avanzadas",
    commitMessage: "Mensaje de commit",
    commitPlaceholder: "Importación de {filename} con RepoDrop",
    pushAction: "Subir a GitHub",
    replacePushAction: "Reemplazar todo el código en GitHub",
    sending: "Enviando…",
    replaceNeedConfirm:
      "Marca la confirmación del reemplazo para activar el botón.",
    tokenNote:
      "Tu token de GitHub permanece en una cookie cifrada: nunca se escribe en la base de datos.",
  },

  repos: {
    metaTitle: "Mis repositorios",
    pageTitle: "Mis repositorios",
    pageLead:
      "Explora tus repositorios antes de importar nada: árbol, vista previa de archivos, rama que elijas. El cambio de nombre, la visibilidad y el borrado están en la pestaña {actions} de un repositorio.",

    filterPlaceholder: "Filtrar por nombre, descripción o lenguaje…",
    filterAria: "Filtrar repositorios",
    sortAria: "Ordenar",
    sortPushed: "Actividad reciente",
    sortName: "Nombre (A→Z)",
    sortSize: "Tamaño",
    mine: "Los míos",
    refresh: "Actualizar",
    errorList: "Lista no disponible (HTTP {status}).",
    errorServer: "No se puede contactar con el servidor.",
    truncated:
      "Solo se han cargado los 300 repositorios más recientes. Afina con el filtro de arriba.",
    loading: "Cargando tus repositorios…",
    emptyFilter: "Ningún repositorio coincide con este filtro.",
    emptyToken: "Ningún repositorio visible con este token de GitHub.",
    countAll: "{count} repositorio(s)",
    countFiltered: "{count} de {total}",
    countHint: "— haz clic para explorar el contenido.",
    noDescription: "Sin descripción",
    pushedAgo: "subido {when}",
    issues: "{count} issue(s)",
    readOnly: "solo lectura",

    backToList: "Volver a la lista",
    list: "Lista",
    badgePrivate: "privado",
    badgePublic: "público",
    badgeArchived: "archivado",
    badgeFork: "fork",
    badgeReadOnly: "solo lectura",
    branchProtected: "(protegida)",
    downloadTitle: "Descargar {repo} en .{format}",
    downloadTitleRef: "Descargar {repo} ({ref}) en .{format}",
    actionsTab: "Acciones",
    loadingRepo: "Cargando el repositorio…",
    inaccessible: "Repositorio inaccesible.",
    inaccessibleHttp: "Repositorio inaccesible (HTTP {status}).",
    errorServerJoin: "No se puede contactar con el servidor.",
    copyDenied: "El navegador ha bloqueado la copia.",
    reloadFolder: "Recargar esta carpeta",
    root: "raíz",
    entries: "{count} entrada(s)",
    loadingShort: "Cargando…",
    emptyRepo:
      "Este repositorio aún no contiene ningún archivo. Importa un archivo para llenarlo.",
    loadingFile: "Cargando el archivo…",
    selectFile: "Selecciona un archivo para verlo.",
    lines: "{count} líneas",
    copy: "Copiar",
    copied: "Copiado",
    raw: "En bruto",
    fileTooBig:
      "Archivo demasiado grande para la vista previa ({size}). Ábrelo en GitHub.",
    fileBinary: "Archivo binario ({size}): sin vista previa de texto.",

    actionsTitle: "Cambiar nombre / describir",
    nameLabel: "Nombre del repositorio",
    renameWarning:
      "Cambiar el nombre rompe los clones, los enlaces y las páginas de GitHub existentes. GitHub redirige el nombre antiguo, pero no para siempre.",
    descLabel: "Descripción",
    descPlaceholder: "¿Para qué sirve este repositorio?",
    save: "Guardar",
    writeInsufficient: "Permisos de escritura insuficientes en este repositorio.",
    visibilityTitle: "Visibilidad",
    visibilityCurrently: "Actualmente {visibility}.",
    visibilityToPrivate:
      " Hacerlo privado retira el acceso a todos los anónimos.",
    visibilityToPublic:
      " Hacerlo público expone todo el historial de commits.",
    makePublic: "Hacer público",
    makePrivate: "Hacer privado",
    dangerZone: "Zona sensible",
    deleteWarning:
      "El borrado es definitivo: código, historial, issues y wiki.",
    deleteRepo: "Borrar el repositorio",
    deleteTitle: "Borrar {repo}",
    deleteConfirmBody:
      "No hay recuperación posible. Escribe {name} para desbloquear el botón.",
    deleteForever: "Borrar definitivamente",
    cancel: "Cancelar",
    updated: "Repositorio actualizado.",
    deleted: "Repositorio {repo} borrado.",
    httpFailed: "Error (HTTP {status}).",
  },

  api: {
    authRequired: "Autenticación requerida.",
    jobNotFound: "Job no encontrado.",
    jobNotReady: "Este job aún no está listo.",
    jobNotPushable: "Este job no está listo para subirse.",
    invalidJson: "Cuerpo JSON no válido.",
    invalidMultipart: "Solicitud no válida (se esperaba multipart/form-data).",
    emptyBody: "Cuerpo de la solicitud vacío.",
    emptyArchive: "El archivo está vacío.",
    uploadFailed: "No se ha podido recibir el archivo. Inténtalo de nuevo.",
    repoNameRequired:
      "Se requiere un nombre de repositorio para crear uno nuevo.",
    branchNameTooLong: "Nombre de rama demasiado largo.",
    invalidOptions: "Opciones no válidas.",
    invalidChange: "Modificación no válida.",
    noChange: "Ninguna modificación.",
    pathRequired: "Parámetro «path» requerido.",
  },
  errors: {
    encrypted:
      "Este archivo está protegido con contraseña, lo que aún no está soportado.",
    tooManyFiles: "Demasiados archivos en el archivo (límite alcanzado).",
    tooBig:
      "El contenido descomprimido supera el tamaño permitido. Reduce el archivo (¿node_modules?).",
    empty: "Este archivo no contiene ningún archivo aprovechable.",
    corrupt:
      "Archivo ilegible o dañado. Comprueba el fichero e inténtalo de nuevo.",
    unsupported:
      "Formato no soportado (método de compresión o variante de archivo desconocida).",
    volume:
      "Los archivos RAR multivolumen (.part1.rar, .part2.rar…) no están soportados.",
    unsafePaths:
      "El archivo contiene rutas de fichero peligrosas (traversal) y ha sido rechazado.",
    pathLimits:
      "Una ruta de fichero supera los límites permitidos (profundidad o longitud).",
    timeout: "La extracción ha tardado demasiado y se ha interrumpido.",
    rateLimited: "Demasiadas solicitudes. Espera un momento e inténtalo de nuevo.",
    notFound: "Recurso no encontrado.",
    forbidden:
      "No tienes permisos de escritura en este repositorio (o al token de GitHub le falta el scope adecuado).",
    repoExists: "Ya existe un repositorio con ese nombre en tu cuenta.",
    nameInvalid: "Nombre de repositorio o de rama no válido.",
    noChanges:
      "Nada que subir: los archivos ya coinciden con el repositorio de destino.",
    conflict:
      "El repositorio de destino ha cambiado mientras tanto. Inténtalo de nuevo, sube a una rama dedicada o relanza con «Reemplazar todo el código» para sobrescribir la rama con el contenido del archivo.",
    scopeMissing:
      "GitHub rechaza la modificación de ficheros de workflow (.github/workflows/…): al token le falta el scope «workflow». Cierra sesión y vuelve a entrar para concederlo.",
    gitFailed: "El push a GitHub ha fallado.",
    interrupted: "El procesamiento se ha interrumpido (reinicio del servidor).",
    badPath: "Ruta de fichero no válida.",
    confirmMismatch:
      "La confirmación no coincide con el nombre del repositorio: no se ha borrado nada.",
    archiveTooBig:
      "Este repositorio es demasiado grande para descargarlo en un archivo.",
    internal: "Error interno inesperado. Inténtalo de nuevo en un momento.",
  },
};
