import { ImageResponse } from "next/og";
import { SITE_NAME } from "@/lib/seo";

export const alt =
  "RepoDrop — Importez vos archives .rar, .zip et .tar directement sur GitHub";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * Aperçu social Open Graph (1200×630) généré côté serveur sans dépendance
 * réseau externe, fidèle à la charte sombre (#080b12 / #34d399 / #38bdf8).
 */
export default function OpenGraphImage() {
  const formats = [".rar", ".zip", ".tar", ".tar.gz", ".tgz"];
  const badges = [
    "Sans terminal ni clone",
    "Extraction sandboxée",
    "Jeton GitHub chiffré",
    "100 % français",
  ];

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

        {/* Accroche centrale */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "22px",
            maxWidth: "980px",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              fontSize: "64px",
              fontWeight: 700,
              lineHeight: 1.08,
              letterSpacing: "-0.03em",
            }}
          >
            <span style={{ color: "#e7ecf5" }}>Vos archives de code,</span>
            <span style={{ color: "#34d399" }}>
              sur GitHub en un glisser-déposer.
            </span>
          </div>
          <div
            style={{
              fontSize: "27px",
              lineHeight: 1.4,
              color: "#93a0b4",
              maxWidth: "900px",
            }}
          >
            Connectez GitHub, déposez votre archive, prévisualisez et poussez
            vers un dépôt neuf ou existant en deux minutes.
          </div>
        </div>

        {/* Bandeau de garanties */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
            flexWrap: "wrap",
          }}
        >
          {badges.map((label) => (
            <div
              key={label}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                padding: "10px 20px",
                borderRadius: "999px",
                backgroundColor: "#10141f",
                border: "1px solid #232a3b",
                fontSize: "20px",
                color: "#e7ecf5",
              }}
            >
              <div
                style={{
                  display: "flex",
                  width: "9px",
                  height: "9px",
                  borderRadius: "999px",
                  backgroundColor: "#34d399",
                }}
              />
              <span>{label}</span>
            </div>
          ))}
        </div>
      </div>
    ),
    { ...size },
  );
}
