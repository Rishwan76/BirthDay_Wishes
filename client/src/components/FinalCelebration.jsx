import { motion } from "framer-motion";
import ScrapbookPage from "./ScrapbookPage";
import Confetti from "./Confetti";
import Balloons from "./Balloons";
import Fireworks from "./Fireworks";
import FloatingHearts from "./FloatingHearts";

const DEFAULT_WISHES = [
  "✨ Happiness",
  "❤️ Love",
  "🌸 Beautiful Memories",
  "🎂 Endless Celebrations",
  "🌟 Success",
  "😂 Lots of Laughter",
];

/** Page 8: The grand finale - confetti, fireworks, balloons, wish list. */
const FinalCelebration = ({ recipientName, wishes = [], finalMessage }) => {
  const wishList = wishes.length > 0 ? wishes : DEFAULT_WISHES;

  return (
    <ScrapbookPage
      style={{
        background: "linear-gradient(160deg, var(--white) 0%, var(--light-pink) 100%)",
      }}
    >
      <Confetti count={60} />
      <Balloons count={7} />
      <Fireworks bursts={3} />
      <FloatingHearts count={10} />

      <div style={{ textAlign: "center", position: "relative", zIndex: 3 }}>
        <motion.h1
          className="heading-serif"
          style={{ fontSize: "clamp(2rem, 6vw, 3.4rem)" }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          🎉 HAPPY BIRTHDAY 🎉
        </motion.h1>

        <motion.p
          className="heading-script"
          style={{ fontSize: "clamp(1.5rem, 4vw, 2.4rem)", marginTop: 8 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          To {recipientName || "the most amazing person"} ❤️
        </motion.p>

        <motion.p
          style={{ marginTop: 20, fontSize: "1.1rem" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
        >
          May your year be filled with...
        </motion.p>

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: 12,
            marginTop: 20,
          }}
        >
          {wishList.map((w, i) => (
            <motion.span
              key={w}
              className="sticker"
              style={{ width: "auto", padding: "10px 16px", borderRadius: 999, fontSize: "1rem" }}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 + i * 0.15 }}
            >
              {w}
            </motion.span>
          ))}
        </div>

        {finalMessage && (
          <motion.p
            className="handwritten"
            style={{ marginTop: 30, fontSize: "1.5rem" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.8 }}
          >
            {finalMessage}
          </motion.p>
        )}
      </div>
    </ScrapbookPage>
  );
};

export default FinalCelebration;
