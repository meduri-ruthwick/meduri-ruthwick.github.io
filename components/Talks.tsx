"use client";

type Conference = {
  id: string;
  title: string;
  conference: string;
  location: string;
  year: number;
  role: string;
  description: string;
};

const conferences: Conference[] = [
  {
    id: "c1",
    title: "Annual Conference of the Indian Society of Human Genetics (ISHG 2023)",
    conference: "Indian Society of Human Genetics",
    location: "Ahmedabad, India",
    year: 2023,
    role: "Delegate",
    description:
      "Attended as an academic delegate, engaging with researchers on human genome variation, clinical genomics, and regulatory biology.",
  },
];

export default function Talks() {
  return (
    <section id="talks" style={{ background: "var(--color-band)", borderTop: "1px solid var(--color-line)" }}>
      <div className="mx-auto px-6 sm:px-10 py-24" style={{ maxWidth: "90rem" }}>
        {/* Header */}
        <div style={{ marginBottom: "3rem" }}>
          <p className="text-primary" style={{
            fontFamily: "var(--font-mono)", fontSize: "11px",
            textTransform: "uppercase", letterSpacing: "0.25em", marginBottom: "0.5rem",
          }}>Academic Engagement</p>
          <h2 style={{
            fontFamily: "var(--font-sans)", fontWeight: 500,
            fontSize: "clamp(1.75rem, 3vw, 2.25rem)",
            letterSpacing: "-0.03em", color: "var(--color-ink)",
          }}>Conferences &amp; Meetings</h2>
        </div>

        {/* List */}
        <div style={{ maxWidth: "48rem", display: "flex", flexDirection: "column" }}>
          {conferences.map((conf) => (
            <div key={conf.id} className="pub-card" id={`conf-${conf.id}`}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "0.5rem", flexWrap: "wrap", gap: "0.5rem" }}>
                <span style={{
                  fontFamily: "var(--font-mono)", fontSize: "10px",
                  textTransform: "uppercase", letterSpacing: "0.15em",
                  color: "var(--color-primary)",
                  backgroundColor: "var(--color-tile)",
                  padding: "0.2rem 0.5rem",
                  borderRadius: "3px",
                  border: "1px solid var(--color-line)",
                }}>
                  {conf.role}
                </span>
                <span style={{ fontFamily: "var(--font-mono)", fontSize: "11px", color: "var(--color-meta)" }}>
                  {conf.year}
                </span>
              </div>

              <h3 style={{
                fontFamily: "var(--font-sans)", fontWeight: 500, fontSize: "1.1rem",
                letterSpacing: "-0.01em", lineHeight: 1.4,
                color: "var(--color-ink)", marginBottom: "0.4rem",
              }}>
                {conf.title}
              </h3>

              <p className="text-meta" style={{ fontFamily: "var(--font-sans)", fontSize: "13.5px", marginBottom: "0.5rem" }}>
                {conf.conference} · {conf.location}
              </p>

              <p className="text-body" style={{ fontFamily: "var(--font-sans)", fontSize: "14px", lineHeight: "1.6", color: "var(--color-body)" }}>
                {conf.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
