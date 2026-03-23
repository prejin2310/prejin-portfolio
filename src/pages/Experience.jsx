import { motion } from "framer-motion";
import { experience } from "../data/experienceData";
import SectionTitle from "../components/SectionTitle";
import CTAButton from "../components/CTAButton";

const ease = [0.16, 1, 0.3, 1];
const fw = (i) => ({ initial: { opacity: 0, y: 18 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, margin: "-60px" }, transition: { duration: 0.6, delay: i * 0.1, ease } });

export default function Experience() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.35 }} className="page">
      <div className="inner">

        <SectionTitle number="02" eyebrow="Work Experience" title="Where I've" titleLight="worked" />

        {/* Stats row */}
        <motion.div {...fw(0)} className="exp-stats">
          {[
            { v: "2+", l: "Years" },
            { v: "5+", l: "APIs Built" },
            { v: "Prod", l: "Experience" },
          ].map((s, i) => (
            <div key={i} className="stat-card">
              <div className="stat-value">{s.v}</div>
              <div className="stat-label">{s.l}</div>
            </div>
          ))}
        </motion.div>

        {/* Experience cards */}
        <div className="exp-list">
          {experience.map((exp, i) => (
            <motion.div key={exp.id} className="exp-card"
              initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }} transition={{ duration: 0.6, delay: i * 0.1, ease }}
            >
              {/* Header */}
              <div className="exp-header">
                <div className="exp-meta">
                  <span className="exp-num">{String(i + 1).padStart(2, "0")}</span>
                  <div className="exp-titles">
                    <h3 className="exp-role">{exp.role}</h3>
                    <div className="exp-company">{exp.company}</div>
                    <div className="exp-period">{exp.period}</div>
                  </div>
                </div>
                {exp.current && (
                  <span className="exp-badge">
                    <span className="pulse" />
                    Current
                  </span>
                )}
              </div>

              {/* Responsibilities */}
              <div className="exp-responsibilities">
                {exp.responsibilities.map((r, j) => (
                  <motion.div key={j}
                    initial={{ opacity: 0, x: -8 }} whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }} transition={{ delay: 0.1 + j * 0.06, duration: 0.4 }}
                    className="resp-item"
                  >
                    <span className="resp-num">{String(j + 1).padStart(2, "0")}</span>
                    <p className="resp-text">{r}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        <CTAButton to="/projects" variant="primary">See My Projects &rarr;</CTAButton>
      </div>

      <style>{`
        .exp-stats {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
          gap: 12px;
          margin-bottom: 48px;
        }

        .stat-card {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 28px 20px;
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 14px;
          transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
          text-align: center;
        }

        .stat-card:hover {
          background: rgba(255, 255, 255, 0.04);
          border-color: rgba(74, 222, 128, 0.2);
          transform: translateY(-3px);
        }

        .stat-value {
          font-size: 28px;
          font-weight: 600;
          color: rgba(255, 255, 255, 0.85);
          margin-bottom: 6px;
          letter-spacing: -0.02em;
        }

        .stat-label {
          font-size: 10px;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: rgba(255, 255, 255, 0.32);
        }

        .exp-list {
          display: flex;
          flex-direction: column;
          gap: 16px;
          margin-bottom: 48px;
        }

        .exp-card {
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 16px;
          padding: 32px;
          transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
        }

        .exp-card:hover {
          background: rgba(255, 255, 255, 0.04);
          border-color: rgba(74, 222, 128, 0.2);
        }

        .exp-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          gap: 20px;
          margin-bottom: 28px;
          flex-wrap: wrap;
        }

        .exp-meta {
          display: flex;
          align-items: flex-start;
          gap: 16px;
        }

        .exp-num {
          font-family: 'JetBrains Mono', 'SF Mono', monospace;
          font-size: 11px;
          letter-spacing: 0.1em;
          color: rgba(74, 222, 128, 0.6);
          font-weight: 600;
          padding-top: 2px;
          white-space: nowrap;
        }

        .exp-titles {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .exp-role {
          font-size: 18px;
          font-weight: 600;
          color: rgba(255, 255, 255, 0.88);
          margin: 0;
          letter-spacing: -0.01em;
        }

        .exp-company {
          font-size: 13px;
          color: rgba(255, 255, 255, 0.42);
        }

        .exp-period {
          font-size: 11px;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: rgba(255, 255, 255, 0.28);
          margin-top: 2px;
        }

        .exp-badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 6px 12px;
          background: rgba(74, 222, 128, 0.08);
          border: 1px solid rgba(74, 222, 128, 0.2);
          border-radius: 8px;
          font-size: 11px;
          letter-spacing: 0.05em;
          color: rgba(74, 222, 128, 0.8);
          flex-shrink: 0;
        }

        .exp-responsibilities {
          display: flex;
          flex-direction: column;
          gap: 14px;
        }

        .resp-item {
          display: flex;
          gap: 14px;
          align-items: flex-start;
        }

        .resp-num {
          font-family: 'JetBrains Mono', 'SF Mono', monospace;
          font-size: 10px;
          letter-spacing: 0.1em;
          color: rgba(74, 222, 128, 0.5);
          font-weight: 600;
          padding-top: 4px;
          flex-shrink: 0;
          white-space: nowrap;
        }

        .resp-text {
          font-size: 14px;
          color: rgba(255, 255, 255, 0.48);
          line-height: 1.7;
          margin: 0;
          letter-spacing: 0.005em;
        }

        @media (max-width: 768px) {
          .exp-stats {
            grid-template-columns: repeat(3, 1fr);
          }

          .exp-card {
            padding: 24px;
          }

          .exp-header {
            flex-direction: column;
          }

          .exp-role {
            font-size: 16px;
          }

          .stat-value {
            font-size: 24px;
          }
        }

        @media (max-width: 480px) {
          .exp-stats {
            grid-template-columns: 1fr;
          }

          .exp-card {
            padding: 20px;
          }

          .exp-meta {
            flex-direction: column;
            gap: 8px;
          }

          .resp-item {
            gap: 10px;
          }
        }
      `}</style>
    </motion.div>
  );
}
