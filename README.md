# FocusHub

Premium productivity platform for students, developers, and freelancers. Built with Next.js 15, TypeScript, Tailwind CSS, Framer Motion, Supabase, and Recharts.

![FocusHub](https://img.shields.io/badge/Next.js-15-black?style=flat-square&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.8-blue?style=flat-square&logo=typescript)
![Tailwind](https://img.shields.io/badge/Tailwind-3.4-38bdf8?style=flat-square&logo=tailwindcss)

## Features

- **Landing Page** — Glassmorphism, gradient backgrounds, animated blobs, floating UI cards
- **Authentication** — Email/password + Google OAuth via Supabase
- **Task Manager** — Kanban board with drag & drop, priorities, due dates, tags
- **Pomodoro Timer** — 25/5, 50/10, custom modes with notifications & sound
- **Statistics** — Weekly charts, monthly analytics, activity heatmap
- **Ambient Player** — Lofi, rain, cafe, nature sounds
- **Settings** — Dark/light theme, accent colors, notifications
- **Extras** — Command palette (Ctrl+K), keyboard shortcuts, achievements, streaks, AI assistant, Matrix easter egg
- **i18n** — English and Russian with language switcher (navbar, footer, settings)

## Quick Start

### Prerequisites

- Node.js 18+
- npm or yarn
- Supabase account (optional for demo mode)

### Installation

```bash
cd focushub
npm install
cp .env.example .env.local
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Demo Mode

Without Supabase credentials, the app runs in demo mode:
- Login/register redirects to dashboard
- Tasks and timer use localStorage
- All UI features work offline

### Supabase Setup

1. Create a project at [supabase.com](https://supabase.com)
2. Copy URL and anon key to `.env.local`
3. Run `supabase/schema.sql` in the SQL Editor
4. Enable Google OAuth in Authentication → Providers
5. Add redirect URL: `http://localhost:3000/auth/callback`

## Project Structure

```
src/
├── app/              # Next.js App Router pages
├── components/       # UI components (landing, dashboard, tasks, timer...)
├── hooks/            # Custom React hooks
├── lib/              # Supabase clients, constants
├── providers/        # React context providers
├── services/         # API/data services
├── types/            # TypeScript types
└── utils/            # Helpers, mock data
```

## Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| `Ctrl+K` | Command palette |
| `Ctrl+N` | New task |
| `Ctrl+T` | Focus timer |
| `?` | Show shortcuts |
| Type `matrix` | Matrix easter egg |

## Tech Stack

- [Next.js 15](https://nextjs.org/) — App Router
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Framer Motion](https://www.framer.com/motion/)
- [Supabase](https://supabase.com/) — Auth + Database
- [Recharts](https://recharts.org/) — Analytics charts
- [@dnd-kit](https://dndkit.com/) — Drag and drop
- [cmdk](https://cmdk.paco.me/) — Command palette
- [Lucide](https://lucide.dev/) — Icons

## License

MIT
