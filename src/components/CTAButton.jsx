import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const styles = {
  primary: {
    base: { background: "rgba(232,232,232,0.94)", borderColor: "rgba(232,232,232,0.94)", color: "#080808" },
    hover: { background: "rgba(255,255,255,1)", scale: 1.02 },
  },
  ghost: {
    base: { background: "transparent", borderColor: "rgba(255,255,255,0.13)", color: "rgba(255,255,255,0.6)" },
    hover: { borderColor: "rgba(255,255,255,0.28)", color: "rgba(255,255,255,0.9)", scale: 1.02 },
  },
  outline: {
    base: { background: "rgba(255,255,255,0.04)", borderColor: "rgba(255,255,255,0.12)", color: "rgba(255,255,255,0.65)" },
    hover: { background: "rgba(255,255,255,0.09)", borderColor: "rgba(255,255,255,0.22)", scale: 1.02 },
  },
};

export default function CTAButton({ to, href, onClick, children, variant = "primary" }) {
  const v = styles[variant] || styles.primary;
  const base = {
    display: "inline-flex", alignItems: "center", gap: "6px",
    padding: "10px 22px", borderRadius: "11px", fontSize: "13.5px",
    fontWeight: 500, letterSpacing: "0.01em", cursor: "pointer",
    border: "1px solid", textDecoration: "none", ...v.base,
  };
  const mp = { whileHover: v.hover, whileTap: { scale: 0.97 }, transition: { duration: 0.15 }, style: base };

  if (to) return (
    <motion.div {...mp} style={{ ...base, padding: 0 }}>
      <Link to={to} style={{ ...base, border: "none", background: "transparent" }}>{children}</Link>
    </motion.div>
  );
  if (href) return <motion.a href={href} target="_blank" rel="noopener noreferrer" {...mp}>{children}</motion.a>;
  return <motion.button onClick={onClick} {...mp}>{children}</motion.button>;
}
