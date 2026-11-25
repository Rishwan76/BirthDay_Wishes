import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Plus, Trash2, Pencil, Eye, Link as LinkIcon, LogOut } from "lucide-react";
import api from "../../services/api";
import { useAuth } from "../../context/AuthContext";

const Dashboard = () => {
  const { admin, logout } = useAuth();
  const navigate = useNavigate();
  const [birthdays, setBirthdays] = useState([]);
  const [loading, setLoading] = useState(true);
  const [copiedId, setCopiedId] = useState(null);

  const fetchBirthdays = async () => {
    try {
      setLoading(true);
      const { data } = await api.get("/birthdays");
      setBirthdays(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBirthdays();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this birthday experience? This can't be undone.")) return;
    try {
      await api.delete(`/birthdays/${id}`);
      setBirthdays((prev) => prev.filter((b) => b._id !== id));
    } catch (err) {
      alert(err.response?.data?.message || "Failed to delete");
    }
  };

  const handleCopyLink = (slug, id) => {
    const url = `${window.location.origin}/birthday/${slug}`;
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 1800);
  };

  const handleLogout = () => {
    logout();
    navigate("/admin/login");
  };

  return (
    <div style={{ minHeight: "100vh", background: "var(--cream)", padding: "clamp(16px, 4vw, 40px)" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
          <div>
            <h1 className="heading-serif" style={{ fontSize: "1.8rem" }}>Admin Dashboard</h1>
            <p style={{ opacity: 0.7 }}>Welcome back, {admin?.name} 🎂</p>
          </div>
          <div style={{ display: "flex", gap: 10 }}>
            <Link
              to="/admin/birthdays/new"
              className="btn"
              style={{ background: "var(--dark-red)", color: "var(--white)", borderRadius: 999, fontWeight: 700, display: "flex", alignItems: "center", gap: 6 }}
            >
              <Plus size={18} /> Create Birthday
            </Link>
            <button onClick={handleLogout} className="btn" style={{ background: "var(--white)", border: "2px solid var(--dark-red)", color: "var(--dark-red)", borderRadius: 999, display: "flex", alignItems: "center", gap: 6 }}>
              <LogOut size={18} /> Logout
            </button>
          </div>
        </div>

        <div style={{ marginTop: 30 }}>
          {loading ? (
            <p>Loading birthdays...</p>
          ) : birthdays.length === 0 ? (
            <div className="paper-page" style={{ textAlign: "center", padding: 40 }}>
              <p>No birthday experiences yet. Create your first one! 🎁</p>
            </div>
          ) : (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 20 }}>
              {birthdays.map((b) => (
                <div key={b._id} className="paper-page" style={{ padding: 20 }}>
                  <h3 className="heading-serif" style={{ fontSize: "1.3rem" }}>{b.recipientName}</h3>
                  <p style={{ fontSize: "0.85rem", opacity: 0.65, marginTop: 2 }}>/birthday/{b.slug}</p>
                  <p style={{ fontSize: "0.85rem", opacity: 0.65 }}>Theme: {b.theme}</p>
                  <p style={{ fontSize: "0.85rem", opacity: 0.65 }}>{b.photos?.length || 0} photos</p>

                  <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 14 }}>
                    <Link to={`/admin/birthdays/${b._id}/edit`} className="btn" style={iconBtnStyle}>
                      <Pencil size={15} /> Edit
                    </Link>
                    <Link to={`/birthday-preview/${b._id}`} target="_blank" className="btn" style={iconBtnStyle}>
                      <Eye size={15} /> Preview
                    </Link>
                    <button onClick={() => handleCopyLink(b.slug, b._id)} className="btn" style={iconBtnStyle}>
                      <LinkIcon size={15} /> {copiedId === b._id ? "Copied!" : "Copy Link"}
                    </button>
                    <button
                      onClick={() => handleDelete(b._id)}
                      className="btn"
                      style={{ ...iconBtnStyle, color: "var(--dark-red)", borderColor: "var(--dark-red)" }}
                    >
                      <Trash2 size={15} /> Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const iconBtnStyle = {
  display: "flex",
  alignItems: "center",
  gap: 5,
  fontSize: "0.85rem",
  padding: "7px 12px",
  border: "1px solid var(--light-pink)",
  borderRadius: 999,
  background: "var(--white)",
};

export default Dashboard;
