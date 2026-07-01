"use client";

import { useRef, useState } from "react";
import { uploadImageAction } from "@/lib/admin-actions";

interface ImageUploadProps {
  currentUrl?: string;
  onUploaded: (url: string) => void;
}

export function ImageUpload({ currentUrl, onUploaded }: ImageUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | undefined>(currentUrl);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    // Local preview
    setPreview(URL.createObjectURL(file));
    setError(null);
    setLoading(true);

    try {
      const fd = new FormData();
      fd.append("file", file);
      const url = await uploadImageAction(fd);
      onUploaded(url);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error al subir la imagen");
      setPreview(currentUrl);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
      {/* Preview */}
      <div
        onClick={() => !loading && inputRef.current?.click()}
        style={{
          width: "100%",
          maxWidth: "340px",
          aspectRatio: "16/9",
          borderRadius: "10px",
          border: `2px dashed ${error ? "#ef4444" : "var(--hair)"}`,
          background: "var(--fill)",
          cursor: loading ? "wait" : "pointer",
          overflow: "hidden",
          position: "relative",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transition: "border-color 0.2s",
        }}
      >
        {preview ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={preview}
            alt="Preview"
            style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
          />
        ) : (
          <div style={{ textAlign: "center", padding: "16px" }}>
            <div style={{ fontSize: "28px", marginBottom: "6px" }}>🖼️</div>
            <span style={{ fontSize: "13px", color: "var(--muted)" }}>
              Clic para subir imagen
            </span>
          </div>
        )}

        {loading && (
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "rgba(0,0,0,0.55)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <span style={{ fontSize: "13px", color: "#fff" }}>Subiendo…</span>
          </div>
        )}

        {preview && !loading && (
          <div
            style={{
              position: "absolute",
              bottom: "8px",
              right: "8px",
              background: "rgba(0,0,0,0.6)",
              borderRadius: "6px",
              padding: "3px 8px",
              fontSize: "11px",
              color: "#fff",
            }}
          >
            Cambiar
          </div>
        )}
      </div>

      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp,image/gif"
        onChange={handleChange}
        style={{ display: "none" }}
      />

      {error && (
        <span style={{ fontSize: "12px", color: "#ef4444" }}>{error}</span>
      )}
      {!error && (
        <span style={{ fontSize: "12px", color: "var(--muted)" }}>
          JPG, PNG o WebP · máx 5 MB
        </span>
      )}
    </div>
  );
}
