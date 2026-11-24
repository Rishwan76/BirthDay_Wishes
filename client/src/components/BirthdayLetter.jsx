import { useEffect, useState, useRef } from "react";
import ScrapbookPage from "./ScrapbookPage";

/** Page 4: Typewriter-animated personal letter, diary-page style. */
const BirthdayLetter = ({ recipientName, letter }) => {
  const fullText =
    letter && letter.trim().length > 0
      ? letter
      : `Happy Birthday, ${recipientName || "friend"}! ❤️\n\nI honestly don't know how to put into words how grateful I am to have you in my life.\n\nThank you for being my biggest supporter and the person I can always count on.\n\nI hope this year brings you everything you've been wishing for — happiness, success, and countless reasons to smile.\n\nYou deserve nothing but the very best.`;

  const [displayed, setDisplayed] = useState("");
  const indexRef = useRef(0);

  useEffect(() => {
    indexRef.current = 0;
    setDisplayed("");
    const interval = setInterval(() => {
      indexRef.current += 1;
      setDisplayed(fullText.slice(0, indexRef.current));
      if (indexRef.current >= fullText.length) {
        clearInterval(interval);
      }
    }, 22);
    return () => clearInterval(interval);
  }, [fullText]);

  const isDone = displayed.length >= fullText.length;

  return (
    <ScrapbookPage maxWidth={880}>
      <h2 className="heading-script" style={{ fontSize: "clamp(2rem, 5vw, 3rem)" }}>
        Dear {recipientName || "Bestie"}, ❤️
      </h2>
      <div className="section-divider" style={{ marginLeft: 0 }} />

      <div
        className="handwritten nowrap-safe"
        style={{ fontSize: "clamp(1.1rem, 2.4vw, 1.5rem)", whiteSpace: "pre-wrap", minHeight: 220, lineHeight: 1.5 }}
      >
        {displayed}
        {!isDone && <span className="typewriter-cursor" style={{ height: "1.2em" }} />}
      </div>

      {isDone && (
        <p className="heading-script" style={{ marginTop: 20, fontSize: "1.6rem" }}>
          With lots of love ❤️
        </p>
      )}
    </ScrapbookPage>
  );
};

export default BirthdayLetter;
