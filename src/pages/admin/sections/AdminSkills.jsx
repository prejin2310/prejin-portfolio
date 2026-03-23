import { useEffect, useState } from "react";
import { saveDocument, deleteDocument } from "../../../lib/db";
import { useData } from "../../../contexts/DataContext";

const inp = {
  width: "100%", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)",
  borderRadius: "8px", padding: "9px 12px", color: "rgba(255,255,255,0.88)",
  fontSize: "13px", outline: "none", fontFamily: "Inter, sans-serif", boxSizing: "border-box",
};
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

const EMPTY = { category: "", items: "" };

const toForm = (s) => ({
  category: s.category ?? "",
  items: (s.items ?? []).join(", "),
});

const fromForm = (f, id) => ({
  id,
  category: f.category,
  items: f.items.split(",").map((s) => s.trim()).filter(Boolean),
});

export default function AdminSkills() {
  const { skills: ctxData, refresh } = useData();
  const [items, setItems] = useState([]);
  const [form, setForm] = useState(null);
  const [editId, setEditId] = useState(null);
  const [busy, setBusy] = useState(false);

  useEffect(() => { setItems(ctxData ?? []); }, [ctxData]);

  const openAdd = () => { setForm(EMPTY); setEditId(null); };
  const openEdit = (item) => { setForm(toForm(item)); setEditId(item._id); window.scrollTo(0, 0); };
  const close = () => { setForm(null); setEditId(null); };
  const set = (k) => (e) => setForm((prev) => ({ ...prev, [k]: e.target.value }));

  const handleSave = async () => {
    setBusy(true);
    try {
      const id = editId ? Number(editId) : Date.now();
      await saveDocument("skills", editId ?? String(id), fromForm(form, id));
      await refresh(); close();
    } finally { setBusy(false); }
  };

  const handleDelete = async (docId) => {
    if (!window.confirm("Delete this skill group?")) return;
    await deleteDocument("skills", docId); await refresh();
  };

  return (
    <div style={{ padding: "40px 48px", fontFamily: "Inter, sans-serif" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "32px" }}>
        <div>
          <h1 style={{ fontSize: "22px", fontWeight: 400, color: "rgba(255,255,255,0.88)", margin: 0 }}>Skills</h1>
          <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.35)", marginTop: "4px" }}>{items.length} groups</p>
        </div>
        {!form && (
          <button onClick={openAdd} style={{
            padding: "9px 22px", borderRadius: "10px", fontSize: "13px",
            background: "rgba(74,222,128,0.1)", border: "1px solid rgba(74,222,128,0.25)",
            color: "rgba(74,222,128,0.9)", cursor: "pointer", fontFamily: "Inter, sans-serif",
          }}>+ Add Group</button>
        )}
      </div>

      {/* FORM */}
      {form && (
        <div style={{
          background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.09)",
          borderRadius: "18px", padding: "32px", marginBottom: "32px", maxWidth: "560px",
        }}>
          <div style={{ fontSize: "14px", color: "rgba(255,255,255,0.6)", marginBottom: "24px" }}>
            {editId ? "Edit Skill Group" : "New Skill Group"}
          </div>
          <F l="Category Name">
            <input style={inp} value={form.category} onChange={set("category")} placeholder="e.g. Backend, Frontend…" />
          </F>
          <F l="Skills (comma-separated)">
            <input style={inp} value={form.items} onChange={set("items")} placeholder="React, TypeScript, CSS…" />
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

      {/* LIST — card layout for skills, showing the tags */}
      <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
        {items.length === 0 ? (
          <div style={{
            border: "1px solid rgba(255,255,255,0.07)", borderRadius: "12px",
            padding: "32px 20px", textAlign: "center", fontSize: "13px", color: "rgba(255,255,255,0.2)",
          }}>No skill groups yet.</div>
        ) : items.map((item, i) => (
          <div key={item._id ?? item.id ?? i} style={{
            background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.07)",
            borderRadius: "14px", padding: "20px 24px",
            display: "flex", alignItems: "center", gap: "20px",
          }}>
            <div style={{ minWidth: "120px" }}>
              <div style={{ fontSize: "11px", letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(255,255,255,0.42)", marginBottom: "4px" }}>
                {item.category}
              </div>
            </div>
            <div style={{ flex: 1, display: "flex", flexWrap: "wrap", gap: "6px" }}>
              {(item.items ?? []).map((sk) => (
                <span key={sk} style={{
                  padding: "4px 11px", borderRadius: "7px", fontSize: "12px",
                  background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)",
                  color: "rgba(255,255,255,0.5)",
                }}>{sk}</span>
              ))}
            </div>
            <div style={{ display: "flex", gap: "6px", flexShrink: 0 }}>
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
