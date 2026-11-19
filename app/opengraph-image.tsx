import { ImageResponse } from "next/og";
import { SITE_NAME, SITE_OG_IMAGE } from "@/lib/seo";

/**
 * Image sociale OpenGraph (1200×630).
 *
 * Elle ne dépend ni de la requête ni de la session : la rendre une fois pour
 * toutes à la compilation (`force-static`) supprime un rendu ImageResponse à
 * chaque passage de crawler (Google, Slack, X, Discord) tout en gardant la même
 * URL stable — les réseaux mettent les aperçus en cache très longtemps, une
 * URL qui change de contenu à chaque requête ne leur sert à rien.
 */
export const dynamic = "force-static";

export const alt = SITE_OG_IMAGE.alt;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * Aperçu social Open Graph (1200×630) généré côté serveur sans dépendance
 * réseau externe, fidèle à la charte sombre (#080b12 / #34d399 / #38bdf8).
 */
export default function OpenGraphImage() {
  const formats = [".rar", ".zip", ".tar", ".tar.gz", ".tgz"];
  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          width: "100%",
          height: "100%",
          padding: "64px 72px",
          backgroundColor: "#080b12",
          backgroundImage:
            "radial-gradient(ellipse 70% 55% at 15% 0%, rgba(56, 189, 248, 0.22), transparent 70%), radial-gradient(ellipse 60% 50% at 88% 12%, rgba(52, 211, 153, 0.20), transparent 70%)",
          color: "#e7ecf5",
        }}
      >
        {/* En-tête marque */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "18px" }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "58px",
                height: "58px",
                borderRadius: "16px",
                backgroundColor: "rgba(52, 211, 153, 0.14)",
                border: "2px solid rgba(52, 211, 153, 0.42)",
              }}
            >
              <svg
                width="34"
                height="34"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#34d399"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 2.5v9" />
                <path d="m8.5 8 3.5 3.5L15.5 8" />
                <rect
                  x="3"
                  y="14.5"
                  width="18"
                  height="7"
                  rx="2"
                  fill="rgba(52, 211, 153, 0.18)"
                />
                <circle cx="7" cy="18" r="1" fill="#34d399" />
              </svg>
            </div>
            <span
              style={{
                fontSize: "34px",
                fontWeight: 700,
                letterSpacing: "-0.02em",
                color: "#e7ecf5",
              }}
            >
              {SITE_NAME}
            </span>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
            }}
          >
            {formats.map((ext) => (
              <div
                key={ext}
                style={{
                  display: "flex",
                  padding: "8px 16px",
                  borderRadius: "10px",
                  backgroundColor: "#10141f",
                  border: "1px solid #232a3b",
                  color: "#34d399",
                  fontSize: "20px",
                  fontWeight: 600,
                }}
              >
                {ext}
              </div>
            ))}
          </div>
        </div>

        {/* Formats and brands only: the surrounding OG title/description
            provide the localized copy, while the image stays cacheable. */}
        <div style={{ display: "flex", alignItems: "center", gap: "40px", flex: 1 }}>
          <svg width="208" height="208" viewBox="0 0 24 24" fill="none" stroke="#38bdf8" strokeWidth="1.3">
            <path d="M3 7h18v13H3z" />
            <path d="m3 7 3-4h12l3 4M9 11h6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <svg width="100" height="100" viewBox="0 0 24 24" fill="none" stroke="#34d399" strokeWidth="1.5">
            <path d="M4 12h16m-6-6 6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span style={{ fontSize: "120px", color: "#e7ecf5", letterSpacing: "-0.05em", fontWeight: 700 }}>
            GitHub
          </span>
        </div>
      </div>
    ),
    { ...size },
  );
}
