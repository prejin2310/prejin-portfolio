import { motion } from "framer-motion";
import { skills } from "../data/skillsData";
import SectionTitle from "../components/SectionTitle";

const ease = [0.16, 1, 0.3, 1];

const icons = {
  Backend: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4" strokeLinecap="round"/></svg>,
  Frontend: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><polyline points="16 18 22 12 16 6" strokeLinecap="round"/><polyline points="8 6 2 12 8 18" strokeLinecap="round"/></svg>,
  Database: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/></svg>,
  Tools: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" strokeLinecap="round"/></svg>,
};

export default function Skills() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.35 }} className="page">
      <div className="inner">

        <SectionTitle number="04" eyebrow="Skills" title="Tools of" titleLight="the trade" />

        {/* Skills grid */}
        <div className="skills-grid">
          {skills.map((group, gi) => (
            <motion.div key={group.category} className="skill-group"
              initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ delay: gi * 0.1, duration: 0.5, ease }}
            >
              {/* Category header */}
              <div className="category-header">
                <div className="category-icon">
                  {icons[group.category]}
                </div>
                <div className="category-info">
                  <span className="category-label">{group.category}</span>
                  <span className="category-count">{group.items.length} skills</span>
                </div>
              </div>

              {/* Skills list */}
              <div className="skills-list">
                {group.items.map((skill, si) => (
                  <motion.span key={skill}
                    initial={{ opacity: 0, scale: 0.88 }} whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }} transition={{ delay: gi * 0.06 + si * 0.04, duration: 0.3 }}
                    className="skill-badge"
                    whileHover={{ y: -2 }}
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

      </div>

      <style>{`
        .skills-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
          gap: 16px;
          margin-bottom: 48px;
        }

        .skill-group {
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 16px;
          padding: 28px;
          transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
        }

        .skill-group:hover {
          background: rgba(255, 255, 255, 0.04);
          border-color: rgba(74, 222, 128, 0.2);
        }

        .category-header {
          display: flex;
          align-items: center;
          gap: 14px;
          margin-bottom: 22px;
          padding-bottom: 16px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.07);
        }

        .category-icon {
          width: 40px;
          height: 40px;
          border-radius: 10px;
          background: rgba(74, 222, 128, 0.08);
          border: 1px solid rgba(74, 222, 128, 0.15);
          display: flex;
          align-items: center;
          justify-content: center;
          color: rgba(74, 222, 128, 0.7);
          flex-shrink: 0;
        }

        .category-info {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }

        .category-label {
          font-size: 14px;
          font-weight: 600;
          color: rgba(255, 255, 255, 0.82);
          letter-spacing: -0.01em;
        }

        .category-count {
          font-size: 11px;
          letter-spacing: 0.05em;
          color: rgba(255, 255, 255, 0.28);
          text-transform: uppercase;
        }

        .skills-list {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }

        .skill-badge {
          padding: 8px 14px;
          border-radius: 10px;
          font-size: 12px;
          letter-spacing: 0.04em;
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid rgba(255, 255, 255, 0.08);
          color: rgba(255, 255, 255, 0.48);
          cursor: default;
          transition: all 0.25s ease;
          display: inline-block;
        }

        .skill-badge:hover {
          background: rgba(255, 255, 255, 0.08);
          border-color: rgba(74, 222, 128, 0.3);
          color: rgba(255, 255, 255, 0.72);
        }

        @media (max-width: 768px) {
          .skills-grid {
            grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          }

          .skill-group {
            padding: 22px;
          }

          .category-header {
            gap: 12px;
          }

          .category-icon {
            width: 36px;
            height: 36px;
          }

          .category-label {
            font-size: 13px;
          }
        }

        @media (max-width: 480px) {
          .skills-grid {
            grid-template-columns: 1fr;
          }

          .skill-group {
            padding: 20px;
          }

          .skill-badge {
            padding: 7px 12px;
            font-size: 11px;
          }
        }
      `}</style>
    </motion.div>
  );
}
