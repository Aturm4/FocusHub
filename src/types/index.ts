export type TaskPriority = "low" | "medium" | "high" | "urgent";
export type TaskStatus = "todo" | "in_progress" | "done";

export interface Task {
  id: string;
  user_id: string;
  title: string;
  description?: string;
  status: TaskStatus;
  priority: TaskPriority;
  due_date?: string;
  tags: string[];
  position: number;
  completed: boolean;
  created_at: string;
  updated_at: string;
}

export interface FocusSession {
  id: string;
  user_id: string;
  duration_minutes: number;
  session_type: "focus" | "break";
  completed_at: string;
  mode: string;
}

export interface UserProfile {
  id: string;
  email: string;
  full_name?: string;
  avatar_url?: string;
  accent_color: string;
  theme: "dark" | "light";
  notifications_enabled: boolean;
  created_at: string;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlocked: boolean;
  unlocked_at?: string;
}

export interface ProductivityStats {
  totalFocusHours: number;
  completedTasks: number;
  currentStreak: number;
  longestStreak: number;
  weeklyFocus: { day: string; hours: number }[];
  monthlyTasks: { month: string; count: number }[];
  heatmap: { date: string; value: number }[];
}

export type TimerMode = "25/5" | "50/10" | "custom";
export type AmbientSound = "lofi" | "rain" | "cafe" | "nature" | "none";

export interface AppSettings {
  theme: "dark" | "light";
  accentColor: string;
  notifications: boolean;
  soundEnabled: boolean;
  timerMode: TimerMode;
  customFocus: number;
  customBreak: number;
}
