import type { Metadata } from "next";
import Link from "next/link";
import { AlertTriangle, Lock, ShieldCheck } from "lucide-react";
import { config } from "@/lib/config";
import { Wordmark, GitHubIcon } from "@/components/Brand";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader } from "@/components/ui/card";
import { buildPageMetadata } from "@/lib/seo";
import { cn } from "@/lib/utils";
import { getT } from "@/lib/i18n/server";
import { ogLocaleOf } from "@/lib/i18n/locales";

export async function generateMetadata(): Promise<Metadata> {
  const { locale, t } = await getT();
  return buildPageMetadata({
    title: t.meta.loginTitle,
    description: t.meta.loginDescription,
    path: "/login",
    noIndex: true,
    ogLocale: ogLocaleOf(locale),
  });
}

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const [{ error }, { t }] = await Promise.all([searchParams, getT()]);

  const ERRORS: Record<string, string> = {
    state: t.login.errorState,
    oauth: t.login.errorOauth,
    config: t.login.errorConfig,
    devauth: t.login.errorDevauth,
  };
  const message = error ? (ERRORS[error] ?? t.login.errorGeneric) : null;

  return (
    <main className="relative flex flex-1 items-center justify-center overflow-hidden px-4 py-16 sm:px-6">
      {/* Décor : halos + grille, comme sur l'accueil. */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 hero-bg" />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-0 -z-10 h-64 w-[36rem] -translate-x-1/2 rounded-full bg-go/10 blur-[110px] animate-aurora"
      />

      <div className="w-full max-w-md animate-fade-up">
        <div className="mb-8 text-center">
          <Link href="/" className="inline-block">
            <Wordmark className="justify-center text-lg" />
          </Link>
        </div>

        <Card className="overflow-hidden">
          <div
            aria-hidden="true"
            className="h-px w-full bg-gradient-to-r from-transparent via-go/60 to-transparent"
          />
          <CardHeader className="items-center text-center">
            <h1 className="text-xl font-semibold tracking-tight">{t.login.title}</h1>
            <CardDescription>{t.login.description}</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            {message && (
              <div
                role="alert"
                className="flex items-start gap-2 rounded-lg bg-danger/10 p-3 text-sm text-danger ring-1 ring-danger/25"
              >
                <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" />
                <span>{message}</span>
              </div>
            )}

            <a
              href="/api/auth/login"
              rel="nofollow"
              className={cn(buttonVariants({ size: "lg" }), "w-full")}
            >
              <GitHubIcon className="h-5 w-5" />
              {t.login.continueWithGithub}
            </a>

            <p className="flex flex-wrap items-start gap-1.5 text-xs leading-relaxed text-mist">
              <ShieldCheck className="mt-0.5 h-3.5 w-3.5 shrink-0 text-go" />
              <span>
                {t.login.scopesLead}{" "}
                <code className="text-chalk">repo</code> {t.login.scopesAnd}{" "}
                <code className="text-chalk">workflow</code>
                {t.login.scopesTail}
              </span>
            </p>

            <ul className="grid gap-1.5 text-[11px] text-mist">
              <li className="flex items-center gap-1.5">
                <Lock className="h-3 w-3 text-go" /> {t.login.bulletCookie}
              </li>
              <li className="flex items-center gap-1.5">
                <Lock className="h-3 w-3 text-go" /> {t.login.bulletLogout}
              </li>
            </ul>

            {config.devAuth && (
              <div className="mt-2 rounded-xl border border-dashed border-edge p-4 text-center">
                <p className="mb-3 text-xs font-medium uppercase tracking-wider text-mist">
                  {t.login.devMode}
                </p>
                <a
                  href="/api/auth/dev-login"
                  rel="nofollow"
                  className={cn(buttonVariants({ variant: "secondary" }), "w-full")}
                >
                  {t.login.devLogin}
                </a>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
