import { motion } from "framer-motion";
import ScrapbookPage from "./ScrapbookPage";
import Polaroid from "./Polaroid";
import Tape from "./Tape";

const NOTES = [
  "Best memories ❤️",
  "Forever laughing 😂",
  "Crazy but unforgettable!",
  "More memories to come...",
];

const ROTATIONS = [-4, 3, -2, 4, -3, 2];

/** Page 6: A dense, organic scrapbook collage of photos + handwritten notes. */
const MemoryCollage = ({ photos = [] }) => {
  const displayPhotos = photos.slice(0, 6);

  return (
    <ScrapbookPage>
      <h2 className="heading-serif" style={{ textAlign: "center", fontSize: "clamp(1.8rem, 4vw, 2.6rem)" }}>
        Our Little Scrapbook 📎
      </h2>
      <div className="section-divider" />

      <div style={{ display: "flex", flexWrap: "wrap", gap: 24, justifyContent: "center", marginTop: 20 }}>
        {displayPhotos.map((photo, i) => (
          <div key={photo._id || i} style={{ position: "relative", maxWidth: 200 }}>
            <Tape style={{ left: "50%" }} rotate={ROTATIONS[i % ROTATIONS.length]} />
            <Polaroid
              image={photo.url}
              caption={photo.caption}
              rotation={ROTATIONS[i % ROTATIONS.length]}
              delay={i * 0.1}
            />
          </div>
        ))}

        {NOTES.map((note, i) => (
          <motion.div
            key={note}
            className="note-card"
            style={{ maxWidth: 180, transform: `rotate(${ROTATIONS[(i + 2) % ROTATIONS.length]}deg)` }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 + i * 0.15 }}
          >
            {note}
          </motion.div>
        ))}
      </div>
    </ScrapbookPage>
  );
};

export default MemoryCollage;
