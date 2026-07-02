export const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "10px 12px",
  fontSize: "14px",
  fontFamily: "var(--font-geist-sans)",
  color: "var(--text)",
  background: "var(--fill)",
  border: "1px solid var(--hair)",
  borderRadius: "8px",
  outline: "none",
  boxSizing: "border-box",
};

export const textAreaStyle: React.CSSProperties = {
  ...inputStyle,
  minHeight: "90px",
  resize: "vertical",
  lineHeight: 1.5,
};
