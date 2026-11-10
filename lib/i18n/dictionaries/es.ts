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
    jobTitle: "Seguimiento de la importación",
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
    checkFrench: "Flujo de trabajo abierto",

    statFormats: "formatos de archivo",
    statFormatsSub: ".rar · .zip · .tar[.gz]",
    statCommands: "línea de comandos",
    statCommandsSub: "todo se hace con un clic",
    statDuration: "del envío al push",
    statDurationSub: "vista previa incluida",
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

    mockFile: "mi-proyecto.zip",
    mockFileMeta: "{size} · {count} ficheros",
    mockExcluded: "excluido",
    mockPushed: "Subido a github.com/tu/mi-proyecto · rama main",

    demoEyebrow: "La magia, antes de entrar",
    demoTitle: "Del archivo al repo de GitHub en segundos.",
    demoTitleAccent: "Sin terminal.",
    demoLead: "Arrastra, revisa el preview, haz push. Sin comandos, y nada sale sin tu visto bueno.",
    demoStep1: "Archivo local",
    demoStep2: "Extracción verificada",
    demoStep3: "Repo listo",
    demoFileMeta: "18,4 MB · 1.284 archivos",
    demoScan: "Rutas verificadas",
    demoPushed: "Pusheado · ahora mismo",
    demoBranches: "main",
    demoNoAccount: "Cero cuenta, cero terminal.",
    demoLocalBadge: "Local",
    demoDropHint: "Arrastra un .zip aquí",
    demoDropBrowse: "o elige un archivo",
    demoDropCta: "Importar un archivo",
    demoDropError: "Solo se aceptan archivos .zip.",
    demoReading: "Leyendo el archivo…",
    demoExtracting: "Extrayendo…",
    demoReady: "Listo para subir",
    demoReadyMeta: "{count} archivos detectados · nada salió de tu navegador",
    demoPushCta: "Subir a GitHub",
    demoLocalNote: "Tus archivos se quedan en tu navegador: no se envía nada.",
    demoConnectTitle: "¡Archivo listo!",
    demoConnectBody: "Conecta tu cuenta de GitHub para terminar el push.",
    demoConnectNote: "El archivo no salió de tu navegador: se enviará desde tu sesión de GitHub.",
    demoConnectCta: "Conectar con GitHub",
    demoConnectLater: "Más tarde",
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
    dropTitle: "Arrastra tu archivo aquí para subirlo a GitHub.",
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

  job: {
    statusQueued: "En cola",
    statusExtracting: "Extrayendo",
    statusReady: "Listo para subir",
    statusPushing: "Subiendo…",
    statusDone: "Terminado",
    statusFailed: "Error",
    extractingTitle: "Extrayendo…",
    extractingBody: "Se verifican las rutas, se aplica el límite de tamaño y se detecta la carpeta raíz. Todo ocurre en el servidor, en un espacio aislado.",
    pushingTitle: "Subiendo a GitHub…",
    pushingBody: "Creando el commit y enviando los archivos. Puedes dejar esta pestaña abierta: te avisaremos.",
    doneTitle: "¡Está subido!",
    doneFiles: "{count} archivos importados en la rama {branch}",
    doneCommit: "commit {sha}",
    doneCreated: "repositorio creado",
    doneOpenGithub: "Abrir en GitHub",
    doneCopyLink: "Copiar el enlace",
    doneDownload: "Descargar en .zip",
    doneImportAnother: "Importar otro archivo",
  },

  notFound: {
    title: "Página no encontrada",
    body: "Esta página no existe — o el trabajo caducó (los archivos se purgan tras un tiempo).",
    back: "Volver al inicio",
  },
};
