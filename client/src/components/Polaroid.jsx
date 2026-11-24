import { motion } from "framer-motion";

/**
 * A reusable polaroid-style photo card.
 * Props:
 *  - image: photo URL
 *  - caption: handwritten caption text
 *  - rotation: base rotation in degrees (e.g. -3)
 *  - delay: entrance animation delay (seconds)
 *  - withClip: show a paper clip on top
 */
const Polaroid = ({ image, caption, rotation = 0, delay = 0, withClip = false, alt = "" }) => (
  <motion.figure
    className="polaroid"
    style={{ transform: `rotate(${rotation}deg)`, margin: 0 }}
    initial={{ opacity: 0, y: -60, rotate: rotation - 8 }}
    animate={{ opacity: 1, y: 0, rotate: rotation }}
    transition={{ type: "spring", stiffness: 120, damping: 14, delay }}
    whileHover={{ scale: 1.04 }}
  >
    {withClip && <PaperClipInline />}
    <img
      src={image}
      alt={alt || caption || "Birthday memory"}
      loading="lazy"
      onError={(e) => {
        e.currentTarget.src =
          "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='300' height='300'><rect width='100%25' height='100%25' fill='%23FFD6DE'/></svg>";
      }}
    />
    {caption && <figcaption className="polaroid-caption">{caption}</figcaption>}
  </motion.figure>
);

// Small inline clip so Polaroid stays a single-file, dependency-light component
const PaperClipInline = () => (
  <div
    aria-hidden="true"
    style={{
      position: "absolute",
      top: -16,
      right: 10,
      width: 20,
      height: 40,
      border: "4px solid var(--dark-red)",
      borderRadius: 10,
      transform: "rotate(10deg)",
      opacity: 0.85,
    }}
  />
);

export default Polaroid;
