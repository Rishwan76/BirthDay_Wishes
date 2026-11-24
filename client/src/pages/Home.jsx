import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import FloatingHearts from "../components/FloatingHearts";
import FloatingStars from "../components/FloatingStars";

/**
 * The generic landing page (not tied to a specific birthday).
 * Real recipients arrive via /birthday/:slug directly, but this page
 * explains the product and links to the admin area.
 */
const Home = () => {
  return (
    <div className="scrapbook-root" style={{ position: "relative" }}>
      <FloatingHearts count={10} />
      <FloatingStars count={14} />

      <motion.div
        className="paper-page"
        style={{ maxWidth: 640, textAlign: "center" }}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        <div className="gingham-border" />
        <div style={{ position: "relative", zIndex: 2 }}>
          <h1 className="heading-serif" style={{ fontSize: "clamp(1.8rem, 5vw, 2.8rem)" }}>
            Birthday Memories
          </h1>
          <p className="handwritten" style={{ fontSize: "1.4rem", marginTop: 4 }}>
            Animated Birthday Wishes
          </p>

          <p style={{ marginTop: 24, color: "var(--dark)" }}>
            Someone special has a birthday today...
          </p>
          <motion.p
            className="heading-script"
            style={{ fontSize: "1.6rem", marginTop: 6 }}
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 2.5, repeat: Infinity }}
          >
            ✨ And this little surprise is just for you ✨
          </motion.p>

          <p style={{ marginTop: 24, fontSize: "0.95rem", opacity: 0.75 }}>
            This page is the app's home base. Open a personalized birthday link like{" "}
            <code>/birthday/your-slug</code> to view a birthday experience, or manage
            experiences from the admin dashboard.
          </p>

          <div style={{ display: "flex", gap: 12, justifyContent: "center", marginTop: 28, flexWrap: "wrap" }}>
            <Link
              to="/admin/login"
              className="btn float-btn"
              style={{
                background: "var(--dark-red)",
                color: "var(--white)",
                borderRadius: 999,
                fontWeight: 700,
              }}
            >
              Open Your Birthday Surprise 🎁
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Home;
