/**
 * Liens vers un dépôt poussé.
 *
 * ⚠️ Historique : ce module exposait aussi les liens « prêts à donner à une
 * IA » (Codespaces, vscode.dev, URL de clonage, commande `gh`). Cette section
 * de l'écran de succès était un **prototype** : elle a été retirée, et avec
 * elle les URL correspondantes. Il ne reste que le lien du dépôt, de la
 * branche et du commit.
 *
 * Ce qui reste est la **source de vérité** des URL affichées : elles sont
 * construites ici (et non dans le composant) pour rester testables et
 * cohérentes.
 */
import type { JobRecord } from "./types";

export interface RepoLinks {
  /** "owner/repo" */
  fullName: string;
  /** Page du dépôt sur GitHub */
  repoUrl: string;
  /** Page de la branche poussée */
  branchUrl: string;
  /** Page du commit poussé (null si inconnu) */
  commitUrl: string | null;
}

/** Encode un chemin GitHub en conservant les "/" (branches du type "feat/x"). */
export function encodePath(path: string): string {
  return path
    .split("/")
    .map((seg) => encodeURIComponent(seg))
    .join("/");
}

/** "owner/repo" à partir du résultat de push (champ dédié ou URL). */
export function repoFullName(push: NonNullable<JobRecord["push"]>): string {
  if (push.fullName) return push.fullName;
  return push.url.replace(/^https?:\/\/[^/]+\//, "").replace(/\.git$/, "");
}

/** Construit l'ensemble des liens autour du dépôt poussé. */
export function buildRepoLinks(push: NonNullable<JobRecord["push"]>): RepoLinks {
  const fullName = repoFullName(push);
  const repoUrl = `https://github.com/${fullName}`;
  const branch = push.branch || "main";
  const branchUrl = `${repoUrl}/tree/${encodePath(branch)}`;
  const commitUrl = push.commitSha ? `${repoUrl}/commit/${push.commitSha}` : null;

  return {
    fullName,
    repoUrl,
    branchUrl,
    commitUrl,
  };
}
