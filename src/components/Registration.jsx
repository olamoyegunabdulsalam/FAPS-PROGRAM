import { useState } from "react";
import { FiArrowRight, FiCheck, FiX, FiFileText } from "react-icons/fi";
import { palette } from "../utils/palette";
import { isValidEmail } from "../utils/helpers";
import { useFadeIn } from "../hooks/useFadeIn";
import InputField from "./InputField";
import AbstractModal from "./AbstractModal";

const CATEGORIES = [
  { value: "Undergraduate – ₦20,000", label: "Undergraduate — ₦20,000" },
  { value: "Postgraduate – ₦30,000", label: "Postgraduate — ₦30,000" },
  {
    value: "Academics/Scientists/Technologist – ₦40,000",
    label: "Academics / Scientists / Technologist — ₦40,000",
  },
  { value: "Foreign – $40", label: "Foreign Delegate — $40" },
  { value: "Virtual – ₦30,000", label: "Virtual Attendance — ₦30,000" },
];

const EMPTY_FIELDS = {
  fullname: "",
  affiliation: "",
  email: "",
  phone: "",
  amount: "",
};

function validate(fields) {
  const errors = {};
  if (!fields.fullname.trim()) errors.fullname = "Full name is required.";
  if (!fields.affiliation.trim())
    errors.affiliation = "Affiliation is required.";
  if (!fields.email.trim()) errors.email = "Email address is required.";
  else if (!isValidEmail(fields.email))
    errors.email = "Please enter a valid email address.";
  if (!fields.phone.trim()) errors.phone = "Phone number is required.";
  if (!fields.amount) errors.amount = "Please select a registration category.";
  return errors;
}

export default function Registration() {
  const [ref, visible] = useFadeIn();

  const [fields, setFields] = useState(EMPTY_FIELDS);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState(null); // null | "success" | "error"
  const [submitting, setSubmitting] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const set = (key) => (e) =>
    setFields((prev) => ({ ...prev, [key]: e.target.value }));

  function handleSubmit(e) {
    e.preventDefault();
    const errs = validate(fields);
    setErrors(errs);
    if (Object.keys(errs).length) return;

    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setStatus("success");
      setFields(EMPTY_FIELDS);
      setTimeout(() => setStatus(null), 7000);
    }, 900);
  }

  return (
    <>
      {/* Abstract Modal */}
      <AbstractModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />

      <section
        id="register"
        className="py-24"
        style={{ background: "#f3f8fe" }}
      >
        <div
          ref={ref}
          className="max-w-2xl mx-auto px-4 sm:px-6 transition-all duration-700"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(28px)",
          }}
        >
          {/* Section heading */}
          <div className="text-center mb-10">
            <div
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-widest mb-4"
              style={{ background: "rgba(10,38,71,0.08)", color: palette.blue }}
            >
              Secure Your Spot
            </div>
            <h2
              className="text-3xl font-bold"
              style={{ color: palette.blue, letterSpacing: "-0.02em" }}
            >
              Register for the Conference
            </h2>
            <p className="text-sm mt-2" style={{ color: "#6b7a99" }}>
              All fields are required. Confirmation will be sent by email.
            </p>
          </div>

          {/* Registration card */}
          <div
            className="rounded-3xl p-8 md:p-10"
            style={{
              background: "#ffffff",
              boxShadow: "0 24px 60px -12px rgba(10,38,71,0.14)",
              border: "1px solid rgba(10,38,71,0.05)",
            }}
          >
            <form
              onSubmit={handleSubmit}
              noValidate
              className="flex flex-col gap-5"
            >
              <InputField
                label="Full Name"
                id="fullname"
                placeholder="e.g. Dr. Jane Okonkwo"
                value={fields.fullname}
                onChange={set("fullname")}
                error={errors.fullname}
              />
              <InputField
                label="Affiliation"
                id="affiliation"
                placeholder="University / Institute / Company"
                value={fields.affiliation}
                onChange={set("affiliation")}
                error={errors.affiliation}
              />
              <InputField
                label="Email Address"
                id="email"
                type="email"
                placeholder="jane@science.edu"
                value={fields.email}
                onChange={set("email")}
                error={errors.email}
              />
              <InputField
                label="Phone Number"
                id="phone"
                type="tel"
                placeholder="+234 800 000 0000"
                value={fields.phone}
                onChange={set("phone")}
                error={errors.phone}
              />

              {/* Category select */}
              <div>
                <label
                  htmlFor="amount"
                  className="block text-sm font-medium mb-2"
                  style={{ color: palette.blue }}
                >
                  Registration Category{" "}
                  <span style={{ color: "#c0392b" }}>*</span>
                </label>
                <select
                  id="amount"
                  value={fields.amount}
                  onChange={set("amount")}
                  className="w-full rounded-2xl text-sm transition-all duration-200 appearance-none"
                  style={{
                    padding: "13px 16px",
                    border: errors.amount
                      ? "1.5px solid #e74c3c"
                      : "1.5px solid #dbe3f0",
                    outline: "none",
                    background: "#fff",
                    color: fields.amount ? "#0b1e3a" : "#94a3b8",
                  }}
                  onFocus={(e) => {
                    e.target.style.border = `1.5px solid ${palette.blue}`;
                    e.target.style.boxShadow = "0 0 0 4px rgba(10,38,71,0.08)";
                  }}
                  onBlur={(e) => {
                    e.target.style.border = errors.amount
                      ? "1.5px solid #e74c3c"
                      : "1.5px solid #dbe3f0";
                    e.target.style.boxShadow = "none";
                  }}
                >
                  <option value="" disabled>
                    — Select registration category —
                  </option>
                  {CATEGORIES.map((c) => (
                    <option
                      key={c.value}
                      value={c.value}
                      style={{ color: "#0b1e3a" }}
                    >
                      {c.label}
                    </option>
                  ))}
                </select>
                {errors.amount && (
                  <p
                    className="text-xs mt-1.5 font-medium"
                    style={{ color: "#e74c3c" }}
                  >
                    {errors.amount}
                  </p>
                )}
              </div>

              {/* Submit registration */}
              <button
                type="submit"
                disabled={submitting}
                className="w-full flex items-center justify-center gap-2 rounded-full font-semibold text-base transition-all duration-200 mt-2"
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
                    Registrating…
                  </>
                ) : (
                  <>
                   Registration <FiArrowRight size={16} />
                  </>
                )}
              </button>

              {/* Status banners */}
              {status === "success" && (
                <div
                  className="flex items-start gap-3 px-5 py-4 rounded-2xl text-sm font-medium"
                  style={{
                    background: "#e8f8ef",
                    border: "1px solid #27ae60",
                    color: "#1a6b3c",
                  }}
                >
                  <FiCheck size={18} className="mt-0.5 flex-shrink-0" />
                  <span>
                    Registration successfully! A confirmation will be
                    sent to your email shortly.
                  </span>
                </div>
              )}
              {status === "error" && (
                <div
                  className="flex items-start gap-3 px-5 py-4 rounded-2xl text-sm font-medium"
                  style={{
                    background: "#ffefef",
                    border: "1px solid #e74c3c",
                    color: "#a12b2b",
                  }}
                >
                  <FiX size={18} className="mt-0.5 flex-shrink-0" />
                  <span>Something went wrong. Please try again.</span>
                </div>
              )}
            </form>
          </div>

          {/* ── Submit Abstract CTA ──────────────────────────────── */}
          <div
            className="mt-5 rounded-3xl px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-4"
            style={{
              background: `linear-gradient(135deg, ${palette.blue} 0%, ${palette.blueMid} 100%)`,
              border: `1px solid rgba(245,194,0,0.25)`,
            }}
          >
            <div>
              <p
                className="text-sm mt-0.5"
                style={{ color: "rgba(255,255,255,0.6)" }}
              >
                Submit your abstract for review.
              </p>
            </div>
            <button
              onClick={() => setModalOpen(true)}
              className="flex-shrink-0 flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-sm transition-all duration-200 whitespace-nowrap"
              style={{
                background: palette.yellow,
                color: palette.blue,
                boxShadow: "0 4px 16px rgba(245,194,0,0.35)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = palette.yellowLight;
                e.currentTarget.style.transform = "translateY(-1px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = palette.yellow;
                e.currentTarget.style.transform = "";
              }}
            >
              <FiFileText size={15} />
              Submit Abstract
            </button>
          </div>
        </div>
      </section>
    </>
  );
}
