import { useEffect, useState } from "react";
import { saveDocument, deleteDocument } from "../../../lib/db";
import { useData } from "../../../contexts/DataContext";

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

const EMPTY = {
  role: "", company: "", type: "Full-time", location: "",
  period: "", current: false, responsibilities: "", tech: "",
};

const toForm = (e) => ({
  role: e.role ?? "", company: e.company ?? "",
  type: e.type ?? "Full-time", location: e.location ?? "",
  period: e.period ?? "", current: e.current ?? false,
  responsibilities: (e.responsibilities ?? []).join("\n"),
  tech: (e.tech ?? []).join(", "),
});

const fromForm = (f, id) => ({
  id,
  role: f.role, company: f.company, type: f.type, location: f.location,
  period: f.period, current: f.current,
  responsibilities: f.responsibilities.split("\n").map((s) => s.trim()).filter(Boolean),
  tech: f.tech.split(",").map((s) => s.trim()).filter(Boolean),
});

export default function AdminExperience() {
  const { experience: ctxData, refresh } = useData();
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

  const handleSave = async () => {
    setBusy(true);
    try {
      const id = editId ? Number(editId) : Date.now();
      await saveDocument("experience", editId ?? String(id), fromForm(form, id));
      await refresh(); close();
    } finally { setBusy(false); }
  };

  const handleDelete = async (docId) => {
    if (!window.confirm("Delete this experience?")) return;
    await deleteDocument("experience", docId); await refresh();
  };

  return (
    <div style={{ padding: "40px 48px", fontFamily: "Inter, sans-serif" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "32px" }}>
        <div>
          <h1 style={{ fontSize: "22px", fontWeight: 400, color: "rgba(255,255,255,0.88)", margin: 0 }}>Experience</h1>
          <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.35)", marginTop: "4px" }}>{items.length} entries</p>
        </div>
        {!form && (
          <button onClick={openAdd} style={{
            padding: "9px 22px", borderRadius: "10px", fontSize: "13px",
            background: "rgba(74,222,128,0.1)", border: "1px solid rgba(74,222,128,0.25)",
            color: "rgba(74,222,128,0.9)", cursor: "pointer", fontFamily: "Inter, sans-serif",
          }}>+ Add Experience</button>
        )}
      </div>

      {/* FORM */}
      {form && (
        <div style={{
          background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.09)",
          borderRadius: "18px", padding: "32px", marginBottom: "32px",
        }}>
          <div style={{ fontSize: "14px", color: "rgba(255,255,255,0.6)", marginBottom: "24px" }}>
            {editId ? "Edit Experience" : "New Experience"}
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
            <F l="Role / Title"><input style={inp} value={form.role} onChange={set("role")} /></F>
            <F l="Company"><input style={inp} value={form.company} onChange={set("company")} /></F>
            <F l="Type (Full-time / Intern…)"><input style={inp} value={form.type} onChange={set("type")} /></F>
            <F l="Location"><input style={inp} value={form.location} onChange={set("location")} /></F>
            <F l="Period (e.g. 2023 – Present)"><input style={inp} value={form.period} onChange={set("period")} /></F>
            <div style={{ marginBottom: "14px" }}>
              <label style={lbl}>Current Job?</label>
              <label style={{ display: "flex", alignItems: "center", gap: "8px", cursor: "pointer", marginTop: "10px" }}>
                <input type="checkbox" checked={form.current} onChange={set("current")} />
                <span style={{ fontSize: "13px", color: "rgba(255,255,255,0.55)" }}>Mark as current position</span>
              </label>
            </div>
          </div>
          <F l="Tech Stack (comma-separated)">
            <input style={inp} value={form.tech} onChange={set("tech")} placeholder="Java, Spring Boot, SQL…" />
          </F>
          <F l="Responsibilities (one per line)">
            <textarea style={ta} value={form.responsibilities} onChange={set("responsibilities")} rows={6} />
          </F>
          <div style={{ display: "flex", gap: "10px", marginTop: "8px" }}>
            <button onClick={handleSave} disabled={busy} style={{
              padding: "10px 24px", borderRadius: "10px", fontSize: "13px",
              background: "#4ade80", border: "none", color: "#040404",
              cursor: busy ? "not-allowed" : "pointer", opacity: busy ? 0.6 : 1,
              fontFamily: "Inter, sans-serif", fontWeight: 500,
            }}>{busy ? "Saving…" : "Save"}</button>
            <button onClick={close} style={{
              padding: "10px 20px", borderRadius: "10px", fontSize: "13px",
              background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)",
              color: "rgba(255,255,255,0.45)", cursor: "pointer", fontFamily: "Inter, sans-serif",
            }}>Cancel</button>
          </div>
        </div>
      )}

      {/* LIST */}
      <div style={{ border: "1px solid rgba(255,255,255,0.07)", borderRadius: "16px", overflow: "hidden" }}>
        <div style={{
          display: "grid", gridTemplateColumns: "1fr 200px 140px 100px",
          padding: "12px 20px", background: "rgba(255,255,255,0.02)",
          borderBottom: "1px solid rgba(255,255,255,0.07)",
          fontSize: "10px", letterSpacing: "0.14em", textTransform: "uppercase",
          color: "rgba(255,255,255,0.3)",
        }}>
          <span>Role</span><span>Company</span><span>Period</span><span></span>
        </div>
        {items.length === 0 ? (
          <div style={{ padding: "32px 20px", textAlign: "center", fontSize: "13px", color: "rgba(255,255,255,0.2)" }}>
            No experience entries yet.
          </div>
        ) : items.map((item, i) => (
          <div key={item._id ?? item.id ?? i} style={{
            display: "grid", gridTemplateColumns: "1fr 200px 140px 100px",
            padding: "14px 20px", alignItems: "center",
            borderBottom: i < items.length - 1 ? "1px solid rgba(255,255,255,0.05)" : "none",
          }}>
            <div>
              <div style={{ fontSize: "13.5px", color: "rgba(255,255,255,0.8)" }}>{item.role}</div>
              {item.current && (
                <span style={{ fontSize: "10px", color: "rgba(74,222,128,0.7)", letterSpacing: "0.1em" }}>● CURRENT</span>
              )}
            </div>
            <span style={{ fontSize: "12px", color: "rgba(255,255,255,0.4)" }}>{item.company}</span>
            <span style={{ fontSize: "12px", color: "rgba(255,255,255,0.4)" }}>{item.period}</span>
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
