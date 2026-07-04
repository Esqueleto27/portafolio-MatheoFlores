/* Large blurred ambient orbs — CSS only, zero JS */
function AmbientOrbs() {
  return (
    <div
      aria-hidden="true"
      style={{
        position: "fixed",
        inset: 0,
        pointerEvents: "none",
        zIndex: 0,
        overflow: "hidden",
      }}
    >
      {/* Top-left orb */}
      <div
        style={{
          position: "absolute",
          top: "-15vh",
          left: "-10vw",
          width: "55vw",
          height: "55vw",
          maxWidth: "700px",
          maxHeight: "700px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgb(37 99 235 / calc(var(--glow) * 0.22)) 0%, transparent 68%)",
          filter: "blur(80px)",
          animation: "mf-orb-drift-1 22s ease-in-out infinite",
        }}
      />
      {/* Bottom-right orb */}
      <div
        style={{
          position: "absolute",
          bottom: "-20vh",
          right: "-12vw",
          width: "60vw",
          height: "60vw",
          maxWidth: "760px",
          maxHeight: "760px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgb(91 140 255 / calc(var(--glow) * 0.18)) 0%, transparent 65%)",
          filter: "blur(100px)",
          animation: "mf-orb-drift-2 28s ease-in-out infinite",
        }}
      />
      {/* Mid accent orb */}
      <div
        style={{
          position: "absolute",
          top: "40vh",
          left: "50%",
          width: "40vw",
          height: "40vw",
          maxWidth: "500px",
          maxHeight: "500px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgb(37 99 235 / calc(var(--glow) * 0.1)) 0%, transparent 70%)",
          filter: "blur(90px)",
          animation: "mf-orb-drift-3 18s ease-in-out infinite",
        }}
      />
    </div>
  );
}

export function PageEffects() {
  return <AmbientOrbs />;
}
