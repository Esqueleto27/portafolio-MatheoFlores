export function TagInput({
  tags,
  input,
  onInput,
  onKeyDown,
  onRemove,
  onBlur,
}: {
  tags: string[];
  input: string;
  onInput: (v: string) => void;
  onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  onRemove: (tag: string) => void;
  onBlur: () => void;
}) {
  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        gap: "6px",
        padding: "8px 10px",
        background: "var(--fill)",
        border: "1px solid var(--hair)",
        borderRadius: "8px",
        minHeight: "44px",
        alignItems: "center",
        cursor: "text",
      }}
    >
      {tags.map((tag) => (
        <span
          key={tag}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "4px",
            padding: "3px 8px 3px 9px",
            borderRadius: "5px",
            background: "var(--fill2)",
            border: "1px solid var(--hair)",
            fontSize: "12px",
            color: "var(--soft)",
            fontFamily: "var(--font-geist-mono)",
          }}
        >
          {tag}
          <button
            type="button"
            onClick={() => onRemove(tag)}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              color: "var(--muted)",
              padding: "0",
              lineHeight: 1,
              fontSize: "15px",
              display: "flex",
              alignItems: "center",
            }}
          >
            ×
          </button>
        </span>
      ))}
      <input
        value={input}
        onChange={(e) => onInput(e.target.value)}
        onKeyDown={onKeyDown}
        onBlur={onBlur}
        placeholder={
          tags.length === 0
            ? "Next.js, Supabase, TypeScript… (Enter para agregar)"
            : "Agregar más…"
        }
        style={{
          flex: 1,
          minWidth: "160px",
          background: "none",
          border: "none",
          outline: "none",
          fontSize: "13px",
          color: "var(--text)",
          fontFamily: "var(--font-geist-sans)",
          padding: "2px 0",
        }}
      />
    </div>
  );
}
