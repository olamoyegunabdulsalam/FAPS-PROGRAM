import { useState, useEffect } from "react";

const kdu = {
  yellow:      "#f5c200",
  yellowLight: "#ffd740",
};

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        background: "rgba(10,38,71,0.93)",
        backdropFilter: "blur(14px)",
        borderBottom: `1px solid ${scrolled ? "rgba(255,255,255,0.07)" : "rgba(245,194,0,0.25)"}`,
        boxShadow: scrolled ? "0 4px 30px rgba(0,0,0,0.22)" : "none",
      }}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-2 sm:py-3">
        <div className="flex justify-center items-center gap-3 sm:gap-4">
          {/* Logo */}
          <div className="flex-shrink-0">
            <img
              src="/images/kdu-logo.gif"
              alt="KDU Logo"
              className="object-contain"
              style={{
                height: "clamp(38px, 5.5vw, 60px)",
                width: "clamp(38px, 5.5vw, 60px)",
              }}
            />
          </div>

          {/* Vertical gold divider */}
          <div
            className="flex-shrink-0 w-px self-stretch"
            style={{ background: "rgba(245,194,0,0.4)" }}
          />

          {/* Text block */}
          <div className="min-w-0 flex flex-col justify-center gap-3 text-center">
            {/* University name */}
            <h2
              className="font-extrabold text-white leading-none tracking-wider"
              style={{ fontSize: "clamp(0.72rem, 2.6vw, 1.8rem)" }}
            >
              KOLADAISI UNIVERSITY, IBADAN
            </h2>

            {/* Faculty line in KDU yellow */}
            <h3
              className="font-semibold leading-none font-bold"
              style={{
                fontSize: "clamp(0.58rem, 1.6vw, 1.90rem)",
                color: kdu.yellow,
                letterSpacing: "0.09em",
              }}
            >
              FACULTY OF APPLIED SCIENCES
            </h3>

            {/* "PRESENTS" row with flanking lines */}
            <div className="flex items-center gap-2 py-0.5">
              <span
                className="flex-1 h-px"
                style={{ background: "rgba(245,194,0,0.3)" }}
              />
              <span
                className="font-bold px-2 py-px rounded"
                style={{
                  fontSize: "clamp(0.42rem, 1vw, 0.6rem)",
                  color: kdu.yellowLight,
                  background: "rgba(245,194,0,0.12)",
                  border: "1px solid rgba(245,194,0,0.28)",
                  letterSpacing: "0.14em",
                }}
              >
                PRESENTS
              </span>
              <span
                className="flex-1 h-px"
                style={{ background: "rgba(245,194,0,0.3)" }}
              />
            </div>

            {/* Conference title */}
            <h3
              className="font-bold text-white leading-tight"
              style={{
                fontSize: "clamp(0.58rem, 1.8vw, 0.95rem)",
                letterSpacing: "0.03em",
              }}
            >
              2<sup style={{ fontSize: "0.6em" }}>ND</sup> INTERNATIONAL
              SCIENTIFIC CONFERENCE{" "}
              <span style={{ color: kdu.yellow }}>2026</span>
            </h3>
          </div>
        </div>
      </div>
    </header>
  );
}
