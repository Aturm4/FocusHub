import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { RootProvider } from "@/components/providers/root-provider";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Фокус глубже — продуктивность и deep work",
  description:
    "Premium productivity platform with tasks, Pomodoro timer, ambient sounds, and analytics.",
  keywords: ["productivity", "pomodoro", "focus", "tasks", "saas"],
};

const themeInitScript = `
(function() {
  try {
    var s = JSON.parse(localStorage.getItem('fh-settings') || '{}');
    var light = s.theme === 'light';
    var root = document.documentElement;
    root.classList.toggle('light', light);
    root.classList.toggle('dark', !light);
    root.style.colorScheme = light ? 'light' : 'dark';
    if (s.accentColor) {
      root.style.setProperty('--accent', s.accentColor);
      root.style.setProperty('--primary', s.accentColor);
    }
  } catch (e) {}
})();
`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="dark scroll-smooth">
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} min-h-screen bg-background font-sans antialiased text-foreground`}
      >
        <RootProvider>{children}</RootProvider>
      </body>
    </html>
  );
}
