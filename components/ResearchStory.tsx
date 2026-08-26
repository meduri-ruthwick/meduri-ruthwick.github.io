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

// ── S2 Scene 1: ATAC-seq & Hyperactive Tn5 Transposase ────────
function S2_Scene1({ progress }: { progress: number }) {
  const t = progress;

  // Nucleosomes flanking an accessible open chromatin region
  const nucleosomes = [
    { x: 15, y: 62, label: "H3" },
    { x: 27, y: 62, label: "H4" },
    { x: 73, y: 62, label: "H2A" },
    { x: 85, y: 62, label: "H2B" },
  ];

  const tn5Y = lerp(16, 44, Math.min(t * 1.8, 1));
  const cutProgress = Math.max(0, Math.min(1, (t - 0.4) * 2));

  return (
    <svg viewBox="0 0 102 100" className="w-full h-full select-none">
      {/* Baseline DNA Track */}
      <line x1="6" y1="62" x2="96" y2="62" stroke="var(--color-line)" strokeWidth="1.0" />

      {/* Flanking Nucleosome Octamers (Histone core beads) */}
      {nucleosomes.map((n, i) => (
        <g key={`nuc-${i}`}>
          {/* Wrapped DNA loop */}
          <ellipse
            cx={n.x}
            cy={n.y}
            rx="5.5"
            ry="6.5"
            fill="none"
            stroke="var(--color-meta)"
            strokeWidth="0.8"
            strokeDasharray="2 1.5"
            opacity="0.6"
          />
          {/* Histone Bead */}
          <circle
            cx={n.x}
            cy={n.y}
            r="4.2"
            fill="var(--color-tile)"
            stroke="var(--color-line)"
            strokeWidth="0.8"
          />
          <text
            x={n.x}
            y={n.y + 1}
            textAnchor="middle"
            fontSize="2.2"
            fill="var(--color-meta)"
            fontFamily="'JetBrains Mono', monospace"
            fontWeight="500"
          >
            {n.label}
          </text>
        </g>
      ))}

      {/* Open / Accessible Nucleosome-Free Region Highlight */}
      <rect
        x="34"
        y="58"
        width="34"
        height="8"
        fill="var(--color-primary)"
        opacity="0.08"
        rx="2"
      />
      <text
        x="50"
        y="73"
        textAnchor="middle"
        fontSize="2.5"
        fill="var(--color-primary)"
        fontFamily="'JetBrains Mono', monospace"
        fontWeight="600"
      >
        Open Chromatin (NFR)
      </text>

      {/* Hyperactive Tn5 Transposase Homodimer Complex */}
      <g transform={`translate(0, ${tn5Y - 44})`} opacity={Math.min(t * 1.5, 1)}>
        {/* Left Subunit */}
        <path
          d="M 44 40 C 38 34, 38 48, 45 50 C 48 51, 49 46, 47 43 Z"
          fill="var(--color-primary)"
          stroke="#1F4A37"
          strokeWidth="0.8"
          opacity="0.9"
        />
        {/* Right Subunit */}
        <path
          d="M 56 40 C 62 34, 62 48, 55 50 C 52 51, 51 46, 53 43 Z"
          fill="#D4AC0D"
          stroke="#B7950B"
          strokeWidth="0.8"
          opacity="0.9"
        />
        {/* Interlocking Catalytic Core */}
        <ellipse cx="50" cy="45" rx="3.5" ry="3" fill="#ffffff" stroke="var(--color-ink)" strokeWidth="0.6" />
        <text
          x="50"
          y="46"
          textAnchor="middle"
          fontSize="2.2"
          fill="var(--color-ink)"
          fontFamily="'JetBrains Mono', monospace"
          fontWeight="700"
        >
          Tn5
        </text>

        {/* Ligation Sequencing Adapters */}
        <g opacity={cutProgress}>
          {/* Adapter 1 */}
          <path d="M 40 46 L 33 40" stroke="#E67E22" strokeWidth="1.2" strokeLinecap="round" />
          <rect x="25" y="36" width="9" height="4" fill="#E67E22" rx="0.8" />
          <text x="29.5" y="39" textAnchor="middle" fontSize="1.8" fill="#ffffff" fontFamily="'JetBrains Mono', monospace" fontWeight="600">
            Ad 1
          </text>

          {/* Adapter 2 */}
          <path d="M 60 46 L 67 40" stroke="#2980B9" strokeWidth="1.2" strokeLinecap="round" />
          <rect x="66" y="36" width="9" height="4" fill="#2980B9" rx="0.8" />
          <text x="70.5" y="39" textAnchor="middle" fontSize="1.8" fill="#ffffff" fontFamily="'JetBrains Mono', monospace" fontWeight="600">
            Ad 2
          </text>
        </g>
      </g>

      {/* Cleavage Spark / Cut indicator */}
      {cutProgress > 0.3 && (
        <g opacity={cutProgress}>
          <line x1="47" y1="58" x2="49" y2="66" stroke="#E74C3C" strokeWidth="1.0" strokeDasharray="1 1" />
          <line x1="53" y1="58" x2="51" y2="66" stroke="#E74C3C" strokeWidth="1.0" strokeDasharray="1 1" />
          <circle cx="50" cy="62" r="1.4" fill="#E74C3C" />
        </g>
      )}

      {/* ATAC Peak Signal Envelope above Tn5 */}
      {t > 0.5 && (
        <g opacity={Math.min((t - 0.5) * 2, 1)}>
          <path
            d="M 28 32 C 38 32, 42 15, 50 14 C 58 15, 62 32, 72 32"
            fill="none"
            stroke="var(--color-primary)"
            strokeWidth="1.0"
            strokeDasharray="1.5 1.5"
          />
          <text x="50" y="11" textAnchor="middle" fontSize="2.8" fill="var(--color-primary)" fontFamily="'JetBrains Mono', monospace" fontWeight="600">
            ATAC Peak Summit
          </text>
        </g>
      )}

      {/* Bottom Caption */}
      <text
        x="50"
        y="93"
        textAnchor="middle"
        fontSize="3.1"
        fill="var(--color-meta)"
        fontFamily="'JetBrains Mono', monospace"
      >
        Hyperactive Tn5 transposase cutting accessible chromatin
      </text>
    </svg>
  );
}

// ── S2 Scene 2: Feature Engineering & Random Forest Classifier 
function S2_Scene2({ progress }: { progress: number }) {
  const t = progress;

  // 3 Key Sequence Features
  const features = [
    { label: "1. TFBS Density", val: "High Binding Occ.", c: "var(--color-primary)", y: 22 },
    { label: "2. GC Richness (%)", val: "GC% > 60%", c: "#D4AC0D", y: 40 },
    { label: "3. GC Skew (G-C)/(G+C)", val: "Promoter Skew", c: "#2980B9", y: 58 },
  ];

  return (
    <svg viewBox="0 0 102 100" className="w-full h-full select-none">
      {/* Left Box: Sequence Features Input Matrix */}
      <g>
        <rect x="5" y="10" width="40" height="64" fill="var(--color-tile)" stroke="var(--color-line)" strokeWidth="0.6" rx="2" />
        <text x="25" y="16" textAnchor="middle" fontSize="2.5" fill="var(--color-ink)" fontFamily="'JetBrains Mono', monospace" fontWeight="700">
          Sequence Features
        </text>

        {features.map((feat, i) => {
          const rowT = Math.max(0, Math.min(1, (t - i * 0.1) * 2));
          return (
            <g key={`feat-${i}`} opacity={0.3 + rowT * 0.7}>
              {/* Feature label */}
              <text x="9" y={feat.y + 2} fontSize="2.1" fill="var(--color-body)" fontFamily="'JetBrains Mono', monospace">
                {feat.label}
              </text>
              {/* Feature Value Pill */}
              <rect x="9" y={feat.y + 4.5} width="32" height="6.5" fill="var(--color-paper)" stroke={feat.c} strokeWidth="0.5" rx="1.2" />
              <text x="25" y={feat.y + 8.8} textAnchor="middle" fontSize="2.0" fill={feat.c} fontFamily="'JetBrains Mono', monospace" fontWeight="600">
                {feat.val}
              </text>
            </g>
          );
        })}
      </g>

      {/* Center Flow Connectors */}
      {[25, 43, 61].map((fy, i) => (
        <path
          key={`arr-${i}`}
          d={`M 45 ${fy} L 55 ${fy}`}
          stroke="var(--color-primary)"
          strokeWidth="0.8"
          strokeDasharray="1.5 1.5"
          opacity={Math.min(t * 1.5, 0.8)}
        />
      ))}

      {/* Right Box: Random Forest Classifier Ensemble */}
      <g opacity={Math.min(t * 1.4, 1)}>
        <rect x="55" y="10" width="42" height="64" fill="var(--color-tile)" stroke="var(--color-line)" strokeWidth="0.6" rx="2" />
        <text x="76" y="16" textAnchor="middle" fontSize="2.5" fill="var(--color-primary)" fontFamily="'JetBrains Mono', monospace" fontWeight="700">
          Random Forest
        </text>

        {/* 3 Decision Tree Mini-Ensembles */}
        {[
          { x: 63, label: "Tree 1" },
          { x: 76, label: "Tree 2" },
          { x: 89, label: "Tree N" },
        ].map((tree, tidx) => (
          <g key={`rf-${tidx}`}>
            {/* Root Node */}
            <circle cx={tree.x} cy="26" r="2.2" fill="var(--color-primary)" />
            {/* Branches */}
            <line x1={tree.x} y1="26" x2={tree.x - 4} y2="36" stroke="var(--color-line)" strokeWidth="0.5" />
            <line x1={tree.x} y1="26" x2={tree.x + 4} y2="36" stroke="var(--color-line)" strokeWidth="0.5" />
            <circle cx={tree.x - 4} cy="36" r="1.6" fill="var(--color-meta)" />
            <circle cx={tree.x + 4} cy="36" r="1.6" fill="var(--color-meta)" />

            {/* Leaves */}
            <line x1={tree.x - 4} y1="36" x2={tree.x - 5} y2="45" stroke="var(--color-line)" strokeWidth="0.4" />
            <line x1={tree.x - 4} y1="36" x2={tree.x - 2} y2="45" stroke="var(--color-line)" strokeWidth="0.4" />
            <line x1={tree.x + 4} y1="36" x2={tree.x + 2} y2="45" stroke="var(--color-line)" strokeWidth="0.4" />
            <line x1={tree.x + 4} y1="36" x2={tree.x + 5} y2="45" stroke="var(--color-line)" strokeWidth="0.4" />
            
            <rect x={tree.x - 6} y="44.5" width="2" height="2" fill="var(--color-primary)" rx="0.3" />
            <rect x={tree.x - 3} y="44.5" width="2" height="2" fill="var(--color-line)" rx="0.3" />
            <rect x={tree.x + 1} y="44.5" width="2" height="2" fill="var(--color-line)" rx="0.3" />
            <rect x={tree.x + 4} y="44.5" width="2" height="2" fill="var(--color-primary)" rx="0.3" />

            <text x={tree.x} y="53" textAnchor="middle" fontSize="1.8" fill="var(--color-meta)" fontFamily="'JetBrains Mono', monospace">
              {tree.label}
            </text>
          </g>
        ))}

        {/* Prediction Ensemble Majority Vote */}
        <rect x="59" y="60" width="34" height="9" fill="var(--color-primary)" rx="1.5" />
        <text x="76" y="65.8" textAnchor="middle" fontSize="2.3" fill="#ffffff" fontFamily="'JetBrains Mono', monospace" fontWeight="700">
          Accessible: 94.2%
        </text>
      </g>

      {/* Bottom Caption */}
      <text
        x="50"
        y="93"
        textAnchor="middle"
        fontSize="3.0"
        fill="var(--color-meta)"
        fontFamily="'JetBrains Mono', monospace"
      >
        Feature matrix: TFBSs + GC richness + GC skew
      </text>
    </svg>
  );
}

// ── S2 Scene 3: HEK293T Training & JASPAR GC% > 50% Filter ─────
function S2_Scene3({ progress }: { progress: number }) {
  const t = progress;

  // JASPAR Motifs passing GC > 50% threshold
  const jasparMotifs = [
    { name: "SP1", gc: "78%", x: 8 },
    { name: "E2F1", gc: "64%", x: 30 },
    { name: "KLF4", gc: "71%", x: 52 },
    { name: "EGR1", gc: "69%", x: 74 },
  ];

  return (
    <svg viewBox="0 0 102 100" className="w-full h-full select-none">
      {/* Top Track: Deeply Sequenced HEK293T ATAC Peaks */}
      <g>
        <rect x="5" y="6" width="92" height="28" fill="var(--color-tile)" stroke="var(--color-line)" strokeWidth="0.6" rx="2" />
        <text x="9" y="12.5" fontSize="2.3" fill="var(--color-ink)" fontFamily="'JetBrains Mono', monospace" fontWeight="700">
          HEK293T Deep ATAC-seq
        </text>
        <text x="93" y="12.5" textAnchor="end" fontSize="2.0" fill="var(--color-primary)" fontFamily="'JetBrains Mono', monospace">
          Peak Ground Truth
        </text>

        {/* Peak Waveform Profile */}
        <path
          d="M 10 30 C 20 30, 24 25, 30 20 C 35 15, 37 15, 42 21 C 46 27, 49 30, 56 30 C 62 30, 65 20, 70 17 C 74 15, 78 27, 92 30"
          fill="none"
          stroke="var(--color-primary)"
          strokeWidth="1.2"
        />
        {/* Peak summit callouts */}
        <circle cx="36" cy="16" r="2.2" fill="#D4AC0D" />
        <circle cx="72" cy="16" r="2.2" fill="#D4AC0D" />
      </g>

      {/* Middle Filter Funnel: JASPAR Vertebrate Database (GC% > 50%) */}
      <g transform="translate(0, 3)" opacity={Math.min(t * 1.5, 1)}>
        {/* Filter Box Header */}
        <rect x="5" y="36" width="92" height="30" fill="var(--color-paper)" stroke="var(--color-primary)" strokeWidth="0.8" rx="2" />
        <text x="9" y="42.5" fontSize="2.3" fill="var(--color-primary)" fontFamily="'JetBrains Mono', monospace" fontWeight="700">
          JASPAR Vertebrate TFBSs
        </text>
        
        {/* Filter Badge */}
        <rect x="59" y="38.5" width="34" height="6" fill="#E67E22" rx="1" />
        <text x="76" y="42.6" textAnchor="middle" fontSize="2.1" fill="#ffffff" fontFamily="'JetBrains Mono', monospace" fontWeight="700">
          Filter: GC% &gt; 50%
        </text>

        {/* Passing Filtered TFBS Motifs */}
        {jasparMotifs.map((m, idx) => (
          <g key={`m-${idx}`} transform={`translate(${m.x}, 47)`}>
            <rect x="0" y="0" width="18" height="14" fill="var(--color-tile)" stroke="var(--color-line)" strokeWidth="0.5" rx="1.2" />
            <text x="9" y="6.2" textAnchor="middle" fontSize="2.4" fill="var(--color-ink)" fontFamily="'JetBrains Mono', monospace" fontWeight="700">
              {m.name}
            </text>
            <text x="9" y="11" textAnchor="middle" fontSize="2.0" fill="var(--color-primary)" fontFamily="'JetBrains Mono', monospace" fontWeight="600">
              GC: {m.gc} ✓
            </text>
          </g>
        ))}
      </g>

      {/* Downstream Training Vector Pipeline */}
      {t > 0.5 && (
        <g opacity={Math.min((t - 0.5) * 2, 1)}>
          <line x1="51" y1="70" x2="51" y2="76" stroke="var(--color-primary)" strokeWidth="0.8" strokeDasharray="1.5 1.5" />
          <rect x="15" y="75.5" width="72" height="7.5" fill="var(--color-primary)" rx="1.5" />
          <text x="51" y="80.2" textAnchor="middle" fontSize="2.4" fill="#ffffff" fontFamily="'JetBrains Mono', monospace" fontWeight="600">
            Features Fed into Classifier Training
          </text>
        </g>
      )}

      {/* Bottom Caption */}
      <text
        x="51"
        y="94"
        textAnchor="middle"
        fontSize="2.9"
        fill="var(--color-meta)"
        fontFamily="'JetBrains Mono', monospace"
      >
        HEK293T ATAC peaks + JASPAR vertebrate TFBSs (GC% &gt; 50%)
      </text>
    </svg>
  );
}

// ── S2 Scene 4: Genome-Wide Prediction & Unusual Alu Abundance 
function S2_Scene4({ progress }: { progress: number }) {
  const t = progress;

  // Genome-wide chromosome hotspots
  const chroms = [
    { chr: "chr1", peaks: [34, 52, 70, 88], y: 22 },
    { chr: "chr7", peaks: [28, 46, 66, 84], y: 34 },
    { chr: "chr19", peaks: [30, 48, 64, 80, 90], y: 46 },
  ];

  return (
    <svg viewBox="0 0 102 100" className="w-full h-full select-none">
      {/* Top Banner: Genome-Wide Prediction Tracks */}
      <g>
        <text x="6" y="13" fontSize="2.5" fill="var(--color-ink)" fontFamily="'JetBrains Mono', monospace" fontWeight="700">
          Genome-Wide Predictions (hg38)
        </text>

        {chroms.map((c, ci) => (
          <g key={`chr-${ci}`}>
            {/* Chromosome Label */}
            <text x="18" y={c.y + 1} textAnchor="end" fontSize="2.1" fill="var(--color-meta)" fontFamily="'JetBrains Mono', monospace">
              {c.chr}
            </text>
            {/* Chromosome Backbone */}
            <line x1="22" y1={c.y} x2="94" y2={c.y} stroke="var(--color-line)" strokeWidth="1.2" strokeLinecap="round" />
            
            {/* Predicted Open Chromatin Peaks */}
            {c.peaks.map((px, pi) => (
              <circle
                key={`pk-${ci}-${pi}`}
                cx={px}
                cy={c.y}
                r={1.8 + Math.sin(t * Math.PI + pi) * 0.3}
                fill="var(--color-primary)"
              />
            ))}
          </g>
        ))}
      </g>

      {/* Locus Zoom-In Box: Alu Repeat Abundance Discovery */}
      <g opacity={Math.min(t * 1.5, 1)}>
        <rect x="5" y="55" width="92" height="28" fill="var(--color-tile)" stroke="#E67E22" strokeWidth="0.8" rx="2" />
        
        {/* Zoom Header */}
        <text x="9" y="61.5" fontSize="2.2" fill="#E67E22" fontFamily="'JetBrains Mono', monospace" fontWeight="700">
          Locus Discovery: Repeat Abundance
        </text>
        <text x="93" y="61.5" textAnchor="end" fontSize="2.0" fill="var(--color-body)" fontFamily="'JetBrains Mono', monospace">
          Alu SINE Retrotransposons
        </text>

        {/* Baseline in Zoom Box */}
        <line x1="9" y1="71" x2="93" y2="71" stroke="var(--color-line)" strokeWidth="0.8" />
        
        {/* 4 Clean Alu Elements Embedded */}
        {[
          { x: 9, w: 18, label: "Alu SINE" },
          { x: 31, w: 18, label: "Alu Core" },
          { x: 53, w: 18, label: "Alu Repeat" },
          { x: 75, w: 18, label: "Alu-rich" },
        ].map((alu, ai) => (
          <g key={`alu-${ai}`}>
            <rect x={alu.x} y="66.5" width={alu.w} height="7.5" fill="#E67E22" opacity="0.9" rx="1" />
            <text x={alu.x + alu.w / 2} y="71.2" textAnchor="middle" fontSize="2.0" fill="#ffffff" fontFamily="'JetBrains Mono', monospace" fontWeight="700">
              {alu.label}
            </text>
          </g>
        ))}
      </g>

      {/* Bottom Caption */}
      <text
        x="51"
        y="94"
        textAnchor="middle"
        fontSize="2.9"
        fill="var(--color-meta)"
        fontFamily="'JetBrains Mono', monospace"
      >
        Genome-wide predicted open chromatin driven by Alu repeats
      </text>
    </svg>
  );
}

// ── S2 Scene 5: Evolutionary Lineage (Alu J -> S -> Y & 105 Vertebrates) 
function S2_Scene5({ progress }: { progress: number }) {
  const t = progress;

  // Primate lineage Alu stratification & 105 vertebrates tree
  const lineages = [
    { name: "Humans & Great Apes", repeat: "Alu Y (Active)", color: "#E74C3C", y: 18 },
    { name: "Monkeys (Old/New World)", repeat: "Alu S (Expansion)", color: "#E67E22", y: 32 },
    { name: "Marsupials / Early Primates", repeat: "Alu J (Ancestral)", color: "#2980B9", y: 46 },
    { name: "Jawless Fish to Mammals", repeat: "105 Vertebrates", color: "var(--color-primary)", y: 60 },
  ];

  return (
    <svg viewBox="0 0 102 100" className="w-full h-full select-none">
      {/* Phylogenetic Tree Backbone shifted left */}
      <g opacity="0.65">
        <path
          d="M 6 60 H 11 V 46 H 15 V 32 H 18 V 18 H 22 M 15 46 H 22 M 11 60 H 22"
          fill="none"
          stroke="var(--color-line)"
          strokeWidth="0.8"
        />
      </g>

      {/* Lineages & Clade Stratification Badges */}
      {lineages.map((lin, idx) => {
        const rowT = Math.max(0, Math.min(1, (t - idx * 0.08) * 2));
        return (
          <g key={`lin-${idx}`} opacity={0.25 + rowT * 0.75}>
            {/* Branch Tip Node */}
            <circle cx="22" cy={lin.y} r="2.0" fill={lin.color} />

            {/* Lineage Name */}
            <text
              x="26"
              y={lin.y + 1}
              fontSize="2.1"
              fill="var(--color-ink)"
              fontFamily="'JetBrains Mono', monospace"
              fontWeight="600"
            >
              {lin.name}
            </text>

            {/* Stratified Alu Family Badge on Far Right */}
            <rect
              x="66"
              y={lin.y - 3.5}
              width="31"
              height="6.8"
              fill={lin.color}
              opacity="0.9"
              rx="1.2"
            />
            <text
              x="81.5"
              y={lin.y + 0.9}
              textAnchor="middle"
              fontSize="1.9"
              fill="#ffffff"
              fontFamily="'JetBrains Mono', monospace"
              fontWeight="700"
            >
              {lin.repeat}
            </text>
          </g>
        );
      })}

      {/* Evolutionary Conclusion Callout */}
      {t > 0.6 && (
        <g opacity={Math.min((t - 0.6) * 2.5, 1)}>
          <rect x="6" y="72" width="90" height="9" fill="var(--color-tile)" stroke="var(--color-line)" strokeWidth="0.5" rx="1.5" />
          <text
            x="51"
            y="77.6"
            textAnchor="middle"
            fontSize="2.4"
            fill="var(--color-primary)"
            fontFamily="'JetBrains Mono', monospace"
            fontWeight="700"
          >
            Evolutionary Grammar: Alu J → Alu S → Alu Y
          </text>
        </g>
      )}

      {/* Bottom Caption */}
      <text
        x="51"
        y="94"
        textAnchor="middle"
        fontSize="2.8"
        fill="var(--color-meta)"
        fontFamily="'JetBrains Mono', monospace"
      >
        Primate Alu stratification (J → S → Y) across 105 vertebrates
      </text>
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
        mono: "01 · ATAC-seq & Tn5 transposase",
        title: "Transposition of open chromatin",
        body: "Assay for Transposase-Accessible Chromatin (ATAC-seq) utilizes a hyperactive Tn5 transposase to probe regulatory DNA. The Tn5 homodimer selectively accesses and cleaves nucleosome-free, open chromatin regions, simultaneous tagging DNA fragments with sequencing adapters.",
        Component: S2_Scene1,
      },
      {
        id: "s2-tfbs",
        mono: "02 · Feature engineering & machine learning",
        title: "TFBS density, GC richness & GC skew",
        body: "Open chromatin regions possess distinct sequence signatures: marked enrichment of transcription factor binding sites (TFBSs), elevated GC richness, and characteristic GC skew. We engineer these sequence properties into a multi-dimensional feature matrix to train a Random Forest classifier.",
        Component: S2_Scene2,
      },
      {
        id: "s2-rf",
        mono: "03 · HEK293T training & JASPAR GC filter",
        title: "High-resolution peaks & GC-rich motif filtering",
        body: "Using deeply sequenced HEK293T ATAC-seq datasets, we call high-confidence accessibility peaks to define ground truth. Feature extraction is refined using vertebrate-wide JASPAR TFBS profiles, selectively filtering for high-GC motifs (GC% > 50%) to capture robust regulatory signals.",
        Component: S2_Scene3,
      },
      {
        id: "s2-evolution",
        mono: "04 · Genome-wide prediction & repeats",
        title: "Alu retrotransposon abundance in open chromatin",
        body: "Deploying predictions genome-wide uncovered the sequence basis of chromatin accessibility: an extraordinary abundance of repeat elements. Predicted open chromatin regions are uniquely enriched in primate Alu retrotransposons, revealing that transposable elements actively shape the open regulatory landscape.",
        Component: S2_Scene4,
      },
      {
        id: "s2-insight",
        mono: "05 · Evolutionary trajectory across 105 vertebrates",
        title: "Alu lineage stratification & vertebrate evolution",
        body: "Evolutionary analysis reveals a chronological stratification of repeat families in primates: ancestral Alu J in early lineages, Alu S expansion in Old/New World monkeys, and young Alu Y in Great Apes and Humans. Extending this predictive framework across 105 vertebrates — from jawless fish to mammals — maps the deep evolutionary rules of genome regulation.",
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
