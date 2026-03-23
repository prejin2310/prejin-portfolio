import { Outlet, NavLink, Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

const navItems = [
  { to: "overview",     label: "Overview",      icon: "▦" },
  { to: "profile",      label: "Profile",       icon: "◎" },
  { to: "projects",     label: "Projects",      icon: "◫" },
  { to: "experience",   label: "Experience",    icon: "◈" },
  { to: "skills",       label: "Skills",        icon: "◈" },
  { to: "certificates", label: "Certificates",  icon: "◉" },
];

export default function AdminLayout() {
  const { user, loading, logout } = useAuth();
  const navigate = useNavigate();

  if (loading) {
    return (
      <div style={{ minHeight: "100vh", background: "#06060b", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ fontSize: "12px", letterSpacing: "0.2em", color: "rgba(255,255,255,0.3)" }}>LOADING…</div>
      </div>
    );
  }

  if (!user) return <Navigate to="/admin/login" replace />;

  const handleLogout = async () => {
    await logout();
    navigate("/admin/login");
  };

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#06060b", fontFamily: "'Inter', sans-serif" }}>

      {/* ── SIDEBAR ── */}
      <aside style={{
        width: "220px", flexShrink: 0,
        background: "#08080f",
        borderRight: "1px solid rgba(255,255,255,0.06)",
        display: "flex", flexDirection: "column",
        position: "fixed", top: 0, left: 0, bottom: 0, zIndex: 10,
      }}>
        {/* Brand */}
        <div style={{ padding: "28px 24px 20px", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#4ade80", flexShrink: 0 }} />
            <span style={{ fontSize: "11px", letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(255,255,255,0.5)" }}>
              Admin
            </span>
          </div>
          <div style={{ fontSize: "16px", color: "rgba(255,255,255,0.85)", marginTop: "6px", fontWeight: 400 }}>
            Dashboard
          </div>
        </div>

        {/* Nav links */}
        <nav style={{ flex: 1, padding: "16px 12px" }}>
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={`/admin/${item.to}`}
              style={({ isActive }) => ({
                display: "flex", alignItems: "center", gap: "10px",
                padding: "10px 12px", borderRadius: "10px",
                marginBottom: "2px", fontSize: "13.5px",
                textDecoration: "none", transition: "background 0.15s",
                color: isActive ? "#4ade80" : "rgba(255,255,255,0.5)",
                background: isActive ? "rgba(74,222,128,0.07)" : "transparent",
              })}
            >
              <span style={{ fontSize: "11px", opacity: 0.6 }}>{item.icon}</span>
              {item.label}
            </NavLink>
          ))}
        </nav>

        {/* User + Logout */}
        <div style={{ padding: "16px 24px", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
          <div style={{ fontSize: "11px", color: "rgba(255,255,255,0.28)", marginBottom: "10px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
            {user.email}
          </div>
          <button
            onClick={handleLogout}
            style={{
              width: "100%", padding: "8px", borderRadius: "8px", fontSize: "12px",
              background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)",
              color: "rgba(255,255,255,0.42)", cursor: "pointer", fontFamily: "Inter, sans-serif",
              transition: "background 0.15s",
            }}
            onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(239,68,68,0.08)"; e.currentTarget.style.color = "rgba(239,68,68,0.8)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.04)"; e.currentTarget.style.color = "rgba(255,255,255,0.42)"; }}
          >
            Sign out
          </button>

          {/* Portfolio link */}
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "flex", alignItems: "center", justifyContent: "center", gap: "5px",
              marginTop: "8px", padding: "7px", borderRadius: "8px", fontSize: "11.5px",
              background: "transparent", border: "1px solid rgba(255,255,255,0.06)",
              color: "rgba(255,255,255,0.28)", textDecoration: "none",
              transition: "color 0.15s, border-color 0.15s",
            }}
            onMouseEnter={(e) => { e.currentTarget.style.color = "rgba(255,255,255,0.6)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.15)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.color = "rgba(255,255,255,0.28)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.06)"; }}
          >
            ↗ View Portfolio
          </a>
        </div>
      </aside>

      {/* ── MAIN CONTENT ── */}
      <main style={{ flex: 1, marginLeft: "220px", minHeight: "100vh", overflow: "auto" }}>
        <Outlet />
      </main>
    </div>
  );
}
