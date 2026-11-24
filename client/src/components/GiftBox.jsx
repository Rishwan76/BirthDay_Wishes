import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ScrapbookPage from "./ScrapbookPage";
import Confetti from "./Confetti";
import FloatingHearts from "./FloatingHearts";

/** Page 7: Interactive gift box that opens to reveal a birthday message. */
const GiftBox = ({ recipientName }) => {
  const [opened, setOpened] = useState(false);
  const [shaking, setShaking] = useState(false);

  const handleOpen = () => {
    setShaking(true);
    setTimeout(() => {
      setShaking(false);
      setOpened(true);
    }, 700);
  };

  return (
    <ScrapbookPage>
      {opened && <Confetti count={50} />}
      {opened && <FloatingHearts count={10} />}

      <div style={{ textAlign: "center", padding: "20px 0", minHeight: 280 }}>
        <AnimatePresence mode="wait">
          {!opened ? (
            <motion.div key="closed" exit={{ opacity: 0, scale: 0.8 }}>
              <p className="handwritten" style={{ fontSize: "1.6rem" }}>
                Wait...
              </p>
              <p className="heading-serif" style={{ fontSize: "clamp(1.6rem, 4vw, 2.2rem)", margin: "8px 0 28px" }}>
                There's one more surprise!
              </p>

              <motion.div
                animate={shaking ? { x: [0, -8, 8, -8, 8, 0], rotate: [0, -4, 4, -4, 0] } : {}}
                transition={{ duration: 0.6 }}
                style={{ fontSize: "6rem", cursor: "pointer" }}
                onClick={handleOpen}
                role="button"
                tabIndex={0}
                aria-label="Open the surprise gift"
                onKeyDown={(e) => e.key === "Enter" && handleOpen()}
              >
                🎁
              </motion.div>

              <button
                className="btn"
                onClick={handleOpen}
                style={{
                  marginTop: 20,
                  background: "var(--dark-red)",
                  color: "var(--white)",
                  borderRadius: 999,
                  fontWeight: 700,
                  boxShadow: "var(--shadow-soft)",
                }}
              >
                Open It ❤️
              </button>
            </motion.div>
          ) : (
            <motion.div
              key="open"
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: "spring", stiffness: 140, damping: 12 }}
            >
              <div style={{ fontSize: "5rem" }}>✨🎉✨</div>
              <p className="heading-script" style={{ fontSize: "clamp(2rem, 6vw, 3.2rem)", marginTop: 10 }}>
                Happy Birthday, {recipientName}! ❤️
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </ScrapbookPage>
  );
};

export default GiftBox;
