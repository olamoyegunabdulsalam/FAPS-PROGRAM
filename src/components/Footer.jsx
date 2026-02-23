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

      <div className="flex flex-col items-center mb-3">
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
      </div>

      <p
        className="text-xs text-center"
        style={{ color: "rgba(223,234,247,0.4)" }}
      >
        © 2026 Faculty of Applied Science. All rights reserved.
      </p>
      <div className="text-center mt-4 pt-4 border-t border-white/10">
        <p className="text-sm text-gray-400">
          Website designed &amp; developed by{" "}
          <a
            href="https://olamoyegunabdulsalam.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold hover:underline"
          >
            Olamoyegun Abdulsalam
          </a>
        </p>

        <p className="text-xs text-gray-500 mt-1 pb-3 flex flex-wrap items-center justify-center gap-x-3 gap-y-2">
          <span className="flex items-center gap-1.5">
            <FiMail size={13} />
            olamoyegunabdulsalam59@gmail.com
          </span>
          <span className="hidden sm:inline text-gray-600">|</span>
          <span className="flex items-center gap-1.5">
            <FiPhone size={13} />
            +234 907 502 5164
          </span>
        </p>
      </div>
    </footer>
  );
}
