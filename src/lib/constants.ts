export const ACCENT_COLORS = [
  { name: "Purple", value: "#8b5cf6" },
  { name: "Blue", value: "#3b82f6" },
  { name: "Cyan", value: "#06b6d4" },
  { name: "Green", value: "#10b981" },
  { name: "Pink", value: "#ec4899" },
  { name: "Orange", value: "#f97316" },
];

export const NAV_ITEMS = [
  { href: "/dashboard", label: "Dashboard", icon: "LayoutDashboard" },
  { href: "/dashboard/tasks", label: "Tasks", icon: "CheckSquare" },
  { href: "/dashboard/timer", label: "Focus Timer", icon: "Timer" },
  { href: "/dashboard/statistics", label: "Statistics", icon: "BarChart3" },
  { href: "/dashboard/settings", label: "Settings", icon: "Settings" },
];

export const AMBIENT_TRACKS = [
  { id: "lofi", name: "Lofi Beats", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" },
  { id: "rain", name: "Rain Sounds", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3" },
  { id: "cafe", name: "Cafe Ambience", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3" },
  { id: "nature", name: "Nature Sounds", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3" },
];

export const KEYBOARD_SHORTCUTS = [
  { keys: ["Ctrl", "K"], action: "Command palette" },
  { keys: ["Ctrl", "N"], action: "New task" },
  { keys: ["Ctrl", "T"], action: "Start timer" },
  { keys: ["Ctrl", "M"], action: "Toggle music" },
  { keys: ["?"], action: "Show shortcuts" },
];
