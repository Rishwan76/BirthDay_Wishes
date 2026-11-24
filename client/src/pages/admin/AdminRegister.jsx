import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuth } from "../../context/AuthContext";

/** Initial admin setup screen. In production you may want to disable this after first use. */
const AdminRegister = () => {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await register(form.name, form.email, form.password);
      navigate("/admin/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="scrapbook-root">
      <motion.div className="paper-page" style={{ maxWidth: 420 }} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <div className="gingham-border" />
        <div style={{ position: "relative", zIndex: 2 }}>
          <h1 className="heading-serif" style={{ fontSize: "1.8rem", textAlign: "center" }}>
            Create Admin Account
          </h1>

          <form onSubmit={handleSubmit} style={{ marginTop: 24, display: "flex", flexDirection: "column", gap: 14 }}>
            <label>
              <span style={{ fontSize: "0.9rem", fontWeight: 600 }}>Name</span>
              <input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} style={inputStyle} />
            </label>
            <label>
              <span style={{ fontSize: "0.9rem", fontWeight: 600 }}>Email</span>
              <input type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} style={inputStyle} />
            </label>
            <label>
              <span style={{ fontSize: "0.9rem", fontWeight: 600 }}>Password</span>
              <input type="password" required minLength={6} value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} style={inputStyle} />
            </label>

            {error && <p style={{ color: "var(--dark-red)", fontSize: "0.9rem" }}>{error}</p>}

            <button type="submit" disabled={loading} className="btn" style={{ background: "var(--dark-red)", color: "var(--white)", borderRadius: 999, fontWeight: 700, marginTop: 8 }}>
              {loading ? "Creating..." : "Create Account"}
            </button>
          </form>

          <p style={{ marginTop: 18, textAlign: "center", fontSize: "0.9rem" }}>
            Already have an account? <Link to="/admin/login" style={{ color: "var(--dark-red)", fontWeight: 600 }}>Log in</Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

const inputStyle = {
  width: "100%",
  padding: "10px 12px",
  marginTop: 4,
  borderRadius: 10,
  border: "1px solid var(--light-pink)",
  fontFamily: "inherit",
  fontSize: "1rem",
};

export default AdminRegister;
