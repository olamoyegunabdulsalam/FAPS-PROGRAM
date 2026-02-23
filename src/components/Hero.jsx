import { useState } from "react";
import { FiArrowRight, FiChevronDown, FiFileText } from "react-icons/fi";
import { scrollTo } from "../utils/helpers";
import AbstractModal from "./AbstractModal";

const themeColor = {
  blue: "#0a2647",
  blueMid: "#0d3360",
  blueLight: "#1a5276",
  yellow: "#f5c200",
  yellowLight: "#ffd740",
  white: "#ffffff",
};


export default function Hero() {
  const [modalOpen, setModalOpen] = useState(false);
  return (
    <>
      <AbstractModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
      <section
        id="home"
        className="relative flex items-center justify-center overflow-hidden"
        style={{
          minHeight: "100vh",
          background: `linear-gradient(150deg, ${themeColor.blue} 0%, ${themeColor.blueMid} 50%, ${themeColor.blueLight} 100%)`,
        }}
      >
        {/* Keyframe styles */}
        <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0);    }
        }
        @media (max-width: 640px) {
          .hero-headline { font-size: 1.7rem !important; }
          .hero-meta h4  { font-size: 0.9rem !important; }
          .hero-badge    { font-size: 0.65rem !important; }
          .hero-cta      { width: 100% !important; justify-content: center !important; }
          .hero-cta-wrap { flex-direction: column !important; align-items: stretch !important; }
        }
        @media (min-width: 641px) and (max-width: 1023px) {
          .hero-headline { font-size: 2.4rem !important; }
        }
      `}</style>

        {/* Decorative dot-grid — themeColor gold tint */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(rgba(245,194,0,0.07) 1px, transparent 1px)," +
              "linear-gradient(90deg, rgba(245,194,0,0.07) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />

        {/* Glowing orbs — gold & brown */}
        <div
          className="absolute pointer-events-none"
          style={{
            top: "15%",
            right: "12%",
            width: 420,
            height: 420,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(245,194,0,0.22) 0%, transparent 70%)",
          }}
        />
        <div
          className="absolute pointer-events-none"
          style={{
            bottom: "10%",
            left: "8%",
            width: 300,
            height: 300,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(0,53,128,0.5) 0%, transparent 70%)",
          }}
        />
        {/* extra top-left glow */}
        <div
          className="absolute pointer-events-none"
          style={{
            top: "-5%",
            left: "30%",
            width: 500,
            height: 260,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(245,194,0,0.1) 0%, transparent 70%)",
          }}
        />

        {/* Main content */}
        <div
          className="relative w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
          style={{
            paddingTop: "clamp(90px, 14vw, 130px)",
            paddingBottom: "clamp(60px, 10vw, 100px)",
          }}
        >
          {/* Badge */}
          <div
            className="hero-badge inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-widest mb-6 sm:mb-8"
            style={{
              background: "rgba(245,194,0,0.15)",
              border: `1px solid rgba(245,194,0,0.45)`,
              color: themeColor.yellowLight,
              animation: "fadeUp 0.6s 0.1s both",
            }}
          >
            <span
              className="w-1.5 h-1.5 rounded-full animate-pulse flex-shrink-0"
              style={{ background: themeColor.yellowLight }}
            />
            2nd International Scientific Conference · 2026
          </div>

          {/* Headline */}
          <h1
            className="hero-headline font-bold leading-tight mb-5 sm:mb-6 text-4xl"
            style={{
              color: themeColor.white,
              animation: "fadeUp 0.7s 0.2s both",
            }}
          >
            Bridging Academia, Industry, and Society:
            <br />
            <span style={{ color: themeColor.yellowLight }}>
              Innovative Solutions for Sustainable Development
            </span>
          </h1>

          {/* Date & Venue */}
          <div
            className="hero-meta text-white text-center mb-6 sm:mb-8 space-y-1"
            style={{ animation: "fadeUp 0.7s 0.35s both" }}
          >
            <h4 className="text-sm sm:text-base font-medium">
              <span style={{ color: themeColor.yellowLight, fontWeight: 700 }}>
                Date:
              </span>{" "}
              June 1 – 4 2026
            </h4>
            <h4 className="text-sm sm:text-base font-medium">
              <span style={{ color: themeColor.yellowLight, fontWeight: 700 }}>
                Venue:
              </span>{" "}
              KolaDaisi University, Ibadan, Nigeria
            </h4>
          </div>

          {/* CTAs */}
          <div
            className="hero-cta-wrap flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4"
            style={{ animation: "fadeUp 0.7s 0.5s both" }}
          >
            <a
              href="#register"
              onClick={(e) => {
                e.preventDefault();
                scrollTo("#register");
              }}
              className="hero-cta inline-flex items-center gap-2 px-6 sm:px-8 py-3.5 sm:py-4 rounded-full font-semibold text-sm sm:text-base transition-all duration-200 w-full sm:w-auto justify-center"
              style={{
                background: themeColor.yellow,
                color: themeColor.blue,
                boxShadow: "0 8px 30px rgba(245,194,0,0.40)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-2px)";
                e.currentTarget.style.background = themeColor.yellowLight;
                e.currentTarget.style.boxShadow =
                  "0 12px 40px rgba(245,194,0,0.55)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "";
                e.currentTarget.style.background = themeColor.yellow;
                e.currentTarget.style.boxShadow =
                  "0 8px 30px rgba(245,194,0,0.40)";
              }}
            >
              Register Now <FiArrowRight size={16} />
            </a>

            <button
              onClick={() => setModalOpen(true)}
              className="hero-cta inline-flex items-center gap-2 px-6 sm:px-8 py-3.5 sm:py-4 rounded-full font-medium text-sm sm:text-base transition-all duration-200 w-full sm:w-auto justify-center"
              style={{
                background: "rgba(255,255,255,0.08)",
                color: "rgba(255,255,255,0.85)",
                border: "1px solid rgba(255,255,255,0.2)",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.background = "rgba(255,255,255,0.15)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.background = "rgba(255,255,255,0.08)")
              }
            >
              <FiFileText size={15} />
              Submit Abstracts
            </button>
          </div>

          {/* Scroll indicator */}
          <div
            className="mt-16 sm:mt-20 flex flex-col items-center gap-1 opacity-40"
            style={{ animation: "fadeUp 0.7s 0.9s both" }}
          >
            <span className="text-xs uppercase tracking-widest text-white">
              Scroll
            </span>
            <FiChevronDown className="text-white animate-bounce" size={18} />
          </div>
        </div>

        {/* Bottom wave — matches page background */}
        <div className="absolute bottom-0 left-0 right-0 pointer-events-none">
          <svg
            viewBox="0 0 1440 60"
            xmlns="http://www.w3.org/2000/svg"
            style={{ display: "block" }}
          >
            <path
              d="M0,30 C360,60 1080,0 1440,30 L1440,60 L0,60 Z"
              fill="#f8faff"
            />
          </svg>
        </div>
      </section>
    </>
  );
}
