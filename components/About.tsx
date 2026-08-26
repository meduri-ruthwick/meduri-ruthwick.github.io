"use client";

const tags = [
  "CAGE-seq", "Regulatory Genomics", "Deep Learning",
  "Gene Expression", "Single-cell Genomics", "Promoter Biology",
  "Chromatin Accessibility", "Transcription Factor Binding",
];

export default function About() {
  return (
    <section
      id="about"
      style={{
        borderTop: "1px solid var(--color-line)",
        background: "var(--color-paper)",
      }}
    >
      <div
        className="mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start px-6 sm:px-10 py-24"
        style={{ maxWidth: "90rem" }}
      >
        {/* Left: photo + badge */}
        <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
          {/* Photo tile */}
          <div
            style={{
              background: "var(--color-tile)",
              borderRadius: "4px",
              aspectRatio: "4/3",
              overflow: "hidden",
              position: "relative",
              maxWidth: "500px",
              border: "1px solid var(--color-line)",
            }}
          >
            <img
              src="/ruthwick_portrait.jpg"
              alt="Ruthwick Meduri"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                display: "block",
              }}
            />
            <figcaption style={{
              position: "absolute", bottom: 0, left: 0, right: 0,
              borderTop: "1px solid var(--color-line)",
              padding: "0.4rem 0.85rem",
              display: "flex", justifyContent: "space-between",
              backgroundColor: "rgba(250,250,248,0.88)",
              backdropFilter: "blur(8px)",
            }}>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: "10px", textTransform: "uppercase", letterSpacing: "0.18em", color: "var(--color-meta)" }}>Ruthwick Meduri</span>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: "10px", color: "var(--color-meta)" }}>IIT Gandhinagar</span>
            </figcaption>
          </div>

          {/* Research focus tags */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
            {tags.map(tag => (
              <span key={tag} style={{
                fontFamily: "var(--font-mono)",
                fontSize: "10px",
                textTransform: "uppercase",
                letterSpacing: "0.1em",
                padding: "0.25rem 0.6rem",
                border: "1px solid var(--color-line)",
                borderRadius: "3px",
                color: "var(--color-meta)",
              }}>
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Right: bio */}
        <div style={{ paddingTop: "0.5rem" }}>
          <p className="text-primary" style={{
            fontFamily: "var(--font-mono)", fontSize: "11px",
            textTransform: "uppercase", letterSpacing: "0.25em", marginBottom: "1.5rem",
          }}>
            About
          </p>

          <h2 style={{
            fontFamily: "var(--font-sans)", fontWeight: 500,
            fontSize: "clamp(1.75rem, 3vw, 2.5rem)",
            letterSpacing: "-0.03em", lineHeight: 1.1,
            color: "var(--color-ink)", marginBottom: "1.5rem",
          }}>
            Decoding regulatory grammar with computation and genomics
          </h2>

          <div className="text-body" style={{ fontFamily: "var(--font-sans)", fontSize: "15.5px", lineHeight: "1.75", display: "flex", flexDirection: "column", gap: "1rem" }}>
            <p>
              I am a PhD researcher in Computational Genomics at{" "}
              <strong style={{ color: "var(--color-ink)", fontWeight: 500 }}>IIT Gandhinagar</strong>,
              working at the intersection of deep learning and regulatory biology. My research focuses on
              understanding how transcription start sites — mapped at single-nucleotide resolution via CAGE-seq —
              encode the logic of gene regulation.
            </p>
            <p>
              Using denoising autoencoders, graph neural networks, and probabilistic models, I build tools
              to extract robust regulatory signals from noisy high-throughput sequencing data and discover
              the core-covariant structure of promoter activity across tissues and developmental contexts.
            </p>
            <p style={{ color: "var(--color-whisper)", fontSize: "13px", fontFamily: "var(--font-mono)" }}>
              [Phase 2 — replace with your real bio]
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
