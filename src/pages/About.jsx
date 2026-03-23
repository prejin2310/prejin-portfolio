import { motion } from "framer-motion";
import { profile } from "../data/profileData";
import CTAButton from "../components/CTAButton";
import SectionTitle from "../components/SectionTitle";

const ease = [0.16, 1, 0.3, 1];
const fw = (i) => ({ initial: { opacity: 0, y: 18 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, margin: "-60px" }, transition: { duration: 0.6, delay: i * 0.1, ease } });

export default function About() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.35 }} className="page">
      <div className="inner">

        <SectionTitle number="01" eyebrow="About" title="Crafting reliable" titleLight="software" />

        {/* Main info grid */}
        <div className="about-grid">
          {/* Summary card */}
          <motion.div {...fw(0)} className="about-card large">
            <div className="about-card-label">Professional Summary</div>
            <p className="about-card-text">
              {profile.summary}
            </p>
          </motion.div>

          {/* Info items */}
          <motion.div {...fw(1)} className="info-grid">
            {[
              { num: "01", label: "Location", value: profile.contact.location },
              { num: "02", label: "Role", value: profile.title },
              { num: "03", label: "Experience", value: "2+ Years" },
              { num: "04", label: "Status", value: "Open to work", highlight: true },
            ].map((item) => (
              <div key={item.label} className="info-item">
                <span className="info-num">{item.num}</span>
                <div className="info-content">
                  <div className="info-label">{item.label}</div>
                  <div className={item.highlight ? "info-value highlight" : "info-value"}>{item.value}</div>
                </div>
              </div>
            ))}
          </motion.div>

          {/* Career Focus */}
          <motion.div {...fw(2)} className="about-card full">
            <div className="about-card-label">Career Focus</div>
            <p className="about-card-text">
              {profile.careerFocus}
            </p>
          </motion.div>

          {/* Strengths */}
          <motion.div {...fw(3)} className="about-card full">
            <div className="about-card-label">Strengths</div>
            <div className="strengths-grid">
              {profile.strengths.map((s, i) => (
                <motion.div key={i}
                  initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }} transition={{ delay: i * 0.07, duration: 0.4 }}
                  className="strength-item"
                >
                  <span className="strength-bullet" />
                  <span>{s}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* CTA */}
        <div className="about-cta">
          <CTAButton to="/experience" variant="primary">View Experience</CTAButton>
          <CTAButton to="/contact" variant="ghost">Contact Me</CTAButton>
        </div>
      </div>

      <style>{`
        .about-grid {
          display: flex;
          flex-direction: column;
          gap: 16px;
          margin-bottom: 48px;
        }

        .about-card {
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 16px;
          padding: 28px 32px;
          transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
        }

        .about-card:hover {
          background: rgba(255, 255, 255, 0.04);
          border-color: rgba(74, 222, 128, 0.2);
        }

        .about-card.large {
          grid-column: span 2;
        }

        .about-card.full {
          grid-column: 1 / -1;
        }

        .about-card-label {
          font-size: 10px;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: rgba(255, 255, 255, 0.22);
          margin-bottom: 14px;
          font-weight: 500;
        }

        .about-card-text {
          font-size: 14px;
          color: rgba(255, 255, 255, 0.48);
          line-height: 1.8;
          margin: 0;
          letter-spacing: 0.005em;
        }

        .info-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
          gap: 12px;
        }

        .info-item {
          display: flex;
          align-items: flex-start;
          gap: 12px;
          padding: 16px;
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 12px;
          transition: all 0.3s ease;
        }

        .info-item:hover {
          background: rgba(255, 255, 255, 0.04);
          border-color: rgba(74, 222, 128, 0.2);
          transform: translateY(-2px);
        }

        .info-num {
          font-family: 'JetBrains Mono', 'SF Mono', monospace;
          font-size: 10px;
          letter-spacing: 0.1em;
          color: rgba(74, 222, 128, 0.6);
          font-weight: 600;
          flex-shrink: 0;
          padding-top: 2px;
        }

        .info-content {
          display: flex;
          flex-direction: column;
        }

        .info-label {
          font-size: 9px;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: rgba(255, 255, 255, 0.32);
          margin-bottom: 3px;
        }

        .info-value {
          font-size: 13px;
          color: rgba(255, 255, 255, 0.62);
          font-weight: 500;
        }

        .info-value.highlight {
          color: rgba(74, 222, 128, 0.75);
          display: flex;
          align-items: center;
          gap: 5px;
        }

        .strengths-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
          gap: 12px;
        }

        .strength-item {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 10px 14px;
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(255, 255, 255, 0.07);
          border-radius: 10px;
          font-size: 13px;
          color: rgba(255, 255, 255, 0.48);
          transition: all 0.2s ease;
        }

        .strength-item:hover {
          background: rgba(255, 255, 255, 0.04);
          border-color: rgba(74, 222, 128, 0.2);
          color: rgba(255, 255, 255, 0.68);
        }

        .strength-bullet {
          width: 4px;
          height: 4px;
          background: rgba(74, 222, 128, 0.5);
          border-radius: 50%;
          flex-shrink: 0;
        }

        .about-cta {
          display: flex;
          gap: 12px;
          flex-wrap: wrap;
        }

        @media (max-width: 768px) {
          .info-grid {
            grid-template-columns: repeat(2, 1fr);
          }

          .about-card {
            padding: 20px 24px;
          }

          .about-card-text {
            font-size: 13px;
          }

          .strengths-grid {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 480px) {
          .info-grid {
            grid-template-columns: 1fr;
          }

          .about-cta {
            flex-direction: column;
          }
        }
      `}</style>
    </motion.div>
  );
}
