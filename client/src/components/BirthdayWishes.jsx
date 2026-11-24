import { motion } from "framer-motion";
import ScrapbookPage from "./ScrapbookPage";
import FloatingHearts from "./FloatingHearts";

const lineVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i) => ({ opacity: 1, y: 0, transition: { delay: 0.3 + i * 0.4, duration: 0.6 } }),
};

/** Page 5: Big animated wish text, line by line. */
const BirthdayWishes = () => (
  <ScrapbookPage>
    <FloatingHearts count={8} />
    <div style={{ textAlign: "center", padding: "20px 0" }}>
      <motion.p
        className="handwritten"
        style={{ fontSize: "clamp(1.3rem, 3.2vw, 2rem)" }}
        custom={0}
        initial="hidden"
        animate="visible"
        variants={lineVariants}
      >
        May all the good things you've been waiting for...
      </motion.p>

      <motion.p
        className="heading-serif"
        style={{ fontSize: "clamp(2.4rem, 7vw, 4.2rem)", margin: "10px 0" }}
        custom={1}
        initial="hidden"
        animate="visible"
        variants={lineVariants}
      >
        FINALLY
      </motion.p>

      <motion.p
        className="heading-script"
        style={{ fontSize: "clamp(1.8rem, 5vw, 3rem)" }}
        custom={2}
        initial="hidden"
        animate="visible"
        variants={lineVariants}
      >
        FIND YOU THIS YEAR ❤️
      </motion.p>
    </div>
  </ScrapbookPage>
);

export default BirthdayWishes;
