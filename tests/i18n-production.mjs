/** Vérifie les pages réellement servies après `next build`, cache compris. */
import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import { once } from "node:events";
import { mkdtemp, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { createInterface } from "node:readline";
import { test } from "node:test";
import { setTimeout as delay } from "node:timers/promises";
import { startMockGithub, ZIP_BYTES } from "./mock-github.mjs";

async function start(env) {
  const server = spawn(process.execPath, [
    "node_modules/next/dist/bin/next", "start", "-H", "127.0.0.1", "-p", "0",
  ], {
    env: { ...process.env, ...env },
    stdio: ["ignore", "pipe", "inherit"],
    timeout: 60_000,
  });
  const lines = createInterface({ input: server.stdout });
  try {
    let origin;
    for await (const line of lines) {
      origin ??= line.match(/Local:\s+(http:\/\/[^\s]+)/)?.[1];
      if (origin && line.includes("Ready")) return { origin, server };
    }
    throw new Error("Next n'a pas démarré. Lancez d'abord npm run build.");
  } catch (error) {
    server.kill();
    throw error;
  } finally {
    lines.close();
    server.stdout.resume();
  }
}

function page(origin, path, headers = {}, options = {}) {
  return fetch(new URL(path, origin), {
    ...options,
    headers: { "Accept-Language": "fr-FR", ...headers },
    redirect: "manual",
    signal: globalThis.AbortSignal.timeout(5000),
  });
}

async function localizedHtml(response, locale, dir = "ltr") {
  assert.equal(response.status, 200);
  assert.equal(response.headers.get("content-language"), locale);
  const html = await response.text();
  assert.ok(html.includes(`<html lang="${locale}" dir="${dir}">`));
  return html;
}

test("la langue choisie survit au rendu public et connecté en production", { timeout: 60_000 }, async (t) => {
  const dir = await mkdtemp(join(tmpdir(), "repodrop-i18n-"));
  let server;
  let github;
  const password = "fixture-password";
  t.after(async () => {
    if (server?.exitCode === null && server.signalCode === null) {
      const exit = once(server, "exit");
      server.kill();
      await exit;
    }
    await github?.stop();
    await rm(dir, { recursive: true, force: true });
  });
  github = await startMockGithub();
  const started = await start({
    APP_URL: "http://localhost:3000",
    DB_PATH: join(dir, "test.db"),
    JOBS_DIR: join(dir, "jobs"),
    DEV_AUTH: "1",
    GITHUB_API_URL: github.url,
    GITHUB_CLIENT_ID: "",
    GITHUB_CLIENT_SECRET: "",
    GH_TOKEN: "gho_test",
    SESSION_SECRET: "fixture-session-key-only-for-local-tests",
    STAFF_PASSWORD: password,
    STAFF_LOGINS: "dimalaxyt",
    DISCORD_BOT_TOKEN: "",
    DISCORD_WEBHOOK_URL: "",
  });
  const { origin } = started;
  server = started.server;

  const french = await localizedHtml(await page(origin, "/a-propos"), "fr");
  assert.match(french, /<h1[^>]*>À propos de RepoDrop<\/h1>/);

  // Le cookie prend le relais lors d'une navigation vers une URL sans `lang`.
  const switchToEnglish = await page(origin, "/api/locale?to=en&next=%2Fa-propos");
  assert.equal(switchToEnglish.status, 307);
  const cookie = switchToEnglish.headers.getSetCookie()[0]?.split(";", 1)[0];
  assert.equal(cookie, "rd_lang=en");
  assert.equal(switchToEnglish.headers.get("location"), "/a-propos?lang=en");
  const about = await localizedHtml(await page(origin, "/a-propos", { Cookie: cookie }), "en");
  assert.match(about, /<h1[^>]*>About RepoDrop<\/h1>/);
  assert.match(about, /<title>About RepoDrop · RepoDrop<\/title>/);

  // Sans cookie, l'URL de retour et les liens de l'interface portent la langue.
  const switchToArabic = await page(origin, "/api/locale?to=ar&next=%2Flangues");
  const location = switchToArabic.headers.get("location");
  assert.equal(location, "/langues?lang=ar");
  const gallery = await localizedHtml(await page(origin, location, { Cookie: "rd_lang=fr" }), "ar", "rtl");
  assert.ok(gallery.includes('href="/faq?lang=ar"'));
  await localizedHtml(await page(origin, "/faq?lang=ar"), "ar", "rtl");

  const prefetch = await page(origin, "/api/locale?to=fr&next=%2Flangues", {
    "Next-Router-Prefetch": "1",
    RSC: "1",
  });
  assert.equal(prefetch.status, 204);
  assert.equal(prefetch.headers.has("set-cookie"), false);

  const guidePath = "/guides/importer-rar-sur-github";
  const guide = await localizedHtml(await page(origin, `${guidePath}?lang=ja`), "ja");
  assert.match(guide, /<h1[^>]*>[^<]*RAR[^<]*インポート[^<]*<\/h1>/);
  assert.ok(guide.includes('href="/guides?lang=ja"'));
  assert.ok(guide.includes('href="/manifest.webmanifest?lang=ja"'));
  assert.ok(guide.includes('href="/feed.xml?lang=ja"'));
  assert.match(guide, /"inLanguage":"ja"/);
  assert.doesNotMatch(guide, /<h1[^>]*>Comment importer/);

  const search = await localizedHtml(await page(origin, "/recherche?q=RAR&lang=ja"), "ja");
  assert.ok(search.includes(`href="${guidePath}?lang=ja"`));
  assert.match(search, /name="lang" value="ja"/);

  const rss = await page(origin, "/feed.xml?lang=ja");
  assert.equal(rss.headers.get("content-language"), "ja");
  assert.match(await rss.text(), /<language>ja<\/language>/);
  const manifest = await page(origin, "/manifest.webmanifest?lang=ar");
  assert.equal(manifest.headers.get("content-language"), "ar");
  const { lang, dir: direction, start_url: startUrl } = await manifest.json();
  assert.deepEqual({ lang, direction, startUrl }, { lang: "ar", direction: "rtl", startUrl: "/?lang=ar" });

  const login = await page(origin, "/import?lang=ja");
  assert.equal(login.status, 307);
  assert.equal(login.headers.get("location"), "/login?lang=ja");
  const signedIn = await page(origin, "/api/auth/dev-login?lang=ja");
  assert.equal(signedIn.headers.get("location"), "/import?lang=ja");
  const session = signedIn.headers.getSetCookie().find((value) => value.startsWith("rd_session="))?.split(";", 1)[0];
  assert.ok(session);
  const headers = { Cookie: session, "Accept-Language": "fr-FR" }; // No preference cookie.
  const upload = await localizedHtml(await page(origin, "/import?lang=ja", headers), "ja");
  assert.match(upload, /<h1[^>]*>ここにアーカイブをドラッグして GitHub にプッシュ<\/h1>/);
  assert.ok(upload.includes('href="/repos?lang=ja"'));
  const repos = await localizedHtml(await page(origin, "/repos?lang=ja", headers), "ja");
  assert.match(repos, /リポジトリを読み込んでいます/);
  const repoList = await page(origin, "/api/repos?lang=ja", headers);
  assert.equal(repoList.status, 200);
  assert.ok((await repoList.json()).repos.some((repo) => repo.full_name === "dimalaxyt/mon-projet"));

  async function uploadFile(bytes) {
    const form = new globalThis.FormData();
    form.set("file", new globalThis.Blob([bytes]), "example.zip");
    return page(origin, "/api/upload?lang=ja", headers, { method: "POST", body: form });
  }
  const invalid = await uploadFile(Buffer.from("not an archive"));
  assert.equal(invalid.status, 415);
  assert.equal(invalid.headers.get("content-language"), "ja");
  assert.deepEqual(await invalid.json(), {
    code: "UNSUPPORTED",
    error: "対応していないアーカイブ形式または圧縮方式です。標準の.zip、.rar、.tarファイルをお試しください。",
  });
  const accepted = await uploadFile(ZIP_BYTES);
  assert.equal(accepted.status, 202);
  const { id } = await accepted.json();
  assert.ok(id);
  let job;
  for (let attempt = 0; attempt < 30; attempt += 1) {
    const response = await page(origin, `/api/jobs/${id}?lang=ja`, headers);
    assert.equal(response.headers.get("content-language"), "ja");
    ({ job } = await response.json());
    if (job.status === "ready" || job.status === "failed") break;
    await delay(100);
  }
  assert.equal(job?.status, "ready", job?.error);
  const preview = await localizedHtml(await page(origin, `/jobs/${id}?lang=ja`, headers), "ja");
  assert.match(preview, /アーカイブのプレビュー/);

  const locked = await localizedHtml(await page(origin, "/staff?lang=ar", headers), "ar", "rtl");
  assert.match(locked, /<h1[^>]*>اللوحة مقفلة<\/h1>/);
  const unlock = await page(origin, "/api/staff/unlock?lang=ar", { ...headers, "Content-Type": "application/json" }, {
    method: "POST", body: JSON.stringify({ password }),
  });
  assert.equal(unlock.status, 200);
  const unlocked = unlock.headers.getSetCookie().find((value) => value.startsWith("rd_session="))?.split(";", 1)[0];
  assert.ok(unlocked);
  const staff = await localizedHtml(await page(origin, "/staff?lang=ar", { Cookie: unlocked }), "ar", "rtl");
  assert.match(staff, /<h1[^>]*>لوحة الفريق<\/h1>/);
});
