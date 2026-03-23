import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import Hero from "../components/Hero";
import SectionTitle from "../components/SectionTitle";
import { useData } from "../contexts/DataContext";

const ease = [0.16, 1, 0.3, 1];
const fw = (i) => ({
  initial: { opacity: 0, y: 18 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.6, delay: i * 0.08, ease },
});
const SEC = { position: "relative", zIndex: 10, padding: "96px 1.5rem 80px" };
const BG = {
  projects:   "radial-gradient(ellipse 170% 90% at 50% 0%, rgba(245,158,11,0.11) 0%, rgba(245,158,11,0.04) 45%, transparent 72%)",
  about:      "radial-gradient(ellipse 170% 90% at 50% 0%, rgba(99,102,241,0.12) 0%, rgba(99,102,241,0.04) 45%, transparent 72%)",
  experience: "radial-gradient(ellipse 170% 90% at 50% 0%, rgba(168,85,247,0.12) 0%, rgba(168,85,247,0.04) 45%, transparent 72%)",
  skills:        "radial-gradient(ellipse 170% 90% at 50% 0%, rgba(20,184,166,0.11) 0%, rgba(20,184,166,0.04) 45%, transparent 72%)",
  certificates:  "radial-gradient(ellipse 170% 90% at 50% 0%, rgba(251,191,36,0.10) 0%, rgba(251,191,36,0.03) 45%, transparent 72%)",
  contact:       "radial-gradient(ellipse 170% 90% at 50% 0%, rgba(74,222,128,0.10) 0%, rgba(74,222,128,0.03) 45%, transparent 72%)",
};

export default function Home() {
  const { projects, certificates, experience, skills, profile } = useData();
  const [activeCat, setActiveCat] = useState("All");
  const [visibleProjects, setVisibleProjects] = useState(4);
  const navigate = useNavigate();
  const categories = ["All", ...new Set((projects ?? []).map((p) => p.category))];
  const filtered = activeCat === "All" ? (projects ?? []) : (projects ?? []).filter((p) => p.category === activeCat);
  const visibleFiltered = filtered.slice(0, visibleProjects);
  const contactItems = [
    { label: "LinkedIn", value: profile?.contact?.linkedin, href: profile?.contact?.linkedinUrl },
    { label: "Instagram", value: profile?.contact?.instagram, href: profile?.contact?.instagramUrl },
    { label: "GitHub", value: profile?.contact?.github, href: profile?.contact?.githubUrl },
    { label: "Location", value: profile?.contact?.location, href: null },
  ].filter((item) => item.value);

  useEffect(() => {
    setVisibleProjects(4);
  }, [activeCat]);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.35 }}>

      {/* ── HERO ── */}
      <section id="hero"><Hero /></section>

      {/* ── PROJECTS ── */}
      <section id="projects" style={{ ...SEC, background: BG.projects }}>
        <div className="inner">
          <SectionTitle number="01" eyebrow="Projects" title="Things I've" titleLight="created" />

          {/* Filter pills */}
          <div style={{ display: "flex", gap: "6px", marginBottom: "32px", marginTop: "-20px", flexWrap: "wrap" }}>
            {categories.map((cat) => (
              <button key={cat} onClick={() => setActiveCat(cat)} style={{
                padding: "6px 16px", borderRadius: "999px", fontSize: "12px", cursor: "pointer",
                background: activeCat === cat ? "rgba(255,255,255,0.1)" : "rgba(255,255,255,0.03)",
                border: activeCat === cat ? "1px solid rgba(255,255,255,0.22)" : "1px solid rgba(255,255,255,0.07)",
                color: activeCat === cat ? "rgba(255,255,255,0.92)" : "rgba(255,255,255,0.38)",
                transition: "all 0.15s", letterSpacing: "0.04em",
              }}>{cat}</button>
            ))}
          </div>

          {/* Project cards */}
          <AnimatePresence mode="wait">
            <motion.div key={activeCat} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="project-grid"
            >
              {visibleFiltered.map((p, i) => (
                <motion.div
                  key={p.id} {...fw(i)}
                  onClick={() => navigate(`/project/${p.id}`)}
                  className="project-card-unique"
                >
                  <div className="project-card-body">
                    <div
                      className="project-card-preview"
                      style={{
                        background: p.preview
                          ? `linear-gradient(180deg, rgba(5,6,10,0.2), rgba(5,6,10,0.42)), url(${p.preview}) center/cover`
                          : "linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.015) 100%)",
                      }}
                    >
                      {!p.preview && <span className="project-card-empty">Preview</span>}
                    </div>
                    <div className="project-card-head">
                      <span className="project-card-cat">{p.category || "Project"}</span>
                      <span className={`project-card-status ${p.live ? "is-live" : ""}`}>
                        {p.live ? "Live" : "Offline"}
                      </span>
                    </div>
                    <h3 className="project-card-simple-title">{p.title}</h3>
                    <p className="project-card-desc">{p.description || p.tagline}</p>
                    <div className="project-card-tech">
                      {p.technologies.slice(0, 3).map((t) => (
                        <span key={t} className="project-chip">{t}</span>
                      ))}
                      {p.technologies.length > 3 && <span className="project-chip">+{p.technologies.length - 3}</span>}
                    </div>
                    <div className="project-card-footer">
                      <span className="project-card-link">
                        View details
                        <svg width="11" height="11" viewBox="0 0 10 10" fill="none"><path d="M2 8L8 2M4 2h4v4" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round"/></svg>
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>

          {filtered.length > visibleProjects && (
            <div style={{ display: "flex", justifyContent: "center", marginBottom: "48px" }}>
              <button
                type="button"
                onClick={() => setVisibleProjects((prev) => prev + 4)}
                style={{
                  minHeight: "44px",
                  padding: "0 18px",
                  borderRadius: "999px",
                  border: "1px solid rgba(255,255,255,0.12)",
                  background: "rgba(255,255,255,0.035)",
                  color: "rgba(255,255,255,0.78)",
                  fontSize: "12px",
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  cursor: "pointer",
                }}
              >
                Show More
              </button>
            </div>
          )}

          <style>{`
            .project-grid {
              display: grid;
              grid-template-columns: repeat(4, minmax(0, 1fr));
              gap: 18px;
              margin-bottom: 28px;
            }
            .project-card-unique {
              position: relative;
              display: flex;
              flex-direction: column;
              min-height: 100%;
              border: 1px solid rgba(255,255,255,0.08);
              border-radius: 12px;
              background: rgba(10,12,18,0.62);
              overflow: hidden;
              cursor: pointer;
              transition: transform 0.2s ease, border-color 0.2s ease, background 0.2s ease;
            }
            .project-card-unique:hover {
              transform: translateY(-3px);
              border-color: rgba(255,255,255,0.2);
              background: rgba(12,14,20,0.82);
            }
            .project-card-preview {
              position: relative;
              display: flex;
              align-items: center;
              justify-content: center;
              aspect-ratio: 16 / 8;
              margin: 0;
              overflow: hidden;
              background: rgba(255,255,255,0.02);
              border-bottom: 1px solid rgba(255,255,255,0.09);
            }
            .project-card-empty {
              position: relative;
              z-index: 1;
              font-size: 10px;
              letter-spacing: 0.2em;
              text-transform: uppercase;
              color: rgba(255,255,255,0.28);
            }
            .project-card-head {
              display: flex;
              align-items: center;
              justify-content: space-between;
              gap: 10px;
              margin-bottom: 10px;
            }
            .project-card-cat {
              font-size: 10px;
              letter-spacing: 0.16em;
              text-transform: uppercase;
              color: rgba(255,255,255,0.42);
            }
            .project-card-status {
              display: inline-flex;
              align-items: center;
              flex-shrink: 0;
              color: rgba(255,255,255,0.55);
              font-size: 10.5px;
              letter-spacing: 0.08em;
              text-transform: uppercase;
            }
            .project-card-status.is-live {
              color: rgba(74,222,128,0.9);
            }
            .project-card-body {
              display: flex;
              flex: 1;
              flex-direction: column;
              padding: 14px 14px 15px;
            }
            .project-card-simple-title {
              margin: 0 0 8px;
              font-family: 'NType82','Inter',sans-serif;
              font-size: 16px;
              font-weight: 400;
              line-height: 1.3;
              letter-spacing: 0.015em;
              color: rgba(255,255,255,0.92);
            }
            .project-card-desc {
              margin: 0 0 12px;
              color: rgba(255,255,255,0.5);
              font-size: 12.5px;
              line-height: 1.6;
              display: -webkit-box;
              -webkit-line-clamp: 2;
              -webkit-box-orient: vertical;
              overflow: hidden;
            }
            .project-card-tech {
              display: flex;
              flex-wrap: wrap;
              gap: 6px;
              margin-bottom: 12px;
            }
            .project-chip {
              display: inline-flex;
              align-items: center;
              padding: 4px 8px;
              border-radius: 6px;
              background: rgba(255,255,255,0.03);
              border: 1px solid rgba(255,255,255,0.1);
              font-size: 10px;
              color: rgba(255,255,255,0.56);
              letter-spacing: 0.03em;
            }
            .project-card-footer {
              margin-top: auto;
              display: flex;
              align-items: center;
              justify-content: flex-start;
            }
            .project-card-link {
              font-size: 11px;
              letter-spacing: 0.12em;
              text-transform: uppercase;
              color: rgba(255,255,255,0.66);
              display: inline-flex;
              align-items: center;
              gap: 6px;
            }
            @media (max-width: 1100px) {
              .project-grid {
                grid-template-columns: repeat(2, minmax(0, 1fr));
              }
            }
            @media (max-width: 640px) {
              .project-grid {
                grid-template-columns: 1fr;
                gap: 14px;
              }
              .project-card-unique {
                min-height: auto;
              }
              .project-card-preview {
                margin: 0;
              }
              .project-card-body {
                padding: 13px;
              }
              .project-card-simple-title {
                font-size: 14px;
              }
              .project-card-desc {
                font-size: 12px;
              }
              .project-card-footer {
                margin-top: 0;
              }
            }
          `}</style>
        </div>
      </section>

      {/* ── ABOUT ── */}
      <section id="about" style={{ ...SEC, background: BG.about }}>
        <div className="inner">
          <SectionTitle number="02" eyebrow="About" title="Crafting reliable" titleLight="software" />
          <div style={{ display: "grid", gap: "16px", marginBottom: "16px" }} className="grid-cols-1 lg:grid-cols-[1fr_264px]">
            <motion.div {...fw(0)} style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "18px", padding: "32px 36px" }}>
              <div style={{ fontSize: "10px", letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(255,255,255,0.22)", marginBottom: "16px" }}>Professional Summary</div>
              <p style={{ fontSize: "15px", fontWeight: 300, color: "rgba(255,255,255,0.5)", lineHeight: 1.85 }}>{profile.summary}</p>
            </motion.div>
            <motion.div {...fw(1)} style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "18px", padding: "24px" }}>
              {[
                { label: "Location", value: profile.contact.location },
                { label: "Role", value: profile.title },
                { label: "Experience", value: "2+ Years" },
                { label: "Status", value: "Open to work", green: true },
              ].map((item, i) => (
                <div key={item.label} style={{ paddingBottom: i < 3 ? "16px" : 0, marginBottom: i < 3 ? "16px" : 0, borderBottom: i < 3 ? "1px solid rgba(255,255,255,0.06)" : "none" }}>
                  <div style={{ fontSize: "9.5px", letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(255,255,255,0.2)", marginBottom: "5px" }}>{item.label}</div>
                  <div style={{ fontSize: "13.5px", color: item.green ? "rgba(74,222,128,0.85)" : "rgba(255,255,255,0.65)" }}>
                    {item.green ? <span style={{ display: "flex", alignItems: "center", gap: "6px" }}><span className="pulse" style={{ width: "5px", height: "5px", borderRadius: "50%", background: "#4ade80", display: "inline-block" }} />{item.value}</span> : item.value}
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
          <motion.div {...fw(2)} style={{ background: "linear-gradient(135deg,rgba(255,255,255,0.04),rgba(255,255,255,0.02))", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "18px", padding: "28px 36px", marginBottom: "16px" }}>
            <div style={{ fontSize: "9.5px", letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(255,255,255,0.22)", marginBottom: "12px" }}>Career Focus</div>
            <p style={{ fontSize: "15px", fontWeight: 300, color: "rgba(255,255,255,0.5)", lineHeight: 1.78 }}>{profile.careerFocus}</p>
          </motion.div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(240px,1fr))", gap: "10px", marginBottom: "40px" }}>
            {profile.strengths.map((s, i) => (
              <motion.div key={i} {...fw(i)} style={{ background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: "12px", padding: "14px 18px", display: "flex", alignItems: "flex-start", gap: "12px" }}>
                <div style={{ width: "5px", height: "5px", borderRadius: "50%", background: "rgba(255,255,255,0.22)", flexShrink: 0, marginTop: "5px" }} />
                <span style={{ fontSize: "13px", color: "rgba(255,255,255,0.5)", lineHeight: 1.5 }}>{s}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── EXPERIENCE ── */}
      <section id="experience" style={{ ...SEC, background: BG.experience }}>
        <div className="inner">
          <SectionTitle number="03" eyebrow="Work Experience" title="Where I've" titleLight="worked" />

          {/* Timeline container */}
          <div style={{ position: "relative", paddingLeft: "28px" }}>

            {/* Continuous vertical line */}
            <div style={{
              position: "absolute", left: "7px", top: "8px",
              width: "1px",
              bottom: "8px",
              background: "linear-gradient(to bottom, rgba(74,222,128,0.35), rgba(255,255,255,0.07) 60%, transparent)",
            }} />

            {experience.map((exp, i) => (
              <motion.div key={exp.id ?? i} {...fw(i)} style={{ position: "relative", marginBottom: i < experience.length - 1 ? "52px" : "0" }}>

                {/* Timeline dot */}
                <div style={{ position: "absolute", left: "-28px", top: "6px" }}>
                  {exp.current ? (
                    /* Pulsing green dot for present */
                    <span style={{ position: "relative", display: "flex", alignItems: "center", justifyContent: "center", width: "16px", height: "16px" }}>
                      <span className="exp-ring" style={{
                        position: "absolute", width: "16px", height: "16px", borderRadius: "50%",
                        background: "rgba(74,222,128,0.15)", border: "1px solid rgba(74,222,128,0.3)",
                      }} />
                      <span style={{
                        width: "8px", height: "8px", borderRadius: "50%",
                        background: "#4ade80",
                        boxShadow: "0 0 6px rgba(74,222,128,0.8)",
                        display: "block",
                      }} />
                    </span>
                  ) : (
                    /* Static muted dot for past */
                    <span style={{
                      display: "block", width: "9px", height: "9px", borderRadius: "50%",
                      background: "rgba(255,255,255,0.12)",
                      border: "1px solid rgba(255,255,255,0.22)",
                      marginLeft: "3.5px", marginTop: "3.5px",
                    }} />
                  )}
                </div>

                {/* Content */}
                <div>
                  {/* Top row: role + present badge */}
                  <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", flexWrap: "wrap", gap: "10px", marginBottom: "5px" }}>
                    <h3 style={{
                      fontFamily: "'NType82','Inter',sans-serif",
                      fontSize: "clamp(17px,2.2vw,22px)", fontWeight: 400,
                      letterSpacing: "-0.01em", color: "rgba(255,255,255,0.9)",
                      lineHeight: 1.2, margin: 0,
                    }}>{exp.role}</h3>
                    {exp.current && (
                      <span style={{
                        display: "inline-flex", alignItems: "center", gap: "6px",
                        padding: "4px 12px", borderRadius: "999px", fontSize: "10.5px",
                        background: "rgba(74,222,128,0.08)", border: "1px solid rgba(74,222,128,0.22)",
                        color: "rgba(74,222,128,0.9)", whiteSpace: "nowrap", flexShrink: 0,
                      }}>
                        <span className="pulse" style={{ width: "5px", height: "5px", borderRadius: "50%", background: "#4ade80", display: "inline-block" }} />
                        Present
                      </span>
                    )}
                  </div>

                  {/* Company · type · period · location */}
                  <div style={{ display: "flex", alignItems: "center", flexWrap: "wrap", gap: "8px", marginBottom: "18px" }}>
                    <span style={{ fontSize: "14px", color: "rgba(255,255,255,0.55)", fontWeight: 400 }}>{exp.company}</span>
                    {exp.type && <>
                      <span style={{ fontSize: "12px", color: "rgba(255,255,255,0.2)" }}>·</span>
                      <span style={{ fontSize: "12px", color: "rgba(255,255,255,0.32)", letterSpacing: "0.02em" }}>{exp.type}</span>
                    </>}
                    <span style={{ fontSize: "12px", color: "rgba(255,255,255,0.2)" }}>·</span>
                    <span style={{ fontSize: "12px", color: "rgba(255,255,255,0.3)", letterSpacing: "0.04em" }}>{exp.period}</span>
                    {exp.location && <>
                      <span style={{ fontSize: "12px", color: "rgba(255,255,255,0.2)" }}>·</span>
                      <span style={{ fontSize: "12px", color: "rgba(255,255,255,0.28)" }}>{exp.location}</span>
                    </>}
                  </div>

                  {/* Responsibilities */}
                  {(exp.responsibilities ?? []).length > 0 && (
                    <div style={{ display: "flex", flexDirection: "column", gap: "9px", marginBottom: exp.tech?.length ? "18px" : "0" }}>
                      {(exp.responsibilities ?? []).map((r, j) => (
                        <div key={j} style={{ display: "flex", gap: "10px", alignItems: "flex-start" }}>
                          <span style={{
                            width: "4px", height: "4px", borderRadius: "50%", flexShrink: 0, marginTop: "9px",
                            background: "rgba(255,255,255,0.2)", display: "block",
                          }} />
                          <p style={{ margin: 0, fontSize: "13.5px", fontWeight: 300, color: "rgba(255,255,255,0.45)", lineHeight: 1.75 }}>{r}</p>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Tech tags */}
                  {exp.tech?.length > 0 && (
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                      {exp.tech.map((t) => (
                        <span key={t} style={{
                          padding: "3px 11px", borderRadius: "7px", fontSize: "11px",
                          background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)",
                          color: "rgba(255,255,255,0.38)", letterSpacing: "0.03em",
                        }}>{t}</span>
                      ))}
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <style>{`
          @keyframes exp-ring-pulse {
            0%   { transform: scale(1);   opacity: 0.7; }
            70%  { transform: scale(2.2); opacity: 0; }
            100% { transform: scale(2.2); opacity: 0; }
          }
          .exp-ring { animation: exp-ring-pulse 2s ease-out infinite; }
        `}</style>
      </section>

      {/* ── SKILLS ── */}
      <section id="skills" style={{ ...SEC, background: BG.skills }}>
        <div className="inner">
          <SectionTitle number="04" eyebrow="Skills" title="Tools of" titleLight="the trade" />
          <div className="skills-grid" style={{ marginBottom: "48px" }}>
            {skills.map((group, gi) => (
              <motion.div key={group.category} className="skills-card" {...fw(gi)}>
                <span className="skills-card-title">{group.category}</span>
                <div className="skills-card-list">
                  {group.items.map((skill) => (
                    <span key={skill} className="skills-chip">{skill}</span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          <style>{`
            .skills-grid {
              display: grid;
              grid-template-columns: repeat(2, minmax(0, 1fr));
              gap: 12px;
            }
            .skills-card {
              border: 1px solid rgba(255,255,255,0.09);
              border-radius: 12px;
              background: rgba(10,12,18,0.62);
              padding: 16px;
              transition: border-color 0.2s ease, transform 0.2s ease, background 0.2s ease;
            }
            .skills-card:hover {
              border-color: rgba(255,255,255,0.18);
              background: rgba(12,14,20,0.82);
              transform: translateY(-2px);
            }
            .skills-card-title {
              display: block;
              margin-bottom: 12px;
              font-size: 10px;
              letter-spacing: 0.16em;
              text-transform: uppercase;
              color: rgba(255,255,255,0.44);
            }
            .skills-card-list {
              display: flex;
              flex-wrap: wrap;
              gap: 6px;
            }
            .skills-chip {
              display: inline-flex;
              align-items: center;
              padding: 5px 9px;
              border-radius: 6px;
              border: 1px solid rgba(255,255,255,0.11);
              background: rgba(255,255,255,0.03);
              color: rgba(255,255,255,0.64);
              font-size: 11px;
              letter-spacing: 0.03em;
            }
            @media (max-width: 860px) {
              .skills-grid {
                grid-template-columns: 1fr;
              }
            }
          `}</style>
        </div>
      </section>

      {/* ── CERTIFICATES ── */}
      <section id="certificates" style={{ ...SEC, background: BG.certificates }}>
        <div className="inner">
          <SectionTitle number="05" eyebrow="Certificates" title="Credentials &amp;" titleLight="certifications" />

          {/* Card grid */}
          <div className="cert-grid">
            {certificates.map((cert, i) => (
              <motion.div
                key={cert.id ?? i}
                {...fw(i)}
                className="cert-card"
              >
                <div className="cert-preview">
                  {cert.preview ? (
                    <img src={cert.preview} alt={cert.name} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                  ) : (
                    <div className="cert-empty">
                      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" style={{ opacity: 0.5 }}>
                        <circle cx="12" cy="9" r="5" stroke="rgba(251,191,36,0.8)" strokeWidth="1.3"/>
                        <path d="M8 14.5L6 21l6-2.5L18 21l-2-6.5" stroke="rgba(251,191,36,0.6)" strokeWidth="1.3" strokeLinejoin="round"/>
                        <circle cx="12" cy="9" r="2.5" stroke="rgba(251,191,36,0.4)" strokeWidth="1"/>
                      </svg>
                      <span>No Preview</span>
                    </div>
                  )}
                </div>

                <div className="cert-body">
                  <div className="cert-kicker">
                    <span>Certificate</span>
                    {cert.category && (
                      <>
                        <span className="cert-dot" aria-hidden="true" />
                        <span>{cert.category}</span>
                      </>
                    )}
                  </div>
                  <h3>{cert.name}</h3>
                  <div className="cert-meta">
                    {cert.issuer && <span>{cert.issuer}</span>}
                    {cert.issuer && cert.date && <span className="cert-dot" aria-hidden="true" />}
                    {cert.date && <span>{cert.date}</span>}
                  </div>
                  {cert.credentialId && <div className="cert-credential">{cert.credentialId}</div>}
                  <div className="cert-footer">
                    {cert.url ? (
                      <a
                        href={cert.url} target="_blank" rel="noopener noreferrer"
                        className="cert-link"
                      >
                        View Certificate
                        <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M2 5h6M5.5 2.5L8 5l-2.5 2.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                      </a>
                    ) : (
                      <span className="cert-link-muted">Preview only</span>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Bottom count */}
        </div>

        <style>{`
          .cert-grid {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 20px;
            margin-bottom: 8px;
          }
          .cert-card {
            display: flex;
            flex-direction: column;
            border: 1px solid rgba(255,255,255,0.08);
            border-radius: 16px;
            overflow: hidden;
            background: rgba(255,255,255,0.02);
            transition: border-color 0.2s ease, transform 0.2s ease;
          }
          .cert-card:hover {
            border-color: rgba(255,255,255,0.14);
            transform: translateY(-2px);
          }
          .cert-preview {
            aspect-ratio: 16 / 10;
            position: relative;
            overflow: hidden;
            background: rgba(255,255,255,0.03);
            border-bottom: 1px solid rgba(255,255,255,0.07);
          }
          .cert-empty {
            width: 100%;
            height: 100%;
            background: linear-gradient(135deg, rgba(251,191,36,0.05) 0%, rgba(255,255,255,0.015) 55%, rgba(251,191,36,0.03) 100%);
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            gap: 10px;
          }
          .cert-empty span {
            font-size: 9px;
            letter-spacing: 0.22em;
            text-transform: uppercase;
            color: rgba(255,255,255,0.18);
          }
          .cert-body {
            display: flex;
            flex-direction: column;
            flex: 1;
            padding: 16px;
            min-width: 0;
          }
          .cert-kicker {
            display: flex;
            align-items: center;
            flex-wrap: wrap;
            gap: 8px;
            margin-bottom: 10px;
            font-size: 10px;
            letter-spacing: 0.14em;
            text-transform: uppercase;
            color: rgba(255,255,255,0.26);
          }
          .cert-body h3 {
            margin: 0 0 8px;
            font-family: 'NType82','Inter',sans-serif;
            font-size: 15px;
            font-weight: 400;
            line-height: 1.3;
            color: rgba(255,255,255,0.88);
          }
          .cert-meta {
            display: flex;
            align-items: center;
            flex-wrap: wrap;
            gap: 8px;
            font-size: 12px;
            color: rgba(255,255,255,0.42);
            margin-bottom: 14px;
          }
          .cert-dot {
            width: 3px;
            height: 3px;
            border-radius: 999px;
            background: rgba(255,255,255,0.24);
          }
          .cert-credential {
            align-self: flex-start;
            max-width: 100%;
            margin-bottom: 14px;
            padding: 4px 8px;
            border-radius: 6px;
            background: rgba(255,255,255,0.04);
            border: 1px solid rgba(255,255,255,0.07);
            color: rgba(255,255,255,0.28);
            font-size: 9.5px;
            font-family: monospace;
            letter-spacing: 0.06em;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
          .cert-footer {
            margin-top: auto;
            padding-top: 2px;
          }
          .cert-link {
            display: inline-flex;
            align-items: center;
            gap: 6px;
            color: rgba(255,255,255,0.68);
            text-decoration: none;
            font-size: 11px;
            letter-spacing: 0.08em;
            text-transform: uppercase;
          }
          .cert-link-muted {
            font-size: 11px;
            letter-spacing: 0.08em;
            text-transform: uppercase;
            color: rgba(255,255,255,0.22);
          }
          @media (max-width: 900px) {
            .cert-grid { grid-template-columns: repeat(2, 1fr); gap: 16px; }
          }
          @media (max-width: 560px) {
            .cert-grid { grid-template-columns: 1fr; gap: 14px; }
            .cert-body {
              padding: 14px;
            }
            .cert-body h3 {
              font-size: 14px;
            }
          }
        `}</style>
      </section>

      {/* ── CONTACT ── */}
      <section id="contact" style={{ ...SEC, background: BG.contact }}>
        <div className="inner">
          <SectionTitle number="06" eyebrow="Contact" title="Let's" titleLight="connect" />
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(210px,1fr))", gap: "12px", marginBottom: "24px" }}>
            {contactItems.map((item, i) => (
              <motion.div
                key={item.label}
                {...fw(i)}
                style={{
                  background: "rgba(255,255,255,0.025)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: "12px",
                  padding: "18px 18px 16px",
                }}
              >
                <div style={{ fontSize: "9px", letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(255,255,255,0.3)", marginBottom: "10px" }}>
                  {item.label}
                </div>
                {item.href ? (
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "6px",
                      fontSize: "13px",
                      color: "rgba(255,255,255,0.74)",
                      textDecoration: "none",
                      letterSpacing: "0.02em",
                      wordBreak: "break-all",
                    }}
                  >
                    {item.value}
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                      <path d="M2 8L8 2M4 2h4v4" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </a>
                ) : (
                  <span style={{ fontSize: "13px", color: "rgba(255,255,255,0.66)", letterSpacing: "0.02em" }}>{item.value}</span>
                )}
              </motion.div>
            ))}
          </div>
          {profile?.contact?.email && (
            <motion.div {...fw(4)} style={{ marginBottom: "18px" }}>
              <p
                style={{
                  margin: "0 0 10px",
                  fontSize: "11px",
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  color: "rgba(255,255,255,0.45)",
                }}
              >
                Have an idea or opportunity? Let&apos;s talk.
              </p>
              <a
                href={`mailto:${profile.contact.email}`}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  minHeight: "42px",
                  padding: "0 16px",
                  borderRadius: "999px",
                  border: "1px solid rgba(255,255,255,0.18)",
                  background: "rgba(255,255,255,0.04)",
                  color: "rgba(255,255,255,0.86)",
                  textDecoration: "none",
                  fontSize: "11px",
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                }}
              >
                Send an Email
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                  <path d="M2 8L8 2M4 2h4v4" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
            </motion.div>
          )}
          <motion.div {...fw(4)} style={{ display: "flex", alignItems: "center", gap: "9px" }}>
            <span style={{ width: "6px", height: "6px", borderRadius: "999px", background: "rgba(255,255,255,0.55)", display: "inline-block" }} />
            <span style={{ fontSize: "12px", letterSpacing: "0.08em", textTransform: "uppercase", color: "rgba(255,255,255,0.4)" }}>
              Reach out on social channels
            </span>
          </motion.div>
        </div>
      </section>

    </motion.div>
  );
}
