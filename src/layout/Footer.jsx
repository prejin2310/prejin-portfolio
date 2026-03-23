import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { profile } from "../data/profileData";

const links = [
  { label: "GitHub", href: profile.contact.githubUrl },
  { label: "LinkedIn", href: profile.contact.linkedinUrl },
  { label: "Email", href: `mailto:${profile.contact.email}` },
];

export default function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.2 }}
      style={{ borderTop: "1px solid rgba(255,255,255,0.065)", padding: "28px 0", position: "relative", zIndex: 10 }}
    >
      <div className="inner" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "12px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#4ade80", opacity: 0.7 }} />
          <span style={{ fontSize: "12px", color: "rgba(255,255,255,0.22)", letterSpacing: "0.04em" }}>
            {profile.name} &mdash; {new Date().getFullYear()}
          </span>
        </div>
        <div style={{ display: "flex", gap: "20px" }}>
          {links.map((l) => (
            <a key={l.label} href={l.href} target={l.href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer"
              style={{ fontSize: "12px", color: "rgba(255,255,255,0.28)", textDecoration: "none", transition: "color 0.15s", letterSpacing: "0.04em" }}
              onMouseEnter={(e) => { e.currentTarget.style.color = "rgba(255,255,255,0.7)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.color = "rgba(255,255,255,0.28)"; }}
            >{l.label}</a>
          ))}
        </div>
      </div>
    </motion.footer>
  );
}
