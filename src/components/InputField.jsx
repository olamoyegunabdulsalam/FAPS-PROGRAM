import { palette } from "../utils/palette";
export default function InputField({
  label,
  id,
  type = "text",
  placeholder,
  value,
  onChange,
  error,
}) {
  return (
    <div>
      <label
        htmlFor={id}
        className="block text-sm font-medium mb-2"
        style={{ color: palette.navy }}
      >
        {label} <span style={{ color: "#c0392b" }}>*</span>
      </label>

      <input
        id={id}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="w-full rounded-2xl text-sm transition-all duration-200"
        style={{
          padding: "13px 16px",
          border: error ? "1.5px solid #e74c3c" : "1.5px solid #dbe3f0",
          outline: "none",
          background: "#fff",
          color: "#0b1e3a",
        }}
        onFocus={(e) => {
          e.target.style.border    = `1.5px solid ${palette.royal}`;
          e.target.style.boxShadow = "0 0 0 4px rgba(30,74,122,0.12)";
        }}
        onBlur={(e) => {
          e.target.style.border    = error ? "1.5px solid #e74c3c" : "1.5px solid #dbe3f0";
          e.target.style.boxShadow = "none";
        }}
      />

      {error && (
        <p className="text-xs mt-1.5 font-medium" style={{ color: "#e74c3c" }}>
          {error}
        </p>
      )}
    </div>
  );
}
