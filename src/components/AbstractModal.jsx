import { useState, useEffect, useRef } from "react";
import { FiX, FiArrowRight, FiCheck, FiTag, FiPlus } from "react-icons/fi";
import { palette } from "../utils/palette";
import { isValidEmail } from "../utils/helpers";
import InputField from "./InputField";

/* ─── constants ──────────────────────────────────────────────── */
const EMPTY = {
  title: "",
  fullname: "",
  affiliation: "",
  email: "",
  abstract: "",
  keywords: "",
};

function validate(fields) {
  const errors = {};
  if (!fields.title.trim()) errors.title = "Abstract title is required.";
  if (!fields.fullname.trim()) errors.fullname = "Full name is required.";
  if (!fields.affiliation.trim())
    errors.affiliation = "Affiliation is required.";
  if (!fields.email.trim()) errors.email = "Email address is required.";
  else if (!isValidEmail(fields.email))
    errors.email = "Please enter a valid name & email Corresponding author";
  if (!fields.abstract.trim()) errors.abstract = "Abstract body is required.";
  else if (fields.abstract.trim().split(/\s+/).length < 50)
    errors.abstract = "Abstract must be at least 50 words.";
  if (!fields.keywords.trim())
    errors.keywords = "At least one keyword is required.";
  return errors;
}

/* ─── keyword pill input ─────────────────────────────────────── */
function KeywordInput({ value, onChange, error }) {
  const [input, setInput] = useState("");
  const pills = value
    ? value
        .split(",")
        .map((k) => k.trim())
        .filter(Boolean)
    : [];

  function addKeyword() {
    const trimmed = input.trim().replace(/,/g, "");
    if (!trimmed) return;
    const next = [...pills, trimmed].join(", ");
    onChange({ target: { value: next } });
    setInput("");
  }

  function removeKeyword(idx) {
    const next = pills.filter((_, i) => i !== idx).join(", ");
    onChange({ target: { value: next } });
  }

  function onKeyDown(e) {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      addKeyword();
    }
    if (e.key === "Backspace" && !input && pills.length) {
      removeKeyword(pills.length - 1);
    }
  }

  return (
    <div>
      <label
        className="block text-sm font-medium mb-2"
        style={{ color: palette.blue }}
      >
        Keywords <span style={{ color: "#c0392b" }}>*</span>
        <span className="ml-2 text-xs font-normal text-gray-400">
          (press Enter or comma to add)
        </span>
      </label>

      {/* pill container */}
      <div
        className="w-full rounded-2xl transition-all duration-200 flex flex-wrap gap-2 items-center"
        style={{
          padding: "10px 14px",
          border: error ? "1.5px solid #e74c3c" : "1.5px solid #dbe3f0",
          background: "#fff",
          minHeight: 52,
        }}
        onClick={() => document.getElementById("kw-input")?.focus()}
      >
        {pills.map((kw, i) => (
          <span
            key={i}
            className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold"
            style={{ background: `rgba(10,38,71,0.08)`, color: palette.blue }}
          >
            <FiTag size={10} />
            {kw}
            <button
              type="button"
              onClick={() => removeKeyword(i)}
              className="ml-1 hover:text-red-500 transition-colors"
            >
              <FiX size={10} />
            </button>
          </span>
        ))}
        <input
          id="kw-input"
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={onKeyDown}
          onBlur={addKeyword}
          placeholder={
            pills.length === 0 ? "e.g. Quantum Physics, Nanotechnology…" : ""
          }
          className="flex-1 text-sm outline-none bg-transparent"
          style={{ minWidth: 140, color: "#0b1e3a" }}
        />
      </div>

      {error && (
        <p className="text-xs mt-1.5 font-medium" style={{ color: "#e74c3c" }}>
          {error}
        </p>
      )}
    </div>
  );
}

/* ─── word counter for textarea ──────────────────────────────── */
function wordCount(text) {
  return text.trim() ? text.trim().split(/\s+/).length : 0;
}

/* ═══════════════════════════════════════════════════════════════
   ABSTRACT MODAL
═══════════════════════════════════════════════════════════════ */
export default function AbstractModal({ isOpen, onClose }) {
  const [fields, setFields] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState(null); // null | "success"
  const [submitting, setSubmitting] = useState(false);
  const overlayRef = useRef(null);

  const set = (key) => (e) =>
    setFields((prev) => ({ ...prev, [key]: e.target.value }));
  const wc = wordCount(fields.abstract);

  /* lock body scroll when open */
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      // reset on close
      setFields(EMPTY);
      setErrors({});
      setStatus(null);
      setSubmitting(false);
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  /* Esc key closes */
  useEffect(() => {
    const handler = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  function handleSubmit(e) {
    e.preventDefault();
    const errs = validate(fields);
    setErrors(errs);
    if (Object.keys(errs).length) return;
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setStatus("success");
    }, 1000);
  }

  if (!isOpen) return null;

  return (
    <>
      <style>{`
        @keyframes modalFadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes modalSlideUp {
          from { opacity: 0; transform: translateY(32px) scale(0.98); }
          to   { opacity: 1; transform: translateY(0)    scale(1);    }
        }
        .modal-scroll::-webkit-scrollbar { width: 6px; }
        .modal-scroll::-webkit-scrollbar-track { background: transparent; }
        .modal-scroll::-webkit-scrollbar-thumb { background: rgba(10,38,71,0.15); border-radius: 99px; }
      `}</style>

      {/* ── Backdrop ─────────────────────────────────────────── */}
      <div
        ref={overlayRef}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
        style={{
          background: "rgba(10,38,71,0.6)",
          backdropFilter: "blur(6px)",
          animation: "modalFadeIn 0.25s ease both",
        }}
        onClick={(e) => {
          if (e.target === overlayRef.current) onClose();
        }}
      >
        {/* ── Modal panel ──────────────────────────────────── */}
        <div
          className="relative w-full max-w-2xl max-h-[92vh] flex flex-col rounded-3xl overflow-hidden"
          style={{
            background: "#ffffff",
            boxShadow: "0 32px 80px -12px rgba(10,38,71,0.28)",
            animation: "modalSlideUp 0.3s cubic-bezier(0.22,1,0.36,1) both",
          }}
        >
          {/* ── Header ───────────────────────────────────── */}
          <div
            className="flex-shrink-0 flex items-start justify-between px-6 sm:px-8 py-6"
            style={{
              background: `linear-gradient(135deg, ${palette.blue} 0%, ${palette.blueMid} 100%)`,
              borderBottom: `3px solid ${palette.yellow}`,
            }}
          >
            <div>
              <div
                className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-widest mb-3"
                style={{
                  background: "rgba(245,194,0,0.18)",
                  color: palette.yellow,
                }}
              >
                <FiTag size={11} /> Abstract Submission
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-white leading-snug">
                Submit Your Abstract
              </h2>
              <p
                className="text-sm mt-1"
                style={{ color: "rgba(255,255,255,0.6)" }}
              >
                2nd International Conference · Faculty of Applied Sciences · KDU
                2026
              </p>
              <p className="text-white text-sm ">
                Prospective participants are to know that the last day of submission 
                of abstract is May 15, 2026.
              </p>
            </div>

            {/* Close button */}
            <button
              onClick={onClose}
              className="flex-shrink-0 ml-4 w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200"
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
              aria-label="Close modal"
            >
              <FiX size={18} />
            </button>
          </div>

          {/* ── Scrollable body ───────────────────────────── */}
          <div className="modal-scroll flex-1 overflow-y-auto px-6 sm:px-8 py-6">
            {status === "success" ? (
              /* ── Success state ──────────────────────────── */
              <div className="flex flex-col items-center justify-center py-16 text-center gap-4">
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center mb-2"
                  style={{ background: "#e8f8ef" }}
                >
                  <FiCheck size={32} style={{ color: "#1a6b3c" }} />
                </div>
                <h3
                  className="text-xl font-bold"
                  style={{ color: palette.blue }}
                >
                  Abstract Submitted!
                </h3>
                <p className="text-sm text-gray-500 max-w-sm leading-relaxed">
                  Thank you for your submission. A confirmation with your
                  abstract details will be sent to{" "}
                  <strong>{fields.email || "your email"}</strong> shortly.
                </p>
                <button
                  onClick={onClose}
                  className="mt-4 px-8 py-3 rounded-full font-semibold text-sm transition-all duration-200"
                  style={{ background: palette.blue, color: "#fff" }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.background = palette.blueMid)
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.background = palette.blue)
                  }
                >
                  Close
                </button>
              </div>
            ) : (
              /* ── Form ───────────────────────────────────── */
              <form
                onSubmit={handleSubmit}
                noValidate
                className="flex flex-col gap-5"
              >
                {/* Abstract Title */}
                <InputField
                  label="Abstract Title"
                  id="abstract-title"
                  placeholder="e.g. Quantum Computing Applications in Drug Discovery"
                  value={fields.title}
                  onChange={set("title")}
                  error={errors.title}
                />

                {/* Full Name */}
                <InputField
                  label="Full Name(s) of Author(s)"
                  id="abstract-fullname"
                  placeholder="e.g. Dr. Jane Okonkwo"
                  value={fields.fullname}
                  onChange={set("fullname")}
                  error={errors.fullname}
                />

                {/* Affiliation */}
                <InputField
                  label="Affiliation"
                  id="abstract-affiliation"
                  placeholder="University / Institute / Company"
                  value={fields.affiliation}
                  onChange={set("affiliation")}
                  error={errors.affiliation}
                />

                {/* Email */}
                <InputField
                  label="Name & Email of Corresponding Author"
                  id="abstract-email"
                  type="email"
                  placeholder="jane@science.edu"
                  value={fields.email}
                  onChange={set("email")}
                  error={errors.email}
                />

                {/* Abstract body */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label
                      htmlFor="abstract-body"
                      className="block text-sm font-medium"
                      style={{ color: palette.blue }}
                    >
                      Abstract Body <span style={{ color: "#c0392b" }}>*</span>
                    </label>
                    <span
                      className="text-xs font-medium px-2 py-0.5 rounded-full"
                      style={{
                        background:
                          wc < 50
                            ? "rgba(231,76,60,0.08)"
                            : "rgba(26,107,60,0.08)",
                        color: wc < 50 ? "#c0392b" : "#1a6b3c",
                      }}
                    >
                      {wc} / 300 words
                    </span>
                  </div>
                  <textarea
                    id="abstract-body"
                    rows={6}
                    placeholder="Provide a concise summary of your research (minimum 50 words, maximum 300 words)…"
                    value={fields.abstract}
                    onChange={set("abstract")}
                    className="w-full rounded-2xl text-sm transition-all duration-200 resize-none"
                    style={{
                      padding: "13px 16px",
                      border: errors.abstract
                        ? "1.5px solid #e74c3c"
                        : "1.5px solid #dbe3f0",
                      outline: "none",
                      background: "#fff",
                      color: "#0b1e3a",
                      lineHeight: 1.7,
                    }}
                    onFocus={(e) => {
                      e.target.style.border = `1.5px solid ${palette.blue}`;
                      e.target.style.boxShadow =
                        "0 0 0 4px rgba(10,38,71,0.08)";
                    }}
                    onBlur={(e) => {
                      e.target.style.border = errors.abstract
                        ? "1.5px solid #e74c3c"
                        : "1.5px solid #dbe3f0";
                      e.target.style.boxShadow = "none";
                    }}
                  />
                  {errors.abstract && (
                    <p
                      className="text-xs mt-1.5 font-medium"
                      style={{ color: "#e74c3c" }}
                    >
                      {errors.abstract}
                    </p>
                  )}
                </div>

                {/* Keywords */}
                <KeywordInput
                  value={fields.keywords}
                  onChange={set("keywords")}
                  error={errors.keywords}
                />

                {/* Divider */}
                <div
                  className="h-px my-1"
                  style={{ background: "rgba(10,38,71,0.07)" }}
                />

                {/* Submit */}
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full flex items-center justify-center gap-2 rounded-full font-semibold text-base transition-all duration-200"
                  style={{
                    padding: "15px 24px",
                    background: submitting ? palette.blueMid : palette.blue,
                    color: "#ffffff",
                    border: "none",
                    cursor: submitting ? "not-allowed" : "pointer",
                    boxShadow: "0 6px 20px rgba(10,38,71,0.25)",
                  }}
                  onMouseEnter={(e) => {
                    if (!submitting) {
                      e.currentTarget.style.background = palette.blueMid;
                      e.currentTarget.style.transform = "translateY(-1px)";
                    }
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = submitting
                      ? palette.blueMid
                      : palette.blue;
                    e.currentTarget.style.transform = "";
                  }}
                >
                  {submitting ? (
                    <>
                      <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Submitting Abstract…
                    </>
                  ) : (
                    <>
                      Submit Abstract <FiArrowRight size={16} />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
