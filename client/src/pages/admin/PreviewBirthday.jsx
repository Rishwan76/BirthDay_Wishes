import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../../services/api";
import BirthdayExperienceView from "../../components/BirthdayExperienceView";

/**
 * Admin preview: loads a birthday by its database ID (not slug) and renders
 * the exact same animated experience the recipient would see.
 */
const PreviewBirthday = () => {
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

  if (loading) return <p style={{ padding: 40 }}>Loading preview...</p>;
  if (!birthday) return <p style={{ padding: 40 }}>Birthday not found.</p>;

  return (
    <>
      <Link
        to="/admin/dashboard"
        style={{
          position: "fixed",
          top: 14,
          left: 14,
          zIndex: 999,
          background: "var(--dark-red)",
          color: "var(--white)",
          padding: "8px 14px",
          borderRadius: 999,
          fontWeight: 600,
          fontSize: "0.85rem",
        }}
      >
        ← Back to Dashboard
      </Link>
      <BirthdayExperienceView birthday={birthday} />
    </>
  );
};

export default PreviewBirthday;
