import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { projects } from "../data/projectsData";
import SectionTitle from "../components/SectionTitle";

const ease = [0.16, 1, 0.3, 1];
const categories = ["All", ...new Set(projects.map((p) => p.category))];

export default function Projects() {
  const [active, setActive] = useState("All");
  const navigate = useNavigate();
  const filtered = active === "All" ? projects : projects.filter((p) => p.category === active);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.35 }} className="page">
      <div className="inner">
        <SectionTitle number="03" eyebrow="Projects" title="Things I've" titleLight="built" />

        <div className="proj-filter">
          {categories.map((cat) => (
            <button key={cat} onClick={() => setActive(cat)} className={`filter-btn ${active === cat ? "active" : ""}`}>
              {cat}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="proj-list"
          >
            {filtered.map((p, i) => (
              <motion.button
                key={p.id}
                type="button"
                className="proj-row"
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08, duration: 0.45, ease }}
                onClick={() => navigate(`/project/${p.id}`)}
              >
                <div
                  className="proj-preview"
                  style={{
                    background: p.preview
                      ? `linear-gradient(180deg, rgba(0,0,0,0.06), rgba(0,0,0,0.18)), url(${p.preview}) center/cover`
                      : "linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.015) 100%)",
                  }}
                >
                  {p.preview ? (
                    <span className="sr-only">{p.title} preview</span>
                  ) : (
                    <div className="proj-empty">
                      <span>Preview</span>
                    </div>
                  )}
                </div>

                <div className="proj-body">
                  <div className="proj-kicker">
                    <span>Project</span>
                    {p.category && (
                      <>
                        <span className="proj-dot" aria-hidden="true" />
                        <span>{p.category}</span>
                      </>
                    )}
                  </div>

                  <div className="proj-title-row">
                    <h3 className="proj-title">{p.title}</h3>
                    <span className="proj-link">View details</span>
                  </div>

                  <div className="proj-meta">
                    {p.year && <span>{p.year}</span>}
                    {p.year && p.status && <span className="proj-dot" aria-hidden="true" />}
                    {p.status && <span>{p.status}</span>}
                  </div>

                  <p className="proj-desc">{p.description || p.tagline}</p>
                </div>
              </motion.button>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>

      <style>{`
        .sr-only {
          position: absolute;
          width: 1px;
          height: 1px;
          padding: 0;
          margin: -1px;
          overflow: hidden;
          clip: rect(0, 0, 0, 0);
          white-space: nowrap;
          border: 0;
        }

        .proj-filter {
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
          margin-top: -16px;
          margin-bottom: 32px;
        }

        .filter-btn {
          min-height: 38px;
          padding: 0 16px;
          border-radius: 999px;
          font-size: 12px;
          font-weight: 400;
          letter-spacing: 0.04em;
          cursor: pointer;
          border: 1px solid rgba(255, 255, 255, 0.08);
          background: rgba(255, 255, 255, 0.025);
          color: rgba(255, 255, 255, 0.42);
          transition: background 0.2s ease, border-color 0.2s ease, color 0.2s ease;
          font-family: inherit;
        }

        .filter-btn:hover {
          border-color: rgba(255, 255, 255, 0.14);
          color: rgba(255, 255, 255, 0.72);
        }

        .filter-btn.active {
          background: rgba(255, 255, 255, 0.08);
          border-color: rgba(255, 255, 255, 0.18);
          color: rgba(255, 255, 255, 0.88);
        }

        .proj-list {
          display: flex;
          flex-direction: column;
          gap: 40px;
          margin-bottom: 40px;
        }

        .proj-row {
          display: grid;
          grid-template-columns: minmax(0, 1.45fr) minmax(280px, 0.9fr);
          gap: 28px;
          align-items: start;
          width: 100%;
          padding: 0;
          text-align: left;
          border: 0;
          background: transparent;
          cursor: pointer;
          transition: transform 0.2s ease;
        }

        .proj-row:hover {
          transform: translateY(-2px);
        }

        .proj-row + .proj-row {
          padding-top: 40px;
          border-top: 1px solid rgba(255, 255, 255, 0.08);
        }

        .proj-preview {
          position: relative;
          width: 100%;
          aspect-ratio: 16 / 9;
          overflow: hidden;
          background-color: rgba(255, 255, 255, 0.03);
          border-radius: 18px;
          transition: transform 0.3s ease, filter 0.3s ease;
        }

        .proj-row:hover .proj-preview {
          transform: scale(1.01);
          filter: brightness(1.04);
        }

        .proj-empty {
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          background:
            linear-gradient(rgba(255,255,255,0.035) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.035) 1px, transparent 1px),
            linear-gradient(135deg, rgba(255,255,255,0.045), rgba(255,255,255,0.012));
          background-size: 24px 24px, 24px 24px, auto;
        }

        .proj-empty span {
          font-size: 10px;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: rgba(255, 255, 255, 0.24);
        }

        .proj-body {
          display: flex;
          flex: 1;
          flex-direction: column;
          min-width: 0;
          padding-top: 8px;
        }

        .proj-kicker {
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          gap: 8px;
          margin-bottom: 10px;
          font-size: 10px;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: rgba(255, 255, 255, 0.26);
        }

        .proj-title-row {
          display: flex;
          align-items: baseline;
          justify-content: space-between;
          gap: 16px;
          margin-bottom: 8px;
        }

        .proj-title {
          margin: 0;
          font-size: clamp(18px, 2vw, 24px);
          font-weight: 400;
          line-height: 1.18;
          color: rgba(255, 255, 255, 0.9);
          letter-spacing: 0.01em;
        }

        .proj-meta {
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          gap: 8px;
          margin-bottom: 10px;
          font-size: 12px;
          color: rgba(255, 255, 255, 0.4);
        }

        .proj-dot {
          width: 3px;
          height: 3px;
          border-radius: 999px;
          background: rgba(255, 255, 255, 0.24);
          flex-shrink: 0;
        }

        .proj-desc {
          margin: 0;
          color: rgba(255, 255, 255, 0.42);
          font-size: 13px;
          line-height: 1.65;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .proj-link {
          flex-shrink: 0;
          font-size: 11px;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: rgba(255, 255, 255, 0.55);
        }

        @media (max-width: 980px) {
          .proj-row {
            grid-template-columns: 1fr;
            gap: 18px;
          }

          .proj-body {
            padding-top: 0;
          }
        }

        @media (max-width: 640px) {
          .proj-filter {
            margin-bottom: 24px;
          }

          .proj-list {
            gap: 28px;
          }

          .proj-row + .proj-row {
            padding-top: 28px;
          }

          .proj-preview {
            aspect-ratio: 16 / 10;
            border-radius: 14px;
          }

          .proj-title-row {
            flex-direction: column;
            align-items: flex-start;
            gap: 8px;
          }

          .proj-title {
            font-size: 17px;
          }

          .proj-desc {
            font-size: 12.5px;
          }
        }
      `}</style>
    </motion.div>
  );
}
