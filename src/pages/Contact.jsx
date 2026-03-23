import { useState } from "react";
import { motion } from "framer-motion";
import { profile } from "../data/profileData";
import SectionTitle from "../components/SectionTitle";

const ease = [0.16, 1, 0.3, 1];
const fw = (i) => ({ initial: { opacity: 0, y: 18 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, margin: "-60px" }, transition: { duration: 0.6, delay: i * 0.1, ease } });

const contactItems = [
  {
    label: "Email",
    value: profile.contact.email,
    href: `mailto:${profile.contact.email}`,
    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" strokeLinecap="round"/></svg>,
  },
  {
    label: "LinkedIn",
    value: profile.contact.linkedin,
    href: profile.contact.linkedinUrl,
    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>,
  },
  {
    label: "GitHub",
    value: profile.contact.github,
    href: profile.contact.githubUrl,
    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/></svg>,
  },
  {
    label: "Location",
    value: profile.contact.location,
    href: null,
    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>,
  },
];

export default function Contact() {
  const [copied, setCopied] = useState(false);

  const copy = () => {
    navigator.clipboard.writeText(profile.contact.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.35 }} className="page">
      <div className="inner">

        <SectionTitle number="06" eyebrow="Contact" title="Let's" titleLight="connect" />

        {/* Main email CTA */}
        <motion.div {...fw(0)} className="contact-cta-section">
          <div className="cta-label">Get in touch</div>
          <motion.a
            href={`mailto:${profile.contact.email}`}
            className="email-link"
            whileHover={{ color: "rgba(255,255,255,0.95)" }}
          >
            {profile.contact.email}
          </motion.a>
          <p className="cta-description">
            I'm always happy to discuss projects, ideas, or collaboration opportunities.
          </p>
          <div className="cta-buttons">
            <motion.a
              href={`mailto:${profile.contact.email}`}
              className="btn primary"
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.97 }}
            >
              Send Email
            </motion.a>
            <motion.button 
              onClick={copy}
              className="btn secondary"
              whileTap={{ scale: 0.97 }}
            >
              {copied ? "✓ Copied!" : "Copy"}
            </motion.button>
          </div>
        </motion.div>

        {/* Contact items */}
        <div className="contact-grid">
          {contactItems.map((item, i) => (
            <motion.a
              key={item.label}
              href={item.href}
              target={item.href && item.href.startsWith("http") ? "_blank" : undefined}
              rel="noopener noreferrer"
              {...fw(i + 1)}
              className={`contact-card ${!item.href ? "no-link" : ""}`}
            >
              <div className="contact-icon">
                {item.icon}
              </div>
              <div className="contact-content">
                <div className="contact-label">{item.label}</div>
                <div className="contact-value">{item.value}</div>
              </div>
              {item.href && (
                <svg className="contact-arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
              )}
            </motion.a>
          ))}
        </div>

        {/* Status */}
        <motion.div {...fw(5)} className="contact-status">
          <span className="status-dot" />
          <span>Available for work — responding within 24 hours</span>
        </motion.div>

      </div>

      <style>{`
        .contact-cta-section {
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 18px;
          padding: 48px 40px;
          text-align: center;
          margin-bottom: 48px;
          transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
        }

        .contact-cta-section:hover {
          background: rgba(255, 255, 255, 0.04);
          border-color: rgba(74, 222, 128, 0.2);
        }

        .cta-label {
          font-size: 10px;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: rgba(255, 255, 255, 0.22);
          margin-bottom: 18px;
          font-weight: 500;
        }

        .email-link {
          display: inline-block;
          font-size: clamp(20px, 4vw, 42px);
          font-weight: 600;
          color: rgba(255, 255, 255, 0.72);
          text-decoration: none;
          letter-spacing: -0.02em;
          margin-bottom: 20px;
          transition: color 0.25s ease;
          word-break: break-all;
        }

        .cta-description {
          font-size: 14px;
          color: rgba(255, 255, 255, 0.42);
          margin: 0 0 28px;
          max-width: 500px;
          margin-left: auto;
          margin-right: auto;
          line-height: 1.6;
        }

        .cta-buttons {
          display: flex;
          gap: 12px;
          justify-content: center;
          flex-wrap: wrap;
        }

        .btn {
          padding: 12px 28px;
          border-radius: 10px;
          font-size: 13px;
          font-weight: 500;
          letter-spacing: 0.05em;
          cursor: pointer;
          border: none;
          transition: all 0.3s ease;
          font-family: inherit;
          display: inline-block;
          text-decoration: none;
        }

        .btn.primary {
          background: linear-gradient(135deg, rgb(74, 222, 128) 0%, rgb(134, 239, 172) 100%);
          color: rgba(0, 0, 0, 0.9);
          box-shadow: 0 8px 24px rgba(74, 222, 128, 0.25);
        }

        .btn.primary:hover {
          box-shadow: 0 12px 32px rgba(74, 222, 128, 0.35);
        }

        .btn.secondary {
          background: rgba(255, 255, 255, 0.06);
          border: 1px solid rgba(255, 255, 255, 0.12);
          color: rgba(255, 255, 255, 0.6);
        }

        .btn.secondary:hover {
          background: rgba(255, 255, 255, 0.12);
          border-color: rgba(255, 255, 255, 0.25);
          color: rgba(255, 255, 255, 0.85);
        }

        .contact-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
          gap: 12px;
          margin-bottom: 48px;
        }

        .contact-card {
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 14px;
          padding: 20px;
          text-decoration: none;
          display: flex;
          flex-direction: column;
          gap: 14px;
          transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
          position: relative;
          overflow: hidden;
        }

        .contact-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: rgba(74, 222, 128, 0.05);
          transition: left 0.4s ease;
          pointer-events: none;
          z-index: 0;
        }

        .contact-card:not(.no-link):hover {
          background: rgba(255, 255, 255, 0.05);
          border-color: rgba(74, 222, 128, 0.3);
          transform: translateY(-3px);
        }

        .contact-card:not(.no-link):hover::before {
          left: 100%;
        }

        .contact-card.no-link {
          cursor: default;
        }

        .contact-icon {
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
          transition: all 0.25s ease;
          position: relative;
          z-index: 1;
        }

        .contact-card:hover .contact-icon {
          background: rgba(74, 222, 128, 0.15);
          color: rgba(74, 222, 128, 0.85);
        }

        .contact-content {
          display: flex;
          flex-direction: column;
          gap: 4px;
          text-align: left;
          position: relative;
          z-index: 1;
          flex: 1;
        }

        .contact-label {
          font-size: 11px;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: rgba(255, 255, 255, 0.28);
          font-weight: 500;
        }

        .contact-value {
          font-size: 13px;
          color: rgba(255, 255, 255, 0.54);
          word-break: break-all;
          transition: color 0.25s ease;
        }

        .contact-card:not(.no-link):hover .contact-value {
          color: rgba(255, 255, 255, 0.82);
        }

        .contact-arrow {
          width: 16px;
          height: 16px;
          color: rgba(74, 222, 128, 0.5);
          opacity: 0;
          transform: translateX(-8px);
          transition: all 0.3s ease;
          position: absolute;
          top: 50%;
          right: 16px;
          transform: translateY(-50%) translateX(-8px);
          z-index: 1;
        }

        .contact-card:hover .contact-arrow {
          opacity: 1;
          transform: translateY(-50%) translateX(0);
        }

        .contact-status {
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 13px;
          color: rgba(255, 255, 255, 0.4);
          justify-content: center;
        }

        .status-dot {
          width: 7px;
          height: 7px;
          background: #4ade80;
          border-radius: 50%;
          flex-shrink: 0;
          animation: pulse-dot 2s ease-in-out infinite;
        }

        @keyframes pulse-dot {
          0%, 100% { box-shadow: 0 0 0 0 rgba(74, 222, 128, 0.7); }
          50% { box-shadow: 0 0 0 6px rgba(74, 222, 128, 0); }
        }

        @media (max-width: 768px) {
          .contact-cta-section {
            padding: 36px 28px;
          }

          .contact-grid {
            grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
          }

          .cta-buttons {
            gap: 10px;
          }

          .btn {
            padding: 10px 24px;
            font-size: 12px;
          }
        }

        @media (max-width: 480px) {
          .contact-cta-section {
            padding: 28px 20px;
          }

          .contact-grid {
            grid-template-columns: 1fr;
          }

          .cta-buttons {
            flex-direction: column;
          }

          .btn {
            width: 100%;
          }

          .email-link {
            font-size: 24px;
          }

          .contact-arrow {
            display: none;
          }
        }
      `}</style>
    </motion.div>
  );
}
