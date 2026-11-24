import { Link } from "react-router-dom";
import { motion } from "framer-motion";

/** Friendly error page shown when a birthday slug doesn't exist. */
const NotFound = ({ message }) => (
  <div className="scrapbook-root">
    <motion.div
      className="paper-page"
      style={{ maxWidth: 520, textAlign: "center" }}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
    >
      <div className="gingham-border" />
      <div style={{ position: "relative", zIndex: 2 }}>
        <div style={{ fontSize: "3rem" }}>💔</div>
        <h2 className="heading-serif" style={{ fontSize: "1.6rem", marginTop: 12 }}>
          {message || "Oops! This birthday surprise couldn't be found ❤️"}
        </h2>
        <Link
          to="/"
          className="btn"
          style={{
            display: "inline-block",
            marginTop: 24,
            background: "var(--dark-red)",
            color: "var(--white)",
            borderRadius: 999,
            fontWeight: 700,
          }}
        >
          Go Home
        </Link>
      </div>
    </motion.div>
  </div>
);

export default NotFound;
