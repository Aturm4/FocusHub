import { createClient } from "@/lib/supabase/client";

export async function saveFocusSession(
  userId: string,
  durationMinutes: number,
  sessionType: "focus" | "break",
  mode: string
) {
  const supabase = createClient();
  const { error } = await supabase.from("focus_sessions").insert({
    user_id: userId,
    duration_minutes: durationMinutes,
    session_type: sessionType,
    mode,
  });
  if (error) throw error;
}

export async function getFocusStats(userId: string) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("focus_sessions")
    .select("*")
    .eq("user_id", userId)
    .eq("session_type", "focus")
    .order("completed_at", { ascending: false });

  if (error) throw error;
  return data ?? [];
}
