"use client";

type Talk = {
  id: string; title: string; conference: string; location: string;
  year: number; type: "invited" | "contributed" | "poster";
  slidesUrl?: string; videoUrl?: string;
};

const talks: Talk[] = [
  {
    id: "t1",
    title: "Core promoter architecture shapes tissue-specificity in CAGE-defined TSS",
    conference: "[Conference — e.g. RECOMB 2024]",
    location: "Cambridge, MA",
    year: 2024,
    type: "contributed",
    slidesUrl: "#",
    videoUrl: "#",
  },
  {
    id: "t2",
    title: "Denoising autoencoders for robust regulatory signal extraction from CAGE-seq",
    conference: "[Conference — e.g. ISMB 2023]",
    location: "Lyon, France",
    year: 2023,
    type: "contributed",
    slidesUrl: "#",
  },
  {
    id: "t3",
    title: "Single-cell CAGE reveals temporal promoter activation during differentiation",
    conference: "[Symposium — e.g. Keystone 2023]",
    location: "Virtual",
    year: 2023,
    type: "poster",
    slidesUrl: "#",
  },
];

const typeLabel: Record<string, string> = {
  invited: "Invited", contributed: "Talk", poster: "Poster",
};

export default function Talks() {
  return (
    <section id="talks" style={{ background: "var(--color-band)", borderTop: "1px solid var(--color-line)" }}>
      <div className="mx-auto px-6 sm:px-10 py-24" style={{ maxWidth: "90rem" }}>
        {/* Header */}
        <div style={{ marginBottom: "3rem" }}>
          <p className="text-primary" style={{
            fontFamily: "var(--font-mono)", fontSize: "11px",
            textTransform: "uppercase", letterSpacing: "0.25em", marginBottom: "0.5rem",
          }}>Presentations</p>
          <h2 style={{
            fontFamily: "var(--font-sans)", fontWeight: 500,
            fontSize: "clamp(1.75rem, 3vw, 2.25rem)",
            letterSpacing: "-0.03em", color: "var(--color-ink)",
          }}>Talks &amp; Posters</h2>
        </div>

        {/* List */}
        <div style={{ maxWidth: "48rem", display: "flex", flexDirection: "column" }}>
          {talks.map((talk) => (
            <div key={talk.id} className="pub-card" id={`talk-${talk.id}`}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "0.5rem", flexWrap: "wrap", gap: "0.5rem" }}>
                <span style={{
                  fontFamily: "var(--font-mono)", fontSize: "10px",
                  textTransform: "uppercase", letterSpacing: "0.15em",
                  color: "var(--color-primary)",
                }}>
                  {typeLabel[talk.type]}
                </span>
                <span style={{ fontFamily: "var(--font-mono)", fontSize: "10px", color: "var(--color-whisper)" }}>
                  {talk.year}
                </span>
              </div>

              <h3 style={{
                fontFamily: "var(--font-sans)", fontWeight: 500, fontSize: "1.05rem",
                letterSpacing: "-0.01em", lineHeight: 1.4,
                color: "var(--color-ink)", marginBottom: "0.4rem",
              }}>
                {talk.title}
              </h3>

              <p className="text-meta" style={{ fontFamily: "var(--font-sans)", fontSize: "13px" }}>
                {talk.conference} · {talk.location}
              </p>

              <div style={{ display: "flex", gap: "1.25rem", marginTop: "0.75rem" }}>
                {talk.slidesUrl && (
                  <a href={talk.slidesUrl} target="_blank" rel="noopener noreferrer"
                    className="text-meta hover-primary"
                    style={{ fontFamily: "var(--font-mono)", fontSize: "11px", textDecoration: "none", letterSpacing: "0.05em" }}>
                    Slides →
                  </a>
                )}
                {talk.videoUrl && (
                  <a href={talk.videoUrl} target="_blank" rel="noopener noreferrer"
                    className="text-meta hover-primary"
                    style={{ fontFamily: "var(--font-mono)", fontSize: "11px", textDecoration: "none", letterSpacing: "0.05em" }}>
                    Video →
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
