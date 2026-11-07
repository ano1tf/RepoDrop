# RepoDrop

> **Vos archives de code, sur GitHub, en un glisser-déposer.**
> Un `.rar`, un `.zip` ou un `.tar` → un dépôt GitHub. Sans terminal, sans clone, sans configuration git.

RepoDrop est un outil web (interface 100 % française) qui :

1. se connecte à **votre** GitHub (OAuth, scopes `repo` + `workflow`) ;
2. reçoit votre **archive `.rar` / `.zip` / `.tar[.gz]`** ;
3. l'extrait dans un **espace sandboxé** (chemins vérifiés, anti-bombes) ;
4. vous montre un **aperçu complet** avant tout envoi ;
5. **pushe** le contenu dans un dépôt neuf ou existant, avec votre identité GitHub ;
6. tient un **journal d'activité** (qui a poussé quoi, et quand) et un **bot Discord**
   qui ping le site toutes les 10 minutes — le tout pilotable depuis un **panel staff**.

---

## Démarrage rapide

### 1. Créer l'application OAuth GitHub

Allez sur [github.com/settings/developers → New OAuth App](https://github.com/settings/developers) :

| Champ | Valeur |
|---|---|
| Application name | `RepoDrop` (ou ce que vous voulez) |
| Homepage URL | `http://localhost:3000` |
| Authorization callback URL | `http://localhost:3000/api/auth/callback` |

Copiez le *Client ID* et générez un *Client secret*.

### 2. Configurer l'environnement

```bash
cp .env.example .env
# éditez .env :
#   GITHUB_CLIENT_ID / GITHUB_CLIENT_SECRET
#   SESSION_SECRET   → openssl rand -hex 32
#   STAFF_LOGINS     → votre ID GitHub (stable) ou votre login (panel staff)
```

Variables importantes :

| Variable | Rôle | Défaut |
|---|---|---|
| `GITHUB_CLIENT_ID` / `GITHUB_CLIENT_SECRET` | OAuth App GitHub. **Important :** déclarer les scopes `repo` et `workflow` dans l'OAuth App (sans `workflow`, GitHub rejette les push qui touchent à `/.github/workflows/`). | — |
| `APP_URL` | URL publique (callback OAuth + sonde de disponibilité) | `http://localhost:3000` |
| `SESSION_SECRET` | Chiffrement du cookie de session **et du jeton Discord** | — |
| `DEV_AUTH=1` | Bouton « connexion directe » via `GH_TOKEN` du serveur (**dev uniquement**) | off |
| `STAFF_LOGINS` | Comptes autorisés sur `/staff` : **ID numérique** (stable) ou login, séparés par des virgules — cf. [changement de pseudo](#changement-de-pseudo-github) | — |
| `DISCORD_BOT_TOKEN` / `DISCORD_WEBHOOK_URL` | Amorçage du bot (aussi configurable depuis le panel) | — |
| `DISCORD_CHANNEL_ID` | Canal cible du bot | — |
| `DISCORD_PING_MINUTES` | Période du ping de disponibilité | `10` |
| `MAX_UPLOAD_MB` | Poids max d'une archive | `200` |
| `MAX_EXTRACT_MB` | Poids max décompressé (anti-bombe) | `500` |
| `MAX_FILES` | Nombre max de fichiers | `20000` |

### 3. Lancer

```bash
npm install
npm run dev          # http://localhost:3000
```

ou en production :

```bash
cp .env.example .env   # remplir les valeurs
docker compose up -d --build
```

### 4. Derrière un proxy (preview, ingress, tunnel)

L'app est prévue pour tourner derrière un proxy qui termine le TLS :

- les **redirections** sont *relatives* (`Location: /import`) : le navigateur les
  résout sur l'origine courante — jamais sur l'adresse interne du serveur
  (`0.0.0.0`, qui n'est pas navigable) ;
- le cookie de session est marqué `Secure` seulement si la requête arrive
  vraiment en HTTPS (`x-forwarded-proto`, ou `APP_URL` si l'hôte correspond) ;
- `APP_URL` doit pointer sur l'URL publique **et** correspondre à l'URL de
  callback déclarée dans l'OAuth App GitHub.

En développement, `next.config.ts` autorise les origines de preview via
`allowedDevOrigins` (sinon Next bloque les ressources `/_next/*`).

```bash
# écouter sur toutes les interfaces (obligatoire derrière un proxy)
npx next dev -H 0.0.0.0 -p 10000
```

---

## Utilisation

1. **Connexion** avec GitHub (scopes `repo` et `workflow`). L'écran de connexion liste ces scopes et leur raison.
2. **Importer** → glisser-déposer du `.rar`, `.zip`, `.tar` ou `.tar.gz`.
3. **Aperçu** : fichiers, poids, dossier racine, `node_modules`, filtres.
4. **Destination** :
   - **Nouveau dépôt** : nom + privé/public ;
   - **Dépôt existant** : choisissez parmi vos dépôts (droits d'écriture vérifiés côté API) ;
   - option **branche dédiée** pour ne jamais toucher à la branche par défaut ;
   - option **« Remplacer tout le code »** (dépôt existant, confirmation explicite) : le dépôt contiendra exactement les fichiers de l'archive — ceux absents de l'archive sont supprimés — et le push est forcé, donc il réussit même si le dépôt a avancé entre-temps (fini le rejet `[rejected] … (fetch first)`). L'historique est conservé : le remplacement est un nouveau commit par-dessus. Si un push classique échoue pour cette raison, l'écran d'échec propose directement de **réessayer en remplaçant tout le code**, sans ré-uploader l'archive.
5. **Pousser** → commit créé sous `votre-login <votre-login@users.noreply.github.com>`, suivi en direct, lien vers le dépôt.
6. **Liens IA** : après le push, RepoDrop affiche une série de liens prêts à donner à un agent IA / humain :
   - URL GitHub classique, branche, commit et **Codespaces** (`vscode.dev` + Copilot intégrés) ;
   - URL **`vscode.dev`** (éditeur web officiel) ;
   - URL de clone HTTPS (l'agent s'authentifie lui-même via sa session GitHub) ;
   - commande **`gh repo clone`** prête à copier ;
   - téléchargement du code en **`.zip`** (`GET /api/jobs/[id]/download`, node_modules exclus).

### Formats d'archives

| Format | Lecteur | Notes |
|---|---|---|
| `.zip` | `yauzl` (streaming) | deflate/stored ; archives chiffrées refusées |
| `.rar` | `node-unrar-js` en WASM, **processus enfant isolé** | RAR4 & RAR5 ; volumes multi-parties non supportés |
| `.tar` | lecteur **ustar/GNU/PAX maison**, zéro dépendance | noms longs GNU (`L`) et PAX (`x`), préfixes ustar |
| `.tar.gz` / `.tgz` | idem + `zlib` en streaming | décompression à la volée, jamais en mémoire |

Détection par **magic bytes** (pas par l'extension) : `ustar` est lu à l'octet 257,
et pour un `.tar.gz` le début du flux est décompressé en mémoire tampon avant
décision. Les dossiers `.tar` sont donc acceptés au même titre que les archives.

---

## Mes dépôts (`/repos`)

Parcourir avant d'importer : la page liste les dépôts visibles par votre jeton
(propriétaire + collaborateur, 300 au plus, les plus récents d'abord), avec
filtre, tri et un mode « les miens ».

| Ce qu'on peut faire | Comment |
|---|---|
| Voir le contenu d'un dépôt | clic sur un dépôt → arborescence, dossier par dossier |
| Lire un fichier | clic sur le fichier : texte décodé, n° de lignes, langage, copie |
| Changer de branche | sélecteur en haut du dépôt |
| Renommer | onglet **Actions** → « Renommer / décrire » |
| Passer public/privé | onglet **Actions** → visibilité |
| Supprimer | onglet **Actions** → il faut retaper `owner/repo` |
| **Télécharger en archive** | boutons **.zip** / **.tar.gz** en haut du dépôt |

Garde-fous :

- **chemins validés** : `..`, chemins absolus et octets nuls sont refusés avant
  même d'appeler GitHub ;
- **aperçu borné** : au-delà de 512 Ko, rien n'est transféré (lien vers GitHub) ;
  un contenu non décodable en UTF-8 est signalé binaire, jamais deviné ;
- **jamais d'HTML interprété** : le contenu s'affiche en texte dans un `<pre>`,
  donc un `README.md` ou un SVG hostile ne peut rien exécuter ;
- **droits vérifiés** : les boutons sont désactivés sans `push`/`admin` ;
- **traçabilité** : renommage, changement de visibilité et suppression sont
  journalisés dans le flux d'activité du panel staff (qui, quoi, quand, IP).

### Télécharger un dépôt en .zip / .tar.gz

Deux boutons en haut de chaque dépôt, qui suivent la **branche sélectionnée** :
`GET /api/repos/<owner>/<repo>/archive?format=zip|tar.gz&ref=<branche>`.

- le corps est **streamé** : l'archive ne passe jamais entièrement en mémoire du
  serveur ;
- la taille annoncée par GitHub est contrôlée **avant le premier octet envoyé**
  (plafond `MAX_ARCHIVE_MB`, 250 Mo par défaut) — au-delà, refus explicite ;
- c'est un simple lien : le navigateur affiche la progression et enregistre le
  fichier sous un nom lisible (`mon-projet-main.zip`), y compris avec des
  caractères non ASCII (`filename*`, RFC 5987) ;
- chaque téléchargement est journalisé (qui, quel dépôt, format, branche, poids).

> La suppression exige le scope OAuth **`delete_repo`**, désormais demandé à la
> connexion. Un compte déjà connecté doit se **reconnecter** pour l'obtenir ;
> sans lui GitHub répond 404 et l'application l'explique explicitement.

---

## Panel staff (`/staff`)

Aucun bouton visible n'y mène : c'est un outil staff. Trois portes discrètes,
toutes équivalentes :

1. **le logo RepoDrop du pied de page** (le carré vert, à gauche du nom) ;
2. le **point quasi invisible** en bas à droite du pied de page (5 clics) ;
3. la séquence **Konami** `↑ ↑ ↓ ↓ ← → ← → B A`.

### Deux verrous cumulatifs

La porte n'est qu'un raccourci : **tout se décide côté serveur**, dans
`checkStaff()`, par où passent la page *et* toutes les API `/api/staff/*`.

| Verrou | Réglage | Effet s'il manque |
|---|---|---|
| 1. Allowlist | `STAFF_LOGINS=id1,login2` | écran « accès restreint », API en 403 |
| 2. Mot de passe | onglet **Sécurité** du panel, ou `STAFF_PASSWORD` | écran de saisie, API en 403 `locked` |

#### Changement de pseudo GitHub

GitHub **ne redirige pas** les profils : dès qu'un compte est renommé
(`DimalaxYT` → `ano1tf`), l'ancien login répond `404` et devient immédiatement
réclamable par n'importe qui. Conséquences pour l'allowlist :

- une entrée écrite avec un **ancien login** ne reconnaît plus son propriétaire
  — et, si quelqu'un reprend le pseudo libéré, elle ouvrirait le panel à cet
  inconnu ;
- l'**identifiant numérique** du compte (`GET /user` → `id`), lui, ne change
  jamais : `STAFF_LOGINS=98652864` reste valable à vie, renommages compris.

Donc : **privilégiez l'ID numérique** ; les logins restent acceptés par
commodité. L'ID de la session est stocké dans le cookie chiffré
(`SessionData.id`) et comparé sans le moindre appel réseau. Si vous perdez
l'accès, l'écran « accès restreint » de `/staff` affiche l'ID à recopier tel
quel dans `STAFF_LOGINS` — un redémarrage suffit ensuite.

Le mot de passe est **haché en scrypt** (sel aléatoire, `N=16384`) avant
d'être écrit en base : il n'est jamais renvoyé par l'API, jamais journalisé, et
personne ne peut le relire — pas même depuis le panel. Sa validation est portée
par le **cookie de session chiffré** (`staffUnlocked`), donc :

- elle ne vaut que pour la session en cours (7 jours max), jamais partagée ;
- la déconnexion, ou le bouton « Verrouiller maintenant », la supprime ;
- changer le mot de passe ne vous éjecte pas de votre propre session.

Après **6 échecs**, l'IP est suspendue 15 minutes (`429`), même avec le bon mot
de passe. Une simple faute de frappe ne bloque rien : le seuil n'est atteint
qu'au sixième échec consécutif.

Sans mot de passe défini, l'allowlist suffit (comportement d'origine).

Quatre onglets :

### 1. Activité

Le journal répond à « **qui a poussé du code, et à quelle heure ?** » :

| Colonne | Contenu |
|---|---|
| Horodatage | heure exacte + relatif (« il y a 4 min »), date complète au survol |
| Utilisateur | avatar GitHub + login |
| Événement | `push` (réussi/échec), `upload`, `login`, `settings`, `discord` |
| Détails | dépôt, branche, SHA (liens GitHub), nb de fichiers, volume, nom de l'archive, IP |

Filtres (type, utilisateur, recherche libre), rafraîchissement automatique
15 s, pagination et **export CSV**.

### 2. Discord

Le **jeton Discord se configure ici** :

- jeton de **bot** (Portail développeurs → Bot → Reset Token) **ou** URL de **webhook** ;
- identifiant du **canal** ;
- **période du ping** (défaut 10 min, bornée de 1 à 1440) ;
- options : ping périodique, annonce des push, alerte si le site ne répond plus,
  mention en cas de panne, URL sondée ;
- boutons : **Tester le jeton**, **Message de test**, **Ping maintenant**,
  **Démarrer/Arrêter**.

Le jeton est **write-only** : chiffré en AES-256-GCM (clé dérivée de
`SESSION_SECRET`) avant d'aller en base, jamais renvoyé au navigateur — l'API ne
retourne qu'un masque (`MTok…••••1a2b`) et un booléen « configuré ».

### 3. Système

Historique de disponibilité (chaque sonde du bot, 7 jours), latence moyenne,
et l'état de la configuration (limites, `SESSION_SECRET`, comptes staff,
`DEV_AUTH`).

### Le bot Discord

`lib/discord/` contient un client Discord **sans dépendance externe** :

- **REST** pour envoyer les messages (`POST /channels/:id/messages`, ou le
  webhook) ;
- **Gateway** (`wss://gateway.discord.gg`, opcodes HELLO/IDENTIFY/HEARTBEAT/
  READY) pour que le bot apparaisse **en ligne** et pour mesurer sa latence ;
  reconnexion en backoff, arrêt net si le jeton est refusé (4004).

Toutes les 10 minutes (configurable) :

1. `GET <APP_URL>/api/health` → latence et code HTTP mesurés ;
2. la sonde est enregistrée en base (historique de disponibilité) ;
3. un **embed** est publié sur Discord : réponse, latence, disponibilité 24 h,
   nombre de push, URL sondée. En cas de panne, le message passe au rouge et
   porte la mention configurée (`@here`, un rôle…) ; au retour, un message
   « de retour » est envoyé.

Chaque push (réussi ou échoué) peut aussi être annoncé : utilisateur, dépôt,
branche, commit, volume, horodatage.

---

## Sécurité & limites

| Risque | Protection |
|---|---|
| Zip-slip / path traversal (`../`, `C:\`, absolu) | Sanitisation systématique (`lib/sanitize.mjs`), **refus intégral** de l'archive en cas d'attaque |
| Bombes de décompression | Cumul des tailles déclarées **avant** écriture + compteur réel, `MAX_EXTRACT_MB` / `MAX_FILES` |
| Symlinks (zip, rar, tar) | Écartés (zip/tar) ou matérialisés en fichiers réguliers vides (rar) — aucun lien créé |
| Hardlinks `.tar` | Écartés et comptés séparément |
| Motif « fichier + ancêtre » (`up` puis `up/x`) | Contrôle structurel → archive refusée |
| `.tar` corrompu / tronqué | Somme de contrôle de chaque en-tête + taille écrite vérifiée |
| `.git/` embarqué | Toujours ignoré (`.gitignore`, `.gitattributes` conservés) |
| Token GitHub | **Jamais en base, jamais en log** : cookie chiffré httpOnly (JWE A256GCM) ; push via `GIT_ASKPASS` (env), jamais dans les arguments de process |
| Token Discord | Chiffré en base (AES-256-GCM), **jamais renvoyé** par l'API, absent des logs et du journal |
| Panel staff | Allowlist `STAFF_LOGINS`, vérifiée côté serveur sur la page **et** sur chaque API (401/403) |
| Rate-limit | 30 uploads/h par IP, 10 poussées/h par utilisateur (persistant en base) |
| Fichiers > 100 Mo | Avertissement dans l'aperçu (limite GitHub) |

Limite de taille par défaut : **200 Mo** uploadés, **500 Mo** décompressés, **20 000** fichiers.

---

## Tests

```bash
npm test
```

359 tests couvrent :

- sanitisation (traversal Unix/Windows, absolus, NUL, profondeur) ;
- extraction `.zip` réelle (fixtures `yazl` : nominal, bombes, symlinks, `.git`, limites) ;
- extraction `.rar` réelle via le **worker enfant** (fixtures RAR4/RAR5, unicode, mot de passe, volumes, symlink traversal) ;
- extraction `.tar` / `.tar.gz` **réelles** (archives produites par GNU tar : ustar, GNU longname, PAX, symlinks, hardlinks, bit exécutable) et **hostiles** (traversal, absolu, bombe, somme de contrôle fausse, troncature, conflit fichier/ancêtre) ;
- détection de format (magic bytes zip/rar/tar, `.tar.gz` décompressé, `.tgz` trop court) ;
- flux git complet (`init → fetch → overlay → commit → push`) contre un **dépôt bare local** ;
- bot Discord : construction des embeds, routage webhook/bot, poignée de main Gateway (faux WebSocket), cycle du moniteur (sonde, ping forcé, push, panne) ;
- réglages chiffrés (aucun secret en clair dans SQLite), journal d'activité, sondes de disponibilité ;
- contrôle d'accès staff (`STAFF_LOGINS`, mode dev) ;
- chiffrement de session et reconstruction de l'URL publique derrière un proxy ;
- **rate-limit persisté** : fenêtre glissante, expiration, délai annoncé, isolation
  par clé, et surtout survie à un rechargement du module (les compteurs sont en
  base, plus en mémoire — un redémarrage ne rend plus leurs essais aux clients) ;
- **garde-fous de la couche jobs** : `sanitizeBranch` / `sanitizeRepoName`
  refusent l'injection d'arguments git (nom commençant par `-`), les remontées
  `..`, les refnames invalides ; `jobOwnedBy` ne rend jamais le job d'un autre
  compte ;
- **client GitHub en intégration HTTP réelle** contre `tests/mock-github.mjs`
  (fausse API versionnée dans le dépôt) : URLs et query string, en-tête
  `Authorization`, itération des pages, mappage des statuts HTTP en codes
  métier, streaming d'archive octet pour octet ;
- **en-têtes de sécurité** : contenu de la CSP par environnement, directives
  obligatoires, et absence volontaire de `frame-ancestors` par défaut (l'aperçu
  s'affiche dans une iframe) ;
- **liens profonds `/repos`** : validation et aller-retour de l'état complet
  dépôt / branche / dossier / fichier, filtre, tri et « Les miens », y compris
  caractères Unicode et refus des chemins de traversée ;
- **balises SEO** : icônes (SVG + PNG + `apple-touch-icon`, fichiers réellement
  présents), manifeste installable avec entrée `maskable`, `noindex` des pages
  privées, absence de `twitter:site` par défaut, `@graph` sans `@id` orphelin et
  `lastmod` de sitemap déterministe (`SOURCE_DATE_EPOCH` / date éditoriale) ;
- **vérification Search Console** : jeton au format base64url exposé par
  `buildVerification()` (bloc `verification` des métadonnées Next.js) ;
- **i18n** : les 16 dictionnaires couvrent exactement les mêmes clés que le
  français, sans valeur vide, avec des placeholders `{…}` identiques, des
  traductions réellement effectuées, et un `normalizeLocale` qui refuse toute
  valeur non supportée plutôt que de l'injecter dans le cookie.

CI : GitHub Actions (lint + typecheck + tests + build) sur chaque push/PR.

### Liens profonds du navigateur de dépôts

L'écran `/repos` garde son état de navigation dans la query string :

```text
/repos?repo=dimalaxyt%2Fmon-projet&ref=main&path=src&file=src%2Findex.ts
```

Le dépôt, la branche, le dossier et le fichier consultés sont restaurés au
rafraîchissement et peuvent être partagés ; les boutons précédent/suivant du
navigateur naviguent entre dépôt, dossier et fichier. Le filtre, le tri et
« Les miens » sont aussi conservés (paramètres `q`, `sort`, `mine`). Les valeurs
par défaut sont omises pour garder des URL propres. Chaque paramètre est validé
avant utilisation : pas de `..`, de chemin absolu ni de branche mal formée.


### En-têtes de sécurité

Toutes les réponses portent une CSP, `X-Content-Type-Options: nosniff`,
`Referrer-Policy`, `Permissions-Policy`, `X-DNS-Prefetch-Control` et HSTS. La
logique vit dans `lib/security-headers.ts` (testée), câblée par `next.config.ts`.

Deux points à connaître :

- `script-src`/`style-src` conservent `'unsafe-inline'`, exigé par l'amorçage de
  Next.js ; `'unsafe-eval'` n'est ajouté qu'en développement (React Refresh).
- La protection anti-clickjacking est **opt-in** via `FRAME_ANCESTORS` (par
  exemple `'self'`), et cette variable est lue **au build** : Next.js fige
  `headers()` dans `.next/routes-manifest.json`.

`SESSION_SECRET` est par ailleurs **obligatoire en production** : sans lui, la
clé de session serait tirée au hasard, ce qui invaliderait les sessions et
rendrait illisible le jeton Discord chiffré à chaque redémarrage. Le serveur
refuse désormais de démarrer dans ce cas au lieu de le faire silencieusement.

### Balises SEO, partage et icônes

Tout est calculé dans `lib/seo.ts` (pur, testé) puis posé par les métadonnées
Next.js ; `next.config.ts` n'intervient pas.

| Surface | Balises produites |
| --- | --- |
| Titre | `title` + gabarit `%s · RepoDrop`, `application-name`, `author`, `creator`, `publisher`, `category`, `keywords` |
| Indexation | `robots` + `googlebot` (`max-image-preview:large`, snippets illimités) ; `noindex` sur `/login`, `/import`, `/repos`, `/jobs/*` et 404 |
| Canonique | `<link rel="canonical">` absolu résolu contre `metadataBase`, insensible aux `Host` forgés |
| OpenGraph | `og:title/description/url/site_name/locale/type` + `og:image` complet (`width`, `height`, `type`, `alt`) |
| Twitter/X | `twitter:card=summary_large_image`, titre, description, image ; `twitter:site`/`creator` **seulement** si `NEXT_PUBLIC_TWITTER_HANDLE` est défini |
| Icônes | SVG + PNG 192/512, `apple-touch-icon` 180, manifeste PWA avec entrée `maskable` |
| Données structurées | `@graph` lié par `@id` : `Organization` (logo raster), `WebSite`, `WebPage`, `ImageObject`, `WebApplication`, `FAQPage` |
| Vérification | `google-site-verification` (Search Console) sur toutes les pages HTML |
| Fichiers | `/sitemap.xml`, `/robots.txt`, `/manifest.webmanifest`, `/opengraph-image`, `/twitter-image` |

Quatre décisions qui évitent des pièges classiques :

- **Un seul `@graph`.** Les nœuds se référencent par `@id` (`WebPage.isPartOf`
  → `WebSite`, `WebApplication.publisher` → `Organization`) au lieu de décrire
  plusieurs entités concurrentes. Un test vérifie qu'aucune référence `@id` ne
  pointe dans le vide.
- **Logo raster.** Google exige un logo carré **PNG** (≥ 112 px) pour les
  résultats enrichis : `icon.svg` reste le favicon, mais
  `/icons/icon-512.png` sert de `Organization.logo`. Les PNG sont versionnés
  dans `public/icons/` (dérivés de `app/icon.svg`).
- **`lastmod` stable.** `/sitemap.xml` n'utilise ni `new Date()` à la requête ni
  la date du build : il lit `SOURCE_DATE_EPOCH`, sinon
  `SITE_CONTENT_LAST_MODIFIED` (`lib/seo.ts`, à remonter quand le contenu
  change). Un `lastmod` qui bouge à chaque crawl finit ignoré par les moteurs.
- **Jeton Search Console en dur, pas en secret.** `SITE_GOOGLE_SITE_VERIFICATION`
  (`lib/seo.ts`) est publié dans le HTML de chaque page : ce n'est pas un
  secret, et il doit être identique partout sous peine d'invalider la
  propriété vérifiée. `GOOGLE_SITE_VERIFICATION` permet de le surcharger pour
  un déploiement de test ; un jeton vide n'émet aucune balise.
- **Aperçus sociaux statiques.** `/opengraph-image` et `/twitter-image` sont
  rendus une fois (`dynamic = "force-static"`), l'image Twitter réexportant la
  même source pour ne jamais diverger. Les crawlers ne déclenchent donc plus de
  rendu ImageResponse, et l'URL reste stable pour les caches (Slack, Discord,
  X).

Vérification manuelle :

```bash
curl -s localhost:3000/ | grep -o '<meta name="twitter:[a-z]*"'
curl -s localhost:3000/sitemap.xml
curl -s localhost:3000/ | grep -o '<script type="application/ld+json">'
```

### Langues (16)

L'interface est traduite en **16 langues** : français, anglais, espagnol,
allemand, italien, portugais, néerlandais, polonais, russe, ukrainien, turc,
**arabe (RTL)**, hindi, chinois, japonais et coréen. Un sélecteur à recherche
vit dans l'en-tête ; le choix survit à la navigation et au redémarrage.

```
lib/i18n/
  locales.ts            # catalogue (code, nom natif, drapeau, dir, og:locale)
  types.ts              # Dict = DeepStringify<typeof fr> → complétude garantie
  dictionaries/*.ts     # 16 dictionnaires, fr = source de vérité des clés
  dictionary.ts         # Record<Locale, Dict> + accès (getDictionary, section)
  server.ts             # getLocale() / getT() : cookie → Accept-Language → fr
  format.ts             # fill("{upload} Mo") , placeholdersOf, formatNumber
  format-client.ts      # octets, dates relatives, nombres — utilisables en client
  errors.ts             # code d'erreur → message traduit (erreurs + api)
app/api/lang/route.ts   # POST validation stricte + cookie rd_lang (1 an)
app/api/lang/switch/     # GET ?to=xx&next=/chemin : bascule par lien, 307
app/langues/page.tsx     # /langues : galerie de démo, 16 cartes cliquables
components/LanguageSwitcher.tsx
```

Trois décisions et ce qu'elles évitent :

- **Typage plutôt que convention.** `Dict = DeepStringify<typeof fr>` rend
  impossible la compilation d'un dictionnaire incomplet : ajouter une clé en
  français casse les quinze autres fichiers jusqu'à traduction. Le test
  `tests/i18n.test.ts` complète ce que TypeScript ne voit pas (chaînes vides,
  placeholders divergents, phrases restées en français).
- **Cookie, pas préfixe d'URL.** La langue vit dans `rd_lang`, pas dans `/fr/`,
  `/en/`… RepoDrop n'a qu'une poignée de pages publiques : multiplier les URL
  canoniques et le sitemap pour du contenu non éditorialisé par langue
  n'apporterait rien, et casserait les liens déjà partagés. Conséquence
  assumée : l'indexation reste sur le français (voir plus haut).
- **RTL pris au sérieux.** `<html lang dir>` suivent la langue (`dir="rtl"` en
  arabe) ; la maquette et les puces utilisent `padding-inline-start` et
  `rtl:rotate-180` au lieu de `left`/`right`.
- **Erreurs par code, pas par phrase.** Une erreur naît dans le worker
  (extraction, push) ou dans une route API, deux endroits qui ne connaissent
  pas la langue de l'utilisateur au moment où elle survient. Le serveur ne
  transmet donc jamais de phrase : il renvoie `{ code, detail }`
  (`lib/errors.ts`), le job stocke `error_code` / `error_detail`, et
  `lib/i18n/errors.ts` traduit à l'affichage — côté serveur pour les pages,
  côté client pour les réponses JSON. Un job qui a échoué hier en français
  s'affiche en japonais si vous basculez la langue aujourd'hui ; un même
  journal d'activité reste lisible dans les seize langues. `errors.ts` garde
  un repli français (`frMessage`) pour les rares réponses non traduisibles
  (téléchargement direct d'une archive).

  Concrètement, tout ce qui restait en français est couvert : page de suivi
  d'import (`/jobs/[id]`), navigateur de dépôts (`/repos` : liste, filtres,
  arborescence, aperçu, renommage / visibilité / suppression), messages des
  routes API, `<title>` / `og:locale` du layout, manifeste PWA, et les
  valeurs chiffrées (`1,2 Mo` / `1.2 MB`, `il y a 3 min` / `3 minutes ago`,
  `1 234 fichiers`) via `lib/i18n/format-client.ts` — `Intl` fournit l'unité
  et la date relatives, aucune table d'unités à maintenir.

  Les 24 codes métier et 15 codes d'API ont chacun une clé dans les seize
  dictionnaires ; une table `Record<ErrorCode, keyof Dict["errors"]>`
  exhaustive fait échouer la compilation si un code est ajouté sans
  traduction.

Deux façons de changer de langue : le sélecteur de l'en-tête (sans JS requis
pour le rendu, `POST /api/lang` + `router.refresh()`) et des liens partageables
`/api/lang/switch?to=ja&next=/repos`. Cette route GET pose le cookie puis
redirige en 307 ; `next` est filtré par `safeNextPath` (chemins internes
uniquement, sinon `/`) pour ne pas devenir une redirection ouverte.
`/langues` sert de galerie de contrôle — les 16 cartes affichent le titre réel
et un aperçu du héros dans chaque langue.

Ajouter une langue :

1. entrée dans `LOCALES` (`lib/i18n/locales.ts`, avec `ogLocale`) ;
2. nouveau fichier `dictionaries/<code>.ts` typé `Dict` ;
3. une ligne dans `DICTIONARIES` — la compilation échoue tant que les trois
   ne sont pas faits.

---

## Architecture

```
app/                  # Next.js App Router — pages FR + routes API
  api/auth/*          # OAuth GitHub (login, callback, logout, dev-login)
  api/upload          # réception multipart (busboy, streaming vers /tmp)
  api/jobs/[id]       # statut du job + lancement du push
  api/repos           # dépôts où vous pouvez pousser
  api/health          # sonde de disponibilité (ping Discord)
  api/staff/*         # journal d'activité, réglages Discord, pilotage du bot
  staff/              # panel staff (accès contrôlé côté serveur)
components/
  ui/                 # primitives (button, card, badge, input, switch, spinner)
  staff/              # onglets Activité / Discord / Système
  SecretDoor.tsx      # porte cachée vers /staff (5 clics ou Konami)
lib/
  i18n/               # 16 langues : catalogue, dictionnaires, résolution serveur
  sanitize.mjs        # sanitisation partagée serveur + worker (ESM pur)
  extract/            # zip (yauzl v3) + rar (worker enfant) + tar (lecteur maison) + aperçu
  git.ts              # init/fetch/overlay/commit/push (token via GIT_ASKPASS)
  github.ts           # client REST GitHub (toujours avec le token de l'appelant)
  jobs.ts             # orchestrateur : extraction & push en tâche de fond
  session.ts          # cookie JWE chiffré
  db.ts               # SQLite (node:sqlite) : jobs, journal, réglages, sondes
  settings.ts         # réglages chiffrés (AES-256-GCM) — jeton Discord
  staff.ts            # allowlist STAFF_LOGINS
  seo.ts              # origine canonique, sitemap/robots, icônes, JSON-LD
  discord/            # client (REST + Gateway), messages, moniteur de ping
scripts/rar-extract.mjs   # worker .rar isolé (WASM unrar, killable)
tests/                # vitest + fixtures zip/rar/tar + dépôt bare local
```

**Flux de traitement :** `queued → extracting → ready → pushing → done | failed`
(dossier de travail éphémère purgé automatiquement ; un redémarrage marque les
jobs interrompus comme échoués ; chaque étape alimente le journal d'activité).

---

## Déploiement

```bash
cp .env.example .env      # APP_URL=https://votre-domaine, secrets, DEV_AUTH absent
docker compose up -d --build
```

- Le callback OAuth doit correspondre à `APP_URL` : `https://domaine/api/auth/callback`.
- La base SQLite est montée dans un volume (`repodrop-data`) : jobs, journal
  d'activité, réglages Discord et historique de sondes y sont conservés.
- Le conteneur tourne en non-root, avec `git` et les certificats TLS.
- Le bot Discord a besoin d'un accès sortant vers `discord.com` (443) et vers
  `APP_URL` pour la sonde.

---

## Backlog (post-v1)

`.7z` · LFS pour fichiers > 100 Mo · sélection manuelle de fichiers ·
import par URL · scan antivirus · notifications Discord par canal d'équipe ·
traduction du panel staff (réservé à l'équipe, volontairement en français).
