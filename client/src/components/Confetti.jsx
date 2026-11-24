import { useMemo } from "react";

const COLORS = ["var(--red)", "var(--pink)", "var(--orange)", "var(--dark-red)", "#FFD166"];

/** Falling confetti pieces - CSS-only, capped element count for performance. */
const Confetti = ({ count = 40, active = true }) => {
  const pieces = useMemo(
    () =>
      Array.from({ length: count }).map((_, i) => ({
        id: i,
        left: Math.random() * 100,
        size: 6 + Math.random() * 8,
        delay: Math.random() * 2.5,
        duration: 2.5 + Math.random() * 2.5,
        color: COLORS[i % COLORS.length],
        rounded: Math.random() > 0.5,
      })),
    [count]
  );

  if (!active) return null;

  return (
    <div
      aria-hidden="true"
      style={{ position: "fixed", inset: 0, overflow: "hidden", pointerEvents: "none", zIndex: 200 }}
    >
      {pieces.map((p) => (
        <span
          key={p.id}
          style={{
            position: "absolute",
            top: "-5%",
            left: `${p.left}%`,
            width: p.size,
            height: p.size * 1.4,
            background: p.color,
            borderRadius: p.rounded ? "50%" : "2px",
            animation: `fall ${p.duration}s linear ${p.delay}s infinite`,
            willChange: "transform, opacity",
          }}
        />
      ))}
    </div>
  );
};

export default Confetti;
