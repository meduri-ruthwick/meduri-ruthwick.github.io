"use client";

import { useState, useEffect } from "react";

const navLinks = [
  { label: "Research", href: "#research-story" },
  { label: "About",    href: "#about" },
  { label: "Publications", href: "#publications" },
  { label: "Conferences", href: "#talks" },
  { label: "Contact",  href: "#contact" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <nav
      style={{
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        borderBottom: `1px solid var(--color-line)`,
        backgroundColor: scrolled ? "rgba(250,250,248,0.88)" : "rgba(250,250,248,0.7)",
      }}
      className="fixed top-0 left-0 right-0 z-50 transition-colors duration-300"
    >
      <div
        className="mx-auto flex items-center justify-between gap-4 px-6 sm:px-10 lg:px-8"
        style={{ maxWidth: "90rem", height: "3.25rem" }}
      >
        {/* Logo — full name */}
        <a
          href="#hero"
          className="shrink-0"
          style={{ fontFamily: "var(--font-sans)", fontWeight: 700, fontSize: "1.1rem", letterSpacing: "-0.02em", textDecoration: "none" }}
        >
          <span style={{ color: "var(--color-primary)" }}>Ruthwick</span>{" "}
          <span style={{ color: "var(--color-ink)" }}>Meduri</span>
        </a>

        {/* Desktop nav — pushed to the right end */}
        <nav aria-label="Primary" className="hidden lg:flex items-center gap-7 ml-auto">
          {navLinks.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-meta hover-primary transition-colors"
              style={{ fontSize: "13px", letterSpacing: "0em" }}
            >
              {l.label}
            </a>
          ))}
        </nav>

        {/* Mobile toggle */}
        <button
          type="button"
          onClick={() => setMenuOpen((prev) => !prev)}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          className="lg:hidden p-2.5 text-ink flex items-center justify-center"
          style={{
            minWidth: "44px",
            minHeight: "44px",
            touchAction: "manipulation",
            background: "none",
            border: "none",
            cursor: "pointer",
          }}
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            {menuOpen ? (
              <>
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </>
            ) : (
              <>
                <line x1="4" y1="7" x2="20" y2="7" />
                <line x1="4" y1="12" x2="20" y2="12" />
                <line x1="4" y1="17" x2="20" y2="17" />
              </>
            )}
          </svg>
        </button>
      </div>

      {/* Mobile dropdown */}
      {menuOpen && (
        <div
          style={{
            borderTop: "1px solid var(--color-line)",
            backgroundColor: "rgba(250,250,248,0.98)",
            backdropFilter: "blur(16px)",
          }}
          className="lg:hidden px-6 py-5 flex flex-col gap-4 shadow-sm"
        >
          {navLinks.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setMenuOpen(false)}
              className="text-meta hover-primary"
              style={{ fontSize: "14px" }}
            >
              {l.label}
            </a>
          ))}
          <a href="/Ruthwick_Meduri_CV.pdf" download="Ruthwick_Meduri_CV.pdf" className="text-meta hover-primary" style={{ fontSize: "14px" }}>
            Download CV
          </a>
        </div>
      )}
    </nav>
  );
}
