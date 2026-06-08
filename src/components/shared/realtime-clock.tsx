"use client";

import { useEffect, useState } from "react";
import { format } from "date-fns";

export function RealtimeClock() {
  const [time, setTime] = useState<Date | null>(null);

  useEffect(() => {
    setTime(new Date());
    const id = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  if (!time) return null;

  return (
    <div className="font-mono text-sm tabular-nums text-fg-muted">
      <span className="text-fg">{format(time, "HH:mm:ss")}</span>
      <span className="mx-2 text-slate-300 dark:text-white/20">|</span>
      <span>{format(time, "EEE, MMM d")}</span>
    </div>
  );
}
