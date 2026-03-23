import { useState, useEffect, useCallback } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { to: "/", label: "Home", hash: "" },
  { to: "/", label: "About", hash: "about" },
  { to: "/", label: "Work", hash: "experience" },
  { to: "/", label: "Projects", hash: "projects" },
  { to: "/", label: "Skills", hash: "skills" },
  { to: "/resume", label: "Resume", hash: "" },
  { to: "/", label: "Contact", hash: "contact" },
];

const utilityLinks = [
  { label: "LinkedIn", to: "/contact", hash: "" },
  { label: "GitHub", to: "/projects", hash: "" },
  { label: "Email", to: "/contact", hash: "" },
];

const ease = [0.16, 1, 0.3, 1];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const MotionDiv = motion.div;
  const MotionNav = motion.nav;

  useEffect(() => {
    const id = setTimeout(() => setOpen(false), 0);
    return () => clearTimeout(id);
  }, [location.pathname]);

  const handleNav = useCallback((l, e) => {
    e.preventDefault();
    setOpen(false);

    if (l.hash) {
      if (location.pathname === "/") {
        setTimeout(() => document.getElementById(l.hash)?.scrollIntoView({ behavior: "smooth" }), 70);
      } else {
        navigate("/");
        setTimeout(() => document.getElementById(l.hash)?.scrollIntoView({ behavior: "smooth" }), 420);
      }
    } else {
      navigate(l.to);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [location.pathname, navigate]);

  return (
    <>
      <MotionDiv
        initial={{ y: -40, opacity: 0, x: "-50%" }}
        animate={{ y: open ? -12 : 0, opacity: open ? 0 : 1, x: "-50%" }}
        transition={{ duration: 0.25, ease }}
        style={{
          position: "fixed",
          top: "18px",
          left: "50%",
          zIndex: 220,
          width: "calc(100% - 92px)",
          maxWidth: "620px",
          pointerEvents: open ? "none" : "none",
        }}
      >
        <div
          style={{
            height: "56px",
            borderRadius: "16px",
            border: "1px solid rgba(255,255,255,0.14)",
            background: "#181a20",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            display: "grid",
            gridTemplateColumns: "56px 1fr 56px",
            alignItems: "center",
            padding: "0 6px",
            boxShadow: "0 20px 60px rgba(0,0,0,0.2)",
            pointerEvents: "all",
          }}
        >
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close menu" : "Open menu"}
            style={{
              width: "44px",
              height: "44px",
              borderRadius: "0",
              border: "none",
              background: "transparent",
              display: "grid",
              placeItems: "center",
              cursor: "pointer",
            }}
          >
            <span
              style={{
                fontSize: "16px",
                color: "rgba(255,255,255,0.72)",
                lineHeight: 1,
              }}
            >
              {open ? "x" : "≡"}
            </span>
          </button>

          <NavLink
            to="/"
            onClick={(e) => {
              e.preventDefault();
              setOpen(false);
              navigate("/");
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            style={{
              justifySelf: "center",
              textDecoration: "none",
              color: "rgba(255,255,255,0.92)",
              fontSize: "12px",
              fontWeight: 400,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              fontFamily: "'JetBrains Mono','Inter',sans-serif",
              display: "inline-flex",
              alignItems: "center",
              gap: "9px",
            }}
          >
            <span
              style={{
                width: "7px",
                height: "7px",
                borderRadius: "999px",
                background: "#4ade80",
                boxShadow: "0 0 8px rgba(74,222,128,0.55)",
                display: "inline-block",
              }}
            />
            PREJIN PR
          </NavLink>

          <div />
        </div>
      </MotionDiv>

      <AnimatePresence>
        {open && (
          <>
            <MotionDiv
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setOpen(false)}
              style={{
                position: "fixed",
                inset: 0,
                zIndex: 200,
                background: "rgba(12,14,22,0.46)",
                backdropFilter: "blur(4px)",
              }}
            />

            <MotionNav
              initial={{ opacity: 0, y: -26, scale: 0.98, x: "-50%" }}
              animate={{ opacity: 1, y: 0, scale: 1, x: "-50%" }}
              exit={{ opacity: 0, y: -16, scale: 0.985, x: "-50%" }}
              transition={{ duration: 0.35, ease }}
              style={{
                position: "fixed",
                left: "50%",
                top: "max(12px, env(safe-area-inset-top))",
                bottom: "max(12px, env(safe-area-inset-bottom))",
                width: "calc(100% - 40px)",
                maxWidth: "620px",
                zIndex: 215,
                borderRadius: "18px",
                border: "1px solid rgba(255,255,255,0.14)",
                background: "#181a20",
                backdropFilter: "blur(20px)",
                WebkitBackdropFilter: "blur(20px)",
                boxShadow: "0 20px 60px rgba(0,0,0,0.2)",
                display: "grid",
                gridTemplateRows: "64px 1fr auto",
                overflow: "hidden",
              }}
            >
              <div style={{ display: "grid", gridTemplateColumns: "56px 1fr 56px", alignItems: "center", padding: "10px 14px 4px" }}>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  aria-label="Close menu"
                  style={{
                    width: "44px",
                    height: "44px",
                    borderRadius: "0",
                    border: "none",
                    background: "transparent",
                    display: "grid",
                    placeItems: "center",
                    cursor: "pointer",
                    color: "rgba(255,255,255,0.72)",
                    fontSize: "18px",
                  }}
                >
                  x
                </button>
                <span
                  style={{
                    justifySelf: "center",
                    color: "rgba(255,255,255,0.88)",
                    fontSize: "12px",
                    fontWeight: 400,
                    letterSpacing: "0.2em",
                    textTransform: "uppercase",
                    fontFamily: "'JetBrains Mono','Inter',sans-serif",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "9px",
                  }}
                >
                  <span
                    style={{
                      width: "7px",
                      height: "7px",
                      borderRadius: "999px",
                      background: "#4ade80",
                      boxShadow: "0 0 8px rgba(74,222,128,0.55)",
                      display: "inline-block",
                    }}
                  />
                  PREJIN PR
                </span>
                <div />
              </div>

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "clamp(6px, 1.4vh, 12px)",
                  padding: "10px 20px",
                  minHeight: 0,
                }}
              >
                {navLinks.map((l, i) => (
                  <motion.a
                    key={l.label}
                    href={l.hash ? `/#${l.hash}` : l.to}
                    onClick={(e) => handleNav(l, e)}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.035, duration: 0.2 }}
                    style={{
                      textDecoration: "none",
                      color: "rgba(255,255,255,0.92)",
                      fontSize: "clamp(18px, 3.3vh, 33px)",
                      fontWeight: 300,
                      lineHeight: 1,
                      letterSpacing: "0.05em",
                      textTransform: "uppercase",
                      fontFamily: "'NType82','Inter',sans-serif",
                      textAlign: "center",
                      borderBottom: "1px solid rgba(255,255,255,0.25)",
                      paddingBottom: "8px",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = "rgba(255,255,255,1)";
                      e.currentTarget.style.transform = "scale(1.02)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = "rgba(255,255,255,0.92)";
                      e.currentTarget.style.transform = "scale(1)";
                    }}
                  >
                    {l.label}
                  </motion.a>
                ))}
              </div>

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "14px",
                  flexWrap: "wrap",
                  padding: "8px 16px 12px",
                }}
              >
                {utilityLinks.map((l) => (
                  <a
                    key={l.label}
                    href={l.hash ? `/#${l.hash}` : l.to}
                    onClick={(e) => handleNav(l, e)}
                    style={{
                      textDecoration: "none",
                      color: "rgba(255,255,255,0.7)",
                      fontSize: "9.5px",
                      fontWeight: 300,
                      letterSpacing: "0.12em",
                      textTransform: "uppercase",
                    }}
                  >
                    {l.label}
                  </a>
                ))}
              </div>
            </MotionNav>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
