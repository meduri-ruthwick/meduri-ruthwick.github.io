"use client";

import { useEffect, useRef, useState } from "react";

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * Math.min(Math.max(t, 0), 1);
}

// =============================================================
// STORY 1 SCENES: Promoter Architecture & CAGE-seq
// =============================================================

// ── S1 Scene 1: TSS-TSS Pairs in Pan-Promoterome ───────────────
function S1_Scene1({ progress }: { progress: number }) {
  const t = progress;

  // 4 Genomic Tracks spanning from Locus 1 to Locus n
  const loci = [
    {
      y: 19,
      label: "Locus 1",
      tss: [
        { id: "t1", x: 24, color: "var(--color-primary)", label: "TSS 1" },
        { id: "t2", x: 64, color: "var(--color-primary)", label: "TSS 2" },
      ],
      pair: { from: 24, to: 64, arcY: 8 },
    },
    {
      y: 38,
      label: "Locus 2",
      tss: [
        { id: "t3", x: 32, color: "var(--color-primary)", label: "TSS 3" },
        { id: "t4", x: 74, color: "var(--color-meta)", label: "TSS 4" },
      ],
      pair: { from: 32, to: 74, arcY: 27 },
    },
    {
      y: 57,
      label: "Locus 3",
      tss: [
        { id: "t5", x: 20, color: "var(--color-meta)", label: "TSS 5" },
        { id: "t6", x: 58, color: "var(--color-primary)", label: "TSS 6" },
      ],
      pair: { from: 20, to: 58, arcY: 46 },
    },
    {
      y: 76,
      label: "... Locus n",
      tss: [
        { id: "t7", x: 38, color: "var(--color-primary)", label: "TSS 7" },
        { id: "t8", x: 72, color: "var(--color-primary)", label: "TSS n" },
      ],
      pair: { from: 38, to: 72, arcY: 65 },
    },
  ];

  // Inter-TSS network links across different loci
  const interLinks = [
    { x1: 24, y1: 13, x2: 32, y2: 32, cx: 20, cy: 22 },
    { x1: 64, y1: 13, x2: 74, y2: 32, cx: 77, cy: 22 },
    { x1: 32, y1: 32, x2: 20, y2: 51, cx: 18, cy: 41 },
    { x1: 74, y1: 32, x2: 58, y2: 51, cx: 62, cy: 41 },
    { x1: 20, y1: 51, x2: 38, y2: 70, cx: 21, cy: 60 },
    { x1: 58, y1: 51, x2: 72, y2: 70, cx: 73, cy: 60 },
    // Cross-diagonal correlations
    { x1: 64, y1: 13, x2: 20, y2: 51, cx: 40, cy: 30 },
    { x1: 32, y1: 32, x2: 72, y2: 70, cx: 55, cy: 50 },
    { x1: 24, y1: 13, x2: 38, y2: 70, cx: 16, cy: 45 },
  ];

  return (
    <svg viewBox="0 0 100 100" className="w-full h-full select-none">
      {/* 4 Genomic DNA Baseline Tracks */}
      {loci.map((loc, li) => (
        <g key={`loc-${li}`}>
          <line
            x1="18"
            y1={loc.y}
            x2="90"
            y2={loc.y}
            stroke="var(--color-line)"
            strokeWidth="0.75"
          />
          <text
            x="16"
            y={loc.y + 1}
            textAnchor="end"
            fontSize="2.4"
            fill={li === 3 ? "var(--color-primary)" : "var(--color-meta)"}
            fontFamily="'JetBrains Mono', monospace"
            fontWeight={li === 3 ? "600" : "400"}
          >
            {loc.label}
          </text>
        </g>
      ))}

      {/* Intra-Locus TSS-TSS Covariance Arcs */}
      {loci.map((loc, li) => {
        const arcT = Math.max(0, Math.min(1, (t - 0.1 - li * 0.08) * 2));
        return (
          <g key={`arc-${li}`} opacity={arcT * 0.95}>
            <path
              d={`M ${loc.pair.from + 4} ${loc.y - 6} Q ${(loc.pair.from + loc.pair.to) / 2} ${loc.pair.arcY}, ${loc.pair.to + 4} ${loc.y - 6}`}
              fill="none"
              stroke="var(--color-primary)"
              strokeWidth="0.7"
              strokeDasharray="1.5 1.5"
              opacity={0.35 + arcT * 0.55}
            />
          </g>
        );
      })}

      {/* Inter-Locus All-TSS Network Bridges (Light interconnectivity) */}
      {interLinks.map((link, idx) => {
        const linkT = Math.max(0, Math.min(1, (t - 0.25 - idx * 0.04) * 2));
        return (
          <path
            key={`inter-${idx}`}
            d={`M ${link.x1 + 3} ${link.y1} Q ${link.cx} ${link.cy}, ${link.x2 + 3} ${link.y2}`}
            fill="none"
            stroke="var(--color-primary)"
            strokeWidth="0.38"
            strokeDasharray="1 1.2"
            opacity={linkT * 0.38}
          />
        );
      })}

      {/* Biological TSS Arrow Symbols (_|→) at each promoter locus */}
      {loci.map((loc, li) =>
        loc.tss.map((s, si) => {
          const appearT = Math.max(0, Math.min(1, (t - (li * 0.08 + si * 0.04)) * 2.5));
          const stemH = 6 * appearT;
          const arrowW = 5.5 * appearT;

          return (
            <g key={`tss-${li}-${si}`} opacity={0.25 + appearT * 0.75}>
              {/* Base peak pulse at TSS coordinate */}
              <circle
                cx={s.x}
                cy={loc.y}
                r={1.6 + Math.sin(t * Math.PI * 2 + li) * 0.25}
                fill={s.color}
                opacity="0.9"
              />
              
              {/* Vertical Step */}
              <line
                x1={s.x}
                y1={loc.y}
                x2={s.x}
                y2={loc.y - stemH}
                stroke={s.color}
                strokeWidth="1.0"
                strokeLinecap="square"
              />

              {/* Horizontal Rightward Transcription Arrow */}
              {stemH > 2.5 && (
                <>
                  <line
                    x1={s.x}
                    y1={loc.y - 6}
                    x2={s.x + arrowW}
                    y2={loc.y - 6}
                    stroke={s.color}
                    strokeWidth="1.0"
                    strokeLinecap="round"
                  />
                  {/* Arrowhead */}
                  {arrowW > 3.5 && (
                    <polyline
                      points={`${s.x + arrowW - 1.8},${loc.y - 7.5} ${s.x + arrowW},${loc.y - 6} ${s.x + arrowW - 1.8},${loc.y - 4.5}`}
                      fill="none"
                      stroke={s.color}
                      strokeWidth="1.0"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  )}
                </>
              )}

              {/* TSS Label */}
              <text
                x={s.x + 2.8}
                y={loc.y + 4.2}
                textAnchor="middle"
                fontSize="2.2"
                fill="var(--color-meta)"
                fontFamily="'JetBrains Mono', monospace"
                opacity={Math.min(appearT * 1.5, 1)}
              >
                {s.label}
              </text>
            </g>
          );
        })
      )}

      {/* Caption Tag */}
      <text
        x="50"
        y="93.5"
        textAnchor="middle"
        fontSize="3.2"
        fill="var(--color-meta)"
        fontFamily="'JetBrains Mono', monospace"
        opacity={0.4 + t * 0.6}
      >
        {t < 0.4 ? "Curated Pan-Promoterome TSSs" : "TSS-TSS pairs in pan-promoterome"}
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

      {([["12", "Input"], ["32", "Enc"], ["50", "Latent Z"], ["68", "Dec"], ["88", "Denoised"]] as [string, string][]).map(([x, label]) => (
        <text
          key={label}
          x={Number(x)}
          y="90"
          textAnchor="middle"
          fontSize="3.1"
          fill={label === "Latent Z" ? "var(--color-primary)" : "var(--color-meta)"}
          fontFamily="'JetBrains Mono', monospace"
          fontWeight={label === "Latent Z" ? "600" : "400"}
        >
          {label}
        </text>
      ))}
    </svg>
  );
}

// ── S1 Scene 3: Non-Cancer vs Cancer Split Graph Network ──────
function S1_Scene3({ progress }: { progress: number }) {
  const t = progress;

  // 1. Non-Cancer Network (Left, Center: 27, 48) - Dense compact core
  const ncHubs = [
    { x: 27, y: 48 }, { x: 23, y: 44 }, { x: 31, y: 44 },
    { x: 22, y: 51 }, { x: 32, y: 51 }, { x: 26, y: 42 },
    { x: 28, y: 54 }, { x: 23, y: 47 }, { x: 31, y: 48 },
  ];

  const ncSpokes = Array.from({ length: 28 }, (_, i) => {
    const angle = (i / 28) * Math.PI * 2;
    const r = 21 + ((i * 7) % 5) - 2;
    return {
      x: 27 + Math.cos(angle) * r,
      y: 48 + Math.sin(angle) * r,
      h1: i % 9,
      h2: (i * 2 + 1) % 9,
    };
  });

  // 2. Cancer Network (Right, Center: 75, 48) - Elongated / dispersed core
  const caHubs = [
    { x: 74, y: 47 }, { x: 67, y: 36 }, { x: 80, y: 34 },
    { x: 69, y: 57 }, { x: 82, y: 55 }, { x: 83, y: 28 },
    { x: 71, y: 65 }, { x: 70, y: 50 }, { x: 76, y: 58 },
  ];

  const caSpokes = Array.from({ length: 28 }, (_, i) => {
    const angle = (i / 28) * Math.PI * 2;
    const r = 21 + ((i * 11) % 5) - 2;
    return {
      x: 75 + Math.cos(angle) * r,
      y: 48 + Math.sin(angle) * r,
      h1: (i * 3) % 9,
      h2: (i * 2 + 3) % 9,
    };
  });

  return (
    <svg viewBox="0 0 102 100" className="w-full h-full select-none">
      {/* ── LEFT SIDE: NON-CANCER (BLUE) ── */}
      <g opacity={Math.min(t * 1.5, 1)}>
        {/* Header */}
        <text
          x="27"
          y="15"
          textAnchor="middle"
          fontSize="3.4"
          fill="#1B4F72"
          fontFamily="'JetBrains Mono', monospace"
          fontWeight="700"
        >
          Non-Cancer
        </text>
        <text
          x="27"
          y="20"
          textAnchor="middle"
          fontSize="2.4"
          fill="var(--color-meta)"
          fontFamily="'JetBrains Mono', monospace"
        >
          Dense Epromoter Core
        </text>

        {/* Outer-to-Core Edges */}
        {ncSpokes.map((sp, i) => (
          <g key={`nc-e-${i}`}>
            <line
              x1={sp.x}
              y1={sp.y}
              x2={ncHubs[sp.h1].x}
              y2={ncHubs[sp.h1].y}
              stroke="#2E86C1"
              strokeWidth="0.25"
              opacity="0.45"
            />
            {i % 2 === 0 && (
              <line
                x1={sp.x}
                y1={sp.y}
                x2={ncHubs[sp.h2].x}
                y2={ncHubs[sp.h2].y}
                stroke="#2E86C1"
                strokeWidth="0.18"
                opacity="0.32"
              />
            )}
          </g>
        ))}

        {/* Intra-Core Mesh */}
        {ncHubs.map((h, i) =>
          ncHubs.slice(i + 1).map((hNext, j) => (
            <line
              key={`nc-hub-e-${i}-${j}`}
              x1={h.x}
              y1={h.y}
              x2={hNext.x}
              y2={hNext.y}
              stroke="#2E86C1"
              strokeWidth="0.4"
              opacity="0.6"
            />
          ))
        )}

        {/* Peripheral Nodes */}
        {ncSpokes.map((sp, i) => (
          <circle
            key={`nc-sp-${i}`}
            cx={sp.x}
            cy={sp.y}
            r={1.3}
            fill="#EBF5FB"
            stroke="#2874A6"
            strokeWidth="0.4"
          />
        ))}

        {/* Core Hub Nodes */}
        {ncHubs.map((h, i) => (
          <g key={`nc-hub-${i}`}>
            <circle
              cx={h.x}
              cy={h.y}
              r={2.2}
              fill="#D4E6F1"
              stroke="#1B4F72"
              strokeWidth="0.6"
            />
            <circle
              cx={h.x}
              cy={h.y}
              r={3.0}
              fill="none"
              stroke="#1B4F72"
              strokeWidth="0.25"
              opacity="0.5"
            />
          </g>
        ))}
      </g>

      {/* ── CENTER VERTICAL DIVIDER ── */}
      <line
        x1="51"
        y1="10"
        x2="51"
        y2="82"
        stroke="var(--color-line)"
        strokeWidth="0.6"
        strokeDasharray="1.5 1.5"
      />
      <text
        x="51"
        y="48"
        textAnchor="middle"
        fontSize="2.4"
        fill="var(--color-whisper)"
        fontFamily="'JetBrains Mono', monospace"
        transform="rotate(-90 51 48)"
      >
        VS
      </text>

      {/* ── RIGHT SIDE: CANCER (RED) ── */}
      <g opacity={Math.min(t * 1.5, 1)}>
        {/* Header */}
        <text
          x="75"
          y="15"
          textAnchor="middle"
          fontSize="3.4"
          fill="#922B21"
          fontFamily="'JetBrains Mono', monospace"
          fontWeight="700"
        >
          Cancer
        </text>
        <text
          x="75"
          y="20"
          textAnchor="middle"
          fontSize="2.4"
          fill="var(--color-meta)"
          fontFamily="'JetBrains Mono', monospace"
        >
          Disrupted Distal Hubs
        </text>

        {/* Outer-to-Core Edges */}
        {caSpokes.map((sp, i) => (
          <g key={`ca-e-${i}`}>
            <line
              x1={sp.x}
              y1={sp.y}
              x2={caHubs[sp.h1].x}
              y2={caHubs[sp.h1].y}
              stroke="#A93226"
              strokeWidth="0.25"
              opacity="0.4"
            />
            {i % 2 === 0 && (
              <line
                x1={sp.x}
                y1={sp.y}
                x2={caHubs[sp.h2].x}
                y2={caHubs[sp.h2].y}
                stroke="#A93226"
                strokeWidth="0.18"
                opacity="0.28"
              />
            )}
          </g>
        ))}

        {/* Intra-Core Mesh */}
        {caHubs.map((h, i) =>
          caHubs.slice(i + 1).map((hNext, j) => (
            <line
              key={`ca-hub-e-${i}-${j}`}
              x1={h.x}
              y1={h.y}
              x2={hNext.x}
              y2={hNext.y}
              stroke="#A93226"
              strokeWidth="0.3"
              opacity="0.4"
            />
          ))
        )}

        {/* Peripheral Nodes */}
        {caSpokes.map((sp, i) => (
          <circle
            key={`ca-sp-${i}`}
            cx={sp.x}
            cy={sp.y}
            r={1.3}
            fill="#FDEDEC"
            stroke="#78281F"
            strokeWidth="0.4"
          />
        ))}

        {/* Dispersed Core Hub Nodes */}
        {caHubs.map((h, i) => (
          <g key={`ca-hub-${i}`}>
            <circle
              cx={h.x}
              cy={h.y}
              r={2.2}
              fill="#FADBD8"
              stroke="#922B21"
              strokeWidth="0.6"
            />
            <circle
              cx={h.x}
              cy={h.y}
              r={3.0}
              fill="none"
              stroke="#922B21"
              strokeWidth="0.25"
              opacity="0.35"
            />
          </g>
        ))}
      </g>

      {/* Shared Bottom Caption Tag */}
      <text
        x="51"
        y="93"
        textAnchor="middle"
        fontSize="3.1"
        fill="var(--color-meta)"
        fontFamily="'JetBrains Mono', monospace"
        opacity="0.9"
      >
        TSS Co-Deployment Core Disruption
      </text>
    </svg>
  );
}

// ── S1 Scene 4: GO Molecular Function Enrichment Dotplot ──────
function S1_Scene4({ progress }: { progress: number }) {
  const t = progress;

  // GO MF Terms (Top: Non-Cancer N•N exclusive; Bottom: Cancer C•C exclusive)
  const nnTerms = [
    { label: "DNA-binding TF activity", y: 22, col: 0, r: 3.4, color: "#F39C12" },
    { label: "RNA Pol II promoter DNA binding", y: 28, col: 0, r: 3.1, color: "#E67E22" },
    { label: "Sequence-specific dsDNA binding", y: 34, col: 0, r: 2.7, color: "#F1C40F" },
    { label: "Transcription regulatory region binding", y: 40, col: 0, r: 2.3, color: "#E67E22" },
    { label: "Proximal promoter specific binding", y: 46, col: 0, r: 2.0, color: "#F39C12" },
  ];

  const ccTerms = [
    { label: "Molecular transducer activity", y: 56, col: 2, r: 3.5, color: "#C0392B" },
    { label: "Ion transmembrane transporter", y: 62, col: 2, r: 3.2, color: "#8E44AD" },
    { label: "Passive transmembrane transporter", y: 68, col: 2, r: 2.9, color: "#2980B9" },
    { label: "Transmembrane signaling receptor", y: 74, col: 2, r: 3.3, color: "#9B59B6" },
    { label: "Substrate-specific channel activity", y: 80, col: 2, r: 3.0, color: "#1B4F72" },
  ];

  const columns = [
    { label: "N•N", x: 67, count: "11" },
    { label: "N•C", x: 76, count: "00" },
    { label: "C•C", x: 85, count: "33" },
    { label: "C•N", x: 94, count: "00" },
  ];

  return (
    <svg viewBox="0 0 102 100" className="w-full h-full select-none">
      {/* Top Banner: Total GO MF Term Count */}
      <rect
        x="6"
        y="5"
        width="90"
        height="7.5"
        rx="2"
        fill="var(--color-line)"
        opacity="0.5"
      />
      <text
        x="10"
        y="10"
        fontSize="2.4"
        fill="var(--color-ink)"
        fontFamily="'JetBrains Mono', monospace"
        fontWeight="600"
      >
        Total GO MF count:
      </text>
      {columns.map(col => (
        <text
          key={`hdr-${col.label}`}
          x={col.x}
          y="10"
          textAnchor="middle"
          fontSize="2.4"
          fill="var(--color-ink)"
          fontFamily="'JetBrains Mono', monospace"
          fontWeight="700"
        >
          {col.count}
        </text>
      ))}

      {/* Grid Lines */}
      {[...nnTerms, ...ccTerms].map((item, i) => (
        <line
          key={`grid-${i}`}
          x1="6"
          y1={item.y}
          x2="96"
          y2={item.y}
          stroke="var(--color-line)"
          strokeWidth="0.4"
          opacity="0.6"
        />
      ))}

      {/* Vertical Column Guides */}
      {columns.map(col => (
        <line
          key={`col-line-${col.label}`}
          x1={col.x}
          y1="14"
          x2={col.x}
          y2="83"
          stroke="var(--color-line)"
          strokeWidth="0.3"
          strokeDasharray="1 1"
          opacity="0.5"
        />
      ))}

      {/* Section Divider between TF and Transmembrane */}
      <line
        x1="6"
        y1="51"
        x2="96"
        y2="51"
        stroke="var(--color-line)"
        strokeWidth="0.8"
      />

      {/* Y-Axis Labels: Non-Cancer (TF / Promoter Binding) */}
      {nnTerms.map((item, i) => (
        <text
          key={`nn-lbl-${i}`}
          x="62"
          y={item.y + 0.9}
          textAnchor="end"
          fontSize="2.05"
          fill="var(--color-body)"
          fontFamily="'JetBrains Mono', monospace"
        >
          {item.label}
        </text>
      ))}

      {/* Y-Axis Labels: Cancer (Transmembrane & Channels) */}
      {ccTerms.map((item, i) => (
        <text
          key={`cc-lbl-${i}`}
          x="62"
          y={item.y + 0.9}
          textAnchor="end"
          fontSize="2.05"
          fill="var(--color-body)"
          fontFamily="'JetBrains Mono', monospace"
        >
          {item.label}
        </text>
      ))}

      {/* Non-Cancer N•N Enriched Dots (Amber / Gold / Sage) */}
      {nnTerms.map((item, i) => {
        const dotT = Math.max(0, Math.min(1, (t - i * 0.08) * 2.2));
        const cx = columns[item.col].x;
        const curR = item.r * dotT;
        return (
          <g key={`nn-dot-${i}`} opacity={dotT}>
            <circle
              cx={cx}
              cy={item.y}
              r={curR}
              fill={item.color}
              stroke="#B7950B"
              strokeWidth="0.3"
            />
            {dotT > 0.6 && (
              <circle
                cx={cx}
                cy={item.y}
                r={curR + 0.9}
                fill="none"
                stroke={item.color}
                strokeWidth="0.2"
                opacity="0.5"
              />
            )}
          </g>
        );
      })}

      {/* Cancer C•C Enriched Dots (Magenta / Purple / Dark Indigo) */}
      {ccTerms.map((item, i) => {
        const dotT = Math.max(0, Math.min(1, (t - 0.2 - i * 0.08) * 2.2));
        const cx = columns[item.col].x;
        const curR = item.r * dotT;
        return (
          <g key={`cc-dot-${i}`} opacity={dotT}>
            <circle
              cx={cx}
              cy={item.y}
              r={curR}
              fill={item.color}
              stroke="#512E5F"
              strokeWidth="0.3"
            />
            {dotT > 0.6 && (
              <circle
                cx={cx}
                cy={item.y}
                r={curR + 0.9}
                fill="none"
                stroke={item.color}
                strokeWidth="0.2"
                opacity="0.45"
              />
            )}
          </g>
        );
      })}

      {/* X-Axis Column Headers */}
      {columns.map(col => (
        <g key={`col-hdr-${col.label}`}>
          <text
            x={col.x}
            y="87"
            textAnchor="middle"
            fontSize="2.7"
            fill={col.label === "N•N" ? "var(--color-primary)" : col.label === "C•C" ? "#922B21" : "var(--color-meta)"}
            fontFamily="'JetBrains Mono', monospace"
            fontWeight="700"
          >
            {col.label}
          </text>
        </g>
      ))}

      {/* Bottom Category Labels */}
      <text
        x="28"
        y="93"
        textAnchor="middle"
        fontSize="2.4"
        fill="var(--color-primary)"
        fontFamily="'JetBrains Mono', monospace"
        fontWeight="600"
      >
        ▲ TF & Promoter (N•N)
      </text>
      <text
        x="80"
        y="93"
        textAnchor="middle"
        fontSize="2.4"
        fill="#922B21"
        fontFamily="'JetBrains Mono', monospace"
        fontWeight="600"
      >
        ▲ Transmembrane (C•C)
      </text>
    </svg>
  );
}

// ── S1 Scene 5: TFBS Enrichment Bubble Plot (YY1 vs CTCF) ─────
function S1_Scene5({ progress }: { progress: number }) {
  const t = progress;

  // Left: Non-Cancer (N•N) TFs with YY1 and YY2 dominance
  const nnTFs = [
    { name: "YY1", x: 16, y: 25, count: "70.4", r: 5.4, logP: "12.4" },
    { name: "HNF4A", x: 23, y: 64, count: "9.8", r: 2.3, logP: "4.8" },
    { name: "YY2", x: 30, y: 68, count: "4.2", r: 4.2, logP: "8.6" },
    { name: "REST", x: 37, y: 69, count: "3.9", r: 2.2, logP: "4.1" },
    { name: "RXRB", x: 44, y: 71, count: "1.8", r: 1.8, logP: "3.2" },
  ];

  // Right: Cancer (C•C) TFs with CTCF, KLF5, SP1, JUN dominance
  const ccTFs = [
    { name: "CTCF", x: 60, y: 27, count: "30.5", r: 4.8, logP: "4.2" },
    { name: "KLF5", x: 67, y: 57, count: "8.6", r: 3.8, logP: "3.8" },
    { name: "SP1", x: 74, y: 60, count: "6.9", r: 4.6, logP: "4.0" },
    { name: "JUN", x: 81, y: 65, count: "4.7", r: 2.1, logP: "2.3" },
    { name: "BACH2", x: 88, y: 67, count: "4.1", r: 2.8, logP: "2.9" },
    { name: "FOXP1", x: 95, y: 69, count: "2.6", r: 3.6, logP: "3.5" },
  ];

  return (
    <svg viewBox="0 0 102 100" className="w-full h-full select-none">
      {/* ── LEFT PANEL: NON-CANCER (N•N) ── */}
      <g>
        {/* Panel Box */}
        <rect
          x="4"
          y="6"
          width="44"
          height="84"
          fill="none"
          stroke="var(--color-line)"
          strokeDasharray="1.5 1.5"
          strokeWidth="0.5"
          rx="2"
        />

        {/* Title */}
        <text
          x="26"
          y="12"
          textAnchor="middle"
          fontSize="2.8"
          fill="#1B4F72"
          fontFamily="'JetBrains Mono', monospace"
          fontWeight="700"
        >
          N•N (Non-Cancer)
        </text>

        {/* Y-Axis Label & Line */}
        <line x1="10" y1="18" x2="10" y2="76" stroke="var(--color-line)" strokeWidth="0.6" />
        <line x1="10" y1="76" x2="47" y2="76" stroke="var(--color-line)" strokeWidth="0.6" />
        <text
          x="7"
          y="47"
          textAnchor="middle"
          fontSize="1.9"
          fill="var(--color-meta)"
          fontFamily="'JetBrains Mono', monospace"
          transform="rotate(-90 7 47)"
        >
          Mean Count (0–70)
        </text>

        {/* Ticks & horizontal guidelines */}
        {[25, 42, 59, 76].map((gy, i) => (
          <line
            key={`nn-g-${i}`}
            x1="10"
            y1={gy}
            x2="46"
            y2={gy}
            stroke="var(--color-line)"
            strokeWidth="0.3"
            opacity="0.4"
          />
        ))}

        {/* Non-Cancer Bubble Dots */}
        {nnTFs.map((item, i) => {
          const dotT = Math.max(0, Math.min(1, (t - i * 0.08) * 2.2));
          const curR = item.r * dotT;
          return (
            <g key={`nn-tf-${i}`} opacity={dotT}>
              <circle
                cx={item.x}
                cy={item.y}
                r={curR}
                fill="#D4E6F1"
                stroke="#1B4F72"
                strokeWidth="0.6"
              />
              {dotT > 0.6 && (
                <circle
                  cx={item.x}
                  cy={item.y}
                  r={curR + 0.8}
                  fill="none"
                  stroke="#2E86C1"
                  strokeWidth="0.25"
                  opacity="0.5"
                />
              )}
              {/* TF Name */}
              <text
                x={item.x}
                y="80"
                textAnchor="middle"
                fontSize="2.1"
                fill={item.name.startsWith("YY") ? "#1B4F72" : "var(--color-body)"}
                fontFamily="'JetBrains Mono', monospace"
                fontWeight={item.name.startsWith("YY") ? "700" : "400"}
                transform={`rotate(-45 ${item.x} 80)`}
              >
                {item.name}
              </text>
            </g>
          );
        })}
      </g>

      {/* ── RIGHT PANEL: CANCER (C•C) ── */}
      <g>
        {/* Panel Box */}
        <rect
          x="54"
          y="6"
          width="44"
          height="84"
          fill="none"
          stroke="var(--color-line)"
          strokeDasharray="1.5 1.5"
          strokeWidth="0.5"
          rx="2"
        />

        {/* Title */}
        <text
          x="76"
          y="12"
          textAnchor="middle"
          fontSize="2.8"
          fill="#922B21"
          fontFamily="'JetBrains Mono', monospace"
          fontWeight="700"
        >
          C•C (Cancer)
        </text>

        {/* Y-Axis Line */}
        <line x1="56" y1="18" x2="56" y2="76" stroke="var(--color-line)" strokeWidth="0.6" />
        <line x1="56" y1="76" x2="97" y2="76" stroke="var(--color-line)" strokeWidth="0.6" />
        <text
          x="53"
          y="47"
          textAnchor="middle"
          fontSize="1.9"
          fill="var(--color-meta)"
          fontFamily="'JetBrains Mono', monospace"
          transform="rotate(-90 53 47)"
        >
          Mean Count (0–35)
        </text>

        {/* Ticks & horizontal guidelines */}
        {[27, 43, 60, 76].map((gy, i) => (
          <line
            key={`cc-g-${i}`}
            x1="56"
            y1={gy}
            x2="96"
            y2={gy}
            stroke="var(--color-line)"
            strokeWidth="0.3"
            opacity="0.4"
          />
        ))}

        {/* Cancer Bubble Dots */}
        {ccTFs.map((item, i) => {
          const dotT = Math.max(0, Math.min(1, (t - 0.15 - i * 0.08) * 2.2));
          const curR = item.r * dotT;
          return (
            <g key={`cc-tf-${i}`} opacity={dotT}>
              <circle
                cx={item.x}
                cy={item.y}
                r={curR}
                fill="#FADBD8"
                stroke="#922B21"
                strokeWidth="0.6"
              />
              {dotT > 0.6 && (
                <circle
                  cx={item.x}
                  cy={item.y}
                  r={curR + 0.8}
                  fill="none"
                  stroke="#C0392B"
                  strokeWidth="0.25"
                  opacity="0.5"
                />
              )}
              {/* TF Name */}
              <text
                x={item.x}
                y="80"
                textAnchor="middle"
                fontSize="2.0"
                fill={item.name === "CTCF" || item.name === "JUN" ? "#922B21" : "var(--color-body)"}
                fontFamily="'JetBrains Mono', monospace"
                fontWeight={item.name === "CTCF" || item.name === "JUN" ? "700" : "400"}
                transform={`rotate(-45 ${item.x} 80)`}
              >
                {item.name}
              </text>
            </g>
          );
        })}
      </g>

      {/* Shared Bottom Caption */}
      <text
        x="51"
        y="95"
        textAnchor="middle"
        fontSize="2.7"
        fill="var(--color-meta)"
        fontFamily="'JetBrains Mono', monospace"
        opacity="0.9"
      >
        Selective TFBS drivers (YY1 vs CTCF)
      </text>
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
        title: "Transcription start sites",
        body: "CAGE-seq maps the precise nucleotide origin of every gene's transcription across hundreds of tissues — each point a moment where biology begins. Using curated TSSs across the pan-promoterome (Satish et al., 2026), we uncover coordinated TSS-TSS deployment pairs.",
        Component: S1_Scene1,
      },
      {
        id: "s1-ae",
        mono: "02 · Deep learning",
        title: "Signal from noise & latent space",
        body: (
          <>
            A denoising autoencoder captures non-linear regulatory patterns in a compressed latent space. Feature vectors are constructed using futile upstream transcription distance <em>d</em>, promoter expression entropy, and CAGE expression scores across thousands of samples to isolate biological covariance from technical noise.
          </>
        ),
        Component: S1_Scene2,
      },
      {
        id: "s1-clusters",
        mono: "03 · Network topology & cancer disruption",
        title: "Structured co-deployment & its disruption in cancer",
        body: "In non-cancer transcriptomes, TSS co-deployments organize around dense, tightly structured epromoter core hubs that coordinate proximal promoter activity. In cancers, this parsimonic architecture is grossly disrupted — the central core fractures into dispersed, distal hubs with altered network connectivity.",
        Component: S1_Scene3,
      },
      {
        id: "s1-network",
        mono: "04 · Functional enrichment & GO analysis",
        title: "Transcriptional machinery vs transmembrane signaling",
        body: "Gene Ontology Molecular Function enrichment reveals a striking functional divergence. Non-cancer TSS co-deployments (N•N) are strongly enriched for DNA-binding transcription factors, RNA Pol II promoter binding, and regulatory machinery. In cancer (C•C), this transcriptional enrichment is completely lost, shifting solely toward transmembrane transporters and ion channels.",
        Component: S1_Scene4,
      },
      {
        id: "s1-genome",
        mono: "05 · Transcription factor drivers",
        title: "Selective TF binding drives core-covariant deployment",
        body: "Differential motif and TFBS analysis reveals that selective transcription factor binding sites are the key determinants driving core-covariant TSS deployment. Non-cancer hubs (N•N) are dominated by structural promoter organizers like YY1 and YY2, whereas cancer hubs (C•C) switch to chromatin remodelers and stress responders like CTCF, KLF5, and JUN.",
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
