# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Racket Network (RN) is a Next.js 14 frontend application for a sports/racket-based social network platform. It handles user authentication, clubs, matches, competitions, and payments.

## Commands

```bash
npm run dev      # Start development server (binds to 0.0.0.0)
npm run build    # Production build
npm run start    # Start production server
npm run lint     # Run ESLint
```

## Architecture

### Tech Stack
- **Framework**: Next.js 14 with App Router
- **State Management**: Redux Toolkit with redux-persist (localStorage)
- **Authentication**: NextAuth.js with credentials provider + JWT strategy
- **Styling**: Tailwind CSS with shadcn/ui components
- **Forms**: React Hook Form + Zod validation
- **API Client**: Axios
- **Error Tracking**: Sentry

### Directory Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── (application)/      # Main app routes (match, club, competitions, account)
│   ├── (auth)/             # Auth routes (sign-in, sign-up, reset-password, otp)
│   ├── api/auth/           # NextAuth API route
│   └── _components/        # App-level shared components (navbar, search)
├── components/             # Feature components
│   ├── ui/                 # shadcn/ui base components
│   ├── account/            # Profile, inbox, settings
│   ├── club/               # Club management
│   ├── competitions/       # Competition features
│   └── match/              # Match features
├── redux/                  # Redux store and slices
│   ├── index.ts            # Store configuration with persist
│   └── store/              # Slices: auth, inbox, payment
├── lib/                    # Utilities
│   ├── auth-options.ts     # NextAuth configuration
│   └── utils.ts            # Helper functions (cn for classnames)
├── constant/               # Constants and TypeScript types
│   └── types/              # Type definitions for domain models
├── hooks/                  # Reusable hooks
│   ├── useWindowDimension  # Device detection (mobile/tablet/laptop) + dimensions
│   ├── useLogoUpload       # File upload with preview
│   ├── useDatePicker       # Date picker state (single/range modes)
│   ├── useInbox            # Redux inbox wrapper
│   └── useCountdowns       # Payment countdown timer management
└── public/                 # Static assets (icons, images)
```

### Key Patterns

**Route Groups**: Uses Next.js route groups - `(application)` for main app with navbar/footer layout, `(auth)` for authentication pages with minimal layout.

**Component Responsiveness**: Many components have mobile/desktop variants (e.g., `profile-mobile.tsx`, `profile-dekstop.tsx`) with a page component that chooses which to render.

**Redux Store**: Three persisted slices:
- `auth`: Authentication state
- `payment`: Payment data persistence
- `inbox`: Notification/inbox state

**API Communication**: Backend API accessed via `NEXT_PUBLIC_URL_API` environment variable. Auth tokens stored in NextAuth session and passed in API calls.

**Server Session**: Use `getAuthServerSession()` from `@/lib/auth-options` for server-side auth checks.

### Path Aliases

`@/*` maps to `./src/*` - use `@/components`, `@/lib`, `@/redux`, etc.

### Custom Tailwind

Custom colors defined via CSS variables:
- `green-rc` - Primary brand green
- `background-button-rc` - Button backgrounds
- `background-card` - Card backgrounds

Custom breakpoints: `xs` (375px), `laptop` (1024px), `desktop` (1280px)

## Environment Variables

Required in `.env`:
- `NEXT_PUBLIC_URL_API` - Backend API base URL
- `NEXTAUTH_SECRET` - NextAuth secret key
- `NEXTAUTH_URL` - Application URL
- `GOOGLE_CLIENT_ID` / `GOOGLE_CLIENT_SECRET` - Google OAuth (if using)
- `NEXT_PUBLIC_SENTRY_DSN` - Sentry error tracking