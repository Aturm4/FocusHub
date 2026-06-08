"use client";

import { useCallback, useRef, useState } from "react";
import { AMBIENT_TRACKS } from "@/lib/constants";
import type { AmbientSound } from "@/types";

export function useAmbient() {
  const [activeSound, setActiveSound] = useState<AmbientSound>("none");
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const play = useCallback(
    (sound: AmbientSound) => {
      if (sound === "none") {
        audioRef.current?.pause();
        setIsPlaying(false);
        setActiveSound("none");
        return;
      }

      const track = AMBIENT_TRACKS.find((t) => t.id === sound);
      if (!track) return;

      if (audioRef.current) {
        audioRef.current.pause();
      }

      const audio = new Audio(track.url);
      audio.loop = true;
      audio.volume = volume;
      audioRef.current = audio;
      audio.play().catch(() => {});
      setActiveSound(sound);
      setIsPlaying(true);
    },
    [volume]
  );

  const toggle = useCallback(() => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().catch(() => {});
      setIsPlaying(true);
    }
  }, [isPlaying]);

  const setVol = useCallback((v: number) => {
    setVolume(v);
    if (audioRef.current) audioRef.current.volume = v;
  }, []);

  const stop = useCallback(() => {
    audioRef.current?.pause();
    setIsPlaying(false);
    setActiveSound("none");
  }, []);

  return { activeSound, isPlaying, volume, play, toggle, setVol, stop };
}
