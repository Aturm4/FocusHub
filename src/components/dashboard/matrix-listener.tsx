"use client";

import { useEffect, useRef } from "react";
import { useApp } from "@/providers/app-provider";
import { useTranslation } from "@/providers/locale-provider";
import { toast } from "sonner";

export function MatrixListener() {
  const { matrixMode, setMatrixMode } = useApp();
  const { t } = useTranslation();
  const buffer = useRef("");

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === "INPUT" || target.tagName === "TEXTAREA") return;

      if (e.key === "Escape" && matrixMode) {
        setMatrixMode(false);
        toast.info(t("matrix.goodbye"));
        return;
      }

      buffer.current += e.key.toLowerCase();
      if (buffer.current.length > 12) {
        buffer.current = buffer.current.slice(-12);
      }

      if (buffer.current.includes("matrix")) {
        setMatrixMode(true);
        toast.success(t("matrix.welcome"));
        buffer.current = "";
      }

      if (buffer.current.includes("exit")) {
        if (matrixMode) {
          setMatrixMode(false);
          toast.info(t("matrix.goodbye"));
        }
        buffer.current = "";
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [setMatrixMode, matrixMode, t]);

  return null;
}
