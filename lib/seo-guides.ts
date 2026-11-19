import { config } from "./config";
import { getDictionary } from "./i18n/dictionary";
import { fill, formatBytes, formatNumber } from "./i18n/format";
import { DEFAULT_LOCALE, type Locale } from "./i18n/locales";

export interface GuideSection {
  heading: string;
  paragraphs: string[];
}

export interface GuideFaqItem {
  question: string;
  answer: string;
}

export interface Guide {
  /** Slug URL (`/guides/<slug>`). ASCII, kebab-case. */
  slug: string;
  /** Titre H1, mot-clé principal en tête. */
  title: string;
  /** Métadescription unique, 140–160 caractères. */
  description: string;
  /** Mots-clés secondaires pour la page. */
  keywords: string[];
  /** Date de publication / dernière modification (ISO `AAAA-MM-JJ`). */
  datePublished: string;
  dateModified: string;
  /** Chapeau de la page. */
  intro: string;
  /** Sections de contenu (H2 + paragraphes). */
  sections: GuideSection[];
  /** Étapes pas à pas (alimentent le JSON-LD `HowTo`). */
  steps: string[];
  /** FAQ locale (alimente le JSON-LD `FAQPage` de la page). */
  faq: GuideFaqItem[];
  /** Slugs des guides associés (maillage interne). */
  related: string[];
}

/** French editorial source and stable URLs for each locale. */
export const GUIDES = [
  {
    slug: "importer-rar-sur-github",
    title: "Comment importer un fichier RAR sur GitHub",
    description:
      "Importez un fichier .rar (RAR4 ou RAR5) sur GitHub sans git ni terminal : téléversez l'archive, prévisualisez les fichiers extraits et poussez le code vers un dépôt en un clic.",
    keywords: [
      "importer rar sur github",
      "envoyer rar sur github",
      "téléverser rar github",
      "rar vers github",
      "deposer rar github",
    ],
    datePublished: "2026-11-07",
    dateModified: "2026-11-07",
    intro:
      "Vous avez reçu un fichier .rar ou vous possédez une archive RAR d'un projet et vous voulez la voir apparaître sur GitHub. Avec RepoDrop, pas besoin d'installer git, de cloner un dépôt ou de saisir la moindre commande : l'extraction et le push se font en quelques clics, directement depuis le navigateur.",
    sections: [
      {
        heading: "Ce que fait RepoDrop avec un fichier RAR",
        paragraphs: [
          "RepoDrop détecte le format RAR par ses octets magiques côté serveur, avec prise en charge des archives RAR4 (les plus anciennes) et RAR5 (les plus courants aujourd'hui). L'archive est extraite dans un espace temporaire sandboxé : les chemins sont vérifiés (anti zip-slip) et les limites de taille et de nombre de fichiers appliquées avant toute écriture.",
          "Une fois les fichiers extraits, un aperçu complet de l'arborescence s'affiche : vous vérifiez exactement ce qui sera poussé avant d'envoyer quoi que ce soit sur GitHub. Vous pouvez ensuite choisir de créer un dépôt neuf ou de pousser sur une branche dédiée d'un dépôt existant.",
        ],
      },
      {
        heading: "Prérequis : un compte GitHub",
        paragraphs: [
          "La seule condition est d'avoir un compte GitHub. La connexion passe par OAuth : RepoDrop reçoit un jeton chiffré (cookie httpOnly JWE) qui reste dans votre navigateur et n'est jamais stocké en base de données ni dans les journaux.",
          "L'autorisation demandée est minimale : la capacité de créer un dépôt et de pousser du code (scope `repo` et `workflow` pour la gestion des dépôts), rien d'autre.",
        ],
      },
      {
        heading: "Limites à connaître",
        paragraphs: [
          "Par défaut, une archive RAR peut peser jusqu'à 200 Mo compressés, 500 Mo décompressés, avec 20 000 fichiers maximum. Ces limites protègent le serveur et garantissent un traitement rapide de l'archive.",
          "Les dossiers `node_modules`, les `.git` embarqués et les fichiers système (`.DS_Store`, `__MACOSX`) sont écartés par défaut. Si votre archive contient un unique dossier englobant, vous pouvez retirer ce dossier racine automatiquement pour placer vos fichiers directement à la racine du dépôt.",
        ],
      },
    ],
    steps: [
      "Connectez votre compte GitHub sur RepoDrop (OAuth, jeton chiffré, jamais stocké).",
      "Glissez-déposez votre fichier .rar dans l'import — RAR4 et RAR5 sont détectés automatiquement.",
      "Vérifiez l'aperçu des fichiers extraits, puis choisissez un dépôt (neuf ou existant) et poussez.",
    ],
    faq: [
      {
        question: "RepoDrop extrait-il vraiment les archives RAR ?",
        answer:
          "Oui. Le format est détecté côté serveur par ses octets magiques et l'extraction RAR (RAR4 et RAR5) est prise en charge nativement, sans dépendance à un outil externe installé sur votre machine.",
      },
      {
        question: "Mon fichier RAR est-il stocké après le push ?",
        answer:
          "Non. Les fichiers extraits résident dans un espace temporaire isolé puis sont purgés automatiquement après le push. Votre jeton GitHub est conservé uniquement dans un cookie chiffré dans votre navigateur.",
      },
      {
        question: "Puis-je pousser sur une branche existante sans écraser mon travail ?",
        answer:
          "Oui. Vous pouvez pousser sur une branche dédiée d'un dépôt existant afin de préserver la branche principale, ou choisir explicitement le remplacement complet du code avec confirmation.",
      },
    ],
    related: [
      "importer-zip-sur-github",
      "envoyer-du-code-sur-github-sans-git",
      "creer-un-depot-github-depuis-une-archive",
    ],
  },
  {
    slug: "importer-zip-sur-github",
    title: "Comment importer un fichier ZIP sur GitHub",
    description:
      "Importez un fichier .zip sur GitHub sans terminal : déposez l'archive, consultez l'aperçu des fichiers extraits et poussez le code vers un dépôt GitHub public ou privé en un clic.",
    keywords: [
      "importer zip sur github",
      "envoyer zip sur github",
      "téléverser zip github",
      "zip vers github",
      "deposer zip github",
    ],
    datePublished: "2026-11-07",
    dateModified: "2026-11-07",
    intro:
      "Le ZIP est le format d'archive le plus répandu : projets scolaires, archives de travail, dépôts de code transmis par courriel. Plutôt que de l'ouvrir manuellement, de recréer un dépôt et d'ajouter les fichiers un par un, RepoDrop importe le ZIP sur GitHub en une seule opération, avec un aperçu complet avant envoi.",
    sections: [
      {
        heading: "Le flux d'import d'un ZIP",
        paragraphs: [
          "Après la connexion GitHub, le ZIP est téléversé, extrait côté serveur dans un espace sandboxé et son contenu est indexé. L'arborescence des fichiers s'affiche immédiatement : vous voyez exactement ce qui sera poussé, dossier par dossier.",
          "L'extraction applique des protections : les chemins sont vérifiés contre les tentatives de zip-slip, et les bombes de décompression sont limitées par des plafonds de taille et de nombre de fichiers.",
        ],
      },
      {
        heading: "Dépôt public ou privé",
        paragraphs: [
          "Au moment du push, vous choisissez la visibilité du dépôt : public pour un projet à partager, privé pour un code confidentiel. La décision est prise côté serveur, avec des défauts sécurisés : par défaut le dépôt est privé et la branche principale est préservée.",
          "Vous pouvez également pousser sur une branche dédiée d'un dépôt existant, par exemple `import-zip` sur votre dépôt principal, sans toucher à la branche principale.",
        ],
      },
      {
        heading: "Que faire si mon ZIP contient un dossier unique",
        paragraphs: [
          "Beaucoup d'archives ZIP contiennent un seul dossier englobant (par exemple `mon-projet/` avec tous les fichiers à l'intérieur). RepoDrop détecte ce cas et propose de retirer automatiquement le dossier racine pour que vos fichiers soient poussés directement à la racine du dépôt.",
          "Le même mécanisme filtre par défaut les `node_modules`, les `.git` embarqués et les fichiers système inutiles comme `.DS_Store` ou les dossiers `__MACOSX`.",
        ],
      },
    ],
    steps: [
      "Connectez votre compte GitHub sur RepoDrop via OAuth (jeton chiffré, jamais stocké).",
      "Déposez votre fichier .zip : extraction et indexation côté serveur, instantanées.",
      "Consultez l'aperçu, choisissez le dépôt et la visibilité, puis poussez le code.",
    ],
    faq: [
      {
        question: "Un ZIP de plusieurs centaines de fichiers est-il supporté ?",
        answer:
          "Oui, jusqu'à 20 000 fichiers et 500 Mo décompressés par défaut. Ces plafonds garantissent un traitement fiable et rapide de l'archive.",
      },
      {
        question: "Le ZIP est-il scanné pour les virus ?",
        answer:
          "RepoDrop applique une extraction sandboxée avec validation des chemins (anti zip-slip) et plafonds stricts de taille et de fichiers. Elle ne fait pas de scan antivirus : ne poussez que des archives provenant de sources fiables.",
      },
      {
        question: "Puis-je importer un ZIP dans un dépôt qui existe déjà ?",
        answer:
          "Oui. Vous pouvez pousser sur une branche dédiée d'un dépôt existant (par exemple `import`) ou choisir le remplacement complet du code avec une confirmation explicite.",
      },
    ],
    related: [
      "importer-rar-sur-github",
      "importer-tar-sur-github",
      "envoyer-du-code-sur-github-sans-git",
    ],
  },
  {
    slug: "importer-tar-sur-github",
    title: "Comment importer un fichier TAR ou tar.gz sur GitHub",
    description:
      "Importez un fichier .tar, .tar.gz ou .tgz sur GitHub sans terminal : extraction automatique, aperçu de l'arborescence et push vers un dépôt GitHub en un seul clic.",
    keywords: [
      "importer tar sur github",
      "importer tar.gz github",
      "tgz vers github",
      "envoyer tar github",
      "deposer tar.gz github",
    ],
    datePublished: "2026-11-07",
    dateModified: "2026-11-07",
    intro:
      "Les archives TAR (.tar, .tar.gz, .tgz) sont omniprésentes sur les systèmes Linux et les environnements de développement : installation de logiciels, distribution de code source, export de projets. RepoDrop importe ces archives sur GitHub sans installer git et sans taper la moindre commande.",
    sections: [
      {
        heading: "Formats TAR supportés",
        paragraphs: [
          "RepoDrop détecte les archives TAR par leurs octets magiques côté serveur et supporte les archives tar brutes (.tar), compressées avec gzip (.tar.gz, .tgz) et les formats courants associés. La compression gzip est décompressée automatiquement lors de la lecture.",
          "L'extraction est un flux en continu côté serveur : l'archive est parcourue sans être décompressée en entier dans la mémoire, ce qui reste efficace même pour des archives de plusieurs centaines de megaoctets.",
        ],
      },
      {
        heading: "Permissions et symlinks",
        paragraphs: [
          "L'extraction TAR conserve l'ordre des entrées et applique les mêmes protections que pour les autres formats : validation des chemins (anti zip-slip) et plafonds de taille et de nombre de fichiers. Les symbolic links qui pourraient sortir de l'espace d'extraction sont refusés.",
          "Les permissions lisibles par l'utilisateur sont conservées pour le contenu poussé ; ce qui compte pour GitHub est le contenu des fichiers, pas les métadonnées système.",
        ],
      },
      {
        heading: "Flux d'import",
        paragraphs: [
          "Après la connexion GitHub, déposez l'archive TAR : l'extraction démarre immédiatement. L'aperçu affiche l'arborescence complète des fichiers extraits, avec les tailles et le nombre de fichiers.",
          "Vous vérifiez le contenu, choisissez un dépôt (neuf ou existant, public ou privé) et poussez. Comme pour les autres formats, le dossier racine unique peut être retiré automatiquement et les dossiers inutiles sont filtrés par défaut.",
        ],
      },
    ],
    steps: [
      "Connectez votre compte GitHub sur RepoDrop (OAuth, jeton chiffré, jamais stocké).",
      "Déposez votre .tar, .tar.gz ou .tgz — le format est détecté automatiquement.",
      "Vérifiez l'aperçu des fichiers extraits et poussez vers un dépôt GitHub public ou privé.",
    ],
    faq: [
      {
        question: "RepoDrop gère-t-il les archives .tgz ?",
        answer:
          "Oui. Les extensions .tar.gz et .tgz sont détectées et décompressées automatiquement : il n'y a aucune étape manuelle de décompression à faire avant l'import.",
      },
      {
        question: "Puis-je importer un TAR sur un dépôt existant ?",
        answer:
          "Oui. Vous pouvez pousser sur une branche dédiée d'un dépôt existant pour préserver le contenu actuel, ou choisir explicitement le remplacement complet du code avec confirmation.",
      },
      {
        question: "Quelles sont les limites pour les archives TAR ?",
        answer:
          "200 Mo compressés, 500 Mo décompressés et 20 000 fichiers maximum par défaut. Ces plafonds protègent le serveur et garantissent un traitement rapide.",
      },
    ],
    related: [
      "importer-zip-sur-github",
      "importer-rar-sur-github",
      "creer-un-depot-github-depuis-une-archive",
    ],
  },
  {
    slug: "envoyer-du-code-sur-github-sans-git",
    title: "Envoyer du code sur GitHub sans Git et sans terminal",
    description:
      "Envoyer du code sur GitHub sans git, sans clone ni ligne de commande : importez une archive .rar, .zip ou .tar, prévisualisez le contenu et poussez vers GitHub en un clic.",
    keywords: [
      "envoyer du code sur github sans git",
      "push github sans terminal",
      "github sans git",
      "publier du code sur github sans git",
      "importer du code sur github",
    ],
    datePublished: "2026-11-07",
    dateModified: "2026-11-07",
    intro:
      "Vous avez du code à publier sur GitHub mais vous ne voulez pas (ou ne pouvez pas) installer git, cloner un dépôt et maîtriser les commandes de push. RepoDrop fait exactement le contraire : une interface dans le navigateur, un glisser-déposer d'archive, et votre code est sur GitHub — sans terminal, sans clone, sans configuration.",
    sections: [
      {
        heading: "Pourquoi envoyer du code sur GitHub sans git",
        paragraphs: [
          "GitHub est le dépôt de code par défaut, mais la ligne de commande peut être un obstacle : installation d'git, gestion des clés, mécanismes de branches, erreurs de configuration. Pour un projet reçu par archive (.rar, .zip, .tar), le chemin sans terminal est souvent le seul vraiment accessible.",
          "RepoDrop automatise tout le cycle : extraction de l'archive, indexation des fichiers, aperçu avant envoi, création du dépôt et push du code — sous votre identité GitHub, avec un historique de commit propre.",
        ],
      },
      {
        heading: "Comment RepoDrop remplace les commandes git",
        paragraphs: [
          "Un import RepoDrop correspond à une séquence git traditionnelle : extraction de l'archive (comme un déarchiveur), puis création du dépôt et ajout des fichiers (comme `git init`, `git add` et `git commit`), puis push vers GitHub.",
          "Toutes ces étapes sont exécutées côté serveur, sous votre compte GitHub, avec un commit unique contenant l'intégralité du contenu extrait. Vous n'avez rien à installer et rien à configurer.",
        ],
      },
      {
        heading: "Sécurité du flux sans terminal",
        paragraphs: [
          "L'authentification utilise OAuth GitHub : un jeton chiffré (cookie httpOnly JWE) reste dans votre navigateur et n'est jamais stocké en base. Aucune commande git, aucune clé SSH, aucune credential en ligne de commande n'est impliquée.",
          "L'extraction est sandboxée avec validation des chemins et plafonds de taille, et vous gardez le contrôle jusqu'au dernier instant : l'aperçu des fichiers s'affiche avant que quoi que ce soit ne soit envoyé sur GitHub.",
        ],
      },
    ],
    steps: [
      "Connectez votre compte GitHub sur RepoDrop (pas de clé, pas de terminal : OAuth chiffré).",
      "Glissez-déposez votre archive (.rar, .zip, .tar ou .tar.gz) — extraction et indexation automatiques.",
      "Vérifiez l'aperçu, choisissez le dépôt et poussez : votre code est sur GitHub.",
    ],
    faq: [
      {
        question: "Est-il vraiment possible de publier sur GitHub sans git ?",
        answer:
          "Oui. RepoDrop exécute les opérations côté serveur (création du dépôt, commit, push) via l'API GitHub sous votre identité : vous n'avez besoin d'aucune installation ou configuration git locale.",
      },
      {
        question: "Le code poussé est-il accessible comme avec git ?",
        answer:
          "Oui. Le dépôt GitHub contient le même contenu que vous veriez après un clone : fichiers, arborescence, historique du commit. Vous pouvez ensuite travailler avec git normalement, ou continuer sans terminal.",
      },
      {
        question: "Quelles archives puis-je importer ?",
        answer:
          "Les formats RAR (RAR4/RAR5), ZIP, TAR, TAR.GZ et TGT sont détectés automatiquement par leurs octets magiques. Les limites par défaut sont 200 Mo compressés, 500 Mo décompressés et 20 000 fichiers.",
      },
    ],
    related: [
      "importer-rar-sur-github",
      "creer-un-depot-github-depuis-une-archive",
      "importer-tar-sur-github",
    ],
  },
  {
    slug: "creer-un-depot-github-depuis-une-archive",
    title: "Créer un dépôt GitHub depuis une archive en un clic",
    description:
      "Créez un dépôt GitHub directement depuis une archive .rar, .zip ou .tar : extraction, création du dépôt (public ou privé) et push du code, sans git ni terminal.",
    keywords: [
      "créer un dépôt github depuis une archive",
      "créer dépôt github zip",
      "init github depuis archive",
      "créer repo github rar",
      "dépôt github sans git",
    ],
    datePublished: "2026-11-07",
    dateModified: "2026-11-07",
    intro:
      "Vous partez d'une archive (.rar, .zip, .tar) et vous voulez un dépôt GitHub complet, prêt à collaborer, sans passer par git. RepoDrop combine extraction, création de dépôt et push en une seule opération : l'archive devient un dépôt GitHub en quelques clics.",
    sections: [
      {
        heading: "De l'archive au dépôt en une étape",
        paragraphs: [
          "Après la connexion GitHub, déposez votre archive : RepoDrop l'extrait sandboxée, en propose un aperçu complet, puis crée le dépôt et pousse le contenu. La création du dépôt et le push sont exécutés côté serveur via l'API GitHub, sous votre identité.",
          "Vous choisissez le nom du dépôt, sa visibilité (public ou privé) et, éventuellement, la branche de destination. Si l'archive contient un seul dossier englobant, vous pouvez retirer ce dossier racine pour que le contenu soit placé directement à la racine du dépôt.",
        ],
      },
      {
        heading: "Dépôt public ou privé : le choix reste vôtre",
        paragraphs: [
          "La visibilité est un choix explicite au moment du push. Par défaut, RepoDrop crée un dépôt privé : même si vous oubliez de choisir, rien n'est exposé publiquement.",
          "Pour un projet à partager, choisissez public : le dépôt est immédiatement consultable par tout le monde, avec le contenu exact que vous avez vérifié dans l'aperçu.",
        ],
      },
      {
        heading: "Bonnes pratiques avant de pousser",
        paragraphs: [
          "Vérifiez toujours l'aperçu avant le push : c'est le seul moment où vous voyez exactement ce qui sera envoyé. Supprimez ou excluez ce que vous ne voulez pas publier.",
          "Notez que les dossiers `node_modules`, les `.git` embarqués et les fichiers système comme `.DS_Store` sont écartés par défaut. Si votre archive contient des données sensibles (clés, tokens), vérifiez qu'elles ne sont pas incluses avant de pousser vers un dépôt public.",
        ],
      },
    ],
    steps: [
      "Connectez votre compte GitHub sur RepoDrop (OAuth, jeton chiffré, jamais stocké).",
      "Déposez votre archive : extraction et aperçu immédiats.",
      "Choisissez le nom, la visibilité (public ou privé) et poussez : le dépôt est créé avec le contenu.",
    ],
    faq: [
      {
        question: "Puis-je créer un dépôt privé depuis une archive ?",
        answer:
          "Oui. La visibilité est un choix explicite au push, et le défaut est privé : le dépôt est créé privé si vous ne choisissez rien, ce qui évite toute publication accidentelle.",
      },
      {
        question: "Est-ce que le dépôt créé contient l'historique git ?",
        answer:
          "Le dépôt contient un commit initial portant l'intégralité du contenu extrait. Vous pouvez ensuite continuer avec git normalement ou importer de nouvelles archives : chaque push crée un nouveau commit.",
      },
      {
        question: "Que deviennent mes fichiers après le push ?",
        answer:
          "L'espace temporaire d'extraction est purgé automatiquement après le push. Seul le contenu que vous avez validé dans l'aperçu reste sur GitHub, dans le dépôt choisi.",
      },
    ],
    related: [
      "importer-rar-sur-github",
      "envoyer-du-code-sur-github-sans-git",
      "importer-zip-sur-github",
    ],
  },
  {
    slug: "televerser-du-code-sur-github",
    title: "Téléverser du code sur GitHub : le guide complet",
    description:
      "Téléversez du code sur GitHub sans terminal ni git : déposez une archive .rar, .zip ou .tar, prévisualisez le contenu et poussez vers un dépôt GitHub en un clic.",
    keywords: [
      "téléverser du code sur github",
      "televerser code github",
      "uploader du code github",
      "envoyer du code github",
      "téléverser fichier github",
    ],
    datePublished: "2026-11-07",
    dateModified: "2026-11-07",
    intro:
      "Vous avez du code à téléverser sur GitHub et vous cherchez une méthode sans terminal, sans git installé, sans clone ni configuration. RepoDrop téléverse votre code sur GitHub depuis une simple archive : le contenu est extrait, vérifié dans un aperçu, puis poussé vers le dépôt choisi — en quelques clics.",
    sections: [
      {
        heading: "Le téléversement sans terminal, étape par étape",
        paragraphs: [
          "Le flux est volontairement simple : connectez votre compte GitHub, déposez l'archive contenant votre code (format .rar, .zip, .tar ou .tar.gz), consultez l'aperçu des fichiers extraits, puis choisissez le dépôt et poussez. Aucune commande à taper, aucune clé à gérer.",
          "L'extraction est effectuée côté serveur dans un espace sandboxé : les chemins sont vérifiés (anti zip-slip) et les plafonds de taille et de nombre de fichiers appliqués avant toute écriture. Ce que vous voyez dans l'aperçu est exactement ce qui sera téléversé.",
        ],
      },
      {
        heading: "Code source, documentation, projet complet",
        paragraphs: [
          "Le téléversement conviendre aussi bien à un projet complet qu'à des fichiers isolés : une archive contenant votre code source, une documentation, un jeu de données ou l'export d'un outil. Le contenu est poussé sous forme de commit unique, avec l'historique propre du dépôt GitHub.",
          "Si l'archive contient un unique dossier englobant (par exemple `mon-projet/`), RepoDrop propose de retirer ce dossier racine pour placer vos fichiers directement à la racine du dépôt. Les `node_modules`, `.git` embarqués et fichiers système comme `.DS_Store` sont écartés par défaut.",
        ],
      },
      {
        heading: "Confidentialité du téléversement",
        paragraphs: [
          "L'authentification utilise OAuth GitHub : le jeton chiffré (cookie httpOnly JWE) reste dans votre navigateur, il n'est jamais stocké en base de données ni dans les journaux. Aucun credential en ligne de commande n'est impliqué.",
          "Vous gardez le contrôle jusqu'au dernier instant : l'aperçu s'affiche avant tout envoi. Si vous poussez vers un dépôt public, vérifiez que l'archive ne contient pas de données sensibles (clés, tokens, fichiers confidentiels).",
        ],
      },
    ],
    steps: [
      "Connectez votre compte GitHub sur RepoDrop (OAuth, jeton chiffré, jamais stocké).",
      "Déposez l'archive contenant votre code — extraction et aperçu immédiats.",
      "Vérifiez le contenu dans l'aperçu, choisissez le dépôt et poussez.",
    ],
    faq: [
      {
        question: "Puis-je téléverser du code sur GitHub sans installer git ?",
        answer:
          "Oui. RepoDrop exécute le téléversement côté serveur via l'API GitHub sous votre identité : l'extraction, la création du dépôt, le commit et le push se font sans aucune installation ou configuration git locale.",
      },
      {
        question: "Quelles archives puis-je téléverser ?",
        answer:
          "Les formats RAR (RAR4/RAR5), ZIP, TAR, TAR.GZ et TGT sont détectés automatiquement par leurs octets magiques. Les limites par défaut sont 200 Mo compressés, 500 Mo décompressés et 20 000 fichiers.",
      },
      {
        question: "Mon code est-il visible par tout le monde ?",
        answer:
          "Ce n'est pas le cas par défaut : le dépôt est créé privé si vous ne choisissez pas la visibilité. Pour un projet à partager, choisissez explicitement un dépôt public au moment du push.",
      },
    ],
    related: [
      "importer-du-code-sur-github",
      "publier-du-code-sur-github",
      "importer-zip-sur-github",
    ],
  },
  {
    slug: "importer-du-code-sur-github",
    title: "Comment importer du code sur GitHub",
    description:
      "Importez du code sur GitHub sans git ni terminal : déposez une archive .rar, .zip ou .tar, prévisualisez le contenu extrait et poussez vers un dépôt GitHub en un seul clic.",
    keywords: [
      "importer du code sur github",
      "comment importer du code sur github",
      "importer code github",
      "ajouter du code sur github",
      "import code github archive",
    ],
    datePublished: "2026-11-07",
    dateModified: "2026-11-07",
    intro:
      "Vous partez d'un dossier de code ou d'une archive et vous voulez l'avoir sur GitHub. Avec RepoDrop, importer du code sur GitHub se résume à trois gestes : connecter son compte, déposer l'archive, pousser. Pas de git, pas de terminal, pas de clone — le code arrive sur GitHub sous votre identité, dans un dépôt que vous choisissez.",
    sections: [
      {
        heading: "Pourquoi importer du code sur GitHub autrement",
        paragraphs: [
          "L'import classique suppose d'installer git, d'initialiser un dépôt, d'ajouter les fichiers et de pousser — une série d'étapes qui décourage souvent quand le code arrive sous forme d'archive (.rar, .zip, .tar) plutôt que sous forme de dépôt.",
          "RepoDrop remplace cette séquence par une interface dans le navigateur : l'archive est extraite côté serveur, son contenu est indexé et prévisualisé, puis poussé vers GitHub avec un commit propre. Le résultat est identique à un import git classique, sans aucune commande.",
        ],
      },
      {
        heading: "Ce qui est importé, et comment le vérifier",
        paragraphs: [
          "L'aperçu des fichiers s'affiche avant tout envoi : vous voyez l'arborescence complète, les dossiers et fichiers, et vous pouvez décider de retirer le dossier racine unique ou d'exclure certains éléments avant le push.",
          "Les dossiers `node_modules`, les `.git` embarqués et les fichiers système (`.DS_Store`, `__MACOSX`) sont écartés par défaut. Si l'archive contient un seul dossier englobant, vous pouvez le retirer automatiquement pour que le code soit placé directement à la racine du dépôt.",
        ],
      },
      {
        heading: "Dépôt existant ou neuf",
        paragraphs: [
          "Vous importez du code dans un dépôt qui existe déjà ? Poussez sur une branche dédiée (par exemple `import`) pour préserver la branche principale, ou choisissez explicitement le remplacement complet du code avec confirmation.",
          "Vous créez un dépôt neuf ? Choisissez le nom et la visibilité : public pour un projet à partager, privé par défaut pour un code confidentiel. Tout est exécuté côté serveur sous votre identité GitHub.",
        ],
      },
    ],
    steps: [
      "Connectez votre compte GitHub sur RepoDrop (OAuth, jeton chiffré, jamais stocké).",
      "Déposez l'archive contenant votre code — extraction, indexation et aperçu.",
      "Vérifiez l'aperçu, choisissez le dépôt (neuf ou branche dédiée) et poussez.",
    ],
    faq: [
      {
        question: "Est-ce que l'import du code sur GitHub garde un historique ?",
        answer:
          "Oui. Chaque import crée un commit sur GitHub. Si vous importez à nouveau par la suite, un nouveau commit s'ajoute à l'historique du dépôt, exactement comme avec git.",
      },
      {
        question: "Puis-je importer du code dans un dépôt existant ?",
        answer:
          "Oui. Vous pouvez pousser sur une branche dédiée d'un dépôt existant afin de préserver le contenu actuel, ou choisir explicitement le remplacement complet du code avec confirmation.",
      },
      {
        question: "Mon jeton GitHub est-il stocké après l'import ?",
        answer:
          "Non. Le jeton OAuth est conservé uniquement dans un cookie chiffré (JWE A256GCM) dans votre navigateur : il n'est jamais écrit en base de données ni dans les journaux.",
      },
    ],
    related: [
      "televerser-du-code-sur-github",
      "publier-du-code-sur-github",
      "envoyer-du-code-sur-github-sans-git",
    ],
  },
  {
    slug: "publier-du-code-sur-github",
    title: "Publier du code sur GitHub sans git ni terminal",
    description:
      "Publiez du code sur GitHub sans git, sans clone ni ligne de commande : déposez une archive .rar, .zip ou .tar, prévisualisez le contenu et poussez vers un dépôt public ou privé.",
    keywords: [
      "publier du code sur github",
      "comment publier du code sur github",
      "publish code github sans git",
      "publier code github archive",
      "github sans terminal",
    ],
    datePublished: "2026-11-07",
    dateModified: "2026-11-07",
    intro:
      "Publier du code sur GitHub est souvent synonyme de lignes de commande, de clone et de configuration git. RepoDrop fait l'inverse : une archive déposée dans le navigateur devient un dépôt GitHub public ou privé, avec le code poussé en un clic — sans terminal, sans git, sans clone.",
    sections: [
      {
        heading: "Publication en un clic, sans ligne de commande",
        paragraphs: [
          "Le chemin de publication est : connexion GitHub, dépôt de l'archive, aperçu du contenu, choix du dépôt et push. L'extraction, la création du dépôt et le push sont exécutés côté serveur via l'API GitHub, sous votre identité — aucun git installé, aucune commande tapée.",
          "Le commit créé porte l'intégralité du contenu validé dans l'aperçu. Le dépôt GitHub est ensuite consultable, clonable ou collaborable comme n'importe quel autre dépôt.",
        ],
      },
      {
        heading: "Public ou privé : le choix reste vôtre",
        paragraphs: [
          "La visibilité est un choix explicite au moment du push. Le défaut est **privé** : même si vous oubliez de choisir, rien n'est exposé publiquement. Pour un projet à partager, choisissez public — le dépôt est immédiatement consultable.",
          "Vous pouvez aussi publier sur une branche dédiée d'un dépôt existant (par exemple `publier`) pour préserver le contenu principal, ou choisir le remplacement complet du code avec confirmation.",
        ],
      },
      {
        heading: "Vérifiez avant de publier",
        paragraphs: [
          "L'aperçu des fichiers s'affiche **avant** toute publication : c'est le dernier moment où vous voyez exactement ce qui sera poussé. Supprimez ou excluez ce que vous ne voulez pas publier.",
          "Notez que les `node_modules`, les `.git` embarqués et les fichiers système sont écartés par défaut. Si vous publiez un dépôt public, vérifiez que l'archive ne contient pas de clés, tokens ou données confidentielles.",
        ],
      },
    ],
    steps: [
      "Connectez votre compte GitHub sur RepoDrop (OAuth, jeton chiffré, jamais stocké).",
      "Déposez l'archive : extraction et aperçu immédiats.",
      "Vérifiez l'aperçu, choisissez la visibilité (public ou privé) et poussez.",
    ],
    faq: [
      {
        question: "Puis-je publier du code sur un dépôt public ?",
        answer:
          "Oui. Choisissez la visibilité « public » au moment du push : le dépôt est immédiatement consultable par tout le monde, avec le contenu exact que vous avez vérifié dans l'aperçu.",
      },
      {
        question: "Quelle est la différence avec git push ?",
        answer:
          "Le résultat est identique : un commit portant le contenu poussé sur la branche choisie. RepoDrop exécute ces opérations côté serveur via l'API GitHub, sans que vous ayez à installer ou utiliser git.",
      },
      {
        question: "Puis-je publier du code sur une branche existante ?",
        answer:
          "Oui. Vous pouvez pousser sur une branche dédiée d'un dépôt existant pour préserver le contenu actuel, ou choisir explicitement le remplacement complet du code avec confirmation.",
      },
    ],
    related: [
      "importer-du-code-sur-github",
      "televerser-du-code-sur-github",
      "envoyer-du-code-sur-github-sans-git",
    ],
  },
] as const satisfies readonly Guide[];

/** Slugs des guides, dans l'ordre d'affichage. */
export const GUIDE_SLUGS: readonly string[] = GUIDES.map((g) => g.slug);

/** The localized editions share instructions and FAQs where the workflow is
 * the same, while retaining an introduction and advice specific to each guide.
 * Do not derive URLs, dates or related links from translated text.
 */
export function getGuides(locale: Locale = DEFAULT_LOCALE): readonly Guide[] {
  if (locale === DEFAULT_LOCALE) return GUIDES;
  const { guides: copy, home, faq } = getDictionary(locale);
  const formats = { question: faq.q2, answer: fill(faq.a2, {
    upload: formatBytes(config.limits.maxUploadBytes, locale),
    extract: formatBytes(config.limits.maxExtractBytes, locale),
    files: formatNumber(config.limits.maxFiles, locale),
  }) };
  const privacy = { question: faq.q3, answer: faq.a3 };
  const existing = { question: faq.q4, answer: faq.a4 };
  const filters = { question: faq.q5, answer: faq.a5 };
  const history = { question: copy.historyQ, answer: copy.historyA };
  const visibility = { question: copy.privateQ, answer: copy.privateA };
  const allFormats = ".rar, .zip, .tar, .tar.gz, .tgz";
  const editions: Record<(typeof GUIDES)[number]["slug"], {
    title: string;
    intro: string;
    format?: string;
    topic: GuideFaqItem;
    questions: GuideFaqItem[];
  }> = {
    "importer-rar-sur-github": {
      title: fill(copy.formatTitle, { format: "RAR" }), intro: copy.rarIntro, format: "RAR",
      topic: formats, questions: [privacy, existing],
    },
    "importer-zip-sur-github": {
      title: fill(copy.formatTitle, { format: "ZIP" }), intro: copy.zipIntro, format: "ZIP",
      topic: filters, questions: [formats, existing],
    },
    "importer-tar-sur-github": {
      title: fill(copy.formatTitle, { format: "TAR" }), intro: copy.tarIntro, format: ".tar / .tar.gz / .tgz",
      topic: formats, questions: [existing, filters],
    },
    "envoyer-du-code-sur-github-sans-git": {
      title: copy.noGitTitle, intro: copy.noGitIntro,
      topic: history, questions: [formats, privacy],
    },
    "creer-un-depot-github-depuis-une-archive": {
      title: copy.newRepoTitle, intro: copy.newRepoIntro,
      topic: visibility, questions: [history, privacy],
    },
    "televerser-du-code-sur-github": {
      title: copy.uploadTitle, intro: copy.uploadIntro,
      topic: formats, questions: [visibility, privacy],
    },
    "importer-du-code-sur-github": {
      title: copy.importTitle, intro: copy.importIntro,
      topic: existing, questions: [history, filters],
    },
    "publier-du-code-sur-github": {
      title: copy.publishTitle, intro: copy.publishIntro,
      topic: visibility, questions: [existing, history],
    },
  };

  return GUIDES.map((source) => {
    const edition = editions[source.slug];
    return {
      ...source,
      title: edition.title,
      description: edition.intro,
      intro: edition.intro,
      keywords: [edition.title, edition.format ?? allFormats],
      steps: [home.step1Title, fill(copy.dropFormat, { format: edition.format ?? allFormats }), copy.review],
      sections: [
        { heading: edition.topic.question, paragraphs: [edition.topic.answer] },
        { heading: home.feature2Title, paragraphs: [copy.safeArchive] },
      ],
      faq: edition.questions,
    };
  });
}

export function getGuide(slug: string, locale?: Locale): Guide | undefined {
  return getGuides(locale).find((g) => g.slug === slug);
}

/** Search the edition being displayed, with case and accent folding. */
export function searchGuides(query: string, locale: Locale = DEFAULT_LOCALE): Guide[] {
  const normalize = (text: string) => text.trim().toLocaleLowerCase(locale)
    .normalize("NFD").replace(/(?<=\p{Script=Latin})\p{Mark}+/gu, "").normalize("NFC");
  const q = normalize(query);
  if (!q) return [];
  return getGuides(locale).filter((g) => normalize([
    g.title,
    g.description,
    g.intro,
    ...g.keywords,
    ...g.steps,
    ...g.sections.flatMap((s) => [s.heading, ...s.paragraphs]),
    ...g.faq.flatMap((f) => [f.question, f.answer]),
  ].join(" ")).includes(q));
}
