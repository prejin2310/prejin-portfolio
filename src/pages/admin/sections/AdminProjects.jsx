import { useEffect, useState } from "react";
import { saveDocument, deleteDocument } from "../../../lib/db";
import { useData } from "../../../contexts/DataContext";

/* ── shared input styles ── */
const inp = {
  width: "100%", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)",
  borderRadius: "8px", padding: "9px 12px", color: "rgba(255,255,255,0.88)",
  fontSize: "13px", outline: "none", fontFamily: "Inter, sans-serif", boxSizing: "border-box",
};
const ta = { ...inp, resize: "vertical" };
const lbl = {
  display: "block", fontSize: "10px", letterSpacing: "0.14em",
  textTransform: "uppercase", color: "rgba(255,255,255,0.28)", marginBottom: "6px",
};
const F = ({ l, children }) => (
  <div style={{ marginBottom: "14px" }}>
    <label style={lbl}>{l}</label>
    {children}
  </div>
);

/* ── empty form state ── */
const EMPTY = {
  title: "", tagline: "", category: "", year: "", status: "Completed",
  live: false, liveUrl: "", githubUrl: "", preview: "",
  technologies: "", longDescription: "", highlights: "",
  screenshots: "", architecture: [{ layer: "", detail: "" }],
};

function toForm(p) {
  return {
    ...EMPTY,
    title: p.title ?? "",
    tagline: p.tagline ?? "",
    category: p.category ?? "",
    year: String(p.year ?? ""),
    status: p.status ?? "Completed",
    live: p.live ?? false,
    liveUrl: p.liveUrl ?? "",
    githubUrl: p.githubUrl ?? "",
    preview: p.preview ?? "",
    technologies: (p.technologies ?? []).join(", "),
    longDescription: p.longDescription ?? "",
    highlights: (p.highlights ?? []).join("\n"),
    screenshots: (p.screenshots ?? []).join("\n"),
    architecture: p.architecture?.length
      ? p.architecture
      : [{ layer: "", detail: "" }],
  };
}

function fromForm(f, id) {
  return {
    id,
    title: f.title,
    tagline: f.tagline,
    category: f.category,
    year: f.year,
    status: f.status,
    live: f.live,
    liveUrl: f.liveUrl || null,
    githubUrl: f.githubUrl || null,
    preview: f.preview || null,
    technologies: f.technologies.split(",").map((s) => s.trim()).filter(Boolean),
    longDescription: f.longDescription,
    highlights: f.highlights.split("\n").map((s) => s.trim()).filter(Boolean),
    screenshots: f.screenshots.split("\n").map((s) => s.trim()).filter(Boolean),
    architecture: f.architecture.filter((a) => a.layer || a.detail),
  };
}

export default function AdminProjects() {
  const { projects: ctxData, refresh } = useData();
  const [items, setItems] = useState([]);
  const [form, setForm] = useState(null);
  const [editId, setEditId] = useState(null);
  const [busy, setBusy] = useState(false);

  useEffect(() => { setItems(ctxData ?? []); }, [ctxData]);

  const openAdd = () => { setForm(EMPTY); setEditId(null); };
  const openEdit = (item) => { setForm(toForm(item)); setEditId(item._id); window.scrollTo(0, 0); };
  const close = () => { setForm(null); setEditId(null); };

  const set = (k) => (e) =>
    setForm((prev) => ({ ...prev, [k]: e.target.type === "checkbox" ? e.target.checked : e.target.value }));

  const setArch = (i, k) => (e) =>
    setForm((prev) => ({
      ...prev,
      architecture: prev.architecture.map((a, idx) => idx === i ? { ...a, [k]: e.target.value } : a),
    }));
  const addArch = () => setForm((prev) => ({ ...prev, architecture: [...prev.architecture, { layer: "", detail: "" }] }));
  const removeArch = (i) => setForm((prev) => ({ ...prev, architecture: prev.architecture.filter((_, idx) => idx !== i) }));

  const handleSave = async () => {
    setBusy(true);
    try {
      const id = editId ? Number(editId) : Date.now();
      const docId = editId ?? String(id);
      await saveDocument("projects", docId, fromForm(form, id));
      await refresh();
      close();
    } finally {
      setBusy(false);
    }
  };

  const handleDelete = async (docId) => {
    if (!window.confirm("Delete this project?")) return;
    await deleteDocument("projects", docId);
    await refresh();
  };

  return (
    <div style={{ padding: "40px 48px", fontFamily: "Inter, sans-serif" }}>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "32px" }}>
        <div>
          <h1 style={{ fontSize: "22px", fontWeight: 400, color: "rgba(255,255,255,0.88)", margin: 0 }}>Projects</h1>
          <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.35)", marginTop: "4px" }}>{items.length} entries</p>
        </div>
        {!form && (
          <button onClick={openAdd} style={{
            padding: "9px 22px", borderRadius: "10px", fontSize: "13px",
            background: "rgba(74,222,128,0.1)", border: "1px solid rgba(74,222,128,0.25)",
            color: "rgba(74,222,128,0.9)", cursor: "pointer", fontFamily: "Inter, sans-serif",
          }}>
            + Add Project
          </button>
        )}
      </div>

      {/* ── FORM PANEL ── */}
      {form && (
        <div style={{
          background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.09)",
          borderRadius: "18px", padding: "32px", marginBottom: "32px",
        }}>
          <div style={{ fontSize: "14px", color: "rgba(255,255,255,0.6)", marginBottom: "28px", fontWeight: 400 }}>
            {editId ? "Edit Project" : "New Project"}
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
            <F l="Title"><input style={inp} value={form.title} onChange={set("title")} /></F>
            <F l="Category"><input style={inp} value={form.category} onChange={set("category")} /></F>
            <F l="Tagline"><input style={inp} value={form.tagline} onChange={set("tagline")} /></F>
            <F l="Year"><input style={inp} value={form.year} onChange={set("year")} /></F>
            <F l="Status"><input style={inp} value={form.status} onChange={set("status")} /></F>
            <F l="Preview Image URL"><input style={inp} value={form.preview} onChange={set("preview")} /></F>
            <F l="GitHub URL"><input style={inp} value={form.githubUrl} onChange={set("githubUrl")} /></F>
            <div style={{ marginBottom: "14px", display: "flex", flexDirection: "column", gap: "8px" }}>
              <label style={lbl}>Live?</label>
              <label style={{ display: "flex", alignItems: "center", gap: "8px", cursor: "pointer" }}>
                <input type="checkbox" checked={form.live} onChange={set("live")} />
                <span style={{ fontSize: "13px", color: "rgba(255,255,255,0.55)" }}>Is this project live?</span>
              </label>
            </div>
            {form.live && (
              <F l="Live URL"><input style={inp} value={form.liveUrl} onChange={set("liveUrl")} /></F>
            )}
          </div>
          <F l="Technologies (comma-separated)">
            <input style={inp} value={form.technologies} onChange={set("technologies")} placeholder="React, Spring Boot, MySQL…" />
          </F>
          <F l="Long Description">
            <textarea style={ta} value={form.longDescription} onChange={set("longDescription")} rows={4} />
          </F>
          <F l="Key Highlights (one per line)">
            <textarea style={ta} value={form.highlights} onChange={set("highlights")} rows={4} />
          </F>
          <F l="Screenshot URLs (one per line)">
            <textarea style={ta} value={form.screenshots} onChange={set("screenshots")} rows={3} />
          </F>

          {/* Architecture repeater */}
          <div style={{ marginBottom: "14px" }}>
            <label style={lbl}>Architecture Layers</label>
            {form.architecture.map((a, i) => (
              <div key={i} style={{ display: "grid", gridTemplateColumns: "1fr 2fr auto", gap: "8px", marginBottom: "8px" }}>
                <input style={inp} value={a.layer} onChange={setArch(i, "layer")} placeholder="Layer" />
                <input style={inp} value={a.detail} onChange={setArch(i, "detail")} placeholder="Detail description" />
                <button onClick={() => removeArch(i)} style={{
                  padding: "9px 12px", borderRadius: "8px", background: "rgba(239,68,68,0.08)",
                  border: "1px solid rgba(239,68,68,0.15)", color: "rgba(239,68,68,0.7)",
                  cursor: "pointer", fontSize: "12px",
                }}>✕</button>
              </div>
            ))}
            <button onClick={addArch} style={{
              padding: "7px 14px", borderRadius: "8px", background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.4)",
              cursor: "pointer", fontSize: "12px", fontFamily: "Inter, sans-serif",
            }}>+ Add layer</button>
          </div>

          {/* Buttons */}
          <div style={{ display: "flex", gap: "10px", marginTop: "24px" }}>
            <button onClick={handleSave} disabled={busy} style={{
              padding: "10px 24px", borderRadius: "10px", fontSize: "13px",
              background: "#4ade80", border: "none", color: "#040404",
              cursor: busy ? "not-allowed" : "pointer", opacity: busy ? 0.6 : 1,
              fontFamily: "Inter, sans-serif", fontWeight: 500,
            }}>
              {busy ? "Saving…" : "Save"}
            </button>
            <button onClick={close} style={{
              padding: "10px 20px", borderRadius: "10px", fontSize: "13px",
              background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)",
              color: "rgba(255,255,255,0.45)", cursor: "pointer", fontFamily: "Inter, sans-serif",
            }}>Cancel</button>
          </div>
        </div>
      )}

      {/* ── LIST ── */}
      <div style={{ border: "1px solid rgba(255,255,255,0.07)", borderRadius: "16px", overflow: "hidden" }}>
        {/* Table header */}
        <div style={{
          display: "grid", gridTemplateColumns: "1fr 130px 80px 90px 100px",
          padding: "12px 20px", background: "rgba(255,255,255,0.02)",
          borderBottom: "1px solid rgba(255,255,255,0.07)",
          fontSize: "10px", letterSpacing: "0.14em", textTransform: "uppercase",
          color: "rgba(255,255,255,0.3)",
        }}>
          <span>Title</span><span>Category</span><span>Year</span><span>Status</span><span></span>
        </div>
        {items.length === 0 ? (
          <div style={{ padding: "32px 20px", textAlign: "center", fontSize: "13px", color: "rgba(255,255,255,0.2)" }}>
            No projects yet. Seed data or add one manually.
          </div>
        ) : items.map((item, i) => (
          <div key={item._id ?? item.id ?? i} style={{
            display: "grid", gridTemplateColumns: "1fr 130px 80px 90px 100px",
            padding: "14px 20px", alignItems: "center",
            borderBottom: i < items.length - 1 ? "1px solid rgba(255,255,255,0.05)" : "none",
          }}>
            <div>
              <div style={{ fontSize: "13.5px", color: "rgba(255,255,255,0.8)" }}>{item.title}</div>
              <div style={{ fontSize: "11.5px", color: "rgba(255,255,255,0.28)", marginTop: "2px" }}>{item.tagline?.slice(0, 60)}…</div>
            </div>
            <span style={{ fontSize: "12px", color: "rgba(255,255,255,0.4)" }}>{item.category}</span>
            <span style={{ fontSize: "12px", color: "rgba(255,255,255,0.4)" }}>{item.year}</span>
            <span style={{ fontSize: "12px", color: item.live ? "rgba(74,222,128,0.7)" : "rgba(255,255,255,0.3)" }}>
              {item.live ? "Live" : item.status}
            </span>
            <div style={{ display: "flex", gap: "6px", justifyContent: "flex-end" }}>
              <button onClick={() => openEdit(item)} style={{
                padding: "5px 12px", borderRadius: "7px", fontSize: "11.5px",
                background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)",
                color: "rgba(255,255,255,0.5)", cursor: "pointer",
              }}>Edit</button>
              <button onClick={() => handleDelete(item._id)} style={{
                padding: "5px 10px", borderRadius: "7px", fontSize: "11.5px",
                background: "rgba(239,68,68,0.06)", border: "1px solid rgba(239,68,68,0.12)",
                color: "rgba(239,68,68,0.6)", cursor: "pointer",
              }}>✕</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
