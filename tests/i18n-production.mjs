/** Vérifie les pages réellement servies après `next build`, cache compris. */
import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import { once } from "node:events";
import { createInterface } from "node:readline";
import { test } from "node:test";

async function start() {
  const server = spawn(process.execPath, [
    "node_modules/next/dist/bin/next", "start", "-H", "127.0.0.1", "-p", "0",
  ], { stdio: ["ignore", "pipe", "inherit"], timeout: 30000 });
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

function page(origin, path, headers = {}) {
  return fetch(new URL(path, origin), {
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

test("la langue choisie survit à la redirection et au rendu de production", { timeout: 30000 }, async (t) => {
  const { origin, server } = await start();
  t.after(async () => {
    if (server.exitCode === null && server.signalCode === null) {
      const exit = once(server, "exit");
      server.kill();
      await exit;
    }
  });

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
});
