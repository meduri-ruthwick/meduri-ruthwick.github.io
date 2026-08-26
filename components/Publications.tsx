"use client";

import { useState } from "react";

type Pub = {
  id: string;
  title: string;
  authors: string;
  journal: string;
  year: number;
  doi?: string;
  abstract: string;
  tags: string[];
  type: "journal" | "preprint" | "conference";
  status?: string;
};

const publications: Pub[] = [
  {
    id: "p1",
    title: "Deep analysis of FANTOM CAGE data reveals hierarchical patterns of TSS co-deployment hubs and their disruption in cancers",
    authors: "Ruthwick Meduri, Aditi Lakshmi Satish, Umashankar Singh",
    journal: "bioRxiv (Preprint)",
    year: 2026,
    doi: "https://www.biorxiv.org/content/10.64898/2026.05.15.725323v1",
    abstract: "Selective deployment of multiple transcription start sites is a major regulatory feature of human transcriptomes. FANTOM CAGE data exhibit a near-universal TSS deployment parsimony which is disrupted in cancers. We have recently shown that TSS deployment is sensitive to gene function, futile upstream transcription, and cellular biosynthetic states. Patterns in FANTOM CAGE data can reveal mechanisms underlying TSS co-deployments. We propose and test the possibility that some TSSs act like epromoters and act as co-varying hubs of transcriptional activities for multiple other promoters. Using deep analysis of CAGE data implemented through neural networks we show that non-cancers implement transcription co-deployments through cores of epromoter-like TSSs which are generally proximal to their start codons. These TSSs show enhancer-like TFBSs profiles. A comparison with cancer CAGE data shows that the concentrated epromoter core is disrupted in cancers with multiple distal TSSs replacing the proximal TSS cores. We provide evidence that the core TSSs are rich in YY1 and CTCF binding sites and associated with genes coding for transcription factors. Our findings show that covariance of TSS deployment is sensitive to transcriptional resource cost and a parsimonic design of TSS co-deployments depends on proximal TSSs in non-cancers, a mechanism grossly disrupted in cancers.",
    tags: ["CAGE-seq", "Deep Learning", "Epromoters", "Cancer Genomics", "FANTOM5"],
    type: "preprint",
    status: "Manuscript under review",
  },
  {
    id: "p2",
    title: "Predictive application of ATAC-seq data in evolution of genome regulation",
    authors: "Ruthwick Meduri, Umashankar Singh",
    journal: "Manuscript in Preparation",
    year: 2026,
    abstract: "The organization of the genome into regions of open and closed chromatin underpins the regulation of gene expression and cellular identity. Open chromatin regions serve as critical sites for protein-DNA interactions and are subject to both evolutionary pressures and functional constraints. Although experimental techniques such as ATAC-seq have facilitated the identification of accessible chromatin landscapes, generating such datasets across a wide range of species remains technically demanding and cost-prohibitive. To address this challenge, we developed ChARM (Chromatin Accessibility Retrospective Model), a sequence-based Random Forest model capable of predicting accessible chromatin regions (pAERs) directly from primary DNA sequence features. Applying ChARM across 106 vertebrate genomes, with a detailed focus on 16 primate genomes, we systematically characterized the evolutionary landscape of predicted accessible (pAER) and inaccessible (pAFR) regions. Within primates, Alu SINE elements—specifically the AluJ, AluS, and AluY subclasses—were found to be particularly enriched within pAERs, suggesting a lineage-specific role in the modulation of chromatin accessibility. Detailed mutational profiling of Alu elements across primates revealed both conserved and divergent nucleotide transition patterns, highlighting distinct evolutionary hotspots across different Alu subclasses. Principal component analysis (PCA) of these mutational profiles demonstrated clear clustering based on species and Alu subclass, emphasizing their evolutionary contribution to chromatin regulatory architecture. Notably, great apes and Old World monkeys exhibited similar mutational profiles within AluS and AluY elements, whereas New World monkeys and prosimians displayed unique evolutionary signatures. Further, repeat content analysis using RepeatMasker revealed a striking enrichment of SINE and LTR elements within pAERs specifically in mammals. In contrast, non-mammalian vertebrates showed a progressive shift towards enrichment of LINE elements or simple repeats. Overall, our findings demonstrate that repetitive elements, particularly Alu SINEs, have played a substantial role in shaping the evolution of open chromatin architecture in the primate lineage. This study highlights the power of sequence-based modeling in comparative epigenomics and offers novel insights into the role of repetitive DNA in genome regulation and the evolution of chromatin accessibility.",
    tags: ["ATAC-seq", "Machine Learning", "Genome Regulation", "Chromatin Organisation", "ChARM"],
    type: "preprint",
    status: "Manuscript under preparation",
  },
];

const typeLabel: Record<string, string> = {
  journal: "Article",
  preprint: "Preprint",
  conference: "Conference",
};

function PubRow({ pub }: { pub: Pub }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="pub-card" style={{ padding: "1.75rem 0", borderBottom: "1px solid var(--color-line)" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "0.6rem", gap: "1rem", flexWrap: "wrap" }}>
        <div className="flex items-center gap-2">
          <span style={{
            fontFamily: "var(--font-mono)", fontSize: "10px", textTransform: "uppercase",
            letterSpacing: "0.15em", color: "var(--color-primary)", fontWeight: 600,
          }}>
            {typeLabel[pub.type]}
          </span>
          {pub.status && (
            <span style={{
              fontFamily: "var(--font-mono)", fontSize: "10px",
              padding: "0.15rem 0.5rem",
              borderRadius: "3px",
              backgroundColor: "rgba(42,96,73,0.08)",
              color: "var(--color-primary)",
              border: "1px solid rgba(42,96,73,0.2)",
              letterSpacing: "0.03em",
            }}>
              {pub.status}
            </span>
          )}
        </div>
        <span style={{ fontFamily: "var(--font-mono)", fontSize: "11px", color: "var(--color-meta)" }}>
          {pub.year}
        </span>
      </div>

      <h3 style={{
        fontFamily: "var(--font-sans)", fontWeight: 600, fontSize: "1.15rem",
        letterSpacing: "-0.015em", lineHeight: 1.38,
        color: "var(--color-ink)", marginBottom: "0.5rem",
      }}>
        {pub.doi
          ? <a href={pub.doi} target="_blank" rel="noopener noreferrer"
              className="hover-primary" style={{ textDecoration: "none", color: "inherit" }}>
              {pub.title} ↗
            </a>
          : pub.title}
      </h3>

      <p className="text-meta" style={{ fontFamily: "var(--font-sans)", fontSize: "13.5px", marginBottom: "0.3rem" }}>
        {pub.authors.split(", ").map((author, idx) => (
          <span key={author}>
            {author === "Ruthwick Meduri" ? (
              <strong style={{ color: "var(--color-ink)", fontWeight: 600 }}>{author}</strong>
            ) : (
              author
            )}
            {idx < pub.authors.split(", ").length - 1 ? ", " : ""}
          </span>
        ))}
      </p>
      
      <p className="text-meta" style={{ fontFamily: "var(--font-sans)", fontSize: "13px", fontStyle: "italic", marginBottom: "0.75rem" }}>
        {pub.journal}
      </p>

      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "1rem", flexWrap: "wrap" }}>
        <button onClick={() => setOpen(!open)}
          className="text-primary"
          style={{
            fontFamily: "var(--font-mono)", fontSize: "11px", background: "none",
            border: "none", cursor: "pointer", padding: 0, letterSpacing: "0.05em",
            fontWeight: 500,
          }}>
          {open ? "Hide abstract ↑" : "Read abstract ↓"}
        </button>

        <div style={{ display: "flex", gap: "0.4rem", flexWrap: "wrap" }}>
          {pub.tags.map(t => (
            <span key={t} style={{
              fontFamily: "var(--font-mono)", fontSize: "10px",
              padding: "0.15rem 0.5rem",
              border: "1px solid var(--color-line)",
              borderRadius: "3px", color: "var(--color-meta)",
              backgroundColor: "var(--color-tile)",
            }}>{t}</span>
          ))}
        </div>
      </div>

      {open && (
        <p className="text-body" style={{
          fontFamily: "var(--font-sans)", fontSize: "13.5px", lineHeight: "1.75",
          marginTop: "1rem", paddingLeft: "1rem",
          borderLeft: "2px solid var(--color-primary)",
          backgroundColor: "var(--color-tile)",
          padding: "0.85rem 1rem",
          borderRadius: "0 4px 4px 0",
        }}>
          {pub.abstract}
        </p>
      )}
    </div>
  );
}

export default function Publications() {
  return (
    <section id="publications" style={{ background: "var(--color-paper)", borderTop: "1px solid var(--color-line)" }}>
      <div className="mx-auto px-6 sm:px-10 py-24" style={{ maxWidth: "90rem" }}>
        <div style={{ marginBottom: "2.5rem", display: "flex", justifyContent: "space-between", alignItems: "baseline", flexWrap: "wrap", gap: "1rem" }}>
          <div>
            <p className="text-primary" style={{
              fontFamily: "var(--font-mono)", fontSize: "11px",
              textTransform: "uppercase", letterSpacing: "0.25em", marginBottom: "0.5rem",
            }}>Research output</p>
            <h2 style={{
              fontFamily: "var(--font-sans)", fontWeight: 700,
              fontSize: "clamp(1.75rem, 3vw, 2.25rem)",
              letterSpacing: "-0.03em", color: "var(--color-ink)",
            }}>Publications</h2>
          </div>
          <a href="https://scholar.google.com" target="_blank" rel="noopener noreferrer"
            className="text-primary" style={{ fontFamily: "var(--font-sans)", fontSize: "13px", textDecoration: "none" }}>
            Google Scholar →
          </a>
        </div>

        <div style={{ maxWidth: "56rem", display: "flex", flexDirection: "column" }}>
          {publications.map(p => <PubRow key={p.id} pub={p} />)}
        </div>
      </div>
    </section>
  );
}
