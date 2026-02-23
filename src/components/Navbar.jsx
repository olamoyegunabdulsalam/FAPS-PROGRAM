import { useState, useEffect } from "react";


const NAV_LINKS = ["Home", "About", "Register"];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 py-5 text-center transition-all duration-300"
      style={{
        background: scrolled ? "rgba(10,38,71,0.97)" : "transparent",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(255,255,255,0.07)" : "none",
        boxShadow: scrolled ? "0 4px 30px rgba(0,0,0,0.18)" : "none",
      }}
    >
      <div className="max-w-6xl mx-auto ">
        {/* Logo */}
        <span
          className="font-bold tracking-tight text-white text-lg "
          style={{ fontFamily: "'Instrument Sans', system-ui, sans-serif" }}
        >
          <img
            src="/images/kdu-logo.gif"
            alt="KDU Logo"
            className="h-6 w-6 inline-block mr-2"
          />
         FACULTY OF APPLIED SCIENCES PRESENT: 2ND INTERNATIONAL SCIENTIFIC CONFERENCE 2026
        </span>
      </div>
    </header>
  );
}
