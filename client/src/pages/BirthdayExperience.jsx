import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import api from "../services/api";
import BirthdayExperienceView from "../components/BirthdayExperienceView";
import NotFound from "./NotFound";

const LoadingScreen = () => (
  <div className="scrapbook-root">
    <motion.div style={{ textAlign: "center" }} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <motion.div
        style={{ fontSize: "3.5rem" }}
        animate={{ scale: [1, 1.15, 1] }}
        transition={{ duration: 1.4, repeat: Infinity }}
      >
        ❤️ 🎁 ✨
      </motion.div>
      <p className="handwritten" style={{ fontSize: "1.4rem", marginTop: 12, color: "var(--dark-red)" }}>
        Preparing something special for you...
      </p>
    </motion.div>
  </div>
);

/**
 * Public entry point: /birthday/:slug
 * Fetches the birthday by its slug, then hands rendering off to
 * BirthdayExperienceView (shared with the admin preview page).
 */
const BirthdayExperience = () => {
  const { slug } = useParams();
  const [birthday, setBirthday] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBirthday = async () => {
      try {
        setLoading(true);
        const { data } = await api.get(`/birthdays/${slug}`);
        setBirthday(data);
        setError(null);
      } catch (err) {
        setError(err.response?.data?.message || "Oops! This birthday surprise couldn't be found ❤️");
      } finally {
        setLoading(false);
      }
    };
    fetchBirthday();
  }, [slug]);

  if (loading) return <LoadingScreen />;
  if (error || !birthday) return <NotFound message={error} />;

  return <BirthdayExperienceView birthday={birthday} />;
};

export default BirthdayExperience;
