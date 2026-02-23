import { useState } from "react";
import {
  FiMail,
  FiPhone,
  FiX,
  FiMessageCircle,
  FiChevronDown,
} from "react-icons/fi";

const CONTACT = {
  email: "faps.conference@koladaisiuniversity.edu.ng",
  phone: "+234 803 845 7760",
};

const kdu = {
  blue: "#0a2647",
  blueMid: "#0d3360",
  yellow: "#f5c200",
};

export default function ContactPopup() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <style>{`
        @keyframes popupSlideUp {
          from { opacity: 0; transform: translateY(16px) scale(0.97); }
          to   { opacity: 1; transform: translateY(0)    scale(1);    }
        }
        @keyframes pulseRing {
          0%   { transform: scale(1);    opacity: 0.6; }
          100% { transform: scale(1.55); opacity: 0;   }
        }
      `}</style>

      {/* ── Sticky wrapper — bottom-right corner ──────────────── */}
      <div
        className="fixed z-50 flex flex-col items-end gap-3"
        style={{ bottom: 24, right: 20 }}
      >
        {/* ── Popup card ──────────────────────────────────────── */}
        {open && (
          <div
            className="w-72 sm:w-80 rounded-2xl overflow-hidden"
            style={{
              background: "#ffffff",
              boxShadow:
                "0 24px 60px -8px rgba(10,38,71,0.22), 0 8px 24px -4px rgba(10,38,71,0.12)",
              border: "1px solid rgba(10,38,71,0.07)",
              animation: "popupSlideUp 0.28s cubic-bezier(0.22,1,0.36,1) both",
            }}
          >
            {/* Card header */}
            <div
              className="flex items-center justify-between px-5 py-4"
              style={{
                background: `linear-gradient(135deg, ${kdu.blue} 0%, ${kdu.blueMid} 100%)`,
                borderBottom: `3px solid ${kdu.yellow}`,
              }}
            >
              <div>
                <p
                  className="text-xs font-bold uppercase tracking-widest mb-0.5"
                  style={{ color: kdu.yellow }}
                >
                  Contact Us
                </p>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="w-7 h-7 rounded-full flex items-center justify-center transition-all duration-200"
                style={{
                  background: "rgba(255,255,255,0.12)",
                  color: "rgba(255,255,255,0.8)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "rgba(255,255,255,0.22)";
                  e.currentTarget.style.color = "#fff";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "rgba(255,255,255,0.12)";
                  e.currentTarget.style.color = "rgba(255,255,255,0.8)";
                }}
                aria-label="Close"
              >
                <FiX size={14} />
              </button>
            </div>

            {/* Card body */}
            <div className="px-5 py-4 flex flex-col gap-3">
              {/* Email row */}
              <a
                href={`mailto:${CONTACT.email}`}
                className="flex items-start gap-3 p-3 rounded-xl transition-all duration-200 group"
                style={{ background: "rgba(10,38,71,0.04)" }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.background = "rgba(10,38,71,0.08)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.background = "rgba(10,38,71,0.04)")
                }
              >
                <span
                  className="flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center mt-0.5"
                  style={{ background: kdu.blue }}
                >
                  <FiMail size={14} color="#fff" />
                </span>
                <div className="min-w-0">
                  <p
                    className="text-xs font-semibold uppercase tracking-wider mb-0.5"
                    style={{ color: "#94a3b8" }}
                  >
                    Email
                  </p>
                  <p
                    className="text-xs font-medium leading-snug break-all"
                    style={{ color: kdu.blue }}
                  >
                    {CONTACT.email}
                  </p>
                </div>
              </a>

              {/* Phone row */}
              <a
                href={`tel:${CONTACT.phone.replace(/\s/g, "")}`}
                className="flex items-center gap-3 p-3 rounded-xl transition-all duration-200"
                style={{ background: "rgba(10,38,71,0.04)" }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.background = "rgba(10,38,71,0.08)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.background = "rgba(10,38,71,0.04)")
                }
              >
                <span
                  className="flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center"
                  style={{ background: kdu.blue }}
                >
                  <FiPhone size={14} color="#fff" />
                </span>
                <div>
                  <p
                    className="text-xs font-semibold uppercase tracking-wider mb-0.5"
                    style={{ color: "#94a3b8" }}
                  >
                    Phone
                  </p>
                  <p
                    className="text-sm font-semibold"
                    style={{ color: kdu.blue }}
                  >
                    {CONTACT.phone}
                  </p>
                </div>
              </a>
            </div>

            {/* Card footer */}
            <div className="px-5 pb-4">
              <p className="text-xs text-center text-gray-400">
                2nd International Scientific Conference · KDU 2026
              </p>
            </div>
          </div>
        )}

        {/* ── Floating trigger button ──────────────────────────── */}
        <div className="relative flex items-center justify-center">
          {/* pulse ring — only when closed */}
          {!open && (
            <span
              className="absolute rounded-full pointer-events-none"
              style={{
                inset: -4,
                background: kdu.yellow,
                animation: "pulseRing 1.8s ease-out infinite",
              }}
            />
          )}

          <button
            onClick={() => setOpen((o) => !o)}
            className="relative flex items-center gap-2 pl-4 pr-5 py-3 rounded-full font-semibold text-sm transition-all duration-200"
            style={{
              background: kdu.blue,
              color: "#fff",
              boxShadow: "0 8px 28px rgba(10,38,71,0.35)",
              border: `2px solid ${kdu.yellow}`,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = kdu.blueMid;
              e.currentTarget.style.transform = "translateY(-2px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = kdu.blue;
              e.currentTarget.style.transform = "";
            }}
            aria-label="Toggle contact popup"
          >
            {open ? (
              <>
                <FiChevronDown size={16} /> Close
              </>
            ) : (
              <>
                <FiMessageCircle size={16} /> Contact Us
              </>
            )}
          </button>
        </div>
      </div>
    </>
  );
}
