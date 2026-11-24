import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import BirthdayForm from "../../components/BirthdayForm";

const CreateBirthday = () => (
  <div style={{ minHeight: "100vh", background: "var(--cream)", padding: "clamp(16px, 4vw, 40px)" }}>
    <div style={{ maxWidth: 720, margin: "0 auto" }}>
      <Link to="/admin/dashboard" style={{ display: "inline-flex", alignItems: "center", gap: 6, color: "var(--dark-red)", fontWeight: 600, marginBottom: 16 }}>
        <ArrowLeft size={18} /> Back to Dashboard
      </Link>
      <div className="paper-page">
        <h1 className="heading-serif" style={{ fontSize: "1.6rem", marginBottom: 20 }}>Create a Birthday Experience</h1>
        <BirthdayForm />
      </div>
    </div>
  </div>
);

export default CreateBirthday;
