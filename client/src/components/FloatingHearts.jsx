import { useMemo } from "react";

/**
 * Renders a small, fixed number of floating hearts drifting upward.
 * Kept deliberately lightweight (max ~14 elements) to stay performant -
 * uses only CSS transforms/opacity (see animations.css: floatUp).
 */
const FloatingHearts = ({ count = 10 }) => {
  const hearts = useMemo(
    () =>
      Array.from({ length: count }).map((_, i) => ({
        id: i,
        left: Math.random() * 100,
        size: 14 + Math.random() * 18,
        delay: Math.random() * 6,
        duration: 6 + Math.random() * 5,
        drift: `${Math.random() * 60 - 30}px`,
      })),
    [count]
  );

  return (
    <div
      aria-hidden="true"
      style={{
        position: "absolute",
        inset: 0,
        overflow: "hidden",
        pointerEvents: "none",
        zIndex: 1,
      }}
    >
      {hearts.map((h) => (
        <span
          key={h.id}
          style={{
            position: "absolute",
            left: `${h.left}%`,
            bottom: "-10%",
            fontSize: h.size,
            color: "var(--pink)",
            "--drift": h.drift,
            animation: `floatUp ${h.duration}s ease-in ${h.delay}s infinite`,
            willChange: "transform, opacity",
          }}
        >
          ❤
        </span>
      ))}
    </div>
  );
};

export default FloatingHearts;
