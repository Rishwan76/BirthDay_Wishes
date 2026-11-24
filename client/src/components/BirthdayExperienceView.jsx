import { useEffect, useState, useCallback, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useSound } from "../hooks/useSound";

import FloatingHearts from "./FloatingHearts";
import FloatingStars from "./FloatingStars";
import NavigationButtons from "./NavigationButtons";
import MusicControl from "./MusicControl";
import BirthdayCover from "./BirthdayCover";
import PhotoMemory from "./PhotoMemory";
import BirthdayLetter from "./BirthdayLetter";
import BirthdayWishes from "./BirthdayWishes";
import MemoryCollage from "./MemoryCollage";
import GiftBox from "./GiftBox";
import FinalCelebration from "./FinalCelebration";

const STEP_KEYS = ["cover", "photos", "letter", "wishes", "collage", "gift", "final"];

const WelcomeScreen = ({ recipientName, onOpen }) => (
  <div className="scrapbook-root" style={{ position: "relative" }}>
    <FloatingHearts count={10} />
    <FloatingStars count={14} />
    <motion.div
      className="paper-page"
      style={{ maxWidth: 560, textAlign: "center" }}
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
    >
      <div className="gingham-border" />
      <div style={{ position: "relative", zIndex: 2 }}>
        <p style={{ fontSize: "1.1rem" }}>Someone special has a birthday today...</p>
        <motion.p
          className="heading-script"
          style={{ fontSize: "clamp(1.5rem, 4vw, 2.2rem)", marginTop: 10 }}
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 2.5, repeat: Infinity }}
        >
          ✨ And this little surprise is just for {recipientName || "you"} ✨
        </motion.p>

        <motion.button
          className="btn float-btn"
          onClick={onOpen}
          style={{
            marginTop: 32,
            background: "var(--dark-red)",
            color: "var(--white)",
            borderRadius: 999,
            fontWeight: 700,
            fontSize: "1.05rem",
            padding: "14px 30px",
          }}
        >
          Open Your Birthday Surprise 🎁
        </motion.button>
      </div>
    </motion.div>
  </div>
);

const MusicPrompt = ({ onChoice }) => (
  <motion.div
    style={{
      position: "fixed",
      inset: 0,
      background: "rgba(43,29,29,0.55)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      zIndex: 500,
      padding: 20,
    }}
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
  >
    <div className="paper-page" style={{ maxWidth: 380, textAlign: "center" }}>
      <p className="heading-serif" style={{ fontSize: "1.4rem" }}>
        🎵 Turn on the music?
      </p>
      <div style={{ display: "flex", gap: 12, justifyContent: "center", marginTop: 20 }}>
        <button
          className="btn"
          onClick={() => onChoice(true)}
          style={{ background: "var(--dark-red)", color: "var(--white)", borderRadius: 999, fontWeight: 700 }}
        >
          Yes ❤️
        </button>
        <button
          className="btn"
          onClick={() => onChoice(false)}
          style={{ background: "var(--light-pink)", color: "var(--dark-red)", borderRadius: 999, fontWeight: 700 }}
        >
          No
        </button>
      </div>
    </div>
  </motion.div>
);

/**
 * Pure rendering component for the birthday story, given an already-fetched
 * birthday object. Shared by the public BirthdayExperience page and the
 * admin PreviewBirthday page so both show the exact same animation.
 */
const BirthdayExperienceView = ({ birthday }) => {
  const [started, setStarted] = useState(false);
  const [musicChoiceMade, setMusicChoiceMade] = useState(false);
  const [stepIndex, setStepIndex] = useState(0);
  const touchStartX = useRef(null);

  const { play, toggleMute, isPlaying, isMuted } = useSound(birthday?.musicUrl);

  const goNext = useCallback(() => setStepIndex((i) => Math.min(i + 1, STEP_KEYS.length - 1)), []);
  const goBack = useCallback(() => setStepIndex((i) => Math.max(i - 1, 0)), []);
  const replay = useCallback(() => setStepIndex(0), []);

  useEffect(() => {
    if (!started) return;
    const handler = (e) => {
      if (e.key === "ArrowRight") goNext();
      if (e.key === "ArrowLeft") goBack();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [started, goNext, goBack]);

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const handleTouchEnd = (e) => {
    if (touchStartX.current === null) return;
    const diff = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(diff) > 60) {
      if (diff < 0) goNext();
      else goBack();
    }
    touchStartX.current = null;
  };

  const handleMusicChoice = (wantsMusic) => {
    setMusicChoiceMade(true);
    if (wantsMusic && birthday?.musicUrl) play();
  };

  const theme = birthday?.theme ? birthday.theme.replace(/[^a-z-]/g, "") : "classic-red";

  if (!started) {
    return (
      <div data-theme={theme}>
        <WelcomeScreen recipientName={birthday.recipientName} onOpen={() => setStarted(true)} />
      </div>
    );
  }

  if (!musicChoiceMade && birthday.musicUrl) {
    return (
      <div data-theme={theme}>
        <MusicPrompt onChoice={handleMusicChoice} />
      </div>
    );
  }

  const currentKey = STEP_KEYS[stepIndex];
  const isFirst = stepIndex === 0;
  const isLast = stepIndex === STEP_KEYS.length - 1;

  const renderStep = () => {
    switch (currentKey) {
      case "cover":
        return <BirthdayCover recipientName={birthday.recipientName} photos={birthday.photos} />;
      case "photos":
        return <PhotoMemory photos={birthday.photos} />;
      case "letter":
        return <BirthdayLetter recipientName={birthday.recipientName} letter={birthday.personalLetter} />;
      case "wishes":
        return <BirthdayWishes />;
      case "collage":
        return <MemoryCollage photos={birthday.photos} />;
      case "gift":
        return <GiftBox recipientName={birthday.recipientName} />;
      case "final":
        return (
          <FinalCelebration
            recipientName={birthday.recipientName}
            wishes={birthday.wishes}
            finalMessage={birthday.finalMessage}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div data-theme={theme} onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd}>
      <AnimatePresence mode="wait">
        <motion.div key={currentKey}>{renderStep()}</motion.div>
      </AnimatePresence>

      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 clamp(16px, 4vw, 48px) 32px" }}>
        <NavigationButtons onBack={goBack} onNext={goNext} isFirst={isFirst} isLast={isLast} onReplay={replay} />
      </div>

      <MusicControl isPlaying={isPlaying} isMuted={isMuted} onToggle={toggleMute} />
    </div>
  );
};

export default BirthdayExperienceView;
