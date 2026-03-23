import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAll, getDocument, seedCollection, seedProfile } from "../../../lib/db";
import { projects as SP } from "../../../data/projectsData";
import { certificates as SC } from "../../../data/certificatesData";
import { experience as SE } from "../../../data/experienceData";
import { skills as SS } from "../../../data/skillsData";
import { profile as SPR } from "../../../data/profileData";

const S = {
  page: { padding: "40px 48px", fontFamily: "Inter, sans-serif" },
  heading: { fontSize: "22px", fontWeight: 400, color: "rgba(255,255,255,0.88)", marginBottom: "6px" },
  sub: { fontSize: "13px", color: "rgba(255,255,255,0.35)", marginBottom: "40px" },
  grid: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: "14px", marginBottom: "40px" },
  card: { background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "16px", padding: "24px", cursor: "pointer", transition: "background 0.15s, border-color 0.15s" },
  count: { fontSize: "32px", fontWeight: 300, color: "rgba(255,255,255,0.88)", letterSpacing: "-0.02em", marginBottom: "6px" },
  label: { fontSize: "11px", letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(255,255,255,0.28)" },
};

const sections = [
  { key: "projects", label: "Projects", to: "projects" },
  { key: "certificates", label: "Certificates", to: "certificates" },
  { key: "experience", label: "Experience", to: "experience" },
  { key: "skills", label: "Skill Groups", to: "skills" },
];

export default function AdminOverview() {
  const navigate = useNavigate();
  const [counts, setCounts] = useState({ projects: 0, certificates: 0, experience: 0, skills: 0 });
  const [seeding, setSeeding] = useState(false);
  const [seedMsg, setSeedMsg] = useState("");

  useEffect(() => {
    async function load() {
      const [p, c, e, s] = await Promise.all([
        getAll("projects"), getAll("certificates"), getAll("experience"), getAll("skills"),
      ]);
      setCounts({ projects: p.length, certificates: c.length, experience: e.length, skills: s.length });
    }
    load();
  }, []);

  const handleSeed = async () => {
    if (!window.confirm("This will overwrite all Firestore data with static defaults. Continue?")) return;
    setSeeding(true);
    setSeedMsg("");
    try {
      const skillsWithId = SS.map((s, i) => ({ ...s, id: i + 1 }));
      await Promise.all([
        seedCollection("projects", SP),
        seedCollection("certificates", SC),
        seedCollection("experience", SE),
        seedCollection("skills", skillsWithId),
        seedProfile(SPR),
      ]);
      setSeedMsg("✓ Seeded successfully! Firestore is now populated with default data.");
      const [p, c, e, s] = await Promise.all([getAll("projects"), getAll("certificates"), getAll("experience"), getAll("skills")]);
      setCounts({ projects: p.length, certificates: c.length, experience: e.length, skills: s.length });
    } catch (err) {
      setSeedMsg("✗ Error: " + err.message);
    } finally {
      setSeeding(false);
    }
  };

  return (
    <div style={S.page}>
      <h1 style={S.heading}>Overview</h1>
      <p style={S.sub}>Manage all portfolio content from here.</p>

      {/* Stats grid */}
      <div style={S.grid}>
        {sections.map((sec) => (
          <div
            key={sec.key}
            style={S.card}
            onClick={() => navigate(`/admin/${sec.to}`)}
            onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.055)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.15)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.03)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)"; }}
          >
            <div style={S.count}>{counts[sec.key]}</div>
            <div style={S.label}>{sec.label}</div>
          </div>
        ))}
        {/* Profile card */}
        <div
          style={S.card}
          onClick={() => navigate("/admin/profile")}
          onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.055)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.15)"; }}
          onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.03)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)"; }}
        >
          <div style={S.count}>1</div>
          <div style={S.label}>Profile Doc</div>
        </div>
      </div>

      {/* Divider */}
      <div style={{ borderTop: "1px solid rgba(255,255,255,0.07)", paddingTop: "32px" }}>
        <div style={{ fontSize: "13px", color: "rgba(255,255,255,0.45)", marginBottom: "14px" }}>
          First time setup — seed Firestore with your static default data:
        </div>
        <button
          onClick={handleSeed}
          disabled={seeding}
          style={{
            padding: "10px 22px", borderRadius: "10px", fontSize: "13px",
            background: seeding ? "rgba(255,255,255,0.05)" : "rgba(74,222,128,0.08)",
            border: "1px solid rgba(74,222,128,0.2)",
            color: "rgba(74,222,128,0.85)", cursor: seeding ? "not-allowed" : "pointer",
            fontFamily: "Inter, sans-serif",
          }}
        >
          {seeding ? "Seeding…" : "Seed default data → Firestore"}
        </button>
        {seedMsg && (
          <div style={{
            marginTop: "14px", padding: "10px 14px", borderRadius: "9px", fontSize: "12.5px",
            background: seedMsg.startsWith("✓") ? "rgba(74,222,128,0.06)" : "rgba(239,68,68,0.06)",
            border: `1px solid ${seedMsg.startsWith("✓") ? "rgba(74,222,128,0.18)" : "rgba(239,68,68,0.18)"}`,
            color: seedMsg.startsWith("✓") ? "rgba(74,222,128,0.8)" : "rgba(239,68,68,0.8)",
          }}>{seedMsg}</div>
        )}
      </div>
    </div>
  );
}
