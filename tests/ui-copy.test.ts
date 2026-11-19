import { readFileSync, readdirSync } from "node:fs";
import { join, relative } from "node:path";
import { fileURLToPath } from "node:url";
import ts from "typescript";
import { describe, expect, it } from "vitest";

const root = fileURLToPath(new URL("../", import.meta.url));
const textAttributes = new Set([
  "alt", "aria-description", "aria-label", "aria-roledescription", "aria-valuetext", "caption",
  "description", "hint", "label", "placeholder", "title", "tooltip",
]);

// A small allowlist for brands, protocol labels, file names and sample data.
// This guard checks JSX plus visible attributes; runtime copy has render tests.
const technical = new Set([
  "RepoDrop", "GitHub", "Discord", "Node.js", "CSV", "HTTP", "TAR", "main",
  "github.com/", "src/", "index.ts", "package.json", "@here",
  "https://discord.com/api/webhooks/…", "https://example.com/api/health",
  ".rar (RAR4 &amp; RAR5)", ".zip", ".tar · .tar.gz · .tgz",
]);

/** Follow only branches that produce a rendered value, not a call's arguments
 * or a comparison. e.g. `formatDuration(ms, "minute", locale)` is fine. */
function visibleStrings(node: ts.Expression | undefined): { text: string; node: ts.Node }[] {
  if (!node) return [];
  if (ts.isStringLiteralLike(node)) return [{ text: node.text, node }];
  if (ts.isParenthesizedExpression(node)) return visibleStrings(node.expression);
  if (ts.isConditionalExpression(node)) return [...visibleStrings(node.whenTrue), ...visibleStrings(node.whenFalse)];
  if (ts.isTemplateExpression(node)) {
    return [node.head, ...node.templateSpans.map((span) => span.literal)].map((part) => ({ text: part.text, node: part }));
  }
  if (ts.isBinaryExpression(node)) {
    const op = node.operatorToken.kind;
    if (op === ts.SyntaxKind.AmpersandAmpersandToken) return visibleStrings(node.right);
    if (op === ts.SyntaxKind.BarBarToken || op === ts.SyntaxKind.QuestionQuestionToken || op === ts.SyntaxKind.PlusToken) {
      return [...visibleStrings(node.left), ...visibleStrings(node.right)];
    }
  }
  return [];
}

describe("couverture des textes d’interface", () => {
  it("ne laisse ni texte statique ni attribut destiné aux visiteurs hors du dictionnaire", () => {
    const findings: string[] = [];
    for (const folder of ["app", "components"]) {
      const dir = join(root, folder);
      for (const entry of readdirSync(dir, { recursive: true })) {
        if (typeof entry !== "string" || !entry.endsWith(".tsx")) continue;
        const path = join(dir, entry);
        const file = ts.createSourceFile(path, readFileSync(path, "utf8"), ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);
        const check = (text: string, node: ts.Node) => {
          const copy = text.replace(/\s+/g, " ").trim();
          if (!/\p{L}/u.test(copy) || technical.has(copy)) return;
          findings.push(`${relative(root, path)}:${file.getLineAndCharacterOfPosition(node.getStart(file)).line + 1} ${copy}`);
        };
        const visit = (node: ts.Node) => {
          if (ts.isJsxText(node)) check(node.text, node);
          if (ts.isJsxExpression(node) && !ts.isJsxAttribute(node.parent)) {
            for (const match of visibleStrings(node.expression)) check(match.text, match.node);
          }
          if (ts.isJsxAttribute(node) && textAttributes.has(node.name.getText(file))) {
            const value = node.initializer;
            const matches = value && ts.isJsxExpression(value) ? visibleStrings(value.expression)
              : value && ts.isStringLiteral(value) ? [{ text: value.text, node: value }] : [];
            for (const match of matches) check(match.text, match.node);
          }
          ts.forEachChild(node, visit);
        };
        visit(file);
      }
    }
    expect(findings).toEqual([]);
  });
});
