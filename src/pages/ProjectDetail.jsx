import { useParams, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { useData } from "../contexts/DataContext";

const ease = [0.16, 1, 0.3, 1];
const reveal = (delay = 0) => ({
  initial: { opacity: 0, y: 18 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.55, delay, ease },
});

function Card({ title, children }) {
  return (
    <section className="pd-card">
      <p className="pd-card-label">{title}</p>
      {children}
    </section>
  );
}

function ScreenshotGrid({ screenshots, onOpen }) {
  if (!screenshots?.length) {
    return (
      <div className="pd-empty-shot">
        <span>No screenshots available</span>
      </div>
    );
  }

  return (
    <div className={`pd-shot-grid ${screenshots.length > 2 ? "has-many" : ""}`}>
      {screenshots.map((src, index) => (
        <button
          key={`${src}-${index}`}
          type="button"
          className={`pd-shot ${index === 0 && screenshots.length > 2 ? "is-featured" : ""}`}
          onClick={() => onOpen(src)}
          style={{ backgroundImage: `url(${src})` }}
        />
      ))}
    </div>
  );
}

function ProjectNotFound({ onBack }) {
  return (
    <div className="page" style={{ display: "grid", placeItems: "center" }}>
      <div style={{ textAlign: "center" }}>
        <p style={{ fontSize: "11px", letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(255,255,255,0.25)", margin: 0 }}>404</p>
        <h1 style={{ margin: "12px 0 20px", fontSize: "30px", color: "rgba(255,255,255,0.78)", fontWeight: 400 }}>Project not found</h1>
        <button className="pd-link-btn" onClick={onBack}>Back to home</button>
      </div>
    </div>
  );
}

export default function ProjectDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { projects } = useData();
  const [lightbox, setLightbox] = useState(null);

  const project = (projects ?? []).find((p) => String(p.id) === id || p._id === id);

  if (!project) {
    return <ProjectNotFound onBack={() => navigate("/")} />;
  }

  const tech = project.technologies ?? [];
  const highlights = project.highlights ?? [];
  const architecture = project.architecture ?? [];
  const statusText = project.status || (project.live ? "Live" : "Offline");
  const MotionDiv = motion.div;

  return (
    <MotionDiv initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }} className="pd-wrap">
      <div className="pd-inner">
        <motion.div {...reveal(0)} className="pd-topbar">
          <button type="button" className="pd-back" onClick={() => navigate(-1)}>
            <span aria-hidden="true">&#8592;</span>
            Back
          </button>
          <div className="pd-status-row">
            {project.category && <span className="pd-pill">{project.category}</span>}
            <span className={`pd-pill ${project.live ? "is-live" : ""}`}>{statusText}</span>
          </div>
        </motion.div>

        <motion.section {...reveal(0.05)} className="pd-hero">
          <div className="pd-hero-media" style={project.preview ? { backgroundImage: `url(${project.preview})` } : undefined}>
            {!project.preview && (
              <div className="pd-no-preview">No preview image</div>
            )}
          </div>
        </motion.section>

        <motion.section {...reveal(0.08)} className="pd-title-block">
          <h1>{project.title}</h1>
          <p>{project.tagline || project.description || "Project overview"}</p>
          <div className="pd-hero-actions">
            {project.liveUrl && (
              <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="pd-link-btn primary">
                View Live
              </a>
            )}
            {project.githubUrl && (
              <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="pd-link-btn">
                GitHub
              </a>
            )}
          </div>
        </motion.section>

        <div className="pd-content-grid">
          <div className="pd-main-col">
            <motion.div {...reveal(0.1)}>
              <Card title="About Project">
                <p className="pd-copy">{project.longDescription || project.description || project.tagline || "No description added."}</p>
              </Card>
            </motion.div>

            <motion.div {...reveal(0.14)}>
              <Card title="Screenshots">
                <ScreenshotGrid screenshots={project.screenshots ?? []} onOpen={setLightbox} />
              </Card>
            </motion.div>

            {highlights.length > 0 && (
              <motion.div {...reveal(0.18)}>
                <Card title="Key Highlights">
                  <ul className="pd-highlights">
                    {highlights.map((item, index) => (
                      <li key={`${item}-${index}`}>{item}</li>
                    ))}
                  </ul>
                </Card>
              </motion.div>
            )}

            {architecture.length > 0 && (
              <motion.div {...reveal(0.22)}>
                <Card title="Architecture">
                  <div className="pd-arch-list">
                    {architecture.map((layer, index) => (
                      <div key={`${layer.layer}-${index}`} className="pd-arch-row">
                        <span>{layer.layer}</span>
                        <p>{layer.detail}</p>
                      </div>
                    ))}
                  </div>
                </Card>
              </motion.div>
            )}
          </div>

          <motion.aside {...reveal(0.12)} className="pd-side-col">
            <Card title="Project Info">
              <div className="pd-meta-list">
                <div><span>Category</span><strong>{project.category || "-"}</strong></div>
                <div><span>Year</span><strong>{project.year || "-"}</strong></div>
                <div><span>Status</span><strong>{statusText}</strong></div>
              </div>
            </Card>

            <Card title="Tech Stack">
              <div className="pd-tech-wrap">
                {tech.length > 0 ? tech.map((t) => <span key={t} className="pd-tech-chip">{t}</span>) : <span className="pd-muted">No tech added.</span>}
              </div>
            </Card>
          </motion.aside>
        </div>
      </div>

      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="pd-lightbox"
            onClick={() => setLightbox(null)}
          >
            <motion.img
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.98, opacity: 0 }}
              transition={{ duration: 0.2 }}
              src={lightbox}
              alt="Project screenshot"
            />
            <button type="button" className="pd-lightbox-close" onClick={() => setLightbox(null)}>x</button>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        .pd-wrap {
          position: relative;
          z-index: 10;
          min-height: 100vh;
          padding: 7.4rem 1.2rem 4rem;
          background:
            radial-gradient(ellipse 90% 70% at 50% 0%, rgba(91, 66, 153, 0.28) 0%, rgba(91, 66, 153, 0.08) 40%, transparent 72%),
            linear-gradient(180deg, #0a0a0f 0%, #0f1118 52%, #09090d 100%);
        }
        .pd-inner {
          width: min(1180px, 100%);
          margin: 0 auto;
          display: grid;
          gap: 16px;
        }
        .pd-topbar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 10px;
          flex-wrap: wrap;
        }
        .pd-back {
          min-height: 40px;
          padding: 0 14px;
          border-radius: 999px;
          border: 1px solid rgba(255,255,255,0.14);
          background: rgba(255,255,255,0.03);
          color: rgba(255,255,255,0.82);
          font-size: 11px;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          gap: 7px;
        }
        .pd-status-row {
          display: flex;
          align-items: center;
          gap: 8px;
          flex-wrap: wrap;
        }
        .pd-pill {
          border: 1px solid rgba(255,255,255,0.14);
          background: rgba(255,255,255,0.03);
          color: rgba(255,255,255,0.72);
          border-radius: 999px;
          padding: 6px 12px;
          font-size: 10px;
          letter-spacing: 0.12em;
          text-transform: uppercase;
        }
        .pd-pill.is-live {
          border-color: rgba(74,222,128,0.32);
          background: rgba(74,222,128,0.11);
          color: rgba(74,222,128,0.92);
        }
        .pd-hero {
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 18px;
          overflow: hidden;
          background: rgba(11,14,22,0.78);
        }
        .pd-hero-media {
          width: 100%;
          aspect-ratio: 21 / 8;
          background: linear-gradient(135deg, rgba(255,255,255,0.04), rgba(255,255,255,0.015));
          background-size: cover;
          background-position: center;
          min-height: 240px;
        }
        .pd-no-preview {
          width: 100%;
          min-height: 240px;
          inset: 0;
          display: grid;
          place-items: center;
          color: rgba(255,255,255,0.26);
          font-size: 11px;
          letter-spacing: 0.16em;
          text-transform: uppercase;
        }
        .pd-title-block {
          border: 1px solid rgba(255,255,255,0.09);
          border-radius: 14px;
          background: rgba(11,14,22,0.68);
          padding: 20px 18px;
        }
        .pd-title-block h1 {
          margin: 0;
          font-family: 'NType82','Inter',sans-serif;
          font-size: clamp(24px, 3.8vw, 44px);
          line-height: 1.08;
          letter-spacing: 0.02em;
          color: rgba(255,255,255,0.98);
        }
        .pd-title-block p {
          margin: 12px 0 0;
          max-width: 72ch;
          font-size: clamp(13px, 1.5vw, 15px);
          line-height: 1.7;
          color: rgba(255,255,255,0.6);
        }
        .pd-hero-actions {
          margin-top: 14px;
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          gap: 8px;
        }
        .pd-link-btn {
          min-height: 38px;
          padding: 0 14px;
          border-radius: 999px;
          border: 1px solid rgba(255,255,255,0.16);
          background: rgba(255,255,255,0.04);
          color: rgba(255,255,255,0.88);
          font-size: 10.5px;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
        }
        .pd-link-btn.primary {
          background: rgba(74,222,128,0.16);
          border-color: rgba(74,222,128,0.34);
          color: rgba(74,222,128,0.95);
        }
        .pd-content-grid {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }
        .pd-main-col,
        .pd-side-col {
          display: grid;
          gap: 16px;
        }
        .pd-side-col {
          position: static;
        }
        .pd-card {
          border: 1px solid rgba(255,255,255,0.09);
          border-radius: 14px;
          background: rgba(11,14,22,0.68);
          padding: 18px;
        }
        .pd-card-label {
          margin: 0 0 12px;
          font-size: 10px;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.34);
        }
        .pd-copy {
          margin: 0;
          font-size: 14px;
          line-height: 1.84;
          color: rgba(255,255,255,0.62);
        }
        .pd-shot-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 10px;
        }
        .pd-shot-grid.has-many .pd-shot.is-featured {
          grid-column: 1 / -1;
          aspect-ratio: 21 / 9;
        }
        .pd-shot {
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 10px;
          background-size: cover;
          background-position: top center;
          aspect-ratio: 16 / 9;
          cursor: zoom-in;
        }
        .pd-empty-shot {
          border: 1px dashed rgba(255,255,255,0.14);
          border-radius: 10px;
          min-height: 160px;
          display: grid;
          place-items: center;
        }
        .pd-empty-shot span {
          font-size: 10px;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.32);
        }
        .pd-highlights {
          margin: 0;
          padding: 0;
          list-style: none;
          display: grid;
          gap: 10px;
        }
        .pd-highlights li {
          position: relative;
          padding-left: 16px;
          font-size: 13.5px;
          color: rgba(255,255,255,0.62);
          line-height: 1.72;
        }
        .pd-highlights li::before {
          content: "";
          position: absolute;
          left: 0;
          top: 9px;
          width: 5px;
          height: 5px;
          border-radius: 999px;
          background: rgba(74,222,128,0.9);
        }
        .pd-arch-list {
          display: grid;
          gap: 8px;
        }
        .pd-arch-row {
          display: grid;
          grid-template-columns: 120px minmax(0, 1fr);
          gap: 12px;
          padding: 8px 0;
          border-bottom: 1px solid rgba(255,255,255,0.06);
        }
        .pd-arch-row:last-child {
          border-bottom: 0;
        }
        .pd-arch-row span {
          font-size: 10px;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.42);
          padding-top: 2px;
        }
        .pd-arch-row p {
          margin: 0;
          font-size: 13px;
          line-height: 1.7;
          color: rgba(255,255,255,0.6);
        }
        .pd-meta-list {
          display: grid;
          gap: 10px;
        }
        .pd-meta-list div {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 10px;
          padding-bottom: 10px;
          border-bottom: 1px solid rgba(255,255,255,0.06);
        }
        .pd-meta-list div:last-child {
          border-bottom: 0;
          padding-bottom: 0;
        }
        .pd-meta-list span {
          font-size: 10px;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.42);
        }
        .pd-meta-list strong {
          font-size: 12.5px;
          font-weight: 500;
          color: rgba(255,255,255,0.8);
        }
        .pd-tech-wrap {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
        }
        .pd-tech-chip {
          border: 1px solid rgba(255,255,255,0.12);
          background: rgba(255,255,255,0.03);
          border-radius: 6px;
          padding: 5px 8px;
          font-size: 10.5px;
          color: rgba(255,255,255,0.66);
          letter-spacing: 0.04em;
        }
        .pd-muted {
          font-size: 13px;
          color: rgba(255,255,255,0.5);
        }
        .pd-lightbox {
          position: fixed;
          inset: 0;
          z-index: 999;
          background: rgba(3,4,7,0.88);
          backdrop-filter: blur(8px);
          display: grid;
          place-items: center;
          padding: 20px;
          cursor: zoom-out;
        }
        .pd-lightbox img {
          max-width: min(1200px, 100%);
          max-height: 90vh;
          border-radius: 12px;
          object-fit: contain;
        }
        .pd-lightbox-close {
          position: absolute;
          top: 18px;
          right: 18px;
          width: 34px;
          height: 34px;
          border-radius: 999px;
          border: 1px solid rgba(255,255,255,0.16);
          background: rgba(255,255,255,0.08);
          color: rgba(255,255,255,0.86);
          font-size: 16px;
          cursor: pointer;
        }
        @media (max-width: 980px) {
          .pd-content-grid { gap: 14px; }
        }
        @media (max-width: 760px) {
          .pd-wrap {
            padding: 6.4rem 0.9rem 2.4rem;
          }
          .pd-hero-media {
            aspect-ratio: 16 / 10;
          }
          .pd-shot-grid {
            grid-template-columns: 1fr;
          }
          .pd-shot-grid.has-many .pd-shot.is-featured {
            aspect-ratio: 16 / 10;
          }
          .pd-title-block p {
            line-height: 1.6;
          }
          .pd-card {
            padding: 15px;
          }
          .pd-arch-row {
            grid-template-columns: 1fr;
            gap: 5px;
          }
        }
      `}</style>
    </MotionDiv>
  );
}
