import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

const S = {
  page: {
    minHeight: "100vh", background: "#06060b",
    display: "flex", alignItems: "center", justifyContent: "center",
    fontFamily: "'Inter', sans-serif",
  },
  card: {
    width: "380px", background: "rgba(255,255,255,0.03)",
    border: "1px solid rgba(255,255,255,0.08)", borderRadius: "20px",
    padding: "40px 36px",
  },
  label: {
    display: "block", fontSize: "11px", letterSpacing: "0.14em",
    textTransform: "uppercase", color: "rgba(255,255,255,0.32)",
    marginBottom: "8px",
  },
  input: {
    width: "100%", background: "rgba(255,255,255,0.05)",
    border: "1px solid rgba(255,255,255,0.1)", borderRadius: "9px",
    padding: "11px 14px", color: "rgba(255,255,255,0.88)",
    fontSize: "14px", outline: "none", fontFamily: "Inter, sans-serif",
    boxSizing: "border-box",
  },
  btn: {
    width: "100%", padding: "12px", borderRadius: "10px",
    background: "#4ade80", border: "none", color: "#040404",
    fontSize: "14px", fontWeight: 500, cursor: "pointer",
    marginTop: "8px", fontFamily: "Inter, sans-serif",
  },
};

export default function AdminLogin() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setBusy(true);
    try {
      await login(email, password);
      navigate("/admin/overview");
    } catch (err) {
      setError("Invalid credentials. Check email & password.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div style={S.page}>
      <div style={S.card}>
        {/* Logo */}
        <div style={{ marginBottom: "32px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "6px" }}>
            <div style={{ width: "7px", height: "7px", borderRadius: "50%", background: "#4ade80" }} />
            <span style={{ fontSize: "13px", color: "rgba(255,255,255,0.55)", letterSpacing: "0.12em" }}>
              PREJIN PR — ADMIN
            </span>
          </div>
          <h1 style={{ fontSize: "22px", fontWeight: 400, color: "rgba(255,255,255,0.88)", margin: 0 }}>
            Sign in
          </h1>
        </div>

        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
          <div>
            <label style={S.label}>Email</label>
            <input
              style={S.input}
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoFocus
            />
          </div>
          <div>
            <label style={S.label}>Password</label>
            <input
              style={S.input}
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {error && (
            <div style={{
              padding: "10px 14px", borderRadius: "8px",
              background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.2)",
              color: "rgba(239,68,68,0.85)", fontSize: "12.5px",
            }}>{error}</div>
          )}

          <button style={{ ...S.btn, opacity: busy ? 0.6 : 1 }} type="submit" disabled={busy}>
            {busy ? "Signing in…" : "Sign in"}
          </button>
        </form>

        <p style={{ fontSize: "11.5px", color: "rgba(255,255,255,0.2)", textAlign: "center", marginTop: "24px" }}>
          Create your account in Firebase Console → Authentication
        </p>
      </div>
    </div>
  );
}
