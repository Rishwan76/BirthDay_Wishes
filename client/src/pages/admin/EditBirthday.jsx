import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import api from "../../services/api";
import BirthdayForm from "../../components/BirthdayForm";

const EditBirthday = () => {
  const { id } = useParams();
  const [birthday, setBirthday] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOne = async () => {
      try {
        const { data } = await api.get(`/birthdays/id/${id}`);
        setBirthday(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchOne();
  }, [id]);

  return (
    <div style={{ minHeight: "100vh", background: "var(--cream)", padding: "clamp(16px, 4vw, 40px)" }}>
      <div style={{ maxWidth: 720, margin: "0 auto" }}>
        <Link to="/admin/dashboard" style={{ display: "inline-flex", alignItems: "center", gap: 6, color: "var(--dark-red)", fontWeight: 600, marginBottom: 16 }}>
          <ArrowLeft size={18} /> Back to Dashboard
        </Link>
        <div className="paper-page">
          <h1 className="heading-serif" style={{ fontSize: "1.6rem", marginBottom: 20 }}>Edit Birthday Experience</h1>
          {loading ? <p>Loading...</p> : birthday ? <BirthdayForm initialData={birthday} /> : <p>Birthday not found.</p>}
        </div>
      </div>
    </div>
  );
};

export default EditBirthday;
