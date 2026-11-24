import { motion } from "framer-motion";

/**
 * Shared wrapper for every "page" of the birthday experience.
 * Provides the paper background, gingham border, and a consistent
 * page-turn / fade transition via Framer Motion.
 */
export const pageVariants = {
  initial: { opacity: 0, x: 80, rotateY: -8 },
  animate: { opacity: 1, x: 0, rotateY: 0 },
  exit: { opacity: 0, x: -80, rotateY: 8 },
};

const ScrapbookPage = ({ children, showGingham = true, maxWidth = 1200, style = {} }) => (
  <motion.div
    className="scrapbook-root"
    initial="initial"
    animate="animate"
    exit="exit"
    variants={pageVariants}
    transition={{ duration: 0.6, ease: "easeInOut" }}
  >
    <div className="paper-page" style={{ maxWidth, ...style }}>
      {showGingham && (
        <>
          <div className="gingham-border" />
        </>
      )}
      <div style={{ position: "relative", zIndex: 2 }}>{children}</div>
    </div>
  </motion.div>
);

export default ScrapbookPage;
