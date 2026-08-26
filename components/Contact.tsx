"use client";

const links = [
  {
    id: "email",
    label: "Email",
    sub: "meduri.ruthwick@iitgn.ac.in",
    href: "mailto:meduri.ruthwick@iitgn.ac.in",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <rect x="2" y="4" width="20" height="16" rx="2" />
        <path d="M22 7L12 13 2 7" />
      </svg>
    ),
  },
  {
    id: "linkedin",
    label: "LinkedIn",
    sub: "ruthwick-meduri",
    href: "https://in.linkedin.com/in/ruthwick-meduri",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
      </svg>
    ),
  },
  {
    id: "github",
    label: "GitHub",
    sub: "@meduri-ruthwick",
    href: "https://github.com/meduri-ruthwick?tab=repositories",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
      </svg>
    ),
  },
  {
    id: "orcid",
    label: "ORCID",
    sub: "0000-0003-2403-2712",
    href: "https://orcid.org/0000-0003-2403-2712",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0C5.372 0 0 5.372 0 12s5.372 12 12 12 12-5.372 12-12S18.628 0 12 0zM7.369 4.378c.525 0 .947.431.947.947s-.422.947-.947.947a.95.95 0 01-.947-.947c0-.525.422-.947.947-.947zm-.722 3.038h1.444v10.041H6.647V7.416zm3.562 0h3.9c3.712 0 5.344 2.653 5.344 5.025 0 2.578-2.016 5.016-5.325 5.016h-3.919V7.416zm1.444 1.303v7.444h2.297c2.359 0 3.9-1.578 3.9-3.722 0-2.016-1.447-3.722-3.828-3.722h-2.369z" />
      </svg>
    ),
  },
  {
    id: "scholar",
    label: "Google Scholar",
    sub: "Scholar profile",
    href: "https://scholar.google.com/citations?user=PLACEHOLDER",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 24a7 7 0 110-14 7 7 0 010 14zm0-24L0 9.5l4.838 3.94A8 8 0 0112 11a8 8 0 017.162 2.44L24 9.5 12 0z" />
      </svg>
    ),
  },
];

export default function Contact() {
  return (
    <section id="contact" style={{ background: "var(--color-paper)", borderTop: "1px solid var(--color-line)" }}>
      <div
        className="mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start px-6 sm:px-10 py-24"
        style={{ maxWidth: "90rem" }}
      >
        {/* Left — heading */}
        <div>
          <p className="text-primary" style={{
            fontFamily: "var(--font-mono)", fontSize: "11px",
            textTransform: "uppercase", letterSpacing: "0.25em", marginBottom: "1.5rem",
          }}>Get in touch</p>
          <h2 style={{
            fontFamily: "var(--font-sans)", fontWeight: 500,
            fontSize: "clamp(1.75rem, 3vw, 2.5rem)",
            letterSpacing: "-0.03em", lineHeight: 1.1,
            color: "var(--color-ink)", marginBottom: "1.5rem",
          }}>
            Let&apos;s talk<br />
            <em style={{ fontFamily: "var(--font-serif)", fontWeight: 400, fontStyle: "italic", color: "var(--color-primary)" }}>
              genomics
            </em>
          </h2>
          <p className="text-body" style={{ fontFamily: "var(--font-sans)", fontSize: "15px", lineHeight: "1.7", maxWidth: "26rem", textWrap: "pretty" }}>
            Happy to discuss collaborations, research questions, or career opportunities.
            Reach out through any of the channels below.
          </p>

          {/* CV */}
          <div style={{ marginTop: "2.5rem", borderTop: "1px solid var(--color-line)", paddingTop: "1.5rem" }}>
            <p className="text-meta" style={{ fontFamily: "var(--font-sans)", fontSize: "13px", marginBottom: "0.75rem" }}>
              Download my full curriculum vitae
            </p>
            <a
              href="/cv.pdf"
              download
              id="contact-cv-download"
              style={{
                display: "inline-flex", alignItems: "center", gap: "0.5rem",
                fontFamily: "var(--font-sans)", fontSize: "13px", fontWeight: 500,
                padding: "0.5rem 1.1rem",
                backgroundColor: "var(--color-ink)",
                color: "#fff", borderRadius: "4px", textDecoration: "none",
                transition: "background-color 0.2s",
              }}
              onMouseEnter={e => ((e.target as HTMLElement).style.backgroundColor = "var(--color-primary)")}
              onMouseLeave={e => ((e.target as HTMLElement).style.backgroundColor = "var(--color-ink)")}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3" />
              </svg>
              Curriculum Vitae (PDF)
            </a>
          </div>
        </div>

        {/* Right — social links */}
        <div style={{ paddingTop: "0.5rem" }}>
          <div style={{ display: "flex", flexDirection: "column" }}>
            {links.map((l, idx) => (
              <a
                key={l.id}
                id={`contact-${l.id}`}
                href={l.href}
                target={l.id !== "email" ? "_blank" : undefined}
                rel={l.id !== "email" ? "noopener noreferrer" : undefined}
                className="hover-primary"
                style={{
                  display: "flex", alignItems: "center", gap: "1rem",
                  padding: "1.25rem 0",
                  borderTop: idx === 0 ? "1px solid var(--color-line)" : undefined,
                  borderBottom: "1px solid var(--color-line)",
                  color: "var(--color-body)",
                  textDecoration: "none",
                  transition: "color 0.2s",
                }}
              >
                <span style={{ color: "var(--color-meta)", flexShrink: 0 }}>{l.icon}</span>
                <div style={{ flex: 1 }}>
                  <p style={{ fontFamily: "var(--font-sans)", fontSize: "14px", fontWeight: 500, color: "var(--color-ink)" }}>
                    {l.label}
                  </p>
                  <p style={{ fontFamily: "var(--font-mono)", fontSize: "11px", color: "var(--color-meta)", marginTop: "0.1rem" }}>
                    {l.sub}
                  </p>
                </div>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ color: "var(--color-whisper)", flexShrink: 0 }}>
                  <path d="M7 17L17 7M17 7H7M17 7v10" />
                </svg>
              </a>
            ))}
          </div>

          {/* Lab & Institute Affiliation Logos */}
          <div
            style={{
              marginTop: "2.5rem",
              paddingTop: "1.75rem",
              borderTop: "1px solid var(--color-line)",
              display: "flex",
              flexDirection: "column",
              gap: "1rem",
            }}
          >
            <p
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "10px",
                textTransform: "uppercase",
                letterSpacing: "0.25em",
                color: "var(--color-primary)",
              }}
            >
              Affiliations
            </p>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "1.75rem",
                flexWrap: "wrap",
                paddingTop: "0.25rem",
              }}
            >
              {/* HoMeCell Lab Logo with link */}
              <a
                href="https://sites.google.com/iitgn.ac.in/homecelllabiitgn/home"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="HoMeCell Lab Website"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  textDecoration: "none",
                  opacity: 0.85,
                  transition: "opacity 0.2s, transform 0.2s",
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLElement).style.opacity = "1";
                  (e.currentTarget as HTMLElement).style.transform = "translateY(-1px)";
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLElement).style.opacity = "0.85";
                  (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
                }}
              >
                <img
                  src="/homecell_logo.png"
                  alt="HoMeCell Lab — Homeostatic Mechanisms of Cells"
                  style={{
                    height: "40px",
                    width: "auto",
                    filter: "brightness(0)",
                    display: "block",
                  }}
                />
              </a>

              {/* Minimal vertical separator */}
              <div
                style={{
                  width: "1px",
                  height: "36px",
                  backgroundColor: "var(--color-line)",
                }}
              />

              {/* IIT Gandhinagar Logo with link */}
              <a
                href="https://iitgn.ac.in"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="IIT Gandhinagar Website"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.75rem",
                  textDecoration: "none",
                  opacity: 0.85,
                  transition: "opacity 0.2s, transform 0.2s",
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLElement).style.opacity = "1";
                  (e.currentTarget as HTMLElement).style.transform = "translateY(-1px)";
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLElement).style.opacity = "0.85";
                  (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
                }}
              >
                <img
                  src="/iitgn_logo.png"
                  alt="IIT Gandhinagar Seal"
                  style={{
                    height: "42px",
                    width: "auto",
                    display: "block",
                  }}
                />
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <span
                    style={{
                      fontFamily: "var(--font-sans)",
                      fontSize: "12px",
                      fontWeight: 600,
                      color: "var(--color-ink)",
                      letterSpacing: "-0.01em",
                      lineHeight: 1.2,
                    }}
                  >
                    IIT Gandhinagar
                  </span>
                  <span
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "10px",
                      color: "var(--color-meta)",
                    }}
                  >
                    BSBE Department
                  </span>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div style={{
        borderTop: "1px solid var(--color-line)",
        padding: "1.5rem 2.5rem",
        display: "flex",
        justifyContent: "space-between",
        flexWrap: "wrap",
        gap: "0.5rem",
      }}>
        <p style={{ fontFamily: "var(--font-mono)", fontSize: "10px", color: "var(--color-whisper)", letterSpacing: "0.1em" }}>
          RUTHWICK MEDURI · COMPUTATIONAL GENOMICS
        </p>
        <p style={{ fontFamily: "var(--font-mono)", fontSize: "10px", color: "var(--color-whisper)" }}>
          © {new Date().getFullYear()} · Built with Next.js
        </p>
      </div>
    </section>
  );
}
