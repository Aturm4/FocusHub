"use client";

import { motion } from "framer-motion";
import { Music, Pause, Play, Volume2, VolumeX } from "lucide-react";
import { useApp } from "@/providers/app-provider";
import { useTranslation } from "@/providers/locale-provider";
import { AMBIENT_TRACKS } from "@/lib/constants";
import type { AmbientSound } from "@/types";
import { cn } from "@/utils/cn";

const trackKeys: Record<string, string> = {
  lofi: "music.lofi",
  rain: "music.rain",
  cafe: "music.cafe",
  nature: "music.nature",
};

export function AmbientPlayer({ compact = false }: { compact?: boolean }) {
  const { ambient } = useApp();
  const { t } = useTranslation();
  const { activeSound, isPlaying, volume, play, toggle, setVol, stop } = ambient;

  if (compact) {
    return (
      <div className="flex items-center gap-2">
        <button
          onClick={() => (isPlaying ? toggle() : play("lofi"))}
          className="rounded-lg p-2 text-fg-muted hover:bg-slate-100 hover:text-fg dark:hover:bg-white/10 dark:hover:text-white"
          aria-label={t("music.title")}
        >
          {isPlaying ? <Pause className="h-4 w-4" /> : <Music className="h-4 w-4" />}
        </button>
      </div>
    );
  }

  return (
    <motion.div
      layout
      className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-xl"
    >
      <div className="mb-3 flex items-center gap-2">
        <Music className="h-4 w-4 text-violet-400" />
        <span className="text-sm font-medium text-fg">{t("music.title")}</span>
      </div>
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
        {AMBIENT_TRACKS.map((track) => (
          <button
            key={track.id}
            onClick={() =>
              activeSound === track.id && isPlaying
                ? stop()
                : play(track.id as AmbientSound)
            }
            className={cn(
              "rounded-xl px-3 py-2 text-xs font-medium transition-all",
              activeSound === track.id && isPlaying
                ? "bg-violet-600 text-white shadow-lg shadow-violet-500/25"
                : "bg-surface text-fg-muted hover:bg-surface-hover hover:text-fg"
            )}
          >
            {t(trackKeys[track.id])}
          </button>
        ))}
      </div>
      <div className="mt-3 flex items-center gap-3">
        <button
          onClick={toggle}
          disabled={activeSound === "none"}
          className="rounded-lg bg-surface-hover p-2 text-fg disabled:opacity-30"
        >
          {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
        </button>
        <div className="flex flex-1 items-center gap-2">
          {volume === 0 ? (
            <VolumeX className="h-4 w-4 text-fg-subtle" />
          ) : (
            <Volume2 className="h-4 w-4 text-fg-subtle" />
          )}
          <input
            type="range"
            min="0"
            max="1"
            step="0.05"
            value={volume}
            onChange={(e) => setVol(parseFloat(e.target.value))}
            className="h-1 flex-1 cursor-pointer appearance-none rounded-full bg-white/10 accent-violet-500"
          />
        </div>
        <span className="text-xs text-fg-subtle">{Math.round(volume * 100)}%</span>
      </div>
    </motion.div>
  );
}
