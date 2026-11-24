import ScrapbookPage from "./ScrapbookPage";
import Polaroid from "./Polaroid";
import { motion } from "framer-motion";

const FALLBACK_CAPTIONS = [
  "One of my favorite memories ❤️",
  "Always smiling...",
  "Crazy moments 😂",
  "This one gets me every time",
  "Never forgetting this day",
  "Just us being us",
];

const ROTATIONS = [-3, 2, -1, 3, -2, 1];

/** Page 3: Interactive photo memory grid, polaroid style. */
const PhotoMemory = ({ photos = [] }) => {
  const displayPhotos = photos.length > 0 ? photos : [];

  return (
    <ScrapbookPage>
      <motion.h2
        className="heading-serif"
        style={{ fontSize: "clamp(1.8rem, 4vw, 2.6rem)", textAlign: "center" }}
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        Photo Memories 📸
      </motion.h2>
      <div className="section-divider" />

      {displayPhotos.length === 0 ? (
        <p style={{ textAlign: "center", color: "var(--dark)", opacity: 0.7 }}>
          Photos will appear here once they're added to this birthday.
        </p>
      ) : (
        <div className="photo-grid">
          {displayPhotos.map((photo, i) => (
            <Polaroid
              key={photo._id || i}
              image={photo.url}
              caption={photo.caption || FALLBACK_CAPTIONS[i % FALLBACK_CAPTIONS.length]}
              rotation={ROTATIONS[i % ROTATIONS.length]}
              delay={i * 0.12}
            />
          ))}
        </div>
      )}
    </ScrapbookPage>
  );
};

export default PhotoMemory;
