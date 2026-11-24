import { useMemo } from "react";

/** Simple radiating "firework burst" made of small dots, positioned randomly. */
const Fireworks = ({ bursts = 3 }) => {
  const items = useMemo(
    () =>
      Array.from({ length: bursts }).map((_, i) => ({
        id: i,
        top: 15 + Math.random() * 40,
        left: 15 + Math.random() * 70,
        delay: i * 0.6,
        color: ["var(--red)", "var(--pink)", "var(--orange)"][i % 3],
      })),
    [bursts]
  );

  return (
    <div aria-hidden="true" style={{ position: "absolute", inset: 0, pointerEvents: "none", zIndex: 1 }}>
      {items.map((f) => (
        <div
          key={f.id}
          style={{
            position: "absolute",
            top: `${f.top}%`,
            left: `${f.left}%`,
            width: 6,
            height: 6,
          }}
        >
          {Array.from({ length: 10 }).map((_, j) => {
            const angle = (j / 10) * 360;
            return (
              <span
                key={j}
                style={{
                  position: "absolute",
                  width: 5,
                  height: 5,
                  borderRadius: "50%",
                  background: f.color,
                  "--a": `${angle}deg`,
                  animation: `fireworkPop 1.4s ease-out ${f.delay}s infinite`,
                  transformOrigin: "0 0",
                }}
              />
            );
          })}
        </div>
      ))}
      <style>{`
        @keyframes fireworkPop {
          0% { transform: rotate(var(--a,0deg)) translateX(0px); opacity: 1; }
          100% { transform: rotate(var(--a,0deg)) translateX(60px); opacity: 0; }
        }
      `}</style>
    </div>
  );
};

export default Fireworks;
