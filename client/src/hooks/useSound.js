import { useRef, useState, useCallback } from "react";

// Simple hook to control a single background-music audio element.
// Music never autoplays - it only starts after explicit user interaction,
// respecting browser autoplay restrictions.
export const useSound = (src) => {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  const getAudio = useCallback(() => {
    if (!audioRef.current && src) {
      audioRef.current = new Audio(src);
      audioRef.current.loop = true;
      audioRef.current.volume = 0.5;
    }
    return audioRef.current;
  }, [src]);

  const play = useCallback(() => {
    const audio = getAudio();
    if (audio) {
      audio.play().catch(() => {
        // Autoplay was blocked - user will need to tap again
      });
      setIsPlaying(true);
    }
  }, [getAudio]);

  const pause = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
    }
    setIsPlaying(false);
  }, []);

  const toggleMute = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.muted = !audioRef.current.muted;
      setIsMuted(audioRef.current.muted);
    }
  }, []);

  return { play, pause, toggleMute, isPlaying, isMuted };
};
