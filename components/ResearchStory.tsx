"use client";

import { useEffect, useRef, useState } from "react";

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * Math.min(Math.max(t, 0), 1);
}

// =============================================================
// STORY 1 SCENES: Promoter Architecture & CAGE-seq
// =============================================================

// ── S1 Scene 1: CAGE Data Points Pairing ──────────────────────
function S1_Scene1({ progress }: { progress: number }) {
  const t = progress;

  const scattered = [
    { x: 20, y: 70 }, { x: 38, y: 62 }, { x: 26, y: 36 }, { x: 62, y: 74 },
    { x: 78, y: 40 }, { x: 52, y: 24 }, { x: 86, y: 64 }, { x: 16, y: 46 },
    { x: 66, y: 32 }, { x: 34, y: 76 }, { x: 48, y: 54 }, { x: 82, y: 22 },
  ];
  const paired = [
    { x: 28, y: 60 }, { x: 40, y: 60 }, { x: 28, y: 44 }, { x: 40, y: 44 },
    { x: 58, y: 60 }, { x: 70, y: 60 }, { x: 58, y: 40 }, { x: 70, y: 40 },
    { x: 44, y: 26 }, { x: 56, y: 26 }, { x: 76, y: 26 }, { x: 88, y: 26 },
  ];

  return (
    <svg viewBox="0 0 100 100" className="w-full h-full select-none">
      {[0, 2, 4, 6, 8, 10].map(i => {
        const p1 = { x: lerp(scattered[i].x, paired[i].x, t), y: lerp(scattered[i].y, paired[i].y, t) };
        const p2 = { x: lerp(scattered[i + 1].x, paired[i + 1].x, t), y: lerp(scattered[i + 1].y, paired[i + 1].y, t) };
        return (
          <line
            key={i}
            x1={p1.x}
            y1={p1.y}
            x2={p2.x}
            y2={p2.y}
            stroke="var(--color-primary)"
            strokeWidth="0.4"
            opacity={0.15 + t * 0.45}
            strokeDasharray="1.5 1.5"
          />
        );
      })}

      {scattered.map((pt, i) => {
        const cx = lerp(pt.x, paired[i].x, t);
        const cy = lerp(pt.y, paired[i].y, t);
        const isLead = i % 2 === 0;
        return (
          <g key={i}>
            <circle
              cx={cx}
              cy={cy}
              r={2 + Math.sin(t * Math.PI + i) * 0.4}
              fill={isLead ? "var(--color-primary)" : "var(--color-meta)"}
              opacity={0.7 + t * 0.25}
            />
            {t > 0.4 && (
              <circle
                cx={cx}
                cy={cy}
                r={3.5 + Math.sin(t * Math.PI * 2 + i) * 0.5}
                fill="none"
                stroke={isLead ? "var(--color-primary)" : "var(--color-meta)"}
                strokeWidth="0.3"
                opacity={(t - 0.4) * 0.6}
              />
            )}
          </g>
        );
      })}

      <text
        x="50"
        y="92"
        textAnchor="middle"
        fontSize="3.5"
        fill="var(--color-meta)"
        fontFamily="'JetBrains Mono', monospace"
        opacity={0.4 + t * 0.6}
      >
        {t < 0.5 ? "Scattered CAGE Peaks" : "Promoter–Enhancer TSS Pairs"}
      </text>
    </svg>
  );
}

// ── S1 Scene 2: Denoising Autoencoder ─────────────────────────
function S1_Scene2({ progress }: { progress: number }) {
  const t = progress;

  const cols: Record<string, [number, number[]]> = {
    inp: [12, [18, 30, 42, 54, 66, 78]],
    e1:  [32, [26, 42, 58, 70]],
    bot: [50, [38, 54]],
    d1:  [68, [26, 42, 58, 70]],
    out: [88, [18, 30, 42, 54, 66, 78]],
  };

  const layers: [string, string, string, number][] = [
    ["inp", "e1",  "var(--color-primary)", 0.0],
    ["e1",  "bot", "var(--color-primary)", 0.2],
    ["bot", "d1",  "var(--color-meta)",    0.4],
    ["d1",  "out", "var(--color-meta)",    0.6],
  ];

  return (
    <svg viewBox="0 0 100 100" className="w-full h-full select-none">
      {layers.map(([fk, tk, color, delay]) => {
        const [fx, fys] = cols[fk];
        const [tx, tys] = cols[tk];
        const et = Math.max(0, Math.min(1, (t - delay) * 2.2));
        return fys.flatMap((fy, fi) =>
          tys.map((ty, ti) => (
            <line
              key={`${fk}-${fi}-${ti}`}
              x1={fx}
              y1={fy}
              x2={lerp(fx, tx, et)}
              y2={lerp(fy, ty, et)}
              stroke={color}
              strokeWidth="0.25"
              opacity={0.08 + et * 0.3}
            />
          ))
        );
      })}

      {Object.entries(cols).map(([key, [x, ys]]) =>
        (ys as number[]).map((y, i) => {
          const isBot = key === "bot";
          const isPrimary = key === "inp" || key === "e1" || key === "bot";
          return (
            <g key={`${key}-${i}`}>
              <circle
                cx={x}
                cy={y}
                r={isBot ? 3.6 : 2.2}
                fill={isPrimary ? "var(--color-primary)" : "var(--color-meta)"}
                opacity={0.25 + t * 0.75}
              />
              {isBot && (
                <circle
                  cx={x}
                  cy={y}
                  r={5 + Math.sin(t * Math.PI * 3 + i) * 0.8}
                  fill="none"
                  stroke="var(--color-primary)"
                  strokeWidth="0.35"
                  opacity={0.3 + t * 0.5}
                />
              )}
            </g>
          );
        })
      )}

      {([["12", "Input"], ["32", "Enc"], ["50", "Latent"], ["68", "Dec"], ["88", "Denoised"]] as [string, string][]).map(([x, label]) => (
        <text
          key={label}
          x={Number(x)}
          y="88"
          textAnchor="middle"
          fontSize="3.2"
          fill="var(--color-meta)"
          fontFamily="'JetBrains Mono', monospace"
        >
          {label}
        </text>
      ))}
    </svg>
  );
}

// ── S1 Scene 3: Clusters Emerging ─────────────────────────────
function S1_Scene3({ progress }: { progress: number }) {
  const t = progress;

  const points = Array.from({ length: 30 }, (_, i) => ({
    sx: 15 + ((i * 37) % 70),
    sy: 15 + ((i * 47) % 65),
    tx: [26, 62, 74][i % 3] + (((i * 7) % 18) - 9) * (1 - t * 0.3),
    ty: [62, 30, 64][i % 3] + (((i * 11) % 14) - 7) * (1 - t * 0.3),
    c: ["var(--color-primary)", "var(--color-meta)", "var(--color-ink)"][i % 3],
  }));

  const clusters = [
    { x: 26, y: 62, label: "Ubiquitous", color: "var(--color-primary)" },
    { x: 62, y: 30, label: "Tissue-specific", color: "var(--color-meta)" },
    { x: 74, y: 64, label: "Developmental", color: "var(--color-ink)" },
  ];

  return (
    <svg viewBox="0 0 100 100" className="w-full h-full select-none">
      {clusters.map((cl, idx) => (
        <ellipse
          key={idx}
          cx={cl.x}
          cy={cl.y}
          rx={16 * t}
          ry={13 * t}
          fill="none"
          stroke={cl.color}
          strokeWidth="0.3"
          strokeDasharray="2 2"
          opacity={t * 0.4}
        />
      ))}

      {points.map((pt, i) => (
        <circle
          key={i}
          cx={lerp(pt.sx, pt.tx, t)}
          cy={lerp(pt.sy, pt.ty, t)}
          r={1.8}
          fill={pt.c}
          opacity={0.8}
        />
      ))}

      {clusters.map(({ x, y, label }, idx) => (
        <text
          key={label}
          x={x}
          y={idx === 1 ? y - 10 : y + 15}
          textAnchor="middle"
          fontSize="3.6"
          fill="var(--color-meta)"
          fontFamily="'JetBrains Mono', monospace"
          opacity={Math.min(Math.max((t - 0.3) * 1.5, 0), 1)}
        >
          {label}
        </text>
      ))}
    </svg>
  );
}

// ── S1 Scene 4: Core-Covariant Network ────────────────────────
function S1_Scene4({ progress }: { progress: number }) {
  const t = progress;

  const core = [
    { x: 50, y: 50, label: "TATA",  r: 5.2 },
    { x: 36, y: 40, label: "Inr",   r: 3.8 },
    { x: 64, y: 40, label: "DPE",   r: 3.8 },
    { x: 40, y: 62, label: "BRE",   r: 3.8 },
    { x: 60, y: 62, label: "MTE",   r: 3.8 },
  ];
  const cov = [
    { x: 18, y: 26, label: "H3K4me3" },
    { x: 82, y: 24, label: "ATAC" },
    { x: 14, y: 70, label: "CTCF" },
    { x: 84, y: 70, label: "YY1" },
    { x: 50, y: 12, label: "Pol II" },
    { x: 28, y: 84, label: "p300" },
    { x: 72, y: 84, label: "BRD4" },
  ];
  const edges = [
    [0, 5], [1, 5], [2, 5],
    [0, 6], [2, 6], [3, 7],
    [0, 8], [1, 9], [2, 9],
    [3, 10], [4, 11],
    [0, 1], [0, 2], [0, 3], [0, 4],
  ];
  const all = [...core, ...cov];

  return (
    <svg viewBox="0 0 100 100" className="w-full h-full select-none">
      {edges.map(([a, b], i) => {
        const et = Math.max(0, Math.min(1, (t - i * 0.05) * 2));
        return (
          <line
            key={i}
            x1={all[a].x}
            y1={all[a].y}
            x2={lerp(all[a].x, all[b].x, et)}
            y2={lerp(all[a].y, all[b].y, et)}
            stroke="var(--color-line)"
            strokeWidth="0.45"
            opacity={0.15 + et * 0.55}
          />
        );
      })}

      {cov.map((n, i) => (
        <g key={`cov${i}`} opacity={Math.min(Math.max((t - 0.1) * 1.5, 0), 1)}>
          <circle cx={n.x} cy={n.y} r={3.2} fill="var(--color-tile)" stroke="var(--color-line)" strokeWidth="0.6" />
          <text
            x={n.x}
            y={n.y + 6.5}
            textAnchor="middle"
            fontSize="2.8"
            fill="var(--color-meta)"
            fontFamily="'JetBrains Mono', monospace"
          >
            {n.label}
          </text>
        </g>
      ))}

      {core.map((n, i) => (
        <g key={`core${i}`} opacity={Math.min(Math.max(t * 1.5, 0.2), 1)}>
          <circle
            cx={n.x}
            cy={n.y}
            r={n.r + Math.sin(t * Math.PI * 2 + i) * 0.4}
            fill="var(--color-primary)"
            opacity="0.9"
          />
          <text
            x={n.x}
            y={n.y + n.r + 4.2}
            textAnchor="middle"
            fontSize="3.2"
            fill="var(--color-ink)"
            fontFamily="'JetBrains Mono', monospace"
            fontWeight="500"
          >
            {n.label}
          </text>
        </g>
      ))}
    </svg>
  );
}

// ── S1 Scene 5: Genome Double Helix ───────────────────────────
function S1_Scene5({ progress }: { progress: number }) {
  const t = progress;
  const count = Math.max(2, Math.floor(t * 40));

  const strand1 = Array.from({ length: 40 }, (_, i) => ({
    x: Number((50 + Math.cos((i / 39) * Math.PI * 4 + Math.PI / 2) * 14).toFixed(2)),
    y: Number((8 + (i / 39) * 78).toFixed(2)),
  }));
  const strand2 = Array.from({ length: 40 }, (_, i) => ({
    x: Number((50 + Math.cos((i / 39) * Math.PI * 4 + Math.PI / 2 + Math.PI) * 14).toFixed(2)),
    y: Number((8 + (i / 39) * 78).toFixed(2)),
  }));

  return (
    <svg viewBox="0 0 100 100" className="w-full h-full select-none">
      {strand1.slice(0, count).filter((_, i) => i % 3 === 0).map((pt, i) => {
        const b = strand2[i * 3];
        if (!b) return null;
        return (
          <line
            key={`bp${i}`}
            x1={pt.x}
            y1={pt.y}
            x2={b.x}
            y2={b.y}
            stroke="var(--color-line)"
            strokeWidth="0.6"
            opacity={0.8}
          />
        );
      })}

      {strand1.slice(0, count).map((pt, i) => {
        if (i === 0) return null;
        const prev = strand1[i - 1];
        return (
          <line
            key={`s1${i}`}
            x1={prev.x}
            y1={prev.y}
            x2={pt.x}
            y2={pt.y}
            stroke="var(--color-primary)"
            strokeWidth="1.5"
            strokeLinecap="round"
            opacity="0.9"
          />
        );
      })}

      {strand2.slice(0, count).map((pt, i) => {
        if (i === 0) return null;
        const prev = strand2[i - 1];
        return (
          <line
            key={`s2${i}`}
            x1={prev.x}
            y1={prev.y}
            x2={pt.x}
            y2={pt.y}
            stroke="var(--color-meta)"
            strokeWidth="1.5"
            strokeLinecap="round"
            opacity="0.75"
          />
        );
      })}

      {t > 0.4 && (
        <>
          <rect x="70" y="32" width="22" height="6" fill="var(--color-primary)" opacity={(t - 0.4) * 0.25} rx="1" />
          <text x="81" y="36.5" textAnchor="middle" fontSize="3.2" fill="var(--color-primary)"
            fontFamily="'JetBrains Mono', monospace" opacity={Math.min((t - 0.4) * 2, 1)}>BRCA1</text>
          
          <rect x="70" y="56" width="22" height="6" fill="var(--color-meta)" opacity={(t - 0.4) * 0.2} rx="1" />
          <text x="81" y="60.5" textAnchor="middle" fontSize="3.2" fill="var(--color-meta)"
            fontFamily="'JetBrains Mono', monospace" opacity={Math.min((t - 0.4) * 2, 1)}>TP53</text>
        </>
      )}

      {t > 0.75 && (
        <text
          x="50"
          y="95"
          textAnchor="middle"
          fontSize="4.8"
          fill="var(--color-ink)"
          fontFamily="var(--font-serif)"
          fontStyle="italic"
          opacity={Math.min((t - 0.75) * 4, 1)}
        >
          Explore the work
        </text>
      )}
    </svg>
  );
}

// =============================================================
// STORY 2 SCENES: Chromatin Accessibility, TFBSs & Evolution (105 Species)
// =============================================================

// ── S2 Scene 1: Chromatin Accessibility & Nucleosome Unwinding ──
function S2_Scene1({ progress }: { progress: number }) {
  const t = progress;

  // Nucleosome positions with unwinding in the center
  const nucleosomes = [
    { x: 18, y: 64, open: false },
    { x: 34, y: lerp(64, 76, t), open: true },
    { x: 66, y: lerp(64, 76, t), open: true },
    { x: 82, y: 64, open: false },
  ];

  return (
    <svg viewBox="0 0 100 100" className="w-full h-full select-none">
      {/* Baseline DNA Track */}
      <path
        d="M 6 64 Q 25 64 35 64 Q 50 64 65 64 Q 75 64 94 64"
        fill="none"
        stroke="var(--color-line)"
        strokeWidth="0.8"
      />

      {/* Accessible Chromatin Peak (ATAC-seq signal rise) */}
      <path
        d={`M 26 64 C 38 64, 40 ${64 - t * 40}, 50 ${64 - t * 44} C 60 ${64 - t * 40}, 62 64, 74 64 Z`}
        fill="var(--color-primary)"
        opacity={0.15 + t * 0.25}
      />
      <path
        d={`M 26 64 C 38 64, 40 ${64 - t * 40}, 50 ${64 - t * 44} C 60 ${64 - t * 40}, 62 64, 74 64`}
        fill="none"
        stroke="var(--color-primary)"
        strokeWidth="1.2"
        strokeLinecap="round"
      />

      {/* Nucleosome Octamers (beads) */}
      {nucleosomes.map((n, i) => (
        <g key={i}>
          <circle
            cx={n.x}
            cy={n.y}
            r={n.open ? lerp(5.5, 4.2, t) : 5.5}
            fill={n.open ? "var(--color-tile)" : "var(--color-meta)"}
            stroke="var(--color-line)"
            strokeWidth="0.8"
            opacity={n.open ? 0.6 : 0.85}
          />
          <text
            x={n.x}
            y={n.y + 1.2}
            textAnchor="middle"
            fontSize="2.4"
            fill="var(--color-ink)"
            fontFamily="'JetBrains Mono', monospace"
          >
            H3
          </text>
        </g>
      ))}

      {/* Peak callout label */}
      {t > 0.4 && (
        <g opacity={Math.min((t - 0.4) * 2, 1)}>
          <line x1="50" y1={64 - t * 44} x2="50" y2="12" stroke="var(--color-primary)" strokeWidth="0.4" strokeDasharray="1.5 1.5" />
          <text x="50" y="10" textAnchor="middle" fontSize="3.4" fill="var(--color-primary)" fontFamily="'JetBrains Mono', monospace" fontWeight="600">
            Open Chromatin Region
          </text>
          <text x="50" y="88" textAnchor="middle" fontSize="3.0" fill="var(--color-meta)" fontFamily="'JetBrains Mono', monospace">
            ATAC-seq / DNase-I Sensitivity
          </text>
        </g>
      )}
    </svg>
  );
}

// ── S2 Scene 2: Transcription Factor Binding Sites (TFBSs) ─────
function S2_Scene2({ progress }: { progress: number }) {
  const t = progress;

  const motifs = [
    { x: 26, name: "CTCF", color: "var(--color-primary)", offset: 0 },
    { x: 50, name: "FOXA1", color: "var(--color-primary)", offset: 0.2 },
    { x: 74, name: "GATA3", color: "var(--color-meta)", offset: 0.4 },
  ];

  return (
    <svg viewBox="0 0 100 100" className="w-full h-full select-none">
      {/* Genomic DNA Sequence Line */}
      <line x1="10" y1="62" x2="90" y2="62" stroke="var(--color-line)" strokeWidth="1.2" />

      {/* Motif Consensus Base Rungs */}
      {Array.from({ length: 28 }, (_, i) => {
        const x = 14 + i * 2.65;
        const inMotif = (x > 22 && x < 30) || (x > 45 && x < 55) || (x > 69 && x < 79);
        return (
          <g key={i}>
            <line
              x1={x}
              y1="57"
              x2={x}
              y2="67"
              stroke={inMotif ? "var(--color-primary)" : "var(--color-line)"}
              strokeWidth={inMotif ? "0.8" : "0.4"}
              opacity={inMotif ? 0.9 : 0.4}
            />
          </g>
        );
      })}

      {/* Transcription Factor Proteins Docking */}
      {motifs.map((m, i) => {
        const mt = Math.max(0, Math.min(1, (t - m.offset) * 2));
        const py = lerp(18, 48, mt);
        return (
          <g key={i} opacity={0.2 + mt * 0.8}>
            {/* Docking guide */}
            {mt > 0.5 && (
              <line x1={m.x} y1={py + 6} x2={m.x} y2="60" stroke={m.color} strokeWidth="0.4" strokeDasharray="1 1" />
            )}
            {/* TF Protein Blob */}
            <ellipse
              cx={m.x}
              cy={py}
              rx="7.5"
              ry="5.5"
              fill={m.color}
              opacity={0.85}
            />
            <text
              x={m.x}
              y={py + 1.2}
              textAnchor="middle"
              fontSize="2.8"
              fill="#ffffff"
              fontFamily="'JetBrains Mono', monospace"
              fontWeight="600"
            >
              {m.name}
            </text>
            <text
              x={m.x}
              y="77"
              textAnchor="middle"
              fontSize="2.6"
              fill="var(--color-meta)"
              fontFamily="'JetBrains Mono', monospace"
              opacity={mt}
            >
              Motif #{i + 1}
            </text>
          </g>
        );
      })}

      {/* Footprint annotation */}
      <text
        x="50"
        y="92"
        textAnchor="middle"
        fontSize="3.2"
        fill="var(--color-meta)"
        fontFamily="'JetBrains Mono', monospace"
      >
        {t < 0.6 ? "Scanning TFBS consensus motifs..." : "High-affinity TF binding occupancy"}
      </text>
    </svg>
  );
}

// ── S2 Scene 3: Random Forest Machine Learning Ensemble ───────
function S2_Scene3({ progress }: { progress: number }) {
  const t = progress;

  // 3 Decision trees representing Random Forest ensemble
  const trees = [
    { rootX: 24, label: "Tree 1 (Accessibility)" },
    { rootX: 50, label: "Tree 2 (TFBS Count)" },
    { rootX: 76, label: "Tree 3 (Sequence Context)" },
  ];

  return (
    <svg viewBox="0 0 100 100" className="w-full h-full select-none">
      {trees.map((tree, tidx) => {
        const treeT = Math.max(0, Math.min(1, (t - tidx * 0.12) * 2));
        const rx = tree.rootX;
        return (
          <g key={tidx} opacity={0.25 + treeT * 0.75}>
            {/* Root node */}
            <circle cx={rx} cy="22" r="3.2" fill="var(--color-primary)" opacity="0.9" />

            {/* Level 1 branches */}
            <line x1={rx} y1="22" x2={rx - 7} y2="38" stroke="var(--color-line)" strokeWidth="0.6" />
            <line x1={rx} y1="22" x2={rx + 7} y2="38" stroke="var(--color-line)" strokeWidth="0.6" />
            <circle cx={rx - 7} cy="38" r="2.4" fill="var(--color-meta)" />
            <circle cx={rx + 7} cy="38" r="2.4" fill="var(--color-meta)" />

            {/* Level 2 leaf nodes */}
            {treeT > 0.4 && (
              <>
                <line x1={rx - 7} y1="38" x2={rx - 10} y2="52" stroke="var(--color-line)" strokeWidth="0.4" />
                <line x1={rx - 7} y1="38" x2={rx - 4} y2="52" stroke="var(--color-line)" strokeWidth="0.4" />
                <line x1={rx + 7} y1="38" x2={rx + 4} y2="52" stroke="var(--color-line)" strokeWidth="0.4" />
                <line x1={rx + 7} y1="38" x2={rx + 10} y2="52" stroke="var(--color-line)" strokeWidth="0.4" />
                
                <rect x={rx - 12} y="51" width="3.8" height="3" fill="var(--color-primary)" rx="0.5" />
                <rect x={rx - 6} y="51" width="3.8" height="3" fill="var(--color-line)" rx="0.5" />
                <rect x={rx + 2} y="51" width="3.8" height="3" fill="var(--color-line)" rx="0.5" />
                <rect x={rx + 8} y="51" width="3.8" height="3" fill="var(--color-primary)" rx="0.5" />
              </>
            )}
          </g>
        );
      })}

      {/* Ensemble Voting Bar */}
      {t > 0.5 && (
        <g opacity={Math.min((t - 0.5) * 2.2, 1)}>
          <line x1="15" y1="68" x2="85" y2="68" stroke="var(--color-line)" strokeWidth="0.5" />
          <rect x="22" y="74" width="56" height="7" fill="var(--color-tile)" stroke="var(--color-line)" strokeWidth="0.5" rx="1.5" />
          <rect x="22" y="74" width={56 * Math.min(1, (t - 0.5) * 2)} height="7" fill="var(--color-primary)" opacity="0.85" rx="1.5" />
          <text x="50" y="79" textAnchor="middle" fontSize="3.0" fill="#ffffff" fontFamily="'JetBrains Mono', monospace" fontWeight="600">
            Random Forest Ensemble Prediction
          </text>
        </g>
      )}

      <text
        x="50"
        y="93"
        textAnchor="middle"
        fontSize="3.2"
        fill="var(--color-meta)"
        fontFamily="'JetBrains Mono', monospace"
      >
        Feature Importance & Multi-Tree Classification
      </text>
    </svg>
  );
}

// ── S2 Scene 4: Evolutionary Conservation across 105 Species ──
function S2_Scene4({ progress }: { progress: number }) {
  const t = progress;

  // Phylogenetic tree branches
  const speciesList = [
    { name: "H. sapiens", y: 18, conserved: true },
    { name: "P. troglodytes", y: 28, conserved: true },
    { name: "M. mulatta", y: 38, conserved: true },
    { name: "M. musculus", y: 48, conserved: true },
    { name: "C. familiaris", y: 58, conserved: true },
    { name: "B. taurus", y: 68, conserved: true },
    { name: "... 105 Species", y: 78, conserved: false },
  ];

  return (
    <svg viewBox="0 0 100 100" className="w-full h-full select-none">
      {/* Phylogenetic Tree Backbone */}
      <path
        d="M 12 48 H 22 V 28 H 32 V 18 H 42 M 32 28 H 42 M 22 48 V 68 H 32 V 58 H 42 M 32 68 H 42 M 12 48 V 78 H 42"
        fill="none"
        stroke="var(--color-line)"
        strokeWidth="0.7"
      />

      {/* Species Nodes & Alignment Blocks */}
      {speciesList.map((sp, idx) => {
        const rowT = Math.max(0, Math.min(1, (t - idx * 0.08) * 2));
        return (
          <g key={idx} opacity={0.2 + rowT * 0.8}>
            {/* Species label */}
            <text
              x="45"
              y={sp.y + 1}
              fontSize="2.8"
              fill={idx === 6 ? "var(--color-primary)" : "var(--color-ink)"}
              fontFamily="'JetBrains Mono', monospace"
              fontWeight={idx === 0 ? "600" : "400"}
            >
              {sp.name}
            </text>

            {/* Conserved synteny bar */}
            <rect
              x="74"
              y={sp.y - 2.5}
              width={lerp(4, 18, rowT)}
              height="4"
              fill={sp.conserved ? "var(--color-primary)" : "var(--color-meta)"}
              opacity={0.8}
              rx="0.6"
            />
          </g>
        );
      })}

      {/* Conservation score (phyloP) ribbon */}
      {t > 0.6 && (
        <g opacity={Math.min((t - 0.6) * 2.5, 1)}>
          <line x1="74" y1="12" x2="74" y2="85" stroke="var(--color-primary)" strokeWidth="0.4" strokeDasharray="1 1" />
          <text x="83" y="10" textAnchor="middle" fontSize="2.7" fill="var(--color-primary)" fontFamily="'JetBrains Mono', monospace" fontWeight="600">
            phyloP Score
          </text>
        </g>
      )}

      <text
        x="50"
        y="93"
        textAnchor="middle"
        fontSize="3.1"
        fill="var(--color-meta)"
        fontFamily="'JetBrains Mono', monospace"
      >
        Evolutionary Conservation across 105 Vertebrate Species
      </text>
    </svg>
  );
}

// ── S2 Scene 5: Evolutionary Insights & Regulatory Grammar ─────
function S2_Scene5({ progress }: { progress: number }) {
  const t = progress;

  // Syntenic regulatory grammar blocks
  const blocks = [
    { x: 18, label: "Core Promoter", w: 18, c: "var(--color-primary)" },
    { x: 42, label: "TFBS Cluster",  w: 22, c: "var(--color-primary)" },
    { x: 70, label: "Enhancer",      w: 16, c: "var(--color-meta)" },
  ];

  return (
    <svg viewBox="0 0 100 100" className="w-full h-full select-none">
      {/* Ancestral to Modern Genome Flow */}
      <line x1="12" y1="28" x2="88" y2="28" stroke="var(--color-line)" strokeWidth="0.6" />
      <text x="14" y="24" fontSize="2.8" fill="var(--color-meta)" fontFamily="'JetBrains Mono', monospace">
        Ancestral State (105 Species Alignment)
      </text>

      <line x1="12" y1="62" x2="88" y2="62" stroke="var(--color-primary)" strokeWidth="0.8" />
      <text x="14" y="58" fontSize="2.8" fill="var(--color-primary)" fontFamily="'JetBrains Mono', monospace" fontWeight="600">
        Modern Human Genome (hg38)
      </text>

      {/* Syntenic connecting bridges */}
      {blocks.map((b, i) => {
        const bt = Math.max(0, Math.min(1, (t - i * 0.15) * 2));
        return (
          <g key={i} opacity={0.2 + bt * 0.8}>
            {/* Ancestral block */}
            <rect x={b.x} y="26" width={b.w} height="4" fill={b.c} opacity="0.6" rx="0.5" />

            {/* Connecting flow stream */}
            <path
              d={`M ${b.x} 30 L ${b.x} 60 L ${b.x + b.w} 60 L ${b.x + b.w} 30 Z`}
              fill={b.c}
              opacity={0.12 * bt}
            />

            {/* Modern block */}
            <rect x={b.x} y="60" width={b.w} height="4" fill={b.c} opacity="0.9" rx="0.5" />

            <text
              x={b.x + b.w / 2}
              y="72"
              textAnchor="middle"
              fontSize="2.7"
              fill="var(--color-ink)"
              fontFamily="'JetBrains Mono', monospace"
            >
              {b.label}
            </text>
          </g>
        );
      })}

      {/* Final insight callout */}
      {t > 0.7 && (
        <text
          x="50"
          y="88"
          textAnchor="middle"
          fontSize="4.5"
          fill="var(--color-ink)"
          fontFamily="var(--font-serif)"
          fontStyle="italic"
          opacity={Math.min((t - 0.7) * 3.5, 1)}
        >
          Deep evolutionary constraints on gene regulation
        </text>
      )}
    </svg>
  );
}

// =============================================================
// STORIES DATA DEFINITIONS
// =============================================================

const stories = [
  {
    id: "story-1",
    tabLabel: "TSS Coregulatory Networks",
    badge: "PROJECT 01",
    scenes: [
      {
        id: "s1-cage",
        mono: "01 · CAGE-seq",
        title: "Millions of transcription start sites",
        body: "CAGE-seq maps the precise nucleotide origin of every gene's transcription across hundreds of tissues — each point a moment where biology begins.",
        Component: S1_Scene1,
      },
      {
        id: "s1-ae",
        mono: "02 · Deep learning",
        title: "Signal from noise",
        body: "A denoising autoencoder learns a compressed latent representation, separating biological signal from technical variation across thousands of samples.",
        Component: S1_Scene2,
      },
      {
        id: "s1-clusters",
        mono: "03 · Regulatory programs",
        title: "Structure in transcriptome space",
        body: "Unsupervised clustering of the latent space reveals three broad classes of promoter activity — ubiquitous housekeeping, tissue-specific, and developmental.",
        Component: S1_Scene3,
      },
      {
        id: "s1-network",
        mono: "04 · Core-covariant architecture",
        title: "Promoters and their partners",
        body: "Core promoter elements co-vary with distal enhancers, TF binding sites, and chromatin marks — revealing a layered regulatory network.",
        Component: S1_Scene4,
      },
      {
        id: "s1-genome",
        mono: "05 · Genomic insight",
        title: "Decoding gene regulation",
        body: "From raw sequencing to regulatory logic — computational genomics reveals the grammar that drives development, identity, and disease.",
        Component: S1_Scene5,
      },
    ],
  },
  {
    id: "story-2",
    tabLabel: "Predictive Application of ATAC-seq",
    badge: "PROJECT 02",
    scenes: [
      {
        id: "s2-chromatin",
        mono: "01 · Chromatin accessibility",
        title: "The open regulatory landscape",
        body: "ATAC-seq and DNase-I sensitivity profiling map accessible DNA regions across the genome where nucleosomes unwind to expose regulatory elements.",
        Component: S2_Scene1,
      },
      {
        id: "s2-tfbs",
        mono: "02 · TF binding sites",
        title: "Sequence motifs & protein footprints",
        body: "High-resolution transcription factor binding footprints reveal specific motif syntax that dictates promoter and enhancer activation.",
        Component: S2_Scene2,
      },
      {
        id: "s2-rf",
        mono: "03 · Random forest models",
        title: "Predictive ensemble classification",
        body: "Trained Random Forest decision ensembles integrate accessibility, sequence context, and TFBS density to identify active regulatory elements with high accuracy.",
        Component: S2_Scene3,
      },
      {
        id: "s2-evolution",
        mono: "04 · Evolution across 105 species",
        title: "Cross-species synteny & conservation",
        body: "Multi-species genome alignments across 105 vertebrate species trace the evolutionary conservation of regulatory elements over hundreds of millions of years.",
        Component: S2_Scene4,
      },
      {
        id: "s2-insight",
        mono: "05 · Evolutionary grammar",
        title: "Deep constraints on gene regulation",
        body: "Evolutionary conservation scores uncover fundamental regulatory constraints — identifying conserved genomic grammar essential for organismal survival.",
        Component: S2_Scene5,
      },
    ],
  },
];

// =============================================================
// MAIN COMPONENT WITH STORY TABS & STEPPER
// =============================================================

export default function ResearchStory() {
  const [selectedStory, setSelectedStory] = useState(0);
  const [active, setActive] = useState(0);
  const [progress, setProgress] = useState(1);
  const touchStartX = useRef<number | null>(null);

  const currentStory = stories[selectedStory];
  const scenes = currentStory.scenes;

  // Smooth animation playback when switching scene or story
  useEffect(() => {
    setProgress(0.15);
    let animId: number;
    let start: number | null = null;
    const duration = 1000;
    const step = (ts: number) => {
      if (!start) start = ts;
      const elapsed = ts - start;
      const p = Math.min(1, 0.15 + (elapsed / duration) * 0.85);
      setProgress(p);
      if (elapsed < duration) {
        animId = requestAnimationFrame(step);
      }
    };
    animId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animId);
  }, [active, selectedStory]);

  // Keyboard navigation support (ArrowLeft / ArrowRight)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") {
        setActive((prev) => Math.min(scenes.length - 1, prev + 1));
      } else if (e.key === "ArrowLeft") {
        setActive((prev) => Math.max(0, prev - 1));
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [scenes.length]);

  const handleStorySwitch = (storyIdx: number) => {
    setSelectedStory(storyIdx);
    setActive(0);
  };

  const jumpToScene = (sceneIndex: number) => {
    setActive(Math.max(0, Math.min(scenes.length - 1, sceneIndex)));
  };

  const handlePrev = (e: React.MouseEvent) => {
    e.preventDefault();
    setActive((prev) => Math.max(0, prev - 1));
  };

  const handleNext = (e: React.MouseEvent) => {
    e.preventDefault();
    setActive((prev) => Math.min(scenes.length - 1, prev + 1));
  };

  // Touch-swipe gestures for canvas
  const onCanvasTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const onCanvasTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX.current - touchEndX;
    if (Math.abs(diff) > 35) {
      if (diff > 0) {
        setActive((prev) => Math.min(scenes.length - 1, prev + 1));
      } else {
        setActive((prev) => Math.max(0, prev - 1));
      }
    }
    touchStartX.current = null;
  };

  return (
    <section
      id="research-story"
      style={{
        background: "var(--color-band)",
        borderTop: "1px solid var(--color-line)",
        borderBottom: "1px solid var(--color-line)",
      }}
      className="py-16 sm:py-24"
    >
      <div className="mx-auto px-6 sm:px-10 lg:px-12" style={{ maxWidth: "90rem" }}>
        
        {/* ── Top Story Selector Tabs ── */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-12 border-b border-line mb-12">
          <div>
            <p
              className="text-primary"
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "11px",
                textTransform: "uppercase",
                letterSpacing: "0.25em",
                marginBottom: "0.4rem",
              }}
            >
              Current Works
            </p>
            <h3
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "1.25rem",
                fontWeight: 700,
                color: "var(--color-ink)",
                letterSpacing: "-0.01em",
              }}
            >
              Explore ongoing research
            </h3>
          </div>

          {/* Story Switcher Buttons */}
          <div className="flex items-center gap-2 flex-wrap">
            {stories.map((s, sidx) => {
              const isSelected = selectedStory === sidx;
              return (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => handleStorySwitch(sidx)}
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "11px",
                    fontWeight: isSelected ? 600 : 400,
                    letterSpacing: "0.04em",
                    padding: "0.5rem 1rem",
                    borderRadius: "4px",
                    border: "1px solid",
                    borderColor: isSelected ? "var(--color-primary)" : "var(--color-line)",
                    backgroundColor: isSelected ? "var(--color-primary)" : "var(--color-paper)",
                    color: isSelected ? "#ffffff" : "var(--color-body)",
                    cursor: "pointer",
                    transition: "all 0.2s ease",
                  }}
                >
                  {s.tabLabel}
                </button>
              );
            })}
          </div>
        </div>

        {/* ── Main 2-Column Content Grid ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          
          {/* Left Column: Stacked animation canvases with smooth crossfade */}
          <div
            onTouchStart={onCanvasTouchStart}
            onTouchEnd={onCanvasTouchEnd}
            style={{
              width: "100%",
              maxWidth: "460px",
              aspectRatio: "1 / 1",
              margin: "0 auto",
              position: "relative",
              touchAction: "pan-y",
            }}
          >
            {scenes.map((scene, i) => {
              const Comp = scene.Component;
              const isCurrent = active === i;
              return (
                <div
                  key={scene.id}
                  style={{
                    position: "absolute",
                    inset: 0,
                    opacity: isCurrent ? 1 : 0,
                    transition: "opacity 0.4s ease-in-out",
                    pointerEvents: isCurrent ? "auto" : "none",
                  }}
                >
                  <Comp progress={isCurrent ? progress : 1} />
                </div>
              );
            })}
          </div>

          {/* Right Column: Text narrative, step pill indicators, and stepper buttons */}
          <div style={{ maxWidth: "30rem" }} className="flex flex-col gap-5">
            {/* Step Navigation Pills & Counter */}
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                {scenes.map((sc, i) => (
                  <button
                    key={sc.id}
                    type="button"
                    onClick={() => jumpToScene(i)}
                    aria-label={`Jump to scene ${i + 1}`}
                    style={{
                      height: "6px",
                      borderRadius: "3px",
                      border: "none",
                      padding: 0,
                      cursor: "pointer",
                      transition: "all 0.3s ease",
                      width: i === active ? "2.25rem" : "0.65rem",
                      backgroundColor: i === active ? "var(--color-primary)" : "var(--color-line)",
                    }}
                  />
                ))}
              </div>
              <span
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "11px",
                  color: "var(--color-meta)",
                  letterSpacing: "0.05em",
                }}
              >
                0{active + 1} / 0{scenes.length}
              </span>
            </div>

            {/* Scene Mono Category */}
            <p
              className="text-primary"
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "11px",
                textTransform: "uppercase",
                letterSpacing: "0.22em",
              }}
            >
              {scenes[active].mono}
            </p>

            {/* Scene Heading */}
            <h2
              style={{
                fontFamily: "var(--font-sans)",
                fontWeight: 700,
                fontSize: "clamp(1.5rem, 2.5vw, 2.1rem)",
                letterSpacing: "-0.025em",
                lineHeight: 1.2,
                color: "var(--color-ink)",
                minHeight: "3.2rem",
              }}
            >
              {scenes[active].title}
            </h2>

            {/* Scene Narrative */}
            <p
              className="text-body"
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "14px",
                lineHeight: "1.8",
                textWrap: "pretty",
                minHeight: "4.8rem",
              }}
            >
              {scenes[active].body}
            </p>

            {/* Interactive Stepper Action Bar */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                borderTop: "1px solid var(--color-line)",
                paddingTop: "1.5rem",
                marginTop: "0.5rem",
                flexWrap: "wrap",
                gap: "1rem",
              }}
            >
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={handlePrev}
                  disabled={active === 0}
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "12px",
                    fontWeight: 500,
                    letterSpacing: "0.05em",
                    color: active === 0 ? "var(--color-whisper)" : "var(--color-body)",
                    backgroundColor: "var(--color-paper)",
                    border: "1px solid var(--color-line)",
                    borderRadius: "4px",
                    padding: "0.55rem 1.1rem",
                    minHeight: "42px",
                    minWidth: "84px",
                    cursor: active === 0 ? "not-allowed" : "pointer",
                    touchAction: "manipulation",
                    transition: "all 0.2s ease",
                  }}
                  onMouseEnter={e => {
                    if (active > 0) (e.currentTarget as HTMLElement).style.borderColor = "var(--color-primary)";
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLElement).style.borderColor = "var(--color-line)";
                  }}
                >
                  ← Prev
                </button>

                {active < scenes.length - 1 ? (
                  <button
                    type="button"
                    onClick={handleNext}
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "12px",
                      fontWeight: 600,
                      letterSpacing: "0.05em",
                      color: "#ffffff",
                      backgroundColor: "var(--color-primary)",
                      border: "1px solid var(--color-primary)",
                      borderRadius: "4px",
                      padding: "0.55rem 1.25rem",
                      minHeight: "42px",
                      minWidth: "84px",
                      cursor: "pointer",
                      touchAction: "manipulation",
                      transition: "all 0.2s ease",
                    }}
                    onMouseEnter={e => ((e.currentTarget as HTMLElement).style.backgroundColor = "var(--color-primary-hover)")}
                    onMouseLeave={e => ((e.currentTarget as HTMLElement).style.backgroundColor = "var(--color-primary)")}
                  >
                    Next →
                  </button>
                ) : (
                  <a
                    href="#publications"
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "12px",
                      fontWeight: 600,
                      letterSpacing: "0.05em",
                      color: "#ffffff",
                      backgroundColor: "var(--color-primary)",
                      border: "1px solid var(--color-primary)",
                      borderRadius: "4px",
                      padding: "0.55rem 1.25rem",
                      minHeight: "42px",
                      display: "inline-flex",
                      alignItems: "center",
                      textDecoration: "none",
                      transition: "all 0.2s ease",
                    }}
                    onMouseEnter={e => ((e.currentTarget as HTMLElement).style.backgroundColor = "var(--color-primary-hover)")}
                    onMouseLeave={e => ((e.currentTarget as HTMLElement).style.backgroundColor = "var(--color-primary)")}
                  >
                    Publications →
                  </a>
                )}
              </div>

              {/* Navigation hint */}
              <span
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "11px",
                  color: "var(--color-meta)",
                }}
              >
                {active < scenes.length - 1 ? "Click Next or press →" : "Completed story"}
              </span>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
