import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import api from "../../services/api";

const AdminRegister = () => {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      await api.post("/auth/register", form);
      setForm({ name: "", email: "", password: "" });
      setSuccess("Admin account created successfully.");
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
          <h1 className="heading-serif" style={{ fontSize: "1.8rem", textAlign: "center" }}>Register Admin</h1>
          <form onSubmit={handleSubmit} style={{ marginTop: 24, display: "flex", flexDirection: "column", gap: 14 }}>
            <label>
              Name
              <input required value={form.name} onChange={(event) => setForm({ ...form, name: event.target.value })} style={inputStyle} />
            </label>
            <label>
              Email
              <input type="email" required value={form.email} onChange={(event) => setForm({ ...form, email: event.target.value })} style={inputStyle} />
            </label>
            <label>
              Password
              <input type="password" required minLength={6} value={form.password} onChange={(event) => setForm({ ...form, password: event.target.value })} style={inputStyle} />
            </label>
            {error && <p style={{ color: "var(--dark-red)" }}>{error}</p>}
            {success && <p style={{ color: "green" }}>{success}</p>}
            <button type="submit" disabled={loading} className="btn" style={buttonStyle}>
              {loading ? "Creating..." : "Create Account"}
            </button>
          </form>
          <p style={{ marginTop: 18, textAlign: "center" }}>
            <Link to="/admin/dashboard" style={{ color: "var(--dark-red)", fontWeight: 600 }}>Back to dashboard</Link>
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

const buttonStyle = {
  background: "var(--dark-red)",
  color: "var(--white)",
  borderRadius: 999,
  fontWeight: 700,
  marginTop: 8,
};

export default AdminRegister;
