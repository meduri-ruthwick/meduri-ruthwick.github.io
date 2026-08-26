"use client";

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative overflow-hidden bg-paper"
      style={{ isolation: "isolate" }}
    >
      {/* Single watercolor wash — image-like, multiply blend, only visual accent */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          width: "100%",
          aspectRatio: "1584/480",
          backgroundImage: "none",
          zIndex: 0,
          pointerEvents: "none",
          /* Painted gradient standing in for a real watercolor wash in Phase 2 */
          background:
            "radial-gradient(ellipse 80% 60% at 30% 120%, rgba(42,96,73,0.07) 0%, transparent 70%)",
          filter: "url(#wc-wash)",
          maskImage: "linear-gradient(to bottom, transparent 0%, black 45%)",
          WebkitMaskImage: "linear-gradient(to bottom, transparent 0%, black 45%)",
        }}
      />

      {/* Inner grid */}
      <div
        className="relative mx-auto grid grid-cols-1 gap-10 px-6 sm:px-10 lg:grid-cols-2 lg:gap-16 items-center"
        style={{ maxWidth: "90rem", paddingTop: "4.5rem", paddingBottom: "4rem", zIndex: 1 }}
      >
        {/* Left — text column */}
        <div
          className="flex flex-col justify-center"
          style={{ paddingTop: "0.5rem" }}
        >
          {/* Mono label */}
          <p
            className="text-primary"
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "11px",
              textTransform: "uppercase",
              letterSpacing: "0.25em",
              marginBottom: "1.25rem",
            }}
          >
            GENOMICS  •  AI  •  EPIGENETICS
          </p>

          {/* H1 — Cormorant for the name only */}
          <h1
            style={{
              fontFamily: "var(--font-serif)",
              fontWeight: 400,
              fontSize: "clamp(3rem, 7vw, 5.5rem)",
              lineHeight: 1.0,
              letterSpacing: "-0.02em",
              color: "var(--color-ink)",
              marginBottom: "1.5rem",
              maxWidth: "28rem",
            }}
          >
            Ruthwick<br />
            <em style={{ fontStyle: "italic", color: "var(--color-primary)" }}>Meduri</em>
          </h1>

          {/* Tagline */}
          <p
            className="text-body"
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "16px",
              lineHeight: "1.7",
              maxWidth: "28rem",
              textWrap: "pretty",
              marginBottom: "2rem",
            }}
          >
            Decoding gene regulation at single-nucleotide resolution — using CAGE-seq,
            deep learning, and regulatory genomics to reveal the grammar of transcription.
          </p>

          {/* Thin rule + affiliation */}
          <div
            style={{
              borderTop: "1px solid var(--color-line)",
              paddingTop: "1.25rem",
              maxWidth: "28rem",
            }}
          >
            <p
              className="text-ink"
              style={{ fontFamily: "var(--font-sans)", fontSize: "13px", fontWeight: 700, marginBottom: "0.3rem", letterSpacing: "-0.01em" }}
            >
              <a
                href="https://sites.google.com/iitgn.ac.in/homecelllabiitgn/home"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "var(--color-primary)", textDecoration: "none", borderBottom: "1px solid var(--color-primary)" }}
              >
                HoMeCell Lab
              </a>
            </p>
            <p className="text-meta" style={{ fontFamily: "var(--font-sans)", fontSize: "12px", lineHeight: "1.6" }}>
              Department of Biological Sciences and Engineering<br />
              IIT Gandhinagar
            </p>
            <p className="text-meta" style={{ fontFamily: "var(--font-mono)", fontSize: "11px", marginTop: "0.5rem", letterSpacing: "0.03em" }}>
              Supervisor  —  Dr. Umashankar Singh
            </p>
          </div>

          {/* CTAs */}
          <div style={{ marginTop: "2rem", display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
            <a
              href="#research-story"
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "13px",
                fontWeight: 500,
                padding: "0.5rem 1.1rem",
                backgroundColor: "var(--color-primary)",
                color: "#fff",
                borderRadius: "4px",
                textDecoration: "none",
                transition: "background-color 0.2s",
              }}
              onMouseEnter={e => ((e.target as HTMLElement).style.backgroundColor = "var(--color-primary-hover)")}
              onMouseLeave={e => ((e.target as HTMLElement).style.backgroundColor = "var(--color-primary)")}
            >
              Research story →
            </a>
            <a
              href="#publications"
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "13px",
                padding: "0.5rem 1.1rem",
                border: "1px solid var(--color-line)",
                borderRadius: "4px",
                color: "var(--color-body)",
                textDecoration: "none",
                transition: "border-color 0.2s, color 0.2s",
              }}
              onMouseEnter={e => {
                (e.target as HTMLElement).style.borderColor = "var(--color-primary)";
                (e.target as HTMLElement).style.color = "var(--color-primary)";
              }}
              onMouseLeave={e => {
                (e.target as HTMLElement).style.borderColor = "var(--color-line)";
                (e.target as HTMLElement).style.color = "var(--color-body)";
              }}
            >
              Publications
            </a>
          </div>
        </div>

        {/* Right — scientific diagram */}
        <div className="w-full flex items-center justify-center" style={{ paddingTop: "0.5rem" }}>
          <figure
            style={{
              width: "100%",
              maxWidth: "520px",
              background: "var(--color-tile)",
              borderRadius: "4px",
              overflow: "hidden",
              aspectRatio: "4/3",
              position: "relative",
              border: "1px solid var(--color-line)",
            }}
          >
            <img
              src="/circos_core_covariant.jpg"
              alt="Core Covariant Network, hg38"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "contain",
                padding: "0.75rem 0.75rem 2.25rem 0.75rem",
                display: "block",
              }}
            />

            <figcaption
              style={{
                position: "absolute",
                bottom: 0,
                left: 0,
                right: 0,
                borderTop: "1px solid var(--color-line)",
                padding: "0.4rem 0.85rem",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                backgroundColor: "rgba(250,250,248,0.92)",
                backdropFilter: "blur(8px)",
              }}
            >
              <span style={{ fontFamily: "var(--font-mono)", fontSize: "10px", textTransform: "uppercase", letterSpacing: "0.18em", color: "var(--color-meta)" }}>
                Core Covariant Network
              </span>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: "10px", color: "var(--color-meta)" }}>
                hg38
              </span>
            </figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}
