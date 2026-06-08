"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import type { TimerMode } from "@/types";
import { t, getStoredLocale } from "@/i18n";
import { useLocalStorage } from "./use-local-storage";

const MODES: Record<TimerMode, { focus: number; break: number }> = {
  "25/5": { focus: 25 * 60, break: 5 * 60 },
  "50/10": { focus: 50 * 60, break: 10 * 60 },
  custom: { focus: 25 * 60, break: 5 * 60 },
};

export function usePomodoro() {
  const [mode, setMode] = useLocalStorage<TimerMode>("fh-timer-mode", "25/5");
  const [customFocus, setCustomFocus] = useLocalStorage("fh-custom-focus", 25);
  const [customBreak, setCustomBreak] = useLocalStorage("fh-custom-break", 5);
  const [sessionType, setSessionType] = useState<"focus" | "break">("focus");
  const [timeLeft, setTimeLeft] = useState(MODES["25/5"].focus);
  const [isRunning, setIsRunning] = useState(false);
  const [sessionsCompleted, setSessionsCompleted] = useLocalStorage("fh-sessions", 0);
  const [focusHistory, setFocusHistory] = useLocalStorage<{ date: string; minutes: number }[]>(
    "fh-focus-history",
    []
  );
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const getDurations = useCallback(() => {
    if (mode === "custom") {
      return { focus: customFocus * 60, break: customBreak * 60 };
    }
    return MODES[mode];
  }, [mode, customFocus, customBreak]);

  const totalTime = sessionType === "focus" ? getDurations().focus : getDurations().break;

  useEffect(() => {
    setTimeLeft(totalTime);
    setIsRunning(false);
  }, [mode, sessionType, customFocus, customBreak, totalTime]);

  const playSound = useCallback(() => {
    if (typeof window === "undefined") return;
    try {
      const ctx = new AudioContext();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.frequency.value = 880;
      gain.gain.setValueAtTime(0.3, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.5);
      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.5);
    } catch {
      // ignore
    }
  }, []);

  const notify = useCallback((title: string, body: string) => {
    if (typeof window !== "undefined" && "Notification" in window) {
      if (Notification.permission === "granted") {
        new Notification(title, { body, icon: "/favicon.ico" });
      }
    }
    toast.success(title, { description: body });
  }, []);

  const switchSession = useCallback(() => {
    playSound();
    if (sessionType === "focus") {
      const minutes = Math.floor(getDurations().focus / 60);
      setFocusHistory((prev) => {
        const today = new Date().toISOString().split("T")[0];
        const existing = prev.find((h) => h.date === today);
        if (existing) {
          return prev.map((h) =>
            h.date === today ? { ...h, minutes: h.minutes + minutes } : h
          );
        }
        return [...prev, { date: today, minutes }];
      });
      setSessionsCompleted((s) => s + 1);
      notify(
        t(getStoredLocale(), "timer.focusComplete"),
        t(getStoredLocale(), "timer.breakTime")
      );
      setSessionType("break");
      setTimeLeft(getDurations().break);
    } else {
      notify(
        t(getStoredLocale(), "timer.breakOver"),
        t(getStoredLocale(), "timer.readyFocus")
      );
      setSessionType("focus");
      setTimeLeft(getDurations().focus);
    }
    setIsRunning(false);
  }, [sessionType, getDurations, playSound, notify, setFocusHistory, setSessionsCompleted]);

  useEffect(() => {
    if (!isRunning) {
      if (intervalRef.current) clearInterval(intervalRef.current);
      return;
    }
    intervalRef.current = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) {
          switchSession();
          return 0;
        }
        return t - 1;
      });
    }, 1000);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isRunning, switchSession]);

  const start = () => {
    if (typeof window !== "undefined" && "Notification" in window) {
      Notification.requestPermission();
    }
    setIsRunning(true);
  };
  const pause = () => setIsRunning(false);
  const reset = () => {
    setIsRunning(false);
    setTimeLeft(totalTime);
  };

  const progress = 1 - timeLeft / totalTime;

  return {
    mode,
    setMode,
    customFocus,
    setCustomFocus,
    customBreak,
    setCustomBreak,
    sessionType,
    setSessionType,
    timeLeft,
    totalTime,
    isRunning,
    progress,
    sessionsCompleted,
    focusHistory,
    start,
    pause,
    reset,
    audioRef,
  };
}
