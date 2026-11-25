import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuth } from "../../context/AuthContext";

const AdminLogin = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setLoading(true);
    try {
      await login(form.email, form.password);
      navigate("/admin/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="scrapbook-root">
      <motion.div className="paper-page" style={{ maxWidth: 420 }} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <div className="gingham-border" />
        <div style={{ position: "relative", zIndex: 2 }}>
          <h1 className="heading-serif" style={{ fontSize: "1.8rem", textAlign: "center" }}>Admin Login</h1>
          <p style={{ textAlign: "center", opacity: 0.7, marginTop: 4 }}>Manage your birthday experiences</p>
          <form onSubmit={handleSubmit} style={{ marginTop: 24, display: "flex", flexDirection: "column", gap: 14 }}>
            <label>Email<input type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} style={inputStyle} /></label>
            <label>Password<input type="password" required value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} style={inputStyle} /></label>
            {error && <p style={{ color: "var(--dark-red)", fontSize: "0.9rem" }}>{error}</p>}
            <button type="submit" disabled={loading} className="btn" style={buttonStyle}>{loading ? "Logging in..." : "Log In"}</button>
          </form>
          <p style={{ marginTop: 18, textAlign: "center", fontSize: "0.9rem" }}>
            First-time setup? <Link to="/admin/register" style={{ color: "var(--dark-red)", fontWeight: 600 }}>Register</Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

const inputStyle = { width: "100%", padding: "10px 12px", marginTop: 4, borderRadius: 10, border: "1px solid var(--light-pink)", fontFamily: "inherit", fontSize: "1rem" };
const buttonStyle = { background: "var(--dark-red)", color: "var(--white)", borderRadius: 999, fontWeight: 700, marginTop: 8 };

export default AdminLogin;
