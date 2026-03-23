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

const EMPTY = { name: "", issuer: "", category: "", date: "", credentialId: "", preview: "", url: "", lifetime: false, expiry: "" };

const toForm = (c) => ({
  name: c.name ?? "", issuer: c.issuer ?? "",
  category: c.category ?? "", date: c.date ?? "",
  credentialId: c.credentialId ?? "", preview: c.preview ?? "", url: c.url ?? "",
  lifetime: c.lifetime ?? false, expiry: c.expiry ?? "",
});

const fromForm = (f, id) => ({
  id,
  name: f.name, issuer: f.issuer, category: f.category, date: f.date,
  credentialId: f.credentialId || null, preview: f.preview || null, url: f.url || null,
  lifetime: f.lifetime || false, expiry: f.lifetime ? null : (f.expiry || null),
});

export default function AdminCertificates() {
  const { certificates: ctxData, refresh } = useData();
  const [items, setItems] = useState([]);
  const [form, setForm] = useState(null);
  const [editId, setEditId] = useState(null);
  const [busy, setBusy] = useState(false);

  useEffect(() => { setItems(ctxData ?? []); }, [ctxData]);

  const openAdd = () => { setForm(EMPTY); setEditId(null); };
  const openEdit = (item) => { setForm(toForm(item)); setEditId(item._id); window.scrollTo(0, 0); };
  const close = () => { setForm(null); setEditId(null); };
  const set = (k) => (e) => setForm((prev) => ({ ...prev, [k]: e.target.type === "checkbox" ? e.target.checked : e.target.value }));

  const handleSave = async () => {
    setBusy(true);
    try {
      const id = editId ? Number(editId) : Date.now();
      await saveDocument("certificates", editId ?? String(id), fromForm(form, id));
      await refresh(); close();
    } finally { setBusy(false); }
  };

  const handleDelete = async (docId) => {
    if (!window.confirm("Delete this certificate?")) return;
    await deleteDocument("certificates", docId); await refresh();
  };

  return (
    <div style={{ padding: "40px 48px", fontFamily: "Inter, sans-serif" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "32px" }}>
        <div>
          <h1 style={{ fontSize: "22px", fontWeight: 400, color: "rgba(255,255,255,0.88)", margin: 0 }}>Certificates</h1>
          <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.35)", marginTop: "4px" }}>{items.length} entries</p>
        </div>
        {!form && (
          <button onClick={openAdd} style={{
            padding: "9px 22px", borderRadius: "10px", fontSize: "13px",
            background: "rgba(74,222,128,0.1)", border: "1px solid rgba(74,222,128,0.25)",
            color: "rgba(74,222,128,0.9)", cursor: "pointer", fontFamily: "Inter, sans-serif",
          }}>+ Add Certificate</button>
        )}
      </div>

      {/* FORM */}
      {form && (
        <div style={{
          background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.09)",
          borderRadius: "18px", padding: "32px", marginBottom: "32px",
        }}>
          <div style={{ fontSize: "14px", color: "rgba(255,255,255,0.6)", marginBottom: "24px" }}>
            {editId ? "Edit Certificate" : "New Certificate"}
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
            <F l="Certificate Name"><input style={inp} value={form.name} onChange={set("name")} /></F>
            <F l="Issuer / Platform"><input style={inp} value={form.issuer} onChange={set("issuer")} /></F>
            <F l="Category (e.g. Cloud, Backend)"><input style={inp} value={form.category} onChange={set("category")} /></F>
            <F l="Date (e.g. May 2024)"><input style={inp} value={form.date} onChange={set("date")} /></F>
            <F l="Credential ID (optional)"><input style={inp} value={form.credentialId} onChange={set("credentialId")} /></F>
            <F l="Verify URL (optional)"><input style={inp} value={form.url} onChange={set("url")} placeholder="https://…" /></F>
          </div>
          {/* Validity */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
            <div style={{ marginBottom: "14px" }}>
              <label style={lbl}>Validity</label>
              <label style={{ display: "flex", alignItems: "center", gap: "8px", cursor: "pointer", marginTop: "10px" }}>
                <input type="checkbox" checked={form.lifetime} onChange={set("lifetime")} />
                <span style={{ fontSize: "13px", color: "rgba(255,255,255,0.55)" }}>Lifetime (no expiry)</span>
              </label>
            </div>
            {!form.lifetime && (
              <F l="Expiry / Renewal Date (e.g. May 2027)">
                <input style={inp} value={form.expiry} onChange={set("expiry")} placeholder="e.g. May 2027 or Expires 2026" />
              </F>
            )}
          </div>
          <F l="Preview Image URL (optional)">
            <input style={inp} value={form.preview} onChange={set("preview")} placeholder="/certs/my-cert.png or https://…" />
          </F>
          {form.preview && (
            <div style={{ marginBottom: "14px" }}>
              <img src={form.preview} alt="preview" style={{ height: "120px", borderRadius: "8px", border: "1px solid rgba(255,255,255,0.08)", objectFit: "cover" }} />
            </div>
          )}
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
          display: "grid", gridTemplateColumns: "1fr 160px 120px 120px 100px",
          padding: "12px 20px", background: "rgba(255,255,255,0.02)",
          borderBottom: "1px solid rgba(255,255,255,0.07)",
          fontSize: "10px", letterSpacing: "0.14em", textTransform: "uppercase",
          color: "rgba(255,255,255,0.3)",
        }}>
          <span>Name</span><span>Issuer</span><span>Date</span><span>Validity</span><span></span>
        </div>
        {items.length === 0 ? (
          <div style={{ padding: "32px 20px", textAlign: "center", fontSize: "13px", color: "rgba(255,255,255,0.2)" }}>
            No certificates yet.
          </div>
        ) : items.map((item, i) => (
          <div key={item._id ?? item.id ?? i} style={{
            display: "grid", gridTemplateColumns: "1fr 160px 120px 120px 100px",
            padding: "14px 20px", alignItems: "center",
            borderBottom: i < items.length - 1 ? "1px solid rgba(255,255,255,0.05)" : "none",
          }}>
            <div>
              <div style={{ fontSize: "13.5px", color: "rgba(255,255,255,0.8)" }}>{item.name}</div>
              {item.category && <div style={{ fontSize: "11px", color: "rgba(251,191,36,0.55)", marginTop: "2px" }}>{item.category}</div>}
            </div>
            <span style={{ fontSize: "12px", color: "rgba(255,255,255,0.4)" }}>{item.issuer}</span>
            <span style={{ fontSize: "12px", color: "rgba(255,255,255,0.4)" }}>{item.date}</span>
            <span style={{ fontSize: "11px" }}>
              {item.lifetime
                ? <span style={{ color: "rgba(74,222,128,0.7)", letterSpacing: "0.06em" }}>♾ Lifetime</span>
                : item.expiry
                  ? <span style={{ color: "rgba(255,180,50,0.65)" }}>↻ {item.expiry}</span>
                  : <span style={{ color: "rgba(255,255,255,0.18)" }}>—</span>}
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
