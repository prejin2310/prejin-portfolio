import { useEffect, useState } from "react";
import { getDocument, saveDocument } from "../../../lib/db";
import { profile as staticProfile } from "../../../data/profileData";
import { useData } from "../../../contexts/DataContext";

const input = {
  width: "100%", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)",
  borderRadius: "8px", padding: "10px 13px", color: "rgba(255,255,255,0.88)",
  fontSize: "13px", outline: "none", fontFamily: "Inter, sans-serif", boxSizing: "border-box",
};
const textarea = { ...input, resize: "vertical", minHeight: "90px" };
const label = {
  display: "block", fontSize: "10.5px", letterSpacing: "0.14em",
  textTransform: "uppercase", color: "rgba(255,255,255,0.3)", marginBottom: "7px",
};
const section = { marginBottom: "32px" };
const sectionTitle = {
  fontSize: "11px", letterSpacing: "0.2em", textTransform: "uppercase",
  color: "rgba(255,255,255,0.2)", marginBottom: "16px", paddingTop: "8px",
  borderTop: "1px solid rgba(255,255,255,0.06)",
};
const checkRow = {
  display: "flex",
  alignItems: "center",
  gap: "10px",
  minHeight: "42px",
  padding: "0 12px",
  background: "rgba(255,255,255,0.03)",
  border: "1px solid rgba(255,255,255,0.08)",
  borderRadius: "8px",
  color: "rgba(255,255,255,0.72)",
  fontSize: "13px",
};

const F = ({ lbl, children }) => (
  <div style={{ marginBottom: "16px" }}>
    <label style={label}>{lbl}</label>
    {children}
  </div>
);

function toForm(p) {
  return {
    name: p.name ?? "",
    title: p.title ?? "",
    subtitle: p.subtitle ?? "",
    summary: p.summary ?? "",
    careerFocus: p.careerFocus ?? "",
    strengths: (p.strengths ?? []).join("\n"),
    location: p.contact?.location ?? "",
    email: p.contact?.email ?? "",
    linkedin: p.contact?.linkedin ?? "",
    linkedinUrl: p.contact?.linkedinUrl ?? "",
    linkedinVisible: p.contact?.linkedinVisible ?? true,
    github: p.contact?.github ?? "",
    githubUrl: p.contact?.githubUrl ?? "",
    githubVisible: p.contact?.githubVisible ?? true,
    instagram: p.contact?.instagram ?? "",
    instagramUrl: p.contact?.instagramUrl ?? "",
    instagramVisible: p.contact?.instagramVisible ?? false,
    contactVisible: p.contact?.contactVisible ?? true,
  };
}

function fromForm(f) {
  return {
    name: f.name,
    title: f.title,
    subtitle: f.subtitle,
    summary: f.summary,
    careerFocus: f.careerFocus,
    strengths: f.strengths.split("\n").map((s) => s.trim()).filter(Boolean),
    contact: {
      location: f.location,
      email: f.email,
      linkedin: f.linkedin,
      linkedinUrl: f.linkedinUrl,
      linkedinVisible: f.linkedinVisible,
      github: f.github,
      githubUrl: f.githubUrl,
      githubVisible: f.githubVisible,
      instagram: f.instagram,
      instagramUrl: f.instagramUrl,
      instagramVisible: f.instagramVisible,
      contactVisible: f.contactVisible,
    },
  };
}

export default function AdminProfile() {
  const { refresh } = useData();
  const [form, setForm] = useState(toForm(staticProfile));
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    getDocument("settings", "profile").then((doc) => {
      if (doc) setForm(toForm(doc));
    });
  }, []);

  const set = (k) => (e) => setForm((prev) => ({ ...prev, [k]: e.target.value }));
  const setBool = (k) => (e) => setForm((prev) => ({ ...prev, [k]: e.target.checked }));

  const handleSave = async () => {
    setBusy(true);
    setMsg("");
    try {
      await saveDocument("settings", "profile", fromForm(form));
      await refresh();
      setMsg("Saved successfully.");
    } catch (err) {
      setMsg(`Error: ${err.message}`);
    } finally {
      setBusy(false);
    }
  };

  const ok = !msg.startsWith("Error:");

  return (
    <div style={{ padding: "40px 48px", fontFamily: "Inter, sans-serif", maxWidth: "780px" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "32px" }}>
        <div>
          <h1 style={{ fontSize: "22px", fontWeight: 400, color: "rgba(255,255,255,0.88)", margin: 0 }}>Profile</h1>
          <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.35)", marginTop: "4px" }}>Edit your personal information</p>
        </div>
        <button
          onClick={handleSave}
          disabled={busy}
          style={{
            padding: "10px 24px", borderRadius: "10px", fontSize: "13px",
            background: "#4ade80", border: "none", color: "#040404",
            cursor: busy ? "not-allowed" : "pointer", opacity: busy ? 0.6 : 1,
            fontFamily: "Inter, sans-serif", fontWeight: 500,
          }}
        >
          {busy ? "Saving..." : "Save changes"}
        </button>
      </div>

      {msg && (
        <div style={{
          marginBottom: "24px", padding: "10px 14px", borderRadius: "9px", fontSize: "12.5px",
          background: ok ? "rgba(74,222,128,0.06)" : "rgba(239,68,68,0.06)",
          border: `1px solid ${ok ? "rgba(74,222,128,0.18)" : "rgba(239,68,68,0.18)"}`,
          color: ok ? "rgba(74,222,128,0.8)" : "rgba(239,68,68,0.8)",
        }}>{msg}</div>
      )}

      <div style={section}>
        <div style={sectionTitle}>Basic Info</div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
          <F lbl="Full Name"><input style={input} value={form.name} onChange={set("name")} /></F>
          <F lbl="Title"><input style={input} value={form.title} onChange={set("title")} /></F>
        </div>
        <F lbl="Subtitle"><input style={input} value={form.subtitle} onChange={set("subtitle")} /></F>
      </div>

      <div style={section}>
        <div style={sectionTitle}>Bio</div>
        <F lbl="Summary"><textarea style={textarea} value={form.summary} onChange={set("summary")} rows={5} /></F>
        <F lbl="Career Focus"><textarea style={textarea} value={form.careerFocus} onChange={set("careerFocus")} rows={3} /></F>
        <F lbl="Strengths (one per line)"><textarea style={textarea} value={form.strengths} onChange={set("strengths")} rows={5} /></F>
      </div>

      <div style={section}>
        <div style={sectionTitle}>Contact</div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
          <F lbl="Location"><input style={input} value={form.location} onChange={set("location")} /></F>
          <F lbl="Email"><input style={input} type="email" value={form.email} onChange={set("email")} /></F>

          <F lbl="LinkedIn Display"><input style={input} value={form.linkedin} onChange={set("linkedin")} /></F>
          <F lbl="LinkedIn URL"><input style={input} value={form.linkedinUrl} onChange={set("linkedinUrl")} /></F>
          <F lbl="Show LinkedIn">
            <label style={checkRow}>
              <input type="checkbox" checked={form.linkedinVisible} onChange={setBool("linkedinVisible")} />
              Visible in hero
            </label>
          </F>

          <F lbl="GitHub Display"><input style={input} value={form.github} onChange={set("github")} /></F>
          <F lbl="GitHub URL"><input style={input} value={form.githubUrl} onChange={set("githubUrl")} /></F>
          <F lbl="Show GitHub">
            <label style={checkRow}>
              <input type="checkbox" checked={form.githubVisible} onChange={setBool("githubVisible")} />
              Visible in hero
            </label>
          </F>

          <F lbl="Instagram Display"><input style={input} value={form.instagram} onChange={set("instagram")} /></F>
          <F lbl="Instagram URL"><input style={input} value={form.instagramUrl} onChange={set("instagramUrl")} /></F>
          <F lbl="Show Instagram">
            <label style={checkRow}>
              <input type="checkbox" checked={form.instagramVisible} onChange={setBool("instagramVisible")} />
              Visible in hero
            </label>
          </F>

          <F lbl="Show Contact Link">
            <label style={checkRow}>
              <input type="checkbox" checked={form.contactVisible} onChange={setBool("contactVisible")} />
              Visible in hero
            </label>
          </F>
        </div>
      </div>
    </div>
  );
}
