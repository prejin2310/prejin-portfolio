import { motion } from "framer-motion";

export default function GlassCard({ children, className = "", delay = 0, hover = true, style = {} }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.55, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
      style={{
        background: "rgba(255,255,255,0.035)",
        border: "1px solid rgba(255,255,255,0.09)",
        borderRadius: "18px",
        padding: "28px",
        backdropFilter: "blur(14px)",
        transition: "background 0.25s, border-color 0.25s",
        ...style,
      }}
      onMouseEnter={hover ? (e) => {
        e.currentTarget.style.background = "rgba(255,255,255,0.06)";
        e.currentTarget.style.borderColor = "rgba(255,255,255,0.16)";
      } : undefined}
      onMouseLeave={hover ? (e) => {
        e.currentTarget.style.background = "rgba(255,255,255,0.035)";
        e.currentTarget.style.borderColor = "rgba(255,255,255,0.09)";
      } : undefined}
    >
      {children}
    </motion.div>
  );
}
