const DOT_COLORS = ["#ff5f57", "#febc2e", "#28c840"];

export function BrowserFrame({
  children,
  transitionDelay,
}: {
  children: React.ReactNode;
  transitionDelay?: number;
}) {
  return (
    <div
      data-reveal
      style={{
        width: "100%",
        borderRadius: "18px",
        border: "1px solid var(--hair)",
        background: "var(--mockup)",
        overflow: "hidden",
        marginBottom: "56px",
        transitionDelay: transitionDelay !== undefined ? `${transitionDelay}s` : undefined,
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "7px",
          padding: "12px 16px",
          background: "var(--fill2)",
          borderBottom: "1px solid var(--hair)",
        }}
      >
        {DOT_COLORS.map((color) => (
          <span
            key={color}
            style={{
              width: "11px",
              height: "11px",
              borderRadius: "50%",
              background: color,
              flexShrink: 0,
            }}
          />
        ))}
      </div>
      <div
        style={{
          width: "100%",
          aspectRatio: "16/9",
          position: "relative",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {children}
      </div>
    </div>
  );
}

export function PhoneFrame({
  children,
  transitionDelay,
}: {
  children: React.ReactNode;
  transitionDelay?: number;
}) {
  return (
    <div
      data-reveal
      style={{
        width: "min(260px, 60vw)",
        aspectRatio: "9/19.5",
        borderRadius: "42px",
        border: "10px solid #161616",
        background: "#000",
        boxShadow: "0 20px 60px rgba(0,0,0,0.35)",
        overflow: "hidden",
        position: "relative",
        margin: "0 auto",
        transitionDelay: transitionDelay !== undefined ? `${transitionDelay}s` : undefined,
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 0,
          left: "50%",
          transform: "translateX(-50%)",
          width: "38%",
          height: "22px",
          background: "#161616",
          borderBottomLeftRadius: "16px",
          borderBottomRightRadius: "16px",
          zIndex: 2,
        }}
      />
      <div style={{ position: "absolute", inset: 0 }}>{children}</div>
    </div>
  );
}
