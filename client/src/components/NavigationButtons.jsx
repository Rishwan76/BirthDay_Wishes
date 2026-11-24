import { ChevronLeft, ChevronRight, RotateCcw } from "lucide-react";

/**
 * Cute scrapbook-style Back / Continue buttons for moving between pages.
 * Also renders a "Replay" button on the final page.
 */
const NavigationButtons = ({ onBack, onNext, isFirst, isLast, onReplay }) => (
  <div
    style={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      gap: 12,
      marginTop: 32,
      flexWrap: "wrap",
    }}
  >
    <button
      className="btn"
      onClick={onBack}
      disabled={isFirst}
      aria-label="Go to previous page"
      style={{
        display: "flex",
        alignItems: "center",
        gap: 6,
        background: isFirst ? "var(--light-pink)" : "var(--white)",
        color: "var(--dark-red)",
        border: "2px solid var(--dark-red)",
        borderRadius: 999,
        opacity: isFirst ? 0.4 : 1,
        fontWeight: 600,
      }}
    >
      <ChevronLeft size={18} /> Back
    </button>

    {isLast ? (
      <button
        className="btn"
        onClick={onReplay}
        aria-label="Replay the birthday experience"
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          background: "var(--dark-red)",
          color: "var(--white)",
          borderRadius: 999,
          fontWeight: 700,
          boxShadow: "var(--shadow-soft)",
        }}
      >
        <RotateCcw size={18} /> Replay Experience 🔄
      </button>
    ) : (
      <button
        className="btn"
        onClick={onNext}
        aria-label="Go to next page"
        style={{
          display: "flex",
          alignItems: "center",
          gap: 6,
          background: "var(--dark-red)",
          color: "var(--white)",
          borderRadius: 999,
          fontWeight: 700,
          boxShadow: "var(--shadow-soft)",
        }}
      >
        Continue <ChevronRight size={18} />
      </button>
    )}
  </div>
);

export default NavigationButtons;
