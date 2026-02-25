import { FiMail, FiPhone } from "react-icons/fi";
import { palette } from "../utils/palette";

export default function Footer() {
  return (
    <footer style={{ background: palette.blue }}>
      {/* Top wave */}
      <div className="pointer-events-none" style={{ marginBottom: -2 }}>
        <svg
          viewBox="0 0 1440 40"
          xmlns="http://www.w3.org/2000/svg"
          style={{ display: "block", transform: "rotate(180deg)" }}
        >
          <path
            d="M0,20 C360,40 1080,0 1440,20 L1440,40 L0,40 Z"
            fill={palette.blue}
          />
        </svg>
      </div>

      <div className="flex flex-col items-center pb-3">
        <img
          src="/images/kdu-logo.gif"
          alt="KDU Logo"
          className="h-12 w-12 object-contain mb-2"
        />

        <h4
          style={{ color: "rgba(223,234,247,0.4)" }}
          className="text-md font-serif text-center"
        >
          Faculty of Applied Science
        </h4>
        <p
          className="text-xs text-center"
          style={{ color: "rgba(223,234,247,0.4)" }}
        >
          © 2026 Faculty of Applied Science. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
