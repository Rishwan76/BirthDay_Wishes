import { useMemo } from "react";

/** Small twinkling stars scattered across the background. */
const FloatingStars = ({ count = 16 }) => {
  const stars = useMemo(
    () =>
      Array.from({ length: count }).map((_, i) => ({
        id: i,
        top: Math.random() * 100,
        left: Math.random() * 100,
        size: 6 + Math.random() * 10,
        delay: Math.random() * 4,
        duration: 2 + Math.random() * 3,
      })),
    [count]
  );

  return (
    <div
      aria-hidden="true"
      style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none", zIndex: 1 }}
    >
      {stars.map((s) => (
        <span
          key={s.id}
          style={{
            position: "absolute",
            top: `${s.top}%`,
            left: `${s.left}%`,
            width: s.size,
            height: s.size,
            borderRadius: "50%",
            background: "var(--orange)",
            animation: `twinkle ${s.duration}s ease-in-out ${s.delay}s infinite`,
            willChange: "transform, opacity",
          }}
        />
      ))}
    </div>
  );
};

export default FloatingStars;
