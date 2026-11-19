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
    timeout: 90_000,
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

async function localizedHtml(response, locale, dir = "ltr", status = 200) {
  assert.equal(response.status, status, `${locale} ${response.url}`);
  assert.equal(response.headers.get("content-language"), locale);
  const html = await response.text();
  assert.ok(html.includes(`<html lang="${locale}" dir="${dir}">`));
  return html;
}

// Independent sentinels: a correct header alone does not prove that the
// server used the requested dictionary to render the page and its guides.
const expected = {
  fr: ["À propos de RepoDrop", "Conseil pratique"],
  en: ["About RepoDrop", "Practical tip"],
  es: ["Acerca de RepoDrop", "Consejo práctico"],
  de: ["Über RepoDrop", "Praxistipp"],
  it: ["Riguardo RepoDrop", "Consiglio pratico"],
  pt: ["Sobre o RepoDrop", "Sugestão prática"],
  nl: ["Over RepoDrop", "Praktische tip"],
  pl: ["O RepoDrop", "Praktyczna wskazówka"],
  ru: ["О RepoDrop", "Практический совет"],
  uk: ["Про RepoDrop", "Практична порада"],
  tr: ["RepoDrop Hakkında", "Pratik ipucu"],
  ar: ["حول RepoDrop", "نصيحة عملية"],
  hi: ["RepoDrop के बारे में", "काम की सलाह"],
  zh: ["关于 RepoDrop", "实用提示"],
  ja: ["RepoDropについて", "実用的なヒント"],
  ko: ["RepoDrop 소개", "실용적인 팁"],
};

function mainMarkup(html) {
  const main = html.match(/<main(?:\s[^>]*)?>([\s\S]*?)<\/main>/)?.[1];
  assert.ok(main, "missing main content");
  return main.replace(/<script\b[^>]*>[\s\S]*?<\/script>/g, "");
}

test("la langue choisie survit au rendu public et connecté en production", { timeout: 100_000 }, async (t) => {
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
    MAX_UPLOAD_MB: "37",
    MAX_EXTRACT_MB: "98",
    MAX_FILES: "4321",
    UPLOADS_PER_HOUR: "31",
    PUSHES_PER_HOUR: "13",
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
  const frenchGuide = await localizedHtml(await page(origin, guidePath), "fr");
  assert.match(frenchGuide, /37\s+Mo[^<]*98\s+Mo[^<]*4\s321 fichiers/);
  const guide = await localizedHtml(await page(origin, `${guidePath}?lang=ja`), "ja");
  assert.match(guide, /<h1[^>]*>[^<]*RAR[^<]*インポート[^<]*<\/h1>/);
  assert.ok(guide.includes('href="/guides?lang=ja"'));
  assert.ok(guide.includes('href="/manifest.webmanifest?lang=ja"'));
  assert.ok(guide.includes('href="/feed.xml?lang=ja"'));
  assert.match(guide, /"inLanguage":"ja"/);
  assert.match(guide, /<h2[^>]*>実用的なヒント<\/h2>/);
  assert.match(guide, /37\s*MB[^<]*98\s*MB[^<]*4,321/);
  assert.doesNotMatch(guide, /<h1[^>]*>Comment importer/);

  const guides = await localizedHtml(await page(origin, "/guides?lang=ja"), "ja");
  assert.ok(guides.includes('href="/recherche?lang=ja"'));
  const query = encodeURIComponent("ＧｉｔＨｕｂ、ＺＩＰ");
  const search = await localizedHtml(await page(origin, `/recherche?q=${query}&q=ignored&lang=ja`), "ja");
  assert.equal(search.match(/href="(\/guides\/[^"\s]+)"/)?.[1], "/guides/importer-zip-sur-github?lang=ja");
  assert.match(search, /name="lang" value="ja"/);
  assert.match(search, /<bdi[^>]*>ＧｉｔＨｕｂ、ＺＩＰ<\/bdi>/);

  const empty = await localizedHtml(await page(origin, "/recherche?q=zipzzzz&lang=en"), "en");
  assert.match(empty, /No guide matches your search/);
  assert.ok(empty.includes('href="/guides?lang=en"'));

  const signIn = await localizedHtml(await page(origin, "/login?error=constructor&lang=en"), "en");
  assert.match(signIn, /Sign-in error\./);
  assert.match(signIn, /GitHub permissions requested/);
  assert.deepEqual([...signIn.matchAll(/<dt><code dir="ltr"[^>]*>(\w+)<\/code><\/dt>/g)].map((match) => match[1]),
    ["repo", "workflow", "delete_repo"]);
  assert.match(signIn, /Delete a repository only after you confirm the action in the repository browser\./);

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

  for (const [locale, [aboutTitle, tip]] of Object.entries(expected)) {
    await t.test(`${locale} : navigation publique, huit guides et pages connectées`, async () => {
      const dir = locale === "ar" ? "rtl" : "ltr";
      const read = async (path, headers = {}, status = 200) => {
        const url = new URL(path, origin);
        url.searchParams.set("lang", locale);
        const main = mainMarkup(await localizedHtml(await page(origin, url, headers), locale, dir, status));
        assert.doesNotMatch(main, /\{[a-z][a-z0-9_]*\}/i, `${locale} ${path}: unfilled placeholder`);
        return main;
      };
      const about = await read("/a-propos");
      assert.ok(about.includes(`>${aboutTitle}</h1>`), locale);
      const index = await read("/guides");
      const routes = new Set([...index.matchAll(/href="(\/guides\/[a-z-]+)\?lang=[a-z]+"/g)].map((m) => m[1]));
      assert.equal(routes.size, 8);
      for (const path of routes) {
        const article = await read(path);
        assert.ok(article.includes(`>${tip}</h2>`), `${locale} ${path}: translated tip`);
        assert.equal([...article.matchAll(/<summary\b/g)].length, 3, `${locale} ${path}: FAQ parity`);
      }
      const home = await read("/");
      assert.doesNotMatch(home, /chore: import|github\.com\/you\//);
      if (locale === "fr") assert.match(home, /Envois d’archives[^<]*31 par heure[^<]*13 par heure/);
      await read("/faq");
      await read("/recherche?q=ZIP");
      await read("/langues");
      await read("/login?error=config");
      await read("/missing-translated-page", {}, 404);
      await read("/import", headers);
      await read(`/jobs/${id}`, headers);
      await read("/repos", headers);
      await read("/staff", { Cookie: unlocked });
    });
  }
});
