import { useMemo } from "react";

const COLORS = ["var(--red)", "var(--pink)", "var(--orange)", "var(--dark-red)"];

/** Balloons that drift upward slowly for the final celebration page. */
const Balloons = ({ count = 6 }) => {
  const balloons = useMemo(
    () =>
      Array.from({ length: count }).map((_, i) => ({
        id: i,
        left: 8 + i * (84 / count) + Math.random() * 5,
        delay: Math.random() * 3,
        duration: 8 + Math.random() * 4,
        color: COLORS[i % COLORS.length],
      })),
    [count]
  );

  return (
    <div
      aria-hidden="true"
      style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none", zIndex: 1 }}
    >
      {balloons.map((b) => (
        <div
          key={b.id}
          style={{
            position: "absolute",
            bottom: "-20%",
            left: `${b.left}%`,
            width: 36,
            height: 46,
            borderRadius: "50% 50% 50% 50% / 60% 60% 40% 40%",
            background: b.color,
            animation: `floatUp ${b.duration}s ease-in ${b.delay}s infinite`,
            "--drift": "10px",
            opacity: 0.85,
            willChange: "transform, opacity",
          }}
        />
      ))}
    </div>
  );
};

export default Balloons;
