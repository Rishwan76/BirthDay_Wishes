import { Volume2, VolumeX } from "lucide-react";

/** Floating music toggle button, fixed to the corner of the screen. */
const MusicControl = ({ isPlaying, isMuted, onToggle }) => {
  if (!isPlaying) return null;

  return (
    <button
      onClick={onToggle}
      aria-label={isMuted ? "Unmute music" : "Mute music"}
      style={{
        position: "fixed",
        bottom: 20,
        right: 20,
        zIndex: 300,
        width: 52,
        height: 52,
        borderRadius: "50%",
        background: "var(--dark-red)",
        color: "var(--white)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        boxShadow: "var(--shadow-medium)",
      }}
    >
      {isMuted ? <VolumeX size={22} /> : <Volume2 size={22} />}
    </button>
  );
};

export default MusicControl;
