import { motion } from "framer-motion";
import ScrapbookPage from "./ScrapbookPage";
import Polaroid from "./Polaroid";
import FloatingHearts from "./FloatingHearts";
import FloatingStars from "./FloatingStars";

/** Page 2: The animated birthday cover with big heading and photos. */
const BirthdayCover = ({ recipientName, photos = [] }) => {
  const coverPhotos = photos.slice(0, 2);

  return (
    <ScrapbookPage>
      <FloatingHearts count={6} />
      <FloatingStars count={10} />
      <div className="two-col">
        <div>
          <motion.h1
            className="heading-serif"
            style={{ fontSize: "clamp(2.4rem, 6vw, 4rem)" }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            HAPPY
          </motion.h1>
          <motion.h2
            className="heading-script"
            style={{ fontSize: "clamp(3rem, 9vw, 6rem)", marginTop: -8 }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.7 }}
          >
            Birthday
          </motion.h2>

          <motion.p
            className="nowrap-safe"
            style={{ marginTop: 20, fontSize: "1.05rem", maxWidth: 460, color: "var(--dark)" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9, duration: 0.6 }}
          >
            Happy birthday! Wishing you a little bit of happiness, love, laughter, and joy
            today and always.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.2, duration: 0.5 }}
            style={{ marginTop: 28 }}
          >
            <span className="ribbon">{recipientName} ❤️</span>
          </motion.div>
        </div>

        <div style={{ display: "flex", gap: 20, flexWrap: "wrap", justifyContent: "center" }}>
          {coverPhotos.length > 0 ? (
            coverPhotos.map((p, i) => (
              <div key={i} style={{ maxWidth: 220 }}>
                <Polaroid
                  image={p.url}
                  caption={p.caption}
                  rotation={i % 2 === 0 ? -5 : 4}
                  delay={1.4 + i * 0.2}
                  withClip={i === 0}
                />
              </div>
            ))
          ) : (
            <div style={{ maxWidth: 220 }}>
              <Polaroid
                image="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='300' height='300'><rect width='100%25' height='100%25' fill='%23FFD6DE'/></svg>"
                caption="A memory together"
                rotation={-4}
                delay={1.4}
              />
            </div>
          )}
        </div>
      </div>
    </ScrapbookPage>
  );
};

export default BirthdayCover;
