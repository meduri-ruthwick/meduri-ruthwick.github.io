"use client";

const tags = [
  "CAGE-seq", "ATAC-seq", "Regulatory Genomics",
  "Deep Learning", "Machine Learning", "Evolutionary Viral Genomics",
  "Promoter Architecture", "Chromatin Accessibility", "Retrotransposons",
  "Vertebrate Phylogenetics",
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
        {/* Left: photo + badge + keywords + academic profile card */}
        <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
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
                letterSpacing: "0.08em",
                padding: "0.25rem 0.6rem",
                border: "1px solid var(--color-line)",
                borderRadius: "3px",
                color: "var(--color-meta)",
                backgroundColor: "var(--color-tile)",
              }}>
                {tag}
              </span>
            ))}
          </div>

          {/* Academic & Research Profile Card (Fills vertical space cleanly) */}
          <div
            style={{
              border: "1px solid var(--color-line)",
              borderRadius: "4px",
              backgroundColor: "var(--color-tile)",
              padding: "1rem 1.25rem",
              display: "flex",
              flexDirection: "column",
              gap: "0.75rem",
              maxWidth: "500px",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid var(--color-line)", paddingBottom: "0.4rem" }}>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: "10px", textTransform: "uppercase", letterSpacing: "0.15em", color: "var(--color-primary)", fontWeight: 600 }}>
                Academic Affiliation
              </span>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: "10px", color: "var(--color-meta)" }}>
                PhD Candidate
              </span>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "auto 1fr", gap: "0.4rem 1rem", fontSize: "12px", fontFamily: "var(--font-sans)" }}>
              <span style={{ color: "var(--color-meta)", fontFamily: "var(--font-mono)", fontSize: "11px" }}>Lab:</span>
              <span style={{ color: "var(--color-ink)", fontWeight: 500 }}>
                <a href="https://sites.google.com/iitgn.ac.in/homecelllabiitgn/home" target="_blank" rel="noopener noreferrer" style={{ color: "var(--color-ink)", textDecoration: "underline", textUnderlineOffset: "3px" }}>
                  HoMeCell Lab
                </a> (Adv. Dr. Umashankar Singh)
              </span>

              <span style={{ color: "var(--color-meta)", fontFamily: "var(--font-mono)", fontSize: "11px" }}>Dept:</span>
              <span style={{ color: "var(--color-body)" }}>Biological Sciences & Engineering</span>

              <span style={{ color: "var(--color-meta)", fontFamily: "var(--font-mono)", fontSize: "11px" }}>Inst:</span>
              <span style={{ color: "var(--color-body)" }}>Indian Institute of Technology Gandhinagar</span>

              <span style={{ color: "var(--color-meta)", fontFamily: "var(--font-mono)", fontSize: "11px" }}>Focus:</span>
              <span style={{ color: "var(--color-primary)", fontWeight: 500 }}>Regulatory Genomics & Evolutionary Virology</span>
            </div>
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
            letterSpacing: "-0.03em", lineHeight: 1.15,
            color: "var(--color-ink)", marginBottom: "1.5rem",
          }}>
            Decoding regulatory grammar with computation and genomics
          </h2>

          <div className="text-body" style={{ fontFamily: "var(--font-sans)", fontSize: "15.5px", lineHeight: "1.75", display: "flex", flexDirection: "column", gap: "1.15rem" }}>
            <p>
              I am a PhD researcher in Computational Genomics at{" "}
              <strong style={{ color: "var(--color-ink)", fontWeight: 500 }}>IIT Gandhinagar</strong> (HoMeCell Lab),
              working at the intersection of deep representation learning, functional genomics, and evolutionary biology.
              My research investigates how regulatory elements — mapped at single-nucleotide and base-pair resolution
              via CAGE-seq and ATAC-seq — encode the fundamental logic of transcriptional control.
            </p>
            <p>
              Using denoising autoencoders and ensemble machine learning models, I uncover how
              core-covariant TSS deployment hubs organize in healthy transcriptomes and fracture in cancers.
              In parallel, I explore the sequence determinants of chromatin accessibility, demonstrating how
              transposable elements (primate Alu retrotransposons) and lineage-specific TF binding dynamics
              shape accessible regulatory landscapes across 105 vertebrate genomes.
            </p>
            <p style={{
              borderLeft: "2px solid var(--color-primary)",
              paddingLeft: "1rem",
              margin: "0.5rem 0",
              color: "var(--color-ink)",
              backgroundColor: "rgba(42,96,73,0.03)",
              paddingTop: "0.4rem",
              paddingBottom: "0.4rem",
            }}>
              <strong style={{ color: "var(--color-primary)", fontWeight: 600 }}>Future Outlook:</strong> Looking ahead,
              my prospective research bridges computational regulatory genomics with{" "}
              <strong style={{ color: "var(--color-ink)", fontWeight: 500 }}>Evolutionary Viral Genomics</strong> —
              investigating how viral genomes evolve, deciphering their molecular interplay with host transcriptional machinery,
              and discovering how ancient and contemporary host-virus interactions have reshaped eukaryotic genomes and driven
              the evolution of higher life forms.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
